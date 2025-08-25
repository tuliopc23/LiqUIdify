import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import { GlassErrorBoundary } from "@/components/glass-error-boundary";

const meta = {
  title: "Components/Glass Error Boundary",
  component: GlassErrorBoundary,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    fallback: {
      description: "Custom fallback UI element",
      control: false,
    },
    level: {
      description: "Error boundary level for UI styling",
      control: { type: "select" },
      options: ["component", "page", "app"],
    },
    children: {
      description: "Child components to render",
      control: false,
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
    throw new Error("Intentional error for demo purposes!");
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
      throw new Error("Async error after 2 seconds!");
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
          <h2 className="mb-4 font-bold text-xl">Error Boundary Demo</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Click the button below to trigger an error and see how the error
            boundary handles it.
          </p>
          <div className="mb-6 flex gap-4">
            <GlassButton
              type="button"
              variant="danger"
              onClick={() => setShouldCrash(true)}
            >
              Trigger Error
            </GlassButton>
            <GlassButton
              type="button"
              variant="primary"
              onClick={() => {
                setShouldCrash(false);
                setResetKey((prev) => prev + 1);
              }}
            >
              Reset Demo
            </GlassButton>
          </div>

          <GlassErrorBoundary level="component">
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
          <h2 className="mb-4 font-bold text-xl">Custom Fallback UI</h2>
          <GlassButton
            type="button"
            variant="danger"
            onClick={() => setShouldCrash(true)}
            className="mb-4"
          >
            Trigger Error
          </GlassButton>

          <GlassErrorBoundary
            fallback={(error, _errorInfo) => (
              <div className="glass-effect rounded-lg p-8 text-center">
                <div className="mb-4 text-6xl">🚨</div>
                <h3 className="mb-2 font-bold text-liquid-accent text-xl">
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
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Error boundary with custom fallback UI component",
      },
    },
  },
};

export const DifferentLevels: Story = {
  render: () => {
    const [crashLevel, setCrashLevel] = React.useState<string | null>(null);

    return (
      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          <GlassButton type="button" onClick={() => setCrashLevel("page")}>
            Crash Page Level
          </GlassButton>
          <GlassButton type="button" onClick={() => setCrashLevel("section")}>
            Crash Section Level
          </GlassButton>
          <GlassButton type="button" onClick={() => setCrashLevel("component")}>
            Crash Component Level
          </GlassButton>
          <GlassButton
            type="button"
            variant="primary"
            onClick={() => setCrashLevel(null)}
          >
            Reset All
          </GlassButton>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <GlassErrorBoundary level="page">
            <GlassCard className="h-64 p-6">
              <h3 className="mb-2 font-bold">Page Level</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Largest error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === "page"} />
            </GlassCard>
          </GlassErrorBoundary>

          <GlassErrorBoundary level="page">
            <GlassCard className="h-64 p-6">
              <h3 className="mb-2 font-bold">Section Level</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Medium error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === "section"} />
            </GlassCard>
          </GlassErrorBoundary>

          <GlassErrorBoundary level="component">
            <GlassCard className="h-64 p-6">
              <h3 className="mb-2 font-bold">Component Level</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Smallest error boundary
              </p>
              <BuggyComponent shouldCrash={crashLevel === "component"} />
            </GlassCard>
          </GlassErrorBoundary>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Different error boundary levels with varying visual styles",
      },
    },
  },
};
