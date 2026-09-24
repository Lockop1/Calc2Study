VERDICT: FAIL (13 blocking issues)

Topic `antiderivatives` (prefix `ad`). Verifier: math-verifier (not the author). Files: `content/flash/antiderivatives.ts` (62 flash items, 3 generators) and `content/steps/antiderivatives.ts` (13 problems, 56 steps). Blind seed: 11.

**The math is sound.** I re-derived every flash item, every generator family (all seeds 1–20), every step, every `result` line, and every `final`. No stored answer is wrong, every check expression describes its problem as stated, and no distractor is also correct. **All 13 blocking issues are form leaks:** the options give the answer away without the math. One of them is systemic: 74 of 121 units fall to an answer-blind "convergence" heuristic.

## Automated checks
- `npx vitest run tests/content.test.ts -t "antiderivatives"`: **79 passed** (78 item tests plus the "is aggregated" guard). `npx vitest run tests/content-volume.test.ts -t "antiderivatives"`: **2 passed**. `checker/validate` reports **no warnings** either (warnings are not test-enforced).
- When I started, the aggregate `content/index.ts` did not compile because other topics' files (volumes-disks.ts, trig-sub.ts) were still being written. So I first ran identical, topic-only copies of both test files from the scratchpad (78 + 2 passed). The official commands passed later, as above.
- Independent re-check (mpmath, not the project checker):
  - All 28 definite values match numerically to 1e-12. This includes the "area" values quoted in distractor explanations: ∫₀^{2π}|sin x cos x| = 2 and ∫₀^π|cos x| = 2.
  - Numeric differentiation of 103 antiderivative-type units (static items, all 60 generator instances, steps, finals): every correct option differentiates to its integrand, and no distractor does.
  - The only flag was ad-s-10#3 `4u − 16 ln u`, where mpmath's complex log makes the derivative match. Over the reals ln u is undefined on [−4, −2], so the option is genuinely wrong, as its why says.

## Findings

