import type { Meta, StoryObj } from '@storybook/react';
import { GlassChart } from './glass-chart';

const meta: Meta<typeof GlassChart> = {
  title: 'Glass/GlassChart',
  component: GlassChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassChart Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassChart',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassChart size="sm">Small</GlassChart>
      <GlassChart size="md">Medium</GlassChart>
      <GlassChart size="lg">Large</GlassChart>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassChart>Normal</GlassChart>
        <GlassChart disabled>Disabled</GlassChart>
      </div>
    </div>
  ),
};
