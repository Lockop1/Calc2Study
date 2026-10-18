# Flash plan — series basics (topic id `series-basics`, prefix `sb`)
Conventions: see qa/briefs/flash-typist.md. `✓` = correct option. Distractor lines: `- option | tag | reason`.
"exprs" = every option has latex+expr; "text" = text-only options. Identity checks use variable n.

## sb-f-001 · kind concept · text · check: none: definition
P: "$\sum a_n$ converges" means:
* The partial sums $S_n = a_1 + \cdots + a_n$ approach a finite limit ✓
- $a_n \to 0$ | sb-divergence-test-converse | terms tending to 0 is necessary, not sufficient
- $a_n \to L$ for some finite $L$ | sb-sequence-vs-series | confused convergence of the terms with convergence of the series
- $S_n$ is bounded | sq-bounded-implies-convergent | bounded partial sums need not converge
- $a_n$ decreases to $0$ | sq-monotone-implies-convergent | the harmonic series has decreasing terms and diverges
E: By definition the sum is lim Sₙ, so the series converges exactly when {Sₙ} converges.

## sb-f-002 · kind formula · exprs · check: limit n/(n+1) → 1
P: The partial sums of a series are $S_n = \dfrac{n}{n+1}$. What is the sum of the series?
* $1$ ✓
- $0$ | sb-sum-is-term-limit | took the limit of the terms (which → 0) instead of the partial sums
- $\frac{1}{2}$ | sb-wrong-first-term | reported S₁ instead of lim Sₙ
- $2$ | arithmetic-error | inverted the ratio
- $-1$ | sign-error | sign slip in the limit
E: Sum = lim Sₙ = lim n/(n+1) = 1.

## sb-f-003 · kind formula · exprs · var: n · domain: { n: [2, 8] } · check: identity 2/(n*(n-1))
P: $S_n = 3 - \dfrac{2}{n}$. For $n \ge 2$, $a_n = ?$
* $\frac{2}{n(n-1)}$ ✓
- $3 - \frac{2}{n}$ | sb-sequence-vs-series | took aₙ = Sₙ
- $\frac{2}{n}$ | algebra-error | dropped the Sₙ₋₁ part
- $\frac{2}{n^{2}}$ | algebra-error | differentiated −2/n instead of differencing
- $\frac{2}{n(n+1)}$ | arithmetic-error | shifted the index the wrong way
E: aₙ = Sₙ − Sₙ₋₁ = −2/n + 2/(n − 1) = 2/(n(n − 1)).

## sb-f-004 · kind formula · exprs · check: value 16
P: $S_n = 2^{n} - 1$. Then $a_5 = ?$
* $16$ ✓
- $31$ | sb-sequence-vs-series | reported S₅
- $32$ | arithmetic-error | computed 2⁵ without subtracting S₄
- $15$ | arithmetic-error | reported S₄
- $1$ | sb-sum-is-term-limit | differenced the constants only
E: a₅ = S₅ − S₄ = 31 − 15 = 16.

## sb-f-005 · kind concept · text · check: series n/(n+1) div
P: $\displaystyle\sum_{n=1}^{\infty} \frac{n}{n+1}$:
* Diverges: $a_n \to 1 \ne 0$ (divergence test) ✓
- Converges to $1$, since $a_n \to 1$ | sb-sum-is-term-limit | the limit of the terms is not the sum
- Converges: $a_n$ is bounded | sq-bounded-implies-convergent | bounded terms do not make a series converge
- Inconclusive: the test only applies when $a_n \to 0$ | sb-divergence-test-converse | the test is conclusive exactly when the limit is NOT 0
- Converges: $S_n = \dfrac{n}{n+1} \to 1$ | sb-sequence-vs-series | confused the term formula with the partial sums
E: The terms do not tend to 0, so the series diverges.

