# 📚 LiqUIdify API Reference

Complete API documentation for all LiqUIdify components, hooks, and utilities.

## 🧩 Core Components

### GlassButton

Interactive button component with glassmorphism effects.

```tsx
import { GlassButton } from 'liquidify/core';

<GlassButton
  variant="primary"
  size="md"
  disabled={false}
  loading={false}
  onClick={handleClick}
  className="custom-class"
>
  Button Text
</GlassButton>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable button interactions |
| `loading` | `boolean` | `false` | Show loading state |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `leftIcon` | `ReactNode` | - | Icon to display on the left |
| `rightIcon` | `ReactNode` | - | Icon to display on the right |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |

#### Examples

```tsx
// Primary button
<GlassButton variant="primary" onClick={handleSave}>
  Save Changes
</GlassButton>

// Button with icon
<GlassButton leftIcon={<SaveIcon />} loading={isSaving}>
  {isSaving ? 'Saving...' : 'Save'}
</GlassButton>

// Full width button
<GlassButton fullWidth variant="secondary">
  Full Width Button
</GlassButton>
```

### GlassCard

Container component with glassmorphism styling.

```tsx
import { GlassCard } from 'liquidify/core';

<GlassCard
  variant="default"
  padding="md"
  hover={true}
  className="custom-class"
>
  Card Content
</GlassCard>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Card style variant |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Internal padding |
| `hover` | `boolean` | `false` | Enable hover effects |
| `clickable` | `boolean` | `false` | Make card clickable |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler (when clickable) |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

### GlassInput

Form input component with glass styling.

```tsx
import { GlassInput } from 'liquidify/core';

<GlassInput
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={handleChange}
  error={errorMessage}
  disabled={false}
  required={true}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `value` | `string` | - | Input value |
| `defaultValue` | `string` | - | Default input value |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input |
| `required` | `boolean` | `false` | Mark as required |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text |
| `label` | `string` | - | Input label |
| `leftIcon` | `ReactNode` | - | Icon on the left |
| `rightIcon` | `ReactNode` | - | Icon on the right |
| `onChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `onFocus` | `(event: FocusEvent<HTMLInputElement>) => void` | - | Focus handler |
| `onBlur` | `(event: FocusEvent<HTMLInputElement>) => void` | - | Blur handler |

## 🎨 Layout Components

### GlassContainer

Responsive container component.

```tsx
import { GlassContainer } from 'liquidify/layout';

<GlassContainer
  maxWidth="lg"
  centered={true}
  padding="md"
>
  Container Content
</GlassContainer>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Maximum width |
| `centered` | `boolean` | `true` | Center the container |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Container padding |
| `className` | `string` | - | Additional CSS classes |

### GlassGrid

Flexible grid system component.

```tsx
import { GlassGrid } from 'liquidify/layout';

<GlassGrid
  cols={{ base: 1, md: 2, lg: 3 }}
  gap={{ base: 4, md: 6 }}
  className="custom-grid"
>
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
</GlassGrid>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `number \| ResponsiveValue<number>` | `1` | Number of columns |
| `gap` | `number \| ResponsiveValue<number>` | `4` | Gap between items |
| `rows` | `number \| ResponsiveValue<number>` | - | Number of rows |
| `className` | `string` | - | Additional CSS classes |

## 🔄 Advanced Components

### GlassModal

Modal dialog component.

```tsx
import { GlassModal } from 'liquidify/advanced';

<GlassModal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md"
  closeOnOverlayClick={true}
  closeOnEscape={true}
>
  <p>Modal content goes here</p>
</GlassModal>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Modal visibility |
| `onClose` | `() => void` | - | Close handler |
| `title` | `string` | - | Modal title |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | `true` | Close on escape key |
| `showCloseButton` | `boolean` | `true` | Show close button |
| `className` | `string` | - | Additional CSS classes |

### GlassDrawer

Slide-out panel component.

```tsx
import { GlassDrawer } from 'liquidify/advanced';

