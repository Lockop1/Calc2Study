import type { FlashGenerator, FlashItem } from '../types';

/**
 * Flash Drill items for topic "partial-fractions" (Lecture 8, §3.4). Authored by content-author;
 * verified by math-verifier. Distractor sets are built around a decoy hub (one common wrong answer
 * that the other options cluster around) so the answer cannot be picked from the options alone.
 */
export const flash: FlashItem[] = [
  // ───────────────────────── step 1–2: proper or improper, and the first move ─────────────────────────
  {
    id: 'pf-f-001',
    topic: 'partial-fractions',
    kind: 'concept',
    prompt: { text: 'Which rational function is proper, so it can be decomposed without long division first?' },
    options: [
      { latex: '\\frac{x^3 + 1}{x^2(x^2 + 4)}' },
      {
        latex: '\\frac{x^3 + 1}{x(x^2 + 4)}',
        mistake: 'pf-improper-not-divided',
        why: 'The denominator has degree 1 + 2 = 3, the same as x³ + 1. Equal degrees make the fraction improper, so long division comes first.',
      },
      {
        latex: '\\frac{x^2 + 1}{(x - 1)(x + 2)}',
        mistake: 'pf-improper-not-divided',
        why: 'The denominator multiplies out to degree 2, the same as x² + 1. Equal degrees count as improper.',
      },
      {
        latex: '\\frac{x(x + 1)^2}{x^3 + 8}',
        mistake: 'pf-improper-not-divided',
        why: 'The numerator x(x + 1)² has degree 1 + 2 = 3, not 2, so this is degree 3 over degree 3: improper.',
      },
      {
        latex: '\\frac{2x^3 - x}{(x + 1)^3}',
        mistake: 'pf-improper-not-divided',
        why: '(x + 1)³ has degree 3, the same as 2x³ − x, so the fraction is improper and needs long division.',
      },
      {
        latex: '\\frac{x^3 + 1}{(x + 1)(x^2 + 4)}',
        mistake: 'pf-improper-not-divided',
        why: 'The denominator has degree 1 + 2 = 3, the same as the numerator, so the fraction is improper.',
      },
    ],
    correct: 0,
    explanation:
      'Proper means $\\deg p < \\deg s$. Only $\\frac{x^3 + 1}{x^2(x^2 + 4)}$ qualifies: degree 3 over degree $2 + 2 = 4$. Every other choice has equal degrees.',
    check: { kind: 'none', reason: 'proper vs improper is a degree comparison, not a numeric value' },
    difficulty: 1,
  },
  {
    id: 'pf-f-002',
    topic: 'partial-fractions',
    kind: 'technique',
    prompt: { text: 'You will integrate this by partial fractions. What is the first move, and why?', latex: '\\frac{x^3 + 1}{x^2 - 4}' },
    options: [
      { text: 'Divide first, since $\\deg(x^3 + 1) \\ge \\deg(x^2 - 4)$' },
      {
        text: 'Decompose first, since $x^2 - 4 = (x - 2)(x + 2)$',
        mistake: 'pf-improper-not-divided',
        why: 'The fraction is improper (degree 3 over degree 2). A/(x − 2) + B/(x + 2) is proper, so it can never equal it.',
      },
      {
        text: 'Divide first, since $x^2 - 4$ is irreducible',
        mistake: 'pf-irreducible-misjudged',
        why: 'Right move, wrong reason: x² − 4 = (x − 2)(x + 2) factors (b² − 4ac = 16 > 0). Division is needed because of the degrees.',
      },
      {
        text: 'Factor $x^3 + 1$ first, since $x^3 + 1 = (x + 1)(x^2 - x + 1)$',
        mistake: 'technique-wrong',
        why: 'Factoring the numerator is not a step of the method. The degree test comes first, and 3 ≥ 2 calls for long division.',
      },
      {
        text: 'Decompose first, since $\\deg(x^3 + 1) \\ge \\deg(x^2 - 4)$',
        mistake: 'pf-improper-not-divided',
        why: 'The degree test was read backwards: deg p ≥ deg s means improper, which calls for long division, not a direct decomposition.',
      },
    ],
    correct: 0,
    explanation:
      'Step 1 is the degree test: $3 \\ge 2$, so the fraction is improper. Divide first: $\\frac{x^3 + 1}{x^2 - 4} = x + \\frac{4x + 1}{x^2 - 4}$.',
    check: { kind: 'none', reason: 'technique recognition (which step of the method comes first)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-003',
    topic: 'partial-fractions',
    kind: 'technique',
    prompt: { text: 'You will integrate this by partial fractions. What is the first move?', latex: '\\frac{2x + 3}{x^3 - x}' },
    options: [
      { text: 'Factor completely: $x^3 - x = x(x - 1)(x + 1)$' },
      {
        text: 'Factor partly: $x^3 - x = x(x^2 - 1)$, keeping $x^2 - 1$',
        mistake: 'pf-not-fully-factored',
        why: 'x² − 1 = (x − 1)(x + 1) still factors. The denominator must be split all the way into linear and irreducible pieces.',
      },
      {
        text: 'Factor completely: $x^3 - x = x(x - 1)^2$',
        mistake: 'algebra-error',
        why: 'x(x − 1)² = x³ − 2x² + x, not x³ − x. The factor x² − 1 is (x − 1)(x + 1).',
      },
      {
        text: 'Long-divide first: $x^3 - x$ has the higher degree',
        mistake: 'technique-wrong',
        why: 'Long division is only for improper fractions. Here deg p = 1 < 3, so the fraction is already proper.',
      },
      {
        text: 'Substitute $u = x^3 - x$, with $du = (3x^2 - 1)\\,dx$',
        mistake: 'technique-wrong',
        why: 'du = (3x² − 1) dx does not match the numerator 2x + 3, so this substitution does not simplify the integral.',
      },
    ],
    correct: 0,
    explanation:
      'The fraction is proper ($1 < 3$), so the next step is to factor the denominator completely: $x^3 - x = x(x - 1)(x + 1)$.',
    check: { kind: 'none', reason: 'technique recognition (which step of the method comes first)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-004',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: {
      text: 'Long division of $p$ by $s$ gives quotient $q$ and remainder $r$, so $p = s\\cdot q + r$. Then $\\frac{p}{s}$ equals',
    },
    options: [
      { latex: 'q + \\frac{r}{s}', expr: 'q + r/s' },
      {
        latex: 'q + \\frac{r}{q}',
        expr: 'q + r/q',
        mistake: 'formula-swapped',
        why: 'The remainder stays over the divisor s, not over the quotient q.',
      },
      {
        latex: 's + \\frac{r}{q}',
        expr: 's + r/q',
        mistake: 'formula-swapped',
        why: 'The divisor s and the quotient q traded places. The polynomial part is the quotient q.',
      },
      {
        latex: 'q + r',
        expr: 'q + r',
        mistake: 'formula-missing-factor',
        why: 'Dividing s·q + r by s divides the remainder too: r becomes r/s.',
      },
      {
        latex: 'q + \\frac{r}{p}',
        expr: 'q + r/p',
        mistake: 'formula-swapped',
        why: 'The remainder goes over the divisor s, not over the original numerator p.',
      },
    ],
    correct: 0,
    explanation:
      'Divide $p = s\\cdot q + r$ by $s$: $\\frac{p}{s} = q + \\frac{r}{s}$, and $\\frac{r}{s}$ is proper because $\\deg r < \\deg s$.',
    check: { kind: 'identity', lhs: '(s*q + r)/s' },
    difficulty: 1,
  },

  // ───────────────────────── step 3: is the quadratic factor irreducible? (b² − 4ac) ─────────────────────────
  {
    id: 'pf-f-005',
    topic: 'partial-fractions',
    kind: 'concept',
    prompt: { text: 'Is the quadratic factor $x^2 + 4$ irreducible?' },
    options: [
      { text: 'Irreducible, since $b^2 - 4ac = -16 < 0$' },
      {
        text: 'Reducible, since $x^2 + 4 = (x - 2)(x + 2)$',
        mistake: 'pf-irreducible-misjudged',
        why: '(x − 2)(x + 2) = x² − 4. The sum x² + 4 has no real roots.',
      },
      {
        text: 'Reducible, since $x^2 + 4 = (x + 2)^2$',
        mistake: 'algebra-error',
        why: '(x + 2)² = x² + 4x + 4. The middle term 4x is not in x² + 4.',
      },
      {
        text: 'Reducible, since $b^2 - 4ac = 16 > 0$',
        mistake: 'sign-error',
        why: 'With a = 1, b = 0, c = 4: b² − 4ac = 0 − 16 = −16. The minus sign of −4ac was lost.',
      },
      {
        text: 'Irreducible, since it has no $x$ term',
        mistake: 'pf-irreducible-misjudged',
        why: 'Right verdict, wrong reason: x² − 4 has no x term either and still factors. Only the sign of b² − 4ac decides.',
      },
    ],
    correct: 0,
    explanation:
      '$a = 1$, $b = 0$, $c = 4$: $b^2 - 4ac = -16 < 0$, so $x^2 + 4$ has no real roots and keeps a linear numerator, $\\frac{Ax + B}{x^2 + 4}$.',
    check: { kind: 'none', reason: 'verdict on irreducibility (sign of the discriminant), verified by math-verifier' },
    difficulty: 1,
  },
  {
    id: 'pf-f-006',
    topic: 'partial-fractions',
    kind: 'concept',
    prompt: { text: 'Is the quadratic factor $x^2 - 5x + 6$ irreducible?' },
    options: [
      { text: 'Reducible: $b^2 - 4ac = 1$, so it is $(x - 2)(x - 3)$' },
      {
        text: 'Irreducible: $b^2 - 4ac = -49$',
        mistake: 'negative-squared-wrong',
        why: '(−5)² = +25, not −25. Then b² − 4ac = 25 − 24 = 1 > 0.',
      },
      {
        text: 'Reducible: $b^2 - 4ac = 1$, so it is $(x + 2)(x + 3)$',
        mistake: 'sign-error',
        why: '(x + 2)(x + 3) = x² + 5x + 6. A middle term −5x with constant +6 needs both roots positive: (x − 2)(x − 3).',
      },
      {
        text: 'Reducible: $b^2 - 4ac = 1$, so it is $(x + 2)(x - 3)$',
        mistake: 'sign-error',
        why: '(x + 2)(x − 3) = x² − x − 6. The constant +6 needs both factors to have the same sign.',
      },
      {
        text: 'Reducible: $b^2 - 4ac = 49$, so it is $(x - 6)(x + 1)$',
        mistake: 'sign-error',
        why: 'b² − 4ac = 25 − 4(1)(6) = 1. Adding the 24 gives 49 and the factors of x² − 5x − 6 instead.',
      },
      {
        text: 'Irreducible: $b^2 - 4ac = -1$',
        mistake: 'arithmetic-error',
        why: 'The subtraction was done backwards (24 − 25). In fact b² − 4ac = 25 − 24 = +1 > 0.',
      },
    ],
    correct: 0,
    explanation:
      '$b^2 - 4ac = 25 - 24 = 1 > 0$: real roots $x = 2$ and $x = 3$, so the factor splits into $(x - 2)(x - 3)$ and gets two linear terms.',
    check: { kind: 'none', reason: 'verdict on irreducibility (sign of the discriminant), verified by math-verifier' },
    difficulty: 1,
  },
  {
    id: 'pf-f-007',
    topic: 'partial-fractions',
    kind: 'concept',
    prompt: { text: 'Compute $b^2 - 4ac$ to decide whether $x^2 + 2x + 5$ is irreducible.' },
    options: [
      { text: '$b^2 - 4ac = -16$, so it is irreducible' },
      {
        text: '$b^2 - 4ac = 24$, so it factors',
        mistake: 'sign-error',
        why: 'b² − 4ac = 4 − 4(1)(5) = 4 − 20. Adding the 20 instead of subtracting it gives 24.',
      },
      {
        text: '$b^2 - 4ac = -18$, so it is irreducible',
        mistake: 'arithmetic-error',
        why: 'b was not squared: 2 − 20 = −18. With b² = 4 the value is −16.',
      },
      {
        text: '$b^2 - 4ac = 16$, so it factors',
        mistake: 'arithmetic-error',
        why: 'The subtraction was reversed (20 − 4). In fact b² − 4ac = 4 − 20 = −16 < 0.',
      },
      {
        text: '$b^2 - 4ac = -16$, so it factors',
        mistake: 'pf-irreducible-misjudged',
        why: 'The value is right but the conclusion is backwards: a negative b² − 4ac means no real roots, so the quadratic stays whole.',
      },
    ],
    correct: 0,
    explanation:
      '$b^2 - 4ac = 2^2 - 4(1)(5) = -16 < 0$: no real roots, so $x^2 + 2x + 5$ is irreducible (it completes to $(x + 1)^2 + 4$).',
    check: { kind: 'none', reason: 'verdict on irreducibility (sign of the discriminant), verified by math-verifier' },
    difficulty: 2,
  },
  {
    id: 'pf-f-008',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Complete the square in the irreducible factor', latex: 'x^2 + 2x + 5' },
    options: [
      { latex: '(x + 1)^2 + 4', expr: '(x + 1)^2 + 4' },
      {
        latex: '(x + 2)^2 + 5',
        expr: '(x + 2)^2 + 5',
        mistake: 'algebra-error',
        why: 'The shift is b/2 = 1, not b = 2: (x + 2)² = x² + 4x + 4 has middle term 4x. The constant 5 was also left unadjusted.',
      },
      {
        latex: '(x + 1)^2 + 5',
        expr: '(x + 1)^2 + 5',
        mistake: 'algebra-error',
        why: '(x + 1)² already supplies the constant 1, so only 5 − 1 = 4 is left over.',
      },
      {
        latex: '(x + 1)^2 + 6',
        expr: '(x + 1)^2 + 6',
        mistake: 'sign-error',
        why: 'The 1 inside (x + 1)² must be subtracted from 5, not added: 5 − 1 = 4.',
      },
      {
        latex: '(x - 1)^2 + 5',
        expr: '(x - 1)^2 + 5',
        mistake: 'sign-error',
        why: '(x − 1)² = x² − 2x + 1 has middle term −2x. A middle term +2x needs (x + 1)². The constant 5 was also left unadjusted.',
      },
    ],
    correct: 0,
    explanation: '$x^2 + 2x + 5 = (x^2 + 2x + 1) + 4 = (x + 1)^2 + 4$: shift by $b/2 = 1$, and $k^2 = 4$ is left over.',
    check: { kind: 'identity', lhs: 'x^2 + 2*x + 5' },
    difficulty: 1,
  },

  // ───────────────────────── step 2: long division results ─────────────────────────
  {
    id: 'pf-f-009',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Long-divide until the remainder has lower degree than $x^2 + 1$:', latex: '\\frac{x^3 + 2x^2 + 3}{x^2 + 1}' },
    options: [
      { latex: 'x + 2 + \\frac{1 - x}{x^2 + 1}', expr: 'x + 2 + (1 - x)/(x^2 + 1)' },
      {
        latex: 'x + 2 + \\frac{x + 1}{x^2 + 1}',
        expr: 'x + 2 + (x + 1)/(x^2 + 1)',
        mistake: 'sign-error',
        why: 'After subtracting x(x² + 1) = x³ + x, the x term is 0 − x = −x; it was written as +x, so the remainder came out x + 1.',
      },
      {
        latex: 'x + 2 + \\frac{1}{x^2 + 1}',
        expr: 'x + 2 + 1/(x^2 + 1)',
        mistake: 'pf-division-wrong',
        why: 'x(x² + 1) was multiplied out as x³ alone; the x·1 = x term was dropped, so the −x never reached the remainder.',
      },
      {
        latex: 'x + 1 + \\frac{2}{x^2 + 1}',
        expr: 'x + 1 + 2/(x^2 + 1)',
        mistake: 'pf-division-wrong',
        why: 'Without a 0x placeholder, x³ + x was lined up under x³ + 2x², so the x was taken from the 2x² and the quotient came out x + 1.',
      },
      {
        latex: 'x + 2 + \\frac{x - 1}{x^2 + 1}',
        expr: 'x + 2 + (x - 1)/(x^2 + 1)',
        mistake: 'sign-error',
        why: 'The subtraction was done the wrong way round, (x³ + 2x² + x + 2) − (x³ + 2x² + 3) = x − 1, which flips the sign of the remainder.',
      },
    ],
    correct: 0,
    explanation:
      'Quotient $x$: subtract $x^3 + x$ to leave $2x^2 - x + 3$. Quotient $+2$: subtract $2x^2 + 2$ to leave $1 - x$, of lower degree than $x^2 + 1$.',
    check: { kind: 'identity', lhs: '(x^3 + 2*x^2 + 3)/(x^2 + 1)' },
    difficulty: 2,
  },
  {
    id: 'pf-f-010',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Long division gives', latex: '\\frac{x^3 + 1}{x^2 - 4} =' },
    options: [
      { latex: 'x + \\frac{4x + 1}{x^2 - 4}', expr: 'x + (4*x + 1)/(x^2 - 4)' },
      {
        latex: 'x + \\frac{1 - 4x}{x^2 - 4}',
        expr: 'x + (1 - 4*x)/(x^2 - 4)',
        mistake: 'sign-error',
        why: 'x(x² − 4) = x³ − 4x, and subtracting −4x adds 4x. Here the −4x was carried down unchanged, giving 1 − 4x.',
      },
      {
        latex: 'x + \\frac{5}{x^2 - 4}',
        expr: 'x + 5/(x^2 - 4)',
        mistake: 'pf-division-wrong',
        why: 'x(x² − 4) was multiplied out as x³ − 4 instead of x³ − 4x, so the remainder came out 1 + 4 = 5.',
      },
      {
        latex: 'x + \\frac{1}{x^2 - 4}',
        expr: 'x + 1/(x^2 - 4)',
        mistake: 'pf-division-wrong',
        why: 'Only x·x² = x³ was subtracted; the x·(−4) = −4x part of the product was dropped.',
      },
      {
        latex: 'x + 4 + \\frac{17}{x^2 - 4}',
        expr: 'x + 4 + 17/(x^2 - 4)',
        mistake: 'pf-division-wrong',
        why: 'The product x(x² − 4) was lined up as x³ − 4x², so a 4x² appeared and the division ran one extra step.',
      },
    ],
    correct: 0,
    explanation: '$x(x^2 - 4) = x^3 - 4x$, and $(x^3 + 1) - (x^3 - 4x) = 4x + 1$, which has degree $1 < 2$, so the division stops.',
    check: { kind: 'identity', lhs: '(x^3 + 1)/(x^2 - 4)' },
    difficulty: 1,
  },

  // ───────────────────────── step 4: the decomposition form ─────────────────────────
  {
    id: 'pf-f-011',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Factor the denominator, then choose the partial-fraction form.', latex: '\\frac{x^2 + 1}{x^3 - 2x^2 + x}' },
    options: [
      { latex: '\\frac{A}{x} + \\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}' },
      {
        latex: '\\frac{A}{x} + \\frac{Bx + C}{(x - 1)^2}',
        mistake: 'pf-linear-over-repeated-linear',
        why: 'A repeated linear factor takes one constant numerator per power, B/(x − 1) + C/(x − 1)², not a linear numerator over (x − 1)².',
      },
      {
        latex: '\\frac{A}{x} + \\frac{Bx + C}{x^2 - 2x + 1}',
        mistake: 'pf-irreducible-misjudged',
        why: 'x² − 2x + 1 has b² − 4ac = 4 − 4 = 0, so it is (x − 1)², not an irreducible quadratic.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x - 1} + \\frac{C}{x + 1}',
        mistake: 'algebra-error',
        why: 'x² − 2x + 1 = (x − 1)², not (x − 1)(x + 1) = x² − 1.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x - 1}',
        mistake: 'pf-missing-repeated-power',
        why: 'x − 1 appears squared, so it needs a term for each power: B/(x − 1) and C/(x − 1)².',
      },
    ],
    correct: 0,
    explanation:
      '$x^3 - 2x^2 + x = x(x - 1)^2$. The factor $x$ gives $\\frac{A}{x}$; the repeated factor gives one term per power, $\\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}$.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-012',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Choose the partial-fraction form.', latex: '\\frac{3x^2 + 2}{(x - 1)(x^2 + 4)}' },
    options: [
      { latex: '\\frac{A}{x - 1} + \\frac{Bx + C}{x^2 + 4}' },
      {
        latex: '\\frac{A}{x - 1} + \\frac{B}{x^2 + 4}',
        mistake: 'pf-constant-over-quadratic',
        why: 'An irreducible quadratic needs a linear numerator Bx + C; a constant B cannot match every numerator.',
      },
      {
        latex: '\\frac{A}{x - 1} + \\frac{B}{x - 2} + \\frac{C}{x + 2}',
        mistake: 'pf-irreducible-misjudged',
        why: 'x² + 4 does not factor (b² − 4ac = −16 < 0); (x − 2)(x + 2) is x² − 4.',
      },
      {
        latex: '\\frac{Ax + B}{x - 1} + \\frac{Cx + D}{x^2 + 4}',
        mistake: 'pf-linear-over-repeated-linear',
        why: 'A linear factor takes a constant numerator, A/(x − 1). Only the irreducible quadratic gets a linear numerator.',
      },
      {
        latex: '\\frac{A}{x - 1} + \\frac{Bx}{x^2 + 4}',
        mistake: 'pf-constant-over-quadratic',
        why: 'The numerator over x² + 4 must be the full linear Bx + C. Dropping the constant C loses the arctan part.',
      },
    ],
    correct: 0,
    explanation:
      '$x - 1$ is linear, so it gets a constant numerator; $x^2 + 4$ is irreducible ($b^2 - 4ac = -16$), so it gets a linear one: $\\frac{Bx + C}{x^2 + 4}$.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-013',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Choose the partial-fraction form.', latex: '\\frac{x^3 + 2}{x(x^2 + 1)^2}' },
    options: [
      { latex: '\\frac{A}{x} + \\frac{Bx + C}{x^2 + 1} + \\frac{Dx + E}{(x^2 + 1)^2}' },
      {
        latex: '\\frac{A}{x} + \\frac{Bx + C}{(x^2 + 1)^2}',
        mistake: 'pf-missing-repeated-power',
        why: 'x² + 1 is squared, so it needs a term for each power: one over x² + 1 and one over (x² + 1)².',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x^2 + 1} + \\frac{C}{(x^2 + 1)^2}',
        mistake: 'pf-constant-over-quadratic',
        why: 'Each power of the irreducible x² + 1 needs a linear numerator (Bx + C and Dx + E), not a constant.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{Bx + C}{x^2 + 1}',
        mistake: 'pf-missing-repeated-power',
        why: 'Only the first power of x² + 1 was used; the term over (x² + 1)² is missing.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x^2 + 1} + \\frac{Cx + D}{(x^2 + 1)^2}',
        mistake: 'pf-constant-over-quadratic',
        why: 'The first-power term over x² + 1 also needs a linear numerator; a constant B is not enough.',
      },
    ],
    correct: 0,
    explanation:
      'For $(x^2 + 1)^2$ write one term per power, each with a linear numerator: $\\frac{Bx + C}{x^2 + 1} + \\frac{Dx + E}{(x^2 + 1)^2}$. The factor $x$ adds $\\frac{A}{x}$.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 2,
  },
  {
    id: 'pf-f-014',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Choose the partial-fraction form.', latex: '\\frac{5x^2 - 1}{(x + 1)^2(x^2 + 9)}' },
    options: [
      { latex: '\\frac{A}{x + 1} + \\frac{B}{(x + 1)^2} + \\frac{Cx + D}{x^2 + 9}' },
      {
        latex: '\\frac{A}{(x + 1)^2} + \\frac{Bx + C}{x^2 + 9}',
        mistake: 'pf-missing-repeated-power',
        why: '(x + 1)² needs a term for each power: a term over x + 1 as well as the one over (x + 1)².',
      },
      {
        latex: '\\frac{A}{x + 1} + \\frac{B}{(x + 1)^2} + \\frac{C}{x^2 + 9}',
        mistake: 'pf-constant-over-quadratic',
        why: 'x² + 9 is irreducible (b² − 4ac = −36 < 0), so its numerator must be linear: Cx + D.',
      },
      {
        latex: '\\frac{Ax + B}{(x + 1)^2} + \\frac{Cx + D}{x^2 + 9}',
        mistake: 'pf-linear-over-repeated-linear',
        why: 'The repeated linear factor takes constant numerators, one per power: A/(x + 1) + B/(x + 1)², not (Ax + B)/(x + 1)².',
      },
      {
        latex: '\\frac{A}{x + 1} + \\frac{Bx + C}{x^2 + 9}',
        mistake: 'pf-missing-repeated-power',
        why: 'Only the first power of x + 1 was used; the term over (x + 1)² is missing.',
      },
    ],
    correct: 0,
    explanation:
      'Repeated linear $(x + 1)^2$: $\\frac{A}{x + 1} + \\frac{B}{(x + 1)^2}$. Irreducible $x^2 + 9$: $\\frac{Cx + D}{x^2 + 9}$.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 2,
  },
  {
    id: 'pf-f-015',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Factor the denominator completely, then choose the form.', latex: '\\frac{x + 5}{x^3 - 9x}' },
    options: [
      { latex: '\\frac{A}{x} + \\frac{B}{x - 3} + \\frac{C}{x + 3}' },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x^2 - 9}',
        mistake: 'pf-not-fully-factored',
        why: 'x² − 9 = (x − 3)(x + 3) still factors, so keeping it as one quadratic factor is not the full decomposition.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x - 3} + \\frac{C}{x + 9}',
        mistake: 'sqrt-constant-not-rooted',
        why: 'x² − 9 = (x − 3)(x + 3): the second root is −√9 = −3, so the factor is x + 3, not x + 9.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x - 3} + \\frac{C}{(x - 3)^2}',
        mistake: 'algebra-error',
        why: '(x − 3)² = x² − 6x + 9, not x² − 9. The factors are x − 3 and x + 3.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x - 3}',
        mistake: 'algebra-error',
        why: 'x³ − 9x = x(x − 3)(x + 3): the factor x + 3 was dropped, and it needs its own C/(x + 3) term.',
      },
    ],
    correct: 0,
    explanation: '$x^3 - 9x = x(x^2 - 9) = x(x - 3)(x + 3)$: three distinct linear factors, each with a constant numerator.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-016',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Which form fits, counting any division the method requires?', latex: '\\frac{x^3}{x^2 - 1}' },
    options: [
      { latex: 'x + \\frac{A}{x - 1} + \\frac{B}{x + 1}' },
      {
        latex: '\\frac{A}{x - 1} + \\frac{B}{x + 1}',
        mistake: 'pf-improper-not-divided',
        why: 'Degree 3 over degree 2 is improper: long division first gives the polynomial part x, then the remainder is decomposed.',
      },
      {
        latex: '\\frac{Ax + B}{x^2 - 1}',
        mistake: 'pf-not-fully-factored',
        why: 'x² − 1 = (x − 1)(x + 1) factors, so it splits into A/(x − 1) + B/(x + 1). The long division of the improper fraction was also skipped.',
      },
      {
        latex: '\\frac{A}{x - 1} + \\frac{B}{(x - 1)^2}',
        mistake: 'algebra-error',
        why: 'x² − 1 = (x − 1)(x + 1), not (x − 1)²; the two factors are distinct linear factors. The long division of the improper fraction was also skipped.',
      },
      {
        latex: '\\frac{Ax + B}{x - 1} + \\frac{Cx + D}{x + 1}',
        mistake: 'pf-linear-over-repeated-linear',
        why: 'Each linear factor takes a constant numerator, not a linear one. The long division of the improper fraction was also skipped.',
      },
    ],
    correct: 0,
    explanation:
      'Divide first: $\\frac{x^3}{x^2 - 1} = x + \\frac{x}{x^2 - 1}$, then split the proper remainder over $(x - 1)(x + 1)$: $x + \\frac{A}{x - 1} + \\frac{B}{x + 1}$.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 2,
  },
  {
    id: 'pf-f-017',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Choose the partial-fraction form.', latex: '\\frac{3x + 1}{x^2(x + 1)^2}' },
    options: [
      { latex: '\\frac{A}{x} + \\frac{B}{x^2} + \\frac{C}{x + 1} + \\frac{D}{(x + 1)^2}' },
      {
        latex: '\\frac{A}{x^2} + \\frac{B}{(x + 1)^2}',
        mistake: 'pf-missing-repeated-power',
        why: 'Each repeated factor needs every power, so the terms over x and over x + 1 are missing next to the squared terms.',
      },
      {
        latex: '\\frac{Ax + B}{x^2} + \\frac{Cx + D}{(x + 1)^2}',
        mistake: 'pf-linear-over-repeated-linear',
        why: 'x² and (x + 1)² are powers of linear factors: write one constant-numerator term per power instead of a linear numerator.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x + 1}',
        mistake: 'pf-missing-repeated-power',
        why: 'Only the first powers were used; the squares x² and (x + 1)² need their own terms.',
      },
      {
        latex: '\\frac{A}{x} + \\frac{B}{x^2} + \\frac{Cx + D}{(x + 1)^2}',
        mistake: 'pf-linear-over-repeated-linear',
        why: 'The factor x is handled right, but (x + 1)² still needs C/(x + 1) + D/(x + 1)², not a linear numerator.',
      },
    ],
    correct: 0,
    explanation:
      'Both factors are repeated linear factors, so each power gets its own constant numerator: $\\frac{A}{x} + \\frac{B}{x^2} + \\frac{C}{x + 1} + \\frac{D}{(x + 1)^2}$.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-018',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Choose the partial-fraction form.', latex: '\\frac{x + 3}{(x - 1)(x^2 + 2x + 5)}' },
    options: [
      { latex: '\\frac{A}{x - 1} + \\frac{Bx + C}{x^2 + 2x + 5}' },
      {
        latex: '\\frac{A}{x - 1} + \\frac{B}{x^2 + 2x + 5}',
        mistake: 'pf-constant-over-quadratic',
        why: 'x² + 2x + 5 is irreducible, so it needs the linear numerator Bx + C, not a constant.',
      },
      {
        latex: '\\frac{A}{x - 1} + \\frac{B}{x + 1} + \\frac{C}{x + 5}',
        mistake: 'pf-irreducible-misjudged',
        why: '(x + 1)(x + 5) = x² + 6x + 5. With b² − 4ac = 4 − 20 = −16 < 0, x² + 2x + 5 has no real factors.',
      },
      {
        latex: '\\frac{Ax + B}{x - 1} + \\frac{Cx + D}{x^2 + 2x + 5}',
        mistake: 'pf-linear-over-repeated-linear',
        why: 'The linear factor x − 1 takes a constant numerator A; only the irreducible quadratic gets Bx + C.',
      },
      {
        latex: '\\frac{A}{x - 1} + \\frac{Bx}{x^2 + 2x + 5}',
        mistake: 'pf-constant-over-quadratic',
        why: 'The numerator over the irreducible quadratic must be the whole linear Bx + C; the constant part was dropped.',
      },
    ],
    correct: 0,
    explanation:
      '$x^2 + 2x + 5$ has $b^2 - 4ac = -16 < 0$, so it stays whole with a linear numerator: $\\frac{A}{x - 1} + \\frac{Bx + C}{x^2 + 2x + 5}$.',
    check: { kind: 'none', reason: 'decomposition form with unknown constants (no numeric value to check)' },
    difficulty: 1,
  },

  // ───────────────────────── step 5: solving for the coefficients ─────────────────────────
  {
    id: 'pf-f-019',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: {
      text: 'Class example: solve $\\frac{3 - x^2}{(x - 1)(x^2 + 1)} = \\frac{A}{x - 1} + \\frac{Bx + C}{x^2 + 1}$ for $A$, $B$, $C$.',
    },
    options: [
      { latex: 'A = 1,\\quad B = -2,\\quad C = -2', expr: '[1, -2, -2]' },
      {
        latex: 'A = 2,\\quad B = 2,\\quad C = -2',
        expr: '[2, 2, -2]',
        mistake: 'pf-coefficient-wrong',
        why: 'At x = 1: 3 − 1 = 2 = A(1 + 1), so A = 1. The 2 was not divided out (A = 2), and B = +2 comes from the sign slip in the x² terms.',
      },
      {
        latex: 'A = 1,\\quad B = 2,\\quad C = 2',
        expr: '[1, 2, 2]',
        mistake: 'sign-error',
        why: 'At x = 0: 3 = A − C, so C = A − 3 = −2. Dropping the sign of (0 − 1) gives C = +2, on top of the sign slip that makes B = +2.',
      },
      {
        latex: 'A = 1,\\quad B = 0,\\quad C = -2',
        expr: '[1, 0, -2]',
        mistake: 'sign-error',
        why: 'The x² terms give A + B = −1 (from the −x²). Using +1 instead gives B = 0.',
      },
      {
        latex: 'A = 1,\\quad B = 2,\\quad C = -2',
        expr: '[1, 2, -2]',
        mistake: 'sign-error',
        why: 'Expanding (Bx + C)(x − 1) gives +Bx². Writing −Bx² turns A + B = −1 into A − B = −1, so B = 2.',
      },
    ],
    correct: 0,
    explanation:
      '$3 - x^2 = A(x^2 + 1) + (Bx + C)(x - 1)$. $x = 1$: $2 = 2A$, $A = 1$. $x = 0$: $3 = A - C$, $C = -2$. $x^2$ terms: $-1 = A + B$, $B = -2$.',
    check: { kind: 'value', expected: '[1, -2, -2]' },
    difficulty: 2,
    tags: ['class-example'],
  },
  {
    id: 'pf-f-020',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: {
      text: 'In $\\frac{5x + 1}{(x - 1)(x + 2)} = \\frac{A}{x - 1} + \\frac{B}{x + 2}$, multiply out and set $x = 1$. What is $A$?',
    },
    options: [
      { latex: '2', expr: '2' },
      {
        latex: '6',
        expr: '6',
        mistake: 'pf-coefficient-wrong',
        why: 'x = 1 gives 6 = A(1 + 2) = 3A. The factor 3 was not divided out.',
      },
      {
        latex: '3',
        expr: '3',
        mistake: 'pf-coefficient-wrong',
        why: 'That is B: setting x = −2 gives −9 = −3B, so B = 3. Setting x = 1 isolates A instead.',
      },
      {
        latex: '\\frac{5}{3}',
        expr: '5/3',
        mistake: 'arithmetic-error',
        why: 'At x = 1 the numerator is 5(1) + 1 = 6. The +1 was dropped, giving 5 = 3A.',
      },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'algebra-error',
        why: '6 = 3A was solved upside down: A = 3/6 = 1/2 instead of 6/3 = 2.',
      },
    ],
    correct: 0,
    explanation: 'Multiply out: $5x + 1 = A(x + 2) + B(x - 1)$. At $x = 1$ the $B$ term vanishes: $6 = 3A$, so $A = 2$.',
    check: { kind: 'value', expected: '(5*1 + 1)/(1 + 2)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-021',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Solve for the coefficients. The decomposition is', latex: '\\frac{2x^2 + x + 4}{x(x^2 + 4)} =' },
    options: [
      { latex: '\\frac{1}{x} + \\frac{x + 1}{x^2 + 4}', expr: '1/x + (x + 1)/(x^2 + 4)' },
      {
        latex: '\\frac{4}{x} + \\frac{4 - 2x}{x^2 + 4}',
        expr: '4/x + (4 - 2*x)/(x^2 + 4)',
        mistake: 'pf-coefficient-wrong',
        why: 'x = 0 gives 4 = 4A, so A = 1. Keeping A = 4 forces B = 2 − A = −2 from the x² terms, and the constant 4 was also matched to C.',
      },
      {
        latex: '\\frac{1}{x} + \\frac{x + 4}{x^2 + 4}',
        expr: '1/x + (x + 4)/(x^2 + 4)',
        mistake: 'pf-coefficient-wrong',
        why: 'The constant 4 of the numerator was matched to C, but it is already used up by 4A. The x terms give C = 1.',
      },
      {
        latex: '\\frac{1}{x} + \\frac{4}{x^2 + 4}',
        expr: '1/x + 4/(x^2 + 4)',
        mistake: 'pf-constant-over-quadratic',
        why: 'Only a constant numerator was put over x² + 4 (the 4 of the original numerator); the x² and x terms need the linear numerator x + 1.',
      },
      {
        latex: '\\frac{1}{x} + \\frac{x}{x^2 + 4}',
        expr: '1/x + x/(x^2 + 4)',
        mistake: 'algebra-error',
        why: '(Bx + C)·x was expanded as Bx² + C instead of Bx² + Cx, so the constant terms 4 = 4A + C gave C = 0.',
      },
    ],
    correct: 0,
    explanation:
      '$2x^2 + x + 4 = A(x^2 + 4) + (Bx + C)x$. $x = 0$: $4 = 4A$, $A = 1$. $x^2$ terms: $2 = A + B$, $B = 1$. $x$ terms: $C = 1$.',
    check: { kind: 'identity', lhs: '(2*x^2 + x + 4)/(x*(x^2 + 4))' },
    difficulty: 2,
  },
  {
    id: 'pf-f-022',
    topic: 'partial-fractions',
    kind: 'formula',
    prompt: { text: 'Solve for the coefficients, one root at a time. The decomposition is', latex: '\\frac{x^2 + 2x + 3}{x(x - 1)(x + 1)} =' },
    options: [
      { latex: '-\\frac{3}{x} + \\frac{3}{x - 1} + \\frac{1}{x + 1}', expr: '-3/x + 3/(x - 1) + 1/(x + 1)' },
      {
        latex: '\\frac{3}{x} + \\frac{6}{x - 1} + \\frac{1}{x + 1}',
        expr: '3/x + 6/(x - 1) + 1/(x + 1)',
        mistake: 'pf-coefficient-wrong',
        why: 'At x = 1 the numerator is 6 and the other factors give 1 · 2 = 2, so B = 3. The 2 was not divided out; the sign of A was also lost.',
      },
      {
        latex: '\\frac{3}{x} + \\frac{3}{x - 1} + \\frac{1}{x + 1}',
        expr: '3/x + 3/(x - 1) + 1/(x + 1)',
        mistake: 'sign-error',
        why: 'At x = 0 the other factors give (0 − 1)(0 + 1) = −1, so 3 = −A and A = −3. That sign was lost.',
      },
      {
        latex: '\\frac{3}{x} + \\frac{3}{x - 1} - \\frac{1}{x + 1}',
        expr: '3/x + 3/(x - 1) - 1/(x + 1)',
        mistake: 'sign-error',
        why: 'At x = −1 the other factors give (−1)(−1 − 1) = +2, so 2 = 2C and C = 1. The product was taken as −2; the sign of A was also lost.',
      },
      {
        latex: '\\frac{3}{x} + \\frac{3}{x - 1} + \\frac{2}{x + 1}',
        expr: '3/x + 3/(x - 1) + 2/(x + 1)',
        mistake: 'pf-coefficient-wrong',
        why: 'At x = −1 the numerator is 2 and the other factors give (−1)(−2) = 2, so C = 1. The 2 was not divided out; the sign of A was also lost.',
      },
    ],
    correct: 0,
    explanation:
      '$x^2 + 2x + 3 = A(x - 1)(x + 1) + Bx(x + 1) + Cx(x - 1)$. $x = 0$: $3 = -A$. $x = 1$: $6 = 2B$. $x = -1$: $2 = 2C$.',
    check: { kind: 'identity', lhs: '(x^2 + 2*x + 3)/(x*(x - 1)*(x + 1))' },
    domain: [1.5, 3],
    difficulty: 2,
  },

  // ───────────────────────── step 6: integrating single terms ─────────────────────────
  // Sampled where 2x + 5 < 0 (x in [-4, -3]), so the absolute value is really tested.
  {
    id: 'pf-f-023',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{3}{2x + 5}' },
    options: [
      { latex: '\\frac{3}{2}\\ln|2x + 5| + C', expr: '3/2*log(abs(2*x + 5))' },
      {
        latex: '3\\ln|2x + 5| + C',
        expr: '3*log(abs(2*x + 5))',
        mistake: 'pf-missing-1-over-a',
        why: 'With u = 2x + 5, du = 2 dx, so dx = du/2. The factor 1/2 was dropped.',
      },
      {
        latex: '6\\ln|2x + 5| + C',
        expr: '6*log(abs(2*x + 5))',
        mistake: 'du-constant-wrong',
        why: 'This multiplies by 2 instead of dividing: dx = du/2, not 2 du.',
      },
      {
        latex: '3\\ln(2x + 5) + C',
        expr: '3*log(2*x + 5)',
        mistake: 'abs-dropped',
        why: 'ln(2x + 5) is undefined for x < −5/2, where the integrand still exists; the antiderivative needs ln|2x + 5|. The 1/2 was also dropped.',
      },
      {
        latex: '-\\frac{6}{(2x + 5)^2} + C',
        expr: '-6/(2*x + 5)^2',
        mistake: 'differentiated-instead',
        why: 'This is the derivative of 3/(2x + 5), not an antiderivative of it.',
      },
    ],
    correct: 0,
    explanation: '$u = 2x + 5$, $du = 2\\,dx$: $\\int \\frac{3}{2x + 5}\\,dx = \\frac{3}{2}\\int \\frac{du}{u} = \\frac{3}{2}\\ln|2x + 5| + C$.',
    check: { kind: 'antiderivative', integrand: '3/(2*x + 5)' },
    domain: [-4, -3],
    difficulty: 1,
  },
  {
    id: 'pf-f-024',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{4}{(x - 3)^2}' },
    options: [
      { latex: '-\\frac{4}{x - 3} + C', expr: '-4/(x - 3)' },
      {
        latex: '4\\ln|x - 3| + C',
        expr: '4*log(abs(x - 3))',
        mistake: 'pf-power-term-as-ln',
        why: 'Only a first power integrates to a logarithm. 4/(x − 3)² = 4(x − 3)^{−2} needs the power rule.',
      },
      {
        latex: '4\\ln\\left((x - 3)^2\\right) + C',
        expr: '4*log((x - 3)^2)',
        mistake: 'pf-power-term-as-ln',
        why: 'This takes ln of the whole denominator, as if (x − 3)² were a first power; a squared factor needs the power rule.',
      },
      {
        latex: '-\\frac{8}{(x - 3)^3} + C',
        expr: '-8/(x - 3)^3',
        mistake: 'differentiated-instead',
        why: 'This is the derivative of 4(x − 3)^{−2}. Integrating raises the exponent to −1 instead.',
      },
      {
        latex: '-\\frac{4}{3(x - 3)^3} + C',
        expr: '-4/(3*(x - 3)^3)',
        mistake: 'power-rule-int-exponent',
        why: 'The exponent was lowered from −2 to −3 instead of raised to −1.',
      },
      {
        latex: '-\\frac{2}{x - 3} + C',
        expr: '-2/(x - 3)',
        mistake: 'power-rule-int-coefficient',
        why: 'The exponent was raised to −1 correctly, but the division was by the old exponent −2 instead of the new exponent −1.',
      },
    ],
    correct: 0,
    explanation: '$\\int 4(x - 3)^{-2}\\,dx = 4\\cdot\\frac{(x - 3)^{-1}}{-1} + C = -\\frac{4}{x - 3} + C$: a power rule, not a logarithm.',
    check: { kind: 'antiderivative', integrand: '4/(x - 3)^2' },
    difficulty: 1,
  },
  {
    id: 'pf-f-025',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{2x + 2}{x^2 + 1}' },
    options: [
      { latex: '\\ln(x^2 + 1) + 2\\arctan x + C', expr: 'log(x^2 + 1) + 2*arctan(x)' },
      {
        latex: '2\\ln(x^2 + 1) + 2\\arctan x + C',
        expr: '2*log(x^2 + 1) + 2*arctan(x)',
        mistake: 'du-constant-wrong',
        why: 'With u = x² + 1, du = 2x dx is exactly the 2x dx on top, so ∫2x/(x² + 1) dx = ln(x² + 1). The 2 was counted twice.',
      },
      {
        latex: '\\ln(x^2 + 1) + \\arctan x + C',
        expr: 'log(x^2 + 1) + arctan(x)',
        mistake: 'coefficient-mishandled',
        why: 'The constant part is 2/(x² + 1), so it integrates to 2 arctan x. The factor 2 was dropped.',
      },
      {
        latex: '\\frac{1}{2}\\ln(x^2 + 1) + \\arctan x + C',
        expr: '1/2*log(x^2 + 1) + arctan(x)',
        mistake: 'du-constant-wrong',
        why: 'The 1/2 belongs to ∫x/(x² + 1) dx; here the numerator 2x is all of du = 2x dx. The factor 2 on the arctan was dropped as well.',
      },
      {
        latex: '\\ln(x^2 + 1) + \\arctan(2x) + C',
        expr: 'log(x^2 + 1) + arctan(2*x)',
        mistake: 'coefficient-mishandled',
        why: 'The 2 is a factor in front of the arctan: ∫2/(x² + 1) dx = 2 arctan x, not arctan(2x).',
      },
    ],
    correct: 0,
    explanation:
      'Split: $\\frac{2x}{x^2 + 1} + \\frac{2}{x^2 + 1}$. With $u = x^2 + 1$ the first gives $\\ln(x^2 + 1)$; the second gives $2\\arctan x$.',
    check: { kind: 'antiderivative', integrand: '(2*x + 2)/(x^2 + 1)' },
    domain: [-2, 2],
    difficulty: 1,
  },
  {
    id: 'pf-f-026',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{4x}{x^2 + 9}' },
    options: [
      { latex: '2\\ln(x^2 + 9) + C', expr: '2*log(x^2 + 9)' },
      {
        latex: '4\\ln(x^2 + 9) + C',
        expr: '4*log(x^2 + 9)',
        mistake: 'du-constant-wrong',
        why: 'du = 2x dx, so 4x dx = 2 du. The factor 1/2 from du = 2x dx was dropped.',
      },
      {
        latex: '8\\ln(x^2 + 9) + C',
        expr: '8*log(x^2 + 9)',
        mistake: 'du-constant-wrong',
        why: 'This multiplies by 2 instead of dividing: x dx = du/2, not 2 du.',
      },
      {
        latex: '\\ln(x^2 + 9) + C',
        expr: 'log(x^2 + 9)',
        mistake: 'du-constant-wrong',
        why: 'The whole 4x dx was taken as du, but du = 2x dx, so 4x dx = 2 du.',
      },
      {
        latex: '\\frac{4}{3}\\arctan\\frac{x}{3} + C',
        expr: '4/3*arctan(x/3)',
        mistake: 'pf-ln-arctan-swapped',
        why: 'The x part of a numerator gives a logarithm via u = x² + 9; arctan is for a constant numerator over x² + 9.',
      },
    ],
    correct: 0,
    explanation: '$u = x^2 + 9$, $du = 2x\\,dx$, so $4x\\,dx = 2\\,du$: the integral is $2\\ln(x^2 + 9) + C$ (no absolute value needed, since $x^2 + 9 > 0$).',
    check: { kind: 'antiderivative', integrand: '4*x/(x^2 + 9)' },
    domain: [-2, 2],
    difficulty: 1,
  },
  {
    id: 'pf-f-027',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{1}{x^2 + 2x + 5}' },
    options: [
      { latex: '\\frac{1}{2}\\arctan\\frac{x + 1}{2} + C', expr: '1/2*arctan((x + 1)/2)' },
      {
        latex: '\\arctan\\frac{x + 1}{2} + C',
        expr: 'arctan((x + 1)/2)',
        mistake: 'pf-arctan-missing-1-over-k',
        why: 'After completing the square, k = 2, and ∫du/(u² + k²) = (1/k) arctan(u/k). The factor 1/2 was dropped.',
      },
      {
        latex: '\\frac{1}{\\sqrt{5}}\\arctan\\frac{x}{\\sqrt{5}} + C',
        expr: '1/sqrt(5)*arctan(x/sqrt(5))',
        mistake: 'pf-square-not-completed',
        why: 'The 2x term was ignored, treating the denominator as x² + 5. Complete the square first: (x + 1)² + 4.',
      },
      {
        latex: '\\arctan(x + 2) + C',
        expr: 'arctan(x + 2)',
        mistake: 'algebra-error',
        why: 'The square was completed with b = 2 instead of b/2 = 1: (x + 2)² + 1 = x² + 4x + 5, not x² + 2x + 5.',
      },
      {
        latex: '\\ln(x^2 + 2x + 5) + C',
        expr: 'log(x^2 + 2*x + 5)',
        mistake: 'pf-ln-arctan-swapped',
        why: 'A logarithm needs the derivative 2x + 2 on top. With a constant numerator, complete the square and use arctan.',
      },
      {
        latex: '2\\arctan\\frac{x + 1}{2} + C',
        expr: '2*arctan((x + 1)/2)',
        mistake: 'inner-constant-factor-missing',
        why: 'This multiplies by k = 2 instead of dividing by it: ∫du/(u² + 4) = (1/2) arctan(u/2).',
      },
    ],
    correct: 0,
    explanation:
      '$x^2 + 2x + 5 = (x + 1)^2 + 4$. With $u = x + 1$ and $k = 2$: $\\int \\frac{du}{u^2 + 4} = \\frac{1}{2}\\arctan\\frac{x + 1}{2} + C$.',
    check: { kind: 'antiderivative', integrand: '1/(x^2 + 2*x + 5)' },
    domain: [-2, 2],
    difficulty: 2,
  },

  // ───────────────────────── full integrals of decomposed integrands ─────────────────────────
  {
    id: 'pf-f-028',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{3 - x^2}{(x - 1)(x^2 + 1)}' },
    options: [
      { latex: '\\ln|x - 1| - \\ln(x^2 + 1) - 2\\arctan x + C', expr: 'log(abs(x - 1)) - log(x^2 + 1) - 2*arctan(x)' },
      {
        latex: '\\ln|x - 1| - 2\\ln(x^2 + 1) + 2\\arctan x + C',
        expr: 'log(abs(x - 1)) - 2*log(x^2 + 1) + 2*arctan(x)',
        mistake: 'du-constant-wrong',
        why: 'With u = x² + 1, du = 2x dx is exactly the 2x on top, so −∫2x/(x² + 1) dx = −ln(x² + 1). The 2 was counted twice, and the arctan sign was also lost.',
      },
      {
        latex: '\\ln|x - 1| - \\ln(x^2 + 1) + 2\\arctan x + C',
        expr: 'log(abs(x - 1)) - log(x^2 + 1) + 2*arctan(x)',
        mistake: 'sign-error',
        why: '−(2x + 2)/(x² + 1) = −2x/(x² + 1) − 2/(x² + 1). The minus sign was given only to the first piece.',
      },
      {
        latex: '\\ln|x - 1| - \\frac{1}{2}\\ln(x^2 + 1) + 2\\arctan x + C',
        expr: 'log(abs(x - 1)) - 1/2*log(x^2 + 1) + 2*arctan(x)',
        mistake: 'du-constant-wrong',
        why: 'The 1/2 belongs to ∫x/(x² + 1) dx. Here the piece is 2x/(x² + 1), which is exactly du/u. The arctan sign was also lost.',
      },
      {
        latex: '2\\ln|x - 1| - \\frac{3}{2}\\ln(x^2 + 1) - \\arctan x + C',
        expr: '2*log(abs(x - 1)) - 3/2*log(x^2 + 1) - arctan(x)',
        mistake: 'pf-coefficient-wrong',
        why: 'From A = 2 (x = 1 gives 2 = 2A, but the 2 was not divided out), which leads to 2/(x − 1) − (3x + 1)/(x² + 1).',
      },
    ],
    correct: 0,
    explanation:
      'Use the class decomposition $\\frac{1}{x - 1} - \\frac{2x}{x^2 + 1} - \\frac{2}{x^2 + 1}$: the pieces integrate to $\\ln|x - 1|$, $-\\ln(x^2 + 1)$ and $-2\\arctan x$.',
    check: { kind: 'antiderivative', integrand: '(3 - x^2)/((x - 1)*(x^2 + 1))' },
    domain: [1.5, 3],
    difficulty: 2,
    tags: ['class-example'],
  },
  {
    id: 'pf-f-029',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{1}{x^2 - 1}' },
    options: [
      { latex: '\\frac{1}{2}\\ln|x - 1| - \\frac{1}{2}\\ln|x + 1| + C', expr: '1/2*log(abs(x - 1)) - 1/2*log(abs(x + 1))' },
      {
        latex: '\\ln|x - 1| - \\ln|x + 1| + C',
        expr: 'log(abs(x - 1)) - log(abs(x + 1))',
        mistake: 'pf-coefficient-wrong',
        why: 'From 1 = A(x + 1) + B(x − 1), x = 1 gives 1 = 2A, so A = 1/2. The 2 was not divided out.',
      },
      {
        latex: '\\frac{1}{2}\\ln|x + 1| - \\frac{1}{2}\\ln|x - 1| + C',
        expr: '1/2*log(abs(x + 1)) - 1/2*log(abs(x - 1))',
        mistake: 'sign-error',
        why: 'x = 1 gives A = +1/2 for the term over x − 1, and x = −1 gives B = −1/2. The two signs were swapped.',
      },
      {
        latex: '2\\ln|x - 1| - 2\\ln|x + 1| + C',
        expr: '2*log(abs(x - 1)) - 2*log(abs(x + 1))',
        mistake: 'pf-coefficient-wrong',
        why: '1 = 2A was solved as A = 2 instead of A = 1/2.',
      },
      {
        latex: '\\ln|x - 1| + \\ln|x + 1| + C',
        expr: 'log(abs(x - 1)) + log(abs(x + 1))',
        mistake: 'ln-misapplied',
        why: 'This is ln|x² − 1|, the log of the denominator. That would need the derivative 2x on top; decompose instead.',
      },
    ],
    correct: 0,
    explanation:
      '$\\frac{1}{(x - 1)(x + 1)} = \\frac{1/2}{x - 1} - \\frac{1/2}{x + 1}$ ($x = 1$: $1 = 2A$; $x = -1$: $1 = -2B$), which integrates to $\\frac{1}{2}\\ln|x - 1| - \\frac{1}{2}\\ln|x + 1| + C$.',
    check: { kind: 'antiderivative', integrand: '1/(x^2 - 1)' },
    domain: [1.5, 3],
    difficulty: 1,
  },
  {
    id: 'pf-f-030',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{x + 4}{x^2 + 2x}' },
    options: [
      { latex: '2\\ln|x| - \\ln|x + 2| + C', expr: '2*log(abs(x)) - log(abs(x + 2))' },
      {
        latex: '2\\ln|x| + \\ln|x + 2| + C',
        expr: '2*log(abs(x)) + log(abs(x + 2))',
        mistake: 'sign-error',
        why: 'x = −2 gives −2 + 4 = 2 = B(−2), so B = −1. The sign of the −2 was lost.',
      },
      {
        latex: '4\\ln|x| + \\ln|x + 2| + C',
        expr: '4*log(abs(x)) + log(abs(x + 2))',
        mistake: 'pf-coefficient-wrong',
        why: 'x = 0 gives 4 = A(0 + 2) = 2A, so A = 2. The 2 was not divided out; the sign of B was also lost.',
      },
      {
        latex: '\\ln|x| + \\ln|x + 2| + C',
        expr: 'log(abs(x)) + log(abs(x + 2))',
        mistake: 'pf-coefficient-wrong',
        why: 'Matched only the x coefficients (1 = A + B) with A = B = 1 and ignored the constant equation 4 = 2A, which gives A = 2.',
      },
      {
        latex: '2\\ln|x| + 3\\ln|x + 2| + C',
        expr: '2*log(abs(x)) + 3*log(abs(x + 2))',
        mistake: 'pf-coefficient-wrong',
        why: 'B was found by plugging in x = 2 instead of the root x = −2 of the factor x + 2.',
      },
    ],
    correct: 0,
    explanation:
      '$\\frac{x + 4}{x(x + 2)} = \\frac{2}{x} - \\frac{1}{x + 2}$ ($x = 0$: $4 = 2A$; $x = -2$: $2 = -2B$), so the integral is $2\\ln|x| - \\ln|x + 2| + C$.',
    check: { kind: 'antiderivative', integrand: '(x + 4)/(x^2 + 2*x)' },
    difficulty: 1,
  },
  {
    id: 'pf-f-031',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{x^3}{x^2 + 1}' },
    options: [
      { latex: '\\frac{x^2}{2} - \\frac{1}{2}\\ln(x^2 + 1) + C', expr: 'x^2/2 - 1/2*log(x^2 + 1)' },
      {
        latex: '\\frac{x^2}{2} + \\frac{1}{2}\\ln(x^2 + 1) + C',
        expr: 'x^2/2 + 1/2*log(x^2 + 1)',
        mistake: 'sign-error',
        why: 'x³ − x(x² + 1) = −x, so the remainder is −x. Its sign was lost, giving + x/(x² + 1).',
      },
      {
        latex: '\\frac{x^2}{2} + \\ln(x^2 + 1) + C',
        expr: 'x^2/2 + log(x^2 + 1)',
        mistake: 'du-constant-wrong',
        why: 'With u = x² + 1, x dx = du/2, so ∫x/(x² + 1) dx = (1/2) ln(x² + 1). The 1/2 was dropped, and the remainder sign was also lost.',
      },
      {
        latex: '\\frac{x^2}{2} + \\arctan x + C',
        expr: 'x^2/2 + arctan(x)',
        mistake: 'pf-division-wrong',
        why: 'x(x² + 1) was multiplied out as x³ + 1, giving the remainder −1 instead of −x. The remainder sign was also lost.',
      },
      {
        latex: 'x^2 + \\frac{1}{2}\\ln(x^2 + 1) + C',
        expr: 'x^2 + 1/2*log(x^2 + 1)',
        mistake: 'power-rule-int-coefficient',
        why: '∫x dx = x²/2. The division by the new exponent 2 was skipped, and the remainder sign was also lost.',
      },
    ],
    correct: 0,
    explanation:
      'Divide first: $\\frac{x^3}{x^2 + 1} = x - \\frac{x}{x^2 + 1}$. Then $\\int x\\,dx = \\frac{x^2}{2}$ and $\\int \\frac{x}{x^2 + 1}\\,dx = \\frac{1}{2}\\ln(x^2 + 1)$.',
    check: { kind: 'antiderivative', integrand: 'x^3/(x^2 + 1)' },
    domain: [-2, 2],
    difficulty: 2,
  },
  {
    id: 'pf-f-032',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{x + 3}{(x + 1)^2}' },
    options: [
      { latex: '\\ln|x + 1| - \\frac{2}{x + 1} + C', expr: 'log(abs(x + 1)) - 2/(x + 1)' },
      {
        latex: '\\ln|x + 1| + \\frac{2}{x + 1} + C',
        expr: 'log(abs(x + 1)) + 2/(x + 1)',
        mistake: 'sign-error',
        why: '∫2(x + 1)^{−2} dx = 2(x + 1)^{−1}/(−1). The minus sign from dividing by −1 was lost.',
      },
      {
        latex: '\\ln|x + 1| + \\frac{1}{x + 1} + C',
        expr: 'log(abs(x + 1)) + 1/(x + 1)',
        mistake: 'power-rule-int-coefficient',
        why: '∫2(x + 1)^{−2} dx was divided by the old exponent 2 instead of the new exponent −1, and the minus sign was lost.',
      },
      {
        latex: '2\\ln|x + 1| + \\frac{2}{x + 1} + C',
        expr: '2*log(abs(x + 1)) + 2/(x + 1)',
        mistake: 'pf-coefficient-wrong',
        why: 'Plugging in x = −1 only gives B = 2; A comes from the x terms (x = Ax, so A = 1). The minus sign from the power rule was lost as well.',
      },
      {
        latex: '\\ln|x + 1| + 2\\ln|x + 1| + C',
        expr: 'log(abs(x + 1)) + 2*log(abs(x + 1))',
        mistake: 'pf-power-term-as-ln',
        why: '2/(x + 1)² was integrated like the first-power term, giving 2 ln|x + 1|. For n = 2 the power rule gives −2/(x + 1).',
      },
    ],
    correct: 0,
    explanation:
      '$\\frac{x + 3}{(x + 1)^2} = \\frac{1}{x + 1} + \\frac{2}{(x + 1)^2}$. The first term gives $\\ln|x + 1|$; the power term gives $2\\cdot\\frac{(x + 1)^{-1}}{-1} = -\\frac{2}{x + 1}$.',
    check: { kind: 'antiderivative', integrand: '(x + 3)/(x + 1)^2' },
    difficulty: 2,
  },
  {
    id: 'pf-f-033',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    prompt: { latex: '\\frac{1}{x^2(x + 1)}' },
    options: [
      { latex: '-\\ln|x| - \\frac{1}{x} + \\ln|x + 1| + C', expr: '-log(abs(x)) - 1/x + log(abs(x + 1))' },
      {
        latex: '\\ln|x| - \\frac{1}{x} + \\ln|x + 1| + C',
        expr: 'log(abs(x)) - 1/x + log(abs(x + 1))',
        mistake: 'sign-error',
        why: 'The x² terms give A + C = 0, so A = −C = −1. The sign was dropped, giving A = +1.',
      },
      {
        latex: '\\ln|x| - \\frac{1}{x} - \\ln|x + 1| + C',
        expr: 'log(abs(x)) - 1/x - log(abs(x + 1))',
        mistake: 'negative-squared-wrong',
        why: 'At x = −1 the C term is C(−1)² = C, so C = 1. Taking (−1)² = −1 gives C = −1, and then A = −C = 1.',
      },
      {
        latex: '-\\ln|x| + \\frac{1}{x} + \\ln|x + 1| + C',
        expr: '-log(abs(x)) + 1/x + log(abs(x + 1))',
        mistake: 'sign-error',
        why: '∫x^{−2} dx = x^{−1}/(−1) = −1/x. The minus sign from dividing by −1 was lost.',
      },
      {
        latex: '-\\frac{1}{x} + \\ln|x + 1| + C',
        expr: '-1/x + log(abs(x + 1))',
        mistake: 'pf-missing-repeated-power',
        why: 'The form B/x² + C/(x + 1) skips the A/x term that x² needs. Solving it gives 1/x² + 1/(x + 1), which is not the fraction.',
      },
    ],
    correct: 0,
    explanation:
      '$\\frac{1}{x^2(x + 1)} = -\\frac{1}{x} + \\frac{1}{x^2} + \\frac{1}{x + 1}$ ($x = 0$: $B = 1$; $x = -1$: $C = 1$; $x^2$ terms: $A = -C$), so the integral is $-\\ln|x| - \\frac{1}{x} + \\ln|x + 1| + C$.',
    check: { kind: 'antiderivative', integrand: '1/(x^2*(x + 1))' },
    difficulty: 2,
  },
  {
    id: 'pf-f-034',
    topic: 'partial-fractions',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^1 \\frac{x}{x + 1}\\,dx' },
    options: [
      { latex: '1 - \\ln 2', expr: '1 - log(2)' },
      {
        latex: '\\ln 2',
        expr: 'log(2)',
        mistake: 'pf-improper-not-divided',
        why: 'x/(x + 1) was integrated as ln|x + 1|, as if the numerator were 1. It is improper (degree 1 over 1) and must be divided first.',
      },
      {
        latex: '1 + \\ln 2',
        expr: '1 + log(2)',
        mistake: 'sign-error',
        why: 'x/(x + 1) = 1 − 1/(x + 1). The minus sign on the remainder was lost.',
      },
      {
        latex: '\\ln 2 - 1',
        expr: 'log(2) - 1',
        mistake: 'ftc-order-swapped',
        why: 'This is F(0) − F(1) instead of F(1) − F(0) for F(x) = x − ln|x + 1|.',
      },
      {
        latex: '-\\ln 2',
        expr: '-log(2)',
        mistake: 'pf-division-wrong',
        why: 'The quotient 1 from the division was dropped, so only −∫1/(x + 1) dx was kept.',
      },
    ],
    correct: 0,
    explanation: 'Divide first: $\\frac{x}{x + 1} = 1 - \\frac{1}{x + 1}$, so the integral is $\\big[x - \\ln|x + 1|\\big]_0^1 = 1 - \\ln 2$.',
    check: { kind: 'definite-integral', integrand: 'x/(x + 1)', lower: '0', upper: '1' },
    difficulty: 1,
  },
  {
    id: 'pf-f-035',
    topic: 'partial-fractions',
    kind: 'technique',
    prompt: { text: 'Which integral calls for a partial-fraction decomposition? (Each of the others has a one-step method.)' },
    options: [
      { latex: '\\int \\frac{1}{x^2 - 4}\\,dx' },
      {
        latex: '\\int \\frac{1}{x^2 + 4}\\,dx',
        mistake: 'technique-wrong',
        why: 'x² + 4 is irreducible, so there is nothing to split. It is already the arctan form: (1/2) arctan(x/2).',
      },
      {
        latex: '\\int \\frac{x}{x^2 + 4}\\,dx',
        mistake: 'technique-wrong',
        why: 'The numerator is half the derivative of x² + 4, so u = x² + 4 gives (1/2) ln(x² + 4) in one step.',
      },
      {
        latex: '\\int \\frac{x}{x^2 - 4}\\,dx',
        mistake: 'technique-wrong',
        why: 'u = x² − 4, du = 2x dx handles it in one step: (1/2) ln|x² − 4|. Decomposing works but is not needed.',
      },
      {
        latex: '\\int \\frac{1}{(x - 4)^2}\\,dx',
        mistake: 'technique-wrong',
        why: 'A single power of a linear factor is already a partial fraction: the power rule gives −1/(x − 4).',
      },
    ],
    correct: 0,
    explanation:
      '$x^2 - 4 = (x - 2)(x + 2)$ and the numerator is not a multiple of its derivative, so it must be split: $\\frac{1/4}{x - 2} - \\frac{1/4}{x + 2}$.',
    check: { kind: 'none', reason: 'technique recognition (which integrand needs a decomposition)' },
    difficulty: 1,
  },
];

