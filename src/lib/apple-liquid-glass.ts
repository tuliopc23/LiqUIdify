/**
 * Apple Liquid Glass Effects
 * Authentic Apple-style liquid glass implementation with physics-based interactions
 * Enhanced with React 19 patterns and multi-layer structure
 */

import React, { useRef, useEffect, useCallback, startTransition } from 'react';

export interface AppleLiquidGlassOptions {
  intensity?: 'subtle' | 'medium' | 'strong';
  magneticStrength?: number;
  liquidFlow?: boolean;
  enableHaptics?: boolean;
  multiLayer?: boolean;
  animated?: boolean;
  distortionEffect?: boolean;
}

export interface AppleLiquidGlassProps {
  className?: string;
  children?: React.ReactNode;
  multiLayer?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
  interactive?: boolean;
  magnetic?: boolean;
  animated?: boolean;
}

export const APPLE_LIQUID_VARIANTS = {
  subtle: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    borderRadius: '24px',
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '32px',
  },
  strong: {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(32px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    borderRadius: '40px',
  },
} as const;

export const APPLE_LIQUID_SHADOWS = {
  subtle:
    '0 4px 16px rgba(31, 38, 135, 0.1), inset 0 2px 10px rgba(255, 255, 255, 0.2)',
  medium:
    '0 8px 32px rgba(31, 38, 135, 0.2), inset 0 4px 20px rgba(255, 255, 255, 0.3)',
  strong:
    '0 16px 48px rgba(31, 38, 135, 0.3), inset 0 8px 32px rgba(255, 255, 255, 0.4)',
} as const;

export const APPLE_LIQUID_AFTER_EFFECTS = {
  subtle: {
    boxShadow:
      'inset -6px -4px 0px -7px rgba(255, 255, 255, 0.8), inset 0px -5px 0px -4px rgba(255, 255, 255, 0.8)',
    filter:
      'blur(0.5px) drop-shadow(6px 2px 4px rgba(0, 0, 0, 0.2)) brightness(110%)',
  },
  medium: {
    boxShadow:
      'inset -10px -8px 0px -11px rgba(255, 255, 255, 1), inset 0px -9px 0px -8px rgba(255, 255, 255, 1)',
    filter:
      'blur(1px) drop-shadow(10px 4px 6px rgba(0, 0, 0, 0.3)) brightness(115%)',
  },
  strong: {
    boxShadow:
      'inset -14px -12px 0px -15px rgba(255, 255, 255, 1), inset 0px -13px 0px -12px rgba(255, 255, 255, 1)',
    filter:
      'blur(1.5px) drop-shadow(14px 6px 8px rgba(0, 0, 0, 0.4)) brightness(120%)',
  },
} as const;

/**
 * Enhanced Hook for Apple liquid glass magnetic hover effect
 * Updated with React 19 patterns and performance optimizations
 */
