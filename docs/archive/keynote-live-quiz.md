Superseded 2026-09-25. The live quiz described below no longer exists in this
repo: it was retired once Valley of the Commons finished (24 Aug to 20 Sep 2026)
and the keynote pages became a static archive. The code is recoverable from
commit 2c6ae23 (`keynote/session.mjs`, `api/keynote/*.js`, the routes it added
to `server.js`, and `docs/archive/keynote-live-quiz-schema.sql`, archived from
`db/keynote-schema.sql` in the same change that retired the quiz). This page is
kept as the historical record; nothing here should be rebuilt without a fresh
decision to do so.

# What the live quiz was

A short, host-driven, multi-phone quiz + survey run live during a Week 2 keynote
(and the evergreen "deca" talk). Each companion page's items array held the
quiz/poll questions; a phone in the room joined a session, answered in real
time, and saw the correct answer and live standings as the host advanced the
state machine. Companion-only talks (`items: []`) never offered this and just
showed the beats.

## Where it ran

The real Week 2 sessions ran on **learn-ai.london's** own Supabase project. This
repo's own, separate Supabase project for the keynote quiz (see
`docs/archive/keynote-port-for-jeff.md`) was stood up for the port to this site
but was never actually used to run a live session, and is being deleted along
with the code. `data/keynote-results.json` (w2-d2, w2-d3, w2-d5), exported from
the learn-ai.london Supabase's `quiz_sessions` archive on 2026-09-25, is the
only surviving record of any session.

## Tables

Rooms were independent by a `slug` column on every table. Full DDL:
`docs/archive/keynote-live-quiz-schema.sql`.

```
quiz_state    one row per slug, the state machine
  slug                text primary key
  phase               text   -- idle | lobby | question | reveal | leaderboard | ended
  current_index       int    -- which item
  question_started_at timestamptz  -- set slightly in the FUTURE for the pre-roll
  revealed_answer     int    -- correct option, published only at reveal (null otherwise)
  updated_at          timestamptz

quiz_players  one row per joined phone, scoped by slug
  id uuid pk, slug text, nickname text, score int default 0, joined_at timestamptz

quiz_answers  one row per (player, item)
  id uuid pk, slug text, player_id uuid, question_index int, choice int,
  is_correct boolean, points int default 0, answered_at timestamptz,
  unique (player_id, question_index)

quiz_sessions durable archive of a finished session (so results survive a reset)
  id uuid pk, slug text, results jsonb, ended_at timestamptz
  -- results = { standings: [{nickname, score}], aggregates: number[][], playerCount }
```

## State machine and host flow

`idle` (companion showing) -> `open` -> `lobby` -> `next` -> `question`
(pre-roll then timed) -> `reveal` (quiz only, 3s) -> `leaderboard` -> `next` ...
past the last item -> `ended` -> `close` -> back to `idle`.

Host actions (server endpoints, `api/keynote/host.js`): `open`, `next`,
`reveal`, `leaderboard`, `finish`, `close`, `reset`.

- `open` and `reset` archived the current session (if any) into `quiz_sessions`,
  then cleared `quiz_players` + `quiz_answers`, so results were never lost.
- The host write upserted `quiz_state` keyed on slug, so a room whose row was
  never seeded self-healed on the first action (a plain UPDATE matching zero
  rows had silently done nothing).
- `close` returned to the companion without deleting, so scores and poll splits
  stayed visible under the talk until the next `open` or `reset`.

Host controls were revealed by a client-side "easter egg" gesture (five taps on
the companion title within 3 seconds), gated by `KEYNOTE_HOST_SECRET`, which the
server re-checked on every action. State was per-device, so several co-hosts
could run at once.

## Timing (single source, client + server)

- pre-roll (get-ready before each question): **5s**
- answer window per question (also the scoring window): **30s**
- correct-answer reveal blink (quiz only): **3s**

## Scoring

Correct answer: 500 base points plus up to 500 time bonus (full at 0ms elapsed,
0 at the limit). Wrong answer: 0. `elapsedMs` was measured server-side from
`question_started_at` and clamped to the window; late submissions were rejected.

## Why it was retired

Valley of the Commons finished 24 Aug to 20 Sep 2026. With no more live
sessions to run, the multi-phone infrastructure (Supabase project, realtime
client, host panel, five API routes) had no further use; the keynote pages
became a static archive of the companions plus whatever session results had
been captured, and the live-quiz code was removed rather than kept dormant.
