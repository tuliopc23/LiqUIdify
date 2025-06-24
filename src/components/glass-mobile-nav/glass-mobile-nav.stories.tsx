import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassMobileNav } from './glass-mobile-nav';

const meta: Meta<typeof GlassMobileNav> = {
  title: 'Glass/GlassMobileNav',
  component: GlassMobileNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'GlassMobileNav Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary GlassMobileNav',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlassMobileNav size="sm">Small</GlassMobileNav>
      <GlassMobileNav size="md">Medium</GlassMobileNav>
      <GlassMobileNav size="lg">Large</GlassMobileNav>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <GlassMobileNav>Normal</GlassMobileNav>
        <GlassMobileNav disabled>Disabled</GlassMobileNav>
      </div>
    </div>
  ),
};
