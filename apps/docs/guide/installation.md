# Installation

## Prerequisites

Before installing LiqUIdify, ensure you have:

- Node.js 18+ or Bun 1.0+
- React 18+ or React 19
- A modern bundler (Vite, Webpack, Rollup, etc.)

## Package Installation

### Using Bun (Recommended)

```bash
bun add liquidify
```

### Using npm

```bash
npm install liquidify
```

### Using Yarn

```bash
yarn add liquidify
```

### Using pnpm

```bash
pnpm add liquidify
```

## CSS Import

LiqUIdify requires its CSS file to be imported for proper styling:

```tsx
// In your main entry file (App.tsx, main.tsx, etc.)
import 'liquidify/styles'
```

## Basic Setup

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlassProvider } from 'liquidify'
import 'liquidify/styles'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlassProvider>
      <App />
    </GlassProvider>
  </React.StrictMode>
)
```

## TypeScript Configuration

LiqUIdify is built with TypeScript and includes type definitions. No additional configuration is needed, but ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

## Vite Configuration

If you're using Vite, LiqUIdify works out of the box. For optimal performance, you can add:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['liquidify']
  }
})
```

## Next Steps

Now that you have LiqUIdify installed, check out:

- [Quick Start Guide](./quick-start) - Build your first component
- [Components Overview](/components/) - Explore available components
- [Theming Guide](./theming) - Customize the look and feel