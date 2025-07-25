import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { GlassSlider } from "./glass-slider";
import { Volume2, Sun, Zap, Gauge, DollarSign, Clock } from "lucide-react";

const meta = {
  title: "Glass UI/GlassSlider",
  component: GlassSlider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## GlassSlider Component

An elegant slider component with glassmorphic design, smooth drag interactions, and precise value control. Features gradient fill, animated thumb, and support for custom ranges and steps.

### Key Features
- **Glassmorphic Design**: Beautiful translucent appearance with blur effects
- **Smooth Interactions**: Fluid drag-and-drop with visual feedback
- **Precise Control**: Support for custom min/max values and step intervals
- **Visual Feedback**: Gradient fill and hover/active states
- **Value Display**: Optional value indicator with customizable format
- **Accessibility**: Full keyboard support and ARIA attributes

### Usage

\`\`\`tsx
import { GlassSlider } from '@/components/glass-slider';

function MyComponent() {
  const [value, setValue] = useState(50);
  
  return (
    <GlassSlider
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      step={1}
      showValue={true}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
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
      description: "Step interval",
    },
    value: {
      control: "number",
      description: "Current value",
    },
    onChange: {
      action: "changed",
      description: "Callback when value changes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
    showValue: {
      control: "boolean",
      description: "Show value label",
    },
    variant: {
      control: "select",
      options: ["default", "minimal"],
      description: "Visual variant",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof GlassSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    showValue: true,
  },
};

// Controlled Example
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(30);
    
    return (
      <div className="w-80 space-y-4">
        <GlassSlider
          {...args}
          value={value}
          onChange={setValue}
        />
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Current Value: <span className="font-bold text-lg">{value}</span>
          </p>
        </div>
      </div>
    );
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
  },
};

// Custom Range
export const CustomRange: Story = {
  render: () => {
    const [temperature, setTemperature] = useState(20);
    
    return (
      <div className="w-80 space-y-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Temperature Control
        </h3>
        <GlassSlider
          min={-10}
          max={40}
          step={0.5}
          value={temperature}
          onChange={setTemperature}
          showValue={false}
        />
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {temperature}°C
          </span>
        </div>
      </div>
    );
  },
};

// Step Intervals
export const StepIntervals: Story = {
  render: () => {
    return (
      <div className="space-y-8 w-80">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Step: 1
          </h3>
          <GlassSlider min={0} max={10} step={1} />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Step: 0.1
          </h3>
          <GlassSlider min={0} max={1} step={0.1} />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Step: 5
          </h3>
          <GlassSlider min={0} max={100} step={5} />
        </div>
      </div>
    );
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 75,
    disabled: true,
    showValue: true,
  },
};

// Minimal Variant
export const MinimalVariant: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div className="space-y-8 w-80">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Variant
          </h3>
          <GlassSlider
            value={value}
            onChange={setValue}
            variant="default"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimal Variant
          </h3>
          <GlassSlider
            value={value}
            onChange={setValue}
            variant="minimal"
          />
        </div>
      </div>
    );
  },
};

// Volume Control Demo
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(30);
    
    const getVolumeIcon = () => {
      if (volume === 0) return "🔇";
      if (volume < 33) return "🔈";
      if (volume < 66) return "🔉";
      return "🔊";
    };
    
    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Volume Control
          </h3>
          <span className="text-2xl">{getVolumeIcon()}</span>
        </div>
        <GlassSlider
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={setVolume}
          showValue={false}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <button
            onClick={() => setVolume(0)}
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            Mute
          </button>
          <span className="font-medium">{volume}%</span>
          <button
            onClick={() => setVolume(100)}
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [brightness, setBrightness] = useState(70);
    const [speed, setSpeed] = useState(50);
    const [price, setPrice] = useState(250);
    
    return (
      <div className="w-96 space-y-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Interactive Slider Controls
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Brightness
              </label>
              <span className="text-sm font-bold">{brightness}%</span>
            </div>
            <GlassSlider
              min={0}
              max={100}
              value={brightness}
              onChange={setBrightness}
              showValue={false}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                Animation Speed
              </label>
              <span className="text-sm font-bold">{speed}ms</span>
            </div>
            <GlassSlider
              min={0}
              max={2000}
              step={50}
              value={speed}
              onChange={setSpeed}
              showValue={false}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Price Range
              </label>
              <span className="text-sm font-bold">${price}</span>
            </div>
            <GlassSlider
              min={0}
              max={1000}
              step={10}
              value={price}
              onChange={setPrice}
              showValue={false}
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Current Settings:
          </h4>
          <div
            className="h-20 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold transition-all"
            style={{
              opacity: brightness / 100,
              animationDuration: `${speed}ms`,
            }}
          >
            Preview Area
          </div>
        </div>
      </div>
    );
  },
};

// Form Integration
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      experience: 3,
      skills: 7,
      availability: 40,
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };
    
    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Candidate Assessment
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Years of Experience
            </label>
            <GlassSlider
              min={0}
              max={20}
              step={1}
              value={formData.experience}
              onChange={(value) => setFormData({ ...formData, experience: value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technical Skills (1-10)
            </label>
            <GlassSlider
              min={1}
              max={10}
              step={1}
              value={formData.skills}
              onChange={(value) => setFormData({ ...formData, skills: value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weekly Availability (hours)
            </label>
            <GlassSlider
              min={0}
              max={40}
              step={5}
              value={formData.availability}
              onChange={(value) => setFormData({ ...formData, availability: value })}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Assessment
        </button>
      </form>
    );
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    
    return (
      <div className="w-96 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Accessibility Features
          </h3>
          
          <div className="space-y-4">
            <GlassSlider
              value={value}
              onChange={setValue}
              aria-label="Demonstration slider"
            />
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Keyboard Navigation
              </h4>
              <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <li>• Use <kbd>←</kbd> <kbd>→</kbd> to adjust by step</li>
                <li>• Use <kbd>Home</kbd> to jump to minimum</li>
                <li>• Use <kbd>End</kbd> to jump to maximum</li>
                <li>• Use <kbd>Page Up</kbd> <kbd>Page Down</kbd> for larger steps</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Screen Reader Support:
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Announces current value</li>
              <li>• Provides min/max context</li>
              <li>• Updates on value change</li>
              <li>• Supports custom labels</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};

// Real-time Preview
export const RealTimePreview: Story = {
  render: () => {
    const [blur, setBlur] = useState(0);
    const [opacity, setOpacity] = useState(100);
    const [scale, setScale] = useState(100);
    
    return (
      <div className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Real-time CSS Effects
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blur Effect
            </label>
            <GlassSlider
              min={0}
              max={20}
              step={1}
              value={blur}
              onChange={setBlur}
              showValue={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Opacity
            </label>
            <GlassSlider
              min={0}
              max={100}
              step={5}
              value={opacity}
              onChange={setOpacity}
              showValue={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Scale
            </label>
            <GlassSlider
              min={50}
              max={150}
              step={5}
              value={scale}
              onChange={setScale}
              showValue={false}
            />
          </div>
        </div>
        
        <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div
            className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-bold transition-all duration-300"
            style={{
              filter: `blur(${blur}px)`,
              opacity: opacity / 100,
              transform: `scale(${scale / 100})`,
            }}
          >
            Preview Element
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          filter: blur({blur}px);<br />
          opacity: {opacity / 100};<br />
          transform: scale({scale / 100});
        </div>
      </div>
    );
  },
};