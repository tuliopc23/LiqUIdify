import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { GlassUIProvider } from '@/providers/glass-ui-provider';
import { vi } from 'vitest';

// Custom render function that includes providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <GlassUIProvider theme="light" hapticConfig={{ enableVibration: false }}>
        {children}
      </GlassUIProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

// Helper to test component accessibility
export async function testA11y(container: HTMLElement) {
  const axe = await import('axe-core');
  const results = await axe.run(container);
  expect(results.violations).toHaveLength(0);
}

// Helper to create mock props
export function createMockProps<T>(overrides?: Partial<T>): T {
  return {
    onClick: vi.fn(),
    onChange: vi.fn(),
    onFocus: vi.fn(),
    onBlur: vi.fn(),
    ...overrides,
  } as T;
}

// Helper to test keyboard navigation
export function testKeyboardNavigation(
  element: HTMLElement,
  expectedOrder: HTMLElement[]
) {
  expectedOrder.forEach((expected, index) => {
    if (index > 0) {
      element.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      );
    }
    expect(document.activeElement).toBe(expected);
  });
}

// Helper to test focus trap
export function testFocusTrap(container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  expect(focusableElements.length).toBeGreaterThan(0);

  // Test forward tab
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement;

  firstElement.focus();
  expect(document.activeElement).toBe(firstElement);

  // Tab from last element should go to first
  lastElement.focus();
  lastElement.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
  );
  expect(document.activeElement).toBe(firstElement);
}

// Helper to wait for animations
export function waitForAnimation(duration = 300) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// Helper to test loading states
export async function testLoadingState(
  getByTestId: (id: string) => HTMLElement,
  trigger: () => void,
  loadingTestId: string
) {
  trigger();

  // Check loading state appears
  expect(getByTestId(loadingTestId)).toBeInTheDocument();

  // Wait for loading to complete
  await waitForAnimation();

  // Check loading state is gone
  expect(() => getByTestId(loadingTestId)).toThrow();
}

// Helper to test theme changes
export function testThemeChange(
  container: HTMLElement,
  toggleTheme: () => void
) {
  const initialTheme = document.documentElement.getAttribute('data-theme');

  toggleTheme();

  const newTheme = document.documentElement.getAttribute('data-theme');
  expect(newTheme).not.toBe(initialTheme);

  // Check that components respond to theme change
  const themedElements = container.querySelectorAll('[class*="glass-"]');
  expect(themedElements.length).toBeGreaterThan(0);
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
