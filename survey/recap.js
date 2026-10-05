// /survey/recap: the "Recap & news" package from the Pi API, behind the same
// password as the rest of the survey.
import { getToken, request } from './api.js';
import { recapHtml, recapUpdated } from './recapView.js';
import { $, el, esc, gate, wirePrivacyLinks } from './ui.js';

const mount = $('#app');

async function main() {
  wirePrivacyLinks();
  if (!getToken()) {
    await gate(mount, {
      title: 'Recap & news',
      lede: 'What happened each week at Valley of the Commons 2026, and news for attendees.',
    });
  }
  let res;
  try {
    res = await request('/recap');
  } catch {
    return mount.replaceChildren(el('<p class="sv-lede">The recap cannot be loaded right now. Try again in a minute.</p>'));
  }
  if (res.status === 401) return main();
  const body = res.ok ? recapHtml(res.data) : '';
  const updated = res.ok ? recapUpdated(res.data) : '';
  mount.classList.add('rs-main');
  mount.replaceChildren(el(`
    <article class="rs sv-rise">
      <header class="rs-head">
        <p class="eyebrow">Valley of the Commons 2026</p>
        <h1 class="sv-title">Recap &amp; news.</h1>
        ${updated ? `<p class="rs-meta">Updated ${esc(updated)}</p>` : ''}
      </header>
      ${body || '<p class="sv-lede">Nothing to show yet.</p>'}
    </article>`));
}

main();
