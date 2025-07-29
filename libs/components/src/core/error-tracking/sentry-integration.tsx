/**
 * LiqUIdify Sentry Error Tracking Integration
 *
 * S-Tier Production Error Monitoring and Recovery System
 * - Automatic error capture and reporting
 * - Performance monitoring integration
 * - User session replay for debugging
 * - Custom error boundaries with fallbacks
 * - Privacy-first error collection
 */

import * as Sentry from "@sentry/react";
import type { Integration, SeverityLevel, User } from "@sentry/types";
import React from "react";

// Environment detection utilities
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

// Sentry configuration for LiqUIdify
export interface LiqUIdifySentryConfig {
  dsn?: string;
  environment?: string;
  release?: string;
  sampleRate?: number;
  tracesSampleRate?: number;
  replaysSessionSampleRate?: number;
  replaysOnErrorSampleRate?: number;
  enableUserPrivacy?: boolean;
  enablePerformanceMonitoring?: boolean;
  enableSessionReplay?: boolean;
  enableErrorBoundaries?: boolean;
  customTags?: Record<string, string>;
  allowedUrls?: Array<string>;
  denyUrls?: Array<string>;
}

// Default configuration optimized for component library
const DEFAULT_CONFIG: Required<LiqUIdifySentryConfig> = {
  dsn: "", // Should be set via environment variable
  environment: process.env.NODE_ENV || "development",
  release: process.env.npm_package_version || "1.0.0",
  sampleRate: isProduction ? 0.1 : 1, // 10% sampling in production
  tracesSampleRate: isProduction ? 0.1 : 1,
  replaysSessionSampleRate: 0.01, // 1% of sessions
  replaysOnErrorSampleRate: 1, // 100% of error sessions
  enableUserPrivacy: true,
  enablePerformanceMonitoring: true,
  enableSessionReplay: isProduction,
  enableErrorBoundaries: true,
  customTags: {
    library: "liquidify",
    version: process.env.npm_package_version || "1.0.0",
    bundle: "unknown",
  },
  allowedUrls: [],
  denyUrls: [
    // Block common development and internal URLs
    "localhost",
    "127.0.0.1",
    "192.168.",
    "10.",
    "172.16.",
    "chrome-extension",
    "moz-extension",
    "safari-extension",
  ],
};

// Error context enrichment
export interface LiqUIdifyErrorContext {
  componentName?: string;
  componentVersion?: string;
  glassMorphismLevel?: string;
  animationState?: string;
  userInteraction?: string;
  accessibilityMode?: boolean;
  performanceMetrics?: {
    renderTime?: number;
    bundleSize?: number;
    memoryUsage?: number;
  };
}

// Custom error types for better categorization
export enum LiqUIdifyErrorType {
  COMPONENT_RENDER_ERROR = "component_render_error",
  ANIMATION_ERROR = "animation_error",
  ACCESSIBILITY_ERROR = "accessibility_error",
  PERFORMANCE_ERROR = "performance_error",
  BUNDLE_ERROR = "bundle_error",
  SSR_ERROR = "ssr_error",
  API_ERROR = "api_error",
  USER_INPUT_ERROR = "user_input_error",
  CONFIGURATION_ERROR = "configuration_error",
  UNKNOWN_ERROR = "unknown_error",
}

class LiqUIdifySentryIntegration {
  private initialized = false;
  private sentryConfig: Required<LiqUIdifySentryConfig>;
  private errorQueue: Array<{ error: Error; context?: LiqUIdifyErrorContext }> =
    [];

  constructor(config: LiqUIdifySentryConfig = {}) {
    this.sentryConfig = { ...DEFAULT_CONFIG, ...config };

    // Auto-detect DSN from environment if not provided
    if (!this.sentryConfig.dsn) {
      this.sentryConfig.dsn =
        process.env.LIQUIDIFY_SENTRY_DSN ||
        process.env.VITE_SENTRY_DSN ||
        process.env.REACT_APP_SENTRY_DSN ||
        "";
    }
  }

