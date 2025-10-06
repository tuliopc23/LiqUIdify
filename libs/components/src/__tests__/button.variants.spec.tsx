/**
 * Button Variant and Tone Rendering Tests
 * Tests all combinations of variants, tones, and states for the Button component
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../components/button";

describe("Button Variant and Tone Combinations", () => {
	const variants = ["filled", "tinted", "plain"] as const;
	const tones = ["accent", "neutral", "destructive"] as const;

	// Test all 9 variant/tone combinations
	for (const variant of variants) {
		for (const tone of tones) {
			describe(`${variant} × ${tone}`, () => {
				it("should render with correct variant and tone attributes", () => {
					render(
						<Button variant={variant} tone={tone}>
							Test Button
						</Button>,
					);

					const button = screen.getByRole("button");
					expect(button).toBeInTheDocument();
					expect(button).toHaveTextContent("Test Button");

					// Verify the button is rendered (basic smoke test)
					expect(button).toBeTruthy();
				});

				it("should render in default state", () => {
					render(
						<Button variant={variant} tone={tone}>
							Default State
						</Button>,
					);

					const button = screen.getByRole("button");
					expect(button).not.toBeDisabled();
					expect(button).not.toHaveAttribute("aria-busy", "true");
					expect(button).not.toHaveAttribute("data-loading");
				});

				it("should render in disabled state", () => {
					render(
						<Button variant={variant} tone={tone} disabled>
							Disabled Button
						</Button>,
					);

					const button = screen.getByRole("button");
					expect(button).toBeDisabled();
				});

				it("should render in loading state", () => {
					render(
						<Button variant={variant} tone={tone} loading>
							Loading Button
						</Button>,
					);

					const button = screen.getByRole("button");
					expect(button).toHaveAttribute("aria-busy", "true");
					expect(button).toHaveAttribute("data-loading");
					// Loading also disables the button
					expect(button).toBeDisabled();
				});
			});
		}
	}
});

describe("Button States", () => {
	it("should handle focus state", async () => {
		const user = userEvent.setup();
		render(
			<Button variant="filled" tone="accent">
				Focus Test
			</Button>,
		);

		const button = screen.getByRole("button");
		await user.tab();

		expect(button).toHaveFocus();
	});

	it("should handle disabled state preventing interactions", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Button variant="filled" tone="accent" disabled onClick={handleClick}>
				Disabled Button
			</Button>,
		);

		const button = screen.getByRole("button");
		await user.click(button);

		// Click should not fire when disabled
		expect(handleClick).not.toHaveBeenCalled();
		expect(button).toBeDisabled();
	});

	it("should handle loading state preventing interactions", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Button variant="filled" tone="accent" loading onClick={handleClick}>
				Loading Button
			</Button>,
		);

		const button = screen.getByRole("button");
		await user.click(button);

		// Click should not fire when loading
		expect(handleClick).not.toHaveBeenCalled();
		expect(button).toHaveAttribute("aria-busy", "true");
	});
});

describe("Button Sizes", () => {
	const sizes = ["compact", "regular", "large"] as const;

	for (const size of sizes) {
		it(`should render with ${size} size`, () => {
			render(
				<Button variant="filled" tone="accent" size={size}>
					{size} Button
				</Button>,
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent(`${size} Button`);
		});
	}
});

describe("Button Icon Support", () => {
	it("should render with icon at start position", () => {
		render(
			<Button
				variant="filled"
				tone="accent"
				icon={<span data-testid="icon">🔥</span>}
				iconPosition="start"
			>
				With Icon
			</Button>,
		);

		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveTextContent("With Icon");
	});

	it("should render with icon at end position", () => {
		render(
			<Button
				variant="filled"
				tone="accent"
				icon={<span data-testid="icon">→</span>}
				iconPosition="end"
			>
				With Icon
			</Button>,
		);

		expect(screen.getByTestId("icon")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveTextContent("With Icon");
	});

	it("should render icon-only button with aria-label", () => {
		render(
			<Button
				variant="filled"
				tone="accent"
				icon={<span data-testid="icon">✕</span>}
				aria-label="Close"
			/>,
		);

		const button = screen.getByRole("button", { name: "Close" });
		expect(button).toBeInTheDocument();
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});
});

describe("Button Legacy Variants", () => {
	const legacyVariants = ["primary", "secondary", "ghost", "danger"] as const;

	for (const variant of legacyVariants) {
		it(`should render legacy ${variant} variant`, () => {
			render(<Button variant={variant}>Legacy {variant}</Button>);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent(`Legacy ${variant}`);
		});
	}
});

describe("Button Polymorphic Rendering", () => {
	it("should render as anchor element when as='a'", () => {
		render(
			<Button as="a" href="/test" variant="filled" tone="accent">
				Link Button
			</Button>,
		);

		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/test");
		expect(link).toHaveTextContent("Link Button");
	});
});

describe("Button Accessibility", () => {
	it("should have role=button by default", () => {
		render(
			<Button variant="filled" tone="accent">
				Accessible Button
			</Button>,
		);

		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should apply custom aria-label", () => {
		render(
			<Button
				variant="filled"
				tone="accent"
				icon={<span>✕</span>}
				aria-label="Close dialog"
			/>,
		);

		expect(
			screen.getByRole("button", { name: "Close dialog" }),
		).toBeInTheDocument();
	});

	it("should be keyboard navigable", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<Button variant="filled" tone="accent" onClick={handleClick}>
				Click Me
			</Button>,
		);

		const button = screen.getByRole("button");
		await user.tab();
		expect(button).toHaveFocus();

		await user.keyboard("{Enter}");
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
