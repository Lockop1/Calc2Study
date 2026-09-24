// @vitest-environment jsdom
/** Cards screen: filters, flip, grading, queue, summary, reset, persistence, navigation, framing. */
import type { Card, CardSection } from '@content/types';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';
import { Flashcard } from '../../src/components/Flashcard';
import { defaultCardState, recordCardResult, withFilters, type CardState } from '../../src/lib/cards';
import { mulberry32 } from '../../src/lib/rng';
import { CARDS_KEY, clearMemoryFallback } from '../../src/lib/storage';
import { TAP_GUARD_MS } from '../../src/lib/tap-guard';
import { CardsScreen } from '../../src/screens/CardsScreen';
import { RESET_CONFIRM_GUARD_MS } from '../../src/screens/SettingsScreen';
import { makeContent } from './fixtures';

const fixture = vi.hoisted(() => {
  const sections: { id: CardSection; label: string }[] = [
    { id: 'derivatives', label: 'Derivatives' },
    { id: 'antiderivatives', label: 'Antiderivatives' },
    { id: 'pythagorean', label: 'Pythagorean' },
    { id: 'double-angle', label: 'Double-angle' },
    { id: 'half-angle', label: 'Half-angle' },
    { id: 'trig-sub', label: 'Trig sub' },
    { id: 'area-volume', label: 'Area & volume' },
    { id: 'arc-length', label: 'Arc length' },
    { id: 'ibp', label: 'IBP' },
  ];
  const cards: Card[] = [
    { id: 'card-derivatives-01', category: 'Derivatives', section: 'derivatives', kind: 'derivative', front: { latex: '\\sin x' }, back: { latex: '\\cos x', expr: 'cos(x)' }, check: { kind: 'derivative', of: 'sin(x)' } },
    { id: 'card-derivatives-02', category: 'Derivatives', section: 'derivatives', kind: 'derivative', front: { latex: '\\tan x' }, back: { latex: '\\sec^2 x', expr: 'sec(x)^2' }, check: { kind: 'derivative', of: 'tan(x)' } },
    { id: 'card-antiderivatives-05', category: 'Antiderivatives', section: 'antiderivatives', kind: 'antiderivative', front: { latex: '\\tan x' }, back: { latex: '\\ln|\\sec x| + C', also: '-\\ln|\\cos x| + C', expr: 'log(abs(sec(x)))' }, check: { kind: 'antiderivative', integrand: 'tan(x)' } },
    { id: 'card-half-angle-01', category: 'Identities', section: 'half-angle', kind: 'identity', front: { latex: '\\sin^2 x' }, back: { latex: '\\frac{1 - \\cos 2x}{2}', expr: '(1 - cos(2*x))/2' }, check: { kind: 'identity', lhs: 'sin(x)^2' } },
    { id: 'card-trig-sub-02', category: 'Trig Substitution', section: 'trig-sub', kind: 'trig-sub', front: { text: 'dx when $x = a\\sin\\theta$?' }, back: { latex: 'a\\cos\\theta\\,d\\theta', expr: 'a*cos(theta)*dtheta', checkExpr: 'a*cos(theta)' }, check: { kind: 'derivative', of: 'a*sin(theta)' }, variable: 'theta' },
    { id: 'card-arc-length-01', category: 'Arc Length', section: 'arc-length', kind: 'formula', front: { text: 'Arc length in terms of $x$' }, back: { latex: 'L = \\int_a^b \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2}\\,dx' }, check: { kind: 'none', reason: 'symbolic formula' } },
    { id: 'card-area-volume-02', category: 'Area & Volume', section: 'area-volume', kind: 'formula', front: { text: 'Volume by washers about the $x$-axis' }, back: { latex: 'V = \\int_a^b \\pi\\left([R(x)]^2 - [r(x)]^2\\right)dx' }, check: { kind: 'none', reason: 'symbolic formula' } },
  ];
  return { sections, cards };
});

