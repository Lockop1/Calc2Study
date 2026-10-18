# Step-Through plan — sequences (topic id `sequences`, prefix `sq`)
Conventions: qa/briefs/steps-typist.md. Limit-value steps use `check: value <expr>` with expr options, or `limit` checks
(the term in n, `variable: 'n'` is the default for limit checks). Verdict finals (DNE / diverges) have no expr.

## sq-s-01 · difficulty 1 · title "The class example"
S: text "Does the sequence converge? If so, find the limit." · latex "a_n = \frac{2^{2n+1}}{3^{n}}"
### step 1 · check: none: first move
P: What is the first move?
* Rewrite $2^{2n+1} = 2\cdot 4^{n}$ so the term becomes $a\cdot r^{n}$
- Take the limit directly: $\dfrac{\infty}{\infty} = 1$ | sq-substitute-infinity | ∞/∞ is indeterminate
- Compare the exponents: $2n + 1 > n$, so it diverges | sq-dominant-term | the bases differ, so the exponents alone decide nothing
- Compute $a_1, a_2, a_3$ and look for a pattern | sq-first-terms | a few terms never prove a limit
- Use L'Hôpital on $\dfrac{2^{2x+1}}{3^{x}}$ | sq-theorem-misattributed | allowed in principle, but the geometric rewrite is the intended tool
E: Separate the constant from the power: 2^{2n+1} = 2·(2²)ⁿ.
R latex: a_n = \frac{2\cdot 4^{n}}{3^{n}}
### step 2 · check: identity 2^(2*n+1)/3^n · var: n · domain: { n: [1, 5] }
P: Write $a_n$ as $a\cdot r^{n}$.
* $2\left(\dfrac{4}{3}\right)^{n}$ (expr `2*(4/3)^n`)
- $2\left(\dfrac{2}{3}\right)^{n}$ (expr `2*(2/3)^n`) | exponent-arithmetic | 2^{2n} = 4ⁿ, not 2ⁿ
- $\left(\dfrac{4}{3}\right)^{n}$ (expr `(4/3)^n`) | algebra-error | the factor 2 was dropped
- $\left(\dfrac{8}{3}\right)^{n}$ (expr `(8/3)^n`) | exponent-arithmetic | 2^{2n+1} is not 8ⁿ
- $4\left(\dfrac{4}{3}\right)^{n}$ (expr `4*(4/3)^n`) | arithmetic-error | 2^{2n+1} = 2·4ⁿ, not 4·4ⁿ
E: (2·4ⁿ)/3ⁿ = 2(4/3)ⁿ.
R latex: a_n = 2\left(\frac{4}{3}\right)^{n},\quad r = \frac{4}{3}
### step 3 · check: none: the {r^n} rule
P: What does the $\{r^{n}\}$ rule say here?
* $r = \tfrac{4}{3} > 1$, so $r^{n} \to \infty$: the sequence diverges
- $r = \tfrac{4}{3}$ is positive, so $r^{n} \to 1$ | sq-rn-boundary | rⁿ → 1 only for r = 1
- $r = \tfrac{4}{3}$, so $r^{n} \to 0$ | sq-rn-boundary | rⁿ → 0 needs |r| < 1
- The rule needs $-1 < r \le 1$; since $r > 1$ the rule says nothing | sq-rn-boundary | outside that interval the rule says: diverges
- $r = \tfrac{4}{3}$ is close to 1, so the sequence converges to $2$ | sq-first-terms | the terms grow without bound, however slowly at first
E: For r > 1, {rⁿ} is unbounded.
R text: Diverges ($r = 4/3 > 1$)
FINAL: latex "\text{diverges } (a_n \to \infty)" · check: limit 2*(4/3)^n → infinity · recap: Rewrite 2^{2n+1}/3ⁿ as 2(4/3)ⁿ → r = 4/3 > 1 → the sequence diverges.

