import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassCheckbox } from '@/components/glass-checkbox/glass-checkbox';
import { GlassFocusTrap } from '@/components/glass-focus-trap/glass-focus-trap';
import { GlassInput } from '@/components/glass-input/glass-input';

const meta = { title: 'Components/Glass Focus Trap' }
  component: GlassFocusTrap,
  parameters: { layout: 'centered' }
    docs: { description: {
        component: }
          'A focus trap component that constrains keyboard navigation within a specific area. Essential for modals, dropdowns, and other overlay components to ensure accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { active: {
      description: 'Whether the focus trap is active' }
      control: { type: 'boolean' },
    },
    returnFocus: { description: 'Return focus to the trigger element when deactivated' }
      control: { type: 'boolean' },
    },
    initialFocus: { description: 'Selector or element to focus when activated' }
      control: false,
    },
    allowOutsideClick: { description: 'Allow clicks outside the trap' }
      control: { type: 'boolean' },
    },
    escapeDeactivates: { description: 'Deactivate trap when Escape key is pressed' }
      control: { type: 'boolean' },
    },
    onDeactivate: { description: 'Callback when focus trap is deactivated' }
      action: 'deactivated',
    },
  },
} satisfies Meta<typeof GlassFocusTrap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => { }
    const [isActive, setIsActive] = React.useState(false);

    return (
      <div className="space-y-4 p-8">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-bold text-2xl">Focus Trap Demo</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Click the button below to activate the focus trap. Use Tab and
            Shift+Tab to navigate.
          </p>
          <GlassButton type="button"
              onClick={() => setIsActive(true)}>
            Activate Focus Trap
          </GlassButton>
        </div>

        {isActive && (
          <GlassFocusTrap
            active={isActive}
            returnFocus
            escapeDeactivates
            onDeactivate={() => setIsActive(false)}
          >
            <GlassCard className="mx-auto max-w-md p-6">
              <h3 className="mb-4 font-bold text-lg">Trapped Focus Area</h3>
              <p className="mb-4 text-[var(--text-secondary)] text-sm">
                Focus is now trapped within this card. Press Escape or click the
                close button to exit.
              </p>

              <form className="space-y-4">
                <GlassInput placeholder="First input" autoFocus />
                <GlassInput placeholder="Second input" />
                <GlassCheckbox>Accept terms and conditions</GlassCheckbox>

                <div className="flex justify-end gap-2">
                  <GlassButton
                    type="button"
                    variant="ghost" onClick={() => setIsActive(false)}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton type="button" variant="primary">
                    Submit
                  </GlassButton>
                </div>
              </form>
            </GlassCard>
          </GlassFocusTrap>
        )}
      </div>
    );
  },
};

export const ModalExample: Story = { render: () => { }
    const [showModal, setShowModal] = React.useState(false);

    return (
      <div className="p-8">
        <GlassButton type="button"
              onClick={() => setShowModal(true)}>
          Open Modal with Focus Trap
        </GlassButton>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowModal(false)}
            />

            <GlassFocusTrap
              active={showModal}
              returnFocus
              escapeDeactivates
              allowOutsideClick={false}
              onDeactivate={() => setShowModal(false)}
            >
              <GlassCard className="relative z-10 mx-4 w-full max-w-lg p-8">
                <h2 className="mb-4 font-bold text-2xl">Modal Dialog</h2>
                <p className="mb-6 text-[var(--text-secondary)]">
                  This modal demonstrates focus trapping. Tab navigation is
                  constrained within the modal, and clicking outside or pressing
                  Escape will close it.
                </p>

                <div className="mb-6 space-y-4">
                  <GlassInput placeholder="Email address" type="email" />
                  <GlassInput placeholder="Password" type="password" />
                </div>

                <div className="flex justify-end gap-3">
                  <GlassButton
                    type="button"
                    variant="ghost" onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    type="button"
                    variant="primary" onClick={() => {
                      alert('Form submitted!');
                      setShowModal(false);
                    } onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => {
                      alert('Form submitted!');
                      setShowModal(false);
                    )(e);>
                    Sign In
                  </GlassButton>
                </div>
              </GlassCard>
            </GlassFocusTrap>
          </div>
        )}
      </div>
    );
  },
  parameters: { docs: {
      description: {
        story: 'Focus trap used in a modal dialog pattern' }
      },
    },
  },
};

export const InitialFocusExample: Story = { render: () => { }
    const [isActive, setIsActive] = React.useState(false);

    return (
      <div className="p-8">
        <GlassButton type="button"
              onClick={() => setIsActive(true)}>
          Open with Custom Initial Focus
        </GlassButton>

        {isActive && (
          <div className="mt-4">
            <GlassFocusTrap
              active={isActive}
              returnFocus
              initialFocus="[data-focus-target]"
              onDeactivate={() => setIsActive(false)}
            >
              <GlassCard className="max-w-md p-6">
                <h3 className="mb-4 font-bold text-lg">Custom Initial Focus</h3>
                <p className="mb-4 text-[var(--text-secondary)] text-sm">
                  The second button will receive initial focus instead of the
                  first focusable element.
                </p>

                <div className="space-y-3">
                  <GlassButton type="button" variant="ghost" fullWidth>
                    First Button
                  </GlassButton>
                  <GlassButton
                    type="button"
                    variant="primary"
                    fullWidth
                    data-focus-target
                  >
                    This Button Gets Initial Focus
                  </GlassButton>
                  <GlassButton
                    type="button"
                    variant="ghost"
                    fullWidth onClick={() => setIsActive(false)}
                  >
                    Close
                  </GlassButton>
                </div>
              </GlassCard>
            </GlassFocusTrap>
          </div>
        )}
      </div>
    );
  },
  parameters: { docs: {
      description: {
        story: 'Demonstrating custom initial focus target selection' }
      },
    },
  },
};

