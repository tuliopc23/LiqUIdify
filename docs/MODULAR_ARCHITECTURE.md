# Glass UI - Modular Architecture Guide

## Overview

Glass UI now features a modular architecture that enables optimal bundle sizes through code splitting and tree-shaking. This guide explains how to use the new modular import system.

## Bundle Structure

### Core Bundle (<15KB gzipped)
The core bundle contains only essential components and utilities:
- `GlassButton` - Basic button component
- `GlassCard` - Container component
- `GlassInput` - Form input component
- `ThemeProvider` - Theme context provider
- `GlassErrorBoundary` - Error handling
- Core utilities (`cn`, base component system)

### Animations Bundle (<10KB gzipped)
Animation utilities and components:
- `useGlassAnimations` - Animation hook
- `GlassLoading` - Loading indicator
- `GlassProgress` - Progress bar
- `GlassSpinner` - Spinner component
- `GlassSkeleton` - Skeleton loader
- Animation presets and utilities

### Advanced Bundle (<8KB gzipped)
Complex components and features:
- `GlassModal` - Modal dialog
- `GlassCommand` - Command palette
- `GlassChart` - Chart component
- `AppleLiquidGlass` components
- Physics system (lite version)

## Import Methods

### 1. Modular Imports (Recommended)

```typescript
// Import only what you need
import { GlassButton, GlassCard } from '@glass-ui/core';
import { GlassLoading } from '@glass-ui/animations';
import { GlassModal } from '@glass-ui/advanced';
```

### 2. Dynamic Imports

```typescript
import { loadAnimations, loadAdvanced } from 'glass-ui';

// Load bundles on demand
async function initializeApp() {
  const animations = await loadAnimations();
  const { GlassLoading } = animations;
  
  // Use the components
}
```

### 3. React.lazy Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const LazyModal = lazy(() => 
  import('@glass-ui/advanced').then(m => ({ default: m.GlassModal }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyModal />
    </Suspense>
  );
}
```

### 4. Tree-shakeable Imports

```typescript
// Import specific components for better tree-shaking
import GlassButton from 'glass-ui/core/button';
import GlassModal from 'glass-ui/advanced/modal';
```

## Bundle Size Optimization

### Configure Features

```typescript
import { FEATURES, autoLoadBundles } from 'glass-ui';

// Enable only needed features
FEATURES.animations = true;
FEATURES.advanced = false;
FEATURES.accessibility = true;

// Auto-load enabled bundles
await autoLoadBundles();
```

### Monitor Bundle Sizes

```typescript
import { getBundleSize, markBundleStart, markBundleEnd } from 'glass-ui';

// Track bundle loading performance
markBundleStart('animations');
const animations = await loadAnimations();
markBundleEnd('animations');

console.log('Bundle size:', getBundleSize('animations')); // "9.8KB"
```

## Build Configuration

### Using Vite

```javascript
// vite.config.js
import { glassUIPlugin } from 'glass-ui/plugin';

export default {
  plugins: [
    glassUIPlugin({
      splitBundles: true,
      bundleSizes: {
        core: 15,
        animations: 10,
        advanced: 8
      },
      analyze: true
    })
  ]
}
```

### Package.json Configuration

```json
{
  "dependencies": {
    "glass-ui": "^1.0.0"
  },
  "sideEffects": false,
  "imports": {
    "#glass-ui/core": "glass-ui/core",
    "#glass-ui/animations": "glass-ui/animations",
    "#glass-ui/advanced": "glass-ui/advanced"
  }
}
```

## Migration Guide

### From Monolithic to Modular

```typescript
// Before
import { GlassButton, GlassModal, GlassLoading } from 'glass-ui';

// After
import { GlassButton } from '@glass-ui/core';
import { GlassLoading } from '@glass-ui/animations';
import { GlassModal } from '@glass-ui/advanced';
```

### Lazy Loading Heavy Components

```typescript
// Before - Always loaded
import { GlassChart } from 'glass-ui';

// After - Loaded on demand
const GlassChart = lazy(() => 
  import('@glass-ui/advanced').then(m => ({ default: m.GlassChart }))
);
```

## Performance Benefits

- **Reduced Initial Bundle**: Core bundle is <15KB vs 100KB+ full bundle
- **Faster TTI**: Only load what's needed for initial render
- **Better Caching**: Bundles can be cached independently
- **Progressive Enhancement**: Add features as needed

## Best Practices

1. **Start with Core**: Import only from core bundle initially
2. **Lazy Load Advanced**: Use dynamic imports for complex components
3. **Monitor Sizes**: Use bundle analyzer to track sizes
4. **Enable Tree Shaking**: Ensure sideEffects: false in package.json
5. **Use CDN**: Host bundles on CDN for better caching

## Bundle Analysis

Run bundle analysis after build:

```bash
npm run build:analyze
```

This will:
1. Build modular bundles
2. Analyze sizes
3. Check against targets
4. Generate report

## TypeScript Support

All bundles are fully typed:

```typescript
import type { GlassButtonProps } from '@glass-ui/core';
import type { GlassModalProps } from '@glass-ui/advanced';
import type { AnimationPreset } from '@glass-ui/animations';
```

## Server-Side Rendering

For SSR, import only server-safe components:

```typescript
// pages/index.tsx
export async function getServerSideProps() {
  // Only core components are SSR-safe by default
  const { GlassButton, GlassCard } = await import('@glass-ui/core');
  
  return { props: {} };
}
```

## Troubleshooting

### Bundle Size Warnings

If you see bundle size warnings:
1. Check imports - ensure using modular imports
2. Review dependencies - some may pull in entire bundles
3. Enable tree shaking in build config
4. Use dynamic imports for large components

### Missing Components

If components are missing:
1. Ensure correct bundle is imported
2. Check if using dynamic import correctly
3. Verify bundle has loaded before use

### Type Errors

For TypeScript errors:
1. Import types from specific bundles
2. Use type-only imports when possible
3. Check tsconfig moduleResolution