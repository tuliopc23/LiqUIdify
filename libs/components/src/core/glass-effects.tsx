/**
 * Glass Effects Hooks
 *
 * Provides React hooks for glass effects and interactions
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  GlassEffectConfig,
  GlassIntensity,
  GlassVariant,
} from "./glass/unified-glass-system";

import { useUnifiedGlass } from "./glass/unified-glass-system";

export interface UseGlassEffectsOptions {
  intensity?: GlassIntensity;
  variant?: GlassVariant;
  interactive?: boolean;
  magnetic?: boolean;
  disabled?: boolean;
}

export interface GlassEffectsResult {
  glassProps: {
    className: string;
    style: React.CSSProperties;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseMove: (event: React.MouseEvent) => void;
  };
  isActive: boolean;
  setActive: (active: boolean) => void;
  ref: React.RefObject<HTMLElement>;
}

/**
 * Main hook for applying glass effects to components
 */
export function useGlassEffects(
  options: UseGlassEffectsOptions = {},
): GlassEffectsResult {
  const {
    intensity = "medium",
    variant = "default",
    interactive = false,
    magnetic = false,
    disabled = false,
  } = options;

  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const config: GlassEffectConfig = {
    intensity,
    variant,
    interactive,
    magnetic,
  };

  const { glassStyles, handlers } = useUnifiedGlass(config);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsActive(true);
      handlers.onMouseEnter?.();
    }
  }, [disabled, handlers]);

  const handleMouseLeave = useCallback(() => {
    if (!disabled) {
      setIsActive(false);
      handlers.onMouseLeave?.();
    }
  }, [disabled, handlers]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!disabled) {
        handlers.onMouseMove?.(event as React.MouseEvent<HTMLDivElement>);
      }
    },
    [disabled, handlers],
  );

  const glassProps = {
    className: `glass-effect glass-effect--${intensity} glass-effect--${variant}`,
    style: glassStyles,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
  };

  return {
    glassProps,
    isActive,
    setActive: setIsActive,

    ref,
  };
}

/**
 * Simplified hook for basic glass effects
 */
export function useGlassBackground(intensity: GlassIntensity = "medium") {
  return useGlassEffects({ intensity, interactive: false, magnetic: false });
}

/**
 * Hook for interactive glass effects with hover states
 */
export function useInteractiveGlass(
  options: Omit<UseGlassEffectsOptions, "interactive"> = {},
) {
  return useGlassEffects({ ...options, interactive: true });
}

/**
 * Hook for magnetic glass effects that respond to mouse movement
 */
export function useMagneticGlass(
  options: Omit<UseGlassEffectsOptions, "magnetic"> = {},
) {
  return useGlassEffects({ ...options, magnetic: true });
}

/**
 * Hook for glass effects with custom animation timings
 */
export function useAnimatedGlass(
  options: UseGlassEffectsOptions & {
    duration?: number;
    easing?: string;
  } = {},
) {
  const {
    duration = 300,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    ...glassOptions
  } = options;
  const result = useGlassEffects(glassOptions);

  // Override the transition in the style
  const enhancedGlassProps = {
    ...result.glassProps,
    style: {
      ...result.glassProps.style,
      transition: `all ${duration}ms ${easing}`,
    },
  };

  return {
    ...result,
    glassProps: enhancedGlassProps,
  };
}

/**
 * Hook for glass effects that adapt based on screen size
 */
export function useResponsiveGlass(
  options: UseGlassEffectsOptions & {
    mobileIntensity?: GlassIntensity;
    desktopIntensity?: GlassIntensity;
  } = {},
) {
  const {
    mobileIntensity,
    desktopIntensity,
    intensity: defaultIntensity,
    ...restOptions
  } = options;
  const [screenSize, setScreenSize] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize(
        typeof window !== "undefined" && window.innerWidth < 768
          ? "mobile"
          : "desktop",
      );
    };

    checkScreenSize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScreenSize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkScreenSize);
      }
    };
  }, []);

  const currentIntensity =
    screenSize === "mobile" && mobileIntensity
      ? mobileIntensity
      : screenSize === "desktop" && desktopIntensity
        ? desktopIntensity
        : defaultIntensity || "medium";

  return useGlassEffects({
    ...restOptions,
    intensity: currentIntensity,
  });
}
