# Migration Guide

This guide helps you migrate between versions of LiqUIdify and provides compatibility information for upgrading your applications.

## Overview

Migration topics covered:
- Version upgrade paths
- Breaking changes by version
- Component API changes
- Theme system updates
- Bundle structure changes
- Automated migration tools

## Version 2.x to 3.x

### Major Changes

#### New Theme System

The theme system has been completely redesigned for better performance and type safety.

**Before (v2.x):**
```tsx
import { ThemeProvider, createTheme } from 'liquidify';

const theme = createTheme({
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

**After (v3.x):**
```tsx
import { ThemeProvider, defineTheme } from 'liquidify';

const theme = defineTheme({
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f8fafc',
      500: '#64748b',
      900: '#0f172a',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  glass: {
    blur: '12px',
    opacity: 0.1,
    border: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

#### Updated Component APIs

Several components have updated APIs for better consistency:

**GlassButton Changes:**
```tsx
// Before (v2.x)
<GlassButton 
  variant="primary" 
  size="medium"
  loading={true}
  loadingText="Processing..."
>
  Submit
</GlassButton>

// After (v3.x)
<GlassButton 
  variant="solid" 
  size="md"
  loading={true}
  loadingChildren="Processing..."
>
  Submit
</GlassButton>
```

**GlassInput Changes:**
```tsx
// Before (v2.x)
<GlassInput 
  label="Email"
  error="Invalid email"
  helperText="Enter your email address"
  required
/>

// After (v3.x)
<GlassInput 
  label="Email"
  error="Invalid email"
  description="Enter your email address"
  required
/>
```

#### Bundle Structure Changes

Import paths have been updated for better tree shaking:

**Before (v2.x):**
```tsx
import { GlassButton, GlassInput, GlassCard } from 'liquidify';
import { useTheme, useGlass } from 'liquidify/hooks';
import { ThemeProvider } from 'liquidify/providers';
```

**After (v3.x):**
```tsx
// Main bundle (tree-shakeable)
import { GlassButton, GlassInput, GlassCard } from 'liquidify';

// Individual imports (recommended)
import { GlassButton } from 'liquidify/button';
import { GlassInput } from 'liquidify/input';
import { GlassCard } from 'liquidify/card';

// Bundle-specific imports
import { GlassButton, GlassCard } from 'liquidify/core';
import { GlassInput } from 'liquidify/forms';

// Hooks and providers
import { useTheme, useGlass } from 'liquidify/hooks';
import { ThemeProvider } from 'liquidify/theme';
```

### Migration Steps

#### 1. Update Dependencies

```bash
# Update to v3.x
npm install liquidify@^3.0.0
# or
bun add liquidify@^3.0.0

# Update peer dependencies
npm install react@^18.0.0 react-dom@^18.0.0
```

#### 2. Run Migration Script

```bash
# Run automated migration tool
npx @liquidify/migrate v2-to-v3

# Or install globally
npm install -g @liquidify/migrate
liquidify-migrate v2-to-v3
```

#### 3. Update Theme Configuration

Create a new theme configuration file:

```tsx
// theme.config.ts
import { defineTheme } from 'liquidify';

export const theme = defineTheme({
  colors: {
    // Update color system to use scales
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Your old primary color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    // Convert other colors...
  },
  spacing: {
    // Add new spacing tokens
    xs: '0.25rem',
    sm: '0.5rem',    // Your old sm
    md: '1rem',      // Your old md
    lg: '1.5rem',    // Your old lg
    xl: '2rem',
    '2xl': '3rem',
  },
  glass: {
    // New glass configuration
    blur: '12px',
    opacity: 0.1,
    border: 0.2,
    shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
});
```

#### 4. Update Component Props

Replace deprecated props with new equivalents:

```tsx
// Update all GlassButton instances
function updateButtons() {
  // Before
  <GlassButton variant="primary" size="medium" loading loadingText="Loading...">
    Submit
  </GlassButton>

  // After
  <GlassButton variant="solid" size="md" loading loadingChildren="Loading...">
    Submit
  </GlassButton>
}

// Update GlassInput instances
function updateInputs() {
  // Before
  <GlassInput helperText="Enter your name" />

  // After
  <GlassInput description="Enter your name" />
}
```

#### 5. Update CSS Custom Properties

If you were customizing CSS variables, update to new naming:

```css
/* Before (v2.x) */
:root {
  --glass-primary-color: #3b82f6;
  --glass-backdrop-blur: 10px;
  --glass-background-opacity: 0.1;
}

/* After (v3.x) */
:root {
  --liquidify-color-primary-500: #3b82f6;
  --liquidify-glass-blur: 12px;
  --liquidify-glass-opacity: 0.1;
}
```

## Version 1.x to 2.x

### Major Changes

#### Renamed Components

Several components were renamed for consistency:

```tsx
// Before (v1.x)
import { 
  GlassModal, 
  GlassTooltip, 
  GlassDropdown 
} from 'liquidify';

// After (v2.x)
import { 
  GlassDialog,    // GlassModal → GlassDialog
  GlassPopover,   // GlassTooltip → GlassPopover
  GlassSelect     // GlassDropdown → GlassSelect
} from 'liquidify';
```

#### Updated Props

```tsx
// GlassButton props update
// Before (v1.x)
<GlassButton color="blue" variant="filled">Click me</GlassButton>

// After (v2.x)
<GlassButton variant="primary">Click me</GlassButton>

// GlassInput props update
// Before (v1.x)
<GlassInput placeholder="Enter text" validation="error" />

// After (v2.x)
<GlassInput placeholder="Enter text" error="Invalid input" />
```

### Migration Steps for v1 to v2

#### 1. Install Migration Tool

```bash
npm install -g @liquidify/migrate@1.x
```

#### 2. Run Component Rename Script

```bash
# Automatically rename components
liquidify-migrate rename-components --src="./src" --dry-run

# Apply changes
liquidify-migrate rename-components --src="./src"
```

#### 3. Update Props Manually

Search and replace common prop changes:

```bash
# Search for old props and update
grep -r "color=" src/ | grep GlassButton
grep -r "validation=" src/ | grep GlassInput
```

## Breaking Changes by Version

### v3.0.0

- **Theme System**: Complete redesign with new API
- **Color Tokens**: Moved to scale-based system (50-900)
- **Component Props**: Standardized prop names
- **Bundle Structure**: New import paths for better tree shaking
- **CSS Variables**: Updated naming convention
- **TypeScript**: Stricter type definitions

### v2.0.0

- **Component Names**: Several components renamed
- **Props Structure**: Simplified prop APIs
- **Theme Provider**: Updated theme structure
- **CSS Classes**: New class naming convention

### v1.5.0

- **Glass Effects**: Improved backdrop-filter implementation
- **Animation System**: New animation utilities

## Automated Migration Tools

### CLI Migration Tool

Install and use the official migration tool:

```bash
# Install globally
npm install -g @liquidify/migrate

# Check available migrations
liquidify-migrate --list

# Run specific migration
liquidify-migrate v2-to-v3 --src="./src" --dry-run

# Apply migration
liquidify-migrate v2-to-v3 --src="./src"
```

### VS Code Extension

Install the LiqUIdify VS Code extension for migration assistance:

```bash
# Install extension
code --install-extension liquidify.liquidify-migration-helper
```

Features:
- Automatic prop renaming suggestions
- Component migration warnings
- Theme configuration helpers
- Import path updates

### ESLint Rules

Add migration ESLint rules to catch deprecated usage:

```bash
npm install --save-dev @liquidify/eslint-plugin-migration
```

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['@liquidify/migration'],
  rules: {
    '@liquidify/migration/no-deprecated-components': 'error',
    '@liquidify/migration/no-deprecated-props': 'error',
    '@liquidify/migration/prefer-new-imports': 'warn',
  },
};
```

## Codemods

Use automated codemods for complex transformations:

```bash
# Install jscodeshift globally
npm install -g jscodeshift

# Run LiqUIdify codemods
npx @liquidify/codemods v2-to-v3 src/

# Available codemods:
# - theme-config-transform
# - component-props-transform
# - import-paths-transform
# - css-variables-transform
```

### Custom Codemod Example

```javascript
// liquidify-v3-transform.js
const { transform } = require('@liquidify/codemods');

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Transform GlassButton variant prop
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: 'GlassButton' }
      }
    })
    .find(j.JSXAttribute, {
      name: { name: 'variant' },
      value: { value: 'primary' }
    })
    .forEach(path => {
      path.value.value.value = 'solid';
    });

  return root.toSource({ quote: 'single' });
};
```

## Testing Migration

### Unit Tests Update

Update your unit tests for new APIs:

```tsx
// Before (v2.x)
import { render, screen } from '@testing-library/react';
import { GlassButton } from 'liquidify';

