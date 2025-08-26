import { Minus, Plus } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  cn,
  focusRing,
  getGlassClass,
  microInteraction,
} from "@/core/utils/classname";
import { createVariants as cva } from "../../lib/variant-system";

const numberInputVariants = cva({
  base: "relative w-full",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const inputVariants = cva({
  base: cn(
    "w-full rounded-xl border px-4 py-3 transition-all duration-200",
    "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]",
    getGlassClass("default"),
    focusRing,
    "disabled:cursor-not-allowed disabled:opacity-50",
    "text-center font-mono",
    microInteraction.gentle,
  ),
  variants: {
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    },
    error: {
      true: "border-liquid-accent/50 focus:border-liquid-accent",
      false:
        "border-[var(--liquid-glass-border)] focus:border-[var(--liquid-glass-border-focus)]",
    },
  },
  defaultVariants: {
    size: "md",
    error: "false",
  },
});

const buttonVariants = cva({
  base: cn(
    "absolute top-1/2 -translate-y-1/2 flex items-center justify-center liquid-glass liquid-glass-interactive",
    "rounded-lg border-liquid-accent/30",
    "transition-all duration-200 hover:border-liquid-accent/50 focus:border-liquid-accent/60",
    "focus:outline-none focus:ring-2 focus:ring-liquid-accent/50",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "text-liquid-text hover:text-liquid-accent",
    microInteraction.gentle,
  ),
  variants: {
    size: {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
    },
    position: {
      left: "left-2",
      right: "right-2",
    },
  },
  defaultVariants: {
    size: "md",
    position: "left",
  },
});

interface GlassNumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "size"
  > {
  size?: "sm" | "md" | "lg";
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  formatValue?: (value: number) => string;
  parseValue?: (value: string) => number;
  error?: boolean;
  helperText?: string;
  showControls?: boolean;
  allowEmpty?: boolean;
  label?: string;
  description?: string;
}

const GlassNumberInput = forwardRef<HTMLInputElement, GlassNumberInputProps>(
  (
    {
      className,
      size,
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      precision = 0,
      formatValue,
      parseValue,
      error = false,
      helperText,
      showControls = true,
      allowEmpty = false,
      label,
      description,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<number | undefined>(
      value !== undefined ? value : defaultValue,
    );
    const [displayValue, setDisplayValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const labelId = useId();
    const descriptionId = useId();
    const helperTextId = useId();

    const currentValue = value !== undefined ? value : internalValue;

    // Format number for display
    const formatNumber = useCallback(
      (num: number | undefined): string => {
        if (num === undefined) return "";
        if (formatValue) return formatValue(num);
        return precision > 0 ? num.toFixed(precision) : num.toString();
      },
      [formatValue, precision],
    );

    // Parse string to number
    const parseNumber = useCallback(
      (str: string): number | undefined => {
        if (str === "" && allowEmpty) return undefined;
        if (parseValue) return parseValue(str);
        const parsed = Number.parseFloat(str);
        return Number.isNaN(parsed) ? undefined : parsed;
      },
      [parseValue, allowEmpty],
    );

    // Update display value when value changes
    useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatNumber(currentValue));
      }
    }, [currentValue, formatNumber, isFocused]);

    // Initialize display value
    useEffect(() => {
      setDisplayValue(formatNumber(currentValue));
    }, []);

    // Validate number against constraints
    const validateNumber = useCallback(
      (num: number | undefined): number | undefined => {
        if (num === undefined) return allowEmpty ? undefined : 0;

        let validatedNum = num;

        if (min !== undefined && validatedNum < min) {
          validatedNum = min;
        }
        if (max !== undefined && validatedNum > max) {
          validatedNum = max;
        }

        if (precision > 0) {
          validatedNum = Number.parseFloat(validatedNum.toFixed(precision));
        }

        return validatedNum;
      },
      [min, max, precision, allowEmpty],
    );

    // Handle value change
    const handleValueChange = useCallback(
      (newValue: number | undefined) => {
        const validatedValue = validateNumber(newValue);

        if (value === undefined) {
          setInternalValue(validatedValue);
        }

        onChange?.(validatedValue);
      },
      [value, onChange, validateNumber],
    );

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      const parsedValue = parseNumber(inputValue);
      if (parsedValue !== undefined || allowEmpty) {
        handleValueChange(parsedValue);
      }
    };

    // Handle input focus
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    // Handle input blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setDisplayValue(formatNumber(currentValue));
      props.onBlur?.(e);
    };

    // Handle increment
    const handleIncrement = () => {
      if (disabled) return;

      const newValue = (currentValue || 0) + step;
      handleValueChange(newValue);
      inputRef.current?.focus();
    };

    // Handle decrement
    const handleDecrement = () => {
      if (disabled) return;

      const newValue = (currentValue || 0) - step;
      handleValueChange(newValue);
      inputRef.current?.focus();
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowUp": {
          e.preventDefault();
          handleIncrement();
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          handleDecrement();
          break;
        }
        case "Enter": {
          e.preventDefault();
          const parsedValue = parseNumber(displayValue);
          if (parsedValue !== undefined || allowEmpty) {
            handleValueChange(parsedValue);
          }
          break;
        }
      }

      props.onKeyDown?.(e);
    };

    // Check if increment/decrement should be disabled
    const canIncrement =
      !disabled && (max === undefined || (currentValue || 0) < max);
    const canDecrement =
      !disabled && (min === undefined || (currentValue || 0) > min);

    // Combine refs
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <div
        className={cn(
          numberInputVariants({
            size: size as "sm" | "md" | "lg",
          } as any),
          className,
        )}
      >
        {/* Label */}
        {label && (
          <label
            id={labelId}
            htmlFor={props.id}
            className={cn(
              "mb-2 block font-medium text-liquid-primary",
              size === "sm" && "text-sm",
              size === "lg" && "text-lg",
            )}
          >
            {label}
            {props.required && (
              <span className="ml-1 text-liquid-accent">*</span>
            )}
          </label>
        )}

        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className={cn(
              "mb-2 text-liquid-text",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
            )}
          >
            {description}
          </p>
        )}

        {/* Input Container */}
        <div className="relative">
          <input
            {...props}
            ref={setRefs}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={cn(
              inputVariants({
                ...({ size: size as "sm" | "md" | "lg" } as any),
                error: error ? "true" : "false",
              }),
              showControls && "px-12",
            )}
            aria-invalid={error}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={cn(
              description && descriptionId,
              helperText && helperTextId,
            )}
            role="spinbutton"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
          />

          {/* Control Buttons */}
          {showControls && (
            <>
              <button
                type="button"
                onClick={handleDecrement}
                disabled={!canDecrement}
                className={cn(
                  buttonVariants({
                    ...({ size: size as "sm" | "md" | "lg" } as any),
                    position: "left",
                  }),
                )}
                aria-label="Decrease value"
                tabIndex={-1}
              >
                <Minus className="h-3 w-3" />
              </button>

              <button
                type="button"
                onClick={handleIncrement}
                disabled={!canIncrement}
                className={cn(
                  buttonVariants({
                    ...({ size: size as "sm" | "md" | "lg" } as any),
                    position: "right",
                  }),
                )}
                aria-label="Increase value"
                tabIndex={-1}
              >
                <Plus className="h-3 w-3" />
              </button>
            </>
          )}
        </div>

        {/* Helper Text */}
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-liquid-accent" : "text-liquid-tertiary",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

GlassNumberInput.displayName = "GlassNumberInput";

export { GlassNumberInput };
export default GlassNumberInput;
