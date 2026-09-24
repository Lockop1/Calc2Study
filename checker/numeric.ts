/**
 * Numeric utilities for the content checker (test-time only; never imported by src/).
 */

/** Deterministic 32-bit PRNG (mulberry32). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a string hash → 32-bit unsigned int. */
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

/** |a − b| ≤ abs + rel·max(|a|,|b|). NaN never equals anything. */
export function approxEqual(a: number, b: number, rel = 1e-6, abs = 1e-8): boolean {
  if (!isFiniteNumber(a) || !isFiniteNumber(b)) return false;
  return Math.abs(a - b) <= abs + rel * Math.max(Math.abs(a), Math.abs(b));
}

/**
 * Tanh-sinh (double exponential) quadrature on [a, b]. Handles integrable endpoint singularities
 * (e.g. 1/√x on [0, 1]). Abscissae where f is not finite contribute 0 (they only occur within
 * rounding distance of the endpoints for well-posed integrands).
 */
export function tanhSinhBasic(f: (x: number) => number, a: number, b: number, tol = 1e-10): number {
  if (!isFiniteNumber(a) || !isFiniteNumber(b)) return NaN;
  if (a === b) return 0;
  if (a > b) return -tanhSinhBasic(f, b, a, tol);
  const d = (b - a) / 2;
  const safe = (x: number): number => {
    const v = f(x);
    return isFiniteNumber(v) ? v : 0;
  };
  // Evaluate the transformed integrand at abscissa t (both ±t).
  const term = (t: number): number => {
    const u = (Math.PI / 2) * Math.sinh(t);
    const ch = Math.cosh(u);
    const w = ((Math.PI / 2) * Math.cosh(t)) / (ch * ch); // weight
    // distance from the endpoint: d·(1 − tanh u) computed stably
    const e2 = Math.exp(-2 * Math.abs(u));
    const dist = (d * 2 * e2) / (1 + e2);
    if (!(dist > 0)) return 0;
    const xr = b - dist; // right of center (u > 0)
    const xl = a + dist; // left of center (u < 0)
    return w * (safe(xr) + safe(xl));
  };
  let h = 1;
  // At t = 0 both abscissae coincide with the midpoint, so term(0) counts f(mid) twice → halve.
  let sum = term(0) / 2;
  let prev = NaN;
  let result = NaN;
  for (let level = 0; level < 9; level++) {
    if (level > 0) h /= 2;
    const step = level === 0 ? 1 : 2;
    for (let k = 1; ; k += step) {
      const t = k * h;
      if (t > 6.5) break;
      const v = term(t);
      sum += v;
      if (Math.abs(v) < 1e-18 && t > 3) break;
    }
    result = d * h * sum;
    if (level >= 3 && Math.abs(result - prev) <= tol * Math.max(1, Math.abs(result))) return result;
    prev = result;
  }
  return result;
}

/**
 * Adaptive tanh-sinh: subdivides until the two halves agree with the whole. Interior kinks
 * (|x|, piecewise integrands) end up at subinterval endpoints, where tanh-sinh is robust, so
 * ∫|x| and similar integrals are accurate to ~1e-10 instead of ~1e-5.
 */
export function tanhSinh(f: (x: number) => number, a: number, b: number, tol = 1e-10, depth = 14): number {
  if (!isFiniteNumber(a) || !isFiniteNumber(b)) return NaN;
  if (a === b) return 0;
  if (a > b) return -tanhSinh(f, b, a, tol, depth);
  const whole = tanhSinhBasic(f, a, b, tol);
  const m = (a + b) / 2;
  const left = tanhSinhBasic(f, a, m, tol);
  const right = tanhSinhBasic(f, m, b, tol);
  const split = left + right;
  if (!isFiniteNumber(whole) || !isFiniteNumber(split)) return NaN;
  if (depth <= 0 || Math.abs(whole - split) <= tol * Math.max(1, Math.abs(split))) return split;
  return tanhSinh(f, a, m, tol / 2, depth - 1) + tanhSinh(f, m, b, tol / 2, depth - 1);
}

/**
 * Numeric derivative with a 5-point central stencil, plus a stability estimate from a second step
 * size. `ok` is false when the two estimates disagree (singularity/kink nearby) or values are not
 * finite; callers should resample.
 */
export function numDeriv(f: (x: number) => number, x: number): { value: number; ok: boolean } {
  const est = (h: number): number => {
    const f1 = f(x + h),
      f2 = f(x - h),
      f3 = f(x + 2 * h),
      f4 = f(x - 2 * h);
    if (![f1, f2, f3, f4].every(isFiniteNumber)) return NaN;
    return (8 * (f1 - f2) - (f3 - f4)) / (12 * h);
  };
  const h = 1e-3 * Math.max(1, Math.abs(x));
  const d1 = est(h);
  const d2 = est(h / 4);
  if (!isFiniteNumber(d1) || !isFiniteNumber(d2)) return { value: NaN, ok: false };
  const ok = Math.abs(d1 - d2) <= 1e-7 + 1e-5 * Math.max(Math.abs(d1), Math.abs(d2));
  return { value: d2, ok };
}

/** Uniform sample in [lo, hi] from a PRNG. */
export function uniform(rng: () => number, lo: number, hi: number): number {
  return lo + (hi - lo) * rng();
}