test('renders button with primary variant', () => {
  render(<GlassButton variant="primary">Click me</GlassButton>);
  expect(screen.getByRole('button')).toHaveClass('glass-button-primary');
});

// After (v3.x)
import { render, screen } from '@testing-library/react';
import { GlassButton } from 'liquidify';

test('renders button with solid variant', () => {
  render(<GlassButton variant="solid">Click me</GlassButton>);
  expect(screen.getByRole('button')).toHaveClass('glass-button-solid');
});
```

### Snapshot Testing

Update snapshots after migration:

```bash
# Update all snapshots
npm test -- --updateSnapshot

# Or with Jest
jest --updateSnapshot
```

### Integration Tests

Verify theme and component integration:

```tsx
// test/migration.integration.test.tsx
import { render } from '@testing-library/react';
import { ThemeProvider, defineTheme } from 'liquidify';
import { App } from '../src/App';

const theme = defineTheme({
  colors: {
    primary: {
      500: '#3b82f6',
    },
  },
});

test('app renders correctly with v3 theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  // Add assertions
});
```

## Common Migration Issues

### 1. Import Errors

**Issue**: Components not found after upgrade
```bash
Module not found: Can't resolve 'liquidify/GlassButton'
```

**Solution**: Update import paths
```tsx
// Fix import path
import { GlassButton } from 'liquidify/button';
// or
import { GlassButton } from 'liquidify';
```

### 2. Theme Provider Errors

**Issue**: Theme shape doesn't match
```bash
Type 'OldTheme' is not assignable to type 'Theme'
```

**Solution**: Update theme structure
```tsx
// Use defineTheme helper
const theme = defineTheme({
  // New theme structure
});
```

### 3. CSS Variable Issues

**Issue**: Custom CSS no longer applies
```css
/* Old variables don't exist */
--glass-primary-color: #3b82f6;
```

**Solution**: Update variable names
```css
/* Use new variable names */
--liquidify-color-primary-500: #3b82f6;
```

### 4. TypeScript Errors

**Issue**: Type errors after upgrade
```bash
Property 'helperText' does not exist on type 'GlassInputProps'
```

**Solution**: Update prop names
```tsx
// Change helperText to description
<GlassInput description="Helper text" />
```

## Rollback Strategy

If migration issues occur, you can rollback:

### 1. Package Rollback

```bash
# Rollback to previous version
npm install liquidify@^2.x.x

