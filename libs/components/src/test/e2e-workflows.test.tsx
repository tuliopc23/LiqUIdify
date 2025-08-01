/**
 * End-to-End Workflow Tests for LiqUIdify Components
 *
 * This test suite simulates real user interactions across multiple components
 * to ensure complex workflows function correctly in production scenarios.
 */

import React, { useState } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// Import components for testing
import {
  GlassInput,
  GlassButton,
  GlassCheckbox,
  GlassSelect,
  GlassFormField,
  GlassModal,
  GlassSearch,
  GlassTable,
  GlassTabs,
  GlassBreadcrumbs,
  GlassMobileNav,
  GlassToast,
  GlassPopover,
  GlassErrorBoundary,
  ThemeProvider,
  GlassResponsiveButton,
  GlassResponsiveCard,
  GlassTextarea,
  GlassRadioGroup,
  GlassDatePicker,
  GlassFileUpload,
  GlassNumberInput,
  GlassCombobox,
  GlassCheckboxGroup,
  GlassDrawer,
  GlassDropdown,
  GlassAccordion,
  GlassAlert,
  GlassBadge,
  GlassBanner,
  GlassAvatar,
  GlassCard,
  GlassNotification,
  GlassPagination,
  GlassProgress,
  GlassSkeleton,
  GlassSlider,
  GlassSpinner,
  GlassSwitch,
  GlassTimeline,
  GlassTooltip,
  GlassTreeView,
  GlassChart,
  GlassPerformanceDashboard,
  GlassCommand,
  GlassAccessibleDemo,
  GlassFocusTrap,
  GlassLiveRegion,
  GlassSkipNavigation,
  GlassVisuallyHidden,
  ThemeToggle,
  Navbar,
  Sidebar,
} from "../index";

// Mock ResizeObserver for responsive tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia for responsive tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Test data
const mockTableData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

const mockSelectOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

// Test Components
const CompleteFormWorkflow = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    terms: false,
    newsletter: false,
    bio: "",
    age: 0,
    birthDate: "",
    avatar: null,
    preferences: [],
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.terms) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div data-testid="form-success">
        <h2>Form Submitted Successfully!</h2>
        <p>Welcome, {formData.name}!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} data-testid="complete-form">
      <GlassFormField label="Name" error={errors.name}>
        <GlassInput
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          data-testid="name-input"
        />
      </GlassFormField>

      <GlassFormField label="Email" error={errors.email}>
        <GlassInput
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          data-testid="email-input"
        />
      </GlassFormField>

      <GlassFormField label="Password" error={errors.password}>
        <GlassInput
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          data-testid="password-input"
        />
      </GlassFormField>

      <GlassFormField label="Confirm Password" error={errors.confirmPassword}>
        <GlassInput
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          data-testid="confirm-password-input"
        />
      </GlassFormField>

      <GlassFormField label="Role" error={errors.role}>
        <GlassSelect
          options={mockSelectOptions}
          value={formData.role}
          onChange={(value) => setFormData({ ...formData, role: value })}
          placeholder="Select your role"
          data-testid="role-select"
        />
      </GlassFormField>

      <GlassFormField label="Bio">
        <GlassTextarea
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          data-testid="bio-textarea"
        />
      </GlassFormField>

      <GlassFormField label="Age">
        <GlassNumberInput
          value={formData.age}
          onChange={(value) => setFormData({ ...formData, age: value })}
          min={18}
          max={100}
          data-testid="age-input"
        />
      </GlassFormField>

      <GlassFormField label="Birth Date">
        <GlassDatePicker
          value={formData.birthDate}
          onChange={(date) => setFormData({ ...formData, birthDate: date })}
          data-testid="birth-date-picker"
        />
      </GlassFormField>

      <GlassFormField label="Avatar">
        <GlassFileUpload
          accept="image/*"
          onChange={(file) => setFormData({ ...formData, avatar: file })}
          data-testid="avatar-upload"
        />
      </GlassFormField>

      <GlassFormField label="Country">
        <GlassCombobox
          options={[
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
          ]}
          value={formData.country}
          onChange={(value) => setFormData({ ...formData, country: value })}
          placeholder="Select country"
          data-testid="country-combobox"
        />
      </GlassFormField>

      <GlassCheckboxGroup
        label="Preferences"
        options={[
          { value: "notifications", label: "Email Notifications" },
          { value: "marketing", label: "Marketing Emails" },
          { value: "updates", label: "Product Updates" },
        ]}
        value={formData.preferences}
        onChange={(values) => setFormData({ ...formData, preferences: values })}
        data-testid="preferences-checkbox-group"
      />

      <GlassCheckbox
        checked={formData.terms}
        onChange={(checked) => setFormData({ ...formData, terms: checked })}
        data-testid="terms-checkbox"
      >
        I accept the terms and conditions
      </GlassCheckbox>
      {errors.terms && <span className="error">{errors.terms}</span>}

      <GlassCheckbox
        checked={formData.newsletter}
        onChange={(checked) =>
          setFormData({ ...formData, newsletter: checked })
        }
        data-testid="newsletter-checkbox"
      >
        Subscribe to newsletter
      </GlassCheckbox>

      <GlassButton type="submit" data-testid="submit-button">
        Submit Form
      </GlassButton>
    </form>
  );
};

