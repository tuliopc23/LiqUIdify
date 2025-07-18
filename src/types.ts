// Re-export component props for type safety
export type { GlassButtonProps } from './components/glass-button/glass-button';
export type { GlassCardProps } from './components/glass-card/glass-card';
export type { GlassInputProps } from './components/glass-input/glass-input';
export type { GlassTabsProps } from './components/glass-tabs/glass-tabs';
export type { GlassTooltipProps } from './components/glass-tooltip/glass-tooltip';

// Re-export utility types
export type {
  AccessibilityTestResult,
} from './testing/accessibility-testing';

// Re-export branded types
export type {
  GlassColor,
  AccessibleContrast,
  GlassOpacity,
  GlassBlur,
  AnimationDuration,
  ComponentSize,
  ThemeName,
} from './types/branded';

// Re-export core types
export type {
  UnifiedGlassProps,
  BaseGlassProps,
  InteractiveGlassProps,
  FormGlassProps,
  LayoutGlassProps,
  ComponentVariant,
  GlassIntensity,
  AnimationTiming,
  GlassEffectConfig,
} from './core/base-component';

// Re-export polymorphic types
export type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicComponent,
  CompletePolymorphicProps,
} from './types/polymorphic';
