# Step-Through plan — series basics (topic id `series-basics`, prefix `sb`)
Conventions: qa/briefs/steps-typist.md. Each step's distractors are written as a decoy-hub family: D1 is the hub, D2 and
D3 are D1 with one more change (compound mistakes; tags name the primary slip), D4 is a separate single mistake.
Verdict finals have no expr. `series` checks: term in n, from, converges, sum.

## sb-s-01 · difficulty 1 · title "Geometric series: a and r"
S: text "Find the sum, if it exists." · latex "\sum_{n=1}^{\infty} 3\left(\frac{1}{2}\right)^{n-1}"
### step 1 · check: value [3, 1/2]
P: Identify the first term $a$ and the ratio $r$.
* $a = 3,\quad r = \frac{1}{2}$ (expr `[3, 1/2]`)
- $a = \frac{3}{2},\quad r = \frac{1}{2}$ (expr `[3/2, 1/2]`) | sb-wrong-first-term | used the n = 2 term as a
- $a = \frac{3}{2},\quad r = 2$ (expr `[3/2, 2]`) | sb-wrong-first-term | used the n = 2 term as a and inverted r
- $a = \frac{3}{2},\quad r = \frac{1}{4}$ (expr `[3/2, 1/4]`) | sb-wrong-first-term | used the n = 2 term as a and squared r
- $a = 1,\quad r = \frac{1}{2}$ (expr `[1, 1/2]`) | sb-wrong-first-term | ignored the coefficient 3
E: At n = 1 the term is 3·(1/2)⁰ = 3; each term is half the previous one.
R latex: a = 3,\quad r = \frac{1}{2}
### step 2 · check: none: convergence condition
P: Does the series converge?
* Yes: $|r| = \frac{1}{2} < 1$
- No: $r = \frac{1}{2} \le 1$ fails the condition $r > 1$ | sb-r-boundary | the condition is |r| < 1
- No: $r = \frac{1}{2} \le 1$ fails the condition, and the terms do not tend to $0$ | sb-r-boundary | |r| < 1 holds, and the terms do tend to 0
- No: $a = 3 > 1$ fails the condition $r > 1$ | sb-r-boundary | a plays no role in convergence
- Yes, because $a_n \to 0$ | sb-divergence-test-converse | right verdict, invalid reason
E: A geometric series converges exactly when |r| < 1.
R text: Converges ($|r| < 1$)
### step 3 · check: series 3*(1/2)^(n-1) conv sum 6
P: Compute the sum.
* $6$ (expr `6`)
- $\frac{3}{2}$ (expr `3/2`) | sb-partial-sum-formula | computed a(1 − r)
- $\frac{3}{4}$ (expr `3/4`) | sb-partial-sum-formula | computed a(1 − r) and halved it
- $\frac{1}{2}$ (expr `1/2`) | sb-partial-sum-formula | computed a(1 − r) with a = 1
- $2$ (expr `2`) | sb-wrong-first-term | used a = 1 in a/(1 − r)
E: a/(1 − r) = 3/(1/2) = 6.
R latex: S = \frac{3}{1 - 1/2} = 6
FINAL: latex "6" · expr `6` · check: series 3*(1/2)^(n-1) conv sum 6 · recap: a = 3, r = 1/2 → |r| < 1 → sum a/(1 − r) = 6.

## sb-s-02 · difficulty 1 · title "Watch the starting index"
S: text "Find the sum, if it exists." · latex "\sum_{n=0}^{\infty} \left(\frac{1}{3}\right)^{n}"
### step 1 · check: value [1, 1/3]
P: Identify $a$ (the first term) and $r$.
* $a = 1,\quad r = \frac{1}{3}$ (expr `[1, 1/3]`)
- $a = \frac{1}{3},\quad r = \frac{1}{3}$ (expr `[1/3, 1/3]`) | sb-wrong-first-term | the series starts at n = 0, where the term is 1
- $a = \frac{1}{3},\quad r = 3$ (expr `[1/3, 3]`) | sb-wrong-first-term | started at n = 1 and inverted r
- $a = \frac{1}{3},\quad r = \frac{1}{9}$ (expr `[1/3, 1/9]`) | sb-wrong-first-term | started at n = 1 and squared r
- $a = 0,\quad r = \frac{1}{3}$ (expr `[0, 1/3]`) | sb-wrong-first-term | the first term is (1/3)⁰ = 1, not the index 0
E: a is the actual first term: (1/3)⁰ = 1.
R latex: a = 1,\quad r = \frac{1}{3}
### step 2 · check: series (1/3)^n from 0 conv sum 3/2
P: $|r| < 1$, so compute the sum.
* $\frac{3}{2}$ (expr `3/2`)
- $\frac{1}{2}$ (expr `1/2`) | sb-wrong-first-term | used a = 1/3
- $\frac{1}{6}$ (expr `1/6`) | sb-wrong-first-term | used a = 1/3 and multiplied by 1 − r instead of dividing
- $\frac{1}{4}$ (expr `1/4`) | sb-wrong-first-term | used a = 1/3 and 1 + r in the denominator
- $\frac{2}{3}$ (expr `2/3`) | sb-partial-sum-formula | computed a(1 − r)
E: 1/(1 − 1/3) = 3/2.
R latex: S = \frac{1}{1 - 1/3} = \frac{3}{2}
FINAL: latex "\frac{3}{2}" · expr `3/2` · check: series (1/3)^n from 0 conv sum 3/2 · recap: The index starts at 0, so a = 1 → r = 1/3 → 1/(1 − 1/3) = 3/2.

