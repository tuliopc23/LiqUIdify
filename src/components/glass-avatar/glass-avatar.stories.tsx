import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassAvatar } from './glass-avatar';

const meta = {
  title: 'Components/Display/GlassAvatar',
  component: GlassAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile avatar component supporting images, initials, and fallback icons with glassmorphism styling. Includes status indicators and multiple size/shape variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL for the avatar',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the avatar image',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'Shape variant of the avatar',
    },
    fallback: {
      control: 'text',
      description: 'Fallback text for initials when no image is provided',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show glassmorphism border around the avatar',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
      description: 'Status indicator for the avatar',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof GlassAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage with image
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
    size: 'md',
  },
};

// Fallback to initials
export const WithInitials: Story = {
  args: {
    fallback: 'John Doe',
    size: 'md',
  },
};

// Default icon fallback
export const DefaultFallback: Story = {
  args: {
    size: 'md',
  },
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="text-center">
        <GlassAvatar size="xs" src="https://i.pravatar.cc/150?img=2" />
        <p className="text-xs mt-2 text-white/60">xs</p>
      </div>
      <div className="text-center">
        <GlassAvatar size="sm" src="https://i.pravatar.cc/150?img=3" />
        <p className="text-xs mt-2 text-white/60">sm</p>
      </div>
      <div className="text-center">
        <GlassAvatar size="md" src="https://i.pravatar.cc/150?img=4" />
        <p className="text-xs mt-2 text-white/60">md</p>
      </div>
      <div className="text-center">
        <GlassAvatar size="lg" src="https://i.pravatar.cc/150?img=5" />
        <p className="text-xs mt-2 text-white/60">lg</p>
      </div>
      <div className="text-center">
        <GlassAvatar size="xl" src="https://i.pravatar.cc/150?img=6" />
        <p className="text-xs mt-2 text-white/60">xl</p>
      </div>
      <div className="text-center">
        <GlassAvatar size="2xl" src="https://i.pravatar.cc/150?img=7" />
        <p className="text-xs mt-2 text-white/60">2xl</p>
      </div>
    </div>
  ),
};

// Shape variants
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <GlassAvatar variant="circular" src="https://i.pravatar.cc/150?img=8" size="lg" />
        <p className="text-sm mt-2 text-white/60">Circular</p>
      </div>
      <div className="text-center">
        <GlassAvatar variant="rounded" src="https://i.pravatar.cc/150?img=9" size="lg" />
        <p className="text-sm mt-2 text-white/60">Rounded</p>
      </div>
      <div className="text-center">
        <GlassAvatar variant="square" src="https://i.pravatar.cc/150?img=10" size="lg" />
        <p className="text-sm mt-2 text-white/60">Square</p>
      </div>
    </div>
  ),
};

// With borders
export const WithBorders: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassAvatar showBorder src="https://i.pravatar.cc/150?img=11" size="md" />
      <GlassAvatar showBorder fallback="Jane Smith" size="md" />
      <GlassAvatar showBorder size="md" />
    </div>
  ),
};

// Status indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <GlassAvatar status="online" src="https://i.pravatar.cc/150?img=12" size="lg" />
          <p className="text-sm mt-2 text-white/60">Online</p>
        </div>
        <div className="text-center">
          <GlassAvatar status="away" src="https://i.pravatar.cc/150?img=13" size="lg" />
          <p className="text-sm mt-2 text-white/60">Away</p>
        </div>
        <div className="text-center">
          <GlassAvatar status="busy" src="https://i.pravatar.cc/150?img=14" size="lg" />
          <p className="text-sm mt-2 text-white/60">Busy</p>
        </div>
        <div className="text-center">
          <GlassAvatar status="offline" src="https://i.pravatar.cc/150?img=15" size="lg" />
          <p className="text-sm mt-2 text-white/60">Offline</p>
        </div>
      </div>
      
      {/* Different sizes with status */}
      <div className="flex items-center gap-4">
        <GlassAvatar status="online" size="xs" fallback="XS" />
        <GlassAvatar status="online" size="sm" fallback="SM" />
        <GlassAvatar status="online" size="md" fallback="MD" />
        <GlassAvatar status="online" size="lg" fallback="LG" />
        <GlassAvatar status="online" size="xl" fallback="XL" />
        <GlassAvatar status="online" size="2xl" fallback="2XL" />
      </div>
    </div>
  ),
};

// Fallback examples
export const FallbackExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <GlassAvatar fallback="John Doe" size="lg" />
        <GlassAvatar fallback="Alice Brown" size="lg" />
        <GlassAvatar fallback="Robert Johnson" size="lg" />
        <GlassAvatar fallback="Emma Wilson" size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <GlassAvatar fallback="X" size="lg" />
        <GlassAvatar fallback="AI" size="lg" />
        <GlassAvatar fallback="Bot" size="lg" />
        <GlassAvatar fallback="System Admin" size="lg" />
      </div>
    </div>
  ),
};

