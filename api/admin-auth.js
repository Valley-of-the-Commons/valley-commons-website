// Shared request authentication: admin bearer key, and the sponsor access code.
//
// Do NOT compare against an interpolated env var. If ADMIN_API_KEY is unset,
// `Bearer ${process.env.ADMIN_API_KEY}` evaluates to the literal string
// "Bearer undefined", which any caller can send — an unset variable becomes a
// guessable credential.
//
// Fail CLOSED: no key configured means no admin access at all, ever.
const crypto = require('crypto');

function timingSafeEqual(a, b) {
  const ab = Buffer.from(String(a), 'utf8');
  const bb = Buffer.from(String(b), 'utf8');
  // timingSafeEqual throws on length mismatch, so compare digests of fixed size.
  const ah = crypto.createHash('sha256').update(ab).digest();
  const bh = crypto.createHash('sha256').update(bb).digest();
  return crypto.timingSafeEqual(ah, bh);
}

function isAdmin(req) {
  const key = process.env.ADMIN_API_KEY;
  // An unset, empty or placeholder key disables admin access rather than
  // accepting a guessable literal.
  if (!key || key.length < 16 || key === 'your_secure_admin_key_here') {
    console.warn('[admin-auth] ADMIN_API_KEY is unset or too weak — admin endpoints are disabled');
    return false;
  }
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return false;
  return timingSafeEqual(auth.slice(7), key);
}

// The comped-sponsor registration endpoint writes payment_status='paid' and
// consumes real bed inventory, so it needs a credential. It cannot be the admin
// key (sponsors are not admins) and it must not be a literal baked into the
// public page, so it is a shared code delivered in the sponsor's own link.
//
// Fail CLOSED for the same reason isAdmin does: an unset variable must never
// become a value a caller can guess or send.
function hasSponsorAccess(code) {
  const expected = process.env.SPONSOR_ACCESS_CODE;
  if (!expected || expected.length < 12 || expected === 'your_sponsor_access_code_here') {
    console.warn('[sponsor-auth] SPONSOR_ACCESS_CODE is unset or too weak — sponsor registration is disabled');
    return false;
  }
  if (!code || typeof code !== 'string') return false;
  return timingSafeEqual(code, expected);
}

module.exports = { isAdmin, hasSponsorAccess };
