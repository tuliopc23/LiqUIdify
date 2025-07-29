# Nx Integration Plan for LiqUIdify

## Overview

This document outlines the complete integration plan for adding Nx to the LiqUIdify React glassmorphism component library. The integration will enable better build orchestration, intelligent caching, and prepare the project for the upcoming documentation website.

## Current State Analysis

### Existing Architecture

- **Package Manager**: Bun
- **Build Tool**: Vite + Custom CSS processing
- **Component Library**: 52 React components with TypeScript
- **Documentation**: Storybook (49/52 components with stories)
- **Testing**: Playwright E2E, Bun test (unit tests)
- **Deployment**: Vercel (Storybook at liquidify-storybook.vercel.app)

### Current Build Pipeline

```bash
# Current build flow
bun run clean
  ↓
vite build + bun run build:css + bun run post-build
  ↓
build-storybook + bun run post-storybook
```

## Migration Strategy

### Phase 1: Nx Installation & Basic Setup (Week 1)

#### 1.1 Install Nx

```bash
# Add Nx to existing project
npx nx@latest init

# Install required plugins
bun add -D @nx/vite @nx/react @nx/storybook @nx/playwright
```

#### 1.2 Initial Workspace Structure

```
LiqUIdify/
├── apps/
│   ├── docs/                    # VitePress documentation site (new)
│   └── storybook/               # Storybook as standalone app
├── libs/
│   ├── components/              # Main component library
│   ├── tokens/                  # Design tokens
│   └── utils/                   # Shared utilities
├── tools/
│   └── scripts/                 # Build scripts (existing)
├── nx.json                      # Nx configuration
└── project.json                 # Root project config
```

#### 1.3 Nx Configuration (`nx.json`)

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "defaultBase": "main",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json",
      "!{projectRoot}/eslint.config.js"
    ],
    "sharedGlobals": [
      "{workspaceRoot}/babel.config.json",
      "{workspaceRoot}/.biome.json"
    ]
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "cache": true
    },
    "test": {
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
      "cache": true
    },
    "lint": {
      "inputs": [
        "default",
        "{workspaceRoot}/.eslintrc.json",
        "{workspaceRoot}/.biome.json"
      ],
      "cache": true
    }
  },
  "plugins": [
    {
      "plugin": "@nx/vite/plugin",
      "options": {
        "buildTargetName": "build",
        "testTargetName": "test",
        "serveTargetName": "serve",
        "previewTargetName": "preview"
      }
    }
  ]
}
```

### Phase 2: Library Migration (Week 2)

#### 2.1 Component Library Configuration (`libs/components/project.json`)

```json
{
  "name": "components",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/components/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:ui"],
  "targets": {
    "build": {
      "executor": "@nx/vite:build",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/libs/components"
      },
      "dependsOn": ["build:css"]
    },
    "build:css": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsx scripts/build-css-lightning.ts",
        "cwd": "{workspaceRoot}"
      },
      "cache": true
    },
    "test": {
      "executor": "nx:run-commands",
      "options": {
        "command": "bun test",
        "cwd": "{projectRoot}"
      },
      "cache": true
    },
    "lint": {
      "executor": "@nx/biome:lint",
      "options": {
        "files": ["libs/components"]
      }
    }
  }
}
```

#### 2.2 Vite Configuration (`libs/components/vite.config.ts`)

```typescript
/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import * as path from "path";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/libs/components",
  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: "src",
      tsConfigFilePath: path.join(__dirname, "tsconfig.lib.json"),
      skipDiagnostics: true,
    }),
  ],
  build: {
    outDir: "../../dist/libs/components",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: "src/index.ts",
      name: "liquidify",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
  // Note: Tests are run using Bun test, not Vitest
  // See package.json scripts and project.json for test configuration
});
```

### Phase 3: Storybook Migration (Week 3)

#### 3.1 Storybook as Nx App (`apps/storybook/project.json`)

```json
{
  "name": "storybook",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "projectType": "application",
  "tags": ["scope:tooling", "type:app"],
  "targets": {
    "build": {
      "executor": "@nx/storybook:build",
      "outputs": ["{options.outputDir}"],
      "options": {
        "outputDir": "dist/storybook",
        "configDir": "apps/storybook/.storybook"
      },
      "dependsOn": ["^build"]
    },
    "serve": {
      "executor": "@nx/storybook:storybook",
      "options": {
        "port": 6006,
        "configDir": "apps/storybook/.storybook"
      },
      "configurations": {
        "ci": {
          "quiet": true
        }
      }
    },
    "test": {
      "executor": "@nx/playwright:playwright",
      "outputs": ["{options.outputDir}"],
      "options": {
        "config": "apps/storybook/playwright.config.ts"
      }
    }
  }
}
```

#### 3.2 Storybook Main Config (`apps/storybook/.storybook/main.ts`)

```typescript
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../../../libs/components/src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "libs/components/vite.config.ts",
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ["@storybook/blocks"],
      },
    });
  },
};

