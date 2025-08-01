# Troubleshooting Guide

This guide helps you resolve common issues when using LiqUIdify. Find quick solutions to the most frequently encountered problems.

## Common Issues

### Glass Effects Not Visible

**Problem**: Components appear as regular elements without glassmorphism effects.

**Symptoms**:
- Components look flat or have solid backgrounds
- No blur or transparency effects
- Missing glass borders

**Solutions**:

1. **Add Gradient Background**
   ```tsx
   // ❌ Wrong - No background for glass to show against
   <div>
     <GlassCard>Content</GlassCard>
   </div>
   
   // ✅ Correct - Gradient background reveals glass effects
   <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
     <GlassCard>Content</GlassCard>
   </div>
   ```

2. **Check CSS Import Order**
   ```tsx
   // ❌ Wrong - LiqUIdify styles imported after custom styles
   import './my-styles.css'
   import '@liquidify/ui/styles'
   
   // ✅ Correct - LiqUIdify styles imported first
   import '@liquidify/ui/styles'
   import './my-styles.css'
   ```

3. **Verify ThemeProvider**
   ```tsx
   // ❌ Wrong - Missing ThemeProvider
   function App() {
     return <GlassButton>Click me</GlassButton>
   }
   
   // ✅ Correct - ThemeProvider wraps components
   function App() {
     return (
       <ThemeProvider theme="glass">
         <GlassButton>Click me</GlassButton>
       </ThemeProvider>
     )
   }
   ```

4. **Check Browser Support**
   ```css
   /* Add fallback for older browsers */
   .glass-fallback {
     background: rgba(255, 255, 255, 0.9);
   }
   
   @supports (backdrop-filter: blur(10px)) {
     .glass-fallback {
       background: rgba(255, 255, 255, 0.1);
       backdrop-filter: blur(10px);
     }
   }
   ```

### TypeScript Errors

**Problem**: TypeScript compilation errors when using LiqUIdify components.

**Common Errors**:

1. **"Cannot find module '@liquidify/ui'"**
   ```bash
   # Solution: Reinstall and restart TypeScript server
   npm install @liquidify/ui
   # In VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"
   ```

2. **"Property 'variant' does not exist"**
   ```tsx
   // ❌ Wrong - Using old prop names
   <GlassButton color="primary">Click</GlassButton>
   
   // ✅ Correct - Use updated prop names
   <GlassButton variant="primary">Click</GlassButton>
   ```

3. **"Type 'string' is not assignable to type..."**
   ```tsx
   // ❌ Wrong - Invalid variant value
   <GlassButton variant="blue">Click</GlassButton>
   
   // ✅ Correct - Use valid variant values
   <GlassButton variant="primary">Click</GlassButton>
   ```

4. **"JSX element type does not have any construct signatures"**
   ```tsx
   // ❌ Wrong - Incorrect import
   import GlassButton from '@liquidify/ui'
   
   // ✅ Correct - Named import
   import { GlassButton } from '@liquidify/ui'
   ```

### Performance Issues

**Problem**: Slow animations, high CPU usage, or poor performance.

**Symptoms**:
- Laggy hover effects
- Choppy animations
- High memory usage
- Slow page loads

**Solutions**:

1. **Enable Hardware Acceleration**
   ```tsx
   <GlassButton 
     className="transform-gpu will-change-transform"
     style={{ transform: 'translateZ(0)' }}
   >
     Optimized Button
   </GlassButton>
   ```

2. **Optimize Backdrop Filter**
   ```css
   /* Reduce blur intensity for better performance */
   :root {
     --glass-blur: 8px; /* Instead of 15px */
   }
   ```

3. **Use Individual Imports**
   ```tsx
   // ❌ Slower - Imports entire library
   import { GlassButton, GlassCard } from '@liquidify/ui'
   
   // ✅ Faster - Tree-shaken imports
   import { GlassButton } from '@liquidify/ui/button'
   import { GlassCard } from '@liquidify/ui/card'
   ```

4. **Enable Production Build**
   ```bash
   # Make sure you're running production build
   npm run build
   npm run preview
   ```

### Styling Conflicts

**Problem**: LiqUIdify styles conflict with existing CSS or other libraries.

**Symptoms**:
- Components don't look as expected
- Styles being overridden
- CSS specificity issues

