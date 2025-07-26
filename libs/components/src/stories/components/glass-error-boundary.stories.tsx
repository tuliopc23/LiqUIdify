import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import {
  GlassAsyncErrorBoundary,
  GlassErrorBoundary,
  useErrorHandler,
} from '@/components/glass-error-boundary/glass-error-boundary';

const meta = {
  title: 'Components/Glass Error Boundary',
  component: GlassErrorBoundary,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An error boundary component that gracefully handles JavaScript errors in React components. Features glassmorphism design, automatic recovery, and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fallback: {
      description: 'Custom fallback UI renderer function',
      control: false,
    },
    onError: {
      description: 'Callback when an error is caught',
      action: 'error caught',
    },
    resetKeys: {
      description: 'Keys that trigger error boundary reset when changed',
      control: { type: 'object' },
    },
    resetOnPropsChange: {
      description: 'Reset error boundary when props change',
      control: { type: 'boolean' },
    },
    isolate: {
      description: 'Isolate children in a container',
      control: { type: 'boolean' },
    },
    level: {
      description: 'Error boundary level for UI styling',
      control: { type: 'select' },
      options: ['page', 'section', 'component'],
    },
    trackErrors: {
      description: 'Track errors in production',
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof GlassErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error
const BuggyComponent: React.FC<{ shouldCrash?: boolean }> = ({
  shouldCrash = false,
}) => {
  if (shouldCrash) {
    throw new Error('Intentional error for demo purposes!');
  }
  return (
    <div className="p-4 text-[var(--text-primary)]">
      Component is working normally!
    </div>
  );
};

// Component with async error
const AsyncBuggyComponent: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => {
      throw new Error('Async error after 2 seconds!');
    }, 2000);
  }, []);

  return <div className="p-4">This component will crash in 2 seconds...</div>;
};

export const Default: Story = {
  render: () => {
    const [shouldCrash, setShouldCrash] = React.useState(false);
    const [resetKey, setResetKey] = React.useState(0);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Error Boundary Demo</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Click the button below to trigger an error and see how the error
            boundary handles it.
          </p>
          <div className="flex gap-4 mb-6">
            <GlassButton variant="danger" onClick={() => setShouldCrash(true)}>
              Trigger Error
            </GlassButton>
            <GlassButton
              variant="primary"
              onClick={() => {
                setShouldCrash(false);
                setResetKey((prev) => prev + 1);
              }}
            >
              Reset Demo
            </GlassButton>
          </div>

          <GlassErrorBoundary
            resetKeys={[resetKey]}
            level="component"
            onError={(error, errorInfo) => {
              console.log('Error caught:', error);
              console.log('Error info:', errorInfo);
            }}
          >
            <BuggyComponent shouldCrash={shouldCrash} />
          </GlassErrorBoundary>
        </GlassCard>
      </div>
    );
  },
};

export const CustomFallback: Story = {
  render: () => {
    const [shouldCrash, setShouldCrash] = React.useState(false);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Custom Fallback UI</h2>
          <GlassButton
            variant="danger"
            onClick={() => setShouldCrash(true)}
            className="mb-4"
          >
            Trigger Error
          </GlassButton>

          <GlassErrorBoundary
            fallback={(error, errorInfo) => (
              <div className="glass-effect rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🚨</div>
                <h3 className="text-xl font-bold mb-2 text-red-600">
                  Oops! Something went wrong
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {error.message}
                </p>
                <GlassButton onClick={() => setShouldCrash(false)} size="sm">
                  Try Again
                </GlassButton>
              </div>
            )}
          >
            <BuggyComponent shouldCrash={shouldCrash} />
          </GlassErrorBoundary>
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Error boundary with custom fallback UI component',
      },
    },
  },
};

