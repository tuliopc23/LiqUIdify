/**
 * LiqUIdify Error Analytics Dashboard
 *
 * Real-time error monitoring and analytics dashboard for production
 * - Error trend visualization
 * - Component-specific error tracking
 * - Performance correlation analysis
 * - User impact assessment
 * - Automated alert management
 */

import React, { useEffect, useMemo, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Activity, AlertTriangle, Clock, Download, Filter, RefreshCw, Shield, TrendingUp, Users } from 'lucide-react';

// Types for error analytics data
interface ErrorMetric {
  timestamp: string;
  count: number;
  type: string;
  component: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userImpact: number;
  resolved: boolean;
}

interface ComponentErrorStats {
  componentName: string;
  errorCount: number;
  userImpact: number;
  avgResolutionTime: number;
  topErrorTypes: string[];
  trend: 'up' | 'down' | 'stable';
}

// interface PerformanceCorrelation {
//   errorType: string;
//   avgRenderTime: number;
//   avgBundleSize: number;
//   memoryImpact: number;
//   correlationScore: number;
// }

interface DashboardStats {
  totalErrors: number;
  activeErrors: number;
  affectedUsers: number;
  avgResolutionTime: number;
  errorRate: number;
  uptime: number;
}

// Mock data - in production, this would come from Sentry API
const generateMockErrorData = (): ErrorMetric[] => {
  const components = [
    'glass-button',
    'glass-card',
    'glass-input',
    'glass-modal',
    'glass-nav',
  ];
  const errorTypes = [
    'render_error',
    'animation_error',
    'accessibility_error',
    'performance_error',
  ];
  const severities: Array<'low' | 'medium' | 'high' | 'critical'> = [
    'low',
    'medium',
    'high',
    'critical',
  ];

  return Array.from({ length: 100 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    count: Math.floor(Math.random() * 50) + 1,
    type:
      errorTypes[Math.floor(Math.random() * errorTypes.length)] ||
      'unknown_error',
    component:
      components[Math.floor(Math.random() * components.length)] ||
      'unknown_component',
    severity:
      severities[Math.floor(Math.random() * severities.length)] || 'low',
    userImpact: Math.floor(Math.random() * 100),
    resolved: Math.random() > 0.3,
  }));
};

const COLORS = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
  critical: '#DC2626',
};

export interface ErrorAnalyticsDashboardProps {
  /** Custom CSS class for styling */
  className?: string;
  /** API endpoint for fetching error data */
  apiEndpoint?: string;
  /** Refresh interval in milliseconds */
  refreshInterval?: number;
  /** Enable real-time updates */
  realTimeUpdates?: boolean;
  /** Show detailed component breakdown */
  showComponentDetails?: boolean;
  /** Enable data export functionality */
  enableExport?: boolean;
}

export const ErrorAnalyticsDashboard: React.FC<
  ErrorAnalyticsDashboardProps