// ───────────────────────── generators ─────────────────────────

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

/** LaTeX for the positive fraction n/d in lowest terms (d > 0); a whole number is printed bare. */
function fracTex(n: number, d: number): string {
  const g = gcd(n, d);
  const nn = n / g;
  const dd = d / g;
  return dd === 1 ? `${nn}` : `\\frac{${nn}}{${dd}}`;
}

/** Coefficient in front of a function: 1 is omitted. */
function coefTex(n: number): string {
  return n === 1 ? '' : `${n}`;
}

// ∫ A/(b − a x) dx = −(A/a) ln|b − a x| + C. Rows [A, a, b] with gcd(A, a) = 1 and a ≥ 2, so A/a never
// simplifies to a whole number and every option keeps its shape. Sampled on x > b/a, where b − a x < 0.
const LINEAR_TERM: [number, number, number][] = [
  [1, 2, 5], [3, 2, 7], [2, 3, 1], [5, 2, 3], [1, 3, 2], [4, 3, 2], [3, 4, 1], [5, 3, 4], [1, 4, 3], [2, 5, 3],
  [7, 2, 9], [5, 4, 3], [4, 5, 2], [1, 5, 2], [7, 3, 5], [3, 5, 4], [2, 7, 5], [5, 6, 1], [7, 4, 3], [6, 5, 4],
];

