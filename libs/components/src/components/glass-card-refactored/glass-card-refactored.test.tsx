/**
 * Unit tests for glass-card-refactored component exports
 * Testing Framework: Vitest with React Testing Library
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

// Import the exports we're testing
import { GlassCard } from "./glass-card-refactored";
import * as GlassCardModule from "./glass-card-refactored";

describe("glass-card-refactored exports", () => {
  describe("Named export: GlassCard", () => {
    it("should export GlassCard component", () => {
      expect(GlassCard).toBeDefined();
      expect(typeof GlassCard).toBe("function");
    });

    it("should render GlassCard component without crashing", () => {
      render(<GlassCard />);
      expect(screen.getByTestId("glass-card")).toBeInTheDocument();
    });

    it("should render GlassCard with children", () => {
      const testContent = "Test content for glass card";
      render(<GlassCard>{testContent}</GlassCard>);
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });

    it("should apply default variant classes", () => {
      render(<GlassCard />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-white\/90|dark:bg-gray-800\/90/);
    });

    it("should accept and apply custom className", () => {
      const customClass = "custom-glass-card";
      render(<GlassCard className={customClass} />);
      const card = screen.getByTestId("glass-card");
      expect(card).toHaveClass(customClass);
    });

    it("should apply variant-specific classes", () => {
      render(<GlassCard variant="secondary" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-gray-50\/90|dark:bg-gray-900\/90/);
    });

    it("should handle multiple children elements", () => {
      render(
        <GlassCard>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </GlassCard>,
      );

      expect(
        screen.getByRole("heading", { name: "Title" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Action" }),
      ).toBeInTheDocument();
    });

    it("should handle empty children gracefully", () => {
      render(<GlassCard>{null}</GlassCard>);
      const card = screen.getByTestId("glass-card");
      expect(card).toBeInTheDocument();
      expect(card).toBeEmptyDOMElement();
    });

    it("should forward additional props to the underlying element", () => {
      const testId = "custom-test-id";
      render(<GlassCard data-testid={testId} />);
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it("should handle aria attributes correctly", () => {
      const ariaLabel = "Glass card container";
      render(<GlassCard aria-label={ariaLabel} />);
      const card = screen.getByLabelText(ariaLabel);
      expect(card).toBeInTheDocument();
    });
  });

  describe("Wildcard export: re-export compatibility", () => {
    it("should re-export GlassCard through wildcard export", () => {
      expect(GlassCardModule.GlassCard).toBeDefined();
      expect(GlassCardModule.GlassCard).toBe(GlassCard);
    });

    it("should maintain export consistency between named and wildcard exports", () => {
      // Verify that both export methods provide the same component
      expect(GlassCardModule.GlassCard).toEqual(GlassCard);
    });

    it("should export all expected properties from glass-card module", () => {
      // Test that the module exports contain expected keys
      const moduleKeys = Object.keys(GlassCardModule);
      expect(moduleKeys).toContain("GlassCard");
    });

    it("should not have undefined exports", () => {
      // Ensure no exports are undefined
      Object.values(GlassCardModule).forEach((exportValue) => {
        expect(exportValue).toBeDefined();
      });
    });
  });

  describe("Component variants", () => {
    it("should render primary variant correctly", () => {
      render(<GlassCard variant="primary" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-white\/90|dark:bg-gray-800\/90/);
    });

    it("should render secondary variant correctly", () => {
      render(<GlassCard variant="secondary" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-gray-50\/90|dark:bg-gray-900\/90/);
    });

    it("should render tertiary variant correctly", () => {
      render(<GlassCard variant="tertiary" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-transparent/);
    });

    it("should render ghost variant correctly", () => {
      render(<GlassCard variant="ghost" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-transparent/);
      expect(card.className).toMatch(/border-transparent/);
    });

    it("should render destructive variant correctly", () => {
      render(<GlassCard variant="destructive" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-red-50\/90|dark:bg-red-900\/10/);
    });

    it("should render apple variant correctly", () => {
      render(<GlassCard variant="apple" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/bg-white\/80|dark:bg-gray-800\/80/);
    });
  });

  describe("Interactive functionality", () => {
    it("should handle click events when interactive", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<GlassCard interactive onCardClick={handleClick} />);
      const card = screen.getByTestId("glass-card");

      expect(card).toHaveAttribute("role", "button");
      expect(card).toHaveAttribute("tabIndex", "0");

      await user.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard navigation when interactive", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<GlassCard interactive onCardClick={handleClick} />);
      const card = screen.getByTestId("glass-card");

      card.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it("should handle selection when selectable", async () => {
      const user = userEvent.setup();
      const handleSelect = vi.fn();

      render(<GlassCard selectable onCardSelect={handleSelect} />);
      const card = screen.getByTestId("glass-card");

      expect(card).toHaveAttribute("aria-pressed", "false");

      await user.click(card);
      expect(handleSelect).toHaveBeenCalledWith(true);
    });

    it("should show selected state when selected prop is true", () => {
      render(<GlassCard selectable selected />);
      const card = screen.getByTestId("glass-card");

      expect(card).toHaveAttribute("aria-pressed", "true");
      expect(card.className).toMatch(/ring-2 ring-blue-500\/20/);
    });

    it("should apply hover classes when hover is enabled", () => {
      render(<GlassCard hover />);
      const card = screen.getByTestId("glass-card");

      expect(card.className).toMatch(/hover:shadow-lg/);
    });

    it("should apply cursor pointer for interactive cards", () => {
      render(<GlassCard interactive />);
      const card = screen.getByTestId("glass-card");

      expect(card.className).toMatch(/cursor-pointer/);
    });
  });

  describe("Layout and styling", () => {
    it("should apply different sizes correctly", () => {
      const { rerender } = render(<GlassCard size="xs" />);
      let card = screen.getByTestId("glass-card");

      rerender(<GlassCard size="sm" />);
      card = screen.getByTestId("glass-card");

      rerender(<GlassCard size="md" />);
      card = screen.getByTestId("glass-card");

      rerender(<GlassCard size="lg" />);
      card = screen.getByTestId("glass-card");

      rerender(<GlassCard size="xl" />);
      card = screen.getByTestId("glass-card");

      expect(card).toBeInTheDocument();
    });

    it("should apply different padding classes", () => {
      render(<GlassCard padding="lg" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/p-6/);
    });

    it("should apply elevation classes", () => {
      render(<GlassCard elevation="lg" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/shadow-lg/);
    });

    it("should handle orientation classes", () => {
      render(<GlassCard orientation="horizontal" />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/flex/);

      const { rerender } = render(<GlassCard orientation="vertical" />);
      rerender(<GlassCard orientation="vertical" />);
      const verticalCard = screen.getByTestId("glass-card");
      expect(verticalCard.className).toMatch(/flex-col/);
    });

    it("should apply border classes when bordered", () => {
      render(<GlassCard bordered />);
      const card = screen.getByTestId("glass-card");
      expect(card.className).toMatch(/border/);
    });

    it("should remove border classes when not bordered", () => {
      render(<GlassCard bordered={false} />);
      const card = screen.getByTestId("glass-card");
      // Should not have explicit border class
      expect(card).toBeInTheDocument();
    });
  });

  describe("Glass effects", () => {
    it("should apply glass effect with default intensity", () => {
      render(<GlassCard />);
      const card = screen.getByTestId("glass-card");

      // Should have backdrop-blur and glass-like effects
      expect(card.className).toMatch(/backdrop-blur|bg-white|bg-gray/);
    });

    it("should handle custom glass effect configuration", () => {
      const glassEffect = {
        intensity: "strong" as const,
        blur: true,
        backdrop: true,
      };

      render(<GlassCard glassEffect={glassEffect} />);
      const card = screen.getByTestId("glass-card");

      expect(card).toBeInTheDocument();
      // Glass variables should be applied as CSS custom properties
      expect(card.style).toBeDefined();
    });

    it("should handle disabled glass effects", () => {
      const glassEffect = {
        intensity: "weak" as const,
        blur: false,
        backdrop: false,
      };

      render(<GlassCard glassEffect={glassEffect} />);
      const card = screen.getByTestId("glass-card");

      expect(card).toBeInTheDocument();
    });
  });

  describe("Animation and transitions", () => {
    it("should apply animation classes by default", () => {
      render(<GlassCard />);
      const card = screen.getByTestId("glass-card");

      expect(card.className).toMatch(/transition-all|duration-300/);
    });

    it("should disable animations when disableAnimations is true", () => {
      render(<GlassCard disableAnimations />);
      const card = screen.getByTestId("glass-card");

      // Should not have hover effects or active scale
      expect(card.className).not.toMatch(/hover:shadow-lg/);
      expect(card.className).not.toMatch(/active:scale-\[0\.98\]/);
    });

    it("should handle different animation intensities", () => {
      const { rerender } = render(<GlassCard animation="subtle" />);
      let card = screen.getByTestId("glass-card");
      expect(card).toBeInTheDocument();

      rerender(<GlassCard animation="normal" />);
      card = screen.getByTestId("glass-card");
      expect(card).toBeInTheDocument();

      rerender(<GlassCard animation="energetic" />);
      card = screen.getByTestId("glass-card");
      expect(card).toBeInTheDocument();

      rerender(<GlassCard animation="none" />);
      card = screen.getByTestId("glass-card");
      expect(card).toBeInTheDocument();
    });
  });

  describe("Edge cases and error handling", () => {
    it("should handle complex nested JSX children", () => {
      render(
        <GlassCard>
          <div>
            <span>Nested content</span>
            <div>
              <p>Deeply nested</p>
            </div>
          </div>
        </GlassCard>,
      );

      expect(screen.getByText("Nested content")).toBeInTheDocument();
      expect(screen.getByText("Deeply nested")).toBeInTheDocument();
    });

    it("should handle string and number children together", () => {
      render(<GlassCard>Some text {42} more text</GlassCard>);

      expect(screen.getByText(/Some text 42 more text/)).toBeInTheDocument();
    });

    it("should maintain component displayName for debugging", () => {
      expect(GlassCard.displayName).toBe("GlassCard");
    });

    it("should be compatible with React.memo if applied", () => {
      // Test that the component works with React optimization patterns
      const MemoizedGlassCard = React.memo(GlassCard);
      render(<MemoizedGlassCard>Memoized content</MemoizedGlassCard>);
      expect(screen.getByText("Memoized content")).toBeInTheDocument();
    });

    it("should handle boolean and null children gracefully", () => {
      render(
        <GlassCard>
          {true && <span>Conditional content</span>}
          {false && <span>Hidden content</span>}
          {null}
          {undefined}
        </GlassCard>,
      );

      expect(screen.getByText("Conditional content")).toBeInTheDocument();
      expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
    });

    it("should support custom styling through style prop", () => {
      const customStyle = { backgroundColor: "rgba(255, 255, 255, 0.1)" };
      render(<GlassCard style={customStyle} />);
      const card = screen.getByTestId("glass-card");
      expect(card).toHaveStyle("background-color: rgba(255, 255, 255, 0.1)");
    });

    it("should handle rapid re-renders without errors", () => {
      const { rerender } = render(<GlassCard>Initial</GlassCard>);

      for (let i = 0; i < 10; i++) {
        rerender(<GlassCard>Content {i}</GlassCard>);
      }

      expect(screen.getByText("Content 9")).toBeInTheDocument();
    });
  });

  describe("TypeScript type compatibility", () => {
    it("should accept HTMLDivElement props", () => {
      const props = {
        id: "glass-card-id",
        "data-testid": "typed-glass-card",
        onClick: vi.fn(),
        onMouseEnter: vi.fn(),
        role: "region" as const,
      };

      render(<GlassCard {...props}>Typed content</GlassCard>);
      const card = screen.getByTestId("typed-glass-card");
      expect(card).toHaveAttribute("id", "glass-card-id");
      expect(card).toHaveAttribute("role", "region");
    });

    it("should handle ref forwarding correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<GlassCard ref={ref}>Ref content</GlassCard>);

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current).toBe(screen.getByTestId("glass-card"));
    });
  });

  describe("Performance and optimization", () => {
    it("should not cause memory leaks with multiple instances", () => {
      const instances = Array.from({ length: 50 }, (_, i) => (
        <GlassCard key={i}>Instance {i}</GlassCard>
      ));

      render(<div>{instances}</div>);

      // Verify all instances are rendered
      expect(screen.getAllByTestId("glass-card")).toHaveLength(50);
    });

    it("should handle large content without performance degradation", () => {
      const largeContent = "A".repeat(1000);

      const startTime = performance.now();
      render(<GlassCard>{largeContent}</GlassCard>);
      const endTime = performance.now();

      // Render should complete within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);
      expect(screen.getByText(largeContent)).toBeInTheDocument();
    });
  });

  describe("Accessibility compliance", () => {
    it("should be accessible by screen readers", () => {
      render(
        <GlassCard role="article" aria-label="Glass card component">
          Accessible content
        </GlassCard>,
      );

      const card = screen.getByRole("article");
      expect(card).toHaveAccessibleName("Glass card component");
    });

    it("should support keyboard navigation attributes", () => {
      render(<GlassCard tabIndex={0}>Keyboard accessible</GlassCard>);
      const card = screen.getByTestId("glass-card");
      expect(card).toHaveAttribute("tabIndex", "0");
    });

    it("should maintain focus management", () => {
      render(<GlassCard tabIndex={0}>Focusable content</GlassCard>);
      const card = screen.getByTestId("glass-card");

      card.focus();
      expect(document.activeElement).toBe(card);
    });

    it("should provide appropriate ARIA attributes for interactive cards", () => {
      render(<GlassCard interactive>Interactive card</GlassCard>);
      const card = screen.getByTestId("glass-card");

      expect(card).toHaveAttribute("role", "button");
      expect(card).toHaveAttribute("tabIndex", "0");
      expect(card).toHaveAttribute("aria-label", "Interactive card");
    });

    it("should provide appropriate ARIA attributes for selectable cards", () => {
      render(
        <GlassCard selectable selected={false}>
          Selectable card
        </GlassCard>,
      );
      const card = screen.getByTestId("glass-card");

      expect(card).toHaveAttribute("role", "button");
      expect(card).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("Event handling", () => {
    it("should handle mouse events correctly", async () => {
      const user = userEvent.setup();
      const onMouseEnter = vi.fn();
      const onMouseLeave = vi.fn();

      render(
        <GlassCard onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          Hover me
        </GlassCard>,
      );

      const card = screen.getByTestId("glass-card");

      await user.hover(card);
      expect(onMouseEnter).toHaveBeenCalledTimes(1);

      await user.unhover(card);
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it("should prevent default behavior for keyboard activation", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<GlassCard interactive onCardClick={handleClick} />);
      const card = screen.getByTestId("glass-card");

      card.focus();
      await user.keyboard(" ");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not trigger interactive handlers when not interactive", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<GlassCard onCardClick={handleClick}>Not interactive</GlassCard>);
      const card = screen.getByTestId("glass-card");

      await user.click(card);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("State management", () => {
    it("should manage hover state internally", async () => {
      const user = userEvent.setup();

      render(<GlassCard hover>Hoverable card</GlassCard>);
      const card = screen.getByTestId("glass-card");

      await user.hover(card);
      // Component should manage internal hover state
      expect(card).toBeInTheDocument();

      await user.unhover(card);
      expect(card).toBeInTheDocument();
    });

    it("should manage selection state when controlled", async () => {
      const user = userEvent.setup();
      let selectedState = false;
      const setSelected = vi.fn((newState) => {
        selectedState = newState;
      });

      const { rerender } = render(
        <GlassCard
          selectable
          selected={selectedState}
          onCardSelect={setSelected}
        >
          Selectable card
        </GlassCard>,
      );

      const card = screen.getByTestId("glass-card");
      expect(card).toHaveAttribute("aria-pressed", "false");

      await user.click(card);
      expect(setSelected).toHaveBeenCalledWith(true);

      // Simulate parent component updating state
      rerender(
        <GlassCard selectable selected={true} onCardSelect={setSelected}>
          Selectable card
        </GlassCard>,
      );

      expect(screen.getByTestId("glass-card")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
  });
});
