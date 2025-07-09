import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassButton } from './glass-button';
import { PlayIcon, PlusIcon, TrashIcon } from 'lucide-react';

const meta: Meta<typeof GlassButton> = {
  title: 'Glass/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Glass Button

A premium glass-effect button component with advanced visual effects including glass morphism, magnetic hover, and haptic feedback.

## Features

- ✨ **Glass Morphism**: Advanced backdrop blur and saturation effects
- 🧲 **Magnetic Hover**: Interactive magnetic attraction on hover
- 🎨 **Multiple Variants**: Primary, secondary, tertiary, ghost, and destructive styles
- 📱 **Responsive**: Five size options from extra small to extra large
- ♿ **Accessible**: Full WCAG compliance with focus states and ARIA attributes
- 🎭 **Loading States**: Built-in spinner with smooth transitions
- 🔧 **Flexible**: Support for left and right icons
- 🌙 **Dark Mode**: Automatic theme adaptation

## Usage

\`\`\`tsx
import { GlassButton } from '@liquidui/react'

function App() {
  return (
    <GlassButton variant="primary" size="md">
      Click me
    </GlassButton>
  )
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      description: 'Icon to display on the left side',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    rightIcon: {
      description: 'Icon to display on the right side',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Item',
    leftIcon: <TrashIcon />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassButton size="xs">Extra Small</GlassButton>
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
      <GlassButton size="xl">Extra Large</GlassButton>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassButton leftIcon={<PlayIcon />}>Play Video</GlassButton>
        <GlassButton rightIcon={<PlusIcon />}>Add Item</GlassButton>
        <GlassButton leftIcon={<PlayIcon />} rightIcon={<PlusIcon />}>
          Both Icons
        </GlassButton>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassButton>Normal</GlassButton>
        <GlassButton loading>Loading</GlassButton>
        <GlassButton disabled>Disabled</GlassButton>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassButton variant="primary">Primary</GlassButton>
        <GlassButton variant="secondary">Secondary</GlassButton>
        <GlassButton variant="tertiary">Tertiary</GlassButton>
        <GlassButton variant="ghost">Ghost</GlassButton>
        <GlassButton variant="destructive">Destructive</GlassButton>
      </div>
    </div>
  ),
};

// Comprehensive variant + size permutations
export const AllPermutations: Story = {
  render: () => (
    <div className="space-y-6">
      {['primary', 'secondary', 'tertiary', 'ghost', 'destructive'].map(
        variant => (
          <div key={variant} className="space-y-2">
            <h3 className="text-sm font-medium capitalize">{variant}</h3>
            <div className="flex items-center gap-4 flex-wrap">
              {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
                <GlassButton
                  key={`${variant}-${size}`}
                  variant={variant as any}
                  size={size as any}
                >
                  {variant} {size}
                </GlassButton>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  ),
};

// Theme comparison with decorators
export const ThemeComparison: Story = {
  decorators: [
    Story => (
      <div className="grid grid-cols-2 gap-8">
        <div data-theme="light" className="p-6 bg-white rounded-lg border">
          <h3 className="mb-4 text-sm font-medium">Light Theme</h3>
          <Story />
        </div>
        <div
          data-theme="dark"
          className="p-6 bg-gray-900 rounded-lg border border-gray-700"
        >
          <h3 className="mb-4 text-sm font-medium text-white">Dark Theme</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <GlassButton variant="primary">Primary</GlassButton>
        <GlassButton variant="secondary">Secondary</GlassButton>
        <GlassButton variant="tertiary">Tertiary</GlassButton>
      </div>
      <div className="flex items-center gap-4">
        <GlassButton variant="primary" leftIcon={<PlayIcon />}>
          With Icon
        </GlassButton>
        <GlassButton variant="secondary" loading>
          Loading
        </GlassButton>
        <GlassButton variant="tertiary" disabled>
          Disabled
        </GlassButton>
      </div>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  render: args => <GlassButton {...args} />,
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
};
