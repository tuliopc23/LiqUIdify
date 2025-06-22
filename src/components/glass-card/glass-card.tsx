import { forwardRef } from "react";
import { cn, getGlassClass, microInteraction } from "@/lib/glass-utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "pressed";
  hover?: boolean;
  bordered?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    variant = "default", 
    hover = true, 
    bordered = true,
    padding = "md",
    ...props 
  }, ref) => {
    const variantClasses = {
      default: getGlassClass("default"),
      elevated: getGlassClass("elevated"),
      outlined: "bg-transparent border-2 border-[var(--glass-border)]",
      pressed: cn(getGlassClass("pressed"), "shadow-inner")
    };

    const paddingClasses = {
      none: "",
      sm: "p-3",
      md: "p-6", 
      lg: "p-8",
      xl: "p-12"
    };

    const baseClasses = cn(
      "rounded-xl",
      variantClasses[variant],
      paddingClasses[padding],
      bordered && variant !== "outlined" && "border border-[var(--glass-border)]",
      hover && "glass-hover cursor-pointer",
      microInteraction.smooth,
      "will-change-transform"
    );

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
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
