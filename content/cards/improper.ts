import type { Card } from '../types';

/** Cards for topic "improper" (category 'Improper Integrals'). Authored by content-author; verified by math-verifier. */
export const improperCards: Card[] = [
  // ── Types: what makes an integral improper ──
  {
    id: 'card-improper-01',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'What makes $\\int_a^b f(x)\\,dx$ an improper integral of Type I?' },
    back: { latex: '\\begin{gathered}\\text{the interval is unbounded:}\\\\ a = -\\infty,\\ b = \\infty, \\text{ or both}\\end{gathered}' },
    check: { kind: 'none', reason: 'definition stated in words; nothing numeric to check' },
  },
  {
    id: 'card-improper-02',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'What makes $\\int_a^b f(x)\\,dx$ an improper integral of Type II?' },
    back: {
      latex:
        '\\begin{gathered}f \\text{ has an infinite}\\\\ \\text{discontinuity on } [a, b]\\text{:}\\\\ \\text{at } a, \\text{ at } b, \\text{ or inside}\\end{gathered}',
    },
    check: { kind: 'none', reason: 'definition stated in words; nothing numeric to check' },
  },

  // ── Limit forms (one bad endpoint) ──
  {
    id: 'card-improper-03',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'Type I: write as a limit.', latex: '\\int_a^{\\infty} f(x)\\,dx' },
    back: { latex: '\\lim_{t\\to\\infty}\\int_a^t f(x)\\,dx' },
    check: { kind: 'none', reason: 'symbolic limit definition for a general f' },
  },
  {
    id: 'card-improper-04',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'Type I: write as a limit.', latex: '\\int_{-\\infty}^{b} f(x)\\,dx' },
    back: { latex: '\\lim_{t\\to-\\infty}\\int_t^b f(x)\\,dx' },
    check: { kind: 'none', reason: 'symbolic limit definition for a general f' },
  },
  {
    id: 'card-improper-05',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'Type II, $f$ has an infinite discontinuity at $b$: write as a limit.', latex: '\\int_a^b f(x)\\,dx' },
    back: { latex: '\\lim_{t\\to b^-}\\int_a^t f(x)\\,dx' },
    check: { kind: 'none', reason: 'symbolic limit definition for a general f' },
  },
  {
    id: 'card-improper-06',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'Type II, $f$ has an infinite discontinuity at $a$: write as a limit.', latex: '\\int_a^b f(x)\\,dx' },
    back: { latex: '\\lim_{t\\to a^+}\\int_t^b f(x)\\,dx' },
    check: { kind: 'none', reason: 'symbolic limit definition for a general f' },
  },

  // ── Split rules: two separate one-sided limits, both must converge ──
  {
    id: 'card-improper-07',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: {
      text: 'Type I, both ends infinite: write with limits (split at any $c$). When does it converge?',
      latex: '\\int_{-\\infty}^{\\infty} f(x)\\,dx',
    },
    back: {
      latex:
        '\\begin{aligned}&\\lim_{s\\to-\\infty}\\int_s^c f(x)\\,dx\\\\ +\\ &\\lim_{t\\to\\infty}\\int_c^t f(x)\\,dx\\\\ &\\text{both must converge}\\\\ &\\text{never } \\lim_{t\\to\\infty}\\int_{-t}^{t} f(x)\\,dx\\end{aligned}',
      also: '\\int_{-\\infty}^{c} f(x)\\,dx + \\int_{c}^{\\infty} f(x)\\,dx',
    },
    check: { kind: 'none', reason: 'symbolic split rule for a general f' },
  },
  {
    id: 'card-improper-08',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: {
      text: 'Type II, $f$ has an infinite discontinuity at $c$ ($a < c < b$): write with limits. When does it converge?',
      latex: '\\int_a^b f(x)\\,dx',
    },
    back: {
      latex:
        '\\begin{aligned}&\\lim_{s\\to c^-}\\int_a^s f(x)\\,dx\\\\ +\\ &\\lim_{t\\to c^+}\\int_t^b f(x)\\,dx\\\\ &\\text{both must converge}\\end{aligned}',
      also: '\\int_a^c f(x)\\,dx + \\int_c^b f(x)\\,dx',
    },
    check: { kind: 'none', reason: 'symbolic split rule for a general f' },
  },

  // ── Converge vs diverge ──
  {
    id: 'card-improper-09',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'When does an improper integral converge? Can it "converge to $\\infty$"?' },
    back: {
      latex:
        '\\begin{aligned}\\text{finite limit}&\\text{: converges}\\\\ \\text{limit } \\infty \\text{ or } {-\\infty}&\\text{: diverges}\\\\ \\text{no limit (DNE)}&\\text{: diverges}\\end{aligned}',
    },
    check: { kind: 'none', reason: 'definition of convergence stated in words' },
  },

  // ── p-rule ──
  {
    id: 'card-improper-10',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'p-rule: for which $p$ does it converge, and to what?', latex: '\\int_1^{\\infty} \\frac{1}{x^p}\\,dx' },
    back: { latex: '\\begin{aligned}p > 1&\\text{: converges to } \\frac{1}{p-1}\\\\ p \\le 1&\\text{: diverges}\\end{aligned}' },
    check: { kind: 'none', reason: 'symbolic rule in the parameter p (two free symbols, no single numeric claim)' },
  },

  // ── Worked results (numerically checked) ──
  {
    id: 'card-improper-11',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'Converges or diverges? If it converges, find its value.', latex: '\\int_{-\\infty}^{\\infty} \\frac{1}{1 + x^2}\\,dx' },
    // The two separate limits (split at 0) are each π/2; the parser checks the value after "=".
    back: { latex: '\\frac{\\pi}{2} + \\frac{\\pi}{2} = \\pi', expr: 'pi' },
    check: { kind: 'improper-integral', integrand: '1/(1 + x^2)', lower: '-inf', upper: 'inf', converges: true, value: 'pi', split: ['0'] },
  },
  {
    id: 'card-improper-12',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'Converges or diverges? If it converges, find its value.', latex: '\\int_0^1 \\frac{1}{\\sqrt{x}}\\,dx' },
    // ∫_t^1 x^(-1/2) dx = 2 - 2√t, approached from inside the interval (t → 0⁺).
    back: { latex: '\\lim_{t\\to 0^+}(2 - 2\\sqrt{t}) = 2', expr: '2' },
    check: { kind: 'improper-integral', integrand: '1/sqrt(x)', lower: '0', upper: '1', converges: true, value: '2' },
  },
  {
    id: 'card-improper-13',
    category: 'Improper Integrals',
    section: 'improper',
    kind: 'formula',
    front: { text: 'Converges or diverges? If it converges, find its value.', latex: '\\int_{-1}^{1} \\frac{1}{x^2}\\,dx' },
    // Trap: the FTC applied straight across x = 0 gives [-1/x] from -1 to 1 = -2.
    back: {
      latex:
        '\\begin{gathered}\\text{diverges (not } {-2}\\text{)}\\\\ \\text{split at } x = 0\\text{; right piece:}\\\\ \\lim_{t\\to 0^+}\\int_t^1 \\frac{1}{x^2}\\,dx = \\infty\\end{gathered}',
    },
    check: { kind: 'improper-integral', integrand: '1/x^2', lower: '-1', upper: '1', converges: false, split: ['0'] },
  },
];
