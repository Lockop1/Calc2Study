# Step-Through plan — partial fractions (topic id `partial-fractions`, prefix `pf`)
Conventions: qa/briefs/steps-typist.md. In exprs never use the symbol C for a coefficient (C is the integration constant);
coefficient vectors are written as exprs like `[1, -2, -2]` with latex `A = 1,\quad B = -2,\quad C = -2`.
Antiderivative options: all end in "+ C" (latex) and "+ C" (expr).

## pf-s-01 · difficulty 1 · title "Two linear factors"
S: text "Evaluate" · latex "\int \frac{dx}{x^{2}-1}"
### step 1 · check: none: first move of the procedure
P: What is the first thing to check?
* Is it proper? Yes: $\deg 1 < \deg 2$ — so factor the denominator next
- Divide first: $x^{2} - 1$ into $1$ | pf-improper-not-divided | long division is only for improper fractions
- Write $\dfrac{A}{x^{2}-1}$ and solve for $A$ | pf-not-fully-factored | the denominator still factors
- Write $\dfrac{Ax+B}{x^{2}-1}$ since the denominator is quadratic | pf-irreducible-misjudged | x² − 1 is not irreducible (b² − 4ac = 4 > 0)
- Substitute $u = x^{2} - 1$ | technique-wrong | du = 2x dx is not present
E: The fraction is proper (numerator degree 0 < 2), so the next step is factoring completely.
R text: Proper. Factor: $x^{2} - 1 = (x-1)(x+1)$
### step 2 · check: none: decomposition form
P: Which decomposition form is right?
* $\dfrac{A}{x-1} + \dfrac{B}{x+1}$
- $\dfrac{A}{x-1} + \dfrac{Bx + C}{x+1}$ | pf-linear-over-repeated-linear | a linear factor takes a constant numerator
- $\dfrac{Ax + B}{(x-1)(x+1)}$ | pf-not-fully-factored | each factor gets its own term
- $\dfrac{A}{(x-1)(x+1)}$ | pf-constant-over-quadratic | one constant over the whole product is not a decomposition
- $\dfrac{A}{x-1} + \dfrac{B}{(x+1)^{2}}$ | pf-missing-repeated-power | x + 1 is not repeated
E: Two distinct linear factors: one constant over each.
R latex: \frac{1}{(x-1)(x+1)} = \frac{A}{x-1} + \frac{B}{x+1}
### step 3 · check: value [1/2, -1/2]
P: Multiply out: $1 = A(x+1) + B(x-1)$. Find $A$ and $B$.
* $A = \frac{1}{2},\quad B = -\frac{1}{2}$ (expr `[1/2, -1/2]`)
- $A = -\frac{1}{2},\quad B = \frac{1}{2}$ (expr `[-1/2, 1/2]`) | pf-coefficient-wrong | plugged x = 1 into the wrong factor
- $A = 1,\quad B = -1$ (expr `[1, -1]`) | pf-coefficient-wrong | forgot the factor 2 from x + 1 at x = 1
- $A = \frac{1}{2},\quad B = \frac{1}{2}$ (expr `[1/2, 1/2]`) | sign-error | at x = −1, 1 = −2B gives B = −1/2
- $A = 2,\quad B = -2$ (expr `[2, -2]`) | arithmetic-error | divided the wrong way at x = 1
E: x = 1 gives 1 = 2A, so A = 1/2; x = −1 gives 1 = −2B, so B = −1/2.
R latex: \frac{1}{x^{2}-1} = \frac{1/2}{x-1} - \frac{1/2}{x+1}
### step 4 · check: antiderivative 1/(x^2-1) · domain: [1.5, 3]
P: Integrate term by term.
* $\frac{1}{2}\ln|x-1| - \frac{1}{2}\ln|x+1| + C$ (expr `1/2*log(abs(x-1)) - 1/2*log(abs(x+1)) + C`)
- $\frac{1}{2}\ln|x-1| + \frac{1}{2}\ln|x+1| + C$ (expr `1/2*log(abs(x-1)) + 1/2*log(abs(x+1)) + C`) | sign-error | B is negative
- $\ln|x-1| - \ln|x+1| + C$ (expr `log(abs(x-1)) - log(abs(x+1)) + C`) | pf-coefficient-wrong | dropped the factors 1/2
- $\frac{1}{2}\ln|x^{2}-1| + C$ (expr `1/2*log(abs(x^2-1)) + C`) | ln-misapplied | ∫ dx/(x² − 1) is not (1/2) ln|x² − 1|
- $-\frac{1}{2(x-1)} + \frac{1}{2(x+1)} + C$ (expr `-1/(2*(x-1)) + 1/(2*(x+1)) + C`) | pf-power-term-as-ln | used the power rule on first-power factors
E: ∫ A/(x − 1) dx = A ln|x − 1| and ∫ B/(x + 1) dx = B ln|x + 1|.
R latex: = \frac{1}{2}\ln|x-1| - \frac{1}{2}\ln|x+1| + C
FINAL: latex "\frac{1}{2}\ln\left|\frac{x-1}{x+1}\right| + C" · expr `1/2*log(abs((x-1)/(x+1))) + C` · check: antiderivative 1/(x^2-1) · domain [1.5, 3] · recap: Proper fraction → factor (x−1)(x+1) → one constant over each factor → A = 1/2, B = −1/2 by plugging in the roots → integrate each term to logs.

