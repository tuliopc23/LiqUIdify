"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const liquidResizableVariants = cva("flex", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

const resizableHandleVariants = cva(
  "relative flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
  {
    variants: {
      direction: {
        horizontal: "w-1 cursor-col-resize hover:w-2 flex-col",
        vertical: "h-1 cursor-row-resize hover:h-2 flex-row",
      },
      variant: {
        default: "",
        glass: "bg-white/5 hover:bg-white/15 backdrop-blur-sm",
        minimal: "bg-transparent hover:bg-white/10",
      },
    },
    defaultVariants: {
      direction: "horizontal",
      variant: "default",
    },
  }
);

const resizablePanelVariants = cva("overflow-hidden", {
  variants: {
    variant: {
      default: "",
      bordered: "border border-white/20 rounded-lg",
      glass: "bg-white/5 backdrop-blur-sm rounded-lg",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ResizableContextValue {
  direction: "horizontal" | "vertical";
  onResize: (panelId: string, size: number) => void;
  registerPanel: (
    panelId: string,
    initialSize?: number,
    minSize?: number,
    maxSize?: number
  ) => void;
  unregisterPanel: (panelId: string) => void;
}

const ResizableContext = React.createContext<ResizableContextValue | undefined>(undefined);

const useResizable = () => {
  const context = React.useContext(ResizableContext);
  if (!context) {
    throw new Error("useResizable must be used within a LiquidResizablePanelGroup");
  }
  return context;
};

interface LiquidResizablePanelGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidResizableVariants> {
  direction?: "horizontal" | "vertical";
  onLayout?: (layout: number[]) => void;
}

export const LiquidResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  LiquidResizablePanelGroupProps
>(({ className, direction = "horizontal", onLayout, children, ...props }, ref) => {
  const [_panels, setPanels] = React.useState<
    Map<
      string,
      {
        size: number;
        minSize: number;
        maxSize: number;
      }
    >
  >(new Map());

  const _containerRef = React.useRef<HTMLDivElement>(null);

  const registerPanel = React.useCallback(
    (panelId: string, initialSize = 50, minSize = 10, maxSize = 90) => {
      setPanels(
        (prev) =>
          new Map(
            prev.set(panelId, {
              size: initialSize,
              minSize,
              maxSize,
            })
          )
      );
    },
    []
  );

  const unregisterPanel = React.useCallback((panelId: string) => {
    setPanels((prev) => {
      const newPanels = new Map(prev);
      newPanels.delete(panelId);
      return newPanels;
    });
  }, []);

  const onResize = React.useCallback(
    (panelId: string, size: number) => {
      setPanels((prev) => {
        const panel = prev.get(panelId);
        if (!panel) return prev;

        const clampedSize = Math.max(panel.minSize, Math.min(panel.maxSize, size));
        const newPanels = new Map(
          prev.set(panelId, {
            ...panel,
            size: clampedSize,
          })
        );

        // Notify layout change
        const layout = Array.from(newPanels.values()).map((p) => p.size);
        onLayout?.(layout);

        return newPanels;
      });
    },
    [onLayout]
  );

  const contextValue = React.useMemo(
    () => ({
      direction,
      onResize,
      registerPanel,
      unregisterPanel,
    }),
    [direction, onResize, registerPanel, unregisterPanel]
  );

  return (
    <ResizableContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(liquidResizableVariants({ direction }), "h-full w-full", className)}
        {...props}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
});

LiquidResizablePanelGroup.displayName = "LiquidResizablePanelGroup";

interface LiquidResizablePanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof resizablePanelVariants> {
  id?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
}

export const LiquidResizablePanel = React.forwardRef<HTMLDivElement, LiquidResizablePanelProps>(
  (
    {
      className,
      variant,
      id,
      defaultSize = 50,
      minSize = 10,
      maxSize = 90,
      collapsible = false,
      collapsedSize = 0,
      children,
      ...props
    },
    ref
  ) => {
    const { direction, registerPanel, unregisterPanel } = useResizable();
    const panelId = id || React.useId();
    const [isCollapsed, _setIsCollapsed] = React.useState(false);

    React.useEffect(() => {
      registerPanel(panelId, defaultSize, minSize, maxSize);
      return () => unregisterPanel(panelId);
    }, [panelId, defaultSize, minSize, maxSize, registerPanel, unregisterPanel]);

    const actualSize = isCollapsed ? collapsedSize : defaultSize;
    const sizeStyle =
      direction === "horizontal" ? { width: `${actualSize}%` } : { height: `${actualSize}%` };

    return (
      <div
        ref={ref}
        className={cn(resizablePanelVariants({ variant }), className)}
        style={sizeStyle}
        data-panel-id={panelId}
        data-collapsed={isCollapsed}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidResizablePanel.displayName = "LiquidResizablePanel";

interface LiquidResizableHandleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof resizableHandleVariants> {
  disabled?: boolean;
  onDragging?: (isDragging: boolean) => void;
}

export const LiquidResizableHandle = React.forwardRef<HTMLDivElement, LiquidResizableHandleProps>(
  ({ className, variant, disabled = false, onDragging, ...props }, ref) => {
    const { direction } = useResizable();
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
    const _handleRef = React.useRef<HTMLDivElement>(null);

    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;

        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        onDragging?.(true);

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDragging) return;

          // Calculate resize logic here
          const _deltaX = e.clientX - dragStart.x;
          const _deltaY = e.clientY - dragStart.y;

          // This is a simplified implementation
          // In a full implementation, you would calculate panel sizes and update them
        };

        const handleMouseUp = () => {
          setIsDragging(false);
          onDragging?.(false);
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      [disabled, isDragging, dragStart, onDragging]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        const _step = 5;
        let handled = false;

        switch (e.key) {
          case "ArrowLeft":
            if (direction === "horizontal") {
              // Resize left
              handled = true;
            }
            break;
          case "ArrowRight":
            if (direction === "horizontal") {
              // Resize right
              handled = true;
            }
            break;
          case "ArrowUp":
            if (direction === "vertical") {
              // Resize up
              handled = true;
            }
            break;
          case "ArrowDown":
            if (direction === "vertical") {
              // Resize down
              handled = true;
            }
            break;
          case "Enter":
          case " ":
            // Toggle collapse if supported
            handled = true;
            break;
        }

        if (handled) {
          e.preventDefault();
        }
      },
      [disabled, direction]
    );

    return (
      <div
        ref={ref}
        className={cn(
          resizableHandleVariants({ direction, variant }),
          isDragging && "bg-blue-500/30",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        role="separator"
        aria-orientation={direction === "horizontal" ? "vertical" : "horizontal"}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        data-state={isDragging ? "dragging" : "idle"}
        {...props}
      >
        <div className="flex items-center justify-center">
          {direction === "horizontal" ? (
            <div className="flex flex-col space-y-1">
              <div className="w-0.5 h-4 bg-white/40 rounded-full" />
              <div className="w-0.5 h-4 bg-white/40 rounded-full" />
            </div>
          ) : (
            <div className="flex space-x-1">
              <div className="w-4 h-0.5 bg-white/40 rounded-full" />
              <div className="w-4 h-0.5 bg-white/40 rounded-full" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

LiquidResizableHandle.displayName = "LiquidResizableHandle";

// Predefined layouts
interface LiquidTwoColumnLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultLeftSize?: number;
  minLeftSize?: number;
  maxLeftSize?: number;
  variant?: VariantProps<typeof resizablePanelVariants>["variant"];
}

export const LiquidTwoColumnLayout = React.forwardRef<HTMLDivElement, LiquidTwoColumnLayoutProps>(
  (
    {
      leftPanel,
      rightPanel,
      defaultLeftSize = 50,
      minLeftSize = 20,
      maxLeftSize = 80,
      variant = "default",
      ...props
    },
    ref
  ) => {
    return (
      <LiquidResizablePanelGroup ref={ref} direction="horizontal" {...props}>
        <LiquidResizablePanel
          defaultSize={defaultLeftSize}
          minSize={minLeftSize}
          maxSize={maxLeftSize}
          variant={variant}
        >
          {leftPanel}
        </LiquidResizablePanel>
        <LiquidResizableHandle />
        <LiquidResizablePanel
          defaultSize={100 - defaultLeftSize}
          minSize={100 - maxLeftSize}
          maxSize={100 - minLeftSize}
          variant={variant}
        >
          {rightPanel}
        </LiquidResizablePanel>
      </LiquidResizablePanelGroup>
    );
  }
);

LiquidTwoColumnLayout.displayName = "LiquidTwoColumnLayout";

interface LiquidThreeColumnLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  defaultSizes?: [number, number, number];
  variant?: VariantProps<typeof resizablePanelVariants>["variant"];
}

export const LiquidThreeColumnLayout = React.forwardRef<
  HTMLDivElement,
  LiquidThreeColumnLayoutProps
>(
  (
    {
      leftPanel,
      centerPanel,
      rightPanel,
      defaultSizes = [25, 50, 25],
      variant = "default",
      ...props
    },
    ref
  ) => {
    return (
      <LiquidResizablePanelGroup ref={ref} direction="horizontal" {...props}>
        <LiquidResizablePanel defaultSize={defaultSizes[0]} variant={variant}>
          {leftPanel}
        </LiquidResizablePanel>
        <LiquidResizableHandle />
        <LiquidResizablePanel defaultSize={defaultSizes[1]} variant={variant}>
          {centerPanel}
        </LiquidResizablePanel>
        <LiquidResizableHandle />
        <LiquidResizablePanel defaultSize={defaultSizes[2]} variant={variant}>
          {rightPanel}
        </LiquidResizablePanel>
      </LiquidResizablePanelGroup>
    );
  }
);

LiquidThreeColumnLayout.displayName = "LiquidThreeColumnLayout";

export {
  liquidResizableVariants,
  resizableHandleVariants,
  resizablePanelVariants,
  type LiquidResizablePanelGroupProps,
};
