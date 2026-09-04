// Keynote companion + index renderer. One template (keynote.html) serves both
// /keynote (index) and /keynote-<slug> (a talk companion); this module picks
// based on the path. Content comes from content.mjs (client-safe, no answers).
// The live quiz is layered on separately and only activates when a host opens a
// session; the companion below is the durable artifact and always renders.
import { ROOMS, WEEKS, MORE, COMING } from './content.mjs';

const app = document.getElementById('app');

// Minimal HTML escaping for interpolated text.
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
  );
}

// A restrained per-talk accent drawn from the site palette (not a rainbow).
const SPINES = ['#c4622d', '#7a9e7e', '#8b6914', '#2c3e2d'];

function socialsHtml(socials) {
  if (!socials || !socials.length) return '';
  const links = socials
    .map(
      (s) =>
        `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`
    )
    .join('');
  return `<div class="companion__socials">${links}</div>`;
}

// Link to the session's YouTube livestream recording, when we have one.
function watchHtml(url) {
  if (!url) return '';
  return `<a class="companion__watch" href="${esc(url)}" target="_blank" rel="noopener noreferrer">
      <span aria-hidden="true">&#9654;</span> Watch the livestream <span aria-hidden="true">&#8599;</span>
    </a>`;
}

function beatHtml(b) {
  const links =
    b.links && b.links.length
      ? `<div class="beat__links">${b.links
          .map(
            (l) =>
              `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>`
          )
          .join('')}</div>`
      : '';
  const n = String(b.n).padStart(2, '0');
  return `<article class="beat">
      <div class="beat__head"><span class="beat__n">${esc(n)}</span><h2 class="beat__title">${esc(b.title)}</h2></div>
      <p class="beat__body">${esc(b.body)}</p>
      ${links}
    </article>`;
}

function renderCompanion(room) {
  const m = room.meta;
  document.title = m.metaTitle || m.eyebrow;
  app.innerHTML = `
    <a class="back" href="/keynote">&larr; All the talks</a>
    <div class="companion">
      <header class="companion__head">
        <span class="eyebrow">A companion</span>
        <h1 class="companion__title">${esc(m.eyebrow)}</h1>
        <p class="companion__speaker">${esc(m.speaker)}</p>
        ${socialsHtml(m.socials)}
        ${watchHtml(m.livestream)}
      </header>
      <div class="beats">${room.beats.map(beatHtml).join('')}</div>
      <a class="cta" href="${esc(room.cta.url)}">${esc(room.cta.label)}</a>
    </div>
    <div id="session" class="session" style="display:none"></div>`;
  // Talks with items (Week 2 + evergreen) get the live quiz layer; it stays
  // dormant (companion shown) until a host opens a session. Week 1 is
  // companion-only (items: []), so this never loads there.
  if (room.items && room.items.length) {
    const companionEl = app.querySelector('.companion');
    const sessionEl = document.getElementById('session');
    import('./session.mjs')
      .then((mod) => mod.initSession(room, { companion: companionEl, session: sessionEl }))
      .catch(() => {});
  }
}

function cardHtml(slug, idx) {
  const room = ROOMS[slug];
  if (!room) return '';
  const m = room.meta;
  const spine = SPINES[idx % SPINES.length];
  return `<a class="card" style="--spine:${spine}" href="/keynote-${esc(slug)}">
      <div>
        <div class="card__speaker">${esc(m.speaker)}</div>
        <div class="card__talk">${esc(m.eyebrow)}</div>
      </div>
      <span class="card__arrow" aria-hidden="true">&rarr;</span>
    </a>`;
}

// An announced-but-unpublished talk: looks like a normal card (speaker, talk,
// arrow) but has no page. It is a button that shows "Coming soon" on click.
function soonCardHtml(t, idx) {
  const spine = SPINES[idx % SPINES.length];
  return `<button type="button" class="card card--soon" style="--spine:${spine}">
      <div>
        <div class="card__speaker">${esc(t.speaker)}</div>
        ${t.talk ? `<div class="card__talk">${esc(t.talk)}</div>` : ''}
      </div>
      <span class="card__arrow" data-soon-arrow aria-hidden="true">&rarr;</span>
    </button>`;
}

function renderIndex() {
  document.title = 'Keynote companions \xb7 Valley of the Commons';
  let idx = 0;
  const weeks = (WEEKS || [])
    .map((w) => {
      const cards = w.slugs
        .map((slug) => cardHtml(slug, idx++))
        .join('');
      return `<section class="week">
        <div class="week__label">${esc(w.label)}</div>
        <h2 class="week__theme">${esc(w.theme)}</h2>
        <div class="grid">${cards}</div>
      </section>`;
    })
    .join('');
  const coming = (COMING || [])
    .map((w) => {
      const cards = w.talks.map((t) => soonCardHtml(t, idx++)).join('');
      return `<section class="week">
        <div class="week__label">${esc(w.label)}</div>
        <h2 class="week__theme">${esc(w.theme)}</h2>
        <div class="grid">${cards}</div>
      </section>`;
    })
    .join('');
  const more =
    MORE && MORE.length
      ? `<section class="week">
          <div class="week__label">More companions</div>
          <div class="grid">${MORE.map((slug) => cardHtml(slug, idx++)).join('')}</div>
        </section>`
      : '';
  app.innerHTML = `
    <a class="back" href="/#schedule">&larr; Valley of the Commons</a>
    <header class="index__head">
      <span class="eyebrow">Valley of the Commons</span>
      <h1 class="index__title">Companions to the talks</h1>
      <p class="index__sub">Each talk's argument in beats, with the sources it draws on. Pick a talk.</p>
    </header>
    ${weeks}
    ${coming}
    ${more}`;

  // Coming-soon cards: no page, so a click briefly swaps the arrow for a small
  // "Coming soon" message instead of navigating.
  app.querySelectorAll('.card--soon').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.busy) return;
      const arrow = btn.querySelector('[data-soon-arrow]');
      if (!arrow) return;
      btn.dataset.busy = '1';
      arrow.textContent = 'Coming soon';
      arrow.classList.add('card__soonmsg');
      setTimeout(() => {
        arrow.innerHTML = '&rarr;';
        arrow.classList.remove('card__soonmsg');
        delete btn.dataset.busy;
      }, 1800);
    });
  });
}

function renderNotFound() {
  document.title = 'Not found \xb7 Valley of the Commons';
  app.innerHTML = `<a class="back" href="/keynote">&larr; All the talks</a>
    <div class="companion"><h1 class="companion__title">Talk not found</h1>
    <p class="companion__speaker">That companion does not exist yet. <a href="/keynote" style="color:var(--orange)">See all the talks</a>.</p></div>`;
}

const path = location.pathname.replace(/\/+$/, '') || '/keynote';
if (path === '/keynote') {
  renderIndex();
} else {
  const slug = path.replace(/^\/keynote-/, '');
  const room = ROOMS[slug];
  if (room) renderCompanion(room);
  else renderNotFound();
}
