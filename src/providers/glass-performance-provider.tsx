import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useIsClient } from '@/hooks/use-ssr-safe';

export interface PerformanceMetrics {
  fps: number;
  memory: {
    used: number;
    limit: number;
    percent: number;
  };
  renderTime: number;
  componentCount: number;
  animationCount: number;
  bundleSize?: number;
}

export interface PerformanceThresholds {
  fps: { warning: number; critical: number };
  memory: { warning: number; critical: number };
  renderTime: { warning: number; critical: number };
}

interface PerformanceContextValue {
  metrics: PerformanceMetrics;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  logMetric: (name: string, value: number, unit?: string) => void;
  getReport: () => PerformanceReport;
}

interface PerformanceReport {
  summary: {
    averageFPS: number;
    peakMemory: number;
    slowestRender: number;
    totalAnimations: number;
  };
  warnings: string[];
  recommendations: string[];
}

const PerformanceContext = createContext<PerformanceContextValue | undefined>(undefined);

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  fps: { warning: 50, critical: 30 },
  memory: { warning: 70, critical: 90 },
  renderTime: { warning: 16, critical: 33 },
};

export function GlassPerformanceProvider({
  children,
  thresholds = DEFAULT_THRESHOLDS,
  autoStart = false,
}: {
  children: React.ReactNode;
  thresholds?: PerformanceThresholds;
  autoStart?: boolean;
}) {
  const isClient = useIsClient();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: { used: 0, limit: 0, percent: 0 },
    renderTime: 0,
    componentCount: 0,
    animationCount: 0,
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const metricsHistoryRef = useRef<PerformanceMetrics[]>([]);
  const animationFrameRef = useRef<number>();
  const customMetricsRef = useRef<Map<string, { value: number; unit: string }>>(new Map());

  // FPS monitoring
  const measureFPS = () => {
    frameCountRef.current++;
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;

    if (deltaTime >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
      return fps;
    }
    return null;
  };

  // Memory monitoring
  const measureMemory = () => {
    if (!isClient || !('memory' in performance)) {
      return { used: 0, limit: 0, percent: 0 };
    }

    const memory = (performance as any).memory;
    const used = Math.round(memory.usedJSHeapSize / 1048576); // Convert to MB
    const limit = Math.round(memory.jsHeapSizeLimit / 1048576);
    const percent = Math.round((used / limit) * 100);

    return { used, limit, percent };
  };

  // Component count monitoring
  const countComponents = () => {
    if (!isClient) return 0;
    
    // Count React components in the DOM
    const allElements = document.querySelectorAll('[data-react-component]');
    return allElements.length;
  };

  // Animation count monitoring
  const countAnimations = () => {
    if (!isClient) return 0;
    
    // Count active animations
    const animatedElements = document.querySelectorAll(
      '.glass-spring-in, .glass-magnetic, .glass-morph, .glass-particles'
    );
    return animatedElements.length;
  };

  // Main monitoring loop
  const monitor = () => {
    if (!isMonitoring) return;

    const fps = measureFPS();
    const memory = measureMemory();
    const componentCount = countComponents();
    const animationCount = countAnimations();
    const renderTime = performance.now() - lastTimeRef.current;

    if (fps !== null) {
      const newMetrics: PerformanceMetrics = {
        fps,
        memory,
        renderTime: Math.round(renderTime * 100) / 100,
        componentCount,
        animationCount,
      };

      setMetrics(newMetrics);
      metricsHistoryRef.current.push(newMetrics);

      // Keep only last 100 entries
      if (metricsHistoryRef.current.length > 100) {
        metricsHistoryRef.current.shift();
      }

      // Check thresholds and log warnings
      if (fps < thresholds.fps.critical) {
        console.warn(`[GlassUI Performance] Critical FPS: ${fps}`);
      } else if (fps < thresholds.fps.warning) {
        console.warn(`[GlassUI Performance] Low FPS: ${fps}`);
      }

      if (memory.percent > thresholds.memory.critical) {
        console.warn(`[GlassUI Performance] Critical memory usage: ${memory.percent}%`);
      } else if (memory.percent > thresholds.memory.warning) {
        console.warn(`[GlassUI Performance] High memory usage: ${memory.percent}%`);
      }
    }

    animationFrameRef.current = requestAnimationFrame(monitor);
  };

  const startMonitoring = () => {
    if (!isClient || isMonitoring) return;
    
    setIsMonitoring(true);
    lastTimeRef.current = performance.now();
    frameCountRef.current = 0;
    metricsHistoryRef.current = [];
    monitor();
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const logMetric = (name: string, value: number, unit: string = 'ms') => {
    customMetricsRef.current.set(name, { value, unit });
  };

  const getReport = (): PerformanceReport => {
    const history = metricsHistoryRef.current;
    if (history.length === 0) {
      return {
        summary: {
          averageFPS: 60,
          peakMemory: 0,
          slowestRender: 0,
          totalAnimations: 0,
        },
        warnings: [],
        recommendations: [],
      };
    }

    const averageFPS =
      history.reduce((sum, m) => sum + m.fps, 0) / history.length;
    const peakMemory = Math.max(...history.map((m) => m.memory.percent));
    const slowestRender = Math.max(...history.map((m) => m.renderTime));
    const totalAnimations = Math.max(...history.map((m) => m.animationCount));

    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Generate warnings
    if (averageFPS < thresholds.fps.warning) {
      warnings.push(`Average FPS (${Math.round(averageFPS)}) is below recommended threshold`);
      recommendations.push('Consider reducing animation complexity or using lite components');
    }

    if (peakMemory > thresholds.memory.warning) {
      warnings.push(`Peak memory usage (${peakMemory}%) is high`);
      recommendations.push('Consider lazy loading components or reducing bundle size');
    }

    if (slowestRender > thresholds.renderTime.warning) {
      warnings.push(`Slow render detected (${slowestRender}ms)`);
      recommendations.push('Optimize component re-renders with React.memo or useMemo');
    }

    if (totalAnimations > 10) {
      warnings.push(`High number of simultaneous animations (${totalAnimations})`);
      recommendations.push('Consider staggering animations or using CSS transitions');
    }

    // Custom metrics
    customMetricsRef.current.forEach((metric, name) => {
      if (name.includes('bundle') && metric.value > 100) {
        warnings.push(`${name}: ${metric.value}${metric.unit} exceeds recommended size`);
        recommendations.push('Use code splitting and dynamic imports');
      }
    });

    return {
      summary: {
        averageFPS: Math.round(averageFPS),
        peakMemory,
        slowestRender: Math.round(slowestRender * 100) / 100,
        totalAnimations,
      },
      warnings,
      recommendations,
    };
  };

  useEffect(() => {
    if (autoStart && isClient) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [autoStart, isClient]);

  // Log performance marks
  useEffect(() => {
    if (!isClient) return;

    // Mark LiquidUI initialization
    performance.mark('liquidui-init');

    return () => {
      performance.mark('liquidui-cleanup');
      performance.measure('liquidui-session', 'liquidui-init', 'liquidui-cleanup');
    };
  }, [isClient]);

  return (
    <PerformanceContext.Provider
      value={{
        metrics,
        isMonitoring,
        startMonitoring,
        stopMonitoring,
        logMetric,
        getReport,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceMonitor() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceMonitor must be used within GlassPerformanceProvider');
  }
  return context;
}

// Performance Observer for Web Vitals
export function useWebVitals(onReport?: (metric: any) => void) {
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient || !('PerformanceObserver' in window)) return;

    try {
      // Observe Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (onReport) {
          onReport({
            name: 'LCP',
            value: lastEntry.startTime,
            rating: lastEntry.startTime < 2500 ? 'good' : 'poor',
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (onReport) {
            onReport({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              rating: entry.processingStart - entry.startTime < 100 ? 'good' : 'poor',
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Observe Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            if (onReport) {
              onReport({
                name: 'CLS',
                value: clsValue,
                rating: clsValue < 0.1 ? 'good' : 'poor',
              });
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (error) {
      console.error('Failed to observe performance metrics:', error);
    }
  }, [isClient, onReport]);
}