<GlassDrawer
  isOpen={isOpen}
  onClose={handleClose}
  placement="right"
  size="md"
>
  Drawer content
</GlassDrawer>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Drawer visibility |
| `onClose` | `() => void` | - | Close handler |
| `placement` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Drawer position |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Drawer size |
| `overlay` | `boolean` | `true` | Show overlay |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |

## 📝 Form Components

### GlassForm

Form wrapper with validation support.

```tsx
import { GlassForm } from 'liquidify/forms';

<GlassForm
  onSubmit={handleSubmit}
  validation={validationSchema}
  className="form-container"
>
  <GlassInput name="email" label="Email" required />
  <GlassButton type="submit">Submit</GlassButton>
</GlassForm>
```

### GlassSelect

Dropdown select component.

```tsx
import { GlassSelect } from 'liquidify/forms';

<GlassSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  value={selectedValue}
  onChange={handleChange}
  placeholder="Select an option..."
/>
```

## 🔔 Feedback Components

### GlassAlert

Alert message component.

```tsx
import { GlassAlert } from 'liquidify/feedback';

<GlassAlert
  variant="success"
  title="Success!"
  description="Your action was completed successfully."
  closable={true}
  onClose={handleClose}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert type |
| `title` | `string` | - | Alert title |
| `description` | `string` | - | Alert description |
| `closable` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close handler |

### GlassTooltip

Contextual tooltip component.

```tsx
import { GlassTooltip } from 'liquidify/feedback';

<GlassTooltip
  content="This is a tooltip"
  placement="top"
  trigger="hover"
>
  <GlassButton>Hover me</GlassButton>
</GlassTooltip>
```

## 🎭 Animation Components

### GlassLoading

Loading spinner component.

```tsx
import { GlassLoading } from 'liquidify/animations';

<GlassLoading
  size="md"
  variant="spinner"
  color="primary"
  text="Loading..."
/>
```

### GlassFadeIn

Fade-in animation wrapper.

```tsx
import { GlassFadeIn } from 'liquidify/animations';

<GlassFadeIn
  duration={300}
  delay={100}
  direction="up"
>
  <div>Content to animate</div>
</GlassFadeIn>
```

## 🪝 Hooks

### useTheme

Theme management hook.

```tsx
import { useTheme } from 'liquidify';

function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  
  return (
    <GlassButton 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Current: {theme} (System: {systemTheme})
    </GlassButton>
  );
}
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | Current theme |
| `setTheme` | `(theme: Theme) => void` | Set theme |
| `systemTheme` | `'light' \| 'dark'` | System theme preference |

### useToast

Toast notification hook.

```tsx
import { useToast } from 'liquidify';

function MyComponent() {
  const { toast } = useToast();
  
  const showToast = () => {
    toast({
      title: 'Success!',
      description: 'Your action was completed.',
      variant: 'success',
      duration: 3000
    });
  };
  
  return <GlassButton onClick={showToast}>Show Toast</GlassButton>;
}
```

### useSSRSafeLocalStorage

SSR-safe localStorage hook.

```tsx
import { useSSRSafeLocalStorage } from 'liquidify';

function MyComponent() {
  const [value, setValue] = useSSRSafeLocalStorage('key', 'defaultValue');
  
  return (
    <GlassInput 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}
```

### useIsClient

Client-side detection hook.

```tsx
import { useIsClient } from 'liquidify';

function ClientOnlyComponent() {
  const isClient = useIsClient();
  
  if (!isClient) {
    return <GlassLoading />;
  }
  
  return <div>Client-side content</div>;
}
```

## 🛠️ Utilities

### SSR Utilities

Safe utilities for server-side rendering.

```tsx
import { 
  isClient, 
  isServer, 
  safeWindow, 
  safeDocument 
} from 'liquidify';

// Check environment
if (isClient) {
  // Client-side code
}

if (isServer) {
  // Server-side code
}

// Safe window access
const windowWidth = safeWindow?.innerWidth || 0;

// Safe document access
const title = safeDocument?.title || '';
```

