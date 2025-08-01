# GlassDropdown

GlassDropdown component with glassmorphism design.

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
import { GlassDropdown } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassDropdown } from '@liquidify/ui/dropdown'
```

## Basic Usage

```tsx
import { GlassDropdown } from '@liquidify/ui'

export default function Example() {
  return <GlassDropdown />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | `React.ReactNode` | - | - |
| items | `Array<DropdownItem>` | - | - |
| onSelect? | `(value: string) => void` | - | - |
| className? | `string` | - | - |
| contentClassName? | `string` | - | - |
| align? | `"start" \| "center" \| "end"` | - | - |
| sideOffset? | `number` | - | - |


## Examples

### Basic Example

```tsx
import { GlassDropdown } from '@liquidify/ui'

export default function Example() {
  return <GlassDropdown />
}
```

### Variants

#### Playground

```tsx
<GlassDropdown  />
```

#### BasicExamples

```tsx
<GlassDropdown  />
```

#### AlignmentOptions

```tsx
<GlassDropdown  />
```

#### ItemStates

```tsx
<GlassDropdown  />
```

#### RealWorldExamples

```tsx
<GlassDropdown  />
```

#### NavigationDropdown

```tsx
<GlassDropdown  />
```

#### ThemeShowcase

```tsx
<GlassDropdown  />
```

#### AccessibilityShowcase

```tsx
<GlassDropdown  />
```

#### CustomStyling

```tsx
<GlassDropdown  />
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
