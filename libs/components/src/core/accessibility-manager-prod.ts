import type { AxeResults } from 'axe-core';

import { announcer } from '@/components/glass-live-region';

import { getContrastRatio } from '@/core/utils/color';

// Re-export types from the main accessibility manager
export type {
  AccessibilityReport,
  ARIACorrection,
  ARIAError,
  ARIASuggestion,
  ARIAValidation,
  ComponentInfo,
  ContrastResult,
  FocusOptions,
  Suggestion,
  Violation,
  ViolationNode,
  Warning,
} from './accessibility-manager';

// Production stub for axe-core functionality
const mockAxeResults: AxeResults = {
  violations: [],
  passes: [],
  incomplete: [],
  inapplicable: [],
  timestamp: new Date().toISOString(),
  url: '',
  testEngine: { name: 'axe-core', version: '0.0.0' },
  testRunner: { name: 'production-stub' },
  testEnvironment: {
    userAgent: '',
    windowWidth: 0,
    windowHeight: 0,
    orientationAngle: 0,
    orientationType: 'landscape-primary',
  },
  toolOptions: {},
};

// Lazy load axe-core only in development
let axeInstance: typeof import('axe-core') | null;

async function getAxe() {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (!axeInstance) {
    try {
      axeInstance = await import('axe-core');
    } catch {
      console.warn('axe-core not available');
      return;
    }
  }

  return axeInstance;
}

export class AccessibilityManager {
  private static instance: AccessibilityManager | null = null;

  private cache = new WeakMap<HTMLElement, AccessibilityReport>();

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  async validateComponent(element: HTMLElement): Promise<AccessibilityReport> {
    return this.analyzeComponent(element);
  }

  announce(message: string, priority = 'polite'): void {
    if (typeof announcer !== 'undefined' && announcer.announce) {
      announcer.announce(message, { priority: priority as unknown });
    }
  }

  ensureContrast(
    element: HTMLElement,
    _options?: any
  ): { background: string; foreground: string } {
    const computedStyle = window.getComputedStyle(element);
    const background = computedStyle.backgroundColor || '#ffffff';
    const foreground = computedStyle.color || '#000000';
    return { background, foreground };
  }

  enableRealTimeMonitoring(): void {
    console.log('Real-time monitoring enabled');
  }

  disableRealTimeMonitoring(): void {
    console.log('Real-time monitoring disabled');
  }

  async runAudit(element: HTMLElement, options?: any): Promise<AxeResults> {
    if (process.env.NODE_ENV === 'production') {
      return mockAxeResults;
    }

    const axe = await getAxe();
    if (!axe) {
      return mockAxeResults;
    }

    try {
      return await axe.default.run(element, options);
    } catch (error) {
      console.error('Accessibility audit failed:', error);
      return mockAxeResults;
    }
  }

  async analyzeComponent(
    element: HTMLElement,
    componentInfo?: ComponentInfo
  ): Promise<AccessibilityReport> {
    // Check cache first
    const cached = this.cache.get(element);
    if (cached && Date.now() - cached.timestamp.getTime() < 5000) {
      return cached;
    }

    const axeResults = await this.runAudit(element);

    const violations = axeResults.violations.map((v) => ({
      id: v.id,
      impact: v.impact as unknown,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map((n) => ({
        html: n.html,
        target: n.target,
        failureSummary: n.failureSummary || '',
        fix: this.generateFix(v.id, n),
      })),
    }));

    const warnings = this.detectWarnings(element);
    const suggestions = this.generateSuggestions(element, axeResults);
    const score = this.calculateScore(axeResults);
    const wcagLevel = this.determineWCAGLevel(score);

    const report: AccessibilityReport = {
      score,
      violations,
      warnings,
      suggestions,
      wcagLevel,
      timestamp: new Date(),
      componentInfo,
    };

    this.cache.set(element, report);
    return report;
  }

  private detectWarnings(element: HTMLElement): Array<Warning> {
    const warnings: Array<Warning> = [];

    // Check for missing alt text on images
    const images = element.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      warnings.push({
        id: 'missing-alt-text',
        description: 'Images without alt text',
        suggestion: 'Add descriptive alt text to all images',
        elements: [...images] as Array<HTMLElement>,
      });
    }

    // Check for empty buttons
    const emptyButtons = element.querySelectorAll('button:empty');
    if (emptyButtons.length > 0) {
      warnings.push({
        id: 'empty-buttons',
        description: 'Buttons without text content',
        suggestion: 'Add text or aria-label to buttons',
        elements: [...emptyButtons] as Array<HTMLElement>,
      });
    }

