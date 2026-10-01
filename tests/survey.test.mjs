import assert from 'node:assert/strict';
import { test } from 'node:test';
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