**Solutions**:

1. **CSS Specificity**
   ```css
   /* ❌ Wrong - Too generic, may conflict */
   .card {
     background: white;
   }
   
   /* ✅ Correct - More specific selectors */
   .my-app .card {
     background: white;
   }
   ```

2. **CSS Modules Conflicts**
   ```tsx
   // ❌ Wrong - CSS modules overriding LiqUIdify
   import styles from './Component.module.css'
   
   <GlassCard className={styles.card}>
     Content
   </GlassCard>
   
   // ✅ Correct - Combine classes properly
   <GlassCard className={`${styles.card} my-custom-card`}>
     Content
   </GlassCard>
   ```

3. **Tailwind CSS Conflicts**
   ```tsx
   // ❌ Wrong - Tailwind overriding glass effects
   <GlassCard className="bg-white border-gray-200">
     Content
   </GlassCard>
   
   // ✅ Correct - Use Tailwind for layout only
   <GlassCard className="p-6 m-4 max-w-sm">
     Content
   </GlassCard>
   ```

### Build and Bundle Issues

**Problem**: Build fails or bundle size is too large.

**Common Issues**:

1. **"Module not found" during build**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Large bundle size**
   ```js
   // webpack.config.js - Enable tree shaking
   module.exports = {
     optimization: {
       usedExports: true,
       sideEffects: false
     }
   }
   ```

3. **CSS not loading in production**
   ```tsx
   // Ensure CSS is imported in your entry file
   // main.tsx or index.tsx
   import '@liquidify/ui/styles'
   ```

### Server-Side Rendering (SSR) Issues

**Problem**: Components don't render correctly with Next.js, Nuxt, or other SSR frameworks.

**Solutions**:

1. **Next.js Configuration**
   ```js
   // next.config.js
   module.exports = {
     transpilePackages: ['@liquidify/ui'],
     experimental: {
       esmExternals: 'loose'
     }
   }
   ```

2. **Dynamic Imports for Client-Only Components**
   ```tsx
   import dynamic from 'next/dynamic'
   
   const GlassChart = dynamic(
     () => import('@liquidify/ui').then(mod => ({ default: mod.GlassChart })),
     { ssr: false }
   )
   ```

3. **Hydration Mismatch**
   ```tsx
   import { useEffect, useState } from 'react'
   
   function ClientOnlyComponent() {
     const [mounted, setMounted] = useState(false)
     
     useEffect(() => {
       setMounted(true)
     }, [])
     
     if (!mounted) return null
     
     return <GlassButton>Client Only</GlassButton>
   }
   ```

### Accessibility Issues

**Problem**: Screen readers, keyboard navigation, or other accessibility features not working.

**Solutions**:

1. **Missing ARIA Labels**
   ```tsx
   // ❌ Wrong - No accessible name
   <GlassButton onClick={handleClose}>×</GlassButton>
   
   // ✅ Correct - Proper ARIA label
   <GlassButton 
     onClick={handleClose}
     aria-label="Close dialog"
   >
     ×
   </GlassButton>
   ```

2. **Focus Management**
   ```tsx
   import { useRef, useEffect } from 'react'
   
   function Modal({ isOpen }) {
     const modalRef = useRef<HTMLDivElement>(null)
     
     useEffect(() => {
       if (isOpen && modalRef.current) {
         modalRef.current.focus()
       }
     }, [isOpen])
     
     return (
       <GlassModal ref={modalRef} tabIndex={-1}>
         Content
       </GlassModal>
     )
   }
   ```

3. **Color Contrast**
   ```css
   /* Ensure sufficient contrast for text */
   :root {
     --glass-text-color: #1a1a1a; /* Dark text */
     --glass-text-secondary: #4a4a4a; /* Secondary text */
   }
   ```

### Mobile and Responsive Issues

**Problem**: Components don't work properly on mobile devices or different screen sizes.

**Solutions**:

1. **Touch Target Size**
   ```tsx
   // ❌ Wrong - Button too small for touch
   <GlassButton size="xs">Tap</GlassButton>
   
   // ✅ Correct - Adequate touch target
   <GlassButton size="md" className="min-h-[44px] min-w-[44px]">
     Tap
   </GlassButton>
   ```

