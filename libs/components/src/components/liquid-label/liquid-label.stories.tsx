import type { Meta, StoryObj } from "@storybook/react";
import { LiquidFieldset, LiquidLabel } from "./liquid-label";

const meta = {
  title: "Components/LiquidLabel",
  component: LiquidLabel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass label component with various states, indicators, and form integration features.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "muted", "success", "warning", "danger", "ghost"],
      description: "The visual style variant of the label",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the label",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight of the label",
    },
    transform: {
      control: "select",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      description: "Text transformation",
    },
    required: {
      control: "boolean",
      description: "Show required indicator",
    },
    optional: {
      control: "boolean",
      description: "Show optional indicator",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    success: {
      control: "boolean",
      description: "Success state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    animated: {
      control: "boolean",
      description: "Enable hover animations",
    },
  },
  args: {
    children: "Label Text",
    variant: "default",
    size: "sm",
    weight: "medium",
    transform: "none",
    required: false,
    optional: false,
    error: false,
    success: false,
    disabled: false,
    animated: false,
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
} satisfies Meta<typeof LiquidLabel>;

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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Label Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <LiquidLabel variant="default">Default Label</LiquidLabel>
            <LiquidLabel variant="secondary">Secondary Label</LiquidLabel>
            <LiquidLabel variant="muted">Muted Label</LiquidLabel>
          </div>
          <div className="space-y-4">
            <LiquidLabel variant="success">Success Label</LiquidLabel>
            <LiquidLabel variant="warning">Warning Label</LiquidLabel>
            <LiquidLabel variant="danger">Danger Label</LiquidLabel>
          </div>
          <div className="space-y-4">
            <LiquidLabel variant="ghost">Ghost Label</LiquidLabel>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Label Sizes</h2>
        <div className="space-y-4">
          <LiquidLabel size="xs">Extra Small Label</LiquidLabel>
          <LiquidLabel size="sm">Small Label</LiquidLabel>
          <LiquidLabel size="md">Medium Label</LiquidLabel>
          <LiquidLabel size="lg">Large Label</LiquidLabel>
          <LiquidLabel size="xl">Extra Large Label</LiquidLabel>
        </div>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Font Weights</h2>
        <div className="space-y-4">
          <LiquidLabel weight="normal" size="lg">
            Normal Weight
          </LiquidLabel>
          <LiquidLabel weight="medium" size="lg">
            Medium Weight
          </LiquidLabel>
          <LiquidLabel weight="semibold" size="lg">
            Semibold Weight
          </LiquidLabel>
          <LiquidLabel weight="bold" size="lg">
            Bold Weight
          </LiquidLabel>
        </div>
      </div>
    </div>
  ),
};

export const TextTransforms: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Text Transforms</h2>
        <div className="space-y-4">
          <LiquidLabel transform="none" size="lg">
            Normal Text Transform
          </LiquidLabel>
          <LiquidLabel transform="uppercase" size="lg">
            Uppercase Transform
          </LiquidLabel>
          <LiquidLabel transform="lowercase" size="lg">
            LOWERCASE TRANSFORM
          </LiquidLabel>
          <LiquidLabel transform="capitalize" size="lg">
            capitalize transform
          </LiquidLabel>
        </div>
      </div>
    </div>
  ),
};

