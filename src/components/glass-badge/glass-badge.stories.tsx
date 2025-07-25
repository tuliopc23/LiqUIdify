import type { Meta, StoryObj } from '@storybook/react';
import { Award, Star, Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import React from 'react';
import { GlassBadge } from './glass-badge';

const meta = {
  title: 'Components/Display/GlassBadge',
  component: GlassBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A lightweight badge component for displaying labels, status indicators, and small pieces of information with glassmorphism styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Visual style variant of the badge',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof GlassBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
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
    <div className="flex items-center gap-4 flex-wrap">
      <GlassBadge variant="default">
        <Info className="w-3 h-3 mr-1 inline" />
        Info
      </GlassBadge>
      <GlassBadge variant="success">
        <CheckCircle className="w-3 h-3 mr-1 inline" />
        Completed
      </GlassBadge>
      <GlassBadge variant="warning">
        <AlertCircle className="w-3 h-3 mr-1 inline" />
        Pending
      </GlassBadge>
      <GlassBadge variant="error">
        <XCircle className="w-3 h-3 mr-1 inline" />
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
        <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
          Notifications
        </button>
        <GlassBadge className="absolute -top-2 -right-2" variant="error">
          3
        </GlassBadge>
      </div>
      <div className="relative">
        <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
          Messages
        </button>
        <GlassBadge className="absolute -top-2 -right-2" variant="default">
          12
        </GlassBadge>
      </div>
      <div className="relative">
        <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
          Updates
        </button>
        <GlassBadge className="absolute -top-2 -right-2" variant="success">
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
        <h4 className="text-sm font-semibold mb-2 text-white/80">Categories</h4>
        <div className="flex gap-2 flex-wrap">
          <GlassBadge>Technology</GlassBadge>
          <GlassBadge>Design</GlassBadge>
          <GlassBadge>Business</GlassBadge>
          <GlassBadge>Marketing</GlassBadge>
          <GlassBadge>Development</GlassBadge>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2 text-white/80">Skills</h4>
        <div className="flex gap-2 flex-wrap">
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
    <div className="flex items-center gap-4 flex-wrap">
      <GlassBadge className="px-4 py-2">
        <Award className="w-4 h-4 mr-1 inline text-yellow-500" />
        Gold Member
      </GlassBadge>
      <GlassBadge className="px-4 py-2">
        <Star className="w-4 h-4 mr-1 inline text-purple-500" />
        Top Contributor
      </GlassBadge>
      <GlassBadge variant="success" className="px-4 py-2">
        <CheckCircle className="w-4 h-4 mr-1 inline" />
        Verified
      </GlassBadge>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <GlassBadge className="text-xs">Extra Small</GlassBadge>
        <GlassBadge className="text-sm">Small</GlassBadge>
        <GlassBadge>Default</GlassBadge>
        <GlassBadge className="text-lg px-4 py-2">Large</GlassBadge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <GlassBadge className="font-bold">Bold</GlassBadge>
        <GlassBadge className="italic">Italic</GlassBadge>
        <GlassBadge className="uppercase">Uppercase</GlassBadge>
        <GlassBadge className="tracking-wider">Wide Tracking</GlassBadge>
      </div>
      <div className="flex gap-2 flex-wrap">
        <GlassBadge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
          Gradient
        </GlassBadge>
        <GlassBadge className="shadow-lg shadow-white/20">
          With Shadow
        </GlassBadge>
        <GlassBadge className="animate-pulse">
          Animated
        </GlassBadge>
      </div>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      {/* User card */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">John Doe</h3>
          <div className="flex gap-2">
            <GlassBadge variant="success">Pro</GlassBadge>
            <GlassBadge>Admin</GlassBadge>
          </div>
        </div>
        <p className="text-sm text-white/60 mb-3">Senior Software Engineer</p>
        <div className="flex gap-2 flex-wrap">
          <GlassBadge className="text-xs">React</GlassBadge>
          <GlassBadge className="text-xs">TypeScript</GlassBadge>
          <GlassBadge className="text-xs">Node.js</GlassBadge>
        </div>
      </div>

      {/* Product card */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-white">Premium Package</h3>
            <p className="text-2xl font-bold text-white mt-1">$99/mo</p>
          </div>
          <div className="flex flex-col gap-2">
            <GlassBadge variant="warning">Limited Time</GlassBadge>
            <GlassBadge variant="success">Best Value</GlassBadge>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <GlassBadge className="text-xs">Save 20%</GlassBadge>
          <GlassBadge className="text-xs">Most Popular</GlassBadge>
        </div>
      </div>

      {/* Task list */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <h3 className="font-semibold text-white mb-3">Tasks</h3>
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
            <span className="text-sm text-white/80 line-through">Deploy to staging</span>
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
      <div className="p-6 rounded-lg bg-white/10">
        <h3 className="text-lg font-semibold mb-4 text-white">Light Background</h3>
        <div className="flex gap-2 flex-wrap">
          <GlassBadge variant="default">Default</GlassBadge>
          <GlassBadge variant="success">Success</GlassBadge>
          <GlassBadge variant="warning">Warning</GlassBadge>
          <GlassBadge variant="error">Error</GlassBadge>
        </div>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold mb-4 text-white">Dark Background</h3>
        <div className="flex gap-2 flex-wrap">
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
      default: 'liquid-gradient',
    },
  },
};

// Accessibility
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <p className="text-sm text-white/60">
        Badges should be used for supplementary information. Important status should also be conveyed through text or other means.
      </p>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-white">Order #12345</span>
          <GlassBadge variant="success" role="status" aria-label="Order delivered">
            Delivered
          </GlassBadge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white">Payment Status:</span>
          <GlassBadge variant="warning" role="status">
            Processing
          </GlassBadge>
          <span className="text-sm text-white/60">(Expected: 2-3 days)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white">Account Type:</span>
          <GlassBadge aria-describedby="premium-description">
            Premium
          </GlassBadge>
        </div>
        <p id="premium-description" className="text-xs text-white/60 ml-4">
          Premium accounts have access to all features and priority support.
        </p>
      </div>
    </div>
  ),
};