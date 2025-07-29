import type { Meta, StoryObj } from '@storybook/react';
import { GlassSkipNavigation } from './glass-skip-navigation';

const meta = {
  title: 'Components/GlassSkipNavigation',
  component: GlassSkipNavigation,
  parameters: {
    layout: 'fullscreen',
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
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative min-h-screen">
        <Story />
        <div className="p-8">
          <header>
            <nav
              id="navigation"
              className="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
            >
              <h2 className="mb-2 font-semibold text-lg">Navigation</h2>
              <ul className="flex gap-4">
                <li>
                  <a
                    href="#placeholder"
                    className="text-blue-500 hover:underline"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#placeholder"
                    className="text-blue-500 hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#placeholder"
                    className="text-blue-500 hover:underline"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#placeholder"
                    className="text-blue-500 hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </header>

          <main id="main-content" className="mb-8">
            <h1 className="mb-4 font-bold text-2xl">Main Content</h1>
            <p className="mb-4">
              Press Tab to reveal the skip navigation links. This helps keyboard
              users quickly navigate to important sections of the page.
            </p>
            <section id="features" className="mb-8">
              <h2 className="mb-2 font-semibold text-xl">Features Section</h2>
              <p>This is the features section content.</p>
            </section>
            <section id="pricing" className="mb-8">
              <h2 className="mb-2 font-semibold text-xl">Pricing Section</h2>
              <p>This is the pricing section content.</p>
            </section>
          </main>

          <aside
            id="sidebar"
            className="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
          >
            <h2 className="mb-2 font-semibold text-lg">Sidebar</h2>
            <p>Additional content and links.</p>
          </aside>

          <footer
            id="footer"
            className="rounded-lg bg-gray-200 p-4 dark:bg-gray-800"
          >
            <h2 className="mb-2 font-semibold text-lg">Footer</h2>
            <p>© 2024 Your Company. All rights reserved.</p>
          </footer>
        </div>
      </div>
    ),
  ],
  argTypes: {
    links: {
      description: 'Custom skip links',
      control: { type: 'object' },
    },
    autoGenerate: {
      description: 'Automatically generate links from landmarks',
      control: { type: 'boolean' },
    },
    position: {
      description: 'Position of the skip navigation',
      control: { type: 'select' },
      options: ['top', 'left', 'right'],
    },
    visibleOnFocus: {
      description: 'Only show when focused',
      control: { type: 'boolean' },
    },
    alwaysVisible: {
      description: 'Always show the skip navigation',
      control: { type: 'boolean' },
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof GlassSkipNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with auto-generation
export const Default: Story = {
  args: {
    autoGenerate: true,
    position: 'top',
    visibleOnFocus: true,
  },
};

// Custom links
export const CustomLinks: Story = {
  args: {
    links: [
      { href: '#main-content', label: 'Skip to main content' },
      { href: '#navigation', label: 'Skip to navigation' },
      { href: '#features', label: 'Skip to features' },
      { href: '#pricing', label: 'Skip to pricing' },
      { href: '#sidebar', label: 'Skip to sidebar' },
      { href: '#footer', label: 'Skip to page footer' },
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
      <div className="rounded-lg border-2 border-gray-300 border-dashed p-4 dark:border-gray-700">
        <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
          Top Position (Default)
        </p>
        <div className="relative h-32">
          <GlassSkipNavigation
            position="top"
            alwaysVisible
            links={[
              { href: '#content1', label: 'Skip to content' },
              { href: '#nav1', label: 'Skip to navigation' },
            ]}
          />
        </div>
      </div>

      <div className="rounded-lg border-2 border-gray-300 border-dashed p-4 dark:border-gray-700">
        <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
          Left Position
        </p>
        <div className="relative h-32">
          <GlassSkipNavigation
            position="left"
            alwaysVisible
            links={[
              { href: '#content2', label: 'Skip to content' },
              { href: '#nav2', label: 'Skip to navigation' },
            ]}
          />
        </div>
      </div>

      <div className="rounded-lg border-2 border-gray-300 border-dashed p-4 dark:border-gray-700">
        <p className="mb-4 text-gray-600 text-sm dark:text-gray-400">
          Right Position
        </p>
        <div className="relative h-32">
          <GlassSkipNavigation
            position="right"
            alwaysVisible
            links={[
              { href: '#content3', label: 'Skip to content' },
              { href: '#nav3', label: 'Skip to navigation' },
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
      <div className="mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
        <h3 className="mb-2 font-semibold">Keyboard Navigation Instructions</h3>
        <ol className="list-inside list-decimal space-y-1 text-sm">
          <li>
            Press{' '}
            <kbd className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
              Tab
            </kbd>{' '}
            to focus the skip links
          </li>
          <li>
            Use{' '}
            <kbd className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
              Arrow Keys
            </kbd>{' '}
            to navigate between links
          </li>
          <li>
            Press{' '}
            <kbd className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
              Enter
            </kbd>{' '}
            to jump to the section
          </li>
          <li>
            Press{' '}
            <kbd className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
              Escape
            </kbd>{' '}
            to hide the menu
          </li>
        </ol>
      </div>

      <GlassSkipNavigation
        links={[
          { href: '#instructions', label: 'Skip to instructions' },
          { href: '#demo-content', label: 'Skip to demo content' },
          { href: '#demo-footer', label: 'Skip to footer' },
        ]}
      />

      <div
        id="demo-content"
        className="mt-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
      >
        <h2 className="mb-2 font-semibold text-lg">Demo Content</h2>
        <p>This is the main content area that can be skipped to.</p>
      </div>

      <div
        id="demo-footer"
        className="mt-4 rounded-lg bg-gray-200 p-4 dark:bg-gray-700"
      >
        <h2 className="mb-2 font-semibold text-lg">Demo Footer</h2>
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
          { href: '#main-navigation', label: 'Skip to navigation' },
          { href: '#main-content', label: 'Skip to main content' },
          { href: '#search', label: 'Skip to search' },
          { href: '#footer-nav', label: 'Skip to footer' },
        ]}
      />

      <header className="bg-white shadow dark:bg-gray-800">
        <nav
          id="main-navigation"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="font-bold text-xl">Your Site</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="#placeholder"
                  className="inline-flex items-center border-blue-500 border-b-2 px-1 pt-1 font-medium text-gray-900 text-sm dark:text-white"
                >
                  Home
                </a>
                <a
                  href="#placeholder"
                  className="inline-flex items-center border-transparent border-b-2 px-1 pt-1 font-medium text-gray-500 text-sm hover:text-gray-700 dark:hover:text-gray-300"
                >
                  About
                </a>
                <a
                  href="#placeholder"
                  className="inline-flex items-center border-transparent border-b-2 px-1 pt-1 font-medium text-gray-500 text-sm hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Services
                </a>
                <a
                  href="#placeholder"
                  className="inline-flex items-center border-transparent border-b-2 px-1 pt-1 font-medium text-gray-500 text-sm hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Contact
                </a>
              </div>
            </div>
            <div id="search" className="flex items-center">
              <input
                type="search"
                placeholder="Search..."
                className="rounded-md border border-gray-300 px-3 py-1 text-sm dark:border-gray-600"
              />
            </div>
          </div>
        </nav>
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"
      >
        <div className="px-4 py-6 sm:px-0">
          <h1 className="mb-4 font-bold text-3xl text-gray-900 dark:text-white">
            Welcome to Our Website
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              This example demonstrates how skip navigation works in a
              real-world website layout. The skip links allow keyboard users to
              quickly navigate to important sections.
            </p>
            <h2>Why Skip Navigation Matters</h2>
            <p>
              Skip navigation links are crucial for accessibility, especially
              for users who rely on keyboard navigation or screen readers. They
              allow users to bypass repetitive content and jump directly to the
              main content or other important sections.
            </p>
          </div>
        </div>
      </main>

      <footer
        id="footer-nav"
        className="bg-gray-800 text-white dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="flex space-x-4">
            <a href="#placeholder" className="text-gray-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#placeholder" className="text-gray-300 hover:text-white">
              Terms of Service
            </a>
            <a href="#placeholder" className="text-gray-300 hover:text-white">
              Contact Us
            </a>
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
        <h3 className="mb-4 font-semibold">Default Styling</h3>
        <div className="relative h-20 rounded-lg border">
          <GlassSkipNavigation
            alwaysVisible
            links={[
              { href: '#content', label: 'Skip to content' },
              { href: '#nav', label: 'Skip to navigation' },
            ]}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold">Custom Styling</h3>
        <div className="relative h-20 rounded-lg border">
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
            alwaysVisible
            links={[
              { href: '#content', label: 'Skip to content' },
              { href: '#nav', label: 'Skip to navigation' },
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
      <div className="mb-8 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
        <h3 className="mb-2 font-semibold">Screen Reader Testing</h3>
        <p className="mb-2 text-sm">
          Enable your screen reader and navigate through the skip links to test
          accessibility.
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm">
          <li>Links should be announced as "Skip to [section] link"</li>
          <li>Focus should be clearly visible</li>
          <li>Navigation should work with keyboard only</li>
        </ul>
      </div>

      <GlassSkipNavigation
        links={[
          { href: '#test-1', label: 'Skip to first test section' },
          { href: '#test-2', label: 'Skip to second test section' },
          { href: '#test-3', label: 'Skip to third test section' },
        ]}
      />

      <div className="mt-8 space-y-4">
        <section
          id="test-1"
          className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
        >
          <h2 className="font-semibold text-lg">First Test Section</h2>
          <p>Content of the first section.</p>
        </section>

        <section
          id="test-2"
          className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
        >
          <h2 className="font-semibold text-lg">Second Test Section</h2>
          <p>Content of the second section.</p>
        </section>

        <section
          id="test-3"
          className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
        >
          <h2 className="font-semibold text-lg">Third Test Section</h2>
          <p>Content of the third section.</p>
        </section>
      </div>
    </div>
  ),
};
