import type { ComponentType, ReactElement } from 'react';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { performanceMonitor } from '../core/performance-monitor';

/**
 * Hook for component-level performance monitoring - Optimized version
 */
export function usePerformanceMonitoring(
  componentName: string,
  props?: Record<string, any>
) {
  const renderStartTime = useRef<number>(0);
  const mountStartTime = useRef<number>(0);
  const [renderCount, setRenderCount] = useState(0);
  const lastPropsRef = useRef(props);

  // Only track if props actually changed to reduce overhead
  const shouldTrack = useMemo(() => {
    if (renderCount === 0) return true; // Always track first render
    return JSON.stringify(props) !== JSON.stringify(lastPropsRef.current);
  }, [props, renderCount]);

  // Track component mount - only once
  useEffect(() => {
    mountStartTime.current = performance.now();

    return () => {
      // Track unmount time only if tracking is enabled
      if (process.env.NODE_ENV === 'development') {
        const unmountTime = performance.now() - mountStartTime.current;
        performanceMonitor.trackComponent(componentName, {
          unmountTime,
          props: props || {},
        });
      }
    };
  }, [componentName]); // Only depend on componentName

  // Track each render - optimized
  useEffect(() => {
    if (!shouldTrack) return;

    const renderTime = performance.now() - renderStartTime.current;

    // Batch performance tracking to reduce overhead
    if (process.env.NODE_ENV === 'development') {
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

    setRenderCount((prev) => prev + 1);
    lastPropsRef.current = props;
  }, [componentName, shouldTrack, renderCount, props]);

  // Mark render start - only update when needed
  if (shouldTrack) {
    renderStartTime.current = performance.now();
  }

  const startTiming = useCallback(
    (name: string) =>
      performanceMonitor.startTiming(`${componentName}-${name}`),
    [componentName]
  );

  const endTiming = useCallback(
    (name: string) => performanceMonitor.endTiming(`${componentName}-${name}`),
    [componentName]
  );

  const trackMetric = useCallback(
    (name: string, value: number) =>
      performanceMonitor.trackCustomMetric(`${componentName}-${name}`, value),
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
