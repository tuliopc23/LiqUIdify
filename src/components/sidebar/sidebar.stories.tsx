import type { Meta, StoryObj } from '@storybook/react';
import { Usidebar } from './sidebar.tsx';

const meta: Meta<typeof Usidebar> = {
  title: 'Glass/Usidebar',
  component: Usidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Usidebar Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Usidebar',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Usidebar size="sm">Small</Usidebar>
      <Usidebar size="md">Medium</Usidebar>
      <Usidebar size="lg">Large</Usidebar>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Usidebar>Normal</Usidebar>
        <Usidebar disabled>Disabled</Usidebar>
      </div>
    </div>
  ),
};
