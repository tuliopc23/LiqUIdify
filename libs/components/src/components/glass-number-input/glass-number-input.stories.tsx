import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calculator, DollarSign, Percent } from "lucide-react";
import { GlassNumberInput } from "./glass-number-input";

const meta: Meta<typeof GlassNumberInput> = {
  title: "Components/Forms/GlassNumberInput",
  component: GlassNumberInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A number input component with increment/decrement controls, validation, and glassmorphism styling.

## Features
- Increment/decrement buttons
- Min/max value validation
- Step controls and precision
- Custom formatting
- Keyboard navigation (Arrow up/down)
- Accessibility compliant

## Usage

\`\`\`tsx
import { GlassNumberInput } from '@/components/glass-number-input';

// Basic usage
<GlassNumberInput
  label="Quantity"
  value={quantity}
  onChange={setQuantity}
  min={0}
  max={100}
/>

// With custom formatting
<GlassNumberInput
  label="Price"
  value={price}
  onChange={setPrice}
  formatValue={(value) => \`$\${value.toFixed(2)}\`}
  step={0.01}
  precision={2}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    value: {
      control: { type: "number" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
    precision: {
      control: { type: "number" },
    },
    showControls: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    label: "Quantity",
    placeholder: "Enter quantity",
    defaultValue: 5,
    min: 0,
    max: 100,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Items",
    description: "Number of items to purchase",
    defaultValue: 1,
    min: 1,
    max: 10,
  },
};

export const WithError: Story = {
  args: {
    label: "Age",
    defaultValue: 150,
    min: 0,
    max: 120,
    error: true,
    helperText: "Age must be between 0 and 120",
  },
};

// Size Variants
export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Input",
    defaultValue: 42,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Input",
    defaultValue: 42,
  },
};

// Functional Examples
export const PriceInput: Story = {
  render: () => {
    const [price, setPrice] = useState(29.99);

    return (
      <GlassNumberInput
        label="Price"
        value={price}
        onChange={(value) => setPrice(value || 0)}
        formatValue={(value) => `$${value.toFixed(2)}`}
        step={0.01}
        precision={2}
        min={0}
        max={9999.99}
        helperText="Enter price in USD"
      />
    );
  },
};

export const PercentageInput: Story = {
  render: () => {
    const [percentage, setPercentage] = useState(75);

    return (
      <GlassNumberInput
        label="Completion"
        value={percentage}
        onChange={(value) => setPercentage(value || 0)}
        formatValue={(value) => `${value}%`}
        min={0}
        max={100}
        step={5}
        helperText="Percentage complete"
      />
    );
  },
};

export const WithoutControls: Story = {
  args: {
    label: "Manual Entry",
    showControls: false,
    defaultValue: 100,
    helperText: "Type numbers directly",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    defaultValue: 42,
    disabled: true,
    helperText: "This input is disabled",
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    required: true,
    min: 1,
    helperText: "This field is required",
  },
};

// Interactive Examples
export const ControlledExample: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>(10);

    return (
      <div className="space-y-4">
        <GlassNumberInput
          label="Controlled Input"
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={5}
          helperText={`Current value: ${value || "empty"}`}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1 bg-liquid-accent text-liquid-text-inverse rounded text-sm"
          >
            Reset to 0
          </button>
          <button
            onClick={() => setValue(50)}
            className="px-3 py-1 bg-liquid-accent text-liquid-text-inverse rounded text-sm"
          >
            Set to 50
          </button>
          <button
            onClick={() => setValue(undefined)}
            className="px-3 py-1 bg-liquid-bg text-liquid-text-inverse rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

export const MultipleInputs: Story = {
  render: () => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(50);
    const [depth, setDepth] = useState(25);

    const volume = width * height * depth;

    return (
      <div className="space-y-4 w-80">
        <h3 className="text-lg font-semibold text-liquid-text-inverse">
          Box Dimensions
        </h3>

        <GlassNumberInput
          label="Width (cm)"
          value={width}
          onChange={(value) => setWidth(value || 0)}
          min={1}
          max={1000}
          step={1}
        />

        <GlassNumberInput
          label="Height (cm)"
          value={height}
          onChange={(value) => setHeight(value || 0)}
          min={1}
          max={1000}
          step={1}
        />

        <GlassNumberInput
          label="Depth (cm)"
          value={depth}
          onChange={(value) => setDepth(value || 0)}
          min={1}
          max={1000}
          step={1}
        />

        <div className="p-4 bg-liquid-bg/10 rounded-lg backdrop-blur-sm">
          <p className="text-liquid-text-inverse">
            <strong>Volume:</strong> {volume.toLocaleString()} cm³
          </p>
        </div>
      </div>
    );
  },
};
