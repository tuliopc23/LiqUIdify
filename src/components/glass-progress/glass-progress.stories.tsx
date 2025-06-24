import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassProgress } from './glass-progress';

const meta: Meta<typeof GlassProgress> = {
  title: 'Glass/GlassProgress',
  component: GlassProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'gradient', 'minimal'],
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'green', 'purple', 'red', 'yellow'],
    },
    showValue: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <GlassProgress value={40} size="sm" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Medium</label>
        <GlassProgress value={60} size="md" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <GlassProgress value={80} size="lg" showValue />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Default</label>
        <GlassProgress value={70} variant="default" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Gradient</label>
        <GlassProgress value={70} variant="gradient" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Minimal</label>
        <GlassProgress value={70} variant="minimal" showValue />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Blue</label>
        <GlassProgress value={60} color="blue" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Green</label>
        <GlassProgress value={60} color="green" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Purple</label>
        <GlassProgress value={60} color="purple" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Red</label>
        <GlassProgress value={60} color="red" showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Yellow</label>
        <GlassProgress value={60} color="yellow" showValue />
      </div>
    </div>
  ),
};

export const ProgressStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Empty</label>
        <GlassProgress value={0} showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">In Progress</label>
        <GlassProgress value={45} showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Almost Complete</label>
        <GlassProgress value={85} showValue />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Complete</label>
        <GlassProgress value={100} color="green" showValue />
      </div>
    </div>
  ),
};

export const WithoutLabels: Story = {
  render: () => (
    <div className="space-y-3 w-full max-w-md">
      <GlassProgress value={25} color="red" />
      <GlassProgress value={50} color="yellow" />
      <GlassProgress value={75} color="blue" />
      <GlassProgress value={100} color="green" />
    </div>
  ),
};
