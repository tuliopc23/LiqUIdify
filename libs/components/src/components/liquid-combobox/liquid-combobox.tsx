"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidComboboxVariants = cva("relative w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "border border-white/20 rounded-lg",
      ghost: "bg-transparent",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const comboboxTriggerVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-white placeholder:text-white/50 hover:bg-white/15 border border-white/20",
        bordered:
          "bg-white/5 text-white placeholder:text-white/50 hover:bg-white/10 border border-white/30",
        ghost: "bg-transparent text-white placeholder:text-white/50 hover:bg-white/5",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "",
        open: "ring-2 ring-blue-500/50",
        error: "border-red-500/50 ring-2 ring-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "default",
    },
  }
);

const comboboxContentVariants = cva(
  "absolute z-50 w-full rounded-lg border shadow-lg outline-none animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      variant: {
        default: "bg-white/10 backdrop-blur-md border-white/20",
        glass: "bg-white/5 backdrop-blur-lg border-white/10",
        solid: "bg-white/20 backdrop-blur-sm border-white/30",
      },
      position: {
        bottom: "top-full mt-1",
        top: "bottom-full mb-1",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom",
    },
  }
);

const comboboxItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "text-white hover:bg-white/10 aria-selected:bg-white/20",
        ghost: "text-white/80 hover:bg-white/5 aria-selected:bg-white/10",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  keywords?: string[];
}

interface LiquidComboboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange">,
    VariantProps<typeof liquidComboboxVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  error?: boolean;
  multiple?: boolean;
  maxSelected?: number;
  filter?: (option: ComboboxOption, search: string) => boolean;
  onCreate?: (value: string) => void;
  creatable?: boolean;
  name?: string;
}

