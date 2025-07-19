/**
 * LiqUIdify Interactive Component Playground
 *
 * S-Tier Interactive Documentation System
 * - Live component preview with real-time editing
 * - Props manipulation with visual controls
 * - Code generation and export
 * - Accessibility testing integration
 * - Performance monitoring
 * - Theme switching and customization
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Accessibility,
  Code,
  Copy,
  Download,
  Monitor,
  Palette,
  RefreshCw,
  Settings,
  Smartphone,
  Tablet,
  Zap,
} from 'lucide-react';

// Types for playground configuration
interface PlaygroundConfig {
  componentName: string;
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  propControls: PropControl[];
  codeTemplate: string;
  examples: PlaygroundExample[];
  accessibilityTests?: AccessibilityTest[];
}

interface PropControl {
  name: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'select'
    | 'color'
    | 'range'
    | 'textarea';
  defaultValue: any;
  options?: string[] | number[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  category?: string;
}

interface PlaygroundExample {
  name: string;
  description: string;
  props: Record<string, any>;
  code: string;
}

interface AccessibilityTest {
  name: string;
  test: (element: HTMLElement) => Promise<{ passed: boolean; message: string }>;
}

interface ViewportSize {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const VIEWPORT_SIZES: ViewportSize[] = [
  {
    name: 'Mobile',
    width: 375,
    height: 667,
    icon: <Smartphone className="w-4 h-4" />,
  },
  {
    name: 'Tablet',
    width: 768,
    height: 1024,
    icon: <Tablet className="w-4 h-4" />,
  },
  {
    name: 'Desktop',
    width: 1200,
    height: 800,
    icon: <Monitor className="w-4 h-4" />,
  },
];

const THEMES = [
  { name: 'Light', value: 'light', bg: 'bg-white', text: 'text-gray-900' },
  { name: 'Dark', value: 'dark', bg: 'bg-gray-900', text: 'text-white' },
  { name: 'System', value: 'system', bg: 'bg-gray-100', text: 'text-gray-800' },
];

export interface InteractivePlaygroundProps {
  /** Configuration for the playground */
  config: PlaygroundConfig;
  /** Custom CSS class for styling */
  className?: string;
  /** Enable code export functionality */
  enableCodeExport?: boolean;
  /** Enable accessibility testing */
  enableA11yTesting?: boolean;
  /** Enable performance monitoring */
  enablePerformanceMonitoring?: boolean;
  /** Show viewport controls */
  showViewportControls?: boolean;
  /** Show theme controls */
  showThemeControls?: boolean;
  /** Default layout orientation */
  defaultLayout?: 'horizontal' | 'vertical';
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  config,
  className = '',
  enableCodeExport = true,
  enableA11yTesting = true,
  enablePerformanceMonitoring = true,
  showViewportControls = true,
  showThemeControls = true,
  defaultLayout = 'horizontal',
}) => {
  const [currentProps, setCurrentProps] = useState(config.defaultProps);
  const [selectedExample, setSelectedExample] = useState<number | null>(undefined);
  const [viewport, setViewport] = useState(VIEWPORT_SIZES[2]); // Desktop by default
  const [theme, setTheme] = useState(THEMES[0]);
  const [layout, setLayout] = useState(defaultLayout);
  const [showCode, setShowCode] = useState(false);
  const [showProps, setShowProps] = useState(true);
  const [a11yResults, setA11yResults] = useState<
    Record<string, { passed: boolean; message: string }>
  >({});
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    renderTime: number;
    reRenders: number;
  }>({ renderTime: 0, reRenders: 0 });
  const [customCode, setCustomCode] = useState('');

  const previewRef = useRef<HTMLDivElement>(null);
  const renderStartTime = useRef<number>(0);
  const reRenderCount = useRef<number>(0);

  // Generate current component code
  const generatedCode = useMemo(() => {
    if (customCode.trim()) {
      return customCode;
    }

    const propsString = Object.entries(currentProps)
      .filter(([_, value]) => value !== undefined && '' !== value)
      .map(([key, value]) => {
        if ('string' === typeof value) {
          return `${key}="${value}"`;
        } else if ('boolean' === typeof value) {
          return value ? key : '';
        } else {
          return `${key}={${JSON.stringify(value)}}`;
        }
      })
      .filter(Boolean)
      .join('\n    ');

    return config.codeTemplate
      .replace('{{componentName}}', config.componentName)
      .replace('{{props}}', propsString);
  }, [currentProps, customCode, config.componentName, config.codeTemplate]);

  // Handle prop changes
  const handlePropChange = useCallback((propName: string, value: any) => {
    setCurrentProps(prev => ({
      ...prev,
      [propName]: value,
    }));
    setSelectedExample(undefined);
  }, []);

  // Handle example selection
  const handleExampleSelect = useCallback(
    (exampleIndex: number) => {
      const example = config.examples[exampleIndex];
      if (example) {
        setCurrentProps({ ...config.defaultProps, ...example.props });
        setSelectedExample(exampleIndex);
        setCustomCode(example.code || '');
      }
    },
    [config.defaultProps, config.examples]
  );

  // Run accessibility tests
  const runA11yTests = useCallback(async () => {
    if (
      !enableA11yTesting ||
      !config.accessibilityTests ||
      !previewRef.current
    ) {
      return;
    }

    const results: Record<string, { passed: boolean; message: string }> = {};

    for (const test of config.accessibilityTests) {
      try {
        const result = await test.test(previewRef.current);
        results[test.name] = result;
      } catch (error) {
        results[test.name] = {
          passed: false,
          message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
      }
    }

    setA11yResults(results);
  }, [enableA11yTesting, config.accessibilityTests]);

  // Performance monitoring
  useEffect(() => {
    if (!enablePerformanceMonitoring) {return;}

    renderStartTime.current = performance.now();
    reRenderCount.current += 1;

    const measureRender = () => {
      const renderTime = performance.now() - renderStartTime.current;
      setPerformanceMetrics({
        renderTime: Math.round(renderTime * 100) / 100,
        reRenders: reRenderCount.current,
      });
    };

    const timer = setTimeout(measureRender, 0);
    return () => clearTimeout(timer);
  }, [currentProps, enablePerformanceMonitoring]);

  // Run accessibility tests when props change
  useEffect(() => {
    if (enableA11yTesting) {
      const timer = setTimeout(runA11yTests, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentProps, runA11yTests, enableA11yTesting]);

  // Copy code to clipboard
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }, [generatedCode]);

  // Export playground configuration
  const exportConfig = useCallback(() => {
    const exportData = {
      component: config.componentName,
      props: currentProps,
      code: generatedCode,
      viewport: viewport?.name || 'Desktop',
      theme: theme?.name || 'Light',
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, undefined, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.componentName}-playground-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [
    config.componentName,
    currentProps,
    generatedCode,
    viewport?.name,
    theme?.name,
  ]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setCurrentProps(config.defaultProps);
    setSelectedExample(undefined);
    setCustomCode('');
    reRenderCount.current = 0;
  }, [config.defaultProps]);

  // Group prop controls by category
  const propControlsByCategory = useMemo(() => {
    const grouped: Record<string, PropControl[]> = {};

    config.propControls.forEach(control => {
      const category = control.category || 'General';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(control);
    });

    return grouped;
  }, [config.propControls]);

  // Render prop control
  const renderPropControl = (control: PropControl) => {
    const value = currentProps[control.name] ?? control.defaultValue;

    const baseInputClasses =
      'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

    switch (control.type) {
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={e => handlePropChange(control.name, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">{control.name}</span>
          </label>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={e => handlePropChange(control.name, e.target.value)}
            className={baseInputClasses}
          >
            {control.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={control.min || 0}
              max={control.max || 100}
              step={control.step || 1}
              value={value}
              onChange={e =>
                handlePropChange(control.name, Number(e.target.value))
              }
              className="w-full"
            />
            <div className="text-sm text-gray-600 text-center">{value}</div>
          </div>
        );

      case 'color':
        return (
          <div className="flex space-x-2">
            <input
              type="color"
              value={value}
              onChange={e => handlePropChange(control.name, e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={e => handlePropChange(control.name, e.target.value)}
              className={`${baseInputClasses} flex-1`}
              placeholder="#000000"
            />
          </div>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={e => handlePropChange(control.name, e.target.value)}
            className={`${baseInputClasses} min-h-[100px]`}
            rows={4}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={e =>
              handlePropChange(control.name, Number(e.target.value))
            }
            min={control.min}
            max={control.max}
            step={control.step}
            className={baseInputClasses}
          />
        );

      default: // string
        return (
          <input
            type="text"
            value={value}
            onChange={e => handlePropChange(control.name, e.target.value)}
            className={baseInputClasses}
          />
        );
    }
  };

  const ComponentToRender = config.component;

  return (
    <div
      className={`liquidify-playground ${className} bg-gray-50 min-h-screen`}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {config.componentName} Playground
            </h1>
            <p className="text-gray-600 mt-1">
              Interactive component documentation and testing
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Layout Toggle */}
            <button
              onClick={() =>
                setLayout('horizontal' === layout ? 'vertical' : 'horizontal')
              }
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              title="Toggle layout"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Performance Metrics */}
            {enablePerformanceMonitoring && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Zap className="w-4 h-4" />
                <span>{performanceMetrics.renderTime}ms</span>
                <span>({performanceMetrics.reRenders} renders)</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={copyCode}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </button>

              {enableCodeExport && (
                <button
                  onClick={exportConfig}
                  className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
              )}

              <button
                onClick={resetToDefaults}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Viewport Controls */}
            {showViewportControls && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Viewport:</span>
                {VIEWPORT_SIZES.map(viewportSize => (
                  <button
                    key={viewportSize.name}
                    onClick={() => setViewport(viewportSize)}
                    className={`flex items-center px-3 py-1 rounded-md text-sm ${
                      viewport?.name === viewportSize.name
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {viewportSize.icon}
                    <span className="ml-1">{viewportSize.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Theme Controls */}
            {showThemeControls && (
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-gray-600" />
                <select
                  value={theme?.value || 'light'}
                  onChange={e =>
                    setTheme(
                      THEMES.find(t => t.value === e.target.value) || THEMES[0]
                    )
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  {THEMES.map(themeOption => (
                    <option key={themeOption.value} value={themeOption.value}>
                      {themeOption.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowProps(!showProps)}
              className={`flex items-center px-3 py-1 rounded-md text-sm ${
                showProps
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4 mr-1" />
              Props
            </button>

            <button
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center px-3 py-1 rounded-md text-sm ${
                showCode
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Code className="w-4 h-4 mr-1" />
              Code
            </button>

            {enableA11yTesting && (
              <button
                onClick={runA11yTests}
                className="flex items-center px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100"
              >
                <Accessibility className="w-4 h-4 mr-1" />
                A11y Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex ${ 'horizontal' === layout ? 'flex-row' : 'flex-col'} h-[calc(100vh-200px)]`}
      >
        {/* Preview Panel */}
        <div
          className={`${ 'horizontal' === layout ? 'flex-1' : 'h-1/2'} bg-white`}
        >
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Preview</h3>
                <div className="text-sm text-gray-600">
                  {viewport?.width} × {viewport?.height}
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 p-6 overflow-auto">
              <div
                ref={previewRef}
                className={`mx-auto transition-all duration-300 ${theme?.bg} ${theme?.text}`}
                style={{
                  width: viewport?.width,
                  minHeight: viewport?.height,
                  maxWidth: '100%',
                }}
              >
                <div className="p-8 flex items-center justify-center min-h-full">
                  <ComponentToRender {...currentProps} />
                </div>
              </div>
            </div>

            {/* Accessibility Results */}
            {enableA11yTesting && 0 < Object.keys(a11yResults).length && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-2">
                  Accessibility Tests
                </h4>
                <div className="space-y-1">
                  {Object.entries(a11yResults).map(([testName, result]) => (
                    <div
                      key={testName}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}
                       />
                      <span className="font-medium">{testName}:</span>
                      <span
                        className={
                          result.passed ? 'text-green-700' : 'text-red-700'
                        }
                      >
                        {result.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div
          className={`${ 'horizontal' === layout ? 'w-80 border-l' : 'h-1/2 border-t'} border-gray-200 bg-white overflow-auto`}
        >
          {/* Examples */}
          { 0 < config.examples.length && (
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Examples</h3>
              <div className="space-y-2">
                {config.examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleSelect(index)}
                    className={`w-full text-left p-3 rounded-md border ${
                      selectedExample === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{example.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {example.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Props Controls */}
          {showProps && (
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Props</h3>
              <div className="space-y-6">
                {Object.entries(propControlsByCategory).map(
                  ([category, controls]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm text-gray-700 mb-3">
                        {category}
                      </h4>
                      <div className="space-y-4">
                        {controls.map(control => (
                          <div key={control.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {control.name}
                            </label>
                            {renderPropControl(control)}
                            {control.description && (
                              <p className="text-xs text-gray-500 mt-1">
                                {control.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Code Panel */}
          {showCode && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Generated Code</h3>
                <button
                  onClick={copyCode}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Copy
                </button>
              </div>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractivePlayground;
