import type { Meta, StoryObj } from '@storybook/react';
import { LiquidPopover, LiquidPopoverMenuItem } from './liquid-popover';
import { LiquidButton } from '../liquid-button';
import { useState } from 'react';

const meta: Meta<typeof LiquidPopover> = {
  title: 'Feedback & Overlay/LiquidPopover',
  component: LiquidPopover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A popover component with smart positioning, modal support, and Apple HIG liquid glass design.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'menu', 'dialog'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'auto'],
      description: 'Size of the popover',
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
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointer',
    },
    modal: {
      control: 'boolean',
      description: 'Modal behavior with overlay',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Close when clicking outside',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when pressing Escape',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: '500px',
        minWidth: '700px',
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
type Story = StoryObj<typeof LiquidPopover>;

// Icons for examples
const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9l-3-3L2.5 11.707V13.5a.5.5 0 0 0 .5.5h1.793L11.207 9z"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>
);

// Basic popover wrapper component
const PopoverWrapper = ({ children, triggerLabel = "Open Popover", ...props }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <LiquidPopover
      open={open}
      onOpenChange={setOpen}
      trigger={
        <LiquidButton onClick={() => setOpen(!open)}>
          {triggerLabel}
        </LiquidButton>
      }
      {...props}
    >
      {children}
    </LiquidPopover>
  );
};

export const Default: Story = {
  render: (args) => (
    <PopoverWrapper {...args}>
      <div className="space-y-3">
        <h3 className="font-medium text-white">Default Popover</h3>
        <p className="text-white/80 text-sm">
          This is a basic popover with liquid glass design and smart positioning.
        </p>
        <div className="flex gap-2">
          <LiquidButton size="sm" variant="ghost">Cancel</LiquidButton>
          <LiquidButton size="sm">Confirm</LiquidButton>
        </div>
      </div>
    </PopoverWrapper>
  ),
};

export const MenuVariant: Story = {
  render: (args) => (
    <PopoverWrapper {...args} triggerLabel="Actions" variant="menu">
      <LiquidPopoverMenuItem icon={<EditIcon />}>
        Edit
      </LiquidPopoverMenuItem>
      <LiquidPopoverMenuItem icon={<ShareIcon />}>
        Share
      </LiquidPopoverMenuItem>
      <LiquidPopoverMenuItem icon={<DeleteIcon />} destructive>
        Delete
      </LiquidPopoverMenuItem>
    </PopoverWrapper>
  ),
};

export const CardVariant: Story = {
  render: (args) => (
    <PopoverWrapper {...args} variant="card">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">JD</span>
          </div>
          <div>
            <h3 className="font-medium text-white">John Doe</h3>
            <p className="text-white/70 text-sm">Software Engineer</p>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <p className="text-white/80 text-sm">
            Quick profile preview with additional information and actions.
          </p>
        </div>
      </div>
    </PopoverWrapper>
  ),
};

export const DialogVariant: Story = {
  render: (args) => (
    <PopoverWrapper {...args} variant="dialog" size="lg">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <InfoIcon />
          <h3 className="font-medium">Confirmation Required</h3>
        </div>
        <p className="text-white/80">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <LiquidButton variant="ghost">Cancel</LiquidButton>
          <LiquidButton variant="destructive">Delete</LiquidButton>
        </div>
      </div>
    </PopoverWrapper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6">
      <PopoverWrapper size="sm" triggerLabel="Small">
        <div className="space-y-2">
          <h4 className="font-medium text-white">Small</h4>
          <p className="text-white/80 text-sm">Compact content</p>
        </div>
      </PopoverWrapper>
      
      <PopoverWrapper size="md" triggerLabel="Medium">
        <div className="space-y-3">
          <h4 className="font-medium text-white">Medium</h4>
          <p className="text-white/80 text-sm">Standard amount of content with room for details.</p>
        </div>
      </PopoverWrapper>
      
      <PopoverWrapper size="lg" triggerLabel="Large">
        <div className="space-y-4">
          <h4 className="font-medium text-white">Large</h4>
          <p className="text-white/80 text-sm">
            More spacious layout with room for detailed content, forms, or complex interactions.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <LiquidButton size="sm" variant="ghost">Option A</LiquidButton>
            <LiquidButton size="sm" variant="ghost">Option B</LiquidButton>
          </div>
        </div>
      </PopoverWrapper>
    </div>
  ),
};

export const Positioning: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-12">
      <div className="space-y-6">
        <h3 className="text-white font-medium text-center">Sides</h3>
        <div className="grid grid-cols-2 gap-4">
          <PopoverWrapper side="top" triggerLabel="Top">
            <div className="p-2 text-white text-sm">Top positioned</div>
          </PopoverWrapper>
          <PopoverWrapper side="right" triggerLabel="Right">
            <div className="p-2 text-white text-sm">Right positioned</div>
          </PopoverWrapper>
          <PopoverWrapper side="bottom" triggerLabel="Bottom">
            <div className="p-2 text-white text-sm">Bottom positioned</div>
          </PopoverWrapper>
          <PopoverWrapper side="left" triggerLabel="Left">
            <div className="p-2 text-white text-sm">Left positioned</div>
          </PopoverWrapper>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-white font-medium text-center">Alignment</h3>
        <div className="grid grid-cols-1 gap-4">
          <PopoverWrapper side="bottom" align="start" triggerLabel="Start">
            <div className="p-2 text-white text-sm">Start aligned</div>
          </PopoverWrapper>
          <PopoverWrapper side="bottom" align="center" triggerLabel="Center">
            <div className="p-2 text-white text-sm">Center aligned</div>
          </PopoverWrapper>
          <PopoverWrapper side="bottom" align="end" triggerLabel="End">
            <div className="p-2 text-white text-sm">End aligned</div>
          </PopoverWrapper>
        </div>
      </div>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div className="flex gap-6">
      <PopoverWrapper arrow={true} triggerLabel="With Arrow">
        <div className="p-2 text-white text-sm">Arrow pointing to trigger</div>
      </PopoverWrapper>
      <PopoverWrapper arrow={false} triggerLabel="No Arrow">
        <div className="p-2 text-white text-sm">Clean edges, no arrow</div>
      </PopoverWrapper>
    </div>
  ),
};

