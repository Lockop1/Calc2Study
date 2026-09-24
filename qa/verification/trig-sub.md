VERDICT: FAIL (88 blocking issues)

Topic `trig-sub` (prefix `ts`). Verifier: math-verifier (not the author). Files: `content/flash/trig-sub.ts` (ts-f-001…056, no generators), `content/steps/trig-sub.ts` (ts-s-01…10, 50 steps). Authority: Lecture 7 §3.3 (table `ax = b sinθ / tanθ / secθ`, θ intervals, Common Mistakes box). Blind seed 17.

Automated checks: `tests/content.test.ts -t "trig-sub"`: 67 passed. `tests/content-volume.test.ts -t "trig-sub"`: 2 passed.

**Mathematics is clean.** No WRONG_ANSWER, WRONG_CHECK, DISTRACTOR_ALSO_CORRECT or SCOPE findings. I re-derived every stored correct option, `result` line, `final` and check expression by hand. I differentiated every antiderivative, and sympy cross-checked the antiderivatives and definite integrals independently of the repo checker. **Form is not clean.** In the blind test I hit 37/38 against a chance level of about 7/38; 31 of those hits came from surface features alone. The same structure shows up in 57 more units by inspection.

Counts by severity: FORM_LEAK 88 (31 blind-confirmed + 57 post-hoc), WRONG_TAG 4, EXPLANATION 3, MINOR 6.

## Findings

### Systemic root cause (the per-item FORM_LEAK bullets refer to these patterns)
**Hub topology.** Nearly every distractor is the correct option with exactly ONE surface feature mutated. So the correct option is the unique one that has the most common value of every feature. Taking "the majority value per slot" found the answer in 31/31 sampled units built this way. The recurring tells:
- (a) Sign twin: the correct answer and its negative are both present (3cosθ / −3cosθ).
- (b) Coefficient ladder centred on the answer ({k/2, k, 2k}, {1/5, 1, 5}, {1/3, 1, 3}).
- (c) The split-root or `x²±c` twin is built from the correct ratio (x/(x+2) beside x/√(x²+4)).
- (d) In "dx, √" pairs, every option mutates a single slot of the correct pair, so the correct pair is the intersection of the two majority slots.
- (e) Two options are rearrangements of the same true identity, so both must be wrong.

**What resisted the test.** The balanced 2×3 grids (ts-f-001…006, 030) and the reasoning items (032, 042–048).

**Fix recipe:**
- R1: Replace at least two single-slot mutations with upstream mistakes that change two or more features at once (wrong table row, mislabelled triangle, wrong inverse function).
- R2: Every feature value of the correct option should also be shared by a distractor pair. Don't build a sign twin or a coefficient ladder around the correct option unless a distractor gets one too.
- R3: Build split-root / `x²±c` twins from a wrong ratio.
- R4: Use balanced grids where the answer space is a table.

Worked example for ts-f-007: {3cosθ, −3sinθ (wrong row, x = 3cosθ), 3sinθ (not differentiated), cosθ (dropped 3), 3sec²θ, 3secθtanθ}. There is no unique hub. Note for the orchestrator: rule 1 (one mistake per distractor) combined with single-slot edits produces this topology by construction.

