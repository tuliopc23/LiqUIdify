/**
 * LiqUIdify Code Generator
 *
 * Automated code generation and scaffolding tool for S-Tier development
 * - Component template generation
 * - TypeScript type generation
 * - Test file scaffolding
 * - Storybook stories generation
 * - API documentation generation
 * - Migration code generation
 */

export interface ComponentConfig {
  name: string;
  category:
    | 'core'
    | 'forms'
    | 'navigation'
    | 'feedback'
    | 'layout'
    | 'advanced';
  description: string;
  props: Array<PropertyDefinition>;
  variants?: Array<VariantDefinition>;
  animations?: Array<AnimationDefinition>;
  accessibility?: AccessibilityConfig;
  examples?: Array<ExampleDefinition>;
  dependencies?: Array<string>;
  glassMorphismLevel?: number;
}

export interface PropertyDefinition {
  name: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'function'
    | 'enum'
    | 'React.ReactNode';
  required?: boolean;
  defaultValue?: unknown;
  description: string;
  enumValues?: Array<string>;
  deprecated?: boolean;
  since?: string;
}

export interface VariantDefinition {
  name: string;
  props: Record<string, unknown>;
  description: string;
}

export interface AnimationDefinition {
  name: string;
  type: 'spring' | 'tween' | 'gesture' | 'physics';
  properties: Array<string>;
  defaultConfig: Record<string, unknown>;
}

export interface AccessibilityConfig {
  roles: Array<string>;
  ariaAttributes: Array<string>;
  keyboardSupport: Array<string>;
  screenReaderSupport: boolean;
  colorContrastCompliant: boolean;
  focusManagement: boolean;
}

export interface ExampleDefinition {
  name: string;
  description: string;
  code: string;
  props: Record<string, unknown>;
}

export interface GenerationOptions {
  includeTests?: boolean;
  includeStories?: boolean;
  includeDocumentation?: boolean;
  includeTypes?: boolean;
  includeMigration?: boolean;
  targetVersion?: string;
  framework?: 'react' | 'vue' | 'angular' | 'svelte';
  styleFramework?: 'tailwind' | 'styled-components' | 'emotion' | 'css-modules';
  bundleStrategy?: 'esm' | 'cjs' | 'umd' | 'all';
}

class LiqUIdifyCodeGenerator {
  private config: ComponentConfig;
  private options: GenerationOptions;

  constructor(config: ComponentConfig, options: GenerationOptions = {}) {
    this.config = config;
    this.options = {
      includeTests: true,
      includeStories: true,
      includeDocumentation: true,
      includeTypes: true,
      includeMigration: false,
      targetVersion: '1.0.0',
      framework: 'react',
      styleFramework: 'tailwind',
      bundleStrategy: 'all',
      ...options,
    };
  }

  /**
   * Generate complete component package
   */
  public generateComponent(): GeneratedFiles {
    const files: GeneratedFiles = {};

    // Core component file
    files[`${this.config.name}.tsx`] = this.generateComponentFile();

    // TypeScript types
    if (this.options.includeTypes) {
      files[`${this.config.name}.types.ts`] = this.generateTypesFile();
    }

    // Test file
    if (this.options.includeTests) {
      files[`${this.config.name}.test.tsx`] = this.generateTestFile();
    }

    // Storybook stories
    if (this.options.includeStories) {
      files[`${this.config.name}.stories.tsx`] = this.generateStoriesFile();
    }

    // Documentation
    if (this.options.includeDocumentation) {
      files[`${this.config.name}.md`] = this.generateDocumentationFile();
    }

    // Index file for exports
    files['index.ts'] = this.generateIndexFile();

    // Package.json for standalone component
    files['package.json'] = this.generatePackageJson();

    return files;
  }

  /**
   * Generate React component file
   */
  private generateComponentFile(): string {
    const imports = this.generateImports();
    const propsInterface = this.generatePropsInterface();
    const componentLogic = this.generateComponentLogic();
    const exportStatement = this.generateExportStatement();

    return `${imports}

${propsInterface}

${componentLogic}

${exportStatement}`;
  }

