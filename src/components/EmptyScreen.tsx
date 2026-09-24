/** Friendly fallback when a screen has nothing to show (never a crash). */
import { TopBar } from './TopBar';

export function EmptyScreen({ title, message, onHome }: { title: string; message: string; onHome: () => void }) {
  return (
    <div className="screen-page">
      <TopBar title={title} onHome={onHome} />
      <main className="page page--center">
        <p className="empty-message">{message}</p>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onHome}>
          Back to Home
        </button>
      </main>
    </div>
  );
}
