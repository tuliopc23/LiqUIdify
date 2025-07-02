import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/glass-utils';
import { cva, type VariantProps } from 'class-variance-authority';

const paginationVariants = cva(
  [
    'flex items-center justify-center space-x-1',
    'p-2 rounded-lg backdrop-blur-md',
    'bg-white/5 border border-white/10',
  ],
  {
    variants: {
      size: {
        sm: 'text-xs p-1',
        md: 'text-sm p-2',
        lg: 'text-base p-3',
      },
      variant: {
        default: 'bg-white/5',
        solid: 'bg-white/10',
        ghost: 'bg-transparent border-transparent',
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
    'flex items-center justify-center min-w-[32px] h-8 px-2',
    'rounded-md transition-all duration-200',
    'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'text-white/70 hover:text-white',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-blue-500/20 text-blue-400 border border-blue-400/30',
        false: 'hover:bg-white/5',
      },
      size: {
        sm: 'min-w-[24px] h-6 text-xs',
        md: 'min-w-[32px] h-8 text-sm',
        lg: 'min-w-[40px] h-10 text-base',
      },
    },
    defaultVariants: {
      isActive: false,
      size: 'md',
    },
  }
);

export interface GlassPaginationProps
  extends React.HTMLAttributes<HTMLElement>,
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
      showPrevNext = true,
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
      const pages: (number | 'ellipsis')[] = [];

      // Always include first page(s)
      for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
        pages.push(i);
      }

      // Calculate start and end of sibling range
      const siblingStart = Math.max(currentPage - siblingCount, boundaryCount + 1);
      const siblingEnd = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

      // Add ellipsis before siblings if needed
      if (siblingStart > boundaryCount + 1) {
        if (showEllipsis) pages.push('ellipsis');
      }

      // Add sibling pages
      for (let i = siblingStart; i <= siblingEnd; i++) {
        if (i <= boundaryCount || i > totalPages - boundaryCount) continue;
        pages.push(i);
      }

      // Add ellipsis after siblings if needed
      if (siblingEnd < totalPages - boundaryCount) {
        if (showEllipsis) pages.push('ellipsis');
      }

      // Always include last page(s)
      for (let i = Math.max(totalPages - boundaryCount + 1, boundaryCount + 1); i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
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
      page: number | 'ellipsis';
      isActive?: boolean;
      disabled?: boolean;
      children: React.ReactNode;
      'aria-label'?: string;
    }> = ({ page, isActive = false, disabled: buttonDisabled = false, children, 'aria-label': ariaLabel }) => (
      <motion.button
        whileHover={!buttonDisabled && !disabled ? { scale: 1.05 } : {}}
        whileTap={!buttonDisabled && !disabled ? { scale: 0.95 } : {}}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        disabled={buttonDisabled || disabled || page === 'ellipsis'}
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
        {showPrevNext && (
          <PaginationButton
            page={currentPage - 1}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </PaginationButton>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === 'ellipsis' ? (
              <span className="flex items-center justify-center min-w-[32px] h-8 text-white/40">
                <MoreHorizontal className="w-4 h-4" />
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
        {showPrevNext && (
          <PaginationButton
            page={currentPage + 1}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <ChevronRight className="w-4 h-4" />
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
  }
);

GlassPagination.displayName = 'GlassPagination';

export { GlassPagination };
export type { GlassPaginationProps };
