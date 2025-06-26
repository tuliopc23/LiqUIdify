import type { Meta, StoryObj } from '@storybook/react';
import { AnimationShowcase } from '../src/components/animation-showcase';

const meta: Meta<typeof AnimationShowcase> = {
  title: 'Advanced/Animation Showcase',
  component: AnimationShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Animation Showcase demonstrates the comprehensive animation system built into LiquidiUI components.

## Features

- **Spring Physics Engine**: Professional-grade spring animations with configurable presets
- **Micro-Interactions**: Subtle animations that enhance user experience
- **Staggered Animations**: Coordinated animations across multiple elements
- **Performance Optimized**: GPU-accelerated animations running at 60 FPS
- **Accessibility Support**: Respects reduced motion preferences
- **Component Integration**: All LiquidiUI components use the animation system

## Animation Types

### Spring Presets
- **Glass**: Signature LiquidiUI spring feel
- **Gentle**: Soft, calm animations
- **Bouncy**: Playful spring animations
- **Snappy**: Quick, responsive interactions
- **Fluid**: Smooth, flowing movements
- **Instant**: Ultra-fast responses

### Micro-Interactions
- **Magnetic**: Attraction effects on hover
- **Card Lift**: Elegant floating on interaction
- **Pulse**: Breathing animations for emphasis
- **Glass Morph**: Dynamic glass effect changes

## Performance

The animation system is built for production use with:
- Optimized animation scheduling
- Reduced motion support
- GPU acceleration
- Minimal bundle impact
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete animation showcase demonstrating all animation capabilities
 * of the LiquidiUI system. This interactive demo shows spring physics,
 * micro-interactions, staggered animations, and performance features.
 */
export const Complete: Story = {
  args: {},
};