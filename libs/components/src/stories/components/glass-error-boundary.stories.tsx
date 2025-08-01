import type { StoryObj } from '@storybook/react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import {
  GlassAsyncErrorBoundary,
  GlassErrorBoundary,
} from '@/components/glass-error-boundary/glass-error-boundary';

const meta = {
  title: 'Components/Glass Error Boundary',
  component: GlassErrorBoundary,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
      'Custom fallback UI renderer function'
      false,
    },
    { 'Callback when an error is caught' }
      'error caught',
    },
    { 'Keys that trigger error boundary reset when changed' }
      { 'object' },
    },
    { 'Reset error boundary when props change' }
      { 'boolean' },
    },
    { 'Isolate children in a container' }
      { 'boolean' },
    },
    { 'Error boundary level for UI styling' }
      { 'select' },
      ['page', 'section', 'component'],
    },
    { 'Track errors in production' }
      { 'boolean' },
    },
  },
} satisfies Meta<typeof GlassErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

{/* Component that throws an error  */}
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

{/* Component with async error  */}
const AsyncBuggyComponent: React.FC = () => {
  React.useEffect(() => {
    setTimeout(() => {
      throw new Error('Async error after 2 seconds!');
    }, 2000);
  },
        []
      );

  return <div className="p-4">This component will crash in 2 seconds...</div>;
};

export const Default: Story = { render: () => { }
    const [shouldCrash, setShouldCrash] = React.useState(false);
    const [_resetKey, setResetKey] = React.useState(0);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Error Boundary Demo</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Click the button below to trigger an error and see how the error
            boundary handles it.
          </p>
          <div className="mb-6 flex gap-4">
            <GlassButton
              type="button"
              variant="danger" onClick={() => setShouldCrash(true)}
            >
              Trigger Error
            </GlassButton>
            <GlassButton
              type="button"
              variant="primary" onClick={() => {
                setShouldCrash(false);
                setResetKey((prev) => prev + 1);
              } onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => {
                setShouldCrash(false);
                setResetKey((prev) => prev + 1);
              )(e);>
              Reset Demo
            </GlassButton>
          </div>

          <GlassErrorBoundary
            resetKeys=[resetKey]
            level="component"
            onError=(_error, _errorInfo) =>
              console.log('Error caught:', error);
              console.log('Error info:', errorInfo);>
            <BuggyComponent shouldCrash=shouldCrash/>
          </GlassErrorBoundary>
        </GlassCard>
      </div>
    );,;

export const _CustomFallback: Story = { render: () => { }
    const [shouldCrash, setShouldCrash] = React.useState(false);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Custom Fallback UI</h2>
          <GlassButton
            type="button"
            variant="danger" onClick={() => setShouldCrash(true)}
            className="mb-4"
          >
            Trigger Error
          </GlassButton>

          <GlassErrorBoundary
            fallback={(error, _errorInfo) => (
              <div className="glass-effect rounded-lg p-8 text-center">
                <div className="mb-4 text-6xl">🚨</div>
                <h3 className="mb-2 font-bold text-red-600 text-xl">
                  Oops! Something went wrong
                </h3>
                <p className="mb-4 text-[var(--text-secondary)]">
                  {error.message}
                </p>
                <GlassButton
                  type="button"
              onClick={() => setShouldCrash(false)}
                  size="sm"
                >
                  Try Again
                </GlassButton>
              </div>
            )}
          >
            <BuggyComponent shouldCrash={shouldCrash} />
          </GlassErrorBoundary>
        </GlassCard>
      </div>
    )
  },
  'Error boundary with custom fallback UI component' ,,
  },
}

