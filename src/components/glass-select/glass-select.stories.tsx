import type { Meta, StoryObj } from '@storybook/react';
import { GlassSelect } from './glass-select';

const meta: Meta<typeof GlassSelect> = {
  title: 'Glass/GlassSelect',
  component: GlassSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassSelect Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassSelect',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassSelect size="sm">Small</GlassSelect>
      <GlassSelect size="md">Medium</GlassSelect>
      <GlassSelect size="lg">Large</GlassSelect>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassSelect>Normal</GlassSelect>
        <GlassSelect disabled>Disabled</GlassSelect>
      </div>
    </div>
  ),
};
