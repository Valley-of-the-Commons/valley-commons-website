// Load local env for development (.env.local then .env). No-op in production,
// where the platform (Vercel) injects env vars: dotenv never overrides an
// already-set variable and silently skips missing files.
try {
  require('dotenv').config({ path: '.env.local' });
  require('dotenv').config();
} catch (_) { /* dotenv is optional */ }

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// API routes - wrap Vercel serverless functions
const waitlistHandler = require('./api/waitlist-db');
const newsletterHandler = require('./api/newsletter');
const applicationHandler = require('./api/application');
const applicationLookupHandler = require('./api/application').lookup;
const applicationSponsorHandler = require('./api/application').sponsor;
const gameChatHandler = require('./api/game-chat');
const shareToGithubHandler = require('./api/share-to-github');
const updatesHandler = require('./api/updates');
const { handleWebhook, getPaymentStatus, resumePayment } = require('./api/mollie');

// Adapter to convert Vercel handler to Express
const vercelToExpress = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('API Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

app.all('/api/waitlist', vercelToExpress(waitlistHandler));
app.all('/api/newsletter', vercelToExpress(newsletterHandler));
app.all('/api/application', vercelToExpress(applicationHandler));
app.get('/api/application/lookup', vercelToExpress(applicationLookupHandler));
app.post('/api/application/sponsor', vercelToExpress(applicationSponsorHandler));
app.all('/api/game-chat', vercelToExpress(gameChatHandler));
app.all('/api/share-to-github', vercelToExpress(shareToGithubHandler));
app.all('/api/updates', vercelToExpress(updatesHandler));
app.all('/api/updates/:key', vercelToExpress(updatesHandler));
app.post('/api/mollie/webhook', vercelToExpress(handleWebhook));
app.all('/api/mollie/status', vercelToExpress(getPaymentStatus));
app.get('/api/mollie/resume', vercelToExpress(resumePayment));

// Keynote live-quiz API (talks to the SEPARATE, isolated Supabase project).
app.get('/api/keynote/config', vercelToExpress(require('./api/keynote/config')));
app.get('/api/keynote/results', vercelToExpress(require('./api/keynote/results')));
app.post('/api/keynote/join', vercelToExpress(require('./api/keynote/join')));
app.post('/api/keynote/submit', vercelToExpress(require('./api/keynote/submit')));
app.post('/api/keynote/host/:action', vercelToExpress(require('./api/keynote/host')));

// ---------------------------------------------------------------------------
// Transactional mail queue.
//
// Every send used to sit in a try/catch that only console.error()d, and the
// email_log row was written only AFTER a successful send — so a failed message
// left no trace at all and the only evidence was a row that was never there.
// api/mail.js now records failures with the message attached; this is the part
// that gets them delivered, and the part that lets a human see the backlog.
//
// The retry runs in-process on a timer rather than as a host cron so it ships
// with the code and cannot be forgotten on a rebuild. Concurrent workers are
// safe: rows are claimed FOR UPDATE SKIP LOCKED and flipped to 'retrying'.
// ---------------------------------------------------------------------------
const { Pool } = require('pg');
const { isAdmin } = require('./api/admin-auth');
const { retryFailed, pendingCount, probe, queueHealth, pruneProbes, makeTransport } = require('./api/mail');

const mailPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Same rule as updatesPool below: votc-db speaks plain TCP, so SSL is opt-in
  // via DATABASE_SSL rather than inferred from the hostname.
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
// makeTransport(), not a second copy of the same config. This file used to build
// its own, which meant the retry sweep and the probe ran without the fallback
// wrapper that api/mail.js adds — the one path where a silent divergence between
// two transports would only show up during an outage.
const mailTransport = makeTransport();

app.get('/api/mail-queue', async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const counts = await pendingCount(mailPool);
    const { rows } = await mailPool.query(
      `SELECT id, recipient_email, email_type, subject, status, sent_at,
              metadata->>'attempts' AS attempts, metadata->>'error' AS error
         FROM email_log
        WHERE status IN ('failed','failed_permanent','retrying')
        ORDER BY sent_at DESC LIMIT 50`
    );
    res.json({ ...counts, messages: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unauthenticated ON PURPOSE: this is what the uptime monitor polls, and putting
// the admin key into the monitor's database to read it would spread it to buy
// nothing. It returns counts and timestamps only — no recipients, no subjects,
// no message bodies. 503 rather than a JSON flag so a plain HTTP monitor with
// default settings is enough; the reasons are in the body for the human who
// follows the alert.
app.get('/api/mail-queue/health', async (req, res) => {
  try {
    const health = await queueHealth(mailPool);
    res.status(health.ok ? 200 : 503).json(health);
  } catch (error) {
    // A health check that cannot reach its own database is not healthy.
    res.status(503).json({ ok: false, reasons: ['health check failed: ' + error.message] });
  }
});

app.post('/api/mail-queue/retry', async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  try {
    res.json(await retryFailed(mailPool, mailTransport, { limit: 50 }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// The probe is what makes the alarm work on a quiet night. Without it, "queue is
// empty" means either "mail is fine" or "nothing has been sent since it broke",
// and those look identical.
const MAIL_PROBE_MINUTES = parseInt(process.env.MAIL_PROBE_MINUTES || '15', 10);
if (MAIL_PROBE_MINUTES > 0) {
  const runProbe = () => {
    probe(mailPool, mailTransport)
      .then((r) => { if (!r.ok) console.error('[mail] probe FAILED — send path is broken'); })
      .catch((err) => console.error('[mail] probe threw:', err.message));
    pruneProbes(mailPool).catch((err) => console.error('[mail] probe prune failed:', err.message));
  };
  setTimeout(runProbe, 60 * 1000).unref();
  setInterval(runProbe, MAIL_PROBE_MINUTES * 60 * 1000).unref();
}

const MAIL_RETRY_MINUTES = parseInt(process.env.MAIL_RETRY_MINUTES || '10', 10);
if (MAIL_RETRY_MINUTES > 0) {
  setInterval(() => {
    retryFailed(mailPool, mailTransport)
      .then((s) => {
        if (s.attempted) {
          console.log(`[mail] retry sweep — attempted=${s.attempted} sent=${s.sent} stillFailing=${s.stillFailing} abandoned=${s.abandoned}`);
        }
      })
      .catch((err) => console.error('[mail] retry sweep failed:', err.message));
  }, MAIL_RETRY_MINUTES * 60 * 1000).unref();
}

// Accommodation availability check
const { checkAvailability } = require('./api/booking-sheet');
const VALID_WEEKS = new Set(['week1', 'week2', 'week3', 'week4']);
app.get('/api/accommodation-availability', async (req, res) => {
  try {
    const weeksParam = (req.query.weeks || '').trim();
    if (!weeksParam) {
      return res.status(400).json({ error: 'weeks parameter required (e.g. week1,week2)' });
    }
    const selectedWeeks = weeksParam.split(',').filter(w => VALID_WEEKS.has(w));
    if (selectedWeeks.length === 0) {
      return res.status(400).json({ error: 'No valid weeks provided' });
    }
    const availability = await checkAvailability(selectedWeeks);
    if (!availability) {
      return res.status(503).json({ error: 'Booking sheet not configured' });
    }
    res.json(availability);
  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

// Updates: pretty permalink with server-side OG tags for social previews
const { Pool: PgPool } = require('pg');
const updatesPool = new PgPool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.get('/updates/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const r = await updatesPool.query(
      'SELECT title, summary, cover_image_url, published FROM updates WHERE slug = $1 LIMIT 1',
      [slug]
    );
    const fs = require('fs');
    const filePath = path.join(__dirname, 'update.html');
    let html = fs.readFileSync(filePath, 'utf8');

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const permalink = `${baseUrl}/updates/${slug}`;

    let ogTitle = 'Valley of the Commons — Update';
    let ogDesc = 'Updates from Valley of the Commons.';
    let ogImage = `${baseUrl}/valley.webp`;

    if (r.rowCount > 0 && r.rows[0].published) {
      const p = r.rows[0];
      ogTitle = `${p.title} | Valley of the Commons`;
      if (p.summary) ogDesc = p.summary;
      if (p.cover_image_url) {
        ogImage = p.cover_image_url.startsWith('http')
          ? p.cover_image_url
          : `${baseUrl}${p.cover_image_url.startsWith('/') ? '' : '/'}${p.cover_image_url}`;
      }
    }

    html = html
      .replace(/__OG_TITLE__/g, escapeHtml(ogTitle))
      .replace(/__OG_DESC__/g, escapeHtml(ogDesc))
      .replace(/__OG_IMAGE__/g, escapeHtml(ogImage))
      .replace(/__OG_URL__/g, escapeHtml(permalink));

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    return next(err);
  }
});

// RSS feed
app.get('/updates.rss', async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const r = await updatesPool.query(
      `SELECT slug, title, summary, published_at FROM updates
       WHERE published = TRUE ORDER BY published_at DESC LIMIT 50`
    );
    const items = r.rows.map(p => `
      <item>
        <title>${escapeHtml(p.title)}</title>
        <link>${baseUrl}/updates/${p.slug}</link>
        <guid>${baseUrl}/updates/${p.slug}</guid>
        <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
        <description>${escapeHtml(p.summary || '')}</description>
      </item>`).join('');
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
<title>Valley of the Commons — Updates</title>
<link>${baseUrl}/updates</link>
<description>News and field notes from Valley of the Commons.</description>
${items}
</channel></rss>`;
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    return res.status(200).send(rss);
  } catch (err) {
    console.error('RSS error:', err);
    return res.status(500).send('');
  }
});

// ---------------------------------------------------------------------------
// Static file guard.
//
// express.static below is rooted at __dirname — the whole application
// directory, not a public/ subtree. Without this guard that means server.js,
// api/*.js, db/schema.sql and any credential file sitting in the tree are all
// fetchable over the public internet, source and all. Rooting static at a
// public/ subtree would mean rewriting every asset path in every page, so the
// root stays and this guard decides what is allowed to leave it.
//
// Allow-list by extension, not deny-list: a deny-list has to be remembered
// every time a file is added to the repo, and forgetting once is how the
// original hole stayed open. Server-side trees are refused outright.
const SERVE_EXTENSIONS = new Set([
  'html', 'css', 'js', 'mjs', 'map',
  'svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'ico',
  'mov', 'mp4', 'webm', 'woff', 'woff2', 'ttf', 'otf', 'eot',
  'txt', 'pdf', 'xml', 'webmanifest'
]);

// api/ is listed even though every real endpoint is routed above: an unmatched
// /api/... path must not fall through to the filesystem and return the
// handler's own source. secrets/ is listed because deployments may mount
// credential files into the tree.
const PRIVATE_PREFIXES = [
  '/api/', '/db/', '/scripts/', '/backlog/', '/secrets/',
  '/.gitea/', '/.git/', '/node_modules/', '/refs/'
];

// Root files whose extension is otherwise public.
const PRIVATE_FILES = new Set(['/server.js', '/Dockerfile']);
const PRIVATE_PATTERNS = [/^\/test-[^/]*\.js$/];

// Shipped on purpose: the game master's LLM context is fetched by the client.
const PUBLIC_EXCEPTIONS = new Set(['/internal_thought.md']);

app.use((req, res, next) => {
  // Decode first, so /api%2Fmollie.js cannot walk around the prefix test.
  let p;
  try {
    p = decodeURIComponent(req.path);
  } catch (e) {
    return res.status(400).end();
  }
  if (!p.startsWith('/')) p = '/' + p;

  if (PUBLIC_EXCEPTIONS.has(p)) return next();

  if (PRIVATE_PREFIXES.some((dir) => p.startsWith(dir))) {
    // JSON for /api/ so a mistyped endpoint reads as an API 404, not a page.
    return p.startsWith('/api/')
      ? res.status(404).json({ error: 'Not found' })
      : res.status(404).end();
  }
  if (PRIVATE_FILES.has(p) || PRIVATE_PATTERNS.some((re) => re.test(p))) {
    return res.status(404).end();
  }

  const base = p.slice(p.lastIndexOf('/') + 1);
  if (base.startsWith('.')) return res.status(404).end();   // .env, .dockerignore
  if (!base) return next();                                 // directory index

  const dot = base.lastIndexOf('.');
  // Extensionless paths are the SPA fallback's and `extensions: ['html']`'s
  // business (/privacy -> privacy.html), so let them through.
  if (dot === -1) return next();

  if (!SERVE_EXTENSIONS.has(base.slice(dot + 1).toLowerCase())) {
    return res.status(404).end();
  }
  next();
});

// Keynote companion pages. One template (keynote/keynote.html) serves /keynote
// (the index) and every /keynote-<slug> (a talk companion); the client renderer
// (keynote/keynote.js) fills it from keynote/content.mjs. Here we inject the
// per-page <title>/description from the same content module (dynamic-imported,
// cached) so link previews and SEO are correct. Must sit before express.static
// and the SPA fallback so the slug routes are not swallowed by index.html.
let _keynoteRooms = null;
async function keynoteRooms() {
  if (!_keynoteRooms) {
    const mod = await import('./keynote/content.mjs');
    _keynoteRooms = mod.ROOMS;
  }
  return _keynoteRooms;
}
const escAttr = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
  );
app.get(/^\/keynote(?:-[a-z0-9-]+)?$/, async (req, res) => {
  try {
    const slug = req.path === '/keynote' ? null : req.path.replace(/^\/keynote-/, '');
    let title = 'Keynote companions · Valley of the Commons';
    let desc = "Companions to the Valley of the Commons talks: each talk's argument in beats, with the sources it draws on.";
    let status = 200;
    if (slug) {
      const rooms = await keynoteRooms();
      const room = rooms[slug];
      if (room) {
        title = room.meta.metaTitle || room.meta.eyebrow;
        desc = room.meta.metaDescription || desc;
      } else {
        status = 404; // unknown slug: still serve the template; the client shows a friendly not-found
      }
    }
    const template = fs.readFileSync(path.join(__dirname, 'keynote', 'keynote.html'), 'utf8');
    const html = template
      .replace(/{{TITLE}}/g, escAttr(title))
      .replace(/{{DESCRIPTION}}/g, escAttr(desc));
    res.status(status).setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  } catch (error) {
    console.error('[keynote] route error:', error);
    return res.status(500).send('Keynote page temporarily unavailable.');
  }
});

// Static files
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  index: 'index.html',
  dotfiles: 'deny'
}));

// Solarpunk promo landing — serves the signup form with the standard-price
// lock (apply.html detects the /solarpunk path and applies the promo).
app.get('/solarpunk', (req, res) => {
  res.sendFile(path.join(__dirname, 'apply.html'));
});

// SPA fallback - serve index.html for non-API routes.
// An unmatched /api/ path used to fall off the end of this handler without ever
// calling res, leaving the request hanging until the client timed out.
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Run database migrations on startup
async function runMigrations() {
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
  });
  try {
    await pool.query(`
      ALTER TABLE applications
        ADD COLUMN IF NOT EXISTS mollie_payment_id VARCHAR(255),
        ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'unpaid',
        ADD COLUMN IF NOT EXISTS payment_amount DECIMAL(10, 2),
        ADD COLUMN IF NOT EXISTS payment_paid_at TIMESTAMP WITH TIME ZONE
    `);
    await pool.query('CREATE INDEX IF NOT EXISTS idx_applications_mollie_id ON applications(mollie_payment_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_applications_payment_status ON applications(payment_status)');

    // Add accommodation/food add-on columns
    await pool.query(`
      ALTER TABLE applications
        ADD COLUMN IF NOT EXISTS need_accommodation BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS want_food BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS accommodation_type VARCHAR(50)
    `);

    // Form restructure columns (migration 004)
    await pool.query(`
      ALTER TABLE applications
        ADD COLUMN IF NOT EXISTS selected_weeks TEXT[],
        ADD COLUMN IF NOT EXISTS top_themes TEXT[],
        ADD COLUMN IF NOT EXISTS belief_update TEXT,
        ADD COLUMN IF NOT EXISTS volunteer_interest BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS coupon_code TEXT,
        ADD COLUMN IF NOT EXISTS food_preference TEXT,
        ADD COLUMN IF NOT EXISTS accessibility_needs TEXT
    `);

    // Rename resend_id → message_id in email_log (legacy column name)
    const colCheck = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'email_log' AND column_name = 'resend_id'
    `);
    if (colCheck.rows.length > 0) {
      await pool.query('ALTER TABLE email_log RENAME COLUMN resend_id TO message_id');
      console.log('Renamed email_log.resend_id → message_id');
    }

    // Updates / blog table (migration 005)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS updates (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(500) NOT NULL,
        summary TEXT,
        body_md TEXT NOT NULL,
        cover_image_url TEXT,
        author VARCHAR(255),
        published BOOLEAN DEFAULT FALSE,
        published_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query('CREATE INDEX IF NOT EXISTS idx_updates_slug ON updates(slug)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_updates_published_at ON updates(published_at DESC)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_updates_published ON updates(published)');

    console.log('Database migrations complete');
  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    await pool.end();
  }
}

runMigrations().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Valley of the Commons server running on port ${PORT}`);
  });
});