## sb-f-006 · kind concept · text · check: series 1/n div
P: For $\displaystyle\sum_{n=1}^{\infty} \frac{1}{n}$, $a_n \to 0$. What does the divergence test tell you?
* Nothing: the test is inconclusive when $a_n \to 0$ (this series in fact diverges) ✓
- The series converges | sb-divergence-test-converse | used the test backwards
- The series converges to $0$ | sb-sum-is-term-limit | took the limit of the terms as the sum
- The series diverges, because $a_n \ne 0$ for every $n$ | algebra-error | the test is about lim aₙ, not about individual terms
- The series diverges by the divergence test | sb-divergence-test-converse | right verdict, invalid reason: the test cannot show it
E: The divergence test never proves convergence and says nothing when aₙ → 0.

## sb-f-007 · kind concept · text · check: series (-1)^n div
P: $\displaystyle\sum_{n=1}^{\infty} (-1)^{n}$:
* Diverges: $\lim (-1)^{n}$ does not exist ✓
- Converges to $0$: the terms cancel in pairs | sb-partial-sum-formula | the partial sums alternate between −1 and 0 and never settle
- Converges: geometric with $r = -1$ | sb-r-boundary | geometric series need |r| < 1
- Converges to $-\tfrac{1}{2}$: $\dfrac{a}{1-r}$ with $a = -1,\ r = -1$ | sb-r-boundary | applied a/(1 − r) outside |r| < 1
- Converges: $|a_n| = 1$ is bounded | sq-bounded-implies-convergent | bounded terms do not give convergence
E: The terms have no limit, so the divergence test applies.

## sb-f-008 · kind concept · text · check: series cos(1/n) div
P: $\displaystyle\sum_{n=1}^{\infty} \cos\!\left(\frac{1}{n}\right)$:
* Diverges: $\cos(1/n) \to \cos 0 = 1 \ne 0$ ✓
- Converges to $\cos 0 = 1$ | sb-sum-is-term-limit | the limit of the terms is not the sum
- Converges: $\dfrac{1}{n} \to 0$ | sb-sequence-vs-series | looked at the argument instead of the terms
- Inconclusive: $\cos$ oscillates | sq-connect-the-dots | cos(1/n) does not oscillate; its argument → 0
- Converges: $\cos$ is bounded | sq-bounded-implies-convergent | bounded terms do not give convergence
E: The terms tend to 1, not 0.

## sb-f-009 · kind concept · text · check: series (1+1/n)^n div
P: $\displaystyle\sum_{n=1}^{\infty} \left(1+\frac{1}{n}\right)^{n}$:
* Diverges: $a_n \to e \ne 0$ ✓
- Converges to $e$ | sb-sum-is-term-limit | the limit of the terms is not the sum
- Converges: the terms are bounded by $e$ | sq-bounded-implies-convergent | bounded terms do not give convergence
- Inconclusive: $a_n \to e$ is finite | sb-sequence-vs-series | a finite nonzero limit of the terms forces divergence
- Converges to $1$: $1 + \dfrac{1}{n} \to 1$ | sq-substitute-infinity | plugged ∞ into the base only
E: The terms tend to e ≠ 0, so the series diverges.

## sb-f-010 · kind concept · text · check: none: statement of the divergence test
P: Which statement about the divergence test is right?
* $\lim a_n \ne 0$ (or DNE) $\Rightarrow \sum a_n$ diverges; $\lim a_n = 0$ tells you nothing ✓
- $\lim a_n = 0 \Rightarrow \sum a_n$ converges | sb-divergence-test-converse | the converse is false (harmonic series)
- $\lim a_n = 0 \Rightarrow \sum a_n$ diverges | sb-sequence-vs-series | reversed what the test says
- $\lim a_n = L \Rightarrow \sum a_n = L$ | sb-sum-is-term-limit | the sum is lim Sₙ, not lim aₙ
- It applies only to geometric series | sq-theorem-misattributed | it applies to every series
E: The test can only prove divergence.

## sb-f-011 · kind formula · exprs · check: series 3*(1/2)^(n-1) conv sum 6
P: $\displaystyle\sum_{n=1}^{\infty} 3\left(\frac{1}{2}\right)^{n-1} = ?$
* $6$ ✓
- $\frac{3}{2}$ | sb-partial-sum-formula | computed a(1 − r) instead of a/(1 − r)
- $2$ | sb-wrong-first-term | used a = 1
- $12$ | arithmetic-error | doubled the result
- $0$ | sb-sum-is-term-limit | took the limit of the terms
E: a = 3, r = 1/2: a/(1 − r) = 3/(1/2) = 6.

