# Vite Integration

Complete guide for using LiqUIdify with Vite + React.

## Installation

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

## Setup

### 1. Create Vite Project (if needed)

```bash
# Create new Vite + React + TypeScript project
bun create vite my-app --template react-ts

cd my-app
bun install
bun add liquidify-react @ark-ui/react framer-motion lucide-react
```

### 2. Import Styles

Add the CSS import to your main entry file:

```tsx
// src/main.tsx
import 'liquidify-react/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. Use Components

```tsx
// src/App.tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export default function App() {
  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Welcome to Vite + LiqUIdify</h1>
        <Button>Click Me</Button>
      </Card>
    </main>
  );
}
```

### 4. Add Theming (Optional)

```tsx
// src/App.tsx
import 'liquidify-react/styles';
import { ThemeProvider } from 'liquidify-react/theme';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export default function App() {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      <main style={{ padding: '2rem' }}>
        <Card>
          <h1>Welcome to Vite + LiqUIdify</h1>
          <p>100% Apple HIG compliant components</p>
          <Button>Get Started</Button>
        </Card>
      </main>
    </ThemeProvider>
  );
}
```

## Dark Mode Toggle

```tsx
// src/components/ThemeToggle.tsx
import { Button } from 'liquidify-react/button';
import { useTheme } from 'liquidify-react/theme';

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
```

Use in your app:

```tsx
// src/App.tsx
import { ThemeProvider } from 'liquidify-react/theme';
import { ThemeToggle } from './components/ThemeToggle';
import { Card } from 'liquidify-react/card';

export default function App() {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      <main style={{ padding: '2rem' }}>
        <ThemeToggle />
        <Card>
          <h1>Vite + LiqUIdify</h1>
        </Card>
      </main>
    </ThemeProvider>
  );
}
```

## Vite Configuration

Your `vite.config.ts` should look like this:

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
    include: [
      'liquidify-react',
      '@ark-ui/react',
      'framer-motion',
      'lucide-react',
    ],
  },
});
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Routing with React Router

Install React Router:

```bash
bun add react-router-dom
```

Setup:

```tsx
// src/main.tsx
import 'liquidify-react/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'liquidify-react/theme';
import { Home } from './pages/Home';
import { About } from './pages/About';

export default function App() {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}
```

```tsx
// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <Card>
        <h1>Home</h1>
        <Link to="/about">
          <Button>Go to About</Button>
        </Link>
      </Card>
    </main>
  );
}
```

## Code Splitting

Use React.lazy for code splitting:

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Progress } from 'liquidify-react/ark-ui/progress';

const Home = lazy(() => import('./pages/Home'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  return (
    <Suspense fallback={<Progress value={null} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

## Environment Variables

Use Vite's env variables:

```tsx
// src/config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
```

```env
# .env
VITE_API_URL=https://api.example.com
```

## Building for Production

```bash
# Build
bun run build

# Preview production build
bun run preview
```

Your build output will be in the `dist` folder.

## Optimizing Bundle Size

### 1. Use Subpath Imports

```tsx
// ✅ Good: Only bundles Button
import { Button } from 'liquidify-react/button';

// ⚠️ Larger bundle: Imports entire library
import { Button } from 'liquidify-react';
```

### 2. Analyze Bundle

Install bundle analyzer:

```bash
bun add -D rollup-plugin-visualizer
```

Update vite config:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

Run build to see bundle analysis:

```bash
bun run build
```

### 3. Tree-Shaking

Vite automatically tree-shakes unused code. Use subpath imports for best results:

```tsx
// Components you use
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

// Unused components are automatically excluded from bundle
```

## PWA Support

Install PWA plugin:

```bash
bun add -D vite-plugin-pwa
```

Configure:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default function App() {
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My LiqUIdify App',
        short_name: 'LiqUIdify',
        description: '100% Apple HIG compliant',
        theme_color: '#007AFF',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

## Testing

### Vitest Setup

Install Vitest:

```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Configure:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

Setup file:

```ts
// src/test/setup.ts
import '@testing-library/jest-dom';
```

Example test:

```tsx
// src/components/__tests__/App.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Vite/i)).toBeInTheDocument();
  });
});
```

Run tests:

```bash
bun test
```

## Best Practices

### 1. Lazy Load Heavy Components

```tsx
import { lazy, Suspense } from 'react';

const ColorPicker = lazy(() => 
  import('liquidify-react/ark-ui/colorPicker').then(m => ({ 
    default: m.ColorPicker 
  }))
);

export function Settings() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ColorPicker />
    </Suspense>
  );
}
```

### 2. Use Path Aliases

```ts
// vite.config.ts
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
```

```tsx
// Use aliases
import { Button } from '@components/Button';
import { Card } from 'liquidify-react/card';
```

### 3. Optimize Images

Install image optimizer:

```bash
bun add -D vite-plugin-image-optimizer
```

Configure:

```ts
// vite.config.ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer(),
  ],
});
```

## Troubleshooting

### Styles not loading

Ensure CSS is imported in `src/main.tsx`:

```tsx
import 'liquidify-react/styles';
```

### Module not found errors

Install all peer dependencies:

```bash
bun add react react-dom @ark-ui/react framer-motion lucide-react
```

### TypeScript errors

Install type definitions:

```bash
bun add -D @types/react @types/react-dom @types/node
```

### Build errors

Clear cache and rebuild:

```bash
rm -rf node_modules/.vite
bun run build
```

## Complete Example

```tsx
// src/main.tsx
import 'liquidify-react/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'liquidify-react/theme';
import { Home } from './pages/Home';
import { About } from './pages/About';

export default function App() {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ThemeProvider>
  );
}
```

```tsx
// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { ThemeToggle } from '../components/ThemeToggle';

export function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <ThemeToggle />
      <Card>
        <h1>Welcome to Vite + LiqUIdify</h1>
        <p>100% Apple HIG compliant components</p>
        <Link to="/about">
          <Button>Learn More</Button>
        </Link>
      </Card>
    </main>
  );
}
```

```tsx
// src/components/ThemeToggle.tsx
import { Button } from 'liquidify-react/button';
import { useTheme } from 'liquidify-react/theme';

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
```

---

**Next:** [TanStack Start](./tanstack-start.md) | [Astro](./astro.md)
