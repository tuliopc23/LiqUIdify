import Link from "next/link";

const features = [
  {
    title: "30+ Glass Variants",
    description: "From basic frosted glass to holographic and iridescent effects",
    icon: "🎨"
  },
  {
    title: "WebGL Shaders",
    description: "GPU-accelerated visual effects for stunning performance",
    icon: "⚡"
  },
  {
    title: "Physics Engine",
    description: "Spring dynamics, fluid simulation, and particle systems",
    icon: "🌊"
  },
  {
    title: "Haptic Feedback",
    description: "Vibration patterns with audio and visual coordination",
    icon: "📳"
  },
  {
    title: "Gesture Recognition",
    description: "Multi-touch support with custom gesture creation",
    icon: "✋"
  },
  {
    title: "Accessibility First",
    description: "WCAG compliant with screen reader support",
    icon: "♿"
  }
];

const quickStartCode = `npm install glass-ui

import { GlassProvider, GlassButton } from 'glass-ui';
import 'glass-ui/dist/glass.css';

function App() {
  return (
    <GlassProvider>
      <GlassButton variant="primary">
        Hello Glass UI
      </GlassButton>
    </GlassProvider>
  );
}`;

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Glass UI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced glassmorphism React component library with physics-based animations,
            WebGL shaders, and haptic feedback
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/guides/installation"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg shadow-blue-500/25"
          >
            Get Started
          </Link>
          <Link
            href="/components"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
          >
            Browse Components
          </Link>
          <a
            href="/storybook"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 rounded-xl font-semibold hover:bg-gray-700/50 transition-colors"
          >
            View Storybook ↗
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Glass UI?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built for modern web applications with cutting-edge visual effects and performance optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
          <p className="text-gray-400">Get up and running in seconds</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 overflow-x-auto">
          <pre className="text-sm text-gray-300">
            <code>{quickStartCode}</code>
          </pre>
        </div>

        <div className="text-center">
          <Link
            href="/guides/installation"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
          >
            Read full installation guide →
          </Link>
        </div>
      </section>

      {/* Component Categories */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Component Library</h2>
          <p className="text-gray-400">Comprehensive collection of glassmorphism components</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "Form Components", count: "8 components", href: "/components/form", description: "Buttons, inputs, selects, and form controls" },
            { name: "Layout Components", count: "6 components", href: "/components/layout", description: "Cards, modals, tables, and containers" },
            { name: "Feedback Components", count: "7 components", href: "/components/feedback", description: "Progress bars, loading states, and notifications" },
            { name: "Navigation Components", count: "5 components", href: "/components/navigation", description: "Dropdowns, avatars, search, and menus" }
          ].map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-colors block"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                  {category.count}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
