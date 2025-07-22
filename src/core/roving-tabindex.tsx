import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface RovingTabindexOptions {
  items: HTMLElement[];
  orientation?: 'horizontal' | 'vertical' | 'both';
  loop?: boolean;
  preventScroll?: boolean;
  onActiveChange?: (element: HTMLElement, index: number) => void;
  typeaheadTimeout?: number;
  homeEndKeys?: boolean;
  pageKeys?: boolean;
  focusOnHover?: boolean;
}

export interface RovingTabindexReturn {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  handlers: {
    onKeyDown: (event: React.KeyboardEvent | KeyboardEvent) => void;
    onFocus: (index: number) => void;
    onMouseEnter?: (index: number) => void;
  };
  getRovingProps: (index: number) => {
    tabIndex: number;
    'data-roving-tabindex-item': boolean;
    onKeyDown: (event: React.KeyboardEvent) => void;
    onFocus: () => void;
    onMouseEnter?: () => void;
  };
}

/**
 * Implements ARIA roving tabindex pattern for keyboard navigation
 * within composite widgets like menus, toolbars, and grids
 */
export function useRovingTabindex(
  options: RovingTabindexOptions
): RovingTabindexReturn {
  const {
    items,
    orientation = 'vertical',
    loop: _loop = true,
    preventScroll = false,
    onActiveChange,
    typeaheadTimeout = 500,
    homeEndKeys = true,
    pageKeys = false,
    focusOnHover = false,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const typeaheadRef = useRef<string>('');
  const typeaheadTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Update tabindex attributes
  useEffect(() => {
    items.forEach((item, index) => {
      if (item) {
        item.setAttribute('tabindex', index === currentIndex ? '0' : '-1');
      }
    });
  }, [items, currentIndex]);

  // Handle active change callback
  useEffect(() => {
    if (onActiveChange && items[currentIndex]) {
      onActiveChange(items[currentIndex], currentIndex);
    }
  }, [currentIndex, items, onActiveChange]);

  const focusItem = useCallback(
    (index: number) => {
      if (items[index] && !items[index].hasAttribute('disabled')) {
        items[index].focus({ preventScroll });
        setCurrentIndex(index);
      }
    },
    [items, preventScroll]
  );

  const findNextEnabledIndex = useCallback(
    (startIndex: number, direction: 1 | -1): number => {
      const totalItems = items.length;
      let currentIdx = startIndex;
      let attempts = 0;

      while (attempts < totalItems) {
        currentIdx = (currentIdx + direction + totalItems) % totalItems;

        if (!items[currentIdx]?.hasAttribute('disabled')) {
          return currentIdx;
        }

        attempts++;
      }

      return startIndex; // All items disabled
    },
    [items]
  );

  const handleTypeahead = useCallback(
    (char: string) => {
      // Clear existing timer
      if (typeaheadTimerRef.current) {
        clearTimeout(typeaheadTimerRef.current);
      }

      // Add character to typeahead string
      typeaheadRef.current += char.toLowerCase();

      // Find matching item
      const searchString = typeaheadRef.current;
      let matchIndex = -1;

      // Start search from current index + 1
      for (let i = 0; i < items.length; i++) {
        const index = (currentIndex + 1 + i) % items.length;
        const item = items[index];

        if (item && !item.hasAttribute('disabled')) {
          const text = (
            item.textContent ||
            item.getAttribute('aria-label') ||
            ''
          )
            .toLowerCase()
            .trim();

          if (text.startsWith(searchString)) {
            matchIndex = index;
            break;
          }
        }
      }

      if (-1 !== matchIndex) {
        focusItem(matchIndex);
      }

      // Reset typeahead after timeout
      typeaheadTimerRef.current = setTimeout(() => {
        typeaheadRef.current = '';
      }, typeaheadTimeout);
    },
    [items, currentIndex, focusItem, typeaheadTimeout]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      const key = event.key;
      let handled = false;
      let newIndex = currentIndex;

      switch (key) {
        case 'ArrowUp':
          if ('vertical' === orientation || 'both' === orientation) {
            newIndex = findNextEnabledIndex(currentIndex, -1);
            handled = true;
          }
          break;

        case 'ArrowDown':
          if ('vertical' === orientation || 'both' === orientation) {
            newIndex = findNextEnabledIndex(currentIndex, 1);
            handled = true;
          }
          break;

        case 'ArrowLeft':
          if ('horizontal' === orientation || 'both' === orientation) {
            newIndex = findNextEnabledIndex(currentIndex, -1);
            handled = true;
          }
          break;

        case 'ArrowRight':
          if ('horizontal' === orientation || 'both' === orientation) {
            newIndex = findNextEnabledIndex(currentIndex, 1);
            handled = true;
          }
          break;

        case 'Home':
          if (homeEndKeys) {
            // Find first enabled item
            newIndex = findNextEnabledIndex(-1, 1);
            handled = true;
          }
          break;

        case 'End':
          if (homeEndKeys) {
            // Find last enabled item
            newIndex = findNextEnabledIndex(items.length, -1);
            handled = true;
          }
          break;

        case 'PageUp':
          if (pageKeys) {
            // Move up by 10 items or to start
            const jumpUp = Math.max(0, currentIndex - 10);
            newIndex = findNextEnabledIndex(
              jumpUp,
              jumpUp < currentIndex ? 1 : -1
            );
            handled = true;
          }
          break;

        case 'PageDown':
          if (pageKeys) {
            // Move down by 10 items or to end
            const jumpDown = Math.min(items.length - 1, currentIndex + 10);
            newIndex = findNextEnabledIndex(
              jumpDown,
              jumpDown > currentIndex ? -1 : 1
            );
            handled = true;
          }
          break;

        default:
          // Handle typeahead for printable characters
          if (1 === key.length && !event.ctrlKey && !event.metaKey) {
            handleTypeahead(key);
            handled = true;
          }
          break;
      }

      if (handled) {
        event.preventDefault();
        event.stopPropagation();

        if (newIndex !== currentIndex) {
          focusItem(newIndex);
        }
      }
    },
    [
      currentIndex,
      orientation,
      findNextEnabledIndex,
      homeEndKeys,
      pageKeys,
      items.length,
      handleTypeahead,
      focusItem,
    ]
  );

  const handleFocus = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (focusOnHover && !items[index]?.hasAttribute('disabled')) {
        focusItem(index);
      }
    },
    [focusOnHover, items, focusItem]
  );

  const getRovingProps = useCallback(
    (index: number) => {
      const props: any = {
        tabIndex: index === currentIndex ? 0 : -1,
        'data-roving-tabindex-item': true,
        onKeyDown: handleKeyDown,
        onFocus: () => handleFocus(index),
      };

      if (focusOnHover) {
        props.onMouseEnter = () => handleMouseEnter(index);
      }

      return props;
    },
    [currentIndex, handleKeyDown, handleFocus, handleMouseEnter, focusOnHover]
  );

  return {
    currentIndex,
    setCurrentIndex,
    handlers: {
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      ...(focusOnHover ? { onMouseEnter: handleMouseEnter } : {}),
    },
    getRovingProps,
  };
}