// Avatar groups
export const AvatarGroups: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3 text-white/80">Stacked avatars</h4>
        <div className="flex -space-x-3">
          <GlassAvatar src="https://i.pravatar.cc/150?img=16" size="md" showBorder className="z-40" />
          <GlassAvatar src="https://i.pravatar.cc/150?img=17" size="md" showBorder className="z-30" />
          <GlassAvatar src="https://i.pravatar.cc/150?img=18" size="md" showBorder className="z-20" />
          <GlassAvatar src="https://i.pravatar.cc/150?img=19" size="md" showBorder className="z-10" />
          <GlassAvatar fallback="+5" size="md" showBorder className="z-0 bg-gray-600" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3 text-white/80">Team members</h4>
        <div className="flex gap-2">
          <GlassAvatar src="https://i.pravatar.cc/150?img=20" size="sm" status="online" />
          <GlassAvatar src="https://i.pravatar.cc/150?img=21" size="sm" status="busy" />
          <GlassAvatar src="https://i.pravatar.cc/150?img=22" size="sm" status="away" />
          <GlassAvatar src="https://i.pravatar.cc/150?img=23" size="sm" status="offline" />
        </div>
      </div>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      {/* User profile card */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-4">
        <GlassAvatar src="https://i.pravatar.cc/150?img=24" size="xl" status="online" showBorder />
        <div className="flex-1">
          <h3 className="font-semibold text-white">Sarah Johnson</h3>
          <p className="text-sm text-white/60">Product Designer</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs text-white/40">sarah.johnson@company.com</span>
          </div>
        </div>
      </div>

      {/* Message list */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
        <h4 className="font-semibold text-white mb-3">Recent Messages</h4>
        <div className="flex items-start gap-3">
          <GlassAvatar src="https://i.pravatar.cc/150?img=25" size="sm" status="online" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">Mike Chen</span>
              <span className="text-xs text-white/40">2 min ago</span>
            </div>
            <p className="text-sm text-white/60">Hey, are you available for a quick call?</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <GlassAvatar fallback="Emma Davis" size="sm" status="away" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">Emma Davis</span>
              <span className="text-xs text-white/40">15 min ago</span>
            </div>
            <p className="text-sm text-white/60">I've updated the design files.</p>
          </div>
        </div>
      </div>

      {/* Comment section */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <h4 className="font-semibold text-white mb-3">Comments</h4>
        <div className="space-y-4">
          <div className="flex gap-3">
            <GlassAvatar src="https://i.pravatar.cc/150?img=26" size="sm" variant="rounded" />
            <div className="flex-1 space-y-1">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">Alex Turner</span>
                  <span className="text-xs text-white/40">1 hour ago</span>
                </div>
                <p className="text-sm text-white/80">Great work on this component! The glass effect looks amazing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Error handling
export const ErrorHandling: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold mb-3 text-white/80">Image load errors fallback to initials or icon</h4>
        <div className="flex items-center gap-4">
          <GlassAvatar src="https://invalid-url-that-will-fail.com/image.jpg" fallback="John Doe" size="lg" />
          <GlassAvatar src="https://invalid-url-that-will-fail.com/image.jpg" size="lg" />
        </div>
      </div>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <GlassAvatar 
        src="https://i.pravatar.cc/150?img=27" 
        size="lg"
        className="ring-2 ring-purple-500 ring-offset-2 ring-offset-black/20"
      />
      <GlassAvatar 
        fallback="GB" 
        size="lg"
        className="shadow-lg shadow-blue-500/50"
      />
      <GlassAvatar 
        src="https://i.pravatar.cc/150?img=28" 
        size="lg"
        variant="rounded"
        className="grayscale hover:grayscale-0 transition-all cursor-pointer"
      />
      <GlassAvatar 
        fallback="AI" 
        size="lg"
        className="animate-pulse"
      />
    </div>
  ),
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-6 rounded-lg bg-white/10">
        <h3 className="text-lg font-semibold mb-4 text-white">Light Background</h3>
        <div className="flex items-center gap-4">
          <GlassAvatar src="https://i.pravatar.cc/150?img=29" size="lg" showBorder />
          <GlassAvatar fallback="John Doe" size="lg" showBorder />
          <GlassAvatar size="lg" showBorder />
        </div>
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold mb-4 text-white">Dark Background</h3>
        <div className="flex items-center gap-4">
          <GlassAvatar src="https://i.pravatar.cc/150?img=30" size="lg" showBorder />
          <GlassAvatar fallback="Jane Smith" size="lg" showBorder />
          <GlassAvatar size="lg" showBorder />
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
        All avatars include proper alt text for screen readers. When used in interactive elements, ensure proper labeling.
      </p>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <GlassAvatar 
            src="https://i.pravatar.cc/150?img=31" 
            alt="Profile picture of Sarah Williams"
            size="md"
          />
          <span className="text-white">Sarah Williams (with alt text)</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10" aria-label="Open John Doe's profile">
            <GlassAvatar fallback="John Doe" size="md" />
            <span className="text-white">John Doe (clickable with aria-label)</span>
          </button>
        </div>
      </div>
    </div>
  ),
};