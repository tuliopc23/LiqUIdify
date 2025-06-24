import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationCenter } from './glass-notification';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Glass/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'NotificationCenter Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary NotificationCenter',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NotificationCenter size="sm">Small</NotificationCenter>
      <NotificationCenter size="md">Medium</NotificationCenter>
      <NotificationCenter size="lg">Large</NotificationCenter>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <NotificationCenter>Normal</NotificationCenter>
        <NotificationCenter disabled>Disabled</NotificationCenter>
      </div>
    </div>
  ),
};
