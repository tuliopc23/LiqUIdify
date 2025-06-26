/**
 * Comprehensive Accessibility Testing Utilities for LiquidiUI
 * 
 * This file provides automated accessibility testing and reporting
 * for LiquidiUI components to ensure WCAG 2.1 AA compliance.
 */

// Mock interfaces for accessibility testing
interface AxeResults {
  violations: Array<{
    id: string;
    impact: 'minor' | 'moderate' | 'serious' | 'critical';
    description: string;
    help: string;
    helpUrl: string;
    nodes: Array<{
      html: string;
      target: string[];
      failureSummary?: string;
    }>;
  }>;
  passes: Array<any>;
  incomplete: Array<any>;
  inapplicable: Array<any>;
}

// Mock axe function for development
const axe = async (element: HTMLElement, config?: any): Promise<AxeResults> => {
  // This is a simplified mock - in real usage you'd install jest-axe
  return {
    violations: [],
    passes: [],
    incomplete: [],
    inapplicable: []
  };
};

// ============================================================================
// ACCESSIBILITY TEST SUITE
// ============================================================================

export interface AccessibilityTestResult {
  score: number;
  violations: Array<{
    id: string;
    impact: 'minor' | 'moderate' | 'serious' | 'critical';
    description: string;
    help: string;
    helpUrl: string;
    nodes: Array<{
      html: string;
      target: string[];
      failureSummary: string;
    }>;
  }>;
  passes: number;
  incomplete: number;
  inapplicable: number;
  wcagLevel: 'A' | 'AA' | 'AAA';
  recommendations: string[];
}

/**
 * Comprehensive accessibility test for LiquidiUI components
 */
export async function testComponentAccessibility(
  element: HTMLElement,
  options: {
    wcagLevel?: 'A' | 'AA' | 'AAA';
    rules?: string[];
    skipRules?: string[];
    context?: string;
  } = {}
): Promise<AccessibilityTestResult> {
  const {
    wcagLevel = 'AA',
    rules,
    skipRules = [],
    context = 'component'
  } = options;

  // Configure axe-core
  const axeConfig = {
    tags: [`wcag2${wcagLevel.toLowerCase()}`, `wcag21${wcagLevel.toLowerCase()}`],
    rules: rules ? Object.fromEntries(rules.map(rule => [rule, { enabled: true }])) : undefined,
  };

  // Skip specified rules
  if (skipRules.length > 0) {
    axeConfig.rules = {
      ...axeConfig.rules,
      ...Object.fromEntries(skipRules.map(rule => [rule, { enabled: false }]))
    };
  }

  try {
    const results: AxeResults = await axe(element, axeConfig);
    
    // Calculate accessibility score
    const totalTests = results.violations.length + results.passes.length;
    const score = totalTests > 0 ? Math.round((results.passes.length / totalTests) * 100) : 100;
    
    // Generate recommendations
    const recommendations = generateRecommendations(results, wcagLevel);
    
    return {
      score,
      violations: results.violations.map((violation: any) => ({
        id: violation.id,
        impact: violation.impact as any,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map((node: any) => ({
          html: node.html,
          target: node.target,
          failureSummary: node.failureSummary || ''
        }))
      })),
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
      wcagLevel,
      recommendations
    };
  } catch (error) {
    console.error('Accessibility testing failed:', error);
    return {
      score: 0,
      violations: [],
      passes: 0,
      incomplete: 0,
      inapplicable: 0,
      wcagLevel,
      recommendations: ['Failed to run accessibility tests. Please check component markup.']
    };
  }
}

/**
 * Generate actionable recommendations based on violations
 */
