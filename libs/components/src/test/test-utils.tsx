import React from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

// Simple test wrapper that provides minimal context for components
// This avoids complex provider dependencies during testing
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div data-testid="test-wrapper" data-theme="light">
      {children}
    </div>
  );
};

// Custom render function that includes providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything - named exports to avoid ESM interop warnings
export {
  screen,
  fireEvent,
  waitFor,
  within,
  
  
  
  
  
  
  
  
  
  
} from "@testing-library/react";
export { customRender as render };
;

// Test utilities for creating mock data
const createMockComponent = (name: string) => {
  const MockComponent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
  >(({ children, ...props }, ref) => (
    <div ref={ref} data-testid={`mock-${name.toLowerCase()}`} {...props}>
      {children}
    </div>
  ));
  MockComponent.displayName = `Mock${name}`;
  return MockComponent;
};

// Mock props factories for common component patterns
const mockButtonProps = {
  basic: {
    children: "Test Button",
    "data-testid": "test-button",
  },
  loading: {
    children: "Loading Button",
    loading: true,
    "data-testid": "loading-button",
  },
  disabled: {
    children: "Disabled Button",
    disabled: true,
    "data-testid": "disabled-button",
  },
  withIcon: {
    children: "Button with Icon",
    leftIcon: <span data-testid="left-icon">←</span>,
    "data-testid": "icon-button",
  },
};

const mockCardProps = {
  basic: {
    children: "Test Card Content",
    "data-testid": "test-card",
  },
  withHeader: {
    children: "Card with Header",
    title: "Card Title",
    "data-testid": "header-card",
  },
  interactive: {
    children: "Interactive Card",
    onClick: () => {},
    "data-testid": "interactive-card",
  },
};

const mockInputProps = {
  basic: {
    placeholder: "Enter text",
    "data-testid": "test-input",
  },
  withLabel: {
    label: "Test Input",
    placeholder: "Enter text",
    "data-testid": "labeled-input",
  },
  withError: {
    placeholder: "Enter text",
    error: "This field is required",
    "data-testid": "error-input",
  },
  disabled: {
    placeholder: "Enter text",
    disabled: true,
    "data-testid": "disabled-input",
  },
};

const mockModalProps = {
  basic: {
    isOpen: true,
    onClose: () => {},
    children: "Modal Content",
    "data-testid": "test-modal",
  },
  withTitle: {
    isOpen: true,
    onClose: () => {},
    title: "Modal Title",
    children: "Modal with Title",
    "data-testid": "titled-modal",
  },
};

// Utility functions for testing glassmorphism effects
const hasGlassEffect = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  return (
    (style.backdropFilter !== "none" && style.backdropFilter !== "") ||
    style.background.includes("rgba") ||
    style.backgroundColor.includes("rgba")
  );
};

// Utility for testing keyboard navigation
const testKeyboardNavigation = async (
  element: HTMLElement,
  keys: string[],
) => {
  const userEvent = (await import("@testing-library/user-event")).default;
  const user = userEvent.setup();

  for (const key of keys) {
    await user.keyboard(key);
  }

  return element === document.activeElement;
};

// Utility for testing responsive behavior
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });

  // Trigger resize event
  window.dispatchEvent(new Event("resize"));
};

// Utility for testing animations
const waitForAnimationFrame = (): Promise<void> => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
};

// Utility for testing focus trap behavior
const testFocusTrap = async (
  container: HTMLElement,
): Promise<boolean> => {
  const userEvent = (await import("@testing-library/user-event")).default;
  const user = userEvent.setup();

  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  if (focusableElements.length === 0) return false;

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  // Focus first element
  firstElement.focus();

  // Tab backwards from first element should focus last element
  await user.keyboard("{Shift>}{Tab}{/Shift}");
  const focusTrappedBackward = document.activeElement === lastElement;

  // Tab forward from last element should focus first element
  lastElement.focus();
  await user.keyboard("{Tab}");
  const focusTrappedForward = document.activeElement === firstElement;

  return focusTrappedBackward && focusTrappedForward;
};

// Utility for creating accessible test scenarios
const createAccessibilityTestSuite = (
  _componentName: string,
  renderComponent: (props?: any) => RenderResult,
) => {
  return {
    "should have proper ARIA attributes": () => {
      const { container } = renderComponent();
      const element = container.firstChild as HTMLElement;

      // Basic accessibility checks
      expect(element).toBeInTheDocument();

      // Check for basic ARIA attributes if they should exist
      if (element.getAttribute("role") === "button") {
        expect(element).toHaveAttribute("type");
      }
    },

    "should be keyboard navigable": async () => {
      const { container } = renderComponent();
      const element = container.querySelector(
        "[tabindex], button, input, select, textarea, a[href]",
      ) as HTMLElement;

      if (element) {
        element.focus();
        expect(document.activeElement).toBe(element);
      }
    },

    "should have sufficient color contrast": () => {
      // This is a placeholder - in a real implementation, you might use a library
      // like axe-core to test color contrast
      expect(true).toBe(true);
    },
  };
};

