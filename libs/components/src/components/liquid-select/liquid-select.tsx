"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidSelectVariants = cva(
  "w-full cursor-pointer transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500/50",
  {
    variants: {
      variant: {
        default: "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30",
        filled: "bg-white/15 border-white/25 hover:bg-white/20 hover:border-white/35",
        ghost: "bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20",
        error: "bg-red-500/10 border-red-400/30 hover:bg-red-500/15 hover:border-red-400/40",
      },
      size: {
        sm: "px-3 py-2 text-sm rounded-lg min-h-9",
        md: "px-4 py-3 text-base rounded-xl min-h-11",
        lg: "px-5 py-4 text-lg rounded-2xl min-h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const dropdownVariants = cva(
  "absolute z-50 w-full mt-2 max-h-60 overflow-auto rounded-xl border border-white/20 backdrop-blur-xl",
  {
    variants: {
      variant: {
        default: "bg-white/10",
        filled: "bg-white/15",
        ghost: "bg-white/5",
        error: "bg-red-500/10 border-red-400/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface LiquidSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof liquidSelectVariants> {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  leftIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  onClear?: () => void;
}

export const LiquidSelect = React.forwardRef<HTMLDivElement, LiquidSelectProps>(
  (
    {
      className,
      variant,
      size,
      options,
      value,
      placeholder = "Select an option...",
      label,
      helperText,
      errorMessage,
      disabled = false,
      searchable = false,
      clearable = false,
      leftIcon,
      onChange,
      onClear,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement[]>([]);

    const isError = Boolean(errorMessage);
    const effectiveVariant = isError ? "error" : variant;

    const selectedOption = options.find((option) => option.value === value);

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    const handleToggle = useCallback(() => {
      if (disabled) return;
      setIsOpen((prev) => !prev);
      setSearchTerm("");
      setFocusedIndex(-1);
    }, [disabled]);

    const handleSelect = useCallback(
      (optionValue: string) => {
        onChange?.(optionValue);
        setIsOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
      },
      [onChange]
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onClear?.();
        setIsOpen(false);
      },
      [onClear]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case "Enter":
          case " ":
            if (!isOpen) {
              setIsOpen(true);
            } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
              const option = filteredOptions[focusedIndex];
              if (!option.disabled) {
                handleSelect(option.value);
              }
            }
            e.preventDefault();
            break;
          case "Escape":
            setIsOpen(false);
            setFocusedIndex(-1);
            break;
          case "ArrowDown":
            if (!isOpen) {
              setIsOpen(true);
            } else {
              setFocusedIndex((prev) => {
                const nextIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0;
                return nextIndex;
              });
            }
            e.preventDefault();
            break;
          case "ArrowUp":
            if (isOpen) {
              setFocusedIndex((prev) => {
                const nextIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1;
                return nextIndex;
              });
              e.preventDefault();
            }
            break;
        }
      },
      [disabled, isOpen, focusedIndex, filteredOptions, handleSelect]
    );

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Scroll focused option into view
    useEffect(() => {
      if (focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
        optionsRef.current[focusedIndex].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }, [focusedIndex]);

    const ChevronIcon = () => (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        className={cn("transition-transform duration-200", isOpen && "transform rotate-180")}
      >
        <path d="M4.427 6.573L8 10.146l3.573-3.573a.5.5 0 0 1 .708.708L8.354 11.208a.5.5 0 0 1-.708 0L3.719 7.281a.5.5 0 1 1 .708-.708Z" />
      </svg>
    );

    const ClearIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16ZM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646Z" />
      </svg>
    );

    return (
      <div className="w-full" ref={containerRef}>
        {label && <label className="block text-sm font-medium text-white/90 mb-2">{label}</label>}

        <div className="relative">
          <LiquidGlass
            ref={ref}
            variant="card"
            intensity="medium"
            hoverGlow={!disabled}
            className={cn(
              liquidSelectVariants({ variant: effectiveVariant, size }),
              "flex items-center gap-3",
              disabled && "opacity-50 cursor-not-allowed",
              isOpen && "ring-2 ring-blue-500/50 ring-offset-2",
              className
            )}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            {...props}
          >
            {leftIcon && (
              <div className="flex-shrink-0 w-5 h-5 text-white/60 flex items-center justify-center">
                {leftIcon}
              </div>
            )}

            <div className="flex-1 text-white">
              {selectedOption ? (
                selectedOption.label
              ) : (
                <span className="text-white/50">{placeholder}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {clearable && selectedOption && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-shrink-0 w-5 h-5 text-white/60 hover:text-white/80 transition-colors flex items-center justify-center"
                >
                  <ClearIcon />
                </button>
              )}

              <div className="flex-shrink-0 w-5 h-5 text-white/60 flex items-center justify-center">
                <ChevronIcon />
              </div>
            </div>
          </LiquidGlass>

          {isOpen && (
            <LiquidGlass
              variant="card"
              intensity="strong"
              className={cn(
                dropdownVariants({ variant: effectiveVariant }),
                "shadow-2xl shadow-black/25"
              )}
            >
              {searchable && (
                <div className="p-3 border-b border-white/10">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search options..."
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-sm"
                  />
                </div>
              )}

              <div role="listbox" className="py-2">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-white/60 text-sm">No options found</div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      ref={(el) => {
                        if (el) optionsRef.current[index] = el;
                      }}
                      role="option"
                      aria-selected={option.value === value}
                      className={cn(
                        "px-4 py-3 text-white cursor-pointer transition-colors",
                        "hover:bg-white/10 focus:bg-white/10",
                        option.disabled && "opacity-50 cursor-not-allowed",
                        option.value === value && "bg-blue-500/20 text-blue-200",
                        focusedIndex === index && "bg-white/10"
                      )}
                      onClick={() => {
                        if (!option.disabled) {
                          handleSelect(option.value);
                        }
                      }}
                    >
                      {option.label}
                    </div>
                  ))
                )}
              </div>
            </LiquidGlass>
          )}
        </div>

        {(helperText || errorMessage) && (
          <div className={cn("mt-2 text-xs", isError ? "text-red-300" : "text-white/60")}>
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

LiquidSelect.displayName = "LiquidSelect";

export { liquidSelectVariants, type LiquidSelectProps, type SelectOption };
