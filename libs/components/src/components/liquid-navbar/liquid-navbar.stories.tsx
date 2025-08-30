import type { Meta, StoryObj } from '@storybook/react';
import { LiquidNavbar } from './liquid-navbar';
import { useState } from 'react';

const meta: Meta<typeof LiquidNavbar> = {
  title: 'Navigation/LiquidNavbar',
  component: LiquidNavbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive navigation bar with Apple HIG liquid glass design, mobile menu support, and hide-on-scroll functionality.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'transparent'],
      description: 'Visual style variant',
    },
    position: {
      control: 'select',
      options: ['fixed', 'sticky', 'static'],
      description: 'Positioning behavior',
    },
    hideOnScroll: {
      control: 'boolean',
      description: 'Hide navbar when scrolling down',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show bottom border',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiquidNavbar>;

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
  </svg>
);

// Sample navigation items
const sampleNavItems = [
  { label: 'Home', href: '/', active: true },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const sampleMobileItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <UserIcon /> },
  { label: 'Search', href: '/search', icon: <SearchIcon /> },
  { label: 'Settings', href: '/settings' },
  { label: 'Help', href: '/help' },
];

// Interactive wrapper for stories that need state
const InteractiveWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ height: '200vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ padding: '100px 20px', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Scroll down to test hide-on-scroll behavior</h1>
        <p style={{ marginBottom: '2rem' }}>This page has extra height to demonstrate scroll behavior.</p>
        {children}
        <div style={{ marginTop: '50px' }}>
          <h2>Content Area</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    brand: 'LiqUIdify',
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
  },
  render: (args) => (
    <InteractiveWrapper>
      <LiquidNavbar {...args} />
    </InteractiveWrapper>
  ),
};

export const WithCustomBrand: Story = {
  args: {
    brand: (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
        <span className="font-semibold">LiqUIdify</span>
      </div>
    ),
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
  },
  render: (args) => (
    <InteractiveWrapper>
      <LiquidNavbar {...args} />
    </InteractiveWrapper>
  ),
};

export const WithActions: Story = {
  args: {
    brand: 'LiqUIdify',
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
    actions: (
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <SearchIcon />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <UserIcon />
        </button>
      </div>
    ),
  },
  render: (args) => (
    <InteractiveWrapper>
      <LiquidNavbar {...args} />
    </InteractiveWrapper>
  ),
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    brand: 'LiqUIdify',
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
    showBorder: true,
  },
  render: (args) => (
    <InteractiveWrapper>
      <LiquidNavbar {...args} />
    </InteractiveWrapper>
  ),
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    brand: 'LiqUIdify',
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
  },
  render: (args) => (
    <InteractiveWrapper>
      <LiquidNavbar {...args} />
    </InteractiveWrapper>
  ),
};

export const HideOnScroll: Story = {
  args: {
    brand: 'LiqUIdify',
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
    hideOnScroll: true,
  },
  render: (args) => (
    <InteractiveWrapper>
      <LiquidNavbar {...args} />
    </InteractiveWrapper>
  ),
};

export const StickyPosition: Story = {
  args: {
    position: 'sticky',
    brand: 'LiqUIdify',
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
  },
  render: (args) => (
    <InteractiveWrapper>
      <LiquidNavbar {...args} />
    </InteractiveWrapper>
  ),
};

export const StaticPosition: Story = {
  args: {
    position: 'static',
    brand: 'LiqUIdify',
    navItems: sampleNavItems,
    mobileItems: sampleMobileItems,
  },
  render: (args) => (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '20px' }}>
      <LiquidNavbar {...args} />
      <div style={{ marginTop: '50px', color: 'white' }}>
        <h2>Content Below Static Navbar</h2>
        <p>This navbar has static positioning and doesn't stick to the top.</p>
      </div>
    </div>
  ),
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('home');
    
    const navItems = [
      { label: 'Home', href: '/', active: activeItem === 'home', onClick: () => setActiveItem('home') },
      { label: 'Products', href: '/products', active: activeItem === 'products', onClick: () => setActiveItem('products') },
      { label: 'Services', href: '/services', active: activeItem === 'services', onClick: () => setActiveItem('services') },
      { label: 'About', href: '/about', active: activeItem === 'about', onClick: () => setActiveItem('about') },
    ];

    return (
      <InteractiveWrapper>
        <LiquidNavbar
          brand="Interactive Demo"
          navItems={navItems}
          mobileItems={sampleMobileItems}
          actions={
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">Active: {activeItem}</span>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <UserIcon />
              </button>
            </div>
          }
        />
      </InteractiveWrapper>
    );
  },
};