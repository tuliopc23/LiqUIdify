import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import {
  DotsSpinner,
  GlassSpinner,
  PulseSpinner,
  RingSpinner,
  WaveSpinner,
} from "./glass-spinner";

const meta = {
  title: "Components/GlassSpinner",
  component: GlassSpinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The GlassSpinner component provides various loading indicators with glassmorphic styling and smooth animations. 
It includes multiple spinner variants and customization options for different use cases.

## Features
- **Multiple variants**: Default, primary, secondary, success, warning, error, and glass styles
- **Size options**: From extra small (xs) to double extra large (2xl)
- **Speed control**: Slow, normal, and fast animation speeds
- **Custom spinners**: Pulse, Dots, Ring, and Wave spinners
- **Centered mode**: Full-screen centered loading overlay
- **Label support**: Optional loading text
- **Fully accessible**: ARIA attributes for screen readers
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual variant of the spinner",
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "glass",
      ],
    },
    size: {
      description: "Size of the spinner",
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    speed: {
      description: "Animation speed",
      control: { type: "select" },
      options: ["slow", "normal", "fast"],
    },
    orientation: {
      description: "Layout orientation when showing label",
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    label: {
      description: "Loading label text",
      control: { type: "text" },
    },
    showLabel: {
      description: "Show the loading label",
      control: { type: "boolean" },
    },
    centered: {
      description: "Center the spinner with backdrop",
      control: { type: "boolean" },
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    speed: "normal",
  },
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="space-y-2 text-center">
        <GlassSpinner variant="default" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Default
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner variant="primary" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Primary
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner variant="secondary" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Secondary
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner variant="success" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Success
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner variant="warning" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Warning
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner variant="error" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Error
        </p>
      </div>
      <div className="space-y-2 rounded-lg bg-liquid-bg p-4 text-center">
        <GlassSpinner variant="glass" />
        <p className="text-liquid-secondary text-sm">Glass</p>
      </div>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="space-y-2 text-center">
        <GlassSpinner size="xs" />
        <p className="text-liquid-secondary text-xs dark:text-liquid-grey">
          XS
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner size="sm" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Small
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner size="md" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Medium
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner size="lg" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Large
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner size="xl" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          XL
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner size="2xl" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          2XL
        </p>
      </div>
    </div>
  ),
};

// Different speeds
export const Speeds: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="space-y-2 text-center">
        <GlassSpinner speed="slow" size="lg" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Slow
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner speed="normal" size="lg" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Normal
        </p>
      </div>
      <div className="space-y-2 text-center">
        <GlassSpinner speed="fast" size="lg" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Fast
        </p>
      </div>
    </div>
  ),
};

// With labels
export const WithLabels: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <GlassSpinner
          showLabel
          label="Loading content..."
          orientation="horizontal"
        />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Horizontal orientation
        </p>
      </div>
      <div className="space-y-2">
        <GlassSpinner showLabel label="Please wait..." orientation="vertical" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Vertical orientation
        </p>
      </div>
    </div>
  ),
};

// Centered loading overlay
export const CenteredOverlay: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Show Centered Loading (3s)
        </button>
        {loading && (
          <GlassSpinner
            centered
            showLabel
            label="Loading application..."
            size="xl"
            variant="glass"
          />
        )}
        <div className="rounded-lg bg-liquid-bg p-8 dark:bg-liquid-bg">
          <p>This content is behind the loading overlay when active.</p>
        </div>
      </div>
    );
  },
};

// Custom spinner variants
export const CustomSpinners: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-semibold">Pulse Spinner</h3>
        <div className="flex gap-4">
          <PulseSpinner size="sm" />
          <PulseSpinner size="md" />
          <PulseSpinner size="lg" />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Dots Spinner</h3>
        <div className="flex gap-4">
          <DotsSpinner size="sm" count={3} />
          <DotsSpinner size="md" count={4} />
          <DotsSpinner size="lg" count={5} />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Ring Spinner</h3>
        <div className="flex gap-4">
          <RingSpinner size="sm" thickness={2} />
          <RingSpinner size="md" thickness={3} />
          <RingSpinner size="lg" thickness={4} />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">Wave Spinner</h3>
        <div className="flex gap-4">
          <WaveSpinner bars={3} />
          <WaveSpinner bars={5} />
          <WaveSpinner bars={7} />
        </div>
      </div>
    </div>
  ),
};

