/**
 * SSR Safety Utilities
 *
 * Provides utilities for safe server-side rendering and client-side hydration
 */

import { type ReactNode, useEffect, useState } from "react";

/**
 * Hook to safely check if we're on the client side
 */
function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Component that only renders its children on the client side
 */
interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function ClientOnly({ children, fallback = undefined }: ClientOnlyProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * SSR-safe component wrapper that provides fallback during SSR
 */
interface SSRSafeProps {
  children: ReactNode;
  fallback?: ReactNode;
  component?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
}

function SSRSafe({
  children,
  fallback = undefined,
  component: Component = "div",
  ...props
}: SSRSafeProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return fallback ? <Component {...props}>{fallback}</Component> : undefined;
  }

  return <Component {...props}>{children}</Component>;
}

/**
 * Hook for SSR-safe access to window and document objects
 */
function useSSRSafeWindow() {
  const [windowObject, setWindowObject] = useState<Window | undefined | null>(
    undefined,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowObject(window);
    }
  }, []);

  return windowObject;
}

/**
 * Hook for SSR-safe localStorage access
 */
function useSSRSafeLocalStorage() {
  const [storage, setStorage] = useState<Storage | undefined | null>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setStorage(window.localStorage);
    }
  }, []);

  return storage;
}

/**
 * Utility function to check if we're in a browser environment
 */
const isBrowser = (): boolean => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

/**
 * Alias for isBrowser for backward compatibility
 */
const isClient = isBrowser;

/**
 * Utility function to safely access browser APIs
 */
function safelyAccessBrowserAPI<T>(function_: () => T, fallback: T): T {
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
