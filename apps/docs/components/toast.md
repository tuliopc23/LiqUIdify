# GlassToast

GlassToast component with glassmorphism design.

## Installation

```bash
npm install @liquidify/ui
```

Or install just this component:

```bash
npm install @liquidify/ui
```

```tsx
// Import the full library
import { GlassToast } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassToast } from '@liquidify/ui/toast'
```

## Basic Usage

```tsx
import { GlassToast } from '@liquidify/ui'

export default function Example() {
  return <GlassToast />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `React.ReactNode` | - | - |
| position? | `\| "top-right"
    \| "top-left"
    \| "bottom-right"
    \| "bottom-left"
    \| "top-center"
    \| "bottom-center"` | - | - |
| toast | `Toast` | - | - |
| onRemove | `(id: string) => void` | - | - |
| type? | `"success" \| "error" \| "warning" \| "info"` | - | - |
| message | `string` | - | - |
| onClose? | `() => void` | - | - |


## Examples

### Basic Example

```tsx
import { GlassToast } from '@liquidify/ui'

export default function Example() {
  return <GlassToast />
}
```

### Variants

#### Types

```tsx
<GlassToast  />
```

#### WithToastProvider

```tsx
<GlassToast  />
```

#### Positions

```tsx
<GlassToast  />
```

#### WithActions

```tsx
<GlassToast  />
```

#### CustomDuration

```tsx
<GlassToast  />
```

#### MultipleToasts

```tsx
<GlassToast  />
```

#### RealWorldExamples

```tsx
<GlassToast  />
```

#### FormValidation

```tsx
<GlassToast  />
```

#### ThemeVariations

```tsx
<GlassToast  />
```



## Accessibility

- Follows WAI-ARIA guidelines
- Keyboard navigation support
- Screen reader compatible
- Focus management
- Color contrast compliant

## Best Practices

- Use semantic HTML elements
- Provide appropriate labels and descriptions
- Consider color contrast ratios
- Test with keyboard navigation
- Verify screen reader compatibility

## Related Components

- Consider using related components from the feedback category
- Check the design system guide for consistent usage patterns
