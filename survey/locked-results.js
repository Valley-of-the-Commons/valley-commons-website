// The survey results, locked with the shared password. The repo is public and the
// production host holds no secrets, so the results file is stored encrypted
// (PBKDF2-SHA256 key, AES-256-GCM) and opened in the visitor's browser.
// Runs in browsers and in Node 20+ (globalThis.crypto.subtle); no dependencies.
const KDF = 'PBKDF2-SHA256';
const ITERATIONS = 600000;
const enc = new TextEncoder();
const subtle = () => globalThis.crypto.subtle;

const toBase64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const fromBase64 = (text) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));

/** The error unlockResults rejects with when the password or key does not open the file. */
const wrongPassword = () => Object.assign(new Error('Wrong password'), { name: 'WrongPassword' });

/** Derives the 256-bit AES key bytes for a password from the file's salt and iterations. */
async function deriveBits(password, { salt, iterations }) {
  const base = await subtle().importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return subtle().deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromBase64(salt), iterations }, base, 256);
}

/** The file's raw AES key as base64, so a returning visitor can skip the password form. */
export async function deriveKey(password, file) {
  return toBase64(await deriveBits(password, file));
}

const aesKey = (keyBase64, usage) => subtle().importKey('raw', fromBase64(keyBase64), 'AES-GCM', false, [usage]);

/** Encrypts `plaintext` (a string) with `password`; resolves to the locked file object. */
export async function lockResults(plaintext, password, { iterations = ITERATIONS } = {}) {
  const salt = toBase64(globalThis.crypto.getRandomValues(new Uint8Array(16)));
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const key = await aesKey(await deriveKey(password, { salt, iterations }), 'encrypt');
  const ciphertext = await subtle().encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plaintext));
  return { v: 1, kdf: KDF, iterations, salt, iv: toBase64(iv), ciphertext: toBase64(ciphertext) };
}

/** Opens a locked file with `{ password }` or a saved `{ key }`; resolves to the parsed JSON, or rejects with WrongPassword. */
export async function unlockResults(file, { password, key } = {}) {
  const keyBase64 = key ?? await deriveKey(password, file);
  try {
    const plain = await subtle().decrypt({ name: 'AES-GCM', iv: fromBase64(file.iv) }, await aesKey(keyBase64, 'decrypt'), fromBase64(file.ciphertext));
    return JSON.parse(new TextDecoder().decode(plain));
  } catch {
    throw wrongPassword();
  }
}
