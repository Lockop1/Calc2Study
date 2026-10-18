# series-tests: decoy-hub rewrites for the 13 medoid-hit items
Policy (content/VERIFICATION_LOG.md, "star pattern"): a decoy hub is a distractor family — one single-mistake distractor H
plus compound distractors that share a feature with H but not with the correct answer. Apply EXACTLY the option lists
below. Keep the correct option as option index 0 unchanged unless stated. Replace the other four options by the four
listed, in order, each with the given `mistake` tag and a `why` (≥ 15 chars) that says what the student did (use the
reason text). Keep prompt, kind, check, explanation unchanged. Then run the checks in qa/briefs/flash-typist.md and the
medoid scan; report the new rates and any remaining hits.

## st-f-007 (Σ (1+1/n)^n)
0 ✓ keep: "Divergence test: $a_n \to e \ne 0$, so the series diverges"
1 "Divergence test: $a_n \to e$, a finite limit, so the series converges" | st-wrong-inference | computed the limit correctly but read a finite limit as convergence
2 "Divergence test: $a_n \to 1$, a finite limit, so the series converges" | sq-substitute-infinity | plugged ∞ into the base (1^∞ = 1) and then read a finite limit as convergence
3 "Limit comparison with $\frac{1}{n}$: $L = e$, a finite limit, so the series converges" | st-lct-limit-wrong | the limit $a_n/(1/n) = n\,a_n$ is ∞, not e; and a finite L against a divergent series would give divergence anyway
4 "Direct comparison: $a_n \le e$ and $\sum e$ diverges, so the series diverges" | st-comparison-wrong-direction | being below a divergent series gives no information

## st-f-008 (integral test conditions)
0 ✓ keep: "$f$ positive, continuous and decreasing"
1 "$f$ continuous and decreasing, with $f(x) \to 0$" | st-integral-test-conditions | dropped "positive" and added the irrelevant condition f → 0
2 "$f$ positive and continuous, with $f(x) \to 0$" | st-integral-test-conditions | dropped "decreasing" and added the irrelevant condition f → 0
3 "$f$ positive and decreasing, with $f(x) \to 0$" | st-integral-test-conditions | dropped "continuous" and added the irrelevant condition f → 0
4 "$f$ positive, continuous and increasing" | st-integral-test-conditions | reversed the monotonicity condition

## st-f-009 (Σ sin²n/n²)
0 ✓ keep: "$f(x) = \frac{\sin^2 x}{x^2}$ is not decreasing; $a_n \le \frac{1}{n^2}$, so it converges"
1 "$f(x) = \frac{\sin^2 x}{x^2}$ is not decreasing; limit comparison with $\frac{1}{n^2}$ gives $L = 1$, so it converges" | st-lct-limit-wrong | $a_n/(1/n^2) = \sin^2 n$ has no limit, so limit comparison does not apply (the verdict happens to be right)
2 "$f(x) = \frac{\sin^2 x}{x^2}$ is not decreasing; limit comparison with $\frac{1}{n^2}$ gives $L = 1$, so it diverges" | st-wrong-inference | invented a limit L = 1 and then drew the wrong conclusion from a convergent comparison series
3 "$f(x) = \frac{\sin^2 x}{x^2}$ is not continuous; limit comparison with $\frac{1}{n^2}$ gives $L = 1$, so it converges" | st-integral-test-conditions | f is continuous; the failing hypothesis is "decreasing", and the limit L = 1 does not exist
4 "$f(x) = \frac{\sin^2 x}{x^2}$ is not decreasing; $a_n \le \frac{1}{n}$, so it diverges" | st-comparison-wrong-direction | being below a divergent series gives no information

## st-f-011 (is $xe^{-x}$ decreasing on [1, ∞)?)
0 ✓ keep: "Yes: $f'(x) = (1-x)e^{-x} \le 0$ for $x \ge 1$"
1 "No: $f'(x) = (1-x)e^{-x}$ changes sign at $x = 1$" | st-integral-test-conditions | the sign change at x = 1 is the left endpoint; on [1, ∞) the derivative is ≤ 0, so f is decreasing there
2 "No: $f'(x) = (1+x)e^{-x}$ changes sign at $x = 1$" | product-rule-missing-term | differentiated with a sign slip (the derivative is (1 − x)e^{−x}) and misread the sign
3 "No: $f'(x) = -xe^{-x}$ changes sign at $x = 1$" | product-rule-missing-term | dropped the e^{−x} term of the product rule and misread the sign
4 "Yes: $e^{-x}$ is decreasing, so $xe^{-x}$ is decreasing" | st-integral-test-conditions | right verdict, invalid reason: a product with an increasing factor needs the derivative check