### Blocking
- ad-g-trig-kx (all seeds) — FORM_LEAK — Blind unit 1 (seed 1, ∫sin 7x dx) was a HIT chosen by structure alone. The list is equally consistent with ∫−sin 7x, ∫7 sin 7x or ∫49 sin 7x; I picked the hub. Cause: the coefficients are always {−1/k, −1, −k, +1/k, +k}·cos(kx) (or the sign mirror for cos), so the correct sign is the majority sign (3 of 5 options) in **20/20 seeds**. Its magnitude 1/k is one of only two magnitudes that appear with both signs, so "majority sign + divide by k" hits every time. — Fix: make the sign split 3/3 (e.g. a 6th option from a different realistic error with the opposite sign), or give the sign-twin its own ×k/÷k neighbours so the correct option is no longer the unique hub. Re-check with the heuristic script below.
- ad-g-recip-power (all seeds) — FORM_LEAK — The answer-blind medoid heuristic (option with the smallest total edit distance to the others) picks the correct option in **20/20 seeds**. The correct sign is also always the majority (4 of 6 options are negative). Every distractor is one edit away from the correct option (star pattern). — Fix: add a distractor cluster around a wrong centre (e.g. the sign-twin `\frac{1}{m x^m}` together with its own coefficient variant), and balance the signs.
- ad-f-019 — FORM_LEAK — Blind unit 18 was a HIT by "majority family": 3 of 5 options are ln|·| forms. I could not tell ∫sec²x/tan x from ∫sec²x/tan³x (whose answer, −1/(2tan²x), is listed), so I went with the majority. The medoid heuristic also picks it. — Fix: rebalance, e.g. replace `\sec^2 x\ln|\tan x| + C` with a power-family distractor such as `\frac{\tan^2 x}{2} + C` (wrote ∫u du for ∫du/u), so the ln family is not the majority. (See also the tag finding below.)
- ad-f-046 — FORM_LEAK — Blind unit 20 was a HIT without reconstructing the problem. −12 is the only value whose negation (12) is also listed, and −4 = −12/3 makes it the hub. — Fix: add sign twins for other values (e.g. `4`, "copied the given value") so ± pairs no longer single out the answer. ad-f-045, which has ±3 and ±7, does not have this tell.
- ad-f-041 — FORM_LEAK — The correct option is the longest (~110 characters vs 42–80) and the only one that carries a justification ("…so both describe the same family of antiderivatives"): a "looks most complete" tell. — Fix: shorten it to e.g. "Both answers are correct." and keep the reason in `explanation`, or give every option a comparable "because…" clause.
- ad-f-052 — FORM_LEAK — The correct option is the longest (~100 characters vs 22–58) and the only one that states both the diagnosis and the corrected value ("evaluating √u|₁⁴ gives 1"). — Fix: remove the value from the option (it is already in `explanation`) and balance the lengths.
- ad-f-043 — FORM_LEAK — The correct ∫₋₁¹ 1/(x+2) dx is the only option that shares its integrand with one option (∫₋₃⁰ 1/(x+2)) and its interval with another (∫₋₁¹ 1/x²). The other two options share nothing, so convergence (and the medoid) picks it. — Fix: e.g. change ∫₋₁¹ 1/x² to ∫₋₃⁰ 1/x² dx (still invalid: discontinuous at the endpoint 0). Then a distractor becomes the hub.
- ad-f-047 — FORM_LEAK — I = 0 appears in 3 of 5 options and A = 2 in 3 of 5. The correct pair [0, 2] is exactly the per-coordinate majority, and every distractor differs from it in one coordinate. — Fix: include pairs that differ from the correct pair in both coordinates but share values with other distractors (e.g. [2, 0], [−2, 1]), so the per-coordinate majority points elsewhere.
- ad-f-053 — FORM_LEAK — The factor ½ appears in 3 of 5 options and the bracket F(8) − F(2) in 3 of 5. The correct ½(F(8) − F(2)) is the per-feature majority (star pattern). — Fix: e.g. replace `2(F(8) − F(2))` with `F(4) − F(1)` (no substitution at all), so the distractors pair up among themselves.
- ad-s-06#0 — FORM_LEAK — The correct "u = 4x, to match ∫du/√(1−u²)" is the only option that combines the u of one distractor ("u = 4x, … 1/(1+u²)") with the formula of another ("u = 16x, … 1/√(1−u²)"). — Fix: replace "u = 1 − 16x², to use the power rule" with a single-mistake option that shares features with the other distractors rather than the correct one (e.g. "u = 16x², to use the power rule", which is close to both "u = 16x, …" and the power-rule option). No option should be the unique hub; check with the heuristic script.
- ad-s-09#0 — FORM_LEAK — The correct substitution is the only "u = …" option with a how-to clause ("writing e^{2t} = e^t·e^t"); the other substitutions are bare. — Fix: move the clause into `result`/`explanation` (the result line already shows it), or give the other u-options comparable clauses.
- ad-s-10#0 — FORM_LEAK — Same tell ("so x = u − 4 and du = dx"). Here the correct option is also the longest as rendered. — Fix: as for ad-s-09#0.
- SYSTEMIC (all units listed below) — FORM_LEAK — The medoid heuristic uses no math and never sees the question. It picks the stored answer uniquely in **74 of 121 units (61%) vs 19% chance**. Cause: almost every distractor is exactly one edit away from the correct option, so the correct option is the centre of the star (the lecture-style "one mistake per distractor" pattern, with no second cluster). The protocol blind test (below) under-counts this, because I solved most sampled units by reconstructing the problem from the options. The mechanical heuristic shows a test-wise student would not need to.
  - Units hit (besides those listed individually above): ad-f-001 003 005 006 007 008 009 011 015 017 021 022 023 025 027 028 029 031 032 033 034 037 038 048 051 054 059 060 062; ad-s-01#1 #2 #4; ad-s-02#1 #2 #3; ad-s-03#0 #2 #3; ad-s-04#1 #3; ad-s-05#0 #1 #2; ad-s-06#1 #2 #3; ad-s-07#1 #2 #3; ad-s-08#0; ad-s-09#1 #2 #3; ad-s-10#2 #3 #4; ad-s-11#0 #1 #3 #4; ad-s-12#0 #1 #2 #3; ad-s-13#0 #1 #3.
  - Fix pattern: give each unit at least one distractor pair that shares features with each other but not with the correct option (a decoy hub). ad-s-08#2's ±2π² pair and ad-f-045's ±3/±7 pairs are good examples of this.
  - Script (answer-blind; the key is used only for scoring): `/tmp/claude-0/-home-user-Calc2Study/6ed826b6-ed8f-5336-b2e6-6799eb8df213/scratchpad/ad/heur.py`, run on the JSON produced by `dump.ts` in the same folder.
  - Target: ≲30% unique medoid hits per topic. This pattern is likely shared by the other topics' authors, so the orchestrator may prefer to handle it as a project-wide policy.

