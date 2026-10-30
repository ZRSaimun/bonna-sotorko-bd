# Historical haor bulletin reference (BD-P-0002 / BD-T-0002)

This small, separate static page is a research demonstration. It is **not a live flood-warning service**. The April 2026 BAMIS bulletin is historical; its precise expiry time and original issue time were not independently confirmed. No risk level, forecast, safe-route claim, or harvest instruction is generated.

## Journey

1. Open `historical.html` from the main page.
2. Choose Sunamganj to see the source, dates, missing validity, and a prominent not-current warning; open the original BAMIS PDF or print the historical card.
3. Choose Other to see a clear empty state. Official FFWC/BAMIS/BMD links remain available.
4. Report an error through GitHub Issues; that is a public third-party site, not an automatic submission. Do not share private details.

## Source and provenance

- Research bank: `Bangladesh Research Idea Bank.md`, v1, 2026-10-30; idea IDs BD-P-0002 and BD-T-0002.
- Stage 2 register: `Bangladesh Project Repository Register.md`, v1, 2026-10-30.
- Official historical PDF: https://www.bamis.gov.bd/res/public/pages/2026/04/28/27953.pdf (BAMIS bulletin 114, issued 2026-04-23 and updated 2026-04-28 **as recorded in research bank**). The dates are represented as dates only, not invented times. No source licence or reuse rights for PDF content are asserted; the site links to it and does not republish it.
- Operational validity and a machine-readable live source are **not verified**. The date of research-bank review is not a live feed check.

## Run and test

Requires a static HTTP server and Node 20+; no dependencies or secrets:

```sh
npm test
node --check historical.js
python3 -m http.server 8000
# open http://localhost:8000/historical.html
```

Tests cover district empty states, date ordering, expiry, source URL validation, and no false current-state classification. Browser checks should also cover 320px and 390px widths, Bangla glyph rendering, keyboard selection and focus, print output and offline/no-JS behaviour. A test pass does not establish WCAG 2.2 AA compliance. Performance budget: static HTML/CSS/JS combined below 30 KB uncompressed for this feature, no third-party runtime assets or trackers. Check the measured bytes before release.

## Activation / release gates

No automatic feed is integrated. Before any operational alert: verify an official permitted feed, per-record source and area, issue and expiry times, local timezone, refresh cadence, stale/error handling, human review and a rollback plan. Test source-date comprehension with consenting users. Stage 5 owns any publishing decision; this branch is for review, not a deployment instruction.
