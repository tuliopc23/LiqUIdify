import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassResponsiveButton } from './glass-responsive-button';

const meta: Meta<typeof GlassResponsiveButton> = {
  title: 'Glass/GlassResponsiveButton',
  component: GlassResponsiveButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassResponsiveButton Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassResponsiveButton',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassResponsiveButton size="sm">Small</GlassResponsiveButton>
      <GlassResponsiveButton size="md">Medium</GlassResponsiveButton>
      <GlassResponsiveButton size="lg">Large</GlassResponsiveButton>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassResponsiveButton>Normal</GlassResponsiveButton>
        <GlassResponsiveButton disabled>Disabled</GlassResponsiveButton>
      </div>
    </div>
  ),
};
