/**
 * Stub functions for missing core functionality
 * These are temporary stubs to fix TypeScript compilation errors
 */

import {
  ComponentVariant,
  GlassIntensity,
  GlassEffectConfig,
} from './base-component';

// Stub for ComponentPropsBuilder
export type ComponentPropsBuilder<T extends HTMLElement> =
  React.ComponentPropsWithoutRef<
    T extends HTMLButtonElement ? 'button' : 'div'
  >;

// Stub for createBusinessLogicHook
export function createBusinessLogicHook<TState, TProps, TActions>(
  initialState: (props: TProps) => TState,
  actions: (
    state: TState,
    setState: React.Dispatch<React.SetStateAction<TState>>,
    props: TProps
  ) => TActions
) {
  return (props: TProps) => {
    const [state, setState] = React.useState(() => initialState(props));
    const hookActions = actions(state, setState, props);
    return { state, actions: hookActions };
  };
}

// Stub for cn (classnames utility)
export function cn(
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  return classes
    .filter(Boolean)
    .map(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ');
}

// Stub for generateGlassClasses
export function generateGlassClasses(
  variant: ComponentVariant,
  intensity?: GlassIntensity,
  currentState?: string,
  _glassEffect?: GlassEffectConfig
): string {
  return `glass-${variant} glass-${intensity || 'medium'} glass-state-${currentState || 'idle'}`;
}

// Stub for generateGlassVariables
export function generateGlassVariables(
  intensity?: GlassIntensity,
  config?: any
): Record<string, string | number> {
  return {
    '--glass-intensity': intensity || 'medium',
    '--glass-blur': config?.blur ? '16px' : '0px',
    '--glass-opacity': 0.8,
  };
}

// Stub for responsiveSize
export const responsiveSize = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

// Stub for touchTarget
export const touchTarget = {
  comfortable: 'min-h-[44px] min-w-[44px]',
  compact: 'min-h-[32px] min-w-[32px]',
  large: 'min-h-[56px] min-w-[56px]',
};

// Stub for microInteraction
export const microInteraction = (
  _type?: 'hover' | 'focus' | 'active' | 'press',
  _intensity?: 'subtle' | 'medium' | 'strong'
): string => {
  return 'transition-all duration-200 ease-out';
};

// Add smooth property to microInteraction
(microInteraction as any).smooth = 'transition-all duration-200 ease-out';

import React from 'react';