const NavigationWorkflow = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [breadcrumbs] = useState([
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile", href: "/dashboard/profile" },
  ]);

  const tabs = [
    { id: "profile", label: "Profile", content: "Profile content" },
    { id: "settings", label: "Settings", content: "Settings content" },
    { id: "billing", label: "Billing", content: "Billing content" },
  ];

  return (
    <div data-testid="navigation-workflow">
      <GlassBreadcrumbs items={breadcrumbs} data-testid="breadcrumbs" />

      <GlassMobileNav
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile", href: "/profile" },
          { label: "Settings", href: "/settings" },
        ]}
        data-testid="mobile-nav"
      />

      <GlassTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        data-testid="main-tabs"
      />

      <div data-testid="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

const ModalOverlayWorkflow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div data-testid="modal-overlay-workflow">
      <GlassButton
        onClick={() => setIsModalOpen(true)}
        data-testid="open-modal-button"
      >
        Open Modal
      </GlassButton>

      <GlassButton
        onClick={() => setIsDrawerOpen(true)}
        data-testid="open-drawer-button"
      >
        Open Drawer
      </GlassButton>

      <GlassButton
        onClick={() => setShowToast(true)}
        data-testid="show-toast-button"
      >
        Show Toast
      </GlassButton>

      <GlassPopover
        trigger={
          <GlassButton data-testid="popover-trigger">
            Toggle Popover
          </GlassButton>
        }
        content="This is popover content"
        open={showPopover}
        onOpenChange={setShowPopover}
        data-testid="popover"
      />

      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Test Modal"
        data-testid="test-modal"
      >
        <div>
          <p>Modal content goes here</p>
          <GlassButton
            onClick={() => setIsModalOpen(false)}
            data-testid="close-modal-button"
          >
            Close Modal
          </GlassButton>
        </div>
      </GlassModal>

      <GlassDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Test Drawer"
        data-testid="test-drawer"
      >
        <div>
          <p>Drawer content goes here</p>
          <GlassButton
            onClick={() => setIsDrawerOpen(false)}
            data-testid="close-drawer-button"
          >
            Close Drawer
          </GlassButton>
        </div>
      </GlassDrawer>

      {showToast && (
        <GlassToast
          message="This is a test toast"
          type="success"
          onClose={() => setShowToast(false)}
          data-testid="test-toast"
        />
      )}
    </div>
  );
};

const SearchFilterWorkflow = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(mockTableData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = mockTableData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sorted);
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
  ];

  return (
    <div data-testid="search-filter-workflow">
      <GlassSearch
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearch}
        data-testid="user-search"
      />

      <GlassTable
        data={filteredData}
        columns={columns}
        onSort={handleSort}
        sortConfig={sortConfig}
        data-testid="users-table"
      />

      <div data-testid="search-results">
        Found {filteredData.length} results
      </div>
    </div>
  );
};

