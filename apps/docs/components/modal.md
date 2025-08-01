# GlassModal

GlassModal component with glassmorphism design.

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
import { GlassModal } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassModal } from '@liquidify/ui/modal'
```

## Basic Usage

```tsx
import { GlassModal } from '@liquidify/ui'

export default function Example() {
  return <GlassModal />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | `boolean` | - | - |
| onClose | `() => void` | - | - |
| title? | `string` | - | - |
| children | `React.ReactNode` | - | - |
| className? | `string` | - | - |
| titleClassName? | `string` | - | - |
| contentClassName? | `string` | - | - |
| closeOnBackdropClick? | `boolean` | - | - |
| closeOnEscape? | `boolean` | - | - |
| initialFocus? | `React.RefObject<HTMLElement>` | - | - |
| portalTarget? | `HTMLElement` | - | - |


## Examples

### Basic Example

```tsx
import { GlassModal } from '@liquidify/ui'

export default function Example() {
  return <GlassModal />
}
```

### Variants

#### Playground

```tsx
<GlassModal  />
```

#### BasicExamples

```tsx
<GlassModal  />
```

#### DialogTypes

```tsx
<GlassModal  />
```

#### _FormModal

```tsx
<GlassModal  />
```

#### RealWorldExamples

```tsx
<GlassModal  />
```

#### NestedModals

```tsx
<GlassModal  />
```

#### _ThemeShowcase

```tsx
<GlassModal  />
```

#### AccessibilityShowcase

```tsx
<GlassModal  />
```

#### CustomStyling

```tsx
<GlassModal  />
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

- Consider using related components from the core category
- Check the design system guide for consistent usage patterns
