# 🚀 LiqUIdify Framework Integration Guides

> Complete integration guides for using LiqUIdify with popular React frameworks and build tools.

## 📖 Table of Contents

- [Next.js](#nextjs)
- [Vite](#vite)
- [Remix](#remix)
- [Gatsby](#gatsby)
- [Create React App](#create-react-app)
- [Astro](#astro)
- [Storybook](#storybook)
- [Testing](#testing)
- [Deployment](#deployment)

## ⚡ Next.js

### App Router (Next.js 13+)

#### Installation

```bash
npm install liquidify
# or
yarn add liquidify
# or
pnpm add liquidify
# or
bun add liquidify
```

#### Setup

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import 'liquidify/styles';
import './globals.css';

export const metadata: Metadata = {
  title: 'My App with LiqUIdify',
  description: 'Beautiful glassmorphism UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlassUIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="app-theme"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </GlassUIProvider>
      </body>
    </html>
  );
}
```

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import LiqUIdify styles after Tailwind */
@import 'liquidify/styles';

/* Custom glass background */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
```

#### Component Usage

```tsx
// app/page.tsx
import { GlassCard, GlassButton } from 'liquidify';
import { Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="container mx-auto p-8">
      <GlassCard className="max-w-md mx-auto p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-6 w-6 text-blue-400" />
          <h1 className="text-xl font-semibold text-white/90">
            Welcome to LiqUIdify
          </h1>
        </div>
        
        <p className="text-white/70 mb-6">
          Start building beautiful interfaces with glassmorphism effects.
        </p>
        
        <GlassButton variant="primary" className="w-full">
          Get Started
        </GlassButton>
      </GlassCard>
    </main>
  );
}
```

#### SSR Configuration

```tsx
// components/ClientOnly.tsx
'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

```tsx
// components/GlassComponents.tsx
'use client';

import { GlassChart, GlassPlayground } from 'liquidify';
import { ClientOnly } from './ClientOnly';

export function SSRSafeChart({ data }: { data: any[] }) {
  return (
    <ClientOnly fallback={<div className="h-64 bg-white/5 rounded-lg animate-pulse" />}>
      <GlassChart data={data} type="line" height={300} />
    </ClientOnly>
  );
}
```

#### Bundle Optimization

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['liquidify'],
  },
  transpilePackages: ['liquidify'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'liquidify$': 'liquidify/core', // Default to core bundle
    };
    return config;
  },
};

module.exports = nextConfig;
```

#### Tailwind Configuration

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/liquidify/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Extend with LiqUIdify design tokens
      colors: {
        glass: {
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
    },
  },
  plugins: [],
  darkMode: ['class'],
};
```

### Pages Router (Next.js 12 and below)

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import 'liquidify/styles';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlassUIProvider>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </GlassUIProvider>
  );
}
```

---

## ⚡ Vite

### Setup

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install liquidify
```

#### Configuration

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'liquidify': 'liquidify/core', // Default to core bundle
    },
  },
  optimizeDeps: {
    include: ['liquidify/core', 'liquidify/forms'],
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Externalize heavy components for code splitting
        return id.includes('liquidify/advanced');
      },
    },
  },
});
```

#### Main Entry

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import 'liquidify/styles';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlassUIProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-app-theme">
        <App />
      </ThemeProvider>
    </GlassUIProvider>
  </React.StrictMode>,
);
```

#### CSS Setup

```css
/* src/index.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'liquidify/styles';

body {
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
```

#### Environment Variables

```env
# .env
VITE_APP_TITLE=My LiqUIdify App
VITE_ENABLE_GLASS_EFFECTS=true
```

```tsx
// src/App.tsx
import { GlassCard, GlassButton, useTheme } from 'liquidify';
import { Moon, Sun } from 'lucide-react';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-white/90">
            {import.meta.env.VITE_APP_TITLE}
          </h1>
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </GlassButton>
        </div>
        
        <p className="text-white/70 mb-6">
          Beautiful glassmorphism components powered by Vite.
        </p>
        
        <GlassButton variant="primary" className="w-full">
          Explore Components
        </GlassButton>
      </GlassCard>
    </div>
  );
}

export default App;
```

---

## 🎵 Remix

### Setup

```bash
npx create-remix@latest my-app
cd my-app
npm install liquidify
```

#### Root Layout

```tsx
// app/root.tsx
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import liquidifyStyles from 'liquidify/styles';
import stylesheet from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: liquidifyStyles },
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'LiqUIdify Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <GlassUIProvider>
          <ThemeProvider defaultTheme="system" storageKey="remix-app-theme">
            <Outlet />
          </ThemeProvider>
        </GlassUIProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

#### Route Component

```tsx
// app/routes/_index.tsx
import type { V2_MetaFunction } from '@remix-run/node';
import { GlassCard, GlassButton, GlassInput } from 'liquidify';
import { Search, Sparkles } from 'lucide-react';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'LiqUIdify Remix Demo' },
    { name: 'description', content: 'Beautiful glassmorphism components in Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <GlassCard className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white/90">
              LiqUIdify + Remix
            </h1>
          </div>
          
          <p className="text-white/70 mb-8 text-lg">
            Experience the power of glassmorphism components with Remix's
            full-stack capabilities.
          </p>
          
          <div className="space-y-4">
            <GlassInput
              placeholder="Search components..."
              leftIcon={<Search className="h-4 w-4" />}
              className="w-full"
            />
            
            <div className="flex gap-4">
              <GlassButton variant="primary" className="flex-1">
                Get Started
              </GlassButton>
              <GlassButton variant="ghost" className="flex-1">
                View Docs
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
```

#### Error Boundary

```tsx
// app/components/ErrorBoundary.tsx
import { GlassCard, GlassButton } from 'liquidify';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="max-w-md p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white/90 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-white/70 mb-6">
          {error.message}
        </p>
        <GlassButton
          variant="primary"
          onClick={() => window.location.reload()}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Try Again
        </GlassButton>
      </GlassCard>
    </div>
  );
}
```

---

## 🎨 Gatsby

### Setup

```bash
npx create-gatsby my-app
cd my-app
npm install liquidify
```

#### Gatsby Config

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: 'LiqUIdify Gatsby Site',
    description: 'Beautiful glassmorphism components with Gatsby',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'LiqUIdify Gatsby App',
        short_name: 'LiqUIdify',
        start_url: '/',
        background_color: '#667eea',
        theme_color: '#764ba2',
        display: 'minimal-ui',
      },
    },
  ],
};
```

#### Root Wrapper

```tsx
// gatsby-browser.js and gatsby-ssr.js
import React from 'react';
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import 'liquidify/styles';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => (
  <GlassUIProvider>
    <ThemeProvider defaultTheme="system" storageKey="gatsby-app-theme">
      {element}
    </ThemeProvider>
  </GlassUIProvider>
);
```

#### Layout Component

```tsx
// src/components/Layout.tsx
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GlassCard } from 'liquidify';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <header className="p-6">
        <GlassCard className="p-4">
          <h1 className="text-2xl font-bold text-white/90">
            {data.site.siteMetadata.title}
          </h1>
        </GlassCard>
      </header>
      
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
```

---

## ⚛️ Create React App

### Setup

```bash
npx create-react-app my-app --template typescript
cd my-app
npm install liquidify
```

#### Index Setup

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import 'liquidify/styles';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlassUIProvider>
      <ThemeProvider defaultTheme="system" storageKey="cra-app-theme">
        <App />
      </ThemeProvider>
    </GlassUIProvider>
  </React.StrictMode>
);
```

#### CRACO Configuration (for Tailwind)

```bash
npm install @craco/craco
```

```js
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
  webpack: {
    alias: {
      'liquidify': 'liquidify/core',
    },
  },
};
```

```json
// package.json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

---

## 🚀 Astro

### Setup

```bash
npm create astro@latest my-app
cd my-app
npm install liquidify @astrojs/react @astrojs/tailwind
```

#### Astro Config

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: {
        content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        'liquidify': 'liquidify/core',
      },
    },
  },
});
```

#### Layout

```astro
---
// src/layouts/Layout.astro
export interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="LiqUIdify Astro App" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <style>
      body {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      }
    </style>
  </head>
  <body>
    <slot />
  </body>
</html>
```

#### React Component in Astro

```tsx
// src/components/GlassDemo.tsx
import { GlassCard, GlassButton, GlassUIProvider, ThemeProvider } from 'liquidify';
import { Sparkles } from 'lucide-react';

export default function GlassDemo() {
  return (
    <GlassUIProvider>
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen flex items-center justify-center p-4">
          <GlassCard className="max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-semibold text-white/90">
                LiqUIdify + Astro
              </h1>
            </div>
            
            <p className="text-white/70 mb-6">
              Beautiful glassmorphism components in Astro's island architecture.
            </p>
            
            <GlassButton variant="primary" className="w-full">
              Explore Islands
            </GlassButton>
          </GlassCard>
        </div>
      </ThemeProvider>
    </GlassUIProvider>
  );
}
```

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import GlassDemo from '../components/GlassDemo.tsx';
---

<Layout title="LiqUIdify Astro Demo">
  <GlassDemo client:load />
</Layout>

<style>
  @import 'liquidify/styles';
</style>
```

---

## 📚 Storybook

### Setup

```bash
npx storybook@latest init
npm install @storybook/addon-docs @storybook/addon-themes
```

#### Configuration

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

#### Preview Configuration

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import { GlassUIProvider, ThemeProvider } from 'liquidify';
import 'liquidify/styles';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    docs: {
      theme: {
        base: 'dark',
        brandTitle: 'LiqUIdify Components',
      },
    },
    backgrounds: {
      default: 'glassmorphism',
      values: [
        {
          name: 'glassmorphism',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <GlassUIProvider>
        <ThemeProvider defaultTheme="dark" storageKey="storybook-theme">
          <div className="p-4">
            <Story />
          </div>
        </ThemeProvider>
      </GlassUIProvider>
    ),
  ],
};

export default preview;
```

#### Story Example

```tsx
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { GlassButton } from 'liquidify';
import { Heart, Download } from 'lucide-react';

const meta: Meta<typeof GlassButton> = {
  title: 'Components/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Like',
    variant: 'secondary',
    leftIcon: <Heart className="h-4 w-4" />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Download',
    variant: 'primary',
    loading: true,
    loadingText: 'Downloading...',
    leftIcon: <Download className="h-4 w-4" />,
  },
};
```

---

## 🧪 Testing

### Jest + React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

#### Test Setup

```ts
// src/setupTests.ts
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

#### Test Utilities

```tsx
// src/test-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { GlassUIProvider, ThemeProvider } from 'liquidify';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlassUIProvider>
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        {children}
      </ThemeProvider>
    </GlassUIProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

#### Example Tests

```tsx
// src/components/__tests__/GlassButton.test.tsx
import { render, screen, fireEvent } from '../test-utils';
import { GlassButton } from 'liquidify';

describe('GlassButton', () => {
  test('renders button with text', () => {
    render(<GlassButton>Click me</GlassButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<GlassButton onClick={handleClick}>Click me</GlassButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(
      <GlassButton loading loadingText="Loading...">
        Submit
      </GlassButton>
    );
    
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Cypress E2E Testing

```bash
npm install --save-dev cypress
```

```ts
// cypress/e2e/glassmorphism.cy.ts
describe('Glassmorphism Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render glass card with proper styling', () => {
    cy.get('[data-testid="glass-card"]')
      .should('be.visible')
      .should('have.css', 'backdrop-filter');
  });

  it('should handle theme switching', () => {
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('have.class', 'dark');
  });

  it('should show toast notifications', () => {
    cy.get('[data-testid="show-toast"]').click();
    cy.get('[data-testid="toast"]')
      .should('be.visible')
      .should('contain', 'Success!');
  });
});
```

---

## 🚢 Deployment

### Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_ENABLE_GLASS_EFFECTS": "true"
  }
}
```

### Netlify

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"
  VITE_ENABLE_GLASS_EFFECTS = "true"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Performance Optimization

```ts
// Build optimization configuration
export const buildOptimization = {
  // Webpack Bundle Analyzer
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ],
  },

  // Vite Bundle Analysis
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'liquidify-core': ['liquidify/core'],
            'liquidify-forms': ['liquidify/forms'],
            'liquidify-charts': ['liquidify/advanced'],
          },
        },
      },
    },
  },

  // Service Worker for caching
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'google-fonts-stylesheets',
        },
      },
    ],
  },
};
```

---

## 📊 Bundle Size Optimization

### Import Strategy

```tsx
// ❌ Avoid - imports entire library
import { GlassButton, GlassCard, GlassChart } from 'liquidify';

// ✅ Recommended - import from bundles
import { GlassButton, GlassCard } from 'liquidify/core';      // ~15KB
import { GlassInput } from 'liquidify/forms';               // ~8KB
import { LineChart } from 'liquidify/advanced';             // ~12KB (lazy load)

// ✅ Best - import individual components
import { GlassButton } from 'liquidify/button';             // ~3KB
import { GlassCard } from 'liquidify/card';                 // ~4KB
```

### Code Splitting Example

```tsx
// Lazy load heavy components
import { lazy, Suspense } from 'react';
import { GlassLoading } from 'liquidify/core';

const GlassChart = lazy(() => import('liquidify/advanced').then(m => ({ default: m.LineChart })));
const GlassTable = lazy(() => import('liquidify/advanced').then(m => ({ default: m.GlassTable })));

function Dashboard() {
  return (
    <div>
      <Suspense fallback={<GlassLoading text="Loading chart..." />}>
        <GlassChart data={chartData} />
      </Suspense>
      
      <Suspense fallback={<GlassLoading text="Loading table..." />}>
        <GlassTable data={tableData} />
      </Suspense>
    </div>
  );
}
```

---

This comprehensive guide covers integration with all major React frameworks and build tools. Each section provides production-ready configurations and best practices for optimal performance and developer experience.

For framework-specific issues or advanced configurations, please refer to our [GitHub Discussions](https://github.com/tuliopc23/LiqUIdify/discussions) or [documentation website](https://liquidify.dev).