## sb-s-03 · difficulty 2 · title "Rewrite into geometric form"
S: text "Find the sum, if it exists." · latex "\sum_{n=1}^{\infty} \frac{2^{n}}{3^{n+1}}"
### step 1 · check: identity 2^n/3^(n+1) · var: n · domain: { n: [1, 5] }
P: Rewrite the term as $a\cdot r^{n}$ or $a\cdot r^{n-1}$.
* $\frac{1}{3}\left(\frac{2}{3}\right)^{n}$ (expr `(1/3)*(2/3)^n`)
- $\left(\frac{2}{3}\right)^{n}$ (expr `(2/3)^n`) | algebra-error | the extra factor 1/3 from 3^{n+1} was dropped
- $\left(\frac{2}{3}\right)^{n+1}$ (expr `(2/3)^(n+1)`) | algebra-error | dropped the 1/3 and moved the +1 onto the whole ratio
- $3\left(\frac{2}{3}\right)^{n}$ (expr `3*(2/3)^n`) | algebra-error | dropped the 1/3 and multiplied by 3 instead
- $\frac{1}{3}\left(\frac{2}{3}\right)^{n-1}$ (expr `(1/3)*(2/3)^(n-1)`) | exponent-arithmetic | the exponent on 2/3 is n, not n − 1
E: 3^{n+1} = 3·3ⁿ, so the term is (1/3)(2/3)ⁿ.
R latex: \frac{2^{n}}{3^{n+1}} = \frac{1}{3}\left(\frac{2}{3}\right)^{n}
### step 2 · check: value [2/9, 2/3]
P: Identify $a$ (first term, $n = 1$) and $r$.
* $a = \frac{2}{9},\quad r = \frac{2}{3}$ (expr `[2/9, 2/3]`)
- $a = \frac{1}{3},\quad r = \frac{2}{3}$ (expr `[1/3, 2/3]`) | sb-wrong-first-term | took the coefficient 1/3 as a; the n = 1 term is 2/9
- $a = \frac{1}{3},\quad r = \frac{3}{2}$ (expr `[1/3, 3/2]`) | sb-wrong-first-term | took the coefficient as a and inverted r
- $a = \frac{1}{3},\quad r = \frac{2}{9}$ (expr `[1/3, 2/9]`) | sb-wrong-first-term | took the coefficient as a and the first term as r
- $a = \frac{2}{3},\quad r = \frac{2}{3}$ (expr `[2/3, 2/3]`) | sb-wrong-first-term | used the n = 0 term
E: a = (1/3)(2/3) = 2/9 and r = 2/3.
R latex: a = \frac{2}{9},\quad r = \frac{2}{3}
### step 3 · check: series 2^n/3^(n+1) conv sum 2/3
P: $|r| < 1$: compute the sum.
* $\frac{2}{3}$ (expr `2/3`)
- $1$ (expr `1`) | sb-wrong-first-term | used a = 1/3
- $\frac{1}{3}$ (expr `1/3`) | sb-wrong-first-term | used a = 1/3 and forgot to divide by 1 − r
- $\frac{1}{5}$ (expr `1/5`) | sb-wrong-first-term | used a = 1/3 and 1 + r in the denominator
- $\frac{2}{9}$ (expr `2/9`) | sb-partial-sum-formula | reported the first term as the sum
E: (2/9)/(1/3) = 2/3.
R latex: S = \frac{2/9}{1 - 2/3} = \frac{2}{3}
NOTE: for the `series` check use term `(1/3)*(2/3)^n` (2^n/3^(n+1) overflows the numeric check).
FINAL: latex "\frac{2}{3}" · expr `2/3` · check: series (1/3)*(2/3)^n conv sum 2/3 · recap: Rewrite as (1/3)(2/3)ⁿ → a = 2/9, r = 2/3 → (2/9)/(1/3) = 2/3.

