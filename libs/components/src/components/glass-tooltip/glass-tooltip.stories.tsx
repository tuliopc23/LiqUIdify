import type { Meta, StoryObj } from "@storybook/react";
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
        className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Top
        </button>
      </GlassTooltip>
      <GlassTooltip content="Tooltip on bottom" position="bottom">
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Bottom
        </button>
      </GlassTooltip>
      <GlassTooltip content="Tooltip on left" position="left">
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Left
        </button>
      </GlassTooltip>
      <GlassTooltip content="Tooltip on right" position="right">
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Instant
        </button>
      </GlassTooltip>
      <GlassTooltip content="Quick (200ms delay)" delay={200}>
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Quick
        </button>
      </GlassTooltip>
      <GlassTooltip content="Default (500ms delay)" delay={500}>
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Default
        </button>
      </GlassTooltip>
      <GlassTooltip content="Slow (1000ms delay)" delay={1000}>
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
          className="rounded-lg p-2 hover:bg-liquid-bg dark:hover:bg-liquid-bg"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="More information">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-liquid-bg dark:hover:bg-liquid-bg"
        >
          <Info className="h-5 w-5" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Warning: This action cannot be undone">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-liquid-bg dark:hover:bg-liquid-bg"
        >
          <AlertCircle className="h-5 w-5 text-liquid-accent" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Settings">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-liquid-bg dark:hover:bg-liquid-bg"
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
            <p className="text-liquid-secondary text-xs">john.doe@example.com</p>
            <p className="mt-1 text-liquid-secondary text-xs">
              Last active: 2 hours ago
            </p>
          </div>
        }
      >
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-liquid-bg px-4 py-2 hover:bg-liquid-bg dark:bg-liquid-bg dark:hover:bg-liquid-bg"
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
                <kbd className="rounded bg-liquid-bg px-1 dark:bg-liquid-bg">
                  ⌘C
                </kbd>
              </div>
              <div className="flex justify-between gap-4">
                <span>Paste</span>
                <kbd className="rounded bg-liquid-bg px-1 dark:bg-liquid-bg">
                  ⌘V
                </kbd>
              </div>
              <div className="flex justify-between gap-4">
                <span>Undo</span>
                <kbd className="rounded bg-liquid-bg px-1 dark:bg-liquid-bg">
                  ⌘Z
                </kbd>
              </div>
            </div>
          </div>
        }
      >
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Enabled Tooltip
        </button>
      </GlassTooltip>
      <GlassTooltip content="This tooltip won't show" disabled>
        <button
          type="button"
          className="cursor-not-allowed rounded-lg bg-liquid-bg px-4 py-2 text-liquid-text-inverse"
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
          className="rounded bg-liquid-accent p-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          <Download className="h-4 w-4" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Copy to clipboard" position="top">
        <button
          type="button"
          className="rounded bg-liquid-accent p-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          <Copy className="h-4 w-4" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Share" position="top">
        <button
          type="button"
          className="rounded bg-liquid-accent p-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </GlassTooltip>
      <GlassTooltip content="Edit" position="top">
        <button
          type="button"
          className="rounded bg-liquid-accent p-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
          className="rounded bg-liquid-accent p-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </GlassTooltip>
    </div>
  ),
};

export const ViewportAwareness: Story = {
  render: () => (
    <div className="relative h-96 overflow-hidden rounded-lg border-2 border-liquid-grey border-dashed dark:border-liquid-grey">
      <div className="absolute top-2 left-2">
        <GlassTooltip
          content="This tooltip adjusts its position to stay within viewport"
          position="left"
        >
          <button
            type="button"
            className="rounded bg-liquid-accent px-3 py-1 text-sm text-liquid-text-inverse"
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
            className="rounded bg-liquid-accent px-3 py-1 text-sm text-liquid-text-inverse"
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
            className="rounded bg-liquid-accent px-3 py-1 text-sm text-liquid-text-inverse"
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
            className="rounded bg-liquid-accent px-3 py-1 text-sm text-liquid-text-inverse"
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
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
            <code className="block rounded bg-liquid-bg p-2 text-xs dark:bg-liquid-bg">{`<GlassTooltip content="..." position="top">`}</code>
          </div>
        }
      >
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
      <div className="rounded-lg bg-liquid-bg p-6">
        <h3 className="mb-4 font-semibold">Light Theme</h3>
        <div className="flex gap-4">
          <GlassTooltip content="Tooltip in light theme">
            <button
              type="button"
              className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
            >
              Hover me
            </button>
          </GlassTooltip>
        </div>
      </div>
      <div className="rounded-lg bg-liquid-bg p-6">
        <h3 className="mb-4 font-semibold text-liquid-text-inverse">Dark Theme</h3>
        <div className="flex gap-4">
          <GlassTooltip content="Tooltip in dark theme">
            <button
              type="button"
              className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
        className="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-liquid-text-inverse !border-liquid-accent"
      >
        <button
          type="button"
          className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-liquid-text-inverse"
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
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Large Tooltip
        </button>
      </GlassTooltip>
      <GlassTooltip content="Rounded tooltip" className="!rounded-full !px-4">
        <button
          type="button"
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
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
          <select className="rounded-lg border border-liquid-grey px-3 py-2">
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
