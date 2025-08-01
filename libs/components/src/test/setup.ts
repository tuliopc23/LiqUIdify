// Test setup file for LiqUIdify components
import { vi, beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

if (typeof global.window === 'undefined') {
  Object.defineProperty(global, 'window', {
    value: globalThis.window,
    writable: true
  });
}

if (typeof global.document === 'undefined') {
  Object.defineProperty(global, 'document', {
    value: globalThis.document,
    writable: true
  });
}

// Clean up after each test
afterEach(() => {
  cleanup();
});

if (typeof Element !== 'undefined') {
  Element.prototype.animate = vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    finish: vi.fn(),
    pause: vi.fn(),
    play: vi.fn(),
    reverse: vi.fn(),
    updatePlaybackRate: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Extend expect with common matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeDisabled(): R;
      toHaveTextContent(text: string): R;
    }
  }
}

// Simple implementations of common test matchers
const customMatchers = {
  toBeInTheDocument(received: any) {
    const pass = received && received.nodeType === 1; // Element node
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to be in document`
          : `Expected element to be in document`,
    };
  },

  toHaveClass(received: any, className: string) {
    const pass =
      received && received.className && received.className.includes(className);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have class "${className}"`
          : `Expected element to have class "${className}"`,
    };
  },

  toHaveAttribute(received: any, attr: string, value?: string) {
    const hasAttr = received && received.hasAttribute(attr);
    const pass =
      value !== undefined
        ? hasAttr && received.getAttribute(attr) === value
        : hasAttr;
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have attribute "${attr}"`
          : `Expected element to have attribute "${attr}"`,
    };
  },

  toBeDisabled(received: any) {
    const pass = received && received.disabled === true;
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to be disabled`
          : `Expected element to be disabled`,
    };
  },

  toHaveTextContent(received: any, text: string) {
    const pass =
      received && received.textContent && received.textContent.includes(text);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have text content "${text}"`
          : `Expected element to have text content "${text}"`,
    };
  },
};

// Extend the global expect if available
if (typeof globalThis !== "undefined" && (globalThis as any).expect && (globalThis as any).expect.extend) {
  (globalThis as any).expect.extend(customMatchers);
}

// Setup React Testing Library
beforeEach(() => {
  // Reset all mocks before each test
  vi.clearAllMocks();
});

export {};
