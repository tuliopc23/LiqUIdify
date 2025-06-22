import type { Meta, StoryObj } from '@storybook/react';
import { GlassTextarea } from './glass-textarea';

const meta: Meta<typeof GlassTextarea> = {
  title: 'Glass/GlassTextarea',
  component: GlassTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassTextarea Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassTextarea',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassTextarea size="sm">Small</GlassTextarea>
      <GlassTextarea size="md">Medium</GlassTextarea>
      <GlassTextarea size="lg">Large</GlassTextarea>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassTextarea>Normal</GlassTextarea>
        <GlassTextarea disabled>Disabled</GlassTextarea>
      </div>
    </div>
  ),
};
