/**
 * Performance Testing Utilities
 * Tools for measuring component performance and bundle size
 */

import { performance } from 'node:perf_hooks';

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  bundleSize?: number;
  interactionTime?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

export interface PerformanceBenchmark {
  name: string;
  metrics: PerformanceMetrics;
  threshold: Partial<PerformanceMetrics>;
  passed: boolean;
}

export interface PerformanceTestOptions {
  iterations?: number;
  warmupRuns?: number;
  timeout?: number;
  memoryThreshold?: number;
  renderTimeThreshold?: number;
}

// Performance measurement utilities
export class PerformanceMonitor {
  private measurements: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  startMeasurement(name: string): void {
    this.measurements.set(name, performance.now());
  }

  endMeasurement(name: string): number {
    const startTime = this.measurements.get(name);
    if (!startTime) {
      throw new Error(`No measurement started for "${name}"`);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;
    this.measurements.delete(name);

    return duration;
  }

  measureRenderTime<T>(fn: () => T): { result: T; renderTime: number } {
    const startTime = performance.now();
    const result = fn();
    const renderTime = performance.now() - startTime;

    return { result, renderTime };
  }

  async measureAsyncRenderTime<T>(
    fn: () => Promise<T>
  ): Promise<{ result: T; renderTime: number }> {
    const startTime = performance.now();
    const result = await fn();
    const renderTime = performance.now() - startTime;

    return { result, renderTime };
  }

  getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  observeWebVitals(): Promise<PerformanceMetrics> {
    return new Promise((resolve) => {
      const metrics: Partial<PerformanceMetrics> = {};
      let observersCompleted = 0;
      const totalObservers = 2;

      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(
          (entry) => entry.name === 'first-contentful-paint'
        );
        if (fcpEntry) {
          metrics.firstContentfulPaint = fcpEntry.startTime;
          fcpObserver.disconnect();
          observersCompleted++;
          if (observersCompleted === totalObservers) {
            resolve(metrics as PerformanceMetrics);
          }
        }
      });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1];
        if (lcpEntry) {
          metrics.largestContentfulPaint = lcpEntry.startTime;
          lcpObserver.disconnect();
          observersCompleted++;
          if (observersCompleted === totalObservers) {
            resolve(metrics as PerformanceMetrics);
          }
        }
      });

      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(fcpObserver, lcpObserver);
      } catch (_error) {
        // Fallback for environments that don't support these APIs
        resolve({
          renderTime: 0,
          memoryUsage: this.getMemoryUsage(),
        } as PerformanceMetrics);
      }
    });
  }

  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.measurements.clear();
  }
}

// Component performance testing
export function createPerformanceTest(
  name: string,
  renderFn: () => void | Promise<void>,
  thresholds: Partial<PerformanceMetrics> = {}
): () => Promise<PerformanceBenchmark> {
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

      const {
        renderTime: webVitalsRenderTime,
        memoryUsage: webVitalsMemoryUsage,
        ...otherWebVitals
      } = webVitals;
      const metrics: PerformanceMetrics = {
        renderTime,
        memoryUsage,
        ...otherWebVitals,
      };

      // Check if metrics pass thresholds
      const passed = Object.entries(thresholds).every(([key, threshold]) => {
        const metric = metrics[key as keyof PerformanceMetrics];
        return metric === undefined || metric <= threshold;
      });

      return {
        name,
        metrics,
        threshold: thresholds,
        passed,
      };
    } finally {
      monitor.cleanup();
    }
  };
}

// Bundle size analysis
export interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  components: Array<{
    name: string;
    size: number;
    percentage: number;
  }>;
  treeshakeable: boolean;
}

export function analyzeBundleSize(_bundleStats: any): BundleAnalysis {
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
  private baseline: Map<string, PerformanceMetrics> = new Map();

  setBaseline(testName: string, metrics: PerformanceMetrics): void {
    this.baseline.set(testName, metrics);
  }

  checkRegression(
    testName: string,
    currentMetrics: PerformanceMetrics,
    tolerancePercent: number = 10
  ): {
    hasRegression: boolean;
    regressions: Array<{
      metric: keyof PerformanceMetrics;
      baseline: number;
      current: number;
      percentageIncrease: number;
    }>;
  } {
    const baselineMetrics = this.baseline.get(testName);
    if (!baselineMetrics) {
      throw new Error(`No baseline found for test "${testName}"`);
    }

    const regressions: Array<{
      metric: keyof PerformanceMetrics;
      baseline: number;
      current: number;
      percentageIncrease: number;
    }> = [];

    Object.entries(currentMetrics).forEach(([key, value]) => {
      const metric = key as keyof PerformanceMetrics;
      const baselineValue = baselineMetrics[metric];

      if (typeof value === 'number' && typeof baselineValue === 'number') {
        const percentageIncrease =
          ((value - baselineValue) / baselineValue) * 100;

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
export function measureComponentRender<P extends object>(
  Component: React.ComponentType<P>,
  _props: P
): Promise<PerformanceBenchmark> {
  return createPerformanceTest(
    Component.displayName || Component.name || 'Component',
    async () => {
      // This would integrate with React testing utilities
      // For now, simulate a render
      await new Promise((resolve) => setTimeout(resolve, 1));
    },
    {
      renderTime: 16, // 60fps threshold
      memoryUsage: 1024 * 1024, // 1MB threshold
    }
  )();
}

// Interaction performance testing
export function measureInteractionTime(
  interactionFn: () => void | Promise<void>
): Promise<number> {
  return new Promise(async (resolve) => {
    const startTime = performance.now();

    await interactionFn();

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => {
        const endTime = performance.now();
        resolve(endTime - startTime);
      });
    } else {
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
} as const;

// Enhanced performance testing with configurable options
export function createEnhancedPerformanceTest(
  name: string,
  renderFn: () => void | Promise<void>,
  opts: PerformanceTestOptions = {}
): () => Promise<PerformanceBenchmark> {
  const thresholds: Partial<PerformanceMetrics> = {
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
