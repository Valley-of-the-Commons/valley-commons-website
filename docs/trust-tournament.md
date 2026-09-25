# Trust Tournament results page

`/trust-tournament` shows the final state of the live Trust Tournament played on
19 September 2026: a 7-round cooperate-or-defect game that grows from pairs to a
commons, with public plays and banishment. The live game itself runs on
learn-ai.london (`/trust-tournament`); this page is its static results record.

## Files

- `trust/index.html`, `trust/trust.js`, `trust/trust.css`: the page. It loads
  `/keynote/keynote.css` for the shared tokens and the dark dusk backdrop.
- `data/trust-tournament-2026-09-19.json`: the only data source (players, final
  scores and status, the round schedule, scoring rules, reference totals).
- `server.js`: `GET /trust-tournament` serves the page; `GET /data/:file` serves
  the files listed in `PUBLIC_DATA_FILES` (json is otherwise not served).
- Linked from the `/keynotes` index as its primary button.

## What the data covers

Only the final state survives, read from the projector screenshot taken at the end
of round 7. The per-round choices, groups and votes were overwritten on
2026-09-22 when the live game was reopened for a demo. The reference totals (4,
11, 24, 34) are derived from the rules at the target group sizes, and
`tests/keynotes.test.mjs` recomputes them from the JSON's own rules.

## Writing

The collapsible background sections adapt the "What is this? / The research
question / How does it work? / The history / Popular videos" structure of
agenticaxelrod.xyz to this game. Every history entry was checked against its
source on 2026-09-25.
