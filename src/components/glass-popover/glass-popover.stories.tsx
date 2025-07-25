import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Settings, User, HelpCircle, ChevronDown, MoreVertical } from "lucide-react";
import { GlassPopover } from "./glass-popover";

const meta = {
  title: "Components/GlassPopover",
  component: GlassPopover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The GlassPopover component provides a floating panel that appears near a trigger element. It supports multiple 
positioning options, automatic viewport adjustment, and can be controlled or uncontrolled.

## Features
- **Flexible positioning**: top, bottom, left, right with start/center/end alignment
- **Viewport awareness**: Automatically adjusts position to stay within viewport
- **Controlled/Uncontrolled**: Can be used with or without external state management
- **Portal rendering**: Renders in a portal to avoid z-index issues
- **Keyboard accessible**: Escape key to close, proper ARIA attributes
- **Click outside detection**: Optional close on click outside
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      description: "The element that triggers the popover",
      control: { type: "text" },
    },
    content: {
      description: "The content to display in the popover",
      control: { type: "text" },
    },
    position: {
      description: "Position of the popover relative to the trigger",
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    align: {
      description: "Alignment of the popover relative to the trigger",
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    open: {
      description: "Controlled open state",
      control: { type: "boolean" },
    },
    onOpenChange: {
      description: "Callback when open state changes",
      action: "openChanged",
    },
    closeOnClickOutside: {
      description: "Close when clicking outside the popover",
      control: { type: "boolean" },
    },
    closeOnEscape: {
      description: "Close when pressing Escape key",
      control: { type: "boolean" },
    },
    className: {
      description: "Additional CSS classes for the trigger",
      control: { type: "text" },
    },
    contentClassName: {
      description: "Additional CSS classes for the content",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    trigger: "Click me",
    content: "This is a popover content!",
    position: "bottom",
    align: "center",
  },
};

// Position variations
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16 p-20">
      <div className="text-center">
        <GlassPopover
          trigger={<button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Top</button>}
          content="Popover positioned at the top"
          position="top"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={<button className="px-4 py-2 bg-green-500 text-white rounded-lg">Bottom</button>}
          content="Popover positioned at the bottom"
          position="bottom"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={<button className="px-4 py-2 bg-purple-500 text-white rounded-lg">Left</button>}
          content="Popover positioned to the left"
          position="left"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={<button className="px-4 py-2 bg-orange-500 text-white rounded-lg">Right</button>}
          content="Popover positioned to the right"
          position="right"
        />
      </div>
    </div>
  ),
};

// Alignment variations
export const Alignments: Story = {
  render: () => (
    <div className="flex gap-8 p-8">
      <GlassPopover
        trigger={
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Start Aligned
          </button>
        }
        content={
          <div className="w-48">
            <p>This popover is aligned to the start of the trigger</p>
          </div>
        }
        position="bottom"
        align="start"
      />
      <GlassPopover
        trigger={
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Center Aligned
          </button>
        }
        content={
          <div className="w-48">
            <p>This popover is centered with the trigger</p>
          </div>
        }
        position="bottom"
        align="center"
      />
      <GlassPopover
        trigger={
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
            End Aligned
          </button>
        }
        content={
          <div className="w-48">
            <p>This popover is aligned to the end of the trigger</p>
          </div>
        }
        position="bottom"
        align="end"
      />
    </div>
  ),
};

// Rich content example
export const RichContent: Story = {
  args: {
    trigger: (
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
        <User className="w-4 h-4" />
        <span>Account</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    ),
    content: (
      <div className="w-64">
        <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">john.doe@example.com</p>
          </div>
        </div>
        <div className="p-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left text-red-600">
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    ),
  },
};

// Controlled example
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4 text-center">
        <div className="space-x-4">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Open Popover
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close Popover
          </button>
        </div>
        <GlassPopover
          trigger={
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Controlled Popover
            </button>
          }
          content={
            <div className="p-4">
              <p>This popover is controlled externally.</p>
              <p className="text-sm text-gray-500 mt-2">
                Current state: {open ? "Open" : "Closed"}
              </p>
            </div>
          }
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};

