// Timing signals come from the page, not the model (Spec: Timing). The clock
// fires each threshold once. `scale` shrinks every threshold for testing.
export const THRESHOLDS = {
  voice: [
    { id: 'wrap_up', minutes: 11 },
    { id: 'goodbye', minutes: 14 },
    { id: 'hard_stop', minutes: 15 },
  ],
  text: [{ id: 'wrap_up', minutes: 15 }],
};

export const TIMING_MESSAGES = {
  voice: {
    wrap_up: '[timing] 11 minutes have passed. Wrap up now: cover any missing core groups in one or two short questions, then do the closing.',
    goodbye: '[timing] 14 minutes. Say goodbye now: explain that the voice part has reached its time limit because of usage costs, and that the conversation continues in text right away. Then end the call.',
  },
  text: {
    wrap_up: '[timing] 15 minutes have passed in text. Begin a gentle wrap-up, with no pressure and no rush.',
  },
};

/** Reads ?timescale= (testing only). Values above 1 are ignored so it can only shorten. */
export function timeScale(search = globalThis.location?.search || '') {
  const v = Number(new URLSearchParams(search).get('timescale'));
  return v > 0 && v <= 1 ? Math.max(v, 0.005) : 1;
}

// `offsetMs` is time already spent in this mode by earlier sessions (text
// continues across sessions); thresholds it already passed fired back then.
export function createClock({ mode, scale = 1, onThreshold, now = () => Date.now(), every = setInterval, stopEvery = clearInterval, offsetMs = 0 }) {
  const pending = THRESHOLDS[mode].map((t) => ({ ...t, at: t.minutes * 60000 * scale })).filter((t) => t.at > offsetMs);
  const start = now() - offsetMs;
  const elapsed = () => now() - start;
  const check = () => {
    while (pending.length && elapsed() >= pending[0].at) onThreshold(pending.shift().id);
  };
  const handle = every(check, 1000);
  check();
  // elapsed() includes offsetMs: it is the running total for this mode.
  return { elapsed, stop: () => stopEvery(handle), check };
}
