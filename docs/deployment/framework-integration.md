# Framework Integration Testing

## Overview

This document provides examples and testing configurations for using LiquidUI with various React frameworks.

## 1. Create React App (CRA)

### Installation
```bash
npm install @tuliocunha23/liquidui
npm install --save-dev tailwindcss
```

### Setup
```javascript
// src/index.js
import '@tuliocunha23/liquidui/css';

// src/App.js
import { GlassButton, GlassCard } from '@tuliocunha23/liquidui';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <GlassCard className="p-6">
        <h1>LiquidUI in CRA</h1>
        <GlassButton>Click me</GlassButton>
      </GlassCard>
    </div>
  );
}
```

### Tailwind Integration (CRA)
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tuliocunha23/liquidui/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 2. Next.js

### Installation
```bash
npm install @tuliocunha23/liquidui
```

### App Router Setup
```typescript
// app/layout.tsx
import '@tuliocunha23/liquidui/css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Component Usage
```typescript
// app/page.tsx
import { GlassButton, GlassCard } from '@tuliocunha23/liquidui';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <GlassCard className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Next.js with LiquidUI</h1>
        <GlassButton size="lg">Get Started</GlassButton>
      </GlassCard>
    </main>
  );
}
```

### Tailwind Configuration (Next.js)
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tuliocunha23/liquidui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 3. Vite

### Installation
```bash
npm install @tuliocunha23/liquidui
npm install --save-dev tailwindcss postcss autoprefixer
```

### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@tuliocunha23/liquidui']
  }
});
```

### Component Usage
```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@tuliocunha23/liquidui/css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

## 4. Remix

### Installation
```bash
npm install @tuliocunha23/liquidui
```

### Root Setup
```typescript
// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import liquiduiStyles from "@tuliocunha23/liquidui/css";

export function links() {
  return [
    { rel: "stylesheet", href: liquiduiStyles },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### Route Usage
```typescript
// app/routes/_index.tsx
import { GlassButton, GlassCard } from '@tuliocunha23/liquidui';

export default function Index() {
  return (
    <div className="min-h-screen p-8">
      <GlassCard className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Remix with LiquidUI</h1>
        <GlassButton>Explore</GlassButton>
      </GlassCard>
    </div>
  );
}
```

## 5. Astro

### Installation
```bash
npm install @tuliocunha23/liquidui
npm install @astrojs/react
```

### Astro Configuration
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: {
        content: [
          './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
          './node_modules/@tuliocunha23/liquidui/dist/**/*.{js,mjs}',
        ],
      },
    }),
  ],
});
```

### Component Usage
```astro
---
// src/pages/index.astro
import { GlassButton, GlassCard } from '@tuliocunha23/liquidui';
import '@tuliocunha23/liquidui/css';
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro with LiquidUI</title>
  </head>
  <body>
    <main class="min-h-screen p-8">
      <GlassCard className="max-w-md mx-auto p-6" client:load>
        <h1 class="text-2xl font-bold mb-4">Astro with LiquidUI</h1>
        <GlassButton client:load>Launch</GlassButton>
      </GlassCard>
    </main>
  </body>
</html>
```

## Testing Framework Integration

### Automated Integration Tests

Create tests for each framework to verify:
1. Component rendering
2. CSS loading
3. Interactive functionality
4. SSR compatibility
5. Bundle size impact

### Example Test Structure
```typescript
// tests/integration/framework-tests.spec.ts
describe('Framework Integration', () => {
  test('CRA integration works', async () => {
    // Test CRA specific setup
  });
  
  test('Next.js SSR works', async () => {
    // Test Next.js specific features
  });
  
  test('Vite dev server works', async () => {
    // Test Vite development experience
  });
  
  test('Remix SSR works', async () => {
    // Test Remix specific features
  });
  
  test('Astro integration works', async () => {
    // Test Astro specific features
  });
});
```

## Performance Considerations

### Bundle Analysis
Each framework should be tested for:
- Bundle size impact
- Tree-shaking effectiveness
- Runtime performance
- CSS delivery optimization

### Metrics to Track
- Initial bundle size
- Component lazy-loading
- CSS critical path
- Runtime performance
- Memory usage
