/** Settings: round size, reset progress (two-tap confirm), storage status, version, offline note. */
import { useState } from 'react';
import { TopBar } from '../components/TopBar';
import { RETIRE_AFTER } from '../lib/progress';
import { ROUND_SIZES, type RoundSize } from '../lib/settings';
import { APP_VERSION } from '../lib/version';

export interface SettingsScreenProps {
  roundSize: RoundSize;
  missedCount: number;
  storageOk: boolean;
  onRoundSize: (size: RoundSize) => void;
  onResetProgress: () => void;
  onHome: () => void;
}

export function SettingsScreen({ roundSize, missedCount, storageOk, onRoundSize, onResetProgress, onHome }: SettingsScreenProps) {
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  return (
    <div className="screen-page">
      <TopBar title="Settings" onHome={onHome} />
      <main className="page settings">
        <section aria-labelledby="size-heading">
          <h2 id="size-heading" className="section-title">
            Round size
          </h2>
          <div className="segmented" role="group" aria-labelledby="size-heading">
            {ROUND_SIZES.map((n) => (
              <button key={n} type="button" aria-pressed={roundSize === n} onClick={() => onRoundSize(n)}>
                {n}
              </button>
            ))}
          </div>
          <p className="muted small">Questions per Flash Drill and Review round; steps per Step-Through round.</p>
        </section>

        <section aria-labelledby="progress-heading">
          <h2 id="progress-heading" className="section-title">
            Progress
          </h2>
          <p className="small">
            {missedCount === 0
              ? 'No missed questions are being tracked.'
              : `${missedCount} missed ${missedCount === 1 ? 'question is' : 'questions are'} in your Review deck.`}{' '}
            {`A question leaves Review after ${RETIRE_AFTER} correct answers in a row.`}
          </p>
          {confirming ? (
            <div className="confirm-row">
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={() => {
                  onResetProgress();
                  setConfirming(false);
                  setCleared(true);
                }}
              >
                Tap again to erase
              </button>
              <button type="button" className="btn btn-lg" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-lg btn-block btn-danger-outline"
              onClick={() => {
                setConfirming(true);
                setCleared(false);
              }}
            >
              Reset progress
            </button>
          )}
          <p className="small" role="status">
            {confirming ? 'This erases every miss and your review history on this device.' : cleared ? 'Progress cleared.' : ''}
          </p>
        </section>

        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className="section-title">
            About
          </h2>
          <p className="small">
            <span className={`status-dot ${storageOk ? 'status-dot--ok' : 'status-dot--bad'}`} aria-hidden="true" />
            {storageOk
              ? 'Progress is saved on this device.'
              : 'Storage is unavailable here (private browsing?). Progress lasts until you close the app.'}
          </p>
          <p className="small">
            Works offline: after the first visit everything runs without a connection. Add it to your Home Screen to use it
            like an app.
          </p>
          <p className="small muted">Version {APP_VERSION}</p>
        </section>
      </main>
    </div>
  );
}
