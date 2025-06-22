import type { Meta, StoryObj } from '@storybook/react';
import { GlassCheckbox } from './glass-checkbox';

const meta: Meta<typeof GlassCheckbox> = {
  title: 'Glass/GlassCheckbox',
  component: GlassCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassCheckbox Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassCheckbox',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassCheckbox size="sm">Small</GlassCheckbox>
      <GlassCheckbox size="md">Medium</GlassCheckbox>
      <GlassCheckbox size="lg">Large</GlassCheckbox>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassCheckbox>Normal</GlassCheckbox>
        <GlassCheckbox disabled>Disabled</GlassCheckbox>
      </div>
    </div>
  ),
};
