/**
 * Core Bundle - Essential Components (<15KB)
 * Contains the most commonly used components with basic glass effects
 */

// Essential form components
export * from '../components/glass-button';
export * from '../components/glass-input';
export * from '../components/glass-card';

// Core accessibility components
export * from '../components/glass-focus-trap';
export * from '../components/glass-error-boundary';
export * from '../components/glass-visually-hidden';

// Essential providers
export * from '../providers/glass-ui-provider';
export * from '../providers/config-provider';

// Core utilities (tree-shakeable)
export { cn, glassVariants } from '../lib/glass-utils';
export { useContrastChecker } from '../utils/contrast-checker';

// Core types
export type {
    GlassButtonProps,
    GlassCardProps,
    GlassInputProps,
} from '../types';

// SSR-safe utilities
export {
    useIsClient,
    useSSRSafeWindow,
    useSSRSafeDocument,
    useSSRSafeNavigator,
    useSSRSafeLocalStorage,
    useSSRSafeSessionStorage,
    useHydrationSafe,
    useSSRSafeMediaQuery,
    useNetworkStatus,
    useSSRSafeAnimation
} from '../hooks/use-ssr-safe';