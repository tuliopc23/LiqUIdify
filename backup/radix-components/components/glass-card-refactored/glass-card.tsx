/**
 * Liquid Glass Card Component
 *
 * Implements the signature liquid glass effect with layered approach,
 * using the glass-container, glass-filter, glass-overlay, glass-specular system.
 */

import type React from "react";
import { createContext, forwardRef } from "react";
import { cn } from "../../core/utils/classname";

// Types
type Size = "sm" | "md" | "lg" | "xl";
type Variant = "default" | "elevated" | "outlined" | "interactive";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children?: React.ReactNode;
  /** Card size */
  size?: Size;
  /** Card variant */
  variant?: Variant;
  /** Interactive card (clickable) */
  interactive?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Additional CSS classes */
  className?: string;
}

interface CardContextValue {
  size: Size;
  variant: Variant;
  interactive: boolean;
  selected: boolean;
}

// Card Context
const CardContext = createContext<CardContextValue>({
  size: "md",
  variant: "default",
  interactive: false,
  selected: false,
});

// Size configurations
const sizeConfig = {
  sm: "",
  md: "",
  lg: "",
  xl: "",
};

// Variant configurations
const variantConfig = {
  default: "",
  elevated: " ",
  outlined: " border-2 border-blue-200",
  interactive: " cursor-pointer",
};

// Main Card Component using layered approach
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      size = "md",
      variant = "default",
      interactive = false,
      selected = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const contextValue: CardContextValue = {
      size,
      variant,
      interactive,
      selected,
    };

    const cardClasses = cn(
      // Use the layered liquid glass container system
      "",

      // Size and variant
      sizeConfig[size],
      variantConfig[variant],

      // Interactive states
      {
        " cursor-pointer": interactive || onClick,
        "ring-2 ring-liquid-accent": selected,
      },

      className
    );

    return (
      <CardContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cardClasses}
          onClick={onClick}
          role={interactive || onClick ? "button" : undefined}
          tabIndex={interactive || onClick ? 0 : undefined}
          {...props}
        >
          {/* Glass Filter Layer */}
          <div />

          {/* Glass Overlay Layer */}
          <div />

          {/* Glass Specular Layer */}
          <div />

          {/* Content Layer */}
          <div className="flex-col items-start justify-start">{children}</div>
        </div>
      </CardContext.Provider>
    );
  }
);

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

// Card Title Component
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, as: Component = "h3", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-xl font-semibold leading-none tracking-tight text-blue-900", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

// Card Description Component
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-blue-700 leading-relaxed", className)} {...props}>
        {children}
      </p>
    );
  }
);

// Card Content Component
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex-1", className)} {...props}>
        {children}
      </div>
    );
  }
);

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center pt-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

// Card Actions Component
interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between pt-4 space-x-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Define compound component type
interface GlassCardComponent
  extends React.ForwardRefExoticComponent<GlassCardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Actions: typeof CardActions;
}

// Set display names
GlassCard.displayName = "GlassCard";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
CardActions.displayName = "CardActions";

// Cast to include compound components
const TypedGlassCard = GlassCard as GlassCardComponent;

// Compound component pattern
TypedGlassCard.Header = CardHeader;
TypedGlassCard.Title = CardTitle;
TypedGlassCard.Description = CardDescription;
TypedGlassCard.Content = CardContent;
TypedGlassCard.Footer = CardFooter;
TypedGlassCard.Actions = CardActions;

// Export the main component and also a simplified alias
export { TypedGlassCard };
export { TypedGlassCard as Card };
export default TypedGlassCard;

// Export types
export type {
  GlassCardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardActionsProps,
  Size as CardSize,
  Variant as CardVariant,
};
