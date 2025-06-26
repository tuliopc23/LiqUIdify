import type { Meta, StoryObj } from '@storybook/react';
import { GlassPopover } from './glass-popover';

const meta: Meta<typeof GlassPopover> = {
  title: 'Glass/GlassPopover',
  component: GlassPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassPopover Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassPopover',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassPopover size="sm">Small</GlassPopover>
      <GlassPopover size="md">Medium</GlassPopover>
      <GlassPopover size="lg">Large</GlassPopover>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassPopover>Normal</GlassPopover>
        <GlassPopover disabled>Disabled</GlassPopover>
      </div>
    </div>
  ),
};
