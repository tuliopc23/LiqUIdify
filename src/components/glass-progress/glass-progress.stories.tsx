import type { Meta, StoryObj } from '@storybook/react';
import { GlassProgress } from './glass-progress';

const meta: Meta<typeof GlassProgress> = {
  title: 'Glass/GlassProgress',
  component: GlassProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassProgress Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassProgress',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassProgress size="sm">Small</GlassProgress>
      <GlassProgress size="md">Medium</GlassProgress>
      <GlassProgress size="lg">Large</GlassProgress>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassProgress>Normal</GlassProgress>
        <GlassProgress disabled>Disabled</GlassProgress>
      </div>
    </div>
  ),
};
