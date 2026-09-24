/**
 * Persistence for settings and progress. Every localStorage access is wrapped in try/catch; when
 * storage is missing, blocked (private mode, disabled cookies), or full, values live in an
 * in-memory fallback for the rest of the session, so the app always works.
 */
import { clearCardProgress, defaultCardState, sanitizeCardState, type CardState } from './cards';
import { emptyProgress, pruneProgress, sanitizeProgress, type Progress } from './progress';
import { defaultSettings, sanitizeSettings, type Settings } from './settings';

export const SETTINGS_KEY = 'calc2study:settings';
export const PROGRESS_KEY = 'calc2study:progress';
export const CARDS_KEY = 'calc2study:cards';
const PROBE_KEY = 'calc2study:probe';

/** Values whose last write could not reach localStorage (newer than whatever is stored there). */
const memory = new Map<string, string>();

function storage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage ?? null; // the getter itself throws when storage is blocked
  } catch {
    return null;
  }
}

function readRaw(key: string): string | null {
  const pending = memory.get(key);
  if (pending !== undefined) return pending;
  try {
    return storage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

/** Returns true when the value reached localStorage, false when it only lives in memory. */
function writeRaw(key: string, value: string): boolean {
  try {
    const s = storage();
    if (s) {
      s.setItem(key, value);
      memory.delete(key);
      return true;
    }
  } catch {
    // quota exceeded, private browsing, storage disabled: fall through to memory
  }
  memory.set(key, value);
  return false;
}

function removeRaw(key: string): boolean {
  memory.delete(key);
  try {
    const s = storage();
    if (!s) return false;
    s.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function readJson(key: string): unknown {
  const raw = readRaw(key);
  if (raw === null) return undefined;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined; // unparseable data is ignored
  }
}

/** Whether localStorage can actually be written right now (shown on the Settings screen). */
export function storageAvailable(): boolean {
  try {
    const s = storage();
    if (!s) return false;
    s.setItem(PROBE_KEY, '1');
    s.removeItem(PROBE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function loadSettings(): Settings {
  const raw = readJson(SETTINGS_KEY);
  return raw === undefined ? defaultSettings() : sanitizeSettings(raw);
}

export function saveSettings(settings: Settings): boolean {
  return writeRaw(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadProgress(now: number = Date.now()): Progress {
  const raw = readJson(PROGRESS_KEY);
  return raw === undefined ? emptyProgress() : pruneProgress(sanitizeProgress(raw), now);
}

export function saveProgress(progress: Progress): boolean {
  return writeRaw(PROGRESS_KEY, JSON.stringify(progress));
}

/** Erases all progress (misses, history). Returns the new, empty progress. */
export function resetProgress(): Progress {
  const empty = emptyProgress();
  if (!removeRaw(PROGRESS_KEY)) memory.set(PROGRESS_KEY, JSON.stringify(empty));
  return empty;
}

/** Cards mode: per-card results and the filter choices. */
export function loadCardState(): CardState {
  const raw = readJson(CARDS_KEY);
  return raw === undefined ? defaultCardState() : sanitizeCardState(raw);
}

export function saveCardState(state: CardState): boolean {
  return writeRaw(CARDS_KEY, JSON.stringify(state));
}

/**
 * Erases card results: only `ids` when given (the filtered cards), otherwise every card. The filter
 * choices are kept. Returns the new state (already saved).
 */
export function resetCardState(state: CardState, ids?: readonly string[] | null): CardState {
  const next = clearCardProgress(state, ids);
  saveCardState(next);
  return next;
}

/** Test helper: forget values held by the in-memory fallback. */
export function clearMemoryFallback(): void {
  memory.clear();
}
