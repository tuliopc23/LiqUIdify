# GlassSkeleton

GlassSkeleton component with glassmorphism design.

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
import { GlassSkeleton } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassSkeleton } from "@liquidify/ui/skeleton";
```

## Basic Usage

```tsx
import { GlassSkeleton } from "@liquidify/ui";

export default function Example() {
  return <GlassSkeleton />;
}
```

## Props

| Prop       | Type                                | Default | Description |
| ---------- | ----------------------------------- | ------- | ----------- |
| width?     | `string \| number`                  | -       | -           |
| height?    | `string \| number`                  | -       | -           |
| count?     | `number`                            | -       | -           |
| spacing?   | `number`                            | -       | -           |
| animated?  | `boolean`                           | -       | -           |
| className? | `string`                            | -       | -           |
| id?        | `string`                            | -       | -           |
| style?     | `React.CSSProperties`               | -       | -           |
| variant?   | `"default" \| "shimmer" \| "pulse"` | -       | -           |
| size?      | `"sm" \| "md" \| "lg" \| "xl"`      | -       | -           |
| shape?     | `"rectangle" \| "circle" \| "line"` | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassSkeleton } from "@liquidify/ui";

export default function Example() {
  return <GlassSkeleton />;
}
```

### Variants

#### Playground

```tsx
<GlassSkeleton />
```

#### Variants

```tsx
<GlassSkeleton />
```

#### Shapes

```tsx
<GlassSkeleton />
```

#### PreBuiltPatterns

```tsx
<GlassSkeleton />
```

#### ContentTypeExamples

```tsx
<GlassSkeleton />
```

#### RealWorldExamples

```tsx
<GlassSkeleton />
```

#### LoadingStatesComparison

```tsx
<GlassSkeleton />
```

#### ThemeShowcase

```tsx
<GlassSkeleton />
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
