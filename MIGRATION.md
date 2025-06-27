# Migration Guide: glass-ui → liquidui v1.0.0

This guide will help you migrate your project from `glass-ui` to `@tuliopc23/liquidui` for the stable v1.0.0 release.

## 🎯 Overview

The library has been officially renamed from `glass-ui` to `liquidui` to better reflect its liquid glass aesthetic and establish a stronger brand identity. This is the only breaking change in v1.0.0.

## 🚀 Quick Migration

For most projects, use the automated migration script:

```bash
# Download and run the migration script
curl -fsSL https://raw.githubusercontent.com/tuliopc23/liquidui/main/liquidui-migration.sh | bash

# OR run locally if you have the script
./liquidui-migration.sh
```

## 📋 Manual Migration Steps

### 1. Update Package Installation

```bash
# Remove old package
npm uninstall glass-ui @tuliopc23/glass-ui

# Install new package
npm install @tuliopc23/liquidui
```

**With Yarn:**
```bash
yarn remove glass-ui @tuliopc23/glass-ui
yarn add @tuliopc23/liquidui
```

**With pnpm:**
```bash
pnpm remove glass-ui @tuliopc23/glass-ui
pnpm add @tuliopc23/liquidui
```

### 2. Update Import Statements

**Before (v0.x):**
```tsx
import { GlassButton, GlassCard } from 'glass-ui'
import 'glass-ui/dist/glass.css'

// OR
import { GlassButton, GlassCard } from '@tuliopc23/glass-ui'
import '@tuliopc23/glass-ui/dist/glass.css'
```

**After (v1.0.0):**
```tsx
import { GlassButton, GlassCard } from '@tuliopc23/liquidui'
import '@tuliopc23/liquidui/dist/liquidui.css'
```

### 3. Update CSS Imports

Update any CSS file imports:

```css
/* Before */
@import '@tuliopc23/glass-ui/dist/glass.css';

/* After */
@import '@tuliopc23/liquidui/dist/liquidui.css';
```

### 4. Update HTML CDN Links

```html
<!-- Before -->
<link rel="stylesheet" href="https://unpkg.com/glass-ui/dist/glass.css">
<link rel="stylesheet" href="https://unpkg.com/@tuliopc23/glass-ui/dist/glass.css">

<!-- After -->
<link rel="stylesheet" href="https://unpkg.com/@tuliopc23/liquidui/dist/liquidui.css">
```

## 🔍 Automated Search & Replace

Use these commands to update your entire codebase:

### Update Import Statements
```bash
# Update all TypeScript/JavaScript files
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
  xargs sed -i 's/from ["'"'"']glass-ui["'"'"']/from "@tuliopc23\/liquidui"/g'

find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
  xargs sed -i 's/from ["'"'"']@tuliopc23\/glass-ui["'"'"']/from "@tuliopc23\/liquidui"/g'
```

### Update CSS Imports
```bash
# Update CSS imports in all files
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" | \
  xargs sed -i 's/@tuliopc23\/glass-ui\/dist\/glass.css/@tuliopc23\/liquidui\/dist\/liquidui.css/g'

find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" | \
  xargs sed -i 's/glass-ui\/dist\/glass.css/@tuliopc23\/liquidui\/dist\/liquidui.css/g'
```

### Update package.json
```bash
# Update dependencies in package.json
sed -i 's/"glass-ui"/"@tuliopc23\/liquidui"/g' package.json
sed -i 's/"@tuliopc23\/glass-ui"/"@tuliopc23\/liquidui"/g' package.json
```

### Update HTML Files
```bash
# Update CDN links in HTML files
find . -name "*.html" | xargs sed -i 's/unpkg.com\/glass-ui/unpkg.com\/@tuliopc23\/liquidui/g'
find . -name "*.html" | xargs sed -i 's/unpkg.com\/@tuliopc23\/glass-ui/unpkg.com\/@tuliopc23\/liquidui/g'
```

## ✅ What Stays the Same

The following remain **completely unchanged**:

- ✅ **Component Names** - All `Glass*` components work exactly the same
- ✅ **Component APIs** - All props, methods, and hooks are identical
- ✅ **Physics Engine** - Magnetic hover, spring physics, animations unchanged
- ✅ **Theme System** - `ThemeProvider`, `useTheme` work identically
- ✅ **CSS Classes** - All `.liquid-glass-*` classes remain the same
- ✅ **TypeScript** - All type definitions are identical
- ✅ **Styling** - Visual appearance and behavior unchanged

