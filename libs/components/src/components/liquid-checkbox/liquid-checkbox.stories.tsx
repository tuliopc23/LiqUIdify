import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidCheckbox } from "./liquid-checkbox";

const meta = {
  title: "Forms/LiquidCheckbox",
  component: LiquidCheckbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A liquid glass checkbox component with card variants, indeterminate state, and comprehensive form states.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card"],
      description: "The visual style variant of the checkbox"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the checkbox"
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked"
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in indeterminate state"
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox"
    },
    error: {
      control: "boolean",
      description: "Show error state"
    }
  },
  args: {
    label: "Checkbox Label",
    variant: "default",
    size: "md",
    checked: false,
    indeterminate: false,
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
} satisfies Meta<typeof LiquidCheckbox>;

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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Checkbox Variants</h2>
        <div className="space-y-6">
          <LiquidCheckbox 
            variant="default" 
            label="Default Checkbox"
            description="Standard checkbox with minimal styling"
          />
          <LiquidCheckbox 
            variant="card" 
            label="Card Checkbox"
            description="Enhanced checkbox with card-like glass background"
          />
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Checkbox Sizes</h2>
        <div className="space-y-6">
          <LiquidCheckbox 
            size="sm" 
            label="Small Checkbox"
            description="Compact size for dense layouts"
          />
          <LiquidCheckbox 
            size="md" 
            label="Medium Checkbox"
            description="Default size for most use cases"
          />
          <LiquidCheckbox 
            size="lg" 
            label="Large Checkbox"
            description="Larger size for emphasis or accessibility"
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
  render: () => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Checkbox States</h2>
          <div className="space-y-6">
            <LiquidCheckbox 
              label="Unchecked"
              checked={false}
              description="Default unchecked state"
            />
            <LiquidCheckbox 
              label="Checked"
              checked={true}
              description="Selected/checked state"
            />
            <LiquidCheckbox 
              label="Interactive Checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              description="Click to toggle this checkbox"
            />
            <LiquidCheckbox 
              label="Indeterminate"
              indeterminate={indeterminate}
              onChange={(e) => {
                setIndeterminate(false);
              }}
              description="Partial selection state - click to make it checked"
            />
            <LiquidCheckbox 
              label="Disabled Unchecked"
              disabled
              checked={false}
              description="Cannot be interacted with"
            />
            <LiquidCheckbox 
              label="Disabled Checked"
              disabled
              checked={true}
              description="Cannot be interacted with"
            />
            <LiquidCheckbox 
              label="Error State"
              error
              errorMessage="This field is required"
              description="Checkbox with validation error"
            />
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
    const [preferences, setPreferences] = useState({
      notifications: true,
      newsletter: false,
      analytics: true,
      marketing: false
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Card Variant Showcase</h2>
          <div className="space-y-4">
            <LiquidCheckbox 
              variant="card"
              label="Push Notifications"
              description="Receive instant notifications for important updates and messages"
              checked={preferences.notifications}
              onChange={(e) => setPreferences(prev => ({ ...prev, notifications: e.target.checked }))}
            />
            <LiquidCheckbox 
              variant="card"
              label="Newsletter Subscription"
              description="Get weekly updates about new features and product announcements"
              checked={preferences.newsletter}
              onChange={(e) => setPreferences(prev => ({ ...prev, newsletter: e.target.checked }))}
            />
            <LiquidCheckbox 
              variant="card"
              label="Analytics & Usage Data"
              description="Help us improve by sharing anonymous usage statistics"
              checked={preferences.analytics}
              onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
            />
            <LiquidCheckbox 
              variant="card"
              label="Marketing Communications"
              description="Receive promotional offers and marketing materials"
              checked={preferences.marketing}
              onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [selectAll, setSelectAll] = useState(false);
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
      item4: false
    });

    const allSelected = Object.values(items).every(Boolean);
    const someSelected = Object.values(items).some(Boolean);
    const indeterminate = someSelected && !allSelected;

    const handleSelectAll = (checked: boolean) => {
      setSelectAll(checked);
      setItems({
        item1: checked,
        item2: checked,
        item3: checked,
        item4: checked
      });
    };

    const handleItemChange = (key: keyof typeof items, checked: boolean) => {
      setItems(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Examples</h2>
          
          <div className="space-y-6">
            {/* Select All Example */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Select All Pattern</h3>
              <div className="space-y-4">
                <LiquidCheckbox 
                  variant="card"
                  label="Select All Items"
                  description="Toggle all items below"
                  checked={allSelected}
                  indeterminate={indeterminate}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <div className="ml-6 space-y-3">
                  <LiquidCheckbox 
                    label="Item 1"
                    checked={items.item1}
                    onChange={(e) => handleItemChange('item1', e.target.checked)}
                  />
                  <LiquidCheckbox 
                    label="Item 2"
                    checked={items.item2}
                    onChange={(e) => handleItemChange('item2', e.target.checked)}
                  />
                  <LiquidCheckbox 
                    label="Item 3"
                    checked={items.item3}
                    onChange={(e) => handleItemChange('item3', e.target.checked)}
                  />
                  <LiquidCheckbox 
                    label="Item 4"
                    checked={items.item4}
                    onChange={(e) => handleItemChange('item4', e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Terms & Conditions</h3>
              <LiquidCheckbox 
                variant="card"
                label="I agree to the Terms of Service"
                description="By checking this box, you agree to our terms and conditions"
                helperText="This is required to proceed"
              />
            </div>
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
      features: {
        notifications: true,
        darkMode: false,
        autoSave: true,
        analytics: false
      },
      privacy: {
        shareData: false,
        cookies: true,
        tracking: false
      },
      communication: {
        newsletter: false,
        updates: true,
        marketing: false
      },
      terms: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.terms) {
        newErrors.terms = "You must agree to the terms to continue";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Settings saved successfully!");
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
            <p className="text-white/70">Customize your experience</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Features Section */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <div className="space-y-4">
                <LiquidCheckbox 
                  variant="card"
                  label="Push Notifications"
                  description="Receive notifications for important updates"
                  checked={formData.features.notifications}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    features: { ...prev.features, notifications: e.target.checked }
                  }))}
                />
                <LiquidCheckbox 
                  variant="card"
                  label="Dark Mode"
                  description="Use dark theme across the application"
                  checked={formData.features.darkMode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    features: { ...prev.features, darkMode: e.target.checked }
                  }))}
                />
                <LiquidCheckbox 
                  variant="card"
                  label="Auto Save"
                  description="Automatically save your work"
                  checked={formData.features.autoSave}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    features: { ...prev.features, autoSave: e.target.checked }
                  }))}
                />
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
              <div className="space-y-4">
                <LiquidCheckbox 
                  label="Share usage data"
                  description="Help improve the product by sharing anonymous usage data"
                  checked={formData.privacy.shareData}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, shareData: e.target.checked }
                  }))}
                />
                <LiquidCheckbox 
                  label="Allow cookies"
                  description="Enable cookies for better user experience"
                  checked={formData.privacy.cookies}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, cookies: e.target.checked }
                  }))}
                />
              </div>
            </div>

            {/* Terms */}
            <LiquidCheckbox 
              variant="card"
              label="I agree to the Terms of Service and Privacy Policy"
              description="Required to save your settings"
              checked={formData.terms}
              onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
              error={Boolean(errors.terms)}
              helperText={errors.terms}
            />
            
            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl backdrop-blur-xl border border-white/30 transition-all duration-200"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    );
  },
};