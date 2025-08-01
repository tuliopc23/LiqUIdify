# GlassSelect

GlassSelect component with glassmorphism design.

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
import { GlassSelect } from '@liquidify/ui'

// Or import individual component (better for tree-shaking)
import { GlassSelect } from '@liquidify/ui/select'
```

## Basic Usage

```tsx
import { GlassSelect } from '@liquidify/ui'

export default function Example() {
  return <GlassSelect />
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | `Array<GlassSelectOption>` | - | - |
| value? | `string \| Array<string>` | - | - |
| onChange? | `(value: string \| Array<string>) => void` | - | - |
| placeholder? | `string` | - | - |
| disabled? | `boolean` | - | - |
| className? | `string` | - | - |
| variant? | `"default" \| "search" \| "multi"` | - | - |
| multiple? | `boolean` | - | - |
| searchable? | `boolean` | - | - |
| maxSelections? | `number` | - | - |
| id? | `string` | - | - |


## Examples

### Basic Example

```tsx
import { GlassSelect } from '@liquidify/ui'

export default function Example() {
  return <GlassSelect />
}
```

### Variants

#### Controlled

```tsx
<GlassSelect  />
```

#### WithDisabledOptions

```tsx
<GlassSelect  />
```

#### Disabled

```tsx
<GlassSelect  />
```

#### LongOptionsList

```tsx
<GlassSelect  />
```

#### CustomWidth

```tsx
<GlassSelect  />
```

#### InteractiveDemo

```tsx
<GlassSelect  />
```

#### FormIntegration

```tsx
<GlassSelect  />
```

#### AccessibilityDemo

```tsx
<GlassSelect  />
```

#### ThemeShowcase

```tsx
<GlassSelect  />
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
