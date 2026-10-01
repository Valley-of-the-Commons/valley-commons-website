// localStorage that never throws: private windows and blocked storage fall back
// to memory for the current visit (resume then works only within the visit).
const memory = new Map();

function backend() {
  try {
    const s = globalThis.localStorage;
    const probe = '__votc_probe__';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

export function createStorage(store = backend()) {
  // Keys whose last write failed (for example a full quota) are served from
  // memory from then on, so reads never return a stale stored value.
  const inMemory = new Set();
  return {
    get(key) {
      if (!store || inMemory.has(key)) return memory.get(key) ?? null;
      try { return store.getItem(key); } catch { return memory.get(key) ?? null; }
    },
    set(key, value) {
      if (store && !inMemory.has(key)) {
        try { store.setItem(key, value); return; } catch { inMemory.add(key); }
      }
      memory.set(key, value);
    },
    remove(key) {
      try { store?.removeItem(key); } catch { /* ignore */ }
      memory.delete(key);
      inMemory.delete(key);
    },
    getJSON(key, fallback) {
      try { return JSON.parse(this.get(key)) ?? fallback; } catch { return fallback; }
    },
    setJSON(key, value) { this.set(key, JSON.stringify(value)); },
    persistent: Boolean(store),
  };
}
