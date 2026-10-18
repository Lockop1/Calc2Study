# Step-Through plan — improper integrals (topic id `improper`, prefix `im`)
Conventions: qa/briefs/steps-typist.md. Procedure order (spec): identify the type → replace the bad bound by t and write
the limit(s), splitting if needed → FTC inside the limit → evaluate the limit(s) → conclude. Verdict finals have no expr.

## im-s-01 · difficulty 1 · title "Type I, convergent"
S: text "Evaluate or show divergence." · latex "\int_{1}^{\infty} \frac{dx}{x^{2}}"
### step 1 · check: none: type identification
P: What type of improper integral is this?
* Type I: the upper bound is $\infty$
- Type II: $\dfrac{1}{x^{2}}$ blows up at $x = 0$ | im-wrong-type | 0 is not in [1, ∞)
- Not improper: the integrand is continuous on $[1, \infty)$ | im-wrong-type | an infinite bound makes it improper
- Both types | im-wrong-type | no discontinuity on the interval
- Type II at $x = 1$ | im-wrong-type | the integrand is 1 at x = 1
E: One infinite bound, continuous integrand.
R text: Type I (bound $\infty$)
### step 2 · check: none: limit set-up
P: Write it as a limit.
* $\displaystyle\lim_{t\to\infty} \int_{1}^{t} \frac{dx}{x^{2}}$
- $\displaystyle\lim_{t\to\infty} \int_{t}^{\infty} \frac{dx}{x^{2}}$ | im-split-mishandled | ∞ stays as a bound
- $\displaystyle\lim_{t\to 1^{+}} \int_{t}^{\infty} \frac{dx}{x^{2}}$ | im-wrong-type | the finite bound 1 is fine
- $\left[-\dfrac{1}{x}\right]_{1}^{\infty}$ directly | im-plug-infinity | ∞ is never plugged in
- $\displaystyle\lim_{t\to-\infty} \int_{t}^{1} \frac{dx}{x^{2}}$ | im-wrong-one-sided-limit | wrong half-line
E: Replace ∞ by t and let t → ∞.
R latex: = \lim_{t\to\infty} \int_{1}^{t} \frac{dx}{x^{2}}
### step 3 · check: identity 1 - 1/t · var: t · domain: [2, 10]
P: Apply the FTC inside the limit: $\displaystyle\int_{1}^{t} \frac{dx}{x^{2}} = ?$
* $1 - \dfrac{1}{t}$ (expr `1 - 1/t`)
- $\dfrac{1}{t} - 1$ (expr `1/t - 1`) | ftc-order-swapped | F(t) − F(1), not F(1) − F(t)
- $-\dfrac{1}{t}$ (expr `-1/t`) | ftc-not-subtracted | F(1) = −1 must be subtracted
- $\ln t$ (expr `log(t)`) | power-rule-int-exponent | that is ∫ dx/x
- $\dfrac{1}{2} - \dfrac{1}{2t^{2}}$ (expr `1/2 - 1/(2*t^2)`) | power-rule-int-exponent | that is ∫ dx/x³
E: [−1/x]₁ᵗ = −1/t + 1.
R latex: = \lim_{t\to\infty} \left(1 - \frac{1}{t}\right)
### step 4 · check: value 1
P: Evaluate the limit and conclude.
* $1$: converges (expr `1`)
- $0$ (expr `0`) | im-limit-evaluated-wrong | 1/t → 0, so 1 − 1/t → 1, not 0
- $-1$ (expr `-1`) | sign-error | sign slip
- $2$ (expr `2`) | arithmetic-error | arithmetic slip
- $\infty$: diverges? no — the limit is finite | im-divergent-called-convergent | the limit is finite (text option not allowed with exprs: see note) 
E: 1 − 1/t → 1, a finite limit, so the integral converges to 1.
R latex: = 1
FINAL: latex "1" · expr `1` · check: improper 1/x^2 [1, inf] conv value 1 · recap: Type I → replace ∞ by t → FTC gives 1 − 1/t → the limit is 1 → converges to 1.
NOTE for step 4: all five options must be exprs; replace the last distractor by `$\frac{1}{2}$ (expr 1/2) | power-rule-int-exponent | used the antiderivative of 1/x³`.

