/**
 * Validation Utilities Module
 *
 * This module provides utilities for validating props, data, and user input
 * with comprehensive type safety and error handling.
 */

// Basic validation types
export interface ValidationResult {
  isValid: boolean;
  errors: Array<string>;
  warnings: Array<string>;
}

export type Validator<T = any> = (value: T) => ValidationResult;

/**
 * Create a validation result
 */
export function createValidationResult(
  isValid: boolean,
  errors: Array<string> = [],
  warnings: Array<string> = []
): ValidationResult {
  return { isValid, errors, warnings };
}

/**
 * Combine multiple validation results
 */
export function combineValidationResults(
  ...results: Array<ValidationResult>
): ValidationResult {
  const allErrors = results.flatMap((r) => r.errors);
  const allWarnings = results.flatMap((r) => r.warnings);
  const isValid = results.every((r) => r.isValid);

  return createValidationResult(isValid, allErrors, allWarnings);
}

/**
 * String validation utilities
 */
export const stringValidators = {
  required:
    (message = 'This field is required'): Validator<string> =>
    (value) => {
      const isValid = 'string' === typeof value && value.trim().length > 0;
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  minLength:
    (min: number, message?: string): Validator<string> =>
    (value) => {
      const actualMessage =
        message || `Must be at least ${min} characters long`;
      const isValid = 'string' === typeof value && value.length >= min;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  maxLength:
    (max: number, message?: string): Validator<string> =>
    (value) => {
      const actualMessage =
        message || `Must be no more than ${max} characters long`;
      const isValid = 'string' === typeof value && value.length <= max;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  pattern:
    (regex: RegExp, message = 'Invalid format'): Validator<string> =>
    (value) => {
      const isValid = 'string' === typeof value && regex.test(value);
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  email:
    (message = 'Invalid email address'): Validator<string> =>
    (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = 'string' === typeof value && emailRegex.test(value);
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  url:
    (message = 'Invalid URL'): Validator<string> =>
    (value) => {
      try {
        new URL(value);
        return createValidationResult(true);
      } catch {
        return createValidationResult(false, [message]);
      }
    },

  alphanumeric:
    (message = 'Only letters and numbers allowed'): Validator<string> =>
    (value) => {
      const isValid = 'string' === typeof value && /^[\dA-Za-z]+$/.test(value);
      return createValidationResult(isValid, isValid ? [] : [message]);
    },
};

/**
 * Number validation utilities
 */
export const numberValidators = {
  required:
    (message = 'Number is required'): Validator<number> =>
    (value) => {
      const isValid = 'number' === typeof value && !Number.isNaN(value);
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  min:
    (min: number, message?: string): Validator<number> =>
    (value) => {
      const actualMessage = message || `Must be at least ${min}`;
      const isValid = 'number' === typeof value && value >= min;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  max:
    (max: number, message?: string): Validator<number> =>
    (value) => {
      const actualMessage = message || `Must be no more than ${max}`;
      const isValid = 'number' === typeof value && value <= max;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  integer:
    (message = 'Must be a whole number'): Validator<number> =>
    (value) => {
      const isValid = 'number' === typeof value && Number.isInteger(value);
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  positive:
    (message = 'Must be positive'): Validator<number> =>
    (value) => {
      const isValid = 'number' === typeof value && 0 < value;
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  range:
    (min: number, max: number, message?: string): Validator<number> =>
    (value) => {
      const actualMessage = message || `Must be between ${min} and ${max}`;
      const isValid = 'number' === typeof value && value >= min && value <= max;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },
};

/**
 * Array validation utilities
 */
export const arrayValidators = {
  required:
    (message = 'At least one item is required'): Validator<Array<any>> =>
    (value) => {
      const isValid = Array.isArray(value) && value.length > 0;
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  minLength:
    (min: number, message?: string): Validator<Array<any>> =>
    (value) => {
      const actualMessage = message || `Must have at least ${min} items`;
      const isValid = Array.isArray(value) && value.length >= min;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  maxLength:
    (max: number, message?: string): Validator<Array<any>> =>
    (value) => {
      const actualMessage = message || `Must have no more than ${max} items`;
      const isValid = Array.isArray(value) && value.length <= max;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  unique:
    (message = 'All items must be unique'): Validator<Array<any>> =>
    (value) => {
      if (!Array.isArray(value)) {
        return createValidationResult(false, ['Value must be an array']);
      }
      const isValid = new Set(value).size === value.length;
      return createValidationResult(isValid, isValid ? [] : [message]);
    },
};

/**
 * Object validation utilities
 */
export const objectValidators = {
  required:
    (message = 'Object is required'): Validator<object> =>
    (value) => {
      const isValid = 'object' === typeof value && null !== value;
      return createValidationResult(isValid, isValid ? [] : [message]);
    },

  hasProperty:
    (property: string, message?: string): Validator<object> =>
    (value) => {
      const actualMessage = message || `Must have property '${property}'`;
      const isValid =
        'object' === typeof value && null !== value && property in value;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  shape:
    <T extends Record<string, unknown>>(
      schema: { [K in keyof T]: Validator<T[K]> },
      _message = 'Object validation failed'
    ): Validator<T> =>
    (value) => {
      if ('object' !== typeof value || null === value) {
        return createValidationResult(false, ['Value must be an object']);
      }

      const results = Object.entries(schema).map(([key, validator]) => {
        const fieldValue = (value as unknown)[key];
        const result = validator(fieldValue);

        // Prefix field name to errors
        const fieldErrors = result.errors.map(
          (error: Error) => `${key}: ${error}`
        );
        const fieldWarnings = result.warnings.map(
          (warning: unknown) => `${key}: ${warning}`
        );

        return createValidationResult(
          result.isValid,
          fieldErrors,
          fieldWarnings
        );
      });

      return combineValidationResults(...results);
    },
};

/**
 * Conditional validation
 */
export function conditional<T>(
  condition: (value: T) => boolean,
  validator: Validator<T>
): Validator<T> {
  return (value) => {
    if (!condition(value)) {
      return createValidationResult(true); // Skip validation if condition not met
    }
    return validator(value);
  };
}

/**
 * Optional validation (only validates if value is not null/undefined)
 */
export function optional<T>(
  validator: Validator<T>
): Validator<T | null | undefined> {
  return (value) => {
    if (null === value || value === undefined) {
      return createValidationResult(true);
    }
    return validator(value);
  };
}

/**
 * Chain multiple validators
 */
export function chain<T>(...validators: Array<Validator<T>>): Validator<T> {
  return (value) => {
    const results = validators.map((validator) => validator(value));
    return combineValidationResults(...results);
  };
}

/**
 * Component prop validation
 */
export interface PropertyValidationSchema {
  [key: string]: Validator<any>;
}

export function validateProps<T extends Record<string, unknown>>(
  props: T,
  schema: PropertyValidationSchema
): ValidationResult {
  const results = Object.entries(schema).map(([propertyName, validator]) => {
    const propertyValue = props[propertyName];
    const result = validator(propertyValue);

    // Prefix prop name to errors
    const propertyErrors = result.errors.map(
      (error) => `${propertyName}: ${error}`
    );
    const propertyWarnings = result.warnings.map(
      (warning) => `${propertyName}: ${warning}`
    );

    return createValidationResult(
      result.isValid,
      propertyErrors,
      propertyWarnings
    );
  });

  return combineValidationResults(...results);
}

/**
 * Accessibility validation utilities
 */
export const a11yValidators = {
  ariaLabel:
    (message = 'aria-label or aria-labelledby is required'): Validator<any> =>
    (props) => {
      const hasAriaLabel = props['aria-label'] || props['aria-labelledby'];
      return createValidationResult(
        Boolean(hasAriaLabel),
        hasAriaLabel ? [] : [message]
      );
    },

  altText:
    (message = 'alt attribute is required for images'): Validator<any> =>
    (props) => {
      if ('img' === props.as || 'img' === props.role) {
        const hasAlt = 'string' === typeof props.alt;
        return createValidationResult(hasAlt, hasAlt ? [] : [message]);
      }
      return createValidationResult(true);
    },

  colorContrast: (
    backgroundColor: string,
    textColor: string,
    minRatio = 4.5
  ): ValidationResult => {
    // Simplified contrast ratio calculation
    // In a real implementation, you'd use a proper color library
    const bgLuminance = getLuminance(backgroundColor);
    const textLuminance = getLuminance(textColor);

    const ratio =
      (Math.max(bgLuminance, textLuminance) + 0.05) /
      (Math.min(bgLuminance, textLuminance) + 0.05);

    const isValid = ratio >= minRatio;
    const message = `Color contrast ratio ${ratio.toFixed(2)} is below minimum ${minRatio}`;

    return createValidationResult(isValid, isValid ? [] : [message]);
  },

  keyboardAccessible:
    (
      message = 'Interactive elements must be keyboard accessible'
    ): Validator<any> =>
    (props) => {
      const isInteractive =
        props.onClick || props.onKeyDown || null !== props.tabIndex;
      if (!isInteractive) {
        return createValidationResult(true);
      }

      const hasTabIndex =
        'number' === typeof props.tabIndex && 0 <= props.tabIndex;
      const hasKeyHandler = 'function' === typeof props.onKeyDown;
      const isAccessible = hasTabIndex || hasKeyHandler;

      return createValidationResult(
        isAccessible,
        isAccessible ? [] : [message]
      );
    },
};

/**
 * Helper function to calculate luminance (simplified)
 */
function getLuminance(color: string): number {
  // Simplified luminance calculation
  // In a real implementation, you'd parse the color properly
  const hex = color.replace('#', '');
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Performance validation utilities
 */
export const performanceValidators = {
  bundleSize:
    (maxSize: number, message?: string): Validator<number> =>
    (size) => {
      const actualMessage =
        message || `Bundle size ${size}KB exceeds limit of ${maxSize}KB`;
      const isValid = size <= maxSize;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  renderTime:
    (maxTime: number, message?: string): Validator<number> =>
    (time) => {
      const actualMessage =
        message || `Render time ${time}ms exceeds limit of ${maxTime}ms`;
      const isValid = time <= maxTime;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },

  memoryUsage:
    (maxMemory: number, message?: string): Validator<number> =>
    (memory) => {
      const actualMessage =
        message || `Memory usage ${memory}MB exceeds limit of ${maxMemory}MB`;
      const isValid = memory <= maxMemory;
      return createValidationResult(isValid, isValid ? [] : [actualMessage]);
    },
};

/**
 * Custom validator creation utility
 */
export function createValidator<T>(
  validationFunction: (value: T) => boolean,
  errorMessage: string,
  warningMessage?: string
): Validator<T> {
  return (value) => {
    const isValid = validationFunction(value);
    const errors = isValid ? [] : [errorMessage];
    const warnings = warningMessage && !isValid ? [warningMessage] : [];
    return createValidationResult(isValid, errors, warnings);
  };
}

// Types are already exported above, no need to re-export
