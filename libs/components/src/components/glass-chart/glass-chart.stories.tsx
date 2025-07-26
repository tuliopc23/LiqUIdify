import type { Meta, StoryObj } from '@storybook/react';
import type { ChartDataPoint } from './glass-chart';
import { BarChart, DonutChart, LineChart } from './glass-chart';

const meta = {
  title: 'Components/GlassChart',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A collection of chart components with glassmorphic styling including Line, Bar, and Donut charts.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// Sample data
const lineChartData: Array<ChartDataPoint> = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 78 },
  { label: 'Mar', value: 82 },
  { label: 'Apr', value: 71 },
  { label: 'May', value: 89 },
  { label: 'Jun', value: 95 },
  { label: 'Jul', value: 88 },
];

const barChartData: Array<ChartDataPoint> = [
  { label: 'Product A', value: 1250, color: '#3b82f6' },
  { label: 'Product B', value: 2100, color: '#8b5cf6' },
  { label: 'Product C', value: 1800, color: '#ec4899' },
  { label: 'Product D', value: 1450, color: '#10b981' },
  { label: 'Product E', value: 2300, color: '#f59e0b' },
];

const donutChartData: Array<ChartDataPoint> = [
  { label: 'Desktop', value: 45, color: '#3b82f6' },
  { label: 'Mobile', value: 35, color: '#8b5cf6' },
  { label: 'Tablet', value: 20, color: '#ec4899' },
];

// Line Chart Stories
export const LineChartDefault: StoryObj = {
  render: () => (
    <div className="p-8">
      <LineChart data={lineChartData} width={600} height={300} />
    </div>
  ),
};

export const LineChartWithoutDots: StoryObj = {
  render: () => (
    <div className="p-8">
      <LineChart
        data={lineChartData}
        width={600}
        height={300}
        showDots={false}
      />
    </div>
  ),
};

export const LineChartWithoutGradient: StoryObj = {
  render: () => (
    <div className="p-8">
      <LineChart
        data={lineChartData}
        width={600}
        height={300}
        gradient={false}
      />
    </div>
  ),
};

export const LineChartThickStroke: StoryObj = {
  render: () => (
    <div className="p-8">
      <LineChart
        data={lineChartData}
        width={600}
        height={300}
        strokeWidth={5}
      />
    </div>
  ),
};

export const LineChartNoAnimation: StoryObj = {
  render: () => (
    <div className="p-8">
      <LineChart
        data={lineChartData}
        width={600}
        height={300}
        animated={false}
      />
    </div>
  ),
};

// Bar Chart Stories
export const BarChartDefault: StoryObj = {
  render: () => (
    <div className="p-8">
      <BarChart data={barChartData} width={600} height={300} />
    </div>
  ),
};

export const BarChartHorizontal: StoryObj = {
  render: () => (
    <div className="p-8">
      <BarChart
        data={barChartData}
        width={400}
        height={400}
        orientation="horizontal"
      />
    </div>
  ),
};

export const BarChartWithoutValues: StoryObj = {
  render: () => (
    <div className="p-8">
      <BarChart
        data={barChartData}
        width={600}
        height={300}
        showValues={false}
      />
    </div>
  ),
};

export const BarChartSmall: StoryObj = {
  render: () => (
    <div className="p-8">
      <BarChart data={barChartData.slice(0, 3)} width={300} height={200} />
    </div>
  ),
};

// Donut Chart Stories
export const DonutChartDefault: StoryObj = {
  render: () => (
    <div className="p-8">
      <DonutChart data={donutChartData} width={300} height={300} />
    </div>
  ),
};

export const DonutChartWithCenterContent: StoryObj = {
  render: () => (
    <div className="p-8">
      <DonutChart
        data={donutChartData}
        width={300}
        height={300}
        centerContent={
          <div className="text-center">
            <div className="font-bold text-3xl">100%</div>
            <div className="text-secondary text-sm">Total</div>
          </div>
        }
      />
    </div>
  ),
};

export const DonutChartLargeInnerRadius: StoryObj = {
  render: () => (
    <div className="p-8">
      <DonutChart
        data={donutChartData}
        width={300}
        height={300}
        innerRadius={90}
      />
    </div>
  ),
};

export const DonutChartSmallInnerRadius: StoryObj = {
  render: () => (
    <div className="p-8">
      <DonutChart
        data={donutChartData}
        width={300}
        height={300}
        innerRadius={30}
      />
    </div>
  ),
};

export const DonutChartWithoutLabels: StoryObj = {
  render: () => (
    <div className="p-8">
      <DonutChart
        data={donutChartData}
        width={300}
        height={300}
        showLabels={false}
      />
    </div>
  ),
};

// Complex Examples
export const DashboardExample: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-lg">Monthly Revenue</h3>
        <LineChart data={lineChartData} width={400} height={250} />
      </div>
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-lg">Product Sales</h3>
        <BarChart data={barChartData} width={400} height={250} />
      </div>
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-lg">Device Usage</h3>
        <DonutChart data={donutChartData} width={250} height={250} />
      </div>
      <div className="glass-card p-6">
        <h3 className="mb-4 font-semibold text-lg">Growth Trend</h3>
        <LineChart
          data={[
            { label: 'Q1', value: 25 },
            { label: 'Q2', value: 45 },
            { label: 'Q3', value: 60 },
            { label: 'Q4', value: 85 },
          ]}
          width={400}
          height={250}
          strokeWidth={4}
        />
      </div>
    </div>
  ),
};

// Real-time data simulation
const generateRealtimeData = () => {
  const now = new Date();
  return Array.from({ length: 10 }, (_, i) => ({
    label: `${now.getHours()}:${String(now.getMinutes() - (9 - i)).padStart(2, '0')}`,
    value: Math.floor(Math.random() * 50) + 50,
  }));
};

export const RealtimeLineChart: StoryObj = {
  render: () => {
    const [data, setData] = React.useState(generateRealtimeData());

    React.useEffect(() => {
      const interval = setInterval(() => {
        setData(generateRealtimeData());
      }, 2000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="p-8">
        <h3 className="mb-4 font-semibold text-lg">Real-time Monitoring</h3>
        <LineChart data={data} width={600} height={300} animated={true} />
      </div>
    );
  },
};

// Import React for the real-time example
import React from 'react';
