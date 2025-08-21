# 🏗️ LiqUIdify Workspace Setup

This document explains the Bun workspace configuration for the LiqUIdify monorepo.

## 📁 Project Structure

```
LiqUIdify/
├── apps/                          # Applications
│   ├── storybook/                 # Storybook app (@liquidify/storybook-app)
│   └── docs/                      # Mintlify docs (@liquidify/docs)
├── libs/                          # Libraries
│   └── components/                # Component library (@liquidify/components)
├── examples/                      # Example projects (future)
├── scripts/                       # Build and utility scripts
└── package.json                   # Root workspace configuration
```

## 🔧 Workspace Configuration

### Root Package (`package.json`)

The root package.json defines:
- **Workspaces**: `["apps/*", "examples/*", "libs/*"]`
- **Shared devDependencies**: Testing, TypeScript, build tools
- **Workspace scripts**: Orchestrates builds across all packages

### Component Library (`libs/components`)

- **Name**: `@liquidify/components`
- **Purpose**: Core React component library with glassmorphism design
- **Dependencies**: React, Framer Motion, Radix UI, Tailwind utilities
- **Build**: Vite + TypeScript, outputs ESM/CJS + CSS

### Storybook App (`apps/storybook`)

- **Name**: `@liquidify/storybook-app`
- **Purpose**: Interactive component playground and documentation
- **Dependencies**: `@liquidify/components` (workspace dependency)
- **Build**: Storybook with Vite builder

### Docs App (`apps/docs`)

- **Name**: `@liquidify/docs`
- **Purpose**: Documentation site built with Mintlify
- **Dependencies**: `@liquidify/components` (workspace dependency)
- **Build**: Mintlify CLI with custom CSS generation

## 🚀 Available Scripts

### Root Level Commands

```bash
# Build everything
bun run build                    # Build lib + storybook
bun run build:all               # Build lib + storybook + docs

# Individual builds
bun run build:lib               # Build component library
bun run build:storybook         # Build storybook
bun run build:docs              # Build documentation

# Development
bun run dev                     # Start component library dev server
bun run dev:storybook           # Start storybook (alias: bun run storybook)
bun run dev:docs                # Start docs site

# Testing & Quality
bun run test                    # Run tests
bun run type-check              # TypeScript checking across workspaces
bun run lint                    # Lint all code
bun run format                  # Format all code
```

### Workspace-Specific Commands

```bash
# Run commands in specific workspaces
bun run --filter @liquidify/components build
bun run --filter @liquidify/storybook-app dev
bun run --filter @liquidify/docs build:css
```

## 🔗 Workspace Dependencies

### Using `workspace:*` Protocol

Workspaces reference each other using the `workspace:*` protocol:

```json
{
  "dependencies": {
    "@liquidify/components": "workspace:*"
  }
}
```

Benefits:
- **Always uses local version** during development
- **Automatic version resolution** during publishing
- **Prevents version conflicts** between workspaces

### Dependency Hoisting

Bun automatically hoists shared dependencies to the root `node_modules`:
- React, TypeScript, testing libraries → Root level
- Storybook-specific deps → `apps/storybook/node_modules`
- Component-specific deps → `libs/components/node_modules`

## 🛠️ Development Workflow

### 1. Initial Setup

```bash
# Clone and install
git clone <repo>
cd LiqUIdify
bun install

# Verify workspace setup
node scripts/verify-workspaces.mjs
```

### 2. Development

```bash
# Start component development
bun run dev

# Start storybook (in another terminal)
bun run storybook

# Start docs (in another terminal)
bun run docs:dev
```

### 3. Building

```bash
# Build component library first
bun run build:lib

# Then build applications
bun run build:storybook
bun run build:docs

# Or build everything
bun run build:all
```

## 🔍 Troubleshooting

### Common Issues

1. **"Cannot find module '@liquidify/components'"**
   - Run `bun install` to ensure workspace links are created
   - Check that `libs/components/package.json` exists

2. **Build failures**
   - Ensure component library builds first: `bun run build:lib`
   - Check TypeScript errors: `bun run type-check`

3. **Dependency conflicts**
   - Clear node_modules: `bun run clean:all`
   - Reinstall: `bun install`

### Verification Script

Run the workspace verification script to check setup:

```bash
node scripts/verify-workspaces.mjs
```

This checks:
- ✅ Workspace configuration
- ✅ Package.json files exist
- ✅ Workspace dependencies are configured
- ✅ Bun lockfile exists

## 📦 Publishing

When publishing the component library:

1. **Workspace dependencies are resolved**: `workspace:*` → actual version numbers
2. **Only the component library is published**: Apps remain private
3. **Build artifacts are included**: `dist/` folder with compiled code

```bash
# Prepare for publishing
bun run prepublishOnly  # Runs type-check + test + build:lib

# Publish (from root)
npm publish
```

## 🎯 Benefits of This Setup

### ✅ Dependency Management
- **No version conflicts** between packages
- **Shared dependencies** are hoisted and deduplicated
- **Workspace protocol** ensures local development uses local packages

### ✅ Build Orchestration
- **Proper build order**: Library → Applications
- **Parallel builds** where possible
- **Incremental builds** with watch mode

### ✅ Development Experience
- **Hot reloading** across workspaces
- **Type safety** between packages
- **Consistent tooling** (TypeScript, ESLint, Prettier)

### ✅ CI/CD Optimization
- **Selective builds** with `--filter` flag
- **Caching strategies** per workspace
- **Parallel testing** and linting

## 🔄 Migration Notes

If migrating from the previous setup:

1. **Dependencies moved** from root to appropriate workspaces
2. **Scripts updated** to use `--filter` flag
3. **Build paths** now relative to each workspace
4. **Import paths** remain the same (no breaking changes)

## 📚 Further Reading

- [Bun Workspaces Documentation](https://bun.com/docs/install/workspaces)
- [Workspace Protocol Specification](https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-workspace-ranges.md)
- [Monorepo Best Practices](https://monorepo.tools/)
