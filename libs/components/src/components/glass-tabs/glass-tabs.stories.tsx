import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Bell,
  Code,
  CreditCard,
  Database,
  Shield,
  Terminal,
  User,
} from "lucide-react";
import { type GlassTabItem, GlassTabs } from "./glass-tabs";

const meta: Meta<typeof GlassTabs> = {
  title: "Components/Navigation/GlassTabs",
  component: GlassTabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GlassTabs>;

const basicTabs: Array<GlassTabItem> = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
          Overview
        </h3>
        <p className="text-liquid-secondary dark:text-liquid-grey">
          This is the overview tab content. It provides a general introduction
          to the topic at hand.
        </p>
      </div>
    ),
  },
  {
    id: "details",
    label: "Details",
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
          Details
        </h3>
        <p className="text-liquid-secondary dark:text-liquid-grey">
          This tab contains more detailed information about the subject matter.
        </p>
      </div>
    ),
  },
  {
    id: "resources",
    label: "Resources",
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
          Resources
        </h3>
        <p className="text-liquid-secondary dark:text-liquid-grey">
          Find additional resources and documentation here.
        </p>
      </div>
    ),
  },
];

export const Default: Story = { args: { tabs: basicTabs } };
export const WithDefaultTab: Story = {
  args: { tabs: basicTabs, defaultTab: "details" },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      {
        id: "profile",
        label: (
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Profile Settings
            </h3>
            <p className="text-liquid-secondary dark:text-liquid-grey">
              Manage your personal information and profile settings.
            </p>
          </div>
        ),
      },
      {
        id: "notifications",
        label: (
          <span className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Notification Preferences
            </h3>
            <p className="text-liquid-secondary dark:text-liquid-grey">
              Configure how and when you receive notifications.
            </p>
          </div>
        ),
      },
      {
        id: "security",
        label: (
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Security Settings
            </h3>
            <p className="text-liquid-secondary dark:text-liquid-grey">
              Manage your account security and privacy settings.
            </p>
          </div>
        ),
      },
    ],
  },
};

