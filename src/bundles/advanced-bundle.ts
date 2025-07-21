/**
 * Advanced Bundle - Complex components and features
 * Target size: <8KB gzipped
 *
 * Includes advanced components, physics, and premium features
 * Loaded on-demand for enhanced functionality
 */

// Advanced components
export { GlassModal } from "../components/glass-modal";
export { CommandPalette as GlassCommand } from "../components/glass-command";
export { LineChart as GlassChart } from "../components/glass-chart";
export { GlassCombobox } from "../components/glass-combobox";
export { GlassDatePicker } from "../components/glass-date-picker";

// Physics system (lightweight version)
// TODO: Implement physics lite system

// Apple Liquid Glass components
export {
  AppleLiquidGlass,
  AppleLiquidGlassCard,
  AppleLiquidGlassButton,
  AppleLiquidGlassNav,
  type AppleLiquidGlassComponentProps,
  type AppleLiquidGlassNavProps,
  type AppleLiquidGlassCardProps,
  type AppleLiquidGlassButtonProps,
} from "../components/apple-liquid-glass";

// Advanced utilities
export {
  createCompoundComponent,
  createPolymorphicCompoundComponent,
} from "../core/compound-component";

// Performance monitoring
export { usePerformanceMonitoring } from "../hooks/use-performance-monitoring";

// Types
export type { CommandItem } from "../components/glass-command";
export type { ChartDataPoint } from "../components/glass-chart";

// Advanced features configuration
export const ADVANCED_CONFIG = {
  physics: {
    enabled: true,
    gravity: 0.5,
    friction: 0.98,
    tension: 170,
    mass: 1,
  },
  animations: {
    useSprings: true,
    useGestures: true,
    use3DTransforms: true,
  },
  performance: {
    useWebWorkers: false,
    useRequestIdleCallback: true,
    chunkSize: 10,
  },
} as const;
