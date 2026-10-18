# Verification report: topic 11, improper (`im`)

**VERDICT: PASS WITH FIXES.** No wrong answers. I edited 19 flash units and 18 steps for FORM_LEAK, WRONG_TAG, and EXPLANATION / distractor-value mismatches. No unit needed a WRONG_ANSWER or DISTRACTOR_ALSO_CORRECT fix.
- `content/flash/improper.ts`: **PASS WITH FIXES**. 35 static items and 2 generators (seeds 1–8 checked by hand; 1–20 by the suite). All stored answers are correct. Edited: 17 static items and both generators.
- `content/steps/improper.ts`: **PASS WITH FIXES**. 9 problems, 34 steps and 9 finals. All answers, results, checks and recaps are correct. Edited: 18 steps; no final changed.

Verifier: math-verifier, not the author. I re-derived every answer by hand before reading the stored one. Every edit was made with the Edit tool, in the two improper files only.

## Checks (all green after the edits)
- `npx tsc -p tsconfig.json --noEmit`: exit 0
- `npx vitest run tests/content.test.ts -t "improper"`: 47/47
- `npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts`: 76/76
- `npx tsx scripts/medoid-scan.ts improper`: n = 79. **Edit 13.7%, bigram 18.2%.** Before the edits it was 20.7% / 22.3%. Both are under the 30% limit.

## Blind-option test (sample from the stopped verifier, seed 47, guesses made before the content was read)
`npx tsx scripts/blind-score.ts qa/blind/improper-47.guesses.json`: 25 of 71 units sampled (35%). **21/25 hits (84%); chance is about 20%.** Most options in this topic restate the integral, so 19 of the hits were worked out by math from the options.

| unit | id | hit | reason given | action |
|---|---|---|---|---|
| 8 | im-f-017 | HIT | **structural** (star centre 2: ×2, ÷2, sign) | rewritten around a decoy hub |
| 24 | im-f-018 | HIT | **structural** (star centre 4) | rewritten around a decoy hub |
| 1 | im-f-035 | HIT | math, plus a length tell | rewritten (parallel "Type …: write …" options) |
| 2 | im-s-07#2 | HIT | math, plus a star-centre tell | decoy hub added (medoid 1.0 → 0) |
| 12 | im-s-03#2 | HIT | math, plus a star-centre tell | rewritten around the hub −2√t |
| 19 | im-f-029 | HIT | math, plus a length tell | rewritten (every option carries a limit) |
| 20 | im-s-07#3 | HIT | math, plus a star-centre tell | wrong distractor value fixed (medoid now 0) |
| 9 | im-f-012 | HIT | math (mild tell: "both must converge") | clause moved to the explanation |
| 22 | im-f-002 | HIT | math (mild tell: longest option) | not rewritten (see residual 4) |
| 25 | im-f-032 | HIT | math (arctan t → π/2 is a limit to know) | not rewritten |
| 3, 4, 6, 10, 11, 13, 14, 15, 17, 21, 23 | im-s-07#0, im-s-01#0, im-s-08#2, im-f-028, im-s-02#0, im-f-008, im-s-01#1, im-s-04#1, im-f-030, im-f-010, im-s-04#0 | HIT | math | none |
| 5, 7, 16, 18 | im-f-034, im-g-p:1, im-f-014, im-g-exp:1 | miss | surface guess | none needed. Note: 014 and both generators had a sign tell, fixed below |

Guessable units (hit and structural reason): **im-f-017 and im-f-018**. Both have been rewritten.

## Item table
Every id not marked as fixed is **ok**: the answer was re-derived, every distractor is genuinely wrong, and the tag and check fit.

