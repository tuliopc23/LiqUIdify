import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotificationCenter, type NotificationItem } from "./glass-notification";

const meta = {
  title: "Components/GlassNotification",
  component: NotificationCenter,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The GlassNotification component provides a complete notification center with support for different notification types, 
actions, and real-time updates. It includes features like mark as read, dismiss, and time-based formatting.

## Features
- **Multiple notification types**: success, error, warning, info, system
- **Real-time updates**: Automatic time formatting ("just now", "5m ago", etc.)
- **Interactive**: Mark as read, mark all as read, dismiss individual notifications
- **Actions**: Optional action buttons for each notification
- **Badge counter**: Shows unread notification count
- **Accessible**: Full keyboard navigation and screen reader support
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex justify-end p-8 min-h-[500px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    notifications: {
      description: "Array of notification items",
      control: { type: "object" },
    },
    onMarkAsRead: {
      description: "Callback when a notification is marked as read",
      action: "marked as read",
    },
    onMarkAllAsRead: {
      description: "Callback when all notifications are marked as read",
      action: "marked all as read",
    },
    onDismiss: {
      description: "Callback when a notification is dismissed",
      action: "dismissed",
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof NotificationCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample notifications data
const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome to GlassUI",
    message: "Thanks for trying out our notification system. Click to mark as read.",
    type: "success",
    timestamp: new Date(Date.now() - 60000), // 1 minute ago
    read: false,
    action: {
      label: "Get Started",
      onClick: () => console.log("Get started clicked"),
    },
  },
  {
    id: "2",
    title: "New Feature Available",
    message: "Check out our new dark mode theme. It looks amazing!",
    type: "info",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    read: false,
  },
  {
    id: "3",
    title: "System Update",
    message: "Your system will restart in 10 minutes to apply updates.",
    type: "warning",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    read: true,
    action: {
      label: "Postpone",
      onClick: () => console.log("Update postponed"),
    },
  },
  {
    id: "4",
    title: "Error Detected",
    message: "Failed to save your changes. Please try again.",
    type: "error",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: true,
    action: {
      label: "Retry",
      onClick: () => console.log("Retrying save"),
    },
  },
  {
    id: "5",
    title: "Team Invitation",
    message: "John Doe invited you to join the Design Team.",
    type: "system",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: false,
    action: {
      label: "Accept",
      onClick: () => console.log("Invitation accepted"),
    },
  },
];

// Default story
export const Default: Story = {
  args: {
    notifications: sampleNotifications,
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    notifications: [],
  },
};

// All read notifications
export const AllRead: Story = {
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: true })),
  },
};

// Only unread notifications
export const OnlyUnread: Story = {
  args: {
    notifications: sampleNotifications.filter((n) => !n.read),
  },
};

