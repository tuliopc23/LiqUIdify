import React, { useCallback, useEffect, useRef, useState } from "react";

interface RovingTabindexOptions {
  items: Array<HTMLElement>;
  orientation?: "horizontal" | "vertical" | "both";
  loop?: boolean;
  preventScroll?: boolean;
  onActiveChange?: (element: HTMLElement, index: number) => void;
  typeaheadTimeout?: number;
  homeEndKeys?: boolean;
  pageKeys?: boolean;
  focusOnHover?: boolean;
}

interface RovingTabindexReturn {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  handlers: {
    onKeyDown: (event: React.KeyboardEvent | KeyboardEvent) => void;
    onFocus: (index: number) => void;
    onMouseEnter?: (index: number) => void;
  };
  getRovingProps: (index: number) => {
    tabIndex: number;
    "data-roving-tabindex-item": boolean;
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
  options: RovingTabindexOptions,
): RovingTabindexReturn {
  const {
    items,
    orientation = "vertical",
    loop: _loop = true,
    preventScroll = false,
    onActiveChange,
    typeaheadTimeout = 500,
    homeEndKeys = true,
    pageKeys = false,
    focusOnHover = false,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const typeaheadRef = useRef<string>("");
  const typeaheadTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Update tabindex attributes
  useEffect(() => {
    for (const [index, item] of items.entries()) {
      if (item) {
        item.setAttribute("tabindex", index === currentIndex ? "0" : "-1");
      }
    }
  }, [items, currentIndex]);

  // Handle active change callback
  useEffect(() => {
    if (onActiveChange && items[currentIndex]) {
      onActiveChange(items[currentIndex], currentIndex);
    }
  }, [currentIndex, items, onActiveChange]);

  const focusItem = useCallback(
    (index: number) => {
      if (items[index] && !items[index].hasAttribute("disabled")) {
        items[index].focus({ preventScroll });
        setCurrentIndex(index);
      }
    },
    [items, preventScroll],
  );

  const findNextEnabledIndex = useCallback(
    (startIndex: number, direction: 1 | -1): number => {
      const totalItems = items.length;
      let currentIndex_ = startIndex;
      let attempts = 0;

      while (attempts < totalItems) {
        currentIndex_ = (currentIndex_ + direction + totalItems) % totalItems;

        if (!items[currentIndex_]?.hasAttribute("disabled")) {
          return currentIndex_;
        }

        attempts++;
      }

      return startIndex; // All items disabled
    },
    [items],
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
      for (let index_ = 0; index_ < items.length; index_++) {
        const index = (currentIndex + 1 + index_) % items.length;
        const item = items[index];

        if (item && !item.hasAttribute("disabled")) {
          const text = (
            item.textContent ||
            item.getAttribute("aria-label") ||
            ""
          )
            .toLowerCase()
            .trim();

          if (text.startsWith(searchString)) {
            matchIndex = index;
            break;
          }
        }
      }

      if (matchIndex !== -1) {
        focusItem(matchIndex);
      }

      // Reset typeahead after timeout
      typeaheadTimerRef.current = setTimeout(() => {
        typeaheadRef.current = "";
      }, typeaheadTimeout);
    },
    [items, currentIndex, focusItem, typeaheadTimeout],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      const key = event.key;
      let handled = false;
      let newIndex = currentIndex;

      switch (key) {
        case "ArrowUp": {
          if (orientation === "vertical" || orientation === "both") {
            newIndex = findNextEnabledIndex(currentIndex, -1);
            handled = true;
          }
          break;
        }

        case "ArrowDown": {
          if (orientation === "vertical" || orientation === "both") {
            newIndex = findNextEnabledIndex(currentIndex, 1);
            handled = true;
          }
          break;
        }

        case "ArrowLeft": {
          if (orientation === "horizontal" || orientation === "both") {
            newIndex = findNextEnabledIndex(currentIndex, -1);
            handled = true;
          }
          break;
        }

        case "ArrowRight": {
          if (orientation === "horizontal" || orientation === "both") {
            newIndex = findNextEnabledIndex(currentIndex, 1);
            handled = true;
          }
          break;
        }

        case "Home": {
          if (homeEndKeys) {
            // Find first enabled item
            newIndex = findNextEnabledIndex(-1, 1);
            handled = true;
          }
          break;
        }

        case "End": {
          if (homeEndKeys) {
            // Find last enabled item
            newIndex = findNextEnabledIndex(items.length, -1);
            handled = true;
          }
          break;
        }

        case "PageUp": {
          if (pageKeys) {
            // Move up by 10 items or to start
            const jumpUp = Math.max(0, currentIndex - 10);
            newIndex = findNextEnabledIndex(
              jumpUp,
              jumpUp < currentIndex ? 1 : -1,
            );
            handled = true;
          }
          break;
        }

        case "PageDown": {
          if (pageKeys) {
            // Move down by 10 items or to end
            const jumpDown = Math.min(items.length - 1, currentIndex + 10);
            newIndex = findNextEnabledIndex(
              jumpDown,
              jumpDown > currentIndex ? -1 : 1,
            );
            handled = true;
          }
          break;
        }

        default: {
          // Handle typeahead for printable characters
          if (key.length === 1 && !event.ctrlKey && !event.metaKey) {
            handleTypeahead(key);
            handled = true;
          }
          break;
        }
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
    ],
  );

  const handleFocus = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (focusOnHover && !items[index]?.hasAttribute("disabled")) {
        focusItem(index);
      }
    },
    [focusOnHover, items, focusItem],
  );

  const getRovingProps = useCallback(
    (index: number) => {
      const props: {
        tabIndex: number;
        "data-roving-tabindex-item": boolean;
        onKeyDown: (event: React.KeyboardEvent) => void;
        onFocus: () => void;
        onMouseEnter?: () => void;
      } = {
        tabIndex: index === currentIndex ? 0 : -1,
        "data-roving-tabindex-item": true,
        onKeyDown: handleKeyDown,
        onFocus: () => handleFocus(index),
      };

      if (focusOnHover) {
        props.onMouseEnter = () => handleMouseEnter(index);
      }

      return props;
    },
    [currentIndex, handleKeyDown, handleFocus, handleMouseEnter, focusOnHover],
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
interface RovingTabindexGroupProps {
  children: React.ReactElement[];
  orientation?: "horizontal" | "vertical" | "both";
  loop?: boolean;
  preventScroll?: boolean;
  onActiveChange?: (element: HTMLElement, index: number) => void;
  className?: string;
  role?: string;
  "aria-label"?: string;
}

export function RovingTabindexGroup({
  children,
  orientation = "vertical",
  loop = true,
  preventScroll = false,
  onActiveChange,
  className,
  role,
  "aria-label": ariaLabel,
}: RovingTabindexGroupProps) {
  const itemReferences = useRef<(HTMLElement | null)[]>([]);
  const [items, setItems] = useState<Array<HTMLElement>>([]);

  // Collect item refs
  useEffect(() => {
    const validItems = (
      itemReferences.current as (HTMLElement | null)[]
    ).filter((item): item is HTMLElement => item !== null);
    setItems(validItems);
  }, []);

  const rovingOptions: any = {
    items,
    orientation,
    loop,
    preventScroll,
  };
  if (onActiveChange) {
    rovingOptions.onActiveChange = onActiveChange;
  }
  const roving = useRovingTabindex(rovingOptions);

  // Clone children with roving props - simplified approach
  const enhancedChildren = children.map((child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // Get the roving props for this index
    const rovingProps = roving.getRovingProps(index);

    // Safely get child props
    const childElement = child as React.ReactElement<any>;
    const childProps = childElement.props || {};

    // Create a properly typed props object
    const enhancedProps: any = {
      ...childProps,
      ...rovingProps,
      ref: (element: HTMLElement | null) => {
        // Store the element reference
        itemReferences.current[index] = element;

        // Handle original ref if it exists
        const originalRef = (childElement as any).ref;
        if (originalRef) {
          if (typeof originalRef === "function") {
            originalRef(element);
          } else if (originalRef && typeof originalRef === "object") {
            originalRef.current = element;
          }
        }
      },
    };

    return React.cloneElement(child, enhancedProps);
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
interface GridRovingTabindexOptions
  extends Omit<RovingTabindexOptions, "orientation" | "items"> {
  items: Array<Array<HTMLElement>>;
  wrap?: boolean;
  onCellChange?: (element: HTMLElement, row: number, col: number) => void;
}

function _useGridRovingTabindex(options: GridRovingTabindexOptions) {
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
  const flatItems = useRef<Array<HTMLElement>>([]);

  // Flatten grid for typeahead
  useEffect(() => {
    flatItems.current = items.flat().filter(Boolean);
  }, [items]);

  // Update tabindex attributes
  useEffect(() => {
    for (const [rowIndex, row] of items.entries()) {
      for (const [colIndex, cell] of row.entries()) {
        if (cell) {
          const isCurrent =
            rowIndex === currentCell.row && colIndex === currentCell.col;
          cell.setAttribute("tabindex", isCurrent ? "0" : "-1");
          cell.setAttribute("aria-rowindex", String(rowIndex + 1));
          cell.setAttribute("aria-colindex", String(colIndex + 1));
        }
      }
    }
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
      if (cell && !cell.hasAttribute("disabled")) {
        cell.focus({ preventScroll });
        setCurrentCell({ row, col });
      }
    },
    [items, preventScroll],
  );

  const findNextEnabledCell = useCallback(
    (
      startRow: number,
      startCol: number,
      rowDelta: number,
      colDelta: number,
    ): { row: number; col: number } | null => {
      const numberRows = items.length;
      const numberCols = Math.max(...items.map((row) => row.length));

      let row = startRow;
      let col = startCol;
      let attempts = 0;
      const maxAttempts = numberRows * numberCols;

      while (attempts < maxAttempts) {
        row += rowDelta;
        col += colDelta;

        // Handle wrapping
        if (wrap) {
          if (row < 0) {
            row = numberRows - 1;
          }
          if (row >= numberRows) {
            row = 0;
          }
          if (col < 0) {
            col = numberCols - 1;
          }
          if (col >= numberCols) {
            col = 0;
          }
        } else {
          // Clamp to bounds
          row = Math.max(0, Math.min(numberRows - 1, row));
          col = Math.max(0, Math.min(numberCols - 1, col));
        }

        const cell = items[row]?.[col];
        if (cell && !cell.hasAttribute("disabled")) {
          return { row, col };
        }

        attempts++;
      }

      return null;
    },
    [items, wrap],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      const key = event.key;
      let handled = false;
      let newCell = { ...currentCell };

      switch (key) {
        case "ArrowUp": {
          const upCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            -1,
            0,
          );
          if (upCell) {
            newCell = upCell;
            handled = true;
          }
          break;
        }

        case "ArrowDown": {
          const downCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            1,
            0,
          );
          if (downCell) {
            newCell = downCell;
            handled = true;
          }
          break;
        }

        case "ArrowLeft": {
          const leftCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            0,
            -1,
          );
          if (leftCell) {
            newCell = leftCell;
            handled = true;
          }
          break;
        }

        case "ArrowRight": {
          const rightCell = findNextEnabledCell(
            currentCell.row,
            currentCell.col,
            0,
            1,
          );
          if (rightCell) {
            newCell = rightCell;
            handled = true;
          }
          break;
        }

        case "Home": {
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
        }

        case "End": {
          if (homeEndKeys) {
            if (event.ctrlKey) {
              // Go to last cell
              const lastRow = items.length - 1;
              const lastCol = (items[lastRow]?.length ?? 1) - 1;
              const lastCell = findNextEnabledCell(
                lastRow + 1,
                lastCol + 1,
                0,
                -1,
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
                -1,
              );
              if (lastInRow) {
                newCell = lastInRow;
                handled = true;
              }
            }
          }
          break;
        }

        default: {
          // Handle typeahead
          if (key.length === 1 && !event.ctrlKey && !event.metaKey) {
            // Use flat roving for typeahead in grid
            // Implementation would be similar to linear roving
            handled = true;
          }
          break;
        }
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
    [currentCell, findNextEnabledCell, homeEndKeys, focusCell, items],
  );

  return {
    currentCell,
    setCurrentCell,
    handleKeyDown,
    focusCell,
  };
}