## pf-s-02 · difficulty 1 · title "Coefficients by plugging in roots"
S: text "Evaluate" · latex "\int \frac{5x-3}{(x-1)(x+2)}\,dx"
### step 1 · check: none: form
P: The fraction is proper and already factored. Which form comes next?
* $\dfrac{A}{x-1} + \dfrac{B}{x+2}$
- $\dfrac{Ax+B}{x-1} + \dfrac{Cx+D}{x+2}$ | pf-linear-over-repeated-linear | linear factors take constant numerators
- $\dfrac{A}{(x-1)(x+2)}$ | pf-constant-over-quadratic | one constant cannot represent the fraction
- Long division first | pf-improper-not-divided | degree 1 < degree 2, so no division
- $\dfrac{A}{x-1} + \dfrac{B}{x+2} + \dfrac{C}{x^{2}+x-2}$ | pf-missing-repeated-power | the quadratic is just the product of the two factors
E: Two distinct linear factors, one constant each.
R latex: \frac{5x-3}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2}
### step 2 · check: value 2/3
P: Multiply out: $5x - 3 = A(x+2) + B(x-1)$. Plug in $x = 1$. What is $A$?
* $\frac{2}{3}$ (expr `2/3`)
- $2$ (expr `2`) | pf-coefficient-wrong | forgot to divide by x + 2 = 3
- $-\frac{2}{3}$ (expr `-2/3`) | sign-error | sign slip in 5 − 3
- $\frac{13}{3}$ (expr `13/3`) | pf-coefficient-wrong | plugged in x = −2 (that gives B, with the wrong sign)
- $\frac{8}{3}$ (expr `8/3`) | arithmetic-error | computed 5 + 3 instead of 5 − 3
E: At x = 1: 5 − 3 = 3A, so A = 2/3.
R latex: A = \frac{2}{3}
### step 3 · check: value 13/3
P: Plug in $x = -2$. What is $B$?
* $\frac{13}{3}$ (expr `13/3`)
- $-\frac{13}{3}$ (expr `-13/3`) | sign-error | −13 = −3B gives B = +13/3
- $\frac{7}{3}$ (expr `7/3`) | arithmetic-error | computed 5(−2) + 3 instead of 5(−2) − 3
- $13$ (expr `13`) | pf-coefficient-wrong | forgot to divide by x − 1 = −3
- $\frac{2}{3}$ (expr `2/3`) | pf-coefficient-wrong | reused the value of A
E: At x = −2: −10 − 3 = −3B, so B = 13/3.
R latex: \frac{5x-3}{(x-1)(x+2)} = \frac{2/3}{x-1} + \frac{13/3}{x+2}
### step 4 · check: antiderivative (5*x-3)/((x-1)*(x+2)) · domain: [1.5, 3]
P: Integrate.
* $\frac{2}{3}\ln|x-1| + \frac{13}{3}\ln|x+2| + C$ (expr `2/3*log(abs(x-1)) + 13/3*log(abs(x+2)) + C`)
- $\frac{2}{3}\ln|x-1| - \frac{13}{3}\ln|x+2| + C$ (expr `2/3*log(abs(x-1)) - 13/3*log(abs(x+2)) + C`) | sign-error | B is positive
- $\frac{2}{3}\ln(x-1) + \frac{13}{3}\ln(x+2) + C$ (expr `2/3*log(x-1) + 13/3*log(x+2) + C`) | abs-dropped | the logs need absolute values
- $\frac{3}{2}\ln|x-1| + \frac{3}{13}\ln|x+2| + C$ (expr `3/2*log(abs(x-1)) + 3/13*log(abs(x+2)) + C`) | pf-coefficient-wrong | inverted the coefficients
- $-\frac{2}{3(x-1)} - \frac{13}{3(x+2)} + C$ (expr `-2/(3*(x-1)) - 13/(3*(x+2)) + C`) | pf-power-term-as-ln | used the power rule instead of ln
E: Each A/(x − a) term integrates to A ln|x − a|.
R latex: = \frac{2}{3}\ln|x-1| + \frac{13}{3}\ln|x+2| + C
FINAL: latex "\frac{2}{3}\ln|x-1| + \frac{13}{3}\ln|x+2| + C" · expr `2/3*log(abs(x-1)) + 13/3*log(abs(x+2)) + C` · check: antiderivative (5*x-3)/((x-1)*(x+2)) · domain [1.5, 3] · recap: Proper and factored → A/(x−1) + B/(x+2) → plug in the roots x = 1 and x = −2 → integrate each term to a log.

