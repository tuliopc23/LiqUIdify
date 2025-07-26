import type { Meta, StoryObj } from '@storybook/react';
import {
  CheckCircle,
  Download,
  RefreshCw,
  Save,
  Send,
  Upload,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { GlassButton } from '../glass-button-refactored/glass-button';
import { GlassCard } from '../glass-card-refactored/glass-card';
import { GlassLoading } from './glass-loading';

const meta = {
  title: 'Components/Feedback/GlassLoading',
  component: GlassLoading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile loading indicator component with glassmorphism effects, multiple animation variants, and comprehensive customization options.

## Features

- **Multiple Variants**: Spinner, dots, pulse, and bars animations
- **Flexible Sizing**: Small to extra-large sizes for different contexts
- **Loading Text**: Optional customizable loading text display
- **Glass Effects**: Beautiful glassmorphism design that adapts to backgrounds
- **Smooth Animations**: Fluid CSS animations optimized for performance
- **Accessibility**: Proper ARIA attributes and screen reader support
- **Theme Support**: Automatic adaptation to light and dark themes
- **Performance**: Lightweight and optimized for minimal impact

## Usage

\`\`\`tsx
import { GlassLoading } from '@/components/glass-loading';

// Basic usage
<GlassLoading />

// With custom variant and size
<GlassLoading
  variant="dots"
  size="lg"
  text="Loading data..."
/>

// In a card or container
<GlassCard>
  <div className="p-8 text-center">
    <GlassLoading
      variant="pulse"
      size="xl"
      text="Processing your request..."
    />
  </div>
</GlassCard>

// Different variants
<GlassLoading variant="spinner" size="md" />
<GlassLoading variant="dots" size="md" />
<GlassLoading variant="pulse" size="md" />
<GlassLoading variant="bars" size="md" />
\`\`\`

## Variants

- **Spinner**: Classic rotating spinner (default)
- **Dots**: Three animated dots with sequential timing
- **Pulse**: Pulsing circle animation
- **Bars**: Animated vertical bars with staggered timing

## Accessibility

The loading component includes:
- Proper ARIA role and labels
- Screen reader announcements
- Semantic HTML structure
- Keyboard navigation support
- Loading state indication
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'pulse', 'bars'],
      description: 'Loading animation variant',
      table: {
        defaultValue: { summary: 'spinner' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the loading indicator',
      table: {
        defaultValue: { summary: 'md' },
      },
    },

    // Content
    text: {
      control: 'text',
      description: 'Optional loading text to display below the indicator',
    },

    // Styling
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof GlassLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic playground story
export const Playground: Story = {
  args: {
    variant: 'spinner',
    size: 'md',
    text: 'Loading...',
  },
};

// Variants showcase
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div className="text-center">
        <h3 className="mb-4 font-medium text-white/90">Spinner</h3>
        <GlassLoading variant="spinner" size="lg" />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-medium text-white/90">Dots</h3>
        <GlassLoading variant="dots" size="lg" />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-medium text-white/90">Pulse</h3>
        <GlassLoading variant="pulse" size="lg" />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-medium text-white/90">Bars</h3>
        <GlassLoading variant="bars" size="lg" />
      </div>
    </div>
  ),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="text-center">
          <h3 className="mb-4 font-medium text-white/90">Size: {size}</h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <GlassLoading variant="spinner" size={size} />
            <GlassLoading variant="dots" size={size} />
            <GlassLoading variant="pulse" size={size} />
            <GlassLoading variant="bars" size={size} />
          </div>
        </div>
      ))}
    </div>
  ),
};

// With loading text
export const WithText: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="text-center">
        <GlassLoading variant="spinner" size="lg" text="Loading your data..." />
      </div>

      <div className="text-center">
        <GlassLoading variant="dots" size="lg" text="Processing request..." />
      </div>

      <div className="text-center">
        <GlassLoading variant="pulse" size="lg" text="Uploading files..." />
      </div>

      <div className="text-center">
        <GlassLoading variant="bars" size="lg" text="Saving changes..." />
      </div>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      save: false,
      upload: false,
      download: false,
      send: false,
    });

    const simulateLoading = (action: keyof typeof loadingStates) => {
      setLoadingStates((prev) => ({ ...prev, [action]: true }));
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [action]: false }));
      }, 3000);
    };

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Button Loading States
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <GlassButton
              variant="primary"
              onClick={() => simulateLoading('save')}
              disabled={loadingStates.save}
              leftIcon={
                loadingStates.save ? undefined : <Save className="h-4 w-4" />
              }
            >
              {loadingStates.save ? (
                <GlassLoading variant="spinner" size="sm" />
              ) : (
                'Save'
              )}
            </GlassButton>

            <GlassButton
              variant="secondary"
              onClick={() => simulateLoading('upload')}
              disabled={loadingStates.upload}
              leftIcon={
                loadingStates.upload ? undefined : (
                  <Upload className="h-4 w-4" />
                )
              }
            >
              {loadingStates.upload ? (
                <GlassLoading variant="dots" size="sm" />
              ) : (
                'Upload'
              )}
            </GlassButton>

            <GlassButton
              variant="tertiary"
              onClick={() => simulateLoading('download')}
              disabled={loadingStates.download}
              leftIcon={
                loadingStates.download ? undefined : (
                  <Download className="h-4 w-4" />
                )
              }
            >
              {loadingStates.download ? (
                <GlassLoading variant="pulse" size="sm" />
              ) : (
                'Download'
              )}
            </GlassButton>

            <GlassButton
              variant="ghost"
              onClick={() => simulateLoading('send')}
              disabled={loadingStates.send}
              leftIcon={
                loadingStates.send ? undefined : <Send className="h-4 w-4" />
              }
            >
              {loadingStates.send ? (
                <GlassLoading variant="bars" size="sm" />
              ) : (
                'Send'
              )}
            </GlassButton>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Card Loading States
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <GlassCard className="p-6">
              <div className="text-center">
                <GlassLoading
                  variant="spinner"
                  size="lg"
                  text="Loading dashboard data..."
                />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-center">
                <GlassLoading
                  variant="dots"
                  size="lg"
                  text="Fetching user profile..."
                />
              </div>
            </GlassCard>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Full Page Loading
          </h3>
          <div className="relative h-64 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <GlassLoading
                variant="pulse"
                size="xl"
                text="Loading application..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Interactive demo with different contexts
export const InteractiveDemo: Story = {
  render: () => {
    const [variant, setVariant] = useState<
      'spinner' | 'dots' | 'pulse' | 'bars'
    >('spinner');
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
    const [showText, setShowText] = useState(true);
    const [customText, setCustomText] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Interactive Controls
          </h3>
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="variant-select"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Variant
              </label>
              <select
                id="variant-select"
                value={variant}
                onChange={(e) =>
                  setVariant(
                    e.target.value as 'spinner' | 'dots' | 'pulse' | 'bars'
                  )
                }
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
              >
                <option value="spinner">Spinner</option>
                <option value="dots">Dots</option>
                <option value="pulse">Pulse</option>
                <option value="bars">Bars</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="size-select"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Size
              </label>
              <select
                id="size-select"
                value={size}
                onChange={(e) =>
                  setSize(e.target.value as 'sm' | 'md' | 'lg' | 'xl')
                }
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="text-input"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Loading Text
              </label>
              <input
                id="text-input"
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm placeholder:text-white/50"
                placeholder="Enter loading text..."
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showText}
                  onChange={(e) => setShowText(e.target.checked)}
                />
                <span className="text-sm text-white/90">Show Text</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isLoading}
                  onChange={(e) => setIsLoading(e.target.checked)}
                />
                <span className="text-sm text-white/90">Is Loading</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Live Preview
          </h3>
          <div className="text-center">
            {isLoading ? (
              <GlassLoading
                variant={variant}
                size={size}
                text={showText ? customText : undefined}
              />
            ) : (
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="h-6 w-6" />
                <span>Loading Complete!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

// Performance comparison
export const PerformanceShowcase: Story = {
  render: () => {
    const [showMany, setShowMany] = useState(false);

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Performance Test
          </h3>
          <div className="mb-4">
            <GlassButton
              variant="secondary"
              onClick={() => setShowMany(!showMany)}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              {showMany ? 'Hide' : 'Show'} Multiple Loaders
            </GlassButton>
          </div>

          {showMany && (
            <div className="grid grid-cols-4 gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:grid-cols-8">
              {Array.from({ length: 16 }, (_, i) => (
                <GlassLoading
                  key={`loader-${i}`}
                  variant={
                    ['spinner', 'dots', 'pulse', 'bars'][i % 4] as
                      | 'spinner'
                      | 'dots'
                      | 'pulse'
                      | 'bars'
                  }
                  size="sm"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            CPU-Friendly Animations
          </h3>
          <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                CSS-only animations for better performance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                GPU-accelerated transforms and opacity changes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Minimal JavaScript overhead
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Optimized for mobile devices
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Respects user's reduced motion preferences
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Light Theme Simulation
        </h3>
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <GlassLoading variant="spinner" size="lg" text="Loading..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="dots" size="lg" text="Processing..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="pulse" size="lg" text="Uploading..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="bars" size="lg" text="Saving..." />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Dark Theme (Current)
        </h3>
        <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <GlassLoading variant="spinner" size="lg" text="Loading..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="dots" size="lg" text="Processing..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="pulse" size="lg" text="Uploading..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="bars" size="lg" text="Saving..." />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Colorful Background
        </h3>
        <div className="rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <GlassLoading variant="spinner" size="lg" text="Loading..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="dots" size="lg" text="Processing..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="pulse" size="lg" text="Uploading..." />
            </div>
            <div className="text-center">
              <GlassLoading variant="bars" size="lg" text="Saving..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Accessibility Features
        </h3>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Proper ARIA role and labels for screen readers
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Loading state announcements
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Respects reduced motion preferences
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Semantic HTML structure
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              High contrast support
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Focus management in loading states
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Screen Reader Test
        </h3>
        <div className="text-center">
          <GlassLoading
            variant="spinner"
            size="lg"
            text="Loading content for screen readers..."
          />
          <p className="mt-4 text-sm text-white/60">
            This loading indicator includes proper ARIA attributes for assistive
            technologies
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Reduced Motion Support
        </h3>
        <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <p className="text-sm text-white/80">
            When users have "prefers-reduced-motion" enabled, animations are
            automatically reduced or replaced with subtle alternatives to
            accommodate motion sensitivity.
          </p>
          <div className="text-center">
            <GlassLoading
              variant="pulse"
              size="lg"
              text="Reduced motion friendly loading..."
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