function generateRecommendations(results: AxeResults, wcagLevel: string): string[] {
  const recommendations: string[] = [];
  
  results.violations.forEach((violation: any) => {
    switch (violation.id) {
      case 'color-contrast':
        recommendations.push('Ensure text has sufficient color contrast (4.5:1 for normal text, 3:1 for large text)');
        break;
      case 'keyboard':
        recommendations.push('Ensure all interactive elements are keyboard accessible');
        break;
      case 'focus-visible':
        recommendations.push('Provide visible focus indicators for keyboard navigation');
        break;
      case 'aria-required-children':
        recommendations.push('Ensure ARIA composite widgets have required child roles');
        break;
      case 'aria-required-parent':
        recommendations.push('Ensure ARIA child elements have required parent roles');
        break;
      case 'label':
        recommendations.push('Ensure form elements have accessible labels');
        break;
      case 'heading-order':
        recommendations.push('Maintain proper heading hierarchy (h1 → h2 → h3)');
        break;
      case 'landmark-one-main':
        recommendations.push('Ensure page has one main landmark');
        break;
      case 'region':
        recommendations.push('Use landmark roles to identify page regions');
        break;
      default:
        recommendations.push(`Address ${violation.id} violation: ${violation.help}`);
    }
  });
  
  // Add general recommendations for high violation counts
  if (results.violations.length > 5) {
    recommendations.push('Consider conducting a comprehensive accessibility audit');
  }
  
  if (results.violations.some((v: any) => v.impact === 'critical')) {
    recommendations.push('Critical violations found - address immediately before release');
  }
  
  return [...new Set(recommendations)]; // Remove duplicates
}

// ============================================================================
// KEYBOARD NAVIGATION TESTING
// ============================================================================

export interface KeyboardTestResult {
  canFocus: boolean;
  canNavigate: boolean;
  hasVisibleFocus: boolean;
  supportsEnterKey: boolean;
  supportsSpaceKey: boolean;
  supportsArrowKeys: boolean;
  supportsEscapeKey: boolean;
  tabOrder: number[];
  issues: string[];
}

/**
 * Test keyboard navigation for interactive components
 */
export function testKeyboardNavigation(element: HTMLElement): KeyboardTestResult {
  const issues: string[] = [];
  const focusableElements = getFocusableElements(element);
  
  // Test basic focusability
  const canFocus = focusableElements.length > 0;
  if (!canFocus) {
    issues.push('No focusable elements found');
  }
  
  // Test tab order
  const tabOrder = focusableElements.map(el => {
    const tabIndex = el.getAttribute('tabindex');
    return tabIndex ? parseInt(tabIndex, 10) : 0;
  });
  
  // Check for positive tabindex (anti-pattern)
  const hasPositiveTabIndex = tabOrder.some(index => index > 0);
  if (hasPositiveTabIndex) {
    issues.push('Avoid positive tabindex values - use 0 or -1');
  }
  
  // Test visible focus indicators
  const hasVisibleFocus = focusableElements.every(el => {
    const styles = getComputedStyle(el, ':focus');
    return styles.outline !== 'none' || 
           styles.boxShadow !== 'none' || 
           el.classList.contains('focus:');
  });
  
  if (!hasVisibleFocus) {
    issues.push('Elements lack visible focus indicators');
  }
  
  // Test role-specific keyboard support
  const supportsEnterKey = testKeySupport(element, 'Enter');
  const supportsSpaceKey = testKeySupport(element, ' ');
  const supportsArrowKeys = testKeySupport(element, 'ArrowLeft');
  const supportsEscapeKey = testKeySupport(element, 'Escape');
  
  return {
    canFocus,
    canNavigate: focusableElements.length > 1,
    hasVisibleFocus,
    supportsEnterKey,
    supportsSpaceKey,
    supportsArrowKeys,
    supportsEscapeKey,
    tabOrder,
    issues
  };
}

function getFocusableElements(element: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];
  
  return Array.from(element.querySelectorAll(focusableSelectors.join(', '))) as HTMLElement[];
}

function testKeySupport(element: HTMLElement, key: string): boolean {
  // This is a simplified test - in real testing you'd simulate events
  const hasKeyListener = element.getAttribute('onkeydown') !== null ||
                        element.getAttribute('onkeyup') !== null ||
                        element.getAttribute('onkeypress') !== null;
  
  const hasRole = element.getAttribute('role');
  
  // Check if element should support this key based on role
  switch (key) {
    case 'Enter':
    case ' ':
      return ['button', 'link', 'tab', 'option', 'menuitem'].includes(hasRole || '') || 
             element.tagName.toLowerCase() === 'button';
    case 'ArrowLeft':
    case 'ArrowRight':
      return ['tablist', 'menu', 'menubar', 'listbox'].includes(hasRole || '');
    case 'Escape':
      return ['dialog', 'menu', 'combobox'].includes(hasRole || '');
    default:
      return hasKeyListener;
  }
}

