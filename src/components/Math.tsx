/**
 * KaTeX rendering. `Tex` renders one formula inside a `.math-scroll` container, so a formula wider
 * than the screen scrolls sideways inside its own box instead of widening the page.
 *
 * (The component is called `Tex`, not `Math`, so importing it never shadows the global `Math`.)
 */
import katex from 'katex';
import { memo } from 'react';
import { cx } from '../lib/util';

const cache = new Map<string, string>();
const MAX_CACHE = 600;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/** LaTeX → KaTeX HTML (memoized). Never throws: bad input renders as a `.katex-error` span. */
export function renderTex(latex: string, displayMode = false): string {
  const key = `${displayMode ? 'D' : 'I'}:${latex}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  let html: string;
  try {
    html = katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: import.meta.env.DEV ? 'warn' : 'ignore',
      output: 'htmlAndMathml',
    });
  } catch {
    html = `<span class="katex-error">${escapeHtml(latex)}</span>`;
  }
  if (cache.size >= MAX_CACHE) cache.clear();
  cache.set(key, html);
  return html;
}

export interface TexProps {
  latex: string;
  /** Display style (centered, full size). Default: inline. */
  displayMode?: boolean;
  /** Use `span` inside phrasing-only parents such as buttons. */
  as?: 'div' | 'span';
  className?: string;
}

export const Tex = memo(function Tex({ latex, displayMode = false, as = 'div', className }: TexProps) {
  const Tag = as;
  return (
    <Tag
      className={cx('math-scroll', displayMode && 'math-display', className)}
      dangerouslySetInnerHTML={{ __html: renderTex(latex, displayMode) }}
    />
  );
});
