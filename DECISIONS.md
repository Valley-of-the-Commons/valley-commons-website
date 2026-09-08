# DECISIONS — keynote port (append-only)

- **Separate isolated Supabase project for the quiz** (not the site's payments/admin Postgres). Why: keeps quiz data away from sensitive tables; mirrors the original design so the realtime logic ports with least rewrite. Rejected: reusing the existing Postgres with polling (entangles quiz with payments DB; Vercel serverless cannot hold realtime connections anyway).
- **Content is one ESM module `public/keynote/content.mjs`** (`.mjs` so Node can dynamic-import it for server-side meta while the browser imports it as a module). Single source of truth for both browser rendering and server meta injection. Correct quiz answers are NOT in it; they live server-only in `api/keynote/answers.js`. Rejected: duplicating meta into a second file (drift risk).
- **One `keynote.html` template + client renderer** decides index vs companion from the path (`/keynote` vs `/keynote-<slug>`). Rejected: 12 static HTML files (duplication; harder to keep consistent).
- **Server injects per-page `<title>`/`<meta description>`** by dynamic-importing content.mjs in the Express route. Keeps link/SEO meta correct without a second data source.
- **Slugs renamed `valley-*` -> `keynote-*`**; room slugs: `deca` (was default), `michel` (was valley-michel), `w1-d1..w1-d5`, `w2-d1..w2-d5`. All 12 ported (Deca + Michel included, per owner).
- **Live-quiz hosting via the easter-egg gesture + `KEYNOTE_HOST_SECRET`** (server re-checks on every host action). Rejected: gating behind the site's admin auth (would prevent handing hosting to a non-admin speaker).
- **Re-skin to the VotC light editorial design** (cream/orange/ink, Urbanist/Inter), dropping the dark cosmic LAL look entirely.
- **Host write path upserts `quiz_state` keyed on slug** so a room whose row was never seeded self-heals on first action (a fix learned on the LAL side: a plain UPDATE matched zero rows and silently no-opped).
