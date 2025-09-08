import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/test-utils";
import { GlassButton } from "./glass-button";

describe("GlassButton", () => {
  it("renders children", () => {
    render(<GlassButton>Click me</GlassButton>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("respects disabled prop", () => {
    render(
      <GlassButton disabled>
        Disabled
      </GlassButton>
    );
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });
});
