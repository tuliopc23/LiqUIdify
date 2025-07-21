import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { isServer } from '@/utils/ssr-safe';

interface SSRSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  showFallback?: boolean;
  delay?: number;
}

/**
 * A wrapper component that only renders its children on the client side.
 * This is useful for components that use browser APIs and can't be rendered on the server.
 *
 * @example
 * ```tsx
 * <SSRSafeWrapper fallback={<div>Loading...</div>}>
 *   <ComponentWithBrowserAPIs />
 * </SSRSafeWrapper>
 * ```
 */
export const SSRSafeWrapper: React.FC<SSRSafeWrapperProps> = ({
  children,
  fallback = undefined,
  showFallback = true,
  delay = 0,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isServer || !isMounted) {
    return showFallback ? <>{fallback}</> : undefined;
  }

  return <>{children}</>;
};

/**
 * A higher-order component that makes any component SSR-safe by only rendering it on the client side.
 *
 * @example
 * ```tsx
 * const SSRSafeComponent = withSSRSafety(UnsafeComponent);
 * ```
 */
export function withSSRSafety<P extends object>(
  Component: React.ComponentType<P>,
  fallback: ReactNode = undefined,
  showFallback: boolean = true
): React.FC<P> {
  return (props: P) => (
    <SSRSafeWrapper fallback={fallback} showFallback={showFallback}>
      <Component {...props} />
    </SSRSafeWrapper>
  );
}

// Alias for backward compatibility
export const SSRSafe = SSRSafeWrapper;
export type SSRSafeProps = SSRSafeWrapperProps;