export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      {
        id: "active1",
        label: "Active Tab 1",
        content: <div>This tab is active and clickable.</div>,
      },
      {
        id: "disabled1",
        label: "Disabled Tab",
        content: <div>This content is not accessible.</div>,
        disabled: true,
      },
      {
        id: "active2",
        label: "Active Tab 2",
        content: <div>Another active tab.</div>,
      },
      {
        id: "disabled2",
        label: "Another Disabled",
        content: <div>This content is also not accessible.</div>,
        disabled: true,
      },
    ],
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const demoTabs: Array<GlassTabItem> = [
      {
        id: "frontend",
        label: (
          <span className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Frontend
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Frontend Technologies
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
                <h4 className="mb-2 font-medium">Frameworks</h4>
                <ul className="space-y-1 text-liquid-secondary text-sm dark:text-liquid-grey">
                  <li>• React</li>
                  <li>• Vue.js</li>
                  <li>• Angular</li>
                </ul>
              </div>
              <div className="rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
                <h4 className="mb-2 font-medium">Tools</h4>
                <ul className="space-y-1 text-liquid-secondary text-sm dark:text-liquid-grey">
                  <li>• Webpack</li>
                  <li>• Vite</li>
                  <li>• TypeScript</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "backend",
        label: (
          <span className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backend
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Backend Technologies
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
                <h4 className="mb-2 font-medium">Languages</h4>
                <ul className="space-y-1 text-liquid-secondary text-sm dark:text-liquid-grey">
                  <li>• Node.js</li>
                  <li>• Python</li>
                  <li>• Go</li>
                </ul>
              </div>
              <div className="rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
                <h4 className="mb-2 font-medium">Databases</h4>
                <ul className="space-y-1 text-liquid-secondary text-sm dark:text-liquid-grey">
                  <li>• PostgreSQL</li>
                  <li>• MongoDB</li>
                  <li>• Redis</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "devops",
        label: (
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            DevOps
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              DevOps & Infrastructure
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
                <h4 className="mb-2 font-medium">CI/CD</h4>
                <ul className="space-y-1 text-liquid-secondary text-sm dark:text-liquid-grey">
                  <li>• GitHub Actions</li>
                  <li>• Jenkins</li>
                  <li>• GitLab CI</li>
                </ul>
              </div>
              <div className="rounded-lg bg-liquid-bg p-4 dark:bg-liquid-bg">
                <h4 className="mb-2 font-medium">Cloud</h4>
                <ul className="space-y-1 text-liquid-secondary text-sm dark:text-liquid-grey">
                  <li>• AWS</li>
                  <li>• Google Cloud</li>
                  <li>• Azure</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
    ];
    return (
      <div className="w-[600px]">
        <GlassTabs tabs={demoTabs} />
      </div>
    );
  },
};

export const SettingsExample: Story = {
  render: () => {
    const settingsTabs: Array<GlassTabItem> = [
      {
        id: "account",
        label: "Account",
        content: (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
                Account Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username-settings"
                    className="mb-2 block font-medium text-liquid-secondary text-sm dark:text-liquid-grey"
                  >
                    Username
                  </label>
                  <input
                    id="username-settings"
                    type="text"
                    className="w-full rounded-lg border border-liquid-grey px-4 py-2 dark:border-liquid-grey"
                    placeholder="john_doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email-settings"
                    className="mb-2 block font-medium text-liquid-secondary text-sm dark:text-liquid-grey"
                  >
                    Email
                  </label>
                  <input
                    id="email-settings"
                    type="email"
                    className="w-full rounded-lg border border-liquid-grey px-4 py-2 dark:border-liquid-grey"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "privacy",
        label: "Privacy",
        content: (
          <div className="space-y-6">
            <h3 className="mb-4 font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Privacy Settings
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Make profile public</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Show email address</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Allow direct messages</span>
              </label>
            </div>
          </div>
        ),
      },
      {
        id: "billing",
        label: "Billing",
        content: (
          <div className="space-y-6">
            <h3 className="mb-4 font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Billing Information
            </h3>
            <div className="rounded-lg bg-liquid-accent p-4 dark:bg-liquid-accent/20">
              <div className="mb-2 flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-liquid-accent dark:text-liquid-accent" />
                <span className="font-medium">Current Plan: Pro</span>
              </div>
              <p className="text-liquid-secondary text-sm dark:text-liquid-grey">
                $19/month • Renews on Jan 15, 2025
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg bg-liquid-accent px-4 py-2 text-liquid-text-inverse hover:bg-liquid-accent"
            >
              Manage Subscription
            </button>
          </div>
        ),
      },
    ];
    return (
      <div className="w-[500px]">
        <GlassTabs tabs={settingsTabs} />
      </div>
    );
  },
};

export const DocumentationExample: Story = {
  render: () => {
    const docsTabs: Array<GlassTabItem> = [
      {
        id: "installation",
        label: "Installation",
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Installation
            </h3>
            <div className="rounded-lg bg-liquid-bg p-4 font-mono text-liquid-secondary text-sm">
              npm install glass-ui-components
            </div>
            <p className="text-liquid-secondary dark:text-liquid-grey">
              Or using yarn:
            </p>
            <div className="rounded-lg bg-liquid-bg p-4 font-mono text-liquid-secondary text-sm">
              yarn add glass-ui-components
            </div>
          </div>
        ),
      },
      {
        id: "usage",
        label: "Usage",
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Basic Usage
            </h3>
            <pre className="overflow-x-auto rounded-lg bg-liquid-bg p-4 text-liquid-secondary">
              <code>{`import { GlassTabs } from 'glass-ui-components';\n\nconst tabs = [\n  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },\n  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }\n];\n\n<GlassTabs tabs={tabs} />`}</code>
            </pre>
          </div>
        ),
      },
      {
        id: "api",
        label: "API",
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              API Reference
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Prop</th>
                  <th className="py-2 text-left">Type</th>
                  <th className="py-2 text-left">Default</th>
                </tr>
              </thead>
              <tbody className="text-liquid-secondary dark:text-liquid-grey">
                <tr className="border-b">
                  <td className="py-2">tabs</td>
                  <td className="py-2">Array&lt;GlassTabItem&gt;</td>
                  <td className="py-2">required</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">defaultTab</td>
                  <td className="py-2">string</td>
                  <td className="py-2">first tab</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">className</td>
                  <td className="py-2">string</td>
                  <td className="py-2">undefined</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
    ];
    return (
      <div className="w-[600px]">
        <GlassTabs tabs={docsTabs} />
      </div>
    );
  },
};

export const CustomStyling: Story = {
  args: {
    tabs: [
      {
        id: "custom1",
        label: "Custom Tab 1",
        content: <div>Custom styled content 1</div>,
      },
      {
        id: "custom2",
        label: "Custom Tab 2",
        content: <div>Custom styled content 2</div>,
      },
      {
        id: "custom3",
        label: "Custom Tab 3",
        content: <div>Custom styled content 3</div>,
      },
    ],
    tabListClassName: "bg-gradient-to-r from-purple-500/20 to-blue-500/20",
    activeTabButtonClassName:
      "bg-gradient-to-r from-purple-500 to-blue-500 text-liquid-text-inverse",
    inactiveTabButtonClassName:
      "text-liquid-secondary hover:text-liquid-accent",
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const accessibilityTabs: Array<GlassTabItem> = [
      {
        id: "keyboard",
        label: "Keyboard Nav",
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Keyboard Navigation
            </h3>
            <div className="rounded-lg bg-liquid-accent p-4 dark:bg-liquid-accent/20">
              <h4 className="mb-2 font-medium">Available Shortcuts:</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <kbd>Tab</kbd> - Move focus to tab list
                </li>
                <li>
                  • <kbd>←</kbd> <kbd>→</kbd> - Navigate between tabs
                </li>
                <li>
                  • <kbd>Home</kbd> - Go to first tab
                </li>
                <li>
                  • <kbd>End</kbd> - Go to last tab
                </li>
                <li>
                  • <kbd>Space</kbd> or <kbd>Enter</kbd> - Activate tab
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: "aria",
        label: "ARIA Support",
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              ARIA Attributes
            </h3>
            <p className="text-liquid-secondary dark:text-liquid-grey">
              This component includes comprehensive ARIA support:
            </p>
            <ul className="space-y-2 text-liquid-secondary text-sm dark:text-liquid-grey">
              <li>
                • <code>role="tablist"</code> on tab container
              </li>
              <li>
                • <code>role="tab"</code> on each tab button
              </li>
              <li>
                • <code>role="tabpanel"</code> on content panels
              </li>
              <li>
                • <code>aria-selected</code> indicates active tab
              </li>
              <li>
                • <code>aria-controls</code> links tabs to panels
              </li>
              <li>
                • <code>aria-labelledby</code> links panels to tabs
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "screen-reader",
        label: "Screen Readers",
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-liquid-secondary text-lg dark:text-liquid-text-inverse">
              Screen Reader Support
            </h3>
            <p className="text-liquid-secondary dark:text-liquid-grey">
              The component is fully compatible with screen readers:
            </p>
            <ul className="space-y-2 text-liquid-secondary text-sm dark:text-liquid-grey">
              <li>• Tab count is announced</li>
              <li>• Active tab state is communicated</li>
              <li>• Tab panel changes are announced</li>
              <li>• Disabled tabs are properly indicated</li>
            </ul>
          </div>
        ),
      },
    ];
    return (
      <div className="w-[500px]">
        <GlassTabs tabs={accessibilityTabs} />
      </div>
    );
  },
};
