import type { StoryObj } from '@storybook/react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassFocusDemo } from '@/components/glass-focus-demo/glass-focus-demo';

const meta = { title: 'Components/Glass Focus Demo' }
  GlassFocusDemo,
  parameters: { 'centered' }
    { 
        'An interactive demonstration of focus management patterns, keyboard navigation, and focus indicators with glassmorphism styling.',
      },
    },
  },
  ['autodocs'],
  argTypes: { 
      'Additional CSS classes' 'text' ,
    },
  },
} satisfies Meta<typeof GlassFocusDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => (
    <div className="max-w-4xl p-8">
      <div className="mb-6 text-center">
        <h1 className="mb-2 font-bold text-2xl">Focus Management Demo</h1>
        <p className="text-[var(--text-secondary)]">
          Try navigating with your keyboard to see focus indicators and
          management in action.
        </p>
      </div>
      <GlassFocusDemo />
    </div>
  ) }
}

export const KeyboardNavigationGuide: Story = { render: () => (
    <div className="max-w-4xl space-y-6 p-8">
      <GlassCard className="p-6">
        <h2 className="mb-4 font-bold text-xl">Keyboard Navigation Guide</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold">Basic Navigation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">Tab</kbd>
                <span className="text-[var(--text-secondary)]">
                  Move focus forward
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">Shift + Tab</kbd>
                <span className="text-[var(--text-secondary)]">
                  Move focus backward
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">Enter</kbd>
                <span className="text-[var(--text-secondary)]">
                  Activate buttons/links
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">Space</kbd>
                <span className="text-[var(--text-secondary)]">
                  Toggle checkboxes/buttons
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Advanced Navigation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">Arrow Keys</kbd>
                <span className="text-[var(--text-secondary)]">
                  Navigate within groups
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">Escape</kbd>
                <span className="text-[var(--text-secondary)]">
                  Close modals/menus
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">Home/End</kbd>
                <span className="text-[var(--text-secondary)]">
                  Jump to first/last item
                </span>
              </div>
              <div className="flex justify-between">
                <kbd className="rounded bg-white/10 px-2 py-1">
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
  ) }
  { 
        'Complete keyboard navigation guide with the focus demo' ,
    },
  },
}

