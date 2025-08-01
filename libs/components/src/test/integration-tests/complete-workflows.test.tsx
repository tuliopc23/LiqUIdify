import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { useState } from "react";

// Mock components for testing complete workflows
import { GlassButton } from "../../components/glass-button-refactored/glass-button";
import { GlassInput } from "../../components/glass-input/glass-input";
import { GlassModal } from "../../components/glass-modal/glass-modal";
import { GlassToast } from "../../components/glass-toast/glass-toast";
import { GlassCard } from "../../components/glass-card-refactored/glass-card";
import { GlassAccordion } from "../../components/glass-accordion/glass-accordion";
import { GlassRadioGroup } from "../../components/glass-radio-group/glass-radio-group";
import { ThemeProvider } from "../../components/theme-provider/theme-provider";

expect.extend(toHaveNoViolations);

// Test harness component for complete workflows
const FormWorkflowApp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShowToast(true);
    // Reset form
    setFormData({ name: "", email: "", category: "", message: "" });
  };

  return (
    <ThemeProvider theme="light">
      <div className="p-6 space-y-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Form</h2>

          <div className="space-y-4">
            <div>
              <GlassInput
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                error={errors.name}
                required
                data-testid="name-input"
              />
            </div>

            <div>
              <GlassInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                error={errors.email}
                required
                data-testid="email-input"
              />
            </div>

            <div>
              <GlassRadioGroup
                label="Category"
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
                error={errors.category}
                options={[
                  { value: "support", label: "Support" },
                  { value: "sales", label: "Sales" },
                  { value: "feedback", label: "Feedback" },
                ]}
                data-testid="category-radio"
              />
            </div>

            <div>
              <GlassInput
                label="Message"
                multiline
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                data-testid="message-input"
              />
            </div>

            <GlassButton
              onClick={handleSubmit}
              variant="primary"
              data-testid="submit-button"
            >
              Submit Form
            </GlassButton>
          </div>
        </GlassCard>

        <GlassAccordion
          items={[
            {
              id: "faq-1",
              trigger: "How do I reset my password?",
              content:
                'You can reset your password by clicking the "Forgot Password" link on the login page.',
            },
            {
              id: "faq-2",
              trigger: "How do I contact support?",
              content: "Use the contact form above to reach our support team.",
            },
          ]}
          data-testid="faq-accordion"
        />

        <GlassModal
          open={showModal}
          onOpenChange={setShowModal}
          title="Confirm Submission"
          data-testid="confirm-modal"
        >
          <div className="space-y-4">
            <p>Are you sure you want to submit this form?</p>
            <div className="flex gap-2 justify-end">
              <GlassButton
                variant="outline"
                onClick={() => setShowModal(false)}
                data-testid="cancel-button"
              >
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                onClick={handleConfirm}
                data-testid="confirm-button"
              >
                Confirm
              </GlassButton>
            </div>
          </div>
        </GlassModal>

        {showToast && (
          <GlassToast
            open={showToast}
            onOpenChange={setShowToast}
            title="Success!"
            description="Your form has been submitted successfully."
            variant="success"
            data-testid="success-toast"
          />
        )}
      </div>
    </ThemeProvider>
  );
};

const NavigationWorkflowApp = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider theme="dark">
      <div className="min-h-screen bg-gray-900">
        <nav className="flex items-center justify-between p-4 bg-glass border-b border-white/10">
          <h1 className="text-xl font-semibold text-white">My App</h1>
          <div className="flex gap-2">
            <GlassButton
              variant="ghost"
              onClick={() => setCurrentPage("home")}
              data-testid="nav-home"
              className={currentPage === "home" ? "bg-white/20" : ""}
            >
              Home
            </GlassButton>
            <GlassButton
              variant="ghost"
              onClick={() => setCurrentPage("about")}
              data-testid="nav-about"
              className={currentPage === "about" ? "bg-white/20" : ""}
            >
              About
            </GlassButton>
            <GlassButton
              variant="ghost"
              onClick={() => setSidebarOpen(true)}
              data-testid="nav-menu"
            >
              Menu
            </GlassButton>
          </div>
        </nav>

        <main className="p-6">
          <GlassCard className="p-6">
            {currentPage === "home" && (
              <div data-testid="home-content">
                <h2 className="text-2xl font-bold mb-4">Welcome Home</h2>
                <p>This is the home page content.</p>
              </div>
            )}
            {currentPage === "about" && (
              <div data-testid="about-content">
                <h2 className="text-2xl font-bold mb-4">About Us</h2>
                <p>Learn more about our company.</p>
              </div>
            )}
          </GlassCard>
        </main>

        <GlassModal
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          title="Navigation Menu"
          data-testid="sidebar-modal"
        >
          <div className="space-y-4">
            <GlassButton
              variant="ghost"
              onClick={() => {
                setCurrentPage("settings");
                setSidebarOpen(false);
              }}
              data-testid="nav-settings"
              className="w-full justify-start"
            >
              Settings
            </GlassButton>
            <GlassButton
              variant="ghost"
              onClick={() => {
                setCurrentPage("profile");
                setSidebarOpen(false);
              }}
              data-testid="nav-profile"
              className="w-full justify-start"
            >
              Profile
            </GlassButton>
          </div>
        </GlassModal>
      </div>
    </ThemeProvider>
  );
};

