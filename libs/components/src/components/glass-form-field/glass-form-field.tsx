import { AlertCircle, CheckCircle, Info } from "lucide-react";
import React, { forwardRef, useId, useRef, useEffect, useCallback } from "react";
import { cn } from "@/core/utils/classname";
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from "../../lib/variant-system";
import { AccessibilityManager } from "@/core/accessibility-manager";
import { useGlassStateTransitions } from "@/hooks/use-glass-animations";
import { 
  generateGlassClasses, 
  generateGlassVariables 
} from "@/core/glass/unified-glass-system";
import type { 
  ComponentPropsBuilder,
  FormGlassProps 
} from "@/core/base-component";

const formFieldVariants = cva({
  base: "space-y-2 transition-all duration-200",
  variants: {
    variant: {
      default: "",
      card: "rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm",
      inline: "flex items-center space-x-4 space-y-0",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const labelVariants = cva({
  base: "block font-medium text-white/90 transition-colors duration-200",
  variants: {
    required: {
      true: "after:ml-1 after:text-red-400 after:content-['*']",
      false: "",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    required: false,
    size: "md",
  },
});

const helperTextVariants = cva({
  base: "flex items-center gap-1.5 text-xs transition-colors duration-200",
  variants: {
    state: {
      default: "text-white/60",
      error: "text-red-400",
      success: "text-green-400",
      warning: "text-yellow-400",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

interface GlassFormFieldProps
  extends ComponentPropsBuilder<HTMLDivElement>,
    VariantProps<typeof formFieldVariants>,
    Pick<FormGlassProps, 
      "glassEffect" | "animation" | "disableAnimations" | "variant" | "size" |
      "required" | "error" | "errorMessage" | "helperText" | "label" | "disabled" |
      "hapticFeedback" | "hover" | "ripple"
    > {
  /** Helper text to display below the field */
  helperText?: string;
  /** Success message to display */
  success?: string;
  /** Warning message to display */
  warning?: string;
  /** Form field children */
  children: React.ReactNode;
  /** HTML for attribute - will be auto-generated if not provided */
  htmlFor?: string;
  /** Enable live validation announcements */
  liveValidation?: boolean;
  /** Custom validation state */
  validationState?: "default" | "error" | "success" | "warning";
  /** Enable glass physics animations */
  physics?: boolean;
  /** Enable magnetic hover effects */
  magnetic?: boolean;
  /** Focus management options */
  focusOptions?: {
    /** Auto-focus on mount */
    autoFocus?: boolean;
    /** Focus on error */
    focusOnError?: boolean;
    /** Prevent scroll on focus */
    preventScroll?: boolean;
  };
}

const GlassFormField = forwardRef<HTMLDivElement, GlassFormFieldProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      label,
      helperText,
      error,
      errorMessage,
      success,
      warning,
      required = false,
      children,
      htmlFor,
      disabled = false,
      glassEffect = { intensity: "medium", blur: true, backdrop: true },
      animation = "normal",
      disableAnimations = false,
      liveValidation = true,
      validationState,
      physics = false,
      magnetic = false,
      focusOptions = {},
      hapticFeedback = false,
      hover = true,
      ripple = false,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const fieldRef = useRef<HTMLElement>(null);
    const accessibilityManager = AccessibilityManager.getInstance();
    const { transitionToState, currentState } = useGlassStateTransitions(animation);
    
    const fieldId = useId();
    const messageId = useId();
    const descriptionId = useId();
    const finalId = htmlFor || fieldId;

    // Determine state and message with priority: error > warning > success > default
    const state = validationState || (error || errorMessage
      ? "error"
      : warning
        ? "warning"
        : success
          ? "success"
          : "default");
    const message = error || errorMessage || warning || success || helperText;

    // Accessibility and validation effects
    useEffect(() => {
      if (!containerRef.current) return;
      
      // Validate accessibility when component mounts or updates
      const validateAccessibility = async () => {
        try {
          const report = await accessibilityManager.validateComponent(
            containerRef.current!,
            {
              name: "GlassFormField",
              type: "form-field",
              props: { label, required, error: !!error, disabled }
            }
          );
          
          // Announce validation errors for screen readers
          if (liveValidation && report.violations.length > 0) {
            accessibilityManager.announce(
              `Form field has ${report.violations.length} accessibility issues`,
              "polite"
            );
          }
        } catch (err) {
          // Accessibility validation failed, but don't break the component
          console.warn('Accessibility validation failed:', err);
        }
      };
      
      validateAccessibility();
    }, [error, errorMessage, label, required, disabled, liveValidation]);
    
    // Error announcement for screen readers
    useEffect(() => {
      if (liveValidation && (error || errorMessage) && state === "error") {
        accessibilityManager.announce(
          `Error: ${error || errorMessage}`,
          "assertive"
        );
      }
    }, [error, errorMessage, state, liveValidation]);
    
    // Focus management
    useEffect(() => {
      if (focusOptions.focusOnError && (error || errorMessage) && fieldRef.current) {
        fieldRef.current.focus({ 
          preventScroll: focusOptions.preventScroll 
        });
      }
    }, [error, errorMessage, focusOptions.focusOnError, focusOptions.preventScroll]);
    
    // Glass effect generation
    const glassClasses = generateGlassClasses({
      variant: variant as any,
      intensity: glassEffect?.intensity,
      state: currentState,
      glassEffect,
    });
    
    const glassVariables = generateGlassVariables({
      intensity: glassEffect?.intensity,
      config: {
        animation: { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
        ...glassEffect,
      },
    });
    
    // Event handlers for glass effects
    const handleMouseEnter = useCallback(() => {
      if (hover && !disabled && !disableAnimations) {
        transitionToState("hover");
      }
    }, [hover, disabled, disableAnimations, transitionToState]);
    
    const handleMouseLeave = useCallback(() => {
      if (hover && !disabled && !disableAnimations) {
        transitionToState("idle");
      }
    }, [hover, disabled, disableAnimations, transitionToState]);

    // Get appropriate icon
    const getIcon = () => {
      switch (state) {
        case "error": {
          return <AlertCircle className="h-3 w-3 flex-shrink-0" aria-hidden="true" />;
        }
        case "success": {
          return <CheckCircle className="h-3 w-3 flex-shrink-0" aria-hidden="true" />;
        }
        case "warning": {
          return <Info className="h-3 w-3 flex-shrink-0" aria-hidden="true" />;
        }
        default: {
          return;
        }
      }
    };

    // Clone children to add proper IDs and aria attributes
    const enhancedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          ...child.props,
          id: finalId,
          "aria-describedby": message ? `${finalId}-message` : undefined,
          "aria-invalid": error ? true : undefined,
          "aria-required": required || undefined,
          disabled,
        });
      }
      return child;
    });

    // Combine refs for proper forwarding
    const combinedRef = useCallback((node: HTMLDivElement | null) => {
      if (containerRef.current !== node) {
        containerRef.current = node;
      }
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);

    return (
      <div
        ref={combinedRef}
        className={cn(
          formFieldVariants({ variant, size }),
          glassClasses,
          disabled && "cursor-not-allowed opacity-50",
          !disableAnimations && "will-change-transform",
          className,
        )}
        style={{
          ...glassVariables,
          ...props.style,
        } as React.CSSProperties}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-testid={props["data-testid"] || "glass-form-field"}
        {...props}
      >
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              labelVariants({ required, size }),
              disabled && "cursor-not-allowed",
            )}
          >
            {label}
          </label>
        )}

        <div
          className={cn(variant === "inline" ? "flex-1" : "w-full", "relative")}
        >
          {enhancedChildren}
        </div>

        {message && (
          <div
            id={`${finalId}-message`}
            className={cn(helperTextVariants({ state }))}
            role={error ? "alert" : undefined}
            aria-live={error ? "polite" : undefined}
          >
            {getIcon()}

            <span className="flex-1">{message}</span>
          </div>
        )}
      </div>
    );
  },
);

GlassFormField.displayName = "GlassFormField";

export { GlassFormField };
export type { GlassFormFieldProps };
