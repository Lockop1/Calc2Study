import { isMistakeId, MISTAKES } from '@content/mistakes';

/** Human-readable label of a mistake tag, or null for a missing/unknown tag. */
export function mistakeLabel(id: string | undefined): string | null {
  return id && isMistakeId(id) ? MISTAKES[id].label : null;
}
