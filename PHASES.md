# PHASES.md — progress tracker

Legend: ☐ not started · ◐ in progress · ☑ done · ✗ blocked

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Scaffold + project docs (Vite/React/TS, KaTeX, vitest, agents, CLAUDE.md, PHASES.md) | ☑ | Subagent defs in `.claude/agents/` with `model: claude-opus-5-5`, `effort: max` |
| 2 | Content schema + mistake taxonomy | ☑ | `content/types.ts`, `content/mistakes.ts` (100+ tags), `content/topics.ts` |
| 3 | Automated content checks | ☑ | `checker/` (mathjs env, adaptive tanh-sinh, finite differences, LaTeX→mathjs parser, validator), `tests/content*.test.ts`, negative tests, KaTeX render test |
| 4 | Content authoring (9 topics, parallel content-author agents) | ☑ | 485 flash + 16 generators, 89 step problems / 398 steps; all minimums met; suite green |
| 5 | Content verification (math-verifier per file, blind-option test, VERIFICATION_LOG.md) | ☑ | 9 independent verifiers: 0 wrong answers; 3 also-correct wording issues fixed; form-leak fix passes applied per topic; residuals logged |
| 6 | Flash Drill mode | ☑ | src/screens/DrillScreen.tsx + shared question components |
| 7 | Step-Through mode | ☑ | src/screens/StepThroughScreen.tsx |
| 8 | Topic picker, Review mode, progress, settings | ☑ | weighted review deck, retire after 3 correct, storage in try/catch |
| 9 | PWA/offline + mobile QA | ☑ | qa/REPORT.md: 382/384 checks pass at 390×844 incl. offline, storage-unavailable, dark mode; reset double-tap fixed; one minor layout note open |

| 10 | Cards mode (flashcards of the whiteboard formulas; exempt from the 5-option rule) | ☑ | 50 cards in 9 sections, math-verifier PASS; CardsScreen with flip/grade/requeue/summary/filters/reset; 962 tests, Playwright 56/56 at 390×844 incl. offline |
| 11 | Session 3, Phase A — Cards for topics 10–14 (partial fractions, improper integrals, sequences, series basics, series tests) | ◐ | Infra: new card sections, per-topic card files, claim check kinds (`checker/claims.ts`), mistake tags, Home subtitle "MAC 2312"; 5 authors → verifiers → merge to main |
| 12 | Session 3, Phase B — Flash Drill for topics 10–14 (≥40 items each, decoy-hub, medoid ≤30%) | ☐ | topics in `content/topics.ts`, `scripts/medoid-scan.ts` + `tests/medoid.test.ts`; 5 authors → verifiers → merge to main |
| 13 | Session 3, Phase C — Step-Through for topics 10–14 (≥8 problems each) | ☐ | professor's step order; 5 authors → verifiers → `hasStepMinimum` on → merge to main |

## Log

- Task 1–2 done by the orchestrator: scaffold, agents, schema, taxonomy, topics, sample content, icons.
- Task 3: numeric core + validator written; LaTeX→mathjs parser delegated to a subagent.
- Task 3: parser landed; sample content passes end-to-end; tests/checker-negative.test.ts proves each check catches its error class.
- Task 4: nine content-author agents launched with self-contained briefs (lecture text + guided-note scans + distractor rules).
- Tasks 6–8 done (ui-builder): 13 test files / 110 tests; Playwright smoke 160/160 at 390×844 incl. offline reload.
- Task 4 done: all 9 topics authored after a rate-limit interruption and resume; content-stats table in CLAUDE.md commands.
- Task 5/9 in progress: 9 math-verifiers + qa-tester running.
- Task 5 done: all nine topics verified (reports in qa/verification/), fixes applied and committed per topic, VERIFICATION_LOG.md finalized.
- Deploy: user added .github/workflows/deploy.yml (GitHub Pages on push to main); build verified to work under a sub-path.
- Task 9 done: QA report compiled from the tester's results (container restart interrupted the agent); reset-confirm debounce added; final build verified.
- Session 2, Task 10 (Cards): `Card` type added to content/types.ts, deck stub + `tests/cards.test.ts` written by the orchestrator; content-author writing the 50-card deck; ui-builder building CardsScreen; verifier to follow.
- Task 10 done: deck verified (qa/verification/cards.md), Cards UI built and smoke-tested (qa/cards-smoke.mjs), suite 27 files / 962 tests, build green.
- Cards polish: 200 ms edge-on flip animation (face and colour swap while the card is edge-on; instant under reduced motion), answer side tinted with an accent border and an “Answer” tag in both themes; verified in Chromium at 390×844 (qa/screenshots/cards-flip-*.png).
- Session 3 (topics 10–14, Lectures 8–12; spec in CLAUDE.md is the source of truth — no PDFs). Phase A infra done by the orchestrator: `CardSection`/`CardCategory` extended, `content/cards/<topic>.ts` per topic concatenated in `deck.ts`, `tests/cards.test.ts` keeps the exact whiteboard counts and adds minimums for the new sections; check kinds `improper-integral` / `limit` / `series` implemented in `checker/claims.ts` with `tests/claims.test.ts` (90 cases) and `tests/claim-items.test.ts`; 60 new mistake tags (`pf-`, `im-`, `sq-`, `sb-`, `st-`); `scripts/medoid-scan.ts` + `tests/medoid.test.ts` (≤30% for topics 10–14); Home subtitle → "MAC 2312". Five card authors launched in parallel.
