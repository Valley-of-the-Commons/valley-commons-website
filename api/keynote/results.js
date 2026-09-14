// GET /api/keynote/results?slug=<slug> - the latest archived live-session results
// for a talk: the final standings and the per-item answer aggregates. Read-only and
// safe to expose. Returns { configured:false } when the Supabase env is absent (the
// companion still renders offline), or { empty:true } when a talk has never run a
// session. Aggregates are indexed by item position, matching keynote/content.mjs.
const { serviceClient } = require('./quiz');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const slug = String((req.query && req.query.slug) || '').trim();
  if (!slug) return res.status(400).json({ error: 'missing_slug' });

  const db = serviceClient();
  if (!db) return res.status(200).json({ configured: false });

  const { data, error } = await db
    .from('quiz_sessions')
    .select('results, ended_at')
    .eq('slug', slug)
    .order('ended_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data || !data.results) return res.status(200).json({ empty: true });

  const r = data.results || {};
  return res.status(200).json({
    standings: Array.isArray(r.standings) ? r.standings : [],
    aggregates: Array.isArray(r.aggregates) ? r.aggregates : [],
    playerCount: r.playerCount || 0,
    endedAt: data.ended_at || null,
  });
};
