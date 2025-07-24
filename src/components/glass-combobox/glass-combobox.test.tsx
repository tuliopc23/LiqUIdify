import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
// @ts-expect-error TS(6142): Module './glass-combobox' was resolved to '/Users/... Remove this comment to see the full error message
import { GlassCombobox } from "./glass-combobox";

describe("GlassCombobox", () => {
	const mockOptions = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	];

	it("renders correctly", () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		expect(screen.getByRole("combobox")).toBeInTheDocument();
		expect(screen.getByText("Select an option")).toBeInTheDocument();
	});

	it("shows options when clicked", async () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		const combobox = screen.getByRole("combobox");
		fireEvent.click(combobox);

		await waitFor(() => {
			expect(screen.getByText("Option 1")).toBeInTheDocument();
			expect(screen.getByText("Option 2")).toBeInTheDocument();
			expect(screen.getByText("Option 3")).toBeInTheDocument();
		});
	});

	it("filters options based on search input", async () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		const combobox = screen.getByRole("combobox");
		fireEvent.click(combobox);

		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "Option 1" } });

		await waitFor(() => {
			expect(screen.getByText("Option 1")).toBeInTheDocument();
			expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
			expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
		});
	});

	it("calls onValueChange when option is selected", async () => {
		const mockOnChange = vi.fn();

		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={mockOnChange}
			/>,
		);

		const combobox = screen.getByRole("combobox");
		fireEvent.click(combobox);

		await waitFor(() => {
			const option = screen.getByText("Option 1");
			fireEvent.click(option);
		});

		expect(mockOnChange).toHaveBeenCalledWith("option1");
	});

	it("displays selected value correctly", () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
				value="option1"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		expect(screen.getByText("Option 1")).toBeInTheDocument();
	});

	it("is disabled when disabled prop is true", () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				disabled
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		const combobox = screen.getByRole("combobox");
		expect(combobox).toBeDisabled();
	});

	it("shows clear button when clearable and has value", () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
				value="option1"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				clearable
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		const clearButton = screen.getByLabelText(/clear/i);
		expect(clearButton).toBeInTheDocument();
	});

	it("clears value when clear button is clicked", async () => {
		const mockOnChange = vi.fn();

		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
				value="option1"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				clearable
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={mockOnChange}
			/>,
		);

		const clearButton = screen.getByLabelText(/clear/i);
		fireEvent.click(clearButton);

		expect(mockOnChange).toHaveBeenCalledWith("");
	});

	it("supports keyboard navigation", async () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		const combobox = screen.getByRole("combobox");
		fireEvent.keyDown(combobox, { key: "ArrowDown" });

		await waitFor(() => {
			expect(screen.getByText("Option 1")).toBeInTheDocument();
		});
	});

	it("shows empty state when no options match search", async () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
				emptyMessage="No options found"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		const combobox = screen.getByRole("combobox");
		fireEvent.click(combobox);

		const searchInput = screen.getByRole("textbox");
		fireEvent.change(searchInput, { target: { value: "nonexistent" } });

		await waitFor(() => {
			expect(screen.getByText("No options found")).toBeInTheDocument();
		});
	});

	it("applies correct CSS classes for different sizes", () => {
		const { rerender } = render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
				size="sm"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		let combobox = screen.getByRole("combobox");
		expect(combobox).toHaveClass("text-sm");

		rerender(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
				size="lg"
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		combobox = screen.getByRole("combobox");
		expect(combobox).toHaveClass("text-lg");
	});

	it("shows loading state correctly", () => {
		render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCombobox
// @ts-expect-error TS(2322): Type '{ value: string; label: string; }[]' is not ... Remove this comment to see the full error message
				options={mockOptions}
				placeholder="Select an option"
// @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
				loading
// @ts-expect-error TS(2322): Type 'Mock<Procedure>' is not assignable to type '... Remove this comment to see the full error message
				onChange={vi.fn()}
			/>,
		);

		const combobox = screen.getByRole("combobox");
		fireEvent.click(combobox);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});
});
