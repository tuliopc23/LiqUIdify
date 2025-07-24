import "@testing-library/jest-dom";
import "vitest-canvas-mock";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, vi } from "vitest";

// Mock Canvas and related APIs
beforeAll(() => {
	// Mock HTMLCanvasElement.getContext
	HTMLCanvasElement.prototype.getContext = vi.fn((contextId: string) => {
		if ("2d" === contextId) {
			return {
				fillRect: vi.fn(),
				clearRect: vi.fn(),
				getImageData: vi.fn(() => ({
					data: new Uint8ClampedArray(4),
					width: 1,
					height: 1,
				})),
				putImageData: vi.fn(),
				createImageData: vi.fn(() => ({
					data: new Uint8ClampedArray(4),
					width: 1,
					height: 1,
				})),
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
				canvas: document.createElement("canvas"),
				globalAlpha: 1,
				globalCompositeOperation: "source-over",
			} as any;
		}
		return;
	}) as any;

	// Mock window.getComputedStyle
	Object.defineProperty(window, "getComputedStyle", {
		value: vi.fn(() => ({
			getPropertyValue: vi.fn(() => ""),
			display: "block",
			opacity: "1",
			color: "rgb(0, 0, 0)",
			backgroundColor: "rgb(255, 255, 255)",
			fontSize: "16px",
			fontFamily: "Arial",
			lineHeight: "1.5",
			margin: "0px",
			padding: "0px",
			border: "0px",
			width: "100px",
			height: "100px",
		})),
		writable: true,
	});

	// Mock IntersectionObserver
	global.IntersectionObserver = class MockIntersectionObserver {
		observe = vi.fn();
		disconnect = vi.fn();
		unobserve = vi.fn();
	} as any;

	// Mock ResizeObserver
	global.ResizeObserver = class MockResizeObserver {
		observe = vi.fn();
		disconnect = vi.fn();
		unobserve = vi.fn();
	} as any;

	// Mock requestAnimationFrame
	global.requestAnimationFrame = vi.fn((callback) => {
		setTimeout(callback, 16);
		return 1;
	});

	// Mock cancelAnimationFrame
	global.cancelAnimationFrame = vi.fn();

	// Mock Element.animate for Web Animations API
	Element.prototype.animate = vi.fn(() => ({
		play: vi.fn(),
		pause: vi.fn(),
		cancel: vi.fn(),
		finish: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		currentTime: 0,
		playState: "running",
		finished: Promise.resolve(),
		ready: Promise.resolve(),
		effect: undefined,
		timeline: undefined,
		id: "",
		pending: false,
		playbackRate: 1,
		startTime: 0,
	})) as any;

	// Mock getBoundingClientRect
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

	// Mock scrollIntoView
	Element.prototype.scrollIntoView = vi.fn();

	// Mock CSS custom properties
	Object.defineProperty(document.documentElement.style, "setProperty", {
		value: vi.fn(),
		writable: true,
	});

	Object.defineProperty(document.documentElement.style, "getPropertyValue", {
		value: vi.fn(() => ""),
		writable: true,
	});

	// Mock matchMedia
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: undefined,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});

	// Mock performance API
	Object.defineProperty(window, "performance", {
		value: {
			now: vi.fn(() => Date.now()),
			mark: vi.fn(),
			measure: vi.fn(),
			getEntriesByName: vi.fn(() => []),
			clearMarks: vi.fn(),
			clearMeasures: vi.fn(),
		},
		writable: true,
	});

	// Mock console to reduce test noise (optional)
	const originalWarn = console.warn;
	console.warn = (...arguments_) => {
		// Filter out known development warnings
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
	};
});

// Clean up after each test
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

// Setup globals for accessibility testing
beforeEach(() => {
	// Reset DOM only if it exists
	if ("undefined" !== typeof document && document.body) {
		document.body.innerHTML = "";
	}

	// Reset any global state
	if ("undefined" !== typeof window) {
		try {
			window.localStorage.clear();
			window.sessionStorage.clear();
		} catch {
			// Ignore errors in test environment
		}
	}
});

// Global test utilities
global.testUtils = {
	// Helper to wait for animations
	waitForAnimation: () =>
		new Promise<void>((resolve) => {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => resolve());
			});
		}),

	// Helper to trigger resize events
	triggerResize: () => {
		const resizeEvent = new Event("resize");
		window.dispatchEvent(resizeEvent);
	},

	// Helper to simulate user interactions
	simulateHover: (element: Element) => {
		const mouseEnter = new MouseEvent("mouseenter", { bubbles: true });
		const mouseOver = new MouseEvent("mouseover", { bubbles: true });
		element.dispatchEvent(mouseEnter);
		element.dispatchEvent(mouseOver);
	},

	simulateLeave: (element: Element) => {
		const mouseLeave = new MouseEvent("mouseleave", { bubbles: true });
		const mouseOut = new MouseEvent("mouseout", { bubbles: true });
		element.dispatchEvent(mouseLeave);
		element.dispatchEvent(mouseOut);
	},
};

// Extend global types for TypeScript
declare global {
	const testUtilities: {
		waitForAnimation: () => Promise<void>;
		triggerResize: () => void;
		simulateHover: (element: Element) => void;
		simulateLeave: (element: Element) => void;
	};
}
