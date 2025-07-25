import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { 
  CreditCard, 
  Wifi, 
  Monitor, 
  Smartphone, 
  Tablet,
  Moon,
  Sun,
  Cloud,
  Zap,
  Shield,
  Globe
} from "lucide-react";
import { RadioGroup, GlassRadioGroup, GlassRadioItem } from "./glass-radio-group";

const meta = {
  title: "Components/GlassRadioGroup",
  component: GlassRadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The GlassRadioGroup component provides a set of radio buttons with glassmorphic styling and smooth animations. 
Built on top of Radix UI, it offers full accessibility and keyboard navigation.

## Features
- **Glassmorphic design**: Beautiful glass-like appearance with backdrop blur
- **Smooth animations**: Spring animations on selection and hover
- **Multiple variants**: Default, solid, and ghost styles
- **Flexible layouts**: Horizontal and vertical orientations
- **Size options**: Small, medium, and large sizes
- **Fully accessible**: ARIA compliant with keyboard navigation
- **Compound pattern**: Use as RadioGroup with RadioGroup.Item
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      description: "Layout orientation of the radio group",
      control: { type: "select" },
      options: ["vertical", "horizontal"],
    },
    size: {
      description: "Size of the radio items",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    defaultValue: {
      description: "Default selected value",
      control: { type: "text" },
    },
    value: {
      description: "Controlled value",
      control: { type: "text" },
    },
    onValueChange: {
      description: "Callback when value changes",
      action: "valueChanged",
    },
    disabled: {
      description: "Disable the entire radio group",
      control: { type: "boolean" },
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
      <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
      <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Small</h3>
        <RadioGroup defaultValue="small1" size="sm">
          <RadioGroup.Item value="small1" size="sm">Small Option 1</RadioGroup.Item>
          <RadioGroup.Item value="small2" size="sm">Small Option 2</RadioGroup.Item>
          <RadioGroup.Item value="small3" size="sm">Small Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Medium (Default)</h3>
        <RadioGroup defaultValue="medium1" size="md">
          <RadioGroup.Item value="medium1" size="md">Medium Option 1</RadioGroup.Item>
          <RadioGroup.Item value="medium2" size="md">Medium Option 2</RadioGroup.Item>
          <RadioGroup.Item value="medium3" size="md">Medium Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Large</h3>
        <RadioGroup defaultValue="large1" size="lg">
          <RadioGroup.Item value="large1" size="lg">Large Option 1</RadioGroup.Item>
          <RadioGroup.Item value="large2" size="lg">Large Option 2</RadioGroup.Item>
          <RadioGroup.Item value="large3" size="lg">Large Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Different orientations
export const Orientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Vertical (Default)</h3>
        <RadioGroup defaultValue="v1" orientation="vertical">
          <RadioGroup.Item value="v1">Vertical Option 1</RadioGroup.Item>
          <RadioGroup.Item value="v2">Vertical Option 2</RadioGroup.Item>
          <RadioGroup.Item value="v3">Vertical Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Horizontal</h3>
        <RadioGroup defaultValue="h1" orientation="horizontal">
          <RadioGroup.Item value="h1">Option 1</RadioGroup.Item>
          <RadioGroup.Item value="h2">Option 2</RadioGroup.Item>
          <RadioGroup.Item value="h3">Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Default</h3>
        <RadioGroup defaultValue="default1">
          <RadioGroup.Item value="default1" variant="default">Default Style</RadioGroup.Item>
          <RadioGroup.Item value="default2" variant="default">Default Style 2</RadioGroup.Item>
          <RadioGroup.Item value="default3" variant="default">Default Style 3</RadioGroup.Item>
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Solid</h3>
        <RadioGroup defaultValue="solid1">
          <RadioGroup.Item value="solid1" variant="solid">Solid Style</RadioGroup.Item>
          <RadioGroup.Item value="solid2" variant="solid">Solid Style 2</RadioGroup.Item>
          <RadioGroup.Item value="solid3" variant="solid">Solid Style 3</RadioGroup.Item>
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Ghost</h3>
        <RadioGroup defaultValue="ghost1">
          <RadioGroup.Item value="ghost1" variant="ghost">Ghost Style</RadioGroup.Item>
          <RadioGroup.Item value="ghost2" variant="ghost">Ghost Style 2</RadioGroup.Item>
          <RadioGroup.Item value="ghost3" variant="ghost">Ghost Style 3</RadioGroup.Item>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("option1");

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
          <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
          <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
        </RadioGroup>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Selected value: <strong>{value}</strong>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setValue("option1")}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Select Option 1
          </button>
          <button
            onClick={() => setValue("option2")}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Select Option 2
          </button>
          <button
            onClick={() => setValue("option3")}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
          >
            Select Option 3
          </button>
        </div>
      </div>
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <RadioGroup defaultValue="wifi" orientation="horizontal">
      <RadioGroup.Item value="wifi">
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <span>WiFi</span>
        </div>
      </RadioGroup.Item>
      <RadioGroup.Item value="ethernet">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>Ethernet</span>
        </div>
      </RadioGroup.Item>
      <RadioGroup.Item value="mobile">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          <span>Mobile</span>
        </div>
      </RadioGroup.Item>
    </RadioGroup>
  ),
};

