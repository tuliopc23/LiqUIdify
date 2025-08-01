# GlassCard

A versatile container component with glassmorphism design, perfect for grouping related content.

## Import

```tsx
import { GlassCard } from '@liquidify/components';
// or
import { GlassCard } from '@liquidify/components/card';
```

## Basic Usage

```tsx
<GlassCard>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</GlassCard>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Visual style variant |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Padding size |
| `hover` | `boolean` | `false` | Enable hover effects |
| `clickable` | `boolean` | `false` | Make card clickable |
| `disabled` | `boolean` | `false` | Disable interactions |
| `className` | `string` | `''` | Additional CSS classes |
| `onClick` | `() => void` | - | Click handler |
| `as` | `ElementType` | `'div'` | HTML element to render |

## Examples

### Card Variants

```tsx
<div className="space-y-4">
  <GlassCard variant="default">
    <h3>Default Card</h3>
    <p>Standard glassmorphism appearance</p>
  </GlassCard>

  <GlassCard variant="elevated">
    <h3>Elevated Card</h3>
    <p>With enhanced shadow for depth</p>
  </GlassCard>

  <GlassCard variant="outlined">
    <h3>Outlined Card</h3>
    <p>Prominent border, minimal background</p>
  </GlassCard>

  <GlassCard variant="filled">
    <h3>Filled Card</h3>
    <p>Solid background with glass overlay</p>
  </GlassCard>
</div>
```

### Interactive Card

```tsx
<GlassCard
  hover
  clickable
  onClick={() => console.log('Card clicked')}
  className="cursor-pointer"
>
  <h3>Interactive Card</h3>
  <p>Click me! I have hover effects.</p>
</GlassCard>
```

### Card with Header & Footer

```tsx
<GlassCard padding="none">
  <div className="p-4 border-b border-white/10">
    <h3 className="font-semibold">Card Header</h3>
  </div>
  
  <div className="p-4">
    <p>Main content area with custom sections</p>
  </div>
  
  <div className="p-4 border-t border-white/10">
    <div className="flex justify-end gap-2">
      <GlassButton size="sm" variant="secondary">Cancel</GlassButton>
      <GlassButton size="sm" variant="primary">Save</GlassButton>
    </div>
  </div>
</GlassCard>
```

### Media Card

```tsx
<GlassCard padding="none" className="overflow-hidden">
  <img 
    src="/image.jpg" 
    alt="Card media"
    className="w-full h-48 object-cover"
  />
  <div className="p-4">
    <h3 className="font-semibold mb-2">Beautiful Landscape</h3>
    <p className="text-sm text-gray-600">
      A stunning view of mountains at sunset
    </p>
  </div>
</GlassCard>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <GlassCard key={item.id} hover>
      <h3 className="font-semibold mb-2">{item.title}</h3>
      <p className="text-sm">{item.description}</p>
      <GlassBadge className="mt-3">{item.category}</GlassBadge>
    </GlassCard>
  ))}
</div>
```

## Styling

### Custom Padding

```tsx
<GlassCard padding="xl">
  <p>Extra large padding for spacious layouts</p>
</GlassCard>

<GlassCard className="p-8 md:p-12">
  <p>Custom responsive padding using Tailwind</p>
</GlassCard>
```

### Custom Colors

```tsx
<GlassCard 
  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10"
>
  <h3>Gradient Card</h3>
  <p>With custom gradient background</p>
</GlassCard>
```

## Accessibility

- Semantic HTML structure
- Proper focus management for interactive cards
- Keyboard navigation support
- ARIA attributes when clickable

## Best Practices

1. Use appropriate padding for content
2. Add hover effects only for interactive cards
3. Ensure sufficient contrast for readability
4. Group related content logically
5. Consider mobile responsive layouts