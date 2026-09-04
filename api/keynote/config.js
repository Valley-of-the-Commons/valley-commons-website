// Public config for the browser realtime client: the Supabase project URL and
// the ANON key (safe to expose; RLS restricts it to reads + joining). The service
// key is never sent here. When the env is absent, `configured:false` and the
// companion still renders offline (no live session).
module.exports = function handler(req, res) {
  const url = process.env.SUPABASE_URL || '';
  const anonKey = process.env.SUPABASE_ANON_KEY || '';
  const configured = !!(url && anonKey);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    configured,
    url: configured ? url : null,
    anonKey: configured ? anonKey : null,
  });
};
