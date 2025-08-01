# Accessibility Guide

LiqUIdify is built with accessibility as a core principle, ensuring all components meet WCAG 2.1 AA standards and provide excellent experiences for users with disabilities.

## Overview

This guide covers:

- Accessibility standards and compliance
- Built-in accessibility features
- Best practices for implementation
- Testing and validation
- Common patterns and solutions

## Standards Compliance

### WCAG 2.1 AA

All LiqUIdify components are designed to meet WCAG 2.1 AA standards:

- **Perceivable**: Content is presented in ways users can perceive
- **Operable**: Interface components are operable by all users
- **Understandable**: Information and UI operation are understandable
- **Robust**: Content can be interpreted by assistive technologies

### Section 508

Components also comply with Section 508 requirements for federal accessibility.

## Built-in Features

### Keyboard Navigation

All interactive components support full keyboard navigation:

```tsx
// Components automatically handle keyboard events
<GlassButton onClick={handleClick}>
  Accessible Button
</GlassButton>

// Tab navigation works out of the box
<GlassForm>
  <GlassInput label="First Name" />
  <GlassInput label="Last Name" />
  <GlassButton type="submit">Submit</GlassButton>
</GlassForm>
```

**Keyboard Shortcuts:**

- `Tab` / `Shift+Tab`: Navigate between focusable elements
- `Enter` / `Space`: Activate buttons and links
- `Arrow Keys`: Navigate within components (tabs, menus, etc.)
- `Escape`: Close modals, dropdowns, and overlays
- `Home` / `End`: Jump to first/last item in lists

### Screen Reader Support

Components include proper ARIA attributes and semantic markup:

```tsx
// Automatic ARIA labels and roles
<GlassModal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirm Action"
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-description">Are you sure you want to proceed?</p>
</GlassModal>

// Form controls with proper labeling
<GlassInput
  label="Email Address"
  required
  aria-required="true"
  aria-describedby="email-help"
/>
<div id="email-help" className="text-sm text-gray-600">
  We'll never share your email address
</div>
```

### Focus Management

Visual focus indicators and logical focus flow:

```tsx
// Custom focus styles
<GlassButton className="focus:ring-2 focus:ring-blue-500 focus:outline-none">
  Custom Focus
</GlassButton>

// Focus trapping in modals
<GlassModal isOpen={isOpen} trapFocus>
  <GlassInput autoFocus />
  <GlassButton>Save</GlassButton>
  <GlassButton>Cancel</GlassButton>
</GlassModal>
```

### Color and Contrast

All components meet minimum contrast requirements:

- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text**: 3:1 contrast ratio minimum
- **Interactive elements**: Clear visual states for hover, focus, and active

```tsx
// High contrast theme option
<ThemeProvider theme="high-contrast">
  <App />
</ThemeProvider>

// Color-blind friendly alternatives
<GlassAlert severity="error" icon={<ErrorIcon />}>
  Error: Please check your input
</GlassAlert>
```

## Implementation Best Practices

### Semantic HTML

Use semantic HTML elements and ARIA roles appropriately:

```tsx
// Good: Semantic structure
<main>
  <section>
    <h1>Dashboard</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  </section>
</main>

// Avoid: Generic elements without semantic meaning
<div>
  <div>Dashboard</div>
  <div>
    <div><a href="/home">Home</a></div>
    <div><a href="/settings">Settings</a></div>
  </div>
</div>
```

### Labels and Descriptions

Provide clear, descriptive labels for all interactive elements:

```tsx
// Explicit labels
<GlassInput
  id="user-email"
  label="Email Address"
  placeholder="Enter your email"
  required
  aria-required="true"
/>

// Hidden labels when visual label isn't needed
<GlassButton aria-label="Close dialog">
  <XIcon className="h-4 w-4" />
</GlassButton>

// Grouped form sections
<fieldset>
  <legend>Contact Information</legend>
  <GlassInput label="Phone Number" />
  <GlassInput label="Address" />
</fieldset>
```

