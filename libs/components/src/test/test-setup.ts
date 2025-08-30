import { vi, beforeAll, afterEach } from "vitest";
import { JSDOM } from "jsdom";
import "@testing-library/jest-dom";

// Make vi available globally
global.vi = vi;

// Set up React 19 compatibility
global.IS_REACT_ACT_ENVIRONMENT = true;

// Debug: Check if setup is running
console.log("Test setup loaded");

/**
 * Sets up the DOM environment for React Testing Library
 * Call this in beforeAll() in your test files
 */
export function setupDOM() {
 const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
 url: "http://localhost",
 });

 global.window = dom.window as any;
 global.document = dom.window.document;
 global.navigator = dom.window.navigator;

 // Mock matchMedia
 Object.defineProperty(window, "matchMedia", {
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

 // Mock ResizeObserver
 global.ResizeObserver = class ResizeObserver {
 constructor() {}
 observe() {}
 unobserve() {}
 disconnect() {}
 };

 // Mock IntersectionObserver
 global.IntersectionObserver = vi.fn().mockImplementation(() => ({
 observe: vi.fn(),
 unobserve: vi.fn(),
 disconnect: vi.fn(),
 })) as any;
}

/**
 * Test utilities for React components
 */
export const testUtils = {
 /**
 * Sets up DOM environment and common mocks
 */
 setupTestEnvironment() {
 beforeAll(() => {
 setupDOM();
 });
 },

 /**
 * Creates a mock for a React hook
 */
 createHookMock<T extends Record<string, any>>(mockImplementation: T) {
 return vi.fn().mockReturnValue(mockImplementation);
 },

 /**
 * Mocks a module for testing
 */
 mockModule<T extends Record<string, any>>(
 modulePath: string,
 mockImplementation: T,
 ) {
 return vi.mock(modulePath, () => mockImplementation);
 },
};
