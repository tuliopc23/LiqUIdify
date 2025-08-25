import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { GlassToast, ToastProvider, useToast } from "./glass-toast";

const meta = {
  title: "Components/GlassToast",
  component: GlassToast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The GlassToast component provides temporary notifications with glassmorphic styling. It includes both a standalone 
component and a complete toast system with ToastProvider and useToast hook for dynamic notifications.

## Features
- **Multiple types**: Success, error, warning, and info toasts
- **Toast Provider**: Complete toast system with context API
- **Auto-dismiss**: Configurable duration with automatic removal
- **Actions**: Optional action buttons for user interaction
- **Positioning**: Six position options for toast container
- **Smooth animations**: Slide-in and fade-out transitions
- **Stacking**: Multiple toasts stack with proper spacing
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "Type of toast notification",
      control: { type: "select" },
      options: ["success", "error", "warning", "info"],
    },
    message: {
      description: "Message content of the toast",
      control: { type: "text" },
    },
    onClose: {
      description: "Callback when close button is clicked",
      action: "closed",
    },
  },
} satisfies Meta<typeof GlassToast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default standalone toast
export const Default: Story = {
  args: {
    type: "info",
    message: "This is a simple toast notification",
  },
};

// Different types
export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassToast
        type="success"
        message="Operation completed successfully!"
        onClose={() => console.log("Success toast closed")}
      />
      <GlassToast
        type="error"
        message="An error occurred while processing your request."
        onClose={() => console.log("Error toast closed")}
      />
      <GlassToast
        type="warning"
        message="Please save your work before continuing."
        onClose={() => console.log("Warning toast closed")}
      />
      <GlassToast
        type="info"
        message="New updates are available for your application."
        onClose={() => console.log("Info toast closed")}
      />
    </div>
  ),
};

// Toast Provider example
const ToastProviderDemo = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            addToast({
              type: "success",
              title: "Success!",
              description: "Your changes have been saved.",
            })
          }
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Show Success Toast
        </button>
        <button
          type="button"
          onClick={() =>
            addToast({
              type: "error",
              title: "Error",
              description: "Failed to save changes. Please try again.",
            })
          }
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Show Error Toast
        </button>
        <button
          type="button"
          onClick={() =>
            addToast({
              type: "warning",
              title: "Warning",
              description: "Your session will expire in 5 minutes.",
            })
          }
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Show Warning Toast
        </button>
        <button
          type="button"
          onClick={() =>
            addToast({
              type: "info",
              title: "Information",
              description: "New features have been added to your dashboard.",
            })
          }
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Show Info Toast
        </button>
      </div>
    </div>
  );
};

export const WithToastProvider: Story = {
  render: () => (
    <ToastProvider>
      <ToastProviderDemo />
    </ToastProvider>
  ),
};

// Different positions
const PositionDemo = ({ position }: { position: string }) => {
  const { addToast } = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        addToast({
          description: `Toast at ${position.replace("-", " ")} position`,
          duration: 3000,
        })
      }
      className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
    >
      Show Toast at {position}
    </button>
  );
};

export const Positions: Story = {
  render: () => (
    <div className="space-y-8">
      {[
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top-center",
        "bottom-center",
      ].map((position) => (
        <div key={position}>
          <h3 className="mb-2 font-medium text-sm">{position}</h3>
          <ToastProvider position={position as unknown}>
            <PositionDemo position={position} />
          </ToastProvider>
        </div>
      ))}
    </div>
  ),
};

// With actions
const ActionToastDemo = () => {
  const { addToast } = useToast();
  const [undone, setUndone] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => {
          setUndone(false);
          addToast({
            type: "success",
            title: "Item deleted",
            description: "The item has been removed from your list.",
            action: {
              label: "Undo",
              onClick: () => {
                setUndone(true);
                addToast({
                  type: "info",
                  description: "Action undone successfully!",
                });
              },
            },
          });
        }}
        className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
      >
        Delete Item
      </button>
      {undone && <p className="text-liquid-accent text-sm">Item restored!</p>}
    </div>
  );
};

export const WithActions: Story = {
  render: () => (
    <ToastProvider>
      <ActionToastDemo />
    </ToastProvider>
  ),
};

// Custom duration
const DurationDemo = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() =>
          addToast({
            description: "This toast will disappear in 2 seconds",
            duration: 2000,
          })
        }
        className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
      >
        2 Second Toast
      </button>
      <button
        type="button"
        onClick={() =>
          addToast({
            description: "This toast will stay for 10 seconds",
            duration: 10000,
          })
        }
        className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
      >
        10 Second Toast
      </button>
      <button
        type="button"
        onClick={() =>
          addToast({
            type: "warning",
            description: "This toast uses the default 5 second duration",
          })
        }
        className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
      >
        Default Duration
      </button>
    </div>
  );
};

