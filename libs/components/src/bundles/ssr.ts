/**
 * SSR Bundle
 * Server-side rendering utilities and components
 */

import React from "react";

// SSR-safe hooks
export * from "../hooks/use-ssr-safe-hooks";

// SSR providers
export * from "../providers/ssr-config-provider";

// SSR utilities
export { _isSSR, _useSSRSafe } from "../hooks/use-ssr-safe-hooks";

// SSR-safe component variants
export * from "../components/glass-ssr-demo";

// Re-export commonly needed SSR utilities
export const isServerSide = () => typeof window === "undefined";
export const isClientSide = () => typeof window !== "undefined";

// SSR polyfills and compatibility helpers
export const createSSRSafeComponent = <T>(
  clientComponent: T,
  serverFallback?: () => React.JSX.Element | null,
): T => {
  if (typeof window === "undefined") {
    return (serverFallback as unknown as T) || ((() => null) as unknown as T);
  }
  return clientComponent;
};

// Hydration utilities
export const withHydrationSafe = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<P> => {
  return (props: P) => {
    const [isHydrated, setIsHydrated] = React.useState(false);

    React.useEffect(() => {
      setIsHydrated(true);
    }, []);

    if (!isHydrated) {
      return null;
    }

    return React.createElement(Component, props);
  };
};
