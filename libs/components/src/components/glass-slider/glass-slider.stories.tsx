import type { Meta, StoryObj } from '@storybook/react';
import { DollarSign, Gauge, Sun, Volume2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { GlassSlider } from './glass-slider';

const meta = {
  title: 'Glass UI/GlassSlider',
  component: GlassSlider,
  parameters: {
    layout: 'centered',
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
      showValue={true} />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step interval',
    },
    value: {
      control: 'number',
      description: 'Current value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    showValue: {
      control: 'boolean',
      description: 'Show value label',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal'],
      description: 'Visual variant',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
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
        <GlassSlider {...args} value={value} onChange={setValue} />
        <div className="text-center">
          <p className="text-gray-600 text-sm dark:text-gray-400">
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
        <h3 className="font-medium text-gray-700 text-sm dark:text-gray-300">
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
          <span className="font-bold text-2xl text-gray-900 dark:text-white">
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
      <div className="w-80 space-y-8">
        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
            Step: 1
          </h3>
          <GlassSlider min={0} max={10} step={1} />
        </div>

        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
            Step: 0.1
          </h3>
          <GlassSlider min={0} max={1} step={0.1} />
        </div>

        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
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
      <div className="w-80 space-y-8">
        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
            Default Variant
          </h3>
          <GlassSlider value={value} onChange={setValue} variant="default" />
        </div>

        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm dark:text-gray-300">
            Minimal Variant
          </h3>
          <GlassSlider value={value} onChange={setValue} variant="minimal" />
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
      if (volume === 0) return '🔇';
      if (volume < 33) return '🔈';
      if (volume < 66) return '🔉';
      return '🔊';
    };

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-medium text-gray-700 text-sm dark:text-gray-300">
            <Volume2 className="h-4 w-4" />
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
        <div className="flex justify-between text-gray-500 text-xs">
          <button
            type="button"
            onClick={() => setVolume(0)}
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            Mute
          </button>
          <span className="font-medium">{volume}%</span>
          <button
            type="button"
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
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
          Interactive Slider Controls
        </h3>

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="brightness-jru606"
                className="flex items-center gap-2 font-medium text-gray-700 text-sm dark:text-gray-300"
              >
                <Sun className="h-4 w-4" />
                Brightness
              </label>
              <span className="font-bold text-sm">{brightness}%</span>
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
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="animation-speed-i9kuig"
                className="flex items-center gap-2 font-medium text-gray-700 text-sm dark:text-gray-300"
              >
                <Gauge className="h-4 w-4" />
                Animation Speed
              </label>
              <span className="font-bold text-sm">{speed}ms</span>
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
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="price-range-h0kix5"
                className="flex items-center gap-2 font-medium text-gray-700 text-sm dark:text-gray-300"
              >
                <DollarSign className="h-4 w-4" />
                Price Range
              </label>
              <span className="font-bold text-sm">${price}</span>
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

        <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 font-semibold text-gray-900 text-sm dark:text-white">
            Current Settings:
          </h4>
          <div
            className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white transition-all"
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
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
          Candidate Assessment
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="years-of-experience-eaichh"
              className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
            >
              Years of Experience
            </label>
            <GlassSlider
              min={0}
              max={20}
              step={1}
              value={formData.experience}
              onChange={(value) =>
                setFormData({ ...formData, experience: value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="technical-skills-1-10-9e6sk2"
              className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
            >
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
            <label
              htmlFor="weekly-availability-hours-ymuots"
              className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
            >
              Weekly Availability (hours)
            </label>
            <GlassSlider
              min={0}
              max={40}
              step={5}
              value={formData.availability}
              onChange={(value) =>
                setFormData({ ...formData, availability: value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
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
          <h3 className="mb-4 font-semibold text-gray-900 text-lg dark:text-white">
            Accessibility Features
          </h3>

          <div className="space-y-4">
            <GlassSlider
              value={value}
              onChange={setValue}
              aria-label="Demonstration slider"
            />

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                Keyboard Navigation
              </h4>
              <ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
                <li>
                  • Use <kbd>←</kbd> <kbd>→</kbd> to adjust by step
                </li>
                <li>
                  • Use <kbd>Home</kbd> to jump to minimum
                </li>
                <li>
                  • Use <kbd>End</kbd> to jump to maximum
                </li>
                <li>
                  • Use <kbd>Page Up</kbd> <kbd>Page Down</kbd> for larger steps
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="mb-2 font-semibold text-gray-900 text-sm dark:text-white">
              Screen Reader Support:
            </h4>
            <ul className="space-y-1 text-gray-600 text-sm dark:text-gray-400">
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
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
          Real-time CSS Effects
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="blur-effect-mfkx4e"
              className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
            >
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
            <label
              htmlFor="opacity-94kdsl"
              className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
            >
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
            <label
              htmlFor="scale-016424"
              className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
            >
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

        <div className="flex items-center justify-center rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
          <div
            className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-6 font-bold text-white transition-all duration-300"
            style={{
              filter: `blur(${blur}px)`,
              opacity: opacity / 100,
              transform: `scale(${scale / 100})`,
            }}
          >
            Preview Element
          </div>
        </div>

        <div className="font-mono text-gray-500 text-xs dark:text-gray-400">
          filter: blur({blur}px);
          <br />
          opacity: {opacity / 100};<br />
          transform: scale({scale / 100});
        </div>
      </div>
    );
  },
};
