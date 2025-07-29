import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircle,
  Award,
  CheckCircle,
  Info,
  Star,
  XCircle,
} from "lucide-react";
import { GlassBadge } from "./glass-badge";

const meta = {
  title: "Components/Display/GlassBadge",
  component: GlassBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A lightweight badge component for displaying labels, status indicators, and small pieces of information with glassmorphism styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Visual style variant of the badge",
    },
    children: {
      control: "text",
      description: "Badge content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof GlassBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: "Default",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const ErrorBadge: Story = {
  args: {
    children: "Error",
    variant: "error",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <GlassBadge variant="default">Default</GlassBadge>
      <GlassBadge variant="success">Success</GlassBadge>
      <GlassBadge variant="warning">Warning</GlassBadge>
      <GlassBadge variant="error">Error</GlassBadge>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <GlassBadge variant="default">
        <Info className="mr-1 inline h-3 w-3" />
        Info
      </GlassBadge>
      <GlassBadge variant="success">
        <CheckCircle className="mr-1 inline h-3 w-3" />
        Completed
      </GlassBadge>
      <GlassBadge variant="warning">
        <AlertCircle className="mr-1 inline h-3 w-3" />
        Pending
      </GlassBadge>
      <GlassBadge variant="error">
        <XCircle className="mr-1 inline h-3 w-3" />
        Failed
      </GlassBadge>
    </div>
  ),
};

// Status indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/80">User Status:</span>
        <GlassBadge variant="success">Active</GlassBadge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/80">Subscription:</span>
        <GlassBadge variant="warning">Expiring Soon</GlassBadge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/80">Payment:</span>
        <GlassBadge variant="error">Overdue</GlassBadge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/80">Role:</span>
        <GlassBadge variant="default">Administrator</GlassBadge>
      </div>
    </div>
  ),
};

// Count badges
export const CountBadges: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button
          type="button"
          className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Notifications
        </button>
        <GlassBadge className="-top-2 -right-2 absolute" variant="error">
          3
        </GlassBadge>
      </div>
      <div className="relative">
        <button
          type="button"
          className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Messages
        </button>
        <GlassBadge className="-top-2 -right-2 absolute" variant="default">
          12
        </GlassBadge>
      </div>
      <div className="relative">
        <button
          type="button"
          className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Updates
        </button>
        <GlassBadge className="-top-2 -right-2 absolute" variant="success">
          New
        </GlassBadge>
      </div>
    </div>
  ),
};

// Tags and labels
export const TagsAndLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 font-semibold text-sm text-white/80">Categories</h4>
        <div className="flex flex-wrap gap-2">
          <GlassBadge>Technology</GlassBadge>
          <GlassBadge>Design</GlassBadge>
          <GlassBadge>Business</GlassBadge>
          <GlassBadge>Marketing</GlassBadge>
          <GlassBadge>Development</GlassBadge>
        </div>
      </div>
      <div>
        <h4 className="mb-2 font-semibold text-sm text-white/80">Skills</h4>
        <div className="flex flex-wrap gap-2">
          <GlassBadge variant="success">React</GlassBadge>
          <GlassBadge variant="success">TypeScript</GlassBadge>
          <GlassBadge variant="warning">Python</GlassBadge>
          <GlassBadge variant="default">Node.js</GlassBadge>
        </div>
      </div>
    </div>
  ),
};

