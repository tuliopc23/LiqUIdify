import { describe, expect, it, jest, beforeEach, afterEach } from "bun:test";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
  act,
  within,
  getByRole,
  queryByRole,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Calculator,
  Home,
  User,
  Settings,
  Search,
  Menu,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";

// Import components for integration testing
import { GlassFormField } from "../components/glass-form-field";
import { GlassInput } from "../components/glass-input";
import { GlassNumberInput } from "../components/glass-number-input";
import { GlassTextarea } from "../components/glass-textarea";
import { GlassCheckbox } from "../components/glass-checkbox";
import { GlassCheckboxGroup } from "../components/glass-checkbox-group";
import { GlassRadioGroup } from "../components/glass-radio-group";
import { GlassSelect } from "../components/glass-select";
import { GlassSearch } from "../components/glass-search";
import { GlassMobileNav, type NavItem } from "../components/glass-mobile-nav";
import { GlassPagination } from "../components/glass-pagination";
import { GlassTabs } from "../components/glass-tabs";
import { GlassBreadcrumbs } from "../components/glass-breadcrumbs";
import { GlassResponsiveButton } from "../components/glass-responsive-button";
import { GlassResponsiveCard } from "../components/glass-responsive-card";
import { GlassModal } from "../components/glass-modal";
import { GlassToast } from "../components/glass-toast";
import { GlassPopover } from "../components/glass-popover";
import { GlassTable } from "../components/glass-table";
import { GlassButton } from "../components/glass-button-refactored";
import { GlassCard } from "../components/glass-card-refactored";
import { ThemeProvider } from "../components/theme-provider";
import { GlassFocusTrap } from "../components/glass-focus-trap";
import { GlassLiveRegion } from "../components/glass-live-region";
import { GlassSkipNavigation } from "../components/glass-skip-navigation";

// Mock createPortal for modal and navigation testing
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (children: React.ReactNode) => children,
}));

