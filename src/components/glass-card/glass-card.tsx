import { forwardRef } from 'react';
import { cn, getGlassClass, microInteraction } from '@/lib/glass-utils';
import { createGlassLayers, getAppleLiquidGlassClass, useAppleLiquidGlass } from '@/lib/apple-liquid-glass';
import { createComponentSize } from '@/types/branded';

// Type definitions for enhanced TypeScript support
type ComponentVariant =
  | 'default'
  | 'elevated'
  | 'outlined'
  | 'pressed'
  | 'apple';
type GlassIntensity = 'subtle' | 'medium' | 'strong';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ComponentVariant;
  hover?: boolean;
  bordered?: boolean;
  padding?: string;
  magnetic?: boolean;
  intensity?: GlassIntensity;
  multiLayer?: boolean;
  animated?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'default',
      hover = true,
      bordered = true,
      padding = createComponentSize('md'),
      magnetic = false,
      intensity = 'medium',
      multiLayer = true,
      animated = false,
      children,
      ...props
    },
    ref,
  ) => {
    const appleLiquidGlass = useAppleLiquidGlass({
      intensity,
      magneticStrength: magnetic ? 0.3 : 0,
      liquidFlow: true,
      enableHaptics: false,
      multiLayer,
      animated,
      distortionEffect: true,
    });

    const variantClasses = {
      default: getGlassClass('default'),
      elevated: getGlassClass('elevated'),
      outlined: 'bg-transparent border-2 border-[var(--glass-border)]',
      pressed: cn(getGlassClass('pressed'), 'shadow-inner'),
      apple: getAppleLiquidGlassClass(intensity, {
        interactive: hover,
        magnetic,
        animated,
        multiLayer,
      }),
    };

    const paddingClasses = {
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const baseClasses = cn(
      variant === 'apple' ? '' : 'rounded-xl',
      variantClasses[variant],
      variant !== 'apple' && paddingClasses[padding as keyof typeof paddingClasses],
      bordered &&
      variant !== 'outlined' &&
      variant !== 'apple' &&
      'border border-[var(--glass-border)]',
      hover && variant !== 'apple' && 'glass-hover cursor-pointer',
      variant !== 'apple' && microInteraction.smooth,
      'will-change-transform',
    );

    // Use Apple liquid glass ref for apple variant
    const finalRef = variant === 'apple' ? appleLiquidGlass.ref : ref;

    // For Apple variant with multi-layer, use the new structure
    if (variant === 'apple' && multiLayer) {
      return (
        <div
          ref={finalRef as any}
          className={cn(baseClasses, className)}
          {...props}
        >
          {createGlassLayers(
            children,
            paddingClasses[padding as keyof typeof paddingClasses],
          )}
        </div>
      );
    }

    return (
      <div
        ref={finalRef as any}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = 'GlassCard';

const GlassCardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4', className)} {...props} />
));

GlassCardHeader.displayName = 'GlassCardHeader';

const GlassCardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-semibold text-primary', className)}
    {...props}
  />
));

GlassCardTitle.displayName = 'GlassCardTitle';

const GlassCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-secondary', className)} {...props} />
));

GlassCardDescription.displayName = 'GlassCardDescription';

const GlassCardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));

GlassCardContent.displayName = 'GlassCardContent';

const GlassCardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mt-4', className)} {...props} />
));

GlassCardFooter.displayName = 'GlassCardFooter';

export {
  GlassCard,
  GlassCardHeader,
  GlassCardFooter,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
};
