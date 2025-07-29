import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getLocalStorageItem,
  getScrollPosition,
  getWindowDimensions,
  isBrowser,
  prefersDarkScheme,
  prefersReducedMotion,
  safeAddEventListener,
  safeDocument,
  safeDynamicImport,
  safeIntersectionObserver,
  safeLocalStorage,
  safeMutationObserver,
  safeResizeObserver,
  safeSessionStorage,
  safeWindow,
  setLocalStorageItem,
} from '../utils/ssr-utils';

/**
 * Hook for SSR-safe window dimensions
 * @returns {{ width: number, height: number }} window dimensions
 */
export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const handleResize = () => {
      setDimensions(getWindowDimensions());
    };

    const cleanup = safeAddEventListener('resize', handleResize);
    return cleanup;
  }, []);

  return dimensions;
};

/**
 * Hook for SSR-safe scroll position
 * @returns {{ x: number, y: number }} scroll position
 */
export const useScrollPosition = () => {
  const [position, setPosition] = useState(getScrollPosition());

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const handleScroll = () => {
      setPosition(getScrollPosition());
    };

    const cleanup = safeAddEventListener('scroll', handleScroll, {
      passive: true,
    });
    return cleanup;
  }, []);

  return position;
};

/**
 * Hook for SSR-safe media query
 * @param {string} query - media query string
 * @returns {boolean} whether the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const win = safeWindow();
    if (!win?.matchMedia) {
      return;
    }

    const mediaQuery = win.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]);

  return matches;
};

type UseLocalStorageReturnType<T> = [T, (value: T) => void, () => void];

/**
 * Hook for SSR-safe localStorage
 * @param {string} key - storage key
 * @param {T} initialValue - initial value
 * @returns {[T, (value: T) => void, () => void]} [value, setValue, remove]
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): UseLocalStorageReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getLocalStorageItem(key, initialValue);
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      setLocalStorageItem(key, value);
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    const storage = safeLocalStorage();
    if (storage) {
      storage.removeItem(key);
    }
  }, [key, initialValue]);

  // Sync state when storage changes in other tabs
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // Invalid JSON, ignore
        }
      }
    };

    const cleanup = safeAddEventListener(
      'storage',
      handleStorageChange as unknown
    );
    return cleanup;
  }, [key]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for SSR-safe sessionStorage
 * @param {string} key - storage key
 * @param {T} initialValue - initial value
 * @returns {[T, (value: T) => void, () => void]} [value, setValue, remove]
 */
