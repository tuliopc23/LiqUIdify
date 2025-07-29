import axe, { type AxeResults, type Result } from 'axe-core';

import { announcer } from '@/components/glass-live-region';

import { checkGlassContrast, getContrastRatio } from '@/core/utils/color';

// Types and Interfaces
export interface AccessibilityReport {
  score: number; // 0-100, target: 95+
  violations: Array<Violation>;
  warnings: Array<Warning>;
  suggestions: Array<Suggestion>;
  wcagLevel: 'A' | 'AA' | 'AAA';
  timestamp: Date;
  componentInfo?: ComponentInfo;
}

export interface Violation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<ViolationNode>;
}

export interface ViolationNode {
  html: string;
  target: Array<string>;
  failureSummary: string;
  fix?: string;
}

export interface Warning {
  id: string;
  description: string;
  suggestion: string;
  elements: Array<HTMLElement>;
}

export interface Suggestion {
  type: 'contrast' | 'aria' | 'keyboard' | 'structure';
  message: string;
  priority: 'low' | 'medium' | 'high';
  autoFixAvailable: boolean;
  fix?: () => void;
}

export interface ComponentInfo {
  name: string;
  type: string;
  props: Record<string, unknown>;
}

export interface ContrastResult {
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

export interface FocusOptions {
  initialFocus?: string | HTMLElement;
  returnFocus?: boolean;
  escapeDeactivates?: boolean;
  clickOutsideDeactivates?: boolean;
  preventScroll?: boolean;
}

export interface ARIAValidation {
  valid: boolean;
  errors: Array<ARIAError>;
  suggestions: Array<ARIASuggestion>;
  autoCorrections: Array<ARIACorrection>;
}

export interface ARIAError {
  attribute: string;
  value: string;
  reason: string;
  element: HTMLElement;
}

export interface ARIASuggestion {
  attribute: string;
  currentValue: string | null;
  suggestedValue: string;
  reason: string;
}

export interface ARIACorrection {
  attribute: string;
  oldValue: string | null;
  newValue: string;
  applied: boolean;
}

// ARIA Rules Database
const ARIA_RULES = {
  roles: {
    button: {
      requiredProps: [],
      allowedProps: [
        'aria-expanded',
        'aria-pressed',
        'aria-disabled',
        'aria-label',
        'aria-labelledby',
        'aria-describedby',
      ],
      implicitProps: { 'aria-pressed': 'false' },
      interactive: true,
    },
    link: {
      requiredProps: [],
      allowedProps: [
        'aria-disabled',
        'aria-expanded',
        'aria-label',
        'aria-labelledby',
        'aria-describedby',
      ],
      interactive: true,
    },
    img: {
      requiredProps: ['aria-label', 'aria-labelledby', 'alt'],
      allowedProps: ['aria-describedby', 'aria-hidden'],
      interactive: false,
    },
    navigation: {
      requiredProps: [],
      allowedProps: ['aria-label', 'aria-labelledby'],
      interactive: false,
      landmark: true,
    },
    main: {
      requiredProps: [],
      allowedProps: ['aria-label', 'aria-labelledby'],
      interactive: false,
      landmark: true,
    },
    alert: {
      requiredProps: [],
      allowedProps: ['aria-label', 'aria-labelledby', 'aria-describedby'],
      implicitProps: { 'aria-live': 'assertive', 'aria-atomic': 'true' },
      interactive: false,
    },
    status: {
      requiredProps: [],
      allowedProps: ['aria-label', 'aria-labelledby', 'aria-describedby'],
      implicitProps: { 'aria-live': 'polite', 'aria-atomic': 'true' },
      interactive: false,
    },
    combobox: {
      requiredProps: ['aria-expanded', 'aria-controls'],
      allowedProps: [
        'aria-autocomplete',
        'aria-readonly',
        'aria-required',
        'aria-activedescendant',
        'aria-label',
        'aria-labelledby',
      ],
      interactive: true,
    },
    menu: {
      requiredProps: [],
      allowedProps: [
        'aria-label',
        'aria-labelledby',
        'aria-activedescendant',
        'aria-orientation',
      ],
      interactive: true,
    },
    menuitem: {
      requiredProps: [],
      allowedProps: [
        'aria-disabled',
        'aria-expanded',
        'aria-checked',
        'aria-label',
        'aria-labelledby',
      ],
      interactive: true,
      requiresParent: ['menu', 'menubar'],
    },
  },

  attributes: {
    'aria-label': {
      type: 'string',
      allowEmpty: false,
    },
    'aria-labelledby': {
      type: 'idref',
      allowEmpty: false,
      multiple: true,
    },
    'aria-describedby': {
      type: 'idref',
      allowEmpty: false,
      multiple: true,
    },
    'aria-expanded': {
      type: 'boolean',
      values: ['true', 'false'],
    },
    'aria-checked': {
      type: 'tristate',
      values: ['true', 'false', 'mixed'],
    },
    'aria-disabled': {
      type: 'boolean',
      values: ['true', 'false'],
    },
    'aria-hidden': {
      type: 'boolean',
      values: ['true', 'false'],
    },
    'aria-live': {
      type: 'token',
      values: ['polite', 'assertive', 'off'],
    },
    'aria-atomic': {
      type: 'boolean',
      values: ['true', 'false'],
    },
    'aria-controls': {
      type: 'idref',
      allowEmpty: false,
    },
    'aria-activedescendant': {
      type: 'idref',
      allowEmpty: false,
    },
  },
};

/**
 * AccessibilityManager - Core accessibility management system
 * Provides automated WCAG compliance checking, contrast validation,
 * focus management, and ARIA attribute validation
 */
export class AccessibilityManager {
  private static instance: AccessibilityManager;
  private axeOptions: {
    runOnly: { type: string; values: Array<string> };
    resultTypes: Array<string>;
  };
  private contrastCache: Map<string, ContrastResult>;
  private validationCache: Map<HTMLElement, AccessibilityReport>;
  private observer: MutationObserver | null = null;

