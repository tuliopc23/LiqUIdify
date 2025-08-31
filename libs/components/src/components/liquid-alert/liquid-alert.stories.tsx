import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidButton } from "../liquid-button";
import { LiquidAlert, LiquidAlertAction } from "./liquid-alert";

const meta: Meta<typeof LiquidAlert> = {
  title: "Feedback & Overlay/LiquidAlert",
  component: LiquidAlert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An alert component with Apple HIG liquid glass design, supporting multiple variants and dismissible functionality.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "warning", "success", "info"],
      description: "Visual style variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Show dismiss button",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minWidth: "600px",
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
type Story = StoryObj<typeof LiquidAlert>;

// Custom icons for examples
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
  </svg>
);

export const Default: Story = {
  args: {
    title: "Default Alert",
    description: "This is a default alert with liquid glass design and standard styling.",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert variant="default" title="Default Alert">
        This is a default alert for general information.
      </LiquidAlert>

      <LiquidAlert variant="info" title="Information">
        This is an informational alert with helpful details.
      </LiquidAlert>

      <LiquidAlert variant="success" title="Success!">
        Your action was completed successfully.
      </LiquidAlert>

      <LiquidAlert variant="warning" title="Warning">
        Please review this information carefully before proceeding.
      </LiquidAlert>

      <LiquidAlert variant="destructive" title="Error">
        An error occurred while processing your request.
      </LiquidAlert>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert size="sm" variant="info" title="Small Alert">
        Compact alert with smaller padding and text.
      </LiquidAlert>

      <LiquidAlert size="md" variant="info" title="Medium Alert">
        Standard alert size with regular padding and text.
      </LiquidAlert>

      <LiquidAlert size="lg" variant="info" title="Large Alert">
        Larger alert with more padding and bigger text for important messages.
      </LiquidAlert>
    </div>
  ),
};

export const WithCustomIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert variant="success" title="Profile Updated" icon={<UserIcon />}>
        Your profile information has been successfully updated.
      </LiquidAlert>

      <LiquidAlert variant="info" title="New Notification" icon={<BellIcon />}>
        You have received a new message in your inbox.
      </LiquidAlert>

      <LiquidAlert variant="success" title="Task Completed" icon={<CheckIcon />}>
        All items in your todo list have been completed.
      </LiquidAlert>
    </div>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert variant="info" title="Clean Look" icon={null}>
        This alert doesn't show any icon for a cleaner appearance.
      </LiquidAlert>

      <LiquidAlert variant="warning" title="Minimal Style" icon={null}>
        Sometimes less is more - this alert focuses on the content.
      </LiquidAlert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      {
        id: 1,
        variant: "info" as const,
        title: "First Alert",
        description: "This alert can be dismissed.",
      },
      { id: 2, variant: "success" as const, title: "Second Alert", description: "This one too!" },
      {
        id: 3,
        variant: "warning" as const,
        title: "Third Alert",
        description: "And this one as well.",
      },
    ]);

    const dismissAlert = (id: number) => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    return (
      <div className="space-y-4">
        {alerts.map((alert) => (
          <LiquidAlert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            description={alert.description}
            dismissible
            onDismiss={() => dismissAlert(alert.id)}
          />
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-white/60 mb-4">All alerts have been dismissed!</p>
            <LiquidButton
              onClick={() =>
                setAlerts([
                  {
                    id: Date.now() + 1,
                    variant: "info",
                    title: "Restored Alert 1",
                    description: "Alert restored!",
                  },
                  {
                    id: Date.now() + 2,
                    variant: "success",
                    title: "Restored Alert 2",
                    description: "Another one!",
                  },
                ])
              }
            >
              Restore Alerts
            </LiquidButton>
          </div>
        )}
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert
        variant="info"
        title="Update Available"
        description="A new version of the application is available for download."
        actions={
          <div className="flex gap-2">
            <LiquidAlertAction variant="primary">Update Now</LiquidAlertAction>
            <LiquidAlertAction variant="secondary">Later</LiquidAlertAction>
          </div>
        }
      />

      <LiquidAlert
        variant="warning"
        title="Storage Almost Full"
        description="You're using 95% of your available storage space."
        actions={
          <div className="flex gap-2">
            <LiquidAlertAction variant="primary">Manage Storage</LiquidAlertAction>
            <LiquidAlertAction variant="secondary">Remind Later</LiquidAlertAction>
          </div>
        }
        dismissible
        onDismiss={() => console.log("Storage alert dismissed")}
      />

      <LiquidAlert
        variant="destructive"
        title="Account Suspended"
        description="Your account has been temporarily suspended due to unusual activity."
        actions={<LiquidAlertAction variant="destructive">Contact Support</LiquidAlertAction>}
      />
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert
        variant="success"
        title="Deployment Successful"
        icon={<CheckIcon />}
        dismissible
        actions={
          <div className="flex gap-2">
            <LiquidAlertAction variant="primary">View Live Site</LiquidAlertAction>
            <LiquidAlertAction variant="secondary">View Logs</LiquidAlertAction>
          </div>
        }
      >
        <div className="space-y-2">
          <p>Your application has been successfully deployed to production.</p>
          <div className="bg-white/10 p-3 rounded-lg text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-white/70">Build Time:</span>
                <span className="ml-2 font-mono">2m 34s</span>
              </div>
              <div>
                <span className="text-white/70">Bundle Size:</span>
                <span className="ml-2 font-mono">1.2 MB</span>
              </div>
              <div>
                <span className="text-white/70">Environment:</span>
                <span className="ml-2 font-mono">production</span>
              </div>
              <div>
                <span className="text-white/70">Version:</span>
                <span className="ml-2 font-mono">v2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </LiquidAlert>

      <LiquidAlert
        variant="warning"
        title="API Rate Limit Warning"
        dismissible
        actions={
          <div className="flex gap-2">
            <LiquidAlertAction variant="primary">Upgrade Plan</LiquidAlertAction>
            <LiquidAlertAction variant="secondary">View Usage</LiquidAlertAction>
          </div>
        }
      >
        <div className="space-y-3">
          <p>You're approaching your API rate limit for this month.</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Usage this month</span>
              <span>8,432 / 10,000 requests</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "84.32%" }}></div>
            </div>
          </div>
          <p className="text-sm text-white/80">
            Consider upgrading your plan to avoid service interruption.
          </p>
        </div>
      </LiquidAlert>
    </div>
  ),
};

