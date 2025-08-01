/**
 * Glass Animation Hooks
 *
 * This module provides reusable animation hooks that consolidate animation logic
 * and provide consistent animation behaviors across all Glass UI components.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  safeGetBoundingClientRect,
  safeRequestAnimationFrame,
} from "../utils/safe-dom";

// Define types locally
type AnimationTiming = "instant" | "fast" | "normal" | "slow" | "slower";
type GlassIntensity = "low" | "medium" | "high" | "ultra";

// Animation state management
interface AnimationState {
  isAnimating: boolean;
  currentState: string;
  progress: number;
  startTime?: number;
  endTime?: number;
}

// Animation configuration
interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number;
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fill?: "none" | "forwards" | "backwards" | "both";
}

// Animation timing presets
const TIMING_PRESETS: Record<AnimationTiming, AnimationConfig> = {
  instant: { duration: 0, easing: "linear" },
  fast: { duration: 150, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
  normal: { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
  slow: { duration: 500, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
  slower: { duration: 750, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
};

/**
 * Base animation hook for consistent animation behavior
 */
function useGlassAnimation(
  timing: AnimationTiming = "normal",
  customConfig?: Partial<AnimationConfig>,
) {
  const [state, setState] = useState<AnimationState>({
    isAnimating: false,
    currentState: "idle",
    progress: 0,
  });

  const animationRef = useRef<Animation | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const config = useMemo(
    () => ({
      ...TIMING_PRESETS[timing],
      ...customConfig,
    }),
    [timing, customConfig],
  );

  const animate = useCallback(
    (
      element: HTMLElement,
      keyframes: Array<Keyframe>,
      options?: Partial<AnimationConfig>,
    ) => {
      if (!element) {
        return;
      }

      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.cancel();
      }

      const animationOptions = { ...config, ...options };

      setState((previous) => ({
        ...previous,
        isAnimating: true,
        startTime: Date.now(),
        endTime: Date.now() + animationOptions.duration,
      }));

      try {
        // Check if Web Animations API is available
        if (!element.animate) {
          // Fallback: no animation support
          setState((previous) => ({
            ...previous,
            isAnimating: false,
            progress: 1,
          }));
          return null;
        }

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
            1,
          );

          setState((previous) => ({ ...previous, progress }));

          if (progress < 1) {
            const cancelRAF = safeRequestAnimationFrame(updateProgress);
            // Store the cancel function for cleanup
            if (cancelRAF) {
              timeoutRef.current = setTimeout(cancelRAF, 0) as any;
            }
          }
        };

        const cancelRAF = safeRequestAnimationFrame(updateProgress);
        if (cancelRAF) {
          timeoutRef.current = setTimeout(cancelRAF, 0) as any;
        }

        // Handle animation completion
        animation.addEventListener("finish", () => {
          setState((previous) => ({
            ...previous,
            isAnimating: false,
            progress: 1,
          }));
        });

        return animation;
      } catch (error) {
        // Fallback: animation failed
        setState((previous) => ({
          ...previous,
          isAnimating: false,
          progress: 1,
        }));
        return null;
      }
    },
    [config],
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
    setState((previous) => ({ ...previous, isAnimating: false }));
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
  timing: AnimationTiming = "normal",
  _intensity: GlassIntensity = "medium",
) {
  const [currentState, setCurrentState] = useState<string>("idle");
  const { cancel, state } = useGlassAnimation(timing);

  const transitionToState = useCallback(
    (targetState: string) => {
      if (currentState === targetState) {
        return;
      }

      cancel(); // Cancel any ongoing animation

      setCurrentState(targetState);
    },
    [currentState, cancel],
  );

  return { transitionToState, currentState, isAnimating: state.isAnimating };
}

/**
 * Hook for magnetic hover effects
 */
export function useMagneticHover(
  strength = 0.3,
  radius = 100,
  timing: AnimationTiming = "fast",
) {
  const elementRef = useRef<HTMLElement>(null);
  const { animate } = useGlassAnimation(timing);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!elementRef.current) {
        return;
      }

      try {
        const rect = safeGetBoundingClientRect(elementRef.current);
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance <= radius) {
          const normalizedDistance = distance / radius;
          const force = (1 - normalizedDistance) * strength;

          const translateX = deltaX * force;
          const translateY = deltaY * force;

          animate(
            elementRef.current,
            [{ transform: `translate(${translateX}px, ${translateY}px)` }],
            {
              fill: "forwards",
            },
          );
        }
      } catch (error) {
        // Graceful degradation: do nothing if getBoundingClientRect fails
      }
    },
    [animate, strength, radius],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    document.addEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    document.removeEventListener("mousemove", handleMouseMove);

    if (elementRef.current) {
      animate(elementRef.current, [{ transform: "translate(0px, 0px)" }], {
        fill: "forwards",
      });
    }
  }, [animate, handleMouseMove]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

  const magneticProps = {
    ref: elementRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return { magneticProps, isHovering };
}

/**
 * Hook for ripple effects
 */
export function useRippleEffect(
  timing: AnimationTiming = "normal",
  _color = "rgba(255, 255, 255, 0.3)",
) {
  const { animate } = useGlassAnimation(timing);

  const triggerRipple = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      try {
        const element = event.currentTarget;
        const rect = safeGetBoundingClientRect(element);

        // Calculate ripple position
        const rippleX = event.clientX - rect.left;
        const rippleY = event.clientY - rect.top;
        const rippleSize = Math.max(rect.width, rect.height) * 2;

        // Create ripple element
        const ripple = document.createElement("div");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.3)";
        ripple.style.transform = "scale(0)";
        ripple.style.left = `${rippleX - rippleSize / 2}px`;
        ripple.style.top = `${rippleY - rippleSize / 2}px`;
        ripple.style.width = `${rippleSize}px`;
        ripple.style.height = `${rippleSize}px`;
        ripple.style.pointerEvents = "none";
        ripple.style.zIndex = "10";

        // Ensure element has relative positioning
        if (typeof window !== "undefined" && window.getComputedStyle) {
          const computedStyle = window.getComputedStyle(element);
          if (computedStyle.position === "static") {
            element.style.position = "relative";
          }
        }

        element.appendChild(ripple);

        // Animate ripple
        const animation = animate(
          ripple,
          [
            { transform: "scale(0)", opacity: "0.7" },
            { transform: "scale(1)", opacity: "0" },
          ],
          {
            duration: TIMING_PRESETS[timing].duration,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "forwards",
          },
        );

        if (animation) {
          animation.addEventListener("finish", () => {
            if (ripple.parentNode) {
              ripple.parentNode.removeChild(ripple);
            }
          });
        } else {
          // Fallback: remove ripple after timeout
          setTimeout(() => {
            if (ripple.parentNode) {
              ripple.parentNode.removeChild(ripple);
            }
          }, TIMING_PRESETS[timing].duration);
        }
      } catch (error) {
        // Graceful degradation: do nothing if ripple creation fails
      }
    },
    [animate, timing],
  );

  const rippleProps = {
    onClick: triggerRipple,
    style: { overflow: "hidden" },
  };

  return { rippleProps, triggerRipple };
}

// Export all hooks and utilities
