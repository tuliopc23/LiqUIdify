import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "react";

const _useSSRSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const _useSSRSafe = (callback: () => void, deps: Array<unknown>) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      callback();
    }
  }, deps);
};

const _isSSR = () => typeof window === "undefined";

// Additional SSR-safe hooks for demo component
const _useIntersectionObserver = <T extends HTMLElement>(
  callback?: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {},
): [React.RefObject<T>, IntersectionObserverEntry | null] => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    try {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create new observer
      observerRef.current = new IntersectionObserver((entries) => {
        try {
          const [firstEntry] = entries;
          if (firstEntry) {
            setEntry(firstEntry);
            if (callback) {
              callback(firstEntry);
            }
          }
        } catch (error) {
          console.warn("Error in intersection observer callback:", error);
        }
      }, options);

      // Observe element if it exists
      const element = elementRef.current;
      if (element) {
        observerRef.current.observe(element);
      }

      // Cleanup on unmount
      return () => {
        try {
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        } catch (error) {
          console.warn("Error disconnecting intersection observer:", error);
        }
      };
    } catch (error) {
      console.warn("Error in useIntersectionObserver:", error);
      return;
    }
  }, [callback, options.root, options.rootMargin, options.threshold]);

  return [elementRef, entry];
};

const _useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Return false during SSR
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    try {
      const mediaQuery = window.matchMedia(query);

      // Set initial value
      setMatches(mediaQuery.matches);

      // Create event handler
      const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
        try {
          setMatches(event.matches);
        } catch (error) {
          // Handle errors in event handling gracefully
          console.warn("Error in media query change handler:", error);
        }
      };

      // Add event listener (try modern method first, fallback to legacy)
      try {
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener("change", handleChange);
        } else if (mediaQuery.addListener) {
          // Legacy method for older browsers
          mediaQuery.addListener(handleChange);
        }
      } catch (error) {
        console.warn("Error adding media query listener:", error);
      }

      // Cleanup
      return () => {
        try {
          if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener("change", handleChange);
          } else if (mediaQuery.removeListener) {
            // Legacy method for older browsers
            mediaQuery.removeListener(handleChange);
          }
        } catch (error) {
          console.warn("Error removing media query listener:", error);
        }
      };
    } catch (error) {
      console.warn("Error in useMediaQuery:", error);
      return;
    }
  }, [query]);

  return matches;
};

const _useNetworkStatus = () => {
  const [status, setStatus] = useState({
    online: true,
    effectiveType: "4g" as "slow-2g" | "2g" | "3g" | "4g",
    downlink: 10,
    rtt: 50,
    saveData: false,
  });

  useEffect(() => {
    // Return default during SSR
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    try {
      // Update online status
      const updateOnlineStatus = () => {
        try {
          setStatus((prev) => ({ ...prev, online: navigator.onLine ?? true }));
        } catch (error) {
          console.warn("Error updating online status:", error);
        }
      };

      // Set initial online status
      updateOnlineStatus();

      // Add event listeners for online/offline
      try {
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);
      } catch (error) {
        console.warn("Error adding network event listeners:", error);
      }

      // Check for Network Information API
      let connection;
      try {
        connection =
          (navigator as any).connection ||
          (navigator as any).mozConnection ||
          (navigator as any).webkitConnection;
      } catch (error) {
        console.warn("Error accessing network connection API:", error);
        connection = null;
      }

      if (connection) {
        const updateConnectionStatus = () => {
          try {
            setStatus((prev) => ({
              ...prev,
              effectiveType: connection.effectiveType || "4g",
              downlink: connection.downlink || 10,
              rtt: connection.rtt || 50,
              saveData: connection.saveData || false,
            }));
          } catch (error) {
            console.warn("Error updating connection status:", error);
          }
        };

        // Set initial connection status
        updateConnectionStatus();

        // Add event listener for connection changes
        try {
          if (connection.addEventListener) {
            connection.addEventListener("change", updateConnectionStatus);
          }
        } catch (error) {
          console.warn("Error adding connection change listener:", error);
        }

        // Cleanup
        return () => {
          try {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
            if (connection.removeEventListener) {
              connection.removeEventListener("change", updateConnectionStatus);
            }
          } catch (error) {
            console.warn("Error removing network event listeners:", error);
          }
        };
      }

      // Cleanup for basic online/offline only
      return () => {
        try {
          window.removeEventListener("online", updateOnlineStatus);
          window.removeEventListener("offline", updateOnlineStatus);
        } catch (error) {
          console.warn("Error removing basic network event listeners:", error);
        }
      };
    } catch (error) {
      console.warn("Error in useNetworkStatus:", error);
      return;
    }
  }, []);

  return status;
};

const _useOnlineStatus = () => true;
const _usePageVisibility = () => "visible";
const _usePerformanceMetrics = () => ({
  loadTime: 0,
  renderTime: 0,
  domContentLoaded: 0,
  firstPaint: 0,
  firstContentfulPaint: 0,
});

const _useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isReady: false,
  });

  useEffect(() => {
    // Return defaults during SSR
    if (typeof window === "undefined") {
      return;
    }

    try {
      // Handler to update window size
      const handleResize = () => {
        try {
          setWindowSize({
            width: window.innerWidth || 0,
            height: window.innerHeight || 0,
            isReady: true,
          });
        } catch (error) {
          console.warn("Error updating window size:", error);
        }
      };

      // Set initial size
      handleResize();

      // Add event listener
      try {
        window.addEventListener("resize", handleResize);
      } catch (error) {
        console.warn("Error adding resize event listener:", error);
      }

      // Cleanup
      return () => {
        try {
          window.removeEventListener("resize", handleResize);
        } catch (error) {
          console.warn("Error removing resize event listener:", error);
        }
      };
    } catch (error) {
      console.warn("Error in useWindowSize:", error);
      return;
    }
  }, []);

  return windowSize;
};

// Export all hooks for testing
export {
  _useSSRSafe,
  _isSSR,
  _useIntersectionObserver,
  _useMediaQuery,
  _useNetworkStatus,
  _useWindowSize,
};