## sb-f-012 · kind formula · exprs · check: series (1/3)^n from 0 conv sum 3/2
P: $\displaystyle\sum_{n=0}^{\infty} \left(\frac{1}{3}\right)^{n} = ?$
* $\frac{3}{2}$ ✓
- $\frac{1}{2}$ | sb-wrong-first-term | used a = 1/3 although the series starts at n = 0
- $3$ | arithmetic-error | inverted r instead of computing 1/(1 − r)
- $\frac{2}{3}$ | sb-partial-sum-formula | computed a(1 − r)
- $0$ | sb-sum-is-term-limit | took the limit of the terms
E: First term 1, r = 1/3: 1/(1 − 1/3) = 3/2.

## sb-f-013 · kind formula · exprs · check: series (2/3)^n conv sum 2
P: $\displaystyle\sum_{n=1}^{\infty} \left(\frac{2}{3}\right)^{n} = ?$
* $2$ ✓
- $3$ | sb-wrong-first-term | used a = 1 although the series starts at n = 1
- $6$ | sb-wrong-first-term | used a = 2
- $\frac{2}{3}$ | sb-partial-sum-formula | reported the first term as the sum
- $1$ | arithmetic-error | arithmetic slip in (2/3)/(1/3)
E: First term 2/3, r = 2/3: (2/3)/(1/3) = 2.

## sb-f-014 · kind formula · exprs · check: series 5*(1/4)^n from 2 conv sum 5/12
P: $\displaystyle\sum_{n=2}^{\infty} 5\left(\frac{1}{4}\right)^{n} = ?$
* $\frac{5}{12}$ ✓
- $\frac{20}{3}$ | sb-wrong-first-term | used a = 5
- $\frac{5}{3}$ | sb-wrong-first-term | used a = 5/4 (the n = 1 term)
- $\frac{5}{16}$ | sb-partial-sum-formula | reported the first term as the sum
- $\frac{5}{4}$ | arithmetic-error | arithmetic slip in (5/16)/(3/4)
E: First term 5/16, r = 1/4: (5/16)/(3/4) = 5/12.

## sb-f-015 · kind formula · exprs · check: series (-2/3)^n conv sum -2/5
P: $\displaystyle\sum_{n=1}^{\infty} \left(-\frac{2}{3}\right)^{n} = ?$
* $-\frac{2}{5}$ ✓
- $\frac{2}{5}$ | sign-error | dropped the sign of the first term
- $-2$ | sb-wrong-ratio | used 1 − r = 1/3 as if r were +2/3
- $\frac{3}{5}$ | sb-wrong-first-term | used a = 1
- $-\frac{2}{3}$ | sb-partial-sum-formula | reported the first term as the sum
E: a = −2/3, r = −2/3: (−2/3)/(1 + 2/3) = −2/5.

## sb-f-016 · kind formula · exprs · check: series 2^n/3^(n+1) conv sum 2/3
P: $\displaystyle\sum_{n=1}^{\infty} \frac{2^{n}}{3^{n+1}} = ?$
* $\frac{2}{3}$ ✓
- $2$ | sb-wrong-first-term | used a = 2/3 (the n = 0 term)
- $1$ | sb-wrong-first-term | used a = 1/3
- $\frac{2}{9}$ | sb-partial-sum-formula | reported the first term as the sum
- $\frac{1}{3}$ | arithmetic-error | arithmetic slip in (2/9)/(1/3)
E: Term = (1/3)(2/3)ⁿ: a = 2/9, r = 2/3, sum (2/9)/(1/3) = 2/3.

