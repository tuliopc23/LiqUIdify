import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassPerformanceDashboard } from '@/components/glass-performance-dashboard/glass-performance-dashboard';

const meta = {
  title: 'Components/Glass Performance Dashboard',
  component: GlassPerformanceDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive performance monitoring dashboard with real-time metrics, charts, and responsive grid layouts. Features glassmorphism design and smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    refreshInterval: {
      description: 'Interval for updating metrics (in milliseconds)',
      control: { type: 'number', min: 1000, max: 10000, step: 1000 },
    },
    showDetails: {
      description: 'Show detailed performance breakdowns',
      control: { type: 'boolean' },
    },
    theme: {
      description: 'Dashboard color theme',
      control: { type: 'select' },
      options: ['blue', 'green', 'purple', 'orange'],
    },
    layout: {
      description: 'Dashboard layout mode',
      control: { type: 'select' },
      options: ['grid', 'list', 'compact'],
    },
  },
} satisfies Meta<typeof GlassPerformanceDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    refreshInterval: 3000,
    showDetails: true,
    theme: 'blue',
    layout: 'grid',
  },
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <GlassPerformanceDashboard {...args} />
    </div>
  ),
};

export const LiveMetrics: Story = {
  render: () => {
    const [isLive, setIsLive] = React.useState(true);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Performance Monitor
            </h1>
            <GlassButton
              variant={isLive ? 'primary' : 'ghost'}
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? '🔴 Live' : '⏸ Paused'}
            </GlassButton>
          </div>
          <GlassPerformanceDashboard
            refreshInterval={isLive ? 1000 : 0}
            showDetails={true}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time performance monitoring with live updates',
      },
    },
  },
};

export const CompactView: Story = {
  args: {
    layout: 'compact',
    showDetails: false,
  },
  render: (args) => (
    <div className="p-6 bg-gradient-to-br from-purple-900 to-pink-900">
      <div className="max-w-4xl mx-auto">
        <GlassCard className="p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-2">
            Compact Performance View
          </h2>
          <p className="text-white/70">
            Essential metrics in a space-efficient layout
          </p>
        </GlassCard>
        <GlassPerformanceDashboard {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact layout for limited screen space',
      },
    },
  },
};

export const DetailedAnalytics: Story = {
  render: () => {
    const [selectedMetric, setSelectedMetric] = React.useState<string>('cpu');

    const metrics = [
      { id: 'cpu', label: 'CPU Usage', color: 'blue' },
      { id: 'memory', label: 'Memory', color: 'green' },
      { id: 'network', label: 'Network I/O', color: 'purple' },
      { id: 'disk', label: 'Disk Usage', color: 'orange' },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Detailed Performance Analytics
            </h2>
            <div className="flex gap-3 flex-wrap">
              {metrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedMetric === metric.id
                      ? `bg-${metric.color}-500/20 text-${metric.color}-400 border border-${metric.color}-500/50`
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassPerformanceDashboard
            showDetails={true}
            theme={
              metrics.find((m) => m.id === selectedMetric)?.color || 'blue'
            }
          />

          <GlassCard className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              {metrics.find((m) => m.id === selectedMetric)?.label} Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-effect rounded-lg p-4">
                <p className="text-sm text-white/60 mb-1">Average</p>
                <p className="text-2xl font-bold text-white">64.3%</p>
              </div>
              <div className="glass-effect rounded-lg p-4">
                <p className="text-sm text-white/60 mb-1">Peak</p>
                <p className="text-2xl font-bold text-white">89.7%</p>
              </div>
              <div className="glass-effect rounded-lg p-4">
                <p className="text-sm text-white/60 mb-1">Trend</p>
                <p className="text-2xl font-bold text-green-400">↑ 12%</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed analytics view with metric selection',
      },
    },
  },
};

export const MultipleChartTypes: Story = {
  render: () => {
    const [chartType, setChartType] = React.useState<
      'line' | 'bar' | 'area' | 'radar'
    >('line');

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Chart Visualization Options
            </h2>
            <div className="flex gap-2 flex-wrap">
              {(['line', 'bar', 'area', 'radar'] as const).map((type) => (
                <GlassButton
                  key={type}
                  variant={chartType === type ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                </GlassButton>
              ))}
            </div>
          </div>

          <GlassPerformanceDashboard showDetails={true} chartType={chartType} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different chart visualization options for performance data',
      },
    },
  },
};

export const ResponsiveGrid: Story = {
  render: () => {
    const [columns, setColumns] = React.useState(3);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-900 p-6">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Responsive Grid Layout
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-white/70">Grid Columns:</span>
              <input
                type="range"
                min="1"
                max="4"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-mono">{columns}</span>
            </div>
          </GlassCard>

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {['CPU', 'Memory', 'Network', 'Disk', 'GPU', 'Temperature'].map(
              (metric) => (
                <GlassCard key={metric} className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {metric}
                  </h3>
                  <div className="h-32 bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-white/80">
                      {Math.floor(Math.random() * 40 + 40)}%
                    </span>
                  </div>
                </GlassCard>
              )
            )}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive grid layout that adapts to different screen sizes',
      },
    },
  },
};

export const AlertsAndThresholds: Story = {
  render: () => {
    const [alerts, setAlerts] = React.useState<
      Array<{
        id: number;
        metric: string;
        value: number;
        threshold: number;
        severity: 'warning' | 'critical';
      }>
    >([]);

    React.useEffect(() => {
      const interval = setInterval(() => {
        const newAlert = {
          id: Date.now(),
          metric: ['CPU', 'Memory', 'Disk', 'Network'][
            Math.floor(Math.random() * 4)
          ],
          value: Math.floor(Math.random() * 30 + 70),
          threshold: 70,
          severity:
            Math.random() > 0.5 ? ('warning' as const) : ('critical' as const),
        };

        if (newAlert.value > newAlert.threshold) {
          setAlerts((prev) => [...prev.slice(-4), newAlert]);
        }
      }, 5000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-orange-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Performance Alerts
            </h2>
            <p className="text-white/70">
              Real-time alerts when metrics exceed thresholds
            </p>
          </div>

          {alerts.length > 0 && (
            <div className="mb-6 space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`glass-effect rounded-lg p-4 border animate-in slide-in-from-right ${
                    alert.severity === 'critical'
                      ? 'border-red-500/50 bg-red-500/10'
                      : 'border-yellow-500/50 bg-yellow-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className={`font-semibold ${
                          alert.severity === 'critical'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {alert.severity === 'critical' ? '⚠️' : '⚠️'}{' '}
                        {alert.metric} Alert
                      </span>
                      <p className="text-sm text-white/70 mt-1">
                        Current: {alert.value}% (Threshold: {alert.threshold}%)
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setAlerts((prev) =>
                          prev.filter((a) => a.id !== alert.id)
                        )
                      }
                      className="text-white/50 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <GlassPerformanceDashboard showDetails={true} theme="orange" />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance monitoring with alerts and threshold warnings',
      },
    },
  },
};

export const DarkModeOptimized: Story = {
  render: () => (
    <div className="dark min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dark Mode Dashboard
          </h1>
          <p className="text-gray-400">Optimized for low-light environments</p>
        </div>
        <GlassPerformanceDashboard showDetails={true} theme="blue" />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Performance dashboard optimized for dark mode viewing',
      },
    },
  },
};

export const MobileResponsive: Story = {
  args: {
    layout: 'compact',
    showDetails: false,
  },
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4">
      <div className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Mobile Dashboard
        </h2>
        <GlassPerformanceDashboard {...args} />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-optimized performance dashboard',
      },
    },
  },
};
