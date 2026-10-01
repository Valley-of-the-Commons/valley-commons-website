// Delivery queue for record_datapoint calls. Each call is saved before it is
// sent, so a Pi outage or a closed tab loses nothing; the idempotency key makes
// re-sending safe (also when two tabs send the same item). Retries back off
// from 2 s to 30 s and restart when the browser comes back online. Storage is
// re-read on every step so tabs do not overwrite each other's items.
export function createQueue({ storage, key = 'votc.survey.queue', send, onResult = () => {}, schedule = setTimeout }) {
  let running = null;
  let timer = null;
  let delay = 2000;

  const load = () => storage.getJSON(key, []);
  const remove = (id) => storage.setJSON(key, load().filter((i) => i.idempotency_key !== id));

  // A flush already in progress is shared, so awaiting flush() always waits for
  // the in-flight send.
  function flush() {
    running ??= drain().finally(() => { running = null; });
    return running;
  }

  async function drain() {
    clearTimeout(timer);
    timer = null;
    try {
      for (let item = load()[0]; item; item = load()[0]) {
        let result;
        try {
          result = await send(item);
        } catch {
          result = { ok: false, status: 0 };
        }
        // Not signed in: keep everything and wait for the next flush (after the gate).
        if (result.status === 401) return;
        // Retry on network errors, 5xx and rate limits; drop on any other 4xx
        // (a value the server rejected will never be accepted).
        const retry = !result.ok && (result.status === 0 || result.status >= 500 || result.status === 429);
        if (retry) {
          timer = schedule(flush, delay);
          delay = Math.min(delay * 2, 30000);
          return;
        }
        remove(item.idempotency_key);
        delay = 2000;
        onResult(result);
      }
    } catch { /* never reject: callers await flush() */ }
  }

  return {
    // If a drain was just finishing when the item arrived, flush once more
    // (unless a retry is already scheduled).
    async enqueue(item) {
      storage.setJSON(key, [...load(), item]);
      await flush();
      if (!timer && load().some((i) => i.idempotency_key === item.idempotency_key)) await flush();
    },
    flush,
    size: () => load().length,
  };
}
