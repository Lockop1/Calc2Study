/**
 * App shell: a small screen state machine (no router).
 *   home → flash | steps | review → summary → (review misses | another round | home)
 *   home → settings → home
 * Settings and progress are loaded once, kept in state, and saved on every change.
 */
import type { TopicContent, TopicId } from '@content/types';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getContent, usingSampleContent } from './lib/content-source';
import { buildReviewRound, dueUnitIds, recordAnswer, type Progress } from './lib/progress';
import type { Rng } from './lib/rng';
import { buildFlashRound, buildStepRound } from './lib/round';
import type { Mode, RoundResult } from './lib/session';
import { defaultSettings, normalizeTopics, toggleTopic, type RoundSize, type Settings } from './lib/settings';
import { loadProgress, loadSettings, resetProgress, saveProgress, saveSettings, storageAvailable } from './lib/storage';
import { flashItemsFor, generatorsFor, problemsFor } from './lib/units';
import { DrillScreen } from './screens/DrillScreen';
import { HomeScreen, type Availability } from './screens/HomeScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { StepThroughScreen } from './screens/StepThroughScreen';
import { SummaryScreen } from './screens/SummaryScreen';

export type Screen =
  | { name: 'home' }
  | { name: 'flash'; key: number; unitIds: string[] }
  | { name: 'steps'; key: number; problemIds: string[] }
  | { name: 'review'; key: number; unitIds: string[] }
  | { name: 'summary'; result: RoundResult }
  | { name: 'settings' };

export interface AppProps {
  /** Content to play (tests inject fixtures); defaults to `getContent()`. */
  content?: readonly TopicContent[];
  rng?: Rng;
  now?: () => number;
}

const EMPTY_MESSAGES: Record<Mode, string> = {
  flash: 'No Flash Drill questions for the selected topics yet. Try adding topics.',
  steps: 'No Step-Through problems for the selected topics yet. Try adding topics.',
  review: 'Nothing to review for the selected topics. Questions you miss will show up here.',
};

function scrollToTop(): void {
  try {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  } catch {
    // ignore (non-browser environments)
  }
}

export default function App({ content: contentProp, rng = Math.random, now = Date.now }: AppProps) {
  const content = contentProp ?? getContent();
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const progressRef = useRef(progress);
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  const [notice, setNotice] = useState<string | null>(null);
  const roundCounter = useRef(0);

  const go = useCallback((next: Screen) => {
    setScreen(next);
    scrollToTop();
  }, []);

  const goHome = useCallback(
    (message: string | null = null) => {
      setNotice(message);
      go({ name: 'home' });
    },
    [go],
  );

  const updateSettings = useCallback((next: Settings) => {
    setSettings(next);
    saveSettings(next);
  }, []);

  const handleAnswer = useCallback(
    (unitId: string, correct: boolean) => {
      const next = recordAnswer(progressRef.current, unitId, correct, now());
      progressRef.current = next;
      setProgress(next);
      saveProgress(next);
    },
    [now],
  );

  const startRound = (mode: Mode, onlyIds?: readonly string[]) => {
    const topics = settings.topics;
    if (topics.length === 0) {
      goHome('Pick at least one topic first.');
      return;
    }
    const base = { topics, size: settings.roundSize, progress: progressRef.current, rng, now: now(), content };
    let next: Screen | null = null;
    if (mode === 'flash') {
      const unitIds = buildFlashRound(base);
      if (unitIds.length > 0) next = { name: 'flash', key: ++roundCounter.current, unitIds };
    } else if (mode === 'steps') {
      const problemIds = buildStepRound(base);
      if (problemIds.length > 0) next = { name: 'steps', key: ++roundCounter.current, problemIds };
    } else {
      const size = onlyIds ? onlyIds.length : settings.roundSize;
      const unitIds = buildReviewRound({ ...base, onlyIds, size });
      if (unitIds.length > 0) next = { name: 'review', key: ++roundCounter.current, unitIds };
    }
    if (next) {
      setNotice(null);
      go(next);
    } else {
      goHome(EMPTY_MESSAGES[mode]);
    }
  };

  const finishRound = useCallback((result: RoundResult) => go({ name: 'summary', result }), [go]);

  const availability = useMemo<Availability>(
    () => ({
      flash: flashItemsFor(settings.topics, content).length + generatorsFor(settings.topics, content).length,
      steps: problemsFor(settings.topics, content).length,
      due: dueUnitIds({ topics: settings.topics, progress, content }).length,
    }),
    [settings.topics, progress, content],
  );

  switch (screen.name) {
    case 'flash':
    case 'review':
      return (
        <DrillScreen
          key={screen.key}
          mode={screen.name}
          roundKey={screen.key}
          unitIds={screen.unitIds}
          content={content}
          onAnswer={handleAnswer}
          onFinish={finishRound}
          onHome={() => goHome()}
        />
      );
    case 'steps':
      return (
        <StepThroughScreen
          key={screen.key}
          roundKey={screen.key}
          problemIds={screen.problemIds}
          content={content}
          onAnswer={handleAnswer}
          onFinish={finishRound}
          onHome={() => goHome()}
        />
      );
    case 'summary':
      return (
        <SummaryScreen
          result={screen.result}
          onReviewMisses={(ids) => startRound('review', ids)}
          onAnotherRound={() => startRound(screen.result.mode)}
          onHome={() => goHome()}
        />
      );
    case 'settings':
      return (
        <SettingsScreen
          roundSize={settings.roundSize}
          missedCount={dueUnitIds({ topics: defaultSettings().topics, progress, content }).length}
          storageOk={storageAvailable()}
          onRoundSize={(roundSize: RoundSize) => updateSettings({ ...settings, roundSize })}
          onResetProgress={() => {
            const empty = resetProgress();
            progressRef.current = empty;
            setProgress(empty);
          }}
          onHome={() => goHome()}
        />
      );
    case 'home':
    default:
      return (
        <HomeScreen
          selected={settings.topics}
          availability={availability}
          notice={notice}
          devNote={import.meta.env.DEV && !contentProp && usingSampleContent() ? 'Dev: showing sample content' : null}
          onToggleTopic={(id: TopicId) => {
            setNotice(null);
            updateSettings({ ...settings, topics: toggleTopic(settings.topics, id) });
          }}
          onSelectAll={() => {
            setNotice(null);
            updateSettings({ ...settings, topics: normalizeTopics(defaultSettings().topics) });
          }}
          onSelectNone={() => {
            setNotice(null);
            updateSettings({ ...settings, topics: [] });
          }}
          onStart={startRound}
          onSettings={() => {
            setNotice(null);
            go({ name: 'settings' });
          }}
        />
      );
  }
}