### Non-blocking
- ad-f-019 (`-\frac{1}{2\tan^2 x}`), ad-f-028 (`\frac{4}{9}`), ad-s-02#3 (`-\frac{1}{6(x^3+1)^2}`) — WRONG_TAG / EXPLANATION — Each why says a power rule applied to u^{−1} gives u^{−2}/(−2). The power rule raises the exponent, to u⁰/0, which is undefined. The option actually comes from **lowering** the exponent from −1 to −2 and dividing by it (d/du[u^{−2}/(−2)] = u^{−3} ≠ u^{−1}). — Fix: retag `power-rule-int-exponent`, with a why like "lowered the exponent to −2 (as when differentiating) and divided by it; the power −1 is exactly the case that gives ln|u|".
- ad-f-004 (`\frac{3^{2x}}{2}`), ad-f-036 (`\frac{1}{2}`), ad-f-062 (`a^x + C`) — WRONG_TAG — Each encodes "forgot the 1/ln a for base a". `exp-base-log-missing` ("Forgot ln(a) for a^x") is the exact tag; `exp-antiderivative-wrong` is about e^{kx}.
- ad-f-031 (`\frac{\pi}{3}`) — WRONG_TAG — `arithmetic-error` → `inverse-trig-value-wrong`. This tag was added during my review, and its description cites exactly sin⁻¹(1/2) taken as π/3.
- ad-s-08#2 (`-2\pi^2`, flagged by the author) — MINOR — The value is right for the mistake described: with u = cos x, −∫u du with the x-limits kept gives −(2π)²/2 = −2π². But step 0 fixed u = sin x, so a student cannot reach it from the displayed state, and the why describes a route not taken. The ±2π² pair is valuable against the hub, so either keep it and accept it as a cross-route distractor, or replace it with a value reachable under u = sin x.
- ad-s-03#3 (`\frac{e^2-1}{2}`) — MINOR — The prompt itself shows "Evaluate ∫₀¹ u du", so "evaluated at the x-limits 1 and e" contradicts the visible limits. Use a mistake reachable from the displayed integral.
- ad-s-13 — MINOR — The integrand 1/(√x(2+√x)²) is unbounded at the lower limit x = 0. Strictly, this is an improper integral: FTC 2, and the substitution rule with g′(x) = 1/(2√x), do not apply literally on [0, 2]. That is the same endpoint rule ad-f-043 uses to reject ∫₀^{π/2} tan x dx. The value √2 − 1 is correct (the integral converges; checked numerically), and this is the lecture's own L-II #4, so no change is required. Optionally add a one-line note in the recap.
- back-substitution-wrong used for forward-substitution or limit errors — MINOR — ad-f-050 (u²/√u), ad-f-059 (f(g(u))), ad-s-02#2 (1/(u+1)), ad-s-03#2 (ln u), ad-s-07#2 ([2√2, 4√2]), ad-s-08#1 ([1, 1]), ad-s-09#2 ([2, e²+1]), ad-s-10#1 (4u/u), ad-s-11#2 ([0, π/2]), ad-s-13#2 ([0, √2]). The whys are accurate. The tag's label describes the reverse direction, but its description ("replaced u with a different function than the one chosen") loosely covers these uses. Acceptable as is.
- Tag gaps (proposal for the orchestrator) — MINOR:
  - "Pulled a non-constant factor out of the integral" is tagged `product-rule-integral` in ad-f-020, ad-f-023, ad-s-10#0 ("Answer directly: 4x ln|x+4|") and ad-s-10#3.
  - "du written without dx" is tagged `dx-not-replaced` in 10 du-steps.
  - In both cases the whys are accurate; no existing tag fits exactly.

