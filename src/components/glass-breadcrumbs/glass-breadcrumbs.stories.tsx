import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Home, Folder, File, Settings, User, ShoppingCart, Package, CreditCard } from 'lucide-react';
import { GlassBreadcrumbs, BreadcrumbItem } from './glass-breadcrumbs';

const meta = {
  title: 'Components/Navigation/GlassBreadcrumbs',
  component: GlassBreadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible breadcrumb navigation component with glassmorphism styling, supporting icons, truncation, and smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label, href, onClick, and optional icon',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting padding and text size',
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'ghost'],
      description: 'Visual style variant of the breadcrumbs',
    },
    separator: {
      control: 'text',
      description: 'Custom separator element between breadcrumb items',
    },
    showHome: {
      control: 'boolean',
      description: 'Show home icon as first breadcrumb',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items to display (truncates middle items)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof GlassBreadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Default: Story = {
  args: {
    items: [
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
      { label: 'Gaming Laptops' },
    ],
  },
};

// With click handlers
export const WithClickHandlers: Story = {
  args: {
    items: [
      { 
        label: 'Dashboard', 
        onClick: () => console.log('Navigate to Dashboard') 
      },
      { 
        label: 'Analytics', 
        onClick: () => console.log('Navigate to Analytics') 
      },
      { 
        label: 'Reports', 
        onClick: () => console.log('Navigate to Reports') 
      },
      { label: 'Monthly Report' },
    ],
    onHomeClick: () => console.log('Navigate to Home'),
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    items: [
      { 
        label: 'Settings', 
        icon: <Settings className="w-4 h-4" />,
        href: '/settings'
      },
      { 
        label: 'Account', 
        icon: <User className="w-4 h-4" />,
        href: '/settings/account'
      },
      { 
        label: 'Security',
        href: '/settings/account/security'
      },
    ],
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <div>
        <h4 className="text-sm font-semibold mb-2 text-white/80">Small</h4>
        <GlassBreadcrumbs
          size="sm"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2 text-white/80">Medium (Default)</h4>
        <GlassBreadcrumbs
          size="md"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2 text-white/80">Large</h4>
        <GlassBreadcrumbs
          size="lg"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Details' },
          ]}
        />
      </div>
    </div>
  ),
};

// Style variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <div>
        <h4 className="text-sm font-semibold mb-2 text-white/80">Default</h4>
        <GlassBreadcrumbs
          variant="default"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Components' },
          ]}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2 text-white/80">Solid</h4>
        <GlassBreadcrumbs
          variant="solid"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Components' },
          ]}
        />
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2 text-white/80">Ghost</h4>
        <GlassBreadcrumbs
          variant="ghost"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Components' },
          ]}
        />
      </div>
    </div>
  ),
};

// Without home icon
export const NoHomeIcon: Story = {
  args: {
    showHome: false,
    items: [
      { label: 'Categories', href: '/categories' },
      { label: 'Technology', href: '/categories/tech' },
      { label: 'Programming' },
    ],
  },
};

// Custom separator
export const CustomSeparator: Story = {
  render: () => (
    <div className="space-y-4 w-[600px]">
      <GlassBreadcrumbs
        items={[
          { label: 'Step 1', href: '#' },
          { label: 'Step 2', href: '#' },
          { label: 'Step 3' },
        ]}
        separator={<span className="text-white/40 mx-2">→</span>}
      />
      <GlassBreadcrumbs
        items={[
          { label: 'Level 1', href: '#' },
          { label: 'Level 2', href: '#' },
          { label: 'Level 3' },
        ]}
        separator={<span className="text-white/40 mx-2">/</span>}
      />
      <GlassBreadcrumbs
        items={[
          { label: 'First', href: '#' },
          { label: 'Second', href: '#' },
          { label: 'Third' },
        ]}
        separator={<span className="text-white/40 mx-2">•</span>}
      />
    </div>
  ),
};

