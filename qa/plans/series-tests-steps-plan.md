# Step-Through plan — series tests (topic id `series-tests`, prefix `st`)
Conventions: qa/briefs/steps-typist.md. Distractors are decoy-hub families: D1 is the hub, D2 and D3 are D1 with one more
change (compound), D4 is a separate single mistake. No ratio/root/alternating content anywhere. Verdict finals: no expr.

## st-s-01 · difficulty 1 · title "Choose a test: p-series"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=1}^{\infty} \frac{1}{n^{2}}"
### step 1 · check: none: flowchart
P: First test to apply?
* Divergence test: $\dfrac{1}{n^{2}} \to 0$, so it is inconclusive; move on
- Divergence test: $\dfrac{1}{n^{2}} \to 0$, so the series converges | sb-divergence-test-converse | the test never proves convergence
- Divergence test: $\dfrac{1}{n^{2}} \to 0$, so the series converges to $0$ | sb-sum-is-term-limit | never proves convergence, and the limit of the terms is not the sum
- Divergence test: $\dfrac{1}{n^{2}} \to 0$, so the series diverges | st-wrong-inference | the test says nothing when the limit is 0
- Integral test right away | st-divergence-test-skipped | the divergence test comes first in the flowchart (here it is inconclusive, and a p-series needs no integral)
E: Terms → 0: inconclusive, go to the next question in the flowchart.
R text: Divergence test inconclusive
### step 2 · check: none: recognition
P: What kind of series is it, and which rule applies?
* A $p$-series with $p = 2$: converges because $p > 1$
- A $p$-series with $p = 2$: diverges because $p > 1$ | st-p-rule-wrong | p > 1 is the convergent case
- A $p$-series with $p = -2$: diverges because $p < 1$ | st-wrong-p | 1/n² = n^{−2} has p = 2 in the p-series Σ1/nᵖ, and p > 1 converges
- A $p$-series with $p = 2$: diverges because $p \ne 1$ | st-p-rule-wrong | p ≠ 1 is not the rule
- A geometric series with $r = \tfrac{1}{2}$ | sb-wrong-ratio | the ratio aₙ₊₁/aₙ is not constant
E: Σ1/nᵖ converges iff p > 1.
R text: $p$-series, $p = 2 > 1$: converges
FINAL: latex "\text{converges } (p\text{-series}, p = 2)" · check: series 1/n^2 conv · recap: Divergence test inconclusive → recognize a p-series with p = 2 > 1 → converges.

## st-s-02 · difficulty 1 · title "p-series with p ≤ 1"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=1}^{\infty} \frac{1}{\sqrt{n}}"
### step 1 · check: value 1/2
P: Write the term as $\dfrac{1}{n^{p}}$. What is $p$?
* $\frac{1}{2}$ (expr `1/2`)
- $2$ (expr `2`) | st-wrong-p | √n = n^{1/2}, not n²
- $-2$ (expr `-2`) | st-wrong-p | √n = n^{1/2}, and the sign is wrong
- $-\frac{1}{2}$ (expr `-1/2`) | st-wrong-p | 1/√n = n^{−1/2}, but in Σ1/nᵖ the p is +1/2
- $1$ (expr `1`) | st-wrong-p | that would be the harmonic series
E: 1/√n = 1/n^{1/2}.
R latex: p = \frac{1}{2}
### step 2 · check: series 1/sqrt(n) div
P: Conclude.
* $p = \tfrac{1}{2} \le 1$: diverges
- $p = \tfrac{1}{2} < 1$: converges | st-p-rule-wrong | p < 1 is the divergent case
- $p = \tfrac{1}{2} < 1$: converges to $2$ | st-p-rule-wrong | wrong case, and the value is made up
- $p = \tfrac{1}{2} < 1$: converges because the terms $\to 0$ | st-p-rule-wrong | wrong case, and terms → 0 proves nothing
- Inconclusive: the $p$-series rule needs $p > 0$ integer | st-p-rule-wrong | p can be any real number
E: Σ1/nᵖ diverges for p ≤ 1.
R text: Diverges ($p = 1/2$)
FINAL: latex "\text{diverges } (p = 1/2 \le 1)" · check: series 1/sqrt(n) div · recap: p = 1/2 ≤ 1 → the p-series diverges.