// Interactive example with state management
export const Interactive: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);

    const handleMarkAsRead = (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    };

    const handleMarkAllAsRead = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const handleDismiss = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const addNotification = (type: NotificationItem["type"]) => {
      const newNotification: NotificationItem = {
        id: Date.now().toString(),
        title: `New ${type} notification`,
        message: `This is a sample ${type} notification added at ${new Date().toLocaleTimeString()}`,
        type,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => addNotification("success")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Success
          </button>
          <button
            onClick={() => addNotification("error")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Add Error
          </button>
          <button
            onClick={() => addNotification("warning")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Add Warning
          </button>
          <button
            onClick={() => addNotification("info")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Info
          </button>
          <button
            onClick={() => addNotification("system")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Add System
          </button>
        </div>
        <div className="flex justify-end">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDismiss={handleDismiss}
          />
        </div>
      </div>
    );
  },
};

// Different notification types showcase
export const NotificationTypes: Story = {
  args: {
    notifications: [
      {
        id: "success",
        title: "Success Notification",
        message: "Your changes have been saved successfully.",
        type: "success",
        timestamp: new Date(),
        read: false,
      },
      {
        id: "error",
        title: "Error Notification",
        message: "An error occurred while processing your request.",
        type: "error",
        timestamp: new Date(),
        read: false,
      },
      {
        id: "warning",
        title: "Warning Notification",
        message: "Your session will expire in 5 minutes.",
        type: "warning",
        timestamp: new Date(),
        read: false,
      },
      {
        id: "info",
        title: "Info Notification",
        message: "New features are now available in your dashboard.",
        type: "info",
        timestamp: new Date(),
        read: false,
      },
      {
        id: "system",
        title: "System Notification",
        message: "Scheduled maintenance will begin at midnight.",
        type: "system",
        timestamp: new Date(),
        read: false,
      },
    ],
  },
};

// Long content handling
export const LongContent: Story = {
  args: {
    notifications: [
      {
        id: "1",
        title: "Very Long Notification Title That Should Be Truncated Properly",
        message:
          "This is an extremely long notification message that contains a lot of text to test how the component handles overflow and text truncation. The component should display this gracefully without breaking the layout.",
        type: "info",
        timestamp: new Date(),
        read: false,
        action: {
          label: "View Details",
          onClick: () => console.log("View details clicked"),
        },
      },
      {
        id: "2",
        title: "Another Long Title",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        type: "warning",
        timestamp: new Date(),
        read: false,
      },
    ],
  },
};

// Many notifications (scrolling test)
export const ManyNotifications: Story = {
  args: {
    notifications: Array.from({ length: 20 }, (_, i) => ({
      id: i.toString(),
      title: `Notification ${i + 1}`,
      message: `This is notification number ${i + 1} in a long list.`,
      type: ["success", "error", "warning", "info", "system"][
        i % 5
      ] as NotificationItem["type"],
      timestamp: new Date(Date.now() - i * 60000),
      read: i % 3 === 0,
    })),
  },
};

// Real-time simulation
export const RealTimeUpdates: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    // Simulate real-time notifications
    useState(() => {
      const interval = setInterval(() => {
        const types: NotificationItem["type"][] = ["success", "error", "warning", "info", "system"];
        const messages = [
          "New user signed up",
          "Payment received",
          "Server response slow",
          "Backup completed",
          "New message received",
        ];

        const newNotification: NotificationItem = {
          id: Date.now().toString(),
          title: messages[Math.floor(Math.random() * messages.length)],
          message: `Event occurred at ${new Date().toLocaleTimeString()}`,
          type: types[Math.floor(Math.random() * types.length)],
          timestamp: new Date(),
          read: false,
        };

        setNotifications((prev) => [newNotification, ...prev].slice(0, 10));
      }, 5000);

      return () => clearInterval(interval);
    });

    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          New notifications will appear every 5 seconds
        </p>
        <div className="flex justify-end">
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={(id) => {
              setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
              );
            }}
            onMarkAllAsRead={() => {
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            }}
            onDismiss={(id) => {
              setNotifications((prev) => prev.filter((n) => n.id !== id));
            }}
          />
        </div>
      </div>
    );
  },
};

// Theme variations
export const DarkTheme: Story = {
  args: {
    notifications: sampleNotifications,
  },
  decorators: [
    (Story) => (
      <div className="dark bg-gray-900 p-8 min-h-[500px] flex justify-end">
        <Story />
      </div>
    ),
  ],
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    notifications: sampleNotifications.slice(0, 3),
    className: "custom-notification-center",
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          .custom-notification-center {
            --glass-bg: rgba(59, 130, 246, 0.1);
            --glass-bg-elevated: rgba(59, 130, 246, 0.15);
            --glass-border: rgba(59, 130, 246, 0.3);
            --text-primary: #1e40af;
            --text-secondary: #3b82f6;
            --text-tertiary: #60a5fa;
          }
        `}</style>
        <div className="flex justify-end p-8">
          <Story />
        </div>
      </>
    ),
  ],
};