import { useEffect, useLayoutEffect } from "react";

const _useSSRSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const _useSSRSafe = (callback: () => void, deps: Array<unknown>) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      callback();
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: Custom hook with dynamic deps
  }, deps);
};

const _isSSR = () => typeof window === "undefined";

// Additional SSR-safe hooks for demo component
const _useIntersectionObserver = (_callback?: Function) => {
  return [{ isIntersecting: false }];
};
const _useMediaQuery = (_query: string) => false;
const _useNetworkStatus = () => ({
  online: true,
  effectiveType: "4g",
  downlink: 10,
  rtt: 50,
  saveData: false,
});
const _useOnlineStatus = () => true;
const _usePageVisibility = () => "visible";
const _usePerformanceMetrics = () => ({
  loadTime: 0,
  renderTime: 0,
  domContentLoaded: 0,
  firstPaint: 0,
  firstContentfulPaint: 0,
});
const _useWindowSize = () => ({
  width: 1024,
  height: 768,
  isReady: true,
});
