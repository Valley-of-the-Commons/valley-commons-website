// Newsletter signups go to listmonk through a broker service.
//
// This replaces a direct PostgreSQL connection that INSERTed into listmonk's
// tables with status 'confirmed'. Two problems with that: nobody was ever asked
// to confirm, and a public-facing container held write credentials to the
// subscriber database.
//
// It also addressed the list by NUMERIC ID. List ids are not stable across
// instances, so routing by domain instead lets the broker resolve the list and
// a renumbering cannot quietly deliver these people into the wrong one.
const BROKER_URL = process.env.NEWSLETTER_BROKER_URL || 'http://newsletter-broker:8000';
const NEWSLETTER_DOMAIN = process.env.NEWSLETTER_DOMAIN || 'valleyofthecommons.com';

async function addToListmonk(email, name, attribs = {}) {
  try {
    const res = await fetch(`${BROKER_URL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: NEWSLETTER_DOMAIN, email, name: name || '' }),
    });
    if (!res.ok) {
      console.error(`[Listmonk] broker rejected ${email}: ${res.status}`);
      return false;
    }
    console.log(`[Listmonk] confirmation sent to ${email} for ${NEWSLETTER_DOMAIN}`);
    return true;
  } catch (err) {
    console.error('[Listmonk] broker unreachable:', err.message);
    return false;
  }
}

function isConfigured() {
  return Boolean(BROKER_URL);
}

module.exports = { addToListmonk, isConfigured };
