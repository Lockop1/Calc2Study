# Flash plan — improper integrals (topic id `improper`, prefix `im`)
Conventions: see qa/briefs/flash-typist.md. `✓` = correct option. Distractor lines: `- option | tag | reason`.
"exprs" = every option has latex+expr; "text" = text-only options. Default variable x.

## im-f-001 · kind concept · text · check: none: type identification
P: Classify $\displaystyle\int_{1}^{\infty} \frac{dx}{x^{3}}$.
* Type I: the interval $[1, \infty)$ is unbounded ✓
- Type II: $\dfrac{1}{x^{3}}$ blows up at $x = 0$ | im-wrong-type | x = 0 is not in the interval of integration
- Both Type I and Type II | im-wrong-type | there is no discontinuity on [1, ∞)
- Not improper: $\dfrac{1}{x^{3}}$ is continuous on $[1, \infty)$ | im-wrong-type | an infinite bound makes it improper regardless of continuity
- Type II: a discontinuity at the endpoint $x = 1$ | im-wrong-type | 1/x³ is finite at x = 1
E: Only the upper bound ∞ is "bad": Type I.

## im-f-002 · kind concept · text · check: none: type identification
P: Classify $\displaystyle\int_{0}^{1} \frac{dx}{\sqrt{x}}$.
* Type II: $\dfrac{1}{\sqrt{x}} \to \infty$ at the endpoint $x = 0$ ✓
- Type I | im-wrong-type | both bounds are finite
- Not improper: the bounds are finite | im-wrong-type | an infinite discontinuity also makes an integral improper
- Type II at $x = 1$ | im-wrong-type | the integrand is 1 at x = 1
- Both Type I and Type II | im-wrong-type | no bound is infinite
E: Finite bounds but an infinite discontinuity at 0: Type II.

## im-f-003 · kind concept · text · check: none: type identification (hidden discontinuity)
P: Classify $\displaystyle\int_{-1}^{1} \frac{dx}{x^{2}}$.
* Type II: an interior infinite discontinuity at $x = 0$; split there ✓
- Not improper: finite bounds, so apply the FTC | im-hidden-discontinuity | missed that 1/x² blows up at 0 inside the interval
- Type I | im-wrong-type | the bounds are finite
- Type II at the endpoints $x = \pm 1$ | im-wrong-type | the integrand is 1 at both endpoints
- Not improper: $\dfrac{1}{x^{2}}$ is even, so the two halves cancel the problem | im-symmetric-limit | symmetry never removes an interior discontinuity
E: The singularity sits inside (−1, 1): split at 0 into two Type II integrals.

## im-f-004 · kind concept · text · check: none: type identification
P: Classify $\displaystyle\int_{0}^{\infty} e^{-x}\,dx$.
* Type I: the interval is unbounded ✓
- Type II: a discontinuity at $x = 0$ | im-wrong-type | e^{−x} is continuous everywhere
- Both: $e^{-x} \to 0$ makes it Type II as well | im-wrong-type | the integrand tending to 0 is not a discontinuity
- Not improper: the integrand is bounded | im-wrong-type | boundedness does not fix an infinite interval
- Type II: $e^{-x}$ is undefined at $\infty$ | im-plug-infinity | ∞ is not a point where the function is evaluated; it is a bound
E: One infinite bound, continuous integrand: Type I.

## im-f-005 · kind concept · text · check: none: type identification
P: Classify $\displaystyle\int_{0}^{\pi/2} \tan x\,dx$.
* Type II: $\tan x \to \infty$ as $x \to \tfrac{\pi}{2}^{-}$ ✓
- Not improper: finite bounds and a familiar integrand | im-hidden-discontinuity | missed the vertical asymptote at π/2
- Type I | im-wrong-type | the bounds are finite
- Type II at $x = 0$ | im-wrong-type | tan 0 = 0 is finite
- Both Type I and Type II | im-wrong-type | no bound is infinite
E: tan x has a vertical asymptote at the upper endpoint: Type II.

## im-f-006 · kind concept · text · check: none: type identification (interior point)
P: Classify $\displaystyle\int_{0}^{2} \frac{dx}{x-1}$.
* Type II: an interior infinite discontinuity at $x = 1$; split into two integrals ✓
- Not improper: $\ln|x-1|$ handles the sign | im-hidden-discontinuity | the absolute value does not remove the blow-up at x = 1
- Type II at $x = 0$ | im-wrong-type | the integrand is −1 at x = 0
- Type I | im-wrong-type | the bounds are finite
- Type II at $x = 2$ | im-wrong-type | the integrand is 1 at x = 2
E: x = 1 lies inside (0, 2) and the integrand blows up there.

