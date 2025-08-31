import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidTabs } from "./liquid-tabs";

const meta: Meta<typeof LiquidTabs> = {
  title: "Navigation/LiquidTabs",
  component: LiquidTabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Animated tab component with Apple HIG liquid glass design, supporting multiple variants and orientations.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "pills", "underline"],
      description: "Visual style variant",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Tab orientation",
    },
    animateIndicator: {
      control: "boolean",
      description: "Enable animated indicator",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "400px",
          padding: "2rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LiquidTabs>;

// Icons
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.5 14.25c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.5 0v12.5H1.75a.25.25 0 0 0-.25.25z" />
    <path d="m3.984 9.53 2.48-2.48a.25.25 0 0 1 .354 0l1.828 1.828 3.944-3.944a.25.25 0 0 1 .354.354l-4.121 4.12a.25.25 0 0 1-.354 0L6.641 7.58 4.338 9.884a.25.25 0 1 1-.354-.354z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
  </svg>
);

// Sample content components
const DashboardContent = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-white mb-4">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
        <h3 className="font-medium text-white mb-2">Total Users</h3>
        <p className="text-2xl font-bold text-white">1,247</p>
        <p className="text-sm text-white/70">+12% from last month</p>
      </div>
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
        <h3 className="font-medium text-white mb-2">Revenue</h3>
        <p className="text-2xl font-bold text-white">$24,589</p>
        <p className="text-sm text-white/70">+8% from last month</p>
      </div>
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-white mb-4">Analytics</h2>
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
      <h3 className="font-medium text-white mb-4">Traffic Overview</h3>
      <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-end justify-center">
        <div className="text-white/70 text-sm">Chart visualization would go here</div>
      </div>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
    <div className="space-y-3">
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
        <h3 className="font-medium text-white mb-2">General Settings</h3>
        <p className="text-sm text-white/70">Configure your account preferences</p>
      </div>
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
        <h3 className="font-medium text-white mb-2">Security</h3>
        <p className="text-sm text-white/70">Manage your security settings</p>
      </div>
    </div>
  </div>
);

const ProfileContent = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <UserIcon />
        </div>
        <div>
          <h3 className="font-medium text-white">John Doe</h3>
          <p className="text-sm text-white/70">john.doe@example.com</p>
        </div>
      </div>
      <p className="text-white/80">Manage your profile information and preferences.</p>
    </div>
  </div>
);

const ReportsContent = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-white mb-4">Reports</h2>
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
        <h3 className="font-medium text-white mb-2">Monthly Report</h3>
        <p className="text-sm text-white/70 mb-3">Generated on March 15, 2024</p>
        <button className="px-3 py-1 bg-blue-500/20 text-blue-200 text-sm rounded hover:bg-blue-500/30 transition-colors">
          Download PDF
        </button>
      </div>
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
        <h3 className="font-medium text-white mb-2">Quarterly Analysis</h3>
        <p className="text-sm text-white/70 mb-3">Generated on January 1, 2024</p>
        <button className="px-3 py-1 bg-blue-500/20 text-blue-200 text-sm rounded hover:bg-blue-500/30 transition-colors">
          Download PDF
        </button>
      </div>
    </div>
  </div>
);

// Sample tabs data
const sampleTabs = [
  {
    value: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
    content: <DashboardContent />,
  },
  {
    value: "analytics",
    label: "Analytics",
    icon: <ChartIcon />,
    badge: "3",
    content: <AnalyticsContent />,
  },
  {
    value: "reports",
    label: "Reports",
    icon: <DocumentIcon />,
    content: <ReportsContent />,
  },
  {
    value: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    content: <SettingsContent />,
  },
];

const simpleTabs = [
  {
    value: "tab1",
    label: "Tab One",
    content: <div className="text-white">Content for Tab One</div>,
  },
  {
    value: "tab2",
    label: "Tab Two",
    content: <div className="text-white">Content for Tab Two</div>,
  },
  {
    value: "tab3",
    label: "Tab Three",
    content: <div className="text-white">Content for Tab Three</div>,
  },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    defaultValue: "dashboard",
  },
};

export const Card: Story = {
  args: {
    variant: "card",
    tabs: sampleTabs,
    defaultValue: "dashboard",
  },
};

export const Pills: Story = {
  args: {
    variant: "pills",
    tabs: sampleTabs,
    defaultValue: "dashboard",
  },
};