## st-s-03 · difficulty 2 · title "Limit comparison, L = ∞"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=2}^{\infty} \frac{\ln n}{n}"
### step 1 · check: none: flowchart
P: The divergence test gives $\dfrac{\ln n}{n} \to 0$, inconclusive. What next?
* Positive terms; not geometric, telescoping or a $p$-series: compare with $b_n = \dfrac{1}{n}$ (the dominant growth)
- Compare with $b_n = \dfrac{\ln n}{n^{2}}$ | st-wrong-comparison-series | the comparison series should be simpler and of known behaviour
- Compare with $b_n = \dfrac{\ln n}{n^{2}}$, which converges, so the series converges | st-wrong-comparison-series | not a known series, and no conclusion follows
- Compare with $b_n = \dfrac{\ln n}{n^{2}}$ using the integral test | st-wrong-comparison-series | the integral test uses the series' own term
- It is a $p$-series with $p = 1$: diverges | st-wrong-p | ln n on top means it is not a p-series (the verdict happens to agree)
E: Choose bₙ from the dominant terms: ln n/n behaves like 1/n (times a slowly growing factor).
R latex: b_n = \frac{1}{n}
### step 2 · check: limit log(n) → infinity
P: Compute $L = \displaystyle\lim_{n\to\infty} \frac{a_n}{b_n}$.
* $L = \lim \ln n = \infty$
- $L = \lim \dfrac{1}{n} = 0$ | st-lct-limit-wrong | aₙ/bₙ = (ln n/n)·n = ln n, not 1/n
- $L = \lim \dfrac{1}{n} = 0$, so the series converges | st-lct-limit-wrong | wrong limit, and L = 0 with a divergent bₙ would be inconclusive anyway
- $L = \lim \dfrac{1}{n\ln n} = 0$ | st-lct-limit-wrong | inverted the quotient and added a factor
- $L = 1$ | st-lct-limit-wrong | ln n is not bounded
E: (ln n/n)/(1/n) = ln n → ∞.
R latex: L = \infty
### step 3 · check: series log(n)/n from 2 div
P: Conclude.
* $L = \infty$ and $\sum \dfrac{1}{n}$ diverges, so $\sum \dfrac{\ln n}{n}$ diverges
- $L = \infty$: the test is inconclusive | st-lct-boundary | L = ∞ with a divergent bₙ is conclusive (diverges)
- $L = \infty$: the test is inconclusive, so use the integral test | st-lct-boundary | the limit comparison already decides
- $L = \infty$: the test is inconclusive, so compare with $\dfrac{1}{n^{2}}$ instead | st-lct-boundary | the test already decides; 1/n² would give L = ∞ with a convergent series, truly inconclusive
- $L = \infty$ and $\sum \dfrac{1}{n}$ diverges, so $\sum \dfrac{\ln n}{n}$ converges | st-wrong-inference | the conclusion is backwards
E: L = ∞ and Σbₙ diverges ⇒ Σaₙ diverges.
R text: Diverges (limit comparison with $1/n$)
FINAL: latex "\text{diverges (limit comparison with } 1/n\text{, } L = \infty)" · check: series log(n)/n from 2 div · recap: Divergence test inconclusive → compare with 1/n → L = ln n → ∞ → divergent comparison ⇒ diverges.

