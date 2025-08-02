import { Callout } from 'nextra/components'

# GlassProgress

<Callout type="warning">
  **Component Availability Notice**: This component is documented but may not be available in the current version of the Liquidify package. Please check the [Component Availability Matrix](/COMPONENT_AVAILABILITY.md) for the most up-to-date information about which components are actually exported and usable.
</Callout>

GlassProgress is a component that displays the progress of a task or process using Apple's Human Interface Guidelines and Liquid Glass aesthetics.

## Overview

The GlassProgress component provides visual feedback for determinate processes with sophisticated Liquid Glass effects, smooth animations, and adaptive theming that maintains Apple's design consistency across all platforms.

## Anatomy

- **Track**: Background container with Liquid Glass substrate
- **Fill**: Progress indicator with dynamic glass effects
- **Label**: Optional text showing percentage or status
- **Segments**: Optional discrete progress divisions

## States

### Default State

Empty progress track with subtle Liquid Glass background.

### Progress State

Animated fill with:

- Smooth liquid motion effects
- Dynamic color transitions
- Shimmer and glow animations
- Adaptive opacity changes

### Completed State

Full progress with success animations and enhanced visual feedback.

### Error State

Error indication with appropriate color and animation changes.

### Interactive States

- **Hover**: Enhanced glow and subtle scale effects
- **Focus**: Apple HIG focus indicators with rim lighting
- **Disabled**: Reduced opacity maintaining glass aesthetics

### Responsive Behavior

Adapts to container width while maintaining proper proportions and touch targets.

## Usage Guidelines

### When to Use

- File uploads and downloads
- Form completion progress
- Loading states with known duration
- Multi-step processes
- Data processing tasks

### When Not to Use

- Indeterminate processes (use GlassLoading)
- Simple binary states (use GlassSwitch)
- Navigation progress (use breadcrumbs)

## Accessibility

### Voice Control

Properly labeled for voice commands like "Show progress" or "Check status".

### Keyboard Navigation

- Tab: Focus progress indicator
- Space: Toggle additional information (if interactive)

### Screen Reader Support

- Proper ARIA labels and roles
- Progress value announcements
- Status updates via live regions
- Percentage completion feedback

### High Contrast Mode

Enhanced contrast for track and fill with adaptive borders.

### Reduced Motion

Respects user preferences while maintaining visual clarity.

## API Reference

### Props

| Prop          | Type                                             | Default     | Description                      |
| ------------- | ------------------------------------------------ | ----------- | -------------------------------- |
| `value`       | `number`                                         | `0`         | Current progress value (0-100)   |
| `max`         | `number`                                         | `100`       | Maximum progress value           |
| `variant`     | `'linear' \| 'circular' \| 'ring'`               | `'linear'`  | Progress indicator style         |
| `size`        | `'sm' \| 'md' \| 'lg'`                           | `'md'`      | Progress indicator size          |
| `color`       | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Progress color theme             |
| `showLabel`   | `boolean`                                        | `false`     | Show percentage label            |
| `labelFormat` | `(value: number) => string`                      | `undefined` | Custom label formatting function |
| `animated`    | `boolean`                                        | `true`      | Enable smooth animations         |
| `segments`    | `number`                                         | `undefined` | Number of discrete segments      |

### Events

| Event        | Type                      | Description                     |
| ------------ | ------------------------- | ------------------------------- |
| `onChange`   | `(value: number) => void` | Fired when progress changes     |
| `onComplete` | `() => void`              | Fired when progress reaches max |

## Code Examples

### Basic Usage

```tsx
import { GlassProgress } from 'liquidify';

export default function Example() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='space-y-4'>
      <GlassProgress value={progress} showLabel animated />
      <p className='hig-caption'>Upload Progress: {progress}%</p>
    </div>
  );
}
```

### Circular Progress

```tsx
import { GlassProgress } from 'liquidify';

export default function CircularExample() {
  const [downloadProgress, setDownloadProgress] = useState(75);

  return (
    <div className='flex items-center justify-center p-8'>
      <GlassProgress
        value={downloadProgress}
        variant='circular'
        size='lg'
        color='primary'
        showLabel
        labelFormat={value => `${Math.round(value)}%`}
      />
    </div>
  );
}
```

### Multi-Step Process

