import type { Option } from '@content/types';
import { Tex } from './Math';
import { RichText } from './RichText';

/** An option's visible content: `text` (with inline math) and/or `latex` (display style). */
export function OptionContent({ option }: { option: Option }) {
  const hasText = Boolean(option.text);
  const hasLatex = Boolean(option.latex);
  return (
    <>
      {hasText ? <RichText as="span" text={option.text!} /> : null}
      {hasLatex ? <Tex as="span" latex={`\\displaystyle ${option.latex!}`} /> : null}
      {!hasText && !hasLatex ? <span aria-label="empty option">—</span> : null}
    </>
  );
}
