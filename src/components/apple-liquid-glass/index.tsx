/**
 * Apple Liquid Glass Components
 * Using the unified glass system for backward compatibility
 */

import React from 'react';
import { useUnifiedGlass } from '@/core/glass/unified-glass-system';
import type { GlassIntensity, UnifiedGlassProps } from '@/core/glass/unified-glass-system';
import { cn } from '@/core/utils/classname';

// Re-export from enhanced apple liquid glass lib
// TODO: Implement these exports once the lib file is created
// export {
//   useAppleLiquidGlass,
//   getAppleLiquidGlassClass,
//   createGlassLayers,
//   type AppleLiquidGlassOptions,
//   type AppleLiquidGlassProps,
// } from '@/lib/enhanced-apple-liquid-glass';

export interface AppleLiquidGlassNavProps extends Omit<UnifiedGlassProps, 'config'> {
  intensity?: GlassIntensity;
  magnetic?: boolean;
  animated?: boolean;
  interactive?: boolean;
}

export function AppleLiquidGlassNav({
  children,
  className,
  style,
  intensity = 'medium',
  magnetic = false,
  animated = true,
  interactive = true,
  ...props
}: AppleLiquidGlassNavProps) {
  const { glassStyles, handlers, ref } = useUnifiedGlass({
    intensity,
    variant: 'default',
    interactive,
    magnetic,
    animation: animated ? 'smooth' : 'none',
  });

  return (
    <nav
      ref={ref}
      className={cn(
        'glass-nav',
        'relative z-50',
        'backdrop-blur-xl bg-white/10',
        'border border-white/20',
        'transition-all duration-300 ease-out',
        className
      )}
      style={{
        ...glassStyles,
        ...style,
      }}
      {...handlers}
      {...props}
    >
      {children}
    </nav>
  );
}

// Base Apple Liquid Glass component
export interface AppleLiquidGlassComponentProps extends AppleLiquidGlassNavProps {
  as?: 'div' | 'section' | 'article' | 'nav';
}

export function AppleLiquidGlass({
  children,
  className,
  style,
  intensity = 'medium',
  magnetic = false,
  animated = true,
  interactive = true,
  as: Component = 'div',
  ...props
}: AppleLiquidGlassComponentProps) {
  const { glassStyles, handlers, ref } = useUnifiedGlass({
    intensity,
    variant: 'default',
    interactive,
    magnetic,
    animation: animated ? 'smooth' : 'none',
  });

  return (
    <Component
      ref={ref}
      className={cn(
        'apple-liquid-glass',
        'relative',
        'backdrop-blur-xl bg-white/10',
        'border border-white/20',
        'transition-all duration-300 ease-out',
        className
      )}
      style={{
        ...glassStyles,
        ...style,
      }}
      {...handlers}
      {...props}
    >
      {children}
    </Component>
  );
}

// Apple Liquid Glass Card component
export interface AppleLiquidGlassCardProps extends AppleLiquidGlassComponentProps {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
  multiLayer?: boolean;
}

export function AppleLiquidGlassCard({
  children,
  className,
  padding = 'md',
  rounded = true,
  ...props
}: AppleLiquidGlassCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <AppleLiquidGlass
      className={cn(
        'apple-liquid-glass-card',
        paddingClasses[padding],
        rounded && 'rounded-xl',
        className
      )}
      {...props}
    >
      {children}
    </AppleLiquidGlass>
  );
}

// Apple Liquid Glass Button component
export interface AppleLiquidGlassButtonProps extends Omit<AppleLiquidGlassComponentProps, 'as'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function AppleLiquidGlassButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}: AppleLiquidGlassButtonProps) {
  const { glassStyles } = useUnifiedGlass({
    intensity: 'medium',
    variant: 'default',
    interactive: !disabled,
    magnetic: true,
    animation: 'smooth',
  });

  const variantClasses = {
    primary: 'bg-blue-500/20 border-blue-400/30 text-blue-100 hover:bg-blue-500/30',
    secondary: 'bg-gray-500/20 border-gray-400/30 text-gray-100 hover:bg-gray-500/30',
    ghost: 'bg-transparent border-white/20 text-white hover:bg-white/10',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'apple-liquid-glass-button',
        'relative',
        'backdrop-blur-xl',
        'border',
        'rounded-lg',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      style={{
        ...glassStyles,
      }}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Export default for backward compatibility
export default AppleLiquidGlassNav;
