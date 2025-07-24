import { Mail, Search } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
// @ts-expect-error TS(2307): Cannot find module '@/test/utils' or its correspon... Remove this comment to see the full error message
import { fireEvent, renderWithProviders, screen, testA11y } from "@/test/utils";
// @ts-expect-error TS(6142): Module './glass-input' was resolved to '/Users/tul... Remove this comment to see the full error message
import { GlassInput } from "./glass-input";

describe("GlassInput", () => {
	it("renders with default props", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput placeholder="Enter text" />);
		const input = screen.getByPlaceholderText("Enter text");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("type", "text");
	});

	it("renders with different variants", () => {
		const { rerender } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput variant="search" placeholder="Search" />,
		);

		expect(screen.getByRole("textbox")).toBeInTheDocument();
		const searchIcon = typeof document === "undefined" ? null : document.querySelector("svg");
		expect(searchIcon).toBeInTheDocument();

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassInput variant="password" placeholder="Password" />);
		expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
			"type",
			"password",
		);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassInput variant="email" placeholder="Email" />);
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
	});

	it("handles controlled input", () => {
		const onChange = vi.fn();
		const { rerender } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput value="initial" onChange={onChange} />,
		);

		const input = screen.getByRole("textbox") as HTMLInputElement;
		expect(input.value).toBe("initial");

		fireEvent.change(input, { target: { value: "updated" } });
		expect(onChange).toHaveBeenCalledTimes(1);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassInput value="updated" onChange={onChange} />);
		expect(input.value).toBe("updated");
	});

	it("handles uncontrolled input", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput defaultValue="default" />);
		const input = screen.getByRole("textbox") as HTMLInputElement;

		expect(input.value).toBe("default");

		fireEvent.change(input, { target: { value: "changed" } });
		expect(input.value).toBe("changed");
	});

	it("shows password toggle for password variant", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput variant="password" placeholder="Password" />,
		);

		const input = screen.getByPlaceholderText("Password");
		const toggleButton = screen.getByLabelText("Show password");

		expect(input).toHaveAttribute("type", "password");

		fireEvent.click(toggleButton);
		expect(input).toHaveAttribute("type", "text");
		expect(screen.getByLabelText("Hide password")).toBeInTheDocument();

		fireEvent.click(screen.getByLabelText("Hide password"));
		expect(input).toHaveAttribute("type", "password");
	});

	it("shows clear button when clearable and has value", () => {
		const onChange = vi.fn();
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput clearable value="test value" onChange={onChange} />,
		);

		const clearButton = screen.getByLabelText("Clear input");
		expect(clearButton).toBeInTheDocument();

		fireEvent.click(clearButton);
		expect(onChange).toHaveBeenCalledWith(
			expect.objectContaining({
				target: expect.objectContaining({ value: "" }),
			}),
		);
	});

	it("does not show clear button when empty", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput clearable value="" />);
		expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument();
	});

	it("focuses input after clearing", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput clearable value="test" onChange={vi.fn()} />,
		);

		const input = screen.getByRole("textbox");
		const clearButton = screen.getByLabelText("Clear input");

		fireEvent.click(clearButton);
		expect(document.activeElement).toBe(input);
	});

	it("renders with left and right icons", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				leftIcon={<Mail data-testid="left-icon" />}
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				rightIcon={<Search data-testid="right-icon" />}
				placeholder="With icons"
			/>,
		);

		expect(screen.getByTestId("left-icon")).toBeInTheDocument();
		expect(screen.getByTestId("right-icon")).toBeInTheDocument();
	});

	it("shows error state", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				error
				helperText="This field is required"
				placeholder="Error input"
			/>,
		);

		const input = screen.getByPlaceholderText("Error input");
		const helperText = screen.getByText("This field is required");

		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(input).toHaveAttribute("aria-describedby");
		expect(helperText).toHaveClass("text-red-500");
	});

	it("shows helper text without error", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput helperText="Enter your email address" placeholder="Email" />,
		);

		const helperText = screen.getByText("Enter your email address");
		expect(helperText).not.toHaveClass("text-red-500");
	});

	it("handles disabled state", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput disabled placeholder="Disabled input" />);

		const input = screen.getByPlaceholderText("Disabled input");
		expect(input).toBeDisabled();
		expect(input).toHaveClass("disabled:opacity-50");
	});

	it("forwards ref correctly", () => {
		const ref = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput ref={ref} />);

		expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
	});

	it("supports different input types", () => {
		const { rerender } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput type="email" placeholder="Email" />,
		);

		let input = screen.getByPlaceholderText("Email");
		expect(input).toHaveAttribute("type", "email");

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassInput type="number" placeholder="Number" />);
		input = screen.getByPlaceholderText("Number");
		expect(input).toHaveAttribute("type", "number");

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		rerender(<GlassInput type="tel" placeholder="Phone" />);
		input = screen.getByPlaceholderText("Phone");
		expect(input).toHaveAttribute("type", "tel");
	});

	it("handles focus and blur events", () => {
		const onFocus = vi.fn();
		const onBlur = vi.fn();

		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput onFocus={onFocus} onBlur={onBlur} placeholder="Focus test" />,
		);

		const input = screen.getByPlaceholderText("Focus test");

		fireEvent.focus(input);
		expect(onFocus).toHaveBeenCalledTimes(1);

		fireEvent.blur(input);
		expect(onBlur).toHaveBeenCalledTimes(1);
	});

	it("applies custom className", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput className="custom-input" placeholder="Custom" />,
		);

		const input = screen.getByPlaceholderText("Custom");
		expect(input).toHaveClass("custom-input");
	});

	it("handles keyboard events", () => {
		const onKeyDown = vi.fn();
		const onKeyUp = vi.fn();
		const onKeyPress = vi.fn();

		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				onKeyPress={onKeyPress}
				placeholder="Keyboard test"
			/>,
		);

		const input = screen.getByPlaceholderText("Keyboard test");

		fireEvent.keyDown(input, { key: "Enter" });
		expect(onKeyDown).toHaveBeenCalledTimes(1);

		fireEvent.keyUp(input, { key: "Enter" });
		expect(onKeyUp).toHaveBeenCalledTimes(1);

		fireEvent.keyPress(input, { key: "a" });
		expect(onKeyPress).toHaveBeenCalledTimes(1);
	});

	it("meets accessibility standards", async () => {
		const { container } = renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput placeholder="Accessible input" aria-label="Test input" />,
		);

		await testA11y(container);
	});

	it("has proper ARIA attributes when error", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput error helperText="Error message" placeholder="Error field" />,
		);

		const input = screen.getByPlaceholderText("Error field");
		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(input).toHaveAttribute("aria-describedby");

		const describedById = input.getAttribute("aria-describedby");
		const helperText = describedById
			? (typeof document === "undefined" ? null : document.getElementById(describedById))
			: null;
		expect(helperText).toHaveTextContent("Error message");
	});

	it("handles complex icon arrangements", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				variant="password"
				clearable
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				rightIcon={<Mail />}
				value="test"
				onChange={vi.fn()}
			/>,
		);

		// Should show password toggle and clear button, but not the right icon for password variant
		expect(screen.getByLabelText("Show password")).toBeInTheDocument();
		expect(screen.getByLabelText("Clear input")).toBeInTheDocument();
	});

	it("maintains focus ring styles", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput placeholder="Focus ring test" />);
		const input = screen.getByPlaceholderText("Focus ring test");

		fireEvent.focus(input);
		// The component uses focusRing utility which should add focus styles
		expect(input.className).toMatch(/focus:/);
	});

	it("handles maxLength attribute", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput maxLength={10} placeholder="Max length" />);

		const input = screen.getByPlaceholderText("Max length");
		expect(input).toHaveAttribute("maxLength", "10");
	});

	it("handles required attribute", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		renderWithProviders(<GlassInput required placeholder="Required field" />);

		const input = screen.getByPlaceholderText("Required field");
		expect(input).toHaveAttribute("required");
	});

	it("handles autoComplete attribute", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput autoComplete="email" placeholder="Email" />,
		);

		const input = screen.getByPlaceholderText("Email");
		expect(input).toHaveAttribute("autoComplete", "email");
	});

	it("handles pattern attribute", () => {
		renderWithProviders(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput pattern="[0-9]*" placeholder="Numbers only" />,
		);

		const input = screen.getByPlaceholderText("Numbers only");
		expect(input).toHaveAttribute("pattern", "[0-9]*");
	});
});
