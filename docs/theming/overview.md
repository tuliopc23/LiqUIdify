# Theming Overview

Complete guide to LiqUIdify's design system and theming capabilities.

## Design System Foundation

LiqUIdify is built on **Panda CSS** with a comprehensive token system that implements 100% Apple Human Interface Guidelines compliance.

### Core Principles

1. **Apple HIG Compliance** - Every token matches iOS 17/macOS 14 specifications
2. **Dynamic Theming** - Runtime theme and accent color switching
3. **WCAG 2.1 AA** - Accessible by default with proper contrast ratios
4. **P3 Color Space** - Wide gamut support for modern displays
5. **Reduced Motion** - Respects user preferences automatically

---

## Theme System Architecture

```
Design Tokens (Panda CSS)
├── Colors
│   ├── Glass (Liquid Glass effects)
│   ├── Accent (Dynamic accent system)
│   ├── Semantic (Text, borders, backgrounds)
│   └── Materials (Vibrancy tiers)
├── Typography
│   ├── Font families (SF Pro fallbacks)
│   ├── Font sizes (Apple HIG scale)
│   ├── Line heights (Optimized for readability)
│   └── Letter spacing (SF Pro adjustments)
├── Spacing
│   ├── Glass spacing (4px - 32px)
│   └── Button padding (Compact, Regular, Large)
├── Border Radii
│   ├── Base radii (4px - 24px)
│   └── Role-based (button, card, field, etc.)
├── Shadows
│   ├── Elevation system (0dp - 24dp)
│   └── Glass shadows (Multi-layer depth)
├── Animation
│   ├── Durations (Apple standard timing)
│   ├── Easings (Cubic bezier curves)
│   └── Spring physics (Mass, stiffness, damping)
└── WWDC 2025 Features
    ├── Lensing (Light refraction)
    ├── Frostiness (Frosted glass)
    ├── Motion-responsive (Device tilt)
    ├── Adaptive contrast (Context-aware)
    └── Performance (GPU optimization)
```

---

## Theme Modes

LiqUIdify supports three theme modes:

### Light Mode
Default iOS/macOS light appearance with high contrast.

```tsx
<ThemeProvider defaultMode="light">
  {children}
</ThemeProvider>
```

### Dark Mode
Apple-standard dark mode with reduced luminance.

```tsx
<ThemeProvider defaultMode="dark">
  {children}
</ThemeProvider>
```

### System Mode
Follows OS preference via `prefers-color-scheme` media query.

```tsx
<ThemeProvider defaultMode="system">
  {children}
</ThemeProvider>
```

**Auto-updates:** System mode automatically responds to OS theme changes without page reload.

---

## Accent Colors

Dynamic accent color system with 11 built-in presets:

```tsx
<ThemeProvider accentPreset="blue">
  {children}
</ThemeProvider>
```

**Available Presets:**
- `blue` - #007AFF (Default, iOS Blue)
- `green` - #34C759 (iOS Green)
- `red` - #FF3B30 (iOS Red)
- `orange` - #FF9500 (iOS Orange)
- `yellow` - #FFCC00 (iOS Yellow)
- `pink` - #FF2D55 (iOS Pink)
- `purple` - #AF52DE (iOS Purple)
- `indigo` - #5856D6 (iOS Indigo)
- `teal` - #30B0C7 (iOS Teal)
- `cyan` - #32ADE6 (iOS Cyan)
- `mint` - #00C7BE (iOS Mint)

**Custom Colors:**
```tsx
<ThemeProvider defaultAccent="#FF6B35">
  {children}
</ThemeProvider>
```

[Learn more about Accent Colors →](./accent-colors.md)

---

## Design Tokens

### Accessing Tokens

Use Panda CSS token function in your components:

```tsx
import { css } from 'styled-system/css';

const styles = css({
  background: 'token(colors.glass.bg)',
  color: 'token(colors.text.glass.primary)',
  borderRadius: 'token(radii.lg)',
  padding: 'token(spacing.glass.lg)',
  fontSize: 'token(fontSizes.body)',
  fontFamily: 'token(fonts.sans)',
});
```

### Token Categories

#### Colors
```tsx
// Glass effects
'token(colors.glass.bg)'                    // Base glass background
'token(colors.glass.border)'                // Glass border
'token(colors.glass.subtle.bg)'             // Subtle glass

// Accent colors
'token(colors.accent.dynamic)'              // Current accent color
'token(colors.accent.primary)'              // iOS Blue

// Text colors
'token(colors.text.glass.primary)'          // Primary text
'token(colors.text.glass.secondary)'        // Secondary text

// WWDC 2025 features
'token(colors.glass.lensing.edgeHighlight)' // Lensing effect
'token(colors.glass.frost.medium)'          // Frostiness
'token(colors.glass.motion.tiltHighlight)'  // Motion-responsive
```

