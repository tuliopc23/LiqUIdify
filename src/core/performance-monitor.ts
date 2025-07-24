import type { Metric } from "web-vitals";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

/**
 * Performance Monitor for Glass UI
 * Tracks Core Web Vitals and component-level performance metrics
 */

// Core Web Vitals thresholds
const THRESHOLDS = {
	LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
	// FID: { good: 100, poor: 300 },   // First Input Delay (deprecated)
	CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
	FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
	TTFB: { good: 800, poor: 1800 }, // Time to First Byte
	INP: { good: 200, poor: 500 }, // Interaction to Next Paint
	TTI: { good: 3800, poor: 7300 }, // Time to Interactive
} as const;

export type MetricName = keyof typeof THRESHOLDS;
export type PerformanceRating = "good" | "needs-improvement" | "poor";

interface PerformanceMetric {
	name: MetricName;
	value: number;
	rating: PerformanceRating;
	timestamp: number;
	id: string;
	navigationType?: string;
}

interface ComponentMetric {
	componentName: string;
	renderTime: number;
	updateTime?: number;
	mountTime?: number;
	unmountTime?: number;
	rerenderCount: number;
	props: Record<string, any>;
}

interface PerformanceReport {
	url: string;
	timestamp: number;
	webVitals: PerformanceMetric[];
	componentMetrics: ComponentMetric[];
	customMetrics: Record<string, number>;
	userAgent: string;
	connection?: {
		effectiveType: string;
		downlink: number;
		rtt: number;
	};
}

type PerformanceCallback = (metric: PerformanceMetric) => void;
type ReportCallback = (report: PerformanceReport) => void;

class PerformanceMonitor {
	private static instance: PerformanceMonitor;
	private metrics: Map<string, PerformanceMetric> = new Map();
	private componentMetrics: Map<string, ComponentMetric> = new Map();
	private customMetrics: Map<string, number> = new Map();
	private observers: Map<string, PerformanceCallback[]> = new Map();
	private reportCallbacks: ReportCallback[] = [];
	private isInitialized = false;
	private performanceObserver?: PerformanceObserver;

	private constructor() {}

	static getInstance(): PerformanceMonitor {
		if (!PerformanceMonitor.instance) {
			PerformanceMonitor.instance = new PerformanceMonitor();
		}
		return PerformanceMonitor.instance;
	}

	/**
	 * Initialize Core Web Vitals monitoring
	 */
	init(
		options: {
			reportCallback?: ReportCallback;
			immediate?: boolean;
			sampleRate?: number;
		} = {},
	): void {
		if (this.isInitialized) {
			return;
		}

		const { reportCallback, immediate = false, sampleRate = 1 } = options;

		// Sample rate for performance monitoring (0-1)
		if (Math.random() > sampleRate) {
			return;
		}

		if (reportCallback) {
			this.reportCallbacks.push(reportCallback);
		}

		// Core Web Vitals
		onLCP((metric) => this.handleMetric(metric, "LCP"));
		// FID has been deprecated in favor of INP
		// onFID(metric => this.handleMetric(metric, 'FID'));
		onCLS((metric) => this.handleMetric(metric, "CLS"));
		onFCP((metric) => this.handleMetric(metric, "FCP"));
		onTTFB((metric) => this.handleMetric(metric, "TTFB"));
		onINP((metric) => this.handleMetric(metric, "INP"));

		// Time to Interactive (custom implementation)
		this.measureTTI();

		// Set up Performance Observer for additional metrics
		this.setupPerformanceObserver();

		// Network information
		this.captureNetworkInfo();

		this.isInitialized = true;

		// Send immediate report if requested
		if (immediate) {
			setTimeout(() => this.sendReport(), 1000);
		}

		// Set up periodic reporting
		this.setupPeriodicReporting();
	}

	/**
	 * Handle Core Web Vitals metric
	 */
	private handleMetric(metric: Metric, name: MetricName): void {
		const rating = this.getRating(name, metric.value);

		const performanceMetric: PerformanceMetric = {
			name,
			value: metric.value,
			rating,
			timestamp: Date.now(),
			id: metric.id,
			navigationType: metric.navigationType,
		};

		this.metrics.set(name, performanceMetric);
		this.notifyObservers(name, performanceMetric);

		// Log to console in development
		if ("development" === process.env.NODE_ENV) {
			console.log(
				`[Performance] ${name}: ${metric.value.toFixed(2)}ms (${rating})`,
			);
		}
	}

	/**
	 * Get performance rating based on thresholds
	 */
	private getRating(name: MetricName, value: number): PerformanceRating {
		const threshold = THRESHOLDS[name];
		if (value <= threshold.good) {
			return "good";
		}
		if (value <= threshold.poor) {
			return "needs-improvement";
		}
		return "poor";
	}

	/**
	 * Measure Time to Interactive
	 */
	private measureTTI(): void {
		if (!("PerformanceObserver" in window)) {
			return;
		}

		let tti = 0;
		const observer = new PerformanceObserver((list) => {
			const entries = list.getEntries();

			// Find the last long task before 5 seconds of quiet time
			const longTasks = entries.filter((entry) => 50 < entry.duration);

			if (0 < longTasks.length) {
				const lastLongTask = longTasks[longTasks.length - 1];
				if (lastLongTask) {
					tti = lastLongTask.startTime + lastLongTask.duration;
				}
			}
		});

		observer.observe({ entryTypes: ["longtask"] });

		// Estimate TTI after load
		window.addEventListener("load", () => {
			setTimeout(() => {
				if (0 === tti) {
					tti = performance.now();
				}

				this.handleMetric(
					{
						name: "TTI",
						value: tti,
						id: `tti-${Date.now()}`,
						navigationType: "navigate",
						rating: "good",
						delta: tti,
						entries: [],
					} as unknown as Metric,
					"TTI" as MetricName,
				);

				observer.disconnect();
			}, 5000);
		});
	}

