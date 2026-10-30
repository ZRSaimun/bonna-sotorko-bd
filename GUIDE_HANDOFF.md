# Stage 4: historical source question guide

**IDs:** BD-P-0002 / BD-T-0002. **Input:** Stage-3 register v1 (2026-10-30 02:12 UTC); stage-3 commit `18682012f99499de3f6f2517ef1e7a92b94016ca`. Branch: `stage4/historical-source-guide`, stacked on `stage3/historical-haor-reference`. Do not merge before upstream PR #2 and foundation PR #1 are coordinated.

## What it does
`guide.html` provides a Bangla/English, mobile-first question interface for the dated Sunamganj example. It answers only reviewed metadata questions about the source, issue/update dates and unknown validity. It asks for the district, links the original BAMIS PDF, and refuses current-risk/safety claims, unsupported topics and injection-like input. It is an **offline, deterministic FAQ/source navigator, not a live AI assistant or a government service**. Questions stay in this page's DOM only; clearing removes them. There is no backend, network call, persistence, provider key, analytics, or charge. The main historical page works without the guide.

**Sources:** stage-1 research bank v1 (reviewed 2026-10-30), BAMIS historical PDF https://www.bamis.gov.bd/res/public/pages/2026/04/28/27953.pdf ; FFWC https://ffwc.gov.bd/ ; BAMIS latest https://www.bamis.gov.bd/en/page/alert/latest/ ; BMD https://bmd.gov.bd/web/. Dates are bank-reported and exact times/validity unverified. No official source licence or API permission asserted. No source text copied into the FAQ.

## Verify
`npm test` (includes `guide-model.test.js`), `node --check guide.js`, `node --check guide-model.js`, `python3 -m http.server 8000` then visit `/guide.html`. Test at 320/390px, keyboard Tab, language switching, clear/focus, no-JS source links, screen-reader announcement, unsupported locality, and source URLs. Reduced-motion CSS is provided; no heavy dependencies. **No automated accessibility test establishes WCAG compliance.**

## Provider decision
No model provider is activated. A public AI assistant needs editorially verified knowledge, a server-side proxy, consent/privacy notice, per-user rate and token limits, hard spending caps, injection resistance, and a separate approved budget. A ChatGPT subscription is not an API entitlement. Official guidance: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety . This safe FAQ remains usable without AI.

## Stage 5
Review stacked PRs in order, verify served ES modules and actual mobile/keyboard behaviour, confirm no misleading current warning, and check source/date comprehension with consenting users before any release. No public deployment or live alert is authorised by this PR.
