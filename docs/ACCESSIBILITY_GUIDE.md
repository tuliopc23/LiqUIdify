# LiqUIdify Accessibility Guide

This guide provides comprehensive information about accessibility features in LiqUIdify components and best practices for creating accessible applications.

## Table of Contents

1. [Core Principles](#core-principles)
2. [WCAG 2.1 AA Compliance](#wcag-21-aa-compliance)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Screen Reader Support](#screen-reader-support)
5. [Focus Management](#focus-management)
6. [Color and Contrast](#color-and-contrast)
7. [Component-Specific Guidelines](#component-specific-guidelines)
8. [Testing Tools](#testing-tools)
9. [Common Patterns](#common-patterns)

## Core Principles

LiqUIdify follows these accessibility principles:

1. **Perceivable**: Information and UI components must be presentable in ways users can perceive
2. **Operable**: UI components and navigation must be operable via keyboard
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough for assistive technologies

## WCAG 2.1 AA Compliance

All LiqUIdify components meet WCAG 2.1 Level AA standards:

### Success Criteria Met

- ✅ 1.1.1 Non-text Content
- ✅ 1.3.1 Info and Relationships
- ✅ 1.4.3 Contrast (Minimum)
- ✅ 1.4.11 Non-text Contrast
- ✅ 2.1.1 Keyboard
- ✅ 2.1.2 No Keyboard Trap
- ✅ 2.4.3 Focus Order
- ✅ 2.4.7 Focus Visible
- ✅ 3.2.1 On Focus
- ✅ 4.1.2 Name, Role, Value

## Keyboard Navigation

### Standard Key Bindings

All interactive components support keyboard navigation:

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift + Tab` | Move focus backward |
| `Enter` | Activate buttons, links, submit forms |
| `Space` | Toggle checkboxes, activate buttons |
| `Arrow Keys` | Navigate within components |
| `Escape` | Close modals, cancel operations |
| `Home/End` | Jump to first/last item |

### Component Navigation Patterns

#### Tabs
```javascript
<GlassTabs>
  {/* Arrow keys navigate between tabs */}
  {/* Home/End jump to first/last tab */}
  {/* Tab key moves to tab panel */}
</GlassTabs>
```

#### Modal/Dialog
```javascript
<GlassModal>
  {/* Focus trapped within modal */}
  {/* Escape closes modal */}
  {/* Focus returns to trigger on close */}
</GlassModal>
```

#### Combobox
```javascript
<GlassCombobox>
  {/* Arrow keys navigate options */}
  {/* Enter selects current option */}
  {/* Escape closes dropdown */}
  {/* Type to filter options */}
</GlassCombobox>
```

## Screen Reader Support

### ARIA Implementation

All components include proper ARIA attributes:

```javascript
// Button with description
<GlassButton
  aria-label="Save document"
  aria-describedby="save-help-text"
>
  Save
</GlassButton>
<span id="save-help-text" className="sr-only">
  Saves the current document to your drafts
</span>

// Loading state
<GlassLoading
  role="status"
  aria-live="polite"
  aria-label="Loading content"
/>

// Form field with error
<GlassFormField
  label="Email"
  error="Invalid email format"
>
  <GlassInput
    type="email"
    aria-invalid={true}
    aria-describedby="email-error"
  />
</GlassFormField>
```

### Live Regions

Use live regions for dynamic content updates:

```javascript
// Status messages
<GlassLiveRegion priority="polite">
  {statusMessage}
</GlassLiveRegion>

// Critical alerts
<GlassLiveRegion priority="assertive">
  {errorMessage}
</GlassLiveRegion>

// Progress updates
<div role="status" aria-live="polite" aria-atomic="true">
  Step {currentStep} of {totalSteps}
</div>
```

## Focus Management

### Focus Trap

Use focus trap for overlays and modals:

```javascript
import { GlassFocusTrap } from '@liquidify/components';

<GlassFocusTrap active={isModalOpen}>
  <GlassModal>
    {/* Focus stays within modal */}
  </GlassModal>
</GlassFocusTrap>
```

### Focus Restoration

Components automatically restore focus:

```javascript
function Example() {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlassButton ref={triggerRef} onClick={() => setOpen(true)}>
        Open Modal
      </GlassButton>
      
      <GlassModal
        isOpen={open}
        onClose={() => setOpen(false)}
        returnFocusRef={triggerRef}
      >
        {/* Focus returns to button on close */}
      </GlassModal>
    </>
  );
}
```

### Skip Links

Implement skip navigation:

```javascript
import { GlassSkipLink } from '@liquidify/components';

<>
  <GlassSkipLink href="#main-content">
    Skip to main content
  </GlassSkipLink>
  
  <nav>{/* Navigation */}</nav>
  
  <main id="main-content">
    {/* Main content */}
  </main>
</>
```

## Color and Contrast

### Contrast Requirements

All text meets WCAG contrast ratios:

- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **UI components**: 3:1 minimum

### Glass Effect Considerations

```css
/* Ensure sufficient contrast with glass effects */
.glass-component {
  /* Dark background for light text */
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  color: white;
}

/* Light background for dark text */
.glass-component-light {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  color: black;
}
```

### High Contrast Mode

Components adapt to high contrast mode:

```css
@media (prefers-contrast: high) {
  .glass-component {
    border: 2px solid;
    backdrop-filter: none;
  }
}
```

## Component-Specific Guidelines

### Forms

```javascript
// Accessible form example
<form aria-label="User registration">
  <GlassFormField
    label="Username"
    required
    error={errors.username}
  >
    <GlassInput
      id="username"
      name="username"
      aria-required="true"
      aria-invalid={!!errors.username}
      aria-describedby={
        errors.username ? "username-error" : "username-hint"
      }
    />
    <span id="username-hint" className="hint">
      3-20 characters, letters and numbers only
    </span>
    {errors.username && (
      <span id="username-error" role="alert">
        {errors.username}
      </span>
    )}
  </GlassFormField>
</form>
```

### Tables

```javascript
// Accessible table with proper headers
<GlassTable
  caption="User accounts"
  summary="List of active user accounts with roles"
>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id}>
        <th scope="row">{user.name}</th>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <GlassButton
            aria-label={`Edit ${user.name}`}
            size="small"
          >
            Edit
          </GlassButton>
        </td>
      </tr>
    ))}
  </tbody>
</GlassTable>
```

### Navigation

```javascript
// Accessible navigation with landmarks
<nav aria-label="Main navigation">
  <GlassBreadcrumbs
    items={breadcrumbs}
    aria-label="Breadcrumb navigation"
  />
</nav>

<GlassPagination
  currentPage={page}
  totalPages={total}
  aria-label="Search results pagination"
  getPageLabel={(page) => `Go to page ${page}`}
/>
```

## Testing Tools

### Automated Testing

```javascript
// Jest + jest-axe
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(<GlassButton>Click me</GlassButton>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

1. **Keyboard Navigation**
   - [ ] Tab through all interactive elements
   - [ ] Verify focus indicators are visible
   - [ ] Check focus order is logical
   - [ ] Ensure no keyboard traps

2. **Screen Reader Testing**
   - [ ] Test with NVDA (Windows)
   - [ ] Test with JAWS (Windows)
   - [ ] Test with VoiceOver (macOS/iOS)
   - [ ] Test with TalkBack (Android)

3. **Visual Testing**
   - [ ] Check color contrast ratios
   - [ ] Test with Windows High Contrast mode
   - [ ] Verify with color blindness simulators
   - [ ] Test at 200% zoom level

### Browser DevTools

```javascript
// Chrome DevTools Lighthouse
// 1. Open DevTools (F12)
// 2. Go to Lighthouse tab
// 3. Check "Accessibility" 
// 4. Generate report

// Chrome Accessibility Inspector
// 1. Open DevTools
// 2. Elements tab
// 3. Accessibility pane
// 4. Inspect ARIA tree
```

## Common Patterns

### Loading States

```javascript
function AccessibleLoader() {
  return (
    <div role="status" aria-live="polite">
      <GlassSpinner />
      <span className="sr-only">Loading content...</span>
    </div>
  );
}
```

### Error Handling

```javascript
function AccessibleError({ error }) {
  return (
    <div role="alert" aria-live="assertive">
      <GlassAlert type="error">
        <h2>Error</h2>
        <p>{error.message}</p>
      </GlassAlert>
    </div>
  );
}
```

### Progressive Disclosure

```javascript
function AccessibleAccordion() {
  return (
    <GlassAccordion>
      <GlassAccordionItem
        trigger={
          <button
            aria-expanded={isExpanded}
            aria-controls="panel-1"
          >
            Settings
          </button>
        }
      >
        <div id="panel-1">
          {/* Panel content */}
        </div>
      </GlassAccordionItem>
    </GlassAccordion>
  );
}
```

## Best Practices

### Do's ✅

- Always provide text alternatives for images
- Use semantic HTML elements
- Ensure all interactive elements are keyboard accessible
- Provide clear focus indicators
- Test with real assistive technologies
- Use ARIA only when necessary
- Keep content clear and concise
- Provide multiple ways to access content

### Don'ts ❌

- Don't remove focus indicators
- Don't use placeholder as label
- Don't auto-play media with sound
- Don't use color alone to convey information
- Don't create keyboard traps
- Don't ignore accessibility warnings
- Don't assume ARIA fixes everything
- Don't forget to test

## Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Contrast Ratio Checker](https://webaim.org/resources/contrastchecker/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

### React-Specific
- [React Accessibility Docs](https://react.dev/reference/react-dom/components/common#accessibility-attributes)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [Reach UI](https://reach.tech/) (Accessible component patterns)

---

Remember: Accessibility is not a feature, it's a fundamental requirement. Every user deserves equal access to your application!