export const Indicators: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Label Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Required & Optional</h3>
            <div className="space-y-3">
              <LiquidLabel required>Required Field</LiquidLabel>
              <LiquidLabel optional>Optional Field</LiquidLabel>
              <LiquidLabel required requiredIndicator="(required)">
                Custom Required Text
              </LiquidLabel>
              <LiquidLabel optional optionalIndicator="(opt)">
                Custom Optional Text
              </LiquidLabel>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">With Tooltips</h3>
            <div className="space-y-3">
              <LiquidLabel tooltip="This field is important">Hover for Info</LiquidLabel>
              <LiquidLabel required tooltip="Email address is required for account creation">
                Email Address
              </LiquidLabel>
              <LiquidLabel optional tooltip="Phone number helps with account recovery">
                Phone Number
              </LiquidLabel>
            </div>
          </div>
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
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Label States</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Normal State</h3>
            <LiquidLabel>Normal Label</LiquidLabel>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Success State</h3>
            <LiquidLabel success successMessage="Great! This field is valid.">
              Success Label
            </LiquidLabel>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Error State</h3>
            <LiquidLabel error errorMessage="This field is required and cannot be empty.">
              Error Label
            </LiquidLabel>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Disabled State</h3>
            <LiquidLabel disabled>Disabled Label</LiquidLabel>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithDescriptions: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Labels with Descriptions</h2>
        <div className="space-y-6">
          <LiquidLabel description="Enter your full name as it appears on your ID.">
            Full Name
          </LiquidLabel>

          <LiquidLabel required description="We'll use this email to send you important updates.">
            Email Address
          </LiquidLabel>

          <LiquidLabel
            optional
            description="Your phone number will be kept private and only used for account security."
          >
            Phone Number
          </LiquidLabel>

          <LiquidLabel
            success
            successMessage="Password meets all requirements."
            description="Must be at least 8 characters with uppercase, lowercase, and numbers."
          >
            Password
          </LiquidLabel>

          <LiquidLabel
            error
            errorMessage="Passwords do not match."
            description="Re-enter your password to confirm."
          >
            Confirm Password
          </LiquidLabel>
        </div>
      </div>
    </div>
  ),
};

export const Animated: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Animated Labels</h2>
        <div className="space-y-6">
          <LiquidLabel
            animated
            size="lg"
            description="Hover over this label to see the animation effect."
          >
            Animated Label
          </LiquidLabel>

          <LiquidLabel
            animated
            required
            tooltip="This field is required"
            description="Interactive label with multiple features."
          >
            Interactive Label
          </LiquidLabel>

          <LiquidLabel
            animated
            variant="success"
            success
            successMessage="Animation works with all states!"
          >
            Animated Success
          </LiquidLabel>
        </div>
      </div>
    </div>
  ),
};

export const Fieldsets: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Fieldset Groups</h2>
        <div className="space-y-8">
          <LiquidFieldset
            legend="Personal Information"
            description="Please provide your basic personal details."
          >
            <LiquidLabel required>First Name</LiquidLabel>
            <LiquidLabel required>Last Name</LiquidLabel>
            <LiquidLabel optional description="We'll use this to send you updates.">
              Email Address
            </LiquidLabel>
          </LiquidFieldset>

          <LiquidFieldset
            variant="bordered"
            legend="Account Settings"
            description="Configure your account preferences."
          >
            <LiquidLabel required tooltip="Choose a secure password">
              Password
            </LiquidLabel>
            <LiquidLabel required>Confirm Password</LiquidLabel>
            <LiquidLabel optional description="This helps with account recovery.">
              Recovery Email
            </LiquidLabel>
          </LiquidFieldset>

          <LiquidFieldset
            variant="ghost"
            legend="Preferences"
            success
            successMessage="All preferences saved successfully!"
          >
            <LiquidLabel>Theme</LiquidLabel>
            <LiquidLabel>Language</LiquidLabel>
            <LiquidLabel optional>Timezone</LiquidLabel>
          </LiquidFieldset>

          <LiquidFieldset
            variant="bordered"
            legend="Error Example"
            error
            errorMessage="Please fix the errors below before continuing."
          >
            <LiquidLabel error errorMessage="This field is required.">
              Required Field
            </LiquidLabel>
            <LiquidLabel>Normal Field</LiquidLabel>
          </LiquidFieldset>
        </div>
      </div>
    </div>
  ),
};

export const FormIntegration: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Form Integration</h2>
        <form className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-semibold text-white mb-6">Create Account</h3>

          <div>
            <LiquidLabel htmlFor="firstName" required animated>
              First Name
            </LiquidLabel>
            <input
              id="firstName"
              type="text"
              className="mt-2 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <LiquidLabel
              htmlFor="email"
              required
              tooltip="We'll never share your email"
              description="Used for login and important notifications."
            >
              Email Address
            </LiquidLabel>
            <input
              id="email"
              type="email"
              className="mt-2 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <LiquidLabel
              htmlFor="phone"
              optional
              description="For account security and recovery purposes."
            >
              Phone Number
            </LiquidLabel>
            <input
              id="phone"
              type="tel"
              className="mt-2 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <LiquidLabel
              htmlFor="password"
              required
              description="Must be at least 8 characters long."
            >
              Password
            </LiquidLabel>
            <input
              id="password"
              type="password"
              className="mt-2 w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Create a strong password"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  ),
};
