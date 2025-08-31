import React, { useEffect, useRef, useState } from "react";
import { useIsClient } from "@/hooks/use-ssr-safe";
import { cn, getSurfaceClass } from "../../core/utils/classname";

interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  separator?: boolean;
}

interface GlassDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (value: string) => void;
  className?: string;
  contentClassName?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const GlassDropdown = React.memo(
  React.forwardRef<HTMLDivElement, GlassDropdownProps>(
    (
      {
        trigger,
        items,
        onSelect,
        className,
        contentClassName,
        align = "start",
        sideOffset = 4,
        ...props
      },
      ref
    ) => {
      const [isOpen, setIsOpen] = useState(false);
      const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
      const triggerRef = useRef<HTMLButtonElement>(null);
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
          if (isOpen && event.key === "Escape") {
            setIsOpen(false);
          }
        };

        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
          document.addEventListener("keydown", handleEscape);
        }

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEscape);
        };
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
          case "center": {
            left = triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
            break;
          }
          case "end": {
            left = triggerRect.right - dropdownRect.width;
            break;
          }
        }

        // Keep dropdown within viewport
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        if (left < 8) {
          left = 8;
        }
        if (left + dropdownRect.width > viewport.width - 8) {
          left = viewport.width - dropdownRect.width - 8;
        }
        if (top + dropdownRect.height > viewport.height - 8) {
          top = triggerRect.top - dropdownRect.height - sideOffset;
        }

        setDropdownStyle({
          position: "fixed",
          top: `${top}px`,
          left: `${left}px`,
          zIndex: 9999,
        });
      }, [isClient, isOpen, align, sideOffset]);

      const handleSelect = (item: DropdownItem) => {
        if (item.disabled || item.separator) {
          return;
        }

        onSelect?.(item.value);
        setIsOpen(false);
      };

      return (
        <div ref={ref} className={cn("", "relative inline-block", className)} {...props}>
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
            aria-expanded={isOpen}
            aria-haspopup="true"
            className="cursor-pointer rounded-full"
          >
            {trigger}
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              style={dropdownStyle}
              className={cn(
                getSurfaceClass("elevated"),
                "rounded-full border border-blue-300/20 py-1 dark:border-blue-300/10",
                "min-w-[160px] max-w-[300px]",
                "fade-in-0 zoom-in-95 animate-in duration-200",
                contentClassName
              )}
            >
              {items.map((item, index) => {
                if (item.separator) {
                  return (
                    <div
                      key={`separator-${index}`}
                      className="my-1 border-blue-300/10 border-t dark:border-blue-300/5"
                    />
                  );
                }

                return (
                  <div
                    key={item.value}
                    className={cn(
                      " rounded-full",
                      "transition-all duration-200",
                      item.disabled && "opacity-60"
                    )}
                  >
                    <div />
                    <div />
                    <div />
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      disabled={item.disabled}
                      className={cn(
                        " w-full px-3 py-2 text-left",
                        "flex items-center gap-2 rounded-full bg-transparent",
                        "text-blue-700 text-sm dark:text-blue-900-inverse",
                        "hover:scale-[1.02] active:scale-[0.98] outline-none",
                        item.disabled && "cursor-not-allowed"
                      )}
                    >
                      {item.icon && <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>}
                      <span className="truncate">{item.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
  )
);

GlassDropdown.displayName = "GlassDropdown";
