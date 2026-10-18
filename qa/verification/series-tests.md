# series-tests (topic 14) — math-verifier report (full)

**VERDICT: flash file PASS WITH FIXES (40 units: 26 ok, 14 fixed, 0 wrong answers). Steps file PASS WITH FIXES (9 problems / 28 steps: 13 steps ok, 15 fixed, 0 wrong answers, all 9 finals ok).**

Coverage: the previous verifier certified st-f-001 … st-f-013; its list is kept below. This pass re-checked the five items the typist edited (007, 008, 010, 011, 012). It verified st-f-014 … st-f-037, the three generators (seeds 1..8) and all nine step problems in full, plus the scope sweep, a fresh blind test and the medoid scan. Every verdict was re-derived under the spec's exact test statements.

Issues found and fixed: 4 DISTRACTOR_ALSO_CORRECT (all by wording), 10 FORM_LEAK / blind-guessable units, 17 WRONG_TAG, 12 EXPLANATION (one of them a false claim inside an option), 2 tautological step checks, 1 text bug.

## Checks (after edits)
- `npx tsc -p tsconfig.json --noEmit`: clean
- `npx vitest run tests/content.test.ts -t "series-tests"`: 50/50 pass
- `npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts`: 76/76 pass
- `npx tsx scripts/medoid-scan.ts series-tests`: **edit 10.0 %, bigram 15.3 %** (before: 11.9 % / 12.8 %). Both are ≤ 30 %.

