# Button

The GlassButton component is a versatile, accessible button with glassmorphism effects and multiple variants.

<script setup>
import { GlassButton } from 'liquidify'
</script>

## Basic Usage

<div class="component-demo">
  <GlassButton>Click me</GlassButton>
</div>

```tsx
import { GlassButton } from 'liquidify'

function App() {
  return <GlassButton>Click me</GlassButton>
}
```

## Variants

The button component supports multiple visual variants:

<div class="component-demo">
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <GlassButton variant="primary">Primary</GlassButton>
    <GlassButton variant="secondary">Secondary</GlassButton>
    <GlassButton variant="ghost">Ghost</GlassButton>
    <GlassButton variant="outline">Outline</GlassButton>
    <GlassButton variant="danger">Danger</GlassButton>
  </div>
</div>

```tsx
<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="danger">Danger</GlassButton>
```

## Sizes

Control the button size with the `size` prop:

<div class="component-demo">
  <div style="display: flex; gap: 1rem; align-items: center;">
    <GlassButton size="sm">Small</GlassButton>
    <GlassButton size="md">Medium</GlassButton>
    <GlassButton size="lg">Large</GlassButton>
  </div>
</div>

```tsx
<GlassButton size="sm">Small</GlassButton>
<GlassButton size="md">Medium</GlassButton>
<GlassButton size="lg">Large</GlassButton>
```

## States

### Loading State

<div class="component-demo">
  <GlassButton isLoading>Saving...</GlassButton>
</div>

```tsx
<GlassButton isLoading>Saving...</GlassButton>
```

### Disabled State

<div class="component-demo">
  <GlassButton disabled>Disabled</GlassButton>
</div>

```tsx
<GlassButton disabled>Disabled</GlassButton>
```

## With Icons

Combine with Lucide React or any icon library:

<div class="component-demo">
  <div style="display: flex; gap: 1rem;">
    <GlassButton>
      <span>Download</span>
    </GlassButton>
    <GlassButton variant="ghost">
      <span>Settings</span>
    </GlassButton>
  </div>
</div>

```tsx
import { Download, Settings } from 'lucide-react'

<GlassButton>
  <Download className="w-4 h-4 mr-2" />
  Download
</GlassButton>

<GlassButton variant="ghost">
  <Settings className="w-4 h-4 mr-2" />
  Settings
</GlassButton>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `isLoading` | `boolean` | `false` | Show loading state |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |

### CSS Variables

Customize the button appearance with CSS variables:

```css
:root {
  --glass-button-blur: 20px;
  --glass-button-bg: rgba(255, 255, 255, 0.1);
  --glass-button-border: rgba(255, 255, 255, 0.2);
  --glass-button-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## Accessibility

The GlassButton component is fully accessible:

- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Disabled state handling

## Examples

### Button Group

<div class="component-demo">
  <div style="display: flex; gap: -1px;">
    <GlassButton variant="outline" style="border-radius: 0.5rem 0 0 0.5rem;">Previous</GlassButton>
    <GlassButton variant="outline" style="border-radius: 0; border-left: 0;">1</GlassButton>
    <GlassButton variant="outline" style="border-radius: 0; border-left: 0;">2</GlassButton>
    <GlassButton variant="outline" style="border-radius: 0; border-left: 0;">3</GlassButton>
    <GlassButton variant="outline" style="border-radius: 0 0.5rem 0.5rem 0; border-left: 0;">Next</GlassButton>
  </div>
</div>

### Form Actions

<div class="component-demo">
  <form style="display: flex; gap: 1rem;">
    <GlassButton variant="ghost">Cancel</GlassButton>
    <GlassButton type="submit">Save Changes</GlassButton>
  </form>
</div>