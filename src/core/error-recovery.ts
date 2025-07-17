/**
 * Comprehensive Error Recovery System
 * Implements hierarchical error boundaries, graceful degradation, and SSR safety
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { performanceMonitor } from './performance-monitor';

// Error types and interfaces
export interface ErrorContext {
    componentStack: string;
    errorBoundary: string;
    timestamp: Date;
    userAgent: string;
    url: string;
    userId?: string;
    sessionId?: string;
    buildVersion?: string;
}

export interface ErrorReport {
    error: Error;
    errorInfo: ErrorInfo;
    context: ErrorContext;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recoverable: boolean;
}

export interface CircuitBreakerState {
    failures: number;
    lastFailure: Date | null;
    state: 'closed' | 'open' | 'half-open';
    threshold: number;
    timeout: number;
}

export interface FallbackComponent {
    component: ReactNode;
    condition: (error: Error) => boolean;
    priority: number;
}

// Error reporting service interface
export interface ErrorReportingService {
    reportError(report: ErrorReport): Promise<void>;
    reportRecovery(boundaryName: string, context: ErrorContext): Promise<void>;
}

// Circuit Breaker implementation
export class CircuitBreaker {
    private state: CircuitBreakerState;
    private name: string;

    constructor(name: string, threshold: number = 5, timeout: number = 60000) {
        this.name = name;
        this.state = {
            failures: 0,
            lastFailure: null,
            state: 'closed',
            threshold,
            timeout
        };
    }

    async execute<T>(operation: () => Promise<T>): Promise<T> {
        if (this.state.state === 'open') {
            if (this.shouldAttemptReset()) {
                this.state.state = 'half-open';
            } else {
                throw new Error(`Circuit breaker ${this.name} is open`);
            }
        }

        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    private shouldAttemptReset(): boolean {
        return this.state.lastFailure !== null &&
            Date.now() - this.state.lastFailure.getTime() > this.state.timeout;
    }

    private onSuccess(): void {
        this.state.failures = 0;
        this.state.state = 'closed';
    }

    private onFailure(): void {
        this.state.failures++;
        this.state.lastFailure = new Date();

        if (this.state.failures >= this.state.threshold) {
            this.state.state = 'open';
        }
    }

    getState(): CircuitBreakerState {
        return { ...this.state };
    }
}

// Enhanced Error Boundary with circuit breaker and auto-recovery
export interface GlassErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    level: 'application' | 'page' | 'section' | 'component';
    name: string;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    enableCircuitBreaker?: boolean;
    enableAutoRecovery?: boolean;
    recoveryAttempts?: number;
    reportingService?: ErrorReportingService;
}

export interface GlassErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    recoveryAttempts: number;
    lastRecoveryAttempt: Date | null;
    circuitBreakerOpen: boolean;
}

export class GlassErrorBoundary extends Component<GlassErrorBoundaryProps, GlassErrorBoundaryState> {
    private circuitBreaker: CircuitBreaker | null = null;
    private recoveryTimer: NodeJS.Timeout | null = null;

    constructor(props: GlassErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            recoveryAttempts: 0,
            lastRecoveryAttempt: null,
            circuitBreakerOpen: false
        };

        if (props.enableCircuitBreaker) {
            this.circuitBreaker = new CircuitBreaker(`${props.name}-boundary`);
        }
    }

    static getDerivedStateFromError(error: Error): Partial<GlassErrorBoundaryState> {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });

        // Create error context
        const context: ErrorContext = {
            componentStack: errorInfo.componentStack,
            errorBoundary: this.props.name,
            timestamp: new Date(),
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
            url: typeof window !== 'undefined' ? window.location.href : 'SSR',
            buildVersion: process.env.REACT_APP_VERSION
        };

        // Determine error severity
        const severity = this.determineErrorSeverity(error, this.props.level);

        // Create error report
        const report: ErrorReport = {
            error,
            errorInfo,
            context,
            severity,
            recoverable: this.isRecoverable(error)
        };

        // Report error
        this.reportError(report);

        // Handle circuit breaker
        if (this.circuitBreaker) {
            const breakerState = this.circuitBreaker.getState();
            if (breakerState.state === 'open') {
                this.setState({ circuitBreakerOpen: true });
            }
        }

        // Attempt auto-recovery if enabled
        if (this.props.enableAutoRecovery && report.recoverable) {
            this.scheduleRecovery();
        }

        // Call custom error handler
        this.props.onError?.(error, errorInfo);

        // Track error in performance monitor
        performanceMonitor.trackCustomMetric(`error-${this.props.level}`, 1);
    }

    private determineErrorSeverity(error: Error, level: string): 'low' | 'medium' | 'high' | 'critical' {
        if (level === 'application') return 'critical';
        if (level === 'page') return 'high';
        if (error.name === 'ChunkLoadError') return 'medium';
        if (error.message.includes('Network')) return 'medium';
        return 'low';
    }

    private isRecoverable(error: Error): boolean {
        // Determine if error is recoverable
        const recoverableErrors = [
            'ChunkLoadError',
            'NetworkError',
            'TimeoutError',
            'AbortError'
        ];

        return recoverableErrors.some(type =>
            error.name.includes(type) || error.message.includes(type)
        );
    }

    private async reportError(report: ErrorReport): Promise<void> {
        try {
            if (this.props.reportingService) {
                await this.props.reportingService.reportError(report);
            } else {
                // Default error reporting
                console.error(`[${report.context.errorBoundary}] Error:`, report.error);
                console.error('Error Info:', report.errorInfo);
                console.error('Context:', report.context);
            }
        } catch (reportingError) {
            console.error('Failed to report error:', reportingError);
        }
    }

    private scheduleRecovery(): void {
        const maxAttempts = this.props.recoveryAttempts || 3;

        if (this.state.recoveryAttempts >= maxAttempts) {
            return;
        }

        // Exponential backoff: 1s, 2s, 4s, 8s...
        const delay = Math.pow(2, this.state.recoveryAttempts) * 1000;

        this.recoveryTimer = setTimeout(() => {
            this.attemptRecovery();
        }, delay);
    }

    private attemptRecovery(): void {
        this.setState(prevState => ({
            hasError: false,
            error: null,
            errorInfo: null,
            recoveryAttempts: prevState.recoveryAttempts + 1,
            lastRecoveryAttempt: new Date(),
            circuitBreakerOpen: false
        }));

        // Report recovery attempt
        if (this.props.reportingService) {
            const context: ErrorContext = {
                componentStack: '',
                errorBoundary: this.props.name,
                timestamp: new Date(),
                userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
                url: typeof window !== 'undefined' ? window.location.href : 'SSR'
            };

            this.props.reportingService.reportRecovery(this.props.name, context);
        }
    }

    componentWillUnmount() {
        if (this.recoveryTimer) {
            clearTimeout(this.recoveryTimer);
        }
    }

    render() {
        if (this.state.hasError) {
            // Circuit breaker fallback
            if (this.state.circuitBreakerOpen) {
                return (
                    <div className= "glass-error-boundary circuit-breaker-open" >
                    <div className="error-content" >
                        <h2>Service Temporarily Unavailable </h2>
                            < p > This component is temporarily disabled due to repeated errors.</p>
                                < button
                onClick = {() => window.location.reload()
            }
            className = "glass-button-secondary"
                >
                Refresh Page
                    </button>
                    </div>
                    </div>
        );
        }

        // Custom fallback or default
        if (this.props.fallback) {
            return this.props.fallback;
        }

        // Default fallback based on boundary level
        return this.renderDefaultFallback();
    }

    return this.props.children;
  }

  private renderDefaultFallback(): ReactNode {
    const { level, name } = this.props;
    const { error, recoveryAttempts } = this.state;

    const fallbacks = {
        application: (
            <div className= "glass-error-boundary application-error" >
            <div className="error-content">
                <h1>Application Error</ h1 >
        <p>Something went wrong.Please refresh the page.</p>
            < button onClick = {() => window.location.reload()
}> Refresh </button>
    </div>
    </div>
      ),
page: (
    <div className= "glass-error-boundary page-error" >
    <div className="error-content" >
        <h2>Page Error </h2>
            < p > This page encountered an error.Try navigating back or refreshing.</p>
                < div className = "error-actions" >
                    <button onClick={ () => window.history.back() }> Go Back </button>
                        < button onClick = {() => window.location.reload()}> Refresh </button>
                            </div>
                            </div>
                            </div>
      ),
section: (
    <div className= "glass-error-boundary section-error" >
    <div className="error-content" >
        <h3>Section Unavailable </h3>
            < p > This section is temporarily unavailable.</p>
{
    recoveryAttempts > 0 && (
        <p className="recovery-info" >
            Recovery attempts: { recoveryAttempts }
    </p>
            )
}
</div>
    </div>
      ),
component: (
    <div className= "glass-error-boundary component-error" >
    <div className="error-content" >
        <span>Component Error </span>
{
    process.env.NODE_ENV === 'development' && (
        <details>
        <summary>Error Details </summary>
            < pre > { error?.message } </pre>
            </details>
            )
}
</div>
    </div>
      )
    };

return fallbacks[level] || fallbacks.component;
  }
}

// SSR Safety utilities
export class SSRSafetyManager {
    private static instance: SSRSafetyManager;
    private isClient: boolean;
    private hydrationMismatches: Map<string, any> = new Map();

    private constructor() {
        this.isClient = typeof window !== 'undefined';
    }

    static getInstance(): SSRSafetyManager {
        if (!SSRSafetyManager.instance) {
            SSRSafetyManager.instance = new SSRSafetyManager();
        }
        return SSRSafetyManager.instance;
    }

    /**
     * Check if code is running on client side
     */
    isClientSide(): boolean {
        return this.isClient;
    }

    /**
     * Safely execute client-only code
     */
    clientOnly<T>(clientCode: () => T, fallback?: T): T | undefined {
        if (this.isClient) {
            try {
                return clientCode();
            } catch (error) {
                console.warn('Client-only code failed:', error);
                return fallback;
            }
        }
        return fallback;
    }

    /**
     * Detect hydration mismatches
     */
    detectHydrationMismatch(componentName: string, serverValue: any, clientValue: any): boolean {
        if (!this.isClient) return false;

        const mismatch = JSON.stringify(serverValue) !== JSON.stringify(clientValue);

        if (mismatch) {
            this.hydrationMismatches.set(componentName, {
                server: serverValue,
                client: clientValue,
                timestamp: new Date()
            });

            console.warn(`Hydration mismatch detected in ${componentName}:`, {
                server: serverValue,
                client: clientValue
            });
        }

        return mismatch;
    }

    /**
     * Get all detected hydration mismatches
     */
    getHydrationMismatches(): Map<string, any> {
        return new Map(this.hydrationMismatches);
    }

    /**
     * Create SSR-safe component wrapper
     */
    createSSRSafeComponent<P extends object>(
        ClientComponent: React.ComponentType<P>,
        ServerComponent?: React.ComponentType<P>,
        fallback?: ReactNode
    ): React.ComponentType<P> {
        return (props: P) => {
            if (!this.isClient) {
                return ServerComponent ? React.createElement(ServerComponent, props) : (fallback || null);
            }

            return React.createElement(ClientComponent, props);
        };
    }
}

