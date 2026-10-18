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
| diff-review | content-author #ad83eff | math-verifier #a771f21 | 63/63 pass | FAIL (1 DISTRACTOR_ALSO_CORRECT by wording, 28 FORM_LEAK; 0 wrong answers) | 27/77 units (35%); 27 hits (chance 4.8), 19 surface-guessable | author fix pass: also-correct wording fixed, duplicate options replaced, decoy hubs (medoid 58%→27%, generators 80/80→0/80), 9 retags; 66/66 pass |
| area | content-author #af13937 | math-verifier #ae0b682 | 59/59 pass | FAIL (44 FORM_LEAK; 0 wrong answers; mpmath recheck of all 36 areas) | 35/98 units (36%); 33 hits (chance 6.7), 28 surface-guessable | author fix pass: 16 retags, wording (ar-f-025/035/008), length and ±twin tells, decoys in 23 of 28 units, generator rebalanced; 62/62 pass |
| volumes-disks | content-author #ae90be6 | math-verifier #afc5fc5 | 58/58 pass | FAIL (1 DISTRACTOR_ALSO_CORRECT — shell plan valid unless statement fixes the method; 20 FORM_LEAK; 0 wrong answers) | 31/86 units (36%); 30 hits (chance 5.6), 18 surface-guessable | author fix pass: statements fix the method (vd-s-04..09), R/r grids, well-formed setup distractors, consistent plan options, tells removed, retags (medoid 60→55 of 105 — residual); 61/61 pass |
| volumes-shells | content-author #a0cf95a | math-verifier #a2ea4fd | 60/60 pass | FAIL (64 FORM_LEAK in 4 patterns; 0 wrong answers; every volume cross-checked by a second method) | 33/94 units (35%); 31 hits (chance 6.2), 24 strong + 4 weak | `\;` render bug fixed by orchestrator; author fix pass: r/h grids replace swap twins (T1), decoy ×2 pairs (T3), length tells (T4), retags, whys; T2 and step-evaluation ×2 tells residual; 63/63 pass |
| arc-length | content-author #ae424e8 | math-verifier #a0fd2d3 | 59/59 pass | FAIL (1 DISTRACTOR_ALSO_CORRECT — x↔y relabel keeps the length; 4 FORM_LEAK + systemic; 0 wrong answers) | 33/94 units (35%); 32 hits (chance 5.9), 2 surface-guessable | author fix pass: also-correct relabel distractor replaced, statement no longer prints 2π, decoys, 13 retags, 3 whys; 62/62 pass |
| ibp | content-author #ad14a0f | math-verifier #a2b391f | 76/76 pass | FAIL (32 FORM_LEAK; 0 wrong answers; sympy/mpmath recheck) | 40/113 units (35%); 39 hits (chance 7.6), 29 surface-guessable | author fix pass: LIATE removed from ip-f-003, ip-s-01#4 reworded, u/dv balanced 2v2, generator decoys, 7 retags, 2 whys; 79/79 pass |
| trig-sub | content-author #aa4ab8b | math-verifier #af33f51 | 67/67 pass | FAIL (88 FORM_LEAK, 57 by inspection; 0 wrong answers; every antiderivative differentiated back) | 38/106 units (36%); 37 hits (chance ~7), 31 surface-guessable | `\;` render bug fixed by orchestrator; author fix pass: 4 retags, 3 whys, one decoy edit in each of the 31 blind-guessable units (ts-f-001–006 two-mistake grids kept as logged exception); 57 by-inspection units residual; 70/70 pass |
| trig-integrals | content-author #afdca4e | math-verifier #a5139d4 | 78/78 pass | FAIL (36 FORM_LEAK — 9 case-label prefixes, 1 length, 26 centre; 0 wrong answers; sympy recheck; self-referential checks verified by hand) | 39/110 units (35%); 39 hits (chance 7.5), 32 surface-guessable | author fix pass: case-label prefixes removed, twins for ti-s-08#0/10#1, compound distractors in 25 centre items, 8 retag groups, 3 whys; 81/81 pass |

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

