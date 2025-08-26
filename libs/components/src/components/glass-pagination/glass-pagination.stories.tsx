import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { GlassPagination } from "./glass-pagination";

const meta = {
  title: "Components/Navigation/GlassPagination",
  component: GlassPagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A premium pagination component with advanced glassmorphism effects and fluid animations.

## Features

- **Multiple Variants**: Default, solid, and ghost styles
- **Flexible Sizing**: Small to large sizes with responsive scaling
- **Smart Ellipsis**: Intelligent page number grouping with ellipsis
- **Accessibility**: Full keyboard navigation and ARIA support
- **Customizable**: Configurable boundary and sibling counts
- **Glass Effects**: Consistent glassmorphism design with backdrop blur
- **Interactive**: Smooth hover effects and page transitions

## Usage

\`\`\`tsx
import { GlassPagination } from '@/components/glass-pagination';

// Basic usage
<GlassPagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log('Page:', page)} />

// With custom configuration
<GlassPagination
  currentPage={5}
  totalPages={20}
  onPageChange={handlePageChange}
  siblingCount={2}
  boundaryCount={2}
  showFirstLast={true}
  variant="solid"
  size="lg" />
\`\`\`

## Keyboard Shortcuts

- **Tab**: Navigate between pagination buttons
- **Space/Enter**: Activate current page button
- **Arrow Keys**: Navigate through pages

## Accessibility

The pagination component follows WAI-ARIA guidelines:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Current page indication
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Core Props
    currentPage: {
      control: { type: "number", min: 1, max: 100, step: 1 },
      description: "Currently active page number",
      table: {
        type: { summary: "number" },
        category: "Core",
      },
    },
    totalPages: {
      control: { type: "number", min: 1, max: 100, step: 1 },
      description: "Total number of pages",
      table: {
        type: { summary: "number" },
        category: "Core",
      },
    },
    onPageChange: {
      action: "page changed",
      description: "Callback fired when page changes",
      table: {
        type: { summary: "(page: number) => void" },
        category: "Core",
      },
    },

    // Appearance
    variant: {
      control: "select",
      options: ["default", "solid", "ghost"],
      description: "Visual style variant of the pagination",
      table: {
        type: { summary: "default | solid | ghost" },
        defaultValue: { summary: "default" },
        category: "Appearance",
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the pagination component",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
        category: "Appearance",
      },
    },

    // Configuration
    showFirstLast: {
      control: "boolean",
      description: "Show first/last page buttons for large page counts",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Configuration",
      },
    },
    showPrevNext: {
      control: "boolean",
      description: "Show previous/next navigation buttons",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Configuration",
      },
    },
    showEllipsis: {
      control: "boolean",
      description: "Show ellipsis for page number gaps",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Configuration",
      },
    },
    siblingCount: {
      control: { type: "number", min: 0, max: 5, step: 1 },
      description: "Number of sibling pages around current page",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
        category: "Configuration",
      },
    },
    boundaryCount: {
      control: { type: "number", min: 1, max: 3, step: 1 },
      description: "Number of pages at start and end",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
        category: "Configuration",
      },
    },

    // State
    disabled: {
      control: "boolean",
      description: "Whether the pagination is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },

    // HTML Props
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
        category: "HTML Props",
      },
    },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    variant: "default",
    size: "md",
    showFirstLast: true,
    showPrevNext: true,
    showEllipsis: true,
    siblingCount: 1,
    boundaryCount: 1,
    disabled: false,
  },
} satisfies Meta<typeof GlassPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <GlassPagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
};

// Variants showcase
export const Variants: Story = {
  render: () => {
    const [page1, setPage1] = useState(3);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(3);

    return (
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Default Variant
          </h3>
          <GlassPagination
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
            variant="default"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Solid Variant
          </h3>
          <GlassPagination
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
            variant="solid"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Ghost Variant
          </h3>
          <GlassPagination
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
            variant="ghost"
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value: "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Sizes showcase
export const Sizes: Story = {
  render: () => {
    const [page1, setPage1] = useState(2);
    const [page2, setPage2] = useState(2);
    const [page3, setPage3] = useState(2);

    return (
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Small Size
          </h3>
          <GlassPagination
            currentPage={page1}
            totalPages={8}
            onPageChange={setPage1}
            size="sm"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Medium Size
          </h3>
          <GlassPagination
            currentPage={page2}
            totalPages={8}
            onPageChange={setPage2}
            size="md"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Large Size
          </h3>
          <GlassPagination
            currentPage={page3}
            totalPages={8}
            onPageChange={setPage3}
            size="lg"
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value: "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// States showcase
export const States: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(10);
    const [page4, setPage4] = useState(5);

    return (
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            First Page
          </h3>
          <GlassPagination
            currentPage={page1}
            totalPages={10}
            onPageChange={setPage1}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Middle Page
          </h3>
          <GlassPagination
            currentPage={page2}
            totalPages={10}
            onPageChange={setPage2}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Last Page
          </h3>
          <GlassPagination
            currentPage={page3}
            totalPages={10}
            onPageChange={setPage3}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Disabled State
          </h3>
          <GlassPagination
            currentPage={page4}
            totalPages={10}
            onPageChange={setPage4}
            disabled
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value: "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Configuration examples
export const ConfigurationExamples: Story = {
  render: () => {
    const [page1, setPage1] = useState(10);
    const [page2, setPage2] = useState(15);
    const [page3, setPage3] = useState(25);

    return (
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Compact Mode (No First/Last)
          </h3>
          <GlassPagination
            currentPage={page1}
            totalPages={20}
            onPageChange={setPage1}
            showFirstLast={false}
            siblingCount={1}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Extended Siblings (siblingCount: 2)
          </h3>
          <GlassPagination
            currentPage={page2}
            totalPages={30}
            onPageChange={setPage2}
            siblingCount={2}
            boundaryCount={2}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            No Ellipsis Mode
          </h3>
          <GlassPagination
            currentPage={page3}
            totalPages={50}
            onPageChange={setPage3}
            showEllipsis={false}
            siblingCount={3}
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value: "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const [searchPage, setSearchPage] = useState(3);
    const [tablePage, setTablePage] = useState(12);
    const [galleryPage, setGalleryPage] = useState(7);

    return (
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Search Results Pagination
          </h3>
          <div className="rounded-xl border border-liquid-highlight/10 bg-liquid-bg/5 p-6 backdrop-blur-sm">
            <div className="mb-4 text-sm text-liquid-text-inverse/60">
              Showing results 21-30 of 100 total results
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-liquid-highlight/10 bg-liquid-bg/5 p-3"
                >
                  <div className="font-medium text-liquid-text-inverse/90">
                    Result {21 + i}
                  </div>
                  <div className="text-sm text-liquid-text-inverse/60">
                    Search result description...
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <GlassPagination
                currentPage={searchPage}
                totalPages={10}
                onPageChange={setSearchPage}
                size="sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Data Table Pagination
          </h3>
          <div className="rounded-xl border border-liquid-highlight/10 bg-liquid-bg/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-liquid-text-inverse/60">
                Showing 111-120 of 500 items
              </div>
              <div className="text-sm text-liquid-text-inverse/60">
                Page {tablePage} of 50
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-liquid-highlight/10">
              <table className="w-full">
                <thead className="bg-liquid-bg/5">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-sm text-liquid-text-inverse/80">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-sm text-liquid-text-inverse/80">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-sm text-liquid-text-inverse/80">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }, (_, i) => (
                    <tr key={i} className="border-liquid-highlight/5 border-t">
                      <td className="px-4 py-3 text-sm text-liquid-text-inverse/90">
                        Item {111 + i}
                      </td>
                      <td className="px-4 py-3 text-liquid-accent text-sm">
                        Active
                      </td>
                      <td className="px-4 py-3 text-sm text-liquid-text-inverse/60">
                        2024-01-15
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <GlassPagination
                currentPage={tablePage}
                totalPages={50}
                onPageChange={setTablePage}
                siblingCount={2}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Image Gallery Pagination
          </h3>
          <div className="rounded-xl border border-liquid-highlight/10 bg-liquid-bg/5 p-6 backdrop-blur-sm">
            <div className="mb-4 grid grid-cols-4 gap-4">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border border-liquid-highlight/10 bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                />
              ))}
            </div>
            <div className="flex justify-center">
              <GlassPagination
                currentPage={galleryPage}
                totalPages={25}
                onPageChange={setGalleryPage}
                variant="solid"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value: "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-liquid-accent bg-liquid-accent p-4 dark:border-liquid-accent dark:bg-liquid-accent/20">
          <h4 className="mb-2 font-medium text-liquid-accent dark:text-liquid-accent">
            Accessibility Features
          </h4>
          <ul className="space-y-1 text-liquid-accent text-sm dark:text-liquid-accent">
            <li>• Full keyboard navigation support</li>
            <li>• ARIA labels for screen readers</li>
            <li>• Current page indication</li>
            <li>• Proper focus management</li>
            <li>• Disabled state handling</li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
            Try navigating with Tab, Space, and Enter keys:
          </p>
          <GlassPagination
            currentPage={currentPage}
            totalPages={20}
            onPageChange={setCurrentPage}
            siblingCount={2}
            boundaryCount={2}
          />
        </div>

        <div className="rounded-lg border border-liquid-grey bg-liquid-bg p-4 dark:border-liquid-grey dark:bg-liquid-bg">
          <h4 className="mb-2 font-medium text-liquid-secondary dark:text-liquid-grey">
            Screen Reader Announcements
          </h4>
          <div className="space-y-2 text-liquid-secondary text-sm dark:text-liquid-grey">
            <p>Current page: "Page {currentPage}, current page"</p>
            <p>Navigation: "Go to page X" or "Go to previous/next page"</p>
            <p>Disabled states: Properly excluded from tab order</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: {
      default: "glass-light",
      values: [
        {
          name: "glass-light",
          value: "radial-gradient(80rem 60rem at 20% 20%, rgba(162, 210, 255, 0.3), transparent 60%), radial-gradient(80rem 60rem at 80% 30%, rgba(255, 183, 248, 0.28), transparent 60%), linear-gradient(135deg, #c9e7ff 0%, #d9d0ff 45%, #ffc9dc 100%)",
        },
      ],
    },
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => {
    const [page1, setPage1] = useState(3);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(3);

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Ocean Theme
          </h3>
          <div className="rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-500 p-8">
            <GlassPagination
              currentPage={page1}
              totalPages={15}
              onPageChange={setPage1}
              variant="default"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Sunset Theme
          </h3>
          <div className="rounded-xl bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 p-8">
            <GlassPagination
              currentPage={page2}
              totalPages={15}
              onPageChange={setPage2}
              variant="solid"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-liquid-text-inverse/80">
            Forest Theme
          </h3>
          <div className="rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 p-8">
            <GlassPagination
              currentPage={page3}
              totalPages={15}
              onPageChange={setPage3}
              variant="ghost"
            />
          </div>
        </div>
      </div>
    );
  },
};
