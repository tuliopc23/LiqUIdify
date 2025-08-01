# GlassLiveRegion

GlassLiveRegion component with glassmorphism design.

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
import { GlassLiveRegion } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassLiveRegion } from "@liquidify/ui/live-region";
```

## Basic Usage

```tsx
import { GlassLiveRegion } from "@liquidify/ui";

export default function Example() {
  return <GlassLiveRegion />;
}
```

## Props

| Prop              | Type                                  | Default | Description |
| ----------------- | ------------------------------------- | ------- | ----------- |
| message?          | `string`                              | -       | -           |
| priority?         | `AriaLivePriority`                    | -       | -           |
| atomic?           | `boolean`                             | -       | -           |
| relevant?         | `AriaRelevant \| Array<AriaRelevant>` | -       | -           |
| className?        | `string`                              | -       | -           |
| clearDelay?       | `number`                              | -       | -           |
| visuallyHidden?   | `boolean`                             | -       | -           |
| role?             | `"status" \| "alert" \| "log"`        | -       | -           |
| queueingEnabled?  | `boolean`                             | -       | -           |
| maxQueueSize?     | `number`                              | -       | -           |
| contextualPrefix? | `boolean`                             | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassLiveRegion } from "@liquidify/ui";

export default function Example() {
  return <GlassLiveRegion />;
}
```

### Variants

#### FormValidation

```tsx
<GlassLiveRegion />
```

#### ProgressUpdates

```tsx
<GlassLiveRegion />
```

#### NotificationCenter

```tsx
<GlassLiveRegion />
```

#### MultipleRegions

```tsx
<GlassLiveRegion />
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
