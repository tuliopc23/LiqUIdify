import {
  render as rtlRender,
  type RenderOptions,
} from "@testing-library/react";
import React, { type ReactElement } from "react";

// Add any providers here
interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  // Add any global providers here (theme, router, etc.)
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };

// Helper to create mock components
export const createMockComponent = (name: string) => {
  return React.forwardRef<any, any>((props, ref) => (
    <div data-testid={`mock-${name}`} ref={ref} {...props} />
  ));
};

// Helper for async tests
export const waitForAsync = async (callback: () => void, timeout = 1000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      callback();
      return;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  callback(); // Let it throw
};
