/**
 * Performance Monitor - Core Web Vitals and Component Performance Tracking
 * Implements real-time performance monitoring with automated reporting
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  tti?: number; // Time to Interactive
  fcp?: number; // First Contentful Paint

  // Component-specific metrics
  renderTime?: number;
  componentCount?: number;
  bundleSize?: number;
  memoryUsage?: number;

  // Animation performance
  animationFrameRate?: number;
  animationDroppedFrames?: number;

  // Accessibility metrics
  accessibilityScore?: number;
  contrastIssues?: number;
  focusableElements?: number;

  // Allow dynamic component-specific metrics
  [key: string]: number | undefined;
}

export interface PerformanceThresholds {
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  renderTime: { good: number; needsImprovement: number };
  bundleSize: { good: number; needsImprovement: number };
}

export const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  renderTime: { good: 16, needsImprovement: 33 }, // 60fps = 16ms, 30fps = 33ms
  bundleSize: { good: 15_000, needsImprovement: 25_000 }, // 15KB good, 25KB needs improvement
};

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: Map<string, PerformanceObserver> = new Map();
  private thresholds: PerformanceThresholds;
  private onMetricUpdate?: (
    metric: string,
    value: number,
    status: 'good' | 'needs-improvement' | 'poor'
  ) => void;

  constructor(
    thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS,
    onMetricUpdate?: (
      metric: string,
      value: number,
      status: 'good' | 'needs-improvement' | 'poor'
    ) => void
  ) {
    this.thresholds = thresholds;
    this.onMetricUpdate = onMetricUpdate;
    this.initializeObservers();
  }

  private initializeObservers(): void {
    if ('undefined' === typeof window) {
      return;
    }

    // Core Web Vitals observers
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();

    // Memory usage observer
    this.observeMemoryUsage();
  }

  private observeLCP(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        renderTime?: number;
        loadTime?: number;
      };

      if (lastEntry) {
        const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
        this.updateMetric('lcp', lcp);
      }
    });

    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.set('lcp', observer);
    } catch (error) {
      console.warn('LCP observer not supported:', error);
    }
  }

  private observeFID(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        const fid = (
          entry as PerformanceEntry & {
            processingStart?: number;
            startTime?: number;
          }
        ).processingStart
          ? (entry as any).processingStart - entry.startTime
          : 0;
        this.updateMetric('fid', fid);
      });
    });

    try {
      observer.observe({ type: 'first-input', buffered: true });
      this.observers.set('fid', observer);
    } catch (error) {
      console.warn('FID observer not supported:', error);
    }
  }

  private observeCLS(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    let clsValue = 0;
    let clsEntries: any[] = [];

    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = clsEntries[0];
          const lastSessionEntry = clsEntries[clsEntries.length - 1];

          if (
            !firstSessionEntry ||
            1000 > entry.startTime - lastSessionEntry.startTime
          ) {
            clsEntries.push(entry);
            clsValue += entry.value;
          } else {
            clsEntries = [entry];
            clsValue = entry.value;
          }
        }
      });

      this.updateMetric('cls', clsValue);
    });

    try {
      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.set('cls', observer);
    } catch (error) {
      console.warn('CLS observer not supported:', error);
    }
  }

  private observeFCP(): void {
    if (!('PerformanceObserver' in window)) {
      return;
    }

    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if ('first-contentful-paint' === entry.name) {
          this.updateMetric('fcp', entry.startTime);
        }
      });
    });

    try {
      observer.observe({ type: 'paint', buffered: true });
      this.observers.set('fcp', observer);
    } catch (error) {
      console.warn('FCP observer not supported:', error);
    }
  }

  private observeMemoryUsage(): void {
    if ('undefined' === typeof window || !('performance' in window)) {
      return;
    }

    const checkMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        this.updateMetric('memoryUsage', memory.usedJSHeapSize);
      }
    };

    // Check memory usage every 5 seconds
    const interval = setInterval(checkMemory, 5000);

    // Store interval for cleanup
    (this.observers as any).set('memory', {
      disconnect: () => clearInterval(interval),
    });
  }

  public measureComponentRender<T>(
    componentName: string,
    renderFn: () => T
  ): T {
    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    this.updateMetric('renderTime', renderTime);

    // Store component-specific metrics
    this.metrics[`${componentName}_renderTime`] = renderTime;

    return result;
  }

  public measureAnimationPerformance(
    callback: () => void
  ): Promise<{ frameRate: number; droppedFrames: number }> {
    return new Promise(resolve => {
      let frameCount = 0;
      let droppedFrames = 0;
      let lastFrameTime = performance.now();
      const startTime = performance.now();
      const duration = 1000; // Measure for 1 second

      const measureFrame = () => {
        const currentTime = performance.now();
        const frameDelta = currentTime - lastFrameTime;

        frameCount++;

        // Detect dropped frames (>20ms between frames indicates dropped frame)
        if (20 < frameDelta) {
          droppedFrames++;
        }

        lastFrameTime = currentTime;

        if (currentTime - startTime < duration) {
          requestAnimationFrame(measureFrame);
        } else {
          const frameRate = (frameCount / duration) * 1000;

          this.updateMetric('animationFrameRate', frameRate);
          this.updateMetric('animationDroppedFrames', droppedFrames);

          resolve({ frameRate, droppedFrames });
        }
      };

      callback();
      requestAnimationFrame(measureFrame);
    });
  }

  public measureBundleSize(bundleName: string): Promise<number> {
    return new Promise(resolve => {
      if ('undefined' === typeof window) {
        resolve(0);
        return;
      }

      // Use Resource Timing API to get bundle size
      const resources = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];
      const bundle = resources.find(resource =>
        resource.name.includes(bundleName)
      );

      if (bundle && bundle.transferSize) {
        this.updateMetric('bundleSize', bundle.transferSize);
        resolve(bundle.transferSize);
      } else {
        resolve(0);
      }
    });
  }

  private updateMetric(metricName: string, value: number): void {
    this.metrics[metricName] = value;

    if (this.onMetricUpdate) {
      const status = this.getMetricStatusByValue(metricName, value);
      this.onMetricUpdate(metricName, value, status);
    }
  }

  public getMetricStatus(
    metricName: string
  ): 'good' | 'needs-improvement' | 'poor' | 'unknown' {
    const value = this.metrics[metricName];
    if (value === undefined) {
      return 'unknown';
    }

    return this.getMetricStatusByValue(metricName, value);
  }

  private getMetricStatusByValue(
    metricName: string,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const threshold =
      this.thresholds[metricName as keyof PerformanceThresholds];

    if (!threshold) {
      return 'good';
    }

    if (value <= threshold.good) {
      return 'good';
    }
    if (value <= threshold.needsImprovement) {
      return 'needs-improvement';
    }
    return 'poor';
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public generateReport(): {
    metrics: PerformanceMetrics;
    summary: {
      overallScore: number;
      coreWebVitalsScore: number;
      recommendations: string[];
    };
  } {
    const metrics = this.getMetrics();
    const recommendations: string[] = [];

    // Calculate Core Web Vitals score
    let coreWebVitalsScore = 0;
    let coreWebVitalsCount = 0;

    ['lcp', 'fid', 'cls'].forEach(metric => {
      const value = metrics[metric as keyof PerformanceMetrics];
      if (value !== undefined) {
        const status = this.getMetricStatusByValue(metric, value);
        coreWebVitalsScore +=
          'good' === status ? 100 : 'needs-improvement' === status ? 50 : 0;
        coreWebVitalsCount++;

        if ('good' !== status) {
          recommendations.push(
            `Improve ${metric.toUpperCase()}: Current value ${value}, target: ${this.thresholds[metric as keyof PerformanceThresholds]?.good}`
          );
        }
      }
    });

    coreWebVitalsScore =
      0 < coreWebVitalsCount ? coreWebVitalsScore / coreWebVitalsCount : 0;

    // Calculate overall score including component performance
    let overallScore = coreWebVitalsScore;

    if (
      metrics.renderTime &&
      metrics.renderTime > this.thresholds.renderTime.good
    ) {
      recommendations.push(
        `Optimize component render time: ${metrics.renderTime.toFixed(2)}ms (target: <${this.thresholds.renderTime.good}ms)`
      );
      overallScore -= 10;
    }

    if (
      metrics.bundleSize &&
      metrics.bundleSize > this.thresholds.bundleSize.good
    ) {
      recommendations.push(
        `Reduce bundle size: ${(metrics.bundleSize / 1024).toFixed(2)}KB (target: <${(this.thresholds.bundleSize.good / 1024).toFixed(2)}KB)`
      );
      overallScore -= 15;
    }

    if (metrics.animationFrameRate && 55 > metrics.animationFrameRate) {
      recommendations.push(
        `Improve animation performance: ${metrics.animationFrameRate.toFixed(1)}fps (target: >55fps)`
      );
      overallScore -= 10;
    }

    return {
      metrics,
      summary: {
        overallScore: Math.max(0, Math.min(100, overallScore)),
        coreWebVitalsScore,
        recommendations,
      },
    };
  }

  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Singleton instance for global performance monitoring
let globalPerformanceMonitor: PerformanceMonitor | null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!globalPerformanceMonitor) {
    globalPerformanceMonitor = new PerformanceMonitor();
  }
  return globalPerformanceMonitor;
}

export function initializePerformanceMonitoring(
  thresholds?: Partial<PerformanceThresholds>,
  onMetricUpdate?: (
    metric: string,
    value: number,
    status: 'good' | 'needs-improvement' | 'poor'
  ) => void
): PerformanceMonitor {
  const finalThresholds = { ...DEFAULT_THRESHOLDS, ...thresholds };
  globalPerformanceMonitor = new PerformanceMonitor(
    finalThresholds,
    onMetricUpdate
  );
  return globalPerformanceMonitor;
}
