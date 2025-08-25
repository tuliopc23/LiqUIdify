import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../test/test-utils";
import { GlassButton } from "./glass-button";
import type { GlassButtonProps } from "./glass-button";

describe("GlassButton", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<GlassButton>Test Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Test Button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("renders with custom className", () => {
      render(<GlassButton className="custom-class">Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<GlassButton ref={ref}>Button</GlassButton>);

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });

    it("renders as child component when asChild is true", () => {
      render(
        <GlassButton asChild>
          <a href="/test">Link Button</a>
        </GlassButton>,
      );

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveTextContent("Link Button");
    });
  });

  describe("Variants", () => {
    it.each([
      ["primary", "liquid-glass-button-primary"],
      ["secondary", "liquid-glass-button-secondary"],
      ["ghost", "liquid-glass-button-ghost"],
      ["destructive", "liquid-glass-button"],
    ] as const)(
      "applies correct variant classes for %s variant",
      (variant, expectedClass) => {
        render(<GlassButton variant={variant}>Button</GlassButton>);

        const button = screen.getByRole("button");
        expect(button).toHaveClass(expectedClass);
      },
    );

    it("applies primary variant text styles", () => {
      render(<GlassButton variant="primary">Primary Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-liquid-primary", "font-semibold");
    });

    it("applies destructive variant background styles", () => {
      render(<GlassButton variant="destructive">Delete</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "bg-gradient-to-b",
        "from-red-500",
        "to-red-600",
      );
      expect(button).toHaveClass("text-liquid-text-inverse", "font-semibold");
    });
  });

  describe("Sizes", () => {
    it.each([
      ["sm", "liquid-glass-sm", "text-sm", "px-4", "py-2"],
      ["md", "liquid-glass-md", "text-base", "px-6", "py-3"],
      ["lg", "liquid-glass-lg", "text-lg", "px-8", "py-4"],
      ["xl", "liquid-glass-xl", "text-xl", "px-10", "py-5"],
    ] as const)(
      "applies correct size classes for %s size",
      (size, ...expectedClasses) => {
        render(<GlassButton size={size}>Button</GlassButton>);

        const button = screen.getByRole("button");
        expectedClasses.forEach((className) => {
          expect(button).toHaveClass(className);
        });
      },
    );
  });

  describe("Icons", () => {
    it("renders left icon correctly", () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;

      render(
        <GlassButton leftIcon={<LeftIcon />}>
          Button with Left Icon
        </GlassButton>,
      );

      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByText("Button with Left Icon")).toBeInTheDocument();
    });

    it("renders right icon correctly", () => {
      const RightIcon = () => <span data-testid="right-icon">→</span>;

      render(
        <GlassButton rightIcon={<RightIcon />}>
          Button with Right Icon
        </GlassButton>,
      );

      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
      expect(screen.getByText("Button with Right Icon")).toBeInTheDocument();
    });

    it("renders both left and right icons", () => {
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

    it("applies correct icon sizes for different button sizes", () => {
      const Icon = () => <span data-testid="icon">icon</span>;

      render(
        <GlassButton size="sm" leftIcon={<Icon />}>
          Small
        </GlassButton>,
      );
      const smallButton = screen.getByRole("button");
      const smallIconContainer = smallButton.querySelector("span:first-child");
      expect(smallIconContainer).toHaveClass("w-4", "h-4");
    });

    it("renders icon-only button correctly", () => {
      const Icon = () => <span data-testid="icon">★</span>;

      render(
        <GlassButton iconOnly>
          <Icon />
          <span>Hidden Text</span>
        </GlassButton>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("aspect-square", "p-0");
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner when loading is true", () => {
      render(<GlassButton loading>Loading Button</GlassButton>);

      const button = screen.getByRole("button");
      const spinner = button.querySelector("svg");

      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("animate-spin");
      expect(button).toBeDisabled();
    });

    it("shows custom loading text when provided", () => {
      render(
        <GlassButton loading loadingText="Saving...">
          Save Button
        </GlassButton>,
      );

      expect(screen.getByText("Saving...")).toBeInTheDocument();
      expect(screen.queryByText("Save Button")).not.toBeInTheDocument();
    });

    it("does not show icons when loading", () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      const RightIcon = () => <span data-testid="right-icon">→</span>;

      render(
        <GlassButton loading leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Loading
        </GlassButton>,
      );

      expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    });

    it("applies loading opacity to text", () => {
      render(<GlassButton loading>Loading Button</GlassButton>);

      const textSpan = screen.getByText("Loading Button");
      expect(textSpan).toHaveClass("opacity-75");
    });
  });

  describe("Disabled State", () => {
    it("disables button when disabled prop is true", () => {
      render(<GlassButton disabled>Disabled Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
        "pointer-events-none",
      );
    });

    it("is disabled when loading", () => {
      render(<GlassButton loading>Loading Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Layout Options", () => {
    it("renders full width button correctly", () => {
      render(<GlassButton fullWidth>Full Width Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full");
    });
  });

  describe("Glass Effect Styles", () => {
    it("applies liquid glass base classes", () => {
      render(<GlassButton>Glass Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "liquid-glass",
        "liquid-glass-interactive",
        "liquid-glass-button",
      );
    });

    it("applies proper layout classes", () => {
      render(<GlassButton>Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
      );
    });

    it("applies font and interaction classes", () => {
      render(<GlassButton>Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "font-system",
        "select-none",
        "outline-none",
        "border-none",
      );
    });
  });

  describe("Event Handling", () => {
    it("handles click events", async () => {
      const handleClick = vi.fn();
      render(<GlassButton onClick={handleClick}>Click Me</GlassButton>);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not fire click event when disabled", async () => {
      const handleClick = vi.fn();
      render(
        <GlassButton disabled onClick={handleClick}>
          Disabled Button
        </GlassButton>,
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("does not fire click event when loading", async () => {
      const handleClick = vi.fn();
      render(
        <GlassButton loading onClick={handleClick}>
          Loading Button
        </GlassButton>,
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles keyboard events", async () => {
      const handleKeyDown = vi.fn();
      render(
        <GlassButton onKeyDown={handleKeyDown}>Keyboard Button</GlassButton>,
      );

      const button = screen.getByRole("button");
      fireEvent.keyDown(button, { key: "Enter" });

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has button role by default", () => {
      render(<GlassButton>Accessible Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("supports custom ARIA attributes", () => {
      render(
        <GlassButton aria-label="Custom Label" aria-describedby="description">
          Button
        </GlassButton>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom Label");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });

    it("is focusable when not disabled", () => {
      render(<GlassButton>Focusable Button</GlassButton>);

      const button = screen.getByRole("button");
      button.focus();

      expect(document.activeElement).toBe(button);
    });

    it("is not focusable when disabled", () => {
      render(<GlassButton disabled>Disabled Button</GlassButton>);

      const button = screen.getByRole("button");
      button.focus();

      expect(document.activeElement).not.toBe(button);
    });

    it("announces loading state to screen readers", () => {
      render(
        <GlassButton loading aria-live="polite">
          Loading Button
        </GlassButton>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-live", "polite");
    });
  });

  describe("Type Prop", () => {
    it('has type="button" by default', () => {
      render(<GlassButton>Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("can override button type", () => {
      render(<GlassButton type="submit">Submit Button</GlassButton>);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Complex Scenarios", () => {
    it("combines multiple props correctly", () => {
      const Icon = () => <span data-testid="icon">★</span>;
      const handleClick = vi.fn();

      render(
        <GlassButton
          variant="secondary"
          size="lg"
          fullWidth
          leftIcon={<Icon />}
          onClick={handleClick}
          className="custom-class"
          data-testid="complex-button"
        >
          Complex Button
        </GlassButton>,
      );

      const button = screen.getByTestId("complex-button");

      // Check variant classes
      expect(button).toHaveClass("liquid-glass-button-secondary");

      // Check size classes
      expect(button).toHaveClass("liquid-glass-lg", "text-lg", "px-8", "py-4");

      // Check layout classes
      expect(button).toHaveClass("w-full");

      // Check custom class
      expect(button).toHaveClass("custom-class");

      // Check icon presence
      expect(screen.getByTestId("icon")).toBeInTheDocument();

      // Check interactivity
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });

    it("transitions between states correctly", async () => {
      const Component = ({ loading }: { loading: boolean }) => (
        <GlassButton loading={loading} loadingText="Saving...">
          Save Changes
        </GlassButton>
      );

      const { rerender } = render(<Component loading={false} />);

      // Initial state
      expect(screen.getByText("Save Changes")).toBeInTheDocument();
      expect(screen.getByRole("button")).not.toBeDisabled();

      // Loading state
      rerender(<Component loading={true} />);

      await waitFor(() => {
        expect(screen.getByText("Saving...")).toBeInTheDocument();
        expect(screen.queryByText("Save Changes")).not.toBeInTheDocument();
        expect(screen.getByRole("button")).toBeDisabled();
      });

      // Back to normal state
      rerender(<Component loading={false} />);

      await waitFor(() => {
        expect(screen.getByText("Save Changes")).toBeInTheDocument();
        expect(screen.queryByText("Saving...")).not.toBeInTheDocument();
        expect(screen.getByRole("button")).not.toBeDisabled();
      });
    });
  });
});
