import { Component, type ReactNode, type ErrorInfo } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught rendering exception:', error, errorInfo);
    }
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="relative flex min-h-[360px] w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0c0915] p-8 text-center shadow-2xl"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-white">
            {this.props.fallbackTitle || 'Component Encountered an Issue'}
          </h3>
          <p className="mt-2 max-w-md text-sm text-gray-400">
            Our autonomous monitoring caught a visual rendering glitch. The rest of the platform remains safe and functional.
          </p>
          {this.state.error && import.meta.env.DEV && (
            <pre className="mt-4 max-w-lg overflow-x-auto rounded-lg bg-black/50 p-3 text-left text-xs text-red-300/80">
              {this.state.error.message}
            </pre>
          )}
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-violet-400/40 bg-violet-600/20 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-violet-600/30 active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reload Component</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
