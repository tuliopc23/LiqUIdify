import { describe, expect, it } from "bun:test";
import {
  isGlassComponent,
  isValidBlur,
  isValidOpacity,
  validateGlassProps,
} from "./type-guards";

describe("Type Guards", () => {
  describe("isValidOpacity", () => {
    it("should return true for valid opacity values", () => {
      expect(isValidOpacity(0)).toBe(true);
      expect(isValidOpacity(0.5)).toBe(true);
      expect(isValidOpacity(1)).toBe(true);
    });

    it("should return false for invalid opacity values", () => {
      expect(isValidOpacity(-0.1)).toBe(false);
      expect(isValidOpacity(1.1)).toBe(false);
      expect(isValidOpacity("0.5")).toBe(false);
      expect(isValidOpacity(null)).toBe(false);
    });
  });

  describe("isValidBlur", () => {
    it("should return true for valid blur values", () => {
      expect(isValidBlur(0)).toBe(true);
      expect(isValidBlur(50)).toBe(true);
      expect(isValidBlur(100)).toBe(true);
    });

    it("should return false for invalid blur values", () => {
      expect(isValidBlur(-1)).toBe(false);
      expect(isValidBlur(101)).toBe(false);
      expect(isValidBlur("50")).toBe(false);
    });
  });

  describe("validateGlassProps", () => {
    it("should validate glass props object", () => {
      expect(() =>
        validateGlassProps({ opacity: 0.5, blur: 50 }),
      ).not.toThrow();
      expect(() => validateGlassProps({})).not.toThrow();
    });

    it("should throw for invalid opacity", () => {
      expect(() => validateGlassProps({ opacity: 2 })).toThrow(
        "Opacity must be between 0 and 1",
      );
    });

    it("should throw for invalid blur", () => {
      expect(() => validateGlassProps({ blur: 150 })).toThrow(
        "Blur must be between 0 and 100",
      );
    });

    it("should throw for non-object input", () => {
      expect(() => validateGlassProps("not an object")).toThrow();
      expect(() => validateGlassProps(null)).toThrow();
    });
  });

  describe("isGlassComponent", () => {
    it("should identify glass components", () => {
      const element = document.createElement("div");
      element.classList.add("glass-button");
      expect(isGlassComponent(element)).toBe(true);
    });

    it("should return false for non-glass components", () => {
      const element = document.createElement("div");
      expect(isGlassComponent(element)).toBe(false);
      expect(isGlassComponent("not an element")).toBe(false);
    });
  });
});
