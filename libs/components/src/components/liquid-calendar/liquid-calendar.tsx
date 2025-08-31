"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidCalendarVariants = cva("p-3", {
  variants: {
    variant: {
      default: "bg-white/10 backdrop-blur-md border border-white/20 rounded-lg",
      glass: "bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg",
      solid: "bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg",
      ghost: "bg-transparent",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const calendarHeaderVariants = cva("flex items-center justify-between pb-3", {
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

const calendarNavButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "h-8 w-8 bg-transparent text-white hover:bg-white/10",
        ghost: "h-8 w-8 bg-transparent text-white/80 hover:bg-white/5 hover:text-white",
      },
      size: {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const calendarDayVariants = cva(
  "h-9 w-9 text-center text-sm p-0 font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
  {
    variants: {
      variant: {
        default: "text-white hover:bg-white/10 rounded-md",
        ghost: "text-white/80 hover:bg-white/5 rounded-md",
      },
      state: {
        default: "",
        selected: "bg-blue-500/30 text-white hover:bg-blue-500/40",
        today: "bg-white/20 text-white font-semibold",
        outside: "text-white/30 hover:bg-white/5",
        disabled: "text-white/20 opacity-50 cursor-not-allowed",
        range: "bg-blue-500/20 text-white hover:bg-blue-500/30",
        rangeStart: "bg-blue-500/40 text-white hover:bg-blue-500/50 rounded-l-md rounded-r-none",
        rangeEnd: "bg-blue-500/40 text-white hover:bg-blue-500/50 rounded-r-md rounded-l-none",
        rangeMiddle: "bg-blue-500/20 text-white hover:bg-blue-500/30 rounded-none",
      },
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-11 w-11 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "default",
      size: "md",
    },
  }
);

interface CalendarDate {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  isOutsideMonth: boolean;
  isDisabled: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isRangeMiddle?: boolean;
}

interface LiquidCalendarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidCalendarVariants> {
  value?: Date | Date[];
  defaultValue?: Date | Date[];
  onValueChange?: (date: Date | Date[] | undefined) => void;
  mode?: "single" | "multiple" | "range";
  disabled?: (date: Date) => boolean;
  disabledDays?: Date[];
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  showWeekNumbers?: boolean;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
  pagedNavigation?: boolean;
  fromDate?: Date;
  toDate?: Date;
  fromYear?: number;
  toYear?: number;
  captionLayout?: "label" | "dropdown" | "dropdown-buttons";
  hideCaption?: boolean;
  hideNavigation?: boolean;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const LiquidCalendar = React.forwardRef<HTMLDivElement, LiquidCalendarProps>(
  (
    {
      className,
      variant,
      size,
      value,
      defaultValue,
      onValueChange,
      mode = "single",
      disabled,
      disabledDays = [],
      minDate,
      maxDate,
      locale = "en-US",
      weekStartsOn = 0,
      showOutsideDays = true,
      showWeekNumbers = false,
      fixedWeeks = false,
      numberOfMonths = 1,
      pagedNavigation = false,
      fromDate,
      toDate,
      fromYear,
      toYear,
      captionLayout = "label",
      hideCaption = false,
      hideNavigation = false,
      ...props
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedDates, setSelectedDates] = React.useState<Date[]>(() => {
      const initialValue = value || defaultValue;
      if (!initialValue) return [];
      return Array.isArray(initialValue) ? initialValue : [initialValue];
    });

    const isControlled = value !== undefined;

    // Helper functions
    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const isToday = (date: Date) => isSameDay(date, new Date());

    const isDateDisabled = React.useCallback(
      (date: Date) => {
        if (disabled?.(date)) return true;
        if (disabledDays.some((disabledDay) => isSameDay(date, disabledDay))) return true;
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        if (fromDate && date < fromDate) return true;
        if (toDate && date > toDate) return true;
        return false;
      },
      [disabled, disabledDays, minDate, maxDate, fromDate, toDate, isSameDay]
    );

    const isDateSelected = React.useCallback(
      (date: Date) => {
        return selectedDates.some((selectedDate) => isSameDay(date, selectedDate));
      },
      [selectedDates, isSameDay]
    );

    const isDateInRange = React.useCallback(
      (date: Date) => {
        if (mode !== "range" || selectedDates.length !== 2) return false;
        const [start, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime());
        return date >= start && date <= end;
      },
      [mode, selectedDates]
    );

    const isRangeStart = React.useCallback(
      (date: Date) => {
        if (mode !== "range" || selectedDates.length !== 2) return false;
        const [start] = selectedDates.sort((a, b) => a.getTime() - b.getTime());
        return isSameDay(date, start);
      },
      [mode, selectedDates, isSameDay]
    );

    const isRangeEnd = React.useCallback(
      (date: Date) => {
        if (mode !== "range" || selectedDates.length !== 2) return false;
        const [, end] = selectedDates.sort((a, b) => a.getTime() - b.getTime());
        return isSameDay(date, end);
      },
      [mode, selectedDates, isSameDay]
    );

    const isRangeMiddle = React.useCallback(
      (date: Date) => {
        return isDateInRange(date) && !isRangeStart(date) && !isRangeEnd(date);
      },
      [isDateInRange, isRangeStart, isRangeEnd]
    );

    // Generate calendar days
    const generateCalendarDays = React.useCallback(
      (month: Date) => {
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
        const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        // Adjust first day based on week start
        const firstDayOfWeek = (firstDay.getDay() - weekStartsOn + 7) % 7;
        const startDate = new Date(firstDay);
        startDate.setDate(firstDay.getDate() - firstDayOfWeek);

        const days: CalendarDate[] = [];
        const totalDays = fixedWeeks ? 42 : Math.ceil((lastDay.getDate() + firstDayOfWeek) / 7) * 7;

        for (let i = 0; i < totalDays; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);

          const isOutsideMonth = currentDate.getMonth() !== month.getMonth();

          days.push({
            date: currentDate,
            isToday: isToday(currentDate),
            isSelected: isDateSelected(currentDate),
            isOutsideMonth,
            isDisabled: isDateDisabled(currentDate),
            isInRange: isDateInRange(currentDate),
            isRangeStart: isRangeStart(currentDate),
            isRangeEnd: isRangeEnd(currentDate),
            isRangeMiddle: isRangeMiddle(currentDate),
          });
        }

        return days;
      },
      [
        weekStartsOn,
        fixedWeeks,
        isDateSelected,
        isDateDisabled,
        isDateInRange,
        isRangeStart,
        isRangeEnd,
        isRangeMiddle,
        isToday,
      ]
    );

    const handleDateClick = React.useCallback(
      (date: Date) => {
        if (isDateDisabled(date)) return;

        let newSelectedDates: Date[];

        switch (mode) {
          case "single":
            newSelectedDates = [date];
            break;
          case "multiple":
            if (isDateSelected(date)) {
              newSelectedDates = selectedDates.filter((d) => !isSameDay(d, date));
            } else {
              newSelectedDates = [...selectedDates, date];
            }
            break;
          case "range":
            if (selectedDates.length === 0 || selectedDates.length === 2) {
              newSelectedDates = [date];
            } else if (selectedDates.length === 1) {
              const [firstDate] = selectedDates;
              if (date < firstDate) {
                newSelectedDates = [date, firstDate];
              } else {
                newSelectedDates = [firstDate, date];
              }
            } else {
              newSelectedDates = [date];
            }
            break;
          default:
            newSelectedDates = selectedDates;
        }

        if (!isControlled) {
          setSelectedDates(newSelectedDates);
        }

        const result =
          mode === "single"
            ? newSelectedDates[0]
            : mode === "multiple" || mode === "range"
              ? newSelectedDates
              : undefined;

        onValueChange?.(result);
      },
      [mode, selectedDates, isDateSelected, isDateDisabled, isControlled, onValueChange, isSameDay]
    );

    const navigateMonth = React.useCallback((direction: "prev" | "next") => {
      setCurrentMonth((prev) => {
        const newMonth = new Date(prev);
        if (direction === "prev") {
          newMonth.setMonth(prev.getMonth() - 1);
        } else {
          newMonth.setMonth(prev.getMonth() + 1);
        }
        return newMonth;
      });
    }, []);

    const canNavigatePrev = React.useCallback(() => {
      if (fromYear) {
        return (
          currentMonth.getFullYear() > fromYear ||
          (currentMonth.getFullYear() === fromYear && currentMonth.getMonth() > 0)
        );
      }
      if (fromDate) {
        const prevMonth = new Date(currentMonth);
        prevMonth.setMonth(currentMonth.getMonth() - 1);
        return prevMonth >= fromDate;
      }
      return true;
    }, [currentMonth, fromYear, fromDate]);

    const canNavigateNext = React.useCallback(() => {
      if (toYear) {
        return (
          currentMonth.getFullYear() < toYear ||
          (currentMonth.getFullYear() === toYear && currentMonth.getMonth() < 11)
        );
      }
      if (toDate) {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(currentMonth.getMonth() + 1);
        return nextMonth <= toDate;
      }
      return true;
    }, [currentMonth, toYear, toDate]);

    // Update selected dates when controlled value changes
    React.useEffect(() => {
      if (isControlled && value) {
        const newDates = Array.isArray(value) ? value : [value];
        setSelectedDates(newDates);
      }
    }, [isControlled, value]);

    const calendarDays = generateCalendarDays(currentMonth);
    const weekdays = React.useMemo(() => {
      const days = [...WEEKDAYS];
      // Rotate array based on weekStartsOn
      for (let i = 0; i < weekStartsOn; i++) {
        days.push(days.shift()!);
      }
      return days;
    }, [weekStartsOn]);

    const getDayState = (day: CalendarDate) => {
      if (day.isDisabled) return "disabled";
      if (day.isRangeStart) return "rangeStart";
      if (day.isRangeEnd) return "rangeEnd";
      if (day.isRangeMiddle) return "rangeMiddle";
      if (day.isInRange) return "range";
      if (day.isSelected) return "selected";
      if (day.isToday) return "today";
      if (day.isOutsideMonth) return "outside";
      return "default";
    };

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="medium"
        className={cn(liquidCalendarVariants({ variant, size }), className)}
        {...props}
      >
        {/* Header */}
        {!hideCaption && (
          <div className={cn(calendarHeaderVariants({ size }))}>
            <div className="font-semibold text-white">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>

            {!hideNavigation && (
              <div className="flex items-center space-x-1">
                <button
                  className={cn(calendarNavButtonVariants({ size }))}
                  onClick={() => navigateMonth("prev")}
                  disabled={!canNavigatePrev()}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  className={cn(calendarNavButtonVariants({ size }))}
                  onClick={() => navigateNext()}
                  disabled={!canNavigateNext()}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Calendar Grid */}
        <div className="w-full">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2">
            {weekdays.map((day) => (
              <div
                key={day}
                className="h-9 w-9 text-center text-sm font-medium text-white/60 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const shouldShow = showOutsideDays || !day.isOutsideMonth;

              if (!shouldShow) {
                return <div key={index} className="h-9 w-9" />;
              }

              return (
                <button
                  key={index}
                  className={cn(
                    calendarDayVariants({
                      variant,
                      size,
                      state: getDayState(day),
                    })
                  )}
                  onClick={() => handleDateClick(day.date)}
                  disabled={day.isDisabled}
                  aria-selected={day.isSelected}
                  aria-label={day.date.toLocaleDateString(locale, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </LiquidGlass>
    );
  }
);

LiquidCalendar.displayName = "LiquidCalendar";

export {
  liquidCalendarVariants,
  calendarHeaderVariants,
  calendarNavButtonVariants,
  calendarDayVariants,
  type LiquidCalendarProps,
};
