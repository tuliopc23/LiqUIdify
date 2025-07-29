import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * Safe layout effect that works on server
 */
export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Check if code is running on server
 */
export const isServer = typeof window === 'undefined';
export const isClient = !isServer;

/**
 * Safe window object with all properties
 */
export const safeWindow = new Proxy({} as Window, {
  get: (_target, property) => {
    if (isServer) {
      return;
    }
    return window[property as keyof Window];
  },
});

/**
 * Safe document object
 */
export const safeDocument = new Proxy({} as Document, {
  get: (_target, property) => {
    if (isServer) {
      return;
    }
    return document[property as keyof Document];
  },
});

/**
 * Execute callback only on client
 */
export const clientOnly = <T>(
  callback: () => T,
  fallback?: T
): T | _undefined => {
  if (isServer) {
    return fallback;
  }
  return callback();
};

/**
 * Safe storage wrapper
 */
export const storage = {
  get: (key: string, fallback = ''): string => {
    if (isServer) {
      return fallback;
    }
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  },
  set: (key: string, value: string): void => {
    if (isServer) {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch {
      // Logging disabled
    }
  },
  remove: (key: string): void => {
    if (isServer) {
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch {
      // Logging disabled
    }
  },
};

/**
 * Safe media query hook
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (isServer) {
      return;
    }

    const mediaQuery =
      typeof window === 'undefined' ? undefined : window.matchMedia(query);
    if (mediaQuery) {
      setMatches(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
      mediaQuery.addEventListener('change', handler);

      return () => mediaQuery.removeEventListener('change', handler);
    }
    return;
  }, [query]);

  return matches;
};
