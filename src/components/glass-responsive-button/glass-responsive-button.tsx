import React, { forwardRef, useEffect, useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn, getGlassClass } from '@/lib/glass-utils';

export interface GlassResponsiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  responsive?: boolean;
}

const GlassResponsiveButton = forwardRef<
  HTMLButtonElement,
  GlassResponsiveButtonProps
>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      fullWidth = false,
      responsive = true,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(768 > window.innerWidth && 'ontouchstart' in window);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const Comp = asChild ? Slot : 'button';

    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
      'disabled:opacity-50 disabled:cursor-not-allowed select-none',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-2',
      'transition-all duration-250 cubic-bezier(0.4, 0, 0.2, 1)',
      'will-change-transform touch-manipulation',
      fullWidth && 'w-full',
      // Enhanced interaction states
      !disabled &&
        !loading && [
          'hover:shadow-lg',
          isMobile
            ? ['active:scale-95 active:brightness-95', 'active:transition-none']
            : [
                'hover:scale-[1.02] hover:-translate-y-0.5',
                'active:scale-[0.98] active:translate-y-0',
              ],
        ]
    );

    const variantClasses = {
      primary: cn(
        'text-white font-semibold',
        'bg-gradient-to-b from-[var(--glass-primary)] to-[var(--glass-primary-active)]',
        'hover:from-[var(--glass-primary-hover)] hover:to-[var(--glass-primary)]',
        'active:from-[var(--glass-primary-active)] active:to-[var(--glass-primary-active)]',
        'shadow-lg shadow-blue-500/25 border border-blue-400/30',
        isMobile && 'active:shadow-md'
      ),
      secondary: cn(
        getGlassClass('default'),
        'text-[var(--text-primary)] border-[var(--glass-border)]',
        'hover:bg-[var(--glass-bg-elevated)] hover:border-[var(--glass-border-focus)]',
        'active:bg-[var(--glass-bg-pressed)]'
      ),
      tertiary: cn(
        'text-[var(--text-primary)] bg-transparent border border-transparent',
        'hover:bg-[var(--glass-bg)] hover:backdrop-blur-sm',
        'active:bg-[var(--glass-bg-pressed)]'
      ),
      ghost: cn(
        'text-[var(--text-secondary)] bg-transparent border border-transparent',
        'hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]',
        'active:bg-[var(--glass-bg-pressed)]'
      ),
      destructive: cn(
        'text-white font-semibold',
        'bg-gradient-to-b from-red-500 to-red-600',
        'hover:from-red-400 hover:to-red-500',
        'active:from-red-600 active:to-red-600',
        'shadow-lg shadow-red-500/25 border border-red-400/30'
      ),
    };

    const sizeClasses = responsive
      ? {
          xs: 'px-3 py-2 text-xs min-h-[36px] sm:px-2.5 sm:py-1.5 sm:min-h-[32px] sm:text-xs',
          sm: 'px-4 py-2.5 text-sm min-h-[44px] sm:px-3 sm:py-2 sm:min-h-[36px] sm:text-sm',
          md: 'px-6 py-3 text-base min-h-[48px] sm:px-4 sm:py-2.5 sm:text-sm sm:min-h-[44px]',
          lg: 'px-8 py-4 text-lg min-h-[52px] sm:px-6 sm:py-3 sm:text-base sm:min-h-[48px]',
          xl: 'px-10 py-5 text-xl min-h-[56px] sm:px-8 sm:py-4 sm:text-lg sm:min-h-[52px]',
        }
      : {
          xs: 'px-2.5 py-1.5 text-xs min-h-[32px]',
          sm: 'px-3 py-2 text-sm min-h-[36px]',
          md: 'px-4 py-2.5 text-sm min-h-[44px]',
          lg: 'px-6 py-3 text-base min-h-[48px]',
          xl: 'px-8 py-4 text-lg min-h-[52px]',
        };

    const iconSizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    };

    return (
      <Comp
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          isPressed && 'scale-95',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onMouseDown={() => !isMobile && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        {...props}
      >
        {/* Loading state overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-current/10 rounded-xl">
            <div
              className={cn(
                'animate-spin rounded-full border-2 border-current border-t-transparent',
                iconSizeClasses[size]
              )}
            />
          </div>
        )}

        <div
          className={cn(
            'flex items-center justify-center gap-2',
            loading && 'opacity-0'
          )}
        >
          {leftIcon && (
            <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
              {leftIcon}
            </span>
          )}
          <span className="truncate font-medium">{children}</span>
          {rightIcon && (
            <span className={cn('flex-shrink-0', iconSizeClasses[size])}>
              {rightIcon}
            </span>
          )}
        </div>
      </Comp>
    );
  }
);

GlassResponsiveButton.displayName = 'GlassResponsiveButton';

export { GlassResponsiveButton };