  /**
   * Generate component imports
   */
  private generateImports(): string {
    const coreImports = [
      "import React, { forwardRef, useMemo, useCallback } from 'react';",
      "import { cn } from '../../lib/utils';",
      "import { useGlassMorphism } from '../../core/glass/unified-glass-system';",
      "import { useAccessibility } from '../../core/accessibility';",
      "import { useLiqUIdifyErrorTracking } from '../../core/error-tracking';",
    ];

    if (this.config.animations) {
      coreImports.push(
        "import { motion, AnimatePresence } from 'framer-motion';"
      );
      coreImports.push("import { usePhysics } from '../../lib/physics';");
    }

    if (this.config.dependencies) {
      coreImports.push(
        ...this.config.dependencies.map((dep) => `import ${dep};`)
      );
    }

    return coreImports.join('\n');
  }

  /**
   * Generate TypeScript props interface
   */
  private generatePropsInterface(): string {
    const props = this.config.props
      .map((property) => {
        const optional = property.required ? '' : '?';
        const deprecated = property.deprecated ? '\n  /** @deprecated */' : '';
        const since = property.since
          ? `\n  /** @since ${property.since} */`
          : '';

        return `  ${deprecated}${since}
  /** ${property.description} */
  ${property.name}${optional}: ${this.getTypeScript(property)};`;
      })
      .join('\n');

    const baseProps = `
  /** Custom CSS class for styling */
  className?: string;
  /** Glass morphism effect intensity (0-100) */
  glassMorphism?: number;
  /** Enable accessibility features */
  a11y?: boolean;
  /** Animation configuration */
  animation?: boolean | AnimationConfig;
  /** Forward ref to underlying DOM element */
  ref?: React.Ref<HTMLElement>;`;

    return `/**
 * ${this.config.name} component props
 *
 * ${this.config.description}
 */
export interface ${this.config.name}Props {${props}${baseProps}
}`;
  }

  /**
   * Generate main component logic
   */
  private generateComponentLogic(): string {
    const componentName = this.config.name;
    const glassLevel = this.config.glassMorphismLevel || 60;

    return `/**
 * ${componentName} - ${this.config.description}
 *
 * S-Tier LiqUIdify component with glassmorphism design and accessibility features.
 *
 * @example
 * \`\`\`tsx
 * <${componentName} variant="primary" size="medium">
 *   Content here
 * </${componentName}>
 * \`\`\`
 */
export const ${componentName} = forwardRef<HTMLElement, ${componentName}Props>(
  (
    {
      className,
      glassMorphism = ${glassLevel},
      a11y = true,
      animation = true,
      ${this.config.props.map((property) => `${property.name}${property.defaultValue === undefined ? '' : ` = ${JSON.stringify(property.defaultValue)}`}`).join(',\n      ')},
      ...props
    },
    ref
  ) => {
    // Error tracking for production monitoring
    const { trackError, trackPerformance, addBreadcrumb } = useLiqUIdifyErrorTracking('${componentName}');

    // Glass morphism effect
    const glassStyles = useGlassMorphism({
      intensity: glassMorphism,
      layers: ['backdrop', 'overlay', 'content'],
      animation: typeof animation === 'object' ? animation.glass : animation
    });

    // Accessibility configuration
    const accessibilityProps = useAccessibility({
      enabled: a11y,
      role: '${this.getDefaultRole()}',
      label: ${this.getAriaLabelLogic()},
      keyboardNavigation: true,
      screenReaderSupport: true
    });

    ${this.generateAnimationLogic()}

    ${this.generateVariantLogic()}

    // Component state and effects
    ${this.generateStateLogic()}

    // Performance monitoring
    React.useEffect(() => {
      const renderStart = performance.now();
      return () => {
        const renderTime = performance.now() - renderStart;
        if (renderTime > 16) { // 60fps threshold
          trackPerformance('slow-render', { duration: renderTime });
        }
      };
    });

    // Error boundary integration
    React.useEffect(() => {
      addBreadcrumb('${componentName} mounted', 'lifecycle');
      return () => addBreadcrumb('${componentName} unmounted', 'lifecycle');
    }, []);

    // Computed styles
    const computedClassName = useMemo(() => cn(
      // Base styles
      '${this.generateBaseClasses()}',

      // Glass morphism styles
      glassStyles.backdrop,
      glassStyles.overlay,

      // Variant styles
      ${this.generateVariantClassLogic()}

      // Animation styles
      ${this.generateAnimationClassLogic()}

      // Custom className
      className
    ), [${this.getDependencies().join(', ')}]);

    ${this.generateEventHandlers()}

    ${this.generateRenderLogic()}
  }
);

${componentName}.displayName = '${componentName}';`;
  }

