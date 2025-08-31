"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const liquidLabelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-white",
        secondary: "text-white/80",
        muted: "text-white/60",
        success: "text-green-400",
        warning: "text-yellow-400",
        danger: "text-red-400",
        ghost: "text-white/90",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      transform: {
        none: "",
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      weight: "medium",
      transform: "none",
    },
  }
);

const labelIndicatorVariants = cva("inline-flex items-center justify-center ml-1", {
  variants: {
    variant: {
      required: "text-red-400",
      optional: "text-white/50",
      info: "text-blue-400",
      success: "text-green-400",
      warning: "text-yellow-400",
      danger: "text-red-400",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "required",
    size: "sm",
  },
});

interface LiquidLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof liquidLabelVariants> {
  children?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  requiredIndicator?: React.ReactNode;
  optionalIndicator?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  error?: boolean;
  errorMessage?: React.ReactNode;
  success?: boolean;
  successMessage?: React.ReactNode;
  disabled?: boolean;
  animated?: boolean;
}

export const LiquidLabel = React.forwardRef<HTMLLabelElement, LiquidLabelProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      transform,
      children,
      required = false,
      optional = false,
      requiredIndicator = "*",
      optionalIndicator = "(optional)",
      description,
      tooltip,
      error = false,
      errorMessage,
      success = false,
      successMessage,
      disabled = false,
      animated = false,
      htmlFor,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Determine variant based on state
    const computedVariant = React.useMemo(() => {
      if (error) return "danger";
      if (success) return "success";
      if (disabled) return "muted";
      return variant;
    }, [error, success, disabled, variant]);

    // Required/Optional indicator
    const renderIndicator = () => {
      if (required) {
        return (
          <span className={cn(labelIndicatorVariants({ variant: "required", size }))}>
            {requiredIndicator}
          </span>
        );
      }

      if (optional) {
        return (
          <span className={cn(labelIndicatorVariants({ variant: "optional", size }))}>
            {optionalIndicator}
          </span>
        );
      }

      return null;
    };

    // Info icon for tooltip
    const InfoIcon = () => (
      <svg
        className="h-4 w-4 ml-1 text-white/60 hover:text-white/80 cursor-help"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    );

    // Success icon
    const SuccessIcon = () => (
      <svg
        className={cn(labelIndicatorVariants({ variant: "success", size }))}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );

    // Error icon
    const ErrorIcon = () => (
      <svg
        className={cn(labelIndicatorVariants({ variant: "danger", size }))}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    );

    return (
      <div className="space-y-1">
        <label
          ref={ref}
          className={cn(
            liquidLabelVariants({ variant: computedVariant, size, weight, transform }),
            animated && "transition-all duration-200",
            isHovered && animated && "scale-[1.02]",
            disabled && "cursor-not-allowed opacity-50",
            "cursor-pointer inline-flex items-center",
            className
          )}
          htmlFor={htmlFor}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          <span className="flex items-center">
            {children}
            {renderIndicator()}

            {/* Status icons */}
            {success && !error && <SuccessIcon />}
            {error && <ErrorIcon />}

            {/* Tooltip icon */}
            {tooltip && (
              <div className="relative group">
                <InfoIcon />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                  <div className="bg-black/80 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap backdrop-blur-sm">
                    {tooltip}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                  </div>
                </div>
              </div>
            )}
          </span>
        </label>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "text-white/60 leading-relaxed",
              size === "xs" && "text-xs",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
              size === "xl" && "text-lg",
              disabled && "opacity-50"
            )}
          >
            {description}
          </p>
        )}

        {/* Success message */}
        {success && successMessage && (
          <p
            className={cn(
              "text-green-400 leading-relaxed flex items-center",
              size === "xs" && "text-xs",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
              size === "xl" && "text-lg"
            )}
          >
            <svg
              className="h-3 w-3 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {successMessage}
          </p>
        )}

        {/* Error message */}
        {error && errorMessage && (
          <p
            className={cn(
              "text-red-400 leading-relaxed flex items-center",
              size === "xs" && "text-xs",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
              size === "xl" && "text-lg"
            )}
          >
            <svg
              className="h-3 w-3 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

LiquidLabel.displayName = "LiquidLabel";

// Fieldset component for grouping related form controls
interface LiquidFieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactNode;
  description?: React.ReactNode;
  error?: boolean;
  errorMessage?: React.ReactNode;
  success?: boolean;
  successMessage?: React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "bordered" | "ghost";
}

const fieldsetVariants = cva("space-y-4", {
  variants: {
    variant: {
      default: "",
      bordered: "border border-white/20 rounded-lg p-4 bg-white/5",
      ghost: "bg-white/2 rounded-lg p-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const legendVariants = cva("font-semibold text-white mb-2", {
  variants: {
    variant: {
      default: "text-base",
      bordered: "text-base px-2 -ml-2",
      ghost: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const LiquidFieldset = React.forwardRef<HTMLFieldSetElement, LiquidFieldsetProps>(
  (
    {
      className,
      legend,
      description,
      error = false,
      errorMessage,
      success = false,
      successMessage,
      disabled = false,
      variant = "default",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <fieldset
        ref={ref}
        className={cn(
          fieldsetVariants({ variant }),
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {legend && <legend className={cn(legendVariants({ variant }))}>{legend}</legend>}

        {description && (
          <p className="text-sm text-white/60 leading-relaxed -mt-1 mb-3">{description}</p>
        )}

        <div className="space-y-4">{children}</div>

        {/* Success message */}
        {success && successMessage && (
          <p className="text-green-400 text-sm leading-relaxed flex items-center mt-2">
            <svg
              className="h-3 w-3 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {successMessage}
          </p>
        )}

        {/* Error message */}
        {error && errorMessage && (
          <p className="text-red-400 text-sm leading-relaxed flex items-center mt-2">
            <svg
              className="h-3 w-3 mr-1 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {errorMessage}
          </p>
        )}
      </fieldset>
    );
  }
);

LiquidFieldset.displayName = "LiquidFieldset";

export {
  liquidLabelVariants,
  labelIndicatorVariants,
  fieldsetVariants,
  legendVariants,
  type LiquidLabelProps,
};
