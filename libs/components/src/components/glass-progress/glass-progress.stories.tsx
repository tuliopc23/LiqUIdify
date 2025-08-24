import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { GlassProgress } from "./glass-progress";

const meta = {
  title: "Components/GlassProgress",
  component: GlassProgress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The GlassProgress component displays progress and loading states with beautiful glassmorphic styling. 
It supports different sizes, colors, variants, and can optionally show the percentage value.

## Features
- **Multiple sizes**: Small, medium, and large
- **Color options**: Blue, green, purple, red, yellow
- **Variants**: Default glass, gradient, and minimal styles
- **Value display**: Optional percentage display
- **Smooth animations**: Animated progress transitions
- **Shimmer effect**: Subtle animation for visual appeal
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      description: "Current progress value",
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    max: {
      description: "Maximum value (default: 100)",
      control: { type: "number", min: 1 },
    },
    size: {
      description: "Size of the progress bar",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      description: "Visual variant of the progress bar",
      control: { type: "select" },
      options: ["default", "gradient", "minimal"],
    },
    showValue: {
      description: "Show the percentage value",
      control: { type: "boolean" },
    },
    color: {
      description: "Color theme of the progress bar",
      control: { type: "select" },
      options: ["blue", "green", "purple", "red", "yellow"],
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    size: "md",
    variant: "default",
    showValue: false,
    color: "blue",
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">Small</p>
        <GlassProgress value={40} size="sm" />
      </div>
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">Medium</p>
        <GlassProgress value={60} size="md" />
      </div>
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">Large</p>
        <GlassProgress value={80} size="lg" />
      </div>
    </div>
  ),
};

// Different colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassProgress value={20} color="blue" showValue />
      <GlassProgress value={40} color="green" showValue />
      <GlassProgress value={60} color="purple" showValue />
      <GlassProgress value={80} color="red" showValue />
      <GlassProgress value={100} color="yellow" showValue />
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">
          Default Glass
        </p>
        <GlassProgress value={70} variant="default" />
      </div>
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">
          Gradient
        </p>
        <GlassProgress value={70} variant="gradient" />
      </div>
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">Minimal</p>
        <GlassProgress value={70} variant="minimal" />
      </div>
    </div>
  ),
};

// With value display
export const WithValue: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassProgress value={0} showValue />
      <GlassProgress value={25} showValue />
      <GlassProgress value={50} showValue />
      <GlassProgress value={75} showValue />
      <GlassProgress value={100} showValue />
    </div>
  ),
};

// Animated progress
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="space-y-4">
        <GlassProgress value={progress} showValue color="blue" />
        <p className="text-center text-gray-600 text-sm dark:text-gray-400">
          Continuously animating progress
        </p>
      </div>
    );
  },
};

// Loading simulation
export const LoadingSimulation: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
      setLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 15 + 5;
          const newProgress = Math.min(prev + increment, 100);

          if (newProgress >= 100) {
            clearInterval(interval);
            setLoading(false);
          }

          return newProgress;
        });
      }, 500);
    };

    return (
      <div className="space-y-4">
        <GlassProgress value={progress} showValue color="green" />
        <button
          type="button"
          onClick={startLoading}
          disabled={loading}
          className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Loading..." : "Start Loading"}
        </button>
      </div>
    );
  },
};

// Multiple progress bars
export const MultipleProgress: Story = {
  render: () => {
    const tasks = [
      { name: "Uploading files", progress: 75, color: "blue" as const },
      { name: "Processing data", progress: 45, color: "purple" as const },
      { name: "Generating report", progress: 90, color: "green" as const },
      { name: "Sending emails", progress: 30, color: "yellow" as const },
    ];

    return (
      <div className="space-y-6">
        {tasks.map((task, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-sm">{task.name}</span>
              <span className="text-gray-600 text-sm dark:text-gray-400">
                {task.progress}%
              </span>
            </div>
            <GlassProgress value={task.progress} color={task.color} />
          </div>
        ))}
      </div>
    );
  },
};

