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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';


// Types for playground configuration
interface PlaygroundConfig {
  componentName: string;
  component: React.ComponentType<any>;
  defaultProps: Record<string, unknown>;
  propControls: Array<PropertyControl>;
  codeTemplate: string;
  examples: Array<PlaygroundExample>;
  accessibilityTests?: Array<AccessibilityTest>;
}

interface PropertyControl {
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
  options?: Array<string> | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  category?: string;
}

interface PlaygroundExample {
  name: string;
  description: string;
  props: Record<string, unknown>;
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

const VIEWPORT_SIZES: Array<ViewportSize> = [
  {
    name: 'Mobile',
    width: 375,
    height: 667,

    icon: <Smartphone className="h-4 w-4" />,
  },
  {
    name: 'Tablet',
    width: 768,
    height: 1024,

    icon: <Tablet className="h-4 w-4" />,
  },
  {
    name: 'Desktop',
    width: 1200,
    height: 800,

    icon: <Monitor className="h-4 w-4" />,
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
  const [selectedExample, setSelectedExample] = useState<number | null>(
    undefined
  );
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
        }
        if ('boolean' === typeof value) {
          return value ? key : '';
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join('\n    ');

    return config.codeTemplate
      .replace('{{componentName}}', config.componentName)
      .replace('{{props}}', propsString);
  }, [currentProps, customCode, config.componentName, config.codeTemplate]);

