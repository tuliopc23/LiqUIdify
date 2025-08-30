import type { Meta, StoryObj } from '@storybook/react';
import { LiquidAccordion, LiquidAccordionItem } from './liquid-accordion';
import { LiquidButton } from '../liquid-button';
import { useState } from 'react';

const meta: Meta<typeof LiquidAccordion> = {
  title: 'Data Display/LiquidAccordion',
  component: LiquidAccordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collapsible accordion component with Apple HIG liquid glass design, supporting single or multiple panel modes.',
      },
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
type Story = StoryObj<typeof LiquidAccordion>;

// Sample accordion items
const basicItems = [
  {
    key: '1',
    title: 'What is LiqUIdify?',
    content: 'LiqUIdify is a React component library that brings Apple\'s Human Interface Guidelines liquid glass design language to web applications. It provides a comprehensive set of components with beautiful glass effects and smooth animations.',
  },
  {
    key: '2',
    title: 'How do I get started?',
    content: 'Getting started with LiqUIdify is easy! Install the package via npm or yarn, import the components you need, and start building beautiful interfaces. Check out our documentation for detailed setup instructions and examples.',
  },
  {
    key: '3',
    title: 'Is it accessible?',
    content: 'Yes! LiqUIdify components are built with accessibility in mind, following WCAG 2.1 AA guidelines. All components include proper ARIA attributes, keyboard navigation support, and screen reader compatibility.',
  },
];

const advancedItems = [
  {
    key: 'features',
    title: 'Features',
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 rounded-lg">
            <h4 className="font-medium text-white mb-2">Liquid Glass Design</h4>
            <p className="text-white/80 text-sm">Beautiful glass effects with blur and transparency</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <h4 className="font-medium text-white mb-2">TypeScript Support</h4>
            <p className="text-white/80 text-sm">Full type safety and IntelliSense support</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <h4 className="font-medium text-white mb-2">Accessibility First</h4>
            <p className="text-white/80 text-sm">WCAG 2.1 AA compliant components</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <h4 className="font-medium text-white mb-2">Customizable</h4>
            <p className="text-white/80 text-sm">Extensive theming and variant options</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'installation',
    title: 'Installation',
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-white mb-2">Package Manager</h4>
          <div className="bg-black/20 p-3 rounded-lg font-mono text-sm text-green-200">
            npm install liquidify
          </div>
        </div>
        <div>
          <h4 className="font-medium text-white mb-2">Import Components</h4>
          <div className="bg-black/20 p-3 rounded-lg font-mono text-sm text-blue-200">
            {`import { LiquidButton, LiquidCard } from 'liquidify';`}
          </div>
        </div>
        <div>
          <p className="text-white/80 text-sm">
            That's it! You can now use LiqUIdify components in your React application.
          </p>
        </div>
      </div>
    ),
  },
  {
    key: 'support',
    title: 'Support & Community',
    content: (
      <div className="space-y-4">
        <p className="text-white/80">
          Join our growing community of developers building beautiful interfaces with LiqUIdify.
        </p>
        <div className="flex gap-2">
          <LiquidButton size="sm" variant="ghost">Documentation</LiquidButton>
          <LiquidButton size="sm" variant="ghost">GitHub</LiquidButton>
          <LiquidButton size="sm" variant="ghost">Discord</LiquidButton>
        </div>
      </div>
    ),
  },
];

// Icons
const ChevronIcon = ({ isActive }: { isActive: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="currentColor"
    className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
  >
    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const PlusMinusIcon = ({ isActive }: { isActive: boolean }) => (
  <div className="w-4 h-4 flex items-center justify-center bg-white/20 rounded-full text-xs font-bold">
    {isActive ? '−' : '+'}
  </div>
);

const ArrowIcon = ({ isActive }: { isActive: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="currentColor"
    className={`transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`}
  >
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

export const Default: Story = {
  args: {
    items: basicItems,
    defaultActiveKey: '1',
  },
};

export const MultipleOpen: Story = {
  args: {
    items: basicItems,
    accordion: false, // Allow multiple panels open
    defaultActiveKey: ['1', '3'],
  },
};

export const SingleAccordion: Story = {
  args: {
    items: basicItems,
    accordion: true, // Only one panel can be open
    defaultActiveKey: '2',
  },
};

export const NotCollapsible: Story = {
  args: {
    items: basicItems,
    accordion: true,
    collapsible: false, // Cannot close the active panel
    defaultActiveKey: '1',
  },
};

export const CustomExpandIcon: Story = {
  args: {
    items: basicItems,
    expandIcon: PlusMinusIcon,
    defaultActiveKey: '1',
  },
};

export const ExpandIconLeft: Story = {
  args: {
    items: basicItems,
    expandIcon: ArrowIcon,
    expandIconPosition: 'left',
    defaultActiveKey: '1',
  },
};

export const WithRichContent: Story = {
  args: {
    items: advancedItems,
    variant: 'card',
    defaultActiveKey: 'features',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-white font-medium mb-4">Default</h3>
        <LiquidAccordion items={basicItems.slice(0, 2)} defaultActiveKey="1" />
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-4">Card</h3>
        <LiquidAccordion items={basicItems.slice(0, 2)} variant="card" defaultActiveKey="1" />
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-4">Minimal</h3>
        <LiquidAccordion items={basicItems.slice(0, 2)} variant="minimal" defaultActiveKey="1" />
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-4">Separated</h3>
        <LiquidAccordion items={basicItems.slice(0, 2)} variant="separated" defaultActiveKey="1" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-white font-medium mb-4">Small</h3>
        <LiquidAccordion items={basicItems.slice(0, 2)} size="sm" defaultActiveKey="1" />
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-4">Medium (Default)</h3>
        <LiquidAccordion items={basicItems.slice(0, 2)} size="md" defaultActiveKey="1" />
      </div>
      
      <div>
        <h3 className="text-white font-medium mb-4">Large</h3>
        <LiquidAccordion items={basicItems.slice(0, 2)} size="lg" defaultActiveKey="1" />
      </div>
    </div>
  ),
};

export const Ghost: Story = {
  args: {
    items: basicItems,
    ghost: true,
    defaultActiveKey: '1',
  },
};

export const WithExtraContent: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Notifications',
        content: 'Configure your notification preferences and settings.',
        extra: <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full">New</span>,
      },
      {
        key: '2',
        title: 'Security Settings',
        content: 'Manage your account security and privacy settings.',
        extra: <span className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded-full">!</span>,
      },
      {
        key: '3',
        title: 'Account Information',
        content: 'Update your personal information and account details.',
        extra: <span className="text-xs text-white/60">Updated 2d ago</span>,
      },
    ],
    defaultActiveKey: '1',
  },
};