### Flash
| id | verdict |
|---|---|
| im-f-001, 003, 004, 008, 009, 010, 013, 019, 020, 021, 022, 024, 025, 030, 032 | ok |
| im-f-002 | ok (mild length tell; residual 4) |
| im-f-005 | fixed, FORM_LEAK: the correct option was the only one stating the blow-up. Now "Type II at x = π/2", matching "Type II at x = 0" |
| im-f-006 | fixed, FORM_LEAK: the correct option was the longest and the only how-to. Now "Type II at the interior point x = 1" against "… at the endpoint x = 0 / x = 2" |
| im-f-007 | fixed, WRONG_TAG: lim_{t→∞}∫_t^∞ was tagged im-split-mishandled (no split is involved). Now im-plug-infinity |
| im-f-011 | fixed, FORM_LEAK: the correct option had a "both must converge" justification. Now written as two separate limits, lim_{s→−∞}∫_s^0 + lim_{t→∞}∫_0^t. Added a believable distractor (split at 0 but one shared t: a symmetric limit in disguise). Value: halves −1/2 and +1/2, total 0 ✓ |
| im-f-012 | fixed, FORM_LEAK: "both must converge" moved into the explanation |
| im-f-014 | fixed, FORM_LEAK: the correct 1/2 was the only positive option (positive integrand). Added 1/3 (divided by the old exponent −3). Retagged −1/3 from arithmetic-error to power-rule-int-coefficient and rewrote its muddled why. ∫₁^∞x⁻³ = [−1/(2x²)] → 1/2 ✓ |
| im-f-015 | fixed, FORM_LEAK (only positive option): added 2 (multiplied by k). Value 1/2 ✓ |
| im-f-016 | fixed, FORM_LEAK (only positive option): added 1/4. Value: u = x², −½e^{−t²} + ½ → 1/2 ✓ |
| im-f-017 | fixed, blind-guessable: "4" ("doubled twice", vague) replaced by −1 (no division by ½, then swapped). Retagged "1" from power-rule-int-exponent to power-rule-int-coefficient (the exponent *was* raised). Hub is now −2/−1. Value 2 − 2√t → 2 ✓ |
| im-f-018 | fixed, blind-guessable: "8" replaced by −2 (dropped the 2 and the inner sign). Retagged "2" from du-constant-wrong to power-rule-int-coefficient. Value −2√(4−t) + 4 → 4 ✓ |
| im-f-023 | fixed, FORM_LEAK: dropped the extra "(here p = ½ ≤ 1)" clause from the correct option |
| im-f-026 | fixed, EXPLANATION: the distractor "Converges to ln(ln 2)" did not match its why (dropping ln(ln t) gives **−**ln(ln 2)). Now −ln(ln 2). Also dropped the "u = ln x gives" how-to from the correct option |
| im-f-027 | fixed, FORM_LEAK: dropped "already" |
| im-f-028 | ok (MINOR: "not integrable" tagged im-wrong-type is a loose fit) |
| im-f-029 | fixed. "Converges to e" (why: e^{−t} → e, which would give 1 − e, not e) and "Diverges: e^{−x} never reaches 0" (im-wrong-type, a misfit) are replaced. The correct option was the only one with a displayed limit. Every option now carries a limit: −1 via lim(e^{−t} − 1) (sign-error), 0 via e^{−t} → 1, diverges via e^{t} (exp-antiderivative-wrong), plus the existing e^{−∞} = 0 |
| im-f-031 | fixed, EXPLANATION/WRONG_TAG: the why for 1/p ("divided by p instead of by 1 − p") yields −1/p. Now "divided by the old exponent −p instead of 1 − p", which gives 1/p ✓, tagged power-rule-int-coefficient |
| im-f-033 | fixed, FORM_LEAK: the correct option had the only how-to. Now "0: by L'Hôpital on ln t/(1/t)" against "−1: by L'Hôpital on …", with the specific slip (1/t)/(−1/t²) → −1 instead of −t. Re-derived: lim t ln t = lim (−t) = 0 ✓ |
| im-f-034 | ok (MINOR tags: "−3" sign-error, "−1/3" du-constant-wrong) |
| im-f-035 | fixed, FORM_LEAK + WRONG_TAG: the correct option was about twice as long as any other and the only compound one; "arctan(∞) − arctan 0 directly" was tagged ftc-order-swapped. Now five parallel "Type …: write …" options (∫_{−t}^t symmetric, ∫_t^∞, Type II at 0⁺, "Not improper: [arctan x]₀^∞") |
| im-g-exp | fixed, FORM_LEAK: for all 8 k values the correct 1/k was the only positive option. Added k (multiplied by k). Values 1/k for k = 2, 3, 4, 5, 6, ½, 3/2, 5/2 ✓ |
| im-g-p | fixed, FORM_LEAK (only positive option, all 8 p values): added 1/p (old exponent). Retagged −1/p to power-rule-int-coefficient with a consistent why. Values 1/(p−1) for p = 2, 3, 4, 3/2, 5/2, 5, 6, 7/2 ✓ |