## pf-s-03 · difficulty 2 · title "The class example"
S: text "Evaluate" · latex "\int \frac{3-x^{2}}{(x-1)(x^{2}+1)}\,dx"
### step 1 · check: none: irreducibility check
P: Is $x^{2}+1$ irreducible, and what does that mean for the form?
* $b^{2} - 4ac = -4 < 0$: irreducible, so it gets a linear numerator $Bx + C$
- $b^{2} - 4ac = -4 < 0$: irreducible, so it gets a constant numerator $B$ | pf-constant-over-quadratic | an irreducible quadratic needs Ax + B on top
- $x^{2} + 1 = (x+1)^{2}$, a repeated linear factor | pf-irreducible-misjudged | (x + 1)² = x² + 2x + 1
- $x^{2} + 1 = (x-1)(x+1)$, two linear factors | pf-irreducible-misjudged | that product is x² − 1
- $b^{2} - 4ac = 4 > 0$: it factors | pf-irreducible-misjudged | b = 0 and c = 1 give −4
E: The discriminant is negative, so the quadratic stays and takes a linear numerator.
R latex: \frac{3-x^{2}}{(x-1)(x^{2}+1)} = \frac{A}{x-1} + \frac{Bx+C}{x^{2}+1}
### step 2 · check: value 1
P: Multiply out: $3 - x^{2} = A(x^{2}+1) + (Bx+C)(x-1)$. Plug in $x = 1$. What is $A$?
* $1$ (expr `1`)
- $2$ (expr `2`) | pf-coefficient-wrong | forgot to divide by x² + 1 = 2
- $-1$ (expr `-1`) | sign-error | sign slip in 3 − 1
- $\frac{1}{2}$ (expr `1/2`) | arithmetic-error | divided 1 by 2 instead of 2 by 2
- $3$ (expr `3`) | pf-coefficient-wrong | plugged in x = 0 (that equation involves C too)
E: At x = 1: 3 − 1 = 2A, so A = 1.
R latex: A = 1
### step 3 · check: value [-2, -2]
P: Now plug in $x = 0$, then compare the $x^{2}$ coefficients. What are $C$ and $B$?
* $C = -2,\quad B = -2$ (expr `[-2, -2]`)
- $C = 2,\quad B = -2$ (expr `[2, -2]`) | sign-error | at x = 0: 3 = A − C gives C = −2, not 2
- $C = -2,\quad B = 2$ (expr `[-2, 2]`) | pf-coefficient-wrong | the x² coefficient gives −1 = A + B, so B = −2
- $C = -3,\quad B = -1$ (expr `[-3, -1]`) | pf-coefficient-wrong | forgot the A(x² + 1) contribution at x = 0
- $C = -2,\quad B = 0$ (expr `[-2, 0]`) | pf-coefficient-wrong | compared the x coefficients only (which say C − B = 0 ⇒ B = C)
E: x = 0: 3 = A − C ⇒ C = −2. x² terms: −1 = A + B ⇒ B = −2.
R latex: \frac{3-x^{2}}{(x-1)(x^{2}+1)} = \frac{1}{x-1} - \frac{2x+2}{x^{2}+1}
### step 4 · check: none: how to split the quadratic term
P: How do you integrate $\dfrac{2x+2}{x^{2}+1}$?
* Split: $\dfrac{2x}{x^{2}+1}$ with $u = x^{2}+1$, and $\dfrac{2}{x^{2}+1}$ as an arctan
- $u = x^{2} + 1$ for the whole term: $\ln(x^{2}+1)$ | pf-ln-arctan-swapped | the constant part 2/(x² + 1) is not a du multiple
- $x = \tan\theta$ for the whole term | pf-ln-arctan-swapped | the 2x part is a simple u-substitution; only the constant part needs arctan
- Complete the square first | pf-square-not-completed | there is no x term; x² + 1 is already a sum of squares
- Partial fractions again: $\dfrac{A}{x+i} + \dfrac{B}{x-i}$ | pf-irreducible-misjudged | the course keeps irreducible quadratics intact
E: (Ax + B)/(x² + k²) splits into an x-part (u = x² + k²) and a constant part (arctan).
R latex: \frac{2x+2}{x^{2}+1} = \frac{2x}{x^{2}+1} + \frac{2}{x^{2}+1}
### step 5 · check: antiderivative (3-x^2)/((x-1)*(x^2+1)) · domain: [1.5, 3]
P: Integrate everything.
* $\ln|x-1| - \ln(x^{2}+1) - 2\arctan x + C$ (expr `log(abs(x-1)) - log(x^2+1) - 2*arctan(x) + C`)
- $\ln|x-1| - \ln(x^{2}+1) + 2\arctan x + C$ (expr `log(abs(x-1)) - log(x^2+1) + 2*arctan(x) + C`) | sign-error | the whole quadratic term carries a minus sign
- $\ln|x-1| - 2\ln(x^{2}+1) - 2\arctan x + C$ (expr `log(abs(x-1)) - 2*log(x^2+1) - 2*arctan(x) + C`) | du-constant-wrong | ∫ 2x/(x² + 1) dx = ln(x² + 1), no extra 2
- $\ln|x-1| - \ln(x^{2}+1) - \arctan x + C$ (expr `log(abs(x-1)) - log(x^2+1) - arctan(x) + C`) | arithmetic-error | the constant part is 2/(x² + 1), giving 2 arctan x
- $\ln|x-1| - \ln(x^{2}+1) - 2\arctan(2x) + C$ (expr `log(abs(x-1)) - log(x^2+1) - 2*arctan(2*x) + C`) | pf-arctan-missing-1-over-k | here k = 1, so the argument is x
E: ∫ dx/(x − 1) = ln|x − 1|; ∫ 2x/(x² + 1) = ln(x² + 1); ∫ 2/(x² + 1) = 2 arctan x; the last two carry the minus sign.
R latex: = \ln|x-1| - \ln(x^{2}+1) - 2\arctan x + C
FINAL: latex "\ln|x-1| - \ln(x^{2}+1) - 2\arctan x + C" · expr `log(abs(x-1)) - log(x^2+1) - 2*arctan(x) + C` · check: antiderivative (3-x^2)/((x-1)*(x^2+1)) · domain [1.5, 3] · recap: Check the discriminant → A/(x−1) + (Bx+C)/(x²+1) → A = 1 at x = 1, C = −2 at x = 0, B = −2 from the x² coefficient → split the quadratic term into a ln part and an arctan part.

