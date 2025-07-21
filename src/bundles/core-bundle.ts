/**
 * Core Bundle - Essential components only
 * Target size: <15KB gzipped
 *
 * Includes only the most fundamental components and utilities
 * that are required for basic Glass UI functionality
 */

// Essential base components (smallest footprint)
export { GlassButton } from '../components/glass-button-refactored';
export { GlassCard } from '../components/glass-card-refactored';
export { GlassInput } from '../components/glass-input';

// Core providers
export { ThemeProvider } from '../components/theme-provider';
export { GlassErrorBoundary } from '../components/glass-error-boundary';

// Essential hooks
export { useTheme } from '../hooks/use-theme';
export { useIsClient, useSSRSafeWindow } from '../hooks/use-ssr-safe';

// Core utilities (minimal)
export { cn } from '@/core/utils/classname';

// Base component system
// Note: These are exported from core/index.ts

// Essential types
// Note: These need to be defined in types.ts

// Re-export specific button and card types
export type { GlassButtonProps } from '../components/glass-button-refactored';
export type { GlassCardProps } from '../components/glass-card-refactored';
export type { GlassInputProps } from '../components/glass-input';

// Minimal CSS-in-JS for critical styles
export const CORE_STYLES = `
  .glass-ui-core {
    --glass-blur: 12px;
    --glass-opacity: 0.8;
    --glass-border: rgba(255, 255, 255, 0.2);
  }
  
  @supports (backdrop-filter: blur(1px)) {
    .glass-effect {
      backdrop-filter: blur(var(--glass-blur));
      -webkit-backdrop-filter: blur(var(--glass-blur));
    }
  }
`;
