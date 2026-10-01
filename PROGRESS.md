# PROGRESS: VotC Website v1, post-residency survey

Plan (vault): `Companies/Commons Hub/VotC Website/WhatWeBuilt/VotC Website v1 Specifications.md` (AC-1 to AC-21) and `... v1 Implementation Strategy.md` (sequence and Coordination Log).
Repos: this one (static pages, branch `feat/survey`) and `deca12x/pi-data` (`services/votc-survey/`: API, catalogue, agent config, synthesis), deployed on pi1 at `https://pi1.tail0a8aa5.ts.net/votc-survey`.
Previous content of this file (keynote port, retired) is in git history.

Smoke: `npm test` here (24 pass); in pi-data `services/votc-survey`: `TEST_ADMIN_URL=<throwaway AGE superuser URL> npm test` (27 pass); `curl https://pi1.tail0a8aa5.ts.net/votc-survey/health` is 200.

## Feature list

| AC | Behaviour | Verification | State |
|---|---|---|---|
| AC-1 | Password gate and rate limit | integration tests; live curl via Funnel: 10x 401 then 429, spoofed X-Forwarded-For ignored | passing |
| AC-2 | Results gated | integration tests; live `/results` without or with forged token is 401 | passing |
| AC-3 | Voice works on Pixel 7 and Mac Chrome; `/survey` header `microphone=(self)` | Deca on devices; `curl -sI` | blocked: needs Deca; production proxy sends `microphone=(*)` everywhere (Jeff) |
| AC-4 | Text works, no mic prompt | browser run against live Pi and agent | passing (Mac WKWebView; phone not yet) |
| AC-5 | Datapoints recorded live | browser run: overall_experience, highlights, collaborators, project card filled with evidence | passing (text); voice untested |
| AC-6 | Confidence rule, 8 of 10 cases | `node scripts/simulate.js` | passing: opus 9/10, sonnet 9/10, gemini 8/10 |
| AC-7 | Server threshold | integration test | passing |
| AC-8 | Two project cards | integration test | passing |
| AC-9 | Voice timing and hand-off | `/survey?timescale=0.05` in voice | blocked: needs a microphone (Deca) |
| AC-10 | Text wrap-up at 15 min | `/survey?timescale=0.02` in text | passing |
| AC-11 | Resume in the same browser | browser: stop, reload, welcome back, no re-ask | passing |
| AC-12 | Pi outage queue | browser: API stopped, items queued, delivered once after restart | passing |
| AC-13 | Webhook HMAC, transcript, reconciliation | integration tests | passing in tests; live blocked: ElevenLabs key lacks webhooks_write |
| AC-14 | Consent respected | integration tests (forbidden-string grep, consent mismatch) | passing |
| AC-15 | Synthesis within 10 min | integration test with fake LLM | blocked live: Anthropic key and webhook |
| AC-16 | Graph edges | integration test (Cypher) | passing in tests; live after AC-15 |
| AC-17 | No secrets in repos | gitleaks both repos | passing (one false positive: catalogue key name) |
| AC-18 | Design review | screenshots at phone and laptop width | not started: Deca |
| AC-19 | No em dashes | grep U+2014 in new files | passing |
| AC-20 | Real interviews (Deca, Andrew) on production | production | not started |
| AC-21 | Privacy notice | notice values match the pushed agent config | passing (re-check after any agent change) |

Evaluator rounds: 3 (independent subagent). Round 1 found 2 hard failures and 10 defects; round 2 found 5 regressions; round 3 passed.

## Next steps
1. Deca: voice test on Mac Chrome (`http://localhost:3000/survey`), then phone (needs an HTTPS address: tailscale serve or production).
2. Deca: new ElevenLabs key with webhook permission; then create the post-call webhook, attach it to the agent only, pipe its secret to pi1.
3. Deca: Anthropic API key on pi1; then live AC-13, AC-15, AC-16.
4. Purge test data (pi1 tables and test conversations in ElevenLabs) before launch.
5. Phase 6: PR, then the deploy path through `Jeff-Emmett/valley-commons`; production headers (AC-3) need Jeff.
