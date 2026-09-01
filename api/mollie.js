// Mollie payment integration
// Handles payment creation and webhook callbacks

const { createMollieClient } = require('@mollie/api-client');
const { Pool } = require('pg');

// Application ids are uuids. A malformed one reaching pool.query() raises
// "invalid input syntax for type uuid" and surfaces as a 500, so a mistyped or
// truncated resume link looks like a server fault and payment-return.html keeps
// polling it until the cap. Treat it as what it is: not found.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const { assignBooking } = require('./booking-sheet');
const { sendAndLog, makeTransport } = require('./mail');

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Initialize Mollie client lazily. createMollieClient() throws on a missing
// apiKey, and this module is required (via api/application.js) on the server's
// import path — so constructing it eagerly took the whole site down whenever
// MOLLIE_API_KEY was absent. Deferring it keeps every non-payment route serving
// and confines the failure to the payment handlers.
let mollieClientInstance = null;
function mollieClient() {
  if (!process.env.MOLLIE_API_KEY) {
    throw new Error('MOLLIE_API_KEY is not configured — payments are unavailable');
  }
  if (!mollieClientInstance) {
    mollieClientInstance = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
  }
  return mollieClientInstance;
}

// One shared transport (see api/mail.js). This config used to be copy-pasted
// into three modules, so a change to one of them changed a third of the mail.
const smtp = makeTransport();

// Tiered registration pricing (EUR)
// Early Bird: before May 15 | Standard: before July 15 | Last Minute: after July 15
const REGISTRATION_PRICING = {
  early:    { perWeek: 120, perMonth: 300 },
  standard: { perWeek: 200, perMonth: 500 },
  lastMin:  { perWeek: 240, perMonth: 600 },
};

// Processing fee percentage (added on top of subtotal)
const PROCESSING_FEE_PERCENT = 0.02;

// Mollie statuses from which a checkout URL is still usable, so /api/mollie/resume
// can hand back the SAME payment instead of creating another one. Anything else
// (expired, failed, canceled) genuinely needs a replacement.
const REUSABLE_PAYMENT_STATUSES = new Set(['open', 'pending']);

// Date-based tier cutoffs (public site)
const PRICING_TIER_DATES = {
  earlyEnd:    '2026-05-15',              // before this date → 'early'
  standardEnd: '2026-07-15T23:59:00+02:00', // before this instant (23:59 CEST) → 'standard'; after → 'lastMin'
};

function getPricingTier() {
  const now = new Date();
  if (now < new Date(PRICING_TIER_DATES.earlyEnd)) return 'early';
  if (now < new Date(PRICING_TIER_DATES.standardEnd)) return 'standard';
  return 'lastMin';
}

// Promo links that lock a specific tier. Secret-link model: anyone with the
// code gets the price, enforced HERE (server-side) so the client can only
// assert the code, never the amount. Keep in sync with apply.html PROMO_LOCKS.
const PROMO_CODES = {
  // /solarpunk landing: holds the STANDARD price through 23:59 CEST Jul 19,
  // even after the public site flips to last-minute (Jul 15 cutoff).
  solarpunk: { lockTier: 'standard', validUntil: '2026-07-19T23:59:00+02:00' },
};

const TIER_ORDER = { early: 0, standard: 1, lastMin: 2 };

// Effective tier for a request: apply a promo lock if present and still valid.
// A promo never charges MORE than the current public tier.
function resolvePricingTier(promo) {
  const base = getPricingTier();
  const code = promo && PROMO_CODES[String(promo).toLowerCase()];
  if (!code) return base;
  if (new Date() >= new Date(code.validUntil)) return base; // promo window closed
  return TIER_ORDER[code.lockTier] < TIER_ORDER[base] ? code.lockTier : base;
}

// Accommodation prices (EUR) — flat rates (per week and per month/4-week)
const ACCOMMODATION_PRICES = {
  'ch-multi':  { perWeek: 275,  perMonth: 1100 },
  'ch-double': { perWeek: 350,  perMonth: 1400 },
  'hh-living': { perWeek: 315,  perMonth: 1260 },
  'hh-triple': { perWeek: 350,  perMonth: 1400 },
  'hh-twin':   { perWeek: 420,  perMonth: 1680 },
  'hh-single': { perWeek: 665,  perMonth: 2660 },
  'hh-couple': { perWeek: 700,  perMonth: 2800 },
};