// Never load the real content aggregate in app tests: the deck is authored concurrently.
vi.mock('@content/index', () => ({ CONTENT: [], CARDS: fixture.cards, CARD_SECTIONS: fixture.sections }));

const NOW = Date.UTC(2026, 8, 24, 12);
const byId = (id: string) => fixture.cards.find((c) => c.id === id)!;

beforeEach(() => {
  localStorage.clear();
  clearMemoryFallback();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// ── helpers ──────────────────────────────────────────────────────────────────────────────────
const tap = (el: Element) => fireEvent.click(el, { detail: 1 }); // a real pointer tap has detail ≥ 1
const button = (name: string | RegExp) => screen.getByRole('button', { name });
const click = (name: string | RegExp) => fireEvent.click(button(name));
const cardEl = () => document.querySelector<HTMLElement>('.flashcard');
const shownId = () => cardEl()?.dataset.card ?? null;
const side = () => cardEl()?.dataset.side ?? null;
const counter = () => document.querySelector('.cards-counter-text')?.textContent ?? '';
const gradeButtons = () => screen.queryAllByRole('button', { name: /^(Got it|Missed it)$/ });
const texOf = (root: ParentNode, selector: string) => root.querySelector(`${selector} annotation`)?.textContent ?? null;
const stored = (): CardState => JSON.parse(localStorage.getItem(CARDS_KEY) ?? 'null');
const chip = (label: string) => button(label);
const switchEl = (name: RegExp) => screen.getByRole('switch', { name });
const flip = () => fireEvent.click(cardEl()!);
const grade = (name: 'Got it' | 'Missed it') => click(name);

function renderCards(props: Partial<Parameters<typeof CardsScreen>[0]> = {}) {
  const onHome = vi.fn();
  const utils = render(
    <CardsScreen cards={fixture.cards} sections={fixture.sections} rng={mulberry32(5)} now={() => NOW} onHome={onHome} {...props} />,
  );
  return { onHome, ...utils };
}

/** Deck order (shuffle off), optionally only some sections, then Start. */
function startInOrder(sections?: string[]) {
  fireEvent.click(switchEl(/Shuffle/));
  if (sections) {
    click('None');
    for (const s of sections) fireEvent.click(chip(s));
  }
  click(/^Study \d+ cards?$/);
}

// ── tests ────────────────────────────────────────────────────────────────────────────────────
describe('filter panel', () => {
  it('defaults to every section, shuffle on, missed-only off', () => {
    renderCards();
    const chips = Array.from(document.querySelectorAll('.chip'));
    expect(chips).toHaveLength(9);
    expect(chips.every((c) => c.getAttribute('aria-pressed') === 'true')).toBe(true);
    expect(switchEl(/Shuffle/).getAttribute('aria-checked')).toBe('true');
    expect(switchEl(/Missed only/).getAttribute('aria-checked')).toBe('false');
    expect(screen.getByText('7 cards selected')).toBeTruthy();
    expect(button('Study 7 cards')).toBeTruthy();
    expect(button('Reset all 7 cards')).toBeTruthy();
  });

  it('persists section, shuffle, and missed-only choices', () => {
    const { unmount } = renderCards();
    fireEvent.click(chip('Derivatives'));
    fireEvent.click(switchEl(/Shuffle/));
    expect(chip('Derivatives').getAttribute('aria-pressed')).toBe('false');
    expect(screen.getByText('5 cards selected')).toBeTruthy();
    expect(stored().filters).toEqual({
      sections: ['antiderivatives', 'pythagorean', 'double-angle', 'half-angle', 'trig-sub', 'area-volume', 'arc-length', 'ibp'],
      shuffle: false,
      missedOnly: false,
    });
    unmount();

    renderCards();
    expect(chip('Derivatives').getAttribute('aria-pressed')).toBe('false');
    expect(switchEl(/Shuffle/).getAttribute('aria-checked')).toBe('false');
    click('None');
    expect(button('Nothing to study')).toHaveProperty('disabled', true);
    expect(screen.getByText('Pick at least one section.')).toBeTruthy();
    click('All');
    expect(stored().filters.sections).toHaveLength(9);
    fireEvent.click(switchEl(/Missed only/));
    expect(stored().filters.missedOnly).toBe(true);
    expect(screen.getByText(/No missed cards in these sections/)).toBeTruthy();
  });
});

describe('study session', () => {
  it('shows the front first; a tap flips to the back (KaTeX); grade buttons only after the flip', () => {
    renderCards();
    startInOrder();
    expect(shownId()).toBe('card-derivatives-01');
    expect(side()).toBe('front');
    expect(cardEl()!.querySelector('.fc-category')!.textContent).toBe('Derivatives');
    expect(texOf(cardEl()!, '.fc-front .fc-math')).toBe('\\frac{d}{dx}\\left[\\sin x\\right]');
    expect(cardEl()!.querySelector('.fc-back')).toBeNull();
    expect(gradeButtons()).toHaveLength(0);
    expect(button('Show answer')).toBeTruthy();
    expect(counter()).toBe('0 / 7 got');

    flip();
    expect(side()).toBe('back');
    const back = cardEl()!.querySelector('.fc-back')!;
    expect(back.querySelector('.fc-answer .katex')).not.toBeNull();
    expect(texOf(back, '.fc-answer')).toBe('\\cos x');
    expect(gradeButtons()).toHaveLength(2);
    expect(screen.queryByRole('button', { name: 'Show answer' })).toBeNull();

    flip(); // tapping again shows the front; the grade buttons stay
    expect(side()).toBe('front');
    expect(gradeButtons()).toHaveLength(2);
  });

  it('"Show answer" flips too; "also written as" is shown when present', () => {
    renderCards();
    startInOrder(['Antiderivatives']);
    expect(texOf(cardEl()!, '.fc-front .fc-math')).toBe('\\int \\tan x\\,dx');
    click('Show answer');
    expect(texOf(cardEl()!, '.fc-answer')).toBe('\\ln|\\sec x| + C');
    expect(cardEl()!.querySelector('.fc-also')!.textContent).toContain('also written as');
    expect(texOf(cardEl()!, '.fc-also')).toBe('-\\ln|\\cos x| + C');
  });

  it('a missed card comes back after 3 other cards and repeats until got; grades are saved immediately', () => {
    renderCards();
    startInOrder();
    flip();
    grade('Missed it');
    expect(stored().cards['card-derivatives-01']).toEqual({ got: 0, missed: 1, last: 'missed', lastAt: NOW });
    expect(counter()).toBe('0 / 7 got');
    const seen: string[] = [];
    for (let i = 0; i < 3; i++) {
      seen.push(shownId()!);
      expect(side()).toBe('front'); // every card starts on its front
      flip();
      grade('Got it');
    }
    expect(seen).toEqual(['card-derivatives-02', 'card-antiderivatives-05', 'card-half-angle-01']);
    expect(shownId()).toBe('card-derivatives-01');
    expect(counter()).toBe('3 / 7 got');
    expect(stored().cards['card-derivatives-02']).toEqual({ got: 1, missed: 0, last: 'got', lastAt: NOW });
    flip();
    grade('Got it');
    expect(stored().cards['card-derivatives-01']).toEqual({ got: 1, missed: 1, last: 'got', lastAt: NOW });
    expect(counter()).toBe('4 / 7 got');
  });

  it('summary shows got / missed; "Study missed only" replays just the missed cards', () => {
    const { onHome } = renderCards();
    startInOrder(['Derivatives']);
    expect(counter()).toBe('0 / 2 got');
    flip();
    grade('Missed it'); // d1 → end of the queue (only one other card)
    expect(shownId()).toBe('card-derivatives-02');
    flip();
    grade('Got it');
    expect(shownId()).toBe('card-derivatives-01');
    flip();
    grade('Missed it'); // lone card repeats
    expect(shownId()).toBe('card-derivatives-01');
    flip();
    grade('Got it');

    expect(screen.getByRole('heading', { name: 'Session complete' })).toBeTruthy();
    expect(document.querySelector('.card-stat--got .card-stat-num')!.textContent).toBe('2');
    expect(document.querySelector('.card-stat--missed .card-stat-num')!.textContent).toBe('1');
    click('Study missed only (1)');
    expect(counter()).toBe('0 / 1 got');
    expect(shownId()).toBe('card-derivatives-01');
    flip();
    grade('Got it');

    expect(screen.queryByRole('button', { name: /Study missed only/ })).toBeNull();
    click('Study again');
    expect(counter()).toBe('0 / 1 got');
    flip();
    grade('Got it');
    click('Home');
    expect(onHome).toHaveBeenCalledTimes(1);
  });

  it('the counter opens the filters; Resume continues; missed-only picks the last-missed cards', () => {
    renderCards();
    startInOrder();
    flip();
    grade('Missed it');
    fireEvent.click(document.querySelector('.cards-counter')!);
    expect(switchEl(/Missed only/).textContent).toContain('(1)');
    click('Resume (0 / 7 got)');
    expect(shownId()).toBe('card-derivatives-02');

    fireEvent.click(document.querySelector('.cards-counter')!);
    fireEvent.click(switchEl(/Missed only/));
    expect(screen.getByText('1 card selected')).toBeTruthy();
    click('New session (1 card)');
    expect(counter()).toBe('0 / 1 got');
    expect(shownId()).toBe('card-derivatives-01');
  });

  it('the tap guard: the flip tap cannot also grade, and a grade tap cannot flip the next card', () => {
    let t = 10_000;
    vi.spyOn(performance, 'now').mockImplementation(() => t);
    renderCards();
    startInOrder();
    t += 1000;
    tap(cardEl()!);
    expect(side()).toBe('back');
    t += 100;
    tap(cardEl()!); // second half of a double tap: no flip back
    expect(side()).toBe('back');
    tap(button('Got it')); // ...nor a grade
    expect(counter()).toBe('0 / 7 got');
    t += TAP_GUARD_MS;
    tap(button('Got it'));
    expect(counter()).toBe('1 / 7 got');
    t += 100;
    tap(button('Show answer')); // twin of the grade tap lands on the next card's dock
    tap(cardEl()!);
    expect(side()).toBe('front');
    t += TAP_GUARD_MS;
    tap(button('Show answer'));
    expect(side()).toBe('back');
  });

  it('works with storage unavailable (in-memory fallback)', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });
    const { unmount } = renderCards();
    startInOrder();
    flip();
    grade('Missed it');
    flip();
    grade('Got it');
    expect(counter()).toBe('1 / 7 got');
    unmount();
    renderCards();
    expect(switchEl(/Shuffle/).getAttribute('aria-checked')).toBe('false');
    expect(switchEl(/Missed only/).textContent).toContain('(1)');
  });
});

