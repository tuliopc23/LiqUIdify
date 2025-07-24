/**
 * Glass Animation Hooks
 *
 * This module provides reusable animation hooks that consolidate animation logic
 * and provide consistent animation behaviors across all Glass UI components.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AnimationTiming, GlassIntensity } from '@/core/base-component';

// Define GlassEffectState locally since it's not exported
interface GlassEffectState {
  intensity: number;
  blur: number;
  opacity: number;
  scale: number;
}

// Animation state management
export interface AnimationState {
  isAnimating: boolean;
  currentState: string;
  progress: number;
  startTime?: number;
  endTime?: number;
}

// Animation configuration
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Animation timing presets
const TIMING_PRESETS: Record<AnimationTiming, AnimationConfig> = {
  instant: { duration: 0, easing: 'linear' },
  fast: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  normal: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  slow: { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  slower: { duration: 750, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
};

// Glass-specific animation presets
const GLASS_ANIMATION_PRESETS = {
  'glass-in': { duration: 300, easing: 'cubic-bezier(0.32, 0, 0.67, 0)' },
  'glass-out': { duration: 300, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
  'liquid-flow': { duration: 600, easing: 'cubic-bezier(0.36, 0.66, 0.04, 1)' },
  magnetic: { duration: 200, easing: 'cubic-bezier(0.2, 0, 0, 1.2)' },
  spring: { duration: 400, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  bounce: { duration: 500, easing: 'cubic-bezier(0.87, -0.41, 0.19, 1.44)' },
};

/**
 * Base animation hook for consistent animation behavior
 */
export function useGlassAnimation(
  timing: AnimationTiming = 'normal',
  customConfig?: Partial<AnimationConfig>
) {
  const [state, setState] = useState<AnimationState>({
    isAnimating: false,
    currentState: 'idle',
    progress: 0,
  });

  const animationRef = useRef<Animation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const config = useMemo(
    () => ({
      ...TIMING_PRESETS[timing],
      ...customConfig,
    }),
    [timing, customConfig]
  );

  const animate = useCallback(
    (
      element: HTMLElement,
      keyframes: Keyframe[],
      options?: Partial<AnimationConfig>
    ) => {
      if (!element) {
        return;
      }

      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.cancel();
      }

      const animationOptions = { ...config, ...options };

      setState((prev) => ({
        ...prev,
        isAnimating: true,
        startTime: Date.now(),
        endTime: Date.now() + animationOptions.duration,
      }));

      // Create Web Animations API animation
      const animation = element.animate(keyframes, {
        duration: animationOptions.duration,
        easing: animationOptions.easing,
        delay: animationOptions.delay,
        iterations: animationOptions.iterations,
        direction: animationOptions.direction,
        fill: animationOptions.fill,
      });

      animationRef.current = animation;

      // Track animation progress
      const updateProgress = () => {
        if (!animation.currentTime || !animation.effect) {
          return;
        }

        const progress = Math.min(
          (animation.currentTime as number) / animationOptions.duration,
          1
        );

        setState((prev) => ({ ...prev, progress }));

        if (1 > progress) {
          requestAnimationFrame(updateProgress);
        }
      };

      requestAnimationFrame(updateProgress);

      // Handle animation completion
      animation.addEventListener('finish', () => {
        setState((prev) => ({
          ...prev,
          isAnimating: false,
          progress: 1,
        }));
      });

      return animation;
    },
    [config]
  );

  const cancel = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setState((prev) => ({ ...prev, isAnimating: false }));
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return { animate, cancel, state, config };
}

/**
 * Hook for glass state transitions (hover, focus, active, etc.)
 */
export function useGlassStateTransitions(
  timing: AnimationTiming = 'normal',
  _intensity: GlassIntensity = 'medium'
) {
  const [currentState, setCurrentState] = useState<string>('idle');
  const { cancel, state } = useGlassAnimation(timing);

  const transitionToState = useCallback(
    (targetState: string) => {
      if (currentState === targetState) {
        return;
      }

      cancel(); // Cancel any ongoing animation

      setCurrentState(targetState);
    },
    [currentState, cancel]
  );

  return { transitionToState, currentState, isAnimating: state.isAnimating };
}

/**
 * Hook for magnetic hover effects
 */
export function useMagneticHover(
  strength: number = 0.3,
  radius: number = 100,
  timing: AnimationTiming = 'fast'
) {
  const elementRef = useRef<HTMLElement>(null);
  const { animate } = useGlassAnimation(timing);
  const [isHovering, setIsHovering] = useState(false);

  const magneticProps = {};

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!elementRef.current) {
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance <= radius) {
        const normalizedDistance = distance / radius;
        const force = (1 - normalizedDistance) * strength;

        const translateX = deltaX * force;
        const translateY = deltaY * force;

        animate(
          elementRef.current,
          [{ transform: `translate(${translateX}px, ${translateY}px)` }],
          {
            fill: 'forwards',
          }
        );
      }
    },
    [animate, strength, radius]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    document.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    document.removeEventListener('mousemove', handleMouseMove);

    if (elementRef.current) {
      animate(elementRef.current, [{ transform: 'translate(0px, 0px)' }], {
        fill: 'forwards',
      });
    }
  }, [animate, handleMouseMove]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

  return { magneticProps, isHovering };
}

/**
 * Hook for ripple effects
 */
export function useRippleEffect(
  timing: AnimationTiming = 'normal',
  _color: string = 'rgba(255, 255, 255, 0.3)'
) {
  const { animate } = useGlassAnimation(timing);

  const triggerRipple = useCallback(() => {
    // Ripple effect implementation
  }, []);

  const rippleProps = {};

  return { rippleProps, triggerRipple };
}

/**
 * Hook for spring animations
 */
export function useSpringAnimation() {
  const { animate } = useGlassAnimation('normal');

  const springTo = useCallback(
    (
      element: HTMLElement,
      targetValue: number,
      property: string = 'transform'
    ) => {
      const springEasing = `cubic-bezier(0.34, 1.56, 0.64, 1)`;

      animate(element, [{ [property]: `${targetValue}` }], {
        duration: 500,
        easing: springEasing,
        fill: 'forwards',
      });
    },
    [animate]
  );

  return { springTo };
}

/**
 * Hook for liquid flow animations
 */
export function useLiquidFlow(
  amplitude: number = 20,
  frequency: number = 2,
  duration: number = 2000
) {
  const { animate } = useGlassAnimation('normal');

  const startFlow = useCallback(
    (element: HTMLElement) => {
      const keyframes = [];
      const steps = 60; // 60 fps

      for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        const y = amplitude * Math.sin(progress * frequency * Math.PI * 2);
        keyframes.push({
          transform: `translateY(${y}px)`,
          offset: progress,
        });
      }

      animate(element, keyframes, {
        duration,
        iterations: Infinity,
        easing: 'linear',
      });
    },
    [animate, amplitude, frequency, duration]
  );

  return { startFlow };
}

// Export all hooks and utilities
export { TIMING_PRESETS, GLASS_ANIMATION_PRESETS };
