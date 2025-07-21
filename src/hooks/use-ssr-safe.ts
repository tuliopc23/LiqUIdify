/**
 * SSR-Safe Hooks for Glass UI
 * Provides hooks for safely handling client-side functionality in SSR environments
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to safely check if code is running on client side
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to safely access window object in SSR environments
 */
export function useSSRSafeWindow<T = Window>(
  selector: (window: Window) => T,
  fallback: T
): T {
  const isClient = useIsClient();
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    if (isClient && 'undefined' !== typeof window) {
      try {
        setValue(selector(window));
      } catch (error) {
        console.warn('Error accessing window property:', error);
      }
    }
  }, [isClient, selector]);

  return value;
}

/**
 * Hook to safely access document object in SSR environments
 */
export function useSSRSafeDocument<T = Document>(
  selector: (document: Document) => T,
  fallback: T
): T {
  const isClient = useIsClient();
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    if (isClient && 'undefined' !== typeof document) {
      try {
        setValue(selector(document));
      } catch (error) {
        console.warn('Error accessing document property:', error);
      }
    }
  }, [isClient, selector]);

  return value;
}

/**
 * Hook to safely access navigator object in SSR environments
 */
export function useSSRSafeNavigator<T = Navigator>(
  selector: (navigator: Navigator) => T,
  fallback: T
): T {
  const isClient = useIsClient();
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    if (isClient && 'undefined' !== typeof navigator) {
      try {
        setValue(selector(navigator));
      } catch (error) {
        console.warn('Error accessing navigator property:', error);
      }
    }
  }, [isClient, selector]);

  return value;
}

/**
 * Hook to safely use localStorage in SSR environments
 */
export function useSSRSafeLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const isClient = useIsClient();
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Initialize from localStorage if available
  useEffect(() => {
    if (isClient && 'undefined' !== typeof window) {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
      }
    }
  }, [isClient, key]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value);

      // Save to localStorage if client-side
      if (isClient && 'undefined' !== typeof window) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook to safely use sessionStorage in SSR environments
 */