export const Underline: Story = {
  args: {
    variant: "underline",
    tabs: sampleTabs,
    defaultValue: "dashboard",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    tabs: sampleTabs,
    defaultValue: "dashboard",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "500px",
          width: "100%",
          maxWidth: "800px",
          padding: "2rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const VerticalCard: Story = {
  args: {
    variant: "card",
    orientation: "vertical",
    tabs: sampleTabs,
    defaultValue: "dashboard",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "500px",
          width: "100%",
          maxWidth: "800px",
          padding: "2rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const WithBadges: Story = {
  args: {
    variant: "card",
    tabs: [
      {
        value: "inbox",
        label: "Inbox",
        badge: "12",
        content: <div className="text-white">Inbox content with 12 new messages</div>,
      },
      {
        value: "drafts",
        label: "Drafts",
        badge: "3",
        content: <div className="text-white">Draft messages</div>,
      },
      { value: "sent", label: "Sent", content: <div className="text-white">Sent messages</div> },
      {
        value: "trash",
        label: "Trash",
        badge: "1",
        content: <div className="text-white">Deleted messages</div>,
      },
    ],
    defaultValue: "inbox",
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      {
        value: "available",
        label: "Available",
        content: <div className="text-white">This tab is available</div>,
      },
      {
        value: "disabled",
        label: "Disabled",
        disabled: true,
        content: <div className="text-white">This content won't show</div>,
      },
      {
        value: "another",
        label: "Another",
        content: <div className="text-white">Another available tab</div>,
      },
    ],
    defaultValue: "available",
  },
};

export const NoAnimation: Story = {
  args: {
    tabs: simpleTabs,
    defaultValue: "tab1",
    animateIndicator: false,
  },
};

export const LongLabels: Story = {
  args: {
    variant: "card",
    tabs: [
      {
        value: "very-long",
        label: "Very Long Tab Label",
        content: <div className="text-white">Content for very long tab</div>,
      },
      {
        value: "extremely",
        label: "Extremely Long Tab Label That Might Wrap",
        content: <div className="text-white">Content for extremely long tab</div>,
      },
      {
        value: "short",
        label: "Short",
        content: <div className="text-white">Content for short tab</div>,
      },
    ],
    defaultValue: "very-long",
  },
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState("dashboard");
    const [tabCounts, setTabCounts] = useState({
      analytics: 3,
      reports: 0,
    });

    const handleTabChange = (value: string) => {
      setSelectedTab(value);

      // Simulate updating badge counts
      if (value === "analytics") {
        setTabCounts((prev) => ({ ...prev, analytics: 0 }));
      }
    };

    const interactiveTabs = [
      {
        value: "dashboard",
        label: "Dashboard",
        icon: <HomeIcon />,
        content: (
          <div className="space-y-4">
            <DashboardContent />
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <p className="text-white/80">
                Selected tab: <strong>{selectedTab}</strong>
              </p>
            </div>
          </div>
        ),
      },
      {
        value: "analytics",
        label: "Analytics",
        icon: <ChartIcon />,
        badge: tabCounts.analytics > 0 ? tabCounts.analytics.toString() : undefined,
        content: (
          <div className="space-y-4">
            <AnalyticsContent />
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <p className="text-white/80">Badge count was cleared when you clicked this tab!</p>
            </div>
          </div>
        ),
      },
      {
        value: "profile",
        label: "Profile",
        icon: <UserIcon />,
        content: <ProfileContent />,
      },
    ];

    return (
      <div className="space-y-6">
        <LiquidTabs
          variant="card"
          tabs={interactiveTabs}
          value={selectedTab}
          onValueChange={handleTabChange}
        />

        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
          <h3 className="text-white font-medium mb-2">Interactive Controls</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTabCounts((prev) => ({ ...prev, analytics: prev.analytics + 1 }))}
              className="px-3 py-1 bg-blue-500/20 text-blue-200 text-sm rounded hover:bg-blue-500/30 transition-colors"
            >
              Add Analytics Badge
            </button>
            <button
              onClick={() => setTabCounts((prev) => ({ ...prev, reports: prev.reports + 1 }))}
              className="px-3 py-1 bg-green-500/20 text-green-200 text-sm rounded hover:bg-green-500/30 transition-colors"
            >
              Add Reports Badge
            </button>
          </div>
        </div>
      </div>
    );
  },
};
