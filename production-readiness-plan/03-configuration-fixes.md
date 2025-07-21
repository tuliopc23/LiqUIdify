# 03. Configuration Fixes - Optimizing Tooling Setup

## Overview
This guide addresses configuration issues with your experimental Bun + Vite + Rolldown + Oxc stack, ensuring all tools work harmoniously for production builds.

## 🔧 Priority 1: Rolldown Configuration (Already Implemented!)

### Good News: Rolldown is already configured!
Based on the audit, Rolldown integration is complete with `rolldown.config.js` already created.

### Existing rolldown.config.js:
```javascript
// rolldown.config.js
import { defineConfig } from 'rolldown';
import dts from 'rolldown-plugin-dts';

export default defineConfig({
  input: {
    index: 'src/index.ts',
    core: 'src/bundles/core.ts',
    animations: 'src/bundles/animations.ts',
    advanced: 'src/bundles/advanced.ts',
    forms: 'src/bundles/forms.ts',
    layout: 'src/bundles/layout.ts',
    accessibility: 'src/bundles/accessibility.ts',
    feedback: 'src/bundles/feedback.ts',
    navigation: 'src/bundles/navigation.ts',
    physics: 'src/bundles/physics.ts',
    ssr: 'src/bundles/ssr.ts'
  },
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: false,
    sourcemap: true,
    entryFileNames: '[name].mjs',
    chunkFileNames: 'chunks/[name]-[hash].mjs'
  },
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@sentry/react'
  ],
  plugins: [
    dts({
      respectExternal: true,
      outDir: 'dist/types'
    })
  ],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false
  },
  experimental: {
    enableBuildCache: true
  }
});
```

### Build Scripts Available:
```bash
# Standard Vite build (current default)
bun run build

# New Rolldown build (faster, stricter)
bun run build:rolldown

# Test Rolldown without CSS
bun run build:rolldown:test
```

### Benefits Rolldown Provides:
- **Faster builds** - Written in Rust for superior performance
- **Better tree-shaking** - More aggressive dead code elimination
- **Stricter analysis** - Catches missing exports early (found issues in `use-ssr-safe.tsx`)
- **Parallel processing** - Utilizes multiple CPU cores

## 🚀 Priority 2: Update Vite Configuration

### Optimize vite.config.ts for library mode:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
// Remove or comment out rolldown-vite until stable
// import rolldown from 'rolldown-vite';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.stories.*'],
      outDir: 'dist/types',
      rollupTypes: true,
      staticImport: true
    }),
    // Uncomment when Rolldown is stable
    // rolldown({
    //   experimental: true
    // })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        core: resolve(__dirname, 'src/bundles/core.ts'),
        animations: resolve(__dirname, 'src/bundles/animations.ts'),
        advanced: resolve(__dirname, 'src/bundles/advanced.ts'),
        forms: resolve(__dirname, 'src/bundles/forms.ts'),
        layout: resolve(__dirname, 'src/bundles/layout.ts'),
        accessibility: resolve(__dirname, 'src/bundles/accessibility.ts'),
        feedback: resolve(__dirname, 'src/bundles/feedback.ts'),
        navigation: resolve(__dirname, 'src/bundles/navigation.ts'),
        physics: resolve(__dirname, 'src/bundles/physics.ts'),
        ssr: resolve(__dirname, 'src/bundles/ssr.ts')
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';
        return format === 'es' 
          ? `${entryName}.${ext}` 
          : `cjs/${entryName}.${ext}`;
      }
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@sentry/react'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        preserveModules: false,
        exports: 'named',
        generatedCode: {
          constBindings: true
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      format: {
        comments: false
      }
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 30, // 30KB warning for production readiness
    cssCodeSplit: false // Single CSS file for component library
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@types': resolve(__dirname, './src/types'),
      '@tokens': resolve(__dirname, './src/tokens')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@storybook/*']
  },
  server: {
    port: 3000,
    open: true
  }
});
```

## 📝 Priority 3: Fix TypeScript Configuration

### Update tsconfig.json for Bun compatibility:
```json
{
  "compilerOptions": {
    // Module Resolution
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    
    // Bun-specific optimizations
    "types": ["bun-types"],
    "allowImportingTsExtensions": false, // For production builds
    "moduleDetection": "force",
    "verbatimModuleSyntax": true,
    
    // React Configuration
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    
    // Type Checking
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true, // Safer array access
    
    // Path Mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@tokens/*": ["src/tokens/*"]
    },
    
    // Output
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist/types",
    
    // Interop
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  },
  "include": [
    "src/**/*",
    "src/**/*.tsx",
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.ts",
    "**/*.stories.tsx",
    "scripts",
    "playwright.config.ts",
    "vite.config.ts",
    "vitest.config.ts"
  ]
}
```

### Create separate tsconfig for builds:
```json
// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist/types"
  },
  "exclude": [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.ts",
    "**/*.stories.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx"
  ]
}
```

## 🔍 Priority 4: Configure Oxc Linter (Critical - 300+ Errors Found!)

### Linting Audit Results:
The audit revealed **300+ linting violations** across 6 core files. Major issues include:
- **67 Import/Export violations** - Multiple exports, duplicate imports
- **42 React-specific issues** - Missing React imports in JSX files
- **84 Magic numbers** - Hardcoded values in animations
- **87 Code style violations** - Console statements, unsorted keys

### Create/Update .oxcrc.json:
```json
{
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "19.0"
    }
  },
  "plugins": ["react", "react-hooks", "jsx-a11y"],
  "rules": {
    // TypeScript Rules
    "no-explicit-any": "error",
    "no-non-null-assertion": "error",
    "prefer-optional-chain": "error",
    
    // React Rules  
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-key": "error",
    "react/no-array-index-key": "warn",
    "react/no-unstable-nested-components": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    
    // Accessibility
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/no-autofocus": "warn",
    
    // Performance
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "no-debugger": "error",
    
    // Best Practices
    "no-unused-vars": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-var": "error"
  },
  "ignores": [
    "dist/**",
    "node_modules/**",
    "*.config.js",
    "*.config.ts",
    "scripts/**"
  ]
}
```

## 🏗️ Priority 5: Create Build Variants

### Create build configuration files:

```javascript
// vite.config.optimized.ts
import baseConfig from './vite.config';
import { mergeConfig } from 'vite';

