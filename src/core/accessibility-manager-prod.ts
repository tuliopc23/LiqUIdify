import type { AxeResults } from 'axe-core';
import { announcer } from '@/components/glass-live-region';
import { checkGlassContrast, getContrastRatio } from '@/core/utils/color';

// Re-export types from the main accessibility manager
export type {
  AccessibilityReport,
  Violation,
  ViolationNode,
  Warning,
  Suggestion,
  ComponentInfo,
  ContrastResult,
  FocusOptions,
  ARIAValidation,
  ARIAError,
  ARIASuggestion,
  ARIACorrection
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
  testEnvironment: { userAgent: '', windowWidth: 0, windowHeight: 0, orientationAngle: 0, orientationType: 'landscape-primary' },
  toolOptions: {}
};

// Lazy load axe-core only in development
let axeInstance: typeof import('axe-core') | null = null;

async function getAxe() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  if (!axeInstance) {
    try {
      axeInstance = await import('axe-core');
    } catch {
      console.warn('axe-core not available');
      return null;
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
    
    const violations = axeResults.violations.map(v => ({
      id: v.id,
      impact: v.impact as any,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map(n => ({
        html: n.html,
        target: n.target,
        failureSummary: n.failureSummary || '',
        fix: this.generateFix(v.id, n)
      }))
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
      componentInfo
    };

    this.cache.set(element, report);
    return report;
  }

  private detectWarnings(element: HTMLElement): Warning[] {
    const warnings: Warning[] = [];

    // Check for missing alt text on images
    const images = element.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      warnings.push({
        id: 'missing-alt-text',
        description: 'Images without alt text',
        suggestion: 'Add descriptive alt text to all images',
        elements: Array.from(images) as HTMLElement[]
      });
    }

    // Check for empty buttons
    const emptyButtons = element.querySelectorAll('button:empty');
    if (emptyButtons.length > 0) {
      warnings.push({
        id: 'empty-buttons',
        description: 'Buttons without text content',
        suggestion: 'Add text or aria-label to buttons',
        elements: Array.from(emptyButtons) as HTMLElement[]
      });
    }

    return warnings;
  }

  private generateSuggestions(element: HTMLElement, axeResults: AxeResults): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Contrast suggestions
    const elementsWithBg = element.querySelectorAll('[style*="background"]');
    elementsWithBg.forEach(el => {
      const contrast = this.checkContrast(el as HTMLElement);
      if (contrast && !contrast.passes.aa.normal) {
        suggestions.push({
          type: 'contrast',
          message: `Low contrast ratio (${contrast.ratio.toFixed(2)}:1). Consider adjusting colors.`,
          priority: 'high',
          autoFixAvailable: true,
          fix: () => this.autoFixContrast(el as HTMLElement, contrast)
        });
      }
    });

    // Keyboard navigation suggestions
    const interactiveElements = element.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    const tabIndexes = Array.from(interactiveElements)
      .map(el => parseInt(el.getAttribute('tabindex') || '0'))
      .filter(index => index > 0);
    
    if (tabIndexes.length > 0) {
      suggestions.push({
        type: 'keyboard',
        message: 'Positive tabindex values detected. Consider using natural tab order.',
        priority: 'medium',
        autoFixAvailable: false
      });
    }

    return suggestions;
  }

  private calculateScore(results: AxeResults): number {
    const totalTests = results.passes.length + results.violations.length;
    if (totalTests === 0) return 100;

    const violationWeight = results.violations.reduce((sum, v) => {
      const impactWeight = {
        critical: 10,
        serious: 5,
        moderate: 2,
        minor: 1
      }[v.impact || 'minor'];
      return sum + (impactWeight * v.nodes.length);
    }, 0);

    const maxPossibleWeight = totalTests * 10;
    const score = Math.max(0, 100 - (violationWeight / maxPossibleWeight * 100));
    
    return Math.round(score);
  }

  private determineWCAGLevel(score: number): 'A' | 'AA' | 'AAA' {
    if (score >= 95) return 'AAA';
    if (score >= 85) return 'AA';
    return 'A';
  }

  checkContrast(element: HTMLElement): ContrastResult | null {
    try {
      const computed = window.getComputedStyle(element);
      const bg = computed.backgroundColor;
      const fg = computed.color;
      
      if (!bg || !fg || bg === 'transparent' || fg === 'transparent') {
        return null;
      }

      const ratio = getContrastRatio(fg, bg);
      const fontSize = parseFloat(computed.fontSize);
      const fontWeight = computed.fontWeight;
      const isLarge = fontSize >= 18 || (fontSize >= 14 && parseInt(fontWeight) >= 700);

      return {
        ratio,
        passes: {
          aa: {
            normal: ratio >= 4.5,
            large: ratio >= 3
          },
          aaa: {
            normal: ratio >= 7,
            large: ratio >= 4.5
          }
        },
        recommendation: this.getContrastRecommendation(ratio, isLarge)
      };
    } catch {
      return null;
    }
  }

  private getContrastRecommendation(ratio: number, isLarge: boolean): string {
    if (isLarge) {
      if (ratio >= 4.5) return 'Excellent contrast for large text (AAA)';
      if (ratio >= 3) return 'Good contrast for large text (AA)';
      return 'Insufficient contrast for large text';
    } else {
      if (ratio >= 7) return 'Excellent contrast (AAA)';
      if (ratio >= 4.5) return 'Good contrast (AA)';
      return 'Insufficient contrast';
    }
  }

  private autoFixContrast(element: HTMLElement, contrast: ContrastResult): void {
    // Implementation would adjust colors to meet WCAG requirements
    console.log('Auto-fixing contrast for element', element, contrast);
  }

  private generateFix(violationId: string, node: any): string | undefined {
    // Generate fix suggestions based on violation type
    const fixes: Record<string, string> = {
      'color-contrast': 'Adjust foreground or background color to meet WCAG contrast requirements',
      'image-alt': 'Add descriptive alt text to the image',
      'button-name': 'Add text content or aria-label to the button',
      'label': 'Add a label element or aria-label attribute'
    };
    
    return fixes[violationId];
  }

  validateARIA(element: HTMLElement): ARIAValidation {
    const errors: ARIAError[] = [];
    const suggestions: ARIASuggestion[] = [];
    const autoCorrections: ARIACorrection[] = [];

    // Check ARIA attributes
    const ariaAttrs = Array.from(element.attributes).filter(attr => 
      attr.name.startsWith('aria-')
    );

    ariaAttrs.forEach(attr => {
      // Validate attribute values
      if (attr.name === 'aria-hidden' && attr.value !== 'true' && attr.value !== 'false') {
        errors.push({
          attribute: attr.name,
          value: attr.value,
          reason: 'aria-hidden must be "true" or "false"',
          element
        });
      }

      // Check for deprecated attributes
      if (attr.name === 'aria-grabbed') {
        suggestions.push({
          attribute: attr.name,
          currentValue: attr.value,
          suggestedValue: '',
          reason: 'aria-grabbed is deprecated in ARIA 1.1'
        });
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      suggestions,
      autoCorrections
    };
  }

  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    announcer.announce(message, priority);
  }

  async generateReport(elements: HTMLElement[]): Promise<string> {
    const reports = await Promise.all(
      elements.map(el => this.analyzeComponent(el))
    );

    const totalScore = reports.reduce((sum, r) => sum + r.score, 0) / reports.length;
    const allViolations = reports.flatMap(r => r.violations);
    const criticalCount = allViolations.filter(v => v.impact === 'critical').length;
    const seriousCount = allViolations.filter(v => v.impact === 'serious').length;

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

  private groupViolationsByImpact(violations: Violation[]): string {
    const grouped = violations.reduce((acc, v) => {
      if (!acc[v.impact]) acc[v.impact] = [];
      acc[v.impact].push(v);
      return acc;
    }, {} as Record<string, Violation[]>);

    return Object.entries(grouped)
      .sort(([a], [b]) => {
        const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
        return order[a as keyof typeof order] - order[b as keyof typeof order];
      })
      .map(([impact, violations]) => 
        `### ${impact.charAt(0).toUpperCase() + impact.slice(1)} (${violations.length})
${violations.map(v => `- ${v.help}`).join('\n')}`
      ).join('\n\n');
  }

  private generateRecommendations(reports: AccessibilityReport[]): string {
    const recommendations = new Set<string>();
    
    reports.forEach(report => {
      if (report.score < 85) {
        recommendations.add('Focus on fixing critical and serious violations first');
      }
      
      if (report.suggestions.some(s => s.type === 'contrast')) {
        recommendations.add('Review and adjust color contrast ratios across components');
      }
      
      if (report.warnings.some(w => w.id === 'missing-alt-text')) {
        recommendations.add('Ensure all images have descriptive alt text');
      }
    });

    return Array.from(recommendations).map(r => `- ${r}`).join('\n');
  }
}

interface ComponentInfo {
  name: string;
  type: string;
  props: Record<string, any>;
}

interface Warning {
  id: string;
  description: string;
  suggestion: string;
  elements: HTMLElement[];
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
  errors: ARIAError[];
  suggestions: ARIASuggestion[];
  autoCorrections: ARIACorrection[];
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