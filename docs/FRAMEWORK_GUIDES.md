# 🚀 Framework Integration Guides

Complete guides for integrating LiqUIdify with popular React frameworks and build tools.

## 📋 Table of Contents

- [Next.js](#nextjs)
- [Vite](#vite)
- [Gatsby](#gatsby)
- [Remix](#remix)
- [Create React App](#create-react-app)
- [Astro](#astro)
- [Storybook](#storybook)
- [Testing Setup](#testing-setup)

## Next.js

### Installation & Setup

```bash
npm install liquidify
```

#### App Router (Next.js 13+)

```tsx
// app/layout.tsx
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx
import { GlassCard, GlassButton } from 'liquidify/core';

export default function HomePage() {
  return (
    <main className="container mx-auto p-6">
      <GlassCard className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to LiqUIdify</h1>
        <GlassButton>Get Started</GlassButton>
      </GlassCard>
    </main>
  );
}
```

#### Pages Router (Next.js 12 and below)

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### SSR Configuration

```tsx
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['liquidify'],
  // Optimize bundle for production
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

### Dynamic Imports

```tsx
// components/ClientOnlyComponent.tsx
import dynamic from 'next/dynamic';
import { GlassLoading } from 'liquidify/animations';

const GlassChart = dynamic(
  () => import('liquidify/advanced').then(mod => ({ default: mod.GlassChart })),
  {
    loading: () => <GlassLoading />,
    ssr: false
  }
);

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <GlassChart data={chartData} />
    </div>
  );
}
```

### Tailwind CSS Integration

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/liquidify/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Vite

### Installation & Setup

```bash
npm install liquidify
```

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### Vite Configuration

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
    },
  },
  optimizeDeps: {
    include: ['liquidify'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'liquidify-core': ['liquidify/core'],
          'liquidify-advanced': ['liquidify/advanced'],
        },
      },
    },
  },
});
```

### Environment Variables

```env
# .env
VITE_APP_TITLE=My LiqUIdify App
VITE_THEME_DEFAULT=system
```

```tsx
// src/App.tsx
import { GlassCard, GlassButton } from 'liquidify/core';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <GlassCard className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          {import.meta.env.VITE_APP_TITLE}
        </h1>
        <GlassButton fullWidth>Get Started</GlassButton>
      </GlassCard>
    </div>
  );
}

export default App;
```

## Gatsby

### Installation & Setup

```bash
npm install liquidify
```

#### Gatsby Browser API

```tsx
// gatsby-browser.js
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider defaultTheme="system" enableSystem>
    {element}
  </ThemeProvider>
);
```

#### Gatsby SSR API

```tsx
// gatsby-ssr.js
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider defaultTheme="system" enableSystem>
    {element}
  </ThemeProvider>
);
```

### Gatsby Configuration

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: 'My LiqUIdify Site',
    description: 'A beautiful site built with LiqUIdify',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'LiqUIdify Site',
        short_name: 'LiqUIdify',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#3b82f6',
        display: 'minimal-ui',
      },
    },
  ],
};
```

### Page Component

```tsx
// src/pages/index.tsx
import React from 'react';
import { GlassCard, GlassButton } from 'liquidify/core';
import { GlassContainer } from 'liquidify/layout';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <Layout>
      <GlassContainer>
        <GlassCard className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Gatsby + LiqUIdify</h1>
          <p className="text-lg mb-6">Build amazing static sites with glassmorphism design.</p>
          <GlassButton size="lg">Explore Components</GlassButton>
        </GlassCard>
      </GlassContainer>
    </Layout>
  );
};

export default IndexPage;
```

## Remix

### Installation & Setup

```bash
npm install liquidify
```

#### Root Component

```tsx
// app/root.tsx
import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ThemeProvider } from 'liquidify';
import liquidifyStyles from 'liquidify/dist/liquidui.css';
import styles from './tailwind.css';

