/**
 * Shared mistake taxonomy. Every distractor in every content file is tagged with exactly one of
 * these ids and carries a `why` line explaining how the option results from that mistake.
 *
 * Seeded from the project brief and expanded from the "Common Mistakes" boxes in the MAC 2312
 * lecture notes (Lectures 1–7). Content authors must NOT edit this file; propose additions in
 * your report and the orchestrator will add them.
 */
export interface MistakeDef {
  label: string;
  description: string;
  /** Free-form grouping used by the UI and by reports. */
  group:
    | 'differentiation'
    | 'integration-basics'
    | 'substitution'
    | 'area'
    | 'volumes'
    | 'arc-length'
    | 'ibp'
    | 'trig-integrals'
    | 'trig-sub'
    | 'algebra'
    | 'technique';
}

export const MISTAKES = {
  // ───────────── seeds from the brief ─────────────
  'chain-rule-missing': {
    label: 'Forgot the chain rule / inner derivative',
    description: 'Differentiated the outer function but dropped the derivative of the inner function.',
    group: 'differentiation',
  },
  'product-rule-integral': {
    label: 'Used a "product rule for integrals"',
    description: 'Integrated a product factor-by-factor as if ∫fg = (∫f)(∫g). There is no such rule.',
    group: 'integration-basics',
  },
  'sign-error-derivative': {
    label: 'Sign error in a derivative',
    description: 'Wrong sign, typically for d/dx of cos, cot, csc, arccos, arccot, arccsc.',
    group: 'differentiation',
  },
  'sign-error': {
    label: 'Sign error',
    description: 'A sign was dropped or flipped somewhere in the work (not the standard derivative-sign cases).',
    group: 'algebra',
  },
  'bounds-not-converted': {
    label: 'Bounds not converted after substitution',
    description: 'Kept the original x-limits on an integral written in u (or θ) after substituting.',
    group: 'substitution',
  },
  'dx-not-replaced': {
    label: 'Forgot to replace dx',
    description: 'Substituted into the integrand but kept dx instead of expressing it in the new variable.',
    group: 'substitution',
  },
  'ibp-wrong-u-dv': {
    label: 'Wrong u / dv choice in IBP',
    description: 'Chose u and dv so the new integral is harder (ignored LIATE or picked an un-integrable dv).',
    group: 'ibp',
  },
  'trig-sub-wrong-form': {
    label: 'Wrong trig substitution for the form',
    description: 'Used sin where tan or sec was needed (or similar): the substitution does not collapse the radicand.',
    group: 'trig-sub',
  },
  'pythagorean-wrong': {
    label: 'Wrong Pythagorean identity',
    description: 'Misapplied sin²+cos²=1 or tan²+1=sec² (wrong sign or wrong pairing of functions).',
    group: 'trig-integrals',
  },
  'top-bottom-swapped': {
    label: 'Top/bottom (or right/left) swapped',
    description: 'Integrated bottom − top (or left − right), giving a negative area or wrong integrand.',
    group: 'area',
  },
  'radii-swapped': {
    label: 'Inner and outer radius swapped',
    description: 'Used π(r² − R²): the inner radius was treated as the outer one.',
    group: 'volumes',
  },
  'axis-shift-missing': {
    label: 'Forgot the shift for a non-axis line of rotation',
    description: 'Used the function value as the radius although the axis of rotation is not a coordinate axis.',
    group: 'volumes',
  },
  'negative-squared-wrong': {
    label: 'Squared a negative incorrectly',
    description: 'Applied the sign after the power or vice versa, e.g. (−2)² treated as −4 or −(2²) treated as 4.',
    group: 'algebra',
  },
  'abs-dropped': {
    label: 'Dropped the absolute value in ln|…|',
    description: 'Wrote ln(…) where the antiderivative requires ln|…|, or vice versa.',
    group: 'integration-basics',
  },
  'mixed-variables': {
    label: 'Mixed x and θ (or x and u) in one expression',
    description: 'Left both the original and the new variable in the same integral or answer.',
    group: 'substitution',
  },
  'theta-interval-sign': {
    label: 'Ignored the θ interval when choosing a sign',
    description: 'Took √(a²tan²θ) = a tanθ (or similar) without checking the sign of the trig function on the θ interval.',
    group: 'trig-sub',
  },

  // ───────────── Lecture 1: differentiation review & basics ─────────────
  'constant-derivative': {
    label: 'Derivative of a constant is not zero',
    description: 'Treated a constant term as surviving differentiation (e.g. d/dx(2) = 2 or = 1).',
    group: 'differentiation',
  },
  'power-rule-exponent': {
    label: 'Power rule: exponent not reduced',
    description: 'Kept the original exponent (or added 1) instead of subtracting 1.',
    group: 'differentiation',
  },
  'power-rule-coefficient': {
    label: 'Power rule: coefficient wrong',
    description: 'Forgot to multiply by the old exponent, or multiplied by the new one.',
    group: 'differentiation',
  },
  'negative-exponent-sign': {
    label: 'Negative exponent sign error',
    description: 'd/dx of x^(−n) written with the wrong sign, or 1/x² differentiated as +2/x³.',
    group: 'differentiation',
  },
  'exponential-as-power': {
    label: 'Treated an exponential like a power',
    description: 'd/dx(a^x) written as x·a^(x−1); or e^x differentiated as x·e^(x−1).',
    group: 'differentiation',
  },
  'exp-base-log-missing': {
    label: 'Forgot ln(a) for a^x',
    description: 'd/dx(a^x) written as a^x without the factor ln a (or with the wrong factor).',
    group: 'differentiation',
  },
  'log-derivative-wrong': {
    label: 'Wrong derivative of a logarithm',
    description: 'd/dx ln x written as 1/x², ln x, or x; or d/dx log_a x missing the 1/ln a.',
    group: 'differentiation',
  },
  'product-rule-missing-term': {
    label: 'Product rule: a term is missing',
    description: 'Differentiated only one factor, or multiplied the two derivatives (f′g′).',
    group: 'differentiation',
  },
  'quotient-rule-order': {
    label: 'Quotient rule: numerator terms swapped',
    description: 'Wrote (f g′ − f′ g)/g² instead of (f′ g − f g′)/g².',
    group: 'differentiation',
  },
  'quotient-rule-plus': {
    label: 'Quotient rule: plus instead of minus',
    description: 'Wrote (f′ g + f g′)/g² in the numerator.',
    group: 'differentiation',
  },
  'quotient-rule-denominator': {
    label: 'Quotient rule: denominator not squared',
    description: 'Kept g instead of g² in the denominator (or squared incorrectly).',
    group: 'differentiation',
  },
  'trig-derivative-swapped': {
    label: 'Trig derivative confused with another',
    description: 'e.g. d/dx tan x = sec x, d/dx sec x = sec²x, d/dx sin x = −cos x (function/sign mix-up).',
    group: 'differentiation',
  },
  'inverse-trig-confused': {
    label: 'Inverse-trig derivatives confused',
    description: 'Mixed up 1/√(1−x²), 1/(1+x²), and 1/(|x|√(x²−1)), or their signs.',
    group: 'differentiation',
  },
  'inverse-trig-as-reciprocal': {
    label: 'Read tan⁻¹x as 1/tan x',
    description: 'Treated an inverse trig function as the reciprocal trig function.',
    group: 'differentiation',
  },
  'quotient-of-derivatives': {
    label: 'Differentiated numerator and denominator separately',
    description: 'Wrote (f/g)′ = f′/g′ instead of using the quotient rule.',
    group: 'differentiation',
  },
  'composition-misread': {
    label: 'Misread the composition',
    description: 'Read (f(x))² as f(x²), or f(g(x)) with the wrong inner/outer function.',
    group: 'differentiation',
  },
  'power-as-exponential': {
    label: 'Treated a power like an exponential',
    description: 'd/dx(x^π) written as x^π·ln x (or similar): a constant exponent means the power rule.',
    group: 'differentiation',
  },
  'inner-function-not-derivative': {
    label: 'Multiplied by the inner function instead of its derivative',
    description: 'Chain rule applied as f′(u)·u instead of f′(u)·u′.',
    group: 'differentiation',
  },
  'coefficient-mishandled': {
    label: 'Constant multiple dropped or duplicated',
    description: 'A constant factor was lost, doubled, or moved to the wrong place.',
    group: 'algebra',
  },
  'chain-rule-doubled': {
    label: 'Chain rule applied twice / extra inner factor',
    description: 'Multiplied by the inner derivative where there was no composition, or applied it twice.',
    group: 'differentiation',
  },
  'chain-rule-outer-wrong': {
    label: 'Chain rule: outer derivative wrong',
    description: 'Kept the inner derivative but differentiated the outer function incorrectly or not at all.',
    group: 'differentiation',
  },

  // ───────────── Lecture 1: antiderivatives, FTC, substitution ─────────────
  'differentiated-instead': {
    label: 'Differentiated instead of integrating',
    description: 'Applied a derivative rule when an antiderivative was asked for.',
    group: 'integration-basics',
  },
  'integrated-instead': {
    label: 'Integrated instead of differentiating',
    description: 'Applied an antiderivative rule when a derivative was asked for.',
    group: 'differentiation',
  },
  'power-rule-int-coefficient': {
    label: 'Integration power rule: forgot to divide by n+1',
    description: '∫xⁿ dx written as xⁿ⁺¹ (no division), or divided by n instead of n+1.',
    group: 'integration-basics',
  },
  'power-rule-int-exponent': {
    label: 'Integration power rule: exponent not increased',
    description: 'Kept the exponent or decreased it when integrating a power.',
    group: 'integration-basics',
  },
  'ln-misapplied': {
    label: 'Used ln for a power other than −1',
    description: 'Integrated 1/x² (or similar) as ln|…| instead of using the power rule, or integrated 1/x by the power rule.',
    group: 'integration-basics',
  },
  'ln-argument-wrong': {
    label: 'ln with the wrong argument',
    description: 'The inner function of the logarithm is wrong (e.g. ln|x| instead of ln|x²+1|, or missing a constant factor).',
    group: 'integration-basics',
  },
  'trig-antiderivative-sign': {
    label: 'Sign error in a trig antiderivative',
    description: '∫sin x dx = cos x + C, ∫cos x dx = −sin x + C, or a wrong sign with sec/csc/cot antiderivatives.',
    group: 'integration-basics',
  },
  'trig-antiderivative-swapped': {
    label: 'Trig antiderivative confused with a derivative pattern',
    description: 'e.g. ∫sec²x dx = sec x tan x, ∫tan x dx = sec²x, ∫sec x tan x dx = tan x.',
    group: 'integration-basics',
  },
  'exp-antiderivative-wrong': {
    label: 'Exponential antiderivative wrong',
    description: '∫e^(kx) dx written without the 1/k, with k, or as e^(kx+1)/(kx+1).',
    group: 'integration-basics',
  },
  'inner-constant-factor-missing': {
    label: 'Missing the 1/k factor for an inner kx',
    description: 'Integrated f(kx) as F(kx) without dividing by k (or multiplied by k instead).',
    group: 'substitution',
  },
  'ftc-order-swapped': {
    label: 'FTC evaluated as F(a) − F(b)',
    description: 'Subtracted in the wrong order when applying the Fundamental Theorem of Calculus.',
    group: 'integration-basics',
  },
  'ftc-not-subtracted': {
    label: 'Evaluated F only at one bound',
    description: 'Forgot to subtract F(lower bound), or added the two values.',
    group: 'integration-basics',
  },
  'ftc-hypothesis-ignored': {
    label: 'Applied the FTC across a discontinuity',
    description: 'Used F(b) − F(a) although the integrand is not continuous on [a, b].',
    group: 'integration-basics',
  },
  'plus-c-misuse': {
    label: '+C on a definite integral, or missing on an indefinite one',
    description: 'Confused the family of antiderivatives with a signed-area number.',
    group: 'integration-basics',
  },
  'signed-area-confusion': {
    label: 'Definite integral treated as geometric area',
    description: 'Ignored that the integral is a signed area when the integrand is negative on part of the interval.',
    group: 'integration-basics',
  },
  'u-choice-wrong': {
    label: 'Poor choice of u',
    description: 'Chose a u whose derivative does not appear in the integrand (up to a constant).',
    group: 'substitution',
  },
  'du-constant-wrong': {
    label: 'du computed with the wrong constant',
    description: 'e.g. u = x², du = x dx; or forgot the 1/2 when rewriting x dx as du/2.',
    group: 'substitution',
  },
  'du-derivative-wrong': {
    label: 'du computed with the wrong derivative',
    description: 'The derivative of u is wrong (function, sign, or chain rule), so the rewritten integrand is wrong.',
    group: 'substitution',
  },
  'u-cos-sign-missing': {
    label: 'Forgot the minus sign when u = cos x',
    description: 'Used du = sin x dx instead of du = −sin x dx (or the analogous sign for other decreasing u).',
    group: 'substitution',
  },
  'not-back-substituted': {
    label: 'Answer left in the new variable',
    description: 'Stopped at an expression in u (or θ) instead of rewriting it in terms of x.',
    group: 'substitution',
  },
  'back-substitution-wrong': {
    label: 'Back-substituted the wrong expression',
    description: 'Replaced u with a different function than the one chosen (e.g. sin x when u = cos x).',
    group: 'substitution',
  },
  'mixed-limits-variable': {
    label: 'u-limits used with an x-expression',
    description: 'Converted the limits to u but evaluated an antiderivative written in x (or vice versa).',
    group: 'substitution',
  },
  'bounds-swapped': {
    label: 'Bounds in the wrong order',
    description: 'Lower and upper limits swapped after conversion (or read off in the wrong order).',
    group: 'substitution',
  },
  'leftover-x-in-u-integral': {
    label: 'Leftover x not converted',
    description: 'Part of the integrand was still in x after the substitution (e.g. x² kept when u = x²+1).',
    group: 'substitution',
  },

  // ───────────── Lecture 2: area between curves ─────────────
  'missing-intersection': {
    label: 'Missed an intersection point',
    description: 'Bounds of integration miss a crossing point, so the region is cut wrong.',
    group: 'area',
  },
  'top-bottom-not-split': {
    label: 'Did not split where the curves cross',
    description: 'Assumed the same function stays on top (or on the right) across the whole interval.',
    group: 'area',
  },
  'dx-dy-mismatch': {
    label: 'Mixed dx and dy',
    description: 'Integrand written in y with dx (or in x with dy).',
    group: 'area',
  },
  'bounds-wrong-variable': {
    label: 'Bounds taken from the wrong coordinate',
    description: 'Used y-values of the intersection points as x-limits (or vice versa).',
    group: 'area',
  },
  'negative-area': {
    label: 'Accepted a negative area',
    description: 'A negative result (or a signed integral that cancels) was reported as the area.',
    group: 'area',
  },
  'single-function-area': {
    label: 'Integrated one curve only',
    description: 'Computed ∫f dx instead of ∫(f − g) dx, ignoring the other boundary.',
    group: 'area',
  },
  'sum-instead-of-difference': {
    label: 'Added the functions instead of subtracting',
    description: 'Used f + g as the integrand for the region between the curves.',
    group: 'area',
  },
  'inverse-function-wrong': {
    label: 'Solved for the other variable incorrectly',
    description: 'When rewriting a curve as x = g(y) (or y = f(x)), the inverse was computed wrong.',
    group: 'area',
  },
  'abs-value-region-wrong': {
    label: 'Absolute-value boundary handled wrong',
    description: 'Treated |x| as x on the whole region instead of splitting at 0.',
    group: 'area',
  },
  'integrand-vs-integral': {
    label: 'Confused the integrand with the integral',
    description: 'Read a length (top − bottom) as the area, or the area formula as the length of a slice.',
    group: 'area',
  },
  'test-point-outside-interval': {
    label: 'Test point taken outside the sub-interval',
    description: 'Decided which curve is on top using a point that is not between the two consecutive intersection values.',
    group: 'area',
  },
  'split-at-wrong-point': {
    label: 'Split the region at the wrong point',
    description: 'Split at a vertex or an x-intercept instead of where the two curves cross.',
    group: 'area',
  },
  'interval-not-respected': {
    label: 'Ignored the given interval',
    description: 'Used intersection points as bounds although the problem restricts x (or y) to a given interval.',
    group: 'area',
  },

  // ───────────── Lecture 3 & 4: volumes ─────────────
  'washer-as-disk': {
    label: 'Missed the gap: disk used where a washer is needed',
    description: 'Ignored the hole between the region and the axis of rotation (inner radius set to 0).',
    group: 'volumes',
  },
  'radius-not-squared': {
    label: 'Radius not squared',
    description: 'Wrote πR (or π(R − r)) instead of πR² (or π(R² − r²)).',
    group: 'volumes',
  },
  'washer-difference-squared': {
    label: 'π(R − r)² instead of π(R² − r²)',
    description: 'Squared the difference of the radii instead of subtracting the squares.',
    group: 'volumes',
  },
  'pi-missing': {
    label: 'Forgot the factor π',
    description: 'Disk/washer integrand written without π.',
    group: 'volumes',
  },
  'two-pi-missing': {
    label: 'Forgot the factor 2π',
    description: 'Shell integrand written without 2π (or with π only).',
    group: 'volumes',
  },
  'wrong-integration-variable': {
    label: 'Integrated with respect to the wrong variable for the method',
    description: 'Disks/washers must be perpendicular to the axis and shells parallel; the variable does not match the slice.',
    group: 'volumes',
  },
  'not-in-terms-of-variable': {
    label: 'Radius/height not written in the integration variable',
    description: 'The integrand still contains the other variable (e.g. √x inside a dy integral).',
    group: 'volumes',
  },
  'bounds-wrong-axis': {
    label: 'Bounds taken along the wrong axis',
    description: 'Used x-limits for a dy integral (or y-limits for a dx integral).',
    group: 'volumes',
  },
  'radius-is-function-value': {
    label: 'Radius taken as the function value regardless of axis',
    description: 'Used f(x) as the radius even though the axis is not y = 0 (or used x although the axis is not x = 0).',
    group: 'volumes',
  },
  'axis-shift-sign': {
    label: 'Axis shift with the wrong sign',
    description: 'Wrote f(x) + k instead of k − f(x) (or vice versa) for the distance to the line y = k.',
    group: 'volumes',
  },
  'cross-section-area-wrong': {
    label: 'Wrong cross-section area formula',
    description: 'e.g. equilateral triangle area written as s² or (1/2)s², semicircle as πs², square as 2s.',
    group: 'volumes',
  },
  'diameter-as-radius': {
    label: 'Used the diameter as the radius',
    description: 'For circular/semicircular cross-sections the base segment is the diameter, not the radius.',
    group: 'volumes',
  },
  'shell-orientation-wrong': {
    label: 'Shell slice perpendicular to the axis',
    description: 'Drew the representative slice perpendicular to the axis of rotation instead of parallel.',
    group: 'volumes',
  },
  'shell-radius-wrong': {
    label: 'Shell radius wrong',
    description: 'Took the radius as x (or y) although the axis is shifted, or used the height as the radius.',
    group: 'volumes',
  },
  'shell-height-wrong': {
    label: 'Shell height wrong',
    description: 'Height not equal to the distance between the two boundary curves along the slice.',
    group: 'volumes',
  },
  'shell-radius-squared': {
    label: 'Shell radius squared',
    description: 'Wrote 2πr²h (mixing the disk formula into the shell formula).',
    group: 'volumes',
  },
  'method-formula-swapped': {
    label: 'Disk/washer and shell formulas confused',
    description: 'Used π(R² − r²) with a slice parallel to the axis, or 2πrh with a slice perpendicular to it.',
    group: 'volumes',
  },
  'method-choice-poor': {
    label: 'Chose the harder method',
    description: 'Picked shells when washers are substantially easier (or vice versa), e.g. requiring inverse functions or extra integrals.',
    group: 'volumes',
  },
  'bounds-from-axis': {
    label: 'Integral started at the axis of rotation instead of the region',
    description: 'A limit of integration was taken at the axis (e.g. x = −2) although the region begins elsewhere.',
    group: 'volumes',
  },
  'disk-as-washer': {
    label: 'Invented a hole that is not there',
    description: 'Used a washer with a nonzero inner radius although the region touches the axis of rotation.',
    group: 'volumes',
  },
  'phantom-axis-shift': {
    label: 'Treated part of the function as an axis shift',
    description: 'Dropped or moved a constant term of the boundary curve as if it were a shift of the axis of rotation.',
    group: 'volumes',
  },
  'boundary-pieces-swapped': {
    label: 'Boundary curves assigned to the wrong sub-intervals',
    description: 'When the region needs a split, the curves for the two pieces were interchanged.',
    group: 'volumes',
  },
  'volume-two-integrals-missed': {
    label: 'Boundary change ignored (needs a split)',
    description: 'A single integral was written although the outer/inner boundary (or shell height) changes formula mid-interval.',
    group: 'volumes',
  },

  // ───────────── Lecture 5 Part 1: arc length ─────────────
  'arclength-f-instead-of-fprime': {
    label: 'Used f(x) instead of f′(x) in the arc-length formula',
    description: 'Integrand written as √(1 + f(x)²).',
    group: 'arc-length',
  },
  'arclength-missing-one': {
    label: 'Forgot the 1 under the root',
    description: 'Integrand written as √(f′(x)²) = |f′(x)|.',
    group: 'arc-length',
  },
  'arclength-not-squared': {
    label: 'Forgot to square the derivative',
    description: 'Integrand written as √(1 + f′(x)).',
    group: 'arc-length',
  },
  'sqrt-square-abs': {
    label: '√(u²) = u instead of |u|',
    description: 'Dropped the absolute value when simplifying a perfect square under the root.',
    group: 'arc-length',
  },
  'sqrt-of-sum-split': {
    label: 'Split a square root over a sum',
    description: 'Wrote √(a + b) = √a + √b.',
    group: 'algebra',
  },
  'arclength-variable-mismatch': {
    label: 'Arc-length variable mismatch',
    description: 'Used y-limits with a dx integral (or f′(x) with dy), or did not rewrite x = g(y) when integrating in y.',
    group: 'arc-length',
  },
  'radicand-as-binomial-square': {
    label: 'Wrote (1 + f′)² for 1 + (f′)²',
    description: 'Squared the whole binomial instead of only the derivative under the arc-length root.',
    group: 'arc-length',
  },
  'wrong-branch-chosen': {
    label: 'Wrong branch when solving for y (or x)',
    description: 'Took the ± or the wrong root/branch when rewriting the curve as y = f(x) or x = g(y).',
    group: 'arc-length',
  },
  'abs-sign-on-interval': {
    label: 'Sign of |expression| decided wrong on the interval',
    description: 'Removed an absolute value with the wrong sign for the interval of integration (general, not only θ intervals).',
    group: 'algebra',
  },
  'arclength-no-root': {
    label: 'Forgot the square root',
    description: 'Integrated 1 + f′(x)² without the root.',
    group: 'arc-length',
  },

  // ───────────── Lecture 5 Part 2: integration by parts ─────────────
  'ibp-sign-error': {
    label: 'IBP sign error',
    description: 'Wrote uv + ∫v du, or lost the minus when substituting a negative v.',
    group: 'ibp',
  },
  'ibp-formula-wrong': {
    label: 'IBP formula misremembered',
    description: 'e.g. ∫u dv = uv − ∫u dv, or = u∫v − ∫v du.',
    group: 'ibp',
  },
  'ibp-incomplete-dv': {
    label: 'u dv does not cover the whole integrand',
    description: 'A factor of the integrand was left out of both u and dv.',
    group: 'ibp',
  },
  'ibp-v-wrong': {
    label: 'v = ∫dv computed wrong',
    description: 'The antiderivative of dv is wrong (sign, missing 1/k, or differentiated instead).',
    group: 'ibp',
  },
  'ibp-du-wrong': {
    label: 'du computed wrong',
    description: 'The derivative of u is wrong (e.g. d(ln x) = 1 dx, d(x²) = x dx).',
    group: 'ibp',
  },
  'ibp-stopped-early': {
    label: 'Stopped after one IBP when another was needed',
    description: 'Left an integral that still needs integration by parts (or substitution).',
    group: 'ibp',
  },
  'ibp-cyclic-algebra': {
    label: 'Cyclic IBP solved incorrectly',
    description: 'When the original integral reappeared, the algebra to solve for it was wrong (e.g. forgot to divide by 2, or wrong sign).',
    group: 'ibp',
  },
  'ibp-bounds-not-applied': {
    label: 'Bounds not applied to the boundary term',
    description: 'For a definite integral, uv was not evaluated between the limits (or only at one limit).',
    group: 'ibp',
  },
  'ibp-when-usub': {
    label: 'Used IBP where a substitution works directly',
    description: 'Chose integration by parts although the integrand is f(g(x))g′(x).',
    group: 'technique',
  },
  'ibp-tabular-sign': {
    label: 'Tabular method sign pattern wrong',
    description: 'Alternating signs (+, −, +, …) applied incorrectly in the tabular/repeated IBP.',
    group: 'ibp',
  },
  'ibp-u-du-confused': {
    label: 'Wrote du where u belongs (or vice versa)',
    description: 'e.g. set u = 1/x for an integrand containing ln x, confusing the function with its derivative.',
    group: 'ibp',
  },
  'ibp-v-dv-confused': {
    label: 'Used dv itself as v',
    description: 'Did not integrate dv: took v equal to the dv factor (or its derivative).',
    group: 'ibp',
  },
  'ibp-cyclic-roles-swapped': {
    label: 'Swapped u and dv in the second IBP of a cyclic integral',
    description: 'Reversing the roles on the second application undoes the first and gives I = I.',
    group: 'ibp',
  },
  'inverse-trig-value-wrong': {
    label: 'Inverse-trig value misremembered',
    description: 'e.g. tan⁻¹(1/√3) taken as π/3 instead of π/6, or sin⁻¹(1/2) as π/3.',
    group: 'algebra',
  },
  'liate-misordered': {
    label: 'LIATE order misremembered',
    description: 'Chose u by the wrong priority (e.g. exponential before algebraic).',
    group: 'ibp',
  },

  // ───────────── Lecture 6: trigonometric integrals ─────────────
  'trig-wrong-factor-saved': {
    label: 'Saved the wrong factor',
    description: 'Kept a factor that does not match the derivative of the intended u (e.g. saved cos x but set u = cos x).',
    group: 'trig-integrals',
  },
  'half-angle-wrong': {
    label: 'Half-angle identity wrong',
    description: 'Wrong sign or missing 1/2 in sin²x = (1 − cos 2x)/2 or cos²x = (1 + cos 2x)/2, or 2x written as x.',
    group: 'trig-integrals',
  },
  'double-angle-wrong': {
    label: 'Double-angle identity wrong',
    description: 'sin 2x = sin x cos x (missing 2), or cos 2x with the wrong sign/pairing.',
    group: 'trig-integrals',
  },
  'exponent-arithmetic': {
    label: 'Exponent bookkeeping error',
    description: 'Wrong power after splitting off a factor (e.g. sin⁵ = (1 − cos²)·sin instead of (1 − cos²)²·sin).',
    group: 'trig-integrals',
  },
  'sec-odd-power-strategy': {
    label: 'Wrong strategy for an odd power of secant',
    description: 'Tried a u-substitution on sec³x (or similar) instead of integration by parts.',
    group: 'trig-integrals',
  },
  'tan-antiderivative-wrong': {
    label: '∫tan x dx misremembered',
    description: 'Wrote sec²x, ln|cos x|, or ln|sin x| instead of −ln|cos x| + C.',
    group: 'trig-integrals',
  },
  'sec-antiderivative-wrong': {
    label: '∫sec x dx misremembered',
    description: 'Wrote ln|sec x|, sec x tan x, or ln|sec x − tan x| instead of ln|sec x + tan x| + C.',
    group: 'trig-integrals',
  },
  'even-powers-no-identity': {
    label: 'Tried a u-sub on even powers',
    description: 'Attempted u = sin x or u = cos x when both powers are even (no factor can be saved).',
    group: 'trig-integrals',
  },
  'tan-sec-identity-direction': {
    label: 'tan² ↔ sec² conversion wrong',
    description: 'Replaced tan²x by sec²x + 1, or sec²x by tan²x − 1.',
    group: 'trig-integrals',
  },
  'product-to-sum-wrong': {
    label: 'Product-to-sum / angle-addition identity wrong',
    description: 'Wrong coefficients or signs when rewriting sin(mx)cos(nx) or cos(mx)cos(nx).',
    group: 'trig-integrals',
  },

  // ───────────── Lecture 7: trigonometric substitution ─────────────
  'trig-sub-coefficient': {
    label: 'Substitution coefficient wrong',
    description: 'For b² − (ax)², wrote x = b sinθ instead of ax = b sinθ (or the reciprocal), so the radicand does not collapse.',
    group: 'trig-sub',
  },
  'dx-coefficient': {
    label: 'dx computed with the wrong constant',
    description: 'e.g. x = 3 sinθ but dx = cosθ dθ (missing the 3), or dx = 3 sinθ dθ.',
    group: 'trig-sub',
  },
  'dx-derivative-wrong': {
    label: 'dx computed with the wrong derivative',
    description: 'd/dθ of tanθ, secθ, or sinθ misremembered when computing dx.',
    group: 'trig-sub',
  },
  'sqrt-constant-not-rooted': {
    label: 'Forgot to take the root of the constant',
    description: 'Wrote √(9cos²θ) = 9cosθ instead of 3cosθ.',
    group: 'trig-sub',
  },
  'triangle-sides-wrong': {
    label: 'Reference triangle labeled wrong',
    description: 'Mixed up opposite, adjacent and hypotenuse, so the back-substitution gives the wrong function of x.',
    group: 'trig-sub',
  },
  'trig-sub-when-usub': {
    label: 'Trig substitution used where a u-sub works',
    description: 'Used x = a tanθ (or similar) although the derivative of the radicand is present (u = x² + a²).',
    group: 'technique',
  },
  'reciprocal-identity-confused': {
    label: 'Reciprocal identity confused',
    description: 'Treated 1/sec θ as sin θ (it is cos θ), 1/csc θ as cos θ, or 1/tan θ as sec θ.',
    group: 'trig-sub',
  },
  'theta-bounds-wrong': {
    label: 'θ-bounds computed wrong',
    description: 'Solved a sinθ = x (or similar) for the bounds incorrectly (wrong angle or wrong inverse function).',
    group: 'trig-sub',
  },
  'inverse-function-wrong-arg': {
    label: 'θ written with the wrong inverse function or argument',
    description: 'e.g. θ = arcsin(3/x) instead of arcsin(x/3), or arctan where arcsin belongs.',
    group: 'trig-sub',
  },

  // ───────────── technique recognition & formulas ─────────────
  'technique-wrong': {
    label: 'Technique misidentified',
    description: 'The chosen method does not match the structure of the integrand.',
    group: 'technique',
  },
  'usub-when-ibp': {
    label: 'Tried a substitution where IBP is needed',
    description: 'No inner function with its derivative present; the integrand is a product needing integration by parts.',
    group: 'technique',
  },
  'formula-swapped': {
    label: 'Confused two formulas',
    description: 'e.g. the disk formula and the shell formula, or arc length and area.',
    group: 'technique',
  },
  'formula-missing-factor': {
    label: 'Formula missing a factor',
    description: 'A constant factor (π, 2π, 1/2, …) is missing from the recalled formula.',
    group: 'technique',
  },
  'formula-wrong-sign': {
    label: 'Formula with a wrong sign',
    description: 'A recalled formula or identity has a flipped sign.',
    group: 'technique',
  },
  'formula-wrong-power': {
    label: 'Formula with a wrong power',
    description: 'A recalled formula has an exponent wrong (e.g. R instead of R², or a cube).',
    group: 'technique',
  },
  'arithmetic-error': {
    label: 'Arithmetic slip',
    description: 'A plausible numerical/fraction slip in the final evaluation (use sparingly; prefer a specific tag).',
    group: 'algebra',
  },
  'algebra-error': {
    label: 'Algebra slip',
    description: 'A plausible algebraic error (expanding, factoring, combining fractions). Use sparingly; prefer a specific tag.',
    group: 'algebra',
  },
} as const satisfies Record<string, MistakeDef>;

export type MistakeId = keyof typeof MISTAKES;

export const MISTAKE_IDS = Object.keys(MISTAKES) as MistakeId[];

export function isMistakeId(id: string): id is MistakeId {
  return Object.prototype.hasOwnProperty.call(MISTAKES, id);
}