## sb-s-04 · difficulty 1 · title "Divergence test"
S: text "Does the series converge?" · latex "\sum_{n=1}^{\infty} \frac{n}{n+1}"
### step 1 · check: none: flowchart
P: Which test comes first?
* The divergence test: compute $\lim a_n$
- Find $S_n$ in closed form | sb-partial-sum-formula | there is no closed form here; the limit of the terms is faster
- Find $S_n$ in closed form, then take $\lim S_n$ | sb-partial-sum-formula | no closed form here
- Find $S_n$ by partial fractions | sb-partial-sum-formula | n/(n+1) is not a telescoping difference
- Check whether it is geometric | sb-wrong-ratio | the ratio aₙ₊₁/aₙ is not constant
E: The divergence test is always the first check.
R text: Divergence test first
### step 2 · check: value 1
P: $\lim_{n\to\infty} \dfrac{n}{n+1} = ?$
* $1$ (expr `1`)
- $0$ (expr `0`) | sq-dominant-term | the degrees are equal
- $\infty$ cannot be an expr; use $-1$ (expr `-1`) | sq-dominant-term | the degrees are equal; sign slip too
- $2$ (expr `2`) | sq-dominant-term | the degrees are equal; arithmetic slip too
- $\frac{1}{2}$ (expr `1/2`) | sq-term-vs-limit | the first term
E: Equal degrees, ratio of leading coefficients 1.
R latex: \lim a_n = 1
NOTE step 2 option 2: latex "-1", expr -1; drop the words.
### step 3 · check: series n/(n+1) div
P: Conclude.
* $\lim a_n = 1 \ne 0$: the series diverges
- $\lim a_n = 1$ is finite: the series converges | st-wrong-inference | a finite nonzero limit of the terms means divergence
- $\lim a_n = 1$ is finite: the series converges to $1$ | sb-sum-is-term-limit | the limit of the terms is neither the sum nor a sign of convergence
- $\lim a_n = 1$ is finite: the test is inconclusive | sb-divergence-test-converse | the test is inconclusive only when the limit is 0
- $S_n = \dfrac{n}{n+1} \to 1$: converges to $1$ | sb-sequence-vs-series | n/(n+1) is the term, not the partial sum
E: Terms not tending to 0 ⇒ divergence.
R text: Diverges
FINAL: latex "\text{diverges}" · check: series n/(n+1) div · recap: Divergence test first → aₙ → 1 ≠ 0 → diverges.

## sb-s-05 · difficulty 2 · title "Telescoping"
S: text "Find the sum, if it exists." · latex "\sum_{n=1}^{\infty} \frac{1}{n(n+1)}"
### step 1 · check: identity 1/(n*(n+1)) · var: n
P: Decompose the term.
* $\frac{1}{n} - \frac{1}{n+1}$ (expr `1/n - 1/(n+1)`)
- $\frac{1}{n} + \frac{1}{n+1}$ (expr `1/n + 1/(n+1)`) | pf-coefficient-wrong | wrong sign on the second coefficient
- $\frac{1}{n} + \frac{1}{n+2}$ (expr `1/n + 1/(n+2)`) | pf-coefficient-wrong | wrong sign and wrong second factor
- $\frac{1}{2n} + \frac{1}{2(n+1)}$ (expr `1/(2*n) + 1/(2*(n+1))`) | pf-coefficient-wrong | wrong sign and a spurious 1/2
- $\frac{1}{n+1} - \frac{1}{n}$ (expr `1/(n+1) - 1/n`) | sign-error | both coefficients flipped
E: A/n + B/(n+1): n = 0 gives A = 1, n = −1 gives B = −1.
R latex: \frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}
### step 2 · check: identity n/(n+1) · var: n · domain: { n: [1, 8] }
P: Write the partial sum $S_n$.
* $1 - \frac{1}{n+1}$ (expr `1 - 1/(n+1)`)
- $1 - \frac{1}{n}$ (expr `1 - 1/n`) | sb-telescoping-sum-wrong | kept bₙ instead of bₙ₊₁
- $1 + \frac{1}{n}$ (expr `1 + 1/n`) | sb-telescoping-sum-wrong | kept bₙ and added it
- $2 - \frac{1}{n}$ (expr `2 - 1/n`) | sb-telescoping-sum-wrong | kept bₙ and counted b₁ twice
- $\frac{1}{n+1}$ (expr `1/(n+1)`) | sb-partial-sum-formula | kept the wrong surviving term
E: Σ(1/k − 1/(k+1)) collapses to b₁ − bₙ₊₁ = 1 − 1/(n+1).
R latex: S_n = 1 - \frac{1}{n+1}
### step 3 · check: series 1/(n*(n+1)) conv sum 1
P: Take $\lim S_n$ and conclude.
* $S_n \to 1$: converges to $1$
- $S_n \to 0$: converges to $0$ | sb-sum-is-term-limit | 1/(n+1) → 0, so Sₙ → 1, not 0
- $S_n \to 0$: converges to $0$ because the terms tend to $0$ | sb-sum-is-term-limit | terms → 0 says nothing about the sum
- $S_n \to 0$: the series diverges | sb-sum-is-term-limit | Sₙ → 1, and a finite limit would mean convergence anyway
- $S_n \to \tfrac{1}{2}$: converges to $\tfrac{1}{2}$ | sb-telescoping-sum-wrong | that is S₁, not the limit
E: Sum = lim Sₙ = 1.
R latex: S = 1
FINAL: latex "1" · expr `1` · check: series 1/(n*(n+1)) conv sum 1 · recap: Partial fractions → telescoping Sₙ = 1 − 1/(n+1) → sum 1.

