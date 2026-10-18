import type { Card } from '../types';

/** Cards for topic "series-tests" (category 'Series Tests'). Authored by content-author; verified by math-verifier. */
export const seriesTestsCards: Card[] = [
  // ── Integral test ──
  {
    id: 'card-series-tests-01',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Integral test, $a_n = f(n)$: which three conditions on $f$ over $[k, \\infty)$, and what follows?' },
    back: {
      latex:
        '\\begin{array}{c} f \\text{ positive, continuous} \\\\ \\text{and decreasing on } [k, \\infty) \\\\[10pt] ' +
        '\\sum_{n=k}^{\\infty} a_n \\text{ and } \\int_k^{\\infty} f(x)\\,dx \\\\ ' +
        '\\text{both converge} \\\\ \\text{or both diverge} \\end{array}',
    },
    check: { kind: 'none', reason: 'test statement (f and k symbolic); verified by math-verifier' },
  },
  {
    id: 'card-series-tests-02',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Integral test: $\\int_1^{\\infty} \\frac{dx}{x^2} = 1$. Does that make $\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = 1$?' },
    back: {
      latex:
        '\\begin{array}{c} \\text{No: the series converges,} \\\\ \\text{but its sum is not the} \\\\ ' +
        '\\text{value of the integral} \\\\[6pt] \\small (1 + \\tfrac{1}{4} > 1 \\text{ already}) \\end{array}',
    },
    // the verdict on the back (the series converges) is checked; "the sum is not 1" is verifier-checked
    check: { kind: 'series', term: '1/n^2', converges: true },
  },

  // ── p-series ──
  {
    id: 'card-series-tests-03',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: '$p$-series $\\sum_{n=1}^{\\infty} \\frac{1}{n^p}$: for which $p$ does it converge, and diverge?' },
    back: {
      latex:
        '\\begin{array}{c} \\text{converges if } p > 1 \\\\ \\text{diverges if } p \\le 1 \\\\[6pt] ' +
        '\\small p = 1\\text{: the harmonic series} \\end{array}',
    },
    check: { kind: 'none', reason: 'rule for symbolic p; verified by math-verifier' },
  },
  {
    id: 'card-series-tests-04',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'identity',
    front: { text: 'Find $p$ in $\\sum_{n=1}^{\\infty} \\frac{1}{\\sqrt{n^3}}$: write the root as $n^p$.', latex: '\\sqrt{n^3}' },
    back: { latex: 'n^{3/2}', expr: 'n^(3/2)' },
    check: { kind: 'identity', lhs: 'sqrt(n^3)' },
    variable: 'n',
  },

  // ── Direct comparison ──
  {
    id: 'card-series-tests-05',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Direct comparison, $0 < a_n \\le b_n$ for $n \\ge N$: which two conclusions does it give?' },
    back: {
      latex:
        '\\begin{array}{c} \\sum b_n \\text{ converges} \\\\ \\Rightarrow \\sum a_n \\text{ converges} \\\\[10pt] ' +
        '\\sum a_n \\text{ diverges} \\\\ \\Rightarrow \\sum b_n \\text{ diverges} \\end{array}',
      also:
        '\\begin{array}{c} \\text{larger converges} \\Rightarrow \\text{smaller converges} \\\\ ' +
        '\\text{smaller diverges} \\Rightarrow \\text{larger diverges} \\end{array}',
    },
    check: { kind: 'none', reason: 'test statement (symbolic series); verified by math-verifier' },
  },
  {
    id: 'card-series-tests-06',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Direct comparison, $0 < a_n \\le b_n$: which two situations give NO information?' },
    back: {
      latex:
        '\\begin{array}{c} \\sum b_n \\text{ diverges:} \\\\ \\text{no information on } \\sum a_n \\\\[10pt] ' +
        '\\sum a_n \\text{ converges:} \\\\ \\text{no information on } \\sum b_n \\end{array}',
      also:
        '\\begin{array}{c} \\text{smaller than a divergent series;} \\\\ ' +
        '\\text{larger than a convergent series} \\end{array}',
    },
    check: { kind: 'none', reason: 'test statement (symbolic series); verified by math-verifier' },
  },

  // ── Limit comparison ──
  {
    id: 'card-series-tests-07',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Limit comparison, $a_n, b_n > 0$, $L = \\lim_{n \\to \\infty} \\frac{a_n}{b_n}$: what if $0 < L < \\infty$?' },
    back: { latex: '\\begin{array}{c} \\text{both converge} \\\\ \\text{or both diverge} \\end{array}' },
    check: { kind: 'none', reason: 'test statement (symbolic series); verified by math-verifier' },
  },
  {
    id: 'card-series-tests-08',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Limit comparison, $a_n, b_n > 0$: if $L = \\lim_{n \\to \\infty} \\frac{a_n}{b_n} = 0$, when can you conclude, and what?' },
    back: {
      latex:
        '\\begin{array}{c} \\text{if } \\sum b_n \\text{ converges,} \\\\ \\text{then } \\sum a_n \\text{ converges} \\\\[6pt] ' +
        '\\small (\\textstyle\\sum b_n \\text{ diverges: inconclusive}) \\end{array}',
    },
    check: { kind: 'none', reason: 'test statement (symbolic series); verified by math-verifier' },
  },
  {
    id: 'card-series-tests-09',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Limit comparison, $a_n, b_n > 0$: if $L = \\lim_{n \\to \\infty} \\frac{a_n}{b_n} = \\infty$, when can you conclude, and what?' },
    back: {
      latex:
        '\\begin{array}{c} \\text{if } \\sum b_n \\text{ diverges,} \\\\ \\text{then } \\sum a_n \\text{ diverges} \\\\[6pt] ' +
        '\\footnotesize (\\textstyle\\sum b_n \\text{ converges: inconclusive}) \\end{array}',
    },
    check: { kind: 'none', reason: 'test statement (symbolic series); verified by math-verifier' },
  },
  {
    // the choice is valid because a_n/b_n = n^2(n+1)/(n^3+2) -> 1, with 0 < 1 < infinity (and the
    // sum of 1/n^2 converges, so this series converges); the check verifies that ratio limit
    id: 'card-series-tests-10',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Limit comparison: how do you choose $b_n$ for this series?', latex: '\\sum_{n=1}^{\\infty} \\frac{n+1}{n^3+2}' },
    back: {
      latex: '\\begin{array}{c} \\text{keep the dominant terms:} \\\\[6pt] b_n = \\dfrac{n}{n^3} = \\dfrac{1}{n^2} \\end{array}',
    },
    check: { kind: 'limit', term: '((n+1)/(n^3+2))/(1/n^2)', limit: '1' },
  },

  // ── Class examples (verdicts checked numerically) ──
  {
    id: 'card-series-tests-11',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Converge or diverge, and why?', latex: '\\sum_{n=2}^{\\infty} \\frac{\\ln n}{n}' },
    back: {
      latex:
        '\\begin{array}{c} \\textbf{diverges} \\\\[6pt] \\text{limit comparison, } b_n = \\tfrac{1}{n}\\text{:} \\\\[4pt] ' +
        '\\displaystyle L = \\lim_{n \\to \\infty} \\frac{\\ln n/n}{1/n} \\\\[2pt] ' +
        '\\displaystyle = \\lim_{n \\to \\infty} \\ln n = \\infty \\\\[4pt] ' +
        '\\text{and } \\sum \\tfrac{1}{n} \\text{ diverges} \\end{array}',
    },
    check: { kind: 'series', term: 'log(n)/n', from: '2', converges: false },
  },
  {
    id: 'card-series-tests-12',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Converge or diverge, and why?', latex: '\\sum_{n=2}^{\\infty} \\frac{\\ln n}{n^2}' },
    back: {
      latex:
        '\\begin{array}{c} \\textbf{converges} \\\\[6pt] \\text{limit comparison, } b_n = \\tfrac{1}{n^{3/2}}\\text{:} \\\\[4pt] ' +
        '\\displaystyle L = \\lim_{n \\to \\infty} \\frac{\\ln n/n^2}{1/n^{3/2}} \\\\[2pt] ' +
        '\\displaystyle = \\lim_{n \\to \\infty} \\frac{\\ln n}{\\sqrt{n}} = 0 \\\\[4pt] ' +
        '\\text{and } \\sum \\tfrac{1}{n^{3/2}} \\text{ converges} \\\\[6pt] ' +
        '\\footnotesize (\\text{with } \\tfrac{1}{n^2}\\text{: } L = \\infty\\text{, inconclusive}) \\end{array}',
    },
    check: { kind: 'series', term: 'log(n)/n^2', from: '2', converges: true },
  },

  // ── Choosing a test ──
  {
    id: 'card-series-tests-13',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Choosing a test for $\\sum a_n$: what do you check, in order?' },
    back: {
      latex:
        '\\small \\begin{array}{l} 1.\\ \\text{divergence test:} \\\\ \\phantom{1.}\\ \\lim_{n \\to \\infty} a_n \\ne 0 \\text{ or DNE} \\\\ \\phantom{1.}\\ \\Rightarrow \\text{diverges} \\\\ ' +
        '2.\\ \\text{can } S_n \\text{ be found?} \\\\ \\phantom{2.}\\ \\text{(geometric, telescoping)} \\\\ ' +
        '3.\\ p\\text{-series?} \\\\ ' +
        '4.\\ a_n > 0\\text{: integral test,} \\\\ \\phantom{4.}\\ \\text{direct or limit comparison} \\\\ ' +
        '\\phantom{4.}\\ (b_n \\text{ from dominant terms}) \\end{array}',
    },
    check: { kind: 'none', reason: 'procedure (order of tests); verified by math-verifier' },
  },
  {
    // Spec example (CLAUDE.md, topic 14). f(x) = 1/(x ln x) is positive, continuous and decreasing on
    // [2, inf) since (x ln x)' = ln x + 1 > 0; u = ln x, du = dx/x: the integral from 2 to t is
    // ln(ln t) - ln(ln 2) -> inf, so the series diverges. Limit comparison: a_n/(1/n) = 1/ln n -> 0 with
    // the sum of 1/n divergent; a_n/(1/n^p) = n^(p-1)/ln n -> inf for p > 1 with the p-series convergent;
    // inconclusive both ways. Verdict card (no back.expr): the divergence claim is checked numerically.
    id: 'card-series-tests-14',
    category: 'Series Tests',
    section: 'series-tests',
    kind: 'formula',
    front: { text: 'Which test settles this series, and why does limit comparison not?', latex: '\\sum_{n=2}^{\\infty} \\frac{1}{n \\ln n}' },
    back: {
      latex:
        '\\begin{array}{c} \\textbf{diverges}\\text{ (integral test)} \\\\[4pt] ' +
        '\\small \\tfrac{1}{x \\ln x} \\text{ positive, continuous,} \\\\ \\small \\text{decreasing on } [2, \\infty) \\\\[4pt] ' +
        'u = \\ln x\\text{:}\\ \\displaystyle \\int_2^{\\infty} \\frac{dx}{x \\ln x} \\\\ ' +
        '\\displaystyle = \\lim_{t \\to \\infty} \\big[\\ln(\\ln t) - \\ln(\\ln 2)\\big] \\\\ = \\infty \\\\[6pt] ' +
        '\\text{limit comparison:} \\\\ ' +
        '\\small L = 0 \\text{ vs divergent } \\textstyle\\sum \\tfrac{1}{n}\\text{,} \\\\ ' +
        '\\small L = \\infty \\text{ vs convergent } \\textstyle\\sum \\tfrac{1}{n^p}\\text{:} \\\\ ' +
        '\\small \\text{both inconclusive} \\end{array}',
    },
    check: { kind: 'series', term: '1/(n*log(n))', from: '2', converges: false },
  },
];
