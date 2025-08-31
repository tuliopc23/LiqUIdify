"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const liquidScrollAreaVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      default: "",
      glass: "bg-white/5 backdrop-blur-sm rounded-lg",
      bordered: "border border-white/20 rounded-lg",
    },
    type: {
      auto: "",
      always: "",
      scroll: "",
      hover: "",
    },
  },
  defaultVariants: {
    variant: "default",
    type: "auto",
  },
});

const scrollbarVariants = cva("flex touch-none select-none transition-colors", {
  variants: {
    orientation: {
      vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",
      horizontal: "w-full h-2.5 border-t border-t-transparent p-[1px]",
    },
    variant: {
      default: "",
      glass: "bg-white/10 backdrop-blur-sm rounded-full",
      minimal: "bg-transparent",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    variant: "default",
  },
});

const scrollbarThumbVariants = cva("relative flex-1 rounded-full transition-colors", {
  variants: {
    variant: {
      default: "bg-white/30 hover:bg-white/40",
      glass: "bg-white/20 hover:bg-white/30 backdrop-blur-sm",
      minimal: "bg-white/20 hover:bg-white/30",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface LiquidScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidScrollAreaVariants> {
  type?: "auto" | "always" | "scroll" | "hover";
  scrollHideDelay?: number;
  orientation?: "vertical" | "horizontal" | "both";
  scrollbarVariant?: "default" | "glass" | "minimal";
}

export const LiquidScrollArea = React.forwardRef<HTMLDivElement, LiquidScrollAreaProps>(
  (
    {
      className,
      variant,
      type = "auto",
      scrollHideDelay = 600,
      orientation = "both",
      scrollbarVariant = "default",
      children,
      ...props
    },
    ref
  ) => {
    const [isScrolling, setIsScrolling] = React.useState(false);
    const [showVerticalScrollbar, setShowVerticalScrollbar] = React.useState(false);
    const [showHorizontalScrollbar, setShowHorizontalScrollbar] = React.useState(false);
    const [verticalThumbHeight, setVerticalThumbHeight] = React.useState(0);
    const [verticalThumbTop, setVerticalThumbTop] = React.useState(0);
    const [horizontalThumbWidth, setHorizontalThumbWidth] = React.useState(0);
    const [horizontalThumbLeft, setHorizontalThumbLeft] = React.useState(0);

    const viewportRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const verticalTrackRef = React.useRef<HTMLDivElement>(null);
    const horizontalTrackRef = React.useRef<HTMLDivElement>(null);
    const hideTimeoutRef = React.useRef<NodeJS.Timeout>();

    // Calculate scrollbar dimensions and positions
    const updateScrollbars = React.useCallback(() => {
      if (!viewportRef.current || !contentRef.current) return;

      const viewport = viewportRef.current;
      const content = contentRef.current;

      const viewportHeight = viewport.clientHeight;
      const contentHeight = content.scrollHeight;
      const viewportWidth = viewport.clientWidth;
      const contentWidth = content.scrollWidth;

      // Vertical scrollbar
      if (orientation === "vertical" || orientation === "both") {
        const hasVerticalScroll = contentHeight > viewportHeight;
        setShowVerticalScrollbar(hasVerticalScroll);

        if (hasVerticalScroll) {
          const thumbHeight = Math.max(20, (viewportHeight / contentHeight) * viewportHeight);
          const thumbTop =
            (viewport.scrollTop / (contentHeight - viewportHeight)) *
            (viewportHeight - thumbHeight);

          setVerticalThumbHeight(thumbHeight);
          setVerticalThumbTop(Math.max(0, Math.min(thumbTop, viewportHeight - thumbHeight)));
        }
      }

      // Horizontal scrollbar
      if (orientation === "horizontal" || orientation === "both") {
        const hasHorizontalScroll = contentWidth > viewportWidth;
        setShowHorizontalScrollbar(hasHorizontalScroll);

        if (hasHorizontalScroll) {
          const thumbWidth = Math.max(20, (viewportWidth / contentWidth) * viewportWidth);
          const thumbLeft =
            (viewport.scrollLeft / (contentWidth - viewportWidth)) * (viewportWidth - thumbWidth);

          setHorizontalThumbWidth(thumbWidth);
          setHorizontalThumbLeft(Math.max(0, Math.min(thumbLeft, viewportWidth - thumbWidth)));
        }
      }
    }, [orientation]);

    // Handle scroll events
    const handleScroll = React.useCallback(() => {
      updateScrollbars();
      setIsScrolling(true);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      if (type === "hover" || type === "auto") {
        hideTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, scrollHideDelay);
      }
    }, [updateScrollbars, type, scrollHideDelay]);

    // Handle mouse events for hover type
    const handleMouseEnter = React.useCallback(() => {
      if (type === "hover") {
        setIsScrolling(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }
    }, [type]);

    const handleMouseLeave = React.useCallback(() => {
      if (type === "hover") {
        hideTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, scrollHideDelay);
      }
    }, [type, scrollHideDelay]);

    // Initialize and update scrollbars
    React.useEffect(() => {
      updateScrollbars();

      const viewport = viewportRef.current;
      if (!viewport) return;

      const resizeObserver = new ResizeObserver(updateScrollbars);
      resizeObserver.observe(viewport);

      return () => {
        resizeObserver.disconnect();
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      };
    }, [updateScrollbars]);

    // Set initial visibility based on type
    React.useEffect(() => {
      if (type === "always") {
        setIsScrolling(true);
      } else if (type === "scroll") {
        setIsScrolling(false);
      }
    }, [type]);

    // Handle vertical scrollbar drag
    const handleVerticalThumbMouseDown = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      const startY = e.clientY;
      const startScrollTop = viewportRef.current?.scrollTop || 0;
      const viewport = viewportRef.current;
      const content = contentRef.current;

      if (!viewport || !content) return;

      const viewportHeight = viewport.clientHeight;
      const contentHeight = content.scrollHeight;
      const scrollableHeight = contentHeight - viewportHeight;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaY = e.clientY - startY;
        const deltaScroll = (deltaY / viewportHeight) * scrollableHeight;
        viewport.scrollTop = Math.max(0, Math.min(startScrollTop + deltaScroll, scrollableHeight));
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }, []);

    // Handle horizontal scrollbar drag
    const handleHorizontalThumbMouseDown = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startScrollLeft = viewportRef.current?.scrollLeft || 0;
      const viewport = viewportRef.current;
      const content = contentRef.current;

      if (!viewport || !content) return;

      const viewportWidth = viewport.clientWidth;
      const contentWidth = content.scrollWidth;
      const scrollableWidth = contentWidth - viewportWidth;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const deltaScroll = (deltaX / viewportWidth) * scrollableWidth;
        viewport.scrollLeft = Math.max(0, Math.min(startScrollLeft + deltaScroll, scrollableWidth));
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }, []);

    const shouldShowVertical =
      (orientation === "vertical" || orientation === "both") &&
      showVerticalScrollbar &&
      (type === "always" || isScrolling);

    const shouldShowHorizontal =
      (orientation === "horizontal" || orientation === "both") &&
      showHorizontalScrollbar &&
      (type === "always" || isScrolling);

    return (
      <div
        ref={ref}
        className={cn(liquidScrollAreaVariants({ variant }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Viewport */}
        <div
          ref={viewportRef}
          className="h-full w-full rounded-[inherit] overflow-scroll scrollbar-hide"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div ref={contentRef} className="min-w-full table">
            {children}
          </div>
        </div>

        {/* Vertical Scrollbar */}
        {shouldShowVertical && (
          <div
            ref={verticalTrackRef}
            className={cn(
              scrollbarVariants({ orientation: "vertical", variant: scrollbarVariant }),
              "absolute right-0 top-0 transition-opacity",
              type === "hover" && !isScrolling && "opacity-0"
            )}
          >
            <div
              className={cn(scrollbarThumbVariants({ variant: scrollbarVariant }))}
              style={{
                height: verticalThumbHeight,
                transform: `translateY(${verticalThumbTop}px)`,
              }}
              onMouseDown={handleVerticalThumbMouseDown}
            />
          </div>
        )}

        {/* Horizontal Scrollbar */}
        {shouldShowHorizontal && (
          <div
            ref={horizontalTrackRef}
            className={cn(
              scrollbarVariants({ orientation: "horizontal", variant: scrollbarVariant }),
              "absolute bottom-0 left-0 transition-opacity",
              type === "hover" && !isScrolling && "opacity-0"
            )}
          >
            <div
              className={cn(scrollbarThumbVariants({ variant: scrollbarVariant }))}
              style={{
                width: horizontalThumbWidth,
                transform: `translateX(${horizontalThumbLeft}px)`,
              }}
              onMouseDown={handleHorizontalThumbMouseDown}
            />
          </div>
        )}

        <style jsx>{`
          .scrollbar-hide {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }
);

LiquidScrollArea.displayName = "LiquidScrollArea";

// Simple scroll area for basic use cases
interface LiquidSimpleScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string | number;
  maxWidth?: string | number;
}

export const LiquidSimpleScrollArea = React.forwardRef<HTMLDivElement, LiquidSimpleScrollAreaProps>(
  ({ className, maxHeight, maxWidth, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-auto scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/30 hover:scrollbar-thumb-white/40",
          className
        )}
        style={{
          maxHeight,
          maxWidth,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidSimpleScrollArea.displayName = "LiquidSimpleScrollArea";

export {
  liquidScrollAreaVariants,
  scrollbarVariants,
  scrollbarThumbVariants,
  type LiquidScrollAreaProps,
};
