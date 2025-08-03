import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";

// Import responsive components
import { GlassResponsiveButton } from "../../components/glass-responsive-button";
import { GlassResponsiveCard } from "../../components/glass-responsive-card";
import { GlassMobileNav } from "../../components/glass-mobile-nav";
import { GlassTable } from "../../components/glass-table";
import { GlassCard } from "../../components/glass-card-refactored";
import { GlassButton } from "../../components/glass-button-refactored";

expect.extend(toHaveNoViolations);

// Helper to simulate viewport changes
const setViewport = (width: number, height: number = 768) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event("resize"));
};

// Mock matchMedia for responsive tests
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

describe("Responsive Behavior Integration Tests", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Reset viewport to desktop
    setViewport(1920, 1080);
  });

  describe("Responsive Button Adaptations", () => {
    const ResponsiveButtonTest = () => {
      const [clicks, setClicks] = React.useState(0);

      return (
        <div>
          <GlassResponsiveButton
            onClick={() => setClicks((prev) => prev + 1)}
            icon="save"
            mobileLabel="Save"
            desktopLabel="Save Document"
            breakpoint={768}
          />

          <GlassResponsiveButton
            onClick={() => setClicks((prev) => prev + 1)}
            icon="download"
            hideTextOnMobile
          >
            Download Report
          </GlassResponsiveButton>

          <div>Clicks: {clicks}</div>
        </div>
      );
    };

    it("should adapt button content based on viewport", async () => {
      const { container } = render(<ResponsiveButtonTest />);

      // Desktop view
      expect(screen.getByText("Save Document")).toBeInTheDocument();
      expect(screen.getByText("Download Report")).toBeInTheDocument();

      // Switch to mobile
      setViewport(375, 667);
      await waitFor(() => {
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.queryByText("Save Document")).not.toBeInTheDocument();
      });

      // Download button should only show icon on mobile
      expect(screen.queryByText("Download Report")).not.toBeInTheDocument();
      expect(screen.getByLabelText("Download Report")).toBeInTheDocument();

      // Functionality should remain the same
      await user.click(screen.getByText("Save"));
      expect(screen.getByText("Clicks: 1")).toBeInTheDocument();

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should handle touch interactions on mobile", async () => {
      mockMatchMedia(true); // Mobile
      render(<ResponsiveButtonTest />);

      const saveButton = screen.getByText("Save");

      // Simulate touch events
      fireEvent.touchStart(saveButton, {
        touches: [{ clientX: 0, clientY: 0 }],
      });
      fireEvent.touchEnd(saveButton);

      expect(screen.getByText("Clicks: 1")).toBeInTheDocument();
    });
  });

  describe("Responsive Card Layouts", () => {
    const ResponsiveCardGrid = () => {
      const cards = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Card ${i + 1}`,
        content: `Content for card ${i + 1}`,
      }));

      return (
        <div className="card-grid" data-testid="card-grid">
          {cards.map((card) => (
            <GlassResponsiveCard
              key={card.id}
              orientation="horizontal"
              mobileOrientation="vertical"
              breakpoint={768}
            >
              <div
                className="card-image"
                style={{ width: "200px", height: "150px" }}
              >
                Image
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </div>
            </GlassResponsiveCard>
          ))}
        </div>
      );
    };

    it("should adapt card orientation based on viewport", async () => {
      const { container } = render(<ResponsiveCardGrid />);

      // Desktop - horizontal cards
      const cards = screen.getAllByText(/Card \d/);
      expect(cards).toHaveLength(6);

      // Cards should be horizontal on desktop
      const firstCard = cards[0].closest(".glass-responsive-card");
      expect(firstCard).toHaveClass("horizontal");

      // Switch to mobile
      setViewport(375, 667);

      await waitFor(() => {
        const mobileCard = cards[0].closest(".glass-responsive-card");
        expect(mobileCard).toHaveClass("vertical");
      });

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Mobile Navigation Behavior", () => {
    const MobileNavApp = () => {
      const [isOpen, setIsOpen] = React.useState(false);
      const [currentPath, setCurrentPath] = React.useState("/home");

      const navItems = [
        { label: "Home", href: "/home" },
        { label: "Products", href: "/products" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ];

      return (
        <>
          <GlassMobileNav
            items={navItems.map((item) => ({
              ...item,
              onClick: () => {
                setCurrentPath(item.href);
                setIsOpen(false);
              },
            }))}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            currentPath={currentPath}
          />

          <main>
            <h1>Current: {currentPath}</h1>
          </main>
        </>
      );
    };

    it("should show/hide navigation based on viewport", async () => {
      render(<MobileNavApp />);

      // Desktop - nav should be visible
      setViewport(1024, 768);
      const desktopNav = screen.getByRole("navigation");
      expect(desktopNav).toBeVisible();

      // Mobile - nav should be hidden by default
      setViewport(375, 667);
      mockMatchMedia(true);

      await waitFor(() => {
        expect(screen.getByLabelText(/menu/i)).toBeInTheDocument();
      });

      // Open mobile menu
      const menuButton = screen.getByLabelText(/menu/i);
      await user.click(menuButton);

      // Navigation should be visible
      expect(desktopNav).toHaveAttribute("aria-expanded", "true");

      // Navigate to a page
      await user.click(screen.getByText("Products"));

      // Menu should close and path should update
      expect(screen.getByText("Current: /products")).toBeInTheDocument();
      expect(desktopNav).toHaveAttribute("aria-expanded", "false");
    });

    it("should handle swipe gestures on mobile", async () => {
      mockMatchMedia(true); // Mobile
      render(<MobileNavApp />);

      const nav = screen.getByRole("navigation");

      // Open menu
      await user.click(screen.getByLabelText(/menu/i));
      expect(nav).toHaveAttribute("aria-expanded", "true");

      // Simulate swipe to close
      fireEvent.touchStart(nav, {
        touches: [{ clientX: 250, clientY: 100 }],
      });
      fireEvent.touchMove(nav, {
        touches: [{ clientX: 50, clientY: 100 }],
      });
      fireEvent.touchEnd(nav);

      // Menu should close
      await waitFor(() => {
        expect(nav).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  describe("Responsive Table", () => {
    const ResponsiveTableTest = () => {
      const data = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
          status: "Active",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "User",
          status: "Active",
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob@example.com",
          role: "User",
          status: "Inactive",
        },
      ];

      const columns = [
        { key: "name", label: "Name", priority: 1 },
        { key: "email", label: "Email", priority: 2 },
        { key: "role", label: "Role", priority: 3 },
        { key: "status", label: "Status", priority: 4 },
      ];

      return (
        <GlassTable
          data={data}
          columns={columns}
          responsive
          mobileView="card"
          breakpoint={768}
        />
      );
    };

    it("should switch between table and card view", async () => {
      const { container } = render(<ResponsiveTableTest />);

      // Desktop - should show table
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(4); // Header + 3 data rows

      // Switch to mobile
      setViewport(375, 667);

      // Should show card view
      await waitFor(() => {
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
        expect(screen.getAllByTestId("table-card")).toHaveLength(3);
      });

      // Cards should contain all data
      const firstCard = screen.getAllByTestId("table-card")[0];
      expect(firstCard).toHaveTextContent("John Doe");
      expect(firstCard).toHaveTextContent("john@example.com");
      expect(firstCard).toHaveTextContent("Admin");
      expect(firstCard).toHaveTextContent("Active");

      // Accessibility test
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should hide low priority columns on smaller screens", async () => {
      render(<ResponsiveTableTest />);

      // Tablet view - should hide lowest priority column
      setViewport(768, 1024);

      await waitFor(() => {
        const headers = screen.getAllByRole("columnheader");
        expect(headers).toHaveLength(3); // Status column hidden
        expect(screen.queryByText("Status")).not.toBeInTheDocument();
      });

      // Smaller tablet - hide more columns
      setViewport(600, 800);

      await waitFor(() => {
        const headers = screen.getAllByRole("columnheader");
        expect(headers).toHaveLength(2); // Only name and email visible
      });
    });
  });

  describe("Breakpoint Transitions", () => {
    const BreakpointTest = () => {
      const [viewport, setViewport] = React.useState("desktop");

      React.useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          if (width < 640) setViewport("mobile");
          else if (width < 1024) setViewport("tablet");
          else setViewport("desktop");
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      return (
        <div className={`layout layout-${viewport}`}>
          <div className="viewport-indicator">Current: {viewport}</div>

          <div className="responsive-grid">
            {[1, 2, 3, 4].map((i) => (
              <GlassCard key={i} className="grid-item">
                <h3>Item {i}</h3>
                <p>Content adapts to {viewport} view</p>
                {viewport === "mobile" && (
                  <GlassButton size="small" fullWidth>
                    Mobile Action
                  </GlassButton>
                )}
                {viewport !== "mobile" && (
                  <GlassButton size="medium">Desktop Action</GlassButton>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      );
    };

    it("should smoothly transition between breakpoints", async () => {
      render(<BreakpointTest />);

      // Desktop
      expect(screen.getByText("Current: desktop")).toBeInTheDocument();
      expect(screen.getAllByText("Desktop Action")).toHaveLength(4);

      // Transition to tablet
      setViewport(800, 600);
      await waitFor(() => {
        expect(screen.getByText("Current: tablet")).toBeInTheDocument();
      });

      // Transition to mobile
      setViewport(375, 667);
      await waitFor(() => {
        expect(screen.getByText("Current: mobile")).toBeInTheDocument();
        expect(screen.getAllByText("Mobile Action")).toHaveLength(4);
        expect(screen.queryByText("Desktop Action")).not.toBeInTheDocument();
      });

      // Back to desktop
      setViewport(1920, 1080);
      await waitFor(() => {
        expect(screen.getByText("Current: desktop")).toBeInTheDocument();
        expect(screen.getAllByText("Desktop Action")).toHaveLength(4);
      });
    });
  });

  describe("Touch and Gesture Support", () => {
    const TouchGestureTest = () => {
      const [swipeDirection, setSwipeDirection] = React.useState("");
      const [tapCount, setTapCount] = React.useState(0);
      const [pinchScale, setPinchScale] = React.useState(1);

      const handleSwipe = (direction: string) => {
        setSwipeDirection(direction);
        setTimeout(() => setSwipeDirection(""), 1000);
      };

      return (
        <div className="touch-test">
          <GlassCard
            className="swipeable-card"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              (e.currentTarget as any).startX = touch.clientX;
              (e.currentTarget as any).startY = touch.clientY;
            }}
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              const startX = (e.currentTarget as any).startX;
              const startY = (e.currentTarget as any).startY;

              const deltaX = touch.clientX - startX;
              const deltaY = touch.clientY - startY;

              if (Math.abs(deltaX) > 50) {
                handleSwipe(deltaX > 0 ? "right" : "left");
              } else if (Math.abs(deltaY) > 50) {
                handleSwipe(deltaY > 0 ? "down" : "up");
              }
            }}
          >
            <h3>Swipe Me</h3>
            {swipeDirection && <p>Swiped: {swipeDirection}</p>}
          </GlassCard>

          <GlassButton
            onClick={() => setTapCount((prev) => prev + 1)}
            onDoubleClick={() => setTapCount((prev) => prev + 10)}
          >
            Tap Count: {tapCount}
          </GlassButton>

          <div
            className="pinch-area"
            style={{ transform: `scale(${pinchScale})` }}
            onWheel={(e) => {
              if (e.ctrlKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? 0.9 : 1.1;
                setPinchScale((prev) =>
                  Math.max(0.5, Math.min(2, prev * delta)),
                );
              }
            }}
          >
            Pinch to zoom (Scale: {pinchScale.toFixed(2)})
          </div>
        </div>
      );
    };

    it("should handle touch gestures on mobile", async () => {
      mockMatchMedia(true); // Mobile
      render(<TouchGestureTest />);

      const card = screen.getByText("Swipe Me").closest(".swipeable-card")!;

      // Simulate swipe right
      fireEvent.touchStart(card, {
        touches: [{ clientX: 50, clientY: 100 }],
      });
      fireEvent.touchEnd(card, {
        changedTouches: [{ clientX: 150, clientY: 100 }],
      });

      expect(screen.getByText("Swiped: right")).toBeInTheDocument();

      // Simulate swipe up
      fireEvent.touchStart(card, {
        touches: [{ clientX: 100, clientY: 150 }],
      });
      fireEvent.touchEnd(card, {
        changedTouches: [{ clientX: 100, clientY: 50 }],
      });

      await waitFor(() => {
        expect(screen.getByText("Swiped: up")).toBeInTheDocument();
      });
    });
  });
});
