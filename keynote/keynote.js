// Keynote companion + index renderer. One template (keynote.html) serves both
// /keynote (index) and /keynote-<slug> (a talk companion); this module picks
// based on the path. Content comes from content.mjs (client-safe, no answers).
// The live quiz is layered on separately and only activates when a host opens a
// session; the companion below is the durable artifact and always renders.
import { ROOMS, WEEKS, MORE, COMING, AI_COURSE, CATEGORIES, AXES } from './content.mjs';

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

/* ---------- Companion hub: collapsible frosted-glass cards ------------------
   A keynote page is no longer one long scroll. It is a compact hub of glass
   tiles, one per section a talk has: the companion (the reading), the quiz
   results, the survey results, and any additional readings. Each tile opens
   into a sheet that morphs out of the tile (FLIP) with a spring, so nothing
   below the fold needs scrolling to reach. */

// A small inline icon set (stroked, currentColor) for the tiles.
const ICONS = {
  companion: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5A1.5 1.5 0 0 1 20 20.5z"/>',
  quiz: '<path d="M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7z"/><path d="M9 12l2 2 4-4"/>',
  survey: '<path d="M5 20V10M12 20V4M19 20v-7"/>',
  readings: '<path d="M4 6a2 2 0 0 1 2-2h9l5 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M14 4v5h5"/>',
};

