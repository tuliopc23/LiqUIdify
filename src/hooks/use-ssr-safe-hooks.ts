/**
 * SSR-safe hooks for browser APIs and progressive enhancement
 * Provides comprehensive server-side rendering compatibility
 */

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { isBrowser } from '../utils/ssr-utils';
import { useProgressiveEnhancement } from '../utils/hydration-utils';

/**
 * Hook for SSR-safe window dimensions
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isReady: false,
  });

  useEffect(() => {
    if (!isBrowser()) return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isReady: true,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/**
 * Hook for SSR-safe media queries
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!isBrowser()) return;

    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener('change', updateMatches);
    return () => media.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
}

/**
 * Hook for SSR-safe intersection observer
 */
export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isBrowser() || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
}

/**
 * Hook for SSR-safe localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser()) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (!isBrowser()) return;

      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

/**
 * Hook for SSR-safe sessionStorage
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser()) return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (!isBrowser()) return;

      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

/**
 * Hook for SSR-safe online/offline detection
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (!isBrowser()) return true;
    return navigator.onLine;
  });

  useEffect(() => {
    if (!isBrowser()) return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Hook for SSR-safe geolocation
 */
export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<{
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    error: string | null;
    loading: boolean;
  }>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!isBrowser() || !navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation not supported',
      }));
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        error: null,
        loading: false,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  }, [options]);

  return state;
}

/**
 * Hook for SSR-safe clipboard API
 */
export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    if (!isBrowser() || !navigator.clipboard) {
      setError('Clipboard API not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (err) {
      setError('Failed to copy to clipboard');
      return false;
    }
  }, []);

  return { copy, isCopied, error };
}

/**
 * Hook for SSR-safe theme detection
 */
export function useTheme() {
  const enhancements = useProgressiveEnhancement();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (!isBrowser()) return 'light';

    const saved = localStorage.getItem('theme');
    if (saved) return saved as 'light' | 'dark';

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (!isBrowser()) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}

/**
 * Hook for SSR-safe scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isBrowser()) return;

    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

/**
 * Hook for SSR-safe resize observer
 */
export function useResizeObserver(
  callback: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isBrowser() || !ref.current || !window.ResizeObserver) return;

    const observer = new ResizeObserver(entries => {
      entries.forEach(callback);
    });

    observer.observe(ref.current, options);
    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}

/**
 * Hook for SSR-safe animation frame
 */
export function useAnimationFrame(callback: (time: number) => void) {
  const requestRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isBrowser()) return;

    const animate = (time: number) => {
      callbackRef.current(time);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
}

/**
 * Hook for SSR-safe idle callback
 */
export function useIdleCallback(callback: () => void, timeout?: number) {
  useEffect(() => {
    if (!isBrowser() || !window.requestIdleCallback) return;

    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }, [callback, timeout]);
}

/**
 * Hook for SSR-safe network status
 */
export function useNetworkStatus() {
  const [connection, setConnection] = useState<{
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  }>({});

  useEffect(() => {
    if (!isBrowser() || !('connection' in navigator)) return;

    const conn = (navigator as any).connection;

    const updateConnection = () => {
      setConnection({
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      });
    };

    updateConnection();
    conn.addEventListener('change', updateConnection);
    return () => conn.removeEventListener('change', updateConnection);
  }, []);

  return connection;
}

/**
 * Hook for SSR-safe visibility API
 */
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(() => {
    if (!isBrowser()) return true;
    return !document.hidden;
  });

  useEffect(() => {
    if (!isBrowser()) return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return isVisible;
}

/**
 * Hook for SSR-safe performance metrics
 */
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
  });

  useEffect(() => {
    if (!isBrowser() || !window.performance) return;

    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-paint') {
          setMetrics(prev => ({ ...prev, firstPaint: entry.startTime }));
        } else if (entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({
            ...prev,
            firstContentfulPaint: entry.startTime,
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });

    window.addEventListener('load', () => {
      setMetrics(prev => ({
        ...prev,
        loadTime:
          performance.timing.loadEventEnd - performance.timing.navigationStart,
        domContentLoaded:
          performance.timing.domContentLoadedEventEnd -
          performance.timing.navigationStart,
      }));
    });

    return () => observer.disconnect();
  }, []);

  return metrics;
}