## sb-f-017 · kind concept · text · check: series (3/2)^n div
P: $\displaystyle\sum_{n=1}^{\infty} \left(\frac{3}{2}\right)^{n}$:
* Diverges: geometric with $|r| = \tfrac{3}{2} \ge 1$ ✓
- Converges to $-3$: $\dfrac{a}{1-r} = \dfrac{3/2}{-1/2}$ | sb-r-boundary | applied a/(1 − r) outside |r| < 1
- Converges to $3$ | sb-r-boundary | applied the formula outside |r| < 1 and fixed the sign
- Inconclusive: the divergence test is needed | sb-divergence-test-converse | the geometric rule already settles it (and the test agrees: terms → ∞)
- Converges to $\infty$ | im-divergent-called-convergent | unbounded partial sums mean divergence
E: A geometric series with |r| ≥ 1 diverges.

## sb-f-018 · kind formula · exprs · check: series (-9/10)^n conv sum -9/19
P: $\displaystyle\sum_{n=1}^{\infty} (-0.9)^{n} = ?$
* $-\frac{9}{19}$ ✓
- $\frac{9}{19}$ | sign-error | dropped the sign of the first term
- $-9$ | sb-wrong-ratio | used 1 − r = 0.1 as if r were +0.9
- $-\frac{9}{10}$ | sb-partial-sum-formula | reported the first term as the sum
- $\frac{10}{19}$ | sb-wrong-first-term | used a = 1
E: a = −0.9, r = −0.9: (−0.9)/(1.9) = −9/19.

## sb-f-019 · kind formula · exprs · check: series 9/10^n conv sum 1
P: $0.999\ldots = \displaystyle\sum_{n=1}^{\infty} \frac{9}{10^{n}} = ?$
* $1$ ✓
- $\frac{9}{10}$ | sb-partial-sum-formula | reported the first term as the sum
- $\frac{10}{9}$ | sb-wrong-first-term | used a = 1
- $9$ | arithmetic-error | forgot to divide by 10
- $\frac{1}{9}$ | sb-wrong-ratio | inverted the ratio
E: a = 9/10, r = 1/10: (9/10)/(9/10) = 1.

## sb-f-020 · kind formula · exprs · var: n · domain: { n: [1, 6] } · check: identity 3^n - 1
P: $S_n = \displaystyle\sum_{k=1}^{n} 2\cdot 3^{k-1} = ?$
* $3^{n} - 1$ ✓
- $2\left(3^{n} - 1\right)$ | sb-partial-sum-formula | forgot to divide by 1 − r = −2
- $\frac{3^{n} - 1}{2}$ | arithmetic-error | divided by 2 instead of multiplying by 2/2
- $3^{n-1} - 1$ | exponent-arithmetic | used rⁿ⁻¹ in the formula instead of rⁿ
- $-1$ | sb-partial-sum-formula | used a/(1 − r) for a finite sum
E: Sₙ = a(1 − rⁿ)/(1 − r) = 2(1 − 3ⁿ)/(−2) = 3ⁿ − 1.

## sb-f-021 · kind concept · text · check: none: geometric convergence condition
P: $\displaystyle\sum_{n=1}^{\infty} a r^{n-1}$ (with $a \ne 0$) converges exactly when
* $|r| < 1$ ✓
- $|r| \le 1$ | sb-r-boundary | r = ±1 diverges
- $r < 1$ | sb-r-boundary | r ≤ −1 diverges
- $a < 1$ | sb-wrong-ratio | the first term does not affect convergence
- $a r^{n-1} \to 0$ | sb-divergence-test-converse | terms → 0 is necessary, not sufficient in general (though for geometric series it coincides)
E: Converges iff |r| < 1, to a/(1 − r).

## sb-f-022 · kind formula · exprs · check: value [4, -1/3]
P: For $\displaystyle\sum_{n=1}^{\infty} 4\left(-\frac{1}{3}\right)^{n-1}$, identify $a$ and $r$.
* $a = 4,\quad r = -\frac{1}{3}$ ✓  (expr `[4, -1/3]`)
- $a = -\frac{4}{3},\quad r = -\frac{1}{3}$ | sb-wrong-first-term | used the n = 2 term as a  (expr `[-4/3, -1/3]`)
- $a = 4,\quad r = \frac{1}{3}$ | sb-wrong-ratio | dropped the sign of r  (expr `[4, 1/3]`)
- $a = 4,\quad r = -3$ | sb-wrong-ratio | inverted r  (expr `[4, -3]`)
- $a = 1,\quad r = -\frac{1}{3}$ | sb-wrong-first-term | ignored the coefficient 4  (expr `[1, -1/3]`)
E: The n = 1 term is 4, and each term is −1/3 times the previous one.

