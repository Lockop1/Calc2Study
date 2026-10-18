import type { Card } from '../types';

/** Cards for topic "sequences" (category 'Sequences'). Authored by content-author; verified by math-verifier. */
export const sequenceCards: Card[] = [
  // ── Notation, convergence, closed forms ──
  {
    id: 'card-sequences-01',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'What does it mean for $\\{a_n\\}_{n=1}^{\\infty} = a_1, a_2, a_3, \\ldots$ to converge?' },
    back: {
      latex: '\\begin{aligned} &\\lim_{n\\to\\infty} a_n = L \\text{ for a finite } L \\\\ &\\text{(otherwise it diverges)} \\end{aligned}',
      also: 'a_n \\to L \\text{ as } n \\to \\infty',
    },
    check: { kind: 'none', reason: 'definition of convergence (no numeric content)' },
  },
  {
    id: 'card-sequences-02',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Arithmetic sequence (first term $a$, common difference $d$): closed form for $a_n$?' },
    back: { latex: 'a_n = a + (n-1)d', also: 'a,\\ a + d,\\ a + 2d,\\ \\ldots' },
    check: { kind: 'none', reason: 'symbolic closed form with parameters a and d' },
  },
  {
    id: 'card-sequences-03',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Geometric sequence (first term $a$, common ratio $r$): closed form for $a_n$?' },
    back: { latex: 'a_n = a\\cdot r^{n-1}', also: '\\{a\\cdot r^{n}\\}_{n=0}^{\\infty} = a,\\ ar,\\ ar^2,\\ \\ldots' },
    check: { kind: 'none', reason: 'symbolic closed form with parameters a and r' },
  },
  {
    id: 'card-sequences-04',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'For which $r$ does $\\{r^n\\}$ converge, and to what limit?' },
    back: {
      latex: '\\begin{aligned} |r| < 1 &:\\ r^n \\to 0 \\\\ r = 1 &:\\ r^n \\to 1 \\\\ r = -1 \\text{ or } |r| > 1 &:\\ \\text{diverges} \\end{aligned}',
      also: '\\text{converges} \\iff -1 < r \\le 1',
    },
    check: { kind: 'none', reason: 'rule with a symbolic parameter r (cases |r| < 1, r = 1, r = -1, |r| > 1)' },
  },
  // class example: 2^(2n+1)/3^n = 2(4/3)^n; the term is checked in the rewritten form because
  // 2^(2n+1) and 3^n overflow at n = 10^3 (the rewrite is plain algebra: 2^(2n+1) = 2·4^n)
  {
    id: 'card-sequences-05',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Converge or diverge?', latex: '\\left\\{\\frac{2^{2n+1}}{3^n}\\right\\}_{n=1}^{\\infty}' },
    back: {
      latex: '\\begin{aligned} &\\frac{2^{2n+1}}{3^n} = 2\\cdot\\left(\\frac{4}{3}\\right)^n \\\\ &r = \\frac{4}{3} > 1 \\Rightarrow \\text{diverges} \\end{aligned}',
    },
    check: { kind: 'limit', term: '2*(4/3)^n', variable: 'n', limit: 'infinity' },
    variable: 'n',
  },

  // ── From functions to sequences; limits to know (x → ∞) ──
  {
    id: 'card-sequences-06',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Underlying Function Theorem? (what lets you use L’Hôpital’s rule on $f(x)$)' },
    back: {
      latex: '\\begin{aligned} &\\text{If } f(n) = a_n \\text{ for all } n \\\\ &\\text{and } \\lim_{x\\to\\infty} f(x) = L, \\\\ &\\text{then } \\lim_{n\\to\\infty} a_n = L \\end{aligned}',
    },
    check: { kind: 'none', reason: 'theorem (hypotheses and conclusion); verified by math-verifier' },
  },
  {
    id: 'card-sequences-07',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Limits to know: $\\lim_{x\\to\\infty} \\sin x$ and $\\lim_{x\\to\\infty} \\cos x$?' },
    back: { latex: '\\text{DNE (both oscillate)}' },
    check: { kind: 'limit', term: 'sin(x)', variable: 'x', limit: 'dne' },
  },
  {
    id: 'card-sequences-08',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'For $a > 0$:', latex: '\\lim_{x\\to\\infty} a^x = \\,?' },
    back: { latex: '\\begin{aligned} a > 1 &:\\ \\infty \\\\ a = 1 &:\\ 1 \\\\ 0 < a < 1 &:\\ 0 \\end{aligned}' },
    check: { kind: 'none', reason: 'rule with a symbolic parameter a (cases a > 1, a = 1, 0 < a < 1)' },
  },
  {
    id: 'card-sequences-09',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { latex: '\\lim_{x\\to\\infty} \\ln x = \\,?' },
    back: { latex: '\\infty' },
    check: { kind: 'limit', term: 'log(x)', variable: 'x', limit: 'infinity' },
  },
  {
    id: 'card-sequences-10',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: {
      text: 'Rational function by degrees (top degree $m$, bottom degree $k$, leading coefficients $a, b$):',
      latex: '\\lim_{x\\to\\infty} \\frac{a x^m + \\cdots}{b x^k + \\cdots} = \\,?',
    },
    back: {
      latex: '\\begin{aligned} m < k &:\\ 0 \\\\ m = k &:\\ \\frac{a}{b} \\\\ m > k &:\\ \\pm\\infty\\ (\\text{sign of } \\tfrac{a}{b}) \\end{aligned}',
    },
    check: { kind: 'none', reason: 'rule with symbolic degrees m, k and leading coefficients a, b' },
  },
  {
    id: 'card-sequences-11',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { latex: '\\lim_{x\\to\\infty} \\arctan x = \\,?' },
    back: { latex: '\\frac{\\pi}{2}', expr: 'pi/2' },
    check: { kind: 'limit', term: 'arctan(x)', variable: 'x', limit: 'pi/2' },
  },
  {
    id: 'card-sequences-12',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { latex: '\\lim_{x\\to\\infty} \\left(1 + \\frac{1}{x}\\right)^x = \\,?' },
    back: { latex: 'e', expr: 'e' },
    check: { kind: 'limit', term: '(1+1/x)^x', variable: 'x', limit: 'e' },
  },

  // ── Limit theorems ──
  {
    id: 'card-sequences-13',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Continuous Function Theorem for sequences?' },
    back: {
      latex: '\\begin{aligned} &\\text{If } \\lim_{n\\to\\infty} a_n = L \\\\ &\\text{and } f \\text{ is continuous at } L, \\\\ &\\text{then } \\lim_{n\\to\\infty} f(a_n) = f(L) \\end{aligned}',
      also: '\\lim_{n\\to\\infty} f(a_n) = f\\left(\\lim_{n\\to\\infty} a_n\\right)',
    },
    check: { kind: 'none', reason: 'theorem (hypotheses and conclusion); verified by math-verifier' },
  },
  {
    id: 'card-sequences-14',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Squeeze Theorem for sequences?' },
    back: {
      latex: '\\begin{aligned} &\\text{If } a_n \\le b_n \\le c_n \\text{ for } n \\ge N \\\\ &\\text{and } \\lim_{n\\to\\infty} a_n = \\lim_{n\\to\\infty} c_n = L, \\\\ &\\text{then } \\lim_{n\\to\\infty} b_n = L \\end{aligned}',
    },
    check: { kind: 'none', reason: 'theorem (hypotheses and conclusion); verified by math-verifier' },
  },
  {
    id: 'card-sequences-15',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Corollary of the Squeeze Theorem (about $|a_n|$)?' },
    back: {
      latex: '\\begin{aligned} &\\text{If } \\lim_{n\\to\\infty} |a_n| = 0, \\\\ &\\text{then } \\lim_{n\\to\\infty} a_n = 0 \\end{aligned}',
    },
    check: { kind: 'none', reason: 'theorem (corollary of the Squeeze Theorem); verified by math-verifier' },
  },
  {
    id: 'card-sequences-16',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Use the Squeeze corollary:', latex: '\\lim_{n\\to\\infty} \\frac{(-1)^n}{n} = \\,?' },
    back: { latex: '0', expr: '0' },
    check: { kind: 'limit', term: '(-1)^n/n', variable: 'n', limit: '0' },
    variable: 'n',
  },

  // ── Bounded, monotone, Monotone Convergence Theorem ──
  {
    id: 'card-sequences-17',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'When is $\\{a_n\\}$ bounded? Bounded above? Bounded below?' },
    back: {
      latex: '\\begin{aligned} \\text{bounded:}\\ & |a_n| \\le M \\text{ for all } n \\\\ \\text{above:}\\ & a_n \\le M \\text{ for all } n \\\\ \\text{below:}\\ & a_n \\ge m \\text{ for all } n \\end{aligned}',
    },
    check: { kind: 'none', reason: 'definition (no numeric content)' },
  },
  {
    id: 'card-sequences-18',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'When is $\\{a_n\\}$ monotone?' },
    // "all n" sits inside each alternative: (a_n ≤ a_{n+1} for every n) OR (a_n ≥ a_{n+1} for every n);
    // "for all n, one of the two" would be true of every sequence
    back: {
      latex: '\\begin{aligned} \\text{increasing:}\\ & a_n \\le a_{n+1},\\ \\text{all } n \\\\ & \\text{or} \\\\ \\text{decreasing:}\\ & a_n \\ge a_{n+1},\\ \\text{all } n \\end{aligned}',
    },
    check: { kind: 'none', reason: 'definition (no numeric content)' },
  },
  // the check verifies the counterexample: {(-1)^n} has no limit (bounded, never settles)
  {
    id: 'card-sequences-19',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Does convergent imply bounded? Does bounded imply convergent?' },
    back: {
      latex: '\\begin{aligned} &\\text{convergent} \\Rightarrow \\text{bounded} \\\\ &\\text{bounded} \\not\\Rightarrow \\text{convergent:} \\\\ &\\{(-1)^n\\} \\text{ bounded, diverges} \\end{aligned}',
    },
    check: { kind: 'limit', term: '(-1)^n', variable: 'n', limit: 'dne' },
    variable: 'n',
  },
  {
    id: 'card-sequences-20',
    category: 'Sequences',
    section: 'sequences',
    kind: 'formula',
    front: { text: 'Monotone Convergence Theorem?' },
    back: {
      latex: '\\begin{aligned} &\\text{monotone AND bounded} \\\\ &\\Rightarrow \\text{convergent} \\end{aligned}',
    },
    check: { kind: 'none', reason: 'theorem (hypotheses and conclusion); verified by math-verifier' },
  },
];