// ∫ A/(a x + b)² dx with A = m·a, so the answer −m/(a x + b) has a whole-number coefficient m ≥ 2. Rows [m, a, b], b > 0.
const POWER_TERM: [number, number, number][] = [
  [2, 1, 1], [3, 2, 1], [2, 3, 1], [3, 1, 2], [5, 1, 4], [2, 5, 1], [4, 2, 3], [3, 3, 2], [5, 2, 1], [4, 1, 5],
  [2, 4, 3], [3, 4, 1], [5, 3, 1], [4, 3, 5], [6, 1, 2], [2, 2, 5], [3, 5, 2], [6, 5, 1], [5, 4, 3], [7, 2, 3],
];

// ∫ A/(x² + k²) dx = (A/k) arctan(x/k) + C. Rows [A, k] with gcd(A, k) = 1, so A/k and A/k² are in lowest terms.
const ARCTAN_TERM: [number, number][] = [
  [1, 2], [3, 2], [1, 3], [2, 3], [4, 3], [1, 4], [3, 4], [5, 2], [1, 5], [2, 5],
  [3, 5], [4, 5], [5, 4], [7, 2], [7, 3], [6, 5], [1, 6], [5, 6], [7, 4], [7, 5],
];

export const generators: FlashGenerator[] = [
  {
    id: 'pf-g-linear-term',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    describe: '∫ A/(b − a x) dx for small integers: the factor 1/a and its sign (u = b − a x, du = −a dx)',
    generate(seed) {
      const [A, a, b] = LINEAR_TERM[(((seed - 1) % LINEAR_TERM.length) + LINEAR_TERM.length) % LINEAR_TERM.length];
      const lin = `${b} - ${a}x`;
      const linE = `${b} - ${a}*x`;
      const k = fracTex(A, a);
      return {
        id: `pf-g-linear-term:${seed}`,
        topic: 'partial-fractions',
        kind: 'antiderivative',
        prompt: { latex: `\\frac{${A}}{${lin}}` },
        options: [
          { latex: `-${k}\\ln|${lin}| + C`, expr: `-${A}/${a}*log(abs(${linE}))` },
          {
            latex: `${k}\\ln|${lin}| + C`,
            expr: `${A}/${a}*log(abs(${linE}))`,
            mistake: 'sign-error',
            why: `d/dx(${b} − ${a}x) = −${a}, so dividing by it brings a minus sign. That sign was lost.`,
          },
          {
            latex: `${coefTex(A)}\\ln|${lin}| + C`,
            expr: `${A}*log(abs(${linE}))`,
            mistake: 'pf-missing-1-over-a',
            why: `With u = ${b} − ${a}x, du = −${a} dx, so dx = du/(−${a}). The factor 1/(−${a}) was dropped.`,
          },
          {
            latex: `-${A * a}\\ln|${lin}| + C`,
            expr: `-${A * a}*log(abs(${linE}))`,
            mistake: 'du-constant-wrong',
            why: `This multiplies by −${a} instead of dividing by it: dx = du/(−${a}), not −${a} du.`,
          },
          {
            latex: `\\frac{${A * a}}{(${lin})^2} + C`,
            expr: `${A * a}/(${linE})^2`,
            mistake: 'differentiated-instead',
            why: `This is the derivative of ${A}/(${b} − ${a}x), not an antiderivative of it.`,
          },
        ],
        correct: 0,
        explanation: `$u = ${lin}$, $du = -${a}\\,dx$: $\\int \\frac{${A}}{${lin}}\\,dx = -\\frac{1}{${a}}\\int \\frac{${A}}{u}\\,du = -${k}\\ln|${lin}| + C$.`,
        check: { kind: 'antiderivative', integrand: `${A}/(${linE})` },
        domain: [b / a + 0.5, b / a + 1.5],
        difficulty: 1,
      };
    },
  },
  {
    id: 'pf-g-power-term',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    describe: '∫ A/(a x + b)² dx for small integers: a repeated-factor term needs the power rule, not ln',
    generate(seed) {
      const [m, a, b] = POWER_TERM[(((seed - 1) % POWER_TERM.length) + POWER_TERM.length) % POWER_TERM.length];
      const A = m * a;
      const lin = `${a === 1 ? '' : a}x + ${b}`;
      const linE = `${a}*x + ${b}`;
      const inner = a === 1 ? `${A}\\cdot\\frac{(${lin})^{-1}}{-1}` : `\\frac{${A}}{${a}}\\cdot\\frac{(${lin})^{-1}}{-1}`;
      return {
        id: `pf-g-power-term:${seed}`,
        topic: 'partial-fractions',
        kind: 'antiderivative',
        prompt: { latex: `\\frac{${A}}{(${lin})^2}` },
        options: [
          { latex: `-\\frac{${m}}{${lin}} + C`, expr: `-${m}/(${linE})` },
          {
            latex: `${m}\\ln|${lin}| + C`,
            expr: `${m}*log(abs(${linE}))`,
            mistake: 'pf-power-term-as-ln',
            why: `Only a first power integrates to a logarithm. ${A}/(${lin})² is a power, so use the power rule with exponent −2.`,
          },
          {
            latex: `${m}\\ln\\left((${lin})^2\\right) + C`,
            expr: `${m}*log((${linE})^2)`,
            mistake: 'pf-power-term-as-ln',
            why: `This takes ln of the whole denominator, as if (${lin})² were a first power; a squared factor needs the power rule.`,
          },
          {
            latex: `-\\frac{${2 * A * a}}{(${lin})^3} + C`,
            expr: `-${2 * A * a}/(${linE})^3`,
            mistake: 'differentiated-instead',
            why: `This is the derivative of ${A}/(${lin})², not an antiderivative: the exponent went down to −3.`,
          },
          {
            latex: `-\\frac{${m}}{3(${lin})^3} + C`,
            expr: `-${m}/(3*(${linE})^3)`,
            mistake: 'power-rule-int-exponent',
            why: 'The exponent was lowered from −2 to −3 instead of raised to −1.',
          },
        ],
        correct: 0,
        explanation: `Power rule with $u = ${lin}$: $\\int ${A}(${lin})^{-2}\\,dx = ${inner} + C = -\\frac{${m}}{${lin}} + C$.`,
        check: { kind: 'antiderivative', integrand: `${A}/(${linE})^2` },
        difficulty: 1,
      };
    },
  },
  {
    id: 'pf-g-arctan-term',
    topic: 'partial-fractions',
    kind: 'antiderivative',
    describe: '∫ A/(x² + k²) dx for small integers: (A/k) arctan(x/k), with k the square root of the constant',
    generate(seed) {
      const [A, k] = ARCTAN_TERM[(((seed - 1) % ARCTAN_TERM.length) + ARCTAN_TERM.length) % ARCTAN_TERM.length];
      const k2 = k * k;
      return {
        id: `pf-g-arctan-term:${seed}`,
        topic: 'partial-fractions',
        kind: 'antiderivative',
        prompt: { latex: `\\frac{${A}}{x^2 + ${k2}}` },
        options: [
          { latex: `\\frac{${A}}{${k}}\\arctan\\frac{x}{${k}} + C`, expr: `${A}/${k}*arctan(x/${k})` },
          {
            latex: `${coefTex(A)}\\arctan\\frac{x}{${k}} + C`,
            expr: `${A}*arctan(x/${k})`,
            mistake: 'pf-arctan-missing-1-over-k',
            why: `∫dx/(x² + k²) = (1/k) arctan(x/k) with k = ${k}. The factor 1/${k} was dropped.`,
          },
          {
            latex: `\\frac{${A}}{${k2}}\\arctan\\frac{x}{${k2}} + C`,
            expr: `${A}/${k2}*arctan(x/${k2})`,
            mistake: 'sqrt-constant-not-rooted',
            why: `Here k was taken to be ${k2}. But k² = ${k2}, so k = √${k2} = ${k}.`,
          },
          {
            latex: `\\frac{${A}}{${k2}}\\arctan\\frac{x}{${k}} + C`,
            expr: `${A}/${k2}*arctan(x/${k})`,
            mistake: 'formula-wrong-power',
            why: `The formula divides by k = ${k}, not by k² = ${k2}.`,
          },
          {
            latex: `${coefTex(A)}\\ln(x^2 + ${k2}) + C`,
            expr: `${A}*log(x^2 + ${k2})`,
            mistake: 'pf-ln-arctan-swapped',
            why: 'A constant numerator over x² + k² gives arctan. A logarithm would need 2x on top.',
          },
        ],
        correct: 0,
        explanation: `$k^2 = ${k2}$, so $k = ${k}$: $\\int \\frac{${A}}{x^2 + ${k2}}\\,dx = \\frac{${A}}{${k}}\\arctan\\frac{x}{${k}} + C$.`,
        check: { kind: 'antiderivative', integrand: `${A}/(x^2 + ${k2})` },
        domain: [-2, 2],
        difficulty: 1,
      };
    },
  },
];
