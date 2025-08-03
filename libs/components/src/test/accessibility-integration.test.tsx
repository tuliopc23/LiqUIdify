/**
 * Accessibility Integration Tests
 * Comprehensive WCAG 2.1 AA compliance testing for component combinations
 */

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// Component imports
import {
  GlassModal,
  GlassButton,
  GlassInput,
  GlassCheckbox,
  GlassSelect,
  GlassFormField,
  GlassTabs,
  GlassBreadcrumbs,
  GlassMobileNav,
  GlassResponsiveButton,
  GlassResponsiveCard,
  GlassTable,
  GlassSearch,
  GlassErrorBoundary,
  GlassFocusTrap,
  GlassLiveRegion,
  GlassSkipNavigation,
  GlassVisuallyHidden,
  ThemeProvider,
  GlassToast,
  GlassAlert,
  GlassPopover,
  GlassAccordion,
  GlassDropdown,
  GlassDrawer,
  GlassProgress,
  GlassSlider,
  GlassSwitch,
  GlassTextarea,
  GlassDatePicker,
  GlassFileUpload,
  GlassNumberInput,
  GlassRadioGroup,
  GlassCheckboxGroup,
  GlassCombobox,
  GlassTooltip,
  GlassPagination,
  GlassTimeline,
  GlassTreeView,
  GlassChart,
  GlassSpinner,
  GlassLoading,
  GlassSkeleton,
  GlassAvatar,
  GlassBadge,
  GlassBanner,
  GlassCard,
  GlassAccordion as GlassAccordionAlias,
  GlassNotification,
  Navbar,
  Sidebar,
} from "../index";

// Accessibility manager was removed - using mock implementation
const accessibilityManager = {
  announce: (message: string) => console.debug(`Announced: ${message}`),
  validateComponent: async () => ({ violations: [], passes: [], score: 100 }),
};

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock media queries for responsive testing
const mockMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

// Mock ResizeObserver
const mockResizeObserver = vi.fn();
mockResizeObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

// Test data
const mockTableData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

const mockSelectOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const mockTreeData = [
  {
    id: "1",
    label: "Root Item",
    children: [
      { id: "1-1", label: "Child 1" },
      { id: "1-2", label: "Child 2" },
    ],
  },
];

