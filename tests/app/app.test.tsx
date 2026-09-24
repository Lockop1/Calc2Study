// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../../src/App';
import { mulberry32 } from '../../src/lib/rng';
import { clearMemoryFallback, PROGRESS_KEY, SETTINGS_KEY } from '../../src/lib/storage';
import { clickButton, clickOption, counterText, feedback, optionButtons } from './dom-helpers';
import { makeContent } from './fixtures';

const content = makeContent({
  'diff-review': { flash: 3 },
  antiderivatives: { problems: [2] },
});

function renderApp(c = content) {
  return render(<App content={c} rng={mulberry32(7)} />);
}

const chips = () => Array.from(document.querySelectorAll<HTMLButtonElement>('.chip'));
const badge = () => document.querySelector('.badge')?.textContent ?? null;
const storedSettings = () => JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? 'null');

beforeEach(() => {
  localStorage.clear();
  clearMemoryFallback();
});

describe('Home', () => {
  it('selects every topic by default and shows the three modes', () => {
    renderApp();
    expect(chips()).toHaveLength(9);
    expect(chips().every((c) => c.getAttribute('aria-pressed') === 'true')).toBe(true);
    for (const name of [/Flash Drill/, /Step-Through/, /Review/]) expect(screen.getByRole('button', { name })).toBeTruthy();
    expect(badge()).toBeNull();
  });

  it('persists the topic selection (toggle, None, All)', () => {
    const { unmount } = renderApp();
    clickButton('4. Volumes: slicing, disks & washers');
    expect(chips()[3].getAttribute('aria-pressed')).toBe('false');
    expect(storedSettings().topics).toHaveLength(8);
    unmount();

    renderApp();
    expect(chips()[3].getAttribute('aria-pressed')).toBe('false');
    clickButton('None');
    expect(chips().some((c) => c.getAttribute('aria-pressed') === 'true')).toBe(false);
    expect(storedSettings().topics).toEqual([]);
    clickButton(/Flash Drill/);
    expect(screen.getByRole('status').textContent).toMatch(/Pick at least one topic/);
    expect(optionButtons()).toHaveLength(0);
    clickButton('All');
    expect(storedSettings().topics).toHaveLength(9);
  });

  it('shows a friendly message (no crash) when a mode has no content for the selection', () => {
    renderApp(makeContent({}));
    clickButton(/Flash Drill/);
    expect(screen.getByRole('status').textContent).toMatch(/No Flash Drill questions/);
    clickButton(/Step-Through/);
    expect(screen.getByRole('status').textContent).toMatch(/No Step-Through problems/);
    clickButton(/Review/);
    expect(screen.getByRole('status').textContent).toMatch(/Nothing to review/);
    expect(document.querySelector('.home')).not.toBeNull();
  });

  it('respects the topic filter in every mode', () => {
    renderApp();
    clickButton('None');
    clickButton('2. Antiderivatives & u-substitution');
    clickButton(/Flash Drill/); // no flash content in topic 2
    expect(screen.getByRole('status').textContent).toMatch(/No Flash Drill questions/);
    clickButton(/Step-Through/);
    expect(screen.getByText('Statement ad-s-01')).toBeTruthy();
  });
});