## im-f-007 · kind technique · text · check: none: limit set-up
P: Rewrite $\displaystyle\int_{2}^{\infty} f(x)\,dx$ as a limit.
* $\displaystyle\lim_{t\to\infty} \int_{2}^{t} f(x)\,dx$ ✓
- $\displaystyle\lim_{t\to\infty} \int_{t}^{\infty} f(x)\,dx$ | im-split-mishandled | kept ∞ as a bound inside the limit
- $F(\infty) - F(2)$ | im-plug-infinity | plugged ∞ into the antiderivative
- $\displaystyle\lim_{t\to 2^{+}} \int_{t}^{\infty} f(x)\,dx$ | im-wrong-type | treated the finite endpoint 2 as the bad one
- $\displaystyle\lim_{t\to-\infty} \int_{t}^{2} f(x)\,dx$ | im-wrong-one-sided-limit | sent t to −∞ instead of +∞
E: Replace the infinite bound by t and let t → ∞.

## im-f-008 · kind technique · text · check: none: limit set-up
P: Rewrite $\displaystyle\int_{-\infty}^{0} f(x)\,dx$ as a limit.
* $\displaystyle\lim_{t\to-\infty} \int_{t}^{0} f(x)\,dx$ ✓
- $\displaystyle\lim_{t\to\infty} \int_{0}^{t} f(x)\,dx$ | im-wrong-one-sided-limit | integrated over the wrong half-line
- $\displaystyle\lim_{t\to 0^{-}} \int_{-\infty}^{t} f(x)\,dx$ | im-wrong-type | treated 0 as the bad endpoint and kept −∞ as a bound
- $F(0) - F(-\infty)$ | im-plug-infinity | plugged −∞ into the antiderivative
- $\displaystyle\lim_{t\to-\infty} \int_{0}^{t} f(x)\,dx$ | ftc-order-swapped | wrote the bounds in the wrong order
E: Replace −∞ by t and let t → −∞.

## im-f-009 · kind technique · text · check: none: limit set-up
P: Rewrite $\displaystyle\int_{0}^{3} \frac{dx}{3-x}$ as a limit.
* $\displaystyle\lim_{t\to 3^{-}} \int_{0}^{t} \frac{dx}{3-x}$ ✓
- $\displaystyle\lim_{t\to 3^{+}} \int_{0}^{t} \frac{dx}{3-x}$ | im-wrong-one-sided-limit | approached 3 from outside the interval
- $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{3} \frac{dx}{3-x}$ | im-wrong-type | treated 0 as the bad endpoint; the blow-up is at 3
- $\displaystyle\lim_{t\to\infty} \int_{0}^{t} \frac{dx}{3-x}$ | im-wrong-type | used a Type I limit for a Type II integral
- $\displaystyle\int_{0}^{3} \frac{dx}{3-x}$ by the FTC directly | im-hidden-discontinuity | missed the blow-up at x = 3
E: The discontinuity is at the upper endpoint b = 3: lim_{t→3⁻} ∫₀ᵗ.

## im-f-010 · kind technique · text · check: none: limit set-up
P: Rewrite $\displaystyle\int_{1}^{5} \frac{dx}{\sqrt{x-1}}$ as a limit.
* $\displaystyle\lim_{t\to 1^{+}} \int_{t}^{5} \frac{dx}{\sqrt{x-1}}$ ✓
- $\displaystyle\lim_{t\to 1^{-}} \int_{t}^{5} \frac{dx}{\sqrt{x-1}}$ | im-wrong-one-sided-limit | approached 1 from outside the interval
- $\displaystyle\lim_{t\to 5^{-}} \int_{1}^{t} \frac{dx}{\sqrt{x-1}}$ | im-wrong-type | treated 5 as the bad endpoint; the blow-up is at 1
- $\displaystyle\lim_{t\to\infty} \int_{1}^{t} \frac{dx}{\sqrt{x-1}}$ | im-wrong-type | used a Type I limit for a Type II integral
- $\displaystyle\int_{1}^{5} \frac{dx}{\sqrt{x-1}}$ by the FTC directly | im-hidden-discontinuity | missed the blow-up at x = 1
E: The discontinuity is at the lower endpoint a = 1: lim_{t→1⁺} ∫ₜ⁵.

