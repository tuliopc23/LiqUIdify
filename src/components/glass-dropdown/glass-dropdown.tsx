import React, { useEffect, useRef, useState } from 'react';
import { cn, getGlassClass } from '@/core/utils/classname';
import { useIsClient } from '@/hooks/use-ssr-safe';

export interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  separator?: boolean;
}

export interface GlassDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (value: string) => void;
  className?: string;
  contentClassName?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export const GlassDropdown = React.forwardRef<
  HTMLDivElement,
  GlassDropdownProps
>(
  (
    {
      trigger,
      items,
      onSelect,
      className,
      contentClassName,
      align = 'start',
      sideOffset = 4,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isClient = useIsClient();

    useEffect(() => {
      if (!isClient) {
        return;
      }

      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          dropdownRef.current &&
          triggerRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (isOpen && 'Escape' === event.key) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('keydown', handleEscape);
        };
      }

      return undefined;
    }, [isClient, isOpen]);

    useEffect(() => {
      if (!isClient || !isOpen || !triggerRef.current || !dropdownRef.current) {
        return;
      }

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();

      let top = triggerRect.bottom + sideOffset;
      let left = triggerRect.left;

      // Align dropdown
      switch (align) {
        case 'center':
          left =
            triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
          break;
        case 'end':
          left = triggerRect.right - dropdownRect.width;
          break;
      }

      // Keep dropdown within viewport
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (8 > left) {left = 8;}
      if (left + dropdownRect.width > viewport.width - 8) {
        left = viewport.width - dropdownRect.width - 8;
      }
      if (top + dropdownRect.height > viewport.height - 8) {
        top = triggerRect.top - dropdownRect.height - sideOffset;
      }

      setDropdownStyle({
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      });
    }, [isClient, isOpen, align, sideOffset]);

    const handleSelect = (item: DropdownItem) => {
      if (item.disabled || item.separator) {return;}

      onSelect?.(item.value);
      setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        {...props}
      >
        <div
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
        >
          {trigger}
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className={cn(
              getGlassClass('elevated'),
              'py-1 rounded-xl border border-white/20 dark:border-white/10',
              'min-w-[160px] max-w-[300px]',
              'animate-in fade-in-0 zoom-in-95 duration-200',
              contentClassName
            )}
          >
            {items.map((item, index) => {
              if (item.separator) {
                return (
                  <div
                    key={`separator-${index}`}
                    className="my-1 border-t border-white/10 dark:border-white/5"
                  />
                );
              }

              return (
                <button
                  key={item.value}
                  onClick={() => handleSelect(item)}
                  disabled={item.disabled}
                  className={cn(
                    'w-full px-3 py-2 text-left transition-colors duration-200',
                    'hover:bg-white/10 dark:hover:bg-white/5',
                    'focus:outline-none focus:bg-white/10 dark:focus:bg-white/5',
                    'flex items-center space-x-2',
                    'text-gray-900 dark:text-white text-sm',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {item.icon && (
                    <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
                  )}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

GlassDropdown.displayName = 'GlassDropdown';