// Progressive Enhancement utilities
export class ProgressiveEnhancement {
    private static features: Map<string, boolean> = new Map();

    /**
     * Check if a feature is supported
     */
    static isSupported(feature: string): boolean {
        if (typeof window === 'undefined') return false;

        if (this.features.has(feature)) {
            return this.features.get(feature)!;
        }

        let supported = false;

        switch (feature) {
            case 'css-backdrop-filter':
                supported = CSS.supports('backdrop-filter', 'blur(1px)');
                break;
            case 'css-grid':
                supported = CSS.supports('display', 'grid');
                break;
            case 'intersection-observer':
                supported = 'IntersectionObserver' in window;
                break;
            case 'resize-observer':
                supported = 'ResizeObserver' in window;
                break;
            case 'web-animations':
                supported = 'animate' in document.createElement('div');
                break;
            case 'local-storage':
                try {
                    localStorage.setItem('test', 'test');
                    localStorage.removeItem('test');
                    supported = true;
                } catch {
                    supported = false;
                }
                break;
            default:
                supported = false;
        }

        this.features.set(feature, supported);
        return supported;
    }

    /**
     * Apply progressive enhancement classes to document
     */
    static applyEnhancementClasses(): void {
        if (typeof document === 'undefined') return;

        const features = [
            'css-backdrop-filter',
            'css-grid',
            'intersection-observer',
            'resize-observer',
            'web-animations',
            'local-storage'
        ];

        features.forEach(feature => {
            const className = `supports-${feature}`;
            const noClassName = `no-${feature}`;

            if (this.isSupported(feature)) {
                document.documentElement.classList.add(className);
                document.documentElement.classList.remove(noClassName);
            } else {
                document.documentElement.classList.add(noClassName);
                document.documentElement.classList.remove(className);
            }
        });
    }

    /**
     * Create feature-aware component
     */
    static createFeatureAwareComponent<P extends object>(
        feature: string,
        EnhancedComponent: React.ComponentType<P>,
        FallbackComponent: React.ComponentType<P>
    ): React.ComponentType<P> {
        return (props: P) => {
            const supported = this.isSupported(feature);
            const Component = supported ? EnhancedComponent : FallbackComponent;
            return React.createElement(Component, props);
        };
    }
}

// Export singleton instances
export const ssrSafetyManager = SSRSafetyManager.getInstance();

// Export error boundary factory
export function createErrorBoundary(
    level: 'application' | 'page' | 'section' | 'component',
    name: string,
    options: Partial<GlassErrorBoundaryProps> = {}
) {
    return function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
        return React.createElement(GlassErrorBoundary, {
            level,
            name,
            enableCircuitBreaker: true,
            enableAutoRecovery: true,
            ...options,
            children
        });
    };
}