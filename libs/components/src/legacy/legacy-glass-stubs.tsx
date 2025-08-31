import type React from "react";

/**
 * @deprecated UnifiedGlassProvider has been removed. Components no longer require this provider.
 * This stub is provided for backwards compatibility and will be removed in v2.0.0.
 * Please remove any usage of UnifiedGlassProvider from your code.
 */
export const UnifiedGlassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "DEPRECATED: UnifiedGlassProvider is no longer needed and will be removed in v2.0.0. " +
        "Please remove this provider from your component tree."
    );
  }
  return <>{children}</>;
};

/**
 * @deprecated LiquidGlassDefs has been removed. Glass effects are no longer part of the design system.
 * This stub is provided for backwards compatibility and will be removed in v2.0.0.
 * Please remove any usage of LiquidGlassDefs from your code.
 */
export const LiquidGlassDefs: React.FC = () => {
  if (process.env.NODE_ENV === "development") {
    console.warn(
      "DEPRECATED: LiquidGlassDefs is no longer needed and will be removed in v2.0.0. " +
        "Please remove this component from your JSX."
    );
  }
  return null;
};

// Export types for backwards compatibility
/**
 * @deprecated LiquidGlassProps type has been removed.
 * This is provided for backwards compatibility and will be removed in v2.0.0.
 */
export interface LiquidGlassProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * @deprecated GlassVariant type has been removed.
 * Use standard component variant types instead.
 */
export type GlassVariant = "default" | "primary" | "secondary" | "ghost";
