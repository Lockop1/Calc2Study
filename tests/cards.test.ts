/**
 * Cards mode (flashcards) content checks. Cards are not multiple-choice, so the ≥5-option rule
 * does not apply; everything else is enforced here:
 *   - the deck is exactly the whiteboard list: 50 cards, fixed per-section counts, no LIATE
 *   - schema: unique ids, valid category/section/kind, front and back present, "+ C" on every
 *     antiderivative answer, no lone backslashes, every LaTeX string renders in KaTeX
 *   - numeric verification through the existing checker: derivative and antiderivative cards by
 *     finite differences, identities at random points, trig-sub cards by substituting the sub into
 *     the radical on the θ interval and by differentiating the sub for dx
 *   - LaTeX ↔ mathjs agreement for fronts and backs (and the "also written as" form)
 */
import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { readFileSync } from 'node:fs';
import { CARDS, CARD_SECTIONS } from '../content/cards/deck';
import type { Card, CardSection } from '../content/types';
import { claimIssues, numericChecks, type Issue } from '../checker/validate';
import { isClaimCheck } from '../checker/claims';
import { hashString } from '../checker/numeric';

const EXPECTED_PER_SECTION: Partial<Record<CardSection, number>> = {
  derivatives: 12,
  antiderivatives: 11,
  pythagorean: 4,
  'double-angle': 2,
  'half-angle': 2,
  'trig-sub': 12,
  'area-volume': 4,
  'arc-length': 2,
  ibp: 1,
};
/** Topic 10–14 decks (session 3): minimum sizes from the prompt's "at minimum" lists. */
const MIN_PER_NEW_SECTION: Partial<Record<CardSection, number>> = {
  'partial-fractions': 9,
  improper: 8,
  sequences: 15,
  'series-basics': 5,
  'series-tests': 7,
};
const EXPECTED_TOTAL = 50; // the whiteboard deck (sections 1–9)
const CATEGORY_OF_SECTION: Record<CardSection, Card['category']> = {
  'partial-fractions': 'Partial Fractions',
  improper: 'Improper Integrals',
  sequences: 'Sequences',
  'series-basics': 'Series Basics',
  'series-tests': 'Series Tests',
  derivatives: 'Derivatives',
  antiderivatives: 'Antiderivatives',
  pythagorean: 'Identities',
  'double-angle': 'Identities',
  'half-angle': 'Identities',
  'trig-sub': 'Trig Substitution',
  'area-volume': 'Area & Volume',
  'arc-length': 'Arc Length',
  ibp: 'Integration by Parts',
};
const KINDS = ['derivative', 'antiderivative', 'identity', 'trig-sub', 'formula'];

function renders(latex: string, where: string, errors: string[]): void {
  try {
    katex.renderToString(latex, { throwOnError: true, strict: false });
  } catch (err) {
    errors.push(`${where}: ${(err as Error).message.split('\n')[0]}`);
  }
}
function inlineMath(text: string | undefined): string[] {
  const out: string[] = [];
  if (!text) return out;
  const re = /\$([^$]+)\$/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) out.push(m[1]);
  return out;
}
const fmt = (issues: Issue[]) => issues.filter((i) => i.level === 'error').map((i) => `[${i.code}] ${i.message}`);

describe('cards deck: exactly the whiteboard list', () => {
  it(`whiteboard deck: exactly ${EXPECTED_TOTAL} cards with the fixed per-section counts`, () => {
    const whiteboard = CARDS.filter((c) => c.section in EXPECTED_PER_SECTION);
    expect(whiteboard.length).toBe(EXPECTED_TOTAL);
    for (const [section, n] of Object.entries(EXPECTED_PER_SECTION)) {
      expect(CARDS.filter((c) => c.section === section).length, section).toBe(n);
    }
    expect(CARD_SECTIONS.map((s) => s.id)).toEqual([...Object.keys(EXPECTED_PER_SECTION), ...Object.keys(MIN_PER_NEW_SECTION)]);
  });
  it('topic 10–14 decks meet their minimum sizes', () => {
    for (const [section, min] of Object.entries(MIN_PER_NEW_SECTION)) {
      expect(CARDS.filter((c) => c.section === section).length, section).toBeGreaterThanOrEqual(min);
    }
  });
  it('has unique ids in the card-<section>-<nn> form', () => {
    const ids = new Set<string>();
    for (const c of CARDS) {
      expect(c.id).toMatch(new RegExp(`^card-${c.section}-\\d{2}$`));
      expect(ids.has(c.id), `duplicate ${c.id}`).toBe(false);
      ids.add(c.id);
    }
  });
  it('contains no LIATE or "choosing u" cards', () => {
    const blob = JSON.stringify(CARDS);
    expect(blob).not.toMatch(/LIATE/i);
    expect(blob).not.toMatch(/choos(e|ing)\s+u\b/i);
  });
  it('has no lone backslashes in the deck source', () => {
    const src = ['deck', 'partial-fractions', 'improper', 'sequences', 'series-basics', 'series-tests']
      .map((f) => readFileSync(`content/cards/${f}.ts`, 'utf8'))
      .join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '');
    const bad: string[] = [];
    const re = /(?<!\\)\\(?!\\)(.)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) if (!"'\"`$n\\".includes(m[1])) bad.push(`\\${m[1]} at ${m.index}`);
    expect(bad).toEqual([]);
  });
});

