// @vitest-environment jsdom
import type { FlashItem } from '@content/types';
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';
import { clearMemoryFallback } from '../../src/lib/storage';
import { clickButton } from './dom-helpers';
import { makeContent, makeFlash, withTopic } from './fixtures';

// These tests inject fixture content. Never load the real content aggregate: it is authored
// concurrently and may be mid-edit, and app logic must not depend on it.
vi.mock('@content/index', () => ({ CONTENT: [] }));

beforeEach(() => {
  localStorage.clear();
  clearMemoryFallback();
  vi.spyOn(console, 'error').mockImplementation(() => {}); // React reports the caught error
});
afterEach(() => vi.restoreAllMocks());

describe('malformed content', () => {
  it('shows a friendly screen instead of crashing, and Home still works', () => {
    const broken = { ...makeFlash('diff-review', 1), prompt: undefined } as unknown as FlashItem;
    const content = withTopic(makeContent({}), 'diff-review', { flash: [broken] });
    render(<App content={content} />);
    clickButton(/Flash Drill/);
    expect(screen.getByText(/This screen could not be shown/)).toBeTruthy();
    clickButton('Back to Home');
    expect(document.querySelector('.home')).not.toBeNull();
    expect(screen.getByRole('button', { name: /Flash Drill/ })).toBeTruthy();
  });
});
