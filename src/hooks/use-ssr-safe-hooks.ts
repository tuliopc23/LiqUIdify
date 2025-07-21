import { useEffect, useLayoutEffect } from 'react';

export const useSSRSafeLayoutEffect =
  'undefined' !== typeof window ? useLayoutEffect : useEffect;

export const useSSRSafe = (callback: () => void, deps: any[]) => {
  useEffect(() => {
    if ('undefined' !== typeof window) {
      callback();
    }
  }, deps);
};

export const isSSR = () => 'undefined' === typeof window;

// Additional SSR-safe hooks for demo component
export const useIntersectionObserver = (callback?: any) => [
  { isIntersecting: false },
];
export const useMediaQuery = (query: string) => false;
export const useNetworkStatus = () => ({
  online: true,
  effectiveType: '4g',
  downlink: 10,
  rtt: 50,
  saveData: false,
});
export const useOnlineStatus = () => true;
export const usePageVisibility = () => 'visible';
export const usePerformanceMetrics = () => ({
  loadTime: 0,
  renderTime: 0,
  domContentLoaded: 0,
  firstPaint: 0,
  firstContentfulPaint: 0,
});
export const useWindowSize = () => ({
  width: 1024,
  height: 768,
  isReady: true,
});
