/**
 * LiquidiUI Component Standards
 * 
 * This file defines the standard interfaces, props, and patterns
 * that all LiquidiUI components should follow for consistency
 * and professional-grade API design.
 */

import { ReactNode, HTMLAttributes, ComponentPropsWithoutRef } from 'react';

// ============================================================================
// STANDARD SIZE SYSTEM
// ============================================================================

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const standardSizes: Record<ComponentSize, string> = {
  xs: 'xs',
  sm: 'sm', 
  md: 'md',
  lg: 'lg',
  xl: 'xl'
};

// ============================================================================
// STANDARD VARIANT SYSTEM
// ============================================================================

export type ComponentVariant = 
  | 'default'
  | 'primary' 
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'warning';

// ============================================================================
// STANDARD COMPONENT PROPS
// ============================================================================

/**
 * Standard props that all interactive components should support
 */
export interface StandardComponentProps {
  /** Component size variant */
  size?: ComponentSize;
  /** Component visual variant */
  variant?: ComponentVariant;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether to show loading state */
  loading?: boolean;
  /** Render as child component (polymorphic) */
  asChild?: boolean;
  /** Custom CSS class name */
  className?: string;
}

/**
 * Standard props for components that support icons
 */
export interface IconSupportProps {
  /** Icon to display on the left side */
  leftIcon?: ReactNode;
  /** Icon to display on the right side */
  rightIcon?: ReactNode;
}

/**
 * Standard props for form components
 */
export interface FormComponentProps {
  /** Whether the component has an error state */
  error?: boolean;
  /** Helper text to display below the component */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Custom error message */
  errorMessage?: string;
}

/**
 * Standard props for focusable components
 */
export interface FocusableProps {
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Tab index */
  tabIndex?: number;
}

/**
 * Standard animation and interaction props
 */
export interface InteractionProps {
  /** Enable magnetic hover effect */
  magneticHover?: boolean;
  /** Enable ripple effect on click */
  ripple?: boolean;
  /** Enable specular highlights */
  specularHighlights?: boolean;
}

// ============================================================================
// PROFESSIONAL COMPONENT INTERFACES
// ============================================================================

/**
 * Complete button component interface following professional standards
 */
export interface ProfessionalButtonProps 
  extends ComponentPropsWithoutRef<'button'>,
          StandardComponentProps,
          IconSupportProps,
          FocusableProps,
          InteractionProps {
  /** Button content */
  children?: ReactNode;
  /** Loading spinner variant */
  loadingText?: string;
  /** Full width button */
  fullWidth?: boolean;
}

/**
 * Complete input component interface following professional standards
 */
export interface ProfessionalInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>,
          StandardComponentProps,
          IconSupportProps,
          FormComponentProps,
          FocusableProps {
  /** Input variant type */
  inputVariant?: 'default' | 'search' | 'password' | 'email' | 'number' | 'tel' | 'url';
  /** Whether input is clearable */
  clearable?: boolean;
  /** Input placeholder */
  placeholder?: string;
  /** Whether to show character count */
  showCount?: boolean;
  /** Maximum character count */
  maxCount?: number;
}

/**
 * Complete card component interface following professional standards
 */
export interface ProfessionalCardProps
  extends HTMLAttributes<HTMLDivElement>,
          StandardComponentProps,
          InteractionProps {
  /** Card padding variant */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether card has border */
  bordered?: boolean;
  /** Whether card is hoverable */
  hoverable?: boolean;
  /** Whether card is selectable */
  selectable?: boolean;
  /** Whether card is selected (when selectable) */
  selected?: boolean;
}

// ============================================================================
// ACCESSIBILITY STANDARDS
// ============================================================================

/**
 * Standard ARIA props for accessibility
 */
export interface AccessibilityProps {
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA described by */
  'aria-describedby'?: string;
  /** ARIA labelled by */
  'aria-labelledby'?: string;
  /** ARIA expanded (for dropdowns, etc) */
  'aria-expanded'?: boolean;
  /** ARIA pressed (for toggle buttons) */
  'aria-pressed'?: boolean;
  /** ARIA selected (for selectable items) */
  'aria-selected'?: boolean;
  /** ARIA disabled */
  'aria-disabled'?: boolean;
  /** ARIA invalid */
  'aria-invalid'?: boolean;
  /** ARIA required */
  'aria-required'?: boolean;
  /** ARIA live region */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  /** Role override */
  role?: string;
}

// ============================================================================
// THEMING STANDARDS
// ============================================================================

/**
 * Standard theme tokens that components should use
 */
export const themeTokens = {
  // Colors
  colors: {
    primary: 'var(--glass-primary)',
    secondary: 'var(--glass-secondary)',
    tertiary: 'var(--glass-tertiary)',
    success: 'var(--glass-success)',
    warning: 'var(--glass-warning)',
    error: 'var(--glass-error)',
    
    // Text colors
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    textMuted: 'var(--text-muted)',
    
    // Background colors
    bgPrimary: 'var(--glass-bg-primary)',
    bgSecondary: 'var(--glass-bg-secondary)',
    bgElevated: 'var(--glass-bg-elevated)',
    
    // Border colors
    border: 'var(--glass-border)',
    borderFocus: 'var(--glass-border-focus)',
    borderError: 'var(--glass-border-error)',
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
  },
  
  // Border radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  }
} as const;

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validates component props against standards
 */
export function validateComponentProps<T extends StandardComponentProps>(
  props: T,
  componentName: string
): void {
  if (process.env.NODE_ENV === 'development') {
    // Validate size prop
    if (props.size && !Object.keys(standardSizes).includes(props.size)) {
      console.warn(
        `[${componentName}] Invalid size prop: "${props.size}". Expected one of: ${Object.keys(standardSizes).join(', ')}`
      );
    }
    
    // Validate disabled + loading combination
    if (props.disabled && props.loading) {
      console.warn(
        `[${componentName}] Component should not be both disabled and loading. Loading state already prevents interaction.`
      );
    }
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Gets standard size classes for icons based on component size
 */
export function getIconSizeClasses(size: ComponentSize = 'md'): string {
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };
  return iconSizes[size];
}

/**
 * Gets standard padding classes based on component size
 */
export function getPaddingClasses(size: ComponentSize = 'md'): string {
  const paddings = {
    xs: 'px-2 py-1',
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
    xl: 'px-8 py-4',
  };
  return paddings[size];
}

/**
 * Gets standard minimum height classes based on component size
 */
export function getMinHeightClasses(size: ComponentSize = 'md'): string {
  const heights = {
    xs: 'min-h-[24px]',
    sm: 'min-h-[32px]',
    md: 'min-h-[40px]',
    lg: 'min-h-[44px]',
    xl: 'min-h-[52px]',
  };
  return heights[size];
}

/**
 * Generates consistent focus ring classes
 */
export function getFocusRingClasses(): string {
  return 'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent';
}

/**
 * Generates loading state classes
 */
export function getLoadingStateClasses(loading?: boolean): string {
  return loading ? 'cursor-not-allowed' : '';
}