### diff-review, area, volumes-disks, volumes-shells, arc-length, ibp, trig-sub, trig-integrals
Each verifier re-derived every answer, step result, final and check independently (several with a
sympy/mpmath cross-check), attacked every distractor, and ran the blind-option test on ≥35% of the
topic's units with a fresh seed. Reports: `qa/verification/<topic>.md`; blind artifacts:
`qa/blind/<topic>-<seed>.*`.

Outcome across all nine topics: **0 WRONG_ANSWER, 0 WRONG_CHECK, 0 SCOPE**. Three
DISTRACTOR_ALSO_CORRECT findings, all wording/statement issues rather than math, fixed:
- `dr-f-051`: "without the chain rule" was literally true of e^{2x} and (x³+1)^5 → prompt now asks
  which expression contains no composition; non-rewritable compositions as distractors.
- `vd-s-04#0`: the shell plan was a valid setup because the statement did not fix the method →
  statements for vd-s-04…09 now say "Use the disk/washer method".
- `al-s-07#0`: relabelling x↔y reflects the curve and preserves length → replaced by a genuinely
  wrong setup.
Everything else was FORM_LEAK (the star pattern, unique justification clauses, length, case-label
prefixes, ± or ×2 twins), WRONG_TAG, or EXPLANATION. The verifier-flagged blind-guessable units and
all retags/why fixes were applied by the topic's author in a fix pass and re-checked by the
automated suite (which guards the math of every edited unit). Systemic "centre" lists that the
verifiers did not judge surface-guessable remain as residual risk (see the policy section) and are
enumerated in each report's SYSTEMIC bullet; the diff-review pass shows the target is reachable
(medoid hits 58% → 27%).

Other fixes found during verification: five `result` lines used a single-backslash spacing command
inside a JS string (rendered as a bare semicolon) — fixed, and `tests/no-lone-backslash.test.ts`
now forbids lone backslashes in content; the LaTeX parser now ends a bare function argument before
an exponential (reported by the antiderivatives author); the integrator was made adaptive at
interior kinks and `indefinite(f, x)` keeps its variable free (found while validating the
reference examples).

## Residual risk and recommended follow-up
1. Apply the decoy-hub pattern to the residual "centre" units listed in each report's SYSTEMIC bullet
   (largest lists: trig-sub 57 by-inspection units, volumes-shells T2 setup integrals, volumes-disks
   23, area/ibp/trig-integrals ~20–35 each), then re-run a blind test with a new seed per topic.
2. Re-run the blind test on the rewritten units (the current blind results predate the fix passes).
3. Some `check` expressions restate the stored answer (e.g. ts-f-030, ti-f-057…061); they were
   verified by hand, but an independent formulation would let the automated suite guard them.

## Cards mode deck (`content/cards/deck.ts`) — session 2

| Deck | Author instance | Verifier instance | Automated checks | Verdict | Notes |
|------|-----------------|-------------------|------------------|---------|-------|
| 50 whiteboard flashcards | content-author #a5b4a1a | math-verifier #a5e3b31 | tests/cards.test.ts 54/54 | PASS (0 blocking) | report: `qa/verification/cards.md` |

- Flashcards are not multiple-choice: no distractors, no blind-option test. Verified instead: the
  deck is exactly the whiteboard list (50 cards in board order, fixed per-section counts, no LIATE),
  answers in the board's notation (an "also written as" line only on the tan antiderivative and the
  area formula), every checkable card re-derived by hand and by the verifier's own script over wide
  domains including negative x and every quadrant, every `check` confirmed to describe its card, and
  22 deliberately wrong answers confirmed to be rejected by the cards' own checks (including
  1/(x√(x²−1)) for the arcsec derivative, so negative x is really sampled).
- Orchestrator decisions: the washer card keeps the board's R_out/R_in (the course writes R/r); the
  tan antiderivative leads with ln|sec x| as on the board, with −ln|cos x| as the "also" line.
