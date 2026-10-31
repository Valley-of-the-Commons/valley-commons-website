// /survey/results: the final synthesis, the projects board and the forward look.
// The data is an encrypted file (survey/locked-results.js) opened here with the
// shared password; a saved key lets a returning visitor skip the form.
import { createStorage } from './storage.js';
import { deriveKey, unlockResults } from './locked-results.js';
import { $, el, esc, gate, wirePrivacyLinks } from './ui.js';

const mount = $('#app');
const storage = createStorage();
const KEY = 'votc.survey.resultsKey';
const FILE_URL = '/data/votc-survey-results.locked.json';
const LOAD_ERROR = 'The results cannot be loaded right now. Try again in a minute.';

// Validated with the dataviz palette script: sentiment is a diverging scale
// (green arm, neutral midpoint, orange); event interest is one orange ramp.
const SENTIMENT = [
  ['very positive', '#2c3e2d'],
  ['positive', '#6f9473'],
  ['mixed', '#a89f91'],
  ['negative', '#c4622d'],
];
const INTEREST = [
  ['interested', '#dfa070'],
  ['likely', '#c4622d'],
  ['committed', '#83401a'],
];

let lockedFile = null;
const loadFile = async () => {
  if (!lockedFile) {
    const res = await fetch(FILE_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    lockedFile = await res.json();
  }
  return lockedFile;
};

// Opens the results with a password, saving the derived key for next time.
async function unlockWithPassword(password) {
  try {
    const file = await loadFile();
    const data = await unlockResults(file, { password });
    storage.set(KEY, await deriveKey(password, file));
    render(data);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.name === 'WrongPassword' ? 'That password is not right.' : LOAD_ERROR };
  }
}

async function main() {
  wirePrivacyLinks();
  const key = storage.get(KEY);
  if (key) {
    try {
      return render(await unlockResults(await loadFile(), { key }));
    } catch (err) {
      if (err.name !== 'WrongPassword') return mount.replaceChildren(el(`<p class="sv-lede">${LOAD_ERROR}</p>`));
      storage.remove(KEY);
    }
  }
  await gate(mount, {
    title: 'What we heard',
    lede: 'A summary of what attendees said about Valley of the Commons 2026, and the projects that came out of it.',
    unlock: unlockWithPassword,
  });
}

