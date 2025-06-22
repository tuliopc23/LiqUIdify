import type { Meta, StoryObj } from '@storybook/react';
import { GlassBadge } from './glass-badge';

const meta: Meta<typeof GlassBadge> = {
  title: 'Glass/GlassBadge',
  component: GlassBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassBadge Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassBadge',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassBadge size="sm">Small</GlassBadge>
      <GlassBadge size="md">Medium</GlassBadge>
      <GlassBadge size="lg">Large</GlassBadge>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassBadge>Normal</GlassBadge>
        <GlassBadge disabled>Disabled</GlassBadge>
      </div>
    </div>
  ),
};