## pf-s-04 · difficulty 2 · title "Improper fraction: divide first"
S: text "Evaluate" · latex "\int \frac{x^{3}}{x^{2}+1}\,dx"
### step 1 · check: none: proper/improper decision
P: First step?
* Improper ($\deg 3 \ge \deg 2$): do long division first
- Proper: write $\dfrac{Ax+B}{x^{2}+1}$ | pf-improper-not-divided | the numerator degree is not smaller
- Factor $x^{2} + 1$ | pf-irreducible-misjudged | x² + 1 is irreducible
- Substitute $u = x^{2} + 1$ directly | technique-wrong | x³ dx is not a multiple of du = 2x dx without first dividing
- Write $\dfrac{A}{x^{2}+1} + \dfrac{Bx}{x^{2}+1}$ | pf-improper-not-divided | still a decomposition of an improper fraction
E: Degree 3 ≥ degree 2 means improper; divide before anything else.
R text: Improper: long division first
### step 2 · check: identity x^3/(x^2+1) · var: x
P: Divide: $\dfrac{x^{3}}{x^{2}+1} = ?$
* $x - \dfrac{x}{x^{2}+1}$ (expr `x - x/(x^2+1)`)
- $x + \dfrac{x}{x^{2}+1}$ (expr `x + x/(x^2+1)`) | sign-error | x³ − x(x² + 1) = −x
- $x - \dfrac{1}{x^{2}+1}$ (expr `x - 1/(x^2+1)`) | pf-division-wrong | the remainder is −x, not −1
- $x^{2} - \dfrac{x}{x^{2}+1}$ (expr `x^2 - x/(x^2+1)`) | pf-division-wrong | the quotient is x, not x²
- $x - \dfrac{x}{x^{2}}$ (expr `x - x/x^2`) | pf-division-wrong | the remainder stays over the whole divisor
E: x³ = x(x² + 1) − x, so the quotient is x and the remainder −x.
R latex: \frac{x^{3}}{x^{2}+1} = x - \frac{x}{x^{2}+1}
### step 3 · check: none: substitution choice
P: How do you integrate $\dfrac{x}{x^{2}+1}$?
* $u = x^{2}+1$, $du = 2x\,dx$: it becomes $\frac{1}{2}\int \frac{du}{u}$
- $x = \tan\theta$ | pf-ln-arctan-swapped | the x on top makes this a u-substitution, not an arctan
- Partial fractions over $x^{2}+1$ | pf-constant-over-quadratic | the term is already a single irreducible piece
- $u = x$ | u-choice-wrong | that changes nothing
- Power rule: $\dfrac{x^{2}/2}{x^{3}/3 + x}$ | ln-misapplied | there is no quotient rule for integrals
E: The numerator is (1/2) d/dx of the denominator.
R latex: \int \frac{x}{x^{2}+1}\,dx = \frac{1}{2}\ln(x^{2}+1)
### step 4 · check: antiderivative x^3/(x^2+1)
P: Put it together.
* $\frac{x^{2}}{2} - \frac{1}{2}\ln(x^{2}+1) + C$ (expr `x^2/2 - 1/2*log(x^2+1) + C`)
- $\frac{x^{2}}{2} + \frac{1}{2}\ln(x^{2}+1) + C$ (expr `x^2/2 + 1/2*log(x^2+1) + C`) | sign-error | the remainder term is subtracted
- $\frac{x^{2}}{2} - \ln(x^{2}+1) + C$ (expr `x^2/2 - log(x^2+1) + C`) | du-constant-wrong | forgot the 1/2 from du = 2x dx
- $x^{2} - \frac{1}{2}\ln(x^{2}+1) + C$ (expr `x^2 - 1/2*log(x^2+1) + C`) | power-rule-int-coefficient | ∫ x dx = x²/2
- $\frac{x^{2}}{2} - \frac{1}{2}\arctan x + C$ (expr `x^2/2 - 1/2*arctan(x) + C`) | pf-ln-arctan-swapped | x/(x² + 1) integrates to a log, not an arctan
E: ∫ x dx = x²/2 and ∫ x/(x² + 1) dx = (1/2) ln(x² + 1).
R latex: = \frac{x^{2}}{2} - \frac{1}{2}\ln(x^{2}+1) + C
FINAL: latex "\frac{x^{2}}{2} - \frac{1}{2}\ln(x^{2}+1) + C" · expr `x^2/2 - 1/2*log(x^2+1) + C` · check: antiderivative x^3/(x^2+1) · recap: Improper → long division gives x − x/(x²+1) → the remainder term is a u-substitution → x²/2 − (1/2)ln(x²+1) + C.

