import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

import { cn, getSurfaceClass } from "../../core/utils/classname";

interface GlassPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
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
  position = "bottom",
  align = "center",
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

  const isOpen = controlledOpen === undefined ? internalOpen : controlledOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (onOpenChange) {
        onOpenChange(open);
      } else {
        setInternalOpen(open);
      }
    },
    [onOpenChange]
  );

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (isOpen && triggerRef.current && popoverRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Calculate position
      switch (position) {
        case "top": {
          top = triggerRect.top - popoverRect.height - 8;
          switch (align) {
            case "start": {
              left = triggerRect.left;
              break;
            }
            case "center": {
              left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
              break;
            }
            case "end": {
              left = triggerRect.right - popoverRect.width;
              break;
            }
          }
          break;
        }
        case "bottom": {
          top = triggerRect.bottom + 8;
          switch (align) {
            case "start": {
              left = triggerRect.left;
              break;
            }
            case "center": {
              left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
              break;
            }
            case "end": {
              left = triggerRect.right - popoverRect.width;
              break;
            }
          }
          break;
        }
        case "left": {
          left = triggerRect.left - popoverRect.width - 8;
          switch (align) {
            case "start": {
              top = triggerRect.top;
              break;
            }
            case "center": {
              top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
              break;
            }
            case "end": {
              top = triggerRect.bottom - popoverRect.height;
              break;
            }
          }
          break;
        }
        case "right": {
          left = triggerRect.right + 8;
          switch (align) {
            case "start": {
              top = triggerRect.top;
              break;
            }
            case "center": {
              top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
              break;
            }
            case "end": {
              top = triggerRect.bottom - popoverRect.height;
              break;
            }
          }
          break;
        }
      }

      // Keep popover within viewport
      const viewport = {
        width: typeof window === "undefined" ? 1024 : window.innerWidth,
        height: typeof window === "undefined" ? 768 : window.innerHeight,
      };

      if (left < 8) {
        left = 8;
      }
      if (left + popoverRect.width > viewport.width - 8) {
        left = viewport.width - popoverRect.width - 8;
      }
      if (top < 8) {
        top = 8;
      }
      if (top + popoverRect.height > viewport.height - 8) {
        top = viewport.height - popoverRect.height - 8;
      }

      setPopoverStyle({
        position: "fixed",
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
      if (closeOnEscape && isOpen && event.key === "Escape") {
        setOpen(false);
      }
    };

    if (isOpen) {
      if (typeof document !== "undefined") {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
      }
    } else if (typeof document !== "undefined") {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      }
    };
  }, [isOpen, closeOnClickOutside, closeOnEscape, setOpen]);

  const popover = isOpen ? (
    <div
      ref={popoverRef}
      style={popoverStyle}
      className={cn(
        "",
        getSurfaceClass("elevated"),
        "rounded-xl p-4",
        "border border-blue-300/20 dark:border-blue-300/10",
        "/10 dark:/20 backdrop-blur-md",
        "shadow-lg shadow-black/10 dark:shadow-black/30",
        "fade-in-0 zoom-in-95 animate-in duration-200",
        "max-w-sm",
        contentClassName
      )}
    >
      {content}
    </div>
  ) : undefined;

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleOpen();
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn("inline-block cursor-pointer", className)}
      >
        {trigger}
      </button>

      {popover && typeof window !== "undefined" && createPortal(popover, document.body)}
    </>
  );
};

GlassPopover.displayName = "GlassPopover";