export const useSessionStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser()) {
      return initialValue;
    }

    const storage = safeSessionStorage();
    if (!storage) {
      return initialValue;
    }

    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      const storage = safeSessionStorage();
      if (storage) {
        try {
          storage.setItem(key, JSON.stringify(value));
        } catch {
          // Storage full or other error
        }
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    const storage = safeSessionStorage();
    if (storage) {
      storage.removeItem(key);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for SSR-safe dynamic imports
 * @param {() => Promise<T>} importFn - dynamic import function
 * @param {React.DependencyList} deps - dependencies
 * @returns {{ module: T | null, loading: boolean, error: Error | null }}
 */
export const useDynamicImport = <T,>(
  importFunction: () => Promise<T>,
  deps: React.DependencyList = []
): { module: T | null; loading: boolean; error: Error | null } => {
  const [module, setModule] = useState<T | null | null>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | null>(undefined);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    let cancelled = false;

    const loadModule = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const result = await safeDynamicImport(importFunction);
        if (!cancelled) {
          setModule(result);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error instanceof Error ? error : new Error('Import failed'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadModule();

    return () => {
      cancelled = true;
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: SSR-safe hook with controlled deps
  }, [importFunction, ...deps]);

  return { module, loading, error };
};

/**
 * Hook for SSR-safe user preferences
 * @returns {{ prefersReducedMotion: boolean, prefersDarkScheme: boolean }}
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    prefersReducedMotion: false,
    prefersDarkScheme: false,
  });

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    setPreferences({
      prefersReducedMotion: prefersReducedMotion(),
      prefersDarkScheme: prefersDarkScheme(),
    });

    const win = safeWindow();
    if (!win?.matchMedia) {
      return;
    }

    const motionQuery = win.matchMedia('(prefers-reduced-motion: reduce)');
    const darkQuery = win.matchMedia('(prefers-color-scheme: dark)');

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPreferences((previous) => ({
        ...previous,
        prefersReducedMotion: e.matches,
      }));
    };

    const handleDarkChange = (e: MediaQueryListEvent) => {
      setPreferences((previous) => ({
        ...previous,
        prefersDarkScheme: e.matches,
      }));
    };

    // Modern browsers
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
      darkQuery.addEventListener('change', handleDarkChange);
      return () => {
        motionQuery.removeEventListener('change', handleMotionChange);
        darkQuery.removeEventListener('change', handleDarkChange);
      };
    }
    // Legacy browsers
    if (motionQuery.addListener) {
      motionQuery.addListener(handleMotionChange);
      darkQuery.addListener(handleDarkChange);
      return () => {
        motionQuery.removeListener(handleMotionChange);
        darkQuery.removeListener(handleDarkChange);
      };
    }
  }, []);

  return preferences;
};

/**
 * Hook for SSR-safe IntersectionObserver
 * @param {IntersectionObserverCallback} callback - observer callback
 * @param {IntersectionObserverInit} options - observer options
 * @returns {React.RefObject<Element>} ref to attach to element
 */
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const elementRef = useRef<Element>(null);
  const callbackRef = useRef(callback);

  // Update callback ref on each render
  callbackRef.current = callback;

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = safeIntersectionObserver(
      (...arguments_) => callbackRef.current(...arguments_),
      options
    );

    if (observer) {
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [options]);

  return elementRef;
};

/**
 * Hook for SSR-safe ResizeObserver
 * @param {ResizeObserverCallback} callback - observer callback
 * @returns {React.RefObject<Element>} ref to attach to element
 */
export const useResizeObserver = (callback: ResizeObserverCallback) => {
  const elementRef = useRef<Element>(null);
  const callbackRef = useRef(callback);

  // Update callback ref on each render
  callbackRef.current = callback;

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = safeResizeObserver((...arguments_) =>
      callbackRef.current(...arguments_)
    );

    if (observer) {
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, []);

  return elementRef;
};

/**
 * Hook for SSR-safe MutationObserver
 * @param {MutationCallback} callback - observer callback
 * @param {MutationObserverInit} options - observer options
 * @returns {React.RefObject<Element>} ref to attach to element
 */
export const useMutationObserver = (
  callback: MutationCallback,
  options: MutationObserverInit
) => {
  const elementRef = useRef<Element>(null);
  const callbackRef = useRef(callback);

  // Update callback ref on each render
  callbackRef.current = callback;

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = safeMutationObserver((...arguments_) =>
      callbackRef.current(...arguments_)
    );

    if (observer) {
      observer.observe(element, options);
      return () => observer.disconnect();
    }
  }, [options]);

  return elementRef;
};

/**
 * Hook for SSR-safe document visibility
 * @returns {boolean} whether document is visible
 */
export const useDocumentVisibility = (): boolean => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const document_ = safeDocument();
    if (!document_) {
      return;
    }

    const handleVisibilityChange = () => {
      setIsVisible(!document_.hidden);
    };

    setIsVisible(!document_.hidden);

    const cleanup = safeAddEventListener(
      'visibilitychange',
      handleVisibilityChange
    );
    return cleanup;
  }, []);

  return isVisible;
};

/**
 * Hook for SSR-safe online status
 * @returns {boolean} whether browser is online
 */
export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const nav = safeWindow()?.navigator;
    if (!nav) {
      return;
    }

    setIsOnline(nav.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    const cleanupOnline = safeAddEventListener('online', handleOnline);
    const cleanupOffline = safeAddEventListener('offline', handleOffline);

    return () => {
      cleanupOnline();
      cleanupOffline();
    };
  }, []);

  return isOnline;
};
