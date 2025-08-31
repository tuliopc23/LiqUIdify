import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidButton } from "../liquid-button";
import { LiquidSidebar } from "./liquid-sidebar";

const meta: Meta<typeof LiquidSidebar> = {
  title: "Navigation/LiquidSidebar",
  component: LiquidSidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A collapsible sidebar with liquid glass design, supporting nested navigation, badges, and keyboard interaction.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "transparent", "solid"],
      description: "Visual style variant",
    },
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Side positioning",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Sidebar width",
    },
    collapsible: {
      control: "boolean",
      description: "Enable collapse functionality",
    },
    showOverlay: {
      control: "boolean",
      description: "Show overlay on mobile",
    },
    closeOnClickOutside: {
      control: "boolean",
      description: "Close when clicking outside",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiquidSidebar>;

// Icons
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7Z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 3a2 2 0 0 0-2 2v1.816a2 2 0 0 1 2-1.816h12a2 2 0 0 1 2 1.816V5a2 2 0 0 0-2-2H4Z" />
    <path
      fillRule="evenodd"
      d="M2 7.816V15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.816A2 2 0 0 1 16 6H4a2 2 0 0 1-2 1.816ZM6 10a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H7Z"
      clipRule="evenodd"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      clipRule="evenodd"
    />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
  </svg>
);

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 0 .948.684H15a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4Z" />
  </svg>
);

// Sample sections data
const sampleSections = [
  {
    title: "Navigation",
    items: [
      { label: "Dashboard", icon: <HomeIcon />, active: true, href: "/dashboard" },
      { label: "Analytics", icon: <ChartIcon />, href: "/analytics", badge: "12" },
      { label: "Reports", icon: <DocumentIcon />, href: "/reports" },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Projects",
        icon: <FolderIcon />,
        children: [
          { label: "Active Projects", href: "/projects/active", badge: "5" },
          { label: "Completed", href: "/projects/completed" },
          { label: "Archived", href: "/projects/archived" },
        ],
      },
      {
        label: "Team",
        icon: <UsersIcon />,
        children: [
          { label: "Members", href: "/team/members", badge: "24" },
          { label: "Roles", href: "/team/roles" },
          { label: "Permissions", href: "/team/permissions" },
        ],
      },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "General", icon: <SettingsIcon />, href: "/settings/general" },
      { label: "Security", icon: <SettingsIcon />, href: "/settings/security", badge: "!" },
      { label: "Integrations", icon: <SettingsIcon />, href: "/settings/integrations" },
    ],
  },
];

// Wrapper component for layout
const SidebarWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      height: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {children}
    <div
      style={{
        marginLeft: "20rem",
        padding: "2rem",
        color: "white",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Main Content Area</h1>
      <p style={{ marginBottom: "2rem", opacity: 0.8 }}>
        This is the main content area. The sidebar should appear to the left with a glass effect.
      </p>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1.5rem",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Card {i + 1}</h3>
            <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
              Sample content to demonstrate the layout with the sidebar.
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    sections: sampleSections,
    header: <div className="font-semibold text-white">LiqUIdify</div>,
    footer: <div className="text-sm text-white/60">v1.0.0</div>,
  },
  render: (args) => (
    <SidebarWrapper>
      <LiquidSidebar {...args} />
    </SidebarWrapper>
  ),
};

export const Collapsible: Story = {
  args: {
    collapsible: true,
    sections: sampleSections,
    header: <div className="font-semibold text-white">LiqUIdify</div>,
    footer: <div className="text-sm text-white/60">v1.0.0</div>,
  },
  render: (args) => (
    <SidebarWrapper>
      <LiquidSidebar {...args} />
    </SidebarWrapper>
  ),
};

export const RightSide: Story = {
  args: {
    side: "right",
    sections: sampleSections,
    header: <div className="font-semibold text-white">Settings</div>,
  },
  render: (args) => (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LiquidSidebar {...args} />
      <div
        style={{
          marginRight: "20rem",
          padding: "2rem",
          color: "white",
          height: "100%",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Main Content</h1>
        <p>Content area with right sidebar.</p>
      </div>
    </div>
  ),
};

export const Filled: Story = {
  args: {
    variant: "filled",
    sections: sampleSections,
    header: <div className="font-semibold text-white">Dashboard</div>,
  },
  render: (args) => (
    <SidebarWrapper>
      <LiquidSidebar {...args} />
    </SidebarWrapper>
  ),
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    sections: sampleSections,
    header: <div className="font-semibold text-white">Transparent</div>,
  },
  render: (args) => (
    <SidebarWrapper>
      <LiquidSidebar {...args} />
    </SidebarWrapper>
  ),
};

export const LargeSize: Story = {
  args: {
    size: "xl",
    sections: sampleSections,
    header: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
        <div>
          <div className="font-semibold text-white">LiqUIdify</div>
          <div className="text-xs text-white/60">Enterprise</div>
        </div>
      </div>
    ),
    footer: (
      <div className="space-y-2">
        <LiquidButton variant="ghost" size="sm" className="w-full justify-start text-white/80">
          Help & Support
        </LiquidButton>
        <div className="text-xs text-white/60 text-center">v1.0.0</div>
      </div>
    ),
  },
  render: (args) => (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LiquidSidebar {...args} />
      <div
        style={{
          marginLeft: "28rem",
          padding: "2rem",
          color: "white",
          height: "100%",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>XL Sidebar</h1>
        <p>Content area with extra large sidebar.</p>
      </div>
    </div>
  ),
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState("dashboard");

    const interactiveSections = sampleSections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        active: item.label.toLowerCase() === activeItem,
        onClick: () => setActiveItem(item.label.toLowerCase()),
        children: item.children?.map((child) => ({
          ...child,
          active: child.label.toLowerCase().replace(" ", "-") === activeItem,
          onClick: () => setActiveItem(child.label.toLowerCase().replace(" ", "-")),
        })),
      })),
    }));

    return (
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LiquidSidebar
          collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          collapsed={isCollapsed}
          onCollapsedChange={setIsCollapsed}
          sections={interactiveSections}
          header={<div className="font-semibold text-white">Interactive Demo</div>}
          footer={
            <div className="space-y-2">
              <div className="text-xs text-white/60">Active: {activeItem}</div>
              <div className="text-xs text-white/60">
                Status: {isCollapsed ? "Collapsed" : "Expanded"}
              </div>
            </div>
          }
        />

        <div
          style={{
            marginLeft: isCollapsed ? "4rem" : "20rem",
            transition: "margin-left 300ms ease-out",
            padding: "2rem",
            color: "white",
            height: "100%",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Interactive Sidebar Demo</h1>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <LiquidButton
                variant="ghost"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white border-white/20"
              >
                {isOpen ? "Hide" : "Show"} Sidebar
              </LiquidButton>
              <LiquidButton
                variant="ghost"
                onClick={() => setIsCollapsed(!isCollapsed)}
                disabled={!isOpen}
                className="text-white border-white/20"
              >
                {isCollapsed ? "Expand" : "Collapse"}
              </LiquidButton>
            </div>
            <p style={{ opacity: 0.8 }}>
              Try interacting with the sidebar navigation, collapsing/expanding it, and clicking on
              items.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "2rem",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>Current State</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>Sidebar Open: {isOpen ? "Yes" : "No"}</li>
              <li style={{ marginBottom: "0.5rem" }}>Collapsed: {isCollapsed ? "Yes" : "No"}</li>
              <li style={{ marginBottom: "0.5rem" }}>Active Item: {activeItem}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};
