# Style guide

The visual and writing conventions for the site. `home.css` is the source of
truth for the tokens; this page names them and sets the rules. When you build new
UI (including the keynote companion pages), use these, do not introduce a new
palette, font, or button style.

## Design tokens (from `home.css` `:root`)

A warm, editorial, **light** theme. Near-monochrome with an orange accent.

| Token | Value | Use |
| --- | --- | --- |
| `--cream` | `#f5f0e8` | warm background panels |
| `--orange` | `#c4622d` | the one accent: primary buttons, links, highlights |
| `--ink` | `#1a1a1a` | body text |
| `--green-dark` | `#2c3e2d` | dark green sections |
| `--green-soft` | `#7a9e7e` | soft green accents |
| `--amber` | `#8b6914` | secondary warm accent |
| `--muted`, `--muted-2`, `--muted-3` | greys | secondary text |
| `--line` | `#e5e5e5` | hairline borders |
| `--bg-soft` | `#f8f8f8` | soft section background |
| `--maxw` | `1200px` | content max width (`.container`) |
| `--pad` | `clamp(20px, 5vw, 64px)` | responsive inline padding |

Fonts: `--serif` = **Urbanist** (display and body), `--sans` = **Inter** (labels,
buttons, small caps). Base `line-height: 1.6`, antialiased.

## Components (reuse, do not reinvent)

- `.container` — centered `max-width: var(--maxw)` column with `--pad` inline.
- `.btn` + `.btn-orange` / `.btn-dark` / `.btn-light` — uppercase Inter buttons,
  `letter-spacing`, `border-radius: 2px`, subtle `translateY(-1px)` hover.
- `.site-header` — sticky white header with a hairline bottom border.
- `.promo-banner` / `.staging-flag` — full-width orange notice bars.

Before adding a new visual effect, check `home.css` for an existing one and reuse
it. If you genuinely need a new pattern, add it to `home.css` and note it here.

## Rules

- **Hierarchy comes from size, weight, and spacing, not color.** The palette is
  near-monochrome by design; orange is a single accent, not a rainbow. A layout
  should still read correctly in grayscale.
- **Match the register of the existing pages.** Editorial and calm, not techy or
  neon. (The keynote pages are being ported from a dark "cosmic" site; drop that
  look entirely and rebuild in these tokens.)
- **Responsive by default.** Use `--pad` and `--maxw`; test at mobile widths.
- **Screenshot and eyeball every visual change** before calling it done. Lint and
  build passing is not enough.

## Writing conventions

- **No em dashes** anywhere. Use a comma, a colon, parentheses, or two sentences.
- Plain, factual, non-judgmental. No marketing hype or persuasion tactics.
- Say it once, well. DRY: a fact has one home; link rather than restate.
- Name things clearly. A good name needs no comment.

## Adapting the keynote companion pages

The companions were designed for a dark theme with neon accent "spines" per talk.
For this site: use the light editorial tokens above, keep one restrained accent
(`--orange`, or a single per-talk accent drawn from the green/amber tokens if a
per-talk color is wanted), Urbanist for the talk title and beats, Inter for the
small labels (day, section, reading links). See `keynote-companions.md` for the
content structure to style.
