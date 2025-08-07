import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import { GlassFocusDemo } from "@/components/glass-focus-demo/glass-focus-demo";

const meta = {
  title: "Components/Glass Focus Demo",
  component: GlassFocusDemo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassFocusDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
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
  ),
};

export const KeyboardNavigationGuide: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive keyboard navigation guide with focus demo",
      },
    },
  },
};

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="max-w-4xl space-y-6 p-8">
      <GlassCard className="p-6">
        <h2 className="mb-4 font-bold text-xl">Accessibility Features</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">Focus Indicators</h3>
            <p className="mb-3 text-[var(--text-secondary)] text-sm">
              All interactive elements have visible focus indicators that meet
              WCAG contrast requirements.
            </p>
            <div className="flex gap-2">
              <GlassButton type="button" size="sm">
                Button 1
              </GlassButton>
              <GlassButton type="button" size="sm" variant="primary">
                Button 2
              </GlassButton>
              <GlassButton type="button" size="sm" variant="danger">
                Button 3
              </GlassButton>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Skip Links</h3>
            <p className="mb-3 text-[var(--text-secondary)] text-sm">
              Skip links allow keyboard users to quickly navigate to main
              content areas.
            </p>
            <div className="space-y-2">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-blue-600 px-4 py-2 text-white"
              >
                Skip to main content
              </a>
              <a
                href="#navigation"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 rounded bg-blue-600 px-4 py-2 text-white"
              >
                Skip to navigation
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Focus Management</h3>
            <p className="mb-3 text-[var(--text-secondary)] text-sm">
              Focus is properly managed when opening/closing modals, dropdowns,
              and other interactive elements.
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassFocusDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstration of accessibility features and focus management",
      },
    },
  },
};

export const FocusTrapping: Story = {
  render: () => {
    const [showModal, setShowModal] = React.useState(false);

    return (
      <div className="max-w-4xl space-y-6 p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Focus Trapping</h2>
          <p className="mb-4 text-[var(--text-secondary)]">
            When a modal or dialog is open, focus should be trapped within it to
            prevent users from accidentally navigating to background content.
          </p>
          <GlassButton type="button" onClick={() => setShowModal(true)}>
            Open Modal with Focus Trap
          </GlassButton>
        </GlassCard>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <GlassCard className="relative z-10 w-full max-w-md p-6">
              <h3 className="mb-4 font-bold text-lg">Modal Dialog</h3>
              <p className="mb-4 text-[var(--text-secondary)] text-sm">
                Focus is trapped within this modal. Use Tab to navigate between
                the buttons below, or press Escape to close.
              </p>
              <div className="flex justify-end gap-2">
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
        )}

        <GlassFocusDemo />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of focus trapping in modal dialogs",
      },
    },
  },
};
