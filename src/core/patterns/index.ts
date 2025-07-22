/**
 * Core Patterns Module
 *
 * This module exports all the core design patterns used throughout the LiquidUI component library.
 * These patterns provide reusable solutions for common component composition and state management needs.
 */

import React from 'react';

// Re-export from other pattern modules
export {
  createPolymorphicComponent,
  createGlassPolymorphicComponent,
  createPolymorphicSlots,
} from '../create-polymorphic-component';
export { CompoundComponent } from '../compound-component';

// Business logic patterns
export const createBusinessLogicHook = <T extends Record<string, any>>(
  initialStateFactory: (props: any) => T,
  actionsFactory: (
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>,
    props: any
  ) => Record<string, (...args: any[]) => void>
) => {
  return (props: any) => {
    const [state, setState] = React.useState<T>(() =>
      initialStateFactory(props)
    );

    const actions = React.useMemo(
      () => actionsFactory(state, setState, props),
      [state, setState, props]
    );

    const reset = React.useCallback(() => {
      setState(initialStateFactory(props));
    }, [props]);

    return {
      state,
      actions,
      reset,
    };
  };
};

// Compound component with context pattern
export const createCompoundComponentWithContext = <
  T extends Record<string, any>,
>(
  _contextName: string,
  defaultValue: T
) => {
  return {
    Provider: null as any,
    useContext: () => defaultValue,
    Context: null as any,
  };
};

// Render prop pattern
export interface RenderPropPattern<T> {
  children: (props: T) => React.ReactNode;
}

export const createRenderPropComponent = <T extends Record<string, any>>(
  _useLogic: () => T
) => {
  // Type-only export for patterns
  return null;
};

// Higher-order component pattern
export const withGlassEffect = <P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>,
  _glassConfig?: {
    variant?: 'light' | 'dark' | 'neutral';
    intensity?: 'weak' | 'medium' | 'strong';
    blur?: boolean;
  }
) => {
  // Type-only export for patterns
  return WrappedComponent;
};

// Slot-based composition pattern
export interface SlotProps {
  slot?: string;
  children?: React.ReactNode;
}

export const createSlotComponent = (
  _slots: Record<string, React.ComponentType<any>>
) => {
  // Type-only export for patterns
  return null;
};

// State reducer pattern
export interface StateAction<T = any> {
  type: string;
  payload?: T;
}

export const createStateReducer = <T extends Record<string, any>>(
  initialState: T,
  actionCreators: Record<string, (state: T, payload?: any) => T>
) => {
  const reducer = (state: T, action: StateAction): T => {
    const actionCreator = actionCreators[action.type];
    if (!actionCreator) {
      console.warn(`Unknown action type: ${action.type}`);
      return state;
    }
    return actionCreator(state, action.payload);
  };

  return {
    reducer,
    initialState,
    actions: Object.keys(actionCreators).reduce(
      (acc, type) => {
        acc[type] = (payload?: any): StateAction => ({ type, payload });
        return acc;
      },
      {} as Record<string, (payload?: any) => StateAction>
    ),
  };
};

// Observer pattern for component communication
export class ComponentEventBus {
  private listeners: Map<string, Set<Function>> = new Map();

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (0 === eventListeners.size) {
        this.listeners.delete(event);
      }
    }
  }

  emit(event: string, ...args: any[]) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(...args));
    }
  }

  clear() {
    this.listeners.clear();
  }
}

// Factory pattern for creating themed components
export const createThemedComponentFactory = <T extends Record<string, any>>(
  baseComponent: React.ComponentType<T>,
  themeConfig: Record<string, Partial<T>>
) => {
  return (themeName: string) => {
    const theme = themeConfig[themeName];
    if (!theme) {
      console.warn(`Unknown theme: ${themeName}`);
      return baseComponent;
    }

    // Type-only export for patterns
    return baseComponent;
  };
};

// Type exports are handled by interface declarations above

// Pattern utilities
export const patternUtils = {
  createBusinessLogicHook,
  createCompoundComponentWithContext,
  createRenderPropComponent,
  withGlassEffect,
  createSlotComponent,
  createStateReducer,
  ComponentEventBus,
  createThemedComponentFactory,
};