## im-s-02 · difficulty 1 · title "Type I, divergent"
S: text "Evaluate or show divergence." · latex "\int_{1}^{\infty} \frac{dx}{x}"
### step 1 · check: none: limit set-up
P: Type I. Write it as a limit.
* $\displaystyle\lim_{t\to\infty} \int_{1}^{t} \frac{dx}{x}$
- $\displaystyle\lim_{t\to\infty} \int_{t}^{\infty} \frac{dx}{x}$ | im-split-mishandled | ∞ stays as a bound
- $\left[\ln x\right]_{1}^{\infty}$ directly | im-plug-infinity | ∞ is never plugged in
- $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{\infty} \frac{dx}{x}$ | im-wrong-type | 0 is not in the interval
- $\displaystyle\lim_{t\to\infty} \int_{-t}^{t} \frac{dx}{x}$ | im-symmetric-limit | the interval is [1, ∞)
E: Replace ∞ by t.
R latex: = \lim_{t\to\infty} \int_{1}^{t} \frac{dx}{x}
### step 2 · check: identity log(t) · var: t · domain: [2, 10]
P: Apply the FTC: $\displaystyle\int_{1}^{t} \frac{dx}{x} = ?$
* $\ln t$ (expr `log(t)`)
- $\ln t - 1$ (expr `log(t) - 1`) | ftc-not-subtracted | F(1) = ln 1 = 0, not 1
- $-\ln t$ (expr `-log(t)`) | ftc-order-swapped | F(1) − F(t)
- $1 - \dfrac{1}{t}$ (expr `1 - 1/t`) | power-rule-int-exponent | that is ∫ dx/x²
- $\dfrac{t^{2}}{2} - \dfrac{1}{2}$ (expr `t^2/2 - 1/2`) | power-rule-int-exponent | integrated x instead of 1/x
E: [ln x]₁ᵗ = ln t − ln 1 = ln t.
R latex: = \lim_{t\to\infty} \ln t
### step 3 · check: improper 1/x [1, inf] div
P: Evaluate the limit and conclude.
* $\ln t \to \infty$: the integral diverges
- $\ln t \to \infty$: the integral converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
- $\ln t \to 0$: converges to $0$ | im-limit-evaluated-wrong | ln t grows without bound
- $\ln t \to 1$: converges to $1$ | im-limit-evaluated-wrong | ln t is unbounded
- Converges by the $p$-rule with $p = 1$ | im-p-rule-wrong | the p-rule needs p > 1
E: The limit is not finite, so the integral diverges.
R text: Diverges
FINAL: latex "\text{diverges}" · check: improper 1/x [1, inf] div · recap: Type I → limit → ln t → unbounded → diverges (p = 1 is the boundary case of the p-rule).

