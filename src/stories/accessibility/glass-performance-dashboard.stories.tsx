import type { Meta, StoryObj } from '@storybook/react';
import { GlassPerformanceDashboard } from '../../components/glass-performance-dashboard';
import { useEffect, useState } from 'react';
import { performanceMonitor } from '../../core/performance-monitor';
import { GlassButton } from '../../components/glass-button';
import { GlassCard } from '../../components/glass-card';
import { withPerformanceMonitoring } from '../../hooks/use-performance-monitoring';

const meta = {
  title: 'Accessibility/GlassPerformanceDashboard',
  component: GlassPerformanceDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        // Initialize performance monitoring
        performanceMonitor.init();
      }, []);
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof GlassPerformanceDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component with performance monitoring
const DemoComponent = withPerformanceMonitoring(({ delay = 100 }: { delay?: number }) => {
  const [count, setCount] = useState(0);
  
  // Simulate expensive render
  const expensiveCalculation = () => {
    const start = performance.now();
    while (performance.now() - start < delay) {
      // Busy wait
    }
  };
  
  expensiveCalculation();
  
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold mb-4">Performance Test Component</h3>
      <p className="mb-4">Render count: {count}</p>
      <GlassButton onClick={() => setCount(c => c + 1)}>
        Trigger Re-render
      </GlassButton>
    </GlassCard>
  );
}, 'DemoComponent');

export const Default: Story = {
  args: {
    position: 'bottom-right',
  },
  render: (args) => (
    <>
      <DemoComponent />
      <GlassPerformanceDashboard {...args} />
    </>
  ),
};

export const TopLeft: Story = {
  args: {
    position: 'top-left',
  },
  render: (args) => (
    <>
      <DemoComponent />
      <GlassPerformanceDashboard {...args} />
    </>
  ),
};

export const TopRight: Story = {
  args: {
    position: 'top-right',
  },
  render: (args) => (
    <>
      <DemoComponent />
      <GlassPerformanceDashboard {...args} />
    </>
  ),
};

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
  },
  render: (args) => (
    <>
      <DemoComponent />
      <GlassPerformanceDashboard {...args} />
    </>
  ),
};

export const CollapsedByDefault: Story = {
  args: {
    collapsed: true,
  },
  render: (args) => (
    <>
      <DemoComponent />
      <GlassPerformanceDashboard {...args} />
    </>
  ),
};

export const WithMultipleComponents: Story = {
  render: () => {
    const SlowComponent = withPerformanceMonitoring(() => {
      // Simulate slow render
      const start = performance.now();
      while (performance.now() - start < 50) {}
      
      return (
        <GlassCard className="p-4 mb-4">
          <h4 className="font-medium">Slow Component (50ms render)</h4>
        </GlassCard>
      );
    }, 'SlowComponent');
    
    const FastComponent = withPerformanceMonitoring(() => {
      return (
        <GlassCard className="p-4 mb-4">
          <h4 className="font-medium">Fast Component (&lt;1ms render)</h4>
        </GlassCard>
      );
    }, 'FastComponent');
    
    return (
      <>
        <div className="grid grid-cols-2 gap-4">
          <SlowComponent />
          <FastComponent />
          <DemoComponent delay={20} />
          <DemoComponent delay={150} />
        </div>
        <GlassPerformanceDashboard />
      </>
    );
  },
};

export const WithCustomActions: Story = {
  render: () => {
    const [showDashboard, setShowDashboard] = useState(true);
    
    return (
      <>
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Dashboard Controls</h3>
          <div className="space-y-4">
            <GlassButton 
              onClick={() => setShowDashboard(!showDashboard)}
              variant={showDashboard ? 'default' : 'outline'}
            >
              {showDashboard ? 'Hide' : 'Show'} Dashboard
            </GlassButton>
            
            <GlassButton 
              onClick={() => {
                // Trigger custom metric
                performanceMonitor.startTiming('custom-action');
                setTimeout(() => {
                  performanceMonitor.endTiming('custom-action');
                }, Math.random() * 1000);
              }}
            >
              Track Custom Action
            </GlassButton>
            
            <GlassButton 
              onClick={() => {
                // Simulate layout shift
                const el = document.createElement('div');
                el.style.height = '100px';
                el.style.background = 'rgba(255,255,255,0.1)';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 1000);
              }}
              variant="destructive"
            >
              Trigger Layout Shift
            </GlassButton>
          </div>
        </GlassCard>
        
        {showDashboard && (
          <GlassPerformanceDashboard 
            onClose={() => setShowDashboard(false)}
          />
        )}
      </>
    );
  },
};

export const StressTest: Story = {
  render: () => {
    const [components, setComponents] = useState(10);
    
    const StressComponent = withPerformanceMonitoring(({ index }: { index: number }) => {
      const [localCount, setLocalCount] = useState(0);
      
      // Random render delay
      const delay = Math.random() * 20;
      const start = performance.now();
      while (performance.now() - start < delay) {}
      
      return (
        <GlassCard className="p-2">
          <div className="text-xs">Component {index}</div>
          <div className="text-xs text-gray-400">Count: {localCount}</div>
          <button 
            className="text-xs underline"
            onClick={() => setLocalCount(c => c + 1)}
          >
            Update
          </button>
        </GlassCard>
      );
    }, 'StressComponent');
    
    return (
      <>
        <div className="mb-4">
          <GlassCard className="p-4">
            <h3 className="font-semibold mb-2">Stress Test Controls</h3>
            <div className="flex gap-2">
              <GlassButton 
                size="sm"
                onClick={() => setComponents(c => Math.max(0, c - 10))}
              >
                -10
              </GlassButton>
              <span className="flex items-center px-4">{components} components</span>
              <GlassButton 
                size="sm"
                onClick={() => setComponents(c => c + 10)}
              >
                +10
              </GlassButton>
            </div>
          </GlassCard>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: components }, (_, i) => (
            <StressComponent key={i} index={i} />
          ))}
        </div>
        
        <GlassPerformanceDashboard />
      </>
    );
  },
};