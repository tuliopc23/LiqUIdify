import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react';
import React from 'react';
import { GlassMobileNav } from '@/components/glass-mobile-nav/glass-mobile-nav';

const meta = {
  title: 'Components/Glass Mobile Nav',
  component: GlassMobileNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive mobile navigation component with glassmorphism effects, gesture support, and smooth animations. Includes submenu support and accessibility features.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Navigation items with optional nested children',
      control: { type: 'object' },
    },
    onItemClick: {
      description: 'Callback when a navigation item is clicked',
      action: 'clicked',
    },
    className: {
      description: 'Additional CSS classes for the menu trigger button',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof GlassMobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items
const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="w-5 h-5" />,
    children: [
      { id: 'profile-settings', label: 'Settings', href: '/profile/settings' },
      {
        id: 'profile-preferences',
        label: 'Preferences',
        href: '/profile/preferences',
      },
      { id: 'profile-security', label: 'Security', href: '/profile/security' },
    ],
  },
  {
    id: 'docs',
    label: 'Documentation',
    icon: <FileText className="w-5 h-5" />,
    children: [
      {
        id: 'getting-started',
        label: 'Getting Started',
        href: '/docs/getting-started',
      },
      { id: 'api-reference', label: 'API Reference', href: '/docs/api' },
      { id: 'examples', label: 'Examples', href: '/docs/examples' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: <HelpCircle className="w-5 h-5" />,
    action: () => alert('Help clicked!'),
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <LogOut className="w-5 h-5" />,
    action: () => alert('Logout clicked!'),
  },
];

export const Default: Story = {
  args: {
    items: navigationItems,
  },
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="flex justify-end">
        <GlassMobileNav {...args} />
      </div>
      <div className="mt-8 p-6 glass-effect rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          Mobile Navigation Demo
        </h1>
        <p className="text-[var(--text-secondary)] mb-4">
          Click the menu button above to open the mobile navigation. This
          component is designed for mobile devices and includes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li>Smooth slide-in animation from the right</li>
          <li>Glassmorphism design with backdrop blur</li>
          <li>Support for nested menu items</li>
          <li>Gesture-friendly interactions</li>
          <li>Accessible keyboard navigation</li>
          <li>Portal rendering for proper z-index management</li>
        </ul>
      </div>
    </div>
  ),
};

export const WithActiveState: Story = {
  args: {
    items: navigationItems.map((item) => ({
      ...item,
      active: item.id === 'home',
    })),
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with an active item highlighted',
      },
    },
  },
};

export const SimpleMenu: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A simple navigation menu without icons or nested items',
      },
    },
  },
};

export const DeeplyNested: Story = {
  args: {
    items: [
      {
        id: 'products',
        label: 'Products',
        icon: <Menu className="w-5 h-5" />,
        children: [
          {
            id: 'electronics',
            label: 'Electronics',
            children: [
              { id: 'phones', label: 'Phones' },
              { id: 'laptops', label: 'Laptops' },
              { id: 'tablets', label: 'Tablets' },
            ],
          },
          {
            id: 'clothing',
            label: 'Clothing',
            children: [
              { id: 'mens', label: "Men's" },
              { id: 'womens', label: "Women's" },
              { id: 'kids', label: 'Kids' },
            ],
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of deeply nested menu structures',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [lastAction, setLastAction] = React.useState<string>('No action yet');

    const items = navigationItems.map((item) => ({
      ...item,
      action: () => setLastAction(`Clicked: ${item.label}`),
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Interactive Demo
          </h2>
          <GlassMobileNav
            items={items}
            onItemClick={(item) => console.log('Item clicked:', item)}
          />
        </div>
        <div className="glass-effect rounded-lg p-6">
          <p className="text-[var(--text-secondary)]">
            Last action: <strong>{lastAction}</strong>
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing menu item clicks and actions',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    items: navigationItems,
    className:
      'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Mobile navigation with custom styling applied to the trigger button',
      },
    },
  },
};