- Orchestrator follow-up on the verifier's optional note: the five antiderivative cards with
  absolute values (tan, cot, sec, csc, 1/x) now sample where the argument of |·| is negative
  (`domain` only; no answer changed; 54/54 still pass).
- Formula cards (area, disk, washer, shell, both arc-length forms, IBP) have `check: none` and were
  verified by hand against the course conventions.

## Session 3 — topics 10–14 (Lectures 8–12)

No lecture PDFs exist for these topics; the spec block in CLAUDE.md ("Spec for topics 10–14") is the
source of truth. Every content file below was written by one content-author instance and verified by
a different math-verifier instance that re-derived every answer by hand (and, where noted, with an
independent CAS/numeric sweep). Cards are not multiple choice, so no blind-option test applies to
Phase A; Flash and Step content (Phases B–C) carry the medoid rate from `scripts/medoid-scan.ts`.

### Spec corrections (orchestrator re-derived; recorded as resolved disagreements)

- *Series tests, integral-test example.* The session brief wrote the class example as
  "Σ 1/(√n ln n) defeats limit comparison → integral test with u = ln x". That series is settled by
  limit comparison with 1/n (L = lim √n/ln n = ∞ and Σ1/n diverges ⇒ diverges), and the substitution
  u = ln x turns its integral into ∫ e^{u/2}/u du, which has no elementary antiderivative. The
  standard example with exactly the described behaviour is Σ 1/(n ln n): L = 0 against the divergent
  1/n and L = ∞ against every convergent p-series (inconclusive both ways), while the integral test
  with u = ln x gives ∫₂^∞ dx/(x ln x) = lim ln(ln t) − ln(ln 2) = ∞ ⇒ diverges. CLAUDE.md and the
  briefs now use 1/(n ln n). (Raised by the series-tests card author; re-derived by the orchestrator.)
- *Series basics, "insufficient information".* The brief said to answer "insufficient information"
  whenever neither property applies. Convergent ± divergent is in fact always divergent (if
  Σ(aₙ + bₙ) converged, Σbₙ = Σ(aₙ + bₙ) − Σaₙ would converge); only divergent + divergent is
  undetermined. CLAUDE.md states this precisely. (Raised by the series-basics card author.)
- *Checker.* A "converges" claim on a positive-term series whose partial-sum increments decay like the
  harmonic series or slower (increment ratio over [5000, 10000] vs [1000, 5000] ≥ 0.42, where 1/n
  gives ln 2/ln 5 ≈ 0.431 and 1/n^{1.05} gives 0.403) is now rejected (`series-claimed-convergent`).
  Found by the series-basics author's mutation test (Σ1/n claimed convergent passed before).

### Phase A — Cards (`content/cards/<topic>.ts`)

