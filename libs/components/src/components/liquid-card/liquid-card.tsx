"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidCardVariants = cva("flex flex-col transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-white/10 border-white/20",
      elevated: "bg-white/15 border-white/25 shadow-xl shadow-black/20",
      interactive:
        "cursor-pointer hover:bg-white/15 hover:border-white/25 hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1",
      navigation: "bg-white/8 border-white/15 hover:bg-white/12",
      feature: "",
      glass: "bg-white/5 border-white/10 backdrop-blur-2xl",
    },
    size: {
      sm: "p-4 rounded-xl",
      md: "p-6 rounded-2xl",
      lg: "p-8 rounded-3xl",
      xl: "p-10 rounded-3xl",
    },
    spacing: {
      none: "space-y-0",
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
      xl: "space-y-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    spacing: "md",
  },
});

interface LiquidCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidCardVariants> {
  rippleEffect?: boolean;
  hoverGlow?: boolean;
  dragPhysics?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  asChild?: boolean;
}

const LiquidCard = React.forwardRef<HTMLDivElement, LiquidCardProps>(
  (
    {
      children,
      className,
      variant,
      size,
      spacing,
      rippleEffect = false,
      hoverGlow = true,
      dragPhysics = false,
      header,
      footer,
      ...props
    },
    ref
  ) => {
    const isInteractive = variant === "interactive";

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="medium"
        rippleEffect={rippleEffect || isInteractive}
        hoverGlow={hoverGlow}
        dragPhysics={dragPhysics}
        className={cn(liquidCardVariants({ variant, size, spacing }), className)}
        {...props}
      >
        {header && <div className="flex-shrink-0 mb-4">{header}</div>}

        <div className="flex-1">{children}</div>

        {footer && <div className="flex-shrink-0 mt-4">{footer}</div>}
      </LiquidGlass>
    );
  }
);

LiquidCard.displayName = "LiquidCard";

// Sub-components for better composition
const LiquidCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5", className)} {...props} />
  )
);
LiquidCardHeader.displayName = "LiquidCardHeader";

const LiquidCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}
    {...props}
  />
));
LiquidCardTitle.displayName = "LiquidCardTitle";

const LiquidCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-white/70", className)} {...props} />
));
LiquidCardDescription.displayName = "LiquidCardDescription";

const LiquidCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex-1", className)} {...props} />
);
LiquidCardContent.displayName = "LiquidCardContent";

const LiquidCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between pt-4", className)} {...props} />
  )
);
LiquidCardFooter.displayName = "LiquidCardFooter";

export {
  LiquidCard,
  LiquidCardHeader,
  LiquidCardTitle,
  LiquidCardDescription,
  LiquidCardContent,
  LiquidCardFooter,
  liquidCardVariants,
  type LiquidCardProps,
};
