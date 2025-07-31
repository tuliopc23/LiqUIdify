import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/core/utils/classname";
import { createVariants as cva } from "../../lib/variant-system";

const skeletonVariants = cva({
  base: "relative animate-pulse overflow-hidden rounded-md bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-sm",
  variants: {
    variant: {
      default: "bg-gradient-to-r from-white/10 via-white/20 to-white/10",
      shimmer: "bg-white/10",
      pulse: "bg-white/15",
    },
    size: {
      sm: "h-4",
      md: "h-6",
      lg: "h-8",
      xl: "h-10",
    },
    shape: {
      rectangle: "rounded-md",
      circle: "aspect-square rounded-full",
      line: "h-2 rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "rectangle",
  },
});

interface GlassSkeletonProps {
  width?: string | number;
  height?: string | number;
  count?: number;
  spacing?: number;
  animated?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  variant?: "default" | "shimmer" | "pulse";
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "rectangle" | "circle" | "line";
}

const GlassSkeleton = React.forwardRef<HTMLDivElement, GlassSkeletonProps>(
  (
    {
      className,
      variant = "default",
      size,
      shape,
      width,
      height,
      count = 1,
      spacing = 8,
      animated = true,
      style,
    },
    ref,
  ) => {
    const shimmerAnimation = {
      x: ["-100%", "100%"],
    };

    const pulseAnimation = {
      opacity: [0.4, 1, 0.4],
    };

    const skeletonStyle = {
      width: width || undefined,
      height: height || (shape === "circle" ? width : undefined),
      ...style,
    };

    const SkeletonItem = React.forwardRef<HTMLDivElement, { index: number }>(
      ({ index }, itemRef) => (
        <motion.div
          ref={itemRef}
          className={cn(skeletonVariants({ variant, size, shape }), className)}
          style={skeletonStyle}
          initial={animated ? { opacity: 0.4 } : false}
          animate={
            animated
              ? variant === "pulse"
                ? pulseAnimation
                : { opacity: [0.4, 0.8, 0.4] }
              : false
          }
          transition={
            animated
              ? {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }
              : undefined
          }
        >
          {variant === "shimmer" && animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={shimmerAnimation}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: index * 0.2,
              }}
            />
          )}
        </motion.div>
      ),
    );

    if (count === 1) {
      return <SkeletonItem index={0} ref={ref} />;
    }

    return (
      <div ref={ref} className="space-y-2" style={{ gap: spacing }}>
        {Array.from({ length: count }, (_, index) => (
          <SkeletonItem key={`skeleton-${index}`} index={index} />
        ))}
      </div>
    );
  },
);

GlassSkeleton.displayName = "GlassSkeleton";

// Pre-built skeleton patterns
export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}> = ({ lines = 3, className, lastLineWidth = "60%" }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }, (_, index) => (
      <GlassSkeleton
        key={`text-${index}`}
        shape="line"
        width={index === lines - 1 ? lastLineWidth : "100%"}
        variant="shimmer"
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{
  className?: string;
  showAvatar?: boolean;
}> = ({ className, showAvatar = true }) => (
  <div className={cn("space-y-3 p-4", className)}>
    {showAvatar && (
      <div className="flex items-center space-x-3">
        <GlassSkeleton
          shape="circle"
          width={40}
          height={40}
          variant="shimmer"
        />
        <div className="flex-1 space-y-2">
          <GlassSkeleton width="40%" height={16} variant="shimmer" />
          <GlassSkeleton width="60%" height={12} variant="shimmer" />
        </div>
      </div>
    )}
    <div className="space-y-2">
      <GlassSkeleton width="100%" height={20} variant="shimmer" />
      <SkeletonText lines={3} />
    </div>
  </div>
);

export const SkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className }) => (
  <div className={cn("space-y-3", className)}>
    {/* Header */}
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }, (_, index) => (
        <GlassSkeleton key={`header-${index}`} height={24} variant="shimmer" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }, (_, colIndex) => (
          <GlassSkeleton
            key={`cell-${rowIndex}-${colIndex}`}
            height={20}
            variant="pulse"
          />
        ))}
      </div>
    ))}
  </div>
);

export { GlassSkeleton };
