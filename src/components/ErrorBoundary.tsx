/**
 * Last line of defence against malformed content: if a screen throws while rendering, show a
 * friendly message with a way home instead of a blank page. Progress is saved per answer, so
 * nothing is lost. App keys this boundary by the current screen, so it resets on navigation.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { EmptyScreen } from './EmptyScreen';

interface ErrorBoundaryProps {
  onHome: () => void;
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) console.error('Screen crashed', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <EmptyScreen
          title="Something went wrong"
          message="This screen could not be shown. Your progress is saved."
          onHome={this.props.onHome}
        />
      );
    }
    return this.props.children;
  }
}
