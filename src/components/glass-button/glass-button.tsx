import { forwardRef, useState, useRef, useEffect } from "react";
import { cn, focusRing, getGlassClass, microInteraction } from "@/lib/glass-utils";
import { useMagneticHover, createGlassRipple } from "@/lib/glass-physics";
import { useLiquidGlass } from "@/hooks/use-liquid-glass";
import { useGlassEffectPerformance } from "@/hooks/use-performance-monitor";
import { Slot } from "@radix-ui/react-slot";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "destructive";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
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
    const internalButtonRef = useRef<HTMLButtonElement>(null); // Renamed for clarity
    const { magneticHover, specularHighlights } = useLiquidGlass();
    const { elementRef: magneticRef, transform } = useMagneticHover(0.3, 120);
    const { measureGlassInteraction } = useGlassEffectPerformance('Button');
    const Comp = asChild ? Slot : "button";

    // Effect to assign internalButtonRef to magneticRef if magneticHover is enabled
    useEffect(() => {
      if (magneticHover && magneticRef && typeof magneticRef === 'object') {
        (magneticRef as React.MutableRefObject<HTMLElement | null>).current = internalButtonRef.current;
      }
    }, [magneticHover, magneticRef, internalButtonRef]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const endMeasure = measureGlassInteraction('click');
      
      if (internalButtonRef.current && !disabled && !loading) {
        const rect = internalButtonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createGlassRipple(internalButtonRef.current, x, y, 'rgba(255, 255, 255, 0.3)');
      }
      
      props.onClick?.(e);
      endMeasure();
    };

    const baseClasses = cn(
      "liquid-glass liquid-glass-interactive font-medium rounded-xl relative overflow-hidden",
      "focus:outline-none liquid-glass-focus liquid-glass-ripple", // Ensure liquid-glass-focus provides a visible focus ring
      microInteraction.smooth,
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none",
      specularHighlights && "liquid-glass-specular liquid-glass-shimmer",
      magneticHover && "liquid-glass-magnetic"
    );

    const variantClasses = {
      primary: cn(
        "text-white font-semibold",
        "bg-gradient-to-b from-[var(--glass-primary)] to-[var(--glass-primary-active)]",
        "hover:from-[var(--glass-primary-hover)] hover:to-[var(--glass-primary)]",
        "active:from-[var(--glass-primary-active)] active:to-[var(--glass-primary-active)]",
        "shadow-lg shadow-blue-500/25",
        "border border-blue-400/30"
      ),
      secondary: cn(
        getGlassClass("default"),
        "text-[var(--text-primary)] border-[var(--glass-border)]",
        "hover:bg-[var(--glass-bg-elevated)] hover:border-[var(--glass-border-focus)]",
        "active:bg-[var(--glass-bg-pressed)]"
      ),
      tertiary: cn(
        "text-[var(--text-primary)] bg-transparent",
        "hover:bg-[var(--glass-bg)] hover:backdrop-blur-sm",
        "active:bg-[var(--glass-bg-pressed)]"
      ),
      ghost: cn(
        "text-[var(--text-secondary)] bg-transparent",
        "hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]",
        "active:bg-[var(--glass-bg-pressed)]"
      ),
      destructive: cn(
        "text-white font-semibold",
        "bg-gradient-to-b from-red-500 to-red-600",
        "hover:from-red-400 hover:to-red-500",
        "active:from-red-600 active:to-red-600",
        "shadow-lg shadow-red-500/25",
        "border border-red-400/30"
      ),
    };

    const sizeClasses = {
      xs: "px-2.5 py-1.5 text-xs min-h-[28px]",
      sm: "px-3 py-2 text-sm min-h-[32px]",
      md: "px-4 py-2.5 text-sm min-h-[40px]",
      lg: "px-6 py-3 text-base min-h-[44px]",
      xl: "px-8 py-4 text-lg min-h-[52px]",
    };

    const iconSizeClasses = {
      xs: "w-3 h-3",
      sm: "w-3.5 h-3.5", 
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    return (
      <Comp
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={(node: HTMLButtonElement) => {
          // Assign to internal ref
          (internalButtonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          // Assign to forwarded ref
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref && typeof ref === 'object') {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          }
        }}
        style={{
          transform: magneticHover ? transform : undefined,
          ...props.style
        }}
        disabled={disabled || loading}
        aria-busy={loading ? true : undefined} // Added aria-busy for loading state
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={handleClick}
        {...props}
      >
        {/* Loading state overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-current/10 rounded-xl" aria-hidden="true">
            <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", iconSizeClasses[size])} />
          </div>
        )}
        
        <div className={cn("flex items-center justify-center gap-2", loading && "opacity-0")} aria-hidden={loading ? true : undefined }>
          {leftIcon && (
            <span className={cn("flex-shrink-0", iconSizeClasses[size])} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <span className="truncate">{children}</span>
          {rightIcon && (
            <span className={cn("flex-shrink-0", iconSizeClasses[size])} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
      </Comp>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