## st-f-012 (∫₁^∞ xe^{−x} dx) — exprs
0 ✓ keep: latex "\frac{2}{e}", expr "2/e"
1 latex "-\frac{2}{e}", expr "-2/e" | sign-error | evaluated F(1) − F(t) instead of F(t) − F(1)
2 latex "-\frac{1}{e}", expr "-1/e" | ibp-v-wrong | used v = e^{−x} instead of −e^{−x} and lost the sign of the result
3 latex "-\frac{3}{e}", expr "-3/e" | arithmetic-error | added the two terms with the wrong sign and coefficient
4 latex "\frac{1}{e}", expr "1/e" | ibp-stopped-early | kept only the uv term of integration by parts

## st-f-013 (∫₂^∞ dx/(x ln²x)) — exprs
0 ✓ keep: latex "\frac{1}{\ln 2}", expr "1/log(2)"
1 latex "-\frac{1}{\ln 2}", expr "-1/log(2)" | ftc-order-swapped | computed F(2) − F(t) instead of F(t) − F(2)
2 latex "-\frac{1}{2\ln 2}", expr "-1/(2*log(2))" | du-constant-wrong | introduced a spurious factor 1/2 with u = ln x and swapped the FTC order
3 latex "-\frac{1}{(\ln 2)^2}", expr "-1/log(2)^2" | power-rule-int-exponent | integrated u^{−2} as −u^{−2} instead of −u^{−1} and swapped the FTC order
4 latex "\ln 2", expr "log(2)" | algebra-error | inverted the final value

## st-f-016 (∫₁^∞ dx/(1+x²)) — exprs
0 ✓ keep: latex "\frac{\pi}{4}", expr "pi/4"
1 latex "-\frac{\pi}{4}", expr "-pi/4" | ftc-order-swapped | computed arctan 1 − arctan t
2 latex "-\frac{\pi}{2}", expr "-pi/2" | inverse-trig-value-wrong | dropped the arctan 1 term and swapped the FTC order
3 latex "-\frac{3\pi}{4}", expr "-3*pi/4" | arithmetic-error | added π/4 instead of subtracting it, with the FTC order swapped
4 latex "\frac{\pi}{2}", expr "pi/2" | inverse-trig-value-wrong | forgot to subtract arctan 1

## st-f-017 (Σ n/(n²+1), integral test)
0 ✓ keep: "$\int_1^{\infty} \frac{x}{x^2+1}\,dx = \infty$, so the series diverges"
1 "$\int_1^{\infty} \frac{x}{x^2+1}\,dx = \frac{\pi}{4}$, so the series converges" | algebra-error | integrated as if the integrand were 1/(x² + 1); the antiderivative is (1/2) ln(x² + 1), which is unbounded
2 "$\int_1^{\infty} \frac{x}{x^2+1}\,dx = \frac{\pi}{4}$, so the sum of the series is $\frac{\pi}{4}$" | st-sum-equals-integral | wrong integral, and the integral's value is never the sum
3 "$\int_0^{\infty} \frac{x}{x^2+1}\,dx = \frac{\pi}{4}$, so the series converges" | arithmetic-error | wrong lower bound and wrong integral
4 "$\frac{n}{n^2+1} \to 0$, so the series converges" | sb-divergence-test-converse | terms tending to 0 never proves convergence

## st-f-018 (p-series rule)
0 ✓ keep: "It converges exactly when $p > 1$"
1 "It converges exactly when $p \ge 1$" | st-p-rule-wrong | included p = 1, the divergent harmonic series
2 "It converges exactly when $p \ge 0$" | st-p-rule-wrong | included every p from 0 to 1, where the series diverges
3 "It converges exactly when $|p| \ge 1$" | st-p-rule-wrong | included p = 1 and negative p, where the terms do not even tend to 0
4 "It converges exactly when $p < 1$" | st-p-rule-wrong | reversed the rule

