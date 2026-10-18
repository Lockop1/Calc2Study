# Verification report: sequences (topic 12): PARTIAL, stopped early at the coordinator's request

**VERDICT: PARTIAL (not verified).** No PASS or FAIL can be given. Neither content file was read or re-derived before the stop.

## What was done
- I read the brief (`qa/briefs/topic-verify.md`), `CLAUDE.md` (spec block for topics 10–14), `content/types.ts`, `content/mistakes.ts` (all 20 tags the sequences files use resolve to real ids), `checker/claims.ts`, the header of `scripts/medoid-scan.ts`, and `content/VERIFICATION_LOG.md`.
- I generated a blind-option sample BEFORE opening any content file: `npx tsx scripts/blind-sample.ts sequences 47` gave 24 of 66 units (36%).
  - Artifacts: `qa/blind/sequences-47.sample.md`, `qa/blind/sequences-47.guesses.json` (template, NOT filled in) and `qa/blind/sequences-47.key.json` (NOT opened).
  - Guesses were made from the options alone and are recorded below so they can be scored without bias. They have NOT been scored.

## Fixes made
None. No content file or other file was edited, apart from this report.

## Issues found
None confirmed. These are leads only. They come from the option lists alone, without the question, the id or the key, and must be checked against the key and the content.
- **Possible FORM_LEAK, "only complete or valid justification, longest, names the theorem":** units 1, 5, 7, 8, 11, 15, 18, 22.
  - Unit 7 and unit 18 each have a how-to parenthetical on one option only.
- **Possible FORM_LEAK, "union of two fragment distractors"** (for example "increasing AND bounded" next to "increasing" and next to "bounded"): units 2 and 18. Unit 18 partly defuses this with a "decreasing and bounded below" decoy.
- **Possible FORM_LEAK, lone verdict:** units 14 and 23. The one "Diverges" option sits among several "Converges" options. Rule 7 asks for a "right verdict, invalid reason" twin.
- **Possible FORM_LEAK, other surface features:** unit 9 is the only fraction among integers. In unit 16, `2(4/3)^n` is the hub and is probably the answer (if the prompt is $2^{2n+1}/3^n$).
- **Possible DISTRACTOR_ALSO_CORRECT, unit 4.** The options suggest $a_n \to 2$ and $b_n \to 0$. The answer is probably "Nothing: the quotient law needs $\lim b_n \ne 0$". But the distractor "It does not exist" may be literally true, because $|a_n/b_n| \to \infty$, so no finite limit exists. Whether it is depends on the prompt wording (does it ask what the law says, or what the limit is?).

## Pre-registered blind guesses (seed 47, unscored)
| unit | guess | reason | basis |
|---|---|---|---|
| 1 | 3 | longest, only full L'Hôpital chain; $\ln x/\sqrt x \to 0$ | surface + math |
| 2 | 1 | union of fragments 2 and 4; Monotone Convergence Theorem | surface + math |
| 3 | 1 | only options 1–2 have the $(n-1)$ form; picked the one with the hub's sign | surface |
| 4 | 5 | only option citing the law's hypothesis | surface + math |
| 5 | 4 | longest, only one naming the Squeeze Theorem | surface + math |
| 6 | 4 | decoy hub around $-\pi/2$; $\pi/2$ is the arctan limit | surface |
| 7 | 3 | longest, only one with a how-to parenthetical | surface |
| 8 | 2 | only valid reason, names the corollary, longest | surface + math |
| 9 | 3 | only fraction, combines the 5 and 2 seen in other options | surface |
| 10 | 4 | $0 < n/(n+1) < 1$ | math |
| 11 | 1 | far the longest, only one stating a theorem | surface + math |
| 12 | 3 | Squeeze corollary | math |
| 13 | 4 | Squeeze corollary (also the most specific option) | math |
| 14 | 2 | lone "Diverges"; $1.01^n \to \infty$ | surface + math |
| 15 | 5 | longest, names two tools; $n\sin(1/n) \to 1$ | surface + math |
| 16 | 2 | medoid (hub) | surface |
| 17 | 3 | pure guess: avoided hub 2, took its reciprocal mutation | surface |
| 18 | 5 | longest, how-to parenthetical, union of 2 and 3 | surface |
| 19 | 2 | $e$ is the limit-to-know constant; 1 looks like the $1^\infty$ trap | surface |
| 20 | 4 | conjugate for $\infty - \infty$ (also longest) | math |
| 21 | 4 | pure guess: avoided hub 5 | surface |
| 22 | 4 | longest, states the corollary | surface + math |
| 23 | 4 | $(4/3)^n \to \infty$ (also the lone "diverges") | math |
| 24 | 4 | $|(-1)^n| = 1$ | math |

## Remaining (unchecked: everything below still needs a non-author verifier)
1. `content/flash/sequences.ts`:
   - re-derive all 35 static items and both generators at seeds 1..8;
   - audit the distractors, including the compound "two slips" distractors (still wrong, plausible and distinct);
   - audit tags, `why` lines and form parity;
   - check that every "right value, invalid reason" distractor really has an invalid reason and that each correct option's reason is valid;
   - check the `check` blocks and domains.
2. `content/steps/sequences.ts`: all 9 problems. Check step order against the spec, every `result`, step checks, finals, `expr` and recaps, and 3–7 steps per problem.
3. Scope sweep (no ratio test, root test, alternating series or absolute convergence).
4. Fill `qa/blind/sequences-47.guesses.json` with the guesses above, score it with `npx tsx scripts/blind-score.ts qa/blind/sequences-47.guesses.json`, map units to ids from the key, and confirm or clear the leads above.
5. `npx tsx scripts/medoid-scan.ts sequences --verbose` (both rates must be ≤ 30%).
6. `npx tsc -p tsconfig.json --noEmit`, `npx vitest run tests/content.test.ts -t "sequences"`, and `npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts`.

## Certified items
None.