## sb-f-023 · kind formula · exprs · var: n · check: identity 1/(n*(n+1))
P: Partial fractions: $\dfrac{1}{n(n+1)} = ?$
* $\frac{1}{n} - \frac{1}{n+1}$ ✓
- $\frac{1}{n} + \frac{1}{n+1}$ | pf-coefficient-wrong | sign of the second coefficient wrong
- $\frac{1}{n+1} - \frac{1}{n}$ | sign-error | both coefficients flipped
- $\frac{1}{n} - \frac{1}{n+2}$ | arithmetic-error | wrong second factor
- $\frac{1}{2n} - \frac{1}{2(n+1)}$ | algebra-error | spurious factor 1/2
E: A/n + B/(n+1): n = 0 gives A = 1, n = −1 gives B = −1.

## sb-f-024 · kind formula · exprs · check: series 1/(n*(n+1)) conv sum 1
P: $\displaystyle\sum_{n=1}^{\infty} \frac{1}{n(n+1)} = ?$
* $1$ ✓
- $\frac{1}{2}$ | sb-telescoping-sum-wrong | kept only b₁ − b₂
- $0$ | sb-sum-is-term-limit | took the limit of the terms
- $2$ | sb-telescoping-sum-wrong | added b₁ and the limit instead of subtracting
- $\frac{3}{2}$ | arithmetic-error | arithmetic slip in the surviving terms
E: Sₙ = 1 − 1/(n+1) → 1.

## sb-f-025 · kind formula · exprs · var: n · domain: { n: [1, 8] } · check: identity n/(n+1)
P: For $\displaystyle\sum_{k=1}^{\infty} \frac{1}{k(k+1)}$, the partial sum $S_n = ?$
* $1 - \frac{1}{n+1}$ ✓
- $1 - \frac{1}{n}$ | sb-telescoping-sum-wrong | kept bₙ instead of bₙ₊₁
- $\frac{1}{n+1}$ | sb-partial-sum-formula | kept the wrong surviving term
- $1$ | sb-sequence-vs-series | wrote the sum of the series instead of the partial sum
- $1 + \frac{1}{n+1}$ | sign-error | added instead of subtracting the last term
E: Σ(1/k − 1/(k+1)) telescopes to 1 − 1/(n+1).

## sb-f-026 · kind formula · exprs · check: series 1/n - 1/(n+2) conv sum 3/2
P: $\displaystyle\sum_{n=1}^{\infty} \left(\frac{1}{n} - \frac{1}{n+2}\right) = ?$
* $\frac{3}{2}$ ✓
- $1$ | sb-telescoping-sum-wrong | assumed only b₁ survives
- $\frac{1}{2}$ | sb-telescoping-sum-wrong | kept only b₁ − b₂
- $0$ | sb-sum-is-term-limit | took the limit of the terms
- $2$ | arithmetic-error | arithmetic slip in 1 + 1/2
E: Sₙ = 1 + 1/2 − 1/(n+1) − 1/(n+2) → 3/2.

## sb-f-027 · kind concept · text · check: series log(n/(n+1)) div
P: $\displaystyle\sum_{n=1}^{\infty} \ln\!\left(\frac{n}{n+1}\right)$:
* Diverges: $S_n = \ln 1 - \ln(n+1) = -\ln(n+1) \to -\infty$ ✓
- Converges to $\ln 1 = 0$ | sb-telescoping-sum-wrong | forgot that bₙ₊₁ = ln(n+1) does not have a finite limit
- Converges to $0$: the terms $\to 0$ | sb-divergence-test-converse | terms → 0 is not enough
- Converges: telescoping series always converge | sb-no-information | telescoping converges only when lim bₙ is finite
- Converges to $-\infty$ | im-divergent-called-convergent | an infinite limit means divergence
E: ln(n/(n+1)) = ln n − ln(n+1) telescopes to −ln(n+1), which is unbounded.

