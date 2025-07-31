import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";

// Import feedback components
import { GlassToast } from "../../components/glass-toast";
import { GlassNotification } from "../../components/glass-notification";
import { GlassLoading } from "../../components/glass-loading";
import { GlassSkeleton } from "../../components/glass-skeleton";
import { GlassSpinner } from "../../components/glass-spinner";

expect.extend(toHaveNoViolations);

describe("Feedback Systems Integration Tests", () => {
  const user = userEvent.setup();

  describe("Toast System Management", () => {
    const ToastManager = () => {
      const [toasts, setToasts] = React.useState<
        Array<{
          id: string;
          message: string;
          type: "success" | "error" | "warning" | "info";
          duration?: number;
        }>
      >([]);

      const addToast = (
        message: string,
        type: "success" | "error" | "warning" | "info" = "info",
        duration = 3000,
      ) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
      };

      const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      };

      return (
        <>
          <div>
            <button onClick={() => addToast("Success message", "success")}>
              Show Success
            </button>
            <button onClick={() => addToast("Error message", "error")}>
              Show Error
            </button>
            <button onClick={() => addToast("Warning message", "warning")}>
              Show Warning
            </button>
            <button onClick={() => addToast("Info message", "info")}>
              Show Info
            </button>
            <button
              onClick={() => {
                // Simulate multiple toasts
                addToast("First toast", "info");
                setTimeout(() => addToast("Second toast", "success"), 100);
                setTimeout(() => addToast("Third toast", "warning"), 200);
              }}
            >
              Show Multiple
            </button>
          </div>

          <div
            className="toast-container"
            role="region"
            aria-live="polite"
            aria-label="Notifications"
          >
            {toasts.map((toast) => (
              <GlassToast
                key={toast.id}
                isOpen={true}
                onClose={() => removeToast(toast.id)}
                type={toast.type}
                duration={toast.duration}
              >
                {toast.message}
              </GlassToast>
            ))}
          </div>
        </>
      );
    };

    it("should handle multiple toasts with proper stacking", async () => {
      const { container } = render(<ToastManager />);

      // Show multiple toasts
      await user.click(screen.getByText("Show Multiple"));

      // Wait for all toasts to appear
      await waitFor(() => {
        expect(screen.getByText("First toast")).toBeInTheDocument();
        expect(screen.getByText("Second toast")).toBeInTheDocument();
        expect(screen.getByText("Third toast")).toBeInTheDocument();
      });

      // Toasts should be in the notification region
      const toastRegion = screen.getByRole("region", { name: "Notifications" });
      expect(toastRegion).toContainElement(screen.getByText("First toast"));

      // Test auto-dismiss
      await waitFor(
        () => {
          expect(screen.queryByText("First toast")).not.toBeInTheDocument();
        },
        { timeout: 4000 },
      );

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should handle toast dismissal and focus management", async () => {
      render(<ToastManager />);

      // Show error toast (usually doesn't auto-dismiss)
      await user.click(screen.getByText("Show Error"));

      const errorToast = await screen.findByText("Error message");
      expect(errorToast).toBeInTheDocument();

      // Find and click close button
      const closeButton = screen.getByLabelText(/close|dismiss/i);
      await user.click(closeButton);

      // Toast should be removed
      await waitFor(() => {
        expect(screen.queryByText("Error message")).not.toBeInTheDocument();
      });
    });
  });

  describe("Notification Queue System", () => {
    const NotificationQueue = () => {
      const [notifications, setNotifications] = React.useState<
        Array<{
          id: string;
          title: string;
          message: string;
          type: "info" | "success" | "warning" | "error";
          timestamp: Date;
          read: boolean;
        }>
      >([]);

      const [showNotifications, setShowNotifications] = React.useState(false);

      const addNotification = (
        title: string,
        message: string,
        type: "info" | "success" | "warning" | "error" = "info",
      ) => {
        const notification = {
          id: Date.now().toString(),
          title,
          message,
          type,
          timestamp: new Date(),
          read: false,
        };
        setNotifications((prev) => [notification, ...prev]);
      };

      const markAsRead = (id: string) => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
        );
      };

      const dismissNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      };

      const unreadCount = notifications.filter((n) => !n.read).length;

      return (
        <>
          <button onClick={() => setShowNotifications(!showNotifications)}>
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </button>

          <button
            onClick={() =>
              addNotification(
                "New Message",
                "You have a new message from John",
                "info",
              )
            }
          >
            Add Message Notification
          </button>

          <button
            onClick={() =>
              addNotification(
                "Task Complete",
                "Your export has finished",
                "success",
              )
            }
          >
            Add Success Notification
          </button>

          <button
            onClick={() => {
              // Simulate burst of notifications
              addNotification("Alert 1", "First alert message", "warning");
              setTimeout(
                () =>
                  addNotification("Alert 2", "Second alert message", "error"),
                100,
              );
              setTimeout(
                () => addNotification("Alert 3", "Third alert message", "info"),
                200,
              );
            }}
          >
            Add Burst
          </button>

          {showNotifications && (
            <div
              className="notification-panel"
              role="region"
              aria-label="Notification center"
            >
              <h2>Notifications</h2>
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                notifications.map((notification) => (
                  <GlassNotification
                    key={notification.id}
                    type={notification.type}
                    onClose={() => dismissNotification(notification.id)}
                    className={notification.read ? "read" : "unread"}
                  >
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <time>{notification.timestamp.toLocaleTimeString()}</time>
                    {!notification.read && (
                      <button onClick={() => markAsRead(notification.id)}>
                        Mark as read
                      </button>
                    )}
                  </GlassNotification>
                ))
              )}
            </div>
          )}
        </>
      );
    };

    it("should manage notification queue with unread counts", async () => {
      render(<NotificationQueue />);

      // Initially no unread notifications
      expect(screen.getByText("Notifications")).toBeInTheDocument();

      // Add notifications
      await user.click(screen.getByText("Add Message Notification"));
      await user.click(screen.getByText("Add Success Notification"));

      // Should show unread count
      expect(screen.getByText("Notifications (2)")).toBeInTheDocument();

      // Open notification panel
      await user.click(screen.getByText("Notifications (2)"));

      // Should see both notifications
      expect(screen.getByText("New Message")).toBeInTheDocument();
      expect(screen.getByText("Task Complete")).toBeInTheDocument();

      // Mark one as read
      const markReadButtons = screen.getAllByText("Mark as read");
      await user.click(markReadButtons[0]);

      // Count should update
      expect(screen.getByText("Notifications (1)")).toBeInTheDocument();
    });

    it("should handle burst notifications without UI blocking", async () => {
      const { container } = render(<NotificationQueue />);

      // Add burst of notifications
      await user.click(screen.getByText("Add Burst"));

      // Open panel
      await user.click(screen.getByText(/Notifications/));

      // All notifications should appear
      await waitFor(() => {
        expect(screen.getByText("Alert 1")).toBeInTheDocument();
        expect(screen.getByText("Alert 2")).toBeInTheDocument();
        expect(screen.getByText("Alert 3")).toBeInTheDocument();
      });

      // Should be ordered by timestamp (newest first)
      const notifications = screen.getAllByRole("article");
      expect(notifications).toHaveLength(3);

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Loading States Coordination", () => {
    const LoadingCoordination = () => {
      const [loadingStates, setLoadingStates] = React.useState({
        content: true,
        sidebar: true,
        header: false,
      });

      const [showSkeleton, setShowSkeleton] = React.useState(true);

      React.useEffect(() => {
        // Simulate staggered loading
        const timers = [
          setTimeout(
            () => setLoadingStates((prev) => ({ ...prev, header: false })),
            500,
          ),
          setTimeout(
            () => setLoadingStates((prev) => ({ ...prev, sidebar: false })),
            1500,
          ),
          setTimeout(
            () => setLoadingStates((prev) => ({ ...prev, content: false })),
            2500,
          ),
          setTimeout(() => setShowSkeleton(false), 3000),
        ];

        return () => timers.forEach(clearTimeout);
      }, []);

      const isAnyLoading = Object.values(loadingStates).some(Boolean);

      return (
        <div className="app-layout">
          {isAnyLoading && (
            <GlassLoading
              text="Loading application..."
              className="global-loader"
            />
          )}

          <header>
            {loadingStates.header ? (
              <GlassSkeleton height={60} />
            ) : (
              <div>Header Content</div>
            )}
          </header>

          <aside>
            {loadingStates.sidebar ? (
              <div>
                <GlassSkeleton height={40} count={5} />
              </div>
            ) : (
              <nav>
                <ul>
                  <li>Menu Item 1</li>
                  <li>Menu Item 2</li>
                  <li>Menu Item 3</li>
                </ul>
              </nav>
            )}
          </aside>

          <main>
            {showSkeleton ? (
              <div>
                <GlassSkeleton height={200} />
                <GlassSkeleton height={100} count={3} />
              </div>
            ) : (
              <article>
                <h1>Main Content</h1>
                <p>Content has loaded successfully</p>
              </article>
            )}
          </main>

          <div className="loading-indicators">
            {loadingStates.content && (
              <GlassSpinner size="small" label="Loading content" />
            )}
            {loadingStates.sidebar && (
              <GlassSpinner size="small" label="Loading sidebar" />
            )}
          </div>
        </div>
      );
    };

    it("should coordinate multiple loading states", async () => {
      render(<LoadingCoordination />);

      // Initially should show loading states
      expect(screen.getByText("Loading application...")).toBeInTheDocument();
      expect(screen.getAllByTestId("skeleton")).toHaveLength(9); // Header + 5 sidebar + 3 content

      // Header should load first
      await waitFor(
        () => {
          expect(screen.getByText("Header Content")).toBeInTheDocument();
        },
        { timeout: 1000 },
      );

      // Sidebar should load next
      await waitFor(
        () => {
          expect(screen.getByText("Menu Item 1")).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Content should load last
      await waitFor(
        () => {
          expect(screen.getByText("Main Content")).toBeInTheDocument();
        },
        { timeout: 3500 },
      );

      // Global loader should be gone
      expect(
        screen.queryByText("Loading application..."),
      ).not.toBeInTheDocument();
    });
  });

  describe("Accessibility Announcements", () => {
    const AccessibleFeedback = () => {
      const [status, setStatus] = React.useState("");
      const [alert, setAlert] = React.useState("");
      const [loading, setLoading] = React.useState(false);

      const performAction = async (action: string) => {
        setLoading(true);
        setStatus(`Performing ${action}...`);

        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLoading(false);
        setStatus(`${action} completed successfully`);

        // Show toast for visual users
        setAlert(`${action} completed`);
        setTimeout(() => setAlert(""), 3000);
      };

      return (
        <>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {status}
          </div>

          <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className="sr-only"
          >
            {alert}
          </div>

          <button onClick={() => performAction("Save")} disabled={loading}>
            Save Document
          </button>

          <button onClick={() => performAction("Delete")} disabled={loading}>
            Delete Item
          </button>

          {loading && <GlassLoading text={status} />}

          {alert && (
            <GlassToast
              isOpen={true}
              type="success"
              onClose={() => setAlert("")}
            >
              {alert}
            </GlassToast>
          )}
        </>
      );
    };

    it("should provide proper accessibility announcements", async () => {
      const { container } = render(<AccessibleFeedback />);

      // Click save button
      await user.click(screen.getByText("Save Document"));

      // Status should be announced
      expect(screen.getByText("Performing Save...")).toBeInTheDocument();
      expect(screen.getByText("Performing Save...")).toHaveAttribute(
        "aria-live",
        "polite",
      );

      // Wait for completion
      await waitFor(() => {
        expect(
          screen.getByText("Save completed successfully"),
        ).toBeInTheDocument();
      });

      // Alert should be announced
      expect(screen.getByText("Save completed")).toBeInTheDocument();
      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "assertive");

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Error Recovery Feedback", () => {
    const ErrorRecoverySystem = () => {
      const [errors, setErrors] = React.useState<
        Array<{
          id: string;
          message: string;
          retryable: boolean;
          retryCount: number;
        }>
      >([]);

      const [retrying, setRetrying] = React.useState<string | null>(null);

      const addError = (message: string, retryable = true) => {
        const error = {
          id: Date.now().toString(),
          message,
          retryable,
          retryCount: 0,
        };
        setErrors((prev) => [...prev, error]);
      };

      const retry = async (errorId: string) => {
        setRetrying(errorId);

        // Simulate retry
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setErrors((prev) =>
          prev.map((e) =>
            e.id === errorId ? { ...e, retryCount: e.retryCount + 1 } : e,
          ),
        );

        // Simulate success on second retry
        const error = errors.find((e) => e.id === errorId);
        if (error && error.retryCount >= 1) {
          dismissError(errorId);
          // Show success feedback
        }

        setRetrying(null);
      };

      const dismissError = (errorId: string) => {
        setErrors((prev) => prev.filter((e) => e.id !== errorId));
      };

      return (
        <>
          <button onClick={() => addError("Network connection failed", true)}>
            Simulate Network Error
          </button>

          <button onClick={() => addError("Permission denied", false)}>
            Simulate Permission Error
          </button>

          <div
            className="error-container"
            role="region"
            aria-label="Error messages"
          >
            {errors.map((error) => (
              <GlassNotification
                key={error.id}
                type="error"
                onClose={() => dismissError(error.id)}
              >
                <p>{error.message}</p>
                {error.retryCount > 0 && (
                  <p>Retry attempt: {error.retryCount}</p>
                )}
                {error.retryable && (
                  <button
                    onClick={() => retry(error.id)}
                    disabled={retrying === error.id}
                  >
                    {retrying === error.id ? (
                      <>
                        <GlassSpinner size="tiny" inline />
                        Retrying...
                      </>
                    ) : (
                      "Retry"
                    )}
                  </button>
                )}
              </GlassNotification>
            ))}
          </div>
        </>
      );
    };

    it("should handle error retry workflow", async () => {
      render(<ErrorRecoverySystem />);

      // Simulate network error
      await user.click(screen.getByText("Simulate Network Error"));

      // Error should appear with retry option
      expect(screen.getByText("Network connection failed")).toBeInTheDocument();
      const retryButton = screen.getByText("Retry");
      expect(retryButton).toBeInTheDocument();

      // Click retry
      await user.click(retryButton);

      // Should show retrying state
      expect(screen.getByText("Retrying...")).toBeInTheDocument();
      expect(retryButton).toBeDisabled();

      // Should show retry count
      await waitFor(() => {
        expect(screen.getByText("Retry attempt: 1")).toBeInTheDocument();
      });

      // Retry again for success
      await user.click(screen.getByText("Retry"));

      // Error should be dismissed on success
      await waitFor(() => {
        expect(
          screen.queryByText("Network connection failed"),
        ).not.toBeInTheDocument();
      });
    });

    it("should handle non-retryable errors", async () => {
      render(<ErrorRecoverySystem />);

      // Simulate permission error
      await user.click(screen.getByText("Simulate Permission Error"));

      // Error should appear without retry option
      expect(screen.getByText("Permission denied")).toBeInTheDocument();
      expect(screen.queryByText("Retry")).not.toBeInTheDocument();

      // Should still be dismissible
      const closeButton = screen.getByLabelText(/close|dismiss/i);
      await user.click(closeButton);

      expect(screen.queryByText("Permission denied")).not.toBeInTheDocument();
    });
  });
});
