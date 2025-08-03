import { useEffect, useState } from "react";

import { cn } from "../../core/utils/classname";

// Mock performance monitor since the module was removed
const performanceMonitor = {
  getMetrics: () => ({
    renderTime: Math.random() * 16,
    memoryUsage: Math.random() * 100,
    componentCount: Math.floor(Math.random() * 50),
  }),
  startMeasure: (name: string) => ({ name, startTime: performance.now() }),
  endMeasure: (measurement: any) => performance.now() - measurement.startTime,
};

import { useRealtimePerformance } from "../../hooks/use-performance-monitoring";
import { GlassCard } from "../glass-card-refactored";

interface GlassPerformanceDashboardProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  collapsed?: boolean;
  onClose?: () => void;
}

interface PerformanceMetric {
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

interface ComponentMetric {
  componentName: string;
  renderTime?: number;
}

const METRIC_LABELS = {
  LCP: "Largest Contentful Paint",
  FID: "First Input Delay",
  CLS: "Cumulative Layout Shift",
  FCP: "First Contentful Paint",
  TTFB: "Time to First Byte",
  INP: "Interaction to Next Paint",
  TTI: "Time to Interactive",
};

const getMetricColor = (rating: string) => {
  switch (rating) {
    case "good": {
      return "text-green-500";
    }
    case "needs-improvement": {
      return "text-yellow-500";
    }
    case "poor": {
      return "text-red-500";
    }
    default: {
      return "text-gray-500";
    }
  }
};

export function GlassPerformanceDashboard({
  className,
  position = "bottom-right",
  collapsed: initialCollapsed = false,
  onClose,
}: GlassPerformanceDashboardProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [metrics, setMetrics] = useState<Map<string, PerformanceMetric>>(
    new Map(),
  );
  const [componentMetrics, setComponentMetrics] = useState<
    Array<ComponentMetric>
  >([]);
  const { fps, memory } = useRealtimePerformance();

  useEffect(() => {
    // Subscribe to metric updates
    const unsubscribers = Object.keys(METRIC_LABELS).map((metricName) =>
      performanceMonitor.subscribe(
        metricName as "LCP" | "CLS" | "FCP" | "TTFB" | "INP" | "TTI",
        (metric) => {
          setMetrics((previous) => new Map(previous).set(metricName, metric));
        },
      ),
    );

    // Get initial metrics
    const allMetrics = performanceMonitor.getAllMetrics();
    setMetrics(allMetrics);

    // Update component metrics periodically
    const interval = setInterval(() => {
      const report = performanceMonitor.getReport();
      setComponentMetrics(report.componentMetrics.slice(-10)); // Last 10 components
    }, 1000);

    return () => {
      for (const unsub of unsubscribers) {
        unsub();
      }
      clearInterval(interval);
    };
  }, []);

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  if (collapsed) {
    return (
      <div className={cn("fixed z-50", positionClasses[position], className)}>
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="rounded-lg border border-white/10 bg-black/10 p-2 backdrop-blur-lg transition-colors hover:bg-black/20"
          aria-label="Expand performance dashboard"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <title>Icon</title>
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed z-50 max-h-[600px] w-96 overflow-hidden",
        positionClasses[position],
        className,
      )}
    >
      <GlassCard className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Performance Monitor</h3>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="rounded p-1 transition-colors hover:bg-white/10"
              aria-label="Collapse dashboard"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <title>Icon</title>
                <path
                  d="M11 6.5L8 3.5L5 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 transition-colors hover:bg-white/10"
                aria-label="Close dashboard"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <title>Icon</title>
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Real-time metrics */}

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded bg-white/5 p-2">
            <div className="text-gray-400 text-xs">FPS</div>

            <div
              className={cn(
                "font-mono text-xl",
                fps >= 55
                  ? "text-green-500"
                  : fps >= 30
                    ? "text-yellow-500"
                    : "text-red-500",
              )}
            >
              {fps}
            </div>
          </div>
          {memory && (
            <div className="rounded bg-white/5 p-2">
              <div className="text-gray-400 text-xs">Memory</div>

              <div className="font-mono text-xl">{memory.used}MB</div>
            </div>
          )}
        </div>

        {/* Core Web Vitals */}

        <div className="mb-4 space-y-2">
          <h4 className="font-medium text-gray-400 text-sm">Core Web Vitals</h4>

          <div className="max-h-48 space-y-1 overflow-y-auto">
            {[...metrics.entries()].map(([name, metric]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded bg-white/5 p-2"
              >
                <div className="flex-1">
                  <div className="text-gray-400 text-xs">
                    {METRIC_LABELS[name as keyof typeof METRIC_LABELS] || name}
                  </div>

                  <div
                    className={cn(
                      "font-mono text-sm",
                      getMetricColor(metric.rating),
                    )}
                  >
                    {metric.value.toFixed(name === "CLS" ? 3 : 0)}
                    {name === "CLS" ? "" : "ms"}
                  </div>
                </div>

                <div className={cn("text-xs", getMetricColor(metric.rating))}>
                  {metric.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Component Performance */}
        {componentMetrics.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-400 text-sm">
              Component Performance
            </h4>

            <div className="max-h-32 space-y-1 overflow-y-auto">
              {componentMetrics.map((metric, index) => (
                <div
                  key={`${metric.componentName}-${index}`}
                  className="flex items-center justify-between p-1 text-xs"
                >
                  <span className="flex-1 truncate">
                    {metric.componentName}
                  </span>

                  <span className="font-mono text-gray-400">
                    {metric.renderTime?.toFixed(1)}ms
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
