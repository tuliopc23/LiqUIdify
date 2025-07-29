/**
 * Animation Bundle - Advanced Animation Features (<10KB)
 * Physics-based animations, GSAP integration, and advanced visual effects
 * Lazy-loaded to avoid impacting core bundle size
 */

// Dynamic imports for heavy animation libraries
// GSAP removed from dependencies - using only Framer Motion
// export const loadGSAP = () => import('gsap').then(gsap => gsap.default || gsap);
import type * as FramerMotion from "framer-motion";
export const loadFramerMotion = (): Promise<typeof FramerMotion> =>
  import("framer-motion");

export * from "../components/apple-liquid-glass";
// Advanced visual components

// Removed deleted components
// export * from "../components/glass-feature-showcase";
// export * from "../components/glass-floating-action";
export * from "../components/glass-loading";
export * from "../components/glass-progress";
// Physics-based components
export * from "../components/glass-slider";
// Animation-heavy components
export * from "../components/glass-spinner";

// export * from "../components/liquid-glass-svg-filters";
export {
  type AnimationConfig as HookAnimationConfig,
  type AnimationState,
  GLASS_ANIMATION_PRESETS,
  TIMING_PRESETS,
  useGlassAnimation,
  useGlassStateTransitions,
  useLiquidFlow,
  useMagneticHover as useMagneticHoverHook,
  useRippleEffect,
  useSpringAnimation,
} from "../hooks/use-glass-animations";

export * from "../hooks/use-haptic-feedback";
// Animation hooks (tree-shakeable)

export * from "../hooks/use-liquid-glass";
// Animation utilities
export * from "../lib/framer-motion-constants";
export {
  type AnimationConfig as LibAnimationConfig,
  createChoreographer,
  createGestureAnimator,
  createGlassAnimation,
  GLASS_EASINGS,
  GlassAnimation,
  GlassChoreographer,
  GlassGestureAnimator,
  GlassUtils,
  type SpringPhysics,
  type Vector2D,
} from "../lib/glass-animations";
export * from "../lib/glass-physics";

// Tree-shaking markers
export const ANIMATION_BUNDLE_MARKER = "liquidui-animations" as const;