## sq-s-02 · difficulty 1 · title "Rational sequence"
S: text "Find the limit." · latex "a_n = \frac{3n^{2}+1}{n^{2}-5}"
### step 1 · check: none: method choice
P: Which rule applies?
* Equal degrees: divide top and bottom by $n^{2}$ (ratio of leading coefficients)
- Plug in $n = \infty$: $\dfrac{\infty}{\infty} = 1$ | sq-substitute-infinity | ∞/∞ is indeterminate
- Degree of the top is bigger, so the limit is $\infty$ | sq-dominant-term | both degrees are 2
- Degree of the bottom is bigger, so the limit is $0$ | sq-dominant-term | both degrees are 2
- Plug in $n = 1$: $a_1 = -1$ | sq-term-vs-limit | a term is not the limit
E: Both degrees are 2, so the limit is the ratio of the leading coefficients.
R latex: a_n = \frac{3 + 1/n^{2}}{1 - 5/n^{2}}
### step 2 · check: value 3
P: Take the limit.
* $3$ (expr `3`)
- $1$ (expr `1`) | sq-substitute-infinity | ∞/∞ cancelled to 1
- $0$ (expr `0`) | sq-dominant-term | 1/n² → 0, but the 3 and the 1 remain
- $-\dfrac{1}{5}$ (expr `-1/5`) | sq-term-vs-limit | the value at n = 0
- $-\dfrac{3}{5}$ (expr `-3/5`) | arithmetic-error | divided by the constant term
E: 1/n² → 0, leaving 3/1.
R latex: \lim_{n\to\infty} a_n = 3
FINAL: latex "3" · expr `3` · check: limit (3*n^2+1)/(n^2-5) → 3 · recap: Equal degrees → divide by n² → the 1/n² terms vanish → 3.

## sq-s-03 · difficulty 2 · title "L'Hôpital through the Underlying Function Theorem"
S: text "Find the limit." · latex "a_n = \frac{\ln n}{n}"
### step 1 · check: none: theorem choice
P: The form is $\infty/\infty$. What justifies using L'Hôpital's rule?
* The Underlying Function Theorem: if $f(x) = \dfrac{\ln x}{x}$ has $\lim_{x\to\infty} f(x) = L$, then $a_n \to L$
- Nothing: L'Hôpital never applies to sequences | sq-theorem-misattributed | the theorem transfers the function limit to the sequence
- The Continuous Function Theorem | sq-theorem-misattributed | that theorem moves a limit through a continuous f
- The Squeeze Theorem | sq-theorem-misattributed | no bounds are being used
- The Monotone Convergence Theorem | sq-theorem-misattributed | that gives convergence, not the value
E: Replace n by a real variable x; the function's limit is the sequence's limit.
R latex: \lim_{n\to\infty} \frac{\ln n}{n} = \lim_{x\to\infty} \frac{\ln x}{x}
### step 2 · check: identity 1/x · var: x · domain: [1, 5]
P: Apply L'Hôpital: differentiate top and bottom.
* $\dfrac{1/x}{1}$ (expr `(1/x)/1`)
- $\dfrac{1}{1/x}$ (expr `1/(1/x)`) | algebra-error | L'Hôpital applied upside down
- $\dfrac{1}{x}\cdot\dfrac{1}{1}$ differentiated again: $-\dfrac{1}{x^{2}}$ (expr `-1/x^2`) | algebra-error | one application is enough; do not keep differentiating
- $\dfrac{\ln x}{1}$ (expr `log(x)`) | sq-limit-law-misuse | only the denominator was differentiated
- $\dfrac{x}{\ln x}$ (expr `x/log(x)`) | algebra-error | inverted the quotient instead of differentiating
E: (ln x)′ = 1/x and (x)′ = 1.
R latex: = \lim_{x\to\infty} \frac{1/x}{1}
### step 3 · check: value 0
P: Evaluate.
* $0$ (expr `0`)
- $1$ (expr `1`) | sq-substitute-infinity | ∞/∞ cancelled to 1
- $\infty$ is not an expr; use: $e$ (expr `e`) | sq-theorem-misattributed | confused with (1 + 1/n)^n
- $-1$ (expr `-1`) | sign-error | sign slip
- $\dfrac{1}{2}$ (expr `1/2`) | arithmetic-error | arithmetic slip
E: 1/x → 0, so ln n / n → 0.
R latex: \lim_{n\to\infty} \frac{\ln n}{n} = 0
NOTE for step 3 option 2: the latex is just "e" (expr e); drop the words before it.
FINAL: latex "0" · expr `0` · check: limit log(n)/n → 0 · recap: ∞/∞ → Underlying Function Theorem → L'Hôpital gives (1/x)/1 → 0.

