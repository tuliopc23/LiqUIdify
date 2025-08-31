import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidButton } from "../liquid-button";
import { LiquidToast, ToastProvider, toast, useToast } from "./liquid-toast";

const meta: Meta<typeof LiquidToast> = {
  title: "Feedback & Overlay/LiquidToast",
  component: LiquidToast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toast notification system with Apple HIG liquid glass design, queue management, and multiple positioning options.",
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div
          style={{
            minHeight: "600px",
            minWidth: "800px",
            padding: "2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            position: "relative",
          }}
        >
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LiquidToast>;

// Toast trigger component
const ToastTriggers = () => {
  const { toast: showToast } = useToast();

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Toast Notifications</h2>
        <p className="text-white/70">
          Click the buttons below to trigger different types of toasts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LiquidButton
          onClick={() => toast.success("Success! Your changes have been saved.")}
          variant="default"
        >
          Success Toast
        </LiquidButton>

        <LiquidButton
          onClick={() => toast.error("Error: Failed to save changes. Please try again.")}
          variant="destructive"
        >
          Error Toast
        </LiquidButton>

        <LiquidButton
          onClick={() => toast.warning("Warning: This action cannot be undone.")}
          variant="ghost"
        >
          Warning Toast
        </LiquidButton>

        <LiquidButton
          onClick={() => toast.info("Info: New features are available in your dashboard.")}
          variant="ghost"
        >
          Info Toast
        </LiquidButton>

        <LiquidButton
          onClick={() => toast.default("Default notification message.")}
          variant="ghost"
        >
          Default Toast
        </LiquidButton>

        <LiquidButton
          onClick={() =>
            showToast({
              title: "Custom Toast",
              description: "This toast has both title and description with custom content.",
              variant: "info",
              duration: 8000,
            })
          }
          variant="ghost"
        >
          Custom Toast
        </LiquidButton>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastTriggers />,
};

export const WithActions: Story = {
  render: () => {
    const { toast: showToast } = useToast();

    return (
      <div className="space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Toasts with Actions</h2>
          <p className="text-white/70">These toasts include action buttons</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LiquidButton
            onClick={() =>
              showToast({
                title: "Update Available",
                description: "A new version is ready to install.",
                variant: "info",
                duration: 10000,
                action: (
                  <LiquidButton
                    size="sm"
                    variant="ghost"
                    className="text-blue-200 hover:text-blue-100"
                  >
                    Update
                  </LiquidButton>
                ),
              })
            }
          >
            Update Toast
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "File Uploaded",
                description: "document.pdf has been uploaded successfully.",
                variant: "success",
                action: (
                  <LiquidButton
                    size="sm"
                    variant="ghost"
                    className="text-green-200 hover:text-green-100"
                  >
                    View
                  </LiquidButton>
                ),
              })
            }
          >
            Upload Success
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Connection Lost",
                description: "Attempting to reconnect...",
                variant: "destructive",
                duration: 0, // Don't auto-dismiss
                action: (
                  <LiquidButton
                    size="sm"
                    variant="ghost"
                    className="text-red-200 hover:text-red-100"
                  >
                    Retry
                  </LiquidButton>
                ),
              })
            }
          >
            Connection Error
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Storage Full",
                description: "You're running out of storage space.",
                variant: "warning",
                action: (
                  <LiquidButton
                    size="sm"
                    variant="ghost"
                    className="text-yellow-200 hover:text-yellow-100"
                  >
                    Manage
                  </LiquidButton>
                ),
              })
            }
          >
            Storage Warning
          </LiquidButton>
        </div>
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: () => {
    const { toast: showToast } = useToast();

    const CheckIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
      </svg>
    );

    const UserIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
      </svg>
    );

    const DownloadIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
      </svg>
    );

    return (
      <div className="space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Custom Icons</h2>
          <p className="text-white/70">Toasts with custom icon components</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LiquidButton
            onClick={() =>
              showToast({
                title: "Task Completed",
                description: "All items processed successfully.",
                variant: "success",
                icon: <CheckIcon />,
              })
            }
          >
            Custom Success
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Profile Updated",
                description: "Your profile changes have been saved.",
                variant: "info",
                icon: <UserIcon />,
              })
            }
          >
            Profile Toast
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Download Complete",
                description: "report.pdf has been downloaded.",
                variant: "success",
                icon: <DownloadIcon />,
              })
            }
          >
            Download Toast
          </LiquidButton>
        </div>
      </div>
    );
  },
};

export const DurationVariations: Story = {
  render: () => {
    const { toast: showToast } = useToast();

    return (
      <div className="space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Duration Variations</h2>
          <p className="text-white/70">Different auto-dismiss timings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <LiquidButton
            onClick={() =>
              showToast({
                title: "Quick Message",
                description: "Disappears in 2 seconds",
                variant: "info",
                duration: 2000,
              })
            }
          >
            2 Second Toast
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Standard Message",
                description: "Default 5 second duration",
                variant: "default",
              })
            }
          >
            Default Duration
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Long Message",
                description: "Stays visible for 10 seconds",
                variant: "warning",
                duration: 10000,
              })
            }
          >
            10 Second Toast
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Persistent Message",
                description: "Won't auto-dismiss - click X to close",
                variant: "destructive",
                duration: 0,
              })
            }
          >
            Persistent Toast
          </LiquidButton>
        </div>
      </div>
    );
  },
};

