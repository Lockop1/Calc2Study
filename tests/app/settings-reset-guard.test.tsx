// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { SettingsScreen, RESET_CONFIRM_GUARD_MS } from '../../src/screens/SettingsScreen';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function renderSettings(onResetProgress: () => void) {
  render(
    <SettingsScreen roundSize={10} missedCount={5} storageOk={true} onRoundSize={() => {}} onResetProgress={onResetProgress} onHome={() => {}} />,
  );
}

describe('Reset progress two-tap confirm', () => {
  it('ignores a confirm tap that arrives right after arming (accidental double tap)', () => {
    let now = 1000;
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    const onReset = vi.fn();
    renderSettings(onReset);
    fireEvent.click(screen.getByText('Reset progress'), { detail: 1 });
    now += 100; // second tap of a double tap
    fireEvent.click(screen.getByText('Tap again to erase'), { detail: 1 });
    expect(onReset).not.toHaveBeenCalled();
    expect(screen.getByText('Tap again to erase')).toBeTruthy(); // still armed
  });

  it('erases on a deliberate second tap after the guard window', () => {
    let now = 1000;
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    const onReset = vi.fn();
    renderSettings(onReset);
    fireEvent.click(screen.getByText('Reset progress'), { detail: 1 });
    now += RESET_CONFIRM_GUARD_MS + 50;
    fireEvent.click(screen.getByText('Tap again to erase'), { detail: 1 });
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Progress cleared.')).toBeTruthy();
  });
});
