"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidButton } from "../liquid-button";
import { LiquidGlass } from "../liquid-glass";

const liquidListVariants = cva("w-full overflow-hidden rounded-lg border border-white/20", {
  variants: {
    variant: {
      default: "",
      card: "shadow-lg bg-white/5",
      minimal: "border-0 bg-transparent",
      bordered: "border-white/30",
    },
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row flex-wrap",
      grid: "grid",
    },
    size: {
      sm: "text-sm",
      md: "",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "vertical",
    size: "md",
  },
});

const listItemVariants = cva("relative transition-colors border-white/5", {
  variants: {
    layout: {
      vertical: "border-b last:border-b-0",
      horizontal: "border-r last:border-r-0",
      grid: "border",
    },
    size: {
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    },
    interactive: {
      true: "cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:outline-none",
      false: "",
    },
    selected: {
      true: "bg-blue-500/20 border-blue-500/30 text-white",
      false: "text-white/80",
    },
  },
  defaultVariants: {
    layout: "vertical",
    size: "md",
    interactive: false,
    selected: false,
  },
});

interface ListAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (item: any, index: number) => void;
  variant?: "default" | "destructive" | "ghost";
  disabled?: (item: any) => boolean;
}

interface LiquidListProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidListVariants> {
  data: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemKey?: keyof T | ((item: T, index: number) => string | number);
  loading?: boolean;
  loadingText?: React.ReactNode;
  emptyText?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  selectable?: boolean;
  multiSelect?: boolean;
  selectedItems?: (string | number)[];
  onSelectionChange?: (selectedItems: (string | number)[], selectedData: T[]) => void;
  actions?: ListAction[];
  showActions?: "hover" | "always" | "never";
  divider?: boolean;
  striped?: boolean;
  virtualized?: boolean;
  itemHeight?: number;
  maxHeight?: number;
  gridCols?: number;
  gap?: number;
  onItemClick?: (item: T, index: number) => void;
  onItemDoubleClick?: (item: T, index: number) => void;
  onItemContextMenu?: (item: T, index: number, event: React.MouseEvent) => void;
  sortable?: boolean;
  onSort?: (fromIndex: number, toIndex: number) => void;
  groupBy?: keyof T | ((item: T) => string);
  groupHeader?: (group: string, items: T[]) => React.ReactNode;
  filter?: (item: T, index: number) => boolean;
  search?: string;
  searchFields?: (keyof T)[];
}

