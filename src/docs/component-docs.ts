/**
 * Component Documentation System
 * Automatic documentation generation for LiquidiUI components
 */

import { ReactElement, ComponentType } from 'react';
import type { GlassFeatureShowcaseProps } from '@/components/glass-feature-showcase';

export interface ComponentDocumentation {
  showcaseProps?: Partial<GlassFeatureShowcaseProps>;
  name: string;
  description: string;
  category:
    | 'layout'
    | 'input'
    | 'feedback'
    | 'navigation'
    | 'data-display'
    | 'overlay';
  props: PropDocumentation[];
  examples: ComponentExample[];
  accessibility: AccessibilityInfo;
  designTokens: string[];
  relatedComponents: string[];
  version: string;
  status: 'stable' | 'beta' | 'alpha' | 'deprecated';
}

export interface PropDocumentation {
  name: string;
  type: string;
  description: string;
  required: boolean;
  defaultValue?: any;
  examples?: any[];
  deprecated?: boolean;
  deprecationMessage?: string;
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  component: ReactElement;
  props?: Record<string, any>;
  category:
    | 'basic'
    | 'advanced'
    | 'interactive'
    | 'responsive'
    | 'accessibility';
}

export interface AccessibilityInfo {
  keyboardSupport: string[];
  ariaAttributes: string[];
  screenReaderSupport: string;
  colorContrast: 'AA' | 'AAA';
  focusManagement: string;
  guidelines: string[];
}

// Component documentation registry
class ComponentDocRegistry {
  private docs = new Map<string, ComponentDocumentation>();

  register(componentName: string, documentation: ComponentDocumentation): void {
    this.docs.set(componentName, documentation);
  }

  get(componentName: string): ComponentDocumentation | undefined {
    return this.docs.get(componentName);
  }

  getAll(): ComponentDocumentation[] {
    return Array.from(this.docs.values());
  }

  getByCategory(
    category: ComponentDocumentation['category']
  ): ComponentDocumentation[] {
    return this.getAll().filter(doc => doc.category === category);
  }

  search(query: string): ComponentDocumentation[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getAll().filter(
      doc =>
        doc.name.toLowerCase().includes(lowercaseQuery) ||
        doc.description.toLowerCase().includes(lowercaseQuery) ||
        doc.props.some(
          prop =>
            prop.name.toLowerCase().includes(lowercaseQuery) ||
            prop.description.toLowerCase().includes(lowercaseQuery)
        )
    );
  }
}

export const componentRegistry = new ComponentDocRegistry();

// Documentation generator utilities
export function generatePropDocs(
  component: ComponentType<any>,
  customDocs?: Partial<Record<string, Omit<PropDocumentation, 'name'>>>
): PropDocumentation[] {
  // This would integrate with TypeScript compiler API or react-docgen
  // For now, return a basic structure
  const defaultProps: PropDocumentation[] = [
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes to apply',
      required: false,
      defaultValue: undefined,
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: 'Child elements to render',
      required: false,
      defaultValue: undefined,
    },
  ];

  // Merge with custom documentation
  if (customDocs) {
    Object.entries(customDocs).forEach(([propName, propDoc]) => {
      const existingIndex = defaultProps.findIndex(p => p.name === propName);
      const mergedProp: PropDocumentation = { 
        name: propName, 
        type: propDoc?.type || 'unknown',
        description: propDoc?.description || 'No description provided',
        required: propDoc?.required || false,
        ...propDoc
      };
      
      if (existingIndex >= 0) {
        defaultProps[existingIndex] = mergedProp;
      } else {
        defaultProps.push(mergedProp);
      }
    });
  }

  return defaultProps;
}

export function generateAccessibilityDocs(
  keyboardSupport: string[] = [],
  ariaAttributes: string[] = [],
  additionalInfo: Partial<AccessibilityInfo> = {}
): AccessibilityInfo {
  return {
    keyboardSupport: [
      'Tab - Move focus to the component',
      'Shift + Tab - Move focus away from the component',
      ...keyboardSupport,
    ],
    ariaAttributes: [
      'aria-label - Accessible name for the component',
      'aria-describedby - Reference to additional description',
      ...ariaAttributes,
    ],
    screenReaderSupport: 'Fully compatible with screen readers',
    colorContrast: 'AA',
    focusManagement: 'Component properly manages focus states',
    guidelines: [
      'WCAG 2.1 AA compliant',
      'Keyboard accessible',
      'Screen reader compatible',
    ],
    ...additionalInfo,
  };
}

// Example generators
export function createBasicExample(
  name: string,
  description: string,
  component: ReactElement,
  code: string
): ComponentExample {
  return {
    name,
    description,
    code,
    component,
    category: 'basic',
  };
}

export function createInteractiveExample(
  name: string,
  description: string,
  component: ReactElement,
  code: string,
  props?: Record<string, any>
): ComponentExample {
  return {
    name,
    description,
    code,
    component,
    props,
    category: 'interactive',
  };
}

