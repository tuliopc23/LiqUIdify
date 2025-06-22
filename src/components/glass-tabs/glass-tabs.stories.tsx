import type { Meta, StoryObj } from '@storybook/react';
import { GlassTabs } from './glass-tabs';

const meta: Meta<typeof GlassTabs> = {
  title: 'Glass/GlassTabs',
  component: GlassTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassTabs Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassTabs',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassTabs size="sm">Small</GlassTabs>
      <GlassTabs size="md">Medium</GlassTabs>
      <GlassTabs size="lg">Large</GlassTabs>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassTabs>Normal</GlassTabs>
        <GlassTabs disabled>Disabled</GlassTabs>
      </div>
    </div>
  ),
};