export function useAppleLiquidGlass(options: AppleLiquidGlassOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const {
    intensity = 'medium',
    magneticStrength = 0.3,
    liquidFlow = true,
    enableHaptics = false,
    multiLayer = false,
    animated = false,
    distortionEffect = false,
  } = options;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current) return;

      // Use startTransition for smooth animations
      startTransition(() => {
        const element = elementRef.current;
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * magneticStrength;
        const deltaY = (e.clientY - centerY) * magneticStrength;

        element.style.transform = `translate(${deltaX}px, ${deltaY}px) translateZ(0)`;

        if (liquidFlow && multiLayer) {
          // Enhanced liquid flow for multi-layer structure
          const glassFilter = element.querySelector(
            '.glass-filter'
          ) as HTMLElement | null;
          const glassOverlay = element.querySelector(
            '.glass-overlay'
          ) as HTMLElement | null;

          if (glassFilter) {
            glassFilter.style.transform = `translate(${-deltaX * 0.2}px, ${-deltaY * 0.2}px)`;
          }

          if (glassOverlay) {
            glassOverlay.style.transform = `translate(${-deltaX * 0.1}px, ${-deltaY * 0.1}px)`;
          }
        }
      });
    },
    [magneticStrength, liquidFlow, multiLayer]
  );

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;

    startTransition(() => {
      const element = elementRef.current;
      if (!element) return;
      
      element.style.transform = 'translate(0px, 0px) translateZ(0)';
      element.style.transition =
        'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

      if (multiLayer) {
        const glassFilter = element.querySelector(
          '.glass-filter'
        ) as HTMLElement | null;
        const glassOverlay = element.querySelector(
          '.glass-overlay'
        ) as HTMLElement | null;

        if (glassFilter) {
          glassFilter.style.transform = 'translate(0px, 0px)';
          glassFilter.style.transition =
            'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }

        if (glassOverlay) {
          glassOverlay.style.transform = 'translate(0px, 0px)';
          glassOverlay.style.transition =
            'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
      }

      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.style.transition = '';

          if (multiLayer) {
            const glassFilter = elementRef.current.querySelector(
              '.glass-filter'
            ) as HTMLElement;
            const glassOverlay = elementRef.current.querySelector(
              '.glass-overlay'
            ) as HTMLElement;

            if (glassFilter) glassFilter.style.transition = '';
            if (glassOverlay) glassOverlay.style.transition = '';
          }
        }
      }, 500);
    });

    if (
      enableHaptics &&
      typeof navigator !== 'undefined' &&
      'vibrate' in navigator
    ) {
      navigator.vibrate(10);
    }
  }, [enableHaptics, multiLayer]);

  const handleMouseEnter = useCallback(() => {
    if (
      enableHaptics &&
      typeof navigator !== 'undefined' &&
      'vibrate' in navigator
    ) {
      navigator.vibrate(5);
    }
  }, [enableHaptics]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  return {
    ref: elementRef,
    variant: APPLE_LIQUID_VARIANTS[intensity],
    shadow: APPLE_LIQUID_SHADOWS[intensity],
    afterEffect: APPLE_LIQUID_AFTER_EFFECTS[intensity],
    multiLayer,
    animated,
    distortionEffect,
  };
}

/**
 * Generate Apple liquid glass CSS classes - Tailwind v4 Compatible
 * Enhanced with multi-layer and new effect options
 */
export function getAppleLiquidGlassClass(
  intensity: keyof typeof APPLE_LIQUID_VARIANTS = 'medium',
  options: {
    interactive?: boolean;
    magnetic?: boolean;
    animated?: boolean;
    multiLayer?: boolean;
  } = {}
): string {
  const {
    interactive = true,
    magnetic = false,
    animated = false,
    multiLayer: _multiLayer = false,
  } = options;

  const baseClass = 'apple-liquid-glass';
  const intensityClass =
    intensity !== 'medium' ? `apple-liquid-glass--${intensity}` : '';
  const interactiveClass = interactive ? 'apple-liquid-glass--interactive' : '';
  const magneticClass = magnetic ? 'apple-liquid-glass--magnetic' : '';
  const animatedClass = animated ? 'apple-liquid-glass--animated' : '';

  return [
    baseClass,
    intensityClass,
    interactiveClass,
    magneticClass,
    animatedClass,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Generate multi-layer glass structure JSX
 * For use with the new multi-layer glass components
 */
export function createGlassLayers(
  content: React.ReactNode,
  className?: string
): React.ReactNode {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('div', { className: 'glass-filter' }),
    React.createElement('div', { className: 'glass-overlay' }),
    React.createElement('div', { className: 'glass-specular' }),
    React.createElement(
      'div',
      { className: `glass-content ${className || ''}` },
      content
    )
  );
}

/**
 * Apple liquid glass animation presets
 */
export const APPLE_LIQUID_ANIMATIONS = {
  hover: {
    transform: 'translateY(-2px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  active: {
    transform: 'translateY(0px) scale(0.98)',
    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  focus: {
    boxShadow: '0 0 0 3px rgba(0, 122, 255, 0.3)',
    transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;
