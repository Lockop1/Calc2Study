import type { FlashGenerator, FlashItem } from '../types';

/** Flash Drill items for topic "volumes-disks". Authored by content-author; verified by math-verifier. */
export const flash: FlashItem[] = [
  // ───────────── formulas, slice areas, concepts ─────────────
  {
    id: 'vd-f-001',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'A vertical slice of a region runs from $y = 2$ up to $y = 5$. The region is rotated about the line $y = -1$. What is the area of the washer this slice sweeps out?' },
    options: [
      { latex: '27\\pi', expr: '27*pi' },
      { latex: '21\\pi', expr: '21*pi', mistake: 'axis-shift-missing', why: 'This is $\\pi(5^2 - 2^2)$: the radii were measured from the x-axis; from $y = -1$ they are $5 + 1 = 6$ and $2 + 1 = 3$.' },
      { latex: '9\\pi', expr: '9*pi', mistake: 'washer-difference-squared', why: 'This is $\\pi(6 - 3)^2$: the difference of the radii was squared instead of subtracting the squares.' },
      { latex: '3\\pi', expr: '3*pi', mistake: 'radius-not-squared', why: 'This is $\\pi(6 - 3)$: the radii were subtracted but never squared.' },
      { latex: '15\\pi', expr: '15*pi', mistake: 'axis-shift-sign', why: 'This is $\\pi(4^2 - 1^2)$: subtracting 1 from each height measures distance to $y = 1$, not to $y = -1$.' },
      { latex: '36\\pi', expr: '36*pi', mistake: 'washer-as-disk', why: 'This is $\\pi \\cdot 6^2$: the gap between the axis and the bottom of the slice (a hole of radius 3) was ignored.' },
    ],
    correct: 0,
    explanation: 'Distances to $y = -1$: $R = 5 + 1 = 6$ and $r = 2 + 1 = 3$, so $A = \\pi(6^2 - 3^2) = 27\\pi$.',
    check: { kind: 'value', expected: 'pi*(6^2 - 3^2)' },
    difficulty: 1,
  },
  {
    id: 'vd-f-002',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region under $y = 3 - x$ for $0 \\le x \\le 3$ is rotated about the x-axis. What is the area $A(x)$ of the cross-section at $x$?' },
    options: [
      { latex: 'A(x) = \\pi(3 - x)^2', expr: 'pi*(3 - x)^2' },
      { latex: 'A(x) = \\pi(3 - x)', expr: 'pi*(3 - x)', mistake: 'radius-not-squared', why: 'The radius $3 - x$ must be squared: a disk has area $\\pi R^2$.' },
      { latex: 'A(x) = (3 - x)^2', expr: '(3 - x)^2', mistake: 'pi-missing', why: 'A disk of radius $R$ has area $\\pi R^2$; the factor $\\pi$ was dropped.' },
      { latex: 'A(x) = \\pi(9 - x^2)', expr: 'pi*(9 - x^2)', mistake: 'algebra-error', why: '$(3 - x)^2$ was expanded as $9 - x^2$; the cross term $-6x$ is missing.' },
      { latex: 'A(x) = 2\\pi(3 - x)', expr: '2*pi*(3 - x)', mistake: 'formula-swapped', why: '$2\\pi R$ is the circumference of the disk, not its area.' },
      { latex: 'A(x) = 2\\pi x(3 - x)', expr: '2*pi*x*(3 - x)', mistake: 'method-formula-swapped', why: '$2\\pi x (3 - x)$ is a shell (radius $x$, height $3 - x$) for rotation about the y-axis, not a disk perpendicular to the x-axis.' },
    ],
    correct: 0,
    explanation: 'The slice at $x$ is a disk whose radius is the distance from the x-axis to the line, $R = 3 - x$, so $A(x) = \\pi(3 - x)^2$.',
    check: { kind: 'value', expected: 'pi*(3 - x)^2' },
    difficulty: 1,
  },
  {
    id: 'vd-f-003',
    topic: 'volumes-disks',
    kind: 'formula',
    prompt: { text: 'A cross-section is an equilateral triangle with side length $s$. What is its area?' },
    options: [
      { latex: '\\frac{\\sqrt{3}}{4}s^2', expr: 'sqrt(3)/4*s^2' },
      { latex: '\\frac{\\sqrt{3}}{4}s', expr: 'sqrt(3)/4*s', mistake: 'formula-wrong-power', why: 'The side must be squared: an area scales with length squared.' },
      { latex: '\\frac{\\sqrt{3}}{2}s^2', expr: 'sqrt(3)/2*s^2', mistake: 'formula-missing-factor', why: 'Base times height is $s \\cdot \\frac{\\sqrt{3}}{2}s$; the $\\frac12$ of the triangle formula was dropped.' },
      { latex: '\\frac{1}{2}s^2', expr: 's^2/2', mistake: 'cross-section-area-wrong', why: 'This is $\\frac12 \\cdot s \\cdot s$, which takes the height equal to the side; the height is $\\frac{\\sqrt{3}}{2}s$.' },
      { latex: 's^2', expr: 's^2', mistake: 'cross-section-area-wrong', why: '$s^2$ is the area of a square with side $s$, not of a triangle.' },
      { latex: '\\frac{\\sqrt{3}}{2}s', expr: 'sqrt(3)/2*s', mistake: 'cross-section-area-wrong', why: '$\\frac{\\sqrt{3}}{2}s$ is the height of the triangle, not its area.' },
    ],
    correct: 0,
    explanation: 'The height is $\\frac{\\sqrt{3}}{2}s$, so the area is $\\frac12 \\cdot s \\cdot \\frac{\\sqrt{3}}{2}s = \\frac{\\sqrt{3}}{4}s^2$.',
    variable: 's',
    check: { kind: 'identity', lhs: 'sqrt(3)/4*s^2' },
    difficulty: 1,
  },
  {
    id: 'vd-f-004',
    topic: 'volumes-disks',
    kind: 'formula',
    prompt: { text: 'A cross-section is a semicircle whose diameter is a segment of length $s$ lying in the base. What is its area?' },
    options: [
      { latex: '\\frac{\\pi}{8}s^2', expr: 'pi/8*s^2' },
      { latex: '\\frac{\\pi}{2}s^2', expr: 'pi/2*s^2', mistake: 'diameter-as-radius', why: '$s$ is the diameter, so the radius is $\\frac{s}{2}$; $\\frac12\\pi s^2$ uses $s$ as the radius.' },
      { latex: '\\frac{\\pi}{4}s^2', expr: 'pi/4*s^2', mistake: 'cross-section-area-wrong', why: '$\\pi\\left(\\frac{s}{2}\\right)^2$ is the whole circle; a semicircle is half of it.' },
      { latex: '\\frac{\\pi}{4}s', expr: 'pi/4*s', mistake: 'radius-not-squared', why: '$\\frac12\\pi \\cdot \\frac{s}{2}$ leaves the radius unsquared; the area needs $\\left(\\frac{s}{2}\\right)^2$.' },
      { latex: '\\frac{\\pi}{2}s', expr: 'pi/2*s', mistake: 'formula-swapped', why: '$\\frac{\\pi}{2}s$ is the length of the semicircular arc, not the area.' },
    ],
    correct: 0,
    explanation: 'The radius is $\\frac{s}{2}$, so the area is $\\frac12\\pi\\left(\\frac{s}{2}\\right)^2 = \\frac{\\pi}{8}s^2$.',
    variable: 's',
    check: { kind: 'identity', lhs: 'pi/8*s^2' },
    difficulty: 1,
  },
  {
    id: 'vd-f-005',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The base of a solid is the disk $x^2 + y^2 \\le 1$. Cross-sections perpendicular to the x-axis are squares with one side in the base. What is the area $A(x)$ of the cross-section at $x$?' },
    options: [
      { latex: 'A(x) = 4(1 - x^2)', expr: '4*(1 - x^2)' },
      { latex: 'A(x) = 1 - x^2', expr: '1 - x^2', mistake: 'coefficient-mishandled', why: 'The side is the whole chord from $y = -\\sqrt{1-x^2}$ to $y = \\sqrt{1-x^2}$; using the half-chord $\\sqrt{1-x^2}$ loses a factor 4.' },
      { latex: 'A(x) = 2(1 - x^2)', expr: '2*(1 - x^2)', mistake: 'algebra-error', why: '$\\left(2\\sqrt{1-x^2}\\right)^2 = 4(1 - x^2)$; the factor 2 was not squared.' },
      { latex: 'A(x) = 2\\sqrt{1 - x^2}', expr: '2*sqrt(1 - x^2)', mistake: 'cross-section-area-wrong', why: 'That is the side length; the area of a square is side squared.' },
      { latex: 'A(x) = \\pi(1 - x^2)', expr: 'pi*(1 - x^2)', mistake: 'formula-swapped', why: '$\\pi(1 - x^2)$ is a disk of radius $\\sqrt{1-x^2}$ (a slice of a sphere), not a square.' },
    ],
    correct: 0,
    explanation: 'At $x$ the base runs from $y = -\\sqrt{1-x^2}$ to $y = \\sqrt{1-x^2}$, so the side is $2\\sqrt{1-x^2}$ and $A(x) = 4(1 - x^2)$.',
    domain: [-0.9, 0.9],
    check: { kind: 'value', expected: '(2*sqrt(1 - x^2))^2' },
    difficulty: 1,
  },
  {
    id: 'vd-f-006',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The washer area is $\\pi(R^2 - r^2)$, not $\\pi(R - r)^2$. Which reason is correct?' },
    options: [
      { text: 'A washer is a disk of radius $R$ with a disk of radius $r$ removed, so its area is $\\pi R^2 - \\pi r^2$.' },
      { text: 'A washer is a ring of width $R - r$, so its area is $\\pi$ times the square of that width.', mistake: 'washer-difference-squared', why: '$\\pi(R - r)^2$ is the area of a disk of radius $R - r$, which is much smaller than the ring.' },
      { text: 'Only the outer edge sweeps out area, so the area is $\\pi R^2$ and the hole does not matter.', mistake: 'washer-as-disk', why: 'The hole of radius $r$ is empty space; its area $\\pi r^2$ must be removed.' },
      { text: 'The ring is $\\pi$ times its width, so its area is $\\pi(R - r)$.', mistake: 'radius-not-squared', why: 'An area needs squared lengths; $\\pi(R - r)$ has units of length, not area.' },
      { text: 'The inner disk is the larger one, so the area is $\\pi(r^2 - R^2)$.', mistake: 'radii-swapped', why: '$R$ is the outer, larger radius; $\\pi(r^2 - R^2)$ is negative.' },
      { text: 'Unrolled, the ring is a strip of length $2\\pi r$ and width $R - r$, so its area is $2\\pi r(R - r)$.', mistake: 'method-formula-swapped', why: 'That is the thin-shell approximation $2\\pi \\cdot$ radius $\\cdot$ thickness; it underestimates a ring of finite width.' },
    ],
    correct: 0,
    explanation: 'Area of the washer = (outer disk) $-$ (hole) $= \\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)$.',
    check: { kind: 'none', reason: 'conceptual; options are explanations' },
    difficulty: 1,
  },
  {
    id: 'vd-f-007',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'Which rotation produces solid disks (no hole) when the slices are taken perpendicular to the axis of rotation?' },
    options: [
      { text: 'The region between $y = x^2$ and $y = 1$, rotated about the line $y = 1$' },
      { text: 'The region between $y = x^2$ and $y = 1$, rotated about the x-axis', mistake: 'washer-as-disk', why: 'The parabola touches the x-axis only at $x = 0$; every other slice starts $x^2$ above the axis, so it has a hole.' },
      { text: 'The region under $y = x^2 + 1$ on $[0, 1]$, rotated about the line $y = -1$', mistake: 'washer-as-disk', why: 'The bottom edge $y = 0$ is 1 unit above the axis $y = -1$, so every slice has a hole of radius 1.' },
      { text: 'The region between $y = x$ and $y = x^2$, rotated about the x-axis', mistake: 'washer-as-disk', why: 'For $0 < x < 1$ the lower curve $y = x^2$ stays above the axis, leaving a hole of radius $x^2$.' },
      { text: 'The region between $y = 2x$ and $y = x^2$, rotated about the y-axis', mistake: 'washer-as-disk', why: 'Horizontal slices run from $x = \\frac{y}{2}$ to $x = \\sqrt{y}$ and never reach the y-axis, so each has a hole of radius $\\frac{y}{2}$.' },
    ],
    correct: 0,
    explanation: 'Slices are disks exactly when they reach the axis: the line $y = 1$ is the top edge of that region, so each slice has radius $1 - x^2$ and no hole.',
    check: { kind: 'none', reason: 'conceptual; options describe regions and axes' },
    difficulty: 2,
  },
  {
    id: 'vd-f-008',
    topic: 'volumes-disks',
    kind: 'formula',
    prompt: { text: 'Suppose $0 \\le f(x) \\le 5$ on $[a, b]$. The region between $y = f(x)$ and the x-axis on $[a, b]$ is rotated about the line $y = 7$. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_a^b \\left[7^2 - (7 - f(x))^2\\right]dx' },
      { latex: '\\pi\\int_a^b \\left[(7 - f(x))^2 - 7^2\\right]dx', mistake: 'radii-swapped', why: 'The x-axis edge is 7 units from the axis and the curve only $7 - f(x)$, so 7 is the outer radius.' },
      { latex: '\\pi\\int_a^b 7^2\\,dx', mistake: 'washer-as-disk', why: 'The region stops at the curve, $7 - f(x)$ below the axis, so each slice has a hole of radius $7 - f(x)$.' },
      { latex: '\\pi\\int_a^b \\left[7^2 - f(x)^2\\right]dx', mistake: 'radius-is-function-value', why: 'The inner radius is the distance from the curve to $y = 7$, which is $7 - f(x)$, not the height $f(x)$.' },
      { latex: '\\pi\\int_a^b \\left[(f(x) + 7)^2 - 7^2\\right]dx', mistake: 'axis-shift-sign', why: 'Adding 7 measures distance to $y = -7$; the curve is below $y = 7$, so its distance is $7 - f(x)$.' },
      { latex: '\\pi\\int_a^b f(x)^2\\,dx', mistake: 'axis-shift-missing', why: 'This is the disk volume for rotation about the x-axis; the axis here is $y = 7$.' },
    ],
    correct: 0,
    explanation: 'The axis is above the region: the x-axis is farthest ($R = 7$) and the curve nearest ($r = 7 - f(x)$), so $V = \\pi\\int_a^b [7^2 - (7 - f(x))^2]\\,dx$.',
    check: { kind: 'none', reason: 'general f(x); compares setups, no numeric value' },
    difficulty: 2,
  },
  {
    id: 'vd-f-009',
    topic: 'volumes-disks',
    kind: 'formula',
    prompt: { text: 'The region between $y = f(x) \\ge 0$ and the x-axis on $[a, b]$ is rotated about the line $y = -1$. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_a^b \\left[(f(x) + 1)^2 - 1^2\\right]dx' },
      { latex: '\\pi\\int_a^b \\left[(f(x) - 1)^2 - 1^2\\right]dx', mistake: 'axis-shift-sign', why: 'The distance from $y = f(x)$ down to $y = -1$ is $f(x) - (-1) = f(x) + 1$.' },
      { latex: '\\pi\\int_a^b (f(x) + 1)^2\\,dx', mistake: 'washer-as-disk', why: 'The bottom edge (the x-axis) is 1 unit above the axis, so each slice has a hole of radius 1.' },
      { latex: '\\pi\\int_a^b f(x)^2\\,dx', mistake: 'axis-shift-missing', why: 'This is the disk formula about the x-axis; about $y = -1$ both edges are 1 unit farther away.' },
      { latex: '\\pi\\int_a^b \\left[1^2 - (f(x) + 1)^2\\right]dx', mistake: 'radii-swapped', why: 'The curve is farther from $y = -1$ than the x-axis is, so $f(x) + 1$ is the outer radius.' },
    ],
    correct: 0,
    explanation: 'Measured from $y = -1$: the curve is at distance $R = f(x) + 1$ and the x-axis at $r = 1$, so each slice is a washer $\\pi[(f(x)+1)^2 - 1^2]$.',
    check: { kind: 'none', reason: 'general f(x); compares setups, no numeric value' },
    difficulty: 2,
  },
  {
    id: 'vd-f-010',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'A washer integral for a volume came out negative. Which setup error causes that?' },
    options: [
      { text: 'The inner and outer radii were swapped' },
      { text: 'The factor $\\pi$ was left out', mistake: 'pi-missing', why: 'Dropping $\\pi$ rescales the answer but cannot change its sign.' },
      { text: 'The radii were not squared, giving $\\pi(R - r)$', mistake: 'radius-not-squared', why: 'With $R \\ge r$, $\\pi(R - r)$ is still nonnegative; only $r > R$ flips the sign.' },
      { text: 'A disk was used where a washer was needed', mistake: 'washer-as-disk', why: 'Ignoring the hole makes the volume too large, never negative.' },
      { text: 'The slice area was written as $\\pi(R - r)^2$', mistake: 'washer-difference-squared', why: 'A square is never negative, so $\\pi(R - r)^2$ cannot produce a negative volume.' },
    ],
    correct: 0,
    explanation: 'Each washer area $\\pi(R^2 - r^2)$ is negative exactly when the inner radius is taken larger than the outer one.',
    check: { kind: 'none', reason: 'conceptual; options are error descriptions' },
    difficulty: 1,
  },
  {
    id: 'vd-f-011',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The base of a solid is the region between $y = x^2$ and $y = 4$. Cross-sections perpendicular to the y-axis are squares. What is the side length of the square at height $y$?' },
    options: [
      { latex: 's = 2\\sqrt{y}', expr: '2*sqrt(y)' },
      { latex: 's = \\sqrt{y}', expr: 'sqrt(y)', mistake: 'coefficient-mishandled', why: 'At height $y$ the base runs from $x = -\\sqrt{y}$ to $x = \\sqrt{y}$; $\\sqrt{y}$ is only the right half.' },
      { latex: 's = 4 - x^2', expr: '4 - x^2', mistake: 'wrong-integration-variable', why: '$4 - x^2$ is the vertical chord for slices perpendicular to the x-axis; these slices are horizontal, so the side is a width written in $y$.' },
      { latex: 's = 2y^2', expr: '2*y^2', mistake: 'inverse-function-wrong', why: 'Solving $y = x^2$ for $x$ gives $x = \\pm\\sqrt{y}$, not $y^2$.' },
      { latex: 's = 4 - y', expr: '4 - y', mistake: 'cross-section-area-wrong', why: '$4 - y$ is the vertical distance from the slice up to $y = 4$; the side of a horizontal slice is its horizontal width.' },
    ],
    correct: 0,
    explanation: 'At height $y$ the base spans $-\\sqrt{y} \\le x \\le \\sqrt{y}$, a width of $2\\sqrt{y}$.',
    variable: 'y',
    check: { kind: 'value', expected: '2*sqrt(y)' },
    difficulty: 1,
  },
  {
    id: 'vd-f-012',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The base of a solid is the region between $y = 1 - x^2$ and the x-axis. Cross-sections perpendicular to the x-axis are squares with one side in the base. Which integral gives the volume?' },
    options: [
      { latex: '\\int_{-1}^{1} (1 - x^2)^2\\,dx', expr: 'integral((1 - x^2)^2, x, -1, 1)' },
      { latex: '\\pi\\int_{-1}^{1} (1 - x^2)^2\\,dx', expr: 'integral(pi*(1 - x^2)^2, x, -1, 1)', mistake: 'cross-section-area-wrong', why: 'A square of side $s$ has area $s^2$; the $\\pi$ belongs to circular slices.' },
      { latex: '\\int_{-1}^{1} (1 - x^2)\\,dx', expr: 'integral(1 - x^2, x, -1, 1)', mistake: 'cross-section-area-wrong', why: '$1 - x^2$ is the side length; the square has area side squared.' },
      { latex: '\\int_{-1}^{1} \\left(2(1 - x^2)\\right)^2dx', expr: 'integral((2*(1 - x^2))^2, x, -1, 1)', mistake: 'coefficient-mishandled', why: 'The side runs from $y = 0$ to $y = 1 - x^2$; doubling it (as for a base symmetric about the x-axis) quadruples the area.' },
      { latex: '\\int_0^1 (1 - x^2)^2\\,dx', expr: 'integral((1 - x^2)^2, x, 0, 1)', mistake: 'missing-intersection', why: 'The base spans $-1 \\le x \\le 1$ (where $1 - x^2 = 0$); starting at 0 drops the left half.' },
      { latex: '\\int_0^1 \\left(2\\sqrt{1 - y}\\right)^2dy', expr: 'integral((2*sqrt(1 - y))^2, y, 0, 1)', mistake: 'wrong-integration-variable', why: 'This stacks squares perpendicular to the y-axis (side $2\\sqrt{1-y}$); the slices here are perpendicular to the x-axis.' },
    ],
    correct: 0,
    explanation: 'The square at $x$ has side $1 - x^2$, so $A(x) = (1 - x^2)^2$, integrated over the base $-1 \\le x \\le 1$.',
    check: { kind: 'value', expected: '16/15' },
    difficulty: 1,
  },
  {
    id: 'vd-f-013',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The base of a solid is the region between $y = x$ and $y = x^2$. Cross-sections perpendicular to the x-axis are semicircles whose diameters lie across the base. Which integral gives the volume?' },
    options: [
      { latex: '\\frac{\\pi}{8}\\int_0^1 (x - x^2)^2\\,dx', expr: 'pi/8*integral((x - x^2)^2, x, 0, 1)' },
      { latex: '\\frac{\\pi}{2}\\int_0^1 (x - x^2)^2\\,dx', expr: 'pi/2*integral((x - x^2)^2, x, 0, 1)', mistake: 'diameter-as-radius', why: '$x - x^2$ is the diameter; using it as the radius in $\\frac12\\pi r^2$ makes each slice 4 times too big.' },
      { latex: '\\frac{\\pi}{4}\\int_0^1 (x - x^2)^2\\,dx', expr: 'pi/4*integral((x - x^2)^2, x, 0, 1)', mistake: 'cross-section-area-wrong', why: '$\\pi\\left(\\frac{D}{2}\\right)^2 = \\frac{\\pi}{4}D^2$ is a full circle; a semicircle has half of that.' },
      { latex: '\\frac{\\pi}{4}\\int_0^1 (x - x^2)\\,dx', expr: 'pi/4*integral(x - x^2, x, 0, 1)', mistake: 'radius-not-squared', why: '$\\frac12\\pi r$ with $r = \\frac{x - x^2}{2}$ leaves the radius unsquared.' },
      { latex: '\\pi\\int_0^1 \\left[x^2 - (x^2)^2\\right]dx', expr: 'pi*integral(x^2 - (x^2)^2, x, 0, 1)', mistake: 'formula-swapped', why: 'This is the washer volume for rotating the base about the x-axis; here semicircles stand on the base instead.' },
      { latex: '\\frac{\\pi}{8}\\int_0^1 (x + x^2)^2\\,dx', expr: 'pi/8*integral((x + x^2)^2, x, 0, 1)', mistake: 'sum-instead-of-difference', why: 'The diameter is the distance between the curves, top minus bottom: $x - x^2$.' },
    ],
    correct: 0,
    explanation: 'Diameter $D = x - x^2$, radius $\\frac{D}{2}$, semicircle area $\\frac12\\pi\\left(\\frac{D}{2}\\right)^2 = \\frac{\\pi}{8}D^2$, integrated for $0 \\le x \\le 1$.',
    check: { kind: 'value', expected: 'pi/240' },
    difficulty: 2,
  },
  {
    id: 'vd-f-014',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The base of a solid is the region between $y = x^2$ and $y = 4$. Cross-sections perpendicular to the y-axis are squares. Which integral gives the volume?' },
    options: [
      { latex: '\\int_0^4 \\left(2\\sqrt{y}\\right)^2dy', expr: 'integral((2*sqrt(y))^2, y, 0, 4)' },
      { latex: '\\pi\\int_0^4 \\left(2\\sqrt{y}\\right)^2dy', expr: 'pi*integral((2*sqrt(y))^2, y, 0, 4)', mistake: 'cross-section-area-wrong', why: 'A square slice has area side squared; the $\\pi$ belongs to circular slices.' },
      { latex: '\\int_0^2 \\left(2\\sqrt{y}\\right)^2dy', expr: 'integral((2*sqrt(y))^2, y, 0, 2)', mistake: 'bounds-wrong-axis', why: '0 to 2 is the x-range of the base; the horizontal slices run over the heights 0 to 4.' },
      { latex: '\\int_{-2}^{2} (4 - x^2)^2\\,dx', expr: 'integral((4 - x^2)^2, x, -2, 2)', mistake: 'wrong-integration-variable', why: 'These are squares perpendicular to the x-axis (side $4 - x^2$); the slices here are perpendicular to the y-axis.' },
      { latex: '\\int_0^4 2\\sqrt{y}\\,dy', expr: 'integral(2*sqrt(y), y, 0, 4)', mistake: 'cross-section-area-wrong', why: '$2\\sqrt{y}$ is the side; the square has area $(2\\sqrt{y})^2 = 4y$.' },
      { latex: '\\pi\\int_0^4 \\left(\\sqrt{y}\\right)^2dy', expr: 'pi*integral((sqrt(y))^2, y, 0, 4)', mistake: 'formula-swapped', why: 'This is the disk volume for rotating the region about the y-axis; squares standing on the base have area side squared, with no $\\pi$.' },
    ],
    correct: 0,
    explanation: 'At height $y$ the square has side $2\\sqrt{y}$ and area $4y$; heights run from $y = 0$ to $y = 4$.',
    check: { kind: 'value', expected: '32' },
    difficulty: 2,
  },

  // ───────────── outer and inner radii ─────────────
  {
    id: 'vd-f-015',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = x$ and $y = x^2$ is rotated about the x-axis. For the slice perpendicular to the x-axis at $x$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = x,\\ r = x^2', expr: '[x, x^2]' },
      { latex: 'R = x^2,\\ r = x', expr: '[x^2, x]', mistake: 'radii-swapped', why: 'On $0 < x < 1$, $x^2 < x$, so the parabola is nearer the axis and gives the inner radius.' },
      { latex: 'R = x,\\ r = 0', expr: '[x, 0]', mistake: 'washer-as-disk', why: 'Below the region there is a gap down to the x-axis, so each slice has a hole of radius $x^2$.' },
      { latex: 'R = x - x^2,\\ r = 0', expr: '[x - x^2, 0]', mistake: 'washer-difference-squared', why: '$x - x^2$ is the length of the slice, not a radius; using it as one radius computes $\\pi(R - r)^2$.' },
      { latex: 'R = \\sqrt{y},\\ r = y', expr: '[sqrt(y), y]', mistake: 'wrong-integration-variable', why: 'These are the horizontal distances $x = \\sqrt{y}$ and $x = y$ used for rotation about the y-axis; vertical slices need vertical distances in $x$.' },
    ],
    correct: 0,
    explanation: 'The vertical slice runs from $y = x^2$ (nearer the axis) to $y = x$ (farther), so $R = x$ and $r = x^2$.',
    check: { kind: 'value', expected: '[x, x^2]' },
    difficulty: 1,
  },
  {
    id: 'vd-f-016',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = x$ and $y = x^2$ is rotated about the line $y = 2$. For the slice perpendicular to the x-axis at $x$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 2 - x^2,\\ r = 2 - x', expr: '[2 - x^2, 2 - x]' },
      { latex: 'R = 2 - x,\\ r = 2 - x^2', expr: '[2 - x, 2 - x^2]', mistake: 'radii-swapped', why: 'The axis $y = 2$ is above the region, so the lower curve $y = x^2$ is the farther one and gives $R$.' },
      { latex: 'R = x,\\ r = x^2', expr: '[x, x^2]', mistake: 'axis-shift-missing', why: 'These are distances to the x-axis; distances to $y = 2$ are $2 - x^2$ and $2 - x$.' },
      { latex: 'R = x + 2,\\ r = x^2 + 2', expr: '[x + 2, x^2 + 2]', mistake: 'axis-shift-sign', why: 'Adding 2 measures distance to $y = -2$; for the line $y = 2$ above the region the distance is $2 - y$.' },
      { latex: 'R = x - 2,\\ r = x^2 - 2', expr: '[x - 2, x^2 - 2]', mistake: 'axis-shift-sign', why: '$y - 2$ is negative below the axis; a distance down from $y = 2$ is $2 - y$.' },
      { latex: 'R = 2 - x^2,\\ r = 0', expr: '[2 - x^2, 0]', mistake: 'washer-as-disk', why: 'The upper curve $y = x$ stays below $y = 2$, leaving a gap: the inner radius is $2 - x$.' },
    ],
    correct: 0,
    explanation: 'Distances to $y = 2$ are $2 - y$: the lower curve is farther ($R = 2 - x^2$), the upper curve nearer ($r = 2 - x$).',
    check: { kind: 'value', expected: '[2 - x^2, 2 - x]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-017',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = x^2$ and $y = 4$ is rotated about the x-axis. For the slice perpendicular to the x-axis at $x$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 4,\\ r = x^2', expr: '[4, x^2]' },
      { latex: 'R = 4 - x^2,\\ r = 0', expr: '[4 - x^2, 0]', mistake: 'washer-difference-squared', why: '$4 - x^2$ is the slice length; as a single radius it computes $\\pi(R - r)^2$, not $\\pi(R^2 - r^2)$.' },
      { latex: 'R = 4,\\ r = 0', expr: '[4, 0]', mistake: 'washer-as-disk', why: 'The parabola sits above the x-axis except at $x = 0$, leaving a hole of radius $x^2$.' },
      { latex: 'R = 2,\\ r = \\sqrt{y}', expr: '[2, sqrt(y)]', mistake: 'wrong-integration-variable', why: '2 and $\\sqrt{y}$ are horizontal distances from horizontal slices; slices perpendicular to the x-axis are vertical, with heights 4 and $x^2$.' },
      { latex: 'R = \\sqrt{y},\\ r = 0', expr: '[sqrt(y), 0]', mistake: 'not-in-terms-of-variable', why: '$\\sqrt{y}$ is the parabola solved for $x$, a horizontal position; the radii of a vertical slice are the heights 4 and $x^2$.' },
    ],
    correct: 0,
    explanation: 'Each vertical slice runs from $y = x^2$ up to $y = 4$, so $R = 4$ and $r = x^2$.',
    check: { kind: 'value', expected: '[4, x^2]' },
    difficulty: 1,
  },
  {
    id: 'vd-f-018',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = x^2$ and $y = 4$ is rotated about the line $y = 4$. For the slice perpendicular to the x-axis at $x$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 4 - x^2,\\ r = 0', expr: '[4 - x^2, 0]' },
      { latex: 'R = 4,\\ r = x^2', expr: '[4, x^2]', mistake: 'axis-shift-missing', why: 'Those are distances to the x-axis; the axis here is $y = 4$, the top edge of the region.' },
      { latex: 'R = 4,\\ r = 4 - x^2', expr: '[4, 4 - x^2]', mistake: 'disk-as-washer', why: 'The x-axis is not an edge of this region: each slice runs from the parabola up to the axis itself, so there is no hole.' },
      { latex: 'R = x^2 - 4,\\ r = 0', expr: '[x^2 - 4, 0]', mistake: 'axis-shift-sign', why: 'The region lies below $y = 4$, so the distance is $4 - x^2$; $x^2 - 4$ is negative.' },
      { latex: 'R = 4 - x^2,\\ r = 4', expr: '[4 - x^2, 4]', mistake: 'disk-as-washer', why: 'The line $y = 4$ is the axis itself, so its distance to the axis is 0: there is no hole.' },
    ],
    correct: 0,
    explanation: 'The axis is the top edge of the region, so each slice is a disk reaching from $y = 4$ down to the parabola: $R = 4 - x^2$, $r = 0$.',
    check: { kind: 'value', expected: '[4 - x^2, 0]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-019',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = x^2$ and $y = 4$ is rotated about the line $y = -1$. For the slice perpendicular to the x-axis at $x$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 5,\\ r = x^2 + 1', expr: '[5, x^2 + 1]' },
      { latex: 'R = 4,\\ r = x^2', expr: '[4, x^2]', mistake: 'axis-shift-missing', why: 'Measured from the x-axis; from $y = -1$ every distance grows by 1.' },
      { latex: 'R = 3,\\ r = x^2 - 1', expr: '[3, x^2 - 1]', mistake: 'axis-shift-sign', why: 'The distance from height $y$ down to $y = -1$ is $y + 1$, not $y - 1$.' },
      { latex: 'R = 5,\\ r = x^2', expr: '[5, x^2]', mistake: 'axis-shift-missing', why: 'Only the outer edge was measured from $y = -1$; the parabola is also 1 unit farther from that axis, so $r = x^2 + 1$.' },
      { latex: 'R = 4,\\ r = x^2 + 1', expr: '[4, x^2 + 1]', mistake: 'axis-shift-missing', why: 'Only the inner edge was measured from $y = -1$; the line $y = 4$ is $4 + 1 = 5$ units from the axis.' },
      { latex: 'R = 4 - x^2,\\ r = 0', expr: '[4 - x^2, 0]', mistake: 'washer-difference-squared', why: '$4 - x^2 = 5 - (x^2 + 1)$ is the slice length; using it as one radius computes $\\pi(R - r)^2$.' },
    ],
    correct: 0,
    explanation: 'Distances to $y = -1$ are $y + 1$: the line $y = 4$ gives $R = 5$ and the parabola gives $r = x^2 + 1$.',
    check: { kind: 'value', expected: '[5, x^2 + 1]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-020',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 2$ is rotated about the y-axis. For the slice perpendicular to the y-axis at height $y$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 2,\\ r = \\sqrt{y}', expr: '[2, sqrt(y)]' },
      { latex: 'R = \\sqrt{y},\\ r = 2', expr: '[sqrt(y), 2]', mistake: 'radii-swapped', why: 'The line $x = 2$ is farther from the y-axis than the parabola, so it gives $R$.' },
      { latex: 'R = 2,\\ r = 0', expr: '[2, 0]', mistake: 'washer-as-disk', why: 'At height $y$ the region starts at $x = \\sqrt{y}$, not at the axis, so there is a hole of radius $\\sqrt{y}$.' },
      { latex: 'R = 2,\\ r = y^2', expr: '[2, y^2]', mistake: 'inverse-function-wrong', why: 'Solving $y = x^2$ for $x$ gives $x = \\sqrt{y}$, not $y^2$.' },
      { latex: 'R = 2,\\ r = x^2', expr: '[2, x^2]', mistake: 'not-in-terms-of-variable', why: 'Horizontal slices need radii written in $y$; $x^2$ is the height of the curve, not its horizontal distance from the axis.' },
    ],
    correct: 0,
    explanation: 'At height $y$ the slice runs from the parabola $x = \\sqrt{y}$ (near the axis) to the line $x = 2$ (far): $R = 2$, $r = \\sqrt{y}$.',
    variable: 'y',
    check: { kind: 'value', expected: '[2, sqrt(y)]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-021',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = e^{x}$, $y = 1$, and $x = 1$ is rotated about the y-axis. For the slice perpendicular to the y-axis at height $y$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 1,\\ r = \\ln y', expr: '[1, log(y)]' },
      { latex: 'R = \\ln y,\\ r = 1', expr: '[log(y), 1]', mistake: 'radii-swapped', why: 'For $1 < y < e$, $\\ln y < 1$: the curve is nearer the y-axis, so it gives the inner radius.' },
      { latex: 'R = 1,\\ r = 0', expr: '[1, 0]', mistake: 'washer-as-disk', why: 'At height $y$ the region starts at $x = \\ln y$, not at the axis, so each slice has a hole of radius $\\ln y$.' },
      { latex: 'R = 1,\\ r = e^{y}', expr: '[1, exp(y)]', mistake: 'inverse-function-wrong', why: 'Solving $y = e^x$ for $x$ gives $x = \\ln y$; $e^y$ is not the inverse.' },
      { latex: 'R = 1,\\ r = e^{x}', expr: '[1, exp(x)]', mistake: 'not-in-terms-of-variable', why: 'Horizontal slices need radii in $y$; $e^x$ is the height of the curve, not its distance from the y-axis.' },
      { latex: 'R = 1 - \\ln y,\\ r = 0', expr: '[1 - log(y), 0]', mistake: 'washer-difference-squared', why: '$1 - \\ln y$ is the slice length; using it as one radius computes $\\pi(R - r)^2$.' },
    ],
    correct: 0,
    explanation: 'At height $y$ the slice runs from the curve $x = \\ln y$ (near the axis) to the line $x = 1$ (far): $R = 1$, $r = \\ln y$.',
    variable: 'y',
    domain: [1, 2.7],
    check: { kind: 'value', expected: '[1, log(y)]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-022',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = \\frac{1}{x}$, $y = 0$, $x = 1$, and $x = 3$ is rotated about the line $y = -1$. For the slice perpendicular to the x-axis at $x$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = \\frac{1}{x} + 1,\\ r = 1', expr: '[1/x + 1, 1]' },
      { latex: 'R = \\frac{1}{x},\\ r = 0', expr: '[1/x, 0]', mistake: 'axis-shift-missing', why: 'These are the radii for the x-axis; from $y = -1$ every distance grows by 1, and the x-axis edge becomes a hole of radius 1.' },
      { latex: 'R = \\frac{1}{x} + 1,\\ r = 0', expr: '[1/x + 1, 0]', mistake: 'washer-as-disk', why: 'The bottom edge $y = 0$ is 1 unit above the axis, so each slice has a hole of radius 1.' },
      { latex: 'R = \\frac{1}{x} - 1,\\ r = 1', expr: '[1/x - 1, 1]', mistake: 'axis-shift-sign', why: 'The distance from height $y$ down to $y = -1$ is $y + 1$, not $y - 1$.' },
      { latex: 'R = 1,\\ r = \\frac{1}{x} + 1', expr: '[1, 1/x + 1]', mistake: 'radii-swapped', why: 'The curve is farther from $y = -1$ than the x-axis, so $\\frac{1}{x} + 1$ is the outer radius.' },
      { latex: 'R = \\frac{1}{x},\\ r = 1', expr: '[1/x, 1]', mistake: 'axis-shift-missing', why: 'The hole was measured from $y = -1$ but the curve was not: its distance to the axis is $\\frac{1}{x} + 1$.' },
    ],
    correct: 0,
    explanation: 'Distances to $y = -1$ are $y + 1$: the curve gives $R = \\frac{1}{x} + 1$ and the x-axis gives $r = 0 + 1 = 1$.',
    domain: [1, 3],
    check: { kind: 'value', expected: '[1/x + 1, 1]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-023',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = x^3$, $y = 8$, and the y-axis is rotated about the line $x = 2$. For the slice perpendicular to the y-axis at height $y$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 2,\\ r = 2 - \\sqrt[3]{y}', expr: '[2, 2 - nthRoot(y, 3)]' },
      { latex: 'R = 2 - \\sqrt[3]{y},\\ r = 2', expr: '[2 - nthRoot(y, 3), 2]', mistake: 'radii-swapped', why: 'The y-axis edge $x = 0$ is farthest from $x = 2$, so $R = 2$; the curve is the near edge.' },
      { latex: 'R = \\sqrt[3]{y},\\ r = 0', expr: '[nthRoot(y, 3), 0]', mistake: 'axis-shift-missing', why: 'That is the disk radius for rotation about the y-axis; distances to $x = 2$ are $2 - x$.' },
      { latex: 'R = 2,\\ r = \\sqrt[3]{y} - 2', expr: '[2, nthRoot(y, 3) - 2]', mistake: 'axis-shift-sign', why: 'The region lies left of $x = 2$, so the distance is $2 - x$, not $x - 2$.' },
      { latex: 'R = 2,\\ r = 2 - y^3', expr: '[2, 2 - y^3]', mistake: 'inverse-function-wrong', why: 'Solving $y = x^3$ for $x$ gives $x = \\sqrt[3]{y}$, not $y^3$.' },
    ],
    correct: 0,
    explanation: 'At height $y$ the slice runs from $x = 0$ to $x = \\sqrt[3]{y}$; distances to $x = 2$ are $2 - x$, so $R = 2$ and $r = 2 - \\sqrt[3]{y}$.',
    variable: 'y',
    check: { kind: 'value', expected: '[2, 2 - nthRoot(y, 3)]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-024',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = \\sqrt{x}$ and $y = x$ is rotated about the line $x = -1$. For the slice perpendicular to the y-axis at height $y$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = y + 1,\\ r = y^2 + 1', expr: '[y + 1, y^2 + 1]' },
      { latex: 'R = y^2 + 1,\\ r = y + 1', expr: '[y^2 + 1, y + 1]', mistake: 'radii-swapped', why: 'For $0 < y < 1$, $y^2 < y$, so $x = y^2$ is nearer the axis $x = -1$ and gives the inner radius.' },
      { latex: 'R = y,\\ r = y^2', expr: '[y, y^2]', mistake: 'axis-shift-missing', why: 'Those are distances to the y-axis; from $x = -1$ every distance grows by 1.' },
      { latex: 'R = y - 1,\\ r = y^2 - 1', expr: '[y - 1, y^2 - 1]', mistake: 'axis-shift-sign', why: 'The distance from $x$ to the line $x = -1$ is $x - (-1) = x + 1$.' },
      { latex: 'R = \\sqrt{x} + 1,\\ r = x + 1', expr: '[sqrt(x) + 1, x + 1]', mistake: 'not-in-terms-of-variable', why: 'For a vertical axis the slices are horizontal, so the radii must be written in $y$ (the curves are $x = y$ and $x = y^2$).' },
      { latex: 'R = y + 1,\\ r = 0', expr: '[y + 1, 0]', mistake: 'washer-as-disk', why: 'The region never reaches $x = -1$; the gap makes a hole of radius $y^2 + 1$.' },
    ],
    correct: 0,
    explanation: 'At height $y$ the slice runs from $x = y^2$ to $x = y$; distances to $x = -1$ are $x + 1$, so $R = y + 1$ and $r = y^2 + 1$.',
    variable: 'y',
    check: { kind: 'value', expected: '[y + 1, y^2 + 1]' },
    difficulty: 2,
  },
  {
    id: 'vd-f-025',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 2$ is rotated about the line $x = 2$. For the slice perpendicular to the y-axis at height $y$, what are the outer and inner radii?' },
    options: [
      { latex: 'R = 2 - \\sqrt{y},\\ r = 0', expr: '[2 - sqrt(y), 0]' },
      { latex: 'R = 2,\\ r = \\sqrt{y}', expr: '[2, sqrt(y)]', mistake: 'axis-shift-missing', why: 'Those are the radii about the y-axis; here the axis $x = 2$ is the right edge of the region.' },
      { latex: 'R = 2,\\ r = 2 - \\sqrt{y}', expr: '[2, 2 - sqrt(y)]', mistake: 'disk-as-washer', why: 'The y-axis is not an edge of this region; each slice runs from the parabola to the axis $x = 2$ itself, so there is no hole.' },
      { latex: 'R = \\sqrt{y} - 2,\\ r = 0', expr: '[sqrt(y) - 2, 0]', mistake: 'axis-shift-sign', why: 'The region lies left of $x = 2$, so the distance is $2 - \\sqrt{y}$; $\\sqrt{y} - 2$ is negative.' },
      { latex: 'R = 2,\\ r = y^2', expr: '[2, y^2]', mistake: 'inverse-function-wrong', why: 'Solving $y = x^2$ gives $x = \\sqrt{y}$, not $y^2$; and with the axis on the edge of the region there is no hole to subtract.' },
      { latex: 'R = 2 - \\sqrt{y},\\ r = 2', expr: '[2 - sqrt(y), 2]', mistake: 'disk-as-washer', why: 'The line $x = 2$ is the axis itself, so its distance to the axis is 0: there is no hole.' },
    ],
    correct: 0,
    explanation: 'The axis $x = 2$ is the right edge of the region, so each horizontal slice is a disk from $x = 2$ to the parabola $x = \\sqrt{y}$: $R = 2 - \\sqrt{y}$.',
    variable: 'y',
    check: { kind: 'value', expected: '[2 - sqrt(y), 0]' },
    difficulty: 2,
  },

  // ───────────── which integral gives the volume ─────────────
  {
    id: 'vd-f-026',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = 2x - x^2$ and the x-axis is rotated about the x-axis. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_0^2 (2x - x^2)^2\\,dx', expr: 'integral(pi*(2*x - x^2)^2, x, 0, 2)' },
      { latex: '\\pi\\int_0^2 (2x - x^2)\\,dx', expr: 'integral(pi*(2*x - x^2), x, 0, 2)', mistake: 'radius-not-squared', why: 'A disk has area $\\pi R^2$; the radius $2x - x^2$ was not squared.' },
      { latex: '\\pi\\int_0^2 (2x + x^2)^2\\,dx', expr: 'integral(pi*(2*x + x^2)^2, x, 0, 2)', mistake: 'sign-error', why: 'The curve is $y = 2x - x^2$; the radius $2x + x^2$ has the wrong sign on $x^2$.' },
      { latex: '\\pi\\int_0^2 (4x^2 - x^4)\\,dx', expr: 'integral(pi*(4*x^2 - x^4), x, 0, 2)', mistake: 'algebra-error', why: '$(2x - x^2)^2$ was squared term by term; the cross term $-4x^3$ is missing.' },
      { latex: '\\pi\\int_0^1 (2x - x^2)^2\\,dx', expr: 'integral(pi*(2*x - x^2)^2, x, 0, 1)', mistake: 'bounds-wrong-axis', why: '0 to 1 is the height range of the region; $x$ runs between the roots $x = 0$ and $x = 2$.' },
      { latex: '2\\pi\\int_0^2 x(2x - x^2)\\,dx', expr: 'integral(2*pi*x*(2*x - x^2), x, 0, 2)', mistake: 'method-formula-swapped', why: '$2\\pi x \\cdot$ height is the shell formula for rotation about the y-axis; about the x-axis vertical slices make disks.' },
    ],
    correct: 0,
    explanation: 'Vertical slices reach from the x-axis to the curve, so they are disks of radius $2x - x^2$ for $0 \\le x \\le 2$.',
    check: { kind: 'value', expected: '16*pi/15' },
    difficulty: 1,
  },
  {
    id: 'vd-f-027',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $y = 2x$ and $y = x^2$ is rotated about the x-axis. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_0^2 \\left[(2x)^2 - (x^2)^2\\right]dx', expr: 'integral(pi*((2*x)^2 - (x^2)^2), x, 0, 2)' },
      { latex: '\\pi\\int_0^2 (2x - x^2)^2\\,dx', expr: 'integral(pi*(2*x - x^2)^2, x, 0, 2)', mistake: 'washer-difference-squared', why: 'The washer area is $\\pi(R^2 - r^2)$; squaring the difference $R - r$ computes a smaller disk.' },
      { latex: '\\pi\\int_0^2 \\left[(x^2)^2 - (2x)^2\\right]dx', expr: 'integral(pi*((x^2)^2 - (2*x)^2), x, 0, 2)', mistake: 'radii-swapped', why: 'On $0 < x < 2$ the line $y = 2x$ is above the parabola, so it is the outer radius; this integral is negative.' },
      { latex: '\\pi\\int_0^2 (2x)^2\\,dx', expr: 'integral(pi*(2*x)^2, x, 0, 2)', mistake: 'washer-as-disk', why: 'The parabola leaves a gap above the x-axis, so each slice has a hole of radius $x^2$.' },
      { latex: '\\pi\\int_0^2 (2x - x^2)\\,dx', expr: 'integral(pi*(2*x - x^2), x, 0, 2)', mistake: 'radius-not-squared', why: 'This is $\\pi(R - r)$: the radii were subtracted but never squared.' },
      { latex: '\\pi\\int_0^4 \\left[(\\sqrt{y})^2 - \\left(\\frac{y}{2}\\right)^2\\right]dy', expr: 'integral(pi*((sqrt(y))^2 - (y/2)^2), y, 0, 4)', mistake: 'wrong-integration-variable', why: 'Horizontal washers with radii $\\sqrt{y}$ and $\\frac{y}{2}$ build the solid about the y-axis; about the x-axis the slices are vertical.' },
    ],
    correct: 0,
    explanation: 'Vertical washers: $R = 2x$ (line), $r = x^2$ (parabola), for $0 \\le x \\le 2$.',
    check: { kind: 'value', expected: '64*pi/15' },
    difficulty: 1,
  },
  {
    id: 'vd-f-028',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 1$ is rotated about the line $y = -2$. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_0^1 \\left[(x^2 + 2)^2 - 2^2\\right]dx', expr: 'integral(pi*((x^2 + 2)^2 - 2^2), x, 0, 1)' },
      { latex: '\\pi\\int_0^1 (x^2 + 2)^2\\,dx', expr: 'integral(pi*(x^2 + 2)^2, x, 0, 1)', mistake: 'washer-as-disk', why: 'The bottom edge $y = 0$ is 2 units above the axis, leaving a hole of radius 2.' },
      { latex: '\\pi\\int_0^1 (x^2)^2\\,dx', expr: 'integral(pi*(x^2)^2, x, 0, 1)', mistake: 'axis-shift-missing', why: 'This is the disk volume about the x-axis; about $y = -2$ both edges are 2 units farther away.' },
      { latex: '\\pi\\int_0^1 \\left[(x^2 - 2)^2 - 2^2\\right]dx', expr: 'integral(pi*((x^2 - 2)^2 - 2^2), x, 0, 1)', mistake: 'axis-shift-sign', why: 'The distance from $y = x^2$ down to $y = -2$ is $x^2 + 2$, not $x^2 - 2$.' },
      { latex: '\\pi\\int_0^1 \\left[2^2 - (x^2 + 2)^2\\right]dx', expr: 'integral(pi*(2^2 - (x^2 + 2)^2), x, 0, 1)', mistake: 'radii-swapped', why: 'The curve is farther from $y = -2$ than the x-axis, so $x^2 + 2$ is the outer radius.' },
      { latex: '\\pi\\int_0^1 \\left[(x^2 + 2)^2 - 2\\right]dx', expr: 'integral(pi*((x^2 + 2)^2 - 2), x, 0, 1)', mistake: 'radius-not-squared', why: 'The inner radius 2 must be squared too: $r^2 = 4$.' },
    ],
    correct: 0,
    explanation: 'Distances to $y = -2$: the curve gives $R = x^2 + 2$ and the x-axis gives $r = 2$.',
    check: { kind: 'value', expected: '23*pi/15' },
    difficulty: 2,
  },
  {
    id: 'vd-f-029',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The first-quadrant region bounded by $y = 4 - x^2$ and the coordinate axes is rotated about the y-axis. Using disks, which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_0^4 \\left(\\sqrt{4 - y}\\right)^2dy', expr: 'integral(pi*(sqrt(4 - y))^2, y, 0, 4)' },
      { latex: '\\pi\\int_0^2 (4 - x^2)^2\\,dx', expr: 'integral(pi*(4 - x^2)^2, x, 0, 2)', mistake: 'wrong-integration-variable', why: 'Vertical disks of radius $4 - x^2$ build the solid about the x-axis; about the y-axis the disks are horizontal, in $y$.' },
      { latex: '\\pi\\int_0^4 (4 - y)^2\\,dy', expr: 'integral(pi*(4 - y)^2, y, 0, 4)', mistake: 'inverse-function-wrong', why: 'Solving $y = 4 - x^2$ for $x$ gives $x = \\sqrt{4 - y}$; $4 - y$ equals $x^2$, not $x$.' },
      { latex: '\\pi\\int_0^4 \\sqrt{4 - y}\\,dy', expr: 'integral(pi*sqrt(4 - y), y, 0, 4)', mistake: 'radius-not-squared', why: 'The radius $\\sqrt{4 - y}$ must be squared.' },
      { latex: '\\pi\\int_0^2 \\left(\\sqrt{4 - y}\\right)^2dy', expr: 'integral(pi*(sqrt(4 - y))^2, y, 0, 2)', mistake: 'bounds-wrong-axis', why: '0 to 2 is the x-range; horizontal slices run over the heights 0 to 4.' },
      { latex: '\\pi\\int_0^4 \\left(2 - \\sqrt{y}\\right)^2dy', expr: 'integral(pi*(2 - sqrt(y))^2, y, 0, 4)', mistake: 'sqrt-of-sum-split', why: '$\\sqrt{4 - y}$ is not $2 - \\sqrt{y}$; a root does not split over a difference.' },
    ],
    correct: 0,
    explanation: 'At height $y$ the disk reaches from the y-axis to $x = \\sqrt{4 - y}$, for $0 \\le y \\le 4$.',
    check: { kind: 'value', expected: '8*pi' },
    difficulty: 1,
  },
  {
    id: 'vd-f-030',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = \\sqrt{x}$, $y = 1$, and the y-axis is rotated about the line $y = 1$. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_0^1 \\left(1 - \\sqrt{x}\\right)^2dx', expr: 'integral(pi*(1 - sqrt(x))^2, x, 0, 1)' },
      { latex: '\\pi\\int_0^1 \\left[1^2 - (\\sqrt{x})^2\\right]dx', expr: 'integral(pi*(1^2 - (sqrt(x))^2), x, 0, 1)', mistake: 'axis-shift-missing', why: 'These radii are measured from the x-axis; about $y = 1$ the top edge lies on the axis, so the slice is a disk of radius $1 - \\sqrt{x}$.' },
      { latex: '\\pi\\int_0^1 \\left(1 + \\sqrt{x}\\right)^2dx', expr: 'integral(pi*(1 + sqrt(x))^2, x, 0, 1)', mistake: 'axis-shift-sign', why: 'The curve lies below $y = 1$, so its distance to the axis is $1 - \\sqrt{x}$.' },
      { latex: '\\pi\\int_0^1 \\left(1 - \\sqrt{x}\\right)dx', expr: 'integral(pi*(1 - sqrt(x)), x, 0, 1)', mistake: 'radius-not-squared', why: 'The radius $1 - \\sqrt{x}$ must be squared.' },
      { latex: '\\pi\\int_0^1 \\left(1 - y^2\\right)^2dy', expr: 'integral(pi*(1 - y^2)^2, y, 0, 1)', mistake: 'wrong-integration-variable', why: 'Slices perpendicular to the horizontal axis $y = 1$ are vertical, so the integral is in $x$.' },
    ],
    correct: 0,
    explanation: 'The axis $y = 1$ is the top edge of the region, so vertical slices are disks of radius $1 - \\sqrt{x}$ for $0 \\le x \\le 1$.',
    check: { kind: 'value', expected: 'pi/6' },
    difficulty: 2,
  },
  {
    id: 'vd-f-031',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = x^2 + 1$, $y = 0$, $x = 0$, and $x = 1$ is rotated about the y-axis. Using slices perpendicular to the y-axis, which expression gives the volume?' },
    options: [
      { latex: '\\pi\\int_0^1 1^2\\,dy + \\pi\\int_1^2 \\left[1^2 - \\left(\\sqrt{y - 1}\\right)^2\\right]dy', expr: 'integral(pi*1^2, y, 0, 1) + integral(pi*(1^2 - (sqrt(y - 1))^2), y, 1, 2)' },
      { latex: '\\pi\\int_1^2 \\left[1^2 - \\left(\\sqrt{y - 1}\\right)^2\\right]dy', expr: 'integral(pi*(1^2 - (sqrt(y - 1))^2), y, 1, 2)', mistake: 'volume-two-integrals-missed', why: 'For $0 \\le y \\le 1$ the slices are full disks of radius 1; that part of the solid is missing.' },
      { latex: '\\pi\\int_0^2 \\left[1^2 - (y - 1)\\right]dy', expr: 'integral(pi*(1^2 - (y - 1)), y, 0, 2)', mistake: 'volume-two-integrals-missed', why: 'The curve is a boundary only for $1 \\le y \\le 2$; below $y = 1$ there is no hole, so the region must be split at $y = 1$.' },
      { latex: '\\pi\\int_0^1 (x^2 + 1)^2\\,dx', expr: 'integral(pi*(x^2 + 1)^2, x, 0, 1)', mistake: 'wrong-integration-variable', why: 'Vertical disks of radius $x^2 + 1$ build the solid about the x-axis, not the y-axis.' },
      { latex: '\\pi\\int_0^1 1^2\\,dy + \\pi\\int_1^2 \\left(1 - \\sqrt{y - 1}\\right)^2dy', expr: 'integral(pi*1^2, y, 0, 1) + integral(pi*(1 - sqrt(y - 1))^2, y, 1, 2)', mistake: 'washer-difference-squared', why: 'The washer area is $\\pi(R^2 - r^2)$, not $\\pi(R - r)^2$.' },
      { latex: '\\pi\\int_0^1 1^2\\,dy + \\pi\\int_1^2 \\left[1^2 - \\left(\\sqrt{y} - 1\\right)^2\\right]dy', expr: 'integral(pi*1^2, y, 0, 1) + integral(pi*(1^2 - (sqrt(y) - 1)^2), y, 1, 2)', mistake: 'sqrt-of-sum-split', why: 'Solving $y = x^2 + 1$ gives $x = \\sqrt{y - 1}$; $\\sqrt{y} - 1$ splits the root over a difference.' },
    ],
    correct: 0,
    explanation: 'For $0 \\le y \\le 1$ the slice is a disk of radius 1; for $1 \\le y \\le 2$ it is a washer from $x = \\sqrt{y - 1}$ to $x = 1$, so two integrals are needed.',
    check: { kind: 'value', expected: '3*pi/2' },
    difficulty: 2,
  },
  {
    id: 'vd-f-032',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region between $x = y^2$ and $x = y + 2$ is rotated about the y-axis. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_{-1}^{2} \\left[(y + 2)^2 - (y^2)^2\\right]dy', expr: 'integral(pi*((y + 2)^2 - (y^2)^2), y, -1, 2)' },
      { latex: '\\pi\\int_{-2}^{1} \\left[(y + 2)^2 - (y^2)^2\\right]dy', expr: 'integral(pi*((y + 2)^2 - (y^2)^2), y, -2, 1)', mistake: 'algebra-error', why: '$y^2 = y + 2$ factors as $(y - 2)(y + 1) = 0$, so the curves meet at $y = -1$ and $y = 2$, not at $-2$ and 1.' },
      { latex: '\\pi\\int_{-1}^{2} (y + 2 - y^2)^2\\,dy', expr: 'integral(pi*(y + 2 - y^2)^2, y, -1, 2)', mistake: 'washer-difference-squared', why: 'The washer area is $\\pi(R^2 - r^2)$, not the squared slice length $\\pi(R - r)^2$.' },
      { latex: '\\pi\\int_0^2 (y + 2)^2\\,dy', expr: 'integral(pi*(y + 2)^2, y, 0, 2)', mistake: 'washer-as-disk', why: 'The region starts at $x = y^2$, not at the axis, so each slice has a hole of radius $y^2$; and the region reaches down to $y = -1$.' },
      { latex: '\\pi\\int_0^2 \\left[(y + 2)^2 - (y^2)^2\\right]dy', expr: 'integral(pi*((y + 2)^2 - (y^2)^2), y, 0, 2)', mistake: 'missing-intersection', why: 'The curves meet at $y = -1$ and $y = 2$; starting at 0 cuts off the part of the region below the x-axis.' },
      { latex: '\\pi\\int_{-1}^{2} \\left[(y + 2)^2 - y^2\\right]dy', expr: 'integral(pi*((y + 2)^2 - y^2), y, -1, 2)', mistake: 'radius-not-squared', why: 'The inner radius is $r = y^2$, so $r^2 = y^4$; $y^2$ is the radius itself.' },
    ],
    correct: 0,
    explanation: 'The curves meet where $y^2 = y + 2$, at $y = -1$ and $y = 2$; horizontal washers have $R = y + 2$ and $r = y^2$.',
    check: { kind: 'value', expected: '72*pi/5' },
    difficulty: 2,
  },
  {
    id: 'vd-f-033',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The region bounded by $y = x^2$, $y = 4$, and the y-axis is rotated about the line $x = -1$. Which integral gives the volume?' },
    options: [
      { latex: '\\pi\\int_0^4 \\left[\\left(\\sqrt{y} + 1\\right)^2 - 1^2\\right]dy', expr: 'integral(pi*((sqrt(y) + 1)^2 - 1^2), y, 0, 4)' },
      { latex: '\\pi\\int_0^4 \\left(\\sqrt{y}\\right)^2dy', expr: 'integral(pi*(sqrt(y))^2, y, 0, 4)', mistake: 'axis-shift-missing', why: 'This is the disk volume about the y-axis; about $x = -1$ both radii grow by 1 and the y-axis edge becomes a hole of radius 1.' },
      { latex: '\\pi\\int_0^4 \\left(\\sqrt{y} + 1\\right)^2dy', expr: 'integral(pi*(sqrt(y) + 1)^2, y, 0, 4)', mistake: 'washer-as-disk', why: 'The left edge $x = 0$ is 1 unit from the axis, leaving a hole of radius 1.' },
      { latex: '\\pi\\int_0^4 \\left[\\left(\\sqrt{y} - 1\\right)^2 - 1^2\\right]dy', expr: 'integral(pi*((sqrt(y) - 1)^2 - 1^2), y, 0, 4)', mistake: 'axis-shift-sign', why: 'The distance from $x = \\sqrt{y}$ to the line $x = -1$ is $\\sqrt{y} + 1$.' },
      { latex: '\\pi\\int_0^2 \\left[\\left(\\sqrt{y} + 1\\right)^2 - 1^2\\right]dy', expr: 'integral(pi*((sqrt(y) + 1)^2 - 1^2), y, 0, 2)', mistake: 'bounds-wrong-axis', why: '0 to 2 is the x-range; the horizontal slices run over the heights 0 to 4.' },
      { latex: '\\pi\\int_0^4 \\left[\\left(y^2 + 1\\right)^2 - 1^2\\right]dy', expr: 'integral(pi*((y^2 + 1)^2 - 1^2), y, 0, 4)', mistake: 'inverse-function-wrong', why: 'Solving $y = x^2$ for $x$ gives $x = \\sqrt{y}$, not $y^2$.' },
    ],
    correct: 0,
    explanation: 'Horizontal washers from $x = 0$ to $x = \\sqrt{y}$; distances to $x = -1$ give $R = \\sqrt{y} + 1$ and $r = 1$.',
    check: { kind: 'value', expected: '56*pi/3' },
    difficulty: 2,
  },

  // ───────────── evaluate a set-up volume integral ─────────────
  {
    id: 'vd-f-034',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'Rotating the quarter-disk under $y = \\sqrt{4 - x^2}$, $0 \\le x \\le 2$, about the x-axis gives a hemisphere. Evaluate its volume integral.', latex: '\\pi\\int_0^2 (4 - x^2)\\,dx' },
    options: [
      { latex: '\\frac{16\\pi}{3}', expr: '16*pi/3' },
      { latex: '\\frac{32\\pi}{3}', expr: '32*pi/3', mistake: 'sign-error', why: 'The antiderivative was written $4x + \\frac{x^3}{3}$; the minus sign on $x^2$ was lost.' },
      { latex: '6\\pi', expr: '6*pi', mistake: 'power-rule-int-exponent', why: '$x^2$ was integrated as $\\frac{x^2}{2}$ instead of $\\frac{x^3}{3}$, giving $8 - 2 = 6$.' },
      { latex: '\\frac{4\\pi}{3}', expr: '4*pi/3', mistake: 'power-rule-int-exponent', why: '$\\int 4\\,dx$ was taken as 4 instead of $4x$, giving $4 - \\frac83$.' },
      { latex: '8\\pi - \\frac{8}{3}', expr: '8*pi - 8/3', mistake: 'coefficient-mishandled', why: '$\\pi$ multiplies the whole bracket: $\\pi\\left(8 - \\frac83\\right)$, not $8\\pi - \\frac83$.' },
      { latex: '0', expr: '0', mistake: 'power-rule-int-coefficient', why: '$\\int x^2\\,dx = \\frac{x^3}{3}$; without the $\\frac13$ the result is $8 - 8 = 0$.' },
    ],
    correct: 0,
    explanation: '$\\pi\\left[4x - \\frac{x^3}{3}\\right]_0^2 = \\pi\\left(8 - \\frac83\\right) = \\frac{16\\pi}{3}$, half of $\\frac43\\pi \\cdot 2^3$.',
    check: { kind: 'definite-integral', integrand: 'pi*(4 - x^2)', lower: '0', upper: '2' },
    difficulty: 1,
  },
  {
    id: 'vd-f-035',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'Rotating the region under $y = 3x$ on $[0, 1]$ about the x-axis gives a cone. Evaluate its volume integral.', latex: '\\pi\\int_0^1 (3x)^2\\,dx' },
    options: [
      { latex: '3\\pi', expr: '3*pi' },
      { latex: '\\pi', expr: 'pi', mistake: 'coefficient-mishandled', why: '$(3x)^2 = 9x^2$; squaring only the $x$ gives $3x^2$ and a result of $\\pi$.' },
      { latex: '9\\pi', expr: '9*pi', mistake: 'power-rule-int-coefficient', why: '$\\int 9x^2\\,dx = 3x^3$; without dividing by 3 the result is $9\\pi$.' },
      { latex: '\\frac{9\\pi}{2}', expr: '9*pi/2', mistake: 'power-rule-int-coefficient', why: 'Dividing by the old exponent 2 instead of the new exponent 3 gives $\\frac{9x^3}{2}$.' },
      { latex: '18\\pi', expr: '18*pi', mistake: 'differentiated-instead', why: '$18x$ is the derivative of $9x^2$, not its antiderivative.' },
    ],
    correct: 0,
    explanation: '$\\pi\\int_0^1 9x^2\\,dx = \\pi\\left[3x^3\\right]_0^1 = 3\\pi$, matching $\\frac13\\pi r^2 h$ with $r = 3$, $h = 1$.',
    check: { kind: 'definite-integral', integrand: 'pi*(3*x)^2', lower: '0', upper: '1' },
    difficulty: 1,
  },
  {
    id: 'vd-f-036',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'This is the washer integral for the region between $y = e^{x}$ and $y = 1$ on $[0, 1]$, rotated about the x-axis. Evaluate it.', latex: '\\pi\\int_0^1 (e^{2x} - 1)\\,dx' },
    options: [
      { latex: '\\frac{\\pi(e^2 - 3)}{2}', expr: 'pi*(e^2 - 3)/2' },
      { latex: '\\pi(e^2 - 2)', expr: 'pi*(e^2 - 2)', mistake: 'exp-antiderivative-wrong', why: '$\\int e^{2x}\\,dx = \\frac{e^{2x}}{2}$; the $\\frac12$ was dropped.' },
      { latex: '\\pi(2e^2 - 3)', expr: 'pi*(2*e^2 - 3)', mistake: 'inner-constant-factor-missing', why: 'The antiderivative was multiplied by the inner constant 2 instead of divided by it.' },
      { latex: '\\frac{\\pi(e^2 - 2)}{2}', expr: 'pi*(e^2 - 2)/2', mistake: 'ftc-not-subtracted', why: 'Only $F(1) = \\frac{e^2}{2} - 1$ was used; $F(0) = \\frac12$ must be subtracted.' },
      { latex: '\\frac{\\pi(e^2 + 1)}{2}', expr: 'pi*(e^2 + 1)/2', mistake: 'sign-error', why: 'The $-1$ in the integrand was integrated as $+x$.' },
      { latex: '\\frac{\\pi(e^2 - 1)}{2}', expr: 'pi*(e^2 - 1)/2', mistake: 'algebra-error', why: 'Only $e^{2x}$ was integrated; the contribution $\\int_0^1 (-1)\\,dx = -1$ was left out.' },
    ],
    correct: 0,
    explanation: '$\\pi\\left[\\frac{e^{2x}}{2} - x\\right]_0^1 = \\pi\\left(\\frac{e^2}{2} - 1 - \\frac12\\right) = \\frac{\\pi(e^2 - 3)}{2}$.',
    check: { kind: 'definite-integral', integrand: 'pi*(exp(2*x) - 1)', lower: '0', upper: '1' },
    difficulty: 2,
  },
  {
    id: 'vd-f-037',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'This integral gives the volume when the region under $y = x^2$ on $[0, 1]$ is rotated about $y = -2$. Evaluate it.', latex: '\\pi\\int_0^1 \\left[(x^2 + 2)^2 - 2^2\\right]dx' },
    options: [
      { latex: '\\frac{23\\pi}{15}', expr: '23*pi/15' },
      { latex: '\\frac{\\pi}{5}', expr: 'pi/5', mistake: 'algebra-error', why: '$(x^2 + 2)^2$ was expanded as $x^4 + 4$, dropping the cross term $4x^2$.' },
      { latex: '\\frac{13\\pi}{15}', expr: '13*pi/15', mistake: 'algebra-error', why: 'The cross term of $(x^2 + 2)^2$ is $2 \\cdot x^2 \\cdot 2 = 4x^2$, not $2x^2$.' },
      { latex: '5\\pi', expr: '5*pi', mistake: 'power-rule-int-coefficient', why: '$x^4 + 4x^2$ was integrated as $x^5 + 4x^3$ without dividing by the new exponents.' },
      { latex: '\\frac{53\\pi}{15}', expr: '53*pi/15', mistake: 'radius-not-squared', why: 'The inner radius 2 was subtracted unsquared: $r^2 = 4$, not 2.' },
      { latex: '\\frac{83\\pi}{15}', expr: '83*pi/15', mistake: 'washer-as-disk', why: 'Dropping the $-2^2$ term removes the hole of radius 2 and computes a solid disk.' },
    ],
    correct: 0,
    explanation: '$(x^2 + 2)^2 - 4 = x^4 + 4x^2$, so $\\pi\\left[\\frac{x^5}{5} + \\frac{4x^3}{3}\\right]_0^1 = \\pi\\left(\\frac15 + \\frac43\\right) = \\frac{23\\pi}{15}$.',
    check: { kind: 'definite-integral', integrand: 'pi*((x^2 + 2)^2 - 2^2)', lower: '0', upper: '1' },
    difficulty: 2,
  },
  {
    id: 'vd-f-038',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'A solid has as its base the triangle with vertices $(0,0)$, $(4,0)$, $(0,4)$; cross-sections perpendicular to the x-axis are squares. Evaluate its volume integral.', latex: '\\int_0^4 (4 - x)^2\\,dx' },
    options: [
      { latex: '\\frac{64}{3}', expr: '64/3' },
      { latex: '-\\frac{64}{3}', expr: '-64/3', mistake: 'inner-constant-factor-missing', why: 'The inner function $4 - x$ has derivative $-1$, so the antiderivative is $-\\frac{(4 - x)^3}{3}$; without that minus sign the result is negative.' },
      { latex: '\\frac{128}{3}', expr: '128/3', mistake: 'algebra-error', why: '$(4 - x)^2$ was expanded as $16 - x^2$; the cross term $-8x$ is missing.' },
      { latex: '64', expr: '64', mistake: 'power-rule-int-coefficient', why: '$-(4 - x)^3$ was used without dividing by 3.' },
      { latex: '\\frac{160}{3}', expr: '160/3', mistake: 'algebra-error', why: 'The cross term of $(4 - x)^2$ is $-8x$; using $-4x$ gives $64 - 32 + \\frac{64}{3}$.' },
      { latex: '-\\frac{128}{3}', expr: '-128/3', mistake: 'power-rule-int-coefficient', why: '$\\int 8x\\,dx = 4x^2$; writing $8x^2$ gives $64 - 128 + \\frac{64}{3}$.' },
    ],
    correct: 0,
    explanation: '$\\int_0^4 (4 - x)^2\\,dx = \\left[-\\frac{(4 - x)^3}{3}\\right]_0^4 = 0 + \\frac{64}{3} = \\frac{64}{3}$.',
    check: { kind: 'definite-integral', integrand: '(4 - x)^2', lower: '0', upper: '4' },
    difficulty: 1,
  },
  {
    id: 'vd-f-039',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'This is the washer integral for the region bounded by $y = \\ln x$, $y = 0$, and $x = e$, rotated about the y-axis. Evaluate it.', latex: '\\pi\\int_0^1 (e^2 - e^{2y})\\,dy' },
    options: [
      { latex: '\\frac{\\pi(e^2 + 1)}{2}', expr: 'pi*(e^2 + 1)/2' },
      { latex: '\\pi', expr: 'pi', mistake: 'exp-antiderivative-wrong', why: '$\\int e^{2y}\\,dy = \\frac{e^{2y}}{2}$; without the $\\frac12$ the result is $e^2 - (e^2 - 1) = 1$.' },
      { latex: '\\frac{\\pi(e^2 - 1)}{2}', expr: 'pi*(e^2 - 1)/2', mistake: 'sign-error', why: '$F(0) = -\\frac12$ was subtracted as if it were $+\\frac12$.' },
      { latex: '\\frac{\\pi e^2}{2}', expr: 'pi*e^2/2', mistake: 'ftc-not-subtracted', why: 'Only $F(1) = \\frac{e^2}{2}$ was used; $F(0) = -\\frac12$ must be subtracted.' },
      { latex: '\\frac{\\pi(3e^2 - 1)}{2}', expr: 'pi*(3*e^2 - 1)/2', mistake: 'sign-error', why: 'The antiderivative of $-e^{2y}$ was written as $+\\frac{e^{2y}}{2}$.' },
      { latex: '\\pi(2 - e^2)', expr: 'pi*(2 - e^2)', mistake: 'inner-constant-factor-missing', why: 'Multiplying by the inner constant 2 instead of dividing gives $e^2 - 2(e^2 - 1)$.' },
    ],
    correct: 0,
    explanation: '$\\pi\\left[e^2 y - \\frac{e^{2y}}{2}\\right]_0^1 = \\pi\\left(\\frac{e^2}{2} + \\frac12\\right) = \\frac{\\pi(e^2 + 1)}{2}$.',
    variable: 'y',
    check: { kind: 'definite-integral', integrand: 'pi*(e^2 - exp(2*y))', lower: '0', upper: '1' },
    difficulty: 2,
  },
  {
    id: 'vd-f-040',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'Rotating the region under $y = \\frac{1}{x}$ on $[1, 3]$ about the x-axis gives this integral. Evaluate it.', latex: '\\pi\\int_1^3 \\left(\\frac{1}{x}\\right)^2dx' },
    options: [
      { latex: '\\frac{2\\pi}{3}', expr: '2*pi/3' },
      { latex: '\\pi\\ln 3', expr: 'pi*log(3)', mistake: 'ln-misapplied', why: '$\\left(\\frac1x\\right)^2 = x^{-2}$ integrates by the power rule to $-\\frac1x$; $\\ln$ is only for $x^{-1}$.' },
      { latex: '\\frac{26\\pi}{81}', expr: '26*pi/81', mistake: 'power-rule-int-exponent', why: 'The exponent was lowered to $-3$ (giving $-\\frac{x^{-3}}{3}$) instead of raised to $-1$.' },
      { latex: '\\frac{52\\pi}{27}', expr: '52*pi/27', mistake: 'differentiated-instead', why: '$-2x^{-3}$ is the derivative of $x^{-2}$, not its antiderivative.' },
      { latex: '-\\frac{\\pi}{3}', expr: '-pi/3', mistake: 'ftc-not-subtracted', why: 'Only $F(3) = -\\frac13$ was used; $F(1) = -1$ must be subtracted.' },
      { latex: '-\\frac{4\\pi}{3}', expr: '-4*pi/3', mistake: 'sign-error', why: '$-\\frac13 - (-1) = +\\frac23$; subtracting as $-\\frac13 - 1$ gives $-\\frac43$.' },
    ],
    correct: 0,
    explanation: '$\\pi\\left[-\\frac1x\\right]_1^3 = \\pi\\left(-\\frac13 + 1\\right) = \\frac{2\\pi}{3}$.',
    check: { kind: 'definite-integral', integrand: 'pi*(1/x)^2', lower: '1', upper: '3' },
    difficulty: 1,
  },
  {
    id: 'vd-f-041',
    topic: 'volumes-disks',
    kind: 'evaluate',
    prompt: { text: 'This integral gives the volume when the region bounded by $y = x^2$, $y = 4$, and the y-axis is rotated about $x = -1$. Evaluate it.', latex: '\\pi\\int_0^4 \\left[\\left(\\sqrt{y} + 1\\right)^2 - 1\\right]dy' },
    options: [
      { latex: '\\frac{56\\pi}{3}', expr: '56*pi/3' },
      { latex: '8\\pi', expr: '8*pi', mistake: 'algebra-error', why: '$(\\sqrt{y} + 1)^2$ was expanded as $y + 1$; the cross term $2\\sqrt{y}$ is missing.' },
      { latex: '32\\pi', expr: '32*pi', mistake: 'power-rule-int-coefficient', why: '$\\int \\sqrt{y}\\,dy = \\frac23 y^{3/2}$; multiplying by $\\frac32$ instead gives $8 + 24 = 32$.' },
      { latex: '\\frac{88\\pi}{3}', expr: '88*pi/3', mistake: 'arithmetic-error', why: '$4^{3/2} = 8$, not 16.' },
      { latex: '\\frac{68\\pi}{3}', expr: '68*pi/3', mistake: 'washer-as-disk', why: 'The $-1$ (the hole, $r^2 = 1$) was dropped, turning the washer into a solid disk.' },
      { latex: '-\\frac{8\\pi}{3}', expr: '-8*pi/3', mistake: 'sign-error', why: '$(\\sqrt{y} + 1)^2 - 1 = y + 2\\sqrt{y}$; writing $y - 2\\sqrt{y}$ flips the cross term.' },
    ],
    correct: 0,
    explanation: '$(\\sqrt{y} + 1)^2 - 1 = y + 2\\sqrt{y}$, so $\\pi\\left[\\frac{y^2}{2} + \\frac43 y^{3/2}\\right]_0^4 = \\pi\\left(8 + \\frac{32}{3}\\right) = \\frac{56\\pi}{3}$.',
    variable: 'y',
    check: { kind: 'definite-integral', integrand: 'pi*((sqrt(y) + 1)^2 - 1)', lower: '0', upper: '4' },
    difficulty: 2,
  },

  // ───────────── technique: disk or washer, x or y ─────────────
  {
    id: 'vd-f-042',
    topic: 'volumes-disks',
    kind: 'technique',
    prompt: { text: 'The region bounded by $y = e^{x}$, $y = 0$, $x = 0$, and $x = 1$ is rotated about the line $y = -1$. What do the slices perpendicular to the axis look like?' },
    options: [
      { text: 'Washers with outer radius $e^{x} + 1$ and a hole of radius 1' },
      { text: 'Washers with outer radius $e^{x} + 1$ and a hole of radius $e^{x}$', mistake: 'radius-is-function-value', why: 'The hole reaches from $y = -1$ to the near edge $y = 0$, so its radius is 1; $e^x$ belongs to the outer edge.' },
      { text: 'Washers with outer radius $e^{x} - 1$ and a hole of radius 1', mistake: 'axis-shift-sign', why: 'The distance from $y = e^x$ down to $y = -1$ is $e^x + 1$, not $e^x - 1$.' },
      { text: 'Washers with outer radius $e^{x}$ and a hole of radius 1', mistake: 'axis-shift-missing', why: 'The hole was measured from $y = -1$ but the curve was not: its distance to the axis is $e^x + 1$.' },
      { text: 'Disks of radius $e^{x} + 1$', mistake: 'washer-as-disk', why: 'The strip between $y = -1$ and $y = 0$ is not part of the region, so every slice has a hole of radius 1.' },
      { text: 'Disks of radius $e^{x}$', mistake: 'axis-shift-missing', why: 'That is the slice for rotation about the x-axis; the axis here is $y = -1$, one unit below the region.' },
    ],
    correct: 0,
    explanation: 'Measured from $y = -1$: the outer edge is at distance $e^x + 1$ and the inner edge $y = 0$ at distance 1, so each slice is a washer.',
    check: { kind: 'none', reason: 'technique recognition; options describe slices' },
    difficulty: 1,
  },
  {
    id: 'vd-f-043',
    topic: 'volumes-disks',
    kind: 'technique',
    prompt: { text: 'The region between $y = x^2$ and $y = 1$ is rotated about the line $y = 1$. Which description of the slices perpendicular to the axis is correct?' },
    options: [
      { text: 'Disks of radius $1 - x^2$' },
      { text: 'Washers with $R = 1$ and $r = x^2$', mistake: 'axis-shift-missing', why: 'Those radii are measured from the x-axis; from $y = 1$ the parabola is $1 - x^2$ away and the top edge lies on the axis.' },
      { text: 'Washers with $R = 1 - x^2$ and $r = 1$', mistake: 'disk-as-washer', why: 'The line $y = 1$ is the axis itself, so its distance to the axis is 0: there is no hole.' },
      { text: 'Disks of radius $1 + x^2$', mistake: 'axis-shift-sign', why: 'The parabola lies below $y = 1$, so its distance to the axis is $1 - x^2$.' },
      { text: 'Disks of radius $x^2$', mistake: 'radius-is-function-value', why: '$x^2$ is the height of the parabola above the x-axis; the radius is its distance to $y = 1$.' },
      { text: 'Disks of radius $\\sqrt{y}$ stacked along the y-axis', mistake: 'wrong-integration-variable', why: 'Slices perpendicular to the horizontal axis $y = 1$ are vertical, so they are stacked along $x$.' },
    ],
    correct: 0,
    explanation: 'Each vertical slice runs from the parabola up to the axis $y = 1$ itself, so it is a disk of radius $1 - x^2$.',
    check: { kind: 'none', reason: 'technique recognition; options describe slices' },
    difficulty: 2,
  },
  {
    id: 'vd-f-044',
    topic: 'volumes-disks',
    kind: 'technique',
    prompt: { text: 'The region between $y = x^2$ and $y = 2x$ is rotated about the y-axis. Using slices perpendicular to the axis, which setup is correct?' },
    options: [
      { text: 'Integrate in $y$ from 0 to 4 with $R = \\sqrt{y}$ and $r = \\frac{y}{2}$' },
      { text: 'Integrate in $x$ from 0 to 2 with $R = 2x$ and $r = x^2$', mistake: 'wrong-integration-variable', why: 'Those are the washers for rotation about the x-axis; slices perpendicular to the y-axis are horizontal, in $y$.' },
      { text: 'Integrate in $y$ from 0 to 2 with $R = 2y$ and $r = y^2$', mistake: 'inverse-function-wrong', why: 'Renaming $x$ as $y$ is not solving for $x$: the curves are $x = \\frac{y}{2}$ and $x = \\sqrt{y}$, and the heights run from 0 to 4.' },
      { text: 'Integrate in $y$ from 0 to 4 with $R = \\sqrt{y}$ and $r = 0$', mistake: 'washer-as-disk', why: 'At height $y$ the region starts at $x = \\frac{y}{2}$, not at the axis, so there is a hole.' },
      { text: 'Integrate in $y$ from 0 to 2 with $R = \\sqrt{y}$ and $r = \\frac{y}{2}$', mistake: 'bounds-wrong-axis', why: '0 to 2 is the x-range; the heights of the region run from $y = 0$ to $y = 4$.' },
      { text: 'Integrate in $x$ from 0 to 2 with $R = 2x$ and $r = 0$', mistake: 'wrong-integration-variable', why: 'Vertical slices belong to rotation about the x-axis (and even there the parabola leaves a hole); about the y-axis the slices are horizontal.' },
    ],
    correct: 0,
    explanation: 'Horizontal slices at height $y \\in [0, 4]$ run from $x = \\frac{y}{2}$ (line, near) to $x = \\sqrt{y}$ (parabola, far).',
    check: { kind: 'none', reason: 'technique recognition; options are setups described in words' },
    difficulty: 2,
  },
  {
    id: 'vd-f-045',
    topic: 'volumes-disks',
    kind: 'technique',
    prompt: { text: 'The first-quadrant region bounded by $y = x^2$, $y = 2 - x$, and the x-axis is rotated about the x-axis. How should the disk integral be set up?' },
    options: [
      { text: 'Two integrals in $x$, split at $x = 1$: radius $x^2$ on $[0, 1]$ and radius $2 - x$ on $[1, 2]$' },
      { text: 'One integral in $x$ over $[0, 2]$ with radius $x^2$', mistake: 'volume-two-integrals-missed', why: 'For $1 < x < 2$ the top of the region is the line $y = 2 - x$, not the parabola.' },
      { text: 'One integral in $x$ over $[0, 2]$ with $R = 2 - x$ and $r = x^2$', mistake: 'disk-as-washer', why: 'The region reaches the x-axis, so there is no hole, and its top edge switches from $x^2$ to $2 - x$ at $x = 1$.' },
      { text: 'Two integrals in $x$, split at $x = 1$: radius $2 - x$ on $[0, 1]$ and radius $x^2$ on $[1, 2]$', mistake: 'boundary-pieces-swapped', why: 'On $[0, 1]$ the parabola is the top edge ($x^2 \\le 2 - x$); on $[1, 2]$ the line is.' },
      { text: 'One integral in $y$ over $[0, 1]$ with $R = 2 - y$ and $r = \\sqrt{y}$', mistake: 'wrong-integration-variable', why: 'Horizontal slices are parallel to the x-axis; those washers describe rotation about the y-axis.' },
      { text: 'One integral in $x$ over $[0, 1]$ with radius $x^2$', mistake: 'missing-intersection', why: 'The region continues to $x = 2$, where the line meets the x-axis.' },
    ],
    correct: 0,
    explanation: 'The top boundary is $y = x^2$ until the curves meet at $x = 1$, then $y = 2 - x$ until $x = 2$, so the disk radius changes formula and the integral splits.',
    check: { kind: 'none', reason: 'technique recognition; options are setups described in words' },
    difficulty: 2,
  },
  {
    id: 'vd-f-046',
    topic: 'volumes-disks',
    kind: 'concept',
    prompt: { text: 'The base of a solid is the triangle with vertices $(0,0)$, $(2,0)$, $(0,2)$. Cross-sections perpendicular to the x-axis are equilateral triangles with one side in the base. Which integral gives the volume?' },
    options: [
      { latex: '\\frac{\\sqrt{3}}{4}\\int_0^2 (2 - x)^2\\,dx', expr: 'sqrt(3)/4*integral((2 - x)^2, x, 0, 2)' },
      { latex: '\\frac{1}{2}\\int_0^2 (2 - x)^2\\,dx', expr: 'integral((2 - x)^2, x, 0, 2)/2', mistake: 'cross-section-area-wrong', why: '$\\frac12 s^2$ takes the height of the triangle equal to its side; the height is $\\frac{\\sqrt{3}}{2}s$.' },
      { latex: '\\frac{\\sqrt{3}}{2}\\int_0^2 (2 - x)^2\\,dx', expr: 'sqrt(3)/2*integral((2 - x)^2, x, 0, 2)', mistake: 'formula-missing-factor', why: 'Area $= \\frac12 \\cdot s \\cdot \\frac{\\sqrt{3}}{2}s$; the $\\frac12$ was dropped.' },
      { latex: '\\frac{\\sqrt{3}}{4}\\int_0^2 (2 - x)\\,dx', expr: 'sqrt(3)/4*integral(2 - x, x, 0, 2)', mistake: 'formula-wrong-power', why: 'The side length $2 - x$ must be squared in the area formula.' },
      { latex: '\\int_0^2 (2 - x)^2\\,dx', expr: 'integral((2 - x)^2, x, 0, 2)', mistake: 'cross-section-area-wrong', why: '$s^2$ is the area of a square slice; an equilateral triangle has area $\\frac{\\sqrt{3}}{4}s^2$.' },
      { latex: '\\frac{\\sqrt{3}}{4}\\int_0^2 \\left(2(2 - x)\\right)^2dx', expr: 'sqrt(3)/4*integral((2*(2 - x))^2, x, 0, 2)', mistake: 'coefficient-mishandled', why: 'The side runs from $y = 0$ to $y = 2 - x$; doubling it (as for a base symmetric about the axis) quadruples the area.' },
    ],
    correct: 0,
    explanation: 'At $x$ the side is the vertical segment from $y = 0$ to $y = 2 - x$, so $A(x) = \\frac{\\sqrt{3}}{4}(2 - x)^2$ for $0 \\le x \\le 2$.',
    check: { kind: 'value', expected: '2*sqrt(3)/3' },
    difficulty: 1,
  },
];