#### Typography
```tsx
// Font families
'token(fonts.sans)'         // SF Pro Display fallback stack
'token(fonts.display)'      // Display text
'token(fonts.mono)'         // SF Mono fallback stack

// Font sizes (Apple HIG scale)
'token(fontSizes.caption2)'   // 11px
'token(fontSizes.body)'       // 17px (Default)
'token(fontSizes.title1)'     // 28px
'token(fontSizes.largeTitle)' // 34px

// Line heights
'token(lineHeights.normal)'   // 1.25 (Apple standard)
'token(lineHeights.tight)'    // 1.1 (For large titles)
```

#### Spacing
```tsx
// Glass spacing
'token(spacing.glass.xs)'   // 4px
'token(spacing.glass.sm)'   // 8px
'token(spacing.glass.md)'   // 12px
'token(spacing.glass.lg)'   // 16px
'token(spacing.glass.xl)'   // 20px
```

#### Border Radii
```tsx
// Base radii
'token(radii.sm)'    // 6px
'token(radii.md)'    // 8px
'token(radii.lg)'    // 12px
'token(radii.xl)'    // 16px

// Role-based (Apple HIG)
'token(radii.roles.button)'  // Full (pill shape)
'token(radii.roles.card)'    // 16px (iOS 17 standard)
'token(radii.roles.field)'   // 12px
```

#### Shadows
```tsx
// Elevation system (iOS depth)
'token(shadows.elevation.0)'   // None
'token(shadows.elevation.1)'   // 1dp
'token(shadows.elevation.4)'   // 4dp
'token(shadows.elevation.8)'   // 8dp
'token(shadows.elevation.16)'  // 16dp
'token(shadows.elevation.24)'  // 24dp

// Glass shadows
'token(shadows.glass.base)'    // Base glass shadow
'token(shadows.glass.hover)'   // Elevated glass
```

#### Animation
```tsx
// Durations (Apple HIG)
'token(durations.glass.instant)'  // 0.15s (Tooltips, switches)
'token(durations.glass.quick)'    // 0.3s (Standard transitions)
'token(durations.glass.flow)'     // 0.5s (Sheets, modals)

// Easings (Apple cubic beziers)
'token(easings.glass.flow)'       // Standard ease
'token(easings.glass.bounce)'     // Spring overshoot
'token(easings.glass.spring)'     // Natural spring
```

---

## Customization Levels

### Level 1: Theme Provider Props
Easiest - No code changes needed.

```tsx
<ThemeProvider
  defaultMode="dark"
  accentPreset="purple"
  persistTheme={true}
/>
```

### Level 2: CSS Custom Properties
Medium - Override via CSS variables.

```css
:root {
  --ui-accent: #FF6B35;
  --glass-bg: rgba(255, 255, 255, 0.15);
}
```

### Level 3: Panda Config Extension
Advanced - Extend design tokens.

```ts
// panda.config.ts
export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            primary: { value: '#FF6B35' },
            secondary: { value: '#4ECDC4' },
          },
        },
      },
    },
  },
});
```

[Learn more about Custom Tokens →](./custom-tokens.md)

---

## Accessibility Features

### Automatic Contrast
All color combinations meet WCAG 2.1 AA standards:
- **Body text:** 4.5:1 minimum contrast
- **Large text:** 3:1 minimum contrast
- **UI components:** 3:1 minimum contrast

### User Preferences

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled or instant */
}
```

#### Reduced Transparency
```css
@media (prefers-reduced-transparency: reduce) {
  /* Increased opacity, blur removed */
}
```

#### High Contrast
```css
@media (prefers-contrast: more) {
  /* Enhanced borders and text */
}
```

#### Dark Mode
```css
@media (prefers-color-scheme: dark) {
  /* Dark theme colors */
}
```

---

## Best Practices

### 1. Use Theme Provider

Always wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from 'liquidify-react/theme';

function App() {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### 2. Use Design Tokens

Prefer tokens over hardcoded values:

```tsx
// ✅ Good: Uses design tokens
const Card = css({
  background: 'token(colors.glass.bg)',
  borderRadius: 'token(radii.lg)',
  padding: 'token(spacing.glass.lg)',
});

// ❌ Bad: Hardcoded values
const Card = css({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '16px',
});
```

### 3. Respect User Preferences

Always account for accessibility preferences:

```tsx
const button = css({
  transition: 'all token(durations.glass.quick)',
  
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
});
```

### 4. Test in Both Modes

Always test components in light and dark modes:

```tsx
// Use ThemeToggle component for testing
import { ThemeToggle } from '@/components/ThemeToggle';
```

---

## Related Guides

- **[Theme Provider Configuration](./theme-provider.md)** - Complete ThemeProvider API
- **[Accent Colors](./accent-colors.md)** - Dynamic accent color system
- **[Dark Mode Implementation](./dark-mode.md)** - Dark mode setup and best practices
- **[Custom Tokens](./custom-tokens.md)** - Extending the design system
- **[WWDC 2025 Features](../features/liquid-glass.md)** - Liquid Glass tokens

---

**Next:** [Theme Provider →](./theme-provider.md) | [Accent Colors →](./accent-colors.md)