export default config;
```

### Phase 4: Documentation Website Setup (Week 4)

#### 4.1 VitePress Documentation App (`apps/docs/project.json`)

```json
{
  "name": "docs",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "projectType": "application",
  "sourceRoot": "apps/docs",
  "tags": ["scope:tooling", "type:app"],
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "outputs": ["apps/docs/.vitepress/dist"],
      "options": {
        "command": "vitepress build",
        "cwd": "apps/docs"
      },
      "dependsOn": ["^build"]
    },
    "serve": {
      "executor": "nx:run-commands",
      "options": {
        "command": "vitepress dev --port 4200",
        "cwd": "apps/docs"
      }
    },
    "preview": {
      "executor": "nx:run-commands",
      "options": {
        "command": "vitepress preview --port 4300",
        "cwd": "apps/docs"
      }
    }
  }
}
```

#### 4.2 VitePress Config (`apps/docs/.vitepress/config.ts`)

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "LiqUIdify",
  description: "Production-ready React glassmorphism component library",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Components", link: "/components/" },
      { text: "Guide", link: "/guide/" },
      { text: "Storybook", link: "https://liquidify-storybook.vercel.app" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Getting Started",
          items: [
            { text: "Installation", link: "/guide/installation" },
            { text: "Quick Start", link: "/guide/quick-start" },
            { text: "Theming", link: "/guide/theming" },
          ],
        },
      ],
      "/components/": [
        {
          text: "Core Components",
          items: [
            { text: "Button", link: "/components/button" },
            { text: "Card", link: "/components/card" },
            { text: "Input", link: "/components/input" },
          ],
        },
      ],
    },
  },
  vite: {
    resolve: {
      alias: {
        "@liquidify/components": "../../libs/components/src/index.ts",
      },
    },
  },
});
```

### Phase 5: Build Optimization (Week 5)

#### 5.1 Task Dependencies

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build", "build:css"]
    },
    "build-storybook": {
      "dependsOn": ["components:build"]
    },
    "docs:build": {
      "dependsOn": ["components:build", "storybook:build"]
    }
  }
}
```

#### 5.2 Caching Strategy

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": [
          "build",
          "build:css",
          "test",
          "lint",
          "build-storybook",
          "docs:build"
        ]
      }
    }
  }
}
```

## Package.json Updates

### Root Package.json Scripts

```json
{
  "scripts": {
    "build": "nx run-many -t build",
    "build:components": "nx build components",
    "build:storybook": "nx build storybook",
    "build:docs": "nx build docs",
    "build:all": "nx run-many -t build --parallel=3",
    "dev": "nx serve components",
    "dev:storybook": "nx serve storybook",
    "dev:docs": "nx serve docs",
    "test": "bun test",
    "test:ci": "bun test --coverage",
    "test:affected": "nx affected -t test",
    "lint": "nx run-many -t lint",
    "lint:affected": "nx affected -t lint",
    "graph": "nx graph",
    "affected:graph": "nx affected:graph"
  }
}
```

## CI/CD Optimization

### GitHub Actions with Nx

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - run: bun install --frozen-lockfile

      - uses: nrwl/nx-set-shas@v4

      - run: npx nx format:check

      - run: npx nx affected -t lint test build

      - run: npx nx affected -t build-storybook docs:build
```

## Deployment Strategy

### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/docs/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": ".vitepress/dist"
      }
    },
    {
      "src": "apps/storybook/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/storybook"
      }
    }
  ],
  "routes": [
    {
      "src": "/storybook/(.*)",
      "dest": "/storybook/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/docs/$1"
    }
  ]
}
```

## Expected Benefits

### Performance Improvements

- **Build Time**: 40-60% faster with intelligent caching
- **CI/CD**: 50-70% faster with affected detection
- **Development**: Hot reloading optimization across apps

### Developer Experience

- **Task Orchestration**: Clear dependency graph
- **Parallel Execution**: Multiple targets simultaneously
- **Affected Commands**: Only work on changed code
- **Visualization**: `nx graph` for dependency insights

### Scalability

- **Modular Architecture**: Clear separation of concerns
- **Easy Extensibility**: Add new apps/libs easily
- **Team Collaboration**: Better workspace organization

## Migration Checklist

### Week 1: Setup

- [ ] Install Nx and plugins
- [ ] Configure `nx.json`
- [ ] Set up basic workspace structure
- [ ] Migrate existing scripts to Nx commands

### Week 2: Component Library

- [ ] Move source code to `libs/components`
- [ ] Configure Vite for library build
- [ ] Set up TypeScript project references
- [ ] Update import paths

### Week 3: Storybook

- [ ] Move Storybook to `apps/storybook`
- [ ] Configure Storybook with Nx
- [ ] Update story imports
- [ ] Test Storybook build

### Week 4: Documentation

- [ ] Set up VitePress in `apps/docs`
- [ ] Migrate existing docs
- [ ] Configure cross-linking
- [ ] Set up live component demos

### Week 5: Optimization

- [ ] Fine-tune caching strategy
- [ ] Optimize CI/CD pipeline
- [ ] Set up deployment
- [ ] Performance testing

## Success Metrics

- [ ] All existing functionality preserved
- [ ] Build time reduced by >40%
- [ ] CI/CD time reduced by >50%
- [ ] Documentation website deployed successfully
- [ ] Team onboarding improved
- [ ] Clear dependency visualization available

## Risk Mitigation

### Backup Strategy

- Keep existing build scripts during migration
- Use feature branches for each phase
- Maintain current deployment until new setup is proven

### Rollback Plan

- Document all changes for easy reversal
- Keep original configuration files
- Test thoroughly in staging environment

## Post-Migration

### Maintenance

- Regular Nx updates
- Cache optimization monitoring
- Performance metrics tracking
- Documentation updates

### Future Enhancements

- Add example applications
- Set up automated releases
- Implement design token packages
- Add visual regression testing

This comprehensive plan ensures a smooth migration to Nx while preparing LiqUIdify for enhanced documentation and improved developer experience.
