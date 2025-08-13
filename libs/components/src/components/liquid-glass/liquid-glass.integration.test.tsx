import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../test/test-utils";
import { LiquidGlass } from "./liquid-glass";
import { LiquidGlassDefs } from "../liquid-glass-defs/liquid-glass-defs";
import { GlassButton } from "../glass-button-refactored/glass-button";
import { GlassCard } from "../glass-card-refactored/glass-card";
import { GlassModal } from "../glass-modal/glass-modal";
import { GlassInput } from "../glass-input/glass-input";

// Mock the useDeviceCapabilities hook with dynamic capabilities
const mockDeviceCapabilities = vi.fn();
vi.mock("../../hooks/use-device-capabilities", () => ({
  useDeviceCapabilities: () => mockDeviceCapabilities(),
}));

describe("Liquid Glass System Integration", () => {
  beforeEach(() => {
    // Reset to default high-performance device
    mockDeviceCapabilities.mockReturnValue({
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
    });
  });

  describe("Component Integration", () => {
    it("renders liquid glass with button component", () => {
      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="frosted">
            <GlassButton>Integrated Button</GlassButton>
          </LiquidGlass>
        </>,
      );

      const button = screen.getByRole("button", { name: "Integrated Button" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("liquid-glass-button");

      const container = button.closest(".liquid-glass");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("liquid-glass-frosted");
    });

    it("renders liquid glass with card component", () => {
      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="translucent" size="lg">
            <GlassCard>
              <GlassCard.Header>
                <GlassCard.Title>Integrated Card</GlassCard.Title>
              </GlassCard.Header>
              <GlassCard.Content>
                <p>Card content with liquid glass effect</p>
              </GlassCard.Content>
            </GlassCard>
          </LiquidGlass>
        </>,
      );

      const card = screen.getByText("Integrated Card").closest(".glass-card");
      expect(card).toBeInTheDocument();

      const container = card?.closest(".liquid-glass");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(
        "liquid-glass-translucent",
        "liquid-glass-lg",
      );
    });

    it("renders liquid glass with input component", () => {
      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="solid" interactive>
            <GlassInput placeholder="Enter text" aria-label="Test Input" />
          </LiquidGlass>
        </>,
      );

      const input = screen.getByLabelText("Test Input");
      expect(input).toBeInTheDocument();

      const container = input.closest(".liquid-glass");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(
        "liquid-glass-solid",
        "liquid-glass-interactive",
      );
    });

    it("renders nested liquid glass components", () => {
      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="aurora" size="xl">
            <div>
              <h2>Outer Container</h2>
              <LiquidGlass variant="holographic" size="sm">
                <p>Nested Content</p>
              </LiquidGlass>
            </div>
          </LiquidGlass>
        </>,
      );

      const outerContent = screen.getByText("Outer Container");
      const outerContainer = outerContent.closest(".liquid-glass");
      expect(outerContainer).toHaveClass(
        "liquid-glass-aurora",
        "liquid-glass-xl",
      );

      const nestedContent = screen.getByText("Nested Content");
      const nestedContainer = nestedContent.closest(".liquid-glass");
      expect(nestedContainer).toHaveClass(
        "liquid-glass-holographic",
        "liquid-glass-sm",
      );
    });
  });

  describe("Adaptive Behavior", () => {
    it("adapts to high-performance device", () => {
      mockDeviceCapabilities.mockReturnValue({
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

      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="iridescent" animated adaptive>
            <div data-testid="content">High Performance Content</div>
          </LiquidGlass>
        </>,
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-quality", "high");
      expect(container).toHaveAttribute("data-hdr", "true");
      expect(container).toHaveClass("liquid-glass-animated");
    });

    it("adapts to low-performance device", () => {
      mockDeviceCapabilities.mockReturnValue({
        hasBackdropFilter: false,
        hasSVGFilters: false,
        hasGPU: false,
        performanceTier: "low",
        prefersReducedMotion: false,
        prefersReducedTransparency: false,
        isPointerDevice: false,
        devicePixelRatio: 1,
        connectionSpeed: "2g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="iridescent" animated adaptive>
            <div data-testid="content">Low Performance Content</div>
          </LiquidGlass>
        </>,
      );

      const container = screen.getByTestId("content").parentElement;
      expect(container).toHaveAttribute("data-quality", "low");
      expect(container).toHaveAttribute("data-backdrop-filter", "false");
      expect(container).toHaveAttribute("data-svg-filters", "false");
    });

    it("respects accessibility preferences", () => {
      mockDeviceCapabilities.mockReturnValue({
        hasBackdropFilter: true,
        hasSVGFilters: true,
        hasGPU: true,
        performanceTier: "high",
        prefersReducedMotion: true,
        prefersReducedTransparency: true,
        isPointerDevice: true,
        devicePixelRatio: 2,
        connectionSpeed: "4g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="transparent" animated adaptive>
            <GlassButton>Accessible Button</GlassButton>
          </LiquidGlass>
        </>,
      );

      const container = screen.getByRole("button").closest(".liquid-glass");
      expect(container).toHaveAttribute("data-reduced-motion", "true");
      expect(container).toHaveAttribute("data-reduced-transparency", "true");
    });

    it("handles device capability changes dynamically", async () => {
      const { rerender } = render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="aurora" adaptive>
            <div data-testid="dynamic">Dynamic Content</div>
          </LiquidGlass>
        </>,
      );

      let container = screen.getByTestId("dynamic").parentElement;
      expect(container).toHaveAttribute("data-quality", "high");

      // Simulate device capability change
      mockDeviceCapabilities.mockReturnValue({
        hasBackdropFilter: false,
        hasSVGFilters: false,
        hasGPU: false,
        performanceTier: "low",
        prefersReducedMotion: true,
        prefersReducedTransparency: true,
        isPointerDevice: false,
        devicePixelRatio: 1,
        connectionSpeed: "slow-2g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      rerender(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="aurora" adaptive>
            <div data-testid="dynamic">Dynamic Content</div>
          </LiquidGlass>
        </>,
      );

      container = screen.getByTestId("dynamic").parentElement;
      expect(container).toHaveAttribute("data-quality", "low");
      expect(container).toHaveAttribute("data-reduced-motion", "true");
    });
  });

  describe("Interaction Patterns", () => {
    it("handles interactive liquid glass with buttons", async () => {
      const handleClick = vi.fn();

      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="frosted" interactive>
            <GlassButton onClick={handleClick}>Interactive Button</GlassButton>
          </LiquidGlass>
        </>,
      );

      const button = screen.getByRole("button");
      const container = button.closest(".liquid-glass");

      expect(container).toHaveClass("liquid-glass-interactive");

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles form inputs within liquid glass", async () => {
      const handleChange = vi.fn();

      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="solid" blur blurStrength="lg">
            <form>
              <GlassInput
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                aria-label="Email Input"
              />
              <GlassButton type="submit">Submit</GlassButton>
            </form>
          </LiquidGlass>
        </>,
      );

      const input = screen.getByLabelText("Email Input");
      const container = input.closest(".liquid-glass");

      expect(container).toHaveClass("backdrop-blur-lg");

      fireEvent.change(input, { target: { value: "test@example.com" } });
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles modal with liquid glass backdrop", () => {
      render(
        <>
          <LiquidGlassDefs />
          <GlassModal open onOpenChange={() => {}}>
            <LiquidGlass variant="translucent" elevation="xl">
              <GlassModal.Content>
                <GlassModal.Header>
                  <GlassModal.Title>Modal Title</GlassModal.Title>
                </GlassModal.Header>
                <GlassModal.Body>
                  <p>Modal content with liquid glass</p>
                </GlassModal.Body>
              </GlassModal.Content>
            </LiquidGlass>
          </GlassModal>
        </>,
      );

      const modalContent = screen.getByText("Modal content with liquid glass");
      const liquidGlassContainer = modalContent.closest(".liquid-glass");

      expect(liquidGlassContainer).toBeInTheDocument();
      expect(liquidGlassContainer).toHaveClass(
        "liquid-glass-translucent",
        "liquid-glass-elevation-xl",
      );
    });
  });

  describe("Performance Optimizations", () => {
    it("applies performance-based quality settings", () => {
      const performanceTiers = [
        { tier: "high", expectedQuality: "high" },
        { tier: "medium", expectedQuality: "medium" },
        { tier: "low", expectedQuality: "low" },
      ];

      performanceTiers.forEach(({ tier, expectedQuality }) => {
        mockDeviceCapabilities.mockReturnValue({
          hasBackdropFilter: true,
          hasSVGFilters: true,
          hasGPU: tier !== "low",
          performanceTier: tier,
          prefersReducedMotion: false,
          prefersReducedTransparency: false,
          isPointerDevice: true,
          devicePixelRatio: tier === "high" ? 3 : tier === "medium" ? 2 : 1,
          connectionSpeed:
            tier === "high" ? "5g" : tier === "medium" ? "4g" : "3g",
          colorGamut: tier === "high" ? "p3" : "srgb",
          hasHDR: tier === "high",
        });

        const { container } = render(
          <LiquidGlass variant="holographic" adaptive>
            <div data-testid={`perf-${tier}`}>Content</div>
          </LiquidGlass>,
        );

        const element = container.querySelector(
          `[data-testid="perf-${tier}"]`,
        )?.parentElement;
        expect(element).toHaveAttribute("data-quality", expectedQuality);
      });
    });

    it("disables animations on low-performance devices", () => {
      mockDeviceCapabilities.mockReturnValue({
        hasBackdropFilter: false,
        hasSVGFilters: false,
        hasGPU: false,
        performanceTier: "low",
        prefersReducedMotion: false,
        prefersReducedTransparency: false,
        isPointerDevice: false,
        devicePixelRatio: 1,
        connectionSpeed: "2g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <LiquidGlass variant="aurora" animated adaptive>
          <div data-testid="low-perf">Content</div>
        </LiquidGlass>,
      );

      const container = screen.getByTestId("low-perf").parentElement;
      // On low performance, animations should be limited
      expect(container).toHaveAttribute("data-quality", "low");
    });
  });

  describe("SVG Filter Integration", () => {
    it("applies SVG filters when supported", () => {
      mockDeviceCapabilities.mockReturnValue({
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
      });

      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="holographic">
            <div data-testid="svg-content">Holographic Effect</div>
          </LiquidGlass>
        </>,
      );

      const container = screen.getByTestId("svg-content").parentElement;
      expect(container).toHaveClass("liquid-glass-holographic");
      expect(container).toHaveAttribute("data-svg-filters", "true");
    });

    it("provides fallback when SVG filters are not supported", () => {
      mockDeviceCapabilities.mockReturnValue({
        hasBackdropFilter: true,
        hasSVGFilters: false,
        hasGPU: true,
        performanceTier: "medium",
        prefersReducedMotion: false,
        prefersReducedTransparency: false,
        isPointerDevice: true,
        devicePixelRatio: 2,
        connectionSpeed: "4g",
        colorGamut: "srgb",
        hasHDR: false,
      });

      render(
        <>
          <LiquidGlassDefs />
          <LiquidGlass variant="holographic">
            <div data-testid="no-svg">Fallback Effect</div>
          </LiquidGlass>
        </>,
      );

      const container = screen.getByTestId("no-svg").parentElement;
      expect(container).toHaveAttribute("data-svg-filters", "false");
      // Should still have the variant class for CSS fallback
      expect(container).toHaveClass("liquid-glass-holographic");
    });
  });

  describe("Complex UI Patterns", () => {
    it("renders dashboard layout with liquid glass components", () => {
      render(
        <>
          <LiquidGlassDefs />
          <div className="dashboard">
            <LiquidGlass variant="solid" size="xl" as="header">
              <h1>Dashboard Header</h1>
            </LiquidGlass>

            <div className="dashboard-content">
              <LiquidGlass variant="frosted" size="lg" as="aside">
                <nav>
                  <GlassButton variant="ghost">Menu Item 1</GlassButton>
                  <GlassButton variant="ghost">Menu Item 2</GlassButton>
                </nav>
              </LiquidGlass>

              <LiquidGlass variant="translucent" as="main">
                <GlassCard>
                  <GlassCard.Header>
                    <GlassCard.Title>Main Content</GlassCard.Title>
                  </GlassCard.Header>
                  <GlassCard.Content>
                    <p>Dashboard content goes here</p>
                  </GlassCard.Content>
                </GlassCard>
              </LiquidGlass>
            </div>
          </div>
        </>,
      );

      // Verify header
      const header = screen.getByText("Dashboard Header").parentElement;
      expect(header).toHaveClass("liquid-glass-solid", "liquid-glass-xl");
      expect(header?.tagName).toBe("HEADER");

      // Verify sidebar
      const menuButton1 = screen.getByRole("button", { name: "Menu Item 1" });
      const sidebar = menuButton1.closest("aside");
      expect(sidebar).toHaveClass("liquid-glass-frosted", "liquid-glass-lg");

      // Verify main content
      const mainContent = screen.getByText("Dashboard content goes here");
      const main = mainContent.closest("main");
      expect(main).toHaveClass("liquid-glass-translucent");
    });

    it("handles responsive liquid glass grid", () => {
      render(
        <>
          <LiquidGlassDefs />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <LiquidGlass
                key={i}
                variant={i % 2 === 0 ? "frosted" : "translucent"}
                size="md"
                elevation={i % 3 === 0 ? "xl" : "md"}
                interactive
              >
                <GlassCard>
                  <GlassCard.Content>
                    <p>Grid Item {i}</p>
                  </GlassCard.Content>
                </GlassCard>
              </LiquidGlass>
            ))}
          </div>
        </>,
      );

      // Verify all grid items are rendered with correct variants
      const item1 = screen.getByText("Grid Item 1").closest(".liquid-glass");
      expect(item1).toHaveClass("liquid-glass-translucent");

      const item2 = screen.getByText("Grid Item 2").closest(".liquid-glass");
      expect(item2).toHaveClass("liquid-glass-frosted");

      const item3 = screen.getByText("Grid Item 3").closest(".liquid-glass");
      expect(item3).toHaveClass(
        "liquid-glass-translucent",
        "liquid-glass-elevation-xl",
      );

      // All items should be interactive
      for (let i = 1; i <= 6; i++) {
        const item = screen
          .getByText(`Grid Item ${i}`)
          .closest(".liquid-glass");
        expect(item).toHaveClass("liquid-glass-interactive");
      }
    });
  });
});