// Human-readable labels for accommodation types
const ACCOMMODATION_LABELS = {
  'ch-multi':  'Commons Hub — Bed in Multi-Room',
  'ch-double': 'Commons Hub — Bed in Double Room',
  'hh-living': 'Herrnhof Villa — Bed in Living Room',
  'hh-triple': 'Herrnhof Villa — Bed in Triple Room',
  'hh-twin':   'Herrnhof Villa — Single Bed in Double Room',
  'hh-single': 'Herrnhof Villa — Single Room',
  'hh-couple': 'Herrnhof Villa — Couple Room',
};

// Legacy ticket labels (kept for backward-compat with existing DB records)
const TICKET_LABELS = {
  'full-dorm': 'Full Resident - Dorm (4-6 people)',
  'full-shared': 'Full Resident - Shared Double',
  'full-single': 'Full Resident - Single (deluxe apartment)',
  'week-dorm': '1-Week Visitor - Dorm (4-6 people)',
  'week-shared': '1-Week Visitor - Shared Double',
  'week-single': '1-Week Visitor - Single (deluxe apartment)',
  'no-accom': 'Non-Accommodation Pass',
  'registration': 'Event Registration',
};

// `lockTier` honours a price already quoted in writing. An applicant's
// confirmation email states a total computed at the tier of the day; the
// "Complete Payment" link in that same email lives for months, so by the time
// it is clicked the public tier may have moved. Re-pricing then charges more
// than the email promised, with no warning, which is a bait-and-switch we do
// not want to make — and in the EU is not a defensible way to take money.
// Passing the original tier back in keeps the link faithful to its quote.
function calculateAmount(ticketType, weeksCount, accommodationType, promo, lockTier) {
  const weeks = weeksCount || 1;
  const tier = (lockTier && REGISTRATION_PRICING[lockTier]) ? lockTier : resolvePricingTier(promo);
  const regPricing = REGISTRATION_PRICING[tier];

  // Full month (4 weeks) gets the month rate; otherwise per-week
  const registration = weeks === 4 ? regPricing.perMonth : regPricing.perWeek * weeks;

  let accommodation = 0;
  if (accommodationType && ACCOMMODATION_PRICES[accommodationType]) {
    const prices = ACCOMMODATION_PRICES[accommodationType];
    accommodation = weeks === 4 ? prices.perMonth : prices.perWeek * weeks;
  }

  const subtotal = registration + accommodation;
  const processingFee = subtotal * PROCESSING_FEE_PERCENT;
  const total = subtotal + processingFee;
  return {
    registration: registration.toFixed(2),
    accommodation: accommodation.toFixed(2),
    subtotal: subtotal.toFixed(2),
    processingFee: processingFee.toFixed(2),
    total: total.toFixed(2),
    tier,
  };
}

// Create a Mollie payment for an application
async function createPayment(applicationId, ticketType, weeksCount, email, firstName, lastName, accommodationType, selectedWeeks, promo, lockTier) {
  const pricing = calculateAmount(ticketType, weeksCount, accommodationType, promo, lockTier);

  const baseUrl = process.env.BASE_URL || 'https://valleyofthecommons.com';

  // Build itemized description
  const parts = [`Registration (${weeksCount} week${weeksCount > 1 ? 's' : ''})`];
  if (accommodationType && ACCOMMODATION_PRICES[accommodationType]) {
    const label = ACCOMMODATION_LABELS[accommodationType] || accommodationType;
    parts.push(`Accommodation: ${label} (${weeksCount} week${weeksCount > 1 ? 's' : ''})`);
  }
  parts.push('incl. 2% processing fee');
  const description = `Valley of the Commons - ${parts.join(' + ')}`;

  const payment = await mollieClient().payments.create({
    amount: {
      currency: 'EUR',
      value: pricing.total,
    },
    description,
    redirectUrl: `${baseUrl}/payment-return.html?id=${applicationId}`,
    webhookUrl: `${baseUrl}/api/mollie/webhook`,
    metadata: {
      applicationId,
      ticketType,
      weeksCount,
      accommodationType: accommodationType || null,
      selectedWeeks: selectedWeeks || [],
      promo: promo || null,
      breakdown: pricing,
    },
  });

  // Store Mollie payment ID in database
  await pool.query(
    `UPDATE applications
     SET mollie_payment_id = $1,
         payment_amount = $2,
         payment_status = 'pending'
     WHERE id = $3`,
    [payment.id, pricing.total, applicationId]
  );

  return {
    paymentId: payment.id,
    checkoutUrl: payment.getCheckoutUrl(),
    amount: pricing.total,
    pricing,
  };
}

