import * as React from 'react';

export { CompoundComponent } from '../compound-component';
/**
 * Core Patterns Module
 *
 * This module exports all the core design patterns used throughout the LiquidUI component library.
 * These patterns provide reusable solutions for common component composition and state management needs.
 */
export {
  createGlassPolymorphicComponent,
  createPolymorphicComponent,
  createPolymorphicSlots,
} from '../create-polymorphic-component';

// Business logic patterns
export const createBusinessLogicHook = <T extends Record<string, unknown>>(
  initialState: T,
  actions: Record<string, (state: T, ...arguments_: Array<any>) => T>
) => {
  return () => {
    // Placeholder implementation for business logic hook pattern
    const [state, setState] = React.useState<T>(initialState);

    const boundActions = Object.keys(actions).reduce(
      (accumulator, key) => {
        accumulator[key] = (...arguments_: Array<any>) => {
          setState((currentState) => actions[key](currentState, ...arguments_));
        };
        return accumulator;
      },
      {} as Record<string, (...arguments_: Array<any>) => void>
    );

    return {
      state,
      actions: boundActions,
      reset: () => setState(initialState),
    };
  };
};

// Compound component with context pattern
export const createCompoundComponentWithContext = <
  T extends Record<string, unknown>,
>(
  contextName: string,
  defaultValue: T
) => {
  const Context = React.createContext<T | undefined>(defaultValue);

  const Provider = ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: T;
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  const useContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(
        `use${contextName} must be used within a ${contextName}Provider`
      );
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
export interface RenderPropertyPattern<T> {
  children: (props: T) => React.ReactNode;
}

export const createRenderPropComponent = <T extends Record<string, unknown>>(
  useLogic: () => T
) => {
  return ({ children }: RenderPropertyPattern<T>) => {
    const props = useLogic();
    return <>{children(props)}</>;
  };
};

// Higher-order component pattern
export const withGlassEffect = <P extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<P>,
  glassConfig?: {
    variant?: 'light' | 'dark' | 'neutral';
    intensity?: 'weak' | 'medium' | 'strong';
    blur?: boolean;
  }
) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const WithGlassEffect = React.forwardRef<any, P>((props, ref) => {
    const glassClasses = React.useMemo(() => {
      const {
        variant = 'neutral',
        intensity = 'medium',
        blur = true,
      } = glassConfig || {};
      return [
        'glass-effect',
        `glass-${variant}`,
        `glass-intensity-${intensity}`,
        blur && 'glass-blur',
      ]
        .filter(Boolean)
        .join(' ');
    }, [glassConfig]);

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

export const createSlotComponent = (
  slots: Record<string, React.ComponentType<any>>
) => {
  return ({ children }: { children: React.ReactNode }) => {
    const slotElements: Record<string, React.Array<React.ReactNode>> = {};

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
            <SlotComponent key={slotName}>{slotContent}</SlotComponent>
          ) : undefined;
        })}
      </>
    );
  };
};

// State reducer pattern
export interface StateAction<T = unknown> {
  type: string;
  payload?: T;
}

export const createStateReducer = <T extends Record<string, unknown>>(
  initialState: T,
  actionCreators: Record<string, (state: T, payload?: unknown) => T>
) => {
  const reducer = (state: T, action: StateAction): T => {
    const actionCreator = actionCreators[action.type];
    if (!actionCreator) {
      // Logging disabled
      return state;
    }
    return actionCreator(state, action.payload);
  };

  return {
    reducer,
    initialState,
    actions: Object.keys(actionCreators).reduce(
      (accumulator, type) => {
        accumulator[type] = (payload?: unknown): StateAction => ({
          type,
          payload,
        });
        return accumulator;
      },
      {} as Record<string, (payload?: unknown) => StateAction>
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
    this.listeners.get(event)?.add(callback);

    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  emit(event: string, ...arguments_: Array<any>) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      for (const callback of eventListeners) {
        callback(...arguments_);
      }
    }
  }

  clear() {
    this.listeners.clear();
  }
}

// Factory pattern for creating themed components
export const createThemedComponentFactory = <T extends Record<string, unknown>>(
  baseComponent: React.ComponentType<T>,
  themeConfig: Record<string, Partial<T>>
) => {
  return (themeName: string) => {
    const theme = themeConfig[themeName];
    if (!theme) {
      // Logging disabled
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
  RenderPropertyPattern as RenderPropPattern,
  SlotProps,
  StateAction,
};
