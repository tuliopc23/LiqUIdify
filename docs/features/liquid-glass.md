# Liquid Glass Design System

Learn how to use Apple's signature Liquid Glass visual language with WWDC 2025 enhancements in LiqUIdify.

## What is Liquid Glass?

Liquid Glass is Apple's design language featuring:
- **Translucent backgrounds** with blur effects
- **Multi-layer depth** through pseudo-elements
- **Dynamic light refraction** (lensing effects)
- **Frosted glass materials** with non-uniform opacity
- **Motion-responsive highlights** that adapt to device tilt
- **P3 wide gamut colors** for enhanced vibrancy

## WWDC 2025 Features

LiqUIdify includes all WWDC 2025 Liquid Glass specifications:

### 1. Lensing Effects
Light refraction and optical depth for authentic glass appearance.

```tsx
import { css } from 'styled-system/css';

const glassCard = css({
  background: 'token(colors.glass.lensing.edgeHighlight)',
  backgroundImage: 'token(colors.glass.lensing.opticalDepth.medium)',
  filter: 'hue-rotate(token(colors.glass.lensing.hueShift.subtle))'
});
```

### 2. Frostiness
Non-uniform opacity gradients for frosted glass texture.

```tsx
const frostOverlay = css({
  background: 'token(colors.glass.frost.medium)',
  backgroundImage: 'token(colors.glass.frost.texture)',
  backdropFilter: 'blur(token(blurs.glass.md))'
});
```

### 3. Motion-Responsive Highlights
Dynamic highlights that respond to device tilt (with reduced-motion fallback).

```tsx
const motionGlass = css({
  background: 'token(colors.glass.motion.tiltHighlight.static)',
  '@media (prefers-reduced-motion: no-preference)': {
    background: 'token(colors.glass.motion.tiltHighlight.dynamic)'
  },
  boxShadow: 'token(colors.glass.motion.dynamicGlow.medium)'
});
```

### 4. Adaptive Contrast
Context-aware vibrancy that adjusts based on background.

```tsx
const adaptiveGlass = css({
  background: 'token(colors.glass.adaptive.contextTint.onLight)',
  color: 'token(colors.glass.adaptive.legibilityBoost.medium)',
  backdropFilter: 'saturate(token(colors.glass.adaptive.vibrancyLevel.high))'
});
```

### 5. P3 Color Space
Wide gamut colors with 20-30% vibrancy boost on capable displays.

```tsx
// Automatically uses P3 on supported displays
const p3Glass = css({
  background: 'token(colors.glass.lensing.edgeHighlight)', // sRGB fallback
  // P3 variant applied automatically via _p3 tokens
});
```

## Using Liquid Glass in Components

All LiqUIdify components use Liquid Glass by default. You can also apply it to custom elements:

### Basic Glass Effect

```tsx
import { css } from 'styled-system/css';

export function GlassCard({ children }) {
  return (
    <div className={css({
      background: 'token(colors.glass.bg)',
      backdropFilter: 'blur(token(blurs.glass.md))',
      border: '1px solid token(colors.glass.border)',
      borderRadius: 'token(radii.lg)',
      padding: 'token(spacing.glass.lg)'
    })}>
      {children}
    </div>
  );
}
```

### Advanced: Multi-Layer Depth

```tsx
const glassCardWithDepth = css({
  position: 'relative',
  background: 'token(colors.glass.bg)',
  backdropFilter: 'blur(token(blurs.glass.md))',
  
  _before: {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'token(colors.glass.lensing.opticalDepth.light)',
    pointerEvents: 'none',
    zIndex: 1
  },
  
  _after: {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'token(colors.glass.frost.medium)',
    pointerEvents: 'none',
    zIndex: 0
  }
});
```

### Performance-Optimized Glass

```tsx
const optimizedGlass = css({
  background: 'token(colors.glass.bg)',
  backdropFilter: 'blur(token(blurs.glass.md))',
  
  // GPU optimization tokens
  willChange: 'token(performance.willChange.glass)',
  transform: 'token(performance.transform.gpuAccel)',
  isolation: 'token(performance.isolation.layer)',
  contain: 'token(performance.contain.paint)'
});
```

## Available Tokens

### Lensing Tokens
- `colors.glass.lensing.edgeHighlight` - Top-edge glow
- `colors.glass.lensing.refraction` - Optical distortion gradient
- `colors.glass.lensing.opticalDepth.{light|medium|strong}` - Multi-layer depth
- `colors.glass.lensing.hueShift.{subtle|medium|strong}` - Color refraction (2deg, 5deg, 8deg)

