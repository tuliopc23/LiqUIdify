import { describe, it, expect } from "bun:test";
import * as hooks from "./use-ssr-safe-hooks";

// Simple validation tests to confirm refactoring worked correctly
describe("SSR-Safe Hooks - Validation Tests", () => {
  describe("Hook exports validation", () => {
    it("should export _isSSR function", () => {
      expect(typeof hooks._isSSR).toBe("function");
    });

    it("should export _useMediaQuery function", () => {
      expect(typeof hooks._useMediaQuery).toBe("function");
    });

    it("should export _useIntersectionObserver function", () => {
      expect(typeof hooks._useIntersectionObserver).toBe("function");
    });

    it("should export _useNetworkStatus function", () => {
      expect(typeof hooks._useNetworkStatus).toBe("function");
    });

    it("should export _useWindowSize function", () => {
      expect(typeof hooks._useWindowSize).toBe("function");
    });
  });

  describe("_isSSR function behavior", () => {
    it("should return boolean value", () => {
      const result = hooks._isSSR();
      expect(typeof result).toBe("boolean");
    });
  });

  describe("Hook function signatures", () => {
    it("_useMediaQuery should accept string parameter", () => {
      // This test validates the function can be called with correct signature
      // The actual execution would require DOM environment
      expect(() => {
        const fn = hooks._useMediaQuery;
        expect(fn.length).toBe(1); // Should accept 1 parameter
      }).not.toThrow();
    });

    it("_useIntersectionObserver should accept optional parameters", () => {
      expect(() => {
        const fn = hooks._useIntersectionObserver;
        expect(fn.length).toBe(1); // First parameter is required, second is optional with default
      }).not.toThrow();
    });

    it("_useNetworkStatus should accept no parameters", () => {
      expect(() => {
        const fn = hooks._useNetworkStatus;
        expect(fn.length).toBe(0); // Should accept 0 parameters
      }).not.toThrow();
    });

    it("_useWindowSize should accept no parameters", () => {
      expect(() => {
        const fn = hooks._useWindowSize;
        expect(fn.length).toBe(0); // Should accept 0 parameters
      }).not.toThrow();
    });
  });
});
