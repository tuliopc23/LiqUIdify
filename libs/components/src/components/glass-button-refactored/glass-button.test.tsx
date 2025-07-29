import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { GlassButton } from "./glass-button";

describe("GlassButton", () => {
  it("renders with children", () => {
    render(<GlassButton>Click me</GlassButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <GlassButton variant="primary">Button</GlassButton>,
    );
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-500/20");

    rerender(<GlassButton variant="danger">Button</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500/20");

    rerender(<GlassButton variant="ghost">Button</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("border-transparent");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<GlassButton size="sm">Small</GlassButton>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("h-8");

    rerender(<GlassButton size="md">Medium</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("h-10");

    rerender(<GlassButton size="lg">Large</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("h-12");
  });

  it("handles click events", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<GlassButton onClick={handleClick}>Click me</GlassButton>);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(clicked).toBe(true);
  });

  it("disables button when disabled prop is true", () => {
    render(<GlassButton disabled>Disabled</GlassButton>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
  });

  it("renders as full width when fullWidth is true", () => {
    render(<GlassButton fullWidth>Full Width</GlassButton>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("w-full");
  });

  it("renders loading state correctly", () => {
    render(<GlassButton loading>Loading</GlassButton>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("pointer-events-none");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<GlassButton className="custom-class">Custom</GlassButton>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    let buttonRef: HTMLButtonElement | null = null;
    render(
      <GlassButton
        ref={(ref) => {
          buttonRef = ref;
        }}
      >
        Ref Button
      </GlassButton>,
    );

    expect(buttonRef).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders with icon", () => {
    const Icon = () => <span data-testid="icon">Icon</span>;
    render(
      <GlassButton>
        <Icon />
        With Icon
      </GlassButton>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });
});