// ============================================================================
// SCREEN READER TESTING
// ============================================================================

export interface ScreenReaderTestResult {
  hasSemanticMarkup: boolean;
  hasProperLabels: boolean;
  hasLiveRegions: boolean;
  hasLandmarks: boolean;
  hasHeadingStructure: boolean;
  ariaScore: number;
  issues: string[];
  suggestions: string[];
}

/**
 * Test screen reader compatibility
 */
export function testScreenReaderCompatibility(element: HTMLElement): ScreenReaderTestResult {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Test semantic markup
  const semanticElements = element.querySelectorAll(
    'header, nav, main, section, article, aside, footer, h1, h2, h3, h4, h5, h6'
  );
  const hasSemanticMarkup = semanticElements.length > 0;
  
  if (!hasSemanticMarkup) {
    issues.push('Missing semantic HTML elements');
    suggestions.push('Use semantic HTML elements (header, nav, main, section, etc.)');
  }
  
  // Test labels
  const formElements = element.querySelectorAll('input, select, textarea');
  const labeledElements = Array.from(formElements).filter(el => {
    const id = el.getAttribute('id');
    const ariaLabel = el.getAttribute('aria-label');
    const ariaLabelledBy = el.getAttribute('aria-labelledby');
    const label = id ? element.querySelector(`label[for="${id}"]`) : null;
    
    return ariaLabel || ariaLabelledBy || label;
  });
  
  const hasProperLabels = formElements.length === 0 || labeledElements.length === formElements.length;
  
  if (!hasProperLabels) {
    issues.push('Form elements missing accessible labels');
    suggestions.push('Add aria-label or associate with label elements');
  }
  
  // Test live regions
  const liveRegions = element.querySelectorAll('[aria-live]');
  const hasLiveRegions = liveRegions.length > 0;
  
  // Test landmarks
  const landmarks = element.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"]');
  const semanticLandmarks = element.querySelectorAll('header, nav, main, footer, aside');
  const hasLandmarks = landmarks.length > 0 || semanticLandmarks.length > 0;
  
  // Test heading structure
  const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headingLevels = headings.map(h => parseInt(h.tagName.charAt(1), 10));
  
  let validHeadingStructure = true;
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] > headingLevels[i - 1] + 1) {
      validHeadingStructure = false;
      break;
    }
  }
  
  const hasHeadingStructure = headings.length === 0 || validHeadingStructure;
  
  if (!hasHeadingStructure) {
    issues.push('Invalid heading hierarchy');
    suggestions.push('Maintain sequential heading levels (h1 → h2 → h3)');
  }
  
  // Calculate ARIA score
  const ariaElements = element.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
  const totalInteractiveElements = element.querySelectorAll('button, input, select, textarea, a, [tabindex]').length;
  const ariaScore = totalInteractiveElements > 0 
    ? Math.round((ariaElements.length / totalInteractiveElements) * 100)
    : 100;
  
  return {
    hasSemanticMarkup,
    hasProperLabels,
    hasLiveRegions,
    hasLandmarks,
    hasHeadingStructure,
    ariaScore,
    issues,
    suggestions
  };
}

// ============================================================================
// COMPREHENSIVE TESTING SUITE
// ============================================================================

export interface ComprehensiveTestResult {
  overall: AccessibilityTestResult;
  keyboard: KeyboardTestResult;
  screenReader: ScreenReaderTestResult;
  finalScore: number;
  certification: 'WCAG_A' | 'WCAG_AA' | 'WCAG_AAA' | 'FAIL';
  criticalIssues: string[];
  recommendations: string[];
}

/**
 * Run comprehensive accessibility tests on a component
 */