export const NestedFocusTraps: Story = { render: () => { }
    const [outerActive, setOuterActive] = React.useState(false);
    const [innerActive, setInnerActive] = React.useState(false);

    return (
      <div className="p-8">
        <GlassButton type="button"
              onClick={() => setOuterActive(true)}>
          Open Nested Focus Traps Demo
        </GlassButton>

        {outerActive && (
          <GlassFocusTrap
            active={outerActive && !innerActive}
            returnFocus
            onDeactivate={() => setOuterActive(false)}
          >
            <GlassCard className="mt-4 max-w-lg p-6">
              <h3 className="mb-4 font-bold text-lg">Outer Focus Trap</h3>
              <p className="mb-4 text-[var(--text-secondary)] text-sm">
                This is the outer focus trap. Click the button below to activate
                a nested trap.
              </p>

              <div className="mb-4 space-y-3">
                <GlassInput placeholder="Outer input 1" />
                <GlassInput placeholder="Outer input 2" />
              </div>

              <GlassButton
                type="button"
                variant="primary" onClick={() => setInnerActive(true)}
              >
                Open Inner Focus Trap
              </GlassButton>

              {innerActive && (
                <div className="mt-4">
                  <GlassFocusTrap
                    active={innerActive}
                    returnFocus
                    onDeactivate={() => setInnerActive(false)}
                  >
                    <GlassCard className="bg-blue-500/10 p-4">
                      <h4 className="mb-2 font-bold">Inner Focus Trap</h4>
                      <p className="mb-3 text-[var(--text-secondary)] text-sm">
                        Focus is now trapped in this inner area.
                      </p>
                      <GlassInput placeholder="Inner input" className="mb-3" />
                      <GlassButton
                        type="button"
                        size="sm" onClick={() => setInnerActive(false)}
                      >
                        Close Inner
                      </GlassButton>
                    </GlassCard>
                  </GlassFocusTrap>
                </div>
              )}

              <GlassButton
                type="button"
                variant="ghost" onClick={() => setOuterActive(false)}
                className="mt-4"
              >
                Close Outer
              </GlassButton>
            </GlassCard>
          </GlassFocusTrap>
        )}
      </div>
    );
  },
  parameters: { docs: {
      description: {
        story:
          'Demonstrating nested focus traps with proper activation/deactivation' }
      },
    },
  },
};

export const AccessibilityDemo: Story = { render: () => { }
    const [isActive, setIsActive] = React.useState(false);
    const [announcement, setAnnouncement] = React.useState('');

    return (
      <div className="p-8">
        <div className="glass-effect mb-6 rounded-lg p-4">
          <h3 className="mb-2 font-bold">Keyboard Navigation Guide</h3>
          <ul className="space-y-1 text-[var(--text-secondary)] text-sm">
            <li>
              • <kbd>Tab</kbd> - Move focus forward
            </li>
            <li>
              • <kbd>Shift + Tab</kbd> - Move focus backward
            </li>
            <li>
              • <kbd>Escape</kbd> - Close the focus trap
            </li>
            <li>
              • <kbd>Enter</kbd> - Activate focused button
            </li>
          </ul>
        </div>

        <GlassButton type="button"
              onClick={() => setIsActive(true)}>
          Test Accessibility Features
        </GlassButton>

        {isActive && (
          <GlassFocusTrap
            active={isActive}
            returnFocus
            escapeDeactivates
            onDeactivate={() => {
              setIsActive(false);
              setAnnouncement('Focus trap closed');>
            <GlassCard className="mt-4 max-w-md p-6">
              <h3 className="mb-4 font-bold text-lg">
                Accessibility Test Area
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="test-input"
                    className="mb-1 block font-medium text-sm"
                  >
                    Test Input (Required)
                  </label>
                  <GlassInput
                    id="test-input"
                    placeholder="Type something..."
                    aria-required="true"
                    onFocus={() => setAnnouncement('Text input focused')}
                  />
                </div>

                <fieldset>
                  <legend className="mb-2 font-medium text-sm">Options</legend>
                  <div className="space-y-2">
                    <GlassCheckbox
                      onFocus={() =>
                        setAnnouncement('Option 1 checkbox focused')
                      }
                    >
                      Option 1
                    </GlassCheckbox>
                    <GlassCheckbox
                      onFocus={() =>
                        setAnnouncement('Option 2 checkbox focused')
                      }
                    >
                      Option 2
                    </GlassCheckbox>
                  </div>
                </fieldset>

                <div className="flex gap-2">
                  <GlassButton
                    type="button"
                    variant="ghost" onClick={() => setIsActive(false)}
                    onFocus={() => setAnnouncement('Cancel button focused')}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    type="button"
                    variant="primary"
                    onFocus={() => setAnnouncement('Submit button focused')}
                  >
                    Submit
                  </GlassButton>
                </div>
              </div>

              {announcement && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-4 text-[var(--text-secondary)] text-sm"
                >
                  Screen reader: {announcement}
                </div>
              )}
            </GlassCard>
          </GlassFocusTrap>
        )}
      </div>
    );
  },
  parameters: { docs: {
      description: {
        story:
          'Comprehensive accessibility features demonstration with screen reader announcements' }
      },
    },
  },
};
