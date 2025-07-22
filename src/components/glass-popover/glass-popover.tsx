import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn, getGlassClass } from '@/core/utils/classname';

export interface GlassPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

export const GlassPopover: React.FC<GlassPopoverProps> = ({
  trigger,
  content,
  position = 'bottom',
  align = 'center',
  className,
  contentClassName,
  open: controlledOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback((open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalOpen(open);
    }
  }, [onOpenChange]);

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    if ('undefined' === typeof window) {return undefined;}
    if (isOpen && triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Calculate position
      switch (position) {
        case 'top':
          top = triggerRect.top - popoverRect.height - 8;
          switch (align) {
            case 'start':
              left = triggerRect.left;
              break;
            case 'center':
              left =
                triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
              break;
            case 'end':
              left = triggerRect.right - popoverRect.width;
              break;
          }
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          switch (align) {
            case 'start':
              left = triggerRect.left;
              break;
            case 'center':
              left =
                triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
              break;
            case 'end':
              left = triggerRect.right - popoverRect.width;
              break;
          }
          break;
        case 'left':
          left = triggerRect.left - popoverRect.width - 8;
          switch (align) {
            case 'start':
              top = triggerRect.top;
              break;
            case 'center':
              top =
                triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
              break;
            case 'end':
              top = triggerRect.bottom - popoverRect.height;
              break;
          }
          break;
        case 'right':
          left = triggerRect.right + 8;
          switch (align) {
            case 'start':
              top = triggerRect.top;
              break;
            case 'center':
              top =
                triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
              break;
            case 'end':
              top = triggerRect.bottom - popoverRect.height;
              break;
          }
          break;
      }

      // Keep popover within viewport
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (8 > left) {left = 8;}
      if (left + popoverRect.width > viewport.width - 8) {
        left = viewport.width - popoverRect.width - 8;
      }
      if (8 > top) {top = 8;}
      if (top + popoverRect.height > viewport.height - 8) {
        top = viewport.height - popoverRect.height - 8;
      }

      setPopoverStyle({
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      });
    }
  }, [isOpen, position, align]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        isOpen &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && isOpen && 'Escape' === event.key) {
        setOpen(false);
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
  }, [isOpen, closeOnClickOutside, closeOnEscape, setOpen]);

  const popover = isOpen ? (
    <div
      ref={popoverRef}
      style={popoverStyle}
      className={cn(
        getGlassClass('elevated'),
        'p-4 rounded-xl',
        'border border-white/20 dark:border-white/10',
        'shadow-lg shadow-black/10 dark:shadow-black/30',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        'max-w-sm',
        contentClassName
      )}
    >
      {content}
    </div>
  ) : undefined;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleOpen();
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn('inline-block cursor-pointer', className)}
      >
        {trigger}
      </button>

      {popover &&
        'undefined' !== typeof window &&
        createPortal(popover, document.body)}
    </>
  );
};

GlassPopover.displayName = 'GlassPopover';
