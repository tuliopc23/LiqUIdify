/**
 * Core Architecture Module
 *
 * This module provides the foundational architecture for the LiquidUI component library.
 * It includes shared utilities, hooks, types, and base components that ensure consistency
 * across all components while maintaining modularity and scalability.
 */

// Export base component types and interfaces (avoiding duplicates)
export type {
	AccessibilityProps,
	AnimationTiming,
	BaseGlassProps,
	ButtonProps,
	ComponentPropsBuilder,
	ComponentRef,
	CompoundComponentProps,
	CompoundGlassComponent,
	DivProps,
	FormGlassProps,
	GlassComponent,
	GlassEffectConfig,
	GlassEventHandler,
	HeadingProps,
	InputProps,
	InteractiveGlassProps,
	KeyHandler,
	LabelProps,
	LayoutGlassProps,
	OmitGlassProps,
	ParagraphProps,
	PartialGlassProps,
	PerformanceProps,
	PickGlassProps,
	PolymorphicProps,
	RequiredGlassProps,
	SelectProps,
	SpanProps,
	StyleConfig,
	TextareaProps,
	UnifiedGlassProps,
} from "./base-component";

// Export core types (primary source)
export type {
	A11yProps,
	AnimationPreset,
	ChangeHandler,
	ClickHandler,
	ComponentSize,
	ComponentState,
	ComponentVariant,
	ElementProps,
	ErrorInfo,
	FocusHandler,
	GlassConfig,
	GlassIntensity,
	GlassVariant,
	OmitProps,
	PerformanceMetrics,
	PropsWithChildren,
	ThemeConfig,
	TransitionDuration,
} from "./types";

import {
	useGlassStateTransitions,
	useMagneticHover,
	useRippleEffect,
} from "./hooks";
import {
	createBusinessLogicHook,
	createCompoundComponentWithContext,
} from "./patterns";
// Re-export commonly used utilities for convenience
import { cn } from "./utils/classname";
import {
	generateGlassClasses,
	generateGlassVariables,
	mapIntensity,
} from "./utils/glass-effects";
import {
	microInteraction,
	responsiveSize,
	touchTarget,
} from "./utils/responsive";

export * from "./components";
export * from "./hooks";
export * from "./patterns";
// Re-export all modules
export * from "./utils";

// Re-export specific named exports
export {
	cn,
	createBusinessLogicHook,
	createCompoundComponentWithContext,
	generateGlassClasses,
	generateGlassVariables,
	mapIntensity,
	microInteraction,
	responsiveSize,
	touchTarget,
	useGlassStateTransitions,
	useMagneticHover,
	useRippleEffect,
};