// Custom max value
export const CustomMaxValue: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">
          Steps: 7 out of 10
        </p>
        <GlassProgress value={7} max={10} showValue />
      </div>
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">
          Experience: 1,250 / 2,000 XP
        </p>
        <GlassProgress value={1250} max={2000} color="purple" />
      </div>
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">
          Storage: 4.5GB / 10GB
        </p>
        <GlassProgress value={4.5} max={10} color="red" />
      </div>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const simulateUpload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      const duration = 5000; // 5 seconds
      const interval = 50; // Update every 50ms
      const increment = 100 / (duration / interval);

      const timer = setInterval(() => {
        setUploadProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(timer);
            setIsUploading(false);
            return 100;
          }
          return next;
        });
      }, interval);
    };

    return (
      <div className="space-y-8">
        {/* File Upload */}
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
          <h3 className="mb-4 font-semibold">File Upload</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">document.pdf</span>
              <span className="text-gray-500 text-sm">
                {Math.round(uploadProgress)}%
              </span>
            </div>
            <GlassProgress value={uploadProgress} size="sm" color="blue" />
            <button
              type="button"
              onClick={simulateUpload}
              disabled={isUploading}
              className="text-blue-500 text-sm hover:text-blue-600 disabled:text-gray-400"
            >
              {isUploading ? "Uploading..." : "Start Upload"}
            </button>
          </div>
        </div>

        {/* Skill Progress */}
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
          <h3 className="mb-4 font-semibold">Skills</h3>
          <div className="space-y-4">
            {[
              { skill: "React", level: 90, color: "blue" as const },
              { skill: "TypeScript", level: 85, color: "purple" as const },
              { skill: "Node.js", level: 75, color: "green" as const },
              { skill: "Python", level: 60, color: "yellow" as const },
            ].map((item) => (
              <div key={item.skill}>
                <div className="mb-1 flex justify-between">
                  <span className="font-medium text-sm">{item.skill}</span>
                  <span className="text-gray-500 text-sm">{item.level}%</span>
                </div>
                <GlassProgress
                  value={item.level}
                  size="sm"
                  color={item.color}
                />
              </div>
            ))}
          </div>
        </div>

        {/* System Resources */}
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
          <h3 className="mb-4 font-semibold">System Resources</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-gray-500 text-sm">45%</span>
              </div>
              <GlassProgress
                value={45}
                size="sm"
                color="blue"
                variant="minimal"
              />
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm">Memory</span>
                <span className="text-gray-500 text-sm">72%</span>
              </div>
              <GlassProgress
                value={72}
                size="sm"
                color="yellow"
                variant="minimal"
              />
            </div>
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm">Disk Space</span>
                <span className="text-gray-500 text-sm">89%</span>
              </div>
              <GlassProgress
                value={89}
                size="sm"
                color="red"
                variant="minimal"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Indeterminate state (infinite loading)
export const IndeterminateLoading: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-gray-600 text-sm dark:text-gray-400">
          Processing... (Simulated with cycling progress)
        </p>
        <div className="relative">
          <GlassProgress value={100} color="blue" />
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="h-full w-1/3 animate-slide bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-slide {
          animation: slide 1.5s infinite;
        }
      `}</style>
    </div>
  ),
};

// Stacked progress (segments)
export const StackedProgress: Story = {
  render: () => {
    const segments = [
      { label: "Completed", value: 40, color: "bg-green-500" },
      { label: "In Progress", value: 30, color: "bg-blue-500" },
      { label: "Pending", value: 30, color: "bg-gray-300" },
    ];

    return (
      <div className="space-y-4">
        <div className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`h-full ${segment.color} transition-all duration-500`}
              style={{ width: `${segment.value}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-sm">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${segment.color}`} />
              <span>
                {segment.label}: {segment.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// Theme variations
export const ThemeVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6">
        <h3 className="mb-4 font-semibold">Light Theme</h3>
        <div className="space-y-3">
          <GlassProgress value={60} showValue />
          <GlassProgress value={60} variant="gradient" color="purple" />
          <GlassProgress value={60} variant="minimal" color="green" />
        </div>
      </div>
      <div className="rounded-lg bg-gray-900 p-6">
        <h3 className="mb-4 font-semibold text-white">Dark Theme</h3>
        <div className="space-y-3">
          <GlassProgress value={60} showValue />
          <GlassProgress value={60} variant="gradient" color="purple" />
          <GlassProgress value={60} variant="minimal" color="green" />
        </div>
      </div>
    </div>
  ),
};
