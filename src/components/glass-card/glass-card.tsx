import { forwardRef } from "react";
import { cn } from "@/lib/glass-utils";
import { GlassSurface, type GlassSurfaceProps } from "@/components/glass-foundation";

export interface GlassCardProps extends Omit<GlassSurfaceProps, 'variant'> {
  variant?: "default" | "elevated" | "outlined" | "pressed";
  hover?: boolean;
  hoverable?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    variant = "default", 
    hover = true,
    elevation,
    padding = "md",
    ...props 
  }, ref) => {
    // Map card variants to foundation variants and elevations
    const variantMap = {
      default: { elevation: "low" as const, glassVariant: "default" as const },
      elevated: { elevation: "medium" as const, glassVariant: "elevated" as const },
      outlined: { elevation: "flat" as const, glassVariant: "default" as const, border: true },
      pressed: { elevation: "flat" as const, glassVariant: "pressed" as const }
    };

    const config = variantMap[variant];
    
    return (
      <GlassSurface
        ref={ref}
        variant={config.glassVariant}
        elevation={elevation || config.elevation}
        padding={padding}
        interactive={hover}
        hoverable={hover}
        className={cn(
          variant === "outlined" && "bg-transparent border-2",
          variant === "pressed" && "shadow-inner",
          hover && "cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

const GlassCardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));

GlassCardHeader.displayName = "GlassCardHeader";

const GlassCardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold text-primary", className)}
    {...props}
  />
));

GlassCardTitle.displayName = "GlassCardTitle";

const GlassCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-secondary", className)} {...props} />
));

GlassCardDescription.displayName = "GlassCardDescription";

const GlassCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));

GlassCardContent.displayName = "GlassCardContent";

const GlassCardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));

GlassCardFooter.displayName = "GlassCardFooter";

export {
  GlassCard,
  GlassCardHeader,
  GlassCardFooter,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
};
