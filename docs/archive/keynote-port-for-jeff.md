**Superseded 2026-09-25: the live quiz was retired.** See
`docs/archive/keynote-live-quiz.md`. Kept for the record; do not act on it.

# Keynote backend: handoff for Jeff

Audience: Jeff, and Jeff's Claude running on Jeff's machine. Jeff owns the
infrastructure (Vercel env, database, secrets), so the sensitive setup lands here
rather than being done by whoever ported the pages.

Goal: stand up the backend for the keynote companion pages + live quiz (see
`keynote-companions.md` for the data model, routes, and state machine), so that
Week 2 talks can run their live quiz and future sessions store their data
correctly.

## Before you run anything: who are you?

This doc asks for **sensitive operations**: creating a database, running SQL
migrations, and setting production secrets. Those are Jeff's to run.

- **If you are Jeff's Claude on Jeff's machine, with the access below:** proceed,
  but for each sensitive step (migration, secret, deploy) first read the current
  state (use pointers: inspect the existing database, the current Vercel env, the
  existing `db/` migrations) and **assess whether the operation is safe and
  actually needed** before doing it. Do not run a migration blindly; diff it
  against what already exists, and stop and ask Jeff if anything is ambiguous or
  destructive.
- **If you are anyone else's Claude:** do not run these steps. Prepare the code
  and the SQL as a PR, and leave the run to Jeff. This doc is the list of exactly
  what to ask Jeff for.

## What this needs (the access list)

- The **keynote database**: a **separate, isolated Supabase project** for the quiz
  only (decided), kept apart from the site's payments/admin Postgres so the quiz
  code never touches sensitive tables.
- New environment variables (Vercel + local `.env`, both gitignored):
  - `SUPABASE_URL` — the keynote Supabase project URL.
  - `SUPABASE_ANON_KEY` (or the publishable key) — browser reads (realtime state +
    live aggregates), RLS-restricted to read-only on the quiz tables.
  - `SUPABASE_SERVICE_KEY` (secret) — server-only, used by the keynote API
    endpoints for every write (state changes, scoring, answers). Never shipped to
    the browser.
  - `KEYNOTE_HOST_SECRET` — the host gate the server re-checks on every host
    action (or, if we gate hosting behind the existing admin auth instead, reuse
    that and skip this).
  These join the existing env surface (`DATABASE_URL`, `MOLLIE_API_KEY`,
  `ADMIN_API_KEY`, `SPONSOR_ACCESS_CODE`, `GITHUB_TOKEN`, SMTP, Google). Keep the
  keynote keys scoped to the keynote project so a leak cannot reach payments.

## Steps

1. **Create (or confirm) the keynote database.** If Supabase: create a new
   project named for the keynote quiz. Save the URL + keys into Vercel env and
   local `.env`. Do not commit them.

2. **Create the schema.** The tables are defined in `keynote-companions.md`
   (`quiz_state`, `quiz_players`, `quiz_answers`, `quiz_sessions`, all keyed by a
   `slug` column). Write the idempotent SQL into `db/keynote-schema.sql` in this
   repo, then apply it to the keynote database. Enable Realtime on `quiz_state`
   (and the answer/aggregate reads). Set RLS so the anon key can only SELECT the
   quiz tables (and INSERT into `quiz_players` to join); all other writes go
   through the server with the service key. **Assess the RLS policy before
   applying it**; get it wrong and either the game breaks or the answer key leaks.

3. **Seed the rooms.** Each talk slug needs a `quiz_state` row. With the upsert
   pattern (see `keynote-companions.md`) this self-heals on first host action, but
   seed them anyway for a clean first run: one `('<slug>', 'idle', 0)` row per
   Week 2 talk. Companion-only Week 1 pages need no row.

4. **Wire the env into the endpoints.** The keynote API handlers read
   `SUPABASE_URL` + `SUPABASE_SERVICE_KEY` server-side and `SUPABASE_ANON_KEY` for
   the browser client. Confirm they are present in the deployed environment.

5. **Deploy and verify.** Deploy, open a Week 2 keynote page, run one full
   session end to end (open, a question, reveal, leaderboard, finish, close), and
   confirm results land in `quiz_sessions`. Only then is the port live.

## Define the data shapes in the docs (please do this)

As you set this up, write the concrete, database-specific data shapes into
`docs/` so any future participant's Claude knows exactly what exists and what to
ask for, without guessing:

- Finalize the exact SQL (types, constraints, indexes, RLS policies) as
  `db/keynote-schema.sql`, and describe it in `keynote-companions.md` if it
  diverges from the model there.
- Record which environment variables exist, what each is for, and where it is set
  (Vercel vs local), in a short `docs/environment.md` (values redacted; names and
  purposes only). This becomes the single place a new contributor's Claude learns
  what to request from Jeff.
- If a keynote reuses or relates to any existing table, note the relationship so
  no one confuses the quiz data with payments/applications data.

## Running a future session (for hosts)

Once live: adding a new keynote page is content only (a new room object + slug +
route), and the `quiz_state` row self-heals on the first host action, so no DB
step is needed per talk. To run a session, open the talk page, trigger the host
controls, and drive `open -> next ... -> finish -> close`. Results archive
automatically into `quiz_sessions`.

## Teardown of the old host (do last)

The pages were hosted temporarily on learn-ai.london. Only after the VotC version
is verified working end to end, the learn-ai.london `/valley*` routes and the old
quiz tables + data there get removed. That is a separate, owner-run step; do not
start it until this is confirmed live.