## sq-s-04 · difficulty 2 · title "An e-type limit"
S: text "Find the limit." · latex "a_n = \left(1 + \frac{2}{n}\right)^{n}"
### step 1 · check: none: method
P: The form is $1^{\infty}$. What is the right move?
* Take logarithms: $\ln a_n = n\ln\!\left(1 + \tfrac{2}{n}\right)$, find its limit, then exponentiate
- $1^{\infty} = 1$, so the limit is $1$ | sq-substitute-infinity | 1^∞ is indeterminate
- Use the standard limit directly: it equals $e$ | sq-theorem-misattributed | the standard limit has 1/n, not 2/n
- Expand with the binomial theorem and keep the first two terms | algebra-error | infinitely many terms matter
- Squeeze between $1$ and $3^{n}$ | sq-squeeze-misuse | the bounds have different limits
E: Logarithms turn the power into a product that L'Hôpital can handle.
R latex: \ln a_n = n\ln\left(1 + \frac{2}{n}\right)
### step 2 · check: none: rewriting an ∞·0 form
P: $n\ln(1 + 2/n)$ has the form $\infty\cdot 0$. Rewrite it for L'Hôpital.
* $\dfrac{\ln(1 + 2/x)}{1/x}$, a $0/0$ form
- $\dfrac{x}{1/\ln(1+2/x)}$ | algebra-error | correct algebra but the wrong shape: the derivative is a mess
- $\infty \cdot 0 = 0$, so $\ln a_n \to 0$ | sq-limit-law-misuse | ∞·0 is indeterminate
- $\ln\!\left(1 + \dfrac{2}{x}\right)^{x} = x\cdot\ln 1 = 0$ | sq-substitute-infinity | plugged ∞ into part of the expression
- $\dfrac{\ln(1 + 2/x)}{x}$ | algebra-error | that is n in the denominator, a 0/∞ form, which is not the same quantity
E: Move n into the denominator as 1/n to get 0/0.
R latex: \lim_{x\to\infty} \frac{\ln(1+2/x)}{1/x}
### step 3 · check: value 2
P: Apply L'Hôpital and evaluate the limit of $\ln a_n$.
* $2$ (expr `2`)
- $1$ (expr `1`) | arithmetic-error | forgot the 2 from the inner derivative of 2/x
- $0$ (expr `0`) | sq-limit-law-misuse | treated ∞·0 as 0
- $-2$ (expr `-2`) | sign-error | the two minus signs cancel
- $\dfrac{1}{2}$ (expr `1/2`) | algebra-error | inverted the quotient of derivatives
E: Derivatives: (−2/x²)/(1 + 2/x) over (−1/x²) = 2/(1 + 2/x) → 2.
R latex: \lim_{n\to\infty} \ln a_n = 2
### step 4 · check: value e^2
P: Exponentiate.
* $e^{2}$ (expr `e^2`)
- $2$ (expr `2`) | sq-term-vs-limit | 2 is the limit of ln aₙ, not of aₙ
- $e$ (expr `e`) | sq-theorem-misattributed | confused with (1 + 1/n)^n
- $2e$ (expr `2*e`) | arithmetic-error | multiplied instead of exponentiating
- $\ln 2$ (expr `log(2)`) | algebra-error | took a log instead of exponentiating
E: aₙ = e^{ln aₙ} → e².
R latex: \lim_{n\to\infty} a_n = e^{2}
FINAL: latex "e^{2}" · expr `e^2` · check: limit (1+2/n)^n → e^2 · recap: 1^∞ → take logs → rewrite as 0/0 → L'Hôpital gives 2 → exponentiate: e².

