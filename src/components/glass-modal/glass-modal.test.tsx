import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error TS(2307): Cannot find module '@/components/glass-live-region... Remove this comment to see the full error message
import { announcer } from "@/components/glass-live-region";
import {
	fireEvent,
	renderWithProviders,
	screen,
	testA11y,
	waitFor,
// @ts-expect-error TS(2307): Cannot find module '@/test/utils' or its correspon... Remove this comment to see the full error message
} from "@/test/utils";
// @ts-expect-error TS(6142): Module './glass-modal' was resolved to '/Users/tul... Remove this comment to see the full error message
import { GlassModal } from "./glass-modal";

// Mock the announcer and provider
vi.mock("@/components/glass-live-region", () => ({
	announcer: {
		announce: vi.fn(),
	},
	GlassLiveRegionProvider: ({ children }: { children: React.ReactNode }) =>
		children,
}));

describe("GlassModal", () => {
	const defaultProps = {
		isOpen: true,
		onClose: vi.fn(),
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		children: <div>Modal content</div>,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		// Cleanup any body styles
		document.body.style.overflow = "";
		document.body.style.paddingRight = "";
	});

	it("renders when open", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Modal content")).toBeInTheDocument();
	});

	it("does not render when closed", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} isOpen={false} />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders with title", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} title="Test Modal" />);

		expect(screen.getByText("Test Modal")).toBeInTheDocument();
		const dialog = screen.getByRole("dialog");
		expect(dialog).toHaveAttribute("aria-labelledby");
	});

	it("calls onClose when close button is clicked", () => {
		const onClose = vi.fn();
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} onClose={onClose} title="Test Modal" />,
		);

		fireEvent.click(screen.getByLabelText("Close modal"));
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("calls onClose when clicking backdrop", () => {
		const onClose = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} onClose={onClose} />);

		const backdrop = typeof document === "undefined" ? null : document.querySelector(".glass-modal-backdrop");
		fireEvent.click(backdrop!);
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("does not close on backdrop click when disabled", () => {
		const onClose = vi.fn();
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal
				{...defaultProps}
				onClose={onClose}
				closeOnBackdropClick={false}
			/>,
		);

		const backdrop = typeof document === "undefined" ? null : document.querySelector(".glass-modal-backdrop");
		fireEvent.click(backdrop!);
		expect(onClose).not.toHaveBeenCalled();
	});

	it("does not close when clicking modal content", () => {
		const onClose = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} onClose={onClose} />);

		fireEvent.click(screen.getByRole("dialog"));
		expect(onClose).not.toHaveBeenCalled();
	});

	it("locks body scroll when open", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} />);

		expect(document.body.style.overflow).toBe("hidden");
		expect(document.body.style.paddingRight).toBeTruthy();
	});

	it("restores body scroll when closed", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		const { rerender } = renderWithProviders(<GlassModal {...defaultProps} />);

		expect(document.body.style.overflow).toBe("hidden");

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassModal {...defaultProps} isOpen={false} />);

		expect(document.body.style.overflow).toBe("");
		expect(document.body.style.paddingRight).toBe("");
	});

	it("applies custom className", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} className="custom-modal" />,
		);

		const modal = screen.getByRole("dialog");
		expect(modal).toHaveClass("custom-modal");
	});

	it("applies custom title className", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal
				{...defaultProps}
				title="Custom Title"
				titleClassName="custom-title"
			/>,
		);

		expect(screen.getByText("Custom Title")).toHaveClass("custom-title");
	});

	it("applies custom content className", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} contentClassName="custom-content" />,
		);

		const content = typeof document === "undefined" ? null : document.querySelector(".glass-modal-content");
		expect(content).toHaveClass("custom-content");
	});

	it("handles escape key when enabled", () => {
		const onClose = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} onClose={onClose} />);

		fireEvent.keyDown(document, { key: "Escape" });
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	it("does not handle escape key when disabled", () => {
		const onClose = vi.fn();
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} onClose={onClose} closeOnEscape={false} />,
		);

		fireEvent.keyDown(document, { key: "Escape" });
		expect(onClose).not.toHaveBeenCalled();
	});

	it("announces when opened", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} title="Announcement Test" />,
		);

		expect(announcer.announce).toHaveBeenCalledWith(
			"Announcement Test opened",
			"polite",
		);
	});

	it("announces generic message when opened without title", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} />);

		expect(announcer.announce).toHaveBeenCalledWith("Dialog opened", "polite");
	});

	it("meets accessibility standards", async () => {
		const { container } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} title="Accessible Modal" />,
		);

		await testA11y(container);
	});

	it("has proper ARIA attributes", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} title="ARIA Test" />);

		const dialog = screen.getByRole("dialog");
		expect(dialog).toHaveAttribute("aria-modal", "true");
		expect(dialog).toHaveAttribute("aria-labelledby");
		expect(dialog).toHaveAttribute("aria-describedby");
	});

	it("focuses close button by default", async () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} title="Focus Test" />);

		await waitFor(() => {
			const closeButton = screen.getByLabelText("Close modal");
			expect(document.activeElement).toBe(closeButton);
		});
	});

	it("supports custom initial focus", async () => {
// @ts-expect-error TS(2352): Conversion of type '{ current: null; }' to type 'R... Remove this comment to see the full error message
		const focusRef = { current: null } as React.RefObject<HTMLButtonElement>;

		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} initialFocus={focusRef}>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<button ref={focusRef}>Focus me</button>
			</GlassModal>,
		);

		await waitFor(() => {
			expect(document.activeElement).toBe(screen.getByText("Focus me"));
		});
	});

	it("renders in a custom portal target", () => {
		const portalTarget = document.createElement("div");
		portalTarget.id = "custom-portal";
		document.body.append(portalTarget);

		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} portalTarget={portalTarget} />,
		);

		expect(portalTarget.querySelector(".glass-modal")).toBeInTheDocument();

		// Cleanup
		portalTarget.remove();
	});

	it("handles animation classes", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassModal {...defaultProps} />);

		const modal = screen.getByRole("dialog");
		expect(modal).toHaveClass("animate-scale");
	});

	it("manages focus trap correctly", async () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassModal {...defaultProps} title="Focus Trap Test">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<button>First button</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<button>Second button</button>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<button>Third button</button>
			</GlassModal>,
		);

		const buttons = screen.getAllByRole("button");
		const closeButton = screen.getByLabelText("Close modal");

		// Initial focus should be on close button
		await waitFor(() => {
			expect(document.activeElement).toBe(closeButton);
		});

		// Tab should cycle through focusable elements
		fireEvent.keyDown(document, { key: "Tab" });
		expect(document.activeElement).toBe(buttons[1]); // First content button

		fireEvent.keyDown(document, { key: "Tab" });
		expect(document.activeElement).toBe(buttons[2]); // Second content button
	});

	it("stops event propagation on modal content click", () => {
		const onClose = vi.fn();
		const outerClick = vi.fn();

		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div onClick={outerClick}>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassModal {...defaultProps} onClose={onClose} />
			</div>,
		);

		fireEvent.click(screen.getByRole("dialog"));
		expect(onClose).not.toHaveBeenCalled();
		expect(outerClick).not.toHaveBeenCalled();
	});

	it("cleans up body styles on unmount", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		const { unmount } = renderWithProviders(<GlassModal {...defaultProps} />);

		expect(document.body.style.overflow).toBe("hidden");

		unmount();

		expect(document.body.style.overflow).toBe("");
		expect(document.body.style.paddingRight).toBe("");
	});
});