export const LiquidCombobox = React.forwardRef<HTMLDivElement, LiquidComboboxProps>(
  (
    {
      className,
      variant,
      size,
      value: controlledValue,
      defaultValue,
      onValueChange,
      options,
      placeholder = "Select an option...",
      searchPlaceholder = "Search options...",
      emptyMessage = "No options found.",
      disabled = false,
      searchable = true,
      clearable = false,
      loading = false,
      error = false,
      multiple = false,
      maxSelected = Infinity,
      filter,
      onCreate,
      creatable = false,
      name,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      multiple
        ? controlledValue
          ? controlledValue.split(",")
          : defaultValue
            ? defaultValue.split(",")
            : []
        : controlledValue
          ? [controlledValue]
          : defaultValue
            ? [defaultValue]
            : []
    );
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const searchRef = React.useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;

    // Default filter function
    const defaultFilter = React.useCallback((option: ComboboxOption, search: string) => {
      const searchLower = search.toLowerCase();
      const labelMatch = option.label.toLowerCase().includes(searchLower);
      const keywordMatch =
        option.keywords?.some((keyword) => keyword.toLowerCase().includes(searchLower)) || false;

      return labelMatch || keywordMatch;
    }, []);

    const filterFn = filter || defaultFilter;

    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!search) return options;
      return options.filter((option) => filterFn(option, search));
    }, [options, search, filterFn]);

    // Add create option if applicable
    const displayOptions = React.useMemo(() => {
      if (creatable && search && !filteredOptions.find((opt) => opt.value === search)) {
        return [...filteredOptions, { value: search, label: `Create "${search}"`, keywords: [] }];
      }
      return filteredOptions;
    }, [filteredOptions, creatable, search]);

    // Get selected options for display
    const selectedOptions = React.useMemo(
      () => options.filter((opt) => selectedValues.includes(opt.value)),
      [options, selectedValues]
    );

    const handleValueChange = React.useCallback(
      (newValues: string[]) => {
        if (!isControlled) {
          setSelectedValues(newValues);
        }

        const value = multiple ? newValues.join(",") : newValues[0] || "";
        onValueChange?.(value);
      },
      [isControlled, multiple, onValueChange]
    );

    const handleSelect = React.useCallback(
      (optionValue: string) => {
        if (disabled) return;

        // Handle creation
        if (creatable && !options.find((opt) => opt.value === optionValue)) {
          onCreate?.(optionValue);
          return;
        }

        let newValues: string[];

        if (multiple) {
          if (selectedValues.includes(optionValue)) {
            newValues = selectedValues.filter((v) => v !== optionValue);
          } else if (selectedValues.length < maxSelected) {
            newValues = [...selectedValues, optionValue];
          } else {
            return; // Max selected reached
          }
        } else {
          newValues = [optionValue];
          setIsOpen(false);
        }

        handleValueChange(newValues);
        setSearch("");
      },
      [
        disabled,
        creatable,
        options,
        onCreate,
        multiple,
        selectedValues,
        maxSelected,
        handleValueChange,
      ]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        handleValueChange([]);
      },
      [handleValueChange]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "Enter":
            e.preventDefault();
            if (focusedIndex >= 0 && displayOptions[focusedIndex]) {
              handleSelect(displayOptions[focusedIndex].value);
            }
            break;
          case "ArrowDown":
            e.preventDefault();
            setFocusedIndex((prev) => (prev < displayOptions.length - 1 ? prev + 1 : 0));
            break;
          case "ArrowUp":
            e.preventDefault();
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : displayOptions.length - 1));
            break;
          case "Escape":
            e.preventDefault();
            setIsOpen(false);
            triggerRef.current?.focus();
            break;
          case "Tab":
            setIsOpen(false);
            break;
        }
      },
      [focusedIndex, displayOptions, handleSelect]
    );

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    // Focus search input when opened
    React.useEffect(() => {
      if (isOpen && searchable && searchRef.current) {
        searchRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Display value
    const displayValue = React.useMemo(() => {
      if (selectedOptions.length === 0) return placeholder;
      if (multiple) {
        return `${selectedOptions.length} selected`;
      }
      return selectedOptions[0]?.label || "";
    }, [selectedOptions, placeholder, multiple]);

    return (
      <div
        ref={ref}
        className={cn(liquidComboboxVariants({ variant, size }), className)}
        {...props}
      >
        {/* Hidden input for form integration */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={multiple ? selectedValues.join(",") : selectedValues[0] || ""}
          />
        )}

        {/* Trigger */}
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            comboboxTriggerVariants({
              variant,
              size,
              state: error ? "error" : isOpen ? "open" : "default",
            })
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span
            className={cn(
              "block truncate text-left",
              selectedOptions.length === 0 && "text-white/50"
            )}
          >
            {loading ? "Loading..." : displayValue}
          </span>

          <div className="flex items-center space-x-1">
            {clearable && selectedOptions.length > 0 && !disabled && (
              <button type="button" onClick={handleClear} className="rounded p-1 hover:bg-white/10">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            <svg
              className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Content */}
        {isOpen && (
          <LiquidGlass
            ref={contentRef}
            variant="card"
            intensity="medium"
            className={cn(comboboxContentVariants({ variant: "default" }))}
            role="listbox"
            aria-multiselectable={multiple}
          >
            {searchable && (
              <div className="p-2">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>
            )}

            <div className="max-h-60 overflow-auto p-1">
              {displayOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-white/60">{emptyMessage}</div>
              ) : (
                displayOptions.map((option, index) => {
                  const isSelected = selectedValues.includes(option.value);
                  const isFocused = index === focusedIndex;

                  return (
                    <div
                      key={option.value}
                      className={cn(
                        comboboxItemVariants({ disabled: option.disabled }),
                        isFocused && "bg-white/10",
                        isSelected && "bg-white/20"
                      )}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      role="option"
                      aria-selected={isSelected}
                      data-disabled={option.disabled}
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        {isSelected && (
                          <svg
                            className="h-4 w-4"
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
                        )}
                      </span>
                      <span className="block truncate">{option.label}</span>
                    </div>
                  );
                })
              )}
            </div>
          </LiquidGlass>
        )}
      </div>
    );
  }
);

LiquidCombobox.displayName = "LiquidCombobox";

// Simple combobox for basic use cases
interface LiquidSimpleComboboxProps extends Omit<LiquidComboboxProps, "options"> {
  options: string[] | ComboboxOption[];
}

export const LiquidSimpleCombobox = React.forwardRef<HTMLDivElement, LiquidSimpleComboboxProps>(
  ({ options, ...props }, ref) => {
    const normalizedOptions = React.useMemo(
      () => options.map((opt) => (typeof opt === "string" ? { value: opt, label: opt } : opt)),
      [options]
    );

    return <LiquidCombobox ref={ref} options={normalizedOptions} {...props} />;
  }
);

LiquidSimpleCombobox.displayName = "LiquidSimpleCombobox";

export {
  liquidComboboxVariants,
  comboboxTriggerVariants,
  comboboxContentVariants,
  comboboxItemVariants,
  type LiquidComboboxProps,
  type ComboboxOption,
};