## pf-s-05 · difficulty 2 · title "Repeated linear factor"
S: text "Evaluate" · latex "\int \frac{2x+3}{(x+1)^{2}}\,dx"
### step 1 · check: none: form
P: Which form fits a repeated linear factor?
* $\dfrac{A}{x+1} + \dfrac{B}{(x+1)^{2}}$
- $\dfrac{A}{(x+1)^{2}}$ | pf-missing-repeated-power | one term for EACH power
- $\dfrac{Ax+B}{(x+1)^{2}}$ | pf-linear-over-repeated-linear | repeated linear factors take constants, one per power
- $\dfrac{A}{x+1} + \dfrac{B}{x+1}$ | pf-missing-repeated-power | the second term must be over (x + 1)²
- $\dfrac{A}{x+1} + \dfrac{Bx+C}{(x+1)^{2}}$ | pf-linear-over-repeated-linear | the numerators are constants
E: (ax + b)² gets A/(ax + b) + B/(ax + b)².
R latex: \frac{2x+3}{(x+1)^{2}} = \frac{A}{x+1} + \frac{B}{(x+1)^{2}}
### step 2 · check: value [2, 1]
P: Multiply out: $2x + 3 = A(x+1) + B$. Find $A$ and $B$.
* $A = 2,\quad B = 1$ (expr `[2, 1]`)
- $A = 2,\quad B = 3$ (expr `[2, 3]`) | pf-coefficient-wrong | at x = −1: −2 + 3 = B gives 1, not 3
- $A = 1,\quad B = 2$ (expr `[1, 2]`) | pf-coefficient-wrong | swapped the roles: the x coefficient gives A = 2
- $A = 2,\quad B = -1$ (expr `[2, -1]`) | sign-error | 2(−1) + 3 = +1
- $A = 3,\quad B = 2$ (expr `[3, 2]`) | pf-coefficient-wrong | read off the constants without multiplying out
E: x = −1 gives B = 1; the x coefficient gives A = 2.
R latex: \frac{2x+3}{(x+1)^{2}} = \frac{2}{x+1} + \frac{1}{(x+1)^{2}}
### step 3 · check: antiderivative (2*x+3)/(x+1)^2
P: Integrate.
* $2\ln|x+1| - \dfrac{1}{x+1} + C$ (expr `2*log(abs(x+1)) - 1/(x+1) + C`)
- $2\ln|x+1| + \dfrac{1}{x+1} + C$ (expr `2*log(abs(x+1)) + 1/(x+1) + C`) | sign-error | ∫ (x + 1)^{−2} dx = −(x + 1)^{−1}
- $2\ln|x+1| + \ln|x+1|^{2} + C$ (expr `2*log(abs(x+1)) + log(abs(x+1))^2 + C`) | pf-power-term-as-ln | the squared factor integrates by the power rule, not a log
- $2\ln|x+1| - \dfrac{1}{2(x+1)^{2}} + C$ (expr `2*log(abs(x+1)) - 1/(2*(x+1)^2) + C`) | power-rule-int-exponent | (x + 1)^{−2} integrates to −(x + 1)^{−1}, not −(x + 1)^{−2}/2
- $\ln|x+1| - \dfrac{1}{x+1} + C$ (expr `log(abs(x+1)) - 1/(x+1) + C`) | pf-coefficient-wrong | A = 2
E: A/(x + 1) → A ln|x + 1|; B/(x + 1)² → −B/(x + 1).
R latex: = 2\ln|x+1| - \frac{1}{x+1} + C
FINAL: latex "2\ln|x+1| - \frac{1}{x+1} + C" · expr `2*log(abs(x+1)) - 1/(x+1) + C` · check: antiderivative (2*x+3)/(x+1)^2 · recap: Repeated linear factor → one constant per power → B from x = −1, A from the x coefficient → log for the first power, power rule for the square.

## pf-s-06 · difficulty 1 · title "Factor the denominator first"
S: text "Evaluate" · latex "\int \frac{x+4}{x^{2}+2x}\,dx"
### step 1 · check: none: factoring
P: The fraction is proper. What next?
* Factor completely: $x^{2} + 2x = x(x+2)$
- Complete the square: $(x+1)^{2} - 1$ | pf-square-not-completed | completing the square is for irreducible quadratics; this one factors
- Write $\dfrac{Ax+B}{x^{2}+2x}$ | pf-not-fully-factored | the denominator factors into linear pieces
- Divide first | pf-improper-not-divided | degree 1 < degree 2
- Substitute $u = x^{2} + 2x$ | technique-wrong | du = (2x + 2) dx does not match x + 4
E: Always factor the denominator completely before writing the form.
R latex: \frac{x+4}{x(x+2)}
### step 2 · check: none: form
P: Which form?
* $\dfrac{A}{x} + \dfrac{B}{x+2}$
- $\dfrac{A}{x} + \dfrac{B}{(x+2)^{2}}$ | pf-missing-repeated-power | x + 2 is not squared
- $\dfrac{Ax+B}{x(x+2)}$ | pf-not-fully-factored | each factor gets its own term
- $\dfrac{A}{x(x+2)}$ | pf-constant-over-quadratic | not a decomposition
- $\dfrac{Ax + B}{x} + \dfrac{C}{x+2}$ | pf-linear-over-repeated-linear | linear factors take constants
E: Two distinct linear factors.
R latex: \frac{x+4}{x(x+2)} = \frac{A}{x} + \frac{B}{x+2}
### step 3 · check: value [2, -1]
P: $x + 4 = A(x+2) + Bx$. Find $A$ and $B$.
* $A = 2,\quad B = -1$ (expr `[2, -1]`)
- $A = 2,\quad B = 1$ (expr `[2, 1]`) | sign-error | at x = −2: 2 = −2B gives B = −1
- $A = 4,\quad B = -1$ (expr `[4, -1]`) | pf-coefficient-wrong | at x = 0: 4 = 2A, so A = 2
- $A = -1,\quad B = 2$ (expr `[-1, 2]`) | pf-coefficient-wrong | swapped A and B
- $A = 1,\quad B = 1$ (expr `[1, 1]`) | pf-coefficient-wrong | matched the x coefficients only (1 = A + B) and guessed
E: x = 0: 4 = 2A ⇒ A = 2. x = −2: 2 = −2B ⇒ B = −1.
R latex: \frac{x+4}{x(x+2)} = \frac{2}{x} - \frac{1}{x+2}
### step 4 · check: antiderivative (x+4)/(x^2+2*x)
P: Integrate.
* $2\ln|x| - \ln|x+2| + C$ (expr `2*log(abs(x)) - log(abs(x+2)) + C`)
- $2\ln|x| + \ln|x+2| + C$ (expr `2*log(abs(x)) + log(abs(x+2)) + C`) | sign-error | B = −1
- $\ln|x| - \ln|x+2| + C$ (expr `log(abs(x)) - log(abs(x+2)) + C`) | pf-coefficient-wrong | A = 2
- $2\ln|x| - \dfrac{1}{2}\ln|x+2| + C$ (expr `2*log(abs(x)) - 1/2*log(abs(x+2)) + C`) | pf-missing-1-over-a | there is no 1/a factor: the coefficient of x in x + 2 is 1
- $\ln|x^{2}+2x| + C$ (expr `log(abs(x^2+2*x)) + C`) | ln-misapplied | that is the integral of (2x + 2)/(x² + 2x)
E: Each term is a log with its coefficient.
R latex: = 2\ln|x| - \ln|x+2| + C
FINAL: latex "2\ln|x| - \ln|x+2| + C" · expr `2*log(abs(x)) - log(abs(x+2)) + C` · check: antiderivative (x+4)/(x^2+2*x) · recap: Factor x(x+2) → A/x + B/(x+2) → plug in 0 and −2 → 2 ln|x| − ln|x+2| + C.

