import type { Meta, StoryObj } from '@storybook/react';
import { LiquidModal } from './liquid-modal';
import { LiquidButton } from '../liquid-button';
import { useState } from 'react';

const meta: Meta<typeof LiquidModal> = {
  title: 'Feedback & Overlay/LiquidModal',
  component: LiquidModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component with Apple HIG liquid glass design, focus management, and accessibility features.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the modal',
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'dialog', 'sheet'],
      description: 'Visual style variant',
    },
    overlayVariant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'blur'],
      description: 'Overlay backdrop style',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    preventScroll: {
      control: 'boolean',
      description: 'Prevent body scroll when open',
    },
    trapFocus: {
      control: 'boolean',
      description: 'Trap focus within modal',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: '400px',
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
type Story = StoryObj<typeof LiquidModal>;

// Sample content components
const SampleContent = () => (
  <div className="space-y-4">
    <p className="text-white/90">
      This is a sample modal content. You can put any content here including forms, 
      images, or other components.
    </p>
    <div className="bg-white/10 p-4 rounded-lg">
      <h3 className="font-medium text-white mb-2">Example Section</h3>
      <p className="text-white/80 text-sm">
        This demonstrates how content looks inside the modal with the liquid glass effect.
      </p>
    </div>
  </div>
);

const FormContent = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-white mb-2">Name</label>
      <input 
        type="text" 
        placeholder="Enter your name"
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-white mb-2">Email</label>
      <input 
        type="email" 
        placeholder="Enter your email"
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-white mb-2">Message</label>
      <textarea 
        placeholder="Enter your message"
        rows={4}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
      />
    </div>
  </div>
);

// Basic modal wrapper component
const ModalWrapper = ({ children, ...props }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LiquidButton onClick={() => setOpen(true)}>
        Open Modal
      </LiquidButton>
      <LiquidModal open={open} onOpenChange={setOpen} {...props}>
        {children}
      </LiquidModal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    title: "Default Modal",
    description: "This is a default modal with liquid glass design",
  },
};

export const WithFooter: Story = {
  render: (args) => (
    <ModalWrapper 
      {...args}
      footer={
        <div className="flex justify-end gap-2">
          <LiquidButton variant="ghost">Cancel</LiquidButton>
          <LiquidButton variant="default">Confirm</LiquidButton>
        </div>
      }
    >
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    title: "Modal with Footer",
    description: "This modal includes action buttons in the footer",
  },
};

export const FormModal: Story = {
  render: (args) => (
    <ModalWrapper 
      {...args}
      footer={
        <div className="flex justify-end gap-2">
          <LiquidButton variant="ghost">Cancel</LiquidButton>
          <LiquidButton variant="default">Submit</LiquidButton>
        </div>
      }
    >
      <FormContent />
    </ModalWrapper>
  ),
  args: {
    title: "Contact Form",
    description: "Fill out the form below to send us a message",
  },
};

export const SmallSize: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="text-center space-y-4">
        <div className="text-white">
          <h3 className="font-medium mb-2">Are you sure?</h3>
          <p className="text-white/70 text-sm">This action cannot be undone.</p>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: "sm",
    showCloseButton: false,
    footer: (
      <div className="flex justify-end gap-2">
        <LiquidButton variant="ghost" size="sm">Cancel</LiquidButton>
        <LiquidButton variant="destructive" size="sm">Delete</LiquidButton>
      </div>
    ),
  },
};

export const LargeSize: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="space-y-6">
        <SampleContent />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Feature 1</h3>
            <p className="text-white/80 text-sm">Description of feature 1</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="font-medium text-white mb-2">Feature 2</h3>
            <p className="text-white/80 text-sm">Description of feature 2</p>
          </div>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: "xl",
    title: "Large Modal",
    description: "This is an extra large modal with more content space",
  },
};

export const CardVariant: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    variant: "card",
    title: "Card Modal",
    description: "This modal uses the card variant styling",
  },
};