  /**
   * Initialize Sentry with LiqUIdify-optimized configuration
   */
  public async initialize(): Promise<void> {
    // Skip initialization in test environment
    if (isTest) {
      console.log("[LiqUIdify] Sentry disabled in test environment");
      return;
    }

    // Skip if no DSN provided
    if (!this.sentryConfig.dsn) {
      if (isDevelopment) {
        // Logging disabled
      }
      return;
    }

    try {
      const integrations: Array<Integration> = [];

      // Browser tracing for performance monitoring using v9 API
      if (this.sentryConfig.enablePerformanceMonitoring) {
        integrations.push(Sentry.browserTracingIntegration());
      }

      // Session replay for debugging using v9 API
      if (
        this.sentryConfig.enableSessionReplay &&
        typeof window !== "undefined"
      ) {
        integrations.push(
          Sentry.replayIntegration({
            // Privacy-first configuration
            maskAllText: this.sentryConfig.enableUserPrivacy,
            maskAllInputs: this.sentryConfig.enableUserPrivacy,
            blockAllMedia: this.sentryConfig.enableUserPrivacy,
            // Only capture LiqUIdify-related elements
            mask: [".liquidify-sensitive", "[data-liquidify-private]"],
            block: [".liquidify-block", "[data-liquidify-block]"],
          }),
        );
      }

      // Initialize Sentry
      Sentry.init({
        dsn: this.sentryConfig.dsn,
        environment: this.sentryConfig.environment,
        release: `liquidify@${this.sentryConfig.release}`,
        integrations,
        sampleRate: this.sentryConfig.sampleRate,
        tracesSampleRate: this.sentryConfig.tracesSampleRate,
        replaysSessionSampleRate: this.sentryConfig.replaysSessionSampleRate,
        replaysOnErrorSampleRate: this.sentryConfig.replaysOnErrorSampleRate,
        beforeSend: (event: Event, hint?: unknown) =>
          this.beforeSendFilter(event, hint),
        beforeSendTransaction: (event: Event) =>
          this._beforeSendTransactionFilter(event),
        allowUrls:
          this.sentryConfig.allowedUrls.length > 0
            ? this.sentryConfig.allowedUrls
            : null,
        denyUrls: this.sentryConfig.denyUrls,
        sendDefaultPii: !this.sentryConfig.enableUserPrivacy,
        attachStacktrace: true,
        maxBreadcrumbs: 50,
        maxValueLength: 1000,
      });

      // Set initial scope after initialization
      Sentry.withScope((scope) => {
        scope.setTags({
          ...this.sentryConfig.customTags,
          "liquidify.environment": this.sentryConfig.environment,
          "liquidify.version": this.sentryConfig.release,
        });
        scope.setContext("library", {
          name: "liquidify",
          version: this.sentryConfig.release,
          type: "component-library",
        });
      });

      // Set user context with privacy protection
      this.setUserContext();

      // Process any queued errors
      await this.processErrorQueue();

      this.initialized = true;

      if (isDevelopment) {
        console.log("[LiqUIdify] Sentry error tracking initialized");
      }

      // Add performance observer for Core Web Vitals
      this.setupPerformanceMonitoring();
    } catch {
      // Logging disabled
      // Don't throw - graceful degradation
    }
  }

  /**
   * Capture LiqUIdify-specific errors with rich context
   */
  public captureError(
    error: Error,
    context: LiqUIdifyErrorContext = {},
    errorType: LiqUIdifyErrorType = LiqUIdifyErrorType.UNKNOWN_ERROR,
    level: SeverityLevel = "error",
  ): string | undefined {
    if (!this.initialized) {
      // Queue error for later processing
      this.errorQueue.push({ error, context });
      return;
    }

    return Sentry.withScope((scope) => {
      // Set error type and context
      scope.setTag("liquidify.error_type", errorType);
      scope.setLevel(level);

      // Add component context
      if (context.componentName) {
        scope.setTag("liquidify.component", context.componentName);
        scope.setContext("component", {
          name: context.componentName,
          version: context.componentVersion || "unknown",
          glassMorphismLevel: context.glassMorphismLevel,
          animationState: context.animationState,
          accessibilityMode: context.accessibilityMode,
        });
      }

      // Add user interaction context
      if (context.userInteraction) {
        scope.setTag("liquidify.interaction", context.userInteraction);
      }

      // Add performance metrics
      if (context.performanceMetrics) {
        scope.setContext("performance", context.performanceMetrics);

        // Add performance tags for filtering
        if (
          context.performanceMetrics.renderTime &&
          context.performanceMetrics.renderTime > 16
        ) {
          scope.setTag("liquidify.slow_render", "true");
        }

        if (
          context.performanceMetrics.bundleSize &&
          context.performanceMetrics.bundleSize > 30_720
        ) {
          scope.setTag("liquidify.large_bundle", "true");
        }
      }

      // Enhance error with LiqUIdify-specific fingerprinting
      scope.setFingerprint([
        errorType,
        context.componentName || "unknown",
        error.name,
        this.sanitizeErrorMessage(error.message),
      ]);

      return Sentry.captureException(error);
    });
  }

