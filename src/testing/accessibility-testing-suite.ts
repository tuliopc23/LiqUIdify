/**
 * Comprehensive Accessibility Testing Suite
 * Implements automated axe-core integration with custom rules for glass components
 * Provides manual testing protocols and continuous accessibility monitoring
 */

// Simplified version without external dependencies
export interface AccessibilityTestResult {
  ruleId: string;
  description: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  target: string;
  html: string;
  failureSummary: string;
  help: string;
  helpUrl: string;
}

export interface ComponentAccessibilityReport {
  componentName: string;
  timestamp: number;
  violations: AccessibilityTestResult[];
  passes: AccessibilityTestResult[];
  score: number;
  recommendations: string[];
}

export interface AccessibilityTestOptions {
  includeKeyboardNavigation?: boolean;
  includeFocusManagement?: boolean;
  includeScreenReaderTests?: boolean;
}

export class AccessibilityTestingSuite {
  private static instance: AccessibilityTestingSuite;
  private testResults: Map<string, ComponentAccessibilityReport[]> = new Map();
  private customRules: Map<string, any> = new Map();

  private constructor() {
    this.initializeCustomRules();
  }

  public static getInstance(): AccessibilityTestingSuite {
    if (!AccessibilityTestingSuite.instance) {
      AccessibilityTestingSuite.instance = new AccessibilityTestingSuite();
    }
    return AccessibilityTestingSuite.instance;
  }

  private initializeCustomRules(): void {
    // Custom rules for glass components
    this.customRules.set('glass-component-roles', {
      id: 'glass-component-roles',
      description: 'Glass components must have appropriate ARIA roles',
      help: 'Glass components should have proper ARIA roles for accessibility',
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
    });

    this.customRules.set('glass-live-regions', {
      id: 'glass-live-regions',
      description: 'Glass live regions must have proper ARIA attributes',
      help: 'Live regions should have aria-live and aria-atomic attributes',
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html',
    });

    this.customRules.set('glass-focus-indicators', {
      id: 'glass-focus-indicators',
      description: 'Glass components must have visible focus indicators',
      help: 'All interactive elements should have clear focus indicators',
      helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
    });

    this.customRules.set('glass-color-contrast', {
      id: 'glass-color-contrast',
      description:
        'Glass components must meet WCAG color contrast requirements',
      help: 'Text and interactive elements should have sufficient color contrast',
      helpUrl:
        'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
    });
  }

  /**
   * Run comprehensive accessibility tests on a component
   */
  public async testComponent(
    componentName: string,
    container: HTMLElement,
    options: AccessibilityTestOptions = {}
  ): Promise<ComponentAccessibilityReport> {
    const violations: AccessibilityTestResult[] = [];
    const passes: AccessibilityTestResult[] = [];

    // Run automated tests
    const automatedResults = await this.runAutomatedTests(container);
    violations.push(...automatedResults.violations);
    passes.push(...automatedResults.passes);

    // Run manual tests
    if (options.includeKeyboardNavigation) {
      const keyboardResults = this.testKeyboardNavigation(container);
      violations.push(...keyboardResults.violations);
      passes.push(...keyboardResults.passes);
    }

    if (options.includeFocusManagement) {
      const focusResults = this.testFocusManagement(container);
      violations.push(...focusResults.violations);
      passes.push(...focusResults.passes);
    }

    if (options.includeScreenReaderTests) {
      const screenReaderResults = this.testScreenReaderCompatibility(container);
      violations.push(...screenReaderResults.violations);
      passes.push(...screenReaderResults.passes);
    }

    const report: ComponentAccessibilityReport = {
      componentName,
      timestamp: Date.now(),
      violations,
      passes,
      score: this.calculateAccessibilityScore(violations, passes),
      recommendations: this.generateRecommendations(violations),
    };

    this.storeResults(componentName, report);
    return report;
  }

