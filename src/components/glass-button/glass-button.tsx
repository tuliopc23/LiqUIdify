import { forwardRef, useState, useRef, useCallback } from 'react';
import { cn, getGlassClass, microInteraction } from '@/lib/glass-utils';
import { useMagneticHover, createGlassRipple } from '@/lib/glass-physics';
import { useLiquidGlass } from '@/hooks/use-liquid-glass';
import { useGlassEffectPerformance } from '@/hooks/use-performance-monitor';
import { Slot } from '@radix-ui/react-slot';

/**
 * Props for the GlassButton component
 */
export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Render as child component */
  asChild?: boolean;
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Show loading state */
  loading?: boolean;
}

/**
 * A premium glass-effect button component with advanced visual effects.
 *
 * Features:
 * - Multiple variants (primary, secondary, tertiary, ghost, destructive)
 * - 5 size options (xs, sm, md, lg, xl)
 * - Loading states with spinner
 * - Left and right icons
 * - Glass morphism effects with backdrop blur
 * - Magnetic hover interactions
 * - Haptic feedback support
 * - Accessibility compliant
 *
 * @example
 * ```tsx
 * <GlassButton variant="primary" size="md" leftIcon={<PlayIcon />}>
 *   Play Video
 * </GlassButton>
 * ```
 */
const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);
    const internalButtonRef = useRef<HTMLButtonElement | null>(null);
    const { magneticHover, specularHighlights } = useLiquidGlass();
    const { elementRef: magneticRef, transform } = useMagneticHover(0.3, 120);
    const { measureGlassInteraction } = useGlassEffectPerformance('Button');

    // Callback ref to handle both internal and external refs, including magnetic ref
    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        // Set internal ref
        if (internalButtonRef.current !== node) {
          (
            internalButtonRef as React.MutableRefObject<HTMLButtonElement | null>
          ).current = node;
        }
        // Assign to magnetic ref if enabled
        if (magneticHover && magneticRef && 'current' in magneticRef) {
          (magneticRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
        }
        // Assign to forwarded ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
        }
      },
      [magneticHover, magneticRef, ref]
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const endMeasure = measureGlassInteraction('click');

      if (internalButtonRef.current && !disabled && !loading) {
        const rect = internalButtonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createGlassRipple(
          internalButtonRef.current,
          x,
          y,
          'rgba(255, 255, 255, 0.3)'
        );
      }

      props.onClick?.(e);
      endMeasure();
    };

    const baseClasses = cn(
      'liquid-glass liquid-glass-interactive font-medium rounded-xl relative overflow-hidden',
      'focus:outline-none liquid-glass-focus liquid-glass-ripple', // Ensure liquid-glass-focus provides a visible focus ring
      microInteraction.smooth,
      'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
      specularHighlights && 'liquid-glass-specular liquid-glass-shimmer',
      magneticHover && 'liquid-glass-magnetic',
      isPressed && 'scale-[0.98] brightness-95'
    );

    const variantClasses = {
      primary: cn(
        'text-white dark:text-white font-semibold',
        'bg-gradient-to-b',
        'from-blue-500 to-blue-600', // Fallback colors
        'hover:from-blue-400 hover:to-blue-500',
        'active:from-blue-600 active:to-blue-600',
        'shadow-lg shadow-blue-500/25',
        'border border-blue-400/30',
        // Light theme: dark text on glass background
        'light:text-slate-800 light:from-white/80 light:to-gray-50/90',
        'light:hover:from-white/90 light:hover:to-gray-100/95',
        'light:border-gray-300/50 light:shadow-gray-500/20'
      ),
      secondary: cn(
        getGlassClass('default'),
        'text-gray-900 dark:text-white', // Fallback text colors
        'border-gray-200 dark:border-gray-700', // Fallback border
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'active:bg-gray-100 dark:active:bg-gray-700'
      ),
      tertiary: cn(
        'text-gray-900 dark:text-white bg-transparent',
        'hover:bg-gray-50 dark:hover:bg-gray-800 hover:backdrop-blur-sm',
        'active:bg-gray-100 dark:active:bg-gray-700'
      ),
      ghost: cn(
        'text-gray-600 dark:text-gray-400 bg-transparent',
        'hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800',
        'active:bg-gray-100 dark:active:bg-gray-700'
      ),
      destructive: cn(
        'text-white font-semibold',
        'bg-gradient-to-b from-red-500 to-red-600',
        'hover:from-red-400 hover:to-red-500',
        'active:from-red-600 active:to-red-600',
        'shadow-lg shadow-red-500/25',
        'border border-red-400/30'
      ),
    };

    const sizeClasses = {
      xs: 'px-2.5 py-1.5 text-xs min-h-[28px]',
      sm: 'px-3 py-2 text-sm min-h-[32px]',
      md: 'px-4 py-2.5 text-sm min-h-[40px]',
      lg: 'px-6 py-3 text-base min-h-[44px]',
      xl: 'px-8 py-4 text-lg min-h-[52px]',
    };

    const iconSizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    };

    if (asChild) {
      return (
        <Slot
          ref={setRefs}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          style={{
            transform: magneticHover ? transform : undefined,
            ...props.style,
          }}
          data-disabled={disabled || loading}
          aria-busy={loading ? true : undefined}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={setRefs}
        style={{
          transform: magneticHover ? transform : undefined,
          ...props.style,
        }}
        disabled={disabled || loading}
        aria-busy={loading ? true : undefined}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={handleClick}
        {...props}
      >
        {/* Loading state overlay */}
        {loading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-current/10 rounded-xl"
            aria-hidden="true"
          >
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
            <span
              className={cn('flex-shrink-0', iconSizeClasses[size])}
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}
          <span className="truncate">{children}</span>
          {rightIcon && (
            <span
              className={cn('flex-shrink-0', iconSizeClasses[size])}
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export { GlassButton };