describe('reset', () => {
  function seed(filters?: Partial<CardState['filters']>) {
    let s = defaultCardState();
    if (filters) s = withFilters(s, { ...s.filters, ...filters });
    s = recordCardResult(s, 'card-derivatives-01', 'missed', 1);
    s = recordCardResult(s, 'card-antiderivatives-05', 'missed', 2);
    s = recordCardResult(s, 'card-half-angle-01', 'got', 3);
    localStorage.setItem(CARDS_KEY, JSON.stringify(s));
  }

  it('with a section filter resets only the filtered cards; without one, every card', () => {
    seed({ sections: ['derivatives'] });
    renderCards();
    click('Reset 2 filtered cards');
    click('Tap again to reset');
    expect(Object.keys(stored().cards).sort()).toEqual(['card-antiderivatives-05', 'card-half-angle-01']);
    expect(screen.getByText('2 cards reset.')).toBeTruthy();
    click('All');
    click('Reset all 7 cards');
    click('Tap again to reset');
    expect(stored().cards).toEqual({});
    expect(stored().filters.sections).toHaveLength(9);
  });

  it('with missed-only on resets only the missed cards', () => {
    seed({ missedOnly: true });
    renderCards();
    click('Reset 2 filtered cards');
    click('Tap again to reset');
    expect(Object.keys(stored().cards)).toEqual(['card-half-angle-01']);
    expect(button('Reset 0 filtered cards')).toHaveProperty('disabled', true);
  });

  it('ignores a confirm tap within the guard window, and Cancel keeps everything', () => {
    let t = 5000;
    vi.spyOn(performance, 'now').mockImplementation(() => t);
    seed();
    renderCards();
    tap(button('Reset all 7 cards'));
    t += 100;
    tap(button('Tap again to reset')); // second half of a double tap
    expect(Object.keys(stored().cards)).toHaveLength(3);
    expect(button('Tap again to reset')).toBeTruthy(); // still armed
    click('Cancel');
    expect(Object.keys(stored().cards)).toHaveLength(3);
    tap(button('Reset all 7 cards'));
    t += RESET_CONFIRM_GUARD_MS + 50;
    tap(button('Tap again to reset'));
    expect(stored().cards).toEqual({});
  });
});

