# LiqUIdify Deployment Checklist

Complete setup checklist for deploying the LiqUIdify component library ecosystem.

## ✅ Pre-Deployment Setup

### 1. Repository Configuration
- ✅ **Monorepo Structure**: Bun workspaces configured
- ✅ **TypeScript Setup**: Strict mode with proper path aliases
- ✅ **Build Pipeline**: Library → Storybook → Docs workflow
- ✅ **CSS Pipeline**: Tailwind + PostCSS + LightningCSS optimization
- ✅ **Testing Setup**: Vitest with React Testing Library

### 2. Component Library (`libs/components/`)
- ✅ **Build System**: Vite + Rolldown for optimal bundles
- ✅ **Output Formats**: ESM + CJS + TypeScript definitions
- ✅ **Peer Dependencies**: React 18+ || 19+ support
- ✅ **CSS Bundle**: Liquid Glass design system (56KB)
- ✅ **Bundle Sizes**: ESM (268KB), CJS (293KB)

### 3. Storybook (`apps/storybook/`)
- ✅ **Version**: Storybook 9.1.2 with Vite builder
- ✅ **Production Stories**: Filtered story list for production builds
- ✅ **Vercel Config**: `vercel.json` with Bun support
- ✅ **Deploy Script**: One-command deployment (`./deploy.sh`)
- ✅ **Accessibility**: A11y addon configured

### 4. Documentation (`apps/docs/`)
- ✅ **Mintlify Config**: `docs.json` with custom domain setup
- ✅ **Custom CSS**: Enhanced component preview styling
- ✅ **Interactive JS**: Theme toggles and copy functionality
- ✅ **Component Examples**: CodeGroup with Preview + Code tabs
- ✅ **Glass Demonstrations**: Live liquid glass effect showcases

## 🌐 Domain Configuration Required

### DNS Records to Add

```dns
# Documentation (Mintlify)
Type: CNAME
Name: docs
Value: cname.vercel-dns.com.

# Storybook (Vercel)  
Type: CNAME
Name: storybook
Value: cname.vercel-dns.com.
```

### Platform Configurations

#### Mintlify Dashboard
1. Login to [dashboard.mintlify.com](https://dashboard.mintlify.com)
2. **Settings** → **Domain Setup**
3. Enter: `docs.useliquidify.dev`

#### Vercel Dashboard  
1. Login to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select Storybook project
3. **Settings** → **Domains** → **Add Domain**
4. Enter: `storybook.useliquidify.dev`

## 🚀 Deployment Commands

### Complete Deployment Workflow
```bash
# 1. Build everything
bun run build:all

# 2. Deploy Storybook
cd apps/storybook && ./deploy.sh

# 3. Deploy Library (when ready)
npm version patch && npm publish

# 4. Docs auto-deploy on Git push
git push origin main
```

### Individual Deployments
```bash
# Library to NPM
bun run build:lib
npm publish

# Storybook to Vercel
cd apps/storybook
bun run build
vercel deploy --prod

# Docs to Mintlify (auto via Git)
git add . && git commit -m "Update docs" && git push
```

## 🔍 Verification Steps

### 1. Build Verification
```bash
# ✅ All builds pass
bun run build:all

# ✅ TypeScript compilation clean  
bunx tsc -b --pretty false

# ✅ No dependency issues
bunx depcheck --skip-missing
```

### 2. Local Testing
```bash
# ✅ Library builds correctly
bun run build:lib
ls -la dist/libs/components/

# ✅ Storybook runs locally
cd apps/storybook && bun run dev

# ✅ Docs run locally  
cd apps/docs && bun run dev
```

### 3. Deployment Testing
```bash
# ✅ Storybook deploys successfully
cd apps/storybook && bun run build && bun run verify

# ✅ Docs CSS bundles correctly
cd apps/docs && bun run build:css
```

## 🌟 Post-Deployment Validation

### Expected Live URLs
- 📚 **Documentation**: https://docs.useliquidify.dev
- 📖 **Storybook**: https://storybook.useliquidify.dev  
- 📦 **NPM Package**: https://npmjs.com/package/liquidify

### Functionality Checks

#### Documentation Site
- [ ] Site loads at custom domain
- [ ] Component previews render with glass effects
- [ ] Code tabs work (Preview + React + CSS)
- [ ] Theme toggles functional
- [ ] Copy buttons work
- [ ] Navigation to Storybook works
- [ ] Search functionality works
- [ ] Mobile responsive
- [ ] SEO meta tags correct

#### Storybook Site
- [ ] Site loads at custom domain
- [ ] All component stories render
- [ ] Interactive controls work
- [ ] Production story filtering active
- [ ] A11y addon functional
- [ ] Docs tab shows component info
- [ ] Glass effects render correctly
- [ ] Mobile responsive

#### NPM Package
- [ ] Package publishes successfully
- [ ] ESM imports work: `import { GlassButton } from 'liquidify'`
- [ ] CJS imports work: `const { GlassButton } = require('liquidify')`
- [ ] CSS imports work: `import 'liquidify/css'`
- [ ] TypeScript definitions available
- [ ] Tree-shaking works properly

## 🎯 Success Criteria

### Performance Targets
- ✅ **Bundle Sizes**: Library <300KB ESM, <350KB CJS
- ✅ **CSS Bundle**: <60KB minified
- ✅ **Build Time**: <2 minutes complete build
- ✅ **Type Check**: <30 seconds

### Quality Metrics
- ✅ **TypeScript**: Strict mode enabled, no errors
- ✅ **Accessibility**: A11y addon passing
- ✅ **Browser Support**: Modern browsers (>0.5%, last 2 versions)
- ✅ **Mobile**: Responsive design across all viewports

## 🔧 Rollback Plan

If issues occur during deployment:

### Library Rollback
```bash
# Unpublish if needed (within 24h)
npm unpublish liquidify@<version>

# Or deprecate
npm deprecate liquidify@<version> "Rollback due to issues"
```

### Storybook Rollback
```bash
# Revert to previous deployment
vercel rollback storybook.useliquidify.dev

# Or redeploy previous version
git checkout <previous-commit>
cd apps/storybook && ./deploy.sh
```

### Documentation Rollback
```bash
# Revert Git changes
git revert <commit-hash>
git push origin main
```

## 📞 Support Contacts

- **Vercel**: [vercel.com/help](https://vercel.com/help)
- **Mintlify**: [support@mintlify.com](mailto:support@mintlify.com)
- **NPM**: [npmjs.com/support](https://npmjs.com/support)

---

**Ready for deployment!** 🚀

All configurations are complete and tested. Follow the domain setup steps, then execute the deployment commands.
