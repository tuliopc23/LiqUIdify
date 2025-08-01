# GlassFileUpload

GlassFileUpload component with glassmorphism design.

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
import { GlassFileUpload } from "@liquidify/ui";

// Or import individual component (better for tree-shaking)
import { GlassFileUpload } from "@liquidify/ui/file-upload";
```

## Basic Usage

```tsx
import { GlassFileUpload } from "@liquidify/ui";

export default function Example() {
  return <GlassFileUpload />;
}
```

## Props

| Prop           | Type                                     | Default | Description |
| -------------- | ---------------------------------------- | ------- | ----------- |
| onFilesChange? | `(files: Array<FileUploadItem>) => void` | -       | -           |
| onUpload?      | `(files: Array<File>) => Promise<void>`  | -       | -           |
| accept?        | `string`                                 | -       | -           |
| multiple?      | `boolean`                                | -       | -           |
| maxFiles?      | `number`                                 | -       | -           |
| maxFileSize?   | `number`                                 | -       | -           |
| disabled?      | `boolean`                                | -       | -           |
| showPreview?   | `boolean`                                | -       | -           |
| showProgress?  | `boolean`                                | -       | -           |
| allowedTypes?  | `Array<string>`                          | -       | -           |
| dropzoneText?  | `string`                                 | -       | -           |
| browseText?    | `string`                                 | -       | -           |
| className?     | `string`                                 | -       | -           |
| id?            | `string`                                 | -       | -           |
| onDragEnter?   | `React.DragEventHandler<HTMLDivElement>` | -       | -           |
| onDragLeave?   | `React.DragEventHandler<HTMLDivElement>` | -       | -           |
| onDragOver?    | `React.DragEventHandler<HTMLDivElement>` | -       | -           |
| onDrop?        | `React.DragEventHandler<HTMLDivElement>` | -       | -           |
| size?          | `"sm" \| "md" \| "lg"`                   | -       | -           |

## Examples

### Basic Example

```tsx
import { GlassFileUpload } from "@liquidify/ui";

export default function Example() {
  return <GlassFileUpload />;
}
```

### Variants

#### Playground

```tsx
<GlassFileUpload />
```

#### BasicUsage

```tsx
<GlassFileUpload />
```

#### Sizes

```tsx
<GlassFileUpload />
```

#### FileTypeExamples

```tsx
<GlassFileUpload />
```

#### UploadStates

```tsx
<GlassFileUpload />
```

#### RealWorldExamples

```tsx
<GlassFileUpload />
```

#### AccessibilityShowcase

```tsx
<GlassFileUpload />
```

#### ThemeShowcase

```tsx
<GlassFileUpload />
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
