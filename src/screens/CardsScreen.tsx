/**
 * Cards mode (flashcards): filter panel → study session (flip, grade) → summary.
 *
 * Card results and filter choices persist under `calc2study:cards` (lib/storage.ts; in-memory
 * fallback when storage is unavailable) and every grade is saved immediately. The session queue
 * lives in memory: opening the filters mid-session keeps it, so it can be resumed.
 */
import { CARDS, CARD_SECTIONS } from '@content/index';
import type { Card } from '@content/types';
import { useMemo, useRef, useState } from 'react';
import { CardFilterPanel } from '../components/CardFilterPanel';
import { CardStudy } from '../components/CardStudy';
import { CardSummary } from '../components/CardSummary';
import {
  currentCardId,
  gradeCurrent,
  inDeckOrder,
  isSessionDone,
  recordCardResult,
  sessionCounter,
  startSession,
  summarizeSession,
  withFilters,
  type CardResult,
  type CardSectionInfo,
  type CardSession,
  type CardState,
} from '../lib/cards';
import type { Rng } from '../lib/rng';
import { loadCardState, resetCardState, saveCardState } from '../lib/storage';

export interface CardsScreenProps {
  /** The deck (tests inject fixtures); defaults to `CARDS` from the content aggregate. */
  cards?: readonly Card[];
  /** Filter chips; defaults to `CARD_SECTIONS`. */
  sections?: readonly CardSectionInfo[];
  rng?: Rng;
  now?: () => number;
  onHome: () => void;
}

type View = 'filters' | 'study' | 'summary';

function scrollToTop(): void {
  try {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  } catch {
    // ignore (non-browser environments)
  }
}

export function CardsScreen({ cards = CARDS, sections = CARD_SECTIONS, rng = Math.random, now = Date.now, onHome }: CardsScreenProps) {
  const [state, setState] = useState<CardState>(() => loadCardState());
  const stateRef = useRef(state);
  const [session, setSessionState] = useState<CardSession | null>(null);
  const sessionRef = useRef(session);
  const [view, setView] = useState<View>('filters');
  const [shown, setShown] = useState(0); // +1 for every card shown: keys the study view
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);

  const commit = (next: CardState, save = true) => {
    stateRef.current = next;
    setState(next);
    if (save) saveCardState(next);
  };
  const setSession = (next: CardSession) => {
    sessionRef.current = next;
    setSessionState(next);
  };
  const show = (next: View) => {
    setView(next);
    scrollToTop();
  };

  const begin = (ids: readonly string[]) => {
    const playable = ids.filter((id) => byId.has(id));
    if (playable.length === 0) return;
    setSession(startSession(playable, { shuffle: stateRef.current.filters.shuffle, rng }));
    setShown((n) => n + 1);
    show('study');
  };

  const grade = (result: CardResult) => {
    const current = sessionRef.current;
    const id = current ? currentCardId(current) : null;
    if (!current || id === null) return;
    commit(recordCardResult(stateRef.current, id, result, now())); // saved per grade
    const next = gradeCurrent(current, result);
    setSession(next);
    setShown((n) => n + 1);
    if (isSessionDone(next)) show('summary');
  };

  if (view === 'summary' && session) {
    return (
      <CardSummary
        summary={summarizeSession(session)}
        onStudyMissed={() => begin(inDeckOrder(cards, session.missed))}
        onStudyAgain={() => begin(inDeckOrder(cards, session.ids))}
        onHome={onHome}
      />
    );
  }

  const active = session && !isSessionDone(session) ? session : null;
  const currentId = active ? currentCardId(active) : null;
  const card = currentId === null ? undefined : byId.get(currentId);
  if (view === 'study' && active && card) {
    return (
      <CardStudy
        key={shown}
        card={card}
        counter={sessionCounter(active)}
        onGrade={grade}
        onFilters={() => show('filters')}
        onHome={onHome}
      />
    );
  }

  return (
    <CardFilterPanel
      cards={cards}
      sections={sections}
      state={state}
      resume={active ? sessionCounter(active) : null}
      onFilters={(filters) => commit(withFilters(stateRef.current, filters))}
      onReset={(ids) => commit(resetCardState(stateRef.current, ids), false)}
      onStart={begin}
      onResume={() => show('study')}
      onHome={onHome}
    />
  );
}
