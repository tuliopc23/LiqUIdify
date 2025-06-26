// LiquidiUI - Modern Liquid Glass Design System
// Main export file for all LiquidiUI components and utilities

// Components
export * from './components/glass-avatar'
export * from './components/glass-badge'
export * from './components/glass-button'
export * from './components/glass-card'
export * from './components/glass-chart'
export * from './components/glass-checkbox'
export * from './components/glass-command'
export * from './components/glass-dropdown'
export * from './components/glass-input'
export * from './components/glass-loading'
export * from './components/glass-mobile-nav'
export * from './components/glass-modal'
export * from './components/glass-notification'
export * from './components/glass-popover'
export * from './components/glass-progress'
export * from './components/glass-responsive-button'
export * from './components/glass-responsive-card'
export * from './components/glass-search'
export * from './components/glass-select'
export * from './components/glass-slider'
export * from './components/glass-switch'
export * from './components/glass-table'
export * from './components/glass-tabs'
export * from './components/glass-textarea'
export * from './components/glass-toast'
export * from './components/glass-tooltip'
export * from './components/navbar'
export * from './components/sidebar'
export * from './components/theme-toggle'
export * from './components/component-showcase'
export * from './components/animation-showcase'
export * from './components/responsive-showcase'

// Hooks
export * from './hooks/use-liquid-glass'
export * from './hooks/use-mobile'
export * from './hooks/use-performance-monitor'
export { useToast, toast } from './hooks/use-toast'

// Utilities and Libraries
export * from './lib/glass-physics'
export * from './lib/glass-utils'
export * from './lib/liquid-glass-tokens'

// Systems
export * from './lib/component-standards'
export * from './lib/accessibility-utils'
export { 
  ThemeProvider, 
  useTheme, 
  useDesignTokens, 
  useCustomTheme, 
  useResponsiveTheme,
  lightTheme,
  darkTheme,
  defaultDesignTokens,
  getCSSVariable,
  setCSSVariable,
  createThemeAwareClasses
} from './lib/theming-system'
export { 
  springPresets,
  microInteractionPresets,
  useSpring,
  useMicroInteraction,
  useGlassMorph,
  useFloatingAnimation,
  useStaggeredAnimation,
  animationScheduler
} from './lib/animation-system'
export * from './lib/responsive-system'

// Testing utilities
export * from './utils/accessibility-testing'

// Create export aliases with "liquid" naming for public-facing APIs
export {
  // Physics exports with liquid naming
  Vector2D as LiquidVector2D,
  SpringPhysics as LiquidSpringPhysics,
  Spring2D as LiquidSpring2D,
  useMagneticHover as useLiquidMagneticHover,
  useRepulsionEffect as useLiquidRepulsionEffect,
  createFluidMorph as createLiquidMorph,
  createGlassRipple as createLiquidRipple,
  FluidSimulation as LiquidFluidSimulation,
  ParticleEmitter as LiquidParticleEmitter,
  PhysicsWorld as LiquidPhysicsWorld,
  physicsWorld as liquidPhysicsWorld
} from './lib/glass-physics'

// Re-export main physics constants with liquid prefix
export {
  PHYSICS_CONSTANTS as LIQUID_PHYSICS_CONSTANTS,
  SPRING_PRESETS as LIQUID_SPRING_PRESETS
} from './lib/glass-physics'

// Types will be exported here when they are available
