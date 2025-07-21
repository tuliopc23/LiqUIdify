/**
 * Glass UI - Simple Export Index
 * Essential exports for the build
 */

// Core utilities
export { cn } from '@/core/utils/classname';

// Basic components
export { GlassButton } from './components/glass-button-refactored';
export { GlassCard } from './components/glass-card-refactored';
export { GlassInput } from './components/glass-input';
export { GlassBadge } from './components/glass-badge';

// Design tokens
export { designTokens } from './tokens/design-tokens';

// Types
export type {
  GlassVariantProps,
  ButtonVariantProps,
  CardVariantProps,
  InputVariantProps,
} from './lib/variant-system';
