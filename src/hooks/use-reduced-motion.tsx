/**
 * Hook for detecting and respecting prefers-reduced-motion
 * Provides animation control based on user preferences
 */

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { isClient } from '@/core/ssr-safety';

// Type definitions
export interface ReducedMotionConfig {
  /** Whether to force reduced motion regardless of system preference */
  forceReduced?: boolean;
  /** Whether to disable animations entirely when reduced motion is preferred */
  disableAnimations?: boolean;
  /** Custom animation duration multiplier when reduced motion is active */
  durationMultiplier?: number;
  /** Callback when reduced motion preference changes */
  onChange?: (prefersReduced: boolean) => void;
}

export interface AnimationConfig {
  /** Original animation duration */
  duration: number;
  /** Original animation easing */
  easing?: string;
  /** Original animation delay */
  delay?: number;
  /** Whether this animation is essential for understanding */
  essential?: boolean;
}

export interface AdjustedAnimation {
  /** Adjusted duration based on reduced motion preference */
  duration: number;
  /** Adjusted easing (may be simplified) */
  easing: string;
  /** Adjusted delay */
  delay: number;
  /** Whether the animation should run at all */
  shouldAnimate: boolean;
}

/**
 * Hook for detecting prefers-reduced-motion
 */
export const usePrefersReducedMotion = (
  config: ReducedMotionConfig = {}
): boolean => {
  const { forceReduced = false, onChange } = config;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (forceReduced) {
      return true;
    }
    if (!isClient()) {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (forceReduced) {
      setPrefersReducedMotion(true);
      onChange?.(true);
      return;
    }

    if (!isClient()) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      onChange?.(event.matches);
    };

    // Check if addEventListener is supported (older browsers use addListener)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    if (mediaQuery.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [forceReduced, onChange]);

  return prefersReducedMotion;
};

/**
 * Hook for adjusting animations based on reduced motion preference
 */
export const useReducedMotion = (config: ReducedMotionConfig = {}) => {
  const { disableAnimations = false, durationMultiplier = 0.1 } = config;

  const prefersReducedMotion = usePrefersReducedMotion(config);

  /**
   * Adjusts animation configuration based on reduced motion preference
   */
  const adjustAnimation = useCallback(
    (animation: AnimationConfig): AdjustedAnimation => {
      if (!prefersReducedMotion) {
        return {
          duration: animation.duration,
          easing: animation.easing || 'ease',
          delay: animation.delay || 0,
          shouldAnimate: true,
        };
      }

      // If animations should be completely disabled
      if (disableAnimations && !animation.essential) {
        return {
          duration: 0,
          easing: 'linear',
          delay: 0,
          shouldAnimate: false,
        };
      }

      // Reduce animation complexity
      return {
        duration: animation.essential
          ? animation.duration * 0.5
          : animation.duration * durationMultiplier,
        easing: 'ease', // Simplify easing
        delay: animation.delay ? animation.delay * 0.5 : 0,
        shouldAnimate: true,
      };
    },
    [prefersReducedMotion, disableAnimations, durationMultiplier]
  );

  /**
   * Creates CSS transition string with reduced motion adjustments
   */
  const createTransition = useCallback(
    (
      property: string,
      duration: number,
      easing = 'ease',
      delay = 0
    ): string => {
      const adjusted = adjustAnimation({ duration, easing, delay });

      if (!adjusted.shouldAnimate) {
        return 'none';
      }

      return `${property} ${adjusted.duration}ms ${adjusted.easing} ${adjusted.delay}ms`;
    },
    [adjustAnimation]
  );

  /**
   * Creates multiple CSS transitions
   */
  const createTransitions = useCallback(
    (
      transitions: Array<{
        property: string;
        duration: number;
        easing?: string;
        delay?: number;
      }>
    ): string => {
      const adjustedTransitions = transitions
        .map((t) => createTransition(t.property, t.duration, t.easing, t.delay))
        .filter((t) => 'none' !== t);

      return adjustedTransitions.length > 0
        ? adjustedTransitions.join(', ')
        : 'none';
    },
    [createTransition]
  );

  /**
   * Gets animation duration with reduced motion adjustments
   */
  const getAnimationDuration = useCallback(
    (duration: number, essential = false): number => {
      const adjusted = adjustAnimation({ duration, essential });
      return adjusted.duration;
    },
    [adjustAnimation]
  );

  /**
   * Creates framer-motion animation variants with reduced motion
   */
  const createMotionVariants = useCallback(
    <T extends Record<string, any>>(
      variants: T,
      options: {
        essential?: boolean;
        disableExit?: boolean;
      } = {}
    ): T => {
      if (!prefersReducedMotion) {
        return variants;
      }

      const adjusted: any = {};

      for (const [key, value] of Object.entries(variants)) {
        if ('object' === typeof value && null !== value) {
          // Handle animation objects
          if ('transition' in value && value.transition) {
            const adjustedTransition = adjustAnimation({
              duration: value.transition.duration || 0.3,
              easing: value.transition.ease,
              delay: value.transition.delay,
              essential: options.essential,
            });

            adjusted[key] = {
              ...value,
              transition: adjustedTransition.shouldAnimate
                ? {
                    ...value.transition,
                    duration: adjustedTransition.duration / 1000, // Convert to seconds
                    ease: adjustedTransition.easing,
                    delay: adjustedTransition.delay / 1000,
                  }
                : { duration: 0 },
            };
          } else {
            adjusted[key] = value;
          }

          // Disable exit animations if requested
          if (options.disableExit && 'exit' === key) {
            adjusted[key] = { opacity: 1 };
          }
        } else {
          adjusted[key] = value;
        }
      }

      return adjusted as T;
    },
    [prefersReducedMotion, adjustAnimation]
  );

  /**
   * Conditionally applies animation classes
   */
  const getAnimationClass = useCallback(
    (animatedClass: string, staticClass = ''): string => {
      if (prefersReducedMotion && disableAnimations) {
        return staticClass;
      }
      return animatedClass;
    },
    [prefersReducedMotion, disableAnimations]
  );

  return {
    prefersReducedMotion,
    adjustAnimation,
    createTransition,
    createTransitions,
    getAnimationDuration,
    createMotionVariants,
    getAnimationClass,
  };
};

/**
 * HOC to wrap components with reduced motion support
 */
export const withReducedMotion = <P extends object>(
  Component: React.ComponentType<P & { prefersReducedMotion?: boolean }>,
  config?: ReducedMotionConfig
): React.ComponentType<P> => {
  return function ReducedMotionComponent(props: P) {
    const prefersReducedMotion = usePrefersReducedMotion(config);

    return <Component {...props} prefersReducedMotion={prefersReducedMotion} />;
  };
};

/**
 * Utility to create accessible animation styles
 */
export const createAccessibleAnimation = (
  name: string,
  keyframes: string,
  options: {
    duration?: number;
    easing?: string;
    essential?: boolean;
  } = {}
): string => {
  const { duration = 300, easing = 'ease', essential = false } = options;

  return `
    @keyframes ${name} {
      ${keyframes}
    }
    
    @media (prefers-reduced-motion: no-preference) {
      .animate-${name} {
        animation: ${name} ${duration}ms ${easing};
      }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .animate-${name} {
        ${
          essential
            ? `animation: ${name} ${duration * 0.5}ms ease;`
            : 'animation: none;'
        }
      }
    }
  `;
};

// Export all utilities
export default {
  usePrefersReducedMotion,
  useReducedMotion,
  withReducedMotion,
  createAccessibleAnimation,
};