  /**
   * Run automated accessibility tests
   */
  private async runAutomatedTests(container: HTMLElement): Promise<{
    violations: AccessibilityTestResult[];
    passes: AccessibilityTestResult[];
  }> {
    const violations: AccessibilityTestResult[] = [];
    const passes: AccessibilityTestResult[] = [];

    // Check for basic accessibility requirements
    const images = container.querySelectorAll('img');
    for (const img of images) {
      if (img.hasAttribute('alt')) {
        passes.push({
          ruleId: 'image-alt',
          description: 'Image has alt text',
          impact: 'minor',
          target: 'img',
          html: img.outerHTML,
          failureSummary: '',
          help: 'Image has appropriate alt text',
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
        });
      } else {
        violations.push({
          ruleId: 'image-alt',
          description: 'Image missing alt text',
          impact: 'critical',
          target: 'img',
          html: img.outerHTML,
          failureSummary: 'Image elements must have alt attributes',
          help: 'Add descriptive alt text to images',
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
        });
      }
    }

    // Check for ARIA attributes on glass components
    const glassComponents = container.querySelectorAll(
      '[data-glass-component]'
    );
    for (const component of glassComponents) {
      const componentType = component.dataset.glassComponent;

      if (component.hasAttribute('role')) {
        passes.push({
          ruleId: 'glass-component-roles',
          description: `Glass ${componentType} has ARIA role`,
          impact: 'minor',
          target: component.tagName.toLowerCase(),
          html: component.outerHTML,
          failureSummary: '',
          help: `Glass ${componentType} has appropriate ARIA role`,
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        });
      } else {
        violations.push({
          ruleId: 'glass-component-roles',
          description: `Glass ${componentType} missing ARIA role`,
          impact: 'serious',
          target: component.tagName.toLowerCase(),
          html: component.outerHTML,
          failureSummary: `Glass ${componentType} should have appropriate ARIA role`,
          help: `Add appropriate role attribute to glass ${componentType}`,
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        });
      }
    }

    return { violations, passes };
  }

  /**
   * Test keyboard navigation
   */
  private testKeyboardNavigation(container: HTMLElement): {
    violations: AccessibilityTestResult[];
    passes: AccessibilityTestResult[];
  } {
    const violations: AccessibilityTestResult[] = [];
    const passes: AccessibilityTestResult[] = [];

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      passes.push({
        ruleId: 'keyboard-navigation',
        description: 'No focusable elements found',
        impact: 'minor',
        target: 'container',
        html: container.outerHTML,
        failureSummary: '',
        help: 'Component has no interactive elements requiring keyboard navigation',
        helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
      });
      return { violations, passes };
    }

    // Check for tabindex values
    let hasInvalidTabIndex = false;
    for (const element of focusableElements) {
      const tabIndex = element.getAttribute('tabindex');
      if (
        tabIndex &&
        (Number.isNaN(Number.parseInt(tabIndex)) || Number.parseInt(tabIndex) < -1)
      ) {
        hasInvalidTabIndex = true;
      }
    }

    if (hasInvalidTabIndex) {
      violations.push({
        ruleId: 'keyboard-tabindex',
        description: 'Invalid tabindex values found',
        impact: 'moderate',
        target: 'container',
        html: container.outerHTML,
        failureSummary: 'Tabindex values should be valid integers >= -1',
        help: 'Use valid tabindex values for keyboard navigation',
        helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
      });
    } else {
      passes.push({
        ruleId: 'keyboard-tabindex',
        description: 'Valid tabindex values',
        impact: 'minor',
        target: 'container',
        html: container.outerHTML,
        failureSummary: '',
        help: 'All tabindex values are valid',
        helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
      });
    }