describe('cards deck: each card', () => {
  for (const card of CARDS) {
    it(card.id, () => {
      // schema
      expect(card.category).toBe(CATEGORY_OF_SECTION[card.section]);
      expect(KINDS).toContain(card.kind);
      expect(card.front.text || card.front.latex, 'front needs text or latex').toBeTruthy();
      expect(card.back.latex, 'back needs latex').toBeTruthy();
      expect(card.check, 'check is required (kind "none" with a reason for formula cards)').toBeTruthy();
      if (card.check.kind === 'none') expect(card.check.reason).toBeTruthy();
      if (card.kind === 'antiderivative') {
        expect(card.back.latex).toMatch(/\+\s*C\s*$/);
        if (card.back.also) expect(card.back.also).toMatch(/\+\s*C\s*$/);
        expect(card.check.kind).toBe('antiderivative');
      }
      if (card.kind === 'derivative') expect(card.check.kind).toBe('derivative');
      if (card.kind === 'identity') expect(card.check.kind).toBe('identity');
      // Whiteboard formula cards have no numeric check; topic 10–14 formula cards may carry a
      // limit / series / improper-integral / identity / value check (or none with a reason).
      if (card.kind === 'formula' && card.section in EXPECTED_PER_SECTION) expect(card.check.kind).toBe('none');
      if (card.kind === 'formula') expect(['none', 'limit', 'series', 'improper-integral', 'identity', 'value']).toContain(card.check.kind);
      if (card.kind === 'trig-sub') expect(card.check.kind).not.toBe('none');
      // KaTeX
      const errors: string[] = [];
      if (card.front.latex) renders(card.front.latex, 'front', errors);
      for (const seg of inlineMath(card.front.text)) renders(seg, 'front text', errors);
      renders(card.back.latex, 'back', errors);
      if (card.back.also) renders(card.back.also, 'also', errors);
      expect(errors).toEqual([]);
      // numeric verification through the existing checker
      if (card.check.kind !== 'none' && isClaimCheck(card.check) && !card.back.expr) {
        // Verdict card (e.g. "diverges"): the claim itself is checked numerically.
        expect(fmt(claimIssues(card.id, card.check))).toEqual([]);
      } else if (card.check.kind !== 'none') {
        expect(card.back.expr, 'a checkable card needs back.expr').toBeTruthy();
        const correct = card.back.checkExpr ?? card.back.expr!;
        const v = card.variable ?? 'x';
        const latexPairs = [{ label: 'back', latex: card.back.latex, expr: card.back.expr! }];
        if (card.back.also) latexPairs.push({ label: 'also', latex: card.back.also, expr: card.back.expr! });
        let prompt: { latex: string; expected: string } | undefined;
        if (card.kind === 'derivative' && card.check.kind === 'derivative' && card.front.latex) prompt = { latex: card.front.latex, expected: card.check.of };
        if (card.kind === 'antiderivative' && card.check.kind === 'antiderivative' && card.front.latex) prompt = { latex: card.front.latex, expected: card.check.integrand };
        if (card.kind === 'identity' && card.check.kind === 'identity' && card.front.latex) prompt = { latex: card.front.latex, expected: card.check.lhs };
        // "also written as" must be the same function (antiderivatives: same up to the checker's
        // derivative comparison, which the latexPairs agreement covers since C evaluates to 0).
        const issues = numericChecks({ where: card.id, seed: hashString(card.id), variable: v, domain: card.domain }, card.check, correct, [], latexPairs, prompt);
        expect(fmt(issues)).toEqual([]);
      }
    });
  }
});
