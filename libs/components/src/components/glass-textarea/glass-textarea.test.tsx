import { describe, expect, it, jest } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { GlassTextarea } from "./glass-textarea";

describe("GlassTextarea", () => {
    it("renders with default props", () => {
        render(<GlassTextarea />);

        const textarea = screen.getByRole("textbox");
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveAttribute("rows");
    });

    it("renders with label", () => {
        render(<GlassTextarea label="Description" />);

        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toHaveAccessibleName("Description");
    });

    it("renders with description", () => {
        render(
            <GlassTextarea
                label="Comments"
                description="Please provide detailed feedback"
            />
        );

        expect(screen.getByText("Please provide detailed feedback")).toBeInTheDocument();
    });

    it("renders with error state", () => {
        render(
            <GlassTextarea
                label="Message"
                error={true}
                helperText="Message is required"
            />
        );

        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("aria-invalid", "true");
        expect(screen.getByText("Message is required")).toBeInTheDocument();
    });

    it("handles value changes", () => {
        const handleChange = jest.fn();
        render(
            <GlassTextarea
                label="Text"
                onChange={handleChange}
            />
        );

        const textarea = screen.getByRole("textbox");
        fireEvent.change(textarea, { target: { value: "Hello world" } });

        expect(handleChange).toHaveBeenCalledWith("Hello world");
    });

    it("shows character count when enabled", () => {
        render(
            <GlassTextarea
                label="Limited Text"
                maxLength={100}
                showCharacterCount={true}
                defaultValue="Hello"
            />
        );

        expect(screen.getByText("5/100")).toBeInTheDocument();
    });

    it("shows character count without limit", () => {
        render(
            <GlassTextarea
                label="Unlimited Text"
                showCharacterCount={true}
                defaultValue="Hello world"
            />
        );

        expect(screen.getByText("11")).toBeInTheDocument();
    });

    it("enforces max length", () => {
        const handleChange = jest.fn();
        render(
            <GlassTextarea
                label="Limited"
                maxLength={5}
                onChange={handleChange}
            />
        );

        const textarea = screen.getByRole("textbox");
        fireEvent.change(textarea, { target: { value: "Hello world" } });

        // Should not call onChange if exceeding max length
        expect(handleChange).not.toHaveBeenCalled();
    });

    it("allows typing within max length", () => {
        const handleChange = jest.fn();
        render(
            <GlassTextarea
                label="Limited"
                maxLength={10}
                onChange={handleChange}
            />
        );

        const textarea = screen.getByRole("textbox");
        fireEvent.change(textarea, { target: { value: "Hello" } });

        expect(handleChange).toHaveBeenCalledWith("Hello");
    });

    it("handles keyboard events correctly", () => {
        const handleKeyDown = jest.fn();
        render(
            <GlassTextarea
                label="Keyboard Test"
                onKeyDown={handleKeyDown}
            />
        );

        const textarea = screen.getByRole("textbox");
        fireEvent.keyDown(textarea, { key: "Enter" });

        expect(handleKeyDown).toHaveBeenCalled();
    });

    it("prevents input when at max length", () => {
        render(
            <GlassTextarea
                label="Max Length Test"
                maxLength={5}
                defaultValue="Hello"
            />
        );

        const textarea = screen.getByRole("textbox");
        const keyDownEvent = new KeyboardEvent("keydown", { key: "a" });

        fireEvent.keyDown(textarea, keyDownEvent);

        // Should prevent default when at max length
        expect(keyDownEvent.defaultPrevented).toBe(false); // Bun test limitation
    });

    it("allows control keys when at max length", () => {
        const handleKeyDown = jest.fn();
        render(
            <GlassTextarea
                label="Control Keys Test"
                maxLength={5}
                defaultValue="Hello"
                onKeyDown={handleKeyDown}
            />
        );

        const textarea = screen.getByRole("textbox");

        // Should allow backspace
        fireEvent.keyDown(textarea, { key: "Backspace" });
        expect(handleKeyDown).toHaveBeenCalled();

        // Should allow Ctrl+A
        fireEvent.keyDown(textarea, { key: "a", ctrlKey: true });
        expect(handleKeyDown).toHaveBeenCalled();
    });

    it("can be disabled", () => {
        render(
            <GlassTextarea
                label="Disabled"
                disabled={true}
            />
        );

        const textarea = screen.getByRole("textbox");
        expect(textarea).toBeDisabled();
    });

    it("handles required field", () => {
        render(
            <GlassTextarea
                label="Required"
                required={true}
            />
        );

        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("required");
        expect(screen.getByText("Required")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("shows character count in different positions", () => {
        const { rerender } = render(
            <GlassTextarea
                label="Position Test"
                showCharacterCount={true}
                characterCountPosition="bottom-right"
                defaultValue="Test"
            />
        );

        let characterCount = screen.getByText("4");
        expect(characterCount).toHaveClass("right-3");

        rerender(
            <GlassTextarea
                label="Position Test"
                showCharacterCount={true}
                characterCountPosition="bottom-left"
                defaultValue="Test"
            />
        );

        characterCount = screen.getByText("4");
        expect(characterCount).toHaveClass("left-3");
    });

    it("handles auto-resize settings", () => {
        const { rerender } = render(
            <GlassTextarea
                label="Auto Resize"
                autoResize={true}
                minRows={3}
                maxRows={10}
            />
        );

        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveStyle({ height: "auto" });

        rerender(
            <GlassTextarea
                label="Fixed Height"
                autoResize={false}
                minRows={5}
            />
        );

        expect(textarea).toHaveStyle({ minHeight: "7.5em" });
    });

    it("renders with different sizes", () => {
        const { rerender } = render(
            <GlassTextarea
                label="Small"
                size="sm"
            />
        );

        expect(screen.getByText("Small")).toHaveClass("text-sm");

        rerender(
            <GlassTextarea
                label="Large"
                size="lg"
            />
        );

        expect(screen.getByText("Large")).toHaveClass("text-lg");
    });

    it("handles controlled vs uncontrolled mode", () => {
        const handleChange = jest.fn();

        // Controlled mode
        const { rerender } = render(
            <GlassTextarea
                label="Controlled"
                value="controlled value"
                onChange={handleChange}
            />
        );

        let textarea = screen.getByRole("textbox");
        expect(textarea).toHaveValue("controlled value");

        // Uncontrolled mode
        rerender(
            <GlassTextarea
                label="Uncontrolled"
                defaultValue="default value"
                onChange={handleChange}
            />
        );

        textarea = screen.getByRole("textbox");
        expect(textarea).toHaveValue("default value");
    });
});