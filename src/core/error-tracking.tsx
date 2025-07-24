/**
 * S-tier Error Tracking System
 * Production-grade error monitoring with Sentry integration
 */

import type { ErrorInfo, ReactNode } from "react";

export interface ErrorMetadata {
	component?: string;
	action?: string;
	userId?: string;
	sessionId?: string;
	buildVersion?: string;
	environment?: "development" | "staging" | "production";
	tags?: Record<string, string>;
	extra?: Record<string, any>;
}

export interface ErrorReport {
	error: Error;
	errorInfo?: ErrorInfo;
	metadata?: ErrorMetadata;
	timestamp: number;
	id: string;
}

export interface ErrorTrackingConfig {
	dsn?: string;
	environment?: string;
	enabled?: boolean;
	sampleRate?: number;
	tracesSampleRate?: number;
	beforeSend?: (event: any, hint: any) => any;
	integrations?: any[];
}

class ErrorTrackingSystem {
	private static instance: ErrorTrackingSystem;
	private sentry: any = undefined;
	private __config: ErrorTrackingConfig = {};
	private errorQueue: ErrorReport[] = [];
	private isInitialized = false;

	private constructor() {}

	static getInstance(): ErrorTrackingSystem {
		if (!ErrorTrackingSystem.instance) {
			ErrorTrackingSystem.instance = new ErrorTrackingSystem();
		}
		return ErrorTrackingSystem.instance;
	}

	/**
	 * Initialize error tracking with Sentry
	 */
	async initialize(_config: ErrorTrackingConfig): Promise<void> {
		this.__config = _config;

		if (!_config.enabled || !_config.dsn) {
			console.info(
				"[ErrorTracking] Error tracking disabled or no DSN provided",
			);
			return;
		}

		try {
			// Dynamically import Sentry to avoid bundle bloat
			const Sentry = await import("@sentry/react");

			const integrations = [...(_config.integrations || [])];

			// Add browser tracing integration if performance monitoring is enabled
			if (_config.tracesSampleRate && 0 < _config.tracesSampleRate) {
				integrations.push(Sentry.browserTracingIntegration());
			}

			Sentry.init({
				dsn: _config.dsn,
				environment: _config.environment || "production",
				sampleRate: _config.sampleRate || 1,
				tracesSampleRate: _config.tracesSampleRate || 0.1,

				integrations,

				beforeSend:
					_config.beforeSend ||
					((event, _hint) => {
						// Filter out known non-critical errors
						if ("NetworkError" === event.exception?.values?.[0]?.type) {
							return;
						}

						// Sanitize sensitive data
						if (event.request?.cookies) {
							delete event.request.cookies;
						}
						if (event.user?.email) {
							event.user.email = "[REDACTED]";
						}

						return event;
					}),

				// S-tier error filtering
				ignoreErrors: [
					// Browser extensions
					"top.GLOBALS",
					"ResizeObserver loop limit exceeded",
					"Non-Error promise rejection captured",
					// Network errors
					"NetworkError",
					"Failed to fetch",
					// User-caused errors
					"User cancelled",
					"user aborted",
				],
			});

			this.sentry = Sentry;
			this.isInitialized = true;

			// Process queued errors
			this.processErrorQueue();

			console.info("[ErrorTracking] Initialized successfully");
		} catch {
			// Logging disabled
		}
	}

	/**
	 * Track an error with metadata
	 */
	trackError(
		error: Error,
		errorInfo?: ErrorInfo,
		metadata?: ErrorMetadata,
	): string {
		const errorReport: ErrorReport = {
			error,
			errorInfo,
			metadata,
			timestamp: Date.now(),
			id: this.generateErrorId(),
		};

		if (!this.isInitialized) {
			this.errorQueue.push(errorReport);
			return errorReport.id;
		}

		return this.sendToSentry(errorReport);
	}

	/**
	 * Track a custom event
	 */
	trackEvent(eventName: string, data?: Record<string, any>): void {
		if (!this.isInitialized || !this.sentry) {
			return;
		}

		this.sentry.addBreadcrumb({
			message: eventName,
			category: "custom",
			level: "info",
			data,
			timestamp: Date.now() / 1000,
		});
	}

	/**
	 * Set user context for error tracking
	 */
	setUser(
		user: { id?: string; email?: string; username?: string } | null,
	): void {
		if (!this.isInitialized || !this.sentry) {
			return;
		}

		if (user) {
			this.sentry.setUser({
				id: user.id,
				email: user.email ? "[REDACTED]" : undefined,
				username: user.username,
			});
		} else {
			this.sentry.setUser(undefined);
		}
	}

	/**
	 * Set additional context
	 */
	setContext(key: string, context: Record<string, any>): void {
		if (!this.isInitialized || !this.sentry) {
			return;
		}
		this.sentry.setContext(key, context);
	}

