import React, { type ReactNode, useEffect, useState } from "react";

import { ConfigProvider, type ConfigProviderProps } from "./config-provider";

interface SSRConfigProviderProps extends ConfigProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * SSR-safe configuration provider that handles hydration mismatches
 * and provides proper server-side rendering support
 */
function SSRConfigProvider({
  children,
  fallback = undefined,
  ...configProps
}: SSRConfigProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR and initial hydration, show fallback or basic content
  if (!isClient) {
    return <>{fallback || children}</>;
  }

  // Once hydrated, render with full configuration

  return <ConfigProvider {...configProps}>{children}</ConfigProvider>;
}

/**
 * Hook to check if we're running on the client side
 * Useful for conditional rendering of client-only features
 */
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Higher-order component that adds SSR safety to any component
 */
function withSSRSafety<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  const SSRSafeComponent = (props: P) => {
    const isClient = useIsClient();

    if (!isClient) {
      return <>{fallback || undefined}</>;
    }

    return <Component {...props} />;
  };

  SSRSafeComponent.displayName = `withSSRSafety(${Component.displayName || Component.name})`;

  return SSRSafeComponent;
}
