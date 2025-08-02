import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Home,
  User,
  Settings,
  Bell,
  Search,
  Heart,
  ShoppingCart,
  BookOpen,
  Music,
  Camera,
  MessageCircle,
  Star,
} from "lucide-react";
import { GlassMobileNav, type NavItem } from "./glass-mobile-nav";

const meta: Meta<typeof GlassMobileNav> = {
  title: "Components/Navigation/GlassMobileNav",
  component: GlassMobileNav,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A mobile navigation component with hamburger menu, slide animations, and glassmorphism styling.

## Features
- Hamburger menu toggle
- Slide-in drawer animation
- Nested navigation items
- Badge support
- Touch-friendly interactions
- Accessibility compliant
- Customizable positioning

## Usage

\`\`\`tsx
import { GlassMobileNav } from '@/components/glass-mobile-nav';

const navItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="h-5 w-5" />,
    onClick: () => navigate('/'),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="h-5 w-5" />,
    children: [
      { id: 'settings', label: 'Settings', onClick: () => navigate('/settings') },
      { id: 'logout', label: 'Logout', onClick: handleLogout },
    ],
  },
];

<GlassMobileNav
  items={navItems}
  activeItemId="home"
  onItemClick={handleNavigation}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    position: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    showOverlay: {
      control: { type: "boolean" },
    },
    closeOnItemClick: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample navigation items
const basicNavItems: NavItem[] = [
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
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="h-5 w-5" />,
    badge: 3,
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
        icon: <Settings className="h-4 w-4" />,
      },
      {
        id: "preferences",
        label: "Preferences",
        icon: <Settings className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    icon: <BookOpen className="h-5 w-5" />,
    children: [
      {
        id: "articles",
        label: "Articles",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        id: "videos",
        label: "Videos",
        icon: <Camera className="h-4 w-4" />,
      },
      {
        id: "music",
        label: "Music",
        icon: <Music className="h-4 w-4" />,
      },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: <MessageCircle className="h-5 w-5" />,
    badge: "12",
  },
];

export const Default: Story = {
  args: {
    items: basicNavItems,
    activeItemId: "home",
  },
};

export const WithNestedItems: Story = {
  args: {
    items: nestedNavItems,
    activeItemId: "home",
  },
};

export const LeftPosition: Story = {
  args: {
    items: basicNavItems,
    position: "left",
    activeItemId: "profile",
  },
};

export const NoOverlay: Story = {
  args: {
    items: basicNavItems,
    showOverlay: false,
  },
};

export const SmallSize: Story = {
  args: {
    size: "sm",
    items: basicNavItems,
  },
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    items: basicNavItems,
  },
};

// Interactive Examples
export const InteractiveExample: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState("home");
    const [clickedItem, setClickedItem] = useState<string | null>(null);

    const handleItemClick = (item: NavItem) => {
      setActiveItem(item.id);
      setClickedItem(item.id);
      setTimeout(() => setClickedItem(null), 2000);
    };

    return (
      <div className="flex flex-col items-center space-y-4">
        <GlassMobileNav
          items={basicNavItems}
          activeItemId={activeItem}
          onItemClick={handleItemClick}
        />

        {clickedItem && (
          <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm">
            Clicked:{" "}
            {basicNavItems.find((item) => item.id === clickedItem)?.label}
          </div>
        )}
      </div>
    );
  },
};

export const ECommerceExample: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState("home");

    const ecommerceItems: NavItem[] = [
      {
        id: "home",
        label: "Home",
        icon: <Home className="h-5 w-5" />,
      },
      {
        id: "search",
        label: "Search",
        icon: <Search className="h-5 w-5" />,
      },
      {
        id: "categories",
        label: "Categories",
        icon: <BookOpen className="h-5 w-5" />,
        children: [
          {
            id: "electronics",
            label: "Electronics",
          },
          {
            id: "clothing",
            label: "Clothing",
          },
          {
            id: "books",
            label: "Books",
          },
          {
            id: "home-garden",
            label: "Home & Garden",
          },
        ],
      },
      {
        id: "cart",
        label: "Shopping Cart",
        icon: <ShoppingCart className="h-5 w-5" />,
        badge: 5,
      },
      {
        id: "wishlist",
        label: "Wishlist",
        icon: <Heart className="h-5 w-5" />,
        badge: 12,
      },
      {
        id: "account",
        label: "My Account",
        icon: <User className="h-5 w-5" />,
        children: [
          {
            id: "orders",
            label: "My Orders",
          },
          {
            id: "addresses",
            label: "Addresses",
          },
          {
            id: "payment",
            label: "Payment Methods",
          },
          {
            id: "settings",
            label: "Account Settings",
          },
        ],
      },
    ];

    return (
      <div className="flex flex-col items-center space-y-4">
        <GlassMobileNav
          items={ecommerceItems}
          activeItemId={activeItem}
          onItemClick={(item) => setActiveItem(item.id)}
          header={
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">ShopApp</h2>
            </div>
          }
          footer={
            <div className="text-center text-sm text-white/60">
              <p>© 2024 ShopApp</p>
              <p>Version 1.0.0</p>
            </div>
          }
        />

        <div className="text-center text-white/80">
          <p>
            Active:{" "}
            {ecommerceItems.find((item) => item.id === activeItem)?.label}
          </p>
        </div>
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const itemsWithDisabled: NavItem[] = [
      {
        id: "home",
        label: "Home",
        icon: <Home className="h-5 w-5" />,
      },
      {
        id: "premium",
        label: "Premium Features",
        icon: <Star className="h-5 w-5" />,
        disabled: true,
        badge: "Pro",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings className="h-5 w-5" />,
      },
      {
        id: "beta",
        label: "Beta Features",
        icon: <Bell className="h-5 w-5" />,
        disabled: true,
        badge: "Soon",
      },
    ];

    return <GlassMobileNav items={itemsWithDisabled} activeItemId="home" />;
  },
};
