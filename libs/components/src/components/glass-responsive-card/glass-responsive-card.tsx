import type React from 'react';
import { forwardRef } from 'react';

import { cn, getGlassClass } from '@/core/utils/classname';

import { microInteraction } from '@/core/utils/responsive';

import type { ComponentSize } from '@/types/branded';

import { createComponentSize } from '@/types/branded';

export interface GlassResponsiveCardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    keyof React.AriaAttributes
  > {
  variant?: 'default' | 'elevated' | 'outlined' | 'pressed';
  hover?: boolean;
  bordered?: boolean;
  padding?: ComponentSize | 'none';
  responsive?: boolean;
  stackOnMobile?: boolean;
}

const GlassResponsiveCard = forwardRef<
  HTMLDivElement,
  GlassResponsiveCardProps
>(
  (
    {
      className,
      variant = 'default',
      hover = true,
      bordered = true,
      padding = createComponentSize('md'),
      responsive = true,
      stackOnMobile = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: getGlassClass('default'),
      elevated: getGlassClass('elevated'),
      outlined: 'bg-transparent border-2 border-[var(--glass-border)]',
      pressed: cn(getGlassClass('pressed'), 'shadow-inner'),
    };

    const paddingClasses = responsive
      ? {
          none: '',
          xs: 'p-2 sm:p-3',
          sm: 'p-3 sm:p-4',
          md: 'p-4 sm:p-6',
          lg: 'p-6 sm:p-8',
          xl: 'p-8 sm:p-12',
        }
      : {
          none: '',
          xs: 'p-2',
          sm: 'p-3',
          md: 'p-6',
          lg: 'p-8',
          xl: 'p-12',
        };

    const baseClasses = cn(
      'overflow-hidden rounded-xl',
      variantClasses[variant],
      'none' === padding
        ? ''
        : paddingClasses[padding as keyof typeof paddingClasses],
      bordered &&
        'outlined' !== variant &&
        'border border-[var(--glass-border)]',
      hover && 'glass-interactive cursor-pointer',
      microInteraction.smooth,
      'will-change-transform',
      // Mobile optimizations
      responsive && [
        'text-sm sm:text-base', // Responsive text sizing
        stackOnMobile && 'flex flex-col sm:flex-row sm:items-center',
      ]
    );

    return (
      <div ref={ref} className={cn(baseClasses, className)} {...(props as unknown)}>
        {children}
      </div>
    );
  }
);

GlassResponsiveCard.displayName = 'GlassResponsiveCard';

export { GlassResponsiveCard };
