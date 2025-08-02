import { Callout } from 'nextra/components'

# GlassCheckbox

<Callout type="warning">
  **Component Availability Notice**: This component is documented but may not be available in the current version of the Liquidify package. Please check the [Component Availability Matrix](/COMPONENT_AVAILABILITY.md) for the most up-to-date information about which components are actually exported and usable.
</Callout>

GlassCheckbox is a form control component for binary selections using Apple's Human Interface Guidelines and Liquid Glass aesthetics.

## Overview

The GlassCheckbox component provides users with a way to select one or more options from a set, featuring the signature Liquid Glass visual treatment while maintaining Apple's accessibility standards.

## Anatomy

- **Container**: Liquid Glass background with subtle transparency
- **Checkbox**: Interactive element with check state indicator
- **Label**: Descriptive text using Apple typography
- **Focus Ring**: Apple HIG focus indicator for accessibility

## States

### Default State

Clean, unchecked state with Liquid Glass styling.

### Checked State

Activated state with animated check mark and visual feedback.

### Interactive States

- **Hover**: Subtle glow effect with Liquid Glass interaction
- **Focus**: Apple HIG focus ring for keyboard navigation
- **Active**: Press state with haptic feedback simulation
- **Disabled**: Reduced opacity maintaining accessibility contrast

### Indeterminate State

Partial selection state for nested checkbox groups.

### Responsive Behavior

Maintains proper touch targets across all Apple devices (minimum 44x44pt).

## Usage Guidelines

### When to Use

- Multiple selection from a list of options
- Enabling/disabling features or settings
- Agreeing to terms and conditions
- Filtering content or data

### When Not to Use

- Single selection from multiple options (use GlassRadio instead)
- Binary toggle controls (use GlassSwitch instead)
- Simple on/off states (use GlassSwitch instead)

## Accessibility

### Voice Control

Properly labeled for voice commands like "Check terms" or "Uncheck notifications".

### Keyboard Navigation

- Tab: Focus next/previous checkbox
- Space: Toggle checked state
- Arrow keys: Navigate within checkbox groups

### Screen Reader Support

- Proper ARIA labels and descriptions
- State announcements for checked/unchecked
- Group context for related checkboxes

### High Contrast Mode

Enhanced borders and indicators for better visibility.

### Reduced Motion

Respects user preferences for reduced motion in animations.

## API Reference

### Props

| Prop             | Type                   | Default     | Description                        |
| ---------------- | ---------------------- | ----------- | ---------------------------------- |
| `checked`        | `boolean`              | `false`     | Controlled checked state           |
| `defaultChecked` | `boolean`              | `false`     | Uncontrolled initial checked state |
| `disabled`       | `boolean`              | `false`     | Disables user interaction          |
| `indeterminate`  | `boolean`              | `false`     | Shows indeterminate state          |
| `size`           | `'sm' \| 'md' \| 'lg'` | `'md'`      | Checkbox size following 4pt grid   |
| `label`          | `string`               | `undefined` | Accessible label text              |
| `description`    | `string`               | `undefined` | Additional descriptive text        |
| `error`          | `string`               | `undefined` | Error message text                 |
| `required`       | `boolean`              | `false`     | Marks field as required            |

### Events

| Event      | Type                                       | Description                        |
| ---------- | ------------------------------------------ | ---------------------------------- |
| `onChange` | `(checked: boolean, event: Event) => void` | Fired when checked state changes   |
| `onFocus`  | `(event: FocusEvent) => void`              | Fired when checkbox receives focus |
| `onBlur`   | `(event: FocusEvent) => void`              | Fired when checkbox loses focus    |

## Code Examples

### Basic Usage

```tsx
import { GlassCheckbox } from 'liquidify';

export default function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <GlassCheckbox
      checked={checked}
      onChange={checked => setChecked(checked)}
      label='Accept terms and conditions'
    />
  );
}
```

### Checkbox Group

