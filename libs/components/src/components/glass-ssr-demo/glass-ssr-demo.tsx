import React, { useState, useEffect } from "react";
import {
  _useIntersectionObserver,
  _useMediaQuery,
  _useNetworkStatus,
  _useWindowSize,
  _isSSR,
  _useSSRSafe,
} from "../../hooks/use-ssr-safe-hooks";
import { Box } from "../../core/Box";

interface SSRDemoProps {
  title?: string;
  showDebugInfo?: boolean;
}

/**
 * Demonstration component showing SSR-safe hooks in action
 * This component safely renders in both server and client environments
 */
export const GlassSSRDemo: React.FC<SSRDemoProps> = ({
  title = "SSR-Safe Hooks Demo",
  showDebugInfo = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  // Test all SSR-safe hooks
  const isSSR = _isSSR();
  const [observerRef, intersectionEntry] =
    _useIntersectionObserver<HTMLDivElement>();
  const isMobile = _useMediaQuery("(max-width: 768px)");
  const isTablet = _useMediaQuery("(max-width: 1024px)");
  const isDesktop = _useMediaQuery("(min-width: 1025px)");
  const networkStatus = _useNetworkStatus();
  const windowSize = _useWindowSize();

  // Test _useSSRSafe
  const [clientOnlyData, setClientOnlyData] = useState<string>("Loading...");
  _useSSRSafe(() => {
    setClientOnlyData("Client-side data loaded!");
    setMounted(true);
  }, []);

  // Run tests on mount
  useEffect(() => {
    const results: string[] = [];

    // Test 1: SSR detection
    results.push(`✅ SSR Detection: ${isSSR ? "Server" : "Client"}`);

    // Test 2: Window size
    if (windowSize.isReady) {
      results.push(`✅ Window Size: ${windowSize.width}x${windowSize.height}`);
    } else {
      results.push("⏳ Window Size: Not ready (expected during SSR)");
    }

    // Test 3: Media queries
    results.push(
      `✅ Media Queries: Mobile=${isMobile}, Tablet=${isTablet}, Desktop=${isDesktop}`,
    );

    // Test 4: Network status
    results.push(
      `✅ Network: ${networkStatus.online ? "Online" : "Offline"} (${networkStatus.effectiveType})`,
    );

    // Test 5: Intersection observer
    if (intersectionEntry) {
      results.push(
        `✅ Intersection: ${intersectionEntry.isIntersecting ? "In view" : "Out of view"}`,
      );
    } else {
      results.push("⏳ Intersection: No entry yet");
    }

    // Test 6: Client-only execution
    results.push(`✅ Client-only code: ${mounted ? "Executed" : "Pending"}`);

    setTestResults(results);
  }, [
    isSSR,
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    networkStatus,
    intersectionEntry,
    mounted,
  ]);

  return (
    <Box className="glass-ssr-demo p-6 space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>

      {/* Intersection observer target */}
      <div
        ref={observerRef}
        className="p-4 bg-blue-100 rounded-lg"
        style={{ minHeight: "100px" }}
      >
        <p>Intersection Observer Target</p>
        <p className="text-sm text-gray-600">
          {intersectionEntry?.isIntersecting
            ? "👁️ Element is visible"
            : "🙈 Element is not visible"}
        </p>
      </div>

      {/* Responsive content */}
      <div className="p-4 bg-green-100 rounded-lg">
        <h3 className="font-semibold mb-2">Responsive Layout</h3>
        <p>
          {!windowSize.isReady
            ? "📱 Detecting screen size..."
            : isMobile
              ? "📱 Mobile Layout"
              : isTablet
                ? "📱 Tablet Layout"
                : "🖥️ Desktop Layout"}
        </p>
        {windowSize.isReady && (
          <p className="text-sm text-gray-600">
            Window: {windowSize.width}x{windowSize.height}
          </p>
        )}
      </div>

      {/* Network status */}
      <div className="p-4 bg-yellow-100 rounded-lg">
        <h3 className="font-semibold mb-2">Network Status</h3>
        <p>
          {networkStatus.online ? "🟢 Online" : "🔴 Offline"} -{" "}
          {networkStatus.effectiveType} connection
        </p>
        <p className="text-sm text-gray-600">
          Downlink: {networkStatus.downlink}Mbps | RTT: {networkStatus.rtt}ms
          {networkStatus.saveData && " | 📱 Data Saver ON"}
        </p>
      </div>

      {/* Client-only content */}
      <div className="p-4 bg-purple-100 rounded-lg">
        <h3 className="font-semibold mb-2">Client-Only Content</h3>
        <p>{clientOnlyData}</p>
      </div>

      {/* Debug info */}
      {showDebugInfo && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Debug Info</h3>
          <ul className="space-y-1 font-mono text-sm">
            {testResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
};

// Example usage in Next.js or other SSR frameworks
export const SSRSafeExample: React.FC = () => {
  // This pattern ensures hydration works correctly
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <h1>SSR-Safe Component Example</h1>

      {/* Always rendered content */}
      <p>This content renders on both server and client.</p>

      {/* Client-only content with loading state */}
      {!isClient ? (
        <div>Loading interactive features...</div>
      ) : (
        <GlassSSRDemo />
      )}
    </div>
  );
};

export default GlassSSRDemo;
