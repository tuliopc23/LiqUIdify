"use client";

import * as React from "react";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";
import { LiquidButton } from "../liquid-button";
import { LiquidInput } from "../liquid-input";
import { LiquidPopover } from "../liquid-popover";

const liquidDataGridVariants = cva(
  "relative w-full overflow-hidden rounded-lg border border-white/20 bg-white/5",
  {
    variants: {
      variant: {
        default: "",
        card: "shadow-lg bg-white/10",
        minimal: "border-0 bg-transparent"
      },
      size: {
        sm: "text-sm",
        md: "",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const gridHeaderVariants = cva(
  "sticky top-0 z-20 border-b border-white/10 bg-white/10 backdrop-blur-sm font-medium text-white/90 select-none",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const gridCellVariants = cva(
  "border-r border-white/5 text-white/80 overflow-hidden text-ellipsis whitespace-nowrap transition-colors",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

type SortDirection = "asc" | "desc" | null;
type FilterType = "text" | "number" | "date" | "select" | "multiSelect";
type CellEditor = "text" | "number" | "select" | "date" | "boolean";

interface GridColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: FilterType;
  filterOptions?: { label: string; value: any }[];
  resizable?: boolean;
  frozen?: "left" | "right";
  render?: (value: any, record: T, index: number) => React.ReactNode;
  editor?: CellEditor;
  editorProps?: any;
  align?: "left" | "center" | "right";
  className?: string;
  headerClassName?: string;
}

interface VirtualScrollProps {
  height: number;
  itemHeight: number;
  itemCount: number;
  renderItem: (index: number, style: React.CSSProperties) => React.ReactNode;
}

interface LiquidDataGridProps<T = any> extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidDataGridVariants> {
  columns: GridColumn<T>[];
  data: T[];
  loading?: boolean;
  height?: number;
  rowHeight?: number;
  headerHeight?: number;
  emptyText?: React.ReactNode;
  rowKey?: keyof T | ((record: T) => string | number);
  virtualized?: boolean;
  rowSelection?: {
    selectedRowKeys?: (string | number)[];
    onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
    type?: "checkbox" | "radio";
  };
  editable?: boolean;
  onCellEdit?: (record: T, column: GridColumn<T>, value: any) => void;
  onRowDoubleClick?: (record: T, index: number) => void;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  showHeader?: boolean;
  striped?: boolean;
  bordered?: boolean;
  onSort?: (column: GridColumn<T>, direction: SortDirection) => void;
  onFilter?: (filters: Record<string, any>) => void;
  onColumnResize?: (column: GridColumn<T>, width: number) => void;
}

// Virtual scroll hook
const useVirtualScroll = ({ height, itemHeight, itemCount, renderItem }: VirtualScrollProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleRange = useMemo(() => {
    const containerHeight = height;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount + 1, itemCount - 1);
    
    return { startIndex, endIndex, visibleCount };
  }, [scrollTop, height, itemHeight, itemCount]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const virtualItems = useMemo(() => {
    const items = [];
    for (let i = visibleRange.startIndex; i <= visibleRange.endIndex; i++) {
      const style: React.CSSProperties = {
        position: 'absolute',
        top: i * itemHeight,
        left: 0,
        right: 0,
        height: itemHeight,
      };
      items.push(renderItem(i, style));
    }
    return items;
  }, [visibleRange, itemHeight, renderItem]);

  const totalHeight = itemCount * itemHeight;

  return {
    containerRef,
    handleScroll,
    virtualItems,
    totalHeight,
    visibleRange,
  };
};

export const LiquidDataGrid = React.forwardRef<HTMLDivElement, LiquidDataGridProps>(
  ({
    className,
    variant,
    size,
    columns: initialColumns,
    data,
    loading = false,
    height = 400,
    rowHeight = 40,
    headerHeight = 40,
    emptyText = "No data available",
    rowKey = "id",
    virtualized = true,
    rowSelection,
    editable = false,
    onCellEdit,
    onRowDoubleClick,
    sortable = true,
    filterable = true,
    resizable = true,
    showHeader = true,
    striped = false,
    bordered = false,
    onSort,
    onFilter,
    onColumnResize,
    ...props
  }, ref) => {
    const [columns, setColumns] = useState(initialColumns);
    const [sortState, setSortState] = useState<{ key: string; direction: SortDirection }>({
      key: "",
      direction: null,
    });
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [editingCell, setEditingCell] = useState<{ rowIndex: number; columnKey: string } | null>(null);
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>(rowSelection?.selectedRowKeys || []);

    // Get row key
    const getRowKey = useCallback((record: any, index: number): string | number => {
      if (typeof rowKey === "function") {
        return rowKey(record);
      }
      return record[rowKey] ?? index;
    }, [rowKey]);

    // Handle sorting
    const handleSort = useCallback((column: GridColumn) => {
      if (!column.sortable) return;

      let newDirection: SortDirection = "asc";
      if (sortState.key === column.key) {
        newDirection = sortState.direction === "asc" ? "desc" : sortState.direction === "desc" ? null : "asc";
      }

      const newSortState = { key: column.key, direction: newDirection };
      setSortState(newSortState);
      onSort?.(column, newDirection);
    }, [sortState, onSort]);

    // Handle filtering
    const handleFilter = useCallback((columnKey: string, value: any) => {
      const newFilters = { ...filters, [columnKey]: value };
      if (value == null || value === "") {
        delete newFilters[columnKey];
      }
      setFilters(newFilters);
      onFilter?.(newFilters);
    }, [filters, onFilter]);

    // Handle column resize
    const handleColumnResize = useCallback((column: GridColumn, newWidth: number) => {
      const updatedColumns = columns.map(col => 
        col.key === column.key ? { ...col, width: Math.max(newWidth, col.minWidth || 50) } : col
      );
      setColumns(updatedColumns);
      onColumnResize?.(column, newWidth);
    }, [columns, onColumnResize]);

    // Filter and sort data
    const processedData = useMemo(() => {
      let result = [...data];

      // Apply filters
      Object.entries(filters).forEach(([columnKey, filterValue]) => {
        if (filterValue != null && filterValue !== "") {
          const column = columns.find(col => col.key === columnKey);
          if (column) {
            result = result.filter(record => {
              const cellValue = record[column.dataIndex || column.key];
              if (column.filterType === "text") {
                return String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase());
              } else if (column.filterType === "number") {
                return Number(cellValue) === Number(filterValue);
              } else if (column.filterType === "select" || column.filterType === "multiSelect") {
                return Array.isArray(filterValue) 
                  ? filterValue.includes(cellValue)
                  : cellValue === filterValue;
              }
              return true;
            });
          }
        }
      });

      // Apply sorting
      if (sortState.key && sortState.direction) {
        const sortColumn = columns.find(col => col.key === sortState.key);
        if (sortColumn) {
          result.sort((a, b) => {
            const aVal = a[sortColumn.dataIndex || sortColumn.key];
            const bVal = b[sortColumn.dataIndex || sortColumn.key];
            
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            let comparison = 0;
            if (typeof aVal === "number" && typeof bVal === "number") {
              comparison = aVal - bVal;
            } else {
              comparison = String(aVal).localeCompare(String(bVal));
            }

            return sortState.direction === "desc" ? -comparison : comparison;
          });
        }
      }

      return result;
    }, [data, columns, filters, sortState]);

    // Handle row selection
    const handleRowSelect = useCallback((record: any, selected: boolean) => {
      const key = getRowKey(record, 0);
      let newSelectedRows: (string | number)[];

      if (rowSelection?.type === "radio") {
        newSelectedRows = selected ? [key] : [];
      } else {
        if (selected) {
          newSelectedRows = [...selectedRows, key];
        } else {
          newSelectedRows = selectedRows.filter(k => k !== key);
        }
      }

      setSelectedRows(newSelectedRows);
      
      const selectedRecords = processedData.filter(item => 
        newSelectedRows.includes(getRowKey(item, 0))
      );
      
      rowSelection?.onChange?.(newSelectedRows, selectedRecords);
    }, [selectedRows, processedData, getRowKey, rowSelection]);

    // Handle cell editing
    const handleCellDoubleClick = useCallback((rowIndex: number, column: GridColumn) => {
      if (editable && column.editor) {
        setEditingCell({ rowIndex, columnKey: column.key });
      }
    }, [editable]);

    const handleCellEditComplete = useCallback((value: any) => {
      if (editingCell) {
        const record = processedData[editingCell.rowIndex];
        const column = columns.find(col => col.key === editingCell.columnKey);
        if (record && column) {
          onCellEdit?.(record, column, value);
        }
        setEditingCell(null);
      }
    }, [editingCell, processedData, columns, onCellEdit]);

    // Icons
    const SortIcon = ({ direction }: { direction: SortDirection }) => (
      <div className="flex flex-col ml-1">
        <svg width="8" height="4" viewBox="0 0 8 4" className={cn("transition-colors", direction === "asc" ? "text-blue-400" : "text-white/30")}>
          <path d="M4 0L0 4h8L4 0z" fill="currentColor" />
        </svg>
        <svg width="8" height="4" viewBox="0 0 8 4" className={cn("transition-colors", direction === "desc" ? "text-blue-400" : "text-white/30")}>
          <path d="M4 4L8 0H0L4 4z" fill="currentColor" />
        </svg>
      </div>
    );

    const FilterIcon = () => (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-white/40 hover:text-white/80">
        <path d="M0 0h14l-5.6 6.72v4.48l-2.8-1.4V6.72L0 0z"/>
      </svg>
    );

    const ResizeHandle = ({ column }: { column: GridColumn }) => {
      const [isDragging, setIsDragging] = useState(false);
      const startX = useRef(0);
      const startWidth = useRef(0);

      const handleMouseDown = (e: React.MouseEvent) => {
        if (!resizable) return;
        setIsDragging(true);
        startX.current = e.clientX;
        startWidth.current = column.width || 100;
        e.preventDefault();
      };

      useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
          const diff = e.clientX - startX.current;
          const newWidth = Math.max(startWidth.current + diff, column.minWidth || 50);
          handleColumnResize(column, newWidth);
        };

        const handleMouseUp = () => {
          setIsDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }, [isDragging, column, handleColumnResize]);

      return (
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400/50 transition-colors",
            isDragging && "bg-blue-400"
          )}
          onMouseDown={handleMouseDown}
        />
      );
    };

    // Render cell content
    const renderCell = useCallback((column: GridColumn, record: any, rowIndex: number, columnIndex: number) => {
      const isEditing = editingCell?.rowIndex === rowIndex && editingCell?.columnKey === column.key;
      
      if (isEditing && column.editor) {
        return (
          <CellEditor
            column={column}
            value={record[column.dataIndex || column.key]}
            onComplete={handleCellEditComplete}
            onCancel={() => setEditingCell(null)}
          />
        );
      }

      if (column.render) {
        return column.render(record[column.dataIndex || column.key], record, rowIndex);
      }

      const value = record[column.dataIndex || column.key];
      return value != null ? String(value) : "";
    }, [editingCell, handleCellEditComplete]);

    // Cell editor component
    const CellEditor = ({ column, value, onComplete, onCancel }: {
      column: GridColumn;
      value: any;
      onComplete: (value: any) => void;
      onCancel: () => void;
    }) => {
      const [editValue, setEditValue] = useState(value);
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, []);

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          onComplete(editValue);
        } else if (e.key === "Escape") {
          onCancel();
        }
      };

      const handleBlur = () => {
        onComplete(editValue);
      };

      if (column.editor === "boolean") {
        return (
          <input
            type="checkbox"
            checked={Boolean(editValue)}
            onChange={(e) => onComplete(e.target.checked)}
            className="rounded border-white/20 bg-white/10"
          />
        );
      }

      return (
        <input
          ref={inputRef}
          type={column.editor === "number" ? "number" : column.editor === "date" ? "date" : "text"}
          value={editValue || ""}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full h-full px-2 bg-white/20 border border-blue-500/50 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          {...column.editorProps}
        />
      );
    };

    // Column filter component
    const ColumnFilter = ({ column }: { column: GridColumn }) => {
      const [filterValue, setFilterValue] = useState(filters[column.key] || "");
      const [open, setOpen] = useState(false);

      const handleFilterChange = (value: any) => {
        setFilterValue(value);
        handleFilter(column.key, value);
        setOpen(false);
      };

      if (column.filterType === "select") {
        return (
          <LiquidPopover
            open={open}
            onOpenChange={setOpen}
            trigger={
              <button className="p-1 hover:bg-white/10 rounded">
                <FilterIcon />
              </button>
            }
            variant="menu"
            side="bottom"
          >
            <div className="py-1">
              <button
                onClick={() => handleFilterChange("")}
                className="w-full px-3 py-2 text-left text-sm text-white hover:bg-white/10"
              >
                All
              </button>
              {column.filterOptions?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm text-white hover:bg-white/10",
                    filterValue === option.value && "bg-blue-500/20"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </LiquidPopover>
        );
      }

      return (
        <LiquidPopover
          open={open}
          onOpenChange={setOpen}
          trigger={
            <button className="p-1 hover:bg-white/10 rounded">
              <FilterIcon />
            </button>
          }
          side="bottom"
        >
          <div className="p-3 w-48">
            <LiquidInput
              placeholder={`Filter ${column.title}`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFilterChange(filterValue);
                }
              }}
              size="sm"
            />
            <div className="flex gap-2 mt-2">
              <LiquidButton size="sm" onClick={() => handleFilterChange(filterValue)}>
                Apply
              </LiquidButton>
              <LiquidButton size="sm" variant="ghost" onClick={() => handleFilterChange("")}>
                Clear
              </LiquidButton>
            </div>
          </div>
        </LiquidPopover>
      );
    };

    // Render row
    const renderRow = useCallback((index: number, style?: React.CSSProperties) => {
      const record = processedData[index];
      const key = getRowKey(record, index);
      const isSelected = selectedRows.includes(key);

      return (
        <div
          key={key}
          style={style}
          className={cn(
            "flex border-b border-white/5 hover:bg-white/5 transition-colors",
            striped && index % 2 === 1 && "bg-white/2",
            isSelected && "bg-blue-500/10 border-blue-500/20"
          )}
          onDoubleClick={() => onRowDoubleClick?.(record, index)}
        >
          {/* Selection column */}
          {rowSelection && (
            <div className={cn(gridCellVariants({ size }), "w-12 flex items-center justify-center")}>
              <input
                type={rowSelection.type || "checkbox"}
                name={rowSelection.type === "radio" ? "row-selection" : undefined}
                checked={isSelected}
                onChange={(e) => handleRowSelect(record, e.target.checked)}
                className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                {...rowSelection.getCheckboxProps?.(record)}
              />
            </div>
          )}

          {/* Data columns */}
          {columns.map((column, columnIndex) => (
            <div
              key={column.key}
              className={cn(
                gridCellVariants({ size }),
                column.align === "center" && "text-center",
                column.align === "right" && "text-right",
                column.frozen === "left" && "sticky left-0 bg-white/10 z-10",
                column.frozen === "right" && "sticky right-0 bg-white/10 z-10",
                column.className
              )}
              style={{ 
                width: column.width || 100,
                minWidth: column.minWidth || 50,
                maxWidth: column.maxWidth,
              }}
              onDoubleClick={() => handleCellDoubleClick(index, column)}
            >
              {renderCell(column, record, index, columnIndex)}
            </div>
          ))}
        </div>
      );
    }, [processedData, columns, selectedRows, striped, rowSelection, size, getRowKey, handleRowSelect, onRowDoubleClick, handleCellDoubleClick, renderCell]);

    // Virtual scroll setup
    const virtualScroll = useVirtualScroll({
      height: height - (showHeader ? headerHeight : 0),
      itemHeight: rowHeight,
      itemCount: processedData.length,
      renderItem: renderRow,
    });

    const LoadingSpinner = () => (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white/60" />
        <span className="ml-2 text-white/70">Loading...</span>
      </div>
    );

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(liquidDataGridVariants({ variant, size }), className)}
        style={{ height }}
        {...props}
      >
        {/* Header */}
        {showHeader && (
          <div className={cn(gridHeaderVariants({ size }), "flex")} style={{ height: headerHeight }}>
            {/* Selection header */}
            {rowSelection && (
              <div className="w-12 flex items-center justify-center border-r border-white/10">
                {rowSelection.type !== "radio" && (
                  <input
                    type="checkbox"
                    checked={selectedRows.length === processedData.length && processedData.length > 0}
                    onChange={(e) => {
                      const newSelectedRows = e.target.checked 
                        ? processedData.map((record, index) => getRowKey(record, index))
                        : [];
                      setSelectedRows(newSelectedRows);
                      const selectedRecords = e.target.checked ? processedData : [];
                      rowSelection.onChange?.(newSelectedRows, selectedRecords);
                    }}
                    className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                  />
                )}
              </div>
            )}

            {/* Column headers */}
            {columns.map((column) => (
              <div
                key={column.key}
                className={cn(
                  "relative flex items-center px-3 border-r border-white/10",
                  column.align === "center" && "justify-center",
                  column.align === "right" && "justify-end",
                  column.sortable && "cursor-pointer hover:bg-white/10",
                  column.frozen === "left" && "sticky left-0 bg-white/10 z-10",
                  column.frozen === "right" && "sticky right-0 bg-white/10 z-10",
                  column.headerClassName
                )}
                style={{
                  width: column.width || 100,
                  minWidth: column.minWidth || 50,
                  maxWidth: column.maxWidth,
                }}
                onClick={() => sortable && handleSort(column)}
              >
                <span className="truncate">{column.title}</span>
                
                {/* Sort indicator */}
                {sortable && column.sortable && (
                  <SortIcon direction={sortState.key === column.key ? sortState.direction : null} />
                )}

                {/* Filter */}
                {filterable && column.filterable && (
                  <div className="ml-2">
                    <ColumnFilter column={column} />
                  </div>
                )}

                {/* Resize handle */}
                {resizable && column.resizable !== false && (
                  <ResizeHandle column={column} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <LoadingSpinner />
          ) : processedData.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-white/60">
              {emptyText}
            </div>
          ) : virtualized ? (
            <div
              ref={virtualScroll.containerRef}
              className="overflow-auto h-full"
              onScroll={virtualScroll.handleScroll}
            >
              <div style={{ height: virtualScroll.totalHeight, position: "relative" }}>
                {virtualScroll.virtualItems}
              </div>
            </div>
          ) : (
            <div className="overflow-auto h-full">
              {processedData.map((_, index) => renderRow(index))}
            </div>
          )}
        </div>
      </LiquidGlass>
    );
  }
);

LiquidDataGrid.displayName = "LiquidDataGrid";

export { 
  liquidDataGridVariants,
  gridHeaderVariants,
  gridCellVariants,
  type LiquidDataGridProps,
  type GridColumn,
  type SortDirection,
  type FilterType,
  type CellEditor
};