import type { Meta, StoryObj } from '@storybook/react';
import { GlassResponsiveCard } from './glass-responsive-card';

const meta: Meta<typeof GlassResponsiveCard> = {
  title: 'Glass/GlassResponsiveCard',
  component: GlassResponsiveCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassResponsiveCard Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassResponsiveCard',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassResponsiveCard size="sm">Small</GlassResponsiveCard>
      <GlassResponsiveCard size="md">Medium</GlassResponsiveCard>
      <GlassResponsiveCard size="lg">Large</GlassResponsiveCard>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassResponsiveCard>Normal</GlassResponsiveCard>
        <GlassResponsiveCard disabled>Disabled</GlassResponsiveCard>
      </div>
    </div>
  ),
};