### Author's special-attention items (all re-derived)
- ad-f-009: correct. For x > 1, d/dx sec⁻¹x = 1/(x√(x²−1)). The restriction sidesteps the |x| convention, sec⁻¹ is in scope (lecture 10(b)), and the domain is [1.5, 3].
- ad-f-039: correct. d/dx sin²x = sin 2x, and sin²x = −½cos 2x + ½. −½cos 2x is not listed, and no distractor is an antiderivative: the derivatives of cos²x, −cos 2x, −2cos 2x and 2cos 2x are −sin 2x, 2 sin 2x, 4 sin 2x and −4 sin 2x.
- ad-s-11: correct. With upper limit √(π/2), the u = sin(t²) limits are 0 and 1, and ½∫₀¹u du = ¼.
- ad-s-08: see the MINOR finding above; the answer 0 is correct.
- "Choose u" steps: no listed distractor works directly.
  - ad-s-09#0: u = e^{2t} gives ½∫du/(1+√u), which needs a second substitution; u = 2t only rescales.
  - ad-s-11#0: u = cos(t²) would also work, but it is not listed; none of the listed alternatives works.
  - ad-s-12#0: u = sec(3x³−2x) would also work, but it is not listed. u = tan(3x³−2x) only works after rewriting sec = √(1+u²), so not directly.
  - ad-s-13#0: u = √x would also work, but it is not listed.
  - ad-f-055: u = 1+e^{2x} gives ½∫du/(u√(u−1)) and u = e^{2x} gives ½∫du/(√u(1+u)); neither is a table form. Only u = eˣ gives ∫du/(1+u²).

