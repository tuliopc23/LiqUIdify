/**
 * Enhanced Apple Liquid Glass Component
 * Pixel-perfect multi-layer glass system with advanced visual effects
 * Requirements: 6.1, 6.3 - Enhanced multi-layer glass rendering with pixel-perfect precision
 */

import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

// TODO: These types need to be recreated or use unified glass system
// import type {
//   ENHANCED_GLASS_VARIANTS,
//   EnhancedGlassOptions,
// } from '../lib/enhanced-apple-liquid-glass';

// Temporary interface until properly migrated
interface EnhancedGlassOptions {
  intensity?: 'subtle' | 'medium' | 'strong';
  enablePhysics?: boolean;
  enableHaptics?: boolean;
  enableRetina?: boolean;
  enableSubpixel?: boolean;
  magneticStrength?: number;
}
// TODO: These functions need to be recreated or use unified glass system
// import {
//   createEnhancedGlassLayers,
//   getEnhancedGlassClass,
//   useEnhancedAppleLiquidGlass,
// } from '../lib/enhanced-apple-liquid-glass';

// Temporary implementations
const getEnhancedGlassClass = (_intensity?: string, _options?: any) => {
  return 'backdrop-blur-xl bg-white/10 border border-white/20';
};

const createEnhancedGlassLayers = (
  children: React.ReactNode,
  _options: any
) => {
  return children;
};

const useEnhancedAppleLiquidGlass = (_options: any) => {
  return {
    containerRef: undefined,
    variant: { radius: 12 },
    isReady: true,
  };
};

import { useIsClient } from '../hooks/use-ssr-safe';
import { LiquidGlassSvgFilters } from './liquid-glass-svg-filters';

export interface EnhancedAppleLiquidGlassProps
  extends HTMLAttributes<HTMLDivElement>,
    EnhancedGlassOptions {
  as?: keyof React.JSX.IntrinsicElements;
  contentClassName?: string;
  enableSvgFilters?: boolean;
  distortionFilter?: string;
  liquidFlowIntensity?: number;
  distortionStrength?: number;
}

/**
 * Enhanced Apple Liquid Glass Component with pixel-perfect multi-layer rendering
 * Supports advanced visual effects and Apple HIG compliance
 */
export const EnhancedAppleLiquidGlass = forwardRef<
  HTMLDivElement,
  EnhancedAppleLiquidGlassProps
>(function EnhancedAppleLiquidGlass(
  {
    children,
    className = '',
    contentClassName = '',
    intensity = 'medium',
    enablePhysics = true,
    enableHaptics = false,
    enableRetina = true,
    enableSubpixel = true,
    enableSvgFilters = true,
    distortionFilter = 'url(#enhanced-liquid-lens)',
    magneticStrength = 0.2,
    liquidFlowIntensity = 0.3,
    distortionStrength = 0.3,
    as: Component = 'div',
    ...props
  },
  ref
) {
  const isClient = useIsClient();
  const { containerRef, variant } = useEnhancedAppleLiquidGlass({
    intensity,
    enablePhysics,
    enableHaptics,
    enableRetina,
    enableSubpixel,
    magneticStrength,
    liquidFlowIntensity,
    distortionStrength,
  });

  // Combine refs
  const combinedRef = (element: HTMLDivElement | null) => {
    if ('function' === typeof ref) {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }

    if (containerRef) {
      (containerRef as any).current = element;
    }
  };

  const glassClassName = getEnhancedGlassClass(intensity, {
    interactive: enablePhysics,
    magnetic: 0 < magneticStrength,
    animated: 0 < liquidFlowIntensity,
    pixelPerfect: enableSubpixel,
  });

  const combinedClassName = `${glassClassName} ${className}`.trim();

  return (
    <>
      {isClient && enableSvgFilters && (
        <LiquidGlassSvgFilters enableAdvancedFilters />
      )}
      {isClient ? (
        React.createElement(
          Component,
          {
            ref: combinedRef,
            className: combinedClassName,
            style: {
              borderRadius: `${variant.radius}px`,
              ...props.style,
            },
            ...props,
          },
          createEnhancedGlassLayers(children, {
            intensity,
            className: contentClassName,
            enableDistortion: enableSvgFilters,
            distortionFilter,
          })
        )
      ) : (
        <div
          ref={combinedRef}
          className={combinedClassName}
          style={{
            borderRadius: `${variant.radius}px`,
            ...props.style,
          }}
          {...props}
        >
          {children}
        </div>
      )}
    </>
  );
});

/**
 * Enhanced Apple Liquid Glass Card Component
 * Pre-configured glass card with pixel-perfect rendering
 */
export const EnhancedAppleLiquidGlassCard = forwardRef<
  HTMLDivElement,
  EnhancedAppleLiquidGlassProps
>(function EnhancedAppleLiquidGlassCard(
  {
    className = '',
    contentClassName = 'gap-4 p-6',
    intensity = 'medium',
    ...props
  },
  ref
) {
  return (
    <EnhancedAppleLiquidGlass
      ref={ref}
      className={`${className}`}
      contentClassName={contentClassName}
      intensity={intensity}
      {...props}
    />
  );
});

