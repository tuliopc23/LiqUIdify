import { forwardRef } from "react";
import { cn } from "../../core/utils/classname";

interface GlassBadgeProps
  extends Omit<
    React.HTMLAttributes<HTMLSpanElement>,
    keyof React.AriaAttributes
  > {
  variant?: "default" | "success" | "warning" | "error";
}

const GlassBadge = forwardRef<HTMLSpanElement, GlassBadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "liquid-glass text-liquid-primary",
      success:
        "liquid-glass bg-green-500/20 text-green-300 border-green-400/30",
      warning:
        "liquid-glass bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
      error: "liquid-glass bg-red-500/20 text-red-300 border-red-400/30",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center",
          "liquid-glass-sm px-3 py-1 font-medium text-xs",
          "transition-all duration-200 will-change-transform",
          "motion-safe:hover:scale-105",
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {/* Glass effect layers for non-default variants */}
        {variant !== "default" && (
          <>
            <div className="liquid-glass-filter" />
            <div className="liquid-glass-overlay" />
            <div className="liquid-glass-specular" />
          </>
        )}

        {/* Badge content */}
        <span className="relative z-10">{props.children}</span>
      </span>
    );
  },
);

GlassBadge.displayName = "GlassBadge";

export { GlassBadge };
export default GlassBadge;