// ───────────── generator: washer area from one slice ─────────────
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

/** A vertical slice from y = a to y = b, rotated about the horizontal line y = axis (below or above). */
interface SliceCase {
  a: number;
  b: number;
  axis: number;
}

type SliceMistake =
  | 'axis-shift-missing'
  | 'washer-difference-squared'
  | 'radius-not-squared'
  | 'axis-shift-sign'
  | 'washer-as-disk'
  | 'sign-error';

interface SliceDistractor {
  value: number;
  mistake: SliceMistake;
  why: string;
}

/** Radii, the correct area (in units of pi) and the realistic wrong areas, split into smaller/larger than correct. */
function sliceSetup(c: SliceCase) {
  const below = c.axis < 0;
  const k = Math.abs(c.axis);
  const R = below ? c.b + k : c.axis - c.a;
  const r = below ? c.a + k : c.axis - c.b;
  const far = below ? c.b : c.a;
  const near = below ? c.a : c.b;
  const axisTex = below ? `y = -${k}` : `y = ${k}`;
  const wrongSign = below ? (c.b - k) ** 2 - (c.a - k) ** 2 : (c.b + k) ** 2 - (c.a + k) ** 2;
  const pool: SliceDistractor[] = [
    { value: c.b * c.b - c.a * c.a, mistake: 'axis-shift-missing', why: `This is $\\pi(${c.b}^2 - ${c.a}^2)$: both radii were measured from the x-axis instead of from the axis $${axisTex}$.` },
    { value: R * R - near * near, mistake: 'axis-shift-missing', why: `This is $\\pi(${R}^2 - ${near}^2)$: only the outer radius was measured from $${axisTex}$; the inner edge was measured from the x-axis.` },
    { value: far * far - r * r, mistake: 'axis-shift-missing', why: `This is $\\pi(${far}^2 - ${r}^2)$: only the inner radius was measured from $${axisTex}$; the outer edge was measured from the x-axis.` },
    { value: (R - r) * (R - r), mistake: 'washer-difference-squared', why: `This is $\\pi(${R} - ${r})^2$: the difference of the radii was squared instead of subtracting the squares.` },
    { value: R - r, mistake: 'radius-not-squared', why: `This is $\\pi(${R} - ${r})$: the radii were subtracted but never squared.` },
    { value: R * R - r, mistake: 'radius-not-squared', why: `This is $\\pi(${R}^2 - ${r})$: the inner radius was not squared.` },
    {
      value: wrongSign,
      mistake: 'axis-shift-sign',
      why: below
        ? `This is $\\pi((${c.b} - ${k})^2 - (${c.a} - ${k})^2)$: subtracting ${k} measures distance to $y = ${k}$, not to $y = -${k}$.`
        : `This is $\\pi((${c.b} + ${k})^2 - (${c.a} + ${k})^2)$: adding ${k} measures distance to $y = -${k}$, not to $y = ${k}$.`,
    },
    { value: R * R, mistake: 'washer-as-disk', why: `This is $\\pi \\cdot ${R}^2$: the gap between the axis and the slice (a hole of radius ${r}) was ignored.` },
    { value: R * R + r * r, mistake: 'sign-error', why: `This is $\\pi(${R}^2 + ${r}^2)$: the area of the hole was added instead of subtracted.` },
  ];
  const correct = R * R - r * r;
  const seen = new Set<number>([correct]);
  const usable = pool.filter((d) => {
    if (d.value <= 0 || seen.has(d.value)) return false;
    seen.add(d.value);
    return true;
  });
  return {
    below,
    k,
    R,
    r,
    correct,
    axisTex,
    smaller: usable.filter((d) => d.value < correct),
    larger: usable.filter((d) => d.value > correct),
  };
}

