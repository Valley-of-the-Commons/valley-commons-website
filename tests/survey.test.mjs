import assert from 'node:assert/strict';
import { test } from 'node:test';
import { reportClientError } from '../survey/api.js';
import { createQueue } from '../survey/queue.js';
import { createStorage } from '../survey/storage.js';
import { createClock, timeScale } from '../survey/timing.js';

const fakeStore = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), m }; };

test('storage: works when localStorage throws (private window)', () => {
  const throwing = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }, removeItem() { throw new Error('denied'); } };
  const s = createStorage(throwing);
  s.set('a', '1');
  assert.equal(s.get('a'), '1');
  s.setJSON('b', { x: 1 });
  assert.deepEqual(s.getJSON('b', null), { x: 1 });
  const none = createStorage(null);
  assert.equal(none.persistent, false);
  none.set('c', '2');
  assert.equal(none.get('c'), '2');
});

test('queue: keeps calls while the Pi is down, then delivers each once in order', async () => {
  const store = fakeStore();
  const storage = createStorage(store);
  let up = false;
  const delivered = [];
  const timers = [];
  const send = async (item) => { if (!up) throw new Error('offline'); delivered.push(item.idempotency_key); return { ok: true, status: 200 }; };
  const q = createQueue({ storage, send, schedule: (fn) => timers.push(fn) });
  await q.enqueue({ idempotency_key: 'a' });
  await q.enqueue({ idempotency_key: 'b' });
  assert.equal(q.size(), 2);
  assert.equal(JSON.parse(store.m.get('votc.survey.queue')).length, 2, 'persisted');

  // A reload while down: the old page is gone; a new queue picks up the saved calls.
  timers.length = 0;
  const q2 = createQueue({ storage, send, schedule: (fn) => timers.push(fn) });
  assert.equal(q2.size(), 2);
  await q2.flush();
  up = true;
  await timers.pop()();
  assert.deepEqual(delivered, ['a', 'b']);
  assert.equal(q2.size(), 0);
});

test('queue: drops a call the server rejects (4xx) but retries 5xx and 429', async () => {
  const statuses = [500, 429, 422, 200];
  const results = [];
  const timers = [];
  const q = createQueue({ storage: createStorage(fakeStore()), send: async () => ({ ok: statuses[0] === 200, status: statuses.shift() }), onResult: (r) => results.push(r.status), schedule: (fn) => timers.push(fn) });
  await q.enqueue({ idempotency_key: 'x' });
  assert.equal(q.size(), 1);
  await timers.pop()();
  assert.equal(q.size(), 1);
  await timers.pop()();
  assert.equal(q.size(), 0);
  assert.deepEqual(results, [422]);
});

test('clock: fires each voice threshold once, in order, scaled', () => {
  let t = 0;
  const fired = [];
  const c = createClock({ mode: 'voice', scale: 0.01, onThreshold: (id) => fired.push(id), now: () => t, every: () => 0, stopEvery: () => {} });
  t = 5999; c.check();
  assert.deepEqual(fired, []);
  t = 6000; c.check();
  assert.deepEqual(fired, ['wrap_up']);
  t = 7800; c.check(); c.check();
  assert.deepEqual(fired, ['wrap_up', 'goodbye', 'hard_stop']);
});

test('clock: text counts from its own start plus any earlier text time', () => {
  let t = 1000;
  const fired = [];
  const c = createClock({ mode: 'text', scale: 0.01, offsetMs: 8000, onThreshold: (id) => fired.push(id), now: () => t, every: () => 0, stopEvery: () => {} });
  t = 1999; c.check();
  assert.deepEqual(fired, []);
  t = 2000; c.check();
  assert.deepEqual(fired, ['wrap_up']);
});

test('timescale: only shortens', () => {
  assert.equal(timeScale('?timescale=0.05'), 0.05);
  assert.equal(timeScale('?timescale=5'), 1);
  assert.equal(timeScale(''), 1);
  assert.equal(timeScale('?timescale=abc'), 1);
});

test('clock: a continuation does not re-fire a threshold an earlier session passed', () => {
  const fired = [];
  createClock({ mode: 'text', scale: 0.01, offsetMs: 9500, onThreshold: (id) => fired.push(id), now: () => 0, every: () => 0, stopEvery: () => {} });
  assert.deepEqual(fired, []);
});