| Deck | Cards | Author instance | Verifier instance | Automated checks | Verdict | Notes |
|------|-------|-----------------|-------------------|------------------|---------|-------|
| partial-fractions | 14 | content-author #a5c8a84 | math-verifier #a883334 | tests/cards.test.ts (all cards) | PASS WITH FIXES | card 08 wording → "equate the remaining coefficients" (spec wording); verifier re-derived every card by hand, with sympy (apart/integrate, symbolic n) and a 2000-point plain-JS sweep per card over wide domains (both signs of ax + b, k < 0, both sides of the pole); 40 mutations rejected, 7 equivalent forms accepted; 390 px render clean |
| improper | 14 | content-author #a5b3fde | math-verifier #a875474 | tests/cards.test.ts (all cards) | PASS WITH FIXES | cards 07/08: the two limits of a split integral now use different letters (s, t) so the allowed form looks unlike the forbidden single symmetric limit; verifier re-derived every card by hand and with sympy/mpmath, 10 claim mutations rejected (wrong value, missing split, flipped verdict), p-rule instances p = 1/2, 1, 3/2, 2, 3 checked; 390/360 px render clean. Card 14 (five-step procedure) added by the orchestrator afterwards and checked by the same verifier (see below) |
| series-tests | 14 | content-author #afef6ca | math-verifier #a6e40b4 | tests/cards.test.ts (all cards) | PASS WITH FIXES | card 09 `\small` → `\footnotesize` (327 px row overflowed the 324 px box at 390 px); card 10 `none` → `limit` check on L = lim aₙ/bₙ = 1 (rejects bₙ = 1/n³, 1/n, L = 2); card 13 step 1 reads "lim aₙ ≠ 0 or DNE ⇒ diverges" (spec wording); card 14 added (Σ 1/(n ln n): integral test with u = ln x diverges, limit comparison inconclusive both ways — see spec corrections). Verifier re-derived every card by hand and through the claim checker with negative controls; known limit: the series checks on cards 12 and 14 cannot tell the verdicts apart (ln n/n² vs 1/n^{3/2}; ln ln N growth), so those verdicts rest on the hand derivations (also re-derived by the orchestrator: ∫₂^∞ dx/(x ln x) = lim ln ln t = ∞; ln n/√n → 0 with Σ1/n^{3/2} convergent) |
| series-basics | 13 | content-author #a303bdd | math-verifier #a39ee0e | tests/cards.test.ts (all cards) | PASS WITH FIXES | card 05: hypothesis a ≠ 0 added to the front ("diverges if |r| ≥ 1" is false for a = 0); every card re-derived by hand (n/(n+1) − (n−1)/n = 1/(n(n+1)); sums 1, 3/2, 1; Sₙ = b₁ − bₙ₊₁), 10 check mutations rejected (wrong sums, wrong start index, 1/n "converges", wrong aₙ); 390 px widths measured (widest back 318/323 px). Card 13 (convergent ± divergent ⇒ divergent, the spec correction above) added by the orchestrator afterwards and checked by the same verifier (see below) |
| series-basics card 13 (orchestrator-added) | — | orchestrator | math-verifier #a39ee0e | tests/cards.test.ts | FIXED → ok | the back's argument covered only the + case; now shows both identities Σbₙ = Σ[(aₙ + bₙ) − aₙ] and Σ[aₙ − (aₙ − bₙ)] (difference rule only); back 297/323 px at 390 px |
| sequences | 20 | content-author #a2d7439 | math-verifier #ae379cc | tests/cards.test.ts (all cards) | PASS (0 fixes) | every theorem's hypotheses checked against the spec (and OpenStax §5.1 wording for ≤/≥ monotone); 2^{2n+1}/3ⁿ = 2(4/3)ⁿ confirmed exactly (BigInt, n ≤ 200); every limit claim mutation-tested (05: 0/dne/−∞/2/8/3; 07: 0/1/∞; 09: dne/−∞/1/0; 11: π/4/π/∞/1/−π/2; 12: 1/∞/e²/2.7 all rejected); widest back 299/324 px at 390 px |

Checker fixes prompted by the sequences verifier (orchestrator; tests added in `tests/claims.test.ts`):
the finite-limit branch sampled only even n, so "(−1)ⁿ → 1" passed — each scale is now sampled at n
and n + 1; the `dne` branch measured a window's spread against the global magnitude, so unbounded
oscillation such as (−1.0001)ⁿ or (−2)ⁿ was rejected — it is now measured against the window's own
magnitude and overflowing windows are skipped. The improper and sequences decks still pass unchanged.
| improper card 14 (orchestrator-added) | — | orchestrator | math-verifier #a875474 | tests/cards.test.ts | PASS WITH FIX | wording matches the spec's five steps in order; the back was 609 px wide and was rewritten as an `aligned` block that fits 324/324 px at 390 px (and 294/294 at 360 px) |

Phase A totals: 74 cards in five new sections (partial-fractions 14, improper 14, sequences 20, series-basics 13, series-tests 14); the 50-card whiteboard deck is unchanged. Full suite 1164 tests green, build green, merged to main.

### Phases B–C — Flash Drill and Step-Through (`content/flash/<topic>.ts`, `content/steps/<topic>.ts`)