## im-f-011 · kind technique · text · check: improper x*exp(-x^2) [-inf, inf] conv value 0 split 0
P: How must $\displaystyle\int_{-\infty}^{\infty} x e^{-x^{2}}\,dx$ be set up?
* $\displaystyle\int_{-\infty}^{0} x e^{-x^{2}}dx + \int_{0}^{\infty} x e^{-x^{2}}dx$, each as its own limit; both must converge ✓
- $\displaystyle\lim_{t\to\infty} \int_{-t}^{t} x e^{-x^{2}}\,dx$ | im-symmetric-limit | one symmetric limit is never allowed
- $0$ by odd symmetry, no limits needed | im-symmetric-limit | symmetry is used only after both halves are shown to converge
- $2\displaystyle\int_{0}^{\infty} x e^{-x^{2}}\,dx$ | algebra-error | doubling is for even integrands; this one is odd
- $\displaystyle\lim_{t\to\infty} \int_{-\infty}^{t} x e^{-x^{2}}\,dx$ | im-split-mishandled | kept −∞ as a bound inside a single limit
E: Split at any c (here 0) into two separate limits; it converges (to 0) because each half converges (−1/2 and 1/2).

## im-f-012 · kind technique · text · check: none: limit set-up with an interior discontinuity
P: How must $\displaystyle\int_{0}^{3} \frac{dx}{(x-1)^{2/3}}$ be set up?
* $\displaystyle\lim_{s\to 1^{-}} \int_{0}^{s} + \lim_{t\to 1^{+}} \int_{t}^{3}$, both must converge ✓
- Apply the FTC straight through $x = 1$ | im-hidden-discontinuity | missed the blow-up at x = 1 inside the interval
- $\displaystyle\lim_{t\to 1} \int_{0}^{3} \frac{dx}{(x-1)^{2/3}}$ | im-split-mishandled | one two-sided limit does not separate the two pieces
- Only $\displaystyle\int_{1}^{3}$ needs a limit; $\displaystyle\int_{0}^{1}$ is fine | im-one-half-only | both pieces touch the discontinuity
- $\displaystyle\lim_{t\to 1^{-}} \int_{0}^{t} + \int_{1}^{3}$ by the FTC | im-one-half-only | the right piece also needs its own one-sided limit
E: An interior discontinuity splits the integral into two one-sided limits (s → 1⁻ and t → 1⁺).

## im-f-013 · kind formula · exprs · check: improper 1/x^2 [1, inf] conv value 1
P: $\displaystyle\int_{1}^{\infty} \frac{dx}{x^{2}} = ?$
* $1$ ✓
- $-1$ | ftc-order-swapped | computed F(1) − F(t) instead of F(t) − F(1)
- $0$ | im-plug-infinity | wrote F(∞) = 0 and stopped
- $\frac{1}{2}$ | power-rule-int-exponent | integrated x^{-2} as −1/(2x²)
- $2$ | arithmetic-error | subtracted −1 twice
E: lim_{t→∞} (1 − 1/t) = 1.

## im-f-014 · kind formula · exprs · check: improper 1/x^3 [1, inf] conv value 1/2
P: $\displaystyle\int_{1}^{\infty} \frac{dx}{x^{3}} = ?$
* $\frac{1}{2}$ ✓
- $1$ | power-rule-int-exponent | treated it like ∫ dx/x²
- $-\frac{1}{2}$ | ftc-order-swapped | computed F(1) − F(t)
- $0$ | im-plug-infinity | wrote F(∞) = 0 and stopped
- $\frac{1}{3}$ | arithmetic-error | divided by 3 instead of 2
E: ∫ x^{-3} dx = −1/(2x²); lim_{t→∞} (1/2 − 1/(2t²)) = 1/2.

## im-f-015 · kind formula · exprs · check: improper exp(-2*x) [0, inf] conv value 1/2
P: $\displaystyle\int_{0}^{\infty} e^{-2x}\,dx = ?$
* $\frac{1}{2}$ ✓
- $1$ | inner-constant-factor-missing | forgot the 1/2 from the inner derivative
- $-\frac{1}{2}$ | sign-error | lost the minus sign of −(1/2)e^{−2x}
- $2$ | du-constant-wrong | multiplied by 2 instead of dividing
- $0$ | im-limit-evaluated-wrong | took e^{−2t} → 1 as t → ∞
E: −(1/2)e^{−2t} + 1/2 → 1/2.

