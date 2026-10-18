# Flash plan — sequences (topic id `sequences`, prefix `sq`)
Conventions: see qa/briefs/flash-typist.md. `✓` = correct option. Distractor lines: `- option | tag | reason`.
Option kinds: "exprs" = every option has latex+expr; "text" = text-only options (inline $…$ allowed).
Default variable for identity checks is n (set `variable: 'n'`).

## sq-f-001 · kind formula · exprs · check: limit (3*n^2+1)/(n^2-5) → 3
P: $\lim_{n\to\infty} \dfrac{3n^2+1}{n^2-5} = ?$
* $3$ ✓
- $0$ | sq-dominant-term | compared the degrees wrongly and took the limit to be 0
- $1$ | sq-substitute-infinity | plugged in n = ∞ and cancelled ∞/∞ to 1
- $-\frac{1}{5}$ | sq-term-vs-limit | evaluated the term at n = 0 instead of taking the limit
- $-\frac{3}{5}$ | arithmetic-error | divided the leading coefficient by the constant term −5
E: Equal degrees: the limit is the ratio of the leading coefficients, 3/1.

## sq-f-002 · kind formula · exprs · check: limit (2*n+1)/(n+3) → 2
P: $\lim_{n\to\infty} \dfrac{2n+1}{n+3} = ?$
* $2$ ✓
- $\frac{1}{3}$ | sq-term-vs-limit | evaluated the term at n = 0 instead of taking the limit
- $0$ | sq-dominant-term | thought the denominator grows faster
- $1$ | sq-substitute-infinity | plugged in n = ∞ and cancelled ∞/∞ to 1
- $\frac{2}{3}$ | arithmetic-error | divided the leading coefficient by the constant 3
E: Equal degrees: ratio of leading coefficients, 2/1.

## sq-f-003 · kind formula · exprs · check: limit (5*n-2)/(n^2+1) → 0
P: $\lim_{n\to\infty} \dfrac{5n-2}{n^2+1} = ?$
* $0$ ✓
- $5$ | sq-dominant-term | took the ratio of leading coefficients although the degrees differ
- $-2$ | sq-term-vs-limit | evaluated the term at n = 0
- $1$ | sq-substitute-infinity | plugged in n = ∞ and cancelled ∞/∞ to 1
- $\frac{5}{2}$ | arithmetic-error | divided 5 by the constant 2 and dropped the sign
E: Degree of the top (1) is less than the degree of the bottom (2), so the limit is 0.

## sq-f-004 · kind formula · exprs · check: limit (1+2/n)^n → e^2
P: $\lim_{n\to\infty} \left(1+\dfrac{2}{n}\right)^{n} = ?$
* $e^{2}$ ✓
- $e$ | sq-theorem-misattributed | used the standard limit (1+1/n)^n → e without accounting for the 2
- $1$ | sq-substitute-infinity | plugged in n = ∞: (1 + 0)^∞ = 1
- $2e$ | arithmetic-error | multiplied e by 2 instead of raising it to the 2
- $e^{\frac{1}{2}}$ | exponent-arithmetic | put the 2 in the denominator of the exponent
E: (1 + 2/n)^n = ((1 + 2/n)^{n/2})^2 → e^2.

## sq-f-005 · kind concept · text · check: limit n*sin(1/n) → 1
P: $\lim_{n\to\infty} n\sin\!\left(\dfrac{1}{n}\right) = ?$
* $1$ — Underlying Function Theorem, then L'Hôpital on $\dfrac{\sin(1/x)}{1/x}$ ✓
- $0$ — $n \to \infty$ times $\sin(1/n) \to 0$ gives $\infty \cdot 0 = 0$ | sq-limit-law-misuse | treated the indeterminate form ∞·0 as 0
- $\infty$ — $n \to \infty$ and $\sin(1/n)$ is bounded | sq-dominant-term | ignored that sin(1/n) → 0 and let the factor n dominate
- DNE — $\sin$ oscillates | sq-connect-the-dots | pictured sin as oscillating although its argument 1/n → 0
- $\sin 1$ — the value at $n = 1$ | sq-term-vs-limit | reported the first term instead of the limit
E: With x = 1/n → 0⁺, n sin(1/n) = sin x / x → 1.

