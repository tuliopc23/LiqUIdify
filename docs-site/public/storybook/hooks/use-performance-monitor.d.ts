interface PerformanceMetrics {
    renderTime: number;
    animationFrames: number;
    memoryUsage?: number;
}
interface PerformanceMonitorOptions {
    componentName: string;
    trackMemory?: boolean;
    threshold?: number;
    onSlowRender?: (metrics: PerformanceMetrics) => void;
}
export declare function usePerformanceMonitor({ componentName, trackMemory, threshold, // 60fps = 16.67ms per frame
onSlowRender, }: PerformanceMonitorOptions): {
    startMonitoring: () => void;
    stopMonitoring: () => PerformanceMetrics | undefined;
};
export declare function useGlassEffectPerformance(componentName: string): {
    startMonitoring: () => void;
    stopMonitoring: () => PerformanceMetrics | undefined;
    measureGlassInteraction: (interactionType: string) => () => void;
};
export {};
//# sourceMappingURL=use-performance-monitor.d.ts.map