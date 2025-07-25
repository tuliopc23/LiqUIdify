import type { Meta, StoryObj } from '@storybook/react';
import {
  Check,
  Download,
  Heart,
  Mail,
  Search,
  Settings,
  Star,
} from 'lucide-react';
import React from 'react';
import {
  GlassBadge,
  GlassButton,
  GlassCard,
  GlassCheckbox,
  GlassInput,
  GlassProgress,
  GlassSlider,
  GlassSwitch,
  GlassTooltip,
} from '@/components';
import { ThemeToggle } from '@/components/theme-toggle';

const meta = {
  title: 'Design System/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Comprehensive showcase of all components in both light and dark themes with consistent glassmorphism design.',
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
    const [progress, _setProgress] = React.useState(65);
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
            background:
              theme === 'dark'
                ? 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0.9) 35%, rgba(30, 41, 59, 0.95) 100%)'
                : 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, rgba(248, 250, 252, 0.95) 35%, rgba(226, 232, 240, 0.98) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="border-white/10 border-b backdrop-blur-xl">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-2xl text-transparent">
                  LiquidUI Theme Showcase
                </h1>
                <ThemeToggle value={theme} onChange={setTheme} />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto space-y-16 px-6 py-12">
            {/* Hero Section */}
            <section className="space-y-6 text-center">
              <h2 className="font-bold text-5xl">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Beautiful Glass Design
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 text-xl dark:text-gray-300">
                Experience the elegance of glassmorphism with smooth transitions
                between light and dark themes.
              </p>
            </section>

            {/* Buttons Section */}
            <section className="space-y-6">
              <h3 className="mb-6 font-semibold text-2xl">Buttons</h3>
              <GlassCard className="p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-600 text-sm dark:text-gray-400">
                      Default Variants
                    </h4>
                    <GlassButton>Default</GlassButton>
                    <GlassButton variant="primary">Primary</GlassButton>
                    <GlassButton variant="ghost">Ghost</GlassButton>
                    <GlassButton variant="danger">Danger</GlassButton>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-600 text-sm dark:text-gray-400">
                      With Icons
                    </h4>
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
                    <h4 className="font-medium text-gray-600 text-sm dark:text-gray-400">
                      States
                    </h4>
                    <GlassButton disabled>Disabled</GlassButton>
                    <GlassButton loading>Loading</GlassButton>
                    <GlassButton fullWidth>Full Width</GlassButton>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-600 text-sm dark:text-gray-400">
                      Sizes
                    </h4>
                    <GlassButton size="sm">Small</GlassButton>
                    <GlassButton size="md">Medium</GlassButton>
                    <GlassButton size="lg">Large</GlassButton>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Form Elements */}
            <section className="space-y-6">
              <h3 className="mb-6 font-semibold text-2xl">Form Elements</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <GlassCard className="space-y-6 p-6">
                  <div>
                    <label className="mb-2 block font-medium text-sm">
                      Email Input
                    </label>
                    <GlassInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail className="h-4 w-4" />}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-sm">
                      Search Input
                    </label>
                    <GlassInput
                      type="search"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      icon={<Search className="h-4 w-4" />}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-sm">
                      Disabled Input
                    </label>
                    <GlassInput disabled placeholder="This input is disabled" />
                  </div>
                </GlassCard>

                <GlassCard className="space-y-6 p-6">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-sm">
                      Enable notifications
                    </label>
                    <GlassSwitch checked={switchOn} onChange={setSwitchOn} />
                  </div>
                  <div className="flex items-center gap-3">
                    <GlassCheckbox checked={checked} onChange={setChecked} />
                    <label className="text-sm">I agree to the terms</label>
                  </div>
                  <div className="space-y-2">
                    <label className="mb-2 block font-medium text-sm">
                      Progress ({progress}%)
                    </label>
                    <GlassProgress value={progress} />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-2 block font-medium text-sm">
                      Volume ({slider})
                    </label>
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
              <h3 className="mb-6 font-semibold text-2xl">Feedback & Status</h3>
              <GlassCard className="p-8">
                <div className="flex flex-wrap items-center gap-4">
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
              <h3 className="mb-6 font-semibold text-2xl">Card Layouts</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <GlassCard hoverable className="space-y-4 p-6">
                  <h4 className="font-semibold text-lg">Hoverable Card</h4>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    This card has a subtle hover effect with enhanced glass
                    morphism on interaction.
                  </p>
                  <GlassButton size="sm" fullWidth>
                    Learn More
                  </GlassButton>
                </GlassCard>

                <GlassCard variant="secondary" className="space-y-4 p-6">
                  <h4 className="font-semibold text-lg">Secondary Variant</h4>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    Different glass opacity and blur for visual hierarchy.
                  </p>
                  <GlassButton size="sm" variant="ghost" fullWidth>
                    View Details
                  </GlassButton>
                </GlassCard>

                <GlassCard noPadding className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div className="space-y-4 p-6">
                    <h4 className="font-semibold text-lg">Media Card</h4>
                    <p className="text-gray-600 text-sm dark:text-gray-400">
                      Card with media content and no default padding.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* Animation Demo */}
            <section className="space-y-6">
              <h3 className="mb-6 font-semibold text-2xl">Microinteractions</h3>
              <GlassCard className="p-8">
                <p className="mb-6 text-gray-600 text-sm dark:text-gray-400">
                  All components feature smooth animations and
                  microinteractions. Try hovering, clicking, and focusing on
                  different elements.
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {['Ripple', 'Scale', 'Glow', 'Magnetic'].map((effect) => (
                    <GlassButton key={effect} variant="ghost" className="h-24">
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
    <div className="light min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h2 className="mb-8 font-bold text-3xl">Light Theme Components</h2>
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
    <div className="dark min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h2 className="mb-8 font-bold text-3xl text-white">
          Dark Theme Components
        </h2>
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <GlassCard className="space-y-4 p-6">
        <h3 className="font-semibold text-lg">Button Variants</h3>
        <div className="space-y-3">
          <GlassButton fullWidth>Default Button</GlassButton>
          <GlassButton variant="primary" fullWidth>
            Primary Button
          </GlassButton>
          <GlassButton variant="ghost" fullWidth>
            Ghost Button
          </GlassButton>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-6">
        <h3 className="font-semibold text-lg">Form Controls</h3>
        <GlassInput placeholder="Enter text..." />
        <div className="flex items-center gap-4">
          <GlassCheckbox defaultChecked />
          <span className="text-sm">Checkbox</span>
          <GlassSwitch defaultChecked />
          <span className="text-sm">Switch</span>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-6">
        <h3 className="font-semibold text-lg">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <GlassBadge>Default</GlassBadge>
          <GlassBadge variant="primary">Primary</GlassBadge>
          <GlassBadge variant="success">Success</GlassBadge>
          <GlassBadge variant="warning">Warning</GlassBadge>
          <GlassBadge variant="danger">Danger</GlassBadge>
        </div>
      </GlassCard>

      <GlassCard className="space-y-4 p-6">
        <h3 className="font-semibold text-lg">Progress Indicators</h3>
        <GlassProgress value={33} />
        <GlassProgress value={66} />
        <GlassProgress value={100} />
      </GlassCard>
    </div>
  );
}
