/**
 * React Server Components and SSR Compatibility Tests
 * Tests to ensure components work correctly in server environments
 */

import type React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

// Import components to test
import { GlassButton } from "../../components/glass-button-refactored";
import { GlassCard } from "../../components/glass-card-refactored";
import { GlassInput } from "../../components/glass-input";

// Mock window and browser APIs for SSR environment
const _mockWindow = {
	matchMedia: vi.fn(() => ({
		matches: false,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
	requestAnimationFrame: vi.fn(),
	cancelAnimationFrame: vi.fn(),
};

// Mock GSAP for server environment
vi.mock("gsap", () => ({
	default: {
		timeline: vi.fn(() => ({
			to: vi.fn(() => ({ to: vi.fn() })),
			from: vi.fn(() => ({ to: vi.fn() })),
			set: vi.fn(() => ({ to: vi.fn() })),
		})),
		to: vi.fn(),
		from: vi.fn(),
		set: vi.fn(),
	},
}));

// Mock framer-motion for server environment
vi.mock("framer-motion", () => ({
	motion: {
		div: "div",
		button: "button",
		input: "input",
		span: "span",
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
	useAnimation: () => ({}),
	useMotionValue: () => ({ set: vi.fn(), get: vi.fn() }),
}));

describe("Server-Side Rendering Compatibility", () => {
	beforeEach(() => {
		// Setup server environment
		Object.defineProperty(globalThis, "window", {
			value: undefined,
			writable: true,
		});

		Object.defineProperty(globalThis, "document", {
			value: undefined,
			writable: true,
		});

		Object.defineProperty(globalThis, "navigator", {
			value: undefined,
			writable: true,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("GlassButton SSR", () => {
		it("should render without errors on server", () => {
			expect(() => {
				const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton variant="default">Test Button</GlassButton>,
				);
				expect(html).toContain("Test Button");
			}).not.toThrow();
		});

		it("should render with all variants on server", () => {
			for (const variant of [
				"default",
				"primary",
				"secondary",
				"destructive",
				"outline",
				"ghost",
			]) {
				expect(() => {
					const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton variant={variant as any}>Button content</GlassButton>,
					);
					expect(html).toContain("Button content");
				}).not.toThrow();
			}
		});

		it("should handle disabled state on server", () => {
			expect(() => {
				const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton disabled>Disabled Button</GlassButton>,
				);
				expect(html).toContain("Disabled Button");
			}).not.toThrow();
		});
	});

	describe("GlassCard SSR", () => {
		it("should render without errors on server", () => {
			expect(() => {
				const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassCard>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div>Card Content</div>
					</GlassCard>,
				);
				expect(html).toContain("Card Content");
			}).not.toThrow();
		});

		it("should render with blur variants on server", () => {
			const blurVariants = ["light", "medium", "heavy"] as const;

			for (const blur of blurVariants) {
				expect(() => {
					const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassCard blur={blur}>Card content</GlassCard>,
					);
					expect(html).toContain("Card content");
				}).not.toThrow();
			}
		});
	});

	describe("GlassInput SSR", () => {
		it("should render without errors on server", () => {
			expect(() => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				const html = renderToString(<GlassInput placeholder="Test input" />);
				expect(html).toContain('placeholder="Test input"');
			}).not.toThrow();
		});

		it("should handle controlled input on server", () => {
			expect(() => {
				const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassInput value="Test value" onChange={() => {}} />,
				);
				expect(html).toContain('value="Test value"');
			}).not.toThrow();
		});
	});

	describe("Hydration Safety", () => {
		it("should not use browser-only APIs during SSR", () => {
			// Test that components don't call browser APIs during SSR
			const consoleWarnSpy = vi
				.spyOn(console, "warn")
				.mockImplementation(() => {});
			const consoleErrorSpy = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});

			renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton>Button</GlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassCard>Card</GlassCard>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassInput placeholder="Input" />
				</div>,
			);

			// Should not have warnings or errors about browser APIs
			expect(consoleWarnSpy).not.toHaveBeenCalled();
			expect(consoleErrorSpy).not.toHaveBeenCalled();

			consoleWarnSpy.mockRestore();
			consoleErrorSpy.mockRestore();
		});

		it("should generate consistent HTML structure", () => {
			const component = (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassCard>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassButton>Click me</GlassButton>
				</GlassCard>
			);

			const html1 = renderToString(component);
			const html2 = renderToString(component);

			expect(html1).toBe(html2);
		});
	});

	describe("CSS Variables SSR", () => {
		it("should work with CSS variables in SSR environment", () => {
			expect(() => {
				const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div
						style={{
							backgroundColor: "var(--liquid-glass-primary)",
							borderRadius: "var(--liquid-radius-md)",
						}}
					>
						CSS Variables Test
					</div>,
				);
				expect(html).toContain("--liquid-glass-primary");
				expect(html).toContain("--liquid-radius-md");
			}).not.toThrow();
		});
	});
});

describe("Next.js App Router Compatibility", () => {
	it("should work as React Server Component", async () => {
		// Test that components can be used as RSCs
		const ServerComponent = () => {
			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassCard>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<h1>Server Rendered Card</h1>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p>This is rendered on the server</p>
					</GlassCard>
				</div>
			);
		};

		expect(() => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			const html = renderToString(<ServerComponent />);
			expect(html).toContain("Server Rendered Card");
			expect(html).toContain("This is rendered on the server");
		}).not.toThrow();
	});

	it("should support static rendering", () => {
		const StaticComponent = () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassButton variant="primary">Static Button</GlassButton>
		);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		const html = renderToString(<StaticComponent />);
		expect(html).toContain("Static Button");
		expect(html).not.toContain("undefined");
	});
});

describe("Progressive Enhancement", () => {
	it("should provide fallback for JavaScript-disabled environments", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		const html = renderToString(<GlassButton>Works without JS</GlassButton>);

		// Should render as a basic button that works without JavaScript
		expect(html).toContain("Works without JS");
		expect(html).toMatch(/<button[^>]*>/);
	});

	it("should maintain accessibility without JavaScript", () => {
		const html = renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassButton aria-label="Accessible button">Accessible</GlassButton>,
		);

		expect(html).toContain('aria-label="Accessible button"');
	});
});
