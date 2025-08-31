import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidPagination } from "./liquid-pagination";

const meta: Meta<typeof LiquidPagination> = {
  title: "Data Display/LiquidPagination",
  component: LiquidPagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A pagination component with Apple HIG liquid glass design, supporting quick jumper, page size changer, and custom rendering.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minWidth: "800px",
          padding: "2rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LiquidPagination>;

export const Default: Story = {
  args: {
    current: 3,
    total: 200,
    pageSize: 10,
  },
};

export const WithPageSizeChanger: Story = {
  args: {
    current: 1,
    total: 500,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
};

export const WithQuickJumper: Story = {
  args: {
    current: 5,
    total: 1000,
    pageSize: 25,
    showQuickJumper: true,
  },
};

export const WithTotal: Story = {
  args: {
    current: 2,
    total: 85,
    pageSize: 10,
    showTotal: true,
  },
};

export const CustomTotal: Story = {
  args: {
    current: 4,
    total: 234,
    pageSize: 15,
    showTotal: (total, range) => (
      <span className="text-blue-200">
        Displaying {range[0]}-{range[1]} of {total} results
      </span>
    ),
  },
};

export const Simple: Story = {
  args: {
    current: 3,
    total: 150,
    pageSize: 10,
    simple: true,
  },
};

export const CompactSize: Story = {
  args: {
    current: 2,
    total: 100,
    pageSize: 10,
    size: "sm",
    variant: "compact",
  },
};

export const LargeSize: Story = {
  args: {
    current: 1,
    total: 300,
    pageSize: 20,
    size: "lg",
    variant: "card",
  },
};

export const ShowLessItems: Story = {
  args: {
    current: 10,
    total: 500,
    pageSize: 10,
    showLessItems: true,
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-medium mb-4">Left Aligned</h3>
        <LiquidPagination current={2} total={100} pageSize={10} align="left" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Center Aligned</h3>
        <LiquidPagination current={2} total={100} pageSize={10} align="center" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Right Aligned</h3>
        <LiquidPagination current={2} total={100} pageSize={10} align="right" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-medium mb-4">Default</h3>
        <LiquidPagination current={3} total={150} pageSize={10} />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Card</h3>
        <LiquidPagination current={3} total={150} pageSize={10} variant="card" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Minimal</h3>
        <LiquidPagination current={3} total={150} pageSize={10} variant="minimal" />
      </div>

      <div>
        <h3 className="text-white font-medium mb-4">Compact</h3>
        <LiquidPagination current={3} total={150} pageSize={10} variant="compact" />
      </div>
    </div>
  ),
};

export const SinglePage: Story = {
  args: {
    current: 1,
    total: 5,
    pageSize: 10,
    hideOnSinglePage: false,
  },
};

export const HiddenOnSinglePage: Story = {
  args: {
    current: 1,
    total: 5,
    pageSize: 10,
    hideOnSinglePage: true,
  },
};

export const Disabled: Story = {
  args: {
    current: 3,
    total: 200,
    pageSize: 10,
    disabled: true,
    showSizeChanger: true,
    showQuickJumper: true,
  },
};

export const FullFeatured: Story = {
  args: {
    current: 7,
    total: 847,
    pageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => (
      <div className="text-sm text-white/70">
        <div>
          Total: <strong className="text-white">{total}</strong> items
        </div>
        <div>
          Page:{" "}
          <strong className="text-white">
            {range[0]}-{range[1]}
          </strong>
        </div>
      </div>
    ),
    pageSizeOptions: [10, 20, 50, 100, 200],
    variant: "card",
  },
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(247);
    const [variant, setVariant] = useState<"default" | "card" | "minimal" | "compact">("default");
    const [size, setSize] = useState<"sm" | "md" | "lg">("md");
    const [showExtras, setShowExtras] = useState(true);

    const handleChange = (page: number, size?: number) => {
      setCurrent(page);
      if (size) setPageSize(size);
      console.log("Page changed:", page, size);
    };

    const handleShowSizeChange = (page: number, size: number) => {
      setCurrent(page);
      setPageSize(size);
      console.log("Page size changed:", page, size);
    };

    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (current - 1) * pageSize + 1;
    const endIndex = Math.min(current * pageSize, total);

    return (
      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-white/10 p-4 rounded-lg space-y-4">
          <h3 className="text-white font-medium">Pagination Controls</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Total Items:</label>
              <input
                type="number"
                value={total}
                onChange={(e) => {
                  const newTotal = Number(e.target.value);
                  setTotal(newTotal);
                  // Adjust current page if necessary
                  const newTotalPages = Math.ceil(newTotal / pageSize);
                  if (current > newTotalPages) {
                    setCurrent(Math.max(1, newTotalPages));
                  }
                }}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Page Size:</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  setPageSize(newSize);
                  // Adjust current page if necessary
                  const newTotalPages = Math.ceil(total / newSize);
                  if (current > newTotalPages) {
                    setCurrent(Math.max(1, newTotalPages));
                  }
                }}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Variant:</label>
              <div className="flex gap-1">
                {(["default", "card", "minimal", "compact"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-3 py-1 text-sm rounded transition-colors capitalize ${
                      variant === v
                        ? "bg-blue-500/30 text-blue-200"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Size:</label>
              <div className="flex gap-1">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1 text-sm rounded transition-colors capitalize ${
                      size === s
                        ? "bg-blue-500/30 text-blue-200"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={showExtras}
                onChange={(e) => setShowExtras(e.target.checked)}
                className="rounded border-white/20"
              />
              Show size changer and quick jumper
            </label>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white/10 p-3 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
            <div>
              <span className="text-white/90">Current:</span> Page {current} of {totalPages}
            </div>
            <div>
              <span className="text-white/90">Showing:</span> {startIndex}-{endIndex} of {total}
            </div>
            <div>
              <span className="text-white/90">Page Size:</span> {pageSize} items
            </div>
          </div>
        </div>

        {/* Pagination */}
        <LiquidPagination
          current={current}
          total={total}
          pageSize={pageSize}
          variant={variant}
          size={size}
          onChange={handleChange}
          onShowSizeChange={handleShowSizeChange}
          showSizeChanger={showExtras}
          showQuickJumper={showExtras}
          showTotal={(total, range) => (
            <div className="text-sm text-white/70">
              Showing{" "}
              <span className="text-white font-medium">
                {range[0]}-{range[1]}
              </span>{" "}
              of <span className="text-white font-medium">{total}</span> entries
            </div>
          )}
        />

        {/* Demonstration data */}
        <div className="bg-white/5 p-4 rounded-lg">
          <h4 className="text-white font-medium mb-3">Sample Data (Page {current})</h4>
          <div className="space-y-2">
            {Array.from({ length: Math.min(pageSize, total - startIndex + 1) }, (_, i) => {
              const itemIndex = startIndex + i;
              return (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between py-2 px-3 bg-white/5 rounded"
                >
                  <span className="text-white">Item {itemIndex}</span>
                  <span className="text-white/60 text-sm">Sample data item</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
};
