import type { Meta, StoryObj } from '@storybook/react';
import { GlassAvatar } from './glass-avatar';

const meta: Meta<typeof GlassAvatar> = {
  title: 'Glass/GlassAvatar',
  component: GlassAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User Avatar',
    size: 'md',
  },
};

export const WithFallback: Story = {
  args: {
    alt: 'John Doe',
    fallback: 'JD',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Small Avatar"
        size="sm"
      />
      <GlassAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Medium Avatar"
        size="md"
      />
      <GlassAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Large Avatar"
        size="lg"
      />
      <GlassAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Extra Large Avatar"
        size="xl"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Default Avatar"
        variant="default"
      />
      <GlassAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Outline Avatar"
        variant="outline"
      />
    </div>
  ),
};
