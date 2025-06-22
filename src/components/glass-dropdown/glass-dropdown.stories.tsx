import type { Meta, StoryObj } from '@storybook/react';
import { GlassDropdown } from './glass-dropdown';

const meta: Meta<typeof GlassDropdown> = {
  title: 'Glass/GlassDropdown',
  component: GlassDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassDropdown Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassDropdown',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassDropdown size="sm">Small</GlassDropdown>
      <GlassDropdown size="md">Medium</GlassDropdown>
      <GlassDropdown size="lg">Large</GlassDropdown>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassDropdown>Normal</GlassDropdown>
        <GlassDropdown disabled>Disabled</GlassDropdown>
      </div>
    </div>
  ),
};
