import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { IconButton } from "../components/iconButton";
import { SymbolTile } from "../components/symbolTile";
import { setupDOM } from "./test-setup";

beforeAll(() => {
	setupDOM();
});

describe("Core components", () => {
	it("Button supports visual variants and tones", () => {
		const { getByRole, rerender } = render(
			<Button variant="filled" tone="accent">
				Primary
			</Button>,
		);
		const button = getByRole("button", { name: /primary/i });
		expect(button.className).toMatch(/liquid-/);

		rerender(
			<Button variant="tinted" tone="neutral">
				Secondary
			</Button>,
		);
		const secondary = getByRole("button", { name: /secondary/i });
		expect(secondary.className).toMatch(/liquid-/);
	});

	it("Card renders with variant and padding props", () => {
		const { getByText } = render(
			<Card variant="glass" padded>
				Content
			</Card>,
		);
		const card = getByText("Content").closest("div") as HTMLElement;
		expect(card).toBeInTheDocument();
		expect(card.className).toMatch(/card/);
	});

	it("IconButton renders icon-only button", () => {
		const { getByRole } = render(
			<IconButton icon="plus" aria-label="Add item" />,
		);
		const button = getByRole("button", { name: /add item/i });
		expect(button).toBeInTheDocument();
	});

	it("SymbolTile renders with tint", () => {
		const { getByText } = render(<SymbolTile tint="blue">★</SymbolTile>);
		const tile = getByText("★");
		expect(tile).toBeInTheDocument();
	});
});
