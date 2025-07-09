import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ComponentType } from 'react';
import { axe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';

// Define the toHaveNoViolations matcher type
declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toHaveNoViolations(): T;
    }
  }
}

// Custom render function with common providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any common providers here if needed
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  return render(ui, {
    // Add wrapper providers here if needed (e.g., ThemeProvider)
    ...options,
  });
};

// Common accessibility test helper
export const testAccessibility = async (
  container: HTMLElement
): Promise<AxeResults> => {
  const results = await axe(container);
  // Basic accessibility check - ensure no violations exist
  if (results.violations.length > 0) {
    console.error('Accessibility violations found:', results.violations);
    throw new Error(
      `Found ${results.violations.length} accessibility violations`
    );
  }
  return results;
};

// Common test patterns for glass components
export const getGlassComponentTestSuite = (componentName: string) => ({
  shouldRender: `renders ${componentName} correctly`,
  shouldApplyVariants: `applies ${componentName} variant classes correctly`,
  shouldHandleDisabled: `handles disabled state for ${componentName}`,
  shouldBeAccessible: `${componentName} should be accessible`,
  shouldSupportKeyboardNavigation: `${componentName} should support keyboard navigation`,
  shouldHaveProperARIA: `${componentName} should have proper ARIA attributes`,
});

// Common component prop tests
export const testCommonProps = (
  Component: ComponentType<any>,
  componentName: string
) => {
  return {
    className: (testFn: (container: Element) => void) => {
      const { container } = render(
        <Component className="custom-class">Test</Component>
      );
      testFn(container.firstChild as Element);
    },

    style: (testFn: (container: Element) => void) => {
      const { container } = render(
        <Component style={{ opacity: 0.5 }}>Test</Component>
      );
      testFn(container.firstChild as Element);
    },

    'data-testid': (testFn: (element: HTMLElement) => void) => {
      const { getByTestId } = render(
        <Component data-testid="test-component">Test</Component>
      );
      testFn(getByTestId('test-component'));
    },
  };
};

// Glass effect performance test helper
export const testGlassPerformance = (
  Component: ComponentType<any>,
  maxRenderTime = 100
) => {
  return () => {
    const start = performance.now();
    render(<Component>Performance Test</Component>);
    const end = performance.now();
    const renderTime = end - start;

    if (renderTime > maxRenderTime) {
      console.warn(
        `🐌 Slow glass effect in ${Component.displayName || 'Component'}: { renderTime: ${Math.round(renderTime)}, threshold: ${maxRenderTime}ms }`
      );
    }

    // Performance assertion with reasonable limit
    if (renderTime > 500) {
      throw new Error(
        `Component render time ${Math.round(renderTime)}ms exceeds limit of 500ms`
      );
    }
  };
};

// Keyboard navigation test helper
export const testKeyboardNavigation = (
  element: HTMLElement,
  expectedKeys: string[]
) => {
  expectedKeys.forEach(key => {
    element.focus();

    // Check if element has focus
    if (document.activeElement !== element) {
      throw new Error(`Element does not have focus for key: ${key}`);
    }

    // Test keyboard events
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  });
};

// Export everything from testing-library for convenience
export * from '@testing-library/react';
export { customRender as render };
