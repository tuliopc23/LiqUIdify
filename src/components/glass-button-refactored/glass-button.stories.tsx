import type { Meta, StoryObj } from '@storybook/react';
import { 
  Mail, 
  ChevronRight, 
  Download, 
  Heart, 
  Share2, 
  Settings,
  Send,
  Save,
  Trash2,
  Plus,
  Edit,
  Check,
  X,
  AlertCircle,
  Info,
  ShoppingCart,
  ArrowRight,
  Upload,
  RefreshCw,
  Copy,
  ExternalLink,
  LogOut,
  Home,
  User,
  Bell,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Video,
  Mic,
  MicOff,
  Camera,
  Image,
  File,
  Folder,
  FolderOpen,
  Archive,
  Bookmark,
  Star,
  Award,
  Gift,
  Zap,
  Battery,
  Wifi,
  Cloud,
  Database,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Key,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  Activity,
  Globe,
  Compass,
  Map,
  Navigation,
  Anchor
} from 'lucide-react';
import React from 'react';
import { GlassButton } from './glass-button';

const meta = {
  title: 'Components/Forms/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A premium button component with advanced glassmorphism effects, fluid animations, and comprehensive accessibility features.

## Features

- **Multiple Variants**: Primary, secondary, tertiary, ghost, destructive, and apple-style designs
- **Flexible Sizing**: Extra small to extra large sizes with responsive scaling
- **Glass Effects**: Customizable blur, backdrop, and intensity settings
- **Advanced Animations**: Magnetic hover, ripple effects, and smooth state transitions
- **Loading States**: Built-in loading spinner with customizable loading text
- **Icon Support**: Left and right icon slots with automatic spacing
- **Accessibility**: Full keyboard navigation, ARIA attributes, and focus management
- **Theme Support**: Automatic adaptation to light and dark themes
- **Performance**: Optimized with React.memo and efficient re-renders

## Usage

\`\`\`tsx
import { GlassButton } from '@/components/glass-button';

// Basic usage
<GlassButton variant="primary">
  Click me
</GlassButton>

// With icons
<GlassButton variant="secondary" leftIcon={<Mail />}>
  Send Email
</GlassButton>

// Loading state
<GlassButton loading loadingText="Processing...">
  Submit
</GlassButton>

// Custom glass effect
<GlassButton
  glassEffect={{
    intensity: 'strong',
    blur: true,
    backdrop: true
  }}
>
  Premium Button
</GlassButton>
\`\`\`

## Keyboard Shortcuts

- **Tab**: Navigate between buttons
- **Space/Enter**: Activate button
- **Escape**: Cancel action (in modals/dialogs)

## Accessibility

The button component follows WAI-ARIA guidelines:
- Proper focus indicators
- Keyboard navigation support
- Screen reader announcements
- Disabled state handling
- Loading state announcements
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Content
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Content',
      },
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Content',
      },
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Content',
      },
    },
    
    // Appearance
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'apple'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'primary | secondary | tertiary | ghost | destructive | apple' },
        defaultValue: { summary: 'primary' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
      table: {
        type: { summary: 'xs | sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
        category: 'Appearance',
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes button take full width of container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Optimizes button for icon-only display',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Appearance',
      },
    },
    
    // State
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state with spinner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    loadingText: {
      control: 'text',
      description: 'Text to display when loading',
      table: {
        type: { summary: 'string' },
        category: 'State',
      },
    },
    
    // Glass Effects
    glassEffect: {
      control: 'object',
      description: 'Glass effect configuration',
      table: {
        type: { summary: 'GlassEffect' },
        defaultValue: { summary: '{ intensity: "medium", blur: true, backdrop: true }' },
        category: 'Glass Effects',
      },
    },
    
    // Animation
    animation: {
      control: 'select',
      options: ['none', 'subtle', 'normal', 'energetic'],
      description: 'Animation intensity',
      table: {
        type: { summary: 'none | subtle | normal | energetic' },
        defaultValue: { summary: 'normal' },
        category: 'Animation',
      },
    },
    disableAnimations: {
      control: 'boolean',
      description: 'Disable all animations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Animation',
      },
    },
    magnetic: {
      control: 'boolean',
      description: 'Enable magnetic hover effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Animation',
      },
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect on click',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Animation',
      },
    },
    
    // HTML Button Props
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' },
        category: 'HTML Props',
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Renders as child component (useful for links)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'HTML Props',
      },
    },
    
    // Events
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
        category: 'Events',
      },
    },
    onMouseEnter: {
      action: 'mouse enter',
      table: {
        category: 'Events',
      },
    },
    onMouseLeave: {
      action: 'mouse leave',
      table: {
        category: 'Events',
      },
    },
    onFocus: {
      action: 'focus',
      table: {
        category: 'Events',
      },
    },
    onBlur: {
      action: 'blur',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconOnly: false,
    disableAnimations: false,
    magnetic: false,
    ripple: true,
    type: 'button',
    asChild: false,
  },
} satisfies Meta<typeof GlassButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - Interactive playground
export const Playground: Story = {
  args: {
    children: 'Click me',
  },
};

// Variants showcase
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">All Variants</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton variant="primary">Primary</GlassButton>
          <GlassButton variant="secondary">Secondary</GlassButton>
          <GlassButton variant="tertiary">Tertiary</GlassButton>
          <GlassButton variant="ghost">Ghost</GlassButton>
          <GlassButton variant="destructive">Destructive</GlassButton>
          <GlassButton variant="apple">Apple Style</GlassButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">With Icons</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton variant="primary" leftIcon={<Send className="h-4 w-4" />}>
            Send
          </GlassButton>
          <GlassButton variant="secondary" leftIcon={<Save className="h-4 w-4" />}>
            Save Draft
          </GlassButton>
          <GlassButton variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete
          </GlassButton>
          <GlassButton variant="ghost" rightIcon={<ChevronRight className="h-4 w-4" />}>
            Next
          </GlassButton>
        </div>
      </div>
    </div>
  ),
};

// Sizes showcase
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">All Sizes</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton size="xs">Extra Small</GlassButton>
          <GlassButton size="sm">Small</GlassButton>
          <GlassButton size="md">Medium</GlassButton>
          <GlassButton size="lg">Large</GlassButton>
          <GlassButton size="xl">Extra Large</GlassButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Sizes with Icons</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton size="xs" leftIcon={<Plus className="h-3 w-3" />}>Add</GlassButton>
          <GlassButton size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add</GlassButton>
          <GlassButton size="md" leftIcon={<Plus className="h-4 w-4" />}>Add</GlassButton>
          <GlassButton size="lg" leftIcon={<Plus className="h-5 w-5" />}>Add</GlassButton>
          <GlassButton size="xl" leftIcon={<Plus className="h-6 w-6" />}>Add</GlassButton>
        </div>
      </div>
    </div>
  ),
};

// States showcase
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['primary', 'secondary', 'tertiary', 'ghost', 'destructive'] as const).map((variant) => (
        <div key={variant} className="space-y-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{variant} States</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <GlassButton variant={variant}>Normal</GlassButton>
            <GlassButton variant={variant} disabled>Disabled</GlassButton>
            <GlassButton variant={variant} loading>Loading</GlassButton>
            <GlassButton variant={variant} loading loadingText="Processing...">
              With Text
            </GlassButton>
          </div>
        </div>
      ))}
    </div>
  ),
};

// Glass effects showcase
export const GlassEffects: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Intensity Levels</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton glassEffect={{ intensity: 'weak', blur: true, backdrop: true }}>
            Weak Glass
          </GlassButton>
          <GlassButton glassEffect={{ intensity: 'medium', blur: true, backdrop: true }}>
            Medium Glass
          </GlassButton>
          <GlassButton glassEffect={{ intensity: 'strong', blur: true, backdrop: true }}>
            Strong Glass
          </GlassButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Effect Combinations</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton glassEffect={{ intensity: 'medium', blur: false, backdrop: false }}>
            No Effects
          </GlassButton>
          <GlassButton glassEffect={{ intensity: 'medium', blur: true, backdrop: false }}>
            Blur Only
          </GlassButton>
          <GlassButton glassEffect={{ intensity: 'medium', blur: false, backdrop: true }}>
            Backdrop Only
          </GlassButton>
          <GlassButton glassEffect={{ intensity: 'medium', blur: true, backdrop: true }}>
            All Effects
          </GlassButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { 
      default: 'liquid-gradient',
    },
  },
};

// Animation effects
export const AnimationEffects: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Animation Levels</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton animation="none">No Animation</GlassButton>
          <GlassButton animation="subtle">Subtle</GlassButton>
          <GlassButton animation="normal">Normal</GlassButton>
          <GlassButton animation="energetic">Energetic</GlassButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Special Effects</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton magnetic>Magnetic Hover</GlassButton>
          <GlassButton ripple={false}>No Ripple</GlassButton>
          <GlassButton magnetic ripple>All Effects</GlassButton>
          <GlassButton disableAnimations>Disabled Animations</GlassButton>
        </div>
      </div>
    </div>
  ),
};

// Icon buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Icon Only Buttons</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton size="xs" iconOnly aria-label="Like">
            <Heart className="h-3.5 w-3.5" />
          </GlassButton>
          <GlassButton size="sm" iconOnly aria-label="Settings">
            <Settings className="h-4 w-4" />
          </GlassButton>
          <GlassButton size="md" iconOnly aria-label="Share">
            <Share2 className="h-5 w-5" />
          </GlassButton>
          <GlassButton size="lg" iconOnly variant="destructive" aria-label="Delete">
            <Trash2 className="h-6 w-6" />
          </GlassButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Social Media Icons</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton variant="ghost" iconOnly aria-label="Home">
            <Home className="h-5 w-5" />
          </GlassButton>
          <GlassButton variant="ghost" iconOnly aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </GlassButton>
          <GlassButton variant="ghost" iconOnly aria-label="Messages">
            <MessageCircle className="h-5 w-5" />
          </GlassButton>
          <GlassButton variant="ghost" iconOnly aria-label="Profile">
            <User className="h-5 w-5" />
          </GlassButton>
        </div>
      </div>
    </div>
  ),
};

// Full width examples
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <GlassButton fullWidth variant="primary">
        Sign In
      </GlassButton>
      <GlassButton fullWidth variant="secondary" leftIcon={<User className="h-4 w-4" />}>
        Continue with Email
      </GlassButton>
      <GlassButton fullWidth variant="apple" leftIcon={<Globe className="h-4 w-4" />}>
        Continue with Apple
      </GlassButton>
      <div className="grid grid-cols-2 gap-4">
        <GlassButton variant="ghost">Cancel</GlassButton>
        <GlassButton variant="primary">Confirm</GlassButton>
      </div>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* E-commerce */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">E-commerce</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton variant="primary" leftIcon={<ShoppingCart className="h-4 w-4" />}>
            Add to Cart
          </GlassButton>
          <GlassButton variant="apple">Buy Now</GlassButton>
          <GlassButton variant="ghost" leftIcon={<Heart className="h-4 w-4" />}>
            Save for Later
          </GlassButton>
        </div>
      </div>
      
      {/* Forms */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Form Actions</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton variant="primary" type="submit">Submit</GlassButton>
          <GlassButton variant="secondary" leftIcon={<Save className="h-4 w-4" />}>
            Save Draft
          </GlassButton>
          <GlassButton variant="ghost">Cancel</GlassButton>
          <GlassButton variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete
          </GlassButton>
        </div>
      </div>
      
      {/* Media Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Media Controls</h3>
        <div className="flex items-center gap-2">
          <GlassButton size="sm" iconOnly variant="ghost" aria-label="Previous">
            <ChevronRight className="h-4 w-4 rotate-180" />
          </GlassButton>
          <GlassButton size="sm" iconOnly aria-label="Play">
            <ArrowRight className="h-4 w-4" />
          </GlassButton>
          <GlassButton size="sm" iconOnly variant="ghost" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </GlassButton>
          <div className="ml-4 flex items-center gap-2">
            <GlassButton size="sm" iconOnly variant="ghost" aria-label="Mute">
              <Mic className="h-4 w-4" />
            </GlassButton>
            <GlassButton size="sm" iconOnly variant="ghost" aria-label="Camera">
              <Camera className="h-4 w-4" />
            </GlassButton>
            <GlassButton size="sm" iconOnly variant="ghost" aria-label="Share Screen">
              <Share2 className="h-4 w-4" />
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const handleClick = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCount(c => c + 1);
      setLoading(false);
    };

    const handleCopy = async () => {
      setCopied(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCopied(false);
    };

    return (
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">Interactive Counter</h3>
          <p className="text-4xl font-mono">{count}</p>
          <GlassButton 
            onClick={handleClick} 
            loading={loading}
            loadingText="Incrementing..."
            variant="primary"
            size="lg"
            leftIcon={loading ? undefined : <Plus className="h-5 w-5" />}
          >
            {loading ? undefined : 'Increment'}
          </GlassButton>
        </div>
        
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Copy Example</h3>
          <GlassButton
            onClick={handleCopy}
            variant={copied ? 'secondary' : 'ghost'}
            leftIcon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </GlassButton>
        </div>
      </div>
    );
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 p-6 rounded-xl bg-white/80 dark:bg-gray-900/80">
          <h3 className="text-lg font-semibold">Light Theme</h3>
          <div className="space-y-3">
            <GlassButton variant="primary" fullWidth>Primary Action</GlassButton>
            <GlassButton variant="secondary" fullWidth>Secondary Action</GlassButton>
            <GlassButton variant="tertiary" fullWidth>Tertiary Action</GlassButton>
            <GlassButton variant="ghost" fullWidth>Ghost Action</GlassButton>
            <GlassButton variant="destructive" fullWidth>Destructive Action</GlassButton>
            <GlassButton variant="apple" fullWidth>Apple Style</GlassButton>
          </div>
        </div>
        
        <div className="space-y-4 p-6 rounded-xl bg-gray-900/80 dark:bg-white/80">
          <h3 className="text-lg font-semibold text-white dark:text-gray-900">Dark Theme</h3>
          <div className="space-y-3">
            <GlassButton variant="primary" fullWidth>Primary Action</GlassButton>
            <GlassButton variant="secondary" fullWidth>Secondary Action</GlassButton>
            <GlassButton variant="tertiary" fullWidth>Tertiary Action</GlassButton>
            <GlassButton variant="ghost" fullWidth>Ghost Action</GlassButton>
            <GlassButton variant="destructive" fullWidth>Destructive Action</GlassButton>
            <GlassButton variant="apple" fullWidth>Apple Style</GlassButton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { 
      default: 'liquid-gradient',
    },
  },
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Keyboard Navigation</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Try navigating with Tab and activating buttons with Space or Enter
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <GlassButton>First Button</GlassButton>
          <GlassButton variant="primary">Second Button</GlassButton>
          <GlassButton variant="ghost">Third Button</GlassButton>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Screen Reader Support</h3>
        <div className="space-y-3">
          <GlassButton aria-label="Save document to cloud" leftIcon={<Save className="h-4 w-4" />}>
            Save
          </GlassButton>
          <GlassButton aria-describedby="delete-warning" variant="destructive">
            Delete Account
          </GlassButton>
          <p id="delete-warning" className="text-sm text-red-600 dark:text-red-400">
            Warning: This action cannot be undone and will permanently delete your account.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Focus Management</h3>
        <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Focus is trapped within this container. Tab through the buttons.
          </p>
          <div className="flex items-center gap-4">
            <GlassButton variant="ghost">Cancel</GlassButton>
            <GlassButton variant="primary">Confirm</GlassButton>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Loading Announcements</h3>
        <div className="space-y-3">
          <GlassButton loading loadingText="Submitting form..." aria-live="polite">
            Submit
          </GlassButton>
          <GlassButton 
            loading 
            variant="primary"
            aria-label="Processing payment"
            aria-busy="true"
          >
            Processing...
          </GlassButton>
        </div>
      </div>
    </div>
  ),
};