2. **Responsive Breakpoints**
   ```tsx
   <GlassCard className="p-4 md:p-6 lg:p-8 max-w-sm md:max-w-md lg:max-w-lg">
     Responsive content
   </GlassCard>
   ```

3. **iOS Safari Backdrop-Filter Bug**
   ```css
   /* Add WebKit prefix for iOS Safari */
   .glass-component {
     -webkit-backdrop-filter: blur(10px);
     backdrop-filter: blur(10px);
   }
   ```

## Framework-Specific Issues

### Next.js

1. **"ReferenceError: document is not defined"**
   ```tsx
   // Use dynamic imports for client-only components
   import dynamic from 'next/dynamic'
   
   const GlassComponent = dynamic(() => import('@liquidify/ui/component'), {
     ssr: false
   })
   ```

2. **Hydration errors**
   ```tsx
   // Use suppressHydrationWarning for animations
   <GlassButton suppressHydrationWarning>
     Animated Button
   </GlassButton>
   ```

### Vite

1. **"Failed to resolve import"**
   ```js
   // vite.config.js
   export default {
     optimizeDeps: {
       include: ['@liquidify/ui']
     }
   }
   ```

### Create React App

1. **"Module not found" errors**
   ```js
   // Add to craco.config.js
   module.exports = {
     webpack: {
       configure: (webpackConfig) => {
         webpackConfig.resolve.fallback = {
           ...webpackConfig.resolve.fallback,
           "stream": false,
           "crypto": false
         }
         return webpackConfig
       }
     }
   }
   ```

## Development Tools

### Browser DevTools

1. **Inspect Glass Effects**
   ```css
   /* Temporarily disable backdrop-filter to see layering */
   .glass-debug * {
     backdrop-filter: none !important;
     background: rgba(255, 0, 0, 0.1) !important;
   }
   ```

2. **Performance Profiling**
   - Open Chrome DevTools → Performance tab
   - Record interaction with glass components
   - Look for layout thrashing or excessive repaints

### Debug Mode

Enable debug mode to see component boundaries and states:

```tsx
import { ThemeProvider } from '@liquidify/ui'

<ThemeProvider theme="glass" debug={true}>
  <App />
</ThemeProvider>
```

## Getting Additional Help

### Before Asking for Help

1. **Check the Console**
   - Open browser developer tools
   - Look for error messages in Console tab
   - Check Network tab for failed requests

2. **Minimal Reproduction**
   Create a minimal example that reproduces the issue:
   ```tsx
   import { GlassButton, ThemeProvider } from '@liquidify/ui'
   import '@liquidify/ui/styles'
   
   function MinimalExample() {
     return (
       <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
         <ThemeProvider theme="glass">
           <GlassButton>Not working as expected</GlassButton>
         </ThemeProvider>
       </div>
     )
   }
   ```

3. **Environment Information**
   ```bash
   # Gather version information
   npm list @liquidify/ui
   npm list react
   node --version
   npm --version
   ```

### Where to Get Help

- **GitHub Issues**: [Create an issue](https://github.com/tuliopc23/LiqUIdify/issues) for bugs
- **Discussions**: [GitHub Discussions](https://github.com/tuliopc23/LiqUIdify/discussions) for questions
- **Documentation**: Check our [component docs](/components/) and [guides](/guide/)
- **Storybook**: Browse interactive examples at [liquidify-storybook.vercel.app](https://liquidify-storybook.vercel.app)

### Issue Template

When reporting issues, please include:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- LiqUIdify version: [e.g. 1.2.4]
- React version: [e.g. 18.2.0]
- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS]

**Additional context**
Add any other context about the problem here.
```

## Quick Fixes Checklist

When something's not working, try these quick fixes in order:

- [ ] Clear browser cache and hard refresh (Ctrl+Shift+R)
- [ ] Check if gradient background is applied
- [ ] Verify CSS import order
- [ ] Ensure ThemeProvider is wrapping components
- [ ] Check browser console for errors
- [ ] Try in incognito/private mode
- [ ] Update to latest LiqUIdify version
- [ ] Restart development server
- [ ] Clear node_modules and reinstall

Most issues can be resolved with these basic troubleshooting steps. If you're still having problems, don't hesitate to reach out for help!