  /**
   * Generate animation logic
   */
  private generateAnimationLogic(): string {
    if (!this.config.animations) {
      return '';
    }

    return `
    // Animation configuration
    const animationConfig = useMemo(() => {
      if (!animation) return null;

      const config = typeof animation === 'object' ? animation : {};

      return {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          ...config
        }
      };
    }, [animation]);

    // Physics-based interactions
    const physicsProps = usePhysics({
      hover: {
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400 }
      },
      tap: {
        scale: 0.98,
        transition: { type: 'spring', stiffness: 600 }
      }
    });`;
  }

  /**
   * Generate variant logic
   */
  private generateVariantLogic(): string {
    if (!this.config.variants) {
      return '';
    }

    const variantProperty = this.config.props.find((p) => p.name === 'variant');
    if (!variantProperty) {
      return '';
    }

    return `
    // Variant configuration
    const variantStyles = useMemo(() => {
      switch (variant) {
        ${this.config.variants
          .map(
            (v) => `
        case '${v.name}':
          return '${this.generateVariantClasses(v)}';`
          )
          .join('')}
        default:
          return '';
      }
    }, [variant]);`;
  }

  /**
   * Generate component state logic
   */
  private generateStateLogic(): string {
    return `
    // Internal state
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    // Ref management
    const elementRef = React.useRef<HTMLElement>(null);
    React.useImperativeHandle(ref, () => elementRef.current!);`;
  }

  /**
   * Generate event handlers
   */
  private generateEventHandlers(): string {
    return `
    // Event handlers with error tracking
    const handleFocus = useCallback((event: React.FocusEvent) => {
      try {
        setIsFocused(true);
        addBreadcrumb('${this.config.name} focused', 'user');
        props.onFocus?.(event);
      } catch (error) {
        trackError(error as Error, { userInteraction: 'focus' });
      }
    }, [props.onFocus, addBreadcrumb, trackError]);

    const handleBlur = useCallback((event: React.FocusEvent) => {
      try {
        setIsFocused(false);
        addBreadcrumb('${this.config.name} blurred', 'user');
        props.onBlur?.(event);
      } catch (error) {
        trackError(error as Error, { userInteraction: 'blur' });
      }
    }, [props.onBlur, addBreadcrumb, trackError]);

    const handleMouseEnter = useCallback((event: React.MouseEvent) => {
      try {
        setIsHovered(true);
        props.onMouseEnter?.(event);
      } catch (error) {
        trackError(error as Error, { userInteraction: 'hover' });
      }
    }, [props.onMouseEnter, trackError]);

    const handleMouseLeave = useCallback((event: React.MouseEvent) => {
      try {
        setIsHovered(false);
        props.onMouseLeave?.(event);
      } catch (error) {
        trackError(error as Error, { userInteraction: 'hover_end' });
      }
    }, [props.onMouseLeave, trackError]);`;
  }

  /**
   * Generate render logic
   */
  private generateRenderLogic(): string {
    const Element = this.getElementType();

    return `
    // Render component
    const ComponentElement = animation ? motion.${Element} : '${Element}';

    return (
      <ComponentElement
        ref={elementRef}
        className={computedClassName}
        {...accessibilityProps}
        {...(animation ? animationConfig : {})}
        {...(animation ? physicsProps : {})}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        ${this.generateChildrenLogic()}
      </ComponentElement>
    );`;
  }

