/**
 * REFERENCE EXAMPLES for content authors. Not included in the app (content/index.ts ignores this
 * folder), but validated by tests/sample.test.ts so the examples never go stale.
 *
 * Read this file top to bottom before authoring. Each example shows one item kind and the
 * conventions for latex/expr/check/mistake/why.
 */
import type { FlashGenerator, FlashItem, StepProblem } from '../types';

export const sampleFlash: FlashItem[] = [
  // ── kind: derivative ─────────────────────────────────────────────────────────────────────
  // prompt.latex is the bare f(x); the UI shows "f(x) = x sin x. Find f′(x)."
  // Every option has latex + expr. check.of is the function being differentiated (mathjs).
  {
    id: 'dr-f-901',
    topic: 'diff-review',
    kind: 'derivative',
    prompt: { latex: 'x\\sin x' },
    options: [
      { latex: '\\sin x + x\\cos x', expr: 'sin(x) + x*cos(x)' },
      {
        latex: 'x\\cos x',
        expr: 'x*cos(x)',
        mistake: 'product-rule-missing-term',
        why: 'Only sin x was differentiated; x was treated as a constant factor, so the (x)′·sin x term is missing.',
      },
      {
        latex: '1 + \\cos x',
        expr: '1 + cos(x)',
        mistake: 'product-rule-missing-term',
        why: 'The two factors were differentiated separately and added — there is no such rule for products.',
      },
      {
        latex: '\\sin x - x\\cos x',
        expr: 'sin(x) - x*cos(x)',
        mistake: 'sign-error-derivative',
        why: 'd/dx(sin x) was taken as −cos x; the derivative of sine is +cos x.',
      },
      {
        latex: '\\cos x',
        expr: 'cos(x)',
        mistake: 'product-rule-missing-term',
        why: 'The derivatives of the two factors were multiplied (1 · cos x) instead of applying the product rule.',
      },
    ],
    correct: 0,
    explanation: 'Product rule: $(x)^{\\prime}\\sin x + x(\\sin x)^{\\prime} = \\sin x + x\\cos x$.',
    check: { kind: 'derivative', of: 'x*sin(x)' },
    difficulty: 1,
  },

  // ── kind: antiderivative ──────────────────────────────────────────────────────────────────
  // prompt.latex is the integrand; the UI shows "∫ x cos(x²) dx". Every option ends with "+ C".
  // Distractors are distinct when their DERIVATIVE differs from the integrand (an antiderivative
  // that differs from the correct one by a constant is the same answer and is rejected).
  {
    id: 'ad-f-901',
    topic: 'antiderivatives',
    kind: 'antiderivative',
    prompt: { latex: 'x\\cos(x^2)' },
    options: [
      { latex: '\\frac{1}{2}\\sin(x^2) + C', expr: 'sin(x^2)/2' },
      {
        latex: '\\sin(x^2) + C',
        expr: 'sin(x^2)',
        mistake: 'du-constant-wrong',
        why: 'With u = x², du = 2x dx, so x dx = du/2; the factor 1/2 was dropped.',
      },
      {
        latex: '-\\frac{1}{2}\\sin(x^2) + C',
        expr: '-sin(x^2)/2',
        mistake: 'trig-antiderivative-sign',
        why: '∫cos u du = +sin u; the minus sign belongs to ∫sin u du = −cos u.',
      },
      {
        latex: '2\\sin(x^2) + C',
        expr: '2*sin(x^2)',
        mistake: 'du-constant-wrong',
        why: 'x dx was replaced by 2 du instead of du/2.',
      },
      {
        latex: '\\frac{x^2}{2}\\sin(x^2) + C',
        expr: 'x^2/2*sin(x^2)',
        mistake: 'product-rule-integral',
        why: 'x and cos(x²) were integrated separately and the results multiplied; there is no product rule for integrals.',
      },
      {
        latex: '\\frac{1}{2}\\cos(x^2) + C',
        expr: 'cos(x^2)/2',
        mistake: 'trig-antiderivative-swapped',
        why: 'cos u was treated as its own antiderivative; ∫cos u du = sin u.',
      },
    ],
    correct: 0,
    explanation: 'Let $u = x^2$, $du = 2x\\,dx$: $\\int x\\cos(x^2)\\,dx = \\tfrac12\\int\\cos u\\,du = \\tfrac12\\sin(x^2) + C$.',
    check: { kind: 'antiderivative', integrand: 'x*cos(x^2)' },
    difficulty: 1,
  },

  // ── kind: evaluate ────────────────────────────────────────────────────────────────────────
  // prompt.latex is the whole definite integral; options are values. The test parses the prompt
  // and checks it agrees with check.{integrand,lower,upper}, and that the correct value matches.
  {
    id: 'ad-f-902',
    topic: 'antiderivatives',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^{\\pi} \\sin x\\,dx' },
    options: [
      { latex: '2', expr: '2' },
      { latex: '-2', expr: '-2', mistake: 'ftc-order-swapped', why: 'Computed F(0) − F(π) instead of F(π) − F(0).' },
      { latex: '0', expr: '0', mistake: 'trig-antiderivative-swapped', why: 'Used sin x as its own antiderivative: sin π − sin 0 = 0.' },
      { latex: '1', expr: '1', mistake: 'ftc-not-subtracted', why: 'Only the upper bound was evaluated: −cos π = 1, and F(0) was never subtracted.' },
      { latex: '-1', expr: '-1', mistake: 'ftc-not-subtracted', why: 'Only the lower bound was evaluated: −cos 0 = −1.' },
    ],
    correct: 0,
    explanation: '$-\\cos x\\big|_0^{\\pi} = -\\cos\\pi - (-\\cos 0) = 1 + 1 = 2$.',
    check: { kind: 'definite-integral', integrand: 'sin(x)', lower: '0', upper: 'pi' },
    difficulty: 1,
  },

  // ── kind: formula (identity check) ───────────────────────────────────────────────────────
  {
    id: 'ti-f-901',
    topic: 'trig-integrals',
    kind: 'formula',
    prompt: { text: 'Which half-angle identity rewrites $\\sin^2 x$ for integration?' },
    options: [
      { latex: '\\sin^2 x = \\frac{1 - \\cos 2x}{2}', expr: '(1 - cos(2*x))/2' },
      { latex: '\\sin^2 x = \\frac{1 + \\cos 2x}{2}', expr: '(1 + cos(2*x))/2', mistake: 'half-angle-wrong', why: 'That is the identity for cos²x; the sine version has a minus sign.' },
      { latex: '\\sin^2 x = \\frac{1 - \\cos x}{2}', expr: '(1 - cos(x))/2', mistake: 'half-angle-wrong', why: 'The angle must double: the identity uses cos 2x, not cos x.' },
      { latex: '\\sin^2 x = 1 - \\cos 2x', expr: '1 - cos(2*x)', mistake: 'half-angle-wrong', why: 'The factor 1/2 is missing.' },
      { latex: '\\sin^2 x = \\frac{1 - \\sin 2x}{2}', expr: '(1 - sin(2*x))/2', mistake: 'double-angle-wrong', why: 'cos 2x, not sin 2x, appears in the power-reducing identities.' },
    ],
    correct: 0,
    explanation: 'From $\\cos 2x = 1 - 2\\sin^2 x$, solve for $\\sin^2 x = \\frac{1-\\cos 2x}{2}$.',
    check: { kind: 'identity', lhs: 'sin(x)^2' },
    difficulty: 1,
  },

  // ── kind: technique (text options, no numeric check) ─────────────────────────────────────
  {
    id: 'ip-f-901',
    topic: 'ibp',
    kind: 'technique',
    prompt: { text: 'Which method fits best?', latex: '\\int x e^{x^2}\\,dx' },
    options: [
      { text: 'u-substitution with $u = x^2$' },
      { text: 'Integration by parts with $u = x$, $dv = e^{x^2}\\,dx$', mistake: 'ibp-when-usub', why: 'dv = e^{x²}dx has no elementary antiderivative, and the derivative of x² is already present — substitute instead.' },
      { text: 'Integration by parts with $u = e^{x^2}$, $dv = x\\,dx$', mistake: 'ibp-when-usub', why: 'This produces ∫x³e^{x²}dx, which is harder; the integrand is f(g(x))g′(x) up to a constant.' },
      { text: 'Trigonometric substitution $x = \\tan\\theta$', mistake: 'technique-wrong', why: 'There is no radical of the form a² + x²; a trig substitution would not simplify e^{x²}.' },
      { text: 'Rewrite $e^{x^2}$ with a half-angle identity', mistake: 'technique-wrong', why: 'Half-angle identities apply to even powers of sine and cosine, not to exponentials.' },
    ],
    correct: 0,
    explanation: 'The factor $x$ is (up to the constant 1/2) the derivative of the inner function $x^2$, so $u = x^2$ works directly.',
    check: { kind: 'none', reason: 'technique recognition; options are method names' },
    difficulty: 1,
  },

  // ── kind: concept with integral-valued options ───────────────────────────────────────────
  // Options are definite integrals; exprs use integral(f, var, a, b). The correct one must
  // equal check.value.expected (here, the original integral), distractors must differ.
  {
    id: 'ad-f-903',
    topic: 'antiderivatives',
    kind: 'concept',
    prompt: { text: 'After the substitution $u = x^2 + 1$, the integral becomes', latex: '\\int_0^1 2x\\,(x^2+1)^3\\,dx' },
    options: [
      { latex: '\\int_1^2 u^3\\,du', expr: 'integral(u^3, u, 1, 2)' },
      { latex: '\\int_0^1 u^3\\,du', expr: 'integral(u^3, u, 0, 1)', mistake: 'bounds-not-converted', why: 'The x-limits 0 and 1 were kept; they must become u(0) = 1 and u(1) = 2.' },
      { latex: '\\int_1^2 u^3\\,dx', expr: 'integral(u^3, x, 1, 2)', mistake: 'dx-not-replaced', why: 'dx was never replaced: since du = 2x dx, the 2x dx becomes du.' },
      { latex: '\\int_1^2 2x\\,u^3\\,du', expr: 'integral(2*x*u^3, u, 1, 2)', mistake: 'leftover-x-in-u-integral', why: 'The factor 2x is part of du and must disappear; a u-integral cannot contain x.' },
      { latex: '\\frac{1}{2}\\int_1^2 u^3\\,du', expr: 'integral(u^3, u, 1, 2)/2', mistake: 'du-constant-wrong', why: 'du = 2x dx exactly matches the factor 2x dx, so no extra 1/2 is needed.' },
      { latex: '\\int_2^1 u^3\\,du', expr: 'integral(u^3, u, 2, 1)', mistake: 'bounds-swapped', why: 'u(0) = 1 is the lower limit and u(1) = 2 the upper limit.' },
    ],
    correct: 0,
    explanation: '$du = 2x\\,dx$ absorbs the $2x$, and the limits transform: $u(0)=1$, $u(1)=2$.',
    check: { kind: 'value', expected: 'integral(2*x*(x^2+1)^3, x, 0, 1)' },
    difficulty: 1,
  },
];