## sb-f-028 · kind formula · exprs · check: series 1/((n+1)*(n+2)) conv sum 1/2
P: $\displaystyle\sum_{n=1}^{\infty} \frac{1}{(n+1)(n+2)} = ?$
* $\frac{1}{2}$ ✓
- $1$ | sb-wrong-first-term | used the sum of Σ 1/(n(n+1)) without the index shift
- $\frac{1}{6}$ | sb-partial-sum-formula | reported the first term as the sum
- $0$ | sb-sum-is-term-limit | took the limit of the terms
- $\frac{1}{3}$ | arithmetic-error | kept 1/(n+2) at n = 1 instead of 1/(n+1)
E: Sₙ = 1/2 − 1/(n+2) → 1/2.

## sb-f-029 · kind formula · exprs · check: series 1/(n^2-1) from 2 conv sum 3/4
P: $\displaystyle\sum_{n=2}^{\infty} \frac{1}{n^{2}-1} = ?$
* $\frac{3}{4}$ ✓
- $\frac{3}{2}$ | pf-coefficient-wrong | dropped the factor 1/2 in the decomposition
- $\frac{1}{2}$ | sb-telescoping-sum-wrong | kept only the first surviving term
- $\frac{1}{4}$ | arithmetic-error | arithmetic slip in (1/2)(1 + 1/2)
- $0$ | sb-sum-is-term-limit | took the limit of the terms
E: 1/(n² − 1) = (1/2)(1/(n−1) − 1/(n+1)); the surviving terms are (1/2)(1 + 1/2) = 3/4.

## sb-f-030 · kind formula · exprs · check: value 7
P: $\sum a_n = 3$ and $\sum b_n = -1$. $\sum (2a_n - b_n) = ?$
* $7$ ✓
- $5$ | sign-error | subtracted +1 instead of −1
- $2$ | arithmetic-error | computed 3 − 1
- $6$ | arithmetic-error | dropped the bₙ sum
- $4$ | algebra-error | computed 2(3 − 1)
E: Linearity: 2·3 − (−1) = 7.

## sb-f-031 · kind concept · text · check: series 1/2^n + 1/n div
P: $\sum \dfrac{1}{2^{n}}$ converges and $\sum \dfrac{1}{n}$ diverges. $\displaystyle\sum \left(\frac{1}{2^{n}} + \frac{1}{n}\right)$:
* Diverges: convergent + divergent is always divergent ✓
- Converges: the convergent part dominates | sb-no-information | there is no such rule
- Insufficient information | sb-no-information | the difference rule settles it: if the sum converged, so would Σ1/n
- Converges to $1 + \infty$ | im-divergent-called-convergent | an infinite sum means divergence
- Converges: the terms $\to 0$ | sb-divergence-test-converse | terms → 0 is not enough
E: If Σ(aₙ + bₙ) converged, Σbₙ = Σ(aₙ + bₙ) − Σaₙ would converge.

## sb-f-032 · kind concept · text · check: none: properties (insufficient information)
P: $\sum a_n$ and $\sum b_n$ both diverge. $\sum (a_n + b_n)$:
* Insufficient information: it may converge or diverge ✓
- Diverges: the sum of two divergent series diverges | sb-no-information | no theorem says so (aₙ = 1, bₙ = −1 gives Σ0)
- Converges: the divergences cancel | sb-split-divergent | no theorem says so either (aₙ = bₙ = 1 gives Σ2)
- Diverges by the divergence test | sb-divergence-test-converse | nothing is known about lim(aₙ + bₙ)
- Converges to $0$ | sb-sum-is-term-limit | there is no basis for a value
E: Examples go both ways, so nothing can be concluded.

