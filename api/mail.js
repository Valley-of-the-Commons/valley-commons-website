/**
 * One send path for every transactional email, because the old one lost mail silently.
 *
 * Every sendMail() call in this repo sat in a try/catch that only console.error()d,
 * and logEmail() ran only AFTER a successful send. So a failed message left no row
 * in email_log at all — the sole evidence was the ABSENCE of a row, and nothing
 * looks for absences. All 93 rows read 'sent' or 'resent'; not one failure was ever
 * recorded, including the ones we know happened.
 *
 * email_log already had a `status` column defaulting to 'sent'. The schema
 * anticipated this; the code never used it. So a failure now writes a row with
 * status='failed' carrying the whole message, and retryFailed() re-sends it later.
 * Every incident observed so far was transient auth or a brief outage, so a retry
 * minutes later would have succeeded — this converts silent loss into delay.
 *
 * No migration: the retry payload and attempt counter live in the existing
 * metadata jsonb.
 */

const nodemailer = require('nodemailer');

const MAX_ATTEMPTS = parseInt(process.env.MAIL_MAX_ATTEMPTS || '6', 10);
const PROBE_TYPE = 'mail_probe';

/**
 * The one place the sender is decided. This expression used to be written out at
 * all eight send sites, which is how EMAIL_FROM was able to drift away from the
 * mailbox SMTP_USER authenticates as. A drifted EMAIL_FROM causes the relay to reject
 * every message with "Sender address rejected: not owned by user", because the
 * envelope sender is not the mailbox SMTP_USER authenticated as.
 *
 * `probe()` below deliberately calls this same function and passes no `from` of
 * its own, so a probe can never pass using a sender production does not use.
 * A self-test that carries its own payload is worthless here: it goes green
 * while every real send is already dead.
 */
function defaultFrom() {
  return process.env.EMAIL_FROM || 'Valley of the Commons <contact@valleyofthecommons.com>';
}

/**
 * Is this failure worth trying the other relay with?
 *
 * Only if it is a failure of the PATH rather than of the message. No SMTP
 * response at all means we never reached a server; a 4xx is explicitly
 * temporary; an auth rejection is about our credential, not the recipient. Any
 * other 5xx is the server's verdict on this envelope or this content, and every
 * relay on earth will reach the same verdict — re-sending it through a second
 * vendor does not deliver it, it just teaches that vendor we send mail their
 * peers reject.
 */
const AUTH_CODES = new Set([530, 534, 535, 538]);
function isPathFailure(error) {
  if (!error) return false;
  const code = error.responseCode;
  if (typeof code !== 'number') return true;
  return code < 500 || AUTH_CODES.has(code);
}

/**
 * Wrap two transports so a path failure on the first is retried on the second,
 * and the winner is reported back as `via` so email_log records which relay
 * actually delivered. Without that, a silently-failing primary looks exactly
 * like a healthy one.
 */
function withFallback(primary, fallback) {
  return {
    async sendMail(mail) {
      try {
        const info = await primary.sendMail(mail);
        return { ...info, via: 'primary' };
      } catch (error) {
        if (!isPathFailure(error)) throw error;
        console.error('[mail] primary relay failed, trying fallback:', error && error.message);
        const info = await fallback.sendMail(
          process.env.SMTP_FALLBACK_FROM ? { ...mail, from: process.env.SMTP_FALLBACK_FROM } : mail
        );
        return { ...info, via: 'fallback' };
      }
    },
    async verify() {
      return primary.verify();
    },
  };
}

let _transport;
/**
 * Postfix names the mailbox we authenticated as, right there in the rejection
 * ("Sender address rejected: not owned by user <mailbox>").
 *
 * So this is not a guess. When the server says the sender is not ours, re-send
 * once as SMTP_USER — the address we demonstrably own, on a domain with our SPF
 * and DKIM, which aligns strictly better than whatever was rejected. It is the
 * only failure in this module's history that can be repaired without knowing
 * something the server has not already told us.
 *
 * It deliberately does NOT quieten the alarm. `queueHealth` counts repaired
 * sends and stays red while they happen, because a self-healing config fault
 * that nobody is told about is how you end up running on the repair for months.
 * Deliver now, still wake someone.
 */
