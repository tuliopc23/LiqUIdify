import type { Meta, StoryObj } from '@storybook/react';
import { Unavbar } from './navbar.tsx';

const meta: Meta<typeof Unavbar> = {
  title: 'Glass/Unavbar',
  component: Unavbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Unavbar Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Unavbar',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Unavbar size="sm">Small</Unavbar>
      <Unavbar size="md">Medium</Unavbar>
      <Unavbar size="lg">Large</Unavbar>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Unavbar>Normal</Unavbar>
        <Unavbar disabled>Disabled</Unavbar>
      </div>
    </div>
  ),
};
