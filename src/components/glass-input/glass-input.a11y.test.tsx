import { describe, expect, it } from "vitest";
import {
	getGlassComponentTestSuite,
	renderWithProviders,
	screen,
	testA11y,
// @ts-expect-error TS(2307): Cannot find module '@/test/utils' or its correspon... Remove this comment to see the full error message
} from "@/test/utils";
// @ts-expect-error TS(6142): Module './glass-input' was resolved to '/Users/tul... Remove this comment to see the full error message
import { GlassInput } from "./glass-input";

const _testSuite = getGlassComponentTestSuite("GlassInput");

describe("GlassInput Accessibility", () => {
	it("should be accessible", async () => {
		const { container } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput aria-label="Accessible input" placeholder="Enter text" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveAccessibleName("Accessible input");
		expect(input).toHaveAttribute("aria-label", "Accessible input");

		await testA11y(container);
	});

	it("supports aria-label and aria-labelledby", async () => {
		const { rerender } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput aria-label="hidden label" placeholder="No visible label" />,
		);
		let input = screen.getByRole("textbox", { name: "hidden label" });

		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("aria-label", "hidden label");

		rerender(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput aria-labelledby="label" placeholder="No visible label" />,
		);
		const label = document.createElement("label");
		label.id = "label";
		label.textContent = "Visible label";
		document.body.append(label);

		input = screen.getByRole("textbox", { name: "Visible label" });
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("aria-labelledby", "label");

		label.remove();
	});

	it("handles aria-invalid state", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput aria-invalid="true" placeholder="Invalid input" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("aria-invalid", "true");
	});

	it("handles aria-required state", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput aria-required="true" placeholder="Required input" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveAttribute("aria-required", "true");
	});

	it("maintains accessibility with custom styles", async () => {
		const { container } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput className="text-custom" placeholder="Styled input" />,
		);
		const input = screen.getByRole("textbox");

		expect(input).toHaveClass("text-custom");

		await testA11y(container);
	});
});
