/**
 * Hydration utilities for SSR safety and hydration mismatch detection
 * Provides automatic recovery mechanisms and progressive enhancement
 */

import React, { useCallback, useEffect, useState } from 'react';
import { isBrowser } from './ssr-utils';

export interface HydrationMismatch {
  type: 'prop' | 'state' | 'style' | 'content' | 'structure';
  component: string;
  serverValue: any;
  clientValue: any;
  path: string;
  timestamp: number;
}

export interface HydrationContext {
  isHydrating: boolean;
  hasMismatch: boolean;
  mismatches: Array<HydrationMismatch>;
  retryCount: number;
  lastRetry: number;
  detectMismatch?: (
    type: HydrationMismatch['type'],
    serverValue: any,
    clientValue: any,
    path?: string
  ) => void;
}

export interface HydrationOptions {
  maxRetries?: number;
  retryDelay?: number;
  onMismatch?: (mismatch: HydrationMismatch) => void;
  onRecovery?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hydration state manager for tracking and handling hydration mismatches
 */
export class HydrationManager {
  private static instance: HydrationManager;
  private mismatches: Array<HydrationMismatch> = [];
  private retryCount = 0;
  private maxRetries = 3;
  private retryDelay = 1000;
  private listeners: Set<(context: HydrationContext) => void> = new Set();
  private recoveryCallbacks: Set<() => void> = new Set();
  private errorCallbacks: Set<(error: Error) => void> = new Set();

  private constructor() {}

  static getInstance(): HydrationManager {
    if (!HydrationManager.instance) {
      HydrationManager.instance = new HydrationManager();
    }
    return HydrationManager.instance;
  }

  addMismatch(mismatch: HydrationMismatch): void {
    this.mismatches.push(mismatch);
    this.notifyListeners();

    // Attempt automatic recovery if within retry limit
    if (this.retryCount < this.maxRetries) {
      this.scheduleRecovery();
    }
  }

  private scheduleRecovery(): void {
    setTimeout(
      () => {
        this.attemptRecovery();
      },
      this.retryDelay * 2 ** this.retryCount
    ); // Exponential backoff
  }

  private attemptRecovery(): void {
    this.retryCount++;

    try {
      // Clear existing mismatches
      this.mismatches = [];

      // Trigger recovery callbacks
      for (const callback of this.recoveryCallbacks) {
        callback();
      }

      this.notifyListeners();
    } catch (error) {
      for (const callback of this.errorCallbacks) {
        callback(error as Error);
      }
    }
  }

  getContext(): HydrationContext {
    return {
      isHydrating: this.mismatches.length > 0,
      hasMismatch: this.mismatches.length > 0,
      mismatches: [...this.mismatches],
      retryCount: this.retryCount,
      lastRetry: Date.now(),
    };
  }

