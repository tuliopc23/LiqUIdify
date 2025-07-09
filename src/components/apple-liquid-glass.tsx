/**
 * Apple Liquid Glass Component
 * Authentic Apple-style liquid glass with multi-layer structure
 * Based on patterns from GitHub gists and enhanced with React 19 features
 */

import React, { forwardRef, HTMLAttributes } from 'react';
import {
  useAppleLiquidGlass,
  getAppleLiquidGlassClass,
  createGlassLayers,
  AppleLiquidGlassProps,
} from '../lib/apple-liquid-glass';

export interface AppleLiquidGlassComponentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'className'>,
    AppleLiquidGlassProps {
  as?: keyof React.JSX.IntrinsicElements;
  contentClassName?: string;
}

/**
 * Apple Liquid Glass Component with multi-layer structure
 * Supports both legacy single-layer and new multi-layer implementations
 */
export const AppleLiquidGlass = forwardRef<
  HTMLDivElement,
  AppleLiquidGlassComponentProps
>(function AppleLiquidGlass(
  {
    children,
    className = '',
    contentClassName = '',
    multiLayer = true,
    intensity = 'medium',
    interactive = true,
    magnetic = false,
    animated = false,
    as: Component = 'div',
    ...props
  },
  ref
) {
  const { ref: glassRef } = useAppleLiquidGlass({
    intensity,
    magneticStrength: magnetic ? 0.3 : 0,
    liquidFlow: true,
    enableHaptics: false,
    multiLayer,
    animated,
    distortionEffect: true,
  });

  const glassClassName = getAppleLiquidGlassClass(intensity, {
    interactive,
    magnetic,
    animated,
    multiLayer,
  });

  // Combine refs - React 19 style (no forwardRef needed in some cases)
  const combinedRef = (element: HTMLDivElement | null) => {
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }

    if (glassRef) {
      (glassRef as any).current = element;
    }
  };

  const combinedClassName = `${glassClassName} ${className}`.trim();

  if (multiLayer) {
    return React.createElement(
      Component,
      {
        ref: combinedRef,
        className: combinedClassName,
        ...props,
      },
      createGlassLayers(children, contentClassName)
    );
  }

  // Legacy single-layer implementation
  return React.createElement(
    Component,
    {
      ref: combinedRef,
      className: combinedClassName,
      ...props,
    },
    children
  );
});

/**
 * Apple Liquid Glass Card Component
 * Pre-configured glass card with common patterns
 */
export const AppleLiquidGlassCard = forwardRef<
  HTMLDivElement,
  AppleLiquidGlassComponentProps
>(function AppleLiquidGlassCard(
  { className = '', contentClassName = 'gap-4', ...props },
  ref
) {
  return (
    <AppleLiquidGlass
      ref={ref}
      className={`p-6 ${className}`}
      contentClassName={contentClassName}
      {...props}
    />
  );
});

/**
 * Apple Liquid Glass Button Component
 * Pre-configured glass button with interactive states
 */
export const AppleLiquidGlassButton = forwardRef<
  HTMLElement,
  Omit<AppleLiquidGlassComponentProps, 'as'> & {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
  }
>(function AppleLiquidGlassButton(
  {
    className = '',
    contentClassName = 'justify-center',
    variant = 'primary',
    size = 'md',
    interactive = true,
    magnetic = true,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'font-semibold',
    secondary: 'font-medium',
    ghost: 'font-normal',
  };

  const buttonClassName = `
      ${sizeClasses[size]} 
      ${variantClasses[variant]} 
      cursor-pointer select-none
      ${className}
    `.trim();

  return (
    <AppleLiquidGlass
      ref={ref as any}
      as="button"
      className={buttonClassName}
      contentClassName={contentClassName}
      interactive={interactive}
      magnetic={magnetic}
      {...props}
    />
  );
});

/**
 * Apple Liquid Glass Navigation Component
 * Pre-configured glass navigation with sidebar patterns
 */
export const AppleLiquidGlassNav = forwardRef<
  HTMLElement,
  Omit<AppleLiquidGlassComponentProps, 'as'>
>(function AppleLiquidGlassNav(
  {
    className = '',
    contentClassName = 'flex items-center',
    intensity = 'subtle',
    ...props
  },
  ref
) {
  return (
    <AppleLiquidGlass
      ref={ref as any}
      as="nav"
      className={className}
      contentClassName={contentClassName}
      intensity={intensity}
      {...props}
    />
  );
});

export default AppleLiquidGlass;
