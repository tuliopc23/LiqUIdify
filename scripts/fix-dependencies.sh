#!/bin/bash
# LiqUIdify Dependency Cleanup Script
# Removes conflicting packages and standardizes on Bun + OXC + Rolldown stack

set -e

echo "🧹 LiqUIdify Dependency Cleanup"
echo "=================================="

# Remove conflicting linting tools
echo "📦 Removing ESLint and related packages..."
bun remove eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import eslint-config-prettier 2>/dev/null || true

# Remove conflicting build tools
echo "📦 Removing conflicting build tools..."
bun remove rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-dts 2>/dev/null || true

# Remove conflicting minifiers
echo "📦 Removing conflicting minifiers..."
bun remove esbuild @esbuild/linux-x64 @esbuild/darwin-x64 @esbuild/win32-x64 2>/dev/null || true

# Remove conflicting TypeScript compilers
echo "📦 Removing conflicting TS tools..."
bun remove tsc-alias ts-node tsx-node 2>/dev/null || true

# Remove conflicting CSS processors
echo "📦 Removing conflicting CSS tools..."
bun remove sass scss postcss-scss 2>/dev/null || true

# Remove unused testing libraries
echo "📦 Removing unused test utilities..."
bun remove @testing-library/user-event @testing-library/jest-dom 2>/dev/null || true

# Remove conflicting bundlers
echo "📦 Removing conflicting bundlers..."
bun remove webpack webpack-cli parcel 2>/dev/null || true

# Clean up old config files
echo "🗑️  Removing old config files..."
rm -f .eslintrc.js .eslintrc.json .eslintrc.yml .eslintrc.yaml eslint.config.js
rm -f rollup.config.js rollup.config.ts
rm -f webpack.config.js webpack.config.ts
rm -f esbuild.config.js esbuild.config.ts

# Keep only the unified configs
echo "✅ Keeping unified configs:"
echo "  - oxc.config.json (unified linting + transformation)"
echo "  - vite.config.ts (unified building)"
echo "  - tsconfig.json (TypeScript)"
echo "  - postcss.config.js (CSS processing)"
echo "  - tailwind.config.ts (Styling)"

# Reinstall clean dependencies
echo "🔄 Reinstalling clean dependencies..."
rm -rf node_modules bun.lockb
bun install

echo "✅ Dependency cleanup complete!"
echo ""
echo "🎯 Standardized stack:"
echo "  - Bun (package manager + runtime)"
echo "  - OXC (linting + transformation)"
echo "  - Rolldown-Vite (building)"
echo "  - PostCSS (CSS processing)"
echo "  - Tailwind v4 (styling)"
echo ""
echo "Next: Run 'bun run build' to test the unified build system"
