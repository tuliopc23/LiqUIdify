import type { Meta, StoryObj } from '@storybook/react';
import { GlassSlider } from './glass-slider';

const meta: Meta<typeof GlassSlider> = {
  title: 'Glass/GlassSlider',
  component: GlassSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassSlider Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassSlider',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassSlider size="sm">Small</GlassSlider>
      <GlassSlider size="md">Medium</GlassSlider>
      <GlassSlider size="lg">Large</GlassSlider>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassSlider>Normal</GlassSlider>
        <GlassSlider disabled>Disabled</GlassSlider>
      </div>
    </div>
  ),
};
