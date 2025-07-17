/**
 * Animation Bundle - Advanced Animation Features (<10KB)
 * Physics-based animations, GSAP integration, and advanced visual effects
 * Lazy-loaded to avoid impacting core bundle size
 */

// Dynamic imports for heavy animation libraries
export const loadGSAP = () => import('gsap').then(gsap => gsap.default || gsap);
export const loadFramerMotion = () => import('framer-motion');

// Animation hooks (tree-shakeable)
export * from '../hooks/use-liquid-glass';
export * from '../hooks/use-haptic-feedback';
export * from '../hooks/use-glass-animations';

// Animation utilities
export * from '../lib/framer-motion-constants';
export * from '../lib/glass-animations';
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