test('queue: keeps items on 401 (not signed in) and shares state across tabs', async () => {
  const store = fakeStore();
  let status = 401;
  const sent = [];
  const send = async (i) => { sent.push(i.idempotency_key); return { ok: status === 200, status }; };
  const tabA = createQueue({ storage: createStorage(store), send, schedule: () => {} });
  const tabB = createQueue({ storage: createStorage(store), send, schedule: () => {} });
  await tabA.enqueue({ idempotency_key: 'a' });
  await tabB.enqueue({ idempotency_key: 'b' });
  assert.equal(tabA.size(), 2, 'tab B did not overwrite tab A');
  status = 200;
  await tabA.flush();
  assert.equal(tabB.size(), 0);
  assert.deepEqual(sent.slice(-2), ['a', 'b']);
});

test('storage: a failed write (full quota) never leaves a stale value readable', () => {
  const store = fakeStore();
  const s = createStorage(store);
  s.setJSON('q', [1, 2]);
  store.setItem = () => { throw new Error('QuotaExceededError'); };
  s.setJSON('q', [2]);
  assert.deepEqual(s.getJSON('q', null), [2]);
});

test('queue: awaiting flush waits for a send already in flight', async () => {
  let release;
  const gate = new Promise((r) => { release = r; });
  const done = [];
  const q = createQueue({ storage: createStorage(fakeStore()), send: async (i) => { await gate; done.push(i.idempotency_key); return { ok: true, status: 200 }; }, schedule: () => {} });
  q.enqueue({ idempotency_key: 'consent' });
  const waiting = q.flush();
  release();
  await waiting;
  assert.deepEqual(done, ['consent']);
});

test('queue: with storage full, an item is sent once, not in a loop', async () => {
  const store = fakeStore();
  const storage = createStorage(store);
  store.setItem = () => { throw new Error('QuotaExceededError'); };
  let sends = 0;
  const q = createQueue({ storage, send: async () => { sends++; return { ok: true, status: 200 }; }, schedule: () => {} });
  await q.enqueue({ idempotency_key: 'x' });
  assert.equal(sends, 1);
  assert.equal(q.size(), 0);
});

import { pipelineLines } from '../survey/pipeline.js';

test('pipeline feed: each real step adds a line, ready only when the results include this conversation', () => {
  const t0 = Date.parse('2026-10-03T12:00:00Z');
  const iso = (s) => new Date(t0 + s * 1000).toISOString();
  const idle = { pending: false, next_run_at: null, running: false, latest: { version: 3, generated_at: iso(-600), paused: false } };
  let r = pipelineLines({ answers_saved: 9, transcript: null, synthesis: idle }, t0 + 5000, t0);
  assert.equal(r.ready, false);
  assert.match(r.lines.at(-1).text, /Waiting for ElevenLabs/);

  const received = { received_at: iso(20), reconciled_at: null, reconcile_note: null, reconciling: true };
  r = pipelineLines({ answers_saved: 9, transcript: received, synthesis: idle }, t0 + 25000, t0);
  assert.match(r.lines.at(-1).text, /re-reading/);

  const reread = { ...received, reconciled_at: iso(40), reconcile_filled: 2, reconcile_note: 'done', reconciling: false };
  r = pipelineLines({ answers_saved: 11, transcript: reread, synthesis: { ...idle, pending: true, next_run_at: iso(100) } }, t0 + 40000, t0);
  assert.match(r.lines.map((l) => l.text).join('|'), /2 more answers found.*queued: starts in 1 min 0 s/);
  assert.equal(r.ready, false);

  r = pipelineLines({ answers_saved: 11, transcript: reread, synthesis: { ...idle, latest: { version: 4, generated_at: iso(130), paused: false } } }, t0 + 131000, t0);
  assert.equal(r.ready, true);
  assert.match(r.lines.at(-1).text, /version 4/);
});

test('pipeline feed: a missing transcript warns after 3 minutes and still finishes on the rebuild', () => {
  const t0 = Date.parse('2026-10-03T12:00:00Z');
  const latest = { version: 5, generated_at: new Date(t0 + 60000).toISOString(), paused: true };
  const r = pipelineLines({ answers_saved: 4, transcript: null, synthesis: { pending: false, running: false, next_run_at: null, latest } }, t0 + 200000, t0);
  assert.equal(r.lines[1].state, 'warn');
  assert.equal(r.ready, true);
  assert.match(r.lines.at(-1).text, /summaries paused/);
});

