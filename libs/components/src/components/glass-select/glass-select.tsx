import { Check, ChevronDown, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../core/utils/classname";

export interface GlassSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface GlassSelectProps {
  options: Array<GlassSelectOption>;
  value?: string | Array<string>;
  onChange?: (value: string | Array<string>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "search" | "multi";
  multiple?: boolean;
  searchable?: boolean;
  maxSelections?: number;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export const GlassSelect = React.memo(
  React.forwardRef<HTMLDivElement, GlassSelectProps>(
    (
      {
        options,
        value,
        onChange,
        placeholder = "Select an option",
        disabled,
        className,
        variant = "default",
        multiple = false,
        searchable = false,
        maxSelections,
        id,
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
        ...props
      },
      ref,
    ) => {
      const [isOpen, setIsOpen] = useState(false);
      const [selectedValues, setSelectedValues] = useState<Array<string>>(
        Array.isArray(value) ? value : value ? [value] : [],
      );
      const [searchTerm, setSearchTerm] = useState("");
      const [focusedIndex, setFocusedIndex] = useState(-1);
      const selectRef = useRef<HTMLDivElement>(null);
      const inputRef = useRef<HTMLInputElement>(null);
      const listRef = useRef<HTMLDivElement>(null);

      // Update selected values when value prop changes
      useEffect(() => {
        if (value !== undefined) {
          setSelectedValues(
            Array.isArray(value) ? value : value ? [value] : [],
          );
        }
      }, [value]);

      // Handle click outside
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            selectRef.current &&
            !selectRef.current.contains(event.target as Node)
          ) {
            setIsOpen(false);
            setFocusedIndex(-1);
          }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
          if (!isOpen) return;

          switch (event.key) {
            case "ArrowDown": {
              event.preventDefault();
              setFocusedIndex((prev) => {
                const next = prev + 1;
                const maxIndex = options.length - 1;
                return next > maxIndex ? 0 : next;
              });
              break;
            }
            case "ArrowUp": {
              event.preventDefault();
              setFocusedIndex((prev) => {
                const next = prev - 1;
                return next < 0 ? options.length - 1 : next;
              });
              break;
            }
            case "Enter": {
              event.preventDefault();
              if (focusedIndex >= 0 && focusedIndex < options.length) {
                const option = options[focusedIndex];
                if (option && !option.disabled) {
                  handleSelect(option.value);
                }
              }
              break;
            }
            case "Escape": {
              event.preventDefault();
              setIsOpen(false);
              setFocusedIndex(-1);
              break;
            }
          }
        };

        if (typeof document !== "undefined") {
          document.addEventListener("mousedown", handleClickOutside);
          document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
          if (typeof document !== "undefined") {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
          }
        };
      }, [isOpen, focusedIndex, options]);

      // Filter options based on search term
      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      // Handle selection
      const handleSelect = (optionValue: string) => {
        if (multiple) {
          // Multi-select logic
          const newSelectedValues = selectedValues.includes(optionValue)
            ? selectedValues.filter((v) => v !== optionValue)
            : [...selectedValues, optionValue];

          // Check max selections
          if (maxSelections && newSelectedValues.length > maxSelections) {
            return;
          }

          setSelectedValues(newSelectedValues);
          onChange?.(newSelectedValues);
        } else {
          // Single select logic
          setSelectedValues([optionValue]);
          onChange?.(optionValue);
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      // Handle remove selection (for multi-select)
      const handleRemoveSelection = (
        valueToRemove: string,
        e: React.MouseEvent,
      ) => {
        e.stopPropagation();
        const newSelectedValues = selectedValues.filter(
          (v) => v !== valueToRemove,
        );
        setSelectedValues(newSelectedValues);
        onChange?.(multiple ? newSelectedValues : newSelectedValues[0] || "");
      };

      // Get selected options for display
      const selectedOptions = options.filter((opt) =>
        selectedValues.includes(opt.value),
      );

      // Focus input when dropdown opens
      useEffect(() => {
        if (isOpen && inputRef.current) {
          inputRef.current.focus();
        }
      }, [isOpen]);

      return (
        <div
          ref={ref || selectRef}
          className={cn("relative", className)}
          {...props}
        >
          {/* Trigger Button */}
          <div
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={cn(
              "liquid-glass-input w-full liquid-glass-sm px-4 py-3 text-left rounded-full",
              "flex items-center justify-between relative",
              "transition-all duration-200 will-change-transform",
              "text-liquid-primary placeholder:text-liquid-grey/70",
              "liquid-glass-interactive:focus-visible",
              "motion-safe:hover:bg-liquid-glass-bg/20",
              disabled && "cursor-not-allowed opacity-50",
              isOpen &&
                "border-text-liquid-accent ring-2 ring-text-liquid-accent/20",
            )}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!disabled) setIsOpen(!isOpen);
              }
            }}
          >
            {/* Glass effect layers */}
            <div className="liquid-glass-filter pointer-events-none" />
            <div className="liquid-glass-overlay pointer-events-none" />
            <div className="liquid-glass-specular pointer-events-none" />

            {/* Display selected values or placeholder */}
            <div className="flex flex-wrap gap-1 relative z-10">
              {multiple && selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <span
                    key={option.value}
                    className={cn(
                      "liquid-glass-button inline-flex items-center gap-1 liquid-glass-sm px-2 py-1 text-xs",
                      "bg-text-liquid-accent/20 text-liquid-primary",
                    )}
                  >
                    {option.label}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveSelection(option.value, e)}
                      className={cn(
                        "liquid-glass-button liquid-glass-sm p-0.5",
                        "motion-safe:hover:bg-text-liquid-accent/30 motion-safe:hover:scale-110",
                        "motion-safe:active:scale-95 transition-all duration-200",
                      )}
                      aria-label={`Remove ${option.label}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              ) : selectedOptions.length > 0 ? (
                <span className="text-liquid-primary">
                  {selectedOptions[0]?.label ?? ""}
                </span>
              ) : (
                <span className="text-liquid-grey/70">{placeholder}</span>
              )}

              {/* Search input for searchable variant */}
              {searchable && isOpen && (
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="ml-1 flex-1 bg-transparent outline-none placeholder:text-liquid-grey/70 text-liquid-primary"
                  placeholder={selectedOptions.length === 0 ? placeholder : ""}
                  aria-autocomplete="list"
                  aria-controls="liquid-glass-select-options"
                />
              )}
            </div>

            {/* Chevron Icon */}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-liquid-grey transition-transform duration-200 relative z-10",
                isOpen && "rotate-180",
              )}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              ref={listRef}
              id="liquid-glass-select-options"
              className={cn(
                "liquid-glass absolute z-50 mt-2 w-full rounded-full",
                "border border-liquid-glass-hl/30 max-h-60 overflow-auto",
                "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-200",
                "shadow-liquid-glass",
              )}
              role="listbox"
              aria-multiselectable={multiple}
            >
              {/* Glass effect layers for dropdown */}
              <div className="liquid-glass-filter" />
              <div className="liquid-glass-overlay" />
              <div className="liquid-glass-specular" />

              <div className="relative z-10">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-center text-liquid-grey/70 text-sm">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = selectedValues.includes(option.value);
                    const isFocused = focusedIndex === index;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          !option.disabled && handleSelect(option.value)
                        }
                        disabled={option.disabled}
                        className={cn(
                          "w-full px-4 py-3 text-left transition-all duration-200",
                          "motion-safe:hover:bg-liquid-glass-bg/20 liquid-glass-interactive:focus-visible",
                          "flex items-center justify-between text-liquid-primary",
                          option.disabled && "cursor-not-allowed opacity-50",
                          isSelected &&
                            "ring-2 ring-text-liquid-accent/30 text-text-liquid-accent",
                          isFocused && "bg-liquid-glass-bg/20",
                          "rounded-full",
                        )}
                        role="option"
                        aria-selected={isSelected}
                        id={`liquid-glass-select-option-${option.value}`}
                      >
                        <span>{option.label}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-text-liquid-accent" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      );
    },
  ),
);

export default GlassSelect;

GlassSelect.displayName = "GlassSelect";
