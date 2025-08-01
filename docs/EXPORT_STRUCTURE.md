# Package.json Exports Structure

This document describes the export structure of the `@liquidify/components` package and how it aligns with the Vite build configuration.

## Overview

The package uses a dual-format export structure supporting both ESM (ES Modules) and CJS (CommonJS) formats, with consistent path patterns and comprehensive TypeScript support.

## Export Patterns

### Main Entry Points

```json
{
  "main": "./dist/libs/components/cjs/index.cjs", // CommonJS entry
  "module": "./dist/libs/components/index.mjs", // ESM entry
  "types": "./dist/libs/components/index.d.ts", // TypeScript definitions
  "style": "./dist/libs/components/liquidui.css" // CSS styles
}
```

### Bundle Exports

Bundle exports provide grouped functionality for better tree-shaking and performance:

```json
{
  "./{bundle-name}": {
    "types": "./dist/libs/components/bundles/{bundle-name}.d.ts",
    "import": "./dist/libs/components/{bundle-name}.mjs",
    "require": "./dist/libs/components/cjs/{bundle-name}.cjs"
  }
}
```

**Available Bundles:**

- `accessibility` - Accessibility utilities and components
- `advanced` - Advanced components and features
- `animations` - Animation utilities and hooks
- `core` - Core functionality and utilities
- `data-display` - Data visualization components
- `feedback` - User feedback components
- `forms` - Form components and validation
- `layout` - Layout and structural components
- `navigation` - Navigation components
- `physics` - Physics-based interactions
- `ssr` - Server-side rendering utilities
- `tokens` - Design tokens and theming

### Individual Component Exports

Individual component exports allow for precise imports:

```json
{
  "./{component-name}": {
    "types": "./dist/libs/components/components/{component-name}.d.ts",
    "import": "./dist/libs/components/components/{component-name}.mjs",
    "require": "./dist/libs/components/cjs/components/{component-name}.cjs"
  }
}
```

**Available Components:**

- `button` - Glass button component
- `card` - Glass card component
- `input` - Glass input component
- `avatar` - Glass avatar component
- `modal` - Glass modal component

### CSS Exports

CSS can be imported directly:

```json
{
  "./css": "./dist/libs/components/liquidui.css",
  "./styles": "./dist/libs/components/liquidui.css"
}
```

## Path Structure Consistency

### CJS Path Pattern

All CommonJS exports follow a consistent pattern using the `cjs/` prefix:

```
./dist/libs/components/cjs/{path}.cjs
```

**Examples:**

- Main: `./dist/libs/components/cjs/index.cjs`
- Bundles: `./dist/libs/components/cjs/accessibility.cjs`
- Components: `./dist/libs/components/cjs/components/button.cjs`

### ESM Path Pattern

ESM exports use direct paths without prefixes:

```
./dist/libs/components/{path}.mjs
```

**Examples:**

- Main: `./dist/libs/components/index.mjs`
- Bundles: `./dist/libs/components/accessibility.mjs`
- Components: `./dist/libs/components/components/button.mjs`

### TypeScript Path Pattern

Type definitions follow the source structure:

```
./dist/libs/components/{path}.d.ts
```

**Examples:**

- Main: `./dist/libs/components/index.d.ts`
- Bundles: `./dist/libs/components/accessibility.d.ts`
- Components: `./dist/libs/components/components/button.d.ts`

## Build Output Structure

The Vite build configuration generates the following structure:

```
dist/libs/components/
├── index.d.ts                    # Main type definitions
├── index.mjs                     # Main ESM bundle
├── liquidui.css                  # CSS styles
├── accessibility.d.ts            # Bundle type definitions
├── advanced.d.ts
├── animations.d.ts
├── core.d.ts
├── data-display.d.ts
├── feedback.d.ts
├── forms.d.ts
├── layout.d.ts
├── navigation.d.ts
├── physics.d.ts
├── ssr.d.ts
├── tokens.d.ts
├── components/                   # Component files
│   ├── button.d.ts
│   ├── button.mjs
│   ├── card.d.ts
│   ├── card.mjs
│   └── ...
└── cjs/                         # CommonJS files
    ├── index.cjs                # Main CJS bundle
    ├── accessibility.cjs
    ├── advanced.cjs
    ├── components/
    │   ├── button.cjs
    │   ├── card.cjs
    │   └── ...
    └── ...
```

## Usage Examples

### Main Import

```javascript
// ESM
import { GlassButton, GlassCard } from "@liquidify/components";

// CJS
const { GlassButton, GlassCard } = require("@liquidify/components");
```

### Bundle Import

```javascript
// ESM
import { GlassButton } from "@liquidify/components/button";
import { useGlassAnimations } from "@liquidify/components/animations";

// CJS
const { GlassButton } = require("@liquidify/components/button");
const { useGlassAnimations } = require("@liquidify/components/animations");
```

### CSS Import

```javascript
// ESM
import "@liquidify/components/css";

// CJS
require("@liquidify/components/css");
```

## Validation

The export structure is validated using the `validate-exports.js` script:

```bash
# Run validation
bun run validate:exports

# Or directly
node scripts/validate-exports.js
```

The validation script checks:

- ✅ All export paths exist in the build output
- ✅ Consistent CJS path patterns (`cjs/` prefix)
- ✅ Proper TypeScript definition paths
- ✅ ESM and CJS file availability
- ✅ CSS file accessibility

## Vite Configuration Alignment

The Vite configuration in `vite.config.mts` is designed to generate outputs that match the export structure:

```typescript
build: {
  lib: {
    entry: {
      // Main entry
      index: resolve("libs/components/src/index.ts"),
      // Bundle entries
      core: resolve("libs/components/src/bundles/core.ts"),
      // Component entries
      "components/button": resolve("libs/components/src/components/glass-button-refactored/index.ts"),
    },
    formats: ["es", "cjs"],
    fileName: (format, entryName) => {
      const ext = format === "es" ? "mjs" : "cjs";
      if (format === "cjs") {
        return `cjs/${entryName}.${ext}`;
      }
      return `${entryName}.${ext}`;
    },
  }
}
```

## Best Practices

1. **Consistent Naming**: All exports follow consistent naming patterns
2. **Dual Format Support**: Every export supports both ESM and CJS
3. **TypeScript First**: All exports include TypeScript definitions
4. **Tree Shaking**: Bundle exports enable optimal tree shaking
5. **Validation**: Regular validation ensures export integrity

## Troubleshooting

### Common Issues

1. **Missing Build Output**: Run `bun run build:lib` before validation
2. **Path Mismatches**: Ensure Vite config matches export paths
3. **Type Definition Issues**: Check that DTS plugin is configured correctly

### Validation Errors

If validation fails, check:

- Build output exists in `dist/libs/components/`
- All referenced files are present
- Path patterns are consistent
- Vite configuration matches export structure