### Steps
| id | verdict |
|---|---|
| im-s-01 | #0, #3, final ok. #1 fixed, WRONG_TAG (∫_t^∞ → im-plug-infinity). #2 fixed, WRONG_TAG (ln t → ln-misapplied). 1 − 1/t → 1 ✓ |
| im-s-02 | #0 fixed, WRONG_TAG (im-plug-infinity). #1 fixed, WRONG_TAG ("ln t − 1" is the slip ln 1 = 1, so arithmetic-error, not ftc-not-subtracted). #2 and final ok: ln t → ∞, diverges ✓ |
| im-s-03 | #0, #1, #3, final ok. #2 fixed: star centre. The distractor ½ − 1/(2√t) had a false why ("differentiates"), and "1 − √t" carried the wrong tag. Now {2 − 2√t, 2√t − 2, 1 − √t, √t − 1, −2√t} with hub −2√t (medoid 1.0 → 0). [2√x]_t^1 = 2 − 2√t → 2 ✓ |
| im-s-04 | #0 fixed, WRONG_TAG. #1 fixed, EXPLANATION: the why for e^{−t} + 1 gave e^{−t} − 1; now "dropped the sign of F(t), kept −F(0)". #2 fixed: "e" and "1/e" did not match their whys; now 1 − e and 1 − 1/e (t = 1). Final 1 ✓ |
| im-s-05 | #0 fixed, FORM_LEAK (dropped the "Split at c = 0 … two separate limits" clause; the explanation keeps it). #1, #2, #3 and final ok: π/2 + π/2 = π, split ['0'] ✓ (systemic medoid hits, residual 1) |
| im-s-06 | #0 fixed, FORM_LEAK (long justification; now "Type II at the interior point x = 0"). #1 fixed, FORM_LEAK ("both must converge" moved to the explanation). #2 fixed: the why for −1/t did not produce it (now "F only at t"); ln t retagged to ln-misapplied. #3 fixed, FORM_LEAK (the correct option was the longest; now "1/t − 1 → ∞: diverges" against parallel distractors). Final: diverges ✓ |
| im-s-07 | #0 fixed, WRONG_TAG. #1 fixed, WRONG_TAG: (x²/2)e^{−x²} was integrated-instead (meaning "integrated when a derivative was asked"); now product-rule-integral. #2 fixed: star centre, so added a compound distractor (e^{−t} + swapped order), medoid edit 1.0 → 0. #3 fixed: "1/(2e)" did not match "plugged t = 1"; now ½ − 1/(2e). Final ½ ✓ |
| im-s-08 | #0 fixed, WRONG_TAG. #1, #2, #3 and final ok: ln|ln x|, ln(ln t) − ln(ln 2) → ∞, diverges ✓ |
| im-s-09 | ok throughout: −2√(4−x), 4 − 2√(4−t) → 4, t → 4⁻ ✓ (MINOR: the #3 whys are generic) |

Step order follows the spec in all 9 problems: type, then the limit(s), then FTC or antiderivative inside the limit, then evaluate, then conclude. Every `result` is the true state after its step. Divergent finals carry `converges: false` and no value. Both bounds infinite uses `split: ['0']`.

## Tag-misuse patterns (fixed)
- `im-split-mishandled` was used for "lim_{t→∞}∫_t^∞ (∞ kept as a bound)" 6 times (im-f-007, im-s-01#1, 02#0, 04#0, 07#0, 08#0). Changed to `im-plug-infinity`.
- `power-rule-int-exponent` was used for a lost or wrong *coefficient*. Changed to `power-rule-int-coefficient`: im-f-014, 017, 018, 031, im-g-p, im-s-03#2.
- A whole family of decoy-hub items made every distractor ≤ 0 for a positive integrand, so the correct option was the unique positive one: im-f-014, 015, 016 and both generators (16/16 instances). Fixed by adding one positive single-slip distractor each; the hub stays negative.

## Scope
No ratio test, root test, alternating series or absolute-convergence content in either file (grep plus a read-through). One note: the im-f-026 distractor "diverges because 1/(x ln x) ≥ 1/x" uses comparison reasoning that the topic-11 spec does not teach. It appears only as a false claim inside an invalid reason, so I kept it.

## Residual doubts for the orchestrator
1. **Systemic medoid hits (not rewritten; no blind evidence):** im-s-01#0, im-s-05#1, im-s-05#2, im-s-08#1 (1.0 on both measures); im-s-02#1, im-s-07#1, im-s-09#1, im-s-09#2 (edit 1.0); im-f-020, im-s-01#1, im-s-04#0, im-s-05#3 (bigram 1.0).
2. **Duplicate prompts:** im-f-015 is the same question as im-g-exp:1 (∫₀^∞e^{−2x}), now with the same options. im-f-013 and im-f-014 equal im-g-p:1 and im-g-p:2 with different options. Several flash items repeat the step-problem integrals. Consider changing k or p in the static items.
3. **im-s-06#1 distractor** "Only lim_{t→0⁺}∫_t^1; the left piece is the same by symmetry". The symmetry claim is true, and one divergent piece does settle divergence, so a strong student could defend it as a sufficient argument. It is wrong as the course set-up, which requires both limits. Keep it or replace it.
4. **im-f-002 and im-s-03#0:** the correct option is the only one that names the blow-up (a mild tell). Shortening it to "Type II at x = 0" creates a 0.5 medoid tie with "Type II at x = 1", so I left both as they were. The blind hit on im-f-002 was by math.
5. **Generic whys** on the trivial "evaluate the limit" steps ("a sign slip", "doubled by mistake"): im-s-01#3, 03#3, 05#3, 09#3. They are MINOR and were not changed.
6. Remaining loose tags (MINOR): im-f-014 "−1" (power-rule-int-exponent, for "treated as 1/x²"), im-f-028, im-f-034, im-s-07#1 "−e^{−x²}/(2x)" (inner-constant-factor-missing, for dividing by a variable 2x), im-s-08#1 "(ln x)²/2" (du-derivative-wrong).
7. Layout: the new im-f-011 options are wide display-style inline math (one sits inside \left( \right) and cannot line-break). The CSS scrolls wide math inside its own box; worth a 390 px QA look.

## Certified (re-derived by me; content as it now stands)
Flash: im-f-001 to im-f-035 (all 35); im-g-exp and im-g-p, seeds 1–8 by hand, 1–20 by the suite.
Steps: im-s-01 to im-s-09, every step and every final.
