/**
 * Animations Bundle - Animation utilities and components
 * Target size: <10KB gzipped
 * 
 * Includes animation hooks, utilities, and animated components
 * Loaded on-demand when animations are needed
 */

// Animation hooks
export { useGlassAnimation } from '../hooks/use-glass-animations';
export { useHapticFeedback } from '../hooks/use-haptic-feedback';

// Animation utilities
export {
  GlassAnimation,
  createGlassAnimation,
  type AnimationConfig,
} from '../lib/glass-animations';

// Framer Motion constants (lightweight)
// Note: These need to be created or imported from actual source

// Animated components
export { GlassLoading } from '../components/glass-loading';
export { GlassProgress } from '../components/glass-progress';
export { GlassSpinner } from '../components/glass-spinner';
export { GlassSkeleton } from '../components/glass-skeleton';

// Types
export type { GlassLoadingProps } from '../components/glass-loading';
export type { GlassProgressProps } from '../components/glass-progress';

// Animation presets
export const ANIMATION_PRESETS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  glassReveal: {
    initial: { 
      opacity: 0, 
      backdropFilter: 'blur(0px)',
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    animate: { 
      opacity: 1, 
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
} as const;

// Lightweight animation CSS
export const ANIMATION_STYLES = `
  @keyframes glass-shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes glass-pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.6; }
  }
  
  .glass-animate {
    transition: all 0.3s ease;
  }
  
  .glass-animate-shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: glass-shimmer 2s infinite;
  }
`;