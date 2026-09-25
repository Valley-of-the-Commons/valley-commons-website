// Keynote content + route tests. node:test + node:assert only, no new deps.
// Run with `npm test` (node --test tests/).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const DASH_RE = /[\u2014\u2013]/; // em dash, en dash

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const content = await import(path.join(ROOT, 'keynote', 'content.mjs'));
const { ROOMS, WEEKS, MORE, CATEGORIES } = content;

test('every WEEKS slug (string entries) exists in ROOMS', () => {
  for (const week of WEEKS) {
    for (const entry of week.slugs) {
      if (typeof entry === 'string') {
        assert.ok(ROOMS[entry], `WEEKS references missing room "${entry}"`);
      } else {
        assert.ok(entry.url, `non-room WEEKS entry missing url: ${JSON.stringify(entry)}`);
      }
    }
  }
});

test('every MORE slug exists in ROOMS', () => {
  for (const slug of MORE) {
    assert.ok(ROOMS[slug], `MORE references missing room "${slug}"`);
  }
});

test('every CATEGORIES href of form /keynote-<x> resolves to a room or w4-d1', () => {
  for (const cat of CATEGORIES) {
    if (!cat.href) continue;
    const m = /^\/keynote-(.+)$/.exec(cat.href);
    assert.ok(m, `CATEGORIES href not a /keynote-<slug> path: ${cat.href}`);
    const slug = m[1];
    assert.ok(ROOMS[slug] || slug === 'w4-d1', `CATEGORIES href resolves to nothing: ${cat.href}`);
  }
});

test('no room has an items key', () => {
  for (const [slug, room] of Object.entries(ROOMS)) {
    assert.ok(!('items' in room), `room "${slug}" still has an items key`);
  }
});

test('every room cta.url is "/keynotes"', () => {
  for (const [slug, room] of Object.entries(ROOMS)) {
    assert.equal(room.cta.url, '/keynotes', `room "${slug}" cta.url is not /keynotes`);
  }
});

test('no em dash or en dash in keynote source files', () => {
  const files = [
    'keynote/content.mjs',
    'keynote/keynote.js',
    'keynote/keynote.css',
    'data/keynote-results.json',
    'docs/keynote-companions.md',
    'trust/index.html',
    'trust/trust.js',
    'trust/trust.css',
    'data/trust-tournament-2026-09-19.json',
  ];
  for (const f of files) {
    const text = readFileSync(path.join(ROOT, f), 'utf8');
    assert.ok(!DASH_RE.test(text), `${f} contains an em dash or en dash`);
  }
});

// ---------------------------------------------------------------------------
// Results JSON
// ---------------------------------------------------------------------------

const results = JSON.parse(readFileSync(path.join(ROOT, 'data', 'keynote-results.json'), 'utf8'));

test('every results session slug exists in ROOMS', () => {
  for (const slug of Object.keys(results.sessions)) {
    assert.ok(ROOMS[slug], `results.json has a session for missing room "${slug}"`);
  }
});

test('every item counts.length matches options.length', () => {
  for (const [slug, session] of Object.entries(results.sessions)) {
    for (const [i, item] of session.items.entries()) {
      assert.equal(
        item.counts.length,
        item.options.length,
        `${slug} item ${i} ("${item.prompt}"): counts.length !== options.length`
      );
    }
  }
});

test('quiz items have an integer correct index within range', () => {
  for (const [slug, session] of Object.entries(results.sessions)) {
    for (const [i, item] of session.items.entries()) {
      if (item.type !== 'quiz') continue;
      assert.ok(Number.isInteger(item.correct), `${slug} item ${i}: correct is not an integer`);
      assert.ok(
        item.correct >= 0 && item.correct < item.options.length,
        `${slug} item ${i}: correct index ${item.correct} out of range`
      );
    }
  }
});

// ---------------------------------------------------------------------------
// Routes (spawns the real server on a free port)
// ---------------------------------------------------------------------------

function waitForListening(child, port) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('server did not start in time')), 15000);
    const onData = (buf) => {
      if (buf.toString().includes(`port ${port}`)) {
        clearTimeout(timer);
        child.stdout.off('data', onData);
        resolve();
      }
    };
    child.stdout.on('data', onData);
    child.on('exit', (code) => {
      if (code !== 0) reject(new Error(`server exited early with code ${code}`));
    });
  });
}

