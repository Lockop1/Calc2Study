# Verification report: sequences (topic 12, prefix `sq`)

**VERDICT: PASS WITH FIXES.** No stored answer was wrong. 39 units were fixed (2 distractors that were also correct, 2 borderline also-correct distractors, 1 false explanation, 14 blind-guessable units, several form, tag and why defects). All required checks pass after the edits.

- **`content/flash/sequences.ts`: PASS WITH FIXES.** 35 static items + 2 generators. 21 static items and both generators fixed; 14 static items ok.
- **`content/steps/sequences.ts`: PASS WITH FIXES.** 9 problems, 29 steps, 9 finals. 16 steps fixed; 13 steps and all 9 finals ok.
- **Checks (all green after the edits):**
  - `npx tsc -p tsconfig.json --noEmit` (exit 0)
  - `npx vitest run tests/content.test.ts -t "sequences"` (47/47)
  - `npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts` (76/76)
  - `content-stats`: volume ok
- **Medoid (`npx tsx scripts/medoid-scan.ts sequences`, n = 74):**
  - edit: 17.6% before, **12.4%** after
  - bigram: 18.8% before, **13.2%** after

## Mathematics: every answer re-derived (all stored answers correct)
- **Rational limits.** sq-f-001 → 3, sq-f-002 → 2, sq-f-003 → 0, sq-f-018 → 3/2 (√(4n²+1) ~ 2n), sq-s-02 → 3, sq-s-06#3 → 1. The generator gives a/c, equal degrees, for all 8 rows.
- **e and log limits.** sq-f-004 and sq-s-04: (1+2/n)ⁿ = ((1+2/n)^{n/2})² → e². sq-s-04#2: L'Hôpital gives [(−2/x²)/(1+2/x)]/(−1/x²) = 2/(1+2/x) → 2. sq-f-013: ln(n^{1/n}) = ln n/n → 0, so the limit is 1.
- **L'Hôpital via the Underlying Function Theorem.**
  - sq-f-005 and sq-s-09: n sin(1/n) = sin x/x with x = 1/n → 1. The derivative quotient is [cos(1/x)(−1/x²)]/(−1/x²) = cos(1/x) → 1.
  - sq-f-015: ln n/√n gives (1/x)/(1/(2√x)) = 2/√x → 0.
  - sq-f-017: n²/eⁿ gives 2/eˣ → 0.
  - sq-s-03: ln n/n gives (1/x)/1 → 0.
- **Squeeze and the corollary.** sq-f-011: |cos n/n| ≤ 1/n, so the limit is 0. sq-f-016, sq-f-027 and sq-s-05: |(−1)ⁿ/n| = 1/n → 0. sq-f-026: 0 ≤ cos²n/n² ≤ 1/n².
- **Other limits.** sq-f-010: sin(nπ) = 0 for every n. sq-f-012: √(n+1) − √n = 1/(√(n+1)+√n) → 0. sq-s-07: √(n²+n) − n = 1/(√(1+1/n)+1) → 1/2. sq-f-006: arctan n → π/2. sq-f-034: ln n/ln n² = 1/2 exactly.
- **The {rⁿ} rule.**
  - sq-f-007: (−3/4)ⁿ → 0.
  - sq-f-008: 1.01ⁿ → ∞.
  - sq-f-009 and sq-s-08: (−1)ⁿ is bounded, not monotone, and diverges.
  - sq-f-014, sq-f-021 and sq-s-01: 2^{2n+1}/3ⁿ = 2(4/3)ⁿ → ∞.
  - sq-f-022: −1 < r ≤ 1.
  - sq-f-023: only (−0.9)ⁿ converges. (1.1)ⁿ and ln n are unbounded; (−1)ⁿ and (−1)ⁿn/(n+1) oscillate.
  - sq-f-033: 0, 1, ∞.
  - Geometric generator: correct in all 8 rows. Rows with |r| < 1 give 0, r = −1 gives DNE, and 6/5 and 3/2 give ∞.
- **Closed forms.** sq-f-019: 2·3^{n−1}. sq-f-020: 7 − 3(n−1) = 10 − 3n.
- **Theorems and laws.**
  - sq-f-024 and sq-s-03#0: Underlying Function Theorem (UFT).
  - sq-f-025: Continuous Function Theorem gives √4 = 2.
  - sq-f-029: bounded does not imply convergent.
  - sq-f-030: convergent implies bounded.
  - sq-f-031: the quotient law needs lim bₙ ≠ 0.
  - sq-f-032: 2·3 − (−1)² = 5.
