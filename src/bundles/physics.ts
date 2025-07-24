/**
 * Physics Bundle
 * Physics-based interactions and animations
 */

// Physics-based components
export * from '../components/glass-slider';
// Physics hooks
export * from '../hooks/use-haptic-feedback';
// Physics utilities
export * from '../lib/glass-physics';

// Tree-shaking marker
export const PHYSICS_BUNDLE_MARKER = 'liquidui-physics' as const;