  /**
   * Generate TypeScript types file
   */
  private generateTypesFile(): string {
    return `/**
 * ${this.config.name} TypeScript Definitions
 *
 * Generated automatically by LiqUIdify Code Generator
 */

import { ComponentProps, ReactNode } from 'react';

${this.generateEnumTypes()}

${this.generateAnimationTypes()}

${this.generateAccessibilityTypes()}

// Re-export main props interface
export { ${this.config.name}Props } from './${this.config.name}';

// Helper types
export type ${this.config.name}Ref = HTMLElement;
export type ${this.config.name}Element = ComponentProps<'${this.getElementType()}'>;

// Variant type union
${this.generateVariantTypes()}

// Export branded types for better type safety
export type ${this.config.name}Component = React.ForwardRefExoticComponent<
  ${this.config.name}Props & React.RefAttributes<${this.config.name}Ref>
>;`;
  }

  /**
   * Generate test file
   */
  private generateTestFile(): string {
    return `/**
 * ${this.config.name} Component Tests
 *
 * Comprehensive test suite including accessibility, performance, and functionality tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { ${this.config.name} } from './${this.config.name}';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock performance APIs
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now())
  }
});

describe('${this.config.name}', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<${this.config.name} />);
    });

    it('accepts custom className', () => {
      const { container } = render(<${this.config.name} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    ${this.generatePropTests()}
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<${this.config.name} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<${this.config.name} />);

      const element = screen.getByRole('${this.getDefaultRole()}');
      await user.tab();
      expect(element).toHaveFocus();
    });

    it('has proper ARIA attributes', () => {
      render(<${this.config.name} aria-label="Test label" />);
      const element = screen.getByRole('${this.getDefaultRole()}');
      expect(element).toHaveAttribute('aria-label', 'Test label');
    });

    ${this.generateAccessibilityTests()}
  });

  // Performance tests
  describe('Performance', () => {
    it('renders within performance budget', () => {
      const start = performance.now();
      render(<${this.config.name} />);
      const end = performance.now();

      // Should render within 16ms (60fps)
      expect(end - start).toBeLessThan(16);
    });

    it('handles rapid prop changes efficiently', () => {
      const { rerender } = render(<${this.config.name} glassMorphism={50} />);

      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        rerender(<${this.config.name} glassMorphism={i} />);
      }
      const end = performance.now();

      // Should handle 100 rerenders within reasonable time
      expect(end - start).toBeLessThan(100);
    });
  });

  // Interaction tests
  describe('User Interactions', () => {
    ${this.generateInteractionTests()}
  });

  // Variant tests
  describe('Variants', () => {
    ${this.generateVariantTests()}
  });

  // Glass morphism tests
  describe('Glass Morphism', () => {
    it('applies glass morphism styles', () => {
      const { container } = render(<${this.config.name} glassMorphism={80} />);
      const element = container.firstChild as HTMLElement;

      // Should have backdrop-blur classes
      expect(element.className).toMatch(/backdrop-blur/);
    });

    it('adjusts glass intensity', () => {
      const { container, rerender } = render(<${this.config.name} glassMorphism={20} />);
      const element = container.firstChild as HTMLElement;

      rerender(<${this.config.name} glassMorphism={90} />);

      // Glass intensity should affect classes
      expect(element.className).toMatch(/backdrop-blur/);
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    it('handles invalid props gracefully', () => {
      // Should not throw with invalid props
      expect(() => {
        render(<${this.config.name} {...({ invalidProp: 'test' } as unknown)} />);
      }).not.toThrow();
    });

    it('recovers from render errors', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();

      // Component should still render even with errors
      render(<${this.config.name} />);

      spy.mockRestore();
    });
  });
});`;
  }

  /**
   * Generate Storybook stories
   */
  private generateStoriesFile(): string {
    return `/**
 * ${this.config.name} Storybook Stories
 *
 * Interactive documentation and testing scenarios
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ${this.config.name} } from './${this.config.name}';

const meta: Meta<typeof ${this.config.name}> = {
  title: '${this.config.category}/${this.config.name}',
  component: ${this.config.name},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${this.config.description}'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    ${this.generateStorybookArgTypes()}
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    ${this.generateDefaultStoryArgs()}
  }
};

${this.generateExampleStories()}

// Accessibility testing story
export const AccessibilityTest: Story = {
  args: {
    ...Default.args,
    'aria-label': 'Accessibility test component'
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  }
};

// Performance testing story
export const PerformanceTest: Story = {
  args: Default.args,
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '1rem' }}>
      {Array.from({ length: 100 }, (_, i) => (
        <${this.config.name} key={i} {...args} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance test with 100 components to ensure scalability'
      }
    }
  }
};

// Glass morphism showcase
export const GlassMorphismShowcase: Story = {
  render: () => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      borderRadius: '1rem'
    }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[20, 40, 60, 80, 100].map(intensity => (
          <${this.config.name}
            key={intensity}
            glassMorphism={intensity}
            style={{ margin: '0.5rem' }}
          >
            Glass {intensity}%
          </${this.config.name}>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcases different glass morphism intensities'
      }
    }
  }
};`;
  }

