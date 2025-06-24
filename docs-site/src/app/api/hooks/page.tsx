import Link from "next/link";

const hooks = [
  {
    name: "useTheme",
    description: "Manage theme state, toggle between light/dark modes, and access theme variables",
    category: "Theme",
    parameters: [],
    returns: ["theme", "setTheme", "toggleTheme", "systemTheme"],
    features: ["System preference detection", "Theme persistence", "CSS custom properties", "Animation support"]
  },
  {
    name: "useToast",
    description: "Display toast notifications with glass effects and customizable positioning",
    category: "Feedback",
    parameters: [],
    returns: ["toast", "dismiss", "dismissAll"],
    features: ["Queue management", "Auto-dismiss", "Custom positioning", "Animation controls"]
  },
  {
    name: "useMobile",
    description: "Detect mobile devices and screen size changes for responsive behavior",
    category: "Responsive",
    parameters: ["breakpoint?"],
    returns: ["isMobile", "isTablet", "isDesktop", "orientation"],
    features: ["Breakpoint detection", "Orientation tracking", "Device type detection", "SSR safe"]
  },
  {
    name: "useHapticFeedback",
    description: "Trigger haptic feedback patterns with intensity and duration controls",
    category: "Interaction",
    parameters: ["options?"],
    returns: ["trigger", "isSupported", "patterns"],
    features: ["Pattern library", "Intensity control", "Duration timing", "Device support detection"]
  },
  {
    name: "useLiquidGlass",
    description: "Apply liquid glass effects with WebGL shaders and physics simulation",
    category: "Effects",
    parameters: ["config?"],
    returns: ["glassRef", "animation", "updateConfig"],
    features: ["WebGL shaders", "Physics simulation", "Performance optimization", "Custom effects"]
  },
  {
    name: "usePerformanceMonitor",
    description: "Monitor component performance, FPS, and memory usage for optimization",
    category: "Performance",
    parameters: ["options?"],
    returns: ["metrics", "startMonitoring", "stopMonitoring"],
    features: ["FPS tracking", "Memory monitoring", "Render metrics", "Performance alerts"]
  }
];

const categories = ["Theme", "Feedback", "Responsive", "Interaction", "Effects", "Performance"];

