# Dated historical source note (stage 4)

**Project IDs:** BD-P-0002 / BD-T-0002. **Base:** stage-4 PR #3 commit `9cb08603c372922e1011203803c4b285825279f3`, itself stacked on stage-3 PR #2 and foundation PR #1. **Branch:** `stage4/historical-share-note`. Review this PR after PRs #1 → #2 → #3; do not silently replace stage-3 files.

A reader can open `share-note.html` from the question guide, inspect a bilingual historical note, print it, or explicitly share/copy it. The text always includes the source, research-bank dates, unverified validity and a warning that it is **not a current flood advisory**. It never includes the visitor's question, personal details or device location. The original pages and official links work without this optional feature. No messages are sent automatically.

**Source:** BAMIS historical PDF https://www.bamis.gov.bd/res/public/pages/2026/04/28/27953.pdf ; research bank reviewed 2026-10-30; current official information route https://ffwc.gov.bd/ . The issue/update dates are from the research bank, not independently re-verified PDF timestamps. Operational expiry and source reuse rights remain unknown; no PDF content is copied.

**Compatibility:** `navigator.share` is optional and needs a secure context, user gesture and browser support; cancellation is not treated as a copy. Clipboard also needs browser permission/secure context. A manual selectable-text fallback is available. No dependency, model, service worker, analytics, user data retention or paid API. Official references: https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API and https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText .

**Checks:** `npm test`, `node --check share-note.js`; serve with `npm start` and inspect 320/390px and desktop, 200% zoom, Bangla font fallback, keyboard, no-JS links, share denial, clipboard denial, print output, reduced motion and screen-reader status. Node tests cover historical labels, dates, source URLs, invalid/future data, privacy and JS syntax. CI does not establish that native share works on a real device.

**Stage 5:** Verify the stacked branch and actual browser fallback; have reviewers check whether recipients recognise the historical warning before any release. No production merge/deploy or emergency alerts are authorised.
