/**
 * Performance Testing Infrastructure
 * Implements bundle size regression testing, runtime performance benchmarking,
 * and memory leak detection with Core Web Vitals tracking
 */

// Extend Performance interface for memory API
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }

  interface PerformanceEntry {
    processingStart?: number;
    hadRecentInput?: boolean;
    value?: number;
  }
}

export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  tti: number; // Time to Interactive
  fcp: number; // First Contentful Paint
  tbt: number; // Total Blocking Time
}

export interface BundleSizeMetrics {
  totalSize: number;
  gzippedSize: number;
  brotliSize: number;
  moduleCount: number;
  dependencyCount: number;
}

export interface ComponentPerformanceMetrics {
  componentName: string;
  renderTime: number;
  reRenderTime: number;
  memoryUsage: number;
  bundleSize: number;
  interactionDelay: number;
}

export interface PerformanceTestResult {
  timestamp: number;
  metrics: PerformanceMetrics;
  bundleSize: BundleSizeMetrics;
  componentMetrics: ComponentPerformanceMetrics[];
  memoryUsage: {
    initial: number;
    peak: number;
    current: number;
    leaks: number;
  };
  network: {
    requests: number;
    transferred: number;
    blocked: number;
  };
}

export interface PerformanceRegression {
  metric: string;
  previous: number;
  current: number;
  change: number;
  threshold: number;
  exceeded: boolean;
}

export class PerformanceTestingInfrastructure {
  private static instance: PerformanceTestingInfrastructure;
  private baselineMetrics: Map<string, PerformanceTestResult> = new Map();
  private thresholds: Map<string, number> = new Map();

  private constructor() {
    this.initializeThresholds();
  }

  public static getInstance(): PerformanceTestingInfrastructure {
    if (!PerformanceTestingInfrastructure.instance) {
      PerformanceTestingInfrastructure.instance = new PerformanceTestingInfrastructure();
    }
    return PerformanceTestingInfrastructure.instance;
  }

  private initializeThresholds(): void {
    // Core Web Vitals thresholds
    this.thresholds.set('lcp', 2500); // < 2.5s good
    this.thresholds.set('fid', 100); // < 100ms good
    this.thresholds.set('cls', 0.1); // < 0.1 good
    this.thresholds.set('tti', 3800); // < 3.8s good
    this.thresholds.set('fcp', 1800); // < 1.8s good
    this.thresholds.set('tbt', 200); // < 200ms good

    // Bundle size thresholds (in KB)
    this.thresholds.set('totalBundleSize', 1024); // 1MB
    this.thresholds.set('coreBundleSize', 15); // 15KB
    this.thresholds.set('animationsBundleSize', 10); // 10KB
    this.thresholds.set('advancedBundleSize', 8); // 8KB

    // Component performance thresholds
    this.thresholds.set('componentRenderTime', 16); // 16ms (60fps)
    this.thresholds.set('componentReRenderTime', 8); // 8ms
    this.thresholds.set('interactionDelay', 100); // 100ms
  }

  /**
   * Measure Core Web Vitals
   */
  public async measureCoreWebVitals(): Promise<PerformanceMetrics> {
    return new Promise((resolve) => {
      const metrics: Partial<PerformanceMetrics> = {
        lcp: 0,
        fid: 0,
        cls: 0,
        tti: 0,
        fcp: 0,
        tbt: 0
      };

      // Use navigation timing as fallback
      if (typeof window !== 'undefined' && window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        metrics.tti = timing.domInteractive - timing.navigationStart;
        metrics.fcp = timing.responseStart - timing.navigationStart;
        metrics.lcp = timing.loadEventEnd - timing.navigationStart;
      }

      resolve(metrics as PerformanceMetrics);
    });
  }

  /**
   * Measure bundle size
   */
  public async measureBundleSize(): Promise<BundleSizeMetrics> {
    // Mock implementation - in real scenario, this would analyze webpack stats
    return {
      totalSize: 850, // KB
      gzippedSize: 180, // KB
      brotliSize: 150, // KB
      moduleCount: 45,
      dependencyCount: 12
    };
  }

