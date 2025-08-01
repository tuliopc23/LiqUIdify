# GlassPortal

GlassPortal component with glassmorphism design.

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
import { GlassPortal } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassPortal } from '@liquidify/ui/portal'
```

## Basic Usage

```tsx
import { GlassPortal } from '@liquidify/ui'

export default function Example() {
  return <GlassPortal />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `React.ReactNode` | - | - |
| container? | `Element \| DocumentFragment` | - | - |
| key? | `string` | - | - |


## Examples

### Basic Example

```tsx
import { GlassPortal } from '@liquidify/ui'

export default function Example() {
  return <GlassPortal />
}
```

### Variants

#### ModalExample

```tsx
<GlassPortal  />
```

#### TooltipExample

```tsx
<GlassPortal  />
```

#### DropdownExample

```tsx
<GlassPortal  />
```

#### NestedPortals

```tsx
<GlassPortal  />
```

#### CustomContainer

```tsx
<GlassPortal  />
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

- Consider using related components from the layout category
- Check the design system guide for consistent usage patterns