	/**
	 * Set up Performance Observer for additional metrics
	 */
	private setupPerformanceObserver(): void {
		if (!("PerformanceObserver" in window)) {
			return;
		}

		this.performanceObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (
					"measure" === entry.entryType &&
					entry.name.startsWith("glass-ui-")
				) {
					this.customMetrics.set(entry.name, entry.duration);
				}
			}
		});

		this.performanceObserver.observe({
			entryTypes: ["measure", "navigation", "resource"],
		});
	}

	/**
	 * Capture network information
	 */
	private captureNetworkInfo(): Record<string, any> | undefined {
		if ("connection" in navigator) {
			const conn = (navigator as any).connection;
			return {
				effectiveType: conn.effectiveType,
				downlink: conn.downlink,
				rtt: conn.rtt,
				saveData: conn.saveData,
			};
		}
		return;
	}

	/**
	 * Track component performance
	 */
	trackComponent(
		componentName: string,
		metrics: Partial<ComponentMetric>,
	): void {
		const existing = this.componentMetrics.get(componentName) || {
			componentName,
			renderTime: 0,
			rerenderCount: 0,
			props: {},
		};

		this.componentMetrics.set(componentName, {
			...existing,
			...metrics,
			rerenderCount: existing.rerenderCount + (metrics.renderTime ? 1 : 0),
		});
	}

	/**
	 * Track custom metric
	 */
	trackCustomMetric(name: string, value: number): void {
		this.customMetrics.set(name, value);

		// Also create a performance mark
		if ("performance" in window) {
			performance.mark(`glass-ui-${name}-end`);
			performance.measure(
				`glass-ui-${name}`,
				`glass-ui-${name}-start`,
				`glass-ui-${name}-end`,
			);
		}
	}

	/**
	 * Start timing a custom metric
	 */
	startTiming(name: string): void {
		if ("performance" in window) {
			performance.mark(`glass-ui-${name}-start`);
		}
	}

	/**
	 * End timing a custom metric
	 */
	endTiming(name: string): number {
		if ("performance" in window) {
			performance.mark(`glass-ui-${name}-end`);
			performance.measure(
				`glass-ui-${name}`,
				`glass-ui-${name}-start`,
				`glass-ui-${name}-end`,
			);

			const entries = performance.getEntriesByName(
				`glass-ui-${name}`,
				"measure",
			);
			if (0 < entries.length) {
				const duration = entries[entries.length - 1]?.duration || 0;
				this.trackCustomMetric(name, duration);
				return duration;
			}
		}
		return 0;
	}

	/**
	 * Get current performance report
	 */
	getReport(): PerformanceReport {
		return {
			url: window.location.href,
			timestamp: Date.now(),
			webVitals: [...this.metrics.values()],
			componentMetrics: [...this.componentMetrics.values()],
			customMetrics: Object.fromEntries(this.customMetrics),
			userAgent: navigator.userAgent,
			connection: this.captureNetworkInfo() as
				| {
						effectiveType: string;
						downlink: number;
						rtt: number;
				  }
				| undefined,
		};
	}

	/**
	 * Send performance report
	 */
	private sendReport(): void {
		const report = this.getReport();

		// Notify all report callbacks
		this.reportCallbacks.forEach((callback) => {
			try {
				callback(report);
			} catch {
				// Logging disabled
			}
		});
	}

	/**
	 * Set up periodic reporting
	 */
	private setupPeriodicReporting(): void {
		// Send report on page visibility change
		document.addEventListener("visibilitychange", () => {
			if ("hidden" === document.visibilityState) {
				this.sendReport();
			}
		});

		// Send report before unload
		window.addEventListener("beforeunload", () => {
			this.sendReport();
		});

		// Send report every 30 seconds
		setInterval(() => {
			if ("visible" === document.visibilityState) {
				this.sendReport();
			}
		}, 30_000);
	}

	/**
	 * Subscribe to metric updates
	 */
	subscribe(metricName: MetricName, callback: PerformanceCallback): () => void {
		const observers = this.observers.get(metricName) || [];
		observers.push(callback);
		this.observers.set(metricName, observers);

		// Return unsubscribe function
		return () => {
			const obs = this.observers.get(metricName) || [];
			const index = obs.indexOf(callback);
			if (-1 < index) {
				obs.splice(index, 1);
			}
		};
	}

	/**
	 * Notify observers of metric changes
	 */
	private notifyObservers(metricName: string, metric: PerformanceMetric): void {
		const observers = this.observers.get(metricName) || [];
		observers.forEach((callback) => {
			try {
				callback(metric);
			} catch {
				// Logging disabled
			}
		});
	}

	/**
	 * Get specific metric
	 */
	getMetric(name: MetricName): PerformanceMetric | undefined {
		return this.metrics.get(name);
	}

	/**
	 * Get all metrics
	 */
	getAllMetrics(): Map<string, PerformanceMetric> {
		return new Map(this.metrics);
	}

	/**
	 * Clear all metrics
	 */
	clear(): void {
		this.metrics.clear();
		this.componentMetrics.clear();
		this.customMetrics.clear();
	}

	/**
	 * Destroy monitor
	 */
	destroy(): void {
		this.clear();
		this.observers.clear();
		this.reportCallbacks = [];
		this.performanceObserver?.disconnect();
		this.isInitialized = false;
	}
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Export types
export type { PerformanceMetric, ComponentMetric, PerformanceReport };
