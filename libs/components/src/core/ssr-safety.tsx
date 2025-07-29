/**
 * SSR Safety Utilities
 *
 * Provides utilities for safe server-side rendering and client-side hydration
 */

import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useState } from 'react';

/**
 * Hook to safely check if we're on the client side
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Component that only renders its children on the client side
 */
export interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({
  children,
  fallback = undefined,
}: ClientOnlyProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * SSR-safe component wrapper that provides fallback during SSR
 */
export interface SSRSafeProps {
  children: ReactNode;
  fallback?: ReactNode;
  component?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

export function SSRSafe({
  children,
  fallback = undefined,
  component: Component = 'div',
  ...props
}: SSRSafeProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return fallback ? (
      <Component {...props}>{fallback}</Component>
    ) : undefined;
  }

  return <Component {...props}>{children}</Component>;
}

/**
 * Hook for SSR-safe access to window and document objects
 */
export function useSSRSafeWindow() {
  const [windowObject, setWindowObject] = useState<Window | undefined | null>(
    undefined
  );

  useEffect(() => {
    if ('undefined' !== typeof window) {
      setWindowObject(window);
    }
  }, []);

  return windowObject;
}

/**
 * Hook for SSR-safe localStorage access
 */
export function useSSRSafeLocalStorage() {
  const [storage, setStorage] = useState<Storage | undefined | null>(undefined);

  useEffect(() => {
    if ('undefined' !== typeof window && window.localStorage) {
      setStorage(window.localStorage);
    }
  }, []);

  return storage;
}

/**
 * Utility function to check if we're in a browser environment
 */
export const isBrowser = (): boolean => {
  return 'undefined' !== typeof window && 'undefined' !== typeof document;
};

/**
 * Alias for isBrowser for backward compatibility
 */
export const isClient = isBrowser;

/**
 * Utility function to safely access browser APIs
 */
export function safelyAccessBrowserAPI<T>(function_: () => T, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    return function_();
  } catch {
    // Logging disabled
    return fallback;
  }
}