## 🆕 New Features in v1.0.0

### Enhanced Liquid Physics Aliases

New liquid-prefixed exports for better brand consistency:

```tsx
// New liquid-prefixed aliases (recommended for new code)
import { 
  LiquidVector2D,
  LiquidSpringPhysics,
  useLiquidMagneticHover,
  useLiquidRepulsionEffect,
  createLiquidMorph,
  LIQUID_PHYSICS_CONSTANTS
} from '@tuliopc23/liquidui'

// Original names still work (backward compatible)
import { 
  Vector2D,              // Still available
  SpringPhysics,         // Still available
  useMagneticHover,      // Still available
  useRepulsionEffect,    // Still available
  createFluidMorph,      // Still available
  PHYSICS_CONSTANTS      // Still available
} from '@tuliopc23/liquidui'
```

## 🧪 Testing Your Migration

After migration, verify everything works:

1. **Install dependencies:**
   ```bash
   npm install  # or yarn/pnpm install
   ```

2. **Start your development server:**
   ```bash
   npm start    # or your dev command
   ```

3. **Check for TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

4. **Run your tests:**
   ```bash
   npm test
   ```

5. **Verify visual appearance:**
   - All components should look identical
   - Animations and interactions should work the same
   - No console errors should appear

## 🛠 Framework-Specific Notes

### Next.js

Update your `next.config.js` if you have specific configurations:

```js
// next.config.js
module.exports = {
  transpilePackages: ['@tuliopc23/liquidui'],
  // ... other config
}
```

### Vite

Update your `vite.config.ts` if needed:

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    include: ['@tuliopc23/liquidui']
  }
})
```

### Create React App

No additional configuration needed.

### Remix

Update any specific imports in your route files.

## 🔧 Troubleshooting

### Common Issues

1. **Module not found error**
   - Ensure you've installed `@tuliopc23/liquidui`
   - Check that old packages are uninstalled
   - Clear node_modules and reinstall

2. **TypeScript errors**
   - Run `npx tsc --noEmit` to check for type issues
   - Ensure you're importing from the correct package name

3. **Styling issues**
   - Verify CSS import path is updated to `liquidui.css`
   - Check that the CSS file is being loaded

4. **Build errors**
   - Clear build cache (`rm -rf dist` or similar)
   - Restart your development server

### Getting Help

If you encounter issues:

1. **Check the changelog:** [CHANGELOG.md](./CHANGELOG.md)
2. **Search existing issues:** [GitHub Issues](https://github.com/tuliopc23/liquidui/issues)
3. **Create a new issue:** Include migration details and error messages
4. **Join discussions:** [GitHub Discussions](https://github.com/tuliopc23/liquidui/discussions)

## 📊 Migration Checklist

Use this checklist to ensure complete migration:

- [ ] Removed old packages (`glass-ui`, `@tuliopc23/glass-ui`)
- [ ] Installed new package (`@tuliopc23/liquidui`)
- [ ] Updated all import statements
- [ ] Updated CSS imports
- [ ] Updated HTML CDN links (if any)
- [ ] Updated package.json dependencies
- [ ] Tested application starts without errors
- [ ] Verified components render correctly
- [ ] Checked TypeScript compilation
- [ ] Ran test suite
- [ ] Updated documentation/README
- [ ] Committed changes to version control

## 🎉 Welcome to LiquidiUI v1.0.0!

Congratulations on successfully migrating to LiquidiUI v1.0.0! You now have:

- 🎯 **Stable API** - Semantic versioning commitment
- 🏷️ **Clear Branding** - Established liquidui identity
- 📦 **Production Ready** - Battle-tested components
- 🔒 **Breaking Change Boundary** - Clear upgrade path

## 📚 Resources

- **Documentation:** [liquidui.dev](https://liquidui.dev)
- **Storybook:** [Interactive examples](https://storybook-liquidui.vercel.app)
- **GitHub:** [Source code](https://github.com/tuliopc23/liquidui)
- **NPM:** [Package registry](https://www.npmjs.com/package/@tuliopc23/liquidui)
- **Changelog:** [Release notes](./CHANGELOG.md)

## 💖 Community

- **Discussions:** Share your experience and ask questions
- **Issues:** Report bugs or request features  
- **Contributions:** Help improve the library
- **Sponsorship:** Support continued development

Thank you for being part of the LiquidiUI community! 🚀
