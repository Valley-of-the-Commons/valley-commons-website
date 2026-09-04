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

Live quiz layer — NEXT (Week 2 + evergreen; Week 1 is companion-only)
- [not_started] `package.json` — add `@supabase/supabase-js` for the server handlers.
- [not_started] Supabase browser client (esm.sh) — realtime quiz_state + live aggregates; join flow, question/reveal/leaderboard/poll views wired into keynote.js.
- [not_started] `api/keynote/join.js` — create player (anon-side is also allowed by RLS; keep a server route for parity).
- [not_started] `api/keynote/host.js` — open/next/reveal/leaderboard/finish/close/reset; upsert quiz_state; KEYNOTE_HOST_SECRET gate; archive to quiz_sessions.
- [not_started] `api/keynote/submit.js` — answer + scoring (500 + up to 500 time bonus); correct key server-only; reject late/dup.
- [not_started] Host controls UI (easter-egg gesture on the companion) + `server.js` routes for `/api/keynote/*`.

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