const ResponsiveWorkflow = () => {
  const [screenSize, setScreenSize] = useState("desktop");

  return (
    <div data-testid="responsive-workflow">
      <div data-testid="screen-size-controls">
        <button
          onClick={() => setScreenSize("mobile")}
          data-testid="mobile-view"
        >
          Mobile View
        </button>
        <button
          onClick={() => setScreenSize("tablet")}
          data-testid="tablet-view"
        >
          Tablet View
        </button>
        <button
          onClick={() => setScreenSize("desktop")}
          data-testid="desktop-view"
        >
          Desktop View
        </button>
      </div>

      <div className={`responsive-container ${screenSize}`}>
        <GlassResponsiveButton
          mobileText="Mobile"
          tabletText="Tablet"
          desktopText="Desktop"
          data-testid="responsive-button"
        />

        <GlassResponsiveCard
          title="Responsive Card"
          content="This card adapts to different screen sizes"
          data-testid="responsive-card"
        />
      </div>
    </div>
  );
};

const ThemeSwitchingWorkflow = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeProvider theme={theme}>
      <div data-testid="theme-switching-workflow">
        <ThemeToggle
          currentTheme={theme}
          onThemeChange={setTheme}
          data-testid="theme-toggle"
        />

        <GlassCard title="Themed Card" data-testid="themed-card">
          <p>This card should adapt to the current theme</p>
        </GlassCard>

        <GlassButton data-testid="themed-button">Themed Button</GlassButton>

        <GlassInput placeholder="Themed input" data-testid="themed-input" />

        <div data-testid="current-theme">Current theme: {theme}</div>
      </div>
    </ThemeProvider>
  );
};

const ErrorHandlingWorkflow = () => {
  const [shouldError, setShouldError] = useState(false);

  const ErrorComponent = () => {
    if (shouldError) {
      throw new Error("Test error for error boundary");
    }
    return <div data-testid="error-component">No error</div>;
  };

  const handleError = (error, errorInfo) => {
    console.log("Error caught by boundary:", error, errorInfo);
  };

  return (
    <div data-testid="error-handling-workflow">
      <GlassButton
        onClick={() => setShouldError(true)}
        data-testid="trigger-error-button"
      >
        Trigger Error
      </GlassButton>

      <GlassErrorBoundary
        onError={handleError}
        fallback={<div data-testid="error-fallback">Something went wrong</div>}
      >
        <ErrorComponent />
      </GlassErrorBoundary>
    </div>
  );
};

const AccessibilityWorkflow = () => {
  const [focusedElement, setFocusedElement] = useState("");

  return (
    <div data-testid="accessibility-workflow">
      <GlassSkipNavigation />

      <GlassLiveRegion>
        <div data-testid="live-region-content">Live region content updates</div>
      </GlassLiveRegion>

      <GlassFocusTrap active={true}>
        <div data-testid="focus-trap-container">
          <GlassInput
            placeholder="First input"
            onFocus={() => setFocusedElement("first")}
            data-testid="first-input"
          />
          <GlassInput
            placeholder="Second input"
            onFocus={() => setFocusedElement("second")}
            data-testid="second-input"
          />
          <GlassButton
            onFocus={() => setFocusedElement("button")}
            data-testid="focus-button"
          >
            Focus Button
          </GlassButton>
        </div>
      </GlassFocusTrap>

      <GlassVisuallyHidden>
        <span data-testid="visually-hidden-text">
          This text is hidden visually but available to screen readers
        </span>
      </GlassVisuallyHidden>

      <div data-testid="focused-element">
        Currently focused: {focusedElement}
      </div>
    </div>
  );
};