export function useSSRSafeSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const isClient = useIsClient();
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Initialize from sessionStorage if available
  useEffect(() => {
    if (isClient && 'undefined' !== typeof window) {
      try {
        const item = sessionStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error reading sessionStorage key "${key}":`, error);
      }
    }
  }, [isClient, key]);

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage
  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value);

      // Save to sessionStorage if client-side
      if (isClient && 'undefined' !== typeof window) {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook to safely handle hydration mismatches
 */
export function useHydrationSafe<T>(
  clientValue: T,
  serverValue: T,
  options: { delay?: number; onMismatch?: (client: T, server: T) => void } = {}
): T {
  const { delay = 0, onMismatch } = options;
  const [value, setValue] = useState<T>(serverValue);
  const isClient = useIsClient();
  const componentName = useRef(
    `hydration-${Math.random().toString(36).substring(2, 9)}`
  ).current;

  useEffect(() => {
    if (isClient) {
      // Check for hydration mismatch
      const mismatch = serverValue !== clientValue;

      if (mismatch && onMismatch) {
        onMismatch(clientValue, serverValue);
      }

      // Switch to client value after delay
      const timer = setTimeout(() => {
        setValue(clientValue);
      }, delay);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isClient, clientValue, serverValue, delay, onMismatch, componentName]);

  return value;
}

/**
 * Hook to safely handle media queries in SSR environments
 */
export function useSSRSafeMediaQuery(query: string): boolean {
  const isClient = useIsClient();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [isClient, query]);

  return matches;
}

/**
 * Hook to safely handle network status in SSR environments
 */
export function useNetworkStatus(): {
  online: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  saveData?: boolean;
} {
  const isClient = useIsClient();
  const [online, setOnline] = useState(true);
  const [effectiveType, setEffectiveType] = useState<
    'slow-2g' | '2g' | '3g' | '4g' | undefined
  >(undefined);
  const [saveData, setSaveData] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    // Update online status
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update connection info if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;

      if (connection) {
        setEffectiveType(connection.effectiveType);
        setSaveData(connection.saveData);

        const handleConnectionChange = () => {
          setEffectiveType(connection.effectiveType);
          setSaveData(connection.saveData);
        };

        connection.addEventListener('change', handleConnectionChange);
        return () => {
          connection.removeEventListener('change', handleConnectionChange);
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isClient]);

  return { online, effectiveType, saveData };
}

/**
 * Hook to safely handle animations in SSR environments
 */
export function useSSRSafeAnimation(
  animationFn: () => void,
  options: { delay?: number; disabled?: boolean } = {}
): void {
  const { delay = 0, disabled = false } = options;
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient || disabled) {
      return undefined;
    }

    let animationFrame: number;
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(() => {
        animationFn();
      });
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isClient, animationFn, delay, disabled]);
}

/**
 * Hook to safely handle intersection observer in SSR environments
 */
export function useSSRSafeIntersectionObserver<T extends HTMLElement>(
  options: IntersectionObserverInit = {},
  callback?: (entry: IntersectionObserverEntry) => void
): [(node: T | null) => void, boolean, IntersectionObserverEntry | null] {
  const isClient = useIsClient();
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(
    undefined
  );
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useRef<T | null>(null);

  const setRef = (node: T | null) => {
    if (ref.current) {
      observer.current?.unobserve(ref.current);
    }

    ref.current = node;

    if (node && observer.current) {
      observer.current.observe(node);
    }
  };

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry) {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
        if (callback) {
          callback(entry);
        }
      }
    }, options);

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isClient, callback, options.root, options.rootMargin, options.threshold]);

  return [setRef, isIntersecting, entry];
}

/**
 * Hook to safely handle resize observer in SSR environments
 */
export function useSSRSafeResizeObserver<T extends HTMLElement>(
  callback?: (entry: ResizeObserverEntry) => void
): [(node: T | null) => void, DOMRectReadOnly | undefined] {
  const isClient = useIsClient();
  const [size, setSize] = useState<DOMRectReadOnly>();
  const observer = useRef<ResizeObserver | null>(null);
  const ref = useRef<T | null>(null);

  const setRef = (node: T | null) => {
    if (ref.current) {
      observer.current?.unobserve(ref.current);
    }

    ref.current = node;

    if (node && observer.current) {
      observer.current.observe(node);
    }
  };

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    observer.current = new ResizeObserver(([entry]) => {
      if (entry) {
        setSize(entry.contentRect);
        if (callback) {
          callback(entry);
        }
      }
    });

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isClient, callback]);

  return [setRef, size];
}

/**
 * Hook to safely handle document visibility in SSR environments
 */
export function useSSRSafeDocumentVisibility():
  | 'visible'
  | 'hidden'
  | 'prerender' {
  const isClient = useIsClient();
  const [visibility, setVisibility] = useState<
    'visible' | 'hidden' | 'prerender'
  >('visible');

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const handleVisibilityChange = () => {
      setVisibility(
        document.visibilityState as 'visible' | 'hidden' | 'prerender'
      );
    };

    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isClient]);

  return visibility;
}

/**
 * Hook to safely handle browser features detection in SSR environments
 */
export function useSSRSafeFeatureDetection(feature: string): boolean {
  const isClient = useIsClient();
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    // Check for feature support
    let isSupported = false;

    switch (feature) {
      case 'css-backdrop-filter':
        isSupported = CSS.supports('backdrop-filter', 'blur(1px)');
        break;
      case 'css-grid':
        isSupported = CSS.supports('display', 'grid');
        break;
      case 'intersection-observer':
        isSupported = 'IntersectionObserver' in window;
        break;
      case 'resize-observer':
        isSupported = 'ResizeObserver' in window;
        break;
      case 'web-animations':
        isSupported = 'animate' in document.createElement('div');
        break;
      case 'local-storage':
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          isSupported = true;
        } catch {
          isSupported = false;
        }
        break;
      default:
        isSupported = false;
    }

    setSupported(isSupported);
  }, [isClient, feature]);

  return supported;
}
