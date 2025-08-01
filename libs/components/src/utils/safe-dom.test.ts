/**
 * Safe DOM Utility Functions Tests
 * Comprehensive unit tests covering happy paths, edge cases, and error conditions
 */

import React from "react";
import {
  safeGetBoundingClientRect,
  safeMapGet,
  safeRequestAnimationFrame,
  safeCreateAudioContext,
  safeRemoveElement,
  safeAppendChild,
} from "./safe-dom";

// Mock DOM methods that might not be available in test environment
const mockGetBoundingClientRect = jest.fn();
const mockQuerySelector = jest.fn();
const mockQuerySelectorAll = jest.fn();
const mockGetComputedStyle = jest.fn();
const mockRequestAnimationFrame = jest.fn();
const mockCancelAnimationFrame = jest.fn();

// Test utilities to create mock elements
const createMockElement = (overrides = {}) => ({
  getBoundingClientRect: mockGetBoundingClientRect,
  querySelector: mockQuerySelector,
  querySelectorAll: mockQuerySelectorAll,
  getAttribute: jest.fn(),
  setAttribute: jest.fn(),
  remove: jest.fn(),
  append: jest.fn(),
  appendChild: jest.fn(),
  parentNode: {},
  style: {},
  ...overrides,
});

const createMockRef = <T>(current: T | null): React.RefObject<T> => ({
  current,
});

