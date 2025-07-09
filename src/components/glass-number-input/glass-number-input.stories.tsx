import type { Meta, StoryObj } from '@storybook/react';
import { GlassNumberInput } from './glass-number-input';

const meta: Meta<typeof GlassNumberInput> = {
  title: 'Components/Form/GlassNumberInput',
  component: GlassNumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated number input component with increment/decrement buttons, formatting, and liquid glass styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Current numeric value',
      control: 'number',
    },
    placeholder: {
      description: 'Placeholder text when no value is entered',
      control: 'text',
    },
    min: {
      description: 'Minimum allowed value',
      control: 'number',
    },
    max: {
      description: 'Maximum allowed value',
      control: 'number',
    },
    step: {
      description: 'Step size for increment/decrement',
      control: 'number',
    },
    precision: {
      description: 'Number of decimal places',
      control: 'number',
    },
    disabled: {
      description: 'Whether the input is disabled',
      control: 'boolean',
    },
    error: {
      description: 'Whether the input has an error state',
      control: 'boolean',
    },
    success: {
      description: 'Whether the input has a success state',
      control: 'boolean',
    },
    size: {
      description: 'Size variant of the input',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'Visual variant of the input',
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
    allowNegative: {
      description: 'Whether negative values are allowed',
      control: 'boolean',
    },
    allowDecimal: {
      description: 'Whether decimal values are allowed',
      control: 'boolean',
    },
    showButtons: {
      description: 'Whether to show increment/decrement buttons',
      control: 'boolean',
    },
    formatValue: {
      description: 'Custom value formatting function',
      control: false,
    },
    parseValue: {
      description: 'Custom value parsing function',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter a number...',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 42,
  },
};

export const WithMinMax: Story = {
  args: {
    ...Default.args,
    min: 0,
    max: 100,
    value: 50,
  },
};

export const WithStep: Story = {
  args: {
    ...Default.args,
    step: 5,
    value: 25,
  },
};

export const WithPrecision: Story = {
  args: {
    ...Default.args,
    precision: 2,
    value: 3.14,
    allowDecimal: true,
  },
};

export const NoNegative: Story = {
  args: {
    ...Default.args,
    allowNegative: false,
    value: 10,
  },
};

export const NoDecimal: Story = {
  args: {
    ...Default.args,
    allowDecimal: false,
    value: 42,
  },
};

export const NoButtons: Story = {
  args: {
    ...Default.args,
    showButtons: false,
    value: 123,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 100,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    value: 999,
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    success: true,
    value: 42,
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    value: 10,
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    value: 100,
  },
};

export const SecondaryVariant: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
    value: 50,
  },
};

export const OutlineVariant: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
    value: 75,
  },
};

export const CurrencyFormat: Story = {
  args: {
    ...Default.args,
    value: 1234.56,
    precision: 2,
    allowDecimal: true,
    formatValue: value => `$${value.toFixed(2)}`,
    parseValue: value => parseFloat(value.replace('$', '')) || 0,
  },
};

export const PercentageFormat: Story = {
  args: {
    ...Default.args,
    value: 75,
    min: 0,
    max: 100,
    formatValue: value => `${value}%`,
    parseValue: value => parseFloat(value.replace('%', '')) || 0,
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    onValueChange: value => {
      console.log('Value changed:', value);
    },
    onBlur: () => {
      console.log('Input blurred');
    },
    onFocus: () => {
      console.log('Input focused');
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Small</div>
      <GlassNumberInput placeholder="Small number input" size="sm" value={10} />
      <div className="text-sm text-gray-600">Medium (default)</div>
      <GlassNumberInput
        placeholder="Medium number input"
        size="md"
        value={50}
      />
      <div className="text-sm text-gray-600">Large</div>
      <GlassNumberInput
        placeholder="Large number input"
        size="lg"
        value={100}
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Default</div>
      <GlassNumberInput
        placeholder="Default variant"
        variant="default"
        value={42}
      />
      <div className="text-sm text-gray-600">Secondary</div>
      <GlassNumberInput
        placeholder="Secondary variant"
        variant="secondary"
        value={42}
      />
      <div className="text-sm text-gray-600">Outline</div>
      <GlassNumberInput
        placeholder="Outline variant"
        variant="outline"
        value={42}
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Normal</div>
      <GlassNumberInput placeholder="Normal state" value={42} />
      <div className="text-sm text-gray-600">Error</div>
      <GlassNumberInput placeholder="Error state" value={999} error />
      <div className="text-sm text-gray-600">Success</div>
      <GlassNumberInput placeholder="Success state" value={42} success />
      <div className="text-sm text-gray-600">Disabled</div>
      <GlassNumberInput placeholder="Disabled state" value={42} disabled />
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-600 mb-2">Price Input</div>
        <GlassNumberInput
          placeholder="0.00"
          value={29.99}
          precision={2}
          allowDecimal={true}
          allowNegative={false}
          formatValue={value => `$${value.toFixed(2)}`}
          parseValue={value => parseFloat(value.replace('$', '')) || 0}
        />
      </div>

      <div>
        <div className="text-sm text-gray-600 mb-2">Quantity Input</div>
        <GlassNumberInput
          placeholder="0"
          value={5}
          min={1}
          max={99}
          step={1}
          allowDecimal={false}
          allowNegative={false}
        />
      </div>

      <div>
        <div className="text-sm text-gray-600 mb-2">Percentage Input</div>
        <GlassNumberInput
          placeholder="0%"
          value={75}
          min={0}
          max={100}
          step={5}
          allowDecimal={false}
          allowNegative={false}
          formatValue={value => `${value}%`}
          parseValue={value => parseFloat(value.replace('%', '')) || 0}
        />
      </div>

      <div>
        <div className="text-sm text-gray-600 mb-2">Temperature Input</div>
        <GlassNumberInput
          placeholder="0°C"
          value={22.5}
          precision={1}
          allowDecimal={true}
          allowNegative={true}
          formatValue={value => `${value}°C`}
          parseValue={value => parseFloat(value.replace('°C', '')) || 0}
        />
      </div>
    </div>
  ),
};
