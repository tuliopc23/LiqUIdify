import { AlertTriangle } from "lucide-react";
import React, { Component, type ErrorInfo, type ReactNode } from "react";

import { announcer } from "@/components/glass-live-region";

import { errorTracking } from "@/core/error-tracking";

import { cn } from "@/core/utils/classname";

export interface GlassErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: string | Array<number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: "page" | "section" | "component";
  className?: string;
  componentName?: string;
  trackErrors?: boolean;
}

interface GlassErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

export class GlassErrorBoundary extends Component<
  GlassErrorBoundaryProps,
  GlassErrorBoundaryState
> {
  private resetTimeoutId: NodeJS.Timeout | null = null;
  private previousResetKeys: string | Array<number> = [];

  constructor(props: GlassErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,

      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(
    error: Error,
  ): Partial<GlassErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const {
      onError,
      level = "component",
      componentName,
      trackErrors = true,
    } = this.props;

    // Update state with error info
    this.setState((previousState) => ({
      errorInfo,
      errorCount: previousState.errorCount + 1,
    }));

    // Track error in production
    if (trackErrors && process.env.NODE_ENV === "production") {
      errorTracking.trackError(error, errorInfo, {
        component: componentName || "Unknown",
        action: "component-error",
        tags: {
          level,
          errorCount: String(this.state.errorCount + 1),
        },
        extra: {
          componentStack: errorInfo.componentStack,
        },
      });
    }

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      // Logging disabled
    }

    // Call error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // Announce error to screen readers
    announcer.announce(
      `An error occurred in the ${level}. The content may not display correctly.`,
      { priority: "high", context: "error" },
    );

    // Auto-recover after multiple errors (circuit breaker pattern)
    if (this.state.errorCount >= 3) {
      this.scheduleReset(5000);
    }
  }

  componentDidUpdate(prevProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset on prop changes if enabled
    if (
      hasError &&
      resetOnPropsChange &&
      previousProps.children !== this.props.children
    ) {
      this.resetErrorBoundary();
    }

    // Reset on resetKeys change
    if (
      hasError &&
      resetKeys &&
      !this.arraysEqual(resetKeys, this.previousResetKeys)
    ) {
      this.resetErrorBoundary();
    }

    this.previousResetKeys = resetKeys || [];
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  arraysEqual(a: string | Array<number>, b: string | Array<number>): boolean {
    return (
      a.length === b.length && a.every((value, index) => value === b[index])
    );
  }

  scheduleReset = (delay: number) => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = setTimeout(() => {
      this.resetErrorBoundary();
    }, delay);
  };

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }

    this.setState({
      hasError: false,
      error: null,

      errorInfo: null,
      errorCount: 0,
    });

    announcer.announce("Error recovered. Content restored.", {
      priority: "medium",
      context: "success",
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const {
      children,
      fallback,
      isolate = true,
      level = "component",
      className,
    } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return <>{fallback(error, errorInfo!)}</>;
      }

      // Default error UI
      return (
        <div
          className={cn(
            "glass-error-boundary",
            "glass-effect rounded-lg p-6",
            {
              "min-h-screen": level === "page",
              "min-h-[400px]": level === "section",
              "min-h-[200px]": level === "component",
            },
            className,
          )}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <AlertTriangle className="h-12 w-12 animate-pulse text-destructive" />

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-primary">
                {level === "page" && "Page Error"}
                {level === "section" && "Section Error"}
                {level === "component" && "Component Error"}
              </h3>

              <p className="max-w-md text-secondary text-sm">
                {process.env.NODE_ENV === "production"
                  ? "Something went wrong. Please try refreshing the page."
                  : error.message}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={this.resetErrorBoundary}
                className="glass-button-primary rounded-lg px-4 py-2"
                aria-label="Retry loading the content"
              >
                Try Again
              </button>

              {level === "page" && (
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="glass-button-secondary rounded-lg px-4 py-2"
                  aria-label="Reload the entire page"
                >
                  Reload Page
                </button>
              )}
            </div>

            {process.env.NODE_ENV === "development" && errorInfo && (
              <details className="mt-4 w-full max-w-2xl text-left">
                <summary className="cursor-pointer text-secondary text-sm hover:text-primary">
                  Error Details
                </summary>

                <pre className="mt-2 overflow-auto rounded-lg bg-black/10 p-4 text-xs">
                  {errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    // Wrap children in an isolating container if needed
    if (isolate) {
      return <div className="glass-error-boundary-container">{children}</div>;
    }

    return <>{children}</>;
  }
}

// Hook for error handling in functional components
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  // Throw error to be caught by error boundary
  if (error) {
    throw error;
  }

  return { captureError, resetError };
}

// Async error boundary for handling async errors
export function GlassAsyncErrorBoundary({
  children,
  ...props
}: GlassErrorBoundaryProps) {
  const { captureError } = useErrorHandler();

  React.useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      captureError(new Error(event.reason));
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, [captureError]);

  return <GlassErrorBoundary {...props}>{children}</GlassErrorBoundary>;
}