export const DisabledPanels: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Available Feature',
        content: 'This feature is available and can be accessed.',
      },
      {
        key: '2',
        title: 'Premium Feature',
        content: 'This content would be available with a premium subscription.',
        disabled: true,
      },
      {
        key: '3',
        title: 'Coming Soon',
        content: 'This feature is under development.',
        disabled: true,
      },
    ],
    defaultActiveKey: '1',
  },
};

// Using individual accordion items
export const CustomStructure: Story = {
  render: () => (
    <LiquidAccordion defaultActiveKey="item1">
      <LiquidAccordionItem itemKey="item1" title="Custom Item 1">
        <div className="space-y-3">
          <p className="text-white/80">
            This accordion uses individual LiquidAccordionItem components for more control over the structure.
          </p>
          <div className="bg-white/5 p-3 rounded-lg">
            <p className="text-white/70 text-sm">You can include any content here, including other components.</p>
          </div>
        </div>
      </LiquidAccordionItem>
      
      <LiquidAccordionItem itemKey="item2" title="Custom Item 2">
        <div className="space-y-3">
          <p className="text-white/80">Each item can have completely different content and structure.</p>
          <div className="flex gap-2">
            <LiquidButton size="sm">Action 1</LiquidButton>
            <LiquidButton size="sm" variant="ghost">Action 2</LiquidButton>
          </div>
        </div>
      </LiquidAccordionItem>
      
      <LiquidAccordionItem 
        itemKey="item3" 
        title="Item with Extra Content"
        extra={<span className="text-blue-200 text-sm">Optional</span>}
      >
        <p className="text-white/80">
          This item has extra content displayed in the header alongside the title.
        </p>
      </LiquidAccordionItem>
    </LiquidAccordion>
  ),
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState<string | string[]>('features');
    const [accordion, setAccordion] = useState(true);
    const [variant, setVariant] = useState<'default' | 'card' | 'minimal' | 'separated'>('default');
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [expandIconPosition, setExpandIconPosition] = useState<'left' | 'right'>('right');
    const [ghost, setGhost] = useState(false);

    const handleChange = (key: string | string[]) => {
      setActiveKey(key);
      console.log('Accordion changed:', key);
    };

    return (
      <div className="space-y-6">
        {/* Controls */}
        <div className="bg-white/10 p-4 rounded-lg space-y-4">
          <h3 className="text-white font-medium">Accordion Controls</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/80 mb-2">Mode:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setAccordion(true);
                    setActiveKey(Array.isArray(activeKey) ? activeKey[0] || '' : activeKey);
                  }}
                  className={`px-3 py-2 text-sm rounded transition-colors ${
                    accordion
                      ? 'bg-blue-500/30 text-blue-200'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => {
                    setAccordion(false);
                    setActiveKey(Array.isArray(activeKey) ? activeKey : [activeKey].filter(Boolean));
                  }}
                  className={`px-3 py-2 text-sm rounded transition-colors ${
                    !accordion
                      ? 'bg-blue-500/30 text-blue-200'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  Multiple
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Variant:</label>
              <div className="flex gap-1">
                {(['default', 'card', 'minimal', 'separated'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-2 py-1 text-xs rounded transition-colors capitalize ${
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
              <label className="block text-sm text-white/80 mb-2">Size:</label>
              <div className="flex gap-1">
                {(['sm', 'md', 'lg'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1 text-sm rounded transition-colors capitalize ${
                      size === s
                        ? 'bg-blue-500/30 text-blue-200'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Icon Position:</label>
              <div className="flex gap-1">
                {(['left', 'right'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setExpandIconPosition(pos)}
                    className={`px-3 py-1 text-sm rounded transition-colors capitalize ${
                      expandIconPosition === pos
                        ? 'bg-blue-500/30 text-blue-200'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={ghost}
                onChange={(e) => setGhost(e.target.checked)}
                className="rounded border-white/20"
              />
              Ghost mode (no borders)
            </label>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white/10 p-3 rounded-lg text-sm text-white/70">
          <div>
            <span className="text-white/90">Active panels:</span>{' '}
            {Array.isArray(activeKey) ? activeKey.join(', ') || 'None' : activeKey || 'None'}
          </div>
          <div>
            <span className="text-white/90">Mode:</span> {accordion ? 'Single panel' : 'Multiple panels'}
          </div>
        </div>

        {/* Accordion */}
        <LiquidAccordion
          items={advancedItems}
          activeKey={activeKey}
          onChange={handleChange}
          accordion={accordion}
          variant={variant}
          size={size}
          expandIconPosition={expandIconPosition}
          ghost={ghost}
        />
      </div>
    );
  },
};