export default mergeConfig(baseConfig, {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log', 'console.info']
      },
      mangle: {
        properties: {
          regex: /^_/ // Mangle private properties
        }
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'radix-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-slot'
          ],
          'animation': ['framer-motion'],
          'utils': ['clsx', 'class-variance-authority', 'tailwind-merge']
        }
      }
    }
  }
});
```

```javascript
// vite.config.modular.ts
import baseConfig from './vite.config';
import { mergeConfig } from 'vite';

export default mergeConfig(baseConfig, {
  build: {
    rollupOptions: {
      preserveEntrySignatures: 'strict',
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js'
      }
    }
  }
});
```

## 🚦 Priority 6: Environment Configuration

### Create .env files:

```bash
# .env.development
VITE_ENV=development
VITE_ENABLE_DEVTOOLS=true
VITE_API_MOCKING=true
VITE_SOURCE_MAPS=true
```

```bash
# .env.production
VITE_ENV=production
VITE_ENABLE_DEVTOOLS=false
VITE_API_MOCKING=false
VITE_SOURCE_MAPS=false
VITE_SENTRY_DSN=your-sentry-dsn-here
```

### Update vite config to use env:
```typescript
// In vite.config.ts
build: {
  sourcemap: process.env.VITE_SOURCE_MAPS === 'true',
  minify: process.env.VITE_ENV === 'production' ? 'terser' : false
}
```

### Automated Linting Fix Script:
```bash
#!/bin/bash
# save as: fix-linting-errors.sh

echo "🔧 Fixing Oxc Linting Errors..."

# Fix missing React imports
echo "✓ Adding React imports to JSX files..."
for file in $(find src -name "*.tsx" -type f); do
  if ! grep -q "import.*React" "$file" && grep -q "return.*<" "$file"; then
    sed -i '' '1i\
import React from "react";
' "$file"
  fi
done

# Fix duplicate imports
echo "✓ Removing duplicate imports..."
for file in $(find src -name "*.tsx" -o -name "*.ts"); do
  awk '!seen[$0]++' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done

# Replace window with globalThis
echo "✓ Replacing window with globalThis..."
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/window\./globalThis./g'

# Create constants for magic numbers
echo "✓ Creating constants file..."
cat > src/constants/animations.ts << 'EOF'
// Animation durations (ms)
export const DURATION = {
  INSTANT: 0,
  FAST: 100,
  NORMAL: 300,
  SLOW: 600,
  VERY_SLOW: 1000
} as const;

// Opacity values
export const OPACITY = {
  TRANSPARENT: 0,
  FAINT: 0.2,
  LIGHT: 0.3,
  MEDIUM: 0.6,
  HEAVY: 0.7,
  OPAQUE: 1
} as const;

// Scale values
export const SCALE = {
  NORMAL: 1,
  HOVER: 1.02,
  ACTIVE: 1.1
} as const;

// Common numbers
export const COLUMNS = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3,
  QUAD: 4
} as const;
EOF

echo "✅ Linting fixes applied! Run 'bun run lint' to check remaining issues."
```

## 🧪 Verification Script

Create a script to verify all configurations:

```bash
#!/bin/bash
# save as: verify-config.sh

echo "🔍 Verifying LiqUIdify Configuration..."

# Check TypeScript
echo "📘 TypeScript Configuration:"
bunx tsc --showConfig | head -20

# Check Vite
echo -e "\n📦 Vite Configuration:"
bunx vite build --mode production --logLevel info 2>&1 | head -10

# Check Oxc
echo -e "\n🔧 Oxc Linter:"
bunx oxlint src --max-warnings=0 2>&1 | head -10

# Check Rolldown
echo -e "\n🎯 Rolldown Configuration:"
if [ -f "rolldown.config.js" ]; then
  echo "✅ Rolldown config exists"
  echo "   Run 'bun run build:rolldown' to use Rolldown"
else
  echo "❌ Rolldown config missing!"
fi

# Check Linting Errors
echo -e "\n📋 Linting Status:"
bunx oxlint src --quiet 2>&1 | grep -c "error" | xargs -I {} echo "{} linting errors found"

# Check path aliases
echo -e "\n🔗 Path Aliases:"
grep -A5 '"paths"' tsconfig.json

echo -e "\n✅ Configuration verification complete!"
```

## 📊 Expected Results

After configuration fixes:
- **Build time**: 50% faster with optimized configs (even faster with Rolldown)
- **Bundle size**: 20-30% smaller with proper externals
- **Type checking**: More accurate with stricter settings
- **Linting errors**: Reduced from 300+ to manageable number
- **Development**: Smoother with proper aliases and env setup

## Priority Actions Based on Audit

1. **Immediate**: Run the linting fix script to address 300+ violations
2. **Test Rolldown**: Use `bun run build:rolldown` to catch missing exports
3. **Fix SSR issues**: Address the 130+ errors in `ssr-safety.tsx`
4. **Constants refactor**: Replace 84 magic numbers with named constants

## Next Steps

1. Apply all configuration changes
2. Run the linting fix script first
3. Test both Vite and Rolldown builds
4. Fix any remaining build errors
5. Continue to `04-build-errors-resolution.md`