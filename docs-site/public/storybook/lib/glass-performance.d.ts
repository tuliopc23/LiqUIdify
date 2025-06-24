/**
 * Glass Performance - Advanced performance optimization utilities
 * Virtual scrolling, lazy rendering, and memory management
 */
export declare const PERFORMANCE_THRESHOLDS: {
    FPS_TARGET: number;
    FPS_WARNING: number;
    FPS_CRITICAL: number;
    MEMORY_WARNING: number;
    MEMORY_CRITICAL: number;
    RENDER_BUDGET: number;
    INTERACTION_BUDGET: number;
    ANIMATION_BUDGET: number;
};
export interface VirtualScrollConfig {
    itemHeight: number | ((index: number) => number);
    itemCount: number;
    overscan?: number;
    scrollingDelay?: number;
    getScrollElement?: () => HTMLElement | null;
}
export interface PerformanceMetrics {
    fps: number;
    memory: number;
    renderTime: number;
    paintTime: number;
    scriptTime: number;
    layoutTime: number;
    idleTime: number;
}
export declare class FPSMonitor {
    private frameCount;
    private lastTime;
    private fps;
    private callbacks;
    private rafId;
    start(): void;
    stop(): void;
    subscribe(callback: (fps: number) => void): () => boolean;
    getCurrentFPS(): number;
}
export declare class MemoryMonitor {
    private callbacks;
    private intervalId;
    start(interval?: number): void;
    stop(): void;
    subscribe(callback: (memory: number) => void): () => boolean;
    getCurrentMemory(): number;
}
export declare function useVirtualScroll<T>({ items, itemHeight, containerHeight, overscan, getScrollElement, }: {
    items: T[];
    itemHeight: number | ((index: number) => number);
    containerHeight: number;
    overscan?: number;
    getScrollElement?: () => HTMLElement | null;
}): {
    visibleItems: T[];
    totalHeight: number;
    startIndex: number;
    endIndex: number;
    getItemOffset: (index: number) => number;
    isScrolling: boolean;
};
export declare function useLazyRender(threshold?: number, rootMargin?: string): {
    observe: (element: Element | null) => void;
    unobserve: (element: Element | null) => void;
    isVisible: (element: Element) => boolean;
};
export declare class AnimationThrottler {
    private queue;
    private rafId;
    private isProcessing;
    schedule(id: string, callback: () => void): void;
    private process;
    cancel(id: string): void;
    clear(): void;
}
export declare class MemoryPool<T> {
    private pool;
    private inUse;
    private factory;
    private reset;
    private maxSize;
    constructor(factory: () => T, reset: (item: T) => void, maxSize?: number);
    acquire(): T;
    release(item: T): void;
    clear(): void;
    getStats(): {
        poolSize: number;
        inUseSize: number;
        totalSize: number;
    };
}
export declare class WorkerManager {
    private workers;
    private taskQueue;
    private busyWorkers;
    private workerScript;
    constructor(workerScript: string, poolSize?: number);
    execute<T>(task: any): Promise<T>;
    private executeOnWorker;
    private processQueue;
    terminate(): void;
}
export declare class PerformanceBudget {
    private budgets;
    private measurements;
    private callbacks;
    setBudget(metric: string, maxValue: number): void;
    measure(metric: string, value: number): void;
    onBudgetExceeded(metric: string, callback: (exceeded: boolean, value: number) => void): void;
    getMetrics(): Record<string, {
        average: number;
        budget?: number;
        exceeded: boolean;
    }>;
}
export declare function useDebouncedRender<T>(value: T, delay: number): T;
export declare function usePerformanceMetrics(): PerformanceMetrics;
export declare const globalFPSMonitor: FPSMonitor;
export declare const globalMemoryMonitor: MemoryMonitor;
export declare const globalAnimationThrottler: AnimationThrottler;
export declare const globalPerformanceBudget: PerformanceBudget;
//# sourceMappingURL=glass-performance.d.ts.map