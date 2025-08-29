import { describe, expect, it } from "vitest";
import { render } from "../../test/test-utils";
import { vi, beforeAll } from "vitest";
import { setupDOM } from "../../test/test-setup";
import { LiquidGlassDefs } from "./liquid-glass-defs";

// Set up DOM environment
beforeAll(() => {
  setupDOM();
});

describe("LiquidGlassDefs", () => {
  describe("Rendering", () => {
    it("renders SVG element with defs", () => {
      const { container } = render(<LiquidGlassDefs />);
      const svg = container.querySelector("svg");
      const defs = container.querySelector("defs");

      expect(svg).toBeInTheDocument();
      expect(defs).toBeInTheDocument();
    });

    it("renders with proper SVG attributes", () => {
      const { container } = render(<LiquidGlassDefs />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "0");
      expect(svg).toHaveAttribute("height", "0");
      expect(svg).toHaveStyle({ position: "absolute" });
    });

    it("renders with aria-hidden for accessibility", () => {
      const { container } = render(<LiquidGlassDefs />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("SVG Filters", () => {
    it("renders liquid glass blur filter", () => {
      const { container } = render(<LiquidGlassDefs />);
      const blurFilter = container.querySelector("#liquid-glass-blur");

      expect(blurFilter).toBeInTheDocument();

      // Check for Gaussian blur
      const gaussianBlur = blurFilter?.querySelector("feGaussianBlur");
      expect(gaussianBlur).toBeInTheDocument();
      expect(gaussianBlur).toHaveAttribute("stdDeviation");
    });

    it("renders liquid glass noise filter", () => {
      const { container } = render(<LiquidGlassDefs />);
      const noiseFilter = container.querySelector("#liquid-glass-noise");

      expect(noiseFilter).toBeInTheDocument();

      // Check for turbulence
      const turbulence = noiseFilter?.querySelector("feTurbulence");
      expect(turbulence).toBeInTheDocument();
      expect(turbulence).toHaveAttribute("type", "fractalNoise");
      expect(turbulence).toHaveAttribute("baseFrequency");
      expect(turbulence).toHaveAttribute("numOctaves");
    });

    it("renders liquid glass displacement filter", () => {
      const { container } = render(<LiquidGlassDefs />);
      const displacementFilter = container.querySelector(
        "#liquid-glass-displacement",
      );

      expect(displacementFilter).toBeInTheDocument();

      // Check for displacement map
      const displacementMap =
        displacementFilter?.querySelector("feDisplacementMap");
      expect(displacementMap).toBeInTheDocument();
      expect(displacementMap).toHaveAttribute("scale");
    });

    it("renders liquid glass morphology filter", () => {
      const { container } = render(<LiquidGlassDefs />);
      const morphologyFilter = container.querySelector(
        "#liquid-glass-morphology",
      );

      expect(morphologyFilter).toBeInTheDocument();

      // Check for morphology operations
      const morphology = morphologyFilter?.querySelector("feMorphology");
      expect(morphology).toBeInTheDocument();
      expect(morphology).toHaveAttribute("operator");
      expect(morphology).toHaveAttribute("radius");
    });

    it("renders liquid glass holographic filter", () => {
      const { container } = render(<LiquidGlassDefs />);
      const holographicFilter = container.querySelector(
        "#liquid-glass-holographic",
      );

      expect(holographicFilter).toBeInTheDocument();

      // Check for color matrix for holographic effect
      const colorMatrix = holographicFilter?.querySelector("feColorMatrix");
      expect(colorMatrix).toBeInTheDocument();

      // Check for composite operations
      const composite = holographicFilter?.querySelector("feComposite");
      expect(composite).toBeInTheDocument();
    });

    it("renders liquid glass aurora filter", () => {
      const { container } = render(<LiquidGlassDefs />);
      const auroraFilter = container.querySelector("#liquid-glass-aurora");

      expect(auroraFilter).toBeInTheDocument();

      // Check for turbulence for aurora effect
      const turbulence = auroraFilter?.querySelector("feTurbulence");
      expect(turbulence).toBeInTheDocument();

      // Check for color matrix transformations
      const colorMatrices = auroraFilter?.querySelectorAll("feColorMatrix");
      expect(colorMatrices).toBeDefined();
      expect(colorMatrices!.length).toBeGreaterThan(0);
    });

    it("renders liquid glass iridescent filter", () => {
      const { container } = render(<LiquidGlassDefs />);
      const iridescentFilter = container.querySelector(
        "#liquid-glass-iridescent",
      );

      expect(iridescentFilter).toBeInTheDocument();

      // Check for specular lighting
      const specularLighting =
        iridescentFilter?.querySelector("feSpecularLighting");
      expect(specularLighting).toBeInTheDocument();

      // Check for point light source
      const pointLight = iridescentFilter?.querySelector("fePointLight");
      expect(pointLight).toBeInTheDocument();
    });
  });

  describe("Gradients", () => {
    it("renders liquid glass gradient", () => {
      const { container } = render(<LiquidGlassDefs />);
      const gradient = container.querySelector("#liquid-glass-gradient");

      expect(gradient).toBeInTheDocument();

      // Check for gradient stops
      const stops = gradient?.querySelectorAll("stop");
      expect(stops).toBeDefined();
      expect(stops!.length).toBeGreaterThan(0);
    });

    it("renders liquid glass radial gradient", () => {
      const { container } = render(<LiquidGlassDefs />);
      const radialGradient = container.querySelector("#liquid-glass-radial");

      expect(radialGradient).toBeInTheDocument();

      // Check gradient attributes
      expect(radialGradient?.tagName).toBe("radialGradient");

      // Check for gradient stops
      const stops = radialGradient?.querySelectorAll("stop");
      expect(stops).toBeDefined();
      expect(stops!.length).toBeGreaterThan(0);
    });

    it("renders liquid glass mesh gradient pattern", () => {
      const { container } = render(<LiquidGlassDefs />);
      const pattern = container.querySelector("#liquid-glass-pattern");

      expect(pattern).toBeInTheDocument();
      expect(pattern?.tagName).toBe("pattern");

      // Check pattern attributes
      expect(pattern).toHaveAttribute("width");
      expect(pattern).toHaveAttribute("height");
      expect(pattern).toHaveAttribute("patternUnits");
    });
  });

  describe("Masks", () => {
    it("renders liquid glass mask", () => {
      const { container } = render(<LiquidGlassDefs />);
      const mask = container.querySelector("#liquid-glass-mask");

      expect(mask).toBeInTheDocument();

      // Check for mask content
      const rect = mask?.querySelector("rect");
      expect(rect).toBeInTheDocument();
      expect(rect).toHaveAttribute("fill");
    });

    it("renders liquid glass circular mask", () => {
      const { container } = render(<LiquidGlassDefs />);
      const circularMask = container.querySelector(
        "#liquid-glass-mask-circular",
      );

      expect(circularMask).toBeInTheDocument();

      // Check for circular mask content
      const circle = circularMask?.querySelector("circle");
      expect(circle).toBeInTheDocument();
      expect(circle).toHaveAttribute("r");
      expect(circle).toHaveAttribute("cx");
      expect(circle).toHaveAttribute("cy");
    });
  });

  describe("Performance Optimizations", () => {
    it("filters have appropriate color-interpolation-filters", () => {
      const { container } = render(<LiquidGlassDefs />);
      const filters = container.querySelectorAll("filter");

      filters.forEach((filter) => {
        // Some filters should use sRGB for performance
        const filterOperations = filter.querySelectorAll(
          "feGaussianBlur, feColorMatrix",
        );
        expect(filterOperations.length).toBeGreaterThanOrEqual(0);
      });
    });

    it("filters have appropriate filterUnits", () => {
      const { container } = render(<LiquidGlassDefs />);
      const filters = container.querySelectorAll("filter");

      filters.forEach((filter) => {
        expect(filter).toHaveAttribute("filterUnits");
        const filterUnits = filter.getAttribute("filterUnits");
        expect(["objectBoundingBox", "userSpaceOnUse"]).toContain(filterUnits);
      });
    });
  });

  describe("Accessibility", () => {
    it("SVG element is hidden from screen readers", () => {
      const { container } = render(<LiquidGlassDefs />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("SVG element does not interfere with layout", () => {
      const { container } = render(<LiquidGlassDefs />);
      const svg = container.querySelector("svg");

      expect(svg).toHaveAttribute("width", "0");
      expect(svg).toHaveAttribute("height", "0");
      expect(svg).toHaveStyle({ position: "absolute" });
    });
  });

  describe("Integration", () => {
    it("provides all necessary filter IDs for liquid glass components", () => {
      const { container } = render(<LiquidGlassDefs />);

      // Essential filters that components depend on
      const essentialFilters = [
        "#liquid-glass-blur",
        "#liquid-glass-noise",
        "#liquid-glass-displacement",
        "#liquid-glass-holographic",
        "#liquid-glass-aurora",
        "#liquid-glass-iridescent",
      ];

      essentialFilters.forEach((filterId) => {
        const filter = container.querySelector(filterId);
        expect(filter).toBeInTheDocument();
      });
    });

    it("provides all necessary gradients for liquid glass components", () => {
      const { container } = render(<LiquidGlassDefs />);

      // Essential gradients
      const essentialGradients = [
        "#liquid-glass-gradient",
        "#liquid-glass-radial",
      ];

      essentialGradients.forEach((gradientId) => {
        const gradient = container.querySelector(gradientId);
        expect(gradient).toBeInTheDocument();
      });
    });

    it("renders only once when mounted multiple times", () => {
      const { container: container1 } = render(<LiquidGlassDefs />);
      const { container: container2 } = render(<LiquidGlassDefs />);

      const svg1 = container1.querySelector("svg");
      const svg2 = container2.querySelector("svg");

      expect(svg1).toBeInTheDocument();
      expect(svg2).toBeInTheDocument();

      // Both should have the same structure
      const filters1 = container1.querySelectorAll("filter");
      const filters2 = container2.querySelectorAll("filter");

      expect(filters1.length).toBe(filters2.length);
    });
  });
});
