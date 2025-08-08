import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../test/test-utils";
import { GlassInput } from "./glass-input";

describe("GlassInput", () => {
  it("renders input element with placeholder", () => {
    render(<GlassInput placeholder="Enter text" data-testid="test-input" />);

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    render(
      <GlassInput
        value="test value"
        onChange={handleChange}
        data-testid="controlled-input"
      />,
    );

    const input = screen.getByTestId("controlled-input");
    expect(input).toHaveValue("test value");

    fireEvent.change(input, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error state and message", () => {
    render(
      <GlassInput error="This field is required" data-testid="error-input" />,
    );

    const input = screen.getByTestId("error-input");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies disabled state", () => {
    render(<GlassInput disabled data-testid="disabled-input" />);

    const input = screen.getByTestId("disabled-input");
    expect(input).toBeDisabled();
  });

  it("renders with label when provided", () => {
    render(<GlassInput label="Input Label" data-testid="labeled-input" />);

    expect(screen.getByText("Input Label")).toBeInTheDocument();
    const input = screen.getByTestId("labeled-input");
    expect(input).toBeInTheDocument();
  });

  it("supports different input types", () => {
    render(<GlassInput type="email" data-testid="email-input" />);

    const input = screen.getByTestId("email-input");
    expect(input).toHaveAttribute("type", "email");
  });
});