describe('Flash Drill → Summary → Review', () => {
  it('plays a round, records misses, updates the Review badge, and reviews only the misses', () => {
    renderApp();
    clickButton(/Flash Drill/);
    expect(counterText()).toBe('1/3');
    expect(optionButtons().length).toBeGreaterThanOrEqual(5);

    // Q1 wrong, Q2 and Q3 right
    const firstPrompt = document.querySelector('.q-card')!.textContent!;
    clickOption('Wrong');
    expect(feedback()!.textContent).toContain('Not quite');
    expect(feedback()!.textContent).toContain('Algebra slip');
    expect(JSON.parse(localStorage.getItem(PROGRESS_KEY)!).units).not.toEqual({});
    clickButton(/^Next$/);
    expect(counterText()).toBe('2/3');
    clickOption('Correct');
    expect(feedback()!.textContent).toContain('Correct');
    clickButton(/^Next$/);
    clickOption('Correct');
    clickButton(/^Finish$/);

    // Summary
    expect(screen.getByRole('heading', { name: /Score: 2 out of 3/ })).toBeTruthy();
    const missed = document.querySelector('.missed-list')!;
    expect(within(missed as HTMLElement).getByText('Differentiation review')).toBeTruthy();
    expect(missed.querySelector('.missed-count')!.textContent).toBe('1');

    // Home: the Review badge now counts the miss
    clickButton(/^Home$/);
    expect(badge()).toBe('1');

    // Review: exactly the missed question
    clickButton(/Review/);
    expect(counterText()).toBe('1/1');
    const reviewPrompt = document.querySelector('.q-card')!.textContent!;
    expect(reviewPrompt).toContain(firstPrompt.replace(/^.*?Concept/, '').trim());
    clickOption('Correct');
    clickButton(/^Finish$/);
    expect(screen.getByRole('heading', { name: /Score: 1 out of 1/ })).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Review misses/ })).toBeNull();
  });

  it('"Review misses" replays exactly the misses of the round just played', () => {
    renderApp();
    clickButton(/Flash Drill/);
    clickOption('Wrong');
    clickButton(/^Next$/);
    clickOption('Wrong');
    clickButton(/^Next$/);
    clickOption('Correct');
    clickButton(/^Finish$/);
    clickButton(/Review misses \(2\)/);
    expect(counterText()).toBe('1/2');
    clickOption('Wrong');
    clickButton(/^Next$/);
    clickOption('Correct');
    clickButton(/^Finish$/);
    expect(screen.getByRole('heading', { name: /Score: 1 out of 2/ })).toBeTruthy();
    clickButton('Another round');
    expect(document.querySelector('.topbar-title')!.textContent).toBe('Review');
  });

  it('reviews missed Step-Through steps with the problem context', () => {
    renderApp();
    clickButton(/Step-Through/);
    clickOption('Correct');
    clickButton(/^Next$/);
    clickOption('Wrong'); // miss step #1
    clickButton(/^Next$/);
    clickButton('Finish');
    clickButton(/Review misses \(1\)/);
    expect(screen.getByText('Statement ad-s-01')).toBeTruthy();
    expect(screen.getByText('Prompt ad-s-01#1')).toBeTruthy();
    expect(document.querySelector('.work')!.textContent).toContain('Result ad-s-01#0');
    clickOption('Correct');
    expect(feedback()!.textContent).toContain('Correct step:');
  });
});

describe('Settings', () => {
  it('changes the round size and resets progress after a second tap', () => {
    renderApp(makeContent({ 'diff-review': { flash: 12 } }));
    clickButton(/Flash Drill/);
    expect(counterText()).toBe('1/10');
    clickOption('Wrong');
    clickButton('Home');
    expect(badge()).toBe('1');

    clickButton('Settings');
    clickButton('5');
    expect(storedSettings().roundSize).toBe(5);
    expect(screen.getByText(/Progress is saved on this device/)).toBeTruthy();
    clickButton('Reset progress');
    expect(badge()).toBeNull(); // not on Home
    clickButton('Tap again to erase');
    expect(screen.getByText('Progress cleared.')).toBeTruthy();
    clickButton('Home');
    expect(badge()).toBeNull();

    clickButton(/Flash Drill/);
    expect(counterText()).toBe('1/5');
  });

  it('can cancel the reset', () => {
    renderApp();
    clickButton(/Flash Drill/);
    clickOption('Wrong');
    clickButton('Home');
    clickButton('Settings');
    clickButton('Reset progress');
    clickButton('Cancel');
    clickButton('Home');
    expect(badge()).toBe('1');
  });
});
