import type { Meta, StoryObj } from '@storybook/react';
import { Download, Sparkles, Zap } from 'lucide-react';
import React from 'react';
import { GlassBanner } from '@/components/glass-banner/glass-banner';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';

const meta = {
  title: 'Components/Glass Banner',
  component: GlassBanner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A banner component for displaying important messages, notifications, and alerts with glassmorphism styling. Supports different variants, dismissible behavior, and custom actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The visual variant of the banner',
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: {
      description: 'Whether the banner can be dismissed',
      control: { type: 'boolean' },
    },
    onDismiss: {
      description: 'Callback when banner is dismissed',
      action: 'dismissed',
    },
    icon: {
      description: 'Custom icon to display',
      control: false,
    },
    action: {
      description: 'Action element to display',
      control: false,
    },
  },
} satisfies Meta<typeof GlassBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is an informational banner message.',
    variant: 'info',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassBanner variant="info">
        <p className="font-medium">Information</p>
        <p className="text-sm mt-1">
          This is an informational message to keep users updated.
        </p>
      </GlassBanner>

      <GlassBanner variant="success">
        <p className="font-medium">Success!</p>
        <p className="text-sm mt-1">
          Your changes have been saved successfully.
        </p>
      </GlassBanner>

      <GlassBanner variant="warning">
        <p className="font-medium">Warning</p>
        <p className="text-sm mt-1">
          Please review your settings before continuing.
        </p>
      </GlassBanner>

      <GlassBanner variant="error">
        <p className="font-medium">Error</p>
        <p className="text-sm mt-1">
          There was a problem processing your request.
        </p>
      </GlassBanner>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All banner variants showcasing different severity levels',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassBanner
        variant="info"
        action={
          <GlassButton size="sm" variant="ghost">
            Learn More
          </GlassButton>
        }
      >
        <p className="font-medium">New Feature Available</p>
        <p className="text-sm mt-1">
          Check out our latest updates and improvements.
        </p>
      </GlassBanner>

      <GlassBanner
        variant="warning"
        action={
          <div className="flex gap-2">
            <GlassButton size="sm" variant="ghost">
              Ignore
            </GlassButton>
            <GlassButton size="sm" variant="primary">
              Update Now
            </GlassButton>
          </div>
        }
      >
        <p className="font-medium">Update Required</p>
        <p className="text-sm mt-1">
          A new version is available. Update to get the latest features.
        </p>
      </GlassBanner>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banners with action buttons for user interaction',
      },
    },
  },
};

export const Dismissible: Story = {
  render: () => {
    const [banners, setBanners] = React.useState([
      {
        id: 1,
        variant: 'info' as const,
        message: 'This banner can be dismissed',
      },
      {
        id: 2,
        variant: 'success' as const,
        message: 'Operation completed successfully',
      },
      {
        id: 3,
        variant: 'warning' as const,
        message: 'Your session will expire soon',
      },
    ]);

    return (
      <div className="space-y-4">
        {banners.map((banner) => (
          <GlassBanner
            key={banner.id}
            variant={banner.variant}
            dismissible
            onDismiss={() =>
              setBanners((prev) => prev.filter((b) => b.id !== banner.id))
            }
          >
            {banner.message}
          </GlassBanner>
        ))}

        {banners.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[var(--text-secondary)] mb-4">
              All banners dismissed!
            </p>
            <GlassButton
              onClick={() =>
                setBanners([
                  {
                    id: 1,
                    variant: 'info',
                    message: 'This banner can be dismissed',
                  },
                  {
                    id: 2,
                    variant: 'success',
                    message: 'Operation completed successfully',
                  },
                  {
                    id: 3,
                    variant: 'warning',
                    message: 'Your session will expire soon',
                  },
                ])
              }
            >
              Reset Banners
            </GlassButton>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dismissible banners that can be closed by users',
      },
    },
  },
};

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassBanner variant="info" icon={<Sparkles className="h-5 w-5" />}>
        <p className="font-medium">New Features Released!</p>
        <p className="text-sm mt-1">Discover what\'s new in this version.</p>
      </GlassBanner>

      <GlassBanner variant="success" icon={<Download className="h-5 w-5" />}>
        <p className="font-medium">Download Complete</p>
        <p className="text-sm mt-1">
          Your file has been downloaded successfully.
        </p>
      </GlassBanner>

      <GlassBanner variant="warning" icon={<Zap className="h-5 w-5" />}>
        <p className="font-medium">High Usage Detected</p>
        <p className="text-sm mt-1">You\'re approaching your usage limit.</p>
      </GlassBanner>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banners with custom icons for better visual communication',
      },
    },
  },
};

