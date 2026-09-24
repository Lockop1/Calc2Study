VERDICT: FAIL (32 blocking issues)

Topic `ibp` (prefix `ip`). Files: `content/flash/ibp.ts` (63 flash, 2 generators), `content/steps/ibp.ts` (10 problems, 48 steps). Lecture 5 Part 2 (§3.1). Blind seed 15. Verifier did not author these files.

**The math is sound.** I re-derived every flash item, both generator families over every parameter value (n ∈ {2,4,5,6,7,8}; k ∈ {2,3,4,5,−2,−3,−4}; seeds 1–20), every step, `result`, `final` and recap.
- No stored answer is wrong, and no check is wrong.
- No distractor is also correct. Every u/dv prompt says "Following LIATE", or asks for the choice that "works" / "moves the solution forward"; ip-f-034 asks for the "most direct" method. So the swaps that do finish cyclically (ip-f-010, 014, 015, 018, ip-s-04#0, 06#0) are wrong as framed.
- **Every blocking issue is a FORM_LEAK.** Almost every distractor is a one-feature edit of the key, so the key is the hub of its option list.

Automated checks:
- `npx vitest run tests/content.test.ts -t "ibp"`: 76 passed. `tests/content-volume.test.ts -t "ibp"`: 2 passed.
- Independent re-check with sympy/mpmath (not the project checker) over 121 units: all flash option exprs, 40 generator instances, all checked steps and finals.
  - Every correct option satisfies its check, and no distractor does (0 problems).
  - All 11 definite values match quadrature to more than 15 digits.

## Findings

### Blocking (FORM_LEAK)
**Pattern A: swap pair + majority u.** Options: key (u₁, dv₁); swap (u₂, u₁dx); (u₁, dx); (u₂, dx); (u₁, v in the dv slot). u₁ appears 3 times and u₂ twice, so "take the swap-pair member with the majority u" hits all 12 such units and never misses. The 8 units laid out 2-2-1 resist it (ip-f-010/014/015/016/018/019, ip-s-08#0/09#1). Fix: replace the (u₁, v) option with a single-mistake option carrying a new u, e.g. `u = 1, dv = x\cos(3x)\,dx` (v is the original problem, as in ip-f-013), or copy ip-f-015's 2-2-1 layout.
- ip-f-012 — FORM_LEAK — blind HIT (unit 30) — replace `u = x, dv = \frac13\sin(3x)dx`.
- ip-f-017 — FORM_LEAK — blind HIT (31) — replace `u = x, dv = \tan(x)dx`.
- ip-f-020 — FORM_LEAK — blind HIT (6) — replace `u = x, dv = \frac{3^x}{\ln 3}dx`.
- ip-s-03#0 — FORM_LEAK — blind HIT (28) — replace `u = x^2, dv = \frac13e^{3x}dx`.
- ip-s-04#0 — FORM_LEAK — blind HIT (18) — replace `u = \cos(3x), dv = \frac12e^{2x}dx` with ip-f-015's `u = -3\sin(3x), dv = e^{2x}dx`.
- ip-s-10#0 — FORM_LEAK — blind HIT (11) — replace `u = x, dv = \tan(x)dx`.

**Pattern B: hub.** Each distractor changes exactly one feature of the key (sign, one coefficient, bracket/limits, integrand, one term), and no distractor has neighbours of its own. So the key is the unique per-feature majority. Fix: build a decoy hub, i.e. give at least one distractor its own one-edit neighbour among the distractors. ip-s-06#3 (the 9/5 pair), ip-f-037/039/045/047/050 and ip-s-06#2 already do this and resisted every heuristic. Also drop ±key twins, "key with a factor removed", and the F(b)-only + F(a)-only pieces of F(b) − F(a), unless a distractor gets the same treatment.
- ip-f-001 — FORM_LEAK — only option with both the modal `uv −` and the modal `∫v du` (e.g. add `uv + \int u\,du`).
- ip-f-006 — FORM_LEAK — `xf(x)`, minus and `xf′(x)` are each the majority, and the key has all three.
- ip-f-023 — FORM_LEAK — the others are its sign-flip, non-reciprocal, 1+x² and arctan variants.
- ip-f-040 — FORM_LEAK — lead (5/6), minus, x⁴, 1/16 (its + twin): key is the unique max.
- ip-f-049 — FORM_LEAK — +x²/4 twin; −x²/2 and −x³/6 each change one feature.
- ip-f-053 — FORM_LEAK — three distractors each change exactly one of its three terms.
- ip-f-057 — FORM_LEAK — the −π/4 twin and ¼ (π dropped) both point at π/4.
- ip-f-058 — FORM_LEAK — 2e² (F(2)) and e (= F(1)) are its pieces, and 10e² − 5e = 5(2e² − e).
- ip-f-061 — FORM_LEAK — 14e³/27 and (26e³−11)/27 each share one part of (14e³−11)/27; /27 appears in 4 of 6.
- ip-s-01#1 — FORM_LEAK — majority numerator x, denominator √(1−x²) and sign.
- ip-s-01#2 — FORM_LEAK — `x arcsin x`, minus and `x/√(1−x²)` are all the majority.
- ip-s-01#3 — FORM_LEAK — ±, ½ and 2 variants of −√(1−x²).
- ip-s-02#2 — FORM_LEAK — star: each of the 4 distractors changes one of bracket / sign / x/2 / + / cos 2x.
- ip-s-03#2 — FORM_LEAK — ⅓ lead, minus, ⅔∫xe^{3x}: one change each.
- ip-s-03#4 — FORM_LEAK — −2/9 term (4 options), + third term (3), 2/27 (3).
- ip-s-04#1 — FORM_LEAK — +3/2 sign twin, and minus is the majority.
- ip-s-04#2 — FORM_LEAK — ½ lead, + sign, ∫e^{2x}sin 3x are each the majority.
- ip-s-04#4 — FORM_LEAK — perfect star: every distractor differs from the key in exactly one place.
- ip-s-07#1 — FORM_LEAK — x³ numerator, ⅓, (1+x²) are each the majority.
- ip-s-08#2 — FORM_LEAK — same star as ip-s-02#2.
- ip-s-09#0 — FORM_LEAK — π, bounds 1..3, (ln x)² are each the majority.
- ip-s-09#4 — FORM_LEAK — one-edit variants only: 9 for 3, +6, negated, π dropped.
- ip-s-10#2 — FORM_LEAK — `x tan x`, minus, `tan x` are each the majority.

**Other blocking:**
- ip-f-003 — FORM_LEAK — the prompt contains "LIATE", so matching initials gives the answer with no recall needed; the options are also a positional-majority hub. Fix: drop "LIATE" from the prompt (keep it in the explanation) and add e.g. "Inverse trig, logarithmic, algebraic, trig, exponential".
- ip-s-01#4 — FORM_LEAK — the prompt asserts ∫arcsin x dx = x arcsin x + √(1−x²) + C and then asks for its derivative, which must be the integrand arcsin x; no differentiation is needed. Fix: ask for a part that must be computed (e.g. d/dx √(1−x²)), or check a possibly-wrong candidate as ip-f-030 does.
- SYSTEMIC — FORM_LEAK — the same patterns in units outside the blind sample, found item by item and confirmed by answer-blind scripts (edit-distance medoid; swap pair + majority u):
  - Pattern A: ip-f-011, ip-f-013, ip-s-01#0, ip-s-02#0, ip-s-06#0, ip-s-07#0.
  - Pattern B: ip-f-002, 007, 008, 035, 036, 038, 042, 044, 046, 048, 052, 055, 056, 059, 060, 063; ip-g-xn-ln and ip-g-x-ekx (the medoid picks the key in 20/20 seeds each, because the layout is identical for every n and k); ip-s-02#3, 03#3, 04#3, 05#1, 05#2, 05#3, 07#2, 07#3, 07#4, 08#3 (±2π² twin), 08#5 (−2π² is the bare core of 5 of 6 options).
  - Borderline, not counted: ip-f-062, ip-s-09#1.
  - Overall: the medoid picks the key uniquely in 69/113 units (61%) vs 19% chance. Target ≲30%. A generator fix example: in ip-g-xn-ln replace `\frac{x^k}{k}\ln x + C` with `x^k\ln x - \frac{x^k}{k} + C` (v = x^k), which pairs with `−\frac{x^k}{k}`.

### Non-blocking
- ip-f-010, 013, 015, 016, 018, 019, ip-s-01#0, 08#0, 09#1 — WRONG_TAG — u written as the derivative of u (`u = 1/x`, `1/(1+x²)`, `−3sin3x`, `3cos3x`, `1/x`, `2x`, `1/√(1−x²)`, `2t`, `2ln x/x`) is tagged `ibp-du-wrong`. `ibp-u-du-confused` is exact; its description cites ip-f-010's own option.
- ip-f-007 — WRONG_TAG — `xf(x)|_a^b − ∫f dx` ("f itself used as v") → `ibp-v-dv-confused`.
  - The reverse case (v written in the dv slot) in ip-f-011/012/013/017/020 and ip-s-01#0/02#0/03#0/04#0/06#0/07#0/10#0 is tagged `ibp-v-wrong`. Suggest widening the `ibp-v-dv-confused` label to "(or vice versa)" and retagging.
  - Most of those options disappear with the Pattern A fix.
- ip-f-016 — WRONG_TAG — the role-swap option (its why says "gives I = I") → `ibp-cyclic-roles-swapped`.
- ip-f-060 — WRONG_TAG — "tan⁻¹(1/√3) = π/6, not π/3" is tagged `arithmetic-error` → `inverse-trig-value-wrong` (its description cites this exact value).
- ip-f-051 — WRONG_TAG — `x(ln x)² − x ln x + x` dropped the outer power-rule 2, not an inner derivative → `power-rule-coefficient` (not `chain-rule-missing`).
- ip-s-09#1 — WRONG_TAG — `u = ln(x²)` for (ln x)² → `composition-misread` (not `algebra-error`).
- ip-s-10#3 — WRONG_TAG — `x tan x − ln|sin x|` → `tan-antiderivative-wrong` (its description lists ln|sin x|, and ip-f-039 tags the same option that way), not `formula-swapped`.
- ip-g-xn-ln — MINOR — for n = 2 (seeds 7, 8, 19) the v-differentiated option renders `2x\ln(x) - \frac{2}{1}x + C`: unsimplified and an odd one out. Print `2x` when m = 1.
- ip-f-033, 050, 052, 053 — MINOR — "tabular method" / "diagonal products" are not lecture terminology (repeated IBP is in scope). Reword in repeated-IBP language.
- ip-f-004 — EXPLANATION — the why for `+,−,−,−` explains only the third sign; use ip-f-050's "the later signs were not alternated".
- ip-f-059 — EXPLANATION — the explanation stops before simplifying; add `= \frac{3}{\ln 3} - \frac{2}{(\ln 3)^2}`.
- ip-s-09#0 — MINOR — the step check `expected` equals the option's own expr, so it is tautological. The setup was verified by hand, and steps #4 and final test the value independently.

## Blind-option test
- Sample: 40 of 113 units (35%), seed 15. Hits: **39/40**. Chance ≈ 7.6/40 (19%).
- Protocol: I sampled before opening either content file, read only the printed option lists, and opened the key only at scoring.
  - First I tried answer-blind heuristics only (hub/majority, sign twins, pieces, swap pair + majority u). A unique pick from these was recorded as SURFACE: 30 units, 29 hits. The miss was ip-s-06#2, whose hub is the sign-error option.
  - Otherwise I reconstructed the problem and did the math: MATH, 10 units, 10 hits.
- **Guessable (HIT + SURFACE), 29:** ip-f-001, 006, 012, 017, 020, 023, 040, 049, 053, 057, 058, 061; ip-s-01#1, 01#2, 01#3, 02#2, 03#0, 03#2, 03#4, 04#0, 04#1, 04#2, 04#4, 07#1, 08#2, 09#0, 09#4, 10#0, 10#2. All are listed above.
- Not guessable: ip-f-009, 016, 022, 024, 025, 028, 029; ip-s-06#2, 06#3, 08#1, 09#2.

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | ip-f-022 | 1 | 1 | HIT | MATH: -3sin3x (derivative of cos3x) reveals dv = cos(3x)dx; v = (1/3)sin3x. Surface centroid ties 1 vs 5 (+1/3 vs +3), so no surface pick. |
| 2 | ip-s-01#3 | 1 | 1 | HIT | SURFACE: feature centroid - shares sqrt(1-x^2), the minus sign and unit coefficient with most options (+/-, 1/2, 2 variants around it). Math (int x/sqrt(1-x^2)) agrees. |
| 3 | ip-s-09#4 | 1 | 1 | HIT | SURFACE: centroid - every other option changes exactly one feature of it (9 vs 3, +6 vs +4, negated, pi dropped). Math agrees. |
| 4 | ip-s-03#2 | 2 | 2 | HIT | SURFACE: centroid - 1/3 lead, minus sign, (2/3)int xe^{3x} each shared with the majority. Math agrees. |
| 5 | ip-s-01#1 | 2 | 2 | HIT | SURFACE: centroid - x numerator, sqrt(1-x^2) denominator, + sign each majority. Math (v du for int arcsin x) agrees. |
| 6 | ip-f-020 | 3 | 3 | HIT | SURFACE: swap pair (u=x,dv=3^x dx)/(u=3^x,dv=x dx) must contain the answer; u=x appears in 3 of 5 options -> pick it. LIATE agrees. |
| 7 | ip-s-06#2 | 4 | 1 |  | SURFACE: feature centroid (bracket, -ln x/x, minus before integral, 1/x^2) uniquely picks 4. NOTE: math says 1 (v=-1/x makes -int v du = +int 1/x^2), so the centroid is a decoy here. |
| 8 | ip-s-06#3 | 4 | 4 | HIT | MATH: int_1^5 ln x/x^2 = [-ln x/x - 1/x]_1^5 = 4/5 - ln5/5. Surface centroid ties 1/2/4. |
| 9 | ip-s-08#2 | 5 | 5 | HIT | SURFACE: centroid - bracket, -t^2/2 cos2t, + sign, t cos2t each majority; every other option varies one feature. Math agrees. |
| 10 | ip-f-023 | 1 | 1 | HIT | SURFACE: centroid - + sign, reciprocal, sqrt, 1-x^2 all majority features. Math (u = arcsin x) agrees. |
| 11 | ip-s-10#0 | 1 | 1 | HIT | SURFACE: swap pair (u=x,dv=sec^2)/(u=sec^2,dv=x dx); u=x appears 3 of 5 -> pick it. LIATE agrees. |
| 12 | ip-f-025 | 3 | 3 | HIT | MATH: int x^2 arctan x, v=x^3/3, du=dx/(1+x^2) -> (x^3/3)arctan x - (1/3)int x^3/(1+x^2). Surface centroid ties 3 vs 5. |
| 13 | ip-f-024 | 4 | 4 | HIT | MATH: u=x^2, v=e^{3x}/3, du=2x dx -> (1/3)x^2e^{3x} - (2/3)int xe^{3x}. Surface centroid ties 1 vs 4. |
| 14 | ip-f-006 | 4 | 4 | HIT | SURFACE: centroid - xf(x) boundary, minus sign, xf'(x) integrand each majority. Math (u=f, dv=dx) agrees. |
| 15 | ip-f-009 | 2 | 2 | HIT | MATH/knowledge: only true statement (bounds apply to uv); others contradict the Keep-in-mind box. No surface tell. |
| 16 | ip-s-04#2 | 1 | 1 | HIT | SURFACE: centroid - 1/2 lead, + sign, sin(3x) integrand each majority. Math (u=cos3x, dv=e^{2x}dx) agrees. |
| 17 | ip-s-02#2 | 3 | 3 | HIT | SURFACE: centroid - bracket, minus, x/2, + sign, cos2x integrand all majority; each other option varies one feature. Math agrees. |
| 18 | ip-s-04#0 | 5 | 5 | HIT | SURFACE: swap pair (u=e^{2x},dv=cos3x)/(u=cos3x,dv=e^{2x}); u=cos3x appears 3 of 5 -> pick it. LIATE (T before E) agrees. |
| 19 | ip-f-057 | 6 | 6 | HIT | SURFACE: sign-flip twin -pi/4 and pi-dropped 1/4 both point at pi/4 (centroid). Math (int_0^{pi/2} x sin2x = pi/4) agrees. |
| 20 | ip-s-07#1 | 3 | 3 | HIT | SURFACE: centroid - x^3 numerator, factor 1/3, (1+x^2) denominator each majority. Math (v du for x^2 arctan x) agrees. |
| 21 | ip-s-04#1 | 3 | 3 | HIT | SURFACE: sign-flip twin +3/2 and minus majority -> -3/2. Math (v du = (e^{2x}/2)(-3sin3x)) agrees. |
| 22 | ip-f-061 | 4 | 4 | HIT | SURFACE: centroid - /27 majority, shares 14e^3 with one option and -11 with another. Math ((14e^3-11)/27) agrees. |
| 23 | ip-s-01#2 | 2 | 2 | HIT | SURFACE: centroid - x arcsin x, minus, x/sqrt(1-x^2) each majority. Math agrees. |
| 24 | ip-s-04#4 | 4 | 4 | HIT | SURFACE: perfect centroid - each other option differs from it in exactly one feature (3/2 vs 9/4, +I, 1/2 sin, integral instead of I). Math agrees. |
| 25 | ip-f-058 | 1 | 1 | HIT | SURFACE: 10e^2-5e is 5x(2e^2-e), and 2e^2, e look like its pieces (upper/lower evaluation) -> pick the combination. Math (t^2e^t on [1,2]) agrees. |
| 26 | ip-s-09#0 | 5 | 5 | HIT | SURFACE: centroid - pi, bounds 1..3, (ln x)^2 each majority. Math (disks about x-axis) agrees. |
| 27 | ip-f-049 | 5 | 5 | HIT | SURFACE: centroid - (x^2/2)ln x lead, minus, x^2/4 each shared. Math agrees. |
| 28 | ip-s-03#0 | 4 | 4 | HIT | SURFACE: swap pair (u=x^2,dv=e^{3x})/(u=e^{3x},dv=x^2); u=x^2 appears 3 of 5 -> pick it. LIATE agrees. |
| 29 | ip-s-09#2 | 3 | 3 | HIT | MATH: most options have v = x so the integral is int (ln x)^2 dx; du = 2 ln x/x dx -> x(ln x)^2 - 2 int ln x dx. Surface centroid ties 3 vs 5. |
| 30 | ip-f-012 | 3 | 3 | HIT | SURFACE: swap pair (u=cos3x,dv=x)/(u=x,dv=cos3x); u=x appears 3 of 5 -> pick it. LIATE agrees. |
| 31 | ip-f-017 | 4 | 4 | HIT | SURFACE: swap pair (u=sec^2,dv=x)/(u=x,dv=sec^2); u=x appears 3 of 5 -> pick it. LIATE agrees. |
| 32 | ip-f-001 | 5 | 5 | HIT | SURFACE: centroid - 'uv -' and 'int v du' each majority; also the known formula. |
| 33 | ip-s-03#4 | 2 | 2 | HIT | SURFACE: centroid - minus 2/9 term majority, +2/27 shares sign with 2 options and magnitude with 2. Math agrees. |
| 34 | ip-f-029 | 2 | 2 | HIT | MATH: a^2+b^2 = 13 -> e^{2x}(2cos3x+3sin3x)/13. All options have the 2:3 ratio; no surface tell (13 appears twice). |
| 35 | ip-f-028 | 4 | 4 | HIT | MATH: v=e^{2x}/2, du=-3sin3x dx -> +(3/2)int e^{2x}sin3x. Surface centroid ties 1 vs 4. |
| 36 | ip-s-08#1 | 6 | 6 | HIT | MATH: v du = (-cos2t/2)(2t dt) = -t cos2t dt. Surface centroid ties 4 vs 6. |
| 37 | ip-s-10#2 | 5 | 5 | HIT | SURFACE: centroid - x tan x, minus, tan x integrand each majority. Math agrees. |
| 38 | ip-f-016 | 3 | 3 | HIT | MATH: second IBP of cyclic integral keeps trig as u, e^{2x} as dv. Swap-pair heuristic ties (e^{2x} and sin3x each appear twice as u). |
| 39 | ip-f-053 | 4 | 4 | HIT | SURFACE: centroid - -(x^2/2)cos2x, +(x/2)sin2x, +1/4cos2x each shared with the majority. Math agrees (derivative = x^2 sin2x). |
| 40 | ip-f-040 | 3 | 3 | HIT | SURFACE: centroid - (x^4/4)ln x, minus, x^4, 1/16 each shared. Math agrees. |

Hits: 39/40 (98%). Chance level ≈ 7.6/40 (19%).
An item is "guessable" only if it was a HIT and the reason is a surface feature (form, length, oddness, symmetry). Rewrite those.

## Certified
Mathematically certified: for each unit I re-derived the correct option. I confirmed that every distractor is wrong and that its why describes how it arises, and that each check/expr matches the problem. I also checked every result line, final and recap.
- Flash: ip-f-001 … ip-f-063 (all 63).
- Generators: ip-g-xn-ln (all n) and ip-g-x-ekx (all k, including the negative-k signs in the LaTeX, whys and explanation), seeds 1–20.
- Steps: ip-s-01 … ip-s-10, all 48 steps and 10 finals.

Units with no finding of any kind:
- Flash: ip-f-005, 009, 014, 021, 022, 024, 025, 026, 027, 028, 029, 030, 031, 032, 034, 037, 039, 041, 043, 045, 047, 054.
- Steps: ip-s-02#1, 03#1, 04#5, 05#0, 06#1, 06#2, 06#3, 08#1, 08#4, 09#2, 09#3, 10#1.

## Uncertain
None. Every stored answer agrees with my own derivation and with independent quadrature/differentiation.
