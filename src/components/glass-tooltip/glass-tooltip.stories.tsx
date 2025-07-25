import type { Meta, StoryObj } from "@storybook/react";
import { 
  Info, 
  HelpCircle, 
  AlertCircle, 
  Settings, 
  User, 
  Download,
  Copy,
  Share2,
  Edit,
  Trash2
} from "lucide-react";
import { GlassTooltip } from "./glass-tooltip";

const meta = {
  title: "Components/GlassTooltip",
  component: GlassTooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The GlassTooltip component displays helpful information on hover with glassmorphic styling. It automatically 
positions itself to stay within the viewport and includes a directional arrow.

## Features
- **Smart positioning**: Automatically adjusts to stay within viewport
- **Four positions**: Top, bottom, left, and right placement
- **Configurable delay**: Set hover delay before showing
- **Portal rendering**: Renders in document body to avoid z-index issues
- **Smooth animations**: Fade and zoom animations
- **Arrow indicator**: Points to the trigger element
- **Disable option**: Can be disabled when needed
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    content: {
      description: "Content to display in the tooltip",
      control: { type: "text" },
    },
    position: {
      description: "Position of the tooltip relative to the trigger",
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    delay: {
      description: "Delay in milliseconds before showing tooltip",
      control: { type: "range", min: 0, max: 2000, step: 100 },
    },
    disabled: {
      description: "Disable the tooltip",
      control: { type: "boolean" },
    },
    className: {
      description: "Additional CSS classes for the tooltip",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    content: "This is a helpful tooltip",
    position: "top",
    delay: 500,
  },
  render: (args) => (
    <GlassTooltip {...args}>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Hover me
      </button>
    </GlassTooltip>
  ),
};

// Different positions
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16">
      <GlassTooltip content="Tooltip on top" position="top">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Top
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Tooltip on bottom" position="bottom">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Bottom
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Tooltip on left" position="left">
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
          Left
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Tooltip on right" position="right">
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Right
        </button>
      </GlassTooltip>
    </div>
  ),
};

// Different delays
export const Delays: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip content="Instant (0ms delay)" delay={0}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Instant
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Quick (200ms delay)" delay={200}>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Quick
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Default (500ms delay)" delay={500}>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
          Default
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Slow (1000ms delay)" delay={1000}>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Slow
        </button>
      </GlassTooltip>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip content="Get help">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <HelpCircle className="w-5 h-5" />
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="More information">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Info className="w-5 h-5" />
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Warning: This action cannot be undone">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Settings">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Settings className="w-5 h-5" />
        </button>
      </GlassTooltip>
    </div>
  ),
};

// Rich content
export const RichContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip
        content={
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
            <p className="text-xs text-gray-500 mt-1">Last active: 2 hours ago</p>
          </div>
        }
      >
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
          <User className="w-4 h-4" />
          <span>User Profile</span>
        </button>
      </GlassTooltip>
      
      <GlassTooltip
        content={
          <div className="space-y-2">
            <p className="font-semibold">Keyboard Shortcuts</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between gap-4">
                <span>Copy</span>
                <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">⌘C</kbd>
              </div>
              <div className="flex justify-between gap-4">
                <span>Paste</span>
                <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">⌘V</kbd>
              </div>
              <div className="flex justify-between gap-4">
                <span>Undo</span>
                <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">⌘Z</kbd>
              </div>
            </div>
          </div>
        }
      >
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Show Shortcuts
        </button>
      </GlassTooltip>
    </div>
  ),
};

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip content="This tooltip is enabled" disabled={false}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Enabled Tooltip
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="This tooltip won't show" disabled={true}>
        <button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
          Disabled Tooltip
        </button>
      </GlassTooltip>
    </div>
  ),
};

// Action buttons with tooltips
export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <GlassTooltip content="Download file" position="top">
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Download className="w-4 h-4" />
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Copy to clipboard" position="top">
        <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
          <Copy className="w-4 h-4" />
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Share" position="top">
        <button className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          <Share2 className="w-4 h-4" />
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Edit" position="top">
        <button className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          <Edit className="w-4 h-4" />
        </button>
      </GlassTooltip>
      
      <GlassTooltip content="Delete (This action cannot be undone)" position="top">
        <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
          <Trash2 className="w-4 h-4" />
        </button>
      </GlassTooltip>
    </div>
  ),
};

