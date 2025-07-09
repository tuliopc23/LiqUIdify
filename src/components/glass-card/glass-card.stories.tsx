import type { Meta, StoryObj } from '@storybook/react';
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardContent,
} from './glass-card';

const meta: Meta<typeof GlassCard> = {
  title: 'Components/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'liquid-gradient',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'pressed', 'apple'],
    },
    intensity: {
      control: 'select',
      options: ['subtle', 'medium', 'strong'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hover: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
    magnetic: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassCard>;

export const Default: Story = {
  args: {
    variant: 'default',
    hover: true,
    bordered: true,
    padding: 'md',
  },
  render: args => (
    <GlassCard {...args} className="w-80">
      <GlassCardHeader>
        <GlassCardTitle className="text-white">
          Default Glass Card
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <p className="text-white/80">
          This is the default glass card with standard backdrop blur and
          transparency effects.
        </p>
      </GlassCardContent>
    </GlassCard>
  ),
};

export const AppleLiquidGlass: Story = {
  args: {
    variant: 'apple',
    intensity: 'medium',
    magnetic: true,
    padding: 'md',
  },
  render: args => (
    <GlassCard {...args} className="w-80">
      <GlassCardHeader>
        <GlassCardTitle className="text-white">
          Apple Liquid Glass
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <p className="text-white/80">
          Authentic Apple liquid glass effect with the signature after-element
          and magnetic hover interactions.
        </p>
      </GlassCardContent>
    </GlassCard>
  ),
};

export const AppleLiquidSubtle: Story = {
  args: {
    variant: 'apple',
    intensity: 'subtle',
    magnetic: false,
    padding: 'md',
  },
  render: args => (
    <GlassCard {...args} className="w-80">
      <GlassCardHeader>
        <GlassCardTitle className="text-white">
          Apple Liquid - Subtle
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <p className="text-white/80">
          Subtle intensity with lighter blur effects and reduced opacity for
          minimal designs.
        </p>
      </GlassCardContent>
    </GlassCard>
  ),
};

export const AppleLiquidStrong: Story = {
  args: {
    variant: 'apple',
    intensity: 'strong',
    magnetic: true,
    padding: 'lg',
  },
  render: args => (
    <GlassCard {...args} className="w-80">
      <GlassCardHeader>
        <GlassCardTitle className="text-white">
          Apple Liquid - Strong
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <p className="text-white/80">
          Strong intensity with enhanced blur, increased opacity, and pronounced
          liquid effects.
        </p>
      </GlassCardContent>
    </GlassCard>
  ),
};

export const Comparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <GlassCard variant="default" className="w-64 p-6">
        <GlassCardHeader>
          <GlassCardTitle className="text-white text-sm">
            Legacy Glass
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p className="text-white/70 text-xs">
            Original implementation with basic backdrop blur.
          </p>
        </GlassCardContent>
      </GlassCard>

      <GlassCard variant="apple" intensity="subtle" className="w-64 p-6">
        <GlassCardHeader>
          <GlassCardTitle className="text-white text-sm">
            Apple Subtle
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p className="text-white/70 text-xs">
            Subtle Apple liquid glass with light effects.
          </p>
        </GlassCardContent>
      </GlassCard>

      <GlassCard
        variant="apple"
        intensity="medium"
        magnetic={true}
        className="w-64 p-6"
      >
        <GlassCardHeader>
          <GlassCardTitle className="text-white text-sm">
            Apple Medium
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p className="text-white/70 text-xs">
            Standard Apple liquid glass with magnetic hover.
          </p>
        </GlassCardContent>
      </GlassCard>

      <GlassCard
        variant="apple"
        intensity="strong"
        magnetic={true}
        className="w-64 p-6"
      >
        <GlassCardHeader>
          <GlassCardTitle className="text-white text-sm">
            Apple Strong
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <p className="text-white/70 text-xs">
            Enhanced Apple liquid glass with strong effects.
          </p>
        </GlassCardContent>
      </GlassCard>
    </div>
  ),
};
