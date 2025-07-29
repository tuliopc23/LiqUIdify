import { useEffect, useLayoutEffect } from "react";

export const useSSRSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const useSSRSafe = (callback: () => void, deps: Array<unknown>) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      callback();
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: Custom hook with dynamic deps
  }, deps);
};

export const isSSR = () => typeof window === "undefined";

// Additional SSR-safe hooks for demo component
export const useIntersectionObserver = (_callback?: Function) => {
  return [{ isIntersecting: false }];
};
export const useMediaQuery = (_query: string) => false;
export const useNetworkStatus = () => ({
  online: true,
  effectiveType: "4g",
  downlink: 10,
  rtt: 50,
  saveData: false,
});
export const useOnlineStatus = () => true;
export const usePageVisibility = () => "visible";
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
