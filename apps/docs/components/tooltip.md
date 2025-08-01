# GlassTooltip

GlassTooltip component with glassmorphism design.

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
import { GlassTooltip } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassTooltip } from '@liquidify/ui/tooltip'
```

## Basic Usage

```tsx
import { GlassTooltip } from '@liquidify/ui'

export default function Example() {
  return <GlassTooltip />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | `React.ReactNode` | - | - |
| children | `React.ReactNode` | - | - |
| position? | `"top" \| "bottom" \| "left" \| "right"` | - | - |
| delay? | `number` | - | - |
| className? | `string` | - | - |
| disabled? | `boolean` | - | - |


## Examples

### Basic Example

```tsx
import { GlassTooltip } from '@liquidify/ui'

export default function Example() {
  return <GlassTooltip />
}
```

### Variants

#### Positions

```tsx
<GlassTooltip  />
```

#### Delays

```tsx
<GlassTooltip  />
```

#### WithIcons

```tsx
<GlassTooltip  />
```

#### RichContent

```tsx
<GlassTooltip  />
```

#### DisabledState

```tsx
<GlassTooltip  />
```

#### ActionButtons

```tsx
<GlassTooltip  />
```

#### FormFieldTooltips

```tsx
<GlassTooltip  />
```

#### ViewportAwareness

```tsx
<GlassTooltip  />
```

#### LongContent

```tsx
<GlassTooltip  />
```

#### ThemeVariations

```tsx
<GlassTooltip  />
```

#### CustomStyling

```tsx
<GlassTooltip  />
```

#### InteractiveElements

```tsx
<GlassTooltip  />
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
