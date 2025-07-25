import { Minus, Plus } from 'lucide-react';
import type React from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn, focusRing } from '@/core/utils/classname';
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from '../../lib/variant-system';

const numberInputVariants = cva(['relative w-full'], {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const inputVariants = cva(
  [
    'w-full border text-center transition-all duration-200',
    'rounded-xl border-white/10 bg-white/5 backdrop-blur-sm',
    'text-white placeholder-white/60',
    'hover:bg-white/10 focus:bg-white/10',
    'focus:border-blue-400/50 focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],

  {
    variants: {
      size: {
        sm: 'px-8 py-2 text-sm',
        md: 'px-10 py-3 text-base',
        lg: 'px-12 py-4 text-lg',
      },
      error: {
        true: 'border-red-400/50 focus:border-red-500',
        false: 'border-white/10 focus:border-blue-400/50',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

const buttonVariants = cva(
  [
    '-translate-y-1/2 absolute top-1/2 transform',
    'flex items-center justify-center',
    'bg-white/10 hover:bg-white/20 active:bg-white/30',
    'rounded-lg border border-white/10',
    'text-white/70 hover:text-white',
    'transition-all duration-200',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus:outline-none focus:ring-2 focus:ring-blue-400/50',
  ],

  {
    variants: {
      size: {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface GlassNumberInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'onChange'
    >,
    VariantProps<typeof numberInputVariants> {
  value?: number;

  defaultValue?: number;

  onChange?: (value: number | null) => void;

  min?: number;

  max?: number;

  step?: number;

  precision?: number;

  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;

  allowDecimals?: boolean;

  allowNegative?: boolean;

  showButtons?: boolean;
  placeholder?: string;

  error?: boolean;

  disabled?: boolean;
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
      formatOptions,
      locale = 'en-US',
      allowDecimals = false,
      allowNegative = true,
      showButtons = true,
      placeholder = '0',
      error = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<number | undefined>(
      value === undefined ? defaultValue : value
    );
    const [displayValue, setDisplayValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const incrementRef = useRef<HTMLButtonElement>(null);
    const decrementRef = useRef<HTMLButtonElement>(null);

    // Format number for display
    const formatNumber = useCallback(
      (number_: number | null): string => {
        if (number_ === undefined || Number.isNaN(number_)) {
          return '';
        }

        if (formatOptions) {
          return new Intl.NumberFormat(locale, formatOptions).format(number_);
        }

        return number_.toFixed(precision);
      },
      [formatOptions, locale, precision]
    );

    // Parse display value to number
    const parseNumber = useCallback(
      (string_: string): number | undefined => {
        if (!string_.trim()) {
          return;
        }

        // Remove formatting characters but keep decimal point and negative sign
        const cleaned = string_.replaceAll(/[^\d.-]/g, '');
        const number_ = Number.parseFloat(cleaned);

        if (Number.isNaN(number_)) {
          return;
        }

        // Apply precision

        const rounded = Math.round(number_ * 10 ** precision) / 10 ** precision;

        // Apply constraints
        let constrained = rounded;
        if (min !== undefined) {
          constrained = Math.max(constrained, min);
        }
        if (max !== undefined) {
          constrained = Math.min(constrained, max);
        }

        return constrained;
      },
      [precision, min, max]
    );

    // Update display value when internal value changes
    useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatNumber(internalValue));
      }
    }, [internalValue, isFocused, formatNumber]);

    // Update internal value when prop value changes
    useEffect(() => {
      if (value !== internalValue) {
        setInternalValue(value);
      }
    }, [value, internalValue]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      // Only parse and update if not focused (to avoid formatting while typing)
      if (!isFocused) {
        const parsed = parseNumber(inputValue);
        setInternalValue(parsed);

        onChange?.(parsed);
      }
    };

    // Handle focus
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Show raw number when focused
      if (internalValue !== undefined) {
        setDisplayValue(internalValue.toString());
      }

      props.onFocus?.(e);
    };

    // Handle blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const parsed = parseNumber(displayValue);
      setInternalValue(parsed);

      onChange?.(parsed);

      props.onBlur?.(e);
    };

    // Handle increment/decrement
    const handleIncrement = () => {
      if (disabled) {
        return;
      }

      const current = internalValue || 0;

      const newValue = current + step;
      const constrained =
        max === undefined ? newValue : Math.min(newValue, max);

      setInternalValue(constrained);

      onChange?.(constrained);
    };

    const handleDecrement = () => {
      if (disabled) {
        return;
      }

      const current = internalValue || 0;

      const newValue = current - step;
      const constrained =
        min === undefined ? newValue : Math.max(newValue, min);

      setInternalValue(constrained);

      onChange?.(constrained);
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      switch (e.key) {
        case 'ArrowUp': {
          e.preventDefault();
          handleIncrement();
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          handleDecrement();
          break;
        }
        case 'Enter': {
          e.preventDefault();
          inputRef.current?.blur();
          break;
        }
      }

      // Allow only numeric characters, decimal point, and negative sign
      if (1 === e.key.length) {
        const char = e.key;
        const isNumeric = /\d/.test(char);
        const isDecimal = '.' === char && allowDecimals;
        const isNegative =
          '-' === char && allowNegative && 0 === e.currentTarget.selectionStart;

        if (!isNumeric && !isDecimal && !isNegative) {
          e.preventDefault();
        }
      }

      props.onKeyDown?.(e);
    };

    // Combine refs
    const combinedRef = useCallback(
      (node: HTMLInputElement | null) => {
        if (inputRef.current) {
          inputRef.current = node;
        }
        if ('function' === typeof ref) {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <div className={cn(numberInputVariants({ size }), className)}>
        <div className="relative">
          <input
            ref={combinedRef}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              inputVariants({ size, error }),
              focusRing,
              showButtons && 'pr-16'
            )}
            {...(props as any)}
          />

          {showButtons && (
            <div className="-translate-y-1/2 absolute top-1/2 right-2 flex transform flex-col gap-1">
              <button
                ref={incrementRef}
                type="button"
                onClick={handleIncrement}
                disabled={
                  disabled ||
                  (max !== undefined &&
                    internalValue !== undefined &&
                    internalValue >= max)
                }
                className={cn(buttonVariants({ size }))}
                aria-label="Increment"
              >
                <Plus className="h-3 w-3" />
              </button>

              <button
                ref={decrementRef}
                type="button"
                onClick={handleDecrement}
                disabled={
                  disabled ||
                  (min !== undefined &&
                    internalValue !== undefined &&
                    internalValue <= min)
                }
                className={cn(buttonVariants({ size }))}
                aria-label="Decrement"
              >
                <Minus className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

GlassNumberInput.displayName = 'GlassNumberInput';

export { GlassNumberInput };
