import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "../../test/setup";
import GlassAlert from "./glass-alert";

describe("GlassAlert", () => {
  it("renders with children", () => {
    render(<GlassAlert>Alert message</GlassAlert>);
    expect(screen.getByText("Alert message")).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<GlassAlert title="Alert Title">Alert content</GlassAlert>);

    expect(screen.getByText("Alert Title")).toBeInTheDocument();
    expect(screen.getByText("Alert content")).toBeInTheDocument();
  });

  it("applies correct variant styles", () => {
    const { rerender } = render(
      <GlassAlert variant="info">Info alert</GlassAlert>,
    );
    let alert = screen.getByRole("alert");
    expect(alert).toHaveClass("border-blue-200");
    expect(alert).toHaveClass("bg-blue-50/10");
    expect(alert).toHaveClass("text-blue-700");

    rerender(<GlassAlert variant="success">Success alert</GlassAlert>);
    alert = screen.getByRole("alert");
    expect(alert).toHaveClass("border-green-200");
    expect(alert).toHaveClass("bg-green-50/10");
    expect(alert).toHaveClass("text-green-700");

    rerender(<GlassAlert variant="warning">Warning alert</GlassAlert>);
    alert = screen.getByRole("alert");
    expect(alert).toHaveClass("border-yellow-200");
    expect(alert).toHaveClass("bg-yellow-50/10");
    expect(alert).toHaveClass("text-yellow-700");

    rerender(<GlassAlert variant="error">Error alert</GlassAlert>);
    alert = screen.getByRole("alert");
    expect(alert).toHaveClass("border-red-200");
    expect(alert).toHaveClass("bg-red-50/10");
    expect(alert).toHaveClass("text-red-700");
  });

  it("has proper ARIA attributes", () => {
    render(<GlassAlert>Accessible alert</GlassAlert>);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveAttribute("role", "alert");
  });

  it("applies custom className", () => {
    render(
      <GlassAlert className="custom-alert-class">
        Custom styled alert
      </GlassAlert>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("custom-alert-class");
    // Also has default classes
    expect(alert).toHaveClass("glass-effect");
    expect(alert).toHaveClass("rounded-lg");
  });

  it("forwards ref correctly", () => {
    let alertRef: HTMLDivElement | null = null;
    render(
      <GlassAlert
        ref={(ref) => {
          alertRef = ref;
        }}
      >
        Alert with ref
      </GlassAlert>,
    );

    expect(alertRef).toBeInstanceOf(HTMLDivElement);
  });

  it("renders complex children", () => {
    render(
      <GlassAlert>
        <span>Complex</span>
        <button>Action</button>
      </GlassAlert>,
    );

    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("spreads additional props", () => {
    render(
      <GlassAlert data-testid="custom-alert" id="alert-1">
        Alert with props
      </GlassAlert>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("data-testid", "custom-alert");
    expect(alert).toHaveAttribute("id", "alert-1");
  });

  it("has glass effect styling", () => {
    render(<GlassAlert>Glass effect alert</GlassAlert>);
    const alert = screen.getByRole("alert");

    expect(alert).toHaveClass("glass-effect");
    expect(alert).toHaveClass("backdrop-blur-md");
    expect(alert).toHaveClass("backdrop-saturate-150");
  });

  it("handles long content gracefully", () => {
    const longContent = "This is a very long alert message ".repeat(10);
    render(<GlassAlert title="Long Alert">{longContent}</GlassAlert>);

    expect(screen.getByText(longContent)).toBeInTheDocument();
    const contentDiv = screen.getByText(longContent);
    expect(contentDiv).toHaveClass("text-sm");
  });

  it("renders without title", () => {
    render(<GlassAlert>No title alert</GlassAlert>);

    const alert = screen.getByRole("alert");
    const headings = alert.querySelectorAll("h4");
    expect(headings.length).toBe(0);
  });

  it("maintains semantic structure", () => {
    render(<GlassAlert title="Semantic Alert">Alert body content</GlassAlert>);

    const alert = screen.getByRole("alert");
    const title = screen.getByText("Semantic Alert");
    const content = screen.getByText("Alert body content");

    // Title should be in an h4
    expect(title.tagName).toBe("H4");
    expect(title).toHaveClass("mb-1");
    expect(title).toHaveClass("font-semibold");

    // Content should be in a div
    expect(content.tagName).toBe("DIV");
    expect(content).toHaveClass("text-sm");
  });

  it("defaults to info variant", () => {
    render(<GlassAlert>Default variant</GlassAlert>);
    const alert = screen.getByRole("alert");

    // Should have info variant styles
    expect(alert).toHaveClass("border-blue-200");
    expect(alert).toHaveClass("bg-blue-50/10");
    expect(alert).toHaveClass("text-blue-700");
  });

  it("handles onClick events", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<GlassAlert onClick={handleClick}>Clickable alert</GlassAlert>);

    const alert = screen.getByRole("alert");
    fireEvent.click(alert);

    expect(clicked).toBe(true);
  });
});
