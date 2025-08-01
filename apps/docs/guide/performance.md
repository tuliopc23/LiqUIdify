# Performance Guide

This guide covers performance optimization techniques for LiqUIdify components, helping you build fast and smooth glassmorphism interfaces.

## Understanding Glassmorphism Performance

Glassmorphism effects rely on CSS properties that can be expensive to render:

- **backdrop-filter**: Applies blur effects to background content
- **transform**: Creates smooth animations and transitions
- **opacity**: Controls transparency levels
- **box-shadow**: Adds depth and lighting effects

Understanding these costs helps you optimize effectively.

## Performance Best Practices

### 1. Hardware Acceleration

Enable GPU acceleration for smooth animations:

```tsx
// ✅ Enable hardware acceleration
<GlassButton 
  className="transform-gpu will-change-transform"
  style={{ transform: 'translateZ(0)' }}
>
  Optimized Button
</GlassButton>

// ✅ For components with frequent animations
<GlassCard className="transform-gpu">
  <div className="will-change-transform">
    Animated content
  </div>
</GlassCard>
```

```css
/* Global optimization for glass components */
.glass-optimized {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### 2. Optimize Backdrop Filters

Reduce blur intensity for better performance:

```css
/* ❌ Heavy blur - can cause performance issues */
:root {
  --glass-blur: 20px;
}

/* ✅ Optimal blur - good balance of visual effect and performance */
:root {
  --glass-blur: 8px;
}

/* ✅ Light blur - best performance */
:root {
  --glass-blur: 4px;
}
```

Use conditional blur based on device capabilities:

```tsx
import { useState, useEffect } from 'react'

function usePerformanceMode() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // Detect low-performance devices
    const isLowEnd = navigator.hardwareConcurrency <= 4 || 
                     /Android.*Mobile/.test(navigator.userAgent)
    setIsLowPerformance(isLowEnd)
  }, [])

  return isLowPerformance
}

function OptimizedGlassCard({ children }) {
  const isLowPerformance = usePerformanceMode()
  
  return (
    <GlassCard 
      className={isLowPerformance ? 'glass-fallback' : 'glass-full'}
    >
      {children}
    </GlassCard>
  )
}
```

```css
/* Performance-based glass effects */
.glass-full {
  backdrop-filter: blur(10px);
}

.glass-fallback {
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.15);
}
```

### 3. Bundle Size Optimization

Use tree shaking to reduce bundle size:

```tsx
// ❌ Imports entire library (~60KB)
import { GlassButton, GlassCard, GlassInput } from '@liquidify/ui'

// ✅ Individual imports for optimal tree shaking (~5KB each)
import { GlassButton } from '@liquidify/ui/button'
import { GlassCard } from '@liquidify/ui/card'
import { GlassInput } from '@liquidify/ui/input'

// ✅ Bundle imports by category (~15-25KB per bundle)
import { GlassButton, GlassInput } from '@liquidify/ui/forms'
import { GlassCard } from '@liquidify/ui/core'
```

Configure your bundler for optimal tree shaking:

```js
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false
  },
  resolve: {
    mainFields: ['module', 'main']
  }
}

// vite.config.js
export default {
  build: {
    rollupOptions: {
      treeshake: true
    }
  }
}
```

### 4. Animation Performance

Optimize animations for 60fps performance:

```tsx
// ✅ Use transform instead of changing layout properties
<GlassButton 
  className="transition-transform hover:scale-105"
  style={{ 
    transform: 'translateZ(0)',
    willChange: 'transform'
  }}
>
  Hover me
</GlassButton>

// ❌ Avoid animating layout properties
<GlassButton 
  className="transition-all hover:w-32 hover:h-16"
>
  Slow animation
</GlassButton>
```

Use CSS custom properties for smooth color transitions:

```css
.glass-button {
  --button-bg: rgba(255, 255, 255, 0.1);
  background: var(--button-bg);
  transition: --button-bg 0.3s ease;
}

.glass-button:hover {
  --button-bg: rgba(255, 255, 255, 0.2);
}
```

### 5. Memory Management

Prevent memory leaks with proper cleanup:

```tsx
import { useEffect, useRef } from 'react'