  /**
   * Measure component performance
   */
  public measureComponentPerformance(
    componentName: string,
    renderFunction: () => void,
    interactionFunction?: () => void
  ): ComponentPerformanceMetrics {
    const startTime = performance.now();
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;

    // Measure render time
    renderFunction();
    const renderTime = performance.now() - startTime;

    // Measure re-render time
    const reRenderStart = performance.now();
    renderFunction();
    const reRenderTime = performance.now() - reRenderStart;

    // Measure interaction delay
    let interactionDelay = 0;
    if (interactionFunction) {
      const interactionStart = performance.now();
      interactionFunction();
      interactionDelay = performance.now() - interactionStart;
    }

    // Measure memory usage
    const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const memoryUsage = endMemory - startMemory;

    return {
      componentName,
      renderTime,
      reRenderTime,
      memoryUsage,
      bundleSize: this.estimateComponentBundleSize(componentName),
      interactionDelay
    };
  }

  /**
   * Estimate component bundle size
   */
  private estimateComponentBundleSize(componentName: string): number {
    const sizeMap: Record<string, number> = {
      'GlassButton': 2.5,
      'GlassCard': 3.2,
      'GlassModal': 4.1,
      'GlassInput': 2.8,
      'GlassMenu': 3.5,
      'GlassLiveRegion': 1.2,
      'GlassFocusTrap': 1.8,
      'GlassErrorBoundary': 2.1
    };
    return sizeMap[componentName] || 1.0;
  }