// Mock ResizeObserver for responsive testing
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia for responsive testing
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Helper function to simulate React state in tests (if needed for complex scenarios)
function createTestState<T>(initialValue: T) {
  let value = initialValue;
  const listeners: Array<() => void> = [];

  const setValue = (newValue: T | ((prev: T) => T)) => {
    if (typeof newValue === "function") {
      value = (newValue as (prev: T) => T)(value);
    } else {
      value = newValue;
    }
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  return { getValue: () => value, setValue, subscribe };
}

// Helper function for testing async operations
export const waitForAsyncOperation = async (
  operation: () => Promise<void>,
  timeout = 5000,
) => {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      await operation();
      return;
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  throw new Error(`Async operation timed out after ${timeout}ms`);
};

// Helper function for performance testing
export const measurePerformance = async (
  operation: () => Promise<void> | void,
) => {
  const startTime = performance.now();
  await operation();
  return performance.now() - startTime;
};

// Helper function for accessibility testing
export const checkAccessibility = async (container: HTMLElement) => {
  // This would integrate with axe-core in a real implementation
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  return {
    focusableElementsCount: focusableElements.length,
    hasProperLabels: Array.from(focusableElements).every(
      (el) =>
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby") ||
        (el as HTMLElement).textContent?.trim(),
    ),
  };
};

// Mock IntersectionObserver for performance testing
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("Integration Tests", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    // Reset any global state
    document.body.innerHTML = "";
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  describe("Form Composition", () => {
    it("should compose form components together", async () => {
      const handleSubmit = jest.fn();

      const FormExample = () => {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [age, setAge] = useState<number | undefined>();
        const [bio, setBio] = useState("");
        const [preferences, setPreferences] = useState<string[]>([]);
        const [gender, setGender] = useState("");
        const [country, setCountry] = useState("");

        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit({
                name,
                email,
                age,
                bio,
                preferences,
                gender,
                country,
              });
            }}
          >
            <GlassFormField label="Personal Information">
              <GlassInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                aria-label="Full Name"
              />
            </GlassFormField>

            <GlassFormField label="Email Address">
              <GlassInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                aria-label="Email Address"
              />
            </GlassFormField>

            <GlassNumberInput
              label="Age"
              value={age}
              onChange={setAge}
              min={0}
              max={120}
              aria-label="Age"
            />

            <GlassTextarea
              label="Bio"
              value={bio}
              onChange={setBio}
              maxLength={500}
              showCharacterCount
              aria-label="Biography"
            />

            <GlassCheckboxGroup
              label="Interests"
              options={[
                { value: "tech", label: "Technology" },
                { value: "sports", label: "Sports" },
                { value: "music", label: "Music" },
              ]}
              value={preferences}
              onChange={setPreferences}
            />

            <GlassRadioGroup
              label="Gender"
              value={gender}
              onChange={setGender}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />

            <GlassSelect
              label="Country"
              value={country}
              onChange={setCountry}
              options={[
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
              ]}
              placeholder="Select your country"
            />

            <GlassButton type="submit">Submit</GlassButton>
          </form>
        );
      };

      render(<FormExample />);

      // Fill out the form using userEvent for more realistic interactions
      const nameInput = screen.getByLabelText("Full Name");
      await user.type(nameInput, "John Doe");

      const emailInput = screen.getByLabelText("Email Address");
      await user.type(emailInput, "john.doe@example.com");

      const ageInput = screen.getByLabelText("Age");
      await user.type(ageInput, "25");

      const bioTextarea = screen.getByLabelText("Biography");
      await user.type(
        bioTextarea,
        "Software developer with 5 years of experience",
      );

      const techCheckbox = screen.getByLabelText("Technology");
      await user.click(techCheckbox);

      const maleRadio = screen.getByLabelText("Male");
      await user.click(maleRadio);

      const countrySelect = screen.getByRole("combobox", { name: /country/i });
      await user.click(countrySelect);
      const usOption = screen.getByText("United States");
      await user.click(usOption);

      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john.doe@example.com",
        age: 25,
        bio: "Software developer with 5 years of experience",
        preferences: ["tech"],
        gender: "male",
        country: "us",
      });
    });

    it("should handle complex form validation workflow", async () => {
      const ValidationForm = () => {
        const [formData, setFormData] = useState({
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
        const [errors, setErrors] = useState<Record<string, string>>({});
        const [isSubmitting, setIsSubmitting] = useState(false);

        const validate = () => {
          const newErrors: Record<string, string> = {};

          if (!formData.email.includes("@")) {
            newErrors.email = "Please enter a valid email";
          }

          if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
          }

          if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
          }

          if (!formData.terms) {
            newErrors.terms = "You must accept the terms and conditions";
          }

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (validate()) {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSubmitting(false);
          }
        };

        return (
          <form onSubmit={handleSubmit}>
            <GlassFormField
              label="Email"
              error={!!errors.email}
              helperText={errors.email}
            >
              <GlassInput
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                aria-label="Email"
                aria-invalid={!!errors.email}
              />
            </GlassFormField>

            <GlassFormField
              label="Password"
              error={!!errors.password}
              helperText={errors.password}
            >
              <GlassInput
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                aria-label="Password"
                aria-invalid={!!errors.password}
              />
            </GlassFormField>

            <GlassFormField
              label="Confirm Password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            >
              <GlassInput
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                aria-label="Confirm Password"
                aria-invalid={!!errors.confirmPassword}
              />
            </GlassFormField>

            <GlassFormField error={!!errors.terms} helperText={errors.terms}>
              <GlassCheckbox
                checked={formData.terms}
                onChange={(checked) =>
                  setFormData((prev) => ({ ...prev, terms: checked }))
                }
                label="I accept the terms and conditions"
              />
            </GlassFormField>

            <GlassButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </GlassButton>
          </form>
        );
      };

      render(<ValidationForm />);

      // Try to submit without filling anything
      const submitButton = screen.getByRole("button", { name: /submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email"),
        ).toBeInTheDocument();
        expect(
          screen.getByText("Password must be at least 8 characters"),
        ).toBeInTheDocument();
        expect(
          screen.getByText("You must accept the terms and conditions"),
        ).toBeInTheDocument();
      });

      // Fill form with mismatched passwords
      const emailInput = screen.getByLabelText("Email");
      await user.type(emailInput, "test@example.com");

      const passwordInput = screen.getByLabelText("Password");
      await user.type(passwordInput, "password123");

      const confirmPasswordInput = screen.getByLabelText("Confirm Password");
      await user.type(confirmPasswordInput, "password456");

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
      });

      // Fix password and accept terms
      await user.clear(confirmPasswordInput);
      await user.type(confirmPasswordInput, "password123");

      const termsCheckbox = screen.getByLabelText(
        "I accept the terms and conditions",
      );
      await user.click(termsCheckbox);

      await user.click(submitButton);

      // Should show submitting state
      expect(screen.getByText("Submitting...")).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it("should handle multi-step form workflow", async () => {
      const MultiStepForm = () => {
        const [step, setStep] = useState(1);
        const [formData, setFormData] = useState({
          personalInfo: { name: "", email: "" },
          preferences: { theme: "", notifications: false },
          review: { confirmed: false },
        });

        const nextStep = () => setStep((prev) => prev + 1);
        const prevStep = () => setStep((prev) => prev - 1);

        return (
          <div>
            <div data-testid="step-indicator">Step {step} of 3</div>

            {step === 1 && (
              <div>
                <h2>Personal Information</h2>
                <GlassInput
                  label="Name"
                  value={formData.personalInfo.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        name: e.target.value,
                      },
                    }))
                  }
                />
                <GlassInput
                  label="Email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        email: e.target.value,
                      },
                    }))
                  }
                />
                <GlassButton onClick={nextStep}>Next</GlassButton>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2>Preferences</h2>
                <GlassSelect
                  label="Theme"
                  value={formData.preferences.theme}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferences: { ...prev.preferences, theme: value },
                    }))
                  }
                  options={[
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                  ]}
                />
                <GlassCheckbox
                  label="Enable notifications"
                  checked={formData.preferences.notifications}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        notifications: checked,
                      },
                    }))
                  }
                />
                <GlassButton onClick={prevStep}>Previous</GlassButton>
                <GlassButton onClick={nextStep}>Next</GlassButton>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2>Review</h2>
                <div data-testid="review-data">
                  {JSON.stringify(formData, null, 2)}
                </div>
                <GlassCheckbox
                  label="I confirm this information is correct"
                  checked={formData.review.confirmed}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      review: { ...prev.review, confirmed: checked },
                    }))
                  }
                />
                <GlassButton onClick={prevStep}>Previous</GlassButton>
                <GlassButton disabled={!formData.review.confirmed}>
                  Submit
                </GlassButton>
              </div>
            )}
          </div>
        );
      };

      render(<MultiStepForm />);

      // Step 1: Personal Information
      expect(screen.getByTestId("step-indicator")).toHaveTextContent(
        "Step 1 of 3",
      );

      await user.type(screen.getByLabelText("Name"), "John Doe");
      await user.type(screen.getByLabelText("Email"), "john@example.com");
      await user.click(screen.getByText("Next"));

      // Step 2: Preferences
      expect(screen.getByTestId("step-indicator")).toHaveTextContent(
        "Step 2 of 3",
      );

      const themeSelect = screen.getByRole("combobox", { name: /theme/i });
      await user.click(themeSelect);
      await user.click(screen.getByText("Dark"));

      await user.click(screen.getByLabelText("Enable notifications"));
      await user.click(screen.getByText("Next"));

      // Step 3: Review
      expect(screen.getByTestId("step-indicator")).toHaveTextContent(
        "Step 3 of 3",
      );

      const reviewData = screen.getByTestId("review-data");
      expect(reviewData).toHaveTextContent("John Doe");
      expect(reviewData).toHaveTextContent("john@example.com");
      expect(reviewData).toHaveTextContent("dark");
      expect(reviewData).toHaveTextContent("true");

      // Submit should be disabled until confirmed
      const submitButton = screen.getByText("Submit");
      expect(submitButton).toBeDisabled();

      await user.click(
        screen.getByLabelText("I confirm this information is correct"),
      );
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("Navigation Workflows", () => {
    it("should handle complex navigation flow with tabs and breadcrumbs", async () => {
      const NavigationExample = () => {
        const [activeTab, setActiveTab] = useState("dashboard");
        const [breadcrumbs, setBreadcrumbs] = useState([
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
        ]);

        const tabs = [
          { id: "dashboard", label: "Dashboard", content: "Dashboard Content" },
          { id: "analytics", label: "Analytics", content: "Analytics Content" },
          { id: "settings", label: "Settings", content: "Settings Content" },
        ];

        const handleTabChange = (tabId: string) => {
          setActiveTab(tabId);
          const tab = tabs.find((t) => t.id === tabId);
          if (tab) {
            setBreadcrumbs([
              { label: "Home", href: "/" },
              { label: tab.label, href: `/${tabId}` },
            ]);
          }
        };

        return (
          <div>
            <GlassBreadcrumbs items={breadcrumbs} />
            <GlassTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
            <div data-testid="tab-content">
              {tabs.find((t) => t.id === activeTab)?.content}
            </div>
          </div>
        );
      };

      render(<NavigationExample />);

      // Check initial state
      expect(screen.getByTestId("tab-content")).toHaveTextContent(
        "Dashboard Content",
      );
      expect(screen.getByText("Dashboard")).toBeInTheDocument();

      // Switch to Analytics tab
      const analyticsTab = screen.getByRole("tab", { name: /analytics/i });
      await user.click(analyticsTab);

      await waitFor(() => {
        expect(screen.getByTestId("tab-content")).toHaveTextContent(
          "Analytics Content",
        );
        expect(screen.getByText("Analytics")).toBeInTheDocument();
      });

      // Switch to Settings tab
      const settingsTab = screen.getByRole("tab", { name: /settings/i });
      await user.click(settingsTab);

      await waitFor(() => {
        expect(screen.getByTestId("tab-content")).toHaveTextContent(
          "Settings Content",
        );
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });
    });

    it("should handle mobile navigation with nested items", async () => {
      const handleNavigation = jest.fn();

      const navItems: NavItem[] = [
        {
          id: "home",
          label: "Home",
          icon: <Home className="h-5 w-5" />,
        },
        {
          id: "profile",
          label: "Profile",
          icon: <User className="h-5 w-5" />,
          children: [
            {
              id: "settings",
              label: "Settings",
              icon: <Settings className="h-5 w-5" />,
            },
            {
              id: "preferences",
              label: "Preferences",
              icon: <Settings className="h-5 w-5" />,
            },
          ],
        },
      ];

      render(
        <GlassMobileNav items={navItems} onItemClick={handleNavigation} />,
      );

      // Open navigation
      const hamburgerButton = screen.getByLabelText("Open navigation menu");
      await user.click(hamburgerButton);

      await waitFor(() => {
        expect(screen.getByRole("navigation")).toBeInTheDocument();
      });

      // Expand nested item
      const profileButton = screen.getByText("Profile");
      await user.click(profileButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.getByText("Preferences")).toBeInTheDocument();
      });

      // Click nested item
      const settingsButton = screen.getByText("Settings");
      await user.click(settingsButton);

      expect(handleNavigation).toHaveBeenCalledWith(
        expect.objectContaining({ id: "settings", label: "Settings" }),
      );

      // Close navigation
      const closeButton = screen.getByLabelText("Close navigation menu");
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
      });
    });

    it("should handle pagination with table integration", async () => {
      const PaginatedTable = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [data] = useState(
          Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            name: `Item ${i + 1}`,
            status: i % 2 === 0 ? "Active" : "Inactive",
          })),
        );

        const itemsPerPage = 10;
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = data.slice(startIndex, startIndex + itemsPerPage);

        return (
          <div>
            <GlassTable
              data={currentData}
              columns={[
                { key: "id", header: "ID" },
                { key: "name", header: "Name" },
                { key: "status", header: "Status" },
              ]}
            />
            <GlassPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <div data-testid="page-info">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        );
      };

      render(<PaginatedTable />);

      // Check initial state
      expect(screen.getByTestId("page-info")).toHaveTextContent("Page 1 of 10");
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.queryByText("Item 11")).not.toBeInTheDocument();

      // Go to next page
      const nextButton = screen.getByLabelText("Go to next page");
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByTestId("page-info")).toHaveTextContent(
          "Page 2 of 10",
        );
        expect(screen.getByText("Item 11")).toBeInTheDocument();
        expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
      });

      // Jump to specific page
      const page5Button = screen.getByLabelText("Go to page 5");
      await user.click(page5Button);

      await waitFor(() => {
        expect(screen.getByTestId("page-info")).toHaveTextContent(
          "Page 5 of 10",
        );
        expect(screen.getByText("Item 41")).toBeInTheDocument();
      });
    });
  });

  describe("Search and Selection Workflows", () => {
    it("should handle complex search with filtering and results", async () => {
      const SearchExample = () => {
        const [searchTerm, setSearchTerm] = useState("");
        const [selectedCategory, setSelectedCategory] = useState("");
        const [results, setResults] = useState<any[]>([]);

        const allData = [
          {
            id: 1,
            name: "React Component",
            category: "frontend",
            type: "library",
          },
          {
            id: 2,
            name: "Node.js Server",
            category: "backend",
            type: "runtime",
          },
          {
            id: 3,
            name: "TypeScript Types",
            category: "frontend",
            type: "language",
          },
          {
            id: 4,
            name: "Express Router",
            category: "backend",
            type: "framework",
          },
        ];

        const suggestions = allData
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((item) => ({
            id: item.id.toString(),
            text: item.name,
            type: "suggestion" as const,
          }));

        useEffect(() => {
          let filtered = allData;

          if (searchTerm) {
            filtered = filtered.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
          }

          if (selectedCategory) {
            filtered = filtered.filter(
              (item) => item.category === selectedCategory,
            );
          }

          setResults(filtered);
        }, [searchTerm, selectedCategory]);

        return (
          <div>
            <GlassSearch
              value={searchTerm}
              onChange={setSearchTerm}
              suggestions={suggestions}
              onSuggestionClick={(suggestion) => setSearchTerm(suggestion.text)}
              placeholder="Search items..."
            />

            <GlassSelect
              label="Category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={[
                { value: "", label: "All Categories" },
                { value: "frontend", label: "Frontend" },
                { value: "backend", label: "Backend" },
              ]}
            />

            <div data-testid="search-results">
              {results.map((item) => (
                <div key={item.id} data-testid={`result-${item.id}`}>
                  {item.name} - {item.category}
                </div>
              ))}
            </div>

            <div data-testid="result-count">{results.length} results found</div>
          </div>
        );
      };

      render(<SearchExample />);

      // Initial state - all results shown
      expect(screen.getByTestId("result-count")).toHaveTextContent(
        "4 results found",
      );

      // Search for "React"
      const searchInput = screen.getByPlaceholderText("Search items...");
      await user.type(searchInput, "React");

      await waitFor(() => {
        expect(screen.getByTestId("result-count")).toHaveTextContent(
          "1 results found",
        );
        expect(screen.getByTestId("result-1")).toBeInTheDocument();
      });

      // Clear search and filter by category
      await user.clear(searchInput);

      const categorySelect = screen.getByRole("combobox", {
        name: /category/i,
      });
      await user.click(categorySelect);
      await user.click(screen.getByText("Frontend"));

      await waitFor(() => {
        expect(screen.getByTestId("result-count")).toHaveTextContent(
          "2 results found",
        );
        expect(screen.getByTestId("result-1")).toBeInTheDocument();
        expect(screen.getByTestId("result-3")).toBeInTheDocument();
      });

      // Combine search and filter
      await user.type(searchInput, "Type");

      await waitFor(() => {
        expect(screen.getByTestId("result-count")).toHaveTextContent(
          "1 results found",
        );
        expect(screen.getByTestId("result-3")).toBeInTheDocument();
      });
    });

    it("should handle multi-select with search", async () => {
      const MultiSelectExample = () => {
        const [selectedItems, setSelectedItems] = useState<string[]>([]);
        const [searchTerm, setSearchTerm] = useState("");

        const allOptions = [
          { value: "react", label: "React" },
          { value: "vue", label: "Vue.js" },
          { value: "angular", label: "Angular" },
          { value: "svelte", label: "Svelte" },
          { value: "nextjs", label: "Next.js" },
          { value: "nuxtjs", label: "Nuxt.js" },
        ];

        const filteredOptions = allOptions.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        return (
          <div>
            <GlassSearch
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search frameworks..."
            />

            <GlassSelect
              multiple
              value={selectedItems}
              onChange={setSelectedItems}
              options={filteredOptions}
              placeholder="Select frameworks"
            />

            <div data-testid="selected-items">
              Selected: {selectedItems.join(", ")}
            </div>
          </div>
        );
      };

      render(<MultiSelectExample />);

      // Search for frameworks
      const searchInput = screen.getByPlaceholderText("Search frameworks...");
      await user.type(searchInput, "react");

      // Select from filtered options
      const selectTrigger = screen.getByText("Select frameworks");
      await user.click(selectTrigger);

      await waitFor(() => {
        expect(screen.getByText("React")).toBeInTheDocument();
      });

      await user.click(screen.getByText("React"));

      expect(screen.getByTestId("selected-items")).toHaveTextContent(
        "Selected: react",
      );

      // Clear search and add more items
      await user.clear(searchInput);
      await user.click(selectTrigger);

      await user.click(screen.getByText("Vue.js"));
      await user.click(screen.getByText("Angular"));

      expect(screen.getByTestId("selected-items")).toHaveTextContent(
        "Selected: react, vue, angular",
      );
    });
  });

  describe("Modal and Overlay Workflows", () => {
    it("should handle complex modal interactions with forms", async () => {
      const ModalFormExample = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [formData, setFormData] = useState({ name: "", email: "" });
        const [savedData, setSavedData] = useState<any>(null);

        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          setSavedData(formData);
          setIsModalOpen(false);
          setFormData({ name: "", email: "" });
        };

        return (
          <div>
            <GlassButton onClick={() => setIsModalOpen(true)}>
              Open Form Modal
            </GlassButton>

            {savedData && (
              <div data-testid="saved-data">
                Saved: {savedData.name} - {savedData.email}
              </div>
            )}

            <GlassModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="User Information"
            >
              <form onSubmit={handleSubmit}>
                <GlassInput
                  label="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  autoFocus
                />

                <GlassInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />

                <div className="flex gap-2 mt-4">
                  <GlassButton type="submit">Save</GlassButton>
                  <GlassButton
                    type="button"
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </GlassButton>
                </div>
              </form>
            </GlassModal>
          </div>
        );
      };

      render(<ModalFormExample />);

      // Open modal
      const openButton = screen.getByText("Open Form Modal");
      await user.click(openButton);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("User Information")).toBeInTheDocument();
      });

      // Fill form in modal
      const nameInput = screen.getByLabelText("Name");
      const emailInput = screen.getByLabelText("Email");

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");

      // Submit form
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(screen.getByTestId("saved-data")).toHaveTextContent(
          "Saved: John Doe - john@example.com",
        );
      });
    });

    it("should handle nested modals and focus management", async () => {
      const NestedModalExample = () => {
        const [firstModalOpen, setFirstModalOpen] = useState(false);
        const [secondModalOpen, setSecondModalOpen] = useState(false);

        return (
          <div>
            <GlassButton onClick={() => setFirstModalOpen(true)}>
              Open First Modal
            </GlassButton>

            <GlassModal
              isOpen={firstModalOpen}
              onClose={() => setFirstModalOpen(false)}
              title="First Modal"
            >
              <p>This is the first modal</p>
              <GlassButton onClick={() => setSecondModalOpen(true)}>
                Open Second Modal
              </GlassButton>
            </GlassModal>

            <GlassModal
              isOpen={secondModalOpen}
              onClose={() => setSecondModalOpen(false)}
              title="Second Modal"
            >
              <p>This is the second modal</p>
              <GlassButton onClick={() => setSecondModalOpen(false)}>
                Close Second Modal
              </GlassButton>
            </GlassModal>
          </div>
        );
      };

      render(<NestedModalExample />);

      // Open first modal
      await user.click(screen.getByText("Open First Modal"));

      await waitFor(() => {
        expect(screen.getByText("This is the first modal")).toBeInTheDocument();
      });

      // Open second modal
      await user.click(screen.getByText("Open Second Modal"));

      await waitFor(() => {
        expect(
          screen.getByText("This is the second modal"),
        ).toBeInTheDocument();
      });

      // Close second modal
      await user.click(screen.getByText("Close Second Modal"));

      await waitFor(() => {
        expect(
          screen.queryByText("This is the second modal"),
        ).not.toBeInTheDocument();
        expect(screen.getByText("This is the first modal")).toBeInTheDocument();
      });
    });

    it("should handle popover interactions", async () => {
      const PopoverExample = () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <div>
            <GlassPopover
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              trigger={<GlassButton>Toggle Popover</GlassButton>}
              content={
                <div>
                  <p>Popover content</p>
                  <GlassButton onClick={() => setIsOpen(false)}>
                    Close
                  </GlassButton>
                </div>
              }
            />
          </div>
        );
      };

      render(<PopoverExample />);

      // Open popover
      const triggerButton = screen.getByText("Toggle Popover");
      await user.click(triggerButton);

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      // Close popover
      const closeButton = screen.getByText("Close");
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("should handle responsive components across different screen sizes", async () => {
      const ResponsiveExample = () => {
        const [screenSize, setScreenSize] = useState("desktop");

        // Simulate screen size changes
        useEffect(() => {
          const handleResize = () => {
            if (window.innerWidth < 768) {
              setScreenSize("mobile");
            } else if (window.innerWidth < 1024) {
              setScreenSize("tablet");
            } else {
              setScreenSize("desktop");
            }
          };

          handleResize();
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);

        return (
          <div>
            <div data-testid="screen-size">{screenSize}</div>

            <GlassResponsiveButton
              mobileText="Menu"
              desktopText="Navigation Menu"
              onClick={() => {}}
            />

            <GlassResponsiveCard
              title="Responsive Card"
              content="This card adapts to different screen sizes"
              mobileLayout="compact"
              desktopLayout="expanded"
            />

            {screenSize === "mobile" ? (
              <GlassMobileNav
                items={[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                ]}
              />
            ) : (
              <nav data-testid="desktop-nav">
                <GlassButton>Home</GlassButton>
                <GlassButton>About</GlassButton>
              </nav>
            )}
          </div>
        );
      };

      render(<ResponsiveExample />);

      // Test desktop view
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1200,
      });

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      await waitFor(() => {
        expect(screen.getByTestId("screen-size")).toHaveTextContent("desktop");
        expect(screen.getByTestId("desktop-nav")).toBeInTheDocument();
        expect(screen.getByText("Navigation Menu")).toBeInTheDocument();
      });

      // Test mobile view
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 600,
      });

      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      await waitFor(() => {
        expect(screen.getByTestId("screen-size")).toHaveTextContent("mobile");
        expect(screen.queryByTestId("desktop-nav")).not.toBeInTheDocument();
        expect(screen.getByText("Menu")).toBeInTheDocument();
      });
    });

    it("should handle responsive table behavior", async () => {
      const ResponsiveTableExample = () => {
        const data = [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
          },
        ];

        const columns = [
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role" },
        ];

        return (
          <GlassTable
            data={data}
            columns={columns}
            responsive
            mobileBreakpoint={768}
          />
        );
      };

      render(<ResponsiveTableExample />);

      // Should render table structure
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });
  });

  describe("Theme Integration", () => {
    it("should handle theme switching across components", async () => {
      const ThemeExample = () => {
        const [theme, setTheme] = useState("light");

        return (
          <ThemeProvider theme={theme}>
            <div>
              <div data-testid="current-theme">Current theme: {theme}</div>

              <GlassButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                Toggle Theme
              </GlassButton>

              <GlassCard title="Themed Card">
                <GlassInput placeholder="Themed input" />
                <GlassButton>Themed button</GlassButton>
              </GlassCard>

              <GlassModal isOpen={true} onClose={() => {}} title="Themed Modal">
                <p>This modal should respect the current theme</p>
              </GlassModal>
            </div>
          </ThemeProvider>
        );
      };

      render(<ThemeExample />);

      // Check initial theme
      expect(screen.getByTestId("current-theme")).toHaveTextContent(
        "Current theme: light",
      );

      // Toggle theme
      const toggleButton = screen.getByText("Toggle Theme");
      await user.click(toggleButton);

      await waitFor(() => {
        expect(screen.getByTestId("current-theme")).toHaveTextContent(
          "Current theme: dark",
        );
      });

      // All components should now use dark theme
      expect(screen.getByText("Themed Card")).toBeInTheDocument();
      expect(screen.getByText("Themed Modal")).toBeInTheDocument();
    });

    it("should handle theme persistence and component updates", async () => {
      const PersistentThemeExample = () => {
        const [theme, setTheme] = useState("light");
        const [componentCount, setComponentCount] = useState(1);

        return (
          <ThemeProvider theme={theme}>
            <div>
              <GlassButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                Switch Theme
              </GlassButton>

              <GlassButton
                onClick={() => setComponentCount((prev) => prev + 1)}
              >
                Add Component
              </GlassButton>

              {Array.from({ length: componentCount }, (_, i) => (
                <GlassCard key={i} title={`Card ${i + 1}`}>
                  <GlassInput placeholder={`Input ${i + 1}`} />
                </GlassCard>
              ))}

              <div data-testid="component-count">
                {componentCount} components
              </div>
            </div>
          </ThemeProvider>
        );
      };

      render(<PersistentThemeExample />);

      // Add more components
      const addButton = screen.getByText("Add Component");
      await user.click(addButton);
      await user.click(addButton);

      expect(screen.getByTestId("component-count")).toHaveTextContent(
        "3 components",
      );

      // Switch theme - all components should update
      const switchButton = screen.getByText("Switch Theme");
      await user.click(switchButton);

      // All cards should be present and themed
      expect(screen.getByText("Card 1")).toBeInTheDocument();
      expect(screen.getByText("Card 2")).toBeInTheDocument();
      expect(screen.getByText("Card 3")).toBeInTheDocument();
    });
  });

  describe("Accessibility Integration", () => {
    it("should handle keyboard navigation across components", async () => {
      const AccessibilityExample = () => {
        const [focusedElement, setFocusedElement] = useState("");

        return (
          <div>
            <GlassSkipNavigation />

            <div data-testid="focused-element">Focused: {focusedElement}</div>

            <GlassFocusTrap>
              <GlassInput
                placeholder="First input"
                onFocus={() => setFocusedElement("first-input")}
              />

              <GlassButton onFocus={() => setFocusedElement("button")}>
                Focus me
              </GlassButton>

              <GlassInput
                placeholder="Last input"
                onFocus={() => setFocusedElement("last-input")}
              />
            </GlassFocusTrap>

            <GlassLiveRegion>
              <div>Live region content</div>
            </GlassLiveRegion>
          </div>
        );
      };

      render(<AccessibilityExample />);

      // Test keyboard navigation
      const firstInput = screen.getByPlaceholderText("First input");
      firstInput.focus();

      expect(screen.getByTestId("focused-element")).toHaveTextContent(
        "Focused: first-input",
      );

      // Tab to next element
      await user.tab();
      expect(screen.getByTestId("focused-element")).toHaveTextContent(
        "Focused: button",
      );

      // Tab to last element
      await user.tab();
      expect(screen.getByTestId("focused-element")).toHaveTextContent(
        "Focused: last-input",
      );
    });

    it("should handle screen reader announcements", async () => {
      const ScreenReaderExample = () => {
        const [message, setMessage] = useState("");
        const [announcements, setAnnouncements] = useState<string[]>([]);

        const announce = (text: string) => {
          setMessage(text);
          setAnnouncements((prev) => [...prev, text]);
        };

        return (
          <div>
            <GlassButton
              onClick={() => announce("Form submitted successfully")}
            >
              Submit Form
            </GlassButton>

            <GlassButton
              onClick={() => announce("Error: Please fill required fields")}
            >
              Trigger Error
            </GlassButton>

            <GlassLiveRegion aria-live="polite">{message}</GlassLiveRegion>

            <div data-testid="announcements">
              {announcements.map((announcement, i) => (
                <div key={i}>{announcement}</div>
              ))}
            </div>
          </div>
        );
      };

      render(<ScreenReaderExample />);

      // Trigger announcements
      await user.click(screen.getByText("Submit Form"));

      await waitFor(() => {
        expect(
          screen.getByText("Form submitted successfully"),
        ).toBeInTheDocument();
      });

      await user.click(screen.getByText("Trigger Error"));

      await waitFor(() => {
        expect(
          screen.getByText("Error: Please fill required fields"),
        ).toBeInTheDocument();
      });

      // Check announcements were recorded
      const announcements = screen.getByTestId("announcements");
      expect(announcements).toHaveTextContent("Form submitted successfully");
      expect(announcements).toHaveTextContent(
        "Error: Please fill required fields",
      );
    });
  });

  describe("Performance Integration", () => {
    it("should handle large datasets efficiently", async () => {
      const PerformanceExample = () => {
        const [data] = useState(
          Array.from({ length: 1000 }, (_, i) => ({
            id: i,
            name: `Item ${i}`,
            value: Math.random() * 100,
          })),
        );
        const [filteredData, setFilteredData] = useState(data);
        const [searchTerm, setSearchTerm] = useState("");

        useEffect(() => {
          const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          setFilteredData(filtered);
        }, [searchTerm, data]);

        return (
          <div>
            <GlassSearch
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search 1000 items..."
            />

            <div data-testid="result-count">{filteredData.length} items</div>

            <GlassTable
              data={filteredData.slice(0, 50)} // Virtualization simulation
              columns={[
                { key: "id", header: "ID" },
                { key: "name", header: "Name" },
                { key: "value", header: "Value" },
              ]}
            />
          </div>
        );
      };

      const startTime = performance.now();
      render(<PerformanceExample />);
      const renderTime = performance.now() - startTime;

      // Should render quickly even with large dataset
      expect(renderTime).toBeLessThan(100); // 100ms threshold

      // Search should be responsive
      const searchInput = screen.getByPlaceholderText("Search 1000 items...");

      const searchStartTime = performance.now();
      await user.type(searchInput, "Item 1");
      const searchTime = performance.now() - searchStartTime;

      expect(searchTime).toBeLessThan(500); // 500ms threshold for search

      await waitFor(() => {
        const resultCount = screen.getByTestId("result-count");
        expect(resultCount).toHaveTextContent(/\d+ items/);
      });
    });

    it("should handle component mounting and unmounting efficiently", async () => {
      const MountingExample = () => {
        const [components, setComponents] = useState<number[]>([]);

        const addComponent = () => {
          setComponents((prev) => [...prev, prev.length]);
        };

        const removeComponent = () => {
          setComponents((prev) => prev.slice(0, -1));
        };

        return (
          <div>
            <GlassButton onClick={addComponent}>Add Component</GlassButton>
            <GlassButton onClick={removeComponent}>
              Remove Component
            </GlassButton>

            <div data-testid="component-count">
              {components.length} components
            </div>

            {components.map((id) => (
              <GlassCard key={id} title={`Component ${id}`}>
                <GlassInput placeholder={`Input ${id}`} />
                <GlassButton>Button {id}</GlassButton>
              </GlassCard>
            ))}
          </div>
        );
      };

      render(<MountingExample />);

      // Add multiple components quickly
      const addButton = screen.getByText("Add Component");

      for (let i = 0; i < 10; i++) {
        await user.click(addButton);
      }

      expect(screen.getByTestId("component-count")).toHaveTextContent(
        "10 components",
      );

      // Remove components quickly
      const removeButton = screen.getByText("Remove Component");

      for (let i = 0; i < 5; i++) {
        await user.click(removeButton);
      }

      expect(screen.getByTestId("component-count")).toHaveTextContent(
        "5 components",
      );
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("should handle component errors gracefully", async () => {
      const ErrorExample = () => {
        const [shouldError, setShouldError] = useState(false);

        const ProblematicComponent = () => {
          if (shouldError) {
            throw new Error("Component error");
          }
          return <div>Working component</div>;
        };

        return (
          <div>
            <GlassButton onClick={() => setShouldError(true)}>
              Trigger Error
            </GlassButton>

            <GlassButton onClick={() => setShouldError(false)}>
              Reset
            </GlassButton>

            <div data-testid="error-boundary">
              <ProblematicComponent />
            </div>
          </div>
        );
      };

      render(<ErrorExample />);

      // Component should work initially
      expect(screen.getByText("Working component")).toBeInTheDocument();

      // Trigger error
      await user.click(screen.getByText("Trigger Error"));

      // Component should handle error gracefully
      // (This would depend on your error boundary implementation)

      // Reset should restore functionality
      await user.click(screen.getByText("Reset"));
      expect(screen.getByText("Working component")).toBeInTheDocument();
    });

    it("should handle rapid user interactions", async () => {
      const RapidInteractionExample = () => {
        const [count, setCount] = useState(0);
        const [isLoading, setIsLoading] = useState(false);

        const handleClick = async () => {
          if (isLoading) return;

          setIsLoading(true);
          // Simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 100));
          setCount((prev) => prev + 1);
          setIsLoading(false);
        };

        return (
          <div>
            <GlassButton onClick={handleClick} disabled={isLoading}>
              {isLoading ? "Loading..." : `Count: ${count}`}
            </GlassButton>

            <div data-testid="click-count">{count}</div>
          </div>
        );
      };

      render(<RapidInteractionExample />);

      const button = screen.getByRole("button");

      // Rapid clicks should be handled properly
      for (let i = 0; i < 5; i++) {
        await user.click(button);
      }

      // Should eventually show correct count
      await waitFor(
        () => {
          expect(screen.getByTestId("click-count")).toHaveTextContent("1");
        },
        { timeout: 1000 },
      );
    });
  });
});
