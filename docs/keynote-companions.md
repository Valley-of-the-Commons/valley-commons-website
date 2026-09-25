# Keynote companions

Per-talk "companion" pages for the Valley of the Commons keynotes: each page is
the talk's argument in numbered beats with a reading list and the speaker's
links. Some talks also carry the results of a live quiz + survey run during the
session; that live session itself was retired 2026-09-25 once Valley finished,
see `docs/archive/keynote-live-quiz.md`. This page is now a static archive.

This page is the authoritative data model. Code follows this; update this page
in the same change as the code.

## Routes

- `/keynotes`: the index ("companions to the talks"), grouped by Valley week
  and titled with each week's theme, linking every talk page. `GET /keynote`
  (no `s`) 301-redirects here, preserving any query string, so old links keep
  working.
- `/keynote-<slug>`: a talk companion, e.g. `/keynote-w2-d3`. Slugs are
  `w<week>-d<day>` (`w1-d1` ... `w4-d5`), plus the evergreen `deca` and `michel`,
  and `sterlin-parallel-mind` (Sterlin Lujan's second, standalone talk).
- `/keynote-w4-d1` is a special case: Deca's closing-of-week deck has no
  companion room. It is a self-contained static reveal.js page served from
  `keynote-w4-d1/index.html`, with its own assets under `/keynote-w4-d1/`.
- `/keynote-<slug>-gatherings`: an optional standalone long-form reading tied
  to a talk (currently only `w2-d4`), rendered from that room's `readings`.

## Content model (per talk)

Each talk is one object (a "room"), keyed by its slug, in `keynote/content.mjs`:

```
Room {
  slug: string                       // "w2-d3"
  meta: {
    eyebrow: string                  // the talk title (rendered as the h1)
    speaker: string                  // the speaker's name (the subtitle)
    socials: { label, url }[]        // 1-2 of the speaker's own links (X, site, etc.)
    livestream?: string              // YouTube link, when the talk was recorded
    metaTitle: string                // <title> for <head>
    metaDescription: string          // meta description
  }
  beats: Beat[]                      // the talk in order
  readings?: Reading[]               // optional: extra long-form material (see w2-d4)
  cta: { label, url }                // call to action, always "/keynotes"
}

Beat { n: number, title: string, body: string, links: { label, url }[] }
```

Rooms carry no `items` (quiz/poll questions): that content now lives only in
`data/keynote-results.json`, described below. Companion-only rooms need nothing
extra; they simply have no matching entry in that file.

`WEEKS` groups rooms by week for the index timeline. Each week's `slugs` array
holds either a room slug (a string) or, for a talk with no companion room (only
Deca's `w4-d1` deck today), a plain link object `{ speaker, talk, url }`,
rendered as a normal-looking card via `soonCardHtml`. `MORE` lists the evergreen
companions shown below the weeks. `CATEGORIES` + `AXES` feed the 3D
Constellation view (`keynote/graph.mjs`); every entry there needs a matching
room (or, for w4-d1, its own special-cased route) for its `href` to resolve.

No em dashes in any copy.

## Static quiz + survey results

`data/keynote-results.json`, served at `GET /data/keynote-results.json`
(a dedicated route in `server.js`, since `json` is deliberately not in the
static-file allowlist), is the sole source of quiz/survey content:

```
{
  source: string,
  sessions: {
    [slug]: {
      playedAt: string (ISO date),
      playerCount: number,
      standings: { nickname: string, score: number }[],
      items: {
        type: "quiz" | "poll",
        prompt: string,
        options: string[],
        correct?: number,     // quiz only: index into options
        counts: number[],     // one count per option, same length as options
      }[],
    },
  },
}
```

`keynote/keynote.js` fetches this once at load. A companion page's "The quiz"
tile appears only when that talk's slug has an entry with at least one `quiz`
item; "The room" (survey) tile appears only when it has at least one `poll`
item. Both panels read prompts, options, tallies and (for quiz) the correct
answer straight from this file; a room with no entry here shows only the
companion (and readings, where present) tiles. As of 2026-09-25 only `w2-d2`,
`w2-d3` and `w2-d5` have session data.

## How to add a companion

1. Write the room object (`meta`, `beats`, `cta: { url: "/keynotes" }`) and add
   it to `ROOMS` in `keynote/content.mjs`.
2. Add its slug to `WEEKS` (or `MORE`, for an evergreen companion outside the
   four weeks) so it appears on the index.
3. Add a `CATEGORIES` entry with `href: "/keynote-<slug>"` and its three axis
   tags so it appears in the Constellation view.
4. If the talk ran a live session and you have its results, add an entry to
   `data/keynote-results.json` under the matching slug.
5. Run `npm test` (`tests/keynotes.test.mjs` checks content consistency and the
   live routes).
