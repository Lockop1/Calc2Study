import type { Card } from '../types';

/** Cards for topic "partial-fractions" (category 'Partial Fractions'). Authored by content-author; verified by math-verifier. */
export const partialFractionCards: Card[] = [
  // ── The procedure (overview), then one card per fact, in the order the procedure uses them ──
  {
    id: 'card-partial-fractions-01',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'Partial fractions for ${R = \\frac{p}{s}}$: the six steps, in order?' },
    back: {
      latex:
        '\\begin{array}{l}' +
        '\\text{1. Proper? } (\\deg p < \\deg s) \\\\ ' +
        '\\text{2. If not, long division:} \\\\ ' +
        '\\qquad \\dfrac{p}{s} = q + \\dfrac{r}{s} \\\\ ' +
        '\\text{3. Factor } s \\text{ completely} \\\\ ' +
        '\\text{4. Write the decomposition} \\\\ ' +
        '\\text{5. Solve for the coefficients} \\\\ ' +
        '\\text{6. Integrate each term}' +
        '\\end{array}',
    },
    check: { kind: 'none', reason: 'procedure (an ordered list of steps), not a formula' },
  },

  // ── Step 1: proper or improper ──
  {
    id: 'card-partial-fractions-02',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'When is a rational function ${R = \\frac{p}{s}}$ proper? When is it improper?' },
    back: {
      latex: '\\begin{array}{l}\\text{proper: } \\deg p < \\deg s \\\\ \\text{improper: } \\deg p \\ge \\deg s\\end{array}',
    },
    check: { kind: 'none', reason: 'definition (a degree comparison), not an expression' },
  },

  // ── Step 3: factor completely (when does a quadratic not factor?) ──
  {
    id: 'card-partial-fractions-03',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'When is the quadratic ${ax^2 + bx + c}$ irreducible (no real linear factors)?' },
    back: { latex: 'b^2 - 4ac < 0' },
    check: { kind: 'none', reason: 'criterion (an inequality on the discriminant), not an expression' },
  },

  // ── Step 4: the four decomposition forms ──
  {
    id: 'card-partial-fractions-04',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'Linear factor ${ax + b}$ in the denominator: which decomposition term?' },
    back: { latex: '\\frac{A}{ax + b}' },
    check: { kind: 'none', reason: 'decomposition form (the constant A is solved for in each problem)' },
  },
  {
    id: 'card-partial-fractions-05',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'Repeated linear factor ${(ax + b)^n}$: which decomposition terms?' },
    back: {
      latex: '\\begin{aligned}&\\frac{A_1}{ax + b} + \\frac{A_2}{(ax + b)^2} \\\\ &+ \\cdots + \\frac{A_n}{(ax + b)^n}\\end{aligned}',
      also: '\\displaystyle\\sum_{k=1}^{n} \\frac{A_k}{(ax + b)^k}',
    },
    check: { kind: 'none', reason: 'decomposition form (one term per power; the constants are solved for in each problem)' },
  },
  {
    id: 'card-partial-fractions-06',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'Irreducible quadratic factor ${ax^2 + bx + c}$: which decomposition term?' },
    back: { latex: '\\frac{Ax + B}{ax^2 + bx + c}' },
    check: { kind: 'none', reason: 'decomposition form (A and B are solved for in each problem)' },
  },
  {
    id: 'card-partial-fractions-07',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'Repeated irreducible quadratic ${(ax^2 + bx + c)^n}$: which decomposition terms?' },
    back: {
      latex:
        '\\begin{aligned}&\\frac{A_1x + B_1}{ax^2 + bx + c} \\\\ ' +
        '&+ \\frac{A_2x + B_2}{(ax^2 + bx + c)^2} \\\\ ' +
        '&+ \\cdots + \\frac{A_nx + B_n}{(ax^2 + bx + c)^n}\\end{aligned}',
      also: '\\displaystyle\\sum_{k=1}^{n} \\frac{A_kx + B_k}{(ax^2 + bx + c)^k}',
    },
    check: { kind: 'none', reason: 'decomposition form (one term for each power k = 1, ..., n)' },
  },

  // ── Step 5: solving for the coefficients ──
  {
    id: 'card-partial-fractions-08',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'formula',
    front: { text: 'After multiplying out by the denominator, how do you find the coefficients, in order?' },
    back: {
      latex:
        '\\begin{array}{l}' +
        'x = \\text{roots of linear factors} \\\\ ' +
        '\\text{then } x = 0 \\\\ ' +
        '\\text{then equate coefficients}' +
        '\\end{array}',
    },
    check: { kind: 'none', reason: 'procedure (the order of substitutions), not a formula' },
  },
  // Class example: x = 1 gives A = 1, x = 0 gives C = -2, the x^2 coefficient gives B = -2.
  // Sampled on [1.5, 3], away from the pole at x = 1.
  {
    id: 'card-partial-fractions-09',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'identity',
    front: { text: 'Decompose (class example):', latex: '\\frac{3 - x^2}{(x - 1)(x^2 + 1)}' },
    back: { latex: '\\frac{1}{x - 1} - \\frac{2x + 2}{x^2 + 1}', expr: '1/(x - 1) - (2*x + 2)/(x^2 + 1)' },
    check: { kind: 'identity', lhs: '(3 - x^2)/((x - 1)*(x^2 + 1))' },
    domain: [1.5, 3],
  },

  // ── Step 6: integrating each term ──
  // Sampled where ax + b < 0 (x in [-4, -2], a in [1, 2], b in [0.25, 1]), so the absolute value is really tested.
  {
    id: 'card-partial-fractions-10',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'antiderivative',
    front: { latex: '\\frac{A}{ax+b}' },
    back: { latex: '\\frac{A}{a}\\ln|ax+b| + C', expr: 'A/a*log(abs(a*x+b)) + C' },
    check: { kind: 'antiderivative', integrand: 'A/(a*x+b)' },
    domain: { x: [-4, -2], a: [1, 2], b: [0.25, 1], A: [0.5, 2] },
  },
  // Power rule with u = ax + b. The formula holds for every real n > 1 when ax + b > 0, so n is
  // sampled on [2, 4] with x, a, b, A on the default [0.25, 1.25] (ax + b > 0 there).
  {
    id: 'card-partial-fractions-11',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'antiderivative',
    // the braces keep KaTeX from breaking the line after the relation sign
    front: { text: 'Repeated linear term, ${n \\ge 2}$:', latex: '\\frac{A}{(ax+b)^n}' },
    back: { latex: '-\\frac{A}{a(n-1)(ax+b)^{n-1}} + C', expr: '-A/(a*(n-1)*(a*x+b)^(n-1)) + C' },
    check: { kind: 'antiderivative', integrand: 'A/(a*x+b)^n' },
    domain: { n: [2, 4] },
  },
  // The B part of the split (with B = 1). Both signs of x are sampled; k > 0.
  {
    id: 'card-partial-fractions-12',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'antiderivative',
    front: { latex: '\\frac{1}{x^2 + k^2}' },
    back: { latex: '\\frac{1}{k}\\arctan\\left(\\frac{x}{k}\\right) + C', expr: '1/k*arctan(x/k) + C' },
    check: { kind: 'antiderivative', integrand: '1/(x^2 + k^2)' },
    domain: { x: [-2, 2], k: [0.5, 2] },
  },
  // The Ax part of the split: u = x^2 + k^2, du = 2x dx (no absolute value needed, x^2 + k^2 > 0).
  // The combined answer (A/2) ln(x^2 + k^2) + (B/k) arctan(x/k) + C is wider than a 390 px screen
  // on one line, so the split is stated on the front and the arctan part is the card above.
  {
    id: 'card-partial-fractions-13',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'antiderivative',
    front: {
      text: 'Split $\\frac{Ax + B}{x^2 + k^2}$: the $B$ part gives an $\\arctan$. The $Ax$ part?',
      latex: '\\frac{Ax}{x^2 + k^2}',
    },
    back: { latex: '\\frac{A}{2}\\ln(x^2 + k^2) + C', expr: 'A/2*log(x^2 + k^2) + C' },
    check: { kind: 'antiderivative', integrand: 'A*x/(x^2 + k^2)' },
    domain: { x: [-2, 2], k: [0.5, 2], A: [-2, 2] },
  },
  // When b is not 0: complete the square, then u = x + b/2 gives u^2 + k^2 with k^2 = c - b^2/4 > 0
  // (positive exactly because b^2 - 4c < 0). The algebraic identity holds for all x, b, c.
  {
    id: 'card-partial-fractions-14',
    category: 'Partial Fractions',
    section: 'partial-fractions',
    kind: 'identity',
    front: { text: 'Irreducible with ${b \\neq 0}$: complete the square first.', latex: 'x^2 + bx + c' },
    back: {
      latex: '\\left(x + \\frac{b}{2}\\right)^2 + c - \\frac{b^2}{4}',
      also: '\\left(x + \\frac{b}{2}\\right)^2 + \\frac{4c - b^2}{4}',
      expr: '(x + b/2)^2 + c - b^2/4',
    },
    check: { kind: 'identity', lhs: 'x^2 + b*x + c' },
  },
];
