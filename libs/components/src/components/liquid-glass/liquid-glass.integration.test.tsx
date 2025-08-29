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

describe("LiquidGlass Integration", () => {
  it("renders with LiquidGlassDefs", () => {
    const { container } = render(
      <div>
        <LiquidGlass>
          <div>Test Content</div>
        </LiquidGlass>
      </div>,
    );

    expect(container.textContent).toContain("Test Content");
  });
});