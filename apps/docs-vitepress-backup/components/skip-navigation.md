# GlassSkipNavigation

Hook for programmatically managing skip navigation

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
import { GlassSkipNavigation } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassSkipNavigation } from "@liquidify/ui/skip-navigation";
```

## Basic Usage

```tsx
import { GlassSkipNavigation } from "@liquidify/ui";

export default function Example() {
  return <GlassSkipNavigation />;
}
```

## Props

| Prop             | Type                         | Default | Description |
| ---------------- | ---------------------------- | ------- | ----------- |
| links?           | `Array<SkipLink>`            | -       | -           |
| autoGenerate?    | `boolean`                    | -       | -           |
| position?        | `"top" \| "left" \| "right"` | -       | -           |
| className?       | `string`                     | -       | -           |
| visibleOnFocus?  | `boolean`                    | -       | -           |
| announceOnFocus? | `boolean`                    | -       | -           |
| customStyles?    | `React.CSSProperties`        | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassSkipNavigation } from "@liquidify/ui";

export default function Example() {
  return <GlassSkipNavigation />;
}
```

### Variants

#### CustomLinks

```tsx
<GlassSkipNavigation />
```

#### AlwaysVisible

```tsx
<GlassSkipNavigation />
```

#### Positions

```tsx
<GlassSkipNavigation />
```

#### WithInstructions

```tsx
<GlassSkipNavigation />
```

#### RealWorldExample

```tsx
<GlassSkipNavigation />
```

#### StylingVariations

```tsx
<GlassSkipNavigation />
```

#### AccessibilityTesting

```tsx
<GlassSkipNavigation />
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
