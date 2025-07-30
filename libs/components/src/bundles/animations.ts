/**
 * Animation Bundle - Advanced Animation Features (<10KB)
 * Physics-based animations, GSAP integration, and advanced visual effects
 * Lazy-loaded to avoid impacting core bundle size
 */

// Dynamic imports for heavy animation libraries
// GSAP removed from dependencies - using only Framer Motion
// export const loadGSAP = () => import('gsap').then(gsap => gsap.default || gsap);
import type * as FramerMotion from "framer-motion";

const _loadFramerMotion = (): Promise<typeof FramerMotion> =>
  import("framer-motion");

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
export * from "../hooks/use-haptic-feedback";
// Animation hooks (tree-shakeable)

export * from "../hooks/use-liquid-glass";
// Animation utilities
export * from "../lib/framer-motion-constants";
export * from "../lib/glass-physics";
