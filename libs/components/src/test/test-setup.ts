import { JSDOM } from "jsdom";
import { beforeAll, vi } from "vitest";
import "@testing-library/jest-dom";

// Make vi available globally
global.vi = vi;

// Set up React 19 compatibility
global.IS_REACT_ACT_ENVIRONMENT = true;

// Mock matchMedia globally for all tests
if (typeof window !== "undefined") {
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
}

// Debug: Check if setup is running

/**
 * Sets up the DOM environment for React Testing Library
 * Call this in beforeAll() in your test files
 */
export function setupDOM() {
	// If Vitest already provides a jsdom environment, don't recreate it.
	const hasExistingDom =
		typeof window !== "undefined" &&
		typeof document !== "undefined" &&
		!!document.body;
	if (hasExistingDom) {
		// Ensure required web APIs/mocks exist on the current jsdom window
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

		// Ensure HTMLElement is available on global (jsdom provides it on window)
		(global as any).HTMLElement = (window as any).HTMLElement;
		(global as any).Element = (window as any).Element;

		global.ResizeObserver = class ResizeObserver {
			observe() {}
			unobserve() {}
			disconnect() {}
		};

		global.IntersectionObserver = vi.fn().mockImplementation(() => ({
			observe: vi.fn(),
			unobserve: vi.fn(),
			disconnect: vi.fn(),
		})) as any;

		// Provide a simple in-memory localStorage implementation with clear()
		const storage: Record<string, string> = {};
		(window as any).localStorage = {
			getItem(key: string) {
				return Object.hasOwn(storage, key) ? storage[key] : null;
			},
			setItem(key: string, value: string) {
				storage[key] = String(value);
			},
			removeItem(key: string) {
				delete storage[key];
			},
			clear() {
				for (const key of Object.keys(storage)) {
					delete storage[key];
				}
			},
		};

		return;
	}

	// Fallback: create a new jsdom if none exists (e.g., non-vitest callers)
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

	// Simple in-memory localStorage for non-vitest callers as well
	const storage: Record<string, string> = {};
	(window as any).localStorage = {
		getItem(key: string) {
			return Object.hasOwn(storage, key) ? storage[key] : null;
		},
		setItem(key: string, value: string) {
			storage[key] = String(value);
		},
		removeItem(key: string) {
			delete storage[key];
		},
		clear() {
			for (const key of Object.keys(storage)) {
				delete storage[key];
			}
		},
	};
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
		// Use doMock to avoid Vitest hoisting and allow dynamic module paths
		return vi.doMock(modulePath, () => mockImplementation as any);
	},
};
