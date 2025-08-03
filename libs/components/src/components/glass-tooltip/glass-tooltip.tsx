import type React from "react";
import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

import { cn, getGlassClass } from "../../core/utils/classname";

interface GlassTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const GlassTooltip: React.FC<GlassTooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 500,
  className,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (disabled) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top": {
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        }
        case "bottom": {
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        }
        case "left": {
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        }
        case "right": {
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
        }
      }

      // Keep tooltip within viewport
      const viewport = {
        width: typeof window === "undefined" ? 1024 : window.innerWidth,
        height: typeof window === "undefined" ? 768 : window.innerHeight,
      };

      if (left < 8) {
        left = 8;
      }
      if (left + tooltipRect.width > viewport.width - 8) {
        left = viewport.width - tooltipRect.width - 8;
      }
      if (top < 8) {
        top = 8;
      }
      if (top + tooltipRect.height > viewport.height - 8) {
        top = viewport.height - tooltipRect.height - 8;
      }

      setTooltipStyle({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      });
    }
  }, [isVisible, position]);

  const tooltip = isVisible ? (
    <div
      ref={tooltipRef}
      style={tooltipStyle}
      className=liquid-glass {cn(
        getGlassClass("elevated"),
        "rounded-lg px-3 py-2 text-sm",
        "border border-white/20 dark:border-white/10",
        "text-gray-900 dark:text-white",
        "max-w-xs break-words",
        "fade-in-0 zoom-in-95 animate-in duration-200",
        "shadow-black/10 shadow-lg dark:shadow-black/30",
        className,
      )}
    >
      {content}

      {/* Arrow */}

      <div
        className={cn(
          "absolute h-2 w-2 rotate-45",
          getGlassClass("elevated"),
          "border border-white/20 dark:border-white/10",
          position === "top" &&
            "-translate-x-1/2 bottom-[-5px] left-1/2 transform border-t-0 border-l-0",
          position === "bottom" &&
            "-translate-x-1/2 top-[-5px] left-1/2 transform border-r-0 border-b-0",
          position === "left" &&
            "-translate-y-1/2 top-1/2 right-[-5px] transform border-b-0 border-l-0",
          position === "right" &&
            "-translate-y-1/2 top-1/2 left-[-5px] transform border-t-0 border-r-0",
        )}
      />
    </div>
  ) : undefined;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {tooltip &&
        typeof window !== "undefined" &&
        createPortal(tooltip, document.body)}
    </>
  );
};

GlassTooltip.displayName = "GlassTooltip";
