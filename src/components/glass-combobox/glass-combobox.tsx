import React, { forwardRef, useState, useRef, useEffect, useId } from 'react';
import { cn, getGlassClass, microInteraction, focusRing } from '../../lib/glass-utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const comboboxVariants = cva(
  [
    'relative w-full',
  ],
  {
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
  }
);

const triggerVariants = cva(
  [
    'flex items-center justify-between w-full px-4 py-3 text-left',
    'bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl',
    'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
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
      isOpen: false,
      size: 'md',
    },
  }
);

const listboxVariants = cva(
  [
    'absolute z-50 w-full mt-1 max-h-60 overflow-auto',
    'bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl',
    'shadow-xl shadow-black/20',
  ]
);

const optionVariants = cva(
  [
    'flex items-center justify-between px-4 py-3 text-left cursor-pointer',
    'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
    'transition-all duration-200',
    'text-white/90',
  ],
  {
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
      selected: false,
      highlighted: false,
    },
  }
);

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface GlassComboboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof comboboxVariants> {
  options: ComboboxOption[];
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
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const optionsRef = useRef<HTMLDivElement[]>([]);
    
    const comboboxId = useId();
    const listboxId = `${comboboxId}-listbox`;
    const searchId = `${comboboxId}-search`;

    // Filter options based on search query
    const filteredOptions = options.filter(option => {
      if (!searchQuery) return true;
      return option.label.toLowerCase().includes(searchQuery.toLowerCase());
    }).slice(0, maxOptions);

    // Find selected option
    const selectedOption = options.find(option => option.value === selectedValue);

    // Handle option selection
    const handleSelect = (option: ComboboxOption) => {
      if (option.disabled) return;
      
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
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev => 
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            handleSelect(filteredOptions[highlightedIndex]);
          } else if (!isOpen) {
            setIsOpen(true);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchQuery('');
          setHighlightedIndex(-1);
          triggerRef.current?.focus();
          break;
        case 'Tab':
          setIsOpen(false);
          break;
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

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
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
        {...props}
      >
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          className={cn(
            triggerVariants({ isOpen, size }),
            focusRing,
            disabled && 'cursor-not-allowed'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {selectedOption?.icon}
            <span className={cn(
              'truncate',
              !selectedOption && 'text-white/60'
            )}>
              {selectedOption?.label || placeholder}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            {clearable && selectedValue && (
              <div
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClear(e as any);
                  }
                }}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4 text-white/60" />
              </div>
            )}
            <ChevronDown className={cn(
              'w-4 h-4 text-white/60 transition-transform duration-200',
              isOpen && 'rotate-180'
            )} />
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
                  <div className="px-3 pb-2 border-b border-white/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search options..."
                        className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-blue-400/50"
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
                        ref={el => {
                          if (el) optionsRef.current[index] = el;
                        }}
                        role="option"
                        aria-selected={option.value === selectedValue}
                        className={cn(
                          optionVariants({
                            selected: option.value === selectedValue,
                            highlighted: index === highlightedIndex,
                          }),
                          option.disabled && 'opacity-50 cursor-not-allowed'
                        )}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {option.icon}
                          <span className="truncate">{option.label}</span>
                        </div>
                        {option.value === selectedValue && (
                          <Check className="w-4 h-4 text-blue-400" />
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
