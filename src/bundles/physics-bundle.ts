/**
 * Physics Bundle - Physics-based interactions and effects
 *
 * Contains all physics-related utilities and effects that can be
 * optionally imported for enhanced interactions.
 */

export {
	useContentAwareGlass,
	useLiquidGlass,
} from "../hooks/use-liquid-glass";
// Physics utilities
export { createGlassRipple, useMagneticHover } from "../lib/glass-physics";

// Apple liquid glass effects
// TODO: Implement these exports once the lib file is created
// export {
//   useAppleLiquidGlass,
//   getAppleLiquidGlassClass,
//   createGlassLayers,
// } from '../lib/enhanced-apple-liquid-glass';

// Animation utilities
export { microInteraction } from "../core/utils/classname";