## 🎨 Theme Configuration

### CSS Custom Properties

Customize the appearance using CSS variables:

```css
:root {
  /* Glass Effects */
  --glass-opacity: 0.1;
  --glass-blur: 10px;
  --glass-border-opacity: 0.2;
  --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  
  /* Colors */
  --glass-primary: #3b82f6;
  --glass-secondary: #6b7280;
  --glass-success: #10b981;
  --glass-warning: #f59e0b;
  --glass-error: #ef4444;
  
  /* Spacing */
  --glass-spacing-sm: 0.5rem;
  --glass-spacing-md: 1rem;
  --glass-spacing-lg: 1.5rem;
  --glass-spacing-xl: 2rem;
  
  /* Border Radius */
  --glass-radius-sm: 0.375rem;
  --glass-radius-md: 0.5rem;
  --glass-radius-lg: 0.75rem;
  --glass-radius-xl: 1rem;
}
```

### Theme Provider Configuration

```tsx
import { ThemeProvider } from 'liquidify';

const customTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    // ... more colors
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    // ... more spacing
  },
  // ... more theme options
};

<ThemeProvider theme={customTheme} defaultTheme="system">
  <App />
</ThemeProvider>
```

## 📱 Responsive Design

### Responsive Values

Many props accept responsive values:

```tsx
// Responsive grid columns
<GlassGrid cols={{ base: 1, md: 2, lg: 3, xl: 4 }}>
  {/* Grid items */}
</GlassGrid>

// Responsive padding
<GlassCard padding={{ base: 'sm', md: 'md', lg: 'lg' }}>
  {/* Card content */}
</GlassCard>
```

### Breakpoints

Default breakpoints:

```tsx
const breakpoints = {
  base: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

## ♿ Accessibility

### ARIA Support

All components include proper ARIA attributes:

```tsx
// Automatically includes proper ARIA attributes
<GlassButton aria-label="Save document" disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</GlassButton>

// Modal with proper focus management
<GlassModal isOpen={isOpen} onClose={onClose} title="Confirm Action">
  <p>Are you sure you want to continue?</p>
  <GlassButton onClick={onConfirm}>Confirm</GlassButton>
</GlassModal>
```

### Keyboard Navigation

Components support full keyboard navigation:

- **Tab/Shift+Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons and controls
- **Escape**: Close modals, dropdowns, etc.
- **Arrow Keys**: Navigate within components (tabs, menus, etc.)

### Screen Reader Support

All components work with screen readers and include:

- Proper semantic HTML
- ARIA labels and descriptions
- Live regions for dynamic content
- Focus management

## 🧪 Testing

### Testing Utilities

```tsx
import { render, screen } from '@testing-library/react';
import { GlassButton } from 'liquidify';

test('renders button with text', () => {
  render(<GlassButton>Click me</GlassButton>);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});
```

### Custom Render Function

```tsx
import { render } from '@testing-library/react';
import { ThemeProvider } from 'liquidify';

const customRender = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );
  
  return render(ui, { wrapper: Wrapper, ...options });
};

export { customRender as render };
```

## 📦 Bundle Information

### Import Sizes

| Import | Gzipped Size | Components Included |
|--------|--------------|-------------------|
| `liquidify/core` | ~8KB | Button, Card, Input, Select |
| `liquidify/layout` | ~6KB | Container, Grid, Stack |
| `liquidify/forms` | ~12KB | Form, Input, Select, Textarea |
| `liquidify/advanced` | ~18KB | Modal, Drawer, Dropdown |
| `liquidify/feedback` | ~10KB | Alert, Toast, Tooltip |
| `liquidify/animations` | ~8KB | Loading, Transitions |
| Full library | ~28KB | All components |

### Tree Shaking

The library is fully tree-shakeable. Only import what you use to minimize bundle size.

---

For more examples and detailed guides, visit our [documentation site](https://liquidify-docs.vercel.app).
