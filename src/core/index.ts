/**
 * Core Architecture Module
 *
 * This module provides the foundational architecture for the LiquidUI component library.
 * It includes shared utilities, hooks, types, and base components that ensure consistency
 * across all components while maintaining modularity and scalability.
 */

// Export base component types and interfaces (avoiding duplicates)
export type {
  BaseGlassProps,
  InteractiveGlassProps,
  CompoundComponentProps,
  LayoutGlassProps,
  FormGlassProps,
  ComponentRef,
  ButtonProps,
  DivProps,
  InputProps,
  TextareaProps,
  SelectProps,
  LabelProps,
  SpanProps,
  HeadingProps,
  ParagraphProps,
  PolymorphicProps,
  GlassComponent,
  CompoundGlassComponent,
  GlassEventHandler,
  KeyHandler,
  AccessibilityProps,
  StyleConfig,
  PerformanceProps,
  UnifiedGlassProps,
  OmitGlassProps,
  PickGlassProps,
  RequiredGlassProps,
  PartialGlassProps,
  ComponentPropsBuilder,
  GlassEffectConfig,
  AnimationTiming,
} from './base-component';

// Export core types (primary source)
export type {
  ComponentSize,
  ComponentVariant,
  GlassIntensity,
  GlassVariant,
  AnimationPreset,
  TransitionDuration,
  A11yProps,
  GlassConfig,
  ComponentState,
  ThemeConfig,
  ClickHandler,
  ChangeHandler,
  FocusHandler,
  OmitProps,
  PropsWithChildren,
  ElementProps,
  ErrorInfo,
  PerformanceMetrics,
} from './types';

// Export all utilities
import * as Utils from './utils';
import * as Hooks from './hooks';
import * as Components from './components';
import * as Constants from './constants';
import * as Patterns from './patterns';

// Re-export commonly used utilities for convenience
import { cn } from './utils/classname';
import { 
  generateGlassClasses,
  generateGlassVariables,
  mapIntensity,
} from './utils/glass-effects';
import {
  responsiveSize,
  touchTarget,
  microInteraction,
} from './utils/responsive';
import {
  useGlassStateTransitions,
  useMagneticHover,
  useRippleEffect,
} from './hooks';
import {
  createBusinessLogicHook,
  createCompoundComponentWithContext,
} from './patterns';

export {
  ...Utils,
  ...Hooks,
  ...Components,
  ...Constants,
  ...Patterns,
  cn,
  generateGl...