## sb-s-06 · difficulty 2 · title "Telescoping with a factor"
S: text "Find the sum, if it exists." · latex "\sum_{n=2}^{\infty} \frac{1}{n^{2}-1}"
### step 1 · check: identity 1/(n^2-1) · var: n · domain: { n: [2, 8] }
P: Decompose the term.
* $\frac{1}{2}\left(\frac{1}{n-1} - \frac{1}{n+1}\right)$ (expr `1/2*(1/(n-1) - 1/(n+1))`)
- $\frac{1}{n-1} - \frac{1}{n+1}$ (expr `1/(n-1) - 1/(n+1)`) | pf-coefficient-wrong | dropped the factor 1/2
- $\frac{1}{n-1} + \frac{1}{n+1}$ (expr `1/(n-1) + 1/(n+1)`) | pf-coefficient-wrong | dropped the 1/2 and the sign
- $\frac{1}{n-1} - \frac{1}{n}$ (expr `1/(n-1) - 1/n`) | pf-coefficient-wrong | dropped the 1/2 and used the wrong second factor
- $\frac{1}{2}\left(\frac{1}{n+1} - \frac{1}{n-1}\right)$ (expr `1/2*(1/(n+1) - 1/(n-1))`) | sign-error | both coefficients flipped
E: 1/((n−1)(n+1)): A = 1/2 at n = 1, B = −1/2 at n = −1.
R latex: \frac{1}{n^{2}-1} = \frac{1}{2}\left(\frac{1}{n-1} - \frac{1}{n+1}\right)
### step 2 · check: none: surviving terms
P: Which terms survive in $S_n$ (from $n = 2$)?
* $\frac{1}{2}\left(1 + \frac{1}{2} - \frac{1}{n} - \frac{1}{n+1}\right)$
- $\frac{1}{2}\left(1 - \frac{1}{n+1}\right)$ | sb-telescoping-sum-wrong | with a gap of 2, two terms survive at each end
- $1 - \frac{1}{n+1}$ | sb-telescoping-sum-wrong | two terms survive at each end, and the 1/2 was dropped
- $\frac{1}{2}\left(1 - \frac{1}{n}\right)$ | sb-telescoping-sum-wrong | two terms survive at each end, and the wrong tail term was kept
- $\frac{1}{2}\left(1 + \frac{1}{2}\right)$ | sb-sequence-vs-series | that is the limit, not Sₙ
E: 1/(n−1) − 1/(n+1) skips one index, so the first two and the last two terms survive.
R latex: S_n = \frac{1}{2}\left(\frac{3}{2} - \frac{1}{n} - \frac{1}{n+1}\right)
### step 3 · check: series 1/(n^2-1) from 2 conv sum 3/4
P: Take the limit.
* $\frac{3}{4}$ (expr `3/4`)
- $\frac{3}{2}$ (expr `3/2`) | pf-coefficient-wrong | dropped the 1/2
- $3$ (expr `3`) | pf-coefficient-wrong | dropped the 1/2 and doubled again
- $1$ (expr `1`) | pf-coefficient-wrong | dropped the 1/2 and kept only the first surviving term
- $\frac{1}{2}$ (expr `1/2`) | sb-telescoping-sum-wrong | kept only the first surviving term
E: (1/2)(3/2) = 3/4.
R latex: S = \frac{3}{4}
FINAL: latex "\frac{3}{4}" · expr `3/4` · check: series 1/(n^2-1) from 2 conv sum 3/4 · recap: Decompose with the factor 1/2 → two surviving terms at each end → (1/2)(1 + 1/2) = 3/4.

