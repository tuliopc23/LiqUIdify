import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/glass-utils';
import { type VariantProps, cva } from 'class-variance-authority';

const skeletonVariants = cva(
  [
    'animate-pulse rounded-md',
    'bg-gradient-to-r from-white/10 via-white/20 to-white/10',
    'backdrop-blur-sm',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-white/10 via-white/20 to-white/10',
        shimmer: 'bg-white/10',
        pulse: 'bg-white/15',
      },
      size: {
        sm: 'h-4',
        md: 'h-6',
        lg: 'h-8',
        xl: 'h-10',
      },
      shape: {
        rectangle: 'rounded-md',
        circle: 'rounded-full aspect-square',
        line: 'rounded-full h-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'rectangle',
    },
  }
);

export interface GlassSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  count?: number;
  spacing?: number;
  animated?: boolean;
}

const GlassSkeleton = React.forwardRef<HTMLDivElement, GlassSkeletonProps>(
  (
    {
      className,
      variant = 'default',
      size,
      shape,
      width,
      height,
      count = 1,
      spacing = 8,
      animated = true,
      style,
      ...props
    },
    ref
  ) => {
    const shimmerAnimation = {
      x: ['-100%', '100%'],
    };

    const pulseAnimation = {
      opacity: [0.4, 1, 0.4],
    };

    const skeletonStyle = {
      width: width,
      height: height || ('circle' === shape ? width : undefined),
      ...style,
    };

    const SkeletonItem = React.forwardRef<HTMLDivElement, { index: number }>(
      ({ index }, itemRef) => (
        <motion.div
          ref={itemRef}
          className={cn(skeletonVariants({ variant, size, shape }), className)}
          style={skeletonStyle}
          initial={animated ? { opacity: 0.4 } : undefined}
          animate={
            animated
              ? ('pulse' === variant 
                ? pulseAnimation
                : { opacity: [0.4, 0.8, 0.4] })
              : undefined
          }
          transition={
            animated
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.1,
                }
              : undefined
          }
        >
          { 'shimmer' === variant && animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={shimmerAnimation}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.2,
              }}
            />
          )}
        </motion.div>
      )
    );

    if (1 === count) {
      return <SkeletonItem index={0} ref={ref} />;
    }

    return (
      <div ref={ref} className="space-y-2" style={{ gap: spacing }} {...props}>
        {Array.from({ length: count }, (_, index) => (
          <SkeletonItem key={index} index={index} />
        ))}
      </div>
    );
  }
);

GlassSkeleton.displayName = 'GlassSkeleton';

// Pre-built skeleton patterns
export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}> = ({ lines = 3, className, lastLineWidth = '60%' }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }, (_, index) => (
      <GlassSkeleton
        key={index}
        shape="line"
        width={index === lines - 1 ? lastLineWidth : '100%'}
        variant="shimmer"
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{
  className?: string;
  showAvatar?: boolean;
}> = ({ className, showAvatar = true }) => (
  <div className={cn('space-y-3 p-4', className)}>
    {showAvatar && (
      <div className="flex items-center space-x-3">
        <GlassSkeleton
          shape="circle"
          width={40}
          height={40}
          variant="shimmer"
        />
        <div className="space-y-2 flex-1">
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
  <div className={cn('space-y-3', className)}>
    {/* Header */}
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }, (_, index) => (
        <GlassSkeleton key={index} height={24} variant="shimmer" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div
        key={rowIndex}
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }, (_, colIndex) => (
          <GlassSkeleton key={colIndex} height={20} variant="pulse" />
        ))}
      </div>
    ))}
  </div>
);

export { GlassSkeleton };