/**
 * Enhanced Apple Liquid Glass Button Component
 * Pre-configured glass button with advanced interactions
 */
export const EnhancedAppleLiquidGlassButton = forwardRef<
  HTMLElement,
  Omit<EnhancedAppleLiquidGlassProps, 'as'> & {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
  }
>(function EnhancedAppleLiquidGlassButton(
  {
    className = '',
    contentClassName = 'justify-center items-center',
    variant = 'primary',
    size = 'md',
    intensity = 'medium',
    enablePhysics = true,
    magneticStrength = 0.3,
    liquidFlowIntensity = 0.2,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
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
    transition-all duration-300
    ${className}
  `.trim();

  return (
    <EnhancedAppleLiquidGlass
      ref={ref as any}
      as="button"
      className={buttonClassName}
      contentClassName={contentClassName}
      intensity={intensity}
      enablePhysics={enablePhysics}
      magneticStrength={magneticStrength}
      liquidFlowIntensity={liquidFlowIntensity}
      {...props}
    />
  );
});

/**
 * Enhanced Apple Liquid Glass Navigation Component
 * Pre-configured glass navigation with pixel-perfect rendering
 */
export const EnhancedAppleLiquidGlassNav = forwardRef<
  HTMLElement,
  Omit<EnhancedAppleLiquidGlassProps, 'as'>
>(function EnhancedAppleLiquidGlassNav(
  {
    className = '',
    contentClassName = 'flex items-center px-6 py-4',
    intensity = 'subtle',
    enablePhysics = false,
    magneticStrength = 0,
    liquidFlowIntensity = 0.1,
    ...props
  },
  ref
) {
  return (
    <EnhancedAppleLiquidGlass
      ref={ref as any}
      as="nav"
      className={className}
      contentClassName={contentClassName}
      intensity={intensity}
      enablePhysics={enablePhysics}
      magneticStrength={magneticStrength}
      liquidFlowIntensity={liquidFlowIntensity}
      {...props}
    />
  );
});

/**
 * Enhanced Apple Liquid Glass Modal Component
 * Pre-configured glass modal with advanced visual effects
 */
export const EnhancedAppleLiquidGlassModal = forwardRef<
  HTMLDivElement,
  EnhancedAppleLiquidGlassProps & {
    backdrop?: boolean;
    backdropClassName?: string;
  }
>(function EnhancedAppleLiquidGlassModal(
  {
    className = '',
    contentClassName = 'p-8 max-w-md mx-auto',
    intensity = 'strong',
    backdrop = true,
    backdropClassName = 'fixed inset-0 bg-black/50 backdrop-blur-sm',
    enablePhysics = false,
    liquidFlowIntensity = 0.5,
    distortionStrength = 0.4,
    ...props
  },
  ref
) {
  const modalContent = (
    <EnhancedAppleLiquidGlass
      ref={ref}
      className={`relative z-50 ${className}`}
      contentClassName={contentClassName}
      intensity={intensity}
      enablePhysics={enablePhysics}
      liquidFlowIntensity={liquidFlowIntensity}
      distortionStrength={distortionStrength}
      {...props}
    />
  );

  if (backdrop) {
    return (
      <div className={backdropClassName}>
        <div className="flex items-center justify-center min-h-screen p-4">
          {modalContent}
        </div>
      </div>
    );
  }

  return modalContent;
});

/**
 * Enhanced Apple Liquid Glass Showcase Component
 * Demonstrates all intensity levels and effects
 */
export const EnhancedAppleLiquidGlassShowcase: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const intensities = ['subtle', 'medium', 'strong'] as const;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {intensities.map((intensity) => (
        <div key={intensity} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
            {intensity} Intensity
          </h3>

          {/* Card Example */}
          <EnhancedAppleLiquidGlassCard
            intensity={intensity}
            enablePhysics
            magneticStrength={0.2}
            liquidFlowIntensity={0.3}
          >
            <div className="space-y-2">
              <h4 className="font-semibold">Enhanced Glass Card</h4>
              <p className="text-sm opacity-90">
                Pixel-perfect {intensity} intensity with advanced physics
              </p>
            </div>
          </EnhancedAppleLiquidGlassCard>

          {/* Button Example */}
          <EnhancedAppleLiquidGlassButton
            intensity={intensity}
            variant="primary"
            size="md"
            magneticStrength={0.3}
            liquidFlowIntensity={0.2}
          >
            {intensity} Button
          </EnhancedAppleLiquidGlassButton>

          {/* Navigation Example */}
          <EnhancedAppleLiquidGlassNav
            intensity={intensity}
            liquidFlowIntensity={0.1}
          >
            <span className="font-medium">{intensity} Navigation</span>
          </EnhancedAppleLiquidGlassNav>
        </div>
      ))}
    </div>
  );
};

export default EnhancedAppleLiquidGlass;
