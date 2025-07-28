import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import type React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { cn, focusRing } from '@/core/utils/classname';
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from '../../lib/variant-system';

const datePickerVariants = cva({
  base: 'relative w-full',
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

const triggerVariants = cva({
  base: cn(
    'flex w-full items-center justify-between px-4 py-3 text-left',
    'rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm',
    'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
    'transition-all duration-200',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ),
  variants: {
    isOpen: {
      true: 'border-blue-400/50 bg-white/10',
      false: 'border-white/10',
    },
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    },
  },
  defaultVariants: {
    isOpen: 'false',
    size: 'md',
  },
});

const calendarVariants = cva({
  base: cn(
    'absolute z-50 mt-1 p-4',
    'rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl',
    'shadow-black/20 shadow-xl',
    'min-w-[280px]'
  ),
  variants: {},
});

export interface GlassDatePickerProps
  extends Omit<
      Omit<React.HTMLAttributes<HTMLDivElement>, keyof React.AriaAttributes>,
      'onChange' | 'defaultValue'
    >,
    VariantProps<typeof datePickerVariants> {
  value?: Date;

  defaultValue?: Date;

  onChange?: (date: Date | null) => void;
  placeholder?: string;

  disabled?: boolean;

  showTime?: boolean;
  format?: string;
  locale?: string;

  minDate?: Date;

  maxDate?: Date;

  disabledDates?: Array<Date>;

  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const GlassDatePicker = forwardRef<HTMLDivElement, GlassDatePickerProps>(
  (
    {
      className,
      size,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select date...',
      disabled = false,
      showTime = false,
      format,
      locale = 'en-US',
      minDate,
      maxDate,
      disabledDates = [],
      weekStartsOn = 0,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      value || defaultValue
    );
    const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());
    const [timeValue, setTimeValue] = useState({
      hours: selectedDate?.getHours() || 0,
      minutes: selectedDate?.getMinutes() || 0,
    });

    const triggerRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Format date for display
    const formatDate = (date: Date | null): string => {
      if (!date) {
        return '';
      }

      const formatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...(showTime && { hour: '2-digit', minute: '2-digit' }),
      };

      return new Intl.DateTimeFormat(locale, formatOptions).format(date);
    };

    // Get days in month
    const getDaysInMonth = (date: Date): Array<Date> => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();

      const days: Array<Date> = [];

      // Add empty cells for days before the first day of the month

      const startDay = (firstDay.getDay() - weekStartsOn + 7) % 7;
      for (let index = 0; index < startDay; index++) {
        days.push(new Date(year, month, -startDay + index + 1));
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      // Add empty cells for days after the last day of the month
      const remainingCells = 42 - days.length; // 6 weeks × 7 days
      for (let index = 1; index <= remainingCells; index++) {
        days.push(new Date(year, month + 1, index));
      }

      return days;
    };

    // Check if date is disabled
    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) {
        return true;
      }

      if (maxDate && date > maxDate) {
        return true;
      }

      return disabledDates.some(
        (disabledDate: unknown) =>
          date.toDateString() === disabledDate.toDateString()
      );
    };

    // Handle date selection
    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date)) {
        return;
      }

      const newDate = new Date(date);

      if (showTime) {
        newDate.setHours(timeValue.hours, timeValue.minutes);
      }

      setSelectedDate(newDate);

      onChange?.(newDate);

      if (!showTime) {
        setIsOpen(false);
      }
    };

    // Handle time change
    const handleTimeChange = (type: 'hours' | 'minutes', value: number) => {
      const newTimeValue = { ...timeValue, [type]: value };
      setTimeValue(newTimeValue);

      if (selectedDate) {
        const newDate = new Date(selectedDate);
        newDate.setHours(newTimeValue.hours, newTimeValue.minutes);
        setSelectedDate(newDate);

        onChange?.(newDate);
      }
    };

    // Navigate months
    const navigateMonth = (direction: 'prev' | 'next') => {
      const newDate = new Date(viewDate);
      if ('prev' === direction) {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      setViewDate(newDate);
    };

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if ('undefined' !== typeof document) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        if ('undefined' !== typeof document) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      };
    }, []);

    const days = getDaysInMonth(viewDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const reorderedWeekDays = [
      ...weekDays.slice(weekStartsOn),

      ...weekDays.slice(0, weekStartsOn),
    ];

    return (
      <div
        ref={ref}
        className={cn(datePickerVariants({ size }), className)}
        {...(props as unknown)}
      >
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            triggerVariants({ isOpen: isOpen ? 'true' : 'false', size }),
            focusRing,
            disabled && 'cursor-not-allowed'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-white/60" />

            <span
              className={cn(
                'flex-1 text-left',
                !selectedDate && 'text-white/60'
              )}
            >
              {formatDate(selectedDate) || placeholder}
            </span>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(calendarVariants())}
            >
              <div ref={calendarRef} className="space-y-4">
                {/* Header */}

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateMonth('prev')}
                    className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <h2 className="font-semibold text-lg text-white">
                    {viewDate.toLocaleDateString(locale, {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h2>

                  <button
                    type="button"
                    onClick={() => navigateMonth('next')}
                    className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Calendar Grid */}

                <div className="grid grid-cols-7 gap-1">
                  {/* Week day headers */}
                  {reorderedWeekDays.map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center font-medium text-white/60 text-xs"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Date cells */}
                  {days.map((date, index) => {
                    const isCurrentMonth =
                      date.getMonth() === viewDate.getMonth();
                    const isSelected =
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString();
                    const isToday =
                      date.toDateString() === new Date().toDateString();
                    const disabled = isDateDisabled(date);

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        disabled={disabled}
                        className={cn(
                          'rounded-lg p-2 text-center text-sm transition-all duration-200',
                          'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
                          !isCurrentMonth && 'text-white/30',
                          isSelected && 'bg-blue-500/20 text-blue-400',
                          isToday && !isSelected && 'bg-white/10 text-white',
                          disabled && 'cursor-not-allowed opacity-50'
                        )}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                {/* Time picker */}
                {showTime && (
                  <div className="border-white/10 border-t pt-4">
                    <div className="flex items-center justify-center gap-4">
                      <Clock className="h-4 w-4 text-white/60" />

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="23"
                          value={timeValue.hours}
                          onChange={(e) =>
                            handleTimeChange(
                              'hours',
                              Number.parseInt(e.target.value)
                            )
                          }
                          className="w-16 rounded border border-white/10 bg-white/5 px-2 py-1 text-center text-white"
                        />

                        <span className="text-white/60">:</span>

                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={timeValue.minutes}
                          onChange={(e) =>
                            handleTimeChange(
                              'minutes',
                              Number.parseInt(e.target.value)
                            )
                          }
                          className="w-16 rounded border border-white/10 bg-white/5 px-2 py-1 text-center text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassDatePicker.displayName = 'GlassDatePicker';

export { GlassDatePicker };
