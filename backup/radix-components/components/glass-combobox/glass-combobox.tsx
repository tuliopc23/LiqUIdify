import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search, X } from "lucide-react";
import type React from "react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { cn } from "../../core/utils/classname";
import { createVariants as cva } from "../../lib/variant-system";

const comboboxVariants = cva({
  base: "relative w-full ",
  variants: {
    size: {
      sm: " text-sm",
      md: " text-base",
      lg: " text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const triggerVariants = cva({
  base: cn(
    "flex w-full items-center justify-between text-left relative z-10",
    " text-blue-900 px-4 py-3",
    "transition-all duration-200 focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ),
  variants: {
    isOpen: {
      true: "",
      false: "",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg",
    },
  },
  defaultVariants: {
    isOpen: false,
    size: "md",
  },
});

const listboxVariants = cva({
  base: cn(
    "absolute top-full left-0 right-0 mt-2 z-50",
    " ",
    "max-h-60 overflow-auto",
    // Transparent, subtle outline
    "border border-blue-300/30"
  ),
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

const optionVariants = cva({
  base: cn(
    "flex items-center gap-3 px-4 py-3 cursor-pointer relative z-10",
    "text-blue-900 hover:border-blue-500/30 transition-all duration-200",
    // Transparent separators
    "border-b border-blue-300/20 last:border-b-0"
  ),
  variants: {
    isSelected: {
      true: "ring-2 ring-liquid-accent/30 text-blue-600 font-medium /10",
      false: "",
    },
    isHighlighted: {
      true: "/5 border-blue-500/20",
      false: "",
    },
  },
  defaultVariants: {
    isSelected: false,
    isHighlighted: false,
  },
});

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface GlassComboboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  helperText?: string;
  emptyMessage?: string;
  maxDisplayOptions?: number;
}

export const GlassCombobox = forwardRef<HTMLInputElement, GlassComboboxProps>(
  (
    {
      options = [],
      value = "",
      onChange,
      onInputChange,
      placeholder = "Select an option...",
      searchable = true,
      clearable = false,
      loading = false,
      size = "md",
      error = false,
      helperText,
      emptyMessage = "No options found",
      maxDisplayOptions = 50,
      disabled,
      className,
      ...props
    },
    _ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const comboboxRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    const selectedOption = options.find((option) => option.value === value);

    // Filter options based on search input
    const filteredOptions = searchable
      ? options.filter(
          (option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
            option.description?.toLowerCase().includes(inputValue.toLowerCase())
        )
      : options;

    const displayOptions = filteredOptions.slice(0, maxDisplayOptions);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onInputChange?.(newValue);

      if (!isOpen && newValue) {
        setIsOpen(true);
      }
    };

    // Handle option selection
    const handleOptionSelect = (option: ComboboxOption) => {
      onChange?.(option.value);
      setInputValue(searchable ? "" : option.label);
      setHighlightedIndex(-1);
      setIsOpen(false);
      inputRef.current?.focus();
    };

    // Handle clear
    const handleClear = () => {
      onChange?.("");
      setInputValue("");
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) => (prev < displayOptions.length - 1 ? prev + 1 : 0));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : displayOptions.length - 1));
          }
          break;
        case "Enter":
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            const opt = displayOptions[highlightedIndex];
            if (opt) {
              handleOptionSelect(opt);
            }
          } else if (!isOpen) {
            setIsOpen(true);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        case "Tab":
          setIsOpen(false);
          break;
      }
    };

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Update input value when value prop changes
    useEffect(() => {
      if (!searchable && selectedOption) {
        setInputValue(selectedOption.label);
      }
    }, [selectedOption, searchable]);

    return (
      <div className={cn("w-full", className)}>
        <div ref={comboboxRef} className={cn(comboboxVariants({ size } as any))}>
          {/* Apple-style liquid glass layers */}
          <div />
          <div />
          <div />

          <button
            type="button"
            className={cn(triggerVariants({ isOpen, size } as any))}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${id}-listbox`}
            aria-label={placeholder}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {selectedOption?.icon && (
                <div className="flex-shrink-0 text-blue-600">{selectedOption.icon}</div>
              )}

              {searchable ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={selectedOption ? selectedOption.label : placeholder}
                  disabled={disabled}
                  className={cn(
                    "flex-1 bg-transparent border-none outline-none",
                    "text-blue-900 placeholder:text-blue-900/60",
                    disabled && "cursor-not-allowed"
                  )}
                  aria-autocomplete="list"
                  aria-controls={`${id}-listbox`}
                  aria-activedescendant={
                    highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined
                  }
                  {...props}
                />
              ) : (
                <span className="flex-1 truncate text-blue-900">
                  {selectedOption?.label || <span className="text-blue-500">{placeholder}</span>}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {clearable && value && !disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="p-1 hover:/10 rounded-lg transition-colors"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4 text-blue-900" />
                </button>
              )}

              {loading ? (
                <div className="animate-spin">
                  <Search className="h-4 w-4 text-blue-900/70" />
                </div>
              ) : (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-blue-900 transition-transform duration-200",
                    isOpen && "rotate-180 text-blue-600"
                  )}
                />
              )}
            </div>
          </button>

          {/* Dropdown with Apple-style animation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(listboxVariants({ size } as any))}
                role="listbox"
                id={`${id}-listbox`}
                ref={listboxRef}
              >
                {/* Apple-style liquid glass layers for dropdown */}
                <div />
                <div />
                <div />

                <div className="p-0">
                  {displayOptions.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-blue-900/70">{emptyMessage}</p>
                    </div>
                  ) : (
                    displayOptions.map((option, index) => (
                      <button
                        key={option.value}
                        type="button"
                        id={`${id}-option-${index}`}
                        role="option"
                        aria-selected={option.value === value}
                        className={cn(
                          optionVariants({
                            ...({ isSelected: option.value === value } as any),
                            isHighlighted: index === highlightedIndex,
                          }),
                          option.disabled && "opacity-50 cursor-not-allowed",
                          "w-full text-left"
                        )}
                        onClick={() => !option.disabled && handleOptionSelect(option)}
                        onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                        disabled={option.disabled}
                      >
                        {option.icon && (
                          <div className="flex-shrink-0 text-blue-600">{option.icon}</div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-blue-900/70">{option.description}</div>
                          )}
                        </div>

                        {option.value === value && <Check className="h-4 w-4 text-blue-600" />}
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {helperText && (
          <p className={cn("mt-2 text-sm", error ? "text-blue-600" : "text-blue-700")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

GlassCombobox.displayName = "GlassCombobox";

// Type already exported above
