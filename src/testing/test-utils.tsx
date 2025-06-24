/**
 * Testing Utilities
 * Common utilities for testing Glass UI components
 */

import React, { ReactElement } from 'react';
import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { ThemeProvider } from 'next-themes';

// Custom render function with theme provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark' | 'system';
  initialProps?: Record<string, any>;
}

export function renderWithTheme(
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult {
  const { theme = 'light', initialProps = {}, ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem={theme === 'system'}
        {...initialProps}
      >
        {children}
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock intersection observer for testing
export function mockIntersectionObserver() {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  });

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  });
}

// Mock resize observer for testing
export function mockResizeObserver() {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: mockResizeObserver,
  });

  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: mockResizeObserver,
  });
}

// Mock matchMedia for responsive testing
export function mockMatchMedia(matches: boolean = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Setup function for common mocks
export function setupTestEnvironment() {
  mockIntersectionObserver();
  mockResizeObserver();
  mockMatchMedia();

  // Mock requestAnimationFrame
  global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
  global.cancelAnimationFrame = jest.fn();

  // Mock getComputedStyle
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: () => '',
      display: 'block',
      visibility: 'visible',
      opacity: '1',
    }),
  });
}

// Cleanup function
export function cleanupTestEnvironment() {
  jest.restoreAllMocks();
  jest.clearAllTimers();
}

// Custom matchers for Glass UI components
export const customMatchers = {
  toHaveGlassEffect(received: HTMLElement) {
    const style = window.getComputedStyle(received);
    const hasBackdropFilter =
      style.backdropFilter && style.backdropFilter !== 'none';
    const hasBackground = style.background && style.background.includes('rgba');

    const pass = hasBackdropFilter && hasBackground;

    return {
      message: () =>
        pass
          ? `Expected element not to have glass effect`
          : `Expected element to have glass effect (backdrop-filter and rgba background)`,
      pass,
    };
  },

  toBeAccessible(received: HTMLElement) {
    // This would integrate with accessibility testing
    // For now, basic checks
    const hasAriaLabel = received.hasAttribute('aria-label');
    const hasRole = received.hasAttribute('role');
    const hasTabIndex = received.hasAttribute('tabindex');

    const pass =
      hasAriaLabel ||
      hasRole ||
      hasTabIndex ||
      received.tagName.toLowerCase() === 'button';

    return {
      message: () =>
        pass
          ? `Expected element not to be accessible`
          : `Expected element to be accessible (have aria-label, role, or be a semantic element)`,
      pass,
    };
  },

  toHaveFocusRing(received: HTMLElement) {
    received.focus();
    const style = window.getComputedStyle(received, ':focus-visible');
    const hasOutline = style.outline && style.outline !== 'none';
    const hasBoxShadow = style.boxShadow && style.boxShadow !== 'none';

    const pass = hasOutline || hasBoxShadow;

    return {
      message: () =>
        pass
          ? `Expected element not to have focus ring`
          : `Expected element to have focus ring (outline or box-shadow on focus)`,
      pass,
    };
  },
};

// Test data generators
export const testData = {
  // Generate test props for components
  generateProps: (overrides: Record<string, any> = {}) => ({
    id: 'test-component',
    className: 'test-class',
    'data-testid': 'test-component',
    ...overrides,
  }),

  // Generate accessibility props
  generateA11yProps: (overrides: Record<string, any> = {}) => ({
    'aria-label': 'Test component',
    role: 'button',
    tabIndex: 0,
    ...overrides,
  }),

  // Generate theme props
  generateThemeProps: (theme: 'light' | 'dark' = 'light') => ({
    'data-theme': theme,
    className: theme === 'dark' ? 'dark' : '',
  }),
};

// Component testing utilities
export class ComponentTester {
  private component: HTMLElement;

  constructor(component: HTMLElement) {
    this.component = component;
  }

  // Test if component has proper glass styling
  hasGlassEffect(): boolean {
    const style = window.getComputedStyle(this.component);
    return style.backdropFilter !== 'none' && style.background.includes('rgba');
  }

  // Test if component is accessible
  isAccessible(): boolean {
    return (
      this.component.hasAttribute('aria-label') ||
      this.component.hasAttribute('role') ||
      this.component.hasAttribute('tabindex') ||
      ['button', 'a', 'input', 'select', 'textarea'].includes(
        this.component.tagName.toLowerCase()
      )
    );
  }

  // Test if component has focus management
  hasFocusManagement(): boolean {
    this.component.focus();
    return document.activeElement === this.component;
  }

  // Test if component is responsive
  isResponsive(): boolean {
    const style = window.getComputedStyle(this.component);
    return (
      style.width.includes('%') ||
      style.maxWidth !== 'none' ||
      this.component.classList.toString().includes('responsive')
    );
  }

  // Run all tests
  runAllTests(): {
    glassEffect: boolean;
    accessibility: boolean;
    focusManagement: boolean;
    responsive: boolean;
  } {
    return {
      glassEffect: this.hasGlassEffect(),
      accessibility: this.isAccessible(),
      focusManagement: this.hasFocusManagement(),
      responsive: this.isResponsive(),
    };
  }
}

// Create component tester
export function createComponentTester(component: HTMLElement): ComponentTester {
  return new ComponentTester(component);
}

// Snapshot testing utilities
export function createSnapshot(component: ReactElement, name?: string) {
  const { container } = renderWithTheme(component);
  expect(container.firstChild).toMatchSnapshot(name);
}

// Visual regression testing setup
export function setupVisualTesting() {
  // This would integrate with tools like Percy, Chromatic, or Playwright
  return {
    takeScreenshot: async (name: string) => {
      // Mock implementation
      console.log(`Taking screenshot: ${name}`);
    },
    compareScreenshots: async (baseline: string, current: string) => {
      // Mock implementation
      return { passed: true, diff: null };
    },
  };
}

// Performance testing helpers
export function measureRenderTime(renderFn: () => void): number {
  const start = performance.now();
  renderFn();
  return performance.now() - start;
}

export function measureMemoryUsage(): number {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    return (performance as any).memory.usedJSHeapSize;
  }
  return 0;
}

// Export all utilities
export const testUtils = {
  render: renderWithTheme,
  setup: setupTestEnvironment,
  cleanup: cleanupTestEnvironment,
  mocks: {
    intersectionObserver: mockIntersectionObserver,
    resizeObserver: mockResizeObserver,
    matchMedia: mockMatchMedia,
  },
  matchers: customMatchers,
  data: testData,
  tester: createComponentTester,
  snapshot: createSnapshot,
  visual: setupVisualTesting,
  performance: {
    measureRenderTime,
    measureMemoryUsage,
  },
};
