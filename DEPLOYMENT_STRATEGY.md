# Deployment Strategy

This document outlines the deployment strategy for LiqUIdify, including the current Storybook-focused approach and the three-project architecture (component library, Storybook, and documentation).

## Current Architecture

### Three-Project Structure

1. **Component Library** (`libs/components/`)

   - Core React components with TypeScript
   - Multiple bundle exports (core, forms, navigation, etc.)
   - Built with Vite and distributed via npm

2. **Storybook** (`apps/storybook/`)

   - Interactive component documentation
   - Currently deployed to Vercel
   - 49+ story files for comprehensive coverage

3. **VitePress Documentation** (`apps/docs/`)
   - Markdown-based documentation
   - Currently for development use
   - Vue-based with React component integration challenges

## Current Deployment Configuration

### Vercel Setup

The project is currently configured for **Storybook-only deployment** to Vercel with the following configuration:

```json
{
  "buildCommand": "bun run build:storybook",
  "outputDirectory": "apps/storybook/storybook-static",
  "installCommand": "bun install --frozen-lockfile"
}
```

#### Build Process

1. Install dependencies with Bun
2. Build component library first (`bun run build:lib`)
3. Build Storybook with component library as dependency
4. Deploy static Storybook build to Vercel

#### Routes and Headers

- **Primary Route**: All traffic serves Storybook content
- **API Routes**: Return 404 (no backend API currently)
- **Security Headers**: CSP, CORS, and security-focused headers configured
- **Caching**: Long-term caching for static assets, short-term for HTML

### Component Library Distribution

The component library is built and packaged for npm distribution:

- **Bundle Exports**: 13 specialized bundle files (core, forms, navigation, etc.)
- **Build Targets**: ESM, CJS, and TypeScript declarations
- **Package Exports**: Modern package.json exports for tree-shaking

## Bundle File Structure

All bundle files are located in `libs/components/src/bundles/`:

1. **core.ts** - Essential components (<15KB)
2. **forms.ts** - Form-related components
3. **navigation.ts** - Navigation components
4. **feedback.ts** - Feedback and status components
5. **layout.ts** - Layout and container components
6. **data-display.ts** - Data visualization components
7. **accessibility.ts** - Accessibility utilities
8. **advanced.ts** - Complex components
9. **animations.ts** - Animation utilities
10. **physics.ts** - Physics-based interactions
11. **ssr.ts** - Server-side rendering utilities
12. **providers.ts** - Context providers
13. **tokens.ts** - Design tokens

## Validation and Quality Assurance

### Pre-deployment Checks

- **Configuration validation** via `validate-build-config.js`
- **Build verification** via `pre-deployment-check.js`
- **Story discovery validation** (ensures 49+ stories are discoverable)
- **Bundle size analysis** and performance metrics
- **TypeScript compilation** and type checking

### GitHub Actions Workflows

- **Build Validation** (`build-validation.yml`)
- **Deploy Validation** (`deploy-validation.yml`)
- **Dependency auditing** and security checks
- **Bundle size monitoring**

## Build Commands

### Development

```bash
bun run dev:storybook    # Start Storybook development server
bun run dev:docs         # Start VitePress development server
bun run dev:lib          # Watch mode for library development
```

### Building

```bash
bun run build:lib       # Build component library
bun run build:storybook # Build Storybook for production
bun run build:docs      # Build VitePress documentation
bun run build           # Build all projects
```

### Validation

```bash
bun run validate:build-config  # Validate build configuration
bun run deploy:validate        # Run pre-deployment checks
bun run type-check             # TypeScript validation
bun run lint                   # Code quality checks
```

## Story File Discovery

The Storybook configuration automatically discovers story files from:

- `libs/components/src/**/*.stories.@(js|jsx|ts|tsx|mdx)`
- `libs/components/src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)`

Currently maintains 49+ story files for comprehensive component coverage.

## Performance Considerations

### Bundle Optimization

- **Tree-shaking**: Modern ESM builds with proper exports
- **Code splitting**: Separate bundles for different component categories
- **CSS bundling**: Consolidated styles with theme support
- **Size targets**: <100KB for main library bundle, <50KB for CSS

### Storybook Optimization

- **Chunk splitting**: Separate vendor and story chunks
- **Asset optimization**: Long-term caching for static assets
- **Build size monitoring**: Automated size analysis in CI

## Troubleshooting Common Issues

### Build Configuration Mismatches

1. **Bundle file references**: Ensure all referenced bundle files exist
2. **Path alias consistency**: Verify aliases match across all config files
3. **TypeScript configuration**: Ensure base config is consistent

### Story Discovery Issues

1. **File patterns**: Check that story files match expected patterns
2. **Import paths**: Verify component imports are resolvable
3. **Storybook configuration**: Ensure story discovery patterns are correct

### Deployment Failures

1. **Build validation**: Run pre-deployment checks locally
2. **Dependency issues**: Verify all dependencies are correctly installed
3. **Bundle validation**: Ensure all expected outputs are generated

## Future Multi-Project Deployment Strategy

### Potential Approaches

1. **Multi-site Vercel**: Deploy Storybook and docs to separate Vercel projects
2. **Subdomain routing**: Use subdomains for different applications
3. **Monorepo deployment**: Single deployment with routing to different builds
4. **CDN distribution**: Distribute library via CDN with separate docs sites

### Recommendations

- **Short-term**: Continue with Storybook-focused deployment
- **Medium-term**: Add documentation deployment to separate subdomain
- **Long-term**: Consider full multi-project deployment strategy

## Architecture Decision: Documentation Strategy

The current architecture includes VitePress documentation, but React/Vue integration presents challenges. Options:

1. **Storybook Documentation**: Use Storybook as primary docs (current approach)
2. **Static Examples**: Generate static HTML examples for VitePress
3. **Separate React Docs**: Build documentation with React-based static site generator
4. **Hybrid Approach**: Use VitePress for guides, Storybook for component docs

**Current Status**: Storybook serves as both interactive playground and primary documentation.

## Security and Performance

### Security Headers

- Content Security Policy (CSP)
- Cross-Origin Resource Policy (CORP)
- X-Frame-Options, X-Content-Type-Options
- XSS Protection and Referrer Policy

### Performance Optimization

- Asset compression and minification
- Long-term caching for immutable assets
- CDN delivery through Vercel Edge Network
- Optimized bundle splitting and lazy loading

## Monitoring and Analytics

### Built-in Monitoring

- Bundle size tracking in CI
- Build time monitoring
- Story coverage analysis
- Accessibility compliance checking

### Analytics Integration

- Google Analytics placeholder in VitePress config
- Vercel Analytics (optional)
- Performance monitoring via Web Vitals

---

This deployment strategy balances current needs with future scalability, focusing on the Storybook deployment while maintaining flexibility for multi-project deployment in the future.
