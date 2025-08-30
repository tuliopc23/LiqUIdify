import type { Meta, StoryObj } from '@storybook/react';
import { LiquidBreadcrumb } from './liquid-breadcrumb';
import { useState } from 'react';

const meta: Meta<typeof LiquidBreadcrumb> = {
  title: 'Navigation/LiquidBreadcrumb',
  component: LiquidBreadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A breadcrumb navigation component with Apple HIG liquid glass design, supporting truncation, custom separators, and accessibility features.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum items to show before truncation',
    },
    showRoot: {
      control: 'boolean',
      description: 'Show root/home item',
    },
    rootLabel: {
      control: 'text',
      description: 'Label for root item',
    },
    collapsedLabel: {
      control: 'text',
      description: 'Label for collapsed items indicator',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minWidth: '600px',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LiquidBreadcrumb>;

// Icons
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.5 2A1.5 1.5 0 0 1 3 .5h3.28a1 1 0 0 1 .948.684L8.58 3.5H12.5A1.5 1.5 0 0 1 14 5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 13V2A1.5 1.5 0 0 1 1.5 2zM1 2v11.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H8.207L6.854 2.854A.5.5 0 0 0 6.5 2.5H3a.5.5 0 0 0-.5.5V2z"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const SlashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"/>
  </svg>
);

// Sample breadcrumb items
const sampleItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
  { label: 'Projects', href: '/projects', icon: <FolderIcon /> },
  { label: 'Web Development', href: '/projects/web-dev' },
  { label: 'E-commerce Site', href: '/projects/web-dev/ecommerce' },
  { label: 'Product Details', icon: <DocumentIcon /> },
];

const deepItems = [
  { label: 'Home', href: '/', icon: <HomeIcon /> },
  { label: 'Category', href: '/category' },
  { label: 'Subcategory', href: '/category/subcategory' },
  { label: 'Product Type', href: '/category/subcategory/type' },
  { label: 'Brand', href: '/category/subcategory/type/brand' },
  { label: 'Model', href: '/category/subcategory/type/brand/model' },
  { label: 'Variant', href: '/category/subcategory/type/brand/model/variant' },
  { label: 'Product Details' },
];

const simpleItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Team' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
    items: sampleItems,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    items: sampleItems,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    items: sampleItems,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    items: sampleItems,
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: sampleItems,
    separator: <SlashIcon />,
  },
};

export const WithTextSeparator: Story = {
  args: {
    items: sampleItems,
    separator: <span className="text-white/40">→</span>,
  },
};

export const WithoutRoot: Story = {
  args: {
    items: sampleItems.slice(1), // Remove first item
    showRoot: false,
  },
};

export const CustomRootLabel: Story = {
  args: {
    items: sampleItems.slice(1), // Remove first item so root is added
    rootLabel: 'Start',
  },
};

export const Truncated: Story = {
  args: {
    items: deepItems,
    maxItems: 4,
  },
};

export const TruncatedCard: Story = {
  args: {
    variant: 'card',
    items: deepItems,
    maxItems: 3,
    collapsedLabel: '...',
  },
};

export const MinimalTruncation: Story = {
  args: {
    items: deepItems,
    maxItems: 2,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <HomeIcon /> },
      { label: 'Archives', disabled: true },
      { label: '2023', href: '/archives/2023' },
      { label: 'December', href: '/archives/2023/december' },
      { label: 'Article Title' },
    ],
  },
};

export const OnlyCurrentPage: Story = {
  args: {
    items: [{ label: 'Current Page' }],
    showRoot: false,
  },
};

export const LongLabels: Story = {
  args: {
    variant: 'card',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
      { label: 'Very Long Category Name That Might Wrap', href: '/category' },
      { label: 'Another Extremely Long Subcategory Name', href: '/category/subcategory' },
      { label: 'Final Page With Very Long Title' },
    ],
    maxItems: 4,
  },
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/projects/web-dev/ecommerce');
    const [variant, setVariant] = useState<'default' | 'card' | 'ghost'>('default');
    const [maxItems, setMaxItems] = useState<number | undefined>(undefined);

    // Generate breadcrumb items based on current path
    const generateItems = (path: string) => {
      const pathMap: Record<string, { label: string; icon?: React.ReactNode }> = {
        '/': { label: 'Home', icon: <HomeIcon /> },
        '/dashboard': { label: 'Dashboard' },
        '/projects': { label: 'Projects', icon: <FolderIcon /> },
        '/projects/web-dev': { label: 'Web Development' },
        '/projects/web-dev/ecommerce': { label: 'E-commerce Site' },
        '/projects/web-dev/ecommerce/products': { label: 'Products' },
        '/projects/web-dev/ecommerce/products/details': { label: 'Product Details', icon: <DocumentIcon /> },
        '/projects/mobile': { label: 'Mobile Apps' },
        '/projects/mobile/ios': { label: 'iOS App' },
        '/projects/mobile/ios/features': { label: 'Features' },
      };

      const segments = path.split('/').filter(Boolean);
      const items = [];
      let currentPath = '';

      for (const segment of segments) {
        currentPath += `/${segment}`;
        const pathInfo = pathMap[currentPath];
        if (pathInfo) {
          items.push({
            label: pathInfo.label,
            href: currentPath,
            icon: pathInfo.icon,
            onClick: () => setCurrentPath(currentPath),
          });
        }
      }

      // Last item shouldn't have href or onClick (current page)
      if (items.length > 0) {
        const lastItem = items[items.length - 1];
        delete lastItem.href;
        delete lastItem.onClick;
      }

      return items;
    };

    const breadcrumbItems = generateItems(currentPath);

    const navigationOptions = [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/projects', label: 'Projects Root' },
      { path: '/projects/web-dev', label: 'Web Development' },
      { path: '/projects/web-dev/ecommerce', label: 'E-commerce Site' },
      { path: '/projects/web-dev/ecommerce/products', label: 'Products' },
      { path: '/projects/web-dev/ecommerce/products/details', label: 'Product Details' },
      { path: '/projects/mobile/ios/features', label: 'Deep Mobile Path' },
    ];

    return (
      <div className="space-y-6">
        <LiquidBreadcrumb
          variant={variant}
          items={breadcrumbItems}
          maxItems={maxItems}
        />
        
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 space-y-4">
          <h3 className="text-white font-medium">Interactive Controls</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-white/80 mb-2">Navigate to:</label>
              <div className="flex flex-wrap gap-2">
                {navigationOptions.map((option) => (
                  <button
                    key={option.path}
                    onClick={() => setCurrentPath(option.path)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      currentPath === option.path
                        ? 'bg-blue-500/30 text-blue-200'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Variant:</label>
              <div className="flex gap-2">
                {(['default', 'card', 'ghost'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-3 py-1 text-sm rounded transition-colors capitalize ${
                      variant === v
                        ? 'bg-blue-500/30 text-blue-200'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Max Items (for truncation):</label>
              <div className="flex gap-2">
                {[undefined, 2, 3, 4, 5].map((max) => (
                  <button
                    key={max || 'none'}
                    onClick={() => setMaxItems(max)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      maxItems === max
                        ? 'bg-blue-500/30 text-blue-200'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {max || 'None'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <div className="text-sm text-white/70 space-y-1">
              <div>Current Path: <code className="text-blue-200">{currentPath}</code></div>
              <div>Items Count: {breadcrumbItems.length}</div>
              {maxItems && breadcrumbItems.length > maxItems && (
                <div className="text-yellow-200">Truncation active (showing {maxItems} of {breadcrumbItems.length} items)</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};