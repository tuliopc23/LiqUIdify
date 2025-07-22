import * as React from 'react';

/**
 * Core Patterns Module
 *
 * This module exports all the core design patterns used throughout the LiquidUI component library.
 * These patterns provide reusable solutions for common component composition and state management needs.
 */
export { createPolymorphicComponent, createGlassPolymorphicComponent, createPolymorphicSlots } from '../create-polymorphic-component';
export { CompoundComponent } from '../compound-component';

// Business logic patterns
export const createBusinessLogicHook = <T extends Record<string, any>>(
  initialState: T,
  actions: Record<string, (state: T, ...args: any[]) => T>
) => {
  return () => {
    // Placeholder implementation for business logic hook pattern
    const [state, setState] = React.useState<T>(initialState);

    const boundActions = Object.keys(actions).reduce((acc, key) => {
      acc[key] = (...args: any[]) => {
        setState(currentState => actions[key](currentState, ...args));
      };
      return acc;
    }, {} as Record<string, (...args: any[]) => void>);

    return {
      state,
      actions: boundActions,
      reset: () => setState(initialState),
    };
  };
};

// Compound component with context pattern
export const createCompoundComponentWithContext = <T extends Record<string, any>>(
  contextName: string,
  defaultValue: T
) => {
  const Context = React.createContext<T | undefined>(defaultValue);

  const Provider = ({ children, value }: { children: React.ReactNode; value: T }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  const useContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(`use${contextName} must be used within a ${contextName}Provider`);
    }
    return context;
  };

  return {
    Provider,
    useContext,
    Context,
  };
};

// Render prop pattern
export interface RenderPropPattern<T> {
  children: (props: T) => React.ReactNode;
}

export const createRenderPropComponent = <T extends Record<string, any>>(
  useLogic: () => T
) => {
  return ({ children }: RenderPropPattern<T>) => {
    const props = useLogic();
    return <>{children(props)}</>;
  };
};

// Higher-order component pattern
export const withGlassEffect = <P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>,
  glassConfig?: {
    variant?: 'light' | 'dark' | 'neutral';
    intensity?: 'weak' | 'medium' | 'strong';
    blur?: boolean;
  }
) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithGlassEffect = React.forwardRef<any, P>((props, ref) => {
    const glassClasses = React.useMemo(() => {
      const { variant = 'neutral', intensity = 'medium', blur = true } = glassConfig || {};
      return [
        'glass-effect',
        `glass-${variant}`,
        `glass-intensity-${intensity}`,
        blur && 'glass-blur',
      ].filter(Boolean).join(' ');
    }, []);

    return (
      <div className={glassClasses}>
        <WrappedComponent {...props} ref={ref} />
      </div>
    );
  });

  WithGlassEffect.displayName = `withGlassEffect(${displayName})`;
  return WithGlassEffect;
};

// Slot-based composition pattern
export interface SlotProps {
  slot?: string;
  children?: React.ReactNode;
}

export const createSlotComponent = (slots: Record<string, React.ComponentType<any>>) => {
  return ({ children }: { children: React.ReactNode }) => {
    const slotElements: Record<string, React.ReactNode[]> = {};

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.slot) {
        const slotName = child.props.slot;
        if (!slotElements[slotName]) {
          slotElements[slotName] = [];
        }
        slotElements[slotName].push(child);
      }
    });

    return (
      <>
        {Object.entries(slots).map(([slotName, SlotComponent]) => {
          const slotContent = slotElements[slotName];
          return slotContent ? (
            <SlotComponent key={slotName}>
              {slotContent}
            </SlotComponent>
          ) : null;
        })}
      </>
    );
  };
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
    actions: Object.keys(actionCreators).reduce((acc, type) => {
      acc[type] = (payload?: any): StateAction => ({ type, payload });
      return acc;
    }, {} as Record<string, (payload?: any) => StateAction>),
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

    return React.forwardRef<any, T>((props, ref) => {
      const mergedProps = { ...theme, ...props } as T;
      return React.createElement(baseComponent, { ...mergedProps, ref });
    });
  };
};


// Type exports
export type {
  RenderPropPattern,
  SlotProps,
  StateAction,
};