// Interactive form example
export const InteractiveForm: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [notifications, setNotifications] = useState(true);

    return (
      <GlassPopover
        trigger={
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
            <Settings className="w-4 h-4" />
            <span>Quick Settings</span>
          </button>
        }
        content={
          <div className="w-80 p-4">
            <h3 className="font-semibold mb-4">Quick Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Email Notifications</label>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Save Changes
              </button>
            </div>
          </div>
        }
        closeOnClickOutside={false}
      />
    );
  },
};

// Multiple popovers
export const MultiplePopovers: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassPopover
        trigger={
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <MoreVertical className="w-5 h-5" />
          </button>
        }
        content={
          <div className="p-2 min-w-[150px]">
            <button className="w-full px-3 py-2 text-left rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Edit
            </button>
            <button className="w-full px-3 py-2 text-left rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Duplicate
            </button>
            <button className="w-full px-3 py-2 text-left rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600">
              Delete
            </button>
          </div>
        }
      />
      <GlassPopover
        trigger={
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <HelpCircle className="w-5 h-5" />
          </button>
        }
        content={
          <div className="p-4 max-w-xs">
            <h4 className="font-semibold mb-2">Help</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click on any element to see more options. Use keyboard shortcuts for faster navigation.
            </p>
          </div>
        }
      />
    </div>
  ),
};

// Edge positioning (viewport awareness demo)
export const ViewportAwareness: Story = {
  render: () => (
    <div className="relative h-96 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
      <div className="absolute top-4 left-4">
        <GlassPopover
          trigger={<button className="px-3 py-1 bg-blue-500 text-white rounded">Top Left</button>}
          content={<div className="p-4">This popover adjusts to stay within viewport</div>}
        />
      </div>
      <div className="absolute top-4 right-4">
        <GlassPopover
          trigger={<button className="px-3 py-1 bg-green-500 text-white rounded">Top Right</button>}
          content={<div className="p-4">This popover adjusts to stay within viewport</div>}
        />
      </div>
      <div className="absolute bottom-4 left-4">
        <GlassPopover
          trigger={<button className="px-3 py-1 bg-purple-500 text-white rounded">Bottom Left</button>}
          content={<div className="p-4">This popover adjusts to stay within viewport</div>}
        />
      </div>
      <div className="absolute bottom-4 right-4">
        <GlassPopover
          trigger={<button className="px-3 py-1 bg-orange-500 text-white rounded">Bottom Right</button>}
          content={<div className="p-4">This popover adjusts to stay within viewport</div>}
        />
      </div>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold">
        Custom Styled
      </button>
    ),
    content: (
      <div>
        <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
          Custom Popover
        </h3>
        <p className="text-sm">This popover has custom styling applied.</p>
      </div>
    ),
    contentClassName: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800",
  },
};

// Nested popovers
export const NestedPopovers: Story = {
  render: () => (
    <GlassPopover
      trigger={
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Parent Popover
        </button>
      }
      content={
        <div className="p-4">
          <p className="mb-4">This is the parent popover</p>
          <GlassPopover
            trigger={
              <button className="px-3 py-1 bg-green-500 text-white rounded">
                Child Popover
              </button>
            }
            content={
              <div className="p-4">
                <p>This is a nested popover!</p>
              </div>
            }
            position="right"
          />
        </div>
      }
      closeOnClickOutside={false}
    />
  ),
};

// Loading state example
export const LoadingContent: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <GlassPopover
        trigger={
          <button
            onClick={handleOpen}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Load Content
          </button>
        }
        content={
          <div className="p-4 w-64">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            ) : (
              <div>
                <h3 className="font-semibold mb-2">Content Loaded!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This content was loaded asynchronously.
                </p>
              </div>
            )}
          </div>
        }
      />
    );
  },
};