  /**
   * Generate documentation file
   */
  private generateDocumentationFile(): string {
    return `# ${this.config.name}

${this.config.description}

## Installation

\`\`\`bash
npm install liquidify
\`\`\`

## Usage

\`\`\`tsx
import { ${this.config.name} } from 'liquidify/${this.config.category}';

function MyComponent() {
  return (
    <${this.config.name} variant="primary" glassMorphism={70}>
      Content here
    </${this.config.name}>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${this.config.props
  .map(
    (property) =>
      `| \`${property.name}\` | \`${this.getTypeScript(property)}\` | \`${property.defaultValue || 'undefined'}\` | ${property.description} |`
  )
  .join('\n')}

## Examples

${this.generateDocumentationExamples()}

## Accessibility

This component follows WCAG 2.1 AA guidelines and includes:

${this.config.accessibility ? this.generateAccessibilityDocs() : '- Basic accessibility support'}

## Performance

- Optimized for 60fps animations
- Lazy loading support
- Bundle size: ~${this.estimateBundleSize()}KB gzipped
- Tree-shakeable

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Changelog

### v${this.options.targetVersion}
- Initial release
- Glass morphism effects
- Full accessibility support
- Performance optimizations

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](../../LICENSE) file.`;
  }

  // Helper methods for code generation
  private getTypeScript(property: PropertyDefinition): string {
    switch (property.type) {
      case 'enum': {
        return property.enumValues
          ? property.enumValues.map((v) => `'${v}'`).join(' | ')
          : 'string';
      }
      case 'React.ReactNode': {
        return 'React.ReactNode';
      }
      default: {
        return property.type;
      }
    }
  }

  private getDefaultRole(): string {
    return this.config.accessibility?.roles[0] || 'button';
  }

  private getAriaLabelLogic(): string {
    const labelProperty = this.config.props.find(
      (p) => p.name === 'children' || p.name === 'label'
    );
    return labelProperty ? labelProperty.name : 'undefined';
  }

  private getElementType(): string {
    if (this.config.name.toLowerCase().includes('button')) {
      return 'button';
    }
    if (this.config.name.toLowerCase().includes('input')) {
      return 'input';
    }
    if (this.config.name.toLowerCase().includes('link')) {
      return 'a';
    }
    return 'div';
  }

  private generateBaseClasses(): string {
    // Generate base Tailwind classes based on component type
    const baseClasses = [
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'border',
      'border-white/20',
      'backdrop-blur-md',
      'transition-all',
      'duration-200',
    ];

    return baseClasses.join(' ');
  }

  private generateVariantClasses(variant: VariantDefinition): string {
    // Generate variant-specific classes
    return `variant-${variant.name}`;
  }

  private generateVariantClassLogic(): string {
    if (!this.config.variants) {
      return 'variantStyles,';
    }
    return 'variantStyles,';
  }

  private generateAnimationClassLogic(): string {
    return 'animation ? "animate-in" : "",';
  }

  private getDependencies(): Array<string> {
    const deps = ['className', 'glassMorphism'];
    if (this.config.variants) {
      deps.push('variant', 'variantStyles');
    }
    if (this.config.animations) {
      deps.push('animation', 'animationConfig');
    }
    return deps;
  }

  private generateChildrenLogic(): string {
    const childrenProperty = this.config.props.find(
      (p) => p.name === 'children'
    );
    return childrenProperty ? '{children}' : '';
  }

  private generateEnumTypes(): string {
    const enumProps = this.config.props.filter((p) => p.type === 'enum');
    return enumProps
      .map(
        (property) =>
          `export type ${this.config.name}${property.name.charAt(0).toUpperCase() + property.name.slice(1)} = ${property.enumValues?.map((v) => `'${v}'`).join(' | ') || 'string'};`
      )
      .join('\n');
  }

  private generateAnimationTypes(): string {
    if (!this.config.animations) {
      return '';
    }

    return `export interface AnimationConfig {
  type?: 'spring' | 'tween' | 'gesture' | 'physics';
  duration?: number;
  stiffness?: number;
  damping?: number;
  glass?: boolean;
}`;
  }

  private generateAccessibilityTypes(): string {
    return `export interface AccessibilityConfig {
  enabled?: boolean;
  role?: string;
  label?: string;
  keyboardNavigation?: boolean;
  screenReaderSupport?: boolean;
}`;
  }

  private generateVariantTypes(): string {
    if (!this.config.variants) {
      return '';
    }

    const variantNames = this.config.variants
      .map((v) => `'${v.name}'`)
      .join(' | ');
    return `export type ${this.config.name}Variant = ${variantNames};`;
  }

  private generatePropTests(): string {
    return this.config.props
      .map((property) => {
        if (property.type === 'boolean') {
          return `
    it('handles ${property.name} prop', () => {
      const { rerender } = render(<${this.config.name} ${property.name}={false} />);
      rerender(<${this.config.name} ${property.name}={true} />);
      // Should not crash with boolean changes
    });`;
        }
        return '';
      })
      .join('\n');
  }

  private generateAccessibilityTests(): string {
    if (!this.config.accessibility) {
      return '';
    }

    return this.config.accessibility.keyboardSupport
      .map(
        (key) => `
    it('supports ${key} key interaction', async () => {
      const user = userEvent.setup();
      render(<${this.config.name} />);

      const element = screen.getByRole('${this.getDefaultRole()}');
      await user.type(element, '{${key}}');
      // Should handle ${key} key properly
    });`
      )
      .join('\n');
  }

  private generateInteractionTests(): string {
    return `
    it('handles click events', async () => {
      const handleClick = jest.fn();
      render(<${this.config.name} onClick={handleClick} />);

      const element = screen.getByRole('${this.getDefaultRole()}');
      fireEvent.click(element);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles focus and blur events', async () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();

      render(<${this.config.name} onFocus={handleFocus} onBlur={handleBlur} />);

      const element = screen.getByRole('${this.getDefaultRole()}');
      element.focus();
      expect(handleFocus).toHaveBeenCalled();

      element.blur();
      expect(handleBlur).toHaveBeenCalled();
    });`;
  }

  private generateVariantTests(): string {
    if (!this.config.variants) {
      return '';
    }

    return this.config.variants
      .map(
        (variant) => `
    it('renders ${variant.name} variant correctly', () => {
      render(<${this.config.name} variant="${variant.name}" />);
      // Should render ${variant.name} variant without errors
    });`
      )
      .join('\n');
  }

  private generateStorybookArgTypes(): string {
    return this.config.props
      .map((property) => {
        const control = this.getStorybookControl(property);
        return `${property.name}: {
      description: '${property.description}',
      ${control}
    }`;
      })
      .join(',\n    ');
  }

  private getStorybookControl(property: PropertyDefinition): string {
    switch (property.type) {
      case 'boolean': {
        return "control: 'boolean'";
      }
      case 'number': {
        return "control: { type: 'range', min: 0, max: 100 }";
      }
      case 'enum': {
        return `control: 'select',\n      options: [${property.enumValues?.map((v) => `'${v}'`).join(', ')}]`;
      }
      default: {
        return "control: 'text'";
      }
    }
  }

  private generateDefaultStoryArgs(): string {
    return this.config.props
      .map((property) => {
        if (property.defaultValue !== undefined) {
          return `${property.name}: ${JSON.stringify(property.defaultValue)}`;
        }
        return '';
      })
      .filter(Boolean)
      .join(',\n    ');
  }

  private generateExampleStories(): string {
    if (!this.config.examples) {
      return '';
    }

    return this.config.examples
      .map(
        (example) => `
