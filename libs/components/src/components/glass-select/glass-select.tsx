import { Check, ChevronDown, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import {
  cn,
  focusRing,
  getGlassClass,
  microInteraction,
} from "@/core/utils/classname";

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
                if (!option.disabled) {
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
              getGlassClass("default"),
              "w-full rounded-xl px-4 py-3 text-left",
              "flex items-center justify-between",
              "transition-all duration-200 ease-out",
              "border border-white/20 dark:border-white/10",
              "text-gray-900 dark:text-white",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              focusRing,
              "hover:bg-white/10 dark:hover:bg-white/5",
              disabled && "cursor-not-allowed opacity-50",
              isOpen && "border-transparent ring-2 ring-blue-500/50",
              "relative",
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
            {/* Display selected values or placeholder */}
            <div className="flex flex-wrap gap-1">
              {multiple && selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <span
                    key={option.value}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs",
                      "bg-blue-500/20 text-blue-700 dark:text-blue-300",
                    )}
                  >
                    {option.label}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveSelection(option.value, e)}
                      className="rounded-full hover:bg-blue-500/30"
                      aria-label={`Remove ${option.label}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              ) : selectedOptions.length > 0 ? (
                <span className="text-gray-900 dark:text-white">
                  {selectedOptions[0].label}
                </span>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">
                  {placeholder}
                </span>
              )}

              {/* Search input for searchable variant */}
              {searchable && isOpen && (
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="ml-1 flex-1 bg-transparent outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder={selectedOptions.length === 0 ? placeholder : ""}
                  aria-autocomplete="list"
                  aria-controls="glass-select-options"
                />
              )}
            </div>

            {/* Chevron Icon */}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              ref={listRef}
              id="glass-select-options"
              className={cn(
                getGlassClass("elevated"),
                "absolute z-50 mt-2 w-full rounded-xl border border-white/20 dark:border-white/10",
                "max-h-60 overflow-auto",
                "fade-in-0 zoom-in-95 animate-in duration-200",
                "shadow-lg",
              )}
              role="listbox"
              aria-multiselectable={multiple}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 text-sm">
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
                        "w-full px-4 py-3 text-left transition-colors duration-200",
                        "hover:bg-white/10 dark:hover:bg-white/5",
                        "focus:bg-white/10 focus:outline-none dark:focus:bg-white/5",
                        "flex items-center justify-between",
                        "text-gray-900 dark:text-white",
                        microInteraction.gentle,
                        option.disabled && "cursor-not-allowed opacity-50",
                        isSelected &&
                          "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                        isFocused && "bg-white/10",
                        "first:rounded-t-xl last:rounded-b-xl",
                      )}
                      role="option"
                      aria-selected={isSelected}
                      id={`glass-select-option-${option.value}`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      );
    },
  ),
);

GlassSelect.displayName = "GlassSelect";