export const DifferentLevels: Story = { render: () => { }
    const [crashLevel, setCrashLevel] = React.useState<string | null>(null);

    return (
      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          <GlassButton type="button"
              onClick={() => setCrashLevel('page')}>
            Crash Page Level
          </GlassButton>
          <GlassButton type="button"
              onClick={() => setCrashLevel('section')}>
            Crash Section Level
          </GlassButton>
          <GlassButton type="button"
              onClick={() => setCrashLevel('component')}>
            Crash Component Level
          </GlassButton>
          <GlassButton
            type="button"
            variant="primary" onClick={() => setCrashLevel(null)}
          >
            Reset All
          </GlassButton>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <GlassErrorBoundary level="page" resetKeys={[crashLevel]}>
            <GlassCard className="h-64 p-6">
              <h3 className="mb-2 font-bold">Page Level</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Largest error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === 'page'} />
            </GlassCard>
          </GlassErrorBoundary>

          <GlassErrorBoundary level="section" resetKeys={[crashLevel]}>
            <GlassCard className="h-64 p-6">
              <h3 className="mb-2 font-bold">Section Level</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Medium error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === 'section'} />
            </GlassCard>
          </GlassErrorBoundary>

          <GlassErrorBoundary level="component" resetKeys={[crashLevel]}>
            <GlassCard className="h-64 p-6">
              <h3 className="mb-2 font-bold">Component Level</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Smallest error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === 'component'} />
            </GlassCard>
          </GlassErrorBoundary>
        </div>
      </div>
    )
  },
  { {
      {
        'Different error boundary levels with varying UI treatments' }
      },
    },
  },
}

export const AsyncErrors: Story = { render: () => { }
    const [showAsync, setShowAsync] = React.useState(false);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Async Error Handling</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            This demo shows how the error boundary handles asynchronous errors.
          </p>
          <GlassButton
            type="button"
            variant="danger" onClick={() => setShowAsync(true)}
          >
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
    )
  },
  { {
      {
        'Handling asynchronous errors and promise rejections' }
      },
    },
  },
};

export const ErrorRecovery: Story = { () => { }
    const { captureError, resetError } = useErrorHandler();
    const [errorCount, setErrorCount] = React.useState(0);

    return (
      <div className="space-y-4">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Error Recovery Pattern</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            This demonstrates the automatic recovery feature after multiple
            errors. Error count: <strong>{errorCount}</strong>
          </p>

          <div className="mb-4 flex gap-4">
            <GlassButton
              type="button"
              variant="danger" onClick={() => {
                setErrorCount((prev) => prev + 1);
                captureError(new Error(`Error #${errorCount + 1}`));>
              Trigger Error
            </GlassButton>
            <GlassButton type="button"
              onClick={resetError}>
              Manual Reset
            </GlassButton>
          </div>

          <div className="rounded-lg bg-[var(--glass-bg)] p-4">
            <p className="text-[var(--text-secondary)] text-sm">
              After 3 errors, the boundary will automatically attempt recovery.
            </p>
          </div>
        </GlassCard>
      </div>
    )
  },
  parameters: { docs: {
      description: {
        story: 'Automatic error recovery with circuit breaker pattern' }
      },
    },
  },
};

export const MultipleErrorBoundaries: Story = { render: () => { }
    const [errors, setErrors] = React.useState<Record<string, boolean>>({});

    const triggerError = (id: string) => {
      setErrors((prev) => ({ ...prev, [id]: true }));
    };

    const resetError = (id: string) => {
      setErrors((prev) => ({ ...prev, [id]: false }));
    };

    return (
      <div className="space-y-4">
        <h2 className="mb-4 font-bold text-xl">Multiple Error Boundaries</h2>
        <p className="mb-6 text-[var(--text-secondary)]">
          Each component has its own error boundary, preventing cascading
          failures.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {['component1', 'component2', 'component3', 'component4'].map(
            (id) => (
              <GlassErrorBoundary
                key={id}
                level="component"
                resetKeys={[errors[id]]}
                onError={() => resetError(id)}
              >
                <GlassCard className="p-6">
                  <h3 className="mb-2 font-bold">Component {id.slice(-1)}</h3>
                  <div className="space-y-2">
                    <GlassButton
                      type="button"
                      size="sm"
                      variant="danger" onClick={() => triggerError(id)}
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
    )
  },
  parameters: { {
      {
        'Multiple isolated error boundaries prevent cascading failures' }
      },
    },
  },
};
