import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassLoading } from './glass-loading';

const meta: Meta<typeof GlassLoading> = {
  title: 'Glass/GlassLoading',
  component: GlassLoading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: { type: 'select' },
      options: ['dots', 'spinner', 'pulse', 'bars'],
    },
    text: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: {
    variant: 'spinner',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
  },
};

export const Bars: Story = {
  args: {
    variant: 'bars',
  },
};

export const WithText: Story = {
  args: {
    variant: 'spinner',
    text: 'Loading...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <GlassLoading size="sm" variant="spinner" text="Small" />
      <GlassLoading size="md" variant="spinner" text="Medium" />
      <GlassLoading size="lg" variant="spinner" text="Large" />
      <GlassLoading size="xl" variant="spinner" text="Extra Large" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <GlassLoading variant="spinner" text="Spinner" />
      <GlassLoading variant="dots" text="Dots" />
      <GlassLoading variant="pulse" text="Pulse" />
      <GlassLoading variant="bars" text="Bars" />
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <GlassLoading variant="spinner" text="Connecting..." />
      <GlassLoading variant="dots" text="Processing request..." />
      <GlassLoading variant="pulse" text="Uploading files..." />
      <GlassLoading variant="bars" text="Analyzing data..." />
    </div>
  ),
};
