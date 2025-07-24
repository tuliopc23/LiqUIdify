# GlassButton

A glassmorphic button component with advanced visual effects and animations.

## Import

```tsx
import { GlassButton } from '@liquidui/core';
// or
import { GlassButton } from '@liquidui/core/button';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'destructive' \| 'secondary' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Button size |
| `glassEffect` | `boolean` | `true` | Enable glassmorphic effect |
| `loading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable button |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `asChild` | `boolean` | `false` | Render as child element |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |

## Examples

### Basic Usage

```tsx
<GlassButton onClick={() => console.log('clicked')}>
  Click me
</GlassButton>
```

### Variants

```tsx
<GlassButton variant="default">Default</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton variant="destructive">Destructive</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="link">Link</GlassButton>
```

### Sizes

```tsx
<GlassButton size="sm">Small</GlassButton>
<GlassButton size="md">Medium</GlassButton>
<GlassButton size="lg">Large</GlassButton>
<GlassButton size="icon">
  <Icon />
</GlassButton>
```

### Loading State

```tsx
<GlassButton loading>
  Saving...
</GlassButton>
```

### With Icon

```tsx
<GlassButton>
  <Icon className="mr-2" />
  Button with icon
</GlassButton>
```

## Accessibility

- Supports keyboard navigation
- ARIA attributes for loading and disabled states
- Focus visible styles
- Proper button role and semantics

## Styling

The component accepts a `className` prop for custom styling:

```tsx
<GlassButton className="custom-class">
  Styled Button
</GlassButton>
```

## Performance

- Optimized animations using CSS transforms
- Lazy-loaded glass effects
- Memoized event handlers
- Efficient re-renders with React.memo