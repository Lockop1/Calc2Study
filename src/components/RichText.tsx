/**
 * Text with inline math: `$...$` segments render as inline KaTeX (`$$...$$` as display math).
 * A literal dollar sign is written `\$` and is never a delimiter. An unclosed `$` stays literal.
 */
import { Fragment, memo, useMemo } from 'react';
import { cx } from '../lib/util';
import { renderTex } from './Math';

export type Segment = { kind: 'text'; value: string } | { kind: 'math'; value: string; display: boolean };

/** Index of the closing delimiter at or after `from`, skipping backslash escapes; -1 if none. */
function findClosing(s: string, from: number, display: boolean): number {
  for (let j = from; j < s.length; j++) {
    const ch = s[j];
    if (ch === '\\') {
      j++; // skip the escaped character (including \$)
      continue;
    }
    if (ch === '$' && (!display || s[j + 1] === '$')) return j;
  }
  return -1;
}

export function splitMath(input: string): Segment[] {
  const segments: Segment[] = [];
  let text = '';
  const flushText = () => {
    if (text) segments.push({ kind: 'text', value: text });
    text = '';
  };
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (ch === '\\' && input[i + 1] === '$') {
      text += '$';
      i += 2;
      continue;
    }
    if (ch === '$') {
      const display = input[i + 1] === '$';
      const width = display ? 2 : 1;
      const close = findClosing(input, i + width, display);
      if (close >= 0) {
        const value = input.slice(i + width, close);
        if (value.trim()) {
          flushText();
          segments.push({ kind: 'math', value, display });
          i = close + width;
          continue;
        }
      }
      // no closing delimiter (or empty math): keep the dollar sign(s) as text
      text += input.slice(i, i + width);
      i += width;
      continue;
    }
    text += ch;
    i++;
  }
  flushText();
  return segments;
}

export interface RichTextProps {
  text: string;
  /** Use `span` inside phrasing-only parents such as buttons. */
  as?: 'div' | 'span' | 'p';
  className?: string;
}

export const RichText = memo(function RichText({ text, as = 'div', className }: RichTextProps) {
  const segments = useMemo(() => splitMath(text), [text]);
  const Tag = as;
  return (
    <Tag className={cx('rich', className)}>
      {segments.map((seg, i) =>
        seg.kind === 'text' ? (
          <Fragment key={i}>{seg.value}</Fragment>
        ) : (
          <span
            key={i}
            className={seg.display ? 'rich-display' : 'rich-math'}
            dangerouslySetInnerHTML={{ __html: renderTex(seg.value, seg.display) }}
          />
        ),
      )}
    </Tag>
  );
});