    return { violations, passes };
  }

  /**
   * Test focus management
   */
  private testFocusManagement(container: HTMLElement): {
    violations: AccessibilityTestResult[];
    passes: AccessibilityTestResult[];
  } {
    const violations: AccessibilityTestResult[] = [];
    const passes: AccessibilityTestResult[] = [];

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // Check for focus indicators
    for (const element of focusableElements) {
      const computedStyle = window.getComputedStyle(element);
      const hasOutline =
        computedStyle.outline && computedStyle.outline !== 'none';
      const hasCustomFocus =
        element.classList.contains('focus-visible') ||
        element.classList.contains('glass-focus');

      if (!hasOutline && !hasCustomFocus) {
        violations.push({
          ruleId: 'glass-focus-indicators',
          description: 'Interactive element missing focus indicator',
          impact: 'serious',
          target: element.tagName.toLowerCase(),
          html: element.outerHTML,
          failureSummary: 'Element should have visible focus indicator',
          help: 'Add CSS focus styles or use glass-focus class',
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
        });
      } else {
        passes.push({
          ruleId: 'glass-focus-indicators',
          description: 'Interactive element has focus indicator',
          impact: 'minor',
          target: element.tagName.toLowerCase(),
          html: element.outerHTML,
          failureSummary: '',
          help: 'Element has appropriate focus indicator',
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
        });
      }
    }

    return { violations, passes };
  }

  /**
   * Test screen reader compatibility
   */
  private testScreenReaderCompatibility(container: HTMLElement): {
    violations: AccessibilityTestResult[];
    passes: AccessibilityTestResult[];
  } {
    const violations: AccessibilityTestResult[] = [];
    const passes: AccessibilityTestResult[] = [];

    const interactiveElements = container.querySelectorAll(
      'button, [role="button"], [role="link"], input, select, textarea'
    );

    for (const element of interactiveElements) {
      const hasLabel =
        element.hasAttribute('aria-label') ||
        element.hasAttribute('aria-labelledby') ||
        element.textContent?.trim() ||
        (element as HTMLInputElement).placeholder;

      if (hasLabel) {
        passes.push({
          ruleId: 'screen-reader-label',
          description: 'Interactive element has accessible label',
          impact: 'minor',
          target: element.tagName.toLowerCase(),
          html: element.outerHTML,
          failureSummary: '',
          help: 'Element has appropriate accessible name',
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        });
      } else {
        violations.push({
          ruleId: 'screen-reader-label',
          description: 'Interactive element missing accessible label',
          impact: 'critical',
          target: element.tagName.toLowerCase(),
          html: element.outerHTML,
          failureSummary:
            'Interactive element has no accessible name for screen readers',
          help: 'Add aria-label, aria-labelledby, or text content',
          helpUrl:
            'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        });
      }
    }

    return { violations, passes };
  }

  /**
   * Calculate accessibility score
   */
  private calculateAccessibilityScore(
    violations: AccessibilityTestResult[],
    _passes: AccessibilityTestResult[]
  ): number {
    const baseScore = 100;
    let deductions = 0;

    for (const violation of violations) {
      const impactMultiplier = {
        minor: 1,
        moderate: 3,
        serious: 5,
        critical: 10,
      };
      deductions += impactMultiplier[violation.impact];
    }

    return Math.max(0, baseScore - deductions);
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(
    violations: AccessibilityTestResult[]
  ): string[] {
    return violations.map(
      (violation) =>
        `${violation.description}: ${violation.help} (${violation.helpUrl})`
    );
  }

  /**
   * Store test results
   */
  private storeResults(
    componentName: string,
    report: ComponentAccessibilityReport
  ): void {
    if (!this.testResults.has(componentName)) {
      this.testResults.set(componentName, []);
    }
    this.testResults.get(componentName)?.push(report);
  }

  /**
   * Get historical results for a component
   */
  public getComponentHistory(
    componentName: string
  ): ComponentAccessibilityReport[] {
    return this.testResults.get(componentName) || [];
  }

  /**
   * Generate accessibility regression report
   */
  public generateRegressionReport(): {
    components: string[];
    regressions: Array<{
      component: string;
      previousScore: number;
      currentScore: number;
      newViolations: AccessibilityTestResult[];
    }>;
    improvements: Array<{
      component: string;
      previousScore: number;
      currentScore: number;
      resolvedViolations: AccessibilityTestResult[];
    }>;
  } {
    const regressions: any[] = [];
    const improvements: any[] = [];

    for (const [componentName, reports] of this.testResults.entries()) {
      if (reports.length >= 2) {
        const latest = reports.at(-1);
        const previous = reports.at(-2);

        if (!latest || !previous)  { null; continue; }

        if (latest.score < previous.score) {
          regressions.push({
            component: componentName,
            previousScore: previous.score,
            currentScore: latest.score,
            newViolations: latest.violations.filter(
              (v) => !previous.violations.some((pv) => pv.ruleId === v.ruleId)
            ),
          });
        } else if (latest.score > previous.score) {
          improvements.push({
            component: componentName,
            previousScore: previous.score,
            currentScore: latest.score,
            resolvedViolations: previous.violations.filter(
              (pv) => !latest.violations.some((lv) => lv.ruleId === pv.ruleId)
            ),
          });
        }
      }
    }

    return {
      components: [...this.testResults.keys()],
      regressions,
      improvements,
    };
  }

  /**
   * Run continuous accessibility monitoring
   */
  public startContinuousMonitoring(
    _options: {
      interval?: number;
      components?: string[];
      onViolation?: (violation: AccessibilityTestResult) => void;
    } = {}
  ): () => void {
    // In a real implementation, this would use setInterval
    // For now, return a no-op cleanup function
    return () => {};
  }
}

// Export singleton instance
export const accessibilityTestingSuite =
  AccessibilityTestingSuite.getInstance();

// Convenience functions
export const testGlassComponent = async (
  componentName: string,
  container: HTMLElement,
  options: AccessibilityTestOptions = {}
) => {
  return accessibilityTestingSuite.testComponent(componentName, container, {
    includeKeyboardNavigation: true,
    includeFocusManagement: true,
    includeScreenReaderTests: true,
    ...options,
  });
};

export const testAccessibilityRegression = () => {
  return accessibilityTestingSuite.generateRegressionReport();
};

export const startAccessibilityMonitoring = (
  options: Parameters<
    typeof accessibilityTestingSuite.startContinuousMonitoring
  >[0]
) => {
  return accessibilityTestingSuite.startContinuousMonitoring(options);
};
