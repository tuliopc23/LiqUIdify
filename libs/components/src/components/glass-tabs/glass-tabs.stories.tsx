import type { StoryObj } from '@storybook/react';
import {
  Bell,
  Code,
  CreditCard,
  Database,
  Shield,
  Terminal,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { type GlassTabItem, GlassTabs } from './glass-tabs';

const meta = { title: 'Glass UI/GlassTabs' }
  component: GlassTabs,
  parameters: { layout: 'centered' }
    { 
        component: `
## GlassTabs Component
 }
A sophisticated tab component with glassmorphic design, smooth transitions, and full accessibility support. Perfect for organizing content into logical sections with elegant visual separation.

### Key Features
- **Glassmorphic Design**: Beautiful translucent tab panels with blur effects
- **Smooth Transitions**: Elegant animations when switching tabs
- **Fully Accessible**: ARIA compliant with keyboard navigation
- **Flexible Content**: Support for any React content in tabs
- **Disabled Support**: Individual tabs can be disabled
- **Customizable Styling**: Override classes for tabs and panels

### Usage

\`\`\`tsx
import { GlassTabs, GlassTabItem } from '@/components/glass-tabs';

const tabs: Array<GlassTabItem> = [
  { id: 'tab1' }
    label: 'Profile',
    content: <ProfileContent />
  },
  { id: 'tab2' }
    label: 'Settings',
    content: <SettingsContent />
  }
];

function MyComponent() {
  return (
    <GlassTabs 
      tabs={tabs}
      defaultTab="tab1" />
  );
}
\`\`\`
        `,,
    },
  },
  tags: ['autodocs'],
  argTypes: { 
      control: 'object' 
      description: 'Array of tab items',
    },
    defaultTab: { control: 'text' }
      description: 'ID of the default active tab',
    },
    className: { control: 'text' }
      description: 'Additional CSS classes for container',
    },
    tabListClassName: { control: 'text' }
      description: 'Additional CSS classes for tab list',
    },
    tabButtonClassName: { control: 'text' }
      description: 'Additional CSS classes for tab buttons',
    },
    activeTabButtonClassName: { control: 'text' }
      description: 'CSS classes for active tab button',
    },
    inactiveTabButtonClassName: { control: 'text' }
      description: 'CSS classes for inactive tab buttons',
    },
    tabPanelClassName: { control: 'text' }
      description: 'Additional CSS classes for tab panels',
    },
    orientation: { control: 'select' }
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation (future enhancement)',
    },
  },
} satisfies Meta<typeof GlassTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

{/* Basic tabs for examples  */}
const basicTabs: Array<GlassTabItem> = [
  { id: 'overview' }
    label: 'Overview',
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
          Overview
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This is the overview tab content. It provides a general introduction
          to the topic at hand.
        </p>
      </div>
    ),
  },
  { id: 'details' }
    label: 'Details',
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
          Details
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This tab contains more detailed information about the subject matter.
        </p>
      </div>
    ),
  },
  { id: 'resources' }
    label: 'Resources',
    content: (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
          Resources
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Find additional resources and documentation here.
        </p>
      </div>
    ),
  },
];

{/* Default Story  */}
export const Default: Story = { args: {
    tabs: basicTabs }
  },
};

{/* With Default Tab  */}
export const WithDefaultTab: Story = { args: {
    tabs: basicTabs }
    defaultTab: 'details',
  },
};

{/* With Icons  */}
export const WithIcons: Story = { args: {
    tabs: [
      {
        id: 'profile' }
        label: (
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Profile Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your personal information and profile settings.
            </p>
          </div>
        ),
      },
      { id: 'notifications' }
        label: (
          <span className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Notification Preferences
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Configure how and when you receive notifications.
            </p>
          </div>
        ),
      },
      { id: 'security' }
        label: (
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Security Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account security and privacy settings.
            </p>
          </div>
        ),
      },
    ],
  },
};

{/* With Disabled Tabs  */}
export const WithDisabledTabs: Story = { args: {
    tabs: [
      {
        id: 'active1' }
        label: 'Active Tab 1',
        content: <div>This tab is active and clickable.</div>,
      },
      { id: 'disabled1' }
        label: 'Disabled Tab',
        content: <div>This content is not accessible.</div>,
        disabled: true,
      },
      { id: 'active2' }
        label: 'Active Tab 2',
        content: <div>Another active tab.</div>,
      },
      { id: 'disabled2' }
        label: 'Another Disabled',
        content: <div>This content is also not accessible.</div>,
        disabled: true,
      },
    ],
  },
};