// Payment method example
export const PaymentMethod: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    return (
      <div className="w-full max-w-md">
        <h3 className="font-semibold mb-4">Select Payment Method</h3>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <RadioGroup.Item value="credit-card" size="lg">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                <div>
                  <p className="font-medium">Credit Card</p>
                  <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                </div>
              </div>
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item value="paypal" size="lg">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-gray-500">Fast and secure</p>
                </div>
              </div>
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item value="crypto" size="lg">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5" />
                <div>
                  <p className="font-medium">Cryptocurrency</p>
                  <p className="text-sm text-gray-500">Bitcoin, Ethereum</p>
                </div>
              </div>
            </div>
          </RadioGroup.Item>
        </RadioGroup>
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm">Selected: <strong>{paymentMethod}</strong></p>
        </div>
      </div>
    );
  },
};

// Device selection example
export const DeviceSelection: Story = {
  render: () => (
    <div>
      <h3 className="font-semibold mb-4">Choose Device Type</h3>
      <RadioGroup defaultValue="desktop" orientation="horizontal" size="lg">
        <RadioGroup.Item value="desktop" variant="solid">
          <div className="flex flex-col items-center gap-2 py-2">
            <Monitor className="w-6 h-6" />
            <span>Desktop</span>
          </div>
        </RadioGroup.Item>
        <RadioGroup.Item value="tablet" variant="solid">
          <div className="flex flex-col items-center gap-2 py-2">
            <Tablet className="w-6 h-6" />
            <span>Tablet</span>
          </div>
        </RadioGroup.Item>
        <RadioGroup.Item value="mobile" variant="solid">
          <div className="flex flex-col items-center gap-2 py-2">
            <Smartphone className="w-6 h-6" />
            <span>Mobile</span>
          </div>
        </RadioGroup.Item>
      </RadioGroup>
    </div>
  ),
};

// Theme selection
export const ThemeSelection: Story = {
  render: () => {
    const [theme, setTheme] = useState("system");

    return (
      <div className="w-full max-w-sm">
        <h3 className="font-semibold mb-4">Appearance</h3>
        <RadioGroup value={theme} onValueChange={setTheme}>
          <RadioGroup.Item value="light">
            <div className="flex items-center gap-3 w-full">
              <Sun className="w-4 h-4" />
              <div className="flex-1">
                <p className="font-medium">Light</p>
                <p className="text-sm text-gray-500">Light theme</p>
              </div>
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item value="dark">
            <div className="flex items-center gap-3 w-full">
              <Moon className="w-4 h-4" />
              <div className="flex-1">
                <p className="font-medium">Dark</p>
                <p className="text-sm text-gray-500">Dark theme</p>
              </div>
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item value="system">
            <div className="flex items-center gap-3 w-full">
              <Monitor className="w-4 h-4" />
              <div className="flex-1">
                <p className="font-medium">System</p>
                <p className="text-sm text-gray-500">Match system preference</p>
              </div>
            </div>
          </RadioGroup.Item>
        </RadioGroup>
      </div>
    );
  },
};

