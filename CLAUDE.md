# CLAUDE.md — Valley of the Commons website

The public site for Valley of the Commons: landing page, membership + sponsorship
applications (Mollie payments), an AI "game terminal", an admin area, and (being
added) per-talk **keynote companion** pages with a live quiz. Plain vanilla JS +
Express, static HTML/CSS/JS, raw Postgres (`pg`), deployed on Vercel.

This file is deliberately lean. It holds only what should fire on **every** task
in this repo. Everything deeper lives in `docs/`, loaded when you need it (see the
map below). This is selective disclosure: keep this file short so it does not
dilute attention on every task.

## How we work here (standing rules)

- **Multiple people share this repo, each with their own Claude.** Read this file
  and the relevant `docs/` page before touching an area you do not know. Do not
  invent conventions; adopt the ones written here.
- **Sensitive surfaces are owner-gated.** Payments (Mollie), the admin area and
  `admin_users`/`admin_sessions`, the `SPONSOR_ACCESS_CODE`, the `GITHUB_TOKEN`
  (repo write), production secrets, and any **database migration** are Jeff's to
  run. If you are not Jeff's Claude on Jeff's machine, propose the change and stop;
  do not execute it. See `docs/keynote-port-for-jeff.md` for the gating pattern.
- **Never commit secrets.** Real keys live only in Vercel env vars and Jeff's
  local `.env` (gitignored). Ask for values through a handoff doc; never paste
  them into tracked files. Respect `.gitignore`; never `git add -f` a gitignored
  file (see `ENGINEERING_GUIDELINES.md`).
- **Branch + PR, never force.** Work on a feature branch and open a PR; do not
  push straight to `main`. Never force-push or delete shared branches. (Confirm
  the exact review/deploy flow with Jeff; treat `main` as protected.)
- **No em dashes anywhere** (code, comments, docs, copy). Use a comma, a colon,
  parentheses, or two sentences.
- **Plain, factual writing.** No hype or persuasion tactics. Say it once, clearly.
  DRY applies to docs and rules too: a fact has one home; link to it, do not
  restate it.
- **Match the existing design.** New UI uses the site's own design tokens and
  components (see `docs/style-guide.md`), not a new palette or font.
- **Visual changes are not done on lint/build alone.** Screenshot the page and
  eyeball it in context before claiming a UI change is complete.

## Stack (where things are)

- `server.js` — Express server; mounts each `api/*` handler (written as
  Vercel-style serverless functions) and serves the static pages.
- `*.html` + `home.css` / `home.js` / `game.css` / `game.js` — the static site.
- `api/*.js` — endpoints: applications, waitlist, Mollie payments, admin auth,
  game chat (AI), share-to-github, mail, newsletter, Google Sheets.
- `db/schema.sql` + `db/migration-*.sql` — Postgres schema and migrations.
- `vercel.json` / `Dockerfile` / `docker-compose.yml` — deploy + local dev.

## docs/ map

Loaded on demand. Add a one-line pointer here whenever you add a docs page.

- `docs/README.md` — index of everything in `docs/`.
- `docs/style-guide.md` — the design system (tokens, fonts, components) + writing
  conventions. Read before building any UI.
- `docs/keynote-companions.md` — the keynote companion + live-quiz feature: what
  it is, routes (`/keynote`, `/keynote-wN-dN`), the data model, and the schedule
  wiring.
- `docs/keynote-port-for-jeff.md` — executable handoff for Jeff's Claude to stand
  up the keynote backend (env vars, database, migrations), with sensitive-op
  gating. Start here for the port.
- `ENGINEERING_GUIDELINES.md` (repo root) — git and force-operation rules.