// Payment confirmation email
const paymentConfirmationEmail = (application, bookingResult) => {
  const accomLabel = application.accommodation_type
    ? (ACCOMMODATION_LABELS[application.accommodation_type] || application.accommodation_type)
    : null;

  // Build accommodation row if applicable
  const accomRow = accomLabel ? `
          <tr>
            <td style="padding: 4px 0;"><strong>Accommodation:</strong></td>
            <td style="padding: 4px 0;">${accomLabel}</td>
          </tr>` : '';

  // Booking assignment info
  let bookingHtml = '';
  if (bookingResult) {
    if (bookingResult.success) {
      bookingHtml = `
      <div style="background: #e8f5e9; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <h3 style="margin-top: 0; color: #2d5016;">Bed Assignment</h3>
        <p style="margin-bottom: 0;">You have been assigned to <strong>${bookingResult.venue} — Room ${bookingResult.room}, ${bookingResult.bedType}</strong>.</p>
      </div>`;
    } else {
      bookingHtml = `
      <div style="background: #fff3e0; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin-bottom: 0;">Your accommodation request has been noted. Our team will follow up with your room assignment shortly.</p>
      </div>`;
    }
  }

  return {
    subject: 'Payment Confirmed - Valley of the Commons',
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2d5016; margin-bottom: 24px;">Payment Confirmed!</h1>

      <p>Dear ${application.first_name},</p>

      <p>Your payment of <strong>&euro;${application.payment_amount}</strong> for Valley of the Commons has been received.</p>

      <div style="background: #f5f5f0; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <h3 style="margin-top: 0; color: #2d5016;">Payment Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px 0;"><strong>Type:</strong></td>
            <td style="padding: 4px 0;">Event Registration${accomLabel ? ' + Accommodation' : ''}</td>
          </tr>
          ${accomRow}
          <tr>
            <td style="padding: 4px 0;"><strong>Amount:</strong></td>
            <td style="padding: 4px 0;">&euro;${application.payment_amount}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;"><strong>Mollie Reference:</strong></td>
            <td style="padding: 4px 0;">${application.mollie_payment_id}</td>
          </tr>
        </table>
      </div>

      ${bookingHtml}

      <p>Your application is now complete. Our team will review it and get back to you within 1 week.</p>

      <p>If you have any questions, reply to this email and we'll get back to you.</p>

      <p style="margin-top: 32px;">
        With warmth,<br>
        <strong>The Valley of the Commons Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 32px 0;">
      <p style="font-size: 12px; color: #666;">
        Application ID: ${application.id}
      </p>
    </div>
  `
  };
};

// Webhook handler - called by Mollie when payment status changes
async function handleWebhook(req, res) {
  try {
    const paymentId = req.body.id;
    if (!paymentId) {
      return res.status(400).json({ error: 'Missing payment id' });
    }

    // Fetch payment status from Mollie. A 404 here means the id is not one of
    // ours at all (a probe, or a stale id from the old TEST-mode key) — ack it
    // so Mollie stops retrying. Anything else is transient and SHOULD 500, so
    // Mollie's retry schedule gets another go at it.
    let payment;
    try {
      payment = await mollieClient().payments.get(paymentId);
    } catch (fetchError) {
      const code = fetchError.statusCode || fetchError.status;
      if (code === 404 || code === 410) {
        console.warn(`Mollie webhook: payment ${paymentId} not found (${code}) — ignoring`);
        return res.status(200).end();
      }
      throw fetchError;
    }
    const applicationId = payment.metadata.applicationId;

    // Map Mollie status to our status
    let paymentStatus;
    switch (payment.status) {
      case 'paid':
        paymentStatus = 'paid';
        break;
      case 'failed':
        paymentStatus = 'failed';
        break;
      case 'canceled':
        paymentStatus = 'canceled';
        break;
      case 'expired':
        paymentStatus = 'expired';
        break;
      case 'pending':
        paymentStatus = 'pending';
        break;
      case 'open':
        paymentStatus = 'open';
        break;
      default:
        paymentStatus = payment.status;
    }

    // An application can have more than one Mollie payment against it (a link was
    // re-issued, or /api/mollie/resume was hit before it reused open payments), and
    // createPayment() overwrites applications.mollie_payment_id each time. Matching
    // the row ONLY on mollie_payment_id therefore loses any payment that is not the
    // newest one: paying via an older link updated zero rows, the webhook still
    // answered 200, and the application stayed unpaid with the money taken. So fall
    // back to metadata.applicationId, which every payment we create carries.
    const isUuid = typeof applicationId === 'string' &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(applicationId);

    const target = await pool.query(
      `SELECT id, payment_status, mollie_payment_id FROM applications
        WHERE mollie_payment_id = $1::varchar
           OR ($2::boolean AND id = $3::uuid)
        LIMIT 1`,
      [paymentId, isUuid, isUuid ? applicationId : null]
    );

    if (target.rows.length === 0) {
      // Not ours (the same Mollie profile also serves other events). Ack so Mollie
      // stops retrying, but do not pretend we recorded anything.
      console.warn(`Mollie webhook: no application matches payment ${paymentId} — ignoring`);
      return res.status(200).end();
    }

    const row = target.rows[0];
    const wasAlreadyPaid = row.payment_status === 'paid';
    const isCurrentPayment = row.mollie_payment_id === paymentId;

    // A non-paid status only counts when it concerns the payment the application is
    // actually pointing at. Otherwise it is a superseded link expiring in the
    // background, and applying it would flip a live 'pending' — or worse, a 'paid' —
    // back to 'expired' minutes after the applicant successfully paid.
    const supersededNoise = paymentStatus !== 'paid' && (wasAlreadyPaid || !isCurrentPayment);

    if (supersededNoise) {
      console.log(`Payment ${paymentId} for application ${row.id}: ${paymentStatus} — superseded, not applied (row holds ${row.mollie_payment_id}, status ${row.payment_status})`);
      return res.status(200).end();
    }

    // On success also record WHICH payment paid, so the row and Mollie agree and
    // the lookup below finds the right application.
    await pool.query(
      `UPDATE applications
          SET payment_status = $1::varchar,
              mollie_payment_id = CASE WHEN $1::varchar = 'paid' THEN $2::varchar ELSE mollie_payment_id END,
              payment_paid_at = CASE WHEN $1::varchar = 'paid' THEN CURRENT_TIMESTAMP ELSE payment_paid_at END
        WHERE id = $3::uuid`,
      [paymentStatus, paymentId, row.id]
    );

    console.log(`Payment ${paymentId} for application ${row.id}: ${paymentStatus}${wasAlreadyPaid ? ' (already paid — skipping side effects)' : ''}${!isCurrentPayment ? ' (via a superseded link — row re-pointed)' : ''}`);

    // On payment success: assign bed + send confirmation emails (only once).
    if (paymentStatus === 'paid' && !wasAlreadyPaid) {
      try {
        // Fetch by primary key, not by mollie_payment_id: the paying payment may
        // have arrived via a superseded link, and we already resolved the row above.
        const appResult = await pool.query(
          'SELECT id, first_name, last_name, email, contribution_amount, payment_amount, mollie_payment_id, accommodation_type FROM applications WHERE id = $1::uuid',
          [row.id]
        );

        if (appResult.rows.length > 0) {
          const application = appResult.rows[0];
          const accommodationType = payment.metadata.accommodationType || application.accommodation_type;
          const selectedWeeks = payment.metadata.selectedWeeks || [];

          // Attempt bed assignment if accommodation was selected
          let bookingResult = null;
          if (accommodationType) {
            try {
              const guestName = `${application.first_name} ${application.last_name}`;
              bookingResult = await assignBooking(guestName, accommodationType, selectedWeeks);
              console.log(`[Booking] ${guestName}: ${bookingResult.success ? 'Assigned' : 'Failed'} — ${JSON.stringify(bookingResult)}`);
            } catch (bookingError) {
              console.error('[Booking] Assignment error:', bookingError);
              bookingResult = { success: false, reason: bookingError.message };
            }
          }

          // Send payment confirmation email
          if (process.env.SMTP_PASS) {
            const confirmEmail = paymentConfirmationEmail(application, bookingResult);
            // This is the receipt — the one message a payer will chase us about if it
            // never arrives. sendAndLog does not throw, so a mail failure can no longer
            // skip the booking notification below the way the old inline send did.
            await sendAndLog(pool, smtp, {
              emailType: 'payment_confirmation',
              recipientName: `${application.first_name} ${application.last_name}`,
              metadata: { applicationId: application.id, paymentId, amount: application.payment_amount },
              to: application.email,
              bcc: 'team@valleyofthecommons.com',
              subject: confirmEmail.subject,
              html: confirmEmail.html,
            });

            // Send internal booking notification to team
            if (accommodationType) {
              const accomLabel = ACCOMMODATION_LABELS[accommodationType] || accommodationType;
              const bookingStatus = bookingResult?.success
                ? `Assigned: ${bookingResult.venue} Room ${bookingResult.room} (${bookingResult.bedType})`
                : `MANUAL ASSIGNMENT NEEDED — ${bookingResult?.reason || 'unknown error'}`;

              const bookingNotification = {
                subject: `Booking ${bookingResult?.success ? 'Assigned' : 'NEEDS ATTENTION'}: ${application.first_name} ${application.last_name}`,
                html: `
                  <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: ${bookingResult?.success ? '#2d5016' : '#c53030'};">
                      ${bookingResult?.success ? 'Bed Assigned' : 'Manual Assignment Needed'}
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr><td style="padding: 6px 0; border-bottom: 1px solid #eee;"><strong>Guest:</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${application.first_name} ${application.last_name}</td></tr>
                      <tr><td style="padding: 6px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${application.email}</td></tr>
                      <tr><td style="padding: 6px 0; border-bottom: 1px solid #eee;"><strong>Accommodation:</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${accomLabel}</td></tr>
                      <tr><td style="padding: 6px 0; border-bottom: 1px solid #eee;"><strong>Weeks:</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${selectedWeeks.join(', ') || 'N/A'}</td></tr>
                      <tr><td style="padding: 6px 0; border-bottom: 1px solid #eee;"><strong>Status:</strong></td><td style="padding: 6px 0; border-bottom: 1px solid #eee;">${bookingStatus}</td></tr>
                      <tr><td style="padding: 6px 0;"><strong>Payment:</strong></td><td style="padding: 6px 0;">&euro;${application.payment_amount}</td></tr>
                    </table>
                  </div>
                `,
              };

              const bookingAlertEmail = process.env.BOOKING_ALERT_EMAIL || 'admin@valleyofthecommons.com';
              await sendAndLog(pool, smtp, {
                emailType: 'booking_notification',
                recipientName: 'Bookings',
                metadata: { applicationId: application.id, paymentId, assigned: !!bookingResult?.success },
                to: bookingAlertEmail,
                subject: bookingNotification.subject,
                html: bookingNotification.html,
              });
            }
          }
        }
      } catch (emailError) {
        console.error('Failed to process paid webhook:', emailError);
      }
    }

    // Mollie expects a 200 response
    return res.status(200).end();
  } catch (error) {
    console.error('Mollie webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// Payment status check endpoint (for frontend polling)
async function getPaymentStatus(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Missing application id' });
    }
    if (!UUID_RE.test(id)) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const result = await pool.query(
      'SELECT payment_status, payment_amount, contribution_amount FROM applications WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const app = result.rows[0];
    return res.status(200).json({
      paymentStatus: app.payment_status,
      paymentAmount: app.payment_amount,
      ticketType: app.contribution_amount,
      ticketLabel: TICKET_LABELS[app.contribution_amount] || app.contribution_amount,
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    return res.status(500).json({ error: 'Failed to check payment status' });
  }
}

// Resume payment — re-creates a Mollie payment for unpaid applications and redirects to checkout
async function resumePayment(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Missing application id' });
    }
    if (!UUID_RE.test(id)) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const result = await pool.query(
      `SELECT id, first_name, last_name, email, payment_status, payment_amount,
              accommodation_type, contribution_amount, selected_weeks, mollie_payment_id
       FROM applications WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const app = result.rows[0];

    // Already paid — redirect to status page
    if (app.payment_status === 'paid') {
      return res.redirect(`/payment-return.html?id=${app.id}`);
    }

    // Seed the replacement from the APPLICATION ROW, not from a bare default.
    //
    // This used to start at `weeksCount = 1, selectedWeeks = []` and only get
    // better if the old Mollie payment could be fetched. Three live cases skip
    // that fetch entirely: an application that never got a payment at all (a
    // database outage during checkout), a payment id from a stale TEST-mode key
    // (`the wrong mode is used`), and any transient Mollie error. In each of
    // those the applicant would have been billed for ONE week regardless of the
    // four they signed up for, and `selectedWeeks: []` would reach the paid
    // webhook — where assignBooking() needs those weeks to reserve a bed.
    // The row already knows the answer; use it.
    let selectedWeeks = Array.isArray(app.selected_weeks) ? app.selected_weeks : [];
    let weeksCount = selectedWeeks.length || 1;
    let promo = null;
    // Tier the applicant was quoted, recovered from the superseded payment below.
    let lockTier = null;
    if (app.mollie_payment_id) {
      try {
        const oldPayment = await mollieClient().payments.get(app.mollie_payment_id);

        // REUSE a payment that is still payable rather than minting a new one.
        //
        // This endpoint is a GET, and its URL is mailed to every applicant twice
        // ("Complete Payment Now" button + a copy-this-link line). So it is hit
        // not only when a human clicks, but on every reload, every back
        // navigation, and every fetch by an email-security link scanner or
        // prefetcher. Each hit used to create a brand-new Mollie payment and
        // orphan the previous one.
        //
        // That is where the pile of "failed" transactions came from: they are
        // expired, not failed, and they carry method=null because no human ever
        // opened them. A single link scanner can mint several payments for one
        // application within seconds this way. Reusing the
        // open payment makes repeat hits idempotent, so a scanner sweep costs
        // one payment instead of one per hit.
        const checkoutUrl = REUSABLE_PAYMENT_STATUSES.has(oldPayment.status)
          ? oldPayment.getCheckoutUrl()
          : null;
        if (checkoutUrl) {
          console.log(`[Resume] ${id}: reusing ${oldPayment.status} payment ${oldPayment.id}`);
          return res.redirect(checkoutUrl);
        }

        // Not payable any more (expired/failed/canceled) — carry its details
        // forward into the replacement so pricing and weeks stay identical.
        // Only override the row-derived values when the old payment actually
        // carries something: early payments were created before selectedWeeks
        // was put in metadata, and an empty array there must not wipe the weeks
        // we just read off the application.
        const metaWeeks = Array.isArray(oldPayment.metadata.selectedWeeks)
          ? oldPayment.metadata.selectedWeeks : [];
        if (metaWeeks.length > 0) selectedWeeks = metaWeeks;
        weeksCount = selectedWeeks.length || oldPayment.metadata.weeksCount || 1;
        promo = oldPayment.metadata.promo || null;
        // Charge what the applicant was originally quoted, not today's tier.
        lockTier = (oldPayment.metadata.breakdown || {}).tier || null;
        console.log(`[Resume] ${id}: ${oldPayment.id} is ${oldPayment.status}, creating a replacement`);
      } catch (e) {
        console.error('Failed to fetch old payment metadata:', e.message);
      }
    }

    // Create a fresh Mollie payment (re-apply any promo lock from the original)
    const paymentResult = await createPayment(
      app.id,
      app.contribution_amount || 'registration',
      weeksCount,
      app.email,
      app.first_name,
      app.last_name,
      app.accommodation_type,
      selectedWeeks,
      promo,
      lockTier
    );

    if (lockTier) console.log(`[Resume] ${id}: honouring originally quoted tier '${lockTier}'`);
    return res.redirect(paymentResult.checkoutUrl);
  } catch (error) {
    console.error('Resume payment error:', error);
    return res.status(500).json({ error: 'Failed to resume payment. Please contact team@valleyofthecommons.com' });
  }
}

module.exports = {
  createPayment, handleWebhook, getPaymentStatus, resumePayment,
  REGISTRATION_PRICING, PROCESSING_FEE_PERCENT,
  ACCOMMODATION_PRICES, ACCOMMODATION_LABELS,
  TICKET_LABELS, calculateAmount, getPricingTier, resolvePricingTier, PROMO_CODES,
};