Workflow (cost split): the orchestrator designed every item as a plan (`qa/plans/<topic>-{flash,steps}-plan.md`),
a Sonnet "typist" converted each plan into the content file and ran the mechanical test loop (never changing the
mathematics), the medoid heuristic flagged option lists that were re-centred by the mechanical decoy-hub rule
(`qa/briefs/hub-rewrite.md`), and an Opus `math-verifier` that had not written the plan re-derived every answer and
attacked every distractor (`qa/briefs/topic-verify.md`). The verifiers' mechanical findings were applied by typists
from the reports; judgment calls were re-derived by the orchestrator (listed under "resolved disagreements").
Medoid rates are from `scripts/medoid-scan.ts` (flash + generators seeds 1..5 + steps; both measures must be ≤ 30%,
enforced by `tests/medoid.test.ts`). The blind-option test samples ≥ 30% of the units; a hit counts as a leak only
when the guesser's stated reason is a surface feature (star centre, longest option, lone verdict, median value,
repeated value), and every such unit was rewritten around a decoy hub.

| Topic | Flash (static + generators) | Steps (problems / steps) | Verifier | Verdict | Medoid edit / bigram | Blind-option test | Notes |
|-------|-----------------------------|--------------------------|----------|---------|----------------------|-------------------|-------|
| partial-fractions | 35 + 3 | 9 / 36 | math-verifier (flash + steps, all answers re-derived; stopped before the final write-up) + orchestrator | PASS WITH FIXES | 4.7% / 11.2% | seed 31: 26 of 74 units, 15 hits (58%), 4 surface leaks (pf-f-008/016/021/030) + 7 inspection leaks rewritten; re-test seed 61 after the fixes: 26 units, 21 hits (81%) of which 5 surface (pf-s-03#1, pf-f-016, pf-f-025, pf-s-08#3, pf-f-032) → rewritten; the rest were standard-form recall (decomposition forms, factorings, discriminants), which the guesser solved from the options | every answer right; 3 distractors that were also correct replaced (pf-s-03#3, pf-s-04#0/#2: "x = tan θ" / "u = x² + 1 directly" are valid alternatives), 3 equal-function distractor pairs replaced (pf-s-01#3, pf-s-06#3, pf-s-09#2), systematic retags (long division on a proper fraction → `technique-wrong`; power rule on a first-power factor → `ln-misapplied`; needless completing-the-square → `technique-wrong`), whys made to produce their option |
| improper | 35 + 2 | 9 / 34 | math-verifier #a858fa1 | PASS WITH FIXES | 14.3% / 18.6% | seed 47 (drawn before reading the content): 25 of 71 units, 21 hits (84%), 19 by math (most options restate the integral); 2 structural (im-f-017/018, star centre) rewritten; length / "both must converge" tells on im-f-035/029/012, im-s-07#2/03#2 fixed | every answer, result, check and recap right; the "only positive option" tell (every distractor ≤ 0 for a positive integrand) fixed in im-f-014/015/016 and both generators; 6 whys gave a value other than their option (im-f-026/029/031, im-s-04#2, im-s-07#3 …) fixed; `im-split-mishandled` was used for "kept ∞ as a bound" (→ `im-plug-infinity`); justification clauses that appeared only on the correct option removed from 12 units; im-f-013/014/015 duplicated generator instances → bounds / k changed by the orchestrator (∫₂^∞ dx/x², ∫₂^∞ dx/x³, ∫₀^∞ e^{−x/3}) |
| sequences | 35 + 2 | 9 / 29 | math-verifier #a6c42b1 | SEQUENCES_ROW | | | |
| series-basics | 35 + 2 | 9 / 27 | math-verifier (flash + steps, all answers and checks re-derived; stopped before the blind test) + orchestrator | PASS WITH FIXES | 13.2% / 16.2% | seed 61 (after the fixes): 23 of 72 units, 10 hits (43%), 4 surface (sb-s-09#1 lone verdict, sb-f-010 longest, sb-s-06#1 longest, sb-f-013 median) → rewritten; 4 of the misses were star-centre guesses that were wrong (the hub rule working) | every answer right; 13 whys did not produce their option (values changed where needed: sb-f-002 → 2/3, sb-f-004 → 2, sb-f-012 and sb-s-02#2 1/6 → 2/9, sb-f-034 → 3 and 5/6); sb-f-021's "a rⁿ⁻¹ → 0" was also correct → "−1 < r ≤ 1" (`sb-sequence-vs-series`); unrealistic sb-s-01#1 / sb-s-09#0 distractors replaced; retags (sb-f-033 → `sb-split-divergent`, sb-s-04#0 → `st-divergence-test-skipped`, telescoping slips → `sb-telescoping-sum-wrong`, …); checks that restated the answer (sb-f-003, sb-f-020) now check the computation; "p-series" wording removed from topic 13 |
| series-tests | 37 + 3 | 9 / 28 | math-verifier (st-f-001–013) + math-verifier #a598fc2 (the rest, generators, steps) | PASS WITH FIXES | 10.0% / 15.3% | seed 53 (drawn before reading the content): 24 of 68 units, 23 hits (96%), 18 by applying the course rules to the options; 3 structural (st-s-08#0 only option showing work, st-f-029, st-g-p-series repeated p — same pattern fixed in st-f-019/021/022) → rewritten; st-f-005 (middle exponent) re-centred by the orchestrator | every answer right; prompts of st-f-026/027, st-g-lct-rational, st-s-06#1 now ask which argument *settles* the series (a true "L = ∞ against a convergent series: no conclusion" statement was arguably correct under "which conclusion is right?"); st-g-lct-rational's correct L was the most frequent value → boundary distractor uses the inverted L; st-f-010 used Σ(−1)ⁿ/n as its non-positive example → Σ cos n / n (no alternating series anywhere); st-f-011/012/016/017 options now follow from the slip their why names; st-s-05#2 and st-s-09#1 checks compared the answer with itself → now integrate the step's integrand to t; 17 retags (`st-sum-equals-integral` only for the integral's value, `st-lct-limit-wrong` / `st-p-rule-wrong` when the inference is valid but the number is wrong, dropped inner sign → `chain-rule-missing`) |

Resolved disagreements and orchestrator decisions (Phases B–C):
- *st-f-008 (integral-test hypotheses).* "Positive and decreasing with f → 0" is mathematically sufficient (and
  "continuous and decreasing with f → 0" forces f ≥ 0), so those distractors are wrong only against the test *as
  stated in class* (positive, continuous, decreasing). The prompt now says "as stated in class"; the whys say
  "dropped a stated hypothesis" rather than calling f → 0 irrelevant.
- *st-f-010 (non-positive terms).* The item used Σ(−1)ⁿ/n to show the positive-term hypothesis failing. No verdict
  was given and no alternating-series test appeared, but the series itself is the alternating harmonic series; it
  is replaced by Σ cos n / n (terms of both signs, not an alternating series), still with no verdict.
- *im-s-06#1 ("the left piece is the same by symmetry").* A strong student could defend this for a divergent
  interior singularity (one divergent piece is enough), so it stays a distractor only under the course's set-up,
  which requires both one-sided limits to be written. Kept, tagged `im-split-mishandled`.
- *st-s-05#3 ("so the sum is ∞").* The spec says a limit of ∞ means divergent, so "the sum is ∞" stays a distractor.
- *Partial-fraction forms.* Distractors of the shape (Ax + B)/(x + 1)² for a repeated linear factor are accepted as
  realistic (the "linear numerator over a repeated linear factor" slip), even though the form is not literally
  unusable.
- *"Which argument settles the series?" items (series-tests).* A student who knows the rules can often answer from
  the options alone because only one option is a valid inference; that is the skill the item drills, so it is not
  counted as a form leak (the medoid rate and decoy hubs still apply).
- *Duplicates.* Static improper items that coincided with generator instances were changed by the orchestrator
  rather than removed (the static count must stay ≥ 30).

