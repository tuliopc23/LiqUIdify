import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentShowcase } from './component-showcase';

const meta: Meta<typeof ComponentShowcase> = {
  title: 'Glass/ComponentShowcase',
  component: ComponentShowcase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'ComponentShowcase Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary ComponentShowcase',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ComponentShowcase size="sm">Small</ComponentShowcase>
      <ComponentShowcase size="md">Medium</ComponentShowcase>
      <ComponentShowcase size="lg">Large</ComponentShowcase>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <ComponentShowcase>Normal</ComponentShowcase>
        <ComponentShowcase disabled>Disabled</ComponentShowcase>
      </div>
    </div>
  ),
};
