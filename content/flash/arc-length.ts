import type { FlashGenerator, FlashItem } from '../types';

/** Flash Drill items for topic "arc-length". Authored by content-author; verified by math-verifier. */
export const flash: FlashItem[] = [
  // ───────────── formulas & what they mean ─────────────
  {
    id: 'al-f-001',
    topic: 'arc-length',
    kind: 'formula',
    prompt: { text: "The curve $y = f(x)$ has $f'$ continuous on $[a, b]$. Its length from $x = a$ to $x = b$ is" },
    options: [
      { latex: "L = \\int_a^b \\sqrt{1 + \\left(f'(x)\\right)^2}\\,dx" },
      {
        latex: "L = \\int_c^d \\sqrt{1 + \\left(g'(y)\\right)^2}\\,dy",
        mistake: 'arclength-variable-mismatch',
        why: 'That is the formula for a curve written as x = g(y) with y-limits; this curve is y = f(x) with x-limits a and b.',
      },
      {
        latex: 'L = \\int_a^b \\sqrt{1 + \\left(f(x)\\right)^2}\\,dx',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The formula squares the slope f′(x), not the height f(x).',
      },
      {
        latex: "L = \\int_a^b \\sqrt{1 + f'(x)}\\,dx",
        mistake: 'arclength-not-squared',
        why: 'The derivative must be squared: the rise over a small piece is f′(x)dx, and the Pythagorean theorem squares it.',
      },
      {
        latex: "L = \\int_a^b \\left(1 + \\left(f'(x)\\right)^2\\right)dx",
        mistake: 'arclength-no-root',
        why: 'The square root is missing; without it the integrand is the squared length of a small piece, not its length.',
      },
      {
        latex: "L = \\int_a^b \\sqrt{\\left(f'(x)\\right)^2}\\,dx",
        mistake: 'arclength-missing-one',
        why: 'The 1 (from the horizontal leg dx) is missing; √((f′)²) = |f′| measures only the vertical change.',
      },
    ],
    correct: 0,
    explanation: "Theorem 5.1: for $y = f(x)$ on $[a, b]$, $L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\,dx$.",
    check: { kind: 'none', reason: 'formula recall for an arbitrary function f' },
    difficulty: 1,
  },
  {
    id: 'al-f-002',
    topic: 'arc-length',
    kind: 'formula',
    prompt: { text: "The curve $x = g(y)$ has $g'$ continuous on $[c, d]$. Its length from $y = c$ to $y = d$ is" },
    options: [
      { latex: "L = \\int_c^d \\sqrt{1 + \\left(g'(y)\\right)^2}\\,dy" },
      {
        latex: "L = \\int_a^b \\sqrt{1 + \\left(f'(x)\\right)^2}\\,dx",
        mistake: 'arclength-variable-mismatch',
        why: 'That is the formula for y = f(x) with x-limits; here the curve is x = g(y) and c, d are y-values.',
      },
      {
        latex: "L = \\int_c^d \\sqrt{1 + \\left(g'(y)\\right)^2}\\,dx",
        mistake: 'dx-dy-mismatch',
        why: 'The integrand and the limits are in y, so the differential must be dy, not dx.',
      },
      {
        latex: 'L = \\int_c^d \\sqrt{1 + \\left(g(y)\\right)^2}\\,dy',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The formula squares the derivative g′(y), not the function value g(y).',
      },
      {
        latex: "L = \\int_c^d \\left(1 + \\left|g'(y)\\right|\\right)dy",
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √((g′)²) = 1 + |g′|; a square root does not split over a sum.',
      },
      {
        latex: "L = \\int_c^d \\sqrt{1 + g'(y)}\\,dy",
        mistake: 'arclength-not-squared',
        why: 'The derivative g′(y) must be squared inside the root.',
      },
    ],
    correct: 0,
    explanation: "Theorem 5.2: for $x = g(y)$ on $[c, d]$, $L = \\int_c^d \\sqrt{1 + (g'(y))^2}\\,dy$.",
    check: { kind: 'none', reason: 'formula recall for an arbitrary function g' },
    difficulty: 1,
  },
  {
    id: 'al-f-003',
    topic: 'arc-length',
    kind: 'formula',
    prompt: { text: "In $L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\,dx$, the quantity $\\sqrt{1 + (f'(x))^2}\\,dx$ is" },
    options: [
      { text: "the length of the tiny piece of curve over $[x, x + dx]$, a hypotenuse with legs $dx$, $f'(x)\\,dx$" },
      {
        text: 'the area of the thin rectangle of width $dx$ and height $f(x)$ under the curve over $[x, x + dx]$',
        mistake: 'formula-swapped',
        why: 'That describes f(x)dx, the area element; arc length adds up hypotenuse lengths, not rectangle areas.',
      },
      {
        text: "the vertical rise $|f'(x)|\\,dx$ of the curve over $[x, x + dx]$, one leg of the small right triangle there",
        mistake: 'arclength-missing-one',
        why: 'The rise alone is √((f′)²)dx; the 1 under the root accounts for the horizontal leg dx.',
      },
      {
        text: "the sum $dx + |f'(x)|\\,dx$ of the horizontal run and the vertical rise of the small right triangle",
        mistake: 'sqrt-of-sum-split',
        why: 'Adding the two legs gives (1 + |f′|)dx; the hypotenuse √(dx² + (f′dx)²) is shorter than that sum.',
      },
      {
        text: "the squared length $(dx)^2 + (f'(x)\\,dx)^2$ of the tiny piece of the curve over $[x, x + dx]$",
        mistake: 'arclength-no-root',
        why: 'The squared length would be (1 + (f′)²)dx²; the square root turns it into an actual length.',
      },
      {
        text: 'the length of the straight chord from $(a, f(a))$ to $(b, f(b))$, split evenly over $[a, b]$',
        mistake: 'formula-swapped',
        why: 'The chord is one straight segment; the integral adds up tiny segments that follow the curve itself.',
      },
    ],
    correct: 0,
    explanation: "Over $[x, x + dx]$ the curve rises about $f'(x)\\,dx$, so the piece has length $\\sqrt{dx^2 + (f'(x)dx)^2} = \\sqrt{1 + (f'(x))^2}\\,dx$.",
    check: { kind: 'none', reason: 'conceptual: meaning of the arc-length element' },
    difficulty: 1,
  },
  {
    id: 'al-f-004',
    topic: 'arc-length',
    kind: 'formula',
    prompt: { text: 'The curve $y = f(x)$ runs from the point $(a, c)$ to the point $(b, d)$. Which expression gives its length?' },
    options: [
      { latex: "\\int_a^b \\sqrt{1 + \\left(f'(x)\\right)^2}\\,dx" },
      {
        latex: "\\int_c^d \\sqrt{1 + \\left(f'(x)\\right)^2}\\,dx",
        mistake: 'arclength-variable-mismatch',
        why: 'c and d are the y-coordinates of the endpoints; a dx integral runs over the x-coordinates a to b.',
      },
      {
        latex: "\\int_a^b \\sqrt{1 + \\left(f'(x)\\right)^2}\\,dy",
        mistake: 'dx-dy-mismatch',
        why: 'The integrand and the limits are in x, so the differential must be dx.',
      },
      {
        latex: "\\int_c^d \\sqrt{1 + \\left(f'(y)\\right)^2}\\,dy",
        mistake: 'arclength-variable-mismatch',
        why: 'To integrate in y the curve must be rewritten as x = g(y); f′(y) is not the slope dx/dy.',
      },
      {
        latex: '\\sqrt{(b - a)^2 + (d - c)^2}',
        mistake: 'formula-swapped',
        why: 'This is the straight-line distance between the endpoints (the chord), which is shorter than the curve unless the curve is a line.',
      },
      {
        latex: '\\int_a^b \\sqrt{1 + \\left(f(x)\\right)^2}\\,dx',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The formula squares the slope f′(x), not the height f(x).',
      },
    ],
    correct: 0,
    explanation: "Integrating in $x$ uses $y = f(x)$ and the endpoints' $x$-values: $L = \\int_a^b \\sqrt{1 + (f'(x))^2}\\,dx$.",
    check: { kind: 'none', reason: 'formula recall with symbolic limits' },
    difficulty: 1,
  },
  {
    id: 'al-f-005',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'To compute an arc length by integrating with respect to $y$, you must' },
    options: [
      { text: 'write the curve as $x = g(y)$ and use the $y$-values of the endpoints as the limits' },
      {
        text: 'write the curve as $x = g(y)$ and use the $x$-values of the endpoints as the limits',
        mistake: 'bounds-wrong-axis',
        why: 'In a dy integral the limits must be y-values; the x-values belong to a dx integral.',
      },
      {
        text: "keep $y = f(x)$, use $\\sqrt{1 + (f'(x))^2}$, and change $dx$ to $dy$ with the $y$-values as limits",
        mistake: 'dx-dy-mismatch',
        why: 'f′(x) is dy/dx and is written in x; a dy integral needs dx/dy = g′(y), written in y.',
      },
      {
        text: 'replace every $x$ in $f(x)$ by $y$ and use the $y$-values of the endpoints as the limits',
        mistake: 'inverse-function-wrong',
        why: 'Swapping the letters is not solving for x; x = g(y) comes from solving y = f(x) for x.',
      },
      {
        text: 'write the curve as $x = g(y)$ and integrate $\\sqrt{1 + (g(y))^2}$ over the $y$-values',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The integrand squares the derivative g′(y), not g(y) itself.',
      },
    ],
    correct: 0,
    explanation: 'Theorem 5.2 needs the curve as $x = g(y)$, the integrand $\\sqrt{1 + (g\'(y))^2}$, and $y$-values as limits.',
    check: { kind: 'none', reason: 'conceptual: setting up a dy arc-length integral' },
    difficulty: 1,
  },
  {
    id: 'al-f-006',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'To find the length of $y^2 = x^3$ from $(1, 1)$ to $(4, 8)$ by integrating with respect to $y$, use' },
    options: [
      { text: '$x = y^{2/3}$ with $1 \\le y \\le 8$' },
      {
        text: '$x = y^{2/3}$ with $1 \\le y \\le 4$',
        mistake: 'bounds-wrong-axis',
        why: '1 and 4 are the x-coordinates of the endpoints; a dy integral runs over the y-values 1 to 8.',
      },
      {
        text: '$x = y^{3/2}$ with $1 \\le y \\le 8$',
        mistake: 'inverse-function-wrong',
        why: 'From x³ = y², x = (y²)^{1/3} = y^{2/3}; the exponent 3/2 inverts the relation the wrong way.',
      },
      {
        text: '$y = x^{3/2}$ with $1 \\le y \\le 8$',
        mistake: 'arclength-variable-mismatch',
        why: 'A dy integral needs the curve solved for x as a function of y, not y as a function of x.',
      },
      {
        text: '$x = y^{1/3}$ with $1 \\le y \\le 8$',
        mistake: 'inverse-function-wrong',
        why: 'x³ = y² gives x = (y²)^{1/3} = y^{2/3}; the square on y was lost.',
      },
    ],
    correct: 0,
    explanation: 'Solve $x^3 = y^2$ for $x$: $x = y^{2/3}$; the endpoints have $y = 1$ and $y = 8$.',
    check: { kind: 'none', reason: 'options pair a curve with an interval (text)' },
    difficulty: 1,
  },
  {
    id: 'al-f-007',
    topic: 'arc-length',
    kind: 'concept',
    prompt: {
      text: 'For $y = \\frac{1}{2}\\ln(\\sin 2x)$ on $[\\frac{\\pi}{8}, \\frac{\\pi}{6}]$, the arc-length integrand becomes $\\sqrt{\\csc^2(2x)}$. Why may we replace it by $\\csc(2x)$?',
    },
    options: [
      { text: 'Here $2x \\in [\\frac{\\pi}{4}, \\frac{\\pi}{3}]$, so $\\sin 2x > 0$ and therefore $|\\csc 2x| = \\csc 2x$.' },
      {
        text: 'Because $\\sqrt{u^2} = u$ for every real number $u$, so the root and the square cancel.',
        mistake: 'sqrt-square-abs',
        why: '√(u²) = |u|, not u; the sign of csc 2x on the interval still has to be checked.',
      },
      {
        text: 'On $[\\frac{\\pi}{8}, \\frac{\\pi}{6}]$, $x$ is positive, so every expression in $x$ is positive there.',
        mistake: 'theta-interval-sign',
        why: 'What matters is the sign of csc 2x itself, not of x; plenty of functions are negative for positive x.',
      },
      {
        text: 'Since $\\csc^2(2x) = 1 + \\cot^2(2x) \\ge 1$, its square root is $\\csc 2x$ on any interval.',
        mistake: 'sqrt-square-abs',
        why: 'That only shows the radicand is at least 1; the root is still |csc 2x|, which equals −csc 2x where sin 2x < 0.',
      },
      {
        text: 'On $[\\frac{\\pi}{8}, \\frac{\\pi}{6}]$, $\\cos 2x > 0$, so $|\\csc 2x| = \\csc 2x$ there.',
        mistake: 'theta-interval-sign',
        why: 'csc 2x = 1/sin 2x, so its sign is the sign of sin 2x; the sign of cos 2x is irrelevant.',
      },
    ],
    correct: 0,
    explanation: '$\\sqrt{\\csc^2 2x} = |\\csc 2x|$, and for $2x \\in [\\frac{\\pi}{4}, \\frac{\\pi}{3}]$ we have $\\sin 2x > 0$, so $|\\csc 2x| = \\csc 2x$.',
    check: { kind: 'none', reason: 'conceptual: justification of √(u²) = |u| on the interval' },
    difficulty: 1,
  },
  {
    id: 'al-f-008',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'A curve can be written both as $y = f(x)$ and as $x = g(y)$. Which description should you use for its arc length?' },
    options: [
      { text: 'Either one gives the same length; choose the one with the simpler derivative and integrand.' },
      {
        text: 'Always $y = f(x)$: an arc-length integral must be taken with respect to $x$.',
        mistake: 'arclength-variable-mismatch',
        why: 'Theorem 5.2 integrates with respect to y; both variables are allowed.',
      },
      {
        text: 'The one whose interval of integration is shorter, since that gives the smaller, correct length.',
        mistake: 'method-choice-poor',
        why: 'Both integrals give the same length of the same curve; only the difficulty of the integral changes.',
      },
      {
        text: 'Either one, but they give different lengths, so the $x$-version is the official answer.',
        mistake: 'arclength-variable-mismatch',
        why: 'Both describe the same curve, so the two integrals are equal; neither is more official.',
      },
      {
        text: 'Always $x = g(y)$, because integrals in $y$ never contain a square root.',
        mistake: 'technique-wrong',
        why: 'The dy formula has the same √(1 + (g′)²) structure; choose by which derivative is simpler.',
      },
    ],
    correct: 0,
    explanation: 'Both formulas measure the same curve; the lecture says to choose the representation with the simpler derivative and integrand.',
    check: { kind: 'none', reason: 'conceptual: choosing the variable of integration' },
    difficulty: 1,
  },

  // ───────────── "the arc-length integrand for … is" (identity checks) ─────────────
  {
    id: 'al-f-009',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "The arc-length integrand $\\sqrt{1 + (f'(x))^2}$ for $y = \\frac{2}{3}x^{3/2}$ is" },
    options: [
      { latex: '\\sqrt{1 + x}', expr: 'sqrt(1 + x)' },
      {
        latex: '\\sqrt{1 + \\frac{4}{9}x^3}',
        expr: 'sqrt(1 + 4/9*x^3)',
        mistake: 'arclength-f-instead-of-fprime',
        why: '(⅔x^{3/2})² = (4/9)x³ is f(x)², not the square of the derivative f′(x) = x^{1/2}.',
      },
      {
        latex: '\\sqrt{1 + \\sqrt{x}}',
        expr: 'sqrt(1 + sqrt(x))',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = √x was put under the root without squaring it; (√x)² = x.',
      },
      {
        latex: '1 + \\sqrt{x}',
        expr: '1 + sqrt(x)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √x; √(1 + x) is not 1 + √x.',
      },
      {
        latex: '\\sqrt{1 + x^2}',
        expr: 'sqrt(1 + x^2)',
        mistake: 'power-rule-exponent',
        why: 'f′ was taken as x (exponent lowered by ½ instead of by 1); the correct f′ = ⅔·(3/2)x^{1/2} = x^{1/2}.',
      },
      {
        latex: '\\sqrt{1 + \\frac{4}{9}x}',
        expr: 'sqrt(1 + 4/9*x)',
        mistake: 'power-rule-coefficient',
        why: 'The exponent 3/2 was not brought down: f′ = ⅔·(3/2)x^{1/2} = x^{1/2}, not ⅔x^{1/2}.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{2}{3}\\cdot\\frac{3}{2}x^{1/2} = \\sqrt{x}$, so $1 + (f'(x))^2 = 1 + x$.",
    check: { kind: 'identity', lhs: 'sqrt(1 + (2/3*3/2*x^(1/2))^2)' },
    difficulty: 1,
  },
  {
    id: 'al-f-010',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "The arc-length integrand $\\sqrt{1 + (f'(x))^2}$ for $y = \\ln(\\cos x)$ is" },
    options: [
      { latex: '\\sqrt{1 + \\tan^2 x}', expr: 'sqrt(1 + tan(x)^2)' },
      {
        latex: '\\sqrt{1 + \\cot^2 x}',
        expr: 'sqrt(1 + cot(x)^2)',
        mistake: 'log-derivative-wrong',
        why: 'd/dx ln u = u′/u = −sin x/cos x; flipping the quotient to u/u′ gives cot x instead of −tan x.',
      },
      {
        latex: '\\sqrt{1 + \\sec^2 x}',
        expr: 'sqrt(1 + sec(x)^2)',
        mistake: 'chain-rule-missing',
        why: 'd/dx ln(cos x) was written as 1/cos x; the inner derivative −sin x is missing.',
      },
      {
        latex: '\\sqrt{1 - \\tan x}',
        expr: 'sqrt(1 - tan(x))',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = −tan x was placed under the root without being squared.',
      },
      {
        latex: '\\sqrt{1 + \\ln^2(\\cos x)}',
        expr: 'sqrt(1 + log(cos(x))^2)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares f(x) = ln(cos x) instead of the derivative f′(x) = −tan x.',
      },
      {
        latex: '\\sqrt{1 - \\tan^2 x}',
        expr: 'sqrt(1 - tan(x)^2)',
        mistake: 'negative-squared-wrong',
        why: '(−tan x)² = +tan²x; the minus sign cannot survive squaring.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{-\\sin x}{\\cos x} = -\\tan x$, and $(-\\tan x)^2 = \\tan^2 x$.",
    domain: [0.2, 0.7],
    check: { kind: 'identity', lhs: 'sqrt(1 + (-sin(x)/cos(x))^2)' },
    difficulty: 1,
  },
  {
    id: 'al-f-011',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "The arc-length integrand $\\sqrt{1 + (f'(x))^2}$ for $y = \\frac{1}{2}\\ln(\\sin 2x)$ is" },
    options: [
      { latex: '\\sqrt{1 + \\cot^2(2x)}', expr: 'sqrt(1 + cot(2*x)^2)' },
      {
        latex: '\\sqrt{1 + \\frac{1}{4}\\cot^2(2x)}',
        expr: 'sqrt(1 + cot(2*x)^2/4)',
        mistake: 'chain-rule-missing',
        why: 'The inner derivative 2 of sin 2x was dropped, leaving f′ = ½cot 2x instead of cot 2x.',
      },
      {
        latex: '\\sqrt{1 + 4\\cot^2(2x)}',
        expr: 'sqrt(1 + 4*cot(2*x)^2)',
        mistake: 'coefficient-mishandled',
        why: 'The factor ½ in front of ln was dropped, leaving f′ = 2cot 2x; with it, ½·2cot 2x = cot 2x.',
      },
      {
        latex: '\\sqrt{1 + \\tan^2(2x)}',
        expr: 'sqrt(1 + tan(2*x)^2)',
        mistake: 'log-derivative-wrong',
        why: 'd/dx ln u = u′/u = 2cos 2x/sin 2x; flipping it to u/u′ produces tan 2x.',
      },
      {
        latex: '\\sqrt{1 + \\cot(2x)}',
        expr: 'sqrt(1 + cot(2*x))',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = cot 2x was placed under the root without being squared.',
      },
      {
        latex: '\\sqrt{1 + \\frac{1}{4}\\ln^2(\\sin 2x)}',
        expr: 'sqrt(1 + log(sin(2*x))^2/4)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares f(x) = ½ln(sin 2x) itself instead of its derivative cot 2x.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{1}{2}\\cdot\\frac{2\\cos 2x}{\\sin 2x} = \\cot 2x$, so the integrand is $\\sqrt{1 + \\cot^2(2x)}$.",
    domain: [0.3, 0.6],
    check: { kind: 'identity', lhs: 'sqrt(1 + (1/2*(2*cos(2*x))/sin(2*x))^2)' },
    difficulty: 2,
  },
  {
    id: 'al-f-012',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "The arc-length integrand $\\sqrt{1 + (f'(x))^2}$ for $y = \\ln x$ is" },
    options: [
      { latex: '\\sqrt{1 + \\frac{1}{x^2}}', expr: 'sqrt(1 + 1/x^2)' },
      {
        latex: '\\sqrt{1 + (\\ln x)^2}',
        expr: 'sqrt(1 + log(x)^2)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares f(x) = ln x instead of its derivative 1/x.',
      },
      {
        latex: '\\sqrt{1 + \\frac{1}{x}}',
        expr: 'sqrt(1 + 1/x)',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = 1/x was placed under the root without being squared.',
      },
      {
        latex: '\\sqrt{1 + \\frac{1}{x^4}}',
        expr: 'sqrt(1 + 1/x^4)',
        mistake: 'log-derivative-wrong',
        why: 'd/dx ln x was taken as 1/x²; it is 1/x, whose square is 1/x².',
      },
      {
        latex: '1 + \\frac{1}{x}',
        expr: '1 + 1/x',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √(1/x²); a square root does not distribute over a sum.',
      },
      {
        latex: '\\sqrt{\\frac{1}{x^2}}',
        expr: 'sqrt(1/x^2)',
        mistake: 'arclength-missing-one',
        why: 'The 1 under the root is missing; √((f′)²) alone measures only the vertical change.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{1}{x}$, so $\\sqrt{1 + (f'(x))^2} = \\sqrt{1 + \\frac{1}{x^2}}$.",
    check: { kind: 'identity', lhs: 'sqrt(1 + (1/x)^2)' },
    difficulty: 1,
  },
  {
    id: 'al-f-013',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "The arc-length integrand $\\sqrt{1 + (f'(x))^2}$ for $f(x) = (x^4 - 1)^{3/2}$ is" },
    options: [
      { latex: '\\sqrt{1 + 36x^6(x^4 - 1)}', expr: 'sqrt(1 + 36*x^6*(x^4 - 1))' },
      {
        latex: '\\sqrt{1 + \\frac{9}{4}(x^4 - 1)}',
        expr: 'sqrt(1 + 9/4*(x^4 - 1))',
        mistake: 'chain-rule-missing',
        why: 'The inner derivative 4x³ of x⁴ − 1 was dropped, so f′ = (3/2)(x⁴ − 1)^{1/2}.',
      },
      {
        latex: '\\sqrt{1 + (x^4 - 1)^3}',
        expr: 'sqrt(1 + (x^4 - 1)^3)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares f(x) = (x⁴ − 1)^{3/2}, not its derivative.',
      },
      {
        latex: '\\sqrt{1 + 6x^3(x^4 - 1)^{1/2}}',
        expr: 'sqrt(1 + 6*x^3*(x^4 - 1)^(1/2))',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = 6x³(x⁴ − 1)^{1/2} was placed under the root without being squared.',
      },
      {
        latex: '\\sqrt{1 + 6x^6(x^4 - 1)}',
        expr: 'sqrt(1 + 6*x^6*(x^4 - 1))',
        mistake: 'coefficient-mishandled',
        why: '(6x³)² = 36x⁶; the coefficient 6 was not squared.',
      },
      {
        latex: '\\sqrt{1 + 36x^6(x^4 - 1)^3}',
        expr: 'sqrt(1 + 36*x^6*(x^4 - 1)^3)',
        mistake: 'power-rule-exponent',
        why: 'The exponent 3/2 was not lowered to 1/2 in f′, so squaring left (x⁴ − 1)³ instead of (x⁴ − 1).',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{3}{2}(x^4 - 1)^{1/2}\\cdot 4x^3 = 6x^3\\sqrt{x^4 - 1}$, so $(f'(x))^2 = 36x^6(x^4 - 1)$.",
    domain: [1.05, 1.6],
    check: { kind: 'identity', lhs: 'sqrt(1 + (3/2*(x^4 - 1)^(1/2)*4*x^3)^2)' },
    difficulty: 2,
  },
  {
    id: 'al-f-014',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "The arc-length integrand $\\sqrt{1 + (g'(y))^2}$ for $x = \\frac{y^3}{6} + \\frac{1}{2y}$ is" },
    options: [
      { latex: '\\sqrt{1 + \\left(\\frac{y^2}{2} - \\frac{1}{2y^2}\\right)^2}', expr: 'sqrt(1 + (y^2/2 - 1/(2*y^2))^2)' },
      {
        latex: '\\sqrt{1 + \\left(\\frac{y^3}{6} + \\frac{1}{2y}\\right)^2}',
        expr: 'sqrt(1 + (y^3/6 + 1/(2*y))^2)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares g(y) itself instead of its derivative g′(y).',
      },
      {
        latex: '\\sqrt{1 + \\left(\\frac{y^2}{2} + \\frac{1}{2y^2}\\right)^2}',
        expr: 'sqrt(1 + (y^2/2 + 1/(2*y^2))^2)',
        mistake: 'negative-exponent-sign',
        why: 'd/dy (1/(2y)) = −1/(2y²); the minus sign from the negative exponent was lost.',
      },
      {
        latex: '\\sqrt{1 + \\left(\\frac{y^2}{6} - \\frac{1}{2y^2}\\right)^2}',
        expr: 'sqrt(1 + (y^2/6 - 1/(2*y^2))^2)',
        mistake: 'power-rule-coefficient',
        why: 'd/dy (y³/6) = 3y²/6 = y²/2; the exponent 3 was not brought down.',
      },
      {
        latex: '\\sqrt{1 + \\frac{y^2}{2} - \\frac{1}{2y^2}}',
        expr: 'sqrt(1 + y^2/2 - 1/(2*y^2))',
        mistake: 'arclength-not-squared',
        why: 'g′(y) was placed under the root without being squared.',
      },
      {
        latex: '\\sqrt{1 + \\left(\\frac{y^2}{2} - \\frac{1}{2y}\\right)^2}',
        expr: 'sqrt(1 + (y^2/2 - 1/(2*y))^2)',
        mistake: 'power-rule-exponent',
        why: 'd/dy (½y^{−1}) = −½y^{−2}; the exponent −1 was not lowered to −2.',
      },
    ],
    correct: 0,
    explanation: "$g'(y) = \\frac{y^2}{2} - \\frac{1}{2y^2}$, and the $dy$ formula squares it: $\\sqrt{1 + (g'(y))^2}$.",
    variable: 'y',
    domain: [1, 2],
    check: { kind: 'identity', lhs: 'sqrt(1 + (3*y^2/6 - 1/(2*y^2))^2)' },
    difficulty: 1,
  },
  {
    id: 'al-f-015',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "The arc-length integrand $\\sqrt{1 + (f'(x))^2}$ for $y = e^{2x}$ is" },
    options: [
      { latex: '\\sqrt{1 + 4e^{4x}}', expr: 'sqrt(1 + 4*exp(4*x))' },
      {
        latex: '\\sqrt{1 + e^{4x}}',
        expr: 'sqrt(1 + exp(4*x))',
        mistake: 'chain-rule-missing',
        why: 'd/dx e^{2x} = 2e^{2x}; without the inner derivative 2 the square is only e^{4x}.',
      },
      {
        latex: '\\sqrt{1 + 2e^{4x}}',
        expr: 'sqrt(1 + 2*exp(4*x))',
        mistake: 'coefficient-mishandled',
        why: '(2e^{2x})² = 4e^{4x}; the coefficient 2 was not squared.',
      },
      {
        latex: '\\sqrt{1 + 4e^{2x}}',
        expr: 'sqrt(1 + 4*exp(2*x))',
        mistake: 'algebra-error',
        why: '(e^{2x})² = e^{4x}: squaring an exponential doubles its exponent, but here it stayed e^{2x}.',
      },
      {
        latex: '\\sqrt{1 + 2e^{2x}}',
        expr: 'sqrt(1 + 2*exp(2*x))',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = 2e^{2x} was placed under the root without being squared.',
      },
      {
        latex: '\\sqrt{1 + \\frac{1}{4}e^{4x}}',
        expr: 'sqrt(1 + exp(4*x)/4)',
        mistake: 'integrated-instead',
        why: '½e^{2x} is an antiderivative of e^{2x}, not its derivative 2e^{2x}.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = 2e^{2x}$, so $(f'(x))^2 = 4e^{4x}$.",
    check: { kind: 'identity', lhs: 'sqrt(1 + (2*exp(2*x))^2)' },
    difficulty: 1,
  },
  {
    id: 'al-f-016',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "For the upper semicircle $y = \\sqrt{1 - x^2}$, the expression $1 + (f'(x))^2$ simplifies to" },
    options: [
      { latex: '\\frac{1}{1 - x^2}', expr: '1/(1 - x^2)' },
      {
        latex: '2 - x^2',
        expr: '2 - x^2',
        mistake: 'arclength-f-instead-of-fprime',
        why: '1 + (√(1 − x²))² = 2 − x² uses f(x); the formula needs f′(x) = −x/√(1 − x²).',
      },
      {
        latex: '\\frac{1 - 2x^2}{1 - x^2}',
        expr: '(1 - 2*x^2)/(1 - x^2)',
        mistake: 'negative-squared-wrong',
        why: '(−x/√(1 − x²))² = +x²/(1 − x²); the minus sign was kept after squaring.',
      },
      {
        latex: '\\frac{1 + x^2}{1 - x^2}',
        expr: '(1 + x^2)/(1 - x^2)',
        mistake: 'algebra-error',
        why: '1 + x²/(1 − x²) was combined as (1 + x²)/(1 − x²); the 1 must first become (1 − x²)/(1 − x²).',
      },
      {
        latex: '\\frac{5 - 4x^2}{4 - 4x^2}',
        expr: '(5 - 4*x^2)/(4 - 4*x^2)',
        mistake: 'chain-rule-missing',
        why: 'f′ was taken as 1/(2√(1 − x²)) without the inner derivative −2x, giving 1 + 1/(4(1 − x²)).',
      },
      {
        latex: '\\frac{x^2}{1 - x^2}',
        expr: 'x^2/(1 - x^2)',
        mistake: 'arclength-missing-one',
        why: 'This is (f′)² alone; the 1 was never added.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{-x}{\\sqrt{1 - x^2}}$, so $1 + \\frac{x^2}{1 - x^2} = \\frac{1 - x^2 + x^2}{1 - x^2} = \\frac{1}{1 - x^2}$.",
    domain: [0.1, 0.9],
    check: { kind: 'identity', lhs: '1 + (-x/sqrt(1 - x^2))^2' },
    difficulty: 2,
  },
  {
    id: 'al-f-017',
    topic: 'arc-length',
    kind: 'concept',
    prompt: {
      text: "For the first-quadrant arc of the astroid, $y = (1 - x^{2/3})^{3/2}$, the integrand $\\sqrt{1 + (f'(x))^2}$ simplifies to",
    },
    options: [
      { latex: 'x^{-1/3}', expr: 'x^(-1/3)' },
      {
        latex: 'x^{-2/3}',
        expr: 'x^(-2/3)',
        mistake: 'arclength-no-root',
        why: 'x^{−2/3} is 1 + (f′)² itself; the square root still has to be taken, giving x^{−1/3}.',
      },
      {
        latex: '\\sqrt{x^{-2/3} - 1}',
        expr: 'sqrt(x^(-2/3) - 1)',
        mistake: 'arclength-missing-one',
        why: '(f′)² = x^{−2/3}(1 − x^{2/3}) = x^{−2/3} − 1; the 1 was never added before taking the root.',
      },
      {
        latex: '1 + x^{-1/3}\\sqrt{1 - x^{2/3}}',
        expr: '1 + x^(-1/3)*sqrt(1 - x^(2/3))',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √((f′)²) = 1 + |f′|; a square root does not split over a sum.',
      },
      {
        latex: '\\sqrt{\\frac{13}{4} - \\frac{9}{4}x^{2/3}}',
        expr: 'sqrt(13/4 - 9/4*x^(2/3))',
        mistake: 'chain-rule-missing',
        why: 'f′ was taken as (3/2)(1 − x^{2/3})^{1/2}, missing the inner derivative −(2/3)x^{−1/3}.',
      },
      {
        latex: '\\sqrt{\\frac{9}{4}x^{-2/3} - \\frac{5}{4}}',
        expr: 'sqrt(9/4*x^(-2/3) - 5/4)',
        mistake: 'power-rule-coefficient',
        why: 'd/dx x^{2/3} was taken as x^{−1/3} without the factor 2/3, so f′ picked up an extra factor 3/2.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = -x^{-1/3}(1 - x^{2/3})^{1/2}$, so $1 + (f')^2 = 1 + x^{-2/3} - 1 = x^{-2/3}$, whose square root is $x^{-1/3}$.",
    domain: [0.1, 0.9],
    check: { kind: 'identity', lhs: 'sqrt(1 + ((3/2)*(1 - x^(2/3))^(1/2)*(-(2/3)*x^(-1/3)))^2)' },
    difficulty: 2,
  },
  {
    id: 'al-f-018',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $y = \\frac{1}{3}(x^2 + 2)^{3/2}$ for $0 \\le x \\le 1$ simplifies to' },
    options: [
      { latex: '\\int_0^1 \\left(x^2 + 1\\right)dx', expr: 'integral(x^2 + 1, x, 0, 1)' },
      {
        latex: '\\int_0^1 x\\sqrt{x^2 + 2}\\,dx',
        expr: 'integral(x*sqrt(x^2 + 2), x, 0, 1)',
        mistake: 'arclength-missing-one',
        why: 'Without the 1, the root of (f′)² = x²(x² + 2) is just |f′| = x√(x² + 2).',
      },
      {
        latex: '\\int_0^1 \\left(1 + x\\sqrt{x^2 + 2}\\right)dx',
        expr: 'integral(1 + x*sqrt(x^2 + 2), x, 0, 1)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √((f′)²); instead combine 1 + x⁴ + 2x² = (x² + 1)² first.',
      },
      {
        latex: '\\int_0^1 (x^2 + 1)^2\\,dx',
        expr: 'integral((x^2 + 1)^2, x, 0, 1)',
        mistake: 'arclength-no-root',
        why: '1 + (f′)² = (x² + 1)² is the radicand; the square root was never taken.',
      },
      {
        latex: '\\int_0^1 \\sqrt{\\frac{x^2}{4} + \\frac{3}{2}}\\,dx',
        expr: 'integral(sqrt(x^2/4 + 3/2), x, 0, 1)',
        mistake: 'chain-rule-missing',
        why: 'f′ was taken as ½(x² + 2)^{1/2}, missing the inner derivative 2x, so no perfect square appears.',
      },
      {
        latex: '\\int_0^1 \\sqrt{1 + \\frac{(x^2 + 2)^3}{9}}\\,dx',
        expr: 'integral(sqrt(1 + (x^2 + 2)^3/9), x, 0, 1)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares f(x) = ⅓(x² + 2)^{3/2} instead of f′(x) = x√(x² + 2).',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = x\\sqrt{x^2 + 2}$, so $1 + (f')^2 = x^4 + 2x^2 + 1 = (x^2 + 1)^2$ and the root is $x^2 + 1$.",
    check: { kind: 'value', expected: '4/3' },
    difficulty: 1,
  },
  {
    id: 'al-f-019',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $y^2 = x^3$ from $(1, 1)$ to $(4, 8)$, written as an integral in $x$, is' },
    options: [
      { latex: '\\int_1^4 \\sqrt{1 + \\frac{9}{4}x}\\,dx', expr: 'integral(sqrt(1 + 9/4*x), x, 1, 4)' },
      {
        latex: '\\int_1^8 \\sqrt{1 + \\frac{9}{4}x}\\,dx',
        expr: 'integral(sqrt(1 + 9/4*x), x, 1, 8)',
        mistake: 'arclength-variable-mismatch',
        why: '1 and 8 are the y-coordinates of the endpoints; a dx integral runs from x = 1 to x = 4.',
      },
      {
        latex: '\\int_1^4 \\sqrt{1 + x^3}\\,dx',
        expr: 'integral(sqrt(1 + x^3), x, 1, 4)',
        mistake: 'arclength-f-instead-of-fprime',
        why: '(x^{3/2})² = x³ is f(x)²; the formula needs (f′(x))² = (9/4)x.',
      },
      {
        latex: '\\int_1^4 \\sqrt{1 + \\frac{3}{2}x^{1/2}}\\,dx',
        expr: 'integral(sqrt(1 + 3/2*x^(1/2)), x, 1, 4)',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = (3/2)x^{1/2} was placed under the root without being squared.',
      },
      {
        latex: '\\int_1^4 \\left(1 + \\frac{9}{4}x\\right)dx',
        expr: 'integral(1 + 9/4*x, x, 1, 4)',
        mistake: 'arclength-no-root',
        why: 'The square root around 1 + (f′)² is missing.',
      },
      {
        latex: '\\int_1^4 \\sqrt{1 + \\frac{9}{4}x^2}\\,dx',
        expr: 'integral(sqrt(1 + 9/4*x^2), x, 1, 4)',
        mistake: 'power-rule-exponent',
        why: 'f′ was taken as (3/2)x (exponent lowered by ½); the correct f′ = (3/2)x^{1/2} squares to (9/4)x.',
      },
    ],
    correct: 0,
    explanation: "On the upper branch $y = x^{3/2}$, $f'(x) = \\frac{3}{2}x^{1/2}$, so $L = \\int_1^4 \\sqrt{1 + \\frac{9}{4}x}\\,dx$ over the $x$-values 1 to 4.",
    check: { kind: 'value', expected: '(80*sqrt(10) - 13*sqrt(13))/27' },
    difficulty: 1,
  },
  {
    id: 'al-f-020',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $y^2 = x^3$ from $(1, 1)$ to $(4, 8)$, written as an integral in $y$, is' },
    options: [
      { latex: '\\int_1^8 \\sqrt{1 + \\frac{4}{9}y^{-2/3}}\\,dy', expr: 'integral(sqrt(1 + 4/9*y^(-2/3)), y, 1, 8)' },
      {
        latex: '\\int_1^4 \\sqrt{1 + \\frac{4}{9}y^{-2/3}}\\,dy',
        expr: 'integral(sqrt(1 + 4/9*y^(-2/3)), y, 1, 4)',
        mistake: 'arclength-variable-mismatch',
        why: '1 and 4 are the x-coordinates; in y the endpoints are y = 1 and y = 8.',
      },
      {
        latex: '\\int_1^8 \\sqrt{1 + \\frac{9}{4}y}\\,dy',
        expr: 'integral(sqrt(1 + 9/4*y), y, 1, 8)',
        mistake: 'arclength-variable-mismatch',
        why: 'This reuses (f′(x))² = 9x/4 with x renamed y; in y the slope is g′(y) = (2/3)y^{−1/3}.',
      },
      {
        latex: '\\int_1^8 \\sqrt{1 + y^{4/3}}\\,dy',
        expr: 'integral(sqrt(1 + y^(4/3)), y, 1, 8)',
        mistake: 'arclength-f-instead-of-fprime',
        why: '(y^{2/3})² = y^{4/3} is g(y)²; the formula needs (g′(y))².',
      },
      {
        latex: '\\int_1^8 \\sqrt{1 + \\frac{2}{3}y^{-1/3}}\\,dy',
        expr: 'integral(sqrt(1 + 2/3*y^(-1/3)), y, 1, 8)',
        mistake: 'arclength-not-squared',
        why: 'g′(y) = (2/3)y^{−1/3} was placed under the root without being squared.',
      },
      {
        latex: '\\int_1^8 \\sqrt{1 + \\frac{4}{9}y^{2/3}}\\,dy',
        expr: 'integral(sqrt(1 + 4/9*y^(2/3)), y, 1, 8)',
        mistake: 'power-rule-exponent',
        why: 'd/dy y^{2/3} = (2/3)y^{−1/3}; the new exponent 2/3 − 1 = −1/3 was taken as +1/3.',
      },
    ],
    correct: 0,
    explanation: "Here $x = y^{2/3}$, $g'(y) = \\frac{2}{3}y^{-1/3}$, $(g')^2 = \\frac{4}{9}y^{-2/3}$, and $y$ runs from 1 to 8.",
    check: { kind: 'value', expected: '(80*sqrt(10) - 13*sqrt(13))/27' },
    difficulty: 2,
  },
  {
    id: 'al-f-021',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'Using the upper semicircle $y = \\sqrt{1 - x^2}$ and symmetry, the perimeter of the unit circle equals' },
    options: [
      { latex: '4\\int_0^1 \\frac{1}{\\sqrt{1 - x^2}}\\,dx', expr: '4*integral(1/sqrt(1 - x^2), x, 0, 1)' },
      {
        latex: '\\int_{-1}^{1} \\frac{1}{\\sqrt{1 - x^2}}\\,dx',
        expr: 'integral(1/sqrt(1 - x^2), x, -1, 1)',
        mistake: 'coefficient-mishandled',
        why: 'y = √(1 − x²) traces only the upper half of the circle; the lower half doubles the result.',
      },
      {
        latex: '\\int_0^1 \\frac{1}{\\sqrt{1 - x^2}}\\,dx',
        expr: 'integral(1/sqrt(1 - x^2), x, 0, 1)',
        mistake: 'coefficient-mishandled',
        why: 'From x = 0 to x = 1 the upper semicircle is one quarter of the circle; multiply by 4.',
      },
      {
        latex: '4\\int_0^1 \\frac{x}{\\sqrt{1 - x^2}}\\,dx',
        expr: '4*integral(x/sqrt(1 - x^2), x, 0, 1)',
        mistake: 'arclength-missing-one',
        why: 'x/√(1 − x²) is √((f′)²) = |f′|; the 1 under the root was dropped.',
      },
      {
        latex: '4\\int_0^1 \\sqrt{2 - x^2}\\,dx',
        expr: '4*integral(sqrt(2 - x^2), x, 0, 1)',
        mistake: 'arclength-f-instead-of-fprime',
        why: '1 + (√(1 − x²))² = 2 − x² squares f(x); the formula squares f′(x) = −x/√(1 − x²).',
      },
      {
        latex: '4\\int_0^1 \\left(1 + \\frac{x}{\\sqrt{1 - x^2}}\\right)dx',
        expr: '4*integral(1 + x/sqrt(1 - x^2), x, 0, 1)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √((f′)²); combine 1 + x²/(1 − x²) = 1/(1 − x²) first.',
      },
    ],
    correct: 0,
    explanation: "$1 + (f')^2 = \\frac{1}{1 - x^2}$; the arc from $x = 0$ to $1$ is a quarter circle, so the perimeter is $4\\int_0^1 \\frac{dx}{\\sqrt{1 - x^2}}$.",
    check: { kind: 'value', expected: '2*pi' },
    difficulty: 1,
  },
  {
    id: 'al-f-022',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $y = \\ln(\\cos x)$ for $0 \\le x \\le \\frac{\\pi}{3}$ simplifies to' },
    options: [
      { latex: '\\int_0^{\\pi/3} \\sec x\\,dx', expr: 'integral(sec(x), x, 0, pi/3)' },
      {
        latex: '\\int_0^{\\pi/3} \\tan x\\,dx',
        expr: 'integral(tan(x), x, 0, pi/3)',
        mistake: 'arclength-missing-one',
        why: 'Without the 1, √(tan²x) = tan x only measures the vertical change; 1 + tan²x = sec²x.',
      },
      {
        latex: '\\int_0^{\\pi/3} \\sec^2 x\\,dx',
        expr: 'integral(sec(x)^2, x, 0, pi/3)',
        mistake: 'arclength-no-root',
        why: '1 + tan²x = sec²x is the radicand; its square root is sec x.',
      },
      {
        latex: '\\int_0^{\\pi/3} (1 + \\tan x)\\,dx',
        expr: 'integral(1 + tan(x), x, 0, pi/3)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √(tan²x); use 1 + tan²x = sec²x instead.',
      },
      {
        latex: '\\int_0^{\\pi/3} (-\\sec x)\\,dx',
        expr: 'integral(-sec(x), x, 0, pi/3)',
        mistake: 'theta-interval-sign',
        why: '√(sec²x) = |sec x|, and sec x > 0 on [0, π/3]; a length cannot come out negative.',
      },
      {
        latex: '\\int_0^{\\pi/3} \\sqrt{1 + \\ln^2(\\cos x)}\\,dx',
        expr: 'integral(sqrt(1 + log(cos(x))^2), x, 0, pi/3)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares f(x) = ln(cos x) instead of f′(x) = −tan x.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = -\\tan x$, $1 + \\tan^2 x = \\sec^2 x$, and $\\sqrt{\\sec^2 x} = \\sec x$ because $\\cos x > 0$ on $[0, \\frac{\\pi}{3}]$.",
    check: { kind: 'value', expected: 'log(2 + sqrt(3))' },
    difficulty: 1,
  },
  {
    id: 'al-f-023',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $y = \\frac{1}{2}\\ln(\\sin 2x)$ for $\\frac{\\pi}{8} \\le x \\le \\frac{\\pi}{6}$ simplifies to' },
    options: [
      { latex: '\\int_{\\pi/8}^{\\pi/6} \\csc(2x)\\,dx', expr: 'integral(csc(2*x), x, pi/8, pi/6)' },
      {
        latex: '\\int_{\\pi/8}^{\\pi/6} \\cot(2x)\\,dx',
        expr: 'integral(cot(2*x), x, pi/8, pi/6)',
        mistake: 'arclength-missing-one',
        why: 'Without the 1, √(cot²2x) = cot 2x; the 1 is what turns cot² into csc².',
      },
      {
        latex: '\\int_{\\pi/8}^{\\pi/6} \\csc^2(2x)\\,dx',
        expr: 'integral(csc(2*x)^2, x, pi/8, pi/6)',
        mistake: 'arclength-no-root',
        why: '1 + cot²2x = csc²2x is the radicand; its square root is csc 2x.',
      },
      {
        latex: '\\int_{\\pi/8}^{\\pi/6} \\sec(2x)\\,dx',
        expr: 'integral(sec(2*x), x, pi/8, pi/6)',
        mistake: 'pythagorean-wrong',
        why: 'The identity is 1 + cot²θ = csc²θ; sec² pairs with tan².',
      },
      {
        latex: '\\int_{\\pi/8}^{\\pi/6} \\frac{1}{2}\\csc(2x)\\,dx',
        expr: 'integral(csc(2*x)/2, x, pi/8, pi/6)',
        mistake: 'coefficient-mishandled',
        why: 'The ½ from f is used up in f′ = ½·(2cos 2x/sin 2x) = cot 2x; it does not reappear in front.',
      },
      {
        latex: '\\int_{\\pi/8}^{\\pi/6} \\left(1 + \\cot(2x)\\right)dx',
        expr: 'integral(1 + cot(2*x), x, pi/8, pi/6)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √(cot²2x); use 1 + cot²2x = csc²2x instead.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\cot 2x$, $1 + \\cot^2 2x = \\csc^2 2x$, and $\\csc 2x > 0$ on the interval, so $L = \\int \\csc(2x)\\,dx$.",
    check: { kind: 'value', expected: 'log((sqrt(2) + 1)/sqrt(3))/2' },
    difficulty: 2,
  },
  {
    id: 'al-f-024',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $x = e^{y} + \\frac{1}{4}e^{-y}$ for $0 \\le y \\le 1$ simplifies to' },
    options: [
      { latex: '\\int_0^1 \\left(e^{y} + \\frac{1}{4}e^{-y}\\right)dy', expr: 'integral(exp(y) + exp(-y)/4, y, 0, 1)' },
      {
        latex: '\\int_0^1 \\left(e^{y} - \\frac{1}{4}e^{-y}\\right)dy',
        expr: 'integral(exp(y) - exp(-y)/4, y, 0, 1)',
        mistake: 'arclength-missing-one',
        why: 'This is √((g′)²) = g′: without the 1 the middle term of the square never flips to +½.',
      },
      {
        latex: '\\int_0^1 \\left(1 + e^{y} - \\frac{1}{4}e^{-y}\\right)dy',
        expr: 'integral(1 + exp(y) - exp(-y)/4, y, 0, 1)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √((g′)²); instead 1 + (g′)² = (e^y + ¼e^{−y})².',
      },
      {
        latex: '\\int_0^1 \\left(e^{y} + \\frac{1}{4}e^{-y}\\right)^2 dy',
        expr: 'integral((exp(y) + exp(-y)/4)^2, y, 0, 1)',
        mistake: 'arclength-no-root',
        why: '(e^y + ¼e^{−y})² is the radicand; the square root was never taken.',
      },
      {
        latex: '\\int_{5/4}^{e + 1/(4e)} \\left(e^{y} + \\frac{1}{4}e^{-y}\\right)dy',
        expr: 'integral(exp(y) + exp(-y)/4, y, 5/4, e + 1/(4*e))',
        mistake: 'arclength-variable-mismatch',
        why: '5/4 and e + 1/(4e) are the x-values of the endpoints; a dy integral runs from y = 0 to y = 1.',
      },
      {
        latex: '\\int_0^1 \\sqrt{1 + \\left(e^{y} + \\frac{1}{4}e^{-y}\\right)^2}\\,dy',
        expr: 'integral(sqrt(1 + (exp(y) + exp(-y)/4)^2), y, 0, 1)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares g(y) itself; the formula uses g′(y) = e^y − ¼e^{−y}.',
      },
    ],
    correct: 0,
    explanation: "$1 + (e^{y} - \\frac{1}{4}e^{-y})^2 = e^{2y} + \\frac{1}{2} + \\frac{1}{16}e^{-2y} = (e^{y} + \\frac{1}{4}e^{-y})^2$, a positive quantity.",
    check: { kind: 'value', expected: 'e - 1/(4*e) - 3/4' },
    difficulty: 1,
  },
  {
    id: 'al-f-025',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $y = \\frac{x^3}{6} + \\frac{1}{2x}$ for $1 \\le x \\le 2$ simplifies to' },
    options: [
      { latex: '\\int_1^2 \\left(\\frac{x^2}{2} + \\frac{1}{2x^2}\\right)dx', expr: 'integral(x^2/2 + 1/(2*x^2), x, 1, 2)' },
      {
        latex: '\\int_1^2 \\left(\\frac{x^2}{2} - \\frac{1}{2x^2}\\right)dx',
        expr: 'integral(x^2/2 - 1/(2*x^2), x, 1, 2)',
        mistake: 'arclength-missing-one',
        why: 'This is √((f′)²) = f′: the 1 was dropped, so the middle sign of the square never flipped.',
      },
      {
        latex: '\\int_1^2 \\left(1 + \\frac{x^2}{2} - \\frac{1}{2x^2}\\right)dx',
        expr: 'integral(1 + x^2/2 - 1/(2*x^2), x, 1, 2)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √((f′)²); instead 1 + (f′)² = (x²/2 + 1/(2x²))².',
      },
      {
        latex: '\\int_1^2 \\left(\\frac{x^2}{2} + \\frac{1}{2x^2}\\right)^2 dx',
        expr: 'integral((x^2/2 + 1/(2*x^2))^2, x, 1, 2)',
        mistake: 'arclength-no-root',
        why: 'This square is the radicand 1 + (f′)²; the root was never taken.',
      },
      {
        latex: '\\int_1^2 \\left(\\frac{x^3}{6} + \\frac{1}{2x}\\right)dx',
        expr: 'integral(x^3/6 + 1/(2*x), x, 1, 2)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The perfect square is built from f′ = x²/2 − 1/(2x²) with its middle sign flipped, not from f itself.',
      },
      {
        latex: '\\int_1^2 \\left(\\frac{x^2}{2} + \\frac{1}{2x}\\right)dx',
        expr: 'integral(x^2/2 + 1/(2*x), x, 1, 2)',
        mistake: 'power-rule-exponent',
        why: 'd/dx (½x^{−1}) = −½x^{−2}; keeping the exponent −1 gives 1/(2x) instead of 1/(2x²).',
      },
    ],
    correct: 0,
    explanation: "$1 + \\left(\\frac{x^2}{2} - \\frac{1}{2x^2}\\right)^2 = \\left(\\frac{x^2}{2} + \\frac{1}{2x^2}\\right)^2$, and that base is positive.",
    check: { kind: 'value', expected: '17/12' },
    difficulty: 1,
  },
  {
    id: 'al-f-026',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of $f(x) = (x^3 - 1)^{3/2}$ from $x = 1$ to $x = 4$ is' },
    options: [
      { latex: '\\int_1^4 \\sqrt{1 + \\frac{81}{4}x^4(x^3 - 1)}\\,dx', expr: 'integral(sqrt(1 + 81/4*x^4*(x^3 - 1)), x, 1, 4)' },
      {
        latex: '\\int_1^4 \\sqrt{1 + \\frac{9}{4}(x^3 - 1)}\\,dx',
        expr: 'integral(sqrt(1 + 9/4*(x^3 - 1)), x, 1, 4)',
        mistake: 'chain-rule-missing',
        why: 'The inner derivative 3x² of x³ − 1 was dropped, so f′ = (3/2)(x³ − 1)^{1/2}.',
      },
      {
        latex: '\\int_1^4 \\sqrt{1 + (x^3 - 1)^3}\\,dx',
        expr: 'integral(sqrt(1 + (x^3 - 1)^3), x, 1, 4)',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'This squares f(x) = (x³ − 1)^{3/2} instead of its derivative.',
      },
      {
        latex: '\\int_1^4 \\sqrt{1 + \\frac{9}{2}x^2(x^3 - 1)^{1/2}}\\,dx',
        expr: 'integral(sqrt(1 + 9/2*x^2*(x^3 - 1)^(1/2)), x, 1, 4)',
        mistake: 'arclength-not-squared',
        why: 'f′(x) = (9/2)x²(x³ − 1)^{1/2} was placed under the root without being squared.',
      },
      {
        latex: '\\int_1^4 \\sqrt{1 + \\frac{9}{2}x^4(x^3 - 1)}\\,dx',
        expr: 'integral(sqrt(1 + 9/2*x^4*(x^3 - 1)), x, 1, 4)',
        mistake: 'coefficient-mishandled',
        why: '((9/2)x²)² = (81/4)x⁴; the coefficient 9/2 was not squared.',
      },
      {
        latex: '\\int_1^4 \\sqrt{1 + 9x^4(x^3 - 1)}\\,dx',
        expr: 'integral(sqrt(1 + 9*x^4*(x^3 - 1)), x, 1, 4)',
        mistake: 'power-rule-coefficient',
        why: 'The exponent 3/2 was not brought down: f′ = (3/2)(x³ − 1)^{1/2}·3x², not 3x²(x³ − 1)^{1/2}.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{3}{2}(x^3 - 1)^{1/2}\\cdot 3x^2 = \\frac{9}{2}x^2\\sqrt{x^3 - 1}$, so $(f')^2 = \\frac{81}{4}x^4(x^3 - 1)$.",
    check: { kind: 'value', expected: 'integral(sqrt(1 + (3/2*(x^3 - 1)^(1/2)*3*x^2)^2), x, 1, 4)' },
    difficulty: 2,
  },
  {
    id: 'al-f-027',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'The length of the line $y = 2x + 1$ from $x = 0$ to $x = 3$ is' },
    options: [
      { latex: '3\\sqrt{5}', expr: '3*sqrt(5)' },
      {
        latex: '3\\sqrt{3}',
        expr: '3*sqrt(3)',
        mistake: 'arclength-not-squared',
        why: 'The slope 2 was not squared: √(1 + 2) instead of √(1 + 2²).',
      },
      {
        latex: '9',
        expr: '9',
        mistake: 'sqrt-of-sum-split',
        why: '√(1 + 2²) was split into 1 + 2 = 3, giving 3·3 = 9.',
      },
      {
        latex: '15',
        expr: '15',
        mistake: 'arclength-no-root',
        why: '∫₀³(1 + 2²)dx = 15: the square root of 5 was never taken.',
      },
      {
        latex: '6',
        expr: '6',
        mistake: 'arclength-missing-one',
        why: '∫₀³√(2²)dx = 6 measures only the vertical rise from y = 1 to y = 7.',
      },
      {
        latex: '6\\sqrt{5}',
        expr: '6*sqrt(5)',
        mistake: 'arclength-variable-mismatch',
        why: 'The y-values 1 to 7 (a span of 6) were used as limits of the dx integral instead of x from 0 to 3.',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = 2$, so $L = \\int_0^3 \\sqrt{1 + 4}\\,dx = 3\\sqrt{5}$, the distance from $(0, 1)$ to $(3, 7)$.",
    check: { kind: 'value', expected: 'integral(sqrt(1 + 2^2), x, 0, 3)' },
    difficulty: 1,
  },

  // ───────────── simplification: perfect squares, |u|, technique ─────────────
  {
    id: 'al-f-028',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "For $x = \\frac{1}{3}y^{3/2} - y^{1/2}$, the expression $1 + (g'(y))^2$ equals" },
    options: [
      { latex: '\\left(\\frac{\\sqrt{y}}{2} + \\frac{1}{2\\sqrt{y}}\\right)^2', expr: '(sqrt(y)/2 + 1/(2*sqrt(y)))^2' },
      {
        latex: '\\left(\\frac{\\sqrt{y}}{2} - \\frac{1}{2\\sqrt{y}}\\right)^2',
        expr: '(sqrt(y)/2 - 1/(2*sqrt(y)))^2',
        mistake: 'arclength-missing-one',
        why: 'This is (g′(y))² itself; adding the 1 turns the middle term −½ into +½.',
      },
      {
        latex: '\\left(1 + \\frac{\\sqrt{y}}{2} - \\frac{1}{2\\sqrt{y}}\\right)^2',
        expr: '(1 + sqrt(y)/2 - 1/(2*sqrt(y)))^2',
        mistake: 'algebra-error',
        why: '1 + (g′)² is not (1 + g′)²; squaring 1 + g′ creates an extra cross term 2g′.',
      },
      {
        latex: '\\left(\\frac{3\\sqrt{y}}{2} + \\frac{1}{2\\sqrt{y}}\\right)^2',
        expr: '(3*sqrt(y)/2 + 1/(2*sqrt(y)))^2',
        mistake: 'coefficient-mishandled',
        why: 'The ⅓ in front of y^{3/2} was dropped, so g′ started with (3/2)√y instead of ⅓·(3/2)√y = ½√y.',
      },
      {
        latex: '\\left(\\frac{1}{3}y^{3/2} + y^{1/2}\\right)^2',
        expr: '(y^(3/2)/3 + y^(1/2))^2',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The perfect square comes from g′ with its middle sign flipped, not from g itself.',
      },
    ],
    correct: 0,
    explanation: "$g'(y) = \\frac{\\sqrt{y}}{2} - \\frac{1}{2\\sqrt{y}}$, so $1 + (g')^2 = \\frac{y}{4} + \\frac{1}{2} + \\frac{1}{4y} = \\left(\\frac{\\sqrt{y}}{2} + \\frac{1}{2\\sqrt{y}}\\right)^2$.",
    variable: 'y',
    domain: [0.5, 4],
    check: { kind: 'identity', lhs: '1 + ((1/3)*(3/2)*y^(1/2) - (1/2)*y^(-1/2))^2' },
    difficulty: 2,
  },
  {
    id: 'al-f-029',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "For $y = \\frac{x^2}{4} - \\frac{1}{2}\\ln x$, the expression $1 + (f'(x))^2$ equals" },
    options: [
      { latex: '\\left(\\frac{x}{2} + \\frac{1}{2x}\\right)^2', expr: '(x/2 + 1/(2*x))^2' },
      {
        latex: '\\left(\\frac{x}{2} - \\frac{1}{2x}\\right)^2',
        expr: '(x/2 - 1/(2*x))^2',
        mistake: 'arclength-missing-one',
        why: 'This is (f′(x))² itself; adding the 1 turns the middle term −½ into +½.',
      },
      {
        latex: '\\left(1 + \\frac{x}{2} - \\frac{1}{2x}\\right)^2',
        expr: '(1 + x/2 - 1/(2*x))^2',
        mistake: 'algebra-error',
        why: '1 + (f′)² is not (1 + f′)²; squaring 1 + f′ creates an extra cross term 2f′.',
      },
      {
        latex: '\\left(\\frac{x}{2} + \\frac{1}{2x^2}\\right)^2',
        expr: '(x/2 + 1/(2*x^2))^2',
        mistake: 'log-derivative-wrong',
        why: 'd/dx ln x = 1/x, not 1/x²; the second term of f′ is 1/(2x).',
      },
      {
        latex: '\\left(\\frac{x^2}{4} + \\frac{1}{2}\\ln x\\right)^2',
        expr: '(x^2/4 + log(x)/2)^2',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The perfect square comes from f′ with its middle sign flipped, not from f itself.',
      },
      {
        latex: '\\left(x + \\frac{1}{x}\\right)^2',
        expr: '(x + 1/x)^2',
        mistake: 'coefficient-mishandled',
        why: 'The factors ½ were dropped: (x/2 + 1/(2x))² = ¼(x + 1/x)², not (x + 1/x)².',
      },
    ],
    correct: 0,
    explanation: "$f'(x) = \\frac{x}{2} - \\frac{1}{2x}$, so $1 + (f')^2 = \\frac{x^2}{4} + \\frac{1}{2} + \\frac{1}{4x^2} = \\left(\\frac{x}{2} + \\frac{1}{2x}\\right)^2$.",
    check: { kind: 'identity', lhs: '1 + (2*x/4 - 1/(2*x))^2' },
    difficulty: 1,
  },
  {
    id: 'al-f-030',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "For $y = \\frac{x^3}{6} + \\frac{1}{2x}$, the expression $1 + (f'(x))^2$ equals" },
    options: [
      { latex: '\\left(\\frac{x^2}{2} + \\frac{1}{2x^2}\\right)^2', expr: '(x^2/2 + 1/(2*x^2))^2' },
      {
        latex: '\\left(\\frac{x^2}{2} - \\frac{1}{2x^2}\\right)^2',
        expr: '(x^2/2 - 1/(2*x^2))^2',
        mistake: 'arclength-missing-one',
        why: 'This is (f′(x))² itself; adding the 1 turns the middle term −½ into +½.',
      },
      {
        latex: '\\left(1 + \\frac{x^2}{2} - \\frac{1}{2x^2}\\right)^2',
        expr: '(1 + x^2/2 - 1/(2*x^2))^2',
        mistake: 'algebra-error',
        why: '1 + (f′)² is not (1 + f′)²; squaring 1 + f′ creates an extra cross term 2f′.',
      },
      {
        latex: '\\left(x^2 + \\frac{1}{x^2}\\right)^2',
        expr: '(x^2 + 1/x^2)^2',
        mistake: 'coefficient-mishandled',
        why: 'The factors ½ were dropped: (x²/2 + 1/(2x²))² = ¼(x² + 1/x²)².',
      },
      {
        latex: '\\left(\\frac{x^2}{2} + \\frac{1}{2x}\\right)^2',
        expr: '(x^2/2 + 1/(2*x))^2',
        mistake: 'power-rule-exponent',
        why: 'd/dx (½x^{−1}) = −½x^{−2}; keeping the exponent −1 gives 1/(2x) instead of 1/(2x²).',
      },
      {
        latex: '\\left(\\frac{x^3}{6} - \\frac{1}{2x}\\right)^2',
        expr: '(x^3/6 - 1/(2*x))^2',
        mistake: 'arclength-f-instead-of-fprime',
        why: 'The perfect square comes from f′ = x²/2 − 1/(2x²) with its middle sign flipped, not from f.',
      },
    ],
    correct: 0,
    explanation: "$(f')^2 = \\frac{x^4}{4} - \\frac{1}{2} + \\frac{1}{4x^4}$; adding 1 flips $-\\frac{1}{2}$ to $+\\frac{1}{2}$, giving $\\left(\\frac{x^2}{2} + \\frac{1}{2x^2}\\right)^2$.",
    check: { kind: 'identity', lhs: '1 + (3*x^2/6 - 1/(2*x^2))^2' },
    difficulty: 1,
  },
  {
    id: 'al-f-031',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: "For $x = e^{y} + \\frac{1}{4}e^{-y}$, the expression $1 + (g'(y))^2$ expands to" },
    options: [
      { latex: 'e^{2y} + \\frac{1}{2} + \\frac{1}{16}e^{-2y}', expr: 'exp(2*y) + 1/2 + exp(-2*y)/16' },
      {
        latex: 'e^{2y} - \\frac{1}{2} + \\frac{1}{16}e^{-2y}',
        expr: 'exp(2*y) - 1/2 + exp(-2*y)/16',
        mistake: 'arclength-missing-one',
        why: 'This is (g′)² alone; adding the 1 turns −½ into +½.',
      },
      {
        latex: 'e^{2y} + 1 + \\frac{1}{16}e^{-2y}',
        expr: 'exp(2*y) + 1 + exp(-2*y)/16',
        mistake: 'algebra-error',
        why: 'The cross term 2·e^y·(−¼e^{−y}) = −½ was dropped when squaring g′.',
      },
      {
        latex: 'e^{2y} + \\frac{3}{2} + \\frac{1}{16}e^{-2y}',
        expr: 'exp(2*y) + 3/2 + exp(-2*y)/16',
        mistake: 'chain-rule-missing',
        why: 'd/dy(¼e^{−y}) = −¼e^{−y}; without the inner factor −1, g′ = e^y + ¼e^{−y} and its square has +½.',
      },
      {
        latex: 'e^{2y} + \\frac{1}{2} + \\frac{1}{4}e^{-2y}',
        expr: 'exp(2*y) + 1/2 + exp(-2*y)/4',
        mistake: 'coefficient-mishandled',
        why: '(¼e^{−y})² = (1/16)e^{−2y}; the coefficient ¼ was not squared.',
      },
      {
        latex: 'e^{2y} + \\frac{1}{2} + \\frac{1}{16}e^{2y}',
        expr: 'exp(2*y) + 1/2 + exp(2*y)/16',
        mistake: 'sign-error',
        why: '(e^{−y})² = e^{−2y}; the negative exponent lost its sign.',
      },
    ],
    correct: 0,
    explanation: "$g'(y) = e^{y} - \\frac{1}{4}e^{-y}$, so $(g')^2 = e^{2y} - \\frac{1}{2} + \\frac{1}{16}e^{-2y}$, and adding 1 gives $+\\frac{1}{2}$.",
    variable: 'y',
    check: { kind: 'identity', lhs: '1 + (exp(y) - exp(-y)/4)^2' },
    difficulty: 1,
  },
  {
    id: 'al-f-032',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'Which perfect square equals $e^{2y} + \\frac{1}{2} + \\frac{1}{16}e^{-2y}$?' },
    options: [
      { latex: '\\left(e^{y} + \\frac{1}{4}e^{-y}\\right)^2', expr: '(exp(y) + exp(-y)/4)^2' },
      {
        latex: '\\left(e^{y} - \\frac{1}{4}e^{-y}\\right)^2',
        expr: '(exp(y) - exp(-y)/4)^2',
        mistake: 'sign-error',
        why: '(e^y − ¼e^{−y})² has middle term −½, not +½.',
      },
      {
        latex: '\\left(e^{y} + \\frac{1}{16}e^{-y}\\right)^2',
        expr: '(exp(y) + exp(-y)/16)^2',
        mistake: 'sqrt-constant-not-rooted',
        why: 'The coefficient of e^{−2y} is 1/16, so the second term is √(1/16)·e^{−y} = ¼e^{−y}.',
      },
      {
        latex: '\\left(e^{2y} + \\frac{1}{4}e^{-2y}\\right)^2',
        expr: '(exp(2*y) + exp(-2*y)/4)^2',
        mistake: 'formula-wrong-power',
        why: '√(e^{2y}) = e^y; keeping e^{2y} inside the square produces e^{4y}.',
      },
      {
        latex: '\\left(e^{y} + \\frac{1}{2}e^{-y}\\right)^2',
        expr: '(exp(y) + exp(-y)/2)^2',
        mistake: 'coefficient-mishandled',
        why: '½ is the cross term 2·e^y·b, so b = ¼; ½ is not the coefficient itself.',
      },
    ],
    correct: 0,
    explanation: '$\\left(e^{y} + \\frac{1}{4}e^{-y}\\right)^2 = e^{2y} + 2\\cdot\\frac{1}{4} + \\frac{1}{16}e^{-2y}$, matching every term.',
    variable: 'y',
    check: { kind: 'identity', lhs: 'exp(2*y) + 1/2 + exp(-2*y)/16' },
    difficulty: 2,
  },
  {
    id: 'al-f-033',
    topic: 'arc-length',
    kind: 'technique',
    prompt: { text: 'What is the most direct way to evaluate this arc-length integral?', latex: '\\int_1^4 \\sqrt{1 + \\frac{9}{4}x}\\,dx' },
    options: [
      { text: 'Substitute $u = 1 + \\frac{9}{4}x$, $dx = \\frac{4}{9}\\,du$, new limits $\\frac{13}{4}$ to $10$' },
      {
        text: 'Rewrite $\\sqrt{1 + \\frac{9}{4}x}$ as $1 + \\frac{3}{2}\\sqrt{x}$ and integrate term by term',
        mistake: 'sqrt-of-sum-split',
        why: '√(1 + (9/4)x) ≠ 1 + (3/2)√x; a square root does not split over a sum.',
      },
      {
        text: 'Integrate by parts with $u = \\sqrt{1 + \\frac{9}{4}x}$ and $dv = dx$',
        mistake: 'technique-wrong',
        why: 'IBP only trades it for another integral that still needs a substitution; the radicand is linear, so substitute right away.',
      },
      {
        text: 'Write $1 + \\frac{9}{4}x = \\left(1 + \\frac{3}{2}x\\right)^2$ and cancel the root',
        mistake: 'algebra-error',
        why: '(1 + (3/2)x)² = 1 + 3x + (9/4)x²; this radicand is not a perfect square.',
      },
      {
        text: 'Use the power rule directly: $\\frac{2}{3}\\left(1 + \\frac{9}{4}x\\right)^{3/2}$ with no other factor',
        mistake: 'inner-constant-factor-missing',
        why: 'The inner derivative 9/4 must be divided out: the antiderivative is (8/27)(1 + (9/4)x)^{3/2}.',
      },
      {
        text: 'Substitute $u = 1 + \\frac{9}{4}x$, $dx = \\frac{4}{9}\\,du$, and keep the limits 1 and 4',
        mistake: 'bounds-not-converted',
        why: 'After substituting, the limits must be u-values: u(1) = 13/4 and u(4) = 10.',
      },
    ],
    correct: 0,
    explanation: 'The radicand is linear, so $u = 1 + \\frac{9}{4}x$ turns it into $\\frac{4}{9}\\int_{13/4}^{10} u^{1/2}\\,du$.',
    check: { kind: 'none', reason: 'technique recognition; options describe methods' },
    difficulty: 1,
  },
  {
    id: 'al-f-034',
    topic: 'arc-length',
    kind: 'technique',
    prompt: {
      text: 'What is the best first move for this arc-length integral?',
      latex: '\\int_1^2 \\sqrt{1 + \\left(\\frac{x^2}{2} - \\frac{1}{2x^2}\\right)^2}\\,dx',
    },
    options: [
      { text: 'Expand, add 1, and rewrite the radicand as $\\left(\\frac{x^2}{2} + \\frac{1}{2x^2}\\right)^2$' },
      {
        text: 'Split the root into $1 + \\left(\\frac{x^2}{2} - \\frac{1}{2x^2}\\right)$ and integrate each part',
        mistake: 'sqrt-of-sum-split',
        why: '√(1 + u²) ≠ 1 + u; a square root does not split over a sum.',
      },
      {
        text: 'Cancel the root against the square, leaving $\\frac{x^2}{2} - \\frac{1}{2x^2}$ to integrate',
        mistake: 'arclength-missing-one',
        why: 'The root and the square cannot cancel while the 1 is under the root.',
      },
      {
        text: 'Substitute $u = \\frac{x^2}{2} - \\frac{1}{2x^2}$ and integrate $\\sqrt{1 + u^2}$ in $u$',
        mistake: 'u-choice-wrong',
        why: 'du = (x + 1/x³)dx does not appear in the integrand, so the substitution does not close.',
      },
      {
        text: 'Integrate by parts with $dv = dx$ and $u$ equal to the whole square root',
        mistake: 'technique-wrong',
        why: 'IBP creates a messier integral; the radicand is secretly a perfect square.',
      },
    ],
    correct: 0,
    explanation: '$1 + \\left(\\frac{x^2}{2} - \\frac{1}{2x^2}\\right)^2 = \\frac{x^4}{4} + \\frac{1}{2} + \\frac{1}{4x^4} = \\left(\\frac{x^2}{2} + \\frac{1}{2x^2}\\right)^2$, so the root disappears.',
    check: { kind: 'none', reason: 'technique recognition; options describe methods' },
    difficulty: 1,
  },

  // ───────────── evaluate: arc lengths that come out clean ─────────────
  {
    id: 'al-f-035',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: { text: 'Arc length of $y = \\frac{2}{3}x^{3/2}$ for $0 \\le x \\le 3$:', latex: '\\int_0^3 \\sqrt{1 + x}\\,dx' },
    options: [
      { latex: '\\frac{14}{3}', expr: '14/3' },
      { latex: '\\frac{16}{3}', expr: '16/3', mistake: 'ftc-not-subtracted', why: 'Only the upper limit was used: ⅔·4^{3/2} = 16/3; the lower-limit value ⅔·1^{3/2} must be subtracted.' },
      { latex: '7', expr: '7', mistake: 'power-rule-int-coefficient', why: '∫(1 + x)^{1/2}dx = ⅔(1 + x)^{3/2}; without dividing by 3/2 the result is 8 − 1 = 7.' },
      { latex: '\\frac{10}{3}', expr: '10/3', mistake: 'arithmetic-error', why: '4^{3/2} = (√4)³ = 8, not 6.' },
      { latex: '2', expr: '2', mistake: 'power-rule-int-exponent', why: 'The exponent was not raised: 2(1 + x)^{1/2} differentiates to (1 + x)^{−1/2}, not (1 + x)^{1/2}.' },
      { latex: '3 + 2\\sqrt{3}', expr: '3 + 2*sqrt(3)', mistake: 'sqrt-of-sum-split', why: '√(1 + x) was split into 1 + √x, giving 3 + ⅔·3^{3/2} = 3 + 2√3.' },
    ],
    correct: 0,
    explanation: '$\\frac{2}{3}(1 + x)^{3/2}\\Big|_0^3 = \\frac{2}{3}(8 - 1) = \\frac{14}{3}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + x)', lower: '0', upper: '3' },
    difficulty: 1,
  },
  {
    id: 'al-f-036',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: {
      text: 'Arc length of $y = \\frac{x^3}{3} + \\frac{1}{4x}$ for $1 \\le x \\le 2$:',
      latex: '\\int_1^2 \\sqrt{1 + \\left(x^2 - \\frac{1}{4x^2}\\right)^2}\\,dx',
    },
    options: [
      { latex: '\\frac{59}{24}', expr: '59/24' },
      { latex: '\\frac{53}{24}', expr: '53/24', mistake: 'arclength-missing-one', why: 'Treating the root as x² − 1/(4x²) ignores the 1; that only gives f(2) − f(1) = 53/24.' },
      { latex: '\\frac{77}{24}', expr: '77/24', mistake: 'sqrt-of-sum-split', why: 'Splitting the root as 1 + (x² − 1/(4x²)) adds an extra 1 over [1, 2].' },
      { latex: '\\frac{61}{24}', expr: '61/24', mistake: 'ftc-not-subtracted', why: 'Only F(2) = 8/3 − 1/8 was computed; F(1) = 1/12 must be subtracted.' },
      { latex: '\\frac{47}{24}', expr: '47/24', mistake: 'sign-error', why: 'F(1) = 1/3 − 1/4 = 1/12; using 1/3 + 1/4 = 7/12 instead gives 47/24.' },
      { latex: '\\frac{57}{8}', expr: '57/8', mistake: 'power-rule-int-coefficient', why: '∫x² dx = x³/3; without dividing by 3 the result is 57/8.' },
    ],
    correct: 0,
    explanation: 'The radicand is $\\left(x^2 + \\frac{1}{4x^2}\\right)^2$, so $L = \\left[\\frac{x^3}{3} - \\frac{1}{4x}\\right]_1^2 = \\frac{61}{24} - \\frac{1}{12} = \\frac{59}{24}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + (x^2 - 1/(4*x^2))^2)', lower: '1', upper: '2' },
    difficulty: 2,
  },
  {
    id: 'al-f-037',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: {
      text: 'Arc length of $x = \\frac{y^3}{6} + \\frac{1}{2y}$ for $2 \\le y \\le 3$:',
      latex: '\\int_2^3 \\sqrt{1 + \\left(\\frac{y^2}{2} - \\frac{1}{2y^2}\\right)^2}\\,dy',
    },
    options: [
      { latex: '\\frac{13}{4}', expr: '13/4' },
      { latex: '\\frac{37}{12}', expr: '37/12', mistake: 'arclength-missing-one', why: 'Treating the root as y²/2 − 1/(2y²) ignores the 1; that only gives g(3) − g(2) = 37/12.' },
      { latex: '\\frac{49}{12}', expr: '49/12', mistake: 'sqrt-of-sum-split', why: 'Splitting the root as 1 + g′(y) adds an extra 1 over [2, 3].' },
      { latex: '\\frac{13}{3}', expr: '13/3', mistake: 'ftc-not-subtracted', why: 'Only G(3) = 13/3 was computed; G(2) = 13/12 must be subtracted.' },
      { latex: '\\frac{11}{4}', expr: '11/4', mistake: 'sign-error', why: 'G(2) = 4/3 − 1/4 = 13/12; using 4/3 + 1/4 = 19/12 instead gives 11/4.' },
      { latex: '\\frac{115}{12}', expr: '115/12', mistake: 'power-rule-int-coefficient', why: '∫(y²/2)dy = y³/6; without dividing by 3 the result is 115/12.' },
    ],
    correct: 0,
    explanation: 'The radicand is $\\left(\\frac{y^2}{2} + \\frac{1}{2y^2}\\right)^2$, so $L = \\left[\\frac{y^3}{6} - \\frac{1}{2y}\\right]_2^3 = \\frac{13}{3} - \\frac{13}{12} = \\frac{13}{4}$.',
    variable: 'y',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + (y^2/2 - 1/(2*y^2))^2)', lower: '2', upper: '3' },
    difficulty: 2,
  },
  {
    id: 'al-f-038',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: { text: 'Arc length of $y = x^{3/2}$ from $(1, 1)$ to $(4, 8)$:', latex: '\\int_1^4 \\sqrt{1 + \\frac{9}{4}x}\\,dx' },
    options: [
      { latex: '\\frac{80\\sqrt{10} - 13\\sqrt{13}}{27}', expr: '(80*sqrt(10) - 13*sqrt(13))/27' },
      {
        latex: '\\frac{80\\sqrt{10} - 13\\sqrt{13}}{12}',
        expr: '(80*sqrt(10) - 13*sqrt(13))/12',
        mistake: 'inner-constant-factor-missing',
        why: 'With u = 1 + (9/4)x, dx = (4/9)du; dropping the 4/9 leaves ⅔[u^{3/2}] and the denominator 12.',
      },
      {
        latex: '\\frac{80\\sqrt{10}}{27}',
        expr: '80*sqrt(10)/27',
        mistake: 'ftc-not-subtracted',
        why: 'Only the upper limit u = 10 was used; the value at u = 13/4 must be subtracted.',
      },
      {
        latex: '\\frac{80\\sqrt{10} - 26\\sqrt{13}}{27}',
        expr: '(80*sqrt(10) - 26*sqrt(13))/27',
        mistake: 'arithmetic-error',
        why: '(13/4)^{3/2} = 13√13/8, not 13√13/4: the denominator is 4^{3/2} = 8.',
      },
      {
        latex: '\\frac{56}{27}',
        expr: '56/27',
        mistake: 'bounds-not-converted',
        why: 'The x-limits 1 and 4 were kept for u; they must become u = 13/4 and u = 10.',
      },
      {
        latex: '\\frac{240\\sqrt{10} - 39\\sqrt{13}}{16}',
        expr: '(240*sqrt(10) - 39*sqrt(13))/16',
        mistake: 'inner-constant-factor-missing',
        why: 'dx was replaced by (9/4)du instead of (4/9)du.',
      },
    ],
    correct: 0,
    explanation: 'With $u = 1 + \\frac{9}{4}x$: $\\frac{4}{9}\\cdot\\frac{2}{3}u^{3/2}\\Big|_{13/4}^{10} = \\frac{8}{27}\\left(10\\sqrt{10} - \\frac{13\\sqrt{13}}{8}\\right)$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + (3/2*x^(1/2))^2)', lower: '1', upper: '4' },
    difficulty: 2,
  },
  {
    id: 'al-f-039',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: { text: 'Arc length of $y = \\ln(\\cos x)$ for $0 \\le x \\le \\frac{\\pi}{3}$:', latex: '\\int_0^{\\pi/3} \\sqrt{1 + \\tan^2 x}\\,dx' },
    options: [
      { latex: '\\ln(2 + \\sqrt{3})', expr: 'log(2 + sqrt(3))' },
      { latex: '\\ln(2 - \\sqrt{3})', expr: 'log(2 - sqrt(3))', mistake: 'sec-antiderivative-wrong', why: '∫sec x dx = ln|sec x + tan x| + C; the minus version gives ln(2 − √3) < 0.' },
      { latex: '\\ln 2', expr: 'log(2)', mistake: 'sec-antiderivative-wrong', why: 'ln|sec x| alone is not an antiderivative of sec x (its derivative is tan x).' },
      { latex: '\\sqrt{3}', expr: 'sqrt(3)', mistake: 'arclength-no-root', why: '1 + tan²x = sec²x must be square-rooted to sec x; integrating sec²x gives tan(π/3) = √3.' },
      { latex: '2\\sqrt{3}', expr: '2*sqrt(3)', mistake: 'trig-antiderivative-swapped', why: 'sec x tan x is the derivative of sec x, not an antiderivative of it.' },
      { latex: '\\frac{\\pi}{3} + \\ln 2', expr: 'pi/3 + log(2)', mistake: 'sqrt-of-sum-split', why: '√(1 + tan²x) was split into 1 + tan x; ∫₀^{π/3}(1 + tan x)dx = π/3 + ln 2.' },
    ],
    correct: 0,
    explanation: '$\\sqrt{1 + \\tan^2 x} = \\sec x$ on $[0, \\frac{\\pi}{3}]$, and $\\ln|\\sec x + \\tan x|\\Big|_0^{\\pi/3} = \\ln(2 + \\sqrt{3}) - \\ln 1$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + tan(x)^2)', lower: '0', upper: 'pi/3' },
    difficulty: 1,
  },
  {
    id: 'al-f-040',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: {
      text: 'Arc length of $x = e^{y} + \\frac{1}{4}e^{-y}$ for $0 \\le y \\le 1$:',
      latex: '\\int_0^1 \\sqrt{1 + \\left(e^{y} - \\frac{1}{4}e^{-y}\\right)^2}\\,dy',
    },
    options: [
      { latex: 'e - \\frac{1}{4e} - \\frac{3}{4}', expr: 'e - 1/(4*e) - 3/4' },
      { latex: 'e + \\frac{1}{4e} - \\frac{5}{4}', expr: 'e + 1/(4*e) - 5/4', mistake: 'arclength-missing-one', why: 'Treating the root as e^y − ¼e^{−y} ignores the 1; that only gives g(1) − g(0).' },
      { latex: 'e - \\frac{1}{4e}', expr: 'e - 1/(4*e)', mistake: 'ftc-not-subtracted', why: 'Only the upper limit was used; F(0) = 1 − ¼ = ¾ must be subtracted.' },
      { latex: 'e + \\frac{1}{4e} - \\frac{1}{4}', expr: 'e + 1/(4*e) - 1/4', mistake: 'sqrt-of-sum-split', why: 'Splitting the root as 1 + g′(y) adds an extra 1 over [0, 1].' },
      { latex: 'e - \\frac{1}{4e} - \\frac{5}{4}', expr: 'e - 1/(4*e) - 5/4', mistake: 'sign-error', why: 'F(0) = e⁰ − ¼e⁰ = ¾; evaluating it as 1 + ¼ = 5/4 is a sign slip.' },
      { latex: '\\frac{3}{4} - e + \\frac{1}{4e}', expr: '3/4 - e + 1/(4*e)', mistake: 'ftc-order-swapped', why: 'This is F(0) − F(1); the length is F(1) − F(0) > 0.' },
    ],
    correct: 0,
    explanation: 'The radicand is $\\left(e^{y} + \\frac{1}{4}e^{-y}\\right)^2$, so $L = \\left[e^{y} - \\frac{1}{4}e^{-y}\\right]_0^1 = e - \\frac{1}{4e} - \\frac{3}{4}$.',
    variable: 'y',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + (exp(y) - exp(-y)/4)^2)', lower: '0', upper: '1' },
    difficulty: 2,
  },
  {
    id: 'al-f-041',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: {
      text: 'Arc length of $y = \\frac{e^{x} + e^{-x}}{2}$ for $0 \\le x \\le 1$:',
      latex: '\\int_0^1 \\sqrt{1 + \\left(\\frac{e^{x} - e^{-x}}{2}\\right)^2}\\,dx',
    },
    options: [
      { latex: '\\frac{e - e^{-1}}{2}', expr: '(e - exp(-1))/2' },
      { latex: '\\frac{e + e^{-1}}{2} - 1', expr: '(e + exp(-1))/2 - 1', mistake: 'arclength-missing-one', why: 'Treating the root as (e^x − e^{−x})/2 ignores the 1; that only gives f(1) − f(0).' },
      { latex: '\\frac{e + e^{-1}}{2}', expr: '(e + exp(-1))/2', mistake: 'sqrt-of-sum-split', why: 'Splitting the root as 1 + f′(x) adds an extra 1 over [0, 1].' },
      { latex: 'e - e^{-1}', expr: 'e - exp(-1)', mistake: 'coefficient-mishandled', why: 'The factor ½ was lost: the root is (e^x + e^{−x})/2, whose integral is (e − e^{−1})/2.' },
      { latex: '\\frac{e^{2} - e^{-2}}{8} + \\frac{1}{2}', expr: '(exp(2) - exp(-2))/8 + 1/2', mistake: 'arclength-no-root', why: 'This integrates 1 + (f′)² = ((e^x + e^{−x})/2)² without taking the square root.' },
      { latex: '\\frac{e - e^{-1} - 1}{2}', expr: '(e - exp(-1) - 1)/2', mistake: 'arithmetic-error', why: 'At x = 0, (e⁰ − e⁰)/2 = 0; treating e^{−0} as 0 subtracts ½ by mistake.' },
    ],
    correct: 0,
    explanation: '$1 + \\left(\\frac{e^{x} - e^{-x}}{2}\\right)^2 = \\left(\\frac{e^{x} + e^{-x}}{2}\\right)^2$, so $L = \\frac{e^{x} - e^{-x}}{2}\\Big|_0^1 = \\frac{e - e^{-1}}{2}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + ((exp(x) - exp(-x))/2)^2)', lower: '0', upper: '1' },
    difficulty: 2,
  },
  {
    id: 'al-f-042',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: { text: 'Arc length of $y = x^{3/2}$ for $0 \\le x \\le \\frac{4}{3}$:', latex: '\\int_0^{4/3} \\sqrt{1 + \\frac{9}{4}x}\\,dx' },
    options: [
      { latex: '\\frac{56}{27}', expr: '56/27' },
      { latex: '\\frac{14}{3}', expr: '14/3', mistake: 'inner-constant-factor-missing', why: 'With u = 1 + (9/4)x, dx = (4/9)du; dropping the 4/9 gives ⅔(8 − 1) = 14/3.' },
      { latex: '\\frac{64}{27}', expr: '64/27', mistake: 'ftc-not-subtracted', why: 'Only u = 4 was used: (8/27)·8; the value at u = 1 must be subtracted.' },
      { latex: '\\frac{21}{2}', expr: '21/2', mistake: 'inner-constant-factor-missing', why: 'dx was replaced by (9/4)du instead of (4/9)du.' },
      { latex: '\\frac{10}{3}', expr: '10/3', mistake: 'arclength-no-root', why: 'This integrates 1 + (9/4)x without the square root.' },
      { latex: '\\frac{28}{9}', expr: '28/9', mistake: 'power-rule-int-coefficient', why: '∫u^{1/2}du = ⅔u^{3/2}; without the ⅔ the result is (4/9)(8 − 1) = 28/9.' },
    ],
    correct: 0,
    explanation: '$u = 1 + \\frac{9}{4}x$ runs from 1 to 4: $\\frac{4}{9}\\cdot\\frac{2}{3}\\left(4^{3/2} - 1\\right) = \\frac{8}{27}\\cdot 7 = \\frac{56}{27}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + (3/2*x^(1/2))^2)', lower: '0', upper: '4/3' },
    difficulty: 1,
  },
  {
    id: 'al-f-043',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: {
      text: 'Arc length of $y = \\frac{x^2}{4} - \\frac{1}{2}\\ln x$ for $1 \\le x \\le e$:',
      latex: '\\int_1^{e} \\sqrt{1 + \\left(\\frac{x}{2} - \\frac{1}{2x}\\right)^2}\\,dx',
    },
    options: [
      { latex: '\\frac{e^2 + 1}{4}', expr: '(e^2 + 1)/4' },
      { latex: '\\frac{e^2 - 3}{4}', expr: '(e^2 - 3)/4', mistake: 'arclength-missing-one', why: 'Treating the root as x/2 − 1/(2x) ignores the 1; that only gives f(e) − f(1).' },
      { latex: '\\frac{e^2 + 4e - 7}{4}', expr: '(e^2 + 4*e - 7)/4', mistake: 'sqrt-of-sum-split', why: 'Splitting the root as 1 + f′(x) adds an extra e − 1.' },
      { latex: '\\frac{e^2 + 2}{4}', expr: '(e^2 + 2)/4', mistake: 'ftc-not-subtracted', why: 'Only F(e) = e²/4 + ½ was computed; F(1) = ¼ must be subtracted.' },
      { latex: '\\frac{e^2}{2}', expr: 'e^2/2', mistake: 'power-rule-int-coefficient', why: '∫(x/2)dx = x²/4; without dividing by 2 the result becomes e²/2.' },
      { latex: '\\frac{e^2 - 1}{4}', expr: '(e^2 - 1)/4', mistake: 'arithmetic-error', why: 'ln e = 1, so ½ln e = ½; treating it as 0 loses ½.' },
    ],
    correct: 0,
    explanation: 'The radicand is $\\left(\\frac{x}{2} + \\frac{1}{2x}\\right)^2$, so $L = \\left[\\frac{x^2}{4} + \\frac{1}{2}\\ln x\\right]_1^{e} = \\frac{e^2}{4} + \\frac{1}{2} - \\frac{1}{4}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + (x/2 - 1/(2*x))^2)', lower: '1', upper: 'e' },
    difficulty: 2,
  },
  {
    id: 'al-f-044',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: { text: 'Arc length of $y = \\sqrt{1 - x^2}$ for $0 \\le x \\le \\frac{1}{2}$:', latex: '\\int_0^{1/2} \\sqrt{1 + \\frac{x^2}{1 - x^2}}\\,dx' },
    options: [
      { latex: '\\frac{\\pi}{6}', expr: 'pi/6' },
      { latex: '\\frac{\\pi}{3}', expr: 'pi/3', mistake: 'inverse-trig-confused', why: 'arcsin(½) = π/6; π/3 is arccos(½).' },
      { latex: '1 - \\frac{\\sqrt{3}}{2}', expr: '1 - sqrt(3)/2', mistake: 'arclength-missing-one', why: 'Dropping the 1 leaves ∫x/√(1 − x²)dx = 1 − √3/2, only the vertical change.' },
      { latex: '\\frac{3 - \\sqrt{3}}{2}', expr: '(3 - sqrt(3))/2', mistake: 'sqrt-of-sum-split', why: 'Splitting the root as 1 + x/√(1 − x²) adds ½ to 1 − √3/2.' },
      { latex: '\\arctan\\frac{1}{2}', expr: 'arctan(1/2)', mistake: 'inverse-trig-confused', why: '1/√(1 − x²) integrates to arcsin x; arctan x goes with 1/(1 + x²).' },
      { latex: '\\frac{\\pi}{2}', expr: 'pi/2', mistake: 'interval-not-respected', why: 'arcsin was evaluated at x = 1, the end of the quarter circle, instead of x = ½.' },
    ],
    correct: 0,
    explanation: '$1 + \\frac{x^2}{1 - x^2} = \\frac{1}{1 - x^2}$, so $L = \\arcsin x\\Big|_0^{1/2} = \\frac{\\pi}{6}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + x^2/(1 - x^2))', lower: '0', upper: '1/2' },
    difficulty: 1,
  },
  {
    id: 'al-f-045',
    topic: 'arc-length',
    kind: 'evaluate',
    prompt: {
      text: 'Arc length of $y = \\sqrt{x} - \\frac{1}{3}x^{3/2}$ for $1 \\le x \\le 4$:',
      latex: '\\int_1^4 \\sqrt{1 + \\left(\\frac{1}{2\\sqrt{x}} - \\frac{\\sqrt{x}}{2}\\right)^2}\\,dx',
    },
    options: [
      { latex: '\\frac{10}{3}', expr: '10/3' },
      { latex: '\\frac{4}{3}', expr: '4/3', mistake: 'arclength-missing-one', why: 'Dropping the 1 leaves ∫|f′|dx = 4/3, only the vertical change.' },
      { latex: '\\frac{13}{3}', expr: '13/3', mistake: 'sqrt-of-sum-split', why: 'Splitting the root as 1 + |f′| adds an extra 3 to 4/3.' },
      { latex: '\\frac{14}{3}', expr: '14/3', mistake: 'ftc-not-subtracted', why: 'Only F(4) = 2 + 8/3 was computed; F(1) = 4/3 must be subtracted.' },
      { latex: '4', expr: '4', mistake: 'sign-error', why: 'F(1) = 1 + ⅓ = 4/3; using 1 − ⅓ = ⅔ instead gives 14/3 − 2/3 = 4.' },
      { latex: '\\frac{9}{2}', expr: '9/2', mistake: 'power-rule-int-coefficient', why: '∫(√x/2)dx = x^{3/2}/3; without dividing by 3/2 the term becomes x^{3/2}/2.' },
    ],
    correct: 0,
    explanation: 'The radicand is $\\left(\\frac{1}{2\\sqrt{x}} + \\frac{\\sqrt{x}}{2}\\right)^2$, so $L = \\left[\\sqrt{x} + \\frac{x^{3/2}}{3}\\right]_1^4 = \\frac{14}{3} - \\frac{4}{3}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(1 + (1/(2*sqrt(x)) - sqrt(x)/2)^2)', lower: '1', upper: '4' },
    difficulty: 2,
  },
  {
    id: 'al-f-046',
    topic: 'arc-length',
    kind: 'concept',
    prompt: { text: 'On $\\frac{2\\pi}{3} \\le x \\le \\frac{5\\pi}{6}$, the expression $\\sqrt{1 + \\tan^2 x}$ simplifies to' },
    options: [
      { latex: '-\\sec x', expr: '-sec(x)' },
      {
        latex: '\\sec x',
        expr: 'sec(x)',
        mistake: 'sqrt-square-abs',
        why: '√(sec²x) = |sec x|; here cos x < 0, so sec x is negative and cannot equal a square root.',
      },
      {
        latex: '1 - \\tan x',
        expr: '1 - tan(x)',
        mistake: 'sqrt-of-sum-split',
        why: 'The root was split as √1 + √(tan²x) = 1 + |tan x|; square roots do not split over sums.',
      },
      {
        latex: '\\sec^2 x',
        expr: 'sec(x)^2',
        mistake: 'arclength-no-root',
        why: '1 + tan²x = sec²x is the radicand; the square root was not taken.',
      },
      {
        latex: '-\\tan x',
        expr: '-tan(x)',
        mistake: 'arclength-missing-one',
        why: '√(tan²x) = |tan x| = −tan x here, but the 1 under the root was ignored.',
      },
      {
        latex: '\\csc x',
        expr: 'csc(x)',
        mistake: 'pythagorean-wrong',
        why: 'The identity is 1 + tan²x = sec²x; csc² pairs with 1 + cot²x.',
      },
    ],
    correct: 0,
    explanation: '$\\sqrt{1 + \\tan^2 x} = \\sqrt{\\sec^2 x} = |\\sec x|$, and $\\cos x < 0$ on this interval, so $|\\sec x| = -\\sec x$.',
    domain: [2.15, 2.6],
    check: { kind: 'identity', lhs: 'sqrt(1 + tan(x)^2)' },
    difficulty: 2,
  },
];