function iconSvg(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

// Which sections a room offers, in display order. Each becomes one glass tile.
function sectionsFor(room) {
  const quiz = (room.items || []).filter((i) => i.type === 'quiz');
  const polls = (room.items || []).filter((i) => i.type === 'poll');
  const out = [
    {
      key: 'companion',
      accent: '#c4622d',
      icon: 'companion',
      label: 'The companion',
      hint: `The talk's argument, in ${room.beats.length} beats`,
      meta: `${room.beats.length} beats`,
      build: () => beatsPanel(room),
    },
  ];
  if (quiz.length)
    out.push({
      key: 'quiz',
      accent: '#7a9e7e',
      icon: 'quiz',
      label: 'The quiz',
      hint: 'How the room did on the night',
      meta: `${quiz.length} questions`,
      build: () => questionsPanel(room, 'quiz'),
    });
  if (polls.length)
    out.push({
      key: 'survey',
      accent: '#8b6914',
      icon: 'survey',
      label: 'The room',
      hint: 'What everyone thought, live',
      meta: `${polls.length} polls`,
      build: () => questionsPanel(room, 'survey'),
    });
  if (room.readings && room.readings.length)
    out.push({
      key: 'readings',
      accent: '#b8743a',
      icon: 'readings',
      label: 'Readings & extras',
      hint: room.readings[0].title,
      meta: `${room.readings.length} read`,
      build: () => readingsPanel(room.readings),
    });
  return out;
}

function tileHtml(s, idx) {
  return `<button type="button" class="kn-tile" data-tile="${idx}" style="--accent:${s.accent}">
      <span class="kn-tile__icon">${iconSvg(s.icon)}</span>
      <span class="kn-tile__text">
        <span class="kn-tile__label">${esc(s.label)}</span>
        <span class="kn-tile__hint">${esc(s.hint)}</span>
      </span>
      <span class="kn-tile__meta">${esc(s.meta)}</span>
      <span class="kn-tile__open" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>
      </span>
    </button>`;
}

/* ----- Panel content builders (rendered inside an opened sheet) ----- */

function beatsPanel(room) {
  return `<div class="kn-panel kn-panel--beats">
      <p class="kn-panel__eyebrow">The companion</p>
      <h2 class="kn-panel__title">${esc(room.meta.eyebrow)}</h2>
      <div class="kn-beats">${room.beats.map(beatHtml).join('')}</div>
    </div>`;
}

// The latest archived session's results for the current talk (standings +
// per-item aggregates), fetched once in renderCompanion. Null until it resolves,
// or when a talk has never run a session / Supabase is offline.
let latestResults = null;

function pct(n, total) {
  return total > 0 ? Math.round((n / total) * 100) : 0;
}

function standingsHtml(standings) {
  if (!standings || !standings.length) return '';
  const rows = standings
    .slice(0, 8)
    .map(
      (s, i) =>
        `<li class="kn-stand"><span class="kn-stand__r">${i + 1}</span><span class="kn-stand__n">${esc(s.nickname)}</span><span class="kn-stand__s">${esc(String(s.score))}</span></li>`
    )
    .join('');
  return `<div class="kn-standwrap"><p class="kn-standcap">Final standings</p><ol class="kn-stands">${rows}</ol></div>`;
}

// Quiz / survey results. When a live session has been archived, the option bars
// fill with the real tallies and the quiz shows final standings; otherwise the
// questions list with empty bars and a note that results appear after a session.
function questionsPanel(room, kind) {
  const eyebrow = kind === 'quiz' ? 'The quiz' : 'The room';
  const title = kind === 'quiz' ? 'How the room did' : 'What everyone thought';
  const itemType = kind === 'quiz' ? 'quiz' : 'poll';
  const results = latestResults;
  const hasData = !!(results && Array.isArray(results.aggregates) && results.aggregates.length);
  const note = hasData
    ? `From the live session${results.playerCount ? `, ${results.playerCount} ${kind === 'quiz' ? 'playing' : 'voting'}` : ''}.`
    : kind === 'quiz'
      ? 'Each question the room played on the night. Live standings and results appear here once a session has run.'
      : 'The pulse of the room. Live tallies fill these bars once a session has run.';
  let n = 0;
  const q = room.items
    .map((it, i) => {
      if (it.type !== itemType) return '';
      n += 1;
      const agg = hasData ? results.aggregates[i] || [] : null;
      const total = agg ? agg.reduce((a, b) => a + (b || 0), 0) : 0;
      const opts = it.options
        .map((o, oi) => {
          const p = total ? pct(agg[oi] || 0, total) : 0;
          const label = total
            ? `${esc(o)} <span class="kn-opt__pct">${p}%</span>`
            : esc(o);
          return `<li class="kn-opt"><span class="kn-opt__label">${label}</span><span class="kn-opt__track"><span class="kn-opt__fill" style="width:${p}%"></span></span></li>`;
        })
        .join('');
      return `<div class="kn-qcard">
          <div class="kn-qcard__head"><span class="kn-qcard__n">${String(n).padStart(2, '0')}</span><h3 class="kn-qcard__q">${esc(it.prompt)}</h3></div>
          <ul class="kn-opts">${opts}</ul>
        </div>`;
    })
    .join('');
  const stands = kind === 'quiz' && hasData ? standingsHtml(results.standings) : '';
  return `<div class="kn-panel">
      <p class="kn-panel__eyebrow">${eyebrow}</p>
      <h2 class="kn-panel__title">${title}</h2>
      <p class="kn-panel__note">${note}</p>
      ${stands}
      <div class="kn-qcards">${q}</div>
    </div>`;
}

function readingSectionHtml(sec) {
  if (sec.kind === 'quote') {
    return `<blockquote class="kn-read__quote">${esc(sec.body)}</blockquote>`;
  }
  if (sec.kind === 'prose') {
    return `${sec.heading ? `<h3 class="kn-read__h">${esc(sec.heading)}</h3>` : ''}<p class="kn-read__p">${esc(sec.body)}</p>`;
  }
  if (sec.kind === 'mechanisms') {
    const items = sec.items
      .map(
        (m) =>
          `<div class="kn-mech"><span class="kn-mech__dot"></span><div><h4 class="kn-mech__h">${esc(m.title)}</h4><p class="kn-read__p">${esc(m.body)}</p></div></div>`
      )
      .join('');
    return `<h3 class="kn-read__h">${esc(sec.heading)}</h3><div class="kn-mechs">${items}</div>`;
  }
  // cases
  const cards = sec.items
    .map(
      (c) =>
        `<div class="kn-case"><div class="kn-case__head"><h4 class="kn-case__h">${esc(c.title)}</h4><span class="kn-case__era">${esc(c.era)}</span></div><p class="kn-read__p">${esc(c.body)}</p></div>`
    )
    .join('');
  return `<h3 class="kn-read__h">${esc(sec.heading)}</h3>${sec.intro ? `<p class="kn-read__p kn-read__intro">${esc(sec.intro)}</p>` : ''}<div class="kn-cases">${cards}</div>`;
}

function readingsPanel(readings) {
  const r = readings[0];
  return `<div class="kn-panel kn-panel--read">
      <p class="kn-panel__eyebrow">${esc(r.eyebrow || 'A read')}</p>
      <h2 class="kn-panel__title">${esc(r.title)}</h2>
      ${r.lede ? `<p class="kn-read__lede">${esc(r.lede)}</p>` : ''}
      ${r.sections.map(readingSectionHtml).join('')}
    </div>`;
}

/* ----- Sheet: FLIP morph from a tile to a centred glass sheet ----- */

function openSheet(tile, accent, contentHtml) {
  const overlay = document.createElement('div');
  overlay.className = 'kn-overlay';
  overlay.innerHTML = `<div class="kn-sheet" style="--accent:${accent}" role="dialog" aria-modal="true">
      <button type="button" class="kn-sheet__close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
      <div class="kn-sheet__scroll">${contentHtml}</div>
    </div>`;
  document.body.appendChild(overlay);
  const sheet = overlay.querySelector('.kn-sheet');
  const scroll = overlay.querySelector('.kn-sheet__scroll');

  const spring = 'cubic-bezier(.22,1,.36,1)';
  const map = (from, to) => {
    const sx = from.width / to.width;
    const sy = from.height / to.height;
    const tx = from.left + from.width / 2 - (to.left + to.width / 2);
    const ty = from.top + from.height / 2 - (to.top + to.height / 2);
    return `translate(${tx}px,${ty}px) scale(${sx},${sy})`;
  };

  const first = tile.getBoundingClientRect();
  const last = sheet.getBoundingClientRect();
  sheet.animate(
    [
      { transform: map(first, last), opacity: 0.35, borderRadius: '18px' },
      { transform: 'translate(0,0) scale(1,1)', opacity: 1, borderRadius: '22px' },
    ],
    { duration: 480, easing: spring, fill: 'both' }
  );
  overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'ease', fill: 'both' });
  scroll.animate(
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'none' },
    ],
    { duration: 420, delay: 130, easing: 'ease', fill: 'both' }
  );

  let closing = false;
  const close = () => {
    if (closing) return;
    closing = true;
    const f = sheet.getBoundingClientRect();
    const t = tile.getBoundingClientRect();
    sheet.animate(
      [
        { transform: 'none', opacity: 1 },
        { transform: map(t, f), opacity: 0.25 },
      ],
      { duration: 340, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' }
    );
    const done = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 300,
      easing: 'ease',
      fill: 'both',
    });
    done.onfinish = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    };
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector('.kn-sheet__close').addEventListener('click', close);
  document.addEventListener('keydown', onKey);
}

