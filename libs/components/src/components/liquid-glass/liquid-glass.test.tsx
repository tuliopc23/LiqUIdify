import { render } from "../../test/test-utils";
import { vi, beforeAll, describe, it, expect } from "vitest";
import { setupDOM } from "../../test/test-setup";
import { LiquidGlass } from "./liquid-glass";

// Set up DOM environment
beforeAll(() => {
  setupDOM();
});

// TODO: Add proper mocking when vi.mock is working
// For now, test basic rendering without hooks

describe("LiquidGlass", () => {
  it("renders with children", () => {
    const { container } = render(
      <LiquidGlass>
        <div>Test Content</div>
      </LiquidGlass>,
    );

    expect(container.textContent).toContain("Test Content");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <LiquidGlass className="custom-class">
        <div>Content</div>
      </LiquidGlass>,
    );

    const liquidGlassElement = container.querySelector(
      '[data-testid="liquid-glass"]',
    );
    expect(liquidGlassElement).toHaveClass("custom-class");
  });
});
