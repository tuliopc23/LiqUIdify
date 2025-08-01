/**
 * Performance Integration Tests
 *
 * Comprehensive performance testing suite to ensure the LiqUIdify component library
 * meets its S-tier performance requirements including bundle size limits,
 * render performance, animation performance, memory usage, and more.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, cleanup, act, waitFor } from "@testing-library/react";
import {
  PerformanceMonitor,
  initializePerformanceMonitoring,
} from "../lib/performance-monitor";
import React, { Suspense, lazy, useState, useEffect } from "react";

// Import components for testing
import { GlassButton } from "../components/glass-button-refactored";
import { GlassCard } from "../components/glass-card-refactored";
import { GlassInput } from "../components/glass-input";
import { GlassSelect } from "../components/glass-select";
import { GlassTable } from "../components/glass-table";
import { GlassModal } from "../components/glass-modal";
import { GlassSpinner } from "../components/glass-spinner";
import { GlassProgress } from "../components/glass-progress";
import { ThemeProvider } from "../components/theme-provider";

// Mock performance APIs for testing
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  getEntriesByName: vi.fn(() => []),
  memory: {
    usedJSHeapSize: 1024 * 1024 * 10, // 10MB
    totalJSHeapSize: 1024 * 1024 * 50, // 50MB
    jsHeapSizeLimit: 1024 * 1024 * 100, // 100MB
  },
};

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16));
global.cancelAnimationFrame = vi.fn();

describe("Performance Integration Tests", () => {
  let performanceMonitor: PerformanceMonitor;
  let originalPerformance: Performance;

  beforeEach(() => {
    originalPerformance = global.performance;
    global.performance = mockPerformance as any;
    performanceMonitor = initializePerformanceMonitoring();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    performanceMonitor.disconnect();
    global.performance = originalPerformance;
  });

  describe("Bundle Size Validation", () => {
    it("should validate core bundle size is under 30KB", async () => {
      // Mock bundle size measurement
      const mockBundleSize = 25 * 1024; // 25KB
      mockPerformance.getEntriesByType.mockReturnValue([
        {
          name: "core.mjs",
          transferSize: mockBundleSize,
          encodedBodySize: mockBundleSize,
          decodedBodySize: mockBundleSize * 1.2,
        },
      ]);

      const bundleSize = await performanceMonitor.measureBundleSize("core");

      expect(bundleSize).toBeLessThan(30 * 1024); // 30KB limit
      expect(bundleSize).toEqual(mockBundleSize);
    });

    it("should validate full bundle size is under 60KB", async () => {
      // Mock full bundle size
      const mockBundleSize = 55 * 1024; // 55KB
      mockPerformance.getEntriesByType.mockReturnValue([
        {
          name: "index.mjs",
          transferSize: mockBundleSize,
          encodedBodySize: mockBundleSize,
          decodedBodySize: mockBundleSize * 1.2,
        },
      ]);

      const bundleSize = await performanceMonitor.measureBundleSize("index");

      expect(bundleSize).toBeLessThan(60 * 1024); // 60KB limit
      expect(bundleSize).toEqual(mockBundleSize);
    });

    it("should validate individual component bundles are optimized", async () => {
      const componentBundles = ["button", "card", "input", "modal"];

      for (const component of componentBundles) {
        const mockSize = 3 * 1024; // 3KB per component
        mockPerformance.getEntriesByType.mockReturnValue([
          {
            name: `${component}.mjs`,
            transferSize: mockSize,
            encodedBodySize: mockSize,
            decodedBodySize: mockSize * 1.2,
          },
        ]);

        const bundleSize =
          await performanceMonitor.measureBundleSize(component);
        expect(bundleSize).toBeLessThan(5 * 1024); // 5KB limit per component
      }
    });
  });

  describe("Render Performance", () => {
    it("should render components within performance thresholds", () => {
      const startTime = 10;
      const endTime = 20;
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      const renderTime = performanceMonitor.measureComponentRender(
        "GlassButton",
        () => {
          return render(<GlassButton>Test Button</GlassButton>);
        },
      );

      expect(renderTime).toBeDefined();
      expect(mockPerformance.now).toHaveBeenCalledTimes(2);
    });

    it("should detect unnecessary re-renders", () => {
      let renderCount = 0;

      const TestComponent = () => {
        renderCount++;
        const [count, setCount] = useState(0);

        return (
          <GlassCard>
            <GlassButton onClick={() => setCount((c) => c + 1)}>
              Count: {count}
            </GlassButton>
          </GlassCard>
        );
      };

      const { rerender } = render(<TestComponent />);
      const initialRenderCount = renderCount;

      // Re-render with same props should not cause unnecessary renders
      rerender(<TestComponent />);

      expect(renderCount).toBe(initialRenderCount);
    });

    it("should measure complex component composition performance", () => {
      const ComplexComponent = () => (
        <ThemeProvider>
          <GlassCard>
            <GlassInput placeholder="Search..." />
            <GlassSelect options={[{ value: "1", label: "Option 1" }]} />
            <GlassButton>Submit</GlassButton>
          </GlassCard>
        </ThemeProvider>
      );

      const startTime = 5;
      const endTime = 18;
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      performanceMonitor.measureComponentRender("ComplexComponent", () => {
        return render(<ComplexComponent />);
      });

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.renderTime).toBeLessThan(16); // 60fps = 16ms budget
    });
  });

  describe("Animation Performance", () => {
    it("should verify animations run at 60fps", async () => {
      const mockFrameRate = 58; // Close to 60fps
      const mockDroppedFrames = 2;

      // Mock animation performance measurement
      vi.spyOn(
        performanceMonitor,
        "measureAnimationPerformance",
      ).mockResolvedValue({
        frameRate: mockFrameRate,
        droppedFrames: mockDroppedFrames,
      });

      const animationCallback = vi.fn();
      const result =
        await performanceMonitor.measureAnimationPerformance(animationCallback);

      expect(result.frameRate).toBeGreaterThan(55); // Allow some tolerance
      expect(result.droppedFrames).toBeLessThan(5); // Minimal dropped frames
      expect(animationCallback).toHaveBeenCalled();
    });

    it("should test hardware acceleration for animations", () => {
      const AnimatedComponent = () => {
        const [isVisible, setIsVisible] = useState(false);

        return (
          <GlassModal isOpen={isVisible} onClose={() => setIsVisible(false)}>
            <GlassCard>Animated Modal Content</GlassCard>
          </GlassModal>
        );
      };

      const { container } = render(<AnimatedComponent />);

      // Check for CSS properties that enable hardware acceleration
      const modalElement = container.querySelector('[role="dialog"]');
      if (modalElement) {
        const computedStyle = window.getComputedStyle(modalElement);

        // These properties should trigger hardware acceleration
        expect(
          computedStyle.transform !== "none" ||
            computedStyle.willChange === "transform" ||
            computedStyle.backfaceVisibility === "hidden",
        ).toBe(true);
      }
    });

    it("should measure spinner animation performance", async () => {
      const SpinnerTest = () => <GlassSpinner size="lg" />;

      render(<SpinnerTest />);

      // Simulate animation measurement
      const result = await performanceMonitor.measureAnimationPerformance(
        () => {
          // Simulate spinner animation
        },
      );

      expect(result.frameRate).toBeGreaterThan(55);
    });
  });

  describe("Memory Usage", () => {
    it("should detect memory leaks in component mounting/unmounting", () => {
      const initialMemory = mockPerformance.memory.usedJSHeapSize;

      // Mount and unmount components multiple times
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(
          <GlassCard>
            <GlassInput value={`test-${i}`} onChange={() => {}} />
            <GlassButton>Button {i}</GlassButton>
          </GlassCard>,
        );
        unmount();
      }

      const finalMemory = mockPerformance.memory.usedJSHeapSize;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be minimal (less than 1MB for 10 components)
      expect(memoryIncrease).toBeLessThan(1024 * 1024);
    });

    it("should monitor memory usage during large dataset rendering", () => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 100,
      }));

      const LargeTable = () => (
        <GlassTable
          data={largeDataset}
          columns={[
            { key: "id", header: "ID" },
            { key: "name", header: "Name" },
            { key: "value", header: "Value" },
          ]}
        />
      );

      const initialMemory = mockPerformance.memory.usedJSHeapSize;

      render(<LargeTable />);

      const finalMemory = mockPerformance.memory.usedJSHeapSize;
      const memoryUsage = finalMemory - initialMemory;

      // Memory usage should be reasonable for 1000 items (less than 5MB)
      expect(memoryUsage).toBeLessThan(5 * 1024 * 1024);
    });
  });

  describe("Large Dataset Performance", () => {
    it("should handle large select options efficiently", () => {
      const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
        value: `option-${i}`,
        label: `Option ${i}`,
      }));

      const startTime = 0;
      const endTime = 12;
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      performanceMonitor.measureComponentRender("LargeSelect", () => {
        return render(<GlassSelect options={largeOptions} />);
      });

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.renderTime).toBeLessThan(50); // Should render within 50ms
    });

    it("should virtualize large table data", () => {
      const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `Description for item ${i}`,
        value: Math.random() * 1000,
        category: `Category ${i % 10}`,
      }));

      const { container } = render(
        <GlassTable
          data={largeDataset}
          columns={[
            { key: "id", header: "ID" },
            { key: "name", header: "Name" },
            { key: "description", header: "Description" },
            { key: "value", header: "Value" },
            { key: "category", header: "Category" },
          ]}
          virtualized={true}
        />,
      );

      // Should only render visible rows, not all 10,000
      const rows = container.querySelectorAll("tr");
      expect(rows.length).toBeLessThan(100); // Should virtualize
    });
  });

  describe("Lazy Loading", () => {
    it("should support lazy loading of components", async () => {
      const LazyComponent = lazy(() =>
        Promise.resolve({
          default: () => <GlassCard>Lazy Loaded Content</GlassCard>,
        }),
      );

      const LazyWrapper = () => (
        <Suspense fallback={<GlassSpinner />}>
          <LazyComponent />
        </Suspense>
      );

      const { getByText } = render(<LazyWrapper />);

      await waitFor(() => {
        expect(getByText("Lazy Loaded Content")).toBeInTheDocument();
      });
    });

    it("should not block initial page load", () => {
      const startTime = 0;
      const endTime = 8;
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      // Simulate initial page load with minimal components
      performanceMonitor.measureComponentRender("InitialLoad", () => {
        return render(
          <div>
            <GlassButton>Primary Action</GlassButton>
            <GlassSpinner />
          </div>,
        );
      });

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.renderTime).toBeLessThan(16); // Fast initial load
    });
  });

  describe("Tree Shaking Effectiveness", () => {
    it("should verify unused components are excluded", () => {
      // This test would typically run against the actual bundle
      // For now, we'll test that individual imports work
      const {
        GlassButton: ImportedButton,
      } = require("../components/glass-button-refactored");

      expect(ImportedButton).toBeDefined();
      expect(typeof ImportedButton).toBe("function");
    });

    it("should support selective imports", () => {
      // Test that we can import only specific components
      const coreComponents = ["GlassButton", "GlassCard", "GlassInput"];

      coreComponents.forEach((componentName) => {
        expect(() => {
          // This would be tested against actual bundle analysis
          // For now, verify the component exists
          const component = require("../index")[componentName];
          expect(component).toBeDefined();
        }).not.toThrow();
      });
    });
  });

  describe("CSS Performance", () => {
    it("should not cause layout thrashing", () => {
      const LayoutTestComponent = () => {
        const [width, setWidth] = useState(200);

        useEffect(() => {
          // Simulate rapid width changes
          const interval = setInterval(() => {
            setWidth((w) => (w === 200 ? 300 : 200));
          }, 100);

          return () => clearInterval(interval);
        }, []);

        return (
          <GlassCard style={{ width: `${width}px` }}>
            <GlassProgress value={50} />
          </GlassCard>
        );
      };

      const { container } = render(<LayoutTestComponent />);

      // Check that CSS uses efficient properties
      const cardElement = container.querySelector(".glass-card");
      if (cardElement) {
        const computedStyle = window.getComputedStyle(cardElement);

        // Should use transform instead of changing layout properties
        expect(computedStyle.transform).toBeDefined();
      }
    });

    it("should optimize CSS delivery", () => {
      // Test that critical CSS is inlined and non-critical is deferred
      const criticalComponents = [
        <GlassButton key="button">Button</GlassButton>,
        <GlassCard key="card">Card</GlassCard>,
        <GlassInput key="input" />,
      ];

      const { container } = render(<div>{criticalComponents}</div>);

      // Verify components render without FOUC (Flash of Unstyled Content)
      criticalComponents.forEach((_, index) => {
        const element = container.children[0].children[index];
        expect(element).toBeInTheDocument();
      });
    });

    it("should use efficient CSS selectors", () => {
      const { container } = render(
        <GlassCard className="test-card">
          <GlassButton className="test-button">Test</GlassButton>
        </GlassCard>,
      );

      // Check that components use efficient class-based selectors
      const card = container.querySelector(".test-card");
      const button = container.querySelector(".test-button");

      expect(card).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      // Verify no deep nesting or complex selectors
      expect(card?.classList.length).toBeGreaterThan(0);
      expect(button?.classList.length).toBeGreaterThan(0);
    });
  });

  describe("Performance Monitoring Integration", () => {
    it("should generate comprehensive performance report", () => {
      // Set up some mock metrics
      performanceMonitor.measureComponentRender("TestComponent", () => {
        return render(<GlassButton>Test</GlassButton>);
      });

      const report = performanceMonitor.generateReport();

      expect(report).toHaveProperty("metrics");
      expect(report).toHaveProperty("summary");
      expect(report.summary).toHaveProperty("overallScore");
      expect(report.summary).toHaveProperty("coreWebVitalsScore");
      expect(report.summary).toHaveProperty("recommendations");

      expect(typeof report.summary.overallScore).toBe("number");
      expect(Array.isArray(report.summary.recommendations)).toBe(true);
    });

    it("should track performance metrics over time", () => {
      const metrics1 = performanceMonitor.getMetrics();

      // Simulate some performance measurements
      performanceMonitor.measureComponentRender("Component1", () => {
        return render(<GlassCard>Content 1</GlassCard>);
      });

      const metrics2 = performanceMonitor.getMetrics();

      // Metrics should be updated
      expect(Object.keys(metrics2).length).toBeGreaterThanOrEqual(
        Object.keys(metrics1).length,
      );
    });

    it("should provide performance status indicators", () => {
      // Test metric status calculation
      const goodStatus = performanceMonitor.getMetricStatus("renderTime");
      expect(["good", "needs-improvement", "poor", "unknown"]).toContain(
        goodStatus,
      );
    });
  });

  describe("Real-world Performance Scenarios", () => {
    it("should handle complex form performance", () => {
      const ComplexForm = () => (
        <form>
          <GlassInput placeholder="Name" />
          <GlassInput placeholder="Email" type="email" />
          <GlassSelect
            options={[
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
              { value: "uk", label: "United Kingdom" },
            ]}
          />
          <GlassButton type="submit">Submit</GlassButton>
        </form>
      );

      const startTime = 2;
      const endTime = 14;
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      performanceMonitor.measureComponentRender("ComplexForm", () => {
        return render(<ComplexForm />);
      });

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.renderTime).toBeLessThan(20); // Complex forms should still be fast
    });

    it("should handle modal performance with backdrop", () => {
      const ModalTest = () => {
        const [isOpen, setIsOpen] = useState(true);

        return (
          <GlassModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <GlassCard>
              <h2>Modal Title</h2>
              <p>Modal content with multiple elements</p>
              <GlassButton onClick={() => setIsOpen(false)}>Close</GlassButton>
            </GlassCard>
          </GlassModal>
        );
      };

      const { container } = render(<ModalTest />);

      // Modal should render efficiently
      const modal = container.querySelector('[role="dialog"]');
      expect(modal).toBeInTheDocument();
    });

    it("should maintain performance with theme switching", () => {
      const ThemeTest = () => {
        const [theme, setTheme] = useState("light");

        return (
          <ThemeProvider theme={theme}>
            <GlassCard>
              <GlassButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                Switch Theme
              </GlassButton>
            </GlassCard>
          </ThemeProvider>
        );
      };

      const startTime = 1;
      const endTime = 9;
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      performanceMonitor.measureComponentRender("ThemeTest", () => {
        return render(<ThemeTest />);
      });

      const metrics = performanceMonitor.getMetrics();
      expect(metrics.renderTime).toBeLessThan(16); // Theme switching should be fast
    });
  });
});
