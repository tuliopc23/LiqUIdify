import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassTooltip } from './glass-tooltip';

const meta: Meta<typeof GlassTooltip> = {
  title: 'Glass/GlassTooltip',
  component: GlassTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassTooltip Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassTooltip',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassTooltip size="sm">Small</GlassTooltip>
      <GlassTooltip size="md">Medium</GlassTooltip>
      <GlassTooltip size="lg">Large</GlassTooltip>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassTooltip>Normal</GlassTooltip>
        <GlassTooltip disabled>Disabled</GlassTooltip>
      </div>
    </div>
  ),
};
