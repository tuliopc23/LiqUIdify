# Sentry v9 Migration Guide

This guide covers the migration from Sentry v7/v8 to v9.40.0 for LiqUIdify users.

## What Changed

### 1. Removed Dependencies

- **`@sentry/tracing`** - No longer needed, functionality moved to `@sentry/react`
- **`@sentry/replay`** - Replay functionality is now included in the main SDK

### 2. Updated Integrations

The following integrations have been updated to use the new functional API:

- `new Sentry.BrowserTracing()` → `Sentry.browserTracingIntegration()`
- `new Sentry.Replay()` → `Sentry.replayIntegration()`

### 3. Enhanced Error Boundaries

Error boundaries now use the new `withErrorBoundary` API with more flexible configuration options.

## Breaking Changes

### Import Changes

**Before (v7/v8):**
```typescript
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
```

**After (v9):**
```typescript
import * as Sentry from '@sentry/react';
// No additional imports needed
```

### Initialization Changes

**Before (v7/v8):**
```typescript
Sentry.init({
  dsn: 'your-dsn',
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      maskAllInputs: true,
    }),
  ],
  tracesSampleRate: 1.0,
});
```

**After (v9):**
```typescript
Sentry.init({
  dsn: 'your-dsn',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Error Boundary Changes

**Before (v7/v8):**
```typescript
<Sentry.ErrorBoundary fallback={ErrorFallback}>
  <App />
</Sentry.ErrorBoundary>
```

**After (v9):**
```typescript
const AppWithBoundary = Sentry.withErrorBoundary(App, {
  fallback: ({ error, resetError }) => (
    <ErrorFallback error={error} resetError={resetError} />
  ),
  beforeCapture: (scope) => {
    scope.setTag('location', 'app');
  },
});
```

## LiqUIdify Integration Updates

### Updated Configuration

The LiqUIdify Sentry integration has been updated to use the new v9 API:

```typescript
import { initializeLiqUIdifySentry } from '@liquidify/core/error-tracking';

const sentry = initializeLiqUIdifySentry({
  dsn: 'your-dsn',
  environment: 'production',
  enablePerformanceMonitoring: true,
  enableSessionReplay: true,
  enableErrorBoundaries: true,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### New Features

1. **Enhanced Privacy Controls**: Better masking and blocking of sensitive data
2. **Improved Performance Monitoring**: More accurate Core Web Vitals tracking
3. **Better Error Boundaries**: More flexible fallback components with reset functionality
4. **Simplified Integration**: Fewer dependencies and imports needed

## Migration Steps

1. **Update package.json**:
   ```json
   {
     "dependencies": {
       "@sentry/react": "^9.40.0"
     }
   }
   ```

2. **Remove old dependencies**:
   ```bash
   npm uninstall @sentry/tracing @sentry/replay
   ```

3. **Update your Sentry initialization code** using the examples above

4. **Update error boundaries** to use the new `withErrorBoundary` API

5. **Test your integration** using the provided test script:
   ```typescript
   import { runSentryMigrationTests } from '@liquidify/core/error-tracking/sentry-migration-test';
   runSentryMigrationTests();
   ```

## Performance Improvements

The v9 migration brings several performance improvements:

- **Smaller bundle size**: Removed unnecessary dependencies
- **Better tree-shaking**: More modular integration system
- **Improved initialization**: Faster startup times
- **Enhanced replay**: More efficient session recording

## Troubleshooting

### Common Issues

1. **Module not found errors**: Make sure you've removed the old `@sentry/tracing` import
2. **Integration errors**: Update integration names to the new functional API
3. **Type errors**: Update your TypeScript definitions to match the new API

### Testing

Use the provided test script to verify your migration:

```typescript
import { runSentryMigrationTests } from '@liquidify/core/error-tracking/sentry-migration-test';

// Run in development
if (process.env.NODE_ENV === 'development') {
  runSentryMigrationTests();
}
```

## Support

If you encounter any issues during migration, please:

1. Check the [Sentry v9 migration guide](https://docs.sentry.io/platforms/javascript/migration/)
2. Review the test script output for specific errors
3. Open an issue on the LiqUIdify repository

## Additional Resources

- [Sentry v9 Documentation](https://docs.sentry.io/platforms/javascript/guides/react/)
- [LiqUIdify Error Tracking Documentation](./error-tracking-setup.md)
- [Performance Monitoring Guide](./performance-monitoring.md)