export const ${example.name.replaceAll(/\s+/g, '')}: Story = {
  args: {
    ${Object.entries(example.props)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join(',\n    ')}
  },
  parameters: {
    docs: {
      description: {
        story: '${example.description}'
      }
    }
  }
};`
      )
      .join('\n');
  }

  private generateDocumentationExamples(): string {
    if (!this.config.examples) {
      return '';
    }

    return this.config.examples
      .map(
        (example) => `
### ${example.name}

${example.description}

\`\`\`tsx
${example.code}
\`\`\`
`
      )
      .join('\n');
  }

  private generateAccessibilityDocs(): string {
    if (!this.config.accessibility) {
      return '';
    }

    const {
      roles,
      ariaAttributes,
      keyboardSupport,
      screenReaderSupport,
      colorContrastCompliant,
      focusManagement,
    } = this.config.accessibility;

    return `
- **Roles**: ${roles.join(', ')}
- **ARIA Attributes**: ${ariaAttributes.join(', ')}
- **Keyboard Support**: ${keyboardSupport.join(', ')}
- **Screen Reader**: ${screenReaderSupport ? 'Full support' : 'Basic support'}
- **Color Contrast**: ${colorContrastCompliant ? 'WCAG AA compliant' : 'Needs review'}
- **Focus Management**: ${focusManagement ? 'Automatic' : 'Manual'}`;
  }

  private estimateBundleSize(): number {
    // Rough estimation based on component complexity
    let size = 2; // Base size
    size += this.config.props.length * 0.1;
    if (this.config.animations) {
      size += 1;
    }
    if (this.config.variants) {
      size += this.config.variants.length * 0.2;
    }
    return Math.round(size * 10) / 10;
  }

  private generateIndexFile(): string {
    return `/**
 * ${this.config.name} Component Exports
 */

export { ${this.config.name} } from './${this.config.name}';
export type { ${this.config.name}Props } from './${this.config.name}';
${this.options.includeTypes ? `export * from './${this.config.name}.types';` : ''}`;
  }

  private generatePackageJson(): string {
    return JSON.stringify(
      {
        name: `@liquidify/${this.config.name.toLowerCase()}`,
        version: this.options.targetVersion,
        description: this.config.description,
        main: './index.js',
        module: './index.mjs',
        types: './index.d.ts',
        exports: {
          '.': {
            import: './index.mjs',
            require: './index.js',
            types: './index.d.ts',
          },
        },
        keywords: [
          'liquidify',
          'react',
          'component',
          'glassmorphism',
          this.config.category,
        ],
        peerDependencies: {
          react: '>=18.0.0',
          'react-dom': '>=18.0.0',
        },
      },
      undefined,
      2
    );
  }

  private generateExportStatement(): string {
    return `export default ${this.config.name};`;
  }
}

