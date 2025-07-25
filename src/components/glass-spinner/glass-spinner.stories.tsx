import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { 
  GlassSpinner, 
  PulseSpinner, 
  DotsSpinner, 
  RingSpinner, 
  WaveSpinner 
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
      options: ["default", "primary", "secondary", "success", "warning", "error", "glass"],
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
      <div className="text-center space-y-2">
        <GlassSpinner variant="default" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Default</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner variant="primary" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Primary</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner variant="secondary" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Secondary</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner variant="success" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Success</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner variant="warning" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Warning</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner variant="error" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Error</p>
      </div>
      <div className="text-center space-y-2 p-4 bg-gray-900 rounded-lg">
        <GlassSpinner variant="glass" />
        <p className="text-sm text-gray-400">Glass</p>
      </div>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center space-y-2">
        <GlassSpinner size="xs" />
        <p className="text-xs text-gray-600 dark:text-gray-400">XS</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner size="sm" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Small</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner size="md" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner size="lg" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Large</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner size="xl" />
        <p className="text-sm text-gray-600 dark:text-gray-400">XL</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner size="2xl" />
        <p className="text-sm text-gray-600 dark:text-gray-400">2XL</p>
      </div>
    </div>
  ),
};

// Different speeds
export const Speeds: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="text-center space-y-2">
        <GlassSpinner speed="slow" size="lg" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Slow</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner speed="normal" size="lg" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Normal</p>
      </div>
      <div className="text-center space-y-2">
        <GlassSpinner speed="fast" size="lg" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Fast</p>
      </div>
    </div>
  ),
};

// With labels
export const WithLabels: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <GlassSpinner showLabel label="Loading content..." orientation="horizontal" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Horizontal orientation</p>
      </div>
      <div className="space-y-2">
        <GlassSpinner showLabel label="Please wait..." orientation="vertical" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Vertical orientation</p>
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
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
        <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
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
          onClick={() => handleClick("save")}
          disabled={loading.save}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading.save && <GlassSpinner size="xs" />}
          {loading.save ? "Saving..." : "Save Changes"}
        </button>
        
        <button
          onClick={() => handleClick("submit")}
          disabled={loading.submit}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading.submit && <GlassSpinner size="xs" />}
          {loading.submit ? "Submitting..." : "Submit Form"}
        </button>
        
        <button
          onClick={() => handleClick("delete")}
          disabled={loading.delete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <GlassSpinner variant="primary" size="lg" />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading posts...</p>
      </div>
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <PulseSpinner />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Fetching data...</p>
      </div>
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <WaveSpinner />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Processing...</p>
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
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold">User Data</h3>
          </div>
          {loading ? (
            <div className="p-16 text-center">
              <GlassSpinner size="xl" variant="primary" showLabel label="Loading users..." />
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">john@example.com</td>
                  <td className="px-4 py-2">Active</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">jane@example.com</td>
                  <td className="px-4 py-2">Active</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
      
      <div className="flex items-center gap-2 text-green-600">
        <span>Saving changes</span>
        <GlassSpinner size="xs" variant="success" />
      </div>
      
      <div className="flex items-center gap-2 text-blue-600">
        <span>Syncing data</span>
        <PulseSpinner size="sm" />
      </div>
      
      <div className="flex items-center gap-2 text-purple-600">
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
      <div className="p-6 bg-white rounded-lg">
        <h3 className="font-semibold mb-4">Light Theme</h3>
        <div className="flex gap-4">
          <GlassSpinner variant="primary" />
          <GlassSpinner variant="secondary" />
          <GlassSpinner variant="success" />
          <GlassSpinner variant="warning" />
          <GlassSpinner variant="error" />
        </div>
      </div>
      <div className="p-6 bg-gray-900 rounded-lg">
        <h3 className="font-semibold text-white mb-4">Dark Theme</h3>
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
      
      <div className="text-center space-y-4">
        <div className="inline-block w-12 h-12 border-4 rounded-full rainbow-spinner" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Custom Rainbow Spinner</p>
      </div>
      
      <div className="text-center space-y-4">
        <GlassSpinner 
          size="xl" 
          className="!border-4 !border-gradient-to-r !from-purple-500 !to-pink-500"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400">Gradient Border Spinner</p>
      </div>
    </div>
  ),
};