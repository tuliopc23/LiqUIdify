import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	fireEvent,
	renderWithProviders,
	screen,
	testA11y,
	waitFor,
} from "@/test/utils";
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
		renderWithProviders(<GlassSelect {...defaultProps} />);
		expect(screen.getByText("Select an option")).toBeInTheDocument();
	});

	it("renders with selected value", () => {
		renderWithProviders(<GlassSelect {...defaultProps} value="option2" />);
		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});

	it("opens dropdown on click", () => {
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(screen.getByText("Option 1")).toBeInTheDocument();
		expect(screen.getByText("Option 2")).toBeInTheDocument();
		expect(screen.getByText("Option 3")).toBeInTheDocument();
	});

	it("closes dropdown on option select", () => {
		const onChange = vi.fn();
		renderWithProviders(<GlassSelect {...defaultProps} onChange={onChange} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		fireEvent.click(screen.getByText("Option 1"));

		expect(onChange).toHaveBeenCalledWith("option1");
		expect(screen.queryByText("Option 2")).not.toBeInTheDocument(); // Dropdown closed
	});

	it("shows selected option with check mark", () => {
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
			<div>
				<GlassSelect {...defaultProps} />
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
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");
		const chevron = button.querySelector("svg");

		expect(chevron).not.toHaveClass("rotate-180");

		fireEvent.click(button);
		expect(chevron).toHaveClass("rotate-180");
	});

	it("handles controlled value changes", () => {
		const { rerender } = renderWithProviders(
			<GlassSelect {...defaultProps} value="option1" />,
		);

		expect(screen.getByText("Option 1")).toBeInTheDocument();

		rerender(<GlassSelect {...defaultProps} value="option2" />);

		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});

	it("applies custom className", () => {
		const { container } = renderWithProviders(
			<GlassSelect {...defaultProps} className="custom-select" />,
		);

		const selectWrapper = container.firstChild;
		expect(selectWrapper).toHaveClass("custom-select");
	});

	it("forwards ref correctly", () => {
		const ref = vi.fn();
		renderWithProviders(<GlassSelect {...defaultProps} ref={ref} />);

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
	});

	it("shows ring when open", () => {
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");

		expect(button).not.toHaveClass("ring-2");

		fireEvent.click(button);
		expect(button).toHaveClass("ring-2", "ring-blue-500/50");
	});

	it("handles empty options array", () => {
		renderWithProviders(<GlassSelect options={[]} placeholder="No options" />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Dropdown should still open but be empty
		const dropdown = document.querySelector(".animate-in");
		expect(dropdown).toBeInTheDocument();
		expect(dropdown?.children.length).toBe(0);
	});

	it("handles keyboard navigation", async () => {
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
			<GlassSelect {...defaultProps} onChange={onChange} />,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		fireEvent.click(screen.getByText("Option 2"));

		expect(screen.getByText("Option 2")).toBeInTheDocument();

		rerender(<GlassSelect {...defaultProps} onChange={onChange} />);

		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});

	it("meets accessibility standards", async () => {
		const { container } = renderWithProviders(
			<GlassSelect {...defaultProps} />,
		);

		await testA11y(container);
	});

	it("handles hover states", () => {
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		const option = screen.getByText("Option 1").closest("button");

		fireEvent.mouseEnter(option!);
		expect(option).toHaveClass("hover:bg-white/10");
	});

	it("handles focus states", () => {
		renderWithProviders(<GlassSelect {...defaultProps} />);

		const button = screen.getByRole("button");

		fireEvent.focus(button);
		expect(button).toHaveClass("focus:outline-none", "focus:ring-2");
	});

	it("handles variant prop", () => {
		renderWithProviders(<GlassSelect {...defaultProps} variant="search" />);

		// The component accepts the variant prop but doesn't seem to use it
		// This test ensures it doesn't break when provided
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("cleans up event listeners on unmount", () => {
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