  /**
   * Capture performance issues
   */
  public capturePerformanceIssue(
    name: string,
    metrics: {
      duration: number;
      bundleSize?: number;
      memoryUsage?: number;
      componentCount?: number;
    },
    context: LiqUIdifyErrorContext = {},
  ): void {
    if (!this.initialized || !this.sentryConfig.enablePerformanceMonitoring) {
      return;
    }

    Sentry.withScope((scope) => {
      scope.setTag("liquidify.performance_issue", "true");
      scope.setTag("liquidify.metric_name", name);

      // Set severity based on performance impact
      let level: SeverityLevel = "info";
      if (metrics.duration > 100) {
        level = "warning";
      }
      if (metrics.duration > 500) {
        level = "error";
      }

      scope.setLevel(level);

      scope.setContext("performance_metrics", metrics);
      scope.setContext("component_context", context as unknown);

      // Create a custom performance event
      const performanceEvent = {
        message: `Performance issue: ${name}`,
        extra: {
          duration: metrics.duration,
          bundleSize: metrics.bundleSize,
          memoryUsage: metrics.memoryUsage,
          componentCount: metrics.componentCount,
          threshold_exceeded: metrics.duration > 100,
        },
      };

      Sentry.captureMessage(performanceEvent.message, level);
    });
  }

  /**
   * Add breadcrumb for component lifecycle events
   */
  public addBreadcrumb(
    message: string,
    category = "liquidify",
    level: SeverityLevel = "info",
    data?: Record<string, unknown>,
  ): void {
    if (!this.initialized) {
      return;
    }

    Sentry.addBreadcrumb({
      message,
      category: `liquidify.${category}`,
      level,
      data: {
        timestamp: Date.now(),
        ...data,
      },
    });
  }

  /**
   * Set user context with privacy protection
   */
  public setUserContext(user?: Partial<User>): void {
    if (!this.initialized) {
      return;
    }

    const userContext: User = {
      id: this.sentryConfig.enableUserPrivacy
        ? this.generateAnonymousId()
        : user?.id,
      // Only set email/username in development or if privacy is disabled
      ...((!this.sentryConfig.enableUserPrivacy || isDevelopment) &&
        user && {
          email: user.email,
          username: user.username,
        }),
    };

    Sentry.setUser(userContext);
  }

  /**
   * Create error boundary component with Sentry integration
   */
  public createErrorBoundary() {
    if (!this.sentryConfig.enableErrorBoundaries) {
      return ({ children }: { children: React.ReactNode }) =>
        React.createElement(React.Fragment, undefined, children);
    }

    return Sentry.withErrorBoundary(
      ({ children }: { children: React.ReactNode }) =>
        React.createElement(React.Fragment, undefined, children),
      {
        fallback: ({
          error,
          resetError,
        }: {
          error: unknown;
          resetError: () => void;
        }) =>
          React.createElement(
            "div",
            {
              className:
                "liquidify-error-boundary p-6 border border-red-200 rounded-lg bg-red-50",
            },
            [
              React.createElement(
                "h2",
                {
                  key: "title",
                  className: "text-lg font-semibold text-red-800 mb-2",
                },
                "Something went wrong with this LiqUIdify component",
              ),
              React.createElement(
                "details",
                {
                  key: "details",
                  className: "mb-4",
                },
                [
                  React.createElement(
                    "summary",
                    {
                      key: "summary",
                      className: "cursor-pointer text-sm text-red-600",
                    },
                    "Error details",
                  ),
                  React.createElement(
                    "pre",
                    {
                      key: "error",
                      className:
                        "mt-2 text-xs text-red-700 whitespace-pre-wrap",
                    },

                    error?.toString(),
                  ),
                ],
              ),
              React.createElement(
                "button",
                {
                  key: "button",
                  onClick: resetError,
                  className:
                    "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors",
                },
                "Try again",
              ),
            ],
          ),
        beforeCapture: (
          scope: unknown,
          _error: unknown,
          componentStack: string,
        ) => {
          scope.setTag("liquidify.error_boundary", "true");
          scope.setContext("error_boundary", { componentStack } as unknown);
          scope.setLevel("error");
        },
      },
    );
  }

