/**
 * Factory for creating type-safe polymorphic Glass UI components
 */

import { type ElementType, forwardRef } from "react";

import { cn } from "@/core/utils/classname";
import type {
  PolymorphicComponent,
  PolymorphicComponentPropsWithRef,
} from "../types/polymorphic";
import { isInteractiveElement } from "../types/polymorphic";

/**
 * Configuration for creating polymorphic components
 */
interface CreatePolymorphicComponentConfig<
  Props extends Record<string, unknown>,
  DefaultElement extends ElementType,
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
 *       // Logging disabled
 *     }
 *   }
 * });
 *
 * // Usage
 * <GlassButton type="button" variant="primary">Click me</GlassButton>
 * <GlassButton as="a" href="/home">Navigate</GlassButton>
 * <GlassButton as={Link} to="/about">Router Link</GlassButton>
 * ```
 */
function createPolymorphicComponent<
  Props extends Record<string, unknown>,
  DefaultElement extends ElementType = "div",
>(
  config: CreatePolymorphicComponentConfig<Props, DefaultElement>,
): PolymorphicComponent<Props, DefaultElement> {
  const {
    defaultElement,
    displayName,
    baseClassName = "",
    getClassName,
    getDefaultProps,
    validateProps,
    transformProps,
    forwardRef: shouldForwardRef = true,
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
      key,
      ...restProps
    } = mergedProps;

    // Cast Element to ensure it's recognized as a valid JSX element constructor
    const ElementComponent = Element as React.ElementType;

    // Validate props
    if (process.env.NODE_ENV !== "production") {
      validateProps?.(mergedProps as Props & { as?: ElementType });

      // Additional built-in validations
      if (
        isInteractiveElement(ElementComponent) &&
        restProps.disabled &&
        !restProps["aria-disabled"]
      ) {
        // Logging disabled
      }

      if (ElementComponent === "img" && !restProps.alt) {
        // Logging disabled
      }
    }

    // Transform props if needed
    const transformedProps = transformProps
      ? transformProps(restProps as unknown as Props)
      : restProps;

    // Generate class names
    const componentClassName = getClassName?.(transformedProps as Props) || "";
    const finalClassName = cn(baseClassName, componentClassName, className);

    // Type assertion for props spreading
    const elementProps = {
      ...transformedProps,
      className: finalClassName,
      ref: shouldForwardRef ? ref : null,
    };

    return (
      <ElementComponent key={key} {...elementProps}>
        {children}
      </ElementComponent>
    ) as React.ReactElement;
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
interface GlassPolymorphicConfig<
  Props extends Record<string, unknown>,
  DefaultElement extends ElementType,
> extends CreatePolymorphicComponentConfig<Props, DefaultElement> {
  /** Glass effect configuration */
  glassConfig?: {
    intensity?: "weak" | "medium" | "strong";
    blur?: boolean;
    borderGlow?: boolean;
    interactive?: boolean;
  };
}

function createGlassPolymorphicComponent<
  Props extends Record<string, unknown>,
  DefaultElement extends ElementType = "div",
>(
  config: GlassPolymorphicConfig<Props, DefaultElement>,
): PolymorphicComponent<Props, DefaultElement> {
  const {
    glassConfig = {},
    baseClassName = "",
    getClassName,
    ...restConfig
  } = config;

  const {
    intensity = "medium",
    blur = true,
    borderGlow = false,
    interactive = false,
  } = glassConfig;

  // Enhance with glass classes
  const enhancedConfig: CreatePolymorphicComponentConfig<
    Props,
    DefaultElement
  > = {
    ...restConfig,
    baseClassName: cn(
      "glass-effect",
      `glass-${intensity}`,
      blur && "glass-blur",
      borderGlow && "glass-border-glow",
      interactive && "glass-interactive",
      baseClassName,
    ),
    getClassName: (props) => {
      const customClassName = getClassName?.(props) || "";
      return cn(customClassName);
    },
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
function createPolymorphicSlots<
  Slots extends Record<
    string,
    {
      defaultElement: ElementType;
      displayName: string;
      props?: Record<string, unknown>;
    }
  >,
>(
  slots: Slots,
): {
  [K in keyof Slots]: PolymorphicComponent<
    Slots[K]["props"] extends Record<string, unknown> ? Slots[K]["props"] : {},
    Slots[K]["defaultElement"]
  >;
} {
  const components = {} as unknown;

  for (const [key, config] of Object.entries(slots)) {
    components[key] = createPolymorphicComponent({
      defaultElement: config.defaultElement,
      displayName: config.displayName,
      baseClassName: `glass-${key.toLowerCase()}`,
    });
  }

  return components;
}
