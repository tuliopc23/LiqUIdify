# GlassCommand

GlassCommand component with glassmorphism design.

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
import { GlassCommand } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassCommand } from '@liquidify/ui/command'
```

## Basic Usage

```tsx
import { GlassCommand } from '@liquidify/ui'

export default function Example() {
  return <GlassCommand />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `Array<CommandItem>` | - | - |
| placeholder? | `string` | - | - |
| shortcut? | `Array<string>` | - | - |
| className? | `string` | - | - |


## Examples

### Basic Example

```tsx
import { GlassCommand } from '@liquidify/ui'

export default function Example() {
  return <GlassCommand />
}
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

- Consider using related components from the utility category
- Check the design system guide for consistent usage patterns
