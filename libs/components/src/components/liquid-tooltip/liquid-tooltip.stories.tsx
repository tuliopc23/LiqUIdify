import type { Meta, StoryObj } from '@storybook/react';
import { LiquidTooltip } from './liquid-tooltip';
import { LiquidButton } from '../liquid-button';

const meta: Meta<typeof LiquidTooltip> = {
  title: 'Feedback & Overlay/LiquidTooltip',
  component: LiquidTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component with smart positioning, collision detection, and Apple HIG liquid glass design.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'info', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tooltip',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Preferred side for positioning',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment along the side',
    },
    sideOffset: {
      control: 'number',
      description: 'Distance from the trigger',
    },
    alignOffset: {
      control: 'number',
      description: 'Offset along the alignment axis',
    },
    delayDuration: {
      control: 'number',
      description: 'Delay before showing (ms)',
    },
    skipDelayDuration: {
      control: 'number',
      description: 'Skip delay duration (ms)',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointer',
    },
    disableHoverableContent: {
      control: 'boolean',
      description: 'Disable hoverable content',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: '400px',
        minWidth: '600px',
        padding: '6rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LiquidTooltip>;

// Icons for examples
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
  </svg>
);

export const Default: Story = {
  args: {
    content: "This is a default tooltip with liquid glass design",
    children: <LiquidButton>Hover me</LiquidButton>,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <LiquidTooltip content="Default variant" variant="default">
        <LiquidButton variant="ghost">Default</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Dark variant" variant="dark">
        <LiquidButton variant="ghost">Dark</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Light variant" variant="light">
        <LiquidButton variant="ghost">Light</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Info variant" variant="info">
        <LiquidButton variant="ghost">Info</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Success variant" variant="success">
        <LiquidButton variant="ghost">Success</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Warning variant" variant="warning">
        <LiquidButton variant="ghost">Warning</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Error variant" variant="error">
        <LiquidButton variant="ghost">Error</LiquidButton>
      </LiquidTooltip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6">
      <LiquidTooltip content="Small tooltip" size="sm">
        <LiquidButton size="sm">Small</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Medium tooltip" size="md">
        <LiquidButton size="md">Medium</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Large tooltip with more content space" size="lg">
        <LiquidButton size="lg">Large</LiquidButton>
      </LiquidTooltip>
    </div>
  ),
};

export const Positioning: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-12">
      <div className="space-y-6">
        <h3 className="text-white font-medium text-center">Sides</h3>
        <div className="grid grid-cols-2 gap-4">
          <LiquidTooltip content="Top tooltip" side="top">
            <LiquidButton variant="ghost">Top</LiquidButton>
          </LiquidTooltip>
          <LiquidTooltip content="Right tooltip" side="right">
            <LiquidButton variant="ghost">Right</LiquidButton>
          </LiquidTooltip>
          <LiquidTooltip content="Bottom tooltip" side="bottom">
            <LiquidButton variant="ghost">Bottom</LiquidButton>
          </LiquidTooltip>
          <LiquidTooltip content="Left tooltip" side="left">
            <LiquidButton variant="ghost">Left</LiquidButton>
          </LiquidTooltip>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-white font-medium text-center">Alignment</h3>
        <div className="grid grid-cols-1 gap-4">
          <LiquidTooltip content="Start aligned" side="bottom" align="start">
            <LiquidButton variant="ghost">Start</LiquidButton>
          </LiquidTooltip>
          <LiquidTooltip content="Center aligned" side="bottom" align="center">
            <LiquidButton variant="ghost">Center</LiquidButton>
          </LiquidTooltip>
          <LiquidTooltip content="End aligned" side="bottom" align="end">
            <LiquidButton variant="ghost">End</LiquidButton>
          </LiquidTooltip>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-6">
      <LiquidTooltip content="User information and profile settings" variant="info">
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white">
          <UserIcon />
        </button>
      </LiquidTooltip>
      <LiquidTooltip content="Click for help and documentation" variant="info">
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white">
          <HelpIcon />
        </button>
      </LiquidTooltip>
      <LiquidTooltip content="Important information about this feature" variant="warning">
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white">
          <InfoIcon />
        </button>
      </LiquidTooltip>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="flex gap-6">
      <LiquidTooltip 
        content={
          <div>
            <div className="font-medium mb-1">Rich Content</div>
            <div className="text-sm opacity-90">This tooltip contains formatted text and multiple lines of content.</div>
          </div>
        }
        size="lg"
      >
        <LiquidButton>Rich Content</LiquidButton>
      </LiquidTooltip>
      
      <LiquidTooltip 
        content={
          <div className="space-y-2">
            <div className="font-medium">Keyboard Shortcut</div>
            <div className="flex items-center gap-2 text-sm">
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-white/20 rounded text-xs">K</kbd>
            </div>
          </div>
        }
        variant="dark"
        size="lg"
      >
        <LiquidButton>Shortcut</LiquidButton>
      </LiquidTooltip>
    </div>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <div className="flex gap-6">
      <LiquidTooltip content="Tooltip with arrow" arrow={true}>
        <LiquidButton variant="ghost">With Arrow</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Tooltip without arrow" arrow={false}>
        <LiquidButton variant="ghost">No Arrow</LiquidButton>
      </LiquidTooltip>
    </div>
  ),
};