### Live Regions

Use ARIA live regions for dynamic content updates:

```tsx
// Status updates
<GlassToast
  role="status"
  aria-live="polite"
  message="Settings saved successfully"
/>

// Critical alerts
<GlassAlert
  severity="error"
  role="alert"
  aria-live="assertive"
>
  Form submission failed
</GlassAlert>

// Loading states
<div aria-live="polite" aria-busy={loading}>
  {loading ? 'Loading...' : 'Content loaded'}
</div>
```

### Error Handling

Provide clear, actionable error messages:

```tsx
// Form validation with clear error messages
<GlassForm onSubmit={handleSubmit}>
  <GlassInput
    label="Password"
    type="password"
    error={errors.password}
    aria-invalid={!!errors.password}
    aria-describedby={errors.password ? "password-error" : undefined}
  />
  {errors.password && (
    <div id="password-error" role="alert" className="text-red-600">
      Password must be at least 8 characters long
    </div>
  )}
</GlassForm>

// Global error boundary
<GlassErrorBoundary
  fallback={({ error, retry }) => (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <GlassButton onClick={retry}>Try Again</GlassButton>
    </div>
  )}
>
  <App />
</GlassErrorBoundary>
```

## Component-Specific Guidelines

### Forms

```tsx
// Accessible form structure
<GlassForm>
  <fieldset>
    <legend>Personal Information</legend>

    <GlassInput label="First Name" required aria-required="true" />

    <GlassRadioGroup
      legend="Preferred Contact Method"
      name="contact-method"
      options={[
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
        { value: "mail", label: "Mail" },
      ]}
    />

    <GlassCheckbox
      label="I agree to the terms and conditions"
      required
      aria-required="true"
      aria-describedby="terms-help"
    />
    <div id="terms-help" className="text-sm">
      Please read our terms before proceeding
    </div>
  </fieldset>

  <GlassButton type="submit">Submit Form</GlassButton>
</GlassForm>
```

### Navigation

```tsx
// Accessible navigation structure
<nav aria-label="Main navigation">
  <ul>
    <li>
      <a
        href="/dashboard"
        aria-current={currentPage === 'dashboard' ? 'page' : undefined}
      >
        Dashboard
      </a>
    </li>
    <li>
      <a href="/settings">Settings</a>
    </li>
  </ul>
</nav>

// Breadcrumb navigation
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/home">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Laptops</li>
  </ol>
</nav>

// Skip links
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0"
>
  Skip to main content
</a>
```

### Data Tables

```tsx
// Accessible data tables
<GlassTable>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Sales</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Laptops</th>
      <td>45</td>
      <td>$22,500</td>
    </tr>
    <tr>
      <th scope="row">Tablets</th>
      <td>32</td>
      <td>$9,600</td>
    </tr>
  </tbody>
</GlassTable>

// Complex tables with headers
<GlassTable>
  <thead>
    <tr>
      <th rowSpan={2} scope="col">Product</th>
      <th colSpan={2} scope="colgroup">Q1</th>
      <th colSpan={2} scope="colgroup">Q2</th>
    </tr>
    <tr>
      <th scope="col">Units</th>
      <th scope="col">Revenue</th>
      <th scope="col">Units</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  {/* table body */}
</GlassTable>
```

### Modals and Overlays

```tsx
// Accessible modal implementation
<GlassModal
  isOpen={isOpen}
  onClose={onClose}
  initialFocus={cancelButtonRef}
  trapFocus
>
  <GlassModal.Header>
    <h2 id="modal-title">Confirm Delete</h2>
    <GlassButton variant="ghost" onClick={onClose} aria-label="Close dialog">
      <XIcon className="h-4 w-4" />
    </GlassButton>
  </GlassModal.Header>

  <GlassModal.Body>
    <p id="modal-description">
      This action cannot be undone. Are you sure you want to delete this item?
    </p>
  </GlassModal.Body>

  <GlassModal.Footer>
    <GlassButton ref={cancelButtonRef} variant="outline" onClick={onClose}>
      Cancel
    </GlassButton>
    <GlassButton variant="danger" onClick={handleDelete}>
      Delete
    </GlassButton>
  </GlassModal.Footer>
</GlassModal>
```

