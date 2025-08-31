"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidBadgeVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-white bg-blue-500/30",
        secondary: "text-white bg-white/20",
        success: "text-white bg-green-500/30",
        warning: "text-white bg-yellow-500/30",
        danger: "text-white bg-red-500/30",
        outline: "text-white border border-white/30 bg-transparent",
        ghost: "text-white bg-white/5 hover:bg-white/10",
      },
      size: {
        xs: "h-4 px-1.5 text-xs rounded-md",
        sm: "h-5 px-2 text-xs rounded-md",
        md: "h-6 px-2.5 text-sm rounded-lg",
        lg: "h-7 px-3 text-sm rounded-lg",
        xl: "h-8 px-3.5 text-base rounded-lg",
      },
      interactive: {
        true: "cursor-pointer hover:scale-105 active:scale-95",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
);

const badgeIconVariants = cva("flex-shrink-0", {
  variants: {
    size: {
      xs: "h-2.5 w-2.5",
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4",
      xl: "h-4 w-4",
    },
    position: {
      left: "mr-1",
      right: "ml-1",
    },
  },
  defaultVariants: {
    size: "md",
    position: "left",
  },
});

const badgeDotVariants = cva("rounded-full", {
  variants: {
    size: {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3 w-3",
    },
    variant: {
      default: "bg-blue-500",
      secondary: "bg-white/60",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      danger: "bg-red-500",
      outline: "bg-white/40",
      ghost: "bg-white/30",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

interface LiquidBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidBadgeVariants> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  dot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
  href?: string;
  target?: string;
  count?: number;
  maxCount?: number;
  showZero?: boolean;
  pulsing?: boolean;
}

export const LiquidBadge = React.forwardRef<HTMLDivElement, LiquidBadgeProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      children,
      icon,
      iconPosition = "left",
      dot = false,
      dotColor,
      removable = false,
      onRemove,
      href,
      target,
      count,
      maxCount = 99,
      showZero = false,
      pulsing = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = interactive || !!onClick || !!href;
    const hasCount = count !== undefined;
    const displayCount = hasCount && (count > 0 || showZero);

    // Format count display
    const formatCount = React.useCallback(() => {
      if (!hasCount) return null;
      if (count === 0 && !showZero) return null;
      if (count > maxCount) return `${maxCount}+`;
      return count.toString();
    }, [count, maxCount, showZero, hasCount]);

    // Handle remove functionality
    const handleRemove = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove?.();
      },
      [onRemove]
    );

    // Handle click events
    const handleClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (href) {
          return; // Let the anchor handle it
        }
        onClick?.(e);
      },
      [onClick, href]
    );

    const badgeContent = (
      <>
        {/* Leading elements */}
        {dot && iconPosition === "left" && (
          <DotComponent size={size} variant={variant} pulsing={pulsing} dotColor={dotColor} />
        )}
        {icon && iconPosition === "left" && (
          <div className={cn(badgeIconVariants({ size, position: "left" }))}>{icon}</div>
        )}

        {/* Main content */}
        {displayCount ? (
          <span className="font-mono font-semibold">{formatCount()}</span>
        ) : (
          children && <span>{children}</span>
        )}

        {/* Trailing elements */}
        {icon && iconPosition === "right" && (
          <div className={cn(badgeIconVariants({ size, position: "right" }))}>{icon}</div>
        )}
        {dot && iconPosition === "right" && (
          <DotComponent size={size} variant={variant} pulsing={pulsing} dotColor={dotColor} />
        )}
        {removable && <RemoveIcon size={size} onRemove={handleRemove} />}
      </>
    );

    const badgeElement = (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(
          liquidBadgeVariants({ variant, size, interactive: isInteractive }),
          pulsing && "animate-pulse",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {badgeContent}
      </LiquidGlass>
    );

    // Wrap in anchor if href is provided
    if (href) {
      return (
        <a href={href} target={target} className="inline-flex">
          {badgeElement}
        </a>
      );
    }

    return badgeElement;
  }
);

LiquidBadge.displayName = "LiquidBadge";

// Remove icon component (moved outside for performance)
const RemoveIcon = React.memo<{
  size: "xs" | "sm" | "md" | "lg" | "xl";
  onRemove?: () => void;
}>(({ size, onRemove }) => (
  <button
    type="button"
    onClick={onRemove}
    onKeyDown={(e) => e.key === "Enter" && onRemove?.()}
    className={cn(
      badgeIconVariants({ size, position: "right" }),
      "hover:text-white/80 focus:outline-none focus:ring-1 focus:ring-white/50 rounded-sm"
    )}
    aria-label="Remove badge"
  >
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
      <title>Remove</title>
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
));

RemoveIcon.displayName = "RemoveIcon";

// Dot component (moved outside for performance)
const DotComponent = React.memo<{
  size: "xs" | "sm" | "md" | "lg" | "xl";
  variant: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "ghost";
  pulsing?: boolean;
  dotColor?: string;
}>(({ size, variant, pulsing, dotColor }) => (
  <div
    className={cn(badgeDotVariants({ size, variant }), pulsing && "animate-pulse")}
    style={dotColor ? { backgroundColor: dotColor } : undefined}
  />
));

DotComponent.displayName = "DotComponent";

// Badge Group component for displaying multiple badges
interface LiquidBadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "tight" | "normal" | "loose";
  wrap?: boolean;
  children: React.ReactNode;
}

const badgeGroupVariants = cva("flex items-center", {
  variants: {
    spacing: {
      tight: "gap-1",
      normal: "gap-2",
      loose: "gap-3",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    spacing: "normal",
    wrap: false,
  },
});

export const LiquidBadgeGroup = React.forwardRef<HTMLDivElement, LiquidBadgeGroupProps>(
  ({ className, spacing = "normal", wrap = false, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeGroupVariants({ spacing, wrap }), className)} {...props}>
        {children}
      </div>
    );
  }
);

LiquidBadgeGroup.displayName = "LiquidBadgeGroup";

export {
  liquidBadgeVariants,
  badgeIconVariants,
  badgeDotVariants,
  badgeGroupVariants,
  type LiquidBadgeProps,
};