export function createResponsiveExample(
  name: string,
  description: string,
  component: ReactElement,
  code: string
): ComponentExample {
  return {
    name,
    description,
    code,
    component,
    category: 'responsive',
  };
}

export function createAccessibilityExample(
  name: string,
  description: string,
  component: ReactElement,
  code: string
): ComponentExample {
  return {
    name,
    description,
    code,
    component,
    category: 'accessibility',
  };
}

// Documentation templates
export const documentationTemplates = {
  button: {
    category: 'input' as const,
    description: 'A versatile button component with glass morphism effects',
    accessibility: generateAccessibilityDocs(
      [
        'Enter/Space - Activate the button',
        'Escape - Cancel action (if applicable)',
      ],
      [
        'aria-pressed - For toggle buttons',
        'aria-expanded - For dropdown buttons',
        'aria-disabled - When button is disabled',
      ]
    ),
    designTokens: [
      'colors.glass.light.primary',
      'borderRadius.md',
      'shadows.glass.subtle',
      'animation.duration.normal',
    ],
  },

  card: {
    category: 'layout' as const,
    description: 'A flexible container component with glass morphism styling',
    accessibility: generateAccessibilityDocs(
      [],
      [
        "role - Defines the card's semantic role",
        'aria-labelledby - References the card title',
      ]
    ),
    designTokens: [
      'colors.glass.light.primary',
      'borderRadius.lg',
      'shadows.glass.light',
      'spacing.6',
    ],
  },

  input: {
    category: 'input' as const,
    description: 'A form input component with glass styling and validation',
    accessibility: generateAccessibilityDocs(
      [
        'Arrow keys - Navigate through options (for select)',
        'Home/End - Move to start/end of input',
      ],
      [
        'aria-invalid - Indicates validation state',
        'aria-describedby - References help text or error message',
        'aria-required - Indicates required fields',
      ]
    ),
    designTokens: [
      'colors.glass.light.primary',
      'borderRadius.base',
      'shadows.focus.medium',
      'typography.fontSize.sm',
    ],
  },

  modal: {
    category: 'overlay' as const,
    description:
      'A modal dialog component with glass backdrop and focus management',
    accessibility: generateAccessibilityDocs(
      [
        'Escape - Close the modal',
        'Tab - Cycle through focusable elements within modal',
      ],
      [
        'role="dialog" - Identifies the modal as a dialog',
        'aria-modal="true" - Indicates modal behavior',
        'aria-labelledby - References the modal title',
        'aria-describedby - References the modal description',
      ],
      {
        focusManagement:
          'Focus is trapped within the modal and restored when closed',
      }
    ),
    designTokens: [
      'colors.glass.light.overlay',
      'backdropBlur.heavy',
      'zIndex.modal',
      'animation.duration.smooth',
    ],
  },
};

// Auto-documentation decorator
export function withDocumentation<P extends object>(
  Component: ComponentType<P>,
  documentation: Omit<ComponentDocumentation, 'name' | 'version'>
) {
  const componentName = Component.displayName || Component.name || 'Component';

  // Register the component documentation
  componentRegistry.register(componentName, {
    name: componentName,
    version: '1.0.0', // This would come from package.json
    ...documentation,
  });

  // Return the component with enhanced display name
  Component.displayName = componentName;
  return Component;
}

// Documentation validation
export function validateDocumentation(doc: ComponentDocumentation): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!doc.name) errors.push('Component name is required');
  if (!doc.description) errors.push('Component description is required');
  if (!doc.category) errors.push('Component category is required');

  // Props validation
  if (doc.props.length === 0) {
    warnings.push('No props documented');
  }

  doc.props.forEach((prop, index) => {
    if (!prop.name) errors.push(`Prop at index ${index} missing name`);
    if (!prop.type) errors.push(`Prop "${prop.name}" missing type`);
    if (!prop.description)
      warnings.push(`Prop "${prop.name}" missing description`);
  });

  // Examples validation
  if (doc.examples.length === 0) {
    warnings.push('No examples provided');
  }

  doc.examples.forEach((example, index) => {
    if (!example.name) errors.push(`Example at index ${index} missing name`);
    if (!example.code) errors.push(`Example "${example.name}" missing code`);
    if (!example.component)
      errors.push(`Example "${example.name}" missing component`);
  });

  // Accessibility validation
  if (doc.accessibility.keyboardSupport.length === 0) {
    warnings.push('No keyboard support documented');
  }

  if (doc.accessibility.ariaAttributes.length === 0) {
    warnings.push('No ARIA attributes documented');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Export utilities
export const docUtils = {
  registry: componentRegistry,
  generatePropDocs,
  generateAccessibilityDocs,
  createExample: {
    basic: createBasicExample,
    interactive: createInteractiveExample,
    responsive: createResponsiveExample,
    accessibility: createAccessibilityExample,
  },
  templates: documentationTemplates,
  withDocumentation,
  validate: validateDocumentation,
};
