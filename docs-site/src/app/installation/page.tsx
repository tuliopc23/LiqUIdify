export default function InstallationPage() {
    return (
        <div className="prose">
            <h1>Installation & Setup</h1>
            <p>
                Get started with Glass UI in your React project. This guide covers installation,
                configuration, and first steps to building beautiful glassmorphic interfaces.
            </p>

            <h2>📦 Installation</h2>

            <h3>Package Managers</h3>
            <p>Choose your preferred package manager:</p>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">npm</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`npm install glass-ui
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}</code></pre>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">yarn</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`yarn add glass-ui
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}</code></pre>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">pnpm</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`pnpm add glass-ui
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`}</code></pre>
            </div>

            <h3>CDN Installation</h3>
            <p>For quick prototyping or simple projects, you can use our CDN:</p>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">HTML</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/glass-ui/dist/glass.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/glass-ui/dist/glass.min.js"></script>`}</code></pre>
            </div>

            <h2>⚙️ Configuration</h2>

            <h3>Tailwind CSS Setup</h3>
            <p>Configure Tailwind CSS to work with Glass UI components:</p>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">tailwind.config.js</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("glass-ui/plugin"),
  ],
}`}</code></pre>
            </div>

            <h3>CSS Imports</h3>
            <p>Add the necessary CSS imports to your global stylesheet:</p>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">globals.css</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`@tailwind base;
@tailwind components;
@tailwind utilities;

@import 'glass-ui/dist/glass.css';

/* Optional: Enable CSS variables for theming */
:root {
  --glass-primary: rgba(255, 255, 255, 0.25);
  --glass-secondary: rgba(255, 255, 255, 0.18);
  --glass-border: rgba(255, 255, 255, 0.2);
}

.dark {
  --glass-primary: rgba(0, 0, 0, 0.25);
  --glass-secondary: rgba(0, 0, 0, 0.18);
  --glass-border: rgba(255, 255, 255, 0.1);
}`}</code></pre>
            </div>

            <h2>🚀 First Component</h2>
            <p>Let's create your first Glass UI component:</p>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">App.tsx</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { GlassButton, GlassCard, ThemeProvider } from 'glass-ui';
import 'glass-ui/dist/glass.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
        <GlassCard className="max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-white mb-4">
            Welcome to Glass UI
          </h1>
          <p className="text-gray-300 mb-6">
            Beautiful glassmorphism components for React.
          </p>
          <GlassButton variant="primary" className="w-full">
            Get Started
          </GlassButton>
        </GlassCard>
      </div>
    </ThemeProvider>
  );
}

export default App;`}</code></pre>
            </div>

            <h2>🖼️ Framework Integration</h2>

            <h3>Next.js Setup</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">next.config.js</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['glass-ui'],
  },
  transpilePackages: ['glass-ui'],
}

module.exports = nextConfig`}</code></pre>
            </div>

            <h3>Vite Setup</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">vite.config.ts</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['glass-ui'],
  },
  build: {
    commonjsOptions: {
      include: [/glass-ui/, /node_modules/],
    },
  },
})`}</code></pre>
            </div>

            <h2>🔧 TypeScript Support</h2>
            <p>Glass UI includes full TypeScript support. Add type definitions:</p>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">tsconfig.json</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "node_modules/glass-ui/dist/types"],
  "exclude": ["node_modules"]
}`}</code></pre>
            </div>

            <h2>🛠️ Troubleshooting</h2>

            <h3>Common Issues</h3>
            <div className="api-section">
                <h4>Module not found errors</h4>
                <p>If you encounter module resolution issues:</p>
                <ul>
                    <li>Ensure <code>glass-ui</code> is listed in your package.json dependencies</li>
                    <li>Clear your node_modules and reinstall: <code>rm -rf node_modules package-lock.json && npm install</code></li>
                    <li>Check that your bundler supports ES modules</li>
                </ul>
            </div>

            <div className="api-section">
                <h4>Styles not applying</h4>
                <p>If Glass UI components don't have the expected appearance:</p>
                <ul>
                    <li>Verify that <code>glass-ui/dist/glass.css</code> is imported</li>
                    <li>Ensure Tailwind CSS is properly configured with our content paths</li>
                    <li>Check that the Glass UI plugin is included in your Tailwind config</li>
                </ul>
            </div>

            <div className="api-section">
                <h4>Performance issues</h4>
                <p>If you experience slow rendering or animations:</p>
                <ul>
                    <li>Enable hardware acceleration in your CSS: <code>transform: translateZ(0)</code></li>
                    <li>Use the performance monitoring hooks provided by Glass UI</li>
                    <li>Consider reducing the number of glass effects on a single page</li>
                </ul>
            </div>

            <h2>🎯 Next Steps</h2>
            <p>Now that you have Glass UI installed and configured, explore these resources:</p>

            <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                <a href="/quick-start" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Quick Start Guide</h4>
                    <p className="text-gray-400 text-sm">Learn the basics and build your first components</p>
                </a>
                <a href="/components" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-purple-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Component Library</h4>
                    <p className="text-gray-400 text-sm">Explore all available components and their props</p>
                </a>
                <a href="/theming" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-green-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Theming System</h4>
                    <p className="text-gray-400 text-sm">Customize colors, effects, and design tokens</p>
                </a>
                <a href="/examples" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-yellow-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Examples</h4>
                    <p className="text-gray-400 text-sm">Real-world examples and code snippets</p>
                </a>
            </div>
        </div>
    );
} 