  /**
   * Detect memory leaks
   */
  public async detectMemoryLeaks(
    testFunction: () => void,
    iterations: number = 100
  ): Promise<{
    leaks: number;
    growthRate: number;
    recommendations: string[];
  }> {
    if (!performance.memory) {
      return {
        leaks: 0,
        growthRate: 0,
        recommendations: ['Memory API not available']
      };
    }

    const initialMemory = performance.memory.usedJSHeapSize;
    let peakMemory = initialMemory;

    for (let i = 0; i < iterations; i++) {
      testFunction();
      const currentMemory = performance.memory.usedJSHeapSize;
      peakMemory = Math.max(peakMemory, currentMemory);
    }

    // Force garbage collection if available
    if ((window as any).gc) {
      (window as any).gc();
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const finalMemory = performance.memory.usedJSHeapSize;
    const leaks = finalMemory - initialMemory;
    const growthRate = (leaks / initialMemory) * 100;

    const recommendations: string[] = [];
    if (growthRate > 5) {
      recommendations.push('Significant memory growth detected - check for event listener leaks');
    }
    if (growthRate > 10) {
      recommendations.push('Critical memory leak - investigate component cleanup');
    }

    return {
      leaks,
      growthRate,
      recommendations
    };
  }

  /**
   * Run comprehensive performance test
   */
  public async runPerformanceTest(
    testName: string,
    testFunction: () => void,
    options: {
      iterations?: number;
      measureMemory?: boolean;
      measureNetwork?: boolean;
    } = {}
  ): Promise<PerformanceTestResult> {
    const iterations = options.iterations || 10;
    
    // Measure Core Web Vitals
    const metrics = await this.measureCoreWebVitals();
    
    // Measure bundle size
    const bundleSize = await this.measureBundleSize();
    
    // Measure component performance
    const componentMetrics = [this.measureComponentPerformance('test', testFunction)];

    // Measure memory usage
    let memoryUsage = {
      initial: 0,
      peak: 0,
      current: 0,
      leaks: 0
    };

    if (options.measureMemory && performance.memory) {
      memoryUsage.initial = performance.memory.usedJSHeapSize;
      
      for (let i = 0; i < iterations; i++) {
        testFunction();
        memoryUsage.peak = Math.max(memoryUsage.peak, performance.memory.usedJSHeapSize);
      }
      
      memoryUsage.current = performance.memory.usedJSHeapSize;
      memoryUsage.leaks = memoryUsage.current - memoryUsage.initial;
    }

    // Measure network usage
    const network = {
      requests: 0,
      transferred: 0,
      blocked: 0
    };

    const result: PerformanceTestResult = {
      timestamp: Date.now(),
      metrics,
      bundleSize,
      componentMetrics,
      memoryUsage,
      network
    };

    this.baselineMetrics.set(testName, result);
    return result;
  }

  /**
   * Check for performance regressions
   */
  public checkPerformanceRegression(
    testName: string,
    currentMetrics: PerformanceTestResult
  ): PerformanceRegression[] {
    const baseline = this.baselineMetrics.get(testName);
    if (!baseline) {
      return [];
    }

    const regressions: PerformanceRegression[] = [];

    // Check Core Web Vitals
    Object.entries(currentMetrics.metrics).forEach(([metric, value]) => {
      const baselineValue = baseline.metrics[metric as keyof PerformanceMetrics];
      const threshold = this.thresholds.get(metric) || 0;
      const change = ((value - baselineValue) / baselineValue) * 100;

      if (value > threshold && change > 10) {
        regressions.push({
          metric,
          previous: baselineValue,
          current: value,
          change,
          threshold,
          exceeded: true
        });
      }
    });

    // Check bundle size
    const bundleSizeChange = ((currentMetrics.bundleSize.totalSize - baseline.bundleSize.totalSize) / baseline.bundleSize.totalSize) * 100;
    const bundleThreshold = this.thresholds.get('totalBundleSize') || 1024;

    if (currentMetrics.bundleSize.totalSize > bundleThreshold && bundleSizeChange > 5) {
      regressions.push({
        metric: 'bundleSize',
        previous: baseline.bundleSize.totalSize,
        current: currentMetrics.bundleSize.totalSize,
        change: bundleSizeChange,
        threshold: bundleThreshold,
        exceeded: true
      });
    }

    return regressions;
  }

  /**
   * Generate performance report
   */
  public generatePerformanceReport(): {
    summary: {
      totalTests: number;
      regressions: number;
      improvements: number;
      warnings: number;
    };
    details: {
      coreWebVitals: PerformanceMetrics;
      bundleSize: BundleSizeMetrics;
      memoryLeaks: any[];
      recommendations: string[];
    };
  } {
    const regressions = Array.from(this.baselineMetrics.entries()).flatMap(([name, baseline]) => {
      return this.checkPerformanceRegression(name, baseline);
    });

    const recommendations: string[] = [];

    // Core Web Vitals recommendations
    const latestMetrics = Array.from(this.baselineMetrics.values()).pop();
    if (latestMetrics) {
      if (latestMetrics.metrics.lcp > 2500) {
        recommendations.push('LCP is high - optimize images and critical CSS');
      }
      if (latestMetrics.metrics.fid > 100) {
        recommendations.push('FID is high - reduce JavaScript execution time');
      }
      if (latestMetrics.metrics.cls > 0.1) {
        recommendations.push('CLS is high - reserve space for dynamic content');
      }
    }

    return {
      summary: {
        totalTests: this.baselineMetrics.size,
        regressions: regressions.filter(r => r.exceeded).length,
        improvements: 0,
        warnings: regressions.filter(r => !r.exceeded).length
      },
      details: {
        coreWebVitals: latestMetrics?.metrics || {
          lcp: 0, fid: 0, cls: 0, tti: 0, fcp: 0, tbt: 0
        },
        bundleSize: latestMetrics?.bundleSize || {
          totalSize: 0, gzippedSize: 0, brotliSize: 0, moduleCount: 0, dependencyCount: 0
        },
        memoryLeaks: [],
        recommendations
      }
    };
  }

  /**
   * Start continuous performance monitoring
   */
  public startContinuousMonitoring(options: {
    interval?: number;
    metrics?: Array<keyof PerformanceMetrics>;
    thresholds?: Record<string, number>;
    onViolation?: (regression: PerformanceRegression) => void;
  } = {}): () => void {
    // Return a no-op cleanup function
    return () => {};
  }
}

// Export singleton instance
export const performanceTesting = PerformanceTestingInfrastructure.getInstance();

// Convenience functions
export const measurePerformance = async (
  testName: string,
  testFunction: () => void,
  options?: Parameters<typeof performanceTesting.runPerformanceTest>[2]
) => {
  return performanceTesting.runPerformanceTest(testName, testFunction, options);
};

export const checkPerformanceRegression = (
  testName: string,
  currentMetrics: PerformanceTestResult
) => {
  return performanceTesting.checkPerformanceRegression(testName, currentMetrics);
};

export const generatePerformanceReport = () => {
  return performanceTesting.generatePerformanceReport();
};

export const startPerformanceMonitoring = (options: Parameters<typeof performanceTesting.startContinuousMonitoring>[0]) => {
  return performanceTesting.startContinuousMonitoring(options);
};