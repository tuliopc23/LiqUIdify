import type { ComponentType, ReactElement } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { performanceMonitor } from '../core/performance-monitor';

/**
 * Hook for component-level performance monitoring
 */
export function usePerformanceMonitoring(
  componentName: string,
  props?: Record<string, any>
) {
  const renderStartTime = useRef<number>(0);
  const mountStartTime = useRef<number>(0);
  const [renderCount, setRenderCount] = useState(0);
  const propsRef = useRef(props);
  
  // Update props ref without causing re-renders
  propsRef.current = props;

  // Track component mount
  useEffect(() => {
    mountStartTime.current = performance.now();

    return () => {
      // Track unmount time
      const unmountTime = performance.now() - mountStartTime.current;
      performanceMonitor.trackComponent(componentName, {
        unmountTime,
        props: propsRef.current || {},
      });
    };
  }, [componentName]);

  // Track each render - optimized to prevent unnecessary re-renders
  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;

    if (renderCount === 0) {
      // First render is mount
      performanceMonitor.trackComponent(componentName, {
        mountTime: renderTime,
        renderTime,
        props: propsRef.current || {},
      });
    } else {
      // Subsequent renders are updates
      performanceMonitor.trackComponent(componentName, {
        updateTime: renderTime,
        renderTime,
        props: propsRef.current || {},
      });
    }

    setRenderCount((prev) => prev + 1);
  }, [componentName, renderCount]);

  // Mark render start - moved to avoid dependency issues
  renderStartTime.current = performance.now();

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

      if (elapsed >= 1000) {
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
