import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Basic test utilities to replace removed test infrastructure
// This is a minimal implementation to get tests working again

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add custom options here if needed
}

/**
 * Custom render function that wraps components with necessary providers
 */
const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  return render(ui, options);
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
