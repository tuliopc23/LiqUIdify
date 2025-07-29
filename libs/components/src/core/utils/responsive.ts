/**
 * Responsive Utilities Module
 *
 * This module provides utilities for responsive design, touch targets, and micro-interactions
 * that work across different screen sizes and devices.
 */

// Breakpoint constants
import { BREAKPOINTS, type BreakpointKey } from '../constants';

/**
 * Generate responsive size classes based on breakpoints
 */
export function responsiveSize(
  size: string | number,
  breakpoint?: BreakpointKey
): string {
  if ('number' === typeof size) {
    size = `${size}px`;
  }

  if (!breakpoint) {
    return size;
  }

  const breakpointPrefix = 'xs' === breakpoint ? '' : `${breakpoint}:`;
  return `${breakpointPrefix}${size}`;
}

/**
 * Ensure touch targets meet accessibility standards (minimum 44px)
 */
function createTouchTarget(size = 44): string {
  const minSize = Math.max(size, 44); // WCAG minimum touch target
  return `min-h-[${minSize}px] min-w-[${minSize}px]`;
}

// Create touchTarget object with both function and properties
export const touchTarget = Object.assign(createTouchTarget, {
  comfortable: createTouchTarget(48), // Comfortable touch target size
});

/**
 * Generate micro-interaction classes for smooth animations
 */
function createMicroInteraction(
  type: 'hover' | 'focus' | 'active' | 'press' = 'hover',
  intensity: 'subtle' | 'medium' | 'strong' = 'medium'
): string {
  const intensityClasses = {
    subtle: {
      hover: 'hover:scale-[1.02] hover:brightness-105',
      focus: 'focus:scale-[1.02] focus:brightness-105',
      active: 'active:scale-[0.98] active:brightness-95',
      press: 'active:scale-[0.98]',
    },
    medium: {
      hover: 'hover:scale-105 hover:brightness-110',
      focus: 'focus:scale-105 focus:brightness-110',
      active: 'active:scale-95 active:brightness-90',
      press: 'active:scale-95',
    },
    strong: {
      hover: 'hover:scale-110 hover:brightness-125',
      focus: 'focus:scale-110 focus:brightness-125',
      active: 'active:scale-90 active:brightness-75',
      press: 'active:scale-90',
    },
  };

  const transitionClass = 'transition-all duration-150 ease-out';
  const interactionClass = intensityClasses[intensity][type];

  return `${transitionClass} ${interactionClass}`;
}

// Create microInteraction object with both function and properties
export const microInteraction = Object.assign(createMicroInteraction, {
  gentle: createMicroInteraction('hover', 'subtle'),
  interactive: createMicroInteraction('hover', 'medium'),
  smooth: createMicroInteraction('hover', 'subtle'),
});

/**
 * Get current breakpoint based on window width
 */
export function getCurrentBreakpoint(): BreakpointKey {
  if ('undefined' === typeof window) {
    return 'md'; // Default for SSR
  }

  const width = 'undefined' === typeof window ? 0 : window.innerWidth;

  // Convert string values to numbers for comparison
  const breakpoints = {
    '2xl': Number.parseInt(BREAKPOINTS['2xl']),
    xl: Number.parseInt(BREAKPOINTS.xl),
    lg: Number.parseInt(BREAKPOINTS.lg),
    md: Number.parseInt(BREAKPOINTS.md),
    sm: Number.parseInt(BREAKPOINTS.sm),
    xs: Number.parseInt(BREAKPOINTS.xs),
  };

  if (width >= breakpoints['2xl']) {
    return '2xl';
  }
  if (width >= breakpoints.xl) {
    return 'xl';
  }
  if (width >= breakpoints.lg) {
    return 'lg';
  }
  if (width >= breakpoints.md) {
    return 'md';
  }
  if (width >= breakpoints.sm) {
    return 'sm';
  }
  return 'xs';
}

/**
 * Check if screen size matches a breakpoint condition
 */
