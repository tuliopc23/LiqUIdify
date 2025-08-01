# Components

LiquidUI provides 52+ production-ready React components with glassmorphism design. All components are accessible, performant, and fully typed with TypeScript.

## Component Categories

### Core Components

Essential building blocks for any application.

- [GlassButton](/components/button) - Interactive button with multiple variants
- [GlassCard](/components/card) - Container with glassmorphism effect
- [GlassInput](/components/input) - Text input field
- [GlassModal](/components/modal) - Overlay dialog component
- [GlassTooltip](/components/tooltip) - Contextual information on hover
- [GlassBadge](/components/badge) - Status badges
- [GlassAvatar](/components/avatar) - User avatars

### Form Components

Complete form building blocks with validation support.

- [GlassCheckbox](/components/checkbox) - Checkbox input
- [GlassRadioGroup](/components/radio-group) - Radio button group
- [GlassSelect](/components/select) - Dropdown selection
- [GlassTextarea](/components/textarea) - Multi-line text input
- [GlassSwitch](/components/switch) - Toggle switch
- [GlassSlider](/components/slider) - Range slider input
- [GlassDatePicker](/components/date-picker) - Date selection
- [GlassFileUpload](/components/file-upload) - File upload interface
- [GlassCombobox](/components/combobox) - Searchable dropdown
- [GlassNumberInput](/components/number-input) - Numeric input with controls
- [GlassFormField](/components/form-field) - Form field wrapper
- [GlassCheckboxGroup](/components/checkbox-group) - Multiple checkbox group

### Navigation Components

Components for app navigation and wayfinding.

- [GlassBreadcrumbs](/components/breadcrumbs) - Navigation trail
- [GlassTabs](/components/tabs) - Tabbed interface
- [GlassPagination](/components/pagination) - Page navigation
- [Navbar](/components/navbar) - Top navigation bar
- [Sidebar](/components/sidebar) - Side navigation
- [GlassMobileNav](/components/mobile-nav) - Mobile navigation menu

### Feedback Components

User feedback and notification components.

- [GlassAlert](/components/alert) - Alert messages
- [GlassToast](/components/toast) - Toast notifications
- [GlassNotification](/components/notification) - In-app notifications
- [GlassBanner](/components/banner) - Page-wide announcements
- [GlassProgress](/components/progress) - Progress indicators
- [GlassSpinner](/components/spinner) - Loading spinner
- [GlassLoading](/components/loading) - Loading states
- [GlassSkeleton](/components/skeleton) - Content placeholders

### Data Display

Components for presenting data and content.

- [GlassTable](/components/table) - Data table
- [GlassAccordion](/components/accordion) - Collapsible sections
- [GlassTimeline](/components/timeline) - Timeline display
- [GlassTreeView](/components/tree-view) - Hierarchical data
- [GlassChart](/components/chart) - Data visualization
- [GlassPerformanceDashboard](/components/performance-dashboard) - Performance metrics

### Layout Components

Structural components for page layouts.

- [GlassDrawer](/components/drawer) - Slide-out panel
- [GlassDropdown](/components/dropdown) - Dropdown menu
- [GlassPopover](/components/popover) - Popover container
- [GlassPortal](/components/portal) - Portal rendering

### Utility Components

Helper components for common patterns.

- [GlassCommand](/components/command) - Command palette
- [GlassSearch](/components/search) - Search interface
- [GlassErrorBoundary](/components/error-boundary) - Error handling
- [ThemeProvider](/components/theme-provider) - Theme context
- [ThemeToggle](/components/theme-toggle) - Dark mode toggle
- [GlassPlayground](/components/playground) - Component playground

### Accessibility Components

Components focused on accessibility.

- [GlassFocusTrap](/components/focus-trap) - Focus management
- [GlassLiveRegion](/components/live-region) - Screen reader announcements
- [GlassSkipNavigation](/components/skip-navigation) - Skip links
- [GlassVisuallyHidden](/components/visually-hidden) - Screen reader only content
- [GlassAccessibleDemo](/components/accessible-demo) - Accessibility examples
- [GlassFocusDemo](/components/focus-demo) - Focus management demo

### Responsive Components

Components with enhanced responsive behavior.

- [GlassResponsiveButton](/components/responsive-button) - Adaptive button
- [GlassResponsiveCard](/components/responsive-card) - Adaptive card layout

## Component Features

All LiqUIdify components share these common features:

### Consistent API

```tsx
<GlassComponent
  variant="primary"
  size="medium"
  disabled={false}
  className="custom-class"
  {...props}
/>
```

### Theme Support

```tsx
<GlassButton colorScheme="blue" variant="solid" />
```

### Accessibility

- Full keyboard navigation
- ARIA attributes
- Screen reader support
- Focus management

### Customization

- CSS variables for theming
- className prop for custom styles
- Ref forwarding for direct DOM access
- Extensible with composition

## Getting Started

1. Install LiqUIdify following the [installation guide](/guide/installation)
2. Import the components you need
3. Apply the glassmorphism theme
4. Build amazing interfaces!

```tsx
import { GlassButton, GlassCard } from "@liquidify/components";
import "@liquidify/components/css";

function MyComponent() {
  return (
    <GlassCard variant="elevated">
      <h2>Welcome to LiqUIdify</h2>
      <GlassButton variant="primary">Click me</GlassButton>
    </GlassCard>
  );
}
```
