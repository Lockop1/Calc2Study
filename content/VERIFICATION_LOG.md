# Content verification log

Every content file must be verified by a `math-verifier` instance that did not author it before it
merges. This log records, per topic: the author and verifier instances, the automated-check result,
the verifier's verdict, the blind-option test, the fixes applied by the orchestrator, and every
math disagreement resolved by the orchestrator. Full verifier reports are in `qa/verification/`.

Process facts that apply to every topic:
- Each topic was written by one `content-author` agent instance and verified by a fresh
  `math-verifier` agent instance (different instances, different context; verifiers never edit
  content). The orchestrator (Claude Fable 5.1) applied every fix and re-ran the automated checks.
- Automated checks (`npm test`): schema, ≥5 options, uniqueness, mistake tags + why on every
  distractor, numeric correctness (finite differences / adaptive tanh-sinh quadrature at ≥6 random
  points), numeric distinctness of every distractor (antiderivatives compared through their
  derivative, so "differs by a constant" is caught), LaTeX↔expr agreement (LaTeX parsed to mathjs and
  compared numerically), KaTeX renderability of every LaTeX string, generator determinism (seeds 1–20),
  minimum counts.
- Blind-option test: `scripts/blind-sample.ts <topic> <seed>` samples ≥35% of the topic's units
  (flash items, one generator instance, every step) and prints options only; the verifier guesses,
  then `scripts/blind-score.ts` scores. Solving an item from the options by doing the math is allowed
  and is not a leak; an item counts as GUESSABLE only when the hit came from a surface feature.

## Status table

| Topic | Author instance | Verifier instance | Automated checks | Verdict (as filed) | Blind test | After fixes |
|-------|-----------------|-------------------|------------------|--------------------|------------|-------------|
| antiderivatives | content-author #ac92cab | math-verifier #a1d6959 | 79/79 pass | FAIL (13 FORM_LEAK; 0 wrong answers) | 43/121 units (36%); 42 hits (chance 8.2), 3 surface-guessable | 13 flagged units rewritten, 8 retags; 82/82 pass |
| diff-review | content-author #ad83eff | math-verifier #a771f21 | 63/63 pass | FAIL (1 DISTRACTOR_ALSO_CORRECT by wording, 28 FORM_LEAK; 0 wrong answers) | 27/77 units (35%); 27 hits (chance 4.8), 19 surface-guessable | fix pass by author (see per-topic report) |
| area | content-author #af13937 | math-verifier #ae0b682 | 59/59 pass | FAIL (44 FORM_LEAK; 0 wrong answers; mpmath recheck of all 36 areas) | 35/98 units (36%); 33 hits (chance 6.7), 28 surface-guessable | retags + wording; systemic list logged as residual |
| volumes-disks | content-author #ae90be6 | math-verifier #afc5fc5 | 58/58 pass | FAIL (1 DISTRACTOR_ALSO_CORRECT — shell plan valid unless statement fixes the method; 20 FORM_LEAK; 0 wrong answers) | 31/86 units (36%); 30 hits (chance 5.6), 18 surface-guessable | fix pass by author (statement now fixes the method) |
| volumes-shells | content-author #a0cf95a | math-verifier #a2ea4fd | 60/60 pass | FAIL (64 FORM_LEAK in 4 patterns; 0 wrong answers; every volume cross-checked by a second method) | 33/94 units (35%); 31 hits (chance 6.2), 24 strong + 4 weak | `\;` render bug fixed by orchestrator; patterns logged as residual |
| arc-length | content-author #ae424e8 | math-verifier #a0fd2d3 | 59/59 pass | FAIL (1 DISTRACTOR_ALSO_CORRECT — x↔y relabel keeps the length; 4 FORM_LEAK + systemic; 0 wrong answers) | 33/94 units (35%); 32 hits (chance 5.9), 2 surface-guessable | fix pass by author |
| ibp | content-author #ad14a0f | math-verifier #a2b391f | 76/76 pass | FAIL (32 FORM_LEAK; 0 wrong answers; sympy/mpmath recheck) | 40/113 units (35%); 39 hits (chance 7.6), 29 surface-guessable | retags + prompt fixes; systemic list logged as residual |
| trig-sub | content-author #aa4ab8b | math-verifier #af33f51 | 67/67 pass | FAIL (88 FORM_LEAK, 57 by inspection; 0 wrong answers; every antiderivative differentiated back) | 38/106 units (36%); 37 hits (chance ~7), 31 surface-guessable | `\;` render bug fixed by orchestrator; retags; systemic list logged as residual |
| trig-integrals | content-author #afdca4e | math-verifier #a5139d4 | 78/78 pass | FAIL (36 FORM_LEAK — 9 case-label prefixes, 1 length, 26 centre; 0 wrong answers; sympy recheck; self-referential checks verified by hand) | 39/110 units (35%); 39 hits (chance 7.5), 32 surface-guessable | fix pass by author; systemic list logged as residual |

