import type { StepProblem } from '../types';

/** Step-Through problems for topic "partial-fractions" (session 3, Phase C). */
export const steps: StepProblem[] = [
  // ───────────────────────── pf-s-01: ∫ dx/(x² − 1) ─────────────────────────
  {
    id: 'pf-s-01',
    topic: 'partial-fractions',
    title: 'Two linear factors',
    difficulty: 1,
    statement: { text: 'Evaluate', latex: '\\int \\frac{dx}{x^{2}-1}' },
    domain: [1.5, 3],
    steps: [
      {
        prompt: 'What is the first thing to check?',
        options: [
          { text: 'Is it proper? Yes: $\\deg 1 < \\deg 2$ — so factor the denominator next' },
          {
            text: 'Divide first: $x^{2} - 1$ into $1$',
            mistake: 'pf-improper-not-divided',
            why: 'Long division is only needed for improper fractions, and this fraction is proper.',
          },
          {
            text: 'Write $\\dfrac{A}{x^{2}-1}$ and solve for $A$',
            mistake: 'pf-not-fully-factored',
            why: 'The denominator still factors, so it must be factored completely before writing the form.',
          },
          {
            text: 'Write $\\dfrac{Ax+B}{x^{2}-1}$ since the denominator is quadratic',
            mistake: 'pf-irreducible-misjudged',
            why: 'Treated x² − 1 as irreducible, but b² − 4ac = 4 > 0, so it factors.',
          },
          {
            text: 'Substitute $u = x^{2} - 1$',
            mistake: 'technique-wrong',
            why: 'The derivative du = 2x dx is not present in the integrand, so this substitution does not work.',
          },
        ],
        correct: 0,
        explanation: 'The fraction is proper (numerator degree 0 < 2), so the next step is factoring completely.',
        result: { text: 'Proper. Factor: $x^{2} - 1 = (x-1)(x+1)$' },
        check: { kind: 'none', reason: 'first move of the procedure' },
      },
      {
        prompt: 'Which decomposition form is right?',
        options: [
          { text: '$\\dfrac{A}{x-1} + \\dfrac{B}{x+1}$' },
          {
            text: '$\\dfrac{A}{x-1} + \\dfrac{Bx + C}{x+1}$',
            mistake: 'pf-linear-over-repeated-linear',
            why: 'Gave a linear factor a linear numerator; a linear factor takes a constant numerator.',
          },
          {
            text: '$\\dfrac{Ax + B}{(x-1)(x+1)}$',
            mistake: 'pf-not-fully-factored',
            why: 'Kept the product together instead of giving each factor its own term.',
          },
          {
            text: '$\\dfrac{A}{(x-1)(x+1)}$',
            mistake: 'pf-constant-over-quadratic',
            why: 'One constant over the whole product is not a decomposition at all.',
          },
          {
            text: '$\\dfrac{A}{x-1} + \\dfrac{B}{(x+1)^{2}}$',
            mistake: 'pf-missing-repeated-power',
            why: 'Squared the factor x + 1, which is not repeated here.',
          },
        ],
        correct: 0,
        explanation: 'Two distinct linear factors: one constant over each.',
        result: { latex: '\\frac{1}{(x-1)(x+1)} = \\frac{A}{x-1} + \\frac{B}{x+1}' },
        check: { kind: 'none', reason: 'decomposition form' },
      },
      {
        prompt: 'Multiply out: $1 = A(x+1) + B(x-1)$. Find $A$ and $B$.',
        options: [
          { latex: 'A = \\frac{1}{2},\\quad B = -\\frac{1}{2}', expr: '[1/2, -1/2]' },
          {
            latex: 'A = -\\frac{1}{2},\\quad B = \\frac{1}{2}',
            expr: '[-1/2, 1/2]',
            mistake: 'pf-coefficient-wrong',
            why: 'Plugged x = 1 into the wrong factor, which swaps the signs of A and B.',
          },
          {
            latex: 'A = 1,\\quad B = -1',
            expr: '[1, -1]',
            mistake: 'pf-coefficient-wrong',
            why: 'Forgot the factor 2 from x + 1 at x = 1, so A should be 1/2.',
          },
          {
            latex: 'A = \\frac{1}{2},\\quad B = \\frac{1}{2}',
            expr: '[1/2, 1/2]',
            mistake: 'sign-error',
            why: 'At x = −1 the equation 1 = −2B gives B = −1/2, not +1/2.',
          },
          {
            latex: 'A = 2,\\quad B = -2',
            expr: '[2, -2]',
            mistake: 'arithmetic-error',
            why: 'Divided the wrong way at x = 1: 1 = 2A gives A = 1/2, not 2.',
          },
        ],
        correct: 0,
        explanation: '$x = 1$ gives $1 = 2A$, so $A = \\frac{1}{2}$; $x = -1$ gives $1 = -2B$, so $B = -\\frac{1}{2}$.',
        result: { latex: '\\frac{1}{x^{2}-1} = \\frac{1/2}{x-1} - \\frac{1/2}{x+1}' },
        check: { kind: 'value', expected: '[1/2, -1/2]' },
      },
      {
        prompt: 'Integrate term by term.',
        domain: [1.5, 3],
        options: [
          {
            latex: '\\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C',
            expr: '1/2*log(abs(x-1)) - 1/2*log(abs(x+1)) + C',
          },
          {
            latex: '\\frac{1}{2}\\ln|x-1| + \\frac{1}{2}\\ln|x+1| + C',
            expr: '1/2*log(abs(x-1)) + 1/2*log(abs(x+1)) + C',
            mistake: 'sign-error',
            why: 'Lost the minus sign: B is negative, so the second log is subtracted.',
          },
          {
            latex: '\\ln|x-1| - \\ln|x+1| + C',
            expr: 'log(abs(x-1)) - log(abs(x+1)) + C',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the coefficients 1/2 in front of each logarithm.',
          },
          {
            latex: '\\frac{1}{2}\\ln|x^{2}-1| + C',
            expr: '1/2*log(abs(x^2-1)) + C',
            mistake: 'ln-misapplied',
            why: 'The integral of 1/(x² − 1) is not (1/2) ln|x² − 1|; that would need a numerator of x.',
          },
          {
            latex: '-\\frac{1}{2(x-1)} + \\frac{1}{2(x+1)} + C',
            expr: '-1/(2*(x-1)) + 1/(2*(x+1)) + C',
            mistake: 'pf-power-term-as-ln',
            why: 'Used the power rule on first-power factors, which integrate to logarithms.',
          },
        ],
        correct: 0,
        explanation: '$\\int \\frac{A}{x-1}\\,dx = A\\ln|x-1|$ and $\\int \\frac{B}{x+1}\\,dx = B\\ln|x+1|$.',
        result: { latex: '= \\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C' },
        check: { kind: 'antiderivative', integrand: '1/(x^2-1)' },
      },
    ],
    final: {
      latex: '\\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C',
      expr: '1/2*log(abs((x-1)/(x+1))) + C',
      check: { kind: 'antiderivative', integrand: '1/(x^2-1)' },
      recap:
        'Proper fraction → factor $(x-1)(x+1)$ → one constant over each factor → $A = \\frac{1}{2}$, $B = -\\frac{1}{2}$ by plugging in the roots → integrate each term to logs.',
    },
  },

  // ───────────────────────── pf-s-02: ∫ (5x − 3)/((x − 1)(x + 2)) dx ─────────────────────────
  {
    id: 'pf-s-02',
    topic: 'partial-fractions',
    title: 'Coefficients by plugging in roots',
    difficulty: 1,
    statement: { text: 'Evaluate', latex: '\\int \\frac{5x-3}{(x-1)(x+2)}\\,dx' },
    domain: [-1.5, 0.5],
    steps: [
      {
        prompt: 'The fraction is proper and already factored. Which form comes next?',
        options: [
          { text: '$\\dfrac{A}{x-1} + \\dfrac{B}{x+2}$' },
          {
            text: '$\\dfrac{Ax+B}{x-1} + \\dfrac{Cx+D}{x+2}$',
            mistake: 'pf-linear-over-repeated-linear',
            why: 'Gave linear numerators to linear factors, which take constant numerators.',
          },
          {
            text: '$\\dfrac{A}{(x-1)(x+2)}$',
            mistake: 'pf-constant-over-quadratic',
            why: 'One constant over the whole product cannot represent the fraction.',
          },
          {
            text: 'Long division first',
            mistake: 'pf-improper-not-divided',
            why: 'Divided although degree 1 < degree 2 means the fraction is already proper.',
          },
          {
            text: '$\\dfrac{A}{x-1} + \\dfrac{B}{x+2} + \\dfrac{C}{x^{2}+x-2}$',
            mistake: 'pf-missing-repeated-power',
            why: 'Added an extra term for the quadratic, which is just the product of the two factors.',
          },
        ],
        correct: 0,
        explanation: 'Two distinct linear factors, one constant each.',
        result: { latex: '\\frac{5x-3}{(x-1)(x+2)} = \\frac{A}{x-1} + \\frac{B}{x+2}' },
        check: { kind: 'none', reason: 'decomposition form' },
      },
      {
        prompt: 'Multiply out: $5x - 3 = A(x+2) + B(x-1)$. Plug in $x = 1$. What is $A$?',
        options: [
          { latex: '\\frac{2}{3}', expr: '2/3' },
          {
            latex: '2',
            expr: '2',
            mistake: 'pf-coefficient-wrong',
            why: 'Forgot to divide by x + 2 = 3 after plugging in x = 1.',
          },
          {
            latex: '-\\frac{2}{3}',
            expr: '-2/3',
            mistake: 'sign-error',
            why: 'Made a sign slip in 5 − 3, which is +2.',
          },
          {
            latex: '\\frac{13}{3}',
            expr: '13/3',
            mistake: 'pf-coefficient-wrong',
            why: 'Plugged in x = −2 instead, which gives B (with the wrong sign), not A.',
          },
          {
            latex: '\\frac{8}{3}',
            expr: '8/3',
            mistake: 'arithmetic-error',
            why: 'Computed 5 + 3 instead of 5 − 3 on the left side.',
          },
        ],
        correct: 0,
        explanation: 'At $x = 1$: $5 - 3 = 3A$, so $A = \\frac{2}{3}$.',
        result: { latex: 'A = \\frac{2}{3}' },
        check: { kind: 'value', expected: '2/3' },
      },
      {
        prompt: 'Plug in $x = -2$. What is $B$?',
        options: [
          { latex: '\\frac{13}{3}', expr: '13/3' },
          {
            latex: '-\\frac{13}{3}',
            expr: '-13/3',
            mistake: 'sign-error',
            why: 'At x = −2 the equation −13 = −3B gives B = +13/3; the sign was lost.',
          },
          {
            latex: '\\frac{7}{3}',
            expr: '7/3',
            mistake: 'arithmetic-error',
            why: 'Computed 5(−2) + 3 instead of 5(−2) − 3 on the left side.',
          },
          {
            latex: '13',
            expr: '13',
            mistake: 'pf-coefficient-wrong',
            why: 'Forgot to divide by x − 1 = −3 after plugging in x = −2.',
          },
          {
            latex: '\\frac{2}{3}',
            expr: '2/3',
            mistake: 'pf-coefficient-wrong',
            why: 'Reused the value of A instead of solving for B.',
          },
        ],
        correct: 0,
        explanation: 'At $x = -2$: $-10 - 3 = -3B$, so $B = \\frac{13}{3}$.',
        result: { latex: '\\frac{5x-3}{(x-1)(x+2)} = \\frac{2/3}{x-1} + \\frac{13/3}{x+2}' },
        check: { kind: 'value', expected: '13/3' },
      },
      {
        prompt: 'Integrate.',
        domain: [-1.5, 0.5],
        options: [
          {
            latex: '\\frac{2}{3}\\ln|x-1| + \\frac{13}{3}\\ln|x+2| + C',
            expr: '2/3*log(abs(x-1)) + 13/3*log(abs(x+2)) + C',
          },
          {
            latex: '\\frac{2}{3}\\ln|x-1| - \\frac{13}{3}\\ln|x+2| + C',
            expr: '2/3*log(abs(x-1)) - 13/3*log(abs(x+2)) + C',
            mistake: 'sign-error',
            why: 'Subtracted the second log, but B = 13/3 is positive.',
          },
          {
            latex: '\\frac{2}{3}\\ln(x-1) + \\frac{13}{3}\\ln(x+2) + C',
            expr: '2/3*log(x-1) + 13/3*log(x+2) + C',
            mistake: 'abs-dropped',
            why: 'Left out the absolute values; the logarithms need |x − 1| and |x + 2|.',
          },
          {
            latex: '\\frac{3}{2}\\ln|x-1| + \\frac{3}{13}\\ln|x+2| + C',
            expr: '3/2*log(abs(x-1)) + 3/13*log(abs(x+2)) + C',
            mistake: 'pf-coefficient-wrong',
            why: 'Inverted the coefficients, writing 3/2 and 3/13 instead of 2/3 and 13/3.',
          },
          {
            latex: '-\\frac{2}{3(x-1)} - \\frac{13}{3(x+2)} + C',
            expr: '-2/(3*(x-1)) - 13/(3*(x+2)) + C',
            mistake: 'pf-power-term-as-ln',
            why: 'Used the power rule instead of the logarithm on first-power factors.',
          },
        ],
        correct: 0,
        explanation: 'Each $\\frac{A}{x-a}$ term integrates to $A\\ln|x-a|$.',
        result: { latex: '= \\frac{2}{3}\\ln|x-1| + \\frac{13}{3}\\ln|x+2| + C' },
        check: { kind: 'antiderivative', integrand: '(5*x-3)/((x-1)*(x+2))' },
      },
    ],
    final: {
      latex: '\\frac{2}{3}\\ln|x-1| + \\frac{13}{3}\\ln|x+2| + C',
      expr: '2/3*log(abs(x-1)) + 13/3*log(abs(x+2)) + C',
      check: { kind: 'antiderivative', integrand: '(5*x-3)/((x-1)*(x+2))' },
      recap:
        'Proper and factored → $\\frac{A}{x-1} + \\frac{B}{x+2}$ → plug in the roots $x = 1$ and $x = -2$ → integrate each term to a log.',
    },
  },

  // ───────────────────────── pf-s-03: ∫ (3 − x²)/((x − 1)(x² + 1)) dx ─────────────────────────
  {
    id: 'pf-s-03',
    topic: 'partial-fractions',
    title: 'The class example',
    difficulty: 2,
    statement: { text: 'Evaluate', latex: '\\int \\frac{3-x^{2}}{(x-1)(x^{2}+1)}\\,dx' },
    domain: [1.5, 3],
    steps: [
      {
        prompt: 'Is $x^{2}+1$ irreducible, and what does that mean for the form?',
        options: [
          { text: '$b^{2} - 4ac = -4 < 0$: irreducible, so it gets a linear numerator $Bx + C$' },
          {
            text: '$b^{2} - 4ac = -4 < 0$: irreducible, so it gets a constant numerator $B$',
            mistake: 'pf-constant-over-quadratic',
            why: 'An irreducible quadratic needs a linear numerator Ax + B, not a constant.',
          },
          {
            text: '$x^{2} + 1 = (x+1)^{2}$, a repeated linear factor',
            mistake: 'pf-irreducible-misjudged',
            why: 'Expanded wrongly: (x + 1)² = x² + 2x + 1, not x² + 1.',
          },
          {
            text: '$x^{2} + 1 = (x-1)(x+1)$, two linear factors',
            mistake: 'pf-irreducible-misjudged',
            why: 'That product equals x² − 1, not x² + 1.',
          },
          {
            text: '$b^{2} - 4ac = 4 > 0$: it factors',
            mistake: 'pf-irreducible-misjudged',
            why: 'Miscomputed the discriminant: b = 0 and c = 1 give −4, not 4.',
          },
        ],
        correct: 0,
        explanation: 'The discriminant is negative, so the quadratic stays and takes a linear numerator.',
        result: { latex: '\\frac{3-x^{2}}{(x-1)(x^{2}+1)} = \\frac{A}{x-1} + \\frac{Bx+C}{x^{2}+1}' },
        check: { kind: 'none', reason: 'irreducibility check' },
      },
      {
        prompt: 'Multiply out: $3 - x^{2} = A(x^{2}+1) + (Bx+C)(x-1)$. Plug in $x = 1$. What is $A$?',
        options: [
          { latex: '1', expr: '1' },
          {
            latex: '2',
            expr: '2',
            mistake: 'pf-coefficient-wrong',
            why: 'Forgot to divide by x² + 1 = 2 after plugging in x = 1.',
          },
          {
            latex: '-1',
            expr: '-1',
            mistake: 'sign-error',
            why: 'Made a sign slip in 3 − 1, which is +2, so A = +1.',
          },
          {
            latex: '\\frac{1}{2}',
            expr: '1/2',
            mistake: 'arithmetic-error',
            why: 'Divided 1 by 2 instead of 2 by 2.',
          },
          {
            latex: '3',
            expr: '3',
            mistake: 'pf-coefficient-wrong',
            why: 'Plugged in x = 0 instead of x = 1; that equation involves C as well.',
          },
        ],
        correct: 0,
        explanation: 'At $x = 1$: $3 - 1 = 2A$, so $A = 1$.',
        result: { latex: 'A = 1' },
        check: { kind: 'value', expected: '1' },
      },
      {
        prompt: 'Now plug in $x = 0$, then compare the $x^{2}$ coefficients. What are $C$ and $B$?',
        options: [
          { latex: 'C = -2,\\quad B = -2', expr: '[-2, -2]' },
          {
            latex: 'C = 2,\\quad B = -2',
            expr: '[2, -2]',
            mistake: 'sign-error',
            why: 'At x = 0 the equation 3 = A − C gives C = −2, not 2.',
          },
          {
            latex: 'C = -2,\\quad B = 2',
            expr: '[-2, 2]',
            mistake: 'pf-coefficient-wrong',
            why: 'The x² coefficient gives −1 = A + B, so B = −2, not 2.',
          },
          {
            latex: 'C = -3,\\quad B = -1',
            expr: '[-3, -1]',
            mistake: 'pf-coefficient-wrong',
            why: 'Forgot the A(x² + 1) contribution at x = 0, which is A = 1.',
          },
          {
            latex: 'C = -2,\\quad B = 0',
            expr: '[-2, 0]',
            mistake: 'pf-coefficient-wrong',
            why: 'Compared the x coefficients only, which say C − B = 0 and so give B = C.',
          },
        ],
        correct: 0,
        explanation: '$x = 0$: $3 = A - C \\Rightarrow C = -2$. The $x^{2}$ terms: $-1 = A + B \\Rightarrow B = -2$.',
        result: { latex: '\\frac{3-x^{2}}{(x-1)(x^{2}+1)} = \\frac{1}{x-1} - \\frac{2x+2}{x^{2}+1}' },
        check: { kind: 'value', expected: '[-2, -2]' },
      },
      {
        prompt: 'How do you integrate $\\dfrac{2x+2}{x^{2}+1}$?',
        options: [
          { text: 'Split: $\\dfrac{2x}{x^{2}+1}$ with $u = x^{2}+1$, and $\\dfrac{2}{x^{2}+1}$ as an arctan' },
          {
            text: '$u = x^{2} + 1$ for the whole term: $\\ln(x^{2}+1)$',
            mistake: 'pf-ln-arctan-swapped',
            why: 'The constant part 2/(x² + 1) is not a multiple of du, so it gives an arctan, not a log.',
          },
          {
            text: '$x = \\tan\\theta$ for the whole term',
            mistake: 'pf-ln-arctan-swapped',
            why: 'The 2x part is a simple u-substitution; only the constant part needs an arctan.',
          },
          {
            text: 'Complete the square first',
            mistake: 'pf-square-not-completed',
            why: 'There is no x term, so x² + 1 is already a sum of squares.',
          },
          {
            text: 'Partial fractions again: $\\dfrac{A}{x+i} + \\dfrac{B}{x-i}$',
            mistake: 'pf-irreducible-misjudged',
            why: 'Tried to factor an irreducible quadratic; the course keeps irreducible quadratics intact.',
          },
        ],
        correct: 0,
        explanation: '$\\frac{Ax+B}{x^{2}+k^{2}}$ splits into an $x$-part ($u = x^{2}+k^{2}$) and a constant part (arctan).',
        result: { latex: '\\frac{2x+2}{x^{2}+1} = \\frac{2x}{x^{2}+1} + \\frac{2}{x^{2}+1}' },
        check: { kind: 'none', reason: 'how to split the quadratic term' },
      },
      {
        prompt: 'Integrate everything.',
        domain: [1.5, 3],
        options: [
          {
            latex: '\\ln|x-1| - \\ln(x^{2}+1) - 2\\arctan x + C',
            expr: 'log(abs(x-1)) - log(x^2+1) - 2*arctan(x) + C',
          },
          {
            latex: '\\ln|x-1| - \\ln(x^{2}+1) + 2\\arctan x + C',
            expr: 'log(abs(x-1)) - log(x^2+1) + 2*arctan(x) + C',
            mistake: 'sign-error',
            why: 'The whole quadratic term carries a minus sign, including its arctan part.',
          },
          {
            latex: '\\ln|x-1| - 2\\ln(x^{2}+1) - 2\\arctan x + C',
            expr: 'log(abs(x-1)) - 2*log(x^2+1) - 2*arctan(x) + C',
            mistake: 'du-constant-wrong',
            why: 'The integral of 2x/(x² + 1) is ln(x² + 1) with no extra factor 2.',
          },
          {
            latex: '\\ln|x-1| - \\ln(x^{2}+1) - \\arctan x + C',
            expr: 'log(abs(x-1)) - log(x^2+1) - arctan(x) + C',
            mistake: 'arithmetic-error',
            why: 'The constant part is 2/(x² + 1), which gives 2 arctan x, not arctan x.',
          },
          {
            latex: '\\ln|x-1| - \\ln(x^{2}+1) - 2\\arctan(2x) + C',
            expr: 'log(abs(x-1)) - log(x^2+1) - 2*arctan(2*x) + C',
            mistake: 'pf-arctan-missing-1-over-k',
            why: 'Here k = 1, so the argument of the arctan is x, not 2x.',
          },
        ],
        correct: 0,
        explanation:
          '$\\int \\frac{dx}{x-1} = \\ln|x-1|$; $\\int \\frac{2x}{x^{2}+1}\\,dx = \\ln(x^{2}+1)$; $\\int \\frac{2}{x^{2}+1}\\,dx = 2\\arctan x$; the last two carry the minus sign.',
        result: { latex: '= \\ln|x-1| - \\ln(x^{2}+1) - 2\\arctan x + C' },
        check: { kind: 'antiderivative', integrand: '(3-x^2)/((x-1)*(x^2+1))' },
      },
    ],
    final: {
      latex: '\\ln|x-1| - \\ln(x^{2}+1) - 2\\arctan x + C',
      expr: 'log(abs(x-1)) - log(x^2+1) - 2*arctan(x) + C',
      check: { kind: 'antiderivative', integrand: '(3-x^2)/((x-1)*(x^2+1))' },
      recap:
        'Check the discriminant → $\\frac{A}{x-1} + \\frac{Bx+C}{x^{2}+1}$ → $A = 1$ at $x = 1$, $C = -2$ at $x = 0$, $B = -2$ from the $x^{2}$ coefficient → split the quadratic term into a ln part and an arctan part.',
    },
  },

  // ───────────────────────── pf-s-04: ∫ x³/(x² + 1) dx ─────────────────────────
  {
    id: 'pf-s-04',
    topic: 'partial-fractions',
    title: 'Improper fraction: divide first',
    difficulty: 2,
    statement: { text: 'Evaluate', latex: '\\int \\frac{x^{3}}{x^{2}+1}\\,dx' },
    steps: [
      {
        prompt: 'First step?',
        options: [
          { text: 'Improper ($\\deg 3 \\ge \\deg 2$): do long division first' },
          {
            text: 'Proper: write $\\dfrac{Ax+B}{x^{2}+1}$',
            mistake: 'pf-improper-not-divided',
            why: 'Treated the fraction as proper, but the numerator degree is not smaller than the denominator degree.',
          },
          {
            text: 'Factor $x^{2} + 1$',
            mistake: 'pf-irreducible-misjudged',
            why: 'Tried to factor x² + 1, which is irreducible over the reals.',
          },
          {
            text: 'Substitute $u = x^{2} + 1$ directly',
            mistake: 'technique-wrong',
            why: 'x³ dx is not a multiple of du = 2x dx without first dividing.',
          },
          {
            text: 'Write $\\dfrac{A}{x^{2}+1} + \\dfrac{Bx}{x^{2}+1}$',
            mistake: 'pf-improper-not-divided',
            why: 'This is still a decomposition of an improper fraction; long division comes first.',
          },
        ],
        correct: 0,
        explanation: 'Degree 3 ≥ degree 2 means improper; divide before anything else.',
        result: { text: 'Improper: long division first' },
        check: { kind: 'none', reason: 'proper/improper decision' },
      },
      {
        prompt: 'Divide: $\\dfrac{x^{3}}{x^{2}+1} = ?$',
        variable: 'x',
        options: [
          { latex: 'x - \\dfrac{x}{x^{2}+1}', expr: 'x - x/(x^2+1)' },
          {
            latex: 'x + \\dfrac{x}{x^{2}+1}',
            expr: 'x + x/(x^2+1)',
            mistake: 'sign-error',
            why: 'Lost the sign of the remainder: x³ − x(x² + 1) = −x.',
          },
          {
            latex: 'x - \\dfrac{1}{x^{2}+1}',
            expr: 'x - 1/(x^2+1)',
            mistake: 'pf-division-wrong',
            why: 'The remainder is −x, not −1.',
          },
          {
            latex: 'x^{2} - \\dfrac{x}{x^{2}+1}',
            expr: 'x^2 - x/(x^2+1)',
            mistake: 'pf-division-wrong',
            why: 'The quotient is x, not x².',
          },
          {
            latex: 'x - \\dfrac{x}{x^{2}}',
            expr: 'x - x/x^2',
            mistake: 'pf-division-wrong',
            why: 'The remainder stays over the whole divisor x² + 1, not just x².',
          },
        ],
        correct: 0,
        explanation: '$x^{3} = x(x^{2}+1) - x$, so the quotient is $x$ and the remainder $-x$.',
        result: { latex: '\\frac{x^{3}}{x^{2}+1} = x - \\frac{x}{x^{2}+1}' },
        check: { kind: 'identity', lhs: 'x^3/(x^2+1)' },
      },
      {
        prompt: 'How do you integrate $\\dfrac{x}{x^{2}+1}$?',
        options: [
          { text: '$u = x^{2}+1$, $du = 2x\\,dx$: it becomes $\\frac{1}{2}\\int \\frac{du}{u}$' },
          {
            text: '$x = \\tan\\theta$',
            mistake: 'pf-ln-arctan-swapped',
            why: 'The x on top makes this a u-substitution (a log), not an arctan.',
          },
          {
            text: 'Partial fractions over $x^{2}+1$',
            mistake: 'pf-constant-over-quadratic',
            why: 'The term is already a single irreducible piece, so there is nothing to decompose.',
          },
          {
            text: '$u = x$',
            mistake: 'u-choice-wrong',
            why: 'This substitution changes nothing about the integral.',
          },
          {
            text: 'Power rule: $\\dfrac{x^{2}/2}{x^{3}/3 + x}$',
            mistake: 'ln-misapplied',
            why: 'There is no quotient rule for integrals; the numerator and denominator cannot be integrated separately.',
          },
        ],
        correct: 0,
        explanation: 'The numerator is $\\frac{1}{2}$ of the derivative of the denominator.',
        result: { latex: '\\int \\frac{x}{x^{2}+1}\\,dx = \\frac{1}{2}\\ln(x^{2}+1)' },
        check: { kind: 'none', reason: 'substitution choice' },
      },
      {
        prompt: 'Put it together.',
        options: [
          {
            latex: '\\frac{x^{2}}{2} - \\frac{1}{2}\\ln(x^{2}+1) + C',
            expr: 'x^2/2 - 1/2*log(x^2+1) + C',
          },
          {
            latex: '\\frac{x^{2}}{2} + \\frac{1}{2}\\ln(x^{2}+1) + C',
            expr: 'x^2/2 + 1/2*log(x^2+1) + C',
            mistake: 'sign-error',
            why: 'The remainder term is subtracted, so the log carries a minus sign.',
          },
          {
            latex: '\\frac{x^{2}}{2} - \\ln(x^{2}+1) + C',
            expr: 'x^2/2 - log(x^2+1) + C',
            mistake: 'du-constant-wrong',
            why: 'Forgot the factor 1/2 that comes from du = 2x dx.',
          },
          {
            latex: 'x^{2} - \\frac{1}{2}\\ln(x^{2}+1) + C',
            expr: 'x^2 - 1/2*log(x^2+1) + C',
            mistake: 'power-rule-int-coefficient',
            why: 'The integral of x dx is x²/2, so the division by 2 was skipped.',
          },
          {
            latex: '\\frac{x^{2}}{2} - \\frac{1}{2}\\arctan x + C',
            expr: 'x^2/2 - 1/2*arctan(x) + C',
            mistake: 'pf-ln-arctan-swapped',
            why: 'The integral of x/(x² + 1) is a log, not an arctan.',
          },
        ],
        correct: 0,
        explanation: '$\\int x\\,dx = \\frac{x^{2}}{2}$ and $\\int \\frac{x}{x^{2}+1}\\,dx = \\frac{1}{2}\\ln(x^{2}+1)$.',
        result: { latex: '= \\frac{x^{2}}{2} - \\frac{1}{2}\\ln(x^{2}+1) + C' },
        check: { kind: 'antiderivative', integrand: 'x^3/(x^2+1)' },
      },
    ],
    final: {
      latex: '\\frac{x^{2}}{2} - \\frac{1}{2}\\ln(x^{2}+1) + C',
      expr: 'x^2/2 - 1/2*log(x^2+1) + C',
      check: { kind: 'antiderivative', integrand: 'x^3/(x^2+1)' },
      recap:
        'Improper → long division gives $x - \\frac{x}{x^{2}+1}$ → the remainder term is a u-substitution → $\\frac{x^{2}}{2} - \\frac{1}{2}\\ln(x^{2}+1) + C$.',
    },
  },

  // ───────────────────────── pf-s-05: ∫ (2x + 3)/(x + 1)² dx ─────────────────────────
  {
    id: 'pf-s-05',
    topic: 'partial-fractions',
    title: 'Repeated linear factor',
    difficulty: 2,
    statement: { text: 'Evaluate', latex: '\\int \\frac{2x+3}{(x+1)^{2}}\\,dx' },
    steps: [
      {
        prompt: 'Which form fits a repeated linear factor?',
        options: [
          { text: '$\\dfrac{A}{x+1} + \\dfrac{B}{(x+1)^{2}}$' },
          {
            text: '$\\dfrac{A}{(x+1)^{2}}$',
            mistake: 'pf-missing-repeated-power',
            why: 'A repeated factor needs one term for EACH power, including the first.',
          },
          {
            text: '$\\dfrac{Ax+B}{(x+1)^{2}}$',
            mistake: 'pf-linear-over-repeated-linear',
            why: 'Repeated linear factors take constants, one per power, not a linear numerator.',
          },
          {
            text: '$\\dfrac{A}{x+1} + \\dfrac{B}{x+1}$',
            mistake: 'pf-missing-repeated-power',
            why: 'The second term must be over (x + 1)², not over x + 1 again.',
          },
          {
            text: '$\\dfrac{A}{x+1} + \\dfrac{Bx+C}{(x+1)^{2}}$',
            mistake: 'pf-linear-over-repeated-linear',
            why: 'The numerators over powers of a linear factor are constants, not linear.',
          },
        ],
        correct: 0,
        explanation: '$(ax+b)^{2}$ gets $\\frac{A}{ax+b} + \\frac{B}{(ax+b)^{2}}$.',
        result: { latex: '\\frac{2x+3}{(x+1)^{2}} = \\frac{A}{x+1} + \\frac{B}{(x+1)^{2}}' },
        check: { kind: 'none', reason: 'decomposition form' },
      },
      {
        prompt: 'Multiply out: $2x + 3 = A(x+1) + B$. Find $A$ and $B$.',
        options: [
          { latex: 'A = 2,\\quad B = 1', expr: '[2, 1]' },
          {
            latex: 'A = 2,\\quad B = 3',
            expr: '[2, 3]',
            mistake: 'pf-coefficient-wrong',
            why: 'At x = −1 the equation −2 + 3 = B gives B = 1, not 3.',
          },
          {
            latex: 'A = 1,\\quad B = 2',
            expr: '[1, 2]',
            mistake: 'pf-coefficient-wrong',
            why: 'Swapped the roles of A and B: the x coefficient gives A = 2.',
          },
          {
            latex: 'A = 2,\\quad B = -1',
            expr: '[2, -1]',
            mistake: 'sign-error',
            why: 'Made a sign slip: 2(−1) + 3 = +1, so B = 1.',
          },
          {
            latex: 'A = 3,\\quad B = 2',
            expr: '[3, 2]',
            mistake: 'pf-coefficient-wrong',
            why: 'Read off the constants from 2x + 3 without multiplying out.',
          },
        ],
        correct: 0,
        explanation: '$x = -1$ gives $B = 1$; the $x$ coefficient gives $A = 2$.',
        result: { latex: '\\frac{2x+3}{(x+1)^{2}} = \\frac{2}{x+1} + \\frac{1}{(x+1)^{2}}' },
        check: { kind: 'value', expected: '[2, 1]' },
      },
      {
        prompt: 'Integrate.',
        options: [
          {
            latex: '2\\ln|x+1| - \\dfrac{1}{x+1} + C',
            expr: '2*log(abs(x+1)) - 1/(x+1) + C',
          },
          {
            latex: '2\\ln|x+1| + \\dfrac{1}{x+1} + C',
            expr: '2*log(abs(x+1)) + 1/(x+1) + C',
            mistake: 'sign-error',
            why: 'The integral of (x + 1)^(−2) is −(x + 1)^(−1); the minus sign was lost.',
          },
          {
            latex: '2\\ln|x+1| + \\ln|x+1|^{2} + C',
            expr: '2*log(abs(x+1)) + log(abs(x+1))^2 + C',
            mistake: 'pf-power-term-as-ln',
            why: 'The squared factor integrates by the power rule, not as a logarithm.',
          },
          {
            latex: '2\\ln|x+1| - \\dfrac{1}{2(x+1)^{2}} + C',
            expr: '2*log(abs(x+1)) - 1/(2*(x+1)^2) + C',
            mistake: 'power-rule-int-exponent',
            why: 'The integral of (x + 1)^(−2) is −(x + 1)^(−1), not −(x + 1)^(−2)/2.',
          },
          {
            latex: '\\ln|x+1| - \\dfrac{1}{x+1} + C',
            expr: 'log(abs(x+1)) - 1/(x+1) + C',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the coefficient of the log term: A = 2, not 1.',
          },
        ],
        correct: 0,
        explanation: '$\\frac{A}{x+1} \\to A\\ln|x+1|$; $\\frac{B}{(x+1)^{2}} \\to -\\frac{B}{x+1}$.',
        result: { latex: '= 2\\ln|x+1| - \\frac{1}{x+1} + C' },
        check: { kind: 'antiderivative', integrand: '(2*x+3)/(x+1)^2' },
      },
    ],
    final: {
      latex: '2\\ln|x+1| - \\frac{1}{x+1} + C',
      expr: '2*log(abs(x+1)) - 1/(x+1) + C',
      check: { kind: 'antiderivative', integrand: '(2*x+3)/(x+1)^2' },
      recap:
        'Repeated linear factor → one constant per power → $B$ from $x = -1$, $A$ from the $x$ coefficient → log for the first power, power rule for the square.',
    },
  },

  // ───────────────────────── pf-s-06: ∫ (x + 4)/(x² + 2x) dx ─────────────────────────
  {
    id: 'pf-s-06',
    topic: 'partial-fractions',
    title: 'Factor the denominator first',
    difficulty: 1,
    statement: { text: 'Evaluate', latex: '\\int \\frac{x+4}{x^{2}+2x}\\,dx' },
    steps: [
      {
        prompt: 'The fraction is proper. What next?',
        options: [
          { text: 'Factor completely: $x^{2} + 2x = x(x+2)$' },
          {
            text: 'Complete the square: $(x+1)^{2} - 1$',
            mistake: 'pf-square-not-completed',
            why: 'Completing the square is for irreducible quadratics; this one factors.',
          },
          {
            text: 'Write $\\dfrac{Ax+B}{x^{2}+2x}$',
            mistake: 'pf-not-fully-factored',
            why: 'The denominator factors into linear pieces, so it must be factored first.',
          },
          {
            text: 'Divide first',
            mistake: 'pf-improper-not-divided',
            why: 'Divided although degree 1 < degree 2 means the fraction is proper.',
          },
          {
            text: 'Substitute $u = x^{2} + 2x$',
            mistake: 'technique-wrong',
            why: 'The derivative du = (2x + 2) dx does not match the numerator x + 4.',
          },
        ],
        correct: 0,
        explanation: 'Always factor the denominator completely before writing the form.',
        result: { latex: '\\frac{x+4}{x(x+2)}' },
        check: { kind: 'none', reason: 'factoring' },
      },
      {
        prompt: 'Which form?',
        options: [
          { text: '$\\dfrac{A}{x} + \\dfrac{B}{x+2}$' },
          {
            text: '$\\dfrac{A}{x} + \\dfrac{B}{(x+2)^{2}}$',
            mistake: 'pf-missing-repeated-power',
            why: 'Squared the factor x + 2, which is not repeated.',
          },
          {
            text: '$\\dfrac{Ax+B}{x(x+2)}$',
            mistake: 'pf-not-fully-factored',
            why: 'Kept the product together instead of giving each factor its own term.',
          },
          {
            text: '$\\dfrac{A}{x(x+2)}$',
            mistake: 'pf-constant-over-quadratic',
            why: 'One constant over the whole product is not a decomposition.',
          },
          {
            text: '$\\dfrac{Ax + B}{x} + \\dfrac{C}{x+2}$',
            mistake: 'pf-linear-over-repeated-linear',
            why: 'Gave a linear factor a linear numerator; linear factors take constants.',
          },
        ],
        correct: 0,
        explanation: 'Two distinct linear factors.',
        result: { latex: '\\frac{x+4}{x(x+2)} = \\frac{A}{x} + \\frac{B}{x+2}' },
        check: { kind: 'none', reason: 'decomposition form' },
      },
      {
        prompt: '$x + 4 = A(x+2) + Bx$. Find $A$ and $B$.',
        options: [
          { latex: 'A = 2,\\quad B = -1', expr: '[2, -1]' },
          {
            latex: 'A = 2,\\quad B = 1',
            expr: '[2, 1]',
            mistake: 'sign-error',
            why: 'At x = −2 the equation 2 = −2B gives B = −1, not +1.',
          },
          {
            latex: 'A = 4,\\quad B = -1',
            expr: '[4, -1]',
            mistake: 'pf-coefficient-wrong',
            why: 'At x = 0 the equation 4 = 2A gives A = 2; the factor 2 was ignored.',
          },
          {
            latex: 'A = -1,\\quad B = 2',
            expr: '[-1, 2]',
            mistake: 'pf-coefficient-wrong',
            why: 'Swapped A and B.',
          },
          {
            latex: 'A = 1,\\quad B = 1',
            expr: '[1, 1]',
            mistake: 'pf-coefficient-wrong',
            why: 'Matched the x coefficients only (1 = A + B) and guessed the split.',
          },
        ],
        correct: 0,
        explanation: '$x = 0$: $4 = 2A \\Rightarrow A = 2$. $x = -2$: $2 = -2B \\Rightarrow B = -1$.',
        result: { latex: '\\frac{x+4}{x(x+2)} = \\frac{2}{x} - \\frac{1}{x+2}' },
        check: { kind: 'value', expected: '[2, -1]' },
      },
      {
        prompt: 'Integrate.',
        options: [
          {
            latex: '2\\ln|x| - \\ln|x+2| + C',
            expr: '2*log(abs(x)) - log(abs(x+2)) + C',
          },
          {
            latex: '2\\ln|x| + \\ln|x+2| + C',
            expr: '2*log(abs(x)) + log(abs(x+2)) + C',
            mistake: 'sign-error',
            why: 'Lost the minus sign: B = −1, so the second log is subtracted.',
          },
          {
            latex: '\\ln|x| - \\ln|x+2| + C',
            expr: 'log(abs(x)) - log(abs(x+2)) + C',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the coefficient of the first log: A = 2, not 1.',
          },
          {
            latex: '2\\ln|x| - \\dfrac{1}{2}\\ln|x+2| + C',
            expr: '2*log(abs(x)) - 1/2*log(abs(x+2)) + C',
            mistake: 'pf-missing-1-over-a',
            why: 'Added a 1/a factor that does not belong: the coefficient of x in x + 2 is 1.',
          },
          {
            latex: '\\ln|x^{2}+2x| + C',
            expr: 'log(abs(x^2+2*x)) + C',
            mistake: 'ln-misapplied',
            why: 'That is the integral of (2x + 2)/(x² + 2x), not of (x + 4)/(x² + 2x).',
          },
        ],
        correct: 0,
        explanation: 'Each term is a log with its coefficient.',
        result: { latex: '= 2\\ln|x| - \\ln|x+2| + C' },
        check: { kind: 'antiderivative', integrand: '(x+4)/(x^2+2*x)' },
      },
    ],
    final: {
      latex: '2\\ln|x| - \\ln|x+2| + C',
      expr: '2*log(abs(x)) - log(abs(x+2)) + C',
      check: { kind: 'antiderivative', integrand: '(x+4)/(x^2+2*x)' },
      recap: 'Factor $x(x+2)$ → $\\frac{A}{x} + \\frac{B}{x+2}$ → plug in $0$ and $-2$ → $2\\ln|x| - \\ln|x+2| + C$.',
    },
  },

  // ───────────────────────── pf-s-07: ∫ dx/(x(x² + 4)) ─────────────────────────
  {
    id: 'pf-s-07',
    topic: 'partial-fractions',
    title: 'Linear times irreducible quadratic',
    difficulty: 2,
    statement: { text: 'Evaluate', latex: '\\int \\frac{dx}{x(x^{2}+4)}' },
    steps: [
      {
        prompt: 'Which form?',
        options: [
          { text: '$\\dfrac{A}{x} + \\dfrac{Bx+C}{x^{2}+4}$' },
          {
            text: '$\\dfrac{A}{x} + \\dfrac{B}{x^{2}+4}$',
            mistake: 'pf-constant-over-quadratic',
            why: 'An irreducible quadratic needs a linear numerator Bx + C, not a constant.',
          },
          {
            text: '$\\dfrac{A}{x} + \\dfrac{B}{x-2} + \\dfrac{C}{x+2}$',
            mistake: 'pf-irreducible-misjudged',
            why: 'Factored x² + 4 into real linear factors, but it does not factor (b² − 4ac = −16).',
          },
          {
            text: '$\\dfrac{A}{x} + \\dfrac{B}{x+2} + \\dfrac{C}{(x+2)^{2}}$',
            mistake: 'pf-irreducible-misjudged',
            why: 'Treated x² + 4 as (x + 2)², but (x + 2)² = x² + 4x + 4.',
          },
          {
            text: '$\\dfrac{Ax+B}{x(x^{2}+4)}$',
            mistake: 'pf-not-fully-factored',
            why: 'Kept the product together instead of giving each factor its own term.',
          },
        ],
        correct: 0,
        explanation: 'Linear factor → constant; irreducible quadratic → linear numerator.',
        result: { latex: '\\frac{1}{x(x^{2}+4)} = \\frac{A}{x} + \\frac{Bx+C}{x^{2}+4}' },
        check: { kind: 'none', reason: 'decomposition form' },
      },
      {
        prompt: '$1 = A(x^{2}+4) + (Bx+C)x$. Plug in $x = 0$: $A = ?$',
        options: [
          { latex: '\\frac{1}{4}', expr: '1/4' },
          {
            latex: '4',
            expr: '4',
            mistake: 'pf-coefficient-wrong',
            why: 'The equation 1 = 4A gives A = 1/4, not 4.',
          },
          {
            latex: '1',
            expr: '1',
            mistake: 'pf-coefficient-wrong',
            why: 'Forgot the factor 4 from x² + 4 at x = 0.',
          },
          {
            latex: '-\\frac{1}{4}',
            expr: '-1/4',
            mistake: 'sign-error',
            why: 'Introduced a minus sign, but no sign appears at x = 0.',
          },
          {
            latex: '\\frac{1}{2}',
            expr: '1/2',
            mistake: 'arithmetic-error',
            why: 'Used √4 instead of 4 when evaluating x² + 4 at x = 0.',
          },
        ],
        correct: 0,
        explanation: 'At $x = 0$ the second term vanishes: $1 = 4A$.',
        result: { latex: 'A = \\frac{1}{4}' },
        check: { kind: 'value', expected: '1/4' },
      },
      {
        prompt: 'Compare the $x^{2}$ and $x$ coefficients. What are $B$ and $C$?',
        options: [
          { latex: 'B = -\\frac{1}{4},\\quad C = 0', expr: '[-1/4, 0]' },
          {
            latex: 'B = \\frac{1}{4},\\quad C = 0',
            expr: '[1/4, 0]',
            mistake: 'sign-error',
            why: 'The x² coefficients give 0 = A + B, so B = −A, not +A.',
          },
          {
            latex: 'B = 0,\\quad C = -\\frac{1}{4}',
            expr: '[0, -1/4]',
            mistake: 'pf-coefficient-wrong',
            why: 'Swapped the roles of B and C.',
          },
          {
            latex: 'B = -\\frac{1}{4},\\quad C = 1',
            expr: '[-1/4, 1]',
            mistake: 'pf-coefficient-wrong',
            why: 'The x coefficient on the left is 0, so C = 0, not 1.',
          },
          {
            latex: 'B = -1,\\quad C = 0',
            expr: '[-1, 0]',
            mistake: 'arithmetic-error',
            why: 'B = −A = −1/4, not −1.',
          },
        ],
        correct: 0,
        explanation: '$x^{2}$: $0 = A + B \\Rightarrow B = -\\frac{1}{4}$. $x$: $0 = C$.',
        result: { latex: '\\frac{1}{x(x^{2}+4)} = \\frac{1/4}{x} - \\frac{x/4}{x^{2}+4}' },
        check: { kind: 'value', expected: '[-1/4, 0]' },
      },
      {
        prompt: 'Integrate.',
        options: [
          {
            latex: '\\frac{1}{4}\\ln|x| - \\frac{1}{8}\\ln(x^{2}+4) + C',
            expr: '1/4*log(abs(x)) - 1/8*log(x^2+4) + C',
          },
          {
            latex: '\\frac{1}{4}\\ln|x| - \\frac{1}{4}\\ln(x^{2}+4) + C',
            expr: '1/4*log(abs(x)) - 1/4*log(x^2+4) + C',
            mistake: 'du-constant-wrong',
            why: 'The integral of x/(x² + 4) dx is (1/2) ln(x² + 4); the factor 1/2 was forgotten.',
          },
          {
            latex: '\\frac{1}{4}\\ln|x| - \\frac{1}{8}\\arctan\\frac{x}{2} + C',
            expr: '1/4*log(abs(x)) - 1/8*arctan(x/2) + C',
            mistake: 'pf-ln-arctan-swapped',
            why: 'The x on top makes the quadratic part a log, not an arctan.',
          },
          {
            latex: '\\frac{1}{4}\\ln|x| + \\frac{1}{8}\\ln(x^{2}+4) + C',
            expr: '1/4*log(abs(x)) + 1/8*log(x^2+4) + C',
            mistake: 'sign-error',
            why: 'Lost the minus sign: B is negative, so the quadratic term is subtracted.',
          },
          {
            latex: '\\frac{1}{4}\\ln|x| - \\frac{1}{8}\\ln|x+2| + C',
            expr: '1/4*log(abs(x)) - 1/8*log(abs(x+2)) + C',
            mistake: 'pf-irreducible-misjudged',
            why: 'Split x² + 4 into linear pieces; the irreducible quadratic must stay intact.',
          },
        ],
        correct: 0,
        explanation: '$\\int \\frac{-x/4}{x^{2}+4}\\,dx = -\\frac{1}{4}\\cdot\\frac{1}{2}\\ln(x^{2}+4)$.',
        result: { latex: '= \\frac{1}{4}\\ln|x| - \\frac{1}{8}\\ln(x^{2}+4) + C' },
        check: { kind: 'antiderivative', integrand: '1/(x*(x^2+4))' },
      },
    ],
    final: {
      latex: '\\frac{1}{4}\\ln|x| - \\frac{1}{8}\\ln(x^{2}+4) + C',
      expr: '1/4*log(abs(x)) - 1/8*log(x^2+4) + C',
      check: { kind: 'antiderivative', integrand: '1/(x*(x^2+4))' },
      recap:
        '$\\frac{A}{x} + \\frac{Bx+C}{x^{2}+4}$ → $A$ at $x = 0$ → $B$, $C$ from the coefficients → the $x$-part of the quadratic term is a log.',
    },
  },

  // ───────────────────────── pf-s-08: ∫ (x + 2)/(x² + 2x + 5) dx ─────────────────────────
  {
    id: 'pf-s-08',
    topic: 'partial-fractions',
    title: 'Complete the square',
    difficulty: 2,
    statement: { text: 'Evaluate', latex: '\\int \\frac{x+2}{x^{2}+2x+5}\\,dx' },
    steps: [
      {
        prompt: 'Does the denominator factor? What next?',
        options: [
          { text: '$b^{2} - 4ac = 4 - 20 < 0$: irreducible; complete the square: $(x+1)^{2} + 4$' },
          {
            text: '$b^{2} - 4ac = 4 - 20 < 0$: irreducible; write $\\dfrac{A}{x+1} + \\dfrac{B}{x+5}$',
            mistake: 'pf-irreducible-misjudged',
            why: 'Irreducible means there are no real linear factors, so this decomposition cannot exist.',
          },
          {
            text: '$b^{2} - 4ac = 4 + 20 > 0$: it factors',
            mistake: 'pf-irreducible-misjudged',
            why: 'Miscomputed the discriminant: c = 5 gives 4 − 20, not 4 + 20.',
          },
          {
            text: 'Substitute $u = x^{2}+2x+5$ for the whole integrand',
            mistake: 'technique-wrong',
            why: 'The derivative du = (2x + 2) dx does not match the numerator x + 2.',
          },
          {
            text: 'Divide first',
            mistake: 'pf-improper-not-divided',
            why: 'Divided although degree 1 < degree 2 means the fraction is proper.',
          },
        ],
        correct: 0,
        explanation: 'Negative discriminant: keep the quadratic, and complete the square because $b \\ne 0$.',
        result: { latex: 'x^{2}+2x+5 = (x+1)^{2} + 4' },
        check: { kind: 'none', reason: 'discriminant and the right move' },
      },
      {
        prompt: 'With $u = x+1$ (so $x = u - 1$), rewrite the integrand.',
        variable: 'x',
        options: [
          { latex: '\\dfrac{u+1}{u^{2}+4}', expr: '(x+2)/((x+1)^2+4)' },
          {
            latex: '\\dfrac{u+2}{u^{2}+4}',
            expr: '(x+3)/((x+1)^2+4)',
            mistake: 'algebra-error',
            why: 'Left the numerator as u + 2; x + 2 = (u − 1) + 2 = u + 1.',
          },
          {
            latex: '\\dfrac{u}{u^{2}+4}',
            expr: '(x+1)/((x+1)^2+4)',
            mistake: 'algebra-error',
            why: 'Dropped the constant part of the numerator when substituting x = u − 1.',
          },
          {
            latex: '\\dfrac{u+1}{u^{2}+5}',
            expr: '(x+2)/((x+1)^2+5)',
            mistake: 'pf-square-not-completed',
            why: 'Completed the square wrongly: it is (x + 1)² + 4, since 5 − 1 = 4.',
          },
          {
            latex: '\\dfrac{u-1}{u^{2}+4}',
            expr: 'x/((x+1)^2+4)',
            mistake: 'sign-error',
            why: 'Used u − 1 for the numerator, but x + 2 = u + 1.',
          },
        ],
        correct: 0,
        explanation: '$x + 2 = (u - 1) + 2 = u + 1$ and the denominator is $u^{2} + 4$.',
        result: {
          latex: '\\int \\frac{u+1}{u^{2}+4}\\,du = \\int \\frac{u}{u^{2}+4}\\,du + \\int \\frac{1}{u^{2}+4}\\,du',
        },
        check: { kind: 'identity', lhs: '(x+2)/(x^2+2*x+5)' },
      },
      {
        prompt: 'Integrate in $u$.',
        variable: 'u',
        options: [
          {
            latex: '\\frac{1}{2}\\ln(u^{2}+4) + \\frac{1}{2}\\arctan\\frac{u}{2} + C',
            expr: '1/2*log(u^2+4) + 1/2*arctan(u/2) + C',
          },
          {
            latex: '\\frac{1}{2}\\ln(u^{2}+4) + \\arctan\\frac{u}{2} + C',
            expr: '1/2*log(u^2+4) + arctan(u/2) + C',
            mistake: 'pf-arctan-missing-1-over-k',
            why: 'The integral of du/(u² + k²) is (1/k) arctan(u/k) with k = 2; the 1/2 was forgotten.',
          },
          {
            latex: '\\ln(u^{2}+4) + \\frac{1}{2}\\arctan\\frac{u}{2} + C',
            expr: 'log(u^2+4) + 1/2*arctan(u/2) + C',
            mistake: 'du-constant-wrong',
            why: 'The integral of u/(u² + 4) du is (1/2) ln(u² + 4); the factor 1/2 was forgotten.',
          },
          {
            latex: '\\frac{1}{2}\\ln(u^{2}+4) + \\frac{1}{2}\\arctan u + C',
            expr: '1/2*log(u^2+4) + 1/2*arctan(u) + C',
            mistake: 'pf-arctan-missing-1-over-k',
            why: 'The argument of the arctan is u/k = u/2, not u.',
          },
          {
            latex: '\\frac{1}{2}\\arctan\\frac{u}{2} + \\frac{1}{2}\\ln(u+2) + C',
            expr: '1/2*arctan(u/2) + 1/2*log(u+2) + C',
            mistake: 'pf-ln-arctan-swapped',
            why: 'u/(u² + 4) is the log part of ln(u² + 4); u² + 4 does not split as u + 2.',
          },
        ],
        correct: 0,
        explanation: '$\\frac{u}{u^{2}+4} \\to \\frac{1}{2}\\ln(u^{2}+4)$; $\\frac{1}{u^{2}+4} \\to \\frac{1}{2}\\arctan\\frac{u}{2}$.',
        result: { latex: '= \\frac{1}{2}\\ln(u^{2}+4) + \\frac{1}{2}\\arctan\\frac{u}{2} + C' },
        check: { kind: 'antiderivative', integrand: '(u+1)/(u^2+4)' },
      },
      {
        prompt: 'Back-substitute $u = x + 1$.',
        options: [
          {
            latex: '\\frac{1}{2}\\ln(x^{2}+2x+5) + \\frac{1}{2}\\arctan\\frac{x+1}{2} + C',
            expr: '1/2*log(x^2+2*x+5) + 1/2*arctan((x+1)/2) + C',
          },
          {
            latex: '\\frac{1}{2}\\ln(x^{2}+2x+5) + \\frac{1}{2}\\arctan\\frac{x}{2} + C',
            expr: '1/2*log(x^2+2*x+5) + 1/2*arctan(x/2) + C',
            mistake: 'back-substitution-wrong',
            why: 'Replaced u by x + 1 only in the log; it must be replaced inside the arctan too.',
          },
          {
            latex: '\\frac{1}{2}\\ln\\left((x+1)^{2}\\right) + \\frac{1}{2}\\arctan\\frac{x+1}{2} + C',
            expr: '1/2*log((x+1)^2) + 1/2*arctan((x+1)/2) + C',
            mistake: 'back-substitution-wrong',
            why: 'Wrote u² as (x + 1)² but dropped the +4 from u² + 4 = (x + 1)² + 4.',
          },
          {
            latex: '\\frac{1}{2}\\ln(x^{2}+2x+5) + \\arctan(x+1) + C',
            expr: '1/2*log(x^2+2*x+5) + arctan(x+1) + C',
            mistake: 'pf-arctan-missing-1-over-k',
            why: 'Both the factor 1/2 and the division by 2 inside the arctan belong to k = 2.',
          },
          {
            latex: '\\frac{1}{2}\\ln(x^{2}+2x+5) - \\frac{1}{2}\\arctan\\frac{x+1}{2} + C',
            expr: '1/2*log(x^2+2*x+5) - 1/2*arctan((x+1)/2) + C',
            mistake: 'sign-error',
            why: 'Subtracted the arctan part, but both parts are added.',
          },
        ],
        correct: 0,
        explanation: 'Replace $u$ by $x + 1$ everywhere; $u^{2} + 4$ is the original denominator.',
        result: { latex: '= \\frac{1}{2}\\ln(x^{2}+2x+5) + \\frac{1}{2}\\arctan\\frac{x+1}{2} + C' },
        check: { kind: 'antiderivative', integrand: '(x+2)/(x^2+2*x+5)' },
      },
    ],
    final: {
      latex: '\\frac{1}{2}\\ln(x^{2}+2x+5) + \\frac{1}{2}\\arctan\\frac{x+1}{2} + C',
      expr: '1/2*log(x^2+2*x+5) + 1/2*arctan((x+1)/2) + C',
      check: { kind: 'antiderivative', integrand: '(x+2)/(x^2+2*x+5)' },
      recap:
        'Negative discriminant → complete the square $(x+1)^{2} + 4$ → $u = x + 1$ splits the integrand into a log part and an arctan part → back-substitute.',
    },
  },

  // ───────────────────────── pf-s-09: ∫₂⁴ dx/(x(x − 1)) ─────────────────────────
  {
    id: 'pf-s-09',
    topic: 'partial-fractions',
    title: 'A definite integral',
    difficulty: 1,
    statement: { text: 'Evaluate', latex: '\\int_{2}^{4} \\frac{dx}{x(x-1)}' },
    steps: [
      {
        prompt: 'Which form?',
        options: [
          { text: '$\\dfrac{A}{x} + \\dfrac{B}{x-1}$' },
          {
            text: '$\\dfrac{A}{x} + \\dfrac{B}{(x-1)^{2}}$',
            mistake: 'pf-missing-repeated-power',
            why: 'Squared the factor x − 1, which is not repeated.',
          },
          {
            text: '$\\dfrac{Ax+B}{x(x-1)}$',
            mistake: 'pf-not-fully-factored',
            why: 'Kept the product together instead of giving each factor its own term.',
          },
          {
            text: '$\\dfrac{A}{x^{2}-x}$',
            mistake: 'pf-constant-over-quadratic',
            why: 'One constant over the whole quadratic is not a decomposition.',
          },
          {
            text: 'Long division first',
            mistake: 'pf-improper-not-divided',
            why: 'Divided although degree 0 < degree 2 means the fraction is already proper.',
          },
        ],
        correct: 0,
        explanation: 'Two distinct linear factors.',
        result: { latex: '\\frac{1}{x(x-1)} = \\frac{A}{x} + \\frac{B}{x-1}' },
        check: { kind: 'none', reason: 'decomposition form' },
      },
      {
        prompt: '$1 = A(x-1) + Bx$. Find $A$ and $B$.',
        options: [
          { latex: 'A = -1,\\quad B = 1', expr: '[-1, 1]' },
          {
            latex: 'A = 1,\\quad B = -1',
            expr: '[1, -1]',
            mistake: 'sign-error',
            why: 'At x = 0 the equation 1 = −A gives A = −1, not +1.',
          },
          {
            latex: 'A = 1,\\quad B = 1',
            expr: '[1, 1]',
            mistake: 'pf-coefficient-wrong',
            why: 'Matched only the constant terms and ignored the sign of A.',
          },
          {
            latex: 'A = -1,\\quad B = -1',
            expr: '[-1, -1]',
            mistake: 'pf-coefficient-wrong',
            why: 'At x = 1 the equation 1 = B gives B = +1, not −1.',
          },
          {
            latex: 'A = -\\frac{1}{2},\\quad B = \\frac{1}{2}',
            expr: '[-1/2, 1/2]',
            mistake: 'arithmetic-error',
            why: 'Divided by 2, but no factor 2 appears in this problem.',
          },
        ],
        correct: 0,
        explanation: '$x = 0 \\Rightarrow 1 = -A$; $x = 1 \\Rightarrow 1 = B$.',
        result: { latex: '\\frac{1}{x(x-1)} = \\frac{1}{x-1} - \\frac{1}{x}' },
        check: { kind: 'value', expected: '[-1, 1]' },
      },
      {
        prompt: 'Find an antiderivative.',
        domain: [1.5, 3],
        options: [
          {
            latex: '\\ln|x-1| - \\ln|x| + C',
            expr: 'log(abs(x-1)) - log(abs(x)) + C',
          },
          {
            latex: '\\ln|x| - \\ln|x-1| + C',
            expr: 'log(abs(x)) - log(abs(x-1)) + C',
            mistake: 'sign-error',
            why: 'Attached the signs to the wrong logs: A = −1 goes with 1/x.',
          },
          {
            latex: '\\ln|x-1| + \\ln|x| + C',
            expr: 'log(abs(x-1)) + log(abs(x)) + C',
            mistake: 'pf-coefficient-wrong',
            why: 'Used +ln|x|, but A is negative.',
          },
          {
            latex: '\\ln|x^{2}-x| + C',
            expr: 'log(abs(x^2-x)) + C',
            mistake: 'ln-misapplied',
            why: 'That is the integral of (2x − 1)/(x² − x), not of 1/(x² − x).',
          },
          {
            latex: '-\\dfrac{1}{x-1} + \\dfrac{1}{x} + C',
            expr: '-1/(x-1) + 1/x + C',
            mistake: 'pf-power-term-as-ln',
            why: 'Used the power rule; first-power factors give logarithms.',
          },
        ],
        correct: 0,
        explanation: '$\\int \\frac{dx}{x-1} - \\int \\frac{dx}{x}$.',
        result: { latex: 'F(x) = \\ln|x-1| - \\ln|x| = \\ln\\left|\\frac{x-1}{x}\\right|' },
        check: { kind: 'antiderivative', integrand: '1/(x*(x-1))' },
      },
      {
        prompt: 'Evaluate from 2 to 4.',
        options: [
          { latex: '\\ln\\frac{3}{2}', expr: 'log(3/2)' },
          {
            latex: '\\ln\\frac{3}{4}',
            expr: 'log(3/4)',
            mistake: 'ftc-not-subtracted',
            why: 'Only F(4) = ln(3/4) was computed; F(2) must be subtracted.',
          },
          {
            latex: '-\\ln\\frac{3}{2}',
            expr: '-log(3/2)',
            mistake: 'ftc-order-swapped',
            why: 'Computed F(2) − F(4) instead of F(4) − F(2).',
          },
          {
            latex: '\\ln 6',
            expr: 'log(6)',
            mistake: 'arithmetic-error',
            why: 'Multiplied the two values instead of dividing them when combining the logs.',
          },
          {
            latex: '\\ln\\frac{1}{2}',
            expr: 'log(1/2)',
            mistake: 'ftc-not-subtracted',
            why: 'Only F(2) = ln(1/2) was computed, and with the wrong sign.',
          },
        ],
        correct: 0,
        explanation: '$F(4) - F(2) = \\ln\\frac{3}{4} - \\ln\\frac{1}{2} = \\ln\\frac{3}{2}$.',
        result: { latex: '= \\ln\\frac{3}{4} - \\ln\\frac{1}{2} = \\ln\\frac{3}{2}' },
        check: { kind: 'value', expected: 'log(3/2)' },
      },
    ],
    final: {
      latex: '\\ln\\frac{3}{2}',
      expr: 'log(3/2)',
      check: { kind: 'definite-integral', integrand: '1/(x*(x-1))', lower: '2', upper: '4' },
      recap:
        'Decompose $\\frac{1}{x(x-1)} = \\frac{1}{x-1} - \\frac{1}{x}$ → antiderivative $\\ln\\left|\\frac{x-1}{x}\\right|$ → $F(4) - F(2) = \\ln\\frac{3}{2}$.',
    },
  },
];