## im-f-016 · kind formula · exprs · check: improper x*exp(-x^2) [0, inf] conv value 1/2
P: $\displaystyle\int_{0}^{\infty} x e^{-x^{2}}\,dx = ?$
* $\frac{1}{2}$ ✓
- $1$ | du-constant-wrong | forgot the 1/2 from u = x², du = 2x dx
- $-\frac{1}{2}$ | sign-error | lost the minus sign of −(1/2)e^{−x²}
- $0$ | im-plug-infinity | wrote F(∞) = 0 and stopped
- $\frac{1}{4}$ | arithmetic-error | halved twice
E: u = x²: −(1/2)e^{−t²} + 1/2 → 1/2.

## im-f-017 · kind formula · exprs · check: improper 1/sqrt(x) [0, 1] conv value 2
P: $\displaystyle\int_{0}^{1} \frac{dx}{\sqrt{x}} = ?$
* $2$ ✓
- $1$ | power-rule-int-exponent | integrated x^{-1/2} as x^{1/2} without the factor 2
- $-2$ | ftc-order-swapped | computed F(t) − F(1)
- $\frac{1}{2}$ | arithmetic-error | divided by 2 instead of multiplying
- $4$ | arithmetic-error | doubled twice
E: lim_{t→0⁺} (2 − 2√t) = 2.

## im-f-018 · kind formula · exprs · check: improper 1/sqrt(4-x) [0, 4] conv value 4
P: $\displaystyle\int_{0}^{4} \frac{dx}{\sqrt{4-x}} = ?$
* $4$ ✓
- $-4$ | sign-error | missed the sign from the inner derivative of 4 − x
- $2$ | du-constant-wrong | dropped the factor 2 in −2√(4 − x)
- $0$ | im-plug-infinity | plugged in x = 4, got 0, and stopped
- $8$ | arithmetic-error | doubled the result
E: −2√(4 − t) + 2√4 → 4 as t → 4⁻.

## im-f-019 · kind formula · exprs · check: improper 1/(1+x^2) [1, inf] conv value pi/4
P: $\displaystyle\int_{1}^{\infty} \frac{dx}{1+x^{2}} = ?$
* $\frac{\pi}{4}$ ✓
- $\frac{\pi}{2}$ | inverse-trig-value-wrong | forgot to subtract arctan 1
- $-\frac{\pi}{4}$ | ftc-order-swapped | computed arctan 1 − arctan t
- $\pi$ | inverse-trig-value-wrong | took arctan t → π
- $\frac{3\pi}{4}$ | inverse-trig-value-wrong | computed π − π/4
E: lim_{t→∞} (arctan t − arctan 1) = π/2 − π/4.

## im-f-020 · kind formula · exprs · check: improper 1/(1+x^2) [-inf, inf] conv value pi split 0
P: $\displaystyle\int_{-\infty}^{\infty} \frac{dx}{1+x^{2}} = ?$
* $\pi$ ✓
- $\frac{\pi}{2}$ | im-one-half-only | computed only ∫₀^∞
- $0$ | im-plug-infinity | wrote arctan(∞) − arctan(−∞) with both as "∞" and cancelled
- $2\pi$ | arithmetic-error | doubled π instead of π/2
- $-\pi$ | sign-error | subtracted the halves in the wrong order
E: Split at 0: each half is π/2, both converge, total π.

## im-f-021 · kind formula · exprs · check: improper log(x) [0, 1] conv value -1
P: $\displaystyle\int_{0}^{1} \ln x\,dx = ?$
* $-1$ ✓
- $1$ | sign-error | lost the sign of x ln x − x at x = 1
- $0$ | im-plug-infinity | plugged in x = 0 as if ln 0 were 0
- $-\frac{1}{2}$ | ibp-formula-wrong | used x ln x − x/2 as the antiderivative
- $-2$ | arithmetic-error | counted the −x term twice
E: ∫ ln x dx = x ln x − x; lim_{t→0⁺} [(0 − 1) − (t ln t − t)] = −1 since t ln t → 0.