## im-s-03 · difficulty 1 · title "Type II at the lower endpoint"
S: text "Evaluate or show divergence." · latex "\int_{0}^{1} \frac{dx}{\sqrt{x}}"
### step 1 · check: none: type identification
P: What type is this, and where is the problem?
* Type II: $\dfrac{1}{\sqrt{x}} \to \infty$ as $x \to 0^{+}$
- Type I | im-wrong-type | both bounds are finite
- Not improper: finite bounds | im-hidden-discontinuity | the integrand blows up at 0
- Type II at $x = 1$ | im-wrong-type | the integrand is 1 at x = 1
- Both types | im-wrong-type | no infinite bound
E: Finite bounds, infinite discontinuity at the endpoint 0.
R text: Type II at $x = 0$
### step 2 · check: none: limit set-up
P: Write it as a limit.
* $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{1} \frac{dx}{\sqrt{x}}$
- $\displaystyle\lim_{t\to 0^{-}} \int_{t}^{1} \frac{dx}{\sqrt{x}}$ | im-wrong-one-sided-limit | approach 0 from inside [0, 1]
- $\displaystyle\lim_{t\to 1^{-}} \int_{0}^{t} \frac{dx}{\sqrt{x}}$ | im-wrong-type | the bad endpoint is 0, not 1
- $\left[2\sqrt{x}\right]_{0}^{1}$ directly | im-hidden-discontinuity | the limit must be written
- $\displaystyle\lim_{t\to\infty} \int_{0}^{t} \frac{dx}{\sqrt{x}}$ | im-wrong-type | no infinite bound here
E: Replace the bad endpoint 0 by t and let t → 0⁺.
R latex: = \lim_{t\to 0^{+}} \int_{t}^{1} \frac{dx}{\sqrt{x}}
### step 3 · check: identity 2 - 2*sqrt(t) · var: t · domain: [0.01, 0.9]
P: Apply the FTC: $\displaystyle\int_{t}^{1} x^{-1/2}\,dx = ?$
* $2 - 2\sqrt{t}$ (expr `2 - 2*sqrt(t)`)
- $2\sqrt{t} - 2$ (expr `2*sqrt(t) - 2`) | ftc-order-swapped | F(1) − F(t)
- $1 - \sqrt{t}$ (expr `1 - sqrt(t)`) | power-rule-int-exponent | ∫ x^{−1/2} dx = 2x^{1/2}
- $2$ (expr `2`) | ftc-not-subtracted | F(t) must be subtracted
- $\dfrac{1}{2} - \dfrac{1}{2\sqrt{t}}$ (expr `1/2 - 1/(2*sqrt(t))`) | power-rule-int-exponent | differentiated instead of integrating
E: [2√x]ₜ¹ = 2 − 2√t.
R latex: = \lim_{t\to 0^{+}} \left(2 - 2\sqrt{t}\right)
### step 4 · check: value 2
P: Evaluate the limit.
* $2$ (expr `2`)
- $0$ (expr `0`) | im-limit-evaluated-wrong | 2√t → 0, so 2 − 2√t → 2
- $-2$ (expr `-2`) | sign-error | sign slip
- $1$ (expr `1`) | arithmetic-error | arithmetic slip
- $4$ (expr `4`) | arithmetic-error | doubled the result
E: √t → 0 as t → 0⁺, so the limit is 2: the integral converges to 2.
R latex: = 2
FINAL: latex "2" · expr `2` · check: improper 1/sqrt(x) [0, 1] conv value 2 · recap: Type II at 0 → lim_{t→0⁺} ∫ₜ¹ → 2 − 2√t → 2.

## im-s-04 · difficulty 1 · title "Exponential tail"
S: text "Evaluate or show divergence." · latex "\int_{0}^{\infty} e^{-x}\,dx"
### step 1 · check: none: limit set-up
P: Type I. Write it as a limit.
* $\displaystyle\lim_{t\to\infty} \int_{0}^{t} e^{-x}\,dx$
- $\left[-e^{-x}\right]_{0}^{\infty}$ directly | im-plug-infinity | ∞ is never plugged in
- $\displaystyle\lim_{t\to\infty} \int_{t}^{\infty} e^{-x}\,dx$ | im-split-mishandled | ∞ stays as a bound
- $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{\infty} e^{-x}\,dx$ | im-wrong-type | 0 is a fine endpoint
- $\displaystyle\lim_{t\to-\infty} \int_{t}^{0} e^{-x}\,dx$ | im-wrong-one-sided-limit | wrong half-line
E: Replace ∞ by t.
R latex: = \lim_{t\to\infty} \int_{0}^{t} e^{-x}\,dx
### step 2 · check: identity 1 - exp(-t) · var: t · domain: [0.5, 5]
P: Apply the FTC: $\displaystyle\int_{0}^{t} e^{-x}\,dx = ?$
* $1 - e^{-t}$ (expr `1 - exp(-t)`)
- $e^{-t} - 1$ (expr `exp(-t) - 1`) | ftc-order-swapped | F(t) − F(0) with F = −e^{−x} gives −e^{−t} + 1
- $e^{-t} + 1$ (expr `exp(-t) + 1`) | sign-error | lost the sign of the antiderivative
- $-e^{-t}$ (expr `-exp(-t)`) | ftc-not-subtracted | F(0) = −1 must be subtracted
- $e^{t} - 1$ (expr `exp(t) - 1`) | exp-antiderivative-wrong | ∫ e^{−x} dx = −e^{−x}
E: [−e^{−x}]₀ᵗ = −e^{−t} + 1.
R latex: = \lim_{t\to\infty} \left(1 - e^{-t}\right)
### step 3 · check: value 1
P: Evaluate the limit.
* $1$ (expr `1`)
- $0$ (expr `0`) | im-limit-evaluated-wrong | e^{−t} → 0, so 1 − e^{−t} → 1
- $-1$ (expr `-1`) | sign-error | sign slip
- $e$ (expr `e`) | im-limit-evaluated-wrong | took e^{−t} → e
- $\dfrac{1}{e}$ (expr `1/e`) | arithmetic-error | plugged t = 1
E: e^{−t} → 0, so the integral converges to 1.
R latex: = 1
FINAL: latex "1" · expr `1` · check: improper exp(-x) [0, inf] conv value 1 · recap: Type I → limit → 1 − e^{−t} → 1.

