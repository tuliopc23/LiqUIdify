# 🚀 Getting Started with LiqUIdify

Welcome to LiqUIdify! This guide will help you get up and running with our beautiful glassmorphism React component library in minutes.

## 📦 Installation

### Prerequisites

- Node.js 16.0 or later
- React 17.0 or later
- A modern bundler (Vite, Webpack, etc.)

### Install LiqUIdify

Choose your preferred package manager:

```bash
# npm
npm install liquidify

# yarn
yarn add liquidify

# pnpm
pnpm add liquidify

# bun
bun add liquidify
```

## 🎨 Basic Setup

### 1. Import Styles

Add the LiqUIdify CSS to your main application file:

```tsx
// src/main.tsx (Vite) or src/index.tsx (CRA)
import 'liquidify/dist/liquidui.css';
```

### 2. Wrap Your App with ThemeProvider

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### 3. Create Your First Component

```tsx
// src/App.tsx
import { GlassCard, GlassButton } from 'liquidify/core';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-md mx-auto">
        <GlassCard className="p-6">
          <h1 className="text-2xl font-bold mb-4">Hello LiqUIdify! 🌊</h1>
          <p className="text-gray-600 mb-6">
            You've successfully set up LiqUIdify in your React application.
          </p>
          <GlassButton fullWidth>
            Explore Components
          </GlassButton>
        </GlassCard>
      </div>
    </div>
  );
}

export default App;
```

## 🎯 Quick Examples

### Button Variants

```tsx
import { GlassButton } from 'liquidify/core';

function ButtonExamples() {
  return (
    <div className="space-y-4">
      <GlassButton variant="primary">Primary Button</GlassButton>
      <GlassButton variant="secondary">Secondary Button</GlassButton>
      <GlassButton variant="ghost">Ghost Button</GlassButton>
      <GlassButton variant="danger">Danger Button</GlassButton>
    </div>
  );
}
```

### Form Components

```tsx
import { useState } from 'react';
import { GlassCard, GlassInput, GlassButton } from 'liquidify/core';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <GlassCard className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <div className="space-y-4">
        <GlassInput
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <GlassInput
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <GlassButton fullWidth>
          Sign In
        </GlassButton>
      </div>
    </GlassCard>
  );
}
```

### Layout Components

```tsx
import { GlassContainer, GlassGrid, GlassCard } from 'liquidify/layout';

function GridExample() {
  return (
    <GlassContainer>
      <GlassGrid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">Card 1</h3>
          <p>This is the first card in our grid.</p>
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">Card 2</h3>
          <p>This is the second card in our grid.</p>
        </GlassCard>
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-2">Card 3</h3>
          <p>This is the third card in our grid.</p>
        </GlassCard>
      </GlassGrid>
    </GlassContainer>
  );
}
```

## 🎨 Theme Customization

### Using the Theme System

```tsx
import { useTheme } from 'liquidify';
import { GlassButton } from 'liquidify/core';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <GlassButton
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </GlassButton>
  );
}
```

### Custom CSS Variables

Add custom styles to your CSS file:

```css
/* src/index.css */
:root {
  /* Customize glass effects */
  --glass-opacity: 0.15;
  --glass-blur: 12px;
  --glass-border-opacity: 0.25;
  
  /* Custom colors */
  --glass-primary: #3b82f6;
  --glass-secondary: #6b7280;
  --glass-success: #10b981;
  --glass-warning: #f59e0b;
  --glass-error: #ef4444;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --glass-opacity: 0.1;
  --glass-blur: 16px;
}
```

## 📦 Bundle Optimization

### Modular Imports (Recommended)

Instead of importing the entire library, use modular imports for better bundle sizes:

```tsx
// ✅ Good - Only imports specific components
import { GlassButton, GlassCard } from 'liquidify/core';
import { GlassModal } from 'liquidify/advanced';
import { GlassAlert } from 'liquidify/feedback';

// ❌ Avoid - Imports entire library
import { GlassButton, GlassCard, GlassModal, GlassAlert } from 'liquidify';
```

### Available Bundles

