import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "../../test/setup";
import { GlassInput } from "./glass-input";

describe("GlassInput", () => {
  it("renders basic input", () => {
    render(<GlassInput placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("handles value changes", () => {
    let value = "";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    };

    render(<GlassInput placeholder="Type here" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Type here");
    fireEvent.change(input, { target: { value: "Hello World" } });

    expect(value).toBe("Hello World");
    expect(input).toHaveAttribute("value", "Hello World");
  });

  it("renders as controlled component", () => {
    const { rerender } = render(
      <GlassInput value="initial" onChange={() => {}} />,
    );

    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("value", "initial");

    rerender(<GlassInput value="updated" onChange={() => {}} />);
    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("value", "updated");
  });

  it("renders as uncontrolled component", () => {
    render(<GlassInput defaultValue="default text" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("value", "default text");

    fireEvent.change(input, { target: { value: "new text" } });
    expect(input).toHaveAttribute("value", "new text");
  });

  it("renders search variant", () => {
    render(<GlassInput variant="search" placeholder="Search..." />);

    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();

    // Search icon should be present
    const searchIcon = document.querySelector("svg");
    expect(searchIcon).toBeInTheDocument();
  });

  it("renders password variant with toggle", () => {
    render(<GlassInput variant="password" placeholder="Password" />);

    const input = screen.getByPlaceholderText("Password");
    expect(input).toHaveAttribute("type", "password");

    // Toggle button should be present
    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();

    // Click to hide password
    fireEvent.click(screen.getByLabelText("Hide password"));
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders with clearable functionality", () => {
    let value = "test";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    };

    render(<GlassInput clearable value={value} onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("value", "test");

    // Clear button should be visible when there's value
    const clearButton = screen.getByLabelText("Clear input");
    expect(clearButton).toBeInTheDocument();

    // Click clear button
    fireEvent.click(clearButton);
    expect(value).toBe("");
  });

  it("does not show clear button when empty", () => {
    render(<GlassInput clearable value="" onChange={() => {}} />);

    const clearButton = screen.queryByLabelText("Clear input");
    expect(clearButton).not.toBeInTheDocument();
  });

  it("renders with left icon", () => {
    const LeftIcon = () => <span data-testid="left-icon">👤</span>;
    render(<GlassInput leftIcon={<LeftIcon />} />);

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-10"); // Extra padding for icon
  });

  it("renders with right icon", () => {
    const RightIcon = () => <span data-testid="right-icon">✓</span>;
    render(<GlassInput rightIcon={<RightIcon />} />);

    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pr-10"); // Extra padding for icon
  });

  it("handles error state", () => {
    render(
      <GlassInput
        error
        helperText="This field is required"
        placeholder="Required field"
      />,
    );

    const input = screen.getByPlaceholderText("Required field");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby");

    const helperText = screen.getByText("This field is required");
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveClass("text-red-500");

    // Check error styling
    expect(input).toHaveClass("border-red-400/50");
  });

  it("renders helper text without error", () => {
    render(
      <GlassInput helperText="Enter your email address" placeholder="Email" />,
    );

    const helperText = screen.getByText("Enter your email address");
    expect(helperText).toBeInTheDocument();
    expect(helperText).not.toHaveClass("text-red-500");

    const input = screen.getByPlaceholderText("Email");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("handles disabled state", () => {
    render(<GlassInput disabled placeholder="Disabled input" />);

    const input = screen.getByPlaceholderText("Disabled input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:cursor-not-allowed");
    expect(input).toHaveClass("disabled:opacity-50");
  });

  it("forwards ref correctly", () => {
    let inputRef: HTMLInputElement | null = null;
    render(
      <GlassInput
        ref={(ref) => {
          inputRef = ref;
        }}
        placeholder="Ref test"
      />,
    );

    expect(inputRef).toBeInstanceOf(HTMLInputElement);
    expect(inputRef?.placeholder).toBe("Ref test");
  });

  it("applies custom className", () => {
    render(<GlassInput className="custom-input-class" placeholder="Custom" />);

    const input = screen.getByPlaceholderText("Custom");
    expect(input).toHaveClass("custom-input-class");
    // Also has default classes
    expect(input).toHaveClass("w-full");
    expect(input).toHaveClass("rounded-xl");
  });

  it("spreads additional props", () => {
    render(
      <GlassInput
        data-testid="custom-input"
        id="input-1"
        name="customInput"
        autoComplete="off"
        placeholder="Props test"
      />,
    );

    const input = screen.getByPlaceholderText("Props test");
    expect(input).toHaveAttribute("data-testid", "custom-input");
    expect(input).toHaveAttribute("id", "input-1");
    expect(input).toHaveAttribute("name", "customInput");
    expect(input).toHaveAttribute("autocomplete", "off");
  });

  it("maintains focus after clearing", () => {
    render(<GlassInput clearable value="test" onChange={() => {}} />);

    const input = screen.getByRole("textbox");
    input.focus();
    expect(document.activeElement).toBe(input);

    const clearButton = screen.getByLabelText("Clear input");
    fireEvent.click(clearButton);

    // Input should maintain focus after clearing
    expect(document.activeElement).toBe(input);
  });

  it("handles different input types", () => {
    const { rerender } = render(<GlassInput type="email" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");

    rerender(<GlassInput type="tel" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "tel");

    rerender(<GlassInput type="number" />);
    input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("type", "number");
  });

  it("applies glass effect styling", () => {
    render(<GlassInput placeholder="Glass effect" />);

    const input = screen.getByPlaceholderText("Glass effect");
    expect(input).toHaveClass("transition-all");
    expect(input).toHaveClass("duration-200");
    expect(input).toHaveClass("border");
  });

  it("handles complex icon padding scenarios", () => {
    // Password with clearable and value
    const { rerender } = render(
      <GlassInput
        variant="password"
        clearable
        value="test"
        onChange={() => {}}
      />,
    );
    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("pr-20"); // Space for two icons

    // Search with left icon (should use search icon)
    rerender(<GlassInput variant="search" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-10"); // Space for search icon

    // Regular with both icons
    rerender(
      <GlassInput leftIcon={<span>L</span>} rightIcon={<span>R</span>} />,
    );
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-10");
    expect(input).toHaveClass("pr-10");
  });

  it("password toggle has proper aria attributes", () => {
    render(<GlassInput variant="password" />);

    const toggleButton = screen.getByLabelText("Show password");
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggleButton);
    expect(screen.getByLabelText("Hide password")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
