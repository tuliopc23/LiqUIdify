import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import React from "react";
import { cn } from "../../core/utils/classname";
import { createVariants as cva } from "../../lib/variant-system";

const paginationVariants = cva({
  base: "flex items-center justify-center space-x-1 rounded-lg border border-liquid-highlight/20 bg-liquid-bg/10 p-2 backdrop-blur-liquid-main",
  variants: {
    size: {
      sm: "p-1 text-xs",
      md: "p-2 text-sm",
      lg: "p-3 text-base",
    },
    variant: {
      default: "bg-liquid-bg/10",
      solid: "bg-liquid-bg/20",
      ghost: "border-transparent bg-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const pageButtonVariants = cva({
  base: "flex h-8 min-w-[32px] items-center justify-center rounded-md px-2 text-liquid-text/70 transition-all duration-200 hover:bg-liquid-bg/20 hover:text-liquid-accent focus:bg-liquid-bg/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    isActive: {
      true: "ring-1 ring-liquid-accent/30 bg-liquid-bg/20 text-liquid-accent",
      false: "hover:bg-liquid-bg/20",
    },
    size: {
      sm: "h-6 min-w-[24px] text-xs",
      md: "h-8 min-w-[32px] text-sm",
      lg: "h-10 min-w-[40px] text-base",
    },
  },
  defaultVariants: {
    isActive: "false",
    size: "md",
  },
});

interface GlassPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showEllipsis?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  variant?: "default" | "solid" | "ghost";
  size?: "sm" | "md" | "lg";
}

const GlassPagination = React.forwardRef<HTMLElement, GlassPaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      showFirstLast = true,
      showPrevNext: showPreviousNext = true,
      showEllipsis = true,
      siblingCount = 1,
      boundaryCount = 1,
      disabled = false,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    const generatePageNumbers = () => {
      const pages: Array<number | "ellipsis"> = [];

      // Always include first page(s)

      for (
        let index = 1;
        index <= Math.min(boundaryCount, totalPages);
        index++
      ) {
        pages.push(index);
      }

      // Calculate start and end of sibling range
      const siblingStart = Math.max(
        currentPage - siblingCount,
        boundaryCount + 1,
      );
      const siblingEnd = Math.min(
        currentPage + siblingCount,
        totalPages - boundaryCount,
      );

      // Add ellipsis before siblings if needed

      if (siblingStart > boundaryCount + 1 && showEllipsis) {
        pages.push("ellipsis");
      }

      // Add sibling pages
      for (let index = siblingStart; index <= siblingEnd; index++) {
        if (index <= boundaryCount || index > totalPages - boundaryCount) {
          continue;
        }
        pages.push(index);
      }

      // Add ellipsis after siblings if needed

      if (siblingEnd < totalPages - boundaryCount && showEllipsis) {
        pages.push("ellipsis");
      }

      // Always include last page(s)
      for (
        let index = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1);
        index <= totalPages;
        index++
      ) {
        if (!pages.includes(index)) {
          pages.push(index);
        }
      }

      return pages;
    };

    const pageNumbers = generatePageNumbers();

    const handlePageChange = (page: number) => {
      if (disabled || page < 1 || page > totalPages || page === currentPage) {
        return;
      }

      onPageChange(page);
    };

    const PaginationButton: React.FC<{
      page: number | "ellipsis";
      isActive?: boolean;
      disabled?: boolean;
      children: React.ReactNode;
      "aria-label"?: string;
    }> = ({
      page,
      isActive = false,
      disabled: buttonDisabled = false,
      children,
      "aria-label": ariaLabel,
    }) => (
      <motion.button
        whileHover={!buttonDisabled && !disabled ? { scale: 1.05 } : {}}
        whileTap={!buttonDisabled && !disabled ? { scale: 0.95 } : {}}
        onClick={() => typeof page === "number" && handlePageChange(page)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (typeof page === "number") {
              handlePageChange(page);
            }
          }
        }}
        disabled={buttonDisabled || disabled || page === "ellipsis"}
        className={cn(
          pageButtonVariants({
            ...{ isActive: isActive ? "true" : "false", size },
          } as any),
        )}
        aria-label={ariaLabel}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </motion.button>
    );

    return (
      <nav
        ref={ref}
        className={cn(
          "liquid-glass",
          paginationVariants({ ...{ size, variant } } as any),
          className,
        )}
        aria-label="Pagination"
        {...props}
      >
        {/* First Page Button */}
        {showFirstLast && totalPages > 5 && (
          <PaginationButton
            page={1}
            disabled={currentPage === 1}
            aria-label="Go to first page"
          >
            ««
          </PaginationButton>
        )}

        {/* Previous Button */}
        {showPreviousNext && (
          <PaginationButton
            page={currentPage - 1}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <React.Fragment
            key={page === "ellipsis" ? `ellipsis-${index}` : `page-${page}`}
          >
            {page === "ellipsis" ? (
              <span className="flex h-8 min-w-[32px] items-center justify-center text-liquid-tertiary">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <PaginationButton
                page={page}
                isActive={page === currentPage}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </PaginationButton>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        {showPreviousNext && (
          <PaginationButton
            page={currentPage + 1}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
        )}

        {/* Last Page Button */}
        {showFirstLast && totalPages > 5 && (
          <PaginationButton
            page={totalPages}
            disabled={currentPage === totalPages}
            aria-label="Go to last page"
          >
            »»
          </PaginationButton>
        )}
      </nav>
    );
  },
);

GlassPagination.displayName = "GlassPagination";

export { GlassPagination };
export default GlassPagination;