## im-s-05 · difficulty 2 · title "Both bounds infinite: split"
S: text "Evaluate or show divergence." · latex "\int_{-\infty}^{\infty} \frac{dx}{1+x^{2}}"
### step 1 · check: none: split rule
P: Both bounds are infinite. What is the correct set-up?
* Split at $c = 0$: $\displaystyle\lim_{s\to-\infty}\int_{s}^{0} + \lim_{t\to\infty}\int_{0}^{t}$, two separate limits
- $\displaystyle\lim_{t\to\infty} \int_{-t}^{t} \frac{dx}{1+x^{2}}$ | im-symmetric-limit | one symmetric limit is never allowed
- $2\displaystyle\int_{0}^{\infty} \frac{dx}{1+x^{2}}$ without checking the left half | im-one-half-only | symmetry may be used only after both halves converge
- $\arctan(\infty) - \arctan(-\infty)$ | im-plug-infinity | ∞ is never plugged in
- $\displaystyle\lim_{t\to\infty} \int_{-\infty}^{t} \frac{dx}{1+x^{2}}$ | im-split-mishandled | −∞ stays as a bound
E: Two SEPARATE limits; it converges only if both do.
R latex: = \lim_{s\to-\infty}\int_{s}^{0}\frac{dx}{1+x^{2}} + \lim_{t\to\infty}\int_{0}^{t}\frac{dx}{1+x^{2}}
### step 2 · check: value pi/2
P: Right half: $\displaystyle\lim_{t\to\infty} \left[\arctan x\right]_{0}^{t} = ?$
* $\frac{\pi}{2}$ (expr `pi/2`)
- $\pi$ (expr `pi`) | inverse-trig-value-wrong | arctan t → π/2
- $\frac{\pi}{4}$ (expr `pi/4`) | inverse-trig-value-wrong | arctan 1 = π/4, but t → ∞
- $0$ (expr `0`) | im-plug-infinity | treated arctan ∞ as undefined and wrote 0
- $-\frac{\pi}{2}$ (expr `-pi/2`) | sign-error | that is the limit at −∞
E: arctan t → π/2 and arctan 0 = 0.
R latex: \text{right half} = \frac{\pi}{2}
### step 3 · check: value pi/2
P: Left half: $\displaystyle\lim_{s\to-\infty} \left[\arctan x\right]_{s}^{0} = ?$
* $\frac{\pi}{2}$ (expr `pi/2`)
- $-\frac{\pi}{2}$ (expr `-pi/2`) | sign-error | 0 − (−π/2) = +π/2
- $0$ (expr `0`) | im-one-half-only | the left half is not zero; it must be computed
- $\pi$ (expr `pi`) | inverse-trig-value-wrong | arctan s → −π/2
- $\frac{\pi}{4}$ (expr `pi/4`) | inverse-trig-value-wrong | arctan(−1) = −π/4 is not the limit
E: arctan 0 − arctan s → 0 − (−π/2) = π/2.
R latex: \text{left half} = \frac{\pi}{2}
### step 4 · check: value pi
P: Conclude.
* Both halves converge: the integral converges to $\frac{\pi}{2} + \frac{\pi}{2} = \pi$ (expr `pi`)
- $\frac{\pi}{2}$ (expr `pi/2`) | im-one-half-only | both halves contribute
- $0$ (expr `0`) | im-symmetric-limit | the halves add, they do not cancel
- $2\pi$ (expr `2*pi`) | arithmetic-error | doubled the total
- $-\pi$ (expr `-pi`) | sign-error | sign slip
E: Each half is π/2; both converge, so the total is π.
R latex: = \pi
NOTE for step 4: option 0 must be an expr option like the others: latex "\pi", expr "pi".
FINAL: latex "\pi" · expr `pi` · check: improper 1/(1+x^2) [-inf, inf] conv value pi split 0 · recap: Split at 0 into two separate limits → each half is π/2 → both converge → π.

