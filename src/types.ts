// Re-export component props for type safety

export type { GlassButtonProps } from "./components/glass-button-refactored/glass-button";

export type { GlassCardProps } from "./components/glass-card-refactored/glass-card";

export type { GlassInputProps } from "./components/glass-input/glass-input";

export type { GlassTabsProps } from "./components/glass-tabs/glass-tabs";

export type { GlassTooltipProps } from "./components/glass-tooltip/glass-tooltip";
// Re-export core types
export type {
	AnimationTiming,
	BaseGlassProps,
	ComponentVariant,
	FormGlassProps,
	GlassEffectConfig,
	GlassIntensity,
	InteractiveGlassProps,
	LayoutGlassProps,
	UnifiedGlassProps,
} from "./core/base-component";
// Re-export utility types
export type { AccessibilityTestResult } from "./testing/accessibility-testing";
// Re-export branded types
export type {
	AccessibleContrast,
	AnimationDuration,
	ComponentSize,
	GlassBlur,
	GlassColor,
	GlassOpacity,
	ThemeName,
} from "./types/branded";

// Re-export polymorphic types
export type {
	CompletePolymorphicProps,
	PolymorphicComponent,
	PolymorphicComponentProps,
	PolymorphicComponentPropsWithRef,
} from "./types/polymorphic";