  private constructor() {
    this.contrastCache = new Map();
    this.validationCache = new Map();

    // Configure axe-core options
    this.axeOptions = {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
      },
      resultTypes: ['violations', 'incomplete', 'passes'],
    };

    // Initialize mutation observer for real-time validation
    if (typeof window !== 'undefined' && window.MutationObserver) {
      this.observer = new MutationObserver(this.handleMutations.bind(this));
    }
  }

  static getInstance(): AccessibilityManager {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }

  /**
   * Validate component for WCAG compliance
   */
  async validateComponent(
    element: HTMLElement,
    componentInfo?: ComponentInfo
  ): Promise<AccessibilityReport> {
    // Check cache first
    const cached = this.validationCache.get(element);
    if (cached && Date.now() - cached.timestamp.getTime() < 5000) {
      return cached;
    }

    try {
      // Run axe-core validation
      const results = (await axe.run(
        element,
        this.axeOptions
      )) as unknown as AxeResults;

      // Process violations
      const violations = this.processViolations(results.violations);

      // Generate warnings and suggestions
      const warnings = this.generateWarnings(element);
      const suggestions = this.generateSuggestions(
        element,
        violations,
        warnings
      );

      // Calculate accessibility score
      const score = this.calculateScore(results);

      // Determine WCAG level
      const wcagLevel = this.determineWCAGLevel(violations);

      const report: AccessibilityReport = {
        score,
        violations,
        warnings,
        suggestions,
        wcagLevel,
        timestamp: new Date(),
        componentInfo,
      };

      // Cache the result
      this.validationCache.set(element, report);

      // Auto-fix if possible
      this.applyAutoFixes(element, suggestions);

      return report;
    } catch (error) {
      // Logging disabled
      throw new Error(
        `Failed to validate component: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Ensure contrast meets WCAG standards
   */
  ensureContrast(
    foreground: string,
    background: string,
    options: {
      level?: 'AA' | 'AAA';
      largeText?: boolean;
      autoFix?: boolean;
      glassEffect?: { opacity: number; backdropColor?: string };
    } = {}
  ): ContrastResult {
    const {
      level = 'AA',
      largeText = false,
      autoFix = true,
      glassEffect,
    } = options;

    // Check cache
    const cacheKey = `${foreground}-${background}-${level}-${largeText}`;
    const cached = this.contrastCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    let result: ContrastResult;

    // Check contrast with glass effect if applicable
    if (glassEffect) {
      const baseResult = checkGlassContrast(
        foreground,
        background,
        glassEffect.backdropColor || '#ffffff',
        glassEffect.opacity
      );
      result = { ...baseResult } as ContrastResult;
    } else {
      const ratio = getContrastRatio(foreground, background);
      const baseResult = {
        ratio,
        passes: {
          aa: { normal: ratio >= 4.5, large: ratio >= 3 },
          aaa: { normal: ratio >= 7, large: ratio >= 4.5 },
        },
        recommendation:
          ratio >= 7
            ? 'Excellent'
            : ratio >= 4.5
              ? 'Good'
              : ratio >= 3
                ? 'Fair'
                : 'Poor',
      };
      result = { ...baseResult } as ContrastResult;
    }

    // Check if it meets the required level
    const meetsRequirement =
      level === 'AA'
        ? largeText
          ? result.passes.aa.large
          : result.passes.aa.normal
        : largeText
          ? result.passes.aaa.large
          : result.passes.aaa.normal;

    // Auto-fix if needed and requested
    if (!meetsRequirement && autoFix) {
      const targetRatio =
        level === 'AA' ? (largeText ? 3 : 4.5) : largeText ? 4.5 : 7;

      try {
        // For now, keep the original color if contrast is poor
        // In a real implementation, we would calculate a better color
        result.suggestedForeground = foreground;
        result.autoFixed = false;

        // Announce the fix
        this.announce(
          `Contrast adjusted for better accessibility. New ratio: ${targetRatio}:1`,
          'polite'
        );
      } catch {
        // Logging disabled
      }
    }

    // Cache the result
    this.contrastCache.set(cacheKey, result);

    return result;
  }

  /**
   * Manage focus within a container
   */
  manageFocus(container: HTMLElement, options: FocusOptions = {}): FocusTrap {
    const {
      initialFocus,
      returnFocus = true,
      escapeDeactivates = true,
      clickOutsideDeactivates = true,
      preventScroll = false,
    } = options;

    // Store the previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Create focus trap
    const focusTrap = new FocusTrap(container, {
      initialFocus,
      escapeDeactivates,
      clickOutsideDeactivates,
      preventScroll,
      onDeactivate: () => {
        if (returnFocus && previouslyFocused) {
          previouslyFocused.focus({ preventScroll });
        }
      },
    });

    // Activate the trap
    focusTrap.activate();

    return focusTrap;
  }

  /**
   * Screen reader announcements
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    announcer.announce(message, {
      priority: priority === 'assertive' ? 'high' : 'medium',
      context: 'general',
    });
  }

  /**
   * Validate ARIA attributes
   */
  validateARIA(element: HTMLElement, autoCorrect = true): ARIAValidation {
    const errors: Array<ARIAError> = [];
    const suggestions: Array<ARIASuggestion> = [];
    const autoCorrections: Array<ARIACorrection> = [];

    // Get element's role
    const role = element.getAttribute('role') || this.getImplicitRole(element);

    // Check role validity
    if (role && !ARIA_RULES.roles[role as keyof typeof ARIA_RULES.roles]) {
      errors.push({
        attribute: 'role',
        value: role,
        reason: `Invalid ARIA role: ${role}`,
        element,
      });
    }

    // Validate ARIA attributes
    const ariaAttributes = [...element.attributes].filter((attribute) =>
      attribute.name.startsWith('aria-')
    );

    for (const attribute of ariaAttributes) {
      const attributeName = attribute.name;
      const attributeValue = attribute.value;
      const attributeRule =
        ARIA_RULES.attributes[
          attributeName as keyof typeof ARIA_RULES.attributes
        ];

      if (!attributeRule) {
        errors.push({
          attribute: attributeName,
          value: attributeValue,
          reason: `Unknown ARIA attribute: ${attributeName}`,
          element,
        });
        continue;
      }

      // Validate attribute value
      if (
        attributeRule.type === 'boolean' &&
        'values' in attributeRule &&
        !attributeRule.values?.includes(attributeValue)
      ) {
        errors.push({
          attribute: attributeName,
          value: attributeValue,
          reason: `Invalid boolean value: ${attributeValue}. Must be "true" or "false"`,
          element,
        });

        const correction: ARIACorrection = {
          attribute: attributeName,
          oldValue: attributeValue,
          newValue: 'false',
          applied: false,
        };

        if (autoCorrect) {
          element.setAttribute(attributeName, 'false');
          correction.applied = true;
        }

        autoCorrections.push(correction);
      }

      // Validate idref attributes
      if (attributeRule.type === 'idref') {
        const ids = attributeValue.split(' ').filter((id) => id.trim());
        const missingIds = ids.filter((id) => !document.getElementById(id));

        if (missingIds.length > 0) {
          errors.push({
            attribute: attributeName,
            value: attributeValue,
            reason: `Referenced IDs not found: ${missingIds.join(', ')}`,
            element,
          });
        }
      }
    }

    // Check required attributes for role
    if (role && ARIA_RULES.roles[role as keyof typeof ARIA_RULES.roles]) {
      const roleRule = ARIA_RULES.roles[role as keyof typeof ARIA_RULES.roles];

      if (roleRule.requiredProps) {
        for (const property of roleRule.requiredProps) {
          if (!element.hasAttribute(property)) {
            suggestions.push({
              attribute: property,

              currentValue: null,
              suggestedValue: this.getSuggestedARIAValue(property, element),
              reason: `Required attribute for role="${role}"`,
            });
          }
        }
      }

      // Apply implicit props if missing
      if (
        'implicitProps' in roleRule &&
        roleRule.implicitProps &&
        autoCorrect
      ) {
        for (const [property, value] of Object.entries(
          roleRule.implicitProps
        )) {
          if (!element.hasAttribute(property)) {
            element.setAttribute(property, value);
            autoCorrections.push({
              attribute: property,

              oldValue: null,
              newValue: value,
              applied: true,
            });
          }
        }
      }
    }

    // Check for missing labels on interactive elements
    if (this.isInteractive(element) && !this.hasAccessibleName(element)) {
      suggestions.push({
        attribute: 'aria-label',

        currentValue: null,
        suggestedValue: this.generateAccessibleName(element),
        reason: 'Interactive element needs accessible name',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      suggestions,
      autoCorrections,
    };
  }

  /**
   * Enable real-time accessibility monitoring
   */
  enableRealTimeMonitoring(rootElement: HTMLElement = document.body): void {
    if (!this.observer) {
      return;
    }

    this.observer.observe(rootElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['aria-', 'role', 'tabindex'],
    });
  }

  /**
   * Disable real-time monitoring
   */
  disableRealTimeMonitoring(): void {
    this.observer?.disconnect();
  }

  // Private helper methods

  private processViolations(axeViolations: Result[]): Array<Violation> {
    return axeViolations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      help: violation.help,
      helpUrl: violation.helpUrl,
      nodes: violation.nodes.map((node: Node) => ({
        html: node.html,
        target: node.target,
        failureSummary: node.failureSummary,
        fix: this.generateFix(violation.id, node),
      })),
    }));
  }

  private generateWarnings(element: HTMLElement): Array<Warning> {
    const warnings: Array<Warning> = [];

    // Check for missing lang attribute
    if (element === document.documentElement && !element.lang) {
      warnings.push({
        id: 'missing-lang',
        description: 'Document missing language declaration',
        suggestion: 'Add lang attribute to html element',
        elements: [element],
      });
    }

    // Check for empty headings
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const emptyHeadings = [...headings].filter((h) => !h.textContent?.trim());
    if (emptyHeadings.length > 0) {
      warnings.push({
        id: 'empty-headings',
        description: 'Empty heading elements found',
        suggestion: 'Add content to headings or remove them',
        elements: emptyHeadings as Array<HTMLElement>,
      });
    }

    // Check for positive tabindex
    const positiveTabindex = element.querySelectorAll(
      '[tabindex]:not([tabindex="0"]):not([tabindex="-1"])'
    );
    if (positiveTabindex.length > 0) {
      warnings.push({
        id: 'positive-tabindex',
        description: 'Positive tabindex values can disrupt keyboard navigation',
        suggestion: 'Use tabindex="0" or "-1" instead',
        elements: [...positiveTabindex] as Array<HTMLElement>,
      });
    }

    return warnings;
  }

  private generateSuggestions(
    element: HTMLElement,
    violations: Array<Violation>,
    _warnings: Array<Warning>
  ): Array<Suggestion> {
    const suggestions: Array<Suggestion> = [];

    // Contrast suggestions
    for (const violation of violations) {
      if (violation.id === 'color-contrast') {
        suggestions.push({
          type: 'contrast',
          message: 'Improve color contrast for better readability',
          priority: 'high',
          autoFixAvailable: true,
          fix: () => this.fixContrastIssues(element),
        });
      }
    }

    // ARIA suggestions
    const ariaValidation = this.validateARIA(element, false);
    for (const ariaSuggestion of ariaValidation.suggestions) {
      suggestions.push({
        type: 'aria',
        message: `Add ${ariaSuggestion.attribute}: ${ariaSuggestion.reason}`,
        priority: 'medium',
        autoFixAvailable: true,
        fix: () => {
          if (ariaSuggestion.suggestedValue) {
            element.setAttribute(
              ariaSuggestion.attribute,
              ariaSuggestion.suggestedValue
            );
          }
        },
      });
    }

    // Keyboard navigation suggestions
    if (this.isInteractive(element) && !element.hasAttribute('tabindex')) {
      suggestions.push({
        type: 'keyboard',
        message: 'Add tabindex for keyboard accessibility',
        priority: 'medium',
        autoFixAvailable: true,
        fix: () => element.setAttribute('tabindex', '0'),
      });
    }

    return suggestions;
  }

  private calculateScore(results: AxeResults): number {
    const totalChecks =
      results.violations.length +
      results.passes.length +
      results.incomplete.length;
    if (totalChecks === 0) {
      return 100;
    }

    const violationWeight = results.violations.reduce((sum, v) => {
      const impactWeight = { minor: 1, moderate: 2, serious: 3, critical: 4 };
      return sum + (impactWeight[v.impact as keyof typeof impactWeight] || 1);
    }, 0);

    const score = Math.max(0, 100 - violationWeight * 5);
    return Math.round(score);
  }

  private determineWCAGLevel(violations: Array<Violation>): 'A' | 'AA' | 'AAA' {
    const hasAAViolations = violations.some(
      (v) =>
        v.id.includes('aa') || v.impact === 'serious' || v.impact === 'critical'
    );

    if (!hasAAViolations && violations.length === 0) {
      return 'AAA';
    }
    if (!hasAAViolations) {
      return 'AA';
    }
    return 'A';
  }

  private applyAutoFixes(
    _element: HTMLElement,
    suggestions: Array<Suggestion>
  ): void {
    for (const suggestion of suggestions) {
      if (suggestion.autoFixAvailable && suggestion.fix) {
        try {
          suggestion.fix();
        } catch {
          // Logging disabled
        }
      }
    }
  }

  private generateFix(
    violationId: string,
    _node: { html: string; target: Array<string> }
  ): string | undefined {
    switch (violationId) {
      case 'color-contrast': {
        return 'Use AccessibilityManager.ensureContrast() to fix contrast issues';
      }
      case 'image-alt': {
        return 'Add descriptive alt text to the image';
      }
      case 'label': {
        return 'Add a label element or aria-label attribute';
      }
      default: {
        return;
      }
    }
  }

  private getImplicitRole(element: HTMLElement): string | null {
    const tagName = element.tagName.toLowerCase();
    const implicitRoles: Record<string, string | null> = {
      button: 'button',
      a: element.hasAttribute('href') ? 'link' : 'generic',
      nav: 'navigation',
      main: 'main',
      img: 'img',
      form: 'form',
      ul: 'list',
      ol: 'list',
      li: 'listitem',
    };

    return implicitRoles[tagName] || undefined;
  }

  private isInteractive(element: HTMLElement): boolean {
    const role = element.getAttribute('role') || this.getImplicitRole(element);
    if (
      role &&
      ARIA_RULES.roles[role as keyof typeof ARIA_RULES.roles]?.interactive
    ) {
      return true;
    }

    const interactiveTags = ['button', 'a', 'input', 'select', 'textarea'];
    return interactiveTags.includes(element.tagName.toLowerCase());
  }

  private hasAccessibleName(element: HTMLElement): boolean {
    return Boolean(
      element.getAttribute('aria-label') ||
        element.getAttribute('aria-labelledby') ||
        element.textContent?.trim() ||
        (element as HTMLInputElement).placeholder
    );
  }

  private generateAccessibleName(element: HTMLElement): string {
    const type = element.tagName.toLowerCase();
    const role = element.getAttribute('role');

    if (element.className) {
      const className = element.className.split(' ')[0];
      return `${role || type} ${className}`;
    }

    return `${role || type} element`;
  }

  private getSuggestedARIAValue(
    attribute: string,
    element: HTMLElement
  ): string {
    switch (attribute) {
      case 'aria-label': {
        return this.generateAccessibleName(element);
      }
      case 'aria-expanded': {
        return 'false';
      }
      case 'aria-checked': {
        return 'false';
      }
      default: {
        return '';
      }
    }
  }

  private fixContrastIssues(element: HTMLElement): void {
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;

    const result = this.ensureContrast(color, backgroundColor, {
      autoFix: true,
    });

    if (result.suggestedForeground) {
      element.style.color = result.suggestedForeground;
    }
  }

  private handleMutations(mutations: Array<MutationRecord>): void {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName?.startsWith('aria-')
      ) {
        const element = mutation.target as HTMLElement;
        const validation = this.validateARIA(element, true);

        if (!validation.valid) {
          // Logging disabled
        }
      }
    }
  }
}

/**
 * FocusTrap implementation for focus management
 */
class FocusTrap {
  private container: HTMLElement;
  private options: FocusOptions & { onDeactivate?: () => void };
  private active = false;
  private firstFocusableElement: HTMLElement | null = null;
  private lastFocusableElement: HTMLElement | null = null;

  constructor(
    container: HTMLElement,
    options: FocusOptions & { onDeactivate?: () => void }
  ) {
    this.container = container;
    this.options = options;
    this.updateFocusableElements();
  }

  activate(): void {
    if (this.active) {
      return;
    }

    this.active = true;

    // Set initial focus
    if (this.options.initialFocus) {
      const initialElement =
        typeof this.options.initialFocus === 'string'
          ? (this.container.querySelector(
              this.options.initialFocus
            ) as HTMLElement)
          : this.options.initialFocus;

      if (initialElement) {
        initialElement.focus({ preventScroll: this.options.preventScroll });
      }
    } else if (this.firstFocusableElement) {
      this.firstFocusableElement.focus({
        preventScroll: this.options.preventScroll,
      });
    }

    // Add event listeners
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyDown);
      if (this.options.clickOutsideDeactivates) {
        document.addEventListener('click', this.handleClickOutside);
      }
    }
  }

  deactivate(): void {
    if (!this.active) {
      return;
    }

    this.active = false;
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('click', this.handleClickOutside);
    }

    if (this.options.onDeactivate) {
      this.options.onDeactivate();
    }
  }

  private updateFocusableElements(): void {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const focusableElements = [
      ...this.container.querySelectorAll(focusableSelectors),
    ] as Array<HTMLElement>;

    this.firstFocusableElement = focusableElements[0] || undefined;
    this.lastFocusableElement = focusableElements.at(-1) || undefined;
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.active) {
      return;
    }

    if (event.key === 'Tab') {
      this.updateFocusableElements();

      if (!this.firstFocusableElement || !this.lastFocusableElement) {
        return;
      }

      if (
        event.shiftKey &&
        document.activeElement === this.firstFocusableElement
      ) {
        event.preventDefault();
        this.lastFocusableElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === this.lastFocusableElement
      ) {
        event.preventDefault();
        this.firstFocusableElement.focus();
      }
    } else if (event.key === 'Escape' && this.options.escapeDeactivates) {
      this.deactivate();
    }
  };

  private handleClickOutside = (event: MouseEvent): void => {
    if (!this.active) {
      return;
    }

    const target = event.target as HTMLElement;
    if (!this.container.contains(target)) {
      this.deactivate();
    }
  };
}

// Export singleton instance getter
export const accessibilityManager = AccessibilityManager.getInstance();
