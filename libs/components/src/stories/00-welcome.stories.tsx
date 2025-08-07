import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';
import { GlassButton } from '@/components/glass-button-refactored/glass-button';
import { GlassBadge } from '@/components/glass-badge/glass-badge';
import { 
  Sparkles, 
  Code, 
  Palette, 
  Package, 
  Zap, 
  Shield,
  Heart,
  Github,
  Twitter,
  Globe
} from 'lucide-react';

const meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null, // Disable auto-generated docs page
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Introduction: Story = {
  render: () => (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="relative z-10 px-8 py-20 text-center text-white">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-white/20 rounded-full" />
              <Sparkles className="relative w-24 h-24" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4">
            LiqU<span className="text-blue-300">I</span>dify
          </h1>
          <p className="text-2xl mb-2 opacity-90">
            Premium Glassmorphism Component Library
          </p>
          <p className="text-lg opacity-75 max-w-2xl mx-auto">
            Production-ready React components with liquid glass effects, 
            built for modern applications that demand both beauty and performance.
          </p>
          
          <div className="flex justify-center gap-3 mt-8">
            <GlassBadge variant="primary">v1.3.0</GlassBadge>
            <GlassBadge variant="success">40+ Components</GlassBadge>
            <GlassBadge variant="info">TypeScript</GlassBadge>
            <GlassBadge variant="warning">WCAG AA</GlassBadge>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Palette className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold">Glassmorphism Design</h3>
            </div>
            <p className="text-sm opacity-75">
              Sophisticated glass effects with customizable blur, transparency, 
              and border properties for a premium look.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <Package className="w-6 h-6 text-green-300" />
              </div>
              <h3 className="text-xl font-semibold">Production Ready</h3>
            </div>
            <p className="text-sm opacity-75">
              Battle-tested components used in real applications, with comprehensive 
              testing and documentation.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Code className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold">TypeScript First</h3>
            </div>
            <p className="text-sm opacity-75">
              Full TypeScript support with detailed type definitions, 
              intellisense, and type safety.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-yellow-500/20">
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="text-xl font-semibold">Performance Optimized</h3>
            </div>
            <p className="text-sm opacity-75">
              GPU-accelerated effects, lazy loading, and optimized bundle 
              sizes for fast, smooth experiences.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Shield className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-xl font-semibold">Accessibility Built-in</h3>
            </div>
            <p className="text-sm opacity-75">
              WCAG AA compliant with full keyboard navigation, screen reader 
              support, and ARIA attributes.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-pink-500/20">
                <Heart className="w-6 h-6 text-pink-300" />
              </div>
              <h3 className="text-xl font-semibold">Developer Experience</h3>
            </div>
            <p className="text-sm opacity-75">
              Intuitive API, comprehensive docs, and consistent patterns 
              make development a pleasure.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Quick Start */}
      <div className="px-8 py-12 max-w-4xl mx-auto">
        <GlassCard className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Quick Start</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">1. Install the package</h3>
              <div className="bg-black/20 rounded-lg p-4 font-mono text-sm">
                <code className="text-green-300">npm install @liquidify/components</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">2. Import styles</h3>
              <div className="bg-black/20 rounded-lg p-4 font-mono text-sm">
                <code className="text-blue-300">import '@liquidify/components/styles';</code>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">3. Use components</h3>
              <div className="bg-black/20 rounded-lg p-4 font-mono text-sm">
                <pre className="text-purple-300">{`import { GlassButton } from '@liquidify/components';

function App() {
  return (
    <GlassButton variant="primary">
      Click me!
    </GlassButton>
  );
}`}</pre>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <GlassButton variant="primary" size="lg">
              View Components →
            </GlassButton>
            <GlassButton variant="ghost" size="lg">
              Read Documentation
            </GlassButton>
          </div>
        </GlassCard>
      </div>

      {/* Navigation Guide */}
      <div className="px-8 py-12 max-w-4xl mx-auto">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold mb-6">Explore the Library</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-blue-400">📐</div>
              <div>
                <h3 className="font-semibold mb-1">Design System</h3>
                <p className="text-sm opacity-75">
                  Explore our glassmorphism design principles, tokens, and guidelines
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-green-400">🧩</div>
              <div>
                <h3 className="font-semibold mb-1">Core Components</h3>
                <p className="text-sm opacity-75">
                  Essential UI components like buttons, cards, inputs, and modals
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-purple-400">📝</div>
              <div>
                <h3 className="font-semibold mb-1">Form Components</h3>
                <p className="text-sm opacity-75">
                  Complete form solutions with validation and accessibility
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-yellow-400">🎨</div>
              <div>
                <h3 className="font-semibold mb-1">Layout Components</h3>
                <p className="text-sm opacity-75">
                  Structure your application with accordions, tabs, and drawers
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-pink-400">💬</div>
              <div>
                <h3 className="font-semibold mb-1">Feedback Components</h3>
                <p className="text-sm opacity-75">
                  Alerts, toasts, notifications, and loading states
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Footer */}
      <div className="px-8 py-12 text-center text-white/60">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/liquidify" className="hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/liquidify" className="hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://liquidify.dev" className="hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </a>
        </div>
        <p className="text-sm">
          © 2024 LiqUIdify. MIT License. Made with ❤️ by the community.
        </p>
      </div>
    </div>
  ),
};
