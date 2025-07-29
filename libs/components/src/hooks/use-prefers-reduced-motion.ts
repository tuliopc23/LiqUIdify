import { useEffect, useState } from "react";

/**
 * Hook to detect if the user prefers reduced motion
 * @returns {boolean} true if the user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    () => {
      // Check if we're in a browser environment
      if (typeof window === "undefined" || !window.matchMedia) {
        return false;
      }

      // Check the initial preference
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
  );

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Update state when preference changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Legacy browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that returns animation props based on user's motion preference
 * @param animationProps - The animation props to apply when motion is allowed
 * @param reducedMotionProps - The props to apply when reduced motion is preferred
 * @returns The appropriate props based on user preference
 */
export function useMotionSafeAnimations<T extends Record<string, unknown>>(
  animationProps: T,
  reducedMotionProps: Partial<T> = {},
): T {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return {
      ...animationProps,
      ...reducedMotionProps,
      // Common reduced motion overrides
      transition: { duration: 0.01 },
      animate: null,
      whileHover: null,
      whileTap: null,
      whileInView: null,
    } as T;
  }

  return animationProps;
}

/**
 * Utility to conditionally apply animations based on motion preference
 * @param prefersReducedMotion - Whether the user prefers reduced motion
 * @param animation - The animation to apply
 * @param fallback - The fallback when reduced motion is preferred
 * @returns The appropriate animation value
 */
export function getMotionSafeValue<T>(
  prefersReducedMotion: boolean,
  animation: T,
  fallback?: T,
): T | undefined {
  return prefersReducedMotion ? fallback : animation;
}
