import React, { useEffect, useRef, useState } from 'react';
import { accessibilityManager } from '@/core/accessibility-manager';
import { GlassButton } from '../glass-button';
import { GlassCard } from '../glass-card';
import { cn } from '@/lib/glass-utils';

interface AccessibilityDemoProps {
  className?: string;
}

export const GlassAccessibleDemo: React.FC<AccessibilityDemoProps> = ({ className }) => {
  const [report, setReport] = useState<any>(undefined);
  const [contrastResult, setContrastResult] = useState<any>(undefined);
  const [validating, setValidating] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const [fgColor, setFgColor] = useState('#333333');
  const [bgColor, setBgColor] = useState('#f0f0f0');

  const validateAccessibility = async () => {
    if (!demoRef.current) {return;}
    
    setValidating(true);
    try {
      const report = await accessibilityManager.validateComponent(demoRef.current, {
        name: 'GlassAccessibleDemo',
        type: 'demo',
        props: { className },
      });
      setReport(report);
      
      // Announce the result
      accessibilityManager.announce(
        `Accessibility score: ${report.score}. ${report.violations.length} violations found.`,
        0 < report.violations.length ? 'assertive' : 'polite'
      );
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setValidating(false);
    }
  };

  const checkContrast = () => {
    const result = accessibilityManager.ensureContrast(fgColor, bgColor, {
      level: 'AA',
      autoFix: true,
    });
    setContrastResult(result);
  };

  useEffect(() => {
    // Enable real-time monitoring for this demo
    if (demoRef.current) {
      accessibilityManager.enableRealTimeMonitoring(demoRef.current);
    }

    return () => {
      accessibilityManager.disableRealTimeMonitoring();
    };
  }, []);

  return (
    <div ref={demoRef} className={cn('space-y-6', className)}>
      <GlassCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">Accessibility Manager Demo</h2>
        
        {/* Accessibility Validation Demo */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Component Validation</h3>
          <div className="space-y-3">
            <GlassButton
              onClick={validateAccessibility}
              disabled={validating}
              aria-busy={validating}
            >
              {validating ? 'Validating...' : 'Validate Accessibility'}
            </GlassButton>
            
            {report && (
              <div 
                className="mt-4 p-4 bg-white/10 rounded-lg"
                role="region"
                aria-label="Accessibility validation results"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Score:</span>
                    <span 
                      className={cn(
                        'ml-2 font-bold',
                        95 <= report.score ? 'text-green-500' : 
                        (80 <= report.score ? 'text-yellow-500' : 'text-red-500')
                      )}
                    >
                      {report.score}/100
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">WCAG Level:</span>
                    <span className="ml-2 font-bold">{report.wcagLevel}</span>
                  </div>
                  <div>
                    <span className="font-medium">Violations:</span>
                    <span className="ml-2">{report.violations.length}</span>
                  </div>
                  <div>
                    <span className="font-medium">Warnings:</span>
                    <span className="ml-2">{report.warnings.length}</span>
                  </div>
                </div>
                
                { 0 < report.violations.length && (
                  <details className="mt-4">
                    <summary className="cursor-pointer font-medium">
                      View Violations
                    </summary>
                    <ul className="mt-2 space-y-2">
                      {report.violations.map((violation: any, index: number) => (
                        <li key={index} className="text-sm">
                          <strong>{violation.id}:</strong> {violation.description}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Contrast Checker Demo */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Contrast Checker</h3>
          <div className="space-y-3">
            <div className="flex gap-4">
              <label className="flex-1">
                <span className="block text-sm font-medium mb-1">Foreground</span>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                  aria-label="Foreground color picker"
                />
              </label>
              <label className="flex-1">
                <span className="block text-sm font-medium mb-1">Background</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                  aria-label="Background color picker"
                />
              </label>
            </div>
            
            <GlassButton onClick={checkContrast}>
              Check Contrast
            </GlassButton>
            
            {contrastResult && (
              <div 
                className="mt-4 p-4 bg-white/10 rounded-lg"
                role="region"
                aria-label="Contrast check results"
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Contrast Ratio:</span>
                    <span className="ml-2 font-bold">{contrastResult.ratio.toFixed(2)}:1</span>
                  </div>
                  <div>
                    <span className="font-medium">AA Normal:</span>
                    <span className={cn(
                      'ml-2',
                      contrastResult.passes.aa.normal ? 'text-green-500' : 'text-red-500'
                    )}>
                      {contrastResult.passes.aa.normal ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">AAA Normal:</span>
                    <span className={cn(
                      'ml-2',
                      contrastResult.passes.aaa.normal ? 'text-green-500' : 'text-red-500'
                    )}>
                      {contrastResult.passes.aaa.normal ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>
                  {contrastResult.suggestedForeground && (
                    <div>
                      <span className="font-medium">Suggested Color:</span>
                      <span 
                        className="ml-2 px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: bgColor, 
                          color: contrastResult.suggestedForeground 
                        }}
                      >
                        {contrastResult.suggestedForeground}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ARIA Validation Demo */}
        <section>
          <h3 className="text-xl font-semibold mb-3">ARIA Validation Examples</h3>
          <div className="space-y-3">
            {/* Good example */}
            <div className="p-3 bg-green-500/10 rounded">
              <button
                
                aria-label="Good example button"
                aria-pressed="false"
                className="px-4 py-2 bg-green-500/20 rounded"
              >
                ✓ Good ARIA
              </button>
              <span className="ml-3 text-sm text-green-600">Correct ARIA attributes</span>
            </div>
            
            {/* Bad example - will be auto-corrected */}
            <div className="p-3 bg-red-500/10 rounded">
              <button
                
                aria-expanded="false"
                className="px-4 py-2 bg-red-500/20 rounded"
              >
                ✗ Bad ARIA (auto-corrected)
              </button>
              <span className="ml-3 text-sm text-red-600">Invalid aria-expanded value</span>
            </div>
          </div>
        </section>
      </GlassCard>
    </div>
  );
};