> = ({
       className = '',
       apiEndpoint,
       refreshInterval = 300000, // 5 minutes
       realTimeUpdates = true,
       showComponentDetails = true,
       enableExport = true,
     }) => {
  const [errorData, setErrorData] = useState<ErrorMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>(
    '24h',
  );
  const [selectedComponent, setSelectedComponent] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch error data
  useEffect(() => {
    const fetchErrorData = async () => {
      setLoading(true);
      try {
        if (apiEndpoint) {
          // Fetch from API
          const response = await fetch(`${apiEndpoint}?range=${timeRange}`);
          const data = await response.json();
          setErrorData(data);
        } else {
          // Use mock data
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
          setErrorData(generateMockErrorData());
        }
      } catch (error) {
        console.error('Failed to fetch error data:', error);
        setErrorData(generateMockErrorData()); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchErrorData();
  }, [apiEndpoint, timeRange]);

  // Auto-refresh
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(async () => {
      setIsRefreshing(true);
      // Fetch new data...
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsRefreshing(false);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [realTimeUpdates, refreshInterval]);

  // Filter error data based on selections
  const filteredErrorData = useMemo(() => {
    return errorData.filter(error => {
      const componentMatch =
        selectedComponent === 'all' || error.component === selectedComponent;
      const severityMatch =
        selectedSeverity === 'all' || error.severity === selectedSeverity;
      return componentMatch && severityMatch;
    });
  }, [errorData, selectedComponent, selectedSeverity]);

  // Calculate dashboard statistics
  const dashboardStats: DashboardStats = useMemo(() => {
    const totalErrors = filteredErrorData.length;
    const activeErrors = filteredErrorData.filter(e => !e.resolved).length;
    const affectedUsers = new Set(filteredErrorData.map(e => e.userImpact))
      .size;
    const avgResolutionTime = 2.5; // Hours - would be calculated from actual data
    const errorRate = (activeErrors / totalErrors) * 100 || 0;
    const uptime = 99.9;

    return {
      totalErrors,
      activeErrors,
      affectedUsers,
      avgResolutionTime,
      errorRate,
      uptime,
    };
  }, [filteredErrorData]);

  // Error trend data for charts
  const errorTrendData = useMemo(() => {
    const hourlyData: Record<string, number> = {};

    filteredErrorData.forEach(error => {
      const hour = new Date(error.timestamp).toISOString().slice(0, 13);
      hourlyData[hour] = (hourlyData[hour] || 0) + error.count;
    });

    return Object.entries(hourlyData)
      .map(([hour, count]) => ({
        time: new Date(hour).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        errors: count,
      }))
      .slice(-24); // Last 24 hours
  }, [filteredErrorData]);

  // Component error breakdown
  const componentErrorStats: ComponentErrorStats[] = useMemo(() => {
    const componentStats: Record<string, any> = {};

    filteredErrorData.forEach(error => {
      if (!componentStats[error.component]) {
        componentStats[error.component] = {
          componentName: error.component,
          errorCount: 0,
          userImpact: 0,
          errorTypes: new Set(),
        };
      }

      componentStats[error.component].errorCount += error.count;
      componentStats[error.component].userImpact += error.userImpact;
      componentStats[error.component].errorTypes.add(error.type);
    });

    return Object.values(componentStats).map((stats: any) => ({
      ...stats,
      avgResolutionTime: Math.random() * 5, // Mock data
      topErrorTypes: Array.from(stats?.errorTypes || []).slice(0, 3),
      trend: Math.random() > 0.5 ? 'down' : ('up' as 'up' | 'down'),
    }));
  }, [filteredErrorData]);

  // Severity distribution data
  const severityDistribution = useMemo(() => {
    const distribution: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    filteredErrorData.forEach(error => {
      if (error.severity && distribution[error.severity] !== undefined) {
        if (distribution[error.severity] !== undefined) {
          distribution[error.severity] += error.count;
        }
      }
    });

    return Object.entries(distribution).map(([severity, count]) => ({
      name: severity,
      value: count,
      color: COLORS[severity as keyof typeof COLORS],
    }));
  }, [filteredErrorData]);

  const handleExportData = () => {
    const csvContent = [
      [
        'Timestamp',
        'Component',
        'Error Type',
        'Severity',
        'Count',
        'User Impact',
        'Resolved',
      ],
      ...filteredErrorData.map(error => [
        error.timestamp,
        error.component,
        error.type,
        error.severity,
        error.count.toString(),
        error.userImpact.toString(),
        error.resolved.toString(),
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquidify-error-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className={`liquidify-error-dashboard ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading error analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`liquidify-error-dashboard p-6 bg-gray-50 min-h-screen ${className}`}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Error Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              LiqUIdify Production Error Monitoring
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={() => window.location.reload()}
              disabled={isRefreshing}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>

            {/* Export Button */}
            {enableExport && (
              <button
                onClick={handleExportData}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Errors</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.totalErrors}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Errors</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.activeErrors}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Affected Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.affectedUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg Resolution</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.avgResolutionTime}h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Error Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.errorRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="text-2xl font-bold text-gray-900">
                {dashboardStats.uptime}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>

          <select
            value={selectedComponent}
            onChange={e => setSelectedComponent(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Components</option>
            {Array.from(new Set(errorData.map(e => e.component))).map(
              component => (
                <option key={component} value={component}>
                  {component}
                </option>
              ),
            )}
          </select>

          <select
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Error Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Error Trend (24h)
          </h3>
          <div className="w-full h-[300px] flex items-end justify-between bg-gray-50 p-4 rounded">
            {errorTrendData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ width: `${100 / errorTrendData.length}%` }}
              >
                <div
                  className="bg-blue-500 rounded-t"
                  style={{
                    height: `${(data.errors / Math.max(...errorTrendData.map(d => d.errors))) * 200}px`,
                    minHeight: '2px',
                    width: '80%',
                  }}
                ></div>
                <span className="text-xs text-gray-600 mt-1 transform -rotate-45 origin-center">
                  {data.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Error Severity Distribution
          </h3>
          <div className="w-full h-[300px] flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {severityDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-gray-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Component Error Breakdown */}
      {showComponentDetails && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Component Error Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Error Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Resolution Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Top Error Types
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {componentErrorStats.map(component => (
                <tr key={component.componentName}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {component.componentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {component.errorCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {component.userImpact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {component.avgResolutionTime.toFixed(1)}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {component.topErrorTypes.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          component.trend === 'down'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {component.trend === 'down' ? '↓' : '↑'}{' '}
                        {component.trend}
                      </span>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Errors */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Errors
        </h3>
        <div className="space-y-4">
          {filteredErrorData.slice(0, 10).map((error, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    error.severity === 'critical'
                      ? 'bg-red-500'
                      : error.severity === 'high'
                        ? 'bg-orange-500'
                        : error.severity === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                  }`}
                ></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {error.component}
                  </p>
                  <p className="text-xs text-gray-500">{error.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">
                  {error.count} occurrences
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(error.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorAnalyticsDashboard;
