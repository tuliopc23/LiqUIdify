import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider } from './glass-toast';

const meta: Meta<typeof ToastProvider> = {
  title: 'Glass/ToastProvider',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'ToastProvider Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary ToastProvider',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ToastProvider size="sm">Small</ToastProvider>
      <ToastProvider size="md">Medium</ToastProvider>
      <ToastProvider size="lg">Large</ToastProvider>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ToastProvider>Normal</ToastProvider>
        <ToastProvider disabled>Disabled</ToastProvider>
      </div>
    </div>
  ),
};