export const DelaySettings: Story = {
  render: () => (
    <div className="flex gap-6">
      <LiquidTooltip content="Appears immediately" delayDuration={0}>
        <LiquidButton variant="ghost">No Delay</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Normal delay (700ms)" delayDuration={700}>
        <LiquidButton variant="ghost">Normal</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Long delay (1500ms)" delayDuration={1500}>
        <LiquidButton variant="ghost">Long Delay</LiquidButton>
      </LiquidTooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content: "This is a very long tooltip content that demonstrates how tooltips handle text wrapping and multiple lines of text. It should wrap appropriately and maintain good readability.",
    size: "lg",
    children: <LiquidButton>Long Content</LiquidButton>,
  },
};

export const OnButtons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <LiquidTooltip content="Primary action button" variant="info">
        <LiquidButton variant="default">Primary</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Secondary action button" variant="default">
        <LiquidButton variant="ghost">Secondary</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Destructive action - be careful!" variant="error">
        <LiquidButton variant="destructive">Delete</LiquidButton>
      </LiquidTooltip>
      <LiquidTooltip content="Disabled button tooltip" variant="dark">
        <LiquidButton disabled>Disabled</LiquidButton>
      </LiquidTooltip>
    </div>
  ),
};

export const OnFormElements: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Name
          <LiquidTooltip content="Enter your full name as it appears on official documents" variant="info" side="right">
            <span className="ml-1 cursor-help">
              <InfoIcon />
            </span>
          </LiquidTooltip>
        </label>
        <input 
          type="text" 
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Password
          <LiquidTooltip 
            content={
              <div className="space-y-1">
                <div className="font-medium">Password Requirements:</div>
                <ul className="text-sm space-y-1">
                  <li>• At least 8 characters</li>
                  <li>• Include uppercase and lowercase</li>
                  <li>• Include numbers and symbols</li>
                </ul>
              </div>
            }
            variant="info" 
            side="right"
            size="lg"
          >
            <span className="ml-1 cursor-help">
              <HelpIcon />
            </span>
          </LiquidTooltip>
        </label>
        <input 
          type="password" 
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
    </div>
  ),
};

// Interactive story for testing positioning
export const PositioningDemo: Story = {
  render: () => (
    <div className="relative w-full h-64 border-2 border-dashed border-white/30 rounded-lg flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-white/70 text-sm">Move around and hover the button to test positioning</p>
        <LiquidTooltip 
          content="This tooltip will automatically position itself to stay within the viewport"
          variant="info"
        >
          <LiquidButton>Hover me anywhere</LiquidButton>
        </LiquidTooltip>
      </div>
      
      {/* Corner buttons to test edge cases */}
      <LiquidTooltip content="Top-left corner" side="bottom" align="start">
        <button className="absolute top-2 left-2 p-2 bg-white/10 rounded text-white text-xs">TL</button>
      </LiquidTooltip>
      <LiquidTooltip content="Top-right corner" side="bottom" align="end">
        <button className="absolute top-2 right-2 p-2 bg-white/10 rounded text-white text-xs">TR</button>
      </LiquidTooltip>
      <LiquidTooltip content="Bottom-left corner" side="top" align="start">
        <button className="absolute bottom-2 left-2 p-2 bg-white/10 rounded text-white text-xs">BL</button>
      </LiquidTooltip>
      <LiquidTooltip content="Bottom-right corner" side="top" align="end">
        <button className="absolute bottom-2 right-2 p-2 bg-white/10 rounded text-white text-xs">BR</button>
      </LiquidTooltip>
    </div>
  ),
};