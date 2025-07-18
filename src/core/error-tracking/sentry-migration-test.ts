/**
 * Sentry v9 Migration Test
 * 
 * This test file verifies that the Sentry migration is working correctly
 * by testing the new API methods and integrations.
 */

// Test the new Sentry v9 API
export const testSentryV9Migration = async () => {
  console.log('🔄 Testing Sentry v9 migration...');
  
  try {
    // Dynamic import to test the new API
    const Sentry = await import('@sentry/react');
    
    // Test 1: Check if browserTracingIntegration is available
    if (typeof Sentry.browserTracingIntegration !== 'function') {
      throw new Error('browserTracingIntegration is not available');
    }
    console.log('✅ browserTracingIntegration is available');
    
    // Test 2: Check if replayIntegration is available
    if (typeof Sentry.replayIntegration !== 'function') {
      throw new Error('replayIntegration is not available');
    }
    console.log('✅ replayIntegration is available');
    
    // Test 3: Check if withErrorBoundary is available
    if (typeof Sentry.withErrorBoundary !== 'function') {
      throw new Error('withErrorBoundary is not available');
    }
    console.log('✅ withErrorBoundary is available');
    
    // Test 4: Check if startSpan is available
    if (typeof Sentry.startSpan !== 'function') {
      throw new Error('startSpan is not available');
    }
    console.log('✅ startSpan is available');
    
    // Test 5: Test integration initialization
    const browserTracing = Sentry.browserTracingIntegration();
    const replay = Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
    });
    
    if (!browserTracing || !replay) {
      throw new Error('Failed to initialize integrations');
    }
    console.log('✅ Integrations initialized successfully');
    
    // Test 6: Test withErrorBoundary
    const TestComponent = () => null;
    const WrappedComponent = Sentry.withErrorBoundary(TestComponent, {
      fallback: ({ error }) => `Error: ${error.message}`,
    });
    
    if (!WrappedComponent) {
      throw new Error('withErrorBoundary failed to wrap component');
    }
    console.log('✅ withErrorBoundary working correctly');
    
    console.log('🎉 All Sentry v9 migration tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Sentry v9 migration test failed:', error);
    return false;
  }
};

// Test the LiqUIdify Sentry integration
export const testLiqUIdifySentryIntegration = async () => {
  console.log('🔄 Testing LiqUIdify Sentry integration...');
  
  try {
    const { initializeLiqUIdifySentry } = await import('./sentry-integration');
    
    // Test initialization
    const integration = initializeLiqUIdifySentry({
      dsn: 'https://test@sentry.io/123',
      environment: 'test',
      enablePerformanceMonitoring: true,
      enableSessionReplay: true,
      enableErrorBoundaries: true,
    });
    
    if (!integration) {
      throw new Error('Failed to initialize LiqUIdify Sentry integration');
    }
    console.log('✅ LiqUIdify Sentry integration initialized');
    
    // Test status method
    const status = integration.getStatus();
    if (!status || typeof status.initialized !== 'boolean') {
      throw new Error('Integration status method not working');
    }
    console.log('✅ Integration status method working');
    
    // Test error boundary creation
    const ErrorBoundary = integration.createErrorBoundary();
    if (!ErrorBoundary) {
      throw new Error('Failed to create error boundary');
    }
    console.log('✅ Error boundary created successfully');
    
    console.log('🎉 All LiqUIdify Sentry integration tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ LiqUIdify Sentry integration test failed:', error);
    return false;
  }
};

// Run all tests
export const runSentryMigrationTests = async () => {
  console.log('🚀 Starting Sentry v9 migration tests...\n');
  
  const test1 = await testSentryV9Migration();
  console.log('');
  
  const test2 = await testLiqUIdifySentryIntegration();
  console.log('');
  
  const allPassed = test1 && test2;
  
  if (allPassed) {
    console.log('🎉 All migration tests passed! Sentry v9 migration is complete.');
  } else {
    console.log('❌ Some tests failed. Please check the errors above.');
  }
  
  return allPassed;
};

// Export for use in other files
export default runSentryMigrationTests;
