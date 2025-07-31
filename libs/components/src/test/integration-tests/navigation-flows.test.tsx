import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";

// Import navigation components
import { GlassMobileNav } from "../../components/glass-mobile-nav";
import { GlassBreadcrumbs } from "../../components/glass-breadcrumbs";
import { GlassPagination } from "../../components/glass-pagination";
import { GlassTabs } from "../../components/glass-tabs";

expect.extend(toHaveNoViolations);

// Mock window.matchMedia for responsive tests
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("Navigation Flows Integration Tests", () => {
  const user = userEvent.setup();

  describe("Complete Navigation System", () => {
    const NavigationApp = () => {
      const [currentPage, setCurrentPage] = React.useState("home");
      const [activeTab, setActiveTab] = React.useState("overview");
      const [pageNumber, setPageNumber] = React.useState(1);
      const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

      const pages = {
        home: { name: "Home", parent: null },
        products: { name: "Products", parent: "home" },
        electronics: { name: "Electronics", parent: "products" },
        phones: { name: "Phones", parent: "electronics" },
      };

      const breadcrumbItems = React.useMemo(() => {
        const items = [];
        let current = currentPage;

        while (current) {
          const page = pages[current as keyof typeof pages];
          items.unshift({ label: page.name, href: `#${current}` });
          current = page.parent as string;
        }

        return items;
      }, [currentPage]);

      const navigationItems = [
        { label: "Home", href: "#home", onClick: () => setCurrentPage("home") },
        {
          label: "Products",
          href: "#products",
          onClick: () => setCurrentPage("products"),
        },
        {
          label: "About",
          href: "#about",
          onClick: () => setCurrentPage("about"),
        },
        {
          label: "Contact",
          href: "#contact",
          onClick: () => setCurrentPage("contact"),
        },
      ];

      const tabItems = [
        { value: "overview", label: "Overview" },
        { value: "details", label: "Details" },
        { value: "reviews", label: "Reviews" },
        { value: "specs", label: "Specifications" },
      ];

      return (
        <div className="navigation-app">
          <header>
            <GlassMobileNav
              items={navigationItems}
              isOpen={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
              currentPath={`#${currentPage}`}
            />
          </header>

          <nav aria-label="Breadcrumb navigation">
            <GlassBreadcrumbs
              items={breadcrumbItems}
              onNavigate={(href) => {
                const page = href.replace("#", "");
                setCurrentPage(page);
              }}
            />
          </nav>

          <main>
            <h1>{pages[currentPage as keyof typeof pages]?.name || "Page"}</h1>

            <GlassTabs
              value={activeTab}
              onChange={setActiveTab}
              items={tabItems}
            />

            <div role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
              <h2>{tabItems.find((t) => t.value === activeTab)?.label}</h2>
              <p>Content for {activeTab}</p>
            </div>

            <footer>
              <GlassPagination
                currentPage={pageNumber}
                totalPages={10}
                onPageChange={setPageNumber}
                showFirstLast
                showPrevNext
                maxVisible={5}
              />
            </footer>
          </main>
        </div>
      );
    };

    it("should navigate through complete navigation system", async () => {
      const { container } = render(<NavigationApp />);

      // Initial state
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Overview")).toBeInTheDocument();

      // Navigate via breadcrumbs
      const productsLink = screen.getByRole("link", { name: "Products" });
      await user.click(productsLink);
      expect(
        screen.getByRole("heading", { name: "Products" }),
      ).toBeInTheDocument();

      // Tab navigation
      const detailsTab = screen.getByRole("tab", { name: "Details" });
      await user.click(detailsTab);
      expect(screen.getByText("Content for details")).toBeInTheDocument();

      // Pagination
      const nextButton = screen.getByLabelText("Go to next page");
      await user.click(nextButton);
      expect(screen.getByLabelText("Current page, page 2")).toBeInTheDocument();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should handle keyboard navigation correctly", async () => {
      render(<NavigationApp />);

      // Tab navigation with keyboard
      const firstTab = screen.getByRole("tab", { name: "Overview" });
      firstTab.focus();

      // Arrow key navigation
      fireEvent.keyDown(firstTab, { key: "ArrowRight" });
      expect(screen.getByRole("tab", { name: "Details" })).toHaveFocus();

      fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
      expect(screen.getByRole("tab", { name: "Reviews" })).toHaveFocus();

      // Wrap around
      fireEvent.keyDown(screen.getByRole("tab", { name: "Specifications" }), {
        key: "ArrowRight",
      });
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();

      // Reverse navigation
      fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
      expect(screen.getByRole("tab", { name: "Specifications" })).toHaveFocus();
    });
  });

  describe("Mobile Navigation Responsive Behavior", () => {
    beforeEach(() => {
      mockMatchMedia(true); // Mobile view
    });

    it("should handle mobile menu toggle and trap focus", async () => {
      const MobileNavTest = () => {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open Menu</button>
            <GlassMobileNav
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ]}
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
            />
            <button>Outside button</button>
          </>
        );
      };

      render(<MobileNavTest />);

      // Open mobile menu
      await user.click(screen.getByText("Open Menu"));

      // Menu should be open
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-expanded", "true");

      // Focus should be trapped within menu
      const homeLink = screen.getByRole("link", { name: "Home" });
      const contactLink = screen.getByRole("link", { name: "Contact" });

      homeLink.focus();
      expect(homeLink).toHaveFocus();

      // Tab through menu items
      await user.tab();
      expect(screen.getByRole("link", { name: "About" })).toHaveFocus();

      await user.tab();
      expect(contactLink).toHaveFocus();

      // Should wrap back to close button or first item
      await user.tab();
      const closeButton = screen.getByLabelText(/close/i);
      expect(closeButton).toHaveFocus();
    });
  });

  describe("Breadcrumb Navigation", () => {
    it("should handle deep navigation paths", async () => {
      const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Categories", href: "/categories" },
        { label: "Electronics", href: "/categories/electronics" },
        { label: "Computers", href: "/categories/electronics/computers" },
        { label: "Laptops", href: "/categories/electronics/computers/laptops" },
      ];

      const handleNavigate = jest.fn();

      const { container } = render(
        <GlassBreadcrumbs
          items={breadcrumbItems}
          onNavigate={handleNavigate}
        />,
      );

      // All items should be visible
      breadcrumbItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });

      // Click middle item
      await user.click(screen.getByText("Electronics"));
      expect(handleNavigate).toHaveBeenCalledWith("/categories/electronics");

      // Last item should not be a link (current page)
      const lastItem = screen.getByText("Laptops");
      expect(lastItem.closest("a")).not.toBeInTheDocument();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should truncate long breadcrumb paths on mobile", async () => {
      mockMatchMedia(true); // Mobile view

      const longBreadcrumbs = Array.from({ length: 8 }, (_, i) => ({
        label: `Level ${i + 1}`,
        href: `/level-${i + 1}`,
      }));

      render(
        <GlassBreadcrumbs
          items={longBreadcrumbs}
          maxItems={3}
          onNavigate={jest.fn()}
        />,
      );

      // Should show ellipsis for truncated items
      expect(screen.getByText("...")).toBeInTheDocument();

      // Should show first and last items
      expect(screen.getByText("Level 1")).toBeInTheDocument();
      expect(screen.getByText("Level 8")).toBeInTheDocument();
    });
  });

  describe("Pagination Complex Scenarios", () => {
    it("should handle pagination with dynamic total pages", async () => {
      const PaginationTest = () => {
        const [currentPage, setCurrentPage] = React.useState(1);
        const [totalPages, setTotalPages] = React.useState(10);

        return (
          <>
            <button onClick={() => setTotalPages(5)}>Set 5 pages</button>
            <button onClick={() => setTotalPages(20)}>Set 20 pages</button>

            <GlassPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showFirstLast
              showPrevNext
              maxVisible={5}
            />

            <div>
              Current: {currentPage} of {totalPages}
            </div>
          </>
        );
      };

      render(<PaginationTest />);

      // Navigate to page 8
      const page8Button = screen.getByLabelText("Go to page 8");
      await user.click(page8Button);
      expect(screen.getByText("Current: 8 of 10")).toBeInTheDocument();

      // Reduce total pages to 5
      await user.click(screen.getByText("Set 5 pages"));

      // Current page should adjust to max available
      expect(screen.getByText("Current: 5 of 5")).toBeInTheDocument();

      // Increase pages
      await user.click(screen.getByText("Set 20 pages"));

      // Should maintain current page
      expect(screen.getByText("Current: 5 of 20")).toBeInTheDocument();
    });

    it("should handle keyboard shortcuts for pagination", async () => {
      const handlePageChange = jest.fn();

      render(
        <GlassPagination
          currentPage={5}
          totalPages={10}
          onPageChange={handlePageChange}
          enableKeyboardShortcuts
        />,
      );

      // Focus pagination
      const pagination = screen.getByRole("navigation", {
        name: /pagination/i,
      });
      pagination.focus();

      // Home key - go to first page
      fireEvent.keyDown(pagination, { key: "Home" });
      expect(handlePageChange).toHaveBeenCalledWith(1);

      // End key - go to last page
      fireEvent.keyDown(pagination, { key: "End" });
      expect(handlePageChange).toHaveBeenCalledWith(10);

      // Page Up/Down for bulk navigation
      fireEvent.keyDown(pagination, { key: "PageUp" });
      expect(handlePageChange).toHaveBeenCalledWith(4); // Current - 1

      fireEvent.keyDown(pagination, { key: "PageDown" });
      expect(handlePageChange).toHaveBeenCalledWith(6); // Current + 1
    });
  });

  describe("Tab Navigation with Dynamic Content", () => {
    it("should handle dynamically added/removed tabs", async () => {
      const DynamicTabs = () => {
        const [tabs, setTabs] = React.useState([
          { value: "tab1", label: "Tab 1" },
          { value: "tab2", label: "Tab 2" },
        ]);
        const [activeTab, setActiveTab] = React.useState("tab1");

        const addTab = () => {
          const newTab = {
            value: `tab${tabs.length + 1}`,
            label: `Tab ${tabs.length + 1}`,
          };
          setTabs([...tabs, newTab]);
        };

        const removeTab = (value: string) => {
          setTabs(tabs.filter((t) => t.value !== value));
          if (activeTab === value && tabs.length > 1) {
            setActiveTab(
              tabs[0].value === value ? tabs[1].value : tabs[0].value,
            );
          }
        };

        return (
          <>
            <button onClick={addTab}>Add Tab</button>

            <GlassTabs value={activeTab} onChange={setActiveTab} items={tabs} />

            <div>
              {tabs.map((tab) => (
                <button key={tab.value} onClick={() => removeTab(tab.value)}>
                  Remove {tab.label}
                </button>
              ))}
            </div>
          </>
        );
      };

      const { container } = render(<DynamicTabs />);

      // Add new tab
      await user.click(screen.getByText("Add Tab"));
      expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();

      // Select new tab
      await user.click(screen.getByRole("tab", { name: "Tab 3" }));
      expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveAttribute(
        "aria-selected",
        "true",
      );

      // Remove active tab
      await user.click(screen.getByText("Remove Tab 3"));

      // Should fall back to another tab
      expect(
        screen.queryByRole("tab", { name: "Tab 3" }),
      ).not.toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
        "aria-selected",
        "true",
      );

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should maintain focus when switching tabs", async () => {
      const TabsWithContent = () => {
        const [activeTab, setActiveTab] = React.useState("settings");

        const tabs = [
          { value: "profile", label: "Profile" },
          { value: "settings", label: "Settings" },
          { value: "notifications", label: "Notifications" },
        ];

        return (
          <>
            <GlassTabs value={activeTab} onChange={setActiveTab} items={tabs} />

            <div role="tabpanel">
              {activeTab === "profile" && <input placeholder="Name" />}
              {activeTab === "settings" && <input placeholder="Email" />}
              {activeTab === "notifications" && (
                <input placeholder="Frequency" />
              )}
            </div>
          </>
        );
      };

      render(<TabsWithContent />);

      // Focus on tab
      const settingsTab = screen.getByRole("tab", { name: "Settings" });
      settingsTab.focus();
      expect(settingsTab).toHaveFocus();

      // Switch to profile tab
      const profileTab = screen.getByRole("tab", { name: "Profile" });
      await user.click(profileTab);

      // Focus should remain on tabs
      expect(profileTab).toHaveFocus();

      // Tab into content
      await user.tab();
      expect(screen.getByPlaceholderText("Name")).toHaveFocus();
    });
  });

  describe("Navigation State Persistence", () => {
    it("should restore navigation state correctly", async () => {
      const NavigationWithState = () => {
        const [state, setState] = React.useState(() => {
          // Simulate loading from localStorage
          return {
            currentPage: "products",
            activeTab: "reviews",
            pageNumber: 3,
            expandedItems: ["category-1", "category-2"],
          };
        });

        const updateState = (updates: Partial<typeof state>) => {
          const newState = { ...state, ...updates };
          setState(newState);
          // Simulate saving to localStorage
          localStorage.setItem("nav-state", JSON.stringify(newState));
        };

        return (
          <div>
            <div>Current Page: {state.currentPage}</div>
            <div>Active Tab: {state.activeTab}</div>
            <div>Page Number: {state.pageNumber}</div>

            <GlassTabs
              value={state.activeTab}
              onChange={(tab) => updateState({ activeTab: tab })}
              items={[
                { value: "overview", label: "Overview" },
                { value: "reviews", label: "Reviews" },
                { value: "specs", label: "Specs" },
              ]}
            />

            <GlassPagination
              currentPage={state.pageNumber}
              totalPages={10}
              onPageChange={(page) => updateState({ pageNumber: page })}
            />
          </div>
        );
      };

      render(<NavigationWithState />);

      // Verify restored state
      expect(screen.getByText("Current Page: products")).toBeInTheDocument();
      expect(screen.getByText("Active Tab: reviews")).toBeInTheDocument();
      expect(screen.getByText("Page Number: 3")).toBeInTheDocument();

      // Reviews tab should be active
      expect(screen.getByRole("tab", { name: "Reviews" })).toHaveAttribute(
        "aria-selected",
        "true",
      );

      // Page 3 should be current
      expect(screen.getByLabelText("Current page, page 3")).toBeInTheDocument();
    });
  });
});
