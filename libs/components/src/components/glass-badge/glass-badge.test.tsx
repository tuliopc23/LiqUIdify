import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "../../test/setup";
import { GlassBadge } from "./glass-badge";

describe("GlassBadge", () => {
  it("renders with children", () => {
    render(<GlassBadge>Badge Text</GlassBadge>);
    expect(screen.getByText("Badge Text")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <GlassBadge variant="default">Default</GlassBadge>,
    );
    let badge = screen.getByText("Default");
    expect(badge).toHaveClass("glass-effect");
    expect(badge).toHaveClass("text-primary");

    rerender(<GlassBadge variant="success">Success</GlassBadge>);
    badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");

    rerender(<GlassBadge variant="warning">Warning</GlassBadge>);
    badge = screen.getByText("Warning");
    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-800");

    rerender(<GlassBadge variant="error">Error</GlassBadge>);
    badge = screen.getByText("Error");
    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-800");
  });

  it("applies base styling classes", () => {
    render(<GlassBadge>Styled Badge</GlassBadge>);
    const badge = screen.getByText("Styled Badge");

    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("px-3");
    expect(badge).toHaveClass("py-1");
    expect(badge).toHaveClass("font-medium");
    expect(badge).toHaveClass("text-xs");
  });

  it("applies custom className", () => {
    render(
      <GlassBadge className="custom-badge-class">Custom Badge</GlassBadge>,
    );

    const badge = screen.getByText("Custom Badge");
    expect(badge).toHaveClass("custom-badge-class");
    // Also has default classes
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("px-3");
  });

  it("forwards ref correctly", () => {
    let badgeRef: HTMLSpanElement | null = null;
    render(
      <GlassBadge
        ref={(ref) => {
          badgeRef = ref;
        }}
      >
        Badge with Ref
      </GlassBadge>,
    );

    expect(badgeRef).toBeInstanceOf(HTMLSpanElement);
  });

  it("renders as span element", () => {
    render(<GlassBadge>Span Badge</GlassBadge>);
    const badge = screen.getByText("Span Badge");

    expect(badge.tagName).toBe("SPAN");
  });

  it("spreads additional props", () => {
    render(
      <GlassBadge data-testid="custom-badge" id="badge-1" title="Badge tooltip">
        Props Badge
      </GlassBadge>,
    );

    const badge = screen.getByText("Props Badge");
    expect(badge).toHaveAttribute("data-testid", "custom-badge");
    expect(badge).toHaveAttribute("id", "badge-1");
    expect(badge).toHaveAttribute("title", "Badge tooltip");
  });

  it("handles onClick events", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<GlassBadge onClick={handleClick}>Clickable Badge</GlassBadge>);

    const badge = screen.getByText("Clickable Badge");
    fireEvent.click(badge);

    expect(clicked).toBe(true);
  });

  it("defaults to default variant", () => {
    render(<GlassBadge>Default Variant</GlassBadge>);
    const badge = screen.getByText("Default Variant");

    expect(badge).toHaveClass("glass-effect");
    expect(badge).toHaveClass("text-primary");
  });

  it("renders with complex children", () => {
    render(
      <GlassBadge>
        <span>Complex</span>
        <span> Content</span>
      </GlassBadge>,
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText(" Content")).toBeInTheDocument();
  });

  it("can be styled for different use cases", () => {
    render(
      <GlassBadge className="inline-flex items-center gap-1">
        <span>●</span>
        Status
      </GlassBadge>,
    );

    const badge = screen.getByText("Status").parentElement;
    expect(badge).toHaveClass("inline-flex");
    expect(badge).toHaveClass("items-center");
    expect(badge).toHaveClass("gap-1");
  });

  it("maintains proper contrast with variants", () => {
    const { rerender } = render(
      <GlassBadge variant="success">Success Contrast</GlassBadge>,
    );
    let badge = screen.getByText("Success Contrast");
    // Success variant has light background with dark text
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");

    rerender(<GlassBadge variant="error">Error Contrast</GlassBadge>);
    badge = screen.getByText("Error Contrast");
    // Error variant has light background with dark text
    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-800");
  });

  it("handles long text content", () => {
    const longText = "This is a very long badge text that might wrap";
    render(<GlassBadge>{longText}</GlassBadge>);

    const badge = screen.getByText(longText);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("text-xs");
  });

  it("can be used inline with text", () => {
    render(
      <p>
        Status: <GlassBadge variant="success">Active</GlassBadge>
      </p>,
    );

    const badge = screen.getByText("Active");
    expect(badge).toBeInTheDocument();
    expect(badge.parentElement?.tagName).toBe("P");
  });
});
