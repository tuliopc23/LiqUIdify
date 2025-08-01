# GlassSearch

GlassSearch component with glassmorphism design.

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
import { GlassSearch } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassSearch } from "@liquidify/ui/search";
```

## Basic Usage

```tsx
import { GlassSearch } from "@liquidify/ui";

export default function Example() {
  return <GlassSearch />;
}
```

## Props

| Prop               | Type                                     | Default | Description |
| ------------------ | ---------------------------------------- | ------- | ----------- |
| placeholder?       | `string`                                 | -       | -           |
| suggestions?       | `Array<SearchSuggestion>`                | -       | -           |
| recentSearches?    | `Array<string>`                          | -       | -           |
| onSearch?          | `(query: string) => void`                | -       | -           |
| onSuggestionClick? | `(suggestion: SearchSuggestion) => void` | -       | -           |
| showTrending?      | `boolean`                                | -       | -           |
| maxSuggestions?    | `number`                                 | -       | -           |
| className?         | `string`                                 | -       | -           |
| id?                | `string`                                 | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassSearch } from "@liquidify/ui";

export default function Example() {
  return <GlassSearch />;
}
```

### Variants

#### Playground

```tsx
<GlassSearch />
```

#### BasicUsage

```tsx
<GlassSearch />
```

#### SuggestionTypes

```tsx
<GlassSearch />
```

#### LoadingAndEmptyStates

```tsx
<GlassSearch />
```

#### RealWorldExamples

```tsx
<GlassSearch />
```

#### AccessibilityShowcase

```tsx
<GlassSearch />
```

#### ThemeShowcase

```tsx
<GlassSearch />
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
