// Test setup file for LiqUIdify components
import { vi, beforeEach } from "vitest";
import { JSDOM } from "jsdom";

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window as any;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLButtonElement = dom.window.HTMLButtonElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

global.Element.prototype.animate = vi.fn().mockReturnValue({
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

// Ensure document is available for React Testing Library
Object.defineProperty(global, 'document', {
  value: dom.window.document,
  writable: true
});

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
Object.defineProperty(global.window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
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
if (typeof globalThis !== "undefined" && globalThis.expect && globalThis.expect.extend) {
  globalThis.expect.extend(customMatchers);
}

// Setup React Testing Library
beforeEach(() => {
  // Reset all mocks before each test
  vi.clearAllMocks();
});

export {};
