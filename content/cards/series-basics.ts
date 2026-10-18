import type { Card } from '../types';

/** Cards for topic "series-basics" (category 'Series Basics'). Authored by content-author; verified by math-verifier. */
export const seriesBasicsCards: Card[] = [
  // ── Convergence via partial sums ──
  {
    id: 'card-series-basics-01',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'With $S_n = {a_1 + a_2 + \\cdots + a_n}$: when does $\\sum a_n$ converge, and what is its sum?' },
    back: {
      latex: '\\begin{aligned} &\\text{exactly when } \\{S_n\\} \\text{ converges} \\\\ &\\sum_{n=1}^{\\infty} a_n = \\lim_{n\\to\\infty} S_n \\end{aligned}',
    },
    check: { kind: 'none', reason: 'definition (symbolic): convergence of a series through its partial sums' },
  },
  {
    // a_n = S_n - S_(n-1): n/(n+1) - (n-1)/n = 1/(n(n+1)); also a_1 = S_1 = 1/2 fits the formula
    id: 'card-series-basics-02',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'The partial sums of $\\sum a_n$ are ${S_n = \\frac{n}{n+1}}$. Find $a_n$.' },
    back: { latex: 'a_n = S_n - S_{n-1} = \\frac{1}{n(n+1)}', expr: '1/(n*(n+1))' },
    check: { kind: 'identity', lhs: 'n/(n+1) - (n-1)/n' },
    variable: 'n',
    domain: [1, 20],
  },

  // ── Divergence Test ──
  {
    id: 'card-series-basics-03',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'Divergence Test: what can $\\lim_{n\\to\\infty} a_n$ tell you about $\\sum a_n$?' },
    back: {
      latex: '\\begin{aligned} \\ne 0 \\text{ or DNE} &\\Rightarrow \\textstyle\\sum a_n \\text{ diverges} \\\\ = 0 &\\Rightarrow \\text{inconclusive} \\end{aligned}',
    },
    check: { kind: 'none', reason: 'theorem statement (symbolic): the Divergence Test and its inconclusive case' },
  },
  {
    // verdict card: no back.expr, the divergence claim itself is checked numerically
    id: 'card-series-basics-04',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'The terms of $\\sum_{n=1}^{\\infty} \\frac{1}{n}$ tend to 0. Does the series converge?' },
    back: { latex: '\\text{diverges (harmonic series)}' },
    check: { kind: 'series', term: '1/n', converges: false },
  },

  // ── Geometric series ──
  {
    // a != 0 on the front (math-verifier): with a = 0 every term is 0 and the series converges for every r,
    // so "diverges if |r| >= 1" needs the hypothesis
    id: 'card-series-basics-05',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'Geometric series ${\\sum_{n=1}^{\\infty} a r^{n-1}} = {a + ar + ar^2 + \\cdots}$ with $a \\ne 0$: its sum? When does it converge?' },
    back: {
      latex: '\\begin{aligned} &\\frac{a}{1-r} \\quad (a = \\text{first term}) \\\\ &\\text{if } |r| < 1;\\ \\text{diverges if } |r| \\ge 1 \\end{aligned}',
    },
    check: { kind: 'none', reason: 'symbolic formula: geometric sum and its convergence condition (a nonzero, r general)' },
  },
  {
    id: 'card-series-basics-06',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'Geometric series: the partial sum $S_n = {a + ar + \\cdots + ar^{n-1}}$ equals?' },
    back: { latex: 'S_n = \\frac{a(1 - r^n)}{1 - r} \\quad (r \\ne 1)' },
    check: { kind: 'none', reason: 'symbolic formula: geometric partial sum (a, r, n general)' },
  },
  {
    // first term (1/2)^1 = 1/2, r = 1/2
    id: 'card-series-basics-07',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { latex: '\\sum_{n=1}^{\\infty} \\left(\\frac{1}{2}\\right)^n = \\,?' },
    back: { latex: '\\frac{1/2}{1 - 1/2} = 1', expr: '1' },
    check: { kind: 'series', term: '(1/2)^n', converges: true, sum: '1' },
  },
  {
    // starts at n = 0: first term (1/3)^0 = 1, r = 1/3
    id: 'card-series-basics-08',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { latex: '\\sum_{n=0}^{\\infty} \\left(\\frac{1}{3}\\right)^n = \\,?' },
    back: { latex: '\\frac{1}{1 - 1/3} = \\frac{3}{2}', expr: '3/2' },
    check: { kind: 'series', term: '(1/3)^n', from: '0', converges: true, sum: '3/2' },
  },

  // ── Telescoping series ──
  {
    id: 'card-series-basics-09',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'Telescoping series ${\\sum_{n=1}^{\\infty} (b_n - b_{n+1})}$: what is $S_n$, and what is the sum?' },
    back: {
      latex: '\\begin{aligned} S_n &= b_1 - b_{n+1} \\\\ \\text{sum} &= b_1 - \\lim_{n\\to\\infty} b_n \\ \\text{(if finite)} \\end{aligned}',
    },
    check: { kind: 'none', reason: 'symbolic formula: telescoping partial sum and sum (b_n general)' },
  },
  {
    // b_n = 1/n: S_n = 1 - 1/(n+1), b_1 = 1, lim b_n = 0
    id: 'card-series-basics-10',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)} = \\,?' },
    back: { latex: '\\sum_{n=1}^{\\infty} \\left(\\frac{1}{n} - \\frac{1}{n+1}\\right) = 1', expr: '1' },
    check: { kind: 'series', term: '1/(n*(n+1))', converges: true, sum: '1' },
  },

  // ── Properties ──
  {
    id: 'card-series-basics-11',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'When may you use ${\\sum (a_n \\pm b_n)} = {\\sum a_n \\pm \\sum b_n}$ and ${\\sum c\\,a_n} = {c\\sum a_n}$?' },
    back: {
      latex: '\\begin{aligned} &\\text{if } \\textstyle\\sum a_n \\text{ and } \\sum b_n \\text{ converge} \\\\ &\\text{(never for divergent pieces)} \\end{aligned}',
    },
    check: { kind: 'none', reason: 'symbolic property: linearity of convergent series and its hypothesis' },
  },
  {
    // e.g. a_n = 1, b_n = -1 gives a convergent sum; a_n = b_n = 1 a divergent one
    id: 'card-series-basics-12',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: 'Both $\\sum a_n$ and $\\sum b_n$ diverge. What can you conclude about ${\\sum (a_n + b_n)}$?' },
    back: {
      latex: '\\begin{aligned} &\\text{insufficient information:} \\\\ &\\text{it may converge or diverge} \\end{aligned}',
    },
    check: { kind: 'none', reason: 'conceptual: no property applies when both series diverge' },
  },
  {
    id: 'card-series-basics-13',
    category: 'Series Basics',
    section: 'series-basics',
    kind: 'formula',
    front: { text: '$\\sum a_n$ converges and $\\sum b_n$ diverges. What can you conclude about ${\\sum (a_n \\pm b_n)}$?' },
    back: {
      latex:
        '\\begin{aligned} &\\text{diverges: if it converged,} \\\\ &\\textstyle\\sum b_n = \\sum \\bigl[(a_n + b_n) - a_n\\bigr] \\\\ &\\text{would converge too} \\end{aligned}',
    },
    check: { kind: 'none', reason: 'conceptual: follows from the difference rule applied to convergent series' },
  },
];
