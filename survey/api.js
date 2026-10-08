// The Pi API: base URL, the saved sign-in, and authenticated requests.
import { createStorage } from './storage.js';

// Local development may point at a local backend with ?api=...; only on
// localhost, so a crafted link cannot send the password elsewhere.
const LOCAL_API = ['localhost', '127.0.0.1'].includes(globalThis.location?.hostname)
  && new URLSearchParams(globalThis.location.search).get('api');
export const API_BASE = LOCAL_API || 'https://pi1.tail0a8aa5.ts.net/votc-survey';
export const storage = createStorage();
const TOKEN_KEY = 'votc.survey.token';

export const getToken = () => storage.get(TOKEN_KEY);
export const setToken = (token) => storage.set(TOKEN_KEY, token);
export const clearToken = () => storage.remove(TOKEN_KEY);

/** Returns { ok, status, data }. Never throws for HTTP errors; throws only when offline. */
export async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = {};
  if (body !== undefined) headers['content-type'] = 'application/json';
  if (auth && getToken()) headers.authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${API_BASE}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  let data = null;
  try { data = await res.json(); } catch { /* empty body */ }
  if (res.status === 401 && auth) clearToken();
  return { ok: res.ok, status: res.status, data };
}

/**
 * Tells the server why this browser could not load the SDK or connect, which it
 * cannot see otherwise. Best effort: never throws, never blocks the screen.
 * sessionId is omitted when no session exists yet (an SDK load failure).
 * elapsedMs (optional) is the time from starting to connect to the failure.
 */
export function reportClientError(stage, err, sessionId, elapsedMs) {
  const body = { stage, name: String(err?.name ?? ''), message: String(err?.message ?? ''), user_agent: globalThis.navigator?.userAgent ?? '' };
  if (sessionId) body.session_id = sessionId;
  if (Number.isFinite(elapsedMs)) body.elapsed_ms = Math.round(elapsedMs);
  return request('/client-error', { method: 'POST', body }).catch(() => {});
}

export async function signIn(password) {
  const res = await request('/auth', { method: 'POST', body: { password }, auth: false });
  if (res.ok) setToken(res.data.token);
  return res;
}
