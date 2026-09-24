/**
 * Every LaTeX string in the content must render with KaTeX without error (strict mode off, but
 * unknown commands / malformed math are errors). Inline `$...$` segments in text fields are checked
 * too. This catches typos the numeric checks cannot see (e.g. a `\Big|` in a latex option, a
 * missing brace) before they reach the phone as a red error box.
 */
import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { CONTENT } from '../content/index';

function renders(latex: string, where: string, errors: string[]): void {
  try {
    katex.renderToString(latex, { throwOnError: true, displayMode: false, strict: false });
  } catch (err) {
    errors.push(`${where}: ${(err as Error).message.split('\n')[0]} — in: ${latex.slice(0, 80)}`);
  }
}

function inlineSegments(text: string): string[] {
  const out: string[] = [];
  const re = /\$([^$]+)\$/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) out.push(m[1]);
  return out;
}

function checkText(text: string | undefined, where: string, errors: string[]): void {
  if (!text) return;
  for (const seg of inlineSegments(text)) renders(seg, where, errors);
}

describe('all content LaTeX renders with KaTeX', () => {
  for (const topic of CONTENT) {
    it(`topic ${topic.topic}`, () => {
      const errors: string[] = [];
      const items = [...topic.flash, ...topic.generators.flatMap((g) => [1, 2, 3].map((s) => g.generate(s)))];
      for (const item of items) {
        if (item.prompt.latex) renders(item.prompt.latex, `${item.id} prompt`, errors);
        checkText(item.prompt.text, `${item.id} prompt.text`, errors);
        checkText(item.explanation, `${item.id} explanation`, errors);
        item.options.forEach((o, i) => {
          if (o.latex) renders(o.latex, `${item.id} option ${i}`, errors);
          checkText(o.text, `${item.id} option ${i} text`, errors);
          checkText(o.why, `${item.id} option ${i} why`, errors);
        });
      }
      for (const p of topic.steps) {
        if (p.statement.latex) renders(p.statement.latex, `${p.id} statement`, errors);
        checkText(p.statement.text, `${p.id} statement.text`, errors);
        renders(p.final.latex, `${p.id} final`, errors);
        checkText(p.final.recap, `${p.id} recap`, errors);
        p.steps.forEach((s, si) => {
          const where = `${p.id}#${si}`;
          checkText(s.prompt, `${where} prompt`, errors);
          checkText(s.explanation, `${where} explanation`, errors);
          if (s.result?.latex) renders(s.result.latex, `${where} result`, errors);
          checkText(s.result?.text, `${where} result.text`, errors);
          s.options.forEach((o, i) => {
            if (o.latex) renders(o.latex, `${where} option ${i}`, errors);
            checkText(o.text, `${where} option ${i} text`, errors);
            checkText(o.why, `${where} option ${i} why`, errors);
          });
        });
      }
      expect(errors).toEqual([]);
    });
  }
});