## st-s-04 · difficulty 2 · title "Limit comparison, L = 0"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=2}^{\infty} \frac{\ln n}{n^{2}}"
### step 1 · check: none: choosing b_n
P: Which comparison series works?
* $b_n = \dfrac{1}{n^{3/2}}$: a convergent $p$-series that still dominates $\dfrac{\ln n}{n^{2}}$
- $b_n = \dfrac{1}{n^{2}}$ | st-wrong-comparison-series | L = lim ln n = ∞ with a convergent bₙ: inconclusive
- $b_n = \dfrac{1}{n^{2}}$, giving $L = \infty$, so the series converges | st-lct-boundary | L = ∞ with a convergent bₙ gives no information
- $b_n = \dfrac{1}{n^{2}}$, giving $L = 1$ | st-lct-limit-wrong | the limit is ln n → ∞, not 1
- $b_n = \dfrac{1}{n}$ | st-wrong-comparison-series | L = lim ln n/n = 0 with a divergent bₙ: inconclusive
E: Pick a p-series between 1/n² and 1/n that still converges: 1/n^{3/2}.
R latex: b_n = \frac{1}{n^{3/2}}
### step 2 · check: limit log(n)/sqrt(n) → 0
P: Compute $L = \displaystyle\lim \frac{\ln n / n^{2}}{1/n^{3/2}}$.
* $L = \lim \dfrac{\ln n}{\sqrt{n}} = 0$
- $L = \lim \sqrt{n}\,\ln n = \infty$ | st-lct-limit-wrong | n^{3/2}/n² = n^{−1/2}, so the quotient is ln n/√n
- $L = \lim \sqrt{n}\,\ln n = \infty$, so the series diverges | st-lct-limit-wrong | wrong limit, and L = ∞ with a convergent bₙ is inconclusive anyway
- $L = \lim \sqrt{n}\,\ln n = 1$ | st-lct-limit-wrong | wrong quotient and wrong limit
- $L = \lim \dfrac{\ln n}{n} = 0$ | st-lct-limit-wrong | the exponent is 1/2, not 1 (the value 0 is right by accident)
E: (ln n/n²)·n^{3/2} = ln n/√n → 0 (L'Hôpital).
R latex: L = 0
### step 3 · check: series log(n)/n^2 from 2 conv
P: Conclude.
* $L = 0$ and $\sum \dfrac{1}{n^{3/2}}$ converges, so $\sum \dfrac{\ln n}{n^{2}}$ converges
- $L = 0$: inconclusive | st-lct-boundary | L = 0 with a convergent bₙ is conclusive (converges)
- $L = 0$: inconclusive, so the series diverges | st-lct-boundary | inconclusive never means diverges, and the case is conclusive
- $L = 0$: inconclusive, so compare with $\dfrac{1}{n}$ instead | st-lct-boundary | the case is conclusive; 1/n would be truly inconclusive
- $L = 0$ and $\sum \dfrac{1}{n^{3/2}}$ converges, so $\sum \dfrac{\ln n}{n^{2}}$ diverges | st-wrong-inference | backwards
E: L = 0 and Σbₙ converges ⇒ Σaₙ converges.
R text: Converges (limit comparison with $1/n^{3/2}$)
FINAL: latex "\text{converges (limit comparison with } 1/n^{3/2}\text{, } L = 0)" · check: series log(n)/n^2 from 2 conv · recap: Compare with 1/n^{3/2} → L = ln n/√n → 0 → convergent comparison ⇒ converges.

## st-s-05 · difficulty 2 · title "When limit comparison fails: the integral test"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=2}^{\infty} \frac{1}{n\ln n}"
### step 1 · check: none: LCT boundary cases
P: Try limit comparison with $b_n = \dfrac{1}{n}$. What happens?
* $L = \lim \dfrac{1}{\ln n} = 0$ with $\sum \dfrac{1}{n}$ divergent: inconclusive
- $L = 0$ with $\sum \dfrac{1}{n}$ divergent, so the series converges | st-lct-boundary | L = 0 transfers convergence, not divergence; here nothing follows
- $L = 0$ with $\sum \dfrac{1}{n}$ divergent, so the series diverges | st-lct-boundary | L = 0 with a divergent bₙ gives no information
- $L = 0$ with $\sum \dfrac{1}{n}$ convergent, so the series converges | st-lct-boundary | Σ1/n diverges, and L = 0 with a divergent bₙ is inconclusive
- $L = 1$, so both diverge | st-lct-limit-wrong | aₙ/bₙ = 1/ln n → 0, not 1
E: L = 0 is conclusive only when Σbₙ converges.
R text: Limit comparison with $1/n$: inconclusive
### step 2 · check: none: integral test conditions
P: Use the integral test with $f(x) = \dfrac{1}{x\ln x}$ on $[2, \infty)$. Which conditions must hold, and do they?
* Positive, continuous and decreasing on $[2, \infty)$: all three hold ($x\ln x$ is positive and increasing)
- Positive and continuous: both hold | st-integral-test-conditions | decreasing is also required
- Positive and continuous: both hold, so the integral equals the sum | st-integral-test-conditions | decreasing is also required, and the integral is never the sum
- Positive and continuous: both hold; decreasing is not needed for $x \ge 2$ | st-integral-test-conditions | decreasing is always required
- Decreasing and $f(x) \to 0$ | st-integral-test-conditions | positive and continuous are the conditions; f → 0 is not one of them
E: f > 0, continuous, and decreasing because x ln x increases.
R text: Integral test applies
### step 3 · check: identity log(log(t)) - log(log(2)) · var: t · domain: [3, 20]
P: With $u = \ln x$: $\displaystyle\int_{2}^{t} \frac{dx}{x\ln x} = ?$
* $\ln(\ln t) - \ln(\ln 2)$ (expr `log(log(t)) - log(log(2))`)
- $\ln(\ln t)$ (expr `log(log(t))`) | ftc-not-subtracted | F(2) = ln(ln 2) ≠ 0
- $\ln(\ln t) - \ln 2$ (expr `log(log(t)) - log(2)`) | ftc-not-subtracted | F(2) is ln(ln 2), not ln 2
- $\ln(\ln t) + \ln(\ln 2)$ (expr `log(log(t)) + log(log(2))`) | ftc-not-subtracted | F(2) must be subtracted, not added
- $\dfrac{(\ln t)^{2}}{2} - \dfrac{(\ln 2)^{2}}{2}$ (expr `log(t)^2/2 - log(2)^2/2`) | du-derivative-wrong | ∫ du/u = ln|u|, not u²/2
E: ∫ du/u = ln u, evaluated from ln 2 to ln t.
R latex: \lim_{t\to\infty}\left[\ln(\ln t) - \ln(\ln 2)\right]
### step 4 · check: series 1/(n*log(n)) from 2 div
P: Conclude.
* $\ln(\ln t) \to \infty$: the integral diverges, so the series diverges
- $\ln(\ln t) \to \infty$: the integral diverges, so the series converges | st-wrong-inference | both converge or both diverge
- $\ln(\ln t) \to \infty$: the integral diverges, so the sum is $\infty$ | st-wrong-inference | right verdict, but "sum = ∞" is not the conclusion of the test; a divergent series has no sum
- $\ln(\ln t) \to \infty$: the integral diverges, so the test is inconclusive | st-wrong-inference | the test is conclusive both ways
- $\ln(\ln t) \to 0$: the integral converges, so the series converges | im-limit-evaluated-wrong | ln(ln t) → ∞
E: Integral and series share their behaviour: both diverge.
R text: Diverges (integral test)
FINAL: latex "\text{diverges (integral test, } u = \ln x)" · check: series 1/(n*log(n)) from 2 div · recap: Limit comparison with 1/n is inconclusive (L = 0, divergent bₙ) → integral test: conditions hold → ∫ dx/(x ln x) = ln(ln x) → ∞ → diverges.

## st-s-06 · difficulty 1 · title "Direct comparison, convergent"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=1}^{\infty} \frac{1}{n^{2}+1}"
### step 1 · check: none: choosing a comparison
P: Which comparison is valid?
* $\dfrac{1}{n^{2}+1} < \dfrac{1}{n^{2}}$ and $\sum \dfrac{1}{n^{2}}$ converges: converges
- $\dfrac{1}{n^{2}+1} < \dfrac{1}{n}$ and $\sum \dfrac{1}{n}$ diverges: no conclusion | st-wrong-comparison-series | true but useless; compare with 1/n² instead
- $\dfrac{1}{n^{2}+1} < \dfrac{1}{n}$ and $\sum \dfrac{1}{n}$ diverges: diverges | st-comparison-wrong-direction | smaller than a divergent series gives nothing
- $\dfrac{1}{n^{2}+1} < \dfrac{1}{n}$ and $\sum \dfrac{1}{n}$ converges: converges | st-p-rule-wrong | the harmonic series diverges, and the comparison would be useless anyway
- $\dfrac{1}{n^{2}+1} > \dfrac{1}{n^{2}}$ and $\sum \dfrac{1}{n^{2}}$ converges: converges | algebra-error | the inequality is backwards (n² + 1 > n²)
E: Smaller than a convergent series ⇒ converges.
R latex: 0 < \frac{1}{n^{2}+1} < \frac{1}{n^{2}}
### step 2 · check: series 1/(n^2+1) conv
P: State the conclusion precisely.
* $0 < a_n \le b_n$ with $\sum b_n$ convergent ($p = 2$), so $\sum a_n$ converges
- $\sum a_n$ converges to $\sum \dfrac{1}{n^{2}}$ | st-sum-equals-integral | comparison bounds the sum; it does not give its value
- $\sum a_n$ converges to $\sum \dfrac{1}{n^{2}} - 1$ | st-sum-equals-integral | made-up value
- $\sum a_n$ converges to $\dfrac{\pi}{4}$ (the integral) | st-sum-equals-integral | an integral's value is never the sum
- $\sum a_n$ converges because $a_n \to 0$ | sb-divergence-test-converse | terms → 0 proves nothing
E: Direct comparison gives convergence, not the value.
R text: Converges (direct comparison with $1/n^{2}$)
FINAL: latex "\text{converges (direct comparison with } 1/n^{2})" · check: series 1/(n^2+1) conv · recap: 1/(n²+1) < 1/n² and Σ1/n² converges (p = 2) → converges.

## st-s-07 · difficulty 1 · title "Direct comparison with a geometric series"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=1}^{\infty} \frac{1}{2^{n}+n}"
### step 1 · check: none: comparison
P: Which comparison is valid?
* $\dfrac{1}{2^{n}+n} < \dfrac{1}{2^{n}}$ and $\sum \dfrac{1}{2^{n}}$ converges ($r = \tfrac{1}{2}$): converges
- $\dfrac{1}{2^{n}+n} < \dfrac{1}{n}$ and $\sum \dfrac{1}{n}$ diverges: diverges | st-comparison-wrong-direction | smaller than a divergent series gives nothing
- $\dfrac{1}{2^{n}+n} < \dfrac{1}{n}$ and $\sum \dfrac{1}{n}$ diverges: no conclusion, so the series diverges | st-comparison-wrong-direction | "no conclusion" never becomes "diverges"
- $\dfrac{1}{2^{n}+n} < \dfrac{1}{n}$ and $\sum \dfrac{1}{n}$ converges: converges | st-p-rule-wrong | the harmonic series diverges
- $\dfrac{1}{2^{n}+n} > \dfrac{1}{2^{n}}$ and $\sum \dfrac{1}{2^{n}}$ converges: converges | algebra-error | the inequality is backwards
E: Smaller than a convergent geometric series.
R latex: 0 < \frac{1}{2^{n}+n} < \frac{1}{2^{n}}
### step 2 · check: series 1/(2^n+n) conv
P: Conclude.
* Converges by direct comparison with the geometric series $\sum \dfrac{1}{2^{n}}$
- Converges to $1$, the sum of $\sum \dfrac{1}{2^{n}}$ | st-sum-equals-integral | the comparison series' sum is only an upper bound
- Converges to $1$, by the divergence test | st-sum-equals-integral | the divergence test gives no sums and no convergence
- Converges to $\dfrac{1}{2}$, its first term | sb-partial-sum-formula | the first term is not the sum
- Diverges: $2^{n} + n \to \infty$ | st-wrong-inference | the terms → 0; growth of the denominator favours convergence
E: Direct comparison gives convergence.
R text: Converges (direct comparison with $1/2^{n}$)
FINAL: latex "\text{converges (direct comparison with } 1/2^{n})" · check: series 1/(2^n+n) conv · recap: 1/(2ⁿ + n) < 1/2ⁿ and Σ1/2ⁿ converges (|r| < 1) → converges.

## st-s-08 · difficulty 2 · title "Limit comparison with a rational term"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=1}^{\infty} \frac{n+1}{n^{3}+2}"
### step 1 · check: none: choosing b_n
P: Choose $b_n$ from the dominant terms.
* $b_n = \dfrac{n}{n^{3}} = \dfrac{1}{n^{2}}$
- $b_n = \dfrac{1}{n^{3}}$ | st-wrong-comparison-series | the numerator's dominant term n must be kept
- $b_n = \dfrac{1}{n^{3}}$, a convergent $p$-series, so the series converges | st-wrong-comparison-series | wrong bₙ (L = ∞ there, inconclusive with a convergent bₙ)
- $b_n = \dfrac{1}{n^{3}}$ with direct comparison: $a_n < b_n$ | st-wrong-comparison-series | wrong bₙ, and the inequality is false
- $b_n = \dfrac{1}{n}$ | st-wrong-comparison-series | n/n³ = 1/n², not 1/n
E: Keep the highest power top and bottom: n/n³.
R latex: b_n = \frac{1}{n^{2}}
### step 2 · check: limit ((n+1)/(n^3+2))/(1/n^2) → 1
P: Compute $L = \displaystyle\lim \frac{a_n}{b_n}$.
* $L = \lim \dfrac{n^{3}+n^{2}}{n^{3}+2} = 1$ (expr `1`)
- $L = 0$ (expr `0`) | st-lct-limit-wrong | the degrees are equal, so L is the ratio of leading coefficients
- $L = 2$ (expr `2`) | st-lct-limit-wrong | the leading coefficients are both 1
- $L = \tfrac{1}{2}$ (expr `1/2`) | st-lct-limit-wrong | divided by the constant 2
- $L = \lim \dfrac{n+1}{n^{3}+2} = 0$ (expr `0`) — duplicate value; replace by: $L = 3$ (expr `3`) | st-lct-limit-wrong | added the exponents
E: (n+1)/(n³+2) · n² = (n³ + n²)/(n³ + 2) → 1.
R latex: L = 1
NOTE step 2: use the replacement in the last line (latex "3", expr 3); all five options are exprs with the latex being just the number.
### step 3 · check: series (n+1)/(n^3+2) conv
P: Conclude.
* $0 < L = 1 < \infty$ and $\sum \dfrac{1}{n^{2}}$ converges, so the series converges
- $0 < L < \infty$, so the series diverges | st-wrong-inference | both series behave the same; 1/n² converges
- $0 < L < \infty$, so the series diverges because $L \ne 0$ | st-wrong-inference | L ≠ 0 is not a divergence criterion
- $0 < L < \infty$, so the test is inconclusive | st-lct-boundary | 0 < L < ∞ is the conclusive case
- $L = 1$, so the sum is $\sum \dfrac{1}{n^{2}}$ | st-sum-equals-integral | the test compares behaviour, not values
E: 0 < L < ∞ ⇒ same behaviour as Σ1/n², which converges.
R text: Converges (limit comparison with $1/n^{2}$)
FINAL: latex "\text{converges (limit comparison with } 1/n^{2}\text{, } L = 1)" · check: series (n+1)/(n^3+2) conv · recap: Dominant terms give bₙ = 1/n² → L = 1 → same behaviour as a convergent p-series → converges.

## st-s-09 · difficulty 2 · title "Integral test with a substitution"
S: text "Decide whether the series converges, naming the test." · latex "\sum_{n=1}^{\infty} n e^{-n^{2}}"
### step 1 · check: none: conditions
P: Use the integral test with $f(x) = x e^{-x^{2}}$. Check the conditions on $[1, \infty)$.
* Positive and continuous; decreasing since $f'(x) = (1 - 2x^{2})e^{-x^{2}} < 0$ for $x \ge 1$
- Positive and continuous; increasing since $x$ grows | st-integral-test-conditions | the derivative is negative for x ≥ 1
- Positive and continuous; increasing since $x$ grows, so the test fails and the series diverges | st-integral-test-conditions | wrong monotonicity, and a failed hypothesis never gives a verdict
- Positive and continuous; increasing since $f'(x) = (1 + 2x^{2})e^{-x^{2}} > 0$ | product-rule-missing-term | the derivative is (1 − 2x²)e^{−x²}
- The conditions do not matter for a convergent integral | st-integral-test-conditions | all three must hold before the integral says anything
E: f′ = e^{−x²}(1 − 2x²) is negative for x ≥ 1.
R text: Integral test applies
### step 2 · check: identity 1/2*exp(-1) - 1/2*exp(-t^2) · var: t · domain: [1.5, 4]
P: With $u = x^{2}$: $\displaystyle\int_{1}^{t} x e^{-x^{2}}\,dx = ?$
* $\dfrac{1}{2}e^{-1} - \dfrac{1}{2}e^{-t^{2}}$ (expr `1/2*exp(-1) - 1/2*exp(-t^2)`)
- $e^{-1} - e^{-t^{2}}$ (expr `exp(-1) - exp(-t^2)`) | du-constant-wrong | du = 2x dx brings a factor 1/2
- $e^{-t^{2}} - e^{-1}$ (expr `exp(-t^2) - exp(-1)`) | du-constant-wrong | missing 1/2 and the FTC order swapped
- $e^{-1} - e^{-t}$ (expr `exp(-1) - exp(-t)`) | du-constant-wrong | missing 1/2 and u = x² was not back-substituted
- $\dfrac{1}{2}e^{-t^{2}} - \dfrac{1}{2}e^{-1}$ (expr `1/2*exp(-t^2) - 1/2*exp(-1)`) | ftc-order-swapped | F(t) − F(1)
E: −(1/2)e^{−x²} from 1 to t.
R latex: \lim_{t\to\infty}\left(\frac{1}{2e} - \frac{1}{2}e^{-t^{2}}\right) = \frac{1}{2e}
### step 3 · check: series n*exp(-n^2) conv
P: Conclude.
* The integral converges (to $\tfrac{1}{2e}$), so the series converges
- The integral converges to $\tfrac{1}{2e}$, so the series converges to $\tfrac{1}{2e}$ | st-sum-equals-integral | the integral's value is not the sum
- The integral converges to $\tfrac{1}{2e}$, so the sum is at most $\tfrac{1}{2e}$ | st-sum-equals-integral | no such bound from the test (the first term alone is 1/e)
- The integral converges to $\tfrac{1}{2e}$, so the series converges to $\tfrac{1}{e}$ | st-sum-equals-integral | the test gives no value at all
- The integral converges, so the series diverges | st-wrong-inference | both converge or both diverge
E: Integral converges ⇒ series converges (value unknown from the test).
R text: Converges (integral test)
FINAL: latex "\text{converges (integral test)}" · check: series n*exp(-n^2) conv · recap: Conditions hold (f′ < 0) → ∫ x e^{−x²} dx converges → the series converges; the integral's value 1/(2e) is not the sum.
