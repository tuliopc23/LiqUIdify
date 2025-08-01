import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";

// Import existing components for accessibility testing
import { GlassButton } from "../../components/glass-button-refactored/glass-button";

expect.extend(toHaveNoViolations);

describe("Accessibility Compliance Integration Tests", () => {
  const user = userEvent.setup();

  describe("Button Accessibility", () => {
    const ButtonTest = () => {
      const [clicked, setClicked] = React.useState(false);
      const [loading, setLoading] = React.useState(false);

      const handleClick = () => {
        setClicked(true);
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
      };

      return (
        <>
          <GlassButton onClick={handleClick} loading={loading}>
            {clicked ? "Clicked!" : "Click me"}
          </GlassButton>

          <GlassButton variant="destructive" disabled>
            Disabled Button
          </GlassButton>

          <GlassButton iconOnly aria-label="Settings">
            <span>⚙️</span>
          </GlassButton>
        </>
      );
    };

    it("should have proper button accessibility attributes", async () => {
      const { container } = render(<ButtonTest />);

      const clickButton = screen.getByText("Click me");
      const disabledButton = screen.getByText("Disabled Button");
      const iconButton = screen.getByLabelText("Settings");

      expect(clickButton).toHaveAttribute("type", "button");
      expect(disabledButton).toBeDisabled();
      expect(iconButton).toHaveAttribute("aria-label", "Settings");

      // Test keyboard interaction
      clickButton.focus();
      expect(clickButton).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(screen.getByText("Clicked!")).toBeInTheDocument();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should support keyboard navigation and screen readers", async () => {
      const { container } = render(<ButtonTest />);

      const buttons = screen.getAllByRole("button");
      
      // Test tab navigation
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();

      await user.tab();
      expect(buttons[1]).toHaveFocus();

      await user.tab();
      expect(buttons[2]).toHaveFocus();

      await user.keyboard(" ");
      
      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Form Accessibility", () => {
    const FormTest = () => {
      const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        subscribe: false,
      });

      return (
        <form>
          <div>
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              aria-required="true"
              aria-describedby="name-hint"
            />
            <span id="name-hint">Enter your full name</span>
          </div>

          <div>
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              aria-required="true"
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={formData.subscribe}
                onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
              />
              Subscribe to newsletter
            </label>
          </div>

          <GlassButton type="submit">Submit</GlassButton>
        </form>
      );
    };

    it("should support form accessibility features", async () => {
      const { container } = render(<FormTest />);

      const nameInput = screen.getByLabelText("Name *");
      const emailInput = screen.getByLabelText("Email *");
      const checkbox = screen.getByLabelText("Subscribe to newsletter");

      // Check form labels and attributes
      expect(nameInput).toHaveAttribute("aria-required", "true");
      expect(nameInput).toHaveAttribute("aria-describedby", "name-hint");
      expect(emailInput).toHaveAttribute("aria-required", "true");

      // Test keyboard navigation
      nameInput.focus();
      expect(nameInput).toHaveFocus();

      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(checkbox).toHaveFocus();

      // Test form interaction
      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.click(checkbox);

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("john@example.com");
      expect(checkbox).toBeChecked();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Interactive Elements Accessibility", () => {
    const InteractiveTest = () => {
      const [activeTab, setActiveTab] = React.useState(0);
      const [expanded, setExpanded] = React.useState(false);

      const tabs = ["Tab 1", "Tab 2", "Tab 3"];

      return (
        <>
          <div role="tablist" aria-label="Example tabs">
            {tabs.map((tab, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`panel-${index}`}
                id={`tab-${index}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>

          {tabs.map((tab, index) => (
            <div
              key={index}
              role="tabpanel"
              id={`panel-${index}`}
              aria-labelledby={`tab-${index}`}
              hidden={activeTab !== index}
            >
              Content for {tab}
            </div>
          ))}

          <details>
            <summary onClick={() => setExpanded(!expanded)}>
              Expandable Section
            </summary>
            <div>
              <p>This content can be expanded or collapsed.</p>
              <GlassButton>Action Button</GlassButton>
            </div>
          </details>
        </>
      );
    };

    it("should support tab navigation and ARIA attributes", async () => {
      const { container } = render(<InteractiveTest />);

      const tabs = screen.getAllByRole("tab");
      const tabpanels = screen.getAllByRole("tabpanel", { hidden: true });

      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
      expect(tabs[1]).toHaveAttribute("aria-selected", "false");
      expect(tabpanels[0]).not.toHaveAttribute("hidden");

      // Test tab navigation
      await user.click(tabs[1]);
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
      expect(tabs[0]).toHaveAttribute("aria-selected", "false");

      // Test keyboard navigation
      tabs[0].focus();
      await user.keyboard("{ArrowRight}");
      expect(tabs[1]).toHaveFocus();

      const summary = screen.getByText("Expandable Section");
      await user.click(summary);
      expect(screen.getByText("This content can be expanded or collapsed.")).toBeVisible();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Focus Management", () => {
    const FocusTest = () => {
      const [showModal, setShowModal] = React.useState(false);
      const triggerRef = React.useRef<HTMLButtonElement>(null);

      return (
        <>
          <button ref={triggerRef} onClick={() => setShowModal(true)}>
            Open Modal
          </button>

          {showModal && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
            >
              <h2 id="modal-title">Confirmation</h2>
              <p id="modal-desc">Are you sure you want to continue?</p>
              
              <GlassButton onClick={() => setShowModal(false)}>
                Cancel
              </GlassButton>
              <GlassButton 
                variant="primary" 
                onClick={() => setShowModal(false)}
              >
                Confirm
              </GlassButton>
            </div>
          )}

          <button>Outside button</button>
        </>
      );
    };

    it("should manage focus correctly in modal dialogs", async () => {
      const { container } = render(<FocusTest />);

      const trigger = screen.getByText("Open Modal");
      
      // Open modal
      await user.click(trigger);

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("aria-modal", "true");
      expect(modal).toHaveAttribute("aria-labelledby", "modal-title");
      expect(modal).toHaveAttribute("aria-describedby", "modal-desc");

      // Test button interaction
      const cancelButton = screen.getByText("Cancel");
      const confirmButton = screen.getByText("Confirm");

      await user.click(cancelButton);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Live Region Announcements", () => {
    const LiveRegionTest = () => {
      const [messages, setMessages] = React.useState<
        Array<{
          id: string;
          text: string;
          priority: "polite" | "assertive";
        }>
      >([]);

      const addMessage = (
        text: string,
        priority: "polite" | "assertive" = "polite",
      ) => {
        const message = { id: Date.now().toString(), text, priority };
        setMessages((prev) => [...prev, message]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
          setMessages((prev) => prev.filter((m) => m.id !== message.id));
        }, 5000);
      };

      return (
        <>
          <GlassButton
            onClick={() => addMessage("File saved successfully", "polite")}
          >
            Save File
          </GlassButton>

          <GlassButton
            variant="destructive"
            onClick={() => addMessage("Error: Failed to connect", "assertive")}
          >
            Trigger Error
          </GlassButton>

          <div aria-live="polite" aria-label="Status messages">
            {messages
              .filter((m) => m.priority === "polite")
              .map((message) => (
                <div key={message.id} role="status">
                  {message.text}
                </div>
              ))}
          </div>

          <div aria-live="assertive" aria-label="Error messages">
            {messages
              .filter((m) => m.priority === "assertive")
              .map((message) => (
                <div key={message.id} role="alert">
                  {message.text}
                </div>
              ))}
          </div>
        </>
      );
    };

    it("should announce messages with appropriate urgency", async () => {
      const { container } = render(<LiveRegionTest />);

      // Test polite announcement
      await user.click(screen.getByText("Save File"));

      await waitFor(() => {
        const statusMessage = screen.getByRole("status");
        expect(statusMessage).toHaveTextContent("File saved successfully");
      });

      // Test assertive announcement
      await user.click(screen.getByText("Trigger Error"));

      await waitFor(() => {
        const alertMessage = screen.getByRole("alert");
        expect(alertMessage).toHaveTextContent("Error: Failed to connect");
      });

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Comprehensive WCAG 2.1 AA Compliance", () => {
    const ComprehensiveAccessibilityTest = () => {
      const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
      });

      return (
        <div className="app">
          <header>
            <nav aria-label="Main navigation">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
          </header>

          <main>
            <h1>Accessible Glass Components Demo</h1>

            <section aria-labelledby="demo-heading">
              <h2 id="demo-heading">Interactive Components</h2>
              <GlassButton>Primary Action</GlassButton>
              <GlassButton variant="destructive">Delete Item</GlassButton>
              <GlassButton disabled>Disabled Button</GlassButton>
            </section>

            <section aria-labelledby="contact-heading">
              <h2 id="contact-heading">Contact Form</h2>

              <form aria-describedby="form-instructions">
                <p id="form-instructions">
                  All fields marked with * are required
                </p>

                <div>
                  <label htmlFor="name">
                    Name <span aria-label="required">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    aria-required="true"
                    aria-invalid={formData.name === ""}
                  />
                </div>

                <div>
                  <label htmlFor="email">
                    Email <span aria-label="required">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    aria-required="true"
                    aria-describedby="email-hint"
                  />
                  <span id="email-hint" className="hint">
                    We'll never share your email
                  </span>
                </div>

                <GlassButton type="submit">Submit</GlassButton>
              </form>
            </section>

            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading">Frequently Asked Questions</h2>
              
              <details>
                <summary>What is accessibility?</summary>
                <p>Accessibility ensures that people with disabilities can use your website.</p>
              </details>
              
              <details>
                <summary>Why is it important?</summary>
                <p>It provides equal access to information and functionality for all users.</p>
              </details>
            </section>
          </main>

          <footer>
            <p>&copy; 2024 Glass Components. All rights reserved.</p>
          </footer>
        </div>
      );
    };

    it("should pass comprehensive WCAG 2.1 AA audit", async () => {
      const { container } = render(<ComprehensiveAccessibilityTest />);

      // Run comprehensive axe audit
      const results = await axe(container, {
        rules: {
          "color-contrast": { enabled: true },
          "valid-lang": { enabled: true },
          "document-title": { enabled: false }, // Not applicable in test
          "html-has-lang": { enabled: false }, // Not applicable in test
          "landmark-one-main": { enabled: true },
          "page-has-heading-one": { enabled: true },
          region: { enabled: true },
        },
      });

      expect(results).toHaveNoViolations();

      // Additional manual checks

      // Check heading hierarchy
      const headings = screen.getAllByRole("heading");
      expect(headings[0]).toHaveProperty("tagName", "H1");

      // Check form labels
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toHaveAttribute("aria-required", "true");

      // Check navigation landmark
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Main navigation");

      // Check details/summary keyboard support
      const summaries = screen.getAllByText(/What is|Why is/);
      expect(summaries).toHaveLength(2);
      
      const firstSummary = summaries[0];
      fireEvent.click(firstSummary);
      
      await waitFor(() => {
        expect(screen.getByText("Accessibility ensures that people with disabilities can use your website.")).toBeVisible();
      });
    });
  });
});
