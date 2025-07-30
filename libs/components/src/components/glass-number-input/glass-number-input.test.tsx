import { describe, expect, it, jest } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { GlassNumberInput } from "./glass-number-input";

describe("GlassNumberInput", () => {
    it("renders with default props", () => {
        render(<GlassNumberInput />);

        const input = screen.getByRole("spinbutton");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "text");
        expect(input).toHaveAttribute("inputMode", "numeric");
    });

    it("renders with label", () => {
        render(<GlassNumberInput label="Quantity" />);

        expect(screen.getByText("Quantity")).toBeInTheDocument();
        expect(screen.getByRole("spinbutton")).toHaveAccessibleName("Quantity");
    });

    it("renders with description", () => {
        render(
            <GlassNumberInput
                label="Amount"
                description="Enter the amount in dollars"
            />
        );

        expect(screen.getByText("Enter the amount in dollars")).toBeInTheDocument();
    });

    it("renders with error state", () => {
        render(
            <GlassNumberInput
                label="Value"
                error={true}
                helperText="Value is required"
            />
        );

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(screen.getByText("Value is required")).toBeInTheDocument();
    });

    it("handles value changes", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Number"
                onChange={handleChange}
            />
        );

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "42" } });

        expect(handleChange).toHaveBeenCalledWith(42);
    });

    it("handles increment button click", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Counter"
                defaultValue={5}
                onChange={handleChange}
            />
        );

        const incrementButton = screen.getByLabelText("Increase value");
        fireEvent.click(incrementButton);

        expect(handleChange).toHaveBeenCalledWith(6);
    });

    it("handles decrement button click", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Counter"
                defaultValue={5}
                onChange={handleChange}
            />
        );

        const decrementButton = screen.getByLabelText("Decrease value");
        fireEvent.click(decrementButton);

        expect(handleChange).toHaveBeenCalledWith(4);
    });

    it("respects min and max values", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Limited"
                defaultValue={5}
                min={0}
                max={10}
                onChange={handleChange}
            />
        );

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("aria-valuemin", "0");
        expect(input).toHaveAttribute("aria-valuemax", "10");
        expect(input).toHaveAttribute("aria-valuenow", "5");
    });

    it("disables increment when at max value", () => {
        render(
            <GlassNumberInput
                label="Max Test"
                defaultValue={10}
                max={10}
            />
        );

        const incrementButton = screen.getByLabelText("Increase value");
        expect(incrementButton).toBeDisabled();
    });

    it("disables decrement when at min value", () => {
        render(
            <GlassNumberInput
                label="Min Test"
                defaultValue={0}
                min={0}
            />
        );

        const decrementButton = screen.getByLabelText("Decrease value");
        expect(decrementButton).toBeDisabled();
    });

    it("handles keyboard navigation", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Keyboard Test"
                defaultValue={5}
                onChange={handleChange}
            />
        );

        const input = screen.getByRole("spinbutton");

        // Arrow up should increment
        fireEvent.keyDown(input, { key: "ArrowUp" });
        expect(handleChange).toHaveBeenCalledWith(6);

        // Arrow down should decrement
        fireEvent.keyDown(input, { key: "ArrowDown" });
        expect(handleChange).toHaveBeenCalledWith(4);
    });

    it("handles step values", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Step Test"
                defaultValue={0}
                step={5}
                onChange={handleChange}
            />
        );

        const incrementButton = screen.getByLabelText("Increase value");
        fireEvent.click(incrementButton);

        expect(handleChange).toHaveBeenCalledWith(5);
    });

    it("formats values correctly", () => {
        const formatValue = (value: number) => `$${value.toFixed(2)}`;

        render(
            <GlassNumberInput
                label="Price"
                defaultValue={29.99}
                formatValue={formatValue}
            />
        );

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue("$29.99");
    });

    it("handles precision correctly", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Decimal"
                precision={2}
                onChange={handleChange}
            />
        );

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "3.14159" } });

        expect(handleChange).toHaveBeenCalledWith(3.14);
    });

    it("can be disabled", () => {
        render(
            <GlassNumberInput
                label="Disabled"
                disabled={true}
            />
        );

        const input = screen.getByRole("spinbutton");
        const incrementButton = screen.getByLabelText("Increase value");
        const decrementButton = screen.getByLabelText("Decrease value");

        expect(input).toBeDisabled();
        expect(incrementButton).toBeDisabled();
        expect(decrementButton).toBeDisabled();
    });

    it("can hide controls", () => {
        render(
            <GlassNumberInput
                label="No Controls"
                showControls={false}
            />
        );

        expect(screen.queryByLabelText("Increase value")).not.toBeInTheDocument();
        expect(screen.queryByLabelText("Decrease value")).not.toBeInTheDocument();
    });

    it("handles required field", () => {
        render(
            <GlassNumberInput
                label="Required"
                required={true}
            />
        );

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("aria-required", "true");
        expect(screen.getByText("Required")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("allows empty values when allowEmpty is true", () => {
        const handleChange = jest.fn();
        render(
            <GlassNumberInput
                label="Optional"
                allowEmpty={true}
                onChange={handleChange}
            />
        );

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "" } });

        expect(handleChange).toHaveBeenCalledWith(undefined);
    });
});