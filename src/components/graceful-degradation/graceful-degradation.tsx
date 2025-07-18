/**
 * Graceful Degradation Components
 * Provides fallback components for browsers without JavaScript or modern features
 */

import { useEffect, useState, ReactNode } from 'react';
import { useSSRSafeFeatureDetection, useNetworkStatus, useIsClient } from '@/hooks/use-ssr-safe';

// Types
export interface GracefulDegradationProps {
    children: ReactNode;
    fallback: ReactNode;
    feature?: string;
    network?: boolean;
    performance?: boolean;
}

export interface StaticFallbackProps {
    children: ReactNode;
    fallback: ReactNode;
}

export interface FeatureDetectionProps {
    children: ReactNode;
    fallback: ReactNode;
    feature: string;
}

export interface NetworkAwareProps {
    children: ReactNode;
    offlineFallback: ReactNode;
    slowConnectionFallback?: ReactNode;
}

export interface PerformanceAwareProps {
    children: ReactNode;
    lowPerformanceFallback: ReactNode;
    threshold?: 'low' | 'medium' | 'high';
}

/**
 * Main Graceful Degradation Component
 * Provides fallbacks based on feature detection, network status, and device performance
 */
export function GracefulDegradation({
    children,
    fallback,
    feature,
    network = false,
    performance = false,
}: GracefulDegradationProps) {
    const isClient = useIsClient();

    // If not client-side, render fallback
    if (!isClient) {
        return <>{fallback}</>;
    }

    // Feature detection
    if (feature) {
        const isSupported = useSSRSafeFeatureDetection(feature);
        if (!isSupported) {
            return <>{fallback}</>;
        }
    }

    // Network awareness
    if (network) {
        const { online, effectiveType } = useNetworkStatus();
        if (!online || (effectiveType && ['slow-2g', '2g'].includes(effectiveType))) {
            return <>{fallback}</>;
        }
    }

    // Performance awareness
    if (performance) {
        const isLowPerformance = useDevicePerformance();
        if (isLowPerformance) {
            return <>{fallback}</>;
        }
    }

    // All checks passed, render children
    return <>{children}</>;
}

/**
 * Static Fallback Component
 * Provides static HTML fallback for JavaScript components
 */
export function StaticFallback({ children, fallback }: StaticFallbackProps) {
    const isClient = useIsClient();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // If server-side or not yet hydrated, render fallback
    if (!isClient || !isHydrated) {
        return <>{fallback}</>;
    }

    // Client-side and hydrated, render children
    return <>{children}</>;
}

/**
 * Feature Detection Component
 * Renders fallback if a specific browser feature is not supported
 */
export function FeatureDetection({ children, fallback, feature }: FeatureDetectionProps) {
    const isSupported = useSSRSafeFeatureDetection(feature);

    return isSupported ? <>{children}</> : <>{fallback}</>;
}

/**
 * Network Aware Component
 * Renders different content based on network status
 */
export function NetworkAware({
    children,
    offlineFallback,
    slowConnectionFallback
}: NetworkAwareProps) {
    const { online, effectiveType } = useNetworkStatus();

    if (!online) {
        return <>{offlineFallback}</>;
    }

    if (slowConnectionFallback && effectiveType && ['slow-2g', '2g'].includes(effectiveType)) {
        return <>{slowConnectionFallback}</>;
    }

    return <>{children}</>;
}

/**
 * Performance Aware Component
 * Renders different content based on device performance
 */
export function PerformanceAware({
    children,
    lowPerformanceFallback,
    threshold = 'low'
}: PerformanceAwareProps) {
    const isLowPerformance = useDevicePerformance(threshold);

    return isLowPerformance ? <>{lowPerformanceFallback}</> : <>{children}</>;
}

/**
 * Hook to detect device performance
 */
