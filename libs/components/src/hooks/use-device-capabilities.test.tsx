import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDeviceCapabilities } from "./use-device-capabilities";

describe("useDeviceCapabilities", () => {
  // Store original values
  let originalNavigator: any;
  let originalWindow: any;
  let originalCSS: any;
  let originalMatchMedia: any;

  beforeEach(() => {
    // Store originals
    originalNavigator = global.navigator;
    originalWindow = global.window;
    originalCSS = global.CSS;
    originalMatchMedia = global.matchMedia;

    // Setup default mocks
    Object.defineProperty(global, "navigator", {
      value: {
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        hardwareConcurrency: 8,
        deviceMemory: 8,
        connection: {
          effectiveType: "4g",
          downlink: 10,
          rtt: 50,
        },
        gpu: {
          requestAdapter: vi.fn().mockResolvedValue({
            features: new Set(["texture-compression-bc"]),
          }),
        },
      },
      writable: true,
      configurable: true,
    });

    Object.defineProperty(global, "window", {
      value: {
        ...originalWindow,
        devicePixelRatio: 2,
        matchMedia: vi.fn((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      },
      writable: true,
      configurable: true,
    });

    Object.defineProperty(global, "CSS", {
      value: {
        supports: vi.fn((property, value) => {
          if (property === "backdrop-filter" && value === "blur(10px)") {
            return true;
          }
          if (property === "filter" && value === "url(#test)") {
            return true;
          }
          return false;
        }),
      },
      writable: true,
      configurable: true,
    });

    global.matchMedia = window.matchMedia;
  });

  afterEach(() => {
    // Restore originals
    global.navigator = originalNavigator;
    global.window = originalWindow;
    global.CSS = originalCSS;
    global.matchMedia = originalMatchMedia;
    vi.clearAllMocks();
  });

  describe("Backdrop Filter Detection", () => {
    it("detects backdrop filter support when available", () => {
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.hasBackdropFilter).toBe(true);
    });

    it("detects lack of backdrop filter support", () => {
      CSS.supports = vi.fn(() => false);
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.hasBackdropFilter).toBe(false);
    });

    it("handles CSS.supports not being available", () => {
      Object.defineProperty(global, "CSS", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.hasBackdropFilter).toBe(false);
    });
  });

  describe("SVG Filter Detection", () => {
    it("detects SVG filter support when available", () => {
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.hasSVGFilters).toBe(true);
    });

    it("detects lack of SVG filter support", () => {
      CSS.supports = vi.fn((property) => {
        if (property === "filter") return false;
        return true;
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.hasSVGFilters).toBe(false);
    });
  });

  describe("GPU Detection", () => {
    it("detects GPU availability", async () => {
      const { result } = renderHook(() => useDeviceCapabilities());
      // Wait for async GPU detection
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(result.current.hasGPU).toBe(true);
    });

    it("handles missing GPU API", async () => {
      Object.defineProperty(global.navigator, "gpu", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(result.current.hasGPU).toBe(false);
    });

    it("handles GPU adapter request failure", async () => {
      Object.defineProperty(global.navigator, "gpu", {
        value: {
          requestAdapter: vi
            .fn()
            .mockRejectedValue(new Error("GPU not available")),
        },
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(result.current.hasGPU).toBe(false);
    });
  });

  describe("Performance Tier Detection", () => {
    it("detects high performance tier", () => {
      Object.defineProperty(global.navigator, "hardwareConcurrency", {
        value: 16,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(global.navigator, "deviceMemory", {
        value: 16,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.performanceTier).toBe("high");
    });

    it("detects medium performance tier", () => {
      Object.defineProperty(global.navigator, "hardwareConcurrency", {
        value: 4,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(global.navigator, "deviceMemory", {
        value: 4,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.performanceTier).toBe("medium");
    });

    it("detects low performance tier", () => {
      Object.defineProperty(global.navigator, "hardwareConcurrency", {
        value: 2,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(global.navigator, "deviceMemory", {
        value: 2,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.performanceTier).toBe("low");
    });

    it("handles missing hardware concurrency", () => {
      Object.defineProperty(global.navigator, "hardwareConcurrency", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.performanceTier).toBe("medium");
    });

    it("handles missing device memory", () => {
      Object.defineProperty(global.navigator, "deviceMemory", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.performanceTier).toBe("medium");
    });
  });

  describe("Media Query Preferences", () => {
    it("detects prefers-reduced-motion", () => {
      window.matchMedia = vi.fn((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.prefersReducedMotion).toBe(true);
    });

    it("detects prefers-reduced-transparency", () => {
      window.matchMedia = vi.fn((query) => ({
        matches: query === "(prefers-reduced-transparency: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.prefersReducedTransparency).toBe(true);
    });

    it("handles matchMedia not being available", () => {
      window.matchMedia = undefined as any;
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.prefersReducedMotion).toBe(false);
      expect(result.current.prefersReducedTransparency).toBe(false);
    });
  });

  describe("Pointer Device Detection", () => {
    it("detects pointer device", () => {
      window.matchMedia = vi.fn((query) => ({
        matches: query === "(pointer: fine)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.isPointerDevice).toBe(true);
    });

    it("detects touch device", () => {
      window.matchMedia = vi.fn((query) => ({
        matches: query === "(pointer: coarse)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.isPointerDevice).toBe(false);
    });
  });

  describe("Device Pixel Ratio", () => {
    it("detects high DPI display", () => {
      Object.defineProperty(window, "devicePixelRatio", {
        value: 3,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.devicePixelRatio).toBe(3);
    });

    it("detects standard DPI display", () => {
      Object.defineProperty(window, "devicePixelRatio", {
        value: 1,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.devicePixelRatio).toBe(1);
    });

    it("handles missing devicePixelRatio", () => {
      Object.defineProperty(window, "devicePixelRatio", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.devicePixelRatio).toBe(1);
    });
  });

  describe("Connection Speed Detection", () => {
    it("detects 5g connection", () => {
      Object.defineProperty(global.navigator, "connection", {
        value: {
          effectiveType: "5g",
          downlink: 20,
          rtt: 10,
        },
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.connectionSpeed).toBe("5g");
    });

    it("detects 4g connection", () => {
      Object.defineProperty(global.navigator, "connection", {
        value: {
          effectiveType: "4g",
          downlink: 10,
          rtt: 50,
        },
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.connectionSpeed).toBe("4g");
    });

    it("detects slow connection", () => {
      Object.defineProperty(global.navigator, "connection", {
        value: {
          effectiveType: "2g",
          downlink: 0.5,
          rtt: 500,
        },
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.connectionSpeed).toBe("slow-2g");
    });

    it("handles missing connection API", () => {
      Object.defineProperty(global.navigator, "connection", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.connectionSpeed).toBe("unknown");
    });
  });

  describe("Color Gamut Detection", () => {
    it("detects P3 color gamut", () => {
      window.matchMedia = vi.fn((query) => ({
        matches: query === "(color-gamut: p3)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.colorGamut).toBe("p3");
    });

    it("detects rec2020 color gamut", () => {
      window.matchMedia = vi.fn((query) => ({
        matches: query === "(color-gamut: rec2020)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.colorGamut).toBe("rec2020");
    });

    it("defaults to sRGB color gamut", () => {
      window.matchMedia = vi.fn(() => ({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.colorGamut).toBe("srgb");
    });
  });

  describe("HDR Detection", () => {
    it("detects HDR support", () => {
      window.matchMedia = vi.fn((query) => ({
        matches: query === "(dynamic-range: high)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.hasHDR).toBe(true);
    });

    it("detects lack of HDR support", () => {
      window.matchMedia = vi.fn(() => ({
        matches: false,
        media: "",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      const { result } = renderHook(() => useDeviceCapabilities());
      expect(result.current.hasHDR).toBe(false);
    });
  });

  describe("SSR Compatibility", () => {
    it("handles server-side rendering environment", () => {
      // Simulate SSR by removing window
      const originalWindow = global.window;
      delete (global as any).window;

      const { result } = renderHook(() => useDeviceCapabilities());

      // Should return safe defaults
      expect(result.current.hasBackdropFilter).toBe(false);
      expect(result.current.hasSVGFilters).toBe(false);
      expect(result.current.hasGPU).toBe(false);
      expect(result.current.performanceTier).toBe("medium");
      expect(result.current.prefersReducedMotion).toBe(false);
      expect(result.current.prefersReducedTransparency).toBe(false);
      expect(result.current.isPointerDevice).toBe(true);
      expect(result.current.devicePixelRatio).toBe(1);
      expect(result.current.connectionSpeed).toBe("unknown");
      expect(result.current.colorGamut).toBe("srgb");
      expect(result.current.hasHDR).toBe(false);

      // Restore window
      global.window = originalWindow;
    });
  });

  describe("Complex Scenarios", () => {
    it("detects high-end device configuration", () => {
      // Setup high-end device
      Object.defineProperty(global.navigator, "hardwareConcurrency", {
        value: 16,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(global.navigator, "deviceMemory", {
        value: 32,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, "devicePixelRatio", {
        value: 3,
        writable: true,
        configurable: true,
      });
      window.matchMedia = vi.fn((query) => {
        if (query === "(color-gamut: p3)") return { matches: true } as any;
        if (query === "(dynamic-range: high)") return { matches: true } as any;
        if (query === "(pointer: fine)") return { matches: true } as any;
        return { matches: false } as any;
      });

      const { result } = renderHook(() => useDeviceCapabilities());

      expect(result.current.performanceTier).toBe("high");
      expect(result.current.devicePixelRatio).toBe(3);
      expect(result.current.colorGamut).toBe("p3");
      expect(result.current.hasHDR).toBe(true);
      expect(result.current.isPointerDevice).toBe(true);
    });

    it("detects low-end device configuration", () => {
      // Setup low-end device
      Object.defineProperty(global.navigator, "hardwareConcurrency", {
        value: 2,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(global.navigator, "deviceMemory", {
        value: 1,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, "devicePixelRatio", {
        value: 1,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(global.navigator, "connection", {
        value: {
          effectiveType: "2g",
          downlink: 0.3,
          rtt: 800,
        },
        writable: true,
        configurable: true,
      });
      CSS.supports = vi.fn(() => false);
      window.matchMedia = vi.fn(() => ({ matches: false }) as any);

      const { result } = renderHook(() => useDeviceCapabilities());

      expect(result.current.hasBackdropFilter).toBe(false);
      expect(result.current.hasSVGFilters).toBe(false);
      expect(result.current.performanceTier).toBe("low");
      expect(result.current.devicePixelRatio).toBe(1);
      expect(result.current.connectionSpeed).toBe("slow-2g");
      expect(result.current.colorGamut).toBe("srgb");
      expect(result.current.hasHDR).toBe(false);
    });

    it("detects accessibility-focused configuration", () => {
      window.matchMedia = vi.fn((query) => {
        if (query === "(prefers-reduced-motion: reduce)")
          return { matches: true } as any;
        if (query === "(prefers-reduced-transparency: reduce)")
          return { matches: true } as any;
        if (query === "(pointer: coarse)") return { matches: true } as any;
        return { matches: false } as any;
      });

      const { result } = renderHook(() => useDeviceCapabilities());

      expect(result.current.prefersReducedMotion).toBe(true);
      expect(result.current.prefersReducedTransparency).toBe(true);
      expect(result.current.isPointerDevice).toBe(false);
    });
  });
});