export function matchesBreakpoint(
  condition: 'up' | 'down' | 'only',
  breakpoint: BreakpointKey
): boolean {
  if ('undefined' === typeof window) {
    return false;
  }

  const width = 'undefined' === typeof window ? 0 : window.innerWidth;
  const breakpointValue = Number.parseInt(BREAKPOINTS[breakpoint]);

  switch (condition) {
    case 'up': {
      return width >= breakpointValue;
    }
    case 'down': {
      return width < breakpointValue;
    }
    case 'only': {
      const breakpointKeys = Object.keys(BREAKPOINTS) as Array<BreakpointKey>;
      const currentIndex = breakpointKeys.indexOf(breakpoint);
      const nextBreakpoint = breakpointKeys[currentIndex + 1];

      if (!nextBreakpoint) {
        return width >= breakpointValue;
      }

      return (
        width >= breakpointValue &&
        width < Number.parseInt(BREAKPOINTS[nextBreakpoint])
      );
    }
    default: {
      return false;
    }
  }
}

/**
 * Create responsive utility classes
 */
export function createResponsiveClasses(
  baseClass: string,
  breakpoints: Partial<Record<BreakpointKey, string>>
): string {
  const classes = [baseClass];

  for (const [breakpoint, className] of Object.entries(breakpoints)) {
    if (className) {
      const prefix = 'xs' === breakpoint ? '' : `${breakpoint}:`;
      classes.push(`${prefix}${className}`);
    }
  }

  return classes.join(' ');
}

/**
 * Container query utilities (for modern browsers)
 */
export function containerQuery(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  className: string
): string {
  const containerSizes = {
    xs: '@xs',
    sm: '@sm',
    md: '@md',
    lg: '@lg',
    xl: '@xl',
  };

  return `${containerSizes[size]}:${className}`;
}

/**
 * Aspect ratio utilities
 */
export function aspectRatio(ratio: string | number): string {
  if ('number' === typeof ratio) {
    return `aspect-[${ratio}]`;
  }

  // Handle common ratios
  const commonRatios: Record<string, string> = {
    square: 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '2/1': 'aspect-[2/1]',
  };

  return commonRatios[ratio] || `aspect-[${ratio}]`;
}

/**
 * Fluid typography utilities
 */
export function fluidTypography(
  minSize: number,
  maxSize: number,
  minViewport = 320,
  maxViewport = 1200
): string {
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const yAxisIntersection = -minViewport * slope + minSize;

  return `clamp(${minSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxSize}px)`;
}

/**
 * Generate responsive grid classes
 */
export function responsiveGrid(
  columns: Partial<Record<BreakpointKey, number>>
): string {
  const classes: Array<string> = [];

  for (const [breakpoint, cols] of Object.entries(columns)) {
    if (cols) {
      const prefix = 'xs' === breakpoint ? '' : `${breakpoint}:`;
      classes.push(`${prefix}grid-cols-${cols}`);
    }
  }

  return classes.join(' ');
}

/**
 * Media query hook for React components
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() => {
    if ('undefined' === typeof window) {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    if ('undefined' === typeof window) {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Responsive breakpoint hook
 */
export function useBreakpoint(): BreakpointKey {
  const [breakpoint, setBreakpoint] = React.useState<BreakpointKey>(() =>
    getCurrentBreakpoint()
  );

  React.useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    if ('undefined' !== typeof window) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if ('undefined' !== typeof window) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return breakpoint;
}

/**
 * Responsive visibility utilities
 */
export function responsiveVisibility(
  show: Partial<Record<BreakpointKey, boolean>>
): string {
  const classes: Array<string> = [];

  for (const [breakpoint, isVisible] of Object.entries(show)) {
    const prefix = 'xs' === breakpoint ? '' : `${breakpoint}:`;
    const visibility = isVisible ? 'block' : 'hidden';
    classes.push(`${prefix}${visibility}`);
  }

  return classes.join(' ');
}

// Import React for hooks
import * as React from 'react';

// Type exports
export type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;

export interface ResponsiveConfig {
  breakpoints?: Partial<Record<BreakpointKey, number>>;
  containerSizes?: Partial<Record<BreakpointKey, string>>;
}
