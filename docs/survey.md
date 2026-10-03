# Post-residency survey (`/survey`, `/survey/results`)

The VotC 2026 post-residency survey: an AI interviewer (ElevenLabs, voice or
text) talks with each attendee and fills a catalogue of datapoints; a results
page shows an AI synthesis, a projects board and a forward look. One shared
password gates both pages. Owner: Deca.

The plan (goal, datapoint catalogue, acceptance criteria) lives in Deca's vault:
`Companies/Commons Hub/VotC Website/WhatWeBuilt/VotC Website v1 Specifications.md`.

## What lives in this repo

Only static files and two routes. The site's production host holds no survey
data, secrets or database tables.

| File | Role |
| --- | --- |
| `survey/index.html`, `survey/survey.js` | Gate, privacy notice, mode choice, the conversation (ElevenLabs browser SDK from jsdelivr, pinned), timing signals, voice-to-text hand-off |
| `survey/results.html`, `survey/results.js` | The results page |
| `survey/ui.js` | Shared gate and the privacy notice (its one home) |
| `survey/api.js`, `survey/storage.js` | Backend base URL, saved sign-in, safe `localStorage` |
| `survey/queue.js` | Offline queue for `record_datapoint` calls (retries with an idempotency key) |
| `survey/timing.js` | Voice and text thresholds and the contextual updates sent at each |
| `survey/survey.css` | Styles, on top of `home.css` tokens |
| `tests/survey.test.mjs` | Unit tests for storage, queue and timing |

`server.js` serves `/survey` and `/survey/results`. `/survey` is the one route
that sends `Permissions-Policy: microphone=(self)` (voice mode); every other route
keeps `microphone=()`.

## What lives elsewhere

- **Backend:** a small Node API on Deca's Raspberry Pi (repo `deca12x/pi-data`,
  `services/votc-survey/`), reached over HTTPS at
  `https://pi1.tail0a8aa5.ts.net/votc-survey`. It checks the password, issues
  tokens, stores datapoints, receives the ElevenLabs post-call webhook, runs
  reconciliation and synthesis, and serves the results JSON. Its CORS allows only
  `valleyofthecommons.com`, `www.valleyofthecommons.com` and `localhost:3000`.
- **Interviewer:** one ElevenLabs agent, configured as files in the same backend
  folder (`agent/`).

## Local development

Run the site (`npm start`, port 3000) and the backend locally, then open
`http://localhost:3000/survey?api=http://localhost:<port>`. The `api` parameter
works only on `localhost`, so a crafted link cannot send the password elsewhere.
`?timescale=0.05` shrinks the timing thresholds for testing (it can only shorten).
