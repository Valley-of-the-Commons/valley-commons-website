// Locks the plain survey results with the shared password.
// Usage: node scripts/lock-survey-results.mjs <results.json>
// Prompts for the password twice (not echoed), checks it against the Pi API while
// that still runs, writes data/votc-survey-results.locked.json, then re-opens it.
// The password is never printed, logged or written anywhere.
import { readFileSync, writeFileSync } from 'node:fs';
import readline from 'node:readline';
import { Writable } from 'node:stream';
import { lockResults, unlockResults } from '../survey/locked-results.js';

const AUTH_URL = 'https://pi1.tail0a8aa5.ts.net/votc-survey/auth';
const OUT = new URL('../data/votc-survey-results.locked.json', import.meta.url);

/** Asks a question on the terminal; `hidden` keeps what is typed off the screen. */
function ask(question, { hidden = false } = {}) {
  let muted = false;
  const output = new Writable({ write(chunk, _enc, done) { if (!muted) process.stdout.write(chunk); done(); } });
  const rl = readline.createInterface({ input: process.stdin, output, terminal: true });
  return new Promise((resolve) => {
    rl.question(question, (answer) => { rl.close(); if (hidden) process.stdout.write('\n'); resolve(answer); });
    muted = hidden;
  });
}

/** True/false from the live API; null when it cannot be reached. */
async function apiAccepts(password) {
  try {
    const res = await fetch(AUTH_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
    return res.status === 200 ? true : res.status === 401 ? false : null;
  } catch {
    return null;
  }
}

async function main() {
  const [source] = process.argv.slice(2);
  if (!source) throw new Error('Usage: node scripts/lock-survey-results.mjs <results.json>');
  const plaintext = readFileSync(source, 'utf8');
  const results = JSON.parse(plaintext);

  const password = await ask('Password: ', { hidden: true });
  if (!password || password !== await ask('Again: ', { hidden: true })) throw new Error('The two entries differ (or are empty). Nothing written.');

  const accepted = await apiAccepts(password);
  if (accepted === false) throw new Error('The Pi API does not accept this password. Nothing written.');
  if (accepted === null) {
    console.warn('Warning: the Pi API could not be reached, so the password was not checked.');
    if (!/^y/i.test(await ask('Continue anyway? (y/n) '))) throw new Error('Stopped. Nothing written.');
  }

  const file = await lockResults(plaintext, password);
  writeFileSync(OUT, JSON.stringify(file, null, 2) + '\n');
  const reopened = await unlockResults(JSON.parse(readFileSync(OUT, 'utf8')), { password });
  if (JSON.stringify(reopened) !== JSON.stringify(results)) throw new Error('Round trip check failed.');
  console.log(`Wrote ${OUT.pathname}\nRespondents: ${results.respondents}`);
}

main().catch((err) => { console.error(err.message); process.exit(1); });
