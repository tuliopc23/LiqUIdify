/**
 * Story Template for LiquidUI Components
 *
 * This template provides a consistent structure for all component stories
 * to ensure comprehensive documentation and testing coverage.
 */

import type { Meta } from '@storybook/react';

// Example template structure
export const storyTemplate = {
  // 1. Default Story - Basic usage
  Default: {
    args: {
      // Default props
    },
  },

  // 2. Variants - All component variants
  Variants: {
    render: () => <div className="space-y-4">{/* Show all variants */}</div>,
  },

  // 3. Sizes - All size options
  Sizes: {
    render: () => (
      <div className="flex items-center gap-4">{/* Show all sizes */}</div>
    ),
  },

  // 4. States - Interactive states
  States: {
    render: () => (
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="mb-2 font-medium text-sm">Normal</h4>
          {/* Normal state */}
        </div>
        <div>
          <h4 className="mb-2 font-medium text-sm">Disabled</h4>
          {/* Disabled state */}
        </div>
        <div>
          <h4 className="mb-2 font-medium text-sm">Loading</h4>
          {/* Loading state */}
        </div>
      </div>
    ),
  },

  // 5. Theme Showcase - Light and Dark
  ThemeShowcase: {
    render: () => (
      <div className="grid grid-cols-2 gap-8">
        <div className="light rounded-lg bg-white/50 p-6">
          <h3 className="mb-4 font-semibold text-lg">Light Theme</h3>
          {/* Component in light theme */}
        </div>
        <div className="dark rounded-lg bg-black/50 p-6">
          <h3 className="mb-4 font-semibold text-lg text-white">Dark Theme</h3>
          {/* Component in dark theme */}
        </div>
      </div>
    ),
  },

  // 6. Interactive Demo - Working example
  InteractiveDemo: {
    render: () => {
      // Add state hooks and handlers
      return <div className="space-y-4">{/* Interactive component */}</div>;
    },
  },

  // 7. Accessibility - ARIA and keyboard nav
  AccessibilityDemo: {
    render: () => (
      <div className="space-y-4">
        <p className="text-gray-600 text-sm dark:text-gray-400">
          Keyboard navigation: Tab, Enter, Space, Arrow keys
        </p>
        {/* Component with accessibility features highlighted */}
      </div>
    ),
  },

  // 8. Responsive - Different screen sizes
  ResponsiveDemo: {
    render: () => (
      <div className="space-y-8">
        <div className="mx-auto max-w-sm">
          <h4 className="mb-2 font-medium text-sm">Mobile (max-w-sm)</h4>
          {/* Mobile view */}
        </div>
        <div className="mx-auto max-w-md">
          <h4 className="mb-2 font-medium text-sm">Tablet (max-w-md)</h4>
          {/* Tablet view */}
        </div>
        <div>
          <h4 className="mb-2 font-medium text-sm">Desktop (full width)</h4>
          {/* Desktop view */}
        </div>
      </div>
    ),
  },
};

// Story categories for organization
export const storyCategories = {
  components: {
    core: 'Components/Core',
    forms: 'Components/Forms',
    layout: 'Components/Layout',
    feedback: 'Components/Feedback',
    navigation: 'Components/Navigation',
    dataDisplay: 'Components/Data Display',
    overlay: 'Components/Overlay',
    accessibility: 'Components/Accessibility',
  },
  patterns: {
    animations: 'Patterns/Animations',
    themes: 'Patterns/Themes',
    responsive: 'Patterns/Responsive',
  },
  system: {
    tokens: 'Design System/Tokens',
    guidelines: 'Design System/Guidelines',
  },
};

// Common argTypes for consistency
export const commonArgTypes = {
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    description: 'Component size',
  },
  variant: {
    control: 'select',
    description: 'Visual style variant',
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled state',
  },
  loading: {
    control: 'boolean',
    description: 'Loading state',
  },
  className: {
    control: 'text',
    description: 'Additional CSS classes',
  },
};

// Helper function to create consistent meta
export function createMeta<T>(config: {
  title: string;
  component: T;
  description: string;
  category?: keyof typeof storyCategories;
}) {
  return {
    title: config.category
      ? storyCategories[config.category as keyof typeof storyCategories][
          config.title as unknown
        ] || config.title
      : config.title,
    component: config.component,
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: config.description,
        },
      },
    },
    tags: ['autodocs'],
  } satisfies Meta<typeof config.component>;
}
