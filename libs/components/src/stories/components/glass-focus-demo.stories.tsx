import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassFocusDemo } from '@/components/glass-focus-demo/glass-focus-demo';

const meta = {
  title: 'Components/Glass Focus Demo',
  component: GlassFocusDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An interactive demonstration of focus management patterns, keyboard navigation, and focus indicators with glassmorphism styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof GlassFocusDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-8 max-w-4xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Focus Management Demo</h1>
        <p className="text-[var(--text-secondary)]">
          Try navigating with your keyboard to see focus indicators and
          management in action.
        </p>
      </div>
      <GlassFocusDemo />
    </div>
  ),
};

export const KeyboardNavigationGuide: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-4xl">
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4">Keyboard Navigation Guide</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Basic Navigation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">Tab</kbd>
                <span className="text-[var(--text-secondary)]">
                  Move focus forward
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">Shift + Tab</kbd>
                <span className="text-[var(--text-secondary)]">
                  Move focus backward
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd>
                <span className="text-[var(--text-secondary)]">
                  Activate buttons/links
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">Space</kbd>
                <span className="text-[var(--text-secondary)]">
                  Toggle checkboxes/buttons
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Advanced Navigation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">Arrow Keys</kbd>
                <span className="text-[var(--text-secondary)]">
                  Navigate within groups
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">Escape</kbd>
                <span className="text-[var(--text-secondary)]">
                  Close modals/menus
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">Home/End</kbd>
                <span className="text-[var(--text-secondary)]">
                  Jump to first/last item
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-white/10 rounded">
                  Page Up/Down
                </kbd>
                <span className="text-[var(--text-secondary)]">
                  Scroll through content
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassFocusDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete keyboard navigation guide with the focus demo',
      },
    },
  },
};

export const FocusPatterns: Story = {
  render: () => {
    const [pattern, setPattern] = React.useState<'ring' | 'outline' | 'glow'>(
      'ring'
    );

    return (
      <div className="p-8 max-w-4xl">
        <GlassCard className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Focus Indicator Patterns</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Different focus indicator styles for various use cases:
          </p>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setPattern('ring')}
              className={`px-4 py-2 rounded-lg transition-all ${
                pattern === 'ring'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'hover:bg-white/10'
              }`}
            >
              Ring Style
            </button>
            <button
              onClick={() => setPattern('outline')}
              className={`px-4 py-2 rounded-lg transition-all ${
                pattern === 'outline'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'hover:bg-white/10'
              }`}
            >
              Outline Style
            </button>
            <button
              onClick={() => setPattern('glow')}
              className={`px-4 py-2 rounded-lg transition-all ${
                pattern === 'glow'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'hover:bg-white/10'
              }`}
            >
              Glow Style
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <GlassButton
                className={`mb-2 ${
                  pattern === 'ring'
                    ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : pattern === 'outline'
                      ? 'focus:outline focus:outline-2 focus:outline-blue-500'
                      : 'focus:shadow-[0_0_0_3px_rgba(59,130,246,0.5)]'
                }`}
              >
                Button Focus
              </GlassButton>
              <p className="text-xs text-[var(--text-secondary)]">
                {pattern} style
              </p>
            </div>

            <div className="text-center">
              <input
                type="text"
                placeholder="Input Focus"
                className={`px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 mb-2 ${
                  pattern === 'ring'
                    ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : pattern === 'outline'
                      ? 'focus:outline focus:outline-2 focus:outline-blue-500'
                      : 'focus:shadow-[0_0_0_3px_rgba(59,130,246,0.5)]'
                }`}
              />
              <p className="text-xs text-[var(--text-secondary)]">
                {pattern} style
              </p>
            </div>

            <div className="text-center">
              <a
                href="#"
                className={`inline-block px-4 py-2 rounded-lg hover:bg-white/10 mb-2 ${
                  pattern === 'ring'
                    ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : pattern === 'outline'
                      ? 'focus:outline focus:outline-2 focus:outline-blue-500'
                      : 'focus:shadow-[0_0_0_3px_rgba(59,130,246,0.5)]'
                }`}
              >
                Link Focus
              </a>
              <p className="text-xs text-[var(--text-secondary)]">
                {pattern} style
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassFocusDemo />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different focus indicator styles and patterns demonstration',
      },
    },
  },
};

