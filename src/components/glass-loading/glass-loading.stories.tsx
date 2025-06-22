import type { Meta, StoryObj } from '@storybook/react';
import { GlassLoading } from './glass-loading';

const meta: Meta<typeof GlassLoading> = {
  title: 'Glass/GlassLoading',
  component: GlassLoading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassLoading Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassLoading',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassLoading size="sm">Small</GlassLoading>
      <GlassLoading size="md">Medium</GlassLoading>
      <GlassLoading size="lg">Large</GlassLoading>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassLoading>Normal</GlassLoading>
        <GlassLoading disabled>Disabled</GlassLoading>
      </div>
    </div>
  ),
};
