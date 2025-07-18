/**
 * Physics Bundle
 * Physics-based interactions and animations
 */

// Physics utilities
export * from '../lib/glass-physics';
export * from '../lib/glass-physics-lite';

// Physics-based components
export * from '../components/glass-slider';

// Physics hooks
export * from '../hooks/use-haptic-feedback';

// Tree-shaking marker
export const PHYSICS_BUNDLE_MARKER = 'liquidui-physics' as const;
