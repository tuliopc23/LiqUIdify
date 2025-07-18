/**
 * Factory for creating type-safe polymorphic Glass UI components
 */

import { forwardRef, ElementType } from 'react';
import { 
  PolymorphicComponent, 
  PolymorphicComponentPropsWithRef,
  isInteractiveElement
} from '../types/polymorphic';
import { cn } from '../lib/glass-utils';

/**
 * Configuration for creating polymorphic components
 */
export interface CreatePolymorphicComponentConfig<
  Props extends Record<string, any>,
  DefaultElement extends ElementType
> {
  /** Default element type when 'as' prop is not provided */
  defaultElement: DefaultElement;
  
  /** Display name for React DevTools */
  displayName: string;
  
  /** Base class names always applied */
  baseClassName?: string;
  
  /** Function to generate class names based on props */
  getClassName?: (props: Props) => string;
  
  /** Function to get default props */
  getDefaultProps?: () => Partial<Props>;
  
  /** Validate props before rendering */
  validateProps?: (props: Props & { as?: ElementType }) => void;
  
  /** Transform props before passing to element */
  transformProps?: (props: Props) => Props;
  
  /** Whether component should forward ref */
  forwardRef?: boolean;
}

/**
 * Creates a type-safe polymorphic component with Glass UI styling
 * 
 * @example
 * ```tsx
 * interface ButtonProps {
 *   variant?: 'primary' | 'secondary';
 *   size?: 'sm' | 'md' | 'lg';
 *   glassIntensity?: 'weak' | 'medium' | 'strong';
 * }
 * 
 * const GlassButton = createPolymorphicComponent<ButtonProps, 'button'>({
 *   defaultElement: 'button',
 *   displayName: 'GlassButton',
 *   baseClassName: 'glass-button',
 *   getClassName: ({ variant, size }) => cn(
 *     variant && `glass-button-${variant}`,
 *     size && `glass-button-${size}`
 *   ),
 *   getDefaultProps: () => ({
 *     variant: 'primary',
 *     size: 'md',
 *     glassIntensity: 'medium'
 *   }),
 *   validateProps: (props) => {
 *     if (props.as === 'a' && !props.href) {
 *       console.warn('GlassButton: When using as="a", href prop is required');
 *     }
 *   }
 * });
 * 
 * // Usage
 * <GlassButton variant="primary">Click me</GlassButton>
 * <GlassButton as="a" href="/home">Navigate</GlassButton>
 * <GlassButton as={Link} to="/about">Router Link</GlassButton>
 * ```
 */
export function createPolymorphicComponent<
  Props extends Record<string, any>,
  DefaultElement extends ElementType = 'div'
>(
  config: CreatePolymorphicComponentConfig<Props, DefaultElement>
): PolymorphicComponent<Props, DefaultElement> {
  const {
    defaultElement,
    displayName,
    baseClassName = '',
    getClassName,
    getDefaultProps,
    validateProps,
    transformProps,
    forwardRef: shouldForwardRef = true
  } = config;

  const Component = forwardRef<
    any,
    PolymorphicComponentPropsWithRef<DefaultElement, Props>
  >(function PolymorphicComponent(props, ref) {
    // Merge with default props
    const defaultProps = getDefaultProps?.() || {};
    const mergedProps = { ...defaultProps, ...props };
    
    const {
      as: Element = defaultElement,
      className,
      children,
      ...restProps
    } = mergedProps;

    // Validate props
    if (process.env.NODE_ENV !== 'production') {
      validateProps?.(mergedProps as Props & { as?: ElementType });
      
      // Additional built-in validations
      if (isInteractiveElement(Element) && restProps.disabled && !restProps['aria-disabled']) {
        console.warn(
          `${displayName}: Consider using aria-disabled instead of disabled for better accessibility`
        );
      }
      
      if (Element === 'img' && !restProps.alt) {
        console.warn(`${displayName}: Image elements must have an alt attribute`);
      }
    }

    // Transform props if needed
    const transformedProps = transformProps ? transformProps(restProps as Props) : restProps;

    // Generate class names
    const componentClassName = getClassName?.(transformedProps as Props) || '';
    const finalClassName = cn(baseClassName, componentClassName, className);

    // Type assertion for props spreading
    const elementProps = {
      ...transformedProps,
      className: finalClassName,
      ref: shouldForwardRef ? ref : undefined
    } as any;

    return (
      <Element {...elementProps}>
        {children}
      </Element>
    );
  });

  Component.displayName = displayName;

  // Return the component with proper typing
  return Component as unknown as PolymorphicComponent<Props, DefaultElement>;
}

/**
 * Creates a polymorphic component with Glass UI effects
 * 
 * @example
 * ```tsx
 * const GlassCard = createGlassPolymorphicComponent<CardProps>({
 *   defaultElement: 'div',
 *   displayName: 'GlassCard',
 *   glassConfig: {
 *     intensity: 'medium',
 *     blur: true,
 *     borderGlow: true
 *   }
 * });
 * ```
 */
export interface GlassPolymorphicConfig<
  Props extends Record<string, any>,
  DefaultElement extends ElementType
> extends CreatePolymorphicComponentConfig<Props, DefaultElement> {
  /** Glass effect configuration */
  glassConfig?: {
    intensity?: 'weak' | 'medium' | 'strong';
    blur?: boolean;
    borderGlow?: boolean;
    interactive?: boolean;
  };
}

export function createGlassPolymorphicComponent<
  Props extends Record<string, any>,
  DefaultElement extends ElementType = 'div'
>(
  config: GlassPolymorphicConfig<Props, DefaultElement>
): PolymorphicComponent<Props, DefaultElement> {
  const {
    glassConfig = {},
    baseClassName = '',
    getClassName,
    ...restConfig
  } = config;

  const {
    intensity = 'medium',
    blur = true,
    borderGlow = false,
    interactive = false
  } = glassConfig;

  // Enhance with glass classes
  const enhancedConfig: CreatePolymorphicComponentConfig<Props, DefaultElement> = {
    ...restConfig,
    baseClassName: cn(
      'glass-effect',
      `glass-${intensity}`,
      blur && 'glass-blur',
      borderGlow && 'glass-border-glow',
      interactive && 'glass-interactive',
      baseClassName
    ),
    getClassName: (props) => {
      const customClassName = getClassName?.(props) || '';
      return cn(customClassName);
    }
  };

  return createPolymorphicComponent(enhancedConfig);
}

/**
 * Type helper for creating slot-based compound components
 * 
 * @example
 * ```tsx
 * const CardSlots = createPolymorphicSlots({
 *   Root: { defaultElement: 'article', displayName: 'Card.Root' },
 *   Header: { defaultElement: 'header', displayName: 'Card.Header' },
 *   Body: { defaultElement: 'div', displayName: 'Card.Body' },
 *   Footer: { defaultElement: 'footer', displayName: 'Card.Footer' }
 * });
 * ```
 */
export function createPolymorphicSlots<
  Slots extends Record<string, { 
    defaultElement: ElementType; 
    displayName: string;
    props?: Record<string, any>;
  }>
>(
  slots: Slots
): {
  [K in keyof Slots]: PolymorphicComponent<
    Slots[K]['props'] extends Record<string, any> ? Slots[K]['props'] : {},
    Slots[K]['defaultElement']
  >
} {
  const components = {} as any;

  Object.entries(slots).forEach(([key, config]) => {
    components[key] = createPolymorphicComponent({
      defaultElement: config.defaultElement,
      displayName: config.displayName,
      baseClassName: `glass-${key.toLowerCase()}`
    });
  });

  return components;
}