## sb-f-033 · kind concept · text · check: none: properties
P: Which manipulation is valid?
* $\displaystyle\sum \left(\frac{1}{2^{n}} + \frac{1}{3^{n}}\right) = \sum \frac{1}{2^{n}} + \sum \frac{1}{3^{n}}$ (both converge) ✓
- $\displaystyle\sum \left(\frac{1}{n} - \frac{1}{n}\right) = \sum \frac{1}{n} - \sum \frac{1}{n} = 0$ | sb-split-divergent | split into two divergent pieces (∞ − ∞)
- $\displaystyle\sum \left(\frac{1}{n} + \frac{1}{n^{2}}\right) = \sum \frac{1}{n} + \sum \frac{1}{n^{2}}$ | sb-no-information | the sum rule needs both series convergent
- $\sum c\,a_n = c \sum a_n$ for every series | sb-split-divergent | valid only when Σaₙ converges
- $\sum a_n b_n = \left(\sum a_n\right)\left(\sum b_n\right)$ | algebra-error | there is no product rule for series
E: The sum rule applies when both series converge.

## sb-f-034 · kind formula · exprs · check: series 3/2^n - 2/3^n conv sum 2
P: $\displaystyle\sum_{n=1}^{\infty} \left(\frac{3}{2^{n}} - \frac{2}{3^{n}}\right) = ?$
* $2$ ✓
- $1$ | sb-wrong-first-term | used 1/(1 − r) for both pieces as if they started at n = 0
- $4$ | sign-error | added the two sums
- $\frac{2}{3}$ | sb-partial-sum-formula | reported the first term
- $0$ | sb-sum-is-term-limit | took the limit of the terms
E: 3·1 − 2·(1/2) = 2.

## sb-f-035 · kind formula · exprs · check: value 5
P: $S_n = n^{2}$. Then $a_3 = ?$
* $5$ ✓
- $9$ | sb-sequence-vs-series | reported S₃
- $6$ | arithmetic-error | used 2n
- $3$ | arithmetic-error | reported n
- $7$ | arithmetic-error | computed a₄
E: a₃ = S₃ − S₂ = 9 − 4 = 5.

## Generators

### sb-g-geometric-sum · kind formula · exprs · describe: "sum of a geometric series from a given index"
Table (a, r, s), index (seed − 1) % 8: (3, 1/2, 1), (2, 1/3, 2), (5, −1/2, 1), (4, 2/3, 2), (1, 1/4, 1), (6, −1/3, 2), (2, 3/4, 1), (9, 1/3, 2).
P: $\displaystyle\sum_{n=s}^{\infty} a\,r^{n} = ?$ (render a·r^n with the numbers, e.g. 3\left(\frac{1}{2}\right)^{n})
check: series a*r^n from s conv sum a*r^s/(1-r) (as a reduced fraction string, e.g. '3' for (3,1/2,1); compute: a r^s/(1 − r))
* a r^s/(1 − r) ✓
- a/(1 − r) | sb-wrong-first-term | used a as the first term although the series starts at n = s
- a r^s/(1 + r) | sb-wrong-ratio | used 1 + r in the denominator
- a r^s (1 − r) | sb-partial-sum-formula | multiplied by 1 − r instead of dividing
- a r^s/(r − 1) | sign-error | wrote r − 1 instead of 1 − r
E: First term a r^s, ratio r: sum = (first term)/(1 − r).

### sb-g-telescoping · kind formula · exprs · describe: "telescoping sum Σ 1/((n+p)(n+p+1))"
Table p, index (seed − 1) % 8: 1, 2, 3, 4, 5, 6, 7, 8.
P: $\displaystyle\sum_{n=1}^{\infty} \frac{1}{(n+p)(n+p+1)} = ?$ (render with the numbers, e.g. (n+1)(n+2))
check: series 1/((n+p)*(n+p+1)) conv sum 1/(p+1)
* 1/(p+1) ✓
- 1 | sb-telescoping-sum-wrong | assumed b₁ = 1 as in Σ 1/(n(n+1))
- 1/(p+2) | arithmetic-error | off by one in the surviving term
- 1/((p+1)(p+2)) | sb-telescoping-sum-wrong | kept only the first difference b₁ − b₂
- 0 | sb-sum-is-term-limit | took the limit of the terms
E: 1/((n+p)(n+p+1)) = 1/(n+p) − 1/(n+p+1); the surviving term is 1/(1+p).
