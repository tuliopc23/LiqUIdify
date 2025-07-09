import { forwardRef } from 'react';
import { cn, getGlassClass, microInteraction } from '@/lib/glass-utils';
import {
  useAppleLiquidGlass,
  getAppleLiquidGlassClass,
  createGlassLayers,
} from '@/lib/apple-liquid-glass';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'pressed' | 'apple';
  hover?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  magnetic?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
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
      padding = 'md',
      magnetic = false,
      intensity = 'medium',
      multiLayer = true,
      animated = false,
      children,
      ...props
    },
    ref
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
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const baseClasses = cn(
      variant === 'apple' ? '' : 'rounded-xl',
      variantClasses[variant],
      variant !== 'apple' && paddingClasses[padding],
      bordered &&
        variant !== 'outlined' &&
        variant !== 'apple' &&
        'border border-[var(--glass-border)]',
      hover && variant !== 'apple' && 'glass-hover cursor-pointer',
      variant !== 'apple' && microInteraction.smooth,
      'will-change-transform'
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
          {createGlassLayers(children, paddingClasses[padding])}
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
  }
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
