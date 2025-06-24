export default function InstallationPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Installation & Setup</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                    Complete guide to installing and setting up Glass UI in your project with
                    React, Next.js, or vanilla JavaScript.
                </p>
            </div>

            {/* Prerequisites */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Prerequisites</h2>
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 text-blue-300">Before you start:</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Node.js 16.0 or later</li>
                        <li>• React 18.0 or later (for React projects)</li>
                        <li>• Package manager: npm, yarn, or pnpm</li>
                        <li>• Basic knowledge of React and CSS</li>
                    </ul>
                </div>
            </section>

            {/* Installation */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Installation</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">1. Install the package</h3>
                    <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                            <code>{`# npm
npm install glass-ui

# yarn
yarn add glass-ui

# pnpm
pnpm add glass-ui`}</code>
                        </pre>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">2. Install peer dependencies</h3>
                    <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                            <code>{`# Install Tailwind CSS (required)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional dependencies for advanced features
npm install framer-motion @radix-ui/react-slot`}</code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Configuration */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Configuration</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tailwind CSS Setup</h3>
                        <p className="text-gray-300 mb-4">Configure Tailwind CSS to work with Glass UI components:</p>

                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <div className="text-xs text-gray-400 mb-2">tailwind.config.js</div>
                            <pre className="text-sm text-gray-300">
                                <code>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/glass-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: {
            primary: 'rgba(255, 255, 255, 0.25)',
            secondary: 'rgba(255, 255, 255, 0.18)',
            elevated: 'rgba(255, 255, 255, 0.35)',
          },
          dark: {
            primary: 'rgba(0, 0, 0, 0.25)',
            secondary: 'rgba(0, 0, 0, 0.18)',
            elevated: 'rgba(0, 0, 0, 0.35)',
          },
        },
      },
      backdropBlur: {
        'glass': '12px',
        'glass-heavy': '16px',
        'glass-ultra': '24px',
      },
      animation: {
        'glass-magnetic': 'glass-magnetic 0.3s ease-out',
        'glass-float': 'glass-float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@glass-ui/tailwind-plugin"),
  ],
}`}</code>
                            </pre>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">CSS Imports</h3>
                        <p className="text-gray-300 mb-4">Add Glass UI styles to your global CSS file:</p>

                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <div className="text-xs text-gray-400 mb-2">globals.css</div>
                            <pre className="text-sm text-gray-300">
                                <code>{`@tailwind base;
@tailwind components;
@tailwind utilities;

/* Glass UI Core Styles */
@import 'glass-ui/dist/glass.css';

/* Glass UI Variables */
:root {
  --glass-primary: rgba(255, 255, 255, 0.25);
  --glass-secondary: rgba(255, 255, 255, 0.18);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-bg: rgba(255, 255, 255, 0.05);
}

.dark {
  --glass-primary: rgba(0, 0, 0, 0.25);
  --glass-secondary: rgba(0, 0, 0, 0.18);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-bg: rgba(255, 255, 255, 0.05);
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Basic Usage */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Basic Usage</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">React Setup</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <div className="text-xs text-gray-400 mb-2">App.jsx</div>
                            <pre className="text-sm text-gray-300">
                                <code>{`import { GlassProvider, GlassButton, GlassCard } from 'glass-ui';
import 'glass-ui/dist/glass.css';

function App() {
  return (
    <GlassProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <GlassCard className="p-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome to Glass UI</h1>
          <p className="text-gray-300 mb-6">
            Beautiful glassmorphism components for modern web apps.
          </p>
          <GlassButton variant="primary" size="lg">
            Get Started
          </GlassButton>
        </GlassCard>
      </div>
    </GlassProvider>
  );
}

export default App;`}</code>
                            </pre>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Next.js Setup</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <div className="text-xs text-gray-400 mb-2">app/layout.tsx</div>
                            <pre className="text-sm text-gray-300">
                                <code>{`import { GlassProvider } from 'glass-ui';
import 'glass-ui/dist/glass.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlassProvider>
          {children}
        </GlassProvider>
      </body>
    </html>
  );
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Framework Integration */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Framework Integration</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Vite + React</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-xs text-gray-300">
                                <code>{`// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
});`}</code>
                            </pre>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Create React App</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-xs text-gray-300">
                                <code>{`// Install CRACO for PostCSS
npm install @craco/craco

// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Troubleshooting */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Troubleshooting</h2>

                <div className="space-y-4">
                    <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-6">
                        <h3 className="font-semibold mb-3 text-red-300">Common Issues</h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div>
                                <strong className="text-red-300">Styles not loading:</strong>
                                <p>Make sure you've imported 'glass-ui/dist/glass.css' and configured Tailwind CSS properly.</p>
                            </div>
                            <div>
                                <strong className="text-red-300">TypeScript errors:</strong>
                                <p>Install @types/react and ensure your tsconfig.json includes proper module resolution.</p>
                            </div>
                            <div>
                                <strong className="text-red-300">Build errors:</strong>
                                <p>Ensure all peer dependencies are installed and versions are compatible.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Next Steps</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <a
                        href="/guides/quick-start"
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors block"
                    >
                        <h3 className="font-semibold mb-2">Quick Start Guide</h3>
                        <p className="text-sm text-gray-400">Learn the basics and create your first component</p>
                    </a>

                    <a
                        href="/components"
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors block"
                    >
                        <h3 className="font-semibold mb-2">Browse Components</h3>
                        <p className="text-sm text-gray-400">Explore all available components and their props</p>
                    </a>

                    <a
                        href="/guides/theming"
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors block"
                    >
                        <h3 className="font-semibold mb-2">Theming Guide</h3>
                        <p className="text-sm text-gray-400">Customize colors, effects, and design tokens</p>
                    </a>
                </div>
            </section>
        </div>
    );
} 