### Blocking: guessable in the blind test (HIT with a surface reason), 31
Format: id — FORM_LEAK — tell (blind unit #) — fix.
- ts-f-039 — FORM_LEAK — −√(x²+4)/(4x) is the hub of reciprocal / sec-for-csc (/8) / x+2 / sin x / tan mutations (u1) — R1, R3
- ts-f-025 — FORM_LEAK — (b) (1/5)secθ, secθ, 5secθ plus reciprocal (u2) — R2
- ts-f-017 — FORM_LEAK — sin³θ hub: ÷cosθ, negation, split root, x³ (u3; author-flagged) — R1
- ts-s-04#1 — FORM_LEAK — (d) dx = 3cosθ (4/6) ∩ √ = 3cosθ (3/6) (u4) — R1 (e.g. wrong-row pair dx = −3sinθ dθ, √ = 3sinθ)
- ts-f-052 — FORM_LEAK — (a)+(b) ±, /8x, /2x around −√/(4x) (u5) — R2
- ts-s-07#1 — FORM_LEAK — (d) (u6) — R1
- ts-s-10#3 — FORM_LEAK — (b) secθ, 5secθ, (1/3)secθ (u7) — R2
- ts-f-010 — FORM_LEAK — 3/5 (2/5) ∩ secθtanθ (4/5); same option set as ts-s-10#1 (u8) — R1
- ts-s-05#1 — FORM_LEAK — (d) (u9) — R1
- ts-s-01#3 — FORM_LEAK — secθ/(4tan²θ) with its /2 twin; 4 is the majority constant (u10) — R2
- ts-s-10#4 — FORM_LEAK — ln|5x+√| hub: minus twin, θ version, ln|5x/3| (u11) — R1
- ts-f-021 — FORM_LEAK — (a)+(b) csc², 2csc², 4csc², −2csc² (u12) — R2
- ts-s-10#1 — FORM_LEAK — same set as ts-f-010 (u13) — R1
- ts-s-09#1 — FORM_LEAK — (d) √ = tanθ ∩ dx = secθtanθ (u14) — R1
- ts-s-08#4 — FORM_LEAK — 4arctan(3/2) (3/5) ∩ 24/13 (2/5) (u15) — R2
- ts-s-06#3 — FORM_LEAK — θ/6 (3), sin2θ/12 (2), "+" (3) (u16) — R2
- ts-s-05#0 — FORM_LEAK — "x = 5·" (3) ∩ sin (3) (u17) — R4 (grid as in ts-f-002)
- ts-f-031 — FORM_LEAK (borderline, tie-break) — two argument pairs, and arccos(x/4) reads as the sec→cos slip of arcsec(x/4) (u18) — R4: replace arccos(x/4) with arctan(4/x) to get a balanced {arcsec, arcsin, arctan} × {x/4, 4/x} grid. Never add arccos(4/x): it equals the answer.
- ts-f-012 — FORM_LEAK — (a)+(b) 2secθ, −2secθ, 4secθ, 2cosθ (u19) — R2
- ts-s-09#4 — FORM_LEAK — arcsec x (3/5) ∩ +√(x²−1)/x² (2/5) (u21) — R1
- ts-s-03#3 — FORM_LEAK — hub with ×2, sign, dropped-ln, ln|sec| (u24) — R1
- ts-s-08#0 — FORM_LEAK — u = x²+1 reveals the radicand; x = 2tanθ is the ×2 twin of x = tanθ (u25) — R4
- ts-s-04#4 — FORM_LEAK — −√(9−x²)/x (2) ∩ arcsin(x/3) (3) (u27) — R1
- ts-s-02#2 — FORM_LEAK — sin³θ (5/6) ∩ (−π/6, π/4) (2/6) (u28) — R1
- ts-s-01#1 — FORM_LEAK — sec² (3) ∩ coefficient 2 (3); same set as ts-f-009 (u29) — R1
- ts-f-036 — FORM_LEAK — (c) √(x²+2)/x is the twin of √(x²−2)/x (u30) — R3
- ts-f-019 — FORM_LEAK — (a)+(b) ÷3, ×3, − around cos²/sin² (u31) — R2
- ts-f-026 — FORM_LEAK — b = π/4 (4/6) plus the swapped twin (u33) — R1
- ts-f-033 — FORM_LEAK — "π/2<θ≤π" (3), "tanθ≤0" (3), "−3tanθ" (2) meet only in the answer (u34) — R4
- ts-f-051 — FORM_LEAK — ×1/5 and √(x²+5) twins of ln|x+√(x²+25)| (u37) — R2, R3
- ts-f-020 — FORM_LEAK — (a)+(b) ±(1/3)cos², 3cos², cos² (u38) — R2

### Blocking: same tells found by inspection in unsampled units (post-hoc, not blind), 57
Evidence: all 31 sampled units with this structure were hit.
- Flash (27): ts-f-007 (a)+(b), author-flagged · ts-f-008 (a) ±2/3 pair with 3/2 as reciprocal · ts-f-009 (same set as ts-s-01#1) · ts-f-011 (a)+(b), author-flagged · ts-f-013 (a)+(b) · ts-f-014 (e): 1+tan²=sec² and sec²−1=tan² eliminate each other; the answer shares its LHS/RHS with the two false identities · ts-f-015 (a)+(b) · ts-f-016 middle constant of {2, 4, 8}; its step twin ts-s-01#3 was a blind HIT · ts-f-018 (a) · ts-f-022 every distractor is a one-slot edit of 8cos²θ · ts-f-023 (a) · ts-f-024 (b) {1, 5, 25/9, 1/3, −1}·secθ · ts-f-027 swapped twin + symmetric pairs · ts-f-028 a = 0 (5/6); π/3 is the only repeated b · ts-f-029 (a)+(b) · ts-f-034 (c) x/(x+2) · ts-f-035 (c) x/√(x²+9) · ts-f-037 (c) 5/(x+5) · ts-f-038 (a)+(c) · ts-f-040 (b)+(c) · ts-f-041 (c) · ts-f-049 (b) 25π/2 × {2, 5, 1/5, 1/2, −1} · ts-f-050 4arctan (3/6) ∩ 24/13 (3/6) · ts-f-053 ± grid plus two twins of the answer, author-flagged · ts-f-054 (b) · ts-f-055 arcsec x (5/6) ∩ +√/x² (2/6) · ts-f-056 (a)+(b). All are FORM_LEAK; fix per R1–R4.
- Steps (30): ts-s-01#0, #2, #4, #5 · ts-s-02#0, #1 · ts-s-03#0, #1, #2, #4 · ts-s-04#0, #2, #3 · ts-s-05#2, #3 · ts-s-06#0, #1, #2, #4 · ts-s-07#0, #2, #3, #4 · ts-s-08#1, #2, #3 · ts-s-09#2, #3 · ts-s-10#0, #2. All are FORM_LEAK, with the same tells:
  - (d) pairs: s-02#1, s-08#1
  - majority-slot intersections in substitution choices: s-01#0, s-02#0, s-03#0, s-04#0, s-06#0, s-07#0, s-10#0
  - (a)/(b) around the answer: s-01#2, s-01#4, s-03#1, s-06#1, s-07#3, s-09#3, s-10#2, s-05#3
  - hubs matching blind-HIT flash items: s-01#5 (ts-f-039), s-04#2 (ts-f-019), s-06#2 (ts-f-020), s-07#2 (ts-f-021), s-09#2 (ts-f-023)
  - bounds × integrand intersections: s-05#2, s-08#2
  - two-term antiderivative intersections: s-03#2, s-03#4, s-04#3, s-06#4, s-07#4, s-08#3

### Non-blocking
- ts-f-022 — WRONG_TAG — `8\sin^2\theta` is tagged `algebra-error`, but its why ("sine is the reciprocal of cosecant, not of secant") is exactly `reciprocal-identity-confused` (1/secθ treated as sinθ) — retag.
- ts-f-023 — WRONG_TAG — `2\sin^2\theta`: same → `reciprocal-identity-confused`.
- ts-s-09#2 — WRONG_TAG — `2\sin^2\theta`: same → `reciprocal-identity-confused`.
- ts-f-048 — WRONG_TAG — "Rewrite cos²θ = 1 − sin²θ…" is tagged `even-powers-no-identity` ("tried a u-sub"). No u-sub is involved → `technique-wrong`.
- ts-s-02#4 — MINOR — the `arithmetic-error` fallback is acceptable; no existing tag covers a misremembered special-angle value. Optional: the commoner slip cos(π/6) = 1/2 gives −5√2/12 + 11/24, or propose a tag `special-angle-value-wrong`. (ts-s-08#1's `algebra-error` for tan⁴θ + 1 fits the tag's "expanding" description.)
- ts-f-012 — MINOR — the `2\cos\theta` tag (`pythagorean-wrong`) and its why (a reciprocal mix-up) disagree; align them. `2 - 2\tan\theta` is unrealistic (it needs a split root plus correct |tanθ| handling); use `2\tan\theta + 2`.
- ts-f-011 — EXPLANATION — the 3tanθ why cites the secant identity, which doesn't produce tan² from 1 − sin². Suggest: "Paired 1 − sin²θ with tan²θ; the identity is 1 − sin²θ = cos²θ."
- ts-f-015 — EXPLANATION — the (3/4)secθ why mixes the error with the correct computation. Suggest: "Factored 16x² + 9 = 16(x² + 9/16) and dropped the 16: √(x² + 9/16) = (3/4)secθ."
- ts-f-033 — EXPLANATION — the why for the "−π/2 ≤ θ < 0" option says "range of arcsine", but that range is [−π/2, π/2]. Suggest: "negative angles are what arcsine/arctangent return for negative inputs; arcsec of a number ≤ −1 lies in (π/2, π]."
- ts-f-001–006 — MINOR (rule 1) — each has two double-mistake distractors (wrong form + wrong coefficient):
  - 001: 5x = sinθ / 5x = secθ
  - 002: x = 9tanθ / x = 9secθ
  - 003: x = 2sinθ / x = 2tanθ
  - 004: 3x = 5sinθ / 3x = 5secθ
  - 005: x = 3tanθ / x = 3secθ
  - 006: 4 − 9x² / 9x² − 4

  ts-f-030's arctan(3/x) is the same kind. Recommend keeping them as a logged exception: they complete the balanced grids, which were the only blind-resistant option sets.
- ts-f-030 — MINOR — check `expected: 'asin(x/3)'` is self-referential and verifies nothing. The answer is hand-verified correct. Use `atan(x/sqrt(9-x^2))`, which is equal on (−3, 3).
- ts-s-01#4 — MINOR — `leftover-x-in-u-integral` on −cosθ/(4sinθ) is a loose fit, but no better tag exists.
- Topic-wide — MINOR — about 20 flash items repeat a step with the same or nearly the same options:
  - identical: 009 = s-01#1, 010 = s-10#1
  - near-identical: 013/s-03#1, 016/s-01#3, 018/s-03#2, 019/s-04#2, 020/s-06#2, 021/s-07#2, 023/s-09#2, 024/s-10#3, 026/s-02#2, 027/s-05#2, 039/s-01#5, 049/s-05#3, 050/s-08#4, 053/s-04#4, 054/s-10#4, 055/s-09#4, 056/s-07#4

  Diversify these pairs while doing the FORM_LEAK rewrites.

## Blind-option test
- Sample: 38 of 106 units (36%, seed 17: 21 flash items, 17 steps). I made the guesses before opening either content file and never opened the key.
- Hits: **37/38 (97%)**. Chance level ≈ 7.0/38 (19%).
  - Surface-reason hits (guessable): **31**.
  - Math-reason hits: 5 (ts-f-032, 042, 043, 047, 048).
  - No-cue lucky hit: 1 (ts-f-001, balanced grid).
  - Miss: 1 (ts-f-004, balanced grid).

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | ts-f-039 | 5 | 5 | HIT | SURFACE: centre/intersection - sqrt(x^2+4) numerator (1,5) and 4x denominator (4,5); 3 is its reciprocal, 6 an odd sin x variant |
| 2 | ts-f-025 | 5 | 5 | HIT | SURFACE: centre - 2 and 6 are x1/5 and x5 copies of bare sec(theta); 3 its reciprocal |
| 3 | ts-f-017 | 4 | 4 | HIT | SURFACE: centre - 1 is 4 divided by cos, 2 is 4 negated, 5 mixes x |
| 4 | ts-s-04#1 | 1 | 1 | HIT | SURFACE: intersection - dx=3cos (1,2,5,6) and sqrt=3cos (1,3,4) meet only in 1 |
| 5 | ts-f-052 | 1 | 1 | HIT | SURFACE: centre - 2 sign flip, 3/6 are x1/2 and x2 of 1, 4 reciprocal, 5 drops x |
| 6 | ts-s-07#1 | 4 | 4 | HIT | SURFACE: intersection - dx=2cos (1,2,4) and sqrt=2cos (3,4,5) meet only in 4 |
| 7 | ts-s-10#3 | 1 | 1 | HIT | SURFACE: centre - 2 is x5 and 4 is x1/3 of bare sec(theta) |
| 8 | ts-f-010 | 5 | 5 | HIT | SURFACE: intersection - coefficient 3/5 (1,5) and sec tan (2,3,4,5) |
| 9 | ts-s-05#1 | 5 | 5 | HIT | SURFACE: intersection - dx=5cos (1,2,4,5) and sqrt=5cos (3,5) |
| 10 | ts-s-01#3 | 1 | 1 | HIT | SURFACE: majority - sec/tan^2 form (1,3) with constant 4 (1,2); 3 is the halved-constant twin |
| 11 | ts-s-10#4 | 2 | 2 | HIT | SURFACE: intersection - ln with 5x and sqrt(25x^2-9) and a plus sign; 4 is the minus twin, 5 is the theta version |
| 12 | ts-f-021 | 3 | 3 | HIT | SURFACE: centre - 2 negated, 4 doubled, 6 halved copies of 2csc^2 |
| 13 | ts-s-10#1 | 5 | 5 | HIT | SURFACE: intersection - coefficient 3/5 (3,5) and sec tan (1,2,4,5); same option set as unit 8 |
| 14 | ts-s-09#1 | 2 | 2 | HIT | SURFACE: intersection - sqrt=tan (1,2) and dx=sec tan (2,3,4,5) |
| 15 | ts-s-08#4 | 5 | 5 | HIT | SURFACE: intersection - 4arctan(3/2) (3,4,5) and 24/13 (2,5) |
| 16 | ts-s-06#3 | 3 | 3 | HIT | SURFACE: intersection - theta/6 (3,4,5), sin2theta/12 (3,5), plus sign (1,3,4) |
| 17 | ts-s-05#0 | 2 | 2 | HIT | SURFACE: intersection - 'x = 5 ...' (1,2,5) and sin (2,3,4) |
| 18 | ts-f-031 | 2 | 2 | HIT | SURFACE tie-break (low confidence): arcsin pair (1,5) vs arcsec pair (2,6); arccos(x/4) reads like a sec->cos reciprocal distractor so picked arcsec(x/4) |
| 19 | ts-f-012 | 3 | 3 | HIT | SURFACE: centre - 4sec is x2, -2sec is the sign flip, 2cos the reciprocal slip of 2sec |
| 20 | ts-f-032 | 2 | 2 | HIT | MATH: 1,3,4,5,6 are false statements (cos<0 on (pi/2,pi], x can be negative, sqrt(u^2)=/u/, sin<0 for theta<0, triangle-sign mistake) |
| 21 | ts-s-09#4 | 4 | 4 | HIT | SURFACE: intersection - arcsec x (3,4,5) and +sqrt(x^2-1)/x^2 (1,4) |
| 22 | ts-f-004 | 3 | 4 |  | NO-CUE: perfectly symmetric (5x=3 vs 3x=5, sin/sec/tan twice each); guessed sec only because 25x^2-9 appeared in other sampled units |
| 23 | ts-f-042 | 1 | 1 | HIT | MATH: the IBP option's dv reveals the integrand x/sqrt(x^2+4), whose radicand derivative is present -> u-sub |
| 24 | ts-s-03#3 | 3 | 3 | HIT | SURFACE: centre - 6 is x2, 2 sign flip, 1 wrong ln, 5 drops ln |
| 25 | ts-s-08#0 | 1 | 1 | HIT | SURFACE+inference: u=x^2+1 reveals radicand x^2+1 -> tan with coefficient 1; 5 is the x2 variant (centre). Cannot rule out 3 without the integrand |
| 26 | ts-f-047 | 5 | 5 | HIT | MATH: the IBP option reveals the integrand x/(x^2-16)^(3/2); derivative of x^2-16 is present -> u-sub |
| 27 | ts-s-04#4 | 1 | 1 | HIT | SURFACE: intersection - -sqrt(9-x^2)/x (1,2) and arcsin(x/3) (1,3,5) |
| 28 | ts-s-02#2 | 4 | 4 | HIT | SURFACE: intersection - sin^3 integrand (1-5) and bounds -pi/6..pi/4 (4,6) |
| 29 | ts-s-01#1 | 5 | 5 | HIT | SURFACE: intersection - sec^2 (1,3,5) and coefficient 2 (2,4,5) |
| 30 | ts-f-036 | 1 | 1 | HIT | SURFACE: intersection - sqrt(x^2-2) numerator (1,3) and /x denominator (1,4,6); 4 is the x^2+2 twin of 1 |
| 31 | ts-f-019 | 1 | 1 | HIT | SURFACE: centre - 3 is /3, 6 is x3, 5 negated copies of cos^2/sin^2 |
| 32 | ts-f-043 | 4 | 4 | HIT | MATH: IBP option reveals integrand 1/(x^2 sqrt(x^2+4)); x^2+4 and no x factor for a u-sub -> x=2tan |
| 33 | ts-f-026 | 3 | 3 | HIT | SURFACE: intersection - b=pi/4 (2,3,4,6) and -pi/6 as lower bound; 5 is the swapped twin |
| 34 | ts-f-033 | 4 | 4 | HIT | SURFACE: intersection - pi/2<theta<=pi (1,2,4), tan<=0 (2,4,6), -3tan (4,6) |
| 35 | ts-f-001 | 4 | 4 | HIT | NO-CUE: symmetric (x=5 vs 5x=, sin/sec/tan twice each); guessed tan from x^2+25 seen in units 2/37 |
| 36 | ts-f-048 | 4 | 4 | HIT | MATH: even power of cos needs the half-angle identity; others are wrong strategies |
| 37 | ts-f-051 | 2 | 2 | HIT | SURFACE: intersection - sqrt(x^2+25) (2,3,5,6) and x+sqrt (1,2,5); 5 is the x1/5 twin |
| 38 | ts-f-020 | 6 | 6 | HIT | SURFACE: intersection - cos^2 (1,4,5,6) and 1/3 (1,3,6); 1 is the negated twin |

Hits: 37/38 (97%). Chance level ≈ 7.0/38 (19%).

Guessable ids (31): ts-f-039, ts-f-025, ts-f-017, ts-s-04#1, ts-f-052, ts-s-07#1, ts-s-10#3, ts-f-010, ts-s-05#1, ts-s-01#3, ts-s-10#4, ts-f-021, ts-s-10#1, ts-s-09#1, ts-s-08#4, ts-s-06#3, ts-s-05#0, ts-f-031 (borderline), ts-f-012, ts-s-09#4, ts-s-03#3, ts-s-08#0, ts-s-04#4, ts-s-02#2, ts-s-01#1, ts-f-036, ts-f-019, ts-f-026, ts-f-033, ts-f-051, ts-f-020.

## Certified
- **Mathematically certified: all 106 units, plus the 10 finals.** For ts-f-001…056 and every step of ts-s-01…10, I re-derived the correct option, explanation, `result`, `final` and check expression; all correct. Key values:
  - ∫₋₅⁵√(25−x²) = 25π/2
  - ∫₀^{3/2} 8/(x²+1)² = 4arctan(3/2) + 24/13 ≈ 5.777329
  - Example 7.3 = 3√3/8 − 5√2/12 ≈ 0.060263

  I differentiated these antiderivatives by hand and confirmed them:
  - −√(x²+4)/(4x)
  - −√(9−x²)/x − arcsin(x/3)
  - ln|5x+√(25x²−9)|
  - arcsec x + √(x²−1)/x²
  - −2√(4−x²)/x
  - x√(x²−2)/2 + ln|x+√(x²−2)|
  - (1/6)arcsin 3x + (x/2)√(1−9x²)
  - ln|x+√(x²+25)|
  - every θ-antiderivative in the steps

  θ-intervals and signs, including the x < 0 cases in ts-f-012/029/033/038, follow the lecture. Every distractor is genuinely wrong, and no two distractors differ only by a constant.
- **Certified with no blocking issue (18):** ts-f-001, 002, 003, 004, 005, 006, 030, 032, 042, 043, 044, 045, 046, 047, 048; ts-s-02#3, ts-s-02#4, ts-s-09#0.

## Uncertain
- No correctness disagreement with any stored answer.
- Judgement calls:
  - (1) The 57 post-hoc FORM_LEAKs were judged after reading the content, not blind.
  - (2) ts-f-042/044/047 ("most efficient"): a trig sub also works. For example, in 042 x = 2tanθ gives ∫2secθtanθ dθ = √(x²+4) quickly. I judged it not DISTRACTOR_ALSO_CORRECT because the prompt asks for the most efficient method and the lecture objective is to distinguish trig sub from u-sub.
  - (3) ts-f-031 is counted as guessable although my blind reason was a low-confidence tie-break between two option pairs.