export const DialogVariant: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    variant: "dialog",
    title: "Dialog Modal",
    description: "This modal uses the dialog variant styling",
  },
};

export const SheetVariant: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    variant: "sheet",
    title: "Bottom Sheet",
    description: "This modal slides up from the bottom",
  },
};

export const FullscreenModal: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="h-full space-y-6">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-4">Fullscreen Experience</h2>
          <p className="text-white/80 mb-6">
            This modal takes up the full viewport, perfect for immersive experiences or complex forms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-medium text-white mb-2">Section {i + 1}</h3>
              <p className="text-white/70 text-sm">Content for section {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    size: "full",
    title: "Fullscreen Modal",
    showCloseButton: true,
  },
};

export const DarkOverlay: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    overlayVariant: "dark",
    title: "Dark Overlay",
    description: "This modal has a darker overlay background",
  },
};

export const LightOverlay: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    overlayVariant: "light",
    title: "Light Overlay",
    description: "This modal has a lighter overlay background",
  },
};

export const BlurOverlay: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <SampleContent />
    </ModalWrapper>
  ),
  args: {
    overlayVariant: "blur",
    title: "Blur Overlay",
    description: "This modal has extra blur on the overlay",
  },
};

export const NoCloseButton: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <div className="text-center space-y-4">
        <div className="text-white">
          <h3 className="font-medium mb-2">Important Notice</h3>
          <p className="text-white/70 text-sm">You must make a choice to continue.</p>
        </div>
      </div>
    </ModalWrapper>
  ),
  args: {
    showCloseButton: false,
    closeOnOverlayClick: false,
    closeOnEscape: false,
    title: "Required Action",
    footer: (
      <div className="flex justify-center gap-2">
        <LiquidButton variant="ghost">Option A</LiquidButton>
        <LiquidButton variant="default">Option B</LiquidButton>
      </div>
    ),
  },
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [variant, setVariant] = useState<'default' | 'card' | 'dialog' | 'sheet'>('default');
    const [showFooter, setShowFooter] = useState(true);

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <LiquidButton onClick={() => setOpen(true)}>
            Open Interactive Modal
          </LiquidButton>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 space-y-4">
            <h3 className="text-white font-medium">Modal Controls</h3>
            
            <div>
              <label className="block text-sm text-white/80 mb-2">Size:</label>
              <div className="flex gap-2">
                {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
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
              <label className="block text-sm text-white/80 mb-2">Variant:</label>
              <div className="flex gap-2">
                {(['default', 'card', 'dialog', 'sheet'] as const).map((v) => (
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
              <label className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={showFooter}
                  onChange={(e) => setShowFooter(e.target.checked)}
                  className="rounded border-white/20"
                />
                Show Footer
              </label>
            </div>
          </div>
        </div>

        <LiquidModal
          open={open}
          onOpenChange={setOpen}
          size={size}
          variant={variant}
          title="Interactive Modal"
          description={`This is a ${size} ${variant} modal`}
          footer={showFooter ? (
            <div className="flex justify-end gap-2">
              <LiquidButton variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </LiquidButton>
              <LiquidButton onClick={() => setOpen(false)}>
                Confirm
              </LiquidButton>
            </div>
          ) : undefined}
        >
          <div className="space-y-4">
            <p className="text-white/90">
              Current configuration:
            </p>
            <div className="bg-white/10 p-4 rounded-lg space-y-2">
              <div className="text-sm text-white/80">Size: <span className="text-white font-mono">{size}</span></div>
              <div className="text-sm text-white/80">Variant: <span className="text-white font-mono">{variant}</span></div>
              <div className="text-sm text-white/80">Footer: <span className="text-white font-mono">{showFooter ? 'shown' : 'hidden'}</span></div>
            </div>
          </div>
        </LiquidModal>
      </div>
    );
  },
};