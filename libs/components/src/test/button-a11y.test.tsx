import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Button } from "../components/button";
import { setupDOM } from "./test-setup";

beforeAll(() => {
	setupDOM();
});

describe("Button accessibility and interaction", () => {
	it("native button: loading state sets aria-busy, data-loading, and disables interactions", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		const { getByRole } = render(
			<Button loading onClick={onClick}>
				Submit
			</Button>,
		);

		const btn = getByRole("button", { name: /submit/i });
		expect(btn).toHaveAttribute("aria-busy", "true");
		expect(btn).toHaveAttribute("data-loading");
		// Native button receives disabled attribute when loading
		expect(btn).toBeDisabled();

		await user.click(btn);
		expect(onClick).not.toHaveBeenCalled();
	});

	it('link-as-button: sets role="button", aria-disabled, and tabIndex correctly when disabled', async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		const { getByRole } = render(
			<Button as="a" href="#dest" disabled onClick={onClick}>
				Go
			</Button>,
		);

		const btn = getByRole("button", { name: /go/i });
		// Semantics for non-native element
		expect(btn).toHaveAttribute("role", "button");
		expect(btn).toHaveAttribute("aria-disabled", "true");
		// Should not set native disabled attribute on anchor
		expect(btn).not.toHaveAttribute("disabled");
		// Disabled non-native elements should not be focusable
		expect(btn).toHaveAttribute("tabindex", "-1");

		await user.click(btn);
		expect(onClick).not.toHaveBeenCalled();
	});

	it("icon-only without aria-label warns in development and sets data-icon-only", () => {
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

		const { getByRole } = render(
			<Button icon={<span aria-hidden="true">★</span>} />,
		);

		// Warn about missing accessible name for icon-only buttons
		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy.mock.calls[0][0]).toMatch(
			/Icon-only buttons must include an accessible name/i,
		);

		const btn = getByRole("button");
		expect(btn).toHaveAttribute("data-icon-only");

		warnSpy.mockRestore();
	});

	it("icon-only with aria-label does not warn", () => {
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

		render(
			<Button icon={<span aria-hidden="true">★</span>} aria-label="Star" />,
		);

		expect(warnSpy).not.toHaveBeenCalled();
		warnSpy.mockRestore();
	});

	it("aria-disabled applied when loading for non-native element (as='a')", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();

		const { getByRole } = render(
			<Button as="a" href="#save" loading onClick={onClick}>
				Saving
			</Button>,
		);

		const btn = getByRole("button", { name: /saving/i });
		expect(btn).toHaveAttribute("aria-busy", "true");
		expect(btn).toHaveAttribute("data-loading");
		// Non-native element: aria-disabled should be true when loading
		expect(btn).toHaveAttribute("aria-disabled", "true");
		// TabIndex should be -1 when interactions are disabled
		expect(btn).toHaveAttribute("tabindex", "-1");

		await user.click(btn);
		expect(onClick).not.toHaveBeenCalled();
	});
});
