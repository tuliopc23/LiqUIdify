# GlassCard

A glassmorphic card component with customizable visual effects and layout options.

## Import

```tsx
import { GlassCard, GlassCardHeader, GlassCardContent, GlassCardFooter } from '@liquidui/core';
// or
import { GlassCard, GlassCardHeader, GlassCardContent, GlassCardFooter } from '@liquidui/core/card';
```

## Components

### GlassCard

The main container component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Visual style variant |
| `glassEffect` | `boolean` | `true` | Enable glassmorphic effect |
| `interactive` | `boolean` | `false` | Enable hover/focus effects |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

### GlassCardHeader

Header section of the card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Header content |

### GlassCardContent

Main content area of the card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Content |

### GlassCardFooter

Footer section of the card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Footer content |

## Examples

### Basic Usage

```tsx
<GlassCard>
  <GlassCardHeader>
    <h3>Card Title</h3>
  </GlassCardHeader>
  <GlassCardContent>
    <p>Card content goes here</p>
  </GlassCardContent>
  <GlassCardFooter>
    <GlassButton>Action</GlassButton>
  </GlassCardFooter>
</GlassCard>
```

### Variants

```tsx
<GlassCard variant="default">Default card</GlassCard>
<GlassCard variant="elevated">Elevated card</GlassCard>
<GlassCard variant="outlined">Outlined card</GlassCard>
<GlassCard variant="filled">Filled card</GlassCard>
```

### Interactive Card

```tsx
<GlassCard interactive onClick={() => console.log('clicked')}>
  <GlassCardContent>
    Click me!
  </GlassCardContent>
</GlassCard>
```

### Without Glass Effect

```tsx
<GlassCard glassEffect={false}>
  <GlassCardContent>
    Solid background card
  </GlassCardContent>
</GlassCard>
```

### Complex Layout

```tsx
<GlassCard>
  <GlassCardHeader>
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Dashboard</h3>
      <GlassButton size="icon" variant="ghost">
        <SettingsIcon />
      </GlassButton>
    </div>
  </GlassCardHeader>
  <GlassCardContent>
    <div className="grid grid-cols-2 gap-4">
      <div>Metric 1</div>
      <div>Metric 2</div>
    </div>
  </GlassCardContent>
  <GlassCardFooter className="flex justify-end gap-2">
    <GlassButton variant="outline">Cancel</GlassButton>
    <GlassButton>Save</GlassButton>
  </GlassCardFooter>
</GlassCard>
```

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy support
- Interactive cards have appropriate ARIA attributes
- Keyboard navigation support for interactive cards

## Styling

All components accept `className` for custom styling:

```tsx
<GlassCard className="custom-card">
  <GlassCardHeader className="custom-header">
    Header
  </GlassCardHeader>
</GlassCard>
```

## Performance

- Optimized glass blur effects
- Efficient re-renders with component composition
- CSS-based animations for smooth transitions