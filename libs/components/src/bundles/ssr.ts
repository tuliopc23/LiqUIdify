/**
 * SSR Bundle
 * Server-side rendering utilities and components
 */

export {
  HydrationBoundary,
  HydrationDetector,
  HydrationMetrics,
  HydrationRecovery,
  HydrationSafe,
} from "../components/hydration-detector";
// SSR-safe hooks
export {
  useHydrationSafe,
  useIsClient,
  useNetworkStatus,
  useSSRSafeAnimation,
  useSSRSafeDocument,
  useSSRSafeDocumentVisibility,
  useSSRSafeFeatureDetection,
  useSSRSafeIntersectionObserver,
  useSSRSafeLocalStorage,
  useSSRSafeMediaQuery,
  useSSRSafeNavigator,
  useSSRSafeResizeObserver,
  useSSRSafeSessionStorage,
  useSSRSafeWindow,
} from "../hooks/use-ssr-safe";
export {
  EnhancedSSRProvider,
  useEnhancement,
  useHydrationSafeState,
  useSSRState,
  withEnhancedSSR,
} from "../providers/enhanced-ssr-provider";
// Legacy exports (for backward compatibility)

export { SSRConfigProvider } from "../providers/ssr-config-provider";
// Enhanced SSR utilities
export {
  HydrationManager,
  useHydrationSafety,
  useProgressiveEnhancement,
  withHydrationSafety,
} from "../utils/hydration-utils";
// Core SSR utilities
export {
  isBrowser,
  safeDocument,
  safeNavigator,
  safeWindow,
} from "../utils/ssr-utils";

// Tree-shaking marker
export const SSR_BUNDLE_MARKER = "liquidui-ssr" as const;
