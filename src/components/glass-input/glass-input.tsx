import { forwardRef, useState, useRef, useEffect, useId, useCallback } from "react";
import { cn, focusRing, getGlassClass, microInteraction } from "@/lib/glass-utils";
import { useMicroInteraction, useGlassMorph } from "@/lib/animation-system";
import { useResponsiveComponentSize, useResponsiveDensity, useResponsiveVisibility, ResponsiveProps } from "@/lib/responsive-system";
import { Search, Eye, EyeOff, X, AlertCircle, Check } from "lucide-react";
import {
  ProfessionalInputProps,
  validateComponentProps,
  getIconSizeClasses,
  getFocusRingClasses,
  AccessibilityProps,
} from "@/lib/component-standards";

export interface GlassInputProps
  extends ProfessionalInputProps, ResponsiveProps {
  /** Input variant with extended options */
  inputVariant?: "default" | "search" | "password" | "email" | "number" | "tel" | "url";
  /** Success state styling */
  success?: boolean;
  /** Character counter display */
  showCount?: boolean;
  /** Maximum character count */
  maxCount?: number;
  /** Suffix content */  
  suffix?: React.ReactNode;
  /** Input status message */
  status?: "error" | "warning" | "success";
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ 
    className, 
    size = "md",
    variant = "default", 
    inputVariant = "default",
    leftIcon, 
    rightIcon, 
    clearable = false,
    error = false,
    success = false,
    helperText,
    errorMessage,
    status,
    showCount = false,
    maxCount,
    suffix,
    disabled = false,
    required = false,
    responsive = true,
    adaptiveSize = true,
    fluidSpacing = false,
    hideOn,
    showOn,
    type, 
    value,
    onChange,
    ...props
  }, ref) => {
    // Validate props in development
    validateComponentProps({ size, disabled }, 'GlassInput');
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || props.defaultValue || "");
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    
    // Responsive capabilities
    const responsiveSize = useResponsiveComponentSize(size, adaptiveSize && responsive);
    const { isTouchOptimized, spacing } = useResponsiveDensity();
    const { isVisible, className: visibilityClassName } = useResponsiveVisibility({ hideOn, showOn });
    
    // Professional micro-interactions for input
    const microAnimation = useMicroInteraction('inputFocus');
    const glassMorphStyle = useGlassMorph(isFocused || microAnimation.state === 'hover');
    
    // Early return if not visible on current breakpoint
    if (!isVisible) {
      return null;
    }
    
    // Generate unique IDs for accessibility
    const helperTextId = useId();
    const errorId = useId();
    const countId = useId();
    
    // Determine the actual input type
    const actualInputType = inputVariant === "password" ? (showPassword ? "text" : "password") : 
                           inputVariant === "email" ? "email" :
                           inputVariant === "number" ? "number" :
                           inputVariant === "tel" ? "tel" :
                           inputVariant === "url" ? "url" :
                           type;
    
    // Determine status styling
    const currentStatus = status || (error ? "error" : success ? "success" : undefined);
    const hasError = error || status === "error";
    const hasSuccess = success || status === "success";
    const hasWarning = status === "warning";
    
    // Character count logic
    const characterCount = String(currentValue).length;
    const isOverLimit = maxCount && characterCount > maxCount;
    
    // Use responsive size for calculations
    const actualSize = responsive ? responsiveSize : size;
    
    // Use standardized icon size based on actual size
    const iconClasses = getIconSizeClasses(actualSize);

    // Callback ref to handle both internal and forwarded refs
