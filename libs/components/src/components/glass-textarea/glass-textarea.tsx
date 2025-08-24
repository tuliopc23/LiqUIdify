import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "../../core/utils/classname";

// Size variants using Tailwind classes
const SIZE_CLASSES = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

interface GlassTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  size?: "sm" | "md" | "lg";
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  description?: string;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  characterCountPosition?: "bottom-right" | "bottom-left";
}

const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  (
    {
      className,
      size = "md",
      value,
      defaultValue,
      onChange,
      error = false,
      helperText,
      label,
      description,
      autoResize = true,
      minRows = 3,
      maxRows = 10,
      maxLength,
      showCharacterCount = false,
      characterCountPosition = "bottom-right",
      disabled,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(
      value !== undefined ? value : defaultValue || "",
    );
    const [textareaHeight, setTextareaHeight] = useState<string>("auto");

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);
    const labelId = useId();
    const descriptionId = useId();
    const helperTextId = useId();

    const currentValue = value !== undefined ? value : internalValue;
    const characterCount = currentValue.length;
    const isOverLimit = maxLength ? characterCount > maxLength : false;

    // Calculate textarea height for auto-resize
    const calculateHeight = useCallback(() => {
      if (!autoResize || !textareaRef.current) return;

      const textarea = textareaRef.current;
      const hiddenTextarea = hiddenTextareaRef.current;

      if (!hiddenTextarea) return;

      // Copy styles to hidden textarea
      const computedStyle = window.getComputedStyle(textarea);
      hiddenTextarea.style.width = computedStyle.width;
      hiddenTextarea.style.fontSize = computedStyle.fontSize;
      hiddenTextarea.style.fontFamily = computedStyle.fontFamily;
      hiddenTextarea.style.fontWeight = computedStyle.fontWeight;
      hiddenTextarea.style.lineHeight = computedStyle.lineHeight;
      hiddenTextarea.style.padding = computedStyle.padding;
      hiddenTextarea.style.border = computedStyle.border;
      hiddenTextarea.style.boxSizing = computedStyle.boxSizing;

      // Set content and measure height
      hiddenTextarea.value = currentValue || " ";

      const scrollHeight = hiddenTextarea.scrollHeight;
      const lineHeight = parseInt(computedStyle.lineHeight, 10) || 20;
      const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
      const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
      const borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0;
      const borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;

      const minHeight =
        minRows * lineHeight +
        paddingTop +
        paddingBottom +
        borderTop +
        borderBottom;
      const maxHeight =
        maxRows * lineHeight +
        paddingTop +
        paddingBottom +
        borderTop +
        borderBottom;

      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      setTextareaHeight(`${newHeight}px`);
    }, [autoResize, currentValue, minRows, maxRows]);

    // Update height when value changes
    useEffect(() => {
      calculateHeight();
    }, [calculateHeight]);

    // Update height on window resize
    useEffect(() => {
      if (!autoResize) return;

      const handleResize = () => {
        setTimeout(calculateHeight, 0);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [autoResize, calculateHeight]);

    // Handle value change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      // Enforce max length if specified
      if (maxLength && newValue.length > maxLength) {
        return;
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);
    };

    // Handle key down for accessibility
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
      if (e.ctrlKey || e.metaKey) {
        props.onKeyDown?.(e);
        return;
      }

      // Prevent input if at max length (except for deletion keys)
      if (
        maxLength &&
        currentValue.length >= maxLength &&
        ![
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Tab",
        ].includes(e.key)
      ) {
        e.preventDefault();
        return;
      }

      props.onKeyDown?.(e);
    };

    // Combine refs
    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    // Base classes using Tailwind + liquid-glass utilities
    const textareaClasses = cn(
      "liquid-glass-input w-full liquid-glass-md resize-none rounded-xl",
      "text-liquid-primary placeholder:text-liquid-grey/70",
      "transition-all duration-200 will-change-transform",
      "liquid-glass-interactive:focus-visible",
      "disabled:cursor-not-allowed disabled:opacity-50",
      SIZE_CLASSES[size],
      error
        ? "border-red-400/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-liquid-glass-hl/30 focus:border-text-liquid-accent focus:ring-text-liquid-accent/20",
    );

    return (
      <div
        className={cn(
          "relative w-full",
          size === "sm" && "text-sm",
          size === "lg" && "text-lg",
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
            {props.required && <span className="ml-1 text-red-400">*</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className={cn(
              "mb-2 text-liquid-grey/80",
              size === "sm" && "text-xs",
              size === "md" && "text-sm",
              size === "lg" && "text-base",
            )}
          >
            {description}
          </p>
        )}

        {/* Textarea Container */}
        <div className="relative">
          {/* Glass effect layers */}
          <div className="liquid-glass-filter pointer-events-none" />
          <div className="liquid-glass-overlay pointer-events-none" />
          <div className="liquid-glass-specular pointer-events-none" />

          <textarea
            {...props}
            ref={setRefs}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={cn(textareaClasses, "relative z-10")}
            style={{
              height: autoResize ? textareaHeight : undefined,
              minHeight: autoResize ? undefined : `${minRows * 1.5}em`,
            }}
            aria-invalid={error}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={cn(
              description && descriptionId,
              helperText && helperTextId,
            )}
          />

          {/* Character Count */}
          {showCharacterCount && (
            <div
              className={cn(
                "absolute bottom-2 text-xs z-20",
                characterCountPosition === "bottom-right"
                  ? "right-3"
                  : "left-3",
                isOverLimit ? "text-red-400" : "text-liquid-grey/70",
              )}
            >
              {maxLength ? `${characterCount}/${maxLength}` : characterCount}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-red-400" : "text-liquid-grey/80",
            )}
          >
            {helperText}
          </p>
        )}

        {/* Hidden textarea for height calculation */}
        {autoResize && (
          <textarea
            ref={hiddenTextareaRef}
            tabIndex={-1}
            className="absolute left-0 top-0 -z-10 h-0 overflow-hidden opacity-0 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

GlassTextarea.displayName = "GlassTextarea";

export { GlassTextarea };
export default GlassTextarea;
