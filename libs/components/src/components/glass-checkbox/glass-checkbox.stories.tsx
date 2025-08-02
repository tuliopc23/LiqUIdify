import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bell,
  File,
  Globe,
  Mail,
  MessageCircle,
  Settings,
  Shield,
} from "lucide-react";
import React from "react";
import { GlassButton } from "../glass-button-refactored/glass-button";
import { Card } from "../glass-card-refactored/glass-card";
import { GlassCheckbox } from "./glass-checkbox";

const meta = {
  title: "Components/Forms/GlassCheckbox",
  component: GlassCheckbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A glassmorphic checkbox component with smooth animations and comprehensive accessibility features.

## Features

- **Glass Design**: Beautiful frosted glass appearance with customizable opacity
- **Smooth Animations**: Fluid state transitions and micro-interactions
- **Label Support**: Built-in label rendering with proper accessibility
- **Custom Styling**: Fully customizable with Tailwind classes
- **Theme Support**: Automatic adaptation to light and dark themes
- **Accessibility**: Full keyboard navigation and screen reader support
- **State Management**: Controlled and uncontrolled modes
- **Indeterminate State**: Support for partially checked state
- **Size Variants**: Multiple sizes for different use cases
- **Group Support**: Works seamlessly with checkbox groups

## Usage

\`\`\`tsx
import { GlassCheckbox } from '@/components/glass-checkbox';

// Basic usage
<GlassCheckbox label="Accept terms" />

// Controlled
<GlassCheckbox 
  checked={checked} 
  onChange={(e) => setChecked(e.target.checked)}
  label="Subscribe to newsletter" />

// With custom styling
<GlassCheckbox 
  label="Premium feature"
  className="scale-125" />

// Disabled state
<GlassCheckbox 
  label="Unavailable option"
  disabled />
\`\`\`

## Keyboard Shortcuts

- **Tab**: Navigate between checkboxes
- **Space**: Toggle checkbox state
- **Shift+Tab**: Navigate backwards

## Accessibility

The checkbox component follows WAI-ARIA guidelines:
- Proper labeling with htmlFor attribute
- Keyboard navigation support
- Focus indicators
- Screen reader announcements
- Disabled state handling
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Content
    label: {
      control: "text",
      description: "Label text for the checkbox",
      table: {
        type: { summary: "string" },
        category: "Content",
      },
    },

    // State
    checked: {
      control: "boolean",
      description: "Checked state of the checkbox",
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
    },
    indeterminate: {
      control: "boolean",
      description: "Indeterminate state (partially checked)",
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },

    // Appearance
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },

    // HTML Props
    id: {
      control: "text",
      description: "HTML id attribute",
      table: {
        type: { summary: "string" },
        category: "HTML Props",
      },
    },
    name: {
      control: "text",
      description: "HTML name attribute",
      table: {
        type: { summary: "string" },
        category: "HTML Props",
      },
    },
    value: {
      control: "text",
      description: "HTML value attribute",
      table: {
        type: { summary: "string" },
        category: "HTML Props",
      },
    },
    required: {
      control: "boolean",
      description: "Required field",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "HTML Props",
      },
    },

    // Events
    onChange: {
      action: "changed",
      description: "Change event handler",
      table: {
        type: { summary: "(event: ChangeEvent<HTMLInputElement>) => void" },
        category: "Events",
      },
    },
    onFocus: {
      action: "focused",
      table: {
        category: "Events",
      },
    },
    onBlur: {
      action: "blurred",
      table: {
        category: "Events",
      },
    },
  },
  args: {
    disabled: false,
    required: false,
  },
} satisfies Meta<typeof GlassCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  args: {
    label: "Check me",
  },
};

// Basic examples
export const BasicExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-600 text-sm dark:text-gray-400">
          States
        </h3>
        <div className="space-y-3">
          <GlassCheckbox label="Unchecked" />
          <GlassCheckbox label="Checked" defaultChecked />
          <GlassCheckbox label="Disabled" disabled />
          <GlassCheckbox label="Disabled Checked" disabled defaultChecked />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-600 text-sm dark:text-gray-400">
          Without Labels
        </h3>
        <div className="flex items-center gap-4">
          <GlassCheckbox aria-label="Option 1" />
          <GlassCheckbox aria-label="Option 2" defaultChecked />
          <GlassCheckbox aria-label="Option 3" disabled />
        </div>
      </div>
    </div>
  ),
};

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-600 text-sm dark:text-gray-400">
          Custom Sizes with Tailwind
        </h3>
        <div className="space-y-3">
          <GlassCheckbox label="Extra Small" className="scale-75" />
          <GlassCheckbox label="Small" className="scale-90" />
          <GlassCheckbox label="Default" />
          <GlassCheckbox label="Large" className="scale-110" />
          <GlassCheckbox label="Extra Large" className="scale-125" />
        </div>
      </div>
    </div>
  ),
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState({
      item1: false,
      item2: true,
      item3: false,
      item4: true,
    });

    const allChecked = Object.values(checkedItems).every(Boolean);
    const _someChecked = Object.values(checkedItems).some(Boolean);

    const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.checked;
      setCheckedItems({
        item1: newValue,
        item2: newValue,
        item3: newValue,
        item4: newValue,
      });
    };

    const handleChildChange =
      (key: keyof typeof checkedItems) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItems((prev) => ({
          ...prev,
          [key]: e.target.checked,
        }));
      };

    return (
      <Card className="max-w-md p-6">
        <div className="space-y-4">
          <div className="border-gray-200 border-b pb-4 dark:border-gray-700">
            <GlassCheckbox
              label="Select All"
              checked={allChecked}
              onChange={handleParentChange}
              ref={(el) => {
                if (el) {
                  el.indeterminate = _someChecked && !allChecked;
                }
              }}
            />
          </div>

          <div className="space-y-3 pl-6">
            <GlassCheckbox
              label="Option 1"
              checked={checkedItems.item1}
              onChange={handleChildChange("item1")}
            />
            <GlassCheckbox
              label="Option 2"
              checked={checkedItems.item2}
              onChange={handleChildChange("item2")}
            />
            <GlassCheckbox
              label="Option 3"
              checked={checkedItems.item3}
              onChange={handleChildChange("item3")}
            />
            <GlassCheckbox
              label="Option 4"
              checked={checkedItems.item4}
              onChange={handleChildChange("item4")}
            />
          </div>

          <div className="pt-4 text-gray-600 text-sm dark:text-gray-400">
            Selected: {Object.values(checkedItems).filter(Boolean).length} / 4
          </div>
        </div>
      </Card>
    );
  },
};

// Form examples
export const FormExamples: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      terms: false,
      newsletter: false,
      notifications: true,
      marketing: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    const handleChange =
      (field: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.checked,
        }));
      };

    return (
      <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Sign Up Form */}
        <Card>
          <Card.Header>
            <Card.Title>Create Account</Card.Title>
            <Card.Description>
              Please review and accept our terms
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <GlassCheckbox
                  label="I accept the Terms and Conditions"
                  checked={formData.terms}
                  onChange={handleChange("terms")}
                  required
                />
                <GlassCheckbox
                  label="Subscribe to newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange("newsletter")}
                />
                <GlassCheckbox
                  label="Send me promotional emails"
                  checked={formData.marketing}
                  onChange={handleChange("marketing")}
                />
              </div>
              <GlassButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={!formData.terms}
              >
                Sign Up
              </GlassButton>
            </form>
          </Card.Content>
        </Card>

        {/* Settings Form */}
        <Card>
          <Card.Header>
            <Card.Title>Notification Settings</Card.Title>
            <Card.Description>
              Choose what you want to be notified about
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
                  <GlassCheckbox label="Email notifications" defaultChecked />
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-gray-400" />
                  <GlassCheckbox label="SMS notifications" />
                </div>
                <div className="flex items-start gap-3">
                  <Bell className="mt-0.5 h-5 w-5 text-gray-400" />
                  <GlassCheckbox label="Push notifications" defaultChecked />
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 text-gray-400" />
                  <GlassCheckbox label="Browser notifications" />
                </div>
              </div>
              <GlassButton type="button" variant="primary" fullWidth>
                Save Settings
              </GlassButton>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="max-w-6xl space-y-8">
      {/* Task List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Task Management</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <Card.Header>
              <Card.Title>Today's Tasks</Card.Title>
              <Card.Description>Track your daily progress</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox
                    label="Complete project proposal"
                    defaultChecked
                  />
                  <span className="text-gray-500 text-sm">High</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox label="Review pull requests" defaultChecked />
                  <span className="text-gray-500 text-sm">Medium</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox label="Update documentation" />
                  <span className="text-gray-500 text-sm">Low</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox label="Team standup meeting" />
                  <span className="text-gray-500 text-sm">High</span>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Shopping List</Card.Title>
              <Card.Description>Items to purchase</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox label="Milk" defaultChecked />
                  <span className="text-gray-500 text-sm">2 units</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox label="Bread" />
                  <span className="text-gray-500 text-sm">1 loaf</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox label="Eggs" />
                  <span className="text-gray-500 text-sm">1 dozen</span>
                </div>
                <div className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <GlassCheckbox label="Coffee" defaultChecked />
                  <span className="text-gray-500 text-sm">1 bag</span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Feature Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Feature Selection</h3>
        <Card>
          <Card.Header>
            <Card.Title>Choose Your Plan Features</Card.Title>
            <Card.Description>
              Select the features you need for your project
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700 text-sm dark:text-gray-300">
                  Storage
                </h4>
                <div className="space-y-2">
                  <GlassCheckbox label="100GB Storage" defaultChecked />
                  <GlassCheckbox label="Unlimited Bandwidth" defaultChecked />
                  <GlassCheckbox label="CDN Access" />
                  <GlassCheckbox label="Automatic Backups" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-700 text-sm dark:text-gray-300">
                  Security
                </h4>
                <div className="space-y-2">
                  <GlassCheckbox label="SSL Certificate" defaultChecked />
                  <GlassCheckbox label="DDoS Protection" defaultChecked />
                  <GlassCheckbox label="2FA Authentication" />
                  <GlassCheckbox label="IP Whitelisting" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-700 text-sm dark:text-gray-300">
                  Support
                </h4>
                <div className="space-y-2">
                  <GlassCheckbox label="Email Support" defaultChecked />
                  <GlassCheckbox label="Live Chat" />
                  <GlassCheckbox label="Phone Support" />
                  <GlassCheckbox label="Dedicated Manager" />
                </div>
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <GlassButton type="button" variant="primary">
              Continue to Payment
            </GlassButton>
            <GlassButton type="button" variant="ghost">
              Compare Plans
            </GlassButton>
          </Card.Footer>
        </Card>
      </div>

      {/* Permissions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Permission Management</h3>
        <Card>
          <Card.Header>
            <Card.Title>User Permissions</Card.Title>
            <Card.Description>
              Configure access levels for team members
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-sm">
                    <File className="h-4 w-4" />
                    Content
                  </h4>
                  <div className="space-y-2 pl-6">
                    <GlassCheckbox label="View content" defaultChecked />
                    <GlassCheckbox label="Create content" defaultChecked />
                    <GlassCheckbox label="Edit content" />
                    <GlassCheckbox label="Delete content" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-sm">
                    <Users className="h-4 w-4" />
                    Users
                  </h4>
                  <div className="space-y-2 pl-6">
                    <GlassCheckbox label="View users" defaultChecked />
                    <GlassCheckbox label="Invite users" />
                    <GlassCheckbox label="Edit users" />
                    <GlassCheckbox label="Remove users" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-sm">
                    <Settings className="h-4 w-4" />
                    Settings
                  </h4>
                  <div className="space-y-2 pl-6">
                    <GlassCheckbox label="View settings" defaultChecked />
                    <GlassCheckbox label="Edit settings" />
                    <GlassCheckbox label="Billing access" />
                    <GlassCheckbox label="API access" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-medium text-sm">
                    <Shield className="h-4 w-4" />
                    Security
                  </h4>
                  <div className="space-y-2 pl-6">
                    <GlassCheckbox label="View audit logs" />
                    <GlassCheckbox label="Manage 2FA" />
                    <GlassCheckbox label="IP restrictions" />
                    <GlassCheckbox label="Export data" />
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  ),
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-white/80 p-6 dark:bg-gray-900/80">
          <h3 className="font-semibold text-lg">Light Theme</h3>
          <div className="space-y-3">
            <GlassCheckbox label="Unchecked option" />
            <GlassCheckbox label="Checked option" defaultChecked />
            <GlassCheckbox label="Disabled option" disabled />
            <GlassCheckbox label="Disabled checked" disabled defaultChecked />
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-gray-900/80 p-6 dark:bg-white/80">
          <h3 className="font-semibold text-lg text-white dark:text-gray-900">
            Dark Theme
          </h3>
          <div className="space-y-3">
            <GlassCheckbox label="Unchecked option" />
            <GlassCheckbox label="Checked option" defaultChecked />
            <GlassCheckbox label="Disabled option" disabled />
            <GlassCheckbox label="Disabled checked" disabled defaultChecked />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "liquid-gradient",
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Keyboard Navigation</h3>
        <p className="text-gray-600 text-sm dark:text-gray-400">
          Use Tab to navigate between checkboxes and Space to toggle them.
        </p>
        <Card>
          <Card.Content>
            <form className="space-y-3">
              <GlassCheckbox label="First option (Tab here)" />
              <GlassCheckbox label="Second option (Tab again)" />
              <GlassCheckbox label="Third option (Space to toggle)" />
              <GlassCheckbox
                label="Disabled option (Skipped in tab order)"
                disabled
              />
            </form>
          </Card.Content>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Screen Reader Support</h3>
        <Card>
          <Card.Content>
            <div className="space-y-3">
              <GlassCheckbox
                label="Option with description"
                aria-describedby="option1-desc"
              />
              <p
                id="option1-desc"
                className="pl-8 text-gray-600 text-sm dark:text-gray-400"
              >
                This checkbox has additional context for screen readers.
              </p>

              <GlassCheckbox
                label="Required option"
                required
                aria-required="true"
              />

              <GlassCheckbox aria-label="Option without visible label" />
              <p className="pl-8 text-gray-600 text-sm dark:text-gray-400">
                The checkbox above has an aria-label instead of visible text.
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Focus Management</h3>
        <Card>
          <Card.Content>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Focus indicators are clearly visible for keyboard users.
              </p>
              <div className="space-y-3">
                <GlassCheckbox label="Focus this checkbox" />
                <GlassCheckbox label="Then tab to this one" />
                <div className="flex items-center gap-4 pt-2">
                  <GlassButton type="button" size="sm" variant="ghost">
                    Previous
                  </GlassButton>
                  <GlassButton type="button" size="sm" variant="primary">
                    Next
                  </GlassButton>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Error States</h3>
        <Card>
          <Card.Content>
            <form className="space-y-4">
              <div className="space-y-2">
                <GlassCheckbox
                  label="Accept terms and conditions"
                  required
                  aria-invalid="true"
                  aria-describedby="terms-error"
                  className="border-red-500"
                />
                <p
                  id="terms-error"
                  className="pl-8 text-red-600 text-sm dark:text-red-400"
                >
                  You must accept the terms to continue.
                </p>
              </div>

              <div className="space-y-2">
                <GlassCheckbox
                  label="Receive marketing emails"
                  aria-describedby="marketing-help"
                />
                <p
                  id="marketing-help"
                  className="pl-8 text-gray-600 text-sm dark:text-gray-400"
                >
                  You can unsubscribe at any time.
                </p>
              </div>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  ),
};

// Custom styling examples
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Color Variants</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <Card.Header>
              <Card.Title>Custom Colors</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <GlassCheckbox
                  label="Primary Blue"
                  className="accent-blue-500"
                  defaultChecked
                />
                <GlassCheckbox
                  label="Success Green"
                  className="accent-green-500"
                  defaultChecked
                />
                <GlassCheckbox
                  label="Warning Yellow"
                  className="accent-yellow-500"
                  defaultChecked
                />
                <GlassCheckbox
                  label="Danger Red"
                  className="accent-red-500"
                  defaultChecked
                />
                <GlassCheckbox
                  label="Purple"
                  className="accent-purple-500"
                  defaultChecked
                />
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Custom Styles</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <GlassCheckbox
                  label="Rounded"
                  className="rounded-full"
                  defaultChecked
                />
                <GlassCheckbox
                  label="No Rounded"
                  className="rounded-none"
                  defaultChecked
                />
                <GlassCheckbox
                  label="Thick Border"
                  className="border-4"
                  defaultChecked
                />
                <GlassCheckbox
                  label="Large with Shadow"
                  className="scale-125 shadow-lg"
                  defaultChecked
                />
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  ),
};
