import { ReactNode, useEffect, useState } from 'react';
import { announcer } from '@/components/glass-live-region';

// Types and Interfaces
export interface SSRSafetyOptions {
  detectMismatches: boolean;
  autoRecover: boolean;
  reportMismatches: boolean;
  fallbackDelay: number;
}

export interface HydrationMismatch {
  element: HTMLElement;
  expectedHTML: string;
  actualHTML: string;
  timestamp: number;
  componentName?: string;
}

export interface ProgressiveEnhancementOptions {
  enableJS: boolean;
  fallbackCSS: boolean;
  gracefulDegradation: boolean;
}

// Default configurations
const DEFAULT_SSR_OPTIONS: SSRSafetyOptions = {
  detectMismatches: true,
  autoRecover: true,
  reportMismatches: process.env.NODE_ENV === 'development',
  fallbackDelay: 100,
};

/**
 * SSR Safety Manager
 */
export class SSRSafetyManager {
  private static instance: SSRSafetyManager;
  private hydrationMismatches: HydrationMismatch[] = [];
  private observer: MutationObserver | null = null;
  private isClient: boolean = false;

  private constructor() {
    this.isClient = typeof window !== 'undefined';

    if (this.isClient) {
      this.setupHydrationDetection();
    }
  }

  static getInstance(): SSRSafetyManager {
    if (!SSRSafetyManager.instance) {
      SSRSafetyManager.instance = new SSRSafetyManager();
    }
    return SSRSafetyManager.instance;
  }

  /**
   * Check if we're running on the client
   */
  isClientSide(): boolean {
    return this.isClient;
  }

  /**
   * Safe way to access client-only APIs
   */
  safeClientCall<T>(callback: () => T, fallback?: T): T | undefined {
    if (this.isClient) {
      try {
        return callback();
      } catch (error) {
        console.warn('Client-only API call failed:', error);
        return fallback;
      }
    }
    return fallback;
  }

  /**
   * Setup hydration mismatch detection
   */
  private setupHydrationDetection() {
    if (!this.isClient) return;

    // Listen for hydration errors
    window.addEventListener('error', event => {
      if (event.message.includes('hydrat')) {
        this.handleHydrationError(event);
      }
    });

    // Setup mutation observer for DOM changes
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          this.checkForMismatches(mutation.target as HTMLElement);
        }
      });
    });

    // Start observing after hydration
    setTimeout(() => {
      if (document.body) {
        this.observer?.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
        });
      }
    }, 1000);
  }

  /**
   * Handle hydration errors
   */
  private handleHydrationError(_event: ErrorEvent) {
    const mismatch: HydrationMismatch = {
      element: document.body,
      expectedHTML: 'SSR HTML',
      actualHTML: 'Client HTML',
      timestamp: Date.now(),
      componentName: 'Unknown',
    };

    this.hydrationMismatches.push(mismatch);

    if (DEFAULT_SSR_OPTIONS.reportMismatches) {
      console.warn('Hydration mismatch detected:', mismatch);
    }

    if (DEFAULT_SSR_OPTIONS.autoRecover) {
      this.recoverFromMismatch(mismatch);
    }

    // Announce to screen readers
    announcer.announce('Content updated due to loading differences.', {
      priority: 'medium' as const,
    });
  }

  /**
   * Check for hydration mismatches
   */
  private checkForMismatches(element: HTMLElement) {
    // Simple heuristic: check for common mismatch patterns
    const suspiciousPatterns = [
      /hydrat/i,
      /mismatch/i,
      /expected.*but.*received/i,
    ];

    const textContent = element.textContent || '';
    const hasMismatch = suspiciousPatterns.some(pattern =>
      pattern.test(textContent)
    );

    if (hasMismatch) {
      const mismatch: HydrationMismatch = {
        element,
        expectedHTML: element.outerHTML,
        actualHTML: element.outerHTML,
        timestamp: Date.now(),
      };

      this.hydrationMismatches.push(mismatch);
    }
  }

  /**
   * Recover from hydration mismatch
   */
  private recoverFromMismatch(mismatch: HydrationMismatch) {
    try {
      // Force re-render by triggering a state change
      const event = new CustomEvent('hydration-recovery', {
        detail: mismatch,
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Failed to recover from hydration mismatch:', error);
    }
  }

  /**
   * Get all detected mismatches
   */
  getMismatches(): HydrationMismatch[] {
    return [...this.hydrationMismatches];
  }

  /**
   * Clear mismatch history
   */
  clearMismatches() {
    this.hydrationMismatches = [];
  }

  /**
   * Cleanup
   */
  destroy() {
    this.observer?.disconnect();
    this.hydrationMismatches = [];
  }
}

/**
 * SSR-Safe Component Wrapper
 */
export interface SSRSafeProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

export function SSRSafe({
  children,
  fallback = null,
  delay = 0,
}: SSRSafeProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isClient) {
    return <>{fallback} </>;
  }

  return <>{children} </>;
}

