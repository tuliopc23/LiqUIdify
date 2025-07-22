/**
 * Optimized Glass Animation Hooks
 * 
 * Performance-optimized versions of animation hooks with:
 * - Reduced requestAnimationFrame usage
 * - Throttled progress updates
 * - Conditional animation based on reduce motion
 * - Memoized animation configs
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AnimationTiming, GlassIntensity } from '@/core/base-component';

// Animation state management
export interface OptimizedAnimationState {
  isAnimating: boolean;
  currentState: string;
  progress: number;
  startTime?: number;
  endTime?: number;
}

// Performance-optimized animation configuration
export interface OptimizedAnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
  throttleMs?: number; // Progress update throttling
}

// Reduced motion preference check
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
};

// Optimized timing presets with reduced durations for better performance
const OPTIMIZED_TIMING_PRESETS: Record<AnimationTiming, OptimizedAnimationConfig> = {
  instant: { duration: 0, easing: 'linear', throttleMs: 0 },
  fast: { duration: 100, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', throttleMs: 8 },
  normal: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', throttleMs: 16 },
  slow: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', throttleMs: 16 },
  slower: { duration: 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', throttleMs: 16 },
};

/**
 * Performance-optimized glass animation hook
 */
export function useOptimizedGlassAnimation(
  timing: AnimationTiming = 'normal',
  customConfig?: Partial<OptimizedAnimationConfig>
) {
  const [state, setState] = useState<OptimizedAnimationState>({
    isAnimating: false,
    currentState: 'idle',
    progress: 0,
  });

  const animationRef = useRef<Animation | null>(null);
  const progressThrottleRef = useRef<number | null>(null);
  const lastProgressUpdateRef = useRef<number>(0);

  // Memoize config to prevent unnecessary recalculations
  const config = useMemo(() => {
    const baseConfig = OPTIMIZED_TIMING_PRESETS[timing];
    const mergedConfig = { ...baseConfig, ...customConfig };
    
    // Respect reduced motion preference
    if (prefersReducedMotion()) {
      return {
        ...mergedConfig,
        duration: Math.min(mergedConfig.duration, 100), // Cap at 100ms
        throttleMs: 0, // No throttling for reduced motion
      };
    }
    
    return mergedConfig;
  }, [timing, customConfig]);

  const animate = useCallback(
    (
      element: HTMLElement,
      keyframes: Keyframe[],
      options?: Partial<OptimizedAnimationConfig>
    ) => {
      if (!element) {
        return undefined;
      }

      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.cancel();
      }

      // Clear any pending progress updates
      if (progressThrottleRef.current) {
        cancelAnimationFrame(progressThrottleRef.current);
        progressThrottleRef.current = null;
      }

      const animationOptions = { ...config, ...options };

      // Skip animation entirely if duration is 0
      if (animationOptions.duration === 0) {
        setState({
          isAnimating: false,
          currentState: 'complete',
          progress: 1,
          startTime: Date.now(),
          endTime: Date.now(),
        });
        return undefined;
      }

      setState((prev) => ({
        ...prev,
        isAnimating: true,
        progress: 0,
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

      // Throttled progress tracking
      const throttleMs = animationOptions.throttleMs || 16;
      
      const updateProgress = () => {
        const now = performance.now();
        
        // Throttle progress updates to improve performance
        if (throttleMs > 0 && now - lastProgressUpdateRef.current < throttleMs) {
          progressThrottleRef.current = requestAnimationFrame(updateProgress);
          return;
        }
        
        lastProgressUpdateRef.current = now;

        if (!animation.currentTime || !animation.effect) {
          return;
        }

        const progress = Math.min(
          (animation.currentTime as number) / animationOptions.duration,
          1
        );

        setState((prev) => ({ ...prev, progress }));

        if (progress < 1 && !animation.finished) {
          progressThrottleRef.current = requestAnimationFrame(updateProgress);
        }
      };

      // Start progress tracking only if needed
      if (throttleMs >= 0) {
        progressThrottleRef.current = requestAnimationFrame(updateProgress);
      }

      // Handle animation completion
      animation.addEventListener('finish', () => {
        if (progressThrottleRef.current) {
          cancelAnimationFrame(progressThrottleRef.current);
          progressThrottleRef.current = null;
        }
        
        setState((prev) => ({
          ...prev,
          isAnimating: false,
          currentState: 'complete',
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
    if (progressThrottleRef.current) {
      cancelAnimationFrame(progressThrottleRef.current);
      progressThrottleRef.current = null;
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
 * Optimized glass state transitions with debouncing
 */
export function useOptimizedGlassStateTransitions(
  timing: AnimationTiming = 'normal',
  intensity: GlassIntensity = 'medium'
) {
  const [currentState, setCurrentState] = useState<string>('idle');
  const [pendingState, setPendingState] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { cancel, state } = useOptimizedGlassAnimation(timing);

  // Debounced state transition to prevent excessive animations
  const transitionToState = useCallback(
    (targetState: string, debounceMs: number = 10) => {
      if (currentState === targetState) {
        return;
      }

      // Clear any pending transitions
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      setPendingState(targetState);

      // Debounce state transitions to improve performance
      debounceRef.current = setTimeout(() => {
        if (pendingState === targetState) {
          cancel(); // Cancel any ongoing animation
          setCurrentState(targetState);
          setPendingState(null);
        }
      }, debounceMs);
    },
    [currentState, pendingState, cancel]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return { 
    transitionToState, 
    currentState, 
    pendingState,
    isAnimating: state.isAnimating 
  };
}

/**
 * Optimized magnetic hover with reduced calculation frequency
 */
export function useOptimizedMagneticHover(
  strength: number = 0.3,
  updateFrequency: number = 60 // fps limit
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const isHovering = useRef(false);
  const lastUpdateRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const updateInterval = 1000 / updateFrequency;

  const updateMagneticEffect = useCallback((clientX: number, clientY: number) => {
    const now = performance.now();
    
    // Limit update frequency for better performance
    if (now - lastUpdateRef.current < updateInterval) {
      return;
    }
    
    lastUpdateRef.current = now;

    if (!elementRef.current || !isHovering.current) {
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    elementRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }, [strength, updateInterval]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(() => {
        updateMagneticEffect(event.clientX, event.clientY);
      });
    },
    [updateMagneticEffect]
  );

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (elementRef.current) {
      elementRef.current.style.transform = '';
    }
  }, []);

  const ref = useCallback((element: HTMLElement | null) => {
    // Clean up previous element
    if (elementRef.current) {
      elementRef.current.removeEventListener('mouseenter', handleMouseEnter);
      elementRef.current.removeEventListener('mouseleave', handleMouseLeave);
      elementRef.current.removeEventListener('mousemove', handleMouseMove);
    }

    elementRef.current = element;

    // Setup new element
    if (element && !prefersReducedMotion()) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (elementRef.current) {
        elementRef.current.removeEventListener('mouseenter', handleMouseEnter);
        elementRef.current.removeEventListener('mouseleave', handleMouseLeave);
        elementRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

  return { ref, isHovering: isHovering.current };
}

// Export optimized versions as defaults for performance-critical usage
export const useGlassAnimation = useOptimizedGlassAnimation;
export const useGlassStateTransitions = useOptimizedGlassStateTransitions;
export const useMagneticHover = useOptimizedMagneticHover;