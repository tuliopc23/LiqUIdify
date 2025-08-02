import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  AlertCircle,
  Copy,
  Download,
  Edit,
  HelpCircle,
  Info,
  Settings,
  Share2,
  Trash2,
  User,
} from "lucide-react";
import { GlassTooltip } from "./glass-tooltip";

const meta: Meta<typeof GlassTooltip> = {
  title: "Components/Feedback/GlassTooltip",
  component: GlassTooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GlassTooltip>;

export const Default: Story = {
  args: {
    content: "This is a helpful tooltip",
    position: "top",
    delay: 500,
  },
  render: (args) => (
    <GlassTooltip {...args}>
      <button
        type="button"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Hover me
      </button>
    </GlassTooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16">
      <GlassTooltip content="Tooltip on top" position="top">
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Top
        </button>
      </GlassTooltip>
      <GlassTooltip content="Tooltip on bottom" position="bottom">
        <button
          type="button"
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Bottom
        </button>
      </GlassTooltip>
      <GlassTooltip content="Tooltip on left" position="left">
        <button
          type="button"
          className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Left
        </button>
      </GlassTooltip>
      <GlassTooltip content="Tooltip on right" position="right">
        <button
          type="button"
          className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          Right
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const Delays: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip content="Instant (0ms delay)" delay={0}>
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Instant
        </button>
      </GlassTooltip>
      <GlassTooltip content="Quick (200ms delay)" delay={200}>
        <button
          type="button"
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Quick
        </button>
      </GlassTooltip>
      <GlassTooltip content="Default (500ms delay)" delay={500}>
        <button
          type="button"
          className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Default
        </button>
      </GlassTooltip>
      <GlassTooltip content="Slow (1000ms delay)" delay={1000}>
        <button
          type="button"
          className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          Slow
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip content="Get help">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="More information">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Info className="h-5 w-5" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Warning: This action cannot be undone">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Settings">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Settings className="h-5 w-5" />
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip
        content={
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-500 text-xs">john.doe@example.com</p>
            <p className="mt-1 text-gray-500 text-xs">
              Last active: 2 hours ago
            </p>
          </div>
        }
      >
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <User className="h-4 w-4" />
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
                <kbd className="rounded bg-gray-200 px-1 dark:bg-gray-700">
                  ⌘C
                </kbd>
              </div>
              <div className="flex justify-between gap-4">
                <span>Paste</span>
                <kbd className="rounded bg-gray-200 px-1 dark:bg-gray-700">
                  ⌘V
                </kbd>
              </div>
              <div className="flex justify-between gap-4">
                <span>Undo</span>
                <kbd className="rounded bg-gray-200 px-1 dark:bg-gray-700">
                  ⌘Z
                </kbd>
              </div>
            </div>
          </div>
        }
      >
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Show Shortcuts
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip content="This tooltip is enabled" disabled={false}>
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Enabled Tooltip
        </button>
      </GlassTooltip>
      <GlassTooltip content="This tooltip won't show" disabled>
        <button
          type="button"
          className="cursor-not-allowed rounded-lg bg-gray-400 px-4 py-2 text-white"
        >
          Disabled Tooltip
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <GlassTooltip content="Download file" position="top">
        <button
          type="button"
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          <Download className="h-4 w-4" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Copy to clipboard" position="top">
        <button
          type="button"
          className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
        >
          <Copy className="h-4 w-4" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Share" position="top">
        <button
          type="button"
          className="rounded bg-purple-500 p-2 text-white hover:bg-purple-600"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Edit" position="top">
        <button
          type="button"
          className="rounded bg-yellow-500 p-2 text-white hover:bg-yellow-600"
        >
          <Edit className="h-4 w-4" />
        </button>
      </GlassTooltip>
      <GlassTooltip
        content="Delete (This action cannot be undone)"
        position="top"
      >
        <button
          type="button"
          className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const ViewportAwareness: Story = {
  render: () => (
    <div className="relative h-96 overflow-hidden rounded-lg border-2 border-gray-300 border-dashed dark:border-gray-700">
      <div className="absolute top-2 left-2">
        <GlassTooltip
          content="This tooltip adjusts its position to stay within viewport"
          position="left"
        >
          <button
            type="button"
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
          >
            Top Left
          </button>
        </GlassTooltip>
      </div>
      <div className="absolute top-2 right-2">
        <GlassTooltip
          content="This tooltip adjusts its position to stay within viewport"
          position="right"
        >
          <button
            type="button"
            className="rounded bg-green-500 px-3 py-1 text-sm text-white"
          >
            Top Right
          </button>
        </GlassTooltip>
      </div>
      <div className="absolute bottom-2 left-2">
        <GlassTooltip
          content="This tooltip adjusts its position to stay within viewport"
          position="left"
        >
          <button
            type="button"
            className="rounded bg-purple-500 px-3 py-1 text-sm text-white"
          >
            Bottom Left
          </button>
        </GlassTooltip>
      </div>
      <div className="absolute right-2 bottom-2">
        <GlassTooltip
          content="This tooltip adjusts its position to stay within viewport"
          position="right"
        >
          <button
            type="button"
            className="rounded bg-orange-500 px-3 py-1 text-sm text-white"
          >
            Bottom Right
          </button>
        </GlassTooltip>
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip content="This is a very long tooltip that contains a lot of text to demonstrate how the component handles content wrapping and maximum width constraints. The tooltip should wrap text nicely and maintain readability.">
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Long Tooltip
        </button>
      </GlassTooltip>
      <GlassTooltip
        content={
          <div>
            <h4 className="mb-2 font-semibold">API Documentation</h4>
            <p className="mb-2 text-xs">
              The GlassTooltip component provides contextual information on
              hover.
            </p>
            <code className="block rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">{`<GlassTooltip content="..." position="top">`}</code>
          </div>
        }
      >
        <button
          type="button"
          className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Code Example
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const ThemeVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6">
        <h3 className="mb-4 font-semibold">Light Theme</h3>
        <div className="flex gap-4">
          <GlassTooltip content="Tooltip in light theme">
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Hover me
            </button>
          </GlassTooltip>
        </div>
      </div>
      <div className="rounded-lg bg-gray-900 p-6">
        <h3 className="mb-4 font-semibold text-white">Dark Theme</h3>
        <div className="flex gap-4">
          <GlassTooltip content="Tooltip in dark theme">
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Hover me
            </button>
          </GlassTooltip>
        </div>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassTooltip
        content="Custom styled tooltip"
        className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white !border-purple-600"
      >
        <button
          type="button"
          className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white"
        >
          Gradient Tooltip
        </button>
      </GlassTooltip>
      <GlassTooltip
        content="Large tooltip with custom padding"
        className="!px-6 !py-4 !text-lg"
      >
        <button
          type="button"
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Large Tooltip
        </button>
      </GlassTooltip>
      <GlassTooltip content="Rounded tooltip" className="!rounded-full !px-4">
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Rounded Tooltip
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const InteractiveElements: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <GlassTooltip content="Click to toggle">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span>Checkbox with tooltip</span>
          </label>
        </GlassTooltip>
      </div>
      <div className="flex gap-4">
        <GlassTooltip content="Select an option">
          <select className="rounded-lg border border-gray-300 px-3 py-2">
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