  // Handle prop changes
  const handlePropertyChange = useCallback(
    (propertyName: string, value: unknown) => {
      setCurrentProps((previous) => ({
        ...previous,
        [propertyName]: value,
      }));

      setSelectedExample(undefined);
    },
    []
  );

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
    if (!enablePerformanceMonitoring) {
      return;
    }

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
  }, [enablePerformanceMonitoring]);

  // Run accessibility tests when props change
  useEffect(() => {
    if (enableA11yTesting) {
      const timer = setTimeout(runA11yTests, 500);
      return () => clearTimeout(timer);
    }
    return;
  }, [runA11yTests, enableA11yTesting]);

  // Copy code to clipboard
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      // Could add toast notification here
    } catch {
      // Logging disabled
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
  const propertyControlsByCategory = useMemo(() => {
    const grouped: Record<string, Array<PropertyControl>> = {};

    for (const control of config.propControls) {
      const category = control.category || 'General';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(control);
    }

    return grouped;
  }, [config.propControls]);

  // Render prop control
  const renderPropertyControl = (control: PropertyControl) => {
    const value = currentProps[control.name] ?? control.defaultValue;

    const baseInputClasses =
      'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

    switch (control.type) {
      case 'boolean': {
        return (
          <label
            htmlFor="handlepropertychangecontrolname-etargetchecked--classnamerounded-border-gray-300-text-blue-600-focusring-blue-500--controlname-pp5cch"
            className="flex items-center space-x-2"
          >
            <input
              id="input-1-dkfg43"
              type="checkbox"
              checked={value}
              onChange={(e) =>
                handlePropertyChange(control.name, e.target.checked)
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <span className="text-sm">{control.name}</span>
          </label>
        );
      }

      case 'select': {
        return (
          <select
            id="select-1-ngq43h"
            value={value}
            onChange={(e) => handlePropertyChange(control.name, e.target.value)}
            className={baseInputClasses}
          >
            {control.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }

      case 'range': {
        return (
          <div className="space-y-2">
            <input
              id="input-2-ygqqf0"
              type="range"
              min={control.min || 0}
              max={control.max || 100}
              step={control.step || 1}
              value={value}
              onChange={(e) =>
                handlePropertyChange(control.name, Number(e.target.value))
              }
              className="w-full"
            />

            <div className="text-center text-gray-600 text-sm">{value}</div>
          </div>
        );
      }

      case 'color': {
        return (
          <div className="flex space-x-2">
            <input
              id="input-3-e9eril"
              type="color"
              value={value}
              onChange={(e) =>
                handlePropertyChange(control.name, e.target.value)
              }
              className="h-10 w-12 cursor-pointer rounded border border-gray-300"
            />

            <input
              id="input-4-hu0lnx"
              type="text"
              value={value}
              onChange={(e) =>
                handlePropertyChange(control.name, e.target.value)
              }
              className={`${baseInputClasses} flex-1`}
              placeholder="#000000"
            />
          </div>
        );
      }

      case 'textarea': {
        return (
          <textarea
            id="textarea-1-o2e9jo"
            value={value}
            onChange={(e) => handlePropertyChange(control.name, e.target.value)}
            className={`${baseInputClasses} min-h-[100px]`}
            rows={4}
          />
        );
      }

      case 'number': {
        return (
          <input
            id="input-5-ckph7d"
            type="number"
            value={value}
            onChange={(e) =>
              handlePropertyChange(control.name, Number(e.target.value))
            }
            min={control.min}
            max={control.max}
            step={control.step}
            className={baseInputClasses}
          />
        );
      }

      default: {
        // string
        return (
          <input
            id="input-6-fcwwqj"
            type="text"
            value={value}
            onChange={(e) => handlePropertyChange(control.name, e.target.value)}
            className={baseInputClasses}
          />
        );
      }
    }
  };

  const ComponentToRender = config.component;

  return (
    <div
      className={`liquidify-playground ${className} min-h-screen bg-gray-50`}
    >
      {/* Header */}

      <div className="border-gray-200 border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl text-gray-900">
              {config.componentName} Playground
            </h1>

            <p className="mt-1 text-gray-600">
              Interactive component documentation and testing
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Layout Toggle */}

            <button
              type="button"
              onClick={() =>
                setLayout('horizontal' === layout ? 'vertical' : 'horizontal')
              }
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              title="Toggle layout"
            >
              <RefreshCw className="h-5 w-5" />
            </button>

            {/* Performance Metrics */}
            {enablePerformanceMonitoring && (
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Zap className="h-4 w-4" />

                <span>{performanceMetrics.renderTime}ms</span>

                <span>({performanceMetrics.reRenders} renders)</span>
              </div>
            )}

            {/* Actions */}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={copyCode}
                className="flex items-center rounded-md px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Copy className="mr-1 h-4 w-4" />
                Copy
              </button>

              {enableCodeExport && (
                <button
                  type="button"
                  onClick={exportConfig}
                  className="flex items-center rounded-md px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Export
                </button>
              )}

              <button
                type="button"
                onClick={resetToDefaults}
                className="flex items-center rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                <RefreshCw className="mr-1 h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Controls Bar */}

        <div className="mt-4 flex items-center justify-between border-gray-200 border-t pt-4">
          <div className="flex items-center space-x-4">
            {/* Viewport Controls */}
            {showViewportControls && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">Viewport:</span>
                {VIEWPORT_SIZES.map((viewportSize) => (
                  <button
                    type="button"
                    key={viewportSize.name}
                    onClick={() => setViewport(viewportSize)}
                    className={`flex items-center rounded-md px-3 py-1 text-sm ${
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
                <Palette className="h-4 w-4 text-gray-600" />

                <select
                  id="select-2-2h73j1"
                  value={theme?.value || 'light'}
                  onChange={(e) =>
                    setTheme(
                      THEMES.find((t) => t.value === e.target.value) ||
                        THEMES[0]
                    )
                  }
                  className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                >
                  {THEMES.map((themeOption) => (
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
              type="button"
              onClick={() => setShowProps(!showProps)}
              className={`flex items-center rounded-md px-3 py-1 text-sm ${
                showProps
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="mr-1 h-4 w-4" />
              Props
            </button>

            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center rounded-md px-3 py-1 text-sm ${
                showCode
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Code className="mr-1 h-4 w-4" />
              Code
            </button>

            {enableA11yTesting && (
              <button
                type="button"
                onClick={runA11yTests}
                className="flex items-center rounded-md px-3 py-1 text-gray-600 text-sm hover:bg-gray-100"
              >
                <Accessibility className="mr-1 h-4 w-4" />
                A11y Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div
        className={`flex ${'horizontal' === layout ? 'flex-row' : 'flex-col'} h-[calc(100vh-200px)]`}
      >
        {/* Preview Panel */}

        <div
          className={`${'horizontal' === layout ? 'flex-1' : 'h-1/2'} bg-white`}
        >
          <div className="flex h-full flex-col">
            {/* Preview Header */}

            <div className="border-gray-200 border-b bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Preview</h3>

                <div className="text-gray-600 text-sm">
                  {viewport?.width} × {viewport?.height}
                </div>
              </div>
            </div>

            {/* Preview Content */}

            <div className="flex-1 overflow-auto p-6">
              <div
                ref={previewRef}
                className={`mx-auto transition-all duration-300 ${theme?.bg} ${theme?.text}`}
                style={{
                  width: viewport?.width,
                  minHeight: viewport?.height,
                  maxWidth: '100%',
                }}
              >
                <div className="flex min-h-full items-center justify-center p-8">
                  <ComponentToRender {...currentProps} />
                </div>
              </div>
            </div>

            {/* Accessibility Results */}
            {enableA11yTesting && Object.keys(a11yResults).length > 0 && (
              <div className="border-gray-200 border-t bg-gray-50 p-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  Accessibility Tests
                </h4>

                <div className="space-y-1">
                  {Object.entries(a11yResults).map(([testName, result]) => (
                    <div
                      key={testName}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}
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
          className={`${'horizontal' === layout ? 'w-80 border-l' : 'h-1/2 border-t'} overflow-auto border-gray-200 bg-white`}
        >
          {/* Examples */}
          {config.examples.length > 0 && (
            <div className="border-gray-200 border-b p-4">
              <h3 className="mb-3 font-medium text-gray-900">Examples</h3>

              <div className="space-y-2">
                {config.examples.map((example, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleExampleSelect(index)}
                    className={`w-full rounded-md border p-3 text-left ${
                      selectedExample === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{example.name}</div>

                    <div className="mt-1 text-gray-600 text-xs">
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
              <h3 className="mb-3 font-medium text-gray-900">Props</h3>

              <div className="space-y-6">
                {Object.entries(propertyControlsByCategory).map(
                  ([category, controls]) => (
                    <div key={category}>
                      <h4 className="mb-3 font-medium text-gray-700 text-sm">
                        {category}
                      </h4>

                      <div className="space-y-4">
                        {controls.map((control) => (
                          <div key={control.name}>
                            <label
                              htmlFor="controlname-jm4cj5"
                              className="mb-1 block font-medium text-gray-700 text-sm"
                            >
                              {control.name}
                            </label>
                            {renderPropertyControl(control)}
                            {control.description && (
                              <p className="mt-1 text-gray-500 text-xs">
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
            <div className="border-gray-200 border-t p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Generated Code</h3>

                <button
                  type="button"
                  onClick={copyCode}
                  className="text-blue-600 text-sm hover:text-blue-700"
                >
                  Copy
                </button>
              </div>

              <div className="relative">
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-gray-100 text-sm">
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
