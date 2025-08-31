import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LiquidCircularProgress, LiquidProgress } from "./liquid-progress";

const meta = {
  title: "Components/LiquidProgress",
  component: LiquidProgress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass progress component with multiple variants, animations, and circular progress option.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger", "ghost"],
      description: "The visual style variant of the progress",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the progress bar",
    },
    shape: {
      control: "select",
      options: ["rounded", "square", "soft"],
      description: "The shape of the progress bar",
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value",
    },
    max: {
      control: "number",
      description: "Maximum progress value",
    },
    labelPosition: {
      control: "select",
      options: ["top", "bottom", "inline", "side"],
      description: "Position of the label",
    },
    showValue: {
      control: "boolean",
      description: "Show current value",
    },
    indeterminate: {
      control: "boolean",
      description: "Indeterminate loading state",
    },
    animated: {
      control: "boolean",
      description: "Enable gradient animation",
    },
    striped: {
      control: "boolean",
      description: "Enable striped pattern",
    },
    pulsing: {
      control: "boolean",
      description: "Enable pulsing animation",
    },
  },
  args: {
    variant: "default",
    size: "md",
    shape: "rounded",
    value: 60,
    max: 100,
    labelPosition: "top",
    showValue: false,
    indeterminate: false,
    animated: false,
    striped: false,
    pulsing: false,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <div className="w-80">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Progress Variants</h2>
        <div className="space-y-6">
          <LiquidProgress variant="default" value={75} label="Default Progress" showValue />
          <LiquidProgress variant="success" value={90} label="Success Progress" showValue />
          <LiquidProgress variant="warning" value={60} label="Warning Progress" showValue />
          <LiquidProgress variant="danger" value={30} label="Danger Progress" showValue />
          <LiquidProgress variant="ghost" value={45} label="Ghost Progress" showValue />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Progress Sizes</h2>
        <div className="space-y-6">
          <LiquidProgress size="xs" value={40} label="Extra Small" showValue />
          <LiquidProgress size="sm" value={50} label="Small" showValue />
          <LiquidProgress size="md" value={60} label="Medium" showValue />
          <LiquidProgress size="lg" value={70} label="Large" showValue />
          <LiquidProgress size="xl" value={80} label="Extra Large" showValue />
        </div>
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Progress Shapes</h2>
        <div className="space-y-6">
          <LiquidProgress shape="rounded" value={65} label="Rounded (Default)" showValue />
          <LiquidProgress shape="soft" value={65} label="Soft Rounded" showValue />
          <LiquidProgress shape="square" value={65} label="Square" showValue />
        </div>
      </div>
    </div>
  ),
};

export const LabelPositions: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Label Positions</h2>
        <div className="space-y-8">
          <LiquidProgress labelPosition="top" value={70} label="Top Label" showValue />
          <LiquidProgress
            labelPosition="bottom"
            value={70}
            label="Bottom Label"
            showValue
            variant="success"
          />
          <LiquidProgress
            labelPosition="inline"
            value={70}
            label="Inline Label"
            size="lg"
            variant="warning"
          />
          <div className="flex">
            <LiquidProgress
              labelPosition="side"
              value={70}
              label="Side Label"
              showValue
              variant="danger"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Animations: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Progress Animations</h2>
        <div className="space-y-6">
          <LiquidProgress value={75} label="Animated Gradient" showValue animated />
          <LiquidProgress value={60} label="Striped Pattern" showValue striped variant="success" />
          <LiquidProgress
            value={45}
            label="Striped + Animated"
            showValue
            striped
            animated
            variant="warning"
          />
          <LiquidProgress value={30} label="Pulsing Effect" showValue pulsing variant="danger" />
          <LiquidProgress indeterminate label="Indeterminate Loading" />
        </div>
      </div>
    </div>
  ),
};

export const SegmentedProgress: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Segmented Progress</h2>
        <div className="space-y-6">
          <LiquidProgress value={40} label="3 Segments" showValue segments={3} segmentGap={4} />
          <LiquidProgress
            value={70}
            label="5 Segments"
            showValue
            segments={5}
            segmentGap={2}
            variant="success"
          />
          <LiquidProgress
            value={25}
            label="8 Segments"
            showValue
            segments={8}
            segmentGap={3}
            variant="warning"
          />
          <LiquidProgress
            value={90}
            label="10 Segments with Animation"
            showValue
            segments={10}
            segmentGap={2}
            animated
            variant="danger"
          />
        </div>
      </div>
    </div>
  ),
};

