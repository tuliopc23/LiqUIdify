// Test setup file for Bun
import { expect } from 'bun:test';

// Add custom matchers for React testing
expect.extend({
  toBeInTheDocument(received: any) {
    const pass = received && document.body.contains(received);
    return {
      pass,
      message: () =>
        pass
          ? "expected element not to be in the document"
          : "expected element to be in the document",
    };
  },
  toHaveClass(received: HTMLElement, className: string) {
    const pass = received && received.classList && received.classList.contains(className);
    return {
      pass,
      message: () =>
        pass
          ? `expected element not to have class "${className}"`
          : `expected element to have class "${className}"`,
    };
  },
  toBeDisabled(received: HTMLElement) {
    const pass = received && received.hasAttribute('disabled');
    return {
      pass,
      message: () =>
        pass
          ? "expected element not to be disabled"
          : "expected element to be disabled",
    };
  },
});

// Setup global test environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};