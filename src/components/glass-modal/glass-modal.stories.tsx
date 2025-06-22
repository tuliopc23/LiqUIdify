import type { Meta, StoryObj } from '@storybook/react';
import { GlassModal } from './glass-modal';

const meta: Meta<typeof GlassModal> = {
  title: 'Glass/GlassModal',
  component: GlassModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassModal Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassModal',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassModal size="sm">Small</GlassModal>
      <GlassModal size="md">Medium</GlassModal>
      <GlassModal size="lg">Large</GlassModal>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassModal>Normal</GlassModal>
        <GlassModal disabled>Disabled</GlassModal>
      </div>
    </div>
  ),
};
