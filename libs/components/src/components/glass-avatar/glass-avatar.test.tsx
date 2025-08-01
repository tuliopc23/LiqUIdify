import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "../../test/setup";
import { GlassAvatar } from "./glass-avatar";

describe("GlassAvatar", () => {
  it("renders with image src", () => {
    render(
      <GlassAvatar src="https://example.com/avatar.jpg" alt="Test User" />,
    );

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(img).toHaveAttribute("alt", "Test User");
  });

  it("renders fallback initials when no src provided", () => {
    render(<GlassAvatar fallback="John Doe" />);

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders default icon when no src or fallback", () => {
    render(<GlassAvatar />);

    // Check for User icon (lucide-react renders as svg)
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<GlassAvatar size="xs" fallback="XS" />);
    let avatar = screen.getByText("XS").parentElement;
    expect(avatar).toHaveClass("w-6");
    expect(avatar).toHaveClass("h-6");

    rerender(<GlassAvatar size="sm" fallback="SM" />);
    avatar = screen.getByText("SM").parentElement;
    expect(avatar).toHaveClass("w-8");
    expect(avatar).toHaveClass("h-8");

    rerender(<GlassAvatar size="md" fallback="MD" />);
    avatar = screen.getByText("MD").parentElement;
    expect(avatar).toHaveClass("w-10");
    expect(avatar).toHaveClass("h-10");

    rerender(<GlassAvatar size="lg" fallback="LG" />);
    avatar = screen.getByText("LG").parentElement;
    expect(avatar).toHaveClass("w-12");
    expect(avatar).toHaveClass("h-12");

    rerender(<GlassAvatar size="xl" fallback="XL" />);
    avatar = screen.getByText("XL").parentElement;
    expect(avatar).toHaveClass("w-16");
    expect(avatar).toHaveClass("h-16");

    rerender(<GlassAvatar size="2xl" fallback="XXL" />);
    avatar = screen.getByText("XXL").parentElement;
    expect(avatar).toHaveClass("w-20");
    expect(avatar).toHaveClass("h-20");
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <GlassAvatar variant="circular" fallback="C" />,
    );
    let avatar = screen.getByText("C").parentElement;
    expect(avatar).toHaveClass("rounded-full");

    rerender(<GlassAvatar variant="rounded" fallback="R" />);
    avatar = screen.getByText("R").parentElement;
    expect(avatar).toHaveClass("rounded-lg");

    rerender(<GlassAvatar variant="square" fallback="S" />);
    avatar = screen.getByText("S").parentElement;
    expect(avatar).toHaveClass("rounded-none");
  });

  it("handles image load error by hiding image", () => {
    render(<GlassAvatar src="invalid-url.jpg" fallback="Error Test" />);

    const img = screen.getByRole("img");
    fireEvent.error(img);

    expect(img.style.display).toBe("none");
  });

  it("generates correct initials from fallback name", () => {
    render(<GlassAvatar fallback="Alice Johnson" />);
    expect(screen.getByText("AJ")).toBeInTheDocument();

    render(<GlassAvatar fallback="Bob" />);
    expect(screen.getByText("B")).toBeInTheDocument();

    render(<GlassAvatar fallback="Charlie David Edward" />);
    expect(screen.getByText("CD")).toBeInTheDocument(); // Only first 2 initials
  });

  it("shows status indicator when status prop is provided", () => {
    const { rerender } = render(<GlassAvatar status="online" fallback="O" />);
    let statusIndicator = document.querySelector(".bg-green-500");
    expect(statusIndicator).toBeInTheDocument();

    rerender(<GlassAvatar status="offline" fallback="O" />);
    statusIndicator = document.querySelector(".bg-gray-400");
    expect(statusIndicator).toBeInTheDocument();

    rerender(<GlassAvatar status="away" fallback="A" />);
    statusIndicator = document.querySelector(".bg-yellow-500");
    expect(statusIndicator).toBeInTheDocument();

    rerender(<GlassAvatar status="busy" fallback="B" />);
    statusIndicator = document.querySelector(".bg-red-500");
    expect(statusIndicator).toBeInTheDocument();
  });

  it("applies border when showBorder is true", () => {
    render(<GlassAvatar showBorder fallback="Border" />);

    const avatar = screen.getByText("Border").parentElement;
    expect(avatar).toHaveClass("border");
    expect(avatar).toHaveClass("border-white/20");
  });

  it("applies custom className", () => {
    render(<GlassAvatar className="custom-avatar" fallback="Custom" />);

    const avatar = screen.getByText("Custom").parentElement;
    expect(avatar).toHaveClass("custom-avatar");
  });

  it("forwards ref correctly", () => {
    let avatarRef: HTMLDivElement | null = null;
    render(
      <GlassAvatar
        ref={(ref) => {
          avatarRef = ref;
        }}
        fallback="Ref Test"
      />,
    );

    expect(avatarRef).toBeInstanceOf(HTMLDivElement);
  });

  it("provides appropriate alt text", () => {
    // With custom alt
    render(<GlassAvatar src="test.jpg" alt="Custom Alt" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Custom Alt");

    // With fallback but no alt
    render(<GlassAvatar src="test2.jpg" fallback="John Doe" />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Avatar for John Doe",
    );

    // With neither alt nor fallback
    render(<GlassAvatar src="test3.jpg" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "User avatar");
  });

  it("status indicator scales with avatar size", () => {
    const { rerender } = render(
      <GlassAvatar size="xs" status="online" fallback="XS" />,
    );
    let statusIndicator = document.querySelector(".bg-green-500");
    expect(statusIndicator).toHaveClass("w-1.5");
    expect(statusIndicator).toHaveClass("h-1.5");

    rerender(<GlassAvatar size="2xl" status="online" fallback="XXL" />);
    statusIndicator = document.querySelector(".bg-green-500");
    expect(statusIndicator).toHaveClass("w-4");
    expect(statusIndicator).toHaveClass("h-4");
  });

  it("renders initials with gradient background", () => {
    render(<GlassAvatar fallback="Test User" />);

    const initials = screen.getByText("TU");
    expect(initials).toHaveClass("bg-gradient-to-br");
    expect(initials).toHaveClass("from-blue-500");
    expect(initials).toHaveClass("to-purple-500");
    expect(initials).toHaveClass("text-white");
  });

  it("spreads additional props", () => {
    render(
      <GlassAvatar
        data-testid="custom-avatar"
        id="avatar-1"
        fallback="Props Test"
      />,
    );

    const avatar = screen.getByText("Props Test").parentElement;
    expect(avatar).toHaveAttribute("data-testid", "custom-avatar");
    expect(avatar).toHaveAttribute("id", "avatar-1");
  });

  it("maintains proper structure with all features", () => {
    render(
      <GlassAvatar
        src="test.jpg"
        alt="Full Featured"
        size="lg"
        variant="rounded"
        showBorder
        status="online"
        className="custom"
      />,
    );

    const avatar = document.querySelector(".custom");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("w-12"); // lg size
    expect(avatar).toHaveClass("h-12"); // lg size
    expect(avatar).toHaveClass("rounded-lg"); // rounded variant
    expect(avatar).toHaveClass("border"); // showBorder

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "Full Featured");

    const status = document.querySelector(".bg-green-500");
    expect(status).toBeInTheDocument();
    expect(status).toHaveClass("w-3"); // lg size status
    expect(status).toHaveClass("h-3"); // lg size status
  });
});
