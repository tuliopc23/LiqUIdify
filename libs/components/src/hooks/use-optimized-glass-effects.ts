/**
 * Performance Optimization Hook for Glass Effects
 *
 * This hook provides optimized glass effect calculations and memoization
 * to improve render performance for glassmorphism components.
 */

import { useCallback, useMemo, useRef } from 'react';

import type { GlassIntensity } from '@/core/base-component';

export interface OptimizedGlassConfig {
  intensity: GlassIntensity;
  blur?: number;
  opacity?: number;
  saturation?: number;
  brightness?: number;
  state?: string;
  variant?: string;
}

// Memoized glass effect calculations
const GLASS_EFFECT_CACHE = new Map<string, any>();

export function useOptimizedGlassEffects(config: OptimizedGlassConfig) {
  const _cacheKeyRef = useRef<string>('');

  // Generate cache key based on config
  const cacheKey = useMemo(() => {
    return `${config.intensity}-${config.blur || 8}-${config.opacity || 0.85}-${config.state || 'idle'}-${config.variant || 'primary'}`;
  }, [
    config.intensity,
    config.blur,
    config.opacity,
    config.state,
    config.variant,
  ]);

  // Memoized glass classes
  const glassClasses = useMemo(() => {
    if (GLASS_EFFECT_CACHE.has(cacheKey)) {
      return GLASS_EFFECT_CACHE.get(cacheKey).classes;
    }

    const classes = generateOptimizedGlassClasses(config);
    GLASS_EFFECT_CACHE.set(cacheKey, { classes, variables: null });
    return classes;
  }, [cacheKey, config]);

  // Memoized CSS variables
  const glassVariables = useMemo(() => {
    const cached = GLASS_EFFECT_CACHE.get(cacheKey);
    if (cached?.variables) {
      return cached.variables;
    }

    const variables = generateOptimizedGlassVariables(config);
    if (cached) {
      cached.variables = variables;
    }
    return variables;
  }, [cacheKey, config]);

  // Performance-optimized event handlers
  const optimizedHandlers = useMemo(
    () => ({
      onMouseEnter: useCallback(() => {
        // Use transform3d to trigger hardware acceleration
        if (document.documentElement.style.transform !== undefined) {
          const element = document.activeElement as HTMLElement;
          if (element) {
            element.style.transform = 'translate3d(0, 0, 0)';
            element.style.willChange = 'transform, opacity';
          }
        }
      }, []),

      onMouseLeave: useCallback(() => {
        const element = document.activeElement as HTMLElement;
        if (element) {
          element.style.willChange = 'auto';
        }
      }, []),
    }),
    []
  );

  return {
    glassClasses,
    glassVariables,
    optimizedHandlers,
    cacheKey,
  };
}

// Optimized glass class generation
function generateOptimizedGlassClasses(config: OptimizedGlassConfig): string {
  const { intensity, state = 'idle', variant = 'primary' } = config;

  const baseClasses = [
    'relative',
    'overflow-hidden',
    'backdrop-blur-glass',
    'bg-glass-light-primary',
    'border',
    'border-white/20',
    'dark:border-white/10',
  ];

  // State-specific optimizations
  if ('hover' === state) {
    baseClasses.push(
      'transform',
      'scale-[1.02]',
      'transition-transform',
      'duration-200'
    );
  }

  // Intensity-specific optimizations
  switch (intensity) {
    case 'subtle': {
      baseClasses.push('backdrop-blur-[4px]', 'bg-white/5');
      break;
    }
    case 'medium': {
      baseClasses.push('backdrop-blur-[8px]', 'bg-white/10');
      break;
    }
    case 'strong': {
      baseClasses.push('backdrop-blur-[16px]', 'bg-white/15');
      break;
    }
    default: {
      baseClasses.push('backdrop-blur-[8px]', 'bg-white/10');
    }
  }

  return baseClasses.join(' ');
}

// Optimized CSS variables generation
function generateOptimizedGlassVariables(
  config: OptimizedGlassConfig
): Record<string, string> {
  const {
    intensity,
    blur,
    opacity,
    saturation = 1.2,
    brightness = 1.1,
  } = config;

  const intensityMap = {
    none: { blur: 0, opacity: 1 },
    subtle: { blur: 4, opacity: 0.9 },
    medium: { blur: 8, opacity: 0.85 },
    strong: { blur: 16, opacity: 0.8 },
    intense: { blur: 24, opacity: 0.75 },
  };

  const settings = intensityMap[intensity] || intensityMap.medium;

  return {
    '--glass-blur': `${blur || settings.blur}px`,
    '--glass-opacity': `${opacity || settings.opacity}`,
    '--glass-saturation': `${saturation}`,
    '--glass-brightness': `${brightness}`,
    '--glass-backdrop': "blur(var(--glass-blur)) saturate(var(--glass-saturation)) brightness(var(--glass-brightness))",
    '--glass-transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  };
}

// Hook for optimized animations
export function useOptimizedAnimations(enabled = true) {
  const prefersReducedMotion = useMemo(() => {
    if ('undefined' === typeof window) {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const shouldAnimate = enabled && !prefersReducedMotion;

  const animationConfig = useMemo(
    () => ({
      duration: shouldAnimate ? 200 : 0,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: shouldAnimate ? 'transform, opacity' : 'auto',
    }),
    [shouldAnimate]
  );

  return {
    shouldAnimate,
    animationConfig,
    reducedMotion: prefersReducedMotion,
  };
}

// Performance monitoring hook
export function usePerformanceMonitoring(_componentName: string) {
  const renderCountRef = useRef(0);
  const lastRenderTime = useRef(0);

  renderCountRef.current += 1;

  const measureRender = useCallback(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const renderTime = end - start;
      lastRenderTime.current = renderTime;

      // Log performance issues
      if (16 < renderTime) {
        // More than one frame at 60fps
        // Logging disabled
      }

      return renderTime;
    };
  }, []);

  return {
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTime.current,
    measureRender,
  };
}

export default useOptimizedGlassEffects;
