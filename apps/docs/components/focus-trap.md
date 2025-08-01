# GlassFocusTrap

GlassFocusTrap component with glassmorphism design.

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
import { GlassFocusTrap } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassFocusTrap } from '@liquidify/ui/focus-trap'
```

## Basic Usage

```tsx
import { GlassFocusTrap } from '@liquidify/ui'

export default function Example() {
  return <GlassFocusTrap />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `React.ReactNode` | - | - |
| active? | `boolean` | - | - |
| paused? | `boolean` | - | - |
| onEscape? | `() => void` | - | - |
| onDeactivate? | `() => void` | - | - |
| initialFocus? | `React.RefObject<HTMLElement> \| string` | - | - |
| returnFocus? | `boolean` | - | - |
| className? | `string` | - | - |
| preventScroll? | `boolean` | - | - |
| fallbackFocus? | `React.RefObject<HTMLElement>` | - | - |
| delayInitialFocus? | `boolean` | - | - |
| allowOutsideClick? | `boolean` | - | - |
| autoFocus? | `boolean` | - | - |
| restoreFocus? | `boolean` | - | - |
| focusOptions? | `FocusOptions` | - | - |
| trapStack? | `boolean` | - | - |


## Examples

### Basic Example

```tsx
import { GlassFocusTrap } from '@liquidify/ui'

export default function Example() {
  return <GlassFocusTrap />
}
```

### Variants

#### ModalExample

```tsx
<GlassFocusTrap  />
```

#### InitialFocusExample

```tsx
<GlassFocusTrap  />
```

#### NestedFocusTraps

```tsx
<GlassFocusTrap  />
```

#### AccessibilityDemo

```tsx
<GlassFocusTrap  />
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

- Consider using related components from the accessibility category
- Check the design system guide for consistent usage patterns
