import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	fireEvent,
	renderWithProviders,
	screen,
	testA11y,
	waitFor,
// @ts-expect-error TS(2307): Cannot find module '@/test/utils' or its correspon... Remove this comment to see the full error message
} from "@/test/utils";
// @ts-expect-error TS(6142): Module './glass-select' was resolved to '/Users/tu... Remove this comment to see the full error message
import { GlassSelect, type GlassSelectOption } from "./glass-select";

describe("GlassSelect", () => {
	const mockOptions: GlassSelectOption[] = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3", disabled: true },
	];

	const defaultProps = {
		options: mockOptions,
		placeholder: "Select an option",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders with placeholder", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);
		expect(screen.getByText("Select an option")).toBeInTheDocument();
	});

	it("renders with selected value", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} value="option2" />);
		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});

	it("opens dropdown on click", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(screen.getByText("Option 1")).toBeInTheDocument();
		expect(screen.getByText("Option 2")).toBeInTheDocument();
		expect(screen.getByText("Option 3")).toBeInTheDocument();
	});

	it("closes dropdown on option select", () => {
		const onChange = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} onChange={onChange} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		fireEvent.click(screen.getByText("Option 1"));

		expect(onChange).toHaveBeenCalledWith("option1");
		expect(screen.queryByText("Option 2")).not.toBeInTheDocument(); // Dropdown closed
	});

	it("shows selected option with check mark", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} value="option2" />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		const selectedOption = screen.getByText("Option 2").closest("button");
		const checkIcon = selectedOption?.querySelector("svg");
		expect(checkIcon).toBeInTheDocument();
	});

	it("handles disabled state", () => {
		const onChange = vi.fn();
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSelect {...defaultProps} disabled onChange={onChange} />,
		);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
		expect(button).toHaveClass("opacity-50", "cursor-not-allowed");

		fireEvent.click(button);
		expect(onChange).not.toHaveBeenCalled();
		expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
	});

	it("handles disabled options", () => {
		const onChange = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} onChange={onChange} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		const disabledOption = screen.getByText("Option 3").closest("button");
		expect(disabledOption).toHaveClass("opacity-50", "cursor-not-allowed");

		fireEvent.click(disabledOption!);
		expect(onChange).not.toHaveBeenCalled();
	});

	it("closes dropdown when clicking outside", async () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassSelect {...defaultProps} />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div data-testid="outside">Outside</div>
			</div>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(screen.getByText("Option 1")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByTestId("outside"));

		await waitFor(() => {
			expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
		});
	});

	it("rotates chevron icon when open", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");
		const chevron = button.querySelector("svg");

		expect(chevron).not.toHaveClass("rotate-180");

		fireEvent.click(button);
		expect(chevron).toHaveClass("rotate-180");
	});

	it("handles controlled value changes", () => {
		const { rerender } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSelect {...defaultProps} value="option1" />,
		);

		expect(screen.getByText("Option 1")).toBeInTheDocument();

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassSelect {...defaultProps} value="option2" />);

		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});

	it("applies custom className", () => {
		const { container } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSelect {...defaultProps} className="custom-select" />,
		);

		const selectWrapper = container.firstChild;
		expect(selectWrapper).toHaveClass("custom-select");
	});

	it("forwards ref correctly", () => {
		const ref = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} ref={ref} />);

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
	});

	it("shows ring when open", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");

		expect(button).not.toHaveClass("ring-2");

		fireEvent.click(button);
		expect(button).toHaveClass("ring-2", "ring-blue-500/50");
	});

	it("handles empty options array", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect options={[]} placeholder="No options" />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Dropdown should still open but be empty
		const dropdown = typeof document === "undefined" ? null : document.querySelector(".animate-in");
		expect(dropdown).toBeInTheDocument();
		expect(dropdown?.children.length).toBe(0);
	});

	it("handles keyboard navigation", async () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");
		button.focus();

		// Open with Enter or Space
		fireEvent.keyDown(button, { key: "Enter" });
		await waitFor(() => {
			expect(screen.getByText("Option 1")).toBeInTheDocument();
		});
	});

	it("maintains selection on re-render", () => {
		const onChange = vi.fn();
		const { rerender } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSelect {...defaultProps} onChange={onChange} />,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		fireEvent.click(screen.getByText("Option 2"));

		expect(screen.getByText("Option 2")).toBeInTheDocument();

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassSelect {...defaultProps} onChange={onChange} />);

		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});

	it("meets accessibility standards", async () => {
		const { container } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSelect {...defaultProps} />,
		);

		await testA11y(container);
	});

	it("handles hover states", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		const option = screen.getByText("Option 1").closest("button");

		fireEvent.mouseEnter(option!);
		expect(option).toHaveClass("hover:bg-white/10");
	});

	it("handles focus states", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");

		fireEvent.focus(button);
		expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
	});

	it("handles variant prop", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} variant="search" />);

		// The component accepts the variant prop but doesn't seem to use it
		// This test ensures it doesn't break when provided
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("cleans up event listeners on unmount", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		const { unmount } = renderWithProviders(<GlassSelect {...defaultProps} />);

		const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

		unmount();

		expect(removeEventListenerSpy).toHaveBeenCalledWith(
			"mousedown",
			expect.any(Function),
		);

		removeEventListenerSpy.mockRestore();
	});

	it("handles rapid open/close actions", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");

		// Rapidly click to open and close
		fireEvent.click(button);
		fireEvent.click(button);
		fireEvent.click(button);

		// Should be open after odd number of clicks
		expect(screen.getByText("Option 1")).toBeInTheDocument();
	});

	it("preserves other props on root element", () => {
		const { container } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassSelect
				{...defaultProps}
				data-testid="custom-select"
				aria-label="Custom select"
			/>,
		);

		const selectWrapper = container.firstChild;
		expect(selectWrapper).toHaveAttribute("data-testid", "custom-select");
		expect(selectWrapper).toHaveAttribute("aria-label", "Custom select");
	});
});
