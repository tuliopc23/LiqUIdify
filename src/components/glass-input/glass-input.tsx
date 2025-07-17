import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
} from 'react';
import {
  cn,
  focusRing,
  getGlassClass,
  microInteraction,
} from '@/lib/glass-utils';
import { Search, Eye, EyeOff, X } from 'lucide-react';

// Type definitions for enhanced TypeScript support
type ComponentVariant = 'default' | 'search' | 'password' | 'email';

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: ComponentVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  error?: boolean;
  helperText?: string;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      variant = 'default',
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
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    // const [isFocused, setIsFocused] = useState(false); // isFocused is not used
    const [currentValue, setCurrentValue] = useState(
      value !== undefined ? value : props.defaultValue || ''
    );
    const internalInputRef = useRef<HTMLInputElement | null>(null);
    const helperTextId = useId();

    // Callback ref to handle both internal and forwarded refs
    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        (
          internalInputRef as React.MutableRefObject<HTMLInputElement | null>
        ).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
        }
      },
      [ref]
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
      setCurrentValue('');
      // Manually trigger onChange if the parent component needs to know
      if (internalInputRef.current) {
        const event = new Event('input', { bubbles: true });
        // Create a native event to simulate user input for controlled components
        Object.defineProperty(event, 'target', {
          writable: false,
          value: { value: '' },
        });
        onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
        internalInputRef.current.focus();
      }
    };

    const hasValue = !!currentValue;

    const baseClasses = cn(
      'w-full px-4 py-3 rounded-xl border transition-all duration-200',
      'text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]',
      getGlassClass('default'),
      focusRing, // Ensure focusRing provides a visible focus style
      'disabled:opacity-50 disabled:cursor-not-allowed',
      error
        ? 'border-red-400/50 focus:border-red-500'
        : 'border-[var(--glass-border)] focus:border-[var(--glass-border-focus)]',
      microInteraction.gentle
    );

    const getIconPadding = () => {
      let pr = 'pr-4'; // Default right padding
      if (variant === 'password' || (clearable && hasValue) || rightIcon) {
        pr = 'pr-10'; // Space for one icon
      }
      if (
        (variant === 'password' && clearable && hasValue) ||
        (variant === 'password' && rightIcon) ||
        (clearable && hasValue && rightIcon)
      ) {
        pr = 'pr-20'; // Space for two icons if needed, adjust as per visual design
      }

      if (leftIcon || variant === 'search') return `pl-10 ${pr}`;
      return `pl-4 ${pr}`;
    };

    const inputType =
      variant === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="relative w-full">
        <div className="relative flex items-center w-full">
          {variant === 'search' && !leftIcon && (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
          )}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(baseClasses, getIconPadding(), className)}
            ref={setRefs}
            {...(value !== undefined
              ? { value: currentValue }
              : { defaultValue: props.defaultValue })}
            onChange={handleInputChange}
            aria-invalid={error ? true : undefined}
            aria-describedby={error && helperText ? helperTextId : undefined}
            {...props}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {clearable && hasValue && (
              <button
                type="button"
                onClick={handleClearInput}
                aria-label="Clear input"
                className="text-secondary hover:text-primary p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {variant === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="text-secondary hover:text-primary p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            {rightIcon && variant !== 'password' && !clearable && (
              <div className="text-secondary pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
        </div>
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              'text-xs mt-1.5',
              error ? 'text-red-500' : 'text-[var(--text-muted)]'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export { GlassInput };
