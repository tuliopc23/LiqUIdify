# Peer Dependencies and Polyfills

## Overview

LiquidUI is designed to work with a wide range of React versions and environments. This document outlines the peer dependency requirements, polyfill needs, and compatibility considerations.

## Peer Dependencies

### React & React DOM

```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    },
    "react-dom": {
      "optional": true
    }
  }
}
```

#### Supported React Versions

| React Version | Support Level | Notes |
|---------------|--------------|-------|
| 16.8.x - 17.x | ✅ Full Support | Hooks introduced in 16.8 |
| 18.x | ✅ Full Support | Concurrent features supported |
| 19.x | ✅ Full Support | Latest features supported |

#### Version Range Explanation

- **Minimum**: React 16.8.0 (introduces React Hooks)
- **Recommended**: React 18.0+ for optimal performance
- **Latest Tested**: React 19.1.0

### Optional Dependencies

The library marks React as optional to support:
- Server-side rendering scenarios
- Build-time usage (design tokens only)
- Non-React environments using design tokens

## Polyfills Required

### CSS Features

#### CSS Custom Properties (CSS Variables)
```css
/* Required for: IE 11, older browsers */
/* Status: Not polyfilled - graceful degradation */
:root {
  --glass-bg-primary: rgba(255, 255, 255, 0.25);
}
```

**Solution**: Use PostCSS plugin for IE 11 support:
```bash
npm install postcss-custom-properties
```

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: 'src/styles/glass.css'
    })
  ]
}
```

#### Backdrop Filter
```css
/* Required for: Safari < 14, Firefox < 103 */
backdrop-filter: blur(20px) saturate(150%);
-webkit-backdrop-filter: blur(20px) saturate(150%);
```

**Status**: Automatically prefixed, graceful degradation for unsupported browsers.

### JavaScript Features

#### ES2020 Features
The library uses modern JavaScript features:

- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- Dynamic imports
- BigInt (for animations)

**Polyfill Strategy**: Not included by default. Add to your bundler config:

```javascript
// webpack.config.js
module.exports = {
  entry: {
    app: ['core-js/stable', './src/index.js']
  }
}

// vite.config.js
export default {
  build: {
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
  }
}
```

#### ResizeObserver
```typescript
// Used for responsive glass effects
const observer = new ResizeObserver(callback);
```

**Polyfill**: 
```bash
npm install resize-observer-polyfill
```

```typescript
// In your app entry point
if (!window.ResizeObserver) {
  import('resize-observer-polyfill').then(module => {
    window.ResizeObserver = module.default;
  });
}
```

#### IntersectionObserver
```typescript
// Used for visibility-based animations
const observer = new IntersectionObserver(callback, options);
```

**Polyfill**:
```bash
npm install intersection-observer
```

```typescript
// In your app entry point
if (!window.IntersectionObserver) {
  import('intersection-observer');
}
```

## Framework-Specific Requirements

### Next.js

```javascript
// next.config.js
module.exports = {
  transpilePackages: ['@tuliocunha23/liquidui'],
  experimental: {
    esmExternals: true
  }
}
```

### Create React App

```javascript
// package.json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### Vite

```javascript
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@tuliocunha23/liquidui']
  },
  build: {
    commonjsOptions: {
      include: [/@tuliocunha23\/liquidui/, /node_modules/]
    }
  }
}
```

### Webpack 5

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      // Required for some polyfills
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer")
    }
  }
}
```

## Browser Support Matrix

| Browser | Version | Support Level | Notes |
|---------|---------|--------------|-------|
| Chrome | 87+ | ✅ Full | Baseline |
| Firefox | 78+ | ✅ Full | ESR supported |
| Safari | 13.1+ | ✅ Full | Webkit prefixes included |
| Edge | 88+ | ✅ Full | Chromium-based |
| IE 11 | 11 | ⚠️ Degraded | Requires polyfills, limited glass effects |

### IE 11 Support Strategy

1. **CSS Fallbacks**:
```css
/* Fallback without backdrop-filter */
.glass-effect {
  background: rgba(255, 255, 255, 0.9); /* IE 11 fallback */
  background: var(--glass-bg-primary); /* Modern browsers */
}

@supports (backdrop-filter: blur(1px)) {
  .glass-effect {
    backdrop-filter: blur(20px);
  }
}
```

2. **JavaScript Polyfills**:
```typescript
// Conditional loading for IE 11
if (!Element.prototype.closest) {
  import('element-closest').then(() => {
    // Component can now use closest()
  });
}
```

## Environment Variables

### Build-time Configuration

```bash
# Disable specific features for older browsers
LIQUIDUI_DISABLE_BACKDROP_FILTER=true
LIQUIDUI_DISABLE_ANIMATIONS=true
LIQUIDUI_TARGET_ES5=true
```

### Runtime Detection

```typescript
// Built-in feature detection
import { supportedFeatures } from '@tuliocunha23/liquidui/utils';

if (supportedFeatures.backdropFilter) {
  // Use full glass effects
} else {
  // Use fallback styling
}
```

## Performance Considerations

### Bundle Size Impact

| Include Level | Bundle Size (gzipped) |
|--------------|----------------------|
| Full library | ~50kB |
| Single component | ~8-10kB |
| Design tokens only | ~2kB |
| CSS only | ~20kB |

### Tree Shaking Requirements

Ensure your bundler supports:
- ESM imports/exports
- `sideEffects: false` in package.json
- Dead code elimination

```javascript
// Good: Tree-shakable import
import { GlassButton } from '@tuliocunha23/liquidui';

// Avoid: Imports entire library
import * as LiquidUI from '@tuliocunha23/liquidui';
```

## Testing Your Setup

### Compatibility Test Script

```typescript
// compatibility-test.ts
import { GlassButton } from '@tuliocunha23/liquidui';

// Test 1: Component renders
const testRender = () => {
  try {
    return Boolean(GlassButton);
  } catch {
    return false;
  }
};

// Test 2: CSS variables work
const testCSSVariables = () => {
  const testEl = document.createElement('div');
  testEl.style.setProperty('--test', 'value');
  return testEl.style.getPropertyValue('--test') === 'value';
};

// Test 3: Backdrop filter support
const testBackdropFilter = () => {
  return CSS.supports('backdrop-filter', 'blur(1px)');
};

console.log('Compatibility Test Results:', {
  render: testRender(),
  cssVariables: testCSSVariables(),
  backdropFilter: testBackdropFilter()
});
```

### Automated Testing

```bash
# Test across different Node versions
npm run test:node16
npm run test:node18
npm run test:node20

# Test browser compatibility
npm run test:browsers
```

## Migration Guide

### From v1.0.x to v1.1.x

No breaking changes in peer dependencies.

### Future Compatibility

The library aims to maintain backward compatibility while supporting new React features:

- React 18 Concurrent Features: ✅ Supported
- React 19 New Features: ✅ Supported
- Future React versions: Will be tested and documented

## Support Matrix Summary

| Environment | Min Version | Recommended | Notes |
|-------------|-------------|-------------|-------|
| React | 16.8.0 | 18.0+ | Hooks required |
| Node.js | 14.0.0 | 18.0+ | Build environment |
| TypeScript | 4.1+ | 5.0+ | Optional but recommended |
| Tailwind CSS | 3.0+ | 3.4+ | Peer dependency for styling |