## Testing Accessibility

### Automated Testing

Use automated tools to catch common accessibility issues:

```tsx
// Jest + Testing Library
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test("should not have accessibility violations", async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Screen reader testing
test("should be accessible to screen readers", () => {
  render(<GlassButton>Click me</GlassButton>);

  const button = screen.getByRole("button", { name: "Click me" });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAccessibleName("Click me");
});
```

### Manual Testing

#### Keyboard Testing

1. **Tab Navigation**: Can you reach all interactive elements?
2. **Enter/Space**: Do buttons and links activate correctly?
3. **Arrow Keys**: Do custom components handle arrow navigation?
4. **Escape**: Do overlays close appropriately?

#### Screen Reader Testing

Test with popular screen readers:

- **Windows**: NVDA (free), JAWS
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca

#### Visual Testing

1. **Color Contrast**: Use tools like WebAIM's Contrast Checker
2. **Focus Indicators**: Are they visible and clear?
3. **Text Scaling**: Test at 200% zoom
4. **Color Independence**: Does information work without color?

### Testing Tools

```bash
# Install accessibility testing tools
npm install --save-dev @axe-core/react @testing-library/jest-dom
npm install --save-dev eslint-plugin-jsx-a11y
```

```tsx
// React axe in development
import { axe } from "@axe-core/react";

if (process.env.NODE_ENV !== "production") {
  axe(React, ReactDOM, 1000, {
    rules: {
      "color-contrast": { enabled: true },
      "keyboard-tab-order": { enabled: true },
    },
  });
}
```

## Common Patterns

### Loading States

```tsx
// Accessible loading indicators
<div role="status" aria-live="polite">
  {loading ? (
    <div>
      <GlassSpinner aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <div>Content loaded</div>
  )}
</div>

// Progress indicators
<div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
  <GlassProgressBar value={progress} />
  <span className="sr-only">{progress}% complete</span>
</div>
```

### Dynamic Content

```tsx
// Announcing dynamic changes
const [message, setMessage] = useState("");

const announceMessage = (text) => {
  setMessage(text);
  // Clear after announcement
  setTimeout(() => setMessage(""), 1000);
};

return (
  <div>
    <div role="status" aria-live="polite" className="sr-only">
      {message}
    </div>

    <GlassButton onClick={() => announceMessage("Item added to cart")}>
      Add to Cart
    </GlassButton>
  </div>
);
```

### Complex Interactions

```tsx
// Accessible drag and drop
<GlassDragDrop
  onDrop={handleDrop}
  aria-label="Drop files here"
  keyboard={{
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        // Trigger file picker
        fileInputRef.current?.click();
      }
    },
  }}
>
  <input
    ref={fileInputRef}
    type="file"
    className="sr-only"
    onChange={handleFileSelect}
  />
  <p>Drag files here or press Enter to select</p>
</GlassDragDrop>
```

## Resources

### Documentation

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools

- [axe-core](https://github.com/dequelabs/axe-core) - Automated accessibility testing
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation
- [Pa11y](https://pa11y.org/) - Command line accessibility tester
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Accessibility audits

### Screen Readers

- [NVDA](https://www.nvaccess.org/) - Free Windows screen reader
- [VoiceOver](https://support.apple.com/guide/voiceover/) - macOS screen reader
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Popular Windows screen reader

## Support

If you encounter accessibility issues or have questions:

1. Check our [accessibility test results](/reports/accessibility-audit.html)
2. Review component documentation for accessibility notes
3. Open an issue on GitHub with accessibility labels
4. Contact our team for accessibility consultation

Remember: Accessibility is not a feature to be added later—it's a fundamental part of good user experience design.