export const links = () => [
  { rel: 'stylesheet', href: liquidifyStyles },
  { rel: 'stylesheet', href: styles },
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
      <body>
        <ThemeProvider defaultTheme="system" enableSystem>
          <Outlet />
        </ThemeProvider>
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
// app/routes/index.tsx
import { GlassCard, GlassButton } from 'liquidify/core';
import { GlassContainer } from 'liquidify/layout';

export default function Index() {
  return (
    <GlassContainer className="py-12">
      <GlassCard className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Remix + LiqUIdify</h1>
        <p className="text-lg mb-6">
          Full-stack web framework meets beautiful glassmorphism design.
        </p>
        <GlassButton size="lg">Get Started</GlassButton>
      </GlassCard>
    </GlassContainer>
  );
}
```

### Remix Configuration

```js
// remix.config.js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: ['liquidify'],
};
```

## Create React App

### Installation & Setup

```bash
npx create-react-app my-app --template typescript
cd my-app
npm install liquidify
```

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### App Component

```tsx
// src/App.tsx
import React from 'react';
import { GlassCard, GlassButton } from 'liquidify/core';
import { GlassContainer } from 'liquidify/layout';
import './App.css';

function App() {
  return (
    <div className="App">
      <GlassContainer className="py-12">
        <GlassCard className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Create React App + LiqUIdify</h1>
          <p className="text-lg mb-6">
            The classic React setup with modern glassmorphism design.
          </p>
          <GlassButton size="lg">Learn More</GlassButton>
        </GlassCard>
      </GlassContainer>
    </div>
  );
}

export default App;
```

### PostCSS Configuration

```js
// craco.config.js (if using CRACO)
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
```

## Astro

### Installation & Setup

```bash
npm install liquidify
```

#### Astro Configuration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    optimizeDeps: {
      include: ['liquidify'],
    },
  },
});
```

#### Layout Component

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
    <meta name="description" content="Astro + LiqUIdify" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import 'liquidify/dist/liquidui.css';
  
  html {
    font-family: system-ui, sans-serif;
  }
  
  body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
</style>
```

#### React Component in Astro

```tsx
// src/components/Hero.tsx
import { GlassCard, GlassButton } from 'liquidify/core';
import { ThemeProvider } from 'liquidify';

export default function Hero() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="container mx-auto px-6 py-12">
        <GlassCard className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Astro + LiqUIdify</h1>
          <p className="text-lg mb-6">
            Static site generation with interactive React components.
          </p>
          <GlassButton size="lg">Explore</GlassButton>
        </GlassCard>
      </div>
    </ThemeProvider>
  );
}
```

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.tsx';
---

<Layout title="Welcome to Astro + LiqUIdify">
  <main>
    <Hero client:load />
  </main>
</Layout>
```

## Storybook

### Installation & Setup

```bash
npx storybook@latest init
npm install liquidify
```

#### Storybook Configuration

```js
// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
};
```

#### Preview Configuration

```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'light',
          value: '#ffffff',
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
      <ThemeProvider defaultTheme="system" enableSystem>
        <div className="p-6">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
```

#### Story Example

```tsx
// src/stories/GlassButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { GlassButton } from 'liquidify/core';

const meta: Meta<typeof GlassButton> = {
  title: 'Components/GlassButton',
  component: GlassButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};
```

## Testing Setup

### Jest Configuration

```js
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
  ],
};
```

### Test Setup

```tsx
// src/setupTests.ts
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

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

### Test Utilities

```tsx
// src/test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'liquidify';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Example Test

```tsx
// src/components/__tests__/GlassButton.test.tsx
import { render, screen, fireEvent } from '../test-utils';
import { GlassButton } from 'liquidify/core';

describe('GlassButton', () => {
  it('renders with text', () => {
    render(<GlassButton>Click me</GlassButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<GlassButton onClick={handleClick}>Click me</GlassButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<GlassButton loading>Loading</GlassButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## 🎯 Best Practices

### Performance Optimization

1. **Use modular imports** to reduce bundle size
2. **Lazy load heavy components** with React.lazy()
3. **Implement code splitting** at the route level
4. **Use React.memo** for expensive components
5. **Optimize images** and use proper formats

### Accessibility

1. **Always provide meaningful labels** for interactive elements
2. **Test with keyboard navigation** and screen readers
3. **Ensure sufficient color contrast** in custom themes
4. **Use semantic HTML** elements when possible
5. **Implement proper focus management** in modals and drawers

### Development Workflow

1. **Use TypeScript** for better developer experience
2. **Set up ESLint and Prettier** for consistent code style
3. **Write tests** for critical user interactions
4. **Use Storybook** for component development
5. **Implement proper error boundaries** for production apps

---

For more detailed examples and advanced configurations, visit our [documentation site](https://liquidify-docs.vercel.app).
