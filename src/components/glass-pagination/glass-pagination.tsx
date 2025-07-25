import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import React from 'react';
import { cn } from '@/core/utils/classname';
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from '../../lib/variant-system';

const paginationVariants = cva(
  [
    'flex items-center justify-center space-x-1',
    'rounded-lg p-2 backdrop-blur-md',
    'border border-white/10 bg-white/5',
  ],

  {
    variants: {
      size: {
        sm: 'p-1 text-xs',
        md: 'p-2 text-sm',
        lg: 'p-3 text-base',
      },
      variant: {
        default: 'bg-white/5',
        solid: 'bg-white/10',
        ghost: 'border-transparent bg-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const pageButtonVariants = cva(
  [
    'flex h-8 min-w-[32px] items-center justify-center px-2',
    'rounded-md transition-all duration-200',
    'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'text-white/70 hover:text-white',
  ],

  {
    variants: {
      isActive: {
        true: 'border border-blue-400/30 bg-blue-500/20 text-blue-400',
        false: 'hover:bg-white/5',
      },
      size: {
        sm: 'h-6 min-w-[24px] text-xs',
        md: 'h-8 min-w-[32px] text-sm',
        lg: 'h-10 min-w-[40px] text-base',
      },
    },
    defaultVariants: {
      isActive: 'false',
      size: 'md',
    },
  }
);

export interface GlassPaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof React.AriaAttributes>,
    VariantProps<typeof paginationVariants> {
  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;

  showFirstLast?: boolean;

  showPrevNext?: boolean;

  showEllipsis?: boolean;

  siblingCount?: number;

  boundaryCount?: number;

  disabled?: boolean;
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
    ref
  ) => {
    const generatePageNumbers = () => {
      const pages: Array<number | 'ellipsis'> = [];

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

        boundaryCount + 1
      );
      const siblingEnd = Math.min(
        currentPage + siblingCount,

        totalPages - boundaryCount
      );

      // Add ellipsis before siblings if needed

      if (siblingStart > boundaryCount + 1 && showEllipsis) {
        pages.push('ellipsis');
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
        pages.push('ellipsis');
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
      if (disabled || 1 > page || page > totalPages || page === currentPage) {
        return;
      }

      onPageChange(page);
    };

    const PaginationButton: React.FC<{
      page: number | 'ellipsis';
      isActive?: boolean;
      disabled?: boolean;
      children: React.ReactNode;
      'aria-label'?: string;
    }> = ({
      page,
      isActive = false,
      disabled: buttonDisabled = false,
      children,
      'aria-label': ariaLabel,
    }) => (
      <motion.button
        whileHover={!buttonDisabled && !disabled ? { scale: 1.05 } : {}}
        whileTap={!buttonDisabled && !disabled ? { scale: 0.95 } : {}}
        onClick={() => 'number' === typeof page && handlePageChange(page)}
        disabled={buttonDisabled || disabled || 'ellipsis' === page}
        className={cn(pageButtonVariants({ isActive, size }))}
        aria-label={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </motion.button>
    );

    return (
      <nav
        ref={ref}
        className={cn(paginationVariants({ size, variant }), className)}
        aria-label="Pagination"
        {...props}
      >
        {/* First Page Button */}

        {showFirstLast && 5 < Number(totalPages) && (
          <PaginationButton
            page={1}
            disabled={1 === currentPage}
            aria-label="Go to first page"
          >
            ««
          </PaginationButton>
        )}

        {/* Previous Button */}
        {showPreviousNext && (
          <PaginationButton
            page={currentPage - 1}
            disabled={1 === currentPage}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {'ellipsis' === page ? (
              <span className="flex h-8 min-w-[32px] items-center justify-center text-white/40">
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
            disabled={currentPage === Number(totalPages)}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
        )}

        {/* Last Page Button */}

        {showFirstLast && 5 < Number(totalPages) && (
          <PaginationButton
            page={totalPages}
            disabled={currentPage === Number(totalPages)}
            aria-label="Go to last page"
          >
            »»
          </PaginationButton>
        )}
      </nav>
    );
  }
);

GlassPagination.displayName = 'GlassPagination';

export { GlassPagination };
