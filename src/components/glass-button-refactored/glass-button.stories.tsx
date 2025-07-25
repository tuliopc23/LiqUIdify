import type { Meta, StoryObj } from '@storybook/react';
import { Mail, ChevronRight, Download, Heart, Share2, Settings } from 'lucide-react';
import React from 'react';
import { GlassButton } from './glass-button';

const meta = {
  title: 'Components/Forms/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with glassmorphism design, fluid animations, and comprehensive accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'primary', 'danger'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state with spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes button take full width of container',
    },
    asChild: {
      control: 'boolean',
      description: 'Renders as child component (useful for links)',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
} satisfies Meta<typeof GlassButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Action',
    variant: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassButton>Normal</GlassButton>
        <GlassButton disabled>Disabled</GlassButton>
        <GlassButton loading>Loading</GlassButton>
      </div>
      <div className="flex items-center gap-4">
        <GlassButton variant="primary">Normal</GlassButton>
        <GlassButton variant="primary" disabled>Disabled</GlassButton>
        <GlassButton variant="primary" loading>Loading</GlassButton>
      </div>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <GlassButton>
        <Mail className="mr-2 h-4 w-4" />
        Email
      </GlassButton>
      <GlassButton variant="primary">
        Continue
        <ChevronRight className="ml-2 h-4 w-4" />
      </GlassButton>
      <GlassButton variant="ghost">
        <Download className="mr-2 h-4 w-4" />
        Download
      </GlassButton>
    </div>
  ),
};

// Icon Only Buttons
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassButton size="sm" aria-label="Like">
        <Heart className="h-4 w-4" />
      </GlassButton>
      <GlassButton size="md" aria-label="Share">
        <Share2 className="h-4 w-4" />
      </GlassButton>
      <GlassButton size="lg" variant="ghost" aria-label="Settings">
        <Settings className="h-5 w-5" />
      </GlassButton>
    </div>
  ),
};

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <GlassButton fullWidth>Full Width Default</GlassButton>
      <GlassButton fullWidth variant="primary">Full Width Primary</GlassButton>
      <GlassButton fullWidth variant="ghost">Full Width Ghost</GlassButton>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <GlassButton loading size="sm">Small</GlassButton>
      <GlassButton loading size="md">Medium</GlassButton>
      <GlassButton loading size="lg">Large</GlassButton>
      <GlassButton loading variant="primary">Primary</GlassButton>
      <GlassButton loading variant="danger">Danger</GlassButton>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const handleClick = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCount(c => c + 1);
      setLoading(false);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg">Button clicked: {count} times</p>
        <GlassButton 
          onClick={handleClick} 
          loading={loading}
          variant="primary"
        >
          {loading ? 'Processing...' : 'Click me!'}
        </GlassButton>
      </div>
    );
  },
};

// Theme Showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Light Theme</h3>
        <div className="flex items-center gap-4 flex-wrap p-4 rounded-lg bg-white/50">
          <GlassButton>Default</GlassButton>
          <GlassButton variant="primary">Primary</GlassButton>
          <GlassButton variant="ghost">Ghost</GlassButton>
          <GlassButton variant="danger">Danger</GlassButton>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dark Theme</h3>
        <div className="flex items-center gap-4 flex-wrap p-4 rounded-lg bg-black/50">
          <GlassButton>Default</GlassButton>
          <GlassButton variant="primary">Primary</GlassButton>
          <GlassButton variant="ghost">Ghost</GlassButton>
          <GlassButton variant="danger">Danger</GlassButton>
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

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        All buttons include proper ARIA labels, keyboard navigation, and focus management.
      </p>
      <div className="space-y-4">
        <GlassButton aria-label="Save document" title="Save your changes">
          Save
        </GlassButton>
        <GlassButton aria-describedby="delete-description" variant="danger">
          Delete
        </GlassButton>
        <p id="delete-description" className="text-sm text-gray-600 dark:text-gray-400">
          This action cannot be undone.
        </p>
        <GlassButton disabled aria-disabled="true">
          Disabled Button
        </GlassButton>
      </div>
    </div>
  ),
};