import React, { forwardRef } from 'react';
import { cn } from '@/lib/glass-utils';
import { ComponentSize } from '@/types/branded';

export interface GlassCardLiteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

/**
 * Lightweight Glass Card without animations
 * Uses CSS hover effects instead of physics animations
 * ~2KB vs ~8KB for full version
 */
export const GlassCardLite = forwardRef<HTMLDivElement, GlassCardLiteProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = true,
      children,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const variantClasses = {
      default: 'glass-card-default',
      elevated: 'glass-card-elevated shadow-xl',
      outline: 'glass-card-outline border-2',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'glass-card-lite',
          'rounded-2xl',
          'backdrop-blur-md',
          'transition-all duration-300 ease-out',
          hover && 'hover:scale-[1.02] hover:shadow-2xl',
          paddingClasses[padding as ComponentSize],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCardLite.displayName = 'GlassCardLite';
