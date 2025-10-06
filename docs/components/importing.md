# Importing Components

Learn how to import and use LiqUIdify components for optimal bundle size.

## Import Methods

LiqUIdify supports two import methods:

### 1. Subpath Imports (Recommended)

**Best for:** Tree-shaking and minimal bundle size

```tsx
// Basic components
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';

// Ark UI components (use ark-ui/ prefix)
import { Dialog } from 'liquidify-react/ark-ui/dialog';
import { Tooltip } from 'liquidify-react/ark-ui/tooltip';
import { Select } from 'liquidify-react/ark-ui/select';
```

**Benefits:**
- ✅ **Smallest bundle size** - Only includes what you import
- ✅ **Faster builds** - Less code to process
- ✅ **Better tree-shaking** - Dead code elimination works perfectly

### 2. Main Entry Import

**Best for:** Quick prototyping

```tsx
import { Button, Card, Badge } from 'liquidify-react';
```

**Trade-offs:**
- ⚠️ **Larger initial bundle** - Imports entire library index
- ✅ **Simpler imports** - Single import statement
- ⚠️ **Less optimal tree-shaking** - Bundler-dependent

## Component Categories

### Basic Components

```tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';
import { IconButton } from 'liquidify-react/iconButton';
import { SymbolTile } from 'liquidify-react/symbolTile';
```

### Form Components (Ark UI)

```tsx
import { Checkbox } from 'liquidify-react/ark-ui/checkbox';
import { RadioGroup } from 'liquidify-react/ark-ui/radioGroup';
import { Select } from 'liquidify-react/ark-ui/select';
import { Switch } from 'liquidify-react/ark-ui/switch';
import { Slider } from 'liquidify-react/ark-ui/slider';
import { PinInput } from 'liquidify-react/ark-ui/pinInput';
import { NumberInput } from 'liquidify-react/ark-ui/numberInput';
import { PasswordInput } from 'liquidify-react/ark-ui/passwordInput';
```

### Navigation Components (Ark UI)

```tsx
import { Tabs } from 'liquidify-react/ark-ui/tabs';
import { Menu } from 'liquidify-react/ark-ui/menu';
import { Pagination } from 'liquidify-react/ark-ui/pagination';
import { Steps } from 'liquidify-react/ark-ui/steps';
import { SegmentGroup } from 'liquidify-react/ark-ui/segmentGroup';
```

### Feedback Components (Ark UI)

```tsx
import { Toast } from 'liquidify-react/ark-ui/toast';
import { Dialog } from 'liquidify-react/ark-ui/dialog';
import { Tooltip } from 'liquidify-react/ark-ui/tooltip';
import { Progress } from 'liquidify-react/ark-ui/progress';
import { ProgressLinear } from 'liquidify-react/ark-ui/progressLinear';
import { ProgressCircular } from 'liquidify-react/ark-ui/progressCircular';
import { HoverCard } from 'liquidify-react/ark-ui/hoverCard';
import { Popover } from 'liquidify-react/ark-ui/popover';
```

### Advanced Components (Ark UI)

```tsx
import { ColorPicker } from 'liquidify-react/ark-ui/colorPicker';
import { DatePicker } from 'liquidify-react/ark-ui/datePicker';
import { FileUpload } from 'liquidify-react/ark-ui/fileUpload';
import { Accordion } from 'liquidify-react/ark-ui/accordion';
import { Carousel } from 'liquidify-react/ark-ui/carousel';
import { Collapsible } from 'liquidify-react/ark-ui/collapsible';
import { Combobox } from 'liquidify-react/ark-ui/combobox';
import { Editable } from 'liquidify-react/ark-ui/editable';
import { RatingGroup } from 'liquidify-react/ark-ui/ratingGroup';
import { SignaturePad } from 'liquidify-react/ark-ui/signaturePad';
import { Splitter } from 'liquidify-react/ark-ui/splitter';
import { TagsInput } from 'liquidify-react/ark-ui/tagsInput';
import { ToggleGroup } from 'liquidify-react/ark-ui/toggleGroup';
import { TreeView } from 'liquidify-react/ark-ui/treeView';
import { Tour } from 'liquidify-react/ark-ui/tour';
```

## TypeScript Support

All imports are fully typed with TypeScript:

```tsx
import { Button, type ButtonProps } from 'liquidify-react/button';
import { Card, type CardProps } from 'liquidify-react/card';

// Props are automatically inferred
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Import Styles

**Important:** Always import the CSS once at your app's entry point:

```tsx
// App entry (e.g., app/layout.tsx, src/main.tsx, pages/_app.tsx)
import 'liquidify-react/styles';
```

This imports:
- Panda CSS reset
- Design tokens (colors, spacing, typography, etc.)
- Component recipes
- Global utilities

## Bundle Size Comparison

Here's how different import methods affect bundle size:

| Method | Bundle Size (gzipped) | Components Included |
|--------|----------------------|---------------------|
| Subpath import (1 component) | ~30 KB | Button only |
| Subpath import (5 components) | ~42 KB | 5 components |
| Main entry import | ~45 KB | All 48 components |
| Main entry + CSS | ~90 KB | All 48 components + styles |

**Note:** CSS is always ~45 KB gzipped regardless of import method.

## Best Practices

### ✅ Do

```tsx
// Use subpath imports for production
import { Button } from 'liquidify-react/button';
import { Dialog } from 'liquidify-react/ark-ui/dialog';

// Import styles once at app entry
import 'liquidify-react/styles';

// Use TypeScript for type safety
import type { ButtonProps } from 'liquidify-react/button';
```

### ❌ Don't

```tsx
// Don't import from internal paths
import { Button } from 'liquidify-react/dist/components/button';

// Don't import styles multiple times
import 'liquidify-react/styles'; // ❌ in every component

// Don't use default exports (they don't exist)
import Button from 'liquidify-react/button'; // ❌
```

## Code Splitting

For large apps, use dynamic imports with React.lazy:

```tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const DatePicker = lazy(() => import('liquidify-react/ark-ui/datePicker').then(m => ({ default: m.DatePicker })));
const ColorPicker = lazy(() => import('liquidify-react/ark-ui/colorPicker').then(m => ({ default: m.ColorPicker })));

export default function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DatePicker />
      <ColorPicker />
    </Suspense>
  );
}
```

## Framework-Specific Notes

### Next.js

Works with both App Router and Pages Router:

```tsx
// App Router (app/layout.tsx)
import 'liquidify-react/styles';

// Pages Router (pages/_app.tsx)
import 'liquidify-react/styles';
```

### Vite

Add to your main entry:

```tsx
// src/main.tsx
import 'liquidify-react/styles';
```

### Remix

Import in root:

```tsx
// app/root.tsx
import 'liquidify-react/styles';
```

### Astro

Use in your layout:

```astro
---
// src/layouts/Layout.astro
import 'liquidify-react/styles';
---
```

## Troubleshooting

### "Cannot find module 'liquidify-react/button'"

Make sure you've installed liquidify-react:
```bash
bun add liquidify-react
```

### Styles not applied

Ensure you've imported the CSS at your app entry:
```tsx
import 'liquidify-react/styles';
```

### Large bundle size

Use subpath imports instead of main entry:
```tsx
// ✅ Good
import { Button } from 'liquidify-react/button';

// ❌ Larger bundle
import { Button } from 'liquidify-react';
```

---

**Next:** [Component Overview](./overview.md) | [Basic Components](./basic-components.md)