## sq-f-006 · kind formula · exprs · check: limit arctan(n) → pi/2
P: $\lim_{n\to\infty} \arctan n = ?$
* $\frac{\pi}{2}$ ✓
- $\pi$ | inverse-trig-value-wrong | confused the range of arctan with (0, π)
- $\frac{\pi}{4}$ | sq-term-vs-limit | evaluated at n = 1 (arctan 1 = π/4)
- $-\frac{\pi}{2}$ | sign-error | took the limit at −∞ instead of +∞
- $1$ | sq-substitute-infinity | treated arctan ∞ as "∞ cancels" and wrote 1
E: arctan x → π/2 as x → ∞ (one of the limits to know).

## sq-f-007 · kind concept · text · check: limit (-3/4)^n → 0
P: Does $\left\{\left(-\tfrac{3}{4}\right)^{n}\right\}$ converge? If so, to what?
* Converges to $0$: $|r| = \tfrac{3}{4} < 1$ ✓
- Diverges: the terms alternate in sign | sq-oscillation-means-divergence | assumed a sign-alternating sequence cannot converge
- Converges to $1$: by the $\{r^n\}$ rule | sq-rn-boundary | applied the r = 1 case to r = −3/4
- Converges to $-\tfrac{3}{4}$: the first term | sq-term-vs-limit | reported a term instead of the limit
- Diverges: $r = -\tfrac{3}{4}$ is not in $(-1, 1]$ | sq-rn-boundary | misread the interval −1 < r ≤ 1
E: {rⁿ} → 0 whenever |r| < 1, whatever the sign of r.

## sq-f-008 · kind concept · text · check: limit (1.01)^n → infinity
P: Does $\{(1.01)^{n}\}$ converge?
* Diverges: $r = 1.01 > 1$, so $r^n \to \infty$ ✓
- Converges to $1$: $r$ is practically $1$ | sq-rn-boundary | treated r ≈ 1 as the r = 1 case
- Converges: the first few terms barely change | sq-first-terms | judged from the first few terms
- Converges to $1.01$ | sq-term-vs-limit | reported the first term as the limit
- Converges: it is monotone | sq-monotone-implies-convergent | used monotone alone to conclude convergence
E: {rⁿ} diverges for every r > 1, however close to 1.

## sq-f-009 · kind concept · text · check: limit (-1)^n → dne
P: Does $\{(-1)^{n}\}$ converge?
* Diverges: the terms alternate between $-1$ and $1$ and never settle ✓
- Converges to $0$: the terms are squeezed between $-1$ and $1$ | sq-squeeze-misuse | squeezed between bounds whose limits differ
- Converges to $1$: $|a_n| = 1 \to 1$ | sq-theorem-misattributed | misapplied the corollary (only |aₙ| → 0 forces aₙ → 0)
- Converges: it is bounded | sq-bounded-implies-convergent | used bounded alone to conclude convergence
- Converges to $-1$: $r = -1$ is allowed | sq-rn-boundary | the rule is −1 < r ≤ 1, which excludes r = −1
E: A convergent sequence settles near one value; (−1)ⁿ keeps jumping between −1 and 1.

## sq-f-010 · kind concept · text · check: none: the term sin(nπ) is exactly 0 at every integer n; floating-point noise defeats the numeric limit check
P: $\lim_{n\to\infty} \sin(n\pi) = ?$
* $0$: $\sin(n\pi) = 0$ for every integer $n$ ✓
- DNE: $\sin$ oscillates between $-1$ and $1$ | sq-connect-the-dots | pictured the continuous graph of sin x instead of its values at integers
- DNE: $\lim_{x\to\infty}\sin(x\pi)$ does not exist, so by the Underlying Function Theorem neither does the sequence limit | sq-theorem-misattributed | the theorem only transfers a limit that exists; it says nothing when the function limit fails
- $\infty$: $n\pi \to \infty$ | sq-dominant-term | took the limit of the argument instead of the term
- $\pi$: the value at $n = 1$ | sq-term-vs-limit | plugged n = 1 into the argument instead of the term
E: Every term is sin of a multiple of π, which is 0; the sequence is 0, 0, 0, …

