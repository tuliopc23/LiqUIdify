import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn, getGlassClass } from "@/lib/glass-utils";

export interface GlassTooltipProps {
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
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (disabled) return;
    
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
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
      }

      // Keep tooltip within viewport
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      if (left < 8) left = 8;
      if (left + tooltipRect.width > viewport.width - 8) {
        left = viewport.width - tooltipRect.width - 8;
      }
      if (top < 8) top = 8;
      if (top + tooltipRect.height > viewport.height - 8) {
        top = viewport.height - tooltipRect.height - 8;
      }

      setTooltipStyle({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999
      });
    }
  }, [isVisible, position]);

  const tooltip = isVisible ? (
    <div
      ref={tooltipRef}
      style={tooltipStyle}
      className={cn(
        getGlassClass("elevated"),
        "px-3 py-2 text-sm rounded-lg",
        "border border-white/20 dark:border-white/10",
        "text-gray-900 dark:text-white",
        "max-w-xs break-words",
        "animate-in fade-in-0 zoom-in-95 duration-200",
        "shadow-lg shadow-black/10 dark:shadow-black/30",
        className
      )}
    >
      {content}
      
      {/* Arrow */}
      <div
        className={cn(
          "absolute w-2 h-2 rotate-45",
          getGlassClass("elevated"),
          "border border-white/20 dark:border-white/10",
          position === "top" && "bottom-[-5px] left-1/2 transform -translate-x-1/2 border-t-0 border-l-0",
          position === "bottom" && "top-[-5px] left-1/2 transform -translate-x-1/2 border-b-0 border-r-0",
          position === "left" && "right-[-5px] top-1/2 transform -translate-y-1/2 border-l-0 border-b-0",
          position === "right" && "left-[-5px] top-1/2 transform -translate-y-1/2 border-r-0 border-t-0"
        )}
      />
    </div>
  ) : null;

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
      
      {tooltip && createPortal(tooltip, document.body)}
    </>
  );
};

GlassTooltip.displayName = "GlassTooltip";