### Frostiness Tokens
- `colors.glass.frost.{light|medium|heavy}` - Opacity gradients
- `colors.glass.frost.texture` - Repeating gradient texture

### Motion Tokens
- `colors.glass.motion.tiltHighlight.{static|dynamic}` - Device tilt highlights
- `colors.glass.motion.reflectionAngle.{top|topRight|right}` - Directional gradients
- `colors.glass.motion.dynamicGlow.{subtle|medium|strong}` - Motion-based glow

### Adaptive Tokens
- `colors.glass.adaptive.contextTint.{onLight|onDark|onMedium}` - Background-aware tinting
- `colors.glass.adaptive.legibilityBoost.{subtle|medium|strong}` - Contrast enhancement
- `colors.glass.adaptive.vibrancyLevel.{low|medium|high}` - Auto-adjusting saturation (1.2, 1.5, 1.8)

### Performance Tokens
- `performance.willChange.{glass|transform|opacity|backdrop}` - Layer promotion
- `performance.transform.{gpuAccel|gpuAccelScale}` - GPU acceleration
- `performance.isolation.{layer|auto}` - Multi-layer optimization
- `performance.contain.{layout|paint|strict|content}` - Paint containment

## P3 Color Space

All Liquid Glass tokens include P3 variants for enhanced vibrancy:

```tsx
// sRGB fallback (standard displays)
background: 'token(colors.glass.lensing.edgeHighlight)'
// rgba(255, 255, 255, 0.35)

// P3 enhanced (wide gamut displays)
background: 'token(colors.glass.lensing.edgeHighlight._p3)'
// color(display-p3 1 1 1 / 0.45)
```

**Browsers automatically choose** the P3 variant on capable displays (Pro Display XDR, iPad Pro 11"/12.9", iPhone 12+, etc.).

## Browser Support

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| backdrop-filter | ✅ 76+ | ✅ 9+ | ✅ 103+ | ✅ 79+ |
| P3 color space | ✅ 111+ | ✅ 10+ | ✅ 113+ | ✅ 111+ |
| Lensing effects | ✅ | ✅ | ✅ | ✅ |
| Motion highlights | ✅ | ✅ | ✅ | ✅ |

**Fallbacks:** LiqUIdify automatically provides sRGB fallbacks for P3 colors and solid colors for unsupported blur.

## Accessibility

Liquid Glass respects user preferences:

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Motion-responsive highlights use static fallback */
  background: token(colors.glass.motion.tiltHighlight.static);
}
```

### Reduced Transparency

```css
@media (prefers-reduced-transparency: reduce) {
  /* Increase opacity for users with vestibular disorders */
  background: rgba(255, 255, 255, 0.9); /* Higher opacity */
  backdropFilter: none; /* Remove blur */
}
```

### High Contrast

```css
@media (prefers-contrast: more) {
  /* Enhance borders and text for better visibility */
  border: 2px solid token(colors.glass.border);
  color: token(colors.glass.adaptive.legibilityBoost.strong);
}
```

## Examples

### Complete Liquid Glass Card

```tsx
import { css } from 'styled-system/css';
import { Button } from 'liquidify-react/button';

export function LiquidGlassCard() {
  return (
    <div className={css({
      // Base glass
      background: 'token(colors.glass.bg)',
      backdropFilter: 'blur(token(blurs.glass.md))',
      border: '1px solid token(colors.glass.border)',
      borderRadius: 'token(radii.lg)',
      padding: 'token(spacing.glass.lg)',
      
      // Lensing for optical depth
      backgroundImage: 'token(colors.glass.lensing.opticalDepth.medium)',
      filter: 'hue-rotate(token(colors.glass.lensing.hueShift.subtle))',
      
      // Performance optimization
      willChange: 'token(performance.willChange.glass)',
      transform: 'token(performance.transform.gpuAccel)',
      isolation: 'token(performance.isolation.layer)',
      
      // Frost overlay
      _before: {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'token(colors.glass.frost.light)',
        pointerEvents: 'none',
        zIndex: 1
      },
      
      // Motion-responsive highlight
      '@media (prefers-reduced-motion: no-preference)': {
        _after: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'token(colors.glass.motion.tiltHighlight.dynamic)',
          pointerEvents: 'none',
          zIndex: 2
        }
      }
    })}>
      <h2>WWDC 2025 Liquid Glass</h2>
      <p>Experience Apple's latest design language on the web.</p>
      <Button>Learn More</Button>
    </div>
  );
}
```

---

**Next:** [Lensing Effects](./lensing-effects.md) | [P3 Color Space](./p3-color-space.md)
