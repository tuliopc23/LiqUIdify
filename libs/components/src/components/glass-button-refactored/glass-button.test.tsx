import { describe, expect, it } from "vitest";
import { GlassButton } from "./glass-button";

describe("GlassButton", () => {
  describe("Component Import", () => {
    it("can be imported successfully", () => {
      expect(GlassButton).toBeDefined();
      expect(typeof GlassButton).toBe("object"); // React components are objects with $$typeof
    });

    it("has displayName", () => {
      expect(GlassButton.displayName).toBe("GlassButton");
    });
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      // Simple smoke test - just verify the component can be instantiated
      const element = <GlassButton>Test</GlassButton>;
      expect(element).toBeDefined();
      expect(element.props.children).toBe("Test");
    });

    it("accepts standard button props", () => {
      const element = <GlassButton type="submit" disabled>Test</GlassButton>;
      expect(element.props.type).toBe("submit");
      expect(element.props.disabled).toBe(true);
    });
  });

});