  /**
   * Filter errors before sending to Sentry
   */
  private beforeSendFilter(
    event: Sentry.Event,
    _hint?: Sentry.EventHint,
  ): Sentry.Event | null {
    // Skip if in development and error is not LiqUIdify related
    if (isDevelopment && !this.isLiqUIdifyError(event)) {
      return null;
    }

    // Filter out common browser extension errors
    if (this.isBrowserExtensionError(event)) {
      return null;
    }

    // Filter out network errors that aren't actionable
    if (this.isNetworkError(event)) {
      return null;
    }

    // Sanitize sensitive data
    return this.sanitizeEvent(event);
  }

  /**
   * Filter transactions before sending to Sentry
   */
  private _beforeSendTransactionFilter(
    event: Sentry.Event,
  ): Sentry.Event | null {
    // Only send performance data for LiqUIdify components
    if (!event.transaction?.includes("liquidify")) {
      return null;
    }
    return event;
  }

  /**
   * Check if error is related to LiqUIdify
   */
  private isLiqUIdifyError(event: Sentry.Event): boolean {
    const errorMessage = event.exception?.values?.[0]?.value || "";
    const stackTrace = event.exception?.values?.[0]?.stacktrace?.frames || [];

    // Check for LiqUIdify in error message or stack trace
    return (
      errorMessage.toLowerCase().includes("liquidify") ||
      stackTrace.some(
        (frame) =>
          frame.filename?.includes("liquidify") ||
          (frame as unknown).function?.includes("liquidify"),
      ) ||
      event.tags?.["liquidify.component"] !== undefined
    );
  }

  /**
   * Check if error is from browser extension
   */
  private isBrowserExtensionError(event: Sentry.Event): boolean {
    const frames = event.exception?.values?.[0]?.stacktrace?.frames || [];
    return frames.some(
      (frame) =>
        frame.filename?.includes("extension://") ||
        frame.filename?.includes("moz-extension://") ||
        frame.filename?.includes("safari-extension://"),
    );
  }

  /**
   * Check if error is a non-actionable network error
   */
  private isNetworkError(event: Sentry.Event): boolean {
    const errorMessage = event.exception?.values?.[0]?.value || "";
    const networkErrorPatterns = [
      /network error/i,
      /failed to fetch/i,
      /load failed/i,
      /connection refused/i,
      /timeout/i,
    ];

    return networkErrorPatterns.some((pattern) => pattern.test(errorMessage));
  }

  /**
   * Sanitize event data for privacy
   */
  private sanitizeEvent(event: Sentry.Event): Sentry.Event {
    if (!this.sentryConfig.enableUserPrivacy) {
      return event;
    }

    // Remove sensitive data from request data
    if (event.request) {
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers.Authorization;
        delete event.request.headers.Cookie;
      }
    }