## sq-s-05 · difficulty 2 · title "Alternating signs and the Squeeze corollary"
S: text "Does the sequence converge? If so, find the limit." · latex "a_n = \frac{(-1)^{n}}{n}"
### step 1 · check: none: method
P: The signs alternate. What is the right tool?
* Look at $|a_n| = \dfrac{1}{n}$ and use the corollary $|a_n| \to 0 \Rightarrow a_n \to 0$
- Alternating signs mean the sequence diverges | sq-oscillation-means-divergence | sign changes do not prevent convergence
- Use the $\{r^{n}\}$ rule with $r = -1$ | sq-rn-boundary | (−1)ⁿ alone has no limit; the 1/n factor matters
- Use L'Hôpital on $\dfrac{(-1)^{x}}{x}$ | sq-theorem-misattributed | (−1)ˣ is not a real function
- The sequence is bounded by $1$, so it converges | sq-bounded-implies-convergent | bounded alone gives nothing
E: The corollary of the Squeeze Theorem handles sign changes.
R latex: |a_n| = \frac{1}{n}
### step 2 · check: value 0
P: $\lim |a_n| = ?$
* $0$ (expr `0`)
- $1$ (expr `1`) | sq-term-vs-limit | the first term, not the limit
- $-1$ (expr `-1`) | sign-error | |aₙ| is never negative
- $\dfrac{1}{2}$ (expr `1/2`) | sq-term-vs-limit | a term, not the limit
- $e$ (expr `e`) | sq-theorem-misattributed | no e-type limit here
E: 1/n → 0.
R latex: |a_n| \to 0
### step 3 · check: none: conclusion
P: Conclude.
* $|a_n| \to 0$, so $a_n \to 0$: converges to $0$
- $|a_n| \to 0$, but $a_n$ alternates, so the limit does not exist | sq-oscillation-means-divergence | the corollary says the limit is 0
- $|a_n| \to 0$, so $a_n \to \pm 0$: two limits, hence diverges | sq-oscillation-means-divergence | +0 and −0 are the same number
- Converges to $-1$, the first term | sq-term-vs-limit | a term is not the limit
- Converges to $0$ because $(-1)^{n} \to 0$ | sq-rn-boundary | right value, invalid reason
E: −1/n ≤ aₙ ≤ 1/n and both bounds → 0.
R latex: \lim_{n\to\infty} \frac{(-1)^{n}}{n} = 0
FINAL: latex "0" · expr `0` · check: limit (-1)^n/n → 0 · recap: Alternating signs → look at |aₙ| = 1/n → 0 → the Squeeze corollary gives aₙ → 0.

## sq-s-06 · difficulty 1 · title "Monotone Convergence Theorem"
S: text "Show that the sequence converges using the Monotone Convergence Theorem, then find the limit." · latex "a_n = \frac{n}{n+1}"
### step 1 · check: identity 1/((n+1)*(n+2)) · var: n · domain: { n: [1, 6] }
P: Is it monotone? Compute $a_{n+1} - a_n$.
* $\dfrac{1}{(n+1)(n+2)} > 0$: increasing (expr `1/((n+1)*(n+2))`)
- $\dfrac{1}{n+1} - \dfrac{1}{n} < 0$: decreasing (expr `1/(n+1) - 1/n`) | algebra-error | that is the difference of 1/n, not of n/(n+1)
- $\dfrac{1}{n+2} - \dfrac{1}{n+1}$ (expr `1/(n+2) - 1/(n+1)`) | sign-error | sign slip: the difference is positive
- $1$ (expr `1`) | algebra-error | the numerators were subtracted without common denominators
- $\dfrac{2n+1}{(n+1)(n+2)}$ (expr `(2*n+1)/((n+1)*(n+2))`) | algebra-error | algebra slip in the numerator
E: (n+1)/(n+2) − n/(n+1) = [(n+1)² − n(n+2)]/((n+1)(n+2)) = 1/((n+1)(n+2)) > 0.
R text: Increasing
### step 2 · check: none: boundedness
P: Is it bounded?
* Yes: $0 < \dfrac{n}{n+1} < 1$ for all $n$
- No: $n \to \infty$ makes it unbounded | sq-dominant-term | the denominator grows too; the ratio stays below 1
- Bounded above by $\tfrac{1}{2}$ | sq-first-terms | a₁ = 1/2 is the smallest term, not the largest
- Only bounded below, by $0$ | sq-dominant-term | it is also below 1
- Bounded, so it converges to $1$ right away | sq-bounded-implies-convergent | bounded alone is not the theorem
E: n < n + 1 gives aₙ < 1; all terms are positive.
R text: Bounded: $0 < a_n < 1$
### step 3 · check: none: theorem
P: What does the Monotone Convergence Theorem give?
* Increasing and bounded above, so $\{a_n\}$ converges
- Increasing, so it converges | sq-monotone-implies-convergent | both hypotheses are needed
- Bounded, so it converges | sq-bounded-implies-convergent | both hypotheses are needed
- It converges to its upper bound $1$ by the theorem | sq-theorem-misattributed | the theorem gives convergence, not the value
- Nothing: the theorem needs the sequence to be decreasing | sq-theorem-misattributed | increasing or decreasing both work
E: Monotone AND bounded ⇒ convergent.
R text: Converges (MCT)
### step 4 · check: value 1
P: Find the limit.
* $1$ (expr `1`)
- $0$ (expr `0`) | sq-dominant-term | equal degrees give the ratio of leading coefficients
- $\dfrac{1}{2}$ (expr `1/2`) | sq-term-vs-limit | the first term
- $\infty$ cannot be an expr: use $2$ (expr `2`) | arithmetic-error | arithmetic slip
- $-1$ (expr `-1`) | sign-error | sign slip
E: n/(n+1) = 1/(1 + 1/n) → 1.
R latex: \lim_{n\to\infty} a_n = 1
NOTE for step 4 option 3: latex "2", expr 2; drop the words.
FINAL: latex "1" · expr `1` · check: limit n/(n+1) → 1 · recap: aₙ₊₁ − aₙ > 0 (increasing) and 0 < aₙ < 1 (bounded) → MCT ⇒ converges → the limit is 1.