// Form field tooltips
export const FormFieldTooltips: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-1">
          Username
          <GlassTooltip content="Your username must be unique and contain only letters, numbers, and underscores">
            <Info className="w-4 h-4 text-gray-400" />
          </GlassTooltip>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter username"
        />
      </div>
      
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-1">
          Password
          <GlassTooltip 
            content={
              <div>
                <p className="font-semibold mb-1">Password requirements:</p>
                <ul className="text-xs space-y-1">
                  <li>• At least 8 characters</li>
                  <li>• One uppercase letter</li>
                  <li>• One number</li>
                  <li>• One special character</li>
                </ul>
              </div>
            }
          >
            <Info className="w-4 h-4 text-gray-400" />
          </GlassTooltip>
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
        />
      </div>
    </form>
  ),
};

// Edge positioning (viewport awareness demo)
export const ViewportAwareness: Story = {
  render: () => (
    <div className="relative h-96 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="absolute top-2 left-2">
        <GlassTooltip content="This tooltip adjusts its position to stay within viewport" position="left">
          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Top Left</button>
        </GlassTooltip>
      </div>
      
      <div className="absolute top-2 right-2">
        <GlassTooltip content="This tooltip adjusts its position to stay within viewport" position="right">
          <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">Top Right</button>
        </GlassTooltip>
      </div>
      
      <div className="absolute bottom-2 left-2">
        <GlassTooltip content="This tooltip adjusts its position to stay within viewport" position="left">
          <button className="px-3 py-1 bg-purple-500 text-white rounded text-sm">Bottom Left</button>
        </GlassTooltip>
      </div>
      
      <div className="absolute bottom-2 right-2">
        <GlassTooltip content="This tooltip adjusts its position to stay within viewport" position="right">
          <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">Bottom Right</button>
        </GlassTooltip>
      </div>
    </div>
  ),
};

// Long content
export const LongContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip 
        content="This is a very long tooltip that contains a lot of text to demonstrate how the component handles content wrapping and maximum width constraints. The tooltip should wrap text nicely and maintain readability."
      >
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Long Tooltip
        </button>
      </GlassTooltip>
      
      <GlassTooltip 
        content={
          <div>
            <h4 className="font-semibold mb-2">API Documentation</h4>
            <p className="text-xs mb-2">
              The GlassTooltip component provides contextual information on hover.
            </p>
            <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
              {`<GlassTooltip content="..." position="top">`}
            </code>
          </div>
        }
      >
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
          Code Example
        </button>
      </GlassTooltip>
    </div>
  ),
};

// Theme variations
export const ThemeVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-lg">
        <h3 className="font-semibold mb-4">Light Theme</h3>
        <div className="flex gap-4">
          <GlassTooltip content="Tooltip in light theme">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Hover me
            </button>
          </GlassTooltip>
        </div>
      </div>
      
      <div className="p-6 bg-gray-900 rounded-lg">
        <h3 className="font-semibold text-white mb-4">Dark Theme</h3>
        <div className="flex gap-4">
          <GlassTooltip content="Tooltip in dark theme">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Hover me
            </button>
          </GlassTooltip>
        </div>
      </div>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip 
        content="Custom styled tooltip"
        className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white !border-purple-600"
      >
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
          Gradient Tooltip
        </button>
      </GlassTooltip>
      
      <GlassTooltip 
        content="Large tooltip with custom padding"
        className="!px-6 !py-4 !text-lg"
      >
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Large Tooltip
        </button>
      </GlassTooltip>
      
      <GlassTooltip 
        content="Rounded tooltip"
        className="!rounded-full !px-4"
      >
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Rounded Tooltip
        </button>
      </GlassTooltip>
    </div>
  ),
};

// Interactive elements
export const InteractiveElements: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <GlassTooltip content="Click to toggle">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span>Checkbox with tooltip</span>
          </label>
        </GlassTooltip>
      </div>
      
      <div className="flex gap-4">
        <GlassTooltip content="Select an option">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </GlassTooltip>
      </div>
      
      <div className="flex gap-4">
        <GlassTooltip content="Adjust the value">
          <input type="range" className="w-32" />
        </GlassTooltip>
      </div>
    </div>
  ),
};