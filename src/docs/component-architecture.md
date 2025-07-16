# Glass UI Component Architecture Refactoring

This document outlines the refactored component architecture for Glass UI, implementing consistent component structures using compound components pattern, unified base component systems, and centralized glass effects.

## Architecture Overview

The refactored architecture consists of the following core systems:

### 1. Base Component System (`src/core/base-component.ts`)

Provides unified interfaces and types that all Glass UI components share:

```typescript
// Core component size variants
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Core component variants
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive' | 'apple';

// Base props that all Glass components inherit
export interface BaseGlassProps {
  size?: ComponentSize;
  variant?: ComponentVariant;
  glassEffect?: GlassEffectConfig;
  hover?: boolean;
  focus?: boolean;
  active?: boolean;
  animation?: AnimationTiming;
  disableAnimations?: boolean;
  className?: string;
  'data-testid'?: string;
}
```

### 2. Centralized Glass Effects (`src/core/glass-effects.ts`)

Provides a unified API for all glass effects throughout the library:

```typescript
// Glass Effects Manager
export class GlassEffectsManager {
  private static instance: GlassEffectsManager;
  
  applyEffect(element: HTMLElement, options: GlassEffectOptions): void
  removeEffect(element: HTMLElement): void
  registerEffect(id: string, options: GlassEffectOptions): void
}

// Utility functions
export function generateGlassClasses(variant, intensity, state, options): string
export function generateGlassVariables(intensity, options): Record<string, string | number>
export function useGlassEffects(intensity, options): GlassEffectsAPI
```

### 3. Reusable Animation Hooks (`src/hooks/use-glass-animations.ts`)

Consolidates animation logic into reusable hooks:

```typescript
// Base animation hook
export function useGlassAnimation(timing, customConfig): AnimationAPI

// State transition hook
export function useGlassStateTransitions(timing, intensity): StateTransitionAPI

// Specialized animation hooks
export function useMagneticHover(strength, radius, timing): MagneticHoverAPI
export function useRippleEffect(timing, color): RippleEffectAPI
export function useSpringAnimation(config): SpringAnimationAPI
export function useLiquidFlow(amplitude, frequency, duration): LiquidFlowAPI
```

### 4. Compound Component Factory (`src/core/compound-component.tsx`)

Provides utilities for creating compound components with consistent patterns:

```typescript
// Create compound component
export function createCompoundComponent<T, P>(options): Component

// Create compound component with context
export function createCompoundComponentWithContext<T, P, C>(options): {
  Component, Provider, useContext, Context
}

// Higher-order component for glass effects
export function withGlassEffects<T, P>(Component, defaultConfig): WrappedComponent
```

### 5. Business Logic Separation (`src/core/business-logic.ts`)

Utilities for separating business logic from presentation components:

```typescript
// Business logic hook factory
export function createBusinessLogicHook<TState, TProps, TActions>(
  initialStateFactory,
  actionsFactory
): BusinessLogicHook

// Specialized business logic hooks
export function createFormBusinessLogic<T>(initialValues, validation, onSubmit)
export function createTableBusinessLogic<T>(initialItems, itemsPerPage)
export function createModalBusinessLogic(initialState)
export function createAsyncDataBusinessLogic<T>(fetchFunction, cacheTimeout)
```

## Implementation Examples

### Refactored Button Component

```typescript
// Business logic separated from presentation
const useButtonBusinessLogic = createBusinessLogicHook(
  (props: GlassButtonProps) => ({
    isPressed: false,
    isHovered: false,
    isFocused: false,
  }),
  (state, setState, props) => ({
    handlePress: () => {
      if (props.disabled || props.loading) return;
      setState(prev => ({ ...prev, isPressed: true }));
      setTimeout(() => setState(prev => ({ ...prev, isPressed: false })), 150);
    },
    handleHover: (isHovered: boolean) => {
      if (props.disabled) return;
      setState(prev => ({ ...prev, isHovered }));
    },
  })
);

// Component using unified base system
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ size = 'md', variant = 'primary', ...props }, ref) => {
    const { state, actions } = useButtonBusinessLogic(props);
    const { transitionTo } = useGlassStateTransitions();
    const { createRipple } = useRippleEffect();
    
    // Generate glass classes and variables
    const glassClasses = generateGlassClasses(variant, props.glassEffect?.intensity);
    const glassVariables = generateGlassVariables(props.glassEffect?.intensity);
    
    // Component implementation...
  }
);
```

### Compound Card Component

