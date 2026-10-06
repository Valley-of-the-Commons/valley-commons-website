// The results page's locked state (API answers 403 { locked }) and the polling
// used while a submitted person's answers are being added. Pure, so it is unit-tested.

export const POLL_MS = 15 * 1000;
export const POLL_MAX_MS = 15 * 60 * 1000;

const NOT_SUBMITTED = { title: 'Results open once you have finished the survey.', action: { label: 'Go to the survey', href: '/survey' } };

/** { title, action: { label, href } } for a `locked` code. The API now sends only `not_submitted`; any code reads as that. */
export const lockedView = () => NOT_SUBMITTED;

/**
 * Calls `check` every `intervalMs` until it returns true or `maxMs` has passed.
 * Resolves 'done' or 'timeout'. `sleep` and `now` are injectable for tests.
 */
export async function pollUntil(check, { intervalMs = POLL_MS, maxMs = POLL_MAX_MS, sleep = (ms) => new Promise((r) => setTimeout(r, ms)), now = Date.now } = {}) {
  const deadline = now() + maxMs;
  while (now() + intervalMs <= deadline) {
    await sleep(intervalMs);
    if (await check()) return 'done';
  }
  return 'timeout';
}
