import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidRadio, LiquidRadioGroup } from "./liquid-radio";

const meta = {
  title: "Forms/LiquidRadio",
  component: LiquidRadio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A liquid glass radio button component with card variants, group management, and comprehensive form states.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card"],
      description: "The visual style variant of the radio button"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the radio button"
    },
    checked: {
      control: "boolean",
      description: "Whether the radio button is checked"
    },
    disabled: {
      control: "boolean",
      description: "Disable the radio button"
    },
    error: {
      control: "boolean",
      description: "Show error state"
    }
  },
  args: {
    label: "Radio Button Label",
    variant: "default",
    size: "md",
    checked: false,
    disabled: false,
    error: false,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Radio Button Variants</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Default Variant</h3>
            <div className="space-y-3">
              <LiquidRadio 
                variant="default" 
                label="Option 1"
                description="Standard radio button with minimal styling"
                name="default-group"
                value="option1"
              />
              <LiquidRadio 
                variant="default" 
                label="Option 2"
                description="Another option in the same group"
                name="default-group"
                value="option2"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Card Variant</h3>
            <div className="space-y-3">
              <LiquidRadio 
                variant="card" 
                label="Premium Plan"
                description="Enhanced radio button with card-like glass background"
                name="card-group"
                value="premium"
              />
              <LiquidRadio 
                variant="card" 
                label="Basic Plan"
                description="Perfect for getting started"
                name="card-group"
                value="basic"
              />
            </div>
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
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Radio Button Sizes</h2>
        <div className="space-y-6">
          <LiquidRadio 
            size="sm" 
            label="Small Radio Button"
            description="Compact size for dense layouts"
            name="size-group"
            value="small"
          />
          <LiquidRadio 
            size="md" 
            label="Medium Radio Button"
            description="Default size for most use cases"
            name="size-group"
            value="medium"
            checked
          />
          <LiquidRadio 
            size="lg" 
            label="Large Radio Button"
            description="Larger size for emphasis or accessibility"
            name="size-group"
            value="large"
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
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Radio Button States</h2>
        <div className="space-y-6">
          <LiquidRadio 
            label="Unchecked"
            checked={false}
            description="Default unchecked state"
            name="states-unchecked"
            value="unchecked"
          />
          <LiquidRadio 
            label="Checked"
            checked={true}
            description="Selected/checked state"
            name="states-checked"
            value="checked"
          />
          <LiquidRadio 
            label="Disabled Unchecked"
            disabled
            checked={false}
            description="Cannot be interacted with"
            name="states-disabled-unchecked"
            value="disabled-unchecked"
          />
          <LiquidRadio 
            label="Disabled Checked"
            disabled
            checked={true}
            description="Cannot be interacted with"
            name="states-disabled-checked"
            value="disabled-checked"
          />
          <LiquidRadio 
            label="Error State"
            error
            errorMessage="This option has an error"
            description="Radio button with validation error"
            name="states-error"
            value="error"
          />
        </div>
      </div>
    </div>
  ),
};

