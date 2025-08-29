import { describe, it, expect, beforeAll } from "vitest";
import { render } from "@testing-library/react";
import { setupDOM } from "./test-setup";

// Set up DOM environment
beforeAll(() => {
  setupDOM();
});

// Minimal example test used by .junie/guidelines.md
// This does not import library code to keep it hermetic and fast
function Hello({ name }: { name: string }) {
  return <div role="status">Hello, {name}!</div>;
}

describe("doc example", () => {
  it("renders greeting", () => {
    const { getByRole } = render(<Hello name="LiqUIdify" />);
    expect(getByRole("status")).toHaveTextContent("Hello, LiqUIdify!");
  });
});
