import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import type React from 'react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { cn, focusRing } from '@/core/utils/classname';
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from '../../lib/variant-system';

const comboboxVariants = cva({
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

const listboxVariants = cva({
  base: cn(
    'absolute z-50 mt-1 max-h-60 w-full overflow-auto',
    'rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl',
    'shadow-black/20 shadow-xl'
  ),
  variants: {},
});

const optionVariants = cva({
  base: cn(
    'flex cursor-pointer items-center justify-between px-4 py-3 text-left',
    'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
    'transition-all duration-200',
    'text-white/90'
  ),
  variants: {
    selected: {
      true: 'bg-blue-500/20 text-blue-400',
      false: 'text-white/90',
    },
    highlighted: {
      true: 'bg-white/10',
      false: '',
    },
  },
  defaultVariants: {
    selected: 'false',
    highlighted: 'false',
  },
});

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface GlassComboboxProps
  extends Omit<
      Omit<React.HTMLAttributes<HTMLDivElement>, keyof React.AriaAttributes>,
      'onChange'
    >,
    VariantProps<typeof comboboxVariants> {
  options: Array<ComboboxOption>;
  value?: string;
  defaultValue?: string;

  onChange?: (value: string) => void;

  onSearch?: (query: string) => void;
  placeholder?: string;

  disabled?: boolean;

  clearable?: boolean;

  searchable?: boolean;

  loading?: boolean;
  emptyMessage?: string;

  maxOptions?: number;
}

const GlassCombobox = forwardRef<HTMLDivElement, GlassComboboxProps>(
  (
    {
      className,
      size,
      options,
      value,
      defaultValue,
      onChange,
      onSearch,
      placeholder = 'Select option...',
      disabled = false,
      clearable = false,
      searchable = true,
      loading = false,
      emptyMessage = 'No options found',
      maxOptions = 100,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || ''
    );
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<Array<HTMLDivElement>>([]);

    const comboboxId = useId();
    const listboxId = `${comboboxId}-listbox`;

    // Filter options based on search query

    const filteredOptions = options

      .filter((option) => {
        if (!searchQuery) {
          return true;
        }
        return option.label.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .slice(0, maxOptions);

    // Find selected option

    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    // Handle option selection
    const handleSelect = (option: ComboboxOption) => {
      if (option.disabled) {
        return;
      }

      setSelectedValue(option.value);

      onChange?.(option.value);
      setIsOpen(false);
      setSearchQuery('');
      setHighlightedIndex(-1);
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValue('');

      onChange?.('');
      setSearchQuery('');
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((previous) =>
              previous < filteredOptions.length - 1 ? previous + 1 : previous
            );
          } else {
            setIsOpen(true);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((previous) =>
              0 < previous ? previous - 1 : previous
            );
          }
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (isOpen && 0 <= highlightedIndex) {
            const option = filteredOptions[highlightedIndex];
            if (option) {
              handleSelect(option);
            }
          } else if (!isOpen) {
            setIsOpen(true);
          }
          break;
        }
        case 'Escape': {
          setIsOpen(false);
          setSearchQuery('');
          setHighlightedIndex(-1);
          triggerRef.current?.focus();
          break;
        }
        case 'Tab': {
          setIsOpen(false);
          break;
        }
      }
    };

    // Handle search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);

      onSearch?.(query);
      setHighlightedIndex(-1);
    };

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          listboxRef.current &&
          !listboxRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery('');
          setHighlightedIndex(-1);
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

    // Scroll highlighted option into view
    useEffect(() => {
      if (0 <= highlightedIndex && optionsRef.current[highlightedIndex]) {
        optionsRef.current[highlightedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }, [highlightedIndex]);

    return (
      <div
        ref={ref}
        className={cn(comboboxVariants({ size }), className)}
        {...(props as any)}
      >
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          className={cn(
            triggerVariants({ isOpen: isOpen ? 'true' : 'false', size }),
            focusRing,
            disabled && 'cursor-not-allowed'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          disabled={disabled}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {selectedOption?.icon}

            <span
              className={cn('truncate', !selectedOption && 'text-white/60')}
            >
              {selectedOption?.label || placeholder}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {clearable && selectedValue && (
              <button
                type="button"
                onClick={handleClear}
                className="cursor-pointer rounded-lg p-1 transition-colors hover:bg-white/10"
                aria-label="Clear selection"
                aria-haspopup="false"
              >
                <X className="h-4 w-4 text-white/60" />
              </button>
            )}

            <ChevronDown
              className={cn(
                'h-4 w-4 text-white/60 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(listboxVariants())}
            >
              <div
                ref={listboxRef}
                role="listbox"
                id={listboxId}
                aria-label="Options"
                className="py-2"
              >
                {searchable && (
                  <div className="border-white/10 border-b px-3 pb-2">
                    <div className="relative">
                      <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-white/60" />

                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search options..."
                        className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pr-3 pl-10 text-white placeholder-white/60 focus:border-blue-400/50 focus:outline-none"
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </div>
                )}

                <div className="max-h-48 overflow-y-auto">
                  {loading ? (
                    <div className="px-4 py-3 text-center text-white/60">
                      Loading...
                    </div>
                  ) : filteredOptions.length === 0 ? (
                    <div className="px-4 py-3 text-center text-white/60">
                      {emptyMessage}
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => (
                      <div
                        key={option.value}
                        ref={(element) => {
                          if (element) {
                            optionsRef.current[index] = element;
                          }
                        }}
                        role="option"
                        aria-selected={option.value === selectedValue}
                        className={cn(
                          optionVariants({
                            selected:
                              option.value === selectedValue ? 'true' : 'false',
                            highlighted:
                              index === highlightedIndex ? 'true' : 'false',
                          }),
                          option.disabled && 'cursor-not-allowed opacity-50'
                        )}
                        onClick={() => handleSelect(option)}
                        onKeyDown={(e) => {
                          if ('Enter' === e.key || ' ' === e.key) {
                            e.preventDefault();
                            handleSelect(option);
                          }
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        tabIndex={-1}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          {option.icon}

                          <span className="truncate">{option.label}</span>
                        </div>
                        {option.value === selectedValue && (
                          <Check className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassCombobox.displayName = 'GlassCombobox';

export { GlassCombobox };
