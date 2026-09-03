# docs/

Reference and handoff docs for the Valley of the Commons website. The root
`CLAUDE.md` holds the always-on rules; these pages hold the detail, loaded when a
task needs them. Keep each page focused, factual, and DRY (one home per fact).

## Index

- **style-guide.md** — the design system (color tokens, fonts, buttons, spacing)
  and writing conventions. Read before building or restyling any UI, including the
  keynote companion pages.
- **keynote-companions.md** — the keynote companion + live-quiz feature ported
  from learn-ai.london: what it is, the routes (`/keynote`, `/keynote-wN-dN`), the
  full data model (companion content + quiz/survey + the live-session tables), and
  how it wires into the site's `#schedule`.
- **keynote-port-for-jeff.md** — an executable handoff aimed at Jeff's Claude:
  the exact manual steps to stand up the keynote backend (environment variables,
  database, migrations, deploy), with a rule that sensitive operations
  (migrations, payments, secrets) are only run by Jeff's own Claude on his machine.

## Conventions for these docs

- One fact, one home. Link between pages instead of restating.
- No em dashes. Plain, factual language.
- When you add or rename a page here, update this index and the `docs/ map` in the
  root `CLAUDE.md` in the same change.
- Data shapes and schemas are authoritative here. Code should follow these docs,
  and these docs should be updated in the same change as the code they describe.