export default function HooksAPIPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Hooks API Reference</h1>
        <p className="text-xl text-gray-300 max-w-3xl">
          React hooks for managing theme state, effects, performance, and interactions
          in Glass UI components with TypeScript support.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Hook Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-sm text-blue-300"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* Hooks Documentation */}
      <div className="space-y-8">
        {hooks.map((hook, index) => (
          <div
            key={hook.name}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            <div className="space-y-6">
              {/* Hook Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold font-mono">{hook.name}</h3>
                    <span className="px-2 py-1 bg-gray-800/50 border border-gray-600/30 rounded text-xs text-gray-300">
                      {hook.category}
                    </span>
                  </div>
                  <p className="text-gray-300">{hook.description}</p>
                </div>
              </div>

              {/* API Signature */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Usage
                  </h4>
                  <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>{getHookUsage(hook.name)}</code>
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    TypeScript
                  </h4>
                  <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>{getHookTypeScript(hook.name)}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Parameters */}
              {hook.parameters.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                    Parameters
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hook.parameters.map((param) => (
                      <span
                        key={param}
                        className="px-3 py-1 bg-orange-500/20 border border-orange-400/30 rounded-lg text-sm font-mono text-orange-300"
                      >
                        {param}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Returns */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                  Returns
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hook.returns.map((returnVal) => (
                    <span
                      key={returnVal}
                      className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-lg text-sm font-mono text-green-300"
                    >
                      {returnVal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                  Features
                </h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  {hook.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                  Complete Example
                </h4>
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300">
                    <code>{getHookExample(hook.name)}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Best Practices */}
      <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-yellow-300">💡 Hook Best Practices</h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Always destructure hook returns for better readability and tree-shaking</li>
          <li>• Use TypeScript for better development experience and type safety</li>
          <li>• Memoize hook options objects to prevent unnecessary re-renders</li>
          <li>• Handle loading and error states appropriately in async hooks</li>
          <li>• Use cleanup functions for subscriptions and event listeners</li>
          <li>• Consider performance implications when using hooks in render loops</li>
        </ul>
      </div>
    </div>
  );
}

function getHookUsage(hookName: string): string {
  const usages: Record<string, string> = {
    "useTheme": `import { useTheme } from 'glass-ui';

const { theme, setTheme, toggleTheme } = useTheme();`,
    "useToast": `import { useToast } from 'glass-ui';

const { toast } = useToast();`,
    "useMobile": `import { useMobile } from 'glass-ui';

const { isMobile, isTablet } = useMobile();`,
    "useHapticFeedback": `import { useHapticFeedback } from 'glass-ui';

const { trigger } = useHapticFeedback();`,
    "useLiquidGlass": `import { useLiquidGlass } from 'glass-ui';

const { glassRef } = useLiquidGlass();`,
    "usePerformanceMonitor": `import { usePerformanceMonitor } from 'glass-ui';

const { metrics } = usePerformanceMonitor();`
  };

  return usages[hookName] || `import { ${hookName} } from 'glass-ui';`;
}

function getHookTypeScript(hookName: string): string {
  const types: Record<string, string> = {
    "useTheme": `interface ThemeHook {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
}`,
    "useToast": `interface ToastHook {
  toast: (message: string, options?: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}`,
    "useMobile": `interface MobileHook {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
}`,
    "useHapticFeedback": `interface HapticHook {
  trigger: (pattern?: HapticPattern) => void;
  isSupported: boolean;
  patterns: HapticPattern[];
}`,
    "useLiquidGlass": `interface LiquidGlassHook {
  glassRef: RefObject<HTMLElement>;
  animation: AnimationControls;
  updateConfig: (config: GlassConfig) => void;
}`,
    "usePerformanceMonitor": `interface PerformanceHook {
  metrics: PerformanceMetrics;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}`
  };

  return types[hookName] || `// TypeScript definitions for ${hookName}`;
}

function getHookExample(hookName: string): string {
  const examples: Record<string, string> = {
    "useTheme": `function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <GlassButton 
      onClick={toggleTheme}
      leftIcon={theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    >
      Toggle Theme
    </GlassButton>
  );
}`,
    "useToast": `function NotificationDemo() {
  const { toast } = useToast();
  
  const showSuccess = () => {
    toast('Operation completed successfully!', {
      variant: 'success',
      duration: 3000
    });
  };
  
  return <GlassButton onClick={showSuccess}>Show Toast</GlassButton>;
}`,
    "useMobile": `function ResponsiveLayout() {
  const { isMobile, isTablet } = useMobile();
  
  return (
    <div className={clsx(
      'grid gap-4',
      isMobile ? 'grid-cols-1' : 'grid-cols-2',
      isTablet && 'px-4'
    )}>
      {/* Responsive content */}
    </div>
  );
}`,
    "useHapticFeedback": `function InteractiveButton() {
  const { trigger, isSupported } = useHapticFeedback();
  
  const handleClick = () => {
    if (isSupported) {
      trigger('impact-medium');
    }
    // Handle click action
  };
  
  return <GlassButton onClick={handleClick}>Feel the Click</GlassButton>;
}`,
    "useLiquidGlass": `function LiquidGlassCard() {
  const { glassRef } = useLiquidGlass({
    intensity: 0.8,
    flowSpeed: 2,
    waveAmplitude: 0.1
  });
  
  return (
    <div ref={glassRef} className="liquid-glass p-6 rounded-xl">
      <h3>Liquid Glass Effect</h3>
      <p>This card has dynamic liquid glass animations</p>
    </div>
  );
}`,
    "usePerformanceMonitor": `function PerformanceWidget() {
  const { metrics, startMonitoring } = usePerformanceMonitor({
    trackFPS: true,
    trackMemory: true
  });
  
  useEffect(() => {
    startMonitoring();
  }, []);
  
  return (
    <div className="performance-stats">
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {metrics.memory}MB</div>
    </div>
  );
}`
  };

  return examples[hookName] || `// Example usage for ${hookName}`;
} 