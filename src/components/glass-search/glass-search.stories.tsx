import type { Meta, StoryObj } from '@storybook/react';
import { GlassSearch } from './glass-search';

const meta: Meta<typeof GlassSearch> = {
  title: 'Glass/GlassSearch',
  component: GlassSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassSearch Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassSearch',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassSearch size="sm">Small</GlassSearch>
      <GlassSearch size="md">Medium</GlassSearch>
      <GlassSearch size="lg">Large</GlassSearch>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassSearch>Normal</GlassSearch>
        <GlassSearch disabled>Disabled</GlassSearch>
      </div>
    </div>
  ),
};