## im-s-06 · difficulty 2 · title "The hidden discontinuity"
S: text "Evaluate or show divergence." · latex "\int_{-1}^{1} \frac{dx}{x^{2}}"
### step 1 · check: none: type identification
P: What is special about this integral?
* $\dfrac{1}{x^{2}}$ has an infinite discontinuity at $x = 0$, inside the interval: Type II, split at $0$
- Nothing: finite bounds, so use the FTC | im-hidden-discontinuity | the integrand blows up at 0
- Type I | im-wrong-type | the bounds are finite
- The integrand is even, so it equals $2\displaystyle\int_{0}^{1}\frac{dx}{x^{2}}$ computed by the FTC | im-symmetric-limit | still ignores the discontinuity
- Type II at the endpoints $\pm 1$ | im-wrong-type | the integrand is 1 there
E: The singularity sits inside (−1, 1).
R text: Type II at the interior point $x = 0$: split
### step 2 · check: none: set-up
P: Write the set-up.
* $\displaystyle\lim_{s\to 0^{-}} \int_{-1}^{s} \frac{dx}{x^{2}} + \lim_{t\to 0^{+}} \int_{t}^{1} \frac{dx}{x^{2}}$, both must converge
- $\displaystyle\lim_{t\to 0} \int_{-1}^{1} \frac{dx}{x^{2}}$ | im-split-mishandled | one two-sided limit does not separate the pieces
- $\left[-\dfrac{1}{x}\right]_{-1}^{1} = -2$ | im-hidden-discontinuity | FTC across the blow-up
- Only $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{1}$; the left piece is the same by symmetry | im-one-half-only | each piece needs its own limit (though one divergent piece already settles it)
- $\displaystyle\lim_{t\to 0^{+}} \int_{-1}^{t} \frac{dx}{x^{2}}$ | im-wrong-one-sided-limit | the left piece approaches 0 from the left
E: An interior discontinuity splits the integral into two one-sided limits.
R latex: \lim_{t\to 0^{+}} \int_{t}^{1}\frac{dx}{x^{2}} + \lim_{s\to 0^{-}} \int_{-1}^{s}\frac{dx}{x^{2}}
### step 3 · check: identity 1/t - 1 · var: t · domain: [0.01, 0.9]
P: Right piece: $\displaystyle\int_{t}^{1} \frac{dx}{x^{2}} = ?$
* $\dfrac{1}{t} - 1$ (expr `1/t - 1`)
- $1 - \dfrac{1}{t}$ (expr `1 - 1/t`) | ftc-order-swapped | F(1) − F(t) with F = −1/x gives −1 + 1/t
- $-\dfrac{1}{t}$ (expr `-1/t`) | ftc-not-subtracted | F(1) = −1 must be subtracted
- $\ln t$ (expr `log(t)`) | power-rule-int-exponent | that is for 1/x, with the wrong sign
- $\dfrac{1}{t^{2}} - 1$ (expr `1/t^2 - 1`) | power-rule-int-exponent | ∫ x^{−2} dx = −x^{−1}
E: [−1/x]ₜ¹ = −1 + 1/t.
R latex: = \lim_{t\to 0^{+}} \left(\frac{1}{t} - 1\right)
### step 4 · check: improper 1/x^2 [-1, 1] div split 0
P: Evaluate and conclude.
* $\dfrac{1}{t} - 1 \to \infty$: the right piece diverges, so the whole integral diverges
- $\dfrac{1}{t} - 1 \to -1$: converges to $-1$ | im-limit-evaluated-wrong | 1/t → ∞ as t → 0⁺
- The right piece diverges, but the left piece might cancel it | im-split-mishandled | one divergent piece is enough; nothing cancels
- $-2$ by the FTC | im-hidden-discontinuity | the FTC does not apply across a discontinuity
- Converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
E: One piece diverges ⇒ the integral diverges (and −2 was never possible for a positive integrand).
R text: Diverges
FINAL: latex "\text{diverges}" · check: improper 1/x^2 [-1, 1] div split 0 · recap: Spot the interior discontinuity at 0 → split into two one-sided limits → the right piece gives 1/t − 1 → ∞ → diverges; the FTC answer −2 is the trap.

