import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";

// Extend Vitest's expect with axe matchers
expect.extend(matchers);

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

afterEach(() => {
	cleanup();
});

beforeEach(() => {
	// Reset mocks before each test
	vi.clearAllMocks();
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback) => {
	setTimeout(callback, 0);
	return 1;
});

global.cancelAnimationFrame = vi.fn();

// Mock window.getComputedStyle properly
Object.defineProperty(window, "getComputedStyle", {
	value: vi.fn().mockImplementation((_element: Element) => {

		const style = {
			display: "block",
			visibility: "visible",
			opacity: "1",
			backdropFilter: "blur(10px)",
			webkitBackdropFilter: "blur(10px)",
			background: "rgba(255, 255, 255, 0.1)",
			backgroundColor: "rgba(255, 255, 255, 0.1)",
			color: "rgb(0, 0, 0)",
			fontSize: "16px",
			lineHeight: "1.5",
			width: "100px",
			height: "100px",
			margin: "0px",
			padding: "0px",
			border: "0px",
			outline: "none",
			boxShadow: "none",
			getPropertyValue: vi.fn((property: string) => {
				const normalizedProperty = property.replaceAll(/-([a-z])/g, (_match, letter) =>
					letter.toUpperCase(),
				);
				return style[normalizedProperty as keyof typeof style] || "";
			}),
		};
		return style;
	}),
	writable: true,
	configurable: true,
});

// Mock Element.getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
	width: 100,
	height: 100,
	x: 0,
	y: 0,
	toJSON: vi.fn(),
}));

// Mock Element.scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock performance.now
Object.defineProperty(window, "performance", {
	writable: true,
	value: {
		now: vi.fn(() => Date.now()),
		measure: vi.fn(),
		mark: vi.fn(),
		getEntriesByName: vi.fn(() => []),
		getEntriesByType: vi.fn(() => []),
	},
});

// Mock console.warn to reduce noise
const originalWarn = console.warn;
console.warn = vi.fn((...arguments_) => {
	const message = arguments_[0];
	if (
		"string" === typeof message &&
		(message.includes("Warning: ReactDOM.render is deprecated") ||
			message.includes("Warning: componentWillReceiveProps") ||
			message.includes("🐌 Slow glass effect"))
	) {
		return;
	}
	originalWarn(...arguments_);
});
