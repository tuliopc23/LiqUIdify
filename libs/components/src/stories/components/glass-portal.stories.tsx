import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "lucide-react";
import React from "react";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import { GlassPortal } from "@/components/glass-portal/glass-portal";

const meta = {
  title: "Components/Glass Portal",
  component: GlassPortal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    container: {
      description: "DOM element to render the portal into",
      control: false,
    },
    children: {
      description: "Content to render in the portal",
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
      <div className="max-w-2xl p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Portal Demo</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            Click the button to render content in a portal. The content will be
            rendered at the end of the document body, outside of this card's DOM
            hierarchy.
          </p>

          <GlassButton type="button" onClick={() => setShowPortal(true)}>
            Open Portal Content
          </GlassButton>

          {showPortal && (
            <GlassPortal>
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                  onClick={() => setShowPortal(false)}
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
        <GlassButton type="button" onClick={() => setShowModal(true)}>
          Open Modal
        </GlassButton>

        {showModal && (
          <GlassPortal>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div
                className="fade-in absolute inset-0 animate-in bg-black/40 backdrop-blur-md"
                onClick={() => setShowModal(false)}
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
                      variant="ghost"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </GlassButton>
                    <GlassButton
                      type="button"
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
        story: "Portal used for modal dialogs with proper z-index stacking",
      },
    },
  },
};

export const TooltipExample: Story = {
  render: () => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState({
      x: 0,
      y: 0,
    });
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseEnter = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
      setShowTooltip(true);
    };

    const handleMouseLeave = () => {
      setShowTooltip(false);
    };

    return (
      <div className="flex min-h-[300px] items-center justify-center p-8">
        <GlassButton
          ref={buttonRef}
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hover for Tooltip
        </GlassButton>

        {showTooltip && (
          <GlassPortal>
            <div
              className="pointer-events-none fixed z-50"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="fade-in animate-in rounded-lg bg-black/80 px-3 py-2 text-white text-sm backdrop-blur-sm">
                This tooltip is rendered in a portal
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/80" />
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
        story:
          "Portal used for tooltips that need to escape overflow constraints",
      },
    },
  },
};

export const NestedPortals: Story = {
  render: () => {
    const [showFirstModal, setShowFirstModal] = React.useState(false);
    const [showSecondModal, setShowSecondModal] = React.useState(false);

    return (
      <div className="p-8">
        <GlassButton type="button" onClick={() => setShowFirstModal(true)}>
          Open First Modal
        </GlassButton>

        {showFirstModal && (
          <GlassPortal>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setShowFirstModal(false)}
              />
              <GlassCard className="relative z-10 w-full max-w-md p-6">
                <h3 className="mb-4 font-bold text-lg">First Modal</h3>
                <p className="mb-4 text-[var(--text-secondary)] text-sm">
                  This is the first modal. You can open another modal from here
                  to see how nested portals work.
                </p>
                <div className="flex justify-end gap-2">
                  <GlassButton
                    type="button"
                    variant="ghost"
                    onClick={() => setShowFirstModal(false)}
                  >
                    Close
                  </GlassButton>
                  <GlassButton
                    type="button"
                    variant="primary"
                    onClick={() => setShowSecondModal(true)}
                  >
                    Open Second Modal
                  </GlassButton>
                </div>
              </GlassCard>
            </div>
          </GlassPortal>
        )}

        {showSecondModal && (
          <GlassPortal>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={() => setShowSecondModal(false)}
              />
              <GlassCard className="relative z-10 w-full max-w-sm p-6">
                <h3 className="mb-4 font-bold text-lg">Second Modal</h3>
                <p className="mb-4 text-[var(--text-secondary)] text-sm">
                  This is a nested modal rendered in its own portal with a
                  higher z-index.
                </p>
                <div className="flex justify-end gap-2">
                  <GlassButton
                    type="button"
                    variant="primary"
                    onClick={() => setShowSecondModal(false)}
                  >
                    Close
                  </GlassButton>
                </div>
              </GlassCard>
            </div>
          </GlassPortal>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple nested portals with proper z-index management",
      },
    },
  },
};

export const CustomContainer: Story = {
  render: () => {
    const [showPortal, setShowPortal] = React.useState(false);
    const [customContainer, setCustomContainer] =
      React.useState<HTMLElement | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (containerRef.current) {
        setCustomContainer(containerRef.current);
      }
    }, []);

    return (
      <div className="space-y-6 p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Custom Portal Container</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            This example shows how to render portal content into a custom
            container instead of document.body.
          </p>

          <GlassButton type="button" onClick={() => setShowPortal(true)}>
            Open Portal in Custom Container
          </GlassButton>

          {showPortal && customContainer && (
            <GlassPortal container={customContainer}>
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 backdrop-blur-sm">
                <GlassCard className="w-full max-w-xs p-4">
                  <h3 className="mb-2 font-bold">Portal Content</h3>
                  <p className="mb-4 text-[var(--text-secondary)] text-sm">
                    This content is rendered in the custom container below.
                  </p>
                  <GlassButton
                    type="button"
                    size="sm"
                    onClick={() => setShowPortal(false)}
                  >
                    Close
                  </GlassButton>
                </GlassCard>
              </div>
            </GlassPortal>
          )}
        </GlassCard>

        <div
          ref={containerRef}
          className="relative h-64 rounded-lg border-2 border-dashed border-white/20 bg-white/5 p-4"
        >
          <h3 className="mb-2 font-bold">Custom Portal Container</h3>
          <p className="text-[var(--text-secondary)] text-sm">
            Portal content will be rendered inside this container instead of
            document.body.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Portal with custom container element",
      },
    },
  },
};
