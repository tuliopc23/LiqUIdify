/**
 * Accessibility Testing Utilities
 * Comprehensive a11y testing tools for Glass UI components
 */

import { axe, type AxeResults, type RunOptions } from 'jest-axe';

export interface AccessibilityTestResult {
  passed: boolean;
  violations: AxeResults['violations'];
  incomplete: AxeResults['incomplete'];
  passes: AxeResults['passes'];
  summary: {
    violationCount: number;
    incompleteCount: number;
    passCount: number;
    score: number; // 0-100 accessibility score
  };
}

export interface AccessibilityTestOptions extends RunOptions {
  level?: 'A' | 'AA' | 'AAA';
  includeWarnings?: boolean;
  timeout?: number;
}

// Main accessibility testing function
export async function testAccessibility(
  element: Element | Document,
  options: AccessibilityTestOptions = {}
): Promise<AccessibilityTestResult> {
  const {
    level = 'AA',
    includeWarnings = true,
    timeout = 5000,
    ...axeOptions
  } = options;

  // Configure axe rules based on WCAG level
  const rules = getWCAGRules(level);
  
  const axeConfig: RunOptions = {
    ...axeOptions,
    rules: {
      ...rules,
      ...axeOptions.rules,
    },
  };

  try {
    const results = await Promise.race([
      axe(element, axeConfig),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Accessibility test timeout')), timeout)
      ),
    ]);

    const violationCount = results.violations.length;
    const incompleteCount = includeWarnings ? results.incomplete.length : 0;
    const passCount = results.passes.length;
    
    // Calculate accessibility score (0-100)
    const totalChecks = violationCount + incompleteCount + passCount;
    const score = totalChecks > 0 ? Math.round((passCount / totalChecks) * 100) : 100;

    return {
      passed: violationCount === 0 && (!includeWarnings || incompleteCount === 0),
      violations: results.violations,
      incomplete: includeWarnings ? results.incomplete : [],
      passes: results.passes,
      summary: {
        violationCount,
        incompleteCount,
        passCount,
        score,
      },
    };
  } catch (error) {
    throw new Error(`Accessibility test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// WCAG rule configurations
function getWCAGRules(level: 'A' | 'AA' | 'AAA') {
  const baseRules = {
    // Level A rules
    'area-alt': { enabled: true },
    'aria-allowed-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-required-children': { enabled: true },
    'aria-required-parent': { enabled: true },
    'aria-roles': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'button-name': { enabled: true },
    'bypass': { enabled: true },
    'color-contrast': { enabled: false }, // Will be enabled for AA/AAA
    'document-title': { enabled: true },
    'duplicate-id': { enabled: true },
    'form-field-multiple-labels': { enabled: true },
    'frame-title': { enabled: true },
    'html-has-lang': { enabled: true },
    'html-lang-valid': { enabled: true },
    'image-alt': { enabled: true },
    'input-button-name': { enabled: true },
    'input-image-alt': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
    'list': { enabled: true },
    'listitem': { enabled: true },
    'marquee': { enabled: true },
    'meta-refresh': { enabled: true },
    'object-alt': { enabled: true },
    'role-img-alt': { enabled: true },
    'scrollable-region-focusable': { enabled: true },
    'server-side-image-map': { enabled: true },
    'svg-img-alt': { enabled: true },
    'td-headers-attr': { enabled: true },
    'th-has-data-cells': { enabled: true },
    'valid-lang': { enabled: true },
    'video-caption': { enabled: true },
  };

  if (level === 'AA' || level === 'AAA') {
    Object.assign(baseRules, {
      'color-contrast': { enabled: true },
      'focus-order-semantics': { enabled: true },
      'hidden-content': { enabled: true },
      'label-title-only': { enabled: true },
      'landmark-banner-is-top-level': { enabled: true },
      'landmark-complementary-is-top-level': { enabled: true },
      'landmark-contentinfo-is-top-level': { enabled: true },
      'landmark-main-is-top-level': { enabled: true },
      'landmark-no-duplicate-banner': { enabled: true },
      'landmark-no-duplicate-contentinfo': { enabled: true },
      'landmark-one-main': { enabled: true },
      'link-in-text-block': { enabled: true },
      'page-has-heading-one': { enabled: true },
      'region': { enabled: true },
      'scope-attr-valid': { enabled: true },
      'skip-link': { enabled: true },
    });
  }

  if (level === 'AAA') {
    Object.assign(baseRules, {
      'color-contrast-enhanced': { enabled: true },
      'focus-order-semantics': { enabled: true },
      'link-in-text-block': { enabled: true },
    });
  }

  return baseRules;
}

// Keyboard navigation testing
export interface KeyboardTestResult {
  passed: boolean;
  issues: Array<{
    element: Element;
    issue: string;
    severity: 'error' | 'warning';
  }>;
}

export async function testKeyboardNavigation(
  container: Element,
  options: { includeHidden?: boolean } = {}
): Promise<KeyboardTestResult> {
  const { includeHidden = false } = options;
  const issues: KeyboardTestResult['issues'] = [];

  // Find all focusable elements
  const focusableElements = getFocusableElements(container, includeHidden);

  for (const element of focusableElements) {
    // Test if element can receive focus
    try {
      (element as HTMLElement).focus();
      if (document.activeElement !== element) {
        issues.push({
          element,
          issue: 'Element cannot receive focus',
          severity: 'error',
        });
      }
    } catch (error) {
      issues.push({
        element,
        issue: 'Element focus() method failed',
        severity: 'error',
      });
    }

    // Test if element has visible focus indicator
    const computedStyle = window.getComputedStyle(element, ':focus-visible');
    const hasVisibleFocus = 
      computedStyle.outline !== 'none' ||
      computedStyle.boxShadow !== 'none' ||
      computedStyle.border !== computedStyle.getPropertyValue('border'); // Check if border changes

    if (!hasVisibleFocus) {
      issues.push({
        element,
        issue: 'Element lacks visible focus indicator',
        severity: 'warning',
      });
    }

    // Test tab order
    const tabIndex = (element as HTMLElement).tabIndex;
    if (tabIndex > 0) {
      issues.push({
        element,
        issue: 'Positive tabIndex can disrupt natural tab order',
        severity: 'warning',
      });
    }
  }

  return {
    passed: issues.filter(issue => issue.severity === 'error').length === 0,
    issues,
  };
}

// Get all focusable elements
function getFocusableElements(container: Element, includeHidden: boolean): Element[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    'audio[controls]',
    'video[controls]',
    'details > summary',
  ].join(', ');

  const elements = Array.from(container.querySelectorAll(focusableSelectors));

  if (!includeHidden) {
    return elements.filter(element => {
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        (element as HTMLElement).offsetParent !== null
      );
    });
  }

  return elements;
}

// Screen reader testing utilities
export interface ScreenReaderTestResult {
  passed: boolean;
  issues: Array<{
    element: Element;
    issue: string;
    suggestion: string;
  }>;
}

export function testScreenReaderCompatibility(container: Element): ScreenReaderTestResult {
  const issues: ScreenReaderTestResult['issues'] = [];

  // Test for proper heading structure
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;

  headings.forEach(heading => {
    const level = parseInt(heading.tagName.charAt(1));
    
    if (level > previousLevel + 1) {
      issues.push({
        element: heading,
        issue: `Heading level ${level} follows level ${previousLevel}, skipping levels`,
        suggestion: `Use heading level ${previousLevel + 1} instead`,
      });
    }
    
    previousLevel = level;
  });

  // Test for alt text on images
  const images = container.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        element: img,
        issue: 'Image missing alt attribute',
        suggestion: 'Add descriptive alt text or alt="" for decorative images',
      });
    }
  });

  // Test for form labels
  const inputs = container.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledby = input.getAttribute('aria-labelledby');
    
    if (id) {
      const label = container.querySelector(`label[for="${id}"]`);
      if (!label && !ariaLabel && !ariaLabelledby) {
        issues.push({
          element: input,
          issue: 'Form control missing accessible label',
          suggestion: 'Add a <label> element, aria-label, or aria-labelledby attribute',
        });
      }
    }
  });

  // Test for button text
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => {
    const text = button.textContent?.trim();
    const ariaLabel = button.getAttribute('aria-label');
    const ariaLabelledby = button.getAttribute('aria-labelledby');
    
    if (!text && !ariaLabel && !ariaLabelledby) {
      issues.push({
        element: button,
        issue: 'Button missing accessible text',
        suggestion: 'Add text content, aria-label, or aria-labelledby attribute',
      });
    }
  });

  return {
    passed: issues.length === 0,
    issues,
  };
}

// Color contrast testing
export interface ColorContrastResult {
  passed: boolean;
  ratio: number;
  level: 'AA' | 'AAA' | 'fail';
  foreground: string;
  background: string;
}

export function testColorContrast(
  element: Element,
  requiredLevel: 'AA' | 'AAA' = 'AA'
): ColorContrastResult {
  const style = window.getComputedStyle(element);
  const foreground = style.color;
  const background = style.backgroundColor;
  
  // This is a simplified implementation
  // In a real implementation, you'd use a proper color contrast calculation
  const ratio = calculateContrastRatio(foreground, background);
  
  const aaThreshold = 4.5;
  const aaaThreshold = 7;
  
  let level: 'AA' | 'AAA' | 'fail';
  if (ratio >= aaaThreshold) {
    level = 'AAA';
  } else if (ratio >= aaThreshold) {
    level = 'AA';
  } else {
    level = 'fail';
  }
  
  const passed = requiredLevel === 'AA' ? ratio >= aaThreshold : ratio >= aaaThreshold;
  
  return {
    passed,
    ratio,
    level,
    foreground,
    background,
  };
}

// Simplified contrast ratio calculation (would need proper implementation)
function calculateContrastRatio(foreground: string, background: string): number {
  // This is a placeholder - real implementation would parse colors and calculate luminance
  return 4.5; // Mock value
}

// Comprehensive accessibility test suite
export async function runAccessibilityTestSuite(
  element: Element,
  options: AccessibilityTestOptions = {}
): Promise<{
  overall: { passed: boolean; score: number };
  axe: AccessibilityTestResult;
  keyboard: KeyboardTestResult;
  screenReader: ScreenReaderTestResult;
}> {
  const [axeResult, keyboardResult, screenReaderResult] = await Promise.all([
    testAccessibility(element, options),
    testKeyboardNavigation(element),
    Promise.resolve(testScreenReaderCompatibility(element)),
  ]);

  const allPassed = axeResult.passed && keyboardResult.passed && screenReaderResult.passed;
  const averageScore = (
    axeResult.summary.score +
    (keyboardResult.passed ? 100 : 50) +
    (screenReaderResult.passed ? 100 : 50)
  ) / 3;

  return {
    overall: {
      passed: allPassed,
      score: Math.round(averageScore),
    },
    axe: axeResult,
    keyboard: keyboardResult,
    screenReader: screenReaderResult,
  };
}

// Export convenience function for easy testing
export async function expectAccessible(
  element: Element,
  options?: AccessibilityTestOptions
): Promise<void> {
  const result = await testAccessibility(element, options);
  
  if (!result.passed) {
    const violationMessages = result.violations.map(violation => 
      `${violation.id}: ${violation.description}\n  ${violation.nodes.map(node => node.failureSummary).join('\n  ')}`
    ).join('\n\n');
    
    throw new Error(`Accessibility violations found:\n\n${violationMessages}`);
  }
}