## Flash items
| id | verdict |
|---|---|
| st-f-001 … 006, 009, 013 | ok (certified by the previous instance; see the list below) |
| st-f-007 | ok. Re-checked the edit: $a_n\to e\ne0$, so it diverges. The retag to `sb-sequence-vs-series` is right. $(1+1/n)^n<e$, so the "below $\sum e$" option is a true bound with the wrong direction. |
| st-f-008 | ok. Re-checked the edit: "as stated in class" resolves the also-correct concern, and each why now names exactly what was dropped or added. |
| st-f-010 | ok. Re-checked the edit: $\cos 2,\cos 3,\cos 4<0$, so the terms are not positive. The new option "$\cos x/x$ is not continuous on $[1,\infty)$" is false ($x\ne0$ there), and its why is accurate. No verdict on $\sum\cos n/n$ is given; no alternating or absolute content. |
| st-f-011 | fixed. The option "Yes: $f'=-xe^{-x}$, but only for $x\ge2$" contradicted its own derivative; it is now "Yes: $f'(x)=-xe^{-x}\le0$ for $x\ge1$" (product-rule slip, right verdict). The chain-rule option's why no longer claims a sign misreading that the option does not contain. |
| st-f-012 | fixed. The why for $\frac{3}{e}$ ("added $\frac2e$ and $\frac1e$") named no real computation. Replaced by $0$ (`ibp-sign-error`): with $uv+\int v\,du$ the antiderivative is $(1-x)e^{-x}$, and $[(1-x)e^{-x}]_1^\infty=0$. The other options re-checked: $-\frac2e$ is the FTC swap; $-\frac1e$ is $v$ sign + stopped early; $\frac1e$ is stopped early. |
| st-f-014 | ok. The sum is ≈ 2.11 and $\frac1{\ln2}$ ≈ 1.44; $S_2=\frac1{2\ln^2 2}$ ≈ 1.04. |
| st-f-015 | fixed tag. $\ln(t\ln t)-\ln(2\ln2)$: `ln-misapplied` → `ln-argument-wrong`. |
| st-f-016 | fixed. $\frac\pi2$ ("forgot to subtract $\arctan1$"): `inverse-trig-value-wrong` → `ftc-not-subtracted`. $-\frac{3\pi}4$ had a contrived why; it is now $\lim\arctan t=-\frac\pi2$ (`im-limit-evaluated-wrong`). The why for $-\frac\pi2$ now matches its tag ($\arctan1$ taken as $0$, plus the swap). The sum is ≈ 1.077, as stated. |
| st-f-017 | fixed. The option "$\int_0^\infty\frac{x}{x^2+1}dx=\frac\pi4$" had a why whose route gives $\frac\pi2$, so no slip produced it. Replaced by "$\int_1^\infty\ldots=\infty$, so the series converges" (`st-wrong-inference`). $f'=\frac{1-x^2}{(x^2+1)^2}\le0$ on $[1,\infty)$. |
| st-f-018 | ok |
| st-f-019 | fixed. (1) The $p=3$ option was tagged `exponent-arithmetic`; it is now `st-wrong-p`. (2) Blind leak: the p-rule distractor repeated the correct $p=\frac32$. It is now "$p=3$, so the series diverges" (root ignored + rule backwards, both named). |
| st-f-020 | ok |
| st-f-021 | fixed. Same repeated-$p$ leak. "$p=\frac23<1$, converges" → "$p=\frac32>1$, so the series diverges" (inverted + backwards). |
| st-f-022 | fixed. $\sum\frac1n$ appeared in 3 options, including both invalid inferences. Those two now use $\frac1{\sqrt n}$ (wrong $p$ + backwards) and $\frac1{n^{3/2}}$ (numerator ignored + divergence-test converse). |
| st-f-023 | ok |
| st-f-024 | ok. $\frac1{n^2+1}\ge\frac1{2n^2}\iff n^2\ge1$, a true bound in the wrong direction. |
| st-f-025 | ok |
| st-f-026 | fixed (DISTRACTOR_ALSO_CORRECT by wording). Under "Which direct-comparison conclusion is right?", the option "No conclusion: $<\frac2n$ and $\sum\frac2n$ diverges" is a correct statement about that comparison. The prompt is now "Which direct comparison correctly settles this series?". The why notes that the bound has equality at $n=1$. |
| st-f-027 | fixed. The same prompt issue ("No conclusion: $a_n<\frac1n$ …" was true), now "settles". The why for the $r=\frac12$ option now names both slips. |
| st-f-028 | ok. $\ln n>1$ for $n\ge3$ and $\ln n<\sqrt n$. No "No conclusion" option is a true statement. |
| st-f-029 | fixed. (1) The why for "$a_n\ge\frac1{n^2}$" said "true", but it fails at $n=1$; it now says "holds for $n\ge2$". (2) Blind-guessable (anti-hub): the duplicate wrong-direction option was replaced by the false bound "$a_n\ge\frac2n$" (`algebra-error`). Check: $\sqrt{n^2+1}\le2n\iff3n^2\ge1$. |
| st-f-030 … 036 | ok. Re-derived: 031 $L=\ln n\to\infty$; 032 $\frac{\ln n}{\sqrt n}\to0$; 033 $\frac1{\ln n}\to0$, inconclusive; 034 $b_n=n^{-3/2}$, $L=1$; 035 $L=\frac32$ ($2n^3-n>0$); 036 $\frac{\sqrt n}{\ln n}\to\infty$, while against $\frac1{\sqrt n}$ $L\to0$ and against $n^{-3/2}$ $L=\frac{n}{\ln n}\to\infty$. |
| st-f-037 | fixed tags. "$\frac1{n^2}$: $L=0$, converges" is a valid inference from a wrong limit (it is $\infty$): `st-lct-boundary` → `st-lct-limit-wrong`. "$\frac1n$: $L=0$, divergent ⇒ converges": `st-wrong-inference` → `st-lct-boundary`. |
| st-g-p-series | fixed. (1) The repeated-$p$ leak held at every seed. The p-rule distractor is now the inverted $p$ with the rule backwards, with both slips named. (2) Text bug "3th root" → "cube root". Seeds 1–8 re-derived: $p=\frac32,\frac23,\frac52,\frac34,\frac43,\frac25,\frac53,\frac35$; converges iff $m>k$. |
| st-g-lct-rational | fixed. (1) DISTRACTOR_ALSO_CORRECT at every seed: "$b_n=\frac1{n^b}$, $L=\infty$: no conclusion" and "$b_n=\frac1{n^{a+b}}$, $L=\infty$: no conclusion" are true statements. The prompt is now "…which choice of $b_n$, value of $L$ and conclusion settles the series?". (2) The correct $L$ was the majority value; the boundary distractor now uses the inverted $L$ (two slips, named). Seeds 1–8 re-derived: $L=\frac32$ div, $\frac43$ conv, $\frac34$ conv, $\frac13$ div, $\frac52$ div, $\frac25$ conv, $\frac27$ conv, $\frac53$ conv. |
| st-g-comparison-direction | ok. Seeds 1–8: every inequality holds for $n\ge1$, and each conclusion follows the direction rule. The true (direction, $\sum b_n$) pair is the majority feature, but both facts are given in the prompt, so this is not a leak. |

