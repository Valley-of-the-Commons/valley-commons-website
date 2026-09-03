# Keynote companions + live quiz

Per-talk "companion" pages for the Valley of the Commons keynotes, ported from
learn-ai.london (where they were hosted temporarily). Each page is the talk's
argument in numbered beats with a reading list and the speaker's links, and, for
some talks, a live multi-phone quiz + survey run during the session.

This page is the authoritative data model. Code follows this; update this page in
the same change as the code.

Backend (decided): the live quiz uses a **separate, isolated Supabase project**
(Postgres + Realtime), kept entirely apart from the site's payments/admin
Postgres. This mirrors the original design (least rewrite) and keeps the quiz's
data away from sensitive tables. See `keynote-port-for-jeff.md` for the setup.

## Routes

- `/keynote` — the index ("companions to the talks"), grouped by Valley week and
  titled with each week's theme, linking every talk page.
- `/keynote-w1-d1` ... `/keynote-w1-d5` — Week 1 (theme "Return of the Commons"),
  companion-only (no live quiz).
- `/keynote-w2-d1` ... `/keynote-w2-d5` — Week 2 (theme "Local Production and
  Value Accounting"), with the live quiz + survey.
- Optionally `/keynote-michel` (evergreen "Cosmo-Localism") and a `default`/Deca
  page, if we carry those over.

Slug scheme is `keynote-<week>-<day>`. On learn-ai.london these were `valley-*`;
rename to `keynote-*` here.

## Content model (per talk)

Each talk is one object (call it a "room"), keyed by its slug:

```
Room {
  slug: string                       // "w2-d3"
  meta: {
    eyebrow: string                  // the talk title (rendered as the h1)
    speaker: string                  // the speaker's name (the subtitle)
    socials: { label, url }[]        // 1-2 of the speaker's own links (X, site, etc.)
    metaTitle: string                // <title> for <head>
    metaDescription: string          // meta description
  }
  beats: Beat[]                      // the talk in order
  items: Item[]                      // quiz + survey; EMPTY [] for companion-only pages
  cta: { label, url }                // call to action (points back to /keynote)
}

Beat { n: number, title: string, body: string, links: { label, url }[] }

Item {
  type: "quiz" | "poll"              // quiz = scored; poll = unscored survey
  prompt: string
  options: string[]                  // 4 options, typically
}
```

Rules that must carry over:
- **Correct answers are never in the client content.** The correct option index
  per quiz item is stored server-side only, keyed by slug (a
  `correctBySlug[slug][itemIndex] = optionIndex` map), and revealed to phones only
  when the host fires the reveal action. The option order is deliberately mixed so
  the correct answer is not always first.
- **Companion-only pages** have `items: []`. They render just the beats and never
  open a live session.
- Companion reading links (in beats) are the speaker's own source material, never
  social profiles. The speaker's `socials` (in `meta`) are the one place social
  links belong.
- No em dashes in any copy.

The 12 talks' content (beats, reading, speaker, socials) is finished and lives in
the learn-ai.london repo under `src/lib/valley/rooms/*.ts` plus `rooms.ts`
(content) and `answers.server.ts` (the correct-answer keys). Port that content
verbatim; only the framework wrapper and styling change.

## Live session (Week 2 talks)

A short, host-driven, multi-phone game over a realtime channel. Rooms are
independent by a `slug` column on every table.

### Tables

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

Clients read `quiz_state` (and the live aggregates) in realtime; every write
(state changes, scoring, answers) goes through server endpoints using a secret
key, never from the browser.

### Timing (single source, shared client + server)

- pre-roll (get-ready before each question): **5s**
- answer window per question (also the scoring window): **30s**
- correct-answer reveal blink (quiz only): **3s**

### State machine + host actions

`idle` (companion showing) -> `open` -> `lobby` -> `next` -> `question`
(pre-roll then timed) -> `reveal` (quiz only, 3s) -> `leaderboard` -> `next` ...
past the last item -> `ended` -> `close` -> back to `idle`.

Host actions (server endpoints): `open`, `next`, `reveal`, `leaderboard`,
`finish`, `close`, `reset`.
- `open` and `reset` archive the current session (if any) into `quiz_sessions`,
  then clear `quiz_players` + `quiz_answers`, so results are never lost.
- The host write should **upsert** `quiz_state` keyed on slug, so a room whose row
  was never seeded self-heals on the first action (a hard-won fix: a plain UPDATE
  matched zero rows and silently did nothing).
- `close` returns to the companion WITHOUT deleting, so scores and poll splits
  stay visible under the talk until the next `open` or `reset`.

### Scoring

Correct answer: 500 base points plus up to 500 time bonus (full at 0ms elapsed,
0 at the limit). Wrong answer: 0. `elapsedMs` is measured server-side from
`question_started_at` and clamped to the window; late submissions are rejected.

### Host access

Host controls are revealed by a client-side "easter egg" gesture (a fixed tap
sequence on the companion), gated by a host secret the server re-checks on every
action. Anyone with the gesture and secret can host; state is per-device so
several co-hosts can run at once. (Deca to confirm whether to keep this exact
mechanism on the VotC site.)

## Wiring into the site

- Add a link from each `#schedule` row in `index.html` to its
  `/keynote-w<week>-d<day>` page.
- `/keynote` is reachable from `valleyofthecommons.com/#schedule` and can also get
  its own nav entry if wanted.
- Companion-only Week 1 pages need no backend; they can ship first.

## Open decisions (for the owner)

1. Keep the easter-egg host mechanism, or gate hosting behind the existing admin
   auth instead.
2. Whether to carry over the evergreen `/keynote-michel` and Deca pages.

(Backend is decided: a separate, isolated Supabase project. See
`keynote-port-for-jeff.md`.)
