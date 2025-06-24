/**
 * Performance Testing Utilities
 * Tools for measuring component performance and bundle size
 */
import { performance } from 'perf_hooks';
// Performance measurement utilities
export class PerformanceMonitor {
    constructor() {
        Object.defineProperty(this, "measurements", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "observers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    startMeasurement(name) {
        this.measurements.set(name, performance.now());
    }
    endMeasurement(name) {
        const startTime = this.measurements.get(name);
        if (!startTime) {
            throw new Error(`No measurement started for "${name}"`);
        }
        const endTime = performance.now();
        const duration = endTime - startTime;
        this.measurements.delete(name);
        return duration;
    }
    measureRenderTime(fn) {
        const startTime = performance.now();
        const result = fn();
        const renderTime = performance.now() - startTime;
        return { result, renderTime };
    }
    async measureAsyncRenderTime(fn) {
        const startTime = performance.now();
        const result = await fn();
        const renderTime = performance.now() - startTime;
        return { result, renderTime };
    }
    getMemoryUsage() {
        if (typeof window !== 'undefined' && 'memory' in performance) {
            return performance.memory.usedJSHeapSize;
        }
        return 0;
    }
    observeWebVitals() {
        return new Promise(resolve => {
            const metrics = {};
            let observersCompleted = 0;
            const totalObservers = 2;
            // First Contentful Paint
            const fcpObserver = new PerformanceObserver(list => {
                const entries = list.getEntries();
                const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
                if (fcpEntry) {
                    metrics.firstContentfulPaint = fcpEntry.startTime;
                    fcpObserver.disconnect();
                    observersCompleted++;
                    if (observersCompleted === totalObservers) {
                        resolve(metrics);
                    }
                }
            });
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver(list => {
                const entries = list.getEntries();
                const lcpEntry = entries[entries.length - 1];
                if (lcpEntry) {
                    metrics.largestContentfulPaint = lcpEntry.startTime;
                    lcpObserver.disconnect();
                    observersCompleted++;
                    if (observersCompleted === totalObservers) {
                        resolve(metrics);
                    }
                }
            });
            try {
                fcpObserver.observe({ entryTypes: ['paint'] });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(fcpObserver, lcpObserver);
            }
            catch (error) {
                // Fallback for environments that don't support these APIs
                resolve({
                    renderTime: 0,
                    memoryUsage: this.getMemoryUsage(),
                });
            }
        });
    }
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.measurements.clear();
    }
}
// Component performance testing
export function createPerformanceTest(name, renderFn, thresholds = {}) {
    return async () => {
        const monitor = new PerformanceMonitor();
        try {
            // Measure render time
            monitor.startMeasurement('render');
            await renderFn();
            const renderTime = monitor.endMeasurement('render');
            // Get memory usage
            const memoryUsage = monitor.getMemoryUsage();
            // Get web vitals (if available)
            const webVitals = await monitor.observeWebVitals();
            const { renderTime: webVitalsRenderTime, memoryUsage: webVitalsMemoryUsage, ...otherWebVitals } = webVitals;
            const metrics = {
                renderTime,
                memoryUsage,
                ...otherWebVitals,
            };
            // Check if metrics pass thresholds
            const passed = Object.entries(thresholds).every(([key, threshold]) => {
                const metric = metrics[key];
                return metric === undefined || metric <= threshold;
            });
            return {
                name,
                metrics,
                threshold: thresholds,
                passed,
            };
        }
        finally {
            monitor.cleanup();
        }
    };
}
export function analyzeBundleSize(bundleStats) {
    // This would integrate with webpack-bundle-analyzer or similar
    // For now, return a mock structure
    return {
        totalSize: 0,
        gzippedSize: 0,
        components: [],
        treeshakeable: true,
    };
}
// Performance regression detection
export class PerformanceRegression {
    constructor() {
        Object.defineProperty(this, "baseline", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    setBaseline(testName, metrics) {
        this.baseline.set(testName, metrics);
    }
    checkRegression(testName, currentMetrics, tolerancePercent = 10) {
        const baselineMetrics = this.baseline.get(testName);
        if (!baselineMetrics) {
            throw new Error(`No baseline found for test "${testName}"`);
        }
        const regressions = [];
        Object.entries(currentMetrics).forEach(([key, value]) => {
            const metric = key;
            const baselineValue = baselineMetrics[metric];
            if (typeof value === 'number' && typeof baselineValue === 'number') {
                const percentageIncrease = ((value - baselineValue) / baselineValue) * 100;
                if (percentageIncrease > tolerancePercent) {
                    regressions.push({
                        metric,
                        baseline: baselineValue,
                        current: value,
                        percentageIncrease,
                    });
                }
            }
        });
        return {
            hasRegression: regressions.length > 0,
            regressions,
        };
    }
}
// React component performance testing utilities
export function measureComponentRender(Component, props) {
    return createPerformanceTest(Component.displayName || Component.name || 'Component', async () => {
        // This would integrate with React testing utilities
        // For now, simulate a render
        await new Promise(resolve => setTimeout(resolve, 1));
    }, {
        renderTime: 16, // 60fps threshold
        memoryUsage: 1024 * 1024, // 1MB threshold
    })();
}
// Interaction performance testing
export function measureInteractionTime(interactionFn) {
    return new Promise(async (resolve) => {
        const startTime = performance.now();
        await interactionFn();
        // Use requestIdleCallback if available, otherwise setTimeout
        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(() => {
                const endTime = performance.now();
                resolve(endTime - startTime);
            });
        }
        else {
            setTimeout(() => {
                const endTime = performance.now();
                resolve(endTime - startTime);
            }, 0);
        }
    });
}
// Performance testing presets for common scenarios
export const performancePresets = {
    // Fast component (should render in < 16ms for 60fps)
    fast: {
        renderTime: 16,
        memoryUsage: 512 * 1024, // 512KB
    },
    // Standard component (should render in < 33ms for 30fps)
    standard: {
        renderTime: 33,
        memoryUsage: 1024 * 1024, // 1MB
    },
    // Complex component (should render in < 100ms)
    complex: {
        renderTime: 100,
        memoryUsage: 2 * 1024 * 1024, // 2MB
    },
    // Interaction should complete in < 100ms
    interaction: {
        interactionTime: 100,
    },
};
// Enhanced performance testing with configurable options
export function createEnhancedPerformanceTest(name, renderFn, opts = {}) {
    const thresholds = {
        renderTime: opts.renderTimeThreshold,
        memoryUsage: opts.memoryThreshold,
    };
    return createPerformanceTest(name, renderFn, thresholds);
}
// Export utilities for easy testing
export const perf = {
    monitor: new PerformanceMonitor(),
    regression: new PerformanceRegression(),
    createTest: createPerformanceTest,
    createEnhancedTest: createEnhancedPerformanceTest,
    measureComponent: measureComponentRender,
    measureInteraction: measureInteractionTime,
    presets: performancePresets,
};
