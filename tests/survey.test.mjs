import assert from 'node:assert/strict';
import { test } from 'node:test';
import { reportClientError } from '../survey/api.js';
import { createQueue } from '../survey/queue.js';
import { createStorage } from '../survey/storage.js';
import { createClock, THRESHOLDS, TIMING_MESSAGES, timeScale } from '../survey/timing.js';
import { attributionPanelHtml, attributionUpdate, attributionValue, NAME_MAX } from '../survey/attribution.js';
import { etaLine, INCLUDED_LINE, youLine } from '../survey/eta.js';

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

test('timing thresholds: voice wraps up at 11 min, says goodbye at 14, stops at 15; text nudges at 15', () => {
  assert.deepEqual(THRESHOLDS.voice, [{ id: 'wrap_up', minutes: 11 }, { id: 'goodbye', minutes: 14 }, { id: 'hard_stop', minutes: 15 }]);
  assert.deepEqual(THRESHOLDS.text, [{ id: 'wrap_up', minutes: 15 }]);
  assert.match(TIMING_MESSAGES.voice.wrap_up, /^\[timing\] 11 minutes.*core groups/);
  assert.match(TIMING_MESSAGES.voice.goodbye, /^\[timing\] 14 minutes.*continues in text/);
  assert.match(TIMING_MESSAGES.text.wrap_up, /^\[timing\] 15 minutes/);
});

test('clock: fires each voice threshold once, in order, scaled', () => {
  let t = 0;
  const fired = [];
  const c = createClock({ mode: 'voice', scale: 0.01, onThreshold: (id) => fired.push(id), now: () => t, every: () => 0, stopEvery: () => {} });
  t = 6599; c.check();
  assert.deepEqual(fired, []);
  t = 6600; c.check();
  assert.deepEqual(fired, ['wrap_up']);
  t = 9000; c.check(); c.check();
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
    await reportClientError('connect', { name: 'Error', message: 'slow' }, 'sess-1', 1234.4);
    assert.equal(sent[2].body.elapsed_ms, 1234);
    assert.ok(!('elapsed_ms' in sent[1].body));
    globalThis.fetch = async () => { throw new Error('offline'); };
    assert.equal(await reportClientError('connect', null), undefined);
  } finally {
    globalThis.fetch = realFetch;
  }
});

import { lockedView, pollUntil, POLL_MAX_MS, POLL_MS } from '../survey/locked.js';
import { OPEN_ATTEMPTS, POLL_FAILURES_MAX, RelayConversation } from '../survey/relay.js';

test('eta line: minutes rounded up (min 1), "in a moment" under 30 s, 3 minutes while unknown', () => {
  const about = (n) => `Your own answers will be added to the results in about ${n}.`;
  assert.equal(etaLine(0), 'Your own answers will be added to the results in a moment.');
  assert.equal(etaLine(29), 'Your own answers will be added to the results in a moment.');
  assert.equal(etaLine(30), about('1 minute'));
  assert.equal(etaLine(60), about('1 minute'));
  assert.equal(etaLine(61), about('2 minutes'));
  assert.equal(etaLine(165), about('3 minutes'));
  assert.equal(etaLine(null), about('3 minutes'));
  assert.equal(etaLine(undefined), about('3 minutes'));
  assert.equal(INCLUDED_LINE, 'Your answers are now in the results.');
  assert.equal(youLine({ included: true, eta_seconds: null }), INCLUDED_LINE);
  assert.equal(youLine({ included: false, eta_seconds: 100 }), about('2 minutes'));
  assert.equal(youLine(null), about('3 minutes'));
});