## sb-s-07 · difficulty 2 · title "Telescoping that diverges"
S: text "Does the series converge?" · latex "\sum_{n=1}^{\infty} \ln\!\left(\frac{n}{n+1}\right)"
### step 1 · check: identity log(n/(n+1)) · var: n
P: Rewrite the term.
* $\ln n - \ln(n+1)$ (expr `log(n) - log(n+1)`)
- $\ln(n+1) - \ln n$ (expr `log(n+1) - log(n)`) | sign-error | ln(a/b) = ln a − ln b
- $\ln(n+1) + \ln n$ (expr `log(n+1) + log(n)`) | sign-error | ln(a/b) is a difference, with the signs the other way
- $\ln(n+1) - \ln n - 1$ (expr `log(n+1) - log(n) - 1`) | sign-error | reversed the difference and subtracted a spurious 1
- $\dfrac{\ln n}{\ln(n+1)}$ (expr `log(n)/log(n+1)`) | ln-misapplied | ln of a quotient is not a quotient of logs
E: ln(n/(n+1)) = ln n − ln(n+1), a telescoping difference bₙ − bₙ₊₁ with bₙ = ln n.
R latex: a_n = \ln n - \ln(n+1)
### step 2 · check: identity -log(n+1) · var: n · domain: { n: [1, 8] }
P: Write $S_n$.
* $-\ln(n+1)$ (expr `-log(n+1)`)
- $\ln(n+1)$ (expr `log(n+1)`) | sb-telescoping-sum-wrong | b₁ − bₙ₊₁ = 0 − ln(n+1)
- $\ln n$ (expr `log(n)`) | sb-telescoping-sum-wrong | wrong sign and kept bₙ instead of bₙ₊₁
- $1 + \ln(n+1)$ (expr `1 + log(n+1)`) | sb-telescoping-sum-wrong | wrong sign and used b₁ = 1 instead of ln 1 = 0
- $0$ (expr `0`) | sb-telescoping-sum-wrong | kept only b₁ = ln 1
E: Sₙ = b₁ − bₙ₊₁ = ln 1 − ln(n+1).
R latex: S_n = -\ln(n+1)
### step 3 · check: series log(n/(n+1)) div
P: Conclude.
* $S_n = -\ln(n+1) \to -\infty$: diverges
- $S_n \to 0$: converges to $0$ | im-limit-evaluated-wrong | ln(n+1) → ∞
- $S_n \to 0$: converges to $0$, since the terms $\to 0$ | sb-divergence-test-converse | terms → 0 is not enough, and Sₙ is unbounded
- $S_n \to 0$: converges to $\ln 1 = 0$ | sb-telescoping-sum-wrong | b₁ − lim bₙ needs lim bₙ finite, which fails
- Converges to $-\infty$ | im-divergent-called-convergent | an infinite limit means divergence
E: The partial sums are unbounded, so the series diverges even though the terms → 0.
R text: Diverges
FINAL: latex "\text{diverges}" · check: series log(n/(n+1)) div · recap: ln(n/(n+1)) = ln n − ln(n+1) telescopes → Sₙ = −ln(n+1) → unbounded → diverges.

