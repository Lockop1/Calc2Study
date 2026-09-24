/**
 * How a flash item's prompt is presented. For derivative / antiderivative / evaluate items the
 * content stores only the bare expression; the UI adds the framing ("Find f′(x) if f(x) = …",
 * "∫ … dx", the integral itself).
 */
import { topicById } from '@content/topics';
import type { FlashItem, FlashKind, TopicId } from '@content/types';

export interface PromptParts {
  /** Optional context sentence supplied by the item (inline `$…$` allowed). */
  context?: string;
  /** Short lead-in shown above the math (inline `$…$` allowed). */
  lead?: string;
  /** Free-form prompt text for formula / technique / concept items. */
  text?: string;
  /** Display math. */
  latex?: string;
}

const KIND_LABELS: Record<FlashKind, string> = {
  derivative: 'Derivative',
  antiderivative: 'Antiderivative',
  evaluate: 'Definite integral',
  formula: 'Formula',
  technique: 'Technique',
  concept: 'Concept',
};

export function kindLabel(kind: FlashKind): string {
  return KIND_LABELS[kind] ?? 'Question';
}

export function topicShort(topic: TopicId): string {
  try {
    return topicById(topic).short;
  } catch {
    return topic;
  }
}

const GREEK = new Set(['theta', 'phi', 'alpha', 'beta', 'psi', 'omega', 'varphi']);

/** `theta` → `\theta`; single letters stay as they are. */
export function variableTex(variable: string | undefined): string {
  const v = (variable ?? 'x').trim() || 'x';
  return GREEK.has(v) ? `\\${v}` : v;
}

/**
 * True when a LaTeX expression has a binary + or − at the top level (outside braces, brackets,
 * parentheses, and absolute-value bars), e.g. `x^2 + 1` but not `-\sin x` or `e^{x+1}`.
 */
export function hasTopLevelSum(latex: string): boolean {
  let depth = 0;
  let insideBars = false;
  let prev = ''; // last significant character at any depth
  for (let i = 0; i < latex.length; i++) {
    const ch = latex[i];
    if (ch === '\\') {
      const next = latex[i + 1] ?? '';
      if (/[a-zA-Z]/.test(next)) {
        let j = i + 1;
        while (j < latex.length && /[a-zA-Z]/.test(latex[j])) j++;
        const name = latex.slice(i + 1, j);
        i = j - 1;
        // spacing commands are invisible; \left / \right let the delimiter that follows count
        if (!['left', 'right', 'quad', 'qquad'].includes(name)) prev = 'a';
      } else {
        i += 1; // escaped character such as \, \{ \|
        if (next === '{' || next === '}') prev = 'a';
      }
      continue;
    }
    if (ch === ' ') continue;
    if (ch === '{' || ch === '(' || ch === '[') depth++;
    else if (ch === '}' || ch === ')' || ch === ']') depth = Math.max(0, depth - 1);
    else if (ch === '|' && depth === 0) insideBars = !insideBars;
    else if ((ch === '+' || ch === '-') && depth === 0 && !insideBars) {
      const unary = prev === '' || /[=+\-({[^_,]/.test(prev);
      if (!unary) return true;
    }
    prev = ch;
  }
  return false;
}

export function framePrompt(item: FlashItem): PromptParts {
  const v = variableTex(item.variable);
  const latex = item.prompt.latex?.trim();
  const text = item.prompt.text?.trim() || undefined;
  if (latex) {
    switch (item.kind) {
      case 'derivative':
        return { context: text, lead: `Find $f'(${v})$ if`, latex: `f(${v}) = ${latex}` };
      case 'antiderivative': {
        const integrand = hasTopLevelSum(latex) ? `\\left(${latex}\\right)` : latex;
        return { context: text, lead: 'Find', latex: `\\int ${integrand}\\,d${v}` };
      }
      case 'evaluate':
        return { lead: text ?? 'Evaluate', latex };
      default:
        break;
    }
  }
  return { text, latex };
}