## sq-s-07 · difficulty 2 · title "∞ − ∞: rationalize"
S: text "Find the limit." · latex "a_n = \sqrt{n^{2}+n} - n"
### step 1 · check: none: method
P: The form is $\infty - \infty$. What is the right move?
* Multiply and divide by the conjugate $\sqrt{n^{2}+n} + n$
- $\infty - \infty = 0$ | sq-substitute-infinity | ∞ − ∞ is indeterminate
- $\sqrt{n^{2}+n} \approx n$, so the limit is $0$ | sq-dominant-term | the difference of two things that both grow like n need not be 0
- $\infty - \infty$ is indeterminate, so the limit does not exist | sq-limit-law-misuse | indeterminate means "work more", not "no limit"
- Use L'Hôpital immediately | sq-theorem-misattributed | L'Hôpital needs a quotient
E: Rationalizing turns the difference into a quotient.
R latex: a_n = \frac{(n^{2}+n) - n^{2}}{\sqrt{n^{2}+n} + n} = \frac{n}{\sqrt{n^{2}+n} + n}
### step 2 · check: identity n/(sqrt(n^2+n)+n) · var: n · domain: { n: [1, 9] }
P: Divide top and bottom by $n$.
* $\dfrac{1}{\sqrt{1 + 1/n} + 1}$ (expr `1/(sqrt(1+1/n)+1)`)
- $\dfrac{1}{\sqrt{n + 1} + 1}$ (expr `1/(sqrt(n+1)+1)`) | algebra-error | dividing inside the root by n means dividing by n², not n
- $\dfrac{1}{\sqrt{1 + 1/n}}$ (expr `1/sqrt(1+1/n)`) | algebra-error | the + n term was dropped
- $\dfrac{1}{\sqrt{1 + 1/n^{2}} + 1}$ (expr `1/(sqrt(1+1/n^2)+1)`) | algebra-error | (n² + n)/n² = 1 + 1/n
- $\dfrac{1}{1 + 1/n + 1}$ (expr `1/(2+1/n)`) | algebra-error | the root was dropped
E: √(n² + n)/n = √(1 + 1/n).
R latex: a_n = \frac{1}{\sqrt{1+1/n} + 1}
### step 3 · check: value 1/2
P: Take the limit.
* $\dfrac{1}{2}$ (expr `1/2`)
- $0$ (expr `0`) | sq-dominant-term | the denominator tends to 2, not ∞
- $1$ (expr `1`) | arithmetic-error | √1 + 1 = 2 in the denominator
- $\dfrac{1}{4}$ (expr `1/4`) | arithmetic-error | arithmetic slip
- $2$ (expr `2`) | algebra-error | inverted the result
E: 1/n → 0, so the denominator → √1 + 1 = 2.
R latex: \lim_{n\to\infty} a_n = \frac{1}{2}
FINAL: latex "\frac{1}{2}" · expr `1/2` · check: limit sqrt(n^2+n)-n → 1/2 · recap: ∞ − ∞ → multiply by the conjugate → n/(√(n²+n) + n) → divide by n → 1/2.

