# GlassInput

A glassmorphic input component with validation, icons, and advanced features.

## Import

```tsx
import { GlassInput } from '@liquidui/core';
// or
import { GlassInput } from '@liquidui/core/input';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type (text, email, password, etc.) |
| `variant` | `'default' \| 'filled' \| 'outlined'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `glassEffect` | `boolean` | `true` | Enable glassmorphic effect |
| `error` | `boolean` | `false` | Show error state |
| `helperText` | `string` | - | Helper or error message |
| `leftIcon` | `ReactNode` | - | Icon on the left side |
| `rightIcon` | `ReactNode` | - | Icon on the right side |
| `loading` | `boolean` | `false` | Show loading state |
| `clearable` | `boolean` | `false` | Show clear button |
| `disabled` | `boolean` | `false` | Disable input |
| `readOnly` | `boolean` | `false` | Make input read-only |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Default value |
| `onChange` | `(event: ChangeEvent) => void` | - | Change handler |
| `onClear` | `() => void` | - | Clear button handler |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Usage

```tsx
<GlassInput
  placeholder="Enter your name"
  onChange={(e) => console.log(e.target.value)}
/>
```

### With Icons

```tsx
<GlassInput
  type="email"
  placeholder="Email"
  leftIcon={<MailIcon />}
/>

<GlassInput
  type="password"
  placeholder="Password"
  leftIcon={<LockIcon />}
  rightIcon={<EyeIcon />}
/>
```

### Variants

```tsx
<GlassInput variant="default" placeholder="Default" />
<GlassInput variant="filled" placeholder="Filled" />
<GlassInput variant="outlined" placeholder="Outlined" />
```

### Sizes

```tsx
<GlassInput size="sm" placeholder="Small" />
<GlassInput size="md" placeholder="Medium" />
<GlassInput size="lg" placeholder="Large" />
```

### Error State

```tsx
<GlassInput
  error
  helperText="This field is required"
  placeholder="Required field"
/>
```

### Loading State

```tsx
<GlassInput
  loading
  placeholder="Loading..."
/>
```

### Clearable Input

```tsx
const [value, setValue] = useState('');

<GlassInput
  clearable
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue('')}
  placeholder="Clearable input"
/>
```

### Controlled vs Uncontrolled

```tsx
// Controlled
const [value, setValue] = useState('');
<GlassInput
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Uncontrolled
<GlassInput defaultValue="Initial value" />
```

### With Form Validation

```tsx
<form onSubmit={handleSubmit}>
  <GlassInput
    type="email"
    name="email"
    required
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    placeholder="Email"
    error={errors.email}
    helperText={errors.email && "Please enter a valid email"}
  />
</form>
```

## Accessibility

- Proper label association with `aria-label` or external `<label>`
- Error states announced to screen readers
- Keyboard navigation support
- Clear button accessible with keyboard
- Loading state announced with `aria-busy`

## Styling

The component accepts a `className` prop for custom styling:

```tsx
<GlassInput
  className="custom-input"
  placeholder="Custom styled"
/>
```

## Performance

- Debounced validation for better performance
- Optimized re-renders with React.memo
- Efficient icon rendering
- Lazy-loaded glass effects