  addListener(callback: (context: HydrationContext) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  addRecoveryCallback(callback: () => void): () => void {
    this.recoveryCallbacks.add(callback);
    return () => this.recoveryCallbacks.delete(callback);
  }

  addErrorCallback(callback: (error: Error) => void): () => void {
    this.errorCallbacks.add(callback);
    return () => this.errorCallbacks.delete(callback);
  }

  private notifyListeners(): void {
    const context = this.getContext();
    for (const callback of this.listeners) {
      callback(context);
    }
  }

  reset(): void {
    this.mismatches = [];
    this.retryCount = 0;
    this.notifyListeners();
  }
}

/**
 * Hook for detecting and handling hydration mismatches
 */
export function useHydrationSafety(
  componentName: string,
  options: HydrationOptions = {}
): HydrationContext {
  const {
    maxRetries: _maxRetries = 3,
    retryDelay: _retryDelay = 1000,
    onMismatch,
    onRecovery,
    onError,
  } = options;

  const manager = HydrationManager.getInstance();
  const [context, setContext] = useState<HydrationContext>(
    manager.getContext()
  );

  useEffect(() => {
    manager.addRecoveryCallback(() => {
      onRecovery?.();
    });

    manager.addErrorCallback((error) => {
      onError?.(error);
    });

    const unsubscribe = manager.addListener(setContext);
    return unsubscribe;
  }, [manager, onRecovery, onError]);

  const detectMismatch = useCallback(
    (
      type: HydrationMismatch['type'],
      serverValue: unknown,
      clientValue: unknown,
      path = ''
    ) => {
      if (serverValue !== clientValue) {
        const mismatch: HydrationMismatch = {
          type,
          component: componentName,
          serverValue,
          clientValue,
          path,
          timestamp: Date.now(),
        };

        manager.addMismatch(mismatch);
        onMismatch?.(mismatch);
      }
    },
    [componentName, manager, onMismatch]
  );

  return {
    ...context,
    detectMismatch,
  };
}

/**
 * Hook for SSR-safe state initialization with hydration support
 */
export function useHydrationState<T>(
  _key: string,
  serverValue: T,
  clientValue?: T
): [T, (value: T | ((previous: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    // During SSR, use server value
    if (!isBrowser()) {
      return serverValue;
    }

    // During hydration, check for client value
    if (clientValue !== undefined) {
      return clientValue;
    }

    // Fallback to server value
    return serverValue;
  });

  const setHydrationState = useCallback((value: T | ((previous: T) => T)) => {
    setState((previous) => {
      const newValue = value instanceof Function ? value(previous) : value;

      // Log potential hydration mismatches in development
      if ('development' === process.env.NODE_ENV && previous !== newValue) {
        // Logging disabled
      }

      return newValue;
    });
  }, []);

  return [state, setHydrationState];
}

/**
 * Hook for progressive enhancement detection
 */
export function useProgressiveEnhancement() {
  const [enhancements, setEnhancements] = useState({
    javascript: false,
    animations: false,
    webgl: false,
    intersectionObserver: false,
    resizeObserver: false,
  });

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const checks = {
      javascript: true,
      animations: !window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches,
      webgl: !!document.createElement('canvas').getContext('webgl'),
      intersectionObserver: 'IntersectionObserver' in window,
      resizeObserver: 'ResizeObserver' in window,
    };

    setEnhancements(checks);
  }, []);

  return enhancements;
}

/**
 * Component wrapper for SSR-safe hydration
 */
export function withHydrationSafety<P extends object>(
  Component: React.ComponentType<P>,
  options: HydrationOptions = {}
) {
  const HydrationSafeComponent = (props: P) => {
    const context = useHydrationSafety(
      Component.displayName || Component.name || 'Unknown',
      options
    );

    if (
      context.hasMismatch &&
      context.retryCount >= (options.maxRetries || 3)
    ) {
      // Render fallback when retries are exhausted
      return React.createElement(
        'div',
        { 'data-hydration-error': 'true' },
        'Loading...'
      );
    }

    return React.createElement(Component, props);
  };

  HydrationSafeComponent.displayName = `withHydrationSafety(${Component.displayName || Component.name || 'Unknown'})`;

  return HydrationSafeComponent;
}

/**
 * Utility for creating SSR-safe component props
 */
export function createSSRProps<T extends Record<string, unknown>>(
  serverProps: T,
  clientProps?: Partial<T>
): T {
  if (!isBrowser()) {
    return serverProps;
  }

  return {
    ...serverProps,
    ...clientProps,
  };
}

/**
 * Hook for detecting hydration completion
 */
export function useHydrationComplete() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Utility for safe client-side only execution
 */
export function useClientOnly<T>(
  factory: () => T,
  deps: Array<any> = []
): T | null {
  const [value, setValue] = useState<T | null | null>(undefined);
  const isHydrated = useHydrationComplete();

  useEffect(() => {
    if (isHydrated) {
      setValue(factory());
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: Hydration effect with controlled timing
  }, [isHydrated, factory, ...deps]);

  return value;
}

/**
 * Error boundary for hydration errors
 */
export class HydrationErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Logging disabled
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || React.createElement('div', {}, 'Loading...')
      );
    }

    return this.props.children;
  }
}
