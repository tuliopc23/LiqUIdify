# LiqUIdify Deployment Guide

This guide covers deploying all three projects in the LiqUIdify monorepo:

1. **UI Library** → NPM Registry
2. **Storybook** → Vercel (storybook.useliquidify.dev)
3. **Documentation** → Mintlify Platform

## Prerequisites

- [Bun](https://bun.sh) installed (v1.0+)
- [Vercel CLI](https://vercel.com/cli) for Storybook deployment
- Access to NPM registry for library publishing
- Mintlify account for documentation hosting

## 🏗️ Build Commands

### All Projects

```bash
bun run build:all
```

### Individual Projects

```bash
# Library only
bun run build:lib

# Storybook only
bun run build:storybook

# Docs CSS only (for Mintlify)
bun run build:docs
```

## 📦 UI Library Deployment (NPM)

The component library is configured for NPM publishing with proper exports and peer dependencies.

### Package Configuration

- **Name**: `liquidify`
- **Type**: ESM with CJS fallback
- **Exports**: ESM, CJS, TypeScript definitions, CSS
- **Peer Dependencies**: React 18+ or 19+

### Publishing Steps

1. **Build the library**:

```bash
bun run build:lib
```

2. **Version and publish**:

```bash
npm version patch|minor|major
npm publish
```

### Package Structure

```
dist/libs/components/
├── index.mjs         # ESM bundle (268KB)
├── index.cjs         # CJS bundle (293KB)
├── index.d.ts        # TypeScript definitions
├── liquidify.css     # CSS bundle (56KB)
└── [source maps]
```

## 📚 Storybook Deployment (Vercel)

Storybook is configured to deploy to **storybook.useliquidify.dev** using Vercel.

### Vercel Configuration

The `apps/storybook/vercel.json` includes:

- **Build Command**: `bun run build`
- **Output Directory**: `storybook-static`
- **Install Command**: `bun install --frozen-lockfile`
- **Custom Headers**: Security headers and caching
- **SPA Routing**: Proper rewrites for Storybook navigation

### Deployment Steps

1. **Quick Deploy**:

```bash
cd apps/storybook
./deploy.sh
```

2. **Manual Deploy**:

```bash
# Build library first
bun run build:lib

# Build Storybook
cd apps/storybook
bun run build

# Deploy to Vercel
vercel deploy --prod
```

### Domain Setup

After deployment, configure the custom domain `storybook.useliquidify.dev` in your Vercel dashboard:

1. Go to Project Settings → Domains
2. Add `storybook.useliquidify.dev`
3. Configure DNS with your domain provider

## 📖 Documentation Deployment (Mintlify)

The documentation uses Mintlify's platform with custom CSS and component previews.

### Mintlify Configuration

**File**: `apps/docs/docs.json`

- **Theme**: Mint theme with custom liquid glass styling
- **Custom CSS**: `liquid-glass-components.css` for enhanced component previews
- **Custom JS**: `component-preview.js` for interactive functionality
- **Navigation**: Organized component documentation with code examples

### Custom Features

1. **Component Previews with Tabs**:

````mdx
<CodeGroup>
```jsx Preview
// Interactive component preview
````

```jsx React Code
// Implementation code
```

```css CSS Classes
// CSS-only usage
```

</CodeGroup>
```

2. **Interactive Glass Demonstrations**:

```mdx
<div className="liquid-component-preview" data-theme-toggle="true">
  <div className="component-showcase">
    <!-- Component demo -->
  </div>
</div>
```

3. **Property Tables**:

```mdx
<table className="props-table">
  <!-- Styled property documentation -->
</table>
```

### Deployment Process

Mintlify automatically builds and deploys when changes are pushed to the main branch. The platform handles:

- CSS bundling and optimization
- Component preview rendering
- Search indexing
- Performance optimization

### Local Development

```bash
cd apps/docs
bun run dev
```

## 🚀 Complete Deployment Workflow

### For Library Updates

1. Make changes to `libs/components/`
2. Run `bun run build:lib`
3. Update version in `package.json`
4. Publish to NPM: `npm publish`
5. Deploy Storybook: `cd apps/storybook && ./deploy.sh`
6. Update docs if needed (auto-deploys via Git)

### For Documentation Updates

1. Update content in `apps/docs/`
2. Test locally: `bun run dev`
3. Push to main branch (auto-deploys)

### For Storybook Updates

1. Update stories in `apps/storybook/`
2. Test locally: `bun run dev`
3. Deploy: `./deploy.sh`

## 🔧 Configuration Files

### Root Level

- `package.json` - Workspace configuration and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Liquid Glass design system

### Library (`libs/components/`)

- `package.json` - Library-specific dependencies
- `rolldown.config.ts` - Build configuration (Vite + Rollup)
- `tsconfig.lib.json` - Library TypeScript config

### Storybook (`apps/storybook/`)

- `package.json` - Storybook dependencies
- `vercel.json` - Vercel deployment configuration
- `.storybook/main.mjs` - Storybook configuration
- `deploy.sh` - Deployment script

### Documentation (`apps/docs/`)

- `package.json` - Docs dependencies
- `docs.json` - Mintlify configuration
- `liquid-glass-components.css` - Custom styling
- `component-preview.js` - Interactive enhancements

## 🔍 Quality Checks

Before deployment, run:

```bash
# TypeScript check
bun run type-check

# Build all projects
bun run build:all

# Test library build
bun run health-check
```

## 🌐 Live URLs

After deployment:

- **Library**: `https://www.npmjs.com/package/liquidify`
- **Storybook**: `https://storybook.useliquidify.dev`
- **Documentation**: `https://docs.useliquidify.dev`

### Domain Configuration

- Storybook: Custom domain configured in Vercel dashboard
- Documentation: Custom domain configured in Mintlify dashboard
- See [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) for detailed DNS configuration

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**: Check TypeScript errors with `bunx tsc -b`
2. **Missing Dependencies**: Run `bun install` in affected workspace
3. **Vercel Deploy Issues**: Verify `vercel.json` configuration
4. **Mintlify CSS Issues**: Check CSS file paths in `docs.json`

### Debugging Commands

```bash
# Check workspace dependencies
bun run workspace:info

# Validate configurations
bun run validate:config

# Check for circular dependencies
bunx madge --circular libs/components/src
```

## 📈 Performance Metrics

### Target Metrics

- **Library Bundle**: <300KB (ESM), <350KB (CJS)
- **CSS Bundle**: <60KB
- **Storybook Build**: <2 minutes
- **Type Checking**: <30 seconds

### Monitoring

- Bundle size tracked in CI/CD
- Performance budgets in build process
- Lighthouse scores for deployed Storybook