// Truncation
export const WithTruncation: Story = {
  render: () => {
    const longPath = [
      { label: 'Home', href: '/' },
      { label: 'Documents', href: '/documents' },
      { label: 'Projects', href: '/documents/projects' },
      { label: '2024', href: '/documents/projects/2024' },
      { label: 'Q1', href: '/documents/projects/2024/q1' },
      { label: 'Reports', href: '/documents/projects/2024/q1/reports' },
      { label: 'Financial', href: '/documents/projects/2024/q1/reports/financial' },
      { label: 'Summary.pdf' },
    ];

    return (
      <div className="space-y-4 w-[600px]">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-white/80">Full path</h4>
          <GlassBreadcrumbs items={longPath} />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-white/80">Max 5 items</h4>
          <GlassBreadcrumbs items={longPath} maxItems={5} />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-white/80">Max 3 items</h4>
          <GlassBreadcrumbs items={longPath} maxItems={3} />
        </div>
      </div>
    );
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6 w-[700px]">
      {/* E-commerce */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <h4 className="font-semibold text-white mb-3">E-commerce Navigation</h4>
        <GlassBreadcrumbs
          items={[
            { label: 'Shop', icon: <ShoppingCart className="w-4 h-4" />, href: '/shop' },
            { label: 'Men\'s Clothing', href: '/shop/mens' },
            { label: 'Jackets', href: '/shop/mens/jackets' },
            { label: 'Winter Collection' },
          ]}
        />
      </div>

      {/* File system */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <h4 className="font-semibold text-white mb-3">File System</h4>
        <GlassBreadcrumbs
          items={[
            { label: 'Root', icon: <Folder className="w-4 h-4" />, href: '/' },
            { label: 'Documents', icon: <Folder className="w-4 h-4" />, href: '/documents' },
            { label: 'Reports', icon: <Folder className="w-4 h-4" />, href: '/documents/reports' },
            { label: 'Q4-2024.pdf', icon: <File className="w-4 h-4" /> },
          ]}
          showHome={false}
        />
      </div>

      {/* Multi-step form */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <h4 className="font-semibold text-white mb-3">Checkout Process</h4>
        <GlassBreadcrumbs
          variant="ghost"
          items={[
            { label: 'Cart', icon: <ShoppingCart className="w-4 h-4" />, href: '/cart' },
            { label: 'Shipping', icon: <Package className="w-4 h-4" />, href: '/checkout/shipping' },
            { label: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
          ]}
          separator={<span className="text-white/40 mx-3">→</span>}
          showHome={false}
        />
      </div>

      {/* Admin panel */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <h4 className="font-semibold text-white mb-3">Admin Dashboard</h4>
        <GlassBreadcrumbs
          size="sm"
          items={[
            { label: 'Dashboard', href: '/admin' },
            { label: 'Users', href: '/admin/users' },
            { label: 'Permissions', href: '/admin/users/permissions' },
            { label: 'Edit Role' },
          ]}
        />
      </div>
    </div>
  ),
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [path, setPath] = React.useState<string[]>(['Home']);
    
    const items: BreadcrumbItem[] = path.map((label, index) => ({
      label,
      onClick: index < path.length - 1 ? () => setPath(path.slice(0, index + 1)) : undefined,
    }));

    const addLevel = (label: string) => {
      setPath([...path, label]);
    };

    return (
      <div className="space-y-4 w-[600px]">
        <GlassBreadcrumbs items={items} />
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => addLevel('Products')}
            className="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            Add "Products"
          </button>
          <button
            onClick={() => addLevel('Services')}
            className="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            Add "Services"
          </button>
          <button
            onClick={() => addLevel('About')}
            className="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            Add "About"
          </button>
          <button
            onClick={() => setPath(['Home'])}
            className="px-3 py-1 text-sm rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white"
          >
            Reset
          </button>
        </div>
        
        <p className="text-sm text-white/60">
          Click breadcrumb items to navigate back, or use buttons to add new levels.
        </p>
      </div>
    );
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <div className="p-6 rounded-lg bg-white/10">
        <h3 className="text-lg font-semibold mb-4 text-white">Light Background</h3>
        <GlassBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Components', href: '/docs/components' },
            { label: 'Breadcrumbs' },
          ]}
        />
      </div>

      <div className="p-6 rounded-lg bg-black/30">
        <h3 className="text-lg font-semibold mb-4 text-white">Dark Background</h3>
        <GlassBreadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Components', href: '/docs/components' },
            { label: 'Breadcrumbs' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'liquid-gradient',
    },
  },
};

// Accessibility
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <p className="text-sm text-white/60">
        Breadcrumbs include proper ARIA labels and current page indication. The navigation is keyboard accessible with proper focus management.
      </p>
      
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="text-sm font-semibold mb-2 text-white">Standard navigation</h4>
          <GlassBreadcrumbs
            items={[
              { label: 'Store', href: '/store' },
              { label: 'Books', href: '/store/books' },
              { label: 'Fiction', href: '/store/books/fiction' },
              { label: 'Best Sellers' },
            ]}
          />
          <p className="text-xs text-white/60 mt-2">
            The last item is marked with aria-current="page" and is not clickable.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="text-sm font-semibold mb-2 text-white">With keyboard navigation</h4>
          <GlassBreadcrumbs
            items={[
              { label: 'Admin', onClick: () => alert('Navigate to Admin') },
              { label: 'Settings', onClick: () => alert('Navigate to Settings') },
              { label: 'Security' },
            ]}
            onHomeClick={() => alert('Navigate to Home')}
          />
          <p className="text-xs text-white/60 mt-2">
            Try using Tab to navigate through items and Enter/Space to activate.
          </p>
        </div>
      </div>
    </div>
  ),
};