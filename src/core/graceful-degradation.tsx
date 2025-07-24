import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { SSRSafe } from '@/components/ssr-safe-wrapper';
import { ClientOnly } from './ssr-safety';

// Types and Interfaces
export interface DegradationStrategy {
  name: string;
  condition: () => boolean;
  fallback: ReactNode;
  enhanced: ReactNode;
}

export interface AnimationFallbackOptions {
  respectReducedMotion: boolean;
  fallbackDuration: number;
  staticFallback: ReactNode;
}

export interface NetworkFallbackOptions {
  offlineMessage: ReactNode;
  slowConnectionFallback: ReactNode;
  retryButton: boolean;
}

/**
 * Animation Fallback System
 */
export function withAnimationFallback(
  animatedComponent: ReactNode,
  options: Partial<AnimationFallbackOptions> = {}
) {
  const {
    respectReducedMotion = true,
    fallbackDuration: _fallbackDuration = 0,
    staticFallback = undefined,
  } = options;

  return function AnimationFallbackWrapper() {
    const [shouldAnimate, setShouldAnimate] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
      if (!respectReducedMotion) {
        return;
      }

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
      // Check for performance constraints
      const checkPerformance = () => {
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          if (connection?.saveData) {
            setShouldAnimate(false);
            return;
          }
        }

        // Check device memory
        if ('deviceMemory' in navigator) {
          const deviceMemory = (navigator as any).deviceMemory;
          if (deviceMemory && 4 > deviceMemory) {
            setShouldAnimate(false);
            return;
          }
        }

        // Check CPU cores
        if ('hardwareConcurrency' in navigator) {
          const cores = navigator.hardwareConcurrency;
          if (cores && 4 > cores) {
            setShouldAnimate(false);
            return;
          }
        }
      };

      checkPerformance();
    }, []);

    // Use static fallback if animations should be disabled
    if (prefersReducedMotion || !shouldAnimate) {
      return (
        <div className="animation-fallback">
          {staticFallback || animatedComponent}
        </div>
      );
    }

    return <>{animatedComponent}</>;
  };
}

/**
 * Network-Aware Component Fallback
 */
export function withNetworkFallback(
  component: ReactNode,
  options: Partial<NetworkFallbackOptions> = {}
) {
  const {
    offlineMessage = <div>You're offline. Some features may not work.</div>,
    slowConnectionFallback = undefined,
    retryButton = true,
  } = options;

  return function NetworkFallbackWrapper() {
    const [isOnline, setIsOnline] = useState(true);
    const [connectionSpeed, setConnectionSpeed] = useState<string>('fast');
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
      const updateOnlineStatus = () => {
        setIsOnline(navigator.onLine);
      };

      const updateConnectionSpeed = () => {
        const connection = (navigator as any).connection;
        if (connection) {
          const effectiveType = connection.effectiveType;
          setConnectionSpeed(effectiveType);
        }
      };

      updateOnlineStatus();
      updateConnectionSpeed();

      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      const connection = (navigator as any).connection;
      if (connection) {
        connection.addEventListener('change', updateConnectionSpeed);
      }

      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);

        if (connection) {
          connection.removeEventListener('change', updateConnectionSpeed);
        }
      };
    }, []);

    const handleRetry = () => {
      setRetryCount((prev) => prev + 1);
      window.location.reload();
    };

    // Offline fallback
    if (!isOnline) {
      return (
        <div className="network-fallback network-fallback--offline">
          {offlineMessage}
          {retryButton && (
            <button onClick={handleRetry} className="retry-button">
              Retry({retryCount})
            </button>
          )}
        </div>
      );
    }

    // Slow connection fallback
    if ('slow-2g' === connectionSpeed || '2g' === connectionSpeed) {
      return (
        <div className="network-fallback network-fallback--slow">
          {slowConnectionFallback || component}
        </div>
      );
    }

    return <>{component}</>;
  };
}

/**
 * Feature Detection Fallback
 */
