/**
 * @jest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { renderHook } from "@testing-library/react";
import * as hooks from "./use-ssr-safe-hooks";

// Test hooks with missing browser APIs by calling the actual hook implementations
describe("SSR-Safe Hooks - Missing Browser APIs (Hook Implementation Tests)", () => {
  // Store original implementations to restore later
  let originalMatchMedia: any;
  let originalIntersectionObserver: any;
  let originalNavigator: any;
  let originalInnerWidth: any;
  let originalInnerHeight: any;
  let originalAddEventListener: any;
  let originalRemoveEventListener: any;

  beforeEach(() => {
    // Store originals for restoration
    if (typeof window !== "undefined") {
      originalMatchMedia = window.matchMedia;
      originalInnerWidth = window.innerWidth;
      originalInnerHeight = window.innerHeight;
      originalAddEventListener = window.addEventListener;
      originalRemoveEventListener = window.removeEventListener;
    }
    if (typeof IntersectionObserver !== "undefined") {
      originalIntersectionObserver = IntersectionObserver;
    }
    if (typeof navigator !== "undefined") {
      originalNavigator = navigator;
    }
  });

  afterEach(() => {
    // Restore originals
    if (typeof window !== "undefined") {
      if (originalMatchMedia) window.matchMedia = originalMatchMedia;
      if (originalInnerWidth !== undefined)
        window.innerWidth = originalInnerWidth;
      if (originalInnerHeight !== undefined)
        window.innerHeight = originalInnerHeight;
      if (originalAddEventListener)
        window.addEventListener = originalAddEventListener;
      if (originalRemoveEventListener)
        window.removeEventListener = originalRemoveEventListener;
    }
    if (originalIntersectionObserver) {
      global.IntersectionObserver = originalIntersectionObserver;
    }
    if (originalNavigator) {
      global.navigator = originalNavigator;
    }
  });

  describe("_isSSR function", () => {
    it("should return false when window exists", () => {
      expect(hooks._isSSR()).toBe(false);
    });

    it("should return true when window is undefined", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;
      expect(hooks._isSSR()).toBe(true);
      global.window = originalWindow;
    });
  });

  describe("_useMediaQuery hook with missing matchMedia", () => {
    it("should return false when matchMedia is undefined", () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.matchMedia = undefined;
      }

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      expect(result.current).toBe(false);
    });

    it("should return false when matchMedia is null", () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.matchMedia = null;
      }

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      expect(result.current).toBe(false);
    });

    it("should return false when matchMedia throws an error", () => {
      if (typeof window !== "undefined") {
        window.matchMedia = mock(() => {
          throw new Error("matchMedia error");
        });
      }

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      expect(result.current).toBe(false);
    });

    it("should work correctly when matchMedia is available", () => {
      if (typeof window !== "undefined") {
        window.matchMedia = mock(() => ({
          matches: true,
          addEventListener: mock(),
          removeEventListener: mock(),
          addListener: mock(),
          removeListener: mock(),
        }));
      }

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );
      expect(result.current).toBe(true);
    });
  });

  describe("_useIntersectionObserver hook with missing IntersectionObserver", () => {
    it("should return null entry when IntersectionObserver is undefined", () => {
      // @ts-ignore
      global.IntersectionObserver = undefined;

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref, entry] = result.current;

      expect(ref.current).toBe(null);
      expect(entry).toBe(null);
    });

    it("should return null entry when IntersectionObserver is null", () => {
      // @ts-ignore
      global.IntersectionObserver = null;

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref, entry] = result.current;

      expect(ref.current).toBe(null);
      expect(entry).toBe(null);
    });

    it("should handle IntersectionObserver constructor that throws", () => {
      global.IntersectionObserver = mock(() => {
        throw new Error("Constructor failed");
      });

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref, entry] = result.current;

      expect(ref.current).toBe(null);
      expect(entry).toBe(null);
    });

    it("should work correctly when IntersectionObserver is available", () => {
      const mockObserver = {
        observe: mock(),
        disconnect: mock(),
      };
      global.IntersectionObserver = mock(() => mockObserver);

      const { result } = renderHook(() => hooks._useIntersectionObserver());
      const [ref, entry] = result.current;

      expect(ref.current).toBe(null);
      expect(entry).toBe(null);
      expect(global.IntersectionObserver).toHaveBeenCalled();
    });
  });

  describe("_useNetworkStatus hook with missing navigator APIs", () => {
    it("should return default values when navigator is undefined", () => {
      const originalNavigator = global.navigator;
      // @ts-ignore
      global.navigator = undefined;

      const { result } = renderHook(() => hooks._useNetworkStatus());

      expect(result.current).toEqual({
        online: true,
        effectiveType: "4g",
        downlink: 10,
        rtt: 50,
        saveData: false,
      });

      global.navigator = originalNavigator;
    });

    it("should handle missing navigator.onLine property", () => {
      const originalNavigator = global.navigator;
      global.navigator = {} as any;

      const { result } = renderHook(() => hooks._useNetworkStatus());

      // Should default to true when onLine is undefined
      expect(result.current.online).toBe(true);

      global.navigator = originalNavigator;
    });

    it("should work correctly when navigator is available", () => {
      const originalNavigator = global.navigator;
      global.navigator = {
        onLine: false,
      } as any;

      const { result } = renderHook(() => hooks._useNetworkStatus());

      expect(result.current.online).toBe(false);

      global.navigator = originalNavigator;
    });
  });

  describe("_useWindowSize hook with missing window properties", () => {
    it("should handle missing window dimensions", () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        delete window.innerWidth;
        // @ts-ignore
        delete window.innerHeight;
      }

      const { result } = renderHook(() => hooks._useWindowSize());

      expect(result.current.width).toBe(0);
      expect(result.current.height).toBe(0);
      expect(result.current.isReady).toBe(true);
    });

    it("should handle undefined window dimensions", () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.innerWidth = undefined;
        // @ts-ignore
        window.innerHeight = undefined;
      }

      const { result } = renderHook(() => hooks._useWindowSize());

      expect(result.current.width).toBe(0);
      expect(result.current.height).toBe(0);
      expect(result.current.isReady).toBe(true);
    });

    it("should work correctly when window dimensions are available", () => {
      if (typeof window !== "undefined") {
        window.innerWidth = 800;
        window.innerHeight = 600;
      }

      const { result } = renderHook(() => hooks._useWindowSize());

      expect(result.current.width).toBe(800);
      expect(result.current.height).toBe(600);
      expect(result.current.isReady).toBe(true);
    });
  });

  describe("Hook error handling", () => {
    it("should handle addEventListener that throws in _useWindowSize", () => {
      if (typeof window !== "undefined") {
        window.addEventListener = mock(() => {
          throw new Error("addEventListener error");
        });
        window.innerWidth = 1024;
        window.innerHeight = 768;
      }

      const { result } = renderHook(() => hooks._useWindowSize());

      // Hook should handle the error gracefully and still work
      expect(result.current.width).toBe(1024);
      expect(result.current.height).toBe(768);
    });

    it("should handle missing addEventListener in _useNetworkStatus", () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        window.addEventListener = undefined;
        // @ts-ignore
        window.removeEventListener = undefined;
      }

      const { result } = renderHook(() => hooks._useNetworkStatus());

      // Hook should still return default values
      expect(result.current).toEqual({
        online: true,
        effectiveType: "4g",
        downlink: 10,
        rtt: 50,
        saveData: false,
      });
    });

    it("should handle matchMedia with missing addEventListener", () => {
      if (typeof window !== "undefined") {
        window.matchMedia = mock(() => ({
          matches: true,
          addEventListener: undefined,
          removeEventListener: undefined,
          addListener: mock(),
          removeListener: mock(),
        }));
      }

      const { result } = renderHook(() =>
        hooks._useMediaQuery("(min-width: 768px)"),
      );

      // Should fallback to legacy methods
      expect(result.current).toBe(true);
    });
  });
});