describe('front framing per kind', () => {
  const front = (id: string) => {
    const { container, unmount } = render(<Flashcard card={byId(id)} flipped={false} onFlip={() => {}} />);
    const out = {
      math: texOf(container, '.fc-front .fc-math'),
      text: container.querySelector('.fc-front .fc-text')?.textContent ?? null,
      inline: texOf(container, '.fc-front .fc-text'),
    };
    unmount();
    return out;
  };

  it('derivative d/dx[…], antiderivative ∫…dx, identity LHS = ?', () => {
    expect(front('card-derivatives-02').math).toBe('\\frac{d}{dx}\\left[\\tan x\\right]');
    expect(front('card-antiderivatives-05').math).toBe('\\int \\tan x\\,dx');
    expect(front('card-half-angle-01').math).toBe('\\sin^2 x = \\,?');
  });

  it('trig-sub and formula cards show the text with inline math', () => {
    const ts = front('card-trig-sub-02');
    expect(ts.math).toBeNull();
    expect(ts.text).toContain('dx when');
    expect(ts.inline).toBe('x = a\\sin\\theta');
    const al = front('card-arc-length-01');
    expect(al.text).toContain('Arc length in terms of');
    expect(al.inline).toBe('x');
  });

  it('the back shows the answer in display math inside a scroll container', () => {
    const { container } = render(<Flashcard card={byId('card-area-volume-02')} flipped onFlip={() => {}} />);
    const answer = container.querySelector('.fc-answer')!;
    expect(answer.classList.contains('math-scroll')).toBe(true);
    expect(answer.querySelector('.katex-display')).not.toBeNull();
    expect(texOf(container, '.fc-answer')).toBe(byId('card-area-volume-02').back.latex);
  });
});

describe('navigation', () => {
  it('Home has a Cards button next to the three modes; Cards has a Home button', () => {
    render(<App content={makeContent({ 'diff-review': { flash: 3 } })} rng={mulberry32(3)} now={() => NOW} />);
    for (const name of [/Flash Drill/, /Step-Through/, /Review/]) expect(button(name)).toBeTruthy();
    click(/^Cards/);
    expect(screen.getByRole('heading', { name: /Sections/ })).toBeTruthy();
    click('Study 7 cards');
    expect(counter()).toBe('0 / 7 got');
    expect(fixture.cards.map((c) => c.id)).toContain(shownId());
    click('Home');
    expect(document.querySelector('.home')).not.toBeNull();
    click(/Flash Drill/);
    expect(document.querySelectorAll('.opt').length).toBeGreaterThanOrEqual(5); // the other modes still work
  });
});
