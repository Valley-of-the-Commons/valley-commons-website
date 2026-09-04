# PROGRESS — keynote companions + live quiz port

Branch: `feat/keynote-port` (off `main`). Deploy: Vercel on merge. Do not push to main.

Smoke: `node --check server.js` green; `node server.js` boots; `/keynote`, `/keynote-<slug>` serve 200 with correct per-page titles; bad slug -> 404. Local run on :3055.

## Feature list (machine state in features.json)

Foundation
- [done] `db/keynote-schema.sql` — quiz_state/players/answers/sessions, Realtime + RLS, seed rows. (Deca runs it on the Supabase project; state stays not_started until then.)
- [passing] Content port — `keynote/content.mjs` (client-safe, no answers) + `api/keynote/answers.js` (server-only keys). 12 rooms; Week 1 companion-only.

Companion / static layer — DONE, verified via live server + screenshots
- [passing] `keynote/keynote.css` — re-skinned to VotC light editorial tokens.
- [passing] `keynote/keynote.html` — single template for index + companion.
- [passing] `keynote/keynote.js` — renders `/keynote` (index) and `/keynote-<slug>` (companion) from content.mjs.
- [passing] `server.js` route — `/keynote` + `/keynote-<slug>` serve the template with per-page meta injected via dynamic import of content.mjs.
- [passing] `#schedule` wiring — index.html schedule section links to `/keynote`.

Live quiz layer — CODE-COMPLETE, blocked on Supabase env for E2E verification
- [done] `package.json` — `@supabase/supabase-js` added.
- [done] `api/keynote/quiz.js` — shared helpers: service client, timing, item access (dynamic-imports content.mjs), correctIndexFor, scoreQuiz, isHost (KEYNOTE_HOST_SECRET, timing-safe). Load-tested: scoreQuiz(true,0)=1000, (true,30000)=500, (false)=0; serviceClient()=null without env.
- [done] `api/keynote/config.js` — browser config (url + anon key; configured:false offline).
- [done] `api/keynote/join.js` — create player (self-contained per-IP limiter, no cross-branch dep).
- [done] `api/keynote/host.js` — open/next/reveal/finish/leaderboard/close/reset; upsert quiz_state; KEYNOTE_HOST_SECRET gate; archives to quiz_sessions on open/reset/finish.
- [done] `api/keynote/submit.js` — answer + scoring; correct key server-only; rejects pre-roll/late/duplicate.
- [done] `keynote/session.mjs` — realtime client (supabase-js via esm.sh): join, lobby, question (timer), reveal, leaderboard, poll aggregates, ended; host easter-egg (5 taps on the title) + host bar driving the timers. Loads only for talks with items; early-returns when config is offline.
- [done] `server.js` — routes `/api/keynote/{config,join,submit,host/:action}`.
- Verified locally: server boots; config -> configured:false; host -> 503 not_configured; companion still renders with the session dormant (display:none), 7 beats, NO console errors.
- BLOCKED: the realtime join/host/question/reveal/leaderboard loop can only be verified once Deca's Supabase project + env exist. Timing constants in session.mjs must stay in sync with api/keynote/quiz.js (pre-roll 5s, question 30s, reveal 3s).

## Owner (Deca) steps
- Create a separate Supabase project in the Deca org; run `db/keynote-schema.sql`.
- Set env: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY, KEYNOTE_HOST_SECRET.

## Next steps
1. Evaluator pass on the companion/static layer (independent subagent, live server).
2. Build the live-quiz layer; then an evaluator drives a full session (needs Supabase env, so parts verify only once Deca provisions).
3. Open the PR (feat/keynote-port) when the static layer + quiz code are in; note the Supabase steps for Deca.

## Notes / blockers
- The quiz cannot be verified end-to-end locally until Deca's Supabase env exists; the companion/static layer is fully verified without it.
- content.mjs is `.mjs` so the Express route can dynamic-import it for meta; the browser imports it as a module too.