/** Every case with at least five usable (positive, pairwise different) wrong values. */
const SLICE_CASES: SliceCase[] = (() => {
  const out: SliceCase[] = [];
  for (let a = 1; a <= 3; a++) {
    for (let b = a + 2; b <= a + 4; b++) {
      for (const axis of [-1, -2, -3, b + 1, b + 2, b + 3]) {
        if (a === 2 && b === 5 && axis === -1) continue; // same as static item vd-f-001
        const s = sliceSetup({ a, b, axis });
        if (s.smaller.length + s.larger.length >= 5) out.push({ a, b, axis });
      }
    }
  }
  return out;
})();

const piLatex = (n: number): string => (n === 1 ? '\\pi' : `${n}\\pi`);

export const generators: FlashGenerator[] = [
  {
    id: 'vd-g-washer-slice',
    topic: 'volumes-disks',
    kind: 'concept',
    describe: 'Area of the washer swept by one vertical slice (from y = a to y = b) about a horizontal line below or above it',
    generate(seed) {
      const rng = mulberry(seed);
      const c = SLICE_CASES[Math.floor(rng() * SLICE_CASES.length)];
      const s = sliceSetup(c);
      const { a, b } = c;
      // How many wrong values lie below the correct one: varies the rank of the correct value.
      const jMin = Math.max(0, 5 - s.larger.length);
      const jMax = Math.min(5, s.smaller.length);
      const j = jMin + Math.floor(rng() * (jMax - jMin + 1));
      const pick = (list: SliceDistractor[], n: number): SliceDistractor[] => {
        const copy = [...list];
        const out: SliceDistractor[] = [];
        while (out.length < n) out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]);
        return out;
      };
      const distractors = [...pick(s.smaller, j), ...pick(s.larger, 5 - j)].map((d) => ({
        latex: piLatex(d.value),
        expr: `${d.value}*pi`,
        mistake: d.mistake,
        why: d.why,
      }));
      const correctOpt = { latex: piLatex(s.correct), expr: `${s.correct}*pi` };
      const pos = Math.floor(rng() * 6);
      const options = [...distractors.slice(0, pos), correctOpt, ...distractors.slice(pos)];
      const explanation = s.below
        ? `Distances to $${s.axisTex}$: $R = ${b} + ${s.k} = ${s.R}$ and $r = ${a} + ${s.k} = ${s.r}$, so $A = \\pi(${s.R}^2 - ${s.r}^2) = ${piLatex(s.correct)}$.`
        : `Distances to $${s.axisTex}$: the bottom $y = ${a}$ is farther, $R = ${s.k} - ${a} = ${s.R}$, and the top gives $r = ${s.k} - ${b} = ${s.r}$, so $A = \\pi(${s.R}^2 - ${s.r}^2) = ${piLatex(s.correct)}$.`;
      return {
        id: `vd-g-washer-slice:${seed}`,
        topic: 'volumes-disks',
        kind: 'concept',
        prompt: {
          text: `A vertical slice of a region runs from $y = ${a}$ up to $y = ${b}$. The region is rotated about the line $${s.axisTex}$. What is the area of the washer this slice sweeps out?`,
        },
        options,
        correct: pos,
        explanation,
        check: { kind: 'value', expected: `pi*(${s.R}^2 - ${s.r}^2)` },
        difficulty: 1,
      };
    },
  },
];
