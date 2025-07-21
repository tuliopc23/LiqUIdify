/**
 * Glass UI DevTools Component
 * Provides runtime debugging, accessibility validation, and performance monitoring
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/core/utils/classname';
import { type AccessibilityReport, accessibilityManager } from '@/core/accessibility-manager';
import { type PerformanceReport, performanceMonitor } from '@/core/performance-monitor';
import { cssBundleAnalyzer } from '@/core/css-optimization';

// DevTools interfaces
export interface ComponentInspection {
    element: HTMLElement;
    componentName: string;
    props: Record<string, any>;
    accessibility: AccessibilityReport;
    performance: {
        renderTime: number;
        updateCount: number;
        memoryUsage: number;
    };
    styles: {
        computedStyles: CSSStyleDeclaration;
        appliedClasses: string[];
        glassEffects: string[];
    };
}

export interface DevToolsState {
    isOpen: boolean;
    activeTab: 'inspector' | 'accessibility' | 'performance' | 'console' | 'settings';
    selectedElement: HTMLElement | null;
    inspection: ComponentInspection | null;
    logs: DevToolsLog[];
    settings: DevToolsSettings;
}

export interface DevToolsLog {
    id: string;
    timestamp: Date;
    level: 'info' | 'warn' | 'error' | 'debug';
    category: 'accessibility' | 'performance' | 'component' | 'system';
    message: string;
    data?: any;
}

export interface DevToolsSettings {
    enableRealTimeValidation: boolean;
    enablePerformanceMonitoring: boolean;
    enableAccessibilityHighlights: boolean;
    enableConsoleLogging: boolean;
    theme: 'light' | 'dark' | 'auto';
    position: 'bottom' | 'right' | 'floating';
}

// DevTools hook
export function useGlassDevTools() {
    const [state, setState] = useState<DevToolsState>({
        isOpen: false,
        activeTab: 'inspector',
        selectedElement: undefined,
        inspection: undefined,
        logs: [],
        settings: {
            enableRealTimeValidation: true,
            enablePerformanceMonitoring: true,
            enableAccessibilityHighlights: true,
            enableConsoleLogging: true,
            theme: 'auto',
            position: 'bottom'
        }
    });

    const addLog = useCallback((log: Omit<DevToolsLog, 'id' | 'timestamp'>) => {
        const newLog: DevToolsLog = {
            ...log,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date()
        };

        setState(prev => ({
            ...prev,
            logs: [newLog, ...prev.logs].slice(0, 100) // Keep last 100 logs
        }));

        if (state.settings.enableConsoleLogging) {
            const consoleMethod = 'error' === log.level ? 'error' :
                ('warn' === log.level ? 'warn' : 'log');
            console[consoleMethod](`[Glass DevTools] ${log.message}`, log.data);
        }
    }, [state.settings.enableConsoleLogging]);

    const inspectElement = useCallback(async (element: HTMLElement) => {
        if (!element) {return undefined;}

        addLog({
            level: 'info',
            category: 'component',
            message: `Inspecting element: ${element.tagName.toLowerCase()}`
        });

        try {
            // Get component information
            const componentName = element.getAttribute('data-component') ||
                element.className.split(' ').find(c => c.startsWith('glass-')) ||
                element.tagName.toLowerCase();

            // Get accessibility report
            const accessibility = await accessibilityManager.validateComponent(element, {
                name: componentName,
                type: 'component',
                props: {}
            });

            // Get performance data
            const performanceReport = performanceMonitor.getReport();
            const componentMetrics = performanceReport.componentMetrics.find(
                m => m.componentName === componentName
            );

            // Get computed styles
            const computedStyles = window.getComputedStyle(element);
            const appliedClasses = [...element.classList];
            const glassEffects = appliedClasses.filter(c =>
                c.includes('glass') || c.includes('liquid') || c.includes('backdrop')
            );

            const inspection: ComponentInspection = {
                element,
                componentName,
                props: {}, // Would need React DevTools integration for actual props
                accessibility,
                performance: {
                    renderTime: componentMetrics?.renderTime || 0,
                    updateCount: componentMetrics?.rerenderCount || 0,
                    memoryUsage: 0 // Would need memory profiling
                },
                styles: {
                    computedStyles,
                    appliedClasses,
                    glassEffects
                }
            };

            setState(prev => ({
                ...prev,
                selectedElement: element,
                inspection
            }));

            addLog({
                level: 'info',
                category: 'component',
                message: `Element inspected successfully`,
                data: { componentName, accessibility: accessibility.score }
            });

        } catch (error) {
            addLog({
                level: 'error',
                category: 'component',
                message: `Failed to inspect element: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        }
    }, [addLog]);

    return {
        state,
        setState,
        addLog,
        inspectElement
    };
}

// Main DevTools component
export interface GlassDevToolsProps {
    enabled?: boolean;
    defaultOpen?: boolean;
    position?: 'bottom' | 'right' | 'floating';
    theme?: 'light' | 'dark' | 'auto';
}

export function GlassDevTools({
    enabled = 'development' === process.env.NODE_ENV,
    defaultOpen = false,
    position = 'bottom',
    theme = 'auto'
}: GlassDevToolsProps) {
    const { state, setState, inspectElement } = useGlassDevTools();
    const [performanceReport, setPerformanceReport] = useState<PerformanceReport | null>(undefined);
    const [cssReport, setCssReport] = useState<any>(undefined);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Initialize DevTools
    useEffect(() => {
        if (!enabled) {return undefined;}

        setState(prev => ({
            ...prev,
            isOpen: defaultOpen,
            settings: {
                ...prev.settings,
                position,
                theme
            }
        }));

        // Set up keyboard shortcut (Ctrl/Cmd + Shift + D)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && 'D' === e.key) {
                e.preventDefault();
                setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Set up element inspection on click
        const handleElementClick = (e: MouseEvent) => {
            if (!state.isOpen) {return undefined;}

            // Check if click is inside DevTools
            if (overlayRef.current?.contains(e.target as Node)) {return undefined;}

            e.preventDefault();
            e.stopPropagation();

            const element = e.target as HTMLElement;
            inspectElement(element);
        };

        if (state.isOpen) {
            document.addEventListener('click', handleElementClick, true);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleElementClick, true);
        };
    }, [enabled, defaultOpen, position, theme, state.isOpen, inspectElement]);

    // Update performance report periodically
    useEffect(() => {
        if (!enabled || !state.settings.enablePerformanceMonitoring) {return undefined;}

        const interval = setInterval(() => {
            const report = performanceMonitor.getReport();
            setPerformanceReport(report);
        }, 1000);

        return () => clearInterval(interval);
    }, [enabled, state.settings.enablePerformanceMonitoring]);

    // Update CSS report
    useEffect(() => {
        if (!enabled) {return undefined;}

        cssBundleAnalyzer.generateReport().then(setCssReport);
    }, [enabled]);

    // Real-time accessibility validation
    useEffect(() => {
        if (!enabled || !state.settings.enableRealTimeValidation) {return undefined;}

        accessibilityManager.enableRealTimeMonitoring();

        return () => {
            accessibilityManager.disableRealTimeMonitoring();
        };
    }, [enabled, state.settings.enableRealTimeValidation]);

    if (!enabled || !state.isOpen) {
        return undefined;
    }

    const positionClasses = {
        bottom: 'fixed bottom-0 left-0 right-0 h-80',
        right: 'fixed top-0 right-0 bottom-0 w-96',
        floating: 'fixed top-4 right-4 w-96 h-96 rounded-lg shadow-2xl'
    };

    return (
        <div
            ref={overlayRef}
            className={cn(
                'glass-devtools z-[9999] bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700',
                positionClasses[state.settings.position],
                'dark' === state.settings.theme && 'dark'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <h3 className="font-semibold text-sm">Glass UI DevTools</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setState(prev => ({ ...prev, logs: [] }))}
                        className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        Clear
                    </button>
                    <button
                        onClick={() => setState(prev => ({ ...prev, isOpen: false }))}
                        className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {(['inspector', 'accessibility', 'performance', 'console', 'settings'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setState(prev => ({ ...prev, activeTab: tab }))}
                        className={cn(
                            'px-3 py-2 text-xs font-medium capitalize border-b-2 transition-colors',
                            state.activeTab === tab
                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-3">
                { 'inspector' === state.activeTab && (
                    <InspectorTab inspection={state.inspection} />
                )}
                { 'accessibility' === state.activeTab && (
                    <AccessibilityTab
                        inspection={state.inspection}
                        onValidate={(element) => inspectElement(element)}
                    />
                )}
                { 'performance' === state.activeTab && (
                    <PerformanceTab
                        report={performanceReport}
                        cssReport={cssReport}
                    />
                )}
                { 'console' === state.activeTab && (
                    <ConsoleTab logs={state.logs} />
                )}
                { 'settings' === state.activeTab && (
                    <SettingsTab
                        settings={state.settings}
                        onSettingsChange={(settings) =>
                            setState(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }))
                        }
                    />
                )}
            </div>
        </div>
    );
}

// Inspector Tab Component
function InspectorTab({ inspection }: { inspection: ComponentInspection | null }) {
    if (!inspection) {
        return (
            <div className="text-center text-gray-500 py-8">
                <p>Click on any element to inspect it</p>
                <p className="text-xs mt-2">Use Ctrl/Cmd + Shift + D to toggle DevTools</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-sm mb-2">Component Info</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 text-xs">
                    <div><strong>Name:</strong> {inspection.componentName}</div>
                    <div><strong>Tag:</strong> {inspection.element.tagName.toLowerCase()}</div>
                    <div><strong>Classes:</strong> {inspection.styles.appliedClasses.join(', ')}</div>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-sm mb-2">Glass Effects</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 text-xs">
                    { 0 < inspection.styles.glassEffects.length ? (
                        inspection.styles.glassEffects.map(effect => (
                            <div key={effect} className="mb-1">• {effect}</div>
                        ))
                    ) : (
                        <div className="text-gray-500">No glass effects detected</div>
                    )}
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-sm mb-2">Performance</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 text-xs">
                    <div><strong>Render Time:</strong> {inspection.performance.renderTime.toFixed(2)}ms</div>
                    <div><strong>Updates:</strong> {inspection.performance.updateCount}</div>
                </div>
            </div>
        </div>
    );
}

// Accessibility Tab Component
function AccessibilityTab({
    inspection,
    onValidate
}: {
    inspection: ComponentInspection | null;
    onValidate: (element: HTMLElement) => void;
}) {
    if (!inspection) {
        return (
            <div className="text-center text-gray-500 py-8">
                <p>Select an element to view accessibility information</p>
            </div>
        );
    }

    const { accessibility } = inspection;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Accessibility Score</h4>
                <button
                    onClick={() => onValidate(inspection.element)}
                    className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                    Re-validate
                </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                        'w-3 h-3 rounded-full',
                        95 <= accessibility.score ? 'bg-green-500' :
                            (80 <= accessibility.score ? 'bg-yellow-500' : 'bg-red-500')
                    )} />
                    <span className="font-semibold">{accessibility.score}/100</span>
                    <span className="text-xs text-gray-500">WCAG {accessibility.wcagLevel}</span>
                </div>
            </div>

            { 0 < accessibility.violations.length && (
                <div>
                    <h5 className="font-semibold text-sm mb-2 text-red-600">Violations</h5>
                    <div className="space-y-2">
                        {accessibility.violations.map((violation, index) => (
                            <div key={index} className="bg-red-50 dark:bg-red-900/20 rounded p-2 text-xs">
                                <div className="font-semibold">{violation.description}</div>
                                <div className="text-gray-600 dark:text-gray-400 mt-1">{violation.help}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            { 0 < accessibility.suggestions.length && (
                <div>
                    <h5 className="font-semibold text-sm mb-2 text-blue-600">Suggestions</h5>
                    <div className="space-y-2">
                        {accessibility.suggestions.map((suggestion, index) => (
                            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 text-xs">
                                <div>{suggestion.message}</div>
                                {suggestion.autoFixAvailable && (
                                    <button
                                        onClick={() => suggestion.fix?.()}
                                        className="mt-1 text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700"
                                    >
                                        Auto-fix
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Performance Tab Component
function PerformanceTab({
    report,
    cssReport
}: {
    report: PerformanceReport | null;
    cssReport: any;
}) {
    if (!report) {
        return (
            <div className="text-center text-gray-500 py-8">
                <p>Performance data loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-sm mb-2">Core Web Vitals</h4>
                <div className="grid grid-cols-2 gap-2">
                    {report.webVitals.map(metric => (
                        <div key={metric.name} className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-xs">
                            <div className="font-semibold">{metric.name}</div>
                            <div className={cn(
                                'text-lg font-bold',
                                'good' === metric.rating ? 'text-green-600' :
                                    ('needs-improvement' === metric.rating ? 'text-yellow-600' : 'text-red-600')
                            )}>
                                {metric.value.toFixed(0)}
                                { 'CLS' === metric.name ? '' : 'ms'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {cssReport && (
                <div>
                    <h4 className="font-semibold text-sm mb-2">Bundle Sizes</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 text-xs">
                        <div className="mb-2">
                            <strong>Total:</strong> {cssReport.totalSize}KB / 30KB
                            <div className={cn(
                                'w-full bg-gray-200 rounded-full h-2 mt-1',
                                30 < cssReport.totalSize ? 'bg-red-200' : 'bg-green-200'
                            )}>
                                <div
                                    className={cn(
                                        'h-2 rounded-full transition-all',
                                        30 < cssReport.totalSize ? 'bg-red-500' : 'bg-green-500'
                                    )}
                                    style={{ width: `${Math.min((cssReport.totalSize / 30) * 100, 100)}%` }}
                                 />
                            </div>
                        </div>
                        {Object.entries(cssReport.bundles).map(([name, bundle]: [string, any]) => (
                            <div key={name} className="mb-1">
                                <strong>{name}:</strong> {bundle.size}KB / {bundle.maxSize}KB
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h4 className="font-semibold text-sm mb-2">Component Performance</h4>
                <div className="space-y-2 max-h-32 overflow-auto">
                    {report.componentMetrics.slice(0, 5).map((component, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-xs">
                            <div className="font-semibold">{component.componentName}</div>
                            <div>Render: {component.renderTime.toFixed(2)}ms</div>
                            <div>Re-renders: {component.rerenderCount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Console Tab Component
function ConsoleTab({ logs }: { logs: DevToolsLog[] }) {
    return (
        <div className="space-y-1 max-h-64 overflow-auto">
            { 0 === logs.length ? (
                <div className="text-center text-gray-500 py-8">
                    <p>No logs yet</p>
                </div>
            ) : (
                logs.map(log => (
                    <div key={log.id} className={cn(
                        'text-xs p-2 rounded border-l-2',
                        'error' === log.level ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                            'warn' === log.level ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                                'info' === log.level ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' :
                                    'bg-gray-50 dark:bg-gray-800 border-gray-500'
                    )}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-gray-500">
                                {log.timestamp.toLocaleTimeString()}
                            </span>
                            <span className={cn(
                                'px-1 rounded text-xs font-semibold',
                                'error' === log.level ? 'bg-red-200 text-red-800' :
                                    'warn' === log.level ? 'bg-yellow-200 text-yellow-800' :
                                        'info' === log.level ? 'bg-blue-200 text-blue-800' :
                                            'bg-gray-200 text-gray-800'
                            )}>
                                {log.level.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-600">{log.category}</span>
                        </div>
                        <div>{log.message}</div>
                        {log.data && (
                            <details className="mt-1">
                                <summary className="cursor-pointer text-gray-600">Data</summary>
                                <pre className="mt-1 text-xs bg-gray-100 dark:bg-gray-900 p-1 rounded overflow-auto">
                                    {JSON.stringify(log.data, undefined, 2)}
                                </pre>
                            </details>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

// Settings Tab Component
function SettingsTab({
    settings,
    onSettingsChange
}: {
    settings: DevToolsSettings;
    onSettingsChange: (settings: Partial<DevToolsSettings>) => void;
}) {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-sm mb-2">Monitoring</h4>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs">
                        <input
                            type="checkbox"
                            checked={settings.enableRealTimeValidation}
                            onChange={(e) => onSettingsChange({ enableRealTimeValidation: e.target.checked })}
                        />
                        Real-time accessibility validation
                    </label>
                    <label className="flex items-center gap-2 text-xs">
                        <input
                            type="checkbox"
                            checked={settings.enablePerformanceMonitoring}
                            onChange={(e) => onSettingsChange({ enablePerformanceMonitoring: e.target.checked })}
                        />
                        Performance monitoring
                    </label>
                    <label className="flex items-center gap-2 text-xs">
                        <input
                            type="checkbox"
                            checked={settings.enableAccessibilityHighlights}
                            onChange={(e) => onSettingsChange({ enableAccessibilityHighlights: e.target.checked })}
                        />
                        Accessibility highlights
                    </label>
                    <label className="flex items-center gap-2 text-xs">
                        <input
                            type="checkbox"
                            checked={settings.enableConsoleLogging}
                            onChange={(e) => onSettingsChange({ enableConsoleLogging: e.target.checked })}
                        />
                        Console logging
                    </label>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-sm mb-2">Appearance</h4>
                <div className="space-y-2">
                    <div>
                        <label className="block text-xs mb-1">Theme</label>
                        <select
                            value={settings.theme}
                            onChange={(e) => onSettingsChange({ theme: e.target.value as any })}
                            className="w-full text-xs p-1 rounded border"
                        >
                            <option value="auto">Auto</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs mb-1">Position</label>
                        <select
                            value={settings.position}
                            onChange={(e) => onSettingsChange({ position: e.target.value as any })}
                            className="w-full text-xs p-1 rounded border"
                        >
                            <option value="bottom">Bottom</option>
                            <option value="right">Right</option>
                            <option value="floating">Floating</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500">
                    <div>Glass UI DevTools v1.0.0</div>
                    <div>Press Ctrl/Cmd + Shift + D to toggle</div>
                </div>
            </div>
        </div>
    );
}

export default GlassDevTools;