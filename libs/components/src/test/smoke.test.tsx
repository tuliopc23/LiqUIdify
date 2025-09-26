import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { setupDOM } from "./test-setup";
import { Checkbox } from "../components/ark-ui/checkbox/checkbox";
// Import components directly from source to avoid bundling concerns in tests
import { Button } from "../components/button";

// Ensure DOM environment and mocks are set up
beforeAll(() => {
	setupDOM();
});

// Basic smoke tests to ensure components render and carry styling classes

describe("LiqUIdify components (smoke)", () => {
	it("Button renders with Liquid recipe class", () => {
		render(<Button variant="primary">Click</Button>);
		const btn = screen.getByRole("button", { name: /click/i });
		// Panda recipe generates class names prefixed by recipe key (e.g., liquid-button)
		expect(btn.className).toMatch(/liquid-/);
	});

	it("Checkbox renders without crash and shows label", () => {
		render(<Checkbox label="Accept" />);
		// Ark UI Checkbox renders a label element for text
		expect(screen.getByText("Accept")).toBeInTheDocument();
	});
});
