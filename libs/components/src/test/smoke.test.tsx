import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { Checkbox } from "../components/ark-ui/checkbox/checkbox";
// Import components directly from source to avoid bundling concerns in tests
import { Button } from "../components/button";
import { setupDOM } from "./test-setup";

// Ensure DOM environment and mocks are set up
beforeAll(() => {
	setupDOM();
});

// Basic smoke tests to ensure components render and carry styling classes

describe("LiqUIdify components (smoke)", () => {
	it("Button renders with Liquid recipe class", () => {
		const { getByRole } = render(<Button variant="primary">Click</Button>);
		const btn = getByRole("button", { name: /click/i });
		// Panda recipe generates class names prefixed by recipe key (e.g., liquid-button)
		expect(btn.className).toMatch(/liquid-/);
	});

	it("Checkbox renders without crash and shows label", () => {
		const { getByText } = render(<Checkbox label="Accept" />);
		// Ark UI Checkbox renders a label element for text
		expect(getByText("Accept")).toBeInTheDocument();
	});
});
