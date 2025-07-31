import { describe, expect, it, jest } from "bun:test";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Home, User, Settings } from "lucide-react";
import { GlassMobileNav, type NavItem } from "./glass-mobile-nav";

// Mock createPortal for testing
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (children: React.ReactNode) => children,
}));

const mockNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

const nestedNavItems: NavItem[] = [
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
        id: "edit-profile",
        label: "Edit Profile",
      },
      {
        id: "preferences",
        label: "Preferences",
      },
    ],
  },
];

describe("GlassMobileNav", () => {
  it("renders hamburger button", () => {
    render(<GlassMobileNav items={mockNavItems} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    expect(hamburgerButton).toBeInTheDocument();
  });

  it("opens navigation drawer when hamburger is clicked", async () => {
    render(<GlassMobileNav items={mockNavItems} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByText("Navigation")).toBeInTheDocument();
    });
  });

  it("renders navigation items", async () => {
    render(<GlassMobileNav items={mockNavItems} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  it("handles item clicks", async () => {
    const handleItemClick = jest.fn();
    render(
      <GlassMobileNav items={mockNavItems} onItemClick={handleItemClick} />,
    );

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const homeButton = screen.getByText("Home");
      fireEvent.click(homeButton);

      expect(handleItemClick).toHaveBeenCalledWith(mockNavItems[0]);
    });
  });

  it("closes drawer when item is clicked and closeOnItemClick is true", async () => {
    render(<GlassMobileNav items={mockNavItems} closeOnItemClick={true} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const homeButton = screen.getByText("Home");
      fireEvent.click(homeButton);
    });

    // Drawer should close
    await waitFor(() => {
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });
  });

  it("keeps drawer open when closeOnItemClick is false", async () => {
    render(<GlassMobileNav items={mockNavItems} closeOnItemClick={false} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const homeButton = screen.getByText("Home");
      fireEvent.click(homeButton);

      // Drawer should remain open
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
  });

  it("shows active item correctly", async () => {
    render(<GlassMobileNav items={mockNavItems} activeItemId="profile" />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const profileButton = screen.getByText("Profile");
      expect(profileButton).toHaveAttribute("aria-current", "page");
    });
  });

  it("handles nested navigation items", async () => {
    render(<GlassMobileNav items={nestedNavItems} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const profileButton = screen.getByText("Profile");
      expect(profileButton).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(profileButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Edit Profile")).toBeInTheDocument();
      expect(screen.getByText("Preferences")).toBeInTheDocument();
    });
  });

  it("closes drawer with close button", async () => {
    render(<GlassMobileNav items={mockNavItems} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const closeButton = screen.getByLabelText("Close navigation menu");
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });
  });

  it("closes drawer with Escape key", async () => {
    render(<GlassMobileNav items={mockNavItems} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const navigation = screen.getByRole("navigation");
      fireEvent.keyDown(navigation, { key: "Escape" });
    });

    await waitFor(() => {
      expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });
  });

  it("renders with custom header", async () => {
    const customHeader = <h2>Custom Header</h2>;
    render(<GlassMobileNav items={mockNavItems} header={customHeader} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      expect(screen.getByText("Custom Header")).toBeInTheDocument();
    });
  });

  it("renders with custom footer", async () => {
    const customFooter = <div>Custom Footer</div>;
    render(<GlassMobileNav items={mockNavItems} footer={customFooter} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      expect(screen.getByText("Custom Footer")).toBeInTheDocument();
    });
  });

  it("renders badges on navigation items", async () => {
    const itemsWithBadges: NavItem[] = [
      {
        id: "notifications",
        label: "Notifications",
        badge: 5,
      },
      {
        id: "messages",
        label: "Messages",
        badge: "New",
      },
    ];

    render(<GlassMobileNav items={itemsWithBadges} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("New")).toBeInTheDocument();
    });
  });

  it("handles disabled items", async () => {
    const itemsWithDisabled: NavItem[] = [
      {
        id: "enabled",
        label: "Enabled Item",
      },
      {
        id: "disabled",
        label: "Disabled Item",
        disabled: true,
      },
    ];

    const handleItemClick = jest.fn();
    render(
      <GlassMobileNav
        items={itemsWithDisabled}
        onItemClick={handleItemClick}
      />,
    );

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const disabledButton = screen.getByText("Disabled Item");
      fireEvent.click(disabledButton);

      // Should not call onClick for disabled items
      expect(handleItemClick).not.toHaveBeenCalled();
    });
  });

  it("renders in different positions", async () => {
    const { rerender } = render(
      <GlassMobileNav items={mockNavItems} position="left" />,
    );

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const navigation = screen.getByRole("navigation");
      expect(navigation).toHaveClass("left-0");
    });

    rerender(<GlassMobileNav items={mockNavItems} position="right" />);

    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      const navigation = screen.getByRole("navigation");
      expect(navigation).toHaveClass("right-0");
    });
  });

  it("handles different sizes", () => {
    const { rerender } = render(
      <GlassMobileNav items={mockNavItems} size="sm" />,
    );

    let hamburgerButton = screen.getByLabelText("Open navigation menu");
    expect(hamburgerButton).toHaveClass("p-1.5");

    rerender(<GlassMobileNav items={mockNavItems} size="lg" />);

    hamburgerButton = screen.getByLabelText("Open navigation menu");
    expect(hamburgerButton).toHaveClass("p-3");
  });

  it("can hide overlay", async () => {
    render(<GlassMobileNav items={mockNavItems} showOverlay={false} />);

    const hamburgerButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(hamburgerButton);

    await waitFor(() => {
      // Should not render overlay
      expect(screen.queryByRole("button")).not.toHaveClass("fixed inset-0");
    });
  });
});
