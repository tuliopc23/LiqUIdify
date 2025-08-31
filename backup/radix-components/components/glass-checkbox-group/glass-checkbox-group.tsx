import type React from "react";
import { forwardRef, useCallback, useId, useState } from "react";
import type { ComponentPropsBuilder, FormGlassProps } from "../../core/base-component";
import { cn } from "../../core/utils/classname";
import { createVariants as cva } from "../../lib/variant-system";

const checkboxGroupVariants = cva({
  base: "space-y-3",
  variants: {
    groupSize: {
      sm: "space-y-2",
      md: "space-y-3",
      lg: "space-y-4",
    },
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row flex-wrap gap-4",
    },
  },
  defaultVariants: {
    groupSize: "md",
    orientation: "vertical",
  },
});

const checkboxItemVariants = cva({
  base: "flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-all duration-200 hover:/5",
  variants: {
    itemSize: {
      sm: "p-1.5 space-x-2",
      md: "p-2 space-x-3",
      lg: "p-3 space-x-4",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
      false: "cursor-pointer",
    },
  },
  defaultVariants: {
    itemSize: "md",
    disabled: "false",
  },
});

const checkboxInputVariants = cva({
  base: "rounded border-2 border-blue-300/20 /5 backdrop-blur-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-0 checked:border-blue-500 checked:/20",
  variants: {
    inputSize: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

type CheckboxGroupSize = "sm" | "md" | "lg";

interface GlassCheckboxGroupProps
  extends Omit<ComponentPropsBuilder<HTMLDivElement>, "onChange">,
    Pick<
      FormGlassProps,
      | "glassEffect"
      | "animation"
      | "disableAnimations"
      | "variant"
      | "name"
      | "required"
      | "error"
      | "errorMessage"
      | "helperText"
      | "label"
      | "disabled"
    > {
  /** Component size */
  size?: CheckboxGroupSize;
  /** Orientation of the checkbox group */
  orientation?: "vertical" | "horizontal";
  /** Checkbox options to display */
  options: CheckboxOption[];
  /** Controlled value */
  value?: string[];
  /** Default value for uncontrolled usage */
  defaultValue?: string[];
  /** Change event handler */
  onChange?: (value: string[]) => void;
  /** Group description */
  description?: string;
  /** Enable physics animations */
  physics?: boolean;
  /** Enable magnetic hover effects */
  magnetic?: boolean;
  /** Enable sound feedback */
  hapticFeedback?: boolean;
  /** Maximum selections allowed */
  maxSelections?: number;
  /** Minimum selections required */
  minSelections?: number;
  /** Enable select all/none functionality */
  allowSelectAll?: boolean;
  /** Custom validation function */
  validate?: (value: string[]) => string | null;
  /** Live validation mode */
  validateOnChange?: boolean;
}

const GlassCheckboxGroup = forwardRef<HTMLDivElement, GlassCheckboxGroupProps>(
  (
    {
      className,
      options,
      value,
      defaultValue = [],
      onChange,
      name,
      label,
      description,
      error,
      required = false,
      disabled = false,
      size = "md",
      orientation = "vertical",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string[]>(value || defaultValue);
    const groupId = useId();
    const descriptionId = useId();
    const errorId = useId();

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = useCallback(
      (optionValue: string, checked: boolean) => {
        const newValue = checked
          ? [...currentValue, optionValue]
          : currentValue.filter((v) => v !== optionValue);

        if (value === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [currentValue, value, onChange]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent, optionValue: string) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          const isChecked = currentValue.includes(optionValue);
          handleChange(optionValue, !isChecked);
        }
      },
      [currentValue, handleChange]
    );

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {/* Label */}
        {label && (
          <label
            id={groupId}
            className={cn(
              "block font-medium text-blue-900-inverse",
              size === "sm" && "text-sm",
              size === "lg" && "text-lg"
            )}
          >
            {label}
            {required && <span className="ml-1 text-blue-600">*</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className={cn(
              "text-blue-900-inverse/70",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base"
            )}
          >
            {description}
          </p>
        )}

        {/* Checkbox Group */}
        <div
          role="group"
          aria-labelledby={label ? groupId : undefined}
          aria-describedby={
            description || error ? cn(description && descriptionId, error && errorId) : undefined
          }
          aria-required={required}
          aria-invalid={!!error}
          className={cn(
            checkboxGroupVariants({
              groupSize: size,
              orientation,
            } as any)
          )}
        >
          {options.map((option) => {
            const isChecked = currentValue.includes(option.value);
            const isDisabled = disabled || option.disabled;
            const checkboxId = `${groupId}-${option.value}`;

            return (
              <label
                key={option.value}
                htmlFor={checkboxId}
                className={cn(
                  checkboxItemVariants({
                    ...({ itemSize: size } as any),
                    disabled: isDisabled ? "true" : "false",
                  })
                )}
              >
                <input
                  type="checkbox"
                  id={checkboxId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  onKeyDown={(e) => handleKeyDown(e, option.value)}
                  className={cn(checkboxInputVariants({ inputSize: size } as any))}
                  aria-describedby={option.description ? `${checkboxId}-desc` : undefined}
                />

                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "text-blue-900-inverse",
                      size === "sm" && "text-sm",
                      size === "lg" && "text-lg",
                      isDisabled && "text-blue-900-inverse/50"
                    )}
                  >
                    {option.label}
                  </span>
                  {option.description && (
                    <p
                      id={`${checkboxId}-desc`}
                      className={cn(
                        "text-blue-900-inverse/60",
                        size === "sm" && "text-xs",
                        size === "md" && "text-sm",
                        size === "lg" && "text-base",
                        isDisabled && "text-blue-900-inverse/30"
                      )}
                    >
                      {option.description}
                    </p>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className={cn(
              "text-blue-600",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base"
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

GlassCheckboxGroup.displayName = "GlassCheckboxGroup";

export { GlassCheckboxGroup };
export default GlassCheckboxGroup;
