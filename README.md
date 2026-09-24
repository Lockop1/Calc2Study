# Calc2Study

Phone-first, offline micro-learning drills for **MAC 2312 Calculus II (UCF) — Exam 1**.
Open it for 2–5 minutes and get drilled with questions that require actual thinking: every
distractor is a specific, realistic student mistake, and no answer is guessable from the options
alone.

**Modes:** Flash Drill (fast multiple choice) · Step-Through ("what's next?" on a worked problem) ·
Review (everything you've missed, weighted toward recent and repeated misses).
**Topics (Exam 1):** differentiation review · antiderivatives & u-substitution · area between
curves · volumes by slicing/disks/washers · cylindrical shells & method selection · arc length ·
integration by parts · trigonometric integrals · trigonometric substitution.

No backend, no accounts, no network calls. Everything ships in the static bundle and works offline
as an installable PWA.

## Use it on your phone

1. `npm install && npm run build` → the static site is in `dist/`.
2. Deploy `dist/` to any static host (GitHub Pages, Netlify, Cloudflare Pages, an S3 bucket, or
   `npx serve dist` on your laptop while on the same Wi-Fi). Paths are relative, so any sub-path works.
3. Open it on your phone once while online, then **Add to Home Screen** (Safari: Share → Add to Home
   Screen; Chrome: ⋮ → Add to Home screen). From then on it works in airplane mode.
4. Pick your topics on the Home screen (all are selected by default; the selection is remembered),
   choose a mode, and drill. Round length (5/10/20) and "Reset progress" are in Settings.

Progress and settings live in your browser's localStorage on the device.

## Develop

```
npm run dev          # Vite dev server
npm run typecheck    # tsc --noEmit
npm test             # vitest: content checks, parser, app logic, KaTeX render (all must pass)
npm run build        # typecheck + vite build → dist/ (static, PWA, offline)
npm run preview      # serve dist/ on :4173 (needed to test the service worker)
npx tsx scripts/content-stats.ts   # per-topic content counts
```

See `CLAUDE.md` for the project contract (constraints, content schema, distractor rules, agent
workflow) and `content/VERIFICATION_LOG.md` for the verification record.
