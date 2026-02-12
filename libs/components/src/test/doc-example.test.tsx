import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { setupDOM } from "./test-setup";

// Set up DOM environment
beforeAll(() => {
	setupDOM();
});

// Minimal example test used by .junie/guidelines.md
// This does not import library code to keep it hermetic and fast
function Hello({ name }: { name: string }) {
	return <output>Hello, {name}!</output>;
}

describe("doc example", () => {
	it("renders greeting", () => {
		const { getByText } = render(<Hello name="LiqUIdify" />);
		expect(getByText("Hello, LiqUIdify!")).toBeInTheDocument();
	});
});