test('client error report: posts stage, error and user agent; omits session id when none; never throws', async () => {
  const sent = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => { sent.push({ url, body: JSON.parse(init.body) }); return { ok: true, status: 200, json: async () => ({ ok: true }) }; };
  try {
    await reportClientError('sdk_load', new TypeError('Failed to fetch'));
    await reportClientError('connect', { name: 'Error', message: 'boom' }, 'sess-1');
    assert.match(sent[0].url, /\/client-error$/);
    assert.deepEqual(Object.keys(sent[0].body).sort(), ['message', 'name', 'stage', 'user_agent']);
    assert.equal(sent[0].body.name, 'TypeError');
    assert.equal(sent[1].body.session_id, 'sess-1');
    globalThis.fetch = async () => { throw new Error('offline'); };
    assert.equal(await reportClientError('connect', null), undefined);
  } finally {
    globalThis.fetch = realFetch;
  }
});

import { resultsOpen } from '../survey/pipeline.js';
import { lockedView, pollUntil, POLL_MAX_MS, POLL_MS } from '../survey/locked.js';
import { hasRecap, recapHtml, recapUpdated } from '../survey/recapView.js';

test('results button: needs the pipeline done and the server flag', () => {
  assert.equal(resultsOpen({ ready: true, lines: [] }, true), true);
  assert.equal(resultsOpen({ ready: true, lines: [] }, false), false);
  assert.equal(resultsOpen({ ready: true, lines: [] }, undefined), false);
  assert.equal(resultsOpen({ ready: false, lines: [] }, true), false);
});

test('locked results: one view per reason; only "being added" polls, every 15 s for up to 15 min', () => {
  const submitted = lockedView('not_submitted');
  assert.equal(submitted.title, 'Results open once you have finished the survey.');
  assert.deepEqual(submitted.action, { label: 'Go to the survey', href: '/survey' });
  assert.equal(submitted.poll, false);
  const included = lockedView('not_included');
  assert.equal(included.title, 'Your answers are being added to the results. This takes a few minutes.');
  assert.equal(included.poll, true);
  assert.equal(lockedView(undefined).poll, false);
  assert.equal(POLL_MS, 15000);
  assert.equal(POLL_MAX_MS, 900000);
});

test('pollUntil: stops when the check passes, or times out after the maximum', async () => {
  let clock = 0;
  const sleep = async (ms) => { clock += ms; };
  const now = () => clock;
  let calls = 0;
  assert.equal(await pollUntil(async () => ++calls === 3, { intervalMs: 15000, maxMs: 900000, sleep, now }), 'done');
  assert.equal(calls, 3);
  assert.equal(clock, 45000);
  clock = 0; calls = 0;
  assert.equal(await pollUntil(async () => { calls++; return false; }, { intervalMs: 15000, maxMs: 900000, sleep, now }), 'timeout');
  assert.equal(calls, 60);
});

test('recap: renders weeks, skips null or empty sections, escapes text, allows only http(s) links', () => {
  const weeks = [{ label: 'Week 1', dates: '24 to 30 August', theme: 'Return <b>', paragraphs: ['One & two'] }];
  assert.equal(hasRecap({ message: null, weeks: [], fundraise: null }), false);
  assert.equal(recapHtml({ message: null, weeks: [], fundraise: null, updated: '2026-10-05' }), '');
  assert.equal(recapHtml(null), '');
  const html = recapHtml({ message: null, weeks, fundraise: null });
  assert.match(html, /Week 1/);
  assert.match(html, /Return &lt;b&gt;/);
  assert.match(html, /One &amp; two/);
  assert.ok(!html.includes('rc-note'));
  const full = recapHtml({ message: { title: 'News', paragraphs: ['Hello'] }, weeks: [], fundraise: { title: 'Help', paragraphs: ['Give'], cta_label: 'Give now', cta_url: 'https://example.org/x' } });
  assert.match(full, /rc-note--message/);
  assert.match(full, /href="https:\/\/example.org\/x"/);
  assert.ok(!full.includes('rc-weeks'));
  const unsafe = recapHtml({ message: null, weeks: [], fundraise: { title: 'Help', paragraphs: [], cta_label: 'Go', cta_url: 'javascript:alert(1)' } });
  assert.ok(!unsafe.includes('<a '));
  assert.equal(recapUpdated({ updated: '2026-10-05' }), '5 October 2026');
  assert.equal(recapUpdated({ updated: 'soon' }), '');
});
