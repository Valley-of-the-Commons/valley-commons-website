# DECISIONS: VotC Website v1, post-residency survey (append-only)

Previous content (keynote port, retired) is in git history. Dated coordination events also go to the Implementation Strategy's Coordination Log in the vault.

- **Light editorial theme, not the dusk glass of the keynote pages.** Why: the style guide's base theme; the survey is a calm conversation. One new element: the breathing orb for voice. Rejected: the `kn-glass` variant.
- **ElevenLabs SDK from jsdelivr, pinned (`@elevenlabs/client@1.26.0/+esm`), loaded only when a mode is chosen.** Why: no bundler on this site; nothing loads before the person presses Start. Rejected: vendoring a build.
- **Timing signals by `sendContextualUpdate`.** Present in SDK 1.26.0. Rejected: a per-turn timing client tool.
- **Voice cap enforced by the page; the agent's limit is the text limit (7200 s, the platform maximum).** Why: the SDK does not pass `max_duration_seconds` per session. Rejected: two agents (Spec Decision 5), or chaining 13-minute text sessions.
- **Silent text continuation only when the platform ended the session at its limit** (reason `agent` and the session lasted at least the limit minus 30 s). Why: an agent hang-up before the closing must not restart silently.
- **Offline queue re-reads storage every step and dedupes by idempotency key.** Why: tabs share one queue; retries are safe server-side.
- **`?api=` override works on localhost only.** Why: a crafted link must not send the password elsewhere.
- **Bars on the results page scale to the number of respondents.** Why: one full-width bar per event hid the magnitude. Palettes checked with the dataviz validator.