## im-f-022 · kind concept · text · check: improper 1/x [1, inf] div
P: $\displaystyle\int_{1}^{\infty} \frac{dx}{x}$:
* Diverges: $\displaystyle\lim_{t\to\infty} \ln t = \infty$ ✓
- Converges to $0$: $\dfrac{1}{x} \to 0$ | im-p-rule-wrong | an integrand tending to 0 is not enough; p = 1 fails the p-rule
- Converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
- Converges to $1$ by the $p$-rule | im-p-rule-wrong | the p-rule needs p > 1
- Converges to $\ln 1 = 0$: plug in the bounds | im-plug-infinity | plugged ∞ (treated as nothing) into ln x
E: ln t has no finite limit, so the integral diverges (p = 1).

## im-f-023 · kind concept · text · check: improper 1/sqrt(x) [1, inf] div
P: $\displaystyle\int_{1}^{\infty} \frac{dx}{\sqrt{x}}$:
* Diverges: $2\sqrt{t} - 2 \to \infty$ (here $p = \tfrac{1}{2} \le 1$) ✓
- Converges to $2$ | im-p-rule-wrong | used the value of ∫₀¹ dx/√x
- Converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
- Converges to $0$: $\dfrac{1}{\sqrt{x}} \to 0$ | im-p-rule-wrong | p = 1/2 < 1 diverges even though the integrand → 0
- Diverges: $\dfrac{1}{\sqrt{x}}$ is undefined at $\infty$ | im-plug-infinity | right verdict, invalid reason; ∞ is a bound, not a point
E: 2√t − 2 → ∞, so it diverges; the p-rule needs p > 1.

## im-f-024 · kind concept · text · check: improper 1/x [0, 1] div
P: $\displaystyle\int_{0}^{1} \frac{dx}{x}$:
* Diverges: $\displaystyle\lim_{t\to 0^{+}} (0 - \ln t) = \infty$ ✓
- Converges to $0$: $\ln 1 - \ln 0 = 0$ | im-plug-infinity | treated ln 0 as 0
- Converges to $-\infty$ | im-divergent-called-convergent | an infinite limit means divergence
- Converges to $1$ by the $p$-rule | im-p-rule-wrong | the p-rule is for ∫₁^∞, and p = 1 diverges there too
- Diverges because $\ln 1 = 0$ | im-limit-evaluated-wrong | right verdict, invalid reason
E: −ln t → ∞ as t → 0⁺.

## im-f-025 · kind concept · text · check: improper 1/x^2 [-1, 1] div split 0
P: $\displaystyle\int_{-1}^{1} \frac{dx}{x^{2}}$:
* Diverges: split at $0$; $\displaystyle\lim_{t\to 0^{+}} \int_{t}^{1} \frac{dx}{x^{2}} = \infty$ ✓
- $= -2$ by the FTC: $\left[-\dfrac{1}{x}\right]_{-1}^{1}$ | im-hidden-discontinuity | applied the FTC across the blow-up at 0
- $= 2$, since the integrand is positive | im-hidden-discontinuity | fixed the sign but still ignored the discontinuity
- Converges to $0$ by symmetry | im-symmetric-limit | symmetry cannot rescue an interior discontinuity
- Diverges because the limits at $x = \pm 1$ are infinite | im-wrong-type | right verdict, invalid reason: the integrand is 1 at ±1
E: The right piece alone gives 1/t − 1 → ∞, so the whole integral diverges; −2 is impossible for a positive integrand.

## im-f-026 · kind concept · text · check: improper 1/(x*log(x)) [2, inf] div
P: $\displaystyle\int_{2}^{\infty} \frac{dx}{x\ln x}$:
* Diverges: $u = \ln x$ gives $\ln(\ln t) - \ln(\ln 2) \to \infty$ ✓
- Converges to $\ln(\ln 2)$ | im-limit-evaluated-wrong | dropped the ln(ln t) term as if it tended to 0
- Converges to $0$ since the integrand $\to 0$ | im-p-rule-wrong | an integrand tending to 0 does not give convergence
- Converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
- Diverges because $\dfrac{1}{x\ln x} \ge \dfrac{1}{x}$ | algebra-error | right verdict, invalid reason: the inequality is false for x > e
E: With u = ln x the integral becomes ∫ du/u = ln u, which is unbounded.

