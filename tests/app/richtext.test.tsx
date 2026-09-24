// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderTex, Tex } from '../../src/components/Math';
import { RichText, splitMath } from '../../src/components/RichText';

describe('splitMath', () => {
  it('splits inline $...$ segments', () => {
    expect(splitMath('Let $u = x^2$, then $du = 2x\\,dx$.')).toEqual([
      { kind: 'text', value: 'Let ' },
      { kind: 'math', value: 'u = x^2', display: false },
      { kind: 'text', value: ', then ' },
      { kind: 'math', value: 'du = 2x\\,dx', display: false },
      { kind: 'text', value: '.' },
    ]);
  });

  it('treats \\$ as a literal dollar sign, never as a delimiter', () => {
    expect(splitMath('It costs \\$5 and \\$7.')).toEqual([{ kind: 'text', value: 'It costs $5 and $7.' }]);
    expect(splitMath('Price \\$3, area $\\pi r^2$')).toEqual([
      { kind: 'text', value: 'Price $3, area ' },
      { kind: 'math', value: '\\pi r^2', display: false },
    ]);
    expect(splitMath('$\\$x$')).toEqual([{ kind: 'math', value: '\\$x', display: false }]);
  });

  it('keeps an unclosed or empty $ as text', () => {
    expect(splitMath('five $ dollars')).toEqual([{ kind: 'text', value: 'five $ dollars' }]);
    expect(splitMath('a $ $ b')).toEqual([{ kind: 'text', value: 'a $ $ b' }]);
  });

  it('supports $$...$$ display math and plain text', () => {
    expect(splitMath('see $$\\int_0^1 x\\,dx$$ now')).toEqual([
      { kind: 'text', value: 'see ' },
      { kind: 'math', value: '\\int_0^1 x\\,dx', display: true },
      { kind: 'text', value: ' now' },
    ]);
    expect(splitMath('no math here')).toEqual([{ kind: 'text', value: 'no math here' }]);
    expect(splitMath('')).toEqual([]);
  });
});

describe('RichText', () => {
  it('renders text and inline KaTeX', () => {
    const { container } = render(<RichText text={'Let $u = x^2$ and pay \\$5.'} />);
    const root = container.firstElementChild!;
    expect(root.classList.contains('rich')).toBe(true);
    expect(root.querySelectorAll('.katex')).toHaveLength(1);
    expect(root.querySelector('.katex-display')).toBeNull();
    expect(root.textContent).toContain('Let ');
    expect(root.textContent).toContain(' and pay $5.');
  });

  it('can render as a span (inside buttons)', () => {
    const { container } = render(<RichText as="span" text={'Use $\\sin x$'} />);
    expect(container.firstElementChild!.tagName).toBe('SPAN');
  });
});

describe('Tex', () => {
  it('wraps KaTeX in a horizontally scrollable container', () => {
    const { container } = render(<Tex latex={'\\int_0^1 x^2\\,dx'} displayMode />);
    const box = container.firstElementChild!;
    expect(box.tagName).toBe('DIV');
    expect(box.classList.contains('math-scroll')).toBe(true);
    expect(box.querySelector('.katex-display')).not.toBeNull();
  });

  it('never throws on invalid LaTeX', () => {
    expect(() => renderTex('\\frac{1}{')).not.toThrow();
    const { container } = render(<Tex latex={'\\notacommand{x}'} />);
    expect(container.querySelector('.katex, .katex-error')).not.toBeNull();
  });
});