export const ModalBehavior: Story = {
  render: () => (
    <div className="flex gap-6">
      <PopoverWrapper modal={false} triggerLabel="Non-Modal">
        <div className="space-y-2">
          <h4 className="font-medium text-white">Non-Modal</h4>
          <p className="text-white/80 text-sm">Click outside to close, no overlay.</p>
        </div>
      </PopoverWrapper>
      
      <PopoverWrapper modal={true} triggerLabel="Modal">
        <div className="space-y-2">
          <h4 className="font-medium text-white">Modal</h4>
          <p className="text-white/80 text-sm">With overlay backdrop.</p>
        </div>
      </PopoverWrapper>
    </div>
  ),
};

export const FormInPopover: Story = {
  render: () => (
    <PopoverWrapper size="lg" triggerLabel="Quick Form">
      <div className="space-y-4">
        <h3 className="font-medium text-white">Quick Contact</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-white/80 mb-1">Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Message</label>
            <textarea 
              rows={3}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none"
              placeholder="Your message..."
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <LiquidButton size="sm" variant="ghost">Cancel</LiquidButton>
          <LiquidButton size="sm">Send</LiquidButton>
        </div>
      </div>
    </PopoverWrapper>
  ),
};

export const ContextMenu: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-white/70 text-sm text-center">Right-click the button below</p>
      <div 
        onContextMenu={(e) => {
          e.preventDefault();
          // In a real implementation, you'd handle context menu positioning here
        }}
      >
        <PopoverWrapper variant="menu" triggerLabel="Right-click me" side="bottom" align="start">
          <LiquidPopoverMenuItem icon={<EditIcon />}>
            Edit Item
          </LiquidPopoverMenuItem>
          <LiquidPopoverMenuItem icon={<ShareIcon />}>
            Share Item
          </LiquidPopoverMenuItem>
          <hr className="border-white/10 my-1" />
          <LiquidPopoverMenuItem>
            Properties
          </LiquidPopoverMenuItem>
          <LiquidPopoverMenuItem icon={<DeleteIcon />} destructive>
            Delete Item
          </LiquidPopoverMenuItem>
        </PopoverWrapper>
      </div>
    </div>
  ),
};

export const NestedContent: Story = {
  render: () => (
    <PopoverWrapper size="lg" triggerLabel="Rich Content">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
            <InfoIcon />
          </div>
          <div>
            <h3 className="font-medium text-white">Feature Overview</h3>
            <p className="text-white/70 text-sm">Learn about our latest features</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/5 p-3 rounded-lg">
            <h4 className="font-medium text-white text-sm mb-1">Performance</h4>
            <p className="text-white/70 text-xs">50% faster loading times</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <h4 className="font-medium text-white text-sm mb-1">Security</h4>
            <p className="text-white/70 text-xs">Enhanced encryption protocols</p>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <h4 className="font-medium text-white text-sm mb-1">Accessibility</h4>
            <p className="text-white/70 text-xs">WCAG 2.1 AA compliant</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-white/60 text-xs">Version 2.1.0</span>
          <LiquidButton size="sm">Learn More</LiquidButton>
        </div>
      </div>
    </PopoverWrapper>
  ),
};

// Interactive story for testing positioning
export const PositioningDemo: Story = {
  render: () => (
    <div className="relative w-full h-80 border-2 border-dashed border-white/30 rounded-lg">
      <div className="absolute inset-4 flex items-center justify-center">
        <PopoverWrapper triggerLabel="Center Popover">
          <div className="p-3 text-white text-sm">
            This popover will adjust its position based on viewport boundaries.
          </div>
        </PopoverWrapper>
      </div>
      
      {/* Corner popovers to test edge cases */}
      <PopoverWrapper 
        triggerLabel="TL" 
        side="bottom" 
        align="start"
        className="absolute top-2 left-2"
      >
        <div className="p-2 text-white text-sm">Top-left corner</div>
      </PopoverWrapper>
      
      <PopoverWrapper 
        triggerLabel="TR" 
        side="bottom" 
        align="end"
        className="absolute top-2 right-2"
      >
        <div className="p-2 text-white text-sm">Top-right corner</div>
      </PopoverWrapper>
      
      <PopoverWrapper 
        triggerLabel="BL" 
        side="top" 
        align="start"
        className="absolute bottom-2 left-2"
      >
        <div className="p-2 text-white text-sm">Bottom-left corner</div>
      </PopoverWrapper>
      
      <PopoverWrapper 
        triggerLabel="BR" 
        side="top" 
        align="end"
        className="absolute bottom-2 right-2"
      >
        <div className="p-2 text-white text-sm">Bottom-right corner</div>
      </PopoverWrapper>
    </div>
  ),
};