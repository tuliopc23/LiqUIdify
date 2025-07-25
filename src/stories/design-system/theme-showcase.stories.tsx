import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  GlassButton, 
  GlassCard, 
  GlassInput, 
  GlassCheckbox,
  GlassSwitch,
  GlassBadge,
  GlassTooltip,
  GlassProgress,
  GlassSlider
} from '@/components';
import { ThemeToggle } from '@/components/theme-toggle';
import { Mail, Search, Heart, Star, Download, Settings, Check } from 'lucide-react';

const meta = {
  title: 'Design System/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of all components in both light and dark themes with consistent glassmorphism design.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteShowcase: Story = {
  render: () => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
    const [email, setEmail] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [switchOn, setSwitchOn] = React.useState(true);
    const [progress, setProgress] = React.useState(65);
    const [slider, setSlider] = React.useState(50);

    React.useEffect(() => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
      <div className={`min-h-screen transition-all duration-500 ${theme}`}>
        {/* Dynamic Background */}
        <div 
          className="fixed inset-0 transition-all duration-700"
          style={{
            background: theme === 'dark' 
              ? 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0.9) 35%, rgba(30, 41, 59, 0.95) 100%)'
              : 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, rgba(248, 250, 252, 0.95) 35%, rgba(226, 232, 240, 0.98) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="border-b border-white/10 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LiquidUI Theme Showcase
                </h1>
                <ThemeToggle value={theme} onChange={setTheme} />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-6 py-12 space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6">
              <h2 className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Beautiful Glass Design
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the elegance of glassmorphism with smooth transitions between light and dark themes.
              </p>
            </section>

            {/* Buttons Section */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Buttons</h3>
              <GlassCard className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">Default Variants</h4>
                    <GlassButton>Default</GlassButton>
                    <GlassButton variant="primary">Primary</GlassButton>
                    <GlassButton variant="ghost">Ghost</GlassButton>
                    <GlassButton variant="danger">Danger</GlassButton>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">With Icons</h4>
                    <GlassButton>
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </GlassButton>
                    <GlassButton variant="primary">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </GlassButton>
                    <GlassButton variant="ghost">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </GlassButton>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">States</h4>
                    <GlassButton disabled>Disabled</GlassButton>
                    <GlassButton loading>Loading</GlassButton>
                    <GlassButton fullWidth>Full Width</GlassButton>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-600 dark:text-gray-400">Sizes</h4>
                    <GlassButton size="sm">Small</GlassButton>
                    <GlassButton size="md">Medium</GlassButton>
                    <GlassButton size="lg">Large</GlassButton>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Form Elements */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Form Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Input</label>
                    <GlassInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="h-4 w-4" />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Search Input</label>
                    <GlassInput
                      type="search"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      icon={<Search className="h-4 w-4" />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Disabled Input</label>
                    <GlassInput
                      disabled
                      placeholder="This input is disabled"
                    />
                  </div>
                </GlassCard>

                <GlassCard className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Enable notifications</label>
                    <GlassSwitch
                      checked={switchOn}
                      onChange={setSwitchOn}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <GlassCheckbox
                      checked={checked}
                      onChange={setChecked}
                    />
                    <label className="text-sm">I agree to the terms</label>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium mb-2">Progress ({progress}%)</label>
                    <GlassProgress value={progress} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium mb-2">Volume ({slider})</label>
                    <GlassSlider
                      value={slider}
                      onChange={setSlider}
                      min={0}
                      max={100}
                    />
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* Feedback Components */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Feedback & Status</h3>
              <GlassCard className="p-8">
                <div className="flex flex-wrap gap-4 items-center">
                  <GlassBadge>Default</GlassBadge>
                  <GlassBadge variant="primary">Primary</GlassBadge>
                  <GlassBadge variant="success">
                    <Check className="mr-1 h-3 w-3" />
                    Success
                  </GlassBadge>
                  <GlassBadge variant="warning">Warning</GlassBadge>
                  <GlassBadge variant="danger">Danger</GlassBadge>
                  
                  <div className="ml-auto flex gap-4">
                    <GlassTooltip content="Add to favorites">
                      <GlassButton size="sm" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </GlassButton>
                    </GlassTooltip>
                    <GlassTooltip content="Rate this item">
                      <GlassButton size="sm" variant="ghost">
                        <Star className="h-4 w-4" />
                      </GlassButton>
                    </GlassTooltip>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Cards Grid */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Card Layouts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard hoverable className="p-6 space-y-4">
                  <h4 className="text-lg font-semibold">Hoverable Card</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This card has a subtle hover effect with enhanced glass morphism on interaction.
                  </p>
                  <GlassButton size="sm" fullWidth>
                    Learn More
                  </GlassButton>
                </GlassCard>

                <GlassCard variant="secondary" className="p-6 space-y-4">
                  <h4 className="text-lg font-semibold">Secondary Variant</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Different glass opacity and blur for visual hierarchy.
                  </p>
                  <GlassButton size="sm" variant="ghost" fullWidth>
                    View Details
                  </GlassButton>
                </GlassCard>

                <GlassCard noPadding className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div className="p-6 space-y-4">
                    <h4 className="text-lg font-semibold">Media Card</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Card with media content and no default padding.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* Animation Demo */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Microinteractions</h3>
              <GlassCard className="p-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  All components feature smooth animations and microinteractions. Try hovering, clicking, and focusing on different elements.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Ripple', 'Scale', 'Glow', 'Magnetic'].map((effect) => (
                    <GlassButton
                      key={effect}
                      variant="ghost"
                      className="h-24"
                    >
                      {effect} Effect
                    </GlassButton>
                  ))}
                </div>
              </GlassCard>
            </section>
          </main>
        </div>
      </div>
    );
  },
};

// Light Theme Only
export const LightTheme: Story = {
  render: () => (
    <div className="light p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold mb-8">Light Theme Components</h2>
        <ComponentGrid />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light' },
  },
};

// Dark Theme Only
export const DarkTheme: Story = {
  render: () => (
    <div className="dark p-8 min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Dark Theme Components</h2>
        <ComponentGrid />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Helper component for consistent component display
function ComponentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Button Variants</h3>
        <div className="space-y-3">
          <GlassButton fullWidth>Default Button</GlassButton>
          <GlassButton variant="primary" fullWidth>Primary Button</GlassButton>
          <GlassButton variant="ghost" fullWidth>Ghost Button</GlassButton>
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Form Controls</h3>
        <GlassInput placeholder="Enter text..." />
        <div className="flex items-center gap-4">
          <GlassCheckbox defaultChecked />
          <span className="text-sm">Checkbox</span>
          <GlassSwitch defaultChecked />
          <span className="text-sm">Switch</span>
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <GlassBadge>Default</GlassBadge>
          <GlassBadge variant="primary">Primary</GlassBadge>
          <GlassBadge variant="success">Success</GlassBadge>
          <GlassBadge variant="warning">Warning</GlassBadge>
          <GlassBadge variant="danger">Danger</GlassBadge>
        </div>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Progress Indicators</h3>
        <GlassProgress value={33} />
        <GlassProgress value={66} />
        <GlassProgress value={100} />
      </GlassCard>
    </div>
  );
}