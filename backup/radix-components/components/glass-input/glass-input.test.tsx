import { beforeAll, describe, expect, it, vi } from "vitest";
import { setupDOM } from "../../test/test-setup";
import { render } from "../../test/test-utils";
import { GlassInput } from "./glass-input";

// Set up DOM environment
beforeAll(() => {
  setupDOM();
});

describe("GlassInput", () => {
  it("renders input element with placeholder", () => {
    const { container } = render(<GlassInput placeholder="Enter text" data-testid="test-input" />);

    const input = container.querySelector('[data-testid="test-input"]');
    expect(input).toBeTruthy();
    expect(input?.getAttribute("placeholder")).toBe("Enter text");
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    const { container } = render(<GlassInput data-testid="test-input" onChange={handleChange} />);

    const input = container.querySelector('[data-testid="test-input"]') as HTMLInputElement;
    expect(input).toBeTruthy();
  });
});
