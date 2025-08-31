"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidButton } from "../liquid-button";
import { LiquidGlass } from "../liquid-glass";

const liquidPaginationVariants = cva(
  "flex items-center justify-between gap-4 p-4 rounded-lg border border-white/20",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-white/5 shadow-lg",
        minimal: "border-0 bg-transparent p-2",
        compact: "gap-2 p-2",
      },
      size: {
        sm: "text-sm",
        md: "",
        lg: "text-lg",
      },
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
        between: "justify-between",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      align: "between",
    },
  }
);

const paginationButtonVariants = cva("min-w-[2.5rem] h-10 text-white/80 transition-colors", {
  variants: {
    variant: {
      default: "hover:bg-white/10",
      ghost: "hover:bg-white/10",
      outline: "border border-white/20 hover:bg-white/10",
      filled: "bg-white/10 hover:bg-white/20",
    },
    size: {
      sm: "min-w-[2rem] h-8 text-sm px-2",
      md: "min-w-[2.5rem] h-10 px-3",
      lg: "min-w-[3rem] h-12 text-lg px-4",
    },
    active: {
      true: "bg-blue-500/30 text-blue-200 border-blue-500/50",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    active: false,
  },
});

interface LiquidPaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidPaginationVariants> {
  current: number;
  total: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean | ((total: number, range: [number, number]) => React.ReactNode);
  hideOnSinglePage?: boolean;
  disabled?: boolean;
  simple?: boolean;
  showLessItems?: boolean;
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  pageSizeOptions?: string[] | number[];
  itemRender?: (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactElement
  ) => React.ReactNode;
  responsive?: boolean;
}

export const LiquidPagination = React.forwardRef<HTMLDivElement, LiquidPaginationProps>(
  (
    {
      className,
      variant,
      size,
      align,
      current = 1,
      total = 0,
      pageSize = 10,
      showSizeChanger = false,
      showQuickJumper = false,
      showTotal = false,
      hideOnSinglePage = false,
      disabled = false,
      simple = false,
      showLessItems = false,
      onChange,
      onShowSizeChange,
      pageSizeOptions = [10, 20, 50, 100],
      itemRender,
      responsive = true,
      ...props
    },
    ref
  ) => {
    const [jumpValue, setJumpValue] = useState("");
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);

    // Calculate pagination data
    const paginationData = useMemo(() => {
      const totalPages = Math.ceil(total / currentPageSize);
      const startIndex = (current - 1) * currentPageSize + 1;
      const endIndex = Math.min(current * currentPageSize, total);
      const hasPrev = current > 1;
      const hasNext = current < totalPages;

      return {
        totalPages,
        startIndex,
        endIndex,
        hasPrev,
        hasNext,
      };
    }, [total, currentPageSize, current]);

    // Generate page numbers to display
    const getPageNumbers = useCallback(() => {
      const { totalPages } = paginationData;

      if (simple || totalPages <= 1) {
        return [];
      }

      const delta = showLessItems ? 1 : 2;
      const _range = [];
      const rangeWithDots = [];

      // Always show first page
      if (totalPages > 1) {
        rangeWithDots.push(1);
      }

      // Calculate range around current page
      const start = Math.max(2, current - delta);
      const end = Math.min(totalPages - 1, current + delta);

      // Add dots before range if needed
      if (start > 2) {
        rangeWithDots.push("jump-prev");
      }

      // Add range
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          rangeWithDots.push(i);
        }
      }

      // Add dots after range if needed
      if (end < totalPages - 1) {
        rangeWithDots.push("jump-next");
      }

      // Always show last page
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    }, [paginationData, simple, showLessItems, current]);

    // Handle page change
    const handlePageChange = useCallback(
      (page: number) => {
        if (disabled || page === current || page < 1 || page > paginationData.totalPages) {
          return;
        }
        onChange?.(page, currentPageSize);
      },
      [disabled, current, paginationData.totalPages, onChange, currentPageSize]
    );

    // Handle page size change
    const handlePageSizeChange = useCallback(
      (newPageSize: number) => {
        const newTotalPages = Math.ceil(total / newPageSize);
        const newPage = Math.min(current, newTotalPages);

        setCurrentPageSize(newPageSize);
        onShowSizeChange?.(newPage, newPageSize);
        onChange?.(newPage, newPageSize);
      },
      [total, current, onShowSizeChange, onChange]
    );

    // Handle quick jump
    const handleQuickJump = useCallback(() => {
      const page = parseInt(jumpValue, 10);
      if (!Number.isNaN(page) && page >= 1 && page <= paginationData.totalPages) {
        handlePageChange(page);
        setJumpValue("");
      }
    }, [jumpValue, paginationData.totalPages, handlePageChange]);

    // Handle jump prev/next (5 pages at a time)
    const handleJumpPrev = useCallback(() => {
      const jumpPages = showLessItems ? 3 : 5;
      handlePageChange(Math.max(1, current - jumpPages));
    }, [current, showLessItems, handlePageChange]);

    const handleJumpNext = useCallback(() => {
      const jumpPages = showLessItems ? 3 : 5;
      handlePageChange(Math.min(paginationData.totalPages, current + jumpPages));
    }, [current, paginationData.totalPages, showLessItems, handlePageChange]);

    // Icons
    const ChevronLeftIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    );

    const ChevronRightIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    );

    const DoubleChevronLeftIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
        <path
          fillRule="evenodd"
          d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    );

    const DoubleChevronRightIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
        />
        <path
          fillRule="evenodd"
          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    );

    // Render page item
    const renderPageItem = useCallback(
      (item: number | string, isActive = false) => {
        const defaultElement = (
          <LiquidButton
            variant="ghost"
            size={size}
            disabled={disabled}
            className={cn(
              paginationButtonVariants({ variant: "ghost", size, active: isActive }),
              isActive && "bg-blue-500/30 text-blue-200 border-blue-500/50"
            )}
          >
            {item === "jump-prev" ? (
              <DoubleChevronLeftIcon />
            ) : item === "jump-next" ? (
              <DoubleChevronRightIcon />
            ) : (
              item
            )}
          </LiquidButton>
        );

        if (itemRender) {
          return itemRender(
            typeof item === "number" ? item : current,
            item === "jump-prev" ? "jump-prev" : item === "jump-next" ? "jump-next" : "page",
            defaultElement
          );
        }

        return defaultElement;
      },
      [size, disabled, current, itemRender]
    );

    // Don't render if single page and hideOnSinglePage is true
    if (hideOnSinglePage && paginationData.totalPages <= 1) {
      return null;
    }

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(liquidPaginationVariants({ variant, size, align }), className)}
        {...props}
      >
        {/* Total info */}
        {showTotal && !simple && (
          <div className="text-sm text-white/70 whitespace-nowrap">
            {typeof showTotal === "function"
              ? showTotal(total, [paginationData.startIndex, paginationData.endIndex])
              : `Showing ${paginationData.startIndex} to ${paginationData.endIndex} of ${total} entries`}
          </div>
        )}

        {/* Simple pagination */}
        {simple ? (
          <div className="flex items-center gap-2">
            <LiquidButton
              variant="ghost"
              size={size}
              disabled={disabled || !paginationData.hasPrev}
              onClick={() => handlePageChange(current - 1)}
              className="text-white/80"
            >
              <ChevronLeftIcon />
            </LiquidButton>

            <span className="text-white/80 px-2">
              {current} / {paginationData.totalPages}
            </span>

            <LiquidButton
              variant="ghost"
              size={size}
              disabled={disabled || !paginationData.hasNext}
              onClick={() => handlePageChange(current + 1)}
              className="text-white/80"
            >
              <ChevronRightIcon />
            </LiquidButton>
          </div>
        ) : (
          /* Full pagination */
          <div className="flex items-center gap-1">
            {/* Previous button */}
            <div onClick={() => handlePageChange(current - 1)}>{renderPageItem("prev", false)}</div>

            {/* Page numbers */}
            {getPageNumbers().map((pageNum, index) => (
              <div
                key={`${pageNum}-${index}`}
                onClick={() => {
                  if (pageNum === "jump-prev") {
                    handleJumpPrev();
                  } else if (pageNum === "jump-next") {
                    handleJumpNext();
                  } else if (typeof pageNum === "number") {
                    handlePageChange(pageNum);
                  }
                }}
              >
                {renderPageItem(pageNum, pageNum === current)}
              </div>
            ))}

            {/* Next button */}
            <div onClick={() => handlePageChange(current + 1)}>{renderPageItem("next", false)}</div>
          </div>
        )}

        {/* Controls */}
        {!simple && (showSizeChanger || showQuickJumper) && (
          <div className="flex items-center gap-4">
            {/* Page size changer */}
            {showSizeChanger && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70 whitespace-nowrap">Show</span>
                <select
                  value={currentPageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  disabled={disabled}
                  className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-white/70 whitespace-nowrap">per page</span>
              </div>
            )}

            {/* Quick jumper */}
            {showQuickJumper && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70 whitespace-nowrap">Go to</span>
                <input
                  type="number"
                  min={1}
                  max={paginationData.totalPages}
                  value={jumpValue}
                  onChange={(e) => setJumpValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleQuickJump();
                    }
                  }}
                  disabled={disabled}
                  className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                  placeholder="1"
                />
                <LiquidButton
                  size="sm"
                  variant="ghost"
                  onClick={handleQuickJump}
                  disabled={disabled || !jumpValue}
                  className="text-white/80"
                >
                  Go
                </LiquidButton>
              </div>
            )}
          </div>
        )}
      </LiquidGlass>
    );
  }
);

LiquidPagination.displayName = "LiquidPagination";

export { liquidPaginationVariants, paginationButtonVariants, type LiquidPaginationProps };
