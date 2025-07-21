/**
 * Animation Bundle - Advanced Animation Features (<10KB)
 * Physics-based animations, GSAP integration, and advanced visual effects
 * Lazy-loaded to avoid impacting core bundle size
 */

// Dynamic imports for heavy animation libraries
// GSAP removed from dependencies - using only Framer Motion
// export const loadGSAP = () => import('gsap').then(gsap => gsap.default || gsap);
import type * as FramerMotion from 'framer-motion';
export const loadFramerMotion = (): Promise<typeof FramerMotion> =>
  import('framer-motion');

// Animation hooks (tree-shakeable)
export * from '../hooks/use-liquid-glass';
export * from '../hooks/use-haptic-feedback';
export {
  useGlassAnimation,
  useMagneticHover as useMagneticHoverHook,
  useRippleEffect,
  useSpringAnimation,
  useGlassStateTransitions,
  useLiquidFlow,
  TIMING_PRESETS,
  GLASS_ANIMATION_PRESETS,
  type AnimationState,
  type AnimationConfig as HookAnimationConfig,
} from '../hooks/use-glass-animations';

// Animation utilities
export * from '../lib/framer-motion-constants';
export {
  type SpringPhysics,
  type Vector2D,
  type AnimationConfig as LibAnimationConfig,
  GLASS_EASINGS,
  GlassAnimation,
  GlassChoreographer,
  GlassGestureAnimator,
  createGlassAnimation,
  createChoreographer,
  createGestureAnimator,
  GlassUtils,
} from '../lib/glass-animations';
export * from '../lib/glass-physics';

// Advanced visual components
export * from '../components/glass-feature-showcase';
export * from '../components/glass-floating-action';
export * from '../components/liquid-glass-svg-filters';
export * from '../components/apple-liquid-glass';

// Animation-heavy components
export * from '../components/glass-spinner';
export * from '../components/glass-loading';
export * from '../components/glass-progress';

// Physics-based components
export * from '../components/glass-slider';

// Tree-shaking markers
export const ANIMATION_BUNDLE_MARKER = 'liquidui-animations' as const;