## im-s-07 · difficulty 2 · title "Substitution inside the limit"
S: text "Evaluate or show divergence." · latex "\int_{0}^{\infty} x e^{-x^{2}}\,dx"
### step 1 · check: none: limit set-up
P: Type I. Write it as a limit.
* $\displaystyle\lim_{t\to\infty} \int_{0}^{t} x e^{-x^{2}}\,dx$
- $\displaystyle\lim_{t\to\infty} \int_{-t}^{t} x e^{-x^{2}}\,dx$ | im-symmetric-limit | the interval is [0, ∞)
- $\displaystyle\lim_{t\to\infty} \int_{t}^{\infty} x e^{-x^{2}}\,dx$ | im-split-mishandled | ∞ stays as a bound
- $\left[-\tfrac{1}{2}e^{-x^{2}}\right]_{0}^{\infty}$ directly | im-plug-infinity | ∞ is never plugged in
- $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{\infty} x e^{-x^{2}}\,dx$ | im-wrong-type | 0 is a fine endpoint
E: Replace ∞ by t.
R latex: = \lim_{t\to\infty} \int_{0}^{t} x e^{-x^{2}}\,dx
### step 2 · check: antiderivative x*exp(-x^2)
P: Find the antiderivative of $x e^{-x^{2}}$.
* $-\frac{1}{2}e^{-x^{2}} + C$ (expr `-1/2*exp(-x^2) + C`)
- $\frac{1}{2}e^{-x^{2}} + C$ (expr `1/2*exp(-x^2) + C`) | sign-error | d/dx e^{−x²} = −2x e^{−x²}
- $-e^{-x^{2}} + C$ (expr `-exp(-x^2) + C`) | du-constant-wrong | u = x² gives du = 2x dx, so a factor 1/2 is needed
- $\frac{x^{2}}{2}e^{-x^{2}} + C$ (expr `x^2/2*exp(-x^2) + C`) | integrated-instead | integrated the factors separately
- $-\frac{1}{2x}e^{-x^{2}} + C$ (expr `-1/(2*x)*exp(-x^2) + C`) | inner-constant-factor-missing | divided by the inner derivative instead of substituting
E: u = x², du = 2x dx: ∫ x e^{−x²} dx = (1/2)∫ e^{−u} du = −(1/2)e^{−x²}.
R latex: \int x e^{-x^{2}}\,dx = -\frac{1}{2}e^{-x^{2}} + C
### step 3 · check: identity 1/2 - 1/2*exp(-t^2) · var: t · domain: [0.5, 3]
P: Apply the FTC: $\displaystyle\int_{0}^{t} x e^{-x^{2}}\,dx = ?$
* $\dfrac{1}{2} - \dfrac{1}{2}e^{-t^{2}}$ (expr `1/2 - 1/2*exp(-t^2)`)
- $\dfrac{1}{2}e^{-t^{2}} - \dfrac{1}{2}$ (expr `1/2*exp(-t^2) - 1/2`) | ftc-order-swapped | F(t) − F(0)
- $-\dfrac{1}{2}e^{-t^{2}}$ (expr `-1/2*exp(-t^2)`) | ftc-not-subtracted | F(0) = −1/2 must be subtracted
- $1 - e^{-t^{2}}$ (expr `1 - exp(-t^2)`) | du-constant-wrong | the factor 1/2 was dropped
- $\dfrac{1}{2} - \dfrac{1}{2}e^{-t}$ (expr `1/2 - 1/2*exp(-t)`) | back-substitution-wrong | u = x², so the exponent is −t²
E: F(t) − F(0) = −(1/2)e^{−t²} + 1/2.
R latex: = \lim_{t\to\infty} \left(\frac{1}{2} - \frac{1}{2}e^{-t^{2}}\right)
### step 4 · check: value 1/2
P: Evaluate the limit.
* $\frac{1}{2}$ (expr `1/2`)
- $0$ (expr `0`) | im-limit-evaluated-wrong | e^{−t²} → 0, so the limit is 1/2
- $1$ (expr `1`) | du-constant-wrong | forgot the 1/2
- $-\frac{1}{2}$ (expr `-1/2`) | sign-error | sign slip
- $\frac{1}{2e}$ (expr `1/(2*e)`) | arithmetic-error | plugged t = 1
E: e^{−t²} → 0, so the integral converges to 1/2.
R latex: = \frac{1}{2}
FINAL: latex "\frac{1}{2}" · expr `1/2` · check: improper x*exp(-x^2) [0, inf] conv value 1/2 · recap: Type I → limit → u = x² inside → 1/2 − (1/2)e^{−t²} → 1/2.

