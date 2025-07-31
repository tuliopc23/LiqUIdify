import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";

// Import complex interactive components
import { GlassModal } from "../../components/glass-modal";
import { GlassPopover } from "../../components/glass-popover";
import { GlassCombobox } from "../../components/glass-combobox";
import { GlassCommand } from "../../components/glass-command";
import { GlassFocusTrap } from "../../components/glass-focus-trap";
import { GlassLiveRegion } from "../../components/glass-live-region";
import { GlassAccessibleDemo } from "../../components/glass-accessible-demo";
import { GlassTooltip } from "../../components/glass-tooltip";
import { GlassAccordion } from "../../components/glass-accordion";
import { GlassDialog } from "../../components/glass-dialog";

expect.extend(toHaveNoViolations);

describe("Accessibility Compliance Integration Tests", () => {
  const user = userEvent.setup();

  describe("Modal Accessibility", () => {
    const ModalTest = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [agreed, setAgreed] = React.useState(false);
      const triggerRef = React.useRef<HTMLButtonElement>(null);

      return (
        <>
          <button ref={triggerRef} onClick={() => setIsOpen(true)}>
            Open Modal
          </button>

          <GlassModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Terms and Conditions"
            returnFocusRef={triggerRef}
          >
            <div>
              <h2 id="modal-heading">Terms of Service</h2>
              <p id="modal-description">
                Please read and agree to our terms before continuing.
              </p>

              <label>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                I agree to the terms
              </label>

              <div className="modal-actions">
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button disabled={!agreed}>Accept</button>
              </div>
            </div>
          </GlassModal>

          <button>Another focusable element</button>
        </>
      );
    };

    it("should trap focus within modal and return focus on close", async () => {
      const { container } = render(<ModalTest />);

      const openButton = screen.getByText("Open Modal");
      const otherButton = screen.getByText("Another focusable element");

      // Open modal
      await user.click(openButton);

      // Modal should be open
      const modal = screen.getByRole("dialog");
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute("aria-modal", "true");
      expect(modal).toHaveAttribute("aria-labelledby");

      // Focus should be inside modal
      expect(document.activeElement).toBe(screen.getByText("Cancel"));

      // Tab through modal elements
      await user.tab();
      expect(document.activeElement).toBe(screen.getByText("Accept"));

      await user.tab();
      expect(document.activeElement).toBe(screen.getByRole("checkbox"));

      // Should cycle back to first element
      await user.tab();
      expect(document.activeElement).toBe(screen.getByText("Cancel"));

      // Outside button should not be focusable
      otherButton.focus();
      expect(document.activeElement).not.toBe(otherButton);

      // Close modal
      await user.keyboard("{Escape}");

      // Focus should return to trigger
      expect(document.activeElement).toBe(openButton);

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should announce modal content to screen readers", async () => {
      render(<ModalTest />);

      await user.click(screen.getByText("Open Modal"));

      const modal = screen.getByRole("dialog");

      // Should have proper ARIA labels
      expect(modal).toHaveAttribute(
        "aria-labelledby",
        expect.stringContaining("modal-heading"),
      );
      expect(modal).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("modal-description"),
      );

      // Should prevent background interaction
      expect(document.body).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Combobox Accessibility", () => {
    const ComboboxTest = () => {
      const [value, setValue] = React.useState("");
      const [announcements, setAnnouncements] = React.useState<string[]>([]);

      const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "date", label: "Date" },
        { value: "elderberry", label: "Elderberry" },
      ];

      return (
        <>
          <GlassCombobox
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Select a fruit"
            label="Favorite Fruit"
            onAnnouncement={(text) =>
              setAnnouncements((prev) => [...prev, text])
            }
          />

          <div
            role="log"
            aria-live="polite"
            aria-label="Screen reader announcements"
          >
            {announcements.map((announcement, i) => (
              <div key={i}>{announcement}</div>
            ))}
          </div>
        </>
      );
    };

    it("should support keyboard navigation and announcements", async () => {
      const { container } = render(<ComboboxTest />);

      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-expanded", "false");
      expect(combobox).toHaveAttribute("aria-autocomplete", "list");

      // Open dropdown
      await user.click(combobox);
      expect(combobox).toHaveAttribute("aria-expanded", "true");

      // Navigate with arrow keys
      await user.keyboard("{ArrowDown}");

      // First option should be highlighted
      const firstOption = screen.getByText("Apple");
      expect(firstOption).toHaveAttribute("aria-selected", "true");

      // Continue navigation
      await user.keyboard("{ArrowDown}");
      const secondOption = screen.getByText("Banana");
      expect(secondOption).toHaveAttribute("aria-selected", "true");
      expect(firstOption).toHaveAttribute("aria-selected", "false");

      // Select with Enter
      await user.keyboard("{Enter}");
      expect(combobox).toHaveValue("Banana");
      expect(combobox).toHaveAttribute("aria-expanded", "false");

      // Check announcements
      const announcements = screen.getByRole("log");
      expect(announcements).toHaveTextContent("Banana selected");

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should support type-ahead functionality", async () => {
      render(<ComboboxTest />);

      const combobox = screen.getByRole("combobox");

      // Type to search
      await user.click(combobox);
      await user.type(combobox, "ch");

      // Should filter and highlight matching option
      expect(screen.getByText("Cherry")).toBeInTheDocument();
      expect(screen.queryByText("Apple")).not.toBeInTheDocument();
      expect(screen.queryByText("Banana")).not.toBeInTheDocument();

      // Clear and search again
      await user.clear(combobox);
      await user.type(combobox, "e");

      // Should show all options starting with 'e'
      expect(screen.getByText("Elderberry")).toBeInTheDocument();
    });
  });

  describe("Command Palette Accessibility", () => {
    const CommandPaletteTest = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [recentCommands, setRecentCommands] = React.useState<string[]>([]);

      const commands = [
        { id: "new-file", label: "New File", shortcut: "⌘N", category: "File" },
        {
          id: "open-file",
          label: "Open File",
          shortcut: "⌘O",
          category: "File",
        },
        {
          id: "save-file",
          label: "Save File",
          shortcut: "⌘S",
          category: "File",
        },
        { id: "find", label: "Find", shortcut: "⌘F", category: "Edit" },
        { id: "replace", label: "Replace", shortcut: "⌘H", category: "Edit" },
      ];

      const executeCommand = (commandId: string) => {
        setRecentCommands((prev) => [...prev, commandId]);
        setIsOpen(false);
      };

      React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.metaKey && e.key === "k") {
            e.preventDefault();
            setIsOpen(true);
          }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
      }, []);

      return (
        <>
          <button onClick={() => setIsOpen(true)}>
            Open Command Palette (⌘K)
          </button>

          <GlassCommand
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            commands={commands}
            onExecute={executeCommand}
            recentCommands={recentCommands.slice(-3)}
          />

          <div>Recent: {recentCommands.join(", ")}</div>
        </>
      );
    };

    it("should provide accessible command palette navigation", async () => {
      const { container } = render(<CommandPaletteTest />);

      // Open command palette
      await user.click(screen.getByText(/Open Command Palette/));

      const searchInput = screen.getByRole("searchbox");
      expect(searchInput).toHaveAttribute(
        "aria-label",
        expect.stringContaining("command"),
      );
      expect(searchInput).toHaveFocus();

      // Should show all commands initially
      expect(screen.getByText("New File")).toBeInTheDocument();
      expect(screen.getByText("Save File")).toBeInTheDocument();

      // Type to filter
      await user.type(searchInput, "file");

      // Should filter commands
      expect(screen.getByText("New File")).toBeInTheDocument();
      expect(screen.queryByText("Find")).not.toBeInTheDocument();

      // Navigate with arrow keys
      await user.keyboard("{ArrowDown}");
      expect(screen.getByText("New File")).toHaveAttribute(
        "aria-selected",
        "true",
      );

      // Execute command
      await user.keyboard("{Enter}");
      expect(screen.getByText("Recent: new-file")).toBeInTheDocument();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should announce command categories and shortcuts", async () => {
      render(<CommandPaletteTest />);

      await user.click(screen.getByText(/Open Command Palette/));

      // Commands should be in a list
      const commandList = screen.getByRole("listbox");
      expect(commandList).toBeInTheDocument();

      // Each command should be an option
      const commands = screen.getAllByRole("option");
      expect(commands.length).toBeGreaterThan(0);

      // Should show shortcuts
      expect(screen.getByText("⌘N")).toBeInTheDocument();
      expect(screen.getByText("⌘S")).toBeInTheDocument();

      // Categories should be marked as headings
      const categories = screen.getAllByRole("heading", { level: 3 });
      expect(categories).toHaveLength(2); // File and Edit
    });
  });

  describe("Focus Management System", () => {
    const FocusManagementTest = () => {
      const [showDialog, setShowDialog] = React.useState(false);
      const [showPopover, setShowPopover] = React.useState(false);
      const buttonRef = React.useRef<HTMLButtonElement>(null);

      return (
        <>
          <GlassFocusTrap active={showDialog || showPopover}>
            <div className="main-content">
              <button onClick={() => setShowDialog(true)}>Show Dialog</button>

              <button
                ref={buttonRef}
                onClick={() => setShowPopover(!showPopover)}
              >
                Toggle Popover
              </button>

              {showDialog && (
                <GlassDialog
                  title="Confirmation"
                  onClose={() => setShowDialog(false)}
                >
                  <p>Are you sure you want to continue?</p>
                  <button onClick={() => setShowDialog(false)}>Cancel</button>
                  <button onClick={() => setShowDialog(false)}>Confirm</button>
                </GlassDialog>
              )}

              {showPopover && (
                <GlassPopover
                  isOpen={showPopover}
                  onClose={() => setShowPopover(false)}
                  anchorRef={buttonRef}
                >
                  <div>
                    <h3>Popover Content</h3>
                    <input placeholder="Type here" />
                    <button>Action</button>
                  </div>
                </GlassPopover>
              )}
            </div>
          </GlassFocusTrap>

          <button>Outside button</button>
        </>
      );
    };

    it("should manage focus correctly with nested overlays", async () => {
      render(<FocusManagementTest />);

      // Open dialog
      await user.click(screen.getByText("Show Dialog"));

      // Focus should be trapped in dialog
      const cancelButton = screen.getByText("Cancel");
      const confirmButton = screen.getByText("Confirm");

      expect(cancelButton).toHaveFocus();

      // Tab through dialog
      await user.tab();
      expect(confirmButton).toHaveFocus();

      await user.tab();
      expect(cancelButton).toHaveFocus(); // Should cycle

      // Close dialog
      await user.click(cancelButton);

      // Focus should return to trigger
      expect(screen.getByText("Show Dialog")).toHaveFocus();
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
          <button
            onClick={() => addMessage("File saved successfully", "polite")}
          >
            Save File
          </button>

          <button
            onClick={() => addMessage("Error: Failed to connect", "assertive")}
          >
            Trigger Error
          </button>

          <button
            onClick={() => {
              addMessage("Processing...", "polite");
              setTimeout(() => addMessage("Process complete", "polite"), 2000);
            }}
          >
            Long Process
          </button>

          <GlassLiveRegion>
            {messages.map((message) => (
              <div
                key={message.id}
                role={message.priority === "assertive" ? "alert" : "status"}
                aria-live={message.priority}
              >
                {message.text}
              </div>
            ))}
          </GlassLiveRegion>

          <div className="visual-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.priority}`}>
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

      const statusMessage = screen.getByRole("status");
      expect(statusMessage).toHaveTextContent("File saved successfully");
      expect(statusMessage).toHaveAttribute("aria-live", "polite");

      // Test assertive announcement
      await user.click(screen.getByText("Trigger Error"));

      const alertMessage = screen.getByRole("alert");
      expect(alertMessage).toHaveTextContent("Error: Failed to connect");
      expect(alertMessage).toHaveAttribute("aria-live", "assertive");

      // Test sequential announcements
      await user.click(screen.getByText("Long Process"));

      expect(screen.getByText("Processing...")).toBeInTheDocument();

      await waitFor(
        () => {
          expect(screen.getByText("Process complete")).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

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

            <GlassAccessibleDemo />

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

                <button type="submit">Submit</button>
              </form>
            </section>

            <GlassAccordion
              items={[
                {
                  id: "faq-1",
                  trigger: "What is accessibility?",
                  content:
                    "Accessibility ensures that people with disabilities can use your website.",
                },
                {
                  id: "faq-2",
                  trigger: "Why is it important?",
                  content:
                    "It provides equal access to information and functionality for all users.",
                },
              ]}
            />
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

      // Check accordion keyboard support
      const accordionButtons = screen.getAllByRole("button", {
        name: /What is|Why is/,
      });
      accordionButtons[0].focus();

      fireEvent.keyDown(accordionButtons[0], { key: "Enter" });
      await waitFor(() => {
        expect(accordionButtons[0]).toHaveAttribute("aria-expanded", "true");
      });
    });
  });
});