export const CircularProgress: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Circular Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <LiquidCircularProgress value={75} showValue label="Upload" />
            <p className="text-white/70 text-sm">Default</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <LiquidCircularProgress value={90} variant="success" showValue label="Complete" />
            <p className="text-white/70 text-sm">Success</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <LiquidCircularProgress value={45} variant="warning" showValue label="Processing" />
            <p className="text-white/70 text-sm">Warning</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <LiquidCircularProgress value={25} variant="danger" showValue label="Error" />
            <p className="text-white/70 text-sm">Danger</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <LiquidCircularProgress indeterminate label="Loading" />
            <p className="text-white/70 text-sm">Indeterminate</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <LiquidCircularProgress
              value={60}
              variant="ghost"
              showValue
              size={140}
              strokeWidth={12}
              label="Large"
            />
            <p className="text-white/70 text-sm">Custom Size</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [downloadProgress, setDownloadProgress] = React.useState(0);
    const [installProgress, setInstallProgress] = React.useState(0);
    const [isUploading, setIsUploading] = React.useState(false);
    const [isDownloading, setIsDownloading] = React.useState(false);
    const [isInstalling, setIsInstalling] = React.useState(false);

    const simulateProgress = (
      currentProgress: number,
      setProgress: (value: number) => void,
      setLoading: (loading: boolean) => void
    ) => {
      if (currentProgress >= 100) {
        setProgress(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Progress</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-8">
            <h3 className="text-xl font-semibold text-white">File Operations</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <LiquidProgress
                    value={uploadProgress}
                    label="Upload Progress"
                    showValue
                    variant="default"
                    animated={isUploading}
                    formatValue={(val) => `${Math.round(val)}%`}
                  />
                </div>
                <button
                  onClick={() =>
                    simulateProgress(uploadProgress, setUploadProgress, setIsUploading)
                  }
                  disabled={isUploading}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Start Upload"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <LiquidProgress
                    value={downloadProgress}
                    label="Download Progress"
                    showValue
                    variant="success"
                    striped={isDownloading}
                    animated={isDownloading}
                    formatValue={(val) => `${Math.round(val)}%`}
                  />
                </div>
                <button
                  onClick={() =>
                    simulateProgress(downloadProgress, setDownloadProgress, setIsDownloading)
                  }
                  disabled={isDownloading}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors disabled:opacity-50"
                >
                  {isDownloading ? "Downloading..." : "Start Download"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <LiquidProgress
                    value={installProgress}
                    label="Installation Progress"
                    showValue
                    variant="warning"
                    segments={5}
                    formatValue={(val) => `${Math.round(val)}%`}
                  />
                </div>
                <button
                  onClick={() =>
                    simulateProgress(installProgress, setInstallProgress, setIsInstalling)
                  }
                  disabled={isInstalling}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors disabled:opacity-50"
                >
                  {isInstalling ? "Installing..." : "Start Install"}
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Circular Progress</h4>
              <div className="flex justify-center space-x-8">
                <LiquidCircularProgress
                  value={uploadProgress}
                  showValue
                  label="Upload"
                  variant="default"
                />
                <LiquidCircularProgress
                  value={downloadProgress}
                  showValue
                  label="Download"
                  variant="success"
                />
                <LiquidCircularProgress
                  value={installProgress}
                  showValue
                  label="Install"
                  variant="warning"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const CustomFormatting: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Custom Value Formatting</h2>
        <div className="space-y-6">
          <LiquidProgress
            value={750}
            max={1000}
            label="Storage Usage"
            showValue
            formatValue={(val, max) => `${Math.round(val)}MB / ${max}MB`}
          />
          <LiquidProgress
            value={45}
            max={60}
            label="Time Remaining"
            showValue
            variant="warning"
            formatValue={(val, max) => `${Math.round(max - val)} minutes left`}
          />
          <LiquidProgress
            value={8}
            max={10}
            label="Steps Completed"
            showValue
            variant="success"
            segments={10}
            formatValue={(val, max) => `Step ${Math.round(val)} of ${max}`}
          />
          <LiquidProgress
            value={3.7}
            max={5}
            label="Rating"
            showValue
            variant="ghost"
            formatValue={(val) => `${val.toFixed(1)} / 5.0 ⭐`}
          />
        </div>
      </div>
    </div>
  ),
};