```typescript
// Card context for compound components
interface CardContextValue {
  variant: string;
  size: string;
  padding: string;
  interactive: boolean;
}

const CardContext = createContext<CardContextValue | null>(null);

// Main card component
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => {
    const { state, actions } = useCardBusinessLogic(props);
    
    const contextValue: CardContextValue = {
      variant, size, padding: props.padding, interactive: props.interactive
    };
    
    return (
      <CardContext.Provider value={contextValue}>
        <div ref={ref} className={componentClasses} {...props}>
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

// Compound components
export const CardHeader = forwardRef<HTMLDivElement, ComponentPropsBuilder<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useCardContext();
    return (
      <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
        {children}
      </div>
    );
  }
);

// Create compound component collection
const CompoundCard = Object.assign(GlassCard, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
  Actions: CardActions,
});
```

## Key Benefits

### 1. Consistent Component Structure
- All components follow the same architectural patterns
- Unified prop interfaces and naming conventions
- Consistent forwardRef implementation throughout

### 2. Centralized Glass Effects
- Single source of truth for all glass effects
- Consistent API across all components
- Easy to maintain and update effects globally

### 3. Reusable Animation Logic
- Animation hooks can be used across any component
- Consistent timing and easing functions
- Performance optimized with proper cleanup

### 4. Proper Component Composition
- Compound components pattern for complex UI elements
- Context-based state sharing between sub-components
- Proper ref forwarding and accessibility

### 5. Business Logic Separation
- Clear separation between logic and presentation
- Testable business logic hooks
- Reusable state management patterns

## Migration Guide

### From Legacy Components

1. **Update imports** to use the new core system:
   ```typescript
   // Old
   import { GlassButton } from './components/glass-button';
   
   // New
   import { GlassButton } from './components/glass-button-refactored';
   ```

2. **Update prop interfaces** to use unified base props:
   ```typescript
   // Old
   interface CustomButtonProps {
     size?: 'sm' | 'md' | 'lg';
     variant?: string;
     // ... other props
   }
   
   // New
   interface CustomButtonProps extends InteractiveGlassProps {
     // ... additional props specific to this component
   }
   ```

3. **Migrate to compound components** where applicable:
   ```typescript
   // Old
   <GlassCard>
     <div className="card-header">Title</div>
     <div className="card-content">Content</div>
   </GlassCard>
   
   // New
   <Card>
     <Card.Header>
       <Card.Title>Title</Card.Title>
     </Card.Header>
     <Card.Content>Content</Card.Content>
   </Card>
   ```

### Creating New Components

1. **Start with base interfaces**:
   ```typescript
   import { InteractiveGlassProps, ComponentPropsBuilder } from '@/core';
   
   interface MyComponentProps extends InteractiveGlassProps, ComponentPropsBuilder<HTMLDivElement> {
     // Component-specific props
   }
   ```

2. **Use business logic hooks**:
   ```typescript
   const useMyComponentLogic = createBusinessLogicHook(
     (props) => ({ /* initial state */ }),
     (state, setState, props) => ({ /* actions */ })
   );
   ```

3. **Apply glass effects**:
   ```typescript
   const glassClasses = generateGlassClasses(variant, intensity, state, options);
   const glassVariables = generateGlassVariables(intensity, options);
   ```

4. **Use animation hooks**:
   ```typescript
   const { transitionTo } = useGlassStateTransitions(animation, intensity);
   const { createRipple } = useRippleEffect(animation);
   ```

## Testing

The refactored architecture improves testability by:

- **Isolated business logic**: Logic hooks can be tested independently
- **Consistent interfaces**: Standardized prop shapes for easier mocking
- **Separated concerns**: Presentation and logic are clearly separated
- **Predictable behavior**: Centralized effects and animations

Example test:
```typescript
describe('useButtonBusinessLogic', () => {
  it('should handle press correctly', () => {
    const { result } = renderHook(() => useButtonBusinessLogic({
      disabled: false,
      loading: false,
    }));
    
    act(() => {
      result.current.actions.handlePress();
    });
    
    expect(result.current.state.isPressed).toBe(true);
  });
});
```

## Performance Considerations

The refactored architecture includes several performance optimizations:

1. **Centralized effects management**: Prevents duplicate effect calculations
2. **Memoized animation hooks**: Reduces unnecessary re-renders
3. **Efficient ref handling**: Proper ref forwarding without performance penalties
4. **Lazy loading**: Business logic hooks only initialize when needed
5. **Proper cleanup**: Animation and effect cleanup prevents memory leaks

## Future Enhancements

The new architecture provides a foundation for future enhancements:

1. **Theme system integration**: Easy to add theme-aware glass effects
2. **Accessibility improvements**: Centralized accessibility patterns
3. **Performance monitoring**: Built-in performance tracking capabilities
4. **Design system tokens**: Easy integration with design token systems
5. **Server-side rendering**: Improved SSR support with unified patterns

## Conclusion

This refactored architecture provides a solid foundation for the Glass UI library, ensuring consistency, maintainability, and extensibility while improving developer experience and component quality.