// ── Parameterized generator ────────────────────────────────────────────────────────────────
// generate(seed) must be deterministic; the instance id must be `${generator.id}:${seed}`.
// Tests validate seeds 1..20 exactly like static items. Keep generators for SAFE families only
// (coefficients that never create a degenerate case or a coincidence between options).
function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const sampleGenerators: FlashGenerator[] = [
  {
    id: 'dr-g-sin-kx',
    topic: 'diff-review',
    kind: 'derivative',
    describe: 'd/dx sin(kx) for k = 2..9',
    generate(seed) {
      const rng = mulberry(seed);
      const k = 2 + Math.floor(rng() * 8); // 2..9
      return {
        id: `dr-g-sin-kx:${seed}`,
        topic: 'diff-review',
        kind: 'derivative',
        prompt: { latex: `\\sin(${k}x)` },
        options: [
          { latex: `${k}\\cos(${k}x)`, expr: `${k}*cos(${k}*x)` },
          { latex: `\\cos(${k}x)`, expr: `cos(${k}*x)`, mistake: 'chain-rule-missing', why: `The inner derivative ${k} was dropped.` },
          { latex: `-${k}\\cos(${k}x)`, expr: `-${k}*cos(${k}*x)`, mistake: 'sign-error-derivative', why: 'd/dx(sin) = +cos; the minus sign belongs to d/dx(cos).' },
          { latex: `${k}\\sin(${k}x)`, expr: `${k}*sin(${k}*x)`, mistake: 'trig-derivative-swapped', why: 'sin was left as sin; its derivative is cos.' },
          { latex: `-\\frac{1}{${k}}\\cos(${k}x)`, expr: `-cos(${k}*x)/${k}`, mistake: 'integrated-instead', why: `This is the antiderivative of sin(${k}x), not its derivative.` },
          { latex: `${k * k}\\cos(${k}x)`, expr: `${k * k}*cos(${k}*x)`, mistake: 'chain-rule-doubled', why: `The inner derivative ${k} was applied twice.` },
        ],
        correct: 0,
        explanation: `Chain rule: $\\cos(${k}x)\\cdot\\frac{d}{dx}(${k}x) = ${k}\\cos(${k}x)$.`,
        check: { kind: 'derivative', of: `sin(${k}*x)` },
        difficulty: 1,
      };
    },
  },
];

