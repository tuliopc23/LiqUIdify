# GlassSlider

GlassSlider component with glassmorphism design.

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
import { GlassSlider } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassSlider } from '@liquidify/ui/slider'
```

## Basic Usage

```tsx
import { GlassSlider } from '@liquidify/ui'

export default function Example() {
  return <GlassSlider />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| min? | `number` | - | - |
| max? | `number` | - | - |
| step? | `number` | - | - |
| value? | `number` | - | - |
| onChange? | `(value: number) => void` | - | - |
| disabled? | `boolean` | - | - |
| className? | `string` | - | - |
| showValue? | `boolean` | - | - |
| variant? | `"default" \| "minimal"` | - | - |


## Examples

### Basic Example

```tsx
import { GlassSlider } from '@liquidify/ui'

export default function Example() {
  return <GlassSlider />
}
```

### Variants

#### Controlled

```tsx
<GlassSlider  />
```

#### CustomRange

```tsx
<GlassSlider  />
```

#### StepIntervals

```tsx
<GlassSlider  />
```

#### Disabled

```tsx
<GlassSlider  />
```

#### MinimalVariant

```tsx
<GlassSlider  />
```

#### VolumeControl

```tsx
<GlassSlider  />
```

#### InteractiveDemo

```tsx
<GlassSlider  />
```

#### FormIntegration

```tsx
<GlassSlider  />
```

#### AccessibilityDemo

```tsx
<GlassSlider  />
```

#### RealTimePreview

```tsx
<GlassSlider  />
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

- Consider using related components from the forms category
- Check the design system guide for consistent usage patterns
