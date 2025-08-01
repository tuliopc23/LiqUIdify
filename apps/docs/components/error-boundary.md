# GlassErrorBoundary

GlassErrorBoundary component with glassmorphism design.

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
import { GlassErrorBoundary } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassErrorBoundary } from "@liquidify/ui/error-boundary";
```

## Basic Usage

```tsx
import { GlassErrorBoundary } from "@liquidify/ui";

export default function Example() {
  return <GlassErrorBoundary />;
}
```

## Props

| Prop                | Type                                                | Default | Description |
| ------------------- | --------------------------------------------------- | ------- | ----------- |
| children            | `ReactNode`                                         | -       | -           |
| fallback?           | `(error: Error, errorInfo: ErrorInfo) => ReactNode` | -       | -           |
| onError?            | `(error: Error, errorInfo: ErrorInfo) => void`      | -       | -           |
| resetKeys?          | `string \| Array<number>`                           | -       | -           |
| resetOnPropsChange? | `boolean`                                           | -       | -           |
| isolate?            | `boolean`                                           | -       | -           |
| level?              | `"page" \| "section" \| "component"`                | -       | -           |
| className?          | `string`                                            | -       | -           |
| componentName?      | `string`                                            | -       | -           |
| trackErrors?        | `boolean`                                           | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassErrorBoundary } from "@liquidify/ui";

export default function Example() {
  return <GlassErrorBoundary />;
}
```

### Variants

#### \_CustomFallback

```tsx
<GlassErrorBoundary />
```

#### DifferentLevels

```tsx
<GlassErrorBoundary />
```

#### AsyncErrors

```tsx
<GlassErrorBoundary />
```

#### ErrorRecovery

```tsx
<GlassErrorBoundary />
```

#### MultipleErrorBoundaries

```tsx
<GlassErrorBoundary />
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
