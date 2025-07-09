import type { Meta, StoryObj } from '@storybook/react';
import { GlassShowcase } from './glass-showcase';

const meta: Meta<typeof GlassShowcase> = {
  title: 'Showcase/Apple Liquid Glass',
  component: GlassShowcase,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'liquid-gradient',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassShowcase>;

export const Default: Story = {};
