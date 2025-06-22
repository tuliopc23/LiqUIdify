import type { Meta, StoryObj } from '@storybook/react';
import { UthemeUprovider } from './theme-provider.tsx';

const meta: Meta<typeof UthemeUprovider> = {
  title: 'Glass/UthemeUprovider',
  component: UthemeUprovider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'UthemeUprovider Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary UthemeUprovider',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UthemeUprovider size="sm">Small</UthemeUprovider>
      <UthemeUprovider size="md">Medium</UthemeUprovider>
      <UthemeUprovider size="lg">Large</UthemeUprovider>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <UthemeUprovider>Normal</UthemeUprovider>
        <UthemeUprovider disabled>Disabled</UthemeUprovider>
      </div>
    </div>
  ),
};
