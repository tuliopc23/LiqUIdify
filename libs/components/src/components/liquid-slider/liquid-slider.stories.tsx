import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LiquidSlider } from "./liquid-slider";

const meta = {
  title: "Components/LiquidSlider",
  component: LiquidSlider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass slider component with smooth animations, range support, and accessibility features. Supports single and dual thumb modes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
      description: "The visual style variant of the slider",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the slider",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the slider",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Step increment",
    },
    disabled: {
      control: "boolean",
      description: "Disable the slider",
    },
    range: {
      control: "boolean",
      description: "Enable range mode (dual thumb)",
    },
    showValue: {
      control: "boolean",
      description: "Show current value",
    },
    showTicks: {
      control: "boolean",
      description: "Show tick marks",
    },
    inverted: {
      control: "boolean",
      description: "Invert the slider direction",
    },
  },
  args: {
    variant: "default",
    size: "md",
    orientation: "horizontal",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [25],
    disabled: false,
    range: false,
    showValue: false,
    showTicks: false,
    inverted: false,
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
} satisfies Meta<typeof LiquidSlider>;

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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Slider Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <LiquidSlider variant="default" label="Default" defaultValue={[30]} showValue />
            <LiquidSlider variant="success" label="Success" defaultValue={[60]} showValue />
          </div>
          <div className="space-y-6">
            <LiquidSlider variant="warning" label="Warning" defaultValue={[45]} showValue />
            <LiquidSlider variant="danger" label="Danger" defaultValue={[80]} showValue />
          </div>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Slider Sizes</h2>
        <div className="space-y-8">
          <LiquidSlider size="sm" label="Small" defaultValue={[25]} showValue />
          <LiquidSlider size="md" label="Medium" defaultValue={[50]} showValue />
          <LiquidSlider size="lg" label="Large" defaultValue={[75]} showValue />
        </div>
      </div>
    </div>
  ),
};

export const RangeSliders: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Range Sliders</h2>
        <div className="space-y-8">
          <LiquidSlider
            range
            label="Price Range"
            defaultValue={[20, 80]}
            min={0}
            max={100}
            showValue
            formatValue={(value) => `$${value}`}
          />
          <LiquidSlider
            range
            variant="success"
            label="Temperature Range"
            defaultValue={[18, 26]}
            min={0}
            max={40}
            showValue
            formatValue={(value) => `${value}°C`}
          />
          <LiquidSlider
            range
            variant="warning"
            label="Time Range"
            defaultValue={[9, 17]}
            min={0}
            max={24}
            showValue
            formatValue={(value) => `${value}:00`}
          />
        </div>
      </div>
    </div>
  ),
};

export const WithTicks: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Sliders with Ticks</h2>
        <div className="space-y-8">
          <LiquidSlider
            label="Volume"
            defaultValue={[70]}
            showValue
            showTicks
            formatValue={(value) => `${value}%`}
          />
          <LiquidSlider
            label="Custom Tick Marks"
            defaultValue={[50]}
            showValue
            tickMarks={[0, 25, 50, 75, 100]}
          />
          <LiquidSlider
            label="With Marks"
            defaultValue={[2]}
            min={0}
            max={4}
            step={1}
            showValue
            marks={[
              { value: 0, label: "Off" },
              { value: 1, label: "Low" },
              { value: 2, label: "Medium" },
              { value: 3, label: "High" },
              { value: 4, label: "Max" },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

export const VerticalSliders: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Vertical Sliders</h2>
        <div className="flex justify-center items-center space-x-12" style={{ height: "400px" }}>
          <LiquidSlider
            orientation="vertical"
            label="Bass"
            defaultValue={[60]}
            showValue
            variant="default"
          />
          <LiquidSlider
            orientation="vertical"
            label="Mid"
            defaultValue={[40]}
            showValue
            variant="success"
          />
          <LiquidSlider
            orientation="vertical"
            label="Treble"
            defaultValue={[70]}
            showValue
            variant="warning"
          />
          <LiquidSlider
            orientation="vertical"
            range
            label="EQ Range"
            defaultValue={[30, 80]}
            showValue
            variant="danger"
          />
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Slider States</h2>
        <div className="space-y-8">
          <LiquidSlider label="Normal Slider" defaultValue={[50]} showValue />
          <LiquidSlider label="Disabled Slider" defaultValue={[30]} showValue disabled />
          <LiquidSlider label="Inverted Slider" defaultValue={[70]} showValue inverted />
          <LiquidSlider range label="Disabled Range" defaultValue={[20, 80]} showValue disabled />
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
    const [volume, setVolume] = React.useState([75]);
    const [brightness, setBrightness] = React.useState([60]);
    const [priceRange, setPriceRange] = React.useState([25, 75]);
    const [quality, setQuality] = React.useState([2]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Sliders</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-8">
            <h3 className="text-xl font-semibold text-white mb-6">Audio & Display Settings</h3>

            <LiquidSlider
              value={volume}
              onValueChange={setVolume}
              label="Volume"
              showValue
              formatValue={(value) => `${value}%`}
            />

            <LiquidSlider
              value={brightness}
              onValueChange={setBrightness}
              variant="warning"
              label="Brightness"
              showValue
              formatValue={(value) => `${value}%`}
            />

            <LiquidSlider
              value={priceRange}
              onValueChange={setPriceRange}
              range
              variant="success"
              label="Price Filter"
              min={0}
              max={100}
              showValue
              formatValue={(value) => `$${value}`}
            />

            <LiquidSlider
              value={quality}
              onValueChange={setQuality}
              variant="danger"
              label="Quality"
              min={0}
              max={4}
              step={1}
              showValue
              marks={[
                { value: 0, label: "Low" },
                { value: 1, label: "Medium" },
                { value: 2, label: "High" },
                { value: 3, label: "Ultra" },
                { value: 4, label: "Max" },
              ]}
            />

            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-2">Current Values:</h4>
              <div className="text-white/70 space-y-1">
                <p>Volume: {volume[0]}%</p>
                <p>Brightness: {brightness[0]}%</p>
                <p>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </p>
                <p>Quality: {["Low", "Medium", "High", "Ultra", "Max"][quality[0]]}</p>
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
        <div className="space-y-8">
          <LiquidSlider
            label="File Size"
            defaultValue={[512]}
            min={0}
            max={1024}
            step={64}
            showValue
            showTicks
            formatValue={(value) => `${value}MB`}
          />
          <LiquidSlider
            label="Playback Speed"
            defaultValue={[100]}
            min={25}
            max={200}
            step={25}
            showValue
            formatValue={(value) => `${value / 100}x`}
            marks={[
              { value: 25, label: "0.25x" },
              { value: 50, label: "0.5x" },
              { value: 75, label: "0.75x" },
              { value: 100, label: "1x" },
              { value: 125, label: "1.25x" },
              { value: 150, label: "1.5x" },
              { value: 175, label: "1.75x" },
              { value: 200, label: "2x" },
            ]}
          />
          <LiquidSlider
            range
            label="Work Hours"
            defaultValue={[9, 17]}
            min={0}
            max={24}
            showValue
            formatValue={(value) => {
              const hours = Math.floor(value);
              const ampm = hours >= 12 ? "PM" : "AM";
              const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
              return `${displayHours}:00 ${ampm}`;
            }}
          />
        </div>
      </div>
    </div>
  ),
};
