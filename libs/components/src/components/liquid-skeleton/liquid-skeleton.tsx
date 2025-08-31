"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const liquidSkeletonVariants = cva(
  "animate-pulse rounded-lg ",
  {
    variants: {
      variant: {
        default: "",
        shimmer: "",
        pulse: "bg-white/15 animate-pulse",
        wave: "",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20",
      },
      speed: {
        slow: "animate-pulse-slow",
        normal: "",
        fast: "animate-pulse-fast",
      },
      shape: {
        rectangle: "rounded-lg",
        circle: "rounded-full",
        square: "rounded-lg aspect-square",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      speed: "normal",
      shape: "rectangle",
    },
  }
);

interface LiquidSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidSkeletonVariants> {
  width?: string | number;
  height?: string | number;
  lines?: number;
  loading?: boolean;
  children?: React.ReactNode;
}

export const LiquidSkeleton = React.forwardRef<HTMLDivElement, LiquidSkeletonProps>(
  (
    {
      className,
      variant,
      speed,
      shape,
      width,
      height,
      lines,
      loading = true,
      children,
      style,
      ...props
    },
    ref
  ) => {
    // If not loading and has children, render children
    if (!loading && children) {
      return <>{children}</>;
    }

    // If not loading and no children, render nothing
    if (!loading) {
      return null;
    }

    // Render multiple lines
    if (lines && lines > 1) {
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                liquidSkeletonVariants({ variant, speed, shape }),
                i === lines - 1 && "w-3/4", // Last line is shorter
                className
              )}
              style={{
                width: i === lines - 1 ? "75%" : width,
                height: height || "1rem",
                ...style,
              }}
            />
          ))}
        </div>
      );
    }

    // Single skeleton
    return (
      <div
        ref={ref}
        className={cn(liquidSkeletonVariants({ variant, speed, shape }), className)}
        style={{
          width,
          height,
          ...style,
        }}
        {...props}
      >
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          @keyframes wave {
            0%, 100% {
              background-position: -200% 0;
            }
            50% {
              background-position: 200% 0;
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }
          
          @keyframes pulse-fast {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite linear;
          }
          
          .animate-wave {
            animation: wave 3s infinite ease-in-out;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite;
          }
          
          .animate-pulse-fast {
            animation: pulse-fast 1s infinite;
          }
        `}</style>
      </div>
    );
  }
);

LiquidSkeleton.displayName = "LiquidSkeleton";

// Avatar Skeleton
interface LiquidAvatarSkeletonProps extends Omit<LiquidSkeletonProps, "shape"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export const LiquidAvatarSkeleton = React.forwardRef<HTMLDivElement, LiquidAvatarSkeletonProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
      "2xl": "h-20 w-20",
    };

    return (
      <LiquidSkeleton
        ref={ref}
        shape="circle"
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

LiquidAvatarSkeleton.displayName = "LiquidAvatarSkeleton";

// Button Skeleton
interface LiquidButtonSkeletonProps extends Omit<LiquidSkeletonProps, "shape"> {
  size?: "sm" | "md" | "lg" | "xl";
}

export const LiquidButtonSkeleton = React.forwardRef<HTMLDivElement, LiquidButtonSkeletonProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-20",
      md: "h-10 w-24",
      lg: "h-12 w-28",
      xl: "h-14 w-32",
    };

    return <LiquidSkeleton ref={ref} className={cn(sizeClasses[size], className)} {...props} />;
  }
);

LiquidButtonSkeleton.displayName = "LiquidButtonSkeleton";

// Card Skeleton
interface LiquidCardSkeletonProps extends Omit<LiquidSkeletonProps, "lines"> {
  showAvatar?: boolean;
  showImage?: boolean;
  lines?: number;
  imageHeight?: string | number;
}

export const LiquidCardSkeleton = React.forwardRef<HTMLDivElement, LiquidCardSkeletonProps>(
  (
    {
      showAvatar = false,
      showImage = false,
      lines = 3,
      imageHeight = "12rem",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-4 p-4", className)} {...props}>
        {/* Image */}
        {showImage && <LiquidSkeleton height={imageHeight} className="w-full" />}

        {/* Header with avatar */}
        {showAvatar && (
          <div className="flex items-center space-x-3">
            <LiquidAvatarSkeleton size="md" />
            <div className="flex-1 space-y-2">
              <LiquidSkeleton height="1rem" width="60%" />
              <LiquidSkeleton height="0.875rem" width="40%" />
            </div>
          </div>
        )}

        {/* Content lines */}
        <div className="space-y-2">
          {Array.from({ length: lines }, (_, i) => (
            <LiquidSkeleton key={i} height="0.875rem" width={i === lines - 1 ? "75%" : "100%"} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <LiquidSkeleton height="2rem" width="5rem" />
          <LiquidSkeleton height="2rem" width="4rem" />
        </div>
      </div>
    );
  }
);

LiquidCardSkeleton.displayName = "LiquidCardSkeleton";

// Text Skeleton
interface LiquidTextSkeletonProps extends Omit<LiquidSkeletonProps, "height"> {
  lines?: number;
  lineHeight?: string | number;
}

export const LiquidTextSkeleton = React.forwardRef<HTMLDivElement, LiquidTextSkeletonProps>(
  ({ lines = 1, lineHeight = "1rem", className, ...props }, ref) => {
    if (lines === 1) {
      return (
        <LiquidSkeleton
          ref={ref}
          height={lineHeight}
          className={cn("w-full", className)}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <LiquidSkeleton
            key={i}
            height={lineHeight}
            width={i === lines - 1 ? "75%" : "100%"}
            {...props}
          />
        ))}
      </div>
    );
  }
);

LiquidTextSkeleton.displayName = "LiquidTextSkeleton";

// Table Skeleton
interface LiquidTableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  variant?: VariantProps<typeof liquidSkeletonVariants>["variant"];
}

export const LiquidTableSkeleton = React.forwardRef<HTMLDivElement, LiquidTableSkeletonProps>(
  ({ rows = 5, columns = 4, showHeader = true, variant = "default", className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {/* Header */}
        {showHeader && (
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }, (_, i) => (
              <LiquidSkeleton key={`header-${i}`} height="1.5rem" variant={variant} />
            ))}
          </div>
        )}

        {/* Rows */}
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }, (_, colIndex) => (
              <LiquidSkeleton
                key={`cell-${rowIndex}-${colIndex}`}
                height="1.25rem"
                variant={variant}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
);

LiquidTableSkeleton.displayName = "LiquidTableSkeleton";

// List Skeleton
interface LiquidListSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  showAvatar?: boolean;
  showIcon?: boolean;
  variant?: VariantProps<typeof liquidSkeletonVariants>["variant"];
}

export const LiquidListSkeleton = React.forwardRef<HTMLDivElement, LiquidListSkeletonProps>(
  (
    { items = 5, showAvatar = false, showIcon = false, variant = "default", className, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {Array.from({ length: items }, (_, i) => (
          <div key={i} className="flex items-center space-x-3">
            {/* Avatar or Icon */}
            {showAvatar && <LiquidAvatarSkeleton size="sm" variant={variant} />}
            {showIcon && !showAvatar && (
              <LiquidSkeleton shape="square" className="h-4 w-4" variant={variant} />
            )}

            {/* Content */}
            <div className="flex-1 space-y-1">
              <LiquidSkeleton height="1rem" width="60%" variant={variant} />
              <LiquidSkeleton height="0.875rem" width="40%" variant={variant} />
            </div>

            {/* Trailing */}
            <LiquidSkeleton height="0.875rem" width="3rem" variant={variant} />
          </div>
        ))}
      </div>
    );
  }
);

LiquidListSkeleton.displayName = "LiquidListSkeleton";

export { liquidSkeletonVariants, type LiquidSkeletonProps };
