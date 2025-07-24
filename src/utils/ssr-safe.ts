import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * Safe layout effect that works on server
 */
export const useIsomorphicLayoutEffect =
  'undefined' !== typeof window ? useLayoutEffect : useEffect;

/**
 * Check if code is running on server
 */
export const isServer = 'undefined' === typeof window;
export const isClient = !isServer;

/**
 * Safe window object with all properties
 */
export const safeWindow = new Proxy({} as Window, {
  get: (_target, prop) => {
    if (isServer) {
      return;
    }
    return window[prop as keyof Window];
  },
});

/**
 * Safe document object
 */
export const safeDocument = new Proxy({} as Document, {
  get: (_target, prop) => {
    if (isServer) {
      return;
    }
    return document[prop as keyof Document];
  },
});

/**
 * Execute callback only on client
 */
export const clientOnly = <T>(
  callback: () => T,
  fallback?: T
): T | undefined => {
  if (isServer) {
    return fallback;
  }
  return callback();
};

/**
 * Safe storage wrapper
 */
export const storage = {
  get: (key: string, fallback: string = ''): string => {
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
      'undefined' !== typeof window ? window.matchMedia(query) : undefined;
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