## im-s-08 · difficulty 2 · title "Logarithmic substitution, divergent"
S: text "Evaluate or show divergence." · latex "\int_{2}^{\infty} \frac{dx}{x\ln x}"
### step 1 · check: none: limit set-up
P: Type I. Write it as a limit.
* $\displaystyle\lim_{t\to\infty} \int_{2}^{t} \frac{dx}{x\ln x}$
- $\displaystyle\lim_{t\to\infty} \int_{t}^{\infty} \frac{dx}{x\ln x}$ | im-split-mishandled | ∞ stays as a bound
- $\displaystyle\lim_{t\to 2^{+}} \int_{t}^{\infty} \frac{dx}{x\ln x}$ | im-wrong-type | ln 2 ≠ 0, so 2 is a fine endpoint
- $\displaystyle\lim_{t\to 1^{+}} \int_{t}^{\infty} \frac{dx}{x\ln x}$ | im-wrong-type | 1 is not in the interval
- $\left[\ln(\ln x)\right]_{2}^{\infty}$ directly | im-plug-infinity | ∞ is never plugged in
E: Replace ∞ by t.
R latex: = \lim_{t\to\infty} \int_{2}^{t} \frac{dx}{x\ln x}
### step 2 · check: antiderivative 1/(x*log(x)) · domain: [2, 6]
P: Find the antiderivative with $u = \ln x$.
* $\ln|\ln x| + C$ (expr `log(abs(log(x))) + C`)
- $\dfrac{(\ln x)^{2}}{2} + C$ (expr `log(x)^2/2 + C`) | du-derivative-wrong | ∫ du/u = ln|u|, not u²/2
- $\ln x \cdot \ln|\ln x| + C$ (expr `log(x)*log(abs(log(x))) + C`) | leftover-x-in-u-integral | the 1/x became du; nothing else remains
- $-\dfrac{1}{\ln x} + C$ (expr `-1/log(x) + C`) | power-rule-int-exponent | that is for 1/(x ln² x)
- $\ln(x\ln x) + C$ (expr `log(x*log(x)) + C`) | ln-misapplied | ∫ 1/g dx ≠ ln g in general
E: u = ln x, du = dx/x: ∫ du/u = ln|u|.
R latex: \int \frac{dx}{x\ln x} = \ln(\ln x) + C
### step 3 · check: identity log(log(t)) - log(log(2)) · var: t · domain: [3, 20]
P: Apply the FTC: $\displaystyle\int_{2}^{t} \frac{dx}{x\ln x} = ?$
* $\ln(\ln t) - \ln(\ln 2)$ (expr `log(log(t)) - log(log(2))`)
- $\ln(\ln t)$ (expr `log(log(t))`) | ftc-not-subtracted | F(2) = ln(ln 2) ≠ 0
- $\ln(\ln 2) - \ln(\ln t)$ (expr `log(log(2)) - log(log(t))`) | ftc-order-swapped | F(t) − F(2)
- $\ln t - \ln 2$ (expr `log(t) - log(2)`) | not-back-substituted | the antiderivative is ln(ln x)
- $\ln(\ln t) - \ln 2$ (expr `log(log(t)) - log(2)`) | arithmetic-error | F(2) = ln(ln 2)
E: F(t) − F(2).
R latex: = \lim_{t\to\infty} \left[\ln(\ln t) - \ln(\ln 2)\right]
### step 4 · check: improper 1/(x*log(x)) [2, inf] div
P: Evaluate the limit and conclude.
* $\ln(\ln t) \to \infty$: diverges
- $\ln(\ln t) \to 0$: converges to $-\ln(\ln 2)$ | im-limit-evaluated-wrong | ln(ln t) grows without bound (slowly)
- Converges because the integrand $\to 0$ | im-p-rule-wrong | an integrand tending to 0 does not give convergence
- Converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
- Diverges because $\ln(\ln 2) < 0$ | im-limit-evaluated-wrong | right verdict, invalid reason
E: ln(ln t) → ∞, so the limit is not finite.
R text: Diverges
FINAL: latex "\text{diverges}" · check: improper 1/(x*log(x)) [2, inf] div · recap: Type I → limit → u = ln x gives ln(ln x) → ln(ln t) → ∞ → diverges.