export const StatusUpdates: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert variant="info" title="System Maintenance" dismissible>
        <div className="space-y-2">
          <p>Scheduled maintenance will begin in 30 minutes.</p>
          <div className="text-sm text-white/70">
            <p>
              <strong>Start:</strong> Today at 2:00 AM UTC
            </p>
            <p>
              <strong>Duration:</strong> Approximately 2 hours
            </p>
            <p>
              <strong>Impact:</strong> Service will be temporarily unavailable
            </p>
          </div>
        </div>
      </LiquidAlert>

      <LiquidAlert variant="success" title="Feature Release" icon={<BellIcon />}>
        <div className="space-y-2">
          <p>New collaboration features are now available!</p>
          <ul className="text-sm text-white/80 space-y-1 list-disc list-inside">
            <li>Real-time document editing</li>
            <li>Enhanced comment system</li>
            <li>Version history improvements</li>
          </ul>
        </div>
      </LiquidAlert>

      <LiquidAlert
        variant="destructive"
        title="Service Disruption"
        actions={<LiquidAlertAction variant="destructive">Status Page</LiquidAlertAction>}
      >
        <div className="space-y-2">
          <p>We're experiencing issues with our payment processing system.</p>
          <div className="bg-red-500/10 p-3 rounded-lg text-sm">
            <p>
              <strong>Affected Services:</strong> Checkout, Subscriptions
            </p>
            <p>
              <strong>ETA:</strong> We're working on a fix and expect resolution within 2 hours
            </p>
          </div>
        </div>
      </LiquidAlert>
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert variant="success" title="Changes saved successfully" />
      <LiquidAlert variant="warning" title="Session expires in 5 minutes" />
      <LiquidAlert variant="destructive" title="Network connection lost" />
      <LiquidAlert variant="info" title="New messages available" dismissible />
    </div>
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <LiquidAlert variant="info">
        This alert only has description content without a title. It's useful for simple messages
        that don't need a heading.
      </LiquidAlert>

      <LiquidAlert variant="warning" dismissible>
        You have unsaved changes. Make sure to save your work before leaving this page.
      </LiquidAlert>
    </div>
  ),
};

// Interactive story for testing dismissible functionality
export const Interactive: Story = {
  render: () => {
    const [variant, setVariant] = useState<
      "default" | "destructive" | "warning" | "success" | "info"
    >("info");
    const [size, setSize] = useState<"sm" | "md" | "lg">("md");
    const [dismissible, setDismissible] = useState(true);
    const [showIcon, setShowIcon] = useState(true);
    const [showActions, setShowActions] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    return (
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 space-y-4">
          <h3 className="text-white font-medium">Alert Controls</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Variant:</label>
              <div className="flex flex-wrap gap-1">
                {(["default", "info", "success", "warning", "destructive"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-2 py-1 text-xs rounded transition-colors capitalize ${
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
                    className={`px-2 py-1 text-xs rounded transition-colors capitalize ${
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

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={dismissible}
                onChange={(e) => setDismissible(e.target.checked)}
                className="rounded border-white/20"
              />
              Dismissible
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={showIcon}
                onChange={(e) => setShowIcon(e.target.checked)}
                className="rounded border-white/20"
              />
              Show Icon
            </label>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={showActions}
                onChange={(e) => setShowActions(e.target.checked)}
                className="rounded border-white/20"
              />
              Show Actions
            </label>
          </div>

          {!isVisible && <LiquidButton onClick={() => setIsVisible(true)}>Show Alert</LiquidButton>}
        </div>

        {isVisible && (
          <LiquidAlert
            variant={variant}
            size={size}
            title="Interactive Alert"
            description={`This is a ${size} ${variant} alert that you can customize using the controls above.`}
            dismissible={dismissible}
            onDismiss={() => setIsVisible(false)}
            icon={showIcon ? undefined : null}
            actions={
              showActions ? (
                <div className="flex gap-2">
                  <LiquidAlertAction variant="primary">Primary Action</LiquidAlertAction>
                  <LiquidAlertAction variant="secondary">Secondary</LiquidAlertAction>
                </div>
              ) : undefined
            }
          />
        )}
      </div>
    );
  },
};
