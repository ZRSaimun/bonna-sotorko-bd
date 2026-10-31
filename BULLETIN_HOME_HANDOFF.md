# Bulletin-first homepage redesign — Stage 4 handoff

Stable idea IDs: **BD-P-0002 / BD-T-0002**. This change builds on the existing BonnaSotorko website. It does not introduce a warning service or new official data.

## Why this change

Before: a cinematic video/WebGL scene occupied the first screen on the flood site, using the same film/hero pattern as the other Bangladesh projects. The source, district, historical date and household tools were below the scene. A graphic can be compelling, but here it delayed the user's real task and could imply a live view.

After: a Bangla-first public-information desk with a four-point source-checking method, district/source workspace, dated historical archive band and a separate household checklist. The home page no longer loads the shared scene script, video, canvas or optional 3D dependencies. Other pages and the unused scene assets remain untouched to avoid destructive changes. It is a distinct bulletin/document layout rather than a recycled hero/card grid. No other site's branding or visual assets were copied.

## Real behaviour and limitations

- `#district`, `#status`, `#checks`, `#progress`, `#reset` and `#storage` are preserved for the existing `app.js` flow. Official links and historical archive work without JavaScript.
- District selection **does not fetch** a warning or mark a district safe. It always reports unavailable current data. FFWC, DDM and BAMIS links open official websites; their live data is not republished.
- Household checklist text is currently in English; the new frame is Bangla-first. Progress is browser-local where storage is available. Clearing progress is supported; this is not a secure multi-user account.
- No new dependencies, keys, analytics, personal data collection, API calls, map, model or alert dispatch.
- The current date/time of a government bulletin is not inferred from the website homepage. The archive is visibly marked April 2026 and not current.
- The redesign does not establish any real-world safety, user comprehension, accessibility compliance or performance field metric.

## Reproduce and review

Node 20+: `npm test` and `npm run build`. Serve `dist/` via an HTTP server; do not open the modules using file://. Check the district change, saved checklist, reset, no-JS official links, and print view. At 320/390/1280 CSS px and 200–400% zoom inspect horizontal overflow, Bangla glyphs, focus order, contrast, keyboard tabbing and screen-reader status announcements. Inspect all four other homepages side by side to confirm distinct composition. Check real network and memory profiles before any production deployment.

Research consulted 2026-10-31: [FFWC](https://ffwc.gov.bd/) for official navigation (not imported data), [W3C WCAG 2.2 reflow](https://www.w3.org/TR/wcag/#reflow), [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion). No third-party media or fonts are added.

## Stage 5 next action

Review this branch/PR against the current main branch. Confirm the build actually includes every linked file; verify served mobile and no-JS views, 320px reflow, 200% zoom, keyboard/voice announcements, print and official links. Do not deploy or merge without the usual review and release decision. No live flood alerts are authorised.
