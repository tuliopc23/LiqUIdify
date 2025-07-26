import type { Meta, StoryObj } from '@storybook/react';
import {
  Calculator,
  DollarSign,
  Hash,
  Percent,
  Target,
  Timer,
} from 'lucide-react';
import { useState } from 'react';
import { GlassNumberInput } from './glass-number-input';

const meta = {
  title: 'Components/Forms/GlassNumberInput',
  component: GlassNumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A premium number input component with advanced glassmorphism effects, intelligent formatting, and comprehensive validation.

## Features

- **Smart Formatting**: Automatic number formatting with locale support
- **Precision Control**: Configurable decimal places and step values
- **Validation**: Built-in min/max validation with visual feedback
- **Increment/Decrement**: Convenient +/- buttons with keyboard shortcuts
- **Glass Effects**: Beautiful backdrop blur and glassmorphism design
- **Accessibility**: Full keyboard navigation and screen reader support
- **Flexible Configuration**: Currency, percentage, and custom formatting

## Usage

\`\`\`tsx
import { GlassNumberInput } from '@/components/glass-number-input';

// Basic usage
<GlassNumberInput
  value={42}
  onChange={(value) => setValue(value)}
  placeholder="Enter a number"
/>

// With validation and formatting
<GlassNumberInput
  value={price}
  onChange={setPrice}
  min={0}
  max={1000}
  step={0.01}
  precision={2}
  formatOptions={{
    style: 'currency',
    currency: 'USD'
  }}
  showButtons
/>

// Percentage input
<GlassNumberInput
  value={percentage}
  onChange={setPercentage}
  min={0}
  max={100}
  step={1}
  formatOptions={{
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }}
/>
\`\`\`

## Keyboard Shortcuts

- **Arrow Up/Down**: Increment/decrement by step value
- **Page Up/Down**: Increment/decrement by larger amounts
- **Enter**: Apply current value and blur
- **Escape**: Cancel changes and blur

## Accessibility

The number input component follows WAI-ARIA guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader value announcements
- Focus management and visual indicators
- Error state descriptions
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Core Props
    value: {
      control: { type: 'number' },
      description: 'Current value of the input',
      table: {
        type: { summary: 'number' },
        category: 'Core',
      },
    },
    defaultValue: {
      control: { type: 'number' },
      description: 'Default value when uncontrolled',
      table: {
        type: { summary: 'number' },
        category: 'Core',
      },
    },
    onChange: {
      action: 'value changed',
      description: 'Callback fired when value changes',
      table: {
        type: { summary: '(value: number | null) => void' },
        category: 'Core',
      },
    },

    // Validation
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value',
      table: {
        type: { summary: 'number' },
        category: 'Validation',
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value',
      table: {
        type: { summary: 'number' },
        category: 'Validation',
      },
    },
    step: {
      control: { type: 'number', min: 0.01, max: 100, step: 0.01 },
      description: 'Step value for increment/decrement',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Validation',
      },
    },

    // Formatting
    precision: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Number of decimal places',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Formatting',
      },
    },
    formatOptions: {
      control: 'object',
      description: 'Intl.NumberFormat options for display formatting',
      table: {
        type: { summary: 'Intl.NumberFormatOptions' },
        category: 'Formatting',
      },
    },
    locale: {
      control: 'text',
      description: 'Locale for number formatting',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'en-US' },
        category: 'Formatting',
      },
    },

    // Behavior
    allowDecimals: {
      control: 'boolean',
      description: 'Allow decimal input',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow negative values',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Behavior',
      },
    },
    showButtons: {
      control: 'boolean',
      description: 'Show increment/decrement buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Behavior',
      },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0' },
        category: 'Appearance',
      },
    },

    // State
    error: {
      control: 'boolean',
      description: 'Whether the input has an error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },

    // HTML Props
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
        category: 'HTML Props',
      },
    },
  },
  args: {
    step: 1,
    precision: 0,
    locale: 'en-US',
    allowDecimals: false,
    allowNegative: true,
    showButtons: true,
    size: 'md',
    placeholder: '0',
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof GlassNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(args.value || null);

    return (
      <div className="flex min-h-[200px] w-full max-w-md items-center justify-center">
        <GlassNumberInput
          {...args}
          value={value || undefined}
          onChange={setValue}
        />
      </div>
    );
  },
};

// Basic usage examples
export const BasicUsage: Story = {
  render: () => {
    const [integerValue, setIntegerValue] = useState<number | null>(42);
    const [decimalValue, setDecimalValue] = useState<number | null>(3.14);
    const [rangeValue, setRangeValue] = useState<number | null>(50);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Integer Input</h3>
          <GlassNumberInput
            value={integerValue || undefined}
            onChange={setIntegerValue}
            placeholder="Enter whole number"
            step={1}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Decimal Input</h3>
          <GlassNumberInput
            value={decimalValue || undefined}
            onChange={setDecimalValue}
            placeholder="Enter decimal"
            step={0.01}
            precision={2}
            allowDecimals
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">
            Range Input (0-100)
          </h3>
          <GlassNumberInput
            value={rangeValue || undefined}
            onChange={setRangeValue}
            min={0}
            max={100}
            step={5}
            placeholder="0-100"
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState<number | null>(123);
    const [value2, setValue2] = useState<number | null>(456);
    const [value3, setValue3] = useState<number | null>(789);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Small Size</h3>
          <GlassNumberInput
            value={value1 || undefined}
            onChange={setValue1}
            size="sm"
            placeholder="Small input"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Medium Size</h3>
          <GlassNumberInput
            value={value2 || undefined}
            onChange={setValue2}
            size="md"
            placeholder="Medium input"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Large Size</h3>
          <GlassNumberInput
            value={value3 || undefined}
            onChange={setValue3}
            size="lg"
            placeholder="Large input"
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// States showcase
export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState<number | null>(100);
    const [errorValue, setErrorValue] = useState<number | null>(150);
    const [disabledValue] = useState<number | null>(75);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Normal State</h3>
          <GlassNumberInput
            value={normalValue || undefined}
            onChange={setNormalValue}
            placeholder="Normal input"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Error State</h3>
          <GlassNumberInput
            value={errorValue || undefined}
            onChange={setErrorValue}
            error
            min={0}
            max={100}
            placeholder="Value exceeds max"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Disabled State</h3>
          <GlassNumberInput
            value={disabledValue || undefined}
            disabled
            placeholder="Disabled input"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Without Buttons</h3>
          <GlassNumberInput
            value={normalValue || undefined}
            onChange={setNormalValue}
            showButtons={false}
            placeholder="No buttons"
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Formatting examples
export const FormattingExamples: Story = {
  render: () => {
    const [currency, setCurrency] = useState<number | null>(1299.99);
    const [percentage, setPercentage] = useState<number | null>(0.15);
    const [decimal, setDecimal] = useState<number | null>(3.14159);
    const [scientific, setScientific] = useState<number | null>(1000000);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Currency Format</h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-green-400" />
              <div>
                <div className="font-medium text-white/90">Price Input</div>
                <div className="text-white/60 text-sm">
                  USD currency formatting
                </div>
              </div>
            </div>
            <GlassNumberInput
              value={currency || undefined}
              onChange={setCurrency}
              min={0}
              step={0.01}
              precision={2}
              allowDecimals
              formatOptions={{
                style: 'currency',
                currency: 'USD',
              }}
              placeholder="$0.00"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">
            Percentage Format
          </h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <Percent className="h-5 w-5 text-blue-400" />
              <div>
                <div className="font-medium text-white/90">Rate Input</div>
                <div className="text-white/60 text-sm">
                  Percentage formatting (0-1 range)
                </div>
              </div>
            </div>
            <GlassNumberInput
              value={percentage || undefined}
              onChange={setPercentage}
              min={0}
              max={1}
              step={0.01}
              precision={2}
              allowDecimals
              formatOptions={{
                style: 'percent',
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }}
              placeholder="0%"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">
            Decimal Precision
          </h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <Calculator className="h-5 w-5 text-purple-400" />
              <div>
                <div className="font-medium text-white/90">Pi Value</div>
                <div className="text-white/60 text-sm">5 decimal places</div>
              </div>
            </div>
            <GlassNumberInput
              value={decimal || undefined}
              onChange={setDecimal}
              step={0.00001}
              precision={5}
              allowDecimals
              formatOptions={{
                minimumFractionDigits: 5,
                maximumFractionDigits: 5,
              }}
              placeholder="3.14159"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Large Numbers</h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <Hash className="h-5 w-5 text-orange-400" />
              <div>
                <div className="font-medium text-white/90">Population</div>
                <div className="text-white/60 text-sm">
                  Number with thousand separators
                </div>
              </div>
            </div>
            <GlassNumberInput
              value={scientific || undefined}
              onChange={setScientific}
              step={1000}
              formatOptions={{
                useGrouping: true,
              }}
              placeholder="1,000,000"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const [quantity, setQuantity] = useState<number | null>(1);
    const [price, setPrice] = useState<number | null>(49.99);
    const [discount, setDiscount] = useState<number | null>(0.1);
    const [score, setScore] = useState<number | null>(85);
    const [timer, setTimer] = useState<number | null>(30);

    const total = (quantity || 0) * (price || 0) * (1 - (discount || 0));

    return (
      <div className="space-y-12">
        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Shopping Cart</h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm max-w-md">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-white/80 text-sm">
                  Quantity
                </label>
                <GlassNumberInput
                  value={quantity || undefined}
                  onChange={setQuantity}
                  min={1}
                  max={99}
                  step={1}
                  size="sm"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white/80 text-sm">
                  Unit Price
                </label>
                <GlassNumberInput
                  value={price || undefined}
                  onChange={setPrice}
                  min={0}
                  step={0.01}
                  precision={2}
                  allowDecimals
                  formatOptions={{
                    style: 'currency',
                    currency: 'USD',
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white/80 text-sm">
                  Discount Rate
                </label>
                <GlassNumberInput
                  value={discount || undefined}
                  onChange={setDiscount}
                  min={0}
                  max={1}
                  step={0.01}
                  precision={2}
                  allowDecimals
                  formatOptions={{
                    style: 'percent',
                  }}
                />
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white/80">Total:</span>
                  <span className="font-bold text-white/90 text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Game Settings</h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm max-w-md">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Target className="h-5 w-5 text-green-400" />
                <div className="flex-1">
                  <label className="block mb-2 font-medium text-white/80 text-sm">
                    Target Score (0-100)
                  </label>
                  <GlassNumberInput
                    value={score || undefined}
                    onChange={setScore}
                    min={0}
                    max={100}
                    step={5}
                    size="sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Timer className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <label className="block mb-2 font-medium text-white/80 text-sm">
                    Timer (seconds)
                  </label>
                  <GlassNumberInput
                    value={timer || undefined}
                    onChange={setTimer}
                    min={10}
                    max={300}
                    step={5}
                    size="sm"
                    formatOptions={{
                      style: 'unit',
                      unit: 'second',
                    }}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-3">
                <div className="text-blue-200 text-sm">
                  <div className="font-medium">Game Configuration:</div>
                  <div>Target: {score} points</div>
                  <div>Time Limit: {timer} seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">
            Financial Calculator
          </h3>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm max-w-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-white/80 text-sm">
                  Principal Amount
                </label>
                <GlassNumberInput
                  defaultValue={10000}
                  min={0}
                  step={100}
                  formatOptions={{
                    style: 'currency',
                    currency: 'USD',
                  }}
                  allowDecimals
                  precision={2}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white/80 text-sm">
                  Interest Rate (Annual %)
                </label>
                <GlassNumberInput
                  defaultValue={0.05}
                  min={0}
                  max={1}
                  step={0.0001}
                  precision={4}
                  allowDecimals
                  formatOptions={{
                    style: 'percent',
                    minimumFractionDigits: 2,
                  }}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white/80 text-sm">
                  Term (Years)
                </label>
                <GlassNumberInput defaultValue={5} min={1} max={30} step={1} />
              </div>

              <div>
                <label className="block mb-2 font-medium text-white/80 text-sm">
                  Payments per Year
                </label>
                <GlassNumberInput defaultValue={12} min={1} max={52} step={1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(50);

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
            Accessibility Features
          </h4>
          <ul className="space-y-1 text-blue-800 text-sm dark:text-blue-200">
            <li>• Full keyboard navigation (Arrow keys, Page Up/Down)</li>
            <li>• ARIA labels and value announcements</li>
            <li>• Screen reader support for min/max values</li>
            <li>• Focus management and visual indicators</li>
            <li>• Error state descriptions</li>
            <li>• Button labels for increment/decrement</li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-white/60 text-sm">
            Try keyboard navigation: Tab to focus, Arrow keys to adjust, Enter
            to confirm
          </p>
          <GlassNumberInput
            value={value || undefined}
            onChange={setValue}
            min={0}
            max={100}
            step={5}
            placeholder="Use keyboard to adjust"
          />
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <h4 className="mb-2 font-medium text-green-900 dark:text-green-100">
            Current Value
          </h4>
          <p className="text-green-800 text-sm dark:text-green-200">
            Value: {value !== null ? value : 'None'} (Range: 0-100)
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <h4 className="mb-2 font-medium text-gray-900 dark:text-gray-100">
            Screen Reader Announcements
          </h4>
          <div className="space-y-2 text-gray-700 text-sm dark:text-gray-300">
            <p>
              Focus: "Number input, value [current value], minimum 0, maximum
              100"
            </p>
            <p>Increment: "Value increased to [new value]"</p>
            <p>Decrement: "Value decreased to [new value]"</p>
            <p>Error: "Value exceeds maximum allowed"</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => {
    const [value1, setValue1] = useState<number | null>(42);
    const [value2, setValue2] = useState<number | null>(99.99);
    const [value3, setValue3] = useState<number | null>(75);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Ocean Theme</h3>
          <div className="rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 p-8">
            <GlassNumberInput
              value={value1 || undefined}
              onChange={setValue1}
              placeholder="Ocean depths..."
              min={0}
              max={100}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Sunset Theme</h3>
          <div className="rounded-xl bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 p-8">
            <GlassNumberInput
              value={value2 || undefined}
              onChange={setValue2}
              step={0.01}
              precision={2}
              allowDecimals
              formatOptions={{
                style: 'currency',
                currency: 'USD',
              }}
              placeholder="$0.00"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-white/80 text-sm">Forest Theme</h3>
          <div className="rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 p-8">
            <GlassNumberInput
              value={value3 || undefined}
              onChange={setValue3}
              min={0}
              max={100}
              step={5}
              formatOptions={{
                style: 'percent',
                minimumFractionDigits: 0,
              }}
              placeholder="0%"
            />
          </div>
        </div>
      </div>
    );
  },
};