```tsx
import { GlassCheckbox } from 'liquidify';

export default function CheckboxGroupExample() {
  const [selections, setSelections] = useState({
    notifications: true,
    marketing: false,
    updates: true,
  });

  const handleChange = (key: string, checked: boolean) => {
    setSelections(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className='space-y-4'>
      <h3 className='hig-headline'>Email Preferences</h3>
      <GlassCheckbox
        checked={selections.notifications}
        onChange={checked => handleChange('notifications', checked)}
        label='Security notifications'
        description='Important updates about your account'
      />
      <GlassCheckbox
        checked={selections.marketing}
        onChange={checked => handleChange('marketing', checked)}
        label='Marketing emails'
        description='Product updates and promotional content'
      />
      <GlassCheckbox
        checked={selections.updates}
        onChange={checked => handleChange('updates', checked)}
        label='Feature updates'
        description='New features and improvements'
      />
    </div>
  );
}
```

### Indeterminate State

```tsx
import { GlassCheckbox } from 'liquidify';

export default function IndeterminateExample() {
  const [parent, setParent] = useState(false);
  const [children, setChildren] = useState([false, false, false]);

  const checkedCount = children.filter(Boolean).length;
  const isIndeterminate = checkedCount > 0 && checkedCount < children.length;

  const handleParentChange = (checked: boolean) => {
    setParent(checked);
    setChildren(children.map(() => checked));
  };

  const handleChildChange = (index: number, checked: boolean) => {
    const newChildren = [...children];
    newChildren[index] = checked;
    setChildren(newChildren);
    setParent(newChildren.every(Boolean));
  };

  return (
    <div className='space-y-2'>
      <GlassCheckbox
        checked={parent}
        indeterminate={isIndeterminate}
        onChange={handleParentChange}
        label='Select all features'
        size='lg'
      />
      <div className='ml-6 space-y-2'>
        {children.map((checked, index) => (
          <GlassCheckbox
            key={index}
            checked={checked}
            onChange={checked => handleChildChange(index, checked)}
            label={`Feature ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
```

### Form Validation

```tsx
import { GlassCheckbox } from 'liquidify';

export default function ValidationExample() {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = () => {
    if (!agreed) {
      setError('You must agree to the terms to continue');
      return;
    }
    setError(undefined);
    // Continue with form submission
  };

  return (
    <div className='space-y-4'>
      <GlassCheckbox
        checked={agreed}
        onChange={checked => {
          setAgreed(checked);
          if (error) setError(undefined);
        }}
        label='I agree to the terms and conditions'
        error={error}
        required
      />
      <button onClick={handleSubmit} className='glass-button-primary'>
        Continue
      </button>
    </div>
  );
}
```

## Interactive Playground

[Live interactive component demonstration would go here]

## Design Tokens

### Colors

- `--glass-checkbox-background`: Liquid Glass background
- `--glass-checkbox-border`: Border color in default state
- `--glass-checkbox-checked`: Checked state color
- `--glass-checkbox-disabled`: Disabled state color
- `--glass-checkbox-error`: Error state color

### Typography

- Label: 16px SF Pro Text Regular
- Description: 14px SF Pro Text Regular
- Error: 12px SF Pro Text Regular

### Spacing

- Checkbox size: 16px (sm), 20px (md), 24px (lg)
- Label spacing: 8px from checkbox
- Description spacing: 4px below label

### Motion

- Check animation: Apple spring curve (0.4s)
- Hover transition: 200ms ease-out
- Focus animation: Apple spring curve

## Platform Considerations

### iOS/iPadOS

- Haptic feedback on state changes
- Dynamic Type support for labels
- Proper touch targets (minimum 44x44pt)
- Context menu for additional actions

### macOS

- Hover states for mouse interactions
- Keyboard shortcuts (Space to toggle)
- Menu bar integration for global preferences

### watchOS

- Simplified appearance for smaller screens
- Digital Crown support for scrolling lists
- Optimized touch targets

## Related Components

- [GlassRadio](/components/inputs/glass-radio) - For single selection
- [GlassSwitch](/components/inputs/glass-switch) - For binary toggles
- [GlassButton](/components/actions/glass-button) - For form actions

## Resources

- [Apple HIG - Toggles](https://developer.apple.com/design/human-interface-guidelines/components/selection-and-input/toggles/)
- [Liquid Glass Guidelines](/design-system/liquid-glass)
- [Form Design Best Practices](/design-system/forms)

---

_This component follows Apple's Human Interface Guidelines and implements the Liquid Glass design language introduced at WWDC 2025._