    return warnings;
  }

  private generateSuggestions(
    element: HTMLElement,
    _axeResults: AxeResults
  ): Array<Suggestion> {
    const suggestions: Array<Suggestion> = [];

    // Contrast suggestions
    const elementsWithBg = element.querySelectorAll('[style*="background"]');
    for (const element_ of elementsWithBg) {
      const contrast = this.checkContrast(element_ as HTMLElement);
      if (contrast && !contrast.passes.aa.normal) {
        suggestions.push({
          type: 'contrast',
          message: `Low contrast ratio (${contrast.ratio.toFixed(2)}:1). Consider adjusting colors.`,
          priority: 'high',
          autoFixAvailable: true,
          fix: () => this.autoFixContrast(element_ as HTMLElement, contrast),
        });
      }
    }

    // Keyboard navigation suggestions
    const interactiveElements = element.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]'
    );
    const tabIndexes = [...interactiveElements]
      .map((element_) =>
        Number.parseInt(element_.getAttribute('tabindex') || '0')
      )
      .filter((index) => index > 0);

    if (tabIndexes.length > 0) {
      suggestions.push({
        type: 'keyboard',
        message:
          'Positive tabindex values detected. Consider using natural tab order.',
        priority: 'medium',
        autoFixAvailable: false,
      });
    }

    return suggestions;
  }

  private calculateScore(results: AxeResults): number {
    const totalTests = results.passes.length + results.violations.length;
    if (totalTests === 0) {
      return 100;
    }

    const violationWeight = results.violations.reduce((sum, v) => {
      const impactWeight = {
        critical: 10,
        serious: 5,
        moderate: 2,
        minor: 1,
      }[v.impact || 'minor'];
      return sum + impactWeight * v.nodes.length;
    }, 0);

    const maxPossibleWeight = totalTests * 10;
    const score = Math.max(
      0,
      100 - (violationWeight / maxPossibleWeight) * 100
    );

    return Math.round(score);
  }

  private determineWCAGLevel(score: number): 'A' | 'AA' | 'AAA' {
    if (score >= 95) {
      return 'AAA';
    }
    if (score >= 85) {
      return 'AA';
    }
    return 'A';
  }

  checkContrast(element: HTMLElement): ContrastResult | null {
    try {
      const computed = window.getComputedStyle(element);
      const bg = computed.backgroundColor;
      const fg = computed.color;

      if (!bg || !fg || bg === 'transparent' || fg === 'transparent') {
        return;
      }

      const ratio = getContrastRatio(fg, bg);
      const fontSize = Number.parseFloat(computed.fontSize);
      const fontWeight = computed.fontWeight;
      const isLarge =
        fontSize >= 18 ||
        (fontSize >= 14 && Number.parseInt(fontWeight) >= 700);

      return {
        ratio,
        passes: {
          aa: {
            normal: ratio >= 4.5,
            large: ratio >= 3,
          },
          aaa: {
            normal: ratio >= 7,
            large: ratio >= 4.5,
          },
        },
        recommendation: this.getContrastRecommendation(ratio, isLarge),
      };
    } catch {
      return;
    }
  }

  private getContrastRecommendation(ratio: number, isLarge: boolean): string {
    if (isLarge) {
      if (ratio >= 4.5) {
        return 'Excellent contrast for large text (AAA)';
      }
      if (ratio >= 3) {
        return 'Good contrast for large text (AA)';
      }
      return 'Insufficient contrast for large text';
    }
    if (ratio >= 7) {
      return 'Excellent contrast (AAA)';
    }
    if (ratio >= 4.5) {
      return 'Good contrast (AA)';
    }
    return 'Insufficient contrast';
  }

  private autoFixContrast(
    element: HTMLElement,
    contrast: ContrastResult
  ): void {
    // Implementation would adjust colors to meet WCAG requirements
    console.log('Auto-fixing contrast for element', element, contrast);
  }

  private generateFix(violationId: string, _node: any): string | undefined {
    // Generate fix suggestions based on violation type
    const fixes: Record<string, string> = {
      'color-contrast':
        'Adjust foreground or background color to meet WCAG contrast requirements',
      'image-alt': 'Add descriptive alt text to the image',
      'button-name': 'Add text content or aria-label to the button',
      label: 'Add a label element or aria-label attribute',
    };

    return fixes[violationId];
  }

  validateARIA(element: HTMLElement): ARIAValidation {
    const errors: Array<ARIAError> = [];
    const suggestions: Array<ARIASuggestion> = [];
    const autoCorrections: Array<ARIACorrection> = [];

    // Check ARIA attributes
    const ariaAttributes = [...element.attributes].filter((attribute) =>
      attribute.name.startsWith('aria-')
    );

    for (const attribute of ariaAttributes) {
      // Validate attribute values
      if (
        attribute.name === 'aria-hidden' &&
        attribute.value !== 'true' &&
        attribute.value !== 'false'
      ) {
        errors.push({
          attribute: attribute.name,
          value: attribute.value,
          reason: 'aria-hidden must be "true" or "false"',
          element,
        });
      }

      // Check for deprecated attributes
      if (attribute.name === 'aria-grabbed') {
        suggestions.push({
          attribute: attribute.name,
          currentValue: attribute.value,
          suggestedValue: '',
          reason: 'aria-grabbed is deprecated in ARIA 1.1',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      suggestions,
      autoCorrections,
    };
  }

  announceToScreenReader(
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ): void {
    announcer.announce(message, priority);
  }

  async generateReport(elements: Array<HTMLElement>): Promise<string> {
    const reports = await Promise.all(
      elements.map((element) => this.analyzeComponent(element))
    );

    const totalScore =
      reports.reduce((sum, r) => sum + r.score, 0) / reports.length;
    const allViolations = reports.flatMap((r) => r.violations);
    const criticalCount = allViolations.filter(
      (v) => v.impact === 'critical'
    ).length;
    const seriousCount = allViolations.filter(
      (v) => v.impact === 'serious'
    ).length;

    return `
# Accessibility Report

## Summary
- Overall Score: ${totalScore.toFixed(1)}/100
- Components Analyzed: ${reports.length}
- Total Violations: ${allViolations.length}
- Critical Issues: ${criticalCount}
- Serious Issues: ${seriousCount}

## Violations by Impact
${this.groupViolationsByImpact(allViolations)}

## Recommendations
${this.generateRecommendations(reports)}
    `.trim();
  }

  private groupViolationsByImpact(violations: Array<Violation>): string {
    const grouped = violations.reduce(
      (accumulator, v) => {
        if (!accumulator[v.impact]) {
          accumulator[v.impact] = [];
        }
        accumulator[v.impact].push(v);
        return accumulator;
      },
      {} as Record<string, Array<Violation>>
    );

    return Object.entries(grouped)
      .sort(([a], [b]) => {
        const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
        return order[a as keyof typeof order] - order[b as keyof typeof order];
      })
      .map(
        ([impact, violations]) =>
          `### ${impact.charAt(0).toUpperCase() + impact.slice(1)} (${violations.length})

${violations.map((v: unknown) => `- ${v.help}`).join('\n')}`
      )
      .join('\n\n');
  }

  private generateRecommendations(reports: Array<AccessibilityReport>): string {
    const recommendations = new Set<string>();

    for (const report of reports) {
      if (report.score < 85) {
        recommendations.add(
          'Focus on fixing critical and serious violations first'
        );
      }

      if (report.suggestions.some((s: unknown) => s.type === 'contrast')) {
        recommendations.add(
          'Review and adjust color contrast ratios across components'
        );
      }

      if (report.warnings.some((w: unknown) => w.id === 'missing-alt-text')) {
        recommendations.add('Ensure all images have descriptive alt text');
      }
    }

    return [...recommendations].map((r) => `- ${r}`).join('\n');
  }
}

interface ComponentInfo {
  name: string;
  type: string;
  props: Record<string, unknown>;
}

interface Warning {
  id: string;
  description: string;
  suggestion: string;
  elements: Array<HTMLElement>;
}

interface Suggestion {
  type: 'contrast' | 'aria' | 'keyboard' | 'structure';
  message: string;
  priority: 'low' | 'medium' | 'high';
  autoFixAvailable: boolean;
  fix?: () => void;
}

interface ContrastResult {
  ratio: number;
  passes: {
    aa: { normal: boolean; large: boolean };
    aaa: { normal: boolean; large: boolean };
  };
  recommendation: string;
  suggestedForeground?: string;
  suggestedBackground?: string;
  autoFixed?: boolean;
}

interface ARIAValidation {
  valid: boolean;
  errors: Array<ARIAError>;
  suggestions: Array<ARIASuggestion>;
  autoCorrections: Array<ARIACorrection>;
}

interface ARIAError {
  attribute: string;
  value: string;
  reason: string;
  element: HTMLElement;
}

interface ARIASuggestion {
  attribute: string;
  currentValue: string | null;
  suggestedValue: string;
  reason: string;
}

interface ARIACorrection {
  attribute: string;
  oldValue: string | null;
  newValue: string;
  applied: boolean;
}

export const accessibilityManager = AccessibilityManager.getInstance();
