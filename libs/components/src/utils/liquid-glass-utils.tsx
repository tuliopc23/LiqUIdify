/**
 * Liquid Glass Utilities
 * Helper functions and hooks for integrating liquid glass effects
 */

import React, { forwardRef, useCallback, useMemo } from "react";
import {
  LiquidGlass,
  type LiquidGlassProps,
} from "../components/liquid-glass/liquid-glass";
import { useDeviceCapabilities } from "../hooks/use-device-capabilities";
import type {
  LiquidGlassVariant,
  LiquidGlassComponentVariant,
  LiquidGlassPerformance,
} from "../types/liquid-glass";

/**
 * HOC to wrap any component with liquid glass effects
 */
export function withLiquidGlass<P extends object>(
  Component: React.ComponentType<P>,
  defaultProps?: Partial<LiquidGlassProps>,
) {
  const WithLiquidGlassComponent = forwardRef<
    any,
    P & Partial<LiquidGlassProps>
  >(
    (
      {
        // Extract liquid glass props
        variant,
        size,
        shape,
        effect,
        elevation,
        animation,
        interactive,
        layered,
        blur,
        blurStrength,
        adaptive,
        performanceMode,
        liquidGlassClassName,
        ...componentProps
      },
      ref,
    ) => {
      const liquidGlassProps: LiquidGlassProps = {
        ...defaultProps,
        variant,
        size,
        shape,
        effect,
        elevation,
        animation,
        interactive,
        layered,
        blur,
        blurStrength,
        adaptive,
        performanceMode,
        className: liquidGlassClassName,
      };

      return (
        <LiquidGlass {...liquidGlassProps}>
          <Component {...(componentProps as P)} ref={ref} />
        </LiquidGlass>
      );
    },
  );

  WithLiquidGlassComponent.displayName = `withLiquidGlass(${Component.displayName || Component.name || "Component"})`;

  return WithLiquidGlassComponent;
}

/**
 * Hook for dynamic liquid glass effects based on state
 */
export function useLiquidGlass(options?: {
  baseVariant?: LiquidGlassVariant | LiquidGlassComponentVariant;
  hoverVariant?: LiquidGlassVariant;
  activeVariant?: LiquidGlassVariant;
  focusVariant?: LiquidGlassVariant;
  disabledVariant?: LiquidGlassVariant;
  performanceMode?: LiquidGlassPerformance;
}) {
  const capabilities = useDeviceCapabilities();

  const getVariant = useCallback(
    (state: {
      isHovered?: boolean;
      isActive?: boolean;
      isFocused?: boolean;
      isDisabled?: boolean;
    }) => {
      const { isHovered, isActive, isFocused, isDisabled } = state;

      if (isDisabled && options?.disabledVariant)
        return options.disabledVariant;
      if (isActive && options?.activeVariant) return options.activeVariant;
      if (isFocused && options?.focusVariant) return options.focusVariant;
      if (isHovered && options?.hoverVariant) return options.hoverVariant;

      return options?.baseVariant || "default";
    },
    [options],
  );

  const getPerformanceMode = useCallback((): LiquidGlassPerformance => {
    if (options?.performanceMode) return options.performanceMode;

    // Auto-detect based on capabilities
    if (!capabilities.hasBackdropFilter || !capabilities.hasSVGFilters)
      return "low";
    if (capabilities.performanceTier === "low") return "low";
    if (
      capabilities.performanceTier === "high" &&
      !capabilities.prefersReducedMotion
    )
      return "high";

    return "medium";
  }, [capabilities, options?.performanceMode]);

  const liquidGlassProps = useMemo(
    () => ({
      adaptive: true,
      performanceMode: getPerformanceMode(),
      interactive: !!(
        options?.hoverVariant ||
        options?.activeVariant ||
        options?.focusVariant
      ),
    }),
    [getPerformanceMode, options],
  );

  return {
    getVariant,
    getPerformanceMode,
    liquidGlassProps,
    capabilities,
  };
}

/**
 * Preset configurations for common use cases
 */
export const liquidGlassPresets = {
  card: {
    variant: "frosted" as LiquidGlassVariant,
    size: "md" as const,
    elevation: "md" as const,
    layered: true,
    blur: true,
    blurStrength: "md" as const,
  },
  button: {
    variant: "solid" as LiquidGlassVariant,
    size: "md" as const,
    interactive: true,
    animation: "none" as const,
  },
  modal: {
    variant: "translucent" as LiquidGlassVariant,
    size: "lg" as const,
    elevation: "xl" as const,
    layered: true,
    blur: true,
    blurStrength: "lg" as const,
  },
  nav: {
    variant: "frosted" as LiquidGlassVariant,
    blur: true,
    blurStrength: "md" as const,
    elevation: "sm" as const,
  },
  hero: {
    variant: "aurora" as LiquidGlassVariant,
    size: "2xl" as const,
    animation: "shimmer" as const,
    layered: true,
  },
  input: {
    variant: "outlined" as LiquidGlassVariant,
    size: "md" as const,
    interactive: true,
  },
  notification: {
    variant: "translucent" as LiquidGlassVariant,
    size: "sm" as const,
    elevation: "lg" as const,
    blur: true,
    animation: "float" as const,
  },
};

/**
 * Utility to combine liquid glass classes with component classes
 */
export function mergeLiquidGlassClasses(
  liquidGlassClasses: string,
  componentClasses?: string,
): string {
  // Remove duplicate liquid-glass base classes
  const liquidSet = new Set(liquidGlassClasses.split(" "));
  const componentSet = new Set(componentClasses?.split(" ") || []);

  // Remove liquid-glass classes from component if they exist
  componentSet.forEach((cls) => {
    if (cls.startsWith("liquid-glass")) {
      componentSet.delete(cls);
    }
  });

  return [...liquidSet, ...componentSet].join(" ");
}

/**
 * Create a liquid glass wrapper component with preset
 */
export function createLiquidGlassComponent<P extends object>(
  Component: React.ComponentType<P>,
  preset: keyof typeof liquidGlassPresets | Partial<LiquidGlassProps>,
) {
  const presetProps =
    typeof preset === "string" ? liquidGlassPresets[preset] : preset;

  return withLiquidGlass(Component, presetProps);
}