## pf-s-07 · difficulty 2 · title "Linear times irreducible quadratic"
S: text "Evaluate" · latex "\int \frac{dx}{x(x^{2}+4)}"
### step 1 · check: none: form
P: Which form?
* $\dfrac{A}{x} + \dfrac{Bx+C}{x^{2}+4}$
- $\dfrac{A}{x} + \dfrac{B}{x^{2}+4}$ | pf-constant-over-quadratic | an irreducible quadratic needs Bx + C
- $\dfrac{A}{x} + \dfrac{B}{x-2} + \dfrac{C}{x+2}$ | pf-irreducible-misjudged | x² + 4 does not factor (b² − 4ac = −16)
- $\dfrac{A}{x} + \dfrac{B}{x+2} + \dfrac{C}{(x+2)^{2}}$ | pf-irreducible-misjudged | x² + 4 ≠ (x + 2)²
- $\dfrac{Ax+B}{x(x^{2}+4)}$ | pf-not-fully-factored | each factor gets its own term
E: Linear factor → constant; irreducible quadratic → linear numerator.
R latex: \frac{1}{x(x^{2}+4)} = \frac{A}{x} + \frac{Bx+C}{x^{2}+4}
### step 2 · check: value 1/4
P: $1 = A(x^{2}+4) + (Bx+C)x$. Plug in $x = 0$: $A = ?$
* $\frac{1}{4}$ (expr `1/4`)
- $4$ (expr `4`) | pf-coefficient-wrong | 1 = 4A gives A = 1/4, not 4
- $1$ (expr `1`) | pf-coefficient-wrong | forgot the factor 4 from x² + 4 at x = 0
- $-\frac{1}{4}$ (expr `-1/4`) | sign-error | no sign appears at x = 0
- $\frac{1}{2}$ (expr `1/2`) | arithmetic-error | used √4 instead of 4
E: At x = 0 the second term vanishes: 1 = 4A.
R latex: A = \frac{1}{4}
### step 3 · check: value [-1/4, 0]
P: Compare the $x^{2}$ and $x$ coefficients. What are $B$ and $C$?
* $B = -\frac{1}{4},\quad C = 0$ (expr `[-1/4, 0]`)
- $B = \frac{1}{4},\quad C = 0$ (expr `[1/4, 0]`) | sign-error | 0 = A + B gives B = −A
- $B = 0,\quad C = -\frac{1}{4}$ (expr `[0, -1/4]`) | pf-coefficient-wrong | swapped the roles of B and C
- $B = -\frac{1}{4},\quad C = 1$ (expr `[-1/4, 1]`) | pf-coefficient-wrong | the x coefficient is 0, so C = 0
- $B = -1,\quad C = 0$ (expr `[-1, 0]`) | arithmetic-error | B = −A = −1/4, not −1
E: x²: 0 = A + B ⇒ B = −1/4. x: 0 = C.
R latex: \frac{1}{x(x^{2}+4)} = \frac{1/4}{x} - \frac{x/4}{x^{2}+4}
### step 4 · check: antiderivative 1/(x*(x^2+4))
P: Integrate.
* $\frac{1}{4}\ln|x| - \frac{1}{8}\ln(x^{2}+4) + C$ (expr `1/4*log(abs(x)) - 1/8*log(x^2+4) + C`)
- $\frac{1}{4}\ln|x| - \frac{1}{4}\ln(x^{2}+4) + C$ (expr `1/4*log(abs(x)) - 1/4*log(x^2+4) + C`) | du-constant-wrong | ∫ x/(x² + 4) dx = (1/2) ln(x² + 4)
- $\frac{1}{4}\ln|x| - \frac{1}{8}\arctan\frac{x}{2} + C$ (expr `1/4*log(abs(x)) - 1/8*arctan(x/2) + C`) | pf-ln-arctan-swapped | the x on top makes it a log, not an arctan
- $\frac{1}{4}\ln|x| + \frac{1}{8}\ln(x^{2}+4) + C$ (expr `1/4*log(abs(x)) + 1/8*log(x^2+4) + C`) | sign-error | B is negative
- $\frac{1}{4}\ln|x| - \frac{1}{8}\ln|x+2| + C$ (expr `1/4*log(abs(x)) - 1/8*log(abs(x+2)) + C`) | pf-irreducible-misjudged | x² + 4 must stay intact
E: ∫ (−x/4)/(x² + 4) dx = −(1/4)(1/2) ln(x² + 4).
R latex: = \frac{1}{4}\ln|x| - \frac{1}{8}\ln(x^{2}+4) + C
FINAL: latex "\frac{1}{4}\ln|x| - \frac{1}{8}\ln(x^{2}+4) + C" · expr `1/4*log(abs(x)) - 1/8*log(x^2+4) + C` · check: antiderivative 1/(x*(x^2+4)) · recap: A/x + (Bx+C)/(x²+4) → A at x = 0 → B, C from the coefficients → the x-part of the quadratic term is a log.

