import type { Meta, StoryObj } from "@storybook/react";
import { GlassSkipNavigation } from "./glass-skip-navigation";

const meta = {
  title: "Components/GlassSkipNavigation",
  component: GlassSkipNavigation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The GlassSkipNavigation component provides skip links for keyboard navigation, improving accessibility by allowing 
users to quickly jump to important sections of the page. It automatically generates links based on landmark elements 
or accepts custom links.

## Features
- **Auto-generation**: Automatically finds main, nav, and footer landmarks
- **Custom links**: Provide your own skip links
- **Position options**: Top, left, or right positioning
- **Visible on focus**: Shows only when focused by keyboard
- **Keyboard accessible**: Tab to reveal, Enter to navigate
- **ARIA compliant**: Proper accessibility attributes
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative min-h-screen">
        <Story />
        <div className="p-8">
          <header>
            <nav id="navigation" className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Navigation</h2>
              <ul className="flex gap-4">
                <li><a href="#" className="text-blue-500 hover:underline">Home</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">About</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Services</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Contact</a></li>
              </ul>
            </nav>
          </header>
          
          <main id="main-content" className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Main Content</h1>
            <p className="mb-4">
              Press Tab to reveal the skip navigation links. This helps keyboard users quickly 
              navigate to important sections of the page.
            </p>
            <section id="features" className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Features Section</h2>
              <p>This is the features section content.</p>
            </section>
            <section id="pricing" className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Pricing Section</h2>
              <p>This is the pricing section content.</p>
            </section>
          </main>
          
          <aside id="sidebar" className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Sidebar</h2>
            <p>Additional content and links.</p>
          </aside>
          
          <footer id="footer" className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Footer</h2>
            <p>© 2024 Your Company. All rights reserved.</p>
          </footer>
        </div>
      </div>
    ),
  ],
  argTypes: {
    links: {
      description: "Custom skip links",
      control: { type: "object" },
    },
    autoGenerate: {
      description: "Automatically generate links from landmarks",
      control: { type: "boolean" },
    },
    position: {
      description: "Position of the skip navigation",
      control: { type: "select" },
      options: ["top", "left", "right"],
    },
    visibleOnFocus: {
      description: "Only show when focused",
      control: { type: "boolean" },
    },
    alwaysVisible: {
      description: "Always show the skip navigation",
      control: { type: "boolean" },
    },
    className: {
      description: "Additional CSS classes",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof GlassSkipNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with auto-generation
export const Default: Story = {
  args: {
    autoGenerate: true,
    position: "top",
    visibleOnFocus: true,
  },
};

// Custom links
export const CustomLinks: Story = {
  args: {
    links: [
      { href: "#main-content", label: "Skip to main content" },
      { href: "#navigation", label: "Skip to navigation" },
      { href: "#features", label: "Skip to features" },
      { href: "#pricing", label: "Skip to pricing" },
      { href: "#sidebar", label: "Skip to sidebar" },
      { href: "#footer", label: "Skip to page footer" },
    ],
    autoGenerate: false,
  },
};

// Always visible
export const AlwaysVisible: Story = {
  args: {
    autoGenerate: true,
    alwaysVisible: true,
    visibleOnFocus: false,
  },
};

// Different positions
export const Positions: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Top Position (Default)</p>
        <div className="relative h-32">
          <GlassSkipNavigation
            position="top"
            alwaysVisible={true}
            links={[
              { href: "#content1", label: "Skip to content" },
              { href: "#nav1", label: "Skip to navigation" },
            ]}
          />
        </div>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Left Position</p>
        <div className="relative h-32">
          <GlassSkipNavigation
            position="left"
            alwaysVisible={true}
            links={[
              { href: "#content2", label: "Skip to content" },
              { href: "#nav2", label: "Skip to navigation" },
            ]}
          />
        </div>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Right Position</p>
        <div className="relative h-32">
          <GlassSkipNavigation
            position="right"
            alwaysVisible={true}
            links={[
              { href: "#content3", label: "Skip to content" },
              { href: "#nav3", label: "Skip to navigation" },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

// With keyboard instructions
export const WithInstructions: Story = {
  render: () => (
    <div>
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <h3 className="font-semibold mb-2">Keyboard Navigation Instructions</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Tab</kbd> to focus the skip links</li>
          <li>Use <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Arrow Keys</kbd> to navigate between links</li>
          <li>Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> to jump to the section</li>
          <li>Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Escape</kbd> to hide the menu</li>
        </ol>
      </div>
      
      <GlassSkipNavigation
        links={[
          { href: "#instructions", label: "Skip to instructions" },
          { href: "#demo-content", label: "Skip to demo content" },
          { href: "#demo-footer", label: "Skip to footer" },
        ]}
      />
      
      <div id="demo-content" className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Demo Content</h2>
        <p>This is the main content area that can be skipped to.</p>
      </div>
      
      <div id="demo-footer" className="mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Demo Footer</h2>
        <p>This is the footer area.</p>
      </div>
    </div>
  ),
};

// Real-world example
export const RealWorldExample: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <GlassSkipNavigation
        links={[
          { href: "#main-navigation", label: "Skip to navigation" },
          { href: "#main-content", label: "Skip to main content" },
          { href: "#search", label: "Skip to search" },
          { href: "#footer-nav", label: "Skip to footer" },
        ]}
      />
      
      <header className="bg-white dark:bg-gray-800 shadow">
        <nav id="main-navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Your Site</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-b-2 border-blue-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Services
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div id="search" className="flex items-center">
              <input
                type="search"
                placeholder="Search..."
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
              />
            </div>
          </div>
        </nav>
      </header>
      
      <main id="main-content" className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Our Website
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              This example demonstrates how skip navigation works in a real-world website layout.
              The skip links allow keyboard users to quickly navigate to important sections.
            </p>
            <h2>Why Skip Navigation Matters</h2>
            <p>
              Skip navigation links are crucial for accessibility, especially for users who rely
              on keyboard navigation or screen readers. They allow users to bypass repetitive
              content and jump directly to the main content or other important sections.
            </p>
          </div>
        </div>
      </main>
      
      <footer id="footer-nav" className="bg-gray-800 dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
          </nav>
          <p className="mt-8 text-center text-gray-400">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  ),
};

// Styling variations
export const StylingVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Default Styling</h3>
        <div className="relative h-20 border rounded-lg">
          <GlassSkipNavigation
            alwaysVisible={true}
            links={[
              { href: "#content", label: "Skip to content" },
              { href: "#nav", label: "Skip to navigation" },
            ]}
          />
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Custom Styling</h3>
        <div className="relative h-20 border rounded-lg">
          <style>{`
            .custom-skip-nav a {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white !important;
              border-radius: 9999px;
              padding: 0.5rem 1.5rem;
            }
            .custom-skip-nav a:hover {
              transform: scale(1.05);
            }
          `}</style>
          <GlassSkipNavigation
            className="custom-skip-nav"
            alwaysVisible={true}
            links={[
              { href: "#content", label: "Skip to content" },
              { href: "#nav", label: "Skip to navigation" },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

// Accessibility testing
export const AccessibilityTesting: Story = {
  render: () => (
    <div>
      <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
        <h3 className="font-semibold mb-2">Screen Reader Testing</h3>
        <p className="text-sm mb-2">
          Enable your screen reader and navigate through the skip links to test accessibility.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Links should be announced as "Skip to [section] link"</li>
          <li>Focus should be clearly visible</li>
          <li>Navigation should work with keyboard only</li>
        </ul>
      </div>
      
      <GlassSkipNavigation
        links={[
          { href: "#test-1", label: "Skip to first test section" },
          { href: "#test-2", label: "Skip to second test section" },
          { href: "#test-3", label: "Skip to third test section" },
        ]}
      />
      
      <div className="space-y-4 mt-8">
        <section id="test-1" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold">First Test Section</h2>
          <p>Content of the first section.</p>
        </section>
        
        <section id="test-2" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold">Second Test Section</h2>
          <p>Content of the second section.</p>
        </section>
        
        <section id="test-3" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold">Third Test Section</h2>
          <p>Content of the third section.</p>
        </section>
      </div>
    </div>
  ),
};