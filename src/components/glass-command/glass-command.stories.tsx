import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette } from './glass-command';

const meta: Meta<typeof CommandPalette> = {
  title: 'Glass/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'CommandPalette Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary CommandPalette',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CommandPalette size="sm">Small</CommandPalette>
      <CommandPalette size="md">Medium</CommandPalette>
      <CommandPalette size="lg">Large</CommandPalette>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <CommandPalette>Normal</CommandPalette>
        <CommandPalette disabled>Disabled</CommandPalette>
      </div>
    </div>
  ),
};
