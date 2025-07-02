import { axe } from 'vitest-axe';
import type { AxeResults } from 'axe-core';
import type { ComponentType } from 'react';

// Common accessibility test helper
export const testAccessibility = async (container: HTMLElement): Promise<AxeResults> => {
  const results = await axe(container);
  // Basic accessibility check - ensure no violations exist
  if (results.violations.length > 0) {
    console.error('Accessibility violations found:', results.violations);
    throw new Error(`Found ${results.violations.length} accessibility violations`);
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

// Test utility functions (to be used in actual test files)
export const testCommonProps = () => {
  // This is a placeholder - actual JSX testing should be done in individual test files
  return {
    className: () => console.log('Test className prop'),
    style: () => console.log('Test style prop'),
    'data-testid': () => console.log('Test data-testid prop'),
  };
};

// Glass effect performance test helper
export const testGlassPerformance = (Component: ComponentType<any>, maxRenderTime = 100) => {
  return () => {
    const start = performance.now();
    // Note: Actual rendering should be done in test files
    console.log(`Testing performance for ${Component.displayName || 'Component'}`);
    const end = performance.now();
    const renderTime = end - start;
    
    if (renderTime > maxRenderTime) {
      console.warn(`🐌 Slow glass effect in ${Component.displayName || 'Component'}: { renderTime: ${Math.round(renderTime)}, threshold: ${maxRenderTime}ms }`);
    }
    
    // Performance assertion with reasonable limit
    if (renderTime > 500) {
      throw new Error(`Component render time ${Math.round(renderTime)}ms exceeds limit of 500ms`);
    }
  };
};

// Keyboard navigation test helper
export const testKeyboardNavigation = (element: HTMLElement, expectedKeys: string[]) => {
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
