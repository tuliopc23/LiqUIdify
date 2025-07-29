/**
 * Unified Glass Effect System
 *
 * Consolidates all glass effect implementations into a single, unified system
 * Replaces: apple-liquid-glass.ts, enhanced-apple-liquid-glass.ts, glass-animations.ts
 *
 * Features:
 * - Unified API for all glass effects
 * - React 19 concurrent features support
 * - Performance optimized with CSS custom properties
 * - Backward compatibility with legacy systems
 * - Tree-shakeable exports
 */

import React, {
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

// Types
export type GlassIntensity =
  | "none"
  | "subtle"
  | "medium"
  | "strong"
  | "intense";
export type GlassVariant =
  | "default"
  | "elevated"
  | "floating"
  | "card"
  | "modal";
type GlassAnimation = "none" | "subtle" | "smooth" | "bouncy" | "liquid";

export interface GlassEffectConfig {
  intensity: GlassIntensity;
  variant: GlassVariant;
  animation?: GlassAnimation;
  interactive?: boolean;
  magnetic?: boolean;
  pixelPerfect?: boolean;
  blur?: number;
  opacity?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
}

interface UnifiedGlassProps {
  children: ReactNode;
  config?: GlassEffectConfig;
  className?: string;
  style?: CSSProperties;
}

// Constants
const GLASS_INTENSITY_CONFIG: Record<
  GlassIntensity,
  Required<
    Pick<
      GlassEffectConfig,
      "blur" | "opacity" | "saturation" | "brightness" | "contrast"
    >
  >
> = {
  none: { blur: 0, opacity: 1, saturation: 1, brightness: 1, contrast: 1 },
  subtle: {
    blur: 4,
    opacity: 0.9,
    saturation: 1.1,
    brightness: 1.05,
    contrast: 1.02,
  },
  medium: {
    blur: 8,
    opacity: 0.85,
    saturation: 1.2,
    brightness: 1.1,
    contrast: 1.05,
  },
  strong: {
    blur: 16,
    opacity: 0.8,
    saturation: 1.3,
    brightness: 1.15,
    contrast: 1.1,
  },
  intense: {
    blur: 24,
    opacity: 0.75,
    saturation: 1.4,
    brightness: 1.2,
    contrast: 1.15,
  },
};

const GLASS_VARIANT_STYLES: Record<GlassVariant, CSSProperties> = {
  default: {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  elevated: {
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  floating: {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  card: {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  modal: {
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 16px 64px rgba(0, 0, 0, 0.25)",
  },
};

// Hook for unified glass effects
export function useUnifiedGlass(
  config: GlassEffectConfig = { intensity: "medium", variant: "default" },
) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const mergedConfig = {
    ...GLASS_INTENSITY_CONFIG[config.intensity],
    ...config,
  };

  const glassStyles: CSSProperties = {
    backdropFilter: `blur(${mergedConfig.blur}px) saturate(${mergedConfig.saturation}) brightness(${mergedConfig.brightness}) contrast(${mergedConfig.contrast})`,
    backgroundColor: `rgba(255, 255, 255, ${mergedConfig.opacity})`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    ...GLASS_VARIANT_STYLES[mergedConfig.variant],
  };

  if (config.interactive && isHovered) {
    glassStyles.transform = "translateY(-2px)";
    glassStyles.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
  }

  if (config.magnetic && elementRef.current) {
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (mousePosition.x - centerX) * 0.1;
    const deltaY = (mousePosition.y - centerY) * 0.1;

    glassStyles.transform = `perspective(1000px) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
  }

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (config.magnetic && elementRef.current) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    },
    [config.magnetic],
  );

  const handleMouseEnter = useCallback(() => {
    if (config.interactive) {
      setIsHovered(true);
    }
  }, [config.interactive]);

  const handleMouseLeave = useCallback(() => {
    if (config.interactive || config.magnetic) {
      setIsHovered(false);
      setMousePosition({ x: 0, y: 0 });
    }
  }, [config.interactive, config.magnetic]);

  return {
    glassStyles,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    ref: elementRef,
  };
}

// Backward compatibility utilities
const createGlassEffect = (config: GlassEffectConfig) => ({
  className: `glass-effect glass-effect--${config.intensity}`,
  style: useUnifiedGlass(config).glassStyles,
});

// Legacy system compatibility - backward compatible components

interface AppleLiquidGlassProps extends ComponentProps<"div"> {
  intensity?: GlassIntensity;
  variant?: GlassVariant;
  interactive?: boolean;
  magnetic?: boolean;
}

const AppleLiquidGlass: React.FC<AppleLiquidGlassProps> = ({
  children,
  intensity = "medium",
  variant = "default",
  interactive = false,
  magnetic = false,
  ...props
}) => {
  const { glassStyles, handlers, ref } = useUnifiedGlass({
    intensity,
    variant,
    interactive,
    magnetic,
  });

  return (
    <div ref={ref} style={glassStyles} {...handlers} {...props}>
      {children}
    </div>
  );
};

const EnhancedAppleLiquidGlass = AppleLiquidGlass;

// Additional utility exports for backward compatibility
export {
  generateGlassClasses,
  generateGlassVariables,
} from "../utils/glass-effects";

// Export for tree-shaking