## Blind-option test
- Sample: 43 of 121 units (36%): 62 flash items, 3 generator instances (seed 1) and 56 steps; seed 11. Hits: **42/43**. Chance ≈ 8.2/43 (19%).
- The sample was produced by a scratchpad copy of `scripts/blind-sample.ts` that imports only this topic, because the aggregate did not compile at the time. I later re-ran the official script: `sample.md` and `key.json` are byte-identical.
- I read only the printed option lists; the content files and key were unopened until after guessing. Reasons are prefixed MATH (reconstructed the problem from the options and computed it) or SURFACE (picked by form or structure alone).
- **Guessable (HIT + SURFACE reason): ad-g-trig-kx:1, ad-f-019, ad-f-046.** All three are listed above as FORM_LEAK. The one SURFACE guess that missed was ad-f-025.

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | ad-g-trig-kx:1 | 1 | 1 | HIT | SURFACE: hub of the pattern (others are sign flip / missing 1/7 / times 7 variants of -1/7 cos 7x); assumed the natural integrand sin(7x), but -sin 7x, 7 sin 7x, 49 sin 7x are equally consistent with the list |
| 2 | ad-f-036 | 1 | 1 | HIT | MATH: recognized lecture L-II #2, int_1^sqrt2 x 2^(x^2-1) dx, u=x^2-1 on [0,1] gives (1/2)(2-1)/ln2; (also the hub: others are x/÷2, x/÷ln2 variants) |
| 3 | ad-s-02#0 | 2 | 2 | HIT | MATH: options reveal the integrand x^2/(x^3+1); u=x^3+1 has du=3x^2dx present |
| 4 | ad-f-030 | 5 | 5 | HIT | MATH: recognized lecture L-I #2, int_1^18 sqrt(3/z)dz = 2 sqrt3 (sqrt18 - 1) = 6sqrt6 - 2sqrt3 |
| 5 | ad-f-004 | 1 | 1 | HIT | MATH: integrand evidently 3^(2x); antiderivative 3^(2x)/(2 ln 3) |
| 6 | ad-s-03#1 | 3 | 3 | HIT | MATH (inferred u): x-bounds 1 and e point to u = ln x; ln1=0, ln e=1 |
| 7 | ad-f-015 | 4 | 4 | HIT | MATH: integrand evidently (ln x)^2/x (2lnx/x is its 'differentiated' twin); u=ln x gives u^3/3 |
| 8 | ad-f-010 | 5 | 5 | HIT | MATH: integrand evidently x sec^2(x^2); u=x^2, du=2x dx gives (1/2)tan(x^2) |
| 9 | ad-f-001 | 1 | 1 | HIT | MATH: integrand evidently x^(-3) (derivative -3/x^4 present); x^(-2)/(-2) |
| 10 | ad-s-05#0 | 2 | 2 | HIT | MATH: u = 6e^x + 6 (lecture L-I #11), du = 6e^x dx |
| 11 | ad-f-012 | 2 | 2 | HIT | MATH: integrand evidently x/(x^2+1); u=x^2+1 gives (1/2)ln(x^2+1) |
| 12 | ad-f-020 | 1 | 1 | HIT | MATH: lecture L-II #8, sin(arctan t)/(1+t^2); u=arctan t gives -cos(u) |
| 13 | ad-f-048 | 3 | 3 | HIT | MATH: int_0^1 x^2(x^3+1)^4 dx with u=x^3+1: bounds 1..2, x^2dx=du/3 |
| 14 | ad-s-08#2 | 4 | 4 | HIT | MATH: lecture example int_0^{2pi} sin x cos x dx = [sin^2 x/2] = 0 (2pi^2 = unconverted bounds) |
| 15 | ad-f-038 | 2 | 2 | HIT | MATH: lecture L-II #9, u=x^3+3x^2+1 (du=3(x^2+2x)dx), u from 1 to 5: (1/3)ln5 |
| 16 | ad-s-07#3 | 3 | 3 | HIT | MATH: lecture int_4^16 e^(-sqrt x)/sqrt(2x) dx, u=sqrt x: dx/sqrt x = 2du, 1/sqrt2 * 2 = sqrt2, bounds 2..4 |
| 17 | ad-s-07#0 | 4 | 4 | HIT | MATH: options reveal e^(-sqrt x)/sqrt(2x); u = sqrt x has derivative 1/(2 sqrt x) present |
| 18 | ad-f-019 | 2 | 2 | HIT | SURFACE: majority family (3 of 5 options are ln-type), guessed integrand sec^2x/tan x; could equally be sec^2x/tan^3x giving -1/(2tan^2x) |
| 19 | ad-s-10#2 | 5 | 5 | HIT | MATH: lecture L-II #11, u=x+4 on [-8,-6] gives -4, -2 |
| 20 | ad-f-046 | 4 | 4 | HIT | SURFACE: could not reconstruct; -12 is the only value whose negation (12) is also listed, and -4 = -12/3 |
| 21 | ad-f-025 | 4 | 2 |  | SURFACE: could not reconstruct; -1/2 and 1/2 look like the two halves of an odd/symmetric integrand, 0 is their signed total, 1 the geometric area |
| 22 | ad-s-05#1 | 4 | 4 | HIT | MATH: lecture L-I #11, -4 e^x dx = -4 du/6 = -(2/3)du |
| 23 | ad-s-10#4 | 3 | 3 | HIT | MATH: lecture L-II #11, [4u - 16 ln/u/]_{-4}^{-2} = 8 + 16 ln 2 (integrand positive, ~19) |
| 24 | ad-s-13#1 | 3 | 3 | HIT | MATH: u = 2 + sqrt x (or sqrt x), du = dx/(2 sqrt x) |
| 25 | ad-s-13#3 | 2 | 2 | HIT | MATH: lecture L-II #4, u=2+sqrt x: dx/sqrt x = 2du, bounds 2..2+sqrt2 |
| 26 | ad-s-03#3 | 2 | 2 | HIT | MATH: lecture L-I #8, int_1^e ln x/x dx = [(ln x)^2/2] = 1/2 |
| 27 | ad-f-035 | 4 | 4 | HIT | MATH: int_0^{pi/3} sin x cos^2 x dx = (1 - 1/8)/3 = 7/24 (-pi^3/81 is the unconverted-bounds twin) |
| 28 | ad-f-026 | 4 | 4 | HIT | MATH: lecture L-I #4, int_{-1}^1 x sqrt(9-x^2) dx: odd integrand / u-bounds 8..8, so 0 |
| 29 | ad-f-039 | 4 | 4 | HIT | MATH: these are antiderivative candidates of sin 2x; d/dx sin^2 x = 2 sin x cos x = sin 2x |
| 30 | ad-s-09#1 | 3 | 3 | HIT | MATH: lecture L-II #3, u = e^t + 1, e^(2t)dt = e^t * e^t dt = (u-1)du |
| 31 | ad-s-11#3 | 5 | 5 | HIT | MATH: t cos(t^2) sin(t^2), u = sin(t^2): t cos(t^2)dt = du/2, bounds 0..1 |
| 32 | ad-f-061 | 4 | 4 | HIT | MATH: power rule x^(n+1)/(n+1) |
| 33 | ad-f-008 | 1 | 1 | HIT | MATH: integrand evidently 1/sqrt(1-4x^2); (1/2) arcsin(2x) |
| 34 | ad-s-06#3 | 1 | 1 | HIT | MATH: lecture L-I #12, 1/sqrt(1-16x^2) gives (1/4) arcsin(4x) |
| 35 | ad-f-024 | 4 | 4 | HIT | MATH: lecture FTC example int_1^4 x^(-1/2) dx = [2 sqrt x] = 2 |
| 36 | ad-s-01#1 | 1 | 1 | HIT | MATH: u = 4 - x^2 gives du = -2x dx |
| 37 | ad-s-04#1 | 4 | 4 | HIT | MATH: u = 9 + x^4 gives du = 4x^3 dx |
| 38 | ad-f-021 | 6 | 6 | HIT | MATH: lecture L-II #14, u = tan(3x^3), du = 9x^2 sec^2(3x^3)dx, -5/9 * u^4/4 |
| 39 | ad-s-06#1 | 4 | 4 | HIT | MATH: u = 4x (for 1/sqrt(1-16x^2)) gives du = 4dx |
| 40 | ad-f-027 | 6 | 6 | HIT | MATH: lecture L-I #7, int_1^3 (2-x)^6 dx = [-(2-x)^7/7] = 2/7 |
| 41 | ad-s-02#2 | 4 | 4 | HIT | MATH: x^2 dx = du/3 with u = x^3+1 |
| 42 | ad-f-057 | 3 | 3 | HIT | MATH: only integrand with the derivative sec^2 x of the inner tan x |
| 43 | ad-s-10#3 | 4 | 4 | HIT | MATH: 4(u-4)/u = 4 - 16/u integrates to 4u - 16 ln/u/ (u negative so /u/ needed) |

