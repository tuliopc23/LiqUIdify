"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";
import { LiquidButton } from "../liquid-button";

const liquidTableVariants = cva(
  "w-full overflow-hidden rounded-lg border border-white/20",
  {
    variants: {
      variant: {
        default: "",
        card: "shadow-lg",
        minimal: "border-0 bg-transparent",
        striped: ""
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

const tableHeaderVariants = cva(
  "border-b border-white/10 bg-white/5 text-left font-medium text-white/90",
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm", 
        lg: "px-6 py-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const tableCellVariants = cva(
  "text-white/80 transition-colors",
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-6 py-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const tableRowVariants = cva(
  "border-b border-white/5 transition-colors hover:bg-white/5",
  {
    variants: {
      variant: {
        default: "",
        striped: "even:bg-white/2",
        hoverable: "hover:bg-white/10 cursor-pointer",
        selected: "bg-blue-500/20 border-blue-500/30"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type SortDirection = "asc" | "desc" | null;
type ColumnAlign = "left" | "center" | "right";

interface Column<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: ColumnAlign;
  fixed?: "left" | "right";
  className?: string;
}

interface LiquidTableProps<T = any> extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidTableVariants> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: React.ReactNode;
  rowKey?: keyof T | ((record: T) => string | number);
  rowSelection?: {
    selectedRowKeys?: (string | number)[];
    onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
    onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  onRow?: (record: T, index: number) => {
    onClick?: (event: React.MouseEvent) => void;
    onDoubleClick?: (event: React.MouseEvent) => void;
    onContextMenu?: (event: React.MouseEvent) => void;
  };
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  };
  scroll?: {
    x?: string | number;
    y?: string | number;
  };
  sticky?: boolean;
  bordered?: boolean;
  showHeader?: boolean;
  sortDirections?: SortDirection[];
  defaultSortOrder?: { columnKey: string; order: SortDirection };
  onSort?: (columnKey: string, order: SortDirection) => void;
}

export const LiquidTable = React.forwardRef<HTMLDivElement, LiquidTableProps>(
  ({
    className,
    variant,
    size,
    columns,
    data,
    loading = false,
    emptyText = "No data",
    rowKey = "id",
    rowSelection,
    onRow,
    pagination,
    scroll,
    sticky = false,
    bordered = false,
    showHeader = true,
    sortDirections = ["asc", "desc"],
    defaultSortOrder,
    onSort,
    ...props
  }, ref) => {
    const [sortState, setSortState] = useState<{ columnKey: string; order: SortDirection }>({
      columnKey: defaultSortOrder?.columnKey || "",
      order: defaultSortOrder?.order || null,
    });

    // Get row key function
    const getRowKey = useCallback((record: any, index: number): string | number => {
      if (typeof rowKey === "function") {
        return rowKey(record);
      }
      return record[rowKey] ?? index;
    }, [rowKey]);

    // Handle sorting
    const handleSort = useCallback((columnKey: string) => {
      const currentOrder = sortState.columnKey === columnKey ? sortState.order : null;
      let nextOrder: SortDirection = null;

      if (currentOrder === null) {
        nextOrder = sortDirections[0] || "asc";
      } else if (currentOrder === "asc" && sortDirections.includes("desc")) {
        nextOrder = "desc";
      } else if (currentOrder === "desc" && sortDirections.includes("asc")) {
        nextOrder = "asc";
      }

      const newSortState = { columnKey, order: nextOrder };
      setSortState(newSortState);
      onSort?.(columnKey, nextOrder);
    }, [sortState, sortDirections, onSort]);

    // Sort data locally if no external sort handler
    const sortedData = useMemo(() => {
      if (!sortState.order || !sortState.columnKey || onSort) {
        return data;
      }

      const column = columns.find(col => col.key === sortState.columnKey);
      if (!column?.dataIndex) return data;

      return [...data].sort((a, b) => {
        const aVal = a[column.dataIndex!];
        const bVal = b[column.dataIndex!];
        
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        let result = 0;
        if (typeof aVal === "string" && typeof bVal === "string") {
          result = aVal.localeCompare(bVal);
        } else if (typeof aVal === "number" && typeof bVal === "number") {
          result = aVal - bVal;
        } else {
          result = String(aVal).localeCompare(String(bVal));
        }

        return sortState.order === "desc" ? -result : result;
      });
    }, [data, sortState, columns, onSort]);

    // Handle row selection
    const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
      rowSelection?.selectedRowKeys || []
    );

    const handleRowSelect = useCallback((record: any, selected: boolean) => {
      const key = getRowKey(record, 0);
      let newSelectedKeys: (string | number)[];
      
      if (selected) {
        newSelectedKeys = [...selectedRowKeys, key];
      } else {
        newSelectedKeys = selectedRowKeys.filter(k => k !== key);
      }
      
      setSelectedRowKeys(newSelectedKeys);
      
      const selectedRows = sortedData.filter(item => 
        newSelectedKeys.includes(getRowKey(item, 0))
      );
      
      rowSelection?.onSelect?.(record, selected, selectedRows);
    }, [selectedRowKeys, sortedData, getRowKey, rowSelection]);

    const handleSelectAll = useCallback((selected: boolean) => {
      let newSelectedKeys: (string | number)[];
      
      if (selected) {
        newSelectedKeys = sortedData.map((item, index) => getRowKey(item, index));
      } else {
        newSelectedKeys = [];
      }
      
      setSelectedRowKeys(newSelectedKeys);
      
      const selectedRows = selected ? sortedData : [];
      const changeRows = sortedData;
      
      rowSelection?.onSelectAll?.(selected, selectedRows, changeRows);
    }, [sortedData, getRowKey, rowSelection]);

    // Icons
    const SortAscIcon = () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 3l3 3H3l3-3z"/>
      </svg>
    );

    const SortDescIcon = () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 9L3 6h6l-3 3z"/>
      </svg>
    );

    const LoadingSpinner = () => (
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white/60" />
    );

    // Render cell content
    const renderCell = useCallback((column: Column, record: any, index: number) => {
      if (column.render) {
        return column.render(record[column.dataIndex || column.key], record, index);
      }
      
      const value = record[column.dataIndex || column.key];
      return value != null ? String(value) : "";
    }, []);

    // Get alignment classes
    const getAlignClass = (align?: ColumnAlign) => {
      switch (align) {
        case "center": return "text-center";
        case "right": return "text-right";
        default: return "text-left";
      }
    };

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(liquidTableVariants({ variant, size }), className)}
        {...props}
      >
        <div className={cn(
          "relative overflow-auto",
          scroll?.x && "overflow-x-auto",
          scroll?.y && "max-h-[400px] overflow-y-auto"
        )}>
          <table className="w-full table-auto">
            {/* Header */}
            {showHeader && (
              <thead className={cn(sticky && "sticky top-0 z-10")}>
                <tr>
                  {/* Selection column */}
                  {rowSelection && (
                    <th className={cn(tableHeaderVariants({ size }), "w-12")}>
                      <input
                        type="checkbox"
                        className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                        checked={selectedRowKeys.length === sortedData.length && sortedData.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                  )}
                  
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        tableHeaderVariants({ size }),
                        getAlignClass(column.align),
                        column.sortable && "cursor-pointer select-none hover:bg-white/10",
                        column.className
                      )}
                      style={{ width: column.width }}
                      onClick={column.sortable ? () => handleSort(column.key) : undefined}
                    >
                      <div className="flex items-center gap-2">
                        <span>{column.title}</span>
                        {column.sortable && (
                          <div className="flex flex-col text-white/40">
                            <SortAscIcon />
                            <SortDescIcon />
                          </div>
                        )}
                        {sortState.columnKey === column.key && sortState.order && (
                          <div className="text-blue-400">
                            {sortState.order === "asc" ? <SortAscIcon /> : <SortDescIcon />}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            {/* Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td 
                    colSpan={columns.length + (rowSelection ? 1 : 0)}
                    className={cn(tableCellVariants({ size }), "text-center py-8")}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <LoadingSpinner />
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (rowSelection ? 1 : 0)}
                    className={cn(tableCellVariants({ size }), "text-center py-8 text-white/60")}
                  >
                    {emptyText}
                  </td>
                </tr>
              ) : (
                sortedData.map((record, index) => {
                  const key = getRowKey(record, index);
                  const isSelected = selectedRowKeys.includes(key);
                  const rowProps = onRow?.(record, index) || {};

                  return (
                    <tr
                      key={key}
                      className={cn(
                        tableRowVariants({ 
                          variant: variant === "striped" ? "striped" : 
                                  onRow ? "hoverable" : 
                                  isSelected ? "selected" : "default"
                        }),
                        isSelected && "bg-blue-500/10 border-blue-500/20"
                      )}
                      {...rowProps}
                    >
                      {/* Selection column */}
                      {rowSelection && (
                        <td className={tableCellVariants({ size })}>
                          <input
                            type="checkbox"
                            className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                            checked={isSelected}
                            onChange={(e) => handleRowSelect(record, e.target.checked)}
                            {...rowSelection.getCheckboxProps?.(record)}
                          />
                        </td>
                      )}
                      
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={cn(
                            tableCellVariants({ size }),
                            getAlignClass(column.align),
                            column.className
                          )}
                          style={{ width: column.width }}
                        >
                          {renderCell(column, record, index)}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="border-t border-white/10 p-4">
            <LiquidTablePagination {...pagination} />
          </div>
        )}
      </LiquidGlass>
    );
  }
);

LiquidTable.displayName = "LiquidTable";

// Pagination component
interface LiquidTablePaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

const LiquidTablePagination: React.FC<LiquidTablePaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (current - 1) * pageSize + 1;
  const endIndex = Math.min(current * pageSize, total);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page, pageSize);
    }
  };

  const handleSizeChange = (newSize: number) => {
    onChange(1, newSize);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(totalPages - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (current + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const ChevronLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Total info */}
      <div className="text-sm text-white/70">
        {showTotal ? (
          showTotal(total, [startIndex, endIndex])
        ) : (
          `Showing ${startIndex} to ${endIndex} of ${total} entries`
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Page size changer */}
        {showSizeChanger && (
          <select
            value={pageSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        )}

        {/* Previous button */}
        <LiquidButton
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
          className="text-white/80"
        >
          <ChevronLeftIcon />
        </LiquidButton>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) => (
            pageNum === "..." ? (
              <span key={`dots-${index}`} className="px-2 text-white/40">...</span>
            ) : (
              <LiquidButton
                key={pageNum}
                variant={pageNum === current ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(pageNum as number)}
                className={cn(
                  "min-w-[32px]",
                  pageNum === current ? "text-white" : "text-white/80"
                )}
              >
                {pageNum}
              </LiquidButton>
            )
          ))}
        </div>

        {/* Next button */}
        <LiquidButton
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
          className="text-white/80"
        >
          <ChevronRightIcon />
        </LiquidButton>

        {/* Quick jumper */}
        {showQuickJumper && (
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  handlePageChange(page);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { 
  liquidTableVariants,
  tableHeaderVariants,
  tableCellVariants,
  tableRowVariants,
  type LiquidTableProps,
  type Column,
  type SortDirection,
  type ColumnAlign
};