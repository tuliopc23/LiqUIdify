# GlassLiveRegion - Enhanced Accessibility Announcements

The GlassLiveRegion component provides a comprehensive system for managing screen reader announcements with advanced features like smart queuing, deduplication, and context-aware messaging.

## Key Features

### 1. Smart Announcement Queuing

- Announcements are automatically queued and processed by priority
- Four priority levels: `low`, `medium`, `high`, `critical`
- Higher priority announcements are processed first
- Queue size is configurable with `maxQueueSize` prop

### 2. Deduplication System

- Prevents duplicate announcements within a 1-second window
- Uses `dedupKey` to identify similar announcements
- Automatically cleans up old deduplication entries

### 3. Context-Aware Announcements

- Seven built-in contexts: `navigation`, `form`, `notification`, `error`, `success`, `loading`, `general`
- Each context has appropriate default priorities and prefixes
- Context-specific helper methods for common scenarios

### 4. Custom Timing Control

- Configure announcement delays based on priority
- Set custom clear delays for temporary messages
- Fine-grained control over announcement lifecycle

## Basic Usage

```tsx
import {
  GlassLiveRegion,
  useAnnouncement,
  announcer,
} from "@/components/glass-live-region";

// Component usage
<GlassLiveRegion
  message="Status updated"
  priority="polite"
  clearDelay={5000}
/>;

// Hook usage
const { announce, announceError, announceSuccess } = useAnnouncement();

// Announce with options
announce("Custom message", {
  priority: "high",
  context: "notification",
  delay: 200,
  clearDelay: 3000,
  dedupKey: "status-update",
});

// Context-specific helpers
announceError("Validation failed");
announceSuccess("Saved successfully");
announceNavigation("Page changed");
announceLoading("Processing...");

// Global announcer
announcer.error("Network error occurred");
announcer.success("Upload complete");
```

## Advanced Usage

### With Provider

```tsx
import { GlassLiveRegionProvider } from "@/components/glass-live-region";

// Wrap your app
<GlassLiveRegionProvider>
  <App />
</GlassLiveRegionProvider>;
```

### Form Integration

```tsx
const FormComponent = () => {
  const { announceError, announceSuccess } = useAnnouncement();

  const handleSubmit = async (data) => {
    try {
      await submitForm(data);
      announceSuccess("Form submitted successfully");
    } catch (error) {
      announceError(`Error: ${error.message}`);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Navigation Updates

```tsx
const NavigationComponent = () => {
  const { announceNavigation } = useAnnouncement();
  const location = useLocation();

  useEffect(() => {
    announceNavigation(`Navigated to ${location.pathname}`);
  }, [location.pathname]);

  return <nav>...</nav>;
};
```

### Dynamic Content Updates

```tsx
const DynamicList = () => {
  const { announce } = useAnnouncement();
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
    announce(`Added ${item.name} to the list`, {
      context: "notification",
      priority: "medium",
      dedupKey: `add-${item.id}`,
    });
  };

  return <ul>...</ul>;
};
```

## API Reference

### GlassLiveRegion Props

| Prop             | Type                             | Default          | Description                            |
| ---------------- | -------------------------------- | ---------------- | -------------------------------------- |
| message          | string                           | undefined        | The message to announce                |
| priority         | 'polite' \| 'assertive' \| 'off' | 'polite'         | ARIA live region priority              |
| atomic           | boolean                          | true             | Whether to announce the entire region  |
| relevant         | AriaRelevant                     | 'additions text' | What changes to announce               |
| clearDelay       | number                           | 0                | Time in ms before clearing the message |
| visuallyHidden   | boolean                          | true             | Whether to hide the region visually    |
| role             | 'status' \| 'alert' \| 'log'     | 'status'         | ARIA role for the region               |
| queueingEnabled  | boolean                          | false            | Enable smart announcement queuing      |
| maxQueueSize     | number                           | 10               | Maximum number of queued announcements |
| contextualPrefix | boolean                          | true             | Add context-based prefixes to messages |

### useAnnouncement Hook

Returns an object with:

- `announcement`: Current announcement message
- `announcementOptions`: Current announcement options
- `announce`: Main announce function
- `announceError`: Announce an error (high priority)
- `announceSuccess`: Announce success (medium priority)
- `announceNavigation`: Announce navigation (low priority)
- `announceLoading`: Announce loading state (low priority)
- `clear`: Clear current announcement

### Global Announcer

The `announcer` object provides:

- `announce(message, options)`: Queue an announcement
- `error(message, options)`: Announce an error
- `success(message, options)`: Announce success
- `navigation(message, options)`: Announce navigation
- `loading(message, options)`: Announce loading
- `subscribe(listener)`: Subscribe to announcements

## Priority System

| Priority | ARIA Live | Default Delay | Use Case                       |
| -------- | --------- | ------------- | ------------------------------ |
| critical | assertive | 0ms           | Urgent errors, security alerts |
| high     | assertive | 100ms         | Important errors, warnings     |
| medium   | polite    | 200ms         | Success messages, updates      |
| low      | polite    | 500ms         | Navigation, status changes     |

## Best Practices

1. **Use appropriate priorities**: Don't overuse high/critical priorities
2. **Provide context**: Use context-aware methods when possible
3. **Avoid announcement spam**: Use deduplication for repeated events
4. **Keep messages concise**: Screen reader users appreciate brevity
5. **Test with screen readers**: Always verify with actual assistive technology

## Accessibility Compliance

This component helps achieve WCAG 2.1 compliance for:

- **4.1.3 Status Messages** (Level AA)
- **3.3.1 Error Identification** (Level A)
- **3.3.3 Error Suggestion** (Level AA)
- **2.2.4 Interruptions** (Level AAA)