export const DifferentLevels: Story = {
  render: () => {
    const [crashLevel, setCrashLevel] = React.useState<string | null>(null);

    return (
      <div className="space-y-6">
        <div className="flex gap-4 justify-center">
          <GlassButton onClick={() => setCrashLevel('page')}>
            Crash Page Level
          </GlassButton>
          <GlassButton onClick={() => setCrashLevel('section')}>
            Crash Section Level
          </GlassButton>
          <GlassButton onClick={() => setCrashLevel('component')}>
            Crash Component Level
          </GlassButton>
          <GlassButton variant="primary" onClick={() => setCrashLevel(null)}>
            Reset All
          </GlassButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassErrorBoundary level="page" resetKeys={[crashLevel]}>
            <GlassCard className="p-6 h-64">
              <h3 className="font-bold mb-2">Page Level</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Largest error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === 'page'} />
            </GlassCard>
          </GlassErrorBoundary>

          <GlassErrorBoundary level="section" resetKeys={[crashLevel]}>
            <GlassCard className="p-6 h-64">
              <h3 className="font-bold mb-2">Section Level</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Medium error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === 'section'} />
            </GlassCard>
          </GlassErrorBoundary>

          <GlassErrorBoundary level="component" resetKeys={[crashLevel]}>
            <GlassCard className="p-6 h-64">
              <h3 className="font-bold mb-2">Component Level</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Smallest error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === 'component'} />
            </GlassCard>
          </GlassErrorBoundary>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different error boundary levels with varying UI treatments',
      },
    },
  },
};

export const AsyncErrors: Story = {
  render: () => {
    const [showAsync, setShowAsync] = React.useState(false);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Async Error Handling</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            This demo shows how the error boundary handles asynchronous errors.
          </p>
          <GlassButton variant="danger" onClick={() => setShowAsync(true)}>
            Load Async Component
          </GlassButton>

          {showAsync && (
            <GlassAsyncErrorBoundary
              level="component"
              onError={() => setShowAsync(false)}
            >
              <div className="mt-4">
                <AsyncBuggyComponent />
              </div>
            </GlassAsyncErrorBoundary>
          )}
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Handling asynchronous errors and promise rejections',
      },
    },
  },
};

export const ErrorRecovery: Story = {
  render: () => {
    const { captureError, resetError } = useErrorHandler();
    const [errorCount, setErrorCount] = React.useState(0);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Error Recovery Pattern</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            This demonstrates the automatic recovery feature after multiple
            errors. Error count: <strong>{errorCount}</strong>
          </p>

          <div className="flex gap-4 mb-4">
            <GlassButton
              variant="danger"
              onClick={() => {
                setErrorCount((prev) => prev + 1);
                captureError(new Error(`Error #${errorCount + 1}`));
              }}
            >
              Trigger Error
            </GlassButton>
            <GlassButton onClick={resetError}>Manual Reset</GlassButton>
          </div>

          <div className="p-4 bg-[var(--glass-bg)] rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">
              After 3 errors, the boundary will automatically attempt recovery.
            </p>
          </div>
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Automatic error recovery with circuit breaker pattern',
      },
    },
  },
};

export const MultipleErrorBoundaries: Story = {
  render: () => {
    const [errors, setErrors] = React.useState<Record<string, boolean>>({});

    const triggerError = (id: string) => {
      setErrors((prev) => ({ ...prev, [id]: true }));
    };

    const resetError = (id: string) => {
      setErrors((prev) => ({ ...prev, [id]: false }));
    };

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Multiple Error Boundaries</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Each component has its own error boundary, preventing cascading
          failures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['component1', 'component2', 'component3', 'component4'].map(
            (id) => (
              <GlassErrorBoundary
                key={id}
                level="component"
                resetKeys={[errors[id]]}
                onError={() => resetError(id)}
              >
                <GlassCard className="p-6">
                  <h3 className="font-bold mb-2">Component {id.slice(-1)}</h3>
                  <div className="space-y-2">
                    <GlassButton
                      size="sm"
                      variant="danger"
                      onClick={() => triggerError(id)}
                    >
                      Break This Component
                    </GlassButton>
                    <BuggyComponent shouldCrash={errors[id]} />
                  </div>
                </GlassCard>
              </GlassErrorBoundary>
            )
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple isolated error boundaries prevent cascading failures',
      },
    },
  },
};
