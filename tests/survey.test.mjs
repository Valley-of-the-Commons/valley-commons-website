import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { deriveKey, lockResults, unlockResults } from '../survey/locked-results.js';
import { createStorage } from '../survey/storage.js';

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

test('storage: a failed write (full quota) never leaves a stale value readable', () => {
  const store = fakeStore();
  const s = createStorage(store);
  s.setJSON('q', [1, 2]);
  store.setItem = () => { throw new Error('QuotaExceededError'); };
  s.setJSON('q', [2]);
  assert.deepEqual(s.getJSON('q', null), [2]);
});

test('survey pages: every survey asset carries the deploy version', async () => {
  const { createRequire } = await import('node:module');
  const { versionSurveyHtml } = createRequire(import.meta.url)('../lib/survey-assets.js');
  const html = readFileSync(new URL('../survey/results.html', import.meta.url), 'utf8');
  const out = versionSurveyHtml(html, ['results.js', 'ui.js'], 'abc');
  assert.match(out, /href="\/survey\/survey\.css\?v=abc"/);
  assert.match(out, /href="\/home\.css\?v=abc"/);
  assert.match(out, /<script type="importmap">\{"imports":\{"\/survey\/results\.js":"\/survey\/results\.js\?v=abc","\/survey\/ui\.js":"\/survey\/ui\.js\?v=abc"\}\}<\/script>/);
  assert.match(out, /<script type="module" src="\/survey\/results\.js\?v=abc"><\/script>/);
  assert.ok(out.indexOf('importmap') < out.indexOf('type="module"'), 'the import map must come before the module script');
});

test('https only: the results page redirects http to https in <head>, before any module runs', () => {
  const html = readFileSync(new URL('../survey/results.html', import.meta.url), 'utf8');
  const redirect = html.indexOf("location.replace('https:' + location.href.slice(5))");
  assert.ok(redirect > 0 && redirect < html.indexOf('</head>'), 'redirect in <head>');
  assert.ok(redirect < html.indexOf('type="module"'), 'redirect before the module script');
  assert.match(html, /!\['localhost', '127.0.0.1'\]\.includes\(location\.hostname\)/, 'local development stays on http');
});

// ---- locked results (low iteration count keeps the tests fast)

const FAST = { iterations: 1000 };
const RESULTS = { board: [], forward: {}, synthesis: {}, respondents: 12, generated_at: '2026-10-29T10:00:00Z', version: 1 };
const PLAIN = JSON.stringify(RESULTS);

test('locked results: a lock opens again with the same password', async () => {
  const file = await lockResults(PLAIN, 'correct horse', FAST);
  assert.deepEqual(await unlockResults(file, { password: 'correct horse' }), RESULTS);
});

test('locked results: the wrong password rejects with WrongPassword', async () => {
  const file = await lockResults(PLAIN, 'correct horse', FAST);
  await assert.rejects(unlockResults(file, { password: 'battery staple' }), { name: 'WrongPassword' });
});

test('locked results: a saved key opens the file, a wrong key rejects', async () => {
  const file = await lockResults(PLAIN, 'correct horse', FAST);
  const key = await deriveKey('correct horse', file);
  assert.deepEqual(await unlockResults(file, { key }), RESULTS);
  await assert.rejects(unlockResults(file, { key: await deriveKey('other', file) }), { name: 'WrongPassword' });
});

test('locked results: tampered ciphertext rejects', async () => {
  const file = await lockResults(PLAIN, 'correct horse', FAST);
  const bytes = Buffer.from(file.ciphertext, 'base64');
  bytes[0] ^= 1;
  await assert.rejects(unlockResults({ ...file, ciphertext: bytes.toString('base64') }, { password: 'correct horse' }), { name: 'WrongPassword' });
});

test('locked results: two locks of the same text differ (random salt and iv)', async () => {
  const a = await lockResults(PLAIN, 'correct horse', FAST);
  const b = await lockResults(PLAIN, 'correct horse', FAST);
  assert.notEqual(a.salt, b.salt);
  assert.notEqual(a.iv, b.iv);
  assert.notEqual(a.ciphertext, b.ciphertext);
});

test('locked results: the file has the documented fields', async () => {
  const file = await lockResults(PLAIN, 'correct horse', FAST);
  assert.deepEqual(Object.keys(file), ['v', 'kdf', 'iterations', 'salt', 'iv', 'ciphertext']);
  assert.equal(file.v, 1);
  assert.equal(file.kdf, 'PBKDF2-SHA256');
  assert.equal(file.iterations, 1000);
  assert.equal(Buffer.from(file.salt, 'base64').length, 16);
  assert.equal(Buffer.from(file.iv, 'base64').length, 12);
  assert.equal((await lockResults(PLAIN, 'x')).iterations, 600000);
});
