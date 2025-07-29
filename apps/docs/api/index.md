# 📚 LiqUIdify API Reference

> Complete API documentation for all components, hooks, utilities, and types in LiqUIdify.

## 📖 Table of Contents

- [Core Components](#core-components)
- [Form Components](#form-components)
- [Layout Components](#layout-components)
- [Navigation Components](#navigation-components)
- [Feedback Components](#feedback-components)
- [Advanced Components](#advanced-components)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Types](#types)
- [Bundles](#bundles)

## 🎯 Core Components

### GlassButton

Interactive button component with glassmorphism effects and advanced animations.

#### Props

```typescript
interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "destructive"
    | "apple";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glassEffect?: {
    intensity?: "light" | "medium" | "strong";
    blur?: boolean;
    backdrop?: boolean;
  };
  magneticHover?: boolean;
  rippleEffect?: boolean;
}
```

#### Usage

```tsx
import { GlassButton } from 'liquidify';

// Basic usage
<GlassButton variant="primary">Click me</GlassButton>

// With icons and loading
<GlassButton
  variant="secondary"
  loading={isLoading}
  loadingText="Processing..."
  leftIcon={<Save />}
>
  Save Changes
</GlassButton>

// Custom glass effects
<GlassButton
  variant="ghost"
  glassEffect={{
    intensity: 'strong',
    blur: true,
    backdrop: true
  }}
  magneticHover
  rippleEffect
>
  Advanced Button
</GlassButton>
```

#### Accessibility

- Full keyboard navigation support
- ARIA attributes for screen readers
- Focus management and indicators
- Loading state announcements

---

### GlassCard

Container component with glassmorphism effects using compound component pattern.

#### Props

```typescript
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "ghost";
  hover?: boolean;
  bordered?: boolean;
  interactive?: boolean;
  selectable?: boolean;
  selected?: boolean;
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  orientation?: "vertical" | "horizontal";
  onCardClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onCardSelect?: (selected: boolean) => void;
}
```

#### Usage

```tsx
import { GlassCard } from 'liquidify';

// Basic card
<GlassCard className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</GlassCard>

// Interactive card with selection
<GlassCard
  interactive
  selectable
  selected={isSelected}
  onCardSelect={setIsSelected}
  hover
  elevation="md"
>
  <h3>Selectable Card</h3>
</GlassCard>

// Compound components (if available)
<GlassCard>
  <GlassCard.Header>
    <GlassCard.Title>Card Title</GlassCard.Title>
    <GlassCard.Description>Card description</GlassCard.Description>
  </GlassCard.Header>
  <GlassCard.Content>
    Main content
  </GlassCard.Content>
  <GlassCard.Footer>
    <GlassButton>Action</GlassButton>
  </GlassCard.Footer>
</GlassCard>
```

---

### GlassInput

Form input component with glassmorphism styling and validation states.

#### Props

```typescript
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search" | "password" | "email";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  error?: boolean;
  helperText?: string;
  glassEffect?: GlassEffectConfig;
}
```

#### Usage

```tsx
import { GlassInput } from 'liquidify';
import { Search, Mail } from 'lucide-react';

// Basic input
<GlassInput placeholder="Enter text..." />

// With icons and validation
<GlassInput
  type="email"
  placeholder="Enter email"
  leftIcon={<Mail className="h-4 w-4" />}
  error={hasError}
  helperText="Please enter a valid email"
  clearable
/>

// Search variant
<GlassInput
  variant="search"
  placeholder="Search..."
  leftIcon={<Search className="h-4 w-4" />}
/>
```

---

## 📝 Form Components

### GlassFormField

Wrapper component for form fields with labels, validation, and accessibility.

#### Props

```typescript
interface GlassFormFieldProps {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  warning?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: "default" | "card" | "inline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  htmlFor?: string;
}
```

#### Usage

```tsx
import { GlassFormField, GlassInput } from "liquidify";

<GlassFormField
  label="Email Address"
  required
  error={errors.email}
  helperText="We'll never share your email"
>
  <GlassInput type="email" placeholder="john@example.com" />
</GlassFormField>;
```

---

### GlassCheckbox

Styled checkbox component with glassmorphism effects.

#### Props

```typescript
interface GlassCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
  error?: boolean;
}
```

#### Usage

```tsx
import { GlassCheckbox } from "liquidify";

<GlassCheckbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to the terms"
  description="Please read our terms and conditions"
/>;
```

---

### GlassSelect

Dropdown select component with glassmorphism styling.

#### Props

```typescript
interface GlassSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiple?: boolean;
  searchable?: boolean;
}
```

#### Usage

```tsx
import { GlassSelect } from "liquidify";

<GlassSelect
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
  ]}
  placeholder="Select country"
  searchable
/>;
```

---

### GlassTextarea

Multi-line text input with glassmorphism effects.

#### Props

```typescript
interface GlassTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  autoGrow?: boolean;
  maxHeight?: number;
}
```

#### Usage

```tsx
import { GlassTextarea } from "liquidify";

<GlassTextarea
  placeholder="Enter your message..."
  rows={4}
  autoGrow
  maxHeight={200}
/>;
```

---

## 🎯 Layout Components

### GlassModal

Modal dialog component with glassmorphism backdrop and animations.

#### Props

```typescript
interface GlassModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;
  focusTrap?: boolean;
}
```

#### Usage

```tsx
import { GlassModal, GlassButton } from "liquidify";

<GlassModal
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Action"
  description="Are you sure you want to continue?"
  size="md"
>
  <div className="flex gap-4 mt-6">
    <GlassButton variant="ghost" onClick={() => setIsModalOpen(false)}>
      Cancel
    </GlassButton>
    <GlassButton variant="primary" onClick={handleConfirm}>
      Confirm
    </GlassButton>
  </div>
</GlassModal>;
```

---

### GlassAccordion

Collapsible content component with smooth animations.

#### Props

```typescript
interface GlassAccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  multiple?: boolean;
  defaultExpanded?: string[];
  onExpandedChange?: (expanded: string[]) => void;
  variant?: "default" | "card" | "minimal";
}
```

#### Usage

```tsx
import { GlassAccordion } from "liquidify";

<GlassAccordion
  items={[
    {
      id: "item1",
      title: "What is LiqUIdify?",
      content: "LiqUIdify is a React component library...",
    },
    {
      id: "item2",
      title: "How do I install it?",
      content: "You can install it using npm install liquidify",
    },
  ]}
  multiple
  variant="card"
/>;
```

---

## 🧭 Navigation Components

### GlassTabs

Tabbed interface component with smooth transitions.

#### Props

```typescript
interface GlassTabsProps {
  tabs: Array<{
    id: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "pills" | "underline";
}
```

#### Usage

```tsx
import { GlassTabs } from "liquidify";

<GlassTabs
  tabs={[
    {
      id: "overview",
      label: "Overview",
      content: <div>Overview content</div>,
    },
    {
      id: "details",
      label: "Details",
      content: <div>Details content</div>,
    },
  ]}
  variant="pills"
  onTabChange={setActiveTab}
/>;
```

---

### GlassBreadcrumbs

Navigation breadcrumb component.

#### Props

```typescript
interface GlassBreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    current?: boolean;
  }>;
  separator?: React.ReactNode;
  maxItems?: number;
}
```

#### Usage

```tsx
import { GlassBreadcrumbs } from "liquidify";

<GlassBreadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptops", current: true },
  ]}
  maxItems={4}
/>;
```

---

## 💬 Feedback Components

### GlassToast

Toast notification component with animations and positioning.

#### Props

```typescript
interface GlassToastProps {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}
```

#### Usage

```tsx
import { GlassToast, useToast } from "liquidify";

// Using the hook
const { toast } = useToast();

const showToast = () => {
  toast({
    title: "Success!",
    description: "Your changes have been saved.",
    variant: "success",
    duration: 5000,
    action: {
      label: "Undo",
      onClick: () => console.log("Undo clicked"),
    },
  });
};
```

---

### GlassProgress

Progress indicator component with multiple variants.

#### Props

```typescript
interface GlassProgressProps {
  value: number;
  max?: number;
  variant?: "linear" | "circular" | "steps";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}
```

#### Usage

```tsx
import { GlassProgress } from 'liquidify';

// Linear progress
<GlassProgress
  value={75}
  variant="linear"
  showLabel
  animated
/>

// Circular progress
<GlassProgress
  value={60}
  variant="circular"
  size="lg"
  color="success"
/>
```

---

### GlassLoading

Loading indicator component with multiple animation variants.

#### Props

```typescript
interface GlassLoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "bars";
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  className?: string;
}
```

#### Usage

```tsx
import { GlassLoading } from 'liquidify';

// Basic spinner
<GlassLoading variant="spinner" size="md" />

// With loading text
<GlassLoading
  variant="dots"
  size="lg"
  text="Loading data..."
/>
```

---

## 🚀 Advanced Components

### GlassChart

Data visualization component with glassmorphism styling.

#### Props

```typescript
interface GlassChartProps {
  data: ChartDataPoint[];
  type: "line" | "bar" | "donut" | "area";
  width?: number;
  height?: number;
  colors?: string[];
  animated?: boolean;
  responsive?: boolean;
  legend?: boolean;
  grid?: boolean;
}

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}
```

#### Usage

```tsx
import { LineChart, BarChart, DonutChart } from 'liquidify';

const data = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 78 },
  { label: 'Mar', value: 82 }
];

// Line chart
<LineChart
  data={data}
  height={300}
  animated
  responsive
/>

// Bar chart
<BarChart
  data={data}
  colors={['#667eea', '#764ba2']}
  grid
  legend
/>
```

---

### GlassTable

Data table component with sorting, filtering, and pagination.

#### Props

```typescript
interface GlassTableProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    header: string;
    sortable?: boolean;
    width?: string;
    render?: (value: any, row: T) => React.ReactNode;
  }>;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  loading?: boolean;
  empty?: React.ReactNode;
}
```

#### Usage

```tsx
import { GlassTable } from "liquidify";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
];

<GlassTable
  data={users}
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email" },
    {
      key: "status",
      header: "Status",
      render: (status) => (
        <GlassBadge variant={status === "active" ? "success" : "secondary"}>
          {status}
        </GlassBadge>
      ),
    },
  ]}
  sortable
  pagination
  pageSize={10}
/>;
```

---

### GlassPlayground

Interactive code playground component for documentation.

#### Props

```typescript
interface GlassPlaygroundProps {
  code: string;
  scope?: Record<string, any>;
  title?: string;
  description?: string;
  showEditor?: boolean;
  showPreview?: boolean;
  editable?: boolean;
  height?: string | number;
  theme?: "light" | "dark";
  autoRun?: boolean;
}
```

#### Usage

```tsx
import { GlassPlayground, PlaygroundTemplates } from "liquidify";

<GlassPlayground
  code={PlaygroundTemplates.button}
  title="Button Examples"
  description="Try different button variants"
  height={400}
  editable
/>;
```

---

## 🎣 Hooks

### useToast

Hook for managing toast notifications.

```typescript
interface UseToastReturn {
  toast: (options: ToastOptions) => void;
  dismiss: (id?: string) => void;
  toasts: Toast[];
}

const useToast: () => UseToastReturn;
```

#### Usage

```tsx
import { useToast } from "liquidify";

function MyComponent() {
  const { toast, dismiss } = useToast();

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Operation completed",
      variant: "success",
    });
  };

  return <GlassButton onClick={showSuccess}>Show Toast</GlassButton>;
}
```

---

### useTheme

Hook for managing theme state and switching.

```typescript
interface UseThemeReturn {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  resolvedTheme: "light" | "dark";
  systemTheme: "light" | "dark";
}

const useTheme: () => UseThemeReturn;
```

#### Usage

```tsx
import { useTheme } from "liquidify";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <GlassButton
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      Toggle to {resolvedTheme === "dark" ? "Light" : "Dark"}
    </GlassButton>
  );
}
```

---

### useSSRSafe

Collection of SSR-safe hooks for client-side only operations.

```typescript
// SSR-safe window access
const useSSRSafeWindow: (
  selector?: (window: Window) => any,
  fallback?: any,
) => any;

// SSR-safe document access
const useSSRSafeDocument: (
  selector?: (document: Document) => any,
  fallback?: any,
) => any;

// SSR-safe localStorage
const useSSRSafeLocalStorage: (
  key: string,
  defaultValue?: any,
) => [any, (value: any) => void];

// Client-side detection
const useIsClient: () => boolean;

// Media query hook
const useSSRSafeMediaQuery: (query: string) => boolean;
```

#### Usage

```tsx
import { useSSRSafeWindow, useIsClient, useSSRSafeMediaQuery } from "liquidify";

function MyComponent() {
  const isClient = useIsClient();
  const isMobile = useSSRSafeMediaQuery("(max-width: 768px)");
  const windowWidth = useSSRSafeWindow((w) => w.innerWidth, 0);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Device: {isMobile ? "Mobile" : "Desktop"}
      Width: {windowWidth}px
    </div>
  );
}
```

---

### usePerformanceMonitoring

Hook for monitoring component performance and rendering metrics.

```typescript
interface PerformanceMetrics {
  renderTime: number;
  componentMounts: number;
  reRenders: number;
  memoryUsage?: number;
}

const usePerformanceMonitoring: (componentName: string) => PerformanceMetrics;
```

#### Usage

```tsx
import { usePerformanceMonitoring } from "liquidify";

function MyComponent() {
  const metrics = usePerformanceMonitoring("MyComponent");

  console.log("Performance:", metrics);

  return <div>Component content</div>;
}
```

---

## 🛠️ Utilities

### cn (Class Name Utility)

Utility function for conditionally combining class names with Tailwind merge.

```typescript
const cn: (...classes: (string | undefined | null | boolean)[]) => string;
```

#### Usage

```tsx
import { cn } from "liquidify";

function MyComponent({ className, variant, disabled }) {
  return (
    <div
      className={cn(
        "base-classes",
        variant === "primary" && "primary-classes",
        disabled && "disabled-classes",
        className,
      )}
    >
      Content
    </div>
  );
}
```

---

### Glass Variants

Utility for creating consistent variant systems across components.

```typescript
const glassVariants: (config: VariantConfig) => VariantFunction;

interface VariantConfig {
  base: string | string[];
  variants: Record<string, Record<string, string | string[]>>;
  defaultVariants?: Record<string, string>;
}
```

#### Usage

```tsx
import { glassVariants } from "liquidify";

const buttonVariants = glassVariants({
  base: [
    "inline-flex items-center justify-center",
    "backdrop-blur-md bg-white/10",
    "border border-white/20",
    "transition-all duration-200",
  ],
  variants: {
    variant: {
      primary: "bg-blue-500/20 border-blue-400/30 text-blue-100",
      secondary: "bg-gray-500/20 border-gray-400/30 text-gray-100",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// Usage
const className = buttonVariants({ variant: "secondary", size: "lg" });
```

---

## 📦 Bundles

LiqUIdify provides pre-configured bundles for different use cases:

### Core Bundle

Essential components for basic applications (~15KB).

```tsx
import { CoreComponents } from "liquidify/core";
// or
import { GlassButton, GlassCard, GlassInput } from "liquidify/core";
```

**Includes:**

- GlassButton
- GlassCard
- GlassInput
- GlassErrorBoundary
- GlassFocusTrap
- GlassVisuallyHidden
- Core utilities and providers

---

### Forms Bundle

Complete form components and utilities (~8KB).

```tsx
import { FormComponents } from "liquidify/forms";
// or
import { GlassCheckbox, GlassSelect, GlassTextarea } from "liquidify/forms";
```

**Includes:**

- GlassFormField
- GlassCheckbox
- GlassCheckboxGroup
- GlassRadioGroup
- GlassSelect
- GlassTextarea
- GlassSlider
- GlassSwitch
- GlassNumberInput
- GlassDatePicker
- GlassFileUpload
- Form validation utilities

---

### Navigation Bundle

Navigation and layout components (~6KB).

```tsx
import { NavigationComponents } from "liquidify/navigation";
```

**Includes:**

- GlassTabs
- GlassBreadcrumbs
- GlassMobileNav
- GlassSkipNavigation
- Navigation utilities

---

### Feedback Bundle

User feedback and notification components (~5KB).

```tsx
import { FeedbackComponents } from "liquidify/feedback";
```

**Includes:**

- GlassToast
- GlassProgress
- GlassLoading
- GlassSpinner
- GlassNotification
- Toast utilities and providers

---

### Advanced Bundle

Complex components for data-heavy applications (~12KB).

```tsx
import { AdvancedComponents } from "liquidify/advanced";
```

**Includes:**

- GlassChart (Line, Bar, Donut)
- GlassTable
- GlassPlayground
- AppleLiquidGlass
- Performance monitoring components

---

### Accessibility Bundle

Accessibility-focused components and utilities (~4KB).

```tsx
import { AccessibilityComponents } from "liquidify/accessibility";
```

**Includes:**

- GlassAccessibleDemo
- GlassFocusDemo
- GlassFocusTrap
- GlassLiveRegion
- GlassVisuallyHidden
- GlassSkipNavigation
- Accessibility utilities and hooks

---

## 🎨 Types

### Theme Types

```typescript
interface GlassTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    glass: {
      background: string;
      border: string;
      blur: string;
    };
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  animations: {
    duration: string;
    easing: string;
  };
}

interface ThemeConfig {
  light: GlassTheme;
  dark: GlassTheme;
}
```

---

### Component Base Types

```typescript
// Base props that most components extend
interface GlassComponentProps {
  className?: string;
  children?: React.ReactNode;
  glassEffect?: GlassEffectConfig;
}

interface GlassEffectConfig {
  intensity?: "light" | "medium" | "strong";
  blur?: boolean;
  backdrop?: boolean;
  opacity?: number;
}

// Animation types
interface AnimationConfig {
  duration?: number;
  easing?: string;
  delay?: number;
  repeat?: boolean;
}

// Variant system types
type VariantProps<T> = T extends (...args: any[]) => any
  ? Parameters<T>[0]
  : never;
```

---

### Event Handler Types

```typescript
// Common event handlers
type ClickHandler = (event: React.MouseEvent) => void;
type ChangeHandler<T> = (value: T) => void;
type FocusHandler = (event: React.FocusEvent) => void;

// Form-specific handlers
type FormSubmitHandler = (event: React.FormEvent) => void;
type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type TextareaChangeHandler = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
) => void;
```

---

## 🔧 Configuration

### Provider Setup

```tsx
import { GlassUIProvider, ThemeProvider } from "liquidify";
import "liquidify/styles";

function App() {
  return (
    <GlassUIProvider>
      <ThemeProvider defaultTheme="system" storageKey="liquidify-theme">
        {/* Your app */}
      </ThemeProvider>
    </GlassUIProvider>
  );
}
```

### Custom Theme Creation

```tsx
import { createTheme } from "liquidify";

const customTheme = createTheme({
  colors: {
    primary: "#667eea",
    secondary: "#764ba2",
    glass: {
      background: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      blur: "10px",
    },
  },
  animations: {
    duration: "0.3s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
});
```

---

## 📋 Version Compatibility

| LiqUIdify | React | TypeScript | Node.js |
| --------- | ----- | ---------- | ------- |
| 1.x       | 18-19 | 5.0+       | 18+     |

---

## 🔗 External Dependencies

LiqUIdify has minimal peer dependencies:

- **React** (18+): Core framework
- **React DOM** (18+): DOM rendering
- **@sentry/react** (optional): Error monitoring

Internal dependencies are bundled and optimized for performance.

---

## 📝 Notes

- All components are **SSR-compatible** and work with Next.js, Remix, and other frameworks
- **TypeScript-first** with complete type definitions
- **Accessibility-ready** with WCAG 2.1 AA compliance
- **Performance-optimized** with tree shaking and code splitting
- **Theme-aware** with automatic dark/light mode support

For more detailed examples and interactive documentation, visit our [Storybook](https://liquidify-storybook.vercel.app).
