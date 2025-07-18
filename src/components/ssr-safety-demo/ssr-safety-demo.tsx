/**
 * SSR Safety Demo Component
 * Demonstrates all SSR safety and hydration features
 */

import { 
  HydrationDetector, 
  HydrationBoundary, 
  HydrationSafe,
  HydrationMetrics 
} from '../hydration-detector';
import { 
  useWindowSize, 
  useMediaQuery, 
  useOnlineStatus, 
  useIntersectionObserver,
  useNetworkStatus,
  usePageVisibility,
  usePerformanceMetrics
} from '../../hooks/use-ssr-safe-hooks';
import { EnhancedSSRProvider } from '../../providers/enhanced-ssr-provider';
import { useProgressiveEnhancement } from '../../utils/hydration-utils';

interface SSRSafetyDemoProps {
  debug?: boolean;
}

/**
 * Demo component showcasing SSR safety features
 */
export function SSRSafetyDemo({ debug = false }: SSRSafetyDemoProps) {
  return (
    <EnhancedSSRProvider>
      <HydrationDetector debug={debug}>
        <div className="ssr-safety-demo">
          <h1>SSR Safety & Hydration Demo</h1>
          
          <HydrationBoundary>
            <WindowSizeDemo />
            <MediaQueryDemo />
            <OnlineStatusDemo />
            <IntersectionObserverDemo />
            <NetworkStatusDemo />
            <PageVisibilityDemo />
            <PerformanceMetricsDemo />
            <ProgressiveEnhancementDemo />
          </HydrationBoundary>

          {debug && <HydrationMetrics debug={true} />}
        </div>
      </HydrationDetector>
    </EnhancedSSRProvider>
  );
}

/**
 * Window size demo
 */
function WindowSizeDemo() {
  const { width, height, isReady } = useWindowSize();

  return (
    <HydrationSafe componentName="WindowSizeDemo">
      <div className="demo-section">
        <h3>Window Size</h3>
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
        <p>Ready: {isReady ? 'Yes' : 'No'}</p>
      </div>
    </HydrationSafe>
  );
}

/**
 * Media query demo
 */
function MediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <HydrationSafe componentName="MediaQueryDemo">
      <div className="demo-section">
        <h3>Media Queries</h3>
        <p>Mobile: {isMobile ? 'Yes' : 'No'}</p>
        <p>Tablet: {isTablet ? 'Yes' : 'No'}</p>
        <p>Desktop: {isDesktop ? 'Yes' : 'No'}</p>
      </div>
    </HydrationSafe>
  );
}

/**
 * Online status demo
 */
function OnlineStatusDemo() {
  const isOnline = useOnlineStatus();

  return (
    <HydrationSafe componentName="OnlineStatusDemo">
      <div className="demo-section">
        <h3>Online Status</h3>
        <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
      </div>
    </HydrationSafe>
  );
}

/**
 * Intersection observer demo
 */
function IntersectionObserverDemo() {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <HydrationSafe componentName="IntersectionObserverDemo">
      <div className="demo-section">
        <h3>Intersection Observer</h3>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            height: '100px',
            background: isIntersecting ? 'green' : 'red',
            transition: 'background 0.3s ease'
          }}
        >
          <p>Scroll to see this change color</p>
          <p>Visible: {isIntersecting ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </HydrationSafe>
  );
}

/**
 * Network status demo
 */
function NetworkStatusDemo() {
  const connection = useNetworkStatus();

  return (
    <HydrationSafe componentName="NetworkStatusDemo">
      <div className="demo-section">
        <h3>Network Status</h3>
        {connection ? (
          <>
            <p>Type: {connection.effectiveType}</p>
            <p>Downlink: {connection.downlink} Mbps</p>
            <p>RTT: {connection.rtt}ms</p>
            <p>Save Data: {connection.saveData ? 'Yes' : 'No'}</p>
          </>
        ) : (
          <p>Network information not available</p>
        )}
      </div>
    </HydrationSafe>
  );
}

/**
 * Page visibility demo
 */
function PageVisibilityDemo() {
  const isVisible = usePageVisibility();

  return (
    <HydrationSafe componentName="PageVisibilityDemo">
      <div className="demo-section">
        <h3>Page Visibility</h3>
        <p>Visible: {isVisible ? 'Yes' : 'No'}</p>
      </div>
    </HydrationSafe>
  );
}

/**
 * Performance metrics demo
 */
function PerformanceMetricsDemo() {
  const metrics = usePerformanceMetrics();

  return (
    <HydrationSafe componentName="PerformanceMetricsDemo">
      <div className="demo-section">
        <h3>Performance Metrics</h3>
        <p>Load Time: {metrics.loadTime.toFixed(2)}ms</p>
        <p>DOM Content Loaded: {metrics.domContentLoaded.toFixed(2)}ms</p>
        <p>First Paint: {metrics.firstPaint.toFixed(2)}ms</p>
        <p>First Contentful Paint: {metrics.firstContentfulPaint.toFixed(2)}ms</p>
      </div>
    </HydrationSafe>
  );
}

/**
 * Progressive enhancement demo
 */
function ProgressiveEnhancementDemo() {
  const enhancements = useProgressiveEnhancement();

  return (
    <HydrationSafe componentName="ProgressiveEnhancementDemo">
      <div className="demo-section">
        <h3>Progressive Enhancement</h3>
        <p>JavaScript: {enhancements.javascript ? 'Enabled' : 'Disabled'}</p>
        <p>Animations: {enhancements.animations ? 'Supported' : 'Not Supported'}</p>
        <p>WebGL: {enhancements.webgl ? 'Supported' : 'Not Supported'}</p>
        <p>Intersection Observer: {enhancements.intersectionObserver ? 'Supported' : 'Not Supported'}</p>
        <p>Resize Observer: {enhancements.resizeObserver ? 'Supported' : 'Not Supported'}</p>
      </div>
    </HydrationSafe>
  );
}

// Export for stories
export default SSRSafetyDemo;