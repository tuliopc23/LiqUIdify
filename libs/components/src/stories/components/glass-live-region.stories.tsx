import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import React from "react";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import { GlassInput } from "@/components/glass-input/glass-input";
import {
  announcer,
  GlassLiveRegion,
} from "@/components/glass-live-region/glass-live-region";

const meta = {
  title: "Components/Glass Live Region",
  component: GlassLiveRegion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    politeness: {
      description: "The politeness level of announcements",
      control: { type: "select" },
      options: ["polite", "assertive", "off"],
    },
    atomic: {
      description: "Whether to announce the entire region or just changes",
      control: { type: "boolean" },
    },
    relevant: {
      description: "Which changes to announce",
      control: { type: "select" },
      options: ["additions", "removals", "text", "all"],
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassLiveRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [message, setMessage] = React.useState("");
    const [inputValue, setInputValue] = React.useState("");

    const announce = (
      text: string,
      priority: "low" | "medium" | "high" = "medium",
    ) => {
      announcer.announce(text, { priority });
      setMessage(text);
    };

    return (
      <div className="max-w-2xl space-y-6 p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Live Region Demo</h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            Click the buttons below to trigger screen reader announcements. The
            messages will be announced without moving focus.
          </p>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <GlassButton
              type="button"
              variant="primary"
              onClick={() =>
                announce("Success! Your changes have been saved.", "high")
              }
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Success Message
            </GlassButton>

            <GlassButton
              type="button"
              variant="danger"
              onClick={() => announce("Error! Unable to save changes.", "high")}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Error Message
            </GlassButton>

            <GlassButton
              type="button"
              variant="ghost"
              onClick={() =>
                announce("Warning: This action cannot be undone.", "medium")
              }
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning Message
            </GlassButton>

            <GlassButton
              type="button"
              variant="ghost"
              onClick={() =>
                announce("Info: New features are available.", "low")
              }
            >
              <Info className="mr-2 h-4 w-4" />
              Info Message
            </GlassButton>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <h3 className="mb-2 font-medium">Last Announcement:</h3>
            <p className="text-[var(--text-secondary)]">
              {message || "No announcements yet"}
            </p>
          </div>
        </GlassCard>

        <GlassLiveRegion politeness="polite" />
      </div>
    );
  },
};

export const FormValidation: Story = {
  render: () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid";
      }

      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      setErrors(newErrors);

      // Announce validation results
      const errorCount = Object.keys(newErrors).length;
      if (errorCount > 0) {
        announcer.announce(
          `Form validation failed. ${errorCount} error${
            errorCount > 1 ? "s" : ""
          } found.`,
          { priority: "high" },
        );
      } else {
        announcer.announce("Form validation successful!", {
          priority: "medium",
        });
      }

      return errorCount === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        announcer.announce("Form submitted successfully!", {
          priority: "high",
        });
      }
    };

    return (
      <div className="max-w-md space-y-6 p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Form Validation</h2>
          <p className="mb-6 text-[var(--text-secondary)] text-sm">
            This form demonstrates live announcements for validation errors and
            success messages.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block font-medium text-sm">Email</label>
              <GlassInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium text-sm">Password</label>
              <GlassInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <GlassButton type="submit" variant="primary">
                Submit
              </GlassButton>
              <GlassButton
                type="button"
                variant="ghost"
                onClick={() => {
                  setEmail("");
                  setPassword("");
                  setErrors({});
                  announcer.announce("Form cleared", { priority: "low" });
                }}
              >
                Clear
              </GlassButton>
            </div>
          </form>
        </GlassCard>

        <GlassLiveRegion politeness="assertive" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Live region used for form validation announcements",
      },
    },
  },
};

export const ProgressUpdates: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);

    const startProgress = () => {
      setIsRunning(true);
      setProgress(0);
      announcer.announce("Progress started", { priority: "medium" });

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10;

          // Announce progress milestones
          if (newProgress === 50) {
            announcer.announce("Progress: 50% complete", { priority: "low" });
          } else if (newProgress === 100) {
            announcer.announce("Progress completed successfully!", {
              priority: "high",
            });
            setIsRunning(false);
            clearInterval(interval);
          }

          return newProgress;
        });
      }, 500);
    };

    const resetProgress = () => {
      setProgress(0);
      setIsRunning(false);
      announcer.announce("Progress reset", { priority: "low" });
    };

    return (
      <div className="max-w-lg space-y-6 p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Progress Updates</h2>
          <p className="mb-6 text-[var(--text-secondary)] text-sm">
            This demonstrates live announcements for progress updates and status
            changes.
          </p>

          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <GlassButton
              type="button"
              variant="primary"
              onClick={startProgress}
              disabled={isRunning}
            >
              {isRunning ? "Running..." : "Start Progress"}
            </GlassButton>
            <GlassButton
              type="button"
              variant="ghost"
              onClick={resetProgress}
              disabled={isRunning}
            >
              Reset
            </GlassButton>
          </div>
        </GlassCard>

        <GlassLiveRegion politeness="polite" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Live region for progress and status updates",
      },
    },
  },
};

export const DynamicContent: Story = {
  render: () => {
    const [items, setItems] = React.useState<string[]>(["Item 1", "Item 2"]);
    const [newItem, setNewItem] = React.useState("");

    const addItem = () => {
      if (newItem.trim()) {
        const item = `Item ${items.length + 1}: ${newItem.trim()}`;
        setItems([...items, item]);
        setNewItem("");
        announcer.announce(`Added ${item}`, { priority: "medium" });
      }
    };

    const removeItem = (index: number) => {
      const item = items[index];
      setItems(items.filter((_, i) => i !== index));
      announcer.announce(`Removed ${item}`, { priority: "medium" });
    };

    const clearAll = () => {
      const count = items.length;
      setItems([]);
      announcer.announce(`Cleared all ${count} items`, { priority: "medium" });
    };

    return (
      <div className="max-w-md space-y-6 p-8">
        <GlassCard className="p-6">
          <h2 className="mb-4 font-bold text-xl">Dynamic Content</h2>
          <p className="mb-6 text-[var(--text-secondary)] text-sm">
            Live announcements for dynamic content changes like adding/removing
            items from a list.
          </p>

          <div className="mb-4 flex gap-2">
            <GlassInput
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter new item"
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <GlassButton
              type="button"
              onClick={addItem}
              disabled={!newItem.trim()}
            >
              Add
            </GlassButton>
          </div>

          <div className="mb-4 space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3"
              >
                <span className="text-sm">{item}</span>
                <GlassButton
                  type="button"
                  size="sm"
                  variant="danger"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </GlassButton>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-center text-[var(--text-secondary)] text-sm">
                No items yet
              </p>
            )}
          </div>

          <GlassButton
            type="button"
            variant="ghost"
            onClick={clearAll}
            disabled={items.length === 0}
            className="w-full"
          >
            Clear All
          </GlassButton>
        </GlassCard>

        <GlassLiveRegion politeness="polite" />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Live region for dynamic content changes",
      },
    },
  },
};
