import { describe, expect, it } from "vitest";
import {
	getGlassComponentTestSuite,
	renderWithProviders,
	screen,
	testA11y,
} from "@/test/utils";
import { GlassInput } from "./glass-input";

const _testSuite = getGlassComponentTestSuite("GlassInput");

describe("GlassInput Accessibility", () => {
	it("should be accessible", async () => {
		const { container } = renderWithProviders(
			<GlassInput aria-label="Accessible input" placeholder="Enter text" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveAccessibleName("Accessible input");
		expect(input).toHaveAttribute("aria-label", "Accessible input");

		await testA11y(container);
	});

	it("supports aria-label and aria-labelledby", async () => {
		const { rerender } = renderWithProviders(
			<GlassInput aria-label="hidden label" placeholder="No visible label" />,
		);
		let input = screen.getByRole("textbox", { name: "hidden label" });

		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("aria-label", "hidden label");

		rerender(
			<GlassInput aria-labelledby="label" placeholder="No visible label" />,
		);
		const label = document.createElement("label");
		label.id = "label";
		label.textContent = "Visible label";
		document.body.appendChild(label);

		input = screen.getByRole("textbox", { name: "Visible label" });
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("aria-labelledby", "label");

		document.body.removeChild(label);
	});

	it("handles aria-invalid state", () => {
		renderWithProviders(
			<GlassInput aria-invalid="true" placeholder="Invalid input" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("aria-invalid", "true");
	});

	it("handles aria-required state", () => {
		renderWithProviders(
			<GlassInput aria-required="true" placeholder="Required input" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("aria-required", "true");
	});

	it("maintains accessibility with custom styles", async () => {
		const { container } = renderWithProviders(
			<GlassInput className="text-custom" placeholder="Styled input" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveClass("text-custom");

		await testA11y(container);
	});
});
