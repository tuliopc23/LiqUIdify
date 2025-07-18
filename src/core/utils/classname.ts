/**
 * ClassName utility for combining CSS classes
 * 
 * Provides a robust utility for combining CSS classes with proper handling of
 * conditional classes, arrays, and objects.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single string
 * 
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns Combined class string
 * 
 * @example
 * cn('base-class', { 'active': isActive }, ['additional', 'classes'])
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates a conditional className utility with predefined variants
 * 
 * @param base - Base class string
 * @param variants - Object of variant classes
 * @returns Function that applies variants based on props
 */
export function createVariantClass<T extends Record<string, string>>(
  base: string,
  variants: T
) {
  return (props: Partial<Record<keyof T, boolean>>): string => {
    const variantClasses = Object.entries(variants)
      .filter(([key]) => props[key as keyof T])
      .map(([, value]) => value);
    
    return cn(base, ...variantClasses);
  };
}

/**
 * Creates a size-based className utility
 * 
 * @param sizeMap - Object mapping size keys to class strings
 * @returns Function that returns class based on size prop
 */
export function createSizeClass<T extends Record<string, string>>(sizeMap: T) {
  return (size: keyof T): string => sizeMap[size] || '';
}