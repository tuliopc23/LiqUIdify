import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "../../test/setup";
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
    expect(button).toHaveClass("bg-gradient-to-b");
    expect(button).toHaveClass("from-blue-500");

    rerender(<GlassButton variant="destructive">Button</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("from-red-500");

    rerender(<GlassButton variant="ghost">Button</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<GlassButton size="sm">Small</GlassButton>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("relative");
    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("justify-center");

    rerender(<GlassButton size="md">Medium</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("relative");
    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("justify-center");

    rerender(<GlassButton size="lg">Large</GlassButton>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("relative");
    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("justify-center");
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
    expect(button).toHaveClass("cursor-wait");
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

  it("handles magnetic hover effects", () => {
    render(<GlassButton magnetic>Magnetic</GlassButton>);
    const button = screen.getByRole("button");

    fireEvent.mouseEnter(button);
    expect(button).toHaveClass("relative");
  });

  it("renders with left and right icons", () => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const RightIcon = () => <span data-testid="right-icon">→</span>;

    render(
      <GlassButton leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
        Button with Icons
      </GlassButton>,
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    expect(screen.getByText("Button with Icons")).toBeInTheDocument();
  });

  it("renders as child component when asChild is true", () => {
    render(
      <GlassButton asChild>
        <a href="#test">Link Button</a>
      </GlassButton>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#test");
    expect(screen.getByText("Link Button")).toBeInTheDocument();
  });

  it("renders icon-only button correctly", () => {
    const Icon = () => <span data-testid="icon">★</span>;
    render(
      <GlassButton iconOnly>
        <Icon />
        Hidden Text
      </GlassButton>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    const hiddenText = screen.getByText("Hidden Text");
    expect(hiddenText).toHaveClass("sr-only");
  });

  it("shows loading text when provided", () => {
    render(
      <GlassButton loading loadingText="Saving...">
        Save
      </GlassButton>,
    );

    expect(screen.getByText("Saving...")).toBeInTheDocument();
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
  });
});
