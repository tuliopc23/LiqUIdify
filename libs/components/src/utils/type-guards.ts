/**
 * Type guards and validation utilities for LiquidUI components
 */

/**
 * Validates that opacity value is between 0 and 1
 */
export function isValidOpacity(value: unknown): value is number {
  return typeof value === "number" && value >= 0 && value <= 1;
}

/**
 * Validates that blur value is between 0 and 100
 */
export function isValidBlur(value: unknown): value is number {
  return typeof value === "number" && value >= 0 && value <= 100;
}

/**
 * Validates glass component properties
 */
export function validateGlassProps(props: unknown): void {
  if (typeof props !== "object" || props === null) {
    throw new Error("Props must be an object");
  }

  const glassProps = props as Record<string, unknown>;

  if ("opacity" in glassProps && !isValidOpacity(glassProps.opacity)) {
    throw new Error("Opacity must be between 0 and 1");
  }

  if ("blur" in glassProps && !isValidBlur(glassProps.blur)) {
    throw new Error("Blur must be between 0 and 100");
  }
}

/**
 * Checks if an element is a glass component
 */
export function isGlassComponent(element: unknown): boolean {
  if (typeof element !== "object" || element === null) {
    return false;
  }

  // Check if it's a DOM element with glass-related classes
  if ("classList" in element && element.classList) {
    const classList = element.classList as any;
    
    // Handle both real DOM classList and mock objects
    if (typeof classList[Symbol.iterator] === "function") {
      return Array.from(classList as Iterable<string>).some((className: string) => 
        className.startsWith("glass-")
      );
    }
    
    // Fallback for simple mock objects
    if (typeof classList.contains === "function") {
      // Check common glass class names
      const glassClasses = ["glass-button", "glass-card", "glass-input", "glass-modal"];
      return glassClasses.some(className => classList.contains(className));
    }
  }

  return false;
}