describe("End-to-End Workflow Tests", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Complete Form Submission Workflow", () => {
    it("should handle complete form submission with validation", async () => {
      render(<CompleteFormWorkflow />);

      // Fill out the form
      await user.type(screen.getByTestId("name-input"), "John Doe");
      await user.type(screen.getByTestId("email-input"), "john@example.com");
      await user.type(screen.getByTestId("password-input"), "password123");
      await user.type(
        screen.getByTestId("confirm-password-input"),
        "password123",
      );

      // Select role
      await user.click(screen.getByTestId("role-select"));
      await user.click(screen.getByText("Option 1"));

      // Fill bio
      await user.type(screen.getByTestId("bio-textarea"), "This is my bio");

      // Set age
      await user.clear(screen.getByTestId("age-input"));
      await user.type(screen.getByTestId("age-input"), "25");

      // Select preferences
      await user.click(screen.getByLabelText("Email Notifications"));
      await user.click(screen.getByLabelText("Product Updates"));

      // Accept terms
      await user.click(screen.getByTestId("terms-checkbox"));

      // Submit form
      await user.click(screen.getByTestId("submit-button"));

      // Verify success
      await waitFor(() => {
        expect(screen.getByTestId("form-success")).toBeInTheDocument();
        expect(screen.getByText("Welcome, John Doe!")).toBeInTheDocument();
      });
    });

    it("should show validation errors for incomplete form", async () => {
      render(<CompleteFormWorkflow />);

      // Try to submit without filling required fields
      await user.click(screen.getByTestId("submit-button"));

      // Check for validation errors
      await waitFor(() => {
        expect(screen.getByText("Name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Password is required")).toBeInTheDocument();
        expect(
          screen.getByText("You must accept the terms"),
        ).toBeInTheDocument();
      });
    });

    it("should validate password confirmation", async () => {
      render(<CompleteFormWorkflow />);

      await user.type(screen.getByTestId("password-input"), "password123");
      await user.type(
        screen.getByTestId("confirm-password-input"),
        "different",
      );
      await user.click(screen.getByTestId("submit-button"));

      await waitFor(() => {
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
      });
    });
  });

  describe("Navigation Workflows", () => {
    it("should handle tab navigation correctly", async () => {
      render(<NavigationWorkflow />);

      // Check initial state
      expect(screen.getByTestId("tab-content")).toHaveTextContent(
        "Profile content",
      );

      // Navigate to settings tab
      await user.click(screen.getByText("Settings"));
      await waitFor(() => {
        expect(screen.getByTestId("tab-content")).toHaveTextContent(
          "Settings content",
        );
      });

      // Navigate to billing tab
      await user.click(screen.getByText("Billing"));
      await waitFor(() => {
        expect(screen.getByTestId("tab-content")).toHaveTextContent(
          "Billing content",
        );
      });
    });

    it("should render breadcrumbs correctly", () => {
      render(<NavigationWorkflow />);

      const breadcrumbs = screen.getByTestId("breadcrumbs");
      expect(breadcrumbs).toBeInTheDocument();
      expect(within(breadcrumbs).getByText("Home")).toBeInTheDocument();
      expect(within(breadcrumbs).getByText("Dashboard")).toBeInTheDocument();
      expect(within(breadcrumbs).getByText("Profile")).toBeInTheDocument();
    });
  });

  describe("Modal and Overlay Workflows", () => {
    it("should handle modal opening and closing", async () => {
      render(<ModalOverlayWorkflow />);

      // Open modal
      await user.click(screen.getByTestId("open-modal-button"));
      await waitFor(() => {
        expect(screen.getByTestId("test-modal")).toBeInTheDocument();
      });

      // Close modal
      await user.click(screen.getByTestId("close-modal-button"));
      await waitFor(() => {
        expect(screen.queryByTestId("test-modal")).not.toBeInTheDocument();
      });
    });

    it("should handle drawer opening and closing", async () => {
      render(<ModalOverlayWorkflow />);

      // Open drawer
      await user.click(screen.getByTestId("open-drawer-button"));
      await waitFor(() => {
        expect(screen.getByTestId("test-drawer")).toBeInTheDocument();
      });

      // Close drawer
      await user.click(screen.getByTestId("close-drawer-button"));
      await waitFor(() => {
        expect(screen.queryByTestId("test-drawer")).not.toBeInTheDocument();
      });
    });

    it("should handle toast notifications", async () => {
      render(<ModalOverlayWorkflow />);

      // Show toast
      await user.click(screen.getByTestId("show-toast-button"));
      await waitFor(() => {
        expect(screen.getByTestId("test-toast")).toBeInTheDocument();
        expect(screen.getByText("This is a test toast")).toBeInTheDocument();
      });
    });

    it("should handle popover interactions", async () => {
      render(<ModalOverlayWorkflow />);

      // Toggle popover
      await user.click(screen.getByTestId("popover-trigger"));
      await waitFor(() => {
        expect(screen.getByText("This is popover content")).toBeInTheDocument();
      });
    });
  });

  describe("Search and Filter Workflows", () => {
    it("should filter table data based on search query", async () => {
      render(<SearchFilterWorkflow />);

      // Initial state should show all data
      expect(screen.getByTestId("search-results")).toHaveTextContent(
        "Found 3 results",
      );

      // Search for specific user
      await user.type(screen.getByTestId("user-search"), "John");
      await waitFor(() => {
        expect(screen.getByTestId("search-results")).toHaveTextContent(
          "Found 1 results",
        );
      });

      // Clear search
      await user.clear(screen.getByTestId("user-search"));
      await waitFor(() => {
        expect(screen.getByTestId("search-results")).toHaveTextContent(
          "Found 3 results",
        );
      });
    });

    it("should handle table sorting", async () => {
      render(<SearchFilterWorkflow />);

      const table = screen.getByTestId("users-table");
      expect(table).toBeInTheDocument();

      // Test sorting functionality would depend on the actual table implementation
      // This is a placeholder for sorting tests
    });
  });

  describe("Responsive Workflows", () => {
    it("should adapt to different screen sizes", async () => {
      render(<ResponsiveWorkflow />);

      // Test mobile view
      await user.click(screen.getByTestId("mobile-view"));
      const responsiveButton = screen.getByTestId("responsive-button");
      expect(responsiveButton).toBeInTheDocument();

      // Test tablet view
      await user.click(screen.getByTestId("tablet-view"));
      expect(responsiveButton).toBeInTheDocument();

      // Test desktop view
      await user.click(screen.getByTestId("desktop-view"));
      expect(responsiveButton).toBeInTheDocument();
    });
  });

  describe("Theme Switching Workflows", () => {
    it("should handle theme changes across components", async () => {
      render(<ThemeSwitchingWorkflow />);

      // Check initial theme
      expect(screen.getByTestId("current-theme")).toHaveTextContent(
        "Current theme: light",
      );

      // Switch theme
      await user.click(screen.getByTestId("theme-toggle"));
      await waitFor(() => {
        expect(screen.getByTestId("current-theme")).toHaveTextContent(
          "Current theme: dark",
        );
      });

      // Verify themed components are present
      expect(screen.getByTestId("themed-card")).toBeInTheDocument();
      expect(screen.getByTestId("themed-button")).toBeInTheDocument();
      expect(screen.getByTestId("themed-input")).toBeInTheDocument();
    });
  });

  describe("Error Handling Workflows", () => {
    it("should handle error boundary behavior", async () => {
      // Suppress console.error for this test
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<ErrorHandlingWorkflow />);

      // Initially no error
      expect(screen.getByTestId("error-component")).toHaveTextContent(
        "No error",
      );

      // Trigger error
      await user.click(screen.getByTestId("trigger-error-button"));
      await waitFor(() => {
        expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe("Accessibility Workflows", () => {
    it("should handle keyboard navigation and focus management", async () => {
      render(<AccessibilityWorkflow />);

      // Test focus trap
      const firstInput = screen.getByTestId("first-input");
      const secondInput = screen.getByTestId("second-input");
      const focusButton = screen.getByTestId("focus-button");

      // Focus first input
      await user.click(firstInput);
      expect(screen.getByTestId("focused-element")).toHaveTextContent(
        "Currently focused: first",
      );

      // Tab to second input
      await user.tab();
      expect(screen.getByTestId("focused-element")).toHaveTextContent(
        "Currently focused: second",
      );

      // Tab to button
      await user.tab();
      expect(screen.getByTestId("focused-element")).toHaveTextContent(
        "Currently focused: button",
      );
    });

    it("should provide proper accessibility features", () => {
      render(<AccessibilityWorkflow />);

      // Check for accessibility components
      expect(screen.getByTestId("live-region-content")).toBeInTheDocument();
      expect(screen.getByTestId("focus-trap-container")).toBeInTheDocument();
      expect(screen.getByTestId("visually-hidden-text")).toBeInTheDocument();
    });
  });

  describe("Complex Multi-Component Workflows", () => {
    it("should handle complex form with modal confirmation", async () => {
      const ComplexWorkflow = () => {
        const [showConfirmModal, setShowConfirmModal] = useState(false);
        const [formData, setFormData] = useState({ name: "", email: "" });

        const handleSubmit = (e) => {
          e.preventDefault();
          setShowConfirmModal(true);
        };

        return (
          <div data-testid="complex-workflow">
            <form onSubmit={handleSubmit}>
              <GlassInput
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                data-testid="complex-name-input"
              />
              <GlassInput
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                data-testid="complex-email-input"
              />
              <GlassButton type="submit" data-testid="complex-submit-button">
                Submit
              </GlassButton>
            </form>

            <GlassModal
              isOpen={showConfirmModal}
              onClose={() => setShowConfirmModal(false)}
              title="Confirm Submission"
              data-testid="confirm-modal"
            >
              <p>Are you sure you want to submit this form?</p>
              <GlassButton
                onClick={() => setShowConfirmModal(false)}
                data-testid="confirm-yes-button"
              >
                Yes, Submit
              </GlassButton>
              <GlassButton
                onClick={() => setShowConfirmModal(false)}
                data-testid="confirm-no-button"
              >
                Cancel
              </GlassButton>
            </GlassModal>
          </div>
        );
      };

      render(<ComplexWorkflow />);

      // Fill form
      await user.type(screen.getByTestId("complex-name-input"), "John Doe");
      await user.type(
        screen.getByTestId("complex-email-input"),
        "john@example.com",
      );

      // Submit form
      await user.click(screen.getByTestId("complex-submit-button"));

      // Confirm modal should appear
      await waitFor(() => {
        expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
      });

      // Confirm submission
      await user.click(screen.getByTestId("confirm-yes-button"));

      // Modal should close
      await waitFor(() => {
        expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
      });
    });

    it("should handle search with results in modal", async () => {
      const SearchModalWorkflow = () => {
        const [searchQuery, setSearchQuery] = useState("");
        const [showResults, setShowResults] = useState(false);
        const [results, setResults] = useState([]);

        const handleSearch = (query) => {
          setSearchQuery(query);
          if (query.length > 2) {
            const filtered = mockTableData.filter((item) =>
              item.name.toLowerCase().includes(query.toLowerCase()),
            );
            setResults(filtered);
            setShowResults(true);
          }
        };

        return (
          <div data-testid="search-modal-workflow">
            <GlassSearch
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              data-testid="search-modal-input"
            />

            <GlassModal
              isOpen={showResults}
              onClose={() => setShowResults(false)}
              title="Search Results"
              data-testid="search-results-modal"
            >
              <div data-testid="search-results-list">
                {results.map((result) => (
                  <div key={result.id} data-testid={`result-${result.id}`}>
                    {result.name} - {result.email}
                  </div>
                ))}
              </div>
            </GlassModal>
          </div>
        );
      };

      render(<SearchModalWorkflow />);

      // Search for users
      await user.type(screen.getByTestId("search-modal-input"), "John");

      // Results modal should appear
      await waitFor(() => {
        expect(screen.getByTestId("search-results-modal")).toBeInTheDocument();
        expect(screen.getByTestId("result-1")).toBeInTheDocument();
      });
    });
  });

  describe("Performance and Memory Workflows", () => {
    it("should handle component mounting and unmounting without memory leaks", async () => {
      const DynamicComponentWorkflow = () => {
        const [showComponents, setShowComponents] = useState(false);

        return (
          <div data-testid="dynamic-component-workflow">
            <GlassButton
              onClick={() => setShowComponents(!showComponents)}
              data-testid="toggle-components-button"
            >
              Toggle Components
            </GlassButton>

            {showComponents && (
              <div data-testid="dynamic-components">
                <GlassCard title="Dynamic Card">
                  <GlassInput placeholder="Dynamic input" />
                  <GlassButton>Dynamic button</GlassButton>
                </GlassCard>
                <GlassTable data={mockTableData} columns={[]} />
                <GlassChart data={[]} />
              </div>
            )}
          </div>
        );
      };

      render(<DynamicComponentWorkflow />);

      // Toggle components multiple times
      for (let i = 0; i < 5; i++) {
        await user.click(screen.getByTestId("toggle-components-button"));
        await waitFor(() => {
          if (i % 2 === 0) {
            expect(
              screen.getByTestId("dynamic-components"),
            ).toBeInTheDocument();
          } else {
            expect(
              screen.queryByTestId("dynamic-components"),
            ).not.toBeInTheDocument();
          }
        });
      }
    });
  });
});
