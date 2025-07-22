/**
 * Core Performance Optimizations for LiqUIdify
 * Provides memoization, render optimization, and memory leak prevention
 */

import { memo, useMemo, useRef, useCallback, useEffect } from 'react';
import type { ComponentType, ReactElement } from 'react';

/**
 * Deep comparison for props to optimize React.memo
 */
function deepCompare(prevProps: any, nextProps: any): boolean {
  if (prevProps === nextProps) return true;
  
  if (!prevProps || !nextProps) return false;
  
  if (typeof prevProps !== 'object' || typeof nextProps !== 'object') {
    return prevProps === nextProps;
  }
  
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  
  if (prevKeys.length !== nextKeys.length) return false;
  
  for (const key of prevKeys) {
    if (!nextKeys.includes(key)) return false;
    
    // Special handling for functions and objects
    if (typeof prevProps[key] === 'function' && typeof nextProps[key] === 'function') {
      // Compare function names and toString for basic function equality
      if (prevProps[key].name !== nextProps[key].name) return false;
    } else if (typeof prevProps[key] === 'object' && typeof nextProps[key] === 'object') {
      if (!deepCompare(prevProps[key], nextProps[key])) return false;
    } else if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Performance-optimized memo HOC for glass components
 */
export function withPerformanceMemo<P extends object>(
  Component: ComponentType<P>,
  customCompare?: (prevProps: P, nextProps: P) => boolean
): ComponentType<P> {
  const MemoizedComponent = memo(Component, customCompare || deepCompare);
  MemoizedComponent.displayName = `PerformanceMemo(${Component.displayName || Component.name})`;
  return MemoizedComponent;
}

/**
 * Hook for optimized glass effects calculation
 */
export function useOptimizedGlassStyles(
  intensity: string = 'medium',
  blur: boolean = true,
  backdrop: boolean = true
) {
  return useMemo(() => {
    const intensityMap = {
      low: { opacity: 0.05, blur: '8px' },
      medium: { opacity: 0.1, blur: '12px' },
      high: { opacity: 0.15, blur: '16px' },
      ultra: { opacity: 0.2, blur: '20px' }
    };
    
    const settings = intensityMap[intensity as keyof typeof intensityMap] || intensityMap.medium;
    
    return {
      backgroundColor: `rgba(255, 255, 255, ${settings.opacity})`,
      backdropFilter: backdrop && blur ? `blur(${settings.blur})` : 'none',
      WebkitBackdropFilter: backdrop && blur ? `blur(${settings.blur})` : 'none',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      willChange: 'transform, opacity'
    };
  }, [intensity, blur, backdrop]);
}

/**
 * Optimized event handlers with proper cleanup
 */
export function useOptimizedEventHandlers() {
  const handlersRef = useRef<Map<string, (event: any) => void>>(new Map());
  const cleanupRef = useRef<(() => void)[]>([]);
  
  const addHandler = useCallback((element: HTMLElement, event: string, handler: (event: any) => void) => {
    if (!element) return;
    
    const key = `${event}_${Date.now()}`;
    handlersRef.current.set(key, handler);
    element.addEventListener(event, handler);
    
    const cleanup = () => {
      element.removeEventListener(event, handler);
      handlersRef.current.delete(key);
    };
    
    cleanupRef.current.push(cleanup);
    
    return cleanup;
  }, []);
  
  const cleanup = useCallback(() => {
    cleanupRef.current.forEach(fn => fn());
    cleanupRef.current = [];
    handlersRef.current.clear();
  }, []);
  
  return { addHandler, cleanup };
}

/**
 * Performance-aware animation frame manager
 */
export function useAnimationFrameManager() {
  const rafIds = useRef<Set<number>>(new Set());
  const isUnmounted = useRef(false);
  
  const requestFrame = useCallback((callback: FrameRequestCallback) => {
    if (isUnmounted.current) return;
    
    const id = requestAnimationFrame((timestamp) => {
      if (!isUnmounted.current) {
        callback(timestamp);
      }
      rafIds.current.delete(id);
    });
    
    rafIds.current.add(id);
    return id;
  }, []);
  
  const cancelFrame = useCallback((id: number) => {
    cancelAnimationFrame(id);
    rafIds.current.delete(id);
  }, []);
  
  const cancelAllFrames = useCallback(() => {
    rafIds.current.forEach(id => cancelAnimationFrame(id));
    rafIds.current.clear();
  }, []);
  
  // Cleanup on unmount
  const cleanup = useCallback(() => {
    isUnmounted.current = true;
    cancelAllFrames();
  }, [cancelAllFrames]);
  
  return { requestFrame, cancelFrame, cancelAllFrames, cleanup };
}

/**
 * Optimized CSS-in-JS styles with caching
 */
const styleCache = new Map<string, string>();

export function useOptimizedStyles(styleFactory: () => Record<string, string>, deps: any[]) {
  return useMemo(() => {
    const cacheKey = JSON.stringify(deps);
    
    if (styleCache.has(cacheKey)) {
      return styleCache.get(cacheKey)!;
    }
    
    const styles = styleFactory();
    const serializedStyles = JSON.stringify(styles);
    
    styleCache.set(cacheKey, serializedStyles);
    
    // Limit cache size to prevent memory leaks
    if (styleCache.size > 100) {
      const firstKey = styleCache.keys().next().value;
      styleCache.delete(firstKey);
    }
    
    return serializedStyles;
  }, deps);
}

/**
 * Memory-efficient ref manager
 */
export function useRefManager<T = HTMLElement>() {
  const refsMap = useRef<Map<string, T>>(new Map());
  
  const setRef = useCallback((key: string) => (element: T | null) => {
    if (element) {
      refsMap.current.set(key, element);
    } else {
      refsMap.current.delete(key);
    }
  }, []);
  
  const getRef = useCallback((key: string) => {
    return refsMap.current.get(key) || null;
  }, []);
  
  const clearRefs = useCallback(() => {
    refsMap.current.clear();
  }, []);
  
  return { setRef, getRef, clearRefs };
}

/**
 * Performance-aware component wrapper
 */
export function withPerformanceOptimization<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  function OptimizedComponent(props: P): ReactElement {
    const { cleanup: cleanupHandlers } = useOptimizedEventHandlers();
    const { cleanup: cleanupAnimations } = useAnimationFrameManager();
    
    // Cleanup on unmount
    useEffect(() => {
      return () => {
        cleanupHandlers();
        cleanupAnimations();
      };
    }, [cleanupHandlers, cleanupAnimations]);
    
    return <Component {...props} />;
  }
  
  OptimizedComponent.displayName = `PerformanceOptimized(${Component.displayName || Component.name})`;
  
  return withPerformanceMemo(OptimizedComponent);
}

/**
 * Bundle size monitoring utility
 */
export function trackBundleSize(componentName: string) {
  if (typeof window !== 'undefined' && window.performance) {
    const size = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    console.log(`${componentName} bundle impact:`, {
      transferSize: size.transferSize,
      encodedBodySize: size.encodedBodySize,
      decodedBodySize: size.decodedBodySize
    });
  }
}