/**
 * RovingTabindexGroup component for declarative usage
 */
export interface RovingTabindexGroupProps {
  children: React.ReactElement[];
  orientation?: 'horizontal' | 'vertical' | 'both';
  loop?: boolean;
  preventScroll?: boolean;
  onActiveChange?: (element: HTMLElement, index: number) => void;
  className?: string;
  role?: string;
  'aria-label'?: string;
}

export function RovingTabindexGroup({
  children,
  orientation = 'vertical',
  loop = true,
  preventScroll = false,
  onActiveChange,
  className,
  role,
  'aria-label': ariaLabel,
}: RovingTabindexGroupProps) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [items, setItems] = useState<HTMLElement[]>([]);

  // Collect item refs
  useEffect(() => {
    const validItems = itemRefs.current.filter(
      (item): item is HTMLElement => null !== item
    );
    setItems(validItems);
  }, [children.length]);

  const roving = useRovingTabindex({
    items,
    orientation,
    loop,
    preventScroll,
    onActiveChange,
  });

  // Clone children with roving props
  const enhancedChildren = children.map((child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    return React.cloneElement(child, {
      ...roving.getRovingProps(index),
      ref: (el: HTMLElement | null) => {
        itemRefs.current[index] = el;
        // Preserve original ref if exists
        const originalRef = (child as any).ref;
        if (originalRef) {
          if ('function' === typeof originalRef) {
            originalRef(el);
          } else {
            originalRef.current = el;
          }
        }
      },
    } as any);
  });

  return (
    <div
      className={className}
      role={role}
      aria-label={ariaLabel}
      data-roving-tabindex-group
    >
      {enhancedChildren}
    </div>
  );
}

/**
 * Grid-based roving tabindex for 2D navigation
 */
export interface GridRovingTabindexOptions
  extends Omit<RovingTabindexOptions, 'orientation' | 'items'> {
  items: HTMLElement[][];
  wrap?: boolean;
  onCellChange?: (element: HTMLElement, row: number, col: number) => void;
}