async function withServer(fn) {
  const port = 34000 + Math.floor(Math.random() * 4000);
  const child = spawn(process.execPath, ['server.js'], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(port), NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  try {
    await waitForListening(child, port);
    await fn(`http://localhost:${port}`);
  } finally {
    child.kill();
  }
}

test('keynote routes', { timeout: 30000 }, async () => {
  await withServer(async (base) => {
    let res = await fetch(`${base}/keynotes`);
    assert.equal(res.status, 200);
    assert.ok((await res.text()).includes('<html'));

    res = await fetch(`${base}/keynote`, { redirect: 'manual' });
    assert.equal(res.status, 301);
    assert.equal(res.headers.get('location'), '/keynotes');

    for (const [slug, speaker] of [
      ['w4-d3', 'Daniela Gandorfer'],
      ['w4-d4', 'Simon Kozak'],
      ['w4-d5', 'Rashmi Abbigeri'],
      ['sterlin-parallel-mind', 'Sterlin Lujan'],
    ]) {
      res = await fetch(`${base}/keynote-${slug}`);
      assert.equal(res.status, 200, `/keynote-${slug} did not return 200`);
      const html = await res.text();
      const title = ROOMS[slug].meta.metaTitle;
      assert.ok(html.includes(speaker), `/keynote-${slug} title missing speaker`);
      assert.ok(html.includes(`<title>${title}</title>`), `/keynote-${slug} <title> mismatch`);
    }

    res = await fetch(`${base}/keynote-w4-d1`);
    assert.equal(res.status, 200);

    res = await fetch(`${base}/data/keynote-results.json`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /application\/json/);
    assert.ok((await res.json()).sessions);

    res = await fetch(`${base}/api/keynote/config`);
    assert.notEqual(res.status, 200);

    res = await fetch(`${base}/package.json`);
    assert.notEqual(res.status, 200);
  });
});

// ---------------------------------------------------------------------------
// Trust Tournament results page
// ---------------------------------------------------------------------------

const trust = JSON.parse(readFileSync(path.join(ROOT, 'data', 'trust-tournament-2026-09-19.json'), 'utf8'));

test('trust data: ranks, ring order and reference totals are consistent', () => {
  const names = trust.players.map((p) => p.nickname);
  assert.deepEqual([...trust.ringOrder].sort(), [...names].sort());
  trust.players.forEach((p, i) => assert.equal(p.rank, i + 1));
  for (let i = 1; i < trust.players.length; i++) {
    assert.ok(trust.players[i - 1].score >= trust.players[i].score, 'players sorted by score');
  }
  // Recompute the reference totals from the rules (target group sizes).
  const { CC, CD, DC, DD } = trust.scoring.pair;
  const { perCooperatorToEveryone: per, defectorBonus: bonus } = trust.scoring.commons;
  const sum = (f) => trust.rounds.reduce((t, r) => t + f(r), 0);
  const ref = trust.reference;
  assert.equal(sum((r) => (r.game === 'pair' ? CC : per * r.groupSize)), ref.everyoneCooperates);
  assert.equal(sum((r) => (r.game === 'pair' ? DD : bonus)), ref.everyoneDefects);
  assert.equal(sum((r) => (r.game === 'pair' ? DC : per * (r.groupSize - 1) + bonus)), ref.highest);
  assert.equal(sum((r) => (r.game === 'pair' ? CD : per)), ref.lowest);
});

test('trust page: every section renderer called at boot is defined', () => {
  const src = readFileSync(path.join(ROOT, 'trust', 'trust.js'), 'utf8');
  const called = [...src.matchAll(/(\w+Html)\(d\)/g)].map((m) => m[1]);
  for (const name of new Set(called)) {
    assert.match(src, new RegExp(`function ${name}\\(`), `${name} is called but not defined`);
  }
});

test('trust routes', { timeout: 30000 }, async () => {
  await withServer(async (base) => {
    let res = await fetch(`${base}/trust-tournament`);
    assert.equal(res.status, 200);
    assert.match(await res.text(), /<title>The Trust Tournament/);

    res = await fetch(`${base}/data/trust-tournament-2026-09-19.json`);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).players.length, trust.players.length);

    res = await fetch(`${base}/data/not-listed.json`);
    assert.notEqual(res.status, 200);

    res = await fetch(`${base}/keynotes`);
    const js = await (await fetch(`${base}/keynote/keynote.js`)).text();
    assert.match(js, /href="\/trust-tournament"/);
  });
});
