# Post-residency survey (`/survey`, `/survey/results`)

The VotC 2026 post-residency survey: an AI interviewer (ElevenLabs, voice or
text) talks with each attendee and fills a catalogue of datapoints; a results
page shows an AI synthesis, a projects board and a forward look. One shared
password gates both pages. Owner: Deca.

The plan (goal, datapoint catalogue, acceptance criteria) lives in Deca's vault:
`Companies/Commons Hub/VotC Website/WhatWeBuilt/VotC Website v1 Specifications.md`.

## What lives in this repo

Only static files and three routes. The site's production host holds no survey
data, secrets or database tables.

| File | Role |
| --- | --- |
| `survey/index.html`, `survey/survey.js` | Gate, privacy notice, mode choice, the conversation (ElevenLabs browser SDK from jsdelivr, pinned), timing signals, voice-to-text hand-off |
| `survey/results.html`, `survey/results.js` | The results page |
| `survey/recap.html`, `survey/recap.js`, `survey/recapView.js` | The "Recap & news" page (`/survey/recap`) and the renderer shared with the thank-you screen; content comes from the Pi API (`GET /recap`) |
| `survey/locked.js` | The results page's locked states (`not_submitted`, `not_included`) and the 15 s / 15 min poll |
| `survey/ui.js` | Shared gate and the privacy notice (its one home) |
| `survey/api.js`, `survey/storage.js` | Backend base URL, saved sign-in, safe `localStorage`, best-effort client error reports (`POST /client-error` on the Pi API) |
| `survey/queue.js` | Offline queue for `record_datapoint` calls (retries with an idempotency key) |
| `survey/timing.js` | Voice and text thresholds and the contextual updates sent at each |
| `survey/survey.css` | Styles, on top of `home.css` tokens |
| `tests/survey.test.mjs` | Unit tests for storage, queue, timing, the pipeline feed, recap rendering and the locked states |

`server.js` serves `/survey`, `/survey/results` and `/survey/recap`. `/survey` is the one route
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

## Who can read what

The Pi API enforces this, not the page. `GET /results` answers 403 `{ locked: 'not_submitted' }` until the person has finished the survey (attribution consent recorded), and 403 `{ locked: 'not_included' }` until the latest synthesis was built from data that contains them. `/me` and `/sessions/:id/status` carry `results_unlocked` for the same rule. `GET /recap` (the "Recap & news" package, `content/recap.json` in the Pi repo) needs only the sign-in.

## Local development

Run the site (`npm start`, port 3000) and the backend locally, then open
`http://localhost:3000/survey?api=http://localhost:<port>`. The `api` parameter
works only on `localhost`, so a crafted link cannot send the password elsewhere.
`?timescale=0.05` shrinks the timing thresholds for testing (it can only shorten).

## Known issue: Tailscale on + a Chromium browser = "server cannot be reached"

On a device connected to Deca's tailnet, `pi1.tail0a8aa5.ts.net` resolves to a
private `100.x` address instead of the public Funnel address. Chromium browsers
(Chrome, Brave, Edge) treat that as the local network and block calls to it from a
public page (Local Network Access). The console shows: "Permission was denied for
this request to access the `local` address space". The gate then says "The survey
server cannot be reached right now".

- **Attendees are not affected:** they are not on the tailnet, so they get the
  public address.
- **To test production from a tailnet device:** switch Tailscale off (or allow
  "Local network access" for the site in the browser's site settings).
- `localhost` pages are not affected (they count as local themselves), so local
  development works with Tailscale on.
- SSH to pi1 needs Tailscale on. Turn it back on after testing.
