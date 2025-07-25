import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/core/utils/classname';
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from '../../lib/variant-system';

const spinnerVariants = cva(
  ['inline-block rounded-full', 'border-2 border-solid'],

  {
    variants: {
      variant: {
        default: 'border-white/20 border-t-blue-400',
        primary: 'border-white/20 border-t-blue-500',
        secondary: 'border-white/20 border-t-purple-400',
        success: 'border-white/20 border-t-green-400',
        warning: 'border-white/20 border-t-yellow-400',
        error: 'border-white/20 border-t-red-400',
        glass: 'border-white/10 border-t-white/50 backdrop-blur-sm',
      },
      size: {
        xs: 'h-3 w-3 border',
        sm: 'h-4 w-4 border',
        md: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-2',
        xl: 'h-12 w-12 border-2',
        '2xl': 'h-16 w-16 border-4',
      },
      speed: {
        slow: 'animate-spin-slow',
        normal: 'animate-spin',
        fast: 'animate-spin-fast',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      speed: 'normal',
    },
  }
);

const containerVariants = cva('flex items-center justify-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row space-x-2',
      vertical: 'flex-col space-y-2',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface GlassSpinnerProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      keyof React.AriaAttributes
    >,
    VariantProps<typeof spinnerVariants>,
    VariantProps<typeof containerVariants> {
  label?: string;

  showLabel?: boolean;

  centered?: boolean;
}

const GlassSpinner = React.forwardRef<HTMLDivElement, GlassSpinnerProps>(
  (
    {
      className,
      variant,
      size,
      speed,
      orientation,
      label = 'Loading...',
      showLabel = false,
      centered = false,
      ...props
    },
    ref
  ) => {
    const SpinnerElement = () => (
      <motion.div
        className={cn(spinnerVariants({ variant, size, speed }), className)}
        animate={{ rotate: 360 }}
        transition={{
          duration: 'slow' === speed ? 2 : 'fast' === speed ? 0.5 : 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        role="status"
        aria-label={label}
      />
    );

    const content = (
      <div
        ref={ref}
        className={cn(
          containerVariants({ orientation }),
          centered && 'fixed inset-0 z-50 bg-black/20 backdrop-blur-sm',
          className
        )}
        {...(props as any)}
      >
        <SpinnerElement />
        {showLabel && (
          <span className="select-none text-sm text-white/70">{label}</span>
        )}
      </div>
    );

    return content;
  }
);

// Pulse spinner variant
export const PulseSpinner: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}> = ({ className, size = 'md', color = 'white' }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full', sizeClasses[size], `bg-${color}/50`)}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Dots spinner variant
export const DotsSpinner: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  count?: number;
}> = ({ className, size = 'md', count = 3 }) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={cn('rounded-full bg-white/60', sizeClasses[size])}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Ring spinner variant
export const RingSpinner: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  thickness?: number;
}> = ({ className, size = 'md', thickness = 2 }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <motion.div
      className={cn(
        'rounded-full border-white/20',
        sizeClasses[size],
        className
      )}
      style={{
        borderWidth: thickness,
        borderTopColor: 'rgba(59, 130, 246, 0.8)',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// Glass wave spinner
export const WaveSpinner: React.FC<{
  className?: string;
  bars?: number;
}> = ({ className, bars = 5 }) => {
  return (
    <div className={cn('flex items-end space-x-1', className)}>
      {Array.from({ length: bars }).map((_, index) => (
        <motion.div
          key={index}
          className="w-1 rounded-full bg-gradient-to-t from-blue-400 to-purple-400"
          animate={{
            height: [8, 24, 8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

GlassSpinner.displayName = 'GlassSpinner';

export { GlassSpinner };
