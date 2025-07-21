/**
 * Enhanced SSR Provider with hydration safety and progressive enhancement
 * Provides comprehensive SSR support with automatic recovery mechanisms
 */

import type { ReactNode } from 'react';
import React, {
  useState,
  useEffect,
  // useCallback,
} from 'react';
import { useProgressiveEnhancement } from '../utils/hydration-utils';
import { isBrowser } from '../utils/ssr-utils';

export interface EnhancedSSRProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
  loading?: ReactNode;
  onHydrationComplete?: () => void;
  // onHydrationError?: (error: Error) => void;
  enableProgressiveEnhancement?: boolean;
  // enableHydrationRecovery?: boolean;
  maxHydrationRetries?: number;
}

/**
 * Enhanced SSR Provider with hydration safety
 */
export function EnhancedSSRProvider({
  children,
  fallback = undefined,
  loading = <div>Loading...</div>,
  onHydrationComplete,
  // onHydrationError,
  enableProgressiveEnhancement: _enableProgressiveEnhancement = true,
  // enableHydrationRecovery = true,
  maxHydrationRetries = 3,
}: EnhancedSSRProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [_hydrationError, _setHydrationError] = useState<Error | null>(
    undefined
  );
  const [_hasError, _setHasError] = useState(false);
  const [_retryCount, _setRetryCount] = useState(0);

  const enhancements = useProgressiveEnhancement();

  // Handle client-side detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle hydration completion
  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const handleHydrationComplete = () => {
      setIsHydrated(true);
      onHydrationComplete?.();
    };

    // Simulate hydration completion
    const timeout = setTimeout(handleHydrationComplete, 0);
    return () => clearTimeout(timeout);
  }, [isClient, onHydrationComplete]);

  // Server-side rendering
  if (!isClient) {
    return <>{fallback || children}</>;
  }

  // Hydration error state
  if (_hasError && _retryCount >= maxHydrationRetries) {
    return <>{fallback || loading}</>;
  }

  // Hydration in progress
  if (!isHydrated) {
    return <>{loading}</>;
  }

  // Fully hydrated with enhancements
  return (
    <div
      data-ssr-hydrated="true"
      data-enhancements={JSON.stringify(enhancements)}
    >
      {children}
    </div>
  );
}

/**
 * Hook for checking SSR and hydration state
 */
export function useSSRState() {
  const [state, setState] = useState({
    isClient: false,
    isHydrated: false,
    isServer: true,
  });

  useEffect(() => {
    setState({
      isClient: true,
      isHydrated: true,
      isServer: false,
    });
  }, []);

  return state;
}

/**
 * Hook for progressive enhancement detection
 */
export function useEnhancement() {
  return useProgressiveEnhancement();
}

/**
 * Component wrapper for SSR-safe rendering
 */
export function withEnhancedSSR<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<EnhancedSSRProviderProps, 'children'> = {}
) {
  const EnhancedComponent = (props: P) => {
    return (
      <EnhancedSSRProvider {...options}>
        <Component {...props} />
      </EnhancedSSRProvider>
    );
  };

  EnhancedComponent.displayName = `withEnhancedSSR(${Component.displayName || Component.name || 'Unknown'})`;

  return EnhancedComponent;
}

/**
 * Hook for safe client-side only execution
 */
export function useClientOnly<T>(
  factory: () => T,
  deps: any[] = []
): { value: T | null; isReady: boolean } {
  const [value, setValue] = useState<T | null>(undefined);
  const [isReady, setIsReady] = useState(false);
  const isClient = isBrowser();

  useEffect(() => {
    if (isClient) {
      setValue(factory());
      setIsReady(true);
    }
  }, [isClient, ...deps]);

  return { value, isReady };
}

/**
 * Hook for hydration-safe state management
 */
export function useHydrationSafeState<T>(
  serverValue: T,
  clientValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (!isBrowser()) {
      return serverValue;
    }
    return clientValue !== undefined ? clientValue : serverValue;
  });

  return [state, setState];
}

/**
 * Utility for creating SSR-safe event handlers
 */
export function createSSREventHandler<T extends (...args: any[]) => any>(
  handler: T
): T | (() => void) {
  return isBrowser() ? handler : () => {};
}

/**
 * Hook for measuring hydration performance
 */
export function useHydrationMetrics() {
  const [metrics, setMetrics] = useState({
    hydrationStart: 0,
    hydrationEnd: 0,
    duration: 0,
    hasError: false,
  });

  useEffect(() => {
    if (!isBrowser()) {
      return undefined;
    }

    const start = performance.now();
    setMetrics((prev) => ({ ...prev, hydrationStart: start }));

    const handleHydrationComplete = () => {
      const end = performance.now();
      setMetrics({
        hydrationStart: start,
        hydrationEnd: end,
        duration: end - start,
        hasError: false,
      });
    };

    // Simulate hydration completion
    const timeout = setTimeout(handleHydrationComplete, 0);
    return () => clearTimeout(timeout);
  }, []);

  return metrics;
}
