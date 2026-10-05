// "Recap & news": renders the package served by the Pi API (GET /recap) as HTML.
// Shared by the recap page and the thank-you screen. Pure, so it is unit-tested.
// Sections that are null or empty do not render.
import { esc } from './ui.js';

const paragraphs = (list) => (list || []).map((p) => `<p>${esc(p)}</p>`).join('');
const safeUrl = (u) => (/^https?:\/\//i.test(String(u || '')) ? String(u) : null);
const hasText = (s) => Boolean(s && (s.title || s.paragraphs?.length));

export const hasRecap = (r) => Boolean(r && (hasText(r.message) || r.weeks?.length || hasText(r.fundraise)));

const note = (s, cls, cta = '') => `
  <section class="rc-note ${cls}">
    ${s.title ? `<h3 class="rc-note__title">${esc(s.title)}</h3>` : ''}
    ${paragraphs(s.paragraphs)}${cta}
  </section>`;

const week = (w) => `
  <li class="rc-week">
    <p class="rc-week__label">${esc(w.label)}<span>${esc(w.dates)}</span></p>
    <h3 class="rc-week__theme">${esc(w.theme)}</h3>
    ${paragraphs(w.paragraphs)}
  </li>`;

export function recapHtml(r) {
  if (!hasRecap(r)) return '';
  const url = safeUrl(r.fundraise?.cta_url);
  const cta = url && r.fundraise.cta_label ? `<a class="btn btn-orange" href="${esc(url)}" target="_blank" rel="noopener">${esc(r.fundraise.cta_label)}</a>` : '';
  return `
    <div class="rc">
      ${hasText(r.message) ? note(r.message, 'rc-note--message') : ''}
      ${r.weeks?.length ? `<ol class="rc-weeks">${r.weeks.map(week).join('')}</ol>` : ''}
      ${hasText(r.fundraise) ? note(r.fundraise, 'rc-note--fund', cta) : ''}
    </div>`;
}

/** "5 October 2026" from the recap's YYYY-MM-DD, or '' when absent or malformed. */
export function recapUpdated(r) {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(r?.updated || '') ? new Date(`${r.updated}T00:00:00Z`) : null;
  return d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';
}