const setRefs = useCallback((node: HTMLInputElement | null) => {
      (internalInputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    }, [ref]);

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
        const event = new Event('input', { bubbles: true });
        // Create a native event to simulate user input for controlled components
        Object.defineProperty(event, 'target', { writable: false, value: { value: '' } });
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
        internalInputRef.current.focus();
      }
    };

    const hasValue = !!currentValue;

    const baseClasses = cn(
      "w-full rounded-xl border transition-all duration-200",
      "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]",
      getGlassClass("default"),
      getFocusRingClasses(),
      microInteraction.gentle,
      
      // Responsive and touch optimization
      isTouchOptimized && "touch-optimized",
      responsive && fluidSpacing && "spacing-fluid-sm",
      visibilityClassName,
      
      // Size variants based on actual size
      actualSize === "xs" && "px-2 py-1 text-xs",
      actualSize === "sm" && "px-3 py-1.5 text-sm", 
      actualSize === "md" && "px-4 py-2.5 text-sm",
      actualSize === "lg" && "px-5 py-3 text-base",
      actualSize === "xl" && "px-6 py-4 text-lg",
      
      // Status-based styling
      hasError && "border-red-400/50 focus:border-red-500",
      hasSuccess && "border-green-400/50 focus:border-green-500",
      hasWarning && "border-yellow-400/50 focus:border-yellow-500",
      !currentStatus && "border-[var(--glass-border)] focus:border-[var(--glass-border-focus)]",
      
      // Disabled state
      disabled && "opacity-50 cursor-not-allowed",
      
      // Focus state
      isFocused && "ring-2 ring-blue-500/20"
    );

    // Calculate icon spacing dynamically based on actual size
    const hasLeftContent = leftIcon || inputVariant === "search";
    const hasRightContent = rightIcon || suffix || clearable || inputVariant === "password" || currentStatus;
    
    const leftPadding = actualSize === "xs" ? "pl-2" : actualSize === "sm" ? "pl-3" : actualSize === "md" ? "pl-4" : actualSize === "lg" ? "pl-5" : "pl-6";
    const rightPadding = actualSize === "xs" ? "pr-2" : actualSize === "sm" ? "pr-3" : actualSize === "md" ? "pr-4" : actualSize === "lg" ? "pr-5" : "pr-6";
    
    const paddingClasses = cn(
      hasLeftContent && (actualSize === "xs" ? "pl-8" : actualSize === "sm" ? "pl-9" : actualSize === "md" ? "pl-10" : actualSize === "lg" ? "pl-12" : "pl-14"),
      hasRightContent && (actualSize === "xs" ? "pr-8" : actualSize === "sm" ? "pr-9" : actualSize === "md" ? "pr-10" : actualSize === "lg" ? "pr-12" : "pr-14"),
      !hasLeftContent && leftPadding,
      !hasRightContent && rightPadding
    );

    return (
      <div className="relative w-full">
        {/* Input wrapper */}
        <div className="relative">
          {/* Left content */}
          {hasLeftContent && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
              {(inputVariant === "search" && !leftIcon) && <Search className={cn(iconClasses, "text-[var(--text-secondary)]")} />}
              {leftIcon && <span className={cn(iconClasses, "text-[var(--text-secondary)]")}>{leftIcon}</span>}
            </div>
          )}
          
          {/* Input field */}
          <input
            type={actualInputType}
            className={cn(baseClasses, paddingClasses, className)}
            style={{
              ...microAnimation.style,
              ...glassMorphStyle,
            }}
            ref={setRefs}
            value={currentValue}
            onChange={handleInputChange}
            {...microAnimation.bind}
            onFocus={(e) => {
              setIsFocused(true);
              microAnimation.bind.onFocus?.();
            }}
            onBlur={(e) => {
              setIsFocused(false);
              microAnimation.bind.onBlur?.();
            }}
            disabled={disabled}
            required={required}
            maxLength={maxCount}
            aria-invalid={hasError}
            aria-required={required}
            aria-describedby={cn(
              helperText && helperTextId,
              hasError && errorMessage && errorId,
              showCount && countId
            )}
            {...props}
          />
          
          {/* Right content */}
          {hasRightContent && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {/* Status icon */}
              {currentStatus && !clearable && (
                <div className={cn(
                  iconClasses,
                  hasError && "text-red-500",
                  hasSuccess && "text-green-500", 
                  hasWarning && "text-yellow-500"
                )}>
                  {hasError && <AlertCircle />}
                  {hasSuccess && <Check />}
                  {hasWarning && <AlertCircle />}
                </div>
              )}
              
              {/* Clear button */}
              {clearable && hasValue && (
                <button
                  type="button"
                  onClick={handleClearInput}
                  disabled={disabled}
                  aria-label="Clear input"
                  className={cn(
                    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-0.5",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500 rounded transition-colors",
                    iconClasses
                  )}
                >
                  <X />
                </button>
              )}
              
              {/* Password toggle */}
              {inputVariant === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className={cn(
                    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-0.5",
                    "focus:outline-none focus:ring-1 focus:ring-blue-500 rounded transition-colors",
                    iconClasses
                  )}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              )}
              
              {/* Right icon or suffix */}
              {(rightIcon || suffix) && inputVariant !== "password" && (
                <div className="flex items-center pointer-events-none">
                  {rightIcon && <span className={cn(iconClasses, "text-[var(--text-secondary)]")}>{rightIcon}</span>}
                  {suffix && <span className="text-[var(--text-secondary)] ml-1">{suffix}</span>}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Helper text and character count */}
        <div className="mt-1.5 flex justify-between items-start">
          <div className="flex-1">
            {(helperText || (hasError && errorMessage)) && (
              <p
                id={hasError && errorMessage ? errorId : helperTextId}
                className={cn(
                  "text-xs",
                  hasError && "text-red-500",
                  hasSuccess && "text-green-500",
                  hasWarning && "text-yellow-500",
                  !currentStatus && "text-[var(--text-muted)]"
                )}
              >
                {hasError && errorMessage ? errorMessage : helperText}
              </p>
            )}
          </div>
          
          {/* Character count */}
          {showCount && (
            <span
              id={countId}
              className={cn(
                "text-xs ml-2 flex-shrink-0",
                isOverLimit ? "text-red-500" : "text-[var(--text-muted)]"
              )}
            >
              {characterCount}{maxCount && `/${maxCount}`}
            </span>
          )}
        </div>
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";

export { GlassInput };