// Survey example
export const Survey: Story = {
  render: () => {
    const [satisfaction, setSatisfaction] = useState("");

    return (
      <div className="w-full max-w-md">
        <h3 className="font-semibold mb-2">How satisfied are you with our service?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Your feedback helps us improve
        </p>
        <RadioGroup value={satisfaction} onValueChange={setSatisfaction}>
          <RadioGroup.Item value="very-satisfied">
            <span className="text-green-600">Very Satisfied 😊</span>
          </RadioGroup.Item>
          <RadioGroup.Item value="satisfied">
            <span className="text-blue-600">Satisfied 🙂</span>
          </RadioGroup.Item>
          <RadioGroup.Item value="neutral">
            <span className="text-gray-600">Neutral 😐</span>
          </RadioGroup.Item>
          <RadioGroup.Item value="dissatisfied">
            <span className="text-orange-600">Dissatisfied 😕</span>
          </RadioGroup.Item>
          <RadioGroup.Item value="very-dissatisfied">
            <span className="text-red-600">Very Dissatisfied 😞</span>
          </RadioGroup.Item>
        </RadioGroup>
        {satisfaction && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm">Thank you for your feedback!</p>
          </div>
        )}
      </div>
    );
  },
};

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-4">Some options disabled</h3>
        <RadioGroup defaultValue="option1">
          <RadioGroup.Item value="option1">Available Option</RadioGroup.Item>
          <RadioGroup.Item value="option2" disabled>Disabled Option</RadioGroup.Item>
          <RadioGroup.Item value="option3">Another Available Option</RadioGroup.Item>
        </RadioGroup>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Entire group disabled</h3>
        <RadioGroup defaultValue="option1" disabled>
          <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
          <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
          <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <style>{`
        .custom-radio-group .group[data-state="checked"] {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .custom-radio-group .group[data-state="checked"] .text-gray-500 {
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
      <div className="custom-radio-group">
        <h3 className="font-semibold mb-4">Custom Styled Radio Group</h3>
        <RadioGroup defaultValue="custom1">
          <RadioGroup.Item value="custom1" size="lg">
            <div className="w-full">
              <p className="font-medium">Premium Plan</p>
              <p className="text-sm text-gray-500">$29/month</p>
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item value="custom2" size="lg">
            <div className="w-full">
              <p className="font-medium">Pro Plan</p>
              <p className="text-sm text-gray-500">$49/month</p>
            </div>
          </RadioGroup.Item>
          <RadioGroup.Item value="custom3" size="lg">
            <div className="w-full">
              <p className="font-medium">Enterprise Plan</p>
              <p className="text-sm text-gray-500">Custom pricing</p>
            </div>
          </RadioGroup.Item>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Accessibility demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <h3 className="font-semibold mb-2">Accessible Radio Group</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Use arrow keys to navigate, Space to select
      </p>
      <RadioGroup defaultValue="a11y1" aria-label="Accessibility options">
        <RadioGroup.Item value="a11y1" id="a11y1">
          <label htmlFor="a11y1">Enable screen reader support</label>
        </RadioGroup.Item>
        <RadioGroup.Item value="a11y2" id="a11y2">
          <label htmlFor="a11y2">High contrast mode</label>
        </RadioGroup.Item>
        <RadioGroup.Item value="a11y3" id="a11y3">
          <label htmlFor="a11y3">Reduce motion</label>
        </RadioGroup.Item>
      </RadioGroup>
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <p className="text-sm">
          <strong>Keyboard shortcuts:</strong><br />
          • Tab: Focus radio group<br />
          • Arrow Up/Down: Navigate options<br />
          • Space: Select focused option
        </p>
      </div>
    </div>
  ),
};