	/**
	 * Set tags for categorization
	 */
	setTags(tags: Record<string, string>): void {
		if (!this.isInitialized || !this.sentry) {
			return;
		}
		this.sentry.setTags(tags);
	}

	/**
	 * Get current configuration
	 */
	getConfig(): ErrorTrackingConfig {
		return { ...this.__config };
	}

	/**
	 * Create an error boundary component
	 */
	createErrorBoundary(_fallback?: ReactNode): any {
		if (!this.isInitialized || !this.sentry) {
			// Return a basic error boundary if Sentry isn't loaded
			return ({ children }: { children: ReactNode }) => children;
		}

		return this.sentry.withErrorBoundary(
			({ children }: { children: ReactNode }) => children,
			{
				fallback: ({
					error,
					resetError,
				}: {
					error: Error;
					resetError: () => void;
				}) => (
					<div className="flex min-h-screen items-center justify-center p-4">
						<div className="glass-effect rounded-lg p-8 max-w-md">
							<h2 className="text-xl font-semibold mb-4">
								Something went wrong
							</h2>
							<p className="text-gray-600 mb-4">
								We've been notified and are working on a fix.
							</p>
							<details className="text-sm text-gray-500 mb-4">
								<summary>Error details</summary>
								<pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
							</details>
							<button
								onClick={resetError}
								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
							>
								Try again
							</button>
						</div>
					</div>
				),
				beforeCapture: (scope: any) => {
					scope.setTag("errorBoundary", true);
					scope.setLevel("error");
				},
			},
		);
	}

	/**
	 * Wrap a component with error tracking
	 */
	withErrorTracking<P extends object>(
		Component: React.ComponentType<P>,
		componentName?: string,
	): React.ComponentType<P> {
		if (!this.isInitialized || !this.sentry) {
			return Component;
		}

		return this.sentry.withProfiler(Component, {
			name: componentName || Component.displayName || "Unknown",
		});
	}

	/**
	 * Get error analytics
	 */
	async getErrorAnalytics(): Promise<{
		totalErrors: number;
		errorRate: number;
		topErrors: { message: string; count: number }[];
		affectedUsers: number;
	}> {
		// This would typically fetch from Sentry API
		// For now, return mock data
		return {
			totalErrors: 0,
			errorRate: 0,
			topErrors: [],
			affectedUsers: 0,
		};
	}

	/**
	 * Send error report to Sentry
	 */
	private sendToSentry(report: ErrorReport): string {
		if (!this.sentry) {
			return report.id;
		}

		const { error, errorInfo, metadata } = report;

		// Set context
		if (metadata) {
			if (metadata.component) {
				this.sentry.setTag("component", metadata.component);
			}
			if (metadata.action) {
				this.sentry.setTag("action", metadata.action);
			}
			if (metadata.tags) {
				this.sentry.setTags(metadata.tags);
			}
			if (metadata.extra) {
				this.sentry.setContext("extra", metadata.extra);
			}
		}

		// Capture the error
		if (errorInfo) {
			this.sentry.withScope((scope: any) => {
				scope.setContext("errorInfo", {
					componentStack: errorInfo.componentStack,
				});
				this.sentry.captureException(error);
			});
		} else {
			this.sentry.captureException(error);
		}

		return report.id;
	}

	/**
	 * Process queued errors after initialization
	 */
	private processErrorQueue(): void {
		while (0 < this.errorQueue.length) {
			const report = this.errorQueue.shift();
			if (report) {
				this.sendToSentry(report);
			}
		}
	}

	/**
	 * Generate unique error ID
	 */
	private generateErrorId(): string {
		return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}
}

// Export singleton instance
export const errorTracking = ErrorTrackingSystem.getInstance();

// React hook for error tracking
export function useErrorTracking() {
	return {
		trackError: (error: Error, metadata?: ErrorMetadata) =>
			errorTracking.trackError(error, undefined, metadata),
		trackEvent: (eventName: string, data?: Record<string, any>) =>
			errorTracking.trackEvent(eventName, data),
		setUser: (
			user: { id?: string; email?: string; username?: string } | null,
		) => errorTracking.setUser(user),
		setContext: (key: string, context: Record<string, any>) =>
			errorTracking.setContext(key, context),
	};
}

// Error tracking provider component
export interface ErrorTrackingProviderProps {
	children: ReactNode;
	config: ErrorTrackingConfig;
}

export function ErrorTrackingProvider({
	children,
	config,
}: ErrorTrackingProviderProps) {
	// Initialize on mount
	if ("undefined" !== typeof window) {
		errorTracking.initialize(config);
	}

	const ErrorBoundary = errorTracking.createErrorBoundary();

	if (ErrorBoundary) {
		return <ErrorBoundary>{children}</ErrorBoundary>;
	}

	return <>{children}</>;
}