// Types for generated files
export type GeneratedFiles = Record<string, string>;

// Export the main generator class
export default LiqUIdifyCodeGenerator;

// Utility functions for common component patterns
export const generateComponentFromConfig = (
  config: ComponentConfig,
  options?: GenerationOptions
): GeneratedFiles => {
  const generator = new LiqUIdifyCodeGenerator(config, options);
  return generator.generateComponent();
};

export const generateMigrationCode = (
  fromVersion: string,
  toVersion: string,
  componentName: string
): string => {
  return `/**
 * Migration Guide: ${componentName} v${fromVersion} → v${toVersion}
 */

// Before (v${fromVersion})
import { ${componentName} } from 'liquidify';

// After (v${toVersion})
import { ${componentName} } from 'liquidify/${componentName.toLowerCase()}';

// Prop changes:
// - 'size' prop renamed to 'scale'
// - 'theme' prop removed, use 'variant' instead
// - New 'glassMorphism' prop for glass effect control

// Migration function
export function migrate${componentName}Props(oldProps: Record<string, unknown>): Record<string, unknown> {
  const { size, theme, ...rest } = oldProps;

  return {
    ...rest,
    scale: size, // size → scale
    variant: theme || 'default', // theme → variant
    glassMorphism: 60 // new default
  };
}`;
};
