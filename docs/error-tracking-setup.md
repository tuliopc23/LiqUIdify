# Error Tracking Setup Guide

This guide explains how to set up production error tracking for LiqUIdify using Sentry.

## 1. Install Sentry Dependencies

```bash
npm install --save @sentry/react @sentry/tracing
```

## 2. Create Sentry Account and Project

1. Sign up at [sentry.io](https://sentry.io)
2. Create a new project and select "React" as the platform
3. Copy your DSN from the project settings

## 3. Configure Error Tracking

Add to your application root (e.g., `App.tsx` or `index.tsx`):

```tsx
import { ErrorTrackingProvider } from 'liquidify/core/error-tracking';

const errorTrackingConfig = {
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
  sampleRate: 1.0, // Capture 100% of errors
  tracesSampleRate: 0.1, // Capture 10% of performance data
};

function App() {
  return (
    <ErrorTrackingProvider config={errorTrackingConfig}>
      {/* Your app components */}
    </ErrorTrackingProvider>
  );
}
```

## 4. Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_SENTRY_DSN=your-sentry-dsn-here
```

## 5. Using Error Boundaries

Wrap components with enhanced error boundaries:

```tsx
import { GlassErrorBoundary } from 'liquidify';

function MyPage() {
  return (
    <GlassErrorBoundary 
      level="page"
      componentName="MyPage"
      trackErrors={true}
    >
      {/* Page content */}
    </GlassErrorBoundary>
  );
}
```

## 6. Manual Error Tracking

Use the error tracking hook for custom error handling:

```tsx
import { useErrorTracking } from 'liquidify/core/error-tracking';

function MyComponent() {
  const { trackError, trackEvent } = useErrorTracking();

  const handleAction = async () => {
    try {
      await riskyOperation();
      trackEvent('successful_operation', { component: 'MyComponent' });
    } catch (error) {
      trackError(error as Error, {
        component: 'MyComponent',
        action: 'riskyOperation',
        extra: { /* additional context */ }
      });
    }
  };
}
```

## 7. Production Build Configuration

The error tracking system is automatically tree-shaken in development builds and only loads Sentry in production when configured.

### Build-time Configuration

Add to your build script:

```json
{
  "scripts": {
    "build:prod": "REACT_APP_SENTRY_DSN=$SENTRY_DSN npm run build"
  }
}
```

## 8. Error Analytics Dashboard

Access your error analytics at:
- Sentry Dashboard: https://sentry.io/organizations/[your-org]/issues/
- Performance Monitoring: https://sentry.io/organizations/[your-org]/performance/

## 9. Best Practices

1. **Sanitize Sensitive Data**: The error tracking system automatically redacts email addresses and cookies
2. **Use Context**: Add user and component context for better debugging
3. **Environment Separation**: Use different Sentry projects for staging/production
4. **Alert Configuration**: Set up alerts in Sentry for critical errors
5. **Regular Review**: Review error trends weekly to identify patterns

## 10. Testing Error Tracking

Test your setup in development:

```tsx
function ErrorTestButton() {
  const throwError = () => {
    throw new Error('Test error for Sentry integration');
  };

  return (
    <button onClick={throwError}>
      Test Error Tracking
    </button>
  );
}
```

## Security Considerations

- Never commit your Sentry DSN to version control
- Use environment variables for all sensitive configuration
- Configure Sentry's data scrubbing to remove PII
- Set up appropriate data retention policies in Sentry

## Troubleshooting

If errors aren't appearing in Sentry:
1. Check that `enabled: true` in your config
2. Verify the DSN is correct
3. Check browser console for Sentry initialization errors
4. Ensure you're testing in production mode
5. Check Sentry's rate limits and quotas