## pf-s-08 · difficulty 2 · title "Complete the square"
S: text "Evaluate" · latex "\int \frac{x+2}{x^{2}+2x+5}\,dx"
### step 1 · check: none: discriminant and the right move
P: Does the denominator factor? What next?
* $b^{2} - 4ac = 4 - 20 < 0$: irreducible; complete the square: $(x+1)^{2} + 4$
- $b^{2} - 4ac = 4 - 20 < 0$: irreducible; write $\dfrac{A}{x+1} + \dfrac{B}{x+5}$ | pf-irreducible-misjudged | irreducible means no real linear factors
- $b^{2} - 4ac = 4 + 20 > 0$: it factors | pf-irreducible-misjudged | c = 5 gives 4 − 20
- Substitute $u = x^{2}+2x+5$ for the whole integrand | technique-wrong | du = (2x + 2) dx does not match x + 2
- Divide first | pf-improper-not-divided | degree 1 < degree 2
E: Negative discriminant: keep the quadratic, complete the square because b ≠ 0.
R latex: x^{2}+2x+5 = (x+1)^{2} + 4
### step 2 · check: identity (x+2)/(x^2+2*x+5) · var: x
P: With $u = x+1$ (so $x = u - 1$), rewrite the integrand.
* $\dfrac{u+1}{u^{2}+4}$ (expr `(x+2)/((x+1)^2+4)`)
- $\dfrac{u+2}{u^{2}+4}$ (expr `(x+3)/((x+1)^2+4)`) | algebra-error | x + 2 = (u − 1) + 2 = u + 1
- $\dfrac{u}{u^{2}+4}$ (expr `(x+1)/((x+1)^2+4)`) | algebra-error | dropped the constant part of the numerator
- $\dfrac{u+1}{u^{2}+5}$ (expr `(x+2)/((x+1)^2+5)`) | pf-square-not-completed | (x + 1)² + 4, since 5 − 1 = 4
- $\dfrac{u-1}{u^{2}+4}$ (expr `x/((x+1)^2+4)`) | sign-error | x + 2 = u + 1, not u − 1
E: x + 2 = (u − 1) + 2 = u + 1 and the denominator is u² + 4.
R latex: \int \frac{u+1}{u^{2}+4}\,du = \int \frac{u}{u^{2}+4}\,du + \int \frac{1}{u^{2}+4}\,du
### step 3 · check: antiderivative (u+1)/(u^2+4) · var: u
P: Integrate in $u$.
* $\frac{1}{2}\ln(u^{2}+4) + \frac{1}{2}\arctan\frac{u}{2} + C$ (expr `1/2*log(u^2+4) + 1/2*arctan(u/2) + C`)
- $\frac{1}{2}\ln(u^{2}+4) + \arctan\frac{u}{2} + C$ (expr `1/2*log(u^2+4) + arctan(u/2) + C`) | pf-arctan-missing-1-over-k | ∫ du/(u² + k²) = (1/k) arctan(u/k) with k = 2
- $\ln(u^{2}+4) + \frac{1}{2}\arctan\frac{u}{2} + C$ (expr `log(u^2+4) + 1/2*arctan(u/2) + C`) | du-constant-wrong | ∫ u/(u² + 4) du = (1/2) ln(u² + 4)
- $\frac{1}{2}\ln(u^{2}+4) + \frac{1}{2}\arctan u + C$ (expr `1/2*log(u^2+4) + 1/2*arctan(u) + C`) | pf-arctan-missing-1-over-k | the argument is u/k = u/2
- $\frac{1}{2}\arctan\frac{u}{2} + \frac{1}{2}\ln(u+2) + C$ (expr `1/2*arctan(u/2) + 1/2*log(u+2) + C`) | pf-ln-arctan-swapped | u/(u² + 4) is the log part; u² + 4 does not split as u + 2
E: u/(u² + 4) → (1/2) ln(u² + 4); 1/(u² + 4) → (1/2) arctan(u/2).
R latex: = \frac{1}{2}\ln(u^{2}+4) + \frac{1}{2}\arctan\frac{u}{2} + C
### step 4 · check: antiderivative (x+2)/(x^2+2*x+5)
P: Back-substitute $u = x + 1$.
* $\frac{1}{2}\ln(x^{2}+2x+5) + \frac{1}{2}\arctan\frac{x+1}{2} + C$ (expr `1/2*log(x^2+2*x+5) + 1/2*arctan((x+1)/2) + C`)
- $\frac{1}{2}\ln(x^{2}+2x+5) + \frac{1}{2}\arctan\frac{x}{2} + C$ (expr `1/2*log(x^2+2*x+5) + 1/2*arctan(x/2) + C`) | back-substitution-wrong | u = x + 1 inside the arctan too
- $\frac{1}{2}\ln\left((x+1)^{2}\right) + \frac{1}{2}\arctan\frac{x+1}{2} + C$ (expr `1/2*log((x+1)^2) + 1/2*arctan((x+1)/2) + C`) | back-substitution-wrong | u² + 4 = (x + 1)² + 4, the +4 was dropped
- $\frac{1}{2}\ln(x^{2}+2x+5) + \arctan(x+1) + C$ (expr `1/2*log(x^2+2*x+5) + arctan(x+1) + C`) | pf-arctan-missing-1-over-k | both the 1/2 and the /2 belong to k = 2
- $\frac{1}{2}\ln(x^{2}+2x+5) - \frac{1}{2}\arctan\frac{x+1}{2} + C$ (expr `1/2*log(x^2+2*x+5) - 1/2*arctan((x+1)/2) + C`) | sign-error | both parts are added
E: Replace u by x + 1 everywhere; u² + 4 is the original denominator.
R latex: = \frac{1}{2}\ln(x^{2}+2x+5) + \frac{1}{2}\arctan\frac{x+1}{2} + C
FINAL: latex "\frac{1}{2}\ln(x^{2}+2x+5) + \frac{1}{2}\arctan\frac{x+1}{2} + C" · expr `1/2*log(x^2+2*x+5) + 1/2*arctan((x+1)/2) + C` · check: antiderivative (x+2)/(x^2+2*x+5) · recap: Negative discriminant → complete the square (x+1)² + 4 → u = x + 1 splits the integrand into a log part and an arctan part → back-substitute.

