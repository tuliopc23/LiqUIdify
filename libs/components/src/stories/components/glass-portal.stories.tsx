import type { StoryObj } from '@storybook/react';
import { X } from 'lucide-react';
import React from 'react';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassPortal } from '@/components/glass-portal/glass-portal';

const meta = { title: 'Components/Glass Portal' }
  component: GlassPortal,
  parameters: { layout: 'centered' }
    { 
        component: 
          'A portal component that renders content outside the DOM hierarchy while maintaining glassmorphism styling. Perfect for modals, tooltips, and dropdown menus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: { 
      description: 'DOM element to render the portal into' 
      control: false,
    },
    children: { description: 'Content to render in the portal' }
      control: false,
    },
  },
} satisfies Meta<typeof GlassPortal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => { }
    const [showPortal, setShowPortal] = React.useState(false);

    return (
      <div className="max-w-2xl p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Portal Demo</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            Click the button to render content in a portal. The content will be
            rendered at the end of the document body, outside of this card's DOM
            hierarchy.
          </p>

          <GlassButton type="button"
              onClick={() => setShowPortal(true)}>
            Open Portal Content
          </GlassButton>

          {showPortal && (
            <GlassPortal>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowPortal(false)}
                />
                <GlassCard className="zoom-in-95 relative z-10 w-full max-w-md animate-in p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-bold text-lg">Portal Content</h3>
                    <button
                      type="button"
              onClick={() => setShowPortal(false)}
                      className="rounded-lg p-1 transition-colors hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mb-4 text-[var(--text-secondary)]">
                    This content is rendered in a portal at the end of the
                    document body, but it maintains all the glassmorphism
                    styling and behaviors.
                  </p>
                  <GlassButton
                    type="button"
                    variant="primary" onClick={() => setShowPortal(false)}
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

export const ModalExample: Story = { render: () => { }
    const [showModal, setShowModal] = React.useState(false);

    return (
      <div className="p-8">
        <GlassButton type="button"
              onClick={() => setShowModal(true)}>
          Open Modal
        </GlassButton>

        {showModal && (
          <GlassPortal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div
                className="fade-in absolute inset-0 animate-in bg-black/40 backdrop-blur-md" onClick={() => setShowModal(false)}
              />
              <div className="slide-in-from-bottom-4 relative z-10 w-full max-w-lg animate-in">
                <GlassCard className="p-8">
                  <h2 className="mb-4 font-bold text-2xl">Modal Dialog</h2>
                  <p className="mb-6 text-[var(--text-secondary)]">
                    This modal is rendered using a portal, ensuring it appears
                    above all other content regardless of z-index stacking
                    contexts in the parent components.
                  </p>
                  <div className="flex justify-end gap-3">
                    <GlassButton
                      type="button"
                      variant="ghost" onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </GlassButton>
                    <GlassButton
                      type="button"
                      variant="primary" onClick={() => setShowModal(false)}
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
        story: 'Modal dialog implementation using portal' ,
    },
  },
};

export const TooltipExample: Story = { render: () => { }
    const [tooltipVisible, setTooltipVisible] = React.useState<string | null>(
      null
    );
    const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0 }
      y: 0,
    });

    const showTooltip = (_id: string, event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition({ x: rect.left + rect.width / 2 }
        y: rect.top - 10,
      });
      setTooltipVisible(id);
    };

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Tooltip Portal Example</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            Hover over the buttons below to see tooltips rendered via portals.
          </p>

          <div className="flex flex-wrap gap-4">
            <GlassButton
              type="button"
              onMouseEnter={(e) => showTooltip('save', e)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              Save
            </GlassButton>

            <GlassButton
              type="button"
              variant="primary"
              onMouseEnter={(e) => showTooltip('publish', e)}
              onMouseLeave={() => setTooltipVisible(null)}
            >
              Publish
            </GlassButton>

            <GlassButton
              type="button"
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
                className="pointer-events-none fixed z-[10000]"
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y}px`,
                  transform: 'translate(-50%, -100%)',>
                <_div _className="glass-effect fade-in zoom-in-95 animate-in rounded-lg px-3 py-2 text-sm">
                  {tooltipVisible === 'save' && 'Save your changes'}
                  {tooltipVisible === 'publish' && 'Publish to production'}
                  {tooltipVisible === 'delete' && 'Delete permanently'}
                  <div className="-bottom-1 -translate-x-1/2 absolute left-1/2 h-2 w-2 rotate-45 bg-white/10" />
                </div>
              </div>
            </GlassPortal>
          )}
        </GlassCard>
      </div>
    );
  },
  parameters: { 
        story: 'Tooltips rendered via portal for proper positioning' ,
    },
  },
};

export const DropdownExample: Story = { render: () => { }
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [dropdownPosition, setDropdownPosition] = React.useState({ x: 0 }
      y: 0,
    });
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const toggleDropdown = () => {
      if (!dropdownOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({ x: rect.left }
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
          <h2 className="mb-4 font-bold text-xl">Dropdown Menu Portal</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            Click the button to open a dropdown menu rendered via portal.
          </p>

          <GlassButton type="button" ref={buttonRef} onClick={toggleDropdown}>
            Options Menu
          </GlassButton>

          {dropdownOpen && (
            <GlassPortal>
              <div
                className="fixed z-[9999]"
                style={{
                  left: `${dropdownPosition.x}px`,
                  top: `${dropdownPosition.y}px`,>
                <_div _className="glass-effect slide-in-from-top-2 min-w-[200px] animate-in rounded-lg p-2">
                  {menuItems.map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        item.action();
                        setDropdownOpen(false);
                      className="w-full rounded-md px-4 py-2 text-left transition-colors hover:bg-white/10"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div
                className="fixed inset-0 z-[9998]" onClick=() => setDropdownOpen(false)
              />
            </GlassPortal>
          )}
        </_GlassCard>
      </_div>
    );
  },
  parameters: { docs: {
      description: {
        story: 'Dropdown menu positioned using portal' }
      },
    },
  },
};

export const NestedPortals: Story = { render: () => { }
    const [showOuter, setShowOuter] = React.useState(false);
    const [showInner, setShowInner] = React.useState(false);

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Nested Portals Demo</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            This demonstrates how portals can be nested within each other.
          </p>

          <GlassButton type="button"
              onClick={() => setShowOuter(true)}>
            Open Outer Portal
          </GlassButton>

          {showOuter && (
            <GlassPortal>
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => {
                    setShowOuter(false);
                    setShowInner(false);
                  } onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => {
                    setShowOuter(false);
                    setShowInner(false);
                  )(e);
                />
                <GlassCard className="relative z-10 w-full max-w-md p-6">
                  <h3 className="mb-4 font-bold text-lg">Outer Portal</h3>
                  <p className="mb-4 text-[var(--text-secondary)]">
                    This is the outer portal content. You can open another
                    portal from here.
                  </p>

                  <div className="flex gap-3">
                    <GlassButton
                      type="button"
              onClick={() => setShowInner(true)}
                    >
                      Open Inner Portal
                    </GlassButton>
                    <GlassButton
                      type="button"
                      variant="ghost" onClick={() => setShowOuter(false)}
                    >
                      Close
                    </GlassButton>
                  </div>showInner && (
                    <GlassPortal>
                      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                        <div
                          className="absolute inset-0 bg-black/30" onClick=() => setShowInner(false)
                        />
                        <GlassCard className="relative z-10 w-full max-w-sm bg-blue-500/10 p-6">
                          <h4 className="mb-4 font-bold text-lg">
                            Inner Portal
                          </h4>
                          <p className="mb-4 text-[var(--text-secondary)]">
                            This portal is nested inside the outer portal.
                          </p>
                          <GlassButton
                            type="button"
                            variant="primary" onClick={() => setShowInner(false)}
                            fullWidth
                          >
                            Close Inner
                          </GlassButton>
                        </GlassCard>
                      </div>
                    </GlassPortal>
                  )
                </GlassCard>
              </div>
            </GlassPortal>
          )}
        </GlassCard>
      </div>
    );
  },
  parameters: 
        story: 'Demonstration of nested portals with proper z-index management' ,,
  },
};

export const CustomContainer: Story = { render: () => { }
    const [showPortal, setShowPortal] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
      <div className="p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Custom Container Portal</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            This portal renders into a custom container instead of
            document.body.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-medium">Control Area</h3>
              <GlassButton
                type="button"
              onClick={() => setShowPortal(!showPortal)}
              >
                Toggle Portal Content
              </GlassButton>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Portal Container</h3>
              <div
                ref={containerRef}
                className="glass-effect relative h-48 overflow-hidden rounded-lg p-4"
              >
                <p className="text-[var(--text-secondary)] text-sm">
                  Portal content will appear here
                </p>
              </div>
            </div>
          </div>

          {showPortal && containerRef.current && (
            <GlassPortal container={containerRef.current}>
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4">
                <div className="text-center">
                  <p className="mb-2 font-bold text-lg">Portal Content!</p>
                  <p className="text-[var(--text-secondary)] text-sm">
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
  parameters: { docs: {
      description: {
        story: 'Portal rendering into a custom container element' }
      },
    },
  },
};
