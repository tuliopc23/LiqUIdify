// Accessibility testing utilities for glass components

export interface AccessibilityCheckResult {
  element: string;
  issues: AccessibilityIssue[];
  score: number; // 0-100
}

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  element?: string;
}

export class AccessibilityChecker {
  private issues: AccessibilityIssue[] = [];

  checkElement(
    element: HTMLElement,
    componentName: string
  ): AccessibilityCheckResult {
    this.issues = [];

    // Check ARIA attributes
    this.checkAriaAttributes(element);

    // Check keyboard navigation
    this.checkKeyboardAccess(element);

    // Check color contrast (basic check)
    this.checkColorContrast(element);

    // Check focus management
    this.checkFocusManagement(element);

    // Check semantic markup
    this.checkSemanticMarkup(element);

    // Calculate score
    const errorCount = this.issues.filter(i => i.type === 'error').length;
    const warningCount = this.issues.filter(i => i.type === 'warning').length;
    const score = Math.max(0, 100 - errorCount * 15 - warningCount * 5);

    return {
      element: componentName,
      issues: [...this.issues],
      score,
    };
  }

  private checkAriaAttributes(element: HTMLElement): void {
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledBy = element.getAttribute('aria-labelledby');

    // Check for interactive elements without accessible names
    const interactiveElements = [
      'button',
      'link',
      'input',
      'select',
      'textarea',
    ];
    const tagName = element.tagName.toLowerCase();

    if (interactiveElements.includes(tagName) || role) {
      if (!ariaLabel && !ariaLabelledBy && !element.textContent?.trim()) {
        this.issues.push({
          type: 'error',
          rule: 'accessible-name',
          message: 'Interactive element must have an accessible name',
          element: tagName,
        });
      }
    }

    // Check for disabled elements
    if (
      element.hasAttribute('disabled') &&
      !element.hasAttribute('aria-disabled')
    ) {
      this.issues.push({
        type: 'warning',
        rule: 'aria-disabled',
        message: 'Consider using aria-disabled alongside disabled attribute',
        element: tagName,
      });
    }

    // Check for loading states
    if (
      element.querySelector('[class*="loading"]') &&
      !element.hasAttribute('aria-busy')
    ) {
      this.issues.push({
        type: 'warning',
        rule: 'aria-busy',
        message: 'Loading states should include aria-busy attribute',
        element: tagName,
      });
    }
  }

  private checkKeyboardAccess(element: HTMLElement): void {
    const tabIndex = element.getAttribute('tabindex');
    const isInteractive = this.isInteractiveElement(element);

    if (isInteractive) {
      // Check if focusable
      if (tabIndex === '-1' && !element.hasAttribute('disabled')) {
        this.issues.push({
          type: 'error',
          rule: 'keyboard-access',
          message: 'Interactive element should be focusable',
          element: element.tagName.toLowerCase(),
        });
      }

      // Check focus indicator
      const computedStyle = window.getComputedStyle(element, ':focus');
      const outline = computedStyle.outline;
      const boxShadow = computedStyle.boxShadow;

      if (outline === 'none' && boxShadow === 'none') {
        this.issues.push({
          type: 'warning',
          rule: 'focus-indicator',
          message: 'Interactive element should have visible focus indicator',
          element: element.tagName.toLowerCase(),
        });
      }
    }
  }

  private checkColorContrast(element: HTMLElement): void {
    const style = window.getComputedStyle(element);

    // Basic check - warn if using very low opacity
    if (style.opacity && parseFloat(style.opacity) < 0.6) {
      this.issues.push({
        type: 'warning',
        rule: 'color-contrast',
        message: 'Low opacity may cause contrast issues',
        element: element.tagName.toLowerCase(),
      });
    }

    // Check for glass effects that might reduce contrast
    if (style.backdropFilter && style.backdropFilter !== 'none') {
      this.issues.push({
        type: 'info',
        rule: 'glass-contrast',
        message: 'Verify text contrast with glass background effects',
        element: element.tagName.toLowerCase(),
      });
    }
  }

  private checkFocusManagement(element: HTMLElement): void {
    // Check for modal/dialog focus trapping
    if (
      element.getAttribute('role') === 'dialog' ||
      element.hasAttribute('data-modal')
    ) {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        this.issues.push({
          type: 'error',
          rule: 'focus-management',
          message: 'Modal should contain at least one focusable element',
          element: 'dialog',
        });
      }
    }
  }

  private checkSemanticMarkup(element: HTMLElement): void {
    const tagName = element.tagName.toLowerCase();

    // Check for generic div/span usage that should be semantic
    if (tagName === 'div' && this.isInteractiveElement(element)) {
      this.issues.push({
        type: 'warning',
        rule: 'semantic-markup',
        message:
          'Consider using semantic HTML instead of div for interactive elements',
        element: 'div',
      });
    }

    // Check for proper heading hierarchy
    if (tagName.match(/^h[1-6]$/)) {
      const headingLevel = parseInt(tagName.charAt(1));
      const prevHeadings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      );
      const thisIndex = prevHeadings.indexOf(element);

      if (thisIndex > 0) {
        const prevHeading = prevHeadings[thisIndex - 1];
        const prevLevel = parseInt(prevHeading.tagName.charAt(1));

        if (headingLevel > prevLevel + 1) {
          this.issues.push({
            type: 'warning',
            rule: 'heading-hierarchy',
            message: 'Heading levels should not skip levels',
            element: tagName,
          });
        }
      }
    }
  }

  private isInteractiveElement(element: HTMLElement): boolean {
    const interactiveRoles = [
      'button',
      'link',
      'menuitem',
      'tab',
      'checkbox',
      'radio',
      'slider',
      'spinbutton',
      'textbox',
      'combobox',
      'grid',
      'listbox',
      'tree',
    ];

    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');
    const isClickable =
      element.onclick !== null || element.hasAttribute('onclick');
    const hasTabIndex = element.hasAttribute('tabindex');

    return (
      ['button', 'a', 'input', 'select', 'textarea'].includes(tagName) ||
      (role && interactiveRoles.includes(role)) ||
      isClickable ||
      hasTabIndex
    );
  }
}

// Helper function to run accessibility checks in tests
export function runAccessibilityCheck(
  element: HTMLElement,
  componentName: string
): AccessibilityCheckResult {
  const checker = new AccessibilityChecker();
  return checker.checkElement(element, componentName);
}

// Helper to assert accessibility in tests
export function expectAccessible(
  element: HTMLElement,
  componentName: string,
  minScore = 80
): void {
  const result = runAccessibilityCheck(element, componentName);

  if (result.score < minScore) {
    const errors = result.issues.filter(i => i.type === 'error');
    throw new Error(
      `Accessibility score ${result.score} below minimum ${minScore}. Errors: ${errors
        .map(e => e.message)
        .join(', ')}`
    );
  }
}
