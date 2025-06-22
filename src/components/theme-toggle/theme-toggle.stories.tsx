import type { Meta, StoryObj } from '@storybook/react';
import { UthemeUtoggle } from './theme-toggle.tsx';

const meta: Meta<typeof UthemeUtoggle> = {
  title: 'Glass/UthemeUtoggle',
  component: UthemeUtoggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'UthemeUtoggle Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary UthemeUtoggle',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UthemeUtoggle size="sm">Small</UthemeUtoggle>
      <UthemeUtoggle size="md">Medium</UthemeUtoggle>
      <UthemeUtoggle size="lg">Large</UthemeUtoggle>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <UthemeUtoggle>Normal</UthemeUtoggle>
        <UthemeUtoggle disabled>Disabled</UthemeUtoggle>
      </div>
    </div>
  ),
};