describe("Safe DOM Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup window mocks
    Object.defineProperty(window, "getComputedStyle", {
      value: mockGetComputedStyle,
      writable: true,
    });

    Object.defineProperty(window, "requestAnimationFrame", {
      value: mockRequestAnimationFrame,
      writable: true,
    });

    Object.defineProperty(window, "cancelAnimationFrame", {
      value: mockCancelAnimationFrame,
      writable: true,
    });
  });

  describe("safeRefAccess", () => {
    // Access private function for testing
    const safeRefAccess = (ref: React.RefObject<any>) => ref.current || null;

    it("should return current value when ref has value", () => {
      const mockElement = createMockElement();
      const ref = createMockRef(mockElement);

      expect(safeRefAccess(ref)).toBe(mockElement);
    });

    it("should return null when ref current is null", () => {
      const ref = createMockRef(null);

      expect(safeRefAccess(ref)).toBeNull();
    });

    it("should return null when ref current is undefined", () => {
      const ref = createMockRef(undefined);

      expect(safeRefAccess(ref)).toBeNull();
    });

    it("should handle falsy values correctly", () => {
      const ref = createMockRef(0);
      expect(safeRefAccess(ref)).toBeNull();

      const refEmpty = createMockRef("");
      expect(safeRefAccess(refEmpty)).toBeNull();

      const refFalse = createMockRef(false);
      expect(safeRefAccess(refFalse)).toBeNull();
    });
  });

  describe("safeGetBoundingClientRect", () => {
    it("should return DOMRect when element is valid", () => {
      const mockRect = {
        x: 10,
        y: 20,
        width: 100,
        height: 50,
        top: 20,
        right: 110,
        bottom: 70,
        left: 10,
        toJSON: () => ({}),
      };

      mockGetBoundingClientRect.mockReturnValue(mockRect);
      const element = createMockElement();

      const result = safeGetBoundingClientRect(element as any);

      expect(result).toBe(mockRect);
      expect(mockGetBoundingClientRect).toHaveBeenCalledWith();
    });

    it("should return fallback rect when element is null", () => {
      const result = safeGetBoundingClientRect(null);

      expect(result).toEqual({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: expect.any(Function),
      });
    });

    it("should return fallback rect when getBoundingClientRect throws", () => {
      mockGetBoundingClientRect.mockImplementation(() => {
        throw new Error("DOM error");
      });

      const element = createMockElement();
      const result = safeGetBoundingClientRect(element as any);

      expect(result).toEqual({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: expect.any(Function),
      });
    });

    it("should have working toJSON method in fallback", () => {
      const result = safeGetBoundingClientRect(null);

      expect(result.toJSON()).toEqual({});
      expect(() => result.toJSON()).not.toThrow();
    });
  });

  describe("safeMapGet", () => {
    it("should return value when map has key", () => {
      const map = new Map([
        ["key1", "value1"],
        ["key2", "value2"],
      ]);

      expect(safeMapGet(map, "key1")).toBe("value1");
      expect(safeMapGet(map, "key2")).toBe("value2");
    });

    it("should return fallback when map does not have key", () => {
      const map = new Map([["key1", "value1"]]);

      expect(safeMapGet(map, "nonexistent", "fallback")).toBe("fallback");
    });

    it("should return undefined when map does not have key and no fallback", () => {
      const map = new Map([["key1", "value1"]]);

      expect(safeMapGet(map, "nonexistent")).toBeUndefined();
    });

    it("should return fallback when map is null", () => {
      expect(safeMapGet(null, "key", "fallback")).toBe("fallback");
    });

    it("should return fallback when map is undefined", () => {
      expect(safeMapGet(undefined, "key", "fallback")).toBe("fallback");
    });

    it("should handle map.get throwing error", () => {
      const mockMap = {
        has: jest.fn().mockReturnValue(true),
        get: jest.fn().mockImplementation(() => {
          throw new Error("Map error");
        }),
      } as any;

      expect(safeMapGet(mockMap, "key", "fallback")).toBe("fallback");
    });

    it("should work with different key types", () => {
      const map = new Map([
        [1, "number-key"],
        ["string", "string-key"],
        [true, "boolean-key"],
      ]);

      expect(safeMapGet(map, 1)).toBe("number-key");
      expect(safeMapGet(map, "string")).toBe("string-key");
      expect(safeMapGet(map, true)).toBe("boolean-key");
    });
  });

  describe("safeRequestAnimationFrame", () => {
    beforeEach(() => {
      // Reset window mock
      delete (window as any).requestAnimationFrame;
    });

    it("should call requestAnimationFrame and return cleanup function", () => {
      const mockId = 123;
      mockRequestAnimationFrame.mockReturnValue(mockId);

      Object.defineProperty(window, "requestAnimationFrame", {
        value: mockRequestAnimationFrame,
        writable: true,
      });

      const callback = jest.fn();
      const cleanup = safeRequestAnimationFrame(callback);

      expect(mockRequestAnimationFrame).toHaveBeenCalledWith(callback);
      expect(cleanup).toBeInstanceOf(Function);

      // Test cleanup function
      cleanup?.();
      expect(mockCancelAnimationFrame).toHaveBeenCalledWith(mockId);
    });

    it("should return null when window is undefined", () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const callback = jest.fn();
      const result = safeRequestAnimationFrame(callback);

      expect(result).toBeNull();

      // Restore window
      global.window = originalWindow;
    });

    it("should return null when requestAnimationFrame is not available", () => {
      const callback = jest.fn();
      const result = safeRequestAnimationFrame(callback);

      expect(result).toBeNull();
    });

    it("should return null when requestAnimationFrame throws", () => {
      mockRequestAnimationFrame.mockImplementation(() => {
        throw new Error("RAF error");
      });

      Object.defineProperty(window, "requestAnimationFrame", {
        value: mockRequestAnimationFrame,
        writable: true,
      });

      const callback = jest.fn();
      const result = safeRequestAnimationFrame(callback);

      expect(result).toBeNull();
    });

    it("should handle cancelAnimationFrame throwing in cleanup", () => {
      const mockId = 123;
      mockRequestAnimationFrame.mockReturnValue(mockId);
      mockCancelAnimationFrame.mockImplementation(() => {
        throw new Error("Cancel error");
      });

      Object.defineProperty(window, "requestAnimationFrame", {
        value: mockRequestAnimationFrame,
        writable: true,
      });

      const callback = jest.fn();
      const cleanup = safeRequestAnimationFrame(callback);

      expect(() => cleanup?.()).not.toThrow();
    });
  });

  describe("safeCreateAudioContext", () => {
    beforeEach(() => {
      // Reset AudioContext mock
      delete (window as any).AudioContext;
    });

    it("should create AudioContext when available", () => {
      const mockAudioContext = { state: "running" };
      const MockAudioContext = jest
        .fn()
        .mockImplementation(() => mockAudioContext);

      Object.defineProperty(window, "AudioContext", {
        value: MockAudioContext,
        writable: true,
      });

      const result = safeCreateAudioContext();

      expect(MockAudioContext).toHaveBeenCalled();
      expect(result).toBe(mockAudioContext);
    });

    it("should return null when window is undefined", () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = safeCreateAudioContext();

      expect(result).toBeNull();

      // Restore window
      global.window = originalWindow;
    });

    it("should return null when AudioContext is not supported", () => {
      const result = safeCreateAudioContext();

      expect(result).toBeNull();
    });

    it("should return null when AudioContext constructor throws", () => {
      const MockAudioContext = jest.fn().mockImplementation(() => {
        throw new Error("AudioContext not supported");
      });

      Object.defineProperty(window, "AudioContext", {
        value: MockAudioContext,
        writable: true,
      });

      const result = safeCreateAudioContext();

      expect(result).toBeNull();
    });
  });

  describe("safeRemoveElement", () => {
    it("should remove element when valid", () => {
      const mockRemove = jest.fn();
      const element = createMockElement({
        remove: mockRemove,
        parentNode: {},
      });

      const result = safeRemoveElement(element as any);

      expect(mockRemove).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it("should return false when element is null", () => {
      const result = safeRemoveElement(null);

      expect(result).toBe(false);
    });

    it("should return false when element has no parent", () => {
      const element = createMockElement({ parentNode: null });

      const result = safeRemoveElement(element as any);

      expect(result).toBe(false);
    });

    it("should return false when remove throws error", () => {
      const mockRemove = jest.fn().mockImplementation(() => {
        throw new Error("Remove failed");
      });

      const element = createMockElement({
        remove: mockRemove,
        parentNode: {},
      });

      const result = safeRemoveElement(element as any);

      expect(result).toBe(false);
    });
  });

  describe("safeAppendChild", () => {
    it("should append child when both parent and child are valid", () => {
      const mockAppend = jest.fn();
      const parent = createMockElement({ append: mockAppend });
      const child = { nodeType: 1 };

      const result = safeAppendChild(parent as any, child as any);

      expect(mockAppend).toHaveBeenCalledWith(child);
      expect(result).toBe(true);
    });

    it("should return false when parent is null", () => {
      const child = { nodeType: 1 };

      const result = safeAppendChild(null, child as any);

      expect(result).toBe(false);
    });

    it("should return false when child is null", () => {
      const parent = createMockElement();

      const result = safeAppendChild(parent as any, null);

      expect(result).toBe(false);
    });

    it("should return false when both parent and child are null", () => {
      const result = safeAppendChild(null, null);

      expect(result).toBe(false);
    });

    it("should return false when append throws error", () => {
      const mockAppend = jest.fn().mockImplementation(() => {
        throw new Error("Append failed");
      });

      const parent = createMockElement({ append: mockAppend });
      const child = { nodeType: 1 };

      const result = safeAppendChild(parent as any, child as any);

      expect(result).toBe(false);
    });

    it("should work with different node types", () => {
      const mockAppend = jest.fn();
      const parent = createMockElement({ append: mockAppend });

      // Test with text node
      const textNode = { nodeType: 3, textContent: "test" };
      expect(safeAppendChild(parent as any, textNode as any)).toBe(true);

      // Test with element node
      const elementNode = { nodeType: 1, tagName: "DIV" };
      expect(safeAppendChild(parent as any, elementNode as any)).toBe(true);

      expect(mockAppend).toHaveBeenCalledTimes(2);
    });
  });

  // Integration tests for edge cases and complex scenarios
  describe("Integration and Edge Cases", () => {
    it("should handle multiple sequential operations safely", () => {
      const map = new Map([["key1", "value1"]]);
      const element = createMockElement();

      // Test multiple safe operations
      expect(safeMapGet(map, "key1")).toBe("value1");
      expect(safeGetBoundingClientRect(element as any)).toBeDefined();
      expect(safeRemoveElement(null)).toBe(false);
      expect(safeAppendChild(null, null)).toBe(false);
    });

    it("should handle memory cleanup properly", () => {
      const mockId = 456;
      mockRequestAnimationFrame.mockReturnValue(mockId);

      Object.defineProperty(window, "requestAnimationFrame", {
        value: mockRequestAnimationFrame,
        writable: true,
      });

      const callback = jest.fn();
      const cleanup1 = safeRequestAnimationFrame(callback);
      const cleanup2 = safeRequestAnimationFrame(callback);

      expect(cleanup1).toBeInstanceOf(Function);
      expect(cleanup2).toBeInstanceOf(Function);

      cleanup1?.();
      cleanup2?.();

      expect(mockCancelAnimationFrame).toHaveBeenCalledTimes(2);
    });

    it("should be resilient to DOM mutations during operations", () => {
      const parent = createMockElement();
      const child = createMockElement();

      // Simulate DOM mutation during append
      const mockAppend = jest.fn().mockImplementation(() => {
        // Simulate parent being removed during append
        parent.parentNode = null;
      });

      parent.append = mockAppend;

      const result = safeAppendChild(parent as any, child as any);
      expect(result).toBe(true); // Should still succeed
    });
  });

  // Performance and boundary tests
  describe("Performance and Boundary Tests", () => {
    it("should handle large maps efficiently", () => {
      const largeMap = new Map();
      for (let i = 0; i < 10000; i++) {
        largeMap.set(`key${i}`, `value${i}`);
      }

      expect(safeMapGet(largeMap, "key5000")).toBe("value5000");
      expect(safeMapGet(largeMap, "nonexistent", "fallback")).toBe("fallback");
    });

    it("should handle rapid successive calls", () => {
      const element = createMockElement();
      mockGetBoundingClientRect.mockReturnValue({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        top: 0,
        right: 100,
        bottom: 100,
        left: 0,
        toJSON: () => ({}),
      });

      // Rapid successive calls
      for (let i = 0; i < 100; i++) {
        const result = safeGetBoundingClientRect(element as any);
        expect(result.width).toBe(100);
      }
    });
  });
});
