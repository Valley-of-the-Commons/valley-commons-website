// Newsletter signup endpoint — adds email to Listmonk mailing list
const { addToListmonk } = require('./listmonk');
const { clientIp, createRateLimiter } = require('./rate-limit');

// Per-IP throttle: without it, this endpoint can be looped to make Listmonk send
// a double-opt-in confirmation to an arbitrary third-party address from our
// domain (harassment + sender-reputation damage).
const newsletterLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (newsletterLimiter(clientIp(req))) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const emailLower = email.toLowerCase().trim();

    await addToListmonk(emailLower, '', {
      source: 'newsletter_signup',
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed!'
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again later.' });
  }
};
