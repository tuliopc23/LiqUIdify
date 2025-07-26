import type { Meta, StoryObj } from '@storybook/react';
import { X } from 'lucide-react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassPortal } from '@/components/glass-portal/glass-portal';

const meta = {
  title: 'Components/Glass Portal',
  component: GlassPortal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A portal component that renders content outside the DOM hierarchy while maintaining glassmorphism styling. Perfect for modals, tooltips, and dropdown menus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    container: {
      description: 'DOM element to render the portal into',
      control: false,
    },
    children: {
      description: 'Content to render in the portal',
      control: false,
    },
  },
} satisfies Meta<typeof GlassPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [showPortal, setShowPortal] = React.useState(false);

    return (
      <div className="p-8 max-w-2xl">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Portal Demo</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Click the button to render content in a portal. The content will be
            rendered at the end of the document body, outside of this card's DOM
            hierarchy.
          </p>

          <GlassButton onClick={() => setShowPortal(true)}>
            Open Portal Content
          </GlassButton>

          {showPortal && (
            <GlassPortal>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                  onClick={() => setShowPortal(false)}
                />
                <GlassCard className="relative z-10 p-6 max-w-md w-full animate-in zoom-in-95">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold">Portal Content</h3>
                    <button
                      onClick={() => setShowPortal(false)}
                      className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-4">
                    This content is rendered in a portal at the end of the
                    document body, but it maintains all the glassmorphism
                    styling and behaviors.
                  </p>
                  <GlassButton
                    variant="primary"
                    onClick={() => setShowPortal(false)}
                  >
                    Close Portal
                  </GlassButton>
                </GlassCard>
              </div>
            </GlassPortal>
          )}
        </GlassCard>
      </div>
    );
  },
};