export const FocusPatterns: Story = { render: () => { }
    const [pattern, setPattern] = React.useState<'ring' | 'outline' | 'glow'>(
      'ring'
    );

    return (
      <div className="max-w-4xl p-8">
        <GlassCard className="mb-6 p-6">
          <h2 className="mb-4 font-bold text-xl">Focus Indicator Patterns</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Different focus indicator styles for various use cases:
          </p>

          <div className="mb-6 flex gap-3">
            <button
              type="button"
              onClick={() => setPattern('ring')}
              className={`rounded-lg px-4 py-2 transition-all ${
                pattern === 'ring'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'hover:bg-white/10'
              }`}
            >
              Ring Style
            </button>
            <button
              type="button"
              onClick={() => setPattern('outline')}
              className={`rounded-lg px-4 py-2 transition-all ${
                pattern === 'outline'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'hover:bg-white/10'
              }`}
            >
              Outline Style
            </button>
            <button
              type="button"
              onClick={() => setPattern('glow')}
              className={`rounded-lg px-4 py-2 transition-all ${
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
                type="button"
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
              <p className="text-[var(--text-secondary)] text-xs">
                {pattern} style
              </p>
            </div>

            <div className="text-center">
              <input id="input-198" 
                type="text"
                placeholder="Input Focus"
                className={`mb-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md ${
                  pattern === 'ring'
                    ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : pattern === 'outline'
                      ? 'focus:outline focus:outline-2 focus:outline-blue-500'
                      : 'focus:shadow-[0_0_0_3px_rgba(59,130,246,0.5)]'
                }`}
              / />
              <p className="text-[var(--text-secondary)] text-xs">
                {pattern} style
              </p>
            </div>

            <div className="text-center">
              <a
                href="#placeholder"
                className={`mb-2 inline-block rounded-lg px-4 py-2 hover:bg-white/10 ${
                  pattern === 'ring'
                    ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : pattern === 'outline'
                      ? 'focus:outline focus:outline-2 focus:outline-blue-500'
                      : 'focus:shadow-[0_0_0_3px_rgba(59,130,246,0.5)]'
                }`}
              >
                Link Focus
              </a>
              <p className="text-[var(--text-secondary)] text-xs">
                {pattern} style
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassFocusDemo />
      </div>
    )
  },
  {
        'Different focus indicator styles and patterns demonstration' ,
    },
  },
}

export const FocusTraversalDemo: Story = { render: () => { }
    const [focusPath, setFocusPath] = React.useState<Array<string>>([]);
    const [currentFocus, setCurrentFocus] = React.useState<string>('');

    const handleFocus = (element: string) => {
      setCurrentFocus(element);
      setFocusPath((prev) => [...prev, element].slice(-5)); 
    };

    return (
      <div className="max-w-4xl p-8">
        <GlassCard className="mb-6 p-6">
          <h2 className="mb-4 font-bold text-xl">Focus Traversal Tracking</h2>
          <div className="glass-effect mb-4 rounded-lg p-4">
            <p className="mb-2 font-medium text-sm">Current Focus:</p>
            <p className="text-blue-500 text-lg">{currentFocus || 'None'}</p>
          </div>
          <div className="glass-effect rounded-lg p-4">
            <p className="mb-2 font-medium text-sm">Focus Path:</p>
            <div className="flex flex-wrap gap-2">
              {focusPath.length === 0 ? (
                <span className="text-[var(--text-secondary)] text-sm">
                  Start tabbing to track focus...
                </span>
              ) : (
                focusPath.map((item, index) => (
                  <span
                    key={index}
                    className="rounded bg-blue-500/20 px-2 py-1 text-sm"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="mb-4 font-semibold">Interactive Elements</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                type="button"
                onFocus={() => handleFocus('Button 1')}
                className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 focus:ring-2 focus:ring-blue-500"
              >
                Button 1
              </button>
              <button
                type="button"
                onFocus={() => handleFocus('Button 2')}
                className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 focus:ring-2 focus:ring-blue-500"
              >
                Button 2
              </button>
              <button
                type="button"
                onFocus={() => handleFocus('Button 3')}
                className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 focus:ring-2 focus:ring-blue-500"
              >
                Button 3
              </button>
            </div>

            <div className="flex gap-3">
              <input id="input-314" 
                type="text"
                placeholder="Text input"
                onFocus={() => handleFocus('Text Input')}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 focus:ring-2 focus:ring-blue-500" />
              <select id="select-1-y82c2g" 
                onFocus={() => handleFocus('Select Menu')}
                className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>

            <div className="flex gap-3">
              <label htmlFor="form-field" className="flex items-center gap-2">
                <input id="input-330" 
                  type="checkbox"
                  onFocus={() => handleFocus('Checkbox')}
                  className="h-4 w-4 rounded focus:ring-2 focus:ring-blue-500" />
                <span>Checkbox</span>
              </label>
              <label htmlFor="form-field" className="flex items-center gap-2">
                <input id="input-337" 
                  type="radio"
                  name="radio-demo"
                  onFocus={() => handleFocus('Radio 1')}
                  className="h-4 w-4 focus:ring-2 focus:ring-blue-500" />
                <span>Radio 1</span>
              </label>
              <label htmlFor="form-field" className="flex items-center gap-2">
                <input id="input-345" 
                  type="radio"
                  name="radio-demo"
                  onFocus={() => handleFocus('Radio 2')}
                  className="h-4 w-4 focus:ring-2 focus:ring-blue-500" />
                <span>Radio 2</span>
              </label>
            </div>
          </div>
        </GlassCard>
      </div>
    )
  },
  {
        'Track and visualize focus movement through interactive elements' ,
    },
  },
}

export const AccessibilityCompliant: Story = { render: () => (
    <div className="max-w-4xl space-y-6 p-8">
      <GlassCard className="p-6">
        <h2 className="mb-4 font-bold text-xl">WCAG Compliance Demo</h2>
        <div className="space-y-4">
          <div className="glass-effect rounded-lg p-4">
            <h3 className="mb-2 font-semibold">✓ Visible Focus Indicators</h3>
            <p className="mb-3 text-[var(--text-secondary)] text-sm"> }
              All interactive elements have clear, visible focus indicators that
              meet WCAG 2.1 Level AA requirements.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded bg-blue-500 px-3 py-1 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Primary
              </button>
              <button
                type="button"
                className="rounded border border-current px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Secondary
              </button>
              <a
                href="#placeholder"
                className="rounded px-2 py-1 text-blue-500 underline focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Link
              </a>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <h3 className="mb-2 font-semibold">✓ Focus Order</h3>
            <p className="mb-3 text-[var(--text-secondary)] text-sm">
              Logical focus order that follows visual layout and reading order.
            </p>
            <form className="max-w-sm space-y-3">
              <input id="input-408" 
                type="text"
                placeholder="First Name"
                className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              / />
              <input id="input-413" 
                type="text"
                placeholder="Last Name"
                className="w-full rounded border border-white/20 bg-white/10 px-3 py-2 focus:ring-2 focus:ring-blue-500"
              / />
              <button
                type="button"
                className="w-full rounded bg-blue-500 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <h3 className="mb-2 font-semibold">✓ Skip Links</h3>
            <p className="mb-3 text-[var(--text-secondary)] text-sm">
              Hidden skip links that become visible on focus (Tab to reveal).
            </p>
            <div className="relative">
              <a
                href="#main-content"
                className="-top-10 absolute left-0 rounded bg-blue-500 px-4 py-2 text-white transition-all focus:top-0"
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
  parameters: { docs: {
      description: {
        story: 'Demonstration of WCAG compliant focus management patterns' }
      },
    },
  },
};

export const FocusWithinDemo: Story = { render: () => { }
    const [hasFocusWithin, setHasFocusWithin] = React.useState(false);

    return (
      <div className="max-w-2xl p-8">
        <GlassCard className="mb-6 p-6">
          <h2 className="mb-4 font-bold text-xl">Focus-Within Pattern</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            The form below highlights when any of its children have focus.
          </p>
        </GlassCard>

        <div
          className={`rounded-lg border-2 p-6 transition-all ${
            hasFocusWithin
              ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/20 shadow-lg'
              : 'border-white/20 bg-white/5'
          }`}
          onFocus={() => setHasFocusWithin(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setHasFocusWithin(false);
            }
        >
          <h3 className="mb-4 font-semibold">Contact Form</h3>
          <form className="space-y-4">
            <input id="input-487" 
              type="text"
              placeholder="Name"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            / />
            <input id="input-492" 
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            / />
            <textarea id="textarea-1-29t1a4" 
              placeholder="Message"
              rows={4}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 focus:ring-2 focus:ring-blue-500" />
            <GlassButton type="button" variant="primary" fullWidth>
              Send Message
            </GlassButton>
          </form>hasFocusWithin && (
            <p className="fade-in mt-4 animate-in text-blue-500 text-sm">
              Form has focus - ready for input!
            </p>
          )
        </div>
      </div>
    )
  },
  parameters: { docs: {
      description: {
        story: 'Focus-within pattern for enhanced form interactions' }
      },
    },
  },
};