export const RadioGroup: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [plan, setPlan] = useState("basic");
    const [color, setColor] = useState("blue");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Radio Groups</h2>
          
          <div className="space-y-8">
            {/* Vertical Group */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Choose a Plan (Vertical)</h3>
              <LiquidRadioGroup
                value={plan}
                onChange={setPlan}
                name="plan-selection"
                orientation="vertical"
              >
                <LiquidRadio 
                  value="basic"
                  label="Basic Plan"
                  description="Perfect for personal use • $9/month"
                />
                <LiquidRadio 
                  value="pro"
                  label="Pro Plan"
                  description="Great for small teams • $29/month"
                />
                <LiquidRadio 
                  value="enterprise"
                  label="Enterprise Plan"
                  description="For large organizations • $99/month"
                />
              </LiquidRadioGroup>
              <div className="mt-4 text-sm text-white/70">
                Selected: {plan}
              </div>
            </div>

            {/* Horizontal Group */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Theme Color (Horizontal)</h3>
              <LiquidRadioGroup
                value={color}
                onChange={setColor}
                name="color-selection"
                orientation="horizontal"
              >
                <LiquidRadio 
                  value="blue"
                  label="Blue"
                  size="sm"
                />
                <LiquidRadio 
                  value="purple"
                  label="Purple"
                  size="sm"
                />
                <LiquidRadio 
                  value="green"
                  label="Green"
                  size="sm"
                />
                <LiquidRadio 
                  value="red"
                  label="Red"
                  size="sm"
                />
              </LiquidRadioGroup>
              <div className="mt-4 text-sm text-white/70">
                Selected: {color}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const CardVariant: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [subscription, setSubscription] = useState("pro");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Subscription Plans</h2>
          
          <LiquidRadioGroup
            value={subscription}
            onChange={setSubscription}
            name="subscription-plans"
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <LiquidRadio 
              variant="card"
              value="basic"
              label="Basic"
              description={
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">$9<span className="text-sm font-normal text-white/70">/mo</span></div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• 5 Projects</li>
                    <li>• 10GB Storage</li>
                    <li>• Email Support</li>
                  </ul>
                </div>
              }
            />
            <LiquidRadio 
              variant="card"
              value="pro"
              label="Pro"
              description={
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">$29<span className="text-sm font-normal text-white/70">/mo</span></div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Unlimited Projects</li>
                    <li>• 100GB Storage</li>
                    <li>• Priority Support</li>
                    <li>• Advanced Analytics</li>
                  </ul>
                </div>
              }
            />
            <LiquidRadio 
              variant="card"
              value="enterprise"
              label="Enterprise"
              description={
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white">$99<span className="text-sm font-normal text-white/70">/mo</span></div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• Everything in Pro</li>
                    <li>• 1TB Storage</li>
                    <li>• 24/7 Phone Support</li>
                    <li>• Custom Integrations</li>
                    <li>• Dedicated Manager</li>
                  </ul>
                </div>
              }
            />
          </LiquidRadioGroup>
          
          <div className="mt-8 text-center">
            <div className="text-white/70 mb-4">Selected Plan: {subscription}</div>
            <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-8 rounded-xl backdrop-blur-xl border border-white/30 transition-all duration-200">
              Continue with {subscription.charAt(0).toUpperCase() + subscription.slice(1)} Plan
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [formData, setFormData] = useState({
      paymentMethod: "credit",
      deliverySpeed: "standard",
      newsletter: "weekly",
      support: "email"
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.paymentMethod) {
        newErrors.paymentMethod = "Please select a payment method";
      }
      if (!formData.deliverySpeed) {
        newErrors.deliverySpeed = "Please select delivery speed";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted successfully!");
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Checkout Form</h2>
            <p className="text-white/70">Complete your order preferences</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Payment Method */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
              <LiquidRadioGroup
                value={formData.paymentMethod}
                onChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                name="payment-method"
              >
                <LiquidRadio 
                  variant="card"
                  value="credit"
                  label="Credit Card"
                  description="Pay with Visa, Mastercard, or American Express"
                />
                <LiquidRadio 
                  variant="card"
                  value="paypal"
                  label="PayPal"
                  description="Quick and secure payment through PayPal"
                />
                <LiquidRadio 
                  variant="card"
                  value="crypto"
                  label="Cryptocurrency"
                  description="Pay with Bitcoin, Ethereum, or other crypto"
                />
              </LiquidRadioGroup>
              {errors.paymentMethod && (
                <div className="mt-2 text-xs text-red-300">{errors.paymentMethod}</div>
              )}
            </div>

            {/* Delivery Speed */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Delivery Speed</h3>
              <LiquidRadioGroup
                value={formData.deliverySpeed}
                onChange={(value) => setFormData(prev => ({ ...prev, deliverySpeed: value }))}
                name="delivery-speed"
              >
                <LiquidRadio 
                  value="standard"
                  label="Standard Delivery"
                  description="5-7 business days • Free"
                />
                <LiquidRadio 
                  value="express"
                  label="Express Delivery"
                  description="2-3 business days • $9.99"
                />
                <LiquidRadio 
                  value="overnight"
                  label="Overnight Delivery"
                  description="Next business day • $24.99"
                />
              </LiquidRadioGroup>
              {errors.deliverySpeed && (
                <div className="mt-2 text-xs text-red-300">{errors.deliverySpeed}</div>
              )}
            </div>

            {/* Newsletter Preference */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Newsletter Preference</h3>
              <LiquidRadioGroup
                value={formData.newsletter}
                onChange={(value) => setFormData(prev => ({ ...prev, newsletter: value }))}
                name="newsletter-preference"
                orientation="horizontal"
              >
                <LiquidRadio 
                  value="none"
                  label="None"
                  size="sm"
                />
                <LiquidRadio 
                  value="weekly"
                  label="Weekly"
                  size="sm"
                />
                <LiquidRadio 
                  value="monthly"
                  label="Monthly"
                  size="sm"
                />
              </LiquidRadioGroup>
            </div>

            {/* Support Preference */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Preferred Support Channel</h3>
              <LiquidRadioGroup
                value={formData.support}
                onChange={(value) => setFormData(prev => ({ ...prev, support: value }))}
                name="support-preference"
                orientation="horizontal"
              >
                <LiquidRadio 
                  value="email"
                  label="Email"
                  size="sm"
                />
                <LiquidRadio 
                  value="phone"
                  label="Phone"
                  size="sm"
                />
                <LiquidRadio 
                  value="chat"
                  label="Live Chat"
                  size="sm"
                />
              </LiquidRadioGroup>
            </div>
            
            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl backdrop-blur-xl border border-white/30 transition-all duration-200"
            >
              Complete Order
            </button>
          </form>
        </div>
      </div>
    );
  },
};