function render(r) {
  const s = r.synthesis;
  const updated = new Date(r.generated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  mount.classList.add('rs-main');
  mount.replaceChildren(el(`
    <article class="rs sv-rise">
      <header class="rs-head">
        <p class="eyebrow">Valley of the Commons 2026</p>
        <h1 class="sv-title">What we heard.</h1>
        <p class="rs-meta">From ${r.respondents} ${r.respondents === 1 ? 'person' : 'people'} · final results, ${esc(updated)} · written by an AI from everyone's answers</p>
      </header>

      <section class="rs-section">
        <h2 class="rs-h2">How it went</h2>
        ${area(s.overall)}
        ${sentimentBar(s.overall.sentiment || {})}
        ${s.one_word.length ? `<h3 class="rs-h3">In one word</h3><p class="rs-cloud">${cloud(s.one_word)}</p>` : ''}
      </section>

      <section class="rs-section">
        <h2 class="rs-h2">Keep doing</h2>
        ${area(s.keep)}
      </section>

      <section class="rs-section">
        <h2 class="rs-h2">Make better</h2>
        <div class="rs-grid">
          ${[['Space', s.improve.space], ['Structure', s.improve.structure], ['Organisation', s.improve.organisation]]
            .map(([t, a]) => `<div class="rs-card"><h3 class="rs-h3">${t}</h3>${area(a)}</div>`).join('')}
        </div>
      </section>

      ${s.open_space || s.food ? `<section class="rs-section">
        <h2 class="rs-h2">Open space and food</h2>
        <div class="rs-grid rs-grid--two">
          ${[['Open space', s.open_space], ['Food', s.food]].filter(([, a]) => a)
            .map(([t, a]) => `<div class="rs-card"><h3 class="rs-h3">${t}</h3>${area(a)}</div>`).join('')}
        </div>
      </section>` : ''}

      <section class="rs-section">
        <h2 class="rs-h2">Never again</h2>
        ${area(s.never_again)}
      </section>

      <section class="rs-section">
        <h2 class="rs-h2">What emerged</h2>
        <p class="rs-sub">Projects and initiatives people want to continue, shared with their permission.</p>
        ${r.board.length ? `<div class="rs-board">${r.board.map(card).join('')}</div>` : '<p class="rs-sub">No projects shared on the board.</p>'}
      </section>

      <section class="rs-section">
        <h2 class="rs-h2">Looking ahead</h2>
        ${forward(r.forward, r.respondents)}
      </section>
    </article>`));
}

const area = (a) => `
  <p class="rs-summary">${esc(a.summary)}</p>
  ${a.themes?.length ? `<ul class="rs-themes">${a.themes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}`;

// A single stacked bar with a visible count on every segment. With `outOf`, the
// bar's length is its share of that number, so bars compare across rows.
function stacked(levels, counts, label, outOf) {
  const total = levels.reduce((n, [k]) => n + (counts[k] || 0), 0);
  if (!total) return '';
  const width = outOf ? Math.max(8, Math.min(100, (total / outOf) * 100)) : 100;
  const segments = levels.filter(([k]) => counts[k]).map(([k, color]) =>
    `<span class="rs-seg" style="flex:${counts[k]};background:${color}" title="${esc(k)}: ${counts[k]}"><b>${counts[k]}</b></span>`).join('');
  return `<div class="rs-bar" style="width:${width}%" role="img" aria-label="${esc(label)}: ${levels.map(([k]) => `${k} ${counts[k] || 0}`).join(', ')}">${segments}</div>`;
}

const legend = (levels) => `<ul class="rs-legend">${levels.map(([k, c]) => `<li><i style="background:${c}"></i>${esc(k)}</li>`).join('')}</ul>`;

const sentimentBar = (counts) => {
  const bar = stacked(SENTIMENT, counts, 'Overall sentiment');
  return bar ? `<div class="rs-chart">${bar}${legend(SENTIMENT)}</div>` : '';
};

function cloud(words) {
  const max = Math.max(...words.map((w) => w.count));
  return words.slice(0, 40).map((w) => {
    const size = 1 + (w.count / max) * 1.4;
    return `<span style="font-size:${size.toFixed(2)}rem" title="${w.count}">${esc(w.word)}</span>`;
  }).join(' ');
}

function card(p) {
  const people = [...p.people, ...(p.others ? [`${p.others} other${p.others > 1 ? 's' : ''}`] : [])];
  return `
    <div class="rs-project">
      <div class="rs-project__top">
        ${p.stage ? `<span class="rs-stage rs-stage--${esc(p.stage)}">${esc(p.stage)}</span>` : ''}
        <span class="rs-by">${p.by ? esc(p.by) : 'Anonymous'}</span>
      </div>
      <h3 class="rs-project__name">${esc(p.name)}</h3>
      ${p.summary ? `<p class="rs-project__summary">${esc(p.summary)}</p>` : ''}
      ${people.length ? `<p class="rs-project__line"><span>With</span> ${esc(people.join(', '))}</p>` : ''}
      ${p.help_needed ? `<p class="rs-project__line"><span>Help needed</span> ${esc(p.help_needed)}</p>` : ''}
      ${p.connections.length ? `<p class="rs-project__line"><span>Linked to</span> ${esc(p.connections.join(', '))}</p>` : ''}
    </div>`;
}

function forward(f, respondents) {
  const ri = f.return_intent;
  const events = f.events.map((e) => {
    const bar = stacked(INTEREST, e, e.name, respondents);
    return `<li class="rs-event"><div class="rs-event__name"><strong>${esc(e.name)}</strong><span>${esc(e.dates)}</span></div>${bar || '<span class="rs-none">No interest recorded yet</span>'}</li>`;
  }).join('');
  const list = (items) => items.map((i) => `<li>${esc(i.text)}${i.by ? ` <span class="rs-by">${esc(i.by)}</span>` : ''}</li>`).join('');
  return `
    <div class="rs-stats">
      <div class="rs-stat"><b>${ri.yes}</b><span>plan to come back</span></div>
      <div class="rs-stat"><b>${ri.maybe}</b><span>might come back</span></div>
    </div>
    <h3 class="rs-h3">Interest in upcoming events</h3>
    <div class="rs-chart">${legend(INTEREST)}<ul class="rs-events">${events}</ul></div>
    <p class="rs-sub rs-sub--after">Bar length is the share of the ${respondents} people who took part. Upcoming events are plans, not promises.</p>
    ${f.new_formats.length ? `<h3 class="rs-h3">New formats people would propose</h3><ul class="rs-list">${list(f.new_formats)}</ul>` : ''}`;
}

main();