## st-f-023 (Σ n²/√n)
0 ✓ keep: "$a_n = n^{3/2} \to \infty$, so it diverges by the divergence test"
1 "$a_n = n^{3/2}$, so $p = -\frac{3}{2} < 1$ and the series converges" | st-p-rule-wrong | read "p < 1" as the convergence case; the rule is p > 1
2 "$a_n = n^{3/2}$, so $p = -\frac{3}{2}$ and the $p$-series rule says nothing" | sb-no-information | the rule covers every p: p ≤ 1 diverges (here the terms even grow)
3 "$a_n = n^{5/2}$, so $p = -\frac{5}{2} < 1$ and the series converges" | st-wrong-p | simplified n²/√n to n^{5/2} and then read p < 1 as convergence
4 "$a_n = \frac{1}{n^{3/2}}$, a $p$-series with $p = \frac{3}{2}$, so it converges" | st-wrong-p | inverted the term: n²/√n = n^{3/2}, not 1/n^{3/2}

## st-f-026 (Σ 1/(n − 1/2), direct comparison)
0 ✓ keep: "Diverges: $\frac{1}{n-1/2} > \frac{1}{n}$ and $\sum \frac{1}{n}$ diverges"
1 "No conclusion: $\frac{1}{n-1/2} > \frac{1}{n}$ and $\sum \frac{1}{n}$ diverges" | st-comparison-wrong-direction | larger than a divergent series IS conclusive (diverges)
2 "No conclusion: $\frac{1}{n-1/2} < \frac{1}{n}$ and $\sum \frac{1}{n}$ diverges" | algebra-error | the inequality is backwards (n − 1/2 < n makes the fraction larger)
3 "No conclusion: $\frac{1}{n-1/2} < \frac{2}{n}$ and $\sum \frac{2}{n}$ diverges" | st-wrong-comparison-series | a true but useless comparison; the series itself does diverge
4 "Diverges: $\frac{1}{n-1/2} < \frac{2}{n}$ and $\sum \frac{2}{n}$ diverges" | st-comparison-wrong-direction | being below a divergent series gives no information

## st-f-027 (Σ 1/(2ⁿ + n), direct comparison)
0 ✓ keep: "Converges: $a_n < \frac{1}{2^n}$ and $\sum \frac{1}{2^n}$ converges"
1 "Converges: $a_n < \frac{1}{n}$ and $\sum \frac{1}{n}$ converges" | st-p-rule-wrong | the harmonic series diverges
2 "Diverges: $a_n < \frac{1}{n}$ and $\sum \frac{1}{n}$ diverges" | st-comparison-wrong-direction | being below a divergent series gives no information
3 "No conclusion: $a_n < \frac{1}{n}$ and $\sum \frac{1}{n}$ diverges" | st-wrong-comparison-series | a useless comparison; comparing with 1/2ⁿ settles it
4 "Diverges: $a_n < \frac{1}{2^n}$ and $\sum \frac{1}{2^n}$ diverges" | sb-r-boundary | the geometric series with r = 1/2 converges

## st-f-037 (Σ sin(1/n))
0 ✓ keep: "Limit comparison with $\frac{1}{n}$: $L = 1$ and $\sum \frac{1}{n}$ diverges, so it diverges"
1 "Limit comparison with $\frac{1}{n}$: $L = 0$ and $\sum \frac{1}{n}$ diverges, so no conclusion" | st-lct-limit-wrong | sin(1/n)/(1/n) → 1, not 0
2 "Limit comparison with $\frac{1}{n^2}$: $L = 0$ and $\sum \frac{1}{n^2}$ converges, so it converges" | st-lct-boundary | the limit against 1/n² is ∞, not 0; L = ∞ with a convergent comparison is inconclusive
3 "Limit comparison with $\frac{1}{n}$: $L = 0$ and $\sum \frac{1}{n}$ diverges, so it converges" | st-wrong-inference | wrong limit, and L = 0 with a divergent comparison would be inconclusive, not convergent
4 "Direct comparison: $\sin\left(\frac{1}{n}\right) \le \frac{1}{n}$ and $\sum \frac{1}{n}$ diverges, so it diverges" | st-comparison-wrong-direction | being below a divergent series gives no information