export const ModalExample: Story = {
  render: () => {
    const [showModal, setShowModal] = React.useState(false);

    return (
      <div className="p-8">
        <GlassButton onClick={() => setShowModal(true)}>Open Modal</GlassButton>

        {showModal && (
          <GlassPortal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in"
                onClick={() => setShowModal(false)}
              />
              <div className="relative z-10 w-full max-w-lg animate-in slide-in-from-bottom-4">
                <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Modal Dialog</h2>
                  <p className="text-[var(--text-secondary)] mb-6">
                    This modal is rendered using a portal, ensuring it appears
                    above all other content regardless of z-index stacking
                    contexts in the parent components.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <GlassButton
                      variant="ghost"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </GlassButton>
                    <GlassButton
                      variant="primary"
                      onClick={() => setShowModal(false)}
                    >
                      Confirm
                    </GlassButton>
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassPortal>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal dialog implementation using portal',
      },
    },
  },
};

export const TooltipExample: Story = {
  render: () => {
    const [tooltipVisible, setTooltipVisible] = React.useState<string | null>(
      null
    );
    const [tooltipPosition, setTooltipPosition] = React.useState({
      x: 0,
      y: 0,
    });

    const showTooltip = (id: string, event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
      setTooltipVisible(id);
    };

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Tooltip Portal Example</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Hover over the buttons below to see tooltips rendered via portals.
          </p>

          <div className="flex gap-4 flex-wrap">
            <GlassButton
              onMouseEnter={(e) => showTooltip('save', e)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              Save
            </GlassButton>

            <GlassButton
              variant="primary"
              onMouseEnter={(e) => showTooltip('publish', e)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              Publish
            </GlassButton>

            <GlassButton
              variant="danger"
              onMouseEnter={(e) => showTooltip('delete', e)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              Delete
            </GlassButton>
          </div>

          {tooltipVisible && (
            <GlassPortal>
              <div
                className="fixed z-[10000] pointer-events-none"
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y}px`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="glass-effect rounded-lg px-3 py-2 text-sm animate-in fade-in zoom-in-95">
                  {tooltipVisible === 'save' && 'Save your changes'}
                  {tooltipVisible === 'publish' && 'Publish to production'}
                  {tooltipVisible === 'delete' && 'Delete permanently'}
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45" />
                </div>
              </div>
            </GlassPortal>
          )}
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips rendered via portal for proper positioning',
      },
    },
  },
};

export const DropdownExample: Story = {
  render: () => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [dropdownPosition, setDropdownPosition] = React.useState({
      x: 0,
      y: 0,
    });
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => {
      if (!dropdownOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          x: rect.left,
          y: rect.bottom + 8,
        });
      }
      setDropdownOpen(!dropdownOpen);
    };

    const menuItems = [
      { label: 'Profile', action: () => alert('Profile clicked') },
      { label: 'Settings', action: () => alert('Settings clicked') },
      { label: 'Help', action: () => alert('Help clicked') },
      { label: 'Sign Out', action: () => alert('Sign out clicked') },
    ];

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Dropdown Menu Portal</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Click the button to open a dropdown menu rendered via portal.
          </p>

          <GlassButton ref={buttonRef} onClick={toggleDropdown}>
            Options Menu
          </GlassButton>

          {dropdownOpen && (
            <GlassPortal>
              <div
                className="fixed z-[9999]"
                style={{
                  left: `${dropdownPosition.x}px`,
                  top: `${dropdownPosition.y}px`,
                }}
              >
                <div className="glass-effect rounded-lg p-2 min-w-[200px] animate-in slide-in-from-top-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div
                className="fixed inset-0 z-[9998]"
                onClick={() => setDropdownOpen(false)}
              />
            </GlassPortal>
          )}
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown menu positioned using portal',
      },
    },
  },
};

export const NestedPortals: Story = {
  render: () => {
    const [showOuter, setShowOuter] = React.useState(false);
    const [showInner, setShowInner] = React.useState(false);

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Nested Portals Demo</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            This demonstrates how portals can be nested within each other.
          </p>

          <GlassButton onClick={() => setShowOuter(true)}>
            Open Outer Portal
          </GlassButton>

          {showOuter && (
            <GlassPortal>
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                  onClick={() => {
                    setShowOuter(false);
                    setShowInner(false);
                  }}
                />
                <GlassCard className="relative z-10 p-6 max-w-md w-full">
                  <h3 className="text-lg font-bold mb-4">Outer Portal</h3>
                  <p className="text-[var(--text-secondary)] mb-4">
                    This is the outer portal content. You can open another
                    portal from here.
                  </p>

                  <div className="flex gap-3">
                    <GlassButton onClick={() => setShowInner(true)}>
                      Open Inner Portal
                    </GlassButton>
                    <GlassButton
                      variant="ghost"
                      onClick={() => setShowOuter(false)}
                    >
                      Close
                    </GlassButton>
                  </div>

                  {showInner && (
                    <GlassPortal>
                      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                        <div
                          className="absolute inset-0 bg-black/30"
                          onClick={() => setShowInner(false)}
                        />
                        <GlassCard className="relative z-10 p-6 max-w-sm w-full bg-blue-500/10">
                          <h4 className="text-lg font-bold mb-4">
                            Inner Portal
                          </h4>
                          <p className="text-[var(--text-secondary)] mb-4">
                            This portal is nested inside the outer portal.
                          </p>
                          <GlassButton
                            variant="primary"
                            onClick={() => setShowInner(false)}
                            fullWidth
                          >
                            Close Inner
                          </GlassButton>
                        </GlassCard>
                      </div>
                    </GlassPortal>
                  )}
                </GlassCard>
              </div>
            </GlassPortal>
          )}
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of nested portals with proper z-index management',
      },
    },
  },
};

export const CustomContainer: Story = {
  render: () => {
    const [showPortal, setShowPortal] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold mb-4">Custom Container Portal</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            This portal renders into a custom container instead of
            document.body.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Control Area</h3>
              <GlassButton onClick={() => setShowPortal(!showPortal)}>
                Toggle Portal Content
              </GlassButton>
            </div>

            <div>
              <h3 className="font-medium mb-3">Portal Container</h3>
              <div
                ref={containerRef}
                className="relative h-48 glass-effect rounded-lg p-4 overflow-hidden"
              >
                <p className="text-sm text-[var(--text-secondary)]">
                  Portal content will appear here
                </p>
              </div>
            </div>
          </div>

          {showPortal && containerRef.current && (
            <GlassPortal container={containerRef.current}>
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <div className="text-center">
                  <p className="font-bold text-lg mb-2">Portal Content!</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Rendered inside the custom container
                  </p>
                </div>
              </div>
            </GlassPortal>
          )}
        </GlassCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Portal rendering into a custom container element',
      },
    },
  },
};