export function useGridRovingTabindex(options: GridRovingTabindexOptions) {
  const {
    items,
    wrap = true,
    loop: _loop2 = true,
    preventScroll = false,
    onCellChange,
    typeaheadTimeout: _typeaheadTimeout = 500,
    homeEndKeys = true,
  } = options;

  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });
  const flatItems = useRef<HTMLElement[]>([]);

  // Flatten grid for typeahead
  useEffect(() => {
    flatItems.current = items.flat().filter(Boolean);
  }, [items]);

  // Update tabindex attributes
  useEffect(() => {
    items.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          const isCurrent =
            rowIndex === currentCell.row && colIndex === currentCell.col;
          cell.setAttribute('tabindex', isCurrent ? '0' : '-1');
          cell.setAttribute('aria-rowindex', String(rowIndex + 1));
          cell.setAttribute('aria-colindex', String(colIndex + 1));
        }
      });
    });
  }, [items, currentCell]);

  // Handle cell change callback
  useEffect(() => {
    const cell = items[currentCell.row]?.[currentCell.col];
    if (onCellChange && cell) {
      onCellChange(cell, currentCell.row, currentCell.col);
    }
  }, [currentCell, items, onCellChange]);

  const focusCell = useCallback(
    (row: number, col: number) => {
      const cell = items[row]?.[col];
      if (cell && !cell.hasAttribute('disabled')) {
        cell.focus({ preventScroll });
        setCurrentCell({ row, col });
      }
    },
    [items, preventScroll]
  );

  const findNextEnabledCell = useCallback(
    (
      startRow: number,
      startCol: number,
      rowDelta: number,
      colDelta: number
    ): { row: number; col: number } | null => {
      const numRows = items.length;
      const numCols = Math.max(...items.map((row) => row.length));

      let row = startRow;
      let col = startCol;
      let attempts = 0;
      const maxAttempts = numRows * numCols;

      while (attempts < maxAttempts) {
        row += rowDelta;
        col += colDelta;

        // Handle wrapping
        if (wrap) {
          if (0 > row) {
            row = numRows - 1;
          }
          if (row >= numRows) {
            row = 0;
          }
          if (0 > col) {
            col = numCols - 1;
          }
          if (col >= numCols) {
            col = 0;
          }
        } else {
          // Clamp to bounds
          row = Math.max(0, Math.min(numRows - 1, row));
          col = Math.max(0, Math.min(numCols - 1, col));
        }

        const cell = items[row]?.[col];
        if (cell && !cell.hasAttribute('disabled')) {
          return { row, col };
        }

        attempts++;
      }

      return null;
    },
    [items, wrap]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      const key = event.key;
      let handled = false;
      let newCell = { ...currentCell };

      switch (key) {
        case 'ArrowUp': {
          const upCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            -1,
            0
          );
          if (upCell) {
            newCell = upCell;
            handled = true;
          }
          break;
        }

        case 'ArrowDown': {
          const downCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            1,
            0
          );
          if (downCell) {
            newCell = downCell;
            handled = true;
          }
          break;
        }

        case 'ArrowLeft': {
          const leftCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            0,
            -1
          );
          if (leftCell) {
            newCell = leftCell;
            handled = true;
          }
          break;
        }

        case 'ArrowRight': {
          const rightCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            0,
            1
          );
          if (rightCell) {
            newCell = rightCell;
            handled = true;
          }
          break;
        }

        case 'Home':
          if (homeEndKeys) {
            if (event.ctrlKey) {
              // Go to first cell
              const firstCell = findNextEnabledCell(-1, -1, 0, 1);
              if (firstCell) {
                newCell = firstCell;
                handled = true;
              }
            } else {
              // Go to first cell in row
              const firstInRow = findNextEnabledCell(currentCell.row, -1, 0, 1);
              if (firstInRow) {
                newCell = firstInRow;
                handled = true;
              }
            }
          }
          break;

        case 'End':
          if (homeEndKeys) {
            if (event.ctrlKey) {
              // Go to last cell
              const lastRow = items.length - 1;
              const lastCol = (items[lastRow]?.length ?? 1) - 1;
              const lastCell = findNextEnabledCell(
                lastRow + 1,
                lastCol + 1,
                0,
                -1
              );
              if (lastCell) {
                newCell = lastCell;
                handled = true;
              }
            } else {
              // Go to last cell in row
              const lastInRow = findNextEnabledCell(
                currentCell.row,
                items[currentCell.row]?.length || 0,
                0,
                -1
              );
              if (lastInRow) {
                newCell = lastInRow;
                handled = true;
              }
            }
          }
          break;

        default:
          // Handle typeahead
          if (1 === key.length && !event.ctrlKey && !event.metaKey) {
            // Use flat roving for typeahead in grid
            // Implementation would be similar to linear roving
            handled = true;
          }
          break;
      }

      if (handled) {
        event.preventDefault();
        event.stopPropagation();

        if (
          newCell.row !== currentCell.row ||
          newCell.col !== currentCell.col
        ) {
          focusCell(newCell.row, newCell.col);
        }
      }
    },
    [currentCell, findNextEnabledCell, homeEndKeys, focusCell, items]
  );

  return {
    currentCell,
    setCurrentCell,
    handleKeyDown,
    focusCell,
  };
}
