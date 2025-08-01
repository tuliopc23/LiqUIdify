# GlassPlayground

S-tier Interactive Component Playground

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
import { GlassPlayground } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassPlayground } from "@liquidify/ui/playground";
```

## Basic Usage

```tsx
import { GlassPlayground } from "@liquidify/ui";

export default function Example() {
  return <GlassPlayground />;
}
```

## Props

| Prop         | Type                      | Default | Description |
| ------------ | ------------------------- | ------- | ----------- |
| code         | `string`                  | -       | -           |
| scope?       | `Record<string, unknown>` | -       | -           |
| title?       | `string`                  | -       | -           |
| description? | `string`                  | -       | -           |
| showEditor?  | `boolean`                 | -       | -           |
| showPreview? | `boolean`                 | -       | -           |
| editable?    | `boolean`                 | -       | -           |
| className?   | `string`                  | -       | -           |
| height?      | `string \| number`        | -       | -           |
| theme?       | `'light' \| 'dark'`       | -       | -           |
| autoRun?     | `boolean`                 | -       | -           |
| editable?    | `boolean`                 | -       | -           |
| onChange?    | `(code: string) => void`  | -       | -           |
| className?   | `string`                  | -       | -           |
| code         | `string`                  | -       | -           |
| scope?       | `Record<string, unknown>` | -       | -           |
| title?       | `string`                  | -       | -           |
| description? | `string`                  | -       | -           |
| showEditor?  | `boolean`                 | -       | -           |
| showPreview? | `boolean`                 | -       | -           |
| editable?    | `boolean`                 | -       | -           |
| className?   | `string`                  | -       | -           |
| height?      | `string \| number`        | -       | -           |
| theme?       | `'light' \| 'dark'`       | -       | -           |
| autoRun?     | `boolean`                 | -       | -           |
| editable?    | `boolean`                 | -       | -           |
| onChange?    | `(code: string) => void`  | -       | -           |
| className?   | `string`                  | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassPlayground } from "@liquidify/ui";

export default function Example() {
  return <GlassPlayground />;
}
```

### Variants

#### Playground

```tsx
<GlassPlayground />
```

#### Templates

```tsx
<GlassPlayground />
```

#### LayoutVariations

```tsx
<GlassPlayground />
```

#### InteractiveDemo

```tsx
<GlassPlayground />
```

#### RealWorldExamples

```tsx
<GlassPlayground />
```

#### AdvancedFeatures

```tsx
<GlassPlayground />
```

#### ThemeShowcase

```tsx
<GlassPlayground />
```

#### AccessibilityShowcase

```tsx
<GlassPlayground />
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