const SENDER_MISMATCH = /553[\s\S]*not owned by user/i;

function withSenderRepair(inner) {
  return {
    async sendMail(mail) {
      try {
        return await inner.sendMail(mail);
      } catch (error) {
        const owner = process.env.SMTP_USER;
        if (!SENDER_MISMATCH.test(String((error && error.message) || '')) ||
            !owner || !owner.includes('@')) {
          throw error;
        }
        console.error(
          `[mail] SENDER REJECTED (${mail.from}). The server named ${owner} as the mailbox we ` +
          'authenticated as, so re-sending as that address rather than losing the message. ' +
          'This is a CONFIGURATION FAULT — EMAIL_FROM and SMTP_USER disagree. The health ' +
          'endpoint stays red until they are reconciled.'
        );
        const info = await inner.sendMail({ ...mail, from: owner });
        return { ...info, senderRewritten: true };
      }
    },
    verify() { return inner.verify ? inner.verify() : Promise.resolve(true); },
  };
}

/**
 * The one transport every send site uses. Three modules each carried an
 * identical copy of this config; a change to one was a change to a third of the
 * mail.
 *
 * The fallback is DORMANT unless SMTP_FALLBACK_HOST is set, so this is a no-op
 * until a relay exists. Before setting it, check the domain's SPF
 * record: a relay that is not listed there softfails SPF and has no DKIM
 * alignment, which lands it in spam rather than in the
 * inbox. A second path is only an improvement once that DNS record includes the
 * provider; enabling it before then makes the fallback worse than the failure it
 * covers, so this warns loudly rather than assuming someone did the DNS.
 */
function makeTransport() {
  if (_transport) return _transport;

  const primary = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'contact@valleyofthecommons.com',
      pass: process.env.SMTP_PASS || '',
    },
    tls: { rejectUnauthorized: false },
  });

  if (!process.env.SMTP_FALLBACK_HOST) {
    _transport = withSenderRepair(primary);
    return _transport;
  }

  const fallback = nodemailer.createTransport({
    host: process.env.SMTP_FALLBACK_HOST,
    port: parseInt(process.env.SMTP_FALLBACK_PORT || '587', 10),
    secure: process.env.SMTP_FALLBACK_SECURE === 'true',
    auth: {
      user: process.env.SMTP_FALLBACK_USER || '',
      pass: process.env.SMTP_FALLBACK_PASS || '',
    },
  });

  console.log(`[mail] fallback relay configured: ${process.env.SMTP_FALLBACK_HOST}`);
  if (!process.env.SMTP_FALLBACK_SPF_OK) {
    console.warn('[mail] WARNING fallback is enabled but SMTP_FALLBACK_SPF_OK is not set — ' +
      'confirm the SPF record for the sending domain includes this relay, or fallback mail ' +
      'will softfail SPF and be filtered. Set SMTP_FALLBACK_SPF_OK=1 once the DNS is in place.');
  }

  _transport = withSenderRepair(withFallback(primary, fallback));
  return _transport;
}

function primaryRecipient(to) {
  const flat = Array.isArray(to) ? to.join(', ') : String(to || '');
  return flat.split(',')[0].trim();
}

