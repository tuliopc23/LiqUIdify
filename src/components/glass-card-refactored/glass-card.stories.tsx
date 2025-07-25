import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassCard } from './glass-card';
import { GlassButton } from '../glass-button-refactored';
import { Heart, Share2, MessageCircle } from 'lucide-react';

const meta = {
  title: 'Components/Layout/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component with glassmorphism design, supporting compound components for flexible layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outlined'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card size',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove all padding',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
} satisfies Meta<typeof GlassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    children: (
      <>
        <GlassCard.Header>
          <GlassCard.Title>Card Title</GlassCard.Title>
          <GlassCard.Description>This is a basic card with header and content.</GlassCard.Description>
        </GlassCard.Header>
        <GlassCard.Content>
          <p>Card content goes here. You can put any content inside the card.</p>
        </GlassCard.Content>
      </>
    ),
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <GlassCard variant="default">
        <GlassCard.Header>
          <GlassCard.Title>Default</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-sm">Standard glass effect with default opacity.</p>
        </GlassCard.Content>
      </GlassCard>

      <GlassCard variant="secondary">
        <GlassCard.Header>
          <GlassCard.Title>Secondary</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-sm">Lighter glass effect for nested content.</p>
        </GlassCard.Content>
      </GlassCard>

      <GlassCard variant="outlined">
        <GlassCard.Header>
          <GlassCard.Title>Outlined</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-sm">Minimal style with border emphasis.</p>
        </GlassCard.Content>
      </GlassCard>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <GlassCard size="sm">
        <GlassCard.Header>
          <GlassCard.Title>Small Card</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-sm">Compact size for minimal content.</p>
        </GlassCard.Content>
      </GlassCard>

      <GlassCard size="md">
        <GlassCard.Header>
          <GlassCard.Title>Medium Card</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p>Default size suitable for most use cases.</p>
        </GlassCard.Content>
      </GlassCard>

      <GlassCard size="lg">
        <GlassCard.Header>
          <GlassCard.Title>Large Card</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-lg">Spacious card for prominent content display.</p>
        </GlassCard.Content>
      </GlassCard>
    </div>
  ),
};

// Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <GlassCard hoverable>
        <GlassCard.Header>
          <GlassCard.Title>Hoverable Card</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-sm mb-4">Hover over this card to see the effect.</p>
          <GlassButton size="sm">Action</GlassButton>
        </GlassCard.Content>
      </GlassCard>

      <GlassCard interactive selectable>
        <GlassCard.Header>
          <GlassCard.Title>Selectable Card</GlassCard.Title>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-sm mb-4">Click this card to select it.</p>
          <div className="flex gap-2">
            <GlassButton size="sm" variant="ghost">
              <Heart className="h-4 w-4" />
            </GlassButton>
            <GlassButton size="sm" variant="ghost">
              <Share2 className="h-4 w-4" />
            </GlassButton>
          </div>
        </GlassCard.Content>
      </GlassCard>
    </div>
  ),
};

// Complex Layouts
export const ComplexLayouts: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      {/* Card with Image */}
      <GlassCard noPadding className="overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600" />
        <GlassCard.Header>
          <GlassCard.Title>Media Card</GlassCard.Title>
          <GlassCard.Description>Card with hero image</GlassCard.Description>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="text-sm">This card demonstrates the noPadding prop for custom layouts.</p>
        </GlassCard.Content>
        <GlassCard.Footer>
          <GlassButton size="sm" fullWidth>
            View Details
          </GlassButton>
        </GlassCard.Footer>
      </GlassCard>

      {/* Card with Actions */}
      <GlassCard>
        <GlassCard.Header>
          <div className="flex items-start justify-between">
            <div>
              <GlassCard.Title>Interactive Content</GlassCard.Title>
              <GlassCard.Description>Posted 2 hours ago</GlassCard.Description>
            </div>
            <GlassButton size="sm" variant="ghost">
              <Share2 className="h-4 w-4" />
            </GlassButton>
          </div>
        </GlassCard.Header>
        <GlassCard.Content>
          <p className="mb-4">
            This card shows how to combine multiple elements for rich interactions.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span>24</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>12</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </GlassCard.Content>
      </GlassCard>
    </div>
  ),
};

// Theme Showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Light Theme</h3>
        <div className="p-4 rounded-lg bg-white/50">
          <GlassCard>
            <GlassCard.Header>
              <GlassCard.Title>Light Glass Card</GlassCard.Title>
              <GlassCard.Description>Subtle glass effect on light backgrounds</GlassCard.Description>
            </GlassCard.Header>
            <GlassCard.Content>
              <p className="text-sm">The glass effect adapts to the theme for optimal visibility.</p>
            </GlassCard.Content>
          </GlassCard>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Theme</h3>
        <div className="p-4 rounded-lg bg-black/50">
          <GlassCard>
            <GlassCard.Header>
              <GlassCard.Title>Dark Glass Card</GlassCard.Title>
              <GlassCard.Description>Enhanced glass effect on dark backgrounds</GlassCard.Description>
            </GlassCard.Header>
            <GlassCard.Content>
              <p className="text-sm">The glass effect creates depth and hierarchy in dark mode.</p>
            </GlassCard.Content>
          </GlassCard>
        </div>
      </div>
    </div>
  ),
};

// Nested Cards
export const NestedCards: Story = {
  render: () => (
    <GlassCard size="lg" className="w-full max-w-2xl">
      <GlassCard.Header>
        <GlassCard.Title>Parent Card</GlassCard.Title>
        <GlassCard.Description>Cards can be nested for complex layouts</GlassCard.Description>
      </GlassCard.Header>
      <GlassCard.Content className="space-y-4">
        <p>This is the parent card content with nested cards below:</p>
        
        <div className="grid grid-cols-2 gap-4">
          <GlassCard variant="secondary" size="sm">
            <GlassCard.Header>
              <GlassCard.Title>Nested Card 1</GlassCard.Title>
            </GlassCard.Header>
            <GlassCard.Content>
              <p className="text-sm">Secondary variant for visual hierarchy</p>
            </GlassCard.Content>
          </GlassCard>

          <GlassCard variant="secondary" size="sm">
            <GlassCard.Header>
              <GlassCard.Title>Nested Card 2</GlassCard.Title>
            </GlassCard.Header>
            <GlassCard.Content>
              <p className="text-sm">Maintains glass effect consistency</p>
            </GlassCard.Content>
          </GlassCard>
        </div>
      </GlassCard.Content>
    </GlassCard>
  ),
};

// Loading State
export const LoadingState: Story = {
  render: () => (
    <GlassCard className="w-full max-w-md">
      <GlassCard.Header>
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
      </GlassCard.Header>
      <GlassCard.Content>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6" />
        </div>
      </GlassCard.Content>
    </GlassCard>
  ),
};