Hits: 42/43 (98%). Chance level ≈ 8.2/43 (19%).
An item is "guessable" only if it was a HIT and the reason is a surface feature (form, length, oddness, symmetry). Rewrite those.

**Supplementary answer-blind heuristics (all 121 units; my scripts never see the key when choosing):**
- Medoid (convergence): 74/121 unique hits (61%) vs 19% chance. This is the systemic finding above.
- Longest option: 6/121. Shortest option: 6/121. Both are at or below chance overall. The real length tells are ad-f-041 and ad-f-052 (text options). The raw-LaTeX length hits on ad-f-040 and ad-f-044 are not visible once rendered.
- Generators: recip-power has medoid hits in 20/20 seeds. trig-kx's correct option has the majority sign in 20/20 seeds. exp-kx resists both heuristics (0/20 medoid hits, 6/20 majority-sign).

## Certified
Mathematically certified: I re-derived the correct option, confirmed every distractor is wrong and matches its stated mistake, confirmed the check or expr describes the problem as stated, and verified the results, finals and recaps.
- Flash: ad-f-001 … ad-f-062 (all 62).
- Generators: ad-g-recip-power (n ∈ {2, 4, …, 9}, including the n = 2 display `-\frac{1}{x}`), ad-g-exp-kx (K = ±2 … ±9), ad-g-trig-kx (k = 2 … 9, sin and cos branches).
- Steps: ad-s-01 … ad-s-13, all 56 steps plus all 13 finals.

Of these, the units with no finding of any kind are:
- Flash: ad-f-002, 010, 012, 013, 014, 016, 018, 024, 026, 030, 035, 039, 040, 042, 044, 045, 049, 055, 056, 057, 058, 061.
- Generator: ad-g-exp-kx.
- Steps: ad-s-01#0, 01#3, 02#0, 03#1, 04#0, 04#2, 07#0, 07#4, 09#4, 13#4.

## Uncertain
None. Every stored correct answer agrees with my own derivation. The only numeric discrepancy was ad-s-10#3 `4u − 16 ln u`, an artifact of mpmath's complex logarithm; over the reals, ln u is undefined on [−4, −2], so that option is correctly a distractor.