// ── Step-Through problems ──────────────────────────────────────────────────────────────────
export const sampleSteps: StepProblem[] = [
  {
    id: 'ad-s-91',
    topic: 'antiderivatives',
    title: 'Definite integral by substitution',
    difficulty: 1,
    statement: { text: 'Evaluate', latex: '\\int_0^1 2x\\,(x^2+1)^3\\,dx' },
    steps: [
      {
        prompt: 'We choose $u = x^2 + 1$. What is $du$?',
        options: [
          { latex: 'du = 2x\\,dx', expr: '2*x*dx' },
          { latex: 'du = x\\,dx', expr: 'x*dx', mistake: 'du-constant-wrong', why: 'd/dx(x²) = 2x, not x.' },
          { latex: 'du = (x^2+1)\\,dx', expr: '(x^2+1)*dx', mistake: 'du-derivative-wrong', why: 'du is the derivative of u times dx, not u itself times dx.' },
          { latex: 'du = 2\\,dx', expr: '2*dx', mistake: 'du-derivative-wrong', why: 'd/dx(x²) = 2x; the x was lost.' },
          { latex: 'du = 2x', expr: '2*x', mistake: 'dx-not-replaced', why: 'du must include dx: du = u′(x) dx.' },
        ],
        correct: 0,
        explanation: '$u = x^2 + 1 \\Rightarrow du = 2x\\,dx$, which is exactly the factor $2x\\,dx$ in the integrand.',
        result: { latex: 'u = x^2 + 1,\\quad du = 2x\\,dx' },
        check: { kind: 'value', expected: '2*x*dx' },
      },
      {
        prompt: 'What are the new limits of integration?',
        options: [
          { latex: 'u(0) = 1,\\ u(1) = 2', expr: '[1, 2]' },
          { latex: 'u(0) = 0,\\ u(1) = 1', expr: '[0, 1]', mistake: 'bounds-not-converted', why: 'These are the x-limits; they must be pushed through u = x² + 1.' },
          { latex: 'u(0) = 2,\\ u(1) = 1', expr: '[2, 1]', mistake: 'bounds-swapped', why: 'u(0) = 0² + 1 = 1 is the lower limit and u(1) = 2 the upper.' },
          { latex: 'u(0) = 0,\\ u(1) = 2', expr: '[0, 2]', mistake: 'algebra-error', why: 'u(0) = 0² + 1 = 1, not 0.' },
          { latex: 'u(0) = 1,\\ u(1) = 4', expr: '[1, 4]', mistake: 'algebra-error', why: 'u(1) = 1² + 1 = 2; the value 4 comes from squaring 2 by mistake.' },
        ],
        correct: 0,
        explanation: 'Plug the x-limits into $u = x^2 + 1$: $u(0) = 1$ and $u(1) = 2$.',
        result: { latex: 'x = 0 \\Rightarrow u = 1,\\quad x = 1 \\Rightarrow u = 2' },
        check: { kind: 'value', expected: '[1, 2]' },
      },
      {
        prompt: 'Rewrite the integral entirely in $u$.',
        options: [
          { latex: '\\int_1^2 u^3\\,du', expr: 'integral(u^3, u, 1, 2)' },
          { latex: '\\int_0^1 u^3\\,du', expr: 'integral(u^3, u, 0, 1)', mistake: 'bounds-not-converted', why: 'The limits were left as x-values.' },
          { latex: '\\int_1^2 2x\\,u^3\\,du', expr: 'integral(2*x*u^3, u, 1, 2)', mistake: 'leftover-x-in-u-integral', why: '2x dx has become du; no x may remain.' },
          { latex: '\\frac{1}{2}\\int_1^2 u^3\\,du', expr: 'integral(u^3, u, 1, 2)/2', mistake: 'du-constant-wrong', why: 'du = 2x dx matches the integrand exactly; no compensating 1/2.' },
          { latex: '\\int_1^2 u^3\\,dx', expr: 'integral(u^3, x, 1, 2)', mistake: 'dx-not-replaced', why: 'The differential must be du.' },
        ],
        correct: 0,
        explanation: 'Everything — integrand, differential, and limits — is now in terms of $u$.',
        result: { latex: '= \\int_1^2 u^3\\,du' },
        check: { kind: 'value', expected: 'integral(2*x*(x^2+1)^3, x, 0, 1)' },
      },
      {
        prompt: 'Evaluate $\\int_1^2 u^3\\,du$.',
        options: [
          { latex: '\\frac{15}{4}', expr: '15/4' },
          { latex: '4', expr: '4', mistake: 'ftc-not-subtracted', why: 'Only F(2) = 16/4 was computed; F(1) = 1/4 must be subtracted.' },
          { latex: '-\\frac{15}{4}', expr: '-15/4', mistake: 'ftc-order-swapped', why: 'F(1) − F(2) instead of F(2) − F(1).' },
          { latex: '\\frac{609}{4}', expr: '609/4', mistake: 'mixed-limits-variable', why: 'The u-limits 1 and 2 were plugged into (x²+1)⁴/4, an x-expression.' },
          { latex: '15', expr: '15', mistake: 'power-rule-int-coefficient', why: '∫u³du = u⁴/4; the division by 4 was skipped.' },
        ],
        correct: 0,
        explanation: '$\\frac{u^4}{4}\\Big|_1^2 = \\frac{16}{4} - \\frac{1}{4} = \\frac{15}{4}$.',
        result: { latex: '= \\frac{u^4}{4}\\Big|_1^2 = \\frac{15}{4}' },
        check: { kind: 'value', expected: '15/4' },
      },
    ],
    final: {
      latex: '\\frac{15}{4}',
      expr: '15/4',
      check: { kind: 'definite-integral', integrand: '2*x*(x^2+1)^3', lower: '0', upper: '1' },
      recap: 'Convert the limits along with the integrand and differential, then evaluate entirely in $u$ — never mix u-limits with an x-expression.',
    },
  },
  {
    id: 'vd-s-91',
    topic: 'volumes-disks',
    title: 'Disk about the x-axis',
    difficulty: 1,
    statement: {
      text: 'Find the volume of the solid obtained by rotating the region bounded by $y = \\sqrt{x}$, the x-axis, and $x = 4$ about the x-axis.',
    },
    steps: [
      {
        prompt: 'Which setup matches a slice perpendicular to the axis of rotation?',
        options: [
          { text: 'Disks perpendicular to the x-axis; integrate with respect to $x$ from 0 to 4' },
          { text: 'Shells parallel to the x-axis; integrate with respect to $y$ from 0 to 2', mistake: 'shell-orientation-wrong', why: 'Shells are parallel to the axis; a slice perpendicular to the x-axis is a disk, integrated in x.' },
          { text: 'Disks perpendicular to the x-axis; integrate with respect to $y$ from 0 to 2', mistake: 'wrong-integration-variable', why: 'Slices perpendicular to the x-axis are stacked along x, so the variable is x.' },
          { text: 'Washers perpendicular to the y-axis; integrate with respect to $y$ from 0 to 2', mistake: 'wrong-integration-variable', why: 'The axis of rotation is the x-axis; slices perpendicular to it are perpendicular to the x-axis.' },
          { text: 'Disks perpendicular to the x-axis; integrate with respect to $x$ from 0 to 2', mistake: 'bounds-wrong-axis', why: 'The region runs from x = 0 to x = 4; 2 is the maximum y-value.' },
        ],
        correct: 0,
        explanation: 'Disks/washers use slices perpendicular to the axis (here the x-axis), so we integrate in $x$ over the region\'s x-extent $[0, 4]$.',
        result: { text: 'Disks ⟂ x-axis, $0 \\le x \\le 4$' },
      },
      {
        prompt: 'What is the radius $R(x)$ of the disk at position $x$?',
        options: [
          { latex: 'R(x) = \\sqrt{x}', expr: 'sqrt(x)' },
          { latex: 'R(x) = x', expr: 'x', mistake: 'radius-is-function-value', why: 'The radius is the distance from the axis (y = 0) to the curve, i.e. the y-value √x, not the x-coordinate.' },
          { latex: 'R(x) = x^2', expr: 'x^2', mistake: 'inverse-function-wrong', why: 'x = y² is the curve solved for x; the distance to the x-axis is y = √x.' },
          { latex: 'R(x) = 4 - \\sqrt{x}', expr: '4 - sqrt(x)', mistake: 'axis-shift-sign', why: 'There is no shift: the axis of rotation is y = 0, so the radius is simply √x.' },
          { latex: 'R(x) = \\sqrt{x} + 1', expr: 'sqrt(x) + 1', mistake: 'axis-shift-missing', why: 'A +1 would be needed only if the axis were y = −1.' },
        ],
        correct: 0,
        explanation: 'Each disk reaches from the axis $y = 0$ up to the curve, so $R(x) = \\sqrt{x} - 0$.',
        result: { latex: 'R(x) = \\sqrt{x},\\quad r(x) = 0' },
        check: { kind: 'value', expected: 'sqrt(x)' },
      },
      {
        prompt: 'Write the volume integral.',
        options: [
          { latex: 'V = \\pi\\int_0^4 x\\,dx', expr: 'integral(pi*x, x, 0, 4)' },
          { latex: 'V = \\pi\\int_0^4 \\sqrt{x}\\,dx', expr: 'integral(pi*sqrt(x), x, 0, 4)', mistake: 'radius-not-squared', why: 'The disk area is πR² = π(√x)² = πx; the radius was not squared.' },
          { latex: 'V = \\int_0^4 x\\,dx', expr: 'integral(x, x, 0, 4)', mistake: 'pi-missing', why: 'The area of a disk is πR²; the π was dropped.' },
          { latex: 'V = 2\\pi\\int_0^4 x\\sqrt{x}\\,dx', expr: 'integral(2*pi*x*sqrt(x), x, 0, 4)', mistake: 'method-formula-swapped', why: 'This is the shell formula 2π·(radius)·(height), which does not apply to a slice perpendicular to the axis.' },
          { latex: 'V = \\pi\\int_0^2 y^4\\,dy', expr: 'integral(pi*y^4, y, 0, 2)', mistake: 'wrong-integration-variable', why: 'Disks about the x-axis are stacked along x; a dy integral with radius y² describes a different solid.' },
        ],
        correct: 0,
        explanation: '$V = \\int_0^4 \\pi R(x)^2\\,dx = \\pi\\int_0^4 (\\sqrt{x})^2\\,dx = \\pi\\int_0^4 x\\,dx$.',
        result: { latex: 'V = \\pi\\int_0^4 (\\sqrt{x})^2\\,dx = \\pi\\int_0^4 x\\,dx' },
        check: { kind: 'value', expected: '8*pi' },
      },
      {
        prompt: 'Evaluate the integral.',
        options: [
          { latex: 'V = 8\\pi', expr: '8*pi' },
          { latex: 'V = 16\\pi', expr: '16*pi', mistake: 'power-rule-int-coefficient', why: '∫x dx = x²/2; the division by 2 was skipped, giving 16π.' },
          { latex: 'V = 4\\pi', expr: '4*pi', mistake: 'arithmetic-error', why: '4²/2 = 8, not 4.' },
          { latex: 'V = \\frac{16\\pi}{3}', expr: '16*pi/3', mistake: 'radius-not-squared', why: 'This is π∫₀⁴√x dx — the integrand with the radius left unsquared.' },
          { latex: 'V = 8', expr: '8', mistake: 'pi-missing', why: 'The factor π from the disk area was dropped.' },
        ],
        correct: 0,
        explanation: '$\\pi\\left[\\frac{x^2}{2}\\right]_0^4 = \\pi\\cdot\\frac{16}{2} = 8\\pi$.',
        result: { latex: 'V = \\pi\\left[\\frac{x^2}{2}\\right]_0^4 = 8\\pi' },
        check: { kind: 'value', expected: '8*pi' },
      },
    ],
    final: {
      latex: 'V = 8\\pi',
      expr: '8*pi',
      check: { kind: 'definite-integral', integrand: 'pi*x', lower: '0', upper: '4' },
      recap: 'For a disk, the radius is the distance from the axis of rotation to the curve; square it, multiply by π, and integrate along the axis.',
    },
  },
];
