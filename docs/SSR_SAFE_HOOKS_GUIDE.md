# SSR-Safe Hooks Guide

## Overview

The LiqUIdify component library provides a set of SSR-safe hooks that work correctly in both server-side and client-side environments. These hooks are designed to prevent hydration mismatches and ensure your components render consistently across different environments.

## Available SSR-Safe Hooks

### `_isSSR()`

Detects whether code is running in a server-side rendering environment.

```typescript
const isServer = _isSSR();
// Returns: true on server, false on client
```

### `_useSSRSafe(callback, deps)`

Executes a callback only on the client side, preventing SSR errors.

```typescript
_useSSRSafe(() => {
  // This code only runs on the client
  console.log("Client-side only code");
}, []);
```

### `_useIntersectionObserver(callback?, options?)`

Observes element visibility with Intersection Observer API.

```typescript
const [ref, entry] = _useIntersectionObserver<HTMLDivElement>();
// ref: React ref to attach to element
// entry: IntersectionObserverEntry or null
```

**SSR Behavior**: Returns `[ref, null]` during SSR

### `_useMediaQuery(query)`

Responds to CSS media query changes.

```typescript
const isMobile = _useMediaQuery("(max-width: 768px)");
// Returns: boolean
```

**SSR Behavior**: Always returns `false` during SSR

### `_useNetworkStatus()`

Monitors network connection status.

```typescript
const { online, effectiveType, downlink, rtt, saveData } = _useNetworkStatus();
```

**SSR Behavior**: Returns default values:

```typescript
{
  online: true,
  effectiveType: '4g',
  downlink: 10,
  rtt: 50,
  saveData: false
}
```

### `_useWindowSize()`

Tracks window dimensions and resize events.

```typescript
const { width, height, isReady } = _useWindowSize();
```

**SSR Behavior**: Returns:

```typescript
{
  width: 0,
  height: 0,
  isReady: false
}
```

## Usage Examples

### Basic SSR-Safe Component

```typescript
import { _useMediaQuery, _useWindowSize, _isSSR } from '@liquidify/components';

export const ResponsiveComponent = () => {
  const isMobile = _useMediaQuery('(max-width: 768px)');
  const { width, height, isReady } = _useWindowSize();

  // Handle SSR gracefully
  if (!isReady) {
    return <div>Loading layout...</div>;
  }

  return (
    <div>
      <h1>{isMobile ? 'Mobile View' : 'Desktop View'}</h1>
      <p>Window size: {width}x{height}</p>
    </div>
  );
};
```

### Next.js Integration

```typescript
import { useState, useEffect } from 'react';
import { _useIntersectionObserver, _useNetworkStatus } from '@liquidify/components';

export const NextJsComponent = () => {
  const [mounted, setMounted] = useState(false);
  const [ref, entry] = _useIntersectionObserver();
  const { online } = _useNetworkStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {/* Always rendered content */}
      <h1>My App</h1>

      {/* Client-only features */}
      {mounted && (
        <>
          <div ref={ref}>
            {entry?.isIntersecting ? 'In view!' : 'Scroll to see me'}
          </div>
          <p>Network: {online ? 'Online' : 'Offline'}</p>
        </>
      )}
    </div>
  );
};
```

### Responsive Navigation

```typescript
import { _useMediaQuery, _useSSRSafe } from '@liquidify/components';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = _useMediaQuery('(max-width: 768px)');

  _useSSRSafe(() => {
    // Client-only initialization
    const savedState = localStorage.getItem('menuOpen');
    if (savedState) {
      setMenuOpen(JSON.parse(savedState));
    }
  }, []);

  return (
    <nav>
      {isMobile ? (
        <MobileNav open={menuOpen} onToggle={setMenuOpen} />
      ) : (
        <DesktopNav />
      )}
    </nav>
  );
};
```

## Best Practices

### 1. Use Loading States

Always provide loading states for client-only features:

```typescript
const { isReady, width } = _useWindowSize();

if (!isReady) {
  return <Skeleton />;
}

return <div style={{ width: width * 0.8 }}>Content</div>;
```

### 2. Avoid Direct Window Access

Instead of:

```typescript
// ❌ This will fail during SSR
const width = window.innerWidth;
```

Use:

```typescript
// ✅ SSR-safe approach
const { width } = _useWindowSize();
```

### 3. Handle Media Query Defaults

```typescript
const isMobile = _useMediaQuery('(max-width: 768px)');

// Provide fallback UI for SSR
return (
  <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
    {/* Use CSS for initial styling to avoid flashes */}
  </div>
);
```

### 4. Progressive Enhancement

```typescript
export const EnhancedComponent = () => {
  const [enhanced, setEnhanced] = useState(false);
  const { online } = _useNetworkStatus();

  _useSSRSafe(() => {
    setEnhanced(true);
  }, []);

  return (
    <div>
      {/* Basic functionality that works everywhere */}
      <BasicFeature />

      {/* Enhanced features for capable clients */}
      {enhanced && online && <AdvancedFeature />}
    </div>
  );
};
```

## Testing

### Unit Tests

```typescript
import { renderHook } from "@testing-library/react";
import { _useMediaQuery } from "@liquidify/components";

describe("SSR-safe hooks", () => {
  it("returns safe defaults in SSR", () => {
    const { result } = renderHook(() => _useMediaQuery("(min-width: 768px)"));
    expect(result.current).toBe(false);
  });
});
```

### SSR Testing

```typescript
// pages/test.tsx (Next.js)
export const getServerSideProps = async () => {
  // Hooks should not throw during SSR
  const TestComponent = () => {
    const isMobile = _useMediaQuery('(max-width: 768px)');
    return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
  };

  // This should render without errors
  const html = ReactDOMServer.renderToString(<TestComponent />);

  return { props: {} };
};
```

## Troubleshooting

### Hydration Mismatches

If you see hydration warnings, ensure you're handling the transition from server to client:

```typescript
// ❌ May cause hydration mismatch
const Component = () => {
  const { width } = _useWindowSize();
  return <div>{width}px wide</div>;
};

// ✅ Handles hydration correctly
const Component = () => {
  const { width, isReady } = _useWindowSize();
  return <div>{isReady ? `${width}px wide` : 'Measuring...'}</div>;
};
```

### TypeScript Types

All hooks are fully typed. Import types as needed:

```typescript
import type { IntersectionObserverEntry } from "@liquidify/components";

const handleIntersection = (entry: IntersectionObserverEntry) => {
  console.log(entry.isIntersecting);
};
```

## Performance Considerations

1. **Debouncing**: Window resize and media query changes are automatically debounced
2. **Cleanup**: All event listeners are properly cleaned up on unmount
3. **Lazy Initialization**: Browser APIs are only accessed when needed
4. **Memoization**: Hook results are memoized to prevent unnecessary re-renders

## Framework Compatibility

These hooks are tested and work with:

- ✅ Next.js (Pages & App Router)
- ✅ Remix
- ✅ Gatsby
- ✅ Vite SSR
- ✅ Custom Node.js SSR solutions
- ✅ Static Site Generation (SSG)

## Summary

The SSR-safe hooks in LiqUIdify ensure your components work seamlessly across server and client environments. By following the patterns and best practices outlined in this guide, you can build robust, hydration-safe applications that provide great user experiences regardless of the rendering environment.
