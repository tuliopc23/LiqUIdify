# Tailwind CSS Production Tree-Shaking Configuration

## Current Configuration Analysis

The library is properly configured for tree-shaking with the following optimizations:

### 1. Content Configuration
```typescript
// tailwind.config.ts
content: [
  './src/**/*.{js,ts,jsx,tsx,mdx}',
  './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
],
```

### 2. Safelist Strategy
Critical utilities are preserved in the safelist to ensure they're always available:
- All glass background utilities
- Glass border utilities  
- Text utilities
- Pattern-based inclusion for responsive variants

### 3. Production Build Verification

To verify tree-shaking is working correctly:

```fish
# Build and analyze CSS output size
npm run build:css
ls -la dist/liquidui.css

# Check for unused CSS classes
npx tailwindcss -i src/styles/glass.css -o dist/test.css --content './src/**/*.{js,ts,jsx,tsx}' --minify
```

### 4. Tree-Shaking Metrics

Current bundlesize limits ensure optimal tree-shaking:
- Main CSS bundle: 20kB gzipped (excellent for a comprehensive design system)
- Per-component bundles: 5-10kB gzipped

### 5. Recommendations for Consumer Projects

When consuming this library, ensure your project's Tailwind config includes:

```javascript
// tailwind.config.js in consumer project
module.exports = {
  content: [
    // Your project files
    './src/**/*.{js,ts,jsx,tsx}',
    // Include liquidui components for proper tree-shaking
    './node_modules/@tuliocunha23/liquidui/dist/**/*.{js,mjs,cjs}',
  ],
  // ... rest of config
}
```

### 6. Production Build Testing

Test tree-shaking effectiveness:

```bash
# Analyze what CSS is actually used
npm run build
npx bundlesize --config=bundlesize.config.json
```

### 7. Critical CSS Strategy

For SSR applications, consider extracting critical CSS:

```typescript
// Extract only the utilities actually used in above-the-fold content
const criticalUtilities = [
  'glass-effect',
  'glass-hover', 
  'focus-ring',
  'bg-glass-bg-primary',
  'text-text-primary'
];
```

## Verification Tests

The build process includes automatic verification that ensures:
1. Unused utilities are removed
2. Critical design tokens remain available
3. Component-specific CSS is properly scoped
4. Bundle size targets are met