## sq-s-08 · difficulty 1 · title "Bounded but divergent"
S: text "Decide whether the sequence is bounded, monotone and convergent." · latex "a_n = (-1)^{n}"
### step 1 · check: none: boundedness
P: Is it bounded?
* Yes: $|a_n| = 1 \le 1$ for all $n$
- No: it never settles, so it is unbounded | sq-oscillation-means-divergence | bounded means |aₙ| ≤ M, which holds with M = 1
- Only bounded above | sq-theorem-misattributed | −1 ≤ aₙ as well
- Bounded, hence convergent | sq-bounded-implies-convergent | bounded alone does not give convergence
- Cannot say: the terms keep changing | sq-first-terms | the bound is immediate from the formula
E: Every term is ±1.
R text: Bounded ($|a_n| \le 1$)
### step 2 · check: none: monotonicity
P: Is it monotone?
* No: the terms go $-1, 1, -1, 1, \ldots$, neither increasing nor decreasing
- Yes, increasing: $-1 < 1$ | sq-first-terms | two terms do not make a sequence monotone
- Yes, decreasing: $1 > -1$ | sq-first-terms | two terms do not make a sequence monotone
- Monotone because $|a_n|$ is constant | algebra-error | constant |aₙ| says nothing about the signs
- Monotone, so it converges | sq-monotone-implies-convergent | it is not monotone, and monotone alone would not suffice
E: aₙ₊₁ − aₙ alternates between 2 and −2.
R text: Not monotone
### step 3 · check: limit (-1)^n → dne
P: Does it converge?
* No: the terms alternate between $-1$ and $1$ and never settle (the limit does not exist)
- Yes, to $0$: the terms average out | sq-squeeze-misuse | squeezing between −1 and 1 gives no limit
- Yes, to $1$: $|a_n| \to 1$ | sq-theorem-misattributed | only |aₙ| → 0 transfers to aₙ
- Yes, because it is bounded | sq-bounded-implies-convergent | bounded does not imply convergent
- Yes, to $-1$: $r = -1$ is allowed in the $\{r^{n}\}$ rule | sq-rn-boundary | the rule excludes r = −1
E: A limit L would need the terms eventually within any distance of L; ±1 never do.
R text: Diverges (limit DNE)
FINAL: latex "\text{diverges (bounded, not monotone, limit DNE)}" · check: limit (-1)^n → dne · recap: Bounded by 1, not monotone, and the terms never settle → divergent: bounded does not imply convergent.

## sq-s-09 · difficulty 1 · title "n sin(1/n)"
S: text "Find the limit." · latex "a_n = n\sin\!\left(\frac{1}{n}\right)"
### step 1 · check: none: form and method
P: What form is this, and what is the right move?
* $\infty\cdot 0$: write it as $\dfrac{\sin(1/x)}{1/x}$ and use the Underlying Function Theorem with L'Hôpital
- $\infty\cdot 0 = 0$ | sq-limit-law-misuse | ∞·0 is indeterminate
- $\sin(1/n)$ is bounded, so $n\sin(1/n) \to \infty$ | sq-dominant-term | sin(1/n) → 0, it is not merely bounded
- $\sin$ oscillates, so the limit does not exist | sq-connect-the-dots | the argument 1/n → 0, so sin(1/n) does not oscillate
- Plug in $n = 1$: $\sin 1$ | sq-term-vs-limit | a term is not the limit
E: Move n to the denominator as 1/n to get a 0/0 quotient.
R latex: \lim_{x\to\infty} \frac{\sin(1/x)}{1/x}
### step 2 · check: none: L'Hôpital step
P: Apply L'Hôpital.
* $\dfrac{\cos(1/x)\cdot(-1/x^{2})}{-1/x^{2}} = \cos(1/x)$
- $\dfrac{\cos(1/x)}{-1/x^{2}}$ | chain-rule-missing | the inner derivative of 1/x is missing on top
- $\dfrac{-\cos(1/x)}{1/x^{2}}$ | sign-error | the minus signs cancel
- $\dfrac{\sin(1/x)}{1}$ | algebra-error | the top was not differentiated
- $\dfrac{\cos(1/x)}{\ln x}$ | log-derivative-wrong | the derivative of 1/x is −1/x², not ln x
E: Both derivatives carry the factor −1/x², which cancels.
R latex: = \lim_{x\to\infty} \cos(1/x)
### step 3 · check: value 1
P: Evaluate.
* $1$ (expr `1`)
- $0$ (expr `0`) | sq-limit-law-misuse | cos(1/x) → cos 0 = 1
- $\sin 1$ (expr `sin(1)`) | sq-term-vs-limit | the value at n = 1
- $-1$ (expr `-1`) | sign-error | sign slip
- $\dfrac{\pi}{2}$ (expr `pi/2`) | inverse-trig-value-wrong | no arctan here
E: cos(1/x) → cos 0 = 1 by continuity.
R latex: \lim_{n\to\infty} n\sin(1/n) = 1
FINAL: latex "1" · expr `1` · check: limit n*sin(1/n) → 1 · recap: ∞·0 → rewrite as sin(1/x)/(1/x) → L'Hôpital leaves cos(1/x) → 1.
