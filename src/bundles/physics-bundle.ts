/**
 * Physics Bundle - Physics-based interactions and effects
 *
 * Contains all physics-related utilities and effects that can be
 * optionally imported for enhanced interactions.
 */

// Physics utilities
export { useMagneticHover, createGlassRipple } from '../lib/glass-physics';
export { useLiquidGlass } from '../hooks/use-liquid-glass';
export { useContentAwareGlass } from '../hooks/use-liquid-glass';

// Apple liquid glass effects
export {
  useAppleLiquidGlass,
  getAppleLiquidGlassClass,
  createGlassLayers,
} from '../lib/enhanced-apple-liquid-glass';

// Animation utilities
export { microInteraction } from '@/core/utils/classname';