## Steps
| step | verdict |
|---|---|
| st-s-01 #0, #1 / #2 | ok / fixed tag: "converges to 1, the first term": `sb-partial-sum-formula` → `sb-no-information` |
| st-s-02 #0, #2 / #1 | ok / fixed: the why for $p=1$ now names the slip ($\sqrt n$ treated as $n$) |
| st-s-03 #0 | fixed FORM_LEAK: the correct option was the only long flowchart sentence; it is now "Compare with $b_n=\frac1n$", and the reasoning moved into the explanation |
| st-s-03 #1, #2 | ok (minor: the whys for "$\lim\frac1n=0$" and "$L=1$" are weak) |
| st-s-04 #0 | fixed FORM_LEAK: the correct option carried a justification clause; it is now bare |
| st-s-04 #1, #2 | ok |
| st-s-05 #0 | fixed tag: "$L=0$ with $\sum\frac1n$ convergent": `st-lct-boundary` → `st-p-rule-wrong` |
| st-s-05 #1 | fixed. Length tell (blind): the options are now full sentences on $[2,\infty)$, including a parallel decoy "decreasing fails ($x\ln x$ increasing ⇒ $f$ increasing)". The weak "decreasing is not needed" option was dropped. Medoid 0/0. |
| st-s-05 #2 | fixed. The check was tautological (lhs = the answer); it is now `integral(1/(x*log(x)), x, 2, t)`. "$\ln(\ln t)-\ln2$" retagged `bounds-not-converted`. |
| st-s-05 #3 | fixed tag: "the sum is ∞": `st-wrong-inference` → `sb-no-information` |
| st-s-06 #0 | ok |
| st-s-06 #1 | fixed (DISTRACTOR_ALSO_CORRECT by wording): "$<\frac1n$ … diverges: no conclusion" is a valid comparison. The prompt "Which comparison is valid?" is now "Which comparison settles the series?". |
| st-s-06 #2 | fixed tags: "converges to $\sum\frac1{n^2}$" and "… $-1$": `st-sum-equals-integral` → `sb-no-information` |
| st-s-07 #0, #1 | ok |
| st-s-07 #2 | fixed. "Converges to $\frac12$, its first term" was false ($a_1=\frac13$); it now reads $\frac13$. Tags: "by the divergence test" → `sb-divergence-test-converse`; the other two value claims → `sb-no-information`. |
| st-s-08 #0 | fixed FORM_LEAK (blind-guessed): it was the only option showing $\frac{n}{n^3}=\ldots$; it is now bare "$b_n=\frac1{n^2}$" |
| st-s-08 #1 | ok ($\frac{n^3+n^2}{n^3+2}\to1$). Blind plausibility hit; see residuals. |
| st-s-08 #2 | fixed tag: "the sum is $\sum\frac1{n^2}$" → `sb-no-information` |
| st-s-09 #0 | fixed tag and why: $(1+2x^2)e^{-x^2}$ comes from dropping the minus of the inner derivative, not from a missing product-rule term (→ `sign-error-derivative`) |
| st-s-09 #1 | fixed. The check was tautological; it is now `integral(x*exp(-x^2), x, 1, t)` |
| st-s-09 #2 | ok. $a_1=\frac1e>\frac1{2e}$, so "the sum is at most $\frac1{2e}$" is false; the sum is ≈ 0.405. |
| finals (all 9) | ok: verdicts, checks and recaps re-derived |

