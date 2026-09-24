/**
 * In a JS string literal a lone backslash is swallowed (`'\;'` becomes `;`, `'\t'` becomes a tab),
 * so LaTeX commands must be written with a doubled backslash. This test fails on any lone backslash
 * in the content sources outside a legitimate JS escape, so a stray `;` or tab never reaches the phone.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const files = ['content/examples/sample.ts', ...['content/flash', 'content/steps'].flatMap((d) => readdirSync(d).map((f) => join(d, f)))];

function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

describe('content sources have no lone backslashes', () => {
  for (const file of files) {
    it(file, () => {
      const src = stripComments(readFileSync(file, 'utf8'));
      const bad: string[] = [];
      const re = /(?<!\\)\\(?!\\)(.)/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(src)) !== null) {
        if ("'\"`$n\\".includes(m[1])) continue;
        const line = src.slice(0, m.index).split('\n').length;
        bad.push(`line ${line}: \\${m[1]} in …${src.slice(Math.max(0, m.index - 30), m.index + 30).replace(/\n/g, ' ')}…`);
      }
      expect(bad).toEqual([]);
    });
  }
});