## sb-s-08 · difficulty 1 · title "Geometric with |r| ≥ 1"
S: text "Does the series converge?" · latex "\sum_{n=1}^{\infty} \left(\frac{3}{2}\right)^{n}"
### step 1 · check: value [3/2, 3/2]
P: Identify $a$ and $r$.
* $a = \frac{3}{2},\quad r = \frac{3}{2}$ (expr `[3/2, 3/2]`)
- $a = 1,\quad r = \frac{3}{2}$ (expr `[1, 3/2]`) | sb-wrong-first-term | the n = 1 term is 3/2
- $a = 1,\quad r = \frac{2}{3}$ (expr `[1, 2/3]`) | sb-wrong-first-term | used a = 1 and inverted r
- $a = 1,\quad r = \frac{9}{4}$ (expr `[1, 9/4]`) | sb-wrong-first-term | used a = 1 and squared r
- $a = \frac{3}{2},\quad r = \frac{2}{3}$ (expr `[3/2, 2/3]`) | sb-wrong-ratio | inverted r
E: First term (3/2)¹, ratio 3/2.
R latex: a = r = \frac{3}{2}
### step 2 · check: series (3/2)^n div
P: Does it converge?
* No: $|r| = \frac{3}{2} \ge 1$, so the geometric series diverges
- Yes: $r = \frac{3}{2} > 0$ | sb-r-boundary | the condition is |r| < 1
- Yes: $r = \frac{3}{2} > 0$, with sum $\dfrac{3/2}{1 - 3/2} = -3$ | sb-r-boundary | a/(1 − r) applies only when |r| < 1
- Yes: $r = \frac{3}{2} > 0$, with sum $\dfrac{3/2}{3/2 - 1} = 3$ | sb-r-boundary | the formula does not apply, whatever the sign
- Inconclusive: apply the divergence test | sb-divergence-test-converse | the geometric rule already decides (and the terms → ∞)
E: |r| ≥ 1 ⇒ divergent.
R text: Diverges
FINAL: latex "\text{diverges}" · check: series (3/2)^n div · recap: r = 3/2, |r| ≥ 1 → diverges.

## sb-s-09 · difficulty 2 · title "Properties: convergent + divergent"
S: text "Does the series converge?" · latex "\sum_{n=1}^{\infty} \left(\frac{1}{2^{n}} + \frac{1}{n}\right)"
### step 1 · check: series 1/2^n conv sum 1
P: What is $\sum_{n=1}^{\infty} \dfrac{1}{2^{n}}$?
* Converges to $1$ (geometric, $a = r = \tfrac{1}{2}$)
- Converges to $2$ (geometric, $a = 1$, $r = \tfrac{1}{2}$) | sb-wrong-first-term | the n = 1 term is 1/2
- Converges to $2$, the limit of the terms | sb-wrong-first-term | wrong a, and the sum is not a limit of terms
- Converges to $2$ by the divergence test | sb-wrong-first-term | wrong a, and the divergence test never gives a sum
- Diverges: $\tfrac{1}{2^{n}} \to 0$ | sb-divergence-test-converse | terms → 0 does not mean divergence (or convergence)
E: a/(1 − r) = (1/2)/(1/2) = 1.
R latex: \sum \frac{1}{2^{n}} = 1
NOTE step 1: options are text-only (no exprs); check `series 1/2^n conv sum 1` is a claim check on the correct option's series.
### step 2 · check: series 1/n div
P: What about $\sum_{n=1}^{\infty} \dfrac{1}{n}$?
* Diverges (the harmonic series)
- Converges, since $\tfrac{1}{n} \to 0$ | sb-divergence-test-converse | terms → 0 never proves convergence
- Converges to $0$, since $\tfrac{1}{n} \to 0$ | sb-sum-is-term-limit | the limit of the terms is not the sum
- Converges to $1$, since $\tfrac{1}{n} \to 0$ and $a = 1$ | sb-wrong-ratio | 1/n is not geometric
- Inconclusive | sb-no-information | the harmonic series is known to diverge
E: Σ1/n diverges (p = 1).
R text: $\sum 1/n$ diverges
### step 3 · check: series 1/2^n + 1/n div
P: Conclude about $\sum \left(\dfrac{1}{2^{n}} + \dfrac{1}{n}\right)$.
* Diverges: convergent + divergent is divergent (if the sum converged, so would $\sum \tfrac{1}{n}$)
- Insufficient information: the sum rule needs both series convergent | sb-no-information | the difference rule settles it
- Insufficient information, so test it with the divergence test | sb-no-information | the difference rule settles it; the divergence test is inconclusive here
- Insufficient information: it depends on which piece dominates | sb-no-information | the difference rule settles it; no "domination" rule exists
- Converges to $1 + \sum \tfrac{1}{n}$ | sb-split-divergent | one piece is divergent, so the split is meaningless
E: Σbₙ = Σ(aₙ + bₙ) − Σaₙ would converge if the total did.
R text: Diverges
FINAL: latex "\text{diverges}" · check: series 1/2^n + 1/n div · recap: Σ1/2ⁿ = 1 converges, Σ1/n diverges → their sum diverges by the difference rule.
