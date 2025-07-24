import { AlertTriangle } from "lucide-react";
import type { ErrorInfo, ReactNode } from "react";
import React, { Component } from "react";
import { announcer } from "@/components/glass-live-region";
import { errorTracking } from "@/core/error-tracking";
import { cn } from "@/core/utils/classname";

export interface GlassErrorBoundaryProps {
	children: ReactNode;
	fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	resetKeys?: (string | number)[];
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
	private previousResetKeys: (string | number)[] = [];

	constructor(props: GlassErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: undefined,
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
		this.setState((prevState) => ({
			errorInfo,
			errorCount: prevState.errorCount + 1,
		}));

		// Track error in production
		if (trackErrors && "production" === process.env.NODE_ENV) {
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
		if ("development" === process.env.NODE_ENV) {
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
		if (3 <= this.state.errorCount) {
			this.scheduleReset(5000);
		}
	}

	componentDidUpdate(prevProps: GlassErrorBoundaryProps) {
		const { resetKeys, resetOnPropsChange } = this.props;
		const { hasError } = this.state;

		// Reset on prop changes if enabled
		if (
			hasError &&
			resetOnPropsChange &&
			prevProps.children !== this.props.children
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

	arraysEqual(a: (string | number)[], b: (string | number)[]): boolean {
		return a.length === b.length && a.every((val, index) => val === b[index]);
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
			errorInfo: undefined,
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
							"min-h-screen": "page" === level,
							"min-h-[400px]": "section" === level,
							"min-h-[200px]": "component" === level,
						},
						className,
					)}
					role="alert"
					aria-live="assertive"
				>
					<div className="flex flex-col items-center justify-center text-center space-y-4">
						<AlertTriangle className="h-12 w-12 text-destructive animate-pulse" />

						<div className="space-y-2">
							<h3 className="text-lg font-semibold text-primary">
								{"page" === level && "Page Error"}
								{"section" === level && "Section Error"}
								{"component" === level && "Component Error"}
							</h3>

							<p className="text-sm text-secondary max-w-md">
								{"production" === process.env.NODE_ENV
									? "Something went wrong. Please try refreshing the page."
									: error.message}
							</p>
						</div>

						<div className="flex gap-2">
							<button
								onClick={this.resetErrorBoundary}
								className="glass-button-primary px-4 py-2 rounded-lg"
								aria-label="Retry loading the content"
							>
								Try Again
							</button>

							{"page" === level && (
								<button
									onClick={() => window.location.reload()}
									className="glass-button-secondary px-4 py-2 rounded-lg"
									aria-label="Reload the entire page"
								>
									Reload Page
								</button>
							)}
						</div>

						{"development" === process.env.NODE_ENV && errorInfo && (
							<details className="mt-4 text-left max-w-2xl w-full">
								<summary className="cursor-pointer text-sm text-secondary hover:text-primary">
									Error Details
								</summary>
								<pre className="mt-2 text-xs bg-black/10 p-4 rounded-lg overflow-auto">
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
	const [error, setError] = React.useState<Error | null | null>(null);

	const resetError = React.useCallback(() => {
		setError(undefined);
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
