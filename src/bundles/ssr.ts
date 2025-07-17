/**
 * SSR Bundle
 * Server-side rendering utilities and components
 */

// Core SSR utilities
export { isBrowser, safeWindow, safeDocument, safeNavigator } from '../utils/ssr-utils';

// Enhanced SSR utilities
export { HydrationManager, useHydrationSafety, useProgressiveEnhancement, withHydrationSafety } from '../utils/hydration-utils';
export { EnhancedSSRProvider, useSSRState, useEnhancement, withEnhancedSSR, useHydrationSafeState } from '../providers/enhanced-ssr-provider';
export { HydrationDetector, HydrationBoundary, HydrationSafe, HydrationMetrics, HydrationRecovery } from '../components/hydration-detector';

// SSR-safe hooks
export { useWindowSize, useIntersectionObserver, useOnlineStatus, useGeolocation, useClipboard, useTheme, useScrollPosition, useResizeObserver, useAnimationFrame, useIdleCallback, useNetworkStatus, usePageVisibility, usePerformanceMetrics } from '../hooks/use-ssr-safe-hooks';

// Legacy exports (for backward compatibility)
export { SSRConfigProvider } from '../providers/ssr-config-provider';

// Tree-shaking marker
export const SSR_BUNDLE_MARKER = 'liquidui-ssr' as const;