function useDevicePerformance(threshold: 'low' | 'medium' | 'high' = 'low'): boolean {
    const [isLowPerformance, setIsLowPerformance] = useState(false);
    const isClient = useIsClient();

    useEffect(() => {
        if (!isClient) return;

        // Check device memory
        const memory = (navigator as any).deviceMemory || 4;

        // Check CPU cores
        const cores = navigator.hardwareConcurrency || 4;

        // Check for battery saving mode
        const connection = (navigator as any).connection;
        const saveData = connection?.saveData || false;

        // Calculate performance score
        let score = 0;

        // Memory score
        score += memory >= 8 ? 3 : memory >= 4 ? 2 : 1;

        // CPU score
        score += cores >= 8 ? 3 : cores >= 4 ? 2 : 1;

        // Save data mode
        if (saveData) {
            score = 0; // Force low performance mode
        }

        // Determine if low performance based on threshold
        const thresholdMap = {
            low: 2,     // Very low-end devices
            medium: 4,  // Mid-range devices
            high: 6     // Only high-end devices get full experience
        };

        setIsLowPerformance(score < thresholdMap[threshold]);

        // Add class to document for CSS targeting
        if (score < thresholdMap[threshold]) {
            document.documentElement.classList.add('low-performance');
        } else {
            document.documentElement.classList.remove('low-performance');
        }
    }, [isClient, threshold]);

    return isLowPerformance;
}

/**
 * Component to apply feature detection classes to document
 */
export function FeatureDetectionClasses() {
    const isClient = useIsClient();

    useEffect(() => {
        if (!isClient) return;

        const features = [
            'css-backdrop-filter',
            'css-grid',
            'intersection-observer',
            'resize-observer',
            'web-animations',
            'local-storage',
            'custom-properties'
        ];

        features.forEach(feature => {
            let isSupported = false;

            switch (feature) {
                case 'css-backdrop-filter':
                    isSupported = CSS.supports('backdrop-filter', 'blur(1px)');
                    break;
                case 'css-grid':
                    isSupported = CSS.supports('display', 'grid');
                    break;
                case 'intersection-observer':
                    isSupported = 'IntersectionObserver' in window;
                    break;
                case 'resize-observer':
                    isSupported = 'ResizeObserver' in window;
                    break;
                case 'web-animations':
                    isSupported = 'animate' in document.createElement('div');
                    break;
                case 'local-storage':
                    try {
                        localStorage.setItem('test', 'test');
                        localStorage.removeItem('test');
                        isSupported = true;
                    } catch {
                        isSupported = false;
                    }
                    break;
                case 'custom-properties':
                    isSupported = CSS.supports('--test', '0');
                    break;
                default:
                    isSupported = false;
            }

            if (isSupported) {
                document.documentElement.classList.add(`supports-${feature}`);
                document.documentElement.classList.remove(`no-${feature}`);
            } else {
                document.documentElement.classList.add(`no-${feature}`);
                document.documentElement.classList.remove(`supports-${feature}`);
            }
        });

        // Check for JavaScript
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');

        // Check for network status
        const updateNetworkStatus = () => {
            if (navigator.onLine) {
                document.documentElement.classList.remove('offline');
                document.documentElement.classList.add('online');
            } else {
                document.documentElement.classList.add('offline');
                document.documentElement.classList.remove('online');
            }
        };

        updateNetworkStatus();
        window.addEventListener('online', updateNetworkStatus);
        window.addEventListener('offline', updateNetworkStatus);

        return () => {
            window.removeEventListener('online', updateNetworkStatus);
            window.removeEventListener('offline', updateNetworkStatus);
        };
    }, [isClient]);

    return null;
}

/**
 * Component to apply progressive enhancement classes
 */
export function ProgressiveEnhancementProvider({
    children,
    level = 'base'
}: {
    children: ReactNode;
    level?: 'base' | 'enhanced' | 'advanced';
}) {
    const isClient = useIsClient();

    useEffect(() => {
        if (!isClient) return;

        // Remove all experience classes
        document.documentElement.classList.remove(
            'base-experience',
            'enhanced-experience',
            'advanced-experience'
        );

        // Add appropriate class
        document.documentElement.classList.add(`${level}-experience`);
    }, [isClient, level]);

    return <>{children}</>;
}

export default {
    GracefulDegradation,
    StaticFallback,
    FeatureDetection,
    NetworkAware,
    PerformanceAware,
    FeatureDetectionClasses,
    ProgressiveEnhancementProvider
};