/**
 * Responsive Utilities Module
 *
 * This module provides utilities for responsive design, touch targets, and micro-interactions
 * that work across different screen sizes and devices.
 */

// Breakpoint constants
import { BREAKPOINTS, type BreakpointKey } from "../constants";

/**
 * Generate responsive size classes based on breakpoints
 */
function _responsiveSize(size: string | number, breakpoint?: BreakpointKey): string {
  const sizeStr = typeof size === "number" ? `${size}px` : size;

  if (!breakpoint) {
    return sizeStr;
  }

  const breakpointPrefix = breakpoint === "xs" ? "" : `${breakpoint}:`;
  return `${breakpointPrefix}${sizeStr}`;
}

/**
 * Ensure touch targets meet accessibility standards (minimum 44px)
 */
function createTouchTarget(size = 44): string {
  const minSize = Math.max(size, 44); // WCAG minimum touch target
  return `min-h-[${minSize}px] min-w-[${minSize}px]`;
}

// Create touchTarget object with both function and properties
const _touchTarget = Object.assign(createTouchTarget, {
  comfortable: createTouchTarget(48), // Comfortable touch target size
});

/**
 * Generate micro-interaction classes for smooth animations
 */
function createMicroInteraction(
  type: "hover" | "focus" | "active" | "press" = "hover",
  intensity: "subtle" | "medium" | "strong" = "medium"
): string {
  const intensityClasses = {
    subtle: {
      hover: "hover:scale-[1.02] hover:brightness-105",
      focus: "focus:scale-[1.02] focus:brightness-105",
      active: "active:scale-[0.98] active:brightness-95",
      press: "active:scale-[0.98]",
    },
    medium: {
      hover: "hover:scale-105 hover:brightness-110",
      focus: "focus:scale-105 focus:brightness-110",
      active: "active:scale-95 active:brightness-90",
      press: "active:scale-95",
    },
    strong: {
      hover: "hover:scale-110 hover:brightness-125",
      focus: "focus:scale-110 focus:brightness-125",
      active: "active:scale-90 active:brightness-75",
      press: "active:scale-90",
    },
  };

  const transitionClass = "transition-all duration-150 ease-out";
  const interactionClass = intensityClasses[intensity][type];

  return `${transitionClass} ${interactionClass}`;
}

// Create microInteraction object with both function and properties
export const microInteraction = Object.assign(createMicroInteraction, {
  gentle: createMicroInteraction("hover", "subtle"),
  interactive: createMicroInteraction("hover", "medium"),
  smooth: createMicroInteraction("hover", "subtle"),
});

/**
 * Get current breakpoint based on window width
 */
function getCurrentBreakpoint(): BreakpointKey {
  if (typeof window === "undefined") {
    return "md"; // Default for SSR
  }

  const width = typeof window === "undefined" ? 0 : window.innerWidth;

  // Convert string values to numbers for comparison
  const breakpoints = {
    "2xl": Number.parseInt(BREAKPOINTS["2xl"], 10),
    xl: Number.parseInt(BREAKPOINTS.xl, 10),
    lg: Number.parseInt(BREAKPOINTS.lg, 10),
    md: Number.parseInt(BREAKPOINTS.md, 10),
    sm: Number.parseInt(BREAKPOINTS.sm, 10),
    xs: Number.parseInt(BREAKPOINTS.xs, 10),
  };

  if (width >= breakpoints["2xl"]) {
    return "2xl";
  }
  if (width >= breakpoints.xl) {
    return "xl";
  }
  if (width >= breakpoints.lg) {
    return "lg";
  }
  if (width >= breakpoints.md) {
    return "md";
  }
  if (width >= breakpoints.sm) {
    return "sm";
  }
  return "xs";
}

/**
 * Check if screen size matches a breakpoint condition
 */
function _matchesBreakpoint(condition: "up" | "down" | "only", breakpoint: BreakpointKey): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const width = typeof window === "undefined" ? 0 : window.innerWidth;
  const breakpointValue = Number.parseInt(BREAKPOINTS[breakpoint], 10);

  switch (condition) {
    case "up": {
      return width >= breakpointValue;
    }
    case "down": {
      return width < breakpointValue;
    }
    case "only": {
      const breakpointKeys = Object.keys(BREAKPOINTS) as BreakpointKey[];
      const currentIndex = breakpointKeys.indexOf(breakpoint);
      const nextBreakpoint = breakpointKeys[currentIndex + 1];

      if (!nextBreakpoint) {
        return width >= breakpointValue;
      }

      return width >= breakpointValue && width < Number.parseInt(BREAKPOINTS[nextBreakpoint], 10);
    }
    default: {
      return false;
    }
  }
}

/**
 * Create responsive utility classes
 */
function _createResponsiveClasses(
  baseClass: string,
  breakpoints: Partial<Record<BreakpointKey, string>>
): string {
  const classes = [baseClass];

  for (const [breakpoint, className] of Object.entries(breakpoints)) {
    if (className) {
      const prefix = breakpoint === "xs" ? "" : `${breakpoint}:`;
      classes.push(`${prefix}${className}`);
    }
  }

  return classes.join(" ");
}

/**
 * Container query utilities (for modern browsers)
 */
function _containerQuery(size: "xs" | "sm" | "md" | "lg" | "xl", className: string): string {
  const containerSizes = {
    xs: "@xs",
    sm: "@sm",
    md: "@md",
    lg: "@lg",
    xl: "@xl",
  };

  return `${containerSizes[size]}:${className}`;
}

/**
 * Aspect ratio utilities
 */
function _aspectRatio(ratio: string | number): string {
  if (typeof ratio === "number") {
    return `aspect-[${ratio}]`;
  }

  // Handle common ratios
  const commonRatios: Record<string, string> = {
    square: "aspect-square",
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "2/1": "aspect-[2/1]",
  };

  return commonRatios[ratio] || `aspect-[${ratio}]`;
}

/**
 * Fluid typography utilities
 */
function _fluidTypography(
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
function _responsiveGrid(columns: Partial<Record<BreakpointKey, number>>): string {
  const classes: string[] = [];

  for (const [breakpoint, cols] of Object.entries(columns)) {
    if (cols) {
      const prefix = breakpoint === "xs" ? "" : `${breakpoint}:`;
      classes.push(`${prefix}grid-cols-${cols}`);
    }
  }

  return classes.join(" ");
}

/**
 * Media query hook for React components
 */
function _useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/**
 * Responsive breakpoint hook
 */
function _useBreakpoint(): BreakpointKey {
  const [breakpoint, setBreakpoint] = React.useState<BreakpointKey>(() => getCurrentBreakpoint());

  React.useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return breakpoint;
}

/**
 * Responsive visibility utilities
 */
function _responsiveVisibility(show: Partial<Record<BreakpointKey, boolean>>): string {
  const classes: string[] = [];

  for (const [breakpoint, isVisible] of Object.entries(show)) {
    const prefix = breakpoint === "xs" ? "" : `${breakpoint}:`;
    const visibility = isVisible ? "block" : "hidden";
    classes.push(`${prefix}${visibility}`);
  }

  return classes.join(" ");
}

// Import React for hooks
import * as React from "react";

// Type exports
