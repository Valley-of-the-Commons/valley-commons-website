// POST /api/keynote/join?slug=<slug>  body: { nickname }
// Creates a player row and returns its id. Anon RLS also allows the insert, but a
// server route lets us validate + rate-limit and keeps one code path.
const { serviceClient } = require('./quiz');

// Small self-contained per-IP fixed-window limiter, kept local so this branch does
// not depend on api/rate-limit.js (which lands in a separate PR).
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 30;
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v.start > WINDOW_MS) hits.delete(k);
    return false;
  }
  h.count += 1;
  return h.count > MAX;
}
function clientIp(req) {
  const xff = (req.headers && req.headers['x-forwarded-for']) || '';
  return String(xff).split(',')[0].trim() || (req.socket && req.socket.remoteAddress) || 'unknown';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (limited(clientIp(req))) return res.status(429).json({ error: 'Too many requests' });

  const db = serviceClient();
  if (!db) return res.status(503).json({ error: 'not_configured' });

  const slug = (req.query.slug || '').toString();
  const nickname = (((req.body || {}).nickname) || '').toString().trim().slice(0, 24);
  if (!slug || !nickname) return res.status(400).json({ error: 'bad_request' });

  const { data, error } = await db
    .from('quiz_players')
    .insert({ slug, nickname })
    .select('id')
    .single();
  if (error) {
    console.error('[keynote/join]', error.message);
    return res.status(500).json({ error: 'join_failed' });
  }
  return res.status(200).json({ player_id: data.id });
};