## sq-f-011 · kind concept · text · check: limit cos(n)/n → 0
P: $\lim_{n\to\infty} \dfrac{\cos n}{n} = ?$
* $0$: $-\tfrac{1}{n} \le \tfrac{\cos n}{n} \le \tfrac{1}{n}$ and both bounds $\to 0$ (Squeeze) ✓
- DNE: $\cos n$ oscillates | sq-oscillation-means-divergence | assumed oscillation in the numerator makes the limit fail
- $1$: $1/n \to 0$ so the limit is $\cos 0 = 1$ | sq-theorem-misattributed | misapplied the Continuous Function Theorem to the wrong expression
- $0$: because $\cos n \to 0$ | sq-limit-law-misuse | right value, invalid reason: cos n has no limit
- $\cos 1$: the first term | sq-term-vs-limit | reported a term instead of the limit
E: |cos n/n| ≤ 1/n → 0, so the Squeeze Theorem gives 0.

## sq-f-012 · kind concept · text · check: limit sqrt(n+1)-sqrt(n) → 0
P: $\lim_{n\to\infty} \left(\sqrt{n+1} - \sqrt{n}\right) = ?$
* $0$: rationalize to $\dfrac{1}{\sqrt{n+1}+\sqrt{n}} \to 0$ ✓
- DNE: $\infty - \infty$ is indeterminate, so there is no limit | sq-limit-law-misuse | treated an indeterminate form as "no limit"
- $0$: because $\infty - \infty = 0$ | sq-substitute-infinity | right value, invalid reason: ∞ − ∞ is not 0
- $1$: the numbers under the roots differ by $1$ | algebra-error | subtracted inside the roots
- $\frac{1}{2}$: L'Hôpital gives $\dfrac{1}{2\sqrt{x}}$ | arithmetic-error | differentiated and then stopped before taking the limit
E: Multiply by the conjugate: (√(n+1) − √n)(√(n+1) + √n) = 1.

