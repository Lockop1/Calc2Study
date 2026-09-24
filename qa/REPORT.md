# QA report — Calc2Study (production build, 390×844, offline)

Compiled by the orchestrator from the qa-tester's Playwright run (`qa/qa-play.mjs`, results in
`qa/results/*.json`, screenshots in `qa/screenshots/qa-*.png`); the tester agent was interrupted by
a container restart after all checks had run but before it wrote this file. Environment: Chromium
(Playwright 1.63, `/opt/pw-browsers`), viewport 390×844, `isMobile`, `hasTouch`, DPR 2, against
`npm run build && npm run preview`. Commands also run: `npm run typecheck`, `npm test`
(22 files / 866 tests at the time; 868 after the fix below), `npm run build`.

## Summary

| Suite (qa/results) | Checks | Pass | Fail |
|---|---|---|---|
| home (topic picker, persistence, badge) | 20 | 20 | 0 |
| flash (3 rounds ×10: ≥5 options, shuffle, feedback, one-tap Next, double-tap guard, summary, review misses) | 103 | 103 | 0 |
| steps (2 problems with deliberate wrong answers: reveal, advance, final + recap) | 55 | 55 | 0 |
| review (badge, weighted deck, retirement after 3 correct) | 17 | 17 | 0 |
| weighting (recent/repeated misses appear more) | 4 | 4 | 0 |
| settings (round size 5/10/20, reset flow, storage status) | 23 | 22 | 1 |
| storage (localStorage getter/setter throw → app still plays a round) | 19 | 19 | 0 |
| offline (SW ready → setOffline → reload → full Flash, Step, Review rounds; 0 failed requests; KaTeX fonts loaded) | 28 | 28 | 0 |
| offline-hard (server process killed instead of setOffline) | 28 | 28 | 0 |
| dark mode | 3 | 3 | 0 |
| longmath (longest option/prompt scrolls inside its container; page never scrolls sideways) | 10 | 10 | 0 |
| perf (tap→feedback and Next→next question timings, 20 samples) | 5 | 5 | 0 |
| sweep-flash (all 565 flash units incl. generator instances mounted in the app) | 32 | 32 | 0 |
| sweep-steps (all 403 step units mounted in the app) | 37 | 36 | 1 |
| **Total** | **384** | **382** | **2** |

Layout metrics (`qa/results/layout.json`), all screens: `html`/`body` scrollWidth = 390 (no sideways
scroll), 0 KaTeX error boxes, 0 clipped elements; option buttons min height 52 px; first option top
471 px (Flash/Review) and 518 px (Step-Through) — lower half of an 844 px viewport; Next / Finish
button at 780–832 px.

Built-output audit (`qa/results/audit.json`): `dist/sw.js` precaches 35 files including
`index.html`, the JS/CSS bundles, icons and all KaTeX `.woff2` fonts; `manifest.webmanifest` has
name, short_name, 192/512/maskable icons, `display: standalone`, relative `start_url`/`scope`. The
only `http://` hits in the bundle are React's XML namespace constants (SVG/MathML); there is no
`fetch(`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`, or CDN reference.

Content sanity (`qa/results/content-check.json`): 485 static flash items + 16 generators (fuzzed
over 400 seeds each, 0 failures) and 89 problems / 398 steps; every unit rendered in the app with no
`.katex-error`, no empty option and no `NaN`/`[object Object]`. The "suspicious text `undefined`"
hits are `why` sentences that legitimately contain the word *undefined* (e.g. "sec²x is undefined
at π/2"). "Ambiguous keys" are generator seeds that map to the same coefficients — expected, ids differ.

A separate check (`qa/subpath-offline-smoke.mjs`) serves `dist/` under `/Calc2Study/` like GitHub
Pages: the service worker registers with scope `/Calc2Study/`, precaches 29 entries, and the app
reloads offline with zero failed requests.

## Failures

1. **Settings — accidental double tap on "Reset progress" erased progress** (major, fixed).
   Repro: tap "Reset progress", then tap "Tap again to erase" within ~100 ms. Expected: the confirm
   tap is ignored (the arming tap and the confirming tap were one double tap). Actual: progress
   erased. Fix: `src/screens/SettingsScreen.tsx` ignores a pointer confirm within 600 ms of arming
   (`RESET_CONFIRM_GUARD_MS`); test `tests/app/settings-reset-guard.test.tsx`.
2. **Step-Through — feedback panel partly covers a long step prompt** (minor, open). On 7 of 403
   steps (e.g. vs-s-04#0, ts-s-06#4, ip-s-04#3/#4, ip-s-08#4, ip-s-03#3) only 36–47 % of the prompt
   is visible while the feedback panel is open; the work area scrolls, so the text is reachable.
   Suggested fix: cap the "Work so far" list height or auto-scroll the prompt into view when the
   feedback panel opens.
