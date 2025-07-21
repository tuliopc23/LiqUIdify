# 02. Dependency Cleanup - Optimizing Package.json

## Overview
This guide provides a systematic approach to cleaning up dependencies, removing redundancies, and optimizing your package.json for production with the Bun + Vite + Rolldown + Oxc stack.

## Current State Analysis

### Dependency Count
- **Dependencies**: 12 packages (should be ~5-6 for a component library)
- **DevDependencies**: 56 packages
- **Total**: 68 packages (target: ~40-45)

### Key Issues Identified
1. **Storybook dependencies in production** - Should be devDependencies
2. **Duplicate animation libraries** - Both Framer Motion and GSAP
3. **Deprecated packages** - `@storybook/docs-mdx`
4. **Unclear packages** - `oparser` with no usage
5. **Build tools in dependencies** - `oxc`, `oxlint` should be devDependencies

## 🧹 Step 1: Move Misplaced Dependencies

### Move to devDependencies:
```bash
# These are build/dev tools, not runtime dependencies
bun remove @storybook/blocks @storybook/docs-mdx @tailwindcss/postcss oxc oxlint

# Re-add as devDependencies
bun add -d @storybook/blocks @tailwindcss/postcss oxc oxlint
```

### Remove deprecated/unused:
```bash
# Remove deprecated Storybook MDX plugin
bun remove @storybook/docs-mdx

# Remove unclear/unused package
bun remove oparser
```

## 🎯 Step 2: Choose Animation Strategy

You currently have both Framer Motion (12.23.6) and GSAP (3.13.0). Choose ONE:

### Option A: Keep Framer Motion (Recommended)
**Pros**: React-native, declarative API, smaller bundle for basic animations  
**Best for**: Component libraries, React-first approach

```bash
# Remove GSAP
bun remove gsap

# Update imports
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "gsap" | while read file; do
  echo "File using GSAP: $file - needs migration to Framer Motion"
done
```

### Option B: Keep GSAP
**Pros**: More powerful, better for complex animations  
**Best for**: Advanced physics, timeline control

```bash
# Remove Framer Motion
bun remove framer-motion

# Update imports
find src -name "*.tsx" -o -name "*.ts" | xargs grep -l "framer-motion" | while read file; do
  echo "File using Framer Motion: $file - needs migration to GSAP"
done
```

## 🔍 Step 3: Audit @types Packages with Bun

With Bun's native TypeScript support, review @types needs:

### Keep these @types:
```json
{
  "devDependencies": {
    "@types/react": "^19.1.8",      // ✅ Keep - React types
    "@types/react-dom": "^19.1.6",  // ✅ Keep - React DOM types
    "@types/pngjs": "^6.0.5"        // ✅ Keep - Third-party library
  }
}
```

### Remove if present:
- `@types/node` - Bun provides Node.js types
- `@types/bun` - Built into Bun
- Web API types - Included in TypeScript

## 📦 Step 4: Optimize Production Dependencies

### Final production dependencies should be:
```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.6",  // OR gsap
    "lucide-react": "^0.525.0",
    "tailwind-merge": "^3.3.1"
  }
}
```

### Move these to devDependencies:
```bash
# These are for development/documentation only
bun remove prism-react-renderer react-live
bun add -d prism-react-renderer react-live
```

## 🚀 Step 5: Update Peer Dependencies

Ensure peer dependencies are correctly configured:

```json
{
  "peerDependencies": {
    "react": ">=18.0.0 || ^19.0.0",      // Support React 18 and 19
    "react-dom": ">=18.0.0 || ^19.0.0",  // Match React version
    "@sentry/react": ">=9.0.0"           // Optional error tracking
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": false  // Required for component library
    },
    "react-dom": {
      "optional": false  // Required for component library
    },
    "@sentry/react": {
      "optional": true   // Optional feature
    }
  }
}
```

## 🛠️ Step 6: Consolidate Build Tools

With your experimental stack, ensure tools don't conflict:

### Remove duplicates:
```bash
# If you have both vite-plugin-dts and rolldown-plugin-dts
bun remove vite-plugin-dts  # Keep rolldown version
```

### Verify Rolldown setup:
```bash
# Check if rolldown is properly configured
ls -la rolldown.config.js || echo "⚠️  Rolldown config missing!"
```

## 📊 Step 7: Run Dependency Audit

### Check for vulnerabilities:
```bash
bun audit
```

### Check for unused dependencies:
```bash
# Install depcheck globally if needed
bunx depcheck
```

### Analyze bundle impact:
```bash
# Check size impact of each dependency
bunx bundlephobia-cli framer-motion class-variance-authority
```

## 🎯 Final Optimized Package.json

After cleanup, your dependencies section should look like:

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.6",
    "lucide-react": "^0.525.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    // All build tools, test tools, and development utilities
    // Including: @storybook/*, vite, typescript, oxc, etc.
  },
  "peerDependencies": {
    "react": ">=18.0.0 || ^19.0.0",
    "react-dom": ">=18.0.0 || ^19.0.0",
    "@sentry/react": ">=9.0.0"
  }
}
```

## 🧪 Verification Steps

1. **Clean install**:
```bash
rm -rf node_modules bun.lockb
bun install
```

2. **Build test**:
```bash
bun run build
```

3. **Check bundle size**:
```bash
bun run analyze:bundles
```

4. **Verify no missing deps**:
```bash
bun run dev  # Should start without errors
```

## 📈 Expected Improvements

After cleanup:
- **30-40% reduction** in node_modules size
- **Faster installs** with Bun
- **Cleaner dependency tree**
- **No version conflicts**
- **Reduced security vulnerabilities**

## ⚡ Quick Cleanup Script

Save and run this script for automated cleanup:

```bash
#!/bin/bash
# save as: cleanup-dependencies.sh

echo "🧹 Cleaning up LiqUIdify dependencies..."

# Move misplaced dependencies
echo "📦 Moving build tools to devDependencies..."
bun remove @storybook/blocks @storybook/docs-mdx @tailwindcss/postcss oxc oxlint prism-react-renderer react-live
bun add -d @storybook/blocks @tailwindcss/postcss oxc oxlint prism-react-renderer react-live

# Remove deprecated/unused
echo "🗑️  Removing deprecated packages..."
bun remove @storybook/docs-mdx oparser

# Choose animation library (uncomment one)
# echo "🎨 Keeping Framer Motion, removing GSAP..."
# bun remove gsap

echo "🔄 Reinstalling dependencies..."
rm -rf node_modules bun.lockb
bun install

echo "✅ Dependency cleanup complete!"
echo "📊 Run 'bun run build' to verify everything works"
```

## Next Steps

After dependency cleanup:
1. Run the build to ensure nothing broke
2. Update imports for removed packages
3. Continue to `03-configuration-fixes.md` for tooling setup
4. Document the chosen animation library in README