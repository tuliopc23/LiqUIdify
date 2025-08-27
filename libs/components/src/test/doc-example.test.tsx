import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Minimal example test used by .junie/guidelines.md
// This does not import library code to keep it hermetic and fast
function Hello({ name }: { name: string }) {
  return <div role="status">Hello, {name}!</div>;
}

describe("doc example", () => {
  it("renders greeting", () => {
    render(<Hello name="LiqUIdify" />);
    expect(screen.getByRole("status")).toHaveTextContent("Hello, LiqUIdify!");
  });
});