export const FocusTraversalDemo: Story = {
  render: () => {
    const [focusPath, setFocusPath] = React.useState<string[]>([]);
    const [currentFocus, setCurrentFocus] = React.useState<string>('');

    const handleFocus = (element: string) => {
      setCurrentFocus(element);
      setFocusPath((prev) => [...prev, element].slice(-5)); // Keep last 5
    };

    return (
      <div className="p-8 max-w-4xl">
        <GlassCard className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Focus Traversal Tracking</h2>
          <div className="glass-effect rounded-lg p-4 mb-4">
            <p className="text-sm font-medium mb-2">Current Focus:</p>
            <p className="text-lg text-blue-500">{currentFocus || 'None'}</p>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Focus Path:</p>
            <div className="flex gap-2 flex-wrap">
              {focusPath.length === 0 ? (
                <span className="text-[var(--text-secondary)] text-sm">
                  Start tabbing to track focus...
                </span>
              ) : (
                focusPath.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 rounded text-sm"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-semibold mb-4">Interactive Elements</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onFocus={() => handleFocus('Button 1')}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-blue-500"
              >
                Button 1
              </button>
              <button
                onFocus={() => handleFocus('Button 2')}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-blue-500"
              >
                Button 2
              </button>
              <button
                onFocus={() => handleFocus('Button 3')}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 focus:ring-2 focus:ring-blue-500"
              >
                Button 3
              </button>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Text input"
                onFocus={() => handleFocus('Text Input')}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
              />
              <select
                onFocus={() => handleFocus('Select Menu')}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
              >
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>

            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onFocus={() => handleFocus('Checkbox')}
                  className="w-4 h-4 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span>Checkbox</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-demo"
                  onFocus={() => handleFocus('Radio 1')}
                  className="w-4 h-4 focus:ring-2 focus:ring-blue-500"
                />
                <span>Radio 1</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="radio-demo"
                  onFocus={() => handleFocus('Radio 2')}
                  className="w-4 h-4 focus:ring-2 focus:ring-blue-500"
                />
                <span>Radio 2</span>
              </label>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Track and visualize focus movement through interactive elements',
      },
    },
  },
};

export const AccessibilityCompliant: Story = {
  render: () => (
    <div className="p-8 max-w-4xl space-y-6">
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold mb-4">WCAG Compliance Demo</h2>
        <div className="space-y-4">
          <div className="p-4 glass-effect rounded-lg">
            <h3 className="font-semibold mb-2">✓ Visible Focus Indicators</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              All interactive elements have clear, visible focus indicators that
              meet WCAG 2.1 Level AA requirements.
            </p>
            <div className="flex gap-3">
              <button className="px-3 py-1 rounded bg-blue-500 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Primary
              </button>
              <button className="px-3 py-1 rounded border border-current focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Secondary
              </button>
              <a
                href="#"
                className="text-blue-500 underline focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-2 py-1 rounded"
              >
                Link
              </a>
            </div>
          </div>

          <div className="p-4 glass-effect rounded-lg">
            <h3 className="font-semibold mb-2">✓ Focus Order</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Logical focus order that follows visual layout and reading order.
            </p>
            <form className="space-y-3 max-w-sm">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-3 py-2 rounded border border-white/20 bg-white/10 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 rounded border border-white/20 bg-white/10 focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full px-3 py-2 rounded bg-blue-500 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Submit
              </button>
            </form>
          </div>

          <div className="p-4 glass-effect rounded-lg">
            <h3 className="font-semibold mb-2">✓ Skip Links</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Hidden skip links that become visible on focus (Tab to reveal).
            </p>
            <div className="relative">
              <a
                href="#main-content"
                className="absolute -top-10 left-0 bg-blue-500 text-white px-4 py-2 rounded focus:top-0 transition-all"
              >
                Skip to main content
              </a>
              <div id="main-content" className="pt-4">
                <p className="text-sm">Main content area</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassFocusDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of WCAG compliant focus management patterns',
      },
    },
  },
};

export const FocusWithinDemo: Story = {
  render: () => {
    const [hasFocusWithin, setHasFocusWithin] = React.useState(false);

    return (
      <div className="p-8 max-w-2xl">
        <GlassCard className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Focus-Within Pattern</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            The form below highlights when any of its children have focus.
          </p>
        </GlassCard>

        <div
          className={`p-6 rounded-lg border-2 transition-all ${
            hasFocusWithin
              ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
              : 'border-white/20 bg-white/5'
          }`}
          onFocus={() => setHasFocusWithin(true)}
          onBlur={(e) => {
            // Check if focus is still within this container
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setHasFocusWithin(false);
            }
          }}
        >
          <h3 className="font-semibold mb-4">Contact Form</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-500"
            />
            <GlassButton variant="primary" fullWidth>
              Send Message
            </GlassButton>
          </form>

          {hasFocusWithin && (
            <p className="mt-4 text-sm text-blue-500 animate-in fade-in">
              Form has focus - ready for input!
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Focus-within pattern for enhanced form interactions',
      },
    },
  },
};