    // Sanitize breadcrumbs
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => ({
        ...breadcrumb,
        data: this.sanitizeObject(breadcrumb.data || {}),
      }));
    }

    return event;
  }

  /**
   * Sanitize object by removing sensitive keys
   */
  private sanitizeObject(
    object: Record<string, unknown>,
  ): Record<string, unknown> {
    const sensitiveKeys = [
      "password",
      "token",
      "secret",
      "key",
      "auth",
      "session",
    ];
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(object)) {
      if (
        sensitiveKeys.some((sensitiveKey) =>
          key.toLowerCase().includes(sensitiveKey),
        )
      ) {
        sanitized[key] = "[Filtered]";
      } else if (typeof value === "object" && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Sanitize error message for fingerprinting
   */
  private sanitizeErrorMessage(message: string): string {
    // Replace dynamic values with placeholders for better grouping
    return message
      .replaceAll(/\d+/g, "NUMBER")
      .replaceAll(/[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}/gi, "UUID")
      .replaceAll(/https?:\/\/\S+/g, "URL")
      .toLowerCase();
  }

  /**
   * Generate anonymous user ID
   */
  private generateAnonymousId(): string {
    if (typeof window !== "undefined" && window.localStorage) {
      let id = localStorage.getItem("liquidify_anonymous_id");
      if (!id) {
        id = `anon_${Math.random().toString(36).slice(2, 11)}`;
        localStorage.setItem("liquidify_anonymous_id", id);
      }
      return id;
    }
    return `anon_${Math.random().toString(36).slice(2, 11)}`;
  }

  /**
   * Process queued errors after initialization
   */
  private async processErrorQueue(): Promise<void> {
    for (const { error, context } of this.errorQueue) {
      this.captureError(error, context);
    }
    this.errorQueue = [];
  }

  /**
   * Setup performance monitoring for Core Web Vitals
   */
  private setupPerformanceMonitoring(): void {
    if (
      !this.sentryConfig.enablePerformanceMonitoring ||
      typeof window === "undefined"
    ) {
      return;
    }

    // Monitor LCP, FID, CLS for LiqUIdify components
    try {
      import("web-vitals").then((webVitals) => {
        const { onCLS, onINP, onLCP } = webVitals;
        onCLS((metric: unknown) => {
          if (metric.value > 0.1) {
            // CLS threshold
            this.capturePerformanceIssue("cumulative-layout-shift", {
              duration: metric.value * 1000,
            });
          }
        });

        onINP((metric: unknown) => {
          if (metric.value > 100) {
            // FID threshold
            this.capturePerformanceIssue("first-input-delay", {
              duration: metric.value,
            });
          }
        });

        onLCP((metric: unknown) => {
          if (metric.value > 2500) {
            // LCP threshold
            this.capturePerformanceIssue("largest-contentful-paint", {
              duration: metric.value,
            });
          }
        });
      });
    } catch {
      // web-vitals not available, skip
    }
  }

  /**
   * Get current error tracking status
   */
  public getStatus(): {
    initialized: boolean;
    environment: string;
    queuedErrors: number;
    config: Partial<LiqUIdifySentryConfig>;
  } {
    return {
      initialized: this.initialized,
      environment: this.sentryConfig.environment,
      queuedErrors: this.errorQueue.length,
      config: {
        ...this.sentryConfig,
      },
    };
  }
}

// Singleton instance
let sentryIntegration: LiqUIdifySentryIntegration | null;

/**
 * Initialize LiqUIdify Sentry integration
 */
export function initializeLiqUIdifySentry(
  config?: LiqUIdifySentryConfig,
): LiqUIdifySentryIntegration {
  if (!sentryIntegration) {
    sentryIntegration = new LiqUIdifySentryIntegration(config);
  }
  return sentryIntegration;
}

/**
 * Get the current Sentry integration instance
 */
export function getLiqUIdifySentry(): LiqUIdifySentryIntegration | null {
  return sentryIntegration;
}

/**
 * React hook for error tracking in components
 */
export function useLiqUIdifyErrorTracking(componentName: string) {
  const sentry = getLiqUIdifySentry();

  const trackError = (
    error: Error,
    context?: Omit<LiqUIdifyErrorContext, "componentName">,
    errorType?: LiqUIdifyErrorType,
  ) => {
    sentry?.captureError(error, { ...context, componentName }, errorType);
  };

  const trackPerformance = (
    name: string,
    metrics: {
      duration: number;
      bundleSize?: number;
      memoryUsage?: number;
      componentCount?: number;
    },
    context?: Omit<LiqUIdifyErrorContext, "componentName">,
  ) => {
    sentry?.capturePerformanceIssue(name, metrics, {
      ...context,
      componentName,
    });
  };

  const addBreadcrumb = (
    message: string,
    category?: string,
    level?: SeverityLevel,
    data?: Record<string, unknown>,
  ) => {
    sentry?.addBreadcrumb(
      `[${componentName}] ${message}`,
      category || "component",
      level,
      { component: componentName, ...data },
    );
  };

  return {
    trackError,
    trackPerformance,
    addBreadcrumb,
    isInitialized: () => sentry?.getStatus().initialized || false,
  };
}

// Export class for external use
export { LiqUIdifySentryIntegration };

// Default export
export default LiqUIdifySentryIntegration;
