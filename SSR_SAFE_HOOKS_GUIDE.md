# SSR Safe Hooks Test Isolation Guide

## Problem Fixed

The original `use-ssr-safe-hooks.test.tsx` file had test isolation issues where global overrides for browser APIs were not properly restored after tests, causing side effects between tests.

### Issues Identified

1. **IntersectionObserver pollution**: Tests modified `global.IntersectionObserver` but didn't restore it
2. **matchMedia pollution**: Tests modified `window.matchMedia` but didn't restore it consistently
3. **Navigator properties pollution**: Tests modified `navigator.onLine` and `navigator.connection` without proper cleanup
4. **Window dimensions pollution**: Tests modified `window.innerWidth/innerHeight` without restoration
5. **Manual restoration**: Some tests had manual restoration code, but it was inconsistent and error-prone

## Solution Implemented

### 1. Global Restoration Setup

Added comprehensive global restoration logic at the test suite level:

```typescript
// Store original global implementations to restore after tests
const originalGlobals = {
  IntersectionObserver: global.IntersectionObserver,
  matchMedia: typeof window !== "undefined" ? window.matchMedia : undefined,
  addEventListener:
    typeof window !== "undefined" ? window.addEventListener : undefined,
  innerWidth: typeof window !== "undefined" ? window.innerWidth : undefined,
  innerHeight: typeof window !== "undefined" ? window.innerHeight : undefined,
  navigator: {
    onLine: typeof navigator !== "undefined" ? navigator.onLine : undefined,
    connection:
      typeof navigator !== "undefined"
        ? (navigator as any).connection
        : undefined,
  },
};
```

### 2. Comprehensive afterEach Hook

Implemented a robust `afterEach` hook that restores all modified globals:

```typescript
afterEach(() => {
  // Restore IntersectionObserver
  if (originalGlobals.IntersectionObserver !== undefined) {
    global.IntersectionObserver = originalGlobals.IntersectionObserver;
  } else if (global.IntersectionObserver) {
    delete (global as any).IntersectionObserver;
  }

  // Restore window.matchMedia
  if (typeof window !== "undefined") {
    if (originalGlobals.matchMedia !== undefined) {
      window.matchMedia = originalGlobals.matchMedia;
    } else if (window.matchMedia) {
      delete (window as any).matchMedia;
    }
  }

  // ... additional restoration logic for all globals
});
```

### 3. Removed Manual Restoration

Cleaned up manual restoration code in individual tests since it's now handled globally:

```typescript
// OLD - Manual restoration (error-prone)
const originalIntersectionObserver = global.IntersectionObserver;
// ... test code ...
global.IntersectionObserver = originalIntersectionObserver;

// NEW - Automatic restoration via afterEach
// ... test code only ...
// Note: Restoration handled by global afterEach
```

## Benefits

### ✅ Test Isolation

- Each test starts with a clean global environment
- No side effects between tests
- Predictable test behavior

### ✅ Maintainability

- Single source of truth for global restoration
- No need to remember manual cleanup in each test
- Consistent restoration logic across all tests

### ✅ Reliability

- Handles edge cases (undefined vs null vs missing properties)
- Proper restoration of Object.defineProperty changes
- Handles both setting and deleting properties

### ✅ Future-Proof

- Easy to add new globals to the restoration logic
- Scales with additional browser APIs
- Consistent pattern for all test modifications

## Verification

Created `test-isolation.test.tsx` to demonstrate the fix works correctly:

- ✅ Test 1-2: IntersectionObserver isolation
- ✅ Test 3-4: window.matchMedia isolation
- ✅ Test 5-6: navigator.connection isolation
- ✅ Test 7-8: window dimensions isolation
- ✅ Test 9-10: Global deletion/restoration isolation

All tests pass, confirming proper isolation between tests.

## Best Practices Applied

1. **Store originals before modification**: Capture original values before any test runs
2. **Comprehensive restoration**: Handle all possible states (undefined, null, missing)
3. **Use Object.defineProperty correctly**: Restore with proper descriptors for window properties
4. **Handle circular references**: Properly manage relationships between globals
5. **Consistent patterns**: Use the same restoration logic for all globals

## Usage

The fix is automatically applied to all tests in the suite. Individual tests can:

1. Modify globals as needed for testing
2. Not worry about cleanup - it's handled automatically
3. Expect a clean environment at the start of each test
4. Focus on test logic rather than infrastructure

This ensures robust, reliable, and maintainable SSR-safe hook testing.