## sq-f-013 · kind concept · text · check: limit n^(1/n) → 1
P: $\lim_{n\to\infty} n^{1/n} = ?$
* $1$: $\ln\left(n^{1/n}\right) = \dfrac{\ln n}{n} \to 0$, so the limit is $e^{0}$ ✓
- $\infty$: $n$ grows without bound | sq-dominant-term | ignored the exponent 1/n → 0
- $0$: the exponent $\to 0$ kills the term | exponent-arithmetic | confused x^0 = 1 with 0
- $e$: the standard limit | sq-theorem-misattributed | confused with (1 + 1/n)^n
- $1$: because $1/n \to 0$ and $n^{0} = 1$ | sq-limit-law-misuse | right value, invalid reason: the base is not fixed
E: Take logs: ln n / n → 0 (L'Hôpital via the Underlying Function Theorem), so n^{1/n} → e⁰ = 1.

## sq-f-014 · kind concept · text · check: limit 2*(4/3)^n → infinity
P: Class example: does $\left\{\dfrac{2^{2n+1}}{3^{n}}\right\}$ converge?
* Diverges: $\dfrac{2^{2n+1}}{3^{n}} = 2\left(\tfrac{4}{3}\right)^{n}$ and $\tfrac{4}{3} > 1$ ✓
- Converges to $0$: the ratio is $\tfrac{2}{3} < 1$ | sq-wrong-form | rewrote 2^{2n} as 2^n and got the ratio 2/3
- Converges to $2$: the factor $2$ is the limit | sq-term-vs-limit | reported the coefficient as the limit
- Diverges: the numerator $2^{2n+1} \to \infty$ | sq-dominant-term | right verdict, invalid reason: the denominator also → ∞
- Converges to $\tfrac{4}{3}$ | sq-rn-boundary | reported the ratio r as the limit
E: 2^{2n+1} = 2·4ⁿ, so the term is 2(4/3)ⁿ, a geometric sequence with r = 4/3 > 1.

## sq-f-015 · kind concept · text · check: limit log(n)/sqrt(n) → 0
P: $\lim_{n\to\infty} \dfrac{\ln n}{\sqrt{n}} = ?$
* $0$: L'Hôpital on $\dfrac{\ln x}{\sqrt{x}}$ gives $\dfrac{1/x}{1/(2\sqrt{x})} = \dfrac{2}{\sqrt{x}} \to 0$ ✓
- $\infty$: $\ln n$ grows without bound | sq-dominant-term | ignored that √n grows faster than ln n
- $1$: $\infty/\infty$ cancels | sq-substitute-infinity | plugged in n = ∞
- $2$: L'Hôpital leaves $2/\sqrt{x}$ | algebra-error | stopped after differentiating without taking the limit
- $\frac{1}{2}$: from the $\tfrac{1}{2\sqrt{x}}$ | arithmetic-error | reported the derivative of the denominator
E: Any power of n beats ln n; L'Hôpital confirms the limit is 0.

## sq-f-016 · kind concept · text · check: limit (-1)^n/n → 0
P: $\lim_{n\to\infty} \dfrac{(-1)^{n}}{n} = ?$
* $0$: $|a_n| = \tfrac{1}{n} \to 0$, so $a_n \to 0$ (Squeeze corollary) ✓
- DNE: the terms alternate in sign | sq-oscillation-means-divergence | assumed sign changes prevent convergence
- $0$: because $(-1)^{n} \to 0$ | sq-rn-boundary | right value, invalid reason: (−1)ⁿ has no limit
- $1$: $|a_n| \le 1$ so it converges to $1$ | sq-bounded-implies-convergent | turned a bound into a limit
- $-1$: the first term | sq-term-vs-limit | reported a term instead of the limit
E: |(−1)ⁿ/n| = 1/n → 0 forces (−1)ⁿ/n → 0.

## sq-f-017 · kind concept · text · check: limit n^2/exp(n) → 0
P: $\lim_{n\to\infty} \dfrac{n^{2}}{e^{n}} = ?$
* $0$: L'Hôpital twice on $\dfrac{x^{2}}{e^{x}}$ gives $\dfrac{2}{e^{x}} \to 0$ ✓
- $\infty$: $n^{2}$ grows without bound | sq-dominant-term | ignored that eⁿ grows faster than any power
- $1$: $\infty/\infty$ cancels | sq-substitute-infinity | plugged in n = ∞
- $2$: after L'Hôpital twice the numerator is $2$ | algebra-error | stopped before taking the limit of 2/eˣ
- DNE: L'Hôpital cannot be used on a sequence | sq-theorem-misattributed | forgot the Underlying Function Theorem
E: Exponentials beat polynomials; two rounds of L'Hôpital show 2/eˣ → 0.

## sq-f-018 · kind formula · exprs · check: limit (3*n+1)/sqrt(4*n^2+1) → 3/2
P: $\lim_{n\to\infty} \dfrac{3n+1}{\sqrt{4n^{2}+1}} = ?$
* $\frac{3}{2}$ ✓
- $\frac{3}{4}$ | algebra-error | simplified √(4n²) to 4n
- $3$ | arithmetic-error | dropped the 4 under the root
- $1$ | sq-substitute-infinity | plugged in n = ∞ and cancelled ∞/∞ to 1
- $0$ | sq-dominant-term | compared n with n² without taking the root
E: √(4n² + 1) behaves like 2n, so the ratio → 3/2.

## sq-f-019 · kind formula · exprs · var: n · domain: { n: [1, 6] } · check: identity 2*3^(n-1)
P: Which formula gives the sequence $2, 6, 18, 54, \ldots$?
* $2 \cdot 3^{n-1}$ ✓
- $2 \cdot 3^{n}$ | exponent-arithmetic | used rⁿ instead of rⁿ⁻¹ (gives 6 at n = 1)
- $2 + 4(n-1)$ | sq-wrong-form | used the arithmetic form for a geometric sequence
- $3 \cdot 2^{n-1}$ | arithmetic-error | swapped the first term and the ratio
- $2 \cdot 3^{n+1}$ | exponent-arithmetic | shifted the exponent the wrong way
E: Geometric with a = 2 and r = 3: aₙ = a·rⁿ⁻¹.

## sq-f-020 · kind formula · exprs · var: n · domain: { n: [1, 6] } · check: identity 10-3*n
P: Which formula gives the sequence $7, 4, 1, -2, \ldots$?
* $7 - 3(n-1)$ ✓
- $7 - 3n$ | sq-wrong-form | forgot the (n − 1) in a + (n − 1)d
- $7 \cdot (-3)^{n-1}$ | sq-wrong-form | used the geometric form for an arithmetic sequence
- $7 + 3(n-1)$ | sign-error | used d = +3 for a decreasing sequence
- $4 - 3(n-1)$ | arithmetic-error | started from the second term
E: Arithmetic with a = 7 and d = −3: aₙ = a + (n − 1)d.

## sq-f-021 · kind formula · exprs · var: n · domain: { n: [1, 5] } · check: identity 2^(2*n+1)/3^n
P: Rewrite $\dfrac{2^{2n+1}}{3^{n}}$ as $a\cdot r^{n}$.
* $2\left(\frac{4}{3}\right)^{n}$ ✓
- $2\left(\frac{2}{3}\right)^{n}$ | exponent-arithmetic | treated 2^{2n} as 2^n
- $\left(\frac{4}{3}\right)^{n}$ | algebra-error | dropped the leftover factor 2 from 2^{2n+1}
- $\left(\frac{8}{3}\right)^{n}$ | exponent-arithmetic | treated 2^{2n+1} as 8^n
- $4\left(\frac{4}{3}\right)^{n}$ | arithmetic-error | wrote 2^{2n+1} = 4·4^n
E: 2^{2n+1} = 2·(2²)ⁿ = 2·4ⁿ, so the term is 2(4/3)ⁿ.

## sq-f-022 · kind concept · text · check: none: statement of the {r^n} rule
P: For which $r$ does $\{r^{n}\}$ converge?
* $-1 < r \le 1$ ✓
- $|r| < 1$ only | sq-rn-boundary | excluded r = 1, where rⁿ = 1 converges
- $-1 \le r \le 1$ | sq-rn-boundary | included r = −1, where rⁿ alternates
- $0 < r \le 1$ | sq-oscillation-means-divergence | excluded negative r because the terms alternate in sign
- $r \le 1$ | sq-rn-boundary | included r < −1, where |rⁿ| → ∞
E: {rⁿ} converges exactly for −1 < r ≤ 1: the limit is 0 for |r| < 1 and 1 for r = 1.

## sq-f-023 · kind concept · text · check: none: comparison of five sequences; each verdict re-derived by the verifier
P: Which sequence converges?
* $\{(-0.9)^{n}\}$ ✓
- $\{(-1)^{n}\}$ | sq-rn-boundary | treated r = −1 as inside the convergence interval
- $\{(1.1)^{n}\}$ | sq-first-terms | the early terms grow slowly, so it looked convergent
- $\left\{(-1)^{n}\dfrac{n}{n+1}\right\}$ | sq-bounded-implies-convergent | bounded, but the terms approach ±1 alternately
- $\{\ln n\}$ | sq-dominant-term | ln grows slowly, but it is unbounded
E: |−0.9| < 1, so (−0.9)ⁿ → 0; each of the others fails to settle.

## sq-f-024 · kind concept · text · check: none: theorem identification
P: Which theorem lets you use L'Hôpital's rule to find $\lim_{n\to\infty} \dfrac{\ln n}{n}$?
* Underlying Function Theorem: if $f(n) = a_n$ and $\lim_{x\to\infty} f(x) = L$, then $\lim a_n = L$ ✓
- Continuous Function Theorem | sq-theorem-misattributed | that theorem moves a limit through a continuous f, it does not create one
- Squeeze Theorem | sq-theorem-misattributed | no bounding sequences are involved
- Monotone Convergence Theorem | sq-theorem-misattributed | monotone and bounded gives convergence, not the value
- None: L'Hôpital cannot be used on sequences | sq-theorem-misattributed | the theorem exactly justifies it via f(x) = ln x / x
E: The Underlying Function Theorem transfers the limit of f(x) = ln x / x (found by L'Hôpital) to the sequence.

## sq-f-025 · kind concept · text · check: none: theorem application, verified by hand
P: If $a_n \to 4$, what is $\lim_{n\to\infty} \sqrt{a_n}$?
* $2$: $\sqrt{x}$ is continuous at $4$ (Continuous Function Theorem) ✓
- $4$: the limit passes through unchanged | sq-theorem-misattributed | forgot to apply f to the limit
- Cannot be determined without knowing $a_n$ | sq-theorem-misattributed | the theorem needs only the limit and continuity
- $16$ | algebra-error | squared instead of taking the root
- $2$, but only if $\{a_n\}$ is monotone | sq-theorem-misattributed | added a hypothesis the theorem does not need
E: aₙ → 4 and √ is continuous at 4, so √aₙ → √4 = 2.

## sq-f-026 · kind concept · text · check: none: method identification
P: Which argument shows $\dfrac{\cos^{2} n}{n^{2}} \to 0$?
* $0 \le \dfrac{\cos^{2} n}{n^{2}} \le \dfrac{1}{n^{2}}$ and both bounds $\to 0$ (Squeeze Theorem) ✓
- $\cos^{2} n \to 0$, so the product $\to 0$ | sq-limit-law-misuse | cos² n has no limit; the product law does not apply
- $\cos^{2} n$ is bounded, so the sequence converges | sq-bounded-implies-convergent | bounded alone gives no limit
- $\dfrac{1}{n^{2}} \to 0$ and $\dfrac{1}{n^{2}} \le \dfrac{\cos^{2} n}{n^{2}}$ | sq-squeeze-misuse | the inequality points the wrong way
- The terms oscillate, so the sequence diverges | sq-oscillation-means-divergence | oscillation in the numerator does not prevent convergence
E: Trap the term between 0 and 1/n²; both bounds go to 0.

## sq-f-027 · kind concept · text · check: none: justification choice
P: Which fact proves $\dfrac{(-1)^{n}}{n} \to 0$?
* $|a_n| = \dfrac{1}{n} \to 0$, so $a_n \to 0$ ✓
- $(-1)^{n} \to 0$ | sq-rn-boundary | (−1)ⁿ has no limit
- Bounded sequences converge | sq-bounded-implies-convergent | bounded alone gives no limit
- The terms get smaller, so they approach $0$ | sq-monotone-implies-convergent | the terms are not even monotone, and "smaller" is not a limit argument
- L'Hôpital on $\dfrac{(-1)^{x}}{x}$ | sq-theorem-misattributed | (−1)ˣ is not a real differentiable function
E: The corollary of the Squeeze Theorem: |aₙ| → 0 forces aₙ → 0.

## sq-f-028 · kind concept · text · check: none: theorem application
P: $a_n = \dfrac{n}{n+1}$. Which argument uses the Monotone Convergence Theorem correctly?
* Increasing ($a_{n+1} - a_n > 0$) and bounded above by $1$, so it converges ✓
- Increasing, so it converges | sq-monotone-implies-convergent | monotone alone is not enough
- Bounded by $1$, so it converges | sq-bounded-implies-convergent | bounded alone is not enough
- $\tfrac{1}{2}, \tfrac{2}{3}, \tfrac{3}{4}$ approach $1$, so it converges | sq-first-terms | judged from the first terms
- Decreasing and bounded below by $0$, so it converges | algebra-error | the sequence is increasing, not decreasing
E: Both hypotheses, monotone AND bounded, are needed; here both hold.

## sq-f-029 · kind concept · text · check: none: conceptual
P: What does the sequence $\{(-1)^{n}\}$ demonstrate?
* A bounded sequence need not converge ✓
- A convergent sequence need not be bounded | sq-theorem-misattributed | convergent sequences are always bounded
- A monotone sequence need not be bounded | sq-theorem-misattributed | (−1)ⁿ is not monotone
- Every bounded sequence converges to its bound | sq-bounded-implies-convergent | bounded does not give a limit
- Oscillating sequences converge to the average of their values | sq-squeeze-misuse | squeezing between −1 and 1 gives no limit
E: {(−1)ⁿ} is bounded by 1 yet never settles, so bounded ⇏ convergent.

## sq-f-030 · kind concept · text · check: none: conceptual
P: $a_n \to 5$. Which statement must be true?
* $\{a_n\}$ is bounded ✓
- $\{a_n\}$ is monotone | sq-theorem-misattributed | convergence does not force monotonicity
- $a_n = 5$ for all large $n$ | sq-term-vs-limit | a limit need not be attained
- $a_n \le 5$ for every $n$ | sq-theorem-misattributed | the terms may approach 5 from above
- $a_{n+1} - a_n \to 5$ | sq-limit-law-misuse | the differences of a convergent sequence tend to 0, not to the limit
E: Convergent ⇒ bounded (the converse is false).

## sq-f-031 · kind concept · text · check: none: conceptual
P: $a_n \to 2$ and $b_n \to 0$. What do the limit laws say about $\lim \dfrac{a_n}{b_n}$?
* Nothing: the quotient law needs $\lim b_n \ne 0$ ✓
- It is $\infty$, since $2/0 = \infty$ | sq-limit-law-misuse | applied the quotient law with a zero denominator limit
- It is $0$, because $b_n \to 0$ wins | sq-dominant-term | let the denominator dominate without justification
- It is $2$ | algebra-error | ignored the denominator
- It does not exist | sq-limit-law-misuse | the laws are silent; the limit may or may not exist
E: The quotient law requires a nonzero denominator limit; otherwise anything can happen (e.g. aₙ = 2, bₙ = 1/n gives ∞; bₙ = −1/n gives −∞).

## sq-f-032 · kind formula · exprs · check: value 5
P: $a_n \to 3$ and $b_n \to -1$. $\lim_{n\to\infty} \left(2a_n - b_n^{2}\right) = ?$
* $5$ ✓
- $7$ | sign-error | wrote −(−1)² as +1
- $4$ | algebra-error | computed 2(3 − 1) instead of 2·3 − 1
- $6$ | arithmetic-error | dropped the bₙ² term
- $-5$ | sign-error | flipped the sign of the whole result
E: Limit laws: 2·3 − (−1)² = 6 − 1 = 5.

## sq-f-033 · kind concept · text · check: none: the a^x rule
P: $\lim (2/3)^{n}$, $\lim 1^{n}$, $\lim (3/2)^{n}$ are, in order:
* $0,\ 1,\ \infty$ ✓
- $0,\ 0,\ \infty$ | sq-rn-boundary | treated r = 1 like |r| < 1
- $0,\ 1,\ 1$ | sq-rn-boundary | thought r > 1 still converges
- $1,\ 1,\ 1$ | sq-substitute-infinity | took anything^∞ to be 1
- $0,\ 1,\ \text{DNE}$ | sq-oscillation-means-divergence | confused unbounded growth with oscillation
E: aˣ → 0 for 0 < a < 1, = 1 for a = 1, → ∞ for a > 1.

## sq-f-034 · kind formula · exprs · check: limit log(n)/log(n^2) → 1/2
P: $\lim_{n\to\infty} \dfrac{\ln n}{\ln(n^{2})} = ?$
* $\frac{1}{2}$ ✓
- $2$ | algebra-error | wrote ln(n²) as (ln n)/2
- $0$ | sq-dominant-term | thought ln(n²) grows much faster than ln n
- $1$ | sq-substitute-infinity | plugged in n = ∞ and cancelled ∞/∞ to 1
- $\ln 2$ | arithmetic-error | reduced ln(n²)/ln n to ln 2
E: ln(n²) = 2 ln n, so the ratio is exactly 1/2 for every n.

## sq-f-035 · kind concept · text · check: none: monotonicity and MCT reasoning
P: $a_n = \dfrac{n+1}{n}$. Which statement is right?
* Decreasing and bounded below by $1$, so it converges (Monotone Convergence Theorem) ✓
- Increasing, since $n$ grows, so it diverges | algebra-error | (n+1)/n = 1 + 1/n decreases
- Decreasing, so it converges to $0$ | sq-dominant-term | a decreasing sequence converges to its greatest lower bound, here 1
- Not monotone: $a_1 = 2$ and $a_2 = \tfrac{3}{2}$ are just two terms | sq-first-terms | monotonicity is about every n, and 1 + 1/n does decrease
- Bounded, so it converges to its bound $2$ | sq-bounded-implies-convergent | a bound is not a limit
E: aₙ = 1 + 1/n decreases toward 1 and is bounded below, so the MCT applies.

## Generators

### sq-g-rational · kind formula · exprs · describe: "limit of (a n² + b)/(c n² + d)"
Table (a, b, c, d), index (seed − 1) % 8: (3,1,1,−5), (2,−1,5,1), (4,3,2,7), (5,2,3,−1), (6,1,2,3), (7,−2,4,1), (1,3,2,5), (9,1,3,4).
P: $\lim_{n\to\infty} \dfrac{a n^{2} + b}{c n^{2} + d} = ?$ (render the numbers; write "n^2 - 5" for d = −5 etc.)
check: limit (a*n^2+b)/(c*n^2+d) → a/c
Options (reduce fractions in the latex, e.g. 3/1 → 3, 2/5 → \frac{2}{5}, -1/5 → -\frac{1}{5}):
* a/c ✓
- b/d | sq-term-vs-limit | evaluated at n = 0
- 1 | sq-substitute-infinity | ∞/∞ cancelled to 1
- 0 | sq-dominant-term | misjudged the degrees
- a/d | arithmetic-error | divided the leading coefficient by the constant term
E: Equal degrees: ratio of leading coefficients a/c.

### sq-g-geometric · kind concept · text · describe: "does {rⁿ} converge, and to what"
Table r, index (seed − 1) % 8: −3/4, 4/5, −1, 6/5, −5/4, 1/2, −1/2, 3/2.
P: Does $\{r^{n}\}$ converge? (render r as a fraction, e.g. $\left\{\left(-\tfrac{3}{4}\right)^{n}\right\}$)
Options (same five texts every time; which one is ✓ depends on r):
- "Converges to $0$" — ✓ when |r| < 1; otherwise tag sq-rn-boundary, reason "applied the |r| < 1 case outside it"
- "Converges to $1$" — never ✓ (r = 1 is not in the table); tag sq-rn-boundary, reason "applied the r = 1 case"
- "Converges to $r$" (render the number) — never ✓; tag sq-term-vs-limit, reason "reported the first term"
- "Diverges: alternates without settling" — ✓ when r = −1 or r ≤ −1 (i.e. r = −1, −5/4); otherwise tag sq-oscillation-means-divergence, reason "assumed a negative ratio means divergence"
- "Diverges: unbounded" — ✓ when r > 1 (6/5, 3/2); otherwise tag sq-rn-boundary, reason "misjudged |r| against 1"
check: limit r^n → '0' when |r| < 1; 'infinity' when r > 1; 'dne' when r ≤ −1 (write r in the term as a decimal-free expression such as (-3/4)^n)
E: state the rule: |r| < 1 → 0; r = 1 → 1; r = −1 or |r| > 1 → diverges (unbounded for r > 1, alternating/unbounded for r < −1).