// ───────────── generators ─────────────
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

function pick<T>(rng: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

/** k·√n with square factors pulled out of the radical. */
function surd(k: number, n: number): { latex: string; expr: string } {
  let c = k;
  let r = n;
  for (let s = Math.floor(Math.sqrt(r)); s >= 2; s--) {
    if (r % (s * s) === 0) {
      c *= s;
      r /= s * s;
      s = Math.floor(Math.sqrt(r)) + 1;
    }
  }
  if (r === 1) return { latex: `${c}`, expr: `${c}` };
  return { latex: c === 1 ? `\\sqrt{${r}}` : `${c}\\sqrt{${r}}`, expr: `${c}*sqrt(${r})` };
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x;
}

/** n/d in lowest terms (positive values only). */
function fracOf(n: number, d: number): { latex: string; expr: string } {
  const g = gcd(n, d);
  const nn = n / g;
  const dd = d / g;
  if (dd === 1) return { latex: `${nn}`, expr: `${nn}` };
  return { latex: `\\frac{${nn}}{${dd}}`, expr: `${nn}/${dd}` };
}

/** Pairs (p, q): x runs from p² − 1 to q² − 1, so 1 + x is a perfect square at both ends. */
const ROOT_PAIRS: readonly [number, number][] = [
  [1, 2],
  [2, 3],
  [1, 4],
  [2, 4],
  [3, 4],
];

export const generators: FlashGenerator[] = [
  {
    id: 'al-g-line-length',
    topic: 'arc-length',
    kind: 'concept',
    describe: 'Length of the segment y = mx + b over [0, k] (m = 2..6, k = 2..5): k√(1 + m²)',
    generate(seed) {
      const rng = mulberry(seed);
      const m = pick(rng, [2, 3, 4, 5, 6] as const);
      const k = pick(rng, [2, 3, 4, 5] as const);
      const b = pick(rng, [-3, -2, -1, 1, 2, 3] as const);
      const line = `y = ${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
      const correct = surd(k, 1 + m * m);
      const notSquared = surd(k, 1 + m);
      const yLimits = surd(m * k, 1 + m * m);
      return {
        id: `al-g-line-length:${seed}`,
        topic: 'arc-length',
        kind: 'concept',
        prompt: { text: `The length of the line $${line}$ from $x = 0$ to $x = ${k}$ is` },
        options: [
          { latex: correct.latex, expr: correct.expr },
          {
            latex: notSquared.latex,
            expr: notSquared.expr,
            mistake: 'arclength-not-squared',
            why: `The slope ${m} was not squared: √(1 + ${m}) instead of √(1 + ${m}²).`,
          },
          {
            latex: `${k * (1 + m)}`,
            expr: `${k * (1 + m)}`,
            mistake: 'sqrt-of-sum-split',
            why: `√(1 + ${m}²) was split into 1 + ${m}, giving ${k}·${1 + m} = ${k * (1 + m)}.`,
          },
          {
            latex: `${k * (1 + m * m)}`,
            expr: `${k * (1 + m * m)}`,
            mistake: 'arclength-no-root',
            why: `(1 + ${m}²)·${k} = ${k * (1 + m * m)}: the square root was never taken.`,
          },
          {
            latex: `${k * m}`,
            expr: `${k * m}`,
            mistake: 'arclength-missing-one',
            why: `√(${m}²)·${k} = ${k * m} measures only the vertical rise of the segment.`,
          },
          {
            latex: yLimits.latex,
            expr: yLimits.expr,
            mistake: 'arclength-variable-mismatch',
            why: `The y-values ${b} to ${m * k + b} (a span of ${m * k}) were used as the limits of the dx integral instead of x from 0 to ${k}.`,
          },
        ],
        correct: 0,
        explanation: `$f'(x) = ${m}$, so $L = \\int_0^{${k}} \\sqrt{1 + ${m}^2}\\,dx = ${correct.latex}$.`,
        check: { kind: 'value', expected: `integral(sqrt(1 + ${m}^2), x, 0, ${k})` },
        difficulty: 1,
      };
    },
  },
  {
    id: 'al-g-root-shift',
    topic: 'arc-length',
    kind: 'evaluate',
    describe: 'Length of y = (2/3)x^(3/2) between x = p² − 1 and x = q² − 1: (2/3)(q³ − p³)',
    generate(seed) {
      const rng = mulberry(seed);
      const [p, q] = pick(rng, ROOT_PAIRS);
      const a = p * p - 1;
      const b = q * q - 1;
      const diff = q ** 3 - p ** 3;
      const correct = fracOf(2 * diff, 3);
      const upperOnly = fracOf(2 * q ** 3, 3);
      const noDivide = fracOf(diff, 1);
      const timesThreeHalves = fracOf(3 * diff, 2);
      const noRoot = fracOf(2 * (b - a) + (b * b - a * a), 2);
      const exponentKept = fracOf(2 * (q - p), 1);
      return {
        id: `al-g-root-shift:${seed}`,
        topic: 'arc-length',
        kind: 'evaluate',
        prompt: {
          text: `Arc length of $y = \\frac{2}{3}x^{3/2}$ for $${a} \\le x \\le ${b}$:`,
          latex: `\\int_{${a}}^{${b}} \\sqrt{1 + x}\\,dx`,
        },
        options: [
          { latex: correct.latex, expr: correct.expr },
          {
            latex: upperOnly.latex,
            expr: upperOnly.expr,
            mistake: 'ftc-not-subtracted',
            why: `Only the upper limit was used: ⅔·${q}³; the lower-limit value ⅔·${p}³ must be subtracted.`,
          },
          {
            latex: noDivide.latex,
            expr: noDivide.expr,
            mistake: 'power-rule-int-coefficient',
            why: `∫(1 + x)^{1/2}dx = ⅔(1 + x)^{3/2}; without dividing by 3/2 the result is ${q}³ − ${p}³ = ${diff}.`,
          },
          {
            latex: timesThreeHalves.latex,
            expr: timesThreeHalves.expr,
            mistake: 'power-rule-int-coefficient',
            why: 'The power rule divides by the new exponent 3/2; this multiplied by 3/2 instead.',
          },
          {
            latex: noRoot.latex,
            expr: noRoot.expr,
            mistake: 'arclength-no-root',
            why: 'This is ∫(1 + x)dx: the square root in the integrand was ignored.',
          },
          {
            latex: exponentKept.latex,
            expr: exponentKept.expr,
            mistake: 'power-rule-int-exponent',
            why: 'The exponent was not raised: 2(1 + x)^{1/2} differentiates to (1 + x)^{−1/2}, not (1 + x)^{1/2}.',
          },
        ],
        correct: 0,
        explanation: `$\\frac{2}{3}(1 + x)^{3/2}\\Big|_{${a}}^{${b}} = \\frac{2}{3}\\left(${q}^3 - ${p}^3\\right) = ${correct.latex}$.`,
        check: { kind: 'definite-integral', integrand: 'sqrt(1 + x)', lower: `${a}`, upper: `${b}` },
        difficulty: 1,
      };
    },
  },
];
