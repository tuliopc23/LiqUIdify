import type { ComponentType, ReactElement } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { performanceMonitor } from '../core/performance-monitor';

/**
 * Hook for component-level performance monitoring
 * Optimized to prevent memory leaks and excessive re-renders
 */
export function usePerformanceMonitoring(
  componentName: string,
  props?: Record<string, any>
) {
  const renderStartTime = useRef<number>(0);
  const mountStartTime = useRef<number>(0);
  const [renderCount, setRenderCount] = useState(0);
  const isUnmounted = useRef(false);

  // Track component mount - only depends on componentName to prevent memory leaks
  useEffect(() => {
    mountStartTime.current = performance.now();
    isUnmounted.current = false;

    return () => {
      // Mark as unmounted to prevent state updates after unmount
      isUnmounted.current = true;
      
      // Track unmount time only if performanceMonitor exists
      if (performanceMonitor && typeof performanceMonitor.trackComponent === 'function') {
        const unmountTime = performance.now() - mountStartTime.current;
        performanceMonitor.trackComponent(componentName, {
          unmountTime,
          props: props || {},
        });
      }
    };
  }, [componentName]); // Only depend on componentName, not props

  // Track each render - optimized to reduce unnecessary tracking
  useEffect(() => {
    if (isUnmounted.current) return;
    
    const renderTime = performance.now() - renderStartTime.current;

    // Only track if performanceMonitor is available
    if (performanceMonitor && typeof performanceMonitor.trackComponent === 'function') {
      if (0 === renderCount) {
        // First render is mount
        performanceMonitor.trackComponent(componentName, {
          mountTime: renderTime,
          renderTime,
          props: props || {},
        });
      } else {
        // Subsequent renders are updates
        performanceMonitor.trackComponent(componentName, {
          updateTime: renderTime,
          renderTime,
          props: props || {},
        });
      }
    }

    if (!isUnmounted.current) {
      setRenderCount((prev) => prev + 1);
    }
  });

  // Mark render start (moved to end to avoid affecting measurements)
  renderStartTime.current = performance.now();

  const startTiming = useCallback(
    (name: string) => {
      if (performanceMonitor && typeof performanceMonitor.startTiming === 'function') {
        return performanceMonitor.startTiming(`${componentName}-${name}`);
      }
      return undefined;
    },
    [componentName]
  );

  const endTiming = useCallback(
    (name: string) => {
      if (performanceMonitor && typeof performanceMonitor.endTiming === 'function') {
        return performanceMonitor.endTiming(`${componentName}-${name}`);
      }
      return undefined;
    },
    [componentName]
  );

  const trackMetric = useCallback(
    (name: string, value: number) => {
      if (performanceMonitor && typeof performanceMonitor.trackCustomMetric === 'function') {
        return performanceMonitor.trackCustomMetric(`${componentName}-${name}`, value);
      }
      return undefined;
    },
    [componentName]
  );

  return {
    renderCount,
    startTiming,
    endTiming,
    trackMetric,
  };
}

/**
 * HOC for automatic performance monitoring
 * Optimized to prevent memory leaks
 */
export function withPerformanceMonitoring<P extends object>(
  Component: ComponentType<P>,
  componentName?: string
): ComponentType<P> {
  const displayName =
    componentName || Component.displayName || Component.name || 'Unknown';

  function WrappedComponent(props: P): ReactElement {
    usePerformanceMonitoring(displayName, props as Record<string, any>);
    return <Component {...props} />;
  }

  WrappedComponent.displayName = `withPerformanceMonitoring(${displayName})`;

  return WrappedComponent;
}

/**
 * Hook for Core Web Vitals monitoring
 */
export function useWebVitals(callback?: (metric: any) => void) {
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize performance monitor
    performanceMonitor.init({
      reportCallback: (report) => {
        const vitals: Record<string, number> = {};
        report.webVitals.forEach((metric) => {
          vitals[metric.name] = metric.value;
        });
        setMetrics(vitals);

        if (callback) {
          callback(report);
        }
      },
      immediate: true,
    });
  }, [callback]);

  return metrics;
}

/**
 * Hook for real-time performance metrics
 */
export function useRealtimePerformance() {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState<{ used: number; limit: number } | null>(
    undefined
  );
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let animationId: number;

    const measureFps = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTimeRef.current;

      if (1000 <= elapsed) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      // Measure memory if available
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        setMemory({
          used: Math.round(memInfo.usedJSHeapSize / 1_048_576), // Convert to MB
          limit: Math.round(memInfo.jsHeapSizeLimit / 1_048_576),
        });
      }

      animationId = requestAnimationFrame(measureFps);
    };

    animationId = requestAnimationFrame(measureFps);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { fps, memory };
}
