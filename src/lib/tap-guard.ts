/**
 * Double-tap protection. Every screen-changing button lives in the thumb zone at the bottom, so the
 * second tap of an impatient double tap lands on whatever appears there next (the next question's
 * options, the Next button before the feedback was read, a Summary action). Pointer taps within
 * TAP_GUARD_MS of a control appearing are ignored; keyboard activation (click.detail === 0) and
 * programmatic clicks always pass.
 */
import { useCallback, useRef } from 'react';

export const TAP_GUARD_MS = 350;

/** Returns `isTooSoon(event)`: true for a pointer tap that arrives within `ms` of the first render. */
export function useTapGuard(ms: number = TAP_GUARD_MS): (event: { detail: number }) => boolean {
  const shownAt = useRef<number>(performance.now());
  return useCallback((event: { detail: number }) => event.detail > 0 && performance.now() - shownAt.current < ms, [ms]);
}
