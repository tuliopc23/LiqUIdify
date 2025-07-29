import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import type {
  PerformanceMetrics,
  PerformanceMonitor,
  PerformanceThresholds,
} from '../lib/performance-monitor';
import { initializePerformanceMonitoring } from '../lib/performance-monitor';

interface PerformanceContextValue {
  monitor: PerformanceMonitor | null;
  metrics: PerformanceMetrics;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  generateReport: () => ReturnType<PerformanceMonitor['generateReport']> | null;
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null);

export interface GlassPerformanceProviderProps {
  children: ReactNode;
  thresholds?: Partial<PerformanceThresholds>;
  enableAutoMonitoring?: boolean;
  reportInterval?: number;
  onMetricUpdate?: (
    metric: string,
    value: number,
    status: 'good' | 'needs-improvement' | 'poor'
  ) => void;
  onPerformanceIssue?: (
    report: ReturnType<PerformanceMonitor['generateReport']>
  ) => void;
}

export function GlassPerformanceProvider({
  children,
  thresholds,
  enableAutoMonitoring = false,
  reportInterval = 10_000, // 10 seconds
  onMetricUpdate,
  onPerformanceIssue,
}: GlassPerformanceProviderProps) {
  const [monitor, setMonitor] = useState<PerformanceMonitor | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isMonitoring, setIsMonitoring] = useState(enableAutoMonitoring);

  // Initialize performance monitor
  useEffect(() => {
    const performanceMonitor = initializePerformanceMonitoring(
      thresholds,
      onMetricUpdate
    );
    setMonitor(performanceMonitor);

    return () => {
      performanceMonitor.disconnect();
    };
  }, [thresholds, onMetricUpdate]);

  // Update metrics periodically when monitoring is enabled
  useEffect(() => {
    if (!monitor || !isMonitoring) {
      return;
    }

    const updateMetrics = () => {
      const currentMetrics = monitor.getMetrics();
      setMetrics(currentMetrics);

      // Check for performance issues
      if (onPerformanceIssue) {
        const report = monitor.generateReport();
        if (report.summary.overallScore < 70) {
          // Threshold for performance issues
          onPerformanceIssue(report);
        }
      }
    };

    // Update immediately and then at intervals
    updateMetrics();
    const interval = setInterval(updateMetrics, reportInterval);

    return () => clearInterval(interval);
  }, [monitor, isMonitoring, reportInterval, onPerformanceIssue]);

  const startMonitoring = () => {
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const generateReport = () => {
    return monitor ? monitor.generateReport() : null;
  };

  const contextValue: PerformanceContextValue = {
    monitor,
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,

    generateReport,
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function useGlassPerformance(): PerformanceContextValue {
  const context = useContext(PerformanceContext);

  if (!context) {
    throw new Error(
      'useGlassPerformance must be used within a GlassPerformanceProvider'
    );
  }

  return context;
}

// HOC for automatic performance monitoring of components
export function withPerformanceMonitoring<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  componentName?: string
): React.ComponentType<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    const { monitor } = useGlassPerformance();
    const displayName =
      componentName || Component.displayName || Component.name || 'Component';

    useEffect(() => {
      if (!monitor) {
        return;
      }

      return () => {
        monitor.measureComponentRender(displayName, () => {});
      };
    });

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withPerformanceMonitoring(${componentName || Component.displayName || Component.name})`;

  return WrappedComponent;
}