async function record(pool, row) {
  try {
    const result = await pool.query(
      `INSERT INTO email_log (recipient_email, recipient_name, email_type, subject, message_id, status, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [row.recipientEmail, row.recipientName || null, row.emailType, row.subject || null,
       row.messageId || null, row.status, JSON.stringify(row.metadata || {})]
    );
    return result.rows[0] && result.rows[0].id;
  } catch (error) {
    // Losing the log row must never take down the request that triggered it, but
    // this is the one place with nowhere left to escalate to, so say so loudly.
    console.error(`[mail] CRITICAL could not write email_log (${row.status}) for ${row.emailType}:`, error.message);
    return null;
  }
}

/**
 * Send, and log the outcome either way. Never throws: callers previously swallowed
 * send errors themselves, and a mail failure must not fail an application submission.
 * Returns { ok, messageId?, error? }.
 */
async function sendAndLog(pool, transport, opts) {
  const { emailType, recipientName, metadata = {}, ...mail } = opts;
  if (!mail.from) mail.from = defaultFrom();
  const recipientEmail = primaryRecipient(mail.to);

  try {
    const info = await transport.sendMail(mail);
    await record(pool, {
      recipientEmail, recipientName, emailType, subject: mail.subject,
      messageId: info.messageId, status: 'sent',
      metadata: { ...metadata, via: info.via || 'primary',
                  ...(info.senderRewritten ? { senderRewritten: true } : {}) },
    });
    return { ok: true, messageId: info.messageId, via: info.via || 'primary',
             senderRewritten: !!info.senderRewritten };
  } catch (error) {
    await record(pool, {
      recipientEmail, recipientName, emailType, subject: mail.subject,
      status: 'failed',
      metadata: { ...metadata, attempts: 0, error: String(error && error.message || error), mail },
    });
    console.error(`[mail] ${emailType} to ${recipientEmail} FAILED, queued for retry:`, error && error.message);
    return { ok: false, error };
  }
}

/** How many messages are sitting unsent. This is the number that should be on a dashboard. */
async function pendingCount(pool) {
  const { rows } = await pool.query(
    `SELECT
       count(*) FILTER (WHERE status = 'failed')           AS pending,
       count(*) FILTER (WHERE status = 'failed_permanent') AS abandoned
     FROM email_log`
  );
  return { pending: parseInt(rows[0].pending, 10), abandoned: parseInt(rows[0].abandoned, 10) };
}

/**
 * Send one message to a sink mailbox so the path is exercised even when nobody
 * is applying. This is the check a queue-depth alarm cannot make on its own: an
 * empty queue during a quiet night is indistinguishable from a healthy one, and
 * that is exactly how a mail outage stays invisible — the configuration is
 * already broken, but nothing has tried to send.
 *
 * It goes through sendAndLog like everything else, with no `from` of its own, so
 * it exercises the real transport, the real sender and the real failure
 * bookkeeping. A failing probe queues and retries exactly like a lost applicant
 * confirmation would.
 */
async function probe(pool, transport) {
  return sendAndLog(pool, transport, {
    emailType: PROBE_TYPE,
    to: process.env.MAIL_PROBE_TO || 'probe@valleyofthecommons.com',
    subject: `VotC mail path probe ${new Date().toISOString()}`,
    text: 'Automated send-path probe. Delivery of this message is the only evidence '
        + 'that transactional mail still works during a period with no real sends.',
    metadata: { probe: true },
  });
}

/**
 * The judgement a monitor polls. Deliberately scoped to a rolling window: a
 * permanently lost message stays in email_log forever for the audit, but an
 * alarm that can never go green again is an alarm people learn to ignore.
 *
 * Unhealthy on any of three grounds, in increasing order of how early they fire:
 *   - the probe has stopped succeeding  -> the send path is broken RIGHT NOW,
 *     and this fires within ~40 min even if no human is sending anything
 *   - a message has survived several sweeps -> ~20 min into a real outage
 *   - a message was abandoned -> the damage is already done, ~1-2 h in
 */
async function queueHealth(pool, opts = {}) {
  const windowHours   = opts.windowHours   ?? parseInt(process.env.MAIL_ALERT_WINDOW_HOURS || '24', 10);
  const stallAttempts = opts.stallAttempts ?? parseInt(process.env.MAIL_ALERT_ATTEMPTS || '2', 10);
  const probeMinutes  = opts.probeMinutes  ?? parseInt(process.env.MAIL_PROBE_MINUTES || '15', 10);
  const graceMultiple = opts.graceMultiple ?? 2.5;
  const uptimeMinutes = opts.uptimeMinutes ?? process.uptime() / 60;

  const { rows } = await pool.query(
    `SELECT /*health*/
       count(*) FILTER (WHERE status = 'failed'
                          AND sent_at > NOW() - ($2 || ' hours')::interval)    AS pending,
       count(*) FILTER (WHERE status = 'failed_permanent'
                          AND sent_at > NOW() - ($2 || ' hours')::interval)    AS abandoned,
       count(*) FILTER (WHERE status IN ('failed','retrying')
                          AND sent_at > NOW() - ($2 || ' hours')::interval
                          AND COALESCE((metadata->>'attempts')::int, 0) >= $1) AS stalled,
       count(*) FILTER (WHERE metadata->>'senderRewritten' = 'true'
                          AND sent_at > NOW() - ($2 || ' hours')::interval)    AS repaired,
       max(sent_at) FILTER (WHERE email_type = $3
                              AND status IN ('sent','resent'))                 AS last_probe
     FROM email_log`,
    [stallAttempts, String(windowHours), PROBE_TYPE]
  );

  const r = rows[0];
  const pending   = parseInt(r.pending, 10);
  const abandoned = parseInt(r.abandoned, 10);
  const stalled   = parseInt(r.stalled, 10);
  const repaired  = parseInt(r.repaired, 10);
  const lastProbeAt = r.last_probe ? new Date(r.last_probe) : null;
  const ageMinutes  = lastProbeAt ? (Date.now() - lastProbeAt.getTime()) / 60000 : null;

  const reasons = [];
  if (repaired > 0) {
    reasons.push(`${repaired} message(s) only sent after the sender was auto-repaired to SMTP_USER `
               + '— EMAIL_FROM and SMTP_USER disagree and must be reconciled');
  }
  if (abandoned > 0) {
    reasons.push(`${abandoned} message(s) gave up after ${MAX_ATTEMPTS} attempts in the last ${windowHours}h`);
  }
  if (stalled > 0) {
    reasons.push(`${stalled} message(s) have failed ${stallAttempts}+ retries and are still unsent`);
  }
  if (probeMinutes > 0) {
    const grace = probeMinutes * graceMultiple;
    if (ageMinutes === null) {
      // Do not go red just because the process has only just started.
      if (uptimeMinutes > grace) reasons.push('no successful send-path probe has ever been recorded');
    } else if (ageMinutes > grace) {
      reasons.push(`last successful send-path probe was ${Math.round(ageMinutes)} min ago, expected every ${probeMinutes}`);
    }
  }

  return {
    ok: reasons.length === 0, reasons,
    pending, abandoned, stalled, repaired,
    lastProbeAt: lastProbeAt ? lastProbeAt.toISOString() : null,
    lastProbeAgeMinutes: ageMinutes === null ? null : Math.round(ageMinutes),
    probeIntervalMinutes: probeMinutes, windowHours,
  };
}

/** Probes are noise once they have proved their point. Keep a few days for trend, drop the rest. */
async function pruneProbes(pool, days = parseInt(process.env.MAIL_PROBE_KEEP_DAYS || '3', 10)) {
  const res = await pool.query(
    `DELETE FROM email_log
      WHERE email_type = $1 AND status IN ('sent','resent')
        AND sent_at < NOW() - ($2 || ' days')::interval`,
    [PROBE_TYPE, String(days)]
  );
  return res.rowCount || 0;
}

/**
 * Re-send everything still marked failed. Safe to run on a timer and safe to run
 * concurrently with itself: each row is claimed with FOR UPDATE SKIP LOCKED and
 * stamped, so two runners cannot send the same message twice — and a claim left
 * behind by a process that died mid-sweep is reclaimed after `stallMinutes`
 * rather than being stranded in 'retrying' forever.
 */
async function retryFailed(pool, transport, { limit = 25, stallMinutes = 15 } = {}) {
  const summary = { attempted: 0, sent: 0, stillFailing: 0, abandoned: 0 };
  const client = await pool.connect();
  let rows;
  try {
    await client.query('BEGIN');
    ({ rows } = await client.query(
      `SELECT id, metadata FROM email_log
        WHERE (
                status = 'failed'
                -- Reclaim anything a previous sweep claimed and never finished:
                -- if the process died between the claim and the send, the row
                -- would otherwise sit in 'retrying' forever and never be picked
                -- up again, which is the same silent loss this module exists to
                -- remove. Only rows claimed longer ago than the stall window are
                -- eligible, so a sweep in progress is never stolen from.
                OR (status = 'retrying'
                    AND COALESCE((metadata->>'claimedAt')::timestamptz, 'epoch'::timestamptz)
                        < NOW() - ($3 || ' minutes')::interval)
              )
          AND COALESCE((metadata->>'attempts')::int, 0) < $1
        ORDER BY sent_at ASC
        LIMIT $2
        FOR UPDATE SKIP LOCKED`,
      [MAX_ATTEMPTS, limit, String(stallMinutes)]
    ));
    // Mark them in flight inside the same transaction so the row lock is not the
    // only thing preventing a double send, and stamp the claim so a sweep that
    // dies here can be distinguished from one still running.
    if (rows.length) {
      await client.query(
        `UPDATE email_log
            SET status = 'retrying',
                metadata = COALESCE(metadata,'{}'::jsonb) || jsonb_build_object('claimedAt', NOW())
          WHERE id = ANY($1::uuid[])`,
        [rows.map(r => r.id)]
      );
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
    throw error;
  }
  client.release();

  for (const row of rows) {
    const meta = row.metadata || {};
    const attempts = (parseInt(meta.attempts, 10) || 0) + 1;
    summary.attempted++;

    if (!meta.mail) {
      // Pre-dates this module, so there is nothing to re-send. Do not leave it
      // claimed as 'retrying' forever.
      await pool.query(
        `UPDATE email_log SET status = 'failed_permanent',
                metadata = COALESCE(metadata,'{}'::jsonb) || $2::jsonb
          WHERE id = $1`,
        [row.id, JSON.stringify({ error: 'no stored payload to retry', attempts })]
      );
      summary.abandoned++;
      continue;
    }

    try {
      const info = await transport.sendMail(meta.mail);
      await pool.query(
        `UPDATE email_log SET status = 'sent', message_id = $2, sent_at = CURRENT_TIMESTAMP,
                metadata = COALESCE(metadata,'{}'::jsonb) || $3::jsonb
          WHERE id = $1`,
        [row.id, info.messageId, JSON.stringify({
          attempts, recoveredAt: new Date().toISOString(), error: null, via: info.via || 'primary',
          ...(info.senderRewritten ? { senderRewritten: true } : {}),
        })]
      );
      summary.sent++;
    } catch (error) {
      const exhausted = attempts >= MAX_ATTEMPTS;
      await pool.query(
        `UPDATE email_log SET status = $2,
                metadata = COALESCE(metadata,'{}'::jsonb) || $3::jsonb
          WHERE id = $1`,
        [row.id, exhausted ? 'failed_permanent' : 'failed',
         JSON.stringify({ attempts, error: String(error && error.message || error) })]
      );
      if (exhausted) summary.abandoned++; else summary.stillFailing++;
    }
  }

  return summary;
}

module.exports = {
  sendAndLog, retryFailed, pendingCount, makeTransport, MAX_ATTEMPTS,
  probe, queueHealth, pruneProbes, defaultFrom, PROBE_TYPE,
  withSenderRepair,
  // Exported for tests: the fallback decision is the one piece of this module
  // whose failure mode is invisible in production — a wrong isPathFailure() either
  // silently drops mail or relays rejected mail through a second vendor.
  withFallback, isPathFailure,
};