export function withFeatureDetection(
  feature: string | string[],
  enhancedComponent: ReactNode,
  fallbackComponent: ReactNode
) {
  return function FeatureDetectionWrapper() {
    const [hasFeature, setHasFeature] = useState(false);

    useEffect(() => {
      const features = Array.isArray(feature) ? feature : [feature];
      const allFeaturesSupported = features.every((f) => {
        // Check for API support
        if (f in window) {
          return true;
        }

        // Check for CSS support
        if (f.startsWith('css:')) {
          const cssFeature = f.replace('css:', '');
          return CSS.supports(cssFeature);
        }

        // Check for specific browser features
        switch (f) {
          case 'webgl':
            try {
              const canvas = document.createElement('canvas');
              return !!(
                canvas.getContext('webgl') ||
                canvas.getContext('experimental-webgl')
              );
            } catch {
              return false;
            }
          case 'webgl2':
            try {
              const canvas = document.createElement('canvas');
              return !!canvas.getContext('webgl2');
            } catch {
              return false;
            }
          case 'webp':
            return new Promise<boolean>((resolve) => {
              const webP = new Image();
              webP.onload = webP.onerror = () => resolve(2 === webP.height);
              webP.src =
                'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            });
          default:
            return false;
        }
      });

      if ('boolean' === typeof allFeaturesSupported) {
        setHasFeature(allFeaturesSupported);
      } else {
        // Handle async feature detection (like WebP)
        Promise.resolve(allFeaturesSupported).then(setHasFeature);
      }
    }, [feature]);

    return hasFeature ? enhancedComponent : fallbackComponent;
  };
}

/**
 * CSS-Only Fallback for JavaScript Components
 */
export function withCSSFallback(
  jsComponent: ReactNode,
  cssComponent: ReactNode,
  delay: number = 100
) {
  return function CSSFallbackWrapper() {
    return (
      <SSRSafe fallback={cssComponent} delay={delay}>
        <ClientOnly fallback={cssComponent}>{jsComponent}</ClientOnly>
      </SSRSafe>
    );
  };
}

/**
 * Progressive Enhancement Wrapper
 */
export interface ProgressiveEnhancementLevel {
  name: string;
  condition: () => boolean;
  component: ReactNode;
}

export function withProgressiveEnhancement(
  levels: ProgressiveEnhancementLevel[]
) {
  return function ProgressiveEnhancementWrapper() {
    const [currentLevel, setCurrentLevel] = useState(0);

    useEffect(() => {
      // Find the highest level that meets conditions
      for (let i = levels.length - 1; 0 <= i; i--) {
        if (levels[i]?.condition()) {
          setCurrentLevel(i);
          break;
        }
      }
    }, [levels.length, levels[i]?.condition]);

    return <>{levels[currentLevel]?.component || levels[0]?.component}</>;
  };
}

/**
 * Device-Specific Fallbacks
 */
export function withDeviceFallback(
  desktopComponent: ReactNode,
  tabletComponent: ReactNode,
  mobileComponent: ReactNode
) {
  return function DeviceFallbackWrapper() {
    const [deviceType, setDeviceType] = useState<
      'desktop' | 'tablet' | 'mobile'
    >('desktop');

    useEffect(() => {
      const checkDeviceType = () => {
        const width = window.innerWidth;
        const isTouchDevice = 'ontouchstart' in window;

        if (768 > width) {
          setDeviceType('mobile');
        } else if (1024 > width || isTouchDevice) {
          setDeviceType('tablet');
        } else {
          setDeviceType('desktop');
        }
      };

      checkDeviceType();
      window.addEventListener('resize', checkDeviceType);

      return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    switch (deviceType) {
      case 'mobile':
        return <>{mobileComponent}</>;
      case 'tablet':
        return <>{tabletComponent}</>;
      default:
        return <>{desktopComponent}</>;
    }
  };
}

/**
 * Performance-Based Fallback
 */
export function withPerformanceFallback(
  highPerformanceComponent: ReactNode,
  lowPerformanceComponent: ReactNode
) {
  return function PerformanceFallbackWrapper() {
    const [isHighPerformance, setIsHighPerformance] = useState(true);

    useEffect(() => {
      const checkPerformance = () => {
        let score = 0;

        // Check device memory
        if ('deviceMemory' in navigator) {
          const memory = (navigator as any).deviceMemory;
          score += 8 <= memory ? 3 : 4 <= memory ? 2 : 1;
        }

        // Check CPU cores
        if ('hardwareConcurrency' in navigator) {
          const cores = navigator.hardwareConcurrency;
          score += 8 <= cores ? 3 : 4 <= cores ? 2 : 1;
        }

        // Check connection speed
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          if (connection) {
            const effectiveType = connection.effectiveType;
            score +=
              '4g' === effectiveType ? 3 : '3g' === effectiveType ? 2 : 1;
          }
        }

        // Check for save-data preference
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          if (connection?.saveData) {
            score = 0; // Force low performance mode
          }
        }

        setIsHighPerformance(6 <= score);
      };

      checkPerformance();
    }, []);

    return isHighPerformance
      ? highPerformanceComponent
      : lowPerformanceComponent;
  };
}

/**
 * Accessibility-First Fallback
 */
export function withAccessibilityFallback(
  enhancedComponent: ReactNode,
  accessibleComponent: ReactNode
) {
  return function AccessibilityFallbackWrapper() {
    const [useAccessibleVersion, setUseAccessibleVersion] = useState(false);

    useEffect(() => {
      const checkAccessibilityPreferences = () => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        // Check for high contrast preference
        const prefersHighContrast = window.matchMedia(
          '(prefers-contrast: high)'
        ).matches;

        // Check for screen reader usage (heuristic)
        const hasScreenReader =
          navigator.userAgent.includes('NVDA') ||
          navigator.userAgent.includes('JAWS') ||
          navigator.userAgent.includes('VoiceOver');

        setUseAccessibleVersion(
          prefersReducedMotion || prefersHighContrast || hasScreenReader
        );
      };

      checkAccessibilityPreferences();
    }, []);

    return useAccessibleVersion ? accessibleComponent : enhancedComponent;
  };
}

/**
 * Comprehensive Graceful Degradation System
 */
export const gracefulDegradation = {
  // Animation fallbacks
  withAnimationFallback,

  // Network fallbacks
  withNetworkFallback,

  // Feature detection
  withFeatureDetection,

  // CSS-only fallbacks
  withCSSFallback,

  // Progressive enhancement
  withProgressiveEnhancement,

  // Device-specific fallbacks
  withDeviceFallback,

  // Performance-based fallbacks
  withPerformanceFallback,

  // Accessibility-first fallbacks
  withAccessibilityFallback,

  // Utility functions
  utils: {
    checkFeatureSupport: (feature: string): boolean => {
      if ('undefined' === typeof window) {
        return false;
      }
      return feature in window;
    },

    getDeviceCapabilities: () => ({
      memory: (navigator as any).deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      connection: (navigator as any).connection?.effectiveType || '4g',
      saveData: (navigator as any).connection?.saveData || false,
    }),

    getAccessibilityPreferences: () => ({
      reducedMotion:
        'undefined' !== typeof window &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast:
        'undefined' !== typeof window &&
        window.matchMedia('(prefers-contrast: high)').matches,
      reducedData:
        'undefined' !== typeof window &&
        (navigator as any).connection?.saveData,
    }),
  },
};