function renderCompanion(room) {
  const m = room.meta;
  document.title = m.metaTitle || m.eyebrow;
  document.body.classList.add('kn-glass');
  const sections = sectionsFor(room);
  app.innerHTML = `
    <div class="kn-backdrop" aria-hidden="true"></div>
    <a class="back" href="/keynote">&larr; All the talks</a>
    <div class="companion kn-hubwrap">
      <header class="companion__head">
        <span class="eyebrow">A companion</span>
        <h1 class="companion__title">${esc(m.eyebrow)}</h1>
        <p class="companion__speaker">${esc(m.speaker)}</p>
        ${socialsHtml(m.socials)}
        ${watchHtml(m.livestream)}
      </header>
      <div class="kn-hub">${sections.map(tileHtml).join('')}</div>
      <a class="cta" href="${esc(room.cta.url)}">${esc(room.cta.label)}</a>
    </div>
    <div id="session" class="session" style="display:none"></div>`;

  app.querySelectorAll('.kn-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const s = sections[Number(tile.dataset.tile)];
      if (s) openSheet(tile, s.accent, s.build());
    });
  });

  // Talks with items (Week 2 + evergreen) get the live quiz layer; it stays
  // dormant (companion shown) until a host opens a session. Week 1 is
  // companion-only (items: []), so this never loads there.
  if (room.items && room.items.length) {
    // Pull the latest archived session's results so the quiz / survey tiles show
    // real tallies. Best-effort: on any failure the tiles fall back to the empty
    // state. Usually resolves before a tile is opened.
    fetch(`/api/keynote/results?slug=${encodeURIComponent(room.slug)}`)
      .then((r) => r.json())
      .then((d) => {
        latestResults = d && Array.isArray(d.aggregates) && d.aggregates.length ? d : null;
      })
      .catch(() => {});
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
// A talk that carries a `url` (e.g. a companion already live elsewhere) instead
// renders as a real link that navigates there.
function soonCardHtml(t, idx) {
  const spine = SPINES[idx % SPINES.length];
  const inner = `<div>
        <div class="card__speaker">${esc(t.speaker)}</div>
        ${t.talk ? `<div class="card__talk">${esc(t.talk)}</div>` : ''}
      </div>`;
  if (t.url) {
    const external = /^https?:/i.test(t.url);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a class="card" style="--spine:${spine}" href="${esc(t.url)}"${attrs}>
      ${inner}
      <span class="card__arrow" aria-hidden="true">&rarr;</span>
    </a>`;
  }
  return `<button type="button" class="card card--soon" style="--spine:${spine}">
      ${inner}
      <span class="card__arrow" data-soon-arrow aria-hidden="true">&rarr;</span>
    </button>`;
}

// The AI-course CTA, mirroring learn-ai.london/valley: one non-talk destination
// that links out to the "build your own agentic system" page on learn-ai.london.
function aiCourseHtml() {
  const c = AI_COURSE;
  if (!c || !c.url) return '';
  const external = /^https?:/i.test(c.url);
  const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a class="ai-course" href="${esc(c.url)}"${attrs}>
      <div>
        <div class="eyebrow">${esc(c.eyebrow)}</div>
        <div class="ai-course__title">${esc(c.title)}</div>
        ${c.sub ? `<div class="ai-course__sub">${esc(c.sub)}</div>` : ''}
      </div>
      <span class="card__arrow" aria-hidden="true">&rarr;</span>
    </a>`;
}

function renderIndex() {
  document.title = 'Keynote companions \xb7 Valley of the Commons';
  document.body.classList.add('kn-glass');
  let idx = 0;
  const weeks = (WEEKS || [])
    .map((w) => {
      const cards = w.slugs
        .map((slug) => cardHtml(slug, idx++))
        .join('');
      // A week can mix published talks (linked cards) with announced-but-unpublished
      // ones (coming-soon cards) under the same header.
      const soon = (w.coming || [])
        .map((t) => soonCardHtml(t, idx++))
        .join('');
      return `<section class="week">
        <div class="week__label">${esc(w.label)}</div>
        <h2 class="week__theme">${esc(w.theme)}</h2>
        <div class="grid">${cards}${soon}</div>
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
    <div class="kn-backdrop" aria-hidden="true"></div>
    <a class="back" href="/#schedule">&larr; Valley of the Commons</a>
    <header class="index__head">
      <span class="eyebrow">Valley of the Commons</span>
      <h1 class="index__title">Companions to the talks</h1>
      <p class="index__sub">Each talk's argument in beats, with the sources it draws on. Explore the ideas as a constellation, or by date.</p>
    </header>
    ${/* AI-course CTA hidden pending the VOTC mirror of /valley-ai (its own gated
        app). AI_COURSE + aiCourseHtml() are kept intact for that follow-up. */ ''}
    <div class="vg-toggle" role="tablist" aria-label="View">
      <button role="tab" data-view="graph" class="vg-toggle__btn is-active"><span aria-hidden="true">&#10022;</span> Constellation</button>
      <button role="tab" data-view="timeline" class="vg-toggle__btn"><span aria-hidden="true">&#9636;</span> Timeline</button>
    </div>
    <div class="vg-wrap" id="kn-graph"><p class="vg-hint">Drag to orbit &middot; scroll to zoom &middot; tap a star</p></div>
    <div class="kn-timeline" hidden>${weeks}${coming}${more}</div>`;

  // View toggle: the 3D Constellation (default) or the chronological Timeline.
  // The graph mounts lazily on first reveal and stays mounted after.
  const graphWrap = app.querySelector('#kn-graph');
  const timeline = app.querySelector('.kn-timeline');
  let graphMounted = false;
  const mountGraphOnce = () => {
    if (graphMounted) return;
    graphMounted = true;
    import('./graph.mjs')
      .then((m) => m.mountConstellation(graphWrap, CATEGORIES, AXES))
      .catch((err) => {
        graphWrap.innerHTML = '<p class="vg-hint" style="position:static">The constellation could not load. Try the Timeline.</p>';
        console.error('constellation failed', err);
      });
  };
  app.querySelectorAll('.vg-toggle__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      app.querySelectorAll('.vg-toggle__btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      const graph = view === 'graph';
      graphWrap.hidden = !graph;
      timeline.hidden = graph;
      if (graph) mountGraphOnce();
    });
  });
  mountGraphOnce();

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

// A standalone reading (additional thoughts / literature) tied to a talk, at
// /keynote-<slug>-gatherings. Same dark-glass surface as the companion hub, but a
// single long-form article the reader can be pointed straight to.
function renderReading(room, base) {
  const r = room.readings[0];
  document.title = `${r.title} \xb7 Valley of the Commons`;
  document.body.classList.add('kn-glass');
  app.innerHTML = `
    <div class="kn-backdrop" aria-hidden="true"></div>
    <a class="back" href="/keynote-${esc(base)}">&larr; Back to the talk</a>
    <div class="companion kn-reading">${readingsPanel(room.readings)}</div>
    <a class="cta" href="/keynote">Valley of the Commons</a>`;
}

const path = location.pathname.replace(/\/+$/, '') || '/keynote';
if (path === '/keynote') {
  renderIndex();
} else {
  const slug = path.replace(/^\/keynote-/, '');
  const reading = /^(.*)-gatherings$/.exec(slug);
  if (reading) {
    const room = ROOMS[reading[1]];
    if (room && room.readings && room.readings.length) renderReading(room, reading[1]);
    else renderNotFound();
  } else {
    const room = ROOMS[slug];
    if (room) renderCompanion(room);
    else renderNotFound();
  }
}