## im-s-09 · difficulty 1 · title "Type II at the upper endpoint"
S: text "Evaluate or show divergence." · latex "\int_{0}^{4} \frac{dx}{\sqrt{4-x}}"
### step 1 · check: none: type and set-up
P: Identify the type and write the limit.
* Type II at $x = 4$: $\displaystyle\lim_{t\to 4^{-}} \int_{0}^{t} \frac{dx}{\sqrt{4-x}}$
- Type II at $x = 0$: $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{4} \frac{dx}{\sqrt{4-x}}$ | im-wrong-type | the integrand is 1/2 at x = 0
- Type II at $x = 4$: $\displaystyle\lim_{t\to 4^{+}} \int_{0}^{t} \frac{dx}{\sqrt{4-x}}$ | im-wrong-one-sided-limit | approach 4 from inside [0, 4]
- Not improper: apply the FTC on $[0, 4]$ | im-hidden-discontinuity | the integrand blows up at 4
- Type I: $\displaystyle\lim_{t\to\infty} \int_{0}^{t} \frac{dx}{\sqrt{4-x}}$ | im-wrong-type | no infinite bound
E: The integrand blows up at the upper endpoint 4.
R latex: = \lim_{t\to 4^{-}} \int_{0}^{t} \frac{dx}{\sqrt{4-x}}
### step 2 · check: antiderivative 1/sqrt(4-x) · domain: [0, 3]
P: Find the antiderivative.
* $-2\sqrt{4-x} + C$ (expr `-2*sqrt(4-x) + C`)
- $2\sqrt{4-x} + C$ (expr `2*sqrt(4-x) + C`) | sign-error | the inner derivative of 4 − x is −1
- $-\sqrt{4-x} + C$ (expr `-sqrt(4-x) + C`) | power-rule-int-coefficient | ∫ u^{−1/2} du = 2u^{1/2}
- $-\dfrac{1}{2\sqrt{4-x}} + C$ (expr `-1/(2*sqrt(4-x)) + C`) | differentiated-instead | that is a derivative, not an antiderivative
- $-2\sqrt{4-x}\cdot x + C$ (expr `-2*sqrt(4-x)*x + C`) | leftover-x-in-u-integral | no stray x after the substitution
E: u = 4 − x, du = −dx: ∫ u^{−1/2}(−du) = −2√u.
R latex: \int \frac{dx}{\sqrt{4-x}} = -2\sqrt{4-x} + C
### step 3 · check: identity 4 - 2*sqrt(4-t) · var: t · domain: [0.5, 3.9]
P: Apply the FTC: $\displaystyle\int_{0}^{t} \frac{dx}{\sqrt{4-x}} = ?$
* $4 - 2\sqrt{4-t}$ (expr `4 - 2*sqrt(4-t)`)
- $2\sqrt{4-t} - 4$ (expr `2*sqrt(4-t) - 4`) | ftc-order-swapped | F(t) − F(0)
- $-2\sqrt{4-t}$ (expr `-2*sqrt(4-t)`) | ftc-not-subtracted | F(0) = −4 must be subtracted
- $2 - 2\sqrt{4-t}$ (expr `2 - 2*sqrt(4-t)`) | arithmetic-error | F(0) = −2√4 = −4, not −2
- $4 - \sqrt{4-t}$ (expr `4 - sqrt(4-t)`) | power-rule-int-coefficient | the factor 2 belongs to both terms
E: F(t) − F(0) = −2√(4 − t) + 4.
R latex: = \lim_{t\to 4^{-}} \left(4 - 2\sqrt{4-t}\right)
### step 4 · check: value 4
P: Evaluate the limit.
* $4$ (expr `4`)
- $0$ (expr `0`) | im-plug-infinity | plugged in t = 4 into the wrong term and stopped
- $-4$ (expr `-4`) | sign-error | sign slip
- $2$ (expr `2`) | arithmetic-error | halved the result
- $8$ (expr `8`) | arithmetic-error | doubled the result
E: √(4 − t) → 0, so the integral converges to 4.
R latex: = 4
FINAL: latex "4" · expr `4` · check: improper 1/sqrt(4-x) [0, 4] conv value 4 · recap: Type II at 4 → lim_{t→4⁻} → −2√(4−x) → 4 − 2√(4−t) → 4.
