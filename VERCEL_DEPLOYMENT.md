# Vercel Deployment Guide for LiqUIdify Storybook

## Overview
This guide ensures proper deployment of the LiqUIdify component library Storybook to Vercel.

## Current Configuration

### vercel.json
```json
{
  "buildCommand": "bun run build && bun run build-storybook",
  "outputDirectory": "storybook-static",
  "installCommand": "bun install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Build Process

The build process executes in this order:

1. **Install Dependencies**: `bun install`
   - Installs all dependencies from package.json
   - Uses bun for faster installation

2. **Build Library**: `bun run build`
   - Compiles TypeScript components
   - Generates dist/ folder with library assets
   - Creates liquidui.css file

3. **Build Storybook**: `bun run build-storybook`
   - Builds CSS: `bun run build:css`
   - Builds Storybook: `bunx storybook build`
   - Copies CSS: `cp dist/liquidui.css storybook-static/liquidui.css`

## What Gets Deployed

- **Output Directory**: `storybook-static/`
- **Contains**:
  - index.html (Storybook entry point)
  - assets/ (JavaScript bundles)
  - liquidui.css (Component styles)
  - All Storybook static files

## Vercel Environment Setup

### Recommended Settings:
- **Node Version**: 20.x or latest LTS
- **Package Manager**: npm (Vercel will use npm even though we use bun locally)
- **Build & Development Settings**:
  - Framework Preset: Other
  - Build Command: `npm run build && npm run build-storybook`
  - Output Directory: `storybook-static`
  - Install Command: `npm install`

### Important Notes:

1. **Bun vs NPM**: While we use `bun` locally, Vercel doesn't support bun yet. The scripts are compatible with npm.

2. **PostCSS Fix Applied**: We fixed the cssnano preset from 'advanced' to 'default' to ensure builds work.

3. **Import Paths Fixed**: All glass-button imports now point to glass-button-refactored.

## Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Connect to Vercel**:
   - Import project from GitHub
   - Use the recommended settings above
   - Deploy

3. **Verify Deployment**:
   - Check that Storybook loads
   - Verify CSS styles are applied
   - Test component interactions

## Troubleshooting

### If build fails:

1. **Check Logs**: Look for specific error messages
2. **Common Issues**:
   - Missing dependencies: Ensure all deps are in package.json
   - Build memory: May need to increase if OOM errors
   - Path issues: Ensure all imports use correct paths

### If styles are missing:
- Verify liquidui.css is copied to storybook-static/
- Check that the post-storybook script runs

## Success Indicators

✅ Build completes without errors
✅ Storybook loads with all components
✅ Glassmorphism styles are visible
✅ Component interactions work
✅ No console errors in browser

## Alternative Vercel Config (if needed)

If the current setup has issues, try this alternative:

```json
{
  "buildCommand": "npm run build:css && npx storybook build",
  "outputDirectory": "storybook-static",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": null
}
```