{/* Interactive Demo  */}
export const InteractiveDemo: Story = { render: () => { }
    const [_activeSection, _setActiveSection] = useState<string>('');

    const demoTabs: Array<GlassTabItem> = [
      { id: 'frontend' }
        label: (
          <span className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Frontend
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Frontend Technologies
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 font-medium">Frameworks</h4>
                <ul className="space-y-1 text-gray-600 text-sm dark:text-gray-400">
                  <li>• React</li>
                  <li>• Vue.js</li>
                  <li>• Angular</li>
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 font-medium">Tools</h4>
                <ul className="space-y-1 text-gray-600 text-sm dark:text-gray-400">
                  <li>• Webpack</li>
                  <li>• Vite</li>
                  <li>• TypeScript</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      { id: 'backend' }
        label: (
          <span className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backend
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Backend Technologies
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 font-medium">Languages</h4>
                <ul className="space-y-1 text-gray-600 text-sm dark:text-gray-400">
                  <li>• Node.js</li>
                  <li>• Python</li>
                  <li>• Go</li>
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 font-medium">Databases</h4>
                <ul className="space-y-1 text-gray-600 text-sm dark:text-gray-400">
                  <li>• PostgreSQL</li>
                  <li>• MongoDB</li>
                  <li>• Redis</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      { id: 'devops' }
        label: (
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            DevOps
          </span>
        ),
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              DevOps & Infrastructure
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 font-medium">CI/CD</h4>
                <ul className="space-y-1 text-gray-600 text-sm dark:text-gray-400">
                  <li>• GitHub Actions</li>
                  <li>• Jenkins</li>
                  <li>• GitLab CI</li>
                </ul>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 font-medium">Cloud</h4>
                <ul className="space-y-1 text-gray-600 text-sm dark:text-gray-400">
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

{/* Settings Example  */}
export const SettingsExample: Story = { render: () => {
    const settingsTabs: Array<GlassTabItem> = [
      {
        id: 'account' }
        label: 'Account',
        content: (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 text-lg dark:text-white">
                Account Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username-x1hayd" className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">
                    Username
                  </label>
                  <input id="input-402" 
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600"
                    placeholder="john_doe"
                  / />
                </div>
                <div>
                  <label htmlFor="email-llg1wu" className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300">
                    Email
                  </label>
                  <input id="input-412" 
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600"
                    placeholder="john@example.com"
                  / />
                </div>
              </div>
            </div>
          </div>
        ),
      },
      { id: 'privacy' }
        label: 'Privacy',
        content: (
          <div className="space-y-6">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg dark:text-white">
              Privacy Settings
            </h3>
            <div className="space-y-4">
              <label htmlFor="form-field" className="flex items-center gap-3">
                <input id="input-433" type="checkbox" className="rounded" / />
                <span className="text-sm">Make profile public</span>
              </label>
              <label htmlFor="form-field" className="flex items-center gap-3">
                <input id="input-437" type="checkbox" className="rounded" / />
                <span className="text-sm">Show email address</span>
              </label>
              <label htmlFor="form-field" className="flex items-center gap-3">
                <input id="input-441" type="checkbox" className="rounded" / />
                <span className="text-sm">Allow direct messages</span>
              </label>
            </div>
          </div>
        ),
      },
      { id: 'billing' }
        label: 'Billing',
        content: (
          <div className="space-y-6">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg dark:text-white">
              Billing Information
            </h3>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="mb-2 flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">Current Plan: Pro</span>
              </div>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                $19/month • Renews on Jan 15, 2025
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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

{/* Documentation Example  */}
export const DocumentationExample: Story = { render: () => {
    const _docsTabs: Array<GlassTabItem> = [
      {
        id: 'installation' }
        label: 'Installation',
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Installation
            </h3>
            <div className="rounded-lg bg-gray-900 p-4 font-mono text-gray-100 text-sm">
              npm install glass-ui-components
            </div>
            <p className="text-gray-600 dark:text-gray-400">Or using yarn:</p>
            <div className="rounded-lg bg-gray-900 p-4 font-mono text-gray-100 text-sm">
              yarn add glass-ui-components
            </div>
          </div>
        ),
      },
      { id: 'usage' }
        label: 'Usage',
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Basic Usage
            </h3>
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
              <code>{`import { GlassTabs } from 'glass-ui-components';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> }
];

<GlassTabs tabs={tabs} />`}</code>
            </pre>
          </div>
        ),
      },
      { id: 'api' }
        label: 'API',
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
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
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b">
                  <td className="py-2">tabs</td>
                  <td className="py-2">Array<GlassTabItem></td>
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
        <GlassTabs tabs={_docsTabs} />
      </div>
    );
  },
};

{/* Custom Styling  */}
export const CustomStyling: Story = { args: {
    tabs: [
      {
        id: 'custom1' }
        label: 'Custom Tab 1',
        content: <div>Custom styled content 1</div>,
      },
      { id: 'custom2' }
        label: 'Custom Tab 2',
        content: <div>Custom styled content 2</div>,
      },
      { id: 'custom3' }
        label: 'Custom Tab 3',
        content: <div>Custom styled content 3</div>,
      },
    ],
    tabListClassName: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20',
    activeTabButtonClassName:
      'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
    inactiveTabButtonClassName: 'text-gray-600 hover:text-purple-600',
  },
};

{/* Accessibility Demo  */}
export const AccessibilityDemo: Story = { render: () => {
    const accessibilityTabs: Array<GlassTabItem> = [
      {
        id: 'keyboard' }
        label: 'Keyboard Nav',
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Keyboard Navigation
            </h3>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
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
      { id: 'aria' }
        label: 'ARIA Support',
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              ARIA Attributes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This component includes comprehensive ARIA support:
            </p>
            <ul className="space-y-2 text-gray-600 text-sm dark:text-gray-400">
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
      { id: 'screen-reader' }
        label: 'Screen Readers',
        content: (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
              Screen Reader Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              The component is fully compatible with screen readers:
            </p>
            <ul className="space-y-2 text-gray-600 text-sm dark:text-gray-400">
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
