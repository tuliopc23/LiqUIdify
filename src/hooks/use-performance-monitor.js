import { useEffect, useRef, useCallback } from 'react';
export function usePerformanceMonitor({ componentName, trackMemory = false, threshold = 16, // 60fps = 16.67ms per frame
onSlowRender, }) {
    const renderStartTime = useRef(0);
    const frameCount = useRef(0);
    const isMonitoring = useRef(false);
    const startMonitoring = useCallback(() => {
        if (isMonitoring.current)
            return;
        renderStartTime.current = performance.now();
        frameCount.current = 0;
        isMonitoring.current = true;
        // Count animation frames during render
        const countFrame = () => {
            if (isMonitoring.current) {
                frameCount.current++;
                requestAnimationFrame(countFrame);
            }
        };
        requestAnimationFrame(countFrame);
    }, []);
    const stopMonitoring = useCallback(() => {
        if (!isMonitoring.current)
            return;
        const renderTime = performance.now() - renderStartTime.current;
        isMonitoring.current = false;
        const metrics = {
            renderTime,
            animationFrames: frameCount.current,
            ...(trackMemory && 'memory' in performance
                ? {
                    memoryUsage: performance.memory.usedJSHeapSize / 1024 / 1024, // MB
                }
                : {}),
        };
        // Log performance data
        if (process.env.NODE_ENV === 'development') {
            console.log(`🎭 Glass Performance [${componentName}]:`, {
                renderTime: `${renderTime.toFixed(2)}ms`,
                frames: frameCount.current,
                ...(metrics.memoryUsage
                    ? { memory: `${metrics.memoryUsage.toFixed(2)}MB` }
                    : {}),
                ...(renderTime > threshold
                    ? { warning: '⚠️ Slow render detected!' }
                    : {}),
            });
        }
        // Trigger callback if render is slow
        if (renderTime > threshold && onSlowRender) {
            onSlowRender(metrics);
        }
        return metrics;
    }, [componentName, threshold, trackMemory, onSlowRender]);
    // Monitor component mount/unmount
    useEffect(() => {
        startMonitoring();
        return () => {
            stopMonitoring();
        };
    }, [startMonitoring, stopMonitoring]);
    return { startMonitoring, stopMonitoring };
}
// Hook for measuring glass effect performance specifically
export function useGlassEffectPerformance(componentName) {
    const { startMonitoring, stopMonitoring } = usePerformanceMonitor({
        componentName: `Glass-${componentName}`,
        trackMemory: true,
        threshold: 32, // More lenient for glass effects
        onSlowRender: metrics => {
            // Log warning but don't break functionality
            console.warn(`🐌 Slow glass effect in ${componentName}:`, metrics);
        },
    });
    const measureGlassInteraction = useCallback((interactionType) => {
        const start = performance.now();
        return () => {
            const duration = performance.now() - start;
            if (process.env.NODE_ENV === 'development') {
                console.log(`✨ Glass ${interactionType} [${componentName}]: ${duration.toFixed(2)}ms`);
            }
        };
    }, [componentName]);
    return { startMonitoring, stopMonitoring, measureGlassInteraction };
}
