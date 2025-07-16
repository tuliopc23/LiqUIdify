import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Hook that returns true when running on the client (browser)
 * and false during SSR/SSG
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * SSR-safe window object access
 */
export function useSSRSafeWindow() {
  const isClient = useIsClient();
  
  return {
    window: isClient ? window : undefined,
    document: isClient ? document : undefined,
    navigator: isClient ? navigator : undefined,
    location: isClient ? location : undefined,
  };
}

/**
 * Hook for SSR-safe localStorage access
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  }
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const isClient = useIsClient();
  
  const serialize = options?.serialize || JSON.stringify;
  const deserialize = options?.deserialize || JSON.parse;

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);
        
        if (isClient) {
          window.localStorage.setItem(key, serialize(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [isClient, key, serialize, storedValue]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (isClient) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [isClient, key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for SSR-safe sessionStorage access
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const isClient = useIsClient();

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;
    
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (isClient) {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [isClient, key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (isClient) {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [isClient, key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for SSR-safe media query matching
 */
export function useMediaQuery(query: string): boolean {
  const isClient = useIsClient();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use addEventListener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [isClient, query]);

  return matches;
}

/**
 * Hook for SSR-safe viewport dimensions
 */
export function useViewport() {
  const isClient = useIsClient();
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return viewport;
}

/**
 * Hook for SSR-safe animation frame
 */
export function useAnimationFrame(callback: (deltaTime: number) => void) {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const isClient = useIsClient();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (!isClient) return;
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, isClient]);
}

/**
 * Utility to check if code is running on server
 */
export const isServer = typeof window === 'undefined';

/**
 * Utility to check if code is running on client
 */
export const isClient = !isServer;

/**
 * Safe window access utility
 */
export const safeWindow = isClient ? window : undefined;

/**
 * Safe document access utility
 */
export const safeDocument = isClient ? document : undefined;

/**
 * SSR-safe requestAnimationFrame
 */
export const safeRequestAnimationFrame = 
  safeWindow?.requestAnimationFrame || ((cb: FrameRequestCallback) => setTimeout(cb, 16));

/**
 * SSR-safe cancelAnimationFrame
 */
export const safeCancelAnimationFrame = 
  safeWindow?.cancelAnimationFrame || clearTimeout;