# Or use exact version
npm install liquidify@2.5.0
```

### 2. Git Rollback

```bash
# Create backup branch before migration
git checkout -b pre-liquidify-v3-backup

# After migration issues
git checkout main
git reset --hard pre-liquidify-v3-backup
```

### 3. Gradual Migration

Migrate incrementally by aliasing old imports:

```tsx
// Create compatibility layer
// compat.ts
export { 
  GlassDialog as GlassModal,
  GlassPopover as GlassTooltip 
} from 'liquidify';

// Use in components during transition
import { GlassModal } from './compat';
```

## Migration Checklist

### Pre-Migration
- [ ] Create backup branch
- [ ] Update dependencies
- [ ] Run current test suite
- [ ] Document custom implementations

### During Migration
- [ ] Run migration tools
- [ ] Update theme configuration
- [ ] Fix import paths
- [ ] Update component props
- [ ] Update CSS variables
- [ ] Update tests

### Post-Migration
- [ ] Run full test suite
- [ ] Check bundle size
- [ ] Verify accessibility
- [ ] Test in all supported browsers
- [ ] Update documentation
- [ ] Deploy to staging

## Support

If you encounter migration issues:

1. Check the [GitHub Issues](https://github.com/liquidify/liquidify/issues) for known problems
2. Use the migration tool's `--dry-run` flag first
3. Join our [Discord community](https://discord.gg/liquidify) for help
4. Review the [changelog](https://github.com/liquidify/liquidify/blob/main/CHANGELOG.md) for detailed changes

## Migration Resources

- [Migration Tool Documentation](https://liquidify.dev/tools/migrate)
- [Codemod Repository](https://github.com/liquidify/codemods)
- [Migration Examples](https://github.com/liquidify/migration-examples)
- [Version Comparison Tool](https://liquidify.dev/compare)

Remember: Take your time with migration. Test thoroughly at each step to ensure your application continues to work correctly.