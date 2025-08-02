import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import { GlassCheckbox } from "@/components/glass-checkbox/glass-checkbox";
import { GlassFocusTrap } from "@/components/glass-focus-trap/glass-focus-trap";
import { GlassInput } from "@/components/glass-input/glass-input";

const meta = {
  title: "Components/Glass Focus Trap",
  component: GlassFocusTrap,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    active: {
      description: "Whether the focus trap is active",
      control: { type: "boolean" },
    },
    returnFocus: {
      description: "Return focus to the trigger element when deactivated",
      control: { type: "boolean" },
    },
    initialFocus: {
      description: "Selector or element to focus when activated",
      control: false,
    },
    allowOutsideClick: {
      description: "Allow clicks outside the trap",
      control: { type: "boolean" },
    },
    escapeDeactivates: {
      description: "Deactivate trap when Escape key is pressed",
      control: { type: "boolean" },
    },
    onDeactivate: {
      description: "Callback when focus trap is deactivated",
      action: "deactivated",
    },
  },
} satisfies Meta<typeof GlassFocusTrap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isActive, setIsActive] = React.useState(false);

    return (
      <div className="space-y-4 p-8">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-bold text-2xl">Focus Trap Demo</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Click the button below to activate the focus trap. Use Tab and
            Shift+Tab to navigate.
          </p>
          <GlassButton type="button" onClick={() => setIsActive(true)}>
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
                    variant="ghost"
                    onClick={() => setIsActive(false)}
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

export const ModalExample: Story = {
  render: () => {
    const [showModal, setShowModal] = React.useState(false);

    return (
      <div className="p-8">
        <GlassButton type="button" onClick={() => setShowModal(true)}>
          Open Modal with Focus Trap
        </GlassButton>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <GlassFocusTrap
              active={showModal}
              returnFocus
              escapeDeactivates
              onDeactivate={() => setShowModal(false)}
            >
              <GlassCard className="relative z-10 w-full max-w-lg p-8">
                <h2 className="mb-4 font-bold text-2xl">Modal Dialog</h2>
                <p className="mb-6 text-[var(--text-secondary)]">
                  This modal demonstrates focus trapping. Focus is constrained
                  within this dialog and will cycle between the interactive
                  elements.
                </p>

                <form className="space-y-4">
                  <div>
                    <label className="mb-2 block font-medium text-sm">
                      Name
                    </label>
                    <GlassInput placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-sm">
                      Email
                    </label>
                    <GlassInput type="email" placeholder="Enter your email" />
                  </div>
                  <GlassCheckbox>
                    I agree to the terms and conditions
                  </GlassCheckbox>

                  <div className="flex justify-end gap-3 pt-4">
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
                      Submit
                    </GlassButton>
                  </div>
                </form>
              </GlassCard>
            </GlassFocusTrap>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Focus trap used in a modal dialog with form elements",
      },
    },
  },
};

export const NestedTraps: Story = {
  render: () => {
    const [outerActive, setOuterActive] = React.useState(false);
    const [innerActive, setInnerActive] = React.useState(false);

    return (
      <div className="space-y-4 p-8">
        <div className="text-center">
          <h2 className="mb-4 font-bold text-2xl">Nested Focus Traps</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Demonstrates how focus traps can be nested within each other.
          </p>
          <GlassButton type="button" onClick={() => setOuterActive(true)}>
            Open Outer Trap
          </GlassButton>
        </div>

        {outerActive && (
          <GlassFocusTrap
            active={outerActive && !innerActive}
            returnFocus
            escapeDeactivates
            onDeactivate={() => setOuterActive(false)}
          >
            <GlassCard className="mx-auto max-w-2xl p-6">
              <h3 className="mb-4 font-bold text-lg">Outer Focus Trap</h3>
              <p className="mb-4 text-[var(--text-secondary)] text-sm">
                This is the outer focus trap. You can open an inner trap from
                here.
              </p>

              <div className="mb-4 flex gap-2">
                <GlassButton type="button" size="sm">
                  Button 1
                </GlassButton>
                <GlassButton type="button" size="sm">
                  Button 2
                </GlassButton>
                <GlassButton
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={() => setInnerActive(true)}
                >
                  Open Inner Trap
                </GlassButton>
              </div>

              {innerActive && (
                <GlassFocusTrap
                  active={innerActive}
                  returnFocus
                  escapeDeactivates
                  onDeactivate={() => setInnerActive(false)}
                >
                  <div className="rounded-lg border-2 border-blue-500/30 bg-blue-500/10 p-4">
                    <h4 className="mb-2 font-bold">Inner Focus Trap</h4>
                    <p className="mb-3 text-[var(--text-secondary)] text-sm">
                      Focus is now trapped in this inner area.
                    </p>
                    <div className="flex gap-2">
                      <GlassButton
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setInnerActive(false)}
                      >
                        Close Inner
                      </GlassButton>
                      <GlassButton type="button" size="sm">
                        Inner Action
                      </GlassButton>
                    </div>
                  </div>
                </GlassFocusTrap>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <GlassButton
                  type="button"
                  variant="ghost"
                  onClick={() => setOuterActive(false)}
                >
                  Close Outer
                </GlassButton>
                <GlassButton type="button" variant="primary">
                  Outer Action
                </GlassButton>
              </div>
            </GlassCard>
          </GlassFocusTrap>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of nested focus traps working together",
      },
    },
  },
};

export const CustomInitialFocus: Story = {
  render: () => {
    const [isActive, setIsActive] = React.useState(false);
    const submitButtonRef = React.useRef<HTMLButtonElement>(null);

    return (
      <div className="space-y-4 p-8">
        <div className="text-center">
          <h2 className="mb-4 font-bold text-2xl">Custom Initial Focus</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            Focus trap with custom initial focus target.
          </p>
          <GlassButton type="button" onClick={() => setIsActive(true)}>
            Activate Trap (Focus Submit Button)
          </GlassButton>
        </div>

        {isActive && (
          <GlassFocusTrap
            active={isActive}
            returnFocus
            escapeDeactivates
            initialFocus={submitButtonRef.current}
            onDeactivate={() => setIsActive(false)}
          >
            <GlassCard className="mx-auto max-w-md p-6">
              <h3 className="mb-4 font-bold text-lg">Custom Focus Target</h3>
              <p className="mb-4 text-[var(--text-secondary)] text-sm">
                When this trap activates, focus goes directly to the Submit
                button instead of the first focusable element.
              </p>

              <form className="space-y-4">
                <GlassInput placeholder="First input (not focused)" />
                <GlassInput placeholder="Second input" />
                <GlassCheckbox>Checkbox option</GlassCheckbox>

                <div className="flex justify-end gap-2">
                  <GlassButton
                    type="button"
                    variant="ghost"
                    onClick={() => setIsActive(false)}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    ref={submitButtonRef}
                    type="button"
                    variant="primary"
                  >
                    Submit (Initial Focus)
                  </GlassButton>
                </div>
              </form>
            </GlassCard>
          </GlassFocusTrap>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Focus trap with custom initial focus element",
      },
    },
  },
};