export const NoIcons: Story = {
  render: () => {
    const { toast: showToast } = useToast();

    return (
      <div className="space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Clean Design</h2>
          <p className="text-white/70">Toasts without icons for a minimal look</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LiquidButton
            onClick={() =>
              showToast({
                title: "Minimal Success",
                description: "Clean design without icons",
                variant: "success",
                icon: null,
              })
            }
          >
            No Icon Success
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Minimal Error",
                description: "Focus on content, not decorations",
                variant: "destructive",
                icon: null,
              })
            }
          >
            No Icon Error
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                title: "Simple Message",
                variant: "info",
                icon: null,
              })
            }
          >
            Title Only
          </LiquidButton>

          <LiquidButton
            onClick={() =>
              showToast({
                description: "Just a description, no title or icon",
                variant: "default",
                icon: null,
              })
            }
          >
            Description Only
          </LiquidButton>
        </div>
      </div>
    );
  },
};

export const QueueDemo: Story = {
  render: () => {
    const { toast: showToast } = useToast();

    const showMultipleToasts = () => {
      const toasts = [
        { title: "First Toast", description: "This appeared first", variant: "info" as const },
        { title: "Second Toast", description: "This came next", variant: "success" as const },
        { title: "Third Toast", description: "Then this one", variant: "warning" as const },
        { title: "Fourth Toast", description: "And finally this", variant: "destructive" as const },
        {
          title: "Fifth Toast",
          description: "One more for good measure",
          variant: "default" as const,
        },
      ];

      toasts.forEach((toast, index) => {
        setTimeout(() => {
          showToast(toast);
        }, index * 500);
      });
    };

    return (
      <div className="space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Queue Management</h2>
          <p className="text-white/70">Test multiple toasts and queue behavior</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LiquidButton onClick={showMultipleToasts}>Show Multiple Toasts</LiquidButton>

          <LiquidButton
            onClick={() => {
              for (let i = 1; i <= 8; i++) {
                showToast({
                  title: `Toast #${i}`,
                  description: `This is toast number ${i} - queue will limit to 5`,
                  variant: i % 2 === 0 ? "success" : "info",
                });
              }
            }}
          >
            Test Queue Limit
          </LiquidButton>

          <LiquidButton
            onClick={() => {
              const scenarios = [
                { title: "Upload Started", variant: "info" as const },
                { title: "Processing...", variant: "warning" as const, duration: 0 },
                { title: "Upload Complete", variant: "success" as const },
              ];

              scenarios.forEach((scenario, index) => {
                setTimeout(() => showToast(scenario), index * 2000);
              });
            }}
          >
            Workflow Simulation
          </LiquidButton>

          <LiquidButton
            onClick={() => {
              showToast({
                title: "Bulk Operation",
                description: "Processing 1,234 files...",
                variant: "info",
                duration: 3000,
                action: (
                  <LiquidButton size="sm" variant="ghost" className="text-blue-200">
                    View Progress
                  </LiquidButton>
                ),
              });
            }}
          >
            Operation Toast
          </LiquidButton>
        </div>
      </div>
    );
  },
};

// Position demo with provider wrapper
const PositionDemo = ({ position }: { position: any }) => (
  <ToastProvider position={position}>
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          Position: {position.replace("-", " ")}
        </h3>
        <p className="text-white/70 text-sm">Toasts will appear in this corner</p>
      </div>

      <div className="flex gap-2 justify-center">
        <LiquidButton onClick={() => toast.success(`Success from ${position}!`)} size="sm">
          Success
        </LiquidButton>
        <LiquidButton
          onClick={() => toast.error(`Error from ${position}!`)}
          size="sm"
          variant="destructive"
        >
          Error
        </LiquidButton>
      </div>
    </div>
  </ToastProvider>
);

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <PositionDemo position="top-left" />
      <PositionDemo position="top-center" />
      <PositionDemo position="top-right" />
      <PositionDemo position="bottom-left" />
      <PositionDemo position="bottom-center" />
      <PositionDemo position="bottom-right" />
    </div>
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "600px",
          minWidth: "1000px",
          padding: "1rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// Interactive story for testing all features
export const Interactive: Story = {
  render: () => {
    const { toast: showToast } = useToast();
    const [variant, setVariant] = useState<
      "default" | "destructive" | "warning" | "success" | "info"
    >("info");
    const [duration, setDuration] = useState(5000);
    const [showIcon, setShowIcon] = useState(true);
    const [showAction, setShowAction] = useState(false);
    const [title, setTitle] = useState("Interactive Toast");
    const [description, setDescription] = useState(
      "This toast can be customized using the controls below."
    );

    const handleShowToast = () => {
      showToast({
        title,
        description,
        variant,
        duration,
        icon: showIcon ? undefined : null,
        action: showAction ? (
          <LiquidButton size="sm" variant="ghost" className="text-current">
            Action
          </LiquidButton>
        ) : undefined,
      });
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Interactive Toast Builder</h2>
          <p className="text-white/70">Customize and test toast notifications</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-2">Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">Variant:</label>
                <div className="flex flex-wrap gap-1">
                  {(["default", "info", "success", "warning", "destructive"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`px-3 py-1 text-sm rounded transition-colors capitalize ${
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
                <label className="block text-sm text-white/80 mb-2">
                  Duration: {duration === 0 ? "No auto-dismiss" : `${duration}ms`}
                </label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="1000"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60 mt-1">
                  <span>No dismiss</span>
                  <span>15s</span>
                </div>
              </div>

              <div className="flex gap-4">
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
                    checked={showAction}
                    onChange={(e) => setShowAction(e.target.checked)}
                    className="rounded border-white/20"
                  />
                  Show Action
                </label>
              </div>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/10">
            <LiquidButton onClick={handleShowToast} size="lg">
              Show Toast
            </LiquidButton>
          </div>
        </div>
      </div>
    );
  },
};
