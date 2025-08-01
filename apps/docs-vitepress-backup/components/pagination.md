# GlassPagination

GlassPagination component with glassmorphism design.

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
import { GlassPagination } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassPagination } from "@liquidify/ui/pagination";
```

## Basic Usage

```tsx
import { GlassPagination } from "@liquidify/ui";

export default function Example() {
  return <GlassPagination />;
}
```

## Props

| Prop           | Type                              | Default | Description |
| -------------- | --------------------------------- | ------- | ----------- |
| currentPage    | `number`                          | -       | -           |
| totalPages     | `number`                          | -       | -           |
| onPageChange   | `(page: number) => void`          | -       | -           |
| showFirstLast? | `boolean`                         | -       | -           |
| showPrevNext?  | `boolean`                         | -       | -           |
| showEllipsis?  | `boolean`                         | -       | -           |
| siblingCount?  | `number`                          | -       | -           |
| boundaryCount? | `number`                          | -       | -           |
| disabled?      | `boolean`                         | -       | -           |
| className?     | `string`                          | -       | -           |
| id?            | `string`                          | -       | -           |
| role?          | `string`                          | -       | -           |
| variant?       | `"default" \| "solid" \| "ghost"` | -       | -           |
| size?          | `"sm" \| "md" \| "lg"`            | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassPagination } from "@liquidify/ui";

export default function Example() {
  return <GlassPagination />;
}
```

### Variants

#### Playground

```tsx
<GlassPagination />
```

#### Variants

```tsx
<GlassPagination />
```

#### Sizes

```tsx
<GlassPagination />
```

#### States

```tsx
<GlassPagination />
```

#### ConfigurationExamples

```tsx
<GlassPagination />
```

#### RealWorldExamples

```tsx
<GlassPagination />
```

#### AccessibilityShowcase

```tsx
<GlassPagination />
```

#### ThemeShowcase

```tsx
<GlassPagination />
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

- Consider using related components from the navigation category
- Check the design system guide for consistent usage patterns
