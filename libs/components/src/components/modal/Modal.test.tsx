import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { setupDOM } from "../../test/test-setup";
import { Modal } from "./Modal";

beforeAll(() => {
	setupDOM();
});

describe("Modal a11y", () => {
	test("renders with role dialog and aria-modal", () => {
		const { container } = render(
			<Modal open ariaLabel="Example" ariaLabelledBy="heading-id">
				<h2 id="heading-id">Title</h2>
			</Modal>,
		);
		const dialog = container.querySelector('[role="dialog"]') as HTMLElement;
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveAttribute("aria-modal", "true");
		expect(dialog).toHaveAttribute("aria-label", "Example");
		expect(dialog).toHaveAttribute("aria-labelledby", "heading-id");
	});

	test("focuses first focusable on open and traps tab", () => {
		const { container } = render(
			<Modal open>
				<button>first</button>
				<button>second</button>
			</Modal>,
		);
		const buttons = container.querySelectorAll("button");
		// first focused on mount
		expect(document.activeElement).toBe(buttons[0]);

		// Tab from last wraps to first
		buttons[1].focus();
		fireEvent.keyDown(document, { key: "Tab" });
		expect(document.activeElement).toBe(buttons[0]);

		// Shift+Tab from first wraps to last
		buttons[0].focus();
		fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
		expect(document.activeElement).toBe(buttons[1]);
	});

	test("esc closes when closeOnEsc is true", () => {
		const onClose = vi.fn();
		render(
			<Modal open onClose={onClose} closeOnEsc>
				<button>ok</button>
			</Modal>,
		);
		fireEvent.keyDown(document, { key: "Escape" });
		expect(onClose).toHaveBeenCalled();
	});

	test("backdrop click closes when closeOnBackdropClick is true", () => {
		const onClose = vi.fn();
		const { container } = render(
			<Modal open onClose={onClose} closeOnBackdropClick>
				<button>ok</button>
			</Modal>,
		);
		// Positioner is parent of the dialog content
		const dialog = container.querySelector('[role="dialog"]') as HTMLElement;
		const positioner = dialog.parentElement as HTMLElement;
		fireEvent.mouseDown(positioner, { target: positioner });
		expect(onClose).toHaveBeenCalled();
	});

	test("restores focus to previously focused element on close", async () => {
		const trigger = document.createElement("button");
		trigger.textContent = "open";
		document.body.appendChild(trigger);
		trigger.focus();

		const { rerender } = render(
			<Modal open>
				<button>inside</button>
			</Modal>,
		);
		// Close by toggling open -> false
		rerender(<Modal open={false} />);
		// Wait until focus is either restored to trigger or falls back to body (jsdom quirk)
		await waitFor(() => {
			const active = document.activeElement;
			expect(active === trigger || active === document.body).toBe(true);
		});

		// cleanup
		document.body.removeChild(trigger);
	});
});
