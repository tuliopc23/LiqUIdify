import type { ComponentType, ReactElement } from 'react';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { performanceMonitor } from '../core/performance-monitor';

/**
 * Optimized hook for component-level performance monitoring
 * Reduced overhead for better runtime performance
 */
export function usePerformanceMonitoring(
  componentName: string,
  props?: Record<string, any>
) {
  const renderStartTime = useRef<number>(0);
  const mountStartTime = useRef<number>(0);
  const [renderCount, setRenderCount] = useState(0);
  const propsStable = useRef(props);

  // Only track if props actually changed to reduce overhead
  const propsChanged = useMemo(() => {
    if (!props || !propsStable.current) return true;
    
    const currentKeys = Object.keys(props);
    const stableKeys = Object.keys(propsStable.current);
    
    if (currentKeys.length !== stableKeys.length) return true;
    
    return currentKeys.some(key => props[key] !== propsStable.current![key]);
  }, [props]);

  // Track component mount (only once)
  useEffect(() => {
    mountStartTime.current = performance.now();

    return () => {
      // Track unmount time (lightweight)
      const unmountTime = performance.now() - mountStartTime.current;
      performanceMonitor.trackComponent(componentName, {
        unmountTime,
        props: propsStable.current || {},
      });
    };
  }, [componentName]);

  // Track renders with throttling for performance
  useEffect(() => {
    if (!propsChanged && renderCount > 0) return; // Skip if props didn't change
    
    const renderTime = performance.now() - renderStartTime.current;

    // Only track every 5th render after the first few to reduce overhead
    if (renderCount === 0 || renderCount < 3 || renderCount % 5 === 0) {
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

    propsStable.current = props;
    setRenderCount((prev) => prev + 1);
  }, [componentName, propsChanged, renderCount]);

  // Mark render start (lightweight)
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
 * Optimized hook for Core Web Vitals monitoring
 * Reduced frequency and better performance
 */
export function useWebVitals(callback?: (metric: any) => void) {
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    // Initialize performance monitor with throttling
    performanceMonitor.init({
      reportCallback: (report) => {
        const now = performance.now();
        
        // Throttle updates to max once per 500ms for better performance
        if (now - lastUpdateRef.current < 500) return;
        
        lastUpdateRef.current = now;
        
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
 * Optimized hook for real-time performance metrics
 * Reduced update frequency for better performance
 */
export function useRealtimePerformance() {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState<{ used: number; limit: number } | null>(
    null
  );
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const lastMemoryCheckRef = useRef(0);

  useEffect(() => {
    let animationId: number;

    const measureFps = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTimeRef.current;

      // Update FPS less frequently (every 1.5 seconds instead of 1)
      if (1500 <= elapsed) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      // Check memory less frequently (every 3 seconds) for performance
      if (currentTime - lastMemoryCheckRef.current > 3000) {
        if ('memory' in performance) {
          const memInfo = (performance as any).memory;
          setMemory({
            used: Math.round(memInfo.usedJSHeapSize / 1_048_576), // Convert to MB
            limit: Math.round(memInfo.jsHeapSizeLimit / 1_048_576),
          });
        }
        lastMemoryCheckRef.current = currentTime;
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