// Loading states in buttons
export const ButtonLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState({
      save: false,
      submit: false,
      delete: false,
    });

    const handleClick = (action: string) => {
      setLoading((prev) => ({ ...prev, [action]: true }));
      setTimeout(() => {
        setLoading((prev) => ({ ...prev, [action]: false }));
      }, 2000);
    };

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => handleClick("save")}
          disabled={loading.save}
          className="flex items-center gap-2 rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading.save && <GlassSpinner size="xs" />}
          {loading.save ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => handleClick("submit")}
          disabled={loading.submit}
          className="flex items-center gap-2 rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading.submit && <GlassSpinner size="xs" />}
          {loading.submit ? "Submitting..." : "Submit Form"}
        </button>

        <button
          type="button"
          onClick={() => handleClick("delete")}
          disabled={loading.delete}
          className="flex items-center gap-2 rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading.delete && <GlassSpinner size="xs" />}
          {loading.delete ? "Deleting..." : "Delete Item"}
        </button>
      </div>
    );
  },
};

// Loading cards
export const LoadingCards: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-lg bg-liquid-bg p-6 text-center dark:bg-liquid-bg">
        <GlassSpinner variant="primary" size="lg" />
        <p className="mt-4 text-liquid-secondary text-sm dark:text-liquid-grey">
          Loading posts...
        </p>
      </div>
      <div className="rounded-lg bg-liquid-bg p-6 text-center dark:bg-liquid-bg">
        <PulseSpinner />
        <p className="mt-4 text-liquid-secondary text-sm dark:text-liquid-grey">
          Fetching data...
        </p>
      </div>
      <div className="rounded-lg bg-liquid-bg p-6 text-center dark:bg-liquid-bg">
        <WaveSpinner />
        <p className="mt-4 text-liquid-secondary text-sm dark:text-liquid-grey">
          Processing...
        </p>
      </div>
    </div>
  ),
};

// Real-world example - Data table loading
export const DataTableLoading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-lg border border-liquid-grey dark:border-liquid-grey">
          <div className="border-liquid-grey border-b bg-liquid-bg p-4 dark:border-liquid-grey dark:bg-liquid-bg">
            <h3 className="font-semibold">User Data</h3>
          </div>
          {loading ? (
            <div className="p-16 text-center">
              <GlassSpinner
                size="xl"
                variant="primary"
                showLabel
                label="Loading users..."
              />
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-liquid-grey border-b dark:border-liquid-grey">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-liquid-grey border-b dark:border-liquid-grey">
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">john@example.com</td>
                  <td className="px-4 py-2">Active</td>
                </tr>
                <tr className="border-liquid-grey border-b dark:border-liquid-grey">
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">jane@example.com</td>
                  <td className="px-4 py-2">Active</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
          className="mt-4 rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Refresh Data
        </button>
      </div>
    );
  },
};

// Inline loading states
export const InlineLoading: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Checking availability</span>
        <DotsSpinner size="sm" />
      </div>

      <div className="flex items-center gap-2 text-liquid-accent">
        <span>Saving changes</span>
        <GlassSpinner size="xs" variant="success" />
      </div>

      <div className="flex items-center gap-2 text-liquid-accent">
        <span>Syncing data</span>
        <PulseSpinner size="sm" />
      </div>

      <div className="flex items-center gap-2 text-liquid-accent">
        <span>Processing request</span>
        <RingSpinner size="sm" />
      </div>
    </div>
  ),
};

// Theme variations
export const ThemeVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg bg-liquid-bg p-6">
        <h3 className="mb-4 font-semibold">Light Theme</h3>
        <div className="flex gap-4">
          <GlassSpinner variant="primary" />
          <GlassSpinner variant="secondary" />
          <GlassSpinner variant="success" />
          <GlassSpinner variant="warning" />
          <GlassSpinner variant="error" />
        </div>
      </div>
      <div className="rounded-lg bg-liquid-bg p-6">
        <h3 className="mb-4 font-semibold text-liquid-text-inverse">
          Dark Theme
        </h3>
        <div className="flex gap-4">
          <GlassSpinner variant="primary" />
          <GlassSpinner variant="secondary" />
          <GlassSpinner variant="success" />
          <GlassSpinner variant="warning" />
          <GlassSpinner variant="error" />
        </div>
      </div>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <style>{`
        @keyframes rainbow-spin {
          0% { 
            transform: rotate(0deg);
            filter: hue-rotate(0deg);
          }
          100% { 
            transform: rotate(360deg);
            filter: hue-rotate(360deg);
          }
        }
        .rainbow-spinner {
          animation: rainbow-spin 2s linear infinite;
          border-color: transparent;
          border-top-color: #ff0080;
          border-right-color: #ff0080;
        }
      `}</style>

      <div className="space-y-4 text-center">
        <div className="rainbow-spinner inline-block h-12 w-12 rounded-full border-4" />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Custom Rainbow Spinner
        </p>
      </div>

      <div className="space-y-4 text-center">
        <GlassSpinner
          size="xl"
          className="!border-4 !border-gradient-to-r !from-purple-500 !to-pink-500"
        />
        <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
          Gradient Border Spinner
        </p>
      </div>
    </div>
  ),
};
