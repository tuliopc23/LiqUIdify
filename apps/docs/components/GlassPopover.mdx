import { Callout } from 'nextra/components'

# GlassPopover

<Callout type="warning">
  **Component Availability Notice**: This component is documented but may not be available in the current version of the Liquidify package. Please check the [Component Availability Matrix](/COMPONENT_AVAILABILITY.md) for the most up-to-date information about which components are actually exported and usable.
</Callout>

GlassPopover is a floating component that displays contextual information or actions using Apple's Human Interface Guidelines and Liquid Glass aesthetics.

## Overview

The GlassPopover component provides a sophisticated overlay that appears relative to a trigger element, featuring advanced Liquid Glass blur effects, smooth spring animations, and intelligent positioning to ensure optimal user experience across all Apple platforms.

## Anatomy

- **Trigger**: Element that activates the popover
- **Container**: Liquid Glass backdrop with advanced blur and vibrancy
- **Content Area**: Flexible container for custom content
- **Arrow**: Optional directional indicator with glass morphing
- **Backdrop**: Optional semi-transparent overlay with blur effects

## States

### Default State

Hidden state with no visual presence.

### Open State

Fully visible with sophisticated Liquid Glass effects:

- Multi-layer blur and vibrancy
- Smooth scale and opacity transitions
- Dynamic shadow casting
- Adaptive positioning

### Interactive States

- **Hover**: Enhanced glow and subtle scale effects
- **Focus**: Apple HIG focus indicators with glass rim lighting
- **Active**: Press state with haptic feedback simulation
- **Disabled**: Reduced opacity maintaining glass aesthetics

### Responsive Behavior

Intelligent positioning system that adapts to:

- Screen boundaries and safe areas
- Available space and viewport constraints
- Device orientation changes
- Dynamic content sizing

## Usage Guidelines

### When to Use

- Contextual menus and actions
- Detailed information overlays
- Form field help and validation
- Tool tips and guidance
- Quick actions and shortcuts

### When Not to Use

- Primary navigation (use GlassNavbar)
- Full-screen modals (use GlassModal)
- Persistent UI elements
- Complex forms or workflows

## Accessibility

### Voice Control

Properly labeled for voice commands like "Show details" or "Open menu".

### Keyboard Navigation

- Tab: Navigate to trigger and within popover
- Enter/Space: Open/close popover
- Arrow keys: Navigate content
- Escape: Close popover

### Screen Reader Support

- Proper ARIA labels and descriptions
- Focus management and restoration
- Live region announcements
- Hierarchical content structure

### High Contrast Mode

Enhanced borders and focus indicators with adaptive contrast.

### Reduced Motion

Respects user preferences with simplified animations while maintaining glass aesthetics.

## API Reference

### Props

| Prop                  | Type                                               | Default     | Description                        |
| --------------------- | -------------------------------------------------- | ----------- | ---------------------------------- |
| `trigger`             | `React.ReactElement`                               | `undefined` | Element that triggers the popover  |
| `content`             | `React.ReactNode`                                  | `undefined` | Content to display in popover      |
| `placement`           | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'auto'`    | Preferred placement                |
| `offset`              | `number`                                           | `8`         | Distance from trigger element      |
| `arrow`               | `boolean`                                          | `true`      | Show directional arrow             |
| `backdrop`            | `boolean`                                          | `false`     | Show backdrop overlay              |
| `blurIntensity`       | `'light' \| 'medium' \| 'heavy'`                   | `'medium'`  | Liquid Glass blur intensity        |
| `closeOnOutsideClick` | `boolean`                                          | `true`      | Close when clicking outside        |
| `animationDuration`   | `number`                                           | `300`       | Animation duration in milliseconds |

### Events

| Event     | Type                          | Description                       |
| --------- | ----------------------------- | --------------------------------- |
| `onOpen`  | `() => void`                  | Fired when popover opens          |
| `onClose` | `() => void`                  | Fired when popover closes         |
| `onFocus` | `(event: FocusEvent) => void` | Fired when popover receives focus |

## Code Examples

### Basic Usage

```tsx
import { GlassPopover } from 'liquidify';

export default function Example() {
  return (
    <GlassPopover
      trigger={<button>Show Info</button>}
      content={
        <div className='p-4'>
          <h3 className='hig-headline mb-2'>Quick Info</h3>
          <p className='hig-body'>
            This is contextual information with beautiful Liquid Glass effects.
          </p>
        </div>
      }
    />
  );
}
```

### Menu Popover

```tsx
import { GlassPopover } from 'liquidify';