## Blind-option test (seed 53; drawn before reading the content files)
24 of 68 units (35 %). **Hits: 23/24 (96 %)**; chance level ≈ 4.7/24.

Surface-guessable hits (5), by sample unit:
- Unit 2, st-s-08#0: form leak (the only option showing the computation). **Rewritten.**
- Unit 19, st-f-029: anti-hub pick after logical elimination. **Rewritten.**
- Unit 23, st-g-p-series:1: the repeated $p$ value gives the answer. **Rewritten** in the generator, and the same pattern was fixed in st-f-019, 021 and 022, which were not sampled.
- Unit 20, st-f-005: "middle exponent" plausibility; the correct $\frac32$ is the parent of the $3$ and $\frac23$ mutations. **Residual.**
- Unit 1, st-s-08#1: the prior "$L=1$". **Residual.**

The other 18 hits came from applying the course rules to the options: valid vs invalid inference, divergence test inconclusive, the three integral-test conditions, integral value ≠ sum. Units 5, 10 and 21 also had a "most complete option" tell; unit 5 is fixed. The one miss was unit 14 (st-f-020).

Scoring table: run `npx tsx scripts/blind-score.ts qa/blind/series-tests-53.guesses.json`.

## Scope
There is no ratio test, root test, alternating series or absolute convergence in either file. Every "ratio" means either a geometric common ratio or $a_n/b_n$. st-f-010 uses the sign-changing $\sum\cos n/n$ only to show that the positive-terms hypothesis fails; no verdict is given.

## Residual doubts for the orchestrator
1. st-f-005 and st-s-08#1 are plausibility blind hits and were not rewritten. Suggested fixes: a decoy hub for st-f-005; a non-monic numerator for st-s-08 (for example $(2n+1)/(n^3+2)$, $L=2$).
2. Design limit: in most "which argument settles it" items, a student who knows the inference rules can answer from the options alone. The term is visible, and only one option is a valid inference. By policy this is math, not a leak, but it is systemic.
3. st-f-008: "positive and decreasing, with $f\to0$" is mathematically sufficient (monotone functions are integrable). The item is correct only "as stated in class"; the prompt now says so.
4. st-s-05#3, "the sum is ∞": many texts write $\sum a_n=\infty$ for a positive divergent series. It stays a distractor under the spec's "a limit of ∞ means divergent".
5. Medoid hits that predate this pass and remain: st-f-001, 002, 004, 008, 011, 015, 020, 028, 030, 033, 035, st-s-02#1, 03#2, 05#2, 08#1. st-f-011 was kept so that the endpoint-sign-change distractor survives. The bigram 0.5 ties on the p-series and lct-rational seeds are an artifact: $\frac32$ and $\frac23$ have identical bigram sets.
6. No second blind sample was drawn on the rewritten units.

## Tag misuse patterns
- `st-sum-equals-integral` was used for any "sum = value" claim (comparison series, first term, $\sum b_n$). It belongs to the integral value only; the other claims are `sb-no-information`.
- When the inference is valid but $L$ or the behaviour of $\sum b_n$ is wrong, the tag should be `st-lct-limit-wrong` or `st-p-rule-wrong`, not `st-lct-boundary`.
- `arithmetic-error` / `algebra-error` were attached to contrived values whose why named no computation (012, 016, 017).
- A dropped inner sign was tagged `product-rule-missing-term`.
- Identity checks whose lhs equals the answer do not check anything; this occurred in two steps.

## Certified (re-derived; distractors wrong; tags and whys OK)
- Previous instance: st-f-001, 002, 003, 004, 005, 006, 007, 009, 013.
- This pass: st-f-007, 008, 010 (edits re-checked); 011, 012, 014 … 037; st-g-p-series, st-g-lct-rational, st-g-comparison-direction (seeds 1..8); st-s-01 … st-s-09, all steps and finals, as they stand after the fixes above.
