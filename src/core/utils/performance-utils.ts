/**
 * Performance utilities for optimizing component performance
 * 
 * These utilities help reduce unnecessary re-renders, computations, and DOM updates
 * to achieve S-tier performance standards.
 */

/**
 * Debounce function to limit the rate of function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

/**
 * Throttle function to limit function execution to once per interval
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Batch DOM updates to minimize reflows and repaints
 */
export function batchDOMUpdates(updates: (() => void)[]): void {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

/**
 * Check if performance monitoring should be active
 * Reduces overhead in production environments
 */
export function shouldMonitorPerformance(): boolean {
  // Skip performance monitoring in low-powered devices
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    if (conn?.effectiveType === '2g' || conn?.saveData) {
      return false;
    }
  }
  
  // Skip on older browsers that might struggle with monitoring overhead
  if (!('PerformanceObserver' in window) || !('requestIdleCallback' in window)) {
    return false;
  }
  
  return true;
}

/**
 * Optimize component props comparison for React.memo
 */
export function shallowEqual(objA: any, objB: any): boolean {
  if (objA === objB) {
    return true;
  }
  
  if (!objA || !objB || typeof objA !== 'object' || typeof objB !== 'object') {
    return false;
  }
  
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  
  if (keysA.length !== keysB.length) {
    return false;
  }
  
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Measure and log performance of a function
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  name: string,
  func: T
): T {
  return ((...args: Parameters<T>) => {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  }) as T;
}

/**
 * Check if current frame rate is below threshold
 */
export function isFrameRateBelow(threshold: number = 55): boolean {
  if (!('performance' in window)) return false;
  
  const entries = performance.getEntriesByType('measure');
  if (entries.length === 0) return false;
  
  // Estimate frame rate based on recent measurements
  const recentEntries = entries.slice(-10);
  const averageDuration = recentEntries.reduce((acc, entry) => acc + entry.duration, 0) / recentEntries.length;
  const estimatedFps = 1000 / (averageDuration || 16.67);
  
  return estimatedFps < threshold;
}

/**
 * Memory-efficient event listener management
 */
export class EventListenerManager {
  private listeners = new Map<Element, Map<string, EventListener>>();
  
  add(element: Element, event: string, listener: EventListener, options?: AddEventListenerOptions): void {
    if (!this.listeners.has(element)) {
      this.listeners.set(element, new Map());
    }
    
    const elementListeners = this.listeners.get(element)!;
    
    // Remove existing listener if it exists
    if (elementListeners.has(event)) {
      this.remove(element, event);
    }
    
    elementListeners.set(event, listener);
    element.addEventListener(event, listener, options);
  }
  
  remove(element: Element, event: string): void {
    const elementListeners = this.listeners.get(element);
    if (!elementListeners) return;
    
    const listener = elementListeners.get(event);
    if (listener) {
      element.removeEventListener(event, listener);
      elementListeners.delete(event);
      
      if (elementListeners.size === 0) {
        this.listeners.delete(element);
      }
    }
  }
  
  removeAll(element: Element): void {
    const elementListeners = this.listeners.get(element);
    if (!elementListeners) return;
    
    elementListeners.forEach((listener, event) => {
      element.removeEventListener(event, listener);
    });
    
    this.listeners.delete(element);
  }
  
  cleanup(): void {
    this.listeners.forEach((elementListeners, element) => {
      this.removeAll(element);
    });
  }
}