import { act, renderHook } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "bun:test";
import * as hooks from "./use-ssr-safe-hooks";

describe("SSR-Safe Hooks", () => {
  // Store original global implementations to restore after tests
  let originalGlobals: {
    IntersectionObserver: typeof global.IntersectionObserver;
    matchMedia: typeof window.matchMedia | undefined;
    addEventListener: typeof window.addEventListener | undefined;
    innerWidth: number | undefined;
    innerHeight: number | undefined;
    navigator: {
      onLine: boolean | undefined;
      connection: any;
    };
    document: typeof global.document;
    window: typeof global.window;
  };

  beforeAll(() => {
    // Store original globals
    originalGlobals = {
      IntersectionObserver: global.IntersectionObserver,
      matchMedia:
        typeof global.window !== "undefined"
          ? global.window.matchMedia
          : undefined,
      addEventListener:
        typeof global.window !== "undefined"
          ? global.window.addEventListener
          : undefined,
      innerWidth:
        typeof global.window !== "undefined"
          ? global.window.innerWidth
          : undefined,
      innerHeight:
        typeof global.window !== "undefined"
          ? global.window.innerHeight
          : undefined,
      navigator: {
        onLine:
          typeof global.navigator !== "undefined"
            ? global.navigator.onLine
            : undefined,
        connection:
          typeof global.navigator !== "undefined"
            ? (global.navigator as any).connection
            : undefined,
      },
      document: global.document,
      window: global.window,
    };

    // Setup DOM environment with a more complete mock
    // Create a realistic DOM element mock that React will accept
    class MockElement {
      nodeType = 1;
      nodeName = "DIV";
      tagName = "DIV";
      className = "";
      id = "";
      children: MockElement[] = [];
      childNodes: MockElement[] = [];
      parentNode: MockElement | null = null;
      ownerDocument: any = null;
      style: any = {};

      appendChild = jest.fn((child: MockElement) => {
        child.parentNode = this;
        this.children.push(child);
        this.childNodes.push(child);
        return child;
      });

      removeChild = jest.fn((child: MockElement) => {
        const index = this.children.indexOf(child);
        if (index > -1) {
          this.children.splice(index, 1);
          this.childNodes.splice(index, 1);
          child.parentNode = null;
        }
        return child;
      });

      hasAttribute = jest.fn(() => false);
      getAttribute = jest.fn(() => null);
      setAttribute = jest.fn();
      addEventListener = jest.fn();
      removeEventListener = jest.fn();

      // Add properties that React checks for
      get firstChild(): MockElement | null {
        return (this as MockElement).childNodes[0] || null;
      }

      get lastChild(): MockElement | null {
        return (
          (this as MockElement).childNodes[
            (this as MockElement).childNodes.length - 1
          ] || null
        );
      }

      get nextSibling(): MockElement | null {
        return null;
      }

      get previousSibling(): MockElement | null {
        return null;
      }
    }

    // Ensure proper prototype chain for instanceof checks
    global.Element = MockElement as any;
    global.HTMLElement = MockElement as any;
    global.Node = MockElement as any;

    const mockElement = () => new MockElement();

    // Create body and documentElement
    const mockBody = mockElement();
    const mockDocumentElement = mockElement();

    // Mock window first
    global.window = {
      innerWidth: 1024,
      innerHeight: 768,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      getComputedStyle: jest.fn(() => ({})),
      matchMedia: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
      // Add more window properties
      location: { href: "http://localhost" },
      history: { pushState: jest.fn(), replaceState: jest.fn() },
      navigator: { userAgent: "test" },
    } as any;

    // Mock document with defaultView directly assigned to window from the start
    global.document = {
      createElement: jest.fn(() => mockElement()),
      createTextNode: jest.fn((text: string) => ({
        nodeType: 3,
        nodeValue: text,
        textContent: text,
      })),
      body: mockBody,
      documentElement: mockDocumentElement,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      // Add more properties that React might check
      defaultView: global.window,
      head: mockElement(),
      contains: jest.fn(() => true),
    } as any;

    // Set up circular references
    global.window.document = global.document;
    mockBody.ownerDocument = global.document;
    mockDocumentElement.ownerDocument = global.document;

    global.navigator = {
      onLine: true,
      connection: undefined, // Will be mocked in specific tests
    } as any;

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      takeRecords: jest.fn(),
      root: null,
      rootMargin: "",
      thresholds: [],
    })) as any;

    // Initially undefined, will be mocked in tests
    // @ts-ignore - Intentionally setting to undefined for testing
    global.IntersectionObserver = undefined;
  });

  afterAll(() => {
    // Restore original globals
    global.IntersectionObserver = originalGlobals.IntersectionObserver;
    global.document = originalGlobals.document;
    global.window = originalGlobals.window;
    global.navigator = {
      ...global.navigator,
      onLine: originalGlobals.navigator.onLine,
      connection: originalGlobals.navigator.connection,
    } as any;

    // Restore window properties if they existed
    if (originalGlobals.matchMedia !== undefined) {
      global.window.matchMedia = originalGlobals.matchMedia;
    }
    if (originalGlobals.addEventListener !== undefined) {
      global.window.addEventListener = originalGlobals.addEventListener;
    }
    if (originalGlobals.innerWidth !== undefined) {
      Object.defineProperty(global.window, "innerWidth", {
        value: originalGlobals.innerWidth,
        writable: true,
        configurable: true,
      });
    }
    if (originalGlobals.innerHeight !== undefined) {
      Object.defineProperty(global.window, "innerHeight", {
        value: originalGlobals.innerHeight,
        writable: true,
        configurable: true,
      });
    }
  });

  describe("_isSSR", () => {
    it("should return false in client environment", () => {
      expect(hooks._isSSR()).toBe(false);
    });
  });

  describe("_useSSRSafe", () => {
    it("should execute callback in client environment", () => {
      const callback = jest.fn();
      renderHook(() => hooks._useSSRSafe(callback, []));
      expect(callback).toHaveBeenCalled();
    });
  });

  describe("_useIntersectionObserver", () => {
    let mockIntersectionObserver: any;
    let mockObserve: jest.Mock;
    let mockDisconnect: jest.Mock;
    let observerCallback: (entries: IntersectionObserverEntry[]) => void;

    beforeEach(() => {
      mockObserve = jest.fn();
      mockDisconnect = jest.fn();

      mockIntersectionObserver = jest.fn((callback) => {
        observerCallback = callback;
        return {
          observe: mockObserve,
          disconnect: mockDisconnect,
          unobserve: jest.fn(),
        };
      });

      global.IntersectionObserver = mockIntersectionObserver;
    });

    it("should create IntersectionObserver and observe element", () => {
      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref] = result.current;

      // Create a mock element and assign to ref
      const mockElement = document.createElement("div");
      act(() => {
        Object.defineProperty(ref, "current", {
          value: mockElement,
          writable: true,
          configurable: true,
        });
      });

      // Force re-render to trigger effect
      const { rerender } = renderHook(() => hooks._useIntersectionObserver());
      rerender();

      expect(mockIntersectionObserver).toHaveBeenCalled();
    });

    it("should call callback when intersection occurs", () => {
      const callback = jest.fn();
      const { result } = renderHook(() =>
        hooks._useIntersectionObserver(callback),
      );

      // Simulate intersection
      const mockEntry: IntersectionObserverEntry = {
        isIntersecting: true,
        intersectionRatio: 1,
        intersectionRect: {} as DOMRectReadOnly,
        boundingClientRect: {} as DOMRectReadOnly,
        rootBounds: {} as DOMRectReadOnly,
        target: document.createElement("div"),
        time: 1000,
      };

      act(() => {
        observerCallback([mockEntry]);
      });

      expect(callback).toHaveBeenCalledWith(mockEntry);
    });

    it("should disconnect observer on unmount", () => {
      const { unmount } = renderHook(() => hooks._useIntersectionObserver());
      unmount();
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe("_useMediaQuery", () => {
    it("should return initial match state", () => {
      const mockMatchMedia = jest.fn(() => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));
      window.matchMedia = mockMatchMedia as any;

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );

      expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");
      expect(result.current).toBe(true);
    });

    it("should update when media query changes", () => {
      let changeListener: ((event: any) => void) | null = null;
      const mockMatchMedia = jest.fn(() => ({
        matches: false,
        addEventListener: jest.fn((event, handler) => {
          if (event === "change") changeListener = handler;
        }),
        removeEventListener: jest.fn(),
      }));
      window.matchMedia = mockMatchMedia as any;

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );

      expect(result.current).toBe(false);

      // Simulate media query change
      act(() => {
        if (changeListener) {
          changeListener({ matches: true });
        }
      });

      expect(result.current).toBe(true);
    });

    it("should handle legacy browsers with addListener", () => {
      const addListener = jest.fn();
      const removeListener = jest.fn();

      const mockMatchMedia = jest.fn(() => ({
        matches: false,
        addListener,
        removeListener,
      }));
      window.matchMedia = mockMatchMedia as any;

      const { unmount } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );

      expect(addListener).toHaveBeenCalled();

      unmount();

      expect(removeListener).toHaveBeenCalled();
    });
  });

  describe("_useNetworkStatus", () => {
    let onlineListeners: Array<() => void> = [];
    let offlineListeners: Array<() => void> = [];

    beforeEach(() => {
      onlineListeners = [];
      offlineListeners = [];

      const originalAddEventListener = window.addEventListener;
      window.addEventListener = jest.fn((event, handler) => {
        if (event === "online") onlineListeners.push(handler as () => void);
        if (event === "offline") offlineListeners.push(handler as () => void);
        originalAddEventListener.call(window, event, handler);
      }) as any;

      // Mock navigator.onLine
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        configurable: true,
        value: true,
      });
    });

    it("should return initial network status", () => {
      const { result } = renderHook(() => hooks._useNetworkStatus());

      expect(result.current).toEqual({
        online: true,
        effectiveType: "4g",
        downlink: 10,
        rtt: 50,
        saveData: false,
      });
    });

    it("should detect online/offline status changes", () => {
      const { result } = renderHook(() => hooks._useNetworkStatus());

      expect(result.current.online).toBe(true);

      // Simulate going offline
      act(() => {
        Object.defineProperty(navigator, "onLine", { value: false });
        offlineListeners.forEach((listener) => listener());
      });

      expect(result.current.online).toBe(false);

      // Simulate going online
      act(() => {
        Object.defineProperty(navigator, "onLine", { value: true });
        onlineListeners.forEach((listener) => listener());
      });

      expect(result.current.online).toBe(true);
    });

    it("should detect connection changes with Network Information API", () => {
      let connectionChangeListener: (() => void) | null = null;

      const mockConnection = {
        effectiveType: "3g",
        downlink: 5,
        rtt: 100,
        saveData: true,
        addEventListener: jest.fn((event, handler) => {
          if (event === "change") connectionChangeListener = handler;
        }),
        removeEventListener: jest.fn(),
      };

      Object.defineProperty(navigator, "connection", {
        writable: true,
        configurable: true,
        value: mockConnection,
      });

      const { result } = renderHook(() => hooks._useNetworkStatus());

      // Initial values from mock connection
      expect(result.current.effectiveType).toBe("3g");
      expect(result.current.downlink).toBe(5);
      expect(result.current.rtt).toBe(100);
      expect(result.current.saveData).toBe(true);

      // Simulate connection change
      act(() => {
        mockConnection.effectiveType = "4g";
        mockConnection.downlink = 10;
        if (connectionChangeListener) {
          connectionChangeListener();
        }
      });

      expect(result.current.effectiveType).toBe("4g");
      expect(result.current.downlink).toBe(10);
    });
  });

  describe("_useWindowSize", () => {
    let resizeListeners: Array<() => void> = [];

    beforeEach(() => {
      resizeListeners = [];

      const originalAddEventListener = window.addEventListener;
      window.addEventListener = jest.fn((event, handler) => {
        if (event === "resize") resizeListeners.push(handler as () => void);
        originalAddEventListener.call(window, event, handler);
      }) as any;

      // Mock window dimensions
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 768,
      });
    });

    it("should return initial window size", () => {
      const { result } = renderHook(() => hooks._useWindowSize());

      expect(result.current).toEqual({
        width: 1024,
        height: 768,
        isReady: true,
      });
    });

    it("should update on window resize", () => {
      const { result } = renderHook(() => hooks._useWindowSize());

      expect(result.current.width).toBe(1024);
      expect(result.current.height).toBe(768);

      // Simulate window resize
      act(() => {
        Object.defineProperty(window, "innerWidth", { value: 1920 });
        Object.defineProperty(window, "innerHeight", { value: 1080 });
        resizeListeners.forEach((listener) => listener());
      });

      expect(result.current).toEqual({
        width: 1920,
        height: 1080,
        isReady: true,
      });
    });
  });
});