describe("Accessibility Integration Tests", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();

    // Mock browser APIs
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(mockMatchMedia),
    });

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: mockIntersectionObserver,
    });

    Object.defineProperty(window, "ResizeObserver", {
      writable: true,
      value: mockResizeObserver,
    });

    // Mock getComputedStyle for contrast calculations
    Object.defineProperty(window, "getComputedStyle", {
      value: () => ({
        color: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255, 255, 255)",
        fontSize: "16px",
        fontWeight: "400",
      }),
    });

    // Clear any previous announcements
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Screen Reader Integration", () => {
    it("should announce form validation errors correctly", async () => {
      const mockAnnounce = vi.fn();
      vi.spyOn(accessibilityManager, "announce").mockImplementation(
        mockAnnounce,
      );

      const { container } = render(
        <ThemeProvider>
          <form>
            <GlassFormField
              label="Email"
              error="Please enter a valid email"
              required
            >
              <GlassInput
                type="email"
                placeholder="Enter your email"
                aria-invalid="true"
                aria-describedby="email-error"
              />
            </GlassFormField>
            <GlassButton type="submit">Submit</GlassButton>
          </form>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Verify error announcement
      expect(mockAnnounce).toHaveBeenCalledWith(
        expect.stringContaining("Please enter a valid email"),
        "assertive",
      );
    });

    it("should properly announce dynamic content changes", async () => {
      const mockAnnounce = vi.fn();
      vi.spyOn(accessibilityManager, "announce").mockImplementation(
        mockAnnounce,
      );

      const DynamicContent = () => {
        const [count, setCount] = React.useState(0);

        return (
          <ThemeProvider>
            <div>
              <GlassButton onClick={() => setCount((c) => c + 1)}>
                Increment
              </GlassButton>
              <GlassLiveRegion>
                <span>Count: {count}</span>
              </GlassLiveRegion>
            </div>
          </ThemeProvider>
        );
      };

      const { container } = render(<DynamicContent />);

      const button = screen.getByRole("button", { name: "Increment" });
      await user.click(button);

      await waitFor(() => {
        expect(mockAnnounce).toHaveBeenCalledWith(
          expect.stringContaining("Count: 1"),
          "polite",
        );
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should announce modal state changes", async () => {
      const mockAnnounce = vi.fn();
      vi.spyOn(accessibilityManager, "announce").mockImplementation(
        mockAnnounce,
      );

      const ModalTest = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <ThemeProvider>
            <GlassButton onClick={() => setIsOpen(true)}>
              Open Modal
            </GlassButton>
            <GlassModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Test Modal"
              aria-labelledby="modal-title"
            >
              <h2 id="modal-title">Modal Content</h2>
              <p>This is a test modal.</p>
              <GlassButton onClick={() => setIsOpen(false)}>Close</GlassButton>
            </GlassModal>
          </ThemeProvider>
        );
      };

      const { container } = render(<ModalTest />);

      const openButton = screen.getByRole("button", { name: "Open Modal" });
      await user.click(openButton);

      await waitFor(() => {
        expect(mockAnnounce).toHaveBeenCalledWith(
          expect.stringContaining("Modal opened"),
          "assertive",
        );
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Keyboard Navigation Flows", () => {
    it("should support complete form navigation with keyboard", async () => {
      const { container } = render(
        <ThemeProvider>
          <form>
            <GlassFormField label="Name" required>
              <GlassInput placeholder="Enter your name" />
            </GlassFormField>

            <GlassFormField label="Email" required>
              <GlassInput type="email" placeholder="Enter your email" />
            </GlassFormField>

            <GlassFormField label="Country">
              <GlassSelect
                options={mockSelectOptions}
                placeholder="Select country"
              />
            </GlassFormField>

            <GlassFormField label="Newsletter">
              <GlassCheckbox>Subscribe to newsletter</GlassCheckbox>
            </GlassFormField>

            <GlassButton type="submit">Submit</GlassButton>
          </form>
        </ThemeProvider>,
      );

      // Test tab navigation through form
      await user.tab();
      expect(screen.getByPlaceholderText("Enter your name")).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText("Enter your email")).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("combobox")).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("checkbox")).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("button", { name: "Submit" })).toHaveFocus();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should support keyboard navigation in complex layouts", async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassSkipNavigation href="#main-content">
              Skip to main content
            </GlassSkipNavigation>

            <Navbar>
              <GlassButton>Home</GlassButton>
              <GlassButton>About</GlassButton>
              <GlassButton>Contact</GlassButton>
            </Navbar>

            <GlassBreadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Current Page" },
              ]}
            />

            <main id="main-content">
              <GlassTabs defaultValue="tab1">
                <GlassTabs.List>
                  <GlassTabs.Trigger value="tab1">Tab 1</GlassTabs.Trigger>
                  <GlassTabs.Trigger value="tab2">Tab 2</GlassTabs.Trigger>
                </GlassTabs.List>
                <GlassTabs.Content value="tab1">
                  <GlassCard>
                    <h2>Tab 1 Content</h2>
                    <GlassButton>Action Button</GlassButton>
                  </GlassCard>
                </GlassTabs.Content>
              </GlassTabs>
            </main>
          </div>
        </ThemeProvider>,
      );

      // Test skip navigation
      await user.tab();
      const skipLink = screen.getByText("Skip to main content");
      expect(skipLink).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(document.getElementById("main-content")).toHaveFocus();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should handle arrow key navigation in menus and lists", async () => {
      const { container } = render(
        <ThemeProvider>
          <GlassDropdown>
            <GlassDropdown.Trigger>Menu</GlassDropdown.Trigger>
            <GlassDropdown.Content>
              <GlassDropdown.Item>Item 1</GlassDropdown.Item>
              <GlassDropdown.Item>Item 2</GlassDropdown.Item>
              <GlassDropdown.Item>Item 3</GlassDropdown.Item>
            </GlassDropdown.Content>
          </GlassDropdown>
        </ThemeProvider>,
      );

      const trigger = screen.getByRole("button", { name: "Menu" });
      await user.click(trigger);

      // Test arrow key navigation
      await user.keyboard("{ArrowDown}");
      expect(screen.getByText("Item 1")).toHaveFocus();

      await user.keyboard("{ArrowDown}");
      expect(screen.getByText("Item 2")).toHaveFocus();

      await user.keyboard("{ArrowUp}");
      expect(screen.getByText("Item 1")).toHaveFocus();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Focus Management", () => {
    it("should trap focus in modals correctly", async () => {
      const ModalWithFocusTrap = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <ThemeProvider>
            <GlassButton onClick={() => setIsOpen(true)}>
              Open Modal
            </GlassButton>
            <GlassModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <GlassFocusTrap>
                <h2>Modal Title</h2>
                <GlassInput placeholder="First input" />
                <GlassInput placeholder="Second input" />
                <GlassButton onClick={() => setIsOpen(false)}>
                  Close
                </GlassButton>
              </GlassFocusTrap>
            </GlassModal>
          </ThemeProvider>
        );
      };

      const { container } = render(<ModalWithFocusTrap />);

      const openButton = screen.getByRole("button", { name: "Open Modal" });
      await user.click(openButton);

      // Focus should be trapped within modal
      const firstInput = screen.getByPlaceholderText("First input");
      const secondInput = screen.getByPlaceholderText("Second input");
      const closeButton = screen.getByRole("button", { name: "Close" });

      // Tab through modal elements
      await user.tab();
      expect(firstInput).toHaveFocus();

      await user.tab();
      expect(secondInput).toHaveFocus();

      await user.tab();
      expect(closeButton).toHaveFocus();

      // Tab should cycle back to first element
      await user.tab();
      expect(firstInput).toHaveFocus();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should restore focus after modal closes", async () => {
      const ModalFocusRestore = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <ThemeProvider>
            <GlassButton onClick={() => setIsOpen(true)}>
              Open Modal
            </GlassButton>
            <GlassModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <h2>Modal Content</h2>
              <GlassButton onClick={() => setIsOpen(false)}>
                Close Modal
              </GlassButton>
            </GlassModal>
          </ThemeProvider>
        );
      };

      const { container } = render(<ModalFocusRestore />);

      const openButton = screen.getByRole("button", { name: "Open Modal" });
      await user.click(openButton);

      const closeButton = screen.getByRole("button", { name: "Close Modal" });
      await user.click(closeButton);

      // Focus should return to the open button
      await waitFor(() => {
        expect(openButton).toHaveFocus();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should manage focus in complex interactive components", async () => {
      const { container } = render(
        <ThemeProvider>
          <GlassAccordion type="single" collapsible>
            <GlassAccordion.Item value="item1">
              <GlassAccordion.Trigger>Section 1</GlassAccordion.Trigger>
              <GlassAccordion.Content>
                <GlassInput placeholder="Input in accordion" />
                <GlassButton>Button in accordion</GlassButton>
              </GlassAccordion.Content>
            </GlassAccordion.Item>
            <GlassAccordion.Item value="item2">
              <GlassAccordion.Trigger>Section 2</GlassAccordion.Trigger>
              <GlassAccordion.Content>
                <GlassTextarea placeholder="Textarea in accordion" />
              </GlassAccordion.Content>
            </GlassAccordion.Item>
          </GlassAccordion>
        </ThemeProvider>,
      );

      const firstTrigger = screen.getByRole("button", { name: "Section 1" });
      await user.click(firstTrigger);

      // Focus should move to first focusable element in opened section
      await user.tab();
      expect(screen.getByPlaceholderText("Input in accordion")).toHaveFocus();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("ARIA Integration", () => {
    it("should maintain proper ARIA relationships in complex forms", async () => {
      const { container } = render(
        <ThemeProvider>
          <form role="form" aria-labelledby="form-title">
            <h2 id="form-title">User Registration Form</h2>

            <GlassFormField
              label="Username"
              description="Must be at least 3 characters"
              error="Username is required"
              required
            >
              <GlassInput
                aria-describedby="username-desc username-error"
                aria-invalid="true"
              />
            </GlassFormField>

            <GlassRadioGroup
              name="account-type"
              aria-labelledby="account-type-label"
            >
              <legend id="account-type-label">Account Type</legend>
              <GlassRadioGroup.Item value="personal">
                Personal
              </GlassRadioGroup.Item>
              <GlassRadioGroup.Item value="business">
                Business
              </GlassRadioGroup.Item>
            </GlassRadioGroup>

            <GlassCheckboxGroup aria-labelledby="preferences-label">
              <legend id="preferences-label">Preferences</legend>
              <GlassCheckbox value="newsletter">Newsletter</GlassCheckbox>
              <GlassCheckbox value="updates">Product Updates</GlassCheckbox>
            </GlassCheckboxGroup>
          </form>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Verify ARIA relationships
      const usernameInput = screen.getByRole("textbox");
      expect(usernameInput).toHaveAttribute("aria-describedby");
      expect(usernameInput).toHaveAttribute("aria-invalid", "true");

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toHaveAttribute(
        "aria-labelledby",
        "account-type-label",
      );
    });

    it("should properly handle ARIA states in interactive components", async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassCombobox
              options={mockSelectOptions}
              placeholder="Search options..."
              aria-label="Search and select option"
            />

            <GlassPopover>
              <GlassPopover.Trigger aria-expanded="false">
                Show Details
              </GlassPopover.Trigger>
              <GlassPopover.Content>
                <p>Additional information here</p>
              </GlassPopover.Content>
            </GlassPopover>

            <GlassDrawer>
              <GlassDrawer.Trigger>Open Drawer</GlassDrawer.Trigger>
              <GlassDrawer.Content>
                <GlassDrawer.Header>
                  <GlassDrawer.Title>Drawer Title</GlassDrawer.Title>
                </GlassDrawer.Header>
                <p>Drawer content</p>
              </GlassDrawer.Content>
            </GlassDrawer>
          </div>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Test combobox ARIA states
      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-expanded");
      expect(combobox).toHaveAttribute("aria-autocomplete");
    });

    it("should maintain ARIA live regions for dynamic content", async () => {
      const DynamicARIATest = () => {
        const [status, setStatus] = React.useState("");
        const [progress, setProgress] = React.useState(0);

        return (
          <ThemeProvider>
            <div>
              <GlassButton
                onClick={() => {
                  setStatus("Loading...");
                  setProgress(50);
                  setTimeout(() => {
                    setStatus("Complete!");
                    setProgress(100);
                  }, 1000);
                }}
              >
                Start Process
              </GlassButton>

              <GlassProgress
                value={progress}
                aria-label="Process progress"
                aria-describedby="progress-status"
              />

              <div id="progress-status" aria-live="polite" aria-atomic="true">
                {status}
              </div>

              <GlassAlert variant="info" role="status" aria-live="polite">
                {status && `Status: ${status}`}
              </GlassAlert>
            </div>
          </ThemeProvider>
        );
      };

      const { container } = render(<DynamicARIATest />);

      const button = screen.getByRole("button", { name: "Start Process" });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Color Contrast", () => {
    it("should maintain proper contrast in all component combinations", async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassCard>
              <GlassCard.Header>
                <GlassCard.Title>Card Title</GlassCard.Title>
              </GlassCard.Header>
              <GlassCard.Content>
                <p>Card content with text</p>
                <GlassButton variant="primary">Primary Button</GlassButton>
                <GlassButton variant="secondary">Secondary Button</GlassButton>
                <GlassButton variant="outline">Outline Button</GlassButton>
              </GlassCard.Content>
            </GlassCard>

            <GlassBanner variant="info">
              <p>Information banner with text content</p>
            </GlassBanner>

            <GlassAlert variant="warning">
              <p>Warning alert with important information</p>
            </GlassAlert>

            <GlassNotification
              title="Notification Title"
              description="Notification description text"
            />
          </div>
        </ThemeProvider>,
      );

      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it("should handle contrast in interactive states", async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassButton className="hover:bg-blue-600 focus:bg-blue-700">
              Interactive Button
            </GlassButton>

            <GlassInput
              placeholder="Input with states"
              className="focus:border-blue-500"
            />

            <GlassSwitch aria-label="Toggle setting" />

            <GlassSlider
              defaultValue={[50]}
              max={100}
              step={1}
              aria-label="Volume control"
            />
          </div>
        </ThemeProvider>,
      );

      // Test focus states
      const button = screen.getByRole("button");
      await user.hover(button);
      await user.tab(); // Focus the button

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Reduced Motion", () => {
    it("should respect prefers-reduced-motion settings", async () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassModal isOpen={true} onClose={() => {}}>
              <h2>Animated Modal</h2>
              <p>This modal should respect reduced motion preferences</p>
            </GlassModal>

            <GlassToast
              title="Toast Notification"
              description="This should animate respectfully"
            />

            <GlassSpinner aria-label="Loading" />

            <GlassProgress value={75} aria-label="Progress" />
          </div>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Verify reduced motion classes are applied
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toHaveClass("motion-reduce:transition-none");
    });
  });

  describe("High Contrast Mode", () => {
    it("should work correctly in high contrast mode", async () => {
      // Mock high contrast media query
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-contrast: high)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassCard>
              <GlassCard.Content>
                <GlassButton>High Contrast Button</GlassButton>
                <GlassInput placeholder="High contrast input" />
                <GlassBadge>Badge</GlassBadge>
              </GlassCard.Content>
            </GlassCard>
          </div>
        </ThemeProvider>,
      );

      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe("Voice Control", () => {
    it("should support voice control with proper labels", async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassButton aria-label="Submit form">Submit</GlassButton>
            <GlassButton aria-label="Cancel action">Cancel</GlassButton>
            <GlassButton aria-label="Save changes">Save</GlassButton>

            <GlassInput aria-label="Email address" placeholder="Enter email" />

            <GlassSelect
              options={mockSelectOptions}
              aria-label="Select country"
            />

            <GlassCheckbox aria-label="Agree to terms">
              I agree to the terms and conditions
            </GlassCheckbox>
          </div>
        </ThemeProvider>,
      );

      // Verify all interactive elements have accessible names
      const submitButton = screen.getByRole("button", { name: "Submit form" });
      const cancelButton = screen.getByRole("button", {
        name: "Cancel action",
      });
      const saveButton = screen.getByRole("button", { name: "Save changes" });

      expect(submitButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
      expect(saveButton).toBeInTheDocument();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Form Accessibility", () => {
    it("should provide complete form accessibility with error handling", async () => {
      const FormAccessibilityTest = () => {
        const [errors, setErrors] = React.useState<Record<string, string>>({});
        const [submitted, setSubmitted] = React.useState(false);

        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          const newErrors: Record<string, string> = {};

          const formData = new FormData(e.target as HTMLFormElement);
          if (!formData.get("name")) {
            newErrors.name = "Name is required";
          }
          if (!formData.get("email")) {
            newErrors.email = "Email is required";
          }

          setErrors(newErrors);
          setSubmitted(true);

          if (Object.keys(newErrors).length === 0) {
            accessibilityManager.announce(
              "Form submitted successfully",
              "assertive",
            );
          } else {
            accessibilityManager.announce(
              `Form has ${Object.keys(newErrors).length} errors. Please review and correct.`,
              "assertive",
            );
          }
        };

        return (
          <ThemeProvider>
            <form onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Personal Information</legend>

                <GlassFormField label="Full Name" error={errors.name} required>
                  <GlassInput
                    name="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <div id="name-error" role="alert" aria-live="polite">
                      {errors.name}
                    </div>
                  )}
                </GlassFormField>

                <GlassFormField
                  label="Email Address"
                  error={errors.email}
                  required
                >
                  <GlassInput
                    name="email"
                    type="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "email-error" : "email-desc"
                    }
                  />
                  <div id="email-desc">We'll never share your email</div>
                  {errors.email && (
                    <div id="email-error" role="alert" aria-live="polite">
                      {errors.email}
                    </div>
                  )}
                </GlassFormField>

                <GlassFormField label="Date of Birth">
                  <GlassDatePicker name="dob" aria-describedby="dob-desc" />
                  <div id="dob-desc">Optional field</div>
                </GlassFormField>

                <GlassFormField label="Profile Picture">
                  <GlassFileUpload
                    name="avatar"
                    accept="image/*"
                    aria-describedby="avatar-desc"
                  />
                  <div id="avatar-desc">
                    Upload a profile picture (optional)
                  </div>
                </GlassFormField>
              </fieldset>

              <GlassButton type="submit">Submit Form</GlassButton>

              {submitted && Object.keys(errors).length > 0 && (
                <GlassAlert variant="error" role="alert" aria-live="assertive">
                  Please correct the errors above and try again.
                </GlassAlert>
              )}
            </form>
          </ThemeProvider>
        );
      };

      const { container } = render(<FormAccessibilityTest />);

      // Submit form with empty fields to trigger errors
      const submitButton = screen.getByRole("button", { name: "Submit Form" });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should handle complex form interactions accessibly", async () => {
      const { container } = render(
        <ThemeProvider>
          <form>
            <GlassFormField label="Quantity">
              <GlassNumberInput
                min={1}
                max={100}
                step={1}
                aria-describedby="quantity-desc"
              />
              <div id="quantity-desc">Enter quantity between 1 and 100</div>
            </GlassFormField>

            <GlassFormField label="Category">
              <GlassCombobox
                options={mockSelectOptions}
                placeholder="Search categories..."
                aria-describedby="category-desc"
              />
              <div id="category-desc">
                Type to search or select from dropdown
              </div>
            </GlassFormField>

            <GlassFormField label="Description">
              <GlassTextarea
                placeholder="Enter description..."
                maxLength={500}
                aria-describedby="desc-counter"
              />
              <div id="desc-counter">0/500 characters</div>
            </GlassFormField>

            <GlassFormField label="Priority">
              <GlassSlider
                defaultValue={[3]}
                max={5}
                min={1}
                step={1}
                aria-label="Priority level from 1 to 5"
              />
            </GlassFormField>
          </form>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Test number input accessibility
      const numberInput = screen.getByRole("spinbutton");
      expect(numberInput).toHaveAttribute("aria-describedby", "quantity-desc");

      // Test combobox accessibility
      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-describedby", "category-desc");
    });
  });

  describe("Complex Component Integration", () => {
    it("should handle data table with accessibility features", async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassSearch
              placeholder="Search users..."
              aria-label="Search users table"
            />

            <GlassTable
              data={mockTableData}
              columns={[
                { key: "name", header: "Name", sortable: true },
                { key: "email", header: "Email", sortable: true },
                { key: "role", header: "Role", sortable: false },
              ]}
              caption="User management table"
              aria-label="Users data table"
            />

            <GlassPagination
              currentPage={1}
              totalPages={5}
              onPageChange={() => {}}
              aria-label="Table pagination"
            />
          </div>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Verify table accessibility
      const table = screen.getByRole("table");
      expect(table).toHaveAttribute("aria-label", "Users data table");

      const searchInput = screen.getByRole("searchbox");
      expect(searchInput).toHaveAttribute("aria-label", "Search users table");
    });

    it("should handle timeline and tree view accessibility", async () => {
      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassTimeline
              items={[
                {
                  id: "1",
                  title: "Event 1",
                  description: "First event description",
                  date: "2024-01-01",
                },
                {
                  id: "2",
                  title: "Event 2",
                  description: "Second event description",
                  date: "2024-01-02",
                },
              ]}
              aria-label="Project timeline"
            />

            <GlassTreeView data={mockTreeData} aria-label="File system tree" />
          </div>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should handle chart and dashboard accessibility", async () => {
      const chartData = [
        { name: "Jan", value: 400 },
        { name: "Feb", value: 300 },
        { name: "Mar", value: 600 },
      ];

      const { container } = render(
        <ThemeProvider>
          <div>
            <GlassChart
              data={chartData}
              type="bar"
              title="Monthly Sales"
              aria-label="Monthly sales chart"
              aria-describedby="chart-desc"
            />
            <div id="chart-desc">
              Bar chart showing monthly sales data from January to March
            </div>

            <GlassCard>
              <GlassCard.Header>
                <GlassCard.Title>Dashboard Summary</GlassCard.Title>
              </GlassCard.Header>
              <GlassCard.Content>
                <div role="region" aria-labelledby="stats-heading">
                  <h3 id="stats-heading">Key Statistics</h3>
                  <GlassBadge variant="success">+15% Growth</GlassBadge>
                  <GlassBadge variant="info">42 Active Users</GlassBadge>
                </div>
              </GlassCard.Content>
            </GlassCard>
          </div>
        </ThemeProvider>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Error Boundary Integration", () => {
    it("should handle errors accessibly", async () => {
      const ProblematicComponent = ({
        shouldError,
      }: {
        shouldError: boolean;
      }) => {
        if (shouldError) {
          throw new Error("Test error");
        }
        return <div>Working component</div>;
      };

      const ErrorBoundaryTest = () => {
        const [hasError, setHasError] = React.useState(false);

        return (
          <ThemeProvider>
            <GlassErrorBoundary
              fallback={
                <GlassAlert variant="error" role="alert" aria-live="assertive">
                  <h2>Something went wrong</h2>
                  <p>An error occurred while loading this component.</p>
                  <GlassButton onClick={() => setHasError(false)}>
                    Try Again
                  </GlassButton>
                </GlassAlert>
              }
            >
              <ProblematicComponent shouldError={hasError} />
              <GlassButton onClick={() => setHasError(true)}>
                Trigger Error
              </GlassButton>
            </GlassErrorBoundary>
          </ThemeProvider>
        );
      };

      const { container } = render(<ErrorBoundaryTest />);

      const triggerButton = screen.getByRole("button", {
        name: "Trigger Error",
      });
      await user.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Loading and Skeleton States", () => {
    it("should handle loading states accessibly", async () => {
      const LoadingTest = () => {
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
          const timer = setTimeout(() => setIsLoading(false), 2000);
          return () => clearTimeout(timer);
        }, []);

        return (
          <ThemeProvider>
            {isLoading ? (
              <div>
                <GlassLoading aria-label="Loading content" />
                <GlassSkeleton
                  height="200px"
                  aria-label="Loading placeholder"
                />
                <GlassSpinner aria-label="Processing request" />
              </div>
            ) : (
              <GlassCard>
                <GlassCard.Content>
                  <h2>Loaded Content</h2>
                  <p>Content has finished loading.</p>
                </GlassCard.Content>
              </GlassCard>
            )}
          </ThemeProvider>
        );
      };

      const { container } = render(<LoadingTest />);

      // Verify loading state accessibility
      expect(screen.getByLabelText("Loading content")).toBeInTheDocument();
      expect(screen.getByLabelText("Loading placeholder")).toBeInTheDocument();
      expect(screen.getByLabelText("Processing request")).toBeInTheDocument();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
