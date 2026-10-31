# Post-residency survey (closed): `/survey/results`

The VotC 2026 post-residency survey is closed. The results page stays up, behind
the same shared password, with no backend. Owner: Deca.

## Routes

- `/survey` and `/survey/` redirect (302) to `/survey/results`.
- `/survey/results` serves `survey/results.html` through the versioned
  `surveyPage` helper in `server.js` (`lib/survey-assets.js` adds `?v=<deploy>` to
  its assets and an import map for the modules).
- `/data/votc-survey-results.locked.json` serves the encrypted results (listed in
  `PUBLIC_DATA_FILES` in `server.js`).

## Locked results

The repo is public and the site's production host holds no secrets, so the results
are stored encrypted with the shared password and opened in the visitor's browser.

| File | Role |
| --- | --- |
| `survey/locked-results.js` | `lockResults`, `deriveKey`, `unlockResults`: PBKDF2-SHA256 (600,000 iterations) derives the key, AES-256-GCM encrypts. Runs in browsers and Node 20+ with no dependencies |
| `scripts/lock-survey-results.mjs` | Makes `data/votc-survey-results.locked.json` from a plain results file |
| `survey/results.html`, `survey/results.js` | The page: password gate, then the rendered results |
| `survey/ui.js` | The gate and the privacy notice (its one home) |
| `survey/storage.js` | Safe `localStorage` |
| `survey/survey.css` | Styles, on top of `home.css` tokens |
| `tests/survey.test.mjs` | Tests for storage, locking and unlocking, asset versioning and the https-only guard |

The locked file is `{ v, kdf, iterations, salt, iv, ciphertext }` (binary fields
base64). To make or refresh it:

```
node scripts/lock-survey-results.mjs <results.json>
```

The script asks for the password twice without echoing it, checks it against the
Pi API while that still runs (it can continue after a warning if the API is
unreachable), writes the file, and re-opens it to confirm the round trip. The
password is never printed or written.

The page fetches the file once and decrypts it with the typed password. A wrong
password shows "That password is not right." After a correct one, the derived key
(not the password) is saved in `localStorage` under `votc.survey.resultsKey`, so a
returning visitor skips the form. If the saved key no longer opens the file, it is
cleared and the form returns.

The page is https only (an inline script in `<head>` moves `http` to `https`),
because `crypto.subtle` is available only in a secure context. `localhost` stays on
`http` for development.

## History

The live survey ran 3 to 29 Oct 2026. Its backend ran on Deca's Pi (repo
`deca12x/pi-data`, `services/votc-survey`), and the browser code that took the
survey (interview pages, text relay, queue, timing) is in this repo's git history
before the change that closed it.
