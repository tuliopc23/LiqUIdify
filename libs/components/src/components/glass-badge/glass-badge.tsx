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
      default: "glass text-glass-text",
      success: "glass bg-green-500/20 text-green-300 border-green-400/30",
      warning: "glass bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
      error: "glass bg-red-500/20 text-red-300 border-red-400/30",
    };

    return (
    <span data-testid="badge" className={cn(
      "liquid-glass-filter",
      "liquid-glass-overlay",
      "liquid-glass-specular",
      className
    )}>
      {children}
    </span>
  );
  },
);

GlassBadge.displayName = "GlassBadge";

export { GlassBadge };