describe("Missing Browser APIs in Client Environment", () => {
  describe("Missing window.matchMedia", () => {
    let originalMatchMedia: typeof window.matchMedia;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    it("should return false when window.matchMedia is undefined", () => {
      // @ts-ignore - Simulating missing API
      window.matchMedia = undefined;

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );

      expect(result.current).toBe(false);
    });

    it("should not throw errors when window.matchMedia is null", () => {
      // @ts-ignore - Simulating missing API
      window.matchMedia = null;

      expect(() => {
        renderHook(() => hooks._useMediaQuery("(prefers-color-scheme: dark)"));
      }).not.toThrow();

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(prefers-color-scheme: dark)"),
      );
      expect(result.current).toBe(false);
    });

    it("should handle different media queries consistently when API is missing", () => {
      // @ts-ignore - Simulating missing API
      delete window.matchMedia;

      const { result: result1 } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      const { result: result2 } = renderHook(() =>
        hooks._useMediaQuery("(max-width: 480px)"),
      );
      const { result: result3 } = renderHook(() =>
        hooks._useMediaQuery("(orientation: landscape)"),
      );

      expect(result1.current).toBe(false);
      expect(result2.current).toBe(false);
      expect(result3.current).toBe(false);
    });

    it("should not attempt to add event listeners when matchMedia is missing", () => {
      const addEventListenerSpy = jest.spyOn(window, "addEventListener");

      // @ts-ignore - Simulating missing API
      window.matchMedia = undefined;

      renderHook(() => hooks._useMediaQuery("(min-width: 768px)"));

      // Should not try to add listeners on non-existent matchMedia
      expect(addEventListenerSpy).not.toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );

      addEventListenerSpy.mockRestore();
    });
  });

  describe("Missing IntersectionObserver", () => {
    let originalIntersectionObserver: typeof global.IntersectionObserver;

    beforeEach(() => {
      originalIntersectionObserver = global.IntersectionObserver;
    });

    afterEach(() => {
      global.IntersectionObserver = originalIntersectionObserver;
    });

    it("should return null entry when IntersectionObserver is undefined", () => {
      // @ts-ignore - Simulating missing API
      global.IntersectionObserver = undefined;

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref, entry] = result.current;

      expect(entry).toBeNull();
      expect(ref.current).toBeNull();
    });

    it("should not throw errors when IntersectionObserver is null", () => {
      // @ts-ignore - Simulating missing API
      global.IntersectionObserver = null;

      expect(() => {
        renderHook(() => hooks._useIntersectionObserver());
      }).not.toThrow();

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref, entry] = result.current;

      expect(entry).toBeNull();
      expect(ref.current).toBeNull();
    });

    it("should handle callback gracefully when IntersectionObserver is missing", () => {
      const callback = jest.fn();

      // @ts-ignore - Simulating missing API
      delete global.IntersectionObserver;

      expect(() => {
        renderHook(() => hooks._useIntersectionObserver(callback));
      }).not.toThrow();

      // Callback should never be called when API is missing
      expect(callback).not.toHaveBeenCalled();
    });

    it("should work with custom options when IntersectionObserver is missing", () => {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: "10px",
        threshold: 0.5,
      };

      // @ts-ignore - Simulating missing API
      global.IntersectionObserver = undefined;

      expect(() => {
        renderHook(() => hooks._useIntersectionObserver(undefined, options));
      }).not.toThrow();

      const { result } = renderHook(() =>
        hooks._useIntersectionObserver(undefined, options),
      );
      const [ref, entry] = result.current;

      expect(entry).toBeNull();
      expect(ref.current).toBeNull();
    });

    it("should not attempt to create observer when API is missing", () => {
      // @ts-ignore - Simulating missing API
      global.IntersectionObserver = undefined;

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref] = result.current;

      // Try to set a ref element
      const mockElement = document.createElement("div");
      act(() => {
        Object.defineProperty(ref, "current", {
          value: mockElement,
          writable: true,
          configurable: true,
        });
      });

      // Should not throw even with element present
      expect(() => {
        const { rerender } = renderHook(() => hooks._useIntersectionObserver());
        rerender();
      }).not.toThrow();
    });
  });

  describe("Missing Multiple APIs Simultaneously", () => {
    let originalMatchMedia: typeof window.matchMedia;
    let originalIntersectionObserver: typeof global.IntersectionObserver;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
      originalIntersectionObserver = global.IntersectionObserver;
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
      global.IntersectionObserver = originalIntersectionObserver;
    });

    it("should handle missing matchMedia and IntersectionObserver simultaneously", () => {
      // @ts-ignore - Simulating missing APIs
      window.matchMedia = undefined;
      // @ts-ignore - Simulating missing APIs
      global.IntersectionObserver = undefined;

      expect(() => {
        const { result: mediaResult } = renderHook(() =>
          hooks._useMediaQuery("(min-width: 768px)"),
        );
        const { result: intersectionResult } = renderHook(() =>
          hooks._useIntersectionObserver(),
        );

        expect(mediaResult.current).toBe(false);
        expect(intersectionResult.current[1]).toBeNull();
      }).not.toThrow();
    });

    it("should maintain consistent behavior when APIs are restored", () => {
      // Start without APIs
      // @ts-ignore - Simulating missing APIs
      window.matchMedia = undefined;
      // @ts-ignore - Simulating missing APIs
      global.IntersectionObserver = undefined;

      const { result: mediaResult, rerender: rerenderMedia } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      const { result: intersectionResult, rerender: rerenderIntersection } =
        renderHook(() => hooks._useIntersectionObserver());

      expect(mediaResult.current).toBe(false);
      expect(intersectionResult.current[1]).toBeNull();

      // Restore APIs
      window.matchMedia = originalMatchMedia;
      global.IntersectionObserver = originalIntersectionObserver;

      // Re-render hooks
      rerenderMedia();
      rerenderIntersection();

      // Behavior should remain consistent (hooks maintain their initial state)
      expect(mediaResult.current).toBe(false);
      expect(intersectionResult.current[1]).toBeNull();
    });
  });

  describe("Missing Navigator APIs", () => {
    let originalNavigator: Navigator;

    beforeEach(() => {
      originalNavigator = global.navigator;
    });

    afterEach(() => {
      global.navigator = originalNavigator;
    });

    it("should handle missing navigator object", () => {
      // @ts-ignore - Simulating missing navigator
      global.navigator = undefined;

      expect(() => {
        renderHook(() => hooks._useNetworkStatus());
      }).not.toThrow();

      const { result } = renderHook(() => hooks._useNetworkStatus());
      expect(result.current).toEqual({
        online: true,
        effectiveType: "4g",
        downlink: 10,
        rtt: 50,
        saveData: false,
      });
    });

    it("should handle missing navigator.onLine property", () => {
      const mockNavigator = {} as Navigator;
      global.navigator = mockNavigator;

      expect(() => {
        renderHook(() => hooks._useNetworkStatus());
      }).not.toThrow();

      const { result } = renderHook(() => hooks._useNetworkStatus());
      expect(result.current.online).toBe(true); // Should default to true
    });

    it("should handle missing all navigator.connection variants", () => {
      const mockNavigator = {
        onLine: true,
      } as Navigator;

      // Ensure no connection properties exist
      delete (mockNavigator as any).connection;
      delete (mockNavigator as any).mozConnection;
      delete (mockNavigator as any).webkitConnection;

      global.navigator = mockNavigator;

      const { result } = renderHook(() => hooks._useNetworkStatus());

      expect(result.current).toEqual({
        online: true,
        effectiveType: "4g",
        downlink: 10,
        rtt: 50,
        saveData: false,
      });
    });
  });

  describe("Missing Window Properties", () => {
    let originalInnerWidth: number;
    let originalInnerHeight: number;

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
      originalInnerHeight = window.innerHeight;
    });

    afterEach(() => {
      Object.defineProperty(window, "innerWidth", {
        value: originalInnerWidth,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: originalInnerHeight,
        writable: true,
        configurable: true,
      });
    });

    it("should handle missing window.innerWidth and innerHeight", () => {
      // @ts-ignore - Simulating missing properties
      delete window.innerWidth;
      // @ts-ignore - Simulating missing properties
      delete window.innerHeight;

      expect(() => {
        renderHook(() => hooks._useWindowSize());
      }).not.toThrow();

      const { result } = renderHook(() => hooks._useWindowSize());

      // Should handle gracefully with NaN or undefined values
      expect(typeof result.current.width).toBe("number");
      expect(typeof result.current.height).toBe("number");
      expect(result.current.isReady).toBe(true);
    });

    it("should handle window properties that return undefined", () => {
      Object.defineProperty(window, "innerWidth", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      const { result } = renderHook(() => hooks._useWindowSize());

      expect(result.current.isReady).toBe(true);
    });
  });

  describe("Missing Event Listener Support", () => {
    let originalAddEventListener: typeof window.addEventListener;
    let originalRemoveEventListener: typeof window.removeEventListener;

    beforeEach(() => {
      originalAddEventListener = window.addEventListener;
      originalRemoveEventListener = window.removeEventListener;
    });

    afterEach(() => {
      window.addEventListener = originalAddEventListener;
      window.removeEventListener = originalRemoveEventListener;
    });

    it("should handle missing addEventListener for window events", () => {
      // @ts-ignore - Simulating missing methods
      window.addEventListener = undefined;
      // @ts-ignore - Simulating missing methods
      window.removeEventListener = undefined;

      expect(() => {
        renderHook(() => hooks._useWindowSize());
        renderHook(() => hooks._useNetworkStatus());
      }).not.toThrow();
    });

    it("should handle addEventListener that throws errors", () => {
      window.addEventListener = jest.fn(() => {
        throw new Error("addEventListener error");
      }) as any;

      expect(() => {
        renderHook(() => hooks._useWindowSize());
        renderHook(() => hooks._useNetworkStatus());
      }).not.toThrow();
    });
  });

  describe("Browser API Feature Detection Edge Cases", () => {
    it("should handle window.matchMedia that exists but throws on call", () => {
      window.matchMedia = jest.fn(() => {
        throw new Error("matchMedia error");
      }) as any;

      expect(() => {
        renderHook(() => hooks._useMediaQuery("(min-width: 768px)"));
      }).not.toThrow();

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      expect(result.current).toBe(false);
    });

    it("should handle IntersectionObserver constructor that throws", () => {
      global.IntersectionObserver = jest.fn(() => {
        throw new Error("IntersectionObserver error");
      }) as any;

      expect(() => {
        renderHook(() => hooks._useIntersectionObserver());
      }).not.toThrow();

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref, entry] = result.current;
      expect(entry).toBeNull();
    });

    it("should handle partial API implementations gracefully", () => {
      // Mock a partial matchMedia implementation
      window.matchMedia = jest.fn(() => ({
        matches: true,
        // Missing addEventListener/removeEventListener methods
      })) as any;

      expect(() => {
        renderHook(() => hooks._useMediaQuery("(min-width: 768px)"));
      }).not.toThrow();

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      expect(result.current).toBe(true);
    });

    it("should handle navigator.connection with missing methods", () => {
      const mockConnection = {
        effectiveType: "3g",
        downlink: 5,
        rtt: 100,
        saveData: true,
        // Missing addEventListener/removeEventListener
      };

      Object.defineProperty(navigator, "connection", {
        value: mockConnection,
        writable: true,
        configurable: true,
      });

      expect(() => {
        renderHook(() => hooks._useNetworkStatus());
      }).not.toThrow();

      const { result } = renderHook(() => hooks._useNetworkStatus());
      expect(result.current.effectiveType).toBe("3g");
      expect(result.current.downlink).toBe(5);
    });

    it("should handle corrupted API objects that throw on property access", () => {
      const corruptedConnection = new Proxy(
        {},
        {
          get() {
            throw new Error("Property access error");
          },
        },
      );

      Object.defineProperty(navigator, "connection", {
        value: corruptedConnection,
        writable: true,
        configurable: true,
      });

      expect(() => {
        renderHook(() => hooks._useNetworkStatus());
      }).not.toThrow();
    });
  });
});

