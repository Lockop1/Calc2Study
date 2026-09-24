/**
 * Content schema for Calc2Study.
 *
 * Every question is pure data. Mathematical answers carry BOTH a KaTeX `latex` string (what the
 * student sees) and a machine-checkable `expr` in mathjs syntax (what the tests evaluate).
 * The tests (tests/content.test.ts) enforce:
 *   - ≥5 options, unique option text/latex, `correct` in range
 *   - every distractor has a `mistake` id from content/mistakes.ts and a `why` explanation
 *   - numeric correctness of the correct answer according to `check`
 *   - numeric distinctness of every distractor from the correct answer (5+ random points)
 *   - agreement between each option's `latex` and its `expr` (the LaTeX is parsed and compared)
 *   - no "all/none of the above"
 *
 * mathjs syntax reminders: `log(x)` is the natural log (aliases `ln`, `arcsin`, `arccos`,
 * `arctan`, `arcsec`, `arccsc`, `arccot` are provided); `sqrt`, `abs`, `nthRoot(x, 3)`, `exp`,
 * `pi`, `e`; `theta` for θ; differentials are plain symbols `dx`, `dy`, `du`, `dt`, `dtheta`;
 * the integration constant `C` evaluates to 0; definite integrals are `integral(f, x, a, b)`;
 * indefinite integrals are `indefinite(f, x)` (compared by integrand); a list of values is a
 * vector `[a, b]` (e.g. "R = 4 - y^2, r = 0" is `[4 - y^2, 0]`).
 */
import type { MistakeId } from './mistakes';
import type { TopicId } from './topics';

export type { MistakeId, TopicId };

/** Sampling domain for numeric checks: one interval for every variable, or per-variable intervals. */
export type Domain = [number, number] | Record<string, [number, number]>;

export interface Option {
  /** KaTeX math (rendered in math mode). Provide `latex` and/or `text`. */
  latex?: string;
  /** Plain text (may contain inline `$...$` math). */
  text?: string;
  /** mathjs expression for numeric checks. Required for derivative/antiderivative/evaluate kinds. */
  expr?: string;
  /** Required on every distractor: the one specific student mistake this option represents. */
  mistake?: MistakeId;
  /** Required on every distractor: one line saying which mistake this choice represents. */
  why?: string;
}

export type Check =
  /** The correct option's expr equals d/dv of `of` (finite differences at random points). */
  | { kind: 'derivative'; of: string }
  /** d/dv of the correct option's expr equals `integrand` (distractors: their derivative differs). */
  | { kind: 'antiderivative'; integrand: string }
  /** The correct option's expr (a constant) equals the numeric integral of `integrand` over [lower, upper]. */
  | { kind: 'definite-integral'; integrand: string; lower: string; upper: string }
  /** The correct option's expr equals `lhs` at random points (identity in all free variables). */
  | { kind: 'identity'; lhs: string }
  /** The correct option's expr equals `expected` (a constant or an expression) at random points. */
  | { kind: 'value'; expected: string }
  /** No numeric check is possible (conceptual/technique items). Verified by math-verifier only. */
  | { kind: 'none'; reason: string };

export type FlashKind =
  /** prompt.latex = f(v). Options = candidate f'(v). check.kind must be 'derivative'. */
  | 'derivative'
  /** prompt.latex = integrand. Options = candidate antiderivatives, ALL ending in `+ C`. check.kind must be 'antiderivative'. */
  | 'antiderivative'
  /** prompt.latex = a full definite integral `\int_a^b f\,dx`. Options = values. check.kind must be 'definite-integral'. */
  | 'evaluate'
  /** Rules & formulas (IBP formula, washer/shell/arc-length formulas, identities, trig-sub table). */
  | 'formula'
  /** "Which method fits this integral best?" Options are technique names (text). */
  | 'technique'
  /** Other conceptual questions (bounds, signs, which identity a substitution produces, ...). */
  | 'concept';

export interface FlashItem {
  /** Unique id, `<prefix>-f-<nnn>` (e.g. `dr-f-001`). Generated instances use `<generatorId>:<seed>`. */
  id: string;
  topic: TopicId;
  kind: FlashKind;
  /**
   * For derivative/antiderivative/evaluate kinds, `latex` is the bare expression (the UI adds the
   * framing "f(x) = …, find f′(x)" / "∫ … dx"). For other kinds, provide `text` and/or `latex`.
   */
  prompt: { text?: string; latex?: string };
  /** At least 5 options (6 is fine). Shuffled at display time. */
  options: Option[];
  /** Index of the correct option in `options` (before shuffling). */
  correct: number;
  /** One line: why the correct answer is correct. May contain inline `$...$` math. */
  explanation: string;
  /** Independent variable for derivative/antiderivative checks (default 'x'; 't', 'theta', 'y', 'u' allowed). */
  variable?: string;
  /** Sampling domain for numeric checks (default [0.25, 1.25] for every variable). */
  domain?: Domain;
  check: Check;
  /** 1 = Level I (recall / one step), 2 = Level II (multi-step or subtle). */
  difficulty?: 1 | 2;
  tags?: string[];
}

/**
 * Parameterized flash items. `generate(seed)` must be deterministic and return an item whose id is
 * `${generator.id}:${seed}`. Tests validate seeds 1..N exactly like static items.
 */
export interface FlashGenerator {
  id: string;
  topic: TopicId;
  kind: FlashKind;
  describe: string;
  generate(seed: number): FlashItem;
}

export interface Step {
  /** The question at this step (may contain inline `$...$` math). */
  prompt: string;
  /** At least 5 options. Shuffled at display time. */
  options: Option[];
  correct: number;
  /** One line: why the correct step is right. */
  explanation: string;
  /**
   * The correct step's work, appended to the visible state after the reveal. Defaults to the
   * correct option's latex/text when omitted.
   */
  result?: { latex?: string; text?: string };
  /** Optional numeric check of the correct option's expr. If present, the correct option needs `expr`. */
  check?: Check;
  variable?: string;
  domain?: Domain;
}

export interface StepProblem {
  /** Unique id, `<prefix>-s-<nn>` (e.g. `ad-s-01`). Step ids are `<id>#<stepIndex>`. */
  id: string;
  topic: TopicId;
  title: string;
  difficulty: 1 | 2;
  /** The problem statement shown at the top for the whole problem. */
  statement: { text?: string; latex?: string };
  /** 3 to 7 steps. */
  steps: Step[];
  final: {
    latex: string;
    /** Required unless check.kind === 'none'. */
    expr?: string;
    check: Check;
    /** Short recap of the key move (1–2 sentences, inline `$...$` math allowed). */
    recap: string;
  };
  variable?: string;
  domain?: Domain;
  tags?: string[];
}

export interface TopicContent {
  topic: TopicId;
  flash: FlashItem[];
  generators: FlashGenerator[];
  steps: StepProblem[];
}
