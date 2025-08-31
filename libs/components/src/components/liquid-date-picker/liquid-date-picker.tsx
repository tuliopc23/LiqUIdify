"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidCalendar } from "../liquid-calendar";
import { LiquidGlass } from "../liquid-glass";
import { LiquidPopover } from "../liquid-popover";

const liquidDatePickerVariants = cva("w-full justify-start text-left font-normal", {
  variants: {
    variant: {
      default:
        "bg-white/10 text-white placeholder:text-white/50 hover:bg-white/15 border border-white/20",
      outline:
        "bg-transparent text-white placeholder:text-white/50 hover:bg-white/5 border border-white/30",
      ghost: "bg-transparent text-white placeholder:text-white/50 hover:bg-white/5 border-0",
    },
    size: {
      sm: "h-8 px-2 text-xs rounded-md",
      md: "h-10 px-3 text-sm rounded-lg",
      lg: "h-12 px-4 text-base rounded-lg",
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
});

interface LiquidDatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange">,
    VariantProps<typeof liquidDatePickerVariants> {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  name?: string;
  mode?: "single" | "range";
  rangeValue?: [Date?, Date?];
  onRangeChange?: (range: [Date?, Date?]) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDays?: Date[];
  format?: (date: Date) => string;
  locale?: string;
  closeOnSelect?: boolean;
  showToday?: boolean;
  showClear?: boolean;
  icon?: React.ReactNode;
}

const defaultFormat = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const defaultRangeFormat = (start?: Date, end?: Date) => {
  if (!start && !end) return "";
  if (start && !end) return `${defaultFormat(start)} - ...`;
  if (!start && end) return `... - ${defaultFormat(end)}`;
  if (start && end) return `${defaultFormat(start)} - ${defaultFormat(end)}`;
  return "";
};

export const LiquidDatePicker = React.forwardRef<HTMLDivElement, LiquidDatePickerProps>(
  (
    {
      className,
      variant,
      size,
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = "Pick a date",
      disabled = false,
      error = false,
      required = false,
      name,
      mode = "single",
      rangeValue,
      onRangeChange,
      minDate,
      maxDate,
      disabledDays,
      format = defaultFormat,
      locale = "en-US",
      closeOnSelect = true,
      showToday = true,
      showClear = false,
      icon,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
    const [internalRange, setInternalRange] = React.useState<[Date?, Date?]>(
      rangeValue || [undefined, undefined]
    );

    const isControlled = controlledValue !== undefined;
    const isRangeControlled = rangeValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const currentRange = isRangeControlled ? rangeValue : internalRange;

    const handleValueChange = React.useCallback(
      (date: Date | Date[] | undefined) => {
        if (mode === "single") {
          const singleDate = Array.isArray(date) ? date[0] : date;
          if (!isControlled) {
            setInternalValue(singleDate);
          }
          onValueChange?.(singleDate);
          if (closeOnSelect && singleDate) {
            setOpen(false);
          }
        } else if (mode === "range") {
          const dateArray = Array.isArray(date) ? date : date ? [date] : [];
          const newRange: [Date?, Date?] = [dateArray[0], dateArray[1]];

          if (!isRangeControlled) {
            setInternalRange(newRange);
          }
          onRangeChange?.(newRange);
          if (closeOnSelect && newRange[0] && newRange[1]) {
            setOpen(false);
          }
        }
      },
      [mode, isControlled, isRangeControlled, onValueChange, onRangeChange, closeOnSelect]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (mode === "single") {
          handleValueChange(undefined);
        } else {
          onRangeChange?.([undefined, undefined]);
          if (!isRangeControlled) {
            setInternalRange([undefined, undefined]);
          }
        }
      },
      [mode, handleValueChange, onRangeChange, isRangeControlled]
    );

    const handleToday = React.useCallback(() => {
      const today = new Date();
      if (mode === "single") {
        handleValueChange(today);
      } else {
        const newRange: [Date?, Date?] = [today, today];
        onRangeChange?.(newRange);
        if (!isRangeControlled) {
          setInternalRange(newRange);
        }
      }
      if (closeOnSelect) {
        setOpen(false);
      }
    }, [mode, handleValueChange, onRangeChange, isRangeControlled, closeOnSelect]);

    // Format display value
    const displayValue = React.useMemo(() => {
      if (mode === "single") {
        return currentValue ? format(currentValue) : placeholder;
      }
      const [start, end] = currentRange;
      if (!start && !end) return placeholder;
      return defaultRangeFormat(start, end);
    }, [mode, currentValue, currentRange, format, placeholder]);

    const hasValue = mode === "single" ? !!currentValue : !!(currentRange[0] || currentRange[1]);

    // Calendar props
    const calendarProps = {
      mode: mode as "single" | "range",
      value: mode === "single" ? currentValue : currentRange.filter(Boolean),
      onValueChange: handleValueChange,
      disabled: disabledDays,
      minDate,
      maxDate,
      locale,
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Hidden input for form integration */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={
              mode === "single"
                ? currentValue?.toISOString() || ""
                : currentRange.map((d) => d?.toISOString() || "").join(",")
            }
          />
        )}

        <LiquidPopover open={open} onOpenChange={setOpen}>
          <LiquidPopover.Trigger asChild>
            <LiquidGlass
              variant="card"
              intensity="subtle"
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50",
                liquidDatePickerVariants({
                  variant,
                  size,
                  state: error ? "error" : open ? "open" : "default",
                }),
                !hasValue && "text-white/50"
              )}
              role="button"
              aria-expanded={open}
              aria-haspopup="dialog"
              data-state={open ? "open" : "closed"}
              disabled={disabled}
            >
              <div className="flex items-center">
                {icon && <span className="mr-2 h-4 w-4 opacity-50">{icon}</span>}
                <span className="truncate">{displayValue}</span>
              </div>

              <div className="flex items-center space-x-1">
                {showClear && hasValue && !disabled && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="rounded p-1 hover:bg-white/10"
                    tabIndex={-1}
                  >
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
                  className="h-4 w-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </LiquidGlass>
          </LiquidPopover.Trigger>

          <LiquidPopover.Content className="w-auto p-0" align="start">
            <LiquidCalendar {...calendarProps} />

            {(showToday || showClear) && (
              <div className="border-t border-white/20 p-3">
                <div className="flex items-center justify-between space-x-2">
                  {showToday && (
                    <button
                      onClick={handleToday}
                      className="rounded-md px-3 py-1 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      Today
                    </button>
                  )}

                  {showClear && hasValue && (
                    <button
                      onClick={handleClear}
                      className="rounded-md px-3 py-1 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </LiquidPopover.Content>
        </LiquidPopover>
      </div>
    );
  }
);

LiquidDatePicker.displayName = "LiquidDatePicker";

// Range Date Picker
interface LiquidDateRangePickerProps
  extends Omit<
    LiquidDatePickerProps,
    "mode" | "value" | "onValueChange" | "rangeValue" | "onRangeChange"
  > {
  value?: [Date?, Date?];
  onValueChange?: (range: [Date?, Date?]) => void;
}

export const LiquidDateRangePicker = React.forwardRef<HTMLDivElement, LiquidDateRangePickerProps>(
  ({ value, onValueChange, placeholder = "Pick date range", ...props }, ref) => {
    return (
      <LiquidDatePicker
        ref={ref}
        mode="range"
        rangeValue={value}
        onRangeChange={onValueChange}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

LiquidDateRangePicker.displayName = "LiquidDateRangePicker";

// Preset Date Picker with common date selections
interface LiquidPresetDatePickerProps extends LiquidDatePickerProps {
  presets?: Array<{
    label: string;
    value: Date | [Date?, Date?];
  }>;
}

export const LiquidPresetDatePicker = React.forwardRef<HTMLDivElement, LiquidPresetDatePickerProps>(
  ({ presets = [], ...props }, ref) => {
    const defaultPresets = [
      { label: "Today", value: new Date() },
      { label: "Yesterday", value: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      {
        label: "Last 7 days",
        value: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
      },
      {
        label: "Last 30 days",
        value: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()] as [Date, Date],
      },
      {
        label: "This month",
        value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] as [
          Date,
          Date,
        ],
      },
    ];

    const allPresets = presets.length > 0 ? presets : defaultPresets;

    const handlePresetSelect = (preset: (typeof allPresets)[0]) => {
      if (props.mode === "range" && Array.isArray(preset.value)) {
        props.onRangeChange?.(preset.value);
      } else if (props.mode === "single" && !Array.isArray(preset.value)) {
        props.onValueChange?.(preset.value);
      }
    };

    return (
      <LiquidDatePicker ref={ref} {...props}>
        <div className="border-t border-white/20 p-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-white/60 mb-2">Quick select:</p>
            <div className="flex flex-wrap gap-1">
              {allPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetSelect(preset)}
                  className="rounded-md px-2 py-1 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </LiquidDatePicker>
    );
  }
);

LiquidPresetDatePicker.displayName = "LiquidPresetDatePicker";

export { liquidDatePickerVariants, type LiquidDatePickerProps };
