import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MoreVertical,
  Settings,
  User,
} from "lucide-react";
import { GlassPopover } from "./glass-popover";

const meta: Meta<typeof GlassPopover> = {
  title: "Components/Overlays/GlassPopover",
  component: GlassPopover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GlassPopover>;

export const Default: Story = {
  args: {
    trigger: "Click me",
    content: "This is a popover content!",
    position: "bottom",
    align: "center",
  },
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16 p-20">
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Top
            </button>
          }
          content="Popover positioned at the top"
          position="top"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-green-500 px-4 py-2 text-white"
            >
              Bottom
            </button>
          }
          content="Popover positioned at the bottom"
          position="bottom"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-purple-500 px-4 py-2 text-white"
            >
              Left
            </button>
          }
          content="Popover positioned to the left"
          position="left"
        />
      </div>
      <div className="text-center">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-orange-500 px-4 py-2 text-white"
            >
              Right
            </button>
          }
          content="Popover positioned to the right"
          position="right"
        />
      </div>
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-8 p-8">
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
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
          <button
            type="button"
            className="rounded-lg bg-green-500 px-4 py-2 text-white"
          >
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
          <button
            type="button"
            className="rounded-lg bg-purple-500 px-4 py-2 text-white"
          >
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

export const RichContent: Story = {
  args: {
    trigger: (
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <User className="h-4 w-4" />
        <span>Account</span>
        <ChevronDown className="h-4 w-4" />
      </button>
    ),
    content: (
      <div className="w-64">
        <div className="flex items-center gap-3 border-gray-200 border-b p-3 dark:border-gray-700">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-500 text-sm">john.doe@example.com</p>
          </div>
        </div>
        <div className="p-2">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </button>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4 text-center">
        <div className="space-x-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Open Popover
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Close Popover
          </button>
        </div>
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Controlled Popover
            </button>
          }
          content={
            <div className="p-4">
              <p>This popover is controlled externally.</p>
              <p className="mt-2 text-gray-500 text-sm">
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

export const InteractiveForm: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [notifications, setNotifications] = useState(true);
    return (
      <GlassPopover
        trigger={
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            <Settings className="h-4 w-4" />
            <span>Quick Settings</span>
          </button>
        }
        content={
          <div className="w-80 p-4">
            <h3 className="mb-4 font-semibold">Quick Settings</h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email-settings"
                  className="mb-1 block font-medium text-sm"
                >
                  Email
                </label>
                <input
                  id="email-settings"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium text-sm">
                  Email Notifications
                </label>
                <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
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

export const MultiplePopovers: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        }
        content={
          <div className="min-w-[150px] p-2">
            <button
              type="button"
              className="w-full rounded px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Edit
            </button>
            <button
              type="button"
              className="w-full rounded px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Duplicate
            </button>
            <button
              type="button"
              className="w-full rounded px-3 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Delete
            </button>
          </div>
        }
      />
      <GlassPopover
        trigger={
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        }
        content={
          <div className="max-w-xs p-4">
            <h4 className="mb-2 font-semibold">Help</h4>
            <p className="text-gray-600 text-sm dark:text-gray-400">
              Click on any element to see more options. Use keyboard shortcuts
              for faster navigation.
            </p>
          </div>
        }
      />
    </div>
  ),
};

export const ViewportAwareness: Story = {
  render: () => (
    <div className="relative h-96 rounded-lg border-2 border-gray-300 border-dashed dark:border-gray-700">
      <div className="absolute top-4 left-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
            >
              Top Left
            </button>
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
      <div className="absolute top-4 right-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-green-500 px-3 py-1 text-sm text-white"
            >
              Top Right
            </button>
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
      <div className="absolute bottom-4 left-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-purple-500 px-3 py-1 text-sm text-white"
            >
              Bottom Left
            </button>
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
      <div className="absolute right-4 bottom-4">
        <GlassPopover
          trigger={
            <button
              type="button"
              className="rounded bg-orange-500 px-3 py-1 text-sm text-white"
            >
              Bottom Right
            </button>
          }
          content={
            <div className="p-4">
              This popover adjusts to stay within viewport
            </div>
          }
        />
      </div>
    </div>
  ),
};
