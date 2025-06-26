# Performance Guide

LiquidiUI is built for performance, but here's how to get the best results:

## Bundle Size

### Core Library
- **Minified**: ~45KB
- **Gzipped**: ~12KB  
- **Tree-shakeable**: Import only what you need

```tsx
// ❌ Imports everything
import * from '@tuliopc23/liquidui'

// ✅ Tree-shakeable imports
import { GlassButton, GlassCard } from '@tuliopc23/liquidui'
```

### CSS
- **Full CSS**: ~89KB
- **Critical CSS**: ~15KB (core effects only)
- **Modular**: Import specific effect sets

```tsx
// ❌ Full CSS bundle
import '@tuliopc23/liquidui/dist/liquidui.css'

// ✅ Core effects only
import '@tuliopc23/liquidui/dist/glass-core.css'
```

## Runtime Performance

### Glass Effects Optimization
- GPU-accelerated with `will-change` where beneficial
- Automatic performance monitoring
- Adaptive quality based on device capabilities

```tsx
// Built-in performance monitoring
const { measureGlassInteraction } = useGlassEffectPerformance('Button')

// Automatic quality adjustment
<LiquidGlassProvider 
  config={{
    adaptToContent: true,
    performanceMode: 'auto' // 'high' | 'balanced' | 'battery'
  }}
>
```

### Physics Engine
- Spring calculations optimized for 60fps
- Automatic cleanup of unused animations
- Batched DOM updates

### Best Practices

#### 1. Use Content-Aware Adaptation Wisely
```tsx
// ✅ Good: Static backgrounds
<GlassCard adaptToContent={false}>
  Content with static background
</GlassCard>

// ❌ Avoid: Rapidly changing content
<GlassCard adaptToContent={true}>
  {animatingContent} // This will cause constant re-calculations
</GlassCard>
```

#### 2. Limit Simultaneous Magnetic Effects
```tsx
// ✅ Good: One magnetic element per viewport
<GlassButton magneticHover={true}>Main CTA</GlassButton>

// ❌ Avoid: Too many magnetic elements
{buttons.map(btn => 
  <GlassButton magneticHover={true}>{btn}</GlassButton> // Performance impact
)}
```

#### 3. Choose Appropriate Glass Variants
```tsx
// ✅ Good: Simple effects for lists
{items.map(item => 
  <GlassCard variant="light">{item}</GlassCard>
)}

// ❌ Avoid: Complex effects in large lists
{items.map(item => 
  <GlassCard variant="holographic">{item}</GlassCard> // Too expensive
)}
```

## Device-Specific Optimizations

### Mobile Devices
```tsx
// Automatic mobile optimization
const isMobile = /Android|iPhone/i.test(navigator.userAgent)

<LiquidGlassProvider
  config={{
    blur: isMobile ? 16 : 24, // Reduced blur on mobile
    specularHighlights: !isMobile, // Disable on mobile
    magneticHover: false // Disable magnetic on touch devices
  }}
>
```

### Low-End Devices
```tsx
// Performance mode for older devices
<LiquidGlassProvider
  config={{
    performanceMode: 'battery',
    adaptToContent: false,
    specularHighlights: false
  }}
>
```

## Monitoring Performance

### Built-in Monitoring
```tsx
// Enable performance monitoring in development
<LiquidGlassProvider
  config={{
    performanceMonitoring: process.env.NODE_ENV === 'development'
  }}
>
```

### Custom Monitoring
```tsx
// Track specific interactions
const { measureGlassInteraction } = useGlassEffectPerformance('CustomComponent')

const handleClick = () => {
  measureGlassInteraction('click', () => {
    // Your interaction logic
  })
}
```

## Common Performance Issues

### 1. Backdrop Filter Support
```css
/* Automatic fallback for unsupported browsers */
@supports not (backdrop-filter: blur(4px)) {
  .glass-effect {
    background: rgba(255, 255, 255, 0.25);
    /* Simplified styling without backdrop-filter */
  }
}
```

### 2. Memory Leaks
```tsx
// Automatic cleanup - no action needed
useEffect(() => {
  // LiquidiUI automatically cleans up:
  // - Animation frames
  // - Event listeners  
  // - Performance observers
  // - WebGL contexts
}, [])
```

### 3. Bundle Size Optimization
```tsx
// Use dynamic imports for heavy components
const GlassChart = lazy(() => import('@tuliopc23/liquidui/chart'))

// Conditional loading of effects
const advancedEffects = useMemo(() => 
  shouldLoadAdvancedEffects ? import('@tuliopc23/liquidui/advanced') : null
, [shouldLoadAdvancedEffects])
```

## Performance Benchmarks

### Glass Button (typical)
- **First render**: ~2ms
- **Hover interaction**: ~0.5ms
- **Memory usage**: ~50KB

### Glass Card with Adaptation
- **Content analysis**: ~1ms
- **Style update**: ~0.3ms
- **Re-render**: ~1ms

### Complex Glass Effects
- **Holographic**: ~3ms render
- **Aurora**: ~4ms render  
- **Plasma**: ~5ms render

---

**Need help optimizing?** Check our [performance examples](https://github.com/tuliopc23/liquidui/tree/main/examples/performance) or open an issue!