# GlassPopover

GlassPopover component with glassmorphism design.

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
import { GlassPopover } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassPopover } from "@liquidify/ui/popover";
```

## Basic Usage

```tsx
import { GlassPopover } from "@liquidify/ui";

export default function Example() {
  return <GlassPopover />;
}
```

## Props

| Prop                 | Type                                     | Default | Description |
| -------------------- | ---------------------------------------- | ------- | ----------- |
| trigger              | `React.ReactNode`                        | -       | -           |
| content              | `React.ReactNode`                        | -       | -           |
| position?            | `"top" \| "bottom" \| "left" \| "right"` | -       | -           |
| align?               | `"start" \| "center" \| "end"`           | -       | -           |
| className?           | `string`                                 | -       | -           |
| contentClassName?    | `string`                                 | -       | -           |
| open?                | `boolean`                                | -       | -           |
| onOpenChange?        | `(open: boolean) => void`                | -       | -           |
| closeOnClickOutside? | `boolean`                                | -       | -           |
| closeOnEscape?       | `boolean`                                | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassPopover } from "@liquidify/ui";

export default function Example() {
  return <GlassPopover />;
}
```

### Variants

#### Positions

```tsx
<GlassPopover />
```

#### Alignments

```tsx
<GlassPopover />
```

#### RichContent

```tsx
<GlassPopover />
```

#### Controlled

```tsx
<GlassPopover />
```

#### InteractiveForm

```tsx
<GlassPopover />
```

#### MultiplePopovers

```tsx
<GlassPopover />
```

#### ViewportAwareness

```tsx
<GlassPopover />
```

#### CustomStyling

```tsx
<GlassPopover />
```

#### NestedPopovers

```tsx
<GlassPopover />
```

#### LoadingContent

```tsx
<GlassPopover />
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