test('attribution box: a typed name is named, empty or blank is anonymous, and the agent is told', () => {
  assert.deepEqual(JSON.parse(attributionValue('  Ana Rossi ')), { choice: 'named', display_name: 'Ana Rossi' });
  assert.deepEqual(JSON.parse(attributionValue('')), { choice: 'anonymous' });
  assert.deepEqual(JSON.parse(attributionValue('   ')), { choice: 'anonymous' });
  assert.deepEqual(JSON.parse(attributionValue(undefined)), { choice: 'anonymous' });
  assert.equal(JSON.parse(attributionValue('x'.repeat(200))).display_name.length, NAME_MAX);
  assert.equal(attributionUpdate(attributionValue('Ana')), '[attribution] recorded: named as Ana');
  assert.equal(attributionUpdate(attributionValue('')), '[attribution] recorded: anonymous');
  const html = attributionPanelHtml();
  assert.match(html, /placeholder="Leave empty to stay anonymous"/);
  assert.match(html, /aria-label="Name to show"/);
  assert.match(html, />Show my name</);
  assert.match(html, />Stay anonymous</);
});

test('locked results: one view, whatever the code; polling is every 15 s for up to 15 min', () => {
  const view = lockedView('not_submitted');
  assert.equal(view.title, 'Results open once you have finished the survey.');
  assert.deepEqual(view.action, { label: 'Go to the survey', href: '/survey' });
  assert.deepEqual(lockedView(undefined), view);
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

test('survey pages: every survey asset carries the deploy version', async () => {
  const { createRequire } = await import('node:module');
  const { versionSurveyHtml } = createRequire(import.meta.url)('../lib/survey-assets.js');
  const { readFileSync } = await import('node:fs');
  const html = readFileSync(new URL('../survey/index.html', import.meta.url), 'utf8');
  const out = versionSurveyHtml(html, ['survey.js', 'api.js'], 'abc');
  assert.match(out, /href="\/survey\/survey\.css\?v=abc"/);
  assert.match(out, /href="\/home\.css\?v=abc"/);
  assert.match(out, /<script type="importmap">\{"imports":\{"\/survey\/survey\.js":"\/survey\/survey\.js\?v=abc","\/survey\/api\.js":"\/survey\/api\.js\?v=abc"\}\}<\/script>/);
  assert.match(out, /<script type="module" src="\/survey\/survey\.js\?v=abc"><\/script>/);
  assert.ok(out.indexOf('importmap') < out.indexOf('type="module"'), 'the import map must come before the module script');
});

// ---- relay: text conversations over HTTPS (Pi holds the ElevenLabs socket)

// A fake `request` that answers by route from a script of queued replies.
const fakeRelay = ({ open = [], events = [], send = [] } = {}) => {
  const calls = [];
  const queues = { open: [...open], events: [...events], send: [...send] };
  const reply = (name) => {
    const next = queues[name].shift();
    if (next instanceof Error) throw next;
    return next ?? { ok: true, status: 200, data: name === 'events' ? { events: [], closed: true } : { ok: true } };
  };
  const request = async (path, opts = {}) => {
    calls.push({ path, method: opts.method ?? 'GET', body: opts.body });
    if (path.endsWith('/relay/open')) return reply('open');
    if (path.includes('/relay/events')) return reply('events');
    if (path.endsWith('/relay/send')) return reply('send');
    return { ok: true, status: 200, data: { ok: true } };
  };
  return { request, calls };
};
const ok = (data) => ({ ok: true, status: 200, data });
const busy = { ok: false, status: 503, data: { error: 'busy', retryable: true } };
const relayDeps = (fake, extra = {}) => ({ request: fake.request, sleep: async (ms) => { (extra.sleeps ??= []).push(ms); }, reportError: (...a) => (extra.reports ??= []).push(a), ...extra });

test('relay open: success reports the conversation id and connected status', async () => {
  const fake = fakeRelay({ open: [ok({ conversation_id: 'conv-1' })], events: [ok({ events: [{ seq: 1, type: 'end', reason: 'user', message: '' }], closed: true })] });
  const seen = [];
  const convo = await RelayConversation.startSession({
    sessionId: 's1',
    onConnect: (d) => seen.push(['connect', d]),
    onStatusChange: (d) => seen.push(['status', d]),
    onDisconnect: (d) => seen.push(['end', d]),
  }, relayDeps(fake));
  await convo.finished;
  assert.equal(convo.getId(), 'conv-1');
  assert.deepEqual(seen, [['connect', { conversationId: 'conv-1' }], ['status', { status: 'connected' }], ['end', { reason: 'user', message: '' }]]);
  assert.equal(fake.calls[0].path, '/sessions/s1/relay/open');
  assert.equal(fake.calls[0].method, 'POST');
});

test('relay open: 503 busy retries every 5 s, tells the page it is waiting, then connects', async () => {
  const fake = fakeRelay({ open: [busy, busy, ok({ conversation_id: 'c' })] });
  const extra = {};
  const waiting = [];
  const convo = await RelayConversation.startSession({ sessionId: 's1', onWaiting: (n) => waiting.push(n) }, relayDeps(fake, extra));
  await convo.finished;
  assert.deepEqual(waiting, [1, 2]);
  assert.deepEqual(extra.sleeps, [5000, 5000]);
  assert.equal(fake.calls.filter((c) => c.path.endsWith('/relay/open')).length, 3);
});

test('relay open: still busy after the attempts throws RelayBusy; other failures throw RelayOpenFailed; offline throws', async () => {
  const always = fakeRelay({ open: Array(OPEN_ATTEMPTS + 5).fill(busy) });
  const waiting = [];
  await assert.rejects(RelayConversation.startSession({ sessionId: 's', onWaiting: (n) => waiting.push(n) }, relayDeps(always)), { name: 'RelayBusy' });
  assert.equal(always.calls.length, OPEN_ATTEMPTS);
  assert.equal(waiting.length, OPEN_ATTEMPTS - 1);

  const gone = fakeRelay({ open: [{ ok: false, status: 409, data: { error: 'relay not registered' } }] });
  await assert.rejects(RelayConversation.startSession({ sessionId: 's' }, relayDeps(gone)), { name: 'RelayOpenFailed' });
  const notRetryable = fakeRelay({ open: [{ ok: false, status: 503, data: { error: 'down' } }] });
  await assert.rejects(RelayConversation.startSession({ sessionId: 's' }, relayDeps(notRetryable)), { name: 'RelayOpenFailed' });
  const offline = fakeRelay({ open: [new TypeError('Failed to fetch')] });
  await assert.rejects(RelayConversation.startSession({ sessionId: 's' }, relayDeps(offline)), { name: 'TypeError' });
});

test('relay events: agent messages arrive in the SDK shape and polling continues after the last seq', async () => {
  const fake = fakeRelay({
    open: [ok({ conversation_id: 'c' })],
    events: [
      ok({ events: [{ seq: 1, type: 'message', role: 'agent', text: 'Hello' }, { seq: 2, type: 'message', role: 'agent', text: 'How was it?' }], closed: false }),
      ok({ events: [{ seq: 3, type: 'end', reason: 'agent', message: 'done' }], closed: true }),
    ],
  });
  const messages = [];
  const ends = [];
  const convo = await RelayConversation.startSession({ sessionId: 's', onMessage: (m) => messages.push(m), onDisconnect: (d) => ends.push(d) }, relayDeps(fake));
  await convo.finished;
  assert.deepEqual(messages, [{ source: 'ai', role: 'agent', message: 'Hello' }, { source: 'ai', role: 'agent', message: 'How was it?' }]);
  assert.deepEqual(ends, [{ reason: 'agent', message: 'done' }]);
  const polls = fake.calls.filter((c) => c.path.includes('/relay/events')).map((c) => c.path);
  assert.deepEqual(polls, ['/sessions/s/relay/events?after=0', '/sessions/s/relay/events?after=2']);
});

test('relay tool calls: known tools run and their result is posted; objects are stringified; unknown tools and throws are errors', async () => {
  const fake = fakeRelay({
    open: [ok({ conversation_id: 'c' })],
    events: [ok({ events: [
      { seq: 1, type: 'tool_call', tool_call_id: 't1', tool_name: 'record_datapoint', parameters: { key: 'k' } },
      { seq: 2, type: 'tool_call', tool_call_id: 't2', tool_name: 'echo', parameters: { a: 1 } },
      { seq: 3, type: 'tool_call', tool_call_id: 't3', tool_name: 'nope', parameters: {} },
      { seq: 4, type: 'tool_call', tool_call_id: 't4', tool_name: 'boom', parameters: {} },
      { seq: 5, type: 'end', reason: 'user', message: '' },
    ], closed: true })],
  });
  const recorded = [];
  const clientTools = {
    record_datapoint: (p) => { recorded.push(p); },
    echo: (p) => ({ got: p }),
    boom: () => { throw new Error('bad'); },
  };
  const convo = await RelayConversation.startSession({ sessionId: 's', clientTools }, relayDeps(fake));
  await convo.finished;
  assert.deepEqual(recorded, [{ key: 'k' }]);
  const sent = fake.calls.filter((c) => c.path.endsWith('/relay/send')).map((c) => c.body);
  assert.deepEqual(sent, [
    { kind: 'tool_result', tool_call_id: 't1', result: '', is_error: false },
    { kind: 'tool_result', tool_call_id: 't2', result: '{"got":{"a":1}}', is_error: false },
    { kind: 'tool_result', tool_call_id: 't3', result: 'Unknown tool: nope', is_error: true },
    { kind: 'tool_result', tool_call_id: 't4', result: 'bad', is_error: true },
  ]);
});

test('relay end: onDisconnect fires once with the reason, and polling stops', async () => {
  const fake = fakeRelay({
    open: [ok({ conversation_id: 'c' })],
    events: [ok({ events: [{ seq: 1, type: 'end', reason: 'error', message: 'socket died' }], closed: true }), ok({ events: [{ seq: 2, type: 'end', reason: 'user', message: '' }], closed: true })],
  });
  const ends = [];
  const convo = await RelayConversation.startSession({ sessionId: 's', onDisconnect: (d) => ends.push(d) }, relayDeps(fake));
  await convo.finished;
  assert.deepEqual(ends, [{ reason: 'error', message: 'socket died' }]);
  assert.equal(fake.calls.filter((c) => c.path.includes('/relay/events')).length, 1);
});

test('relay poll failures: retry after 2 s, recover on success, give up after 10 in a row', async () => {
  const offline = new TypeError('Failed to fetch');
  const recovering = fakeRelay({
    open: [ok({ conversation_id: 'c' })],
    events: [offline, { ok: false, status: 502, data: null }, ok({ events: [{ seq: 1, type: 'message', role: 'agent', text: 'Hi' }], closed: false }), ok({ events: [{ seq: 2, type: 'end', reason: 'agent', message: '' }], closed: true })],
  });
  const extra = {};
  const messages = [];
  const ends = [];
  const convo = await RelayConversation.startSession({ sessionId: 's', onMessage: (m) => messages.push(m.message), onDisconnect: (d) => ends.push(d) }, relayDeps(recovering, extra));
  await convo.finished;
  assert.deepEqual(extra.sleeps, [2000, 2000]);
  assert.deepEqual(messages, ['Hi']);
  assert.deepEqual(ends, [{ reason: 'agent', message: '' }]);

  const lost = fakeRelay({ open: [ok({ conversation_id: 'c' })], events: Array(POLL_FAILURES_MAX + 5).fill(offline) });
  const lostEnds = [];
  const lostConvo = await RelayConversation.startSession({ sessionId: 's', onDisconnect: (d) => lostEnds.push(d) }, relayDeps(lost));
  await lostConvo.finished;
  assert.deepEqual(lostEnds, [{ reason: 'error', message: 'relay lost' }]);
  assert.equal(lost.calls.filter((c) => c.path.includes('/relay/events')).length, POLL_FAILURES_MAX);
});

test('relay methods: user messages, contextual updates and close hit the right routes; a send failure is reported once', async () => {
  const fake = fakeRelay({
    open: [ok({ conversation_id: 'c' })],
    send: [ok({ ok: true }), { ok: false, status: 409, data: { error: 'relay not open' } }, new TypeError('Failed to fetch')],
  });
  const extra = {};
  const convo = await RelayConversation.startSession({ sessionId: 's' }, relayDeps(fake, extra));
  await convo.finished;
  await convo.sendUserMessage('hi');
  await convo.sendContextualUpdate('[timing] 15 minutes');
  await convo.sendUserMessage('again');
  await convo.endSession();
  const sent = fake.calls.filter((c) => c.path.endsWith('/relay/send')).map((c) => c.body);
  assert.deepEqual(sent, [{ kind: 'user_message', text: 'hi' }, { kind: 'contextual_update', text: '[timing] 15 minutes' }, { kind: 'user_message', text: 'again' }]);
  assert.equal(extra.reports.length, 1, 'reported at most once');
  assert.equal(extra.reports[0][0], 'disconnect');
  assert.equal(extra.reports[0][2], 's');
  const last = fake.calls.at(-1);
  assert.deepEqual([last.path, last.method], ['/sessions/s/relay/close', 'POST']);
});

test('relay abort: cancelling during the busy wait stops the retries with RelayAborted', async () => {
  const fake = fakeRelay({ open: Array(10).fill(busy) });
  const controller = new AbortController();
  const deps = { ...relayDeps(fake), sleep: async () => { controller.abort(); } };
  await assert.rejects(RelayConversation.startSession({ sessionId: 's', signal: controller.signal }, deps), { name: 'RelayAborted' });
  assert.equal(fake.calls.length, 1, 'no further open attempt after the abort');

  const early = new AbortController();
  early.abort();
  const none = fakeRelay();
  await assert.rejects(RelayConversation.startSession({ sessionId: 's', signal: early.signal }, relayDeps(none)), { name: 'RelayAborted' });
  assert.equal(none.calls.length, 0);
});

test('relay abort: an open that succeeds just as the person pressed Stop is closed again', async () => {
  const controller = new AbortController();
  const fake = fakeRelay({ open: [ok({ conversation_id: 'c' })] });
  const request = async (path, opts) => {
    const res = await fake.request(path, opts);
    if (path.endsWith('/relay/open')) controller.abort();
    return res;
  };
  await assert.rejects(RelayConversation.startSession({ sessionId: 's', signal: controller.signal }, { ...relayDeps(fake), request }), { name: 'RelayAborted' });
  assert.equal(fake.calls.at(-1).path, '/sessions/s/relay/close');
});

test('relay callbacks: a throwing onMessage or onDisconnect never stops the loop and is reported once', async () => {
  const fake = fakeRelay({
    open: [ok({ conversation_id: 'c' })],
    events: [
      ok({ events: [{ seq: 1, type: 'message', role: 'agent', text: 'one' }, { seq: 2, type: 'message', role: 'agent', text: 'two' }], closed: false }),
      ok({ events: [{ seq: 3, type: 'tool_call', tool_call_id: 't', tool_name: 'boom', parameters: {} }, { seq: 4, type: 'end', reason: 'agent', message: '' }], closed: true }),
    ],
  });
  const extra = {};
  const seen = [];
  const convo = await RelayConversation.startSession({
    sessionId: 's',
    clientTools: { boom: () => { throw new Error('tool broke'); } },
    onMessage: (m) => { seen.push(m.message); throw new Error('render broke'); },
    onDisconnect: () => { seen.push('end'); throw new Error('disconnect broke'); },
  }, relayDeps(fake, extra));
  await convo.finished;
  assert.deepEqual(seen, ['one', 'two', 'end']);
  assert.equal(extra.reports.length, 1, 'reported at most once');
  assert.equal(extra.reports[0][0], 'disconnect');
  const sent = fake.calls.filter((c) => c.path.endsWith('/relay/send')).map((c) => c.body);
  assert.deepEqual(sent, [{ kind: 'tool_result', tool_call_id: 't', result: 'tool broke', is_error: true }]);
});
