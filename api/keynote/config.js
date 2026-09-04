// Public config for the browser realtime client: the Supabase project URL and the
// PUBLISHABLE key (the new sb_publishable_... key, successor to the anon key; safe
// to expose, RLS restricts it to reads + joining). The secret key is never sent
// here. When the env is absent, `configured:false` and the companion still renders
// offline (no live session).
module.exports = function handler(req, res) {
  const url = process.env.SUPABASE_URL || '';
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';
  const configured = !!(url && publishableKey);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    configured,
    url: configured ? url : null,
    publishableKey: configured ? publishableKey : null,
  });
};
