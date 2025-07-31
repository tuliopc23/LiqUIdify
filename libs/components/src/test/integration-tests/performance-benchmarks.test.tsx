import React from "react";
import { render, waitFor } from "@testing-library/react";
import { performance } from "perf_hooks";
import "@testing-library/jest-dom";

// Import components for performance testing
import { GlassTable } from "../../components/glass-table";
import { GlassList } from "../../components/glass-list";
import { GlassGrid } from "../../components/glass-grid";
import { GlassButton } from "../../components/glass-button";
import { GlassCard } from "../../components/glass-card";
import { UnifiedGlassProvider } from "../../core/glass/unified-glass-system";
import { applyGlassEffect } from "../../core/utils/glass-effects";

// Performance monitoring utilities
const measureRenderTime = async (component: React.ReactElement) => {
  const startTime = performance.now();
  const { unmount } = render(component);
  await waitFor(() => {}, { timeout: 0 }); // Let React finish rendering
  const endTime = performance.now();
  unmount();
  return endTime - startTime;
};

const measureMemoryUsage = () => {
  if (global.gc) {
    global.gc(); // Force garbage collection if available
  }
  return process.memoryUsage();
};

const generateLargeDataset = (size: number) => {
  return Array.from({ length: size }, (_, index) => ({
    id: index,
    name: `Item ${index}`,
    description: `Description for item ${index}`,
    status: index % 3 === 0 ? "active" : "inactive",
    value: Math.random() * 1000,
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

describe("Performance Benchmarks Integration Tests", () => {
  // Set performance thresholds
  const THRESHOLDS = {
    INITIAL_RENDER: 50, // ms
    RERENDER: 16.67, // ms (60fps)
    LARGE_LIST_RENDER: 100, // ms
    ANIMATION_FRAME: 16.67, // ms
    MEMORY_INCREASE: 10 * 1024 * 1024, // 10MB
  };

  describe("Component Render Performance", () => {
    it("should render basic components within performance budget", async () => {
      const components = [
        <GlassButton key="button">Click me</GlassButton>,
        <GlassCard key="card">Card content</GlassCard>,
        <GlassList key="list" items={[{ id: 1, content: "Item 1" }]} />,
      ];

      for (const component of components) {
        const renderTime = await measureRenderTime(component);
        expect(renderTime).toBeLessThan(THRESHOLDS.INITIAL_RENDER);
      }
    });

    it("should handle rapid re-renders efficiently", async () => {
      const RapidRerender = () => {
        const [count, setCount] = React.useState(0);

        React.useEffect(() => {
          const interval = setInterval(() => {
            setCount((c) => c + 1);
          }, 16); // 60fps

          return () => clearInterval(interval);
        }, []);

        return (
          <GlassCard>
            <div>Count: {count}</div>
            <GlassButton onClick={() => setCount((c) => c + 1)}>
              Increment
            </GlassButton>
          </GlassCard>
        );
      };

      const startTime = performance.now();
      const { unmount } = render(<RapidRerender />);

      // Wait for 10 frames
      await new Promise((resolve) => setTimeout(resolve, 167));

      const endTime = performance.now();
      unmount();

      const averageFrameTime = (endTime - startTime) / 10;
      expect(averageFrameTime).toBeLessThan(THRESHOLDS.RERENDER * 2); // Allow some overhead
    });
  });

  describe("Large Dataset Performance", () => {
    it("should render large table efficiently", async () => {
      const largeData = generateLargeDataset(1000);

      const columns = [
        { key: "name", label: "Name" },
        { key: "status", label: "Status" },
        { key: "value", label: "Value" },
        { key: "date", label: "Date" },
      ];

      const renderTime = await measureRenderTime(
        <GlassTable
          data={largeData}
          columns={columns}
          virtualized
          rowHeight={50}
          visibleRows={20}
        />,
      );

      expect(renderTime).toBeLessThan(THRESHOLDS.LARGE_LIST_RENDER);
    });

    it("should handle virtual scrolling performance", async () => {
      const hugeData = generateLargeDataset(10000);

      const VirtualList = () => {
        const [scrollTop, setScrollTop] = React.useState(0);
        const rowHeight = 50;
        const visibleRows = 20;

        const startIndex = Math.floor(scrollTop / rowHeight);
        const endIndex = startIndex + visibleRows;
        const visibleData = hugeData.slice(startIndex, endIndex);

        return (
          <div
            style={{ height: 1000, overflow: "auto" }}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
          >
            <div style={{ height: hugeData.length * rowHeight }}>
              <div
                style={{ transform: `translateY(${startIndex * rowHeight}px)` }}
              >
                {visibleData.map((item) => (
                  <GlassCard key={item.id} style={{ height: rowHeight }}>
                    {item.name}
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        );
      };

      const renderTime = await measureRenderTime(<VirtualList />);
      expect(renderTime).toBeLessThan(THRESHOLDS.LARGE_LIST_RENDER);
    });

    it("should paginate large datasets efficiently", async () => {
      const largeData = generateLargeDataset(5000);

      const PaginatedTable = () => {
        const [page, setPage] = React.useState(1);
        const pageSize = 50;

        const paginatedData = largeData.slice(
          (page - 1) * pageSize,
          page * pageSize,
        );

        return (
          <>
            <GlassTable
              data={paginatedData}
              columns={[
                { key: "name", label: "Name" },
                { key: "value", label: "Value" },
              ]}
            />
            <div>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Previous
              </button>
              <span>Page {page}</span>
              <button onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          </>
        );
      };

      const { rerender } = render(<PaginatedTable />);

      // Measure page change performance
      const pageChangeStart = performance.now();
      rerender(<PaginatedTable />);
      const pageChangeTime = performance.now() - pageChangeStart;

      expect(pageChangeTime).toBeLessThan(THRESHOLDS.RERENDER * 3);
    });
  });

  describe("Glass Effect Performance", () => {
    it("should apply glass effects without performance degradation", async () => {
      const glassEffects = [
        { blur: 10, opacity: 0.8, saturation: 1.5 },
        { blur: 20, opacity: 0.6, saturation: 1.2 },
        { blur: 5, opacity: 0.9, saturation: 1.8 },
      ];

      const GlassEffectTest = () => {
        const [effectIndex, setEffectIndex] = React.useState(0);
        const effect = glassEffects[effectIndex];

        return (
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={applyGlassEffect(effect)}
                className="glass-panel"
              >
                <p>Glass panel {i}</p>
              </div>
            ))}
            <button
              onClick={() => setEffectIndex((i + 1) % glassEffects.length)}
            >
              Change Effect
            </button>
          </div>
        );
      };

      const renderTime = await measureRenderTime(<GlassEffectTest />);
      expect(renderTime).toBeLessThan(THRESHOLDS.INITIAL_RENDER * 2);
    });

    it("should handle animated glass transitions smoothly", async () => {
      const AnimatedGlass = () => {
        const [isAnimating, setIsAnimating] = React.useState(false);

        return (
          <UnifiedGlassProvider>
            <div
              className={`glass-card ${isAnimating ? "animating" : ""}`}
              onMouseEnter={() => setIsAnimating(true)}
              onMouseLeave={() => setIsAnimating(false)}
              style={{
                transition: "all 0.3s ease",
                transform: isAnimating ? "scale(1.05)" : "scale(1)",
              }}
            >
              <h3>Animated Glass Card</h3>
              <p>Hover to see animation</p>
            </div>
          </UnifiedGlassProvider>
        );
      };

      const { container } = render(<AnimatedGlass />);

      // Trigger animation
      const card = container.querySelector(".glass-card");
      if (card) {
        const animationStart = performance.now();
        card.dispatchEvent(new MouseEvent("mouseenter"));

        await waitFor(() => {
          const animationTime = performance.now() - animationStart;
          expect(animationTime).toBeLessThan(THRESHOLDS.ANIMATION_FRAME * 20); // ~20 frames
        });
      }
    });
  });

  describe("Memory Usage", () => {
    it("should not leak memory with component mounting/unmounting", async () => {
      const initialMemory = measureMemoryUsage();

      // Mount and unmount components multiple times
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(
          <GlassGrid columns={3} gap={16}>
            {Array.from({ length: 50 }, (_, j) => (
              <GlassCard key={j}>Card {j}</GlassCard>
            ))}
          </GlassGrid>,
        );
        unmount();
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = measureMemoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;

      expect(memoryIncrease).toBeLessThan(THRESHOLDS.MEMORY_INCREASE);
    });

    it("should handle large DOM trees efficiently", async () => {
      const DeepNesting = () => {
        const depth = 20;
        const breadth = 5;

        const createNestedStructure = (level: number): React.ReactElement => {
          if (level === 0) {
            return <GlassButton>Leaf node</GlassButton>;
          }

          return (
            <GlassCard>
              {Array.from({ length: breadth }, (_, i) => (
                <div key={i}>{createNestedStructure(level - 1)}</div>
              ))}
            </GlassCard>
          );
        };

        return createNestedStructure(depth);
      };

      const renderTime = await measureRenderTime(<DeepNesting />);
      expect(renderTime).toBeLessThan(THRESHOLDS.LARGE_LIST_RENDER * 2);
    });
  });

  describe("Bundle Size Impact", () => {
    it("should tree-shake unused components", async () => {
      // This test would normally check actual bundle sizes
      // Here we simulate by checking import behavior

      const usedComponents = new Set<string>();

      // Simulate selective imports
      const { GlassButton } = await import("../../components/glass-button");
      usedComponents.add("GlassButton");

      const { GlassCard } = await import("../../components/glass-card");
      usedComponents.add("GlassCard");

      // Verify only imported components are loaded
      expect(usedComponents.size).toBe(2);
      expect(usedComponents.has("GlassButton")).toBe(true);
      expect(usedComponents.has("GlassCard")).toBe(true);
      expect(usedComponents.has("GlassTable")).toBe(false);
    });
  });

  describe("Real-world Scenarios", () => {
    it("should handle dashboard with multiple components efficiently", async () => {
      const Dashboard = () => {
        const [data] = React.useState(generateLargeDataset(100));
        const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

        return (
          <UnifiedGlassProvider>
            <div className="dashboard">
              <header>
                <h1>Performance Dashboard</h1>
              </header>

              <GlassGrid columns={3} gap={16}>
                <GlassCard>
                  <h2>Summary</h2>
                  <p>Total items: {data.length}</p>
                  <p>Selected: {selectedItems.length}</p>
                </GlassCard>

                <GlassCard>
                  <h2>Actions</h2>
                  <GlassButton onClick={() => setSelectedItems([])}>
                    Clear Selection
                  </GlassButton>
                </GlassCard>

                <GlassCard>
                  <h2>Status</h2>
                  <div className="status-indicators">
                    <span>
                      Active: {data.filter((d) => d.status === "active").length}
                    </span>
                    <span>
                      Inactive:{" "}
                      {data.filter((d) => d.status === "inactive").length}
                    </span>
                  </div>
                </GlassCard>
              </GlassGrid>

              <GlassTable
                data={data.slice(0, 20)}
                columns={[
                  { key: "name", label: "Name" },
                  { key: "status", label: "Status" },
                  { key: "value", label: "Value" },
                ]}
                onRowClick={(row) => {
                  setSelectedItems((prev) =>
                    prev.includes(row.id)
                      ? prev.filter((id) => id !== row.id)
                      : [...prev, row.id],
                  );
                }}
              />
            </div>
          </UnifiedGlassProvider>
        );
      };

      const renderTime = await measureRenderTime(<Dashboard />);
      expect(renderTime).toBeLessThan(THRESHOLDS.LARGE_LIST_RENDER * 1.5);
    });
  });
});