## Resolved disagreements

- **None on mathematics so far.** Every verifier finding to date agreed with the stored answers; the
  orchestrator re-derived the disputed-looking items the authors had flagged (ad-f-009 sec⁻¹x for
  x > 1; ad-f-039 sin²x as the antiderivative of sin 2x; ad-s-11 with upper limit √(π/2) giving ¼)
  and confirmed them.

## Policy decision: the "star pattern" (orchestrator)

The antiderivatives verifier ran an answer-blind "medoid" heuristic (pick the option with the
smallest total edit distance to the others). It picked the stored answer in 61% of units (chance
19%). Cause: the brief's rule that every distractor encodes exactly ONE realistic mistake makes each
distractor one edit from the correct answer, so the correct answer is the hub of a star. This is
inherent to single-mistake distractors and affects every topic.

Decision: (1) every unit a verifier flags as surface-guessable is rewritten before merge (done for
antiderivatives, see below); (2) the accepted mitigation is a *decoy hub*: at least one distractor
pair that shares a feature with each other but not with the correct answer (a compound-mistake
distractor next to a single-mistake one), balanced signs/magnitudes in generators, and no extra
"how-to" clause or justification on the correct option; (3) the systemic list of medoid-hit units
that the verifier did not judge surface-guessable is recorded as known residual risk rather than
rewritten wholesale, because each of those units still requires the question to be answered by a
student who does not run an edit-distance heuristic. A future content pass should apply (2) to those
units topic by topic.

## Per-topic reports

### antiderivatives (`content/flash/antiderivatives.ts`, `content/steps/antiderivatives.ts`)
- Verifier re-derived all 62 flash items, 3 generators (seeds 1–20) and 56 steps + 13 finals
  independently (mpmath cross-check of 28 definite values and 103 antiderivative units).
  Result: every stored answer and check correct; no distractor also correct; no scope issues.
- Blocking findings (all FORM_LEAK) and fixes applied by the orchestrator:
  - `ad-g-trig-kx`: correct sign was the majority in 20/20 seeds → added a sixth, opposite-sign
    distractor in both branches (signs now 3/3; each magnitude appears with both signs).
  - `ad-g-recip-power`: medoid hit 20/20 → replaced the ln distractor with a positive-sign
    coefficient variant and made the lowered-exponent distractor positive (signs 3/3, decoy hub).
  - `ad-f-019`: ln-family majority → leftover-x distractor replaced by a power-family distractor.
  - `ad-f-046`: ±12 the only sign pair → now six options with ± pairs for every magnitude.
  - `ad-f-041`, `ad-f-052`: correct option was the longest / carried a justification → shortened.
  - `ad-f-043`: interval/integrand convergence → the 1/x² distractor now shares the [−3, 0] interval.
  - `ad-f-047`: per-coordinate majority → replaced [0, 0] with [2, 0] and added [−2, 1].
  - `ad-f-053`: per-feature majority → `2(F(8) − F(2))` replaced by `F(4) − F(1)`.
  - `ad-s-06#0`, `ad-s-09#0`, `ad-s-10#0`: correct option was the only one with a how-to clause →
    clauses removed (they remain in the revealed `result`); the 1 − 16x² decoy replaced by 16x².
- Non-blocking fixes applied: retags `power-rule-int-exponent` (ad-f-019, ad-f-028, ad-s-02#3, with
  corrected why), `exp-base-log-missing` (ad-f-004, ad-f-036, ad-f-062), `inverse-trig-value-wrong`
  (ad-f-031). Accepted as-is with the verifier's reasoning: ad-s-08#2 (cross-route ±2π² pair),
  ad-s-03#3, ad-s-13 (improper at 0 but it is the lecture's own problem; converges).
- Blind test (seed 11): 43 units, 42 hits (the verifier solved most from the options by doing the
  math), 3 surface-guessable (ad-g-trig-kx:1, ad-f-019, ad-f-046) — all rewritten.
