# docs/

Reference and handoff docs for the Valley of the Commons website. The root
`CLAUDE.md` holds the always-on rules; these pages hold the detail, loaded when a
task needs them. Keep each page focused, factual, and DRY (one home per fact).

## Index

- **style-guide.md**: the design system (color tokens, fonts, buttons, spacing)
  and writing conventions. Read before building or restyling any UI, including the
  keynote companion pages.
- **keynote-companions.md**: the keynote companion pages (a static archive
  since the live quiz was retired 2026-09-25): the routes (`/keynotes`,
  `/keynote-<slug>`), the content model, and the static quiz/survey results file.
- **archive/**: retired features, kept for the record. `archive/keynote-live-quiz.md`
  documents the retired live multi-phone quiz; `archive/keynote-port-for-jeff.md`
  and `archive/keynote-live-quiz-schema.sql` are its superseded backend handoff
  and schema.

## Conventions for these docs

- One fact, one home. Link between pages instead of restating.
- No em dashes. Plain, factual language.
- When you add or rename a page here, update this index and the `docs/ map` in the
  root `CLAUDE.md` in the same change.
- Data shapes and schemas are authoritative here. Code should follow these docs,
  and these docs should be updated in the same change as the code they describe.
