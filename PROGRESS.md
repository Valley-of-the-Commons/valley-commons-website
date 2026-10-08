# PROGRESS: VotC Website v1, post-residency survey

Plan (vault): `Companies/Commons Hub/VotC Website/WhatWeBuilt/VotC Website v1 Specifications.md` (AC-1 to AC-21) and `... v1 Implementation Strategy.md` (sequence and Coordination Log).
Repos: this one (static pages, branch `feat/survey`) and `deca12x/pi-data` (`services/votc-survey/`: API, catalogue, agent config, synthesis), deployed on pi1 at `https://pi1.tail0a8aa5.ts.net/votc-survey`.
Previous content of this file (keynote port, retired) is in git history.

Smoke: `npm test` here (42 pass); in pi-data `services/votc-survey`: `TEST_ADMIN_URL=<throwaway AGE superuser URL> npm test` (80 pass; 48 without the database); `curl https://pi1.tail0a8aa5.ts.net/votc-survey/health` is 200.

## Feature list

| AC | Behaviour | Verification | State |
|---|---|---|---|
| AC-1 | Password gate and rate limit | integration tests; live curl via Funnel: 10x 401 then 429, spoofed X-Forwarded-For ignored | passing |
| AC-2 | Results gated | integration tests; live `/results` without or with forged token is 401 | passing |
| AC-3 | Voice works on Pixel 7 and Mac Chrome; `/survey` header `microphone=(self)` | Deca in production, Tailscale off | passing (production proxy sends `microphone=(*)` on every route: accepted, unchanged behaviour) |
| AC-4 | Text works, no mic prompt | browser run against live Pi and agent | passing (Mac WKWebView; phone not yet) |
| AC-5 | Datapoints recorded live | browser run: overall_experience, highlights, collaborators, project card filled with evidence | passing (text); voice untested |
| AC-6 | Confidence rule, 8 of 10 cases | `node scripts/simulate.js` | passing: opus 9/10, sonnet 9/10, gemini 8/10 |
| AC-7 | Server threshold | integration test | passing |
| AC-8 | Two project cards | integration test | passing |
| AC-9 | Voice timing and hand-off | `/survey?timescale=0.05` in voice | not verified: Deca's choice to test voice and hang-up in production only |
| AC-10 | Text wrap-up at 15 min | `/survey?timescale=0.02` in text | passing |
| AC-11 | Resume in the same browser | browser: stop, reload, welcome back, no re-ask | passing |
| AC-12 | Pi outage queue | browser: API stopped, items queued, delivered once after restart | passing |
| AC-13 | Webhook HMAC, transcript, reconciliation | integration tests; live: webhook created and attached to the agent only, 6 transcripts stored via backfill, reconciliation ran on 5 | passing (first live webhook delivery still to observe on the next real conversation) |
| AC-14 | Consent respected | integration tests (forbidden-string grep, consent mismatch) | passing |
| AC-15 | Synthesis within 10 min | integration test; live synthesis version 3 with written summaries ($0.14 for 5 reconciliations + 1 synthesis) | passing (live trigger on session end and webhook) |
| AC-16 | Graph edges | integration test (Cypher) | passing in tests; live after AC-15 |
| AC-17 | No secrets in repos | gitleaks both repos | passing (one false positive: catalogue key name) |
| AC-18 | Design review | screenshots at phone and laptop width | not started: Deca |
| AC-19 | No em dashes | grep U+2014 in new files | passing |
| AC-20 | Real interviews (Deca, Andrew) on production | production | not started |
| AC-21 | Privacy notice | notice values match the pushed agent config | passing (re-check after any agent change) |

Evaluator rounds: 3 (independent subagent). Round 1 found 2 hard failures and 10 defects; round 2 found 5 regressions; round 3 passed.

## State (2026-10-03)
Live in production since 2026-10-03 15:46 (PRs #10, #13, #14). All model calls on Claude Sonnet 5.5. All test data deleted; ready to share (password `valley2026survey`).

## v1.4 pre-send hardening (in progress, branch `feat/survey-v1-4`)
Site half, not committed or deployed:
- Text conversations go through an HTTPS relay on the Pi (`survey/relay.js`), so attendees whose network blocks the browser's WebSocket to ElevenLabs can still write. Voice unchanged; its connect-failure copy now names security software, VPNs and networks.
- Client `connect` error reports carry `elapsed_ms`.
- "Recap & news" removed (page, renderer, nav buttons, route, styles, tests).
- Privacy notice: retention now "as long as the team uses it to plan future Valley events", plus the line on publishable words.
- Tests: 42 pass. Pairs with the API half in pi-data (relay endpoints, `elapsed_ms`, catalogue changes); not verified end to end yet.

## Next steps
1. Deca: share the link and password in the Telegram group and by email.
2. AC-20: Deca and Andrew each do a real interview in production (Tailscale off).
3. AC-18: Deca reviews the pages at phone and laptop width.
4. AC-9 (voice timing at 10 and 12 minutes) is untested; check it in a long real voice conversation or with `?timescale=0.05`.
5. Then set the Overview's Status cell to Shipped.