export const LiquidList = React.forwardRef<HTMLDivElement, LiquidListProps>(
  (
    {
      className,
      variant,
      layout,
      size,
      data,
      renderItem,
      itemKey = "id",
      loading = false,
      loadingText = "Loading...",
      emptyText = "No items found",
      header,
      footer,
      selectable = false,
      multiSelect = false,
      selectedItems = [],
      onSelectionChange,
      actions = [],
      showActions = "hover",
      divider = true,
      striped = false,
      virtualized = false,
      itemHeight = 60,
      maxHeight,
      gridCols = 3,
      gap = 16,
      onItemClick,
      onItemDoubleClick,
      onItemContextMenu,
      sortable = false,
      onSort,
      groupBy,
      groupHeader,
      filter,
      search = "",
      searchFields = [],
      ...props
    },
    ref
  ) => {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dropIndex, setDropIndex] = useState<number | null>(null);

    // Get item key
    const getItemKey = useCallback(
      (item: any, index: number): string | number => {
        if (typeof itemKey === "function") {
          return itemKey(item, index);
        }
        return item[itemKey] ?? index;
      },
      [itemKey]
    );

    // Filter and search data
    const filteredData = useMemo(() => {
      let result = [...data];

      // Apply custom filter
      if (filter) {
        result = result.filter(filter);
      }

      // Apply search
      if (search && searchFields.length > 0) {
        const searchLower = search.toLowerCase();
        result = result.filter((item) =>
          searchFields.some((field) => {
            const value = item[field];
            return value && String(value).toLowerCase().includes(searchLower);
          })
        );
      }

      return result;
    }, [data, filter, search, searchFields]);

    // Group data if needed
    const groupedData = useMemo(() => {
      if (!groupBy) {
        return { ungrouped: filteredData };
      }

      const groups: Record<string, typeof filteredData> = {};

      filteredData.forEach((item) => {
        const groupKey = typeof groupBy === "function" ? groupBy(item) : String(item[groupBy]);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
      });

      return groups;
    }, [filteredData, groupBy]);

    // Handle selection
    const handleItemSelect = useCallback(
      (item: any, index: number) => {
        const key = getItemKey(item, index);
        let newSelection: (string | number)[];

        if (multiSelect) {
          if (selectedItems.includes(key)) {
            newSelection = selectedItems.filter((k) => k !== key);
          } else {
            newSelection = [...selectedItems, key];
          }
        } else {
          newSelection = selectedItems.includes(key) ? [] : [key];
        }

        const selectedData = filteredData.filter((item, idx) =>
          newSelection.includes(getItemKey(item, idx))
        );

        onSelectionChange?.(newSelection, selectedData);
      },
      [selectedItems, multiSelect, getItemKey, filteredData, onSelectionChange]
    );

    // Handle drag and drop for sorting
    const handleDragStart = useCallback(
      (e: React.DragEvent, index: number) => {
        if (!sortable) return;
        setDragIndex(index);
        e.dataTransfer.effectAllowed = "move";
      },
      [sortable]
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent, index: number) => {
        if (!sortable || dragIndex === null) return;
        e.preventDefault();
        setDropIndex(index);
      },
      [sortable, dragIndex]
    );

    const handleDrop = useCallback(
      (e: React.DragEvent, index: number) => {
        if (!sortable || dragIndex === null) return;
        e.preventDefault();

        if (dragIndex !== index) {
          onSort?.(dragIndex, index);
        }

        setDragIndex(null);
        setDropIndex(null);
      },
      [sortable, dragIndex, onSort]
    );

    // Default item renderer
    const defaultRenderItem = useCallback((item: any, _index: number) => {
      if (typeof item === "string" || typeof item === "number") {
        return <span>{item}</span>;
      }

      if (React.isValidElement(item)) {
        return item;
      }

      // Try to render object properties
      const keys = Object.keys(item);
      const displayKey =
        keys.find((k) => ["name", "title", "label", "text", "value"].includes(k.toLowerCase())) ||
        keys[0];

      return (
        <div>
          <div className="font-medium">{item[displayKey]}</div>
          {keys.length > 1 && (
            <div className="text-sm text-white/60 mt-1">
              {keys
                .slice(1, 3)
                .map((key) => `${key}: ${item[key]}`)
                .join(" • ")}
            </div>
          )}
        </div>
      );
    }, []);

    // Render item with wrapper
    const renderItemWithWrapper = useCallback(
      (item: any, index: number, groupKey?: string) => {
        const key = getItemKey(item, index);
        const isSelected = selectedItems.includes(key);
        const isDragging = dragIndex === index;
        const isDropTarget = dropIndex === index;

        return (
          <div
            key={key}
            className={cn(
              listItemVariants({
                layout,
                size,
                interactive: Boolean(onItemClick || selectable),
                selected: isSelected,
              }),
              striped && index % 2 === 1 && "bg-white/2",
              isDragging && "opacity-50",
              isDropTarget && "bg-blue-500/20",
              !divider && "border-0"
            )}
            draggable={sortable}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onClick={(_e) => {
              if (selectable) {
                handleItemSelect(item, index);
              }
              onItemClick?.(item, index);
            }}
            onDoubleClick={() => onItemDoubleClick?.(item, index)}
            onContextMenu={(e) => onItemContextMenu?.(item, index, e)}
            tabIndex={onItemClick || selectable ? 0 : -1}
            role={selectable ? "option" : "listitem"}
            aria-selected={selectable ? isSelected : undefined}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 min-w-0">
                {/* Selection checkbox */}
                {selectable && (
                  <div className="flex items-center gap-3">
                    <input
                      type={multiSelect ? "checkbox" : "radio"}
                      name={multiSelect ? undefined : `list-selection-${groupKey || "default"}`}
                      checked={isSelected}
                      onChange={() => handleItemSelect(item, index)}
                      className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1">
                      {renderItem ? renderItem(item, index) : defaultRenderItem(item, index)}
                    </div>
                  </div>
                )}

                {/* Item content without selection */}
                {!selectable &&
                  (renderItem ? renderItem(item, index) : defaultRenderItem(item, index))}
              </div>

              {/* Actions */}
              {actions.length > 0 &&
                (showActions === "always" ||
                  (showActions === "hover" && "group-hover:opacity-100")) && (
                  <div
                    className={cn(
                      "flex items-center gap-2 ml-4",
                      showActions === "hover" &&
                        "opacity-0 group-hover:opacity-100 transition-opacity"
                    )}
                  >
                    {actions.map((action) => (
                      <LiquidButton
                        key={action.key}
                        size="sm"
                        variant={action.variant || "ghost"}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(item, index);
                        }}
                        disabled={action.disabled?.(item)}
                        className="text-white/70 hover:text-white"
                      >
                        {action.icon && <span className="mr-1">{action.icon}</span>}
                        {action.label}
                      </LiquidButton>
                    ))}
                  </div>
                )}
            </div>
          </div>
        );
      },
      [
        getItemKey,
        selectedItems,
        dragIndex,
        dropIndex,
        layout,
        size,
        onItemClick,
        selectable,
        striped,
        divider,
        sortable,
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleItemSelect,
        onItemDoubleClick,
        onItemContextMenu,
        multiSelect,
        renderItem,
        defaultRenderItem,
        actions,
        showActions,
      ]
    );

    // Loading component
    const LoadingComponent = () => (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white/60 mr-2" />
        <span className="text-white/70">{loadingText}</span>
      </div>
    );

    // Empty component
    const EmptyComponent = () => (
      <div className="flex items-center justify-center py-8 text-white/60">{emptyText}</div>
    );

    // Grid styles
    const gridStyles =
      layout === "grid"
        ? {
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            gap: `${gap}px`,
          }
        : undefined;

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(liquidListVariants({ variant, layout, size }), className)}
        style={{
          maxHeight,
          ...gridStyles,
        }}
        role="list"
        aria-multiselectable={selectable && multiSelect}
        {...props}
      >
        {/* Header */}
        {header && <div className="border-b border-white/10 p-4">{header}</div>}

        {/* Content */}
        <div
          className={cn(
            "flex-1",
            maxHeight && "overflow-y-auto",
            layout === "vertical" && "divide-y divide-white/5",
            layout === "horizontal" && "flex flex-wrap",
            layout === "grid" && "grid"
          )}
        >
          {loading ? (
            <LoadingComponent />
          ) : Object.keys(groupedData).length === 0 || filteredData.length === 0 ? (
            <EmptyComponent />
          ) : (
            Object.entries(groupedData).map(([groupKey, items]) => (
              <React.Fragment key={groupKey}>
                {/* Group header */}
                {groupBy && groupKey !== "ungrouped" && (
                  <div className="sticky top-0 z-10 bg-white/10 backdrop-blur-sm px-4 py-2 border-b border-white/10">
                    {groupHeader ? (
                      groupHeader(groupKey, items)
                    ) : (
                      <h3 className="font-medium text-white">{groupKey}</h3>
                    )}
                  </div>
                )}

                {/* Items */}
                {items.map((item, index) => renderItemWithWrapper(item, index, groupKey))}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Footer */}
        {footer && <div className="border-t border-white/10 p-4">{footer}</div>}
      </LiquidGlass>
    );
  }
);

LiquidList.displayName = "LiquidList";

// Sub-components for advanced usage
interface LiquidListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const LiquidListItem = React.forwardRef<HTMLDivElement, LiquidListItemProps>(
  ({ className, selected, disabled, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        listItemVariants({
          interactive: !disabled,
          selected: Boolean(selected),
        }),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      role="listitem"
      aria-selected={selected}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidListItem.displayName = "LiquidListItem";

interface LiquidListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidListHeader = React.forwardRef<HTMLDivElement, LiquidListHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("border-b border-white/10 p-4 bg-white/5", className)} {...props}>
      {children}
    </div>
  )
);

LiquidListHeader.displayName = "LiquidListHeader";

interface LiquidListFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidListFooter = React.forwardRef<HTMLDivElement, LiquidListFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("border-t border-white/10 p-4 bg-white/5", className)} {...props}>
      {children}
    </div>
  )
);

LiquidListFooter.displayName = "LiquidListFooter";

export { liquidListVariants, listItemVariants, type LiquidListProps, type ListAction };
