import { Loader2 } from 'lucide-react';
import type React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/core/utils/classname';

export interface GlassButtonLiteProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Lightweight Glass Button without animations
 * Uses CSS transitions instead of GSAP/Framer Motion
 * ~3KB vs ~15KB for full version
 */
export const GlassButtonLite = forwardRef<
  HTMLButtonElement,
  GlassButtonLiteProps
>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
    };

    const variantClasses = {
      primary: 'glass-button-primary text-white',
      secondary: 'glass-button-secondary',
      ghost: 'glass-button-ghost',
      destructive: 'glass-button-destructive',
    };

    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          'glass-button-lite',
          'inline-flex items-center justify-center',
          'rounded-lg font-medium',
          'transition-all duration-200 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />

            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}

            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

GlassButtonLite.displayName = 'GlassButtonLite';
