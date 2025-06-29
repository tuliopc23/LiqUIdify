/**
 * Glass Performance - Advanced performance optimization utilities
 * Virtual scrolling, lazy rendering, and memory management
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  FPS_TARGET: 60,
  FPS_WARNING: 45,
  FPS_CRITICAL: 30,
  MEMORY_WARNING: 50, // MB
  MEMORY_CRITICAL: 100, // MB
  RENDER_BUDGET: 16.67, // ms (60fps)
  INTERACTION_BUDGET: 100, // ms
  ANIMATION_BUDGET: 200, // ms
};

// Virtual scrolling configuration
export interface VirtualScrollConfig {
  itemHeight: number | ((index: number) => number);
  itemCount: number;
  overscan?: number;
  scrollingDelay?: number;
  getScrollElement?: () => HTMLElement | null;
}

// Performance metrics
export interface PerformanceMetrics {
  fps: number;
  memory: number;
  renderTime: number;
  paintTime: number;
  scriptTime: number;
  layoutTime: number;
  idleTime: number;
}

// FPS Monitor class
export class FPSMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private callbacks: Set<(fps: number) => void> = new Set();
  private rafId: number | null = null;

  start() {
    const measure = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastTime;

      if (deltaTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / deltaTime);
        this.frameCount = 0;
        this.lastTime = currentTime;

        this.callbacks.forEach(callback => callback(this.fps));
      }

      this.frameCount++;
      this.rafId = requestAnimationFrame(measure);
    };

    measure();
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  subscribe(callback: (fps: number) => void) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  getCurrentFPS() {
    return this.fps;
  }
}

// Memory monitor
export class MemoryMonitor {
  private callbacks: Set<(memory: number) => void> = new Set();
  private intervalId: number | null = null;

  start(interval = 1000) {
    if (!('memory' in performance)) {
      console.warn('Performance.memory is not available');
      return;
    }

    this.intervalId = window.setInterval(() => {
      const memory = (performance as any).memory.usedJSHeapSize / 1024 / 1024;
      this.callbacks.forEach(callback => callback(memory));
    }, interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(callback: (memory: number) => void) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  getCurrentMemory() {
    if (!('memory' in performance)) return 0;
    return (performance as any).memory.usedJSHeapSize / 1024 / 1024;
  }
}

// Virtual scrolling hook
export function useVirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 3,
  getScrollElement,
}: {
  items: T[];
  itemHeight: number | ((index: number) => number);
  containerHeight: number;
  overscan?: number;
  getScrollElement?: () => HTMLElement | null;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Calculate item heights
  const getItemHeight = useCallback(
    (index: number) => {
      return typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
    },
    [itemHeight]
  );

  // Calculate total height
  const totalHeight = items.reduce((acc, _, index) => {
    return acc + getItemHeight(index);
  }, 0);

  // Calculate visible range
  const getVisibleRange = useCallback(() => {
    let accumulatedHeight = 0;
    let startIndex = 0;
    let endIndex = items.length - 1;

    // Find start index
    for (let i = 0; i < items.length; i++) {
      const height = getItemHeight(i);
      if (accumulatedHeight + height > scrollTop) {
        startIndex = Math.max(0, i - overscan);
        break;
      }
      accumulatedHeight += height;
    }

    // Find end index
    accumulatedHeight = 0;
    for (let i = startIndex; i < items.length; i++) {
      if (accumulatedHeight > containerHeight + scrollTop) {
        endIndex = Math.min(items.length - 1, i + overscan);
        break;
      }
      accumulatedHeight += getItemHeight(i);
    }

    return { startIndex, endIndex };
  }, [items.length, scrollTop, containerHeight, overscan, getItemHeight]);

  const { startIndex, endIndex } = getVisibleRange();

  // Calculate offset for visible items
  const getItemOffset = useCallback(
    (index: number) => {
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += getItemHeight(i);
      }
      return offset;
    },
    [getItemHeight]
  );

  // Handle scroll
  useEffect(() => {
    const scrollElement = getScrollElement ? getScrollElement() : window;
    if (!scrollElement) return;

    const handleScroll = () => {
      const newScrollTop =
        scrollElement === window
          ? window.pageYOffset
          : (scrollElement as HTMLElement).scrollTop;

      setScrollTop(newScrollTop);
      setIsScrolling(true);

      // Debounce scrolling state
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [getScrollElement]);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return {
    visibleItems,
    totalHeight,
    startIndex,
    endIndex,
    getItemOffset,
    isScrolling,
  };
}

// Intersection Observer for lazy rendering
export function useLazyRender(threshold = 0.1, rootMargin = '50px') {
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target));
          } else {
            setVisibleElements(prev => {
              const next = new Set(prev);
              next.delete(entry.target);
              return next;
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin]);

  const observe = useCallback((element: Element | null) => {
    if (element) {
      observerRef.current?.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: Element | null) => {
    if (element) {
      observerRef.current?.unobserve(element);
    }
  }, []);

  const isVisible = useCallback(
    (element: Element) => {
      return visibleElements.has(element);
    },
    [visibleElements]
  );

  return { observe, unobserve, isVisible };
}

// RAF-based animation throttling
export class AnimationThrottler {
  private queue: Map<string, () => void> = new Map();
  private rafId: number | null = null;
  private isProcessing = false;

  schedule(id: string, callback: () => void) {
    this.queue.set(id, callback);

    if (!this.isProcessing) {
      this.process();
    }
  }

  private process() {
    if (this.queue.size === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;

    this.rafId = requestAnimationFrame(() => {
      const callbacks = Array.from(this.queue.values());
      this.queue.clear();

      callbacks.forEach(callback => callback());

      this.process();
    });
  }

  cancel(id: string) {
    this.queue.delete(id);
  }

  clear() {
    this.queue.clear();
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isProcessing = false;
  }
}

// Memory pool for reusable objects
export class MemoryPool<T> {
  private pool: T[] = [];
  private inUse: Set<T> = new Set();
  private factory: () => T;
  private reset: (item: T) => void;
  private maxSize: number;

  constructor(factory: () => T, reset: (item: T) => void, maxSize = 100) {
    this.factory = factory;
    this.reset = reset;
    this.maxSize = maxSize;
  }

  acquire(): T {
    let item = this.pool.pop();

    if (!item) {
      item = this.factory();
    }

    this.inUse.add(item);
    return item;
  }

  release(item: T) {
    if (!this.inUse.has(item)) return;

    this.inUse.delete(item);
    this.reset(item);

    if (this.pool.length < this.maxSize) {
      this.pool.push(item);
    }
  }

  clear() {
    this.pool = [];
    this.inUse.clear();
  }

  getStats() {
    return {
      poolSize: this.pool.length,
      inUseSize: this.inUse.size,
      totalSize: this.pool.length + this.inUse.size,
    };
  }
}

// Web Worker manager for heavy computations
export class WorkerManager {
  private workers: Worker[] = [];
  private taskQueue: Array<{
    id: string;
    task: any;
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];
  private busyWorkers: Set<Worker> = new Set();
  private workerScript: string;

  constructor(
    workerScript: string,
    poolSize = navigator.hardwareConcurrency || 4
  ) {
    this.workerScript = workerScript;

    // Create worker pool
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript);
      this.workers.push(worker);
    }
  }

  async execute<T>(task: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const taskId = Math.random().toString(36).substr(2, 9);

      // Find available worker
      const availableWorker = this.workers.find(w => !this.busyWorkers.has(w));

      if (availableWorker) {
        this.executeOnWorker(
          availableWorker,
          { id: taskId, task },
          resolve,
          reject
        );
      } else {
        // Queue task if no workers available
        this.taskQueue.push({ id: taskId, task, resolve, reject });
      }
    });
  }

  private executeOnWorker(
    worker: Worker,
    message: { id: string; task: any },
    resolve: (value: any) => void,
    reject: (error: any) => void
  ) {
    this.busyWorkers.add(worker);

    const handleMessage = (e: MessageEvent) => {
      if (e.data.id === message.id) {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        this.busyWorkers.delete(worker);

        if (e.data.error) {
          reject(e.data.error);
        } else {
          resolve(e.data.result);
        }

        // Process next task in queue
        this.processQueue();
      }
    };

    const handleError = (error: ErrorEvent) => {
      worker.removeEventListener('message', handleMessage);
      worker.removeEventListener('error', handleError);
      this.busyWorkers.delete(worker);
      reject(error);
      this.processQueue();
    };

    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);
    worker.postMessage(message);
  }

  private processQueue() {
    if (this.taskQueue.length === 0) return;

    const availableWorker = this.workers.find(w => !this.busyWorkers.has(w));
    if (availableWorker) {
      const task = this.taskQueue.shift()!;
      this.executeOnWorker(
        availableWorker,
        { id: task.id, task: task.task },
        task.resolve,
        task.reject
      );
    }
  }

  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.taskQueue = [];
    this.busyWorkers.clear();
  }
}

// Performance budget monitor
export class PerformanceBudget {
  private budgets: Map<string, number> = new Map();
  private measurements: Map<string, number[]> = new Map();
  private callbacks: Map<string, (exceeded: boolean, value: number) => void> =
    new Map();

  setBudget(metric: string, maxValue: number) {
    this.budgets.set(metric, maxValue);
  }

  measure(metric: string, value: number) {
    if (!this.measurements.has(metric)) {
      this.measurements.set(metric, []);
    }

    const values = this.measurements.get(metric)!;
    values.push(value);

    // Keep only last 10 measurements
    if (values.length > 10) {
      values.shift();
    }

    // Check budget
    const budget = this.budgets.get(metric);
    if (budget !== undefined) {
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      const exceeded = average > budget;

      const callback = this.callbacks.get(metric);
      if (callback) {
        callback(exceeded, average);
      }
    }
  }

  onBudgetExceeded(
    metric: string,
    callback: (exceeded: boolean, value: number) => void
  ) {
    this.callbacks.set(metric, callback);
  }

  getMetrics() {
    const metrics: Record<
      string,
      { average: number; budget?: number; exceeded: boolean }
    > = {};

    this.measurements.forEach((values, metric) => {
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      const budget = this.budgets.get(metric);

      metrics[metric] = {
        average,
        budget,
        exceeded: budget !== undefined && average > budget,
      };
    });

    return metrics;
  }
}

// Debounced render hook
export function useDebouncedRender<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Performance monitoring hook
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    renderTime: 0,
    paintTime: 0,
    scriptTime: 0,
    layoutTime: 0,
    idleTime: 0,
  });

  const fpsMonitor = useRef(new FPSMonitor());
  const memoryMonitor = useRef(new MemoryMonitor());

  useEffect(() => {
    // Start FPS monitoring
    fpsMonitor.current.start();
    const unsubscribeFPS = fpsMonitor.current.subscribe(fps => {
      setMetrics(prev => ({ ...prev, fps }));
    });

    // Start memory monitoring
    memoryMonitor.current.start();
    const unsubscribeMemory = memoryMonitor.current.subscribe(memory => {
      setMetrics(prev => ({ ...prev, memory }));
    });

    // Monitor performance entries
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();

      entries.forEach(entry => {
        if (entry.entryType === 'measure') {
          const duration = entry.duration;

          switch (entry.name) {
            case 'render':
              setMetrics(prev => ({ ...prev, renderTime: duration }));
              break;
            case 'paint':
              setMetrics(prev => ({ ...prev, paintTime: duration }));
              break;
            case 'script':
              setMetrics(prev => ({ ...prev, scriptTime: duration }));
              break;
            case 'layout':
              setMetrics(prev => ({ ...prev, layoutTime: duration }));
              break;
          }
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    return () => {
      fpsMonitor.current.stop();
      memoryMonitor.current.stop();
      unsubscribeFPS();
      unsubscribeMemory();
      observer.disconnect();
    };
  }, []);

  return metrics;
}

// Export singleton instances
export const globalFPSMonitor = new FPSMonitor();
export const globalMemoryMonitor = new MemoryMonitor();
export const globalAnimationThrottler = new AnimationThrottler();
export const globalPerformanceBudget = new PerformanceBudget();

// Set default performance budgets
globalPerformanceBudget.setBudget(
  'renderTime',
  PERFORMANCE_THRESHOLDS.RENDER_BUDGET
);
globalPerformanceBudget.setBudget(
  'interactionTime',
  PERFORMANCE_THRESHOLDS.INTERACTION_BUDGET
);
globalPerformanceBudget.setBudget(
  'animationTime',
  PERFORMANCE_THRESHOLDS.ANIMATION_BUDGET
);
globalPerformanceBudget.setBudget(
  'memory',
  PERFORMANCE_THRESHOLDS.MEMORY_WARNING
);