export default function MenuExample() {
  const menuContent = (
    <div className='py-2'>
      <button className='w-full px-4 py-2 text-left hover:bg-glass-hover'>
        Edit Profile
      </button>
      <button className='w-full px-4 py-2 text-left hover:bg-glass-hover'>
        Settings
      </button>
      <div className='border-t border-glass-border my-1' />
      <button className='w-full px-4 py-2 text-left hover:bg-glass-hover text-red-500'>
        Sign Out
      </button>
    </div>
  );

  return (
    <GlassPopover
      trigger={<button className='glass-button'>Options</button>}
      content={menuContent}
      placement='bottom'
      blurIntensity='heavy'
    />
  );
}
```

### Form Help Popover

```tsx
import { GlassPopover } from 'liquidify';

export default function FormHelpExample() {
  const helpContent = (
    <div className='max-w-xs p-4'>
      <h4 className='hig-subheadline mb-2'>Password Requirements</h4>
      <ul className='hig-caption space-y-1'>
        <li>• At least 8 characters</li>
        <li>• One uppercase letter</li>
        <li>• One number</li>
        <li>• One special character</li>
      </ul>
    </div>
  );

  return (
    <div className='relative'>
      <input type='password' className='glass-input' placeholder='Password' />
      <GlassPopover
        trigger={
          <button className='absolute right-2 top-2 glass-icon-button'>
            <InfoIcon />
          </button>
        }
        content={helpContent}
        placement='right'
        arrow={true}
      />
    </div>
  );
}
```

### Advanced Usage with Animations

```tsx
import { GlassPopover } from 'liquidify';

export default function AdvancedExample() {
  const [isOpen, setIsOpen] = useState(false);

  const richContent = (
    <div className='w-80 p-6'>
      <div className='flex items-start gap-3 mb-4'>
        <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600' />
        <div>
          <h3 className='hig-headline'>John Doe</h3>
          <p className='hig-caption text-secondary'>Software Engineer</p>
        </div>
      </div>

      <div className='space-y-3'>
        <div className='flex justify-between'>
          <span className='hig-body'>Projects</span>
          <span className='hig-body-emphasis'>12</span>
        </div>
        <div className='flex justify-between'>
          <span className='hig-body'>Commits</span>
          <span className='hig-body-emphasis'>284</span>
        </div>
      </div>

      <div className='mt-4 pt-4 border-t border-glass-border'>
        <button className='glass-button-primary w-full'>View Profile</button>
      </div>
    </div>
  );

  return (
    <GlassPopover
      trigger={
        <div className='glass-card p-4 cursor-pointer'>
          <div className='w-8 h-8 rounded-full bg-blue-500 mb-2' />
          <span className='hig-caption'>Hover for details</span>
        </div>
      }
      content={richContent}
      placement='auto'
      blurIntensity='heavy'
      backdrop={true}
      animationDuration={400}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    />
  );
}
```

## Interactive Playground

[Live interactive component demonstration would go here]

## Design Tokens

### Colors

- `--glass-popover-background`: Multi-layer Liquid Glass with blur
- `--glass-popover-border`: Subtle border with glass refraction
- `--glass-popover-shadow`: Dynamic shadow with depth
- `--glass-popover-backdrop`: Semi-transparent backdrop with blur

### Typography

- Content: 16px SF Pro Text Regular
- Headings: 18px SF Pro Display Medium
- Captions: 12px SF Pro Text Regular

### Spacing

- Content padding: 16px
- Arrow size: 8px
- Offset distance: 8px default
- Border radius: 12px with glass morphing

### Motion

- Open animation: Apple spring curve with scale and opacity
- Close animation: Smooth ease-out with blur fade
- Hover transitions: 200ms ease-out
- Focus animations: Apple spring curve with rim lighting

### Effects

- **Liquid Glass Blur**: Multi-layer blur with vibrancy
- **Dynamic Shadows**: Adaptive shadow casting based on placement
- **Glass Morphing**: Smooth border radius transitions
- **Backdrop Blur**: Advanced backdrop filtering
- **Rim Lighting**: Subtle glow effects on focus

## Platform Considerations

### iOS/iPadOS

- Haptic feedback on open/close
- Dynamic Type support for content
- Safe area awareness
- Context menu integration
- Touch gesture support

### macOS

- Hover states for mouse interactions
- Keyboard shortcuts
- Window vibrancy effects
- Menu bar integration
- Cursor proximity effects

### watchOS

- Simplified appearance for smaller screens
- Digital Crown support
- Optimized touch targets
- Reduced complexity

## Related Components

- [GlassTooltip](/components/presentation/glass-tooltip) - For simple text overlays
- [GlassModal](/components/containment/glass-modal) - For full-screen overlays
- [GlassDropdown](/components/inputs/glass-dropdown) - For selection menus

## Resources

- [Apple HIG - Popovers](https://developer.apple.com/design/human-interface-guidelines/components/presentation/popovers/)
- [Liquid Glass Guidelines](/design-system/liquid-glass)
- [Animation Principles](/design-system/animation)

---

_This component follows Apple's Human Interface Guidelines and implements the Liquid Glass design language introduced at WWDC 2025._
