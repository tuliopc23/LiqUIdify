import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { accessibilityManager } from '@/core/accessibility-manager';

import { cn } from '@/core/utils/classname';
import { GlassButton } from '../glass-button-refactored';
import { GlassCard } from '../glass-card-refactored';

interface AccessibilityViolation {
  id: string;
  description: string;
}

interface AccessibilityReport {
  score: number;
  wcagLevel: string;
  violations: Array<AccessibilityViolation>;
  warnings: Array<{ id: string; description: string }>;
}

interface ContrastResult {
  ratio: number;
  passes: {
    aa: { normal: boolean; large: boolean };
    aaa: { normal: boolean; large: boolean };
  };
  suggestedForeground?: string;
  suggestedBackground?: string;
}

interface AccessibilityDemoProps {
  className?: string;
}

export const GlassAccessibleDemo: React.FC<AccessibilityDemoProps> = ({
  className,
}) => {
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [contrastResult, setContrastResult] = useState<ContrastResult | null>(
    null
  );
  const [validating, setValidating] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const [fgColor, setFgColor] = useState('#333333');
  const [bgColor, setBgColor] = useState('#f0f0f0');

  const validateAccessibility = async () => {
    if (!demoRef.current) {
      return;
    }

    setValidating(true);
    try {
      const report = await accessibilityManager.validateComponent(
        demoRef.current,
        {
          name: 'GlassAccessibleDemo',
          type: 'demo',
          props: { className },
        }
      );
      setReport(report);

      // Announce the result
      accessibilityManager.announce(
        `Accessibility score: ${report.score}. ${report.violations.length} violations found.`,
        report.violations.length > 0 ? 'assertive' : 'polite'
      );
    } catch {
      // Logging disabled
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
        <h2 className="mb-4 font-bold text-2xl">Accessibility Manager Demo</h2>

        {/* Accessibility Validation Demo  */}

        <section className="mb-6">
          <h3 className="mb-3 font-semibold text-xl">Component Validation</h3>

          <div className="space-y-3">
            <GlassButton
              type="button"
              onClick={validateAccessibility}
              disabled={validating}
              aria-busy={validating}
            >
              {validating ? 'Validating...' : 'Validate Accessibility'}
            </GlassButton>

            {report && (
              <section
                className="mt-4 rounded-lg bg-white/10 p-4"
                aria-label="Accessibility validation results"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Score:</span>

                    <span
                      className={cn(
                        'ml-2 font-bold',
                        95 <= report.score
                          ? 'text-green-500'
                          : 80 <= report.score
                            ? 'text-yellow-500'
                            : 'text-red-500'
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

                {report.violations.length > 0 && (
                  <details className="mt-4">
                    <summary className="cursor-pointer font-medium">
                      View Violations
                    </summary>

                    <ul className="mt-2 space-y-2">
                      {report.violations.map(
                        (violation: AccessibilityViolation) => (
                          <li key={violation.id} className="text-sm">
                            <strong>{violation.id}:</strong>{' '}
                            {violation.description}
                          </li>
                        )
                      )}
                    </ul>
                  </details>
                )}
              </section>
            )}
          </div>
        </section>

        {/* Contrast Checker Demo  */}

        <section className="mb-6">
          <h3 className="mb-3 font-semibold text-xl">Contrast Checker</h3>

          <div className="space-y-3">
            <div className="flex gap-4">
              <label htmlFor="foreground-color" className="flex-1">
                <span className="mb-1 block font-medium text-sm">
                  Foreground
                </span>

                <input
                  id="foreground-color"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded"
                  aria-label="Foreground color picker"
                />
              </label>

              <label htmlFor="background-color" className="flex-1">
                <span className="mb-1 block font-medium text-sm">
                  Background
                </span>

                <input
                  id="background-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded"
                  aria-label="Background color picker"
                />
              </label>
            </div>

            <GlassButton type="button" onClick={checkContrast}>
              Check Contrast
            </GlassButton>

            {contrastResult && (
              <section
                className="mt-4 rounded-lg bg-white/10 p-4"
                aria-label="Contrast check results"
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Contrast Ratio:</span>

                    <span className="ml-2 font-bold">
                      {contrastResult.ratio.toFixed(2)}:1
                    </span>
                  </div>

                  <div>
                    <span className="font-medium">AA Normal:</span>

                    <span
                      className={cn(
                        'ml-2',
                        contrastResult.passes.aa.normal
                          ? 'text-green-500'
                          : 'text-red-500'
                      )}
                    >
                      {contrastResult.passes.aa.normal ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>

                  <div>
                    <span className="font-medium">AAA Normal:</span>

                    <span
                      className={cn(
                        'ml-2',
                        contrastResult.passes.aaa.normal
                          ? 'text-green-500'
                          : 'text-red-500'
                      )}
                    >
                      {contrastResult.passes.aaa.normal ? '✓ Pass' : '✗ Fail'}
                    </span>
                  </div>
                  {contrastResult.suggestedForeground && (
                    <div>
                      <span className="font-medium">Suggested Color:</span>

                      <span
                        className="ml-2 rounded px-2 py-1"
                        style={{
                          backgroundColor: bgColor,
                          color: contrastResult.suggestedForeground,
                        }}
                      >
                        {contrastResult.suggestedForeground}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </section>

        {/* ARIA Validation Demo  */}

        <section>
          <h3 className="mb-3 font-semibold text-xl">
            ARIA Validation Examples
          </h3>

          <div className="space-y-3">
            {/* Good example  */}

            <div className="rounded bg-green-500/10 p-3">
              <button
                type="button"
                aria-label="Good example button"
                aria-pressed="false"
                className="rounded bg-green-500/20 px-4 py-2"
              >
                ✓ Good ARIA
              </button>

              <span className="ml-3 text-green-600 text-sm">
                Correct ARIA attributes
              </span>
            </div>

            {/* Bad example - will be auto-corrected  */}

            <div className="rounded bg-red-500/10 p-3">
              <button
                type="button"
                aria-expanded="false"
                className="rounded bg-red-500/20 px-4 py-2"
              >
                ✗ Bad ARIA (auto-corrected)
              </button>

              <span className="ml-3 text-red-600 text-sm">
                Invalid aria-expanded value
              </span>
            </div>
          </div>
        </section>
      </GlassCard>
    </div>
  );
};
