// Shared in-memory, per-IP, fixed-window rate limiter.
//
// This is the same design (and the same honest caveats) as the original
// rateLimited() / sponsorRateLimited() helpers in api/application.js: it is
// in-memory, so it resets on redeploy and is per-replica. That is proportional to
// what it defends here: abuse, spam-amplification and denial-of-wallet throttling
// on public write endpoints, not a hard security boundary. Extracted so every
// endpoint reuses one implementation instead of copy-pasting the loop.

// Best-effort client IP behind Vercel / a proxy. x-forwarded-for is the caller's
// chain; the first entry is the closest client. Falls back to the socket address.
function clientIp(req) {
  const xff = (req.headers && (req.headers['x-forwarded-for'] || '')) || '';
  return (
    String(xff).split(',')[0].trim() ||
    (req.socket && req.socket.remoteAddress) ||
    (req.connection && req.connection.remoteAddress) ||
    'unknown'
  );
}

// Returns a `limited(ip)` predicate: true once this IP has exceeded `max`
// requests within `windowMs`.
function createRateLimiter({ windowMs, max }) {
  const hits = new Map();
  return function limited(ip) {
    const now = Date.now();
    const hit = hits.get(ip);
    if (!hit || now - hit.start > windowMs) {
      hits.set(ip, { start: now, count: 1 });
      // Bound memory: prune expired windows when the map grows large.
      if (hits.size > 5000) {
        for (const [k, v] of hits) {
          if (now - v.start > windowMs) hits.delete(k);
        }
      }
      return false;
    }
    hit.count += 1;
    return hit.count > max;
  };
}

// Same-origin guard for endpoints that should only be driven by the site's own
// pages (not curl or another origin). Trusts the Origin header (browsers set it on
// cross-origin requests and on same-origin non-GET fetches), falling back to
// Referer. Allows localhost for local dev. Returns true when the request is from
// an allowed origin.
function isSameOrigin(req) {
  const base = process.env.BASE_URL || 'https://valleyofthecommons.com';
  let allowedHost;
  try {
    allowedHost = new URL(base).host;
  } catch {
    allowedHost = 'valleyofthecommons.com';
  }
  const src = req.headers.origin || req.headers.referer || '';
  if (!src) return false; // no Origin/Referer at all: not a browser page request
  let host;
  try {
    host = new URL(src).host;
  } catch {
    return false;
  }
  return (
    host === allowedHost ||
    host === `www.${allowedHost}` ||
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1')
  );
}

module.exports = { clientIp, createRateLimiter, isSameOrigin };