// Achievement badges
export const AchievementBadges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <GlassBadge className="px-4 py-2">
        <Award className="mr-1 inline h-4 w-4 text-yellow-500" />
        Gold Member
      </GlassBadge>
      <GlassBadge className="px-4 py-2">
        <Star className="mr-1 inline h-4 w-4 text-purple-500" />
        Top Contributor
      </GlassBadge>
      <GlassBadge variant="success" className="px-4 py-2">
        <CheckCircle className="mr-1 inline h-4 w-4" />
        Verified
      </GlassBadge>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <GlassBadge className="text-xs">Extra Small</GlassBadge>
        <GlassBadge className="text-sm">Small</GlassBadge>
        <GlassBadge>Default</GlassBadge>
        <GlassBadge className="px-4 py-2 text-lg">Large</GlassBadge>
      </div>
      <div className="flex flex-wrap gap-2">
        <GlassBadge className="font-bold">Bold</GlassBadge>
        <GlassBadge className="italic">Italic</GlassBadge>
        <GlassBadge className="uppercase">Uppercase</GlassBadge>
        <GlassBadge className="tracking-wider">Wide Tracking</GlassBadge>
      </div>
      <div className="flex flex-wrap gap-2">
        <GlassBadge className="border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          Gradient
        </GlassBadge>
        <GlassBadge className="shadow-lg shadow-white/20">
          With Shadow
        </GlassBadge>
        <GlassBadge className="animate-pulse">Animated</GlassBadge>
      </div>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      {/* User card */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-white">John Doe</h3>
          <div className="flex gap-2">
            <GlassBadge variant="success">Pro</GlassBadge>
            <GlassBadge>Admin</GlassBadge>
          </div>
        </div>
        <p className="mb-3 text-sm text-white/60">Senior Software Engineer</p>
        <div className="flex flex-wrap gap-2">
          <GlassBadge className="text-xs">React</GlassBadge>
          <GlassBadge className="text-xs">TypeScript</GlassBadge>
          <GlassBadge className="text-xs">Node.js</GlassBadge>
        </div>
      </div>

      {/* Product card */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white">Premium Package</h3>
            <p className="mt-1 font-bold text-2xl text-white">$99/mo</p>
          </div>
          <div className="flex flex-col gap-2">
            <GlassBadge variant="warning">Limited Time</GlassBadge>
            <GlassBadge variant="success">Best Value</GlassBadge>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <GlassBadge className="text-xs">Save 20%</GlassBadge>
          <GlassBadge className="text-xs">Most Popular</GlassBadge>
        </div>
      </div>

      {/* Task list */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <h3 className="mb-3 font-semibold text-white">Tasks</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Fix navigation bug</span>
            <GlassBadge variant="error">Critical</GlassBadge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Update documentation</span>
            <GlassBadge variant="warning">High</GlassBadge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80">Refactor auth module</span>
            <GlassBadge>Medium</GlassBadge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/80 line-through">
              Deploy to staging
            </span>
            <GlassBadge variant="success">Done</GlassBadge>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg bg-white/10 p-6">
        <h3 className="mb-4 font-semibold text-lg text-white">
          Light Background
        </h3>
        <div className="flex flex-wrap gap-2">
          <GlassBadge variant="default">Default</GlassBadge>
          <GlassBadge variant="success">Success</GlassBadge>
          <GlassBadge variant="warning">Warning</GlassBadge>
          <GlassBadge variant="error">Error</GlassBadge>
        </div>
      </div>

      <div className="rounded-lg bg-black/30 p-6">
        <h3 className="mb-4 font-semibold text-lg text-white">
          Dark Background
        </h3>
        <div className="flex flex-wrap gap-2">
          <GlassBadge variant="default">Default</GlassBadge>
          <GlassBadge variant="success">Success</GlassBadge>
          <GlassBadge variant="warning">Warning</GlassBadge>
          <GlassBadge variant="error">Error</GlassBadge>
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

// Accessibility
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <p className="text-sm text-white/60">
        Badges should be used for supplementary information. Important status
        should also be conveyed through text or other means.
      </p>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-white">Order #12345</span>
          <GlassBadge variant="success" aria-label="Order delivered">
            Delivered
          </GlassBadge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white">Payment Status:</span>
          <GlassBadge variant="warning">Processing</GlassBadge>
          <span className="text-sm text-white/60">(Expected: 2-3 days)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white">Account Type:</span>
          <GlassBadge aria-describedby="premium-description">
            Premium
          </GlassBadge>
        </div>
        <p id="premium-description" className="ml-4 text-white/60 text-xs">
          Premium accounts have access to all features and priority support.
        </p>
      </div>
    </div>
  ),
};