## pf-s-09 · difficulty 1 · title "A definite integral"
S: text "Evaluate" · latex "\int_{2}^{4} \frac{dx}{x(x-1)}"
### step 1 · check: none: form
P: Which form?
* $\dfrac{A}{x} + \dfrac{B}{x-1}$
- $\dfrac{A}{x} + \dfrac{B}{(x-1)^{2}}$ | pf-missing-repeated-power | x − 1 is not squared
- $\dfrac{Ax+B}{x(x-1)}$ | pf-not-fully-factored | each factor gets its own term
- $\dfrac{A}{x^{2}-x}$ | pf-constant-over-quadratic | not a decomposition
- Long division first | pf-improper-not-divided | degree 0 < degree 2
E: Two distinct linear factors.
R latex: \frac{1}{x(x-1)} = \frac{A}{x} + \frac{B}{x-1}
### step 2 · check: value [-1, 1]
P: $1 = A(x-1) + Bx$. Find $A$ and $B$.
* $A = -1,\quad B = 1$ (expr `[-1, 1]`)
- $A = 1,\quad B = -1$ (expr `[1, -1]`) | sign-error | at x = 0: 1 = −A
- $A = 1,\quad B = 1$ (expr `[1, 1]`) | pf-coefficient-wrong | matched only the constant terms
- $A = -1,\quad B = -1$ (expr `[-1, -1]`) | pf-coefficient-wrong | at x = 1: 1 = B
- $A = -\frac{1}{2},\quad B = \frac{1}{2}$ (expr `[-1/2, 1/2]`) | arithmetic-error | no factor 2 appears here
E: x = 0 ⇒ 1 = −A; x = 1 ⇒ 1 = B.
R latex: \frac{1}{x(x-1)} = \frac{1}{x-1} - \frac{1}{x}
### step 3 · check: antiderivative 1/(x*(x-1)) · domain: [1.5, 3]
P: Find an antiderivative.
* $\ln|x-1| - \ln|x| + C$ (expr `log(abs(x-1)) - log(abs(x)) + C`)
- $\ln|x| - \ln|x-1| + C$ (expr `log(abs(x)) - log(abs(x-1)) + C`) | sign-error | A = −1 goes with 1/x
- $\ln|x-1| + \ln|x| + C$ (expr `log(abs(x-1)) + log(abs(x)) + C`) | pf-coefficient-wrong | A is negative
- $\ln|x^{2}-x| + C$ (expr `log(abs(x^2-x)) + C`) | ln-misapplied | that is the integral of (2x − 1)/(x² − x)
- $-\dfrac{1}{x-1} + \dfrac{1}{x} + C$ (expr `-1/(x-1) + 1/x + C`) | pf-power-term-as-ln | first-power factors give logs
E: ∫ dx/(x − 1) − ∫ dx/x.
R latex: F(x) = \ln|x-1| - \ln|x| = \ln\left|\frac{x-1}{x}\right|
### step 4 · check: value log(3/2)
P: Evaluate from 2 to 4.
* $\ln\frac{3}{2}$ (expr `log(3/2)`)
- $\ln\frac{3}{4}$ (expr `log(3/4)`) | ftc-not-subtracted | only F(4) = ln(3/4) was computed
- $-\ln\frac{3}{2}$ (expr `-log(3/2)`) | ftc-order-swapped | F(2) − F(4)
- $\ln 6$ (expr `log(6)`) | arithmetic-error | multiplied instead of dividing the two values
- $\ln\frac{1}{2}$ (expr `log(1/2)`) | ftc-not-subtracted | only F(2) = ln(1/2) was computed, with the wrong sign
E: F(4) − F(2) = ln(3/4) − ln(1/2) = ln(3/2).
R latex: = \ln\frac{3}{4} - \ln\frac{1}{2} = \ln\frac{3}{2}
FINAL: latex "\ln\frac{3}{2}" · expr `log(3/2)` · check: definite-integral 1/(x*(x-1)) [2, 4] · recap: Decompose 1/(x(x−1)) = 1/(x−1) − 1/x → antiderivative ln|(x−1)/x| → F(4) − F(2) = ln(3/2).
