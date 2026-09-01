#!/usr/bin/env node
// Payment reminder job — emails applicants whose payment never completed.
//
// Targets applications where:
//   - payment_status IN ('unpaid','expired','open','pending','failed','canceled')
//   - submitted_at >= 60 days ago (don't pester ancient stale entries)
//   - status != 'declined' (don't bother declined applicants)
//   - no payment_reminder email logged in the last 7 days for this applicant
//
// Usage:
//   node scripts/payment-reminder.js                       # send to all matching applicants
//   node scripts/payment-reminder.js --dry-run             # print what would be sent, send nothing
//   node scripts/payment-reminder.js --preview <email>     # send a single sample to <email> using
//                                                          # the first matching applicant's data
//
// Designed to be invoked from cron, e.g.
//   30 14 * * *  docker exec votc node /app/scripts/payment-reminder.js >> /var/log/votc-reminders.log 2>&1

const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const { sendAndLog } = require('../api/mail');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const previewIdx = args.indexOf('--preview');
const previewEmail = previewIdx !== -1 ? args[previewIdx + 1] : null;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const smtp = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'contact@valleyofthecommons.com',
    pass: process.env.SMTP_PASS || '',
  },
  tls: { rejectUnauthorized: false },
});

const BASE_URL = process.env.BASE_URL || 'https://valleyofthecommons.com';

function reminderEmail(application, previewBannerHtml = '') {
  const resumeUrl = `${BASE_URL}/api/mollie/resume?id=${application.id}`;
  const amount = application.payment_amount ? `€${application.payment_amount}` : null;

  return {
    subject: `Reminder: complete your Valley of the Commons payment`,
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      ${previewBannerHtml}
      <h1 style="color: #2d5016; margin-bottom: 16px;">Hi ${application.first_name},</h1>

      <p>We received your application to <strong>Valley of the Commons</strong> on ${new Date(application.submitted_at).toLocaleDateString('en-US', { dateStyle: 'long' })}, but it looks like your payment didn't go through. Your spot isn't confirmed yet.</p>

      <p>If you still want to join us in the valley, you can finish the payment in a single click:</p>

      <div style="background: #fff8e1; border: 2px solid #f9a825; padding: 24px; border-radius: 10px; margin: 24px 0; text-align: center;">
        <p style="margin: 0 0 16px; font-size: 1.05rem;">${amount ? `Outstanding balance: <strong>${amount}</strong>` : 'Complete your registration:'}</p>
        <p style="margin: 0;">
          <a href="${resumeUrl}" style="display: inline-block; background: #2d5016; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 1.05rem;">Complete Payment Now →</a>
        </p>
        <p style="margin: 16px 0 0; font-size: 0.85rem; color: #666;">Link: ${resumeUrl}</p>
      </div>

      <p>If your plans have changed and you no longer want to attend, no action is needed — your application will quietly expire.</p>

      <p>If you have questions or hit any trouble with payment, just reply to this email and we'll help you out.</p>

      <p style="margin-top: 32px;">
        With warmth,<br>
        <strong>The Valley of the Commons Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;">
      <p style="font-size: 12px; color: #666;">
        Application ID: ${application.id}
      </p>
    </div>
  `,
  };
}

async function findCandidates() {
  // Anyone with a non-paid status, submitted in the last 60 days, not declined,
  // and not reminded in the last 7 days.
  const result = await pool.query(`
    SELECT a.id, a.first_name, a.last_name, a.email, a.submitted_at,
           a.payment_status, a.payment_amount, a.mollie_payment_id, a.status
    FROM applications a
    WHERE a.payment_status IN ('unpaid','expired','open','pending','failed','canceled')
      AND a.submitted_at >= NOW() - INTERVAL '60 days'
      AND COALESCE(a.status, 'pending') != 'declined'
      AND NOT EXISTS (
        SELECT 1 FROM email_log el
        WHERE el.recipient_email = a.email
          AND el.email_type = 'payment_reminder'
          AND el.sent_at >= NOW() - INTERVAL '7 days'
      )
    ORDER BY a.submitted_at DESC
  `);
  return result.rows;
}

async function sendReminder(application) {
  const email = reminderEmail(application);
  const result = await sendAndLog(pool, smtp, {
    emailType: 'payment_reminder',
    recipientName: `${application.first_name} ${application.last_name}`,
    metadata: { applicationId: application.id, paymentStatus: application.payment_status, paymentAmount: application.payment_amount },
    to: application.email,
    bcc: process.env.GLOBAL_ADMIN_BCC || 'admin@valleyofthecommons.com',
    subject: email.subject,
    html: email.html,
  });
  // A failed reminder is now a queued reminder, but the run should still report it
  // as failed rather than claim a send that did not happen.
  if (!result.ok) throw result.error;
  return result.messageId;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('[reminder] DATABASE_URL not set');
    process.exit(1);
  }

  console.log(`[reminder] starting (dryRun=${dryRun}, preview=${previewEmail || 'none'})`);

  const candidates = await findCandidates();
  console.log(`[reminder] ${candidates.length} candidate(s) found`);

  if (candidates.length === 0) {
    await pool.end();
    return;
  }

  if (previewEmail) {
    // Send ONE sample to the preview address, using the first real candidate's data.
    const sample = { ...candidates[0], email: previewEmail };
    const banner = `<div style="background:#fee; border:1px solid #c00; padding:12px; border-radius:6px; margin-bottom:24px; color:#900; font-size:0.9rem;"><strong>PREVIEW MODE</strong> — this is a sample of the reminder that would be sent to <code>${candidates[0].email}</code>. Real applicant data: <code>${candidates[0].first_name} ${candidates[0].last_name}</code> (status: ${candidates[0].payment_status}, amount: €${candidates[0].payment_amount}).</div>`;
    const email = reminderEmail(sample, banner);

    console.log(`[reminder] preview → ${previewEmail} (using data from ${candidates[0].email})`);
    if (dryRun) {
      console.log('[reminder] DRY RUN — not sending');
      console.log('Subject:', email.subject);
      console.log('Resume URL:', `${BASE_URL}/api/mollie/resume?id=${sample.id}`);
    } else {
      if (!process.env.SMTP_PASS) {
        console.error('[reminder] SMTP_PASS not set — cannot send');
        process.exit(1);
      }
      const info = await smtp.sendMail({
        to: previewEmail,
        subject: `[PREVIEW] ${email.subject}`,
        html: email.html,
      });
      console.log(`[reminder] preview sent — messageId=${info.messageId}`);
    }
    await pool.end();
    return;
  }

  let sent = 0;
  let failed = 0;
  for (const app of candidates) {
    if (dryRun) {
      console.log(`[reminder] DRY would send → ${app.email} (${app.first_name} ${app.last_name}, status=${app.payment_status})`);
      continue;
    }
    if (!process.env.SMTP_PASS) {
      console.error('[reminder] SMTP_PASS not set — cannot send');
      process.exit(1);
    }
    try {
      const messageId = await sendReminder(app);
      console.log(`[reminder] sent → ${app.email} messageId=${messageId}`);
      sent++;
    } catch (err) {
      console.error(`[reminder] FAILED → ${app.email}: ${err.message}`);
      failed++;
    }
  }

  console.log(`[reminder] done — sent=${sent}, failed=${failed}`);
  await pool.end();
}

main().catch((err) => {
  console.error('[reminder] fatal:', err);
  pool.end().finally(() => process.exit(1));
});
