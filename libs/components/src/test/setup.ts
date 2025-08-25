// Test setup file for React Testing Library and other testing utilities
import React from "react";
import { afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Clean up DOM after each test
afterEach(() => {
  cleanup();
  // Clear all mocks between tests
  vi.clearAllMocks();
  // Clear local storage
  if (typeof window !== "undefined") {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
});

// Set up global test environment
beforeAll(() => {
  // Set up DOM API mocks that need to be available globally
  if (typeof global !== "undefined") {
    // Mock Canvas API for device capability tests
    const mockCanvas = {
      getContext: vi.fn(() => ({
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        getImageData: vi.fn(() => ({ data: new Array(4) })),
        putImageData: vi.fn(),
        createImageData: vi.fn(() => ({ data: new Array(4) })),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        fillText: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        translate: vi.fn(),
        scale: vi.fn(),
        rotate: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        measureText: vi.fn(() => ({ width: 0 })),
        transform: vi.fn(),
        rect: vi.fn(),
        clip: vi.fn(),
      })),
      toDataURL: vi.fn(() => "data:image/png;base64,"),
      toBlob: vi.fn(),
    };

    // Mock HTMLCanvasElement
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: mockCanvas.getContext,
    });

    Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
      value: mockCanvas.toDataURL,
    });

    // Mock ResizeObserver for tests
    global.ResizeObserver = class ResizeObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    // Mock IntersectionObserver for tests
    global.IntersectionObserver = class IntersectionObserver {
      root: Element | null = null;
      rootMargin: string = "";
      thresholds: ReadonlyArray<number> = [];
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    } as unknown as typeof IntersectionObserver;

    // Mock requestAnimationFrame
    global.requestAnimationFrame = (callback: FrameRequestCallback) => {
      return setTimeout(callback, 16); // ~60fps
    };

    global.cancelAnimationFrame = (id: number) => {
      clearTimeout(id);
    };
  }

  // Mock console methods if needed (can be overridden in individual tests)
  if (!process.env.DEBUG_TESTS) {
    const noop = () => {};
    Object.assign(console, {
      // Keep console.error and console.warn for debugging
      debug: noop,
      info: noop,
      log: noop,
    });
  }

  // Mock window.getComputedStyle for better test performance
  if (typeof window !== "undefined") {
    Object.defineProperty(window, "getComputedStyle", {
      value: (_element: Element) => ({
        getPropertyValue: (property: string) => {
          // Return common defaults for CSS properties used in components
          const defaults: Record<string, string> = {
            "font-size": "16px",
            "font-family": "Arial, sans-serif",
            "line-height": "1.5",
            color: "#000000",
            "background-color": "rgba(0, 0, 0, 0)",
            opacity: "1",
            visibility: "visible",
            display: "block",
          };
          return defaults[property] || "";
        },
        // Add other commonly used methods
        getPropertyPriority: () => "",
        item: () => "",
        removeProperty: () => "",
        setProperty: () => {},
        length: 0,
        parentRule: null,
        cssFloat: "",
        cssText: "",
        animation: "",
        animationDelay: "",
        animationDirection: "",
        animationDuration: "",
        animationFillMode: "",
        animationIterationCount: "",
        animationName: "",
        animationPlayState: "",
        animationTimingFunction: "",
      }),
    });

    // Mock getBoundingClientRect for better test behavior
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();

    // Mock window.scrollTo to avoid jsdom warnings
    Object.defineProperty(window, "scrollTo", {
      value: vi.fn(),
      writable: true,
    });

    // Mock CSS.supports for graceful degradation tests
    if (!window.CSS) {
      (window as any).CSS = {
        supports: vi.fn(() => true),
        escape: vi.fn((str: string) => str),
      } as any;
    }

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });

    // Mock navigator.connection for device capability tests
    Object.defineProperty(navigator, "connection", {
      writable: true,
      value: {
        effectiveType: "4g",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
    });

    // Mock navigator.hardwareConcurrency
    Object.defineProperty(navigator, "hardwareConcurrency", {
      writable: true,
      value: 4,
    });

    // Mock navigator.deviceMemory
    Object.defineProperty(navigator, "deviceMemory", {
      writable: true,
      value: 8,
    });

    // Mock devicePixelRatio
    Object.defineProperty(window, "devicePixelRatio", {
      writable: true,
      value: 1,
    });
  }
});

// Export cleanup function for manual cleanup if needed
export { cleanup };

// Export commonly used testing utilities for easy importing - named exports to avoid ESM interop warnings
export {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  getByRole,
  getByText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByTestId,
  getAllByRole,
  getAllByText,
  getAllByTestId,
} from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// Mock framer-motion for tests to avoid animation complexity
vi.mock("framer-motion", () => ({
  motion: {
    div: "div",
    span: "span",
    button: "button",
    section: "section",
    article: "article",
    aside: "aside",
    header: "header",
    footer: "footer",
    nav: "nav",
    main: "main",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    a: "a",
    ul: "ul",
    ol: "ol",
    li: "li",
    form: "form",
    input: "input",
    textarea: "textarea",
    select: "select",
    option: "option",
    label: "label",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useMotionValue: (initial: any) => ({ get: () => initial, set: vi.fn() }),
  useTransform: (value: any, _input: any, _output: any) => value,
  useSpring: (value: any) => value,
}));

// Mock lucide-react icons to avoid SVG rendering issues
vi.mock("lucide-react", () => {
  const MockIcon = ({ "data-testid": testId, ...props }: any) => {
    return React.createElement("span", {
      "data-testid": testId || "mock-icon",
      ...props,
    });
  };

  return new Proxy(
    {},
    {
      get(_target, _prop) {
        return MockIcon;
      },
    },
  );
});

// Add custom matchers for glassmorphism and accessibility testing
expect.extend({
  toHaveGlassEffect(received: HTMLElement) {
    const style = window.getComputedStyle(received);
    const hasBackdropFilter =
      style.backdropFilter !== "none" && style.backdropFilter !== "";
    const hasBackground =
      style.background.includes("rgba") ||
      style.backgroundColor.includes("rgba");

    return {
      message: () =>
        hasBackdropFilter && hasBackground
          ? `Expected element not to have glass effect`
          : `Expected element to have glass effect (backdrop-filter and transparent background)`,
      pass: hasBackdropFilter && hasBackground,
    };
  },

  toHaveAriaLabel(received: HTMLElement, expectedLabel?: string) {
    const ariaLabel = received.getAttribute("aria-label");
    const ariaLabelledBy = received.getAttribute("aria-labelledby");
    const hasLabel = !!(ariaLabel || ariaLabelledBy);

    if (expectedLabel) {
      const matches = ariaLabel === expectedLabel;
      return {
        message: () =>
          matches
            ? `Expected element not to have aria-label "${expectedLabel}"`
            : `Expected element to have aria-label "${expectedLabel}", got "${ariaLabel}"`,
        pass: matches,
      };
    }

    return {
      message: () =>
        hasLabel
          ? `Expected element not to have aria-label`
          : `Expected element to have aria-label or aria-labelledby`,
      pass: hasLabel,
    };
  },
});

// Extend expect interface for TypeScript
declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toHaveGlassEffect(): T;
      toHaveAriaLabel(label?: string): T;
    }
  }
}
