/**
 * Refactored Glass Button Component
 * 
 * This component demonstrates the new compound component architecture with:
 * - Consistent component structure using compound components pattern
 * - Unified base component system with shared props and behaviors
 * - Centralized glass effects system
 * - Reusable animation hooks
 * - Proper component composition with forwardRef
 * - Separated business logic from presentation
 */

// External dependencies
import React, { forwardRef, useCallback, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

// Internal dependencies
import type { InteractiveGlassProps } from '@/core';
import { cn } from '@/core/utils/classname';
import { createBusinessLogicHook } from '@/core/business-logic';
import { generateGlassClasses, generateGlassVariables } from '@/core/glass/unified-glass-system';
import { microInteraction, responsiveSize, touchTarget } from '@/core/utils/responsive';
import { useGlassStateTransitions, useMagneticHover, useRippleEffect } from '@/hooks/use-glass-animations';

// Button state type
interface ButtonState {
  isPressed: boolean;
  isHovered: boolean;
  isFocused: boolean;
  rippleCount: number;
}

// Business logic for button interactions
const useButtonBusinessLogic = createBusinessLogicHook<ButtonState, GlassButtonProps, any>(
  // Initial state factory
  (_props: GlassButtonProps) => ({
    isPressed: false,
    isHovered: false,
    isFocused: false,
    rippleCount: 0,
  }),
  // Actions factory
  (_state: ButtonState, setState: React.Dispatch<React.SetStateAction<ButtonState>>, props: GlassButtonProps) => ({
    handlePress: () => {
      if (props.disabled || props.loading) {return undefined;}
      setState((prev: ButtonState) => ({ ...prev, isPressed: true }));
      setTimeout(() => setState((prev: ButtonState) => ({ ...prev, isPressed: false })), 150);
    },
    
    handleHover: (isHovered: boolean) => {
      if (props.disabled) {return undefined;}
      setState((prev: ButtonState) => ({ ...prev, isHovered }));
    },
    
    handleFocus: (isFocused: boolean) => {
      if (props.disabled) {return undefined;}
      setState((prev: ButtonState) => ({ ...prev, isFocused }));
    },
    
    handleRipple: () => {
      if (props.disabled || props.loading) {return undefined;}
      setState((prev: ButtonState) => ({ ...prev, rippleCount: prev.rippleCount + 1 }));
    },
  })
);

// Import the ComponentPropsBuilder type
import type { ComponentPropsBuilder } from '@/types/component-props';

// Button-specific props extending the base interactive props
export interface GlassButtonProps extends
  InteractiveGlassProps,
  Omit<ComponentPropsBuilder<HTMLButtonElement>, 'size' | 'type'> {
  /** Button content */
  children?: React.ReactNode;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Show loading state */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Render as child component */
  asChild?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon only button */
  iconOnly?: boolean;
}

// Variant class mappings
const VARIANT_CLASSES = {
  primary: cn(
    'text-white dark:text-white font-semibold',
    'bg-gradient-to-b from-blue-500 to-blue-600',
    'hover:from-blue-400 hover:to-blue-500',
    'active:from-blue-600 active:to-blue-600',
    'shadow-lg shadow-blue-500/25',
    'border border-blue-400/30'
  ),
  secondary: cn(
    'text-gray-900 dark:text-white',
    'border-gray-200 dark:border-gray-700',
    'hover:bg-gray-50 dark:hover:bg-gray-800',
    'active:bg-gray-100 dark:active:bg-gray-700'
  ),
  tertiary: cn(
    'text-gray-900 dark:text-white bg-transparent',
    'hover:bg-gray-50 dark:hover:bg-gray-800',
    'active:bg-gray-100 dark:active:bg-gray-700'
  ),
  ghost: cn(
    'text-gray-600 dark:text-gray-400 bg-transparent',
    'hover:bg-gray-50 dark:hover:bg-gray-800',
    'active:bg-gray-100 dark:active:bg-gray-700'
  ),
  destructive: cn(
    'text-white font-semibold',
    'bg-gradient-to-b from-red-500 to-red-600',
    'hover:from-red-400 hover:to-red-500',
    'active:from-red-600 active:to-red-600',
    'shadow-lg shadow-red-500/25',
    'border border-red-400/30'
  ),
  apple: cn(
    'text-white font-semibold',
    'bg-gradient-to-b from-gray-800 to-gray-900',
    'hover:from-gray-700 hover:to-gray-800',
    'active:from-gray-900 active:to-gray-900',
    'shadow-lg shadow-gray-800/25',
    'border border-gray-600/30'
  ),
};

// Loading spinner component
const LoadingSpinner = ({ size = 'md' }: { size?: string }) => {
  const sizeClass = 'xs' === size ? 'w-3 h-3' : ('sm' === size ? 'w-4 h-4' : 'w-5 h-5');
  
  return (
    <div className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', sizeClass)} />
  );
};

/**
 * Glass Button Component
 * 
 * A premium glass-effect button component with advanced visual effects.
 * Built using the new compound component architecture for consistency and reusability.
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      // Base props
      size = 'md',
      variant = 'primary',
      className,
      children,
      
      // Interactive props
      disabled = false,
      loading = false,
      magnetic = false,
      ripple = true,
      
      // Button-specific props
      type = 'button',
      leftIcon,
      rightIcon,
      loadingText,
      asChild = false,
      fullWidth = false,
      iconOnly = false,
      
      // Glass effect props
      glassEffect = { intensity: 'medium', blur: true, backdrop: true },
      
      // Animation props
      animation = 'normal',
      disableAnimations = false,
      
      // Event handlers
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { actions } = useButtonBusinessLogic({ 
      disabled, 
      loading, 
      magnetic, 
      ripple,
      size,
      variant,
      glassEffect,
      animation,
      disableAnimations,
    });
    
    // Animation hooks
    const { transitionToState, currentState } = useGlassStateTransitions();
    const { magneticProps } = useMagneticHover();
    // Remove unused variable warning
    void magneticProps;
    const { triggerRipple } = useRippleEffect();
    
    // Combined ref handling
    const combinedRef = useCallback((node: HTMLButtonElement | null) => {
      if (buttonRef.current !== node) {
        buttonRef.current = node;
      }
      if ('function' === typeof ref) {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);
    
    // Event handlers with business logic
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) {return undefined;}
      
      actions.handlePress();
      actions.handleRipple();
      
      // Create ripple effect
      if (ripple) {
        triggerRipple();
      }
      
      // Trigger state transition
      transitionToState('active');
      setTimeout(() => transitionToState('idle'), 150);
      
      onClick?.(event);
    }, [disabled, loading, actions, ripple, triggerRipple, transitionToState, onClick]);
    
    const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {return undefined;}
      
      actions.handleHover(true);
      
      transitionToState('hover');
      
      onMouseEnter?.(event);
    }, [disabled, actions, transitionToState, onMouseEnter]);
    
    const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {return undefined;}
      
      actions.handleHover(false);
      
      transitionToState('idle');
      
      onMouseLeave?.(event);
    }, [disabled, actions, transitionToState, onMouseLeave]);
    
    const handleFocus = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      if (disabled) {return undefined;}
      
      actions.handleFocus(true);
      
      transitionToState('focus');
      
      onFocus?.(event);
    }, [disabled, actions, transitionToState, onFocus]);
    
    const handleBlur = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      if (disabled) {return undefined;}
      
      actions.handleFocus(false);
      
      transitionToState('idle');
      
      onBlur?.(event);
    }, [disabled, actions, transitionToState, onBlur]);
    
    // Generate glass classes and variables
    const glassClasses = generateGlassClasses({
      variant,
      intensity: glassEffect?.intensity,
      state: currentState,
      glassEffect
    });
    
    const glassVariables = generateGlassVariables(
      glassEffect?.intensity,
      { 
        animation: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        ...glassEffect 
      }
    );
    
    // Build component classes
    const componentClasses = cn(
      // Base classes
      'relative inline-flex items-center justify-center font-medium',
      'rounded-xl overflow-hidden',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'transition-all duration-300 ease-out',
      'will-change-transform',
      
      // Glass effect classes
      glassClasses,
      
      // Size classes
      responsiveSize[size],
      touchTarget.comfortable,
      
      // Variant classes
      VARIANT_CLASSES[variant],
      
      // State classes
      {
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading,
        'w-full': fullWidth,
        'aspect-square': iconOnly,
      },
      
      // Animation classes
      !disableAnimations && microInteraction(),
      
      // Custom classes
      className
    );
    
    // Component content
    const buttonContent = (
      <>
        {loading && (
          <div className="mr-2 flex items-center">
            <LoadingSpinner size={size} />
          </div>
        )}
        
        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">
            {leftIcon}
          </span>
        )}
        
        {children && (
          <span className={cn('flex items-center', iconOnly && 'sr-only')}>
            {loading && loadingText ? loadingText : children}
          </span>
        )}
        
        {rightIcon && !loading && (
          <span className="ml-2 flex items-center">
            {rightIcon}
          </span>
        )}
      </>
    );
    
    // Render component
    const Component = asChild ? Slot : 'button';
    
    return (
      <Component
        ref={combinedRef}
        type={!asChild ? type : undefined}
        disabled={disabled || loading}
        className={componentClasses}
        style={glassVariables as React.CSSProperties}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {buttonContent}
      </Component>
    );
  }
);

GlassButton.displayName = 'GlassButton';

// Memoize the component to prevent unnecessary re-renders
const MemoizedGlassButton = React.memo(GlassButton);

// Export the component and types
export default MemoizedGlassButton;
