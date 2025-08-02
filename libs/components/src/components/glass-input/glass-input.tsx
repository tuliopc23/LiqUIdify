import { Eye, EyeOff, Search, X } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "../../core/utils/classname";

// Type definitions for enhanced TypeScript support
type ComponentVariant = "default" | "search" | "password" | "email";

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: ComponentVariant;
  /**
   * Icon to display on the left side of the input.
   * @security **WARNING:** This prop accepts a `React.ReactNode`. To prevent XSS attacks,
   * developers must ensure that any user-provided content passed to this prop is properly sanitized.
   * Do not pass unsanitized user-generated content to this prop.
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side of the input.
   * @security **WARNING:** This prop accepts a `React.ReactNode`. To prevent XSS attacks,
   * developers must ensure that any user-provided content passed to this prop is properly sanitized.
   * Do not pass unsanitized user-generated content to this prop.
   */
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  error?: boolean;
  helperText?: string;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      variant = "default",
      leftIcon,
      rightIcon,
      clearable = false,
      error = false,
      helperText,
      type,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [currentValue, setCurrentValue] = useState(
      value === undefined ? props.defaultValue || "" : value,
    );
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const helperTextId = useId();

    // Callback ref to handle both internal and forwarded refs
    const setReferences = useCallback(
      (node: HTMLInputElement | null) => {
        (
          internalInputRef as React.MutableRefObject<HTMLInputElement | null>
        ).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
        }
      },
      [ref],
    );

    useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(value);
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(e.target.value);
      onChange?.(e);
    };

    const handleClearInput = () => {
      setCurrentValue("");
      // Manually trigger onChange if the parent component needs to know
      if (internalInputRef.current) {
        const event = new Event("input", { bubbles: true });
        // Create a native event to simulate user input for controlled components
        Object.defineProperty(event, "target", {
          writable: false,
          value: { value: "" },
        });
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
        internalInputRef.current.focus();
      }
    };

    const hasValue = Boolean(currentValue);

    // Base classes using Tailwind + glass utilities
    const baseClasses = cn(
      "glass-input w-full radius-lg-s px-4 py-3",
      "text-glass-text placeholder:text-glass-grey/70",
      "transition-all duration-200 will-change-transform",
      "glass-focus",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error
        ? "border-red-400/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-glass-hl/30 focus:border-glass-accent focus:ring-glass-accent/20",
    );

    const getIconPadding = () => {
      let pr = "pr-4"; // Default right padding
      if (variant === "password" || (clearable && hasValue) || rightIcon) {
        pr = "pr-10"; // Space for one icon
      }
      if (
        (variant === "password" && clearable && hasValue) ||
        (variant === "password" && rightIcon) ||
        (clearable && hasValue && rightIcon)
      ) {
        pr = "pr-20"; // Space for two icons if needed
      }

      if (leftIcon || variant === "search") {
        return `pl-10 ${pr}`;
      }
      return `pl-4 ${pr}`;
    };

    const inputType =
      variant === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className="relative w-full">
        <div className="relative flex w-full items-center">
          {/* Glass effect layers */}
          <div className="glass-filter pointer-events-none" />
          <div className="glass-overlay pointer-events-none" />
          <div className="glass-specular pointer-events-none" />

          {variant === "search" && !leftIcon && (
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-glass-grey z-10" />
          )}
          {leftIcon && (
            <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform text-glass-grey z-10">
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            className={cn(
              baseClasses,
              getIconPadding(),
              "relative z-10",
              className,
            )}
            ref={setReferences}
            {...(value === undefined
              ? { defaultValue: props.defaultValue }
              : { value: currentValue })}
            onChange={handleInputChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={error && helperText ? helperTextId : undefined}
            {...props}
          />

          <div className="absolute top-1/2 right-3 -translate-y-1/2 flex transform items-center space-x-2 z-10">
            {clearable && hasValue && (
              <button
                type="button"
                onClick={handleClearInput}
                aria-label="Clear input"
                className={cn(
                  "glass-button radius-lg-s p-1 text-glass-grey",
                  "motion-safe:hover:text-glass-text motion-safe:hover:scale-110",
                  "motion-safe:active:scale-95 transition-all duration-200",
                  "glass-focus",
                )}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {variant === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className={cn(
                  "glass-button radius-lg-s p-1 text-glass-grey",
                  "motion-safe:hover:text-glass-text motion-safe:hover:scale-110",
                  "motion-safe:active:scale-95 transition-all duration-200",
                  "glass-focus",
                )}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            {rightIcon && variant !== "password" && !clearable && (
              <div className="pointer-events-none text-glass-grey">
                {rightIcon}
              </div>
            )}
          </div>
        </div>
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-red-500" : "text-glass-grey/80",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

GlassInput.displayName = "GlassInput";

export { GlassInput };