- **Monotone Convergence Theorem (MCT).**
  - sq-f-028 and sq-s-06: aₙ₊₁ − aₙ = 1/((n+1)(n+2)) > 0 and 0 < aₙ < 1, so the limit is 1.
  - sq-f-035: (n+1)/n = 1 + 1/n is decreasing and bounded below by 1.

## Item table (ok = re-derived; distractors, tags and form checked)
| id | verdict |
|---|---|
| sq-f-001, -002, -003, -004, -007, -010, -017, -018, -022, -023, -027, -030 | ok |
| sq-f-019 | ok. The check is tautological (lhs = the answer); terms 2, 6, 18, 54 verified by hand |
| sq-f-005 | fixed: FORM_LEAK (longest, names two tools). Distractor reasons rebalanced. `sin 1` is now the "move n inside the sine" slip, retagged `algebra-error` |
| sq-f-006 | fixed: FORM_LEAK, blind unit 6. π/2 was the only positive π-value. The contrived −π was replaced by π/4 (arctan 1, `sq-term-vs-limit`). The set is now a symmetric ± pair; the hubs are the negative distractors |
| sq-f-008 | fixed: lone "Diverges" verdict (blind unit 14). "Converges to 1.01" became the right-verdict, invalid-reason twin "Diverges: it is increasing…" |
| sq-f-009 | fixed: lone "Diverges" verdict. "Converges to 1: \|aₙ\| → 1" became the twin "Diverges: \|aₙ\| = 1 does not tend to 0" (invalid reason, `sq-squeeze-misuse`) |
| sq-f-011, -013 | fixed: FORM_LEAK (correct option longest, 2.38× and 1.32×). Reasons rebalanced |
| sq-f-012 | fixed: the `1/2: L'Hôpital gives 1/(2√x)` distractor was contrived (L'Hôpital needs a quotient) and mis-tagged `arithmetic-error`. Replaced by "∞: the gap keeps growing" (`sq-dominant-term`) |
| sq-f-014 | fixed: FORM_LEAK (1.78×). Options are now parallel. The 2/3 distractor was retagged from `sq-wrong-form` to `exponent-arithmetic` |
| sq-f-015 | fixed: FORM_LEAK (blind unit 1: longest, only full chain). WHY: "inverted the quotient" did not produce 2√x. Rewritten around the hub √x/2 |
| sq-f-016 | fixed: FORM_LEAK (blind unit 8: longest, only one naming the corollary). Rebalanced |
| sq-f-020 | fixed: blind unit 3 was guessed structurally (textbook (n−1) pair plus the hub's sign). Rewritten around the hub 7 + 3(n−1) with options 7 − 3(n−1), 7 + 3n, 7 − 3(n+1) and 7 + 3(n+1) |
| sq-f-021 | fixed: blind unit 16 (the answer was the medoid). Rewritten around the hub (4/3)ⁿ. The why lines for (8/3)ⁿ and 4(4/3)ⁿ were corrected |
| sq-f-024 | fixed: FORM_LEAK (2.22×; only option stating a theorem). Every option now states its theorem |
| sq-f-025 | fixed: FORM_LEAK (1.57×; theorem name). Rebalanced |
| sq-f-026 | fixed: FORM_LEAK (blind unit 5). Three options now cite a theorem or law |
| sq-f-028 | fixed: blind unit 18 (union of two fragment options plus a how-to parenthetical). All options are now two-part arguments, with the hub "increasing and bounded below" |
| sq-f-029 | fixed: WRONG_TAG. The averaging rule was tagged `sq-squeeze-misuse`; now `sq-theorem-misattributed` |
| sq-f-031 | fixed: **DISTRACTOR_ALSO_CORRECT** (unit 4 lead confirmed). "It does not exist" was true: |aₙ/bₙ| → ∞, so a finite limit never exists. Its why ("may or may not exist") was false, and the explanation ("anything can happen") was false here. Fix: the twin "Nothing: … needs lim aₙ ≠ 0" (wrong hypothesis) replaces it; the explanation now states that |aₙ/bₙ| → ∞ and gives examples for ∞, −∞ and no limit. This also removes the "only hypothesis" tell |
| sq-f-032 | fixed: "−5: flipped the sign" was not a specific mistake. Replaced by 8 (bₙ² read as 2bₙ) |
| sq-f-033 | fixed: DISTRACTOR_ALSO_CORRECT risk. "0, 1, DNE": lim (3/2)ⁿ = ∞ counts as "does not exist" under the common convention. The answer was also the star centre (medoid 1.0/1.0). Rewritten around the hub "0, DNE, ∞" with "0, e, ∞" and two two-slip options |
| sq-f-034 | fixed: FORM_LEAK (the answer was the only fraction). The why lines for 2 and ln 2 had no realistic origin. Now 6 options, including 1/ln 2 (ln n² misread as ln 2·ln n); the hub is 1/ln 2 |
| sq-f-035 | fixed: FORM_LEAK (1.31×; theorem name). The "Not monotone: … just two terms" distractor was malformed; "converges to 0" was tagged `sq-dominant-term`. Rewritten: every option is a monotone + bound argument |
| sq-g-rational | fixed: FORM_LEAK. Rows 2, 4 and 6 had d = ±1, making a/c the only fraction among integers. d is now 3, −4, 3. All seeds were re-derived: options distinct, denominators never zero |
| sq-g-geometric | fixed: WHY. "Diverges: alternates" claimed a "negative ratio" for positive r; the why is now per case (`sq-rn-boundary` for r > 0). The two "Diverges" texts now have equal length |
| sq-s-01#0 | fixed: the L'Hôpital distractor's why said "allowed in principle … quicker". It never resolves: each round only multiplies by 2 ln 2/ln 3 |
| sq-s-01#1 | fixed: same as sq-f-021 (answer was the medoid) |
| sq-s-01#2 | fixed: lone "diverges" (unit 23). Parallel options with the twin "rⁿ oscillates: diverges" |
| sq-s-02#0 | fixed: blind unit 7 (how-to parenthetical, longest). Removed and rebalanced |
| sq-s-02#1 | fixed: "−1" (it is a₁) retagged from `sq-substitute-infinity` to `sq-term-vs-limit`. The domain [1,6] contained the poles at n = √5 (answer) and n = 5 (a distractor); now [6,12] |
| sq-s-03#0 | fixed: blind unit 11 (2.38×; only stated theorem). All options now state their theorem |
| sq-s-03#1 | fixed: FORM. The one text option ("differentiated again") was replaced by the latex (1/x)/x ("top only") |
| sq-s-04#0 | fixed: FORM_LEAK (1.45×). Rebalanced |
| sq-s-04#1 | fixed: **DISTRACTOR_ALSO_CORRECT**. x/(1/ln(1+2/x)) is a valid ∞/∞ rewrite (its why even said "the algebra is correct"). Replaced by the reciprocal (1/x)/ln(1+2/x); the 0/∞ option was given a form label for parity |
| sq-s-05#0 | fixed: blind unit 22 (1.87×; states the corollary). All options are now "Use …:" options |
| sq-s-06#0 | fixed: FORM_LEAK. Only two options carried a verdict, one of them the answer; all five are now "difference: verdict". The check was tautological; it now uses lhs (n+1)/(n+2) − n/(n+1) |
| sq-s-06#2 | fixed: blind unit 2 (union of fragments). "Converges to its upper bound 1 by the theorem" was borderline also-correct: under the sup form of the MCT the limit is the sup, which is 1. Rewritten with the twin "increasing and bounded below" |
| sq-s-08#1 | fixed: lone "No" (1.94×). The twin "No: it diverges, so it cannot be monotone" replaces the duplicate "Yes, decreasing" |
| sq-s-08#2 | fixed: lone "No" (1.59×). The twin "No: it is not monotone, so it cannot converge" was added |
| sq-s-09#0 | fixed: FORM_LEAK (2.16×). Balanced "form: move" options |
| sq-s-09#1 | fixed: FORM_LEAK (1.86×; only option with a simplification). Every option is now "quotient = simplification", with the hub the sign slip in d(1/x). The `log-derivative-wrong` option (d(1/x) = ln x) was replaced |
| sq-s-02#2, -03#2, -04#2, -04#3, -05#1, -05#2, -06#1, -06#3, -07#0, -07#1, -07#2, -08#0, -09#2; all 9 finals | ok |

## Blind-option test (seed 47, guesses pre-registered by the earlier instance before any content was read)
- **Sample:** 24 of 66 units (36%).
- **Result:** 20 of 24 hits (83%; chance ≈ 20%). Score file: `qa/blind/sequences-47.guesses.json`.
- **Guessable, pure surface reason, rewritten:**
  - unit 3 (sq-f-020)
  - unit 6 (sq-f-006)
  - unit 7 (sq-s-02#0)
  - unit 16 (sq-f-021)
  - unit 18 (sq-f-028)
- **Guessable, surface + math (the surface cue alone suffices), rewritten:**
  - unit 1 (sq-f-015)
  - unit 2 (sq-s-06#2)
  - unit 4 (sq-f-031)
  - unit 5 (sq-f-026)
  - unit 8 (sq-f-016)
  - unit 11 (sq-s-03#0)
  - unit 14 (sq-f-008)
  - unit 15 (sq-f-005)
  - unit 22 (sq-s-05#0)
- **Rewritten anyway:** unit 23 (sq-s-01#2, lone verdict) was guessed by math.
- **Math hits, not guessable:** unit 10 (sq-s-06#1), unit 12 (sq-s-05#2), unit 13 (sq-f-027), unit 20 (sq-s-07#0), unit 24 (sq-s-08#0).
- **Misses:** units 9, 17, 19, 21.
- **Same tells fixed outside the sample:** lone verdicts in sq-f-009, sq-s-08#1 and sq-s-08#2; length tells in sq-f-011, -013, -014, -024, -025, -035, sq-s-04#0 and sq-s-09#0/#1; the only-fraction tell in sq-f-034 and the rational generator.

## Scope
Clean. The files contain no ratio test, root test, alternating series, absolute convergence or series-test content. "Alternating" only describes the sign pattern of a sequence.

## Residual doubts for the orchestrator
1. **Also-correct calls to re-derive:** sq-f-031 ("does not exist" vs ±∞), sq-f-033 (DNE for (3/2)ⁿ), sq-s-06#2 (sup form of the MCT), sq-s-04#1 (valid ∞/∞ rewrite). All four were fixed regardless.
2. **Residual medoid hits** (not judged surface-guessable): sq-s-05#2 (1.0/1.0), sq-s-07#1 (1.0/1.0), sq-s-07#2 (1.0/0.5), sq-s-02#1 (1.0/0), sq-f-026 (1.0/0), sq-f-027 (0/1.0), sq-s-01#0 (0/1.0).
3. **Generic why lines left as MINOR:** sq-s-03#2 (−1, 1/2), sq-s-06#3 (2, −1), sq-s-07#2 (1/4), sq-s-05#1 and sq-s-09#2 (e, π/2), and the sign-slip compound in sq-f-006 (−π/4).
4. **The 16 rewritten units should get a fresh blind re-test** by an instance that has not seen the answers. I could not do this without bias.
5. **Content repeated across modes:**
   - sq-g-rational:1 = sq-f-001 = sq-s-02
   - sq-f-014/-021 = sq-s-01
   - sq-f-024 = sq-s-03#0
   - sq-f-005 = sq-s-09
   - sq-f-016/-027 = sq-s-05
   - sq-f-028 = sq-s-06

## Tag misuse patterns
- `sq-dominant-term` was used for slips that are not about growth rates (sq-f-015, -031, -035).
- `sq-squeeze-misuse` was used for an "averaging" rule (sq-f-029).
- `sq-substitute-infinity` was used for a₁ (sq-s-02#1).
- `sq-wrong-form` was used for the 2^{2n} → 2ⁿ slip (sq-f-014).
- `log-derivative-wrong` was used for d(1/x) = ln x (sq-s-09#1).
- `arithmetic-error` was used for L'Hôpital applied to ∞ − ∞ (sq-f-012).

All six are fixed. `sq-theorem-misattributed` is used broadly as the "wrong theorem or hypothesis" tag, which is acceptable under its description.

## Certified (re-derived; after fixes)
Every sq-f-001…035 item, sq-g-rational and sq-g-geometric (seeds 1–8), and every step and final of sq-s-01…09.