function AnimatedGlassCard() {
  const animationRef = useRef<number>()
  
  useEffect(() => {
    const animate = () => {
      // Animation logic
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Cleanup animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return <GlassCard>Animated content</GlassCard>
}
```

## Measuring Performance

### 1. Browser DevTools

Use Chrome DevTools Performance tab:

```tsx
// Add performance marks for profiling
function ProfiledComponent() {
  useEffect(() => {
    performance.mark('glass-component-start')
    
    return () => {
      performance.mark('glass-component-end')
      performance.measure(
        'glass-component-render',
        'glass-component-start',
        'glass-component-end'
      )
    }
  }, [])
  
  return <GlassCard>Profiled content</GlassCard>
}
```

### 2. Performance Monitoring

Set up automated performance monitoring:

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Monitor Core Web Vitals
getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)

// Custom glass effect performance metric
function measureGlassRenderTime() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('glass')) {
        console.log(`${entry.name}: ${entry.duration}ms`)
      }
    }
  })
  
  observer.observe({ entryTypes: ['measure'] })
}
```

### 3. Bundle Analysis

Analyze your bundle size:

```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run build -- --analyze
```

```js
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
}
```

## Platform-Specific Optimizations

### Mobile Devices

Optimize for mobile performance:

```tsx
import { useState, useEffect } from 'react'

function useMobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

function MobileOptimizedCard() {
  const isMobile = useMobileOptimizations()
  
  return (
    <GlassCard 
      className={isMobile ? 'glass-mobile' : 'glass-desktop'}
    >
      Content
    </GlassCard>
  )
}
```

```css
/* Mobile optimizations */
@media (max-width: 768px) {
  .glass-mobile {
    backdrop-filter: blur(4px); /* Reduced blur */
    transform: translateZ(0); /* Force hardware acceleration */
  }
}

/* Desktop optimizations */
@media (min-width: 769px) {
  .glass-desktop {
    backdrop-filter: blur(10px);
    will-change: transform;
  }
}
```

### Safari Optimizations

Handle Safari-specific performance issues:

```css
/* Safari backdrop-filter optimization */
@supports (-webkit-backdrop-filter: blur(1px)) {
  .glass-safari {
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  }
}

/* Prevent Safari blur lag */
.glass-safari {
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
}
```

### Low-End Device Fallbacks

Provide fallbacks for low-performance devices:

```tsx
function PerformanceAwareGlass({ children }) {
  const [canUseGlass, setCanUseGlass] = useState(true)
  
  useEffect(() => {
    // Feature detection
    const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)')
    const isLowEnd = navigator.hardwareConcurrency <= 2
    
    setCanUseGlass(supportsBackdropFilter && !isLowEnd)
  }, [])
  
  if (!canUseGlass) {
    return (
      <div className="fallback-card bg-white/90 rounded-lg border">
        {children}
      </div>
    )
  }
  
  return <GlassCard>{children}</GlassCard>
}
```

## Advanced Performance Techniques

### 1. Virtual Scrolling for Large Lists

Optimize large lists with glass components:

```tsx
import { FixedSizeList as List } from 'react-window'

function VirtualizedGlassList({ items }) {
  const renderItem = ({ index, style }) => (
    <div style={style}>
      <GlassCard className="m-2">
        {items[index]}
      </GlassCard>
    </div>
  )
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={120}
    >
      {renderItem}
    </List>
  )
}
```

### 2. Intersection Observer for Lazy Effects

Load glass effects only when visible:

```tsx
import { useRef, useEffect, useState } from 'react'

function LazyGlassCard({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div 
      ref={cardRef}
      className={isVisible ? 'glass-card' : 'placeholder-card'}
    >
      {children}
    </div>
  )
}
```

### 3. Component Memoization

Prevent unnecessary re-renders:

```tsx
import { memo, useMemo } from 'react'

// Memoize expensive glass components
const MemoizedGlassCard = memo(function GlassCard({ 
  children, 
  variant,
  ...props 
}) {
  const cardClassName = useMemo(() => {
    return `glass-card glass-${variant} ${props.className || ''}`
  }, [variant, props.className])
  
  return (
    <div className={cardClassName} {...props}>
      {children}
    </div>
  )
})

// Use with stable props
function OptimizedList({ items }) {
  return (
    <div>
      {items.map(item => (
        <MemoizedGlassCard 
          key={item.id}
          variant="primary"
        >
          {item.content}
        </MemoizedGlassCard>
      ))}
    </div>
  )
}
```

## Performance Monitoring Dashboard

Create a performance monitoring component:

```tsx
import { useState, useEffect } from 'react'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  glassEffectCount: number
}

function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    glassEffectCount: 0
  })
  
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
          glassEffectCount: document.querySelectorAll('[class*="glass"]').length
        }))
        
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    measureFPS()
  }, [])
  
  return (
    <GlassCard className="fixed top-4 right-4 p-4 text-sm">
      <h3 className="font-semibold mb-2">Performance</h3>
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {Math.round(metrics.memoryUsage / 1024 / 1024)}MB</div>
      <div>Glass Elements: {metrics.glassEffectCount}</div>
    </GlassCard>
  )
}
```

## Performance Checklist

Use this checklist to ensure optimal performance:

### Development
- [ ] Use individual component imports
- [ ] Enable hardware acceleration with `transform-gpu`
- [ ] Set appropriate `will-change` properties
- [ ] Use `transform` instead of layout properties for animations
- [ ] Implement proper cleanup in useEffect hooks

### Styling
- [ ] Optimize backdrop-filter blur values (4-10px)
- [ ] Use CSS custom properties for smooth transitions
- [ ] Implement mobile-specific optimizations
- [ ] Add Safari-specific fixes
- [ ] Provide fallbacks for unsupported browsers

### Bundle
- [ ] Configure tree shaking in bundler
- [ ] Analyze bundle size regularly
- [ ] Use code splitting for large applications
- [ ] Implement lazy loading for non-critical components

### Monitoring
- [ ] Set up Core Web Vitals monitoring
- [ ] Profile components with browser DevTools
- [ ] Monitor memory usage and cleanup
- [ ] Test on various devices and browsers

### Production
- [ ] Enable production build optimizations
- [ ] Use CDN for static assets
- [ ] Implement proper caching strategies
- [ ] Monitor real user performance metrics

## Common Performance Anti-Patterns

Avoid these common performance mistakes:

```tsx
// ❌ DON'T: Inline styles that change frequently
<GlassCard style={{ opacity: Math.random() }}>
  Content
</GlassCard>

// ✅ DO: Use CSS custom properties
<GlassCard 
  style={{ '--opacity': opacity }}
  className="glass-dynamic"
>
  Content
</GlassCard>

// ❌ DON'T: Complex animations on every frame
const AnimatedCard = () => {
  const [rotation, setRotation] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 16) // 60fps
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <GlassCard style={{ transform: `rotate(${rotation}deg)` }}>
      Expensive animation
    </GlassCard>
  )
}

// ✅ DO: Use CSS animations or requestAnimationFrame
<GlassCard className="spin-animation">
  Optimized animation
</GlassCard>
```

Following these performance guidelines will ensure your LiqUIdify components run smoothly across all devices and browsers, providing users with a fast and delightful glassmorphism experience.