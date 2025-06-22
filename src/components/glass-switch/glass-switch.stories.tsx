import type { Meta, StoryObj } from '@storybook/react';
import { GlassSwitch } from './glass-switch';

const meta: Meta<typeof GlassSwitch> = {
  title: 'Glass/GlassSwitch',
  component: GlassSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassSwitch Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassSwitch',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassSwitch size="sm">Small</GlassSwitch>
      <GlassSwitch size="md">Medium</GlassSwitch>
      <GlassSwitch size="lg">Large</GlassSwitch>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassSwitch>Normal</GlassSwitch>
        <GlassSwitch disabled>Disabled</GlassSwitch>
      </div>
    </div>
  ),
};