## im-f-027 · kind concept · text · check: improper x [-inf, inf] div split 0
P: $\displaystyle\int_{-\infty}^{\infty} x\,dx$:
* Diverges: $\displaystyle\int_{0}^{\infty} x\,dx = \lim_{t\to\infty} \tfrac{t^{2}}{2} = \infty$ already ✓
- $= 0$ by symmetry (odd function) | im-symmetric-limit | both halves must converge before symmetry can be used
- $= 0$: $\displaystyle\lim_{t\to\infty} \int_{-t}^{t} x\,dx = 0$ | im-split-mishandled | used one symmetric limit instead of two separate ones
- Converges to $\infty + (-\infty) = 0$ | im-plug-infinity | treated ∞ as a number
- Converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
E: One divergent half is enough: the integral diverges.

## im-f-028 · kind concept · text · check: improper cos(x) [0, inf] div
P: $\displaystyle\int_{0}^{\infty} \cos x\,dx$:
* Diverges: $\displaystyle\lim_{t\to\infty} \sin t$ does not exist ✓
- Converges to $0$: $\sin\infty = 0$ | im-plug-infinity | plugged ∞ into sin
- Converges to $0$: $\cos$ averages out to $0$ | im-limit-evaluated-wrong | averaging is not a limit; sin t keeps oscillating
- Converges to $\infty$ | im-divergent-called-convergent | an infinite limit means divergence
- Diverges because $\cos x$ is not integrable | im-wrong-type | right verdict, invalid reason: cos x has an antiderivative
E: sin t oscillates between −1 and 1 forever, so the limit does not exist.

## im-f-029 · kind concept · text · check: improper exp(-x) [0, inf] conv value 1
P: $\displaystyle\int_{0}^{\infty} e^{-x}\,dx$:
* Converges to $1$: $\displaystyle\lim_{t\to\infty} \left(1 - e^{-t}\right) = 1$ ✓
- Converges to $0$: $e^{-\infty} = 0$ | im-plug-infinity | plugged ∞ in and forgot the lower bound
- Diverges: $e^{-x}$ never reaches $0$ | im-wrong-type | the integrand need not vanish for the integral to converge
- Converges to $-1$ | sign-error | lost the minus sign of −e^{−x}
- Converges to $e$ | im-limit-evaluated-wrong | took e^{−t} → e
E: −e^{−t} + 1 → 1.

## im-f-030 · kind concept · text · check: none: p-rule statement
P: $\displaystyle\int_{1}^{\infty} \frac{dx}{x^{p}}$ converges exactly when
* $p > 1$ ✓
- $p \ge 1$ | im-p-rule-wrong | included p = 1, where ln t → ∞
- $p < 1$ | im-p-rule-wrong | reversed the rule
- $p > 0$ | im-p-rule-wrong | any positive p is not enough
- $p > 1$ or $p < 0$ | im-p-rule-wrong | negative p makes the integrand grow
E: ∫₁^∞ x^{−p} dx = 1/(p − 1) for p > 1 and diverges for p ≤ 1.

## im-f-031 · kind formula · exprs · var: p · domain: { p: [1.5, 4] } · check: none: symbolic p; the value 1/(p−1) is verified by hand (the p-rule)
P: For $p > 1$, $\displaystyle\int_{1}^{\infty} \frac{dx}{x^{p}} = ?$
* $\frac{1}{p-1}$ ✓
- $\frac{1}{1-p}$ | sign-error | lost the sign when evaluating x^{1−p}/(1 − p) at the lower bound
- $\frac{1}{p}$ | power-rule-int-exponent | divided by p instead of 1 − p
- $\frac{p}{p-1}$ | arithmetic-error | multiplied by p
- $\frac{1}{p+1}$ | power-rule-int-exponent | used p + 1 instead of p − 1
E: [x^{1−p}/(1 − p)]₁ᵗ = (t^{1−p} − 1)/(1 − p) → 1/(p − 1).

## im-f-032 · kind formula · exprs · check: limit arctan(t) → pi/2 (variable t)
P: $\displaystyle\lim_{t\to\infty} \arctan t = ?$
* $\frac{\pi}{2}$ ✓
- $\pi$ | inverse-trig-value-wrong | confused the range of arctan with (0, π)
- $0$ | im-plug-infinity | treated arctan ∞ as undefined and wrote 0
- $\frac{\pi}{4}$ | inverse-trig-value-wrong | used arctan 1
- $1$ | sq-substitute-infinity | "cancelled" the infinity
E: arctan t → π/2 as t → ∞.

