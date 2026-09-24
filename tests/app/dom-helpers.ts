/** Helpers for jsdom tests of the question screens. */
import { fireEvent, screen } from '@testing-library/react';

export function optionButtons(): HTMLButtonElement[] {
  return Array.from(document.querySelectorAll<HTMLButtonElement>('.opt'));
}

/** Clicks the option whose visible text starts with `prefix` ("Correct …" / "Wrong …"). */
export function clickOption(prefix: string): HTMLButtonElement {
  const button = optionButtons().find((b) => (b.querySelector('.opt-body')?.textContent ?? '').startsWith(prefix));
  if (!button) throw new Error(`no option starting with "${prefix}"`);
  fireEvent.click(button);
  return button;
}

export function clickButton(name: RegExp | string): void {
  fireEvent.click(screen.getByRole('button', { name }));
}

export function feedback(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.feedback');
}

export function counterText(): string {
  return document.querySelector('.topbar-meta')?.textContent ?? '';
}
