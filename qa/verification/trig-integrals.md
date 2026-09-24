VERDICT: FAIL (36 blocking issues)

Topic `trig-integrals` (Lecture 6, §3.2). Verified: `content/flash/trig-integrals.ts` (65 flash items, 2 generators) and `content/steps/trig-integrals.ts` (10 problems, 43 steps). Verifier: math-verifier instance that did not author these files.

**Automated checks.** `npx vitest run tests/content.test.ts -t "trig-integrals"`: 78/78 pass (aggregate, 65 flash, 2 generators, 10 steps). `tests/content-volume.test.ts`: 2/2 pass.

**Independent re-derivation.** I derived every answer, step result and final by hand (case per the decision guide, identity, substitution, back-substitution), then confirmed with sympy against integrands I typed from the prompts, not the stored `check` fields:
- **Antiderivatives:** differentiated every one.
- **Definite values:** evaluated exactly.
- **Identities:** checked at random points.
- **u-integrals:** checked that f(g(x))·g′(x) equals the original integrand.
- **Integration-by-parts equations** (ti-s-05#1–#3): checked with derivative semantics, meaning d/dx of the right-hand side equals sec³x.
- **Generators:** checked seeds 1–400. That covers every (sin/cos, k = 2..6) family and all 20 (m, n) pairs.

Result: **0 wrong answers, 0 wrong checks, 0 distractors that are also correct, 0 scope problems.** All 36 blocking issues are form leaks.

## Findings

### Blocking (FORM_LEAK)

- ti-s-02#0, ti-s-03#0, ti-s-04#0, ti-s-08#0, ti-s-09#0 (blind-test hits) and ti-s-05#0, ti-s-06#0, ti-s-07#0, ti-s-10#1 (same tell, found by inspection) — FORM_LEAK — **Unique case-label prefix.** Only the correct strategy option starts with a justification clause, for example "Both powers are even: use the half-angle identities", "Odd power of tangent: save sec x tan x…", "Only tangent: write…", "Odd power of cosine: save one cos 5t…, with du = 5cos 5t dt". No distractor has one. The prefix alone gives the answer (5/5 blind hits). In ti-s-05#0, ti-s-07#0 and ti-s-10#1 the correct option is also the longest. — Fix: remove the prefixes and put the case name in `explanation`/`result` only. Alternatively, give every option a prefix, with wrong case labels on the distractors. The flash technique items ti-f-049…056 have no prefixes and were not guessable, so use them as the model.
- ti-s-07#2 — FORM_LEAK — **Longest option.** Only this option has a follow-up clause ("…, then tan²x = sec²x − 1"). ti-f-054 has the same option set without the clause and was not guessable. — Fix: drop the clause or add parallel clauses to the distractors.
- **Systemic centre pattern** (26 blind-test hits): ti-f-065, ti-f-004, ti-f-018, ti-s-08#3, ti-s-09#4, ti-s-08#2, ti-f-005, ti-s-03#1, ti-f-034, ti-s-09#2, ti-s-07#1, ti-f-011, ti-f-032, ti-f-061, ti-s-06#1, ti-s-10#0, ti-f-020, ti-f-033, ti-s-07#3, ti-f-017, ti-s-04#1, ti-f-051, ti-s-06#3, ti-s-02#2, ti-s-05#2, ti-f-057 — FORM_LEAK.
  - **What is wrong:** each distractor changes exactly one feature of the key (sign, coefficient ×½ or ×2, angle, function, a dropped term). The key is then the unique option that shares the majority value of every feature, or the intersection of two feature groups.
  - **Example, ti-s-09#4:** the other options each change one thing: drop the middle term, angle t instead of 2t, omit the ½, flip all signs.
  - **Example, ti-s-08#3:** 3π/16, 3π/4 and −3π/8 are ×½, ×2 and −1 copies of 3π/8, and 3/8 drops π.
  - **Scale:** a crude token-overlap centroid run over all 108 units picks the key in 55 (chance ≈ 20), so the pattern extends beyond the 35% sample.
  - **Fix:** in each item replace 1–2 distractors with second-order mistakes, for example a sign error combined with a missing ½, or a mutation of a distractor. The key must stop being the unique centre. ti-f-026 and ti-s-06#4 already do this; there the majority option is a wrong answer, and neither was guessable.

### Non-blocking

- ti-f-029 (option −⅙cos⁶x + C) — WRONG_TAG — the `why` says sec⁵x was read as cos⁵x, which is a reciprocal-identity mistake. Tag is `algebra-error`. — Retag to `reciprocal-identity-confused`.
- ti-f-064 (the "Neither is right: only −¼cos 2x" and "They cannot agree" options) — WRONG_TAG — both reject a correct antiderivative that differs by a constant. Tag is `plus-c-misuse`. — Retag to `antiderivative-not-unique`.
- ti-s-08#3 (option 3/8) — WRONG_TAG — tag is `power-rule-int-exponent`, but the `why` says ∫(3/8)dt was not integrated. — Retag to `constant-not-integrated`. The `why` could also note the more likely source: taking the average value 3/8 without multiplying by the interval length π.
- ti-s-09#0 (option "save one sin 2t and let u = cos t") — WRONG_TAG — the substitution angle does not match the saved factor. Tag is `u-choice-wrong`. — Retag to `angle-mismatch`.
- ti-s-03#3 (option ⅓tan³x + C) — WRONG_TAG — ∫1 du was written as 1 and absorbed into C. Tag is `algebra-error`. — Retag to `constant-not-integrated`.
- ti-f-007 ((1 − cos 6x)/6), ti-f-042 (3π/16), ti-s-08#3 (3π/16, 3π/4) — WRONG_TAG — `inner-constant-factor-missing` describes a missing 1/k when integrating f(kx). These options instead apply an extra 1/k or k to an identity or constant term. — Retag to `coefficient-mishandled`.
- ti-f-050 (du = cos 3x dx), ti-s-10#1 (du = cos 5t dt), ti-s-09#2 (du = −sin 2t dt; du = −½sin 2t dt), ti-f-063 (−du; −2du) — WRONG_TAG — these are du computed with the wrong constant, not an integration slip. — Retag to `du-constant-wrong` (or `chain-rule-missing` for du = −sin 2t dt).
- ti-f-004 (option (1 + sin 2x)/2) — WRONG_TAG (minor) — this is a wrong half-angle identity (sin in place of cos). — Retag `double-angle-wrong` → `half-angle-wrong`.
- ti-s-09#4 (option −⅙cos³2t + 1/14 cos⁷2t, `algebra-error`) — EXPLANATION — the `why` says "the −2u⁴ term was lost". Dropping −2u⁴ from u² − 2u⁴ + u⁶ gives −½(u³/3 + u⁷/7) = −⅙cos³2t − 1/14 cos⁷2t, which is not this option. The listed option comes from squaring term by term, (1 − u²)² → 1 − u⁴, which gives −½(u³/3 − u⁷/7). — Change the `why` to "(1 − u²)² was squared term by term as 1 − u⁴".
- ti-s-07#1 (option ∫(sec⁷x − sec³x)dx) — EXPLANATION — the `why` says "the middle term −2sec⁵x is missing". Dropping only the middle term gives sec⁷x + sec³x. The option comes from (sec²x − 1)² → sec⁴x − 1. — Rephrase the same way as ti-f-035's `why`, which states the wrong expansion.
- ti-s-03#2 (option ∫(u² + 1)u² du, `du-derivative-wrong`) — EXPLANATION — the `why` does not say how the option arises: the saved sec²x was counted again as tan²x = u². — Suggest `exponent-arithmetic` with a concrete `why`.
- ti-f-042 (distractor "0") — MINOR — not contrived enough to block. It is the same mistake as ti-f-039's "0": the power rule without du, e.g. cos⁵(2t)/10, gives equal values at 0 and π. It is easy to rule out for a nonnegative integrand. — Name the bogus antiderivative in the `why`, or replace it with a more attractive value.
- ti-s-01#0 — MINOR — two options carry a case prefix (the key and "The cosine power is even: save one cos x…"). This is a weaker version of the prefix tell. — Remove both prefixes when fixing the prefix finding.

### Confirmed correct (no finding)

- **ti-f-036:** the prompt fixes "Save one sec²x and use u = tan x". The equivalent u = sec x form ⅛sec⁸x − ⅙sec⁶x (it differs by −1/24) is not an option. Its back-substitution distractor ⅛sec⁸ + ⅓sec⁶ + ¼sec⁴ is genuinely wrong.
- **Other equivalent forms are absent from the options:** ln|sec x| in ti-f-012; ½sec²x + ln|cos x| in ti-f-025; −½cos²x and −¼cos 2x in ti-f-030. In ti-f-061 the prompt fixes u = sin x.
- **ti-s-07:** stops at ∫sec⁷ − 2∫sec⁵ + ∫sec³, like Example 6.8. The statement says "Reduce to…", and the final check (d/dx of the final equals tan⁴x sec³x) is honest.
- **Scope:** everything matches Lecture 6. The lecture's Level II problems include IBP (ti-f-038), ∫√cos θ sin³θ (ti-f-037) and sin x sec⁵x (ti-f-029). ti-s-10's identity cos 2θ = 2cos²θ − 1 follows from the lecture's double-angle and Pythagorean identities.
- **Self-referential checks, verified by hand:** ti-f-057…061, ti-f-063, ti-s-01#2, ti-s-03#2, ti-s-04#2, ti-s-09#2, ti-s-09#3.

## Blind-option test

- **Sample:** seed 19, 39 of 110 units (35%).
- **Result:** 39/39 hits; chance ≈ 7.5/39 (19%).
- **Guessable:** 32. These are the hits whose reason was a surface cue: 5 unique prefix, 1 longest, 26 centre/intersection.
- **Math hits (not guessable):** 7 — ti-f-054, ti-f-026, ti-f-013, ti-f-064, ti-f-050, ti-s-06#4, ti-f-056.

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | ti-s-04#0 | 1 | 1 | HIT | SURFACE: only option carrying a case-label justification prefix ('Odd power of tangent:'); 3 is also a valid pairing, so no math can separate 1 from 3 without the integrand. |
| 2 | ti-f-065 | 5 | 5 | HIT | SURFACE: 3 of 5 options share the 'Write tan^2 = ...; sec^3 reappears' template; among them 5 is the centroid (sec^2 first like 4, minus like 2). Math agrees: tan^2 = sec^2 - 1. |
| 3 | ti-f-054 | 1 | 1 | HIT | MATH: options reveal int sec^5 x (u^5, sec^3*sec^2); odd secant power alone -> IBP with u = sec^3, dv = sec^2 (Table 3). Surface: IBP swap pair 1/5 ties. |
| 4 | ti-s-02#0 | 2 | 2 | HIT | SURFACE: only option with a case-label prefix ('Both powers are even:'). Math agrees (options imply sin^2 x cos^2 x). |
| 5 | ti-f-004 | 5 | 5 | HIT | SURFACE: centroid - every other option differs from 5 in exactly one feature (no /2, cos x, sin 2x, minus). Math agrees (half-angle identity). |
| 6 | ti-f-018 | 6 | 6 | HIT | SURFACE: centroid - 2,3 are sign variants, 5 swaps cos->sin, 1 drops the 1/3 term; 4 is a 3-term outlier. Math (sin^3 x cos^2 x) agrees. |
| 7 | ti-f-026 | 3 | 3 | HIT | MATH: options imply int cos^2(2x) = x/2 + sin4x/8 (plus-sign majority rules out sin^2). Surface centroid is 2 (x/2 + sin4x/4), a decoy. |
| 8 | ti-f-013 | 1 | 1 | HIT | MATH: int sec x = ln/sec x + tan x/ (formula recall). Surface ties 1 vs 3 (ln/sec +/- tan/). |
| 9 | ti-s-08#3 | 2 | 2 | HIT | SURFACE: centroid value - 3pi/16 and 3pi/4 are x1/2 and x2 of 3pi/8, -3pi/8 its negative, 3/8 drops pi. Cannot infer the integral. |
| 10 | ti-s-09#4 | 1 | 1 | HIT | SURFACE: centroid - 2 drops the middle term, 3 changes angle 2t->t, 4 omits the 1/2, 5 flips all signs. Math (sin^5 2t cos^2 2t) agrees. |
| 11 | ti-s-08#2 | 4 | 4 | HIT | SURFACE: centroid - 3/8 (1,3,4), 1/2 cos4t (2,3,4), +1/8 cos8t (2,4) meet only in 4. Math (cos^4 2t expansion) agrees. |
| 12 | ti-f-005 | 1 | 1 | HIT | SURFACE: intersection - coefficient 1/2 (1,3,5) and sin 2x (1,2,4) meet only in 1. Math agrees. |
| 13 | ti-s-03#1 | 1 | 1 | HIT | SURFACE: centroid - (tan^2+1) shared with 4, sec^2 with 2,3,5; each other option is one mutation. Math agrees (sec^2 = tan^2 + 1). |
| 14 | ti-f-034 | 1 | 1 | HIT | SURFACE: centroid - 2,3,4 vary the coefficient/sign of -4/3 cos^3(x/2), 5 swaps cos->sin. Math (sin x cos(x/2) = 2 sin(x/2)cos^2(x/2)) agrees. |
| 15 | ti-s-09#2 | 1 | 1 | HIT | SURFACE: centroid - minus (1,3,4,5), factor 2 (1,2,4), sin 2t (1,2,3,5) meet only in 1. Math (u = cos 2t) agrees. |
| 16 | ti-s-07#1 | 5 | 5 | HIT | SURFACE: centroid - sec^7 (1,3,4,5), -2sec^5 (4,5), +sec^3 (3,5) meet in 5. Math ((sec^2-1)^2 sec^3) agrees. |
| 17 | ti-f-064 | 3 | 3 | HIT | MATH: -1/2cos^2 x = 1/2 sin^2 x - 1/2 is a true identity, so both antiderivatives of sin x cos x are correct; every other statement is false. |
| 18 | ti-f-011 | 6 | 6 | HIT | SURFACE: centroid - every other option is one mutation of (1+cos t)/2 (/4, t/4, no /2, minus, 2t). Math (cos^2(t/2)) agrees. |
| 19 | ti-f-032 | 6 | 6 | HIT | SURFACE: centroid - 2/3 (3,4,5,6), sin (1,2,3,5,6), + then - (1,2,4) meet in 6. Math (cos^3(t/2) sin^2(t/2)) agrees. |
| 20 | ti-f-061 | 5 | 5 | HIT | SURFACE: intersection - u^3 (2,3,4,5) and (1-u^2) (1,2,5) with single power meet in 5. Math (sin^3 cos^3 with u = sin x) agrees. |
| 21 | ti-s-08#0 | 1 | 1 | HIT | SURFACE: only option with a case-label prefix ('Only an even power of cosine:'). Math agrees (cos^4 2t -> half-angle). |
| 22 | ti-s-06#1 | 5 | 5 | HIT | SURFACE: centroid - int tan^2 sec^2 first (1,2,5), minus (2,3,4,5), int tan^2 second (1,5) meet in 5. Math (tan^4 = tan^2(sec^2-1)) agrees. |
| 23 | ti-s-10#0 | 4 | 4 | HIT | SURFACE: centroid - 2cos^2 5t (1,4,5) with a minus 1 (5 is its negative, 1 its sign twin). Math agrees (cos 2A = 2cos^2 A - 1). |
| 24 | ti-s-07#2 | 1 | 1 | HIT | SURFACE: longest / most complete option (only one with a 'then tan^2 = sec^2 - 1' clause). Math (sec^5 -> IBP) agrees. |
| 25 | ti-f-020 | 5 | 5 | HIT | SURFACE: centroid - tan x (1,4,5), -x (2,5); 1 is its negative, 4 its sign twin. Math (int tan^2 = tan x - x) agrees. |
| 26 | ti-f-033 | 4 | 4 | HIT | SURFACE: centroid - sin^4 (1,4,6) with the middle coefficient 1/2 (1/4, 2 are its x1/2, x4 variants). Math (sin^2 x sin 2x = 2 sin^3 x cos x) agrees. |
| 27 | ti-f-050 | 5 | 5 | HIT | MATH: twins 2/5 differ only in du; d(sin 3x) = 3cos 3x dx. Majority 'save one cos 3x' narrows to 2/5. |
| 28 | ti-s-07#3 | 2 | 2 | HIT | SURFACE: centroid - 1/2 sec tan (2,4,5), + (1,2,5), ln/sec+tan/ (1,2,4) meet only in 2. Math (int sec^3) agrees. |
| 29 | ti-f-017 | 5 | 5 | HIT | SURFACE: centroid - 2 is its negative, 3 a sign twin, 6 drops 1/3, 1/4 are cos analogues. Math (int cos^3) agrees. |
| 30 | ti-s-03#0 | 4 | 4 | HIT | SURFACE: only option with a case-label prefix ('Even power of secant:'). |
| 31 | ti-s-04#1 | 5 | 5 | HIT | SURFACE: intersection - (sec^2 - 1) (2,4,5) and sec^2 middle factor (1,3,5) meet only in 5. Math (tan^3 sec^3) agrees. |
| 32 | ti-f-051 | 4 | 4 | HIT | SURFACE: intersection - (1 - ...) (1,4) and half-angle expand (3,4) meet only in 4. Math (sin^4 x) agrees. |
| 33 | ti-s-06#3 | 3 | 3 | HIT | SURFACE: same option set as unit 25; centroid tan x - x. Math agrees. |
| 34 | ti-s-06#4 | 4 | 4 | HIT | MATH: int tan^4 = 1/3 tan^3 - tan + x. Surface per-feature majority gives 3 (-x), a decoy. |
| 35 | ti-s-09#0 | 5 | 5 | HIT | SURFACE: only option with a case-label prefix ('The sine power is odd:'). |
| 36 | ti-s-02#2 | 1 | 1 | HIT | SURFACE: centroid - 1/8(1 +/- cos) form (1,2,5), cos 4x (1,3,4,5), minus (1,2,3,4) meet in 1. Math (sin^2 cos^2 = 1/8(1 - cos4x)) agrees. |
| 37 | ti-s-05#2 | 1 | 1 | HIT | SURFACE: centroid - '- int sec^3' (1,2,4) and '+ int sec' (1,3) meet only in 1. Math agrees. |
| 38 | ti-f-056 | 3 | 3 | HIT | MATH: twin pair 3/5 (longest options) differ only in the identity; tan^2 = sec^2 - 1 picks 3 (tan^2 sec^3, even tan / odd sec). |
| 39 | ti-f-057 | 6 | 6 | HIT | SURFACE: intersection - u^2 prefactor (2,3,6) and (u^2 - 1) (1,4,6) meet only in 6. Cannot tell which of the lecture's three integrals it is. |

Hits: 39/39 (100%). Chance level ≈ 7.5/39 (19%).
An item is "guessable" only if it was a HIT and the reason is a surface feature (form, length, oddness, symmetry). Rewrite those.

Guessable ids (FORM_LEAK):
- **Prefix (5):** ti-s-04#0, ti-s-02#0, ti-s-08#0, ti-s-03#0, ti-s-09#0
- **Longest (1):** ti-s-07#2
- **Centre (26):** ti-f-065, ti-f-004, ti-f-018, ti-s-08#3, ti-s-09#4, ti-s-08#2, ti-f-005, ti-s-03#1, ti-f-034, ti-s-09#2, ti-s-07#1, ti-f-011, ti-f-032, ti-f-061, ti-s-06#1, ti-s-10#0, ti-f-020, ti-f-033, ti-s-07#3, ti-f-017, ti-s-04#1, ti-f-051, ti-s-06#3, ti-s-02#2, ti-s-05#2, ti-f-057

## Certified

I re-derived these myself and found them mathematically correct: answers, step results, finals and check expressions. The form-leak findings above still apply.

- **Flash:** ti-f-001 … ti-f-065 (all 65).
- **Generators:**
  - ti-g-half-angle-kx: sin²(kx) and cos²(kx), k = 2..6. The key x/2 ∓ sin(2kx)/(4k) is correct and all 5 distractors are distinct for every k.
  - ti-g-sincos-strategy: all 20 (m, n) pairs. The key follows the decision guide (odd sine, then odd cosine, then both even). No pair has both powers odd.
- **Step problems:** ti-s-01 (#0–#3), ti-s-02 (#0–#3), ti-s-03 (#0–#3), ti-s-04 (#0–#3), ti-s-05 (#0–#4), ti-s-06 (#0–#4), ti-s-07 (#0–#3), ti-s-08 (#0–#3), ti-s-09 (#0–#4), ti-s-10 (#0–#3), plus all 10 finals.
- **Key values:**
  - Definite integrals: π/2; π/4 − 2/3; ½ − ½ln 2; 3π/8; 9π/4 − 4; 1/11 + 2/9 + 1/7; 2/3; 4/3; 7/3; 2/15.
  - ti-s-10: 4/15, then 1/15.
  - Antiderivatives: ∫sec³x = ½sec x tan x + ½ln|sec x + tan x|; ∫tan⁴x = ⅓tan³x − tan x + x; ∫sin⁵(2t)cos²(2t) dt = −⅙cos³2t + ⅕cos⁵2t − 1/14 cos⁷2t.

## Uncertain

None. My derivations agree with every stored answer.