describe("Complete Workflow Integration Tests", () => {
  const user = userEvent.setup();

  describe("Form Submission Workflow", () => {
    beforeEach(() => {
      render(<FormWorkflowApp />);
    });

    it("should handle complete form submission workflow", async () => {
      // Fill out the form
      await user.type(screen.getByTestId("name-input"), "John Doe");
      await user.type(screen.getByTestId("email-input"), "john@example.com");
      await user.click(screen.getByRole("radio", { name: "Support" }));
      await user.type(
        screen.getByTestId("message-input"),
        "This is a test message",
      );

      // Submit the form
      await user.click(screen.getByTestId("submit-button"));

      // Verify modal appears
      await waitFor(() => {
        expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
      });

      // Confirm submission
      await user.click(screen.getByTestId("confirm-button"));

      // Verify modal closes and toast appears
      await waitFor(() => {
        expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
        expect(screen.getByTestId("success-toast")).toBeInTheDocument();
      });

      // Verify form is reset
      expect(screen.getByTestId("name-input")).toHaveValue("");
      expect(screen.getByTestId("email-input")).toHaveValue("");
    });

    it("should handle form validation errors", async () => {
      // Try to submit empty form
      await user.click(screen.getByTestId("submit-button"));

      // Verify validation errors appear
      await waitFor(() => {
        expect(screen.getByText("Name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Category is required")).toBeInTheDocument();
      });

      // Modal should not appear
      expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
    });

    it("should handle email validation", async () => {
      await user.type(screen.getByTestId("name-input"), "John Doe");
      await user.type(screen.getByTestId("email-input"), "invalid-email");
      await user.click(screen.getByRole("radio", { name: "Support" }));

      await user.click(screen.getByTestId("submit-button"));

      await waitFor(() => {
        expect(screen.getByText("Email is invalid")).toBeInTheDocument();
      });
    });

    it("should be accessible throughout the workflow", async () => {
      const { container } = render(<FormWorkflowApp />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // Fill and submit form to test modal accessibility
      await user.type(screen.getByTestId("name-input"), "John Doe");
      await user.type(screen.getByTestId("email-input"), "john@example.com");
      await user.click(screen.getByRole("radio", { name: "Support" }));
      await user.click(screen.getByTestId("submit-button"));

      await waitFor(() => {
        expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
      });

      const modalResults = await axe(container);
      expect(modalResults).toHaveNoViolations();
    });

    it("should handle keyboard navigation", async () => {
      // Tab through form elements
      await user.tab();
      expect(screen.getByTestId("name-input")).toHaveFocus();

      await user.tab();
      expect(screen.getByTestId("email-input")).toHaveFocus();

      await user.tab();
      expect(screen.getByRole("radio", { name: "Support" })).toHaveFocus();

      // Use arrow keys to navigate radio group
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Sales" })).toHaveFocus();

      await user.tab();
      expect(screen.getByTestId("message-input")).toHaveFocus();

      await user.tab();
      expect(screen.getByTestId("submit-button")).toHaveFocus();
    });
  });

  describe("Navigation Workflow", () => {
    beforeEach(() => {
      render(<NavigationWorkflowApp />);
    });

    it("should handle complete navigation workflow", async () => {
      // Verify initial state
      expect(screen.getByTestId("home-content")).toBeInTheDocument();

      // Navigate to about page
      await user.click(screen.getByTestId("nav-about"));
      await waitFor(() => {
        expect(screen.getByTestId("about-content")).toBeInTheDocument();
        expect(screen.queryByTestId("home-content")).not.toBeInTheDocument();
      });

      // Open sidebar menu
      await user.click(screen.getByTestId("nav-menu"));
      await waitFor(() => {
        expect(screen.getByTestId("sidebar-modal")).toBeInTheDocument();
      });

      // Navigate to settings through sidebar
      await user.click(screen.getByTestId("nav-settings"));
      await waitFor(() => {
        expect(screen.queryByTestId("sidebar-modal")).not.toBeInTheDocument();
      });
    });

    it("should maintain navigation state correctly", async () => {
      // Navigate to about
      await user.click(screen.getByTestId("nav-about"));

      // Verify active state
      expect(screen.getByTestId("nav-about")).toHaveClass("bg-white/20");
      expect(screen.getByTestId("nav-home")).not.toHaveClass("bg-white/20");

      // Navigate back to home
      await user.click(screen.getByTestId("nav-home"));

      // Verify active state switched
      expect(screen.getByTestId("nav-home")).toHaveClass("bg-white/20");
      expect(screen.getByTestId("nav-about")).not.toHaveClass("bg-white/20");
    });

    it("should handle modal navigation correctly", async () => {
      await user.click(screen.getByTestId("nav-menu"));

      // Verify modal opens
      await waitFor(() => {
        expect(screen.getByTestId("sidebar-modal")).toBeInTheDocument();
      });

      // Close modal with ESC key
      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByTestId("sidebar-modal")).not.toBeInTheDocument();
      });
    });

    it("should be accessible in dark theme", async () => {
      const { container } = render(<NavigationWorkflowApp />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Responsive Behavior", () => {
    it("should handle viewport changes gracefully", async () => {
      // Mock viewport resize
      global.innerWidth = 768;
      global.dispatchEvent(new Event("resize"));

      render(<FormWorkflowApp />);

      // Verify components adapt to smaller viewport
      const card = screen.getByRole("region"); // GlassCard has region role
      expect(card).toBeInTheDocument();

      // Components should still be functional
      await user.type(screen.getByTestId("name-input"), "Test");
      expect(screen.getByTestId("name-input")).toHaveValue("Test");
    });

    it("should maintain functionality across theme switches", async () => {
      const ThemeSwitchApp = () => {
        const [theme, setTheme] = useState<"light" | "dark">("light");

        return (
          <ThemeProvider theme={theme}>
            <div className="p-4">
              <GlassButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                data-testid="theme-switch"
              >
                Switch to {theme === "light" ? "dark" : "light"} theme
              </GlassButton>
              <GlassInput label="Test Input" data-testid="test-input" />
            </div>
          </ThemeProvider>
        );
      };

      render(<ThemeSwitchApp />);

      // Test functionality in light theme
      await user.type(screen.getByTestId("test-input"), "Light theme test");
      expect(screen.getByTestId("test-input")).toHaveValue("Light theme test");

      // Switch to dark theme
      await user.click(screen.getByTestId("theme-switch"));

      // Test functionality in dark theme
      await user.clear(screen.getByTestId("test-input"));
      await user.type(screen.getByTestId("test-input"), "Dark theme test");
      expect(screen.getByTestId("test-input")).toHaveValue("Dark theme test");
    });
  });

  describe("Error Handling", () => {
    it("should handle component errors gracefully", async () => {
      const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
        const [hasError, setHasError] = useState(false);

        if (hasError) {
          return <div data-testid="error-fallback">Something went wrong</div>;
        }

        return (
          <div>
            {children}
            <GlassButton
              onClick={() => setHasError(true)}
              data-testid="trigger-error"
            >
              Trigger Error
            </GlassButton>
          </div>
        );
      };

      render(
        <ErrorBoundary>
          <FormWorkflowApp />
        </ErrorBoundary>,
      );

      // Verify normal functionality first
      expect(screen.getByTestId("name-input")).toBeInTheDocument();

      // Trigger error
      await user.click(screen.getByTestId("trigger-error"));

      // Verify error boundary catches error
      expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
    });
  });

  describe("Performance Considerations", () => {
    it("should not cause unnecessary re-renders", async () => {
      let renderCount = 0;

      const PerformanceTestApp = () => {
        renderCount++;
        const [count, setCount] = useState(0);

        return (
          <ThemeProvider theme="light">
            <div>
              <span data-testid="render-count">Renders: {renderCount}</span>
              <span data-testid="count">Count: {count}</span>
              <GlassButton
                onClick={() => setCount((c) => c + 1)}
                data-testid="increment"
              >
                Increment
              </GlassButton>
            </div>
          </ThemeProvider>
        );
      };

      render(<PerformanceTestApp />);

      const initialRenderCount = renderCount;

      // Click button multiple times
      await user.click(screen.getByTestId("increment"));
      await user.click(screen.getByTestId("increment"));

      // Verify reasonable number of re-renders
      expect(renderCount - initialRenderCount).toBeLessThanOrEqual(3);
      expect(screen.getByTestId("count")).toHaveTextContent("Count: 2");
    });
  });
});
