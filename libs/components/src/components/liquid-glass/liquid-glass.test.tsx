import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "../../test/test-utils";
import { LiquidGlass } from "./liquid-glass";
import type { LiquidGlassProps } from "./liquid-glass";

// Mock the useDeviceCapabilities hook
vi.mock("../../hooks/use-device-capabilities", () => ({
  useDeviceCapabilities: vi.fn(() => ({
    hasBackdropFilter: true,
    hasSVGFilters: true,
    hasGPU: true,
    performanceTier: "high",
    prefersReducedMotion: false,
    prefersReducedTransparency: false,
    isPointerDevice: true,
    devicePixelRatio: 2,
    connectionSpeed: "4g",
    colorGamut: "srgb",
    hasHDR: false,
  })),
}));

describe("LiquidGlass", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(
        <LiquidGlass>
          <div>Test Content</div>
        </LiquidGlass>
      );

      const content = screen.getByText("Test Content");
      expect(content).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(
        <LiquidGlass className="custom-class">
          <div>Content</div>
        </LiquidGlass>
      );

      const container = screen.getByText("Content").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("renders with custom element type", () => {
      render(
        <LiquidGlass as="section">
          <div>Section Content</div>
        </LiquidGlass>
      );

      const section = screen.getByText("Section Content").parentElement;
      expect(section?.tagName).toBe("SECTION");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <LiquidGlass ref={ref}>
          <div>Content</div>
        </LiquidGlass>
      );

      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
  });

  describe("Variants", () => {
    const variants: Array<LiquidGlassProps["variant"]> = [
      "default",
      "solid",
      "translucent",
      "transparent",
      "holographic",
      "aurora",
      "frosted",
      "iridescent",
    ];

    variants.forEach((variant) => {
      it(`applies correct classes for ${variant} variant`, () => {
        render(
          <LiquidGlass variant={variant}>
            <div data-testid="content">Content</div>
          </LiquidGlass>
        );

        const container = screen.getByTestId("content").parentElement;
        expect(container).toHaveClass("liquid-glass");
        
        if (variant !== "default") {
          expect(container).toHaveClass(`liquid-glass-${variant}`);
        }
      });
    });
  });

  describe("Sizes", () => {
    const sizes: Array<LiquidGlassProps["size"]> = ["sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      it(`applies correct classes for ${size} size`, () => {
        render(
          <LiquidGlass size={size}>
            <div data-testid="content">Content</div>
          </LiquidGlass>
        );

        const container = screen.getByTestId("content").parentElement;
        expect(container).toHaveClass(`liquid-glass-${size}`);
      });
    });
  });

  describe("Interactive States", () => {
    it("applies interactive classes when interactive is true", () => {
      render(
        <LiquidGlass interactive>
          <div data-testid="content">Interactive Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveClass("liquid-glass-interactive");
    });

    it("does not apply interactive classes when interactive is false", () => {
      render(
        <LiquidGlass interactive={false}>
          <div data-testid="content">Static Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).not.toHaveClass("liquid-glass-interactive");
    });
  });

  describe("Animation States", () => {
    it("applies animated classes when animated is true", () => {
      render(
        <LiquidGlass animated>
          <div data-testid="content">Animated Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveClass("liquid-glass-animated");
    });

    it("does not apply animated classes when animated is false", () => {
      render(
        <LiquidGlass animated={false}>
          <div data-testid="content">Static Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).not.toHaveClass("liquid-glass-animated");
    });
  });

  describe("Elevation", () => {
    const elevations: Array<LiquidGlassProps["elevation"]> = [
      "none",
      "sm",
      "md",
      "lg",
      "xl",
    ];

    elevations.forEach((elevation) => {
      it(`applies correct classes for ${elevation} elevation`, () => {
        render(
          <LiquidGlass elevation={elevation}>
            <div data-testid="content">Content</div>
          </LiquidGlass>
        );

        const container = screen.getByTestId("content").parentElement;
        if (elevation !== "none") {
          expect(container).toHaveClass(`liquid-glass-elevation-${elevation}`);
        }
      });
    });
  });

  describe("Blur Effects", () => {
    it("applies blur classes when blur is true", () => {
      render(
        <LiquidGlass blur>
          <div data-testid="content">Blurred Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveClass("backdrop-blur-md");
    });

    it("applies custom blur strength", () => {
      render(
        <LiquidGlass blur blurStrength="xl">
          <div data-testid="content">Blurred Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveClass("backdrop-blur-xl");
    });
  });

  describe("Adaptive Features", () => {
    it("enables adaptive features by default", () => {
      render(
        <LiquidGlass>
          <div data-testid="content">Adaptive Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-adaptive", "true");
    });

    it("disables adaptive features when adaptive is false", () => {
      render(
        <LiquidGlass adaptive={false}>
          <div data-testid="content">Non-adaptive Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-adaptive", "false");
    });

    it("applies quality settings based on performance tier", async () => {
      const { useDeviceCapabilities } = await import(
        "../../hooks/use-device-capabilities"
      );
      
      (useDeviceCapabilities as any).mockReturnValue({
        hasBackdropFilter: true,
        hasSVGFilters: true,
        hasGPU: true,
        performanceTier: "low",
        prefersReducedMotion: false,
        prefersReducedTransparency: false,
        isPointerDevice: true,
        devicePixelRatio: 1,
        connectionSpeed: "3g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <LiquidGlass adaptive>
          <div data-testid="content">Low Performance Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-quality", "low");
    });
  });

  describe("Accessibility", () => {
    it("respects prefers-reduced-motion", async () => {
      const { useDeviceCapabilities } = await import(
        "../../hooks/use-device-capabilities"
      );
      
      (useDeviceCapabilities as any).mockReturnValue({
        hasBackdropFilter: true,
        hasSVGFilters: true,
        hasGPU: true,
        performanceTier: "high",
        prefersReducedMotion: true,
        prefersReducedTransparency: false,
        isPointerDevice: true,
        devicePixelRatio: 2,
        connectionSpeed: "4g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <LiquidGlass animated>
          <div data-testid="content">Reduced Motion Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-reduced-motion", "true");
    });

    it("respects prefers-reduced-transparency", async () => {
      const { useDeviceCapabilities } = await import(
        "../../hooks/use-device-capabilities"
      );
      
      (useDeviceCapabilities as any).mockReturnValue({
        hasBackdropFilter: true,
        hasSVGFilters: true,
        hasGPU: true,
        performanceTier: "high",
        prefersReducedMotion: false,
        prefersReducedTransparency: true,
        isPointerDevice: true,
        devicePixelRatio: 2,
        connectionSpeed: "4g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <LiquidGlass variant="transparent">
          <div data-testid="content">Reduced Transparency Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-reduced-transparency", "true");
    });

    it("supports ARIA attributes", () => {
      render(
        <LiquidGlass
          role="region"
          aria-label="Glass Container"
          aria-describedby="description"
        >
          <div>Accessible Content</div>
        </LiquidGlass>
      );

      const container = screen.getByRole("region");
      expect(container).toHaveAttribute("aria-label", "Glass Container");
      expect(container).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("SVG Filter Integration", () => {
    it("applies SVG filter when available", () => {
      render(
        <LiquidGlass variant="holographic">
          <div data-testid="content">Holographic Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      const style = window.getComputedStyle(container!);
      
      // Check that the component would apply filter styles
      expect(container).toHaveClass("liquid-glass-holographic");
    });

    it("falls back gracefully when SVG filters are not supported", async () => {
      const { useDeviceCapabilities } = await import(
        "../../hooks/use-device-capabilities"
      );
      
      (useDeviceCapabilities as any).mockReturnValue({
        hasBackdropFilter: true,
        hasSVGFilters: false,
        hasGPU: true,
        performanceTier: "high",
        prefersReducedMotion: false,
        prefersReducedTransparency: false,
        isPointerDevice: true,
        devicePixelRatio: 2,
        connectionSpeed: "4g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <LiquidGlass variant="holographic">
          <div data-testid="content">Fallback Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-svg-filters", "false");
    });
  });

  describe("Complex Scenarios", () => {
    it("combines multiple props correctly", () => {
      render(
        <LiquidGlass
          variant="aurora"
          size="lg"
          elevation="xl"
          interactive
          animated
          blur
          blurStrength="lg"
          className="custom-class"
          data-testid="complex"
        >
          <div>Complex Content</div>
        </LiquidGlass>
      );

      const container = screen.getByTestId("complex");
      expect(container).toHaveClass(
        "liquid-glass",
        "liquid-glass-aurora",
        "liquid-glass-lg",
        "liquid-glass-elevation-xl",
        "liquid-glass-interactive",
        "liquid-glass-animated",
        "backdrop-blur-lg",
        "custom-class"
      );
    });

    it("adapts to different device capabilities", async () => {
      const { useDeviceCapabilities } = await import(
        "../../hooks/use-device-capabilities"
      );
      
      // Test with high-end device
      (useDeviceCapabilities as any).mockReturnValue({
        hasBackdropFilter: true,
        hasSVGFilters: true,
        hasGPU: true,
        performanceTier: "high",
        prefersReducedMotion: false,
        prefersReducedTransparency: false,
        isPointerDevice: true,
        devicePixelRatio: 3,
        connectionSpeed: "5g",
        colorGamut: "p3",
        hasHDR: true,
      });

      const { rerender } = render(
        <LiquidGlass adaptive variant="iridescent" animated>
          <div data-testid="adaptive">High-end Content</div>
        </LiquidGlass>
      );

      let container = screen.getByTestId("adaptive").parentElement;
      expect(container).toHaveAttribute("data-quality", "high");
      expect(container).toHaveAttribute("data-hdr", "true");

      // Test with low-end device
      (useDeviceCapabilities as any).mockReturnValue({
        hasBackdropFilter: false,
        hasSVGFilters: false,
        hasGPU: false,
        performanceTier: "low",
        prefersReducedMotion: true,
        prefersReducedTransparency: true,
        isPointerDevice: false,
        devicePixelRatio: 1,
        connectionSpeed: "2g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      rerender(
        <LiquidGlass adaptive variant="iridescent" animated>
          <div data-testid="adaptive">Low-end Content</div>
        </LiquidGlass>
      );

      container = screen.getByTestId("adaptive").parentElement;
      expect(container).toHaveAttribute("data-quality", "low");
      expect(container).toHaveAttribute("data-reduced-motion", "true");
      expect(container).toHaveAttribute("data-reduced-transparency", "true");
    });
  });
});