```tsx
import { GlassProgress } from 'liquidify';

export default function MultiStepExample() {
  const [currentStep, setCurrentStep] = useState(2);
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    'Account Setup',
    'Profile Information',
    'Preferences',
    'Verification',
    'Complete',
  ];

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h3 className='hig-headline mb-2'>Setup Progress</h3>
        <p className='hig-body'>
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      <GlassProgress
        value={progress}
        segments={totalSteps}
        color='primary'
        size='lg'
        animated
      />

      <div className='grid grid-cols-5 gap-2 text-center'>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`hig-caption ${
              index < currentStep ? 'text-primary' : 'text-secondary'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### File Upload Progress

```tsx
import { GlassProgress } from 'liquidify';

export default function FileUploadExample() {
  const [uploadState, setUploadState] = useState({
    progress: 0,
    status: 'uploading', // 'uploading', 'success', 'error'
    fileName: 'document.pdf',
    fileSize: '2.4 MB',
  });

  const getProgressColor = () => {
    switch (uploadState.status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <div className='glass-card p-6 max-w-md'>
      <div className='flex items-center gap-3 mb-4'>
        <div className='w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center'>
          <DocumentIcon className='w-5 h-5 text-blue-600' />
        </div>
        <div className='flex-1'>
          <p className='hig-body font-medium'>{uploadState.fileName}</p>
          <p className='hig-caption text-secondary'>{uploadState.fileSize}</p>
        </div>
      </div>

      <GlassProgress
        value={uploadState.progress}
        color={getProgressColor()}
        animated
        showLabel
        labelFormat={value =>
          uploadState.status === 'success'
            ? 'Complete'
            : uploadState.status === 'error'
              ? 'Failed'
              : `${Math.round(value)}%`
        }
      />

      <div className='mt-3 flex justify-between text-sm'>
        <span className='hig-caption'>
          {uploadState.status === 'uploading'
            ? 'Uploading...'
            : uploadState.status === 'success'
              ? 'Upload complete'
              : 'Upload failed'}
        </span>
        {uploadState.status === 'uploading' && (
          <button className='hig-caption text-primary'>Cancel</button>
        )}
      </div>
    </div>
  );
}
```

## Interactive Playground

[Live interactive component demonstration would go here]

## Design Tokens

### Colors

- `--glass-progress-track`: Liquid Glass background with subtle tint
- `--glass-progress-fill-primary`: Primary progress color with glass effects
- `--glass-progress-fill-success`: Success state color
- `--glass-progress-fill-warning`: Warning state color
- `--glass-progress-fill-error`: Error state color

### Typography

- Label: 14px SF Pro Text Medium
- Percentage: 12px SF Pro Text Regular
- Status: 12px SF Pro Text Regular

### Spacing

- Track height: 4px (sm), 6px (md), 8px (lg)
- Circular diameter: 32px (sm), 48px (md), 64px (lg)
- Label spacing: 8px from progress bar

### Motion

- Fill animation: Apple spring curve with liquid flow
- Completion animation: Success bounce with glow
- Color transitions: 300ms ease-out
- Shimmer effect: Continuous subtle animation

### Effects

- **Liquid Glass Fill**: Multi-layer blur with dynamic opacity
- **Shimmer Animation**: Subtle moving highlight
- **Glow Effects**: Dynamic rim lighting based on progress
- **Completion Burst**: Success animation with particle effects

## Platform Considerations

### iOS/iPadOS

- Haptic feedback on completion
- Dynamic Type support for labels
- Proper contrast in all appearances
- Integration with system progress indicators

### macOS

- Smooth animations matching system preferences
- Keyboard accessibility
- Menu bar integration for background tasks
- Window vibrancy effects

### watchOS

- Simplified appearance for smaller screens
- Digital Crown support for manual adjustment
- Optimized for glanceable information
- Reduced complexity

## Related Components

- [GlassLoading](/components/presentation/glass-loading) - For indeterminate progress
- [GlassSlider](/components/inputs/glass-slider) - For user input ranges
- [GlassButton](/components/actions/glass-button) - For progress actions

## Resources

- [Apple HIG - Progress Indicators](https://developer.apple.com/design/human-interface-guidelines/components/feedback/progress-indicators/)
- [Liquid Glass Guidelines](/design-system/liquid-glass)
- [Animation Principles](/design-system/animation)

---

_This component follows Apple's Human Interface Guidelines and implements the Liquid Glass design language introduced at WWDC 2025._
