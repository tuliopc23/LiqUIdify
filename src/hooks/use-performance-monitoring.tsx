import type { ComponentType, ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { performanceMonitor } from '../core/performance-monitor';
import { debounce, shouldMonitorPerformance, shallowEqual } from '../core/utils/performance-utils';

/**
 * Hook for component-level performance monitoring
 */
export function usePerformanceMonitoring(
  componentName: string,
  props?: Record<string, any>
) {
  // Skip performance monitoring on low-powered devices
  const shouldMonitor = shouldMonitorPerformance();
  
  const renderStartTime = useRef<number>(0);
  const mountStartTime = useRef<number>(0);
  const [renderCount, setRenderCount] = useState(0);
  const lastPropsRef = useRef<Record<string, any> | undefined>(undefined);

  // Memoize props to prevent unnecessary re-renders when props haven't actually changed
  const memoizedProps = useMemo(() => {
    const currentProps = props || {};
    
    // Only update if props have actually changed (deep comparison)
    if (lastPropsRef.current && shallowEqual(lastPropsRef.current, currentProps)) {
      return lastPropsRef.current;
    }
    
    lastPropsRef.current = currentProps;
    return currentProps;
  }, [props]);

  // Debounced performance tracking to reduce overhead
  const debouncedTrackComponent = useMemo(
    () => debounce((componentName: string, metrics: any) => {
      if (shouldMonitor) {
        performanceMonitor.trackComponent(componentName, metrics);
      }
    }, 16), // Debounce to ~60fps
    [shouldMonitor]
  );

  // Track component mount
  useEffect(() => {
    if (!shouldMonitor) return;
    
    mountStartTime.current = performance.now();

    return () => {
      // Track unmount time
      const unmountTime = performance.now() - mountStartTime.current;
      debouncedTrackComponent(componentName, {
        unmountTime,
        props: memoizedProps,
      });
    };
  }, [componentName, memoizedProps, shouldMonitor, debouncedTrackComponent]);

  // Track each render - Remove renderCount from dependencies to prevent infinite loop
  useEffect(() => {
    if (!shouldMonitor) return;
    
    const renderTime = performance.now() - renderStartTime.current;

    if (0 === renderCount) {
      // First render is mount
      debouncedTrackComponent(componentName, {
        mountTime: renderTime,
        renderTime,
        props: memoizedProps,
      });
    } else {
      // Subsequent renders are updates
      debouncedTrackComponent(componentName, {
        updateTime: renderTime,
        renderTime,
        props: memoizedProps,
      });
    }

    setRenderCount((prev) => prev + 1);
  }, [componentName, memoizedProps, shouldMonitor, debouncedTrackComponent]); // Removed renderCount dependency

  // Mark render start
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
 * Hook for real-time performance metrics (FPS and memory)
 * Optimized to reduce performance overhead
 */
export function useRealtimePerformance() {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState({ used: 0, total: 0 });
  const fpsRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  
  useEffect(() => {
    let frameCount = 0;
    let animationFrameId: number;
    
    const updateFPS = () => {
      frameCount++;
      const now = performance.now();
      
      // Update FPS every 2 seconds to reduce overhead
      if (now - lastTimeRef.current >= 2000) {
        const actualFps = Math.round(frameCount / ((now - lastTimeRef.current) / 1000));
        setFps(actualFps);
        frameCount = 0;
        lastTimeRef.current = now;
        
        // Update memory info if available
        if ('memory' in performance) {
          const mem = (performance as any).memory;
          setMemory({
            used: Math.round(mem.usedJSHeapSize / 1024 / 1024),
            total: Math.round(mem.totalJSHeapSize / 1024 / 1024)
          });
        }
      }
      
      animationFrameId = requestAnimationFrame(updateFPS);
    };
    
    animationFrameId = requestAnimationFrame(updateFPS);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  return { fps, memory };
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