| Bundle | Size | Components |
|--------|------|------------|
| `liquidify/core` | ~8KB | Button, Card, Input, Select |
| `liquidify/layout` | ~6KB | Container, Grid, Stack |
| `liquidify/forms` | ~12KB | Form, Input, Select, Textarea |
| `liquidify/advanced` | ~18KB | Modal, Drawer, Dropdown |
| `liquidify/feedback` | ~10KB | Alert, Toast, Tooltip |
| `liquidify/animations` | ~8KB | Loading, Transitions |

### Dynamic Imports

For even better performance, use dynamic imports:

```tsx
import { lazy, Suspense } from 'react';
import { GlassLoading } from 'liquidify/animations';

const GlassChart = lazy(() => 
  import('liquidify/advanced').then(module => ({ 
    default: module.GlassChart 
  }))
);

function Dashboard() {
  return (
    <Suspense fallback={<GlassLoading />}>
      <GlassChart data={chartData} />
    </Suspense>
  );
}
```

## 🔧 Framework-Specific Setup

### Next.js

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Gatsby

```tsx
// gatsby-browser.js
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider defaultTheme="system" enableSystem>
    {element}
  </ThemeProvider>
);
```

### Remix

```tsx
// app/root.tsx
import { ThemeProvider } from 'liquidify';
import liquidifyStyles from 'liquidify/dist/liquidui.css';

export const links = () => [
  { rel: 'stylesheet', href: liquidifyStyles },
];

export default function App() {
  return (
    <html>
      <head>
        <Links />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" enableSystem>
          <Outlet />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 🎭 Advanced Features

### SSR-Safe Hooks

LiqUIdify includes SSR-safe hooks for server-side rendering:

```tsx
import { useIsClient, useSSRSafeLocalStorage } from 'liquidify';

function ClientOnlyComponent() {
  const isClient = useIsClient();
  const [value, setValue] = useSSRSafeLocalStorage('key', 'default');

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Client-side value: {value}</p>
      <button onClick={() => setValue('new value')}>
        Update Value
      </button>
    </div>
  );
}
```

### Toast Notifications

```tsx
import { useToast } from 'liquidify';
import { GlassButton } from 'liquidify/core';

function ToastExample() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: 'Success!',
      description: 'Your action was completed successfully.',
      variant: 'success',
      duration: 3000
    });
  };

  return (
    <GlassButton onClick={showToast}>
      Show Toast
    </GlassButton>
  );
}
```

## 🧪 Testing Setup

### Jest Configuration

```tsx
// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

### Test Utilities

```tsx
// src/test-utils.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'liquidify';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Example Test

```tsx
import { render, screen, fireEvent } from './test-utils';
import { GlassButton } from 'liquidify/core';

test('button calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<GlassButton onClick={handleClick}>Click me</GlassButton>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 🚨 Common Issues

### CSS Not Loading

Make sure you've imported the CSS file:

```tsx
import 'liquidify/dist/liquidui.css';
```

### TypeScript Errors

Install the necessary type definitions:

```bash
npm install --save-dev @types/react @types/react-dom
```

### Bundle Size Issues

Use modular imports and check your bundler configuration:

```tsx
// Use specific imports
import { GlassButton } from 'liquidify/core';

// Instead of
import { GlassButton } from 'liquidify';
```

### SSR Hydration Issues

Use SSR-safe hooks for client-only features:

```tsx
import { useIsClient } from 'liquidify';

function MyComponent() {
  const isClient = useIsClient();
  
  if (!isClient) return null;
  
  return <ClientOnlyFeature />;
}
```

## 📚 Next Steps

Now that you have LiqUIdify set up, explore these resources:

- 📖 **[API Reference](./API_REFERENCE.md)** - Complete component documentation
- 🎨 **[Storybook](https://liquidify-storybook.vercel.app)** - Interactive component playground
- 💡 **[Usage Examples](./USAGE_EXAMPLES.md)** - Real-world implementation patterns
- 🚀 **[Framework Guides](./FRAMEWORK_GUIDES.md)** - Framework-specific integration guides

## 🤝 Getting Help

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/tuliopc/liquidify/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/tuliopc/liquidify/discussions)
- 📧 **Email**: support@liquidify.dev

Happy building with LiqUIdify! 🌊✨
