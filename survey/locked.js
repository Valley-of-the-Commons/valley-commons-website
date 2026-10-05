// The results page when the API answers 403 { locked }: what to show, and the
// polling used while the person's answers are being added. Pure, so it is unit-tested.

export const POLL_MS = 15 * 1000;
export const POLL_MAX_MS = 15 * 60 * 1000;

const NOT_SUBMITTED = { title: 'Results open once you have finished the survey.', action: { label: 'Go to the survey', href: '/survey' }, poll: false };
const NOT_INCLUDED = { title: 'Your answers are being added to the results. This takes a few minutes.', action: null, poll: true };

/** { title, action: { label, href } | null, poll } for a `locked` code. Unknown codes read as not submitted. */
export const lockedView = (code) => (code === 'not_included' ? NOT_INCLUDED : NOT_SUBMITTED);

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
