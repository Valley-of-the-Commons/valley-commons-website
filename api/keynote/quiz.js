// Server-side helpers for the keynote live quiz. Talks to the SEPARATE, isolated
// Supabase project (SUPABASE_URL + SUPABASE_SERVICE_KEY) with the service key,
// which bypasses RLS: every scoring/state write goes through here, never the
// browser. Correct answers live in ./answers.js and are never shipped to clients.

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { CORRECT_BY_SLUG } = require('./answers');

// Timing (must match the client copy in keynote/session.mjs).
const PREROLL_MS = 5000; // "get ready" window before each question
const QUESTION_MS = 30000; // answer window per question (also the scoring window)
const REVEAL_MS = 3000; // quiz: how long the correct answer shows before standings

// Item data (counts + types) comes from the single content source, dynamic-
// imported once. Correct-answer INDICES never live there; they are in answers.js.
let _rooms = null;
async function rooms() {
  if (!_rooms) {
    const mod = await import('../../keynote/content.mjs');
    _rooms = mod.ROOMS;
  }
  return _rooms;
}
async function itemsFor(slug) {
  const r = await rooms();
  return (r[slug] && r[slug].items) || [];
}
async function itemCount(slug) {
  return (await itemsFor(slug)).length;
}
async function isQuizItem(slug, index) {
  const items = await itemsFor(slug);
  return !!(items[index] && items[index].type === 'quiz');
}

function correctIndexFor(slug, index) {
  const map = CORRECT_BY_SLUG[slug];
  return map && index in map ? map[index] : null;
}

// Correct answers earn 500 base plus up to 500 time bonus (full at 0ms elapsed,
// 0 at the limit). Wrong answers score 0. elapsedMs is server-measured.
function scoreQuiz(isCorrect, elapsedMs) {
  if (!isCorrect) return 0;
  const clamped = Math.min(Math.max(elapsedMs, 0), QUESTION_MS);
  return Math.round(500 + 500 * (1 - clamped / QUESTION_MS));
}

// One cached service client. Returns null when the Supabase env is absent, so a
// route can answer 503 not_configured and the companion still works offline.
let _svc;
function serviceClient() {
  if (_svc !== undefined) return _svc;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  _svc = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return _svc;
}

function timingSafeEqualStr(a, b) {
  const ah = crypto.createHash('sha256').update(String(a), 'utf8').digest();
  const bh = crypto.createHash('sha256').update(String(b), 'utf8').digest();
  return crypto.timingSafeEqual(ah, bh);
}

// Host actions are gated by a shared secret the server re-checks every time.
// Sent as the X-Keynote-Host header or a host_secret body field.
function isHost(req) {
  const secret = process.env.KEYNOTE_HOST_SECRET;
  if (!secret || secret.length < 8) return false;
  const given = req.headers['x-keynote-host'] || (req.body && req.body.host_secret) || '';
  if (!given) return false;
  return timingSafeEqualStr(given, secret);
}

module.exports = {
  PREROLL_MS, QUESTION_MS, REVEAL_MS,
  rooms, itemsFor, itemCount, isQuizItem,
  correctIndexFor, scoreQuiz,
  serviceClient, isHost,
};