## im-f-033 · kind concept · text · check: none: a limit as t → 0⁺, verified by hand (L'Hôpital on ln t/(1/t))
P: $\displaystyle\lim_{t\to 0^{+}} t\ln t = ?$ (needed for $\int_{0}^{1} \ln x\,dx$)
* $0$: write it as $\dfrac{\ln t}{1/t}$ and use L'Hôpital ✓
- $-\infty$: $\ln t \to -\infty$ | im-limit-evaluated-wrong | ignored the factor t → 0
- $1$: $0 \cdot \infty$ cancels | sq-limit-law-misuse | treated 0·∞ as 1
- $-1$ | arithmetic-error | sign slip after L'Hôpital
- DNE: the one-sided limit cannot exist | im-wrong-one-sided-limit | one-sided limits exist just as well
E: ln t/(1/t) → (1/t)/(−1/t²) = −t → 0.

## im-f-034 · kind formula · exprs · check: limit exp(-3*t) → 0 (variable t)
P: $\displaystyle\lim_{t\to\infty} e^{-3t} = ?$
* $0$ ✓
- $1$ | im-limit-evaluated-wrong | took e^{−3t} → 1
- $-\frac{1}{3}$ | du-constant-wrong | confused the limit with the antiderivative's constant
- $e$ | arithmetic-error | dropped the exponent
- $-3$ | sign-error | reported the coefficient
E: e^{−3t} = 1/e^{3t} → 0.

## im-f-035 · kind technique · text · check: none: first step of the procedure
P: First step for $\displaystyle\int_{0}^{\infty} \frac{dx}{1+x^{2}}$?
* Identify the type (Type I: infinite bound) and write $\displaystyle\lim_{t\to\infty} \int_{0}^{t} \frac{dx}{1+x^{2}}$ ✓
- Plug $\infty$ into $\arctan x$ | im-plug-infinity | ∞ is never plugged in
- Split at $x = 0$ | im-split-mishandled | splitting is for ∫ from −∞ to ∞ or interior discontinuities
- Compute $\arctan(\infty) - \arctan 0 = \tfrac{\pi}{2}$ directly | ftc-order-swapped | the FTC applies inside the limit, not with ∞ as a bound
- Check whether the integrand blows up at $x = 0$ (Type II) | im-wrong-type | 1/(1 + x²) is continuous; the only bad bound is ∞
E: Step 1 is to identify the type; here only the upper bound is infinite.

## Generators

### im-g-exp · kind formula · exprs · describe: "∫₀^∞ e^{−kx} dx"
Table k, index (seed − 1) % 8: 2, 3, 4, 5, 6, 1/2, 3/2, 5/2 (render e^{-2x}, e^{-x/2}, e^{-3x/2}, e^{-5x/2}).
P: $\displaystyle\int_{0}^{\infty} e^{-kx}\,dx = ?$
check: improper exp(-k*x) [0, inf] conv value 1/k (write k as a mathjs number string, e.g. exp(-(3/2)*x), value '2/3')
* 1/k ✓
- −1/k | sign-error | lost the minus sign of −(1/k)e^{−kx}
- k | du-constant-wrong | multiplied by k instead of dividing
- 1 | inner-constant-factor-missing | forgot the 1/k
- 0 | im-limit-evaluated-wrong | took e^{−kt} → 1
E: −(1/k)e^{−kt} + 1/k → 1/k.

### im-g-p · kind formula · exprs · describe: "∫₁^∞ dx/x^p, p > 1"
Table p, index (seed − 1) % 8: 2, 3, 4, 3/2, 5/2, 5, 6, 7/2.
P: $\displaystyle\int_{1}^{\infty} \frac{dx}{x^{p}} = ?$ (render x^{3/2} etc.)
check: improper 1/x^p [1, inf] conv value 1/(p−1) (mathjs: x^(-(3/2)) → write 1/x^(3/2); value as a fraction string)
* 1/(p−1) ✓
- 1/(1−p) | ftc-order-swapped | evaluated F(1) − F(t)
- 1/p | power-rule-int-exponent | divided by p instead of p − 1
- 1/(p+1) | arithmetic-error | used p + 1 instead of p − 1
- 0 | im-plug-infinity | wrote F(∞) = 0 and stopped
E: (t^{1−p} − 1)/(1 − p) → 1/(p − 1).