describe("SSR Environment Tests", () => {
  // Test SSR behavior by checking the hooks return safe defaults
  describe("SSR-safe hook behaviors", () => {
    it("should handle missing window gracefully in hooks", () => {
      // Temporarily remove APIs
      const originalIntersectionObserver = global.IntersectionObserver;
      const originalMatchMedia = window.matchMedia;

      // @ts-ignore
      delete global.IntersectionObserver;
      // @ts-ignore
      delete window.matchMedia;

      // Test hooks still work
      const { result: intersectionResult } = renderHook(() =>
        hooks._useIntersectionObserver(),
      );
      const [ref, entry] = intersectionResult.current;
      expect(entry).toBeNull();
      expect(ref.current).toBeNull();

      const { result: mediaQueryResult } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      expect(mediaQueryResult.current).toBe(false);

      // Restore APIs
      global.IntersectionObserver = originalIntersectionObserver;
      window.matchMedia = originalMatchMedia;
    });

    it("should return default values when navigator APIs are missing", () => {
      // Test network status with missing navigator.connection
      const originalConnection = (navigator as any).connection;
      delete (navigator as any).connection;

      const { result } = renderHook(() => hooks._useNetworkStatus());

      expect(result.current).toEqual({
        online: true,
        effectiveType: "4g",
        downlink: 10,
        rtt: 50,
        saveData: false,
      });

      // Restore
      if (originalConnection) {
        (navigator as any).connection = originalConnection;
      }
    });
  });
});