export const ComplexContent: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassBanner
        variant="info"
        dismissible
        action={
          <GlassButton size="sm" variant="primary">
            Get Started
          </GlassButton>
        }
      >
        <div className="space-y-3">
          <h3 className="font-bold text-lg">Welcome to LiqUIdify!</h3>
          <p className="text-sm">
            Get started with our comprehensive component library:
          </p>
          <ul className="text-sm space-y-1 ml-4">
            <li>• 50+ glassmorphism components</li>
            <li>• Fully accessible and responsive</li>
            <li>• Dark mode support</li>
            <li>• TypeScript ready</li>
          </ul>
        </div>
      </GlassBanner>

      <GlassBanner variant="success">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Payment Successful</p>
            <p className="text-sm mt-1">Transaction ID: #TXN-2024-001234</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">$99.00</p>
            <p className="text-xs">Charged to Visa •••• 1234</p>
          </div>
        </div>
      </GlassBanner>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banners with complex content layouts',
      },
    },
  },
};

export const FixedPosition: Story = {
  render: () => {
    const [showTopBanner, setShowTopBanner] = React.useState(true);
    const [showBottomBanner, setShowBottomBanner] = React.useState(true);

    return (
      <div className="relative h-[400px] overflow-hidden">
        <GlassCard className="h-full p-6">
          <h2 className="text-xl font-bold mb-4">Fixed Position Banners</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            Banners can be positioned at the top or bottom of containers.
          </p>
          <div className="space-y-2">
            <GlassButton
              onClick={() => setShowTopBanner(!showTopBanner)}
              variant="ghost"
            >
              Toggle Top Banner
            </GlassButton>
            <GlassButton
              onClick={() => setShowBottomBanner(!showBottomBanner)}
              variant="ghost"
            >
              Toggle Bottom Banner
            </GlassButton>
          </div>
        </GlassCard>

        {showTopBanner && (
          <div className="absolute top-0 left-0 right-0 p-4">
            <GlassBanner
              variant="info"
              dismissible
              onDismiss={() => setShowTopBanner(false)}
            >
              This banner is fixed to the top
            </GlassBanner>
          </div>
        )}

        {showBottomBanner && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <GlassBanner
              variant="warning"
              dismissible
              onDismiss={() => setShowBottomBanner(false)}
            >
              This banner is fixed to the bottom
            </GlassBanner>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Banners with fixed positioning within containers',
      },
    },
  },
};

export const AnimatedAppearance: Story = {
  render: () => {
    const [banners, setBanners] = React.useState<
      Array<{ id: number; message: string }>
    >([]);
    const nextId = React.useRef(1);

    const addBanner = () => {
      const id = nextId.current++;
      setBanners((prev) => [...prev, { id, message: `Dynamic banner #${id}` }]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      }, 5000);
    };

    return (
      <div className="space-y-4">
        <div className="text-center">
          <GlassButton onClick={addBanner}>Add Animated Banner</GlassButton>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Banners auto-dismiss after 5 seconds
          </p>
        </div>

        <div className="space-y-2">
          {banners.map((banner) => (
            <GlassBanner
              key={banner.id}
              variant="info"
              dismissible
              onDismiss={() =>
                setBanners((prev) => prev.filter((b) => b.id !== banner.id))
              }
            >
              {banner.message}
            </GlassBanner>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated banner appearances with auto-dismiss functionality',
      },
    },
  },
};