/**
 * Client-Only Component Wrapper
 */
export interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback} </>;
  }

  return <>{children} </>;
}

/**
 * Progressive Enhancement Component
 */
export interface ProgressiveEnhancementProps {
  children: ReactNode;
  enhanced: ReactNode;
  fallback: ReactNode;
  options?: Partial<ProgressiveEnhancementOptions>;
}

export function ProgressiveEnhancement({
  children,
  enhanced,
  fallback,
  options = {},
}: ProgressiveEnhancementProps) {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [jsEnabled, setJsEnabled] = useState(false);

  const finalOptions: ProgressiveEnhancementOptions = {
    enableJS: true,
    fallbackCSS: true,
    gracefulDegradation: true,
    ...options,
  };

  useEffect(() => {
    // Check if JavaScript is enabled
    setJsEnabled(true);

    // Check for enhanced features
    const checkEnhancement = () => {
      const hasModernFeatures =
        'IntersectionObserver' in window &&
        'ResizeObserver' in window &&
        'requestAnimationFrame' in window;

      setIsEnhanced(hasModernFeatures && finalOptions.enableJS);
    };

    checkEnhancement();
  }, [finalOptions.enableJS]);

  // No JS fallback
  if (!jsEnabled) {
    return <>{fallback} </>;
  }

  // Enhanced experience
  if (isEnhanced) {
    return <>{enhanced} </>;
  }

  // Basic experience
  return <>{children} </>;
}

/**
 * Hydration-Safe Hook
 */
export function useHydrationSafe<T>(
  clientValue: T,
  serverValue: T,
  delay: number = 0
): T {
  const [value, setValue] = useState(serverValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(clientValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [clientValue, delay]);

  return value;
}

/**
 * SSR-Safe Local Storage Hook
 */
export function useSSRSafeLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Failed to read localStorage key "${key}":`, error);
    }
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Failed to write localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue];
}

/**
 * Network Status Hook with Fallback
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    const updateConnectionType = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setConnectionType(connection.effectiveType || 'unknown');
      }
    };

    updateOnlineStatus();
    updateConnectionType();

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateConnectionType);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);

      if (connection) {
        connection.removeEventListener('change', updateConnectionType);
      }
    };
  }, []);

  return { isOnline, connectionType };
}

/**
 * Graceful Degradation Strategies
 */
export const gracefulDegradation = {
  // Animation fallbacks
  withAnimationFallback: (
    animatedComponent: ReactNode,
    staticComponent: ReactNode
  ) => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return prefersReducedMotion ? staticComponent : animatedComponent;
  },

  // Feature detection fallbacks
  withFeatureDetection: (
    feature: string,
    enhancedComponent: ReactNode,
    fallbackComponent: ReactNode
  ) => {
    const hasFeature = typeof window !== 'undefined' && feature in window;
    return hasFeature ? enhancedComponent : fallbackComponent;
  },

  // CSS-only fallbacks
  withCSSFallback: (jsComponent: ReactNode, cssComponent: ReactNode) => {
    return <SSRSafe fallback={cssComponent}>{jsComponent}</SSRSafe>;
  },
};

// Export singleton instance
export const ssrSafety = SSRSafetyManager.getInstance();