export const CustomDuration: Story = {
  render: () => (
    <ToastProvider>
      <DurationDemo />
    </ToastProvider>
  ),
};

// Multiple toasts
const MultipleToastsDemo = () => {
  const { addToast } = useToast();

  const showMultipleToasts = () => {
    addToast({
      type: "info",
      title: "First Toast",
      description: "This is the first notification",
    });
    setTimeout(() => {
      addToast({
        type: "success",
        title: "Second Toast",
        description: "This is the second notification",
      });
    }, 500);
    setTimeout(() => {
      addToast({
        type: "warning",
        title: "Third Toast",
        description: "This is the third notification",
      });
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={showMultipleToasts}
      className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-liquid-text-inverse hover:from-blue-600 hover:to-purple-600"
    >
      Show Multiple Toasts
    </button>
  );
};

export const MultipleToasts: Story = {
  render: () => (
    <ToastProvider>
      <MultipleToastsDemo />
    </ToastProvider>
  ),
};

// Real-world examples
const RealWorldDemo = () => {
  const { addToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    addToast({
      type: "info",
      description: "Saving your changes...",
      duration: 2000,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSaving(false);
    addToast({
      type: "success",
      title: "Changes saved!",
      description: "Your document has been successfully saved.",
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    addToast({
      type: "info",
      description: "Uploading file...",
      duration: 3000,
    });

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setUploading(false);
    addToast({
      type: "success",
      title: "Upload complete!",
      description: "Your file has been uploaded successfully.",
      action: {
        label: "View File",
        onClick: () => console.log("Viewing file..."),
      },
    });
  };

  const handleNetworkError = () => {
    addToast({
      type: "error",
      title: "Network Error",
      description:
        "Unable to connect to the server. Please check your internet connection.",
      duration: 8000,
      action: {
        label: "Retry",
        onClick: () => {
          addToast({
            type: "info",
            description: "Retrying connection...",
          });
        },
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="mb-4 font-semibold">Real-world Toast Examples</h3>
      <div className="grid grid-cols-1 gap-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Document"}
        </button>
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
        <button
          type="button"
          onClick={handleNetworkError}
          className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
        >
          Simulate Network Error
        </button>
      </div>
    </div>
  );
};

export const RealWorldExamples: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <RealWorldDemo />
    </ToastProvider>
  ),
};

// Form validation example
const FormValidationDemo = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = [];
    if (!email) errors.push("Email is required");
    if (!email.includes("@")) errors.push("Invalid email format");
    if (!password) errors.push("Password is required");
    if (password.length < 8)
      errors.push("Password must be at least 8 characters");

    if (errors.length > 0) {
      errors.forEach((error) => {
        addToast({
          type: "error",
          description: error,
          duration: 4000,
        });
      });
    } else {
      addToast({
        type: "success",
        title: "Success!",
        description: "Form submitted successfully.",
      });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 space-y-4">
      <h3 className="mb-4 font-semibold">
        Login Form (with validation toasts)
      </h3>
      <div>
        <label
          htmlFor="email-56avvb"
          className="mb-1 block font-medium text-sm"
        >
          Email
        </label>
        <input
          id="input-1-0jz717"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-liquid-grey px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="password-t1xfsq"
          className="mb-1 block font-medium text-sm"
        >
          Password
        </label>
        <input
          id="input-2-m9g8or"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-liquid-grey px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          placeholder="Enter password"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
      >
        Submit
      </button>
    </form>
  );
};

export const FormValidation: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <FormValidationDemo />
    </ToastProvider>
  ),
};

// Theme variations
export const ThemeVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg bg-liquid-bg p-6">
        <h3 className="mb-4 font-semibold">Light Theme</h3>
        <div className="space-y-2">
          <GlassToast type="success" message="Success toast in light theme" />
          <GlassToast type="error" message="Error toast in light theme" />
          <GlassToast type="warning" message="Warning toast in light theme" />
          <GlassToast type="info" message="Info toast in light theme" />
        </div>
      </div>
      <div className="rounded-lg bg-liquid-bg p-6">
        <h3 className="mb-4 font-semibold text-liquid-text-inverse">Dark Theme</h3>
        <div className="space-y-2">
          <GlassToast type="success" message="Success toast in dark theme" />
          <GlassToast type="error" message="Error toast in dark theme" />
          <GlassToast type="warning" message="Warning toast in dark theme" />
          <GlassToast type="info" message="Info toast in dark theme" />
        </div>
      </div>
    </div>
  ),
};