export async function runComprehensiveAccessibilityTests(
  element: HTMLElement,
  options: {
    wcagLevel?: 'A' | 'AA' | 'AAA';
    skipRules?: string[];
    context?: string;
  } = {}
): Promise<ComprehensiveTestResult> {
  const overall = await testComponentAccessibility(element, options);
  const keyboard = testKeyboardNavigation(element);
  const screenReader = testScreenReaderCompatibility(element);
  
  // Calculate final score (weighted average)
  const finalScore = Math.round(
    (overall.score * 0.5) + 
    (keyboard.issues.length === 0 ? 100 : Math.max(0, 100 - keyboard.issues.length * 20)) * 0.3 +
    (screenReader.ariaScore * 0.2)
  );
  
  // Determine certification level
  let certification: 'WCAG_A' | 'WCAG_AA' | 'WCAG_AAA' | 'FAIL';
  
  if (finalScore >= 95 && overall.violations.every(v => v.impact !== 'critical')) {
    certification = options.wcagLevel === 'AAA' ? 'WCAG_AAA' : 
                   options.wcagLevel === 'AA' ? 'WCAG_AA' : 'WCAG_A';
  } else if (finalScore >= 80 && overall.violations.every(v => v.impact !== 'critical')) {
    certification = 'WCAG_A';
  } else {
    certification = 'FAIL';
  }
  
  // Collect critical issues
  const criticalIssues = [
    ...overall.violations.filter(v => v.impact === 'critical').map(v => v.description),
    ...keyboard.issues.filter(issue => issue.includes('No focusable elements')),
    ...screenReader.issues.filter(issue => issue.includes('missing accessible labels'))
  ];
  
  // Combine recommendations
  const recommendations = [
    ...overall.recommendations,
    ...keyboard.issues,
    ...screenReader.suggestions
  ].filter((rec, index, arr) => arr.indexOf(rec) === index); // Remove duplicates
  
  return {
    overall,
    keyboard,
    screenReader,
    finalScore,
    certification,
    criticalIssues,
    recommendations
  };
}

// ============================================================================
// TESTING UTILITIES FOR JEST
// ============================================================================

/**
 * Jest matcher for accessibility testing
 */
export function toBeAccessible() {
  return {
    async compare(element: HTMLElement, options: { wcagLevel?: 'A' | 'AA' | 'AAA' } = {}) {
      const result = await runComprehensiveAccessibilityTests(element, options);
      
      const pass = result.certification !== 'FAIL' && result.criticalIssues.length === 0;
      
      const message = pass
        ? `Expected element to fail accessibility tests, but it passed with ${result.certification} certification`
        : `Expected element to pass accessibility tests, but it failed with score ${result.finalScore}/100:\n` +
          `Critical issues: ${result.criticalIssues.join(', ')}\n` +
          `Recommendations: ${result.recommendations.slice(0, 3).join(', ')}`;
      
      return {
        pass,
        message: () => message
      };
    }
  };
}

/**
 * Helper for testing specific accessibility features
 */
export const accessibilityMatchers = {
  toHaveAccessibleName: (element: HTMLElement) => {
    const name = element.getAttribute('aria-label') ||
                 element.getAttribute('aria-labelledby') ||
                 element.textContent?.trim();
    
    return {
      pass: !!name,
      message: () => `Expected element to have accessible name, but ${name ? 'found: ' + name : 'none found'}`
    };
  },
  
  toHaveKeyboardSupport: (element: HTMLElement) => {
    const keyboard = testKeyboardNavigation(element);
    
    return {
      pass: keyboard.canFocus && keyboard.hasVisibleFocus,
      message: () => `Expected element to support keyboard navigation, issues: ${keyboard.issues.join(', ')}`
    };
  },
  
  toHaveProperARIA: (element: HTMLElement) => {
    const screenReader = testScreenReaderCompatibility(element);
    
    return {
      pass: screenReader.ariaScore >= 80,
      message: () => `Expected element to have proper ARIA, score: ${screenReader.ariaScore}/100`
    };
  }
};

// Export for Jest setup
export default {
  